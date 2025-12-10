---
title: Container Log Collection Troubleshooting
description: Troubleshoot common issues with the log collection in containerized environments
aliases:
- /logs/guide/docker-logs-collection-troubleshooting-guide/
further_reading:
- link: "/containers/kubernetes/log"
  tag: "Documentation"
  text: "Kubernetes Log Collection"
- link: "/containers/docker/log"
  tag: "Documentation"
  text: "Docker Log Collection"
---

## Overview
a

## Log collection context
a
### Log files
a
### Agent autodiscovery
a
#### Container collect all configuration
a

{{< tabs >}}
{{% tab "Datadog Operator" %}}
a
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    #(...)
  features:
```

{{% k8s-operator-redeploy %}}
{{% /tab %}}

{{% tab "Helm" %}}
b
```yaml
datadog:
  #(...)
  
```

{{% k8s-helm-redeploy %}}
{{% /tab %}}

{{% tab "Containerized Agent" %}}
c
```yaml
```


{{% /tab %}}
{{< /tabs >}}


#### Autodiscovery configuration
a

### Tagging
a

## Troubleshooting
a 
### Agent status
a 
### Agent configcheck
a 
### Agent stream-logs
a 
### Capturing the raw log file
a

## Common issues
a
### Hostname preprocessing
a
### Missing host-level tags on new hosts or nodes
a
### Missing tags on new containers or pods
a
### Short lived pods
a
### Docker log collection from file issues
a
### Host based Agent
a
### Different Docker log driver
a


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}