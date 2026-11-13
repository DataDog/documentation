---
description: Python アプリケーション向けに Datadog Feature Flags を設定する。
further_reading:
- link: /feature_flags/server/
  tag: ドキュメント
  text: サーバーサイド Feature Flags
- link: /tracing/trace_collection/dd_libraries/python/
  tag: ドキュメント
  text: Python トレース
- link: /feature_flags/guide/server_flag_evaluation_metrics/
  tag: ガイド
  text: サーバーサイドのフラグ評価メトリクスを設定する
- link: /feature_flags/guide/apm_trace_enrichment/
  tag: ガイド
  text: Feature Flags の APM トレースエンリッチメントを設定する
- link: /feature_flags/concepts/flag_graphs/
  tag: 概念
  text: Feature Flag グラフ
- link: /feature_flags/concepts/configuration_sources/
  tag: 概念
  text: サーバー SDK 設定ソース
title: Python Feature Flags
---
## 概要{#overview}

このページでは、Datadog Feature Flags SDK を使用して Python アプリケーションをインスツルメントする方法について説明します。Python SDK は、Feature Flags 管理のオープン標準である [OpenFeature][1] と統合されています。`ddtrace` 4.14.0 以降では、デフォルトで Datadog が管理する CDN から直接フラグ設定が読み込まれるようになっています。

このガイドでは、SDK のインストールと有効化、OpenFeature クライアントの作成、およびアプリケーションでの Feature Flags の評価方法について説明します。

<div class="alert alert-warning">Python のエージェントレス配信では、設定ソースのみが変更されます。サポートされている Datadog Agent またはサーバーレステレメトリーパスを使用しない場合、SDK は評価メトリクスやエクスポージャーイベントをエクスポートしません。</div>

## 前提条件{#prerequisites}

Python Feature Flags SDK をセットアップする前に、以下が準備されていることを確認してください。

- **Datadog Python SDK** `ddtrace` バージョン 4.14.0 以降
- **OpenFeature Python SDK** `openfeature-sdk`: バージョン 0.5.0 以降 (プロバイダーのイベントハンドラーを使用して初期化の完了を待機する場合は、バージョン 0.7.0 以降が必要)
- A Datadog [API キー][3]
- Datadog サイト

以下の環境変数を設定します。

{{< code-block lang="bash" >}}
# Required: Agentless configuration delivery
export DD_API_KEY=<YOUR_API_KEY>
export DD_SITE={{< region-param key="dd_site" code="true" >}}
export DD_ENV=<YOUR_ENVIRONMENT>

# Optional: Enable flag evaluation metrics
export DD_METRICS_OTEL_ENABLED=true

# Recommended: Service identification
export DD_SERVICE=<YOUR_SERVICE_NAME>
{{< /code-block >}}

Feature Flags の有効化やソース設定は不要です。[SDK の初期化](#initialize-the-sdk)に記載されている通りにプロバイダーを登録すれば、ポーリングが開始されます。`ddtrace` のインストールや初期化だけでは、Feature Flags の CDN トラフィックは発生しません。

必要なトレーサーバージョンや Agent の OTLP のセットアップを含む `feature_flag.evaluations` の設定については、「[サーバーサイドのフラグ評価メトリクスを設定する][4]」を参照してください。利用可能なグラフ機能の詳細については、「[Feature Flag グラフ][5]」を参照してください。

## インストール{#installation}

Datadog Python SDK と OpenFeature SDK をインストールします。

{{< code-block lang="bash" >}}
pip install ddtrace openfeature-sdk
{{< /code-block >}}

または、それらを `requirements.txt` に追加します。

{{< code-block lang="text" filename="requirements.txt" >}}
ddtrace>=4.14.0
openfeature-sdk>=0.5.0
{{< /code-block >}}

フラグ評価メトリクスを有効にする場合は、OpenTelemetry SDK と OTLP エクスポーターもインストールする必要があります。

{{< code-block lang="bash" >}}
pip install opentelemetry-sdk opentelemetry-exporter-otlp-proto-grpc
{{< /code-block >}}

または、それらを `requirements.txt` に追加します。

{{< code-block lang="text" filename="requirements.txt" >}}
opentelemetry-sdk>=1.41.0
opentelemetry-exporter-otlp-proto-grpc>=1.41.0
{{< /code-block >}}

## SDK の初期化{#initialize-the-sdk}

Datadog OpenFeature プロバイダーを OpenFeature API に登録します。このプロバイダーは、選択された設定ソースを開始し、最初の設定が取得されるまで最大 10 秒間待機します。

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

## 評価コンテキストの設定{#set-the-evaluation-context}

フラグのターゲットとなるユーザーまたはエンティティを識別する評価コンテキストを定義します。評価コンテキストには、どのフラグバリエーションを返すかを決定するために使用される属性が含まれます。

<div class="alert alert-warning">Datadog Feature Flags では、評価コンテキスト属性として、文字列、数値、ブール値といったフラットなプリミティブ値を使用する必要があります。ネストされたオブジェクトや配列は渡さないでください。これらはサポートされておらず、エクスポージャーデータが破棄される原因となる可能性があります。</div>

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

ターゲティングキーは、一貫したトラフィックの振り分け (パーセンテージロールアウト) に使用されます。追加の属性を使用することで、「米国のユーザーに対して有効にする」や「プレミアムティアのユーザーに対して有効にする」といったターゲティングルールを設定できます。

## フラグの評価{#evaluate-flags}

プロバイダーの設定とクライアントの作成が完了したら、アプリケーション全体でフラグを評価できます。フラグの評価はローカルで高速に行われます。SDK はローカルにキャッシュされた設定データを使用するため、評価中にネットワークリクエストが発生することはありません。

各フラグはキー (一意の文字列) で識別され、期待される型の値を返す型指定されたメソッドを使用して評価できます。フラグが存在しない場合や評価できない場合、SDK は指定されたデフォルト値を返します。

### ブール型フラグ {#boolean-flags}

オン/オフや true/false の状態を表すフラグには、`get_boolean_value` を使用します。

{{< code-block lang="python" >}}
enabled = client.get_boolean_value("new-checkout-flow", False, eval_ctx)

if enabled:
    show_new_checkout()
else:
    show_legacy_checkout()
{{< /code-block >}}

### 文字列フラグ {#string-flags}

複数のバリエーションや設定用文字列のいずれかを選択するフラグには、`get_string_value` を使用します。

{{< code-block lang="python" >}}
theme = client.get_string_value("ui-theme", "light", eval_ctx)

if theme == "dark":
    set_dark_theme()
elif theme == "light":
    set_light_theme()
else:
    set_light_theme()
{{< /code-block >}}

### 数値フラグ {#numeric-flags}

数値フラグには、`get_integer_value` または `get_float_value` を使用します。これらは、制限値、パーセンテージ、倍率などの数値パラメーターに機能が依存する場合に適しています。

{{< code-block lang="python" >}}
max_items = client.get_integer_value("cart-max-items", 20, eval_ctx)

discount_rate = client.get_float_value("discount-rate", 0.0, eval_ctx)
{{< /code-block >}}

### オブジェクトフラグ {#object-flags}

構造化データには、`get_object_value` を使用します。これは、複雑な設定を含む辞書を返します。

{{< code-block lang="python" >}}
config = client.get_object_value("feature-config", {
    "maxRetries": 3,
    "timeout": 30
}, eval_ctx)

max_retries = config.get("maxRetries", 3)
timeout = config.get("timeout", 30)
{{< /code-block >}}

### フラグ評価の詳細 {#flag-evaluation-details}

フラグの値だけでなく詳細情報が必要な場合は、`*_details` メソッドを使用してください。これらは、評価された値と評価内容を説明するメタデータの両方を返します。

{{< code-block lang="python" >}}
details = client.get_boolean_details("new-feature", False, eval_ctx)

print(f"Value: {details.value}")
print(f"Variant: {details.variant}")
print(f"Reason: {details.reason}")
print(f"Error Code: {details.error_code}")
print(f"Error Message: {details.error_message}")
{{< /code-block >}}

フラグの詳細情報は、評価の動作をデバッグしたり、なぜユーザーが特定の値を受け取ったのかを理解したりするのに役立ちます。

### コンテキストなしの評価{#evaluation-without-context}

評価コンテキストを指定せずにフラグを評価することも可能です。これは、ユーザーごとのターゲティングを必要としないグローバルなフラグに役立ちます。

{{< code-block lang="python" >}}
# Global feature flag - no context needed
maintenance_mode = client.get_boolean_value("maintenance-mode", False)

if maintenance_mode:
    return "Service temporarily unavailable"
{{< /code-block >}}

## プロバイダーの初期化待ち{#waiting-for-provider-initialization}

プロバイダー登録では、選択されたソースが最初の設定を配信するまで最大 10 秒間待機します。設定が届くと、プロバイダーは `PROVIDER_READY` を発行します。待機中にタイムアウトが発生した場合、登録は完了しますがプロバイダーはエラー状態となり、設定が届くまでは評価時に呼び出し元が指定したデフォルト値が返されます。後続の準備完了イベントを待機するには、イベントハンドラーを使用してください。

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

# Wait for the provider to be ready if registration timed out
if ready_event.wait(timeout=30):
    print("Provider is ready")
else:
    print("Provider initialization timed out")

# Create client and evaluate flags
client = api.get_client()
{{< /code-block >}}

<div class="alert alert-info">プロバイダーのイベントハンドラーを使用するには、OpenFeature SDK 0.7.0 以降が必要です。ほとんどのアプリケーションでは、デフォルトの 10 秒間の初期化タイムアウトを使用し、設定が利用できない場合には呼び出し元が提供するデフォルト値を処理する設定で対応可能です。</div>

初期化タイムアウトを変更するには、`DD_EXPERIMENTAL_FLAGGING_PROVIDER_INITIALIZATION_TIMEOUT_MS` にミリ秒単位の正の数を設定します。

## 高度な設定{#advanced-configuration}

ソースの選択と運用設定の標準的なリファレンスとして、「[サーバー SDK 設定ソース][6]」を使用してください。

- [エージェントレス配信を設定する][10] (ポーリング、リクエストタイムアウト、エンドポイント設定を含む)
- [カスタムエージェントレスエンドポイントを使用する][7] (高度なテスト、ローカル開発、またはオペレーター管理のプロキシを使用する場合)
- [Agent Remote Configuration を使用する][9] (エージェント管理による配信を維持する場合)
- [既存の Remote Configuration 設定を移行する][8]および非推奨の `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED` 設定を削除する

Agentless モードはフラグ設定のみを変更します。`feature_flag.evaluations`、エクスポージャーロギング、または実験のユースケースの設定や有効化は行いません。これらの機能には、サポートされている Datadog Agent またはサーバーレステレメトリパスが必要です。

## クリーンアップ{#cleanup}

アプリケーションの終了時には、OpenFeature API をシャットダウンしてリソースをクリーンアップしてください。

{{< code-block lang="python" >}}
api.shutdown()
{{< /code-block >}}

## テスト {#testing}

実際の Datadog プロバイダーを使用して Datadog の専用テスト環境でテストを行うか、OpenFeature の `InMemoryProvider` に置き換えてテストコード内で直接フラグ値を制御できます。このセクションでは、テストを独立した状態でオフラインに保つインメモリ方式について説明します。`InMemoryProvider` は `openfeature-sdk` にバンドルされているため、追加の依存関係は不要です。

OpenFeature API はグローバルなシングルトンです (`openfeature.api.set_provider` はモジュールレベルの状態を変更します)。テスト間でフラグの状態が干渉し合わないよう、`function` スコープの pytest フィクスチャを使用し、ティアダウンで `api.shutdown()` を呼び出します。

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
    api.set_provider(InMemoryProvider(flags))
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

`InMemoryFlag` は、`default_variant` (文字列のバリアント名) と `variants` (バリアント名と型付き値をマッピングする辞書) を引数に取ります。バリアント名ではなく値そのものを `default_variant` として渡してしまうのは、よくある間違いです。ターゲティングロジックについては、フラグと `EvaluationContext` を受け取り、選択されたバリアントを含む `FlagResolutionDetails` オブジェクトを返す `context_evaluator` コールバックを渡します。

## トラブルシューティング{#troubleshooting}

### Agentless 設定が機能しない場合{#agentless-configuration-not-working}

以下を確認してください。

- `ddtrace`のバージョンが 4.14.0 以降であること。
- `DD_FEATURE_FLAGS_ENABLED`が設定されていないか、`true` に設定されていること。
- `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE`が設定されていないか、`agentless` に設定されていること。
- `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED`が設定されていないこと。これを `true` に設定すると、明示的なソースが設定されていない移行期間中に Agent Remote Configuration が選択されてしまいます。
- アプリケーションコードが、OpenFeature API に `DataDogProvider` を登録していること。
アプリケーションプロセスで、- `DD_API_KEY`、`DD_SITE`、および `DD_ENV` が設定されていること。
- アプリケーションから Datadog へのアウトバウンド HTTPS リクエストが可能であること。

`DD_TRACE_DEBUG=true` を設定し、Feature Flags のエージェントレスエンドポイントからの認証、タイムアウト、または不正なペイロードに関するメッセージが出ていないかチェックしてください。

### Agent Remote Configuration が機能しない場合{#agent-remote-configuration-not-working}

以下を確認してください。

- `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config` が設定されていること。移行期間中は、明示的なソースが設定されていない場合でも、`DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` によって Remote Configuration が選択されます。
- Datadog Agent のバージョンが 7.55 以降であること。
- Agent で [Remote Configuration][2] が有効になっていること。
- Agent が対象組織の有効な API キーを持っていること。
- `DD_SERVICE`および `DD_ENV` がアプリケーションプロセスで設定されていること。
- SDK が Agent と通信できること。

[1]: https://openfeature.dev/
[2]: /ja/agent/remote_config/
[3]: /ja/account_management/api-app-keys/#api-keys
[4]: /ja/feature_flags/guide/server_flag_evaluation_metrics/
[5]: /ja/feature_flags/concepts/flag_graphs/
[6]: /ja/feature_flags/concepts/configuration_sources/
[7]: /ja/feature_flags/concepts/configuration_sources/#use-a-custom-agentless-endpoint
[8]: /ja/feature_flags/concepts/configuration_sources/#migrate-an-existing-remote-configuration-setup
[9]: /ja/feature_flags/concepts/configuration_sources/#use-agent-remote-configuration
[10]: /ja/feature_flags/concepts/configuration_sources/#configure-agentless-delivery

## 関連資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}