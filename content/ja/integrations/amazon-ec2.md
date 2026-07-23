---
aliases:
- /ja/integrations/amazon_ec2
app_id: amazon-ec2
categories:
- cloud
- os & system
- aws
- log collection
custom_kind: integration
description: Amazon Elastic Compute Cloud (Amazon EC2) は、クラウドでサイズ変更可能なコンピュート キャパシティを提供する
  Web サービスです。
media: []
title: Amazon EC2
---
## 概要

Amazon Elastic Compute Cloud (Amazon EC2) は、クラウドでサイズ変更可能なコンピュート キャパシティを提供する Web サービスです。開発者が Web スケールのクラウド コンピューティングをより簡単に扱えるように設計されています。

このインテグレーションを有効にすると、すべての EC2 メトリクスに加え、予定メンテナンスのような追加イベントも Datadog で確認できます。

## セットアップ

### インストール

まだ設定していない場合は、先に [Amazon Web Services インテグレーション](https://docs.datadoghq.com/integrations/amazon_web_services/) を設定してください。

### 設定

1. [AWS integration page](https://app.datadoghq.com/integrations/amazon-web-services) の `Metric Collection` タブで、`EC2` が有効になっていることを確認します。

1. Amazon EC2 メトリクスを収集するには、[Datadog IAM ポリシー](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) に次の必須権限を追加します。詳しくは、AWS サイトの [EC2 ポリシー](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/security-iam.html) を参照してください。

   | AWS 権限               | 説明                                                                                                                           |
   | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
   | `ec2:DescribeInstanceStatus` | ELB インテグレーションでは、インスタンスの健全性確認に使用します。EC2 インテグレーションでは、すべてのインスタンスの健全性情報を取得するために使用します。 |
   | `ec2:DescribeSecurityGroups` | EC2 インスタンスに SecurityGroup 名とカスタム タグを追加します。 |
   | `ec2:DescribeInstances` | EC2 インスタンスおよび EC2 の CloudWatch メトリクスにタグを追加します。 |

1. [Datadog - Amazon EC2 インテグレーション](https://app.datadoghq.com/integrations/amazon-ec2) をインストールします。

**注**: Datadog で一部の EC2 インスタンスだけを監視したい場合は、それらの EC2 インスタンスに `datadog:true` のような AWS タグを付与します。続いて、[Datadog AWS integration page](https://app.datadoghq.com/integrations/amazon-web-services) の **Metric Collection** タブにある **Limit metric collection to specific resources** テキスト ボックスに、そのタグを指定します。

#### EC2 自動ミュート

Datadog は、CloudWatch API から取得したホスト ステータスに基づいて、EC2 インスタンスの手動停止や AWS autoscaling によるインスタンス終了に関連するモニターを先回りして自動ミュートできます。自動ミュートされた EC2 インスタンスは、[Monitor Downtime](https://app.datadoghq.com/monitors/downtimes) ページで **Show automatically muted hosts** を有効にすると確認できます。

なお、自動ミュートを機能させるには EC2 インテグレーションをインストールしておく必要があります。メトリクス収集をタグ付きホストのみに制限している場合は、そのタグに一致するインスタンスだけが自動ミュートされます。

想定どおりの EC2 インスタンス停止に合わせてモニターを抑止するには、[AWS integration page](https://app.datadoghq.com/integrations/amazon-web-services) で **EC2 automuting** にチェックを入れます:

![Amazon EC2 自動ミュート](images/aws_ec2_automuting_2024.png)

### Agent をインストールする

Datadog では、EC2 インスタンスに Datadog Agent を導入する方法を 2 通り用意しています。Amazon EC2 インスタンスに Agent をインストールする利点については、[クラウド インスタンスに Datadog Agent をインストールすべき理由](https://docs.datadoghq.com/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/) を参照してください。

{{< tabs >}}

{{% tab "AWS Systems Manager (SSM)" %}}

#### Amazon Systems Manager UI から Agent をインストールする (推奨)

AWS Systems Manager を使って EC2 インスタンスに Datadog Agent をインストールするには、次の手順に従います。

1. EC2 インスタンスに割り当てる [IAM ロール](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html) を設定し、[AmazonSSMManagedInstanceCore 権限](https://docs.aws.amazon.com/systems-manager/latest/userguide/setup-instance-permissions.html) を有効にします。

1. [AWS SSM の document タブ](https://docs.aws.amazon.com/systems-manager/latest/userguide/documents.html) に移動します。

1. `datadog` を検索します。注: AWS Management console 上部のナビゲーション バーでリージョンを切り替え、対象リージョンに対応する document を探す必要がある場合があります。

1. 用途に応じて Linux 用または Windows 用の document を選択します。

- Linux: datadog-agent-installation-linux
- Windows: datadog-agent-installation-windows

5. コマンド パラメーターを入力します。
1. Agent をインストールする対象インスタンスを選択します。
1. **Run** をクリックします。
1. 確認ステータスの完了を待ち、その後 Datadog の Infrastructure list を確認します。

#### 別の方法で Agent をカスタム インストールする

##### Parameter store

[Parameter store](https://console.aws.amazon.com/systems-manager/parameters) で、次の内容のパラメーターを作成します:

- Name: `dd-api-key-for-ssm`
- Description: (任意)
- Type: `SecureString`
- KMS key source: `My current account`
- KMS Key ID: 選択されているデフォルト値を使用
- Value: ご利用の [Datadog API キー](https://app.datadoghq.com/organization-settings/api-keys)

##### Documents

Systems Manager で、新しい [Document](https://console.aws.amazon.com/systems-manager/documents) を作成します:

- Name: `dd-agent-install`
- Target type: (任意)
- Document type: `Command document`
- Content: `JSON`

Datadog US site を利用している場合は、`runCommand` 内の `<AWS_REGION>` を `us-east-1` などの値に更新した [dd-agent-install-us-site.json](https://docs.datadoghq.com/resources/json/dd-agent-install-us-site.json) を使用します。Datadog EU site を利用している場合は、代わりに [dd-agent-install-eu-site.json](https://docs.datadoghq.com/resources/json/dd-agent-install-eu-site.json) を使用します。

##### Run command

[Run Command](https://console.aws.amazon.com/systems-manager/run-command/executing-commands) で **Run command** ボタンをクリックし、次の手順を実行します:

- **Command document**:
  - 検索ボックスをクリックし、_Owner -> Owned by me_ を選択します。
  - 作成した document の横にあるラジオ ボタンを選択します。
  - 必要に応じて **Document version** を選択します。
- **Targets**:
  - 対象の EC2 インスタンスを選択します。
- **Output options** (任意):
  - 問題が発生したときのログを残すため、**CloudWatch output** チェック ボックスを選択します。
- **Other sections** (任意):
  - 構成に合わせて、そのほかのセクションを必要に応じて調整します。

**Run** ボタンをクリックすると、ステータスを表示する確認ページが表示されます。完了を待ってから、Datadog の [Infrastructure list](https://app.datadoghq.com/infrastructure) を確認します。

{{% /tab %}}

{{% tab "EC2 Image Builder" %}}

#### EC2 Image Builder を使って Agent をインストールする

Datadog は、Datadog Agent 用の EC2 Image Builder コンポーネントを AWS Marketplace で提供しています。ユーザーはこの製品をサブスクライブし、Image Builder コンポーネントを使ってカスタム AMI を作成できます。

以下の手順で、Datadog Agent を組み込んだカスタム Amazon Machine Image を作成し、Datadog Agent があらかじめインストールされた EC2 インスタンスをプロビジョニングします。

<div class="alert alert-info">
初回リリースでは、このコンポーネントは Amazon Linux 2023 でテストされています。Datadog Agent をサポートする Linux ディストリビューションであれば動作する想定です
</div>

##### サブスクリプションを作成する

1. EC2 Image Builder console を開き、'Discover products' に移動します。
1. **Components** タブを選択し、_Datadog Agent_ を検索します。
1. **View subscription options** をクリックし、画面の案内に従ってサブスクリプションを作成します。

詳しくは、[AWS Marketplace サブスクリプションの管理](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/marketplace-manage-subscriptions.html) を参照してください。

##### イメージ レシピを作成する

1. EC2 Image Builder console の **Image recipes** に移動します。
1. 次の設定で新しいレシピを作成します:
   - Base image - `arn:aws:imagebuilder:us-east-1:aws:image/amazon-linux-2023-x86/x.x.x`.
   - Component - `arn:aws:imagebuilder:us-east-1:aws-marketplace:component/datadog-agent-for-linux-prod-wwo2b4p7dgrkk/0.1.0/1`
   - 必要に応じてコンポーネント パラメーターを設定します。ここでは既定値を使用する前提で説明します。

詳しくは、[EC2 Image Builder レシピ](https://docs.aws.amazon.com/imagebuilder/latest/userguide/create-image-recipes.html) を参照してください。

##### Image Pipeline を作成してイメージをビルドする

**前提条件**:

- デフォルト ロール `EC2InstanceProfileForImageBuilder` には、次の追加権限が必要です。
  - `imagebuilder:GetMarketplaceResource`: Marketplace から Datadog Agent コンポーネントを取得するため
  - `secretsmanager:GetSecretValue`: secrets store に保存されている API キーとアプリケーション キーを取得するため
- `mp-ib-datadog-agent-secret` という名前のシークレットを作成し、Datadog API キーとアプリケーション キーを、それぞれ `dd-api-key` と `dd-app-key` に対応付けて保存します。

パイプラインの作成とイメージのビルドに進みます:

1. EC2 Image Builder console の **Image pipelines** に移動します。
1. そのレシピ用のパイプラインを作成します。これは複数ステップのウィザード形式ですが、ここでは最もシンプルな構成を説明します:
   - ステップ 1 - パイプライン名を入力し、ビルド スケジュールを manual に設定します。
   - ステップ 2 - 前のセクションで作成したレシピを選択します。
   - ステップ 3 - 既定値のままにします。
   - ステップ 4 - 追加ポリシーを付与したロール `EC2InstanceProfileForImageBuilder` を使用する既定のオプションをそのまま使います。
   - ステップ 5 - 既定値のままにします。
   - ステップ 6 - 内容を確認して作成します。
1. 新しく作成したパイプラインに移動して実行します。
1. パイプラインが完了すると、概要に新しいイメージの ARN が表示されます。
1. `mp-ib-datadog-agent-secret` シークレットが正しく設定されていれば、そのイメージで EC2 インスタンスが起動した直後から Datadog Agent がメトリクスの送信を開始します。

詳しくは、[EC2 Image Builder Pipelines](https://docs.aws.amazon.com/imagebuilder/latest/userguide/ami-image-pipelines.html) を参照してください。

##### コンポーネント パラメーター

レシピでは、次のパラメーターを使って Agent をカスタマイズできます:

- `DD_SITE` - テレメトリー データの送信先 site。既定値: `datadoghq.com`.
- `HOST_TAGS` - ホスト タグ。既定値: `installer:ec2_image_builder`.
- `SM_SECRET_NAME` - API キーとアプリケーション キーを保存するシークレット名。既定値: `mp-ib-datadog-agent-secret`.
- `SM_API_KEY` - シークレット内で API キーを参照するためのキー。既定値: `dd-api-key`
- `SM_API_KEY` - シークレット内でアプリケーション キーを参照するためのキー。既定値: `dd-app-key`

{{% /tab %}}

{{< /tabs >}}

### ログ収集

[Datadog Agent](https://docs.datadoghq.com/agent/logs/) または別の [log shipper](https://docs.datadoghq.com/integrations/rsyslog/) を使って、ログを Datadog に送信します。

## 収集データ

### メトリクス

| | |
| --- | --- |
| **aws.ec2.cpucredit_balance** <br>(gauge) | インスタンスに蓄積されている CPU クレジット数<br>_単位は unit_ |
| **aws.ec2.cpucredit_usage** <br>(gauge) | 消費された CPU クレジット数<br>_単位は unit_ |
| **aws.ec2.cpuutilization** <br>(gauge) | インスタンスで現在使用中の、割り当て済み EC2 コンピュート ユニットの平均使用率<br>_単位は percent_ |
| **aws.ec2.cpuutilization.maximum** <br>(gauge) | インスタンスで現在使用中の、割り当て済み EC2 コンピュート ユニットの最大使用率<br>_単位は percent_ |
| **aws.ec2.disk_read_bytes** <br>(gauge) | インスタンスで利用可能なすべてのエフェメラル ディスクから読み取られたバイト数<br>_単位は byte_ |
| **aws.ec2.disk_read_ops** <br>(gauge) | インスタンスで利用可能なすべてのエフェメラル ディスクで完了した読み取り操作数<br>_単位は operation_ |
| **aws.ec2.disk_write_bytes** <br>(gauge) | インスタンスで利用可能なすべてのエフェメラル ディスクに書き込まれたバイト数<br>_単位は byte_ |
| **aws.ec2.disk_write_ops** <br>(gauge) | インスタンスで利用可能なすべてのエフェメラル ディスクで完了した書き込み操作数<br>_単位は operation_ |
| **aws.ec2.ebsbyte_balance** <br>(gauge) | Nitro ベース インスタンスのバースト バケットに残っているスループット クレジットの割合<br>_単位は percent_ |
| **aws.ec2.ebsiobalance** <br>(gauge) | Nitro ベース インスタンスのバースト バケットに残っている I/O クレジットの割合<br>_単位は percent_ |
| **aws.ec2.ebsread_bytes** <br>(gauge) | Nitro ベース インスタンスで、インスタンスにアタッチされたすべての EBS ボリュームから読み取られた平均バイト数<br>_単位は byte_ |
| **aws.ec2.ebsread_bytes.sum** <br>(gauge) | Nitro ベース インスタンスで、インスタンスにアタッチされたすべての EBS ボリュームから読み取られた総バイト数<br>_単位は byte_ |
| **aws.ec2.ebsread_ops** <br>(count) | Nitro ベース インスタンスで、インスタンスにアタッチされたすべての Amazon EBS ボリュームに対して完了した読み取り操作の平均数<br>_単位は operation_ |
| **aws.ec2.ebsread_ops.sum** <br>(count) | Nitro ベース インスタンスで、インスタンスにアタッチされたすべての Amazon EBS ボリュームに対して完了した読み取り操作の総数<br>_単位は operation_ |
| **aws.ec2.ebswrite_bytes** <br>(gauge) | Nitro ベース インスタンスで、インスタンスにアタッチされたすべての EBS ボリュームに書き込まれた平均バイト数<br>_単位は byte_ |
| **aws.ec2.ebswrite_bytes.sum** <br>(gauge) | Nitro ベース インスタンスで、インスタンスにアタッチされたすべての EBS ボリュームに書き込まれた総バイト数<br>_単位は byte_ |
| **aws.ec2.ebswrite_ops** <br>(gauge) | Nitro ベース インスタンスで、インスタンスにアタッチされたすべての EBS ボリュームに対して完了した書き込み操作の平均数<br>_単位は operation_ |
| **aws.ec2.ebswrite_ops.sum** <br>(gauge) | Nitro ベース インスタンスで、インスタンスにアタッチされたすべての EBS ボリュームに対して完了した書き込み操作の総数<br>_単位は operation_ |
| **aws.ec2.network_address_usage** <br>(gauge) | VPC における NAU ユニットの最大数<br>_単位は unit_ |
| **aws.ec2.network_address_usage_peered** <br>(gauge) | VPC と、それにピア接続されたすべての VPC における NAU ユニットの最大数<br>_単位は unit_ |
| **aws.ec2.network_in** <br>(gauge) | インスタンスのすべてのネットワーク インターフェイスで受信した平均バイト数<br>_単位は byte_ |
| **aws.ec2.network_in.maximum** <br>(gauge) | インスタンスのすべてのネットワーク インターフェイスで受信した最大バイト数<br>_単位は byte_ |
| **aws.ec2.network_out** <br>(gauge) | インスタンスのすべてのネットワーク インターフェイスから送信した平均バイト数<br>_単位は byte_ |
| **aws.ec2.network_out.maximum** <br>(gauge) | インスタンスのすべてのネットワーク インターフェイスから送信した最大バイト数<br>_単位は byte_ |
| **aws.ec2.network_packets_in** <br>(gauge) | インスタンスのすべてのネットワーク インターフェイスで受信したパケット数<br>_単位は packet_ |
| **aws.ec2.network_packets_out** <br>(gauge) | インスタンスのすべてのネットワーク インターフェイスから送信したパケット数<br>_単位は packet_ |
| **aws.ec2.status_check_failed** <br>(gauge) | いずれかのステータス チェックに失敗した場合は 1|
| **aws.ec2.status_check_failed_instance** <br>(gauge) | インスタンスが EC2 インスタンス ステータス チェックに合格している場合は 0|
| **aws.ec2.status_check_failed_system** <br>(gauge) | インスタンスが EC2 システム ステータス チェックに合格している場合は 0|
| **aws.ec2.cpusurplus_credit_balance** <br>(gauge) | CPUCreditBalance の値が 0 のときに、unlimited インスタンスで消費された余剰クレジット数<br>_単位は unit_ |
| **aws.ec2.cpusurplus_credits_charged** <br>(gauge) | 獲得した CPU クレジットで相殺されず、その結果追加料金の対象となる消費済み余剰クレジット数<br>_単位は unit_ |
| **aws.ec2.host_ok** <br>(gauge) | インスタンスのシステム ステータスが ok の場合は 1|
| **aws.ec2.instance_age** <br>(gauge) | インスタンスの起動からの経過時間<br>_単位は second_ |

AWS から取得した各メトリクスには、AWS console に表示されるものと同じタグが付与されます。これには host name、security-groups などが含まれますが、これらに限りません。

**注**:

- `aws.ec2.instance_age` は、Datadog - EC2 インテグレーションでは既定では収集されません。このメトリクス収集を有効にするには、[Datadog サポート](https://docs.datadoghq.com/help/) にお問い合わせください。
- `aws.ec2.host_ok` は、Amazon EC2 インテグレーションのメトリクス収集を無効にしていても既定で収集されるため、意図しないホストが infrastructure list に表示されることがあります。必要なホストだけを監視するには、それらの EC2 インスタンスに `datadog:true` のような AWS タグを付与します。続いて、[Datadog AWS integration page](https://app.datadoghq.com/integrations/amazon-web-services) の **Metric Collection** タブにある **Limit metric collection to specific resources** テキスト ボックスに、そのタグを指定します。

### サービス チェック

**aws.ec2.host_status**

AWS console に表示される EC2 インスタンスのステータスを返します。インスタンスに問題がある場合は `CRITICAL`、AWS にステータス チェックを実行するための十分なデータがない場合は `UNKNOWN`、インスタンスが実行中または正常にシャットダウンされている場合は `OK` を返します。

_ステータス: ok, critical, unknown_

## すぐに使える監視

Amazon EC2 インテグレーションには、パフォーマンスの監視と最適化に役立つ、すぐに使える監視機能が用意されています。

- Amazon EC2 Overview Dashboard: すぐに利用できる [Amazon EC2 Overview dashboard](https://app.datadoghq.com/dash/integration/60/aws-ec2-overview) を使って、EC2 インスタンスの全体像を把握できます。
- Recommended Monitors: [Recommended Amazon EC2 monitors](https://app.datadoghq.com/monitors/recommended) を有効にすると、問題を先回りして検知し、適切なタイミングでアラートを受け取れます。

## トラブルシューティング

サポートが必要な場合は、[Datadog サポート](https://docs.datadoghq.com/help/) にお問い合わせください。

## 参考資料

- [EC2 監視で重要なメトリクス](https://www.datadoghq.com/blog/ec2-monitoring)
- [EC2 メトリクスを収集する方法](https://www.datadoghq.com/blog/collecting-ec2-metrics)
- [Datadog で EC2 インスタンスを監視する方法](https://www.datadoghq.com/blog/monitoring-ec2-instances-with-datadog)