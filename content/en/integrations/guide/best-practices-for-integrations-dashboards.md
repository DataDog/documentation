---
title: Best Practices for Integrations Dashboards
kind: guide
---

## Overview

[Datadog Dashboards][1] enable you to efficiently monitor your infrastructure and integrations by displaying and tracking key metrics.

## Best Practices

As a best practice, an integration dashboard should contain the following information:

{{< img src="integrations/guide/best-practices-for-integrations-dashboards/dashboard-example.png" alt="An example of a Dashboard" width="100%">}}

- An attention-grabbing About section with a banner image, concise copy, useful links, and a good typography hierarchy
- A brief, annotated Overview section with the most important statistics, right at the top
- Simple graph titles and title-case group names
- Symmetry in high density mode
- Well formatted, concise notes
- Color coordination between related groups, notes within groups, and graphs within groups

Follow the guidelines below as you build your dashboard.

### General guidelines

1. When creating a new dashboard, select the default dashboard type.

1. Dashboard titles should contain the integration name. Some examples of a good dashboard title are `Syclla` and `Cilium Overview`.

    **Note**: Avoid using `-` (hyphens) in the dashboard title as the dashboard URL is generated from the title.

1. Add a logo to the dashboard header. The integration logo will automatically appear in the header if the icon exists and the `integration_id` matches the icon name.

1. Always include an About section for the integration containing a brief description and helpful links. Include an Overview group containing a few of the most important metrics and place it at the top of the dashboard. Edit the About section and select the banner display option, then link to a banner image like this: `/static/images/integration_dashboard/your-image.png`. The About section should contain content, not data; the Overview section should contain data. Avoid making the About section full-width.

1. Research the metrics supported by the integration and consider grouping them in relevant categories. Important metrics that are key to the performance and the overview of the integration should be at the top.

1. Use Group widgets to title and group sections, rather than note widgets. Use partial width groups to display groups side-by-side. Most dashboards should display every widget within a group.

    {{< img src="integrations/guide/best-practices-for-integrations-dashboards/full-width-grouped-logs.png" alt="An example of Group widgets" width="100%">}}

1. Timeseries widgets should be at least four columns wide in order not to appear squashed on smaller displays.

1. Stream widgets should be at least six columns wide, or half the dashboard width, for readability. Place them at the end of a dashboard so they don't trap scrolling. It's useful to put stream widgets in a group by themselves so they can be collapsed. Add an event stream only if the service monitored by the dashboard is reporting events. Use `sources:service_name`.

1. Try using a mix of widget types and sizes. Explore visualizations and formatting options until you're confident your dashboard is as clear as it can be. Sometimes a whole dashboard of timeseries is okay, but other times variety can improve legibility. The most commonly used metric widgets are [timeseries][2], [query values][3], and [tables][4]. For more information on the available widget types, see the [list of supported dashboard widgets][5].

1. Try to make the left and right halves of your dashboard symmetrical in high density mode. Users with large monitors will see your dashboard in high density mode by default, so it's important that group relationships make sense, and that the dashboard looks good. You can adjust group heights to achieve this, and move groups between the left and right halves.

    {{< img src="integrations/guide/best-practices-for-integrations-dashboards/symmetrical-dashboard.png" alt="An example of a symmetrical dashboard" width="100%">}}

1. [Template variables][6] allow you to dynamically filter one or more widgets in a dashboard. Template variables must be universal and accessible by any user or account using the monitored service. Ensure all relevant graphs are listening to the relevant template variable filters.

    **Note**: Adding `*=scope` as a template variable is useful as users can access all of their own tags.

#### Copy

1. Use concise graph titles that start with the most important information. Avoid common phrases such as "number of".

    | Concise title (good) | Verbose title (bad) |
    | - | - |
    | Events per node | Number of Kubernetes events per node |
    | Pending tasks: [$node_name] | Total number of pending tasks in [$node_name] |
    | Read/write operations | Number of read/write operations |
    | Connections to server - rate | Rate of connections to server |
    | Load | Memcached Load |

1. Avoid repeating the group title or integration name in every widget in a group, especially if the widgets are query values with a custom unit of the same name.

1. For the timeseries widget, always [alias formulas][7].

1. Group titles should be title case. Widget titles should be sentence case.

1. If you're showing a legend, make sure the aliases are easy to understand.

1. Graph titles should summarize the queried metric. Do not indicate the unit in the graph title because unit types are displayed automatically from metadata. An exception to this is if the calculation of the query represents a different type of unit.

#### QA

1. Always check a dashboard at 1280px wide and 2560px wide to see how it looks on a smaller laptop and a larger monitor. The most common screen widths for dashboards are 1920, 1680, 1440, 2560, and 1280px, making up more than half of all dashboard page views combined.

    **Note**: If your monitor isn't large enough for high density mode, use the browser zoom controls to zoom out.

#### Visual style

1. Format notes to make them fit their use case. Try the presets "caption", "annotation", or "header", or pick your own combination of styles. Avoid using the smallest font size for notes that are long or include complex formatting, like bulleted lists or code blocks.

1. Use colors to highlight important relationships and to improve readability, not for style. If several groups are related, apply the same group header color to all of them. If you've applied a green header color to a group, try making its notes green as well. If two groups are related, but one is more important, try using the "vivid" color on the important group and the "light" color on the less important group. Don't be afraid to leave groups with white headers, and be careful not to overuse color. For example, don't make every group on a dashboard vivid blue. Also avoid using gray headers.

    {{< img src="integrations/guide/best-practices-for-integrations-dashboards/color-related-data.png" alt="An example of color-related data in a dashboard" width="100%">}}

1. Use legends when they make sense. Legends make it easy to read a graph without having to hover over each series or maximize the widget. Make sure you use timeseries aliases so the legend is easy to read. Automatic mode for legends is a great option that hides legends when space is tight and shows them when there's room.

    {{< img src="integrations/guide/best-practices-for-integrations-dashboards/well-named-legends.png" alt="An example of legends in a dashboard" width="100%">}}

1. If you want users to compare two graphs side-by-side, make sure their x-axes align. If one graph is showing a legend and the other isn't, the x-axes won't align. Make sure they both show a legend or both do not.

1. For timeseries, base the display type on the type of metric.

    | Types of metric | Display type |
    | - | - |
    | Volume (e.g. Number of connections) | `area` |
    | Counts (e.g. Number of errors) | `bars` |
    | Multiple groups or default | `lines` |

## Exporting a dashboard payload

Once you've created a dashboard in the Datadog UI, you can export the dashboard payload to be included in its integration's assets directory.

Ensure that you have set an `api_key` and `app_key` for the org that contains the new dashboard in the [`ddev` configuration][8].

Run the following command to export the dashboard:

```console
ddev meta dash export <URL_OF_DASHBOARD> <INTEGRATION>
```

**Note**: If the dashboard is for a contributor-maintained integration in the `integration-extras` repo, run the command with the `--extras` or `-e` flag.

This command will add the dashboard definition to the `manifest.json` file of the integration. The dashboard JSON payload is available in `/assets/dashboards/<DASHBOARD_TITLE>.json`.

Commit the changes and create a pull request.

## Verify a dashboard

Once your PR is merged and live in production, you can find your dashboard in the Dashboard List page.

Make sure the integration tile is `Installed` in order to see the preset dashboard in the list.

Ensure logos render correctly on the Dashboard List page and within the preset dashboard.

[1]: /dashboards/
[2]: /dashboards/widgets/timeseries/
[3]: /dashboards/widgets/query_value/
[4]: /dashboards/widgets/table/
[5]: /dashboards/widgets/
[6]: /dashboards/template_variables/
[7]: /dashboards/widgets/timeseries/#metric-aliasing
[8]: https://github.com/DataDog/integrations-core/blob/master/docs/developer/ddev/configuration.md#organization
