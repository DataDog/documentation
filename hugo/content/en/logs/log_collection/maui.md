---
title: .NET MAUI Log Collection
description: Collect logs from your .NET MAUI applications.
further_reading:
- link: https://github.com/DataDog/dd-sdk-maui
  tag: "Source Code"
  text: dd-sdk-maui source code
- link: logs/explorer
  tag: Documentation
  text: Learn how to explore your logs
---

## Overview

Send logs to Datadog from your iOS and Android applications built with .NET MAUI using [Datadog's `Datadog.Maui` client-side logging library][1] and use the following features:

* Log to Datadog in JSON format natively.
* Forward managed C# exceptions.
* Record real client IP addresses and User-Agents.
* Optimize network usage with automatic bulk posts.
* Enrich logs with global attributes, user info, and account info.

## Setup

1. Before sending logs, initialize the Datadog SDK by following the [.NET MAUI setup documentation][2]. Make sure `DdSdk.Initialize` (or the `.UseDatadog(...)` builder extension) runs before `DdLogs.Enable()`.

2. Enable the Logs feature.

   With the builder extension:

   ```csharp
   using Datadog.Maui;
   using Datadog.Maui.Configuration;
   using Datadog.Maui.Hosting;

   public static MauiApp CreateMauiApp()
   {
       var builder = MauiApp.CreateBuilder();
       builder
           .UseMauiApp<App>()
           .UseDatadog(new DdSdkConfiguration
           {
               ClientToken = "<CLIENT_TOKEN>",
               Environment = "<ENV_NAME>",
               TrackingConsent = TrackingConsent.Granted,{% region-param key="maui_site_config" /%}
           })
           .UseDatadogLogs();

       return builder.Build();
   }
   ```

   Or with the standalone API, call `DdLogs.Enable()` after `DdSdk.Initialize`:

   ```csharp
   using Datadog.Maui;

   DdLogs.Enable();
   ```

3. Send a log entry with one of the following methods:

   ```csharp
   DdLogs.Debug("A debug message.");
   DdLogs.Info("Some relevant information?");
   DdLogs.Warn("An important warning...");
   DdLogs.Error("An error was met!");
   ```

   Log messages are sent to the Datadog [Log Explorer][3] and appear under the service name you configured at SDK initialization.

## Enrich your logs

Logs inherit context already set on the core SDK. You don't need to attach the same metadata to every call - set it once and every emitted log carries it.

### Global attributes

Attributes added with `DdSdk.AddAttribute` (or `DdSdk.AddAttributes`) are attached to every log, RUM event, and trace emitted after the call. Use them for cross-cutting context such as feature flags, experiment IDs, or release channels.

```csharp
DdSdk.AddAttribute("plan", "premium");
DdSdk.AddAttribute("experiment", "new-checkout-flow");

// Remove when the context no longer applies
DdSdk.RemoveAttribute("experiment");
```

### User information

Use `DdSdk.SetUserInfo` to attach an identity to every log line for the current user. This makes it easier to triage logs that relate to a specific user when investigating a support ticket.

```csharp
DdSdk.SetUserInfo("user-123", "Jane Doe", "jane@example.com",
    new Dictionary<string, object> { { "plan", "premium" } });
```

See [Track user sessions][4] for the full attribute reference.

### Account information

For B2B applications, `DdSdk.SetAccountInfo` attaches an account identity to every log. Use it together with — not instead of — user info.

```csharp
DdSdk.SetAccountInfo("acct-456", "Acme Corp",
    new Dictionary<string, object> { { "tier", "enterprise" } });
```

## Custom endpoint

For testing against a local mock server, an on-premises Datadog deployment, or a corporate proxy, pass a `CustomEndpoint` when enabling Logs:

```csharp
DdLogs.Enable(new DdLogsConfiguration
{
    CustomEndpoint = "https://logs-proxy.example.com/v1/input"
});
```

If you also need to route the rest of the SDK traffic through a proxy, configure `ProxyConfiguration` on the SDK itself. See [Advanced Configuration > Proxy configuration][5].

## Batch collection

All logs are first stored on the local device in batches. Each batch follows the intake specification. Batches are sent as soon as the network is available and the battery is high enough that the Datadog SDK does not impact the end user's experience. If the network is not available while your application is in the foreground, or if an upload of data fails, the batch is kept until it can be sent successfully.

This means that even if users open your application while offline, no data is lost.

The data on disk is automatically discarded if it gets too old. This makes sure the SDK does not use too much disk space.

Before data is uploaded to Datadog, it is stored in cleartext in your application's cache directory.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-maui
[2]: /real_user_monitoring/application_monitoring/maui/setup
[3]: /logs/explorer
[4]: /real_user_monitoring/application_monitoring/maui/advanced_configuration/#track-user-sessions
[5]: /real_user_monitoring/application_monitoring/maui/advanced_configuration/#proxy-configuration
