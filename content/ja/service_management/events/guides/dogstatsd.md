---
aliases:
- /ja/developers/events/dogstatsd/
- /ja/events/guides/dogstatsd
description: データタイプ、タグ付けなど、DogStatsD の機能の概要
further_reading:
- link: /developers/dogstatsd/
  tag: Documentation
  text: DogStatsD 入門
- link: /developers/community/libraries/
  tag: Documentation
  text: 公式/コミュニティ作成の API および DogStatsD クライアントライブラリ
title: DogStatsD によるイベント
---

## 送信

[DogStatsD をインストール][1]した後、次の関数を使用して [Datadog のイベントエクスプローラー][2]にイベントを送信できます。

```text
event(<title>, <message>, <alert_type>, <aggregation_key>, <source_type_name>, <date_happened>, <priority>, <tags>, <hostname>)
```

**定義**:

| パラメーター            | タイプ            | 必須 | 説明                                                                                |
|----------------------|-----------------|----------|--------------------------------------------------------------------------------------------|
| `<title>`            | 文字列          | はい      | イベントのタイトル                                                                     |
| `<message>`          | 文字列          | はい      | イベントのテキスト本文                                                                 |
| `<alert_type>`       | 文字列          | ✕       | `error`、`warning`、`success`、または `info` (デフォルトは `info`)                              |
| `<aggregation_key>`  | 文字列          | ✕       | イベントを集計するために使用するキー                                                        |
| `<source_type_name>` | 文字列          | ✕       | ソースタイプ名 (デフォルトは `my_apps`)                                               |
| `<date_happened>`    | 整数         | ✕       | イベントの Epoch タイムスタンプ (デフォルトで DogStatsD サーバーからの現在時刻が入力されます) |
| `<priority>`         | 文字列          | ✕       | イベントの優先度を指定します (`normal` または `low`)                                    |
| `<tags>`             | 文字列のリスト | ✕       | このイベントに関連付けられるタグのリスト                                                  |
| `<hostname>`         | 文字列          | ✕       | ホストの名前                                                                       |

### 例

次のコードを実行して、Datadog の DogStatsD イベントのエラーおよび例外を表示します。必要がなくなったら、クライアントを `フラッシュする`/`閉じる` ことを忘れないでください。

{{< programming-lang-wrapper langs="python,ruby,go,java,.NET,php" >}}

{{< programming-lang lang="python" >}}

```python
from datadog import initialize, statsd

options = {
    'statsd_host':'127.0.0.1',
    'statsd_port':8125
}

initialize(**options)

statsd.event('An error occurred', 'Error message', alert_type='error', tags=['env:dev'])
```
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}
```ruby
require 'datadog/statsd'

statsd = Datadog::Statsd.new('localhost', 8125)

statsd.event('An error occurred', "Error message", alert_type: 'error', tags: ['env:dev'])
```
{{< /programming-lang >}}


{{< programming-lang lang="go" >}}
```go
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
```
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}
```java
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
```
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}
```csharp
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
            if (!dogStatsdService.Configure(dogstatsdConfig))
                throw new InvalidOperationException("Cannot initialize DogstatsD. Set optionalExceptionHandler argument in the `Configure` method for more information.");
            dogStatsdService.Event("An error occurred", "Error message", alertType: "error", date_happened='TIMESTAMP', tags: new[] { "env:dev" }); 
        }   
    }   
}
```
{{< /programming-lang >}}

{{< programming-lang lang="php" >}}

```php
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
```

DogStatsD-PHP ライブラリを使用すると、イベントを TCP を通じて直接 Datadog API に送信できます。速度は遅くなりますが、イベントが UDP を使用してアプリケーションから Agent に転送されるため、Agent の DogStatsD インスタンスを使うよりも信頼性が高くなります。これを使用するには、ローカルの DogStatD インスタンスの代わりに [Datadog API とアプリケーションのキー][1]を使用してライブラリを構成する必要があります。

```php
<?php

require __DIR__ . '/vendor/autoload.php';

use DataDog\DogStatsd;

$statsd = new DogStatsd(
    array('api_key' => '<DATADOG_API_KEY>',
          'app_key' => '<DATADOG_APPLICATION_KEY>',
     )
  );

$statsd->event('An error occurred.',
    array( 'text' => 'Error message',
           'alert_type' => 'error'
    )
  );
```


[1]: https://app.datadoghq.com/organization-settings/api-keys
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

**注**:

* この方法でイベントを送信する場合は、API リクエストに cURL を使用します。
* Datadog API との通信の問題によって警告やエラーが出るのを避けるために、`try`/`catch` のコード ブロックを使用する必要があります。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/developers/dogstatsd/
[2]: /ja/service_management/events/