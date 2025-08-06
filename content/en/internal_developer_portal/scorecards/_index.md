---
title: Scorecards
aliases:
  - /tracing/software_catalog/scorecards
  - /tracing/service_catalog/scorecards
  - /service_catalog/scorecards
  - /software_catalog/scorecards
further_reading:
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

{{< callout url="#" btn_hidden="true" header="false" >}}
Scorecards are in Preview.
{{< /callout >}}

{{< img src="/tracing/software_catalog/scorecard-overview.png" alt="Scorecards dashboard highlighting Production Readiness out-of-the-box rules" style="width:90%;" >}}

## Overview

Scorecards help you monitor, prioritize, plan, and communicate effectively to take informed actions that improve your software's health and performance. Each scorecard shows the status for Production Readiness, Observability Best Practices, and Documentation & Ownership. All entities with defined metadata in the Software Catalog are automatically evaluated against a set of pass-fail criteria.

You can select the rules used to populate the Scorecards, and you can generate reports, which are sent directly to your team's Slack channel, to regularly report on scorecard results.

## Get started

{{< whatsnext desc="Set up Scorecards and explore how they can help your team:" >}}
    {{< nextlink href="/internal_developer_portal/scorecards/scorecard_configuration/" >}}Configure Scorecards{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/scorecards/custom_rules/" >}}Create custom rules{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/scorecards/using_scorecards/" >}}Learn what you can do with Scorecards{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /service_management/service_level_objectives/
[3]: https://app.datadoghq.com/monitors/recommended
[4]: /tracing/services/deployment_tracking/
[5]: /tracing/other_telemetry/connect_logs_and_traces/
[6]: /tracing/software_catalog/
[7]: /getting_started/tagging/unified_service_tagging/
[8]: https://app.datadoghq.com/services/scorecard
[9]: /service_management/workflows/
[10]: /api/latest/service-scorecards/
