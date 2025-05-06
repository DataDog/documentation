---
title: Service Discovery
further_reading:
- link: "/agent/fleet_automation/"
  tag: "Documentation"
  text: "Fleet Automation"
- link: "/tracing/trace_collection/single_step_apm"
  tag: "Documentation"
  text: "Single Step APM Instrumentation"
- link: "/data_streams/"
  tag: "Documentation"
  text: "Data Streams Monitoring"
---

## Overview

Service Discovery provides visibility into the monitoring coverage of your application services within Datadog. It automatically discovers services running across your infrastructure, helping you identify potential observability gaps, such as services running without APM enabled.

Service Discovery is accessed through the **[Fleet Automation > Services][1]** page.

### Key benefits

- **Discover all services**: View both monitored and unmonitored services running in your fleet in one centralized location.
- **Demystify services**: Understand the potential importance of unmonitored services using contextual information like infrastructure footprint, resource consumption, network activity, configuration details, and tags.
- **Close observability gaps**: Receive recommendations and guided instructions to instrument services with APM or enable other relevant Datadog products such as [Data Streams Monitoring (DSM)][3], prioritizing Single Step Instrumentation where available.
- **Triage effectively**: Prioritize which services to monitor using sortable metadata columns, facet filtering, and an organization-wide ignore list for noisy or irrelevant services.

### How it works

1. The Datadog Agent inspects running processes and container metadata on supported hosts.
2. Processes are automatically grouped into services based on a defined naming hierarchy (see [Discovered service naming](#discovered-service-naming).
3. Datadog checks if discovered services are emitting traces to Datadog APM.
4. Services are displayed in **Fleet Automation > Services** under either **Monitored with APM** or **Not Sending Traces**.
5. Contextual metadata (CPU, memory, network I/O, tags, infrastructure links) is associated with each service to aid prioritization.
6. Short-lived processes (running for less than 1 minute) are automatically ignored to reduce noise.

### Discovered service naming

Service Discovery automatically identifies and names services based on a priority order of available identifiers:

1. Existing Datadog service tags (like `DD_SERVICE`) if present.
2. Container labels (for containerized services).
3. Command-line arguments and process information.
4. Language-specific manifest files (for example, `package.json` for Node.js).

For Java enterprise web applications (specifically JBoss, Websphere, Tomcat, Jetty, and Weblogic), multiple web applications running in the same process are displayed as individual services in the unmonitored services list, with visual indicators showing they belong to the same process.

## Requirements

Service Discovery requires the Datadog Agent and is supported on specific operating environments:

| Environment                   | Minimum Agent Version |
|-------------------------------|-----------------------|
| Linux Hosts (x86-64)          | `[7.xx.x+]`           |
| Docker Containers (on Linux)  | `[7.xx.x+]`           |
| Kubernetes (Helm Chart)       | `[7.xx.x+]`           |
| Kubernetes (Datadog Operator) | `[7.xx.x+]`           |

<div class="alert alert-info">Service Discovery supports Linux (x86-64) environments only. Windows, ARM architectures, and serverless environments are not supported.</div>

## Setup

Enable Service Discovery by installing the latest version of the Datadog Agent with the Service Discovery feature turned on.

{{< tabs >}}
{{% tab "Linux hosts" %}}

To enable Service Discovery on Linux hosts, install the latest version of the Datadog Agent and use the toggle in the installation UI:

1. Navigate to [**Fleet Automation > Install Agents**][100]
2. Follow the installation instructions
3. During setup, ensure that the **Service Discovery** toggle is turned on

After installation, Service Discovery is automatically enabled.

[100]: https://app.datadoghq.com/fleet/install-agent/latest?platform=linux

{{% /tab %}}

{{% tab "Docker" %}}

To enable Service Discovery for Docker containers:

1. Navigate to [**Fleet Automation > Install Agents**][200]
2. Follow the installation instructions
3. Ensure that the **Service Discovery** toggle is turned on during setup

The generated Docker `run` command includes the necessary settings to enable Service Discovery.

[200]: https://app.datadoghq.com/fleet/install-agent/latest?platform=docker

{{% /tab %}}

{{% tab "Kubernetes" %}}

To enable Service Discovery for Kubernetes environments:

1. Navigate to [**Fleet Automation > Install Agents**][300]
2. Follow the installation instructions for either Helm chart or Datadog Operator
3. Ensure that the **Service Discovery** toggle is turned on during setup

The generated configuration includes the necessary settings to enable Service Discovery.

[300]: https://app.datadoghq.com/fleet/install-agent/latest?platform=kubernetes

{{% /tab %}}
{{< /tabs >}}

Allow a few minutes for data to appear on the **Fleet Automation > Services** page.

## Explore discovered services

Navigate to **[Fleet Automation > Services][1]** in Datadog to view discovered services. The page presents two main views:

- **Not Sending Traces**: Services discovered by the Agent that are not sending trace data to Datadog APM.
- **Monitored with APM**: Services actively sending trace data to Datadog APM.

### Monitored with APM

This view lists services already instrumented and sending trace data to Datadog APM. It provides insights into the current monitoring state:

- **Type**: Shows the service type with its corresponding icon.
- **Service**: Displays the service name.
- **APM SDK**: Shows the versions of Datadog tracing libraries used by the service instances.
- **Telemetry**: Indicates the types of telemetry being collected (Traces, Logs, USM, DSM, Profiling).

### Not sending traces

This view lists services detected on your infrastructure that are not monitored by Datadog APM. Understanding these services is the first step toward closing observability gaps.

For each unmonitored service, Datadog provides contextual information to help you assess its importance and prioritize instrumentation:

- **Service**: The name assigned to the service, based on the naming hierarchy described above.
- **Infra**: An overview of the hosts or containers the service is running on, displayed as container icons with counts. Clicking this provides links to the relevant infrastructure components in Datadog.
- **CPU Usage**: Shows CPU cores usage.
- **Memory Usage**: Shows memory usage.
- **Bytes Received**: Shows incoming network traffic.
- **Bytes Sent**: Shows outgoing network traffic.

#### Triaging unmonitored services

- **Sorting**: By default, services are sorted by infrastructure footprint (descending). You can sort by other columns like CPU, Memory, or Network Activity to prioritize based on resource usage or traffic.
- **Filtering**: Use the search bar and facets to narrow down the list.
- **Ignoring Services**: If a discovered service is noisy or not relevant for monitoring (such as temporary utilities or test workloads), hover over the service and click **Ignore**. Ignored services are hidden from the main list but can be viewed and restored from the **Ignored Services** toggle.

**Enabling APM:**

For services you decide to monitor, click the **Enable APM** button. Datadog provides instructions to enable APM using **Single Step Instrumentation** for supported languages.

## Troubleshooting

- **No services listed under "Not Sending Traces"**:
  - Verify the Datadog Agent version meets the minimum requirement.
  - Confirm that Service Discovery is correctly enabled during Agent installation.
  - Ensure services have been running for more than 1 minute on supported platforms.
  - Allow a few minutes after Agent installation for data to populate.
- **Some expected services are missing**:
  - Check if the service runs for less than 1 minute.
  - Confirm the service is running on a supported platform (Linux x86-64).

If issues persist, collect an [Agent flare][4] and contact [Datadog Support][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet/services
[2]: /help/
[3]: /data_streams/
[4]: /agent/troubleshooting/send_a_flare/

