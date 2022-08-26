---
aliases:
- /ja/tracing/nodejs/
- /ja/tracing/languages/nodejs/
- /ja/tracing/languages/javascript/
- /ja/tracing/setup/javascript/
- /ja/agent/apm/nodejs/
- /ja/tracing/setup/nodejs
- /ja/tracing/setup_overview/nodejs
- /ja/tracing/setup_overview/setup/nodejs
code_lang: nodejs
code_lang_weight: 30
further_reading:
- link: https://github.com/DataDog/dd-trace-js
  tag: GitHub
  text: ソースコード
- link: https://datadog.github.io/dd-trace-js
  tag: ドキュメント
  text: API ドキュメント
- link: tracing/glossary/
  tag: APM の UI を利用する
  text: サービス、リソース、トレースを調査する
- link: tracing/
  tag: 高度な使用方法
  text: 高度な使用方法
kind: documentation
title: Node.js アプリケーションのトレース
type: multi-code-lang
---
## 互換性要件

最新の Node.js トレーサーは、バージョン `>=14` に対応しています。Datadog の Node.js バージョンとフレームワークのサポート一覧 (レガシーバージョンとメンテナンスバージョンを含む) については、[互換性要件][1]ページをご覧ください。

## インストールと利用開始

### アプリ内のドキュメントに従ってください (推奨)

Datadog アプリ内の[クイックスタート手順][3]に従って、最高のエクスペリエンスを実現します。例:

- デプロイコンフィギュレーション (ホスト、Docker、Kubernetes、または Amazon ECS) を範囲とする段階的な手順。
- `service`、`env`、`version` タグを動的に設定します。
- セットアップ中に Continuous Profiler、トレースの 100% の取り込み、およびトレース ID 挿入を有効にします。

### APM に Datadog Agent を構成する

インスツルメントされたアプリケーションからトレースを受信するように Datadog Agent をインストールして構成します。デフォルトでは、Datadog Agent は `apm_config` 下にある  `datadog.yaml` ファイルの `enabled: true` で有効になっており、`localhost:8126` でトレーストラフィックをリッスンします。コンテナ化環境の場合、以下のリンクに従って、Datadog Agent 内でトレース収集を有効にします。

{{< tabs >}}
{{% tab "コンテナ" %}}

1. メイン [`datadog.yaml` コンフィギュレーションファイル][1]の `apm_config` セクションで `apm_non_local_traffic: true` を設定します。

2. コンテナ化された環境でトレースを受信するように Agent を構成する方法については、それぞれの説明を参照してください。

{{< partial name="apm/apm-containers.html" >}}
</br>

3. トレースクライアントは、デフォルトでは `localhost:8126` にトレースを送信します。これが Agent の正しいホストとポートでない場合、以下を実行して `DD_AGENT_HOST` と `DD_TRACE_AGENT_PORT` 環境変数を設定してください。

    ```sh
    DD_AGENT_HOST=<HOSTNAME> DD_TRACE_AGENT_PORT=<PORT> node server
    ```

   Unix ドメインソケットを使用するには、URL 全体を一つの環境変数 `DD_TRACE_AGENT_URL` として指定します。

    ```sh
    DD_TRACE_AGENT_URL=unix:<SOCKET_PATH> node server
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

トレースは、[Heroku][1]、[Cloud Foundry][2]、[AWS Elastic Beanstalk][3]、[Azure App Service][4] など、他の環境で利用できます。

その他の環境については、その環境の[インテグレーション][5]のドキュメントを参照し、セットアップの問題が発生した場合は[サポートにお問い合わせ][6]ください。

[1]: /ja/agent/basic_agent_usage/heroku/#installation
[2]: /ja/integrations/cloud_foundry/#trace-collection
[3]: /ja/integrations/amazon_elasticbeanstalk/
[4]: /ja/infrastructure/serverless/azure_app_services/#overview
[5]: /ja/integrations/
[6]: /ja/help/
{{% /tab %}}
{{< /tabs >}}


初期化のオプションについては、[トレーサー設定][3]をお読みください。

### アプリケーションをインスツルメントする

Agent のインストールが完了したら、以下の手順で Datadog のトレーシングライブラリを Node.js アプリケーションに追加します。

1. Node.js 14 以降に対応する npm を使用して Datadog Tracing ライブラリをインストールします。

    ```sh
    npm install dd-trace --save
    ```
   発売終了済みの Node.js バージョン 12 をトレースしたい場合は、以下を実行して `dd-trace` のバージョン 2.x をインストールしてください。
    ```
    npm install dd-trace@latest-node12
    ```
   ディストリビューションタグおよび Node.js のランタイムばージョンサポートについて詳しくは、[互換性要件][1] ページを参照してください。

2. コードまたはコマンドライン引数を使用して、トレーサーをインポートして初期化します。Node.js トレースライブラリは、他のモジュールの**前**にインポートして初期化する必要があります。

   セットアップが完了した後、Web リクエストの URL ルートの欠落、スパンの切断または欠落など、完全なトレースを受信していない場合は、**ステップ 2 が正しく行われたことを確認してください**。最初に初期化されるトレースライブラリは、トレーサーが自動インスツルメンテーションに必要なすべてのライブラリに適切にパッチを適用するために必要です。

   TypeScript、Webpack、Babel などのトランスパイラーを使用する場合は、トレーサーライブラリを外部ファイルにインポートして初期化し、アプリケーションをビルドするときにそのファイル全体をインポートします。

### コードにトレーサーを追加する

#### JavaScript

```js
// この行は、インスツルメントされたいずれのモジュールのインポートより前である必要があります。
const tracer = require('dd-trace').init();
```

#### TypeScript とバンドラー

EcmaScript モジュール構文をサポートする TypeScript およびバンドラーの場合、正しいロード順序を維持するために、別のファイルでトレーサーを初期化します。

```typescript
// server.ts
import './tracer'; // インスツルメントされたいずれのモジュールのインポートより前である必要があります。

// tracer.ts
import tracer from 'dd-trace';
tracer.init(); // ホイストを避けるため異なるファイルで初期化。
export default tracer;
```

デフォルトのコンフィギュレーションで十分な場合、またはすべてのコンフィギュレーションが環境変数を介して行われる場合は、`dd-trace/init` を使用することもできます。これは 1 つのステップでロードおよび初期化されます。

```typescript
import 'dd-trace/init';
```

### コマンドライン引数を介したトレーサーの追加

Node.js の `--require` オプションを使用して、トレーサーを 1 回のステップでロードして初期化します。

```sh
node --require dd-trace/init app.js
```

**注:** このアプローチでは、トレーサーのすべてのコンフィギュレーションに環境変数を使用する必要があります。

## コンフィギュレーション

必要に応じて、統合サービスタグ付けの設定など、アプリケーションパフォーマンスのテレメトリーデータを送信するためのトレースライブラリーを構成します。詳しくは、[ライブラリの構成][4]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/compatibility_requirements/nodejs
[2]: /ja/getting_started/tagging/unified_service_tagging/
[3]: https://datadog.github.io/dd-trace-js/#tracer-settings
[4]: /ja/tracing/trace_collection/library_config/nodejs/
[5]: https://app.datadoghq.com/apm/docs