---
title: Proxy Feature Flag SDK Traffic
description: Route Datadog Feature Flag SDK network requests through a proxy on your own domain.
further_reading:
- link: "/feature_flags/guide/proxy_server_setup/"
  tag: "Guide"
  text: "Set Up a Proxy Server for Feature Flag SDK Traffic"
- link: "/feature_flags/client/"
  tag: "Documentation"
  text: "Client-Side Feature Flags"
- link: "/real_user_monitoring/guide/proxy-rum-data/"
  tag: "Guide"
  text: "Proxy Browser RUM Data"
---

## Overview

The Datadog Feature Flag SDK makes two types of outbound network requests from your application:

1. **Flag configuration download**: The SDK fetches precomputed flag assignments from the Datadog CDN at startup and when the evaluation context changes. This request determines which flag variants are returned to your application.
2. **Event uploads**: The SDK sends exposure and evaluation event data to Datadog intake endpoints.

You can route either or both of these request types through a proxy on your own domain. Common reasons to use a proxy include:

- Network policies that restrict direct access to third-party domains from client devices
- Data residency or compliance requirements
- Ad-blocker avoidance for browser applications

## Configure the proxy

{{< tabs >}}

{{% tab "Android" %}}

Pass custom endpoint URLs to `FlagsConfiguration.Builder` before calling `Flags.enable()`.

### Flag configuration proxy

To route the flag configuration download through your proxy, call `useCustomFlagEndpoint` with the full URL your proxy exposes. The SDK sends a POST request to this URL with the evaluation context in the body.

{{< code-block lang="kotlin" filename="Application.kt" >}}
import com.datadog.android.flags.FlagsConfiguration

val flagsConfig = FlagsConfiguration.Builder()
    .useCustomFlagEndpoint("https://proxy.example.com/precompute-assignments")
    .build()

Flags.enable(flagsConfig)
{{< /code-block >}}

Your proxy must forward this request to the Datadog CDN: `https://preview.ff-cdn.datadoghq.com/precompute-assignments` (replace the subdomain as needed for your [Datadog site][1]). Pass through the request body and all headers unchanged.

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

Your proxy must forward each request to the corresponding Datadog intake endpoint for your [Datadog site][1]:

| Proxy path | Forward to |
|---|---|
| `/api/v2/exposures` | `https://api.datadoghq.com/api/v2/exposures` |
| `/api/v2/flagevaluation` | `https://api.datadoghq.com/api/v2/flagevaluation` |

{{% /tab %}}

{{% tab "iOS" %}}

Set custom endpoint URLs on `Flags.Configuration` before calling `Flags.enable(with:)`.

### Flag configuration proxy

To route the flag configuration download through your proxy, set `customFlagsEndpoint` to the full URL your proxy exposes. The SDK sends a POST request to this URL with the evaluation context in the body.

{{< code-block lang="swift" filename="AppDelegate.swift" >}}
import DatadogFlags

let flagsConfig = Flags.Configuration(
    customFlagsEndpoint: URL(string: "https://proxy.example.com/precompute-assignments")
)

Flags.enable(with: flagsConfig)
{{< /code-block >}}

Your proxy must forward this request to the Datadog CDN: `https://preview.ff-cdn.datadoghq.com/precompute-assignments` (replace the subdomain as needed for your [Datadog site][1]). Pass through the request body and all headers unchanged.

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

Your proxy must forward each request to the corresponding Datadog intake endpoint for your [Datadog site][1]:

| Proxy path | Forward to |
|---|---|
| `/api/v2/exposures` | `https://api.datadoghq.com/api/v2/exposures` |
| `/api/v2/flagevaluation` | `https://api.datadoghq.com/api/v2/flagevaluation` |

{{% /tab %}}

{{% tab "React Native" %}}

Pass a `FlagsConfiguration` object to `DdFlags.enable()`.

### Flag configuration proxy

To route the flag configuration download through your proxy, set `customFlagsEndpoint` to the base URL of your proxy. The SDK appends `/precompute-assignments` to this value automatically and sends a POST request with the evaluation context in the body.

{{< code-block lang="typescript" filename="App.tsx" >}}
import { DdFlags } from '@datadog/mobile-react-native';

await DdFlags.enable({
    customFlagsEndpoint: 'https://proxy.example.com',
    // SDK sends POST to: https://proxy.example.com/precompute-assignments
});
{{< /code-block >}}

Your proxy must forward this request to the Datadog CDN: `https://preview.ff-cdn.datadoghq.com/precompute-assignments` (replace the subdomain as needed for your [Datadog site][1]). Pass through the request body and all headers unchanged.

### Event upload proxy

To route exposure event uploads through your proxy, set `customExposureEndpoint` to the base URL of your proxy. The SDK appends `/api/v2/exposures` to this value automatically.

{{< code-block lang="typescript" filename="App.tsx" >}}
await DdFlags.enable({
    customFlagsEndpoint: 'https://proxy.example.com',
    customExposureEndpoint: 'https://proxy.example.com',
    // SDK sends POST to: https://proxy.example.com/api/v2/exposures
});
{{< /code-block >}}

Your proxy must forward exposure requests to `https://api.datadoghq.com/api/v2/exposures` for your [Datadog site][1].

{{% /tab %}}

{{% tab "Browser" %}}

Pass configuration options to `DatadogBrowserFlagging.init()`.

### Flag configuration proxy

To route the flag configuration download through your proxy, set `flaggingProxy` to the URL of your proxy endpoint. The SDK sends a POST request with the evaluation context in the body directly to this URL, replacing the default Datadog CDN endpoint.

{{< code-block lang="javascript" filename="index.js" >}}
import { DatadogBrowserFlagging } from '@datadog/browser-flagging';

DatadogBrowserFlagging.init({
    clientToken: '<CLIENT_TOKEN>',
    site: '<DATADOG_SITE>',
    flaggingProxy: 'https://proxy.example.com/flag-config',
});
{{< /code-block >}}

Your proxy must forward this request to the Datadog CDN: `https://preview.ff-cdn.datadoghq.com/precompute-assignments` (replace the subdomain as needed for your [Datadog site][1]). Pass through the request body and headers unchanged. The SDK includes `dd-client-token` and `dd-application-id` headers automatically.

To add custom headers to the flag configuration request (for example, for authentication at your proxy), use `customHeaders`:

{{< code-block lang="javascript" filename="index.js" >}}
DatadogBrowserFlagging.init({
    clientToken: '<CLIENT_TOKEN>',
    site: '<DATADOG_SITE>',
    flaggingProxy: 'https://proxy.example.com/flag-config',
    customHeaders: { 'X-Proxy-Token': '<YOUR_PROXY_TOKEN>' },
});
{{< /code-block >}}

### Event upload proxy

Browser flag event data (exposures and evaluations) is sent through the standard Browser SDK intake pipeline. To route this traffic through a proxy, set the `proxy` option to a URL on your domain.

{{< code-block lang="javascript" filename="index.js" >}}
DatadogBrowserFlagging.init({
    clientToken: '<CLIENT_TOKEN>',
    site: '<DATADOG_SITE>',
    flaggingProxy: 'https://proxy.example.com/flag-config',
    proxy: 'https://proxy.example.com/intake',
});
{{< /code-block >}}

The SDK appends a `ddforward` query parameter to each request sent to your proxy. This parameter contains the URL-encoded path and query string that your proxy must forward to. For example:

```
POST https://proxy.example.com/intake?ddforward=%2Fapi%2Fv2%2Fexposures%3Fddsource%3Dbrowser...
```

Your proxy decodes the `ddforward` value and constructs the Datadog intake URL:

```
https://browser-intake-datadoghq.com/api/v2/exposures?ddsource=browser...
```

The intake origin varies by [Datadog site][1]. For example, for `datadoghq.eu` it is `https://browser-intake-datadoghq.eu`. Forward the POST body unchanged and add an `X-Forwarded-For` header with the client IP for accurate geolocation. Remove any sensitive headers such as `cookie` before forwarding.

The `proxy` option also accepts a function that receives the decoded `path` and `parameters` and returns the full proxy URL. See [Proxy Browser RUM Data][2] for the full function signature.

{{% /tab %}}

{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/site/
[2]: /real_user_monitoring/guide/proxy-rum-data/
