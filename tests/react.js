/**
 *
 * ResultChat
 *
 */
/* eslint-disable import/no-unresolved */

import React, { Component } from 'react'

import Spin from 'antd/lib/spin'
import 'antd/lib/spin/style/css'

import Chat, { getMessageProps } from 'lashes-components/lib/Chat'
import Icon from 'lashes-components/lib/Icon'

class ResultChat extends Component {
  scrollerRef = React.createRef();

  componentDidMount () {
    const { onScrollTop } = this.props
    if (
      this.scrollerRef.current.scrollHeight
      <= this.scrollerRef.current.clientHeight
    ) {
      // eslint-disable-next-line no-unused-expressions
      onScrollTop?.()
    }
  }

  handleScroll = (event) => {
    const { onScrollTop } = this.props
    const top = event.target.scrollTop === 0

    if (top) {
      // eslint-disable-next-line no-unused-expressions
      onScrollTop?.()
    }
  };

  renderMessage = (message, idx, messages) => {
    const { currentUser, users } = this.props
    const sender = users[message.sender.id]

    if (!sender || !currentUser) return null

    const {
      isOwn, isSeries, timestamp, date, isNextDay
    } = getMessageProps(
      this.props,
      message,
      idx,
      messages
    )

    return (
      <>
        <Chat.Message series={isSeries} out={isOwn}>
          <Chat.Message.Container>
            <Chat.Message.Content>{message.content}</Chat.Message.Content>
            <Chat.Message.Timestamp>{timestamp}</Chat.Message.Timestamp>
          </Chat.Message.Container>
        </Chat.Message>
        {isNextDay && (
          <Chat.Message system>
            <Chat.Message.Container>
              <Chat.Message.Content>{date}</Chat.Message.Content>
            </Chat.Message.Container>
          </Chat.Message>
        )}
      </>
    )
  };

  render () {
    const { isLoading, messages } = this.props

    return (
      <Chat>
        <Chat.Messages>
          <Chat.Messages.Scroller
            ref={this.scrollerRef}
            onScroll={this.handleScroll}
          >
            {messages.map(this.renderMessage)}
            {isLoading && <Spin size="large" style={{ marginTop: '3rem' }} />}
          </Chat.Messages.Scroller>
        </Chat.Messages>
        <Chat.Footer>
          <Chat.Footer.Container>
            <Chat.Input>
              <Chat.Input.Container>
                <Chat.Input.Area />
                <Chat.Input.Placeholder>Type a message</Chat.Input.Placeholder>
              </Chat.Input.Container>
            </Chat.Input>

            <Chat.Button.Container>
              <Chat.Button>
                <Icon size="lg" color={['gray', 4]} icon="comment" />
              </Chat.Button>
            </Chat.Button.Container>
          </Chat.Footer.Container>
        </Chat.Footer>
      </Chat>
    )
  }
}

export default ResultChat
