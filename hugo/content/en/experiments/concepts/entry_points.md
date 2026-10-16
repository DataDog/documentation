---
title: Entry Points
description: Filter warehouse experiment exposures by an entry point so Datadog analyzes only the subjects who reached the experience you changed.
further_reading:
- link: "/experiments/concepts/exposure_sql/"
  tag: "Documentation"
  text: "Exposure SQL Models"
- link: "/experiments/guide/connecting_a_data_warehouse/"
  tag: "Documentation"
  text: "Connecting a Data Warehouse"
- link: "/experiments/plan_and_launch_experiments/"
  tag: "Documentation"
  text: "Plan and Launch Experiments"
- link: "/experiments/reading_results/"
  tag: "Documentation"
  text: "Reading Experiment Results"
---

## Overview

Subjects are often assigned to an experiment before they see the change being tested. For example, your application might assign every user to a checkout experiment when they load the homepage, but only some of those users reach the checkout page. Subjects who never reach the changed experience behave the same in every variant, so including them in the analysis dilutes the measured effect and makes it harder to detect.

An **entry point** is a qualifying event that limits the analysis to subjects who reached it after assignment. With an entry point such as "viewed the checkout page," Datadog analyzes only the subjects who viewed the checkout page, and measures their metrics from the moment they arrived.

## How entry points work

An entry point is an event from an existing [Metric SQL Model][1], the same warehouse source you use to define experiment metrics. You don't create a separate SQL object for it. To narrow the event, add filters on the source's properties, such as `platform` is `mobile`. When you add more than one filter, a qualifying event must match all of them.

When Datadog computes results for an experiment with an entry point, it applies the following rules to each subject:

- **First qualifying event after assignment**: Datadog uses the subject's first qualifying event at or after their assignment, up to the end of the assignment window. Subjects with no qualifying event in that window are excluded from the analysis.
- **Earlier events are ignored**: Qualifying events that occur before assignment don't count. This keeps behavior from before the subject received a variant out of the results.
- **Effective assignment time**: The timestamp of the qualifying event becomes the subject's effective assignment time. Datadog uses it to decide which subjects to include and to evaluate every time-windowed metric.
- **Variant is unchanged**: The subject's variant still comes from their original assignment.

Because the entry point defines the analyzed population, [experiment diagnostics][2], such as traffic imbalance (sample ratio mismatch) and mixed assignments, are computed on the filtered population. The [Copy SQL][3] output for a metric also includes the entry-point filter.

## Requirements and limitations

<div class="alert alert-info">Entry points are available only for experiments whose exposures come from an <a href="/experiments/concepts/exposure_sql/">Exposure SQL Model</a>. The entry-point source must use the same warehouse connection as the experiment's exposures.</div>

- The Metric SQL Model must map the experiment's [subject type][4]. The picker lists only sources that do, because a source without the subject type can't be joined to the experiment's assignments.
- Only sources with an each-record measure can be used as an entry point.
- You can select a source that has no filterable properties, but you can't add filters to it.
- An experiment can have at most one entry point.
- Entry points are not supported for external holdout analyses.
- If you change the experiment's flag to one that doesn't use an Exposure SQL Model, Datadog removes the entry point.

## Add an entry point

Add an entry point while you [set up your experiment][5], after you choose the flag and its exposure source:

1. In the {{< ui >}}Feature flag{{< /ui >}} section of the experiment setup page, select a warehouse flag and choose the Exposure SQL Model from the {{< ui >}}Exposures for this experiment are tracked in…{{< /ui >}} dropdown. For details, see [Create experiments using Exposure SQL Models][6].
1. Click {{< ui >}}Filter exposures by entry point{{< /ui >}} to open the event picker.

   {{< img src="/product_analytics/experiment/entry-points/setup-filter-by-entry-point.png" alt="The Feature flag section of the experiment setup page, with a warehouse flag selected, an Exposure SQL Model chosen as the exposure source, and the Filter exposures by entry point button below it." style="width:80%;" >}}
   <!-- TODO screenshot -->

1. Select the event that subjects must reach to be included in the analysis, such as a checkout page view.
1. (Optional) Click {{< ui >}}Filter{{< /ui >}} to add a property filter. In the filter row, select a property, an operator, and a value. Repeat to add more filters.

   {{< img src="/product_analytics/experiment/entry-points/entry-point-with-filter.png" alt="The Filter exposures by entry point field set to a checkout page view event, with one property filter row where platform is mobile, and a Filter button to add another row." style="width:80%;" >}}
   <!-- TODO screenshot -->

Datadog saves the entry point and its filters automatically. To remove the entry point, click the remove icon next to the selected event.

## Change or remove an entry point after launch

After you launch an experiment, you can still change or remove its entry point:

1. Open the experiment and click the {{< ui >}}Exposures{{< /ui >}} tab.
1. In the {{< ui >}}Entry point{{< /ui >}} section, select a different event, edit the property filters, or remove the entry point.

{{< img src="/product_analytics/experiment/entry-points/details-entry-point-section.png" alt="The Entry point section on the Exposures tab of a running experiment, showing the selected event, a property filter, and a message that changing the entry point recomputes results for the whole experiment." style="width:80%;" >}}
<!-- TODO screenshot -->

Changing the entry point of a running experiment recomputes results for the whole experiment, so the next update takes longer than usual. Results reflect the change after the next update, not immediately. To start an update, click {{< ui >}}Run an update now{{< /ui >}} on the experiment overview page.

## Troubleshooting

Source unavailable
: The Metric SQL Model or measure that the entry point referenced was deleted. Remove the entry point and select an event from an existing source.

The entry point reads from a different warehouse connection
: The entry-point source and the experiment's exposures must use the same warehouse connection, or results can't be computed. This can happen if you change the experiment's exposure source after you add the entry point. Select an entry point from a source on the same connection, or change the experiment's exposure source.

A filter property no longer exists on the source
: The property was removed from the Metric SQL Model, for example after an edit to its SQL. The filter still applies to results. To stop applying it, remove the filter row.

The analyzed population is smaller than expected
: Check that the entry-point source maps the experiment's subject type to the same identifiers as your exposures, and that qualifying events occur at or after assignment. Events before assignment don't qualify a subject.

## Set an entry point with the API

You can also set an entry point with the `entry_point` attribute when you create or update an experiment through the [Experiments API][7].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /experiments/defining_metrics/?tab=warehouse#create-a-sql-model
[2]: /experiments/diagnostics/
[3]: /experiments/reading_results/#copy-sql
[4]: /experiments/concepts/subject_types/
[5]: /experiments/plan_and_launch_experiments/#set-up-your-experiment
[6]: /experiments/concepts/exposure_sql/#create-experiments-using-exposure-sql-models
[7]: /api/latest/experiments/
