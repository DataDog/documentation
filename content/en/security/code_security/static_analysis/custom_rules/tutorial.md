---
description: Learn how to define a custom rule within Datadog.
title: Static Code Analysis Custom Rule Creation Tutorial
---


This tutorial shows how to write a custom rule to check code. The tutorial uses a very simple rule that checks if we have a Python function call to a function `foo` with an argument called `bar`.

Here is the sample code we want to detect:

```python
foo(bar)
```


## Step 1: Create a ruleset

Navigate to [custom rulesets][1] and create a new ruleset named `tutorial`.

{{< img src="/security/code_security/custom_rule_tutorial_ruleset.png" alt="Ruleset created" style="width:100%;" >}}

## Step 2: Create a rule

Create a rule named `tutorial-rule`. Ensure you select the `Python` language.

### Step 2.1: Test the rule with an example

Add a code example to test the rule. At each modification or update of the rule (tree-sitter capture
or test code), Datadog will execute the rule against the code and provide feedback.

Enter the filename `test.py` and add the code below.

```python
foo(bar)
foo(baz)
```

### Step 2.2: Write a tree-sitter query

Write a [tree-sitter query][2] that defines the nodes to capture in the code. In the current example,
the goal is to capture a function call where the function name is `foo` and any argument is `bar`.

The tree-sitter query is shown below. It has three captures:
 - `funcName` captures the name of the function and runs a predicate to check its name.
 - `arg` captures the name of the arguments.
 - `func` captures the function call with all arguments. This is used to report the violation in code.

```
(call
    function: (identifier) @funcName
    arguments: (argument_list
        (identifier) @arg
    )
    (#eq? @funcName "foo")
    (#eq? @arg "bar")
)@func
```

### Step 2.3: Write JavaScript rule code

Write the JavaScript code to report the violation. The code first fetch the captures (`func` and `funcName`), and then checks if the name of the function is different from `foo` and returns if true. Lastly, it reports a violation.

Note that the `buildError` function 6th and 7th arguments are the severity and category.
We support the following severity: `ERROR`, `WARNING`, `NOTICE` and `INFO`.
We support the following categories: `BEST_PRACTICES`, `CODE_STYLE`, `ERROR_PRONE`, `PERFORMANCE` and `SECURITY`.

```javascript
function visit(query, filename, code) {
  // Get the func captures so that we can know the line/col where to put a violation
  const func = query.captures["func"];

  // Get the funcname to later get the name of the function
  const funcNameNode = query.captures["funcName"];

  // Check if the name of the function is not foo. This is already done in the tree-sitter query
  // and here only to show how to use getCodeForNode
  const funcNameFromCode = getCodeForNode(funcNameNode, code);
  if (funcNameFromCode !== "foo") {
    return;
  }

  // Report a violation
  addError(
    buildError(
      func.start.line, func.start.col,
      func.end.line, func.end.col,
      "do not use bar as argument",
      "WARNING",
      "BEST_PRACTICES"
    )
  )
}
```


{{< img src="/security/code_security/custom_rule_tutorial_rule_created.png" alt="Rule created" style="width:100%;" >}}


## Step 3: Use the rule

To use the rule, do one of the following:
 - Create a `static-analysis.datadog.yaml` file at the root of your repository with the ruleset.
 - Add the rule in [your settings][3], either for the org-wide or repo-level configuration.

A valid configuration for using this ruleset (and no other ruleset) look like this:

```yaml
rulesets:
  - tutorial
```

{{< img src="/security/code_security/custom_rule_tutorial_configuration.png" alt="Configuration with Custom Rule" style="width:100%;" >}}

[1]: https://app.datadoghq.com/ci/code-analysis/static-analysis/custom-rulesets
[2]: https://tree-sitter.github.io/tree-sitter/using-parsers/queries/index.html
[3]: https://app.datadoghq.com/security/configuration/code-security/settings
