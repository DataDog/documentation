# Notification Message Best Practices

# Overview

Monitoring systems are essential for keeping businesses and systems running smoothly. When a monitor is alerting, it means something needs attention.   
But detecting an issue only represents the tip of the iceberg; what you receive as notification is what will impact the resolution time the most.

Notification messages are the bridge between your monitoring system and the people who can fix the problem. If the message is unclear or poorly written, it can cause confusion, slow down response times, or even result in unresolved issues. On the other hand, a clear and actionable message helps your team quickly understand what’s wrong and what to do next.

This guide will show you how to write better notification messages. You’ll learn the key principles of effective communication, common mistakes to avoid, and tips for crafting messages that get results. Whether you’re a product manager, developer, or operations professional, this guide will help you create notifications that keep your systems reliable and your team efficient.

# Notification Configuration

When configuring your monitors, one required step is to configure the notification.  
![][image1]

There are several fields to fill to configure it:

* Monitor Name, which is also the Notification title.  
* Monitor Message, which is the body of the notification.

## Name

The monitor title should give a clear description of the signal, including:

* What’s the failure mode (if there’s only one) or the diverging metrics  
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

* Conditional variables that use “*if-else”* logic to tweak the context of the message depending on some conditions, such as the state of the monitor.  
* Template variables to enrich your monitor notifications with contextual information.

Variables are especially important in a **Multi-Alert** monitor. When it triggers, you want to know which group triggered the monitor, and that’s where variables are handy.

Example:  
Let’s say you are monitoring the CPU usage of your containers, grouped by host.  
![][image2]  
A great variable to use would be **{{host.name}}** to know the exact host that  triggered the alert.

### Conditional variables

These variables allow you to tailor the notification message based on your needs and use case by building some branch logic.

For example, if you’d like to get notified only if a certain group triggers, you can use {{\#is\_exact\_match}} variable.  
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

**\#\# What’s happening?**  
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


[image1]: <data:image/png;base64,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>

[image2]: <data:image/png;base64,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>
