---
title: 大量のメトリクスの送信
kind: documentation
description: DogStatsD を高スループットに最適化
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
DogStatsD には、アプリケーションから生成されるメトリクスを、転送プロトコルを介して [Agent][1] に送信するという機能があります。このプロトコルには UDP (User Datagram Protocol) または [UDS (Unix Domain Socket)][2] が使用されます。

DogStatsD を使用して大量のメトリクスを 1 つの Agent に送信する際、適切な措置を講じずに実行すると以下のような問題が発生する場合があります。

- Agent の CPU 使用量の増加
- データグラムやメトリクスのドロップ
- DogStatsD クライアントライブラリ (UDS) により返されるエラー

これらの問題の大半は、以下で説明するようにコンフィギュレーションを調整することで軽減できます。

## 一般的な方法

### クライアント側のバッファリングを有効にする

StatsD や DogStatsD のクライアントが、デフォルトで 1 つのデータグラムごとに 1 つのメトリクスを送信する場合がありますが、これによりクライアントやオペレーティングシステム、そして Agent のオーバーヘッドは非常に高くなります。複数のメトリクスを 1 つのダイアグラムにバッファリングできるようにクライアントを作成し、このオプションを有効にすることで問題を著しく改善できます。

[DogStatsD が公式にサポートするクライアント][3]の例をご紹介します。

{{< tabs >}}
{{% tab "Go" %}}

以下の例では、Datadog 公認の Golang ライブラリである [datadog-go][1] を使用して、最大 `256` のメトリクスをバッファリングできる DogStatsD クライアントを作成します。このクライアントインスタンスから送信されるメトリクスはすべてバッファリングされ、最大で `256` のメトリクスを含むパッケージに入れて送信されます。

```go
package main

import (
    "log"
    "github.com/DataDog/datadog-go/statsd"
)

func main() {

  statsd, err := statsd.New("127.0.0.1:8125",
                 statsd.Buffered(),
                 statsd.WithMaxMessagesPerPayload(256),
                )
    if err != nil {
            log.Fatal(err)
    }

  statsd.Gauge("example_metric.gauge", 1, []string{"env:dev"}, 1)
}
```

[1]: https://github.com/DataDog/datadog-go
{{% /tab %}}

{{% tab "Python" %}}

以下のコードブロックは、Datadog 公認の Python ライブラリである [datadogpy][1] を使用し、最大 `25` のメトリクスを 1 つのパケットで送信するようバッファリングされた DogStatsD クライアントインスタンスを作成します。

```python
from datadog import DogStatsd

with DogStatsd(host="127.0.0.1", port=8125, max_buffer_size=25) as batch:
    batch.gauge('example_metric.gauge_1', 123, tags=["environment:dev"])
    batch.gauge('example_metric.gauge_2', 1001, tags=["environment:dev"])
```

[1]: https://github.com/DataDog/datadogpy
{{% /tab %}}

{{% tab "Ruby" %}}

以下のコードブロックは、Datadog 公認の Ruby ライブラリである [dogstatsd-ruby][1] を使用し、複数のメトリクスを 1 つのパケットで送信するようバッファリングされた DogStatsD クライアントインスタンスを作成します。

```ruby
require 'datadog/statsd'

statsd = Datadog::Statsd.new('127.0.0.1', 8125)

statsd.batch do |s|
  s.increment('example_metric.increment', tags: ['environment:dev'])
  s.gauge('example_metric.gauge', 123, tags: ['environment:dev'])
end
```

[1]: https://github.com/DataDog/dogstatsd-ruby
{{% /tab %}}

{{% tab "Java" %}}

以下の例では、Datadog 公認の Java ライブラリである [java-dogstatsd-client][1] を使用して、最大 `256` のメトリクスをバッファリングできる DogStatsD クライアントを作成します。このクライアントインスタンスから送信されるメトリクスはすべてバッファリングされ、最大で `256` のメトリクスを含むパッケージに入れて送信されます。

```java
import com.timgroup.statsd.NonBlockingStatsDClient;
import com.timgroup.statsd.StatsDClient;
import java.util.Random;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClient("namespace", "127.0.0.1", 8125, 256);

        Statsd.incrementCounter("example_metric.increment", ["environment:dev"]);
        Statsd.recordGaugeValue("example_metric.gauge", 100, ["environment:dev"]);
    }
}
```

[1]: https://github.com/DataDog/java-dogstatsd-client
{{% /tab %}}
{{% tab ".NET" %}}
以下の例では、Datadog 公認の C# ライブラリである [dogstatsd-csharp-client][1] を使用し、UDP で転送を行う DogStatsD クライアントを作成します。

```csharp
using StatsdClient;

public class DogStatsdClient
{
    public static void Main()
    {
      StatsdUDP udp = new StatsdUDP("127.0.0.1", 8125);

      // "udp" で転送を行う stats インスタンスを作成
      Statsd s = new Statsd(udp);
      s.Add<Statsd.Counting,int>("example_metric.count", 1, tags: new[] {"environment:dev"});
      s.Add("event title", "content", priority: "low");
      s.Add<Statsd.Counting,int>("example_metric.count", 1, tags: new[] {"environment:dev"});

      // この呼び出しの前にバッファリングされた全メトリクスが 1 つのパケットで送信される
      s.Send();
    }
}
```

[1]: https://github.com/DataDog/dogstatsd-csharp-client
{{% /tab %}}
{{% tab "PHP" %}}

以下のコードブロックは、Datadog 公認の PHP ライブラリである [php-datadogstatsd][1] を使用し、複数のメトリクスを 1 つのパケットで送信するようバッファリングされた DogStatsD クライアントインスタンスを作成します。

```php
<?php

require __DIR__ . '/vendor/autoload.php';

  use DataDog\BatchedDogStatsd;

$client = new BatchedDogStatsd(
  array('host' => '127.0.0.1',
          'port' => 8125,
     )
);

$client->increment('example_metric.increment', array('environment'=>'dev'));
$client->increment('example_metric.increment', $sampleRate->0.5 , array('environment'=>'dev'));
```

[1]: https://github.com/DataDog/php-datadogstatsd
{{% /tab %}}
{{< /tabs >}}

### メトリクスのサンプリング

クライアント側でサンプリングレートの値を設定すると、DogStatsD クライアントから Agent へのトラフィックを減らすことができます。たとえば、サンプリングレートを `0.5` にすると、送信される UDP パケットの数が半減します。この方法には、トラフィックが減る代わりに精度や粒度がやや低下するという欠点もあります。

詳しい情報やコードの例が必要な場合は、[DogStatsD の「サンプリングレート」パラメータの説明][4]を参照してください。

### UDS (Unix Domain Socket) を介した DogStatsD の使用

UDS は [DogStatsD ペイロードの転送][2]に使用される、プロセス間通信プロトコルです。UDP と比べてオーバーヘッドが非常に小さく、多くのシステムで DogStatsD のフットプリントを減らすことができます。

## オペレーティングシステムのカーネルバッファ

ほとんどのオペレーティングシステムは、メトリクスを含むデータグラムを UDP や UDS を介して受信し、バッファに追加します。バッファにはサイズ制限があるため、その最大値に達すると、データグラムとその中に含まれるメトリクスがドロップを始めます。この最大値を調整すれば、受信したメトリクスを Agent が処理する時間を増やすことができます。

### UDP (User Datagram Protocol) の場合

#### Linux

ほとんどの Linux ディストリビューションで、カーネル バッファの最大サイズはデフォルトで `212992`(208 KB) に設定されています。これを確認するには、次のコマンドを使用します。

```bash
$ sysctl net.core.rmem_max
net.core.rmem_max = 212992
```

DogStatsD ソケットバッファの最大サイズを 25MB に設定するには、次を実行します。

```bash
$ sysctl -w net.core.rmem_max=26214400
```

これを永続的に変更するには、次のコンフィギュレーションを `/etc/sysctl.conf` に追加します。

```conf
net.core.rmem_max = 26214400
```

続いて、Agent の `dogstatsd_so_rcvbuf` コンフィギュレーションオプションを、`datadog.yaml` 内で同じ数値に設定します。

```yaml
dogstatsd_so_rcvbuf: 26214400
```

## クライアント側のテレメトリー

DogStatsD クライアントは、デフォルトでテレメトリーメトリクスを Agent に送信します。これを利用して、ボトルネックが存在する場合にトラブルシューティングを行うことができます。各メトリクスには、クライアントの言語とバージョンがタグ付けされます。これらのメトリクスはカスタムメトリクスとしてカウントされないため、課金の対象になりません。

以下のタグは、すべてのクライアントに共通してタグ付けされます。

| タグ                | 説明                                    | 例                |
|--------------------|------------------------------------------------|------------------------|
| `client`           | クライアントの言語                     | `client:py`            |
| `client_version`   | クライアントのバージョン                      | `client_version:1.2.3` |
| `client_transport` | クライアントの転送プロトコル (`udp` または `uds`) | `client_transport:uds` |

**注**: UDP を使用すると、クライアントがネットワークエラーを検出できないため、バイトやパケットがドロップしてもメトリクスには反映されません。

{{< tabs >}}
{{% tab "Python" %}}

バージョン `0.34.0` 以降の Python クライアントが必要です。

| メトリクス名                               | メトリクスタイプ | 説明                                                                             |
|--------------------------------------------|-------------|-----------------------------------------------------------------------------------------|
| `datadog.dogstatsd.client.metrics`         | count       | アプリケーションによって DogStatsD クライアントに送信された `metrics` の数 (サンプリング前)。 |
| `datadog.dogstatsd.client.events`          | count       | アプリケーションによって DogStatsD クライアントに送信された `events` の数。                    |
| `datadog.dogstatsd.client.service_checks`  | count       | アプリケーションによって DogStatsD クライアントに送信された `service_checks` の数。            |
| `datadog.dogstatsd.client.bytes_sent`      | count       | Agent に正常に送信されたバイト数。                                         |
| `datadog.dogstatsd.client.bytes_dropped`   | count       | DogStatsD クライアントによってドロップされたバイト数。                                        |
| `datadog.dogstatsd.client.packets_sent`    | count       | Agent に正常に送信されたデータグラムの数。                                     |
| `datadog.dogstatsd.client.packets_dropped` | count       | DogStatsD クライアントによってドロップされたデータグラムの数。                                    |

テレメトリーを無効にするには、`disable_telemetry` メソッドを次のように使用します。

```python
statsd.disable_telemetry()
```

クライアントコンフィギュレーションについて詳しくは、[DataDog/datadogpy][1] を参照してください。

[1]: https://github.com/DataDog/datadogpy
{{% /tab %}}
{{% tab "Ruby" %}}

バージョン `4.6.0` 以降の Ruby クライアントが必要です。

| メトリクス名                               | メトリクスタイプ | 説明                                                                             |
|--------------------------------------------|-------------|-----------------------------------------------------------------------------------------|
| `datadog.dogstatsd.client.metrics`         | count       | アプリケーションによって DogStatsD クライアントに送信された `metrics` の数 (サンプリング前)。 |
| `datadog.dogstatsd.client.events`          | count       | アプリケーションによって DogStatsD クライアントに送信された `events` の数。                    |
| `datadog.dogstatsd.client.service_checks`  | count       | アプリケーションによって DogStatsD クライアントに送信された `service_checks` の数。            |
| `datadog.dogstatsd.client.bytes_sent`      | count       | Agent に正常に送信されたバイト数。                                         |
| `datadog.dogstatsd.client.bytes_dropped`   | count       | DogStatsD クライアントによってドロップされたバイト数。                                        |
| `datadog.dogstatsd.client.packets_sent`    | count       | Agent に正常に送信されたデータグラムの数。                                     |
| `datadog.dogstatsd.client.packets_dropped` | count       | DogStatsD クライアントによってドロップされたデータグラムの数。                                    |

テレメトリーを無効にするには、 `disable_telemetry` パラメーターを `true` に設定します。

```ruby
Datadog::Statsd.new('localhost', 8125, disable_telemetry: true)
```

クライアントコンフィギュレーションについて詳しくは、[DataDog/dogstatsd-ruby][1] を参照してください。

[1]: https://github.com/DataDog/dogstatsd-ruby
{{% /tab %}}
{{% tab "Go" %}}

バージョン `3.4.0` 以降の Go クライアントが必要です。

| メトリクス名                                       | メトリクスタイプ  | 説明                                                                             |
|---------------------------------------------------|--------------|-----------------------------------------------------------------------------------------|
| `datadog.dogstatsd.client.metrics`                | count        | アプリケーションによって DogStatsD クライアントに送信された `metrics` の数 (サンプリング前)。 |
| `datadog.dogstatsd.client.events`                 | count        | アプリケーションによって DogStatsD クライアントに送信された `events` の数。                    |
| `datadog.dogstatsd.client.service_checks`         | count        | アプリケーションによって DogStatsD クライアントに送信された `service_checks` の数。            |
| `datadog.dogstatsd.client.bytes_sent`             | count        | Agent に正常に送信されたバイト数。                                         |
| `datadog.dogstatsd.client.bytes_dropped`          | count        | DogStatsD クライアントによってドロップされたバイト数。                                        |
| `datadog.dogstatsd.client.bytes_dropped_queue`    | count        | DogStatsD クライアントのキューが一杯だったためにドロップされたバイト数。                    |
| `datadog.dogstatsd.client.bytes_dropped_writer`   | count        | Datadog への書き込みでエラーが起きたためにドロップされたバイト数。                   |
| `datadog.dogstatsd.client.packets_sent`           | count        | Agent に正常に送信されたデータグラムの数。                                     |
| `datadog.dogstatsd.client.packets_dropped`        | count        | DogStatsD クライアントによってドロップされたデータグラムの数。                                    |
| `datadog.dogstatsd.client.packets_dropped_queue`  | count        | DogStatsD クライアントのキューが一杯だったためにドロップされたデータグラムの数。                |
| `datadog.dogstatsd.client.packets_dropped_writer` | count        | Datadog への書き込みでエラーが起きたためにドロップされたデータグラムの数。               |


テレメトリーを無効にするには、`WithoutTelemetry` を次のように設定します。

```go
statsd, err: = statsd.New("127.0.0.1:8125", statsd.WithoutTelemetry())
```

クライアントコンフィギュレーションについて詳しくは、[DataDog/datadog-go][1] を参照してください。

[1]: https://github.com/DataDog/datadog-go
{{% /tab %}}
{{% tab "Java" %}}

テレメトリーは間もなく Java クライアントに追加されます。

{{% /tab %}}
{{% tab "PHP" %}}

テレメトリーは間もなく PHP クライアントに追加されます。

{{% /tab %}}
{{% tab ".NET" %}}

テレメトリーは間もなく .NET クライアントに追加されます。

{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent
[2]: /ja/developers/dogstatsd/unix_socket
[3]: /ja/developers/dogstatsd/#code
[4]: /ja/developers/metrics/dogstatsd_metrics_submission/#sample-rates