---
title: Notification Message Best Practices
further_reading:
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Learn more about Monitor Notifications"
---

## Overview

Monitors are essential for keeping businesses and systems running smoothly. When a monitor alerts, it signals that attention is needed. However, detecting an issue is only the tip of the iceberg, the notification is what greatly impacts the resolution time.

Notification messages bridge the gap between your monitoring system and problem solvers. Unclear or poorly written messages can cause confusion, slow down response times, or unresolved issues. Whereas a clear and actionable message helps your team quickly understand what's wrong and what to do next.

Use this guide to improve your notification messages and learn about:
- Key principles of effective communication 
- Common mistakes to avoid
- Tips for crafting messages that get results

From product managers to developers, this resource ensures notifications enhance system reliability and team efficiency.

## Notification Configuration

The first step is to configure the notification with the required fields:
* [**Monitor Name**](#name), which is also the Notification title.  
* [**Monitor Message**](#message), which is the body of the notification.

{{< img src="/monitors/guide/notification_message_best_practices/monitor_notification_message.png" alt="Monitor notification message configuration" style="width:100%;" >}}


### Name

Craft the Monitor Name to include key information for the responder to quickly understand the alert context. The monitor title should give a clear and concise description of the signal, including:

* The failure mode(s) or the diverging metrics  
* What resource is affected (such as Datacenter, Kubernetes Cluster, host, or service)


|  Needs Revision    | Improved Title    | 
| ---  | ----------- | 
| *Memory usage* | *High memory usage on {{pod\_name.name}}* |

Although both the examples above are referring to a memory consumption monitor, the first one gives a complete representation of the ongoing issue with some necessary context to narrow down the investigation.

### Message

The notification body is one of the first things on-call responders will start to read to know how to act on the alert they just received. Be concise, write accurate information that is as legible as possible.

An actionable and effective **message** should precisely mention what is failing and list the major root causes. Without that information responders will need to gather the context needed to investigate the issue by themselves, delaying Mean Time To Repair (MTTR).

You can also guide responders towards resolution by **adding a solution runbook** directly in the monitor message to avoid unnecessary extra steps.

In all of the above, you should **include links** to relevant pages scoped down to the alerting context to give responders clear next steps.

Lastly, make sure your notification is routed to the right person/right recipients. There are several ways to receive a notification with Datadog:

* You can use your email address in the notification message to receive the notification directly in your inbox.  
* You can use [integrations](https://docs.datadoghq.com/monitors/notify/#integrations) handles to send your notifications to your desired integration (e.g. Slack)

In the following sections you will learn how to use advanced features to further enhance your monitor messages. 

#### Variables

Using variables is a great way to tweak your notifications to receive just the right information that you need.   
You have 2 types of variables:

* Conditional variables that use "*if-else"* logic to tweak the context of the message depending on some conditions, such as the state of the monitor.  
* Template variables to enrich your monitor notifications with contextual information.

Variables are especially important in a **Multi-Alert** monitor. When it triggers, you want to know which group triggered the monitor, and that's where variables are handy.

Example:  
Let's say you are monitoring the CPU usage of your containers, grouped by host.  
{{< img src="/monitors/guide/notification_message_best_practices/query_parameters.png" alt="Example monitor query of container.cpu.usage metric averaged by host" style="width:100%;" >}}

A great variable to use would be **{{host.name}}** to know the exact host that  triggered the alert.

#### Conditional variables

These variables allow you to tailor the notification message based on your needs and use case by building some branch logic.

For example, if you'd like to get notified only if a certain group triggers, you can use {{\#is\_exact\_match}} variable.  
Example:  
`{{#is_exact_match "role.name" "db"}}`  
  `` This displays if the host triggering the alert contains `db` ``  
  `in the role name. @db-team@company.com`  
`{{/is_exact_match}}`

That is also a way to notify different people/groups depending on the group that triggered the alert.  
Example:  
`{{#is_exact_match "role.name" "db"}}`  
  `` This displays if the host triggering the alert contains `db` ``  
  `in the role name. @db-team@company.com`  
`{{/is_exact_match}}`  
`{{#is_exact_match "role.name" "network"}}`  
  `` This displays if the host triggering the alert contains `network` ``  
  `in the role name. @network-team@company.com`  
`{{/is_exact_match}}`

You can receive a notification as well if the group that triggered the alert contains a specific string.  
Example:  
`{{#is_match "datacenter.name" "us"}}`  
  ``This displays if the region triggering the alert contains `us` (e.g. us1, us3, …). @us.datacenter@company.com``  
`{{/is_match}}`

For more information on how to use conditional variables, see the [documentation](https://docs.datadoghq.com/monitors/notify/variables/?tab=is_alert#conditional-variables). 

#### Template variables

Add monitor template variables to access the metadata that caused your monitor to alert, such as {{value}}, but also information related to the context of the alert.

For example, if you want to see the hostname, IP and value of the monitor query:
```
The CPU for {{host.name}} (IP:{{host.ip}}) reached a critical value of {{value}}.
```

For the list of available template variables, see the [documentation][3].

You can also use template variables to create dynamic links and handles that automatically route your notifications.  
Example of handles:  
```
@slack-{{service.name}} There is an ongoing issue with {{service.name}}.
```

Results in the following when the group service:ad-server triggers:  
```
@slack-ad-server There is an ongoing issue with ad-server.
```

Example of links:  
```
[https://app.datadoghq.com/dash/integration/system_overview?tpl_var_scope=host:{{host.name](https://app.datadoghq.com/dash/integration/system_overview?tpl_var_scope=host:{{host.name)}}
```

## Example of a notification message following best practices

**\#\# What's happening?**  
The CPU usage on {{host.name}} has exceeded the defined threshold.

Current CPU Usage: {{value}}  
Threshold: {{threshold}}  
Time: {{last\_triggered\_at\_epoch}}

**\#\# Impact**  
1\. Customers are experiencing lag on the website.  
2\. Timeouts and Errors.

**\#\# Why?**  
There can be several reasons as to why the CPU usage exceeded the threshold:

* Increase in traffic  
* Hardware Issues  
* External Attack

**\#\# How to troubleshoot/solve the issue?**  
1\. Analyze workload to identify CPU-intensive processes.  
  a. for OOM \- \[increase pod limits if too low\](***\<Link\>***)  
2\. Upscale {{host.name}} capacity by adding more replicas:  
  a. directly: ***\<Code to do so\>***  
  b. change configuration through \[add more replicas runbook\](***\<Link\>***)  
3\. Check for any \[Kafka issues\](***\<Link\>***)  
4\. Check for any other outages/incident (attempted connections)

**\#\# Related links**  
\* \[Troubleshooting Dashboard\](***\<Link\>***)  
\* \[App Dashboard\](***\<Link\>***)  
\* \[Logs\](***\<Link\>***)  
\* \[Infrastructure\](***\<Link\>***)  
\* \[Pipeline Overview\](***\<Link\>***)  
\* \[App Documentation\](***\<Link\>***)  
\* \[Failure Modes\](***\<Link\>***)  


## Further reading

{{< partial name="whats-next/whats-next.html" >}}