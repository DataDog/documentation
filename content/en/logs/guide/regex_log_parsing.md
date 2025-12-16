---
title: Understanding Regular Expressions (Regex) for Log Parsing in Datadog
description: Learn the basics of using regex for log parsing in Datadog, including usage, engine behavior, and best practices.
further_reading:
- link: "/logs/log_configuration/parsing"
  tag: "Documentation"
  text: "Log Parsing"
- link: "/logs/log_configuration/processors/?tab=ui#grok-parser"
  tag: "Documentation"
  text: "Grok Processor"
---

## Overview

Regular expressions (regex) are a powerful way to extract structured data from unstructured logs. This guide introduces how regex works, how it is used inside Grok Parsers in Datadog, and best practices for building efficient and reliable parsing rules. This provides additional context to the [Parsing][4] and [Grok Processor][5] documentation.

Key takeaways:
* Regex engines evaluate left-to-right and rely on backtracking
* Excessive use of the `data` matcher can create performance issues
* Prefer explicit, anchored patterns like `[^}]*`
* Use `%{regex("")}` for custom expressions
* Look through [example rules](#regex-examples)

## How regex engines evaluate matches

To understand how Datadog parses logs using regex, it helps to know how a traditional regex engine processes text.

A regex engine evaluates both the input string **and** the regex pattern from **left to right**.
* **Across the input string**: The engine begins at the first character and attempts to match the entire expression. If it fails, it moves one character forward and tries again—repeating until a match is found or the end of the string is reached.
* **Across the regex pattern**: Each part of the regex (called a **subexpression**) is evaluated from left to right at each potential starting position in the input.

### **Example: Matching the word `dog`**

To a human, `dog` looks like a single unit. A regex engine, however, treats it as three sequential rules (or subexpressions):

```
d   o   g
```

At each position in the text, the regex engine is evaluating:

1. Does the character match `d`?
2. If yes, does the next character match `o`?
3. If yes, does the next character match `g`?

If all subexpressions match, the engine reports a successful match.

```
┌──────── pattern "dog" ────────┐
[T][h][e][ ][d][o][g][ ][r][a][n]
 ^  ^  ^  ^  ^
 |  |  |  |  |
 no no no no try here → "dog" matches
```

## Backtracking and performance considerations

Regex engines optimize for correctness, not speed. Backtracking occurs when the engine partially matches a pattern, then must "rewind" to reevaluate earlier characters.

Backtracking can become expensive—especially with patterns that allow large, ambiguous matches (like wildcards `.*`). Poorly designed expressions can take seconds or even hours to evaluate, which is why Datadog enforces safety timeouts on parsing rules. For more information, see [ReDOS][1] or [catastrophic backtracking][2].

### **Example**

Pattern: `dog`
String: "adorable dog"

1. `a` does not match
2. `d` matches
3. `o` matches
4. `r` does **not** match → the engine backtracks to the first subexpression "d"
5. Try again starting one character later in the string

```
 ┌──────── pattern "dog" ────────┐
[A][d][o][r][a][b][l][e][ ][d][o][g]
 ^  ^  ^  ^  ^  ^  ^  ^  ^  ^
 |  |  |  |  |  |  |  |  |  |
 no |     no no no no no no try here → "dog" matches
    try partial
     match "do"
            │
            └── fails at 'r' ≠ 'g' → backtrack and continue

```

## Using regex inside grok parsers

Grok rules in Datadog are effectively regular expressions with shortcuts and annotations.

You can include regex in two places:

| Where | Usage |
| ----- | ----- |
| Outside the matcher syntax `%{}` | Raw regex embedded in the rule |
| Inside the matcher syntax `%{}` | Using the regex matcher: `%{regex("<pattern>")}` |

### Escaping inside `%{regex("")}`

If you use regex inside the matcher syntax, the expression is evaluated as a string first, so backslashes must be **escaped**:

```
%{regex("\\d{2}")}   # Matches two digits
```
<div class="alert alert-danger">A Grok rule must match the <strong>entire log line</strong>. Conceptually, every rule is wrapped with `^ ... $`. This means you must account for everything before and after the content you want to extract.</div>

## Understanding the `data` Matcher

The Datadog [data matcher][3] behaves like the regular expression `.*?` which uses lazy matching. `data` (`.*?`) is convenient but can be costly in long logs because:
* It triggers step-by-step expansion
* Each expansion may cause backtracking

### When to use the `data` matcher

Use this matcher sparingly in Grok Parsers. Whenever possible, replace it with an explicit pattern. Ideally, you should only use the `data` matcher when:

* You need everything until the end of the log (`%{data::json}` or `%{data::keyvalue()}`)
* You need the entire message captured without a clear endpoint (`%{data:message}`)

### Using "Not Character" patterns instead of the `data` matcher

A more efficient alternative to `data` is:

```
[^<delimiter>]*
```

This matches **everything except** a specific character and stops immediately when that character is encountered, meaning **no backtracking**.

{{% collapse-content title="Example" level="h4" expanded=false %}}
Given:

```
Test {some id 1656165ab; more text} the rest of the log
```

Inefficient:

```
rule Test \{%{data:my-attribute}} the rest of the log
```

Efficient:

```
rule Test \{%{regex("[^}]*"):my-attribute}} the rest of the log
```

This pattern stops as soon as it sees `}`, making it faster and more predictable.
{{% /collapse-content %}}

## Regex examples

Below are common log examples and recommended parsing strategies.

{{% collapse-content title="Extracting key/value groups with bracketed data" level="h4" expanded=false %}}
In this example, we need to extract the values from each key/value pair while skipping unrelated text. Using the `[^<character>]*` pattern, we can anchor the match to a delimiter that appears only before the content we care about. Here, each relevant value is preceded by a `:`, making it an effective anchor.

**Log**:

```
User:[iambits@gmail.com], Plan: [1], Total usage: [0.016050000000000002], [GS2] usage: [0.016050000000000002], [DOGGOLABS] usage: [0], [SUBNETWORK] usage: [0], [Old/History] usage: [0]
```

**Helper rules**:

```
_tocolon [^:]*:\s*
_insidebrackets %{regex("[^\\]]*")}
```

**Parsing rule**:

```
rule %{_tocolon}\[%{_insidebrackets:User}\],\s*
     %{_tocolon}\[%{_insidebrackets:Plan}\],\s*
     ...
```
{{% /collapse-content %}}

{{% collapse-content title="Jumping directly to JSON" level="h4" expanded=false %}}
In this example, we only need the JSON portion of the log (`{"awsRequestId":..."}`). Since everything before it is irrelevant and the first bracket `{` uniquely identifies the start of the JSON, we can anchor the rule to that character to jump directly to the content.

**Log**:

```
2025-11-08T10:03:56.426Z 3d8a4e89-4e18-4869-86fd-a83969cfc789 INFO Example-Message {"awsRequestId":"snip","x-correlation-trace-id":"snip","x-correlation-id":"snip","level":30,"time":1667901836426,"pid":8,"hostname":"snip","data":"snip","msg":"Example Message"}
```

**Rule**:

```
rule [^{]*%{data::json}
```
{{% /collapse-content %}}

{{% collapse-content title="Extracting JSON when additional text follows" level="h4" expanded=false %}}
In this example, we can't use `data` to extract the JSON because additional text follows it, making the structure invalid for the JSON filter. Instead, we use a regex matcher to capture the opening bracket `{`, everything inside it, and the closing bracket `}`.

**Log**:

```
[32m[Nest] 1 - [39m01/14/2022, 6:55:37 PM [38;5;3m[{"user":"someone","type":"change","startTs":"2022-01-14T18:55:26.289Z","endTs":"2022-01-14T18:55:26.372Z","storeId":"something-something-0020","sessionId":"dc738850-6d47-4c36-be85-444a5ef2ab8c","caseId":"9f4f5e1c-e702-4324-a418-be7b9229b6f6","username":"someone","createdAt":"2022-01-14T18:55:37.953Z"}] [39m[32mOperator: cosmin changed a case in 0.083 sec.[39m]
```

**Rule**:

```
rule [^{]+%{regex("\\{[^}]+}")::json}.*
```

This captures:

* `{`
* all non-`}` characters
* the closing `}`
{{% /collapse-content %}}

{{% collapse-content title="Extract a URL query parameter" level="h4" expanded=false %}}
In this example, we want to extract a specific query parameter from a URL. By anchoring the pattern to the portion of the string that precedes the parameter, we can reliably capture its value without matching the rest of the query string.

**Log**:

```
/bits-datadog-new-york-2016-357401?utm_source=rule&utm_medium=sms&utm_campaign=Bits&utm_custom[rm]=148647836
```

**Rule**:
The rule matches any characters that are not a closing bracket `]`, followed by `]=`, then captures everything after the `=` sign until a space is encountered.

```
rule [^\]]+\]=%{notSpace:http.url_details.queryString.utm_custom_rm}
```

**Result**:
It finds `utm_custom[rm]=148647836` and extracts `148647836` into an attribute called `http.url_details.queryString.utm_custom_rm`.

{{% /collapse-content %}}

{{% collapse-content title="Conditional matching with alternation" level="h4" expanded=false %}}
In this example, the log can contain different types of values, so we use alternation to match the correct pattern based on what appears. Each branch handles a different possible format, allowing the rule to adapt to the log content.

**Log**:

```
Connected with OSX
Connected with Windows
Connected with 169686468464
```

**Rule**:

```
rule Connected with (%{regex("OSX|Windows"):os}|%{regex("\\d+"):kernel_version})
```
{{% /collapse-content %}}

{{% collapse-content title="Case-insensitive matching" level="h4" expanded=false %}}
When the log may vary in letter casing, we use a case-insensitive modifier to match the text consistently regardless of capitalization.

**Log**:

```
Test This Log
test this log
```

**Rule**:

```
rule %{regex("(?i)test this log"):case_insensitive}.*
```
{{% /collapse-content %}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://en.wikipedia.org/wiki/ReDoS
[2]: https://www.regular-expressions.info/catastrophic.html
[3]: /logs/log_configuration/parsing/?tab=matchers#matcher-and-filter
[4]: /logs/log_configuration/parsing
[5]: /logs/log_configuration/processors/?tab=ui#grok-parser