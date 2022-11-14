---
aliases:
- 43d-df8-8fd
- /security_monitoring/default_rules/43d-df8-8fd
- /security_monitoring/default_rules/cis-gcp-1.3.0-3.7
disable_edit: true
integration_id: google_compute_firewall
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_compute_firewall
title: RDP access is restricted from the internet
type: security_rules
---

## Description
GCP Firewall Rules are specific to a VPC Network. Each rule either allows or denies
traffic when its conditions are met. Its conditions allow users to specify the type of traffic,
such as ports and protocols, and the source or destination of the traffic, including IP
addresses, subnets, and instances.
Firewall rules are defined at the VPC network level and are specific to the network in which
they are defined. The rules themselves cannot be shared among networks. Firewall rules
only support IPv4 traffic. When specifying a source for an ingress rule or a destination for
an egress rule by address, an IPv4 address or IPv4 block in CIDR notation can be used.
Generic (0.0.0.0/0) incoming traffic from the Internet to a VPC or VM instance using RDP
on Port 3389 can be avoided.

## Rationale
GCP Firewall Rules within a VPC Network apply to outgoing (egress) traffic
from instances and incoming (ingress) traffic to instances in the network. Egress and
ingress traffic flows are controlled even if the traffic stays within the network (for example,
instance-to-instance communication). For an instance to have outgoing Internet access, the
network must have a valid Internet gateway route or custom route whose destination IP is
specified. This route simply defines the path to the Internet, to avoid the most general
(0.0.0.0/0) destination IP Range specified from the Internet through RDP with the default
Port 3389. Generic access from the Internet to a specific IP Range should be restricted.

## Impact
All Remote Desktop Protocol (RDP) connections from outside of the network to the
concerned VPC(s) are blocked. There could be a business need where secure shell
access is required from outside of the network to access resources associated with the VPC.
In that case, specific source IP(s) should be mentioned in firewall rules to allow access
to RDP ports for the concerned VPC(s).

## Remediation

### From the console
1. Go to VPC Network.
2. Go to the Firewall Rules.
3. Click the Firewall Rule to be modified.
4. Click Edit.
5. Modify Source IP ranges to your specific IPs.
6. Click Save.

### From the command line
1.Update the RDP Firewall rule with a new SOURCE_RANGE using the following command:
   ```
   gcloud compute firewall-rules update FirewallName --allow=[PROTOCOL[:PORT[-PORT]],...] --source-ranges=[CIDR_RANGE,...]
   ```

## References
1. [https://cloud.google.com/vpc/docs/firewalls#blockedtraffic][1]
2. [https://cloud.google.com/blog/products/identity-security/cloud-iap-enables-context-aware-access-to-vms-via-ssh-and-rdp-without-bastion-hosts][2]

## Additional Information
As of this writing, GCP VPC only supports IPv4; however, Google is working on adding IPv6 support for VPC. If you are using IPv6, the rule should check for the IPv6 equivalent ::0 along with source IP range 0.0.0.0.

## CIS Controls
Version 8 - 4.4: Implement and Manage a Firewall on Servers
- Implement and manage a firewall on servers, where supported. Example
implementations include a virtual firewall, operating system firewall, or a third-party
firewall agent.

Version 8 - 4.5: Implement and Manage a Firewall on End-User Devices
- Implement and manage a host-based firewall or port-filtering tool on end-user
devices, with a default-deny rule that drops all traffic except those services and ports
that are explicitly allowed.

Version 7 - 9.2: Ensure Only Approved Ports, Protocols and Services Are Running
- Ensure that only network ports, protocols, and services with validated business needs are listening on a system.

Version 7 - 12.4: 12.4 Deny Communication over Unauthorized Ports
- Deny communication or application traffic over unauthorized TCP or UDP ports, to
ensure that only authorized protocols are allowed to cross the network boundary in or
out of the network, at each of the organization's network boundaries.

[1]: https://cloud.google.com/vpc/docs/firewalls#blockedtraffic
[2]: https://cloud.google.com/blog/products/identity-security/cloud-iap-enables-context-aware-access-to-vms-via-ssh-and-rdp-without-bastion-hosts
