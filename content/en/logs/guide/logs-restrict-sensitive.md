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

{{< img src="logs/guide/sensitive/sensitive_outline_query.png" alt="Sensitive Outline Query" style="width:80%;" >}}

### Where did sensitive data leak so far?

As far as Datadog is concerned, sensitive data could have leaked into different places. Focus your attention on Datadog Indexes, other locations likely being a lesser compliance concern. 

* Datadog [Indexes][12], where logs are actually stored on our end until they age out according to index retention. Check [indexes filters][14] and [exclusion filters][13] to see not if logs with sensitive data are actually indexed.

* Your [Archives][15] set with Datadog storing logs on your end. Check Archive Filters to see if sensitive logs are routed there.

* Datadog [Metrics generated from Logs][17] storing aggregated metrics, meaning sensitive data likely have been discarded or crushed. Check custom metrics filters to see if logs with sensitive data are processed.

* Datadog [Log Monitors][18] notifications when they include [Log Samples][19]. Check specifically for monitors triggered during the period some sensitive data leaked. 

* Datadog [Livetail][16], where logs are streamed in web browsers from users of your organisation perform. There is no persitence beyond 50 logs cached in browsers, and for broader queries the result can be highly sampled.


## Fix the leak upstream


### Stop indexing sensitive logs

This step is optional. It won't fix the compliance issue, but is an immediate action you can take before you commit into stopping the leak on your end.

* Find in which index(es) logs holding sensitive data are susceptible to be routed.
* For each index, add an exclusion filter based on the sensitive outline query. It has to be **in the first place**. 

{{< img src="logs/guide/sensitive/sensitive_exclusion-filters.png" alt="Sensitive Exclusion Filters" style="width:80%;" >}}


### Stop sending sensitive data to Datadog

In case you have no straightforward way to change loggers themselves, Datadog provides you with solutions to prevent compliance-sensitive data to be sent outside of your platform when using the [Datadog Agent][92] for Log Collection:

* [Scrub sensitive data][94] from your logs before you send them to Datadog.
* Alternatively, fine-grained controls on which containers log collection happens with [Autodiscovery][95].

Similar scrubbing capabilities exist for the [Serverless Forwarder][93].


## Handle leaked data

Take the following steps according to your compliance requirements. You might not need to run through all of them.

### Make sensitive logs un-queryable in Datadog (until they age-out)

This step is a handy way to greatly mitigate compliance issues. It aims at making the logs with sensitive data - both logs that already leaked, and logs that might keep flowing in - not queryable in Datadog (Explorer, Dashboards and Livetail). 

Use the [Data Acccess configuration page][30] and use the sensitive outline query to define a [restiction][31] that applies to everyone in your organisation. Note to use the **negation** of the sensitive outline query, as this configuration is meant to restrict users to see nothing but matching logs.  

{{< img src="logs/guide/sensitive/sensitive_data_access.png" alt="Sensitive Data Access" style="width:80%;" >}}


### Patch your Archives

If you have to patch your archives to remove sensitive data, refer to the documented [format of archives][33] generated by Datadog.


### Reach out to support 

In case you have specific compliance questions or need a helping hand in fixing this, feel free to reach out to our support (support@datadoghq.com). Helpful information to support you are:

* The sensitive outline query. Or anything that could define sensitive data such as a timerange, a service or an environment,
* Whether the sensitive data still leaking into Datadog,
* Whether sensitive data has been indexed (in which index(es)) or turned into metrics,
* Whether you already made sensitive data unquery-able or not.


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
[18]: /monitors/monitor_types/log/
[19]: /monitors/monitor_types/log/#notifications

[30]: https://app.datadoghq.com/logs/pipelines/data-access
[31]: /account_management/rbac/permissions/?tab=ui#logs_read_data
[33]: /logs/archives/?tab=awss3#format-of-the-archives

[92]: /agent/
[93]: /serverless/forwarder#log-forwarding-optional
[94]: /agent/logs/advanced_log_collection/?tab=configurationfile#scrub-sensitive-data-from-your-logs
[95]: /agent/guide/autodiscovery-management/?tab=containerizedagent
