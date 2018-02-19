---
title: Using Autodiscovery with Docker Agent v6
kind: documentation
---

The autodiscovery system on Agent v6 is faster and more reliable than the [Agent v5 autodiscovery](/agent/v5/autodiscovery). 

All documented use cases are supported, please contact our support team if you run into issues.

## Kubernetes

When using Kubernetes, the Autodiscovery system now sources information from the kubelet, instead of the Docker daemon. This allows the autodiscovery to work without access to the Docker socket, and enable a more consistent experience accross all parts of the agent.  
The side effect of that is that templates in Docker labels are not supported when using the kubelet AD listener. Templates in pod annotations still work as intended.

When specifying AD templates in pod annotations, the new annotation name prefix is ad.datadoghq.com/. the previous annotation prefix service-discovery.datadoghq.com/ is still supported for Agent6 but support will be removed in Agent7.

## Other orchestrators

Autodiscovery templates in Docker labels still work, with the same com.datadoghq.ad. name prefix.

The identifier override label has been renamed from com.datadoghq.sd.check.id to com.datadoghq.ad.check.id for consistency. The previous name is still supported for Agent6 but support will be removed in Agent7.