---
description: タイムスタンプが 1 時間以上前のカスタムメトリクスの値をメトリクス保持期間まで取り込みます。
further_reading:
- link: https://www.datadoghq.com/blog/historical-metrics/
  tag: ブログ
  text: 過去のメトリクスを使ってシステムパフォーマンスをより長い時間軸でモニターする
- link: /extend/dogstatsd/
  tag: ドキュメント
  text: DogStatsD について
- link: /extend/community/libraries/
  tag: ドキュメント
  text: 公式およびコミュニティ作成の API および DogStatsD クライアントライブラリ
- link: https://www.datadoghq.com/blog/historical-metrics/
  tag: ブログ
  text: 過去のメトリクスを使ってシステムパフォーマンスをより長い時間軸でモニターする
title: 過去のメトリクスの取り込み
---
{{< jqmath-vanilla >}}

{{% site-region region="gov,gov2" %}}
<div class="alert alert-danger">過去のメトリクスの取り込みは、選択した <a href="/getting_started/site">Datadog サイト</a>ではサポートされていません ({{< region-param key="dd_site_name" >}})。</div>
{{% /site-region %}}

## 概要 {#overview}

過去のメトリクスの取り込みを有効にすると、送信時刻よりも 1 時間以上前のタイムスタンプを持つ**カスタムメトリクス**値を収集できますが、メトリクスの総保持期間 (デフォルトは 15 か月) を過ぎたものは収集できません。

過去のメトリクスの取り込みをメトリクスで有効にすると、障害からの復旧、誤った値の修正、IoT の遅延管理など、さまざまなユースケースで役立ちます。

## 過去のメトリクスの取り込みとは {#what-is-historical-metrics-ingestion}

{{< img src="/metrics/custom_metrics/historical_metrics/diagram_historical-metrics-ingestion_1_240202.png" alt="過去のメトリクスの取り込みが有効な場合のフローを示す図" >}}

Datadog では、タイムスタンプの時刻から 1 時間経過した後に送信されたメトリクスポイントを*過去のメトリクス*として分類しています。過去のメトリクスの取り込みが有効になっていない場合、1 時間経過した後に送信されたメトリクスの値は取り込まれません。

例えば、メトリクス (`exampleMetricA`) が午後 1 時 00 分 (EST) に Datadog に値を送信し、その値のタイムスタンプが午前 10 時 00 分 (EST) だとします。このメトリクスの値は、タイムスタンプが送信時刻よりも 3 時間古いため、_過去_に分類されます。

過去のメトリクスの取り込みを有効にして、同じタイムスタンプと同じタグ値の組み合わせを持つ複数の値を Datadog に送信した場合、Datadog はより直近で送信された値を保持します。つまり、同じタイムスタンプで X の値を持つメトリクスと Y の値を持つメトリクスを送信した場合、より直近で送信された値が保持されることになります。

[Metrics Summary ページ][1]で、*カウント、レート、ゲージ*のメトリクスタイプについて過去のメトリクスの取り込みを有効にすることで、過去のメトリクスの取り込みを開始することができます。 

**注**: 過去のメトリクスの取り込みは、ディストリビューションメトリクスや他の Datadog のデータタイプ ログなどから生成されたカスタムメトリクスでは利用できません。

## 構成 {#configuration}

特定のメトリクスについて過去のメトリクスの取り込みを有効にするには
1. [Metrics Summary ページ][1]に移動します。
1. 過去のメトリクスの取り込みを有効にしたいメトリクスの名前をクリックして、メトリクスの詳細サイドパネルを開きます。
1. サイドパネルの *Advanced* セクションで**構成**をクリックします。
1. **過去のメトリクスを有効にする**トグルを選択し、**保存**を押します。

{{< img src="metrics/custom_metrics/historical_metrics/enable_historical_metrics.png" alt="Metrics Summary ページで Historical Metrics ファセットパネルが表示され、Metric 詳細パネルの Advanced セクションで Enable historical metrics のオプションが選択されている様子" style="width:100%;" >}}

### 複数のメトリクスの一括構成 {#bulk-configuration-for-multiple-metrics}

複数のメトリクスについても、個別に構成を行うのではなく、過去のメトリクスの取り込みをまとめて有効または無効にすることができます。

1. [Metrics Summary ページ][1]に移動し、**メトリクスを構成**ドロップダウンをクリックします。
1. **過去のメトリクスを有効にする**を選択します。
1. メトリクスネームスペースのプレフィックスを指定して、そのネームスペースに一致するすべてのメトリクスを選択します。
1. (オプション) ネームスペース内のすべてのメトリクスに対する過去のメトリクスの取り込みを無効にするには、**過去のメトリクス**トグルをクリックします。

{{< img src="metrics/custom_metrics/historical_metrics/historical_metrics_ingestion_toggle.png" alt="過去のメトリクスの取り込みトグル" >}}

## 過去のメトリクスの送信 {#historical-metrics-submission}

過去のメトリクスの取り込みを有効にした後は、[API](#api) または [Agent](#agent) を通じて過去のタイムスタンプを持つメトリクス値を送信できます。

### API {#api}

API を使用すると、ペイロードに過去のタイムスタンプを含むメトリクス値を送信することができます (上記のユーザーインターフェイスを通じて、そのメトリクス名で過去のメトリクスの受け入れが有効になっている場合)。

{{< programming-lang-wrapper langs="python,java,go,ruby,typescript,curl" collapsible="true">}}

{{< programming-lang lang="python">}}

```python
"""
Submit metrics returns "Payload accepted" response
"""

from datetime import datetime
from datadog_api_client import ApiClient, Configuration
from datadog_api_client.v2.api.metrics_api import MetricsApi
from datadog_api_client.v2.model.metric_intake_type import MetricIntakeType
from datadog_api_client.v2.model.metric_payload import MetricPayload
from datadog_api_client.v2.model.metric_point import MetricPoint
from datadog_api_client.v2.model.metric_resource import MetricResource
from datadog_api_client.v2.model.metric_series import MetricSeries

body = MetricPayload(
    series=[
        MetricSeries(
            metric="system.load.1",
            type=MetricIntakeType.UNSPECIFIED,
            points=[
                MetricPoint(

                    """ Add historical timestamp here """
                    timestamp=int(datetime.now().timestamp()),
                    """ *********************** """

                    value=0.7,
                ),
            ],
            resources=[
                MetricResource(
                    name="dummyhost",
                    type="host",
                ),
            ],
        ),
    ],
)

configuration = Configuration()
with ApiClient(configuration) as api_client:
    api_instance = MetricsApi(api_client)
    response = api_instance.submit_metrics(body=body)

    print(response)
```
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}

```java
// Submit metrics returns "Payload accepted" response
import com.datadog.api.client.ApiClient;
import com.datadog.api.client.ApiException;
import com.datadog.api.client.v2.api.MetricsApi;
import com.datadog.api.client.v2.model.IntakePayloadAccepted;
import com.datadog.api.client.v2.model.MetricIntakeType;
import com.datadog.api.client.v2.model.MetricPayload;
import com.datadog.api.client.v2.model.MetricPoint;
import com.datadog.api.client.v2.model.MetricResource;
import com.datadog.api.client.v2.model.MetricSeries;
import java.time.OffsetDateTime;
import java.util.Collections;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = ApiClient.getDefaultApiClient();
    MetricsApi apiInstance = new MetricsApi(defaultClient);

    MetricPayload body =
        new MetricPayload()
            .series(
                Collections.singletonList(
                    new MetricSeries()
                        .metric("system.load.1")
                        .type(MetricIntakeType.UNSPECIFIED)
                        .points(
                            Collections.singletonList(
                                new MetricPoint()
                            
                                    //Add historical timestamp here
                                    .timestamp(OffsetDateTime.now().toInstant().getEpochSecond())
                                    //***********************

                                    .value(0.7)))
                        .resources(
                            Collections.singletonList(
                                new MetricResource().name("dummyhost").type("host")))));

    try {
      IntakePayloadAccepted result = apiInstance.submitMetrics(body);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling MetricsApi#submitMetrics");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```
{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

```go
// Submit metrics returns "Payload accepted" response

package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"time"

	"github.com/DataDog/datadog-api-client-go/v2/api/datadog"
	"github.com/DataDog/datadog-api-client-go/v2/api/datadogV2"
)

func main() {
	body := datadogV2.MetricPayload{
		Series: []datadogV2.MetricSeries{
			{
				Metric: "system.load.1",
				Type:   datadogV2.METRICINTAKETYPE_UNSPECIFIED.Ptr(),
				Points: []datadogV2.MetricPoint{
					{   
                        //Add historical timestamp here
						Timestamp: datadog.PtrInt64(time.Now().Unix()),
                        //***********************

						Value:     datadog.PtrFloat64(0.7),
					},
				},
				Resources: []datadogV2.MetricResource{
					{
						Name: datadog.PtrString("dummyhost"),
						Type: datadog.PtrString("host"),
					},
				},
			},
		},
	}
	ctx := datadog.NewDefaultContext(context.Background())
	configuration := datadog.NewConfiguration()
	apiClient := datadog.NewAPIClient(configuration)
	api := datadogV2.NewMetricsApi(apiClient)
	resp, r, err := api.SubmitMetrics(ctx, body, *datadogV2.NewSubmitMetricsOptionalParameters())

	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `MetricsApi.SubmitMetrics`: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}

	responseContent, _ := json.MarshalIndent(resp, "", "  ")
	fmt.Fprintf(os.Stdout, "Response from `MetricsApi.SubmitMetrics`:\n%s\n", responseContent)
}
```
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

```ruby
# Submit metrics returns "Payload accepted" response

require "datadog_api_client"
api_instance = DatadogAPIClient::V2::MetricsAPI.new

body = DatadogAPIClient::V2::MetricPayload.new({
  series: [
    DatadogAPIClient::V2::MetricSeries.new({
      metric: "system.load.1",
      type: DatadogAPIClient::V2::MetricIntakeType::UNSPECIFIED,
      points: [
        DatadogAPIClient::V2::MetricPoint.new({

          #Add historical timestamp here  
          timestamp: Time.now.to_i,
          #***********************  

          value: 0.7,
        }),
      ],
      resources: [
        DatadogAPIClient::V2::MetricResource.new({
          name: "dummyhost",
          type: "host",
        }),
      ],
    }),
  ],
})
p api_instance.submit_metrics(body)
```
{{< /programming-lang >}}

{{< programming-lang lang="typescript" >}}

```typescript
/**
 * Submit metrics returns "Payload accepted" response
 */

import { client, v2 } from "@datadog/datadog-api-client";

const configuration = client.createConfiguration();
const apiInstance = new v2.MetricsApi(configuration);

const params: v2.MetricsApiSubmitMetricsRequest = {
  body: {
    series: [
      {
        metric: "system.load.1",
        type: 0,
        points: [
          {
            //Add historical timestamp here
            timestamp: Math.round(new Date().getTime() / 1000),
            //***********************

            value: 0.7,
          },
        ],
        resources: [
          {
            name: "dummyhost",
            type: "host",
          },
        ],
      },
    ],
  },
};

apiInstance
  .submitMetrics(params)
  .then((data: v2.IntakePayloadAccepted) => {
    console.log(
      "API called successfully. Returned data: " + JSON.stringify(data)
    );
  })
  .catch((error: any) => console.error(error));
```
{{< /programming-lang >}}

{{< programming-lang lang="curl" >}}

```shell
## Dynamic Points
# Post time-series data that can be graphed on Datadog’s dashboards.
# Template variables
export NOW="$(date +%s)"
# Curl command
curl -X POST "https://api.datadoghq.com/api/v2/series" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-d @- << EOF
{
  "series": [
    {
      "metric": "system.load.1",
      "type": 0,
      "points": [
        {
            # Add historical timestamp here
          "timestamp": 1636629071,
            # ***********************

          "value": 0.7
        }
      ],
      "resources": [
        {
          "name": "dummyhost",
          "type": "host"
        }
      ]
    }
  ]
}
EOF
```
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

### Agent {#agent}

Agent を使って過去のメトリクスを送信するには、Agent バージョン 7.40.0 以降がインストールされていることを確認します。このバージョンには、新しい DogStatsD インターフェースが含まれ、**Java**、**GoLang**、および **.NET** をサポートします。これにより、Agent を通じて過去のメトリクスポイントを送信することが可能になります。

{{< programming-lang-wrapper langs="java,go,.NET" >}}

{{< programming-lang lang="java" >}}

```java
import com.timgroup.statsd.NonBlockingStatsDClientBuilder;
import com.timgroup.statsd.StatsDClient;
import java.util.Random;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClientBuilder()
            .prefix("statsd").
            .hostname("localhost")
            .port(8125)
            .build();
        Statsd.gaugeWithTimestamp("example_metric.gauge_with_timestamp", new Random().nextInt(20), 1205794800, new String[]{"environment:dev"});
        Statsd.countWithTimestamp("example_metric.count_with_timestamp", new Random().nextInt(20), 1205794800, new String[]{"environment:dev"});
    }
}
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
	statsd, err := statsd.New("127.0.0.1:8125")
	if err != nil {
		log.Fatal(err)
	}

  ts := time.Date(2008, time.March, 17, 23, 0, 0, 0, time.UTC)
	statsd.GaugeWithTimestamp("example_metric.gauge_with_timestamp", 12, []string{"environment:dev"}, 1, ts)
  statsd.CountWithTimestamp("example_metric.count_with_timestamp", 12, []string{"environment:dev"}, 1, ts)
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
            dogStatsdService.Configure(dogstatsdConfig);
            var random = new Random(0);
            var dto = new DateTimeOffset(2008, 03, 17, 23, 00, 00, new TimeSpan(0, 0, 0))
            dogStatsdService.Gauge("example_metric.gauge_with_timestamp", 10, tags: new[] {"environment:dev"}, dto);
            dogStatsdService.Counter("example_metric.count_with_timestamp", 10, tags: new[] {"environment:dev"}, dto);
        }
    }
}
```
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

## 過去のメトリクスの取り込みのレイテンシー {#historical-metrics-ingestions-latency}

過去のメトリクスの取り込みは、メトリクスのタイプスタンプがどれくらい過去のものかによってレイテンシーが変わります。

| メトリクスの遅延:   | 取り込みのレイテンシー                         |
|----------------------|-------------------------------------------|
| 1-12時間           | ほぼリアルタイムで取り込み (最大 1 時間) |
| 12 時間 - 30 日   | 最大 14 時間のレイテンシー                    |
| 30 日を超える         | 14 時間を超えるレイテンシー                     |

## 過去のメトリクスの取り込みに対する課金 {#historical-metrics-ingestion-billing}

過去のメトリクスは、インデックス化されたカスタムメトリクスとしてカウントされ、請求されます。請求対象のカスタムメトリクスは、**送信されたメトリクスのタイムスタンプ**によって決まります。タイムスタンプが今日であろうと 15 か月前であろうと関係ありません。そのメトリクス名とタグ値の組み合わせで (タイムスタンプに関係なく) **何らかの**値がアクティブに報告されている限り、それが送信された時点でアクティブであるとみなされます。

以下の例では、次のことを前提としています。
- 3000 のユニークなタグ値の組み合わせ
- 1500 のリアルタイムメトリクス
- 1500 の過去のメトリクス 
- 月に 720 時間 (30日)
- 100 メトリクスあたり 5 ドルのカスタムメトリクスコスト

$(1500/ 720) ⋅ (5 / 100) + $(1500/ 720) ⋅ (5 / 100) = \\$0.21

インデックス化された過去のメトリクスは、[Plan and Usage ページ][4]の Usage Summary セクションで追跡できます。

{{< img src="metrics/custom_metrics/historical_metrics/custom_metrics_usage_summary.png" alt="インデックス化されたカスタムメトリクスと過去のメトリクスの両方が表示されたPlan and Usage ページの Usage Summary セクション" style="width:100%;" >}}

詳細については、[カスタムメトリクスの課金][3]ドキュメントを参照してください。

### メトリクス名の料金の課金 {#billing-under-metric-name-pricing}

組織がカーディナリティ料金とは異なる[メトリクス名の料金][5]を使用している場合、HMI 課金は異なります。HMI 利用率は、メトリクスの元のタイムスタンプではなく取り込み時間に基づいて計算されます。各 HMI データポイントは、取り込まれたボリュームとインデックスされたボリュームの両方に寄与します。

メトリクス名の料金モデルの詳細については、[Custom Metrics のメトリクス名の料金][5]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/summary
[2]: /ja/metrics/#submit-metrics
[3]: /ja/account_management/billing/custom_metrics/
[4]: https://app.datadoghq.com/billing/usage
[5]: /ja/account_management/billing/metric_name_pricing/