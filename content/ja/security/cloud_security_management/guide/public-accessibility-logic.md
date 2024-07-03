---
further_reading:
- link: /security/cloud_security_management/misconfigurations/
  tag: Documentation
  text: Start tracking misconfigurations with CSM Misconfigurations
- link: /security/default_rules/#cat-cloud-security-management
  tag: Documentation
  text: Out-of-the-box Detection Rules
title: How Datadog Determines if Resources are Publicly Accessible
---

Datadog uses a graph processing framework to map relationships between cloud resources to determine whether they are accessible from the internet. This guide outlines the logic used to classify resources as publicly accessible within the graph framework.

ネットワーク到達可能性に関する詳細については、[AWS のドキュメント][34]および [AWS Network Reachability Analyser][35] を参照してください。現在、`Is Publicly Accessible` ファセットは AWS のリソースに対してのみ使用できます。

## リソース依存関係グラフ

The following diagrams show how related resources are used to determine whether other resources are publicly accessible. For example, an AWS CloudTrail Trail stored in a public Amazon S3 bucket is itself publicly accessible. If a resource is publicly accessible because of another resource, the relationship is shown in the Cloud Security Management Misconfigurations resource relationships graph.


**Note**: Not all resources with the Publicly Accessible attribute are shown in these diagrams.

### AWS

{{< img src="security/cloud_security_management/guide/public_accessibility_relationships_aws.png" alt="A graph diagram showing the relationships between resources that are used to determine public accessibility for AWS" width="100%">}}

### Azure

{{< img src="security/cloud_security_management/guide/public_accessibility_relationships_azure.png" alt="A graph diagram showing the relationships between resources that are used to determine public accessibility for Azure" width="70%">}}

### Google Cloud

{{< img src="security/cloud_security_management/guide/public_accessibility_relationships_gcp.png" alt="A graph diagram showing the relationships between resources that are used to determine public accessibility for Google Cloud" width="50%">}}

## AWS public accessibility logic by resource

### Amazon S3 bucket

An [S3 bucket][1] (`aws_s3_bucket`) is considered publicly accessible if:

| **条件** | **説明** |
|--------------|-----------------|
|The bucket policy allows the `s3:GetObject` permission unconditionally, with resource and principal set to `"*"`. |This defines a public policy on the bucket, meaning that unauthenticated access is allowed. `"*"` is a wildcard, meaning access is given to any resource and principal. |
| None of the bucket's `public_access_block_configuration` and the AWS account's public access block (`aws_s3_account_public_access_block`) have `restrict_public_buckets` set to `true`. | None of the buckets or accounts explicitly block public access, meaning that the public bucket policy takes effect. |

詳細については、[Amazon S3 ストレージへのパブリックアクセスをブロックする][2]を参照してください。

### AWS CloudTrail trail

A [CloudTrail trail][3] (`aws_cloudtrail_trail`) is considered publicly accessible if:

| **条件** | **説明** |
|--------------|-----------------|
|トレイルの `s3_bucket_name` に、公開されていると判断される S3 バケットが設定されている。 |CloudTrail トレイルは、S3 バケットに送信されるログファイルです。トレイルが S3 の公開バケットに格納される場合、トレイルも公開されます。 |

### Amazon VPC subnet

A [subnet][4] (`aws_subnet`) is considered public if:

| **条件** | **説明** |
|--------------|-----------------|
|1 つまたは複数の[ルートテーブル][5]に接続されており、そのルートテーブルが[インターネットゲートウェイ][6]に接続され、送信先 CIDR ブロック `"0.0.0.0/0"` または IPv6 CIDR ブロック `"::/0"` にルーティングされる。| The route table attached to this subnet routes egress traffic through an internet gateway, meaning resources in the subnet can access the public internet.|
|1 つまたは複数の[ネットワーク ACL][7] に接続されており、ネットワーク ACL に、CIDR ブロック `"0.0.0.0/0"` または IPv6 CIDR ブロック `"::/0"` を持つインバウンドエントリとアウトバウンドエントリがそれぞれ 1 つ以上設定されている。| ネットワーク ACL は、サブネットを出入りするトラフィックをサブネットレベルで制御します。ネットワーク ACL のルールでインターネットからのインバウンドトラフィックが許可され、エフェメラルポートへのアウトバウンドトラフィックが許可されている場合で、パブリック IP が割り当てられ、セキュリティグループで許可されている場合は、アドレスサブネット内のリソースがインターネットに公開されます。|

AWS におけるパブリックサブネットの定義については、[VPC のサブネット][8]を参照してください。

### Amazon Redshift cluster

A [Redshift cluster][9] (`aws_redshift_cluster`) is considered publicly accessible if:

| **条件** | **説明** |
|--------------|-----------------|
|その構成で `publicly_accessible` が `true` に設定されている。|[VPC におけるクラスターの管理][10]を参照してください。 |
|パブリック [VPC][11] 内にある。 |パブリック VPC とは、少なくとも 1 つのパブリックサブネットを持ち、1 つまたは複数のネットワーク ACL に接続され、ネットワーク ACL に、CIDR ブロック `"0.0.0.0/0"` または IPv6 CIDR ブロック `"::/0"` を持つインバウンドエントリとアウトバウンドエントリがそれぞれ 1 つ以上設定されている VPC のことです。|
|CIDR 範囲 `"0.0.0.0/0"` または IPv6 CIDR 範囲 `"::/0"` からのアクセスを許可するルールが設定された[セキュリティグループ][12]と紐付けられている。 |セキュリティグループは、VPC へのインバウンドトラフィックを制御します。CIDR 範囲がオープンになっている場合は、すべての IP アドレスがアクセス権を取得できます。 |
|1 つまたは複数の[ルートテーブル][5]に接続されており、そのルートテーブルが[インターネットゲートウェイ][6]に接続され、送信先 CIDR ブロック `"0.0.0.0/0"` または IPv6 CIDR ブロック `"::/0"` にルーティングされる。| このサブネットにアタッチされているルートテーブルは、インターネットゲートウェイを通じてアウトバウンドトラフィックのルーティングを行い、サブネット内のリソースは公衆インターネットにアクセスできます。|

Redshift クラスターとパブリックアクセシビリティの詳細については、[プライベートな Amazon Redshift クラスターの公開][13]を参照してください。

### Amazon RDS DB instance

An [RDS DB instance][14] (`aws_rds_instance`) is considered publicly accessible if:

| **条件** | **説明** |
|--------------|-----------------|
|接続の構成で `publicly_accessible` が `true` に設定されている。|この設定により DB が公開され、DNS エンドポイントは VPC 内ではプライベート IP アドレスで名前解決し、VPC 外からはパブリック IP アドレスで名前解決します。ただし、クラスターへのアクセスは、引き続き関連するセキュリティグループにより制御されます。 |
|パブリック[サブネット][4]内にある。|-|
|CIDR 範囲 `"0.0.0.0/0"` または IPv6 CIDR 範囲 `"::/0"` からのアクセスを許可するルールが設定された[セキュリティグループ][12]と紐付けられている。 |セキュリティグループは、VPC へのインバウンドトラフィックを制御します。CIDR 範囲がオープンになっている場合は、すべての IP アドレスがアクセス権を取得できます。 |

RDS DB インスタンスへのパブリックアクセスの詳細については、[VPC のサブネットを使用する RDS DB インスタンスへの接続の問題を修正する][15]を参照してください。

### Amazon RDS DB snapshot

An [RDS DB snapshot][16] (`aws_rds_db_snapshot`) is considered publicly accessible if:

| **条件** | **説明** |
|--------------|-----------------|
|`"restore"` に設定された属性があり、属性値が `"all"` に設定されている。|DB スナップショットの可視性を Public に設定した場合、すべての AWS アカウントが手動の DB スナップショットから DB インスタンスを復元し、データにアクセスできます。|

詳細については、[DB スナップショットの共有][17]を参照してください。

### Amazon Elastic Load Balancer

次の場合、ELB (`aws_elbv2_load_balancer`) は公開されていると判断されます。

| **条件** | **説明** |
|--------------|-----------------|
|[スキーム][21]が `internet-facing` に設定されている。|スキームは、ロードバランサーが内部のロードバランサーか、インターネット向けロードバランサーかを決定します。|
|CIDR 範囲 `"0.0.0.0/0"` または IPv6 CIDR 範囲 `"::/0"` からのアクセスを許可するルールが設定された[セキュリティグループ][12]と紐付けられている。 |セキュリティグループは、VPC へのインバウンドトラフィックを制御します。CIDR 範囲がオープンになっている場合は、すべての IP アドレスがアクセス権を取得できます。 |

インターネット向けロードバランサーの詳細については、[アプリケーションロードバランサーの作成][20]を参照してください。

### Amazon EC2 instance

次の場合、[EC2 インスタンス][18] (`aws_ec2_instance`) は公開されていると判断されます。

* _"パブリックサブネット"によってアクセス権を判断:_

| **条件** | **説明** |
|--------------|-----------------|
|1 つまたは複数の[パブリック IP アドレス][18]を持っている。|パブリック IP アドレスにより、インスタンスがインターネットから到達可能になります。|
|パブリック[サブネット][4]内にある。|-|
|CIDR 範囲 `"0.0.0.0/0"` または IPv6 CIDR 範囲 `"::/0"` からのアクセスを許可するルールが設定された[セキュリティグループ][12]と紐付けられている。 |セキュリティグループは、VPC へのインバウンドトラフィックを制御します。CIDR 範囲がオープンになっている場合は、すべての IP アドレスがアクセス権を取得できます。 |

***または***

* _オートスケーリンググループを通じて ELB によってアクセス権を判断:_

| **条件** | **説明** |
|--------------|-----------------|
|ロードバランサーにアタッチされたセキュリティグループ (例: `SG1`) が公開されており、特定のポート `X` へのインバウンドトラフィックが許可されている。|これにより、ロードバランサーが特定のポートにおいて、インターネット由来のインバウンドトラフィックに対して開かれます。|
|ロードバランサーで、ポート `X` においてトラフィックを受け入れるリスナーが設定されている。|[リスナー][37]とは、構成したプロトコルとポートを使用して接続リクエストをチェックするプロセスです。|
|ロードバランサーで、トラフィックを特定のポート `Y` に転送するターゲットグループが設定されている。|[ターゲットグループ][38]は、指定されたプロトコルとポートを使用して、1 つまたは複数の登録済みのターゲット (EC2 インスタンスなど) にリクエストをルーティングします。 |
|オートスケーリンググループが、ロードバランサーのターゲットグループにアタッチされている。|-|
|EC2 インスタンスがオートスケーリンググループの一部で、`0.0.0.0/0`、VPC の CIDR (例: `10.0.0.0/8`)、またはロードバランサーのセキュリティグループ (`SG1`) のいずれかからのインバウンドトラフィックをポート `Y` で許可するルールが 1 つ以上設定されたセキュリティグループを使用している。|これにより、EC2 インスタンスがロードバランサーからのトラフィックに対して公開されます。セキュリティグループはロードバランサーからのトラフィックを許可する必要があり、したがって、すべての IP、VPC 内のすべての IP、またはその特定のセキュリティグループに対して公開される必要があります。|

***または***

* _ターゲットグループのみを通じて ELB によってアクセス権を判断:_

| **条件** | **説明** |
|--------------|-----------------|
|上記 (_オートスケーリンググループを通じて ELB によってアクセス権を判断_) の条件 1、2 および 3 が適用されます。 |-|
|EC2 インスタンスがターゲットグループのターゲットとして登録され、`0.0.0.0/0`、VPC の CIDR (例: `10.0.0.0/8`)、またはロードバランサーのセキュリティグループ (`SG1`) のいずれかからのインバウンドトラフィックをポート `Y` で許可するルールが 1 つ以上設定されたセキュリティグループを使用している。|インスタンスがターゲットグループのターゲットとして登録されているため、ロードバランサーはポート `Y` を通じてトラフィックを転送できます。セキュリティグループは、ロードバランサーからのトラフィックを許可します。|

EC2 インスタンスとパブリックアクセスの詳細については、[Linux インスタンスでインバウンドトラフィックを許可する][19]を参照してください。ロードバランサーを通じて公開される EC2 インスタンス例については、[例: プライベートサブネット内にサーバーを配置し、NATを使用する VPC][36] を参照してください。

### Amazon Elasticsearch ドメイン

An [Elasticsearch Domain][22] (`aws_elasticsearch_domain`) is considered publicly accessible if:

| **条件** | **説明** |
|--------------|-----------------|
|正規表現パターン `^search-.*\.es\.amazonaws\.com$` に一致するエンドポイントを持っている。|これは、公開されているドメインの[エンドポイント][23]で採用される形式です。|

Elasticsearch ドメインを非公開にする場合の詳細については、[VPC 内で Amazon OpenSearch Service ドメインをローンチする][24]を参照してください。

### Amazon マシーンイメージ (AMI)

次の場合、[マシーンイメージ][25] (`aws_ami`) は公開されていると判断されます。

| **条件** | **説明** |
|--------------|-----------------|
|顧客所有で、エイリアス所有者 (アカウントフィールドが `amazon` または `aws-marketplace` のいずれか) がいない 。|認証済みプロバイダー (Amazon または認証済みプロバイダーのいずれか) が所有するパブリック AMI にはエイリアス所有者が存在し、アカウントフィールドに `amazon` または `aws-marketplace` として表示されます。AWS ドキュメントの[共有 AMI を見つける][26]を参照してください。|
|イメージが `public` に設定され、イメージのローンチ権限がパブリックになっている。|AMI の `launchPermission` プロパティを変更することで、AMI を公開する (すべての AWS アカウントにローンチ権限を付与する) か、指定したAWS アカウントとのみ共有することができます。|

See [Make an AMI public][27] for an explanation of how to make an AMI public or private.

### Amazon EBS スナップショット

次の場合、[EBS スナップショット][28] (`aws_ebs_snapshot`) は公開されていると判断されます。

| **条件** | **説明** |
|--------------|-----------------|
|`create_volume_permission` が `all` に設定されている。|各スナップショットには、スナップショットのデータを新しい EBS ボリュームに復元するのに必要なすべての情報が格納されています。誰かがスナップショットからボリュームを作成した場合、その情報は公開されます。|

EBS の公開スナップショットの情報、およびそれを非公開にする方法については、[Amazon EBS スナップショットの共有][29]を参照してください。

### Amazon EKS クラスター

次の場合、[EKS クラスター][30] (`aws_eks_cluster`) は公開されていると判断されます。

| **条件** | **説明** |
|--------------|-----------------|
|クラスターの構成で、`endpoint_public_access` が `true` に設定されている。|この設定とオープンなパブリック CIDR が組み合わされると、クラスターが公開されます。 |
|クラスターの `public_access_cidrs` にオープンな CIDR ブロック (`"0.0.0.0/0"`) が格納されている。|EKS クラスターのパブリックエンドポイントにアクセスできる CIDR ブロックは制限することができます。オープンな CIDR ブロックは、インターネット上の誰でもエンドポイントにアクセスできることを意味します。|

パブリックな EKS クラスターに関する詳細については、[Amazon EKS クラスターのエンドポイントアクセス制御][31]を参照してください。

### Amazon SQS queue

An [SQS queue][32] (`aws_sqs_queue`) is considered publicly accessible if:

| **条件** | **説明** |
|--------------|-----------------|
|キューに、任意のプリンシパル (プリンシパルの設定が `"*"`) が無条件にアクションを実行することを許可する (`statement_has_condition` の設定が `false`) ポリシーが設定されている。|この設定により、キューは世界中のすべての人、または認証済みの AWS ユーザーからアクセス可能になります。|

パブリック SQS キューの詳細については、[Amazon SQS セキュリティベストプラクティス][33]を参照してください。

### AWS Lambda function

A [Lambda function][58] (`aws_lambda_function`) is considered publicly accessible if:

| **条件** | **説明** |
|--------------|-----------------|
|The function has a policy that allows any principal (`principal_policy` or `principal_aws`) set to `"*"`. |This setting makes the function accessible to everyone in the world or to any authenticated AWS user.|

See [Best practices for working with AWS Lambda functions][59] for more information about public Lambda functions.

## Azure public accessibility logic by resource

### Azure Network Security Group (NSG)

An Azure NSG (`azure_security_group`) grants public access if:

| Criteria | 説明 |
|----------|-------------|
|The security group has rules with protocol `tcp`, `udp` or `*`. | These are the protocol values that are relevant for determining public access for Azure resources. |
|The security group has `inbound` rules with access set to `Allow`. | These values indicates that the rule is allowing inbound traffic. |
|The security group has rules with source_address_prefix equal to `*`, `0.0.0.0`, `/0`, `::/0`, `internet`, or `any`. | These CIDR prefixes allow access to the internet. |
|The rules which match the above properties combine with any other `Deny` rules of higher priority to open at least one port to the Internet. | See [Security rules][39] to learn how Azure combines security group rules to calculate access. |

For details on how Azure NSGs allow and deny Internet access for a resource, see [Network Security Groups][40].

### Azure Virtual Machine Instance

A Virtual Machine Instance (`azure_virtual_machine_instance`) is considered publicly accessible if:

* _Attached to Network Security Group allowing public access:_

| Criteria | 説明 |
|----------|-------------|
|The virtual machine instance has a public IP address attached to one of its network interfaces. | A public IP is required for Internet access to a virtual machine instance. |
|The virtual machine instance has a network security group granting public access attached to one of its network interfaces. | To learn more about how a network can grant public access, see [Azure Network Security Group (NSG)](#azure-network-security-group-nsg). |

***または***

* _Has Public IP with SKU "Basic":_

| Criteria | 説明 |
|----------|-------------|
|The virtual machine instance has a public IP address with SKU Basic attached to its network interface. | A public IP address with SKU basic is open by default (see [Public IP addresses][41]). |
|The virtual machine instance has no attached network security groups. | If no network security groups are attached, then there are no rules blocking access through the open public IP address. |

To learn more about Azure Virtual Machine Instances and public access, see [Associate a public IP address to a virtual machine][42].

### Azure Storage blob container

A Storage blob container (`azure_storage_blob_container`) is considered publicly accessible if:

| Criteria | 説明 |
|----------|-------------|
|The storage blob container's storage account has no `allow_blob_public_access` attribute, or has the attribute set to `true`. | This means that the account allows public Internet access to Azure Blob Storage. To learn more about configuring anonymous read access with Azure Storage Accounts, see [Configure anonymous read access for containers and blobs][45].|
|The storage blob container's `public_access` attribute is set to `blob` or `container`. | This means that the account allows public Internet access to Azure Blob Storage. |
|The storage blob container is part of a storage account that does not explicitly block public access. | When a Storage Account doesn't explicitly block public access, Storage Blob Containers inside it can be made public. |

To learn more about disallowing blob public access on Azure Storage accounts, see [Choose to allow or disallow blob public access on Azure Storage accounts][46].

### Azure Kubernetes Service (AKS) cluster

An [AKS cluster][60] (`azure_aks_cluster`) is considered publicly accessible if:

| **条件** | **説明** |
|--------------|-----------------|
|`enable_private_cluster` is set to `false` in the cluster's configuration.|この設定とオープンなパブリック CIDR が組み合わされると、クラスターが公開されます。 |
|The cluster's `authorized_ip_ranges` contains an open CIDR block (`"0.0.0.0/0"`) or is unset.|An open CIDR block means anyone on the internet can access the endpoint.|

See [AKS best practices][61] for more information on public AKS clusters.

## Google Cloud Public accessibility logic by resource

### Google Cloud Compute firewall

A Compute Firewall (`gcp_compute_firewall`) grants public access if:

| Criteria | 説明 |
|----------|-------------|
|The firewall has one or more rules whose protocol is TCP or all and which have `0.0.0.0/0` or `::/0` in their `source_ranges`. | These CIDR prefixes allow access from the Internet, and are the protocol values that are relevant for determining public access. |
|The firewall's direction is `ingress`. | This means that the firewall is relevant for inbound access from the Internet. |

For more information about using Compute firewalls, [Choose to allow or disallow blob public access on Azure Storage accounts][47].

### Google Cloud Compute instance

A Compute instance (`gcp_compute_instance`) is considered publicly accessible if:

| Criteria | 説明 |
|----------|-------------|
|The compute instance has a public IP address, meaning at least one of its network interfaces has a public IP address defined in its access configurations, | To learn more about adding an external IP to a compute instance, see [Reserve a static external IP address][48]. |
|The compute instance has associated firewall rules that combine to open some range of ports to the internet. The firewall rules can be associated with the instance by:<br><p><ul><li>Having no `target_tags` or `target_service_accounts`, meaning the rule applies to the whole network.</li><li>Having `target_service_accounts` associated with one of the compute instance's `service_accounts`.</li><li>Having some `target_tags` that match the compute instance's network tags.</li></ul></p>The rules should grant public access (see [Google Cloud Compute Firewall](#google-cloud-compute-firewall)). | To learn how compute firewall rules are used to restrict port ranges for a compute instance, see [Firewall rule components][49]. |

Learn more about how compute firewall rules are used to restrict port ranges for a compute instance [here][50].

### Google Cloud BigQuery dataset

A BigQuery dataset (`gcp_bigquery_dataset`) is considered publicly accessible if:

| Criteria | 説明 |
|----------|-------------|
|The dataset has an IAM policy attached that has a `member` value of either `AllUsers` or `AllAuthenticatedUsers`. | These members allow anyone on the internet to access the database. See [IAM overview][51] for more information. |
|The dataset has an IAM policy attached that binds it to one of the following roles: `roles/viewer`, `roles/owner`, `roles/editor`, `roles/bigquery.admin`, `roles/bigquery.metadataviewer`, `roles/bigquery.dataowner`, `roles/bigquery.dataeditor`, `roles/bigquery.dataviewer`, or `roles/bigquery.user`. | These roles allow the person who accesses the resource to perform dangerous operations on the database. See the [role reference][52] for more information. |

Learn more about [BigQuery datasets][53].

### Google Cloud Storage bucket

A Storage Bucket (`gcp_storage_bucket`) is considered publicly accessible if:

| Criteria | 説明 |
|----------|-------------|
|The bucket has an IAM policy attached that has a `member` value of either `AllUsers` or `AllAuthenticatedUsers`. | These members allow anyone on the Internet to access the database. See more [here][54]. |
|バケットの `iam_configuration` で `public_access_prevention` が `inherited` に設定されている。 | This setting block public access if set to `enforced`. For more information about the public access prevention setting, see [Public access prevention][55]. |
|The bucket has an IAM policy attached that binds it to one of the following roles: <ul><li><code>roles/backupdr.cloudstorageoperator</code></li><li><code>roles/bigquerymigration.worker</code></li><li><code>roles/cloudbuild.builds.builder</code></li><li><code>roles/clouddeploy.jobrunner</code></li><li><code>roles/cloudmigration.storageaccess</code></li><li><code>roles/cloudtestservice.testadmin</code></li><li><code>roles/cloudtestservice.testviewer</code></li><li><code>roles/composer.environmentandstorageobjectadmin</code></li><li><code>roles/composer.environmentandstorageobjectuser</code></li><li><code>roles/composer.environmentandstorageobjectviewer</code></li><li><code>roles/composer.worker</code></li><li><code>roles/config.agent</code></li><li><code>roles/container.nodeserviceaccount</code></li><li><code>roles/dataflow.admin</code></li><li><code>roles/dataflow.worker</code></li><li><code>roles/dataplex.storagedataowner</code></li><li><code>roles/dataplex.storagedatareader</code></li><li><code>roles/dataproc.hubagent</code></li><li><code>roles/dataproc.worker</code></li><li><code>roles/firebase.admin</code></li><li><code>roles/firebase.developadmin</code></li><li><code>roles/firebase.developviewer</code></li><li><code>roles/firebase.viewer</code></li><li><code>roles/firebaserules.system</code></li><li><code>roles/managedidentities.domaincontrolleroperator</code></li><li><code>roles/storage.admin</code></li><li><code>roles/storage.legacyobjectowner</code></li><li><code>roles/storage.legacyobjectreader</code></li><li><code>roles/storage.objectadmin</code></li><li><code>roles/storage.objectuser</code></li><li><code>roles/storage.objectviewer</code></li></ul>|These roles allow the person who accesses the resource to perform dangerous operations on the bucket. See the [role reference][56] for more information.|

Explore more information about making storage buckets public [here][57].

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html#BasicsBucket
[2]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html
[3]: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-concepts.html#cloudtrail-concepts-trails
[4]: https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html#subnet-basics
[5]: https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Route_Tables.html#RouteTables
[6]: https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html
[7]: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html
[8]: https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html
[9]: https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-clusters.html#working-with-clusters-overview
[10]: https://docs.aws.amazon.com/redshift/latest/mgmt/managing-clusters-vpc.html
[11]: https://docs.aws.amazon.com/vpc/latest/userguide/configure-your-vpc.html
[12]: https://docs.aws.amazon.com/vpc/latest/userguide/security-groups.html
[13]: https://repost.aws/knowledge-center/redshift-cluster-private-public
[14]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.DBInstance.html
[15]: https://repost.aws/knowledge-center/rds-connectivity-instance-subnet-vpc
[16]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_CreateSnapshot.html
[17]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ShareSnapshot.html
[18]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-instance-addressing.html#concepts-public-addresses
[19]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/authorizing-access-to-an-instance.html
[20]: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-application-load-balancer.html
[21]: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html#load-balancer-scheme
[22]: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/createupdatedomains.html
[23]: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/vpc.html#vpc-architecture
[24]: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/vpc.html
[25]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html
[26]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/usingsharedamis-finding.html#usingsharedamis-finding-cli
[27]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/sharingamis-intro.html
[28]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSSnapshots.html
[29]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-modifying-snapshot-permissions.html
[30]: https://docs.aws.amazon.com/eks/latest/userguide/clusters.html
[31]: https://docs.aws.amazon.com/eks/latest/userguide/cluster-endpoint.html
[32]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html
[33]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-security-best-practices.html
[34]: https://docs.aws.amazon.com/
[35]: https://docs.aws.amazon.com/vpc/latest/reachability/what-is-reachability-analyzer.html
[36]: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-example-private-subnets-nat.html
[37]: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-listeners.html
[38]: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-target-groups.html
[39]: https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview#security-rules
[40]: https://azure.microsoft.com/en-us/blog/network-security-groups/
[41]: https://learn.microsoft.com/en-us/azure/virtual-network/ip-services/public-ip-addresses
[42]: https://learn.microsoft.com/en-us/azure/virtual-network/ip-services/associate-public-ip-address-vm?tabs=azure-portal
[43]: https://learn.microsoft.com/en-us/rest/api/compute/disks/create-or-update?view=rest-compute-2023-04-02&tabs=HTTP
[44]: https://learn.microsoft.com/en-us/azure/virtual-machines/disks-enable-private-links-for-import-export-portal
[45]: https://learn.microsoft.com/en-us/azure/storage/blobs/anonymous-read-access-configure?tabs=portal
[46]: https://azure.microsoft.com/en-us/updates/choose-to-allow-or-disallow-blob-public-access-on-azure-storage-accounts/
[47]: https://azure.microsoft.com/en-us/updates/choose-to-allow-or-disallow-blob-public-access-on-azure-storage-accounts/
[48]: https://cloud.google.com/compute/docs/ip-addresses/reserve-static-external-ip-address
[49]: https://cloud.google.com/firewall/docs/firewalls#firewall_rule_components
[50]: https://cloud.google.com/compute/docs/instances
[51]: https://cloud.google.com/iam/docs/overview
[52]: https://cloud.google.com/iam/docs/understanding-roles#bigquery-roles
[53]: https://cloud.google.com/bigquery?hl=en
[54]: https://cloud.google.com/iam/docs/overview
[55]: https://cloud.google.com/storage/docs/public-access-prevention
[56]: https://cloud.google.com/iam/docs/understanding-roles#cloud-storage-roles
[57]: https://cloud.google.com/storage/docs/access-control/making-data-public
[58]: https://docs.aws.amazon.com/lambda/latest/dg/welcome.html
[59]: https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html
[60]: https://learn.microsoft.com/en-us/azure/aks/intro-kubernetes
[61]: https://learn.microsoft.com/en-us/azure/aks/best-practices