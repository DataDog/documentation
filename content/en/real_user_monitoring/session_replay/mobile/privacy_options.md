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

Session Replay provides privacy controls to ensure organizations of any scale do not expose sensitive or personal data. Data is stored on Datadog-managed cloud instances and encrypted at rest.

Default privacy options for Session Replay are designed to protect end user privacy and prevent sensitive organizational information from being collected.

By enabling Mobile Session Replay, you can automatically mask sensitive elements from being recorded through the RUM Mobile SDK. When data is masked, that data is not collected in its original form by Datadog's SDKs and thus is not sent to the backend.

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

After configuring your 

## Masking modes

By default, the `mask all` setting is enabled for all data. Using the masking modes below, you can override the default setup on a per-application basis.

| Masking mode | Description | Example |
|--------------|-------------|---------|
| `mask all` | All text content on screen is replaced with X's. | {{< img src="real_user_monitoring/session_replay/mobile/masking-mode-mask-all.png" alt="Enable mask all to replace all text content on the screen with X's" style="width:40%;">}} |
| `mask user input` | Any input field is replaced with anonymized text. | {{< img src="real_user_monitoring/session_replay/mobile/masking-mode-mask-user-input.png" alt="Enable mask all to replace all text content on the screen with X's" style="width:40%;">}} |
| `allow all` | All text is revealed. <br> <br> **Note**: Even with this option enabled, any sensitive text fields such as passwords, emails, phone numbers, and addresses are still masked. | {{< img src="real_user_monitoring/session_replay/mobile/masking-mode-allow-all.png" alt="Enable mask all to replace all text content on the screen with X's" style="width:40%;">}} |

### Unmask data in all recorded content
By default, the Session Replay recorder masks all recorded content with `*` to ensure no sensitive information is visible in the recorded session. If you want to change this, add this option to **unmask data in all recorded content**:

   {{< code-block lang="kotlin" filename="build.gradle" disable_copy="false" collapsible="true" >}}

   val sessionReplayConfig = SessionReplayConfiguration.Builder()
    ...
   .setSessionReplayPrivacy(SessionReplayPrivacy.[PRIVACY])
   .build()

   {{< /code-block >}}

## Understanding how data is masked


### Text masking

Depending on how you've configured your privacy settings, the type of text, and sensitivity of data, Datadog's masking rules apply different strategies to different types of text fields.

| Text masking strategy | Description | Example |
|-----------------------|-------------|---------|
| No mask | The text is revealed in the session replay | `"Hello world"` → `"Hello world"` |
| Space-preserving mask | Each visible character is replaced with a lowercase "x" | `"Hello world"` → `"xxxxx xxxxx"` |
| Fixed-length mask | The entire text field is replaced with a constant of three asterisks (***) | `"Hello world"` → `"***"`

With the above text strategies in mind, you have a few different options if you want to override the default privacy rule of `mask all` in your configuration.

The following chart shows how we apply different text masking strategies, using the rules you set up in your configuration, to the below text types.

| Type | `allow all` | `mask all` | `mask user input` |
|------|-------------|------------|-------------------|
| Sensitive text | Fixed-length mask | Fixed-length mask | Fixed-length mask |
| Input and option text | No mask | Fixed-length mask | Fixed-length mask |
| Static text | No mask | Space-preserving mask | No mask |
| Hints mask | No mask | Fixed-length mask | No mask |

### Definitions

The following table defines what Datadog's recorder actually records.

| Text type | Includes | Example |
|-----------|----------|---------|
| **Sensitive text** | | |

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