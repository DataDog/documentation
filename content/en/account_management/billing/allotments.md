---
title: Billing Calculations with Allotments
kind: documentation
---

Allotments refer to additional usage that comes with subscriptions to select parent products. Allotments grant a certain amount of usage for a child product as part of the account's committed and on-demand usage of the parent product.

Examples of products that have this structure include Infrastructure hosts and containers, where every host comes with a container allotment.

## Allotments by parent products

For a full list of default allotments by parent product, see the [allotments table](#allotments-table).

For custom or otherwise non-default contracts, the allotment amount is defined in the user's contract.

If a user's billable usage of the parent product exceeds their commitment, they receive an additional allotment from the on-demand parent product usage and are only billed for the parent product. Once that additional allotment is exhausted, the user may be billed at an on-demand rate for any additional allotment usage.

For example, if a user is committed to 5 APM Pro Hosts, they have a default Ingested Spans allotment of `5 APM Pro Hosts * 150 GB Ingested Spans per host = 750 GB` for the month. If they use 6 APM Hosts and 800 GB of Ingested Spans, they are billed for the additional host usage but not for the additional spans usage, since their Ingested Spans allotment increases to 900 GB.

## Calculating on-demand usage

On-demand usage refers to usage accrued beyond the sum of committed and allotted usage. To calculate on-demand usage, subtract **total included usage** (that is, committed and allotted usages) from **billable usage**. 

For example, a user has a commitment of 100 GB of Ingested Spans and 5 APM Pro Hosts. Their host commitment results in a span allotment of `5 APM Pro Hosts * 150 GB Ingested Spans per host = 750 GB` for the month. Their total included usage of Ingested Spans is `750 GB + 100`. If they have 1000 GB worth of Ingested Spans usage, then use 6 APM Hosts and 800 GB of Ingested Spans, they are billed for the additional host usage but not for the additional spans usage, since their allotment increases to 900 GB.

On-demand usage is billed at an on-demand rate. See [Datadog Pricing][1].

## Calculating total included usage
Total included usage is made up of the **commitment for the product, and the sum of allotments per parent product**. Refer to the user's contract for commitment quantities. The following variables determine how allotment usage is calculated:

- Allotments by parent products
- On-demand option
- Usage aggregation function

### On-demand option

The allotment usage of a product can be computed according to the user's on-demand metering option. Users can opt for a **monthly or hourly** on-demand option. A parent product's on-demand option determines the child's on-demand option; if a parent product has a monthly option, then the child can have either a monthly or hourly option. If a parent product has an hourly option, then the child must also have an hourly option (for example, if there is an hourly APM Host subscription, then the Ingested Spans subscription is also calculated using an hourly option).

If a user's contract has a subscription specified for a product, and the product supports both hourly and monthly on-demand options, the on-demand option defaults to monthly. By default, the on-demand option is set at the subscription level and applies to all products except for the following, which support a single default. 

| Product                                          | Default option |
|--------------------------------------------------|----------------|
| Containers (Infrastructure, Profiled, CSPM, CWS) | Hourly         |
| Incident Management                              | Monthly        |
| APM Fargate Products                             | Monthly        |
| Serverless APM                                   | Monthly        |
| Logs Products                                    | Monthly        |
| SNMP Traps                                       | Monthly        |

On hourly metering, the monthly allotment is adjusted to an hourly allotment. For summed products such as APM spans and events, the monthly allotment is annualized and then divided by the number of hours in a year to get the hourly allotment. For leap years, monthly allotments are divided by 732 hours to get the hourly quantity. For non-leap years, they are divided by 730 hours. For averaged products such as metrics, the monthly allotment stays the same at either on-demand option, since total monthly usage is the average of billable usage across all hours in the month. For a full list of hourly and monthly default allotments by product, see [Allotments table](#allotments-table).

On-demand usage is calculated at the hourly level for this on-demand option as well. Therefore, the total monthly on-demand usage is the sum of hourly on-demand usage. Hourly allotments are not carried over to subsequent hours.

For example, a user with an hourly on-demand option is committed to 5 APM Pro hosts and no Ingested Spans. Since their on-demand usage is calculated hourly, their monthly allotment is annualized then divided by the number of hours in a year: (365 * 24 / 12) = 730. Thus, their hourly Ingested Spans allotment is (5 APM Hosts * (150 GB Ingested Spans / Host) /  (730)) = 1.027 GB Ingested Spans per hour. 

If they used 1.1 GB during hour 1, 0.9 GB during hour 2, and 1.2 GB during hour 3, their on-demand usage for the month is the difference between their billable usage and their allotted usage summed across all usage hours in the month: ((1.1 – 1.027 = 0.073) + (0.9 – 1.027 = 0) + (1.2 – 1.027 = 0.173)) = 0.246 GB on-demand usage for Ingested Spans.

## Calculating billable usage

Billable usage refers to any raw usage that is eligible to appear on a user's invoice, excluding organization and product trial usage. Refer to the [Plan and Usage page][3] for context on your billable usage. The following variables determine how billable usage is calculated:

- On-demand option (hourly or monthly)
- Usage aggregation function

### On-demand option
On monthly metering, on-demand usage is calculated at the end of the month by comparing billable usage to total included usage. On hourly metering, on-demand usage is calculated every hour instead of at the end of the month.

### Usage aggregation function
Aggregation functions are used to convert the hourly/5-min billable usage into a monthly usage value that can be used to bill users. Each product can have up to two usage aggregation functions (one for each possible on-demand option). The available aggregation functions include sum, average, maximum, and high watermark plan (HWMP). 
- **Sum:** This is the sum of total usage volume over all hours in the month. Usage is calculated every hour as total included usage is compared with billable usage of each distinct instance of product usage. At the end of the month, on-demand usage is added up for each hour in the month.
- **Average:** This is the average hourly usage during a month. For the monthly on-demand option, allotments and commitments are deducted from average billable usage. For the hourly on-demand option, Datadog calculates an average of the on-demand usage. 
- **Maximum:** The maximum unit of usage over intervals across a given time period.
- **High watermark plan (HWMP):** The billable count of hosts is calculated at the end of the month using the maximum count of the lower 99 percent of usage for those hours. Datadog excludes the top 1% to reduce the impact of spikes in usage on your bill. 

Below is a summary of each allotment's default usage aggregation function:

| Allotment             | Possible Parent Products                                      | Default monthly usage aggregation function | Default hourly usage aggregation function |
|-----------------------|---------------------------------------------------------------|--------------------------------------------|-------------------------------------------|
| Containers (CSPM)     | Cloud Security Posture Management (CSPM)                      |                                            | Sum                                       |
| Containers (CWS)      | Cloud Workload Security (CWS)                                 |                                            | Sum                                       |
| Containers (Infra)    | Infra Pro Hosts, Infra Pro Plus Hosts, Infra Enterprise Hosts |                                            | Sum                                       |
| Containers (Profiled) | APM Enterprise, Continuous Profiler                           |                                            | Sum                                       |
| Profiled Hosts        | APM Enterprise                                                | HWMP                                       | Sum                                       |
| Indexed Spans (CI)    | Pipeline Visibility, Testing Visibility                       | Sum                                        | Sum                                       |
| Indexed Spans (APM)| APM, APM Pro, APM Enterprise, Serverless APM, Legacy - Serverless Invocations, Legacy - Serverless Functions, Fargate Task (APM), Fargate Task (APM Enterprise), Fargate Task (APM Pro) | Sum | Sum |
| Indexed Spans (Application Security)| Application Security Monitoring | Sum | Sum |
| Ingested Spans (APM) | APM, APM Pro, APM Enterprise, Serverless APM, Legacy - Serverless Invocations, Legacy - Serverless Functions, Fargate Task (APM), Fargate Task (APM Enterprise), Fargate Task (APM Pro) | Sum | Sum | 
| Custom Events | Infra Pro Hosts, Infra Pro Plus Hosts, Infra Enterprise Hosts | Sum | Sum |
| Custom Metrics | Infra Pro Hosts, Infra Pro Plus Hosts, Infra Enterprise Hosts, Serverless Workload (Functions), Serverless Workload (Apps), Internet of Things (IoT), Legacy - Serverless Invocations, Legacy - Serverless Functions  | Average | Average |
| Ingested Custom Metrics | Infra Pro Hosts, Infra Pro Plus Hosts, Infra Enterprise Hosts, Serverless Workload (Functions), Serverless Workload (Apps) | Average | Average |
| DBM Normalized Queries | Database Monitoring (DBM) | Average | Average |
| DSM Fargate Task | Fargate Task (APM Enterprise), Fargate Task (APM Pro) | Average | |
| Fargate Task (Continuous Profiler) | Fargate Task (APM Enterprise), Fargate Task (APM Pro) | Average | |
| Log Events (CWS) | Cloud Workload Security (CWS) | Sum | Sum | 
| Network Flows | Network Performance Monitoring (NPM)| Sum | Sum |
| SNMP Traps | Network Device Monitoring (NDM) | Sum | | 
| CSPM Workflow Executions | Cloud Security Management Pro, Cloud Security Management Enterprise | Sum | Sum |

## Examples

### Monthly on-demand option

A user has a monthly commitment of 10 APM Pro Hosts and no Ingested Spans commit over a period of three months. Their usage is as follows: 

| Month     | APM host commitment | APM host usage | Ingested spans allotment | Ingested spans usage | On-demand ingested spans usage |
|-----------|---------------------|----------------|--------------------------|----------------------|--------------------------------|
| July      | 10                  | 5              | 1500 GB                  | 2000 GB              | 500 GB                         |
| August    | 10                  | 15             | 2250 GB                  | 2000 GB              | 0 GB                           |
| September | 10                  | 10             | 1500 GB                  | 1500 GB              | 0 GB                           |

For a user with a monthly on-demand option, the [default allotment](#allotments-table) of Ingested Spans for each APM Pro host is 150 GB. 

In **July**, the user was committed to 10 APM hosts but only used 5. Their Ingested Spans allotment was the maximum of their host commitment and host usage multiplied by the default allotment: maximum(5, 10) * 150 GB = 1500 GB allotment of Ingested Spans. Their on-demand usage for Ingested Spans was the maximum of 0 and the difference between their usage and allotment: maximum(0, 2000 – 1500) = 500 GB.

In **August**, the user was committed to 10 APM hosts but used 15. Their Ingested Spans allotment was the maximum of their host commitment and host usage multiplied by the default allotment: maximum(15, 10) * 150 GB = 2250 GB allotment of Ingested Spans. Their on-demand usage for Ingested Spans was the maximum of 0 and the difference between their usage and allotment: maximum(0, 2000 – 2250) = 0 GB.

In **September**, the user was committed to 10 APM hosts, and they used 10. Their Ingested Spans allotment was the maximum of their host commitment and host usage multiplied by the default allotment: maximum(10, 10) * 150 GB = 1500 GB allotment of Ingested Spans. Their on-demand usage for Ingested Spans was the maximum of 0 and the difference between their usage and allotment: maximum(0, 1500 – 1500) = 0 GB.

### Hourly on-demand option

A user has a monthly commit of 10 APM Pro Hosts and 0.3 GB Ingested Spans. Their usage is as follows: 

| Timestamp    | APM host commitment | APM host usage | Ingested spans allotment | Ingested spans usage | On-demand ingested spans usage |
|--------------|---------------------|----------------|--------------------------|----------------------|--------------------------------|
| 03:00:00 UTC | 10                  | 5              | 2.054 GB                 | 2.500 GB             | 0.446 GB                       |
| 04:00:00 UTC | 10                  | 15             | 3.082 GB                 | 3.000 GB             | 0 GB                           |
| 05:00:00 UTC | 10                  | 10             | 2.054 GB                 | 2.054 GB             | 0 GB                           |

For a user with an hourly on-demand option, the [default allotment](#allotments-table) of Ingested Spans for each APM Pro host is 0.2054 GB.

At **03:00:00 UTC**, the user was committed to 10 APM hosts but only used 5. Their hourly Ingested Spans allotment was the maximum of their host commitment and host usage multiplied by the default allotment: maximum(5, 10)  * 0.2054 GB = 2.054 GB / hour. Their on-demand usage for Ingested Spans is the maximum of 0 and the difference between their billable usage and their allotted usage: maximum(0, 2.500 – 2.054) = 0.446 GB.

At **04:00:00 UTC**, the user was committed to 10 APM hosts but used 15. Their hourly Ingested Spans allotment was the maximum of their host commitment and host usage multiplied by the default allotment: maximum(15,10) * 0.2054 GB = 3.082 GB / hour. Their on-demand usage for Ingested Spans is the maximum of 0 and the difference between their billable usage and their allotted usage: maximum(0, 3.000 – 3.082) = 0 GB.

At **05:00:00 UTC**, the user was committed to 10 APM hosts and used 10. Their hourly Ingested Spans allotment was the maximum of their host commitment and host usage multiplied by the default allotment: maximum(10,10) * 0.2054 GB = 2.054 GB / hour. Their on-demand usage for Ingested Spans is the maximum of 0 and the difference between their billable usage and their allotted usage: maximum(0, 2.054 – 2.054) = 0 GB.

Since the default usage aggregation function for Ingested Spans is sum, usage is summed over all hours in the month to get the total monthly usage for the month. If this user only had 3 hours of Ingested Spans usage over the month, their total monthly usage would be 0: 4452 + 0 + 0 = 0.446 GB. 

Additionally, the user has a monthly commitment of 0.3 GB of Ingested Spans. Thus, their monthly on-demand usage is the maximum of 0 and the difference between their monthly usage and commitment: maximum(0, 0.446 – 0.3) = 0.146 GB.

## Allotments table
Allotment usage refers to product usage that is included with the purchase of select parent products. These allotments grant a certain amount of usage for a child product as part of the account's committed and on-demand usage of the parent product. 

The table below provides an overview of default allotments and quantities included with each parent product, for both the monthly and hourly on-demand options.

<table>
    <thead>
        <th>Parent product</th>
        <th>Allotment product</th>
        <th>Default quantity - monthly on-demand option</th>
        <th>Default quantity - hourly on-demand option*</th>
    </thead>
    <tr>
        <th style="border-top: none !important;" rowspan="4">Infrastructure - Pro</th>
        <td>Custom Metrics</td>
        <td>100 per host</td>
        <td>100 per host</td>
    </tr>
    <tr>
        <td>Ingested Custom Metrics</td>
        <td>100 per host</td>
        <td>100 per host</td>
    </tr>
    <tr>
        <td>Containers</td>
        <td style="background-color: #e8e8e8"></td>
        <td>5 per host</td>
    </tr>
    <tr>
        <td>Custom Events</td>
        <td>500 per host</td>
        <td>0.68 per host per hour</td>
    </tr>
    <tr>
        <th rowspan="4">Infrastructure - Enterprise</th>
        <td>Custom Metrics</td>
        <td>200 per host</td>
        <td>200 per host</td>
    </tr>
    <tr>
        <td>Ingested Custom Metrics</td>
        <td>200 per host</td>
        <td>200 per host</td>
    </tr>
    <tr>
        <td>Containers</td>
        <td style="background-color: #e8e8e8"></td>
        <td>10 per host</td>
    </tr>
    <tr>
        <td>Custom Events</td>
        <td>1,000 per host</td>
        <td>1.37 per host per hour</td>
    </tr>
    <tr>
        <th rowspan="2">APM</th>
        <td>Indexed Spans</td>
        <td>1M per host</td>
        <td>1370 per host per hour</td>
    </tr>
    <tr>
        <td>Ingested Spans</td>
        <td>150 GB per host</td>
        <td>0.205 GB per host per hour</td>
    </tr>
    <tr>
        <th rowspan="3">APM Pro</th>
        <td>Indexed Spans</td>
        <td>1M per host</td>
        <td>1370 per host per hour</td>
    </tr>
    <tr>
        <td>Data Streams Monitoring</td>
        <td>1 per host</td>
        <td>1 per host per hour</td>
    </tr>
    <tr>
        <td>Ingested Spans</td>
        <td>150 GB per host</td>
        <td>0.205 GB per host per hour</td>
    </tr>
    <tr>
        <th rowspan="5">APM Enterprise</th>
        <td>Indexed Spans</td>
        <td>1M per host</td>
        <td>1370 per host per hour</td>
    </tr>
    <tr>
        <td>Ingested Spans</td>
        <td>150 GB per host</td>
        <td>0.205 GB per host per hour</td>
    </tr>
    <tr>
        <td>Data Streams Monitoring</td>
        <td>1 per host</td>
        <td>1 per host per hour</td>
    </tr>
    <tr>
        <td>Profiled Container</td>
        <td style="background-color: #e8e8e8"></td>
        <td>4 per host</td>
    </tr>
    <tr>
        <td>Profiled Host</td>
        <td>1 per host</td>
        <td>1 per host</td>
    </tr>
    <tr>
        <th rowspan="1">Continuous Profiler</th>
        <td>Profiled Container</td>
        <td style="background-color: #e8e8e8"></td>
        <td>4 per host</td>
    </tr>
    <tr>
        <th rowspan="1">Database Monitoring</th>
        <td>Normalized Queries</td>
        <td>200 per database host</td>
        <td>200 per database host per hour</td>
    </tr>
    <tr>
        <th rowspan="2">Serverless Workload Monitoring - Functions</th>
        <td>Custom Metrics</td>
        <td>5 per function</td>
        <td>5 per function</td>
    </tr>
    <tr>
        <td>Ingested Custom Metrics</td>
        <td>5 per function</td>
        <td>5 per function</td>
    </tr>
    <tr>
        <th rowspan="2">Serverless Workload Monitoring - Apps</th>
        <td>Custom Metrics</td>
        <td>5 per instance app</td>
        <td>5 per instance app</td>
    </tr>
    <tr>
        <td>Ingested Custom Metrics</td>
        <td>5 per instance app</td>
        <td>5 per instance app</td>
    </tr>
    <tr>
        <th rowspan="2">Serverless APM</th>
        <td>Indexed Spans (15-Day Retention)</td>
        <td>300K per 1M invocations</td>
        <td>411 per 1M invocations per hour</td>
    </tr>
    <tr>
        <td>Ingested Spans</td>
        <td>50GB per 1M invocations</td>
        <td>0.068 GB per 1M invocations per hour</td>
    </tr>
    <tr>
        <th rowspan="1">Pipeline Visibility</th>
        <td>CI Indexed Spans (30 Day Retention Period)</td>
        <td>400K per committer</td>
        <td>547.95 per committer per hour</td>
    </tr>
    <tr>
        <th rowspan="1">Testing Visibility</th>
        <td>CI Indexed Spans (30 Day Retention Period)</td>
        <td>1M per committer</td>
        <td>1370 per committer per hour</td>
    </tr>
    <tr>
        <th rowspan="1">Cloud Security Management Pro</th>
        <td>CSPM Workflow Executions</td>
        <td>5 per host</td>
        <td>5 per host</td>
    </tr>
    <tr>
        <th rowspan="2">Cloud Security Management Enterprise</th>
        <td>CSM Enterprise Containers</td>
        <td style="background-color: #e8e8e8"></td>
        <td>20 per host</td>
    </tr>
    <tr>
        <td>CSPM Workflow Executions</td>
        <td>20 per host</td>
        <td>20 per host</td>
    </tr>
    <tr>
        <th rowspan="2">IOT</th>
        <td>Custom Metrics</td>
        <td>20 per device</td>
        <td>20 per device</td>
    </tr>
    <tr>
        <td>Ingested Custom Metrics</td>
        <td>20 per device</td>
        <td>20 per device</td>
    </tr>
    <tr>
        <th rowspan="1">Cloud Workload Security Host</th>
        <td>CWS Containers</td>
        <td style="background-color: #e8e8e8"></td>
        <td>4 per host</td>
    </tr>
    <tr>
        <th rowspan="2">Fargate (APM Pro)</th>
        <td>Ingested Spans</td>
        <td>10 GB per task</td>
        <td>0.0137 GB per task</td>
    </tr>
    <tr>
        <td>Indexed Spans</td>
        <td>65K per task</td>
        <td>89.04 per task</td>
    </tr>
    <tr>
        <th rowspan="3">Fargate (APM Enterprise)</th>
        <td>Ingested Spans</td>
        <td>10 GB per task</td>
        <td>0.0137 GB per task</td>
    </tr>
    <tr>
        <td>Indexed Spans</td>
        <td>65K per task</td>
        <td>89.04 per task</td>
    </tr>
    <tr>
        <td>Fargate Task (Continuous Profiler)</td>
        <td>1 per task</td>
        <td>1 per task</td>
    </tr>
</table>
<div style="margin-top: -10px; font-size: 1em">*Divide each summed monthly quantity by 730 hours to get the hourly quantity.</div>

[1]: https://www.datadoghq.com/pricing/list/
[3]: /account_management/plan_and_usage/