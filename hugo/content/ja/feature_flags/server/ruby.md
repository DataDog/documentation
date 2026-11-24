---
description: Ruby アプリケーション用に Datadog Feature Flags をセットアップします。
further_reading:
- link: /feature_flags/server/
  tag: ドキュメント
  text: Server-Side Feature Flags
- link: /tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby/
  tag: ドキュメント
  text: Ruby Tracing
- link: /tracing/
  tag: ドキュメント
  text: Application Performance Monitoring (APM) について
- link: /feature_flags/guide/server_flag_evaluation_metrics/
  tag: ガイド
  text: サーバーサイドのフラグ評価メトリクスをセットアップする
- link: /feature_flags/guide/apm_trace_enrichment/
  tag: ガイド
  text: Feature Flags の APM トレースのリッチ化をセットアップする
- link: /feature_flags/concepts/flag_graphs/
  tag: コンセプト
  text: Feature Flag グラフ
- link: /feature_flags/concepts/configuration_sources/
  tag: コンセプト
  text: サーバー SDK 構成ソース
title: Ruby Feature Flags
---
## 概要 {#overview}

このページでは、Datadog Feature Flags SDK を使用して Ruby アプリケーションをインスツルメントする方法について説明します。Ruby SDK は、機能フラグ管理のオープン標準である [OpenFeature][3] と統合されます。`datadog` 2.46.0 以降では、デフォルトで Datadog が管理する CDN から直接フラグ構成を読み込みます。

構成の配信やローカルフラグ評価に Datadog Agent は必要ありません。Agent による配信を維持するには、[Agent Remote Configuration](#agent-configuration-delivery) を選択します。

<div class="alert alert-warning">実験エクスポージャーイベントおよび集計された Event Platform Proxy (EVP) フラグ評価イベントには、互換性のある Datadog Agent またはローカルテレメトリリレーが必要です。Ruby は、リレーが使用できない場合の直接的なイベント配信をサポートしていません。ここでの <code>feature_flag.evaluations</code> メトリクスには、個別に構成された OpenTelemetry エクスポートパスが必要です。<a href="/feature_flags/implementation_patterns/serverless/#send-feature-flag-telemetry">Feature Flags のテレメトリを送信する</a>を参照してください。</div>

## 前提条件 {#prerequisites}

デフォルトのエージェントレスセットアップには、以下が必要です。

- **Datadog Ruby SDK** `datadog` バージョン **2.46.0 以降**
- **Ruby ランタイム** バージョン 3.1 以降 (Datadog Feature Flags OpenFeature インテグレーションをフル活用するため)
- **OpenFeature Ruby SDK** `openfeature-sdk` バージョン 0.5.1 以降 (プロバイダーフック、エクスポージャーロギング、フラグ評価メトリクスのサポート用)
- **Datadog [API キー][4]およびサイト**: API キーと、組織をホストする Datadog サイト
- **サービスと環境の構成** - Feature Flags はサービスと環境のターゲットとなります。
- **サポートされているオペレーティングシステム** - 本番環境でのサポートは [Linux オペレーティングシステム][2]に限定されています。macOS と Windows は、ネイティブでサポートされている本番ターゲットではありませんが、これらのオペレーティングシステムで実行される Docker 化された Linux 環境はサポートされています。macOS でのローカル開発では、互換性のあるビルド済みネイティブアーティファクトが利用可能な場合に個のアーティファクトを使用できます。

<div class="alert alert-info">Datadog Ruby トレーサーでは、APM 用の古い Ruby ランタイムがサポートされています。Ruby 2.5 を含む古い Ruby バージョンのアプリケーションは、引き続き Datadog APM を使用できますが、Ruby 3.1 以降にアップグレードするまでは、OpenFeature を介した Datadog Feature Flags は使用できません。完全な Feature Flags テレメトリに必要なプロバイダーフックサーフェスを公開する OpenFeature Ruby SDK バージョンには、Ruby 3.1 以降が必要です。</div>

## インストールと初期化 {#installing-and-initializing}

アプリケーションの `Gemfile` に Datadog トレーサーと OpenFeature SDK を追加し、`bundle install` を実行します。

```ruby
gem 'datadog', '~> 2.46'
gem 'openfeature-sdk', '>= 0.5.1'
```

### Agentless 構成 {#agentless-configuration}

起動前にアプリケーションプロセスで以下の環境変数を設定します。

```bash
DD_API_KEY=<DATADOG_API_KEY>
DD_SITE={{< region-param key="dd_site" code="true" >}}
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
```

新規セットアップの場合、Feature Flags の有効化やソース設定は必要ありません。OpenFeature に Datadog プロバイダーを登録してポーリングを開始します。トレーサーのインストールや `Datadog::OpenFeature::Provider.new` の構築のみでは、Agentless 構成のリクエストは開始されません。

### プロバイダーを初期化する {#initialize-the-provider}

アプリケーションの起動時にプロバイダーを初期化します。

```ruby
require 'datadog'
require 'open_feature/sdk'
require 'datadog/open_feature/provider'

Datadog.configure do |config|
  # Optional: set the first-configuration wait in milliseconds (default: 30000).
  config.feature_flags.initialization_timeout_ms = 30_000
end

begin
  OpenFeature::SDK.set_provider_and_wait(Datadog::OpenFeature::Provider.new)
rescue OpenFeature::SDK::ProviderInitializationError => e
  warn "Feature Flags initialization failed: #{e.message}"
end

client = OpenFeature::SDK.build_client
```

`set_provider_and_wait` は、プロバイダーが最初の有効な構成を受信するか初期化が失敗するまでブロックします。デフォルトの初期化タイムアウトは 30 秒です。`config.feature_flags.initialization_timeout_ms` または `DD_EXPERIMENTAL_FLAGGING_PROVIDER_INITIALIZATION_TIMEOUT_MS` で構成します。OpenFeature メソッドは `timeout:` 引数を受け入れません。

この例では `ProviderInitializationError` をキャッチするため、アプリケーションは呼び出し元から提供されたデフォルト値で続行できます。一時的な配信失敗が原因で初期化がタイムアウトした場合でもポーリングは継続され、プロバイダーは有効な構成を受け取った時点で回復できます。ブロックしない初期化を希望する場合は、代わりに `OpenFeature::SDK.set_provider` を使用してください。構成が利用可能になるまで、評価はデフォルト値を返します。

SDK はデフォルトで 30 秒ごとにポーリングを行い、5 秒のリクエストタイムアウトを使用します。有効な構成を受信した後は、一時的な配信エラーが発生してもその構成が保持されます。ポーリングおよびカスタムエンドポイントの設定については、[構成ソース][6]を参照してください。Ruby は正の整数のポーリング間隔を上限なしで受け入れますが、リクエストタイムアウトは 1 秒から 300 秒の間でなければなりません。

### Agent 構成配信 {#agent-configuration-delivery}

Agent 管理のフラグ配信には、[Remote Configuration][1] が有効で Agent 上に API キーが設定された Datadog Agent 7.55 以降を使用します。`datadog` 2.46.0 以降では、ソースを明示的に選択します。

```bash
DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config
DD_REMOTE_CONFIGURATION_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
```

[プロバイダーを初期化する](#initialize-the-provider)セクションのプロバイダー初期化コードを使用します。`remote_config` を選択すると、アプリケーションがプロバイダーを登録する前であってもトレーサーの開始時に Feature Flags サブスクリプションが有効になります。構成配信用の API キーは Agent に設定します。

2.24.0 以降、`datadog` より前のバージョンでは、Agent Remote Configuration に `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` または `config.open_feature.enabled = true` を使用します。

### 既存のセットアップを移行する {#migrate-an-existing-setup}

2.46.0 以降では、`DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED` と `config.open_feature.enabled` は非推奨となっています。明示的なソースが選択されていない場合、`true` の従来の値は Remote Configuration を保持し、`false` は Feature Flags を無効にします。

Agentless 配信に移行するには、`DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless` を設定し、上記のアプリケーション認証情報を構成してから、環境と Ruby 構成の両方から従来の設定を削除します。Agent 配信を維持するには、従来の設定を削除する前に `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config` を設定します。[既存の Remote Configuration セットアップを移行する][7]を参照してください。

`DD_FEATURE_FLAGS_ENABLED=false`は、選択したソースに関係なく Feature Flags と両方の構成配信パスを無効にします。Feature Flags を無効にするには、従来の設定の代わりにそれを使用します。

### フラグ評価メトリクス {#flag-evaluation-metrics}

フラグ評価メトリクスは、個別の OpenTelemetry パイプラインを使用します。アプリケーションバンドルにメトリクス gem を追加する:

```ruby
gem 'opentelemetry-metrics-sdk', '>= 0.8.0'
gem 'opentelemetry-exporter-otlp-metrics', '>= 0.4.0'
```

`DD_METRICS_OTEL_ENABLED=true` を設定し、[サーバーサイドのフラグ評価メトリクスをセットアップする][5]に記載されているようにエクスポーターを構成します。Agentless 構成を有効にしても、メトリクスエクスポートは構成されません。

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

## フラグ評価テレメトリおよび実験参加を制御する{#control-flag-evaluation-telemetry-and-experiment-participation}

テレメトリのオプトアウトには、`datadog` バージョン `2.47.0` 以降が必要です。Experimentation のオプトアウトには、`datadog` バージョン `2.49.0` 以降が必要です。組み合わせの例には、`2.49.0` 以降が必要です。両方の制御は独立しており、デフォルトで無効になっています。共通の動作については、[フラグ評価と Experimentation のオプトアウト][14]を参照してください。

プロバイダーを構築する前に、以下の変数を設定します。

```bash
export DD_FEATURE_FLAGS_EVALUATION_TELEMETRY_PER_SUBJECT_OPT_OUT_ENABLED=true
export DD_FEATURE_FLAGS_EXPERIMENTATION_OPT_OUT_MODE=immediate
```

起動時にプロバイダーを初期化します。評価のたびにサブジェクトの設定を渡します。

```ruby
require 'datadog'
require 'open_feature/sdk'
require 'datadog/open_feature/provider'

OpenFeature::SDK.set_provider_and_wait(Datadog::OpenFeature::Provider.new)
client = OpenFeature::SDK.build_client

context = OpenFeature::SDK::EvaluationContext.new(
  targeting_key: 'user-123',
  dd_evaluation_telemetry_opt_out: true,
  dd_experimentation_opt_out_at: '2026-10-30T12:00:00Z'
)
enabled = client.fetch_boolean_value(
  flag_key: 'new-checkout',
  default_value: false,
  evaluation_context: context
)
```

例のタイムスタンプを、サブジェクトについて保存されている設定に置き換えてください。

同等のプロバイダーオプションは `enable_evaluation_telemetry_opt_out_parameter: true` と `experimentation_opt_out_mode: :immediate` です。明示的なプロバイダーオプションは、デプロイメント設定をオーバーライドします。有効になっているデプロイメントポリシーをオーバーライドするには `:disabled` を使用し、デプロイメント設定を使用するにはこのオプションを省略します。

タイムスタンプより厳密に前にアクティブ化された割り当てを保持するには、`future_experiments_only` または `experimentation_opt_out_mode: :future_experiments_only` を使用します。どちらの有効モードでも、形式が正しくないサブジェクトのタイムスタンプは `INVALID_CONTEXT` で拒否され、アプリケーションのデフォルトが返されます。「今後の実験のみ」モードでは、以前の登録状況ではなく、割り当てのアクティブ化を確認します。

テレメトリのオプトアウトにより、アプリケーションで有効になっている各項目 (新しい評価イベント、評価メトリクス、および自動フラグスパンアノテーション) が抑制されます。エクスポージャーは、対象となる割り当てに対して有効なままになります。リクエストごとに個別のコンテキストをs指定します。テレメトリを再開するには、ブール値 `false` を指定するか、この属性を削除します。実験を再度許可するには、タイムスタンプを削除します。継承されたコンテキスト値の適用方法については、[サーバー SDK の構成][15]を参照してください。

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

構造化データの場合、`fetch_object_value()` を使用します。このメソッドはハッシュを返します。複数の構成プロパティが関連している場合は、オブジェクトフラグを使用します。

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

フラグの値のみでなく詳細情報が必要な場合は、`fetch_<type>_details` メソッドを使用します。これらのメソッドは、評価された値とその評価を説明するメタデータの両方を返します。

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

## 独自のデータストアにエクスポージャーを記録する {#record-exposures-in-your-own-data-store}

独自のログ、データウェアハウス、または分析パイプラインにエクスポージャーを記録するには、`Datadog::OpenFeature::ExposureHook` を使用します。各フラグ評価の後、プロバイダーが Datadog に使用するものと同じエクスポージャーの判定に基づいてコードが呼び出されます。Datadog へのエクスポージャーの送信を停止するには、`DD_FEATURE_FLAGS_EXPOSURES_DATADOG_LOGGING_ENABLED=false` を設定します。SDK の最小要件およびその他の詳細については、[独自のデータストアに Feature Flag のエクスポージャーを記録する][12]を参照してください。

## 評価イベントとプライバシー {#evaluation-events-and-privacy}

EVP フラグ評価イベントにおけるターゲティングキーのハッシュ化および環境制御のコンテキスト収集には、`datadog` 2.46.0 以降を使用してください。デフォルトでは、これらのイベントは有効になっています。このイベントパスのみを無効にするには、`DD_FLAGGING_EVALUATION_COUNTS_ENABLED=false` を設定してください。収集されるデータ、オプトアウトのスコープ、および配信要件については、[サーバーサイドの評価イベントとプライバシー][13]を参照してください。

## テスト {#testing}

実際の `Datadog::OpenFeature::Provider` を使用して専用の Datadog テスト環境に対してテストを行うか、OpenFeature の `InMemoryProvider` に置き換えてテストコード内でフラグ値を直接制御することができます。このセクションでは、テストを外部から隔離し、オフライン環境でも実行可能なインメモリ方式について説明します。`InMemoryProvider` は `openfeature-sdk` に同梱されているため、追加の gem は不要です。

Ruby SDK の `InMemoryProvider` は、フラグキーのプレーンハッシュを値として取ります。バリアントとターゲティングルールはサポートされていません。プロセスグローバルなシングルトンで OpenFeature プロバイダーが設定されるため、プロバイダーを入れ替えるテストでは、フラグの状態が他の例に漏れないよう、終了処理 (teardown) で元に戻す必要があります。`around` フックを使用すると、セットアップ、復元、例外処理を 1 つのブロックでクリーンに実行できます。

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

## JRuby で Java SDK を使用する {#use-the-java-sdk-on-jruby}

Ruby SDK は JRuby 上での Feature Flags をサポートしていません。JRuby 上では、Ruby SDK はログに警告を出力し、Feature Flags を有効にしません。代わりに [Java SDK][8] を使用してください。JRuby は Java インテグレーションを通じて Java SDK を呼び出します。

[Java SDK 互換性要件][9]に記載されているバージョンを使用してください。

1. `dd-openfeature` JAR ファイル、OpenFeature Java SDK JAR ファイル、およびそれらの依存関係を取得します。たとえば、Maven を使用してそれらをディレクトリにコピーします。
2. `require` を使用してアプリケーションに JAR ファイルを読み込みます。
3. 構成ソースの環境変数を設定します。[サーバー SDK 構成ソース][6]を参照してください。
4. `dd-java-agent` で JRuby を起動します。`-J` オプションを使用して、`-javaagent` オプションを JVM に渡します。

```shell
export DD_SERVICE=<YOUR_SERVICE_NAME>
export DD_ENV=<YOUR_ENVIRONMENT>
# Use Agent Remote Configuration. Agentless delivery is the default.
export DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config

jruby -J-javaagent:/path/to/dd-java-agent.jar app.rb
```

```ruby
require 'java'

# Load the Datadog provider, the OpenFeature SDK, and their dependencies
Dir['/path/to/jars/*.jar'].each { |jar| require jar }

java_import 'dev.openfeature.sdk.OpenFeatureAPI'
java_import 'dev.openfeature.sdk.MutableContext'
java_import 'datadog.trace.api.openfeature.Provider'

# Set the provider. Wait for the first flag configuration.
api = OpenFeatureAPI.getInstance
api.setProviderAndWait(Provider.new)
client = api.getClient('my-app')

context = MutableContext.new('user-123')
context.add('tier', 'premium')

enabled = client.getBooleanValue('checkout.new', false, context)
```

JAR ファイルのみではフラグ配信は有効になりません。Datadog プロバイダーは `dd-java-agent` のクラスを使用します。JVM が `dd-java-agent` を読み込まない場合、プロバイダーは初期化されません。その場合、フラグ評価はデフォルト値を返します。

プロバイダーイベント、エラー処理、および評価メソッドについては、[Java SDK][8] ページを参照してください。JRuby は同じクラスとメソッドを使用します。

## トラブルシューティング {#troubleshooting}

アプリケーションが JRuby 上で実行される場合は、Java SDK を使用します。[JRuby で Java SDK を使用する][10]を参照してください。

### Agentless 構成が機能しない {#agentless-configuration-not-working}

- `datadog` 2.46.0 以降がインストールされており、アプリケーションが Datadog OpenFeature プロバイダーを登録していることを確認します。
- アプリケーションプロセス内の `DD_API_KEY`、`DD_SITE`、`DD_SERVICE`、および `DD_ENV` を確認します。
- `DD_FEATURE_FLAGS_ENABLED` が `false` でないことを確認します。
- `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE` を新規セットアップに設定しないままにするか、`agentless` に設定します。移行時に従来の有効化設定を削除します。
- `ufc-server.ff-cdn.<DD_SITE>` へのアウトバウンド HTTPS を許可します。
- `DD_TRACE_DEBUG=true` を有効にし、認証、タイムアウト、または構成エラーのトレーサーログを確認します。

最初の有効な構成を受信するまで、評価は呼び出し元が指定したデフォルト値を返します。初期化が成功した後、一時的な配信エラーが発生した場合は、最後に有効だった構成が保持されます。

### Remote Configuration のコネクションの問題 {#remote-configuration-connection-issues}

- `datadog` 2.46.0 以降で、`DD_FEATURE_FLAGS_CONFIGURATION_SOURCE` が `remote_config` に設定されていることを確認します。
- Agent と Ruby トレーサーで Remote Configuration が有効になっていることを確認します。
- アプリケーションの起動時に Datadog Agent が利用可能であったことを確認します。Agent が利用可能になった後も問題が解消しない場合は、アプリケーションを再起動してください。[Agent の可用性][11]を参照してください。
- Agent 上の API キーと、アプリケーション内の `DD_SERVICE` および `DD_ENV` を確認します。
- アプリケーションが Agent にリーチできることを確認します。`DD_TRACE_DEBUG=true` を有効にし、Remote Configuration エラーのトレーサーログを確認します。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/remote_config/
[2]: /ja/tracing/trace_collection/compatibility/ruby/#supported-operating-systems
[3]: https://openfeature.dev/
[4]: /ja/account_management/api-app-keys/#api-keys
[5]: /ja/feature_flags/guide/server_flag_evaluation_metrics/
[6]: /ja/feature_flags/concepts/configuration_sources/
[7]: /ja/feature_flags/concepts/configuration_sources/#migrate-an-existing-remote-configuration-setup
[8]: /ja/feature_flags/server/java/
[9]: /ja/feature_flags/server/java/#compatibility-requirements
[10]: #use-the-java-sdk-on-jruby
[11]: /ja/feature_flags/concepts/configuration_sources/#agent-availability
[12]: /ja/feature_flags/guide/record_exposures_in_your_own_data_store/
[13]: /ja/feature_flags/guide/server_evaluation_events/
[14]: /ja/feature_flags/concepts/opt_out/
[15]: /ja/feature_flags/concepts/opt_out/#configure-server-sdks