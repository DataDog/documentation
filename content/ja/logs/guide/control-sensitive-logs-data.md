---
title: Control Sensitive Logs Data
kind: guide
aliases:
  - /logs/guide/restrict-access-to-sensitive-data-with-rbac
further_reading:
  - link: /logs/guide/logs-rbac/
    tag: Documentation
    text: Set up Roles Based Access Controls (RBAC) for Log Management
  - link: /agent/logs/advanced_log_collection
    tag: Documentation
    text: Filter and Redact logs with Advanced Log Collection
  - link: /agent/guide/autodiscovery-management/
    tag: Documentation
    text: Exclude containers from Log Collection with Autodiscovery
  - link: "https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/"
    tag: Blog
    text: Build compliance, governance, and transparency across your teams with Datadog Audit Trail
---

## Overview

Logs may contain sensitive data, and should be handled carefully. If you are ingesting sensitive data into Datadog, consider the following:

- If you have intentionally set up your logs to have sensitive data for legitimate troubleshooting and auditing purposes, use the **Roles Based Access Control** to ensure that you have set up appropriate restrictions so only authorized users who have access to your Datadog account can access this data. For more information, see the [Logs Roles Based Access Control (RBAC) User's Guide][1] to learn how to configure it for your organization.
- Address any unintentional logging of sensitive data to preemptively address any concerns down the road. Continue with this guide to learn more.

Controlling all of your data can be challenging, especially on a large and collaborative platform. This guide walks you through the different options to discover and manage sensitive data that is ingested into Datadog.

## Sensitive Data Scanner

[Sensitive Data Scanner][2] is a stream-based, pattern matching service that you can use to identify, tag, and optionally redact or hash sensitive data. With this capability, your security and compliance teams can introduce a line of defense in preventing sensitive data from leaking outside your organization. Sensitive Data Scanner is available in your [Organization Settings][3].

If you have already indexed logs that contain sensitive data, then follow these three steps:

1. [Determine the scope of the data being sent](#determine-the-scope-of-the-data-being-sent)
2. [Fix the source of the data upstream](#fix-the-source-of-the-data-upstream)
3. [Handle data already sent to Datadog](#handle-data-already-sent-to-and-indexed-in-datadog)

## Determine the scope of the data being sent

### What log query defines sensitive data?

First, define a query that outlines the sensitive data. That query will return all logs with sensitive data.

Chances are that queries such as `version:x.y.z source:python status:debug` match that expectation. Refer to the [Log Search Syntax][4] documentation if you need to use more advanced operators (wildcards, boolean operators, etc.).

This guide refers to this example query as the **sensitive outline query**.

### Where does sensitive data live in Datadog?

Once sensitive data in logs is sent to the Datadog platform, it may exist in a number of places. As a result, check each of the following (ordered from most likely to have sensitive data to least likely):

* Datadog [Indexes][5] are where logs are stored in Datadog until they age out according to index retention. Focus should be on Datadog Indexes as other locations are less likely to be a compliance concern. Check [indexes filters][6] and [exclusion filters][7] to see if logs with sensitive data are indexed.

* Log [Archives][8], which is where Datadog sends logs to be stored. Set up Archive Filters to see if your archive contains sensitive logs.

* [Metrics generated from logs][9], which stores aggregated metrics. Sensitive data may have been discarded with this process. Check custom metrics filters to see if logs with sensitive data are processed.

* [Log Monitors][10] notifications when they include [Log Samples][11]. Check specifically for monitors triggered during the period when sensitive data was being sent.

* [Live Tail][12], where logs are viewed in real-time by your organization's users. There is no persistence beyond the 50 logs cached in browsers, and for broader queries, the result can be extremely sampled.

## Fix the source of the data upstream

### Redact sensitive data in streaming logs using Sensitive Data Scanner

Use out-of-the-box or custom rules to [identify and redact other kinds of sensitive data][2] still coming in your logs.

### Stop indexing sensitive logs

If you're not using Sensitive Data Scanner, determine whether you want to exclude any new logs containing sensitive data from being indexed entirely. You'll still need to address the logs containing sensitive data already indexed in Datadog.

* Find which index(es) hold logs with sensitive data.
* For each index, add an exclusion filter based on the sensitive outline query.

{{< img src="logs/guide/sensitive/sensitive_exclusion-filters.png" alt="Sensitive Exclusion Filters" style="width:80%;" >}}

### Stop sending sensitive data to Datadog

If certain kinds of sensitive data are prohibited from leaving your environment and being ingested into Datadog, then add scrubbing rules at source collection.

If you have way to change the loggers themselves, Datadog provides you with solutions to prevent compliance-sensitive data from being sent outside of your platform when using the [Datadog Agent][13] for Log Collection:

* [Scrub sensitive data][14] from your logs before you send them to Datadog.
* Alternatively, use [Autodiscovery][15] to add fine-grained controls for containers log collection.

Similar scrubbing capabilities exist for the [Serverless Forwarder][16].

## Handle data already sent to and indexed in Datadog

Take the following steps according to your compliance requirements. You might not need to complete all steps.

### Make sensitive logs un-queryable in Datadog (until they age-out)

This step makes logs with sensitive data, both logs that already sent and logs that might keep flowing in, not queryable in Datadog (Explorer, Dashboards, and Livetail).

Use the [Data Access configuration page][17] and a sensitive outline query to define a [restriction][18] that applies to everyone in your organization. For example, the query mentioned above: `version:x.y.z source:python status:debug`.

**Note:** Using **NOT** in the sensitive outline query restricts users from seeing anything BUT matching logs.

{{< img src="logs/guide/sensitive/sensitive_data_access.png" alt="Sensitive Data Access" style="width:80%;" >}}

### Patch your archives

If you have to patch your archives to remove sensitive data, refer to the [format of archives][19] generated by Datadog documentation.

## Support

If you have a specific compliance questions or need help, contact Datadog [support][20]. When you contact support, it is helpful for you to have the following information available:

* The sensitive outline query or anything that could define sensitive data such as a timerange, a service, or an environment.
* Whether you use [Sensitive Data Scanner][21].
* Whether the sensitive data is still being sent into Datadog.
* Whether sensitive data has been indexed (in which index(es)) or turned into metrics.
* Whether you have already made sensitive data unqueryable.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/guide/logs-rbac/
[2]: /sensitive_data_scanner/
[3]: /account_management/org_settings/
[4]: /logs/search_syntax/
[5]: /logs/indexes
[6]: /logs/indexes#indexes-filters
[7]: /logs/indexes#exclusion-filters
[8]: /logs/archives
[9]: /logs/logs_to_metrics/
[10]: /monitors/types/log/
[11]: /monitors/types/log/#notifications
[12]: /logs/explorer/live_tail/
[13]: /agent/
[14]: /agent/logs/advanced_log_collection/?tab=configurationfile#scrub-sensitive-data-from-your-logs
[15]: /agent/guide/autodiscovery-management/?tab=containerizedagent
[16]: /serverless/forwarder#log-forwarding-optional
[17]: https://app.datadoghq.com/logs/pipelines/data-access
[18]: /account_management/rbac/permissions/?tab=ui#logs_read_data
[19]: /logs/archives/?tab=awss3#format-of-the-archives
[20]: /help/
[21]: https://www.datadoghq.com/blog/sensitive-data-scanner/
