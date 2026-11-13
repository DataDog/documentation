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

Datadog Feature Flags [server SDKs][3] evaluate flags locally. The configuration source determines how they receive flag configuration.

## Choose a configuration source

| Source | Configuration delivery | Requirements |
|---|---|---|
| `agentless` | The SDK polls the Datadog-managed CDN over HTTPS. This is the default for new setups. | An API key in the application and outbound HTTPS. PHP requires an explicit source setting. |
| `remote_config` | A Datadog Agent receives configuration and delivers it to the SDK. | A reachable Agent with Remote Configuration enabled and an API key. Java also requires `-javaagent`. |

Use the [language getting-started guides][3] for the minimum setup. Restart the application after changing the configuration source.

## Use agentless delivery

Use these versions or later:

| SDK | Minimum version for this guide |
|---|---|
| Java `dd-openfeature` | 1.69.0 |
| Node.js `dd-trace` | 6.24.0 |
| Python `ddtrace` | 4.17.0 |
| .NET tracer and `Datadog.FeatureFlags.OpenFeature` | 3.57.0 and 2.3.2 |
| Ruby `datadog` | 2.49.0 |
| Go `dd-trace-go` | 2.12.0 |
| PHP `datadog/dd-trace` | 1.28.0 |

Configure the application before startup:

```bash
export DD_API_KEY='<DATADOG_API_KEY>'
export DD_ENV='<YOUR_ENVIRONMENT>'
```

Set `DD_SITE` outside `datadoghq.com`. For the selected site, use {{< region-param key="dd_site" code="true" >}}. `DD_ENV` must select the intended flag environment. `DD_SERVICE` and `DD_VERSION` are optional attribution settings.

Initialize the Datadog provider as shown on the language page. No source or enablement setting is required for a new setup, except PHP. For PHP, set this before the process starts:

```bash
export DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless
```

Java agentless delivery uses the standalone `dd-openfeature` SDK. .NET requires automatic instrumentation, and PHP requires its native extension.

Flag configuration and event delivery use separate connections. See [Send feature flag telemetry][6] for exposures and aggregated evaluation events.

### Configure agentless delivery

Set `DD_SITE` to your organization's Datadog site. For the site selected on this documentation page, use {{< region-param key="dd_site" code="true" >}}. The agentless source also supports these operational settings:

| Environment variable | Default | Description |
|---|---|---|
| `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE_AGENTLESS_BASE_URL` | Datadog-managed endpoint | Overrides the agentless flag configuration endpoint or base URL. See [Use a custom agentless endpoint](#use-a-custom-agentless-endpoint). |
| `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE_AGENTLESS_POLL_INTERVAL_SECONDS` | `30` | Positive integer that sets the time between completed polling attempts. Java and Ruby do not impose an upper limit on this interval. Node.js, Python, and .NET cap values at 3600 seconds. |
| `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE_AGENTLESS_REQUEST_TIMEOUT_SECONDS` | `5` | Positive integer that sets the timeout for an individual configuration request. |

The SDK fetches configuration in the background and evaluates flags locally. Individual flag evaluations do not make network requests. The agentless source does the following:

- Polls every 30 seconds by default
- Uses a 5-second request timeout by default
- Uses ETags to avoid downloading unchanged configuration
- Preserves the last accepted configuration during temporary network or payload errors
- Prevents overlapping polls

The Datadog-managed CDN uses globally distributed points of presence, network peering, and redundant routing. Serving locations are therefore likely to be geographically close to most application workloads.

Keep `DD_API_KEY` in a secret manager and expose it only to the application process that loads flag configuration. Agentless configuration delivery sends the API key directly from the application to Datadog over HTTPS.

### Use a custom agentless endpoint

The Datadog-managed endpoint is recommended for standard deployments. For advanced testing, local development, or an operator-managed proxy, override it with `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE_AGENTLESS_BASE_URL`:

{{< code-block lang="bash" >}}
DD_FEATURE_FLAGS_CONFIGURATION_SOURCE_AGENTLESS_BASE_URL=http://localhost:8080
{{< /code-block >}}

The custom URL must use HTTP or HTTPS. If it contains only an origin or a root path, the SDK appends the standard flag configuration path. If it contains a non-root path, the SDK uses that path as the complete endpoint.

The SDK sends `DD_API_KEY` only over HTTPS to the default Datadog-managed endpoint. It never forwards the Datadog API key to a custom endpoint. Custom endpoints can use HTTP for controlled local development; use HTTPS for any endpoint outside the local development environment.

If the custom endpoint setting is invalid, the SDK keeps the provider disabled, logs the configuration error, and evaluations return caller-provided default values.

Datadog-managed agentless delivery is not available for Datadog for Government in the supported SDK versions. Applications on that site continue to use caller-provided default values unless they use Agent Remote Configuration.

### Migrate an existing Remote Configuration setup

Upgrading an SDK does not necessarily change an existing application's configuration source. The deprecated `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` setting can retain Remote Configuration when no source is selected explicitly.

#### Switch to CDN delivery

1. Install the SDK version from the [agentless version table](#use-agentless-delivery) or later. Use the initialization code from its language guide.
2. Add `DD_API_KEY` to the application process. An API key configured only on the Agent is not available to the SDK.
3. Keep the same `DD_ENV` to select the intended flag environment. Set `DD_SITE` to the organization's Datadog site.
4. Set `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless` explicitly during the migration.
5. Remove `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED` from deployment configuration. Remove Ruby `config.open_feature.enabled` and Node.js `experimental.flaggingProvider.enabled` settings from application code.
6. Restart the application and its workers. Initialize the provider and wait for initial configuration where the SDK supports it. PHP waits during the first evaluation.
7. Evaluate a known flag with a configured value different from the caller-provided default. Inspect evaluation details for errors. Change the flag remotely and confirm that the application receives the update.
8. If the application uses experiment exposures or evaluation events, verify those separately. A successful flag evaluation does not prove event delivery.

After migration, the explicit source is optional except in PHP. Keep it when the deployment should select agentless delivery explicitly.

For Java, use `com.datadog.openfeature.Provider` from `dd-openfeature` 1.69.0 or later. The standalone SDK does not require `-javaagent`. Keep the Java agent if the application uses APM or another agent feature.

Do not disable global Remote Configuration or remove the Datadog Agent if other products use them. Changing the Feature Flags source does not change those products.

#### Remain on Agent delivery or roll back

Set the source explicitly before removing legacy enablement settings:

```bash
export DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config
```

Keep the Agent's API key, network access, and Remote Configuration setup. Java also needs `dd-java-agent` loaded with `-javaagent`. Restart the application and verify flag updates. The SDK does not automatically switch between CDN and Agent configuration delivery after a delivery failure.

If the legacy setting was `false`, replace it with `DD_FEATURE_FLAGS_ENABLED=false` to keep Feature Flags disabled.

<a id="use-agent-remote-configuration"></a>

## Use Agent delivery

Use Datadog Agent 7.55 or later. Enable Remote Configuration for the organization and Agent, and configure the API key on the Agent. See [Remote Configuration][1] for setup and network requirements.

Set this in the application before startup:

```bash
export DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config
```

For Java, use `dd-openfeature` and `dd-java-agent` 1.69.0 or later. Load the Java agent into the JVM:

```bash
java -javaagent:/path/to/dd-java-agent.jar -jar your-application.jar
```

See the [Java setup][4] for provider registration. The in-process Java agent and the separate Datadog Agent are both required for Java Remote Configuration.

### Agent availability

With Agent Remote Configuration, the SDK receives flag configuration from the Datadog Agent. The SDK also sends experiment exposure events through the Agent. Agent availability has these effects:

- **Start the Agent before the application.** If the application starts before the Agent is available, restart the application after the Agent is available. Some SDKs can fail to load flag configuration, or to send experiment exposure events, after the Agent becomes available.
- **Before the first configuration arrives, flag evaluations return the default values.**
- **If the Agent stops after the SDK receives configuration, the SDK keeps the last configuration.** Flag evaluations continue to use this configuration.
- **The SDK can lose exposure events while the Agent is not available.** Do not assume that the SDK sends these events after the Agent becomes available.

## Advanced configuration

### Enable or disable feature flags

Set `DD_FEATURE_FLAGS_ENABLED=false` to disable the provider and both delivery paths. A new setup does not need an explicit `true` value. In PHP, `true` alone does not activate delivery; select the source explicitly.

### Activation and billing

Configuration requests through the CDN or Remote Configuration contribute to server Feature Flags billing.

- In Java, Go, Python, Ruby, Node.js, and .NET, agentless polling starts when application code initializes or accesses the provider.
- In PHP, the explicit source setting activates delivery during process startup. Provider registration alone does not activate it.
- Selecting `remote_config` enables the Feature Flags Remote Configuration subscription. It can start before provider initialization.

### Configuration precedence

Use an explicit source during migration to avoid differences in how language SDKs interpret legacy settings.

| Setting | Result |
|---|---|
| `DD_FEATURE_FLAGS_ENABLED=false` | Disables Feature Flags regardless of the source. |
| Explicit `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless` | Selects CDN delivery. PHP also uses it to activate delivery. |
| Explicit `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config` | Selects Agent delivery. |
| Legacy enablement without an explicit source | Can preserve Agent delivery or disabled behavior. Remove it when migrating. |
| No source or legacy settings | Uses agentless delivery when the provider initializes, except PHP, which requires explicit source selection. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /remote_configuration/
[3]: /feature_flags/server/
[4]: /feature_flags/server/java/#use-agent-delivery
[6]: /feature_flags/implementation_patterns/serverless/#send-feature-flag-telemetry
