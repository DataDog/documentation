---
title: Service Metadata Structure (JSON Schemas)
kind: documentation
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

Service Catalog uses Service Definition Schemas to store and display relevant metadata about your services. The schemas have built-in validation rules to ensure that only valid values are accepted and you can view warnings in the 'Definition' tab in the side panel for any selected services. 

There are two supported versions of the schema:

- V2 is the earliest version, and contains some experimental features, such as `dd-team` (this is removed from v2.1).
- V2.1 supports additional UI elements like service groupings, as well as fields like application, tier, lifecycle to make it easier to preserve context for your service ownership information.

You can find the latest updates and additional information about the schemas on GitHub.

## Service Definition Schema (v2.1)

The Service Definition Schema is a structure that contains basic information about a service. See the [full schema on GitHub][4].

#### Example
{{< code-block lang="yaml" filename="service.datadog.yaml" collapsible="true" >}}

{{< /code-block >}}

## Service Definition Schema (v2)

The Service Definition Schema is a structure that contains basic information about a service. See the [full schema on GitHub][4].

#### Example
{{< code-block lang="yaml" filename="service.datadog.yaml" collapsible="true" >}}
schema-version: v2
dd-service: web-store
team: shopist
contacts:
  - type: slack
    contact: https://exampleincidents.slack.com/archives/C01EWN6319S
links:
  - name: Demo Dashboard
    type: dashboard
    url: https://app.examplehq.com/dashboard/krp-bq6-362
  - name: Common Operations
    type: runbook
    url: https://examplehq.atlassian.net/wiki/
  - name: Disabling Deployments
    type: runbook
    url: https://examplehq.atlassian.net/wiki/
  - name: Rolling Back Deployments
    type: runbook
    url: https://examplehq.atlassian.net/wiki/
repos:
  - name: Source
    provider: github
    url: https://github.com/Example/shopist/tree/prod/rails-storefront
  - name: Deployment
    provider: github
    url: https://github.com/Example/shopist/blob/prod/k8s/dd-trace-demo/templates/rails-storefront-deployment.yaml
docs:
  - name: Deployment Information
    provider: link
    url: https://docs.datadoghq.com/
  - name: Service Documentation
    provider: link
    url: https://docs.datadoghq.com/
tags: []
integrations:
    pagerduty: https://example.pagerduty.com/service-directory/XYZYX
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
