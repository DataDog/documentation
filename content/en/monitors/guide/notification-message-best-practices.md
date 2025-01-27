---
title: Notification Message Best Practices
further_reading:
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Learn more about Monitor Nofications"
---

# Overview

Monitors are essential for keeping businesses and systems running smoothly. When a monitor alerts, it signals that attention is needed. However, detecting an issue is only the tip of the iceberg, the notification is what greatly impacts the resolution time.

Notification messages are the bridge between your monitoring system and the people who can fix the problem. If the message is unclear or poorly written, it can cause confusion, slow down response times, or even result in unresolved issues. On the other hand, a clear and actionable message helps your team quickly understand what's wrong and what to do next.

This guide will show you how to write better notification messages. You'll learn the key principles of effective communication, common mistakes to avoid, and tips for crafting messages that get results. Whether you're a product manager, developer, or operations professional, this guide will help you create notifications that keep your systems reliable and your team efficient.

# Notification Configuration

When configuring your monitors, one required step is to configure the notification.  
{{< img src="/monitors/guide/notification_message_best_practices/monitor_notification_message.png" alt="Monitor notification message configuration" style="width:100%;" >}}

There are several fields to fill to configure it:

* Monitor Name, which is also the Notification title.  
* Monitor Message, which is the body of the notification.

## Name

The monitor title should give a clear description of the signal, including:

* What's the failure mode (if there's only one) or the diverging metrics  
* What resource (E.g. Datacenter, Kubernetes Cluster, host, service, … ) is affected

Given the above, when crafting the Monitor Name, that will also represent the Notification Subject, try to include the information needed to the responder to grasp the context of the alert at glance. 

Example of a good title:  
*High memory usage on {{pod\_name.name}}*

Example of a bad title:  
*Memory usage*

Although both the examples above are referring to a memory consumption monitor, the first one gives a complete representation of the ongoing issue with some necessary context to narrow down the investigation.

## Message

The notification body is one of the first things on-call responders will start to read to know how to act on the alert they just received. Be concise, write accurate information that is as legible as possible.

An actionable and effective **message** should precisely mention what is failing and list the major root causes. Without that information responders will need to gather the context needed to investigate the issue by themselves, delaying Mean Time To Repair (MTTR).

You can also guide responders towards resolution by **adding a solution runbook** directly in the monitor message to avoid unnecessary extra steps.

In all of the above, you should **include links** to relevant pages scoped down to the alerting context to give responders clear next steps.

Lastly, make sure your notification is routed to the right person/right recipients. There are several ways to receive a notification with Datadog:

* You can use your email address in the notification message to receive the notification directly in your inbox.  
* You can use [integrations](https://docs.datadoghq.com/monitors/notify/#integrations) handles to send your notifications to your desired integration (e.g. Slack)

In the following sections you will learn how to use advanced features to further enhance your monitor messages. 

### Variables

Using variables is a great way to tweak your notifications to receive just the right information that you need.   
You have 2 types of variables:

* Conditional variables that use "*if-else"* logic to tweak the context of the message depending on some conditions, such as the state of the monitor.  
* Template variables to enrich your monitor notifications with contextual information.

Variables are especially important in a **Multi-Alert** monitor. When it triggers, you want to know which group triggered the monitor, and that's where variables are handy.

Example:  
Let's say you are monitoring the CPU usage of your containers, grouped by host.  
{{< img src="/monitors/guide/notification_message_best_practices/query_parameters.png" alt="Example monitor query of container.cpu.usage metric averaged by host" style="width:100%;" >}}

A great variable to use would be **{{host.name}}** to know the exact host that  triggered the alert.

### Conditional variables

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

### Template variables

On the other hand, if you want to get the metadata that caused your monitor to alert, you can use template variables such as {{value}}, but also information related to the context of the alert.

Example:  
`The CPU for {{host.name}} (IP:{{host.ip}}) reached a critical value of {{value}}.`

For more information on all the available template variables, see the [documentation](https://docs.datadoghq.com/monitors/notify/variables/?tab=is_alert#triggered-variables).

Another way to use template variables is by creating dynamic links and handles, that will automatically route your notifications to the right handle or with the right links.  
Example of handles:  
`@slack-{{service.name}} There is an ongoing issue with {{service.name}}.`

Will result in the following when the group service:ad-server triggers:  
`@slack-ad-server There is an ongoing issue with ad-server.`

Example of links:  
[`https://app.datadoghq.com/dash/integration/system_overview?tpl_var_scope=host:{{host.name`](https://app.datadoghq.com/dash/integration/system_overview?tpl_var_scope=host:{{host.name)`}}`

# Example

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