---
bundle: com.datadoghq.dd.service_catalog
bundle_title: Datadog Service Catalog
description: "Get a specific service\u2019s immediate upstream and downstream services.\
  \ The services retrieved are filtered by environment and a primary tag, if one is\
  \ defined."
icon:
  icon_name: ServiceCatalog
  type: icon
input: '#/$defs/GetServiceDependenciesInputs'
inputFieldOrder:
- service
- env
- primary_tag
- time
keywords:
- describe
- get
- lookup
output: '#/$defs/GetServiceDependenciesOutputs'
source: _datadog
title: Get service dependencies
---

Get a specific service’s immediate upstream and downstream services. The services retrieved are filtered by environment and a primary tag, if one is defined.

{{< workflows >}}
