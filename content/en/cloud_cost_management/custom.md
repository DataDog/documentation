---
title: Custom Costs
kind: documentation
is_beta: true
private: true
disable_toc: false
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Cloud Cost Management"
- link: "/cloud_cost_management/aws"
  tag: "Documentation"
  text: "Gain insights into your AWS bill"
- link: "/cloud_cost_management/azure"
  tag: "Documentation"
  text: "Gain insights into your Azure bill"
- link: "/cloud_cost_management/google_cloud"
  tag: "Documentation"
  text: "Gain insights into your Google Cloud bill"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Cloud Cost Management is not supported for this site.</div>
{{< /site-region >}}

{{< beta-callout url="#" btn_hidden="true" >}}
Cloud Cost for Google Cloud is in private beta
{{< /beta-callout >}}

## Overview


Custom costs allow you to upload any cost data source to Datadog, so that you can understand the total cost of your services. To use Custom Costs in Datadog, you must [configure Cloud Cost Management][1] for either AWS, Azure, or Google Cloud.

{{< beta-callout url="#" btn_hidden="true" >}}
This feature is currently in public beta.
{{< /beta-callout >}}

## Setup

### Collect the required fields

For all fields:
- NULL or blank ("") values are not accepted
- All data will be viewed as UTC 

| Parameter | Description | Valid example | Invalid example | Additional Requirements |
| ----------| -----------|----------| -----------|----------|
|ProviderName | The service being consumed | Snowflake | "" or NULL|  |
|ChargeDescription | Identifies what aspect of a service is being charged | Database Costs | "" or NULL|  |
|ChargePeriodStart| Start day of a charge | 2023-09-01| 2023-01-01 12:34:56| Formatted YYYY-MM-DD, where ChargePeriodStart <= ChargePeriodEnd|
|ChargePeriodEnd |Last day of a charge  | 2023-09-30 | 01/01/2023 | Formatted YYYY-MM-DD |
|BilledCost| The amount being charged |10.00 |NaN | Number based decimal |
|BillingCurrency | Currency of billed cost | USD| EUR | **This must be USD at this time** |

### Create a CSV or JSON file
 **Note:** 
- You can upload multiple CSV and JSON files, in either or both formats.
- Ensure that you don't upload the same file twice, since the cost will appear doubled in the product.

#### CSV

#### JSON
   
#### Add optional tags 

### Configure Cloud Costs
You can either upload the file via UI or API.

## Cost types
You can visualize your ingested data using the following cost types:

| Cost Type | Description |
| ----------| ----------------------------------|
| `custom.cost.amortized` | Total cost of resources allocated at the time of usage over an interval. Costs include promotion credits as well as committed usage discount credits. |
| `custom.cost.basis` | |

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/cloud_cost_management
