---
title: DogStatsD によるイベント
kind: documentation
description: データタイプ、タグ付けなど、DogStatsD の機能の概要
further_reading:
  - link: /developers/dogstatsd/
    tag: ドキュメント
    text: DogStatsD 入門
  - link: /developers/community/libraries/
    tag: ドキュメント
    text: 公式/コミュニティ作成の API および DogStatsD クライアントライブラリ
  - link: 'https://github.com/DataDog/datadog-agent/tree/master/pkg/dogstatsd'
    tag: GitHub
    text: DogStatsD ソースコード
---
## 送信

[DogStatsD をインストール][1]した後、次の関数を使用して [Datadog のイベントストリーム][2]にイベントを送信できます。

```text
event(<タイトル>, <テキスト>, <タイムスタンプ>, <ホスト名>, <集計キー>, <優先度>, <ソースタイプ名>, <アラートタイプ>, <タグ>)
```

**定義**:

| パラメーター            | 種類            | 必須 | 説明                                                                                |
|----------------------|-----------------|----------|--------------------------------------------------------------------------------------------|
| `<タイトル>`            | 文字列          | はい      | イベントのタイトル                                                                     |
| `<テキスト>`             | 文字列          | はい      | イベントのテキスト本文                                                                 |
| `<タイムスタンプ>`        | 整数         | はい      | イベントの Epoch タイムスタンプ (デフォルトで DogStatsD サーバーからの現在時刻が入力されます) |
| `<ホスト名>`         | 文字列          | いいえ       | ホストの名前                                                                       |
| `<集計キー>`  | 文字列          | いいえ       | イベントを集計するために使用するキー                                                        |
| `<優先度>`         | 文字列          | いいえ       | イベントの優先度を指定します (`normal` または `low`)。                                   |
| `<ソースタイプ名>` | 文字列          | いいえ       | ソースタイプの名前                                                                  |
| `<アラートタイプ>`       | 文字列          | いいえ       | `error`、`warning`、`success`、または `info` (デフォルトは `info`)                              |
| `<タグ>`             | 文字列のリスト | いいえ       | このイベントに関連付けられるタグのリスト                                                 |

### 例

DogStatsD イベントによる Datadog 内でのエラーと例外を表示します。

{{< tabs >}}
{{% tab "Python" %}}

{{< code-block lang="python" filename="event.py" >}}
from datadog import initialize, statsd

options = {
    'statsd_host':'127.0.0.1',
    'statsd_port':8125
}

initialize(**options)

statsd.event('An error occurred', 'Error message', alert_type='error', tags=['env:dev'])
{{< /code-block >}}

{{% /tab %}}
{{% tab "Ruby" %}}

{{< code-block lang="ruby" filename="event.rb" >}}
require 'datadog/statsd'

statsd = Datadog::Statsd.new('localhost', 8125)

statsd.event('An error occurred', "Error message", alert_type: 'error', tags: ['env:dev'])
{{< /code-block >}}

{{% /tab %}}
{{% tab "Go" %}}

{{< code-block lang="go" filename="event.go" >}}
package main

import (
    "log"
    "time"

    "github.com/DataDog/datadog-go/statsd"
)

func main() {

    dogstatsdClient, err := statsd.New("127.0.0.1:8125")

    if err != nil {
        log.Fatal(err)
    }
    for {
        dogstatsdClient.SimpleEvent("An error occurred", "Error message")
        time.Sleep(10 * time.Second)
    }
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

{{< code-block lang="java" filename="event.java" >}}
import com.timgroup.statsd.Event;
import com.timgroup.statsd.NonBlockingStatsDClientBuilder;
import com.timgroup.statsd.StatsDClient;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClientBuilder()
            .prefix("statsd").
            .hostname("localhost")
            .port(8125)
            .build();

        Event event = Event.builder()
          .withTitle("An error occurred")
          .withText("Error message")
          .withAlertType(Event.AlertType.ERROR)
          .build();

        Statsd.recordEvent(event);
    }
}
{{< /code-block >}}

{{% /tab %}}
{{% tab ".NET" %}}

{{< code-block lang="csharp" filename="event.cs" >}}
using StatsdClient;

public class DogStatsdClient
{
    public static void Main()
    {
        var dogstatsdConfig = new StatsdConfig
        {
            StatsdServerName = "127.0.0.1",
            StatsdPort = 8125,
        };

        using (var dogStatsdService = new DogStatsdService())
        {
            dogStatsdService.Configure(dogstatsdConfig);
            dogStatsdService.Event("An error occurred", "Error message", alertType: "error", date_happened='TIMESTAMP', tags: new[] { "env:dev" });
        }
    }
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "PHP" %}}

{{< code-block lang="php" filename="event.php" >}}
<?php

require __DIR__ . '/vendor/autoload.php';

use DataDog\DogStatsd;

$statsd = new DogStatsd(
    array('host' => '127.0.0.1',
          'port' => 8125,
     )
  );

$statsd->event('An error occurred.',
    array( 'text' => 'Error message',
           'alert_type' => 'error'
    )
  );
{{< /code-block >}}

DogStatsD-PHP ライブラリを使用すると、イベントを TCP 経由で直接 Datadog API に送信できます。速度は遅くなりますが、イベントが UDP を使用してアプリケーションから Agent に転送されるため、Agent の DogStatsD インスタンスを使うよりも信頼性が高くなります。これを使用するには、ローカルの DogStatD インスタンスの代わりに [Datadog API とアプリケーションのキー][1]を使用してライブラリを構成する必要があります。

{{< code-block lang="php" filename="event_through_api.php" >}}
<?php

require __DIR__ . '/vendor/autoload.php';

use DataDog\DogStatsd;

$statsd = new DogStatsd(
    array('api_key' => '<DATADOG_API_キー>',
          'app_key' => '<DATADOG_アプリケーションキー>',
     )
  );

$statsd->event('An error occurred.',
    array( 'text' => 'Error message',
           'alert_type' => 'error'
    )
  );
{{< /code-block >}}

**注**:

* この方法でイベントを送信する場合は、API リクエストに cURL を使用します。
* Datadog API との通信の問題によって警告やエラーが出るのを避けるために、`try`/`catch` のコード ブロックを使用する必要があります。

[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/developers/dogstatsd/
[2]: /ja/events/