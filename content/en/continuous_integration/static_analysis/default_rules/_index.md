---
title: Default Static Analysis Rules
kind: documentation
type: static_analysis_rules
description: View rules for languages such as Python for Datadog Static Analysis.
is_beta: true
disable_sidebar: true
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

### Best practices

{{< whatsnext desc="See the following documentation about rules for Static Analysis to detect violations in best practices:">}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/best_practices/argument-same-name" >}}Argument Same Name{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/best_practices/class-methods-use-self" >}}Class Methods Use Self{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/best_practices/ctx-manager-enter-exit-defined" >}}Context Manager Enter/Exit Defined{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/best_practices/exception-inherit" >}}Exception Inherit{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/best_practices/finally-no-break-continue-return" >}}Finally No Break Continue Return{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/best_practices/format-string" >}}Format String{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/best_practices/function-variable-argument-name" >}}Function Variable Argument Name{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/best_practices/generic-exception-last" >}}Generic Exception Last{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/best_practices/if-return-no-else" >}}If Return No Else{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/best_practices/import-modules-twice" >}}Import Modules Twice{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/best_practices/init-method-required" >}}Init Method Required{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/best_practices/init-no-return-value" >}}Init No Return Value{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/best_practices/logging-no-format" >}}Logging No Format{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/best_practices/nested-blocks" >}}Nested Blocks{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/best_practices/no-assert-on-tuples" >}}No Assert On Tuples{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/best_practices/no-assert" >}}No Assert{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/best_practices/no-base-exception" >}}No Base Exception{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/best_practices/no-datetime-today" >}}No Date Time Today{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/best_practices/no-double-not" >}}No Double Not{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/best_practices/no-exit" >}}No Exit{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/best_practices/no-generic-exception" >}}No Generic Exception{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/best_practices/no-if-true" >}}No If True{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/best_practices/no-range-loop-with-len" >}}No Range Loop With Len{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/best_practices/no-silent-exception" >}}No Silent Exception{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/best_practices/open-add-flag" >}}Open Add Flag{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/best_practices/raising-not-implemented" >}}Raising Not Implemented{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/best_practices/replace-format-string" >}}Replace Format String{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/best_practices/self-assignment" >}}Self Assignment{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/best_practices/special-methods-arguments" >}}Special Methods Argument{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/best_practices/unreachable-code" >}}Unreachable Code{{< /nextlink >}}
{{< /whatsnext >}}

### Code style

{{< whatsnext desc="See the following documentation about rules for Static Analysis to detect violations in code style:">}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/code_style/assignment-names" >}}Assignment Names{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/code_style/function-naming" >}}Function Naming{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/code_style/max-function-lines" >}}Maximum Function Lines{{< /nextlink >}}
{{< /whatsnext >}}

### Security

{{< whatsnext desc="See the following documentation about rules for Static Analysis to detect violations in security:">}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/security/" >}}Security{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/security/avoid-random" >}}Avoid Random{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/security/aws-boto3-credentials" >}}AWS Boto3 Credentials{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/security/deserialize-untrusted-data" >}}Deserialize Untrusted Data{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/security/file-write-others" >}}File Write Others{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/security/insecure-hash-functions" >}}Insecure Hash Functions{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/security/insecure-jwt" >}}Insecure JSON Web Token (JWT){{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/security/insecure-ssl-protocols" >}}Insecure SSL Protocols{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/security/jinja2-autoescape" >}}Jinja2 Autoescape{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/security/mktemp" >}}Make A Temporary File{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/security/no-empty-array-as-parameter" >}}No Empty Array As Parameter{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/security/no-eval" >}}No Evaluation{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/security/request-verify" >}}Request Verify{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/security/requests-timeout" >}}Requests Timeout{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/security/sql-injection" >}}SQL Injection{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/security/sql-server-security-credentials" >}}SQL Server Security Credentials{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/security/ssl-unverified-context" >}}SSL Unverified Context{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/security/subprocess-shell-true" >}}Subprocess Shell True{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/security/variable-sql-statement-injection" >}}Variable SQL Statement Injection{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/default_rules/python/security/yaml-load" >}}YAML Load{{< /nextlink >}}
{{< /whatsnext >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/static_analysis
