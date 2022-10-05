---
title: Datadog Plugin For IntelliJ IDEA
kind: documentation
disable_toc: false
---

## Overview

The **Datadog** plugin for IntelliJ IDEA enables developers to interact with Datadog services while they work on Java projects.

> **IMPORTANT - EARLY ACCESS PREVIEW RELEASE**
>
> This is an early access preview release of the Datadog plugin, intended for customers that use the [**Continuous Profiler**](https://docs.datadoghq.com/profiler/#pagetitle).  The plugin might stop working unexpectedly&mdash;if this happens, please check for plugin updates.

The plugin is targeted at **Java** developers and features support for:

**Profiling**

  - source editor highlighting at method and line level with navigation to the tool-pane
  - integration of aggregated [profiling](profiling/overview.md) data to help developers remove costly bottlenecks in code
  - [Top List](profiling/top-list.md) and [Flamegraph](profiling/flamegraph.md) visualisations highlighting methods consuming the most resources, with direct navigation to source code
  - [project tree](profiling/project-tree.md) annotations showing profiling information at the package and class level

**Logging**

  - [navigation](logs/navigation.md) to Datadog Logs views on the web directly from source files based on contextual information, such as the logger name and level, that is auto-detected for popular Java logging frameworks

## Setup

The Datadog plugin for IntelliJ IDEA is in early access preview (EAP). To install the plugin, you must add the EAP repository to IDEA.

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

### Step 2 : Set Authentication Keys

After the IDE has restarted, click on the `Datadog` tab at the bottom of the screen to open the plugin tool pane:

![datadog-tool-pane](https://user-images.githubusercontent.com/1835893/192985280-117c9872-934a-434e-b10d-d6960fbd037d.png)

Click on `Add your credentials...` and follow the [Authentication](./config/authentication.md) instructions to setup your keys to access the Datadog platform.

### Step 3 : Link a Service
After you have added valid keys, you can proceed to [link one or more services](overview.md) to your project.

## Feedback 
User feedback is very important to us, please tell us what you think about the plugin.  You can provide feedback in the [discussion forum](https://github.com/DataDog/datadog-for-intellij/discussions) or send an e-mail to `team-ide-integration@datadoghq.com`.

