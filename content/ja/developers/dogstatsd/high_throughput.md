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

### Datadog 公式クライアントを使用する

すべての主要なプログラミング言語に対して Datadog が提供する[公式 DogStatsD クライアント][3]の最新バージョンを使用することをお勧めします。

### クライアント側のバッファリングを有効にする

StatsD や DogStatsD のクライアントが、デフォルトで 1 つのデータグラムごとに 1 つのメトリクスを送信する場合がありますが、これによりクライアントやオペレーティングシステム、そして Agent のオーバーヘッドは非常に高くなります。複数のメトリクスを 1 つのダイアグラムにバッファリングできるようにクライアントを作成し、このオプションを有効にすることで問題を著しく改善できます。

バッファリングをサポートする、コミュニティサポートの DogStatsD クライアントを使用している場合、Agent 側のデータごとのバッファサイズ (デフォルトで 8KB、`dogstatsd_buffer_size` を使用して Agent で構成可能) およびネットワーク/OS の最大データグラムサイズを超えない最大データグラムサイズを構成するようにしてください。

[DogStatsD が公式にサポートするクライアント][3]の例をご紹介します。

{{< programming-lang-wrapper langs="go,python,ruby,java,.NET,PHP" >}}
{{< programming-lang lang="go" >}}

デフォルトでは、Datadog の公式 Golang ライブラリ [DataDog/datadog-go][1] はバッファリングを使用します。各パケットのサイズとメッセージの数は、`UDS` と `UDP` に異なるデフォルト値を使用します。クライアントコンフィギュレーションの詳細については、[DataDog/datadog-go][1] を参照してください。

```go
package main

import (
        "log"
        "github.com/DataDog/datadog-go/statsd"
)

func main() {
  // この例では、メトリクスはデフォルトで UDP の正しいデフォルトコンフィギュレーションでバッファリングされます。
  statsd, err := statsd.New("127.0.0.1:8125")
  if err != nil {
    log.Fatal(err)
  }

  statsd.Gauge("example_metric.gauge", 1, []string{"env:dev"}, 1)
}
```

[1]: https://github.com/DataDog/datadog-go
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

以下のコードブロックは、Datadog 公認の Python ライブラリである [datadogpy][1] を使用し、最大 `25` のメトリクスを 1 つのパケットで送信するようバッファリングされた DogStatsD クライアントインスタンスを作成します。

```python
from datadog import DogStatsd

with DogStatsd(host="127.0.0.1", port=8125, max_buffer_size=25) as batch:
    batch.gauge('example_metric.gauge_1', 123, tags=["environment:dev"])
    batch.gauge('example_metric.gauge_2', 1001, tags=["environment:dev"])
```


[1]: https://github.com/DataDog/datadogpy
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

以下のコードブロックは、Datadog 公認の Ruby ライブラリである [dogstatsd-ruby][1] を使用し、複数のメトリクスを 1 つのパケットで送信するようバッファリングされた DogStatsD クライアントインスタンスを作成します。

```ruby
require 'datadog/statsd'

statsd = Datadog::Statsd.new('127.0.0.1', 8125)

statsd.increment('example_metric.increment', tags: ['environment:dev'])
statsd.gauge('example_metric.gauge', 123, tags: ['environment:dev'])

statsd.flush(sync: true)
```


[1]: https://github.com/DataDog/dogstatsd-ruby
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}


以下の例では、Datadog 公認の Java ライブラリである [java-dogstatsd-client][1] を使用して、最大のパケットサイズが 1500 バイトのバッファリングされた DogStatsD クライアントインスタンスを作成します。このクライアントインスタンスから送信されるメトリクスはすべてバッファリングされ、最大で `1500` パケット長のパッケージに入れて送信されます。

```java
import com.timgroup.statsd.NonBlockingStatsDClient;
import com.timgroup.statsd.StatsDClient;
import java.util.Random;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClientBuilder()
            .prefix("namespace").
            .hostname("127.0.0.1")
            .port(8125)
            .maxPacketSizeBytes(1500)
            .build();

        Statsd.incrementCounter("example_metric.increment", ["environment:dev"]);
        Statsd.recordGaugeValue("example_metric.gauge", 100, ["environment:dev"]);
    }
}
```


[1]: https://github.com/DataDog/java-dogstatsd-client
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}
以下の例では、Datadog 公認の C# ライブラリである [dogstatsd-csharp-client][1] を使用し、UDP で転送を行う DogStatsD クライアントを作成します。

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
            dogStatsdService.Configure(dogstatsdConfig);

            // カウンターとゲージは同じデータグラムで送信されます
            dogStatsdService.Counter("example_metric.count", 2, tags: new[] { "environment:dev" });
            dogStatsdService.Gauge("example_metric.gauge", 100, tags: new[] { "environment:dev" });
        }
    }
}
```


[1]: https://github.com/DataDog/dogstatsd-csharp-client
{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

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
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

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
sysctl -w net.core.rmem_max=26214400
```

これを永続的に変更するには、次のコンフィギュレーションを `/etc/sysctl.conf` に追加します。

```conf
net.core.rmem_max = 26214400
```

続いて、Agent の `dogstatsd_so_rcvbuf` コンフィギュレーションオプションを、`datadog.yaml` 内で同じ数値に設定します。

```yaml
dogstatsd_so_rcvbuf: 26214400
```

Kubernetes で Agent または DogStatsD を開発している場合は、[Kubernetes の sysctl に関するメモ][5] セクションを参照してください。

### UDS (Unix Domain Socket) 経由

#### Linux

UDS ソケットの場合、リーダーがライターより遅い場合、Linux はキュー内のデータグラムを内部的にバッファリングしています。このキューのサイズは、Linux がソケットごとにバッファリングするデータグラムの最大数を表します。この値は、次のコマンドで照会できます。

```bash
sysctl net.unix.max_dgram_qlen
```

値が 512 未満の場合は、次のコマンドを使用して 512 以上に増やすことができます。

```bash
sysctl -w net.unix.max_dgram_qlen=512
```

これを永続的に変更するには、次のコンフィギュレーションを `/etc/sysctl.conf` に追加します。

```conf
net.unix.max_dgram_qlen = 512
```

同様に、`net.core.wmem_max` を 4MiB に増やして、クライアントの書き込みパフォーマンスを向上させることができます。

```conf
net.core.wmem_max = 4194304
```

続いて、Agent の `dogstatsd_so_rcvbuf` コンフィギュレーションオプションを、`datadog.yaml` 内で同じ数値に設定します。

```yaml
dogstatsd_so_rcvbuf: 4194304
```

#### Kubernetes の sysctl に関するメモ

Kubernetes を使用して Agent および/または DogStatsD をデプロイし、上記のように sysctl を構成する場合、その値の設定はコンテナごとに行う必要があります。ネームスペースを使用した `net.*` sysctl は、ポッドごとに設定できます。コンテナ内の sysctl へのアクセスを許可する方法や値の設定方法については、[Kubernetes 公式ドキュメント][6]を参照してください。

### 適切なパケットサイズを確保する

適切なサイズのパケットを Datadog Agent の DogStatsD サーバーに送信することにより、余分な CPU 使用を回避します。公式 DogStatsD クライアントの最新バージョンは、パフォーマンスに最適化されたサイズのパケットを送信します。

最新の Datadog DogStatsD クライアントのいずれかを使用している場合は、このセクションをスキップできます。

送信されたパケットが小さすぎる場合、Datadog Agent は複数を一緒にパックして、後でパイプラインでバッチ処理します。公式 DogStatsD クライアントは、メトリクスをグループ化して、パケットあたりのメトリクスの数の比率を最適化できます。

DogStatsD クライアントが `dogstatsd_buffer_size` のサイズのパケットを送信する場合、Datadog Agent が最も最適に動作します。パケットはバッファサイズより大きくしてはなりません。そうでない場合、Agent はパケットをバッファに完全にロードできず、一部のメトリクスが不正になります。DogStatsD クライアントの対応するコンフィギュレーションフィールドを使用します。

UDP に関する注意: UDP パケットは通常 Ethernet および IP レイヤーを通過するため、パケットサイズをネットワーク上の単一の Ethernet フレームよりも小さい値に制限することにより、IP パケットの断片化を回避します。ほとんどの場合、IPv4 ネットワークは 1500 バイトの MTU で構成されているため、この状況では送信パケットのパケットサイズを 1472 に制限する必要があります。

UDS に関する注意: 最高のパフォーマンスを得るには、UDS パケットのサイズが 8192 バイトである必要があります。

### Agent の最大メモリ使用量を制限する

Agent は、DogStatsD クライアントから送信されたメトリクスのバーストを吸収しようとしますが、そのためには、メモリを使用する必要があります。これが短時間であり、このメモリが OS にすぐに解放された場合でも、スパイクが発生し、メモリ使用量の制限によりポッドまたはコンテナがエビクションされる可能性があるコンテナ化された環境で問題になる可能性があります。

アプリケーションでバーストでメトリクスを送信することは避けてください。これにより、Datadog Agent が最大メモリ使用量に達するのを防ぎます。

最大メモリ使用量を制限するために注意すべきもう 1 つのことは、バッファリングを減らすことです。Agent 内の DogStatsD サーバーのメインバッファは、`dogstatsd_queue_size` フィールドで構成できます (Datadog Agent 6.1.0 以降)。そのデフォルト値の `1024` は、およその最大メモリ使用量である 768MB を引き起こします。

**注**: このバッファを減らすと、パケットドロップの数が増える可能性があります。

この例では、DogStatsD の最大メモリ使用量を約 384MB に減らします。

```yaml
dogstatsd_queue_size: 512
```

バースト検知を使用してアプリケーションからメトリクスのバーストを検知するには、次のセクションを参照してください。

### メトリクスの処理統計とバースト検知を有効にする

DogStatsD には、どのメトリクスが最も多く処理されたかを把握するのに役立つ統計モードが搭載されています。

**注**: このモードを有効化すると、DogStatsD のパフォーマンスが低下する場合があります。

この統計モードは以下のいずれかの方法で有効化できます。

- コンフィギュレーションファイルで `dogstatsd_stats_enable` を `true` に設定
- 環境変数 `DD_DOGSTATSD_STATS_ENABLE` を `true` に設定
- `datadog-agent config set dogstatsd_stats true` コマンドを使用して、ランタイム時に有効化を行います。ランタイム時にこれを無効化するには、`datadog-agent config set dogstatsd_stats false` コマンドを使用してください。

このモードを有効化したら、コマンド `datadog-agent dogstatsd-stats` を実行します。処理されたメトリクスのリストが最も受信数の多い順で返されます。

このモードでシステムを実行すると、DogStatsD サーバーがバースト検知メカニズムを実行します。バーストが検知されたら警告ログが送信されます。例:

```text
DogStatSd によりメトリクスのバーストが検知されました。最後の 5 秒間のメトリクスカウントは次の通りです: [250 230 93899 233 218]
```

## クライアント側のテレメトリー

DogStatsD クライアントは、デフォルトでテレメトリーメトリクスを Agent に送信します。これを利用して、ボトルネックが存在する場合にトラブルシューティングを行うことができます。各メトリクスには、クライアントの言語とバージョンがタグ付けされます。これらのメトリクスはカスタムメトリクスとしてカウントされません。

以下のタグは、すべてのクライアントに共通してタグ付けされます。

| タグ                | 説明                                       | 例                |
| ------------------ | ------------------------------------------------- | ---------------------- |
| `client`           | クライアントの言語                        | `client:py`            |
| `client_version`   | クライアントのバージョン                         | `client_version:1.2.3` |
| `client_transport` | クライアントが使用する転送プロトコル (`udp` または `uds`) | `client_transport:uds` |

**注**: UDP を使用すると、クライアントがネットワークエラーを検出できないため、バイトやパケットがドロップしてもメトリクスには反映されません。

{{< programming-lang-wrapper langs="python,ruby,go,java,PHP,.NET" >}}
{{< programming-lang lang="python" >}}

バージョン `0.34.0` 以降の Python クライアントが必要です。

| メトリクス名                               | メトリクスタイプ | 説明                                                                                 |
| ------------------------------------------ | ----------- | ------------------------------------------------------------------------------------------- |
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
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

バージョン `4.6.0` 以降の Ruby クライアントが必要です。

| メトリクス名                               | メトリクスタイプ | 説明                                                                                 |
| ------------------------------------------ | ----------- | ------------------------------------------------------------------------------------------- |
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
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

バージョン `3.4.0` 以降の Go クライアントが必要です。

| メトリクス名                                          | メトリクスタイプ | 説明                                                                                                                                                         |
| ---------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `datadog.dogstatsd.client.metrics`                   | count       | アプリケーションによって DogStatsD クライアントに送信された `metrics` の数 (サンプリング前)。                                                                         |
| `datadog.dogstatsd.client.events`                    | count       | アプリケーションによって DogStatsD クライアントに送信された `events` の数。                                                                                            |
| `datadog.dogstatsd.client.service_checks`            | count       | アプリケーションによって DogStatsD クライアントに送信された `service_checks` の数。                                                                                    |
| `datadog.dogstatsd.client.bytes_sent`                | count       | Agent に正常に送信されたバイト数。                                                                                                                 |
| `datadog.dogstatsd.client.bytes_dropped`             | count       | DogStatsD クライアントによってドロップされたバイト数。                                                                                                                |
| `datadog.dogstatsd.client.bytes_dropped_queue`       | count       | DogStatsD クライアントのキューが一杯だったためにドロップされたバイト数。                                                                                            |
| `datadog.dogstatsd.client.bytes_dropped_writer`      | count       | Datadog への書き込みでエラーが起きたためにドロップされたバイト数。                                                                                           |
| `datadog.dogstatsd.client.packets_sent`              | count       | Agent に正常に送信されたデータグラムの数。                                                                                                             |
| `datadog.dogstatsd.client.packets_dropped`           | count       | DogStatsD クライアントによってドロップされたデータグラムの数。                                                                                                            |
| `datadog.dogstatsd.client.packets_dropped_queue`     | count       | DogStatsD クライアントのキューが一杯だったためにドロップされたデータグラムの数。                                                                                        |
| `datadog.dogstatsd.client.packets_dropped_writer`    | count       | Datadog への書き込みでエラーが起きたためにドロップされたデータグラムの数。                                                                                       |
| `datadog.dogstatsd.client.metric_dropped_on_receive` | count       | 内部受信チャンネルがいっぱいであるためにドロップされたメトリクスの数 (`WithChannelMode()` を使用している場合のみ)。バージョン `3.6.0` 以降の Go クライアントが必要です。 |

テレメトリーを無効にするには、`WithoutTelemetry` を次のように設定します。

```go
statsd, err: = statsd.New("127.0.0.1:8125", statsd.WithoutTelemetry())
```

クライアントコンフィギュレーションについて詳しくは、[DataDog/datadog-go][1] を参照してください。


[1]: https://github.com/DataDog/datadog-go
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

バージョン `2.10.0` 以降の Java クライアントが必要です。

| メトリクス名                                      | メトリクスタイプ | 説明                                                                                 |
| ------------------------------------------------ | ----------- | ------------------------------------------------------------------------------------------- |
| `datadog.dogstatsd.client.metrics`               | count       | アプリケーションによって DogStatsD クライアントに送信された `metrics` の数 (サンプリング前)。 |
| `datadog.dogstatsd.client.events`                | count       | アプリケーションによって DogStatsD クライアントに送信された `events` の数。                    |
| `datadog.dogstatsd.client.service_checks`        | count       | アプリケーションによって DogStatsD クライアントに送信された `service_checks` の数。            |
| `datadog.dogstatsd.client.bytes_sent`            | count       | Agent に正常に送信されたバイト数。                                         |
| `datadog.dogstatsd.client.bytes_dropped`         | count       | DogStatsD クライアントによってドロップされたバイト数。                                        |
| `datadog.dogstatsd.client.packets_sent`          | count       | Agent に正常に送信されたデータグラムの数。                                     |
| `datadog.dogstatsd.client.packets_dropped`       | count       | DogStatsD クライアントによってドロップされたデータグラムの数。                                    |
| `datadog.dogstatsd.client.packets_dropped_queue` | count       | DogStatsD クライアントのキューが一杯だったためにドロップされたデータグラムの数。                |

テレメトリーを無効にするには、`enableTelemetry(false)` ビルダーオプションを使用します。

```java
StatsDClient client = new NonBlockingStatsDClientBuilder()
    .hostname("localhost")
    .port(8125)
    .enableTelemetry(false)
    .build();
```

クライアントコンフィギュレーションについて詳しくは、[DataDog/java-dogstatsd-client][1] を参照してください。


[1]: https://github.com/DataDog/java-dogstatsd-client
{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

PHP クライアントのバージョン `1.5.0` 以降、テレメトリーは `BatchedDogStatsd` クライアントに対してデフォルトで有効になり、`DogStatsd` クライアントに対してデフォルトで無効になります。


| メトリクス名                               | メトリクスタイプ | 説明                                                                                 |
| ------------------------------------------ | ----------- | ------------------------------------------------------------------------------------------- |
| `datadog.dogstatsd.client.metrics`         | count       | アプリケーションによって DogStatsD クライアントに送信された `metrics` の数 (サンプリング前)。 |
| `datadog.dogstatsd.client.events`          | count       | アプリケーションによって DogStatsD クライアントに送信された `events` の数。                    |
| `datadog.dogstatsd.client.service_checks`  | count       | アプリケーションによって DogStatsD クライアントに送信された `service_checks` の数。            |
| `datadog.dogstatsd.client.bytes_sent`      | count       | Agent に正常に送信されたバイト数。                                         |
| `datadog.dogstatsd.client.bytes_dropped`   | count       | DogStatsD クライアントによってドロップされたバイト数。                                        |
| `datadog.dogstatsd.client.packets_sent`    | count       | Agent に正常に送信されたデータグラムの数。                                     |
| `datadog.dogstatsd.client.packets_dropped` | count       | DogStatsD クライアントによってドロップされたデータグラムの数。                                    |

テレメトリーを有効または無効にするには、`disable_telemetry` 引数を使用します。`DogStatsd` クライアントでテレメトリーを使用すると、ネットワークの使用量が大幅に増加するので注意してください。テレメトリーを使用する場合は、`BatchedDogStatsd` を使用することをお勧めします。

`DogStatsd` クライアントで有効にするには

```php
use DataDog\DogStatsd;

$statsd = new DogStatsd(
    array('host' => '127.0.0.1',
          'port' => 8125,
          'disable_telemetry' => false,
      )
  );
```

`BatchedDogStatsd` クライアントでテレメトリーを無効にするには

```php
use DataDog\BatchedDogStatsd;

$statsd = new BatchedDogStatsd(
    array('host' => '127.0.0.1',
          'port' => 8125,
          'disable_telemetry' => true,
      )
  );
```

クライアントコンフィギュレーションについて詳しくは、[DataDog/php-datadogstatsd][1] を参照してください。

[1]: https://github.com/DataDog/php-datadogstatsd
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

バージョン `5.0.0` 以降の .NET クライアントが必要です。

| メトリクス名                                          | メトリクスタイプ | 説明                                                                                                                                                     |
| ---------------------------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `datadog.dogstatsd.client.metrics`                   | count       | アプリケーションによって DogStatsD クライアントに送信された `metrics` の数 (サンプリング前)。                                                                         |
| `datadog.dogstatsd.client.events`                    | count       | アプリケーションによって DogStatsD クライアントに送信された `events` の数。                                                                                            |
| `datadog.dogstatsd.client.service_checks`            | count       | アプリケーションによって DogStatsD クライアントに送信された `service_checks` の数。                                                                                    |
| `datadog.dogstatsd.client.bytes_sent`                | count       | Agent に正常に送信されたバイト数。                                                                                                                 |
| `datadog.dogstatsd.client.bytes_dropped`             | count       | DogStatsD クライアントによってドロップされたバイト数。                                                                                                                |
| `datadog.dogstatsd.client.packets_sent`              | count       | Agent に正常に送信されたデータグラムの数。                                                                                                             |
| `datadog.dogstatsd.client.packets_dropped`           | count       | DogStatsD クライアントによってドロップされたデータグラムの数。                                                                                                            |
| `datadog.dogstatsd.client.packets_dropped_queue`     | count       | DogStatsD クライアントのキューが一杯だったためにドロップされたデータグラムの数。                                                                                        |

テレメトリーを無効にするには、`TelemetryFlushInterval` を `null` に設定します。

```csharp
var dogstatsdConfig = new StatsdConfig
{
    StatsdServerName = "127.0.0.1",
    StatsdPort = 8125,
};

// テレメトリーを無効にする
dogstatsdConfig.Advanced.TelemetryFlushInterval = null;
```

クライアントコンフィギュレーションについて詳しくは、[DataDog/dogstatsd-csharp-client][1] を参照してください。



[1]: https://github.com/DataDog/dogstatsd-csharp-client
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/
[2]: /ja/developers/dogstatsd/unix_socket/
[3]: /ja/developers/dogstatsd/#code
[4]: /ja/developers/metrics/dogstatsd_metrics_submission/#sample-rates
[5]: /ja/developers/dogstatsd/high_throughput/#note-on-sysctl-in-kubernetes
[6]: https://kubernetes.io/docs/tasks/administer-cluster/sysctl-cluster/