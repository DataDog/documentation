---
title: Compliance Monitoring
kind: documentation
---

<div class="alert alert-warning">
Compliance Monitoring is currently available for private beta. Contact <a href="https://docs.google.com/forms/d/e/1FAIpQLScTA913tNGptcAeNNdWlvgECjekYoDVJwR-OkMtZYnJnq-FWw/viewform">support</a> for more details.
</div>

## Overview

Datadog Compliance Monitoring enables runtime security and continuous compliance monitoring for containers and hosts.

{{< img src="compliance_monitoring/compliance-overview.png" alt="Datadog Compliance Monitoring" >}}

Use **File Integrity Monitoring (FIM)** to watch for changes to key files and directories on hosts or containers in real time or
**Continuous Compliance** checks against your containers, and Kubernetes clusters in order to find configuration issues, as defined in the popular CIS compliance benchmarks for Docker and Kubernetes. You can choose to enable either of these features (or both) based on your needs.

## Further Reading

{{< whatsnext desc="Get Started with Compliance Monitoring:">}}
  {{< nextlink href="/security_monitoring/default_rules">}}<u>Learn about default rules</u>: Out of the box Compliance Monitoring rules for AWS, Docker, and Kubernetes.{{< /nextlink >}}

{{< /whatsnext >}}

