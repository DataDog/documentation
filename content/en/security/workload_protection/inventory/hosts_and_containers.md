---
title: Hosts and Containers
disable_toc: false
---

The [Hosts and Containers][1] view in Datadog Workload Protection **Inventory** provides a unified view of host-level agent deployment, configuration health, and security feature status. 

The **Hosts and Containers** view shows the hostname of all active Agents running directly on hosts or as containers. This includes hosts with Workload Protection enabled or disabled.

**Hosts and Containers** enables DevSecOps teams to:  

- Verify that protections are properly deployed and running across environments, including:  
  - [Workload Protection][3]  
  - [CSM Misconfigurations][2]  
  - [Container Vulnerability Scanning][4]  
  - [Host Vulnerability Scanning][4]  
- Identify which hosts and containers are running old versions of the Agent  
- Access remediation guidance for missing protections

## Use cases

The [Hosts and Containers][1] inventory supports several common DevSecOps use cases.

### Assess coverage status

To identify hosts where runtime threat detection is not configured:

1. In [Hosts and Containers][1], set the following facets to **false**:
   - **Workload Protection Enabled**
   - **Misconfigurations Enabled**
   - **Hosts VM Enabled**
   - **Containers VM Enabled**
   
   The hosts and containers missing one or more of these features are shown with an orange icon. This list flags coverage gaps that expose the workload to undetected process, file, or network-level threats.
2. For remediation guidance, hover over the icon for a feature and click **Configure**.

<div class="alert alert-info">
Filter by <b>Containers VM Enabled: true</b> to ensure scanning is also applied to container workloads running inside a VM context.
</div>

### Validate Agent health

To validate Agent health:

1. In the **Agent Version** column, look for older versions identified with yellow labels.
   
   Yellow labels indicate versions that might not support all security features.
2. Click a version label (for example, 7.69.1), and select **Filter by agent_version:[number]**. 
   This isolates all hosts running that version. 
3. Outside of [Hosts and Containers][1], check each Agent host for upgrade readiness and [schedule upgrades accordingly][5].

### Detect misconfigurations

Hosts without CSM Misconfigurations enabled can't surface IAM, logging, or encryption misconfigurations. Misconfiguration checks are critical for CIS Benchmarks and NIST-aligned cloud security posture management.

To check whether posture checks are enabled for a host:

1. In [Hosts and Containers][1], set the **Misconfigurations Enabled** facet to **false**.

   The hosts and containers without CSM Misconfigurations enabled are indicated by an orange icon. 
2. For remediation guidance, hover over the **CSM Misconfigurations** icon and click **Configure**.

See Cloud Security Vulnerabilities [deployment methods][6].

### Cluster-level tracking

The **Cluster Name** column links hosts to logical infrastructure boundaries like Kubernetes clusters. Filter on a cluster by clicking its name and selecting **Filter by cluster_name:[name]**.

Filtering on a cluster confirms whether protections are applied uniformly. This ensures protections are applied consistently across environments and regions.

### Prioritize response

[Hosts and Containers][1] supports investigations and incident triage. Use the feature icon panel to spot protection gaps. 

Typically, hosts missing critical features like **Workload Protection** or **Host/Container Vulnerability Scanning** are triaged first. 

Hover over a feature icon and click **Configure** to see remediation steps for all feature gaps. This enables triage without context switching.

### Compliance evidence

[Hosts and Containers][1] provides a live audit view for workload security posture. Filters such as **Workload Protection Enabled** and **Agent Version** demonstrate control coverage for frameworks such as SOC 2, PCI DSS, or FedRAMP.


[1]: https://app.datadoghq.com/security/workload-protection/inventory/hosts
[2]: /security/cloud_security_management/misconfigurations/
[3]: /security/workload_protection/
[4]: /security/cloud_security_management/vulnerabilities/
[5]: /agent/guide/upgrade_agent_fleet_automation
[6]: /security/cloud_security_management/vulnerabilities/