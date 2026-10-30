---
title: Monitor AWS Service Quotas
description: "Track how much of each AWS service quota an account is using, and query the applied quota limits."
further_reading:
- link: "/getting_started/integrations/aws/"
  tag: "Documentation"
  text: "Getting Started with AWS"
- link: "/ddsql_editor/"
  tag: "Documentation"
  text: "DDSQL Editor"
- link: "https://docs.aws.amazon.com/servicequotas/latest/userguide/intro.html"
  tag: "External Site"
  text: "AWS Service Quotas documentation"
---

## Overview

[AWS service quotas][1] cap how much of a service an account can use in a region. Service quota monitoring reports how much of each quota an account is consuming, so you can alert before a quota is reached instead of after a request is throttled or rejected.

Datadog collects the applied quota limits for the account, reads the matching AWS usage metrics from CloudWatch, and reports usage as a percentage of the limit in the metric `aws.servicequota.percentage_used`. Because the limits come from resource collection and the usage comes from CloudWatch, both must be enabled for the account.

## Setup

1. Go to the **General** tab on the [AWS integration page][2] and select an AWS account.
1. Make sure resource collection is enabled for that account. The service quota toggle is unavailable until it is.
1. Turn on **Enable service quota tracking**.

<div class="alert alert-info">
Service quota monitoring calls the CloudWatch <code>GetMetricData</code> API every 30 minutes in each enabled region. AWS bills these calls to your account.
</div>

Quota limits are collected on a separate schedule from usage, so a newly enabled account reports usage percentages before its limits are available.

## Data collected

Quota limits are collected for every AWS service that reports quotas for your account.

Usage percentages are reported for a smaller set of services, identified by the `service_code` tag:

| Service | `service_code` |
| --- | --- |
| Amazon EC2 | `ec2` |
| Amazon VPC | `vpc` |
| AWS Lambda | `lambda` |
| Elastic Load Balancing | `elasticloadbalancing` |
| Amazon RDS | `rds` |
| Amazon DynamoDB | `dynamodb` |
| AWS IAM | `iam` |
| Amazon CloudWatch Logs | `logs` |
| AWS KMS | `kms` |

`aws.servicequota.percentage_used` is tagged with `service_code`, `quota_code`, `quota_name`, `region`, and `adjustable`, along with your account tags. Use it in [dashboards][3] and [monitors][4] like any other metric.

The out-of-the-box [AWS Service Quota Usage][6] dashboard shows this data for your accounts, filterable by service, region, account, and whether the quota can be raised. Clone it to add your own widgets.

**Note**: AWS does not publish a usage metric for every quota, so a percentage is only reported for quotas that have one. Quotas without a usage metric, and quotas for services outside this list, still have their limits collected.

## Query quota limits

`aws.servicequota.percentage_used` reports how close an account is to a quota, but not the limit value itself, and it only covers the services listed above. The applied limits for every quota collected for your account are available in the [DDSQL Editor][5], where you can query them and save the result to a dashboard.

1. Go to the [DDSQL Editor][5] and enter the following query. Replace `ACCOUNT_ID` with your AWS account ID and `SERVICE_CODE` with a service, such as `ec2`:

{{< code-block lang="sql" >}}
SELECT
  CASE
    WHEN q.global_quota OR split_part(q.quota_arn, ':', 4) = '' THEN 'GLOBAL'
    ELSE split_part(q.quota_arn, ':', 4)
  END                 AS region,
  q.account_id,
  q.service_code,
  q.quota_code,
  q.quota_name,
  q.value             AS limit_value,
  u.value             AS percent_used,
  q.adjustable
FROM aws.service_quotas_service_quota q
LEFT JOIN dd.metrics_scalar(
  'reduce(max:aws.servicequota.percentage_used{*} by {aws_account,service_code,quota_code,region}, max)'
) u
  ON  u.tags->'aws_account'  = q.account_id
  AND u.tags->'service_code' = q.service_code
  AND u.tags->'quota_code'   = lower(q.quota_code)
  AND u.tags->'region'       = split_part(q.quota_arn, ':', 4)
WHERE q.account_id   = 'ACCOUNT_ID'
  AND q.service_code = 'SERVICE_CODE'
ORDER BY
  percent_used DESC NULLS LAST,
  region,
  q.quota_name
LIMIT 100
{{< /code-block >}}

1. Click **Run** to check the results, then click **Save** to save the query.
1. Click **Save to dashboard** and choose the dashboard to add it to.
1. Select the columns to display in the widget.

Each row is one quota in one region, with the limit Datadog collected, the percentage of that limit in use, and whether the quota can be raised. The quotas closest to their limit are listed first.

**Note**: The query returns one row per quota per region, and most accounts have more quotas than the `LIMIT` returns. Sort by `percent_used` as shown, or add a region to the `WHERE` clause, rather than ordering by region alone, which returns only the first region.

To see every service for the account, remove the `q.service_code` line from the `WHERE` clause. To look up a single quota across all regions, replace it with a quota code, such as `AND q.quota_code = 'L-1216C47A'`.

**Note**: `quota_code` values are uppercase, such as `L-1216C47A`, and comparisons are case-sensitive. The query lowercases the code when joining to the metric, because Datadog converts metric tag values to lowercase.

Note the following about the results:

- **`region`** is read from the quota ARN, because quotas are stored per region rather than with a region column. Quotas that apply to the whole account, such as most IAM quotas, are reported as `GLOBAL`.
- **`percent_used`** is empty when AWS publishes no usage metric for that quota. The limit is still accurate; only the percentage is unavailable.
- **`limit_value`** is in the unit AWS reports for that quota, which is a plain count for most quotas and a size or a rate for the rest. Units are not comparable between quotas, so avoid ranking unrelated quotas by this value alone. A limit of `9999999` means AWS treats the quota as effectively unlimited for that account.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: /dashboards/
[4]: /monitors/types
[5]: /ddsql_editor/
[6]: https://app.datadoghq.com/dash/integration/aws_servicequotas
