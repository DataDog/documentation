---
title: Node.js アプリケーションのトレース
kind: documentation
aliases:
  - /ja/tracing/nodejs/
  - /ja/tracing/languages/nodejs/
  - /ja/tracing/languages/javascript/
  - /ja/tracing/setup/javascript/
  - /ja/agent/apm/nodejs/
  - /ja/tracing/setup/nodejs
  - /ja/tracing/setup_overview/nodejs
code_lang: nodejs
type: multi-code-lang
code_lang_weight: 30
further_reading:
  - link: 'https://github.com/DataDog/dd-trace-js'
    tag: GitHub
    text: ソースコード
  - link: 'https://datadog.github.io/dd-trace-js'
    tag: Documentation
    text: API ドキュメント
  - link: tracing/visualization/
    tag: APM の UI を利用する
    text: サービス、リソース、トレースを調査する
  - link: tracing/
    tag: 高度な使用方法
    text: 高度な使用方法
---
## 互換性要件

NodeJS トレーサーはバージョン `8 以降`を公式にサポートします。8.x や 10.x など、偶数バージョンのみが公式なサポート対象です。9.x や 11.x などの奇数バージョンは動作しますが、公式なサポート対象ではありません。サポートするライブラリの一覧については、[互換性要件][1]ページをご覧ください。

## インストールと利用開始

Datadog トレースライブラリを Node.js アプリケーションに追加するには、次の手順に従います。

1. 以下の npm を使用して Datadog Tracing ライブラリをインストールします。

```sh
npm install --save dd-trace
```

2. コードまたはコマンドライン引数を使用して、トレーサーをインポートして初期化します。Node.js トレースライブラリは、他のモジュールの**前**にインポートして初期化する必要があります。

   セットアップが完了した後、Web リクエストの URL ルートの欠落、スパンの切断または欠落など、完全なトレースを受信していない場合は、**ステップ 2 が正しく行われたことを確認してください**。最初に初期化されるトレースライブラリは、トレーサーが自動インスツルメンテーションに必要なすべてのライブラリに適切にパッチを適用するために必要です。

   TypeScript、Webpack、Babel などのトランスパイラーを使用する場合は、トレーサーライブラリを外部ファイルにインポートして初期化し、アプリケーションをビルドするときにそのファイル全体をインポートします。

3. [APM に Datadog Agent を構成する](#configure-the-datadog-agent-for-apm)

4. [統合サービスタグ付け][2]の `service`、`env`、`version` など、必要な[コンフィギュレーション](#configuration)をトレーサーに追加します。

### コードにトレーサーを追加する

##### JavaScript

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
import `dd-trace/init`;
```

### コマンドライン引数を介したトレーサーの追加

Node.js の `--require` オプションを使用して、トレーサーを 1 回のステップでロードして初期化します。

```sh
node --require dd-trace/init app.js
```

**注:** このアプローチでは、トレーサーのすべてのコンフィギュレーションに環境変数を使用する必要があります。

### APM に Datadog Agent を構成する

インスツルメントされたアプリケーションからトレースを受信するように Datadog Agent をインストールして構成します。デフォルトでは、Datadog Agent は `datadog.yaml` ファイルの `apm_enabled: true` で有効になっており、`localhost:8126` でトレーストラフィックをリッスンします。コンテナ化環境の場合、以下のリンクに従って、Datadog Agent 内でトレース収集を有効にします。

{{< tabs >}}
{{% tab "コンテナ" %}}

1. メインの [`datadog.yaml` コンフィギュレーションファイル][1]で `apm_non_local_traffic: true` を設定します

2. コンテナ化された環境でトレースを受信するように Agent を構成する方法については、それぞれの説明を参照してください。

{{< partial name="apm/apm-containers.html" >}}
</br>

3. アプリケーションをインスツルメント化した後、トレースクライアントはデフォルトでトレースを `localhost:8126` に送信します。これが正しいホストとポートでない場合は、以下の環境変数を設定して変更します。

`DD_AGENT_HOST` と `DD_TRACE_AGENT_PORT`

```sh
DD_AGENT_HOST=<HOSTNAME> DD_TRACE_AGENT_PORT=<PORT> ノードサーバー
```

UDS などの異なるプロトコルを使用するには、URL 全体を単一の環境変数 `DD_TRACE_AGENT_URL` として指定します。

```sh
DD_TRACE_AGENT_URL=unix:<SOCKET_PATH>ノードサーバー
```


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


初期化のオプションについては、[トレーサー設定][3]を参照してください。

## コンフィギュレーション

トレーサーの設定は、パラメーターを `init()` メソッドとして、または環境変数として構成できます。

### タグ付け

| 構成         | 環境変数         | デフォルト     | 説明                                                                                                                                                                                                                                                                |
| -------------- | ---------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| env            | `DD_ENV`                     | `null`      | アプリケーションの環境 (例: `prod`、`pre-prod`、`stage`) を設定します。バージョン 0.20 以降で利用可能。                                                                                                                                                                                                     |
| サービス        | `DD_SERVICE`            | `null`      | このプログラムで使用するサービス名。バージョン 0.20 以降で利用可能。                                                                                                                                                                                                                              |
| version        | `DD_VERSION`            | `null`      | アプリケーションのバージョン番号。デフォルトは、package.json のバージョンフィールドの値です。バージョン 0.20 以降で利用可能。
| タグ           | `DD_TAGS`                    | `{}`        | すべてのスパンおよびメトリクスに適用されるべきグローバルタグを設定します。環境変数としてパスした場合、フォーマットは `key:value,key:value` となります。プログラム的に設定する場合は、`tracer.init({ tags: { foo: 'bar' } })` となり、バージョン 0.20 以降で使用できます                                                                                                                            |

サービスに `env`、`service`、`version` を設定するには、`DD_ENV`、`DD_SERVICE`、`DD_VERSION` を使用することをおすすめします。このような環境変数の構成におすすめの方法については、[統合サービスタグ付け][2]のドキュメントをご参照ください。

### インスツルメンテーション

| 構成         | 環境変数         | デフォルト     | 説明                                                                                                                                                                                                                                                                |
| -------------- | ---------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| enabled        | `DD_TRACE_ENABLED`           | `true`      | トレーサーを有効にするかどうか。                                                                                                                                                                                                                                              |
| debug          | `DD_TRACE_DEBUG`             | `false`     | トレーサーでデバッグロギングを有効化します。                                                                                                                                                                                                                                        |
| url            | `DD_TRACE_AGENT_URL`         | `null`      | トレーサーが送信するトレース Agent の URL。設定した場合、ホスト名およびポートより優先されます。`datadog.yaml` ファイルの `apm_config.receiver_socket` または `DD_APM_RECEIVER_SOCKET` 環境変数と組み合わせて、Unix ドメインソケットをサポートします。 |
| hostname       | `DD_TRACE_AGENT_HOSTNAME`    | `localhost` | トレーサーが送信する Agent のアドレス。                                                                                                                                                                                                                       |
| port           | `DD_TRACE_AGENT_PORT`        | `8126`      | トレーサーが送信するトレース Agent のポート。                                                                                                                                                                                                                    |
| dogstatsd.port | `DD_DOGSTATSD_PORT`          | `8125`      | メトリクスが送信される DogStatsD Agent のポート。                                                                                                                                                                                                             |
| logInjection   | `DD_LOGS_INJECTION`          | `false`     | 対応するログライブラリのログにトレース ID の自動挿入を有効にします。                                                                                                                                                                                           |
| sampleRate     | -                            | `1`         | スパンのサンプリング率: `0` ～ `1` 間の浮動小数点。                                                                                                                                                                                                              |
| flushInterval  | -                            | `2000`      | トレーサーが Agent へトレースを送信する際のインターバル (ミリセカンド)。                                                                                                                                                                                                |
| runtimeMetrics | `DD_RUNTIME_METRICS_ENABLED` | `false`     | ランタイムメトリクスのキャプチャを有効にするかどうか。ポート `8125` (または `dogstatsd.port` で構成) が UDP 用に Agent で開いている必要があります。                                                                                                                                        |
| experimental   | -                            | `{}`        | 試験機能は、 Boolean の true を使用して一度に、またはキー/値のペアを使用して個々に有効にできます。試験機能に関する詳細は、[サポート][4]までお問合せください。                                                                                   |
| plugins        | -                            | `true`      | ビルトインプラグインを使用して、外部ライブラリの自動インスツルメンテーションを有効にするかどうか。                                                                                                                                                                       |
| - | `DD_TRACE_DISABLED_PLUGINS` | - | トレーサーが初期化された際に自動で無効となるインテグレーション名のカンマ区切り文字列。`DD_TRACE_DISABLED_PLUGINS=express,dns` などの環境変数のみとなります。 |
| clientToken    | `DD_CLIENT_TOKEN`            | `null`      | ブラウザーのトレーシング用クライアントトークン。Datadog の **Integrations** -> **APIs** で生成できます。                                                                                                                                                                             |
| logLevel       | `DD_TRACE_LOG_LEVEL`         | `debug`     | デバッグロギングが有効な場合に使用する、トレーサーの最小ログレベル用ストリング (例: `error`, `debug`)。                                                                                                                                                             |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/compatibility_requirements/nodejs
[2]: /ja/getting_started/tagging/unified_service_tagging/
[3]: https://datadog.github.io/dd-trace-js/#tracer-settings
[4]: /ja/help/