---
title: Service Scorecards
kind: documentation
aliases:
  - /tracing/service_catalog/scorecards
further_reading:
- link: "/tracing/service_catalog/"
  tag: "Documentation"
  text: "Service Catalog"
- link: /api/latest/service-scorecards/
  tag: "Documentation" 
  text: "Service Scorecards API" 
- link: "https://www.datadoghq.com/blog/service-scorecards/"
  tag: "Blog"
  text: "Prioritize and promote service observability best practices with Service Scorecards"
- link: "https://www.datadoghq.com/blog/datadog-custom-scorecards/"
  tag: "Blog"
  text: "Formalize best practices with custom Scorecards"
- link: "/continuous_integration/dora_metrics/"
  tag: "Documentation"
  text: "Track DORA Metrics with Datadog" 
---

{{< callout url="#" btn_hidden="true" header="false" >}}
Service Scorecards are in beta.
{{< /callout >}}

{{< img src="/tracing/service_catalog/scorecard-overview.png" alt="Service Scorecards dashboard highlighting Production Readiness out-of-the-box rules" style="width:90%;" >}}

## Overview

Service scorecards help you monitor, prioritize, plan, and communicate effectively to take informed actions that improve your service's health and performance. Each scorecard shows the status for Production Readiness, Observability Best Practices, and Documentation & Ownership. All services with defined metadata in the Service Catalog are automatically evaluated against a set of pass-fail criteria.

You can select the rules used to populate the Scorecards, and you can generate reports, which are sent directly to your team's Slack channel, to regularly report on scorecard results.

## Setting up scorecards

To select which of the out-of-the-box rules are evaluated for each of the default scorecards:

1. Open the [Scorecards page][8] in Service Catalog.
2. Enable or disable rules to customize how the scores are calculated. 
3. Click **View your scores** to start tracking your progress toward the selected rules across your defined services.

{{< img src="/tracing/service_catalog/scorecards-setup.png" alt="Service Scorecards setup page" style="width:90%;" >}}

### Creating custom rules

To add custom rules to your Scorecards dashboard using the [Scorecards API][10]: 

1. Specify the name of the rule, the scorecard it belongs to, a rule description, and an owner to pass to `/scorecard/rules`.
2. Send an outcome of `pass`, `fail`, or `skip` for each `{rule, service}` tuple that you are evaluating to `/scorecard/outcomes/batch`.
3. View an overview of outcomes in the Scorecards dashboard.

After initial setup, rules can also be enabled or disabled through the API. 


To add custom rules to your Scorecards dashboard using the Scorecards UI: 

1. Click **Create Rule** on the Scorecards page.
2. Specify the name of the rule, the scorecard it belongs to, a rule description, and the owning team.
3. Send an outcome of `pass`, `fail`, or `skip` for each `{rule, service}` tuple that you are evaluating to the Scorecards API `/scorecard/outcomes/batch` endpoint.
4. View an overview of outcomes in the Scorecards dashboard.

{{< img src="/tracing/service_catalog/scorecard-create-rule-ui.png" alt="Create Rule modal to add custom rules in Scorecards dashboard" style="width:90%;" >}}

## How services are evaluated

After the default scorecards are set up, the Scorecards page in the Service Catalog shows the list of out-of-the-box rules and the percentage of services passing those rules. Click on a rule to see more details about passing and failing services and the teams that own them.

### Production readiness

The production readiness score for all services (unless otherwise indicated) is based on these rules:

Have any SLOs defined 
: [Service Level Objectives (SLOs)][2] provide a framework for defining clear targets around application performance, which helps you provide a consistent customer experience, balance feature development with platform stability, and improve communication with internal and external users.

Have any monitors defined
: Monitors reduce downtime by helping your team quickly react to issues in your environment. Review [recommended monitors][3].

Specified on-call
: Improve the on-call experience for everyone by establishing clear ownership of your services. This gives your on-call engineers the correct point of contact during incidents, reducing the time it takes to resolve your incidents. 

Last deployment occurred within the last 3 months
: For services monitored by APM or USM.	Agile development practices give you the ability to quickly address user feedback and pivot to developing the most important functionality for your end users. 

### Observability best practices

The Observability best practices score is based on the following rules:

Deployment tracking is active
: For services monitored by APM or USM. [Ensure smooth rollouts by implementing a version tag with Unified Service Tagging][4]. As you roll out new versions of your functionality, Datadog captures and alerts on differences between the versions in error rates, number of requests, and more. This can help you understand when to roll back to previous versions to improve end user experience. 

Logs correlation is active
: For APM services, evaluated based on the past hour of logs detected. [Correlation between APM and Logs][5] improves the speed of troubleshooting for end users, saving you time during incidents and outages.

### Ownership and documentation

The Ownership and documentation score is based on the following rules:

Team defined
: Defining a Team makes it easier for your on-call staff to know which team to escalate to in case a service they are not familiar with is the root cause of an issue. 

Contacts defined
: Defining contacts reduces the time it takes for your on-call staff to escalate to the owner of another service, helping you recover your services faster from outages and incidents.

Code repos defined
: Identifying code repositories enables your engineers to perform an initial investigation into an issue without having to contact the service's owning team. This improves collaboration and helps your engineers increase their overall understanding of integration points.

Any docs defined
: In the Service Catalog Other Links section, specify additional links to resources such as runbooks, dashboards, or other internal documentation. This helps with initial investigations and provides quick access to emergency remediation runbooks for outages and incidents.

## How scores are calculated

Each out-of-the-box scorecard (Production Readiness, Observability Best Practices, Ownership & Documentation) is made up of a default set of rules. These reflect pass-fail conditions and are automatically evaluated once per day. A service's score against custom rules is based on outcomes sent using the Scorecards API. To exclude a particular custom rule from a service's score calculation, set its outcome to `skip` in the Scorecards API.

Individual rules may have restrictions based on data availability. For example, deployment-related rules rely on the availability of version tags through APM [Unified Service Tagging][7]. 

Each rule lists a score for the percentage of services that are passing. Each scorecard has an overall score percentage that totals how many services are passing, across all rules—**not** how many services are passing all rules. Skipped and disabled rules are not included in this calculation.

## View service-level details and scores

The scorecard summary is accessible on the [**Explore** page][1] in the Service Catalog under the **Scorecards** column in the **Ownership** tab. You can see how your specific service or subset of services is doing for each scorecard, and the rules within each. 

Click **View Details** from the scorecard, or open the service details side panel to see the **Scorecards** tab, which lists all the scorecards, the rules, and that service's pass-fail score for each rule.

## Track scores over time

You can visualize how teams' scores progress over time as they make changes and remediate known issues through historical timeseries in the Scorecards UI. 

{{< img src="/tracing/service_catalog/scorecard-historical-metrics.png" alt="Timeseries that shows change in scores over time in Scorecard UI" style="width:90%;" >}}

You can also add these time series and customized queries using the `dd.scorecard.outcome` metric in Dashboards and Notebooks to share with stakeholders. This metric can be filtered on different tags such as `team`, `rule`, `scorecard`, `application`, `tier`, and `lifecycle`. 

{{< img src="/tracing/service_catalog/scorecard-metric.png" alt="Scorecards historical data shown in Dashboard editor" style="width:90%;" >}}

## Generating Scorecard reports

You can generate Scorecard reports, which send scheduled overviews of Scorecard information to your team's Slack channel to help everyone understand how services and teams are meeting the expected standards. Creating a report generates a Workflow using [Datadog Workflow Automation][9], which runs at a scheduled time. 

<div class="alert alert-warning">Running this Workflow may impact your billing. Read the <a href="https://www.datadoghq.com/pricing/?product=workflow-automation#products">pricing page</a> for more information</div>

To create a Report:

1. Click **Create Report** on the Scorecards page. 
2. Choose whether to include all defined services across your organization or a specific team's services. 
3. Set the date, time, and frequency at which you want to receive these reports.
4. Set the Slack workspace and channel where the reports should be sent. The selected channel must be public and have the Datadog Slack app installed. 
5. Click **Enable this Workflow**.

Using this information, Datadog sends you reports on the highest and lowest scoring rules, services, and teams. 

{{< img src="/tracing/service_catalog/scorecard-reports.png" alt="Scorecard reports creation modal showing how to create report for all services" style="width:90%;" >}}


### Managing Scorecard reports
To edit or delete a Workflow, click **Manage Reports** on the Scorecards page and select the Workflow. Make edits to the Workflow or delete it using the Settings menu. 


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /service_management/service_level_objectives/
[3]: https://app.datadoghq.com/monitors/recommended
[4]: /tracing/services/deployment_tracking/
[5]: /tracing/other_telemetry/connect_logs_and_traces/
[6]: /tracing/service_catalog/
[7]: /getting_started/tagging/unified_service_tagging/
[8]: https://app.datadoghq.com/services/scorecard
[9]: /service_management/workflows/
[10]: /api/latest/service-scorecards/
