---
title: Cloud Security Agent Variables
aliases:
  - /security/cloud_security_management/setup/agent_variables
---

The Datadog Agent has several environment variables that can be enabled for Cloud Security. This article describes the purpose of each environment variable.

<table>
    <tr>
        <th>Variable</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><code>DD_COMPLIANCE_CONFIG_ENABLED</code></td>
        <td>Enables the compliance module of the Security Agent, used by Misconfigurations.</td>
    </tr>
    <tr>
        <td><code>DD_COMPLIANCE_CONFIG_HOST_BENCHMARKS_ENABLED</code></td>
        <td>Enables Misconfigurations host benchmarks. Enabled by default. Requires the compliance module of the Security Agent (<code>DD_COMPLIANCE_CONFIG_ENABLED</code>).</td>
    </tr>
    <tr>
        <td><code>DD_RUNTIME_SECURITY_CONFIG_ENABLED</code></td>
        <td>Enables Workload Protection. Must be enabled for both the System Probe and Security Agent.</td>
    </tr>
    <tr>
        <td><code>DD_SYSTEM_PROBE_ENABLED</code></td>
        <td>Deprecated. Not required for Workload Protection, because the System Probe starts automatically when <code>DD_RUNTIME_SECURITY_CONFIG_ENABLED</code> is set. Setting <code>DD_SYSTEM_PROBE_ENABLED</code> on its own also enables Cloud Network Monitoring (CNM).</td>
    </tr>
    <tr>
        <td><code>DD_RUNTIME_SECURITY_CONFIG_REMOTE<br>_CONFIGURATION_ENABLED</code></td>
        <td>Enables Remote Configuration for automatic updates of default Agent rules and automatic deployment of custom Agent rules. Enabled by default.</td>
    </tr>
    <tr>
        <td><code>DD_SBOM_ENABLED</code></td>
        <td>Enables the Software Bill of Materials (SBOM) collection subsystem.</td>
    </tr>
    <tr>
        <td><code>DD_SBOM_CONTAINER_IMAGE_ENABLED</code></td>
        <td>Enables SBOM collection on container images.</td>
    </tr>
    <tr>
        <td><code>DD_SBOM_HOST_ENABLED</code></td>
        <td>Enables SBOM collection on hosts.</td>
    </tr>
    <tr>
        <td><code>DD_SBOM_CONTAINER_IMAGE_CONTAINER_EXCLUDE</code></td>
        <td>Allows denylisting of specific containers from SBOM collection.</td>
    </tr>
    <tr>
        <td><code>DD_SBOM_CONTAINER_IMAGE_CONTAINER_INCLUDE</code></td>
        <td>Allows allowlisting of specific containers in SBOM collection.</td>
    </tr>
</table>
