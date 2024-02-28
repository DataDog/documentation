---
title: Regular Expression Syntax
kind: documentation
disable_toc: false
further_reading:
    - link: "/sensitive_data_scanner/"
      tag: "Documentation"
      text: "Set up Sensitive Data Scanner"
---

## Overview

TKTK

<!-- {{< whatsnext desc="The available regex syntax you can use for custom Sensitive Data Scanner rules include:" >}}
    {{< nextlink href="" >}}Alternation{{< /nextlink >}}
    {{< nextlink href="" >}}Groups{{< /nextlink >}}
    {{< nextlink href="" >}}Setting flags{{< /nextlink >}}
    {{< nextlink href="" >}}{{< /nextlink >}}
{{< /whatsnext >}} -->


## Alternation

Use alternation to choose the first expression that matches. An expression in an alteration can be left empty, which matches to anything, thus making the entire alternation expression optional.

| Name                                 | Regex Syntax|
| ------------------------------------ | ------------|
| Alternation                          | `A\|B\|C`   |
| Alternation with an empty expression | `A\|B\|`    |


## Groups

Use groups to change precedence or set flags. Since captures are not used in Sensitive data Scanner, capturing groups behave like non-capturing groups. Similarly, capture group names are ignored.

| Name         | Regex Syntax                                          |
| ------------------- | ------------------------------------------------------ |
| Capture group       | `(...)`                                                |
| Named capture group | `(?<name>...)`<br> `(?P<name>...)` <br> `(?'name'...)` |
| Non-capturing group | `(?:...)`                                              |

## Setting flags

Use flags to modify regex match. There are two ways to specify flags:
1. `(?imsx:...)`: Set flags that only apply to the expression inside of a non-capturing group.
2. `(?imsx)...`: Set flags that apply to the rest of the current group.

Flags listed after a `-` are removed, if they were previously set.

Use `(?-imsx)` to unset the `imsx` flags.

### Available flags

| Flag | Name             | Description                                                                           |
| ---- | ---------------- | ------------------------------------------------------------------------------------- |
| `i`  | Case insensitive | Letters match both upper and lower case.                                              |
| `m`  | Multi-line mode  | `^` and `$` match the beginning and end of line                                       |
| `s`  | Single line      | This allows `.` to match any character, when usually it matches anything except `\n`).|
| `x`  | Extended         | Whitespace is ignored (except in a custom character class)                            |

## Quoting

Use the regex syntax `\Q...\E` to treat everything between `\Q` and `\E` as a literal.

## Character escapes

| Character Escape| Description                                                         |
| --------------- | ------------------------------------------------------------------- |
| `\xhh`          | Escapes characters with hex code `hh` (up to 2 digits are allowed).  |
| `\x{hhhhhh}`    | Escapes characters with hex code `hhhhhh` (between 1 and 6 digits).  |
| `\a`            | Escapes a bell `(\x{7})`.                                            |
| `\b`            | Escapes a backspace `(\x{8})`. This only works in a custom character class (for example, `[\b]`) otherwise it is treated as a word boundary. |
| `\cx`           | Escapes a control sequence, where x is `A-Z` (upper or lowercase). (`\cA` = `\x{0}`, `\cB` = `\x{1}`,...`\cZ` = `\x{19})` |
| `\e`            | Escapes `(\x{1B})`.                                                  |
| `\f`            | Escapes a form feed `(\x{C})`.                                       |
| `\n`            | Escapes a newline (`\x{A}`).                                         |
| `\r`            | Escapes a carriage return (`\x{D}`)                                  |
| `\t`            | Escapes a tab (`\x{9}`).                                             |
| `\v`            | Escapes a vertical tab (`\x{B}`).                                    |

## Character classes

| Character Class | Description  |
| --------------- | ------------ |
| `.`             | Matches any character except `\n`. Enable the `s` flag to match any character, including `\n`.|
| `\d`            | Matches any ASCII digit (`[0-9]`).                                                            |
| `\D `           | Matches anything that does not match with `\d`.                                               |
| `\h`            | Matches a space or tab (`[\x{20}\t]`).                                                        |
| `\H`            | Matches anything that does not match with `\h`                                                |
| `\s`            | Matches any ASCII whitespace (`[\r\n\t\x{C}\x{B}\x{20}]`)                                     |
| `\S`            | Matches anything that does not match with `\s`.                                               |
| `\v`            | Matches ASCII vertical space (`[\x{B}\x{A}\x{C}\x{D}]`)                                       |
| `\V`            | Matches anything that does not match with `\v`.                                               |
| `\w`            | Matches any ASCII word character (`[a-zA-Z0-9_]`)                                             |
| `\W`            | Matches anything that does not match with `\w`.                                               |
| `\p{x}`         | Matches anything that matches the unicode property `x`. See [Unicode Properties](#unicode-properties) for a full list.|

## Custom character classes

| Custom character Class | Description  |
| ---------------------- | ------------ |
|`[...]` | Matches any character listed inside the brackets. |
| `[^...]`| Matches anything that is not listed inside the brackets. |
| `[a-zA-Z]` | Matches anything in the range `A - Z` (upper or lowercase).|
| `[\s\w\d\S\W\D\v\V\h\H\p{x}...]`| Other classes defined above are allowed (except `.` which is treated as a literal). |
| `[[:ascii_class:]]` | Matches special named [ASCII classes](#ascii-classes). |
| `[[:^ascii_class:]]` | Matches inverted ASCII class. |

## Quantifiers

Quantifiers repeat the previous expression. The term greedy means that the most number of repetitions are taken, and are only given back as needed to find a match. Lazy takes the minimum number of repetitions, and adds more as needed.

| Quantifier| Description  |
| --------- | ------------ |
| `?`       | Repeat `0` or `1` time (greedy).|
| `??`      | Repeat `0` or `1` time (lazy). |
| `+`       | Repeat `1` or more times (greedy). |
| `+?`      | Repeat `1` or more times (lazy). |
| `*`       | Repeat `0` or more times (greedy). |
| `*?`      | Repeat `0` or more times (lazy). |
| `{n}`     | Repeat exactly `n` times (the lazy modifier is accepted here but is ignored). |
| `{n,m}`   | Repeat at least `n`, but no more than m times (greedy).|
| `{n,m}?`  | Repeat at least `n`, but no more than m times (lazy). |
| `{n,}`    | Repeat at least `n` times (greedy). |
| `{n,}?`   | Repeat at least    times (lazy).|

**Note**: `{,m}`is not valid and is instead treated as a literal. Similarly, any syntax differences such as adding spaces inside the braces causes the quantifier to be treated as a literal instead.

## Assertions



| Assertion | Description  |
| --------- | ------------ |
| `\b `     | Word boundary.|
| `\B`      | Not word boundary. |
| `^`       | Start of line. |
| `$`       | End of line. |
| `/A`      | Start of text. |
| `\z`      | End of text. |
| `\Z`      | End of text (or before a `\n` that is immediately before the end of text).|

## ASCII classes

TKTK

## Unicode properties

TKTK

