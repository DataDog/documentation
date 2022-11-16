---
タイトル: Go アプリケーションのトレース
種類: ドキュメント
エイリアス:
  - /tracing/go/
  - /tracing/languages/go
  - /agent/apm/go/
further_reading:
  - リンク: 'https://github.com/DataDog/dd-trace-go/tree/v1'
    タグ: GitHub
    テキスト: ソースコード
  - リンク: 'https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace'
    タグ: GoDoc
    テキスト: パッケージページ
  - リンク: /tracing/visualization/
    タグ: ドキュメント
    テキスト: サービス、リソース、トレースを調査する
  - リンク: /tracing/
    タグ: 高度な使用方法
    テキスト: 高度な使用方法
---
## 互換性要件

Go トレーサーには、Go `1.12+` および Datadog Agent `>= 5.21.1` が必要です。サポートするライブラリの一覧については、[互換性要件][1]ページをご覧ください。

## インストールと利用開始

API の使用に関する構成手順と詳細については、Datadog [API ドキュメント][2]を参照してください。手動インスツルメンテーションについては、自動インスツルメンテーションをサポートする Go ライブラリおよびフレームワークについて、以下の[インテグレーションセクション](#integrations)を使用してください。

APM で使用される用語の説明については、[「APM を開始する」セクション][3]を参照してください。寄稿の詳細については、公式リポジトリ [README.md][4] を確認してください。

古いバージョンのトレーサー（例: v<0.6.x）から最新バージョンに移行する必要がある場合は、[移行ドキュメント][5]を参照してください。

### インストール

#### アプリ内のドキュメントに従ってください (推奨)

Datadog アプリ内の[クイックスタート手順][6]に従って、最高のエクスペリエンスを実現します。例:

- デプロイコンフィギュレーション (ホスト、Docker、Kubernetes、または Amazon ECS) を範囲とする段階的な手順。
- `service`、`env`、`version` タグを動的に設定します。
- セットアップ中に Continuous Profiler、App Analytics、およびトレース ID 挿入を有効にします。

あるいは [Datadog Agent をインストール、構成][7]します。[Docker アプリケーションのトレース][8]または [Kubernetes アプリケーションのトレース][9]に関する追加ドキュメントを確認します。

次に、正規のインポートパスから Go トレーサーをインストールします。

```go
go get gopkg.in/DataDog/dd-trace-go.v1/...
```

これで、トレーサーをインポートして、コードのインスツルメンテーションを開始する準備ができました。

## 自動でデータと収集

Datadog には、一連のライブラリとフレームワークをインスツルメントするためにすぐに使用できるサポートを提供する一連の接続可能パッケージがあります。このパッケージのリストは、[互換性要件][1]ページにあります。このインテグレーションをトレースするには、アプリケーションにパッケージをインポートし、各[インテグレーション][1]と併せて掲載されているコンフィギュレーション手順に従ってください。



## コンフィギュレーション

Go トレーサーは、コンフィギュレーション用の追加の環境変数と関数をサポートしています。
[コンフィギュレーションドキュメント][10]で利用可能なすべてのオプションを参照してください。

サービスに `env`、`service`、`version` を設定するには、`DD_ENV`、`DD_SERVICE`、`DD_VERSION` を使用することを強くおすすめします。
このような環境変数の推奨構成方法については、[統合サービスタグ付け][11]のドキュメントをご参照ください。変数は、Go トレーサーのバージョン 1.24.0 以降で利用可能です。

トレーサーの API を通じて、`env`、`service`、`version` を指定することもできます。

```go
package main

import (
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    tracer.Start(
        tracer.WithEnv("prod"),
        tracer.WithService("test-go"),
        tracer.WithServiceVersion("abc123"),
    )

    // トレーサーが停止すると、終了する前にトレーサー内のすべてのデータが Datadog Agent にフラッシュされます。
    // この行は主要な関数内に残すようにしてください。
    defer tracer.Stop()
}
```

### Agent ホスト名の変更

Go Tracing Module が自動的に検索し環境変数の `DD_AGENT_HOST` や `DD_AGENT_APM_PORT` で初期化します。

ただし、コードでカスタムホスト名およびポートを設定することもできます。

```go
package main

import (
    "net"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    addr := net.JoinHostPort(
        "custom-hostname",
        "1234",
    )
    tracer.Start(tracer.WithAgentAddr(addr))
    defer tracer.Stop()
}
```

## APM 環境名の構成

[APM 環境名][12]は、[Agent 内][13]またはトレーサーの [WithEnv][10] スタートオプションを使用して構成できます。

### B3 ヘッダーの抽出と挿入

Datadog APM トレーサーは、分散型トレーシングの [B3 ヘッダーの抽出][74]と挿入をサポートしています。

分散したヘッダーの挿入と抽出は、挿入/抽出スタイルを構成することで制御されます。`Datadog` と `B3` の 2 つのスタイルがサポートされています。

以下の環境変数を使用して挿入スタイルを構成します
`DD_PROPAGATION_STYLE_INJECT=Datadog,B3`

以下の環境変数を使用して抽出スタイルを構成します
`DD_PROPAGATION_STYLE_EXTRACT=Datadog,B3`

これらの環境変数の値は、挿入または抽出が有効になっているヘッダースタイルのコンマ区切りリストです。デフォルトでは、`Datadog` 抽出スタイルのみが有効になっています。

複数の抽出スタイルが有効な場合、それらのスタイルが指定されている順序で抽出が試行されます。最初に正常に抽出された値が使用されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/compatibility_requirements/go
[2]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace
[3]: /ja/tracing/visualization/
[4]: https://github.com/DataDog/dd-trace-go/tree/v1#contributing
[5]: https://github.com/DataDog/dd-trace-go/tree/v1/MIGRATING.md
[6]: https://app.datadoghq.com/apm/service-setup
[7]: /ja/tracing/send_traces/
[8]: /ja/tracing/setup/docker/
[9]: /ja/agent/kubernetes/apm/
[10]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#StartOption
[11]: /ja/getting_started/tagging/unified_service_tagging
[12]: /ja/tracing/advanced/setting_primary_tags_to_scope/#environment
[13]: /ja/getting_started/tracing/#environment-name
