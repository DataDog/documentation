---
further_reading:
- link: /security/misconfigurations
  tag: ドキュメント
  text: CSM Misconfigurations で誤構成の追跡を開始
- link: /security/default_rules/#cat-cloud-security-management
  tag: ドキュメント
  text: すぐに使える検出ルール
title: Datadog がリソースの公開状況を判断する方法
---

Datadog は、クラウドリソース間の関係をマッピングするグラフ処理フレームワークを使用して、クラウドリソースがインターネットからアクセス可能かどうかを判断します。このガイドでは、グラフフレームワーク内でリソースを公開に分類するために使用されるロジックについて説明します。

ネットワーク到達可能性に関する詳細については、[AWS のドキュメント][34]および [AWS Network Reachability Analyser][35] を参照してください。現在、`Is Publicly Accessible` ファセットは AWS のリソースに対してのみ使用できます。

## リソース依存関係グラフ

下の図は、他のリソースが公開されているかどうかを判断するために、関連リソースがどのように使用されるかを示しています。たとえば、S3 の公開バケットに格納されている CloudTrail トレイルは、それ自体が公開されています。リソースが別のリソースが原因で公開されている場合、その関係性が Cloud Security Management Misconfigurations リソース関係性グラフに示されます。

この図は、リソース同士の相関関係から公開状況を判断する際の参考にしてください。

**注**: Publicly Accessible 属性を持つすべてのリソースが、この図に示されているわけではありません。

{{< img src="security/cloud_security_management/guide/public_accessibility_relationships.png" alt="公開状況を判断するために使用されるリソース間の関係性を示すグラフ図" width="100%">}}

## リソース別のパブリックアクセシビリティ判定ロジック

次のセクションでは、リソースのパブリックアクセシビリティ判定の背後にあるロジックをリソース別に詳しく説明します。

**注:** すべてのリソースが、そのリソース構成のみを通じてパブリックアクセシビリティの有無を分類できるわけではありません。そのようなリソースは、ここでは取り扱っていません。


### Amazon S3 バケット

次の場合、[S3 バケット][1] (`aws_s3_bucket`) は公開されていると判断されます。

* _ACL によってアクセス権を判断:_

| **条件** | **説明** |
|--------------|-----------------|
|バケットの `public_access_block_configuration` とバケットアカウントのパブリックアクセスブロック (`aws_s3_account_public_access_block`) の両方で、`ignore_public_acls` が `false` に設定されている。 |アクセスコントロールリスト (ACL) は、このバケットに対するアクセス権を付与された AWS アカウントおよびグループを定義するものです。`ignore_public_acls` が `false` に設定されている場合、バケットの構成でパブリックアクセスを許可する ACL の使用が許可されます。  |
|バケットの権限付与リストに、`http://acs.amazonaws.com/groups/global/AllUsers` または `/AuthenticatedUsers` という URI の値が含まれている。 |`AllUsers` は、世界中のすべての人にバケットへのアクセス権を付与します。`AuthenticatedUsers` は、世界中の AWS 認証ユーザーにバケットへのアクセス権を付与します。 |

***または***

* _バケットポリシーによってアクセス権を判断:_

| **条件** | **説明** |
|--------------|-----------------|
|バケットの `public_access_block_configuration` とバケットアカウントのパブリックアクセスブロック (`aws_s3_account_public_access_block`) の両方で、`ignore_public_acls` が `false` に設定されている。 |アクセスコントロールリスト (ACL) は、このバケットに対するアクセス権を付与された AWS アカウントおよびグループを定義するものです。`ignore_public_acls` が `false` に設定されている場合、バケットの構成でパブリックアクセスを許可する ACL の使用が許可されます。  |
|バケットのポリシーステートメントで、`s3:GetObject` 権限が無条件で許可され、リソースとプリンシパルが `"*"` に設定されている。 |これにより、バケットのパブリックポリシーが定義され、クロスアカウントアクセスが許可されます。`"*"` はワイルドカードで、あらゆるリソースおよびプリンシパルにアクセス権が付与されます。 |

詳細については、[Amazon S3 ストレージへのパブリックアクセスをブロックする][2]を参照してください。

### AWS CloudTrail トレイル

次の場合、[Cloudtrail トレイル][3] (`aws_cloudtrail_trail`) は公開されていると判断されます。

| **条件** | **説明** |
|--------------|-----------------|
|トレイルの `s3_bucket_name` に、公開されていると判断される S3 バケットが設定されている。 |CloudTrail トレイルは、S3 バケットに送信されるログファイルです。トレイルが S3 の公開バケットに格納される場合、トレイルも公開されます。 |

### Amazon VPC サブネット

次の場合、[サブネット][4] (`aws_subnet`) は公開されていると判断されます。

| **条件** | **説明** |
|--------------|-----------------|
|1 つまたは複数の[ルートテーブル][5]に接続されており、そのルートテーブルが[インターネットゲートウェイ][6]に接続され、送信先 CIDR ブロック `"0.0.0.0/0"` または IPv6 CIDR ブロック `"::/0"` にルーティングされる。| このサブネットにアタッチされているルートテーブルは、インターネットゲートウェイを通じてアウトバウンドトラフィックのルーティングを行い、サブネット内のリソースは公衆インターネットにアクセスできます。|
|1 つまたは複数の[ネットワーク ACL][7] に接続されており、ネットワーク ACL に、CIDR ブロック `"0.0.0.0/0"` または IPv6 CIDR ブロック `"::/0"` を持つインバウンドエントリとアウトバウンドエントリがそれぞれ 1 つ以上設定されている。| ネットワーク ACL は、サブネットを出入りするトラフィックをサブネットレベルで制御します。ネットワーク ACL のルールでインターネットからのインバウンドトラフィックが許可され、エフェメラルポートへのアウトバウンドトラフィックが許可されている場合で、パブリック IP が割り当てられ、セキュリティグループで許可されている場合は、アドレスサブネット内のリソースがインターネットに公開されます。|

AWS におけるパブリックサブネットの定義については、[VPC のサブネット][8]を参照してください。

### Amazon Redshift クラスター

次の場合、[Redshift クラスター][9] (`aws_redshift_cluster`) は公開されていると判断されます。

| **条件** | **説明** |
|--------------|-----------------|
|その構成で `publicly_accessible` が `true` に設定されている。|[VPC におけるクラスターの管理][10]を参照してください。 |
|パブリック [VPC][11] 内にある。 |パブリック VPC とは、少なくとも 1 つのパブリックサブネットを持ち、1 つまたは複数のネットワーク ACL に接続され、ネットワーク ACL に、CIDR ブロック `"0.0.0.0/0"` または IPv6 CIDR ブロック `"::/0"` を持つインバウンドエントリとアウトバウンドエントリがそれぞれ 1 つ以上設定されている VPC のことです。|
|CIDR 範囲 `"0.0.0.0/0"` または IPv6 CIDR 範囲 `"::/0"` からのアクセスを許可するルールが設定された[セキュリティグループ][12]と紐付けられている。 |セキュリティグループは、VPC へのインバウンドトラフィックを制御します。CIDR 範囲がオープンになっている場合は、すべての IP アドレスがアクセス権を取得できます。 |
|1 つまたは複数の[ルートテーブル][5]に接続されており、そのルートテーブルが[インターネットゲートウェイ][6]に接続され、送信先 CIDR ブロック `"0.0.0.0/0"` または IPv6 CIDR ブロック `"::/0"` にルーティングされる。| このサブネットにアタッチされているルートテーブルは、インターネットゲートウェイを通じてアウトバウンドトラフィックのルーティングを行い、サブネット内のリソースは公衆インターネットにアクセスできます。|

Redshift クラスターとパブリックアクセシビリティの詳細については、[プライベートな Amazon Redshift クラスターの公開][13]を参照してください。

### Amazon RDS DB インスタンス

次の場合、[RDS DB インスタンス][14] (`aws_rds_instance`) は公開されていると判断されます。

| **条件** | **説明** |
|--------------|-----------------|
|接続の構成で `publicly_accessible` が `true` に設定されている。|この設定により DB が公開され、DNS エンドポイントは VPC 内ではプライベート IP アドレスで名前解決し、VPC 外からはパブリック IP アドレスで名前解決します。ただし、クラスターへのアクセスは、引き続き関連するセキュリティグループにより制御されます。 |
|パブリック[サブネット][4]内にある。|-|
|CIDR 範囲 `"0.0.0.0/0"` または IPv6 CIDR 範囲 `"::/0"` からのアクセスを許可するルールが設定された[セキュリティグループ][12]と紐付けられている。 |セキュリティグループは、VPC へのインバウンドトラフィックを制御します。CIDR 範囲がオープンになっている場合は、すべての IP アドレスがアクセス権を取得できます。 |

RDS DB インスタンスへのパブリックアクセスの詳細については、[VPC のサブネットを使用する RDS DB インスタンスへの接続の問題を修正する][15]を参照してください。

### Amazon RDS DB スナップショット

次の場合、[RDS DB スナップショット][16] (`aws_rds_db_snapshot`) は公開されていると判断されます。

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

### Amazon EC2 インスタンス

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

次の場合、[Elasticsearch ドメイン][22] (`aws_elasticsearch_domain`) は公開されていると判断されます。

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

AMI を公開または非公開にする方法の説明は、[AMI の公開][27]を参照してください。

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

### Amazon SQS キュー

次の場合、[SQS キュー][32] (`aws_sqs_queue`) は公開されていると判断されます。

| **条件** | **説明** |
|--------------|-----------------|
|キューに、任意のプリンシパル (プリンシパルの設定が `"*"`) が無条件にアクションを実行することを許可する (`statement_has_condition` の設定が `false`) ポリシーが設定されている。|この設定により、キューは世界中のすべての人、または認証済みの AWS ユーザーからアクセス可能になります。|

パブリック SQS キューの詳細については、[Amazon SQS セキュリティベストプラクティス][33]を参照してください。


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