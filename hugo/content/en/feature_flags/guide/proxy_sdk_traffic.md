---
title: Proxy Feature Flag SDK Traffic
description: Route Datadog Feature Flag SDK network requests through a proxy on your own domain.
further_reading:
- link: "/feature_flags/client/"
  tag: "Documentation"
  text: "Client-Side Feature Flags"
- link: "/feature_flags/client/android/"
  tag: "Documentation"
  text: "Android Feature Flags"
- link: "/feature_flags/client/ios/"
  tag: "Documentation"
  text: "iOS Feature Flags"
- link: "/feature_flags/client/reactnative/"
  tag: "Documentation"
  text: "React Native Feature Flags"
- link: "/feature_flags/client/javascript/"
  tag: "Documentation"
  text: "Browser Feature Flags"
---

## Overview

The Datadog Feature Flag SDK makes two types of outbound network requests from your application:

1. **Flag configuration download**: The SDK fetches precomputed flag assignments from the Datadog CDN at startup and when the evaluation context changes. This request determines which flag variants are returned to your application.
2. **Event uploads**: The SDK sends exposure and evaluation event data to Datadog intake endpoints.

You can route either or both of these request types through a proxy on your own domain. Common reasons to use a proxy include:

- Network policies that restrict direct access to third-party domains from client devices
- Data residency or compliance requirements
- Ad-blocker avoidance for browser applications

## Default endpoints

The SDK uses the following Datadog endpoints by default. Your proxy must forward requests to these endpoints when acting as a relay.

| Request type | Default endpoint |
|---|---|
| Flag configuration | `https://preview.ff-cdn.datadoghq.com/precompute-assignments` (varies by [site][1]) |
| Exposure events | `https://api.datadoghq.com/api/v2/exposures` (varies by site) |
| Evaluation events | `https://api.datadoghq.com/api/v2/flagevaluation` (varies by site) |

## Configure the proxy

{{< tabs >}}

{{% tab "Android" %}}

Pass custom endpoint URLs to `FlagsConfiguration.Builder` before calling `Flags.enable()`.

### Flag configuration proxy

To route the flag configuration download through your proxy, call `useCustomFlagEndpoint` with the full URL your proxy exposes. The SDK sends the request to this URL as-is.

{{< code-block lang="kotlin" filename="Application.kt" >}}
import com.datadog.android.flags.FlagsConfiguration

val flagsConfig = FlagsConfiguration.Builder()
    .useCustomFlagEndpoint("https://proxy.example.com/precompute-assignments")
    .build()

Flags.enable(flagsConfig)
{{< /code-block >}}

### Event upload proxy

To route exposure and evaluation event uploads through your proxy, call the corresponding builder methods with the full URL of your proxy endpoint.

{{< code-block lang="kotlin" filename="Application.kt" >}}
import com.datadog.android.flags.FlagsConfiguration

val flagsConfig = FlagsConfiguration.Builder()
    .useCustomFlagEndpoint("https://proxy.example.com/precompute-assignments")
    .useCustomExposureEndpoint("https://proxy.example.com/api/v2/exposures")
    .useCustomEvaluationEndpoint("https://proxy.example.com/api/v2/flagevaluation")
    .build()

Flags.enable(flagsConfig)
{{< /code-block >}}

{{% /tab %}}

{{% tab "iOS" %}}

Set custom endpoint URLs on `Flags.Configuration` before calling `Flags.enable(with:)`.

### Flag configuration proxy

To route the flag configuration download through your proxy, set `customFlagsEndpoint` to the full URL your proxy exposes. The SDK sends the request to this URL as-is.

{{< code-block lang="swift" filename="AppDelegate.swift" >}}
import DatadogFlags

let flagsConfig = Flags.Configuration(
    customFlagsEndpoint: URL(string: "https://proxy.example.com/precompute-assignments")
)

Flags.enable(with: flagsConfig)
{{< /code-block >}}

To attach additional HTTP headers to flag configuration requests (for example, for authentication at your proxy), set `customFlagsHeaders`.

{{< code-block lang="swift" filename="AppDelegate.swift" >}}
let flagsConfig = Flags.Configuration(
    customFlagsEndpoint: URL(string: "https://proxy.example.com/precompute-assignments"),
    customFlagsHeaders: ["X-Proxy-Token": "<YOUR_PROXY_TOKEN>"]
)
{{< /code-block >}}

### Event upload proxy

To route exposure and evaluation event uploads through your proxy, set `customExposureEndpoint` and `customEvaluationEndpoint`.

{{< code-block lang="swift" filename="AppDelegate.swift" >}}
let flagsConfig = Flags.Configuration(
    customFlagsEndpoint: URL(string: "https://proxy.example.com/precompute-assignments"),
    customExposureEndpoint: URL(string: "https://proxy.example.com/api/v2/exposures"),
    customEvaluationEndpoint: URL(string: "https://proxy.example.com/api/v2/flagevaluation")
)

Flags.enable(with: flagsConfig)
{{< /code-block >}}

{{% /tab %}}

{{% tab "React Native" %}}

Pass a `FlagsConfiguration` object to `DdFlags.enable()`.

### Flag configuration proxy

To route the flag configuration download through your proxy, set `customFlagsEndpoint` to the base URL of your proxy. The SDK appends `/precompute-assignments` to this base URL automatically.

{{< code-block lang="typescript" filename="App.tsx" >}}
import { DdFlags } from '@datadog/mobile-react-native';

await DdFlags.enable({
    customFlagsEndpoint: 'https://proxy.example.com',
    // SDK requests: https://proxy.example.com/precompute-assignments
});
{{< /code-block >}}

### Event upload proxy

To route exposure event uploads through your proxy, set `customExposureEndpoint` to the base URL of your proxy. The SDK appends `/api/v2/exposures` to this base URL automatically.

{{< code-block lang="typescript" filename="App.tsx" >}}
await DdFlags.enable({
    customFlagsEndpoint: 'https://proxy.example.com',
    customExposureEndpoint: 'https://proxy.example.com',
    // SDK requests: https://proxy.example.com/api/v2/exposures
});
{{< /code-block >}}

{{% /tab %}}

{{% tab "Browser" %}}

Pass configuration options to `DatadogBrowserFlagging.init()`.

### Flag configuration proxy

To route the flag configuration download through your proxy, set `flaggingProxy` to the URL of your proxy endpoint. The SDK sends the precomputed assignments POST request to this URL directly, replacing the default Datadog CDN endpoint.

{{< code-block lang="javascript" filename="index.js" >}}
import { DatadogBrowserFlagging } from '@datadog/browser-flagging';

DatadogBrowserFlagging.init({
    clientToken: '<CLIENT_TOKEN>',
    site: '<DATADOG_SITE>',
    flaggingProxy: 'https://proxy.example.com/flag-config',
});
{{< /code-block >}}

If your proxy requires custom authentication headers, use `customHeaders`. To remove the default `dd-client-token` and `dd-application-id` headers (for example, when your proxy handles authentication separately), set `overwriteRequestHeaders: true`.

{{< code-block lang="javascript" filename="index.js" >}}
DatadogBrowserFlagging.init({
    clientToken: '<CLIENT_TOKEN>',
    site: '<DATADOG_SITE>',
    flaggingProxy: 'https://proxy.example.com/flag-config',
    customHeaders: { 'X-Proxy-Token': '<YOUR_PROXY_TOKEN>' },
});
{{< /code-block >}}

### Event upload proxy

Browser flag event data is sent through the standard Datadog Browser SDK intake pipeline. To route all intake traffic (including flag exposure and evaluation events) through a proxy, set the `proxy` option.

{{< code-block lang="javascript" filename="index.js" >}}
DatadogBrowserFlagging.init({
    clientToken: '<CLIENT_TOKEN>',
    site: '<DATADOG_SITE>',
    flaggingProxy: 'https://proxy.example.com/flag-config',
    proxy: 'https://proxy.example.com/intake',
});
{{< /code-block >}}

The `proxy` option accepts either a URL string or a function. See [Proxy Browser RUM Data][2] for full details on the proxy function signature and how to implement a forwarding proxy.

{{% /tab %}}

{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/site/
[2]: /real_user_monitoring/guide/proxy-rum-data/
