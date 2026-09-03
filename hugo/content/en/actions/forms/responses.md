---
title: Form responses
description: View, analyze, and manage form responses using Datadog Sheets, dashboards, and response settings.
further_reading:
  - link: /actions/forms/
    tag: Documentation
    text: Forms
---

## Overview

{{< img src="/actions/forms/forms_responses.png" alt="Example of viewing form responses in Datadog" style="width:100%;" >}}

After respondents submit a form, Datadog automatically stores their answers and makes them available for review, analysis, and visualization. You can view raw responses in a table, get AI-generated summaries and visual analytics by question type, or query response data in a dashboard.

## View responses

To view form responses, from the [Forms][1] page, click a form, then click {{< ui >}}Responses{{< /ui >}}.

Each component displays a corresponding response analysis block, which may include an AI-generated summary, raw individual responses, and visual analytics that vary by component type (for example, bar charts for dropdowns and checkboxes, distribution charts for ratings).

**Note**: Datadog stores responses in [Datastores][2].

## Open in Datadog Sheets

You can open form responses in Datadog Sheets to filter, sort, and analyze them in a spreadsheet view. To open responses in Sheets:
1. From the [Forms][1] page, click a form.
1. Click {{< ui >}}Responses{{< /ui >}}.
1. Click {{< ui >}}Open in Sheets{{< /ui >}}.

## View in a dashboard

To visualize form responses in a dashboard:
1. Navigate to the [DDSQL Editor][3].
1. In the {{< ui >}}Data{{< /ui >}} tab, click {{< ui >}}Actions Datastores{{< /ui >}}.
1. Select the datastore associated with your form, then click {{< ui >}}Insert into editor{{< /ui >}}.
1. Optionally, click the query's title to rename it.
1. Click {{< ui >}}Save{{< /ui >}}.
1. [Create a dashboard][4], then [add a widget][5]. All widgets except Timeseries are supported for forms.
1. When [defining the metric][6], select {{< ui >}}DDSQL Editor{{< /ui >}} and the datastore query you created earlier.
1. Finish [configuring your widget][7], then click {{< ui >}}Save{{< /ui >}}.

## Response settings

To configure response settings, in the {{< ui >}}Fields{{< /ui >}} panel, click the gear <i class="icon-cog-2"></i> icon and select an option:

| Setting | Description |
|---------|-------------|
| Accepting Responses | Toggle to enable or disable response collection. You can also set an end date to automatically stop accepting responses on a specific date. |
| Anonymous Responses | When enabled, respondent emails are not stored. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/forms
[2]: https://app.datadoghq.com/actions/datastores
[3]: https://app.datadoghq.com/ddsql/editor
[4]: /dashboards/#get-started
[5]: /dashboards/widgets/#add-a-widget-to-your-dashboard
[6]: /dashboards/querying/#define-the-metric
[7]: /dashboards/widgets/configuration/
