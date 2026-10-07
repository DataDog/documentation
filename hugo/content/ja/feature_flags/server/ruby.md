---
description: Ruby アプリケーション用に Datadog Feature Flags をセットアップします。
further_reading:
- link: /feature_flags/server/
  tag: ドキュメント
  text: サーバーサイドの Feature Flags
- link: /tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby/
  tag: ドキュメント
  text: Ruby Tracing
- link: /tracing/
  tag: ドキュメント
  text: Application Performance Monitoring (APM) について学ぶ
- link: /feature_flags/guide/server_flag_evaluation_metrics/
  tag: ガイド
  text: サーバーサイドのフラグ評価メトリクスをセットアップする
- link: /feature_flags/guide/apm_trace_enrichment/
  tag: ガイド
  text: Feature Flags の APM トレースのリッチ化をセットアップする
- link: /feature_flags/concepts/flag_graphs/
  tag: コンセプト
  text: Feature Flag グラフ
title: Ruby Feature Flags
---
## 概要 {#overview}

このページでは、Datadog Feature Flags SDK を使用して Ruby アプリケーションをインスツルメントする方法について説明します。Ruby SDK は、機能フラグ管理のオープン標準である [OpenFeature][3] と連携して、Datadog Ruby トレーサー (`datadog` gem) で Remote Configuration を通じてフラグ更新を受信します。

## 前提条件 {#prerequisites}

Ruby Feature Flags SDK をセットアップする前に、以下の条件を満たしていることを確認してください。

- **Datadog Agent** バージョン 7.55 以降 ([Remote Configuration][1] が有効)
- **Datadog [API キー][4]** が Agent で構成済み
- **Datadog Ruby SDK** `datadog` バージョン 2.24.0 以降
- **Ruby ランタイム** バージョン 3.1 以降 (Datadog Feature Flags OpenFeature インテグレーションをフル活用するため)
- **OpenFeature Ruby SDK** `openfeature-sdk` バージョン 0.5.1 以降 (プロバイダーフック、エクスポージャーロギング、フラグ評価メトリクスのサポート用)
- **OpenTelemetry メトリクス gem** ([フラグ評価メトリクス][5] 用): `opentelemetry-metrics-sdk` バージョン 0.8.0 以降、および `opentelemetry-exporter-otlp-metrics` バージョン 0.4.0 以降
- **サービスと環境の構成** - 機能フラグはサービスと環境のターゲットとなります。
- **サポートされているオペレーティングシステム** - 本番環境でのサポートは [Linux オペレーティングシステム][2] に限定されています。macOS と Windows は、ネイティブでサポートされている本番ターゲットではありませんが、これらのオペレーティングシステムで実行される Docker 化された Linux 環境はサポートされています。macOS でのローカル開発では、互換性のあるビルド済みネイティブアーティファクトが利用可能な場合に個のアーティファクトを使用できます。

<div class="alert alert-info">Datadog Ruby トレーサーでは、APM 用の古い Ruby ランタイムがサポートされています。Ruby 2.5 を含む古い Ruby バージョンのアプリケーションは、引き続き Datadog APM を使用できますが、Ruby 3.1 以降にアップグレードするまでは、OpenFeature を介した Datadog Feature Flags は使用できません。完全な Feature Flags テレメトリに必要なプロバイダーフックサーフェスを公開する OpenFeature Ruby SDK バージョンには、Ruby 3.1 以降が必要です。</div>

## インストールと初期化 {#installing-and-initializing}

Feature Flagging は、Application Performance Monitoring (APM) によって提供されます。APM を Feature Flagging サポート付きでアプリケーションに統合するには、gem をインストールし、OpenFeature サポート付きで Remote Configuration を構成します。

```shell
gem install datadog openfeature-sdk
```

フラグ評価メトリクスを出力するには、OpenTelemetry メトリクス gem をアプリケーションバンドルに追加します。

```ruby
gem "opentelemetry-metrics-sdk", ">= 0.8"
gem "opentelemetry-exporter-otlp-metrics", ">= 0.4"
```

環境変数を使用して Feature Flags を有効にできます。

```shell
# Required: Enable the feature flags provider
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true

# Optional: Enable flag evaluation metrics
DD_METRICS_OTEL_ENABLED=true
```

<div class="alert alert-info"> <code>EXPERIMENTAL_</code> プレフィックスは後方互換性のために保持されていますが、プロバイダー自体は安定しています。</div>

<a href="/feature_flags/guide/server_flag_evaluation_metrics/">サーバーサイドのフラグ評価メトリクスをセットアップする</a>を参照して、実験的な <code>feature_flag.evaluations</code> メトリクスを有効にします。利用可能なグラフ作成の詳細については、<a href="/feature_flags/concepts/flag_graphs/">Feature Flag グラフ</a>を参照してください。

または、コード内でプロバイダーを有効にします。

```ruby
require 'datadog'
require 'open_feature/sdk'
require 'datadog/open_feature/provider'

INITIALIZATION_TIMEOUT = 30

# Configure Datadog with feature flagging enabled
Datadog.configure do |config|
  config.remote.enabled = true
  config.remote.boot_timeout_seconds = INITIALIZATION_TIMEOUT
  config.open_feature.enabled = true
end

# Configure OpenFeature SDK with Datadog provider and wait for initialization
OpenFeature::SDK.configure do |config|
  config.set_provider_and_wait(
    Datadog::OpenFeature::Provider.new,
    timeout: INITIALIZATION_TIMEOUT
  )
end

# Create OpenFeature client
client = OpenFeature::SDK.build_client
```

`set_provider_and_wait` を使用すると、プロバイダーが完全に初期化されるかタイムアウトに達するまで、アプリケーションの処理がブロックされます。これにより、アプリケーションがリクエストの処理を開始する前にフラグの準備が整います。ブロックしない初期化を希望する場合は、代わりに `set_provider` を使用してください。その場合、Remote Configuration がバックグラウンドで読み込まれるまで、クライアントはデフォルト値を返します。

## 評価コンテキストを設定する {#set-the-evaluation-context}

フラグのターゲティング対象となるユーザーまたはエンティティを識別する評価コンテキストを定義します。評価コンテキストには、どのフラグバリエーションを返すかを決定するために使用される属性が含まれます。

<div class="alert alert-warning">Datadog Feature Flags では、評価コンテキスト属性が文字列、数値、ブール値といったフラットなプリミティブ値でなければなりません。ネストされたオブジェクトや配列は渡さないでください。これらはサポートされておらず、エクスポージャーデータが破棄される原因となる可能性があります。</div>

```ruby
context = OpenFeature::SDK::EvaluationContext.new(
  targeting_key: 'user-123',  # Targeting key (typically user ID)
  email: 'user@example.com',
  country: 'US',
  tier: 'premium',
  age: 25
)
```

ターゲティングキーは、一貫したトラフィックディストリビューション (パーセンテージロールアウト) に使用されます。追加の属性により、上記の例で「米国のユーザーに対して有効にする」や「プレミアム層のユーザーに対して有効にする」といったターゲティングルールが可能になります。

## フラグを評価する {#evaluate-flags}

`OpenFeature` クライアントの作成後に、アプリ全体でフラグ値の読み取りを開始できます。フラグの評価にはローカルにキャッシュされたデータが使用されるため、フラグを評価する際にネットワークリクエストは発生しません。

各フラグは、一意の文字列 _key_ によって識別されます。フラグの評価には、期待される型と一致する値を返す型付きメソッドが使用されます。フラグが存在しない場合や評価できない場合、SDK はデフォルト値を返します。

### ブールフラグ {#boolean-flags}

オン/オフや真/偽の条件を表すフラグには、`fetch_boolean_value()` を使用します。

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

### 文字列フラグ {#string-flags}

複数のバリアントや構成文字列を選択するフラグには、`fetch_string_value()` を使用します。

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

### 数値フラグ {#number-flags}

数値フラグの場合、`fetch_integer_value()` または `fetch_float_value()` を使用します。Ruby には `fetch_number_value()` も用意されています。これはデフォルト値に基づいて適切な型を返します。これらのメソッドは、機能が制限、パーセンテージ、乗数などの数値パラメーターに依存する場合に適しています。

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

### オブジェクトフラグ {#object-flags}

構造化データの場合、`fetch_object_value()` を使用します。このメソッドはハッシュを返します。オブジェクトフラグは、複数のプロパティをまとめて提供する必要がある Remote Configuration シナリオで役立ちます。

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

### フラグ評価の詳細 {#flag-evaluation-details}

フラグの値だけでなく詳細情報が必要な場合は、`fetch_<type>_details` メソッドを使用します。これらのメソッドは、評価された値とその評価を説明するメタデータの両方を返します。

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

フラグの詳細は、評価の動作をデバッグし、ユーザーが特定の値を受け取った理由を理解する上で役立ちます。

## コンテキストなしの評価 {#evaluation-without-context}

評価コンテキストを指定せずにフラグを評価できます。これは、ユーザー固有のターゲティングを必要としないグローバルなフラグの場合に役立ちます。

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

## テスト {#testing}

実際の `Datadog::OpenFeature::Provider` を使用して専用の Datadog テスト環境に対してテストを行うか、OpenFeature の `InMemoryProvider` に置き換えてテストコード内でフラグ値を直接制御することができます。このセクションでは、テストを外部から隔離し、オフライン環境でも実行可能なインメモリ方式について説明します。`InMemoryProvider` は `openfeature-sdk` に同梱されているため、追加の gem は不要です。

Ruby SDK の `InMemoryProvider` は、フラグキーのプレーンハッシュを値としてとります。バリアントとターゲティングルールはサポートされていません。プロセスグローバルなシングルトンで OpenFeature プロバイダーが設定されるため、プロバイダーを入れ替えるテストでは、フラグの状態が他の例に漏れないよう、終了処理 (teardown) で元に戻す必要があります。`around` フックを使用すると、セットアップ、復元、例外処理を 1 つのブロックでクリーンに実行できます。

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

テスト中にフラグの状態を変更するには、プロバイダーインスタンスで `add_flag(flag_key:, value:)` を呼び出します。同じパターンが Minitest にも適用されます。`around` フックを `setup`/`teardown` メソッドに置き換えてください。

## トラブルシューティング {#troubleshooting}

### 機能フラグが常にデフォルト値を返す{#feature-flags-always-return-default-values}

機能フラグが常にデフォルト値を返すことが予期していない状況である場合は、以下を確認してください。

- Datadog Agent 構成で Remote Configuration が有効になっていることを確認する
- サービスと環境が構成されていることを確認する (`DD_SERVICE` および `DD_ENV` 環境変数、または Ruby で `config.service` および `config.env` を使用)
- Ruby アプリケーションの Datadog 構成で `config.remote.enabled = true` と`config.open_feature.enabled = true` が設定されていることを確認する。
- `datadog` gem のバージョンに OpenFeature のサポートが含まれていること (2.24.0 以降) を確認する。

### Remote Configuration の接続の問題{#remote-configuration-connection-issues}

Datadog Ruby トレーサーのログで、Remote Configuration のステータスを確認します。

```ruby
# Enable startup and debug logging
Datadog.configure do |config|
  config.diagnostics.startup_logs.enabled = true
  config.diagnostics.debug = true
  config.remote.enabled = true
  config.open_feature.enabled = true
end
```

以下の状況を示すメッセージを探してください。
- Remote Configuration ワーカーを開始している
- Feature Flags 構成を受信している
- OpenFeature コンポーネントの初期化

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/remote_config/
[2]: /ja/tracing/trace_collection/compatibility/ruby/#supported-operating-systems
[3]: https://openfeature.dev/
[4]: /ja/account_management/api-app-keys/#api-keys
[5]: /ja/feature_flags/guide/server_flag_evaluation_metrics/