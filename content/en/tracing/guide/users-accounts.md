---
title: Setting and Querying User and Account Information in Traces
disable_toc: false
further_reading:
- link: "/real_user_monitoring/correlate_with_other_telemetry/apm/"
  tag: "Documentation"
  text: "Connect RUM and APM"
- link: "/standard-attributes/"
  tag: "Documentation"
  text: "Standard Attributes"
- link: "/product_analytics/profiles/"
  tag: "Documentation"
  text: "User and Account Profiles"
---

## Overview

Getting visibility into users and accounts in APM helps you understand which users are affected by performance issues or errors. User and account information is displayed in the [APM Investigator][8] and [Error Tracking issues][9].

{{< img src="tracing/guide/user-accounts/user-account-apm-investigator.png" alt="User and account information displayed in APM Investigator showing impacted users and accounts" style="width:100%;" >}}

By tagging traces with user and account identifiers, you can:
- Track which users are impacted by backend errors or latency issues.
- Analyze performance split by user or account segments.
- Monitor user-specific behaviors across your distributed systems.

## Tag user and account information in spans

### From RUM

If you're already collecting Real User Monitoring data, you can propagate user and account information from browser or mobile applications to your backend traces:

1. Set user and account information using the [`datadogRum.setUser()`][1] and [`datadogRum.setAccount()`][2] APIs in your browser application.

2. Enable trace propagation by configuring `allowedTracingUrls` in your RUM SDK initialization. See [Connect RUM and Traces][3] for detailed setup instructions. Additionally, set `propagateTraceBaggage` to `true`, to automatically propagate user and account context in the [baggage][10] to backend traces alongside the trace context.

The user and account information is automatically remapped in the backend to the [`usr.id` and `account.id` standard attributes][4], making it consistent across all your traces. Standard attributes allow you to filter and search your trace data consistently across all your services.

### From APM SDKs

For backend services or applications without RUM, you can tag spans directly using APM SDKs:

1. Use the [span tagging API][5] (`set_tag`, `SetTag`, or `setTag` depending on your language) to add `usr.id` and `account.id` attributes to your spans.

2. To propagate user and account information across service boundaries, use [trace context propagation with baggage][6].

**Example (Python):**

```python
from ddtrace import tracer

# Tag the span with user and account information
span = tracer.current_root_span()
span.set_tag("usr.id", "user_123")
span.set_tag("account.id", "account_456")

# Set baggage to propagate across service boundaries
span.context.set_baggage_item("user.id", "user_123")
span.context.set_baggage_item("account.id", "account_456")
```

**Note**: When propagating user and account information through baggage, this information is only tagged on [service entry spans][11]. This means the `usr.id` and `account.id` attributes appear on the first span of each service in your distributed trace.

## Query trace data with user and account information

Tagging spans with user and account IDs enables powerful analysis, giving you visibility into how backend errors and latency affect end-users.

<div class="alert alert-info">
Enrich your trace analysis by querying span data with attributes from <a href="/product_analytics/profiles/">Product Analytics User and Account Profiles</a>. To express interest in this upcoming capability, <a href="/help/">reach out to Support</a>.
</div>

#### Filter traces by user or account in the APM Trace Explorer

Query traces using the `usr.id` or `account.id` attributes:

- Search for all traces from a specific user or account: `@usr.id:user_123` or `@account.id:account_456`.
- Combine with other filters: `@usr.id:user_123 service:checkout status:error`.

This allows you to investigate issues affecting specific users or accounts and understand their end-to-end experience across your distributed system.

#### Identify which users or accounts are most affected by errors or latency

Analyze error patterns and latency issues across your user base to prioritize fixes based on business impact:

- Use [Tag Analysis][17] to identify which users or accounts are disproportionately affected by errors or high latency on backend services.
- [Group queries][18] by `usr.id` or `account.id` to analyze error rates or latency percentiles by user or account.
- View user and account impact directly in the [APM Investigator][8] and [Error Tracking issues][9] to understand the scope of production problems.

This helps you prioritize incident response based on the number of affected users or the importance of affected accounts.

#### Create monitors and alerts based on user or account segments

Set up [APM monitors][19] that alert you when specific user segments experience degraded performance:

- Create error rate monitors filtered by premium account tiers: `@account.id:premium_* status:error`.
- Alert on latency spikes for critical users: `@usr.id:vip_user_* @duration:>5s`.
- Monitor SLA compliance for enterprise accounts by setting monitors on specific account IDs.

This enables proactive monitoring and ensures you can respond quickly when high-value users or accounts experience issues.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/advanced_configuration/#identify-user-session
[2]: /real_user_monitoring/browser/advanced_configuration/#identify-account
[3]: /real_user_monitoring/correlate_with_other_telemetry/apm/
[4]: /standard-attributes/?search=usr.id
[5]: /tracing/trace_collection/custom_instrumentation/
[6]: /tracing/trace_collection/trace_context_propagation/#baggage
[7]: /product_analytics/profiles/
[8]: /tracing/guide/latency_investigator/
[9]: /error_tracking/explorer/
[10]: /tracing/glossary/#baggage
[11]: /glossary/#service-entry-span
[12]: /help/
[13]: /tracing/services/service_page/
[14]: /tracing/services/resource_page/
[15]: /tracing/trace_explorer/trace_view/
[16]: /tracing/trace_explorer/
[17]: /tracing/trace_explorer/tag_analysis/
[18]: /tracing/trace_explorer/query_syntax/#trace-groups
[19]: /monitors/types/apm/
