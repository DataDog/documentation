---
title: Add Metadata to Services through the Datadog Service Definition API
kind: documentation
aliases:
- /tracing/faq/service_definition_api/
further_reading:
- link: "/tracing/service_catalog/"
  tag: "Documentation"
  text: "Datadog Service Catalog"
- link: "/api/latest/service-definition/"
  tag: "Documentation"
  text: "Service Definition API"
- link: "https://github.com/DataDog/schema/blob/main/service-catalog/v2/schema.json"
  tag: "GitHub"
  text: "Service Definition Schema"
---

## Overview

A service is an independent, deployable unit of software. Datadog [Unified Service Tagging][1] provides a standard way to manage and monitor service ownership consistently across every telemetry type. Service Catalog allows you to add user-defined service entries and manage metadata for existing services from APM, USM, and RUM. 

For more details about creating, getting, and deleting service definitions, see the [Service Definitions API reference][8].

## Service Definition Schema (v2)

The Service Definition Schema is a structure that contains basic information about a service. See the [full schema on GitHub][4].


#### Example
{{< code-block lang="yaml" filename="service.definition.yaml" collapsible="true" >}}
schema-version: v2
dd-service: web-store
team: shopist
contacts:
  - type: slack
    contact: https://datadogincidents.slack.com/archives/C01EWN6319S
links:
  - name: Demo Dashboard
    type: dashboard
    url: https://app.datadoghq.com/dashboard/krp-bq6-362
  - name: Common Operations
    type: runbook
    url: https://datadoghq.atlassian.net/wiki/
  - name: Disabling Deployments
    type: runbook
    url: https://datadoghq.atlassian.net/wiki/
  - name: Rolling Back Deployments
    type: runbook
    url: https://datadoghq.atlassian.net/wiki/
repos:
  - name: Source
    provider: github
    url: https://github.com/DataDog/shopist/tree/prod/rails-storefront
  - name: Deployment
    provider: github
    url: https://github.com/DataDog/shopist/blob/prod/k8s/dd-trace-demo/templates/rails-storefront-deployment.yaml
docs:
  - name: Deployment Information
    provider: link
    url: https://docs.datadoghq.com/
  - name: Service Documentation
    provider: link
    url: https://docs.datadoghq.com/
tags: []
integrations:
External Resources (Optional)
{{< /code-block >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/unified-service-tagging/
[2]: /tracing/service_catalog/
[3]: /account_management/api-app-keys/
[4]: https://github.com/DataDog/schema/blob/main/service-catalog/v2/schema.json
[7]: https://app.datadoghq.com/services/setup
[8]: /api/latest/service-definition/
