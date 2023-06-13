---
title: Static Analysis Rules 
kind: documentation
description: View rules for multiple languages for Static Analysis.
is_beta: true
python_code_style_type:
  - link: "/continuous_integration/static_analysis/rules/python-code-style/assignment-names"
    tag: "Assignment Names"
    text: "TBD"
  - link: "/continuous_integration/static_analysis/rules/python-code-style/function-naming"
    tag: "Function Naming"
    text: "TBD"
  - link: "/continuous_integration/static_analysis/rules/python-code-style/max-function-lines"
    tag: "Maximum Function Lines"
    text: "TBD"
python_best_practices_type:
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/argument-same-name"
    tag: "Argument Same Name"
    text: "TBD"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/class-methods-use-self"
    tag: "Class Methods Use Self"
    text: "TBD"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/ctx-manager-enter-exit-define"
    tag: "Context Manager Enter Exit Defined"
    text: "TBD"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/exception-inherit"
    tag: "Exception Inherit"
    text: "TBD"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/finally-no-break-continue-return"
    tag: "Finally No Break Continue Return"
    text: "TBD"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/format-string"
    tag: "Format String"
    text: "TBD"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/function-variable-argument-name"
    tag: "Function Variable Argument Name"
    text: "TBD"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/generic-exception-last"
    tag: "Generic Exception Last"
    text: "TBD"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/if-return-no-else"
    tag: "If Return No Else"
    text: "TBD"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/if-return-no-else"
    tag: "Import Modules Twice"
    text: "TBD"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/init-method-required"
    tag: "Init Method Required"
    text: "TBD"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/init-no-return-value"
    tag: "Init No Return Value"
    text: "TBD"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/logging-no-format"
    tag: "Logging No Format"
    text: "TBD"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/nested-blocks"
    tag: "Nested Blocks"
    text: "TBD"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/no-assert-on-tuples"
    tag: "No Assert On Tuples"
    text: "TBD"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/no-assert"
    tag: "No Assert"
    text: "TBD"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/no-base-exception"
    tag: "No Base Exception"
    text: "TBD"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/no-datetime-today"
    tag: "No Date Time Today"
    text: "TBD"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/no-double-not"
    tag: "No Double Not"
    text: "TBD"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/no-exit"
    tag: "No Exit"
    text: "TBD"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/no-generic-exception"
    tag: "No Generic Exception"
    text: "TBD"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/no-if-true"
    tag: "No If True"
    text: "TBD"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/no-range-loop-with-len"
    tag: "No Range Loop with Len"
    text: "TBD"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/no-silent-exception"
    tag: "No Silent Exception"
    text: "TBD"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/open-add-flag"
    tag: "Open Add Flag"
    text: "TBD"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/raising-not-implemented"
    tag: "Raising Not Implemented"
    text: "TBD"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/replace-format-string"
    tag: "Replace Format String"
    text: "TBD"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/self-assignment"
    tag: "Self Assignment"
    text: "TBD"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/special-methods-arguments"
    tag: "Special Methods Argument"
    text: "TBD"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/unreachable-code"
    tag: "Unreachable Code"
    text: "TBD"
further_reading:
  - link: "/continuous_integration/static_analysis/configuration"
    tag: "Documentation"
    text: "Learn how to set up Static Analysis"
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

### `python-best-practices`

Best practices for Python to write efficient and bug-free code.

{{< partial name="continuous_integration/rule-type.html" >}}

</br>

### `python-code-style`

Rulesets to enforce Python code style.

{{< partial name="continuous_integration/ruleset-type.html" >}}

</br>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/static_analysis