---
title: DogStatsD によるイベント
kind: documentation
description: データタイプ、タグ付けなど、DogStatsD の機能の概要
further_reading:
  - link: developers/dogstatsd
    tag: ドキュメント
    text: DogStatsD 入門
  - link: developers/libraries
    tag: ドキュメント
    text: 公式/コミュニティ作成の API および DogStatsD クライアントライブラリ
  - link: 'https://github.com/DataDog/datadog-agent/tree/master/pkg/dogstatsd'
    tag: GitHub
    text: DogStatsD ソースコード
---
## 送信

[DogStatsD をインストール][1]した後、次の関数を使用して [Datadog のイベントストリーム][2]にイベントを送信できます。

```text
event(<TITLE>, <TEXT>, <TIMESTAMP>, <HOSTNAME>, <AGGREGATION_KEY>, <PRIORITY>, <SOURCE_TYPE_NAME>, <ALERT_TYPE>, <TAGS>)
```

**定義**:

| パラメーター            | 種類            | 必須 | 説明                                                                                |
|----------------------|-----------------|----------|--------------------------------------------------------------------------------------------|
| `<TITLE>`            | 文字列          | はい      | イベントのタイトル                                                                     |
| `<TEXT>`             | 文字列          | はい      | イベントのテキスト本文                                                                 |
| `<TIMESTAMP>`        | 整数         | はい      | イベントの Epoch タイムスタンプ (デフォルトで DogStatsD サーバーからの現在時刻が入力されます) |
| `<HOSTNAME>`         | 文字列          | いいえ       | ホストの名前                                                                       |
| `<AGGREGATION_KEY>`  | 文字列          | いいえ       | イベントを集計するために使用するキー                                                        |
| `<PRIORITY>`         | 文字列          | いいえ       | イベントの優先度を指定します (`normal` または `low`)。                                   |
| `<SOURCE_TYPE_NAME>` | 文字列          | いいえ       | [ソースタイプ][3]の名前                                                                  |
| `<ALERT_TYPE>`       | 文字列          | いいえ       | `error`、`warning`、`success`、または `info` (デフォルトは `info`)                              |
| `<TAGS>`             | 文字列のリスト | いいえ       | このイベントに関連付けられるタグのリスト                                                 |

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

statsd.event('エラーが発生しました', 'エラーメッセージ', alert_type='error', tags=['env:dev'])
{{< /code-block >}}

{{% /tab %}}
{{% tab "Ruby" %}}

{{< code-block lang="ruby" filename="event.rb" >}}
require 'datadog/statsd'

statsd = Datadog::Statsd.new('localhost', 8125)

statsd.event('エラーが発生しました', "エラーメッセージ", alert_type: 'error', tags: ['env:dev'])
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
        dogstatsdClient.SimpleEvent("エラーが発生しました", "エラーメッセージ")
        time.Sleep(10 * time.Second)
    }
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

{{< code-block lang="java" filename="event.java" >}}
import com.timgroup.statsd.Event;
import com.timgroup.statsd.NonBlockingStatsDClient;
import com.timgroup.statsd.StatsDClient;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClient("statsd", "localhost", 8125);

        Event event = Event.builder()
          .withTitle("エラーが発生しました")
          .withText("エラーメッセージ")
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

        StatsdClient.DogStatsd.Configure(dogstatsdConfig);

        DogStatsd.Event("エラーが発生しました", "エラーメッセージ", alertType: "error", tags: new[] { "env:dev" });
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

$statsd->event('エラーが発生しました。',
    array( 'text' => 'エラーメッセージ',
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

$statsd->event('エラーが発生しました。',
    array( 'text' => 'エラーメッセージ',
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

[1]: /ja/developers/dogstatsd
[2]: /ja/events
[3]: /ja/integrations/faq/list-of-api-source-attribute-value