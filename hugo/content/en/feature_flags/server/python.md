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

The Datadog Python SDK receives flag configuration directly from Datadog by default and evaluates flags locally. No Datadog Agent or tracing instrumentation is required. The provider implements [OpenFeature][1].

## Getting started

Use `ddtrace` 4.17.0 or later and `openfeature-sdk` 0.10.0 or later. Create a Boolean flag named `my-flag`. Enable its **Server** distribution channel and enable it in the target environment.

Install the SDKs:

```bash
pip install 'ddtrace>=4.17.0' 'openfeature-sdk>=0.10.0'
```

Set the application API key and flag environment before startup:

```bash
export DD_API_KEY='<DATADOG_API_KEY>'
export DD_ENV='<YOUR_ENVIRONMENT>'
```

Set `DD_SITE` if the organization uses a site other than `datadoghq.com`. For the selected site, use {{< region-param key="dd_site" code="true" >}}.

Register the provider and evaluate the flag:

```python
from ddtrace.openfeature import DataDogProvider
from openfeature import api

api.set_provider_and_wait(DataDogProvider())
client = api.get_client()
enabled = client.get_boolean_value("my-flag", False)
print(enabled)
```

Provider initialization starts configuration polling. No `ddtrace-run`, tracing setup, Feature Flags enablement, or source setting is required for a new setup. For an existing Agent setup, follow [Migrate an existing Remote Configuration setup][8].

## Initialization options

`set_provider_and_wait` waits for initial configuration, with a default provider timeout of 10 seconds. Handle initialization errors if the application must continue with default values. Use `api.set_provider(DataDogProvider())` for background initialization.

## Set the evaluation context

Define an evaluation context that identifies the user or entity for flag targeting. The evaluation context includes attributes used to determine which flag variations should be returned:

<div class="alert alert-warning">Datadog Feature Flags requires evaluation context attributes to be flat primitive values: strings, numbers, and Booleans. Do not pass nested objects or arrays; they are not supported and can cause exposure data to be dropped.</div>

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

Blocking registration waits up to 10 seconds for the first configuration and raises an error if the wait expires. Background registration returns before initialization completes. The provider can recover when configuration arrives later. Use an event handler to observe readiness after background registration:

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

# Wait for background initialization to complete
if ready_event.wait(timeout=30):
    print("Provider is ready")
else:
    print("Provider initialization timed out")

# Create client and evaluate flags
client = api.get_client()
{{< /code-block >}}

The provider continues polling after an initialization timeout. Evaluations return caller-provided defaults until valid configuration arrives.

Set `DD_EXPERIMENTAL_FLAGGING_PROVIDER_INITIALIZATION_TIMEOUT_MS` to a positive number of milliseconds to change the initialization timeout.

## Advanced configuration

Use [Server SDK Configuration Sources][6] as the canonical reference for source selection and operational settings:

- [Configure agentless delivery][10], including polling, request timeout, and endpoint settings
- [Use a custom agentless endpoint][7] for advanced testing, local development, or an operator-managed proxy
- [Use Agent Remote Configuration][9] to retain Agent-managed delivery
- [Migrate an existing Remote Configuration setup][8] and remove the deprecated `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED` setting

In agentless mode, Python sends experiment exposures and aggregated flag evaluation events through a compatible local relay when available. Otherwise, it uses direct HTTPS intake with the application API key. [`serverless-init`][11] is an optional relay. Python emits EVP flag evaluation events by default. Set `DD_FLAGGING_EVALUATION_COUNTS_ENABLED=false` to disable this event path. This setting does not disable the separate `feature_flag.evaluations` OTLP metric.

## Cleanup

When your application exits, shut down the OpenFeature API to clean up resources:

{{< code-block lang="python" >}}
api.shutdown()
{{< /code-block >}}

## Testing

You can test against a dedicated Datadog test environment with the real Datadog provider, or swap it for OpenFeature's `InMemoryProvider` to control flag values directly in test code. This section shows the in-memory approach, which keeps tests hermetic and offline. `InMemoryProvider` is bundled with `openfeature-sdk`, so no additional dependency is required.

The OpenFeature API is a global singleton (`openfeature.api.set_provider` mutates module-level state). Use a `function`-scoped pytest fixture and call `api.shutdown()` in teardown so tests do not leak flag state into each other.

{{< code-block lang="python" filename="test_flags.py" >}}
import pytest
from openfeature import api
from openfeature.evaluation_context import EvaluationContext
from openfeature.provider.in_memory_provider import InMemoryProvider, InMemoryFlag

@pytest.fixture
def client():
    flags = {
        "new-checkout-flow": InMemoryFlag(
            default_variant="off",
            variants={"on": True, "off": False},
        ),
        "ui-theme": InMemoryFlag(
            default_variant="light",
            variants={"light": "light", "dark": "dark"},
        ),
    }
    api.set_provider_and_wait(InMemoryProvider(flags))
    yield api.get_client()
    api.shutdown()

def test_boolean_flag_returns_default_variant(client):
    assert client.get_boolean_value("new-checkout-flow", True) is False

def test_string_flag_with_context(client):
    ctx = EvaluationContext(targeting_key="user-123")
    assert client.get_string_value("ui-theme", "dark", ctx) == "light"

def test_missing_flag_returns_default(client):
    assert client.get_boolean_value("does-not-exist", True) is True
{{< /code-block >}}

`InMemoryFlag` takes `default_variant` (a string variant name) and `variants` (a dict mapping variant names to typed values). Passing a value as `default_variant` instead of a variant name is a common mistake. For targeting logic, pass a `context_evaluator` callback that receives the flag and an `EvaluationContext` and returns a `FlagResolutionDetails` object carrying the chosen variant.

## Troubleshooting

### Agentless configuration not working

Verify the following:

- `ddtrace` is version 4.17.0 or later and `openfeature-sdk` is version 0.10.0 or later.
- `DD_FEATURE_FLAGS_ENABLED` is unset or set to `true`.
- `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE` is unset or set to `agentless`.
- `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED` is unset. Setting it to `true` selects Agent Remote Configuration during the migration window when no explicit source is set.
- Application code registers `DataDogProvider` with the OpenFeature API.
- `DD_API_KEY` and `DD_ENV` are configured in the application process.
- `DD_SITE` matches the organization's site. Its default is `datadoghq.com`.
- The application can make outbound HTTPS requests to Datadog.

Set `DD_TRACE_DEBUG=true` and check for authentication, timeout, or malformed-payload messages from the Feature Flags agentless endpoint.

### Agent delivery not working

Verify the following:

- `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config` is set. During the migration window, `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` also selects Remote Configuration when no explicit source is set.
- Datadog Agent is version 7.55 or later.
- [Remote Configuration][2] is enabled on the Agent.
- The Agent has a valid API key for the target organization.
- `DD_SERVICE` and `DD_ENV` are configured in the application process.
- The SDK can communicate with the Agent.
- The Agent was available when the application started. If problems continue after the Agent becomes available, restart the application. See [Agent availability][12].

[1]: https://openfeature.dev/
[2]: /agent/remote_config/
[3]: /account_management/api-app-keys/#api-keys
[4]: /feature_flags/guide/server_flag_evaluation_metrics/
[5]: /feature_flags/concepts/flag_graphs/
[6]: /feature_flags/concepts/configuration_sources/
[7]: /feature_flags/concepts/configuration_sources/#use-a-custom-agentless-endpoint
[8]: /feature_flags/concepts/configuration_sources/#migrate-an-existing-remote-configuration-setup
[9]: /feature_flags/concepts/configuration_sources/#use-agent-remote-configuration
[10]: /feature_flags/concepts/configuration_sources/#configure-agentless-delivery
[11]: /feature_flags/implementation_patterns/serverless/#send-feature-flag-telemetry
[12]: /feature_flags/concepts/configuration_sources/#agent-availability

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
