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

Use the [OpenFeature Dart client SDK][2] to evaluate Datadog feature flags in Dart and Flutter applications. `datadog_flags` provides `DatadogProvider`. The provider fetches precomputed assignments, evaluates flags locally, and sends exposure and evaluation telemetry to Datadog.

Flutter applications can use the provider directly. Register `DatadogRumHook` from `datadog_flags_flutter` to associate successful evaluations with the active RUM view.

OpenFeature is the recommended application API. For existing applications, see [Migrate from the legacy API](#migrate-from-the-legacy-api).

## Installation

This integration requires:

- `datadog_flags` 1.2.0 or later (or `datadog_flags_flutter` 1.2.0 or later for Flutter with RUM).
- Dart 3.10 or later.
- `openfeature_dart_client_sdk` 0.0.1.
- For Flutter applications, Flutter 3.38.1 or later.

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

```dart
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

final configuration = DatadogFlagsConfiguration(
  initializationTimeout: const Duration(seconds: 2),
  datadogConfig: const DatadogFlagsConfig(
    clientToken: '<CLIENT_TOKEN>',
    env: '<ENV_NAME>',
    site: DatadogFlagsSite.{{< region-param key="dd_datacenter_lowercase" code="true" >}},
    service: '<SERVICE_NAME>',
    version: '<APP_VERSION>',
  ),
);
final provider = DatadogProvider.fromConfiguration(configuration);

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
```

`clientToken`, `env`, and `site` are required for live assignments. Use the site that matches the Datadog organization. `applicationId`, `service`, and `version` are optional telemetry fields.

`setProviderAndWait()` waits for provider initialization. Registration can fail when no assignments are available. Initial loading can still succeed later and emit a `ready` event. Matching cached assignments remain usable in the `stale` state. See [Provider life cycle and refresh](#provider-life-cycle-and-refresh).

## Flutter-integrated setup

Initialize `datadog_flutter_plugin` for RUM, then configure the OpenFeature provider. Register `DatadogRumHook` once with the OpenFeature API so that it applies to every client.

```dart
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
api.addHooks([DatadogRumHook()]);

await api.setEvaluationContextAndWait(
  EvaluationContext(targetingKey: 'user-123'),
);
final configuration = DatadogFlagsConfiguration(
  initializationTimeout: const Duration(seconds: 2),
  datadogConfig: const DatadogFlagsConfig(
    clientToken: '<CLIENT_TOKEN>',
    env: '<ENV_NAME>',
    site: DatadogFlagsSite.{{< region-param key="dd_datacenter_lowercase" code="true" >}},
    applicationId: '<RUM_APPLICATION_ID>',
    service: '<SERVICE_NAME>',
    version: '<APP_VERSION>',
  ),
);
final provider = DatadogProvider.fromConfiguration(configuration);

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
```

Configure the provider explicitly. It does not derive its configuration or evaluation context from the Flutter SDK. Keep the token, environment, site, and optional telemetry fields consistent across both configurations.

The hook adds the variant of each successful evaluation to the active RUM view. It skips evaluations with errors and results without a variant. Omit the hook to disable RUM association. The provider still controls exposure and evaluation telemetry separately.

Register the hook with `OpenFeatureAPI.instance.addHooks()`. A hook added to a client applies only to that client object, and each `getClient()` call returns a new client. After `api.shutdown()`, register the hook again.

For a custom `DatadogSdk` instance, use `DatadogRumHook(sdk: instance)`. RUM requires the main isolate. For background evaluation, initialize a separate pure Dart provider in that isolate.

<div class="alert alert-warning">Do not register <code>DatadogFlagsPluginConfiguration</code> (legacy API) together with <code>DatadogRumHook</code> for the same flags. The legacy plugin initializes a separate Flags client and reports legacy evaluations to RUM. It does not associate OpenFeature evaluations with RUM; use the hook for those evaluations. Evaluating the same flags through both APIs can report them to RUM twice.</div>

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
final organizationProvider = DatadogProvider.fromConfiguration(configuration);
await api.setProviderForDomainAndWait('organization', organizationProvider);
final organizationClient = api.getClient('organization');
{{< /code-block >}}

The provider uses the domain name as its Datadog client name for assignment storage, or `default` for the default domain. Each Dart isolate owns separate OpenFeature and provider state. Initialize the provider independently in each isolate that evaluates flags.

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

The `targetingKey` identifies the randomization subject for percentage rollouts. It is optional. A missing targeting key and an empty targeting key identify the same subject.

When only targeting attributes change, evaluations keep the previous assignments while new assignments load and after a failed load. When the targeting key changes, evaluations return application defaults until assignments for the new key load. If the change fails, OpenFeature retains the previous active context.

To sign out, clear the context:

{{< code-block lang="dart" >}}
await api.setEvaluationContextAndWait(EvaluationContext.empty);
{{< /code-block >}}

Sign-out is a targeting key change, so private assignments stop being used immediately. After a failed context change, `refresh()` throws `StateError` until a later context change succeeds. For named domains, use `setEvaluationContextForDomainAndWait()` to update or clear that domain's context.

### Strict context switching

To use assignments only while both the targeting key and the targeting attributes match, set `strictContextSwitchingAttribute` to `true`:

{{< code-block lang="dart" >}}
await api.setEvaluationContextAndWait(
  EvaluationContext(
    targetingKey: 'user-123',
    attributes: {strictContextSwitchingAttribute: true},
  ),
);
{{< /code-block >}}

In strict mode, evaluations return defaults during an attribute change and after a failed load. Only the Boolean value `true` enables strict mode. The SDK removes this attribute from assignment requests, stored assignments, and telemetry. Other OpenFeature hooks and providers still receive it.

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
print(details.flagMetadata[DatadogProvider.allocationKeyMetadata]);
{{< /code-block >}}

`errorCode` identifies evaluation failures, such as `ErrorCode.providerNotReady`, `ErrorCode.flagNotFound`, or `ErrorCode.typeMismatch`. Successful details can include a variant and reason. Assignments restored from the configured store report `CACHED` until a network response replaces them.

The provider supplies the `allocationKey`, `doLog`, and `variationType` metadata keys. Access the first two with `DatadogProvider.allocationKeyMetadata` and `DatadogProvider.doLogMetadata`. Metadata keys that start with `__dd_` are internal and can change, except the split feature keys that start with `__dd_feature.`.

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

`ready` signals usable assignments after initialization, refresh, or recovery. `contextChanged` signals that assignments for the new context are available. A successful refresh emits `ready` and then `configurationChanged`; this example uses only `ready` for reevaluation. `stale` means assignments remain usable while fresh assignments are unavailable. An `error` event reports a failed load or refresh. Events do not rebuild Flutter widgets automatically; update application state in the handlers.

`refresh()` reloads assignments for the active context. It waits for pending initialization or context changes before it starts. A failed refresh emits `error`, and then `stale` when previous assignments remain usable. In strict mode, a failed refresh emits `error` and evaluations return defaults until a successful load. `refresh()` throws `StateError` before initialization and after shutdown.

The provider does not poll automatically. Each context change reloads assignments, even when the context is unchanged. Do not call `refresh()` from every `error` event: repeated retries can prevent a slow request from completing.

## Advanced configuration

Pass a `DatadogFlagsConfiguration` to `DatadogProvider.fromConfiguration()`:

{{< code-block lang="dart" >}}
final provider = DatadogProvider.fromConfiguration(
  DatadogFlagsConfiguration(
    datadogConfig: const DatadogFlagsConfig(
      clientToken: '<CLIENT_TOKEN>',
      env: '<ENV_NAME>',
      site: DatadogFlagsSite.{{< region-param key="dd_datacenter_lowercase" code="true" >}},
    ),
    initializationTimeout: const Duration(seconds: 2),
    trackExposures: true,
    trackEvaluations: true,
    evaluationFlushInterval: const Duration(seconds: 10),
    flagSelection: const FlagSelection(tags: ['checkout']),
    store: MyFlagsStore(),
  ),
);
{{< /code-block >}}

`trackExposures`
: Defaults to `true`. Records exposure events for successful evaluations whose assignments permit logging. Failed evaluations do not emit exposures. Set to `false` to disable exposure tracking. `ExposureHook` still receives exposures when this option is `false`. See [Exposures in your own data store](#exposures-in-your-own-data-store).

`trackEvaluations`
: Defaults to `true`. Records aggregated telemetry for evaluations against active assignments, including missing-flag and type-mismatch defaults. Defaults returned before assignments become available are not recorded. Set to `false` to disable evaluation telemetry.

`initializationTimeout`
: Defaults to 5 seconds. The provider requires a positive duration of at most 20 seconds. Do not use the legacy API's disabled-timeout values. A missing configuration or an invalid timeout produces `PROVIDER_FATAL`, and evaluations return defaults. Recovery requires a new provider with a corrected configuration. OpenFeature also enforces its own initialization deadline, which defaults to 30 seconds. If you configure an isolated OpenFeature API with a shorter deadline, set `initializationTimeout` to less than that deadline. This lets the provider handle its timeout before OpenFeature stops waiting.

  The provider applies the timeout to initialization, each context change, and each refresh. The budget covers cache loading, the assignment request, decoding, assignment publication, and storage. It bounds the caller's wait without canceling the underlying operation. Synchronous work can delay timer delivery.

  The provider handles `FlagsInitializationTimeoutException` internally. Matching cached assignments produce a `stale` state. Without assignments, registration fails and evaluations return defaults. A late successful response emits `ready` and makes assignments available before cache storage completes.

`evaluationFlushInterval`
: Defaults to 10 seconds. Values outside the range of 1 to 60 seconds are set to the nearest limit.

`flagSelection`
: Optional. Loads only the flags that have any of the selected `tags` or whose key matches any of the `keyPatterns`. Tags and key patterns are case-sensitive. In a key pattern, `*` matches any run of characters. Each list accepts at most 31 values, and each value is at most 200 UTF-8 bytes. If a selection exceeds a limit, the SDK logs an error and loads every flag. Evaluating a flag outside the selection returns the default value. Stored assignments are restored only under the same selection.

`store`
: Optional assignment storage. See [Last-known assignment storage](#last-known-assignment-storage).

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

The provider uses a stored snapshot only when its evaluation context and configuration scope match the request. The scope is a digest of the site, environment, and client token. Snapshots without a scope, such as snapshots from earlier SDK versions, are not used. After an upgrade or a client token rotation, evaluations use defaults until fresh assignments load.

Context changes and shutdown do not delete stored snapshots. To remove stored data, call `delete()` on your store with the domain name, or `default` for the default domain.

The provider serializes writes and deletes for each store instance and client name. Make every storage operation complete. An operation that never completes can block later persistence operations.

## Exposures in your own data store

To record exposures in your own data store, add an `ExposureHook`:

{{< code-block lang="dart" >}}
api.addHooks([
  ExposureHook((evaluation) {
    if (evaluation.shouldSend) {
      myQueue.add({
        'flag': evaluation.flagKey,
        'variant': evaluation.variant,
        'allocation': evaluation.allocationKey,
        'subject': evaluation.targetingKey,
      });
    }
  }),
]);
{{< /code-block >}}

The callback receives every completed evaluation from `DatadogProvider`:

- `isExposure` is `true` for a successful evaluation of an allocation that logs exposures, including repeats.
- `isCacheHit` is `true` when the subject's most recent exposure to the flag had the same allocation, variant, and assignment serial ID.
- `shouldSend` is `true` for a new exposure. These are the exposures that the SDK sends to Datadog when `trackExposures` is `true`.
- `features` contains the published features of the assignment's split, such as `holdout.key`.
- `flagKey`, `variant`, `allocationKey`, `targetingKey`, and `evaluationContext` describe the evaluation.

The callback runs synchronously during the evaluation. Keep it fast and queue any I/O. The SDK catches exceptions from the callback and logs them. The evaluation result does not change. The exposure deduplication cache is in memory, so after a restart, the first evaluation of each assignment is a new exposure.

## Diagnostics

The SDK writes diagnostics to the Dart developer log under the name `datadog_flags`. Release builds and web builds do not show this log. To also print diagnostics in any build mode, set the lowest level to print:

{{< code-block lang="dart" >}}
DatadogProvider.verbosity = FlagsLoggerLevel.warning;
{{< /code-block >}}

The setting applies to every `datadog_flags` component in the isolate. The available levels are `debug`, `warning`, and `error`. The default is `null`, which prints nothing.

## Shutdown

Shut down OpenFeature when the application no longer needs its providers:

{{< code-block lang="dart" >}}
await api.shutdown();
{{< /code-block >}}

Shutdown clears active assignments, prevents pending assignment publication, and drains pending telemetry. Repeated shutdown is safe. The provider closes its own HTTP client. Close an application-supplied client separately. Register API-level hooks again before you register a new provider.

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

The legacy Datadog evaluation API is deprecated and planned for removal in the next major version. Existing clients remain functional during migration.

| Legacy API | OpenFeature replacement |
| --- | --- |
| `DatadogFlags.enable()` and `sharedClient()` | `DatadogProvider.fromConfiguration()`, `setProviderAndWait()`, and `getClient()` |
| `DatadogFlagsClient.initialize()` | `setEvaluationContextAndWait()` |
| `FlagsEvaluationContext` | `EvaluationContext` |
| `FlagDetails` and `details.error?.code` | `FlagEvaluationDetails` and `details.errorCode` |
| `FlagEvaluationError` | `ErrorCode` |
| `getObjectDetails()` | `getStructureDetails()` for JSON objects |
| Named shared clients | Separate providers registered with `setProviderForDomainAndWait()` |
| `DatadogFlags.disable()` | `OpenFeatureAPI.instance.shutdown()` |
| `DatadogFlags.reset()` and `DatadogFlagsClient.reset()` | `delete()` on your store with the domain name, or `default` |
| `DatadogFlagsPluginConfiguration` and `DatadogSdk.flags` | Explicit provider configuration and `DatadogRumHook` |
| `rumIntegrationEnabled` | Register or omit `DatadogRumHook` |

Change evaluation calls from named `key:` and `defaultValue:` arguments to positional arguments. Configuration and storage interfaces remain available.

For Flutter, remove the legacy plugin registration and register the RUM hook once with `OpenFeatureAPI.instance.addHooks()`. The provider does not read the Datadog SDK configuration, so pass `applicationId`, `service`, and `version` to keep these fields in evaluation telemetry. Do not run both integrations for the same evaluations. See the [package migration guide][3] for additional details.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/api-app-keys/#client-tokens
[2]: https://pub.dev/packages/openfeature_dart_client_sdk
[3]: https://github.com/DataDog/dd-sdk-flutter/blob/develop/packages/datadog_flags/MIGRATING.md
