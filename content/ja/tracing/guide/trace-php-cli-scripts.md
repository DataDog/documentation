---
further_reading:
- link: /tracing/trace_collection/dd_libraries/php/
  tags: ドキュメント
  text: PHP トレース収集の設定
- link: /tracing/troubleshooting/
  tags: ドキュメント
  text: トラブルシューティング
title: PHP CLI スクリプトのトレース
---

## 短時間実行される CLI スクリプト

短時間実行のスクリプトは、通常、数秒から数分程度実行されます。スクリプトが実行されるたびに 1 つのトレースを受け取ります。

デフォルトでは、コマンドラインから実行される PHP スクリプトのトレースは無効です。`DD_TRACE_CLI_ENABLED` を `1` に設定することで有効になります。

```
$ export DD_TRACE_CLI_ENABLED=1
# オプションとして、エージェントのホストとポートが localhost と 8126 と異なる場合はそれぞれ設定します
$ export DD_AGENT_HOST=agent
$ export DD_TRACE_AGENT_PORT=8126
```

例えば、以下の `script.php` が cURL リクエストを実行するとします。

```php
<?php
sleep(1);
$ch = curl_init('https://httpbin.org/delay/1');
curl_exec($ch);
sleep(1);
```

スクリプトを実行します:

```
$ php script.php
```

スクリプトを実行するとトレースが生成され、スクリプトの終了時に Datadog のバックエンドに送信されます。

{{< img src="tracing/guide/trace_php_cli_scripts/short-running-cli.jpg" alt="短時間で実行される PHP CLI スクリプトのトレース" >}}

## 長時間実行される CLI スクリプト

長時間実行されるスクリプトは、数時間から数日にわたって実行されます。通常、このようなスクリプトは、新しい受信メッセージの処理やデータベースのテーブルに追加された新しい行の処理など、特定のタスクを繰り返し実行します。これにより、メッセージの処理など「作業単位」ごとに 1 つのトレースが生成されることが期待されます。

デフォルトでは、コマンドラインから実行される PHP スクリプトのトレースは無効です。`DD_TRACE_CLI_ENABLED` を `1` に設定することで有効になります。

```
$ export DD_TRACE_CLI_ENABLED=1
# この設定では、メソッドの実行が終了すると同時に、各「作業単位」のトレースが送信されます。
$ export DD_TRACE_GENERATE_ROOT_SPAN=0
$ export DD_TRACE_AUTO_FLUSH_ENABLED=1
# オプションとしてサービス名や env などを設定します...
$ export DD_SERVICE=my_service
# オプションとして、エージェントのホストとポートが localhost と 8126 と異なる場合は、それぞれ設定します
$ export DD_AGENT_HOST=agent
$ export DD_TRACE_AGENT_PORT=8126
```

例えば、以下の `long_running.php` スクリプトを実行すると想定します。　 

```php
<?php
/* Datadog 固有のコード。別のファイルで準備し、このスクリプトで使用します。 */
use function DDTrace\trace_method;
use function DDTrace\trace_function;
use DDTrace\SpanData;
trace_function('processMessage', function(SpanData $span, $args) {
    // メソッドの引数にアクセスし、リソース名を変更
    $span->resource =  'message:' . $args[0]->id;
    $span->meta['message.content'] = $args[0]->content;
    $span->service = 'my_service';
});
trace_method('ProcessingStage1', 'process', function (SpanData $span, $args) {
    $span->service = 'my_service';
    // リソース名のデフォルトは、完全に修飾されたメソッド名となります。
});
trace_method('ProcessingStage2', 'process', function (SpanData $span, $args) {
    $span->service = 'my_service';
    $span->resource = 'message:' . $args[0]->id;
});
/* Datadog コード終了 */
/** 受信・処理対象のメッセージ */
class Message
{
    public $id;
    public $content;
    public function __construct($id, $content)
    {
        $this->id   = $id;
        $this->content = $content;
    }
}
/** 処理対象となる複数のステージのうちの 1 つ。それぞれがスパンを保有 */
class ProcessingStage1
{
    public function process(Message $message)
    {
        sleep(1);
        $ch = curl_init('https://httpbin.org/delay/1');
        curl_exec($ch);
    }
}
/** 処理対象となる複数のステージのうちの 1 つ。それぞれがスパンを保有 */
class ProcessingStage2
{
    public function process(Message $message)
    {
        sleep(1);
    }
}
/** 実際のアプリケーションでは、キューなどのソースから新しいメッセージを読み込みます。*/
function waitForNewMessages()
{
    return [
        new Message($id = (time() + rand(1, 1000)), 'content of a message: ' . $id),
        new Message($id = (time() + rand(1, 1000)), 'content of a message: ' . $id),
        new Message($id = (time() + rand(1, 1000)), 'content of a message: ' . $id),
    ];
}
/** この関数は「仕事の単位」であり、その実行ごとに 1 つのシングルトレースを生成します */
function processMessage(Message $m, array $processors)
{
    foreach ($processors as $processor) {
        $processor->process($m);
        usleep(100000);
    }
}
$processors = [new ProcessingStage1(), new ProcessingStage2()];
/** 新しいメッセージを待つためにループを永続的に実行 */
while (true) {
    $messages = waitForNewMessages();
    foreach ($messages as $message) {
        processMessage($message, $processors);
    }
}
```

スクリプトを実行します:

```
$ php long_running.php
```

スクリプトを実行すると、新しいメッセージが処理されるたびに 1 つのトレースが生成され、Datadog のバックエンドに送信されます。

{{< img src="tracing/guide/trace_php_cli_scripts/long-running-cli.jpg" alt="長時間で実行される PHP CLI スクリプトのトレース" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}