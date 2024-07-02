---
categories:
- cloud
- configuration & deployment
description: "Enable the integration to see Datadog metrics in CloudCheckr."
doc_link: https://docs.datadoghq.com/integrations/cloudcheckr/
dependencies: ["https://github.com/DataDog/documentation/blob/master/content/en/integrations/cloudcheckr.md"]
has_logo: true
integration_title: CloudCheckr
is_public: true
custom_kind: integration
name: cloudcheckr
public_title: Datadog-CloudCheckr Integration
short_description: "Add Datadog metrics in CloudCheckr to monitor and optimize your AWS usage."
integration_id: "cloudcheckr"
further_reading:
  - link: "https://www.datadoghq.com/blog/rightsizing-cloudcheckr/"
    tag: "Blog"
    text: "CloudCheckr + Datadog: Better rightsizing of cloud resources"
---

## Overview

[CloudCheckr][1] is a web-based platform that allows you to monitor and optimize your AWS infrastructure by providing customized recommendations about cost and performance.

{{< img src="integrations/cloudcheckr/EC2_Right_Sizing_Report.png" alt="ec2 right sizing report">}}

With the Datadog-CloudCheckr integration, you can make data-driven decisions based on current and past resource consumption to maintain an agile, cost-effective infrastructure.

## セットアップ

To connect your Datadog account to your CloudCheckr account:

- Click into your CloudCheckr Extensions.
- Add your [Datadog API and application keys][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://spot.io/product/cloudcheckr/
[2]: https://app.datadoghq.com/organization-settings/api-keys