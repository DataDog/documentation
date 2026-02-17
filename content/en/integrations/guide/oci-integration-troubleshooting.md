---
title: OCI Integration Troubleshooting

description: "Troubleshooting steps for the Datadog OCI Integration"
further_reading:
- link: "https://docs.datadoghq.com/integrations/oracle_cloud_infrastructure/"
  tag: "Integration"
  text: "OCI Integration"
---

## Overview

Use this guide to troubleshoot issues related to the Datadog [OCI Integration][1].

## Integration issues

See configuration issues with your OCI integration on the **Issues** tab of the [OCI integration tile][2].

## Invalid Datadog API or app key credentials

This occurs when Datadog API or App keys configured in the OCI integration tile have expired, or when OCI credentials used by Datadog are incorrect. To remediate this, reapply the existing Datadog integration ORM Stack in your OCI tenancy. 

**Note**: Do not modify the stack before reapplying it.

## Required OCI IAM permissions are missing

Datadog has received a `403` error when querying OCI, indicating that not all necessary IAM permissions have been granted.
Check the [Policies page][4] in OCI to ensure that the `dd-svc-policy` and `dd-dynamic-group` policies have all **read-only** permissions properly configured.

## OCI tenancy reaching service connector hub limit

For each tenancy, at least one service connector hub is required per five compartments. [Request a service limit increase][5] in your OCI account.

## Cannot collect data from one or more subscribed regions

The application function used to forward Datadog metrics and logs was not found.
To remediate this, reapply the existing Datadog integration ORM Stack in your OCI tenancy. 

**Note**: If you specified the subnet OCIDs in the optional configuration section, ensure that there is one subnet OCID per subscribed region. Do not make any other modifications to the existing stack before reapplying it.

Still need help? Contact [Datadog support][3].

[1]: /integrations/oracle-cloud-infrastructure
[2]: https://app.datadoghq.com/integrations?integrationId=oracle-cloud-infrastructure
[3]: /help/
[4]: https://cloud.oracle.com/identity/domains/policies
[5]: https://docs.oracle.com/en/cloud/get-started/subscriptions-cloud/mmocs/requesting-service-limit-change.html
