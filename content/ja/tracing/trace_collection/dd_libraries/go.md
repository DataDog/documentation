---
aliases:
- /ja/tracing/go/
- /ja/tracing/languages/go
- /ja/agent/apm/go/
- /ja/tracing/setup/go
- /ja/tracing/setup_overview/go
- /ja/tracing/setup_overview/setup/go
code_lang: go
code_lang_weight: 20
further_reading:
- link: https://github.com/DataDog/dd-trace-go/tree/v1
  tag: GitHub
  text: ソースコード
- link: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace
  tag: GoDoc
  text: パッケージページ
- link: /tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースを調査する
kind: documentation
title: Go アプリケーションのトレース
type: multi-code-lang
---

## 互換性要件

Go トレーサーは、Go `1.17+` と Datadog Agent `>= 5.21.1` が必要です。Datadog の Go バージョンとフレームワークのサポート一覧 (レガシーバージョンとメンテナンスバージョンを含む) については、[互換性要件][1]ページを参照してください。

## インストールと利用開始

### アプリ内のドキュメントに従ってください (推奨)

Datadog アプリ内の[クイックスタート手順][7]に従って、最高のエクスペリエンスを実現します。例:

- デプロイコンフィギュレーション (ホスト、Docker、Kubernetes、または Amazon ECS) を範囲とする段階的な手順。
- `service`、`env`、`version` タグを動的に設定します。
- セットアップ中に Continuous Profiler、トレースの 100% 取り込み、およびトレース ID のログへの挿入を有効にします。

それ以外の場合は、以下の指示に従って、Datadog トレーシングライブラリをコードに追加し、Go インテグレーションを開始します。

### APM に Datadog Agent を構成する

インスツルメントされたアプリケーションからトレースを受信するように Datadog Agent をインストールして構成します。デフォルトでは、Datadog Agent は `apm_config` 下にある  `datadog.yaml` ファイルの `enabled: true` で有効になっており、`localhost:8126` でトレーストラフィックをリッスンします。コンテナ化環境の場合、以下のリンクに従って、Datadog Agent 内でトレース収集を有効にします。

{{< tabs >}}
{{% tab "コンテナ" %}}

1. メイン [`datadog.yaml` コンフィギュレーションファイル][1]の `apm_config` セクションで `apm_non_local_traffic: true` を設定します。

2. コンテナ化された環境でトレースを受信するように Agent を構成する方法については、それぞれの説明を参照してください。

{{< partial name="apm/apm-containers.html" >}}
</br>

3. アプリケーションがインスツルメントされた後、トレースクライアントはデフォルトで Unix ドメインソケット `/var/run/datadog/apm.socket` にトレースを送信しようとします。ソケットが存在しない場合、トレースは `http://localhost:8126` に送信されます。

   同様のルールが Go トレーサーから送られる全てのメトリクス (ランタイムメトリクスや内部テレメトリを含む) に適用されます。クライアントは Dogstatsd データを Unix ドメインソケット `/var/run/datadog/dsd.socket` に送信しようとし、それが存在しない場合は `http://localhost:8125` をデフォルトとします。

   異なるホストやポートが必要な場合は、以下の環境変数を 1 つ以上使用します。この例ではデフォルト値を示していますが、他の値に設定することもできます。

   ```
   DD_AGENT_HOST=localhost   # The host to send traces and metrics to. Defaults to localhost.
   DD_TRACE_AGENT_PORT=8126  # The port to send traces to. Defaults to 8126.
   DD_DOGSTATSD_PORT=8125    # The port to send Dogstatsd metrics to. Defaults to 8125.
   ```

{{< site-region region="us3,us5,eu,gov" >}}

4. Datadog Agent の `DD_SITE` を {{< region-param key="dd_site" code="true" >}} に設定して、Agent が正しい Datadog の場所にデータを送信するようにします。

{{< /site-region >}}

[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "AWS Lambda" %}}

AWS Lambda で Datadog APM を設定するには、[サーバーレス関数のトレース][1]ドキュメントを参照してください。


[1]: /ja/tracing/serverless_functions/
{{% /tab %}}
{{% tab "その他の環境" %}}

トレースは、[Heroku][1]、[Cloud Foundry][2]、[AWS Elastic Beanstalk][3]、[Azure App Service][4] など、他の多くの環境で利用できます。

その他の環境については、その環境の[インテグレーション][5]のドキュメントを参照し、セットアップの問題が発生した場合は[サポートにお問い合わせ][6]ください。

[1]: /ja/agent/basic_agent_usage/heroku/#installation
[2]: /ja/integrations/cloud_foundry/#trace-collection
[3]: /ja/integrations/amazon_elasticbeanstalk/
[4]: /ja/infrastructure/serverless/azure_app_services/#overview
[5]: /ja/integrations/
[6]: /ja/help/
{{% /tab %}}
{{< /tabs >}}

## Go インテグレーションを有効にしてスパンを作成する

Datadog には、一連のライブラリとフレームワークをインスツルメントするためにすぐに使用できるサポートを提供する一連の接続可能パッケージがあります。このパッケージのリストは、[互換性要件][1]ページにあります。アプリケーションにこのパッケージをインポートし、各[インテグレーション][1]と併せて掲載されているコンフィギュレーション手順に従ってください。

## ライブラリ構成

必要に応じて、統合サービスタグ付けの設定など、アプリケーションパフォーマンスのテレメトリーデータを送信するためのトレースライブラリーを構成します。詳しくは、[ライブラリの構成][8]を参照してください。

コンフィギュレーションおよび API の使用の詳細については、Datadog の [API ドキュメント][2]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/compatibility_requirements/go
[2]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace
[3]: /ja/tracing/glossary/
[4]: https://github.com/DataDog/dd-trace-go/tree/v1#contributing
[5]: https://github.com/DataDog/dd-trace-go/tree/v1/MIGRATING.md
[6]: /ja/profiler/enabling/?code-lang=go
[7]: https://app.datadoghq.com/apm/docs
[8]: /ja/tracing/trace_collection/library_config/go/