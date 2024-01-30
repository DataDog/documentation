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

Custom costs allow you to upload any** cost data source to Datadog, so that you can understand the total cost of your services. **To use Custom Costs in Datadog, you must [configure Cloud Cost Management][1] for either AWS, Azure, or Google Cloud.**

Cost files are aligned with the [FinOps FOCUS specification][4].

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

### Create a CSV or JSON file with required fields
 **Note:** 
- You can upload multiple CSV and JSON files, in either or both formats.
- Ensure that you don't upload the same file twice, since the cost will appear doubled in the product.

#### CSV
The Required Fields above must appear, in the order above, as columns in your CSV.

Example of a valid CSV:
| ProviderName | ChargeDescription | ChargePeriodStart | ChargePeriodEnd | BilledCost | BillingCurrency |
| Github | User Costs | 2023-01-01 | 2023-01-31 | 300.00 | USD |

Example of an invalid CSV:
| ProviderName | ChargePeriodStart | ChargeDescription| ChargePeriodEnd | BilledCost | BillingCurrency |
| Github | 2023-01-01 | User Costs | 2023-01-31 | 300.00 | EUR |

#### JSON
The Required Fields must appear within all objects of a JSON file adhering to the [ECMA-404 standard], and all objects must be encapsulated by an array.

Example of a valid JSON file:

[
    {
        "ProviderName": "Zoom",
        "ChargeDescription": "Video Usage",
        "ChargePeriodStart": "2023-01-01",
        "ChargePeriodEnd": "2023-12-31",
        "BilledCost": 100,
        "BillingCurrency": "USD"
    }
]

Example of an invalid JSON file:

[
    {
        "providername": "Zoom",
        "chargedescription": "Video Usage",
        "chargeperiodstart": "2023-01-01",
        "chargeperiodend": "2023-12-31",
        "billedcost": 100,
        "billingcurrency": "USD"
    }
]
   
### Add optional tags 
You can also optionally add any number of tags to CSV or JSON files to allocate costs.

For a CSV file, add a column per tag, and for a JSON file, add a Tags object property.

Example of valid CSV file:
| ProviderName | ChargeDescription | ChargePeriodStart | ChargePeriodEnd | BilledCost | BillingCurrency | team | service |
| Github | User Costs | 2023-01-01 | 2023-01-31 | 300.00 | USD | web | ops |

Example of valid JSON file:
[
    {
        "ProviderName": "Zoom",
        "ChargeDescription": "Video Usage",
        "ChargePeriodStart": "2023-01-01",
        "ChargePeriodEnd": "2023-12-31",
        "BilledCost": 100,
        "BillingCurrency": "USD",
        "Tags": {
            "team": "web",
            "service": "ops"
        }
    }
]

### Configure Cloud Costs
Upload your CSV and JSON files either via [the Cost Files page in the Cloud Costs UI][3] or via API. Cost data should appear after 24 hours. 

To send a JSON file, use the PUT api/v2/cost/custom_costs API endpoint. 

Example with curl:

curl -L -X PUT "api.datadoghq.com/api/v2/cost/custom_costs/" \
-H "Content-Type: multipart/form-data" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-F "file=${file};type=text/json"


## Cost types
You can visualize your ingested data using the following cost types:

| Cost Type | Description |
| ----------| ----------------------------------|
| `custom.cost.amortized` | Total cost of resources accrued over an interval. |
| `custom.cost.basis` | Total cost of resources allocated at the time of usage over an interval. |

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/cloud_cost_management
[2]: https://www.ecma-international.org/publications-and-standards/standards/ecma-404/
[3]: /cost/settings/cost-files
[4]: https://focus.finops.org/#specification
