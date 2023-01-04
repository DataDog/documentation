---
title: Late Metrics Ingestion
kind: documentation
aliases:
  - /guides/metrics/late_metrics
  - /developers/metrics/custom_metrics/late_metrics
  - /getting_started/custom_metrics/late_metrics
  - /developers/metrics/late_metrics
further_reading:
- link: "/developers/dogstatsd/"
  tag: "Documentation"
  text: "Learn more about DogStatsD"
- link: "/developers/community/libraries/"
  tag: "Documentation"
  text: "Official and Community created API and DogStatsD client libraries"
---

## Overview

*What are Late Metrics?* If you are emitting metric points, which possess timestamps that are older than an hour relative to the time of submission, Datadog will classify this metric point as a Late Metric. 

**Example**: You emit a metric point at 1:00 PM EST and the timestamp on said metric point reads 10:00AM EST. This metric point will be classified as a Late Metric, as it is delayed by 3 hours relative to the time of submission. 

*Why does this matter to the average Datadog Metrics user?* Traditionally, Datadog has not supported Late Metrics, hence the introduction of Late Metric Ingestion will allow you to start monitroing a pleathora of new use-cases with your Datadog Metrics. (Outage Recovery, Overwriting Invalid Metrics, and Managing IoT Delays to name a few)

Late Metric Ingestion allows you to collect metric points that possess outdated timestamps (older than one hour from the time of submission, but no older than your total metric retention period (*defaults to 15 months for all metrics*)). 

**Note**: Resending metric ponts (sending metrics points with an already existing timestamp and tag combination within Datadog) will be replaced, with compliance to our last point wins ingestion rule.

You can now start ingesting Late Metrics by configuring Late Metrics Ingestion via the [Metrics Summary Page][1] for counts, rates, and gauges.

## Configuring Late Metrics

Click on any metric name to open its details side-panel. “Late Data” will be the second option under the already existing “Advanced” section in the Metrics side panel. Clicking on “Edit” will move to the next screen. 

GIF FROM JOE GOES HERE

You can now click on “Enable Late Data” and hit “Save” to start ingesting late metrics for the metric name you selected.

GIF FROM JOE GOES HERE

There are also APIs available so you can enable or disable late metric ingestion.

### Bulk Configuring Late Metrics

Optimize your Late Metrics enablement by using our Bulk Late Metric Enablement feature. By clicking Late Metrics on Metrics Summary, you can specify a namespace for your metrics. You can then configure all metrics matching that namespace to enable Late metrics ingestion.

GIF FROM JOE GOES HERE

## Late Metrics Submission Mechanisms

Late metrics can be submitted to Datadog via our API or the Agent. 

**If you intend to submit late metrics via the API**:, you can send metrics points with old timestamps in the payload, while ensuring that the metric name that is ingesting the point has been configured to receive Late Metrics (via the UI). 



{{< programming-lang-wrapper langs="python,java" >}}
{{< programming-lang lang="python" >}}
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
                    timestamp=int(datetime.now().timestamp()),
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
                                    .timestamp(OffsetDateTime.now().toInstant().getEpochSecond())
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

{{< /programming-lang-wrapper >}}







**If you intend to submit late metrics via the Agent**:  ensure that you have Agent version +7.40.0 installed, and you’ll be able to send delayed metric points via the updated DogStatsD interface (*currently supporting GoLang and .NET versions*). 

## Late Metrics Ingestion Latency

Ingesting Late Metrics will include some ingestion latencies, dependent on the age of the metric timestamp. 

| Metrics Outdated by: | Ingestion Latency                     |
|----------------------|---------------------------------------|
| 1-12 hours           | Near Real-Time Ingestion (1 hour MAX) |
| 12 hours - 30 days   | Up to 14 hour latency                 |
| +30 days             | +14 hours latency                     |

*Above mentioned ingestion latencies are not final and are subject to improvements with compliance to Datadog's committment to continuous growth.*

[1]: /metrics/summary/
[2]: /metrics/#submit-metrics