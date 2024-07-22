---
title: Product Allotments
---

Allotments provide additional usage that comes with subscriptions to select parent products. They grant a certain amount of usage for a child product as part of the account's committed and on-demand usage of the parent product.

Examples of products that have this structure include Infrastructure hosts and containers, where every host comes with a container allotment.

## Allotments within billing calculations

Total usage incurred is classified into billable and non-billable usage. Billable usage is what an account can be charged for, while non-billable usage is not charged. Non-billable usage can include trial usage.

In order to invoice billable usage, included usage is first subtracted. Allotments are factored into included usage, which is then used to calculate on-demand usage from billable usage:

- `allotments + committed usage = included usage`
- `billable usage - included usage = on-demand usage`

For example, an account can have a total Ingested Spans usage of 150 GB. From this, 140 GB is billable usage. If there is a prior commitment of 50 GB and an allotment of 30 GB, this 80 GB of usage is classified as included usage and subtracted from the 140 GB of billable usage. The remaining 60 GB of usage is classified as on-demand usage.

- To view total usage and billable usage, see the **All** and **Billable** tabs within the [**Plan and Usage** page][2] in Datadog. 
- To view commitments, refer to your contract.

## Calculating included usage
Total included usage is made up of the **commitment for the product, and the sum of allotments per parent product**. Refer to the user's contract for commitment quantities. The following variables determine how allotment usage is calculated:

- On-demand option
- Allotments by parent products
- Usage aggregation function

### On-demand option

The allotment usage of a product can be computed according to the organization's on-demand metering option. Organizations can opt for a **monthly or hourly** on-demand option. Refer to your contract for information on your metering option. 

By default, the on-demand option is set at the subscription level and applies to all products except for the following, which support a single default on-demand option: 

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

For a full list of default allotments by parent product, see the allotments table on the [Allotments Calculator][3] page. For custom or otherwise non-default allotments, review your contract for more information.

If an organization's billable usage of the parent product exceeds their commitment, they receive an additional allotment from the on-demand parent product usage and are only billed for the parent product. After that additional allotment is exhausted, any additional usage of the child product may be billed at an on-demand rate. For either on-demand option, allotments are not carried over to subsequent hours; if an organization has a remainder at the end of their hourly or monthly metering period, it is not applicable in the next period.

For example, if an organization with a monthly on-demand option is committed to 5 APM Pro Hosts, they have a default Ingested Spans allotment of `5 APM Pro Hosts * 150 GB Ingested Spans per host = 750 GB` for the month. If they use 6 APM Hosts and 800 GB of Ingested Spans, they are billed for the additional host usage but not for the additional _spans_ usage, since their Ingested Spans allotment increases to 900 GB. The 100 GB remainder is not applicable in the following month.

## Usage aggregation function
Aggregation functions are used to convert the hourly billable usage into a monthly usage value that can be used for billing. Each product can have up to two usage aggregation functions (one for each possible on-demand option). The available aggregation functions include sum, average, maximum, and high watermark plan (HWMP). 

- **Sum:** This is the sum of total usage volume over all hours in the month. Usage is calculated every hour as included usage is compared with billable usage of each distinct instance of product usage. At the end of the month, on-demand usage is added up for each hour in the month.
- **Average:** On a monthly on-demand option, this is the average usage across all hours in the month. On-demand usage for the month is derived by subtracting total included usage from the average usage for the month.

    On an hourly on-demand option, usage is metered each hour, then the total included usage is subtracted from the metered usage each hour to get the on-demand usage for each hour. At the end of the month, the average is calculated by summing on-demand usage across all hours and dividing by the number of hours in the month.
- **Maximum:** This is the maximum usage over all intervals across a given time period, usually monthly.
- **High watermark plan (HWMP):** The billable count of hosts is calculated at the end of the month using the maximum count of the lower 99 percent of usage for those hours. Datadog excludes the top 1% to reduce the impact of spikes in usage on your bill. 

See [Usage aggregation functions for allotments](#usage-aggregation-functions-for-allotments) for individual product details.

## Calculating on-demand usage

On-demand usage refers to usage accrued beyond the sum of committed and allotted usage. To calculate on-demand usage, subtract **included usage** (that is, committed and allotted usages) from **billable usage**. 

The on-demand option determines how frequently on-demand usage is calculated. For the monthly on-demand option, on-demand usage is calculated at the end of each month. For the hourly on-demand option, on-demand usage is calculated each hour and the total on-demand usage to be billed at the end of the month is the aggregate of hourly on-demand usage across all hours in the month. On-demand usage is billed at an on-demand rate. See [Datadog Pricing][1].

### Example
**An organization with a monthly on-demand option** is committed to 5 APM Pro hosts and no Ingested Spans. They will have a total included usage of `(5 APM Pro hosts * 150 GB Ingested Spans per host) + 0 commitment = 750 GB Ingested Spans of total included usage`. If they have 1000 GB of Ingested Spans usage, the additional 250 GB is classified as on-demand usage.

**An organization with an hourly on-demand option** is committed to 5 APM Pro hosts and no Ingested Spans. Since their on-demand usage is calculated hourly, their monthly allotment is annualized then divided by the number of hours in a year: `(365 * 24 / 12) = 730`. Thus, their hourly Ingested Spans allotment is `(5 APM Hosts * (150 GB Ingested Spans / Host) /  (730 hours))  = 1.027 GB Ingested Spans per hour`.

If they used 1.1 GB during hour 1, 0.9 GB during hour 2, and 1.2 GB during hour 3, their on-demand usage for the month is the difference between their billable usage and their allotted usage summed across all usage hours in the month: `((1.1 - 1.027 = 0.073) + (0.9 - 1.027 = 0) + (1.2 - 1.027 = 0.173)) = 0.246 GB on-demand usage for Ingested Spans`.

## Calculating billable usage

Billable usage refers to any raw usage that is eligible to appear on a user's invoice, excluding organization and product trial usage. Refer to the [Plan and Usage page][2] in Datadog to view your billable usage. The following variables determine how billable usage is calculated:

- On-demand option
- Usage aggregation function

### On-demand option
On monthly metering, on-demand usage is calculated at the end of the month by comparing billable usage to included usage. On hourly metering, on-demand usage is calculated every hour instead of at the end of the month. It is then aggregated over all usage hours in the month, and the commitment is then applied to arrive at a final billable on-demand usage value.

### Usage aggregation
See [Usage aggregation function](#usage-aggregation-function).

### Examples

#### Monthly on-demand option

An organization has a monthly commitment of 10 APM Pro Hosts and 100 GB Ingested Spans commitment per month over a period of three months. Their usage is as follows (with derived values in *italics*): 

| Month | APM host commitment | APM host usage | Allotment for Ingested Spans | Included usage for Ingested Spans | Billable usage for Ingested Spans | On-demand usage for Ingested Spans |
|-----|--------|--------|-----------|-----------|---------|---|
| 1  | 10  | 5   | *1500 GB*   | *1600 GB*   | 2000 GB | *400 GB*  |
| 2  | 10  | 15 | *2250 GB*  | *2350 GB* | 2000 GB  | *0 GB*      |
| 3 | 10   | 10   | *1500 GB*  | *1600 GB*  | 1600 GB | *0 GB*  |

For a monthly on-demand option, the [default allotment](#allotments-table) of Ingested Spans for each APM Pro host is 150 GB. 

In **Month 1**, the organization was committed to 10 APM hosts but only used 5. Their Ingested Spans allotment was the maximum of their host commitment and host usage multiplied by the default allotment: `maximum(5, 10) * 150 GB = 1500 GB allotment of Ingested Spans`. Their included usage for Ingested Spans was the sum of their commitment and allotment: `1500 GB + 100 GB = 1600 GB`. Their on-demand usage for Ingested Spans was the maximum of 0 and the difference between their billable usage and allotment: `maximum(0, 2000 – 1600) = 400 GB`.

In **Month 2**, the organization was committed to 10 APM hosts but used 15. Their Ingested Spans allotment was the maximum of their host commitment and host usage multiplied by the default allotment: `maximum(15, 10) * 150 GB = 2250 GB allotment of Ingested Spans`. Their included usage for Ingested Spans was the sum of their commitment and allotment: `2250 GB + 100 GB = 2350 GB`. Their on-demand usage for Ingested Spans was the maximum of 0 and the difference between their usage and allotment: `maximum(0, 2000 – 2350) = 0 GB`.

In **Month 3**, the organization was committed to 10 APM hosts, and they used 10. Their Ingested Spans allotment was the maximum of their host commitment and host usage multiplied by the default allotment: `maximum(10, 10) * 150 GB = 1500 GB allotment of Ingested Spans`. Their included usage for Ingested Spans was the sum of their commitment and allotment: `1500 GB + 100 GB = 1600 GB`. Their on-demand usage for Ingested Spans was the maximum of 0 and the difference between their usage and allotment: `maximum(0, 1600 – 1600) = 0 GB`.

#### Hourly on-demand option

An organization has a monthly commit of 10 APM Pro Hosts and 0.3 GB Ingested Spans commitment per month over a period of a month. Their usage is as follows: 

| Timestamp    | APM host commitment | APM host usage | Ingested spans allotment | Ingested spans usage | On-demand ingested spans usage |
|--------------|---------------------|----------------|--------------------------|----------------------|--------------------------------|
| Hour 1 | 10    | 5      | 2.054 GB     | 2.500 GB    | 0.446 GB           |
| Hour 2 | 10    | 15     | 3.082 GB     | 3.000 GB    | 0 GB               |
| Hour 3 | 10    | 10     | 2.054 GB     | 2.054 GB    | 0 GB               |

For a user with an hourly on-demand option, the [default allotment](#allotments-table) of Ingested Spans for each APM Pro host is 0.2054 GB.

In **Hour 1**, the organization was committed to 10 APM hosts but only used 5. Their hourly Ingested Spans allotment was the maximum of their host commitment and host usage multiplied by the default allotment: `maximum(5, 10)  * 0.2054 GB = 2.054 GB / hour`. Their on-demand usage for the hour is the maximum of 0 and the difference between their billable usage and their allotted usage: `maximum(0, 2.500 – 2.054) = 0.446 GB`.

In **Hour 2**, the organization was committed to 10 APM hosts but used 15. Their hourly Ingested Spans allotment was the maximum of their host commitment and host usage multiplied by the default allotment: `maximum(15,10) * 0.2054 GB = 3.081 GB / hour`. Their on-demand usage for the hour is the maximum of 0 and the difference between their billable usage and their allotted usage: `maximum(0, 3.000 – 3.081) = 0 GB`.

In **Hour 3**, the organization was committed to 10 APM hosts and used 10. Their hourly Ingested Spans allotment was the maximum of their host commitment and host usage multiplied by the default allotment: `maximum(10,10) * 0.2054 GB = 2.054 GB / hour`. Their on-demand usage for the hour is the maximum of 0 and the difference between their billable usage and their allotted usage: `maximum(0, 2.054 – 2.054) = 0 GB`.

Since the default usage aggregation function for Ingested Spans is sum, usage is summed over all hours in the month to get the total on-demand usage for the month. If this organization only had 3 hours of Ingested Spans usage over the month, their total monthly usage would be 0: `4452 + 0 + 0 = 0.446 GB`. 

Additionally, the organization has a monthly commitment of 0.3 GB of Ingested Spans. Thus, their monthly on-demand usage is the maximum of 0 and the difference between their monthly usage and commitment: `maximum(0, 0.446 – 0.3) = 0.146 GB`.

## Usage aggregation functions for allotments

| Allotment             | Possible Parent Products                                      | Default monthly usage aggregation function | Default hourly usage aggregation function |
|-----------------------|---------------------------------------------------------------|--------------------------------------------|-------------------------------------------|
| Custom Metrics | Infrastructure Pro Hosts, Infrastructure Pro Plus Hosts, Infrastructure Enterprise Hosts, Internet of Things (IoT), Serverless Workload Monitoring - Functions, Serverless Workload Monitoring - Apps, Serverless Invocations, Serverless Functions  | Average | Average |
| Ingested Custom Metrics | Infrastructure Pro Hosts, Infrastructure Pro Plus Hosts, Infrastructure Enterprise Hosts, Internet of Things (IoT), Serverless Workload Monitoring - Functions, Serverless Workload Monitoring - Apps | Average | Average |
| Custom Events | Infrastructure Pro Hosts, Infrastructure Pro Plus Hosts, Infrastructure Enterprise Hosts | Sum | Sum |
| CSM Enterprise Containers    | Cloud Security Management (CSM)       |      N/A     | Sum    |
| CWS Containers      | Cloud Workload Security (CWS)              |       N/A     | Sum      |
| Infrastructure Containers    | Infrastructure Pro Hosts, Infrastructure Pro Plus Hosts, Infrastructure Enterprise Hosts |   N/A   | Sum  |
| Profiled Containers | APM Enterprise, Continuous Profiler    |   N/A        | Sum   |
| Profiled Hosts        | APM Enterprise       | HWMP   | Sum     |
| CI Indexed Spans    | CI Visibility         | Sum     | Sum   |      
| Test Indexed Spans    | Test Visibility         | Sum   | Sum   |               
| APM Indexed Spans | APM, APM Pro, APM Enterprise, Serverless APM, </br> Legacy - Serverless Invocations, </br> Legacy - Serverless Functions, Fargate Task (APM Pro), </br> Fargate Task (APM Enterprise) | Sum | Sum |
| APM Ingested Spans | APM, APM Pro, APM Enterprise </br> Serverless APM, Legacy - Serverless Invocations </br> Legacy - Serverless Functions </br> Fargate Task (APM Pro), Fargate Task (APM Enterprise) | Sum | Sum | 
| DBM Normalized Queries | Database Monitoring (DBM) | Average | Average |
| Data Streams Monitoring | APM Pro, APM Enterprise | HWMP | Sum |
| CSPM Workflow Executions | Cloud Security Management Pro, Cloud Security Management Enterprise | Sum | Sum |
| Fargate Task (Continuous Profiler) | Fargate Task (APM Enterprise) | Average | N/A |

[1]: https://www.datadoghq.com/pricing/list/
[2]: https://app.datadoghq.com/billing/usage
[3]: https://www.datadoghq.com/pricing/allotments/
