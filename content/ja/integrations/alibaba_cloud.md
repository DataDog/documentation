---
"categories":
- cloud
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Integrate your Alibaba Cloud services with Datadog."
"doc_link": "https://docs.datadoghq.com/integrations/alibaba_cloud/"
"draft": false
"further_reading":
- "link": "https://www.datadoghq.com/blog/monitor-alibaba-cloud-datadog/"
  "tag": Blog
  "text": Monitor Alibaba Cloud with Datadog
"git_integration_title": "alibaba_cloud"
"has_logo": true
"integration_id": "alibaba-cloud"
"integration_title": "Alibaba Cloud"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "alibaba_cloud"
"public_title": "Datadog-Alibaba Cloud Integration"
"short_description": "Integrate your Alibaba Cloud services with Datadog."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< site-region region="gov" >}}
<div class="alert alert-warning">The Datadog Alibaba Cloud integration does not support the Datadog for Government site.</div>
{{< /site-region >}}

## Overview

Connect to Alibaba Cloud to get metrics from your:

- Alibaba Cloud Servers Load Balancer (SLB)
- Alibaba Elastic Compute Service instances
- Alibaba Cloud ApsaraDB for RDS instances
- Alibaba Cloud ApsaraDB for Redis instances
- Alibaba Cloud Content Delivery Network (CDN) instances
- Alibaba Cloud Container Service clusters
- Alibaba Cloud Express Connect instances

## Setup

### Installation

Navigate to the [Datadog-Alibaba Cloud integration configuration tile][1] and press _add account_.

### Configuration

Fill out the following parameters to integrate Datadog with the Alibaba Cloud API:

- **`Account Id`**

Find this by hovering over the avatar on the top right of the Alibaba Cloud console and selecting _Security Settings_. The account ID is displayed on the top of that page.

{{< img src="integrations/alibaba_cloud/account_id_ac.png" alt="Account ID AC" style="width:30%;">}}

- **`Access Key Id`** & **`Access Key Secret`**

In your Alibaba Cloud Account:

1. Create a new user in the _RAM_ tab with the following parameters:

    - `Logon Name`: Datadog
    - `display name`: Datadog
    - `description`: Datadog User for the Datadog-Alibaba Cloud integration

2. Select _Programmatic Access_:

    {{< img src="integrations/alibaba_cloud/ac_programmatic_access.png" alt="Programmatic access" style="width:40%;">}}

3. After hitting _OK_, copy and paste the `AccessKeyID` and `AccessKeySecret` in the [Datadog-Alibaba Cloud integration tile][1] and click _install integration_.

    {{< img src="integrations/alibaba_cloud/ac_access_keys.png" alt="AC access keys" style="width:40%;">}}

4. In your Alibaba Cloud Account, select `Add Permissions` for the user you just created, then add all of the following permissions:

    ```text
    AliyunCloudMonitorReadOnlyAccess
    AliyunECSReadOnlyAccess
    AliyunKvstoreReadOnlyAccess
    AliyunRDSReadOnlyAccess
    AliyunSLBReadOnlyAccess
    AliyunCDNReadOnlyAccess
    AliyunCSReadOnlyAccess
    AliyunExpressConnectReadOnlyAccess
    ```

5. Press _Update_, and after around ~15 minutes, the metrics seen in the _Metrics_ tab of the Datadog-Alibaba Cloud integration tile starts appearing in your [metric explorer page][2] tagged with any custom tags you add to your resources and tags found here:

    - [kvstore/redis DescribeInstances][3]
    - [ECS DescribeInstances][4]
    - [DescribeDBInstances][5]
    - [DescribeLoadBalancers][6]

6. Optional - Set `Optionally Limit Metrics Collection` in your [Datadog-Alibaba Cloud integration tile][1]. This comma separated list of Alibaba Cloud tags (in the form `<KEY:VALUE>`) defines a filter to use when collecting metrics from Alibaba Cloud. Wildcards such as `?` (for single characters) and `*` (for multiple characters) can be used. Only hosts that match one of the defined labels are imported into Datadog—the rest are ignored. Hosts matching a given label can also be excluded by adding `!` before the label.

## Data Collected

### Metrics
{{< get-metrics-from-git "alibaba_cloud" >}}


### Events

Events from Alibaba Cloud are collected on a per Alibaba Cloud-service basis.

## Troubleshooting

Need help? Contact [Datadog support][8].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/alibaba_cloud
[2]: https://app.datadoghq.com/metric/explorer
[3]: https://www.alibabacloud.com/help/doc-detail/60933.htm
[4]: https://www.alibabacloud.com/help/doc-detail/25506.htm
[5]: https://www.alibabacloud.com/help/doc-detail/26232.htm
[6]: https://www.alibabacloud.com/help/doc-detail/27582.htm
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/alibaba_cloud/alibaba_cloud_metadata.csv
[8]: https://docs.datadoghq.com/help/

