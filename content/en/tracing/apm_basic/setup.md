---
title: Setting Up APM Basic
description: "Configure APM Basic with the Datadog Agent across Kubernetes, Docker, ECS, and Windows environments."
aliases:
- /universal_service_monitoring/setup/
further_reading:
- link: "/tracing/apm_basic/"
  tag: "Documentation"
  text: "Learn about APM Basic"
---

<!-- TODO: This page should be migrated from /universal_service_monitoring/setup.md
using git mv (to preserve history), NOT copied. The content below is a structural
template showing what the final page looks like after the terminology update.

Migration steps:
1. git mv content/en/universal_service_monitoring/setup.md content/en/tracing/apm_basic/setup.md
2. Find-replace "Universal Service Monitoring" / "USM" with "APM Basic" in body text
3. Keep all platform-specific tabs (Helm, Operator, Docker, ECS, Windows, etc.) as-is
4. Keep all config keys as-is (service_monitoring_config, DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED, etc.)
5. Add the terminology note below
6. Confirm whether the "Additional protocols" preview content migrates here or stays separate

For now, this placeholder shows the target structure. The actual content lives at:
/universal_service_monitoring/setup.md
-->

<div class="alert alert-info">APM Basic uses the same Agent configuration as the former Universal Service Monitoring. Configuration keys such as <code>service_monitoring_config</code> and environment variables like <code>DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED</code> are unchanged.</div>

## Supported versions and compatibility

Required Agent version
: APM Basic requires Datadog Agent version 6.40 or 7.40 or later. Some features in Preview require higher versions.

Supported Linux platforms
: Linux Kernel 4.14 and greater<br/>
CentOS or RHEL 8.0 and greater

Supported Windows platforms
: Windows 2012 R2 and greater

Supported application-layer protocols
: HTTP<br/>
HTTPS (OpenSSL)

Known limitations
: APM Basic requires the use of Datadog's `system-probe`, which is not supported on Google Kubernetes Engine (GKE) Autopilot.

## Prerequisites

- If on Linux:
    - Your service is running in a container.
    - **In Preview:** For non-containerized services, see the [instructions here](#additional-configuration).
- If on Windows:
    - Your service is running on a virtual machine.
- Datadog Agent is installed alongside your service. Installing a tracing library is _not_ required.
- The `env` tag for [Unified Service Tagging][1] has been applied to your deployment. The `service` and `version` tags are optional.

## How APM Basic detects service names

<!-- TODO: Migrate the full "How USM detects service names" section from the existing
setup page, replacing "USM" with "APM Basic". Keep the key limitation about
programmatically-set environment variables. -->

APM Basic detects service names from environment variables that exist when a process starts. It reads these values from the operating system: from `/proc/PID/environ` on Linux, or through system APIs on Windows.

## Enabling APM Basic

<!-- TODO: Migrate all platform tabs from existing USM setup page:
- Helm
- Operator
- Kubernetes without Helm
- Docker
- Docker Compose
- Docker Swarm
- Configuration files (Linux)
- Environment variables (Linux)
- Chef
- Puppet
- Ansible
- ECS
- Windows (IIS and non-IIS)

All config values stay the same (service_monitoring_config.enabled: true, etc.)
Only the descriptive text changes from "USM" to "APM Basic".
-->

Enable APM Basic in your Agent by using one of the following methods depending on how your service is deployed and your Agent configured:

_Platform-specific setup instructions will be migrated from the existing Universal Service Monitoring setup page._

## Additional configuration

<!-- TODO: Migrate these sections from existing USM setup page:
- Non-containerized services on Linux
- Go TLS Monitoring
- Node.js TLS Monitoring
- Istio Monitoring
- HTTP/2 monitoring
- Kafka Monitoring (Preview)
-->

## Path exclusion and replacement

<!-- TODO: Migrate the http_replace_rules section from existing USM setup page. -->

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/unified_service_tagging
