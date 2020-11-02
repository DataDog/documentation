---
title: Restrict Access to Sensitive Data with Query Based Access Controls
kind: guide
further_reading:
  - /logs/guide/logs-rbac/
    tag: Documentation
    text: "Setup Role Based Access Controls (RBAC) for Log Management"
  - /agent/logs/advanced_log_collection
    tag: Documentation
    text: "Fix sensitive data leaking with Advanced Log Collection"
  - /agent/guide/autodiscovery-management/
    tag: Documentation
    text: "Exclude containers from Log Collection with Autodiscovery"

---

## Introduction

Logs are prone to hold sensitive data, and therefore need a specific care from a compliance standpoint. There are two approaches regarding sensitive data management:

* **Either** you require them for legit troubleshooting and auditing purposes, but with proper restrictions to ensure that only entitled users would have access. Then, refer to our [Logs Roles Based Access Control (RBAC) User's Guide][1] and learn how to configure it for your organisation.

* **Or** the simple fact that sensitive data is flowing out of your platform to Datadog is a compliance concern.


As a matter of fact, controlling everything at any time can be challenging, all the more on a wide and highly collaborative platform. This guide walks you through the three steps you should undergo when you detect compliance-sensitive data leaking out of your platform:

1. [Identify](#determine-the-scope-of-the-leak) the nature and the scope of sensitive data leaking.
2. [Fix](#fix-the-leak-upstream) the leak upstream.
3. [Handle](#handle-leaked-data) sensitive data that has already leaked into Datadog.


## Determine the scope of the leak

### What log query defines sensitive data?

First, define a query that outlines the senstive data. That query would return all logs with sensitive data and, ideally, only such logs. 

Chances are that queries such as `version:x.y.z source:python status:debug` will match that expectaction. Refer to the [Log Search Syntax][11] documentation if you need more advanced operators (wildcards, boolean operators, etc.) to get there.

This guide refers to that query as the **sensitive outline query**. Keep track of that query for next steps.


### Where did sensitive data leak so far?

As far as Datadog is concerned, sensitive data could have leaked into:

* Datadog [Indexes][12], where logs are actually stored on our end until they age out according to index retention. Check [indexes filters][14] and [exclusion filters][13] to see not if logs with sensitive data are actually indexed.

* Your [Archives][15] set with Datadog. These logs are stored on your end, meaning it might be a lesser compliance issue. Check Archive Filters to see if sensitive logs are routed there.

* Datadog [Metrics generated from Logs][17]. Only resulting aggregated metrics are stored on our end, meaning sensitive data likely have been discarded or crushed which can be a lesser compliance issue. Check custom metrics filters to see if logs with sensitive data are processed.

* Datadog [Livetail][16], where logs are streamed in web browsers from users of your organisation perform. There is no persitence beyond 50 logs cached in browsers, and for broader queries the result can be highly sampled. Overall, this might be a lesser compliance issue. 


## Fix the leak upstream

### Stop indexing sensitive logs

This step is optional. It won't fix the compliance issue, but is an immediate action you can take before you commit into stopping the leak on your end.

* Find in which


### Stop sending sensitive data to Datadog

Datadog provides you with solutions to prevent compliance-sensitive data to be sent outside of your platform when using the [Datadog Agent][92] for Log Collection:

* [Scrub sensitive data][94] from your logs before you send them to Datadog.
* Alternatively, fine-grained controls on which containers log collection happens with [Autodiscovery][95].

Similar scrubbing capabilities exist for the [Serverless Forwarder][83].


## Handle leaked data




{{< img src="logs/explorer/log_explorer_walkthrough_list.png" alt="Log List" style="width:60%;" >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/guide/logs-rbac/

[11]: /logs/search_syntax/
[12]: /logs/indexes
[13]: /logs/indexes#exclusion-filters
[14]: /logs/indexes#indexes-filters

[15]: /logs/archives
[16]: /logs/explorer/live_tail/
[17]: /logs/logs_to_metrics/

[92]: /agent/
[93]: /serverless/forwarder#log-forwarding-optional
[94]: /agent/logs/advanced_log_collection/?tab=configurationfile#scrub-sensitive-data-from-your-logs
[95]: /agent/guide/autodiscovery-management/?tab=containerizedagent
