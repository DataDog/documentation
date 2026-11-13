---
description: APM トレースに Feature Flag の評価データを自動的に付与することで、フラグのバリアントごとにトレースを検査およびフィルタリングできます。
further_reading:
- link: /feature_flags/server/
  tag: ドキュメント
  text: サーバー側の Feature Flag
- link: /feature_flags/guide/server_flag_evaluation_metrics/
  tag: ガイド
  text: サーバー側のフラグ評価メトリクスのセットアップ
- link: /tracing/trace_explorer/
  tag: ドキュメント
  text: Trace Explorer
title: Feature Flag の APM トレースエンリッチメントのセットアップ
---
## 概要 {#overview}

APM トレースエンリッチメントは、Feature Flag の評価データを APM トレースに自動的に付与します。トレースされたリクエスト中に Feature Flag が評価されると、SDK はどのフラグが評価され、どのバリアントが返されたかを記録します。このデータはルートスパンに書き込まれ、サーバー側で処理されるため、次のことが可能になります。

- **`@feature_flags.<flag_key>:<variant>` ファセットを使用して、[Trace Explorer][1] でフラグバリアントごとにトレースをフィルタリングする。**
- **エラー発生時にどのフラグがアクティブであったかを確認して、フラグ関連の問題をデバッグする。**

<div class="alert alert-warning">APM トレースエンリッチメントは実験的な機能であり、将来のリリースで変更される可能性があります。</div>

APM トレースエンリッチメントは、次の SDK で利用可能です。

| 言語 | 最小バージョン |
| -------- | --------------- |
| Go       | 2.8.0           |
| Java     | 1.64.1          |
| Node.js  | 5.105.0         |

## 前提条件 {#prerequisites}

APM トレースエンリッチメントをセットアップする前に、次のことを確認してください。

- サーバー側の Feature Flag がすでに構成されており、アプリケーションでフラグが評価されていること。
- [APM トレーシング][3]が有効になっており、トレースが Datadog に送信されていること。

## APM トレースエンリッチメントの仕組み{#how-apm-trace-enrichment-works}

APM トレースエンリッチメントが有効になると、Datadog OpenFeature プロバイダーが評価ライフサイクルにフックします。

1. フラグが評価されるたびに、SDK は評価メタデータ (フラグシリアル ID、ターゲティングキー、デフォルトのフォールバック値) をキャプチャします。
2. メタデータは、現在のトレースのルートスパンに蓄積されます。
3. ルートスパンが終了すると、SDK は蓄積されたデータをコンパクトなスパンタグ (`ffe_flags_enc`、`ffe_subjects_enc`、`ffe_runtime_defaults`) として書き込みます。
4. Datadog バックエンドはこれらのタグをデコードし、人間が読める形式の `@feature_flags.<flag_key>` ファセットをスパンに書き込むため、Trace Explorer で検索できるようになります。

SDK 側のタグは転送専用であり、サーバー側で削除されます。Trace Explorer で確認できるタグは、デコードされた `@feature_flags.<flag_key>` ファセットです。

## APM トレースエンリッチメントを有効にする{#enable-apm-trace-enrichment}

スパンエンリッチメントを有効にするには、次の環境変数を設定します。

{{< code-block lang="bash" >}}
DD_EXPERIMENTAL_FLAGGING_PROVIDER_SPAN_ENRICHMENT_ENABLED=true
{{< /code-block >}}

エンリッチメント環境変数は、サポートされているすべてのサーバー側の SDK でサポートされています。コードの変更は必要ありません。この変数を有効にすると、Datadog OpenFeature プロバイダーの初期化時にエンリッチメントフックが自動的にアクティブになります。Node.js は、下記の言語タブに示すように、コードレベルの構成もサポートしています。

### 言語固有の構成{#language-specific-configuration}

{{< tabs >}}
{{% tab "Go" %}}

追加のコード構成は必要ありません。`DD_EXPERIMENTAL_FLAGGING_PROVIDER_SPAN_ENRICHMENT_ENABLED` 環境変数により、`DatadogProvider` の初期化時にスパンエンリッチメントが有効になります。

{{< code-block lang="go" filename="main.go" >}}
package main

import (
    "log"

    "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
    ddopenfeature "github.com/DataDog/dd-trace-go/v2/openfeature"
    "github.com/open-feature/go-sdk/openfeature"
)

func main() {
    tracer.Start()
    defer tracer.Stop()

    provider, err := ddopenfeature.NewDatadogProvider(ddopenfeature.ProviderConfig{})
    if err != nil {
        log.Fatalf("Failed to create provider: %v", err)
    }
    if ddProvider, ok := provider.(*ddopenfeature.DatadogProvider); ok {
        defer ddProvider.Shutdown()
    }

    if err := openfeature.SetProviderAndWait(provider); err != nil {
        log.Fatalf("Failed to set provider: %v", err)
    }

    client := openfeature.NewClient("my-service")
    // Flag evaluations now enrich APM spans automatically
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

追加のコード構成は必要ありません。`DD_EXPERIMENTAL_FLAGGING_PROVIDER_SPAN_ENRICHMENT_ENABLED` 環境変数により、スパンエンリッチメントが有効になります。Java は代替手段としてシステムプロパティ `-Ddd.experimental.flagging.provider.span.enrichment.enabled=true` もサポートしています。

{{< code-block lang="java" filename="Main.java" >}}
import dev.openfeature.sdk.OpenFeatureAPI;
import dev.openfeature.sdk.Client;
import datadog.trace.api.openfeature.Provider;

OpenFeatureAPI api = OpenFeatureAPI.getInstance();
api.setProviderAndWait(new Provider());
Client client = api.getClient("my-app");
// Flag evaluations now enrich APM spans automatically
{{< /code-block >}}

{{% /tab %}}
{{% tab "Node.js" %}}

コードでスパンエンリッチメントを有効にすることもできます。

{{< code-block lang="javascript" filename="app.js" >}}
import tracer from 'dd-trace';

tracer.init({
  experimental: {
    flaggingProvider: {
      enabled: true,
      spanEnrichment: {
        enabled: true,
      },
    },
  },
});
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## APM トレースエンリッチメントを確認する {#verify-apm-trace-enrichment}

スパンエンリッチメントを有効にしてデプロイした後:

1. アプリケーションで Feature Flag を評価するリクエストをトリガーします。
2. [Trace Explorer][1] に移動し、サービスからの最近のトレースを検索します。
3. トレースを開き、ルートスパンで `@feature_flags.<flag_key>` 属性を探します。

SDK は、コンパクトにエンコードされたタグ (`ffe_flags_enc`、`ffe_subjects_enc`、`ffe_runtime_defaults`) をルートスパンに書き込みます。Datadog バックエンドはこれらをデコードし、人間が読める形式の `@feature_flags.<flag_key>` ファセットを生成します。この処理は、スパンが取り込まれてから数秒かかります。

バックエンド処理の後、ルートスパンには次のような属性が含まれます。

| 属性の例 | 値の例 |
| --------- | ------------- |
| `@feature_flags.checkout-flow` | `treatment` |
| `@feature_flags.dark-mode` | `control` |

各属性のキーは `@feature_flags.<flag_key>` であり、値は評価によって返されたバリアントです。

### トラブルシューティング {#troubleshooting}

トレースに `@feature_flags.<flag_key>` 属性が表示されない場合:

- スパンエンリッチメントが有効になっていることを確認してください (`DD_EXPERIMENTAL_FLAGGING_PROVIDER_SPAN_ENRICHMENT_ENABLED=true`)。
- アプリケーションがトレースされたリクエスト中に Feature Flag を評価していることを確認してください。エンリッチメントは、トレースがアクティブな間に Feature Flag が評価された場合にのみ発生します。
- スパンが取り込まれてから数秒待機してください。`@feature_flags.<flag_key>` ファセットはバックエンド処理によって導出されるものであり、生のスパンメタデータには表示されません。
- デバッグを行うには、生のスパンメタデータで `ffe_flags_enc` タグを調査してください。このタグが存在する場合、SDK はエンリッチメントデータを出力しています。バックエンドがまだ処理していないか、組織で Feature Flag ゲートが有効になっていないかのいずれかです。
- フラグがまったく評価されない場合は、セットアップおよび言語固有のトラブルシューティングについて[サーバー側の Feature Flag][2] を参照してください。

## フラグバリアントで検索およびフィルタリングする {#search-and-filter-by-flag-variant}

下記の例では、`@feature_flags.<flag_key>` ファセットを使用して Trace Explorer でトレースをフィルタリングします。

| ユースケース | クエリ例 |
| -------- | ------------- |
| 特定のバリアントのトレース | `@feature_flags.checkout-flow:treatment` |
| バリアント配下のエラー | `@feature_flags.checkout-flow:treatment status:error` |
| フラグが評価されたすべてのトレース | `@feature_flags.checkout-flow:*` |
| 同じリクエスト上の複数のフラグ | `@feature_flags.checkout-flow:treatment @feature_flags.new-search:enabled` |
| サービスおよび環境にスコープ設定 | `env:production service:api-gateway @feature_flags.rate-limit-v2:enabled` |

## Datadog 全体でエンリッチされたトレースを使用する {#use-enriched-traces-across-datadog}

トレース上の Feature Flag 属性は、Datadog 全体で利用可能です。

- **モニター**: 特定のバリアントのエラー数がしきい値を超えたときにアラートを送信して、バリアント固有のリグレッションを検知します。
- **ダッシュボード**: `@feature_flags.<flag_key>` をグループ化のディメンションとして使用し、バリアント間で p99 レイテンシーを比較する時系列ウィジェットを追加します。
- **ノートブック**: Feature Flag のバリアント間でパフォーマンスを比較する調査ノートブックを作成します。
- **視覚化**: Trace Explorer のトップリストを使用して、ロールアウトのトラフィック分散がターゲティングルールと一致していることを確認します。

## 制限事項 {#limits}

SDK は、ペイロードサイズを制限するために、スパンごとに次の制限を適用します。

| 制限 | 値 |
| ----- | ----- |
| スパンごとのフラグシリアル ID | 128〜200 (SDK によって異なる) |
| スパンごとのサブジェクト | 10〜25 (SDK によって異なる) |
| スパンごとのランタイムデフォルトキー | 5 |
| ランタイムデフォルト値の長さ | 64 文字 (切り捨て) |

これらの制限を超える評価は、そのスパンについては破棄されます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_explorer/
[2]: /ja/feature_flags/server/
[3]: /ja/tracing/