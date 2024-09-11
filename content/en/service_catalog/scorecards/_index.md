---
title: Service Scorecards
aliases:
  - /tracing/service_catalog/scorecards
further_reading:
- link: "/tracing/service_catalog/"
  tag: "Documentation"
  text: "Service Catalog"
- link: /api/latest/service-scorecards/
  tag: "Documentation" 
  text: "Service Scorecards API" 
- link: "https://www.datadoghq.com/blog/service-scorecards/"
  tag: "Blog"
  text: "Prioritize and promote service observability best practices with Service Scorecards"
- link: "https://www.datadoghq.com/blog/datadog-custom-scorecards/"
  tag: "Blog"
  text: "Formalize best practices with custom Scorecards"
- link: "/continuous_integration/dora_metrics/"
  tag: "Documentation"
  text: "Track DORA Metrics with Datadog" 
---

{{< callout url="#" btn_hidden="true" header="false" >}}
Service Scorecards are in beta.
{{< /callout >}}

{{< img src="/tracing/service_catalog/scorecard-overview.png" alt="Service Scorecards dashboard highlighting Production Readiness out-of-the-box rules" style="width:90%;" >}}

## Overview

Service Scorecards help you monitor, prioritize, plan, and communicate effectively to take informed actions that improve your service's health and performance. Each scorecard shows the status for Production Readiness, Observability Best Practices, and Documentation & Ownership. All services with defined metadata in the Service Catalog are automatically evaluated against a set of pass-fail criteria.

You can select the rules used to populate the Scorecards, and you can generate reports, which are sent directly to your team's Slack channel, to regularly report on scorecard results.

## Get started

{{< whatsnext desc="Set up Service Scorecards and explore how they can help your team:" >}}
    {{< nextlink href="/service_catalog/scorecards/scorecard_configuration/" >}}Configure Service Scorecards{{< /nextlink >}}
    {{< nextlink href="/service_catalog/scorecards/custom_rules/" >}}Create custom rules{{< /nextlink >}}
    {{< nextlink href="/service_catalog/scorecards/using_scorecards/" >}}Learn what you can do with Service Scorecards{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /service_management/service_level_objectives/
[3]: https://app.datadoghq.com/monitors/recommended
[4]: /tracing/services/deployment_tracking/
[5]: /tracing/other_telemetry/connect_logs_and_traces/
[6]: /tracing/service_catalog/
[7]: /getting_started/tagging/unified_service_tagging/
[8]: https://app.datadoghq.com/services/scorecard
[9]: /service_management/workflows/
[10]: /api/latest/service-scorecards/
