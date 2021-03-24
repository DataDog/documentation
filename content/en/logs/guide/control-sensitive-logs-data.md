---
title: Control sensitive logs data
kind: guide
aliases:
  - /logs/guide/restrict-access-to-sensitive-data-with-rbac
further_reading:
  - link: /logs/guide/logs-rbac/
    tag: Documentation
    text: "Set up Roles Based Access Controls (RBAC) for Log Management"
  - link: /agent/logs/advanced_log_collection
    tag: Documentation
    text: "Filter and Redact logs with Advanced Log Collection"
  - link: /agent/guide/autodiscovery-management/
    tag: Documentation
    text: "Exclude containers from Log Collection with Autodiscovery"

---

Logs may contain sensitive data, and should be handled carefully. If you are ingesting sensitive data into Datadog, consider the following:

- If you have intentionally set up your logs to have sensitive data for legitimate troubleshooting and auditing purposes, use the **Roles Based Access Control** to ensure that you have set up appropriate restrictions so only entitled users who have access to your Datadog account can access this data. For more information, see the [Logs Roles Based Access Control (RBAC) User's Guide][1] to learn how to configure it for your organization.
- Address any unintentional logging of sensitive data to preemptively address any concerns down the road. Continue with this guide to learn more.

Controlling all of your data can be challenging, especially on a large and highly collaborative platform. This guide walks you through the three steps you should take if you have compliance-sensitive data that is ingested into Datadog:

1. [Determine the scope of the data being sent](#determine-the-scope-of-the-data-being-sent)
2. [Fix the source of the data upstream](#fix-the-source-of-the-data-upstream)
3. [Handle data already sent to Datadog](#handle-data-already-sent-to-datadog)

## Determine the scope of the data being sent

### What log query defines sensitive data?

First, define a query that outlines the sensitive data. That query will return all logs with sensitive data.

Chances are that queries such as `version:x.y.z source:python status:debug` match that expectation. Refer to the [Log Search Syntax][2] documentation if you need to use more advanced operators (wildcards, boolean operators, etc.).

This guide refers to this example query as the **sensitive outline query**.

{{< img src="logs/guide/sensitive/sensitive_outline_query.png" alt="Sensitive Outline Query" style="width:80%;" >}}

### Where does sensitive data live in Datadog?

Once sensitive data in logs is sent to the Datadog platform, it may exist in a number of places. As a result, check each of the following (ordered from most likely to have sensitive data to least likely):

* Datadog [Indexes][3] are where logs are stored in Datadog until they age out according to index retention. Focus should be on Datadog Indexes as other locations are less likely to be a compliance concern. Check [indexes filters][4] and [exclusion filters][5] to see if logs with sensitive data are indexed.

* Log [Archives][6], which is where Datadog sends logs to be stored. Set up Archive Filters to see if your archive contains sensitive logs.

* [Metrics generated from logs][7], which stores aggregated metrics. Sensitive data may have been discarded with this process. Check custom metrics filters to see if logs with sensitive data are processed.

* [Log Monitors][8] notifications when they include [Log Samples][9]. Check specifically for monitors triggered during the period when sensitive data was being sent.

* [Livetail][10], where logs are viewed in real-time by your organization's users. There is no persistence beyond the 50 logs cached in browsers, and for broader queries, the result can be highly sampled.

## Fix the source of the data upstream

### Stop indexing sensitive logs

This is an optional step to prevent additional sensitive data from being sent to Datadog. However keep in mind that you’ll still need to address the sensitive data already sent to Datadog.

* Find which index(es) that hold sensitive data are susceptible to routing.
* For each index, add an exclusion filter based on the sensitive outline query.

{{< img src="logs/guide/sensitive/sensitive_exclusion-filters.png" alt="Sensitive Exclusion Filters" style="width:80%;" >}

### Stop sending sensitive data to Datadog

If you have way to change the loggers themselves, Datadog provides you with solutions to prevent compliance-sensitive data from being sent outside of your platform when using the [Datadog Agent][11] for Log Collection:

* [Scrub sensitive data][12] from your logs before you send them to Datadog.
* Alternatively, use [Autodiscovery][13] to add fine-grained controls for containers log collection.

Similar scrubbing capabilities exist for the [Serverless Forwarder][14].

## Handle data already sent to Datadog

Take the following steps according to your compliance requirements. You might not need to complete all steps.

### Make sensitive logs un-queryable in Datadog (until they age-out)

This step makes logs with sensitive data, both logs that already sent and logs that might keep flowing in, not queryable in Datadog (Explorer, Dashboards, and Livetail).

Use the [Data Access configuration page][15] and a sensitive outline query to define a [restriction][16] that applies to everyone in your organization. For example, the query mentioned above: `version:x.y.z source:python status:debug`.

**Note:** Using **NOT** in the sensitive outline query restricts users from seeing anything BUT matching logs.

{{< img src="logs/guide/sensitive/sensitive_data_access.png" alt="Sensitive Data Access" style="width:80%;" >}}

### Patch your archives

If you have to patch your archives to remove sensitive data, refer to the [format of archives][17] generated by Datadog documentation.

### Reach out to support

If you have a specific compliance questions or need help, contact Datadog [support][18]. When you contact support, it is helpful for you to have the following information available:

* The sensitive outline query or anything that could define sensitive data such as a timerange, a service, or an environment.
* Whether the sensitive data is still being sent into Datadog.
* Whether sensitive data has been indexed (in which index(es)) or turned into metrics.
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
