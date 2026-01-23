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
---

{{< callout url="http://datadoghq.com/product-preview/feature-flags/" >}}
Feature Flags are in Preview. Complete the form to request access.
{{< /callout >}}

## Overview

This page describes how to instrument your Ruby application with the Datadog Feature Flags SDK.

## Prerequisites

Before setting up the Ruby Feature Flags SDK, ensure you have:

- **Datadog Agent** with [Remote Configuration][1] enabled
- **Datadog Ruby tracer** `datadog` version 2.23.0 or later
- **OpenFeature Ruby SDK** `openfeature-sdk` version 0.4.1 or later
- **Service and environment configured** - Feature flags are targeted by service and environment
- **Supported operating system** - Feature flags are only [supported on Linux operating systems][2]. Windows and macOS are not natively supported, but Dockerized Linux environments running on those operating systems are.


## Installing and initializing

Feature Flagging is provided by Application Performance Monitoring (APM). To integrate APM into your application with feature flagging support, install the required gems and configure Remote Configuration with OpenFeature support.

```shell
gem install ddtrace openfeature-sdk
```

```ruby
require 'datadog'
require 'open_feature/sdk'
require 'datadog/open_feature/provider'

# Configure Datadog with feature flagging enabled
Datadog.configure do |config|
  config.remote.enabled = true
  config.open_feature.enabled = true
end

# Configure OpenFeature SDK with Datadog provider
OpenFeature::SDK.configure do |config|
  config.set_provider(Datadog::OpenFeature::Provider.new)
end

# Create OpenFeature client
client = OpenFeature::SDK.build_client
```

The client returns default values until Remote Configuration loads in the background. This approach keeps your application responsive during startup but may serve defaults for early requests.

## Set the evaluation context

Define an evaluation context that identifies the user or entity for flag targeting. The evaluation context includes attributes used to determine which flag variations should be returned:

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

For structured data, use `fetch_object_value()`. This method returns a hash. Object flags are useful for Remote Configuration scenarios where multiple properties need to be provided together.

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

## Troubleshooting

### Feature flags always return default values

If feature flags unexpectedly always return default values, check the following:

- Verify Remote Configuration is enabled in your Datadog Agent configuration
- Ensure the service and environment are configured (either through `DD_SERVICE` and `DD_ENV` environment variables or `config.service` and `config.env` in Ruby)
- Check that `config.remote.enabled = true` and `config.open_feature.enabled = true` are set in your Ruby application's Datadog configuration
- Verify the `datadog` gem version includes OpenFeature support (2.23.0 or later)

### Remote Configuration connection issues

Check the Datadog tracer logs for Remote Configuration status:

```ruby
# Enable startup and debug logging
Datadog.configure do |config|
  config.diagnostics.startup_logs.enabled = true
  config.diagnostics.debug = true
  config.remote.enabled = true
  config.open_feature.enabled = true
end
```

Look for messages about:
- Remote Configuration worker starting
- Feature flags configuration being received
- OpenFeature component initialization

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/remote_config/
[2]: /tracing/trace_collection/compatibility/ruby/#supported-operating-systems
