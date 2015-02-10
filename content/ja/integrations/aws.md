---
title: Datadog-AWS Cloudwatch インテグレーション
sidebar:
  nav:
    - header: AWS インテグレーション
    - text: Configure CloudWatch
      href: "#cloudwatch"
    - text: Configure CloudTrail
      href: "#cloudtrail"
    - text: Troubleshooting
      href: "#troubleshooting"
    - header: インテグレーション
    - text: インデックスへ戻る
      href: "/ja/integrations/"
---


<!-- ### Configure CloudWatch -->

### インテグレーションが、AWSの情報にアクセスするための設定
{: #cloudwatch}

<!-- The recommended way to configure Cloudwatch in Datadog is to create a
new user via the [IAM Console][1] and grant that user (or group of users) a set of permissions. -->

AWS Cloudwhatchインテグレーションを使って情報を収集するためには、[IAM Console][1]から新規ユーザを作成し、インテグレーションが必要としている権限を付与した後、そのユーザをDatadog側の登録してAWS情報のアクセスすることをお勧めします。

<!-- At the very least, you need to grant **Amazon EC2, Cloudwatch *read-only* access**. -->

このインテグレーションが利用するAWSユーザには、最も制限されている状態でも **Amazon EC2, Cloudwatch**の、**読み込みの権限**を付与してください。

<!-- These can be set via policy templates in the console or using . -->

AWSユーザのアクセス権限は、[IAM Console][1]のpolicy templatesやsAmazon's APIで設定/変更をすることができます。

<!-- If you are using RDS, SES, SNS, or other AWS features, you will need to grant the user additional permissions. Here is the current list of permissions required to take full advantage of the Datadog AWS integration. As we add other components to the integration, these permissions may change. -->

RDS, SES, SNSなど、AWSの他のサービスの情報も収取したい場合は、それらのサービスにもアクセスできる権限をAWSユーザに付与する必要があります。次に示すポリシーテンプレートは、現AWS Cloudwatchインテグレーションが収集できる全情報にアクセスするための必要な権限を設定するためのサンプルです。尚、このテンプレートに記載した項目は、インテグレーションのコンポーネントの追加に伴い変更される可能性があります。

~~~
{
  "Statement": [
    {
      "Action": [
        "cloudtrail:DescribeTrails",
        "cloudtrail:GetTrailStatus",
        "cloudwatch:Describe*",
        "cloudwatch:Get*",
        "cloudwatch:List*",
        "ec2:Describe*",
        "elasticloadbalancing:Describe*",
        "iam:Get*",
        "iam:List*",
        "rds:Describe*",
        "rds:List*",
        "ses:Get*",
        "ses:List*",
        "sns:Get*",
        "sns:List*",
        "sqs:GetQueueAttributes",
        "sqs:ListQueues",
        "sqs:ReceiveMessage"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
~~~

<!-- Once these credentials are configured within AWS, go into the [AWS integration tile][2] within Datadog to pull this data in. -->

AWS側でユーザの認証Key情報(`Access Key Id`, `Secret Access Key`)を取得し、アクセス権限が設定できたら、 Datadogのダッシュボードから[AWS integration tile][2]へ移動して、 その情報を登録します。


<!-- ### CloudTrail integration -->

### CloudTrail インテグレーション
{: #cloudtrail}

<!-- AWS CloudTrail records AWS API calls for your account in log files. Datadog can read these files and create events in your stream. Here is an example of a CloudTrail event: -->

AWS CloudTrailは、AWS APIを使った操作の内容をログファイルに記録します。Datadogではそれらのログファイルを読み込み、ダッシュボード上のイベントストリーム内に、AWS API操作に関するイベントを登録することができます:

![CloudTrail sample event](/static/images/cloudtrail_event.png)

<!-- #### How to configure CloudTrail? -->

#### CloudTrailのイベントを表示するための設定
{: #config-cloudtrail}

<!-- First make sure that you have configured CloudWatch and that the user you created for Datadog has the **AWS CloudTrail read-only access**. See above explanation. Besides the instructions below you will also have to configure the separate [Cloudtrail integration tile][3] within Datadog. -->

まず最初に、CloudWatchインテグレーションの設定が正しく完了していることを確認してください。同時に、CloudWatchインテグレーションが情報にアクセスするために登録したIAMの権限に**AWS CloudTrailがログを記録しているファイルへのアクセス権**も設定されていることを確認してください。それら権限の確認ができたら、Datadogのインテグレーションページで[Cloudtrail integrationタイル][3]をクリックし、収集するCloudTrailイベント項目にチェックマークを入れ、`Update Configuration`ボタンをクリックし保存してください。

<!-- CloudTrail has to be configured on a per-region basis. Make sure you complete the two steps below for **all regions** that you want Datadog to collect CloudTrail data from. -->

AWS CloudTrailのログ出力ファイルの設定は、リージョン毎に実施する必要があります。従って、CloudTrailで情報を収集する予定の全てのリージョンに対し、次の2つのステップを必ず実施してください。

<!-- 1. [Go to your CloudTrail console][4] to enable it. Then select the S3 bucket you wish to use as follows:
![](/static/images/cloudtrail_config.png)
2. Your user must have access to the S3 bucket you have selected. To grant your user read-only access to your bucket, you would paste the following policy in the IAM console: -->

1. [CloudTrailのコンソール][4]から`Get Started`ボタンをクリックします。その後、次の画面で使用するS3のバケツを設定します:
![](/static/images/cloudtrail_config.png)
2. DatadogからAWSへのアクセスに使用するIAMユーザには、先に設定したS3のバケツへのアクセス権限が必要です。IAMユーザに権限を付与するためには、IAMのコンソールから次の様なセキュリティーポリシーを追記してください:

~~~
{ "Statement": [
  {
    "Action": [
      "s3:ListBucket",
      "s3:GetBucketLocation",
      "s3:GetObject"
    ],
    "Effect": "Allow",
    "Resource": [
      "arn:aws:s3:::your-s3-bucket-name",
      "arn:aws:s3:::your-s3-bucket-name/*"
    ]
  } ]
}
~~~


<!-- #### What events are collected? -->

#### CloudTrailで取集できるイベントについて

<!-- Below is the list of events that Datadog will collect from CloudTrail and display in your event stream. If you would like to see other events that are not mentionned here, please reach out to [our support team][5]. -->

以下が、DatadogがCloudTrail経由で取集するイベント項目のリストです。ここに記載されていない他の項目をイベントストリームに表示したい場合は、[support team][5]コンタクトしてみてください。

**EC2 Actions**

- AttachVolume
- AuthorizeSecurityGroup
- CreateSecurityGroup
- CreateVolume
- CreateTags
- DeleteVolume
- DeleteTags
- DetachVolume
- RebootInstances
- RevokeSecurityGroupEgress
- RevokeSecurityGroupIngress
- RunInstances
- StartInstances
- StopInstances
- TerminateInstances

**RDS Actions**

- CreateDBInstance
- RebootDBInstance
- ModifyDBInstance
- DeleteDBInstance

**IAM Actions**

- AddRoleToInstanceProfile
- AddUserToGroup
- ChangePassword
- CreateAccessKey
- CreateAccountAlias
- CreateGroup
- CreateInstanceProfile
- CreateLoginProfile
- CreateRole
- CreateSAMLProvider
- CreateUser
- CreateVirtualMFADevice
- DeleteAccessKey
- DeleteAccountAlias
- DeleteAccountPasswordPolicy
- DeleteGroup
- DeleteGroupPolicy
- DeleteInstanceProfile
- DeleteLoginProfile
- DeleteRole
- DeleteRolePolicy
- DeleteSAMLProvider
- DeleteServerCertificate
- DeleteSigningCertificate
- DeleteUser
- DeleteUserPolicy
- DeleteVirtualMFADevice
- PutGroupPolicy
- PutRolePolicy
- PutUserPolicy
- RemoveRoleFromInstanceProfile
- RemoveUserFromGroup
- UpdateAccessKey
- UpdateAccountPasswordPolicy
- UpdateAssumeRolePolicy
- UpdateGroup
- UpdateLoginProfile
- UpdateSAMLProvider
- UpdateServerCertificate
- UpdateSigningCertificate
- UpdateUser
- UpdateServerCertificate
- UpdateSigningCertificate

**VPC Actions**

- AssociateDhcpOptions
- AssociateRouteTable
- AttachVpnGateway
- CreateCustomerGateway
- CreateDhcpOptions
- CreateRouteTable
- CreateVpnConnection
- CreateVpnConnectionRoute
- CreateVpnGateway
- DeleteCustomerGateway
- DeleteDhcpOptions
- DeleteRouteTable
- DeleteVpnConnection
- DeleteVpnConnectionRoute
- DeleteVpnGateway
- DetachVpnGateway
- DisassociateRouteTable
- ReplaceRouteTableAssociation

**ELB Actions**

- ApplySecurityGroupsToLoadBalancer
- AttachLoadBalancerToSubnets
- ConfigureHealthCheck
- CreateAppCookieStickinessPolicy
- CreateLBCookieStickinessPolicy
- CreateLoadBalancer
- CreateLoadBalancerListeners
- CreateLoadBalancerPolicy
- DeleteLoadBalancer
- DeleteLoadBalancerListeners
- DeleteLoadBalancerPolicy
- DeregisterInstancesFromLoadBalancer
- DetachLoadBalancerFromSubnets
- DisableAvailabilityZonesForLoadBalancer
- EnableAvailabilityZonesForLoadBalancer
- ModifyLoadBalancerAttributes
- RegisterInstancesWithLoadBalancer
- SetLoadBalancerListenerSSLCertificate
- SetLoadBalancerPoliciesForBackendServer
- SetLoadBalancerPoliciesOfListener


<!-- ### Troubleshooting -->

### トラブルシューティング
{: #troubleshooting}

<!-- #### Do you believe you're seeing a discrepancy between your data in Cloudwatch and Datadog? -->

#### CloudwatchとDatadogに表示されているメトリクスの値の違いについて

詳細に関しては、[Datadog-AWS Cloudwatch Integration][8]を参照してください。日本語での解説が必要な場合は、[support@datadoghq.com][6]までご連絡ください。

<!-- There are two important distinctions to be aware of: -->
<!-- 認識しておくべき二つの重要な違いがあります: -->

  <!-- 1. In AWS for counters, a graph that is set to 'sum' '1minute' shows the total number of occurrences in one minute leading up to that point, i.e. the rate per 1 minute. Datadog is displaying the raw data from AWS normalized to per second values, regardless of the timeframe selected in AWS, which is why you will probably see our value as lower.
  2. Overall, min/max/avg have a different meaning within AWS than in Datadog. In AWS, average latency, minimum latency, and maximum latency are three distinct metrics that AWS collects. When Datadog pulls metrics from AWS Cloudwatch, we only get the average latency as a single time series per ELB. Within Datadog, when you are selecting 'min', 'max', or 'avg', you are controlling how multiple time series will be combined. For example, requesting `system.cpu.idle` without any filter would return one series for each host that reports that metric and those series need to be combined to be graphed. On the other hand, if you requested `system.cpu.idle` from a single host, no aggregation would be necessary and switching between average and max would yield the same result. -->

<!-- #### Metrics delayed? -->

#### メトリクスの遅延

<!-- When using the AWS integration, we're pulling in metrics via the Cloudwatch API. You may see a slight delay in metrics from AWS due to some constraints that exist for their API. -->

When using the AWS integration, we're pulling in metrics via the Cloudwatch API. You may see a slight delay in metrics from AWS due to some constraints that exist for their API.

AWSインテグレーションをインストールすると、Datadog側ではCloudwatchのAPIを使ってAWSからメトリクスを収集し始めます。その際、AWSのAPIの制約によりメトリクスの収集に遅延が発生することがあります。

<!-- To begin, the Cloudwatch API only offers a metric-by-metric crawl to pull data. The Cloudwatch APIs have a rate limit that varies based on the combination of authentication credentials, region, and service. Metrics are made available by AWS dependent on the account level. For example, if you are paying for "detailed metrics" within AWS, they are available more quickly. This level of service for detailed metrics also applies to granularity, with some metrics being available per minute and others per five minutes. -->

CloudWatchのAPIでは、データを収取する手段としてメトリクス毎にクロールしか提供されていません。その上、CloudWatchのAPIには、認証資格, リージョン, およびサービスの組み合わせに基づいて変化するレート制限があります。メトリクス内容は、アカウントレベルによっても変化します。例えば、"detailed metrics"のサービスを購入している場合、他よりも迅速に収集できるようになります。この"detailed metrics"サービスは、メトリクスの粒度にも影響を与えます。このサービスを受けている場合、メトリクスの粒度は、1分単位です。それ以外では、5分単位になります。

<!-- On the Datadog side, we do have the ability to prioritize certain metrics within an account to pull them in faster, depending on the circumstances. Please contact [support@datadoghq.com][6] for more info on this. -->

状況に応じてより高速にメトリクス収取のために、Datadog側には、AWSアカウント内の特定のメトリクスのを優先して収集する機能があります。この機能に関して詳しく知りたい場合は、[support@datadoghq.com][6]へ連絡してください。

<!-- To obtain metrics with virtually zero delay, we recommend installing the Datadog Agent on those hosts. We’ve
written a bit about this [here][7],  especially in relation to CloudWatch. -->

事実上、ゼロ遅延でメトリクスを収集するためには、CloudWatchでモニタリングしようとしているホスト上に、Datadog Agentをインストールすることをお勧めします。Datadog Agentをホストにインストールするメリットに関しては、[Datadog blog:"Don’t Fear the Agent"][7]で解説しています。(特に、CloudWatchとの比較についても...)

   [1]: https://console.aws.amazon.com/iam/home#s=Home
   [2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
   [3]: https://app.datadoghq.com/account/settings#integrations/cloudtrail
   [4]: https://console.aws.amazon.com/cloudtrail
   [5]: /ja/help
   [6]: mailto:support@datadoghq.com
   [7]: http://www.datadoghq.com/2013/10/dont-fear-the-agent
   [8]: /integrations/aws/#troubleshooting
