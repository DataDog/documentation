---
title: 'メトリクスの送信: DogStatsD'
kind: documentation
description: アプリケーションから直接カスタムメトリクスを送信
aliases:
  - /ja/developers/faq/reduce-submission-rate
  - /ja/developers/faq/why-is-my-counter-metric-showing-decimal-values
  - /ja/developers/faq/dog-statsd-sample-rate-parameter-explained
further_reading:
  - link: developers/dogstatsd
    tag: ドキュメント
    text: DogStatsD 入門
  - link: developers/metrics/types
    tag: ドキュメント
    text: Datadog メトリクスタイプ
---
StatsD がメトリクスのみを受け付けるのに対して、DogStatsD は、Datadog の主要な 3 種類のデータタイプ、すなわちメトリクス、イベント、サービスチェックをすべて受け付けます。ここでは、メトリクスタイプごとの一般的な使用例を示し、DogStatsD だけが持つ[サンプリングレート](#sample-rates)および[メトリクスのタグ付け](#metric-tagging)オプションを紹介します。

[COUNT](#count)、 [GAUGE](#gauge)、[SET](#set)は、StatsD ユーザーにお馴染みのメトリクスタイプです。StatsD の `TIMER` は DogStatsD の `HISTOGRAM` のサブセットです。また、DogStatsD を使い、[HISTOGRAM](#histogram) や [DISTRIBUTION](#distribution) メトリクスタイプを送信できます。

**注**: 使用した送信方法により、Datadog 内に保存される実際のメトリクスタイプは送信メトリクスタイプと異なる場合があります。

## 関数

[DogStatsD をインストール][1]すると、Datadog へメトリクスを送信する際、メトリクスタイプに応じて以下の関数を使用できます。関数には、次の共有パラメーターがあります。

| パラメーター        | 種類            | 必須 | 説明                                                                                                                                                                                    |
|------------------|-----------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `<METRIC_NAME>`  | 文字列          | はい      | 送信するメトリクスの名前。                                                                                                                                                                  |
| `<METRIC_VALUE>` | Double          | はい      | メトリクスに関連付けられている値                                                                                                                                                             |
| `<SAMPLE_RATE>`  | Double          | いいえ       | メトリクスに適用するサンプリングレート。`0`（全てがサンプリングされ何も送信されない）〜`1` （サンプル無し）の値を利用。詳細は、[サンプリングレートセクション](#sample-rates)をご覧ください。 |
| `<TAGS>`         | 文字列のリスト | いいえ       | メトリクスに適用するタグのリスト。詳細は、[メトリクスのタグ付け](#metric-tagging)セクションをご覧ください。                                                                                       |

### カウント (COUNT)

| メソッド                                                        | 説明                                               | 保存タイプ                                                                                                                                           |
|---------------------------------------------------------------|-----------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| `increment(<METRIC_NAME>, <SAMPLE_RATE>, <TAGS>)`             | COUNT メトリクスをインクリメントするのに使用。                         | Datadog に `RATE` タイプとして保存されます。時系列に保存される値は、StatsD フラッシュ期間全体のメトリクス値の時間正規化された差分です。 |
| `decrement(<METRIC_NAME>, <SAMPLE_RATE>, <TAGS>)`             | COUNT メトリクスをデクリメントするのに使用。                         | Datadog に `RATE` タイプとして保存されます。時系列に保存される値は、StatsD フラッシュ期間全体のメトリクス値の時間正規化された差分です。 |
| `count(<METRIC_NAME>, <METRIC_VALUE>, <SAMPLE_RATE>, <TAGS>)` | 任意の `Value` から COUNT メトリクスをインクリメントするのに使用。 | Datadog に `RATE` タイプとして保存されます。時系列に保存される値は、StatsD フラッシュ期間全体のメトリクス値の時間正規化された差分です。 |

**注**: `COUNT` タイプのメトリクスは、フラッシュ間隔で正規化され 1 秒あたりの単位数を報告するため、Datadog 内で少数を表示できます。

#### コード例

`RATE` メトリクスとして保存された `COUNT` メトリクスを Datadog に送信します。 `COUNT` タイプについては、[メトリクスのタイプ][2] に関するドキュメントを参照してください。

{{< tabs >}}
{{% tab "Python" %}}

以下の Python コードを実行し、DogStatsD `COUNT` メトリクスを Datadog へ送信。

{{< code-block lang="python" filename="count_metric.py" >}}
from datadog import initialize, statsd
import time

options = {
    'statsd_host':'127.0.0.1',
    'statsd_port':8125
}

initialize(**options)

while(1):
  statsd.increment('example_metric.increment', tags=["environment:dev"])
  statsd.decrement('example_metric.decrement', tags=["environment:dev"])
  time.sleep(10)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Ruby" %}}

以下の Ruby コードを実行し、DogStatsD `COUNT` メトリクスを Datadog へ送信。

{{< code-block lang="ruby" filename="count_metric.rb" >}}
require 'datadog/statsd'

statsd = Datadog::Statsd.new('localhost', 8125)

while true do
    statsd.increment('example_metric.increment', tags: ['environment:dev'])
    statsd.decrement('example_metric.decrement', tags: ['environment:dev'])
    statsd.count('example_metric.count', 2, tags: ['environment:dev'])
    sleep 10
end
{{< /code-block >}}

{{% /tab %}}
{{% tab "Go" %}}

以下の Go コードを実行し、DogStatsD `COUNT` メトリクスを Datadog へ送信。

{{< code-block lang="go" filename="count_metric.go" >}}
package main

import (
    "log"
    "time"

    "github.com/DataDog/datadog-go/statsd"
)

func main() {
    statsd, err := statsd.New("127.0.0.1:8125")
    if err != nil {
        log.Fatal(err)
    }
    for {

        statsd.Incr("example_metric.increment", []string{"environment:dev"}, 1)
        statsd.Decr("example_metric.decrement", []string{"environment:dev"}, 1)
        statsd.Count("example_metric.count", 2, []string{"environment:dev"}, 1)
        time.Sleep(10 * time.Second)
    }
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

以下の Java コードを実行し、DogStatsD `COUNT` メトリクスを Datadog へ送信。

{{< code-block lang="java" filename="count_metric.java" >}}
import com.timgroup.statsd.NonBlockingStatsDClient;
import com.timgroup.statsd.StatsDClient;
import java.util.Random;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClient("statsd", "localhost", 8125);
        for (int i = 0; i < 10; i++) {
            Statsd.incrementCounter("example_metric.increment", new String[]{"environment:dev"});
            Statsd.decrementCounter("example_metric.decrement", new String[]{"environment:dev"});
            Statsd.count("example_metric.count", 2, new String[]{"environment:dev"});
            Thread.sleep(100000);
        }
    }
}
{{< /code-block >}}

{{% /tab %}}
{{% tab ".NET" %}}

以下の .NET コードを実行し、DogStatsD `COUNT` メトリクスを Datadog へ送信。

{{< code-block lang="csharp" filename="count_metric.cs" >}}
using StatsdClient;
using System;

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

        var random = new Random(0);

        for (int i = 0; i < 10; i++)
        {
            DogStatsd.Increment("example_metric.increment", tags: new[] {"environment:dev"});
            DogStatsd.Decrement("example_metric.decrement", tags: new[] {"environment:dev"});
            DogStatsd.Counter("example_metric.count", 2, tags: new[] {"environment:dev"});
            System.Threading.Thread.Sleep(random.Next(100000));
        }
    }
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "PHP" %}}

以下の PHP コードを実行し、DogStatsD `COUNT` メトリクスを Datadog へ送信。

{{< code-block lang="php" filename="count_metric.php" >}}
<?php

require __DIR__ . '/vendor/autoload.php';

use DataDog\DogStatsd;

$statsd = new DogStatsd(
    array('host' => '127.0.0.1',
          'port' => 8125,
     )
  );

while (TRUE) {
    $statsd->increment('example_metric.increment', array('environment'=>'dev'));
    $statsd->decrement('example_metric.decrement', array('environment'=>'dev'));
    sleep(10);
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

上のコードを実行すると、メトリクスデータを Datadog でグラフ化できます。

{{< img src="developers/metrics/dogstatsd_metrics_submission/increment_decrement.png" alt="Increment Decrement" >}}

値は `COUNT` として送信されるため、Datadog に `RATE` として保存されます。Datadog で未加工のカウントを取得するには、[累積合計][3] や [積分][4] などの関数を系列に適用します。

{{< img src="developers/metrics/dogstatsd_metrics_submission/increment_decrement_cumsum.png" alt="Increment Decrement with Cumsum" >}}

### ゲージ (GAUGE)

| メソッド                                                        | Datadog 保存タイプ                                                                                                                                      |
|---------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `gauge(<METRIC_NAME>, <METRIC_VALUE>, <SAMPLE_RATE>, <TAGS>)` | Datadog に `GAUGE` タイプとして保存されます。時系列に保存される値は、StatsD フラッシュ期間の間にメトリクスに送信された最後のゲージ値です。 |

#### コード例

`GAUGE` メトリクスとして保存された `GAUGE` メトリクスを Datadog に送信します。 `GAUGE` タイプについては、[メトリクスのタイプ][5] に関するドキュメントを参照してください。

{{< tabs >}}
{{% tab "Python" %}}

以下の Python コードを実行し、DogStatsD `GAUGE` メトリクスを Datadog へ送信。

{{< code-block lang="python" filename="gauge_metric.py" >}}
from datadog import initialize, statsd
import time

options = {
    'statsd_host':'127.0.0.1',
    'statsd_port':8125
}

initialize(**options)

i = 0

while(1):
  i += 1
  statsd.gauge('example_metric.gauge', i, tags=["environment:dev"])
  time.sleep(10)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Ruby" %}}

以下の Ruby コードを実行し、DogStatsD `GAUGE` メトリクスを Datadog へ送信。

{{< code-block lang="ruby" filename="gauge_metric.rb" >}}
require 'datadog/statsd'

statsd = Datadog::Statsd.new('localhost', 8125)

i = 0

while true do
    i += 1
    statsd.gauge('example_metric.gauge', i, tags: ['environment:dev'])
    sleep 10
end
{{< /code-block >}}

{{% /tab %}}
{{% tab "Go" %}}

以下の Go コードを実行し、DogStatsD `GAUGE` メトリクスを Datadog へ送信。

{{< code-block lang="go" filename="gauge_metric.go" >}}
package main

import (
    "log"
    "time"

    "github.com/DataDog/datadog-go/statsd"
)

func main() {
    statsd, err := statsd.New("127.0.0.1:8125")
    if err != nil {
        log.Fatal(err)
    }
    var i float64
    for {
        i += 1
        statsd.Gauge("example_metric.gauge", i, []string{"environment:dev"}, 1)
        time.Sleep(10 * time.Second)
    }
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

以下の Java コードを実行し、DogStatsD `GAUGE` メトリクスを Datadog へ送信。

{{< code-block lang="java" filename="gauge_metric.java" >}}
import com.timgroup.statsd.NonBlockingStatsDClient;
import com.timgroup.statsd.StatsDClient;
import java.util.Random;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClient("statsd", "localhost", 8125);
        for (int i = 0; i < 10; i++) {
            Statsd.recordGaugeValue("example_metric.gauge", i, new String[]{"environment:dev"});
            Thread.sleep(10000);
        }
    }
}
{{< /code-block >}}

{{% /tab %}}
{{% tab ".NET" %}}

以下の .NET コードを実行し、DogStatsD `GAUGE` メトリクスを Datadog へ送信。

{{< code-block lang="csharp" filename="gauge_metric.cs" >}}
using StatsdClient;
using System;

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

        var random = new Random(0);

        for (int i = 0; i < 10; i++)
        {
            DogStatsd.Gauge("example_metric.gauge", i, tags: new[] {"environment:dev"});
            System.Threading.Thread.Sleep(100000);
        }
    }
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "PHP" %}}

以下の PHP コードを実行し、DogStatsD `GAUGE` メトリクスを Datadog へ送信。

{{< code-block lang="php" filename="gauge_metric.php" >}}
<?php

require __DIR__ . '/vendor/autoload.php';

use DataDog\DogStatsd;

$statsd = new DogStatsd(
    array('host' => '127.0.0.1',
          'port' => 8125,
     )
  );

$i = 0;
while (TRUE) {
    $i++;
    $statsd->gauge('example_metric.gauge', $i, array('environment'=>'dev'));
    sleep(10);
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

上のコードを実行すると、メトリクスデータを Datadog でグラフ化できます。

{{< img src="developers/metrics/dogstatsd_metrics_submission/gauge.png" alt="Gauge" >}}

### SET

| メソッド                                                      | Datadog 保存タイプ                                                                                                                                           |
|-------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `set(<METRIC_NAME>, <METRIC_VALUE>, <SAMPLE_RATE>, <TAGS>)` | Datadog に `GAUGE` タイプとして保存されます。時系列に保存される値は、フラッシュ期間の間に StatsD に送信されたメトリクスの一意の値のカウントです。 |

#### コード例

`GAUGE` メトリクスとして保存された `SET` メトリクスを Datadog に送信します。 `SET` タイプについては、[メトリクスのタイプ][6] に関するドキュメントを参照してください。

{{< tabs >}}
{{% tab "Python" %}}

以下の Python コードを実行し、DogStatsD `SET` メトリクスを Datadog へ送信。

{{< code-block lang="python" filename="set_metric.py" >}}
from datadog import initialize, statsd
import time
import random

options = {
    'statsd_host':'127.0.0.1',
    'statsd_port':8125
}

initialize(**options)
i = 0
while(1):
  i += 1
  statsd.set('example_metric.set', i, tags=["environment:dev"])
  time.sleep(random.randint(0, 10))
{{< /code-block >}}

{{% /tab %}}
{{% tab "Ruby" %}}

以下の Ruby コードを実行し、DogStatsD `SET` メトリクスを Datadog へ送信。

{{< code-block lang="ruby" filename="set_metric.rb" >}}
require 'datadog/statsd'

statsd = Datadog::Statsd.new('localhost', 8125)

i = 0
while true do
    i += 1
    statsd.set('example_metric.gauge', i, tags: ['environment:dev'])
    sleep rand 10
end
{{< /code-block >}}

{{% /tab %}}
{{% tab "Go" %}}

以下の Go コードを実行し、DogStatsD `SET` メトリクスを Datadog へ送信。

{{< code-block lang="go" filename="set_metric.go" >}}
package main

import (
    "log"
    "math/rand"
    "strconv"
    "time"

    "github.com/DataDog/datadog-go/statsd"
)

func main() {
    statsd, err := statsd.New("127.0.0.1:8125")
    if err != nil {
        log.Fatal(err)
    }
    var i float64
    for {
        i += 1
        statsd.Set("example_metric.set", strconv.Itoa(i), []string{"environment:dev"}, 1)
        time.Sleep(rand.Intn(10) * time.Second)
    }
}
{{< /code-block >}}

{{% /tab %}}
{{% tab ".NET" %}}

以下の .NET コードを実行し、DogStatsD `SET` メトリクスを Datadog へ送信。

{{< code-block lang="csharp" filename="set_metric.cs" >}}
using StatsdClient;
using System;

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

        var random = new Random(0);

        for (int i = 0; i < 10; i++)
        {
            DogStatsd.Set("example_metric.set", i, tags: new[] {"environment:dev"});
            System.Threading.Thread.Sleep(random.Next(100000));
        }
    }
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "PHP" %}}

以下の PHP コードを実行し、DogStatsD `SET` メトリクスを Datadog へ送信。

{{< code-block lang="php" filename="set_metric.php" >}}
<?php

require __DIR__ . '/vendor/autoload.php';

use DataDog\DogStatsd;

$statsd = new DogStatsd(
    array('host' => '127.0.0.1',
          'port' => 8125,
     )
  );

$i = 0;

while (TRUE) {
    $i++;
    $statsd->set('example_metric.set', i, array('environment'=>'dev'));
    sleep(rand(0, 10));
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

上のコードを実行すると、メトリクスデータを Datadog でグラフ化できます。

{{< img src="developers/metrics/dogstatsd_metrics_submission/set.png" alt="Set" >}}

### ヒストグラム

| メソッド                                                            | Datadog 保存タイプ                                                                                                                                              |
|-------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `histogram(<METRIC_NAME>, <METRIC_VALUE>, <SAMPLE_RATE>, <TAGS>)` | 複数のメトリクスが送信されるので、保存されるメトリクスタイプ (`GAUGE`, `RATE`) はメトリクスに依存します。詳細については、[ヒストグラムメトリクスタイプ][7]に関するドキュメントを参照してください。 |

#### コンフィグレーション

* Datadog に送信する集計を、[datadog.yaml 構成ファイル][8]の `histogram_aggregates` パラメーターで構成します。デフォルトでは、`max`、`median`、`avg`、`count` の各集計だけが送信されます。
* Datadog に送信するパーセンタイル集計を、[datadog.yaml 構成ファイル][8]の `histogram_percentiles` パラメーターで構成します。デフォルトでは、`95pc` のパーセンタイルだけが送信されます。

#### コード例

`HISTOGRAM` メトリクスタイプは DogStatsD だけのものです。`GAUGE` および `RATE` メトリクスとして保存された `HISTOGRAM` メトリクスを Datadog に送信します。`HISTOGRAM` タイプについては、[メトリクスのタイプ][7]に関するドキュメントを参照してください。

{{< tabs >}}
{{% tab "Python" %}}

以下の Python コードを実行し、DogStatsD `HISTOGRAM` メトリクスを Datadog へ送信。

{{< code-block lang="python" filename="histogram_metric.py" >}}
from datadog import initialize, statsd
import time
import random

options = {
    'statsd_host':'127.0.0.1',
    'statsd_port':8125
}

initialize(**options)

while(1):
  statsd.histogram('example_metric.histogram', random.randint(0, 20), tags=["environment:dev"])
  time.sleep(2)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Ruby" %}}

以下の Ruby コードを実行し、DogStatsD `HISTOGRAM` メトリクスを Datadog へ送信。

{{< code-block lang="ruby" filename="histogram_metric.rb" >}}
require 'datadog/statsd'

statsd = Datadog::Statsd.new('localhost', 8125)

while true do
    statsd.set('example_metric.histogram', rand 20, tags: ['environment:dev'])
    sleep 2
end
{{< /code-block >}}

{{% /tab %}}
{{% tab "Go" %}}

以下の Go コードを実行し、DogStatsD `HISTOGRAM` メトリクスを Datadog へ送信。

{{< code-block lang="go" filename="histogram_metric.go" >}}
package main

import (
    "log"
    "math/rand"
    "time"

    "github.com/DataDog/datadog-go/statsd"
)

func main() {
    statsd, err := statsd.New("127.0.0.1:8125")
    if err != nil {
        log.Fatal(err)
    }

    for {
        statsd.Histogram("example_metric.histogram", rand.Intn(20), []string{"environment:dev"}, 1)
        time.Sleep(2 * time.Second)
    }
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

以下の Java コードを実行し、DogStatsD `HISTOGRAM` メトリクスを Datadog へ送信。

{{< code-block lang="java" filename="histogram_metric.java" >}}
import com.timgroup.statsd.NonBlockingStatsDClient;
import com.timgroup.statsd.StatsDClient;
import java.util.Random;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClient("statsd", "localhost", 8125);
        for (int i = 0; i < 10; i++) {
            Statsd.recordHistogramValue("example_metric.histogram", new Random().nextInt(20), new String[]{"environment:dev"});
            Thread.sleep(2000);
        }
    }
}
{{< /code-block >}}

{{% /tab %}}
{{% tab ".NET" %}}

以下の .NET コードを実行し、DogStatsD `HISTOGRAM` メトリクスを Datadog へ送信。

{{< code-block lang="csharp" filename="histogram_metric.cs" >}}
using StatsdClient;
using System;

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

        var random = new Random(0);

        for (int i = 0; i < 10; i++)
        {
            DogStatsd.Histogram("example_metric.histogram", random.Next(20), tags: new[] {"environment:dev"});
            System.Threading.Thread.Sleep(2000);
        }
    }
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "PHP" %}}

以下の PHP コードを実行し、DogStatsD `HISTOGRAM` メトリクスを Datadog へ送信。

{{< code-block lang="php" filename="histogram_metric.php" >}}
<?php

require __DIR__ . '/vendor/autoload.php';

use DataDog\DogStatsd;

$statsd = new DogStatsd(
    array('host' => '127.0.0.1',
          'port' => 8125,
     )
  );

while (TRUE) {
    $statsd->histogram('example_metric.histogram', rand(0, 20), array('environment'=>'dev'));
    sleep(2);
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

上のインスツルメンテーションは、以下のメトリクスを生成します。

| メトリクス                                  | 説明                             |
|-----------------------------------------|-----------------------------------------|
| `example_metric.histogram.count`        | このメトリクスがサンプリングされた回数 |
| `example_metric.histogram.avg`          | サンプリングされた値の平均時間      |
| `example_metric.histogram.median`       | サンプリングされた値の中央値                    |
| `example_metric.histogram.max`          | サンプリングされた値の最大値                   |
| `example_metric.histogram.95percentile` | サンプリングされた値の 95 パーセンタイル           |

上のコードを実行すると、メトリクスデータを Datadog でグラフ化できます。

{{< img src="developers/metrics/dogstatsd_metrics_submission/histogram.png" alt="Histogram" >}}

#### タイマー

DogStatsD の `TIMER` メトリクスタイプは `HISTOGRAM` メトリクスタイプとして実装されています（標準 StatsD に含まれるタイマーと混同しないでください）。また、コードセクションの実行にかかる時間など、タイミングデータのみを測定します。

| メソッド                                                        | Datadog ストレージタイプ                                                                                                                                              |
|---------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `timed(<METRIC_NAME>, <METRIC_VALUE>, <SAMPLE_RATE>, <TAGS>)` | 複数のメトリクスが送信されるので、保存されるメトリクスタイプ (`GAUGE`, `RATE`) はメトリクスに依存します。詳細については、[ヒストグラムメトリクスタイプ][7]に関するドキュメントを参照してください。 |

##### コンフィグレーション

`TIMER` には、`HISTOGRAM` [コンフィギュレーション](#configuration)ルールが適用されます。

##### コード例

`GAUGE` および `RATE` メトリクスとして保存された `TIMER` メトリクスを Datadog に送信します。`HISTOGRAM` タイプについては、[メトリクスのタイプ][7] に関するドキュメントを参照してください。

{{< tabs >}}
{{% tab "Python" %}}

Python では、タイマーはデコレーターで作成されます。

{{< code-block lang="python" filename="timers.py" >}}
from datadog import initialize, statsd
import time
import random

options = {
    'statsd_host':'127.0.0.1',
    'statsd_port':8125
}

initialize(**options)

@statsd.timed('example_metric.timer', tags=["environment:dev,function:my_function"])
def my_function():
  time.sleep(random.randint(0, 10))

while(1):
  my_function()
{{< /code-block >}}

または、コンテキストマネージャーを使用します。

{{< code-block lang="python" filename="context_manager.py" >}}
from datadog import statsd
import time
import random

def my_function():

  # 時間を測定しない部分を記述
  sleep(1)

  # ここでタイマーを開始
  with statsd.timed('example_metric.timer', tags=["environment:dev"]):
    # 測定を実行
    sleep(random.randint(0, 10))

while(1):
  my_function()
{{< /code-block >}}

{{% /tab %}}
{{% tab "PHP" %}}

{{< code-block lang="php" filename="timer.php" >}}
<?php

require __DIR__ . '/vendor/autoload.php';

use DataDog\DogStatsd;

$statsd = new DogStatsd(
    array('host' => '127.0.0.1',
          'port' => 8125,
     )
  );

function runfunction() {
    sleep(rand(0, 20));
}

while (TRUE) {
  $start_time = microtime(TRUE);
  runfunction();
  $statsd->microtiming('example_metric.timer', microtime(TRUE) - $start_time);
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

DogStatsD はタイマーメトリクスデータを受け取ると、レンダリング時間の統計的分布を計算し、次のメトリクスを Datadog に送信します。

| メトリクス                              | 説明                             |
|-------------------------------------|-----------------------------------------|
| `example_metric.timer.count`        | このメトリクスがサンプリングされた回数 |
| `example_metric.timer.avg`          | サンプリングされた値の平均時間      |
| `example_metric.timer.median`       | サンプリングされた値の中央値                    |
| `example_metric.timer.max`          | サンプリングされた値の最大値                   |
| `example_metric.timer.95percentile` | サンプリングされた値の 95 パーセンタイル           |

DogStatsD は `TIMER` を `HISTOGRAM` メトリクスとして扱います。使用するメトリクスのタイプが `TIMER` であろうと `HISTOGRAM` であろうと、Datadog に送信されるのは同じデータです。上のコードを実行すると、メトリクスデータを Datadog でグラフ化できます。

{{< img src="developers/metrics/dogstatsd_metrics_submission/timer.png" alt="Timer" >}}

### ディストリビューション

| メソッド                                                | Datadog 保存タイプ                                                                                         |
|-------------------------------------------------------|--------------------------------------------------------------------------------------------------------------|
| `distribution(<METRIC_NAME>, <METRIC_VALUE>, <TAGS>)` | Datadog に `DISTRIBUTION` タイプとして保存されます。詳細は、[ディストリビューションドキュメント][9]を参照してください。 |

#### コード例

`DISTRIBUTION` メトリクスタイプは DogStatsD だけのものです。`DISTRIBUTION` メトリクスとして保存された `DISTRIBUTION` メトリクスを Datadog に送信します。 `DISTRIBUTION` タイプについては、[メトリクスのタイプ][10] に関するドキュメントを参照してください。

{{< tabs >}}
{{% tab "Python" %}}

以下の Python コードを実行し、DogStatsD `DISTRIBUTION` メトリクスを Datadog へ送信。

{{< code-block lang="python" filename="distribution_metric.py" >}}
from datadog import initialize, statsd
import time
import random

options = {
    'statsd_host':'127.0.0.1',
    'statsd_port':8125
}

initialize(**options)

while(1):
  statsd.distribution('example_metric.distribution', random.randint(0, 20), tags=["environment:dev"])
  time.sleep(2)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Ruby" %}}

以下の Ruby コードを実行し、DogStatsD `DISTRIBUTION` メトリクスを Datadog へ送信。

{{< code-block lang="ruby" filename="distribution_metric.rb" >}}
require 'datadog/statsd'

statsd = Datadog::Statsd.new('localhost', 8125)

while true do
    statsd.distribution('example_metric.gauge', rand 20, tags: ['environment:dev'])
    sleep 2
end
{{< /code-block >}}

{{% /tab %}}
{{% tab "Go" %}}

以下の Go コードを実行し、DogStatsD `DISTRIBUTION` メトリクスを Datadog へ送信。

{{< code-block lang="go" filename="distribution_metric.go" >}}
package main

import (
    "log"
    "math/rand"
    "time"

    "github.com/DataDog/datadog-go/statsd"
)

func main() {
    statsd, err := statsd.New("127.0.0.1:8125")
    if err != nil {
        log.Fatal(err)
    }

    for {
        statsd.Distribution("example_metric.distribution", float64(rand.Intn(20)), []string{"environment:dev"}, 1)
        time.Sleep(2 * time.Second)
    }
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

以下の Java コードを実行し、DogStatsD `DISTRIBUTION` メトリクスを Datadog へ送信。

{{< code-block lang="java" filename="distribution_metric.java" >}}
import com.timgroup.statsd.NonBlockingStatsDClient;
import com.timgroup.statsd.StatsDClient;
import java.util.Random;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClient("statsd", "localhost", 8125);
        for (int i = 0; i < 10; i++) {
            Statsd.recordDistributionValue("example_metric.distribution", new Random().nextInt(20), new String[]{"environment:dev"});
            Thread.sleep(2000);
        }
    }
}
{{< /code-block >}}

{{% /tab %}}
{{% tab ".NET" %}}

以下の .NET コードを実行し、DogStatsD `DISTRIBUTION` メトリクスを Datadog へ送信。

{{< code-block lang="csharp" filename="distribution_metric.cs" >}}
using StatsdClient;
using System;

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

        var random = new Random(0);

        for (int i = 0; i < 10; i++)
        {
            DogStatsd.Distribution("example_metric.distribution", random.Next(20), tags: new[] {"environment:dev"});
            System.Threading.Thread.Sleep(2000);
        }
    }
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "PHP" %}}

以下の PHP コードを実行し、DogStatsD `DISTRIBUTION` メトリクスを Datadog へ送信。

{{< code-block lang="php" filename="distribution_metric.php" >}}
<?php

require __DIR__ . '/vendor/autoload.php';

use DataDog\DogStatsd;

$statsd = new DogStatsd(
    array('host' => '127.0.0.1',
          'port' => 8125,
     )
  );

while (TRUE) {
    $statsd->distribution('example_metric.distribution', rand(0, 20), array('environment'=>'dev'));
    sleep(2);
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

上のインスツルメンテーションは、`合計`、`カウント`、`平均`、`最小`、`最大`、`50 パーセンタイル` (中央値)、`75 パーセンタイル`、`90 パーセンタイル`、`95 パーセンタイル`、`99 パーセンタイル`の各データを計算します。ディストリビューションは、アップロードされたファイルのサイズ、教室でのテストの得点など、「あらゆる」種類の値の分布の測定に使用できます。

## メトリクスの送信オプション

### サンプリングレート

高パフォーマンスを必要とするコードパスにとっては、UDP パケットを送信する際のオーバーヘッドが大きすぎる可能性があるため、DogStatsD クライアントはサンプリングをサポートし、一定割合の時間にのみメトリクスを送信することができます。サンプリングするメトリクスが多く、DogStatsD クライアントが DogStatsD サーバーと同じホスト上にない場合に有用ですが、トラフィックが減る代わりに精度と粒度を失います。

サンプリングレート `1` は 100% の時間メトリクスを送信し、サンプリングレート `0` は 0% の時間メトリクスを送信します。

DogStatsD は Datadog にメトリクスを送信する前に、`<SAMPLE_RATE>` を使用し、メトリクスタイプに応じてメトリクス値を補正します（サンプリングなしで値を推定するため）。

| メトリクスタイプ | サンプリングレート補正                                                                                                                                                         |
|-------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `COUNT`     | 受け取った値は (`1/<SAMPLE_RATE>`) で乗算されます。受信したデータポイントに対し、`1/<SAMPLE_RATE>` は同じ値で実際にサンプリングされたと考えることは理にかなっています。 |
| `GAUGE`     | 補正なし。受信した値はそのまま残ります。                                                                                                                               |
| `SET`       | 補正なし。受信した値はそのまま残ります。                                                                                                                               |
| `HISTOGRAM` | `histogram.count` 統計は COUNT メトリクスであり、上記の補正を受け取ります。他の統計は GAUGE メトリクスなので、「補正」は行われません。                      |

#### コード例

以下のコードは、半分の時間だけポイントを送信します。

{{< tabs >}}
{{% tab "Python" %}}

```python
statsd.increment('loop.count', sample_rate=0.5)
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
statsd.increment('loop.count', :sample_rate => 0.5)
```

{{% /tab %}}
{{% tab "Go" %}}

```go
statsd.Incr("example_metric.increment", []string{}, 0.5)
```

{{% /tab %}}
{{% tab "Java" %}}

```java
Statsd.incrementCounter("example_metric.increment", sampleRate=0.5);
```

{{% /tab %}}
{{% tab ".NET" %}}

```csharp
DogStatsd.Increment("example_metric.increment", sampleRate: 0.5);
```

{{% /tab %}}
{{% tab "PHP" %}}

```php
<? php
$statsd->increment('example_metric.increment', $sampleRate->0.5);
```

{{% /tab %}}
{{< /tabs >}}

### メトリクスのタグ付け

`tags` パラメーターを使用して、DogStatsD へ送るメトリクスにタグを追加します。

#### コード例

以下のコードは、`environment:dev` および `account:local` タグのみを `example_metric.increment` メトリクスに追加します。

{{< tabs >}}
{{% tab "Python" %}}

```python
statsd.increment('example_metric.increment', tags=["environment:dev","account:local"])
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
statsd.increment('example_metric.increment', tags: ['environment:dev','account:local'])
```

{{% /tab %}}
{{% tab "Go" %}}

```go
statsd.Incr("example_metric.increment", []string{"environment:dev","account:local"}, 1)
```

{{% /tab %}}
{{% tab "Java" %}}

```java
Statsd.incrementCounter("example_metric.increment", new String[]{"environment:dev","account:local"});
```

{{% /tab %}}
{{% tab ".NET" %}}

```csharp
DogStatsd.Increment("example_metric.increment", tags: new[] {"environment:dev","account:local"})
```

{{% /tab %}}
{{% tab "PHP" %}}

`tags` 引数は文字列にすることができます。

```php
$statsd->increment('example_metric.increment', "environment:dev,account:local");
```

または配列にすることができます。

```php
<?php
$statsd->increment('example_metric.increment', array('environment' => 'dev', 'account' => 'local'));

```

{{% /tab %}}
{{< /tabs >}}

#### ホストタグ

ホストタグは、メトリクスを集計する際に Datadog Agent によって自動的に割り当てられます。Agent ホスト名と一致しないホストタグ付きで送信されたメトリクスは、本来のホストを参照できなくなります。送信されたホストタグは、Agent によって収集されたホスト名や Agent で構成されたホスト名を上書きします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}
[1]: /ja/developers/dogstatsd
[2]: /ja/developers/metrics/types/?tab=count#metric-type-definition
[3]: /ja/dashboards/functions/arithmetic/#cumulative-sum
[4]: /ja/dashboards/functions/arithmetic/#integral
[5]: /ja/developers/metrics/types/?tab=gauge#metric-type-definition
[6]: /ja/developers/metrics/types/?tab=set#metric-type-definition
[7]: /ja/developers/metrics/types/?tab=histogram#metric-type-definition
[8]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
[9]: /ja/metrics/distributions
[10]: /ja/developers/metrics/types/?tab=distribution#metric-type-definition