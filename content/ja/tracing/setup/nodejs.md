---
title: Node.js アプリケーションのトレース
kind: documentation
aliases:
  - /ja/tracing/nodejs/
  - /ja/tracing/languages/nodejs/
  - /ja/tracing/languages/javascript/
  - /ja/tracing/setup/javascript/
  - /ja/agent/apm/nodejs/
further_reading:
  - link: 'https://github.com/DataDog/dd-trace-js'
    tag: GitHub
    text: ソースコード
  - link: 'https://datadog.github.io/dd-trace-js'
    tag: Documentation
    text: APIドキュメント
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

### アプリ内のドキュメントに従ってください (推奨)

Datadog アプリ内の[クイックスタート手順][2]に従って、最高のエクスペリエンスを実現します。例:

- デプロイコンフィギュレーション (ホスト、Docker、Kubernetes、または Amazon ECS) を範囲とする段階的な手順。
- `service`、`env`、`version` タグを動的に設定します。
- セットアップ中に App Analytics およびトレース ID の挿入を有効にします。

APM で使用される用語の説明は、[公式ドキュメント][3]を参照してください。

コンフィギュレーションおよび API の使用の詳細については、Datadog の [API ドキュメント][4]を参照してください。

貢献の詳細については、[開発ガイド][5]を参照してください。

### Quickstart

{{< alert >}}
このライブラリは、インスツルメントされたいずれのモジュールよりも先にインポートおよび初期化する<strong>必要があります</strong>。トランスパイラーを使用する時は、トレーサーライブラリを外部ファイルにインポートして初期化する<strong>必要があります</strong>。その後、アプリケーションを構築する際にそのファイルをまとめてインポートします。これにより、ホイストを防ぎ、他のモジュールがインポートされる前にトレーサーライブラリを確実にインポートして初期化します。
{{< /alert >}}

Node.js アプリケーションのトレースを開始するには、まず [Datadog Agent をインストールおよび構成][6]し、次に [Docker アプリケーションのトレース][7]または [Kubernetes アプリケーション][8]に関する追加ドキュメントを確認します。

次に、以下の npm を使用して Datadog Tracing ライブラリをインストールします。

```sh
npm install --save dd-trace
```

最後に、トレーサーをインポートして初期化します。

##### JavaScript

```js
// この行は、インスツルメントされたいずれのモジュールのインポートより前である必要があります。
const tracer = require('dd-trace').init();
```

##### TypeScript

```typescript
// server.ts
import './tracer'; // インスツルメントされたいずれのモジュールのインポートより前である必要があります。

// tracer.ts
import tracer from 'dd-trace';
tracer.init(); // ホイストを避けるため異なるファイルで初期化。
export default tracer;
```

初期化のオプションについては、[トレーサー設定][9]を参照してください。

## コンフィギュレーション

トレーサーの設定は、パラメーターを `init()` メソッドとして、または環境変数として構成できます。

### タグ付け

| 構成         | 環境変数         | デフォルト     | 説明                                                                                                                                                                                                                                                                |
| -------------- | ---------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| env            | `DD_ENV`                     | `null`      | アプリケーションの環境 (例: `prod`、`pre-prod`、`stage`) を設定します。バージョン 0.20 以降で利用可能。                                                                                                                                                                                                     |
| サービス        | `DD_SERVICE`            | `null`      | このプログラムで使用するサービス名。バージョン 0.20 以降で利用可能。                                                                                                                                                                                                                              |
| version        | `DD_VERSION`            | `null`      | アプリケーションのバージョン番号。デフォルトは、package.json のバージョンフィールドの値です。バージョン 0.20 以降で利用可能。
| tags           | `DD_TAGS`                    | `{}`        | すべてのスパンおよびメトリクスに適用されるべきグローバルタグを設定します。環境変数として渡される場合、フォーマットは `key:value, key:value` となります。プログラムで設定する場合は `tracer.init({ tags: { foo: 'bar' } })`。バージョン 0.20 以降で利用可能。                                                                                                                            |

サービスに `env`、`service`、`version` を設定するには、`DD_ENV`、`DD_SERVICE`、`DD_VERSION` を使用することをおすすめします。このような環境変数の構成におすすめの方法については、[統合サービスタグ付け][10]のドキュメントをご参照ください。

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
| experimental   | -                            | `{}`        | 試験機能は、 Boolean の true を使用して一度に、またはキー/値のペアを使用して個々に有効にできます。試験機能に関する詳細は、[サポート][11]までお問い合わせください。                                                                                   |
| plugins        | -                            | `true`      | ビルトインプラグインを使用して、外部ライブラリの自動インスツルメンテーションを有効にするかどうか。                                                                                                                                                                       |
| - | `DD_TRACE_DISABLED_PLUGINS` | - | トレーサーが初期化された際に自動で無効となるインテグレーション名のカンマ区切り文字列。`DD_TRACE_DISABLED_PLUGINS=express,dns` などの環境変数のみとなります。 |
| clientToken    | `DD_CLIENT_TOKEN`            | `null`      | ブラウザーのトレーシング用クライアントトークン。Datadog の **Integrations** -> **APIs** で生成できます。                                                                                                                                                                             |
| logLevel       | `DD_TRACE_LOG_LEVEL`         | `debug`     | デバッグロギングが有効な場合に使用する、トレーサーの最小ログレベル用ストリング (例: `error`, `debug`)。                                                                                                                                                             |

## Agent ホスト名の変更

アプリケーションレベルのトレーサーを設定し、以下のカスタム Agent ホスト名にトレースを送信します。

Nodejs racing Module が自動的に検索し環境変数の `DD_AGENT_HOST` や `DD_TRACE_AGENT_PORT` で初期化します。

```sh
DD_AGENT_HOST=<HOSTNAME> DD_TRACE_AGENT_PORT=<PORT> ノードサーバー
```

UDS などの異なるプロトコルを使用するには、URL 全体を単一の環境変数 `DD_TRACE_AGENT_URL` として指定します。

```sh
DD_TRACE_AGENT_URL=unix:<SOCKET_PATH>ノードサーバー
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/compatibility_requirements/nodejs
[2]: https://app.datadoghq.com/apm/docs
[3]: /ja/tracing/visualization/
[4]: https://datadog.github.io/dd-trace-js
[5]: https://github.com/DataDog/dd-trace-js/blob/master/README.md#development
[6]: /ja/tracing/send_traces/
[7]: /ja/tracing/setup/docker/
[8]: /ja/agent/kubernetes/apm/
[9]: https://datadog.github.io/dd-trace-js/#tracer-settings
[10]: /ja/getting_started/tagging/unified_service_tagging/
[11]: /ja/help/