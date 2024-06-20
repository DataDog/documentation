---
title: Custom Costs
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
Custom Cost is in public beta.
{{< /beta-callout >}}

## Overview

Custom Costs allow you to upload *any cost data source* to Datadog, so that you can understand the total cost of your services.

Custom Costs accepts costs in pre-defined file structures (CSV or JSON). These files are aligned with the [FinOps FOCUS specification][2], and you can [upload multiple files in either format](#create-a-csv-or-json-file-with-required-fields). For example, you can upload a mix of CSV or JSON files as desired with 1+ line items (rows for CSV or objects for JSON).

All line items must meet the following requirements and include the [properties below](#collect-the-required-fields):

- All column names (CSV), property names (JSON), and values are UTF-8 encoded.
- All required column names (CSV) or property names (JSON) are [PascalCased][5]. For example, you must use `"ProviderName"`, not `"providername"` or `"ProviderNAME"`.
- All column names (CSV) and values or property names (JSON) and values have a maximum of 1,000 characters.
- NULL or blank ("") parameter values are not accepted.

Additionally, all dates are transformed into UTC timestamps. For example, "2024-01-01" becomes "2024-01-01 00:00:00".

## Setup

To use Custom Costs in Datadog, you must [configure Cloud Cost Management][1] for either AWS, Azure, or Google Cloud.

### Collect the required fields

| Parameter | Description | Valid example | Invalid example | Additional Requirements |
| ----------| -----------|----------| -----------|----------|
|`ProviderName` | The service being consumed. | Snowflake | "" or NULL|  |
|`ChargeDescription` | Identifies what aspect of a service is being charged. | Database Costs | "" or NULL|  |
|`ChargePeriodStart`| Start day of a charge. | 2023-09-01| 2023-01-01 12:34:56| Formatted YYYY-MM-DD, where `ChargePeriodStart` <= `ChargePeriodEnd`.|
|`ChargePeriodEnd` | Last day of a charge (inclusive).  | 2023-09-30 | 01/01/2023 | Formatted YYYY-MM-DD. |
|`BilledCost`| The amount being charged. |10.00 |NaN | Number-based decimal. |
|`BillingCurrency` | Currency of billed cost. | USD| EUR | Must be USD. |

### Create a CSV or JSON file with required fields

You can upload multiple CSV and JSON files, in either or both formats. Ensure that you don't upload the same file twice, since the cost will appear as doubled in the product.

{{< tabs >}}
{{% tab "CSV" %}}

The required fields must appear as columns in your CSV in the order listed above. You need to use a comma (`,`) as a separator for your CSV.

Example of a valid CSV:

<table>
    <thead>
        <tr>
            <th style="text-align:center;text-transform:none;">ProviderName</th>
            <th style="text-align:center;text-transform:none;">ChargeDescription</th>
            <th style="text-align:center;text-transform:none;">ChargePeriodStart</th>
            <th style="text-align:center;text-transform:none;">ChargePeriodEnd</th>
            <th style="text-align:center;text-transform:none;">BilledCost</th>
            <th style="text-align:center;text-transform:none;">BillingCurrency</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align:center;text-transform:none;">GitHub</td>
            <td style="text-align:center;text-transform:none;">User Costs</td>
            <td style="text-align:center;text-transform:none;">2023-01-01</td>
            <td style="text-align:center;text-transform:none;">2023-01-31</td>
            <td style="text-align:center;text-transform:none;">300.00</td>
            <td style="text-align:center;text-transform:none;">USD</td>
        </tr>
    </tbody>
</table>


Example of an invalid CSV (`ChargePeriodStart` is listed before `ChargeDescription`):

<table>
    <thead>
        <tr>
            <th style="text-align:center;text-transform:none;">ProviderName</th>
            <th style="text-align:center;text-transform:none;">ChargePeriodStart</th>
            <th style="text-align:center;text-transform:none;">ChargeDescription</th>
            <th style="text-align:center;text-transform:none;">ChargePeriodEnd</th>
            <th style="text-align:center;text-transform:none;">BilledCost</th>
            <th style="text-align:center;text-transform:none;">BillingCurrency</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align:center;text-transform:none;">GitHub</td>
            <td style="text-align:center;text-transform:none;">2023-01-01</td>
            <td style="text-align:center;text-transform:none;">User Costs</td>
            <td style="text-align:center;text-transform:none;">2023-01-31</td>
            <td style="text-align:center;text-transform:none;">300.00</td>
            <td style="text-align:center;text-transform:none;">USD</td>
        </tr>
    </tbody>
</table>


{{% /tab %}}
{{% tab "JSON" %}}

The required fields must appear within all objects of a JSON file adhering to the [ECMA-404 standard][101] and all objects must be encapsulated by an array.

Example of a valid JSON file:

```json
[
    {
        "ProviderName": "Zoom",
        "ChargeDescription": "Video Usage",
        "ChargePeriodStart": "2023-01-01",
        "ChargePeriodEnd": "2023-12-31",
        "BilledCost": 100.00,
        "BillingCurrency": "USD"
    }
]
```

Example of an invalid JSON file:

```json
[
    {
        "providername": "Zoom",
        "chargedescription": "Video Usage",
        "chargeperiodstart": "2023-01-01",
        "chargeperiodend": "2023-12-31",
        "billedcost": 100.00,
        "billingcurrency": "USD"
    }
]
```

[101]: https://www.ecma-international.org/publications-and-standards/standards/ecma-404/

{{% /tab %}}
{{< /tabs >}}

### Add optional tags

You can optionally add any number of tags to CSV or JSON files to allocate costs *after* the required fields as additional columns.

{{< tabs >}}
{{% tab "CSV" %}}

For a CSV file, add a column per tag.

Example of a valid CSV file:

<table>
    <thead>
        <tr>
            <th style="text-align:center;text-transform:none;">ProviderName</th>
            <th style="text-align:center;text-transform:none;">ChargePeriodStart</th>
            <th style="text-align:center;text-transform:none;">ChargeDescription</th>
            <th style="text-align:center;text-transform:none;">ChargePeriodEnd</th>
            <th style="text-align:center;text-transform:none;">BilledCost</th>
            <th style="text-align:center;text-transform:none;">BillingCurrency</th>
            <th style="text-align:center;text-transform:none;">team</th>
            <th style="text-align:center;text-transform:none;">service</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align:center;text-transform:none;">GitHub</td>
            <td style="text-align:center;text-transform:none;">2023-01-01</td>
            <td style="text-align:center;text-transform:none;">User Costs</td>
            <td style="text-align:center;text-transform:none;">2023-01-31</td>
            <td style="text-align:center;text-transform:none;">300.00</td>
            <td style="text-align:center;text-transform:none;">USD</td>
            <td style="text-align:center;text-transform:none;">web</td>
            <td style="text-align:center;text-transform:none;">ops</td>
        </tr>
    </tbody>
</table>

</br>

In this example, the `team` and `service` columns are added after the `BillingCurrency` column, and appears as tags on this cost.

{{% /tab %}}
{{% tab "JSON" %}}

For a JSON file, add a `Tags` object property to encapsulate any desired tags associated to this cost.

Example of a valid JSON file:

```json
[
    {
        "ProviderName": "Zoom",
        "ChargeDescription": "Video Usage",
        "ChargePeriodStart": "2023-01-01",
        "ChargePeriodEnd": "2023-12-31",
        "BilledCost": 100.00,
        "BillingCurrency": "USD",
        "Tags": {
            "team": "web",
            "service": "ops"
        }
    }
]
```

In this example, an additional `Tags` object property has been added with two key-value pairs to allocate `team` and `service` tags to this cost.

{{% /tab %}}
{{< /tabs >}}

### Configure Custom Costs

After your data is formatted to the requirements above, upload your CSV and JSON files to Cloud Cost Management on [the **Custom Costs Uploaded Files** page][3] or programmatically by using the API.

{{< tabs >}}
{{% tab "UI" %}}

Navigate to [**Infrastructure > Cloud Costs > Settings > Cost Files**][101]. Select **Cost Files** from the Settings dropdown.

{{< img src="cloud_cost/upload_file.png" alt="Upload a CSV or JSON file to Datadog" style="width:80%" >}}

[101]: https://app.datadoghq.com/cost/settings/cost-files

{{% /tab %}}
{{% tab "API (file)" %}}

To send a file, use the `PUT api/v2/cost/custom_costs` API endpoint.

Example with cURL:

```curl
curl -L -X PUT "api.datadoghq.com/api/v2/cost/custom_costs/" \
-H "Content-Type: multipart/form-data" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-F "file=${file};type=text/json"
```
{{% /tab %}}
{{% tab "API (request)" %}}

Use the `PUT api/v2/cost/custom_costs` endpoint to send the content of the file with the API .

```curl
curl -L -X PUT "api.datadoghq.com/api/v2/cost/custom_costs/" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d '${file_content}'
```
{{% /tab %}}
{{< /tabs >}}

Cost data appears after 24 hours.

## Cost metric types

You can visualize your ingested data using the following cost types:

| Cost Type | Description |
| ----------| ----------------------------------|
| `custom.cost.amortized` | Total cost of resources accrued over an interval. |
| `custom.cost.basis` | Total cost of resources allocated at the time of usage over an interval. |

All costs submitted to Custom Costs appear in these metrics. For example, if a $4 purchase was made on September 1, over the September 1-4 period, the following costs are attributed to each metric:

| Days | `custom.cost.basis` | `custom.cost.amortized` |
|---|---|---|
| September 1 | $4 | $1 |
| September 2 | - | $1 |
| September 3 | - | $1 |
| September 4 | - | $1 |

## Use Custom Costs data

You can view custom costs data on the [**Cloud Costs Analytics** page][6], the [Cloud Costs Tag Explorer][7], and in [dashboards][8], [notebooks][9], or [monitors][10]. You can also combine Custom Cost metrics with other cloud cost metrics or observability metrics.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/cloud_cost_management
[2]: https://focus.finops.org/#specification
[3]: https://app.datadoghq.com/cost/settings/cost-files
[4]: https://www.ecma-international.org/publications-and-standards/standards/ecma-404/
[5]: https://en.wiktionary.org/wiki/Pascal_case
[6]: https://app.datadoghq.com/cost/analytics
[7]: https://app.datadoghq.com/cost/tags?cloud=custom
[8]: /dashboards
[9]: /notebooks
[10]: /monitors/types/cloud_cost/
