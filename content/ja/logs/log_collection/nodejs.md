---
title: NodeJS ログ収集
kind: documentation
aliases:
  - /ja/logs/languages/nodejs
further_reading:
  - link: logs/processing
    tag: Documentation
    text: ログの処理方法
  - link: logs/processing/parsing
    tag: Documentation
    text: パースの詳細
  - link: logs/explorer
    tag: Documentation
    text: ログの調査方法
  - link: logs/explorer/analytics
    tag: Documentation
    text: ログ分析の実行
  - link: logs/faq/log-collection-troubleshooting-guide
    tag: FAQ
    text: ログ収集のトラブルシューティングガイド
---
## 概要

NodeJS アプリケーションからのログ収集に [Winston][1] を使用すると、ログ戦略の構築に必要なすべての機能を得ることができます。

Winston は、[NPM][2] から入手できます。最初に、コードに依存関係を追加する必要があります。

```
npm install --save winston
```

`package.js` が更新され、対応する依存関係が追加されます。

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

## セットアップ

**ログへのトレース ID の挿入**

APM が有効になっているアプリケーションで、アプリケーションログとトレースの関連付けを改善したい場合は、[APM NodeJS ログの説明に従って][3]、トレースおよびスパン ID をログに自動的に追加します。

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

## Datadog Agent の構成

`conf.d/` フォルダーに次の内容の `nodejs.d/conf.yaml` ファイルを作成します。

```yaml
init_config:

instances:

##ログセクション
logs:

    ## - type : file (必須) ログ入力ソースの種類 (tcp/udp/file)
    ##   port / path : (必須) type が tcp または udp の場合は、ポートを設定します。type が file の場合は、パスを設定します。
    ##   service : (必須) ログを所有しているサービスの名前
    ##   source : (必須) ログを送信しているインテグレーションを定義する属性
    ##   sourcecategory : (オプション) 複数値属性。ソース属性の絞り込みに使用できます。
    ##   tags: (オプション) 収集された各ログにタグを追加します。

  - type: file
    path: <FILE_NAME_PATH>.log
    service: nodejs
    source: nodejs
    sourcecategory: sourcecode
```

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
[3]: /ja/tracing/connect_logs_and_traces/?tab=nodejs