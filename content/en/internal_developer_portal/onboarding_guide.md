---
title: Onboard with Internal Developer Portal
further_reading:
  - link: 'https://app.datadoghq.com/idp/get-started'
    tag: 'App'
    text: 'Exploring IDP in Datadog'
  - link: '/getting_started/internal_developer_portal/'
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
  - link: https://www.datadoghq.com/blog/datadog-teams-github-integration
    tag: Blog
    text: Keep service ownership up to date with Datadog Teams' GitHub integration
---

## Overview

This onboarding guide walks platform and engineering leaders through the phases of implementing Datadog's Internal Developer Portal (IDP).  

Recommendations:
- Onboard one or two teams first, and use their feedback to refine standards.  
- Iterate regularly—treat your Internal Developer Portal as a product.  
- Connect IDP standards with other initiatives, such as SLOs, CI/CD pipelines, and incident workflows.  

## Phase 1: Plan your implementation

1. **Review key concepts**: Learn about the [Entity model][2], [Scorecards][3], and [Self-service Actions][4].  
1. **Bring in your organization's structure**: Set up [Teams][5] and mirror your hierarchy in Datadog.  
1. **Define your ontology**: Map your existing systems to the [Entity model][2] so your structure aligns with Datadog's schema. Decide which [entity types][6] and validations you want to enforce.

## Phase 2: Familiarize yourself with tooling

1. **Identify data sources**: Learn about the three ways to bring in entities, and decide what to use as sources of truth for your [Software Catalog][7]:

   - **[Automatically discover entries from Datadog][23]** products, such as APM, RUM, or USM. You can also import from Infrastructure or Log Management.
   - **Import from external systems** such as [Backstage][14] or [ServiceNow][15].  
   - **[Create entries directly][24]** through the Datadog UI, or programmatically by importing from GitHub, Terraform, the Datadog Software Metadata Provider, or the Service Definition API.  

  **Note**: If you use APM, prioritize [Unified Service Tagging][25] and [Inferred Services][26] as entry points, rather than relying on service overrides.

1. **Create internal onboarding guidance**: Document tagging standards, sample `entity.definition.yaml` files, and expectations for application teams.  
1. **Explore automation**: Use the [API][8] or Terraform provider to manage entities, scorecards, and workflows programmatically.

## Phase 3: Integrate data sources

1. **Adopt GitOps-style management**: [Connect GitHub][13] or other repos to manage your catalog. [Import existing Backstage manifests][14] if available.  
1. **[Import from ServiceNow][15]**: Sync CIs from your ServiceNow CMDB into IDP.  
1. **Connect on-call and incident tools**: Configure [Jira][9], [PagerDuty][10], or [other integrations][16].

## Phase 4: Customize and extend schema

1. **Establish entity definition standards**: Decide how you represent criticality, lifecycle, and environments. See [Entity Model][6] for definition schemas. 
1. **Set metadata expectations**: Decide on whether to include [custom tags and extensions][18]. Determine how to define relationships between components, and how to audit automatically detected relationships.
1. **Maintain internal guidance**: Keep documentation for developers, such as standards for instrumentation and tagging, and sample entity definition manifests.

## Phase 5: Establish and communicate standards

1. **Review recommended Scorecards**: Start with [Datadog's out-of-the-box rules][3]. Select those relevant to your organization.
1. **Add organization-specific rules**: [Extend scorecards][19] with custom security checks, deployment frequency requirements, or tagging standards.  
1. **Set levels of criticality**: [Group rules into levels][20] to signal importance.

## Phase 6: Set up golden paths

1. **Review example blueprints**: Explore [Self-service blueprints][11], which show example paths for infrastructure provisioning and management, project scaffolding, and more. Experiment with modifying the blueprints to fit your organization's stack.
1. **Explore the Action Catalog**: See supported integrations, or extend with [HTTP requests and private actions][4].  
1. **Publish your first workflow**: Build a golden path and iterate based on developer feedback.

## Phase 7: Explore engineering reports

1. **Track progress**: Use built-in [Engineering Reports][12] to monitor production readiness, reliability, and adoption of best practices.  
1. **Measure engagement**: Monitor developer engagement through the built-in usage analytics dashboard.
 
## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: /internal_developer_portal/software_catalog/entity_model/entity_types/
[3]: /internal_developer_portal/scorecards/
[4]: /internal_developer_portal/self_service_actions/
[5]: /internal_developer_portal/software_catalog/set_up/ownership
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
[18]: /internal_developer_portal/software_catalog/entity_model?tab=v30#build-custom-extensions
[19]: /internal_developer_portal/scorecards/custom_rules
[20]: /internal_developer_portal/scorecards/scorecard_configuration#group-rules-into-levels
[23]: /internal_developer_portal/software_catalog/set_up/discover_entities
[24]: /internal_developer_portal/software_catalog/set_up/create_entities
[25]: /getting_started/tagging/unified_service_tagging
[26]: /tracing/services/inferred_services
