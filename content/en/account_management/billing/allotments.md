---
title: Allotments
kind: documentation
---

## Calculating on-demand usage

On-demand usage refers to usage accrued beyond the sum of committed and allotted usage. To calculate on-demand usage, subtract **total included usage** (that is, committed and allotted usages) from **billable usage**. On-demand usage is billed at an on-demand rate. See [Datadog Pricing][1].

## Calculating total included usage
Total included usage is made up of the **commitment for the product, and the sum of allotments per parent product**. Refer to the user's contract for commitment quantities. The following variables determine how allotment usage is calculated:

- Default allotments by parent products
- On-demand option (hourly or monthly)
- Usage aggregation function

### Default allotments by parent products

For a full list of hourly and monthly default allotments by product, see [Allotments Table][2].

For custom or otherwise non-default contracts, the allotment amount is defined in the user's contract.

If a user's billable usage of the parent product exceeds their commitment, they receive an additional allotment from the on-demand parent product usage and are only billed for the parent product. Once that additional allotment is exhausted, the user may be billed at an on-demand rate for any additional allotment usage. 

For example, if a user is committed to 5 APM Pro Hosts, they have a default Ingested Spans allotment of 5 APM Pro hosts * 150 GB Ingested Spans / host = 750 GB for the month. If they use 6 APM Hosts and 800 GB of Ingested Spans, they are billed for the additional host usage but not for the additional spans usage, since their allotment increases to 900 GB.

### On-demand option

The allotment usage of a product can be computed according to the user's on-demand metering option. Users can opt for a **monthly or hourly** on-demand option. A parent product's on-demand option determines the child's on-demand option; if a parent product has a monthly option, then the child can have either a monthly or hourly option. If a parent product has an hourly option, then the child must also have an hourly option (for example, if there is an hourly APM Host subscription, then the Ingested Spans subscription will also be calculated using an hourly option).

If a user's contract has a subscription specified for a product, and the product supports both hourly and monthly on-demand options, we default to a monthly option. By default, the on-demand option is set at the subscription level and applies to all products except for the following, which support a single default. 

| Product                                          | Default option |
|--------------------------------------------------|----------------|
| Containers (Infrastructure, Profiled, CSPM, CWS) | Hourly         |
| Incident Management                              | Monthly        |
| APM Fargate Products                             | Monthly        |
| Serverless APM                                   | Monthly        |
| Logs Products                                    | Monthly        |
| SNMP Traps                                       | Monthly        |

On hourly metering, the monthly allotment is adjusted to an hourly allotment. For summed products such as APM spans and events, the monthly allotment is annualized and then divided by the number of hours in a year to get the hourly allotment. For leap years, monthly allotments are divided by 732 hours to get the hourly quantity. For non-leap years, they are divided by 730 hours. For averaged products such as metrics, the monthly allotment stays the same at either on-demand option, since total monthly usage is the average of billable usage across all hours in the month. For a full list of hourly and monthly default allotments by product, see the [Allotments Table][2].

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

-- TABLE GOES HERE --

## Examples

### Monthly on-demand option

A user has a monthly commitment of 10 APM Pro Hosts and no Ingested Spans commit over a period of three months. Their usage is as follows: 

| Month     | APM host commitment | APM host usage | Ingested spans allotment | Ingested spans usage | On-demand ingested spans usage |
|-----------|---------------------|----------------|--------------------------|----------------------|--------------------------------|
| July      | 10                  | 5              | 1500 GB                  | 2000 GB              | 500 GB                         |
| August    | 10                  | 15             | 2250 GB                  | 2000 GB              | 0 GB                           |
| September | 10                  | 10             | 1500 GB                  | 1500 GB              | 0 GB                           |

For a user with a monthly on-demand option, the [default allotment][2] of Ingested Spans for each APM Pro host is 150 GB. 

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

For a user with an hourly on-demand option, the [default allotment][2] of Ingested Spans for each APM Pro host is 0.2054 GB.

At **03:00:00 UTC**, the user was committed to 10 APM hosts but only used 5. Their hourly Ingested Spans allotment was the maximum of their host commitment and host usage multiplied by the default allotment: maximum(5, 10)  * 0.2054 GB = 2.054 GB / hour. Their on-demand usage for Ingested Spans is the maximum of 0 and the difference between their billable usage and their allotted usage: maximum(0, 2.500 – 2.054) = 0.446 GB.

At **04:00:00 UTC**, the user was committed to 10 APM hosts but used 15. Their hourly Ingested Spans allotment was the maximum of their host commitment and host usage multiplied by the default allotment: maximum(15,10) * 0.2054 GB = 3.082 GB / hour. Their on-demand usage for Ingested Spans is the maximum of 0 and the difference between their billable usage and their allotted usage: maximum(0, 3.000 – 3.082) = 0 GB.

At **05:00:00 UTC**, the user was committed to 10 APM hosts and used 10. Their hourly Ingested Spans allotment was the maximum of their host commitment and host usage multiplied by the default allotment: maximum(10,10) * 0.2054 GB = 2.054 GB / hour. Their on-demand usage for Ingested Spans is the maximum of 0 and the difference between their billable usage and their allotted usage: maximum(0, 2.054 – 2.054) = 0 GB.

Since the default usage aggregation function for Ingested Spans is sum, we sum the usage over all hours in the month to get the total monthly usage for the month. If this user only had 3 hours of Ingested Spans usage over the month, their total monthly usage would be 0: 4452 + 0 + 0 = 0.446 GB. 

Additionally, the user has a monthly commitment of 0.3 GB of Ingested Spans. Thus, their monthly on-demand usage is the maximum of 0 and the difference between their monthly usage and commitment: maximum(0, 0.446 – 0.3) = 0.146 GB.

[1]: https://www.datadoghq.com/pricing/list/
[3]: /account_management/plan_and_usage/