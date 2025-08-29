---
title: Onboard with Internal Developer Portal
kind: guide
further_reading:
  - link: '/internal_developer_portal/getting_started/'
    tag: 'Documentation'
    text: 'Getting started with Internal Developer Portal'
  - link: '/internal_developer_portal/software_catalog/'
    tag: 'Documentation'
    text: 'Software Catalog'
  - link: '/internal_developer_portal/scorecards/'
    tag: 'Documentation'
    text: 'Scorecards'
  - link: '/internal_developer_portal/self_service_actions/'
    tag: 'Documentation'
    text: 'Self-service Actions'
  - link: '/internal_developer_portal/eng_reports/'
    tag: 'Documentation'
    text: 'Engineering Reports'
---

## Overview

This onboarding guide walks platform and engineering leaders through the phases of implementing Datadog's Internal Developer Portal (IDP).  

Recommendations:
- Start small: onboard one or two teams, and use their feedback to refine standards.  
- Iterate: treat your Internal Developer Portal as a product, with regular improvements.  
- Cross-link with other initiatives: connect IDP standards to your Service Level Objectives (SLOs), CI/CD pipelines, and incident workflows. 

## Phase 1: Plan your implementation

1. **Review key concepts**: Learn about the [Entity model][2], [Scorecards][3], and [Self-service Actions][4].  
1. **Bring in your organization's structure**: Set up [Teams][5] and mirror your hierarchy in Datadog.  
1. **Define your ontology**: Map your existing systems to the [Entity model][2] so your structure aligns with Datadog's schema. Decide which [entity types][6] and validations you want to enforce.

## Phase 2: Familiarize yourself with tooling

1. **Identify data sources**: Choose sources of truth for your [Software Catalog][7], such as external manifests or Datadog telemetry.  
1. **Create internal onboarding guidance**: Document tagging standards, sample `entity.definition.yaml` files, and expectations for application teams.  
1. **Explore automation**: Use the [API][8] or Terraform provider to manage entities, scorecards, and workflows programmatically.

## Phase 3: Integrate data sources

- **Adopt GitOps-style management**: [Connect GitHub][13] or other repos to manage your catalog. [Import existing Backstage manifests][14] if available.  
- **[Import from ServiceNow][15]**: Sync CIs from your ServiceNow CMDB into IDP.  
- **Connect on-call and incident tools**: Configure [Jira][9], [PagerDuty][10], or [other integrations][16].

## Phase 4: Customize and extend schema

- **Establish definition standards**: Decide how you represent criticality, lifecycle, and environments. See [Entity Model][17] for definition schemas. 
- **Set metadata expectations**: Decide on whether to include [custom tags and extensions][18]. Determine how to define relationships between components, and how to audit automatically detected relationships.
- **Maintain internal guidance**: Keep documentation for developers, such as standards for instrumentation and tagging, and sample entity definition manifests.

## Phase 5: Establish and communicate standards

- **Review recommended Scorecards**: Start with [Datadog's out-of-the-box rules][3]. Select those relevant to your organization.
- **Add organization-specific rules**: [Extend scorecards][19] with custom security checks, deployment frequency requirements, or tagging standards.  
- **Set levels of criticality**: [Group rules into levels][20] to signal importance.

## Phase 6: Set up golden paths

- **Review example blueprints**: Explore [Self-service blueprints][11], which show example paths for infrastructure provisioning and management, project scaffolding, and more. Experiment with modifying the blueprints to fit your organization's stack.
- **Explore the Action Catalog**: See supported integrations, or extend with [HTTP requests and private actions][4].  
- **Publish your first workflow**: Build a golden path and iterate based on developer feedback.

## Phase 7: Explore engineering reports

- **Track progress**: Use built-in [Engineering Reports][12] to monitor production readiness, reliability, and adoption of best practices.  
- **Measure engagement**: Monitor developer engagement through the built-in usage analytics dashboard.
 
## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /internal_developer_portal/getting_started/
[2]: /internal_developer_portal/software_catalog/entity_model/entity_types/
[3]: /internal_developer_portal/scorecards/
[4]: /internal_developer_portal/self_service_actions/
[5]: /account_management/teams/
[6]: /internal_developer_portal/software_catalog/entity_model/
[7]: /internal_developer_portal/software_catalog/
[8]: /api/latest/software-catalog/
[9]: /integrations/jira/
[10]: /integrations/pagerduty/
[11]: https://app.datadoghq.com/software/self-service-actions
[12]: /internal_developer_portal/eng_reports/
[13]: /internal_developer_portal/software_catalog/set_up/create_entities/#github-integration
[14]: /internal_developer_portal/software_catalog/set_up/import_entities#import-from-backstage
[15]: /internal_developer_portal/software_catalog/set_up/import_entities#import-from-servicenow
[16]: /internal_developer_portal/integrations
[17]: /internal_developer_portal/software_catalog/entity_model
[18]: /internal_developer_portal/software_catalog/entity_model?tab=v30#build-custom-extensions
[19]: /internal_developer_portal/scorecards/custom_rules
[20]: /internal_developer_portal/scorecards/scorecard_configuration#group-rules-into-levels
