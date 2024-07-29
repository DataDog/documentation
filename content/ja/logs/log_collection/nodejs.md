---
aliases:
- /ja/logs/languages/nodejs
further_reading:
- link: /logs/log_configuration/processors
  tag: Documentation
  text: ログの処理方法
- link: /logs/log_configuration/parsing
  tag: Documentation
  text: パースの詳細
- link: /logs/explorer/
  tag: Documentation
  text: ログの調査方法
- link: /logs/explorer/#visualize
  tag: Documentation
  text: ログ分析の実行
- link: /logs/faq/log-collection-troubleshooting-guide/
  tag: FAQ
  text: ログ収集のトラブルシューティングガイド
- link: /glossary/#tail
  tag: 用語集
  text: 用語集 "テール" の項目
title: Node.js ログ収集
---


## ロガーの構成

Datadog にログを送信するには、ファイルにログを記録し、Datadog Agent でそのファイルを[テール][14]します。Node.js アプリケーションからログを取るには、[Winston][1] ロギングライブラリを使用します。

Winston は、[NPM][2] から入手できます。最初に、コードに依存関係を追加する必要があります。

```text
npm install --save winston
```

`package.json` が更新され、対応する依存関係が追加されます。

```js
{
  "name": "...",

  //...
  "dependencies": {
    //...
    "winston": "x.y.z",
    //...
  }
}
```

### ファイルへのログの記録

起動ファイルまたはコード内で、以下のようにロガーを宣言します。

{{< tabs >}}
{{% tab "Winston 3.0" %}}

```js

const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.File({ filename: `${appRoot}/logs/<FILE_NAME>.log` }),
  ],
});

module.exports = logger;

// ログの例
logger.log('info', 'Hello simple log!');
logger.info('Hello log with metas',{color: 'blue' });
```

{{% /tab %}}
{{% tab "Winston 2.0" %}}

```js
var winston = require('winston');

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
            name: '<LOGGER_NAME>',
            filename: '<FILE_NAME>.log',
            json: true,
            level: 'info'
        })
    ]
});

// ログの例
logger.log('info', 'Hello simple log!');
logger.info('Hello log with metas',{color: 'blue' });
```

{{% /tab %}}
{{< /tabs >}}

Winston が JSON でログを取っていることを確認するために、`<FILE_NAME>.log` ファイルの中身を確認します。

```json
{"level":"info","message":"Hello simple log!","timestamp":"2015-04-23T16:52:05.337Z"}
{"color":"blue","level":"info","message":"Hello log with metas","timestamp":"2015-04-23T16:52:05.339Z"}
```

## Datadog Agent の構成

[ログ収集が有効][6]になったら、ログファイルを追跡して新しいログを Datadog に送信する[カスタムログ収集][7]を設定します。

1. `nodejs.d/` フォルダーを `conf.d/` [Agent 構成ディレクトリ][8]に作成します。
2. `nodejs.d/` に以下の内容で `conf.yaml` ファイルを作成します。

```yaml
init_config:

instances:

##Log セクション
logs:

  - type: file
    path: "<FILE_NAME_PATH>.log"
    service: <SERVICE_NAME>
    source: nodejs
    sourcecategory: sourcecode
```

3. [Agent を再起動します][9]。
4. [Agent の status サブコマンド][10]を実行し、`Checks` セクションで `nodejs` を探し、ログが Datadog に正常に送信されることを確認します。

ログが JSON 形式の場合、Datadog は自動的にログメッセージを[パース][11]し、ログ属性を抽出します。[ログエクスプローラー][12]を使用して、ログを表示し、トラブルシューティングを行うことができます。

## ログとトレースにおけるサービスを接続

APM が有効になっているアプリケーションの場合は、[APM Node.js の指示に従い][3]ログにトレース ID、スパン ID、`env`、`service`、`version` を自動的に追加し、ログとトレースを接続します。

**注**: APM トレーサーがログに `service` を挿入する場合、Agent 構成で設定されている値は上書きされます。

## エージェントレスのログ収集

ホストに Agent をインストールしなくても、アプリケーションから Datadog にログをストリーミングできます。ただし、ネイティブ接続管理を提供するため、Agent を使用してログを転送することをお勧めします。

[Winston HTTP 転送][4]を使用して、[Datadog Log API][5] を介してログを直接送信します。
ブートストラップファイルまたはコード内で、次のようにロガーを宣言します。

```javascript
const { createLogger, format, transports } = require('winston');

const httpTransportOptions = {
  host: 'http-intake.logs.{{< region-param key="dd_site" >}}',
  path: '/api/v2/logs?dd-api-key=<DATADOG_API_KEY>&ddsource=nodejs&service=<APPLICATION_NAME>',
  ssl: true
};

const logger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.Http(httpTransportOptions),
  ],
});

module.exports = logger;

// サンプルログ
logger.log('info', 'Hello simple log!');
logger.info('Hello log with metas',{color: 'blue' });
```

**注:** コミュニティでサポートされている [Datadog Transport][13] も使用できます。


## トラブルシューティング

アプリケーションで DNS 参照エラーが発生すると、それが logstash 例外によって捕捉されなくなる可能性があります。次のハンドラーを追加してください。

```js
var logstash = new winston.transports.Logstash({ ... });
logstash.on('error', function(err) {
    console.error(err); // ここは、独自の機能に置き換えます
});
```

パラメーター `max_connect_retries` を `1` に設定しないようにしてください (デフォルトは `4`)。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/winstonjs/winston
[2]: https://www.npmjs.com
[3]: /ja/tracing/other_telemetry/connect_logs_and_traces/nodejs/
[4]: https://github.com/winstonjs/winston/blob/master/docs/transports.md#http-transport
[5]: /ja/api/v1/logs/#send-logs
[6]: /ja/agent/logs/?tab=tailfiles#activate-log-collection
[7]: /ja/agent/logs/?tab=tailfiles#custom-log-collection
[8]: /ja/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[9]: /ja/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[10]: /ja/agent/guide/agent-commands/?tab=agentv6v7#agent-status-and-information
[11]: /ja/logs/log_configuration/parsing/?tab=matchers
[12]: /ja/logs/explorer/#overview
[13]: https://github.com/winstonjs/winston/blob/master/docs/transports.md#datadog-transport
[14]: /ja/glossary/#tail