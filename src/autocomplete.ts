import { Completion, autocompletion } from '@codemirror/autocomplete'
import { texKeywords } from './keywords'

function topLevelCompletionFor(keyword: typeof texKeywords[number]): Completion {
  if (!keyword.hasNested) {
    // Case 1: No nested args → \command
    return {
      label: '\\' + keyword.name,
      type: 'keyword',
      apply: '\\' + keyword.name,
    }
  }

  // Case 2 & 3: Has creative or known options → \command{<cursor>}
  return {
    label: '\\' + keyword.name,
    type: 'keyword',
    apply: (view, completion, from, to) => {
      view.dispatch({
        changes: { from, to, insert: `\\${keyword.name}{}` },
        selection: { anchor: from + keyword.name.length + 2 },
      })
    },
  }
}

const topLevelCompletions: Completion[] = texKeywords.map(topLevelCompletionFor)

export const texAutocomplete = autocompletion({
  override: [
    (context) => {
      const before = context.matchBefore(/\\[a-zA-Z]*/)
      if (before) {
        return {
          from: before.from,
          options: topLevelCompletions,
          validFor: /^\\[a-zA-Z]*$/,
        }
      }

      const text = context.state.sliceDoc(0, context.pos)
      const braceStart = text.lastIndexOf('{', context.pos)
      const backslashStart = text.lastIndexOf('\\', braceStart)
      if (braceStart > -1 && backslashStart > -1) {
        const command = text.slice(backslashStart + 1, braceStart).trim()
        const match = texKeywords.find((k) => k.name === command && k.hasNested && k.nestedOptions)
        if (match?.nestedOptions) {
          return {
            from: braceStart + 1,
            to: context.pos,
            options: match.nestedOptions.map((opt) => ({
              label: opt,
              type: 'variable',
              apply: opt,
            })),
            validFor: /^[^}]*$/,
          }
        }
      }

      return null
    },
  ],
})
