---
title: Dart and Flutter Feature Flags
description: Set up Datadog Feature Flags for Dart and Flutter applications with OpenFeature.
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

Use the [OpenFeature Dart client SDK][2] to evaluate Datadog feature flags in Dart and Flutter applications. `datadog_flags` provides `DatadogOpenFeatureProvider`. The provider fetches precomputed assignments, evaluates flags locally, and sends exposure and evaluation telemetry to Datadog.

Flutter applications can use the provider directly. Add `DatadogRumHook` from `datadog_flags_flutter` to associate successful evaluations with the active RUM view.

OpenFeature is the recommended application API. For existing applications, see [Migrate from the legacy API](#migrate-from-the-legacy-api).

## Installation

This integration requires:

- `datadog_flags` 1.2.0 or later, or `datadog_flags_flutter` 1.2.0 or later for Flutter with RUM.
- Dart 3.10 or later.
- `openfeature_dart_client_sdk` 0.0.1.
- For Flutter applications, Flutter 3.38.1 or later with stable Dart 3.10 or later.

For standalone Dart or Flutter usage, install `datadog_flags` and the OpenFeature client SDK:

{{< tabs >}}
{{% tab "Dart" %}}
{{< code-block lang="bash" >}}
dart pub add datadog_flags:^1.2.0 openfeature_dart_client_sdk:^0.0.1
{{< /code-block >}}
{{% /tab %}}

{{% tab "Flutter" %}}
{{< code-block lang="bash" >}}
flutter pub add datadog_flags:^1.2.0 openfeature_dart_client_sdk:^0.0.1
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

For Flutter with RUM, install the Flutter integration instead:

{{< code-block lang="bash" >}}
flutter pub add datadog_flags_flutter:^1.2.0 datadog_flutter_plugin openfeature_dart_client_sdk:^0.0.1
{{< /code-block >}}

`datadog_flags_flutter` supports `datadog_flutter_plugin` versions 3.4.0 through 4.x. It exports the provider and configuration types from `datadog_flags`.

## Dart setup

Configure the provider once during application startup. Set the evaluation context before registering the provider to load assignments for the intended subject. To create a client token, see [Client tokens][1].

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Dart and Flutter Feature Flags are not supported for the selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>{{< /site-region >}}

{{< code-block lang="dart" >}}
import 'package:datadog_flags/datadog_flags.dart';
import 'package:openfeature_dart_client_sdk/openfeature_dart_client_sdk.dart';

final api = OpenFeatureAPI.instance;
await api.setEvaluationContextAndWait(
  EvaluationContext(
    targetingKey: 'user-123',
    attributes: {
      'companyId': 'company-456',
      'plan': 'enterprise',
    },
  ),
);

final provider = DatadogOpenFeatureProvider(
  configuration: DatadogFlagsConfiguration(
    initializationTimeout: const Duration(seconds: 2),
    datadogConfig: const DatadogFlagsConfig(
      clientToken: '<CLIENT_TOKEN>',
      env: '<ENV_NAME>',
      site: DatadogFlagsSite.{{< region-param key="dd_datacenter_lowercase" code="true" >}},
      service: '<SERVICE_NAME>',
      version: '<APP_VERSION>',
    ),
  ),
);

final client = api.getClient();
client.addHandler(ProviderEventType.ready, (_) {
  // Reevaluate flags and update the UI after readiness or recovery.
});

try {
  await api.setProviderAndWait(provider);
} on OpenFeatureException {
  // Continue startup with matching cached assignments or defaults.
}

final enabled = client.getBooleanValue('checkout.enabled', false);
{{< /code-block >}}

`clientToken`, `env`, and `site` are required for live assignments. Use the site that matches the Datadog organization. `applicationId`, `service`, and `version` are optional telemetry fields.

`setProviderAndWait()` waits for provider initialization. Registration can fail when no assignments are available. Initial loading can still succeed later and emit a `ready` event. Matching cached assignments remain usable in the `stale` state. See [Provider life cycle and refresh](#provider-life-cycle-and-refresh).

## Flutter-integrated setup

Initialize `datadog_flutter_plugin` for RUM, then configure the OpenFeature provider. Add `DatadogRumHook` once to each OpenFeature client that sends evaluations to RUM.

{{< code-block lang="dart" >}}
import 'package:datadog_flags_flutter/datadog_flags_flutter.dart';
import 'package:datadog_flutter_plugin/datadog_flutter_plugin.dart';
import 'package:openfeature_dart_client_sdk/openfeature_dart_client_sdk.dart';

await DatadogSdk.instance.initialize(
  DatadogConfiguration(
    clientToken: '<CLIENT_TOKEN>',
    env: '<ENV_NAME>',
    site: DatadogSite.{{< region-param key="dd_datacenter_lowercase" code="true" >}},
    service: '<SERVICE_NAME>',
    version: '<APP_VERSION>',
    rumConfiguration: DatadogRumConfiguration(
      applicationId: '<RUM_APPLICATION_ID>',
    ),
  ),
  TrackingConsent.granted,
);

final api = OpenFeatureAPI.instance;
final client = api.getClient();
client.addHooks([DatadogRumHook()]);

await api.setEvaluationContextAndWait(
  EvaluationContext(targetingKey: 'user-123'),
);
final provider = DatadogOpenFeatureProvider(
  configuration: DatadogFlagsConfiguration(
    initializationTimeout: const Duration(seconds: 2),
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

client.addHandler(ProviderEventType.ready, (_) {
  // Reevaluate flags and update the UI after readiness or recovery.
});
try {
  await api.setProviderAndWait(provider);
} on OpenFeatureException {
  // Continue startup with matching cached assignments or defaults.
}

final enabled = client.getBooleanValue('checkout.enabled', false);
{{< /code-block >}}

Configure the provider explicitly. It does not derive its configuration or evaluation context from the Flutter SDK. Keep the token, environment, site, and optional telemetry fields consistent across both configurations.

The hook adds the variant to the active RUM view. When no variant is available, it uses the evaluated value. It skips evaluations with errors. Omit the hook to disable RUM association; the provider still controls exposure and evaluation telemetry separately.

For a custom `DatadogSdk` instance, use `DatadogRumHook(sdk: instance)`. RUM requires the main isolate. For background evaluation, initialize a separate pure Dart provider in that isolate.

Do not register `DatadogFlagsPluginConfiguration` for the same evaluations. That plugin belongs to the deprecated API.

## Create and retrieve a client

Retrieve an OpenFeature client after configuring the provider:

{{< code-block lang="dart" >}}
final client = OpenFeatureAPI.instance.getClient();
{{< /code-block >}}

For independent evaluation contexts, use named OpenFeature domains. A domain associates a client with its own provider and context. Create a separate provider instance for each domain:

{{< code-block lang="dart" >}}
await api.setEvaluationContextForDomainAndWait(
  'organization',
  EvaluationContext(targetingKey: 'org-123'),
);
final organizationProvider = DatadogOpenFeatureProvider(
  configuration: provider.configuration,
);
await api.setProviderForDomainAndWait('organization', organizationProvider);
final organizationClient = api.getClient('organization');
{{< /code-block >}}

Unless `clientName` is supplied, the provider uses the domain name for assignment storage. Each Dart isolate owns separate OpenFeature and provider state. Initialize the provider independently in each isolate that evaluates flags.

## Set the evaluation context

Use `EvaluationContext` to identify the evaluation subject and supply targeting attributes. Context belongs to the provider's OpenFeature domain; do not pass a different context for each evaluation.

<div class="alert alert-warning">Evaluation context attributes must be flat primitive values: strings, numbers, and Booleans. Nested objects and arrays are not supported and can cause exposure data to be dropped.</div>

{{< code-block lang="dart" >}}
await api.setEvaluationContextAndWait(
  EvaluationContext(
    targetingKey: 'user-456',
    attributes: {
      'companyId': 'company-456',
      'plan': 'enterprise',
      'loggedIn': true,
    },
  ),
);
{{< /code-block >}}

The `targetingKey` identifies the randomization subject for percentage rollouts. It is optional. Without a targeting key, the provider sends an empty string in the assignment request.

A context change keeps previous assignments active until new assignments are usable. If the change fails, OpenFeature retains the previous active context.

To sign out, clear the context:

{{< code-block lang="dart" >}}
await api.setEvaluationContextAndWait(EvaluationContext.empty);
{{< /code-block >}}

Sign-out clears private assignments immediately, even if loading anonymous assignments fails. After a failed sign-out, retry the context change before calling `refresh()`. For named domains, use `setEvaluationContextForDomainAndWait()` to update or clear that domain's context.

## Evaluate flags

Evaluations are synchronous and use local assignments. Each method requires a flag key and a default value as positional arguments. Missing flags, unavailable assignments, and type mismatches return the default instead of throwing an evaluation error.

### Boolean flags

{{< code-block lang="dart" >}}
final enabled = client.getBooleanValue('checkout.enabled', false);
{{< /code-block >}}

### String flags

{{< code-block lang="dart" >}}
final theme = client.getStringValue('ui.theme', 'light');
{{< /code-block >}}

### Integer and double flags

{{< code-block lang="dart" >}}
final maxItems = client.getIntegerValue('cart.items.max', 20);
final priceMultiplier = client.getDoubleValue('pricing.multiplier', 1.0);
{{< /code-block >}}

### Object flags

Use `getStructureValue()` or `getStructureDetails()` for JSON objects:

{{< code-block lang="dart" >}}
final config = client.getStructureValue(
  'ui.config',
  const <String, Object?>{
    'color': '#00A3FF',
    'fontSize': 14,
  },
);
{{< /code-block >}}

Structure evaluations accept `Map<String, Object?>` values. A list or scalar assignment returns the default with `ErrorCode.typeMismatch`. Successful structure values are immutable.

### Flag evaluation details

Each value method has a corresponding `get...Details()` method. Use these methods to inspect `FlagEvaluationDetails<T>`:

{{< code-block lang="dart" >}}
final details = client.getStringDetails('checkout.copy', 'Continue');

print(details.value);
print(details.variant);
print(details.reason);
print(details.errorCode);
print(details.flagMetadata[DatadogOpenFeatureProvider.allocationKeyMetadata]);
{{< /code-block >}}

`errorCode` identifies evaluation failures, such as `ErrorCode.providerNotReady`, `ErrorCode.flagNotFound`, or `ErrorCode.typeMismatch`. Successful details can include a variant and reason. Assignments restored from the configured store report `CACHED` until a network response replaces them.

Provider-specific metadata uses `datadog.allocation_key` and `datadog.serial_id`. Access these keys with `DatadogOpenFeatureProvider.allocationKeyMetadata` and `DatadogOpenFeatureProvider.serialIdMetadata`.

## Provider life cycle and refresh

Register event handlers before provider registration to observe initial availability:

{{< code-block lang="dart" >}}
final readySubscription = client.addHandler(ProviderEventType.ready, (_) {
  // Reevaluate flags and update the UI.
});
final contextSubscription = client.addHandler(
  ProviderEventType.contextChanged,
  (_) {
    // Reevaluate flags and update the UI after a context change.
  },
);

await provider.refresh();

// Remove handlers when the subscribing component is disposed.
readySubscription.cancel();
contextSubscription.cancel();
{{< /code-block >}}

`ready` signals usable assignments after initialization, refresh, or recovery. `contextChanged` signals that assignments for the new context are available. A successful refresh emits both `ready` and `configurationChanged`; this example uses only `ready` for reevaluation. `stale` means assignments remain usable while fresh assignments are unavailable. An `error` event reports a failed load or refresh. Events do not rebuild Flutter widgets automatically; update application state in the handlers.

`refresh()` reloads assignments for the active context. A successful refresh emits `configurationChanged`. A failed refresh emits an error and preserves usable active assignments. The provider does not poll automatically. Reapplying an unchanged context also fetches assignments. Use `refresh()` to reload assignments for the active context explicitly.

## Advanced configuration

Pass configuration through `DatadogOpenFeatureProvider(configuration: ...)`:

{{< code-block lang="dart" >}}
DatadogFlagsConfiguration(
  datadogConfig: provider.configuration.datadogConfig,
  initializationTimeout: const Duration(seconds: 2),
  trackExposures: true,
  trackEvaluations: true,
  evaluationFlushInterval: const Duration(seconds: 10),
  store: MyFlagsStore(),
);
{{< /code-block >}}

`trackExposures`
: Defaults to `true`. Records exposure events for successful evaluations whose assignments permit logging. Failed evaluations do not emit exposures. Set to `false` to disable exposure tracking.

`trackEvaluations`
: Defaults to `true`. Records aggregated telemetry for evaluations against active assignments, including missing-flag and type-mismatch defaults. Defaults returned before assignments become available are not recorded. Set to `false` to disable evaluation telemetry.

`initializationTimeout`
: Defaults to 5 seconds. The OpenFeature provider requires a positive duration of at most 20 seconds. Do not use the legacy API's disabled-timeout values. If using an isolated OpenFeature API with a shorter life cycle deadline, choose a smaller provider timeout.

  The budget covers cache loading, the assignment request, decoding, assignment publication, and storage. It bounds the caller's wait without cancelling the underlying operation. Synchronous work can delay timer delivery.

  The provider handles `FlagsInitializationTimeoutException` internally. Matching cached assignments produce a `stale` state. Without assignments, registration fails and evaluations return defaults. A late successful response emits `ready` and makes assignments available before cache storage completes.

`evaluationFlushInterval`
: Accepted values are between 1 and 60 seconds. The default is 10 seconds.

`store`
: Optional assignment storage. The provider uses stored assignments only when their evaluation context matches the requested context.

`httpClient`, `customFlagsEndpoint`, `customFlagsHeaders`, `customExposureEndpoint`, and `customEvaluationEndpoint`
: Override transport settings for proxies, tests, or custom routing. An application-supplied HTTP client remains owned by the application.

The provider sends exposure and evaluation telemetry independently of `DatadogRumHook`. OpenFeature `track()` does not send Datadog exposure events through this provider.

## Last-known assignment storage

Provide a `DatadogFlagsStore` to restore assignments across provider instances:

{{< code-block lang="dart" >}}
class MyFlagsStore implements DatadogFlagsStore {
  @override
  Future<FlagsData?> read(String clientName) async {
    // Decode stored JSON with FlagsData.fromJson().
    return null;
  }

  @override
  Future<void> write(String clientName, FlagsData data) async {
    // Persist the complete data.toJson() result.
  }

  @override
  Future<void> delete(String clientName) async {
    // Delete stored assignments for this client name.
  }
}
{{< /code-block >}}

Implement the storage operations with the application's storage mechanism. The package does not provide a disk store. Preserve the complete `FlagsData.toJson()` result and restore it with `FlagsData.fromJson()`, including metadata for obfuscated assignments.

The provider serializes writes and deletes for each store instance and client name. Make every storage operation complete; an operation that never completes can block later persistence operations.

## Shutdown

Shut down OpenFeature when the application no longer needs its providers:

{{< code-block lang="dart" >}}
await api.shutdown();
{{< /code-block >}}

Shutdown clears active assignments, prevents pending assignment publication, and drains pending telemetry. Repeated shutdown is safe. The provider closes its own HTTP client. Close an application-supplied client separately.

## Testing

Use OpenFeature's `InMemoryProvider` to test application behavior without contacting Datadog:

{{< code-block lang="dart" >}}
import 'package:openfeature_dart_client_sdk/openfeature_dart_client_sdk.dart';

final api = OpenFeatureAPI.instance;
await api.setProviderAndWait(
  InMemoryProvider({'checkout.enabled': true}),
);

try {
  final client = api.getClient();
  final enabled = client.getBooleanValue('checkout.enabled', false);
  assert(enabled);
} finally {
  await api.shutdown();
}
{{< /code-block >}}

Register the test provider during test setup. Shut down the API during teardown to clear shared state. To test the real provider, use a dedicated Datadog test environment.

## Migrate from the legacy API

The legacy Datadog evaluation API is deprecated. Removal is planned for the next major version. Existing clients remain functional during migration.

| Legacy API | OpenFeature replacement |
| --- | --- |
| `DatadogFlags.enable()` and `sharedClient()` | `setProviderAndWait()` and `getClient()` |
| `DatadogFlagsClient.initialize()` | `setEvaluationContextAndWait()` |
| `FlagsEvaluationContext` | `EvaluationContext` |
| `FlagDetails` and `details.error?.code` | `FlagEvaluationDetails` and `details.errorCode` |
| `FlagEvaluationError` | `ErrorCode` |
| `getObjectDetails()` | `getStructureDetails()` for JSON objects |
| Named shared clients | Separate providers registered with `setProviderForDomainAndWait()` |
| `DatadogFlags.disable()` | `OpenFeatureAPI.instance.shutdown()` |
| `DatadogFlagsPluginConfiguration` and `DatadogSdk.flags` | Explicit provider configuration and `DatadogRumHook` |
| `rumIntegrationEnabled` | Add or omit `DatadogRumHook` |

Change evaluation calls from named `key:` and `defaultValue:` arguments to positional arguments. Configuration and storage interfaces remain available.

For Flutter, remove the legacy plugin registration and add the RUM hook once. Do not run both integrations for the same evaluations. See the [package migration guide][3] for additional details.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/api-app-keys/#client-tokens
[2]: https://pub.dev/packages/openfeature_dart_client_sdk
[3]: https://github.com/DataDog/dd-sdk-flutter/blob/develop/packages/datadog_flags/MIGRATING.md
