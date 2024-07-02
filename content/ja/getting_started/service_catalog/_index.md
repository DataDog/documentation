---
title: Getting Started with Service Catalog
kind: documentation
further_reading:
    - link: /service_catalog/
      tag: Documentation
      text: Service Catalog
    - link: "https://learn.datadoghq.com/courses/managing-service-catalog"
      tag: Learning Center
      text: Managing Services with the Service Catalog
    - link: "https://www.datadoghq.com/blog/service-owner-knowledge-with-datadog-service-catalog/"
      tag: Blog
      text: Simplify microservice governance with the Datadog Service Catalog
    - link: /service_catalog/troubleshooting
      tag: Documentation
      text: トラブルシューティング
    - link: /service_catalog/scorecards
      tag: Documentation
      text: サービススコアカード
---

{{< img src="/getting_started/service_catalog/overview_image.jpeg" alt="Service Catalog Reliability view showing several services and their associated MTTR, deployment metrics, issues, incidents, SLOs, and monitor statuses." style="width:90%;" >}}

## Overview

Datadog Service Catalog provides a consolidated view of your services, combining ownership metadata, performance insights, security analysis, cost allocation, and much more. Having this centralized hub allows your development teams to discover and manage critical components in your runtime environments.

This page walks you through getting started with Service Catalog in Datadog.

## Prerequisites

If you have not already, create a [Datadog account][1]. 

## Adding entries to Service Catalog

### Automatically detected services

Service Catalog automatically discovers services based on application performance telemetries such as [APM][2], [USM][3], and [RUM][4]. The integration with APM enables Datadog to routinely discover new services at the same frequency as your traces are collected. With USM, the Datadog Agent connects to your eBPF-compatible hosts. USM automatically detects the services running on this infrastructure and tags them using [unified service tagging][5]. 

### User-defined services

If you are not using these products, you can manually declare services as entries in the `service.definition.yaml` registry. The definitions in this file include all the metadata that the catalog uses to file your services. These can be created and updated programmatically using an internal API or with a configuration management service like Terraform. You should include this file in your version control and regularly update it whenever new resources are added to your environment.

The following example represents a `shopping-cart` service from an e-commerce application. It includes important metadata about the service, such as its owning team, languages used, runbook link, and code repository. 

{{< code-block lang="yaml" filename="service.datadog.yaml" collapsible="true" >}}
schema-version: v2.2
dd-service: shopping-cart
team: e-commerce
application: shopping-app
tier: "1"
type: web
languages:
  - go
  - python
contacts:
  - type: slack
    contact: https://yourorg.slack.com/archives/e-commerce
  - type: email
    contact: ecommerce@example.com
  - type: microsoft-teams
    contact: https://teams.microsoft.com/example
links:
  - name: Runbook
    type: runbook
    url: http://runbook/shopping-cart
  - name: Source
    type: repo
    provider: github
    url: https://github.com/shopping-cart
  - name: Deployment
    type: repo
    provider: github
    url: https://github.com/shopping-cart
  - name: Config
    type: repo
    provider: github
    url: https://github.com/consul-config/shopping-cart
  - name: E-Commerce Team
    type: doc
    provider: wiki
    url: https://wiki/ecommerce
  - name: Shopping Cart Architecture
    type: doc
    provider: wiki
    url: https://wiki/ecommerce/shopping-cart
  - name: Shopping Cart RFC
    type: doc
    provider: google doc
    url: https://doc.google.com/shopping-cart
tags:
  - business-unit:retail
  - cost-center:engineering
integrations:
  pagerduty:
    service-url: https://www.pagerduty.com/service-directory/PSHOPPINGCART
  opsgenie:
    service-url: "https://www.opsgenie.com/service/uuid"
    region: "US"
ci-pipeline-fingerprints:
  - id1
  - id2
extensions:
  additionalProperties:
    customField1: customValue1
    customField2: customValue2
{{< /code-block >}}

You can also use any existing knowledge sources your organization maintains, such as Configuration Management Database (CMDB) tables (through [Datadog's ServiceNow integration][6]) and spreadsheets, to populate your Service Catalog. Datadog also has an [integration with Backstage][7] that allows you to import any data or services registered here into Datadog directly.

Finally, you can also create entries from `service` tags in other Datadog products like Infrastructure Monitoring and Log Management. 

{{< img src="/getting_started/service_catalog/import_entries.jpeg" alt="Import Entries tab in the Service Catalog setup and configuration section" style="width:90%;" >}}

## Managing metadata in Service Catalog

After you create these initial entries in your Service Catalog, it is important to keep the catalog updated consistently so that it remains effective. Service definition files should exist within your team's version control to make it easier to reference new deployments and other changes to the services where an update may be required. 

You can also automate the management of your service metadata by configuring a [GitHub action][8]. This will also allow you to ensure that teams are declaring services in a way that meets your standards, such as requiring all of your production services to have valid runbook links. 

If your organization has an existing registry of ownership, including internal systems like [Backstage][9] or a spreadsheet, a central team can schedule updates to service definition files using [API calls][10]. 

### Connect telemetry from across your monitoring stack

Connect monitoring data from the rest of your observability platform to improve the utility of your catalog.

With [unified service tagging][5], you can use the `service` tag to cross-reference service entities in the Service Catalog across all Datadog products. These tags can help enrich your service entities with metadata, metrics, and other context sources like Infrastructure Monitoring, RUM, Log Management, Software Delivery, and Security. 

Application performance telemetry from Universal Service Monitoring and APM also provide out-of-the-box dependency mapping for your system ecosystem, so you can see how components interact with each other in all your runtime environments.

## Enriching your Service Catalog

After services are populated in the catalog, you can enrich your service definitions with additional context to make them more useful. This could include adding key pieces of service metadata to your `service.definition.yaml` files such as: 

- Team
- On-call engineer
- Contact channel 
- Documentation links
- Last deployed version
- Code repositories 
- Runbook links
- Library dependencies and their versions
- Relevant dashboards

Service Catalog uses service definition schemas to store and display this metadata about your services. The schemas have built-in validation rules to ensure that only valid values are accepted. There are currently [four supported schemas][11]: v2, v2.1, v2.2, and v3. 

## Using Service Catalog Scorecards

[Service Scorecards][12] help you codify your organization's best practices as rules that can be evaluated. By implementing scorecards in your catalog, your teams can measure many dimensions of service quality, including:

- Monitoring coverage
- Production readiness
- Security posture
- Adoption of the latest internal tooling
- Integration checks

Datadog Scorecards include 10 out-of-the-box rules across observability practices, ownership tagging, and production readiness checkpoints. You can also define your own custom rules. For example, you could create a scorecard that contains a set of rules that map to the steps in your security review process, so that you can quickly audit whether each of your services is compliant. These rules might include checks related to CVE analysis, RBAC configuration, or other security parameters.

To add custom rules to your Scorecards dashboard: 

1. Click **Create Rule** on the Scorecards page.
2. Specify the name of the rule, the scorecard it belongs to, a rule description, and the owning team. 
3. Send an outcome of `pass`, `fail`, or `skip` for each `{rule, service}` tuple that you are evaluating to the [Scorecards API][13] `/scorecard/outcomes/batch` endpoint. 
4. View an overview of outcomes in the Scorecards dashboard.

{{< img src="/getting_started/service_catalog/create_rule.jpeg" alt="Create Rule modal to add custom rules in Scorecards dashboard" style="width:90%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com
[2]: /tracing
[3]: /universal_service_monitoring
[4]: /real_user_monitoring
[5]: /getting_started/tagging/unified_service_tagging
[6]: /integrations/servicenow/#service-ingestion
[7]: /service_catalog/setup#import-data-from-other-sources
[8]: https://www.datadoghq.com/blog/github-actions-service-catalog
[9]: https://backstage.io/docs/overview/what-is-backstage
[10]:/api/latest/service-definition
[11]: /service_catalog/add_metadata#metadata-structure-and-supported-versions
[12]: /service_catalog/scorecards
[13]: /api/latest/service-scorecards
