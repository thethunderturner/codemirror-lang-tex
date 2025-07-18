# CodeMirror 6 language support for TeX

This package is WIP! Please be patient...

Some keywords are alone (e.g \newline) in this case autocomplete shouldnt add nested options, but other keywords like \section{} do have nested options. In this case such keywords have "creative" options, where the user can innput anything; but other keywords have autocomplete-able options, like \usepackage{...}. This is well shown in keywords.ts


This is an example repository containing a minimal [CodeMirror](https://codemirror.net/6/) language support package. The idea is to clone it, rename it, and edit it to create support for a new language.

Things you'll need to do (see the [language support example](https://codemirror.net/6/examples/lang-package/) for a more detailed tutorial):

 * Rewrite the grammar in `src/syntax.grammar` to cover your language. See the [Lezer system guide](https://lezer.codemirror.net/docs/guide/#writing-a-grammar) for information on this file format.

 * Adjust the metadata in `src/tex.ts` to work with your new grammar.

 * Adjust the grammar tests in `test/cases.txt`.

 * Build (`npm run prepare`) and test (`npm test`).

 * Rewrite this readme file.

 * Publish. Put your package on npm under the name `codemirror-lang-tex`.
