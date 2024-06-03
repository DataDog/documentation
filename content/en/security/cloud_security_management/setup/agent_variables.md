---
title: Cloud Security Management Agent Variables
kind: documentation
---

The Datadog Agent has several environment variables that can be enabled for Cloud Security Management. This article describes the purpose of each environment variable.

<table>
    <tr>
        <th>Variable</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><code>DD_COMPLIANCE_CONFIG_ENABLED</code></td>
        <td>Enables the Cloud Security Posture Management (CSPM) Agent (runs in the Security Agent).</td>
    </tr>
    <tr>
        <td><code>DD_COMPLIANCE_CONFIG_HOST_BENCHMARKS_ENABLED</code></td>
        <td>Enables CSPM host benchmarks. Requires the CSPM Agent (<code>DD_COMPLIANCE_CONFIG_ENABLED</code>).</td>
    </tr>
    <tr>
        <td><code>DD_RUNTIME_SECURITY_CONFIG_ENABLED</code></td>
        <td>Enables Cloud Workload Security (CWS). Must be enabled for both the System Probe and Security Agent.</td>
    </tr>
    <tr>
        <td><code>DD_SYSTEM_PROBE_ENABLED</code></td>
        <td>Enables the System Probe, which is an add-on Agent. Similar to the Trace Agent or Process Agent, it supports different functionalities than the vanilla Datadog Agent. It is primarily used with NPM and CWS.</td>
    </tr>
    <tr>
        <td><code>DD_RUNTIME_SECURITY_CONFIG_REMOTE<br>_CONFIGURATION_ENABLED</code></td>
        <td>Enables Remote Configuration for automatic updates of default Agent rules and automatic deployment of custom Agent rules.</td>
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
        <td><code>DD_CONTAINER_IMAGE_ENABLED</code></td>
        <td>Collects container images.</td>
    </tr>
    <tr>
        <td><code>DD_SBOM_HOST_ENABLED</code></td>
        <td>Enables SBOM collection on hosts.</td>
    </tr>
</table>