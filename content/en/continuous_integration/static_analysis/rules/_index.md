---
title: Static Analysis Rules 
kind: documentation
description: View rules for multiple languages for Static Analysis.
is_beta: true
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

## Default rules

### `python-best-practices`

{{< whatsnext desc="See the following documentation about rules for Static Analysis to detect violations in best practices:">}}
    {{< nextlink href="continuous_integration/static_analysis/rules/python-best-practices/argument-same-name" >}}Argument Same Name{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/rules/python-best-practices/class-methods-use-self" >}}Class Methods Use Self{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/rules/python-best-practices/ctx-manager-enter-exit-defined" >}}Context Manager Enter/Exit Defined{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/rules/python-best-practices/exception-inherit" >}}Exception Inherit{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/rules/python-best-practices/finally-no-break-continue-return" >}}Finally No Break Continue Return{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/rules/python-best-practices/format-string" >}}Format String{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/rules/python-best-practices/function-variable-argument-name" >}}Function Variable Argument Name{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/rules/python-best-practices/generic-exception-last" >}}Generic Exception Last{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/rules/python-best-practices/if-return-no-else" >}}If Return No Else{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/rules/python-best-practices/import-modules-twice" >}}Import Modules Twice{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/rules/python-best-practices/init-method-required" >}}Init Method Required{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/rules/python-best-practices/init-no-return-value" >}}Init No Return Value{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/rules/python-best-practices/logging-no-format" >}}Logging No Format{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/rules/python-best-practices/nested-blocks" >}}Nested Blocks{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/rules/python-best-practices/no-assert-on-tuples" >}}No Assert On Tuples{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/rules/python-best-practices/no-assert" >}}No Assert{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/rules/python-best-practices/no-base-exception" >}}No Base Exception{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/rules/python-best-practices/no-datetime-today" >}}No Date Time Today{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/rules/python-best-practices/no-double-not" >}}No Double Not{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/rules/python-best-practices/no-exit" >}}No Exit{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/rules/python-best-practices/no-generic-exception" >}}No Generic Exception{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/rules/python-best-practices/no-if-true" >}}No If True{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/rules/python-best-practices/no-range-loop-with-len" >}}No Range Loop With Len{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/rules/python-best-practices/no-silent-exception" >}}No Silent Exception{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/rules/python-best-practices/open-add-flag" >}}Open Add Flag{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/rules/python-best-practices/raising-not-implemented" >}}Raising Not Implemented{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/rules/python-best-practices/replace-format-string" >}}Replace Format String{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/rules/python-best-practices/self-assignment" >}}Self Assignment{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/rules/python-best-practices/special-methods-arguments" >}}Special Methods Argument{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/rules/python-best-practices/unreachable-code" >}}Unreachable Code{{< /nextlink >}}
{{< /whatsnext >}}

### `python-code-style`

{{< whatsnext desc="See the following documentation about rules for Static Analysis to detect violations in code style:">}}
    {{< nextlink href="continuous_integration/static_analysis/rules/python-code-style/assignment-names" >}}Assignment Names{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/rules/python-code-style/function-naming" >}}Function Naming{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/rules/python-code-style/max-function-lines" >}}Maximum Function Lines{{< /nextlink >}}
{{< /whatsnext >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/static_analysis