---
description: 한 시간보다 오래된 타임스탬프를 가진 사용자 지정 메트릭 값을 메트릭 보존 기간 내에서 수집합니다.
further_reading:
- link: https://www.datadoghq.com/blog/historical-metrics/
  tag: 블로그
  text: 과거 메트릭으로 더 긴 기간에 걸쳐 시스템 성능 모니터링하기
- link: /extend/dogstatsd/
  tag: 설명서
  text: DogStatsD에 대해 자세히 알아보기
- link: /extend/community/libraries/
  tag: 설명서
  text: 공식 및 커뮤니티에서 생성한 API 및 DogStatsD 클라이언트 라이브러리
- link: https://www.datadoghq.com/blog/historical-metrics/
  tag: 블로그
  text: 과거 메트릭으로 더 긴 기간에 걸쳐 시스템 성능 모니터링하기
title: 과거 메트릭 수집
---
{{< jqmath-vanilla >}}

{{% site-region region="gov,gov2" %}}
<div class="alert alert-danger">선택한 <a href="/getting_started/site">Datadog 사이트</a>에서는 과거 메트릭 수집이 지원되지 않습니다({{< region-param key="dd_site_name" >}}).</div>
{{% /site-region %}}

## 개요 {#overview}

과거 메트릭 수집을 활성화하면 제출 시점 기준으로 한 시간보다 오래된 **사용자 지정 메트릭** 값을 수집할 수 있습니다. 단, 총 메트릭 보존 기간(기본 15개월)을 초과할 수는 없습니다.

메트릭에 과거 메트릭 수집이 활성화되어 있으면 장애 복구, 잘못된 값 수정, IoT 지연 관리 등 다양한 사용 사례에 유용할 수 있습니다.

## 과거 메트릭 수집이란 무엇입니까? {#what-is-historical-metrics-ingestion}

{{< img src="/metrics/custom_metrics/historical_metrics/diagram_historical-metrics-ingestion_1_240202.png" alt="과거 메트릭이 활성화된 수집 흐름을 보여주는 다이어그램" >}}

Datadog은 *과거 메트릭*을 제출 시점 기준으로 한 시간 이상 과거의 타임스탬프를 가진 메트릭 포인트로 분류합니다. 과거 메트릭 수집이 활성화되어 있지 않으면 제출 시점 기준으로 한 시간보다 오래된 메트릭 값은 수집되지 않습니다.

예를 들어 메트릭(`exampleMetricA`)이 오후 1시(EST)에 Datadog으로 값을 전송했지만 해당 값의 타임스탬프가 오전 10시(EST)인 경우를 가정합니다. 이 메트릭 값은 제출 시점보다 3시간 이전의 타임스탬프를 가지므로 _과거 메트릭_으로 분류됩니다.

과거 메트릭 수집이 활성화된 상태에서 동일한 타임스탬프와 동일한 태그-값 조합으로 여러 값을 제출하면 Datadog은 가장 최근에 제출된 값을 유지합니다. 즉, 동일한 타임스탬프에 값 X를 제출한 후 동일한 메트릭에 값 Y를 다시 제출하면 가장 나중에 제출된 값이 유지됩니다.

*카운트, 레이트 및 게이지* 메트릭 유형에 대해 [Metrics Summary 페이지][1]에서 과거 메트릭 수집을 활성화하면 과거 메트릭 값 수집을 시작할 수 있습니다.  

**참고**: 과거 메트릭 수집은 분포형 메트릭 또는 로그와 같은 다른 Datadog 데이터 유형에서 생성된 사용자 지정 메트릭에는 사용할 수 없습니다.

## 구성 {#configuration}

특정 메트릭에 대해 과거 메트릭 수집을 활성화하려면 다음을 수행합니다.
1. [Metrics Summary 페이지][1]로 이동합니다.
1. 과거 메트릭 수집을 활성화할 메트릭 이름을 클릭하여 메트릭 세부 정보 사이드 패널을 엽니다.
1. 사이드 패널의 *Advanced* 섹션에서 **Configure**를 클릭합니다.
1. **Enable historical metrics** 토글을 선택하고 **Save**를 클릭합니다.

{{< img src="metrics/custom_metrics/historical_metrics/enable_historical_metrics.png" alt="Metrics Summary 페이지에 표시된 Historical Metrics 패싯 패널 및 Enable historical metrics 옵션이 선택된 메트릭 세부 정보 패널의 Advanced 섹션" style="width:100%;" >}}

### 다중 메트릭 일괄 구성 {#bulk-configuration-for-multiple-metrics}

각 메트릭을 개별적으로 구성하지 않고 여러 메트릭에 대해 과거 메트릭 수집을 한 번에 활성화하거나 비활성화할 수 있습니다.

1. [Metrics Summary 페이지][1]로 이동하여 **Configure Metrics** 드롭다운을 클릭합니다.
1. **Enable historical metrics**를 선택합니다.
1. 메트릭 네임스페이스 접두사를 지정하여 해당 네임스페이스와 일치하는 모든 메트릭을 선택합니다.
1. (선택 사항) 네임스페이스의 모든 메트릭에 대해 과거 메트릭 수집을 비활성화하려면 **Historical metrics** 토글을 클릭합니다.

{{< img src="metrics/custom_metrics/historical_metrics/historical_metrics_ingestion_toggle.png" alt="과거 메트릭 수집 토글" >}}

## 과거 메트릭 제출 {#historical-metrics-submission}

과거 메트릭 수집을 활성화한 후에는 [API](#api) 또는 [Agent](#agent)를 통해 과거 타임스탬프를 가진 메트릭 값을 제출할 수 있습니다.

### API {#api}

API를 사용하면 페이로드에 과거 타임스탬프를 포함하여 메트릭 값을 제출할 수 있습니다(단, 해당 메트릭 이름은 앞서 설명한 사용자 인터페이스에서 과거 메트릭 허용이 이미 활성화되어 있어야 합니다).

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

Agent를 통해 과거 메트릭을 제출하려면 Agent 버전 7.40.0 이상이 설치되어 있어야 합니다. 이 버전에는 **Java**, **GoLang**, **.NET**을 지원하는 업데이트된 DogStatsD 인터페이스가 포함되어 있습니다. 이를 통해 Agent를 사용하여 지연된 메트릭 포인트를 전송할 수 있습니다.

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

## 과거 메트릭 수집 지연 시간 {#historical-metrics-ingestions-latency}

과거 메트릭 수집의 지연 시간은 메트릭 타임스탬프가 얼마나 과거인지에 따라 달라집니다.

| 메트릭 지연 기간:   | 수집 지연 시간 |
|----------------------|-------------------------------------------|
| 1~12시간           | 근실시간 수집(최대 1시간) |
| 12시간~30일   | 최대 14시간 지연                    |
| 30일 초과         | 14시간 이상 지연                     |

## 과거 메트릭 수집 청구 {#historical-metrics-ingestion-billing}

과거 메트릭은 인덱싱된 사용자 지정 메트릭으로 계산되며 청구됩니다. 청구 대상 사용자 지정 메트릭은 **제출된 메트릭의 타임스탬프**로 결정되며, 그 타임스탬프가 오늘 날짜든 15개월 전이든 상관없습니다. 해당 메트릭 이름과 태그-값 조합이 제출된 시간 동안 **어떤** 값이라도 보고하고 있다면(타임스탬프와 무관하게) 해당 시간에 활성 상태로 간주됩니다. 

다음 예시는 아래 조건을 가정합니다.
- 3000개의 고유 태그-값 조합
- 1500개의 실시간 메트릭
- 1500개의 과거 메트릭 
- 한 달에 720시간(30일)
- 메트릭 100개당 $5의 사용자 지정 메트릭 비용

$(1500/ 720) ⋅ (5 / 100) + $(1500/ 720) ⋅ (5 / 100) = \\$0.21

[Plan and Usage 페이지][4]의 Usage Summary 섹션에서 인덱싱된 과거 메트릭 사용량을 추적할 수 있습니다.

{{< img src="metrics/custom_metrics/historical_metrics/custom_metrics_usage_summary.png" alt="사용자 지정 인덱싱 메트릭과 과거 인덱싱 메트릭을 모두 표시하는 Plan and Usage 페이지의 Usage Summary 섹션" style="width:100%;" >}}

자세한 내용은 [Custom Metrics 청구][3]를 참조하세요.

### Metric Name 요금제에서의 청구 {#billing-under-metric-name-pricing}

조직에서 카디널리티 기반 요금제가 아닌 [Metric Name 요금제][5]를 사용하는 경우 HMI 청구 방식이 다릅니다. HMI 사용량은 메트릭의 원래 타임스탬프가 아니라 수집 시점을 기준으로 계산됩니다. 각 HMI 데이터 포인트는 수집된 볼륨과 인덱싱된 볼륨 모두에 기여합니다.

Metric Name 요금제 모델에 대한 자세한 내용은 [Custom Metrics의 Metric Name 요금제][5]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/summary
[2]: /ko/metrics/#submit-metrics
[3]: /ko/account_management/billing/custom_metrics/
[4]: https://app.datadoghq.com/billing/usage
[5]: /ko/account_management/billing/metric_name_pricing/