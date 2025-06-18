---
title: Getting Started with Internal Developer Portal
aliases: 
  - /getting_started/service_catalog
  - /getting_started/software_catalog/
further_reading:
    - link: '/software_catalog/'
      tag: 'Documentation'
      text: 'Software Catalog'
    - link: 'https://learn.datadoghq.com/courses/managing-service-catalog'
      tag: 'Learning Center'
      text: 'Managing Services with the Service Catalog'
    - link: 'https://www.datadoghq.com/blog/service-owner-knowledge-with-datadog-service-catalog/'
      tag: 'Blog'
      text: 'Simplify microservice governance with the Datadog Service Catalog'
    - link: '/software_catalog/troubleshooting'
      tag: 'Documentation'
      text: 'Troubleshooting'
    - link: '/software_catalog/scorecards'
      tag: 'Documentation'
      text: 'Service Scorecards'
---

{{< img src="/getting_started/software_catalog/overview_image.jpeg" alt="Software Catalog Reliability view showing several services and their associated MTTR, deployment metrics, issues, incidents, SLOs, and monitor statuses." style="width:90%;" >}}

## Overview

Datadog's Internal Developer Portal (IDP) helps you unify software metadata, live telemetry, and developer workflows in a single platform. This guide walks you through setting up each core IDP component:

- [Software Catalog][1]: Real-time inventory of entities and environments, enriched with ownership and operational metadata.
- [Scorecards][2]: Measure adoption of engineering best practices using rules-based evaluations.
- [Self-Service Actions][3]: Enable developers to execute standardized tasks with a single click.
- [Engineering Reports][4]: Visualize quality, reliability, and compliance metrics across your stack.
- [Overview Pages][5]: Give developers and teams a personalized view of their entities, issues, and action items.

Whether you're starting from scratch or integrating with existing systems like Backstage or ServiceNow, this guide will help you get started with IDP.


## Prerequisites

If you have not already, create a [Datadog account][6]. 

## Step 1: Populate Software Catalog 

IDP starts with a real-time [Software Catalog][1], which inventories the key building blocks of your software architecture. In Datadog, these are called entities—they can represent individual services, APIs, or grouped Systems.

You can add entities from:

- [APM, USM, and RUM][7]: Automatically discovered based on application telemetry
- [Manual definitions][8]: Created through the [Datadog app][9] or imported via tools like Terraform, Datadog APIs, or the GitHub integration
- [Third-party systems][10]: Through integrations with ServiceNow and Backstage

While a basic definition registers an entity, you can enrich entity definitions with metadata to provide context like:
- Ownership info and team contacts
- Documentation, dashboards, runbooks
- Deployment pipelines and config links
- Production readiness data through unified service tagging

The following example represents an entity definition for a `shopping-cart` service from an e-commerce application. It includes metadata about the service's owning team, languages used, runbook link, and code repository.

{{< code-block lang="yaml" filename="entity.datadog.yaml" disable_copy="true" collapsible="true" >}}
apiVersion: v3
  kind: system
  metadata:
    name: myapp
    displayName: My App
    tags:
      - tag:value
    links:
      - name: shopping-cart runbook
        type: runbook
        url: https://runbook/shopping-cart
      - name: shopping-cart architecture
        provider: gdoc
        url: https://google.drive/shopping-cart-architecture
        type: doc
    contacts:
      - name: Support Slack
        type: slack
        contact: https://www.slack.com/archives/shopping-cart
    owner: myteam
    additionalOwners:
      - name: opsTeam
        type: operator
  integrations:
    pagerduty:
      serviceURL: https://www.pagerduty.com/service-directory/Pshopping-cart
  spec:
    components:
      - service:myservice
      - service:otherservice
{{< /code-block >}}

Read the [Software Catalog setup guide][11] to learn how to add or import entities, and review the [entity model reference][12] for schema details.

## Step 2: Evaluate entity quality with Scorecards

Use Scorecards to assess whether entities meet your organization's standards. Scorecards can measure:
- Monitoring coverage
- Production readiness
- Security posture
- Internal tooling adoption
- Ownership and documentation

Datadog Scorecards include 10 out-of-the-box rules across observability practices, ownership tagging, and production readiness checkpoints. You can group rules into levels to categorize them by their criticality-level 1 (basic expectations), level 2 (recommended practices), and level 3 (advanced/aspirational goals).

In addition to using default rules, you can define custom rules to reflect your internal standards:

You can also define custom rules:
1. Go to the [Scorecards page][13] and click Create Rule.
1. Specify the rule name, the scorecard it belongs to, a description, and the owning team.
1. Send an outcome of `pass`, `fail`, or `skip` for each entity in one of the following ways:
   - Manually through the Datadog app
   - Programmatically through the Scorecards API
   - Automatically, using [Workflow Automation][14] to post outcomes on a schedule
1. View an overview of outcomes on the [Scorecards page][13].

Learn more about scorecard configuration and custom rules in the [Scorecards documentation][2].

## Step 3: Use Self-Service Actions

Self-Service Actions let engineers run repeatable tasks through a UI or API. For example, use Self-Service Actions to:
- [Create an S3 bucket with Terraform][16]
- [Scaffold a new project in GitHub][17]
- [Manage Kubernetes deployments][18]

Actions can be backed by automation systems like Terraform, GitHub Actions, or internal scripts. There are over 1000+ pre-built integrations with tools across source code management (e.g. Github, Gitlab), ticketing and incident management (e.g. Jira, ServiceNow, Pagerduty), chat (e.g. Slack & Microsoft Teams), cloud providers (e.g. AWS, GCP, Azure), and more. You can connect with any additional endpoints, including private resources, leveraging HTTP requests and private action runners.

Get started by exploring the Self-Service Actions [Blueprint Library][19] in Datadog for example apps that you can customize for your use case. 

To start automating developer workflows, explore the [Self-Service Actions documentation][3].

## Step 4: Monitor engineering health with reports

Engineering Reports provide an at-a-glance view of:
- Scorecards performance across all teams
- Org-wide reliability trends based on SLOs and incident performance
- Velocity and stability of software development

Explore [Engineering Reports][20] in the Datadog app. These reports are automatically generated and updated in real time. 

Read the [Engineering Reports documentation][4] for more details on available reports and configuration options.

## Step 5: Use overview pages for personalized insights

Overview pages surface high-level metrics and action items tailored to individual contributors and teams.

Start with the [developer overview page][21], which shows:
- Your open Jira tickets and GitHub PRs
- Your team's Monitors, Incidents, SLOs, and Scorecards
- Active issues, errors, and Watchdog alerts

For setup and customization tips, read the [Overview Pages documentation][22].


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /internal_developer_portal/software_catalog/
[2]: /internal_developer_portal/scorecards/
[3]: /internal_developer_portal/self_service_actions
[4]: /internal_developer_portal/eng_reports
[5]: /internal_developer_portal/overview_pages
[6]: https://www.datadoghq.com/
[7]: /internal_developer_portal/software_catalog/set_up/discover_entities/
[8]: /internal_developer_portal/software_catalog/set_up/create_entities/
[9]: https://app.datadoghq.com/software
[10]: /internal_developer_portal/software_catalog/set_up/import_entities/
[11]: /internal_developer_portal/software_catalog/set_up/
[12]: /internal_developer_portal/software_catalog/entity_model/entity_types/
[13]: https://app.datadoghq.com/software/scorecards
[14]: https://app.datadoghq.com/workflow/blueprints?selected_category=SCORECARDS
[16]: https://app.datadoghq.com/app-builder/apps/edit?startModalOpen=false&template=create-new-s3-bucket&viewMode=templatePreview
[17]: https://app.datadoghq.com/app-builder/apps/edit?startModalOpen=false&template=scaffold-github&viewMode=templatePreview
[18]: https://app.datadoghq.com/app-builder/apps/edit?startModalOpen=false&template=manage-kubernetes-deployments&viewMode=templatePreview
[19]: https://app.datadoghq.com/software/self-service-actions
[20]: https://app.datadoghq.com/idp/reports
[21]: https://app.datadoghq.com/idp/overview/developer
[22]: https://docs.datadoghq.com/internal_developer_portal/overview_pages/