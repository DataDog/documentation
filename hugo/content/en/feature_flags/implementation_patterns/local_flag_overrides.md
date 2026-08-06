---
title: Local Flag Overrides with the Multi-Provider Pattern
description: Use OpenFeature's Multi-Provider pattern with an in-memory provider to override flag variants locally for testing.
further_reading:
- link: "/feature_flags/server/"
  tag: "Documentation"
  text: "Server-Side Feature Flags"
- link: "/feature_flags/client/javascript/"
  tag: "Documentation"
  text: "JavaScript Feature Flags"
- link: "https://openfeature.dev/specification/appendix-a/#multi-provider"
  tag: "OpenFeature"
  text: "Multi-Provider Specification"
- link: "https://openfeature.dev/blog/openfeature-multi-provider-release/"
  tag: "OpenFeature"
  text: "OpenFeature Multi-Provider Release"
---

## Overview

When you test or demo a feature flag integration, you often need to force a specific variant without changing the flag configuration in Datadog. The [OpenFeature Multi-Provider][1] pattern combines an `InMemoryProvider` with your Datadog provider so local overrides take precedence while all other flags continue to resolve from Datadog.

Typical use cases include:

- QA and manual testing of specific flag variants
- Local development without editing flag configuration in the UI
- Demos and support workflows where a teammate needs a predictable variant on demand

<div class="alert alert-warning">Use local overrides only in non-production environments. Restrict or disable this pattern in production builds so end users cannot change flag behavior through local configuration.</div>

## How local flag overrides work

OpenFeature's Multi-Provider wraps multiple providers behind a single client. By default, it uses the _First Match_ strategy:

1. If the first provider returns a value for the flag, that value is used and later providers are skipped.
2. If the first provider returns `FLAG_NOT_FOUND`, evaluation continues to the next provider.
3. Datadog serves as the fallback for any flag not present in the in-memory override set.

Providers are evaluated in the order you register them. Place the `InMemoryProvider` _first_ in the provider list so overrides take precedence over Datadog.

For more detail on evaluation strategies, see [First Match strategy][2] in the OpenFeature specification.

## Client override examples

<div class="alert alert-info">The Multi-Provider override pattern is supported on <a href="/feature_flags/client/javascript/">JavaScript</a>, <a href="/feature_flags/client/react/">React</a>, <a href="/feature_flags/client/angular/">Angular</a>, <a href="/feature_flags/client/reactnative/">React Native</a>, <a href="/feature_flags/client/ios/">iOS</a>, and <a href="/feature_flags/client/android/">Android</a>. On iOS and Android SDKs, <code>MultiProvider</code> is available, but the OpenFeature SDKs do not ship a built-in in-memory provider. Implement a small custom <code>FeatureProvider</code> instead, as shown in the <a href="/feature_flags/client/ios/#testing">iOS</a> and <a href="/feature_flags/client/android/#testing">Android</a> testing documentation.</div>

The following examples use browser JavaScript and show two common ways to populate overrides. Adapt the `loadOverrides` function to match how your team prefers to set overrides, or to the storage mechanism available on your platform (for example, <code>UserDefaults</code> on iOS or <code>SharedPreferences</code> on Android).

### URL query parameters

Read overrides from the page URL at startup. This approach is useful when QA or support needs to share a link that forces specific variants:

{{< code-block lang="javascript" >}}
import { InMemoryProvider, MultiProvider, OpenFeature } from '@openfeature/web-sdk';
import { DatadogProvider } from '@datadog/openfeature-browser';

const OVERRIDE_QUERY_PREFIX = 'ff.';

function buildInMemoryFlags(overrides) {
  return Object.fromEntries(
    Object.entries(overrides).map(([flagKey, value]) => [
      flagKey,
      {
        variants: { forced: value },
        defaultVariant: 'forced',
        disabled: false,
      },
    ]),
  );
}

function loadOverrides() {
  const overrides = {};
  const params = new URLSearchParams(window.location.search);

  for (const [key, value] of params.entries()) {
    if (!key.startsWith(OVERRIDE_QUERY_PREFIX)) continue;
    const flagKey = key.slice(OVERRIDE_QUERY_PREFIX.length);
    if (flagKey) overrides[flagKey] = value;
  }

  return overrides;
}

export async function initializeFeatureFlags({
  clientToken,
  applicationId,
  env,
  service,
}) {
  const datadogProvider = new DatadogProvider({
    clientToken,
    applicationId,
    env,
    service,
  });

  await OpenFeature.setProviderAndWait(
    new MultiProvider([
      { provider: new InMemoryProvider(buildInMemoryFlags(loadOverrides())) },
      { provider: datadogProvider },
    ]),
  );
}
{{< /code-block >}}

A tester could append `?ff.checkout_new=true&ff.ui_theme=dark` to the page URL to force those variants.

### localStorage

Persist overrides across page reloads by reading from `localStorage`. This approach is useful when a developer toggles flags from a local debug panel:

{{< code-block lang="javascript" >}}
import { InMemoryProvider, MultiProvider, OpenFeature } from '@openfeature/web-sdk';
import { DatadogProvider } from '@datadog/openfeature-browser';

const OVERRIDE_STORAGE_KEY = 'ff_overrides';

function buildInMemoryFlags(overrides) {
  return Object.fromEntries(
    Object.entries(overrides).map(([flagKey, value]) => [
      flagKey,
      {
        variants: { forced: value },
        defaultVariant: 'forced',
        disabled: false,
      },
    ]),
  );
}

function loadOverrides() {
  const raw = localStorage.getItem(OVERRIDE_STORAGE_KEY);
  if (!raw) return {};

  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export async function initializeFeatureFlags({
  clientToken,
  applicationId,
  env,
  service,
}) {
  const datadogProvider = new DatadogProvider({
    clientToken,
    applicationId,
    env,
    service,
  });

  await OpenFeature.setProviderAndWait(
    new MultiProvider([
      { provider: new InMemoryProvider(buildInMemoryFlags(loadOverrides())) },
      { provider: datadogProvider },
    ]),
  );
}
{{< /code-block >}}

Set overrides from a debug panel or the browser console, then reload the page:

{{< code-block lang="javascript" >}}
localStorage.setItem('ff_overrides', JSON.stringify({
  checkout_new: true,
  ui_theme: 'dark',
}));
{{< /code-block >}}

## Server override examples

On the server, populate the in-memory provider at process startup from any local source. Environment variables and static configuration maps are two common approaches.

<div class="alert alert-info">The Multi-Provider utility is available in the <a href="/feature_flags/server/nodejs/">Node.js</a>, <a href="/feature_flags/server/go/">Go</a>, <a href="/feature_flags/server/java/">Java</a>, <a href="/feature_flags/server/php/">PHP</a>, and <a href="/feature_flags/server/dotnet/">.NET</a> OpenFeature SDKs.</div>

### Environment variables

Read overrides from environment variables at startup. This approach is useful for one-off local runs or CI jobs that need a specific variant:

{{< tabs >}}
{{% tab "Node.js" %}}

{{< code-block lang="javascript" >}}
import { MultiProvider, OpenFeature, TypedInMemoryProvider } from '@openfeature/server-sdk';
import tracer from 'dd-trace';

const OVERRIDE_ENV_PREFIX = 'FF_';

function buildInMemoryFlags(overrides) {
  return Object.fromEntries(
    Object.entries(overrides).map(([flagKey, value]) => [
      flagKey,
      {
        variants: { forced: value },
        defaultVariant: 'forced',
        disabled: false,
      },
    ]),
  );
}

function loadOverrides() {
  const overrides = {};

  for (const [key, value] of Object.entries(process.env)) {
    if (!key.startsWith(OVERRIDE_ENV_PREFIX) || value === undefined) continue;
    const flagKey = key.slice(OVERRIDE_ENV_PREFIX.length);
    if (flagKey) overrides[flagKey] = value;
  }

  return overrides;
}

export async function initializeFeatureFlags() {
  tracer.init();

  const overrideProvider = new TypedInMemoryProvider(
    buildInMemoryFlags(loadOverrides()),
  );

  await OpenFeature.setProviderAndWait(
    new MultiProvider([
      { provider: overrideProvider },
      { provider: tracer.openfeature },
    ]),
  );
}
{{< /code-block >}}
{{% /tab %}}
{{% tab "Go" %}}

<div class="alert alert-info">The Go Multi-Provider package is experimental and may change in future releases.</div>

{{< code-block lang="go" >}}
const overrideEnvPrefix = "FF_"

func loadOverrides() map[string]any {
    overrides := make(map[string]any)

    for _, entry := range os.Environ() {
        parts := strings.SplitN(entry, "=", 2)
        if len(parts) != 2 || !strings.HasPrefix(parts[0], overrideEnvPrefix) {
            continue
        }
        flagKey := strings.TrimPrefix(parts[0], overrideEnvPrefix)
        if flagKey != "" {
            overrides[flagKey] = parts[1]
        }
    }

    return overrides
}

func buildInMemoryFlags(overrides map[string]any) map[string]memprovider.InMemoryFlag {
    flags := make(map[string]memprovider.InMemoryFlag, len(overrides))

    for flagKey, value := range overrides {
        flags[flagKey] = memprovider.InMemoryFlag{
            State:          memprovider.Enabled,
            DefaultVariant: "forced",
            Variants:       map[string]any{"forced": value},
        }
    }

    return flags
}

func initializeFeatureFlags() error {
    tracer.Start()
    defer tracer.Stop()

    datadogProvider, err := ddopenfeature.NewDatadogProvider(ddopenfeature.ProviderConfig{})
    if err != nil {
        return err
    }
    defer datadogProvider.Shutdown()

    overrideProvider := memprovider.NewInMemoryProvider(buildInMemoryFlags(loadOverrides()))

    multiProvider, err := multi.NewProvider(
        multi.StrategyFirstMatch,
        multi.WithProvider("overrides", overrideProvider),
        multi.WithProvider("datadog", datadogProvider),
    )
    if err != nil {
        return err
    }

    return openfeature.SetProviderAndWait(multiProvider)
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

<div class="alert alert-info">The Java Multi-Provider API is experimental and may change in future releases.</div>

{{< code-block lang="java" >}}
private static final String OVERRIDE_ENV_PREFIX = "FF_";

private static Map<String, Object> loadOverrides() {
    Map<String, Object> overrides = new HashMap<>();

    for (Map.Entry<String, String> entry : System.getenv().entrySet()) {
        String key = entry.getKey();
        if (!key.startsWith(OVERRIDE_ENV_PREFIX)) {
            continue;
        }
        String flagKey = key.substring(OVERRIDE_ENV_PREFIX.length());
        if (!flagKey.isEmpty()) {
            overrides.put(flagKey, entry.getValue());
        }
    }

    return overrides;
}

private static Map<String, Flag<?>> buildInMemoryFlags(Map<String, Object> overrides) {
    Map<String, Flag<?>> flags = new HashMap<>();

    for (Map.Entry<String, Object> entry : overrides.entrySet()) {
        Object value = entry.getValue();
        Flag.Builder<?> builder = Flag.builder().defaultVariant("forced");

        if (value instanceof Boolean boolValue) {
            builder.variant("forced", boolValue);
        } else if (value instanceof Number numberValue) {
            builder.variant("forced", numberValue.doubleValue());
        } else {
            builder.variant("forced", value.toString());
        }

        flags.put(entry.getKey(), builder.build());
    }

    return flags;
}

public static void initializeFeatureFlags() throws Exception {
    InMemoryProvider overrideProvider = new InMemoryProvider(buildInMemoryFlags(loadOverrides()));
    Provider datadogProvider = new Provider();

    MultiProvider multiProvider = new MultiProvider(
        List.of(overrideProvider, datadogProvider)
    );

    OpenFeatureAPI api = OpenFeatureAPI.getInstance();
    api.setProviderAndWait(multiProvider);
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

Set `FF_checkout_new=true` and `FF_ui_theme=dark` in the environment before starting the process to force those variants.

## Evaluate flags

After initialization, evaluate flags through the OpenFeature client as usual. Overridden flags return the forced value; all other flags resolve from Datadog.

{{< tabs >}}
{{% tab "Browser" %}}

{{< code-block lang="javascript" >}}
const client = OpenFeature.getClient();
const isEnabled = client.getBooleanValue('checkout_new', false);
{{< /code-block >}}

{{% /tab %}}
{{% tab "Server" %}}

{{< code-block lang="javascript" >}}
const client = OpenFeature.getClient();
const isEnabled = await client.getBooleanValue('checkout_new', false, {
  targetingKey: req.session?.userID ?? 'unknown',
});
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/specification/appendix-a/#multi-provider
[2]: https://openfeature.dev/specification/appendix-a/#first-match-strategy
