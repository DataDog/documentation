---
title: Migrating from V1 to V2 of the Usage Attribution API
kind: guide
further_reading:
- link: "/account_management/plan_and_usage/"
  tag: "Documentation"
  text: "Plan and Usage Settings"
---

## Summary

This guide provides instructions for migrating from the v1 usage attribution APIs to the v2 APIs. The v1 APIs are
deprecated, and there are two types: The monthly
API ([Get usage attribution][1]), and the file
based APIs ([Get the list of available daily custom reports][2], [Get specified daily custom reports][3],
[Get the list of available monthly custom reports][4], and
[Get specified monthly custom reports][5]). To use this guide, find the section below for the v1 APIs you are currently using, and follow the instructions to migrate to the corresponding v2 APIs.

## Monthly API

### [Get usage attribution][6]

This API provides monthly usage attribution.

The v2 monthly usage attribution API [Get monthly usage attribution][7] also provides monthly usage attribution and supports querying by combinations of tags.

See the sections below for the differences between the v1 and v2 API, and recommendations for migrating to the v2 API.

#### Pagination

In the v1 API, pagination is configured through the query parameters `offset` and `limit`. The value in
`metadata.pagination.total_number_of_records` provides the total number of records in all pages.

In the v2 API, pagination is configured through the `next_record_id` query parameter. The starting value for the next page is
returned in `metadata.pagination.next_record_id`. There is no total number of records in the response.

To migrate to the v2 API, use the `next_record_id` to advance through pages as described on the API documentation page.

#### Tag Breakdown

In the v1 API, the usage data is broken down for each tag separately in the same response. This leads to seemingly duplicate data, in which the same resource is counted by multiple tags such as `a`, `b`, and `c` separately.

In the v2 API, you can select the tag breakdown by supplying a tag configuration in the `tag_breakdown_keys`
parameter. You can specify one tag at a time or multiple tags as a comma separated list. Supplying multiple tags will
return usage broken down by the combination of those tags.

In order to migrate to the v2 API, specify the tags to use in the `tag_breakdown_keys` parameter. To get
the same breakdowns as the v1 API, make separate requests for each tag on its own.

#### Aggregates

In the v1 API, the `aggregates` section contains sums all possible records, resulting in three times the real totals
because data is triplicated across three different tags. Example:

```json
{
  "field": "infra_host_usage",
  "value": 293880,
  "agg_type": "sum"
},
```

In the v2 API, the `aggregates` section contains sums only the records for the tag combination used. Example:

```
{
"field": "infra_host_usage",
"value": 97960,
"agg_type": "sum"
},
```

In order to migrate to the v2 API, use the aggregates in the v2 API as those numbers represent the total usage for the
organization for the months requested.

#### Decimal Values

In the v1 API, some usage is returned with decimal precision. Example:
`"cws_containers_usage": 1105642.92`

In the v2 API, usage is returned with integer precision. Example:
`"cws_containers_usage": 1105643`

It is not possible to convert from the integer values to the decimal values, but the integer values will be the rounded
values of the decimal values.

#### Product families

In the v1 API, usage for serverless monitoring is under:

* `lambda_functions_usage`
* `lambda_functions_percentage`
* `lambda_invocations_usage`
* `lambda_invocations_percentage`

In the v2 API, usage for serverless monitoring is under:

* `functions_usage`
* `functions_percentage`
* `invocations_usage`
* `invocations_percentage`

These usage types represent the same product usage. The difference is just a simple field renaming.

## File Based APIs

This set of APIs provide links to download zip files of the usage attribution data in daily and monthly granularity.

### [Get the list of available daily custom reports](https://docs.datadoghq.com/api/latest/usage-metering/#get-the-list-of-available-daily-custom-reports)

This API produces a list of available downloads. Since the file downloads are deprecated there is no replacement for
this API.

### [Get specified daily custom reports](https://docs.datadoghq.com/api/latest/usage-metering/#get-specified-daily-custom-reports)

This API returns a link to download a zip file of the usage attribution data for all products for a given day. The zip
file contains a tsv file for each product.

The [Get hourly usage attribution](https://docs.datadoghq.com/api/latest/usage-metering/#get-hourly-usage-attribution)
API provides this same data.

See the below sections for differences between the two APIs and recommendations for migrating to the new API.

#### Response format

In the v1 API, the response contains a link to a zip file that contains a tsv file per product.

In the v2 API, the response returns the usage attribution data in json format.

In order to migrate to the v2 API, your processes should handle the data in json format. You can apply transformations
as needed to the json data in order to get it into the format that best suits your needs.

#### Tag breakdown

In the v1 API, usage data is broken down by all chosen tags.

In the v2 API, you can select the tag breakdown by supplying a tag configuration in `tag_breakdown_keys` as a comma
separated list.

In order to migrate to the v2 API, specify all chosen tags in the `tag_breakdown_keys` query parameter.

#### Tag keys

In the v1 API, chosen tag keys are presented as headers in the tsv file. Example:

```
public_id       formatted_timestamp     env     service total_usage
abc123          2022-01-01 00:00:00     prod    web     100
...
```

In the v2 API, chosen tags are keys in the tags object of each item in the usage array of the response. Example:

```
...
  "tags": {
    "service": [
      "web"
    ],
    "env": [
      "prod"
    ]
  },
...
```

In order to migrate to the v2 API, retrieve from the tags object on each row of the response.

#### Tag values

In the v1 API, if a resource is tagged with the same tag multiple times that will show as a pipe (`|`) separated string
in the column of the tag.

Example:

```
public_id       formatted_timestamp     env     service               total_usage
abc123          2022-01-01 00:00:00     prod    authentication|web    100
...
```

In the v2 API, the value corresponding to each tag key in the tags object is an array. If a resource is tagged with the
same tag multiple times there will be multiple items in this list.

Example:

```
...
  "tags": {
    "service": [
      "authentication",
      "web"
    ],
    "env": [
      "prod"
    ]
  },
...
```

In order to migrate to the v2 API, your processes should handle resources with the same tag applied multiple times.
Tag values in the v2 response array will appear in the same order as they appear in the pipe separated string in the v1
response, so you can join the array with pipe characters to produce the same tag values as the v1 response.

#### Total usage

In the v1 API, the total usage is called `total_usage` in the csv header.

In the v2 API, the total usage is called `total_usage_sum` as a key in each object in the usage array.

In order to migrate to the v2 API, use the key `total_usage_sum` to extract the usage value.

#### Total usage data type

In the v1 API, while total usage is always a number, csv has no way to specify data types.

In the v2 API, total usage is an integer.

In order to migrate to the v2 API, handle the total usage as an integer.

#### Time format

In the v1 API, time is formatted `YYYY-MM-DD hh:mm:ss`.

In the v2 API, time is formatted `YYYY-MM-DDThh`.

Data in the v1 format always has values 0 for minute and second (the data is hourly). The data in the new format can be
parsed and treated as equivalent to the parsed time of the old format.

#### Handling of child orgs

In the v1 API, the file only contains data for the tag configuration set on the parent org. This includes any child orgs
of the parent because tag configurations are also applied to child orgs.

In the v2 API, if the parameter `include_descendants=true` is supplied (this is the default) then the response will
contain data for the parent org and all children of the parent. This will include all data from tag configurations
inherited from the parent org to the child orgs, but will also include any tag configurations set directly on those
children. The origin of a given tag configuration can be discerned from the `tag_config_source` field.

In order to migrate to the v2 API, pass the `include_descendants=true` parameter. To get the same values as the v1
response, filter out any records in the response that do not match the `tag_config_source` of the tag configuration
from the parent org.

#### Data range

In the v1 API, data is returned for one day at a time. The date is specified in the `record_id` parameter of the
request.

In the v2 API, you can retrieve data for arbitrary time bounds up to 24 hours at a time using the `start_hr`
and `end_hr` parameters.

In order to migrate to the v2 API, request data with `start_hr` as midnight (00 hour) on the desired day
and `end_hr` as midnight on the next day.

#### Pagination

In the v1 API, the data is not paginated. This can result in very large files.

In the v2 API, the data is paginated. If a response takes up more than one page, the id for fetching the next page is
provided in the field `metadata.pagination.next_record_id`. This can be supplied in the query parameter `next_record_id`
to retrieve the next page.

In order to migrate to the v2 API, retrieve all pages for the given day.

#### Data cardinality

In the v1 API, data is broken down by all three tags.

In the v2 API, data is broken down as specified in the query parameter `tag_breakdown_keys`.

In order to migrate to the v2 API, supply all chosen tags in the parameter `tag_breakdown_keys`.

#### Usage type names

In the v1 API, files are named `daily_<product>_<date>.tsv`

In the v2 API, usage types always have the `_usage` suffix.

In order to migrate to the v2 API, handle the `_usage` suffix to all usage types.

#### Usage type renames

The v1 API contains files for:

* `apm`
* `infra`
* `lambda_invocations`
* `lambda_functions`
* `profiled_containers`
* `npm`
* `profiled_hosts`

In the v2 API, the usage types matching those are:

* `apm_host_usage`
* `infra_host_usage`
* `invocations_usage`
* `functions_usage`
* `profiled_container_usage`
* `npm_host_usage`
* `profiled_host_usage`

In order to migrate to the v2 API, map specified usage types to the new names.

#### Timeseries usage type

In the v1 API, the timeseries file contains usage for both standard and custom timeseries.

In the v2 API, there is one `custom_timeseries_usage` usage type.

Datadog only bills for custom timeseries usage, so standard timeseries usage is not needed.

#### Synthetics usage type

In the v1 API, the synthetics file contains usage for both API and browser tests.

In the v2 API, there are two synthetics usage types api_usage and browser_usage.

In order to migrate to the v2 API, use the new usage types for retrieving synthetics usage.

### [Get the list of available monthly custom reports](https://docs.datadoghq.com/api/latest/usage-metering/#get-the-list-of-available-monthly-custom-reports)

This API produces a list of available downloads. Since the file downloads are deprecated there is no replacement for
this API.

### [Get specified monthly custom reports](https://docs.datadoghq.com/api/latest/usage-metering/#get-specified-monthly-custom-reports)

This API returns a link to download a zip file of the usage attribution data for all products for a given month. The zip
file contains a tsv file for each product as well as a summary file for each tag. The approaches to replicate each of
those two different types of files are described below.

### Hourly data by product files

The hourly data files are named in the format `monthly_<product>_<date>.tsv`. Each product file is a concatenated
version of the daily zip files available
from [Get specified daily custom reports](https://docs.datadoghq.com/api/latest/usage-metering/#get-specified-daily-custom-reports)
.

The [Get hourly usage attribution](https://docs.datadoghq.com/api/latest/usage-metering/#get-hourly-usage-attribution)
API provides this same data.

Because the hourly data files are very similar to files available
from [Get specified daily custom reports](https://docs.datadoghq.com/api/latest/usage-metering/#get-specified-daily-custom-reports)
, you can follow that guide, except for the recommendation for time ranges. To migrate from the v1 monthly files,
request all pages for each day in the month. Requests are limited to 24 hours at a time in the v2 API.

### Monthly summary by tag files

The monthly summary files are named in the format `summary_<tag>_<date>.tsv`. They provide a rollup for all usage across
the month for each tag. The [Get monthly usage attribution](https://docs.datadoghq.com/api/latest/usage-metering/#get-monthly-usage-attribution)
API provides this same data.

See the below sections for differences between the two APIs and recommendations for migrating to the new API.

#### Response format

The v1 API response contains a link to a zip file, which contains a tsv file for each chosen tag.

The v2 API response returns the usage attribution data in json format.

In order to migrate to the v2 API, your processes should handle the data in json format. You can apply transformations
as needed to the json data in order to get it into the format that best suits your needs.

#### Tag breakdown

In the v1 API, there is a separate tsv file for each chosen tag.

In the v2 API, you can select the tag breakdown by supplying a tag configuration in `tag_breakdown_keys` as a comma
separated list.

In order to migrate to the v2 API, make requests with each tag specified on its own in `tag_breakdown_keys`.

#### Tag values

In the v1 API, if a resource is tagged with the same tag multiple times that will show as a pipe (`|`) separated string
in the column of the tag.

Example:

```
month   public_id       team        infra_host_usage ....
2022-01 abc123          billing|sre 100
...
```

In the v2 API, the value corresponding to each tag key in the tags object is an array. If a resource is tagged with the
same tag multiple times there will be multiple items in this list.

Example:

```
...
  "tags": {
    "team": [
      "billing",
      "sre"
    ]
  },
...
```

In order to migrate to the v2 API, your processes should handle resources with the same tag applied multiple times.
Tag values in the v2 response array will appear in the same order as they appear in the pipe separated string in the v1
response, so you can join the array with pipe characters to produce the same tag values as the v1 response.

#### Total usage

In the v1 API, the second row of the file contains aggregated usage for all tags.

In the v2 API, the `metadata.aggregates` section of the response contains aggregated usage for all tags.

In order to migrate to the v2 API, retrieve total usage from the `metadata.aggregates` section.

#### Usage data type

In the v1 API, some usage is returned with decimal precision. Example:

```
... container_usage ...
... 55.4            ...
...
```

In the v2 API, usage is returned with integer precision. Example:
`"container_usage": 55`

It is not possible to convert from the integer values to the decimal values, but the integer values will be the rounded
values of the decimal values.

#### Handling of child orgs

In the v1 API, the file only contains data for the tag configuration set on the parent org. This includes any child orgs
of the parent because tag configurations are also applied to child orgs.

In the v2 API, if the parameter `include_descendants=true` is supplied (this is the default) then the response will
contain data for the parent org and all children of the parent. This will include all data from tag configurations
inherited from the parent org to the child orgs, but will also include any tag configurations set directly on those
children. The origin of a given tag configuration can be discerned from the `tag_config_source` field.

In the v2 API, if the parameter `include_descendants=true` is supplied (this is the default) then the response will
contain data for the parent org and all children of the parent. This will include all data from tag configurations
inherited from the parent org to the child orgs, but will also include any tag configurations set directly on those

#### Serverless Monitoring Usage

In the v1 API, usage for serverless monitoring is under the names:

* `lambda_functions_usage`
* `lambda_functions_percentage`
* `lambda_invocations_usage`
* `lambda_invocations_percentage`

In the v2 API, usage for serverless monitoring is under the names:

* `functions_usage`
* `functions_percentage`
* `invocations_usage`
* `invocations_percentage`

In order to migrate to the v2 API, look for serverless monitoring usage under these new field names. These
fields represent the same product usage. The difference is just a field renaming.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/
[2]: /agent/docker/
[3]: /agent/basic_agent_usage/windows/
