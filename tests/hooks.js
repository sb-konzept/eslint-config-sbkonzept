/* eslint-disable import/no-unresolved */

import {
  useCallback, useEffect, useRef, useState
} from 'react'
import { OrderedMap } from 'immutable'
import { firebase } from 'lashes-firebase-config'

function makeOptimisticMessage (message) {
  return {
    id: Math.random(),
    data: () => ({
      sender: {},
      content: message,
      optimistic: true,
      creationTime: firebase.firestore.Timestamp.fromDate(new Date())
    })
  }
}

export default function useChat (chatId) {
  const listeners = useRef([])
  const [messages, setMessages] = useState(OrderedMap())
  const ref = useRef(messages)
  const [loading, setLoading] = useState(true)

  function applyMessageChanges (changes) {
    const next = ref.current
      .withMutations(map =>
        changes.forEach((change) => {
          switch (change.type) {
            case 'modified':
            case 'added':
              map.set(change.doc.id, {
                id: change.doc.id,
                ...change.doc.data()
              })
              break
            case 'removed':
              map.remove(change.doc.id)
              break
            default:
              console.error('unsupported change type', change)
              break
          }
        })
      )
      .filterNot((message) => {
        if (changes.length !== 1 || changes[0].type !== 'added') {
          return false
        }
        const newMessage = changes[0].doc.data()
        return (
          !newMessage.optimistic
          && message.optimistic
          && newMessage.content === message.content
        )
      })
      .sortBy(message => -message.creationTime.toMillis())
    ref.current = next
    return next
  }

  function subscribeNewMessages () {
    const listener = firebase
      .firestore()
      .collection(`chats/${chatId}/messages`)
      .orderBy('creationTime', 'asc')
      .startAfter(firebase.firestore.Timestamp.fromDate(new Date()))
      .onSnapshot((snapshot) => {
        const changes = snapshot.docChanges()
        setLoading(false)
        setMessages(applyMessageChanges(changes))
      })

    listeners.current.push(listener)
  }

  function subscribeMessages () {
    const lastMessage = messages.minBy(message =>
      message.creationTime.toMillis()
    )

    const lastCreationTime =
      lastMessage?.creationTime
      || firebase.firestore.Timestamp.fromDate(new Date())

    const listener = firebase
      .firestore()
      .collection(`chats/${chatId}/messages`)
      .orderBy('creationTime', 'desc')
      .startAfter(lastCreationTime)
      .limit(25)
      .onSnapshot((snapshot) => {
        const changes = snapshot.docChanges()
        setLoading(false)
        setMessages(applyMessageChanges(changes))
      })

    listeners.current.push(listener)
  }

  function loadMoreMessages () {
    if (loading) return
    setLoading(true)
    subscribeMessages()
  }

  const sendTextMessage = useCallback(
    async (message) => {
      const optimisticMessage = makeOptimisticMessage(message)

      setMessages(
        applyMessageChanges([{ type: 'added', doc: optimisticMessage }])
      )
      return firebase.functions().httpsCallable('createMessage')({
        chatId,
        message: {
          encoding: 'utf-8',
          content: message,
          mimeType: 'text/plain'
        }
      })
    },
    [chatId]
  )

  useEffect(
    () => {
      subscribeNewMessages()
      subscribeMessages()
      return () => listeners.current.forEach(listener => listener())
    },
    [chatId]
  )

  return {
    messages,
    loading,
    loadMoreMessages,
    sendTextMessage
  }
}
