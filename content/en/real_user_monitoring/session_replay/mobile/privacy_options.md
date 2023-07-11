---
title: Privacy Options
kind: documentation
description: Describes how to configure privacy options for Mobile Session Replay
aliases:
further_reading:
    - link: '/real_user_monitoring/session_replay/mobile'
      tag: Documentation
      text: Mobile Session Replay
    - link: '/real_user_monitoring/session_replay'
      tag: Documentation
      text: Session Replay
---

## Overview

[ fill in overview text]

## Configuration

{{< tabs >}}
{{% tab "Android" %}}

[ add android content]

   {{< code-block lang="javascript" filename="build.gradle" disable_copy="false" collapsible="true" >}}

   insert code block content

   {{< /code-block >}}

{{% /tab %}}

{{% tab "iOS" %}}

[ add iOS content]

   {{< code-block lang="javascript" filename="build.gradle" disable_copy="false" collapsible="true" >}}

   insert code block content

   {{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## Masking modes

By default, the `mask all` setting is enabled for all data. Using the masking modes below, you can override the default setup on a per-application basis.

| Masking mode | Description | Example |
|--------------|-------------|---------|
| `mask all` | All text content on screen is replaced with X's | {{< img src="real_user_monitoring/session_replay/mobile/masking-mode-mask-all.png" alt="Enable mask all to replace all text content on the screen with X's" style="width:40%;">}} |
| `mask user input` | Any input field is replaced with anonymized text | |
| `allow all` | All text is revealed <br> <br> **Note**: Even with this option enabled, any sensitive text fields such as passwords, emails, phone numbers, and addresses are still masked. | |


### Unmask data in all recorded content
By default, the Session Replay recorder masks all recorded content with `*` to ensure no sensitive information is visible in the recorded session. If you want to change this, add this option to **unmask data in all recorded content**:

   {{< code-block lang="kotlin" filename="build.gradle" disable_copy="false" collapsible="true" >}}

   val sessionReplayConfig = SessionReplayConfiguration.Builder()
    ...
   .setSessionReplayPrivacy(SessionReplayPrivacy.[PRIVACY])
   .build()

   {{< /code-block >}}

## Text masking

{{< code-block lang="javascript" filename="build.gradle" disable_copy="false" collapsible="true" >}}

insert code block content

{{< /code-block >}}

### Text masking strategies

{{< code-block lang="javascript" filename="build.gradle" disable_copy="false" collapsible="true" >}}

insert code block content

{{< /code-block >}}

### Definitions

## Appearance masking

{{< code-block lang="javascript" filename="build.gradle" disable_copy="false" collapsible="true" >}}

insert code block content

{{< /code-block >}}

### Definitions

## Touch interactions

{{< code-block lang="javascript" filename="build.gradle" disable_copy="false" collapsible="true" >}}

insert code block content

{{< /code-block >}}

### Definitions

## Fine-grained privacy

{{< tabs >}}
{{% tab "Android" %}}

[ add android content]

   {{< code-block lang="javascript" filename="build.gradle" disable_copy="false" collapsible="true" >}}

   insert code block content

   {{< /code-block >}}

{{% /tab %}}

{{% tab "iOS" %}}

[ add iOS content]

   {{< code-block lang="javascript" filename="build.gradle" disable_copy="false" collapsible="true" >}}

   insert code block content

   {{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## Troubleshooting