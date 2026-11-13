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
- link: "/feature_flags/guide/apm_trace_enrichment/"
  tag: "Guide"
  text: "Set Up APM Trace Enrichment for Feature Flags"
- link: "/feature_flags/concepts/flag_graphs/"
  tag: "Concept"
  text: "Feature Flag Graphs"
- link: "/feature_flags/concepts/configuration_sources/"
  tag: "Concept"
  text: "Server SDK Configuration Sources"
---

## Overview

The Datadog Java provider implements the [OpenFeature](https://openfeature.dev/) standard and evaluates flags locally. Agentless mode is the default. The provider receives flag configuration directly from Datadog without a Datadog Agent or `dd-java-agent`.

## Getting started

Use Java 11 or later. Create a Boolean flag named `my-feature`. Enable its **Server** distribution channel and enable it in the target environment.

1. Add `com.datadoghq:dd-openfeature:1.69.0` to your application. It includes the OpenFeature SDK dependency.

{{< tabs >}}
{{% tab "Gradle (Groovy)" %}}
{{< code-block lang="groovy" filename="build.gradle" >}}
dependencies {
    implementation 'com.datadoghq:dd-openfeature:1.69.0'
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Gradle (Kotlin)" %}}
{{< code-block lang="kotlin" filename="build.gradle.kts" >}}
dependencies {
    implementation("com.datadoghq:dd-openfeature:1.69.0")
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Maven" %}}
{{< code-block lang="xml" filename="pom.xml" >}}
<dependency>
    <groupId>com.datadoghq</groupId>
    <artifactId>dd-openfeature</artifactId>
    <version>1.69.0</version>
</dependency>
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

2. Set your Datadog [API key][7] and flag environment in the application process:

{{< code-block lang="bash" >}}
export DD_API_KEY='<DATADOG_API_KEY>'
export DD_ENV='<YOUR_ENVIRONMENT>'
{{< /code-block >}}

If your Datadog [site][14] is not US1 (`datadoghq.com`), also set `DD_SITE` to your site.

3. Register the provider, wait for configuration, and evaluate your flag:

{{< code-block lang="java" >}}
import com.datadog.openfeature.Provider;
import dev.openfeature.sdk.MutableContext;
import dev.openfeature.sdk.OpenFeatureAPI;

public class App {
    public static void main(String[] args) throws Exception {
        OpenFeatureAPI api = OpenFeatureAPI.getInstance();
        api.setProviderAndWait(new Provider());
        boolean enabled = api.getClient().getBooleanValue(
            "my-feature", false, new MutableContext("user-123"));
    }
}
{{< /code-block >}}

Replace `my-feature` with your flag key and `user-123` with a stable subject identifier.

No Feature Flags enablement or configuration source setting is required. For an existing Agent setup, see [Migrate an existing Remote Configuration setup][11].

## Compatibility requirements

- **Java 11 or later**
- **Datadog OpenFeature provider** (`com.datadoghq:dd-openfeature`): Version **1.69.0** or later
- **OpenFeature SDK**: Version **1.23.0** or later, included with `dd-openfeature`

Agentless mode requires an API key in the application process and outbound HTTPS access to Datadog. Set `DD_ENV` to the environment that contains your flag configuration. `DD_SITE` defaults to `datadoghq.com`. `DD_SERVICE` and `DD_VERSION` are optional metadata.

Settings use the attached Java agent configuration first, then `dd.` JVM system properties, then environment variables. If you manage OpenFeature dependencies separately, use OpenFeature SDK 1.23.0 or later so provider hooks run inside a `MultiProvider`.

## Initialize the OpenFeature provider

Initialize the Datadog OpenFeature provider in your application startup code. The provider starts the selected configuration source.

{{< code-block lang="java" >}}
import dev.openfeature.sdk.OpenFeatureAPI;
import dev.openfeature.sdk.Client;
import com.datadog.openfeature.Provider;
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
            logger.warn("Provider not ready (configuration unavailable), continuing with defaults", e);
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

Use `setProviderAndWait()` to block evaluation until the selected source provides the initial flag configuration. This loads flags before the application starts serving traffic. The default initialization timeout is 30 seconds.

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

Use [Server SDK Configuration Sources][9] as the canonical reference for source selection and operational settings:

- [Configure agentless delivery][12], including polling, request timeout, and endpoint settings
- [Use a custom agentless endpoint][10] for advanced testing, local development, or an operator-managed proxy
- [Use Agent Remote Configuration][13] to retain Agent-managed delivery
- [Migrate an existing Remote Configuration setup][11] and remove the deprecated `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED` setting
- [Start the Agent before the application][18] when you use Agent Remote Configuration

The standalone provider sends experiment exposures and aggregated flag evaluation events directly to Datadog. This path uses the application `DD_API_KEY` and `DD_SITE` settings. With `dd-java-agent` attached, agentless mode prefers the Datadog Agent event proxy and can fall back to direct delivery.

The `feature_flag.evaluations` metric uses the separate OTLP setup in the [Server-Side Flag Evaluation Metrics][8] guide.

For more information on available graphing, see [Feature Flag Graphs](/feature_flags/concepts/flag_graphs/).

### Use Agent delivery

To receive flag configuration through a Datadog Agent, use `dd-openfeature` and `dd-java-agent` version 1.69.0 or later. This setup requires both the Java agent in the application JVM and a separate Datadog Agent service.

1. Configure Agent 7.55 or later with an API key, your Datadog site, and Remote Configuration enabled. See [Use Agent Remote Configuration][13].
2. Load `dd-java-agent` with the `-javaagent` JVM option and select `remote_config`:

{{< code-block lang="bash" >}}
export DD_ENV='<YOUR_ENVIRONMENT>'
export DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config

java -javaagent:/path/to/dd-java-agent.jar -jar your-application.jar
{{< /code-block >}}

For Java agent installation instructions, see [Add the Java SDK to the JVM][20]. If your runtime controls the Java command, set `-javaagent` through `JAVA_TOOL_OPTIONS`.

3. Register `com.datadog.openfeature.Provider` as shown in [Getting started](#getting-started).

Remote Configuration does not fall back to agentless delivery. To switch an existing installation, follow [Migrate an existing Remote Configuration setup][11].

### Application shutdown

Call `OpenFeatureAPI.getInstance().shutdown()` during application shutdown to stop polling and flush pending events. The provider also registers a JVM shutdown hook when it runs without the Java agent.

### Custom initialization timeout

Configure how long the provider waits for initial configuration:

{{< code-block lang="java" >}}
import com.datadog.openfeature.Provider;
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

After the provider is ready, it emits `PROVIDER_CONFIGURATION_CHANGED` for each new flag configuration that it receives.

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

## Record exposures in your own data store

Use `com.datadog.openfeature.ExposureHook` to record exposures in your own logs, data warehouse, or analytics pipeline. It calls your code after each flag evaluation with the same exposure decision that the provider uses for Datadog. To stop sending exposures to Datadog, set `DD_FEATURE_FLAGS_EXPOSURES_DATADOG_LOGGING_ENABLED=false`. See [Record Feature Flag Exposures in Your Own Data Store][19].

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

Test against a dedicated Datadog environment with `com.datadog.openfeature.Provider`, or use OpenFeature's `InMemoryProvider` to control flag values in tests. The following example uses `InMemoryProvider` for offline tests. It ships in the OpenFeature SDK dependency included with `dd-openfeature`.

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

Follow the flag data path from the **Flagging Platform** through the selected configuration source to the **Java SDK**. Agentless and Remote Configuration have different requirements. Verify the active source before you troubleshoot connectivity.

### 1. Flagging platform: Verify flag configuration

Before checking infrastructure, confirm the flag itself is set up correctly:

1. The flag is **enabled** for the target environment, not disabled. Flags are disabled by default in each environment.
2. The flag targets the **correct environment** (`DD_ENV`). Flags do not target specific services—they apply to all services within the enabled environment.
3. Your `DD_ENV` value appears in [{{< ui >}}Feature Flag Environments{{< /ui >}}][5]. If it is absent, the environment has not received any flag traffic yet.

### 2. Verify the configuration source

#### Agentless

1. Confirm that `dd-openfeature` is version 1.69.0 or later.
2. Confirm that `DD_FEATURE_FLAGS_ENABLED` is unset or set to `true`.
3. Confirm that `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless` is set, or that the source and legacy provider settings are unset.
4. Confirm that application code initializes `com.datadog.openfeature.Provider`.
5. Confirm that the application process has `DD_API_KEY` and the correct `DD_ENV`. Check `DD_SITE` for sites other than US1.
6. Confirm that the application can make outbound HTTPS requests to Datadog.
7. Enable debug logging and check for authentication, timeout, or malformed configuration messages.

#### Agent delivery

1. Confirm that `dd-openfeature` and `dd-java-agent` are version 1.69.0 or later.
2. Confirm that the JVM loads `dd-java-agent` with `-javaagent`.
3. Confirm that `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config` is set.
4. Confirm that `DD_FEATURE_FLAGS_ENABLED` is unset or set to `true`.
5. Confirm that Agent 7.55 or later is running and reachable. See [APM Connection Errors][2].
6. Confirm that Remote Configuration is enabled on the Agent. See [Remote Configuration][1].
7. Confirm that the Agent has a valid API key and the correct `DD_SITE`.
8. Run `datadog-agent status` and review the Remote Configuration section. See [Agent Commands][6].

### 3. SDK: Verify Java SDK state

#### Enable debug logging

Enable DEBUG logging for `com.datadog.openfeature` in your application logging configuration. For the default agentless source, confirm that CDN polling starts after provider initialization. Set `DD_TRACE_DEBUG=true` to also enable evaluation diagnostics.

With `remote_config`, the provider requires the Java agent connection. If the connection is unavailable, evaluations return caller defaults with `PROVIDER_NOT_READY`. Provider registration alone does not confirm configuration delivery. The provider does not fall back to agentless delivery.

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

A `PROVIDER_ERROR` or `PROVIDER_STALE` event after normal operation indicates a disruption in the selected configuration source.

#### Provider not ready

`PROVIDER_NOT_READY` is returned when flag evaluation is attempted before the provider receives its first configuration from the selected source.

Common causes:

- **Asynchronous initialization**: `setProvider()` was used instead of `setProviderAndWait()`. Evaluations before the first configuration arrives return `PROVIDER_NOT_READY`.
- **Initialization timeout**: `setProviderAndWait()` timed out (default 30 seconds) and threw `ProviderNotReadyError`, which was caught. The application continues evaluating flags while waiting for the first configuration.

If `PROVIDER_NOT_READY` persists beyond the polling and initialization intervals, verify the selected source again.

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

### 4. Flagging platform: Verify data appears in Datadog

<div class="alert alert-warning">When no supported telemetry path is configured, Java does not export exposure events or the <code>feature_flag.evaluations</code> metric. Their absence does not indicate that configuration loading or local evaluation failed.</div>

#### Flag evaluation metrics

Flag evaluation counts appear in Datadog as a `feature_flag.evaluations` counter metric tagged with the flag key, result variant, and evaluation reason. See <a href="/feature_flags/guide/server_flag_evaluation_metrics/">Set Up Server-Side Flag Evaluation Metrics</a> for the full setup guide and troubleshooting steps.

#### Experiment exposures

When the selected configuration path supports exposures, exposures appear only for flags associated with an experiment. Standard feature flags do not generate exposure events. If exposures are missing:

1. Verify the flag is associated with an experiment in the Datadog UI.
2. In standalone agentless mode, verify the application API key, site, and outbound HTTPS connectivity. If you use the Agent event proxy, verify Agent connectivity.
3. If you use Agent Remote Configuration, verify that the Agent was available when the application started. If it was not, restart the application. See [Agent availability][18].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /remote_configuration/
[2]: /tracing/troubleshooting/connection_errors/
[3]: /agent/troubleshooting/site/
[5]: https://app.datadoghq.com/feature-flags/settings/environments
[6]: /agent/configuration/agent-commands/
[7]: /account_management/api-app-keys/#api-keys
[8]: /feature_flags/guide/server_flag_evaluation_metrics/
[9]: /feature_flags/concepts/configuration_sources/
[10]: /feature_flags/concepts/configuration_sources/#use-a-custom-agentless-endpoint
[11]: /feature_flags/concepts/configuration_sources/#migrate-an-existing-remote-configuration-setup
[12]: /feature_flags/concepts/configuration_sources/#configure-agentless-delivery
[13]: /feature_flags/concepts/configuration_sources/#use-agent-remote-configuration
[14]: /getting_started/site/
[18]: /feature_flags/concepts/configuration_sources/#agent-availability
[19]: /feature_flags/guide/record_exposures_in_your_own_data_store/
[20]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/#add-the-java-sdk-to-the-jvm
