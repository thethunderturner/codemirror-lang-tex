import { Completion, autocompletion } from "@codemirror/autocomplete";
import { texKeywords } from "./keywords";

const topLevelCompletions: Completion[] = texKeywords.map(kw => ({
  label: "\\" + kw.name,
  type: "keyword",
  boost: 99,
  apply: "\\" + kw.name
}));

export const texAutocomplete = autocompletion({
  override: [
    (context) => {
      const before = context.matchBefore(/\\[a-zA-Z]*/);
      if (before) {
        return {
          from: before.from,
          options: topLevelCompletions,
          validFor: /^\\[a-zA-Z]*$/
        };
      }

      const text = context.state.sliceDoc(0, context.pos);
      const braceStart = text.lastIndexOf("{", context.pos);
      const backslashStart = text.lastIndexOf("\\", braceStart);
      if (braceStart > -1 && backslashStart > -1) {
        const command = text.slice(backslashStart + 1, braceStart).trim();
        const match = texKeywords.find(k => k.name === command && k.hasNested);
        if (match?.nestedOptions) {
          return {
            from: braceStart + 1,
            to: context.pos,
            options: match.nestedOptions.map(opt => ({
              label: opt,
              type: "variable",
              apply: opt
            })),
            validFor: /^[^}]*$/
          };
        }
      }

      return null;
    }
  ]
});
