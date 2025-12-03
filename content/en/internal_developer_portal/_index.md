---
title: Internal Developer Portal
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/datadog-forms
  tag: Blog
  text: Turn feedback into action across your engineering org with Datadog Forms
- link: 'https://app.datadoghq.com/idp/get-started'
  tag: 'App'
  text: 'Exploring IDP in Datadog'
- link: "getting_started/internal_developer_portal/"
  tag: "Documentation"
  text: "Getting Started with Internal Developer Portal"
- link: "https://www.datadoghq.com/blog/software-catalog"
  tag: "Blog"
  text: "Improve developer experience and collaboration with Software Catalog"
- link: "https://www.datadoghq.com/blog/service-scorecards"
  tag: "Blog"
  text: "Prioritize and promote service observability best practices with Service Scorecards"
- link: "https://www.datadoghq.com/blog/software-catalog-self-service-actions"
  tag: "Blog"
  text: "Empower your engineering teams with Self-Service Actions in Datadog Software Catalog"
- link: "https://www.datadoghq.com/blog/how-datadog-manages-internal-deployments/"
  tag: "Blog"
  text: "How Datadog's Infrastructure team manages internal deployments using the Service Catalog and CI/CD Visibility"
- link: "https://www.datadoghq.com/blog/internal-developer-portal/"
  tag: "Blog"
  text: "Ship software quickly and confidently with Datadog IDP"
- link: "https://www.datadoghq.com/blog/datadog-backstage-plugin/"
  tag: "Blog"
  text: "Sync your Backstage catalog with Datadog IDP"
- link: "https://www.datadoghq.com/blog/idp-campaigns/"
  tag: "Blog"
  text: "Coordinate large-scale engineering initiatives with IDP Campaigns"
---

{{< img src="tracing/internal_developer_portal/scrolling_the_catalog.mp4" alt="A video that scrolls through the Internal Developer Portal Catalog page and clicks on a service to show a dependency graph with parent and child services represented" video=true >}}

## Overview

Creating an IDP is a critical part of [Platform Engineering][7] best practices. Datadog's Internal Developer Portal (IDP) is a fully managed solution that unifies live telemetry, metadata, and self-service workflows to standardize and accelerate software delivery and optimize developer experience. 

- Powered by live telemetry, [Software Catalog][1] inventories every service and environment in real time and enriches each entry with descriptive metadata for ownership and operational context.
- [Self-Service Actions][2] and [Scorecards][3] translate platform policies into one-click tasks, ensuring every change meets observability, security, and production criteria. 
- Built-in [Engineering Reports][4] give platform engineers and leaders real-time visibility into software quality, standards adoption, and developer experience, making it easy to identify gaps and drive data-backed decisions.

If you're new to IDP, start with the [Getting Started guide][5], which walks through setup and basic usage.

{{< callout url="https://www.datadoghq.com/product-preview/idp-preview-features/" d_target="#signupModal" btn_hidden="false" header="Sign up for early access to our upcoming features!" >}}
{{< /callout >}}

## Common use cases

{{< whatsnext desc=" " >}}
    {{< nextlink href="/internal_developer_portal/use_cases/dev_onboarding" >}}Accelerate developer onboarding{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/use_cases/incident_response" >}}Improve incident response{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/use_cases/dependency_management" >}}Manage and map dependencies{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/use_cases/production_readiness" >}}Evaluate production readiness{{< /nextlink >}}
{{< /whatsnext >}}

## Main features

{{< whatsnext desc=" " >}}
    {{< nextlink href="/internal_developer_portal/software_catalog" >}}Centralize observability, ownership, and engineering knowledge with Software Catalog{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/scorecards" >}}Promote engineering best practices at scale with Scorecards{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/self_service_actions" >}}Accelerate releases through Self-Service Actions{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/eng_reports" >}}Track reliability and scorecard compliance with Engineering Reports{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/external_provider_status" >}}Monitor external dependencies with External Provider Status{{< /nextlink >}}
{{< /whatsnext >}}

## Working with teams

Use [Datadog Teams][6] to enable team-based features in IDP:

- Track your teams in Datadog and automatically sync with your external sources of truth 
- Assign teams as owners of services and other entities 
- Create [hierarchies][8] to have parent-child relationships between your teams
- Filter views by teams throughout IDP (for example, in Software Catalog, Scorecards, and Engineering Reports)

If your organization manages team structure in GitHub, join the preview for GitHub Integration for Teams to automatically sync GitHub teams to Datadog.

{{< callout url="https://www.datadoghq.com/product-preview/github-integration-for-teams/" d_target="#signupModal" btn_hidden="false" header="Join the preview for GitHub Integration for Teams" >}}
{{< /callout >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /internal_developer_portal/software_catalog
[2]: /internal_developer_portal/self_service_actions
[3]: /internal_developer_portal/scorecards
[4]: /internal_developer_portal/eng_reports
[5]: /getting_started/internal_developer_portal/
[6]: /account_management/teams/
[7]: https://www.datadoghq.com/knowledge-center/platform-engineering/
[8]: /account_management/teams/manage/#subteams-hierarchical-teams
