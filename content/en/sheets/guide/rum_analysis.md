---
title: Analyze RUM Sessions Using Sheets
description: "Enrich RUM session data with Reference Tables and analyze premium user error impact using lookups and pivot tables in Sheets."
further_reading:
- link: "/sheets/"
  tag: "Documentation"
  text: "Learn more about Datadog Sheets"
- link: "/integrations/guide/reference-tables/?tab=manualupload"
  tag: "Documentation"
  text: "Add Custom Metadata with Reference Tables"
---

## Overview

Datadog Sheets is a spreadsheet tool that that you can populate with Datadog data and analyze without requiring technical expertise. This guide provides a walkthrough for analyzing Real User Monitoring (RUM) sessions using Sheets. This guide explains how to:

- Create and manipulate tables within Sheets.
- Enrich your RUM session data with additional metadata using Reference Tables.
- Perform detailed analysis to identify high-error sessions and understand their impact on premium users.

## Creating a table in Sheets

To start your analysis, create a table of RUM sessions in Datadog Sheets:

1. Start from the RUM Sessions Explorer.
1. Build a query to filter sessions with specific characteristics. For instance, to focus on user sessions that have encountered two or more errors, use the following query:
     ```
     @session.error.count:>=2 @session.type:user
     ```
     {{< img src="/sheets/guide/rum_analysis/rum_explorer_open_in_sheets.png" alt="RUM Sessions Explorer showing a query filtering for sessions with 2 or more errors and user session type" style="width:100%;" >}}
1. Click on **Open in Sheets** to create a new table with your filtered RUM sessions data.

## Uploading data to Reference Tables

To enrich your RUM sessions data with additional metadata, such as identifying premium users or associating users with specific teams, use Reference Tables. Upload external data with the following steps:

1. Prepare a CSV file containing additional metadata. For example, your file might include columns for user IDs, premium status, and team information.
1. Navigate to [Reference Tables][1] and click **New Reference Table +**.
1. Upload the CSV file and define the primary key for the table.

For more information, see the [Reference Tables][2] documentation.

## Enriching RUM data with lookups

1. In your Sheets interface, click **Add Lookup** at the top of the page.
1. Select the Reference Table you uploaded and specify the common column, such as User ID, to match records.
1. The Lookup function adds the relevant metadata from the Reference Table to your RUM sessions table.

## Using pivot tables for analysis

Pivot tables help you summarize and organize large datasets to find patterns and trends.

1. From an existing spreadsheet that already has a table of data, click **Add Pivot Table**.
2. In the **Rows** section, select the dimensions you want to analyze, such as the User name.
3. In the **Calculations** section, choose the dimensions for calculations, like sum, average, count, min, and max.

## Example use case: Analyzing premium user errors

You have a web application and want to understand how errors are impacting your application's premium users. Follow these steps to analyze RUM sessions, enrich your data with additional user information, and gain insights into how your premium users are impacted by errors. Use sheets to help you make data-driven decisions to improve user experience and address issues more effectively.


### Filter RUM Sessions
1. Start from the [RUM Sessions Explorer][3] and build a query to filter sessions with two or more errors. For example:

     ```
     @session.error.count:>=2 @session.type:user
     ```
1. Click **Open in Sheets** to create a table with the filtered sessions.

### Enrich Data
1. [Upload a CSV file to a Reference Table](#uploading-data-to-reference-tables) with additional user metadata (such as premium status or team).
1. Use the `Lookup` function in Sheets to add the user metadata about premium status to your RUM sessions table.
   {{< img src="/sheets/guide/rum_analysis/lookup_function.png" alt="Configure a Lookup with the external dataset and the additional metadata you want to pull from that dataset"style="width:100%;" >}}

### Analyze with Pivot Tables
1. Create a pivot table to count the number of errors per premium user.
1. Summarize the data to understand the distribution of errors among premium and non-premium users.
   {{< img src="/sheets/guide/rum_analysis/add_lookup_pivot_table.mp4" alt="Walkthrough of how to add a Lookup and create a pivot table in Sheets" video=true >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/reference-tables?order=desc&p=1&sort=updated_at
[2]: https://docs.datadoghq.com/integrations/guide/reference-tables/?tab=manualupload
[3]: https://app.datadoghq.com/rum/sessions
