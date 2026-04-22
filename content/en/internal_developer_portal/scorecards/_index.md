---
title: Scorecards
aliases:
  - /tracing/software_catalog/scorecards
  - /tracing/service_catalog/scorecards
  - /service_catalog/scorecards
  - /software_catalog/scorecards
further_reading:
- link: https://www.datadoghq.com/blog/datadog-forms
  tag: Blog
  text: Turn feedback into action across your engineering org with Datadog Forms
- link: "/tracing/software_catalog/"
  tag: "Documentation"
  text: "Software Catalog"
- link: /api/latest/service-scorecards/
  tag: "Documentation" 
  text: "Scorecards API" 
- link: "https://www.datadoghq.com/blog/service-scorecards/"
  tag: "Blog"
  text: "Prioritize and promote service observability best practices with Scorecards"
- link: "https://www.datadoghq.com/blog/datadog-custom-scorecards/"
  tag: "Blog"
  text: "Formalize best practices with custom Scorecards"
- link: "/continuous_integration/dora_metrics/"
  tag: "Documentation"
  text: "Track DORA Metrics with Datadog"
- link: "https://www.datadoghq.com/blog/scorecards-dogfooding/"
  tag: "Blog"
  text: "How we use Scorecards to define and communicate best practices at scale"
---

{{< img src="/tracing/software_catalog/scorecard-overview-updated.png" alt="Scorecards dashboard highlighting rule performance" style="width:90%;" >}}

## Overview

Scorecards help your team measure and continuously improve the health and performance of your software. As Platform Engineers, you can create Scorecards to automatically evaluate entities in your Software Catalog against defined criteria to surface areas that need attention.

You have full control over how scorecards are defined. In addition to the three sets of core Scorecards that the Datadog platform provides around Production Readiness, Observability Best Practices, and Documentation & Ownership, you can customize default rules or create new ones to match your team's priorities and reflect your own operational standards. This flexibility lets you tailor Scorecards to your organization's engineering culture and maturity.

Datadog evaluates the default Scorecards every 24 hours for all registered entities in the Software Catalog against a set of pass-fail criteria. You can turn off these default evaluations any time. You can configure the data input, evaluation criteria, and evaluation cadence for any customized rules using the [Scorecards API][1] or [Datadog Workflow Automation][2].  

Datadog can summarize Scorecard results into automated reports and deliver them directly through Slack, helping your team stay aligned, track improvements, and efficiently address gaps.

{{< callout url="https://www.datadoghq.com/product-preview/idp-preview-features/" d_target="#signupModal" btn_hidden="false" header="Sign up for early access to our upcoming features!" >}}
{{< /callout >}}

## Get started

{{< whatsnext desc="Set up Scorecards and explore how they can help your team:" >}}
    {{< nextlink href="/internal_developer_portal/scorecards/scorecard_configuration/" >}}Configure Scorecards{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/scorecards/custom_rules/" >}}Create custom rules{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/scorecards/using_scorecards/" >}}Learn what you can do with Scorecards{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/service-scorecards/
[2]: /service_management/workflows/
