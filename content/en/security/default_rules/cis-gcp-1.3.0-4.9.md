---
aliases:
- 65d-83u-jd8
- /security_monitoring/default_rules/65d-83u-jd8
- /security_monitoring/default_rules/cis-gcp-1.3.0-4.9
disable_edit: true
integration_id: google_compute_instance
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_compute_instance
title: Compute instances do not have public IP addresses
type: security_rules
---

## Description

Compute instances should not be configured to have external IP addresses.

## Rationale

To reduce your attack surface, Compute instances should not have public IP addresses.
Instead, instances should be configured behind load balancers, to minimize the instance's
exposure to the internet.

You can connect to Linux VMs that do not have public IP addresses by using Identity-Aware Proxy for TCP forwarding. Learn more at
[https://cloud.google.com/compute/docs/instances/connecting-advanced#sshbetweeninstances][8].

For Windows VMs, see [https://cloud.google.com/compute/docs/instances/connecting-to-instance][9].

### Impact

Removing the external IP address from your Compute instance may cause some
applications to stop working.

### Prevention

You can configure the "Define allowed external IPs for VM instances" organization policy to prevent VMs from being configured with public IP addresses. Learn more at:
[https://cloud.google.com/compute/docs/ip-addresses/reserve-static-external-ip-address][2]

### Exception

Instances created by GKE should be excluded because some of them have external IP
addresses and cannot be changed by editing the instance settings. Instances created by GKE
should be excluded. These instances have names that start with "gke-" and are labeled
"goog-gke-node".

## Remediation

### From the console

1. Go to the VM instances page by visiting: [https://console.cloud.google.com/compute/instances][1].
2. Click on the instance name to go the the Instance detail page.
3. Click **Edit**.
4. For each Network interface, ensure that **External IP** is set to None.
5. Click **Done** and then click **Save**.

### From the command line

1. Describe the instance properties:

   ```
   gcloud compute instances describe <INSTANCE_NAME> --zone=<ZONE>
   ```
2. Identify the access config name that contains the external IP address. This access config appears in the following format:

   ```
   networkInterfaces:
   - accessConfigs:
    - kind: compute#accessConfig
      name: External NAT
      natIP: 130.211.181.55
      type: ONE_TO_ONE_NAT
   ```
3. Delete the access config:

   ```
   gcloud compute instances delete-access-config <INSTANCE_NAME> --zone=<ZONE> --access-config-name <ACCESS_CONFIG_NAME>
   ```

In the above example, the `ACCESS_CONFIG_NAME` is `External NAT`. The name of your access config might be different.

## References

1. [https://cloud.google.com/load-balancing/docs/backend-service#backends_and_external_ip_addresses][3]
2. [https://cloud.google.com/compute/docs/instances/connecting-advanced#sshbetweeninstances][4]
3. [https://cloud.google.com/compute/docs/instances/connecting-to-instance][5]
4. [https://cloud.google.com/compute/docs/ip-addresses/reserve-static-external-ip-address#unassign_ip][6]
5. [https://cloud.google.com/resource-manager/docs/organization-policy/org-policy-constraints][7]


[1]: https://console.cloud.google.com/compute/instances
[2]: https://cloud.google.com/compute/docs/ip-addresses/reserve-static-external-ip-address
[3]: https://cloud.google.com/load-balancing/docs/backend-service#backends_and_external_ip_addresses
[4]: https://cloud.google.com/compute/docs/instances/connecting-advanced#sshbetweeninstances
[5]: https://cloud.google.com/compute/docs/instances/connecting-to-instance
[6]: https://cloud.google.com/compute/docs/ip-addresses/reserve-static-external-ip-address#unassign_ip
[7]: https://cloud.google.com/resource-manager/docs/organization-policy/org-policy-constraints
[8]: https://cloud.google.com/compute/docs/instances/connecting-advanced#sshbetweeninstances
[9]: https://cloud.google.com/compute/docs/instances/connecting-to-instance
