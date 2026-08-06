---
further_reading:
- link: /database_monitoring/setup_postgres/
  tag: ドキュメント
  text: Postgres の設定
- link: /database_monitoring/setup_postgres/rds
  tag: ドキュメント
  text: Amazon RDS マネージド Postgres のデータベースモニタリングの設定
title: Postgres RDS 向け Database Monitoring クイック インストール
---

Postgres RDS 向け Database Monitoring クイック インストールを使用すると、RDS Postgres インスタンスを監視するための Agent を迅速にセットアップできます。いくつかのオプションを指定すると、Datadog によりインスタンスを監視対象として構成する CloudFormation テンプレートが生成され、Amazon ECS を使用して、推奨される DBM 構成で Agent が RDS インスタンスにデプロイされます。

## 前提条件

- インスタンスの VPC からの着信接続とインターネットへの発信接続を許可するには、インスタンスにセキュリティ グループを設定する必要があります。
- RDS インスタンスの管理者アクセス用のユーザー名とパスワードは、AWS Secrets Manager 内の AWS Secret に保存する必要があります。このシークレットの Amazon Resource Name (ARN) は、必ずメモしておいてください。Datadog は、セットアップ時および運用時にこの ARN を使用して認証情報にアクセスします。

<div class="alert alert-info">Datadog は管理者の認証情報を保存しません。この情報は Agent の接続のために一時的に使用されるだけで、処理の完了後にデータが保持されることはありません。</div>

## インストール

1. [Database Monitoring Setup][1] ページに移動します。
1. **Unmonitored Hosts** タブで、Agent をインストールする RDS インスタンスの **Add Agent** をクリックします。
1. ご利用のアカウントおよびリージョンに ECS クラスターが作成されていない場合は、**Create Cluster** をクリックします。
1. **Security Group** ドロップダウン リストからセキュリティ グループを選択します。
1. **Select API Key** をクリックし、リストから API キーを選択して、**Use API Key** をクリックします。
1. **Launch CloudFormation Stack in AWS Console** (AWS コンソールで CloudFormation スタックを起動する) をクリックします。新しいページが開き、AWS CloudFormation の画面が表示されます。提供されている CloudFormation テンプレートを使用してスタックを作成します。テンプレートには、RDS インスタンスを監視するための Agent をデプロイするのに必要な構成が含まれています。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/databases/setup