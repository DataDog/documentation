<!--
This partial contains troubleshooting content for the Roku SDK.
It can be included in the Roku SDK troubleshooting page or in the unified client_sdks view.
-->

## Overview

If you experience unexpected behavior with the Datadog Roku SDK, use this guide to resolve issues. If you continue to have trouble, contact [Datadog Support][1] for further assistance.

## SDK not sending data to Datadog

If your channel is running but no data appears in Datadog, verify that the `site` parameter in your initialization matches the datacenter for your Datadog organization:

```vb.net
datadogroku_initialize({
    clientToken: "<CLIENT_TOKEN>",
    applicationId: "<APPLICATION_ID>",
    site: "datadoghq.com", ' Update this value to match your organization's datacenter
    env: "<ENV_NAME>",
    sessionSampleRate: 100,
    launchArgs: args
})
```

The default value (`datadoghq.com`) routes data to the US1 datacenter. If your organization is on EU1, AP1, or another region, update this value accordingly. See the [Roku Channel Monitoring Setup][2] for the correct `site` value for your region.

## Operation method names differ from other SDKs

The Roku SDK uses different method names for tracking feature operations than other Datadog SDKs. If you are following documentation written for iOS, Android, or other SDKs, use the Roku equivalents:

| Other SDKs | Roku SDK |
|---|---|
| `startFeatureOperation` | `startOperation` |
| (success) | `succeedOperation` |
| (failure) | `failOperation` |

[1]: /help
[2]: /real_user_monitoring/application_monitoring/roku/setup
