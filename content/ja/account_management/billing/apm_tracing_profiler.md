---
title: APM Billing
aliases:
- /account_management/billing/profiler/
- /account_management/billing/apm_distributed_tracing/
- /account_management/billing/apm_tracing_profiling/
---

APM is available through three tiers: APM, APM Pro, and APM Enterprise. APM gives you deep visibility into your applications, with distributed tracing capabilities, seamless correlation between traces, logs, and other telemetry, and out-of-the-box performance dashboards for your service. With Continuous Profiler in APM Enterprise, you can pinpoint the slowest and most resource-intensive methods, in aggregate at the service and endpoint levels, as well as for every distributed trace. With Data Streams Monitoring (DSM) in APM Pro and APM Enterprise, you can easily track the end-to-end performance of your data streaming pipelines and event-driven applications that use Kafka and RabbitMQ.


| Billing Parameter  | Price                                      | Ingested and Indexed Spans                                                                 | Billing                                                                                                                                                                                                                                                                                                                          |
|--------------------|--------------------------------------------|-------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [APM Host][5]      | $31 per underlying [APM host][5] per month | 1 million Indexed Spans and 150 GB of Ingested Spans included per month with every APM host.   | Datadog records the number of [APM hosts][5] you are concurrently monitoring in the Datadog APM service once an hour. On a high watermark plan (HWMP), these hourly measurements are ordered from highest to lowest at the end of the month, and Datadog charges based on the ninth highest measurement. The month of February is an exception and Datadog charges based on the eighth highest measurement. [More APM pricing information.][5] |
| APM Pro (APM Host with Data Streams Monitoring) | $35 per underlying [APM host][5]. Includes Data Streams Monitoring. | Same as APM Host | Datadog records the number of unique APM hosts in the Datadog APM service and unique DSM hosts you are concurrently monitoring once an hour. The hourly measurements and billing for APM Pro are conducted the same as for APM Hosts.  |
| APM Enterprise (APM Host with Data Streams Monitoring & [Continuous Profiler)][6] | $40 per underlying [APM host][5]. Includes Data Streams Monitoring and [Continuous Profiler][6] with four profiled containers per host per month. | Same as APM Host | Datadog records the number of unique APM hosts in the APM service, unique DSM hosts, and unique Continuous Profiler hosts you are concurrently monitoring once per hour. The hourly measurements and billing for APM Enterprise are conducted the same as for APM Hosts. |
| [Fargate][4]       | APM: $2 per concurrent task per month <br> APM Pro: $2.30 per concurrent task per month <br> APM Enterprise: $2.60 per concurrent task per month              | 65,000 Indexed Spans and 10 GB of Ingested Spans included in pricing.              | Datadog records the number of task instances you are monitoring in the Datadog APM service at five-minute intervals. Datadog aggregates the interval-based measurements at the end of the month and charges you based on the average number of hours your applications were run and monitored. [More Fargate pricing information.][4]              |
| [Indexed span][5] | $1.70 per million Indexed Spans per month | Billed when usage is in excess of Indexed Spans included with every APM host | An Indexed span is an individual request against an individual service in your stack. Datadog charges based on the total number of spans indexed with retention filters or legacy Analyzed Spans to the Datadog APM service at the end of the month. [More APM pricing information.][5]                                                                                          |
| [Ingested span][5] | $.10 per GB Ingested Spans per month | Billed when usage is in excess of Ingested Spans included with every APM host | An Ingested span is an individual request against an individual service in your stack. Datadog charges based on the total number of gigabytes of spans ingested to Datadog at the end of the month. [More APM pricing information.][5]                                                                                          |

**Notes**:  
   - If you're using a non-Fargate container based environment, you get billed for the underlying host deploying the Datadog Agent.
   - One profiled container is a container that is running the Continuous Profiler service. This does not include containers that are not being profiled. For instance, a DNS service container that is NOT profiled, running concurrently with your application container that IS profiled, is not counted towards the four profiler containers allotment.
   - [Universal Service Monitoring][15] is included in all APM tiers (APM, APM Pro, APM Enterprise) at no additional cost.

For more information, see the [Pricing page][7].

## Database Monitoring

| Billing Parameter  | Normalized Queries                | Billing                                          |
|--------------------|-----------------------------------|--------------------------------------------------|
| Database host      | 200 normalized queries are included per month with every database host. | Datadog records the number of database hosts you are concurrently monitoring with Database Monitoring once an hour. On a high watermark plan (HWMP), these hourly measurements are ordered from highest to lowest at the end of the month, and Datadog charges based on the ninth highest measurement. The month of February is an exception and Datadog charges based on the eighth highest measurement. |
| Normalized Queries | Billed when the configured threshold is in excess of normalized queries that are included with every database host. | A _normalized query_ represents an aggregate of queries with similar structure, differing only by the query parameters. Datadog charges based on the total number of configured normalized queries being tracked at any given time. |

For more information, see the [Pricing page][7].

## Deployment scenarios

**Sample cases illustrate annual billing rates with default 15 days Indexed Span retention. Contact [Sales][8] or your [Customer Success][9] Manager to discuss volume discounts for your account.**

### APM Hosts, indexed spans, and extra ingested spans

Using five APM hosts and sending 30 million Indexed Spans, with 900 GB of total Ingested Spans.

| Billable Unit  | Quantity   | Price                                                                                           | Formula       | Subtotal              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|
| APM Hosts      | 5          | $31 per host                                                                                    | 5 * $31       | $155                  |
| Indexed Spans | 30 million | 5 million included with 5 APM hosts. $1.70 per million for additional 25 million Indexed Spans | 25 * $1.70    | $42.50                |
| Ingested Spans | 900 GB          | 750 GB included with 5 APM hosts. $.10 per GB for additional 150 GB of Ingested Spans.                                                                                 | 150 * $.10      | $15                  |
| Total          |            |                                                                                                 | $155 + $42.50 + $15 | **$212.50 per month** |

### APM Pro Hosts, indexed spans, and extra ingested spans 

Using five APM Pro hosts and sending 30 million Indexed Spans, with 900 GB of total Ingested Spans.

| Billable Unit  | Quantity   | Price                                                                                           | Formula       | Subtotal              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|
| APM Pro Hosts      | 5          | $35 per host                                                                                    | 5 * $35       | $175                  |
| Indexed Spans | 30 million | 5 million included with 5 APM hosts. $1.70 per million for additional 25 million Indexed Spans | 25 * $1.70    | $42.50                |
| Ingested Spans | 900 GB          | 750 GB included with 5 APM hosts. $.10 per GB for additional 150 GB of Ingested Spans.                                                                                 | 150 * $.10      | $15                  |
| Total          |            |                                                                                                 | $175 + $42.50 + $15 | **$232.50 per month** |

### APM Enterprise Hosts with six profiled containers per host

Using five APM Enterprise hosts with six apps running in separate containers per each host.

| Billable Unit  | Quantity   | Price                                                                                           | Formula       | Subtotal              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|
| APM Enterprise Hosts       | 5          | $40 per host                                                                                    | 5 * $40       | $200                  |
| Profiled containers  | 6 per host | $2 per additional container per host. In this case there are 6 - 4 = 2 additional containers for each host        | 2  * $2 * 5 hosts         | $20                   |
| Total          |            |                                                                                                 | $200 + $20      | **$220 per month**    |

### APM Hosts, Fargate, and indexed spans

Using five APM hosts, sending 20 million Indexed Spans, and have deployed APM on average 20 Fargate Tasks over the month.

| Billable Unit  | Quantity   | Price                                                                                           | Formula             | Subtotal              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------------|-----------------------|
| APM Hosts      | 5          | $31 per host                                                                                    | 5 * $31             | $155                  |
| Fargate Tasks  | 20         | $2 per task                                                                                     | 20 * $2             | $40                   |
| Indexed Spans | 20 million | 5 million included with 5 APM hosts. 1.3 million included with 20 Fargate tasks. $1.70 per million for additional 13.7 million Indexed Spans | 13.7 * $1.70          | $23.29                |
| Total          |            |                                                                                                 | $155 + $40 + $23.29 | **$218.29 per month** |

### APM Enterprise Hosts, services, containers, and indexed spans

APM Enterprise for service 1 running on container 1, service 2 running on container 2. Both Containers are running on one host and are sending 20 million Indexed Spans on App Analytics. 

| Billable Unit  | Quantity   | Price                                                                                          | Formula      | Subtotal             |
|----------------|------------|------------------------------------------------------------------------------------------------|--------------|----------------------|
| APM Enterprise Hosts      | 1          | $40 per host                                                                                   | 1 * $40      | $40                  |
| Profiled containers  | 2 | $0 as profiled containers are within the 4 per APM Host allotment.
| Indexed Spans | 20 million | 1 million included with 1 APM host. $1.70 per million for additional 19 million Indexed Spans | 19 * $1.70   | $32.30               |
| Total          |            |                                                                                                | $40 + $32.30 | **$72.30 per month** |

### APM hosts with dynamic scaling, containers, Fargate, and no indexed spans

App 1 running on 20-40 containers which are deployed on 4-8 host instances, app 2 running on 10-30 Fargate tasks. Assuming, the 99th percentile usage of EC2 instances is 7, and average of Fargate Tasks over the month is 28.

| Billable Unit | Quantity | Price        | Formula    | Subtotal           |
|---------------|----------|--------------|------------|--------------------|
| APM Hosts     | 7        | $31 per host | 7 * $31    | $217               |
| Fargate Tasks | 28       | $2 per task  | 28 * $2    | $56                |
| Total         |          |              | $217 + $56 | **$273 per month** |

**Note**: The container count does not matter if the deployed Agent is on the EC2 instances.

### APM Enterprise Hosts with Kubernetes nodes and indexed spans

APM Enterprise for apps with a Datadog Agent running on 20 worker nodes in Kubernetes sending 20 million Indexed Spans. 10 of these worker nodes have eight pods each with one container per pod, the other 10 have two pods each with one container per pod. 

| Billable Unit     | Quantity   | Price                                                                       | Formula   | Subtotal           |
|-------------------|------------|-----------------------------------------------------------------------------|-----------|--------------------|
| APM Enterprise Hosts (Nodes) | 20         | $40 per host                                                                | 20 * $40 | $800               |
| Profiled containers  | 100 in aggregate | $2 per additional container. In this case 20 hosts would allow up to 80 containers but there are 20 containers summed across two hosts: 100-80 = 20 additional containers        | $2 * 20 hosts        | $40                    |
| Indexed Spans    | 20 million | 20 million included with 20 APM hosts (nodes). No additional Indexed Spans | 0 * $1.70 | 0                  |
| Total             |            |                                                                             | $800 + $40 | **$840 per month** |

For Kubernetes, APM & Continuous Profiler are priced by nodes not by pods.

### Lambda functions and indexed spans

An AWS-Lambda based serverless application being invoked 10 million times in a month while sending 10 million Indexed Spans.

| Billable Unit                  | Quantity   | Price                                                                       | Formula   | Subtotal           |
|--------------------------------|------------|-----------------------------------------------------------------------------|-----------|--------------------|
| Lambda Function Invocations    | 10 million | [$5 per month][10]                                                           | 10 * $5  | $50               |
| Indexed Spans                  | 10 million | 150,000 Indexed Spans included with each 1 million Lambda invocations. $1.70 per million additional Indexed Spans | 8.5 * $1.70 | $14.45               |
| Total                          |            |                                                                             | $50 + $14.45 | **$64.45 per month** |

## FAQ

**1. What is classified as an APM host for billing?**

A [host][4] is a physical or virtual operating system instance. Datadog records the number of hosts you are concurrently monitoring in the Datadog Infrastructure service once an hour. For billing APM, number of hosts with [APM installed][12] and sending traces are calculated every hour. At the end of the month, you are billed based on your 99th percentile usage for [APM hosts][5].

**2. How is billing calculated when deploying one Agent per container?**

It is recommended that you set up _one Agent per underlying host_ for container deployment. If you choose instead to run one Agent per container, then each container is treated as a single host. The price is then (Price Per APM host) * (Number of containers).

**3. What is classified as an APM Fargate task for billing?**

A Fargate task is a collection of containers that are scheduled to run on AWS Fargate as a serverless compute engine. Datadog records the number of tasks you are concurrently monitoring in Datadog at five-minute intervals. For billing APM, Datadog bills based on the average number of Fargate tasks that send traces to Datadog per hour across the month of your account.

**4. What happens to your bill when scaling your environment?**

Your APM bill is calculated using the top 99 percentile of active agents sending traces every hour of each month. At the end of the month, Datadog disregards the top 1% value, giving a shield against being billed for unexpected spikes.

**5. Do you get charged for pause containers in Kubernetes?**

Kubernetes creates pause containers to acquire the respective pod's IP address and set up the network namespace for all other containers that join that pod. Datadog excludes all pause containers from your quota and does not charge for them (requires Agent 5.8+). For Kubernetes, APM is priced by nodes not by pods.

**6. How is the host billing related to your services?**

APM is billed on the basis of [hosts][5] deployed with agents sending traces and not services. Additionally, over the monthly allocation by host, APM is billed on the basis of Ingested span volume and Indexed span count. To estimate how many ingested and indexed spans each of your services is sending, see the [ingestion][2] and [retention][13] documentation.

**7. What happens to your existing App Analytics filters?**

As of October 20, 2020, all existing App Analytics filters are automatically transitioned to Retention Filters. You can continue to let the filters remain unchanged or modify them as needed. Transitioned filters are marked with an *i* representing Legacy App Analytics Filters within the [retention filters][3] page.

**8. How do you estimate your ingested or indexed span volume?**

Datadog provides the metrics `datadog.estimated_usage.apm.ingested_bytes` and `datadog.estimated_usage.apm.ingested_spans` for monitoring ingested and indexed span volume. More information is available in the [Usage Metrics][14] documentation.

**9. Is the Continuous Profiler available as a standalone product?**

Yes. Let Datadog know if you are interested in buying the Continuous Profiler without APM. Reach out to [Sales][8] or your [Customer Success Manager][9].

**10. Is Data Streams Monitoring available as a standalone product?**

Yes. Let Datadog know if you are interested in buying Data Streams Monitoring without APM. Reach out to [Sales][8] or your [Customer Success Manager][9].


## Further Reading

{{< whatsnext >}}
    {{< nextlink href="account_management/billing/usage_monitor_apm/" >}}View and Alert on APM Usage{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_control_apm/" >}}Estimate and Control APM Usage{{< /nextlink >}}
{{< /whatsnext >}}


[1]: /tracing/
[2]: /tracing/trace_pipeline/ingestion_controls
[3]: /tracing/trace_pipeline/trace_retention/#retention-filters
[4]: /account_management/billing/pricing/#infrastructure-monitoring
[5]: /account_management/billing/pricing/#apm
[6]: /profiler/
[7]: https://www.datadoghq.com/pricing/
[8]: mailto:sales@datadoghq.com
[9]: mailto:success@datadoghq.com
[10]: /account_management/billing/serverless/#serverless-functions
[11]: /account_management/billing/
[12]: /tracing/trace_collection/dd_libraries/
[13]: /tracing/trace_pipeline/trace_retention/
[14]: /tracing/trace_pipeline/metrics
[15]: /universal_service_monitoring/
