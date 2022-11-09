---
title: Usage Metering
---
The usage metering API allows you to get hourly, daily, and
monthly usage across multiple facets of Datadog.
This API is available to all Pro and Enterprise customers.
Usage is only accessible for [parent-level organizations](https://docs.datadoghq.com/account_management/multi_organization/).

**Note**: Usage data is delayed by up to 72 hours from when it was incurred.
It is retained for 15 months.

You can retrieve up to 24 hours of hourly usage data for multiple organizations,
and up to two months of hourly usage data for a single organization in one request.

## Get hourly usage for application security

Get hourly usage for application security .
**Note:** hourly usage data for all products is now available in the [Get hourly usage by product family API](https://docs.datadoghq.com/api/latest/usage-metering/#get-hourly-usage-by-product-family)

## Get cost across multi-org account

Get cost across multi-org account.
Cost by org data for a given month becomes available no later than the 16th of the following month.
**Note:** This endpoint has been deprecated. Please use the new endpoint
[`/historical_cost`](https://docs.datadoghq.com/api/latest/usage-metering/#get-historical-cost-across-your-account)
instead.

## Get estimated cost across your account

Get estimated cost across multi-org and single root-org accounts.
Estimated cost data is only available for the current month and previous month.
To access historical costs prior to this, use the `/historical_cost` endpoint.

## Get historical cost across your account

Get historical cost across multi-org and single root-org accounts.
Cost data for a given month becomes available no later than the 16th of the following month.

## Get hourly usage by product family

Get hourly usage by product family.

## Get hourly usage for lambda traced invocations

Get hourly usage for lambda traced invocations.
**Note:** hourly usage data for all products is now available in the [Get hourly usage by product family API](https://docs.datadoghq.com/api/latest/usage-metering/#get-hourly-usage-by-product-family)

## Get hourly usage for observability pipelines

Get hourly usage for observability pipelines.
**Note:** hourly usage data for all products is now available in the [Get hourly usage by product family API](https://docs.datadoghq.com/api/latest/usage-metering/#get-hourly-usage-by-product-family)

