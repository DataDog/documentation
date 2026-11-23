---
description: Datadog OCI インテグレーションのトラブルシューティングステップ
further_reading:
- link: https://docs.datadoghq.com/integrations/oracle-cloud-infrastructure/
  tag: 統合
  text: OCI インテグレーション
title: OCI インテグレーションのトラブルシューティング
---
## 概要 {#overview}

このガイドは、Datadog [OCI インテグレーション][1] に関連する問題のトラブルシューティングにご利用ください。

## インテグレーションの問題 {#integration-issues}

[OCI インテグレーションタイル][2] の [**Issues**] (問題) タブで、OCI インテグレーションの構成の問題を確認します。

## Datadog API キーまたはアプリケーションキーの認証情報が無効 {#invalid-datadog-api-or-app-key-credentials}

これは、OCI インテグレーションで構成された Datadog API キーまたはアプリケーションキーの有効期限が切れているか、無効である場合に発生します。両方のキーは、スタックの適用時に検証されます。確認するには、ORM スタックのジョブログで次のエラーを探してください。

```
Error: unexpected response code '403': {"errors":["Forbidden"]}

  with module.integration[0].restapi_object.datadog_tenancy_integration,
  on modules/integration/main.tf line 15, in resource "restapi_object" "datadog_tenancy_integration":
  15: resource "restapi_object" "datadog_tenancy_integration" {
```

これを修正するには、新しい認証情報を生成し、インテグレーションデプロイメントを更新します。

1. Datadog オーガニゼーション設定の [[API Keys] (API キー)][6] に移動し、新しい API キーを生成します。
2. Datadog オーガニゼーション設定の [[Application Keys] (アプリケーションキー)][8] に移動し、新しいアプリケーションキーを生成します。
3. 新しいキーでインテグレーションデプロイメントを更新し、再適用します。

{{< tabs >}}
{{% tab "QuickStart (ORM スタック)" %}}

1. [Oracle Resource Manager スタック](https://cloud.oracle.com/resourcemanager/stacks)に移動し、Datadog QuickStart スタックを見つけます。
2. このスタックの **[Edit]** (編集) をクリックします。
3. **[Next]** (次へ) をクリックして、[**Configure Variables**] (変数の構成) ページに移動します。
4. **Datadog API Key** と **Datadog Application Key** の値を新しい認証情報で更新してください。
5. [**Next**] (次へ) をクリックします。
6. [**Save changes**] (変更を保存) をクリックします。

{{% /tab %}}
{{% tab "Terraform" %}}

1. Terraform `.tf` ファイルの `datadog_api_key` 値と `datadog_app_key` 値を新しい認証情報で更新します。
2. `terraform apply` を実行して、更新された構成を適用します。

{{% /tab %}}
{{< /tabs >}}

## 必要な OCI IAM 権限が不足している {#required-oci-iam-permissions-are-missing}

Datadog が OCI をクエリする際に `403` エラーを受け取りました。これは、必要な IAM 権限の一部が付与されていないことを示しています。
OCI の [[Policies] (ポリシー) ページ][4] をチェックして、`dd-svc-policy` ポリシーと `dd-dynamic-group` ポリシーで、すべての**読み取り専用**権限が適切に構成されていることを確認してください。

## OCI テナンシーがサービスコネクタハブの制限に達している {#oci-tenancy-reaching-service-connector-hub-limit}

テナンシーごとに、5 つのコンパートメントにつき少なくとも 1 つのサービスコネクタハブが必要です。OCI アカウントで [サービス制限の引き上げをリクエスト][5] してください。

## 1 つ以上のサブスクライブ済みリージョンからデータを収集できない {#cannot-collect-data-from-one-or-more-subscribed-regions}

Datadog のメトリクスとログの転送に使用されるアプリケーション関数が見つかりませんでした。
これを修正するには、OCI テナンシー内の既存の Datadog インテグレーション ORM スタックを再適用します。

**注**: オプションの構成セクションでサブネット OCID を指定した場合は、サブスクライブ済みリージョンごとに 1 つのサブネット OCID があることを確認してください。既存のスタックを再適用する前に、他の変更は行わないでください。

## メトリクスが収集されない {#metrics-not-being-collected}

監視対象の各リージョンについて、以下の事項を確認してください。

1. インテグレーションコンパートメントで `dd-function-app` 関数アプリケーションが存在することを確認します。
2. `dd-function-app` で `dd-metrics-forwarder`関数が存在することを確認します。
3. カスタムサブネットを使用している場合は、それらが [権限][7] を満たしていることを確認します (ステップ 5 の後の注記で詳述)。
4. Datadog が作成した各メトリクスサービスコネクタハブについて、その関数ターゲットが `dd-function-app` 内の `dd-metrics-forwarder` 関数であることを確認します。Datadog が作成したメトリクスコネクタハブは、`dd-metrics-connectorhub-<suffix>` という形式を使用します。コネクタハブが別の転送関数アプリケーションをターゲットにしている場合は、それを削除し、自動的に再プロビジョニングされるようにしてください。

## OCI スタックの破棄に関する問題 {#oci-stack-destroy-issues}

破棄ジョブが失敗した場合、または実行できない場合は、次のようにします。

1. [OCI インテグレーションリポジトリ][11] を複製し、リポジトリディレクトリに移動します。
2. [OCI インテグレーションクリーンアップスクリプト][10] を使用して、残りのリソースを削除します。
3. 必要な変数を設定します。
4. ドライランを確認します。

    ```shell
    export OCI_PROFILE="<YOUR_OCI_PROFILE>"
    export COMPARTMENT_OCID="<YOUR_COMPARTMENT_OCID>"
    export TENANCY_OCID="<YOUR_TENANCY_OCID>"

    python3 oci-integration-cleanup/integration_cleanup.py \
      --profile "$OCI_PROFILE" \
      --compartment-ocid "$COMPARTMENT_OCID" \
      --dry-run true
    ```

5. ドライランの出力で、削除予定のリソースを確認します。出力が正しい場合は、クリーンアップを実行します。

    ```shell
    python3 oci-integration-cleanup/integration_cleanup.py \
      --profile "$OCI_PROFILE" \
      --compartment-ocid "$COMPARTMENT_OCID" \
      --confirm-tenancy-id "$TENANCY_OCID" \
      --region-workers <number of regions to be processed in parallel> \
      --dry-run false
    ```

## インテグレーションのバージョンが古い {#outdated-integration-version}

これは、Datadog インテグレーションの ORM スタックまたは Terraform モジュールが古い場合に発生します。この問題を修正するには、デプロイメントを最新バージョンに更新して再適用してください。QuickStart (ORM スタック) と Terraform の両方の手順については、[インテグレーションの更新][8] を参照してください。

サポートが必要な場合は、[Datadog サポート][3] にお問い合わせください。

[1]: /ja/integrations/oracle-cloud-infrastructure
[2]: https://app.datadoghq.com/integrations?integrationId=oracle-cloud-infrastructure
[3]: /ja/help/
[4]: https://cloud.oracle.com/identity/domains/policies
[5]: https://docs.oracle.com/en/cloud/get-started/subscriptions-cloud/mmocs/requesting-service-limit-change.html
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: https://docs.datadoghq.com/ja/integrations/oracle-cloud-infrastructure/#deploy-the-quickstart-orm-stack
[8]: /ja/integrations/oracle-cloud-infrastructure/#update-the-integration
[9]: https://app.datadoghq.com/organization-settings/application-keys
[10]: https://github.com/DataDog/oracle-cloud-integration/tree/master/oci-integration-cleanup#readme
[11]: https://github.com/DataDog/oracle-cloud-integration