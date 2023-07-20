---
title: Static Analysis Rules
kind: documentation
description: View rules for multiple languages for Static Analysis.
is_beta: true
python_best_practices_data:
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/ambiguous-class-name"
    tag: "ambiguous-class-name"
    text: "make sure class names are readable"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/ambiguous-function-name"
    tag: "ambiguous-function-name"
    text: "make sure function names are readable"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/ambiguous-variable-name"
    tag: "ambiguous-variable-name"
    text: "make sure variable names are readable"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/any-type-disallow"
    tag: "any-type-disallow"
    text: "do not use Any type"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/argument-same-name"
    tag: "argument-same-name"
    text: "do not have arguments with the same name"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/assertraises-specific-exception"
    tag: "assertraises-specific-exception"
    text: "assertRaises must check for a specific exception"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/avoid-duplicate-keys"
    tag: "avoid-duplicate-keys"
    text: "Avoid duplicate keys in dictionaries"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/avoid-string-concat"
    tag: "avoid-string-concat"
    text: "avoid string concatenation"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/class-methods-use-self"
    tag: "class-methods-use-self"
    text: "Class methods should not use self"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/collection-while-iterating"
    tag: "collection-while-iterating"
    text: "do not modify a dictionary while iterating on it"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/comment-fixme-todo-ownership"
    tag: "comment-fixme-todo-ownership"
    text: "TODO and FIXME comments must have ownership"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/comparison-constant-left"
    tag: "comparison-constant-left"
    text: "in comparisons, variables must be left"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/condition-similar-block"
    tag: "condition-similar-block"
    text: "if conditions must have different code blocks"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/ctx-manager-enter-exit-defined"
    tag: "ctx-manager-enter-exit-defined"
    text: "ensure that both __exit__ and __enter__ are defined"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/dataclass-special-methods"
    tag: "dataclass-special-methods"
    text: "do not use special method on data class"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/equal-basic-types"
    tag: "equal-basic-types"
    text: "check equal is used on consistent basic types"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/exception-inherit"
    tag: "exception-inherit"
    text: "ensure exception inherit a base exception"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/finally-no-break-continue-return"
    tag: "finally-no-break-continue-return"
    text: "do not use break or continue in finally block"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/function-already-exists"
    tag: "function-already-exists"
    text: "a function must be defined only once"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/function-variable-argument-name"
    tag: "function-variable-argument-name"
    text: "Do not assign to function arguments"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/generic-exception-last"
    tag: "generic-exception-last"
    text: "If using generic exception, it should be last"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/get-set-arguments"
    tag: "get-set-arguments"
    text: "getter/setter must have 1 or 2 arguments respectively"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/if-return-no-else"
    tag: "if-return-no-else"
    text: "when an if condition returns an value, else is not necessary"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/import-modules-twice"
    tag: "import-modules-twice"
    text: "module imported twice"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/import-single-module"
    tag: "import-single-module"
    text: "only one module to import per import statement"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/init-call-parent"
    tag: "init-call-parent"
    text: "use super() to call the parent constructor"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/init-method-required"
    tag: "init-method-required"
    text: "ensure classes have an __init__ method"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/init-no-return-value"
    tag: "init-no-return-value"
    text: "No return in an __init__ function"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/invalid-strip-call"
    tag: "invalid-strip-call"
    text: "strip() argument should not have duplicate characters"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/logging-no-format"
    tag: "logging-no-format"
    text: "do not use format string with logging functions"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/method-hidden"
    tag: "method-hidden"
    text: "a method has the same name than an attribute"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/nested-blocks"
    tag: "nested-blocks"
    text: "Do not have too many nested blocks"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/no-assert"
    tag: "no-assert"
    text: "do not use assert in production code"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/no-assert-on-tuples"
    tag: "no-assert-on-tuples"
    text: "no assert on tuples"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/no-bare-except"
    tag: "no-bare-except"
    text: "do not use bare except"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/no-bare-raise"
    tag: "no-bare-raise"
    text: "Do not use a raise statement without a specific exception"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/no-base-exception"
    tag: "no-base-exception"
    text: "do not raise base exception"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/no-datetime-today"
    tag: "no-datetime-today"
    text: "do not use datetime.today()"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/no-double-not"
    tag: "no-double-not"
    text: "do not use double negation"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/no-double-unary-operator"
    tag: "no-double-unary-operator"
    text: "do not use operator -- and ++"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/no-duplicate-base-class"
    tag: "no-duplicate-base-class"
    text: "use a base class only once"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/no-equal-unary"
    tag: "no-equal-unary"
    text: "do not use operations =+ and =-"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/no-exit"
    tag: "no-exit"
    text: "do not use exit()"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/no-generic-exception"
    tag: "no-generic-exception"
    text: "Do not use generic exceptions"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/no-if-true"
    tag: "no-if-true"
    text: "do not compare to True in a condition"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/no-range-loop-with-len"
    tag: "no-range-loop-with-len"
    text: "Do not use for i in range(len(<array>))"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/no-silent-exception"
    tag: "no-silent-exception"
    text: "Do not ignore Exception with a pass statement"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/open-add-flag"
    tag: "open-add-flag"
    text: "do not define an open flag for reading"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/os-environ-no-assign"
    tag: "os-environ-no-assign"
    text: "assigning to os.environ does not clear the environment"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/raising-not-implemented"
    tag: "raising-not-implemented"
    text: "Do not raise NotImplemented - it does not exists"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/return-bytes-not-string"
    tag: "return-bytes-not-string"
    text: "__bytes__ method should returns bytes, not string"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/return-outside-function"
    tag: "return-outside-function"
    text: "do not return outside a function"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/self-assignment"
    tag: "self-assignment"
    text: "do not assign to itself"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/slots-no-single-string"
    tag: "slots-no-single-string"
    text: "__slots__ should not be a single string"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/special-methods-arguments"
    tag: "special-methods-arguments"
    text: "ensure special methods have the correct arguments"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/static-method-no-self"
    tag: "static-method-no-self"
    text: "do not use self as parameter for static methods"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/too-many-nested-if"
    tag: "too-many-nested-if"
    text: "do not use too many nested if conditions"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/too-many-while"
    tag: "too-many-while"
    text: "do not use too many nested loops and conditions "
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/type-check-isinstance"
    tag: "type-check-isinstance"
    text: "use isinstance instead of type"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/unreachable-code"
    tag: "unreachable-code"
    text: "avoid unreachable code"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/use-callable-not-hasattr"
    tag: "use-callable-not-hasattr"
    text: "do not use hasattr to check if a value is callable"
python_code_style_data:
  - link: "/continuous_integration/static_analysis/rules/python-code-style/assignment-names"
    tag: "assignment-names"
    text: "variable names must use snake_case"
  - link: "/continuous_integration/static_analysis/rules/python-code-style/class-name"
    tag: "class-name"
    text: "class name should be CamelCase"
  - link: "/continuous_integration/static_analysis/rules/python-code-style/function-naming"
    tag: "function-naming"
    text: "function name and parameters should use snake_case"
  - link: "/continuous_integration/static_analysis/rules/python-code-style/max-class-lines"
    tag: "max-class-lines"
    text: "classes must be less than 100 lines"
  - link: "/continuous_integration/static_analysis/rules/python-code-style/max-function-lines"
    tag: "max-function-lines"
    text: "Functions must be less than 200 lines"
python_design_data:
  - link: "/continuous_integration/static_analysis/rules/python-design/function-too-long"
    tag: "function-too-long"
    text: "functions must have less than 100 lines"
python_django_data:
  - link: "/continuous_integration/static_analysis/rules/python-django/http-response-with-json-dumps"
    tag: "http-response-with-json-dumps"
    text: "use JsonResponse instead of HttpResponse to send JSON data"
  - link: "/continuous_integration/static_analysis/rules/python-django/jsonresponse-no-content-type"
    tag: "jsonresponse-no-content-type"
    text: "do not specify content-type for JsonResponse"
  - link: "/continuous_integration/static_analysis/rules/python-django/model-charfield-max-length"
    tag: "model-charfield-max-length"
    text: "always specify max_length for a Charfield"
  - link: "/continuous_integration/static_analysis/rules/python-django/model-help-text"
    tag: "model-help-text"
    text: "use help_text to document model columns"
  - link: "/continuous_integration/static_analysis/rules/python-django/no-null-boolean"
    tag: "no-null-boolean"
    text: "do not use NullBooleanField"
  - link: "/continuous_integration/static_analysis/rules/python-django/no-unicode-on-models"
    tag: "no-unicode-on-models"
    text: "do not use __unicode__"
  - link: "/continuous_integration/static_analysis/rules/python-django/use-convenience-imports"
    tag: "use-convenience-imports"
    text: "use convenience imports whenever possible"
python_flask_data:
  - link: "/continuous_integration/static_analysis/rules/python-flask/use-jsonify"
    tag: "use-jsonify"
    text: "use jsonify instead of json.dumps for JSON output"
python_inclusive_data:
  - link: "/continuous_integration/static_analysis/rules/python-inclusive/comments"
    tag: "comments"
    text: "check comments for wording issues"
  - link: "/continuous_integration/static_analysis/rules/python-inclusive/function-definition"
    tag: "function-definition"
    text: "check function names for wording issues"
  - link: "/continuous_integration/static_analysis/rules/python-inclusive/variable-name"
    tag: "variable-name"
    text: "check variable names for wording issues"
python_pandas_data:
  - link: "/continuous_integration/static_analysis/rules/python-pandas/arith-operator-not-functions"
    tag: "arith-operator-not-functions"
    text: "Use arithmetic operator instead of a function"
  - link: "/continuous_integration/static_analysis/rules/python-pandas/avoid-inplace"
    tag: "avoid-inplace"
    text: "Avoid using inplace=True"
  - link: "/continuous_integration/static_analysis/rules/python-pandas/comp-operator-not-function"
    tag: "comp-operator-not-function"
    text: "Use operators to compare values, not functions"
  - link: "/continuous_integration/static_analysis/rules/python-pandas/import-as-pd"
    tag: "import-as-pd"
    text: "Import pandas according to coding guidelines"
  - link: "/continuous_integration/static_analysis/rules/python-pandas/isna-instead-of-isnull"
    tag: "isna-instead-of-isnull"
    text: "Use isna instead of isnull"
  - link: "/continuous_integration/static_analysis/rules/python-pandas/loc-not-ix"
    tag: "loc-not-ix"
    text: "prefer iloc or loc rather than ix"
  - link: "/continuous_integration/static_analysis/rules/python-pandas/notna-instead-of-notnull"
    tag: "notna-instead-of-notnull"
    text: "prefer notna to notnull"
  - link: "/continuous_integration/static_analysis/rules/python-pandas/pivot-table"
    tag: "pivot-table"
    text: "Use pivot_table instead of pivot or unstack"
  - link: "/continuous_integration/static_analysis/rules/python-pandas/use-read-csv-not-read-table"
    tag: "use-read-csv-not-read-table"
    text: "prefer read_csv to read_table"
further_reading:
  - link: "/continuous_integration/static_analysis/"
    tag: "Documentation"
    text: "Learn about Datadog Static Analysis"
---

## Overview

{{% site-region region="us,us3,us5,eu,ap1" %}}
<div class="alert alert-warning">
  Static Analysis is in private beta. Python is the only supported language. To request access, <a href="/help">contact Support</a>.
</div>
{{% /site-region %}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Static Analysis is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

Datadog Static Analysis provides out-of-the-box rules to help detect violations in your CI/CD pipelines in code reviews and identify bugs, security, and maintainability issues. For more information, see the [Static Analysis documentation][1].

## Rules

### Follow best practices for writing Python code

**Ruleset ID:** `python-best-practices`

Best practices for Python to write efficient and bug-free code.

{{< sa-rule-list "python_best_practices_data" >}}

<br>

### Enforce Python code style

**Ruleset ID:** `python-code-style`

Rules to enforce Python code style.

{{< sa-rule-list "python_code_style_data" >}}

<br>

### Check Python program structure

**Ruleset ID:** `python-design`

Rules to check your Python program structure, including things like nested loops.

{{< sa-rule-list "python_design_data" >}}

<br>

### Check for Django best practices and security

**Ruleset ID:** `python-django`

Rules specifically for Django best practices and security.

{{< sa-rule-list "python_django_data" >}}

<br>

### Check for Flask best practices and security

**Ruleset ID:** `python-flask`

Rules specifically for Flask best practices and security.

{{< sa-rule-list "python_flask_data" >}}

<br>

### Check Python code for wording issues

**Ruleset ID:** `python-inclusive`

Rules for Python to avoid inappropriate wording in the code and comments.

{{< sa-rule-list "python_inclusive_data" >}}

<br>

### Good practices for data science with pandas

**Ruleset ID:** `python-pandas`

A set of rules to check that pandas code is used appropriately.

 - Ensures `import` declarations follow coding guidelines.
 - Avoid deprecated code and methods.
 - Avoid inefficient code whenever possible.

{{< sa-rule-list "python_pandas_data" >}}

<br>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/static_analysis
