---
title: Notification Message Best Practices
description: "Best practices for writing clear, actionable monitor notification messages with variables, conditional logic, and structured templates."
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


| Needs Revision | Improved Title                          | 
| -------------- | --------------------------------------- | 
| Memory usage   | High memory usage on {{pod\_name.name}} |

While both the examples refer to a memory consumption monitor, the improved title gives a thorough representation with essential context for focused investigation.

### Message

On-call responders rely on the notification body to understand and act on alerts. Write concise, accurate, and legible messages for clarity.

- Precisely mention what is failing and list major root causes
- Add a solution runbook for quick resolution guidance
- Include links to relevant pages for clear next steps
- Ensure notifications are sent to the appropriate recipients, either as direct email notifications or through [integration handles][1] (such as Slack).

Read the following sections to explore advanced features that can further enhance your monitor messages.

#### Variables

Monitor message variables are dynamic placeholders that allow you to customize notification messages with real-time contextual information. Use variables to enhance message clarity, and provide detailed context. There are two types of variables:

| Variable Type | Description | 
|---------------------|-----------------------------------------------------------------------------------------------------| 
| [Conditional](#conditional-variables) | Uses "if-else" logic to adjust the message context based on conditions like monitor state. | 
| [Template](#template-variables) | Enriches monitor notifications with contextual information. |

Variables are especially important in a **Multi-Alert** monitor. When triggered, you need to know which group is responsible. For example, monitoring CPU usage by container, grouped by host. A valuable variable is {{host.name}} indicating the host that triggered the alert.

{{< img src="/monitors/guide/notification_message_best_practices/query_parameters.png" alt="Example monitor query of container.cpu.usage metric averaged by host" style="width:100%;" >}}

#### Conditional variables

These variables allow you to tailor the notification message by implementing branch logic based on your needs and use case. Use conditional variables to notify different people/groups depending on the group that triggered the alert.

{{< code-block lang="text" >}}
{{#is_exact_match "role.name" "network"}}
  # The content displays if the host triggering the alert contains `network` in the role name, and only notifies @network-team@company.com.
  @network-team@company.com
{{/is_exact_match}}
{{< /code-block >}}

You can receive a notification if the group that triggered the alert contains a specific string.  

{{< code-block lang="text" >}}
{{#is_match "datacenter.name" "us"}}
  # The content displays if the region triggering the alert contains `us` (such as us1 or us3)
  @us.datacenter@company.com 
{{/is_match}}
{{< /code-block >}}

For more information and examples, see the [Conditional Variables][2] documentation. 

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

[1]: /monitors/notify/#integrations
[2]: /monitors/notify/variables/?tab=is_alert#conditional-variables
[3]: /monitors/notify/variables/?tab=is_alert#template-variables