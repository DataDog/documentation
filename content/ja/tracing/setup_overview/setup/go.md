---
title: Go アプリケーションのトレース
kind: documentation
aliases:
  - /ja/tracing/go/
  - /ja/tracing/languages/go
  - /ja/agent/apm/go/
  - /ja/tracing/setup/go
  - /ja/tracing/setup_overview/go
code_lang: go
type: multi-code-lang
code_lang_weight: 20
further_reading:
  - link: 'https://github.com/DataDog/dd-trace-go/tree/v1'
    tag: GitHub
    text: ソースコード
  - link: 'https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace'
    tag: GoDoc
    text: パッケージページ
  - link: /tracing/visualization/
    tag: Documentation
    text: サービス、リソース、トレースを調査する
  - link: /tracing/
    tag: 高度な使用方法
    text: 高度な使用方法
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
- セットアップ中に Continuous Profiler、トレースの 100% 取り込み、およびトレース ID のログへの挿入を有効にします。


それ以外の場合は、以下の指示に従って、Datadog トレーシングライブラリをコードに追加します。

## 自動インスツルメンテーション

Datadog には、一連のライブラリとフレームワークをインスツルメントするためにすぐに使用できるサポートを提供する一連の接続可能パッケージがあります。このパッケージのリストは、[互換性要件][1]ページにあります。このインテグレーションをトレースするには、アプリケーションにパッケージをインポートし、各[インテグレーション][1]と併せて掲載されているコンフィギュレーション手順に従ってください。

## コンフィギュレーション

Go トレーサーは、コンフィギュレーション用の追加の環境変数と関数をサポートしています。
[コンフィギュレーションドキュメント][7]で利用可能なすべてのオプションを参照してください。

サービスに `env`、`service`、`version` を設定するには、`DD_ENV`、`DD_SERVICE`、`DD_VERSION` を使用することを強くおすすめします。
このような環境変数の推奨構成方法については、[統合サービスタグ付け][8]のドキュメントをご参照ください。変数は、Go トレーサーのバージョン 1.24.0 以降で利用可能です。

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

### APM に Datadog Agent を構成する

インスツルメントされたアプリケーションからトレースを受信するように Datadog Agent をインストールして構成します。デフォルトでは、Datadog Agent は `apm_config` 下にある  `datadog.yaml` ファイルの `enabled: true` で有効になっており、`localhost:8126` でトレーストラフィックをリッスンします。コンテナ化環境の場合、以下のリンクに従って、Datadog Agent 内でトレース収集を有効にします。

{{< tabs >}}
{{% tab "コンテナ" %}}

1. メイン [`datadog.yaml` コンフィギュレーションファイル][1]の `apm_config` セクションで `apm_non_local_traffic: true` を設定します。

2. コンテナ化された環境でトレースを受信するように Agent を構成する方法については、それぞれの説明を参照してください。

{{< partial name="apm/apm-containers.html" >}}
</br>

3. アプリケーションをインスツルメント化した後、トレースクライアントはデフォルトでトレースを `localhost:8126` に送信します。これが正しいホストとポートでない場合は、以下の環境変数を設定して変更します。

   `DD_AGENT_HOST` と `DD_TRACE_AGENT_PORT`

   カスタムホスト名およびポートは、コードで設定することもできます。

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
{{< site-region region="us3,eu,gov" >}} 

4. Datadog Agent の `DD_SITE` を {{< region-param key="dd_site" code="true" >}} に設定して、Agent が正しい Datadog の場所にデータを送信するようにします。

{{< /site-region >}}

[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "AWS Lambda" %}}

AWS Lambda で Datadog APM を設定するには、[サーバーレス関数のトレース][1]ドキュメントを参照してください。


[1]: /ja/tracing/serverless_functions/
{{% /tab %}}
{{% tab "その他の環境" %}}

トレースは、[Heroku][1]、[Cloud Foundry][2]、[AWS Elastic Beanstalk][3]、[Azure App Services Extension][4] など、他の多くの環境で利用できます。

その他の環境については、その環境の[インテグレーション][5]のドキュメントを参照し、セットアップの問題が発生した場合は[サポートにお問い合わせ][6]ください。

[1]: /ja/agent/basic_agent_usage/heroku/#installation
[2]: /ja/integrations/cloud_foundry/#trace-collection
[3]: /ja/integrations/amazon_elasticbeanstalk/
[4]: /ja/infrastructure/serverless/azure_app_services/#overview
[5]: /ja/integrations/
[6]: /ja/help/
{{% /tab %}}
{{< /tabs >}}

## APM 環境名の構成

[APM 環境名][9]は、[Agent 内][10] またはトレーサーの [WithEnv][7] スタートオプションを使用して構成できます。

### B3 ヘッダーの抽出と挿入

Datadog APM トレーサーは、分散型トレーシングの [B3 ヘッダーの抽出][11]と挿入に対応しています。

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
[6]: https://app.datadoghq.com/apm/docs
[7]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#StartOption
[8]: /ja/getting_started/tagging/unified_service_tagging
[9]: /ja/tracing/advanced/setting_primary_tags_to_scope/#environment
[10]: /ja/getting_started/tracing/#environment-name
[11]: https://github.com/openzipkin/b3-propagation