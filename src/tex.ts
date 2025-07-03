import { LRLanguage, LanguageSupport } from "@codemirror/language";
import { styleTags, tags as t } from "@lezer/highlight";
import { parser } from "./generated/parser.js";
import { myHighlightStyle } from "./highlight.js";
import { texAutocomplete } from "./autocomplete.js";

export const texLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      styleTags({
        "Command": t.keyword,
        "Comment": t.lineComment,
      }),
    ],
  }),
  languageData: {
    commentTokens: { line: "%" }
  }
});
 
export function tex() {
  return new LanguageSupport(texLanguage, [
    myHighlightStyle,
    texAutocomplete
  ]);
} 