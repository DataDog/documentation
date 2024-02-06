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
| `s`  | Single line       | This allows `.` to match any character, when usually it matches anything except `\n`).|
| `x`  | Extended         | Whitespace is ignored (except in a custom character class)                            |

## Quoting

Use the regex syntax `\Q...\E` to treat everything between `\Q` and `\E` as a literal.

## Character escapes

| Character Escape| Description                                                         |
| --------------- | ------------------------------------------------------------------- |
| `\xhh`          | Escape character with hex code `hh` (up to 2 digits are allowed.)   |
| | |
| | |
| | |
| | |
| | |
| | |
| | |
| | |
| | |

## Character classes

| Character Class | Description  |
| --------------- | ------------ |
| | |
| | |

## Custom character classes

| Custom character Class | Description  |
| ---------------------- | ------------ |
| | |
| | |

## Quantifiers

| Quantifier | Description  |
| ---------- | ------------ |
| | |
| | |

## Assertions

| Assertion | Description  |
| --------- | ------------ |
| | |
| | |

## ASCII classes

TKTK

## Unicode properties

TKTK

