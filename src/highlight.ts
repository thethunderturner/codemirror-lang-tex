import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags as t } from '@lezer/highlight'

export const myHighlightStyle = syntaxHighlighting(
  HighlightStyle.define([
    {
      tag: t.keyword,
      color: '#0066cc',
      fontWeight: 'bold',
    },
    {
      tag: t.lineComment,
      color: '#008000',
      fontStyle: 'italic',
    },
    {
      tag: t.brace,
      color: '#cc6600',
    },
    {
      tag: t.squareBracket,
      color: '#990099',
    },
    {
      tag: t.string,
      color: '#dd1144',
    },
  ]),
)
