---
aliases:
- mk4-800-100
- /security_monitoring/default_rules/mk4-800-100
- /security_monitoring/default_rules/cis-gcp-1.3.0-3.1
disable_edit: true
integration_id: google_compute_network
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_compute_network
title: The default network does not exist in a project
type: security_rules
---

## Description
To prevent use of the `default` network, a project should not have a `default` network.

### Default value
By default, for each project, a `default` network is created.


## Rationale
The `default` network has a preconfigured network configuration and automatically generates the following insecure firewall rules:

   - default-allow-internal: Allows ingress connections for all protocols and ports among instances in the network.
   - default-allow-ssh: Allows ingress connections on TCP port 22(SSH) from any source to any instance in the network.
   - default-allow-rdp: Allows ingress connections on TCP port 3389(RDP) from any source to any instance in the network.
   - default-allow-icmp: Allows ingress ICMP traffic from any source to any instance in the network.

These automatically-created firewall rules do not get audit-logged and cannot be configured to enable firewall rule logging.

Furthermore, the `default` network is an auto-mode network, which means that its subnets use the same predefined range of IP addresses. As a result, it's not possible to use Cloud VPN or VPC Network Peering with the `default` network.

Based on organization security and networking requirements, the organization should create a new network and delete the `default` network.

### Impact
When an organization deletes the `default` network, it may need to migrate services onto a new network.

## Remediation

### From the console
1. Go to the [VPC networks][1] page.
2. Click the network named `default`.
3. On the network detail page, click **EDIT**.
4. Click **DELETE VPC NETWORK**.
5. If needed, create a new network to replace the `default` network.

### From the command line
1. Delete the `default` network:

   ```
   gcloud compute networks delete default
   ```

2. If needed, create a new network to replace it:

   ```
   gcloud compute networks create NETWORK_NAME
   ```

## Prevention
You can prevent the `default` network and its insecure firewall rules from being created by setting up an Organization Policy to skip `default` network creation at [https://console.cloud.google.com/iam-admin/orgpolicies/compute-skipDefaultNetworkCreation][2].

## References
1. [https://cloud.google.com/compute/docs/networking#firewall_rules][3]
2. [https://cloud.google.com/compute/docs/reference/latest/networks/insert][4]
3. [https://cloud.google.com/compute/docs/reference/latest/networks/delete][5]
4. [https://cloud.google.com/vpc/docs/firewall-rules-logging][6]
5. [https://cloud.google.com/vpc/docs/vpc#default-network][7]
6. [https://cloud.google.com/sdk/gcloud/reference/compute/networks/delete][8]

[1]: https://console.cloud.google.com/networking/networks/list
[2]: https://console.cloud.google.com/iam-admin/orgpolicies/compute-skipDefaultNetworkCreation
[3]: https://cloud.google.com/compute/docs/networking#firewall_rules
[4]: https://cloud.google.com/compute/docs/reference/latest/networks/insert
[5]: https://cloud.google.com/compute/docs/reference/latest/networks/delete
[6]: https://cloud.google.com/vpc/docs/firewall-rules-logging
[7]: https://cloud.google.com/vpc/docs/vpc#default-network
[8]: https://cloud.google.com/sdk/gcloud/reference/compute/networks/delete
