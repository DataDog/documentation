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
---

{{< callout url="http://datadoghq.com/product-preview/feature-flags/" >}}
Feature Flags are in Preview. Complete the form to request access.
{{< /callout >}}

<div class="alert alert-warning">Java Feature Flags support is experimental and requires enabling an experimental flag in the tracer. See the <a href="#configuration">Configuration section</a> for details.</div>

## Overview

This page describes how to instrument a Java application with the Datadog Feature Flags SDK. Datadog feature flags provide a unified way to remotely control feature availability in your app, experiment safely, and deliver new experiences with confidence.

The Java SDK integrates feature flags directly into the Datadog APM tracer and implements the [OpenFeature](https://openfeature.dev/) standard for maximum flexibility and compatibility.

<div class="alert alert-info">If you're using Datadog APM and your application already has the Datadog Java tracer and Remote Configuration enabled, skip to <a href="#initialize-the-openfeature-provider">Initialize the OpenFeature provider</a>. You only need to add the OpenFeature dependencies and initialize the provider.</div>

## Compatibility requirements

The Datadog Feature Flags SDK for Java requires:
- **Java 11 or higher**
- **Datadog Java APM Tracer**: Version **1.57.0** or later
- **OpenFeature SDK**: Version **1.18.2** or later
- **Datadog Agent**: Version **7.x or later** with Remote Configuration enabled
- **Datadog API Key**: Required for Remote Configuration

For a full list of Datadog's Java version and framework support, read [Compatibility Requirements](/tracing/trace_collection/compatibility/java/).

## Getting started

Before you begin, make sure you've already [installed and configured the Agent](/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/#install-and-configure-the-agent).

## Installation

Feature flagging is integrated into the Datadog Java APM tracer. You need the tracer JAR and the OpenFeature SDK dependencies.

The `dd-java-agent-feature-flagging-bootstrap` JAR contains shared interfaces that enable the Datadog tracer (running in the bootstrap classloader) to communicate with the OpenFeature provider (running in the application classloader). This is a standard pattern for Java agents. Both JARs are required for feature flags to work.

{{< tabs >}}
{{% tab "Gradle (Groovy)" %}}
Add the following dependencies to your `build.gradle`:

{{< code-block lang="groovy" filename="build.gradle" >}}
dependencies {
    // Datadog Java tracer (includes feature flagging)
    implementation 'com.datadoghq:dd-trace-api:X.X.X'

    // OpenFeature SDK for flag evaluation
    implementation 'dev.openfeature:sdk:1.18.2'

    // Datadog OpenFeature Provider
    implementation 'com.datadoghq:dd-openfeature:X.X.X'

    // Datadog Feature Flagging Bootstrap (required)
    implementation 'com.datadoghq:dd-java-agent-feature-flagging-bootstrap:X.X.X'
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Gradle (Kotlin)" %}}
Add the following dependencies to your `build.gradle.kts`:

{{< code-block lang="kotlin" filename="build.gradle.kts" >}}
dependencies {
    // Datadog Java tracer (includes feature flagging)
    implementation("com.datadoghq:dd-trace-api:X.X.X")

    // OpenFeature SDK for flag evaluation
    implementation("dev.openfeature:sdk:1.18.2")

    // Datadog OpenFeature Provider
    implementation("com.datadoghq:dd-openfeature:X.X.X")

    // Datadog Feature Flagging Bootstrap (required)
    implementation("com.datadoghq:dd-java-agent-feature-flagging-bootstrap:X.X.X")
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Maven" %}}
Add the following dependencies to your `pom.xml`:

{{< code-block lang="xml" filename="pom.xml" >}}
<dependencies>
    <!-- Datadog Java tracer (includes feature flagging) -->
    <dependency>
        <groupId>com.datadoghq</groupId>
        <artifactId>dd-trace-api</artifactId>
        <version>X.X.X</version>
    </dependency>

    <!-- OpenFeature SDK for flag evaluation -->
    <dependency>
        <groupId>dev.openfeature</groupId>
        <artifactId>sdk</artifactId>
        <version>1.18.2</version>
    </dependency>

    <!-- Datadog OpenFeature Provider -->
    <dependency>
        <groupId>com.datadoghq</groupId>
        <artifactId>dd-openfeature</artifactId>
        <version>X.X.X</version>
    </dependency>

    <!-- Datadog Feature Flagging Bootstrap (required) -->
    <dependency>
        <groupId>com.datadoghq</groupId>
        <artifactId>dd-java-agent-feature-flagging-bootstrap</artifactId>
        <version>X.X.X</version>
    </dependency>
</dependencies>
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## Configuration

If your Datadog Agent already has Remote Configuration enabled for other features (like Dynamic Instrumentation or Application Security), you can skip the Agent configuration and go directly to [Application configuration](#application-configuration).

### Agent configuration

Configure your Datadog Agent to enable Remote Configuration:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
# Enable Remote Configuration
remote_configuration:
  enabled: true

# Set your API key
api_key: <YOUR_API_KEY>
{{< /code-block >}}

### Application configuration

If your application already runs with `-javaagent:dd-java-agent.jar` and has Remote Configuration enabled (`DD_REMOTE_CONFIG_ENABLED=true`), you only need to add the experimental feature flag (`DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true`). Skip the tracer download and JVM configuration steps.

Configure your Java application with the required environment variables or system properties:

{{< tabs >}}
{{% tab "Environment Variables" %}}
{{< code-block lang="bash" >}}
# Required: Enable Remote Configuration in the tracer
export DD_REMOTE_CONFIG_ENABLED=true

# Required: Enable experimental feature flagging support
export DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true

# Required: Your Datadog API key
export DD_API_KEY=<YOUR_API_KEY>

# Required: Service name
export DD_SERVICE=<YOUR_SERVICE_NAME>

# Required: Environment (e.g., prod, staging, dev)
export DD_ENV=<YOUR_ENVIRONMENT>

# Optional: Version
export DD_VERSION=<YOUR_APP_VERSION>

# Start your application with the tracer
java -javaagent:path/to/dd-java-agent.jar -jar your-application.jar
{{< /code-block >}}
{{% /tab %}}

{{% tab "System Properties" %}}
{{< code-block lang="bash" >}}
java -javaagent:path/to/dd-java-agent.jar \
  -Ddd.remote.config.enabled=true \
  -Ddd.experimental.flagging.provider.enabled=true \
  -Ddd.api.key=<YOUR_API_KEY> \
  -Ddd.service=<YOUR_SERVICE_NAME> \
  -Ddd.env=<YOUR_ENVIRONMENT> \
  -Ddd.version=<YOUR_APP_VERSION> \
  -jar your-application.jar
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

The Datadog feature flagging system starts automatically when the tracer is initialized with both Remote Configuration and the experimental flagging provider enabled. No additional initialization code is required in your application.

<div class="alert alert-danger">Feature flagging requires both <code>DD_REMOTE_CONFIG_ENABLED=true</code> and <code>DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true</code>. Without the experimental flag, the feature flagging system does not start and the <code>Provider</code> returns the programmatic default.</div>

### Add the Java tracer to the JVM

For instructions on how to add the `-javaagent` argument to your application server or framework, see [Add the Java Tracer to the JVM](/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/#add-the-java-tracer-to-the-jvm).

Make sure to include the feature flagging configuration flags:
- `-Ddd.remote.config.enabled=true`
- `-Ddd.experimental.flagging.provider.enabled=true`

## Initialize the OpenFeature provider

Initialize the Datadog OpenFeature provider in your application startup code. The provider connects to the feature flagging system running in the Datadog tracer.

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
            // Optional: Handle gracefully - app will use default flag values
            logger.warn("Provider not ready (no tracer/configuration available), continuing with defaults", e);
            client = api.getClient("my-app");
            logger.info("App will use default flag values until provider is ready");
        }

        // Your application code here
    }
}
{{< /code-block >}}

Use `setProviderAndWait()` to block until the initial flag configuration is received from Remote Configuration. This ensures flags are ready before the application starts serving traffic. The default timeout is 30 seconds.

`ProviderNotReadyError` is an OpenFeature SDK exception thrown when the provider times out during initialization. Catching it allows the application to start with default flag values if Remote Configuration is unavailable. If not caught, the exception propagates and may prevent application startup. Handle this based on your availability requirements.

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

Listen for configuration updates from Remote Configuration:

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
Initialize the OpenFeature provider as early as possible in your application lifecycle (for example, in `main()` or application startup). This ensures flags are ready before business logic executes.

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

## Troubleshooting

### Provider not ready

**Problem**: `PROVIDER_NOT_READY` errors when evaluating flags

**Common Causes**:
1. **Experimental flag not enabled**: Feature flagging is disabled by default
2. **Agent not ready**: Application started before Agent was fully initialized
3. **No flags configured**: No flags published to your service/environment combination
4. **Agent Remote Configuration disabled**: Agent not configured for Remote Configuration

**Solutions**:
1. **Enable experimental feature**:
   ```bash
   export DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
   ```
2. **Verify feature flagging system started** in application logs:
   ```
   [dd.trace] Feature Flagging system starting
   [dd.trace] Feature Flagging system started
   ```
3. **Ensure Agent is ready** before app starts (use health checks in Docker/Kubernetes)
4. **Check EVP Proxy discovered** in logs:
   ```
   discovered ... evpProxyEndpoint=evp_proxy/v4/ configEndpoint=v0.7/config
   ```
5. **Wait for Remote Configuration sync** (can take 30-60 seconds after publishing flags)
6. **Verify flags are published** in Datadog UI to the correct service and environment

### ClassNotFoundException or NoClassDefFoundError

**Problem**: Application fails to start with `ClassNotFoundException` for Datadog classes like `datadog.trace.api.featureflag.FeatureFlaggingGateway`

**Cause**: Missing the bootstrap JAR dependency. The bootstrap module contains shared interfaces that allow the Datadog tracer (running in the bootstrap classloader) to communicate with the OpenFeature provider (running in the application classloader). Without it, the two components cannot interact.

**Solutions**:
1. **Add the bootstrap JAR** to your dependencies:
   ```xml
   <dependency>
       <groupId>com.datadoghq</groupId>
       <artifactId>dd-java-agent-feature-flagging-bootstrap</artifactId>
       <version>X.X.X</version>
   </dependency>
   ```
2. **Verify both dependencies are included** in your build:
   - `dd-openfeature` (the OpenFeature provider)
   - `dd-java-agent-feature-flagging-bootstrap` (the bootstrap module)
3. **Check the classpath** includes both JARs in your runtime configuration

### Feature flagging system not starting

**Problem**: No "Feature Flagging system starting" messages in logs

**Cause**: Experimental flag not enabled in tracer

**Solution**:
Add `-Ddd.experimental.flagging.provider.enabled=true` to your Java command or set `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true`

### EVP proxy not available error

**Problem**: Logs show "EVP Proxy not available" or "agent does not support EVP proxy"

**Cause**: Application started before Agent was fully initialized

**Solutions**:
1. **Add Agent health check** in orchestration (Docker Compose, Kubernetes)
2. **Add startup delay** to application
3. **Retry logic**: Implement retry on provider initialization failure
4. **Upgrade Agent**: Ensure using Agent 7.x or later with EVP Proxy support

### Flags not updating

**Problem**: Flag configuration changes aren't reflected in the application

**Solutions**:
1. Check Remote Configuration is enabled on both Agent and application
2. Verify Agent can connect to Datadog backend
3. Check application logs for "No configuration changes" or "Configuration received"
4. Ensure flags are published (not saved as drafts) in the Datadog UI
5. Verify service and environment tags match between app and flag targeting

### Type mismatch errors

**Problem**: `TYPE_MISMATCH` errors when evaluating flags

**Solutions**:
1. Verify the flag type in Datadog UI matches the evaluation method
2. Use correct method: `getBooleanValue()`, `getStringValue()`, `getIntegerValue()`, `getDoubleValue()`
3. Check flag configuration for correct value types

### No exposures in Datadog

**Problem**: Flag evaluations aren't appearing in Datadog UI

**Solutions**:
1. Verify the flag's allocation has `doLog=true` configured
2. Check Datadog Agent is receiving exposure events
3. Verify `DD_API_KEY` is correct
4. Check Agent logs for exposure upload errors

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
