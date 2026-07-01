---
title: Dart and Flutter Feature Flags
description: Set up Datadog Feature Flags for Dart and Flutter applications.
further_reading:
- link: "/feature_flags/client/"
  tag: "Documentation"
  text: "Client-Side Feature Flags"
- link: "/real_user_monitoring/application_monitoring/flutter/"
  tag: "Documentation"
  text: "Flutter Monitoring"
- link: "https://github.com/DataDog/dd-sdk-flutter/tree/develop/packages/datadog_flags"
  tag: "Source Code"
  text: "datadog_flags source code"
- link: "https://github.com/DataDog/dd-sdk-flutter/tree/develop/packages/datadog_flags_flutter"
  tag: "Source Code"
  text: "datadog_flags_flutter source code"
---

## Overview

This page describes how to instrument Dart and Flutter applications with the Datadog Feature Flags SDK. Datadog feature flags provide a unified way to remotely control feature availability in your app and experiment safely.

The Datadog Feature Flags SDK for Dart is a native Dart package. It fetches precomputed assignments from Datadog, evaluates typed flag values locally, and reports exposure and flag evaluation telemetry back to Datadog. Flutter applications can use the standalone Dart package directly or install `datadog_flags_flutter` to derive configuration from `datadog_flutter_plugin` and add successful evaluations to RUM.

<div class="alert alert-info">This package provides an OpenFeature-compatible API for Dart and Flutter, but it is not built on the OpenFeature Dart SDK. Use the APIs on this page directly. Datadog is developing an OpenFeature-provider-based integration for Dart and Flutter.</div>

## Installation

For a Flutter app that already uses the Datadog Flutter SDK, install `datadog_flags_flutter`:

{{< code-block lang="bash" >}}
flutter pub add datadog_flags_flutter
{{< /code-block >}}

`datadog_flags_flutter` depends on `datadog_flutter_plugin` 3.4.0 or later.

For standalone Dart usage, install `datadog_flags`:

{{< tabs >}}
{{% tab "Dart" %}}
{{< code-block lang="bash" >}}
dart pub add datadog_flags
{{< /code-block >}}
{{% /tab %}}

{{% tab "Flutter" %}}
{{< code-block lang="bash" >}}
flutter pub add datadog_flags
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

Then import the public API:

{{< tabs >}}
{{% tab "Dart" %}}
{{< code-block lang="dart" >}}
import 'package:datadog_flags/datadog_flags.dart';
{{< /code-block >}}
{{% /tab %}}

{{% tab "Flutter integrated" %}}
{{< code-block lang="dart" >}}
import 'package:datadog_flags_flutter/datadog_flags_flutter.dart';
import 'package:datadog_flutter_plugin/datadog_flutter_plugin.dart';
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## Flutter-integrated setup

Use this setup when your Flutter app already initializes `datadog_flutter_plugin`. Add `DatadogFlagsPluginConfiguration` to your existing `DatadogConfiguration` before initializing the Datadog SDK. The plugin derives the client token, environment, site, service, version, and RUM application ID from the Flutter SDK configuration. To create a client token, see [Client tokens][1].

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Flutter Feature Flags are not supported for the selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>{{< /site-region >}}

{{< code-block lang="dart" >}}
import 'package:datadog_flags_flutter/datadog_flags_flutter.dart';
import 'package:datadog_flutter_plugin/datadog_flutter_plugin.dart';

final configuration = DatadogConfiguration(
  clientToken: '<CLIENT_TOKEN>',
  env: '<ENV_NAME>',
  site: DatadogSite.{{< region-param key="dd_site_name" code="true" >}},
  service: '<SERVICE_NAME>',
  version: '<APP_VERSION>',
  rumConfiguration: DatadogRumConfiguration(
    applicationId: '<RUM_APPLICATION_ID>',
  ),
)..addPlugin(const DatadogFlagsPluginConfiguration());

await DatadogSdk.instance.initialize(configuration, TrackingConsent.granted);
{{< /code-block >}}

After initialization, retrieve a flags client from the plugin and initialize it with the evaluation context for the current subject:

{{< code-block lang="dart" >}}
final flags = DatadogSdk.instance.flags;
if (flags == null) {
  return;
}

final flagsClient = flags.sharedClient();
await flagsClient.initialize(
  const FlagsEvaluationContext(
    targetingKey: 'user-123',
    attributes: {
      'companyId': 'company-456',
      'plan': 'enterprise',
    },
  ),
);
{{< /code-block >}}

Successful evaluations are sent through the Datadog Feature Flags telemetry pipeline. With the Flutter-integrated setup, successful evaluations that return a variant are also added to the active RUM view as feature flag evaluations.

## Standalone Dart setup

Use this setup when you are not using `datadog_flutter_plugin`, or when you want to manage Feature Flags independently from Flutter SDK initialization.

Enable Datadog Feature Flags early in your app startup. For live Feature Flags configuration, `clientToken`, `env`, and `site` are required. To create a client token, see [Client tokens][1].

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Dart and Flutter Feature Flags are not supported for the selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>{{< /site-region >}}

{{< code-block lang="dart" >}}
final datadogFlags = DatadogFlags.instance;

await datadogFlags.enable(
  configuration: DatadogFlagsConfiguration(
    datadogConfig: const DatadogFlagsConfig(
      clientToken: '<CLIENT_TOKEN>',
      env: '<ENV_NAME>',
      site: DatadogFlagsSite.{{< region-param key="dd_datacenter_lowercase" code="true" >}},
      applicationId: '<RUM_APPLICATION_ID>',
      service: '<SERVICE_NAME>',
      version: '<APP_VERSION>',
    ),
  ),
);
{{< /code-block >}}

`applicationId`, `service`, and `version` are optional. When present, the SDK includes them in Feature Flags telemetry context.

Use the `DatadogFlagsSite` value that matches your Datadog organization.

## Create and retrieve a client

Create or retrieve a shared client once during app startup:

{{< code-block lang="dart" >}}
final flagsClient = DatadogFlags.instance.sharedClient();
{{< /code-block >}}

You can also create multiple named clients for independent evaluation contexts:

{{< code-block lang="dart" >}}
final orgFlags = DatadogFlags.instance.sharedClient(name: 'org');
final userFlags = DatadogFlags.instance.sharedClient(name: 'user');
{{< /code-block >}}

Clients are local to the Dart isolate where they are created. Background isolates do not share `DatadogFlags` state or assignment caches with the main isolate. If a background isolate needs to evaluate flags, call `DatadogFlags.instance.enable()`, create the clients it needs, and initialize them independently.

## Set the evaluation context

Define who or what the flag evaluation applies to using `FlagsEvaluationContext`. The evaluation context includes user, organization, session, or device information used to determine which flag variations should be returned. Call `initialize()` before evaluating flags so the client can fetch assignments for the context.

<div class="alert alert-warning">Datadog Feature Flags requires evaluation context attributes to be flat primitive values: strings, numbers, and Booleans. Do not pass nested objects or arrays; they are not supported and can cause exposure data to be dropped.</div>

{{< code-block lang="dart" >}}
await flagsClient.initialize(
  const FlagsEvaluationContext(
    targetingKey: 'user-123',
    attributes: {
      'companyId': 'company-456',
      'plan': 'enterprise',
      'loggedIn': true,
    },
  ),
);
{{< /code-block >}}

The `targetingKey` is the randomization subject for percentage rollouts. Users with the same targeting key always receive the same variant for a given flag.

`targetingKey` is optional. If you initialize a context before a user or organization ID is known, the SDK sends an empty string for the precompute assignment request.

Use separate named clients for separate evaluation subjects, such as logged-out and logged-in users or org-level and user-level targeting:

{{< code-block lang="dart" >}}
await orgFlags.initialize(
  const FlagsEvaluationContext(targetingKey: 'org-123'),
);

await userFlags.initialize(
  const FlagsEvaluationContext(targetingKey: 'user-456'),
);
{{< /code-block >}}

## Evaluate flags

After a client is initialized, you can read flag values throughout your app. Flag evaluation is _local and instantaneous_ because the SDK uses locally cached assignment data. No network request occurs during a typed evaluation.

Each evaluation method requires a caller-provided default value. Evaluation methods do not throw for provider readiness, missing flags, or type mismatches. They return a `FlagDetails<T>` value with the evaluated value, assignment metadata, and a programmatic error when the SDK returns the default.

### Boolean flags

Use `getBooleanDetails()` for flags that represent on/off or true/false conditions:

{{< code-block lang="dart" >}}
final details = flagsClient.getBooleanDetails(
  key: 'checkout.enabled',
  defaultValue: false,
);

if (details.error == null && details.value) {
  showNewCheckoutFlow();
} else {
  showLegacyCheckout();
}
{{< /code-block >}}

### String flags

Use `getStringDetails()` for flags that select between multiple variants or configuration strings:

{{< code-block lang="dart" >}}
final details = flagsClient.getStringDetails(
  key: 'ui.theme',
  defaultValue: 'light',
);

if (details.value == 'dark') {
  setDarkTheme();
} else {
  setLightTheme();
}
{{< /code-block >}}

### Integer and double flags

Use `getIntegerDetails()` or `getDoubleDetails()` for numeric flags, such as limits, percentages, or multipliers:

{{< code-block lang="dart" >}}
final maxItems = flagsClient.getIntegerDetails(
  key: 'cart.items.max',
  defaultValue: 20,
);

final priceMultiplier = flagsClient.getDoubleDetails(
  key: 'pricing.multiplier',
  defaultValue: 1.0,
);
{{< /code-block >}}

### Object flags

Use `getObjectDetails()` for JSON-compatible structured configuration:

{{< code-block lang="dart" >}}
final config = flagsClient.getObjectDetails(
  key: 'ui.config',
  defaultValue: const {
    'color': '#00A3FF',
    'fontSize': 14,
  },
);
{{< /code-block >}}

### Flag evaluation details

Use the details APIs when you need the evaluated value, variant, reason, or evaluation error:

{{< code-block lang="dart" >}}
final details = flagsClient.getStringDetails(
  key: 'checkout.copy',
  defaultValue: 'Continue',
);

print(details.value);
print(details.variant);
print(details.reason);
print(details.error?.code);
{{< /code-block >}}

`FlagDetails.error` is set when the SDK returns the default value because the provider is not ready, the flag is not found, or the assignment value does not match the typed evaluation method. Successful details include the evaluated value plus assignment metadata, such as `variant` and `reason`, when Datadog returned it.

## Advanced configuration

`DatadogFlagsConfiguration` controls SDK behavior:

{{< code-block lang="dart" >}}
DatadogFlagsConfiguration(
  datadogConfig: datadogConfig,
  trackExposures: true,
  trackEvaluations: true,
  evaluationFlushInterval: const Duration(seconds: 10),
  store: myStore,
);
{{< /code-block >}}

`trackExposures`
: When `true` (default), the SDK records exposure events for successful evaluations whose assignments are marked for logging. Set to `false` to disable exposure tracking.

`trackEvaluations`
: When `true` (default), the SDK records aggregated flag evaluation telemetry. Set to `false` to disable evaluation tracking.

`evaluationFlushInterval`
: The interval at which aggregated flag evaluation telemetry is sent to Datadog. Accepted values are between 1 and 60 seconds. The default is 10 seconds.

`store`
: Optional last-known assignment storage. The SDK can use matching stored assignments while a fresh network request is in progress or unavailable.

`httpClient`, `customFlagsEndpoint`, `customExposureEndpoint`, and `customEvaluationEndpoint`
: Advanced overrides for tests, proxies, or custom routing.

If `enable()` is called without a `datadogConfig`, the SDK does not create a live provider. Evaluations return the caller-provided default with `FlagEvaluationError.providerNotReady`.

For Flutter-integrated setup, pass these options through `DatadogFlagsPluginConfiguration`:

{{< code-block lang="dart" >}}
final configuration = DatadogConfiguration(
  clientToken: '<CLIENT_TOKEN>',
  env: '<ENV_NAME>',
  site: DatadogSite.{{< region-param key="dd_site_name" code="true" >}},
  rumConfiguration: DatadogRumConfiguration(
    applicationId: '<RUM_APPLICATION_ID>',
  ),
)..addPlugin(
    const DatadogFlagsPluginConfiguration(
      flagsConfiguration: DatadogFlagsConfiguration(
        trackExposures: true,
        trackEvaluations: true,
      ),
      rumIntegrationEnabled: true,
    ),
  );
{{< /code-block >}}

`rumIntegrationEnabled`
: When `true` (default), successful evaluations that return a variant are added to the active RUM view as feature flag evaluations. If your app does not use RUM, this option has no effect.

## Last-known assignment storage

The SDK keeps assignments in memory after `initialize()` succeeds. To restore last-known assignments across SDK instances, provide a `DatadogFlagsStore`:

{{< code-block lang="dart" >}}
class MyFlagsStore implements DatadogFlagsStore {
  @override
  Future<FlagsData?> read(String clientName) async {
    // Read and decode persisted FlagsData for this client name.
    return null;
  }

  @override
  Future<void> write(String clientName, FlagsData data) async {
    // Encode and persist successful assignments for this client name.
  }

  @override
  Future<void> delete(String clientName) async {
    // Delete persisted assignments for this client name.
  }
}
{{< /code-block >}}

Stored assignments are used only when their evaluation context matches the active context. A live successful fetch always moves the client to the newest assignment state and writes that state back to the store.

The Dart package does not choose a disk location or ship a Flutter-specific disk store. Flutter apps can implement `DatadogFlagsStore` with their preferred app storage mechanism.

## Shutdown

Call `shutdown()` when a client is no longer needed. This drains pending exposure and flag evaluation uploads before clearing the client's in-memory assignments.

{{< code-block lang="dart" >}}
await flagsClient.shutdown();
{{< /code-block >}}

Call `DatadogFlags.instance.disable()` when the application is tearing down the flags SDK:

{{< code-block lang="dart" >}}
await DatadogFlags.instance.disable();
{{< /code-block >}}

## Complete example

The following example enables the SDK, initializes a client with an evaluation context, and evaluates a Boolean flag:

{{< code-block lang="dart" >}}
import 'package:datadog_flags/datadog_flags.dart';

Future<void> initializeFlags() async {
  final datadogFlags = DatadogFlags.instance;

  await datadogFlags.enable(
    configuration: DatadogFlagsConfiguration(
      datadogConfig: const DatadogFlagsConfig(
        clientToken: '<CLIENT_TOKEN>',
        env: '<ENV_NAME>',
        site: DatadogFlagsSite.{{< region-param key="dd_datacenter_lowercase" code="true" >}},
        applicationId: '<RUM_APPLICATION_ID>',
        service: '<SERVICE_NAME>',
        version: '<APP_VERSION>',
      ),
    ),
  );

  final flagsClient = datadogFlags.sharedClient();
  await flagsClient.initialize(
    const FlagsEvaluationContext(
      targetingKey: 'user-123',
      attributes: {
        'companyId': 'company-456',
        'plan': 'enterprise',
      },
    ),
  );

  final details = flagsClient.getBooleanDetails(
    key: 'checkout.enabled',
    defaultValue: false,
  );

  if (details.error == null && details.value) {
    showNewCheckoutFlow();
  }
}
{{< /code-block >}}

## Testing

You can test against a dedicated Datadog test environment with the real `DatadogFlagsClient`, or isolate application code behind a small interface and substitute a fake implementation in unit tests. This section shows the fake approach, which keeps tests hermetic and offline.

{{< code-block lang="dart" >}}
abstract interface class CheckoutFlags {
  bool newCheckoutEnabled();
}

final class DatadogCheckoutFlags implements CheckoutFlags {
  final DatadogFlagsClient client;

  DatadogCheckoutFlags(this.client);

  @override
  bool newCheckoutEnabled() {
    return client
        .getBooleanDetails(
          key: 'checkout.enabled',
          defaultValue: false,
        )
        .value;
  }
}

final class TestCheckoutFlags implements CheckoutFlags {
  @override
  bool newCheckoutEnabled() => true;
}
{{< /code-block >}}

Then inject `TestCheckoutFlags` into unit tests and `DatadogCheckoutFlags` in production.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/api-app-keys/#client-tokens
