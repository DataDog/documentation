---
aliases:
- /ja/tracing/software_catalog/integrations
- /ja/tracing/service_catalog/integrations
- /ja/service_catalog/integrations
further_reading:
- link: /tracing/software_catalog/service_definition_api/
  tag: ドキュメント
  text: サービス定義 API について
- link: /integrations/opsgenie/
  tag: ドキュメント
  text: OpsGenie インテグレーションについて
- link: /integrations/pagerduty/
  tag: ドキュメント
  text: PagerDuty インテグレーションについて
title: Software Catalog でインテグレーションを活用する
---
{{% site-region region="gov" %}}
<div class="alert alert-warning">
Software Catalog 向けの PagerDuty および OpsGenie インテグレーションは、{{< region-param key=dd_datacenter code="true" >}} サイトではサポートされていません。
</div>
{{% /site-region %}}

## 概要

[Datadog インテグレーション][10] のサービス アカウントを設定すると、インテグレーションから得られるメタデータを [Software Catalog][9] のサービス定義に取り込めます。また、[統合開発環境 (IDE)](#ide-integrations) でサービス定義を編集する際に、入力補完や検証機能も利用できます。

## PagerDuty インテグレーション

PagerDuty のメタデータをサービスに追加すると、Software Catalog にオン コール担当者や、そのサービスで進行中の PagerDuty インシデントがあるかどうかなどの情報が表示され、関連先へリンクされます。表示できるオン コールは 1 名のみのため、Datadog はエスカレーション レベル順で最初のユーザーを選び、その後はメール アドレスのアルファベット順で決定します。

### セットアップ

[PagerDuty Service Directory][1] にある任意のサービスを接続できます。Software Catalog 内の各サービスに対して、PagerDuty 側のサービスを 1 つだけマッピングできます。

1. まだの場合は、[Datadog PagerDuty インテグレーション][2]をセットアップします。

2. PagerDuty の [API アクセスキー][3]ドキュメントに記載されているように、PagerDuty の API アクセスキーを取得します。

3. [Pagerduty Integration Setup][4] で API Access Key を入力して構成完了です。

  {{< img src="tracing/software_catalog/pagerduty-token.png" alt="API キーを Pagerduty Setup にコピーして貼り付けます。" style="width:100%;" >}}

4. PagerDuty の情報を使ってサービス定義を更新します。例えば、完全な[サービス定義][5]の中で、以下の `integrations` 構成行を渡してください。

   ```
   ...
   integrations:
     pagerduty: https://www.pagerduty.com/service-directory/shopping-cart
   ...
   ```

## OpsGenie インテグレーション

OpsGenie のメタデータをサービスに追加すると、Software Catalog にそのサービスのオン コール担当者などの情報が表示され、関連先へリンクされます。

### セットアップ

1. まだの場合は、[Datadog OpsGenie インテグレーション][12]をセットアップします。
2. OpsGenie の [API キー管理][13]ドキュメントに記載されているように、OpsGenie の API アクセスキーを取得します。この API キーは、**構成アクセス**および**読み取り**アクセス権を必要とします。
3. [インテグレーションタイル][14]の下部にある **Accounts** セクションでアカウントを追加し、OpsGenie API アクセスキーを貼り付けて、OpsGenie アカウントのリージョンを選択します。

   {{< img src="tracing/software_catalog/create_account1.png" alt="OpsGenie インテグレーション タイルの Create New Account ワークフロー" style="width:80%;" >}}
   {{< img src="tracing/software_catalog/create_account2.png" alt="OpsGenie インテグレーション タイルの Create New Account ワークフロー" style="width:80%;" >}}

4. OpsGenie の情報を使ってサービス定義を更新し、OpsGenie サービスを Datadog サービスとリンクさせます。例えば、完全な[サービス定義][5]の中で、以下の `integrations` 構成行を渡してください。

   ```yaml
   "integrations": {
     "opsgenie": {
           "service-url": "https://www.opsgenie.com/service/123e4567-x12y-1234-a456-123456789000",
           "region": "US"
     }
   }
   ```

以上の手順が完了すると、Software Catalog のサービスの **Ownership** タブに **On Call** 情報ボックスが表示されます。

{{< img src="tracing/software_catalog/oncall_information.png" alt="Software Catalog で OpsGenie の情報を表示する On Call 情報ボックス" style="width:85%;" >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://support.pagerduty.com/docs/service-directory
[2]: /ja/integrations/pagerduty/
[3]: https://support.pagerduty.com/docs/api-access-keys
[4]: https://app.datadoghq.com/integrations/pagerduty
[5]: /ja/tracing/software_catalog/service_definition_api/
[6]: http://json-schema.org/
[7]: https://www.schemastore.org/json/
[8]: https://raw.githubusercontent.com/DataDog/schema/main/service-catalog/version.schema.json
[9]: /ja/tracing/software_catalog/
[10]: /ja/integrations/
[11]: https://app.datadoghq.com/services
[12]: /ja/integrations/opsgenie
[13]: https://support.atlassian.com/opsgenie/docs/api-key-management/
[14]: https://app.datadoghq.com/integrations/opsgenie