---
title: Unity Feature Flags (OpenFeature)
description: Set up Datadog Feature Flags for Unity applications using OpenFeature.
aliases:
  - /feature_flags/setup/unity-openfeature/
further_reading:
- link: "/feature_flags/client/"
  tag: "Documentation"
  text: "Client-Side Feature Flags"
- link: "/real_user_monitoring/application_monitoring/unity/"
  tag: "Documentation"
  text: "Unity Monitoring"
---

{{< callout url="http://datadoghq.com/product-preview/feature-flags/" >}}
Feature Flags are in Preview. Complete the form to request access.
{{< /callout >}}

<div class="alert alert-info">This page documents the <strong>OpenFeature integration</strong> for Unity Feature Flags. For the direct FlagsClient API (without OpenFeature), see <a href="/feature_flags/client/unity/">Unity Feature Flags</a>.</div>

## Overview

This page describes how to instrument your Unity application with the Datadog Feature Flags SDK using the OpenFeature standard. Datadog feature flags provide a unified way to remotely control feature availability in your app, experiment safely, and deliver new experiences with confidence.

This guide explains how to install and enable the SDK, create and use a flags client with OpenFeature, and configure advanced options.

## Installation

Declare the Datadog Unity SDK as a dependency in your project. The Datadog Unity SDK includes feature flags support.

1. Install the [External Dependency Manager for Unity (EDM4U)][1]. This can be done using [Open UPM][2].

2. Add the Datadog SDK Unity package from its Git URL at [https://github.com/DataDog/unity-package][3]. The package URL is `https://github.com/DataDog/unity-package.git`.

3. (Android only) Configure your project to use [Gradle templates][4], and enable both `Custom Main Template` and `Custom Gradle Properties Template`.

4. (Android only) If you build and receive `Duplicate class` errors (common in Unity 2022.x), add the following code to the `dependencies` block of your `mainTemplate.gradle`:

   ```groovy
   constraints {
        implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.8.0") {
            because("kotlin-stdlib-jdk8 is now a part of kotlin-stdlib")
        }
   }
   ```

## Initialize the SDK

Initialize Datadog as early as possible in your app lifecycle. Navigate to your `Project Settings` and click on the `Datadog` section to configure your client token, environment, and other settings.

For more information about setting up the Unity SDK, see [Unity Monitoring Setup][5].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/googlesamples/unity-jar-resolver
[2]: https://openupm.com/packages/com.google.external-dependency-manager/
[3]: https://github.com/DataDog/unity-package
[4]: https://docs.unity3d.com/Manual/gradle-templates.html
[5]: /real_user_monitoring/application_monitoring/unity/setup

{{< partial name="whats-next/whats-next.html" >}}
