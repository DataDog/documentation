---
further_reading:
- link: /security/cloud_security_management/misconfigurations/
  tag: ドキュメント
  text: Cloud Security Misconfigurations で誤構成の追跡を開始
- link: /security/default_rules/#cat-cloud-security-management
  tag: ドキュメント
  text: すぐに使える検出ルール
title: Datadog がリソースの公開状況を判断する方法
---
Datadog では、グラフ処理フレームワークを使用してクラウドリソース間の関係をマッピングし、それらがインターネットからアクセス可能かどうかを判断します。このガイドでは、グラフフレームワーク内でリソースをパブリックアクセス可能であると分類するために使用されるロジックを簡単に説明します。

## リソース依存関係グラフ {#resource-dependency-graph}

以下の図は、関連するリソースを使用して、別のリソースがパブリックアクセス可能かどうかを判断する方法を示しています。たとえば、公開 Amazon S3 バケットに保存されている AWS CloudTrail 証跡は、それ自体がパブリックアクセス可能です。あるリソースが別のリソースが原因でパブリックアクセス可能である場合、その関係は Cloud Security の誤設定リソース関係グラフに示されます。


<div class="alert alert-info">パブリックアクセス可能属性を持つすべてのリソースがこれらの図に示されるわけではありません。</div>

### AWS {#aws}

{{< img src="security/cloud_security_management/guide/public_accessibility_relationships_aws.png" alt="AWS のパブリックアクセス可能性を判断するために使用されるリソース間の関係を示すグラフ図" width="100%">}}

### Azure {#azure}

{{< img src="security/cloud_security_management/guide/public_accessibility_relationships_azure.png" alt="Azure のパブリックアクセス可能性を判断するために使用されるリソース間の関係を示すグラフ図" width="70%">}}

### Google Cloud {#google-cloud}

{{< img src="security/cloud_security_management/guide/public_accessibility_relationships_gcp.png" alt="Google Cloud のパブリックアクセス可能性を判断するために使用されるリソース間の関係を示すグラフ図" width="50%">}}

## リソース別の AWS パブリックアクセス可能性ロジック {#aws-public-accessibility-logic-by-resource}

AWS のネットワーク到達可能性の詳細については、[AWS のドキュメント][34]および [AWS Network Reachability Analyser][35] を参照してください。

### Amazon S3バケット {#amazon-s3-bucket}

[S3 バケット][1] (`aws_s3_bucket`) は、次のいずれかの場合にパブリックアクセス可能とみなされます。

* **バケットポリシーによるパブリックアクセス** (以下の条件をすべて満たす場合):

  | **条件** | **説明** |
  |--------------|-----------------|
  | バケットポリシーによってリスクの高い S3 アクション (読み取り、書き込み、削除、管理権限) が無条件に許可され、リソースとプリンシパルが `"*"` に設定されている。|これはバケットに対するパブリックポリシーを定義し、認証されていないアクセスが許可されることを意味します。`"*"` はワイルドカードです。つまり、任意のリソースとプリンシパルにアクセス権が付与されます。`s3:*` や `s3:Put*` などのワイルドカードアクションも一致します。|
  | バケットの `public_access_block_configuration` と AWS アカウントのパブリックアクセスブロック (`aws_s3_account_public_access_block`) のいずれにおいても、`restrict_public_buckets` が `true` に設定されていない。| バケットとアカウントのいずれもパブリックアクセスを明示的にブロックしていないため、パブリックバケットポリシーが有効になります。|

***または***

* **ACL (アクセス制御リスト) によるパブリックアクセス** (以下の条件をすべて満たす場合):

  | **条件** | **説明** |
  |--------------|-----------------|
  | バケットの ACL によって付与されたアクセス許可により、パブリックな非付与者に安全でない権限が許可されている。|バケットの ACL で、認証されたユーザー (`http://acs.amazonaws.com/groups/global/authenticatedusers`) またはすべてのユーザー (`http://acs.amazonaws.com/groups/global/allusers`) のいずれかに対し、`full_control`、`read`、`write`、`write_acp` のうち 1 つ以上のアクセス許可が付与されています。|
  | バケットの `public_access_block_configuration` と AWS アカウントのパブリックアクセスブロック (`aws_s3_account_public_access_block`) のいずれにおいても、`ignore_public_acls` が `true` に設定されていない。| バケットとアカウントのいずれもパブリック ACL を明示的に無視していないため、パブリック ACL によって付与された権限が有効になります。|

詳細については、「[Amazon S3 ストレージへのパブリックアクセスのブロック][2]」を参照してください。

### AWS CloudTrail 証跡 {#aws-cloudtrail-trail}

[CloudTrail 証跡][3] (`aws_cloudtrail_trail`) は、以下の場合にパブリックアクセス可能とみなされます。

| **条件** | **説明** |
|--------------|-----------------|
|証跡の `s3_bucket_name` が、パブリックアクセス可能とみなされる S3 バケットに設定されている。|CloudTrail 証跡は、S3 バケットに配信されるログファイルです。証跡がパブリック S3 バケットに保存されている場合、その証跡はパブリックアクセス可能です。|

### Amazon VPC サブネット {#amazon-vpc-subnet}

[サブネット][4] (`aws_subnet`) は、以下の条件をすべて満たす場合にパブリックとみなされます。

| **条件** | **説明** |
|--------------|-----------------|
|[インターネットゲートウェイ][6]に接続され、宛先 CIDR ブロック `"0.0.0.0/0"` または IPv6 CIDR ブロック `"::/0"` にルーティングされる 1 つ以上の[ルートテーブル][5]に関連付けられている。| このサブネットに関連付けられているルートテーブルは、インターネットゲートウェイ経由で出力トラフィックをルーティングするため、サブネット内のリソースがパブリックインターネットにアクセスできます。|
|CIDR ブロック `"0.0.0.0/0"` または IPv6 CIDR ブロック `"::/0"` を持つ入力エントリと出力エントリがそれぞれ少なくとも 1 つある、1 つ以上の[ネットワーク ACL][7] に関連付けられている。| ネットワーク ACL は、サブネットレベルでサブネットを出入りできるトラフィックを制御します。ネットワーク ACL ルールでインターネットからの受信トラフィックとエフェメラルポートへの送信トラフィックが許可されている場合、サブネット内のリソースにパブリック IP が割り当てられており、セキュリティグループによってインターネットからのアクセスが許可されていれば、インターネットからサブネット内のリソースへのアクセスが許可されます。|

AWS におけるパブリックサブネットの定義については、「[VPC のサブネット][8]」を参照してください。

### Amazon Redshift クラスター {#amazon-redshift-cluster}

[Redshift クラスター][9] (`aws_redshift_cluster`) は、以下の条件をすべて満たす場合にパブリックアクセス可能とみなされます。

| **条件** | **説明** |
|--------------|-----------------|
|設定で `publicly_accessible` が `true` に設定されている。|「[VPC でのクラスターの管理][10]」を参照してください。|
|パブリック [VPC][11] にある。|パブリック VPC とは、少なくとも 1 つのパブリックサブネットを持ち、CIDR ブロック `"0.0.0.0/0"` または IPv6 CIDR ブロック `"::/0"` を持つ受信エントリと送信エントリがそれぞれ少なくとも 1 つある、1 つ以上のネットワーク ACL に関連付けられている VPC です。|
|CIDR 範囲 `"0.0.0.0/0"` または IPv6 CIDR 範囲 `"::/0"` からのアクセスを許可するルールが設定された[セキュリティグループ][12]に関連付けられている。|セキュリティグループは、VPC へのインバウンドトラフィックを制御します。オープン CIDR 範囲が設定されている場合、すべての IP アドレスがアクセス可能になります。|
|[インターネットゲートウェイ][6]に接続され、宛先 CIDR ブロック `"0.0.0.0/0"` または IPv6 CIDR ブロック `"::/0"` にルーティングされる 1 つ以上の[ルートテーブル][5]に関連付けられている。| このサブネットに関連付けられているルートテーブルは、インターネットゲートウェイ経由で出力トラフィックをルーティングするため、サブネット内のリソースがパブリックインターネットにアクセスできます。|

Redshift クラスターとパブリックアクセスが可能かどうかについて詳しくは、[プライベート Amazon Redshift クラスターをパブリックにアクセス可能にする方法][13]を参照してください。

### Amazon RDS DB インスタンス {#amazon-rds-db-instance}

[RDS DB インスタンス][14] (`aws_rds_instance`) は、以下の条件をすべて満たす場合にパブリックアクセス可能とみなされます。

| **条件** | **説明** |
|--------------|-----------------|
|接続設定で `publicly_accessible` が `true` に設定されている。|この設定を行うと、DB がパブリックアクセス可能になるため、その DNS エンドポイントは、VPC 内からはプライベート IP アドレスに、VPC 外からはパブリック IP アドレスに解決されます。ただし、クラスターへのアクセスは、引き続き関連するセキュリティグループによって制御されます。|
|パブリック[サブネット][4]にある。|-|
|CIDR 範囲 `"0.0.0.0/0"` または IPv6 CIDR 範囲 `"::/0"` からのアクセスを許可するルールが設定された[セキュリティグループ][12]に関連付けられている。|セキュリティグループは、VPC へのインバウンドトラフィックを制御します。オープン CIDR 範囲が設定されている場合、すべての IP アドレスがアクセス可能になります。|

RDS DB インスタンスへのパブリックアクセスの詳細については、[VPC のサブネットを使用する RDS DB インスタンスへの接続の問題の解決方法][15]を参照してください。

### Amazon RDS DB スナップショット {#amazon-rds-db-snapshot}

[RDS DB スナップショット][16] (`aws_rds_db_snapshot`) は、以下の場合にパブリックアクセス可能とみなされます。

| **条件** | **説明** |
|--------------|-----------------|
|属性が `"restore"` に設定され、属性値が `"all"` に設定されている。|DB スナップショットの可視性をパブリックに設定すると、すべての AWS アカウントが手動 DB スナップショットから DB インスタンスを復元し、ご使用のデータにアクセスできるようになります。|

詳細については、[DB スナップショットを共有する][17]を参照してください。

### Amazon Elastic Load Balancer {#amazon-elastic-load-balancer}

ELB (`aws_elbv2_load_balancer`) は、以下の条件をすべて満たす場合にパブリックアクセス可能とみなされます。

| **条件** | **説明** |
|--------------|-----------------|
|[スキーム][21]が `internet-facing` に設定されている。|スキームにより、ロードバランサーが内部ロードバランサーであるか、インターネットに公開されたロードバランサーであるかが決まります。|
|CIDR 範囲 `"0.0.0.0/0"` または IPv6 CIDR 範囲 `"::/0"` からのアクセスを許可するルールが設定された[セキュリティグループ][12]に関連付けられている。|セキュリティグループは、VPC へのインバウンドトラフィックを制御します。オープン CIDR 範囲が設定されている場合、すべての IP アドレスがアクセス可能になります。|

インターネットに公開されているロードバランサーの詳細については、「[Application Load Balancer の作成][20]」を参照してください。

### Amazon EC2 インスタンス {#amazon-ec2-instance}

[EC2 インスタンス][18] (`aws_ec2_instance`) は、以下のいずれかの場合にパブリックアクセス可能と見なされます。

* **「パブリックサブネット」によってアクセスが決定される** (以下の条件をすべて満たす場合):

  | **条件** | **説明** |
  |--------------|-----------------|
  |1 つ以上の[パブリック IP アドレス][18]がある。|パブリック IP アドレスを使用すると、インスタンスがインターネットからアクセス可能になります。|
  |パブリック[サブネット][4]にある。|-|
  |CIDR 範囲 `"0.0.0.0/0"` または IPv6 CIDR 範囲 `"::/0"` からのアクセスを許可するルールが設定された[セキュリティグループ][12]に関連付けられている。|セキュリティグループは、VPC へのインバウンドトラフィックを制御します。オープン CIDR 範囲が設定されている場合、すべての IP アドレスがアクセス可能になります。|

***または***

* **ELB によってアクセスが決定される** (以下の条件をすべて満たす場合):

  | **条件** | **説明** |
  |--------------|-----------------|
  | ロードバランサーに関連付けられているセキュリティグループ (例: `SG1`) がパブリックアクセス可能で、特定のポート `X` への受信トラフィックを許可している。| この場合、ロードバランサーは特定のポートでインターネットからの受信トラフィックを受け入れます。|
  | ロードバランサーに、ポート `X` でトラフィックを受け入れるリスナーがある。| [リスナー][37]は、ユーザーが設定したプロトコルとポートを使用して接続リクエストを確認するプロセスです。|
  | ロードバランサーに、特定のポート `Y` にトラフィックを転送するターゲットグループがある。| [ターゲットグループ][38]は、ユーザーが指定したプロトコルとポートで、EC2 インスタンスなどの 1 つ以上の登録済みターゲットにリクエストをルーティングします。|
  | EC2 インスタンスがターゲットグループのターゲットとして登録されており、`0.0.0.0/0`、VPC CIDR (例: `10.0.0.0/8`)、またはロードバランサーのセキュリティグループ (`SG1`) からポート `Y` への受信トラフィックを許可するルールが少なくとも 1 つあるセキュリティグループを持つ。| インスタンスはターゲットグループのターゲットとして登録されているため、ロードバランサーはポート `Y` 経由でインスタンスにトラフィックを転送できます。セキュリティグループは、ロードバランサーからのトラフィックを許可する必要があります。|

***または***

- **到達可能性パスによってアクセスが決定される** (Security Graph が、以下のいずれかのルートを通じてインスタンスをインターネットに接続するネットワーク到達可能性パスを特定した場合):
  - [AWS Global Accelerator][64] の背後。
  - [Amazon API Gateway][65] の背後で、内部ロードバランサーへの VPC リンクを介して。
  - [Amazon CloudFront][66] の背後。ロードバランサーは CloudFront の IP リストに制限されています。

EC2 インスタンスとパブリックアクセスの詳細については、[Linux インスタンスのインバウンドトラフィックを許可する][19]を参照してください。ロードバランサーを介して公開される EC2 インスタンスの例については、「[例: プライベートサブネットにサーバーがある VPC および NAT][36]」を参照してください。

### Amazon Elasticsearch ドメイン {#amazon-elasticsearch-domain}

[Elasticsearchドメイン][22] (`aws_elasticsearch_domain`) は、以下の場合にパブリックアクセス可能とみなされます。

| **条件** | **説明** |
|--------------|-----------------|
|正規表現パターン `^search-.*\.es\.amazonaws\.com$` に一致するエンドポイントを持つ。|これは、パブリックアクセス可能なドメインの[エンドポイント][23]が取る形式です。|

Elasticsearch ドメインをパブリックアクセス不可にする方法の詳細については、「[VPC 内で Amazon OpenSearch Service ドメインを起動する][24]」を参照してください。

### AMI (Amazon マシンイメージ) {#amazon-machine-images-ami}

[マシンイメージ][25] (`aws_ami`) は、以下の条件をすべて満たす場合にパブリックアクセス可能とみなされます。

| **条件** | **説明** |
|--------------|-----------------|
|顧客所有である。つまり、所有者のエイリアスが設定されていない (アカウントフィールドの `amazon` または `aws-marketplace`)。|承認されたプロバイダー (Amazon または承認済みのプロバイダー) が所有するパブリック AMI では所有者のエイリアスが設定されており、アカウントフィールドで `amazon` または `aws-marketplace` と表示されます。AWS ドキュメントの[共有 AMI を検索する][26]を参照してください。|
|イメージが `public` に設定されていて、イメージの起動許可がパブリックである。|AMI の `launchPermission` プロパティを変更して、AMI をパブリックにしてすべての AWS アカウントに起動許可を付与するか、指定した AWS アカウントとのみ AMI を共有することができます。|

AMI をパブリックまたはプライベートにする方法については、[AMI を公開する][27]を参照してください。

### Amazon EBS スナップショット {#amazon-ebs-snapshots}

[EBS スナップショット][28] (`aws_ebs_snapshot`) は、以下の場合にパブリックアクセス可能とみなされます。

| **条件** | **説明** |
|--------------|-----------------|
|`create_volume_permission` が `all` に設定されている。|各スナップショットには、スナップショットのデータを新しい EBS ボリュームに復元するために必要な情報がすべて含まれています。誰でもスナップショットからボリュームを作成できる場合、その情報はパブリックアクセス可能です。|

パブリック EBS スナップショットの詳細およびスナップショットをプライベートにする方法については、[Amazon EBS スナップショットを共有する][29]を参照してください。

### Amazon EKS クラスター {#amazon-eks-clusters}

[EKS クラスター][30] (`aws_eks_cluster`) は、以下の条件をすべて満たす場合にパブリックアクセス可能とみなされます。

| **条件** | **説明** |
|--------------|-----------------|
クラスターの設定で |`endpoint_public_access` が `true` に設定されている。|この設定とオープンなパブリック CIDR を併せて使用すると、クラスターがパブリックアクセス可能になります。|
|クラスターの `public_access_cidrs` にオープン CIDR ブロック (`"0.0.0.0/0"`) が含まれている。|EKS クラスターのパブリックエンドポイントにアクセスできる CIDR ブロックを制限できます。オープン CIDR ブロックとは、インターネット上の誰でもエンドポイントにアクセスできることを意味します。|

パブリック EKS クラスターの詳細については、[Amazon EKS クラスターエンドポイントアクセス制御][31]を参照してください。

### Amazon SQS キュー {#amazon-sqs-queue}

[SQS キュー][32] (`aws_sqs_queue`) は、以下の場合にパブリックにアクセス可能とみなされます。

| **条件** | **説明** |
|--------------|-----------------|
|キューのポリシーで、任意のプリンシパル (`"*"` に設定されているプリンシパル) が無条件でアクションを実行することが許可されている (`statement_has_condition` が `false` に設定されている)。|この設定を行うと、世界中のすべてのユーザー、または認証されたすべての AWS ユーザーがキューにアクセスできるようになります。|

パブリック SQS キューの詳細については、[Amazon SQS のセキュリティベストプラクティス][33]を参照してください。

### AWS Lambda 関数 {#aws-lambda-function}

[Lambda 関数][58] (`aws_lambda_function`) は、以下の場合にパブリックアクセス可能とみなされます。

| **条件** | **説明** |
|--------------|-----------------|
|関数のポリシーで、任意のプリンシパル (`principal_policy` または `principal_aws`) を `"*"` に設定することが許可されている。|この設定を行うと、世界中のすべてのユーザー、または認証されたすべての AWS ユーザーが関数にアクセスできるようになります。|

パブリック Lambda 関数の詳細については、「[AWS Lambda 関数を使用するためのベストプラクティス][59]」を参照してください。

## リソース別の Azure パブリックアクセス可能性ロジック {#azure-public-accessibility-logic-by-resource}

### Azure NSG (ネットワークセキュリティグループ) {#azure-network-security-group-nsg}

Azure NSG (`azure_security_group`) は、以下の条件をすべて満たす場合にパブリックアクセスを許可します。

| 条件 | 説明 |
|----------|-------------|
|セキュリティグループに、`tcp`、`udp`、または `*` プロトコルを使用するルールがある。| これらは、Azure リソースのパブリックアクセスの決定に使用されるプロトコル値です。|
|セキュリティグループに、アクセスが `Allow` に設定された `inbound` ルールがある。| これらの値は、そのルールによってインバウンドトラフィックが許可されることを示します。|
|セキュリティグループに、source_address_prefix が `*`、`0.0.0.0`、`/0`、`::/0`、`internet`、または `any` と等しいルールがある。| これらの CIDR プレフィックスは、インターネットからのアクセスを許可します。|
|少なくとも 1 つのポートをインターネットに対して開放するために、上記の特徴に一致するルールを、それより優先度が高いその他の `Deny` ルールと併用している。| Azure でのセキュリティグループルールの組み合わせによるアクセスの決定方法について詳しくは、「[セキュリティ規則][39]」を参照してください。|

Azure NSG によってリソースへのインターネットアクセスが許可および拒否される仕組みについて詳しくは、「[ネットワークセキュリティグループ][40]」を参照してください。

### Azure 仮想マシンインスタンス {#azure-virtual-machine-instance}

仮想マシンインスタンス (`azure_virtual_machine_instance`) は、次のいずれかの場合にパブリックアクセス可能とみなされます。

* **パブリックアクセスを許可するネットワークセキュリティグループに関連付けられている** (以下のすべての条件を満たす場合):

  | 条件 | 説明 |
  |----------|-------------|
  |仮想マシンインスタンスに、パブリック IP アドレスが割り当てられているネットワークインターフェイスがある。| インターネットから仮想マシンインスタンスにアクセスするには、パブリック IP が必要です。|
  |仮想マシンインスタンスに、パブリックアクセスを許可するネットワークセキュリティグループが関連付けられているネットワークインターフェイスがある。| ネットワークでパブリックアクセスが許可される仕組みについて詳しくは、「[Azure NSG (ネットワークセキュリティグループ)](#azure-network-security-group-nsg)」を参照してください。|

***または***

* **SKU が「Basic」のパブリック IP がある** (以下のすべての条件を満たす場合):

  | 条件 | 説明 |
  |----------|-------------|
  |仮想マシンインスタンスに、SKU が Basic であるパブリック IP アドレスが割り当てられているネットワークインターフェイスがある。| SKU が Basic のパブリック IP アドレスはデフォルトで開放されています (「[パブリック IP アドレス][41]」を参照)。|
  |仮想マシンインスタンスにネットワークセキュリティグループが関連付けられていない。| ネットワークセキュリティグループが関連付けられていない場合、開放されているパブリック IP アドレス経由のアクセスをブロックするルールはありません。|

Azure 仮想マシンインスタンスとパブリックアクセスの詳細については、「[仮想マシンへのパブリック IP アドレスの関連付け][42]」を参照してください。

### Azure Storage Blob コンテナー {#azure-storage-blob-container}

Storage Blob コンテナー (`azure_storage_blob_container`) は、以下の条件をすべて満たす場合にパブリックアクセス可能とみなされます。

| 条件 | 説明 |
|----------|-------------|
|Storage Blob コンテナーのストレージアカウントに `allow_blob_public_access` 属性がないか、この属性が `true` に設定されている。| この場合、そのアカウントでは Azure Blob Storage へのパブリックインターネットアクセスが許可されます。Azure Storage アカウントでの匿名読み取りアクセスの構成について詳しくは、「[コンテナーと BLOB 用の匿名読み取りアクセスを構成する][45]」を参照してください。|
|Storage Blob コンテナーの`public_access` 属性が `blob` または `container` に設定されている。| この場合、そのアカウントでは Azure Blob Storage へのパブリックインターネットアクセスが許可されます。|
|Storage Blob コンテナーが、パブリックアクセスを明示的にブロックしていないストレージアカウントに属している。| ストレージアカウントがパブリックアクセスを明示的にブロックしていない場合、そのアカウントに属する Storage Blob コンテナーをパブリックに設定できます。|

Azure Storage アカウントで Blob パブリックアクセスを禁止する方法について詳しくは、「[Azure Storage アカウントでの Blob パブリックアクセスの許可または禁止を選択する][46]」を参照してください。

### AKS (Azure Kubernetes Service) クラスター {#azure-kubernetes-service-aks-cluster}

[AKS クラスター][60] (`azure_aks_cluster`) は、以下の条件をすべて満たす場合にパブリックアクセス可能とみなされます。

| **条件** | **説明** |
|--------------|-----------------|
クラスターの設定で |`enable_private_cluster` が `false` に設定されている。|この設定とオープンなパブリック CIDR を併せて使用すると、クラスターがパブリックアクセス可能になります。|
|クラスターの `authorized_ip_ranges` にオープンな CIDR ブロック (`"0.0.0.0/0"`) が設定されているか、何も設定されていない。|オープンな CIDR ブロックが設定されている場合、インターネット上の誰でもエンドポイントにアクセスできます。|

パブリック AKS クラスターの詳細については、[AKSのベストプラクティス][61]を参照してください。

## リソース別の Google Cloud パブリックアクセス可能性ロジック {#google-cloud-public-accessibility-logic-by-resource}

### Google Cloud コンピューティングファイアウォール {#google-cloud-compute-firewall}

コンピューティングファイアウォール (`gcp_compute_firewall`) は、以下の条件をすべて満たす場合にパブリックアクセスを許可します。

| 条件 | 説明 |
|----------|-------------|
|ファイアウォールに、プロトコルが TCP またはすべてであり、その `source_ranges` に `0.0.0.0/0` または `::/0` が設定されているルールが 1 つ以上ある。| これらの CIDR プレフィックスはインターネットからのアクセスを許可し、パブリックアクセスを判断するために使用されるプロトコル値となります。|
|ファイアウォールの方向が `ingress` である。| この場合、そのファイアウォールはインターネットからのインバウンドアクセスに使用されます。|

コンピューティングファイアウォールの使用について詳しくは、「[Azure Storage アカウントでの Blob パブリックアクセスの許可または禁止を選択する][47]」を参照してください。

### Google Cloud コンピューティングインスタンス {#google-cloud-compute-instance}

コンピューティングインスタンス (`gcp_compute_instance`) は、以下の条件をすべて満たす場合にパブリックアクセス可能とみなされます。

| 条件 | 説明 |
|----------|-------------|
|コンピューティングインスタンスにパブリック IP アドレスが割り当てられている。つまり、少なくとも 1 つのネットワークインターフェイスのアクセス構成でパブリック IP アドレスが定義されている。| コンピューティングインスタンスへの外部 IP の追加について詳しくは、「[静的外部 IP アドレスの予約][48]」を参照してください。|
|コンピューティングインスタンスに、組み合わせて使用することでインターネットに対して特定のポート範囲を開放するファイアウォールルールが関連付けられている。ファイアウォールルールをインスタンスに関連付けるには、次のようにします。<br><ul><li>`target_tags` および `target_service_accounts` のいずれも設定しない。この場合、ルールはネットワーク全体に適用されます。</li><li>`target_service_accounts` をいずれかのコンピューティングインスタンスの `service_accounts` に関連付ける。</li><li>コンピューティングインスタンスのネットワークタグと一致する `target_tags` を設定する。</li></ul>ルールはパブリックアクセスを許可するものである必要があります (「[Google Cloud コンピューティングファイアウォール](#google-cloud-compute-firewall)」を参照)。| コンピューティングファイアウォールルールを使用してコンピューティングインスタンスのポート範囲を制限する方法については、「[ファイアウォールルールのコンポーネント][49]」を参照してください。|

コンピューティングファイアウォールルールを使用してコンピューティングインスタンスのポート範囲を制限する方法については、[こちら][50]をご覧ください。

### Google Cloud BigQuery データセット {#google-cloud-bigquery-dataset}

BigQuery データセット (`gcp_bigquery_dataset`) は、以下の条件をすべて満たす場合にパブリックアクセス可能とみなされます。

| 条件 | 説明 |
|----------|-------------|
|データセットに、`member` の値が `AllUsers` または `AllAuthenticatedUsers` である IAM ポリシーが関連付けられている。| これらのメンバーは、インターネット上の全員にデータベースへのアクセスを許可します。詳細については、「[IAM の概要][51]」を参照してください。|
|データセットに、`roles/viewer`、`roles/owner`、`roles/editor`、`roles/bigquery.admin`、`roles/bigquery.metadataviewer`、`roles/bigquery.dataowner`、`roles/bigquery.dataeditor`、`roles/bigquery.dataviewer`、または `roles/bigquery.user` のいずれかのロールにデータセットをバインドする IAM ポリシーが関連付けられている。| これらのロールは、リソースにアクセスするユーザーに対し、データベースでの危険な操作の実行を許可します。詳細については、[ロールリファレンス][52]を参照してください。|

[BigQuery データセット][53]の詳細をご確認ください。

### Google Cloud Storage バケット {#google-cloud-storage-bucket}

Storage バケット (`gcp_storage_bucket`) は、以下の条件をすべて満たす場合にパブリックアクセス可能とみなされます。

| 条件 | 説明 |
|----------|-------------|
|バケットに、`member` の値が `AllUsers` または `AllAuthenticatedUsers` である IAM ポリシーが関連付けられている。| これらのメンバーは、インターネット上の全員にデータベースへのアクセスを許可します。詳細については、[こちら][54]をご覧ください。|
|バケットの `iam_configuration` で、`public_access_prevention` が `inherited` に設定されている。| これが `enforced` に設定されている場合、パブリックアクセスがブロックされます。パブリックアクセスの防止設定の詳細については、「[公開アクセスを防止する][55]」を参照してください。|
|バケットに、次のいずれかのロールにバケットをバインドする IAM ポリシーが関連付けられている。<ul><li><code>roles/backupdr.cloudstorageoperator</code></li><li><code>roles/bigquerymigration.worker</code></li><li><code>roles/cloudbuild.builds.builder</code></li><li><code>roles/clouddeploy.jobrunner</code></li><li><code>roles/cloudmigration.storageaccess</code></li><li><code>roles/cloudtestservice.testadmin</code></li><li><code>roles/cloudtestservice.testviewer</code></li><li><code>roles/composer.environmentandstorageobjectadmin</code></li><li><code>roles/composer.environmentandstorageobjectuser</code></li><li><code>roles/composer.environmentandstorageobjectviewer</code></li><li><code>roles/composer.worker</code></li><li><code>roles/config.agent</code></li><li><code>roles/container.nodeserviceaccount</code></li><li><code>roles/dataflow.admin</code></li><li><code>roles/dataflow.worker</code></li><li><code>roles/dataplex.storagedataowner</code></li><li><code>roles/dataplex.storagedatareader</code></li><li><code>roles/dataproc.hubagent</code></li><li><code>roles/dataproc.worker</code></li><li><code>roles/firebase.admin</code></li><li><code>roles/firebase.developadmin</code></li><li><code>roles/firebase.developviewer</code></li><li><code>roles/firebase.viewer</code></li><li><code>roles/firebaserules.system</code></li><li><code>roles/managedidentities.domaincontrolleroperator</code></li><li><code>roles/storage.admin</code></li><li><code>roles/storage.legacyobjectowner</code></li><li><code>roles/storage.legacyobjectreader</code></li><li><code>roles/storage.objectadmin</code></li><li><code>roles/storage.objectuser</code></li><li><code>roles/storage.objectviewer</code></li></ul>|これらのロールは、リソースにアクセスするユーザーに対し、バケットでの危険な操作の実行を許可します。詳細については、[ロールリファレンス][56]を参照してください。|

ストレージバケットをパブリックにする方法の詳細については、[こちら][57]をご覧ください。

### Google Cloud Kubernetes Engine クラスター {#google-cloud-kubernetes-engine-clusters}

Kubernetes Engine クラスター (`gcp_kubernetes_engine_cluster`) は、以下の**基本条件**を**すべて**満たし、**かつ、以下に示す追加条件を少なくとも 1 つ**満たす場合に、パブリックアクセス可能とみなされます。

**基本条件 (すべて必須):**

| **条件** | **説明** |
|--------------|-----------------|
| プライベートエンドポイントが無効になっている | クラスターの[プライベートエンドポイント][62]が有効になっていない (`enable_private_endpoint`) 場合、コントロールプレーンにはパブリック IP アドレスが割り当てられています。|
| パブリックエンドポイントが有効である | クラスターにパブリックエンドポイントが構成されています (`public_endpoint` が true)。|

**かつ、以下の条件を少なくとも 1 つ満たす。**

* **承認済みネットワークが無効である**

  | **条件** | **説明** |
  |--------------|-----------------|
  | [承認済みネットワーク][63]が有効になっていない。| クラスターのコントロールプレーンにアクセスできるユーザーを決定する IP 許可リストの制限がないため、どの IP アドレスからでもアクセスが可能になります。|

***または***

* **無制限の CIDR ブロックが許可されている**

  | **条件** | **説明** |
  |--------------|-----------------|
  | 承認済みネットワークの構成に `0.0.0.0/0` CIDR ブロックが含まれている。| この CIDR ブロックが設定されていると、インターネット上のどの IP アドレスからでもアクセスが可能になります。|

***または***

* **承認済みネットワークに Google Cloud の外部 IP アドレスが追加されている**

  | **条件** | **説明** |
  |--------------|-----------------|
  | Google Cloud の外部 IP アドレスが承認済みネットワークに追加されている (`gcpPublicCidrsAccessEnabled` が `true` に設定されている)。| この場合、Google Cloud VM に割り当てられたすべての外部 IP アドレスからのアクセスが許可されます。つまり、誰でも Google Cloud で VM を作成し、クラスターのコントロールプレーンにアクセスできるようになります。|

***または***

* **Google Cloud の広範な IP 範囲が許可されている**

  | **条件** | **説明** |
  |--------------|-----------------|
  | 承認済みネットワークの構成に `34.0.0.0/7` CIDR ブロックが含まれている。| この CIDR 範囲は、Google Cloud の IP 範囲からのアクセスを許可するために使用されることがあり、パブリックアクセス可能とみなされます。 |

<div class="alert alert-info">承認済みネットワークが有効になっている (<code>{"enabled":true}</code>) が、CIDR ブロックのリストが空 (<code>{"enabled":true, "cidr_blocks":[]}</code>) であるクラスターでは、コントロールプレーンへのすべての外部アクセスがブロックされるため、パブリックアクセス可能とは<strong>みなされません</strong>。</div>

## 参考資料{#further-reading}

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
[62]: https://cloud.google.com/kubernetes-engine/docs/how-to/latest/network-isolation#private_cp
[63]: https://cloud.google.com/kubernetes-engine/docs/how-to/latest/network-isolation#overview
[64]: https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html
[65]: https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html
[66]: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html