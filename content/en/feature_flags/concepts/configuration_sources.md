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

## Get started with agentless delivery

Agentless delivery is the default in supported Node.js SDK versions. Other server SDKs use Agent Remote Configuration for flag delivery. To get started with Node.js, use one of these minimum versions:

| SDK | Minimum version |
|---|---|
| Node.js `dd-trace` v5 | 5.116.0 |
| Node.js `dd-trace` v6 | 6.5.0 |

Configure only the API key and environment in the application process:

{{< code-block lang="bash" >}}
DD_API_KEY=<DATADOG_API_KEY>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

Then initialize or access the Datadog OpenFeature provider in application code. See the [Node.js setup instructions][2].

No configuration-source or provider-enable setting is required. Polling begins only when application code initializes or accesses the provider; installing or initializing the tracer alone does not create Feature Flags CDN traffic.

<div class="alert alert-warning">The initial Node.js agentless releases support configuration delivery and local flag evaluation only. They do not send exposure events or aggregate <code>flagevaluation</code> events in agentless mode.</div>

## Advanced configuration

### Choose a configuration source

| Mode | Configuration delivery | Activation | Agent requirement |
|---|---|---|---|
| `agentless` (default) | The SDK periodically fetches UFC from the Datadog-managed CDN over HTTPS. | Polling begins when application code initializes or accesses the Datadog OpenFeature provider. | No Datadog Agent is required for flag configuration. |
| `remote_config` | The Datadog Agent receives UFC through Remote Configuration and delivers it to the SDK. | Selecting `remote_config` enables the Feature Flags Remote Configuration subscription. | Requires an Agent with Remote Configuration enabled. |

Set `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE` only when you want to select a source explicitly:

{{< code-block lang="bash" >}}
DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless
{{< /code-block >}}

The SDK resolves the source once during initialization. Restart the application to change sources.

### Configure Agentless delivery

If your organization is not on the default `datadoghq.com` site, set `DD_SITE` in the application process. The agentless source also supports these operational settings:

| Environment variable | Default | Description |
|---|---|---|
| `DD_SITE` | `datadoghq.com` | Datadog site used to derive the agentless endpoint. |
| `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE_AGENTLESS_BASE_URL` | Datadog-managed endpoint | Overrides the agentless backend URL. |
| `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE_AGENTLESS_POLL_INTERVAL_SECONDS` | `30` | Time between completed polling attempts. |
| `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE_AGENTLESS_REQUEST_TIMEOUT_SECONDS` | `5` | Timeout for an individual configuration request. |

The SDK fetches configuration in the background and evaluates flags locally. Individual flag evaluations do not make network requests. The agentless source:

- polls every 30 seconds by default;
- uses a 5-second request timeout by default;
- uses ETags to avoid downloading unchanged configuration;
- preserves the last accepted configuration during temporary network or payload errors; and
- prevents overlapping polls.

Keep `DD_API_KEY` in a secret manager and expose it only to the application process that loads flag configuration. Agentless configuration delivery sends the API key directly from the application to Datadog over HTTPS.

Datadog-managed agentless delivery is not available for Datadog for Government in these Node.js versions. Applications on that site continue to use caller-provided default values unless they use Agent Remote Configuration.

### Enable or disable feature flags

`DD_FEATURE_FLAGS_ENABLED` defaults to `true`, so new setups do not need to set it. Set it to `false` to disable the provider and both configuration delivery paths:

{{< code-block lang="bash" >}}
DD_FEATURE_FLAGS_ENABLED=false
{{< /code-block >}}

### Activation and billing

Server Feature Flags billing is based on configuration requests made through Remote Configuration or the CDN. Installing the tracer does not activate either delivery path by itself.

- With the default agentless source, CDN polling starts only when application code initializes or accesses the Datadog OpenFeature provider.
- Explicitly selecting `remote_config` starts the Agent Feature Flags subscription. It does not require application code to initialize the provider.

### Configuration precedence

| Configuration | Result |
|---|---|
| `DD_FEATURE_FLAGS_ENABLED=false` | Disables the provider and both delivery paths, regardless of other settings. |
| Explicit `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless` | Selects CDN delivery. Polling begins when application code initializes or accesses the provider. |
| Explicit `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config` | Selects Agent delivery and enables the Feature Flags Remote Configuration subscription. |
| No source and `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` | Preserves Remote Configuration during the migration window. |
| No source and `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=false` | Keeps the provider and both delivery paths disabled. |
| Neither setting is present | Selects agentless delivery. Polling begins when application code initializes or accesses the provider. |

### Use Agent remote configuration

Set the source to `remote_config` to use Agent-managed delivery:

{{< code-block lang="bash" >}}
DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config
{{< /code-block >}}

Configure the API key on the Agent, not in the application process. If Remote Configuration has been disabled on the Agent, re-enable it. See [Remote Configuration][1] for Agent setup and network requirements.

### Migrate an existing remote configuration setup

Existing customers who set `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` remain on Remote Configuration during a migration window. The setting is deprecated, and its removal version and timeline are communicated separately.

If you set `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true`, choose one of these paths:

- **Stay on Agent Remote Configuration:** Set `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config`, then remove `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED`. Your API key remains on the Agent.
- **Move to agentless delivery:** Set `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless`, configure `DD_API_KEY` and `DD_ENV` in the application, and set `DD_SITE` if your organization is not on the default site. Then remove `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED`. CDN polling begins when application code initializes or accesses the provider.

If you set `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=false`, replace it with `DD_FEATURE_FLAGS_ENABLED=false`.

Explicit `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE` values take precedence over the legacy setting. After the legacy setting is removed, a Node.js application without an explicit source uses agentless delivery. Set `remote_config` explicitly before that release if you want to remain on Agent delivery.

### Future offline mode

Offline mode is planned for applications that provide UFC JSON bytes at startup and do not make CDN or Remote Configuration network requests. It is not available in the initial agentless releases.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /remote_configuration/
[2]: /feature_flags/server/nodejs/
