---
title: Server SDK Configuration Sources
description: Understand how Datadog Feature Flags server SDKs receive flag configuration.
further_reading:
- link: "/feature_flags/server/"
  tag: "Documentation"
  text: "Set up Server-Side Feature Flags"
- link: "/feature_flags/implementation_patterns/serverless/"
  tag: "Documentation"
  text: "Use Feature Flags in serverless environments"
- link: "/remote_configuration/"
  tag: "Documentation"
  text: "Learn about Remote Configuration"
---

Datadog Feature Flags server SDKs evaluate flags locally from Universal Flag Configuration (UFC). The _configuration source_ determines how the SDK receives UFC; it does not change OpenFeature evaluation semantics.

## Configuration source modes

| Mode | Configuration delivery | Activation | Agent requirement |
|---|---|---|---|
| `agentless` (default) | The SDK periodically fetches UFC from the Datadog-managed CDN over HTTPS. | Polling begins when application code initializes or accesses the Datadog OpenFeature provider. | No Datadog Agent is required for flag configuration. |
| `remote_config` | The Datadog Agent receives UFC through Remote Configuration and delivers it to the SDK. | Setting `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config` enables the Feature Flags Remote Configuration subscription. | Requires an Agent with Remote Configuration enabled. |

Agentless delivery is available in these SDK versions:

| SDK | Minimum version |
|---|---|
| Java (`dd-java-agent` and `dd-openfeature`) | 1.65.0 |
| Node.js `dd-trace` v5 | 5.116.0 |
| Node.js `dd-trace` v6 | 6.5.0 |

Earlier Java and Node.js releases continue to use Agent Remote Configuration. Upgrade the language-specific dependencies to the listed minimums before using agentless delivery.

<div class="alert alert-warning">The initial agentless releases support configuration delivery and local flag evaluation. They do not provide agentless delivery for exposure events or aggregate <code>flagevaluation</code> events. No-Agent deployments do not send those events.</div>

## Activation and billing

Server Feature Flags billing is based on configuration requests made through Remote Configuration or the CDN. Installing the tracer does not activate either delivery path by itself.

- The default source is `agentless`, but CDN polling starts only when application code initializes or accesses the Datadog OpenFeature provider.
- Explicitly selecting `remote_config` starts the existing Agent `FFE_FLAGS` subscription. It does not require application code to initialize the provider.
- `DD_FEATURE_FLAGGING_PROVIDER_ENABLED` defaults to `true`. This setting allows the provider to operate, but setting it to `true` does not activate a delivery path by itself.
- Set `DD_FEATURE_FLAGGING_PROVIDER_ENABLED=false` to disable the provider, CDN polling, and the Feature Flags Remote Configuration subscription.

The SDK resolves these settings once during initialization. You cannot change configuration sources without restarting the application.

### Configuration precedence

| Configuration | Result |
|---|---|
| `DD_FEATURE_FLAGGING_PROVIDER_ENABLED=false` | Disables the provider and both delivery paths, regardless of other settings. |
| Explicit `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless` | Selects CDN delivery. Polling begins when application code initializes or accesses the provider. |
| Explicit `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config` | Selects Agent delivery and enables the Feature Flags Remote Configuration subscription. |
| No source and `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` | Preserves Remote Configuration during the migration window. |
| No source and `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=false` | Keeps the provider and both delivery paths disabled. |
| Neither setting is present | Selects agentless delivery. Polling begins when application code initializes or accesses the provider. |

## Agentless delivery

Agentless mode is the default in SDK versions that support it. You do not need to set `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE` unless you want to make the selection explicit.

Configure the application process with:

{{< code-block lang="bash" >}}
# Required for agentless configuration delivery
DD_API_KEY=<DATADOG_API_KEY>
DD_ENV=<YOUR_ENVIRONMENT>

# Optional: Defaults to datadoghq.com
DD_SITE=<DATADOG_SITE>

# Optional: Agentless is the default
DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless
{{< /code-block >}}

Initialize or access the Datadog OpenFeature provider in application code to start polling. Tracer installation and tracer initialization alone do not create Feature Flags CDN traffic.

<div class="alert alert-info">For a new agentless setup, do not set <code>DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true</code>. During the migration window, that legacy setting selects Remote Configuration when no explicit source is set.</div>

The SDK fetches configuration in the background and evaluates flags locally. Individual flag evaluations do not make network requests. The agentless source:

- polls every 30 seconds by default;
- uses a 2-second request timeout by default;
- uses ETags to avoid downloading unchanged configuration;
- preserves the last accepted configuration during temporary network or payload errors; and
- prevents overlapping polls.

You can change the operational defaults with these environment variables:

| Environment variable | Default | Description |
|---|---|---|
| `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE_AGENTLESS_POLL_INTERVAL_SECONDS` | `30` | Time between completed polling attempts. |
| `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE_AGENTLESS_REQUEST_TIMEOUT_SECONDS` | `2` | Timeout for an individual configuration request. |

Keep `DD_API_KEY` in a secret manager and expose it only to the application process that loads flag configuration. Agentless configuration delivery sends the API key directly from the application to Datadog over HTTPS.

Datadog-managed agentless delivery is not available for Datadog for Government in these versions. Applications on that site continue to use caller-provided default values unless they use Agent Remote Configuration.

## Agent remote configuration

Set the source to `remote_config` to use Agent-managed delivery:

{{< code-block lang="bash" >}}
DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config
DD_REMOTE_CONFIGURATION_ENABLED=true
{{< /code-block >}}

Configure the API key on the Agent, not in the application process. See [Remote Configuration][1] for Agent setup and network requirements.

## Migrate from the legacy provider setting

`DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED` is deprecated. During a migration window, the SDK preserves the behavior of existing customers who explicitly set it. The removal release and timeline are communicated separately.

If you set `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true`, choose one of these paths:

- **Stay on Agent Remote Configuration:** Set `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config`, then remove `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED`. Your API key remains on the Agent.
- **Move to agentless delivery:** Set `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless`, configure `DD_API_KEY`, `DD_ENV`, and `DD_SITE` in the application, then remove `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED`. CDN polling begins when application code initializes or accesses the provider.

If you set `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=false`, replace it with `DD_FEATURE_FLAGGING_PROVIDER_ENABLED=false`.

Explicit `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE` values take precedence over the legacy setting. After the legacy setting is removed, an application without an explicit source uses agentless delivery. Set `remote_config` explicitly before that release if you want to remain on Agent delivery.

## Future offline mode

Offline mode is planned for applications that provide UFC JSON bytes at startup and do not make CDN or Remote Configuration network requests. It is not available in the initial agentless releases.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /remote_configuration/
