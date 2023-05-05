---
title: Service Scorecards (Beta)
kind: documentation
is_beta: true
private: true
further_reading:
- link: "/tracing/service_catalog/"
  tag: "Documentation"
  text: "Service Catalog"
---

{{< callout url="#" btn_hidden="true" >}}
  Service Scorecards are in beta. Contact <a href="/help">Support</a> to have it enabled for your organization.
{{< /callout >}}

## Overview

Service scorecards help you monitor, prioritize, plan, and communicate effectively to take informed actions that improve your service's health and performance. Each scorecard shows the status for Production Readiness, Observability Best Practices, and Documentation & Ownership. All eligible services in the Service Catalog are automatically evaluated against a set of pass-fail criteria.

## How services are evaluated

Navigate to the [**Scorecards** page][8] in the [Service Catalog][6]. Click the section titles to see the rules that services are evaluated for.

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
: For services monitored by APM or USM. [Ensure smooth rollouts by implementing a version tag][4]. As you roll out new versions of your functionality, Datadog captures and alerts on differences between the versions in error rates, number of requests, and more. This can help you understand when to roll back to previous versions to improve end user experience. 

Logs correlation is active
: For APM services. [Correlation between APM and Logs][5] improves the speed of troubleshooting for end users, saving you time during incidents and outages. 

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

Each out-of-the-box scorecard (Production Readiness, Observability Best Practices, Ownership & Documentation) is made up of a default set of rules. These reflect simple pass-fail conditions. 

Individual rules may have restrictions based on data availability. For example, deployment-related rules rely on the availability of version tags through APM [Unified Service Tagging][7]. 

Each rule lists a score for the percentage of services that are passing. Each scorecard has an overall score percentage that totals how many services are passing, across all rules—**not** how many services are passing all rules.

## View service-level details and scores

The scorecard summary is accessible on the [**Explore** page][1] in the Service Catalog under the **Score** column in the **Ownership** tab. You can see how your specific service or subset of services is doing for each scorecard, and the rules within each. 

Click **View Details** from the scorecard, or open the service details side panel to see the **Scorecards** tab, which lists all the scorecards, the rules, and that service's pass-fail score for each rule.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /monitors/service_level_objectives/
[3]: https://app.datadoghq.com/monitors/recommended
[4]: /tracing/services/deployment_tracking/
[5]: /tracing/other_telemetry/connect_logs_and_traces/
[6]: /tracing/service_catalog/
[7]: /getting_started/tagging/unified_service_tagging/
[8]: https://app.datadoghq.com/services/scorecard