---
title: Control sensitive logs data 
kind: guide
aliases:
  - /logs/guide/restrict-access-to-sensitive-data-with-rbac
further_reading:
  - link: /logs/guide/logs-rbac/
    tag: Documentation
    text: "Setup Role Based Access Controls (RBAC) for Log Management"
  - link: /agent/logs/advanced_log_collection
    tag: Documentation
    text: "Filter and Redact logs with Advanced Log Collection"
  - link: /agent/guide/autodiscovery-management/
    tag: Documentation
    text: "Exclude containers from Log Collection with Autodiscovery"

---

Your logs may hold sensitive customer data, so they may need specific care from a compliance standpoint. Once you realize that you are ingesting sensitive customer data into Datadog, consider these two things:

- If you have intentionally set up your logs to have sensitive data for legitimate troubleshooting and auditing purposes, use Roles Based Action Control to ensure that you have set up appropriate restrictions to ensure that only entitled users who have access to your Datadog account can access this data. For more information, see the [Logs Roles Based Access Control (RBAC) User's Guide][1] and learn how to configure it for your organization.
- If the sensitive data being sent from your platform into Datadog is unintentional, you have a compliance concern. Continue with this guide to learn about addressing that concern.

Controlling all of the data flow at any time can be challenging, especially on a large and highly collaborative platform. This guide walks you through the three steps you should take when you detect compliance-sensitive data from your platform:

1. [Identify](#determine-the-scope-of-the-leak) the nature and the scope of sensitive data leaking.
2. [Fix](#fix-the-leak-upstream) the leak upstream.
3. [Handle](#handle-leaked-data) sensitive data that has already leaked into Datadog.


## Determine the scope of the leak

### What log query defines sensitive data?

First, define a query that outlines the sensitive data. That query would return all logs with sensitive data and, ideally, only such logs. 

Chances are that queries such as `version:x.y.z source:python status:debug` match that expectation. Refer to the [Log Search Syntax][2] documentation if you need more advanced operators (wildcards, boolean operators, etc.) to get there.

This guide refers to that query as the **sensitive outline query**. Keep track of this query for the next steps.

{{< img src="logs/guide/sensitive/sensitive_outline_query.png" alt="Sensitive Outline Query" style="width:80%;" >}}

### Where did sensitive data leak so far?

Although there could be sensitive data coming in at multiple places in Datadog, focus on Datadog Indexes because other locations are likely a lesser compliance concern. 

* Datadog [Indexes][3] are where logs are stored with Datadog until they age out according to index retention. Check [indexes filters][4] and [exclusion filters][5] to see if logs with sensitive data are indexed.

* Check your Log [Archives][6], where Datadog sends logs to be stored on your end. Set up Archive Filters to see if your archive contains sensitive logs.

* Datadog [Metrics generated from Logs][7] storing aggregated metrics, meaning sensitive data likely have been discarded or crushed. Check custom metrics filters to see if logs with sensitive data are processed.

* Datadog [Log Monitors][8] notifications when they include [Log Samples][9]. Check specifically for monitors triggered during the period when sensitive data leaked. 

* Datadog [Livetail][10], where logs are streamed in web browsers from your organization's users. There is no persistence beyond the 50 logs cached in browsers, and for broader queries, the result can be highly sampled.


## Fix the leak upstream


### Stop indexing sensitive logs

This step is optional. It won't fix the compliance issue, but you can take immediate action before you commit to stopping the leak on your end.

* Find which index(es) logs holding sensitive data are susceptible to be routed.
* For each index, add an exclusion filter based on the sensitive outline query. It has to be **in the first place**. 

{{< img src="logs/guide/sensitive/sensitive_exclusion-filters.png" alt="Sensitive Exclusion Filters" style="width:80%;" >}}


### Stop sending sensitive data to Datadog

In case you have no straightforward way to change the loggers themselves, Datadog provides you with solutions to prevent compliance-sensitive data from being sent outside of your platform when using the [Datadog Agent][11] for Log Collection:

* [Scrub sensitive data][12] from your logs before you send them to Datadog.
* Alternatively, add fine-grained controls on which containers log collection happens with [Autodiscovery][13].

Similar scrubbing capabilities exist for the [Serverless Forwarder][14].


## Handle leaked data

Take the following steps according to your compliance requirements. You might not need to run through all of them.

### Make sensitive logs un-queryable in Datadog (until they age-out)

This step is a handy way to mitigate compliance issues. It aims at making the logs with sensitive data - both logs that already leaked and logs that might keep flowing in - not queryable in Datadog (Explorer, Dashboards, and Livetail). 

Use the [Data Access configuration page][15] and use the sensitive outline query to define a [restiction][16] that applies to everyone in your organization. 

**Note:** Using the **negation** of the sensitive outline query restricts users from seeing anything but matching logs.  

{{< img src="logs/guide/sensitive/sensitive_data_access.png" alt="Sensitive Data Access" style="width:80%;" >}}


### Patch your Archives

If you have to patch your archives to remove sensitive data, refer to the documented [format of archives][17] generated by Datadog.


### Reach out to support 

In case you have specific compliance questions or need a helping hand in fixing this, feel free to reach out to our [awesome support team][18]. When you contact our support team, it is helpful for you to have this information available to them:

* The sensitive outline query. Or anything that could define sensitive data such as a timerange, a service or an environment,
* Whether the sensitive data still leaking into Datadog,
* Whether sensitive data has been indexed (in which index(es)) or turned into metrics,
* Whether you have already made sensitive data unqueryable.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /logs/guide/logs-rbac/
[2]: /logs/search_syntax/
[3]: /logs/indexes
[4]: /logs/indexes#indexes-filters
[5]: /logs/indexes#exclusion-filters
[6]: /logs/archives
[7]: /logs/logs_to_metrics/
[8]: /monitors/monitor_types/log/
[9]: /monitors/monitor_types/log/#notifications
[10]: /logs/explorer/live_tail/
[11]: /agent/
[12]: /agent/logs/advanced_log_collection/?tab=configurationfile#scrub-sensitive-data-from-your-logs
[13]: /agent/guide/autodiscovery-management/?tab=containerizedagent
[14]: /serverless/forwarder#log-forwarding-optional
[15]: https://app.datadoghq.com/logs/pipelines/data-access
[16]: /account_management/rbac/permissions/?tab=ui#logs_read_data
[17]: /logs/archives/?tab=awss3#format-of-the-archives
[18]: /help/
