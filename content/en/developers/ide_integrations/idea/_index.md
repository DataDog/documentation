---
title: Datadog Plugin For IntelliJ IDEA
kind: documentation
disable_toc: false
further_reading:
- link: "/account_management/api-app-keys/"
  tag: "Documentation"
  text: "Find out more about API and application keys."
---

**BANNER**: This is an early access preview release of the Datadog plugin, intended for customers that use the [**Continuous Profiler**](https://docs.datadoghq.com/profiler/#pagetitle). If the plugin stops working unexpectedly, check for plugin updates. Consider leaving us [feeback](#feedback).

## Overview

The **Datadog** plugin for IntelliJ IDEA enables developers to interact with Datadog services while they work on Java projects.

{{< img src="/developers/ide_integrations/idea/overview.png" alt="The Datadog plugin" style="width:100%;" >}}

The plugin features support for profiling and logging.

**Profiling**
- Source editor highlighting at method-level and line-level with navigation to the tool pane.
- Integration of aggregated profiling data to help developers remove costly bottlenecks in code.
- Top List and Flamegraph visualisations highlighting methods consuming the most resources with direct navigation to source code.
- Project tree annotations showing profiling information at the package and class level.

**Logging**
- Navigation to Datadog Logs views on the web directly from source files based on contextual information, such as the logger name and level, that is auto-detected for popular Java logging frameworks.

## Setup

The Datadog plugin for IntelliJ IDEA is in early access preview (EAP). To install the plugin, you must first add the EAP repository to IDEA.

### Enable the EAP repository

To provide access to the **Early Access Preview** repository in the JetBrains Marketplace:
1. In IDEA, open **Preferences** and click **Plugins**.
1. Click the settings icon and select **Manage Plugin Repositories...**.
1. Click the **+** button and add the text `https://plugins.jetbrains.com/plugins/list?channel=eap`.

### Install the Datadog plugin

To install the Datadog plugin:
1. Click **Plugins** and search for `Datadog`.
1. Click **Install** to download and install the plugin in your IDE.
1. If you receive a prompt notifying you that Datadog is a third-party plugin, click **Accept**.
1. Click **Restart IDE** to restart IDEA.

{{< img src="/developers/ide_integrations/idea/datadog-plugin.png" alt="The Datadog plugin" style="width:100%;" >}}

### Add Datadog credentials

The **Datadog** plugin connects to the Datadog platform using keys for authentication.

After installing the Datadog plugin and restarting IDEA, add your Datadog API and application keys to authenticate with Datadog:
1. With a file or project open in IDEA, click the **Datadog** tab.
1. Click **Add your credentials...**.
1. Enter your name, API key and application key, and select a site.

**Note**: For most users, one pair of keys is all that is required. If you're using a multi-org setup with multiple key pairs, check to ensure that the correct pair is active using the **Tools**/**Datadog** section in **Preferences**.

### Link a service

To provide relevant data from the Datadog platform, add relevant services to a project.

To link a service:
1. With your project open in IDEA, open the **Datadog** tool window and click **+**.
1. Search for and select the services that you want to add to the current project.

{{< img src="/developers/ide_integrations/idea/datadog-overview.png" alt="The Datadog plugin" style="width:100%;" >}}

To remove a service, select it in the **Services** table and click **-**.

The names of linked services persist with the project when you close it.

## What's next?

Now that you've set up your Datadog plugin for IDEA, find out more about using the plugin in your java projects:
- [Profiling][2]: 
- [Logging][3]: 
## Feedback

User feedback is very important to us. Let us know what you think about the plugin in our [discussion forum][1], or send an e-mail to `team-ide-integration@datadoghq.com`.

[1]: https://github.com/DataDog/datadog-for-intellij/discussions
[2]: /integrations/ide_integrations/idea/profiling/
[3]: /integrations/ide_integrations/idea/logging/
