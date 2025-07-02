(comment) @comment.line

(identifier) @variable
(variable) @variable

(string) @string

[
  "("
  ")"
  "{"
  "}"
] @punctuation.bracket

(interpolation
  start: _ @punctuation.special
  body: _ @string.special
  end: _ @punctuation.special)

[
  "!"

  ":"
  "|"

  "="
  "*="
  "+="
  "-="
] @operator

((call
  function: (identifier) @function.builtin
  arguments: (call_arguments
   (expression (variable) @variable.parameter)
   ("," (expression (variable) @variable.parameter))*))
 (#any-of?
   @function.builtin
   "lessThan" "greaterThan" "include"))

"else" @keyword.control.conditional

