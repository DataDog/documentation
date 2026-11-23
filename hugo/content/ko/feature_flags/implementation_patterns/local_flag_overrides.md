---
description: OpenFeature의 Multi-Provider 패턴과 인메모리 프로바이더를 사용하여 테스트 목적으로 로컬에서 플래그 변형을
  재정의하세요.
further_reading:
- link: /feature_flags/server/
  tag: 문서
  text: 서버 측 Feature Flags
- link: /feature_flags/client/javascript/
  tag: 문서
  text: JavaScript Feature Flags
- link: /feature_flags/browser_developer_extension/
  tag: 문서
  text: 브라우저 개발자 확장 프로그램
- link: https://openfeature.dev/specification/appendix-a/#multi-provider
  tag: OpenFeature
  text: Multi-Provider 사양
- link: https://openfeature.dev/blog/openfeature-multi-provider-release/
  tag: OpenFeature
  text: OpenFeature Multi-Provider 릴리스
title: 다중 공급자 패턴을 사용한 로컬 플래그 재정의
---
## 개요 {#overview}

기능 플래그 통합을 테스트하거나 시연할 때 Datadog에서 플래그 구성을 변경하지 않고 특정 변형을 강제로 적용해야 하는 경우가 많습니다. [OpenFeature Multi-Provider][1] 패턴은 `InMemoryProvider`와 Datadog 프로바이더를 결합하여 로컬 재정의를 우선 적용하면서도 다른 모든 플래그는 계속 Datadog에서 평가되도록 합니다.

대표적인 사용 사례는 다음과 같습니다.

- 특정 플래그 변형에 대한 QA 및 수동 테스트
- UI에서 플래그 구성을 편집하지 않는 로컬 개발
- 팀원이 필요할 때 예측 가능한 플래그 변형을 사용해야 하는 데모 및 지원 워크플로

<div class="alert alert-warning">로컬 재정의는 프로덕션 환경이 아닌 곳에서만 사용합니다. 최종 사용자가 로컬 구성을 통해 플래그 동작을 변경할 수 없도록 프로덕션 빌드에서는 이 패턴을 제한하거나 비활성화합니다.</div>

애플리케이션이 브라우저에서 실행되는 경우, [Datadog Browser SDK 개발자 확장 프로그램][3]의 **Feature Flags** 탭에서는 이 페이지에 설명된 프로바이더 구성 없이도 Chrome DevTools 패널을 통해 동일한 로컬 재정의 기능을 사용할 수 있습니다.

## 로컬 플래그 재정의의 작동 방식 {#how-local-flag-overrides-work}

OpenFeature의 Multi-Provider는 여러 프로바이더를 하나의 클라이언트로 감쌉니다. 기본적으로 _First Match_ 전략을 사용합니다.

1. 첫 번째 프로바이더가 플래그 값을 반환하면 해당 값을 사용하고 나머지 프로바이더는 건너뜁니다.
2. 첫 번째 프로바이더가 `FLAG_NOT_FOUND`를 반환하면 다음 프로바이더에서 평가를 계속합니다.
3. Datadog은 인메모리 재정의 세트에 없는 모든 플래그에 대한 폴백 역할을 합니다.

프로바이더는 등록 순서대로 평가됩니다. 로컬 재정의가 Datadog보다 우선 적용되도록 프로바이더 목록에서 `InMemoryProvider`를 _첫 번째_에 배치합니다.

평가 전략에 대한 자세한 내용은 OpenFeature 사양의 [First Match 전략][2]을 참조하세요.

## 클라이언트 재정의 예시 {#client-override-examples}

<div class="alert alert-info">Multi-Provider 재정의 패턴은 <a href="/feature_flags/client/javascript/">JavaScript</a>, <a href="/feature_flags/client/react/">React</a>, <a href="/feature_flags/client/angular/">Angular</a>, <a href="/feature_flags/client/reactnative/">React Native</a>, <a href="/feature_flags/client/ios/">iOS</a> 및 <a href="/feature_flags/client/android/">Android</a>에서 지원됩니다. iOS 및 Android SDK에서는 <code>MultiProvider</code> 사용할 수 있지만 OpenFeature SDK에는 기본 제공 인메모리 프로바이더가 포함되어 있지 않습니다. 대신 <code>FeatureProvider</code> <a href="/feature_flags/client/ios/#testing">iOS</a> 및 <a href="/feature_flags/client/android/#testing">Android</a> 테스트 설명서에 설명된 대로 간단한 사용자 지정 프로바이더를 구현합니다.</div>

다음 예시는 브라우저 JavaScript를 사용하며 재정의 값을 설정하는 두 가지 일반적인 방법을 보여줍니다. `loadOverrides` 함수를 팀에서 선호하는 재정의 설정 방식이나 플랫폼에서 사용할 수 있는 저장 메커니즘(예: <code>UserDefaults</code> iOS 또는 <code>SharedPreferences</code> Android의 경우)에 맞게 조정합니다.

### URL 쿼리 파라미터 {#url-query-parameters}

시작할 때 페이지 URL에서 재정의 값을 읽습니다. QA 또는 지원팀에서 특정 변형을 강제로 적용하는 링크를 공유해야 할 때 유용한 방법입니다.

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

테스터는 페이지 URL에 `?ff.checkout_new=true&ff.ui_theme=dark`를 추가하여 해당 변형을 강제로 적용할 수 있습니다.

### localStorage {#localstorage}

`localStorage`에서 재정의 값을 읽어 페이지를 새로고침한 후에도 유지합니다. 개발자가 로컬 디버그 패널에서 플래그를 전환할 때 유용한 방법입니다.

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

디버그 패널이나 브라우저 콘솔에서 재정의 값을 설정한 다음 페이지를 새로고침합니다.

{{< code-block lang="javascript" >}}
localStorage.setItem('ff_overrides', JSON.stringify({
  checkout_new: true,
  ui_theme: 'dark',
}));
{{< /code-block >}}

## 서버 재정의 예시 {#server-override-examples}

서버에서 프로세스가 시작될 때 원하는 로컬 소스의 데이터를 인메모리 프로바이더에 설정합니다. 환경 변수와 정적 설정 맵은 두 가지 일반적인 접근 방식입니다.

<div class="alert alert-info">Multi-Provider 유틸리티는 <a href="/feature_flags/server/nodejs/">Node.js</a>, <a href="/feature_flags/server/go/">Go</a>, <a href="/feature_flags/server/java/">Java</a>, <a href="/feature_flags/server/php/">PHP</a> 및 <a href="/feature_flags/server/dotnet/">.NET</a> OpenFeature SDK에서 제공됩니다.</div>

### 환경 변수 {#environment-variables}

시작할 때 환경 변수에서 재정의 값을 읽습니다. 특정 변형을 사용해야 하는 일회성 로컬 실행이나 CI 작업에 유용한 방법입니다.

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

<div class="alert alert-info">Go Multi-Provider 패키지는 실험적이며 향후 릴리스에서 변경될 수 있습니다.</div>

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

<div class="alert alert-info">Java Multi-Provider API는 실험적이며 향후 릴리스에서 변경될 수 있습니다.</div>

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

해당 변형을 강제로 적용하려면 프로세스를 시작하기 전에 환경 변수 `FF_checkout_new=true` 및 `FF_ui_theme=dark`를 설정합니다.

## 플래그 평가 {#evaluate-flags}

초기화 후에는 기존과 같이 OpenFeature 클라이언트를 통해 플래그를 평가합니다. 재정의된 플래그는 강제로 지정한 값을 반환하고 나머지 플래그는 모두 Datadog에서 평가됩니다.

{{< tabs >}}
{{% tab "브라우저" %}}

{{< code-block lang="javascript" >}}
const client = OpenFeature.getClient();
const isEnabled = client.getBooleanValue('checkout_new', false);
{{< /code-block >}}

{{% /tab %}}
{{% tab "서버" %}}

{{< code-block lang="javascript" >}}
const client = OpenFeature.getClient();
const isEnabled = await client.getBooleanValue('checkout_new', false, {
  targetingKey: req.session?.userID ?? 'unknown',
});
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/specification/appendix-a/#multi-provider
[2]: https://openfeature.dev/specification/appendix-a/#first-match-strategy
[3]: /ko/feature_flags/browser_developer_extension/