---
title: Regex
description: "Use regular expressions to extract fields and build calculated field formulas in the Log Explorer."
further_reading:
- link: "/logs/explorer/calculated_fields/"
  tag: "Documentation"
  text: "Calculated Fields"
- link: "/logs/explorer/calculated_fields/extractions"
  tag: "Documentation"
  text: "Extractions"
- link: "/logs/explorer/calculated_fields/formulas"
  tag: "Documentation"
  text: "Formulas"
---

## Overview

The Log Explorer lets you use regular expressions (regex) to pull new fields out of your logs, and to create calculated fields that match or replace patterns. Datadog evaluates patterns when you run a query, so nothing is reindexed, and you can add, edit, or remove a pattern at any time.

Regex appears in two places:

- **Extraction**: a pattern that creates one new field per named capture group. Use this when a value you want to filter, group, or sort by is buried inside a larger string, such as a request line in `message`.
- **Calculated field**: a formula that uses `regexp_like` or `regexp_replace`. Use this to match against a pattern, which returns a boolean, or to transform an existing field.

Datadog resolves extractions before calculated fields, so a calculated field can reference a field an extraction produces. The reverse is not supported: you cannot extract from a calculated field.

## Supported syntax

| Feature | Example | What it matches |
|---|---|---|
| Literal text | `error` | Those characters, exactly |
| Any character | `.` | Any single character |
| Character classes | `[a-z0-9]`, `[^abc]` | Any one character in the set, or any one character not in the set |
| Shorthand classes | `\d`, `\w`, `\s`, `\D`, `\W`, `\S` | A digit, word character, or whitespace character, and their negations |
| Unicode property classes | `\p{L}+` | Characters by Unicode property, such as any letter |
| Alternation | `error\|timeout` | Either alternative |
| Groups | `(error\|timeout)`, `(?:error\|timeout)` | Groups part of a pattern. `(?:…)` groups without capturing |
| Named capture groups | `(?<status>\d+)` | Captures the match under a name. Required for extraction |
| Quantifiers | `a*`, `a+`, `a?`, `a{2,4}` | Repetition: zero or more, one or more, optional, or a bounded range. Matches as much as possible |
| Lazy quantifiers | `.*?end` | The same repetition, but matching as little as possible |
| Anchors | `^ERROR`, `timeout$` | The start or the end of the value |
| Word boundaries | `\berror\b` | A position between a word and a non-word character, so `error` matches but `errors` does not |
| Character escapes | `\n`, `\r`, `\t` | Newline, carriage return, tab |
| Metacharacter escapes | `\.`, `\*`, `\(` | The character itself, rather than its special meaning |

## Write an extraction pattern

A pattern must follow three rules:

- It must contain at least one capture group.
- Every capture group must be named. Use `(?<name>…)`, not `(…)`. Use `(?:…)` to group without creating a field.
- Each name must be unique. The name becomes the name of the extracted field.

Given this log line:

```plaintext
10.0.0.14 GET /api/v1/orders 503
```

this pattern:

```plaintext
(?<client_ip>\S+) (?<method>\S+) (?<path>\S+) (?<status>\d+)
```

produces four fields you can filter, group, and sort by:

| Field | Value |
|---|---|
| `client_ip` | `10.0.0.14` |
| `method` | `GET` |
| `path` | `/api/v1/orders` |
| `status` | `503` |

Logs where the pattern does not match have no value for those fields.

Extracted values are always strings. Unlike a Grok rule such as `%{integer:status}`, regex extraction does not convert types. To use the value as a number, reference it in an arithmetic formula.

## Use regex in a calculated field

### regexp_like(value, pattern)

Returns `true` when the pattern matches anywhere in the value, and `false` otherwise.

```plaintext
regexp_like(message, "timeout|deadline exceeded")
```

### regexp_replace(value, pattern, replacement)

Returns the value with matched text replaced. Use `$1` through `$9` in the replacement to insert a capture group's match, or `${name}` for a named group. To write a literal `$`, escape it as `\$`.

```plaintext
-- strips the version prefix: /api/v1/orders becomes orders
regexp_replace(#path, "^/api/v[0-9]+/(.*)$", "$1")
```

By default, `regexp_replace` replaces only the first match. Two optional arguments change that:

| Argument | Meaning |
|---|---|
| `start` | The character position to start matching from, counting from 1. Defaults to the first character |
| `N` | Which match to replace. `1` (the default) replaces the first match; `N` replaces the Nth match; `0` replaces every match |

```plaintext
-- replace every match
regexp_replace(message, "[0-9]+", "N", 1, 0)
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
