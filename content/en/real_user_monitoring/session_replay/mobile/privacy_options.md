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

{{< tabs >}}
{{% tab "Android" %}}

### Unmask data in all recorded content
By default, the Session Replay recorder masks all recorded content with `*` to ensure no sensitive information is visible in the recorded session. If you want to change this, add this option to **unmask data in all recorded content**:

   {{< code-block lang="kotlin" filename="build.gradle" disable_copy="false" collapsible="true" >}}

   val sessionReplayConfig = SessionReplayConfiguration.Builder()
    ...
   .setSessionReplayPrivacy(SessionReplayPrivacy.[PRIVACY])
   .build()

   {{< /code-block >}}

{{% /tab %}}

{{% tab "iOS" %}}

[ add iOS content]

   {{< code-block lang="javascript" filename="build.gradle" disable_copy="false" collapsible="true" >}}

   insert code block content

   {{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## Text masking

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

### Text masking strategies

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

### Definitions

## Appearance masking

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

### Definitions

## Touch interactions

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