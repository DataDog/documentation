---
aliases:
- 6ih-b0p-er4
- /security_monitoring/default_rules/6ih-b0p-er4
- /security_monitoring/default_rules/cis-gcp-1.3.0-3.8
disable_edit: true
integration_id: google_compute_subnetwork
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_compute_subnetwork
title: VPC Flow Logs are enabled for all subnets in the VPC network
type: security_rules
---

## Description
Flow Logs is a feature that enables users to capture information about the IP traffic going to and from network interfaces in an organization's VPC subnets. Once a flow log is created, the user can view and retrieve its data in Stackdriver Logging. It is recommended that Flow Logs is enabled for every business-critical VPC subnet.

### Default value
By default Flow Logs is set to `Off` when a new VPC network subnet is created.

## Rationale
VPC networks and subnetworks that are not reserved for internal HTTP(S) load balancing provide logically isolated and secure network partitions from which GCP resources can be launched.
When Flow Logs are enabled for a subnet, VMs within that subnet start reporting on all
Transmission Control Protocol (TCP) and User Datagram Protocol (UDP) flows. Each VM
samples the TCP and UDP flows it sees, inbound and outbound, whether the flow is to or
from another VM, a host in the on-premise datacenter, a Google service, or a host on the
Internet. If two GCP VMs are communicating, and both are in subnets that have VPC Flow
Logs enabled, both VMs report the flows.

Flow Logs supports the following use cases:
- Network monitoring
- Understanding network usage and optimizing network traffic expenses
- Network forensics
- Real-time security analysis

Flow Logs provides visibility into network traffic for each VM inside the subnet and can be
used to detect anomalous traffic or provide insight on security workflows.
The Flow Logs must be configured such that all network traffic is logged. The interval of
logging is granular enough to provide detailed information on the connections, where no logs are filtered and metadata to facilitate investigations are included.

- Note: Subnets reserved for use by internal HTTP(S) load balancers do not support VPC
Flow Logs.

### Impact
Standard pricing for Stackdriver Logging, BigQuery, or Cloud Pub/Sub applies. VPC Flow
Logs generation will be charged when it's generally available, as described in this reference:
[https://cloud.google.com/vpc/][1]

## Remediation

### From the console 
1. Go to the VPC network GCP Console page by visiting:
[https://console.cloud.google.com/networking/networks/list][2]
2. Click the name of a **subnet** to display the subnet details page.
3. Click **EDIT** .
4. Set Flow Logs to **On**.
5. Expand the **Configure Logs** section.
6. Set **Aggregation Interval** to `5 SEC`.
7. Check the box for **Include metadata**.
8. Set **Sample rate** to `100`.
9. Click **Save**.

- Note: You can only configure a log filter from the command line.

### From the command line
To enable VPC Flow Logs for a network subnet, run the following command:
```
gcloud compute networks subnets update [SUBNET_NAME] --region [REGION] --
enable-flow-logs --logging-aggregation-interval=interval-5-sec --logging-
flow-sampling=1 --logging-metadata=include-all
```

## References
1. [https://cloud.google.com/vpc/docs/using-flow-logs#enabling_vpc_flow_logging][3]
2. [https://cloud.google.com/vpc/][1]

[1]: https://cloud.google.com/vpc/
[2]: https://console.cloud.google.com/networking/networks/list
[3]: https://cloud.google.com/vpc/docs/using-flow-logs#enabling_vpc_flow_logging
