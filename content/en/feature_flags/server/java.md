---
title: Java Feature Flags
description: Set up Datadog Feature Flags for Java applications.
further_reading:
- link: "/feature_flags/server/"
  tag: "Documentation"
  text: "Server-Side Feature Flags"
- link: "/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/"
  tag: "Documentation"
  text: "Java APM and Distributed Tracing"
- link: "/feature_flags/guide/server_flag_evaluation_metrics/"
  tag: "Guide"
  text: "Set Up Server-Side Flag Evaluation Metrics"
- link: "/feature_flags/concepts/flag_graphs/"
  tag: "Concept"
  text: "Feature Flag Graphs"
- link: "/feature_flags/concepts/configuration_sources/"
  tag: "Concept"
  text: "Server SDK Configuration Sources"
---

## Overview

This page describes how to instrument a Java application with the Datadog Feature Flags SDK. Datadog feature flags provide a unified way to remotely control feature availability in your app, experiment safely, and deliver new experiences with confidence.

The Java SDK integrates feature flags directly into the Datadog Java tracer (`dd-trace-java`) and implements the [OpenFeature](https://openfeature.dev/) standard for maximum flexibility and compatibility. Starting in version 1.65.0, the SDK loads flag configuration directly from the Datadog-managed CDN by default.

<div class="alert alert-warning">Java 1.65.0 supports agentless configuration delivery and local flag evaluation only. It does not send exposure events or aggregate <code>flagevaluation</code> events in agentless mode.</div>

## Getting started

For the default agentless setup, you need:

- **Java 11 or higher**
- **Datadog Java SDK** (`dd-java-agent`, added with `-javaagent`): Version **1.65.0** or later
- **Datadog OpenFeature provider** (`com.datadoghq:dd-openfeature`, added as a build dependency): Version **1.65.0** or later
- **OpenFeature SDK**: Version **1.20.1** or later
- A Datadog [API key][7]

For a full list of Datadog's Java version and framework support, read [Compatibility Requirements](/tracing/trace_collection/compatibility/java/).

## Installation

Feature flagging is integrated into the Datadog Java SDK. You need the SDK JAR and the OpenFeature SDK dependencies.

{{< tabs >}}
{{% tab "Gradle (Groovy)" %}}
Add the following dependencies to your `build.gradle`:

{{< code-block lang="groovy" filename="build.gradle" >}}
dependencies {
    // OpenFeature SDK for flag evaluation
    implementation 'dev.openfeature:sdk:1.20.1'

    // Datadog OpenFeature Provider
    implementation 'com.datadoghq:dd-openfeature:1.65.0'
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Gradle (Kotlin)" %}}
Add the following dependencies to your `build.gradle.kts`:

{{< code-block lang="kotlin" filename="build.gradle.kts" >}}
dependencies {
    // OpenFeature SDK for flag evaluation
    implementation("dev.openfeature:sdk:1.20.1")

    // Datadog OpenFeature Provider
    implementation("com.datadoghq:dd-openfeature:1.65.0")
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Maven" %}}
Add the following dependencies to your `pom.xml`:

{{< code-block lang="xml" filename="pom.xml" >}}
<dependencies>
    <!-- OpenFeature SDK for flag evaluation -->
    <dependency>
        <groupId>dev.openfeature</groupId>
        <artifactId>sdk</artifactId>
        <version>1.20.1</version>
    </dependency>

    <!-- Datadog OpenFeature Provider -->
    <dependency>
        <groupId>com.datadoghq</groupId>
        <artifactId>dd-openfeature</artifactId>
        <version>1.65.0</version>
    </dependency>
</dependencies>
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

The Gradle and Maven installation examples pin the minimum supported versions of `dd-openfeature` and the OpenFeature SDK listed in [Getting started](#getting-started).

## Configure Agentless delivery

Java 1.65.0 and later use agentless configuration delivery by default. Configure the API key and environment in the application process:

{{< code-block lang="bash" >}}
export DD_API_KEY=<YOUR_API_KEY>
export DD_ENV=<YOUR_ENVIRONMENT>

java -javaagent:path/to/dd-java-agent.jar -jar your-application.jar
{{< /code-block >}}

No Feature Flags enablement or source setting is required. Next, [initialize the OpenFeature provider](#initialize-the-openfeature-provider) to begin polling. Installing or initializing the Java tracer alone does not create Feature Flags CDN traffic.

### Add the Java tracer to the JVM

For instructions on how to add the `-javaagent` argument to your application server or framework, see [Add the Java SDK to the JVM](/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/#add-the-java-sdk-to-the-jvm).

## Initialize the OpenFeature provider

Initialize the Datadog OpenFeature provider in your application startup code. The provider connects to the feature flagging system running in the Datadog Java tracer.

{{< code-block lang="java" >}}
import dev.openfeature.sdk.OpenFeatureAPI;
import dev.openfeature.sdk.Client;
import datadog.trace.api.openfeature.Provider;
import dev.openfeature.sdk.exceptions.ProviderNotReadyError;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class App {
    private static final Logger logger = LoggerFactory.getLogger(App.class);
    private static Client client;

    public static void main(String[] args) throws Exception {
        // Initialize the Datadog provider
        logger.info("Initializing Datadog OpenFeature Provider...");
        OpenFeatureAPI api = OpenFeatureAPI.getInstance();

        try {
            // Set provider and wait for initial configuration (recommended)
            api.setProviderAndWait(new Provider());
            client = api.getClient("my-app");
            logger.info("OpenFeature provider initialized successfully");
        } catch (ProviderNotReadyError e) {
            // Handle gracefully - app will use default flag values
            logger.warn("Provider not ready (no tracer/config available), continuing with defaults", e);
            client = api.getClient("my-app");
            logger.info("App will use default flag values until provider is ready");
        } catch (Exception e) {
            logger.error("Failed to initialize OpenFeature provider", e);
            throw e;
        }

        // Your application code here
    }
}
{{< /code-block >}}

Use `setProviderAndWait()` to block evaluation until the selected configuration source provides the initial flag configuration. This makes flag values available before the application starts serving traffic. The default timeout is 30 seconds.

`ProviderNotReadyError` is an OpenFeature SDK exception thrown when the provider times out during initialization. Catching it allows the application to start with default flag values if configuration delivery is unavailable. If not caught, the exception propagates and may prevent application startup. Handle this based on your availability requirements.

### Asynchronous initialization

For non-blocking initialization, use `setProvider()` and listen for provider events:

{{< code-block lang="java" >}}
import dev.openfeature.sdk.ProviderEvent;

OpenFeatureAPI api = OpenFeatureAPI.getInstance();
Client client = api.getClient();

// Listen for provider state changes
client.on(ProviderEvent.PROVIDER_READY, (event) -> {
    logger.info("Feature flags ready!");
});

client.on(ProviderEvent.PROVIDER_ERROR, (event) -> {
    logger.error("Provider error: {}", event.getMessage());
});

client.on(ProviderEvent.PROVIDER_STALE, (event) -> {
    logger.warn("Provider configuration is stale");
});

// Set provider asynchronously
api.setProvider(new Provider());
{{< /code-block >}}

## Set the evaluation context

The evaluation context defines the subject (user, device, session) for flag evaluation. It determines which flag variations are returned based on targeting rules.

<div class="alert alert-warning">Datadog Feature Flags requires evaluation context attributes to be flat primitive values: strings, numbers, and Booleans. Do not pass nested objects or arrays; they are not supported and can cause exposure data to be dropped.</div>

{{< code-block lang="java" >}}
import dev.openfeature.sdk.EvaluationContext;
import dev.openfeature.sdk.MutableContext;

// Create an evaluation context with a targeting key and attributes
EvaluationContext context = new MutableContext("user-123")
    .add("email", "user@example.com")
    .add("tier", "premium");

// Use the context for flag evaluations (see next section)
{{< /code-block >}}

The `targetingKey` (for example, `user-123`) is the primary identifier used for consistent flag evaluations and percentage-based rollouts. It's typically a user ID, session ID, or device ID.

## Evaluate flags

Evaluate feature flags using the OpenFeature client. All flag types are supported: Boolean, string, integer, double, and object.

{{< tabs >}}
{{% tab "Boolean" %}}
{{< code-block lang="java" >}}
// Simple Boolean evaluation
boolean enabled = client.getBooleanValue("checkout.new", false, context);

if (enabled) {
    // New checkout flow
} else {
    // Old checkout flow
}

// Get detailed evaluation result
import dev.openfeature.sdk.FlagEvaluationDetails;

FlagEvaluationDetails<Boolean> details =
    client.getBooleanDetails("checkout.new", false, context);

logger.info("Value: {}", details.getValue());
logger.info("Variant: {}", details.getVariant());
logger.info("Reason: {}", details.getReason());
{{< /code-block >}}
{{% /tab %}}

{{% tab "String" %}}
{{< code-block lang="java" >}}
// Evaluate string flags (e.g., UI themes, API endpoints)
String theme = client.getStringValue("ui.theme", "light", context);

String apiEndpoint = client.getStringValue(
    "payment.api.endpoint",
    "https://api.example.com/v1",
    context
);
{{< /code-block >}}
{{% /tab %}}

{{% tab "Number" %}}
{{< code-block lang="java" >}}
// Integer flags (e.g., limits, quotas)
int maxRetries = client.getIntegerValue("retries.max", 3, context);

// Double flags (e.g., thresholds, rates)
double discountRate = client.getDoubleValue("pricing.discount.rate", 0.0, context);
{{< /code-block >}}
{{% /tab %}}

{{% tab "Object" %}}
{{< code-block lang="java" >}}
import dev.openfeature.sdk.Value;

// Evaluate object/JSON flags for complex configuration
Value config = client.getObjectValue("ui.config", new Value(), context);

// Access structured data
if (config.isStructure()) {
    Value timeout = config.asStructure().getValue("timeout");
    Value endpoint = config.asStructure().getValue("endpoint");
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## Error handling

The OpenFeature SDK uses a default value pattern. If evaluation fails for any reason, the default value you provide is returned.

{{< code-block lang="java" >}}
import dev.openfeature.sdk.ErrorCode;

// Check evaluation details for errors
FlagEvaluationDetails<Boolean> details =
    client.getBooleanDetails("checkout.new", false, context);

if (details.getErrorCode() != null) {
    switch (details.getErrorCode()) {
        case FLAG_NOT_FOUND:
            logger.warn("Flag does not exist: {}", "checkout.new");
            break;
        case PROVIDER_NOT_READY:
            logger.warn("Provider not initialized yet");
            break;
        case TARGETING_KEY_MISSING:
            logger.warn("Evaluation context missing targeting key");
            break;
        case TYPE_MISMATCH:
            logger.error("Flag value type doesn't match requested type");
            break;
        default:
            logger.error("Evaluation error for flag: {}", "checkout.new", details.getErrorCode());
    }
}
{{< /code-block >}}

### Common error codes

| Error Code | Description | Resolution |
|------------|-------------|------------|
| `PROVIDER_NOT_READY` | Initial configuration not received | Wait for provider initialization or use `setProviderAndWait()` |
| `FLAG_NOT_FOUND` | Flag doesn't exist in configuration | Check flag key or create flag in Datadog UI |
| `TARGETING_KEY_MISSING` | No targeting key in evaluation context | Provide a targeting key when creating context |
| `TYPE_MISMATCH` | Flag value can't be converted to requested type | Use correct evaluation method for flag type |
| `INVALID_CONTEXT` | Evaluation context is null | Provide a valid evaluation context |

## Advanced configuration

### Agentless delivery settings

Feature Flags are enabled by default. You do not need to set `DD_FEATURE_FLAGS_ENABLED` unless you want to disable Feature Flags explicitly.

| Environment variable | Default | Description |
|---|---|---|
| `DD_FEATURE_FLAGS_ENABLED` | `true` | Set to `false` to disable the provider and both configuration delivery paths. |
| `DD_SITE` | `datadoghq.com` | Datadog site used to derive the agentless endpoint. Set this when your organization uses another site. |
| `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE` | `agentless` | Selects `agentless` or `remote_config` delivery. |
| `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE_AGENTLESS_BASE_URL` | Datadog-managed endpoint | Overrides the agentless backend URL. |
| `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE_AGENTLESS_POLL_INTERVAL_SECONDS` | `30` | Time between completed polling attempts. |
| `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE_AGENTLESS_REQUEST_TIMEOUT_SECONDS` | `2` | Timeout for an individual configuration request. |
| `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE_AGENTLESS_EXTRA_HEADERS` | None | Adds headers to agentless configuration requests. |

The SDK polls in the background and evaluates flags locally from the last accepted configuration. Individual evaluations do not make network requests. CDN requests contribute to server Feature Flags billing.

### Use Agent remote configuration

To retain Agent-managed delivery, select `remote_config`:

{{< code-block lang="bash" >}}
export DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config
{{< /code-block >}}

Configure the API key on a Datadog Agent 7.55 or later. Remote Configuration is enabled by default on Agent 7.47.0 and later; if it is disabled, enable it in `datadog.yaml`:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
remote_configuration:
  enabled: true

api_key: <YOUR_API_KEY>
{{< /code-block >}}

Explicitly selecting `remote_config` enables the Feature Flags Remote Configuration subscription without requiring application code to initialize the provider. Remote Configuration requests contribute to server Feature Flags billing.

### Migrate an existing remote configuration setup

Existing customers who set `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` remain on Remote Configuration during a migration window. The setting is deprecated, and its removal version and timeline are communicated separately.

- **Stay on Agent delivery:** Set `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config`, then remove `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED`.
- **Move to agentless delivery:** Upgrade both `dd-java-agent` and `dd-openfeature` to 1.65.0 or later, set `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless`, move the API key and environment to the application process, then remove the legacy setting.
- **Keep Feature Flags disabled:** Replace `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=false` with `DD_FEATURE_FLAGS_ENABLED=false`.

After the legacy setting is removed, Java defaults to agentless delivery unless you explicitly select `remote_config`. See [Server SDK Configuration Sources][10] for the complete precedence table.

### Custom initialization timeout

Configure how long the provider waits for initial configuration:

{{< code-block lang="java" >}}
import datadog.trace.api.openfeature.Provider;
import java.util.concurrent.TimeUnit;

Provider.Options options = new Provider.Options()
    .initTimeout(10, TimeUnit.SECONDS);

api.setProviderAndWait(new Provider(options));
{{< /code-block >}}

### Configuration change events

Listen for updates from the selected configuration source:

{{< code-block lang="java" >}}
import dev.openfeature.sdk.ProviderEvent;

client.on(ProviderEvent.PROVIDER_CONFIGURATION_CHANGED, (event) -> {
    logger.info("Flag configuration updated: {}", event.getMessage());
    // Optionally re-evaluate flags or trigger cache refresh
});
{{< /code-block >}}

`PROVIDER_CONFIGURATION_CHANGED` is an optional OpenFeature event. Check the Datadog provider documentation to verify this event is supported in your version.

### Multiple clients

Use named clients to organize context and flags by domain or team:

{{< code-block lang="java" >}}
// Named clients share the same provider instance but can have different contexts
Client checkoutClient = api.getClient("checkout");
Client analyticsClient = api.getClient("analytics");

// Each client can have its own evaluation context
EvaluationContext checkoutContext = new MutableContext("session-abc");
EvaluationContext analyticsContext = new MutableContext("user-123");

boolean newCheckout = checkoutClient.getBooleanValue(
    "checkout.ui.new", false, checkoutContext
);

boolean enhancedAnalytics = analyticsClient.getBooleanValue(
    "analytics.enhanced", false, analyticsContext
);
{{< /code-block >}}

The `Provider` instance is shared globally. Client names are for organizational purposes only and don't create separate provider instances. All clients use the same underlying Datadog provider and flag configurations.

## Best practices

### Initialize early
Initialize the OpenFeature provider as early as possible in your application lifecycle (for example, in `main()` or application startup). This helps ensure flags are ready before business logic executes.

### Use meaningful default values
Always provide sensible default values that maintain safe behavior if flag evaluation fails:

{{< code-block lang="java" >}}
// Good: Safe default that maintains current behavior
boolean useNewAlgorithm = client.getBooleanValue("algorithm.new", false, context);

// Good: Conservative default for limits
int rateLimit = client.getIntegerValue("rate.limit", 100, context);
{{< /code-block >}}

### Create context once
Create the evaluation context once per request/user/session and reuse it for all flag evaluations:

{{< code-block lang="java" >}}
// In a web filter or request handler
EvaluationContext userContext = new MutableContext(userId)
    .add("email", user.getEmail())
    .add("tier", user.getTier());

// Reuse context for all flags in this request
boolean featureA = client.getBooleanValue("feature.a", false, userContext);
boolean featureB = client.getBooleanValue("feature.b", false, userContext);
{{< /code-block >}}

Rebuilding the evaluation context for every flag evaluation adds unnecessary overhead. Create the context once at the start of the request lifecycle, then pass it to all subsequent flag evaluations.

### Handle initialization failures (optional)
Consider handling initialization failures if your application can function with default flag values:

{{< code-block lang="java" >}}
try {
    api.setProviderAndWait(new Provider());
} catch (ProviderNotReadyError e) {
    // Log error and continue with defaults
    logger.warn("Feature flags not ready, using defaults", e);
    // Application will use default values for all flags
}
{{< /code-block >}}

If feature flags are critical for your application to function, let the exception propagate to prevent startup.

### Use consistent targeting keys
Use consistent, stable identifiers as targeting keys:
- **Good**: User IDs, session IDs, device IDs
- **Avoid**: Timestamps, random values, frequently changing IDs

### Monitor flag evaluation
Use the detailed evaluation results for logging and debugging:

{{< code-block lang="java" >}}
FlagEvaluationDetails<Boolean> details =
    client.getBooleanDetails("feature.critical", false, context);

logger.info("Flag: {} | Value: {} | Variant: {} | Reason: {}",
    "feature.critical",
    details.getValue(),
    details.getVariant(),
    details.getReason()
);
{{< /code-block >}}

## Testing

You can test against a dedicated Datadog test environment with the real `DatadogProvider`, or swap it for OpenFeature's `InMemoryProvider` to control flag values directly in test code. This section shows the in-memory approach, which keeps tests hermetic and offline. `InMemoryProvider` ships in `dev.openfeature:sdk` (already a test-scope dependency), so no additional library is required. Add `dev.openfeature:sdk` to your test configuration if it is not already present.

{{< code-block lang="java" >}}
import dev.openfeature.sdk.Client;
import dev.openfeature.sdk.OpenFeatureAPI;
import dev.openfeature.sdk.providers.memory.Flag;
import dev.openfeature.sdk.providers.memory.InMemoryProvider;
import java.util.Map;
import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

class CheckoutFlagTest {
    private Client client;

    @BeforeEach
    void setUp() {
        Map<String, Flag<?>> flags = Map.of(
            "new-checkout-flow", Flag.<Boolean>builder()
                .variant("on", true)
                .variant("off", false)
                .defaultVariant("on")
                .build(),
            "ui-theme", Flag.<String>builder()
                .variant("dark", "dark")
                .variant("light", "light")
                .defaultVariant("light")
                .build()
        );

        OpenFeatureAPI api = OpenFeatureAPI.getInstance();
        api.setProviderAndWait(new InMemoryProvider(flags));
        client = api.getClient();
    }

    @AfterEach
    void tearDown() {
        OpenFeatureAPI.getInstance().shutdown();
    }

    @Test
    void newCheckoutEnabledByDefault() {
        assertTrue(client.getBooleanValue("new-checkout-flow", false));
    }

    @Test
    void missingFlagReturnsDefault() {
        assertFalse(client.getBooleanValue("does-not-exist", false));
    }
}
{{< /code-block >}}

`OpenFeatureAPI.getInstance()` is a singleton. Always call `shutdown()` in `@AfterEach` (or equivalent); otherwise, provider state leaks between test classes and causes flaky suites.

In Spring Boot tests, register the `InMemoryProvider` through a `@TestConfiguration` bean or in a `@BeforeAll` hook on an `@SpringBootTest` class — the OpenFeature API singleton persists for the lifetime of the Spring context, so initialization only needs to run once.

## Troubleshooting

Follow the flag data path from the **Flagging Platform** through the selected configuration source to the **Java SDK**. Agentless and Remote Configuration have different prerequisites, so verify the active source before troubleshooting connectivity.

### 1. Flagging platform: Verify flag configuration

Before checking infrastructure, confirm the flag itself is set up correctly:

1. The flag is **enabled** for the target environment, not disabled. Flags are disabled by default in each environment.
2. The flag targets the **correct environment** (`DD_ENV`). Flags do not target specific services—they apply to all services within the enabled environment.
3. Your `DD_ENV` value appears in [{{< ui >}}Feature Flag Environments{{< /ui >}}][5]. If it is absent, the environment has not received any flag traffic yet.

### 2. Verify the configuration source

#### Agentless

1. Confirm both `dd-java-agent` and `dd-openfeature` are version 1.65.0 or later.
2. Confirm `DD_FEATURE_FLAGS_ENABLED` is not set to `false`.
3. Confirm `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless` is set, or that both source and legacy provider settings are absent.
4. Confirm application code initializes or accesses the Datadog OpenFeature provider.
5. Confirm `DD_API_KEY` and `DD_ENV` are configured in the application process. If your organization is not on the default site, confirm `DD_SITE` is also configured.
6. Confirm the application can make outbound HTTPS requests to Datadog.
7. Enable `DD_TRACE_DEBUG=true` and check for authentication, timeout, or malformed-payload messages from the Feature Flagging agentless endpoint.

#### Agent remote configuration

1. Confirm `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config` is set. During the migration window, legacy `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` with no explicit source also selects Remote Configuration.
2. Confirm `DD_FEATURE_FLAGS_ENABLED` is not set to `false`.
3. Confirm Agent 7.55 or later is running and reachable. See [APM Connection Errors][2].
4. Confirm Remote Configuration is enabled on the Agent. If it has been disabled, set `remote_configuration.enabled: true` in `datadog.yaml` or `DD_REMOTE_CONFIGURATION_ENABLED=true`. See [Remote Configuration][1].
5. Confirm `DD_API_KEY` is valid on the Agent and belongs to the target organization.
6. Confirm `DD_SITE` is set correctly on the Agent. See [Agent Site Issues][3].
7. Run `datadog-agent status` and review the Remote Configuration section. See [Agent Commands][6].

### 3. Verify Java SDK state

#### Enable debug logging

All feature flagging startup messages are emitted at DEBUG level. Set `DD_TRACE_DEBUG=true` and look for the startup sequence:

```
[dd.trace] Feature Flagging system starting
[dd.trace] Feature Flagging system started
```

If these messages are absent, confirm `DD_FEATURE_FLAGS_ENABLED` is not `false` and verify the activation step for the selected source.

#### Monitor provider state changes

Add event listeners early in application startup to observe provider life cycle transitions. Event listeners detect connectivity changes after initialization:

{{< code-block lang="java" >}}
import dev.openfeature.sdk.ProviderEvent;

client.on(ProviderEvent.PROVIDER_READY, (event) -> {
    logger.info("Feature flag provider is ready");
});

client.on(ProviderEvent.PROVIDER_ERROR, (event) -> {
    logger.error("Feature flag provider error: {}", event.getMessage());
});

client.on(ProviderEvent.PROVIDER_STALE, (event) -> {
    logger.warn("Feature flag provider configuration is stale");
});

client.on(ProviderEvent.PROVIDER_CONFIGURATION_CHANGED, (event) -> {
    logger.info("Feature flag configuration updated");
});
{{< /code-block >}}

A `PROVIDER_ERROR` or `PROVIDER_STALE` event after a period of normal operation indicates a disruption in the selected configuration source.

#### Provider not ready

`PROVIDER_NOT_READY` is returned when flag evaluation is attempted before the provider has received its first configuration from the selected source.

Common causes:
- **Async initialization**: `setProvider()` was used instead of `setProviderAndWait()`. Evaluations that happen before the first configuration arrives return `PROVIDER_NOT_READY`.
- **Initialization timeout**: `setProviderAndWait()` timed out (default 30 seconds) and threw `ProviderNotReadyError`, which was caught. The application continues evaluating flags while waiting for the first configuration.

If `PROVIDER_NOT_READY` persists beyond the source's polling and initialization interval, re-check steps 2 and 3.

#### Debug flag evaluations

If flags return unexpected values, use `getBooleanDetails()` instead of `getBooleanValue()`. The `Details` variant returns a `FlagEvaluationDetails` object exposing the provider's internal state:

{{< code-block lang="java" >}}
FlagEvaluationDetails<Boolean> details =
    client.getBooleanDetails("your.flag.key", false, context);

logger.info("Flag evaluation details: value={}, variant={}, reason={}, errorCode={}",
    details.getValue(),
    details.getVariant(),
    details.getReason(),
    details.getErrorCode());
{{< /code-block >}}

Review `reason` and `errorCode` to understand why the provider returned a given result.

#### Type mismatch errors

`TYPE_MISMATCH` is returned when the evaluation method does not match the flag's configured type. Use the correct method for each flag type: `getBooleanValue()`, `getStringValue()`, `getIntegerValue()`, `getDoubleValue()`.

### 4. Flagging telemetry

<div class="alert alert-warning">Java 1.65.0 does not provide agentless delivery for exposure events or aggregate <code>flagevaluation</code> events. Their absence in a no-Agent deployment is expected and does not indicate that configuration loading or local evaluation failed.</div>

#### Flag evaluation metrics

Flag evaluation counts appear in Datadog as a `feature_flag.evaluations` counter metric tagged with the flag key, result variant, and evaluation reason. See <a href="/feature_flags/guide/server_flag_evaluation_metrics/">Set Up Server-Side Flag Evaluation Metrics</a> for the full setup guide and troubleshooting steps.

#### Experiment exposures

When using a delivery path that supports exposures, exposures appear in Datadog only for flags associated with an experiment. Standard feature flags without an experiment association do not generate exposure events. If exposures are missing:

1. Verify the flag is associated with an experiment in the Datadog UI.
2. Verify the telemetry path's API key and connectivity.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /remote_configuration/
[2]: /tracing/troubleshooting/connection_errors/
[3]: /agent/troubleshooting/site/
[4]: https://app.datadoghq.com/fleet
[5]: https://app.datadoghq.com/feature-flags/settings/environments
[6]: /agent/configuration/agent-commands/
[7]: /account_management/api-app-keys/#api-keys
[8]: /feature_flags/guide/server_flag_evaluation_metrics/
[9]: /feature_flags/concepts/configuration_sources/
[10]: /feature_flags/concepts/configuration_sources/#configuration-precedence
