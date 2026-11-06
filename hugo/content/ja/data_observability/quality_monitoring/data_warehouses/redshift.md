---
description: Amazon Redshift を Datadog Data Observability に接続して、データ品質の監視、使用状況の追跡、問題の検出を行います。
further_reading:
- link: /data_observability/
  tag: ドキュメント
  text: Data Observability の概要
- link: /monitors/types/data_observability/
  tag: ドキュメント
  text: Data Observability モニター
title: Redshift
---
## 概要 {#overview}

Redshift インテグレーションは Datadog を Amazon Redshift クラスターに接続し、メタデータ、クエリ履歴、テーブルレベルメトリクスを同期します。このインテグレーションを使用して、データの鮮度を監視し、異常を検出し、データウェアハウスおよびダウンストリームツール全体のリネージをトレースできます。

Datadog は、プロビジョニングされた Redshift クラスターと Redshift Serverless ワークグループの両方をサポートしています。

## 前提条件 {#prerequisites}

始める前に、以下があることを確認してください。

- [Datadog に接続された AWS アカウント][3]。
  - Data Observability にログ転送は必要ありません。
- Redshift スーパーユーザー、またはロールの作成と権限の付与ができるデータベースユーザー。
- Redshift クラスターまたはワークグループが IP によるネットワークアクセスを制限している場合は、Datadog Webhook IP を VPC セキュリティグループのインバウンドルールに追加します。IP のリストについては、`webhooks` のセクション ( {{< region-param key="ip_ranges_url" link="true" text="IP ranges list" >}}) を参照してください。

## Redshift でアカウントをセットアップする {#set-up-your-account-in-redshift}

スーパーユーザーとして Redshift クラスターに接続し、以下の SQL を実行して Datadog の専用ロールを作成します。

1. ロールを作成し、システムカタログビューへのアクセス権を付与します。

   ```sql
   -- Create a dedicated role for Datadog monitoring
   CREATE ROLE datadog_role;

   -- Required for table size metrics
   GRANT SELECT ON svv_table_info TO ROLE datadog_role;
   ```

2. データへの読み取り専用アクセス権を付与します。1 つのオプションを選択してください。

   {{< tabs >}}
   {{% tab "すべてのスキーマ (推奨)" %}}

   データベース内の現在および将来のすべてのスキーマ、テーブル、ビュー (dbt がプルリクエスト用に作成するスキーマを含む) に対する読み取りアクセス権を Datadog に付与します。このオプションは dbt CI/CD に必須です。

   ```sql
   GRANT USAGE FOR SCHEMAS IN DATABASE "<YOUR_DATABASE>" TO ROLE datadog_role;
   GRANT SELECT FOR TABLES IN DATABASE "<YOUR_DATABASE>" TO ROLE datadog_role;
   ```

   {{% /tab %}}
   {{% tab "特定のスキーマ" %}}

   Datadog で監視する各スキーマに対して、以下を実行します。これには、スキーマ内の現在および将来のテーブルとビューが含まれます (dbt など他のユーザーによって作成されたものを含む)。

   ```sql
   GRANT USAGE ON SCHEMA "<YOUR_SCHEMA>" TO ROLE datadog_role;
   GRANT SELECT FOR TABLES IN SCHEMA "<YOUR_SCHEMA>" TO ROLE datadog_role;
   ```

   後で作成されるスキーマ (dbt CI スキーマなど) は対象外です。dbt CI/CD の場合、**すべてのスキーマ**オプションを使用してください。

   {{% /tab %}}
   {{< /tabs >}}

3. Datadog データベースユーザーを作成するか、割り当てます。

   {{< tabs >}}
   {{% tab "プロビジョニング済みクラスター" %}}

   専用のデータベースユーザーを作成し、ロールを割り当てます。

   ```sql
   -- Replace <STRONG_PASSWORD> with a secure password
   CREATE USER datadog_user PASSWORD '<STRONG_PASSWORD>' SYSLOG ACCESS UNRESTRICTED;
   GRANT ROLE datadog_role TO datadog_user;
   ```

   {{% /tab %}}
   {{% tab "Serverless" %}}

   Redshift Serverless では、データベースユーザーは IAM アイデンティティから自動的にマッピングされます。たとえば、`DatadogIntegrationRole` という名前の IAM ロールは、データベースユーザー `IAMR:DatadogIntegrationRole` にマッピングされます。

   IAM マッピングのデータベースユーザーに `datadog_role` を付与します。

   ```sql
   GRANT ROLE datadog_role TO "IAMR:<YOUR_IAM_ROLE_NAME>";
   ALTER USER "IAMR:<YOUR_IAM_ROLE_NAME>" SYSLOG ACCESS UNRESTRICTED;
   ```

   {{% /tab %}}
   {{< /tabs >}}

## IAM ポリシーを構成する {#configure-iam-policies}

Redshift クラスターを含む AWS アカウントに関連付けられた Datadog AWS インテグレーション IAM ロールに以下のポリシーを追加します。

{{< tabs >}}
{{% tab "プロビジョニング済みクラスター" %}}

前のセクションで作成した Datadog データベースユーザーに対して、`AmazonRedshiftDataFullAccess` AWS 管理ポリシーおよび `redshift:GetClusterCredentials` を付与するインラインポリシーをアタッチします。

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "redshift:GetClusterCredentials",
            "Resource": [
                "arn:aws:redshift:<REGION>:<ACCOUNT_ID>:dbuser:<CLUSTER_IDENTIFIER>/datadog_user"
            ]
        }
    ]
}
```

{{% /tab %}}
{{% tab "Serverless" %}}

ワークグループに対して、`AmazonRedshiftDataFullAccess` AWS 管理ポリシーおよび `redshift-serverless:GetCredentials` を付与するインラインポリシーをアタッチします。

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "redshift-serverless:GetCredentials",
            "Resource": "arn:aws:redshift-serverless:<REGION>:<ACCOUNT_ID>:workgroup/<WORKGROUP_ID>"
        }
    ]
}
```

{{% /tab %}}
{{< /tabs >}}

## Datadog で Redshift インテグレーションを構成する {#configure-the-redshift-integration-in-datadog}

Datadog で Redshift インテグレーションを構成するには、以下の手順を実行します。

1. [{{< ui >}}Datadog Data Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][1] に移動します。
2. Redshift オプションの {{< ui >}}Configure{{< /ui >}} ボタンをクリックします。

   {{< img src="data_observability/redshift/data_obs_redshift_on_integrations_page.png" alt="Data Observability インテグレーションの [設定] ページにある Redshift" style="width:100%;" >}}

3. 接続済み AWS アカウントを選択するか、新しい AWS アカウントを追加します。

   {{< img src="data_observability/redshift/data_obs_redshift_integration_flow.png" alt="Redshift Data Observability インテグレーション用に接続済みまたは新しい AWS アカウントを選択します。" style="width:100%;" >}}

4. クラスターコネクションの詳細を入力します。

   {{< tabs >}}
   {{% tab "プロビジョニング済みクラスター" %}}

   - {{< ui >}}Cluster identifier{{< /ui >}}: Redshift クラスター識別子。
   - {{< ui >}}Region{{< /ui >}}: クラスターがホストされている AWS リージョン (例: `us-east-1`)。
   - {{< ui >}}Database user{{< /ui >}}: セットアップ中に作成された Datadog ユーザー (例: `datadog_user`)。
   - {{< ui >}}Initial database{{< /ui >}}: 接続先のデータベース名 (デフォルトは `dev`)。

   {{% /tab %}}
   {{% tab "Serverless" %}}

   - {{< ui >}}Workgroup name{{< /ui >}}: Redshift Serverless ワークグループ名。
   - {{< ui >}}Region{{< /ui >}}: ワークグループがホストされている AWS リージョン (例: `us-east-1`)。
   - {{< ui >}}Initial database{{< /ui >}}: 接続先のデータベース名 (デフォルトは `dev`)。

   {{% /tab %}}
   {{< /tabs >}}

   {{< img src="data_observability/redshift/data_obs_redshift_add_credentials.png" alt="Data Observability Integrations の Redshift 認証情報入力フィールド" style="width:100%;" >}}

5. [{{< ui >}}Add account{{< /ui >}}] をクリックします。

## 次のステップ {#next-steps}

保存後、Datadog はバックグラウンドで情報スキーマとクエリ履歴の同期を開始します。初期同期には、Redshift デプロイメントのサイズに応じて数時間かかる場合があります。

初期同期が完了したら、[Data Observability モニター][2]を作成して、鮮度、列レベルのメトリクス、およびカスタム SQL メトリクスに関するアラート通知を開始します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/data-obs/settings/integrations
[2]: /ja/monitors/types/data_observability/
[3]: /ja/integrations/amazon-web-services/