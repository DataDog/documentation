---
title: Why isn't my AWS Trusted Advisor Dashboard showing any data?
kind: faq
---

{{< img src="graphing/faq/aws_service_dashboard.png" alt="aws service dashboard" responsive="true" >}}

For your AWS Trusted Advisor integration dashboard to populate with data:

* Configure support permissions
* Have an upgraded AWS support plan.

## Support Permissions

In the IAM Console, add support:* as an action in the policy document text box:

{{< img src="graphing/faq/aws_trusted_permission.png" alt="aws trusted permission" responsive="true" >}}

## AWS Support Plan

The Datadog Trusted Advisor Dashboard needs access to the full set of [AWS Trusted Advisor checks][1]. AWS makes these only available for upgraded AWS support plans. Make sure that your AWS plan includes full access:

{{< img src="graphing/faq/aws_support_plan.png" alt="aws support plan" responsive="true" >}}

[1]: https://aws.amazon.com/premiumsupport/trustedadvisor
