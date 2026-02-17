---
title: Using Scorecards
aliases:
  - /tracing/software_catalog/scorecards/using_scorecards
  - /tracing/service_catalog/scorecards/using_scorecards
  - /service_catalog/scorecards/using_scorecards
  - /software_catalog/scorecards/using_scorecards
further_reading:
- link: "/tracing/software_catalog/"
  tag: "Documentation"
  text: "Software Catalog"
- link: /api/latest/service-scorecards/
  tag: "Documentation" 
  text: "Scorecards API" 
- link: "https://www.datadoghq.com/blog/service-scorecards/"
  tag: "Blog"
  text: "Prioritize and promote service observability best practices with Scorecards"
- link: "https://www.datadoghq.com/blog/datadog-custom-scorecards/"
  tag: "Blog"
  text: "Formalize best practices with custom Scorecards"
- link: "/continuous_integration/dora_metrics/"
  tag: "Documentation"
  text: "Track DORA Metrics with Datadog" 
---

After configuring your Scorecards, you can view entity-level scores, track scores over time, and generate Scorecard reports to automatically update your team with Scorecard information.

## View entity-level details and scores

The Scorecard summary is accessible on the [**Explore** page][1] in the Software Catalog under the **Scorecards** column in the **Ownership** tab. You can see what level your specific entity or subset of entities has reached and the number of rules passed within each level.  

Click **View Details** from the Scorecard, or open the entity details side panel and navigate to the Scorecards tab. Both views lists all levels, the rules applied within each level, and the entity’s state---`pass`, `fail`, or `no data`---for each rule.

## Track scores over time

You can visualize how teams' scores progress over time as they make changes and remediate known issues through historical timeseries in the Scorecards UI. You can also export these time series to Dashboards and Notebooks where you can filter on different tags such as `team`, `rule`, `scorecard`, `application`, `tier`, and `lifecycle`. 

{{< img src="/tracing/software_catalog/scorecard-historical-metrics.png" alt="Timeseries that shows change in scores over time in Scorecard UI" style="width:90%;" >}}

## Generate Scorecard reports

You can generate Scorecard reports, which send scheduled overviews of Scorecard information to your team's Slack channel to help everyone understand how entities and teams are meeting the expected standards. Creating a report generates a Workflow using [Datadog Workflow Automation][2], which runs at a scheduled time. 

<div class="alert alert-danger">Running this Workflow may impact your billing. Read the <a href="https://www.datadoghq.com/pricing/?product=workflow-automation#products">pricing page</a> for more information</div>

To create a Report:

1. Click **Create Report** on the Scorecards page. 
2. Choose whether to include all defined entities across your organization or a specific team's entities. 
3. Set the date, time, and frequency at which you want to receive these reports.
4. Set the Slack workspace and channel where the reports should be sent. The selected channel must be public and have the Datadog Slack app installed. 
5. Click **Enable this Workflow**.

Using this information, Datadog sends you reports on the highest and lowest scoring rules, entities, and teams. 

{{< img src="/tracing/software_catalog/scorecard-reports.png" alt="Scorecard reports creation modal showing how to create report for all services" style="width:90%;" >}}


### Manage Scorecard reports
To edit or delete a Workflow, click **Manage Reports** on the Scorecards page and select the Workflow. Make edits to the Workflow or delete it using the Settings menu. 


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /service_management/workflows/
