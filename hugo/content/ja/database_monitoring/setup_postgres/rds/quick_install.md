---
further_reading:
- link: /database_monitoring/setup_postgres/
  tag: ドキュメント
  text: Postgres の設定
- link: /database_monitoring/setup_postgres/rds
  tag: ドキュメント
  text: Amazon RDS マネージド Postgres の Database Monitoring のセットアップ
- link: https://www.datadoghq.com/architecture/dbm-quick-install-aws-rds-postgres/
  tag: Architecture Center
  text: Datadog DBM Quick Install for AWS RDS
title: Database Monitoring Quick Install for Postgres RDS
---
Database Monitoring Quick Install for Postgres RDS を使用すると、RDS Postgres インスタンスを監視するための Agent を迅速にセットアップできます。いくつかのオプションを指定すると、Datadog により、監視用にインスタンスを構成する CloudFormation テンプレートを生成されます。また Amazon ECS を使用して、推奨される DBM 構成で RDS インスタンスに Agent がデプロイされます。

## 前提条件 {#prerequisites}

- インスタンスの VPC からの着信接続とインターネットへの発信接続を許可するように、インスタンスでセキュリティグループを構成する必要があります。
- RDS インスタンスの管理者アクセスのユーザー名とパスワードは、AWS Secrets Manager 内の AWS Secret に保存されている必要があります。Datadog はセットアップおよび運用中にこのシークレットを使用して資格情報にアクセスするため、シークレットの Amazon Resource Name (ARN) を必ず控えておいてください。

<div class="alert alert-info">Datadog は管理者資格情報を保存しません。これらは Agent への接続のために一時的に使用されるだけであり、プロセス完了後はデータは保持されません。</div>

## インストール {#installation}

1. [[Database Monitoring Setup] (Database Monitoring セットアップ)][1] ページに移動します。
1. [{{< ui >}}Unmonitored Hosts{{< /ui >}}] (監視対象外ホスト) タブで、Agent をインストールする RDS インスタンスの [{{< ui >}}Add Agent{{< /ui >}}] (エージェントを追加) をクリックします。
1. アカウントとリージョンの ECS クラスターがインストールされていない場合は、[{{< ui >}}Create Cluster{{< /ui >}}] (クラスターを追加) をクリックします。
1. [{{< ui >}}Security Group{{< /ui >}}] (セキュリティグループ) ドロップダウンリストからセキュリティグループを選択します。
1. [{{< ui >}}Select API Key{{< /ui >}}] (API キーを選択) をクリックしてリストから API キーを選択し、[{{< ui >}}Use API Key{{< /ui >}}] (API キーを使用する) をクリックします。
1. [{{< ui >}}Launch CloudFormation Stack in AWS Console{{< /ui >}}] (AWS コンソールで CloudFormation スタックを起動する) をクリックします。新しいページが開き、AWS CloudFormation 画面が表示されます。提供される CloudFormation テンプレートを使用してスタックを作成します。このテンプレートには、RDS インスタンスを監視するために Agent をデプロイする上で必要な構成が含まれています。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/databases/setup