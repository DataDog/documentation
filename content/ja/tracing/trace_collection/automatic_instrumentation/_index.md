---
algolia:
  tags:
  - APM 自動インスツルメンテーション
further_reading:
- link: /tracing/glossary/
  tag: ドキュメント
  text: APM の用語と概念
- link: https://www.datadoghq.com/architecture/instrument-your-app-using-the-datadog-operator-and-admission-controller/
  tag: アーキテクチャセンター
  text: Datadog Operator と Admission Controller を使用してアプリケーションをインスツルメントする
title: 自動でデータと収集
---

## 概要

自動インスツルメンテーションにより、アプリケーション用のスパンを自動的に作成できます。これにより、標準的な操作や広く利用されているフレームワークから可観測性データを最小限の手動作業で取得することが可能です。[Single Step Instrumentation][5] を使用して Datadog Agent をインストールする場合や、[Datadog トレーシングライブラリを手動で追加][6]する場合に、アプリケーションを自動的にインスツルメントできます。

## ユースケース

自動インスツルメンテーションを使用するシチュエーションの例としては、以下が挙げられます。

- 一般的なライブラリや言語全体で必要不可欠な可観測性データを、最小限の構成で取得したい場合
- あらかじめ設定された構成によるリアルタイムモニタリングを有効にし、アプリケーションのパフォーマンスに即時の洞察を得たい場合
- [カスタムインスツルメンテーション][7]が必要ないプロジェクトで、可観測性のセットアップを簡素化したい場合

## はじめに

自動インスツルメンテーションのアプローチについて詳しく知りたい場合は、該当するドキュメントを参照してください。

{{< tabs >}}
{{% tab "Single Step Instrumentation" %}}

**Enable APM Instrumentation (beta)** オプションを選択して Datadog Agent をインストールまたは更新すると、APM を有効にするように Agent がインストールおよび構成されます。これにより、追加のインストールや構成手順なしでアプリケーションを自動的にインスツルメントすることが可能になります。

はじめに、[Single Step Instrumentation][1] のドキュメントをお読みください。

[1]: /ja/tracing/trace_collection/automatic_instrumentation/single-step-apm

{{% /tab %}}

{{% tab "Datadog ライブラリ" %}}

Datadog ライブラリを使用してアプリケーションを自動的にインスツルメントするには

1. [Agent をインストールして構成します](#install-and-configure-the-agent)。
2. [Datadog のトレーシングライブラリをコードに追加](#instrument-your-application)します。

### Agent のインストールと構成

インスツルメントしたアプリケーションからトレースを受信するように Datadog Agent をインストールおよび構成します。デフォルトでは、Datadog Agent は `datadog.yaml` ファイルの `apm_config` セクションで `enabled: true` と設定されており、`http://localhost:8126` でトレースデータをリッスンしています。

コンテナ化された環境の場合は、以下のリンクを参照して Datadog Agent 内でトレースの収集を有効にしてください。

#### コンテナ

1. メイン [`datadog.yaml` コンフィギュレーションファイル][8]の `apm_config` セクションで `apm_non_local_traffic: true` を設定します。
2. コンテナ化された環境でトレースを受信するように Agent を構成する方法については、それぞれの説明を参照してください。

{{< partial name="apm/apm-containers.html" >}}

</br>

3. トレースクライアントはデフォルトで Unix ドメインソケット `/var/run/datadog/apm.socket` にトレースを送信しようとします。ソケットが存在しない場合、トレースは `http://localhost:8126` に送信されます。

   別のソケット、ホスト、またはポートが必要な場合は、環境変数 `DD_TRACE_AGENT_URL` を使用します。例:

   ```
   DD_TRACE_AGENT_URL=http://custom-hostname:1234
   DD_TRACE_AGENT_URL=unix:///var/run/datadog/apm.socket

   ```

   同様に、トレースクライアントは Unix ドメインソケット `/var/run/datadog/dsd.socket` に統計情報を送信しようと試みます。ソケットが存在しない場合、統計情報は `http://localhost:8125` に送信されます。

{{< site-region region="us3,us5,eu,gov,ap1" >}}

4. Datadog Agent の `DD_SITE` を {{< region-param key="dd_site" code="true" >}} に設定して、Agent が正しい Datadog の場所にデータを送信するようにします。

{{< /site-region >}}

#### AWS Lambda

AWS Lambda で Datadog APM を設定するには、[サーバーレス関数のトレース][9]ドキュメントを参照してください。

#### 他の環境について

トレースは、[Heroku][10]、[Cloud Foundry][11]、[AWS Elastic Beanstalk][12]、[Azure App Service][13] など、他のいくつかの環境で利用できます。

その他の環境については、その環境の[インテグレーション][14]のドキュメントを参照し、セットアップの問題が発生した場合は[サポートにお問い合わせ][15]ください。

### アプリケーションをインスツルメントする

次の公式 Datadog トレースライブラリのいずれかを使用してトレースを送信するようにアプリケーションを構成します。

{{< partial name="apm/apm-languages.html" >}}

<br>

公式ライブラリでサポートされていない言語で記述されたアプリケーションをインスツルメントする場合は、[コミュニティトレーシングライブラリ][1]のリストを参照してください。

[1]: /ja/developers/community/libraries/#apm-tracing-client-libraries
[8]: /ja/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[9]: /ja/tracing/serverless_functions/
[10]: /ja/agent/basic_agent_usage/heroku/#installation
[11]: /ja/integrations/cloud_foundry/#trace-collection
[12]: /ja/integrations/amazon_elasticbeanstalk/
[13]: /ja/infrastructure/serverless/azure_app_services/#overview
[14]: /ja/integrations/
[15]: /ja/help/
{{% /tab %}}
{{< /tabs >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}


[2]: /ja/tracing/trace_collection/custom_instrumentation/dd_libraries/
[3]: /ja/tracing/trace_collection/custom_instrumentation/otel_instrumentation
[4]: /ja/tracing/trace_collection/custom_instrumentation/opentracing/
[5]: /ja/tracing/trace_collection/automatic_instrumentation/single-step-apm
[6]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/
[7]: /ja/tracing/trace_collection/custom_instrumentation/