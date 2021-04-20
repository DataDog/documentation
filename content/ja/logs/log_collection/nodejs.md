---
title: NodeJS ログ収集
kind: documentation
aliases:
  - /ja/logs/languages/nodejs
further_reading:
  - link: /logs/processing/
    tag: Documentation
    text: ログの処理方法
  - link: /logs/processing/parsing/
    tag: Documentation
    text: パースの詳細
  - link: /logs/explorer/
    tag: Documentation
    text: ログの調査方法
  - link: '/logs/explorer/#visualize'
    tag: Documentation
    text: ログ分析の実行
  - link: /logs/faq/log-collection-troubleshooting-guide/
    tag: FAQ
    text: ログ収集のトラブルシューティングガイド
---
## ロガーの構成

NodeJS アプリケーションからのログ収集に [Winston][1] を使用すると、ログ戦略の構築に必要なすべての機能を得ることができます。

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

### ファイルへのログ記録

ブートストラップファイルまたはコード内のいずれかの場所で、次のようにロガーを宣言します。

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

`<FILE_NAME>.log` ファイルの内容をチェックして、Winston がすべてのログを JSON で記録していることを確認します。

```json
{"level":"info","message":"Hello simple log!","timestamp":"2015-04-23T16:52:05.337Z"}
{"color":"blue","level":"info","message":"Hello log with metas","timestamp":"2015-04-23T16:52:05.339Z"}
```

## ログとトレース全体のサービスを接続

APM が有効になっているアプリケーションの場合は、[APM Nodejs の指示に従い][3]ログにトレース ID、スパン ID、`env`、`service`、`version` を自動的に追加し、ログとトレースを接続します。

**注**: APM トレーサーがログに `service` を挿入する場合、Agent 構成で設定されている値は上書きされます。

## Datadog Agent の構成

`conf.d/` フォルダーに次の内容の `nodejs.d/conf.yaml` ファイルを作成します。

```yaml
init_config:

instances:

##Log section
logs:

  - type: file
    path: "<ファイル名パス>.log"
    service: nodejs
    source: nodejs
    sourcecategory: sourcecode
```

## エージェントレスのログ収集

ホストに Agent をインストールしなくても、アプリケーションから Datadog にログをストリーミングできます。ネイティブ接続管理を提供するため、Agent を使用してログを転送することをお勧めします。

[Winston HTTP 転送][4]を使用して、[Datadog Log API][5] を介してログを直接送信します。
ブートストラップファイルまたはコード内のいずれかの場所で、次のようにロガーを宣言します。

{{< site-region region="us" >}}

```javascript
const { createLogger, format, transports } = require('winston');

const httpTransportOptions = {
  host: 'http-intake.logs.datadoghq.com',
  path: '/v1/input/<APIKEY>?ddsource=nodejs&service=<アプリケーション名>',
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

注: コミュニティでサポートされている [Datadog Transport][2] も確認できます。

[1]: https://github.com/winstonjs/winston/blob/master/docs/transports.md#datadog-transport

{{< /site-region >}}
{{< site-region region="eu" >}}

```javascript
const { createLogger, format, transports } = require('winston');

const httpTransportOptions = {
  host: 'http-intake.logs.datadoghq.eu',
  path: '/v1/input/<APIKEY>?ddsource=nodejs&service=<アプリケーション名>',
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

[1]: https://github.com/winstonjs/winston/blob/master/docs/transports.md#http-transport
[2]: /ja/api/v1/logs/#send-logs

{{< /site-region >}}

## トラブルシューティング

アプリケーションで DNS 参照エラーやクラッシュが発生すると、それが logstash 例外にリンクされて捕捉されなくなる可能性があります。
次のハンドラーを追加してください。

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
[3]: /ja/tracing/connect_logs_and_traces/nodejs/
[4]: https://github.com/winstonjs/winston/blob/master/docs/transports.md#http-transport
[5]: /ja/api/v1/logs/#send-logs