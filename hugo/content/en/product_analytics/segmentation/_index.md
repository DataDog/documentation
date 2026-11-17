---
title: Segments
description: Analyze and understand segments of your user base.
further_reading:
- link: "/product_analytics/"
  tag: "Documentation"
  text: "Product Analytics"
- link: https://learn.datadoghq.com/courses/getting-started-product-analytics
  tag: Learning Center
  text: Getting Started with Product Analytics
- link: "https://www.datadoghq.com/blog/product-analytics-account-segments/"
  tag: "Blog"
  text: "Investigate account-level churn risk with Product Analytics account segments"
---

## Overview

Segmenting helps you focus on specific groups of users or accounts based on characteristics or behaviors. This allows you to uncover insights, identify trends, and make data-driven decisions about your product.

For example, you can segment users by purchase amount, by activity within a specific country, or by trial status. You can also segment accounts by attributes like annual recurring revenue (ARR) or start date.

After creating a segment, you can reuse it across charts and dashboards to compare how different groups behave.

## Build a segment

To create a segment:

1. Navigate to [{{< ui >}}Digital Experience Monitoring{{</ ui >}} > {{< ui >}}Product Analytics{{</ ui >}} > {{< ui >}}Users{{</ ui >}} > {{< ui >}}Segments{{</ ui >}}][1] and click {{< ui >}}Create Segment{{< /ui >}}.
1. Replace {{< ui >}}New Segment{{< /ui >}} with a name for the segment. Optionally, click {{< ui >}}Add a description{{< /ui >}}.
1. Next to {{< ui >}}Show{{< /ui >}}, use the toggle to choose the type of profiles to include in the segment:
   - {{< ui >}}Users{{< /ui >}}: Create a segment of individual users.
   - {{< ui >}}Accounts{{< /ui >}}: Create a segment of accounts (organizations). See the [Account segments](#segment-accounts) section.

   <div class="alert alert-info">A segment returns either user or account profiles, not both.</div>

1. Add one or more filters:
   - {{< ui >}}Add Property{{< /ui >}}: Match users or accounts by attribute, such as email, last seen, or any custom attributes you've imported. See the [Filter by properties and events](#segment-pana) section.
   - {{< ui >}}Add Event{{< /ui >}}: Match users or accounts by what they did over the time frame you choose. Use a single event, or a multistep funnel that users converted through or dropped off from. See [Filter by properties and events](#segment-pana).
   - {{< ui >}}Import CSV{{< /ui >}}: Match a list you already have by uploading a CSV file of IDs to include or exclude. See the [Import a CSV file](#segment-csv) section.

   Filters combine with AND. To exclude matches instead, change any filter's operator, such as **did** to **did not**.

   {{< img src="product_analytics/segmentation/segment_editor.png" alt="The Create Segment page with a segment name field, a Show setting, and buttons to add a property, an event, or a CSV import." style="width:100%;">}}

1. Click {{< ui >}}Save Segment{{< /ui >}}.

{{% collapse-content title="Filter by properties and events" level="h3" expanded=false id="segment-pana" %}}

Combine property and event filters to focus on the users you care about:

- **Property filters** match users by attribute, such as country, plan, or signup date, including any custom attributes you've imported. For example, `have the property plan is premium`. To import custom attributes, see [User and Account Profiles][3].
- **Event filters** match users by what they did over a time frame you choose. Use a single event, or click {{< ui >}}Add step{{< /ui >}} to build a multi-step funnel that users converted through or dropped off from. For example, `did convert after Sign up → Start trial`. To narrow an event by its attributes, such as country or device type, click {{< ui >}}Add filter{{< /ui >}}.

As you add filters, the {{< ui >}}Dynamic segment{{< /ui >}} preview lists the users who match.

For example, to segment users in Brazil who clicked the **In Stock** button in the past three months:

1. Click {{< ui >}}Add Event{{< /ui >}} and select the `"In Stock" Clicked` action.
1. Set the time frame to {{< ui >}}Past 3 Months{{< /ui >}}.
1. Click {{< ui >}}Add filter{{< /ui >}} and filter by `Country is Brazil`.

{{< img src="product_analytics/segmentation/pana_example_checkout_brazil.png" alt="A segment of users in Brazil who clicked In Stock in the past three months, with a preview of matching users." style="width:100%;">}}

#### Example: Find users who left before buying

To find mobile users who viewed their cart but didn't check out:

1. Click {{< ui >}}Add Event{{< /ui >}} and select the `Cart` view.
1. Click {{< ui >}}Add step{{< /ui >}}, choose {{< ui >}}then did not{{< /ui >}}, and select the `Checkout Button Clicked` action.
1. Set the time frame, such as within **1 Day**, anytime in the {{< ui >}}Past 1 Day{{< /ui >}}.
1. Click {{< ui >}}Add Property{{< /ui >}} and filter by `Last Device Type is Mobile`.

{{< img src="product_analytics/segmentation/user_profile_example_3.png" alt="A segment of mobile users who viewed Cart but didn't click checkout within one day, with a preview of matching users." style="width:100%">}}

You can also start from the [{{< ui >}}User Profiles{{< /ui >}}][2] page. Filter your users, then click {{< ui >}}Create Segment{{< /ui >}}. The segment editor opens with your filters already applied.

{{% /collapse-content %}}

{{% collapse-content title="Import a CSV file" level="h3" expanded=false id="segment-csv" %}}

If you have a list of users from a survey, experiment, or CRM, upload it as a CSV file to turn it into a segment.

To create a segment from your own file:

1. Click {{< ui >}}Import CSV{{< /ui >}} and upload your CSV file.
1. Next to {{< ui >}}column{{< /ui >}}, select the column in your file that holds user IDs or emails, such as `id`.
1. Next to {{< ui >}}with{{< /ui >}}, select the Product Analytics attribute to match, such as {{< ui >}}User Id (@usr.id){{< /ui >}}.
1. To exclude the users in the file instead, click {{< ui >}}matching{{< /ui >}} and select {{< ui >}}not matching{{< /ui >}} the filter into an exclusion.

The file needs a column with user IDs or user emails that match the `usr.id` or `usr.email` attribute in Product Analytics.

{{< img src="product_analytics/segmentation/segment_link_csv_1.png" alt="A CSV import filter that reads: who are matching column id from segment-test-users.csv with User Id (@usr.id). The filter is highlighted." style="width:100%">}}

{{% /collapse-content %}}

{{% collapse-content title="Account segments" level="h3" expanded=false id="segment-accounts" %}}

Account segments group accounts, such as organizations or companies, based on their attributes or the events their users performed. Use them to analyze groups such as accounts with ARR over a specific amount or accounts that adopted a specific feature.

To create an account segment:

1. Next to {{< ui >}}Show{{< /ui >}}, switch the toggle from {{< ui >}}Users{{< /ui >}} to {{< ui >}}Accounts{{< /ui >}}.
1. Add one or more filters:
   - {{< ui >}}Add Property{{< /ui >}}: Filter by account properties such as ARR, start date, account IDs, or any imported account attributes. To import custom attributes, see [User and Account Profiles][3].
   - {{< ui >}}Add Event{{< /ui >}}: Include accounts where at least one user performed the specified event.
   - {{< ui >}}Import CSV{{< /ui >}}: Upload a CSV file with a column of account IDs. The IDs map to the account ID attribute in Product Analytics.
1. Click {{< ui >}}Save Segment{{< /ui >}}.

{{% /collapse-content %}}

## Use segments across Product Analytics

You can filter any Product Analytics view by a segment, including Pathways, Analytics Explorer, Funnels, and Retention.

To filter a view by a segment:
1. Click {{< ui >}}Add filter{{< /ui >}}.
2. Select the {{< ui >}}Segments{{< /ui >}} tab, and choose a segment. If a segment isn't listed, click {{< ui >}}Create new segment{{< /ui >}}.

{{< img src="product_analytics/segmentation/segments_from_pana.png" alt="The Add filter menu open on a Product Analytics page, with the Segments tab highlighted and a list of saved segments to choose from." style="width:80%;">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/segments
[2]: https://app.datadoghq.com/product-analytics/profiles
[3]: /product_analytics/profiles
