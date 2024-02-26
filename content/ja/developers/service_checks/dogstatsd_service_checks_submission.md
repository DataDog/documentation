---
description: データタイプ、タグ付けなど、DogStatsD の機能の概要
further_reading:
- link: /developers/dogstatsd/
  tag: ドキュメント
  text: DogStatsD 入門
- link: /developers/community/libraries/
  tag: ドキュメント
  text: 公式/コミュニティ作成の API および DogStatsD クライアントライブラリ
kind: documentation
title: 'サービスチェックの送信: DogStatsD'
---

StatsD がメトリクスのみを受け付けるのに対して、DogStatsD は、Datadog の主要な 3 種類のデータタイプ、すなわちメトリクス、イベント、サービスチェックをすべて受け付けます。ここでは、サービスチェックの一般的な使用例をコード例を用いて説明します。

## 関数

[DogStatsD をインストール][1]した後、次の関数を使用して Datadog へサービスチェックを送信できます。

```text
service_check(<SERVICE_CHECK_NAME>, <STATUS>, <TAGS>, <HOSTNAME>, <MESSAGE>)
```

サービスチェック関数パラメーター：

| パラメーター              | タイプ            | 必須 | デフォルト値 | 説明                                                                                                |
|------------------------|-----------------|----------|---------------|------------------------------------------------------------------------------------------------------------|
| `<SERVICE_CHECK_NAME>` | 文字列          | はい      | -             | サービスチェックの名前。                                                                             |
| `<STATUS>`             | Int             | はい      | -             | サービスのステータスを説明する定数: OK には `0`、WARN には `1`、CRITICAL には `2`、UNKNOWN には `3`。 |
| `<タグ>`               | key:value ペアのリスト | いいえ       | -             | サービスチェックに関連付けられているタグのリスト                                                        |
| `<ホスト名>`           | 文字列          | いいえ       | 現在のホスト  | サービスチェックに関連付けられているホスト名                                                          |
| `<MESSAGE>`            | 文字列          | いいえ       | -             | このステータスが発生した補足情報や説明                                        |

### コード例

次のコードを実行して、DogStatsD を通じて Datadog にサービスチェックを送信します。必要がなくなったら、クライアントを `フラッシュする`/`閉じる` ことを忘れないでください。

{{< programming-lang-wrapper langs="python,ruby,go,java,.NET,php" >}}

{{< programming-lang lang="python" >}}
```python
from datadog import initialize, statsd

options = {"statsd_host": "127.0.0.1", "statsd_port": 8125}

initialize(**options)

statsd.service_check(
    check_name="application.service_check",
    status="0",
    message="Application is OK",
)
```
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}
```ruby
require 'datadog/statsd'

statsd = Datadog::Statsd.new('localhost', 8125)

statsd.service_check('application.service_check', 0, {'message' => 'Application is OK'})
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
        dogstatsdClient.SimpleServiceCheck("application.service_check", 0)
        time.Sleep(10 * time.Second)
    }
}
```
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}
```java
import com.timgroup.statsd.ServiceCheck;
import com.timgroup.statsd.NonBlockingStatsDClientBuilder;
import com.timgroup.statsd.StatsDClient;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClientBuilder()
            .prefix("statsd").
            .hostname("localhost")
            .port(8125)
            .build();

        ServiceCheck sc = ServiceCheck.builder()
                          .withName("Service.check.name")
                          .withStatus(ServiceCheck.Status.OK)
                          .build();

        Statsd.serviceCheck(sc);
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
            dogStatsdService.ServiceCheck("Service.check.name", 0, message: "Application is OK.", tags: new[] { "env:dev" });
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

$statsd->service_check('Service.check.name', 0);
```
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

サービスチェックが報告されたら、それを使用して[サービスチェックモニター][2]をトリガーできます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/developers/dogstatsd/
[2]: /ja/monitors/types/service_check/