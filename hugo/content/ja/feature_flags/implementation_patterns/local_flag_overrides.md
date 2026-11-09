---
description: OpenFeature の Multi-Provider パターンとインメモリプロバイダーを使用して、テストのためにフラグのバリアントをローカルでオーバーライドします。
further_reading:
- link: /feature_flags/server/
  tag: ドキュメント
  text: サーバーサイドの Feature Flags
- link: /feature_flags/client/javascript/
  tag: ドキュメント
  text: JavaScript Feature Flags
- link: /feature_flags/browser_developer_extension/
  tag: ドキュメント
  text: ブラウザ開発者用拡張機能
- link: https://openfeature.dev/specification/appendix-a/#multi-provider
  tag: OpenFeature
  text: Multi-Provider 仕様
- link: https://openfeature.dev/blog/openfeature-multi-provider-release/
  tag: OpenFeature
  text: OpenFeature Multi-Provider リリース
title: Multi-Provider パターンによるローカルフラグのオーバーライド
---
## 概要{#overview}

機能フラグの統合をテストまたはデモする際、Datadog でフラグの設定を変更せずに、特定のバリアントを強制的に適用する必要があることがよくあります。[OpenFeature Multi-Provider][1] パターンは、`InMemoryProvider` と Datadog プロバイダーを組み合わせることで、ローカルのオーバーライドが優先されるようにしつつ、他のすべてのフラグが Datadog から解決されるようにします。

一般的な使用例には次のものがあります。

- 特定のフラグバリアントの QA および手動テスト
- UI でフラグ構成を編集しないローカル開発
- チームメイトが予測可能なバリアントをオンデマンドで必要とするデモおよびサポートワークフロー

<div class="alert alert-warning">ローカルオーバーライドは、非本番環境でのみ使用してください。本番環境のビルドではこのパターンを制限または無効化し、エンドユーザーがローカル構成を通じてフラグの動作を変更できないようにしてください。</div>

アプリケーションがブラウザで実行されている場合、[Datadog Browser SDK 開発者用拡張機能][3] の [**Feature Flags**] タブを使用すると、このページで説明されているプロバイダー構成を行わなくても、[Chrome DevTools] パネルから同様のローカルオーバーライド動作を実現できます。

## ローカルフラグオーバーライドの仕組み {#how-local-flag-overrides-work}

OpenFeature の Multi-Provider は、複数のプロバイダーを単一のクライアントの背後にラップします。デフォルトでは、_ファーストマッチ_戦略が使用されます。

1. 最初のプロバイダーがフラグの値を返す場合、その値が使用され、それ以降のプロバイダーはスキップされます。
2. 最初のプロバイダーが `FLAG_NOT_FOUND` を返す場合、次のプロバイダーで評価を続行します。
3. Datadog は、インメモリのオーバーライドセットに存在しないフラグのフォールバックとして機能します。

プロバイダーは、登録した順序で評価されます。プロバイダーリストの_最初_に `InMemoryProvider` を配置して、オーバーライドが Datadog より優先されるようにしてください。

評価戦略の詳細については、OpenFeature 仕様の [ファーストマッチ戦略][2] を参照してください。

## クライアントオーバーライドの例 {#client-override-examples}

<div class="alert alert-info">Multi-Provider オーバーライドパターンは、<a href="/feature_flags/client/javascript/">JavaScript</a>、<a href="/feature_flags/client/react/">React</a>、<a href="/feature_flags/client/angular/">Angular</a>、<a href="/feature_flags/client/reactnative/">React Native</a>、<a href="/feature_flags/client/ios/">iOS</a>、および <a href="/feature_flags/client/android/">Android</a> でサポートされています。iOS および Android SDK の場合、<code>MultiProvider</code> は利用可能ですが、OpenFeature SDK には組み込みのインメモリプロバイダーは付属していません。小規模なカスタム実装を行うか、 <code>FeatureProvider</code> 代わりに、<a href="/feature_flags/client/ios/#testing">iOS</a> および <a href="/feature_flags/client/android/#testing">Android</a> のテストドキュメント</div>で示されているように実装してください。

以下の例では、ブラウザ JavaScript を使用してオーバーライドを設定する一般的な 2 つの方法を示します。`loadOverrides` 関数を、チームが好むオーバーライドの設定方法や、プラットフォームで利用可能なストレージメカニズムに合わせて調整してください (例: <code>UserDefaults</code> iOS の場合、または  <code>SharedPreferences</code> Android の場合)。

### URL クエリパラメーター {#url-query-parameters}

起動時にページ URL からオーバーライドを読み取ります。このアプローチは、QA やサポートが特定のバリアントを強制するリンクを共有する必要がある場合に便利です。

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

テスターは `?ff.checkout_new=true&ff.ui_theme=dark` をページ URL に追加して、それらのバリアントを強制できます。

### localStorage {#localstorage}

`localStorage` から読み取ることで、ページを再読み込みしてもオーバーライドを保持します。このアプローチは、開発者がローカルのデバッグパネルからフラグを切り替える場合に便利です。

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

デバッグパネルまたはブラウザコンソールからオーバーライドを設定してから、ページを再読み込みします。

{{< code-block lang="javascript" >}}
localStorage.setItem('ff_overrides', JSON.stringify({
  checkout_new: true,
  ui_theme: 'dark',
}));
{{< /code-block >}}

## サーバーオーバーライドの例 {#server-override-examples}

サーバー上では、プロセスの起動時に任意のローカルソースからインメモリプロバイダーを設定します。環境変数と静的構成マップは、一般的な 2 つのアプローチです。

<div class="alert alert-info">Multi-Provider ユーティリティは、<a href="/feature_flags/server/nodejs/">Node.js</a>、<a href="/feature_flags/server/go/">Go</a>、<a href="/feature_flags/server/java/">Java</a>、<a href="/feature_flags/server/php/">PHP</a>、および <a href="/feature_flags/server/dotnet/">.NET</a> の OpenFeature SDK で利用可能です。</div>

### 環境変数 {#environment-variables}

起動時に環境変数からオーバーライドを読み取ります。このアプローチは、特定のバリアントを必要とする 1 回限りのローカル実行や CI ジョブに役立ちます。

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

<div class="alert alert-info">Go Multi-Provider パッケージは実験的なものであり、将来のリリースで変更される可能性があります。</div>

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

<div class="alert alert-info">Java Multi-Provider API は実験的なものであり、将来のリリースで変更される可能性があります。</div>

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

プロセスを開始する前に環境で`FF_checkout_new=true` と `FF_ui_theme=dark` を設定し、それらのバリアントを強制します。

## {#evaluate-flags} フラグを評価する

初期化後、通常通り OpenFeature クライアントを通じてフラグを評価します。オーバーライドされたフラグは強制された値を返し、その他のすべてのフラグは Datadog から解決されます。

{{< tabs >}}
{{% tab "ブラウザ" %}}

{{< code-block lang="javascript" >}}
const client = OpenFeature.getClient();
const isEnabled = client.getBooleanValue('checkout_new', false);
{{< /code-block >}}

{{% /tab %}}
{{% tab "サーバー" %}}

{{< code-block lang="javascript" >}}
const client = OpenFeature.getClient();
const isEnabled = await client.getBooleanValue('checkout_new', false, {
  targetingKey: req.session?.userID ?? 'unknown',
});
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/specification/appendix-a/#multi-provider
[2]: https://openfeature.dev/specification/appendix-a/#first-match-strategy
[3]: /ja/feature_flags/browser_developer_extension/