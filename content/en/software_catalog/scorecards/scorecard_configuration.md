---
title: Scorecard Configuration
aliases:
  - /tracing/software_catalog/scorecards/scorecard_configuration
  - /tracing/service_catalog/scorecards/scorecard_configuration
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

{{< callout url="#" btn_hidden="true" header="false" >}}
Scorecards are in Preview.
{{< /callout >}}

Datadog provides the following out-of-the-box scorecards based on a default set of rules: Production Readiness, Observability Best Practices, and Ownership & Documentation. 

## Set up default scorecards

To select which of the out-of-the-box rules are evaluated for each of the default scorecards:

1. Open the [Scorecards page][1] in Software Catalog.
2. Enable or disable rules to customize how the scores are calculated. 
3. Click **View your scores** to start tracking your progress toward the selected rules across your defined services.

{{< img src="/tracing/software_catalog/scorecards-setup.png" alt="Scorecards setup page" style="width:90%;" >}}

## How services are evaluated

After the default scorecards are set up, the Scorecards page in the Software Catalog shows the list of out-of-the-box rules and the percentage of services passing those rules. Click on a rule to see more details about passing and failing services and the teams that own them.

### Production Readiness

The Production Readiness score for all services (unless otherwise indicated) is based on these rules:

Have any SLOs defined 
: [Service Level Objectives (SLOs)][2] provide a framework for defining clear targets around application performance, which helps you provide a consistent customer experience, balance feature development with platform stability, and improve communication with internal and external users.

Have any monitors defined
: Monitors reduce downtime by helping your team quickly react to issues in your environment. Review [monitor templates][3].

Specified on-call
: Improve the on-call experience for everyone by establishing clear ownership of your services. This gives your on-call engineers the correct point of contact during incidents, reducing the time it takes to resolve your incidents. 

Last deployment occurred within the last 3 months
: For services monitored by APM or USM.	Agile development practices give you the ability to quickly address user feedback and pivot to developing the most important functionality for your end users. 

### Observability Best Practices

The Observability Best Practices score is based on the following rules:

Deployment tracking is active
: For services monitored by APM or USM. [Ensure smooth rollouts by implementing a version tag with Unified Service Tagging][4]. As you roll out new versions of your functionality, Datadog captures and alerts on differences between the versions in error rates, number of requests, and more. This can help you understand when to roll back to previous versions to improve end user experience. 

Logs correlation is active
: For APM services, evaluated based on the past hour of logs detected. [Correlation between APM and Logs][5] improves the speed of troubleshooting for end users, saving you time during incidents and outages.

### Ownership & Documentation

The Ownership & Documentation score is based on the following rules:

Team defined
: Defining a Team makes it easier for your on-call staff to know which team to escalate to in case a service they are not familiar with is the root cause of an issue. 

Contacts defined
: Defining contacts reduces the time it takes for your on-call staff to escalate to the owner of another service, helping you recover your services faster from outages and incidents.

Code repos defined
: Identifying code repositories enables your engineers to perform an initial investigation into an issue without having to contact the service's owning team. This improves collaboration and helps your engineers increase their overall understanding of integration points.

Any docs defined
: In the Software Catalog Other Links section, specify additional links to resources such as runbooks, dashboards, or other internal documentation. This helps with initial investigations and provides quick access to emergency remediation runbooks for outages and incidents.

## How scores are calculated

Each out-of-the-box scorecard (Production Readiness, Observability Best Practices, Ownership & Documentation) is made up of a default set of rules. These reflect pass-fail conditions and are automatically evaluated once per day. A service's score against custom rules is based on outcomes sent using the Scorecards API. To exclude a particular custom rule from a service's score calculation, set its outcome to `skip` in the Scorecards API.

Individual rules may have restrictions based on data availability. For example, deployment-related rules rely on the availability of version tags through APM [Unified Service Tagging][6]. 

Each rule lists a score for the percentage of services that are passing. Each scorecard has an overall score percentage that totals how many services are passing, across all rules—**not** how many services are passing all rules. Skipped and disabled rules are not included in this calculation.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services/scorecard
[2]: /service_management/service_level_objectives/
[3]: https://app.datadoghq.com/monitors/recommended
[4]: /tracing/services/deployment_tracking/
[5]: /tracing/other_telemetry/connect_logs_and_traces/
[6]: /getting_started/tagging/unified_service_tagging/
