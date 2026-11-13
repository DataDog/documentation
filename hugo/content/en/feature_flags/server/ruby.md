---
title: Ruby Feature Flags
description: Set up Datadog Feature Flags for Ruby applications.
further_reading:
- link: "/feature_flags/server/"
  tag: "Documentation"
  text: "Server-Side Feature Flags"
- link: "/tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby/"
  tag: "Documentation"
  text: "Ruby Tracing"
- link: "/tracing/"
  tag: "Documentation"
  text: "Learn about Application Performance Monitoring (APM)"
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

The Datadog Ruby SDK receives flag configuration directly from Datadog by default and evaluates flags locally. It integrates with [OpenFeature][3], an open standard for feature flag management.

## Getting started

Use Ruby 3.1 or later with `datadog` 2.49.0 or later and `openfeature-sdk` 0.5.1 or later. The `datadog` gem includes the native extension required for flag evaluation. Production support is limited to [supported Linux operating systems][2]. For JRuby, use the [Java SDK](#use-the-java-sdk-on-jruby).

1. Add these dependencies to your `Gemfile`, then run `bundle install`:

   ```ruby
   gem 'datadog', '~> 2.49'
   gem 'openfeature-sdk', '>= 0.5.1'
   ```

2. Set your Datadog [API key][4] and flag environment in the application process:

   ```bash
   export DD_API_KEY='<DATADOG_API_KEY>'
   export DD_ENV='<YOUR_ENVIRONMENT>'
   ```

   If your organization uses a site other than `datadoghq.com`, also set `DD_SITE`:

   ```bash
   export DD_SITE={{< region-param key="dd_site" code="true" >}}
   ```

3. Enable a Boolean flag named `my-flag` for your environment with the **Server** distribution channel. Register the provider and evaluate the flag:

   ```ruby
   require 'datadog'
   require 'open_feature/sdk'
   require 'datadog/open_feature/provider'

   OpenFeature::SDK.set_provider_and_wait(Datadog::OpenFeature::Provider.new)
   client = OpenFeature::SDK.build_client
   enabled = client.fetch_boolean_value(flag_key: 'my-flag', default_value: false)
   ```

No Datadog Agent, APM instrumentation, enablement setting, or source setting is required. Provider registration starts configuration delivery. Installing the gem or constructing the provider alone does not start polling.

For existing Agent-based installations, follow [Migrate an existing setup](#migrate-an-existing-setup) before using these instructions.

## Initialize the provider

`set_provider_and_wait` waits for the first valid configuration. The default initialization timeout is 30 seconds. If initialization fails, the method raises `OpenFeature::SDK::ProviderInitializationError`.

Handle that exception if the application must start with caller-provided defaults. Polling continues after a temporary delivery failure, and the provider can recover when valid configuration arrives. For non-blocking initialization, use `OpenFeature::SDK.set_provider`. Evaluations return defaults until configuration is available.

To change the initialization timeout, use `config.feature_flags.initialization_timeout_ms` or `DD_EXPERIMENTAL_FLAGGING_PROVIDER_INITIALIZATION_TIMEOUT_MS`. The OpenFeature method does not accept a `timeout:` argument.

## Set the evaluation context

Define an evaluation context that identifies the user or entity for flag targeting. The evaluation context includes attributes used to determine which flag variations should be returned:

<div class="alert alert-warning">Datadog Feature Flags requires evaluation context attributes to be flat primitive values: strings, numbers, and Booleans. Do not pass nested objects or arrays; they are not supported and can cause exposure data to be dropped.</div>

```ruby
context = OpenFeature::SDK::EvaluationContext.new(
  targeting_key: 'user-123',  # Targeting key (typically user ID)
  email: 'user@example.com',
  country: 'US',
  tier: 'premium',
  age: 25
)
```

The targeting key is used for consistent traffic distribution (percentage rollouts). Additional attributes enable targeting rules, such as "enable for users in the US" or "enable for premium tier users" in the example above.

## Evaluate flags

After creating the `OpenFeature` client, you can start reading flag values throughout your app. Flag evaluation uses locally cached data, so no network requests occur when evaluating flags.

Each flag is identified by a unique string _key_. Flags are evaluated using typed methods that return values matching the expected type. The SDK returns the default value if a flag doesn't exist or cannot be evaluated.

### Boolean flags

Use `fetch_boolean_value()` for flags that represent on/off or true/false conditions:

```ruby
enabled = client.fetch_boolean_value(
  flag_key: 'new-checkout-flow',
  default_value: false,
  evaluation_context: context
)

if enabled
  show_new_checkout
else
  show_legacy_checkout
end
```

### String flags

Use `fetch_string_value()` for flags that select between multiple variants or configuration strings:

```ruby
theme = client.fetch_string_value(
  flag_key: 'ui-theme',
  default_value: 'light',
  evaluation_context: context
)

case theme
when 'dark'
  set_dark_theme
when 'light'
  set_light_theme
else
  set_light_theme
end
```

### Number flags

For numeric flags, use `fetch_integer_value()` or `fetch_float_value()`. Ruby also provides `fetch_number_value()`, which returns the appropriate type based on the default value. These methods are appropriate when a feature depends on a numeric parameter such as a limit, percentage, or multiplier:

```ruby
max_items = client.fetch_integer_value(
  flag_key: 'cart-max-items',
  default_value: 20,
  evaluation_context: context
)

discount_rate = client.fetch_float_value(
  flag_key: 'discount-rate',
  default_value: 0.0,
  evaluation_context: context
)

# Generic number method (type based on default)
batch_size = client.fetch_number_value(
  flag_key: 'batch-size',
  default_value: 100,  # Returns integer
  evaluation_context: context
)
```

### Object flags

For structured data, use `fetch_object_value()`. This method returns a hash. Use object flags when multiple configuration properties belong together.

```ruby
config = client.fetch_object_value(
  flag_key: 'feature-config',
  default_value: {
    'maxRetries' => 3,
    'timeout' => 30
  },
  evaluation_context: context
)

max_retries = config['maxRetries'] || 3
timeout = config['timeout'] || 30
```

### Flag evaluation details

When you need more than the flag value, use the `fetch_<type>_details` methods. These methods return both the evaluated value and metadata explaining the evaluation:

```ruby
details = client.fetch_boolean_details(
  flag_key: 'new-feature',
  default_value: false,
  evaluation_context: context
)

puts "Value: #{details.value}"
puts "Variant: #{details.variant}"
puts "Reason: #{details.reason}"
puts "Error Code: #{details.error_code}"
puts "Error Message: #{details.error_message}"
```

Flag details help you debug evaluation behavior and understand why a user received a given value.

## Evaluation without context

You can evaluate flags without providing an evaluation context. This is useful for global flags that don't require user-specific targeting:

```ruby
# Global feature flag - no context needed
maintenance_mode = client.fetch_boolean_value(
  flag_key: 'maintenance-mode',
  default_value: false
)

if maintenance_mode
  halt 503, { error: 'Service temporarily unavailable' }.to_json
end
```

## Advanced configuration

`DD_SERVICE` and `DD_VERSION` add service and application version information. They are optional for receiving flag configuration. The environment selects the flag configuration.

The SDK polls every 30 seconds and uses a 5-second request timeout by default. After receiving valid configuration, it retains that configuration during temporary delivery errors. See [Configuration Sources][6] for polling and custom endpoint settings.

### Send exposures and evaluation events

In agentless mode, Ruby prefers a compatible local Event Platform Proxy (EVP) relay for experiment exposures and aggregated flag evaluation events. If a compatible relay is unavailable, it sends both event types directly to Datadog. Direct delivery uses the application's `DD_API_KEY` and `DD_SITE` settings.

For serverless telemetry options, see [Send feature flag telemetry][12]. Flag evaluation metrics use a separate OpenTelemetry export path.

### Agent configuration delivery

To receive flag configuration through an Agent, select Remote Configuration explicitly:

```bash
export DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config
export DD_REMOTE_CONFIGURATION_ENABLED=true
export DD_ENV='<YOUR_ENVIRONMENT>'
```

Use Datadog Agent 7.55 or later with [Remote Configuration][1] enabled. Configure the API key on the Agent. Register the provider with the same application code from [Getting started](#getting-started).

Selecting `remote_config` enables the Feature Flags subscription when the Datadog SDK starts, even before provider registration. This source uses the Agent for configuration and event delivery.

### Migrate an existing setup

Legacy `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` or `config.open_feature.enabled = true` preserves Remote Configuration when no source is explicitly selected. A legacy value of `false` disables Feature Flags.

To migrate to agentless delivery:

1. Upgrade to `datadog` 2.49.0 or later.
2. Set `DD_API_KEY` in the application process and preserve the flag environment in `DD_ENV`.
3. Set `DD_SITE` if your organization uses a site other than `datadoghq.com`.
4. Set `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless`.
5. Remove `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED` and any `config.open_feature.enabled` assignment.
6. Restart the application and verify a known flag after provider initialization.

To keep Agent delivery, set `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config` before removing the legacy settings. To disable Feature Flags, use `DD_FEATURE_FLAGS_ENABLED=false`.

See [Migrate an existing Remote Configuration setup][7] for verification and rollback steps.

### Flag evaluation metrics

Flag evaluation metrics use a separate OpenTelemetry pipeline. Add the metrics gems to the application bundle:

```ruby
gem 'opentelemetry-metrics-sdk', '>= 0.8.0'
gem 'opentelemetry-exporter-otlp-metrics', '>= 0.4.0'
```

Set `DD_METRICS_OTEL_ENABLED=true` and configure the exporter as described in [Set Up Server-Side Flag Evaluation Metrics][5]. Enabling agentless configuration does not configure metrics export.

## Testing

You can test against a dedicated Datadog test environment with the real `Datadog::OpenFeature::Provider`, or swap it for OpenFeature's `InMemoryProvider` to control flag values directly in test code. This section shows the in-memory approach, which keeps tests hermetic and offline. `InMemoryProvider` ships with `openfeature-sdk`, so no additional gem is required.

The Ruby SDK's `InMemoryProvider` takes a plain hash of flag keys to values — variants and targeting rules are not supported. The OpenFeature provider is set on a process-global singleton, so tests that swap the provider must restore it in teardown to avoid leaking flag state across examples. An `around` hook handles setup, restoration, and exceptions cleanly in a single block.

```ruby
# spec/support/feature_flags.rb
require 'open_feature/sdk'
require 'open_feature/sdk/provider/in_memory_provider'

RSpec.configure do |config|
  config.around(:each, :feature_flags) do |example|
    original = OpenFeature::SDK::API.instance.provider
    OpenFeature::SDK.configure do |c|
      c.set_provider(OpenFeature::SDK::Provider::InMemoryProvider.new(
        'new-checkout-flow' => true,
        'ui-theme' => 'dark',
        'discount-rate' => 0.15
      ))
    end
    example.run
  ensure
    OpenFeature::SDK.configure { |c| c.set_provider(original) } if original
  end
end

# spec/checkout_spec.rb
require 'spec_helper'

RSpec.describe Checkout, :feature_flags do
  let(:client) { OpenFeature::SDK.build_client }

  it 'returns the in-memory flag value' do
    expect(client.fetch_boolean_value(flag_key: 'new-checkout-flow', default_value: false)).to be true
  end

  it 'falls back to the default for unknown flags' do
    expect(client.fetch_boolean_value(flag_key: 'does-not-exist', default_value: false)).to be false
  end
end
```

To mutate flag state during a test, call `add_flag(flag_key:, value:)` on the provider instance. The same pattern applies to Minitest — replace the `around` hook with `setup`/`teardown` methods.

## Use the Java SDK on JRuby

The Ruby SDK does not support Feature Flags on JRuby. On JRuby, the Ruby SDK writes a warning to the log and does not enable Feature Flags. Use the [Java SDK][8] instead. JRuby calls the Java SDK through its Java integration.

Use `dd-openfeature` 1.69.0 or later and the dependencies listed in [Java SDK compatibility requirements][9]. Standalone agentless delivery does not require `dd-java-agent`.

1. Get the `dd-openfeature` JAR file and its dependencies. For example, use Maven to copy them to a directory.
2. Set the API key and flag environment before starting JRuby. Set `DD_SITE` for a site other than `datadoghq.com`.
3. Load the JAR files in your application with `require` and register the provider.

```shell
export DD_API_KEY='<DATADOG_API_KEY>'
export DD_ENV='<YOUR_ENVIRONMENT>'

jruby app.rb
```

```ruby
require 'java'

# Load the Datadog provider, the OpenFeature SDK, and their dependencies
Dir['/path/to/jars/*.jar'].each { |jar| require jar }

java_import 'dev.openfeature.sdk.OpenFeatureAPI'
java_import 'dev.openfeature.sdk.MutableContext'
java_import 'com.datadog.openfeature.Provider'

# Set the provider. Wait for the first flag configuration.
api = OpenFeatureAPI.getInstance
api.setProviderAndWait(Provider.new)
client = api.getClient('my-app')

context = MutableContext.new('user-123')
context.add('tier', 'premium')

enabled = client.getBooleanValue('checkout.new', false, context)
```

For Agent Remote Configuration, set `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config` and load a compatible `dd-java-agent` with the JVM option `-javaagent`. For example, run `jruby -J-javaagent:/path/to/dd-java-agent.jar app.rb`. See [Java SDK configuration][8] for the Agent requirements.

For provider events, error handling, and the evaluation methods, see the [Java SDK][8] page. JRuby uses the same classes and methods.

## Troubleshooting

If the application runs on JRuby, use the Java SDK. See [Use the Java SDK on JRuby][10].

### Agentless configuration not working

- Verify that `datadog` 2.49.0 or later is installed and the application registers the Datadog OpenFeature provider.
- Check `DD_API_KEY` and `DD_ENV` in the application process. Check `DD_SITE` if your organization uses a site other than `datadoghq.com`.
- Confirm `DD_FEATURE_FLAGS_ENABLED` is not `false`.
- Leave `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE` unset for a new setup, or set it to `agentless`. Remove legacy enablement settings when migrating.
- Allow outbound HTTPS to `ufc-server.ff-cdn.<DD_SITE>`.
- Enable `DD_TRACE_DEBUG=true` and check tracer logs for authentication, timeout, or configuration errors.

Before the first valid configuration, evaluations return caller-provided defaults. After successful initialization, temporary delivery errors retain the last valid configuration.

### Remote configuration connection issues

- Confirm that `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE` is set to `remote_config`.
- Verify that Remote Configuration is enabled in the Agent and the Ruby tracer.
- Verify that the Datadog Agent was available when the application started. If problems continue after the Agent becomes available, restart the application. See [Agent availability][11].
- Check the API key on the Agent and `DD_ENV` in the application.
- Confirm that the application can reach the Agent. Enable `DD_TRACE_DEBUG=true` and check the tracer logs for Remote Configuration errors.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/remote_config/
[2]: /tracing/trace_collection/compatibility/ruby/#supported-operating-systems
[3]: https://openfeature.dev/
[4]: /account_management/api-app-keys/#api-keys
[5]: /feature_flags/guide/server_flag_evaluation_metrics/
[6]: /feature_flags/concepts/configuration_sources/
[7]: /feature_flags/concepts/configuration_sources/#migrate-an-existing-remote-configuration-setup
[8]: /feature_flags/server/java/
[9]: /feature_flags/server/java/#getting-started
[10]: #use-the-java-sdk-on-jruby
[11]: /feature_flags/concepts/configuration_sources/#agent-availability
[12]: /feature_flags/implementation_patterns/serverless/#send-feature-flag-telemetry
