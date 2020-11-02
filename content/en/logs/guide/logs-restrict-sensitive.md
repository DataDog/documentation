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

First, define a query that outlines the senstive data. That query would return all the sensitive data and, ideally, only the sensitive data. 

Chances are that queries such as `version:x.y.z source:python status:debug` will match that expectaction. Refer to the [Log Search Syntax][11] documentation if you need more advanced operators (wildcards, boolean operators, etc.) to get there.


### Where did sensitive data leak so far?

As far as Datadog is concerned, sensitive data could have leaked into:

* Datadog [Indexes][], where




### Find 



## Fix the leak upstream

### Prevent compliance-sensitive data from leaking to Datadog

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

[92]: /agent/
[93]: /serverless/forwarder#log-forwarding-optional
[94]: /agent/logs/advanced_log_collection/?tab=configurationfile#scrub-sensitive-data-from-your-logs
[95]: /agent/guide/autodiscovery-management/?tab=containerizedagent
