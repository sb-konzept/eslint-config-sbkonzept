/* eslint-env browser */
/* eslint-disable import/no-unresolved, no-unused-vars, no-undef */

// Invalid because it's a common misunderstanding.
// We *could* make it valid but the runtime error could be confusing.
function ComponentWithHookInsideCallback () {
  useEffect(() => {
    useHookInsideCallback()
  })
}

// Invalid because it's dangerous and might not warn otherwise.
// This *must* be invalid.
function ComponentWithHookInsideLoop () {
  while (cond) {
    useHookInsideLoop()
  }
}

// Invalid because it's dangerous and might not warn otherwise.
// This *must* be invalid.
function renderItem () {
  useState()
}
function List (props) {
  return props.items.map(renderItem)
}

function MyComponent () {
  const local = {}
  useEffect(
    () => {
      console.log(local)
    },
    [local]
  )
}
