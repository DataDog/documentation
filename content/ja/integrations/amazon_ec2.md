---
"aliases":
- "/integrations/awsec2/"
- "/agent/faq/install-the-agent-with-aws-ssm"
"categories":
- "cloud"
- "os & system"
- "aws"
- "log collection"
"custom_kind": "インテグレーション"
"dependencies": []
"description": "インスタンスリソースの使用状況の追跡、ステータスチェックの監視など。"
"doc_link": "https://docs.datadoghq.com/integrations/amazon_ec2/"
"draft": false
"git_integration_title": "amazon_ec2"
"has_logo": true
"integration_id": "amazon-ec2"
"integration_title": "Amazon EC2"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"monitors":
  "ec2_cpu_utilization": "assets/monitors/ec2_cpu_utilization.json"
  "ec2_host_ok": "assets/monitors/ec2_host_ok.json"
  "ec2_status_check": "assets/monitors/ec2_status_check.json"
"name": "amazon_ec2"
"public_title": "Datadog-Amazon EC2 Integration"
"short_description": "Track instance resource usage, monitor status checks, and more."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Amazon Elastic Compute Cloud (Amazon EC2) is a web service that provides resizable compute capacity in the cloud. It is designed to make web-scale cloud computing easier for developers.

Enable this integration to see in Datadog all your EC2 metrics, and additional events like scheduled maintenances.

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration][1] first.

### 構成

1. In the [AWS integration page][2], ensure that `EC2` is enabled under the `Metric Collection` tab.

2. Add the following required permissions to your [Datadog IAM policy][3] in order to collect Amazon EC2 metrics. For more information, see the [EC2 policies][4] on the AWS website.

    | AWS Permission               | Description                                                                                                                           |
    | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
    | `ec2:DescribeInstanceStatus` | Used by the ELB integration to assert the health of an instance. Used by the EC2 integration to describe the health of all instances. |
    | `ec2:DescribeSecurityGroups` | Adds SecurityGroup names and custom tags to ec2 instances.                                                                            |
    | `ec2:DescribeInstances`      | Adds tags to ec2 instances and ec2 cloudwatch metrics.                                                                                |

3. Install the [Datadog - Amazon EC2 integration][5].

**Note**: If you want to monitor a subset of your EC2 instances with Datadog, assign an AWS tag, such as `datadog:true`, to those EC2 instances. Then specify that tag in the **Limit metric collection to specific resources** textbox under the **Metric Collection** tab in your [Datadog AWS integration page][2].

#### EC2 automuting

Datadog can proactively mute monitors related to the manual shutdown of EC2 instances and instance termination triggered by AWS autoscaling based on host statuses from the CloudWatch API. Automuted EC2 instances are listed on the [Monitor Downtime][6] page by checking **Show automatically muted hosts**.

Note, the EC2 integration must be installed for automuting to take effect. If metrics collection is limited to hosts with tags, only instances matching the tags are automuted.

To silence monitors for expected EC2 instance shutdowns, check the **EC2 automuting** box in the [AWS integration page][2]:

{{< img src="integrations/amazon_ec2/aws_ec2_automuting.png" alt="Amazon EC2 Automuting" >}}

### Install the Agent with AWS Systems Manager (SSM)

Follow the steps below to install the Datadog Agent on EC2 instances with AWS Systems Manager. See [Why should I install the Datadog Agent on my cloud instances?][7] to learn the benefit of installing the Agent on your Amazon EC2 instances.

#### Agent Installation through Amazon Systems Manager UI (Recommended)

1. Configure the [IAM role][8] on your EC2 instances so that the [AmazonSSMManagedInstanceCore permission][9] is enabled.

2. Navigate to the [document tab of AWS SSM][10]. 
3. Search for `datadog`. Note: You may need to find the correct document for your region by switching regions in top navigation bar of the AWS Management console.
4. Choose either the Linux or Windows document depending on your needs.
- Linux: datadog-agent-installation-linux
- Windows: datadog-agent-installation-windows

5. Fill in the command parameters.
6. Select the target instances to install the Agent on.
7. Click **Run**. 
8. Wait for the confirmation status to finish, then check the Infrastructure list in Datadog.

#### Alternative custom Agent installation

##### Parameter store

In the [Parameter store][11], create a parameter with:

- Name: `dd-api-key-for-ssm`
- Description: (Optional)
- Type: `SecureString`
- KMS key source: `My current account`
- KMS Key ID: Use the default value selected
- Value: Your [Datadog API key][12]

##### Documents

In the systems manager, create a new [Document][13]:

- Name: `dd-agent-install`
- Target type: (Optional)
- Document type: `Command document`
- Content: `JSON`

If you are in Datadog US site, use the file [dd-agent-install-us-site.json][14] updated with your `<AWS_REGION>` under `runCommand`, such as `us-east-1`. If you are in Datadog EU site, use the [dd-agent-install-eu-site.json][15] instead.

##### Run command

Under [Run Command][16], click the **Run command** button and follow the steps below:

- **Command document**:
  - Click on the search box and select _Owner -> Owned by me_.
  - Click the radio button next to your document.
  - If necessary, choose the **Document version**.
- **Targets**:
  - Select the EC2 instance to target.
- **Output options** (optional):
  - Select the **CloudWatch output** checkbox to log any issues.
- **Other sections** (optional):
  - Modify other sections as needed for your setup.

Click the **Run** button and a confirmation page displays showing the status. Wait for it to finish, then check the [Infrastructure list][17] in Datadog.

### Log collection

Use the [Datadog Agent][18] or another [log shipper][19] to send your logs to Datadog.

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_ec2" >}}


Each of the metrics retrieved from AWS is assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

**Notes**: 
   - `aws.ec2.instance_age` is not collected by default with the Datadog - EC2 integration. Contact [Datadog support][21] to enable this metric collection.
   - `aws.ec2.host_ok` is collected by default, even if you disable metric collection for the Amazon EC2 integration, and can lead to unexpected hosts appearing in the infrastructure list. To filter the unwanted hosts, assign an AWS tag, such as `datadog:true`, to those EC2 instances. Then specify that tag in the **Limit metric collection to specific resources** textbox under the **Metric Collection** tab in your [Datadog AWS integration page][2].

### サービスチェック
{{< get-service-checks-from-git "amazon_ec2" >}}


## Out-of-the-box monitoring

The Amazon EC2 integration provides ready-to-use monitoring capabilities to monitor and optimize performance.

- Amazon EC2 Overview Dashboard: Gain a comprehensive overview of your EC2 instances using the out-of-the-box [Amazon EC2 Overview dashboard][23].
- Recommended Monitors: Enable [Recommended Amazon EC2 monitors][24] to proactively detect issues and receive timely alerts.

## トラブルシューティング

Need help? Contact [Datadog support][21].

## Further Reading

- [Key metrics for EC2 monitoring][25]
- [How to collect EC2 metrics][26]
- [How to monitor EC2 instances with Datadog][27]

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/security-iam.html
[5]: https://app.datadoghq.com/integrations/amazon-ec2
[6]: https://app.datadoghq.com/monitors/downtimes
[7]: https://docs.datadoghq.com/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
[8]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html
[9]: https://docs.aws.amazon.com/systems-manager/latest/userguide/setup-instance-permissions.html
[10]: https://docs.aws.amazon.com/systems-manager/latest/userguide/documents.html
[11]: https://console.aws.amazon.com/systems-manager/parameters
[12]: https://app.datadoghq.com/organization-settings/api-keys
[13]: https://console.aws.amazon.com/systems-manager/documents
[14]: https://docs.datadoghq.com/resources/json/dd-agent-install-us-site.json
[15]: https://docs.datadoghq.com/resources/json/dd-agent-install-eu-site.json
[16]: https://console.aws.amazon.com/systems-manager/run-command/executing-commands
[17]: https://app.datadoghq.com/infrastructure
[18]: https://docs.datadoghq.com/agent/logs/
[19]: https://docs.datadoghq.com/integrations/rsyslog/
[20]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ec2/amazon_ec2_metadata.csv
[21]: https://docs.datadoghq.com/help/
[22]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ec2/service_checks.json
[23]: https://app.datadoghq.com/dash/integration/60/aws-ec2-overview
[24]: https://app.datadoghq.com/monitors/recommended
[25]: https://www.datadoghq.com/blog/ec2-monitoring
[26]: https://www.datadoghq.com/blog/collecting-ec2-metrics
[27]: https://www.datadoghq.com/blog/monitoring-ec2-instances-with-datadog

