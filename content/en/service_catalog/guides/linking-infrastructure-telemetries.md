---
title:  Linking Infrastructure Telemetries 
kind: guide
---

The service tag is the primary key for entries in the Service Catalog, and it's the smallest, common unit of analysis for Datadog telemetries through Universal Service Tagging. The service tag can be directly set on k8s pod labels. Setting the k8s tags.datadoghq.com/service label will ensure all pod telemetry (e.g. metrics, logs, resource catalog) to receive the service tag in Datadog. This is the recommended k8s service label to use. 

In comparison, setting the k8s service label only affects metric tagging, not other telemetry. Correctly tagging logs and traces requires setting additional container labels. Therefore, we do not recommend this approach. 