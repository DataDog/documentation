---
title: Python Feature Flags
description: Set up Datadog Feature Flags for Python applications.
further_reading:
- link: "/feature_flags/server/"
  tag: "Documentation"
  text: "Server-Side Feature Flags"
- link: "/tracing/trace_collection/dd_libraries/python/"
  tag: "Documentation"
  text: "Python Tracing"
---

## Overview

This page describes how to instrument your Python application with the Datadog Feature Flags SDK. The Python SDK integrates with [OpenFeature][1], an open standard for feature flag management, and uses the Datadog tracer's Remote Configuration to receive flag updates in real time.

This guide explains how to install and enable the SDK, create an OpenFeature client, and evaluate feature flags in your application.

## Prerequisites

Before setting up the Python Feature Flags SDK, ensure you have:

- **Datadog Agent** with [Remote Configuration][2] enabled
- **Datadog Python tracer** `ddtrace` version 3.19.0 or later
- **OpenFeature Python SDK** `openfeature-sdk` version 0.5.0 or later

Set the following environment variables:

{{< code-block lang="bash" >}}
# Required: Enable the feature flags provider
export DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true

# Required: Service identification
export DD_SERVICE=<YOUR_SERVICE_NAME>
export DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

## Installation

Install the Datadog Python tracer and OpenFeature SDK:

{{< code-block lang="bash" >}}
pip install ddtrace openfeature-sdk
{{< /code-block >}}

Or add them to your `requirements.txt`:

{{< code-block lang="text" filename="requirements.txt" >}}
ddtrace>=3.19.0
openfeature-sdk>=0.5.0
{{< /code-block >}}

## Initialize the SDK

Register the Datadog OpenFeature provider with the OpenFeature API. The provider connects to the Datadog tracer's Remote Configuration system to receive flag configurations.

{{< code-block lang="python" >}}
from openfeature import api
from ddtrace.openfeature import DataDogProvider

# Create and register the Datadog provider
provider = DataDogProvider()
api.set_provider(provider)

# Create an OpenFeature client
client = api.get_client()

# Your application code here
{{< /code-block >}}

## Set the evaluation context

Define an evaluation context that identifies the user or entity for flag targeting. The evaluation context includes attributes used to determine which flag variations should be returned:

{{< code-block lang="python" >}}
from openfeature.evaluation_context import EvaluationContext

eval_ctx = EvaluationContext(
    targeting_key="user-123",  # Targeting key (typically user ID)
    attributes={
        "email": "user@example.com",
        "country": "US",
        "tier": "premium",
        "age": 25
    }
)
{{< /code-block >}}

The targeting key is used for consistent traffic distribution (percentage rollouts). Additional attributes enable targeting rules, such as "enable for users in the US" or "enable for premium tier users" in the example above.

## Evaluate flags

After setting up the provider and creating a client, you can evaluate flags throughout your application. Flag evaluation is local and fast—the SDK uses locally cached configuration data, so no network requests occur during evaluation.

Each flag is identified by a key (a unique string) and can be evaluated with a typed method that returns a value of the expected type. If the flag doesn't exist or cannot be evaluated, the SDK returns the provided default value.

### Boolean flags

Use `get_boolean_value` for flags that represent on/off or true/false conditions:

{{< code-block lang="python" >}}
enabled = client.get_boolean_value("new-checkout-flow", False, eval_ctx)

if enabled:
    show_new_checkout()
else:
    show_legacy_checkout()
{{< /code-block >}}

### String flags

Use `get_string_value` for flags that select between multiple variants or configuration strings:

{{< code-block lang="python" >}}
theme = client.get_string_value("ui-theme", "light", eval_ctx)

if theme == "dark":
    set_dark_theme()
elif theme == "light":
    set_light_theme()
else:
    set_light_theme()
{{< /code-block >}}

### Numeric flags

For numeric flags, use `get_integer_value` or `get_float_value`. These are appropriate when a feature depends on a numeric parameter such as a limit, percentage, or multiplier:

{{< code-block lang="python" >}}
max_items = client.get_integer_value("cart-max-items", 20, eval_ctx)

discount_rate = client.get_float_value("discount-rate", 0.0, eval_ctx)
{{< /code-block >}}

### Object flags

For structured data, use `get_object_value`. This returns a dictionary with complex configuration:

{{< code-block lang="python" >}}
config = client.get_object_value("feature-config", {
    "maxRetries": 3,
    "timeout": 30
}, eval_ctx)

max_retries = config.get("maxRetries", 3)
timeout = config.get("timeout", 30)
{{< /code-block >}}

### Flag evaluation details

When you need more than just the flag value, use the `*_details` methods. These return both the evaluated value and metadata explaining the evaluation:

{{< code-block lang="python" >}}
details = client.get_boolean_details("new-feature", False, eval_ctx)

print(f"Value: {details.value}")
print(f"Variant: {details.variant}")
print(f"Reason: {details.reason}")
print(f"Error Code: {details.error_code}")
print(f"Error Message: {details.error_message}")
{{< /code-block >}}

Flag details help you debug evaluation behavior and understand why a user received a given value.

### Evaluation without context

You can evaluate flags without providing an evaluation context. This is useful for global flags that don't require user-specific targeting:

{{< code-block lang="python" >}}
# Global feature flag - no context needed
maintenance_mode = client.get_boolean_value("maintenance-mode", False)

if maintenance_mode:
    return "Service temporarily unavailable"
{{< /code-block >}}

## Waiting for provider initialization

By default, the provider initializes asynchronously and flag evaluations return default values until the first Remote Configuration payload is received. If your application requires flags to be ready before handling requests, you can wait for the provider to initialize using event handlers:

{{< code-block lang="python" >}}
import threading
from openfeature import api
from openfeature.event import ProviderEvent
from ddtrace.openfeature import DataDogProvider

# Create an event to wait for readiness
ready_event = threading.Event()

def on_ready(event_details):
    ready_event.set()

# Register event handler
api.add_handler(ProviderEvent.PROVIDER_READY, on_ready)

# Set provider
provider = DataDogProvider()
api.set_provider(provider)

# Wait for provider to be ready (with optional timeout)
if ready_event.wait(timeout=30):
    print("Provider is ready")
else:
    print("Provider initialization timed out")

# Create client and evaluate flags
client = api.get_client()
{{< /code-block >}}

<div class="alert alert-info">Waiting for provider initialization requires OpenFeature SDK 0.7.0 or later. Most applications don't need to wait for initialization, as flag evaluations work immediately with default values.</div>

## Cleanup

When your application exits, shut down the OpenFeature API to clean up resources:

{{< code-block lang="python" >}}
api.shutdown()
{{< /code-block >}}

## Troubleshooting

### Provider not enabled

If you receive warnings about the provider not being enabled, ensure `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` is set in your environment:

{{< code-block lang="bash" >}}
export DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
{{< /code-block >}}

### Remote Configuration not working

Verify the following to ensure that Remote Configuration is working:
- Datadog Agent is version 7.55 or later
- Remote Configuration is enabled on the Agent
- `DD_SERVICE` and `DD_ENV` environment variables are set
- The tracer can communicate with the Agent

[1]: https://openfeature.dev/
[2]: /agent/remote_config/

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
