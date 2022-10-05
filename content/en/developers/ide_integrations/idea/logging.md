---
title: Doc Title
kind: <UPDATE>
disable_toc: false
aliases:
- /path-to-old-doc/
further_reading:
- link: "/logs/log_collection/java/"
  tag: "Documentation"
  text: "Java Log Collection"
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Log Explorer"
---

The Datadog plugin for IntelliJ IDEA provides several ways to perform a [Datadog log query][1] directly from the source files in your project.

The plugin auto-detects log context (logger name and level) for popular Java logging frameworks such as Log4J2, Logback, SLF4J, and `java.util.logging`, and populates a log query with the service, environment, and time frame using the current plugin settings.

Perform a log query using IntelliJ [intention actions][2] or using the context menu.

## Configurable log query

To open a configurable log query:
1. Click on a line in your code.
1. If a bulb icon appears, click on the on the bulb icon and select **Show Logs View...**.
1. (Alternatively) Right-click the line and select **Datadog**, **View Logs...**.
  A dialog box opens with a pre-populated list of log attributes detected from the source file.
  {{< img src="/developers/ide_integrations/idea/log-navigation-dialog.png" alt="A bulb icon indicates an intention action" style="width:100%;" >}}
1. (Optional) Edit the fields for **Name**, **Levels** and **Text**.
1. (Optional) Check Exclude to exclude the **Text** field from the log query.
1. (Optional) In the **Datadog** section, edit the **Logs View**, **Service** and **Environment** fields.
1. (Optional) Check **Any** next to the Service or Environment fields to exclude them from the log query.
1. Click **Open in Browser** to open a log query in Datadog.

## Other context actions

To quickly open a log query in Datadog without first modifying the log query:
1. Right-click a line in a source file and select **Datadog**.
1. Select on of the following log actions:
   - **View Recent Logs**: Opens a log stream for the current service in Datadog. The log stream shows the environment and time frame, filtered by logger name and log level.
   - **View Log Patterns**: Similar to **View Recent Logs**, but opens a stream with pattern aggregation enabled.
   - **Tail Live Logs**: Opens a logs view showing the very latest logs ingested for a service. The view is filtered by logger name if one is detected.

{{< img src="/developers/ide_integrations/idea/log-context-menu.png" alt="A bulb icon indicates an intention action" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/
[2]: https://www.jetbrains.com/help/idea/intention-actions.html