((expression) @injection.content
  (#set! injection.language "bash"))

((comment
  body: (comment_body) @injection.content)
    (#set! injection.language "comment"))
