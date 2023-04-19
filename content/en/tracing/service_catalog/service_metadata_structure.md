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

Service Catalog uses service definition schemas to store and display relevant metadata about your services. The schemas have built-in validation rules to ensure that only valid values are accepted and you can view warnings in the **Definition** tab on the side panel for any selected services. 

There are two supported versions of the schema:

- V2 is the earliest version, and contains some experimental features, such as `dd-team`, which are removed from v2.1.
- V2.1 supports additional UI elements such as service groupings and fields like application, tier, and lifecycle to make it easier to preserve the context for your service ownership information.


For more information about the latest updates, see the schemas on GitHub.

## Service Definition Schema (v2.1)

The Service Definition Schema is a structure that contains basic information about a service. See the [full schema on GitHub][1].

#### Example
{{< code-block lang="yaml" filename="service.datadog.yaml" collapsible="true" >}}
schema-version: v2.1
dd-service: web-store
team: shopist
contacts:
 - type: slack
   contact: https://datadogincidents.slack.com/archives/C01EWN6319S
application: shopist
description: shopist.com storefront
tier: tier1
lifecycle: production
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
 - name: Source
   type: repo
   provider: github
   url: https://github.com/DataDog/shopist/tree/prod/rails-storefront
 - name: Deployment
   type: repo
   provider: github
   url: https://github.com/DataDog/shopist/blob/prod/k8s/dd-trace-demo/templates/rails-storefront-deployment.yaml
 - name: Deployment Information
   provider: link
   type: doc
   url: https://docs.datadoghq.com/
 - name: Service Documentation
   provider: link
   type: doc
   url: https://docs.datadoghq.com/
tags: []
integrations:
 pagerduty:
   service-url: https://datadog.pagerduty.com/service-directory/XXXXXXX
External Resources (Optional)
{{< /code-block >}}

## Service Definition Schema (v2)

The Service Definition Schema is a structure that contains basic information about a service. See the [full schema on GitHub][2].

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

[1]: https://github.com/DataDog/schema/blob/main/service-catalog/v2.1/schema.json
[2]: https://github.com/DataDog/schema/blob/main/service-catalog/v2/schema.json
