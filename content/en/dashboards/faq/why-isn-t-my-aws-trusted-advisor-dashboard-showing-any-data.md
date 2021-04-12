---
title: Why isn't my AWS Trusted Advisor Dashboard showing any data?
kind: faq
aliases:
    - /graphing/faq/why-isn-t-my-aws-trusted-advisor-dashboard-showing-any-data
---

{{< img src="dashboards/faq/aws_service_dashboard.png" alt="aws service dashboard"  >}}

For your AWS Trusted Advisor integration dashboard to populate with data:

* Configure support permissions
* Have an upgraded AWS support plan.

## Support permissions

In the IAM Console, add `support:describe*` and `support: refresh*` as an action in the policy document text box.

## AWS support plan

The Datadog Trusted Advisor Dashboard needs access to the full set of [AWS Trusted Advisor checks][1]. AWS makes these only available for upgraded AWS support plans. Make sure that your AWS plan includes full access:

{{< img src="dashboards/faq/aws_support_plan.png" alt="aws support plan"  >}}

[1]: https://aws.amazon.com/premiumsupport/trustedadvisor
