---
title: Getting Started with Oracle Cloud Infrastructure (OCI)
description: "Integrate your Oracle Cloud Infrastructure environment with Datadog for comprehensive monitoring"
further_reading:
    - link: 'https://www.datadoghq.com/blog/monitor-oci-with-datadog/'
      tag: 'Blog'
      text: 'Monitor Oracle Cloud Infrastructure with Datadog'
    - link: 'https://www.datadoghq.com/blog/datadog-oci-quickstart/'
      tag: 'Blog'
      text: 'Accelerate Oracle Cloud Infrastructure monitoring with Datadog OCI QuickStart'
    - link: '/integrations/oracle-cloud-infrastructure'
      tag: 'Documentation'
      text: 'Oracle Cloud Infrastructure integration'
    - link: '/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/'
      tag: 'Guide'
      text: 'Why should I install the Datadog Agent on my cloud instances?'
---

{{< jqmath-vanilla >}}

## Overview

Use this guide to get started with monitoring your Oracle Cloud Infrastructure (OCI) environment. Datadog's QuickStart setup simplifies the integration process, automatically provisioning the infrastructure needed to collect metrics, logs, and resource data from your OCI tenancy.

{{% collapse-content title="Prerequisites" level="h4" expanded=false id="prerequisites" %}}

### In OCI

Your OCI user account needs the following:

- The **Identity Domain Administrator** role
- Ability to create a user, user group, and dynamic group in the Identity Domain
- Ability to create policies in the root compartment

You must also:
- Be logged into the tenancy you want to integrate
- Have the Home Region selected in the OCI console

### In Datadog

A [Datadog account][1] with permissions to create API and application keys.

**Note**: The OCI integration is restricted to one integration per tenancy. All OCI Commercial regions (in the OC1 realm) that existed as of January 1, 2026 are supported.

{{% /collapse-content %}}

## Setup

Datadog's QuickStart for OCI is a fully managed setup experience that provisions all necessary infrastructure in your tenancy. The setup automatically creates Oracle Service Connector Hubs to stream metrics and logs to Datadog, and continuously discovers new resources and compartments as your environment grows.

**Note**: Before starting, consider [requesting a service limit increase][4] for Service Connector Hubs. The approximate number needed is:

$$\\text"Service Connector Hubs" = \text"Number of compartments in tenancy" / \text"5"\$$

### Configure the Datadog OCI integration tile

1. Go to the [Datadog OCI integration tile][3] and click **Add New Tenancy**.

2. Select or create a Datadog API key to use for the integration.
3. Create a Datadog application key.
4. Enable or disable logs using the toggle.
5. Click **Create OCI Stack**. This opens the Oracle Resource Manager in the OCI console to complete deployment.
   **Note**: Deploy this stack only once per tenancy.

### Deploy the QuickStart ORM stack

1. In the OCI console, accept the Oracle Terms of Use.
2. Leave the option to use custom Terraform providers unchecked.
3. Use the default working directory, or optionally choose a different one.
4. Click **Next**.
5. Leave the `(Optional) Choose specific subnet(s)` section blank. QuickStart automatically creates a new Virtual Cloud Network (VCN) and subnet in each region, providing the simplest setup.
   
   **Advanced option**: To use existing subnets (maximum of one per OCI region), provide the subnet OCIDs (one per line, without commas). Format: `ocid1.subnet.oc[0-9].*`. Example: `ocid1.subnet.oc1.iad.abcedfgh`.
   If using existing subnets, ensure each VCN has HTTP egress through NAT Gateway, a Service Gateway for "All Services In Oracle Services Network", appropriate route table rules, and security rules for HTTP requests.

6. Leave the `(Optional) Choose a User` section blank. QuickStart creates a new User and Group in your current OCI Identity Domain, simplifying IAM setup.
   
   **Advanced option**: To use an existing User and Group, provide both the **Group ID** and **User ID** OCIDs. The user must be a member of the specified group.

7. Leave the `(Optional) Advanced configuration` section blank for most use cases.
   
   **Advanced options**:
   - **Compartment**: Specify an existing compartment for Datadog-created resources (default creates a new "Datadog" compartment).
   - **Domain**: Provide an Identity Domain OCID to override where the User and Group are created. Requires the **Identity Domain Administrator** role in that domain.

8. Click **Next**.
9. Click **Create**, and wait up to 30 minutes for the deployment to complete.

### Complete the setup in Datadog

Return to the [Datadog OCI integration tile][3] and click **Ready!**

### Validation

Wait up to 10 minutes for data to start being collected, and then view `oci.*` metrics in the [OCI integration overview dashboard][5] or [Metrics Explorer page][6] in Datadog.

{{< img src="getting_started/integrations/oci/oci-dashboard.png" alt="The OCI overview dashboard in Datadog with various metrics and graphs from Oracle Cloud Infrastructure services">}}

<div class="alert alert-warning">OCI function metrics (<code>oci.faas</code> namespace) and container instance metrics (<code>oci_computecontainerinstance</code> namespace) are in Preview.</div>

## Configuration

After completing the setup, a configuration tab for the tenancy becomes available on the left side of the [Datadog OCI integration tile][3]. Apply tenancy-wide data collection configurations as outlined below.

### Add regions

On the **General** tab, select the regions for data collection from the **Regions** checkbox list. Region selections apply to the entire tenancy, for both metrics and logs.

**Note**: If you used the QuickStart setup method, and afterward subscribed to a new OCI region, reapply the initial setup stack in ORM. The new region then becomes available in the Datadog OCI tile.

### Metric and log collection

Use the **Metric collection** and **Log collection** tabs to configure which metrics and logs are sent to Datadog:

- **Enable** or **disable** collection of metrics or logs for the entire tenancy.
- **Include** or **exclude** specific compartments based on `key:value` format compartment tags. For example:
   - `datadog:monitored,env:prod*` includes compartments if **either** of these tags is present.
   - `!env:staging,!testing` excludes compartments only if **both** tags are present.
   - `datadog:monitored,!region:us-phoenix-1` includes compartments that both have the tag `datadog:monitored` and do not have the tag `region:us-phoenix-1`.
- **Enable** or **disable** collection for specific OCI services.

**Notes**:
- After modifying tags in OCI, it may take up to 15 minutes for the changes to appear in Datadog.
- In OCI, tags are not inherited by child compartments; each compartment must be tagged individually.

### Resource collection

On the **Resource Collection** tab of the [Datadog OCI integration tile][3], click the **Enable Resource Collection** toggle. Resources are visible in the [Datadog Resource Catalog][7].

## Get more from the Datadog platform

### Install the Agent for deeper visibility

While the OCI integration automatically collects service-level metrics through Oracle Cloud Monitoring, installing the [Datadog Agent][8] on your compute instances unlocks deeper infrastructure and application insights:

- **System-level metrics** with sub-second granularity for CPU, memory, disk, and network
- **Process-level visibility** to understand resource consumption by application
- **Custom metrics** from your applications through [DogStatsD][12]
- **Distributed traces** for end-to-end request visibility
- **Logs** correlated with metrics for faster troubleshooting

The Agent installs with a single command for most operating systems, including Oracle Linux. See the [Agent installation page][9] for instructions, or read [why you should install the Agent on cloud instances][13] for more details on the benefits.

### Using the Datadog Agent with OCI Kubernetes Engine (OKE)

For containerized environments on OKE, you can use the [Datadog Agent for Kubernetes][14]. Use the dedicated Kubernetes documentation to deploy the Agent in your OKE cluster and collect metrics, logs, and traces from your containerized applications.

## Explore related services

### GPU monitoring

Monitoring OCI GPU instances is essential for ensuring optimal performance and reliability of your high-performance computing workloads. The [OCI GPU integration][22] provides a comprehensive set of GPU metrics through the `gpu_infrastructure_health` namespace, enabling you to track the health, capacity, throughput, status, and performance of your [GPU instances][23]. 

After setting up the OCI integration, ensure that the GPU-related namespaces are included in your metric collection configuration. See the **GPU** section of the [OCI Overview dashboard][29] (created automatically when you set up the main OCI integration) for an overview of your GPU infrastructure.

### Cloud Cost Management

Datadog's [Oracle Cloud Cost Management][24] provides insights for engineering and finance teams to understand how infrastructure changes impact costs, allocate spend across your organization, and identify potential improvements. 

To enable Cloud Cost Management for OCI:
1. Ensure you have configured the OCI integration as described above.
2. Follow the setup instructions in the [Oracle Cloud Cost Management documentation][24] to enable cost data collection.

### Cloud SIEM

Cloud SIEM provides real-time analysis of operational and security logs, using out-of-the-box integrations and rules to detect and investigate threats. 

To use Cloud SIEM with your OCI environment:
1. Ensure log collection is enabled in your OCI integration configuration.
2. Review [Getting Started with Cloud SIEM][25] to configure threat detection.
3. Follow the [OCI configuration guide for Cloud SIEM][26] to set up specific log sources and security rules for OCI.

Cloud SIEM analyzes OCI logs to detect:
- Unauthorized access attempts
- Suspicious API calls
- Configuration changes that may introduce security risks
- Compliance violations

## Troubleshooting

If you encounter issues with the OCI integration, see the [OCI Integration Troubleshooting guide][27].

Need help? Contact [Datadog support][28].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/
[3]: https://app.datadoghq.com/integrations/oracle-cloud-infrastructure
[4]: https://docs.oracle.com/iaas/Content/General/Concepts/servicelimits.htm#Requesti
[5]: https://app.datadoghq.com/dash/integration/31417/oracle-cloud-infrastructure-oci-overview
[6]: https://app.datadoghq.com/metric/explorer
[7]: https://docs.datadoghq.com/infrastructure/resource_catalog/
[8]: /getting_started/agent/
[9]: https://app.datadoghq.com/account/settings/agent/latest
[12]: /developers/dogstatsd/?tab=hostagent
[13]: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
[14]: /agent/kubernetes/?tab=helm
[22]: /integrations/oci_gpu/
[23]: https://www.oracle.com/cloud/compute/#gpu
[24]: /cloud_cost_management/setup/oracle/
[25]: /getting_started/cloud_siem/
[26]: /security/cloud_siem/guide/oci-config-guide-for-cloud-siem/
[27]: /integrations/guide/oci-integration-troubleshooting
[28]: /help/
[29]: https://app.datadoghq.com/dash/integration/31417/oracle-cloud-infrastructure-oci-overview