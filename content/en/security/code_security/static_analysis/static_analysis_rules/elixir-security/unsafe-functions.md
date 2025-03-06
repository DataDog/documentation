---
aliases:
- /continuous_integration/static_analysis/rules/elixir-security/unsafe-functions
- /static_analysis/rules/elixir-security/unsafe-functions
dependencies: []
disable_edit: true
group_id: elixir-security
meta:
  category: Security
  id: elixir-security/unsafe-functions
  language: Elixir
  severity: Error
  severity_rank: 1
title: A rule against functions that may have vulnerabilities.
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `elixir-security/unsafe-functions`

**Language:** Elixir

**Severity:** Error

**Category:** Security

**CWE**: [94](https://cwe.mitre.org/data/definitions/94.html)

## Description
This rule is designed to prevent the execution of unsafe functions that could potentially expose your application to security risks. It specifically targets functions such as `Code.eval_string`, `Code.eval_file`, `Code.eval_quoted`, and `System.shell`, which are known to be potentially dangerous when used improperly. These functions can execute code or shell commands from user inputs, which might introduce vulnerabilities if the input is not properly sanitized.

The importance of this rule lies in its ability to mitigate the risk of code injection attacks. Code injection attacks occur when an attacker is able to insert malicious code into your application, often through unsanitized user inputs. This can lead to a variety of negative outcomes, including data breaches and unauthorized access to system resources.

To adhere to this rule, avoid using these potentially unsafe functions, especially with user inputs. Instead, consider using safer alternatives that do not execute code dynamically. For instance, if you need to perform a set of operations, you can define a map of allowed functions and their corresponding implementations. This way, you can control what operations are allowed and avoid executing arbitrary code.

## Non-Compliant Code Examples
```elixir
# unsafe function eval_file on user_input
file_result = Code.eval_file(user_input)

# nested evals will each have their own error msg, depending on where
# your mouse is hovered.
single_nested = Code.eval_string(Code.eval_file(a))

# unsafe function eval_quoted ran on user_input
quoted_result = Code.eval_quoted(user_input, "1", "2")

# Concatenated results should also raise errors. Here, two errors are raised because of two different variables
concat = Code.eval_string("1 + 2 + #{variable} + 4", "1 + 2 + #{test}")

# We also want to look for shell commands.
shellcmd = System.shell(command)
```

## Compliant Code Examples
```elixir
# Instead of letting the user eval commands/files, you can specify allowed functions using 
# a predefined set of functions with their own error handling.
defmodule SafeREPL do
  @allowed_functions %{
    "add" => fn [a, b] -> a + b end,
    "subtract" => fn [a, b] -> a - b end,
    "multiply" => fn [a, b] -> a * b end,
    "divide" => fn [a, b] -> 
      if b == 0, do: "Cannot divide by zero", else: a / b 
    end
  }
end

# You can also opt to hard-code in your own values, as long as variables are not passed in.
Code.eval_string("1 + 2")
```
