---
title: Cloud Security Management Agent Variables
kind: documentation
---

| Variable                                                | Description                                                                                                                                                                                                                                                                                                                                                |
|---------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| DD_COMPLIANCE_CONFIG_ENABLED                            | Enables CSPM agent (running in the security agent).                                                                                                                                                                                                                                                                                                        |
| DD_COMPLIANCE_CONFIG_HOST_BENCHMARKS_ENABLED            | Enables CSPM host benchmarks (the openscap rules), requires CSPM agent (compliance config enabled).                                                                                                                                                                                                                                                        |
| DD_RUNTIME_SECURITY_CONFIG_ENABLED                      | Enables CWS. Needs to be set for both system probe and security agent to have it correctly set up.                                                                                                                                                                                                                                                         |
| DD_SYSTEM_PROBE_ENABLED                                 | Enables the System Probe, which is an add-on Agent. Similar to the Trace Agent or Process Agent, it supports different functionalities than the vanilla Datadog Agent. It is primarily used with NPM and Workload Security. This is a bit more complex than that since it can also turn on the NPM, network performance monitoring, product in some cases. |
| DD_RUNTIME_SECURITY_CONFIG_REMOTE_CONFIGURATION_ENABLED | Enables the remote configuration rules loading for CWS.                                                                                                                                                                                                                                                                                                    |
| DD_SBOM_ENABLED                                         | Enables the SBOM collection sub-system.                                                                                                                                                                                                                                                                                                                    |
| DD_SBOM_CONTAINER_IMAGE_ENABLED                         | Enables SBOM collection on container images.                                                                                                                                                                                                                                                                                                               |
| DD_CONTAINER_IMAGE_ENABLED                              | Collects container images (owned by container integrations, used to drive the k8s app page where we list container images).                                                                                                                                                                                                                                |
| DD_SBOM_HOST_ENABLED                                    | Enables SBOM collection on hosts themselves.                                                                                                                                                                                                                                                                                                               |

<table>
  <thead>
    <tr>
      <th>Variable</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>DD_COMPLIANCE_CONFIG_ENABLED</td>
      <td>Enables CSPM agent (running in the security agent).</td>
    </tr>
    <tr>
      <td>DD_COMPLIANCE_CONFIG_HOST_BENCHMARKS_ENABLED</td>
      <td>Enables CSPM host benchmarks (the openscap rules), requires CSPM agent (compliance config enabled).</td>
    </tr>
    <tr>
      <td>DD_RUNTIME_SECURITY_CONFIG_ENABLED</td>
      <td>Enables CWS. Needs to be set for both system probe and security agent to have it correctly set up.</td>
    </tr>
    <tr>
      <td>DD_SYSTEM_PROBE_ENABLED</td>
      <td>
        Enables the System Probe, which is an add-on Agent. Similar to the Trace Agent or Process Agent, it supports different functionalities than the vanilla Datadog Agent. It is primarily used with NPM and Workload Security.
        <br><br>
        This is a bit more complex than that since it can also turn on the NPM, network performance monitoring, product in some cases. For legacy reasons 
      </td>
    </tr>
    <tr>
      <td>DD_RUNTIME_SECURITY_CONFIG_REMOTE_CONFIGURATION_ENABLED</td>
      <td>Enables the remote configuration rules loading for CWS.</td>
    </tr>
    <tr>
      <td>DD_SBOM_ENABLED</td>
      <td>Enables the SBOM collection sub-system.</td>
    </tr>
    <tr>
      <td>DD_SBOM_CONTAINER_IMAGE_ENABLED</td>
      <td>Enables SBOM collection on container images.</td>
    </tr>
    <tr>
      <td>DD_CONTAINER_IMAGE_ENABLED</td>
      <td>Collects container images (owned by container integrations, used to drive the k8s app page where we list container images).</td>
    </tr>
    <tr>
      <td>DD_SBOM_HOST_ENABLED</td>
      <td>Enables SBOM collection on hosts themselves.</td>
    </tr>
  </tbody>
</table>