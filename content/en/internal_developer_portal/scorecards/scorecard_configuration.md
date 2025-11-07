---
title: Scorecard Configuration
aliases:
  - /tracing/software_catalog/scorecards/scorecard_configuration
  - /tracing/service_catalog/scorecards/scorecard_configuration
  - /service_catalog/scorecards/scorecard_configuration
  - /software_catalog/scorecards/scorecard_configuration
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

Datadog provides the following out-of-the-box scorecards based on a default set of rules: Production Readiness, Observability Best Practices, and Ownership & Documentation. 

## Set up default scorecards

To select which of the out-of-the-box rules are evaluated for each of the default scorecards:

1. Open the [Scorecards page][1] in Software Catalog.
2. Enable or disable rules to customize how the scores are calculated. 
3. Click **View your scores** to start tracking your progress toward the selected rules across your defined entities.

{{< img src="/tracing/software_catalog/scorecards-setup.png" alt="Scorecards setup page" style="width:90%;" >}}

## How entities are evaluated

After the default scorecards are set up, the Scorecards page in the Software Catalog shows the list of out-of-the-box rules and the percentage of entities passing those rules. Click on a rule to see more details about passing and failing entities and the teams that own them. All out-of-the-box rules are initially set to evaluate entities of `kind:service`, but [this scope can be changed][7] in the rule editor.

### Production Readiness

The Production Readiness score for all entities (unless otherwise indicated) is based on these rules:

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

Docs defined
: Linking documentation in the Software Catalog provides engineers with access to service-specific knowledge, such as architecture overviews, API references, and operational guides. This promotes better cross-team collaboration, accelerates onboarding, and deepens overall understanding of how services work and interact.

## How scores are calculated

Each out-of-the-box scorecard (Production Readiness, Observability Best Practices, Ownership & Documentation) is made up of a default set of rules. These reflect pass-fail conditions and are automatically evaluated once per day. An entity's score against custom rules is based on outcomes sent using the [Scorecards API][8] or [Workflow Automation][9]. To exclude a particular custom rule from an entity's score calculation, set its outcome to `skip` in the Scorecards API.

Individual rules may have restrictions based on data availability. For example, deployment-related rules rely on the availability of version tags through APM [Unified Service Tagging][6]. 

Each rule lists a score for the percentage of entities that are passing. Each scorecard has an overall score percentage that totals how many entities are passing, across all rules—**not** how many entities are passing all rules. Skipped and disabled rules are not included in this calculation.

Scores for each rule can also be viewed **By Kind** and **By Team**. These tabs aggregate scores across an entity's kind (for example, `service`, `queue`, `datastore`, or `api`) or team as defined in Software Catalog. This score is calculated by averaging each entity's individual score within each kind or team. 

## Group rules into levels

You can group rules into levels to categorize them by their criticality. There are three predefined levels: 

- **Level 1 - Basic rules:** These rules reflect the baseline expectations for every production entity, such as having an on-call owner, monitoring in place, or a team defined.
- **Level 2 - Intermediate rules:** These rules reflect strong engineering practices that should be adopted across most entities. Examples might include defining SLOs or linking documentation within Software Catalog.
- **Level 3 - Advanced rules:** These aspirational rules represent mature engineering practices. These may not apply to every entity but are valuable goals for teams.

You can set levels for any out-of-the-box or custom rules. By default, rules without levels are automatically placed in level 3. You can change this default assignment by editing the rule.

{{< img src="/tracing/software_catalog/scorecard-levels.png" alt="Scorecards UI grouped by levels" style="width:90%;" >}}

You can group rules by scorecard or level in the Scorecards UI. In the Software Catalog, you can track how a specific entity is progressing through each level. Each entity starts at Level 0. The entity progresses to Level 1 once it passes all level 1 rules until it reaches a Level 3 status. 

{{< img src="/tracing/software_catalog/scorecard-levels-software-catalog.png" alt="Scorecards view in Software Catalog showing service's status by level" style="width:90%;" >}}

## Scope scorecard rules 

Scopes allow you to define which entities a rule applies to, using metadata from entity definitions in Software Catalog. Without a scope defined, a rule applies to all defined entities in the catalog. You can scope by a `kind` of entity as well as any field within an entity definition, including `team`, `tier`, and custom tags. 

By default, an entity must match all specified conditions to be evaluated against the rule. You can use `OR` statements to include multiple values for the same field. 

{{< img src="/tracing/software_catalog/scorecard-edit-scope.png" alt="Scorecards setup page" style="width:90%;" >}}

You can set scopes for both out-of-the-box and custom rules. When you add a scope to a rule, any previously recorded outcomes for entities that no longer match the scope are hidden from the UI and excluded from score calculations. If you later remove the scope, these outcomes reappear and are counted again.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services/scorecard
[2]: /service_management/service_level_objectives/
[3]: https://app.datadoghq.com/monitors/recommended
[4]: /tracing/services/deployment_tracking/
[5]: /tracing/other_telemetry/connect_logs_and_traces/
[6]: /getting_started/tagging/unified_service_tagging/
[7]: /internal_developer_portal/scorecards/scorecard_configuration#scope-scorecard-rules
[8]: /api/latest/service-scorecards/
[9]: /internal_developer_portal/scorecards/custom_rules#evaluate-custom-rules-using-workflow-automation
