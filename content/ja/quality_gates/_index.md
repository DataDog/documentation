---
title: Quality Gates
kind: documentation
description: Learn how to use Quality Gates to enable your team to control what code makes it to production.
is_beta: true
further_reading:
- link: "https://app.datadoghq.com/release-notes?category=Software%20Delivery"
  tag: Release Notes
  text: Check out the latest Software Delivery releases! (App login required)
- link: "https://www.datadoghq.com/blog/datadog-quality-gates/"
  tag: ブログ
  text: Enhance code reliability with Datadog Quality Gates
- link: "https://www.datadoghq.com/blog/datadog-github-deployment-protection-rules/"
  tag: ブログ
  text: Use Datadog monitors as quality gates for GitHub Actions deployments
- link: /quality_gates/explorer
  tag: Documentation
  text: Learn about the Quality Gates Explorer
- link: /account_management/audit_trail/
  tag: ドキュメント
  text: Learn about Audit Trail
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Quality Gates is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## 概要

Quality Gates allow you to control software quality by configuring rules to block substandard code from deployment. You have control over what is merged into the default branch and deployed to production, and can ensure that the code running in production adheres to high quality standards, reducing incidents and minimizing unwanted behaviors.

{{< img src="quality_gates/setup/pipeline_rule.png" alt="A pipeline rule that fails when code coverage for PCT is below or equal to zero in Quality Gates" style="width:100%" >}}

Use Quality Gates to:

* Create rules that block workflows using data in Datadog, ensuring that only code that meets your standards end up in production.
* Give your organization the ability to decide what code makes it to production, enhancing your deployment discipline and mitigating potential issues in live environments.
* Continually improve code quality and system performance with precise enforcement and customizable rules.

You can configure Quality Gates rules for the following categories: 

[Test Visibility][9]

: <br> - New flaky tests <br> - Performance regressions <br> - Code coverage

[Pipeline Visibility][10]

: <br> - Custom measures

[Static Analysis][11]

: <br> - Code vulnerability violations <br> - Code quality violations

[Software Composition Analysis][12]

: <br> - Vulnerabilities <br> - Detected licenses

By integrating Quality Gates [into your CI/CD pipelines][7], you can create a robust framework for maintaining and improving software quality that aligns with your organization's operational goals and business objectives. 

## セットアップ

Quality Gates offers the following rule types:

{{< tabs >}}
{{% tab "Tests" %}}

You can create rules to block code from being merged that introduces new [flaky tests][101].

{{< img src="quality_gates/setup/flaky_test.png" alt="A Quality Gate rule that blocks when one or more flaky tests occur" style="width:80%" >}}

[101]: /tests/guides/flaky_test_management/

{{% /tab %}}
{{% tab "Pipelines" %}}

You can create rules to block code from being merged that introduces issues that wouldn't normally fail your CI/CD pipelines, but end up being deployed to production.

{{< img src="quality_gates/setup/pipeline_rule.png" alt="A Quality Gate rule that fails when code coverage for PCT is below or equal to zero for a CI pipeline" style="width:80%" >}}

{{% /tab %}}
{{% tab "Static Analysis" %}}

You can create rules to block code from being merged that introduces code quality and code vulnerability violations.

{{< img src="quality_gates/setup/static_analysis.png" alt="A Quality Gate rule that fails when one or more new code quality violations with errors occur" style="width:80%" >}}

{{% /tab %}}
{{% tab "Software Composition Analysis" %}}

You can create rules to block code from being merged that introduces software vulnerabilities and forbidden licenses.

{{< img src="quality_gates/setup/sca.png" alt="A Quality Gate rule that fails when one or more new critical vulnerabilities are introduced" style="width:80%" >}}

{{% /tab %}}
{{< /tabs >}}

To create a Quality Gate rule, see the [Setup documentation][2]. 

## Search rules

You can evaluate and update quality control processes by accessing Quality Gates rules on the [**Quality Gates Rules** page][6]. Improve your deployment practices based on your project requirements and desired performance outcomes. 

{{< img src="quality_gates/rules_list.png" alt="List of Quality Gate rules in Datadog" style="width:100%" >}}

To search for Quality Gate rules, see the [Search and Manage documentation][5].

## Analyze executions in the Quality Gates Explorer

You can search and filter for quality gates or rule executions, create visualizations, and export saved views of your search query on the [**Quality Gates Executions** page][8].

{{< tabs >}}
{{% tab "Gates" %}}

{{< img src="quality_gates/explorer/gates_1.png" alt="Quality Gate results in the Quality Gates Explorer" style="width:100%" >}}

{{% /tab %}}
{{% tab "ルール実行" %}}

{{< img src="quality_gates/explorer/executions_1.png" alt="Quality Gate rule execution results in the Quality Gates Explorer" style="width:100%" >}}

{{% /tab %}}
{{< /tabs >}}

For more information, see the [Quality Gates Explorer documentation][8].

## ルール変更の追跡

[監査証跡][3]では、Quality Gates ルールを作成した人、変更した人、削除した人の情報を確認できます。

{{< img src="/quality_gates/audit_event.png" alt="A Quality Gates event in Datadog Audit Trail" style="width:100%" >}}

For more information, see the [Audit Trail documentation][4].

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tests/guides/flaky_test_management/
[2]: /quality_gates/setup/
[3]: /account_management/audit_trail/
[4]: /account_management/audit_trail/events/#ci-visibility-events
[5]: /quality_gates/search/
[6]: https://app.datadoghq.com/ci/quality-gates
[7]: /monitors/guide/github_gating/
[8]: /quality_gates/explorer/
[9]: /tests/
[10]: /continuous_integration/
[11]: /code_analysis/static_analysis
[12]: /code_analysis/software_composition_analysis