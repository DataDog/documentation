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

Service Discovery provides visibility into the monitoring coverage of your application services within Datadog. It automatically discovers services running across your infrastructure, helping you identify potential observability gaps, such as services running without Application Performance Monitoring (APM) enabled.

Service Discovery is accessed through the **[Fleet Automation > Services][1]** page.

### Key benefits

- **Discover all services**: View both monitored and unmonitored services running in your fleet in one centralized location.
- **Demystify services**: Understand the potential importance of unmonitored services using contextual information like infrastructure footprint, resource consumption, network activity, configuration details, and tags.
- **Close observability gaps**: Receive recommendations and guided instructions to instrument services with APM or enable other relevant Datadog products like Data Streams Monitoring (DSM), prioritizing Single Step Instrumentation where available.
- **Triage effectively**: Prioritize which services to monitor using sortable columns, powerful search and facet filtering, and an organization-wide ignore list for noisy or irrelevant services.

## How it works

1.  The Datadog Agent's System Probe inspects running processes and container metadata on supported hosts.
2.  Processes are automatically grouped into services based on a defined naming hierarchy (see the **Discovered service naming** section below).
3.  The feature checks if discovered services are emitting traces to Datadog APM.
4.  Services are displayed in **Fleet Automation > Services** under either **Monitored with APM** or **Not Sending Traces**.
5.  Contextual metadata (CPU, memory, network I/O, tags, infrastructure links) is associated with each service to aid prioritization.
6.  Short-lived processes (running for less than 1 minute) are automatically ignored to reduce noise.

## Discovered service naming

Service Discovery automatically identifies and names services based on a priority order of available identifiers:

1.  Existing Datadog service tags (like `DD_SERVICE`) if present.
2.  Container labels (for containerized services).
3.  Command-line arguments and process information.
4.  Language-specific manifest files (for example, `package.json` for Node.js).

For Java enterprise web applications (specifically JBoss, Websphere, Tomcat, Jetty, and Weblogic), multiple web applications running in the same process are displayed as individual services in the unmonitored services list, with visual indicators showing they belong to the same process.

## Requirements

Service Discovery requires the Datadog Agent and is supported on specific operating environments:

| Environment                   | Minimum Agent Version                       | Notes                                                  |
|:------------------------------|:--------------------------------------------|:-------------------------------------------------------|
| Linux Hosts (x86-64)          | `[Agent version, for example, 7.xx.x+]`     |                                                        |
| Docker Containers (on Linux)  | `[Agent version, for example, 7.xx.x+]`     |                                                        |
| Kubernetes (Helm Chart)       | `[Helm chart version, for example, 3.x.x+]` | Requires Agent `[Agent version, for example, 7.xx.x+]` |
| Kubernetes (Datadog Operator) | `[Operator version, for example, 1.x.x+]`   | Requires Agent `[Agent version, for example, 7.xx.x+]` |

<div class="alert alert-info">Service Discovery supports Linux (x86-64) environments only. Windows, ARM architectures, and serverless environments are not supported.</div>

## Setup

Enable Service Discovery through the Datadog Agent configuration.

Choose the method corresponding to your environment:

{{< tabs >}}
{{% tab "Linux hosts" %}}

You can enable Service Discovery using either a configuration file change or an environment variable.

**Method 1: Configuration file**

1.  Edit the Agent's System Probe configuration file: `/etc/datadog-agent/system-probe.yaml`.
2.  Add or uncomment the `discovery` section and set `enabled` to `true`:
    ```yaml
    # /etc/datadog-agent/system-probe.yaml
    discovery:
      enabled: true
    ```
3.  Restart the Datadog Agent:
    ```bash
    sudo systemctl restart datadog-agent
    ```

**Method 2: Environment variable**

1.  Set the following environment variable for the Agent process:
    ```bash
    export DD_DISCOVERY_ENABLED=true
    ```
2.  Restart the Datadog Agent:
    ```bash
    sudo systemctl restart datadog-agent
    ```

{{% /tab %}}

{{% tab "Docker containers" %}}

Add the environment variable to your Docker run command or Compose file:

**`docker run` example:**
```bash
docker run -e DD_DISCOVERY_ENABLED=true [other options] datadog/agent:[latest Agent version tag]
```

**docker-compose.yml example:**
```yaml
# docker-compose.yml
services:
  datadog-agent:
    image: datadog/agent:[latest Agent version tag]
    environment:
      - DD_DISCOVERY_ENABLED=true
      # - DD_API_KEY=<YOUR_API_KEY>
      # Other environment variables...
    # Other service configuration...
```

Ensure you restart your container after making changes.

{{% /tab %}}

{{% tab "Kubernetes" %}}

**Method 1: Helm chart**

If you install the Agent using the official Datadog Helm chart (version `[Helm chart version, for example, 3.x.x+]` or later):

1.  Update your `values.yaml` file (or use `--set` flags) to include:
    ```yaml
    # values.yaml
    datadog:
      discovery:
        enabled: true
      # Ensure you are using a compatible Agent image tag
      agents:
        image:
          tag: "[Agent version, for example, 7.xx.x]" # Use the required Agent version or later
    ```
2.  Upgrade your Helm release:
    ```bash
    helm upgrade <your-release-name> datadog/datadog -f values.yaml -n <your-namespace>
    ```

**Method 2: Datadog Operator**

If you install the Agent using the Datadog Operator (version `[Operator version, for example, 1.x.x+]` or later):

1.  Edit your `DatadogAgent` custom resource definition (`datadog-agent.yaml` or similar):
    ```yaml
    # datadog-agent.yaml
    apiVersion: datadoghq.com/v2alpha1 # Or applicable API version
    kind: DatadogAgent
    metadata:
      name: datadog
    spec:
      features:
        serviceDiscovery:
          enabled: true
      override:
        nodeAgent: # Or clusterAgent if applicable
          image:
            tag: "[Agent version, for example, 7.xx.x]" # Use the required Agent version or later
    ```
2.  Apply the changes:
    ```bash
    kubectl apply -f datadog-agent.yaml -n <your-namespace>
    ```

{{% /tab %}}
{{< /tabs >}}

After enabling Service Discovery and restarting the Agent(s), allow a few minutes for data to appear on the **Fleet Automation > Services** page.

## Explore discovered services

Navigate to **Fleet Automation > Services** in Datadog to view discovered services. The page presents two main views:

- **Not Sending Traces**: Services discovered by the Agent that are not sending trace data to Datadog APM.
- **Monitored with APM**: Services actively sending trace data to Datadog APM.

### Monitored with APM

This view lists services already instrumented and sending trace data to Datadog APM. It provides insights into the current monitoring state:

- **Type**: Shows the service type with its corresponding icon.
- **Service**: Displays the service name.
- **APM SDK**: Shows the versions of Datadog tracing libraries used by the service instances.
- **Telemetry**: Indicates the types of telemetry being collected (Traces, Logs, USM, DSM, Profiling).

### Not sending traces

This view lists services detected on your infrastructure that are not currently monitored by Datadog APM. Understanding these services is the first step toward closing observability gaps.

For each unmonitored service, Datadog provides contextual information to help you assess its importance and prioritize instrumentation:

- **Service**: The name assigned to the service, based on the naming hierarchy described above.
- **Infra**: An overview of the hosts or containers the service is running on, displayed as container icons with counts. Clicking this provides links to the relevant infrastructure components in Datadog.
- **CPU Usage**: Shows CPU cores usage.
- **Memory Usage**: Shows memory usage in GB.
- **Bytes Received**: Shows incoming network traffic.
- **Bytes Sent**: Shows outgoing network traffic.

#### Triaging unmonitored services

- **Sorting**: By default, services are sorted by infrastructure footprint (descending). You can sort by other columns like CPU, Memory, or Network Activity to prioritize based on resource usage or traffic.
- **Filtering**: Use the search bar and facets to narrow down the list by:
  - Host infrastructure tags
  - Container labels, names, and tags
  - Service names
  - Environment (`env:`)
  - Language (`language:`) [Verify exact facet key]
  - Infrastructure type (containers vs hosts) [Verify exact facet key]
  - Team tags (`team:`) [Verify exact facet key]
  - Operating System and versions
  - Cloud Provider
  - Region

- **Ignoring Services**: If a discovered service is noise or not relevant for monitoring (such as temporary utilities or test workloads), hover over the service and click **Ignore**. Ignored services are hidden from the main list but can be viewed and restored from the **Ignored Services** toggle.

**Enabling APM:**

For services you decide to monitor, click the **Enable APM** button. Datadog provides instructions prioritizing **Single Step Instrumentation** for supported languages ([List supported languages, for example, Java, Python, Ruby, Node.js, .NET, PHP - Placeholder]). For languages not supported by Single Step (like Go and C++ [Verify list - Placeholder]), manual instrumentation instructions are provided.

## Limitations

- **Platform Support**: Currently supports Linux (x86-64) environments only. Windows, ARM architectures, and serverless runtimes are not yet supported.
- **Process Runtime**: Services must run for at least 1 minute to be discovered. Short-lived processes are ignored.
- **Service Types**: Currently discovers Web server and Custom service types [Verify list and add definitions if helpful].
- **Service Renaming**: Renaming discovered services directly within the Service Discovery UI is not supported in the initial release. Services should be named using standard Datadog tagging conventions (for example, `DD_SERVICE` environment variable, container labels).

## Troubleshooting

- **No services listed under "Not Sending Traces"**:
  - Verify the Datadog Agent version meets the minimum requirement.
  - Confirm that Service Discovery is correctly enabled in the Agent configuration (`discovery.enabled: true` or `DD_DISCOVERY_ENABLED=true`) and that the Agent has been restarted.
  - Ensure services have been running for more than 1 minute on supported platforms.
  - Allow a few minutes after Agent restart for data to populate.
- **Some expected services are missing**:
  - Check if the service runs for less than 1 minute.
  - Confirm the service is running on a supported platform (Linux x86-64).
- **Missing Kubernetes services**:
  - Ensure both the Node Agent and Cluster Agent (if used) meet the minimum version requirements and have Service Discovery enabled where applicable.
  - Verify RBAC permissions allow the Agent to access necessary process and container metadata.

If issues persist, gather an Agent flare and contact [Datadog Support][2].

[1]: https://app.datadoghq.com/fleet/services
[2]: /help/