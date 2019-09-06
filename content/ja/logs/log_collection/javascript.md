---
title: ブラウザログ収集
kind: documentation
aliases:
  - /ja/logs/log_collection/web_browser
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
Datadog のクライアント側 JavaScript ロギングライブラリ `datadog-logs` を利用して、Web ブラウザなどの JavaScript クライアントから Datadog にログを送信できます。

`datadog-logs` ライブラリを使用すると、JS クライアントから Datadog にログを直接送信すると共に、次の機能を利用できます。

* ライブラリをロガーとして使用する。すべてが JSON ドキュメントとして Datadog に転送されます。
* 送信される各ログに `context` およびカスタム属性を追加する。
* すべての JavaScript エラーを自動的にラップして転送する。
* JavaScript コンソールのログを転送する。
* 実際のクライアント IP アドレスとユーザーエージェントを記録する。
* 自動一括ポストによってネットワークの利用を最適化する。

## クライアントトークンの取得

セキュリティ上の理由から、[API キー][1]を使用して `datadog-logs` ライブラリを構成することはできません。これは、API キーがクライアント側の JavaScript コードで公開されてしまうためです。Web ブラウザからログを収集するには、[クライアントトークン][2]を使用する必要があります。

クライアントトークンを管理するには、次に示すように、[Datadog API 構成ページ][3]の `Client Tokens` セクションに移動します。

{{< img src="logs/log_collection/client_tokens.png" style="width:80%;" alt="Client tokens" responsive="true" >}}

適用される制限については、[クライアントトークンに関するドキュメント][2]を参照してください。

## JavaScript ロガーの構成

以下のパラメーターを使用して、Datadog にログを送信するようにライブラリを構成できます。

* `forwardErrorsToLogs` を `false` に設定すると、JS およびコンソールエラーの自動収集がオフになります。
* `addLoggerGlobalContext` を使用して、生成されるすべてのログに JSON 属性を追加できます。
* `clientToken` は、クライアントトークンの値に設定します (**このライブラリでは、クライアントトークンのみを使用できます**)。

{{< tabs >}}
{{% tab "US" %}}

```
<html>
  <head>
    <title>Example to send logs to Datadog</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-logs-us.js"></script>
    <script>
      // クライアントトークンを設定します
      DD_LOGS.init({
        clientToken: '<CLIENT_TOKEN>',
        forwardErrorsToLogs: true,
    });

      // オプション
      // グローバルメタデータ属性を追加します。一度に 1 つの属性を追加できます
      DD_LOGS.addLoggerGlobalContext('<META_KEY>', <META_VALUE>);
    </script>
    ...
  </head>
...
</html>
```

{{% /tab %}}
{{% tab "EU" %}}

```
<html>
  <head>
    <title>Example to send logs to Datadog</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-logs-eu.js"></script>
    <script>
      // クライアントトークンを設定します
      DD_LOGS.init({
        clientToken: '<CLIENT_TOKEN>',
        forwardErrorsToLogs: true,
    });

      // オプション
      // グローバルメタデータ属性を追加します。一度に 1 つの属性を追加できます
      DD_LOGS.addLoggerGlobalContext('<META_KEY>', <META_VALUE>);
    </script>
    ...
  </head>
...
</html>
```

{{% /tab %}}
{{< /tabs >}}

## カスタムログエントリの送信

`log` 関数を使用して、カスタムログエントリを Datadog に直接送信します。

```
DD_LOGS.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>)
```

| プレースホルダー         | 説明                                                                             |
| ------------------- | --------------------------------------------------------------------------------------- |
| `<MESSAGE>`         | Datadog によって完全にインデックス化されたログメッセージ                                |
| `<JSON_ATTRIBUTES>` | `<MESSAGE>` にアタッチされているすべての属性を含む有効な JSON オブジェクト            |
| `<STATUS>`          | ログのステータス。使用できるステータス値は、`debug`、`info`、`warn`、`error` です。 |

ステータスを `log` 関数 `DD_LOGS.logger.debug(<MESSAGE>,<JSON_ATTRIBUTES>)` のプレースホルダーとして使用することもできます。

**例:**

```
...
<script>
...
DD_LOGS.logger.info('Button clicked', { name: 'buttonName', id: 123 });
...
</script>
...
```

上の結果は次のようになります。

```
{
  "status": "info",
  "session_id": "1234",
  "name": "buttonName",
  "id": 123,
  "message": "Button clicked",
  "http":{
    "url": "...",
    "useragent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.130 Safari/537.36"
    },
  "network":{
    "client": {
      "ip" : "109.30.xx.xxx"
    }
  }
}
```

ロガーは、デフォルトで次の情報を追加します。

* `http.url`
* `session_id`
* `http.useragent`
* `network.client.ip`

## 高度な使用方法

### ステータスに基づくフィルタリング

デバッグモードを無効にしたり、警告やエラーのみを収集したい場合があります。それには、`level` パラメーターを `debug` (デフォルト)、`info`、`warn`、または `error` に設定して、ログレベルを変更します。

```
DD_LOGS.logger.setLevel('<LEVEL>')
```

指定したレベル以上のステータスのログだけが送信されます。

### 送信先の変更

デフォルトでは、ロガーはログを Datadog に送信します。コンソールにログを送信したり、ログをまったく送信しないようにロガーを構成することもできます。開発環境では、これを使用してログをローカルに保持できます。

`http` (デフォルト)、`console`、`silent` のいずれかの値を指定して `setHandler` 関数を使用します。
```
DD_LOGS.logger.setHandler('<HANDLER>')
```

### 複数のロガーの定義

ライブラリにはデフォルトのロガーが含まれていますが、さまざまなロガーを定義することもできます。これは、同じプロジェクトで複数のチームが作業している場合に便利です。

それぞれのロガーは、独自のログレベル、ハンドラー、コンテキストを使用して任意に構成できます。`グローバルコンテキスト`が各ロガーコンテキストの先頭に追加されることに注意してください。

カスタムロガーは次のように定義します。

```
DD_LOGS.createLogger (<LOGGER_NAME>, {
    level?: 'debug' | 'info' | 'warn' | 'error'
    handler?: 'http' | 'console' | 'silent'
    context?: <JSON_ATTRIBUTES>
})
```

これらのパラメーターは、`setContext`、`setLevel`、および `setHandler` 関数を使用して設定することもできます。
ロガーを作成したら、`getLogger` 関数を使用して、JavaScript コードのどこからでもこのロガーにアクセスできます。

```
const my_logger = DD_LOGS.getLogger('<LOGGER_NAME>')
```

**例:**


他のロガーと共に、サインアップのロガーを次のように定義したとします。

```
# 新しいロガーの作成
const signupLogger = DD_LOGS.createLogger('signupLogger')
signupLogger.addContext('env', 'staging')
```

これで、次のように、このロガーをコードの別の場所で使用できます。

```
...
<script>
...
const signupLogger = DD_LOGS.getLogger('signupLogger')
signupLogger.info('Test sign up completed')
...
</script>
...
```

### コンテキストの上書き

1 つの呼び出しで、コンテキスト全体を設定することができます。以前に設定された属性がある場合は、それらも上書きされます。

```
# 1 つのロガーの場合
my_logger.setContext(<JSON_ATTRIBUTES>)

# グローバルコンテキストの場合
DD_LOGS.setLoggerGlobalContext(<JSON_ATTRIBUTES>)
```

**例:**

```
const signupLogger = DD_LOGS.getLogger('signupLogger')
signupLogger.setContext({
  env: 'staging',
  team: 'user-account'
})
```

## サポートされるブラウザ

`datadog-logs` ライブラリは、最新のデスクトップブラウザとモバイルブラウザをすべてサポートします。IE10 および IE11 もサポートしています。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#api-keys
[2]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#client-tokens
[3]: https://app.datadoghq.com/account/settings#api