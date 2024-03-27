---
title: Product Allotments
kind: documentation
---

Allotments refer to additional usage that comes with subscriptions to select parent products. Allotments grant a certain amount of usage for a child product as part of the account's committed and on-demand usage of the parent product.

Examples of products that have this structure include Infrastructure hosts and containers, where every host comes with a container allotment.

## Allotments within billing calculations

Total usage incurred is classified into billable and non-billable usage. Billable usage is what an account can be charged for, while non-billable usage is not charged. Non-billable usage can include trial usage.

In order to invoice billable usage, included usage is first subtracted. Allotments are factored into included usage, which is then used to calculate on-demand usage from billable usage:

- `allotments + committed usage = included usage`
- `billable usage - included usage = on-demand usage`

For example, an account can have a total Ingested Spans usage of 150 GB. From this, 140 GB is billable usage. If there is a prior commitment of 50 GB and an allotment of 30 GB, this 60 GB of usage is classified as included usage and subtracted from the 140 GB of billable usage. The remaining 60 GB of usage is classified as on-demand usage.

- To view total usage and billable usage, see the **All** and **Billable** tabs within the **Plan and Usage** page. 
- To view commitments, refer to your contract.

## Calculating included usage
Total included usage is made up of the **commitment for the product, and the sum of allotments per parent product**. Refer to the user's contract for commitment quantities. The following variables determine how allotment usage is calculated:

- On-demand option
- Allotments by parent products
- Usage aggregation function

### On-demand option

The allotment usage of a product can be computed according to the organization's on-demand metering option. Organizations can opt for a **monthly or hourly** on-demand option. Refer to your contract for information on your metering option. By default, the on-demand option is set at the subscription level and applies to all products except for the following, which support a single default. 

| Product                                         | Default option |
|-------------------------------------------------|----------------|
| Containers (Infrastructure, Profiled, Security) | Hourly         |
| Incident Management                             | Monthly        |
| APM Fargate Products                            | Monthly        |
| Serverless APM                                  | Monthly        |
| Logs Products                                   | Monthly        |
| SNMP Traps                                      | Monthly        |

On hourly metering, the monthly allotment is adjusted to an hourly allotment. For summed products such as APM spans, for example, the monthly allotment is annualized and then divided by the number of hours in a year to get the hourly allotment. For averaged products such as custom metrics, the monthly allotment stays the same at either on-demand option, since total monthly usage is the average of billable usage across all hours in the month.

## Allotments by parent products

For a full list of default allotments by parent product, see the [allotments table](#allotments-table). For custom or otherwise non-default allotments, refer to your contract for more information.

If an organization's billable usage of the parent product exceeds their commitment, they receive an additional allotment from the on-demand parent product usage and are only billed for the parent product. Once that additional allotment is exhausted, any additional usage of the child product may be billed at an on-demand rate. For either on-demand option, allotments are not carried over to subsequent hours; if an organization has a remainder at the end of their hourly or monthly metering period, it is not applicable in the next period.

For example, if an organization with a monthly on-demand option is committed to 5 APM Pro Hosts, they have a default Ingested Spans allotment of `5 APM Pro Hosts * 150 GB Ingested Spans per host = 750 GB` for the month. If they use 6 APM Hosts and 800 GB of Ingested Spans, they are billed for the additional host usage but not for the additional spans usage, since their Ingested Spans allotment increases to 900 GB. The 100 GB remainder is not applicable in the following month.

## Usage aggregation function
Aggregation functions are used to convert the hourly billable usage into a monthly usage value that can be used for billing. Each product can have up to two usage aggregation functions (one for each possible on-demand option). The available aggregation functions include sum, average, maximum, and high watermark plan (HWMP). 

- **Sum:** This is the sum of total usage volume over all hours in the month. Usage is calculated every hour as included usage is compared with billable usage of each distinct instance of product usage. At the end of the month, on-demand usage is added up for each hour in the month.
- **Average:** On a monthly on-demand option, this is the average usage across all hours in the month. On-demand usage for the month is derived by subtracting total included usage from the average usage for the month.

    On an hourly on-demand option, usage is metered each hour, then the total included usage is then subtracted from the metered usage each hour to get the on-demand usage for each hour. At the end of the month, the average is calculated by summing on-demand usage across all hours and dividing by the number of hours in the month.
- **Maximum:** This is the maximum usage over all intervals across a given time period, usually monthly.
- **High watermark plan (HWMP):** The billable count of hosts is calculated at the end of the month using the maximum count of the lower 99 percent of usage for those hours. Datadog excludes the top 1% to reduce the impact of spikes in usage on your bill. 

Below is a summary of each allotment's default usage aggregation function:

| Allotment             | Possible Parent Products                                      | Default monthly usage aggregation function | Default hourly usage aggregation function |
|-----------------------|---------------------------------------------------------------|--------------------------------------------|-------------------------------------------|
| Custom Metrics | Infrastructure Pro Hosts, Infrastructure Pro Plus Hosts, Infrastructure Enterprise Hosts, Internet of Things (IoT), Serverless Workload Monitoring - Functions, Serverless Workload Monitoring - Apps,
Serverless Invocations, Serverless Functions  | Average | Average |
| Ingested Custom Metrics | Infrastructure Pro Hosts, Infrastructure Pro Plus Hosts, Infrastructure Enterprise Hosts, Internet of Things (IoT), Serverless Workload Monitoring - Functions, Serverless Workload Monitoring - Apps | Average | Average |
| Custom Events | Infrastructure Pro Hosts, Infrastructure Pro Plus Hosts, Infrastructure Enterprise Hosts | Sum | Sum |
| CSM Enterprise Containers    | Cloud Security Management (CSM)       |                 | Sum                     |
| CWS Containers      | Cloud Workload Security (CWS)              |                     | Sum                       |
| Infrastructure Containers    | Infrastructure Pro Hosts, Infrastructure Pro Plus Hosts, Infrastructure Enterprise Hosts |               | Sum            |
| Profiled Containers | APM Enterprise, Continuous Profiler               |           | Sum                                       |
| Profiled Hosts        | APM Enterprise                        | HWMP                         | Sum                      |
| CI Indexed Spans    | CI Visibility         | Sum                | Sum                        |      
| Test Indexed Spans    | Test Visibility         | Sum                | Sum                        |               
| APM Indexed Spans | APM, APM Pro, APM Enterprise, Serverless APM, Legacy - Serverless Invocations, Legacy - Serverless Functions, Fargate Task (APM Pro), Fargate Task (APM Enterprise) | Sum | Sum |
| APM Ingested Spans | APM, APM Pro, APM Enterprise, Serverless APM, Legacy - Serverless Invocations, Legacy - Serverless Functions, Fargate Task (APM Pro), Fargate Task (APM Enterprise) | Sum | Sum | 
| DBM Normalized Queries | Database Monitoring (DBM) | Average | Average |
| Data Streams Monitoring | APM Pro, APM Enterprise | HWMP | Sum |
| CSPM Workflow Executions | Cloud Security Management Pro, Cloud Security Management Enterprise | Sum | Sum |
| Fargate Task (Continuous Profiler) | Fargate Task (APM Enterprise) | Average | |


## Calculating on-demand usage

On-demand usage refers to usage accrued beyond the sum of committed and allotted usage. To calculate on-demand usage, subtract **included usage** (that is, committed and allotted usages) from **billable usage**. 

For example, a user has a commitment of 100 GB of Ingested Spans and 5 APM Pro Hosts. Their host commitment results in a span allotment of `5 APM Pro Hosts * 150 GB Ingested Spans per host = 750 GB` for the month. Their included usage of Ingested Spans is `750 GB + 100`. If they have 1000 GB worth of Ingested Spans usage, then use 6 APM Hosts and 800 GB of Ingested Spans, they are billed for the additional host usage but not for the additional spans usage, since their allotment increases to 900 GB.

On-demand usage is billed at an on-demand rate. See [Datadog Pricing][1].

## Calculating billable usage

Billable usage refers to any raw usage that is eligible to appear on a user's invoice, excluding organization and product trial usage. Refer to the [Plan and Usage page][3] for context on your billable usage. The following variables determine how billable usage is calculated:

- On-demand option (hourly or monthly)
- Usage aggregation function

### On-demand option
On monthly metering, on-demand usage is calculated at the end of the month by comparing billable usage to included usage. On hourly metering, on-demand usage is calculated every hour instead of at the end of the month.

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
| Hour 1 | 10                  | 5              | 2.054 GB                 | 2.500 GB             | 0.446 GB                       |
| Hour 2 | 10                  | 15             | 3.082 GB                 | 3.000 GB             | 0 GB                           |
| Hour 3 | 10                  | 10             | 2.054 GB                 | 2.054 GB             | 0 GB                           |

For a user with an hourly on-demand option, the [default allotment](#allotments-table) of Ingested Spans for each APM Pro host is 0.2054 GB.

In **Hour 1**, the organization was committed to 10 APM hosts but only used 5. Their hourly Ingested Spans allotment was the maximum of their host commitment and host usage multiplied by the default allotment: maximum(5, 10)  * 0.2054 GB = 2.054 GB / hour. Their on-demand usage for the hour is the maximum of 0 and the difference between their billable usage and their allotted usage: maximum(0, 2.500 – 2.054) = 0.446 GB.

In **Hour 2**, the organization was committed to 10 APM hosts but used 15. Their hourly Ingested Spans allotment was the maximum of their host commitment and host usage multiplied by the default allotment: maximum(15,10) * 0.2054 GB = 3.081 GB / hour. Their on-demand usage for the hour is the maximum of 0 and the difference between their billable usage and their allotted usage: maximum(0, 3.000 – 3.081) = 0 GB.

In **Hour 3**, the organization was committed to 10 APM hosts and used 10. Their hourly Ingested Spans allotment was the maximum of their host commitment and host usage multiplied by the default allotment: maximum(10,10) * 0.2054 GB = 2.054 GB / hour. Their on-demand usage for the hour is the maximum of 0 and the difference between their billable usage and their allotted usage: maximum(0, 2.054 – 2.054) = 0 GB.

Since the default usage aggregation function for Ingested Spans is sum, usage is summed over all hours in the month to get the total on-demand usage for the month. If this organization only had 3 hours of Ingested Spans usage over the month, their total monthly usage would be 0: 4452 + 0 + 0 = 0.446 GB. 

Additionally, the organization has a monthly commitment of 0.3 GB of Ingested Spans. Thus, their monthly on-demand usage is the maximum of 0 and the difference between their monthly usage and commitment: maximum(0, 0.446 – 0.3) = 0.146 GB.

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