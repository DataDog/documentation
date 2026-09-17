---
title: Alibaba Cloud Integration Troubleshooting

description: "Troubleshooting steps for the Datadog Alibaba Cloud integration"
further_reading:
- link: "https://docs.datadoghq.com/integrations/alibaba-cloud/"
  tag: "Integration"
  text: "Alibaba Cloud Integration"
---

## Overview

Use this guide to troubleshoot issues related to the Datadog [Alibaba Cloud integration][1].

## Integration issues

See configuration issues with your Alibaba Cloud integration at the top of the [Alibaba Cloud integration tile][2].

## Alibaba Cloud access key is invalid or no longer exists

This issue occurs when the access key ID or access key secret configured for the integration is invalid, inactive, or deleted.

To remediate this issue:

1. If the access key is inactive, re-enable it in the Alibaba Cloud RAM console.
2. If the access key secret is invalid, update the Datadog integration with the correct secret. If the correct secret is unavailable, create a replacement access key for the RAM user that Datadog uses.
3. If the access key no longer exists, create a replacement access key for the RAM user that Datadog uses.
4. After creating a replacement key, copy its ID and secret. Update the Alibaba Cloud credentials configured for the Datadog integration.
5. Confirm that the RAM user has the permissions required by the [Alibaba Cloud integration][1].

For instructions, see [Create an AccessKey pair][3] in the Alibaba Cloud documentation.

## Cloud monitoring permissions are missing

This issue occurs when the RAM principal used by the Datadog integration cannot query CloudMonitor metrics.

To remediate this issue, add the `cms:DescribeMetricList` permission to the policy attached to the Datadog integration RAM principal. Then wait for the next collection cycle to confirm that Datadog receives CloudMonitor metrics.

For instructions on editing a RAM policy, see [Grant permissions to a RAM user][4].

## Log collection permissions are missing

<!-- vale Datadog.words_case_insensitive = NO -->
This issue occurs when the RAM principal used by the Datadog integration lacks the permissions required to read from Simple Log Service (SLS).
<!-- vale Datadog.words_case_insensitive = YES -->

To remediate this issue:

1. Review the policy attached to the Datadog integration RAM principal.
2. Add the SLS read permissions described in [SLS RAM access control permissions][8].
3. Confirm that the policy applies to every SLS project and Logstore that you want Datadog to collect.

For instructions on editing a RAM policy, see [Grant permissions to a RAM user][4].

## Prometheus permissions for ACK are missing

This issue occurs when the RAM principal used by the Datadog integration lacks the required permissions. These permissions configure Alibaba Cloud Managed Service for Prometheus for an Alibaba Cloud Container Service for Kubernetes (ACK) cluster.

To remediate this issue, add the required Managed Service for Prometheus permissions. Attach them to the policy used by the Datadog integration RAM principal. These permissions allow Datadog to install and reinstall the `arms-prometheus` add-on on ACK clusters. Scope the policy to the intended clusters where possible. The policy must include at least:

- `cs:InstallClusterAddons`
- `cs:UnInstallClusterAddons`

For instructions on editing a RAM policy, see [Grant permissions to a RAM user][4]. See [InstallClusterAddons][9] for resource-scoping options.

<!-- vale Datadog.headings = NO -->
## Alibaba Cloud Resource Center is not enabled
<!-- vale Datadog.headings = YES -->

This issue occurs when Alibaba Cloud Resource Center is not enabled for the account. Datadog cannot collect the affected metrics until you enable the service.

To remediate this issue:

1. Sign in to the Alibaba Cloud account that is connected to Datadog.
2. Open [Resource Center][5].
3. Enable Resource Center for the account.
4. Attach the `AliyunResourceCenterReadOnlyAccess` policy to the Datadog integration RAM principal.
5. Wait for the next collection cycle to confirm that Datadog receives metrics.

## Alibaba Cloud API quota limit reached

This issue occurs when the account has reached an Alibaba Cloud API quota limit. This is distinct from temporary request throttling.

To remediate this issue:

1. Review the quota and billing status for the Alibaba Cloud account.
2. If applicable, enable pay-as-you-go quotas or resolve outstanding billing issues.
3. If the existing quota is insufficient, [request a quota increase][6].
4. Wait for the quota change to take effect, then confirm that Datadog resumes collection.

Still need help? Contact [Datadog support][7].

[1]: /integrations/alibaba-cloud/
[2]: https://app.datadoghq.com/integrations?integrationId=alibaba-cloud
[3]: https://www.alibabacloud.com/help/en/ram/user-guide/create-an-accesskey-pair
[4]: https://www.alibabacloud.com/help/en/ram/user-guide/grant-permissions-to-a-ram-user
[5]: https://resourcecenter.console.aliyun.com/
[6]: https://www.alibabacloud.com/help/en/resource-management/user-guide/request-a-quota-increase
[7]: /help/
[8]: https://www.alibabacloud.com/help/en/sls/log-service-ram-access-control-permissions-configuration
[9]: https://www.alibabacloud.com/help/en/ack/ack-managed-and-ack-dedicated/developer-reference/api-cs-2015-12-15-installclusteraddons
