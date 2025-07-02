/**
 * @file A tree sitter grammar for the Qmake build system
 * @author tinger <tinger@tinger.dev>
 * @license MIT OR Apache-2.0
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "qmake",

  extras: $ => [/\t/, / /, /\\\n/],

  inline: $ => [$.items],

  rules: {
    source_file: $ => $.items,

    items: $ => repeat1(choice(/\n/, $.item)),
    item: $ => seq(choice($.comment, $.statement), /\n/),

    comment: $ => seq("#", field('body', $.comment_body)),
    comment_body: $ => /[^\n]+/,

    statement: $ => choice($.declaration, $.conditional, $.call),

    block: $ => seq("{", $.items, "}"),

    declaration: $ => seq(
      $.variable,
      choice("=", "*=", "+=", "-="),
      optional($.expression)
    ),

    call: $ => seq(
      field('function', $.identifier),
      field('arguments', $.call_arguments)
    ),
    call_arguments: $ => seq(
      "(",
      optional(seq($.expression, repeat(seq(",", $.expression)))),
      ")"
    ),

    conditional: $ => seq(
      $.conditional_expression,
      $.block,
      repeat($.conditional_else)
    ),
    conditional_expression: $ => choice(
      $.call,
      $.variable,
      $.unary_conditional_expression,
      $.binary_conditional_expression
    ),
    unary_conditional_expression: $ => prec(3, choice(
      seq("!", $.conditional_expression)
    )),
    binary_conditional_expression: $ => choice(
      prec.left(2, seq(
        field('left', $.conditional_expression),
        field('op', ":"),
        field('right', $.conditional_expression)
      )),
      prec.left(1, seq(
        field('left', $.conditional_expression),
        field('op', "|"),
        field('right', $.conditional_expression)
      ))
    ),
    conditional_else: $ => seq(
      "else",
      optional(seq(":", $.conditional_expression)),
      $.block
    ),

    expression: $ => choice(
      $.variable,
      $.string,
      $.expression_raw
    ),
    expression_raw: $ => seq(choice($.interpolation, $.expression_raw_frag)),
    expression_raw_frag: $ => /[^\(\)\{\}\[\]\|\\,:\s]+/,

    variable: $ => seq($.identifier, optional(seq(".", $.variable))),

    identifier: $ => /[\w_][\w\d_]*/,
    string: $ => seq(/"/, /[^"]+/, /"/),

    interpolation: $ => seq(
      field('start', "$${"),
      field('body', $.interpolation_body),
      field('end', "}")
    ),
    interpolation_body: $ => /[^\{\}]+/,
  }
});
