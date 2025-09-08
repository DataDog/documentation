---
title: Hosts and Containers
disable_toc: false
---

The [Hosts and Containers][1] inventory in Datadog Workload Protection provides a unified visibility layer for host-level agent deployment, configuration health, and security feature status. 

**Hosts and Containers** enables DevSecOps teams to verify whether the following protections are properly deployed and running across environments:

- [Workload Protection][3]
- [CSM Misconfigurations][2]
- [Container Vulnerability Scanning][4]
- [Host Vulnerability Scanning][4]
- It also helps identify which hosts and containers are running old versions of the Agent.

**Hosts and Containers** also provides remediation guidance for missing protections.

## Use cases

Here are some common DevSecOps use cases for the [Hosts and Containers][1] inventory feature.

### Assess coverage status

To identify hosts where runtime threat detection is not configured, do the following:

1. In [Hosts and Containers][1], set the following facets to **false**:
   - **Workload Protection Enabled**
   - **Misconfigurations Enabled**
   - **Hosts VM Enabled**
   - **Containers VM Enabled**
   
   The hosts and containers missing one or more of these features are shown with an orange icon. This list flags coverage gaps that expose the workload to undetected process, file, or network-level threats.
2. For remediation guidance, hover over the icon for a feature and click **Configure**.

<div class="alert alert-info">
Filter by <b>Containers VM Enabled: true</b> to ensure scanning is applied to ephemeral container workloads too.
</div>

### Validate Agent health

To validate Agent health, do the following:

1. In the **Agent Version** column, look for older versions identified with yellow labels.
   
   Yellow labels identify that these versions might not support all security features. 
2. Click a version label (for example, 7.69.1), and select **Filter by agent_version:[number]**. 
   This isolates all hosts running that version. 
3. Outside of [Hosts and Containers][1], check each Agent host for upgrade readiness and [schedule upgrades accordingly][5].

### Detect misconfigurations

Hosts without CSM Misconfigurations enabled can't surface IAM, logging, or encryption misconfigurations. Misconfiguration checks are critical for CIS Benchmarks or NIST-aligned cloud security posture management.

To see if posture checks are enabled for a host, do the following:

1. In [Hosts and Containers][1], set the **Misconfigurations Enabled** facet to **false**.

   The hosts and containers without CSM Misconfigurations enabled are shown with an orange icon. 
2. For remediation guidance, hover over the **CSM Misconfigurations** icon and click **Configure**.

### Cluster-level tracking

The **Cluster Name** column links hosts to logical infrastructure boundaries like Kubernetes clusters. You can filter on a cluster by clicking its name and selecting **Filter by cluster_name:[name]**.

Filtering on a cluster confirms whether protections are applied uniformly. This helps prevent misalignment between environments or inconsistent deployments by region.

### Prioritize response

[Hosts and Containers][1] can be used when investigating alerts or during incident triage. Use the feature icon panel to spot protection gaps. 

Typically, hosts missing critical features like **Workload Protection** or **Host/Container Vulnerability Scanning** are triaged first. 

Hover over a feature icon and click **Configure** to see remediation steps for all feature gaps. This let's you perform triage without context switching.

### Compliance evidence

[Hosts and Containers][1] serves as a live audit view for workload security posture. Filters such as **Workload Protection Enabled** and **Agent Version** demonstrate control coverage to auditors for frameworks like SOC 2, PCI DSS, or FedRAMP.


[1]: https://app.datadoghq.com/security/workload-protection/inventory/hosts
[2]: /security/cloud_security_management/misconfigurations/
[3]: /security/workload_protection/
[4]: /security/cloud_security_management/vulnerabilities/
[5]: /agent/guide/upgrade_agent_fleet_automation