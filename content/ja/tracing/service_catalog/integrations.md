---
further_reading:
- link: /tracing/service_catalog/service_definition_api/
  tag: ドキュメント
  text: サービス定義 API について
- link: /integrations/opsgenie/
  tag: ドキュメント
  text: OpsGenie インテグレーションについて
- link: /integrations/pagerduty/
  tag: ドキュメント
  text: PagerDuty インテグレーションについて
kind: documentation
title: サービスカタログとのインテグレーションを利用する
---

## 概要

[Datadog インテグレーション][10]のサービスアカウントを構成すると、インテグレーションからのメタデータを[サービスカタログ][9]のサービス定義に取り込むことができます。また、[統合開発環境 (IDE)](#ide-integrations) でサービス定義を編集する際に、オートコンプリートや検証機能を使用することができます。

## PagerDuty インテグレーション

PagerDuty メタデータをサービスに追加することで、サービスカタログに、誰がオンコールしているか、そのサービスに対してアクティブな PagerDuty インシデントがあるかなどの情報を表示したり、リンクしたりすることができます。

### セットアップ

[PagerDuty サービスディレクトリ][1]にあるどのサービスでも接続できます。サービスカタログの各サービスに対して、1 つの PagerDuty サービスをマッピングすることができます。

1. まだの場合は、[Datadog PagerDuty インテグレーション][2]をセットアップします。

2. PagerDuty の [API アクセスキー][3]ドキュメントに記載されているように、PagerDuty の API アクセスキーを取得します。

3. [インテグレーション構成の説明][4]に従って、構成を完了させます。

4. PagerDuty の情報を使ってサービス定義を更新します。例えば、完全な[サービス定義][5]の中で、以下の `integrations` 構成行を渡してください。

   ```
   ...
   integrations:
     pagerduty: https://www.pagerduty.com/service-directory/shopping-cart
   ...
   ```

## OpsGenie インテグレーション

OpsGenie メタデータをサービスに追加することで、サービスカタログに、そのサービスに対して誰がオンコールしているかなどの情報を表示したり、リンクしたりすることができます。

### セットアップ

1. まだの場合は、[Datadog OpsGenie インテグレーション][12]をセットアップします。
2. OpsGenie の [API キー管理][13]ドキュメントに記載されているように、OpsGenie の API アクセスキーを取得します。この API キーは、**構成アクセス**および**読み取り**アクセス権を必要とします。
3. [インテグレーションタイル][14]の **Accounts** セクションでアカウントを追加し、OpsGenie API アクセスキーを貼り付けて、OpsGenie アカウントのリージョンを選択します。

   {{< img src="tracing/service_catalog/create_account.png" alt="OpsGenie インテグレーションタイルの Create New Account ワークフロー" style="width:80%;" >}}

4. OpsGenie の情報を使ってサービス定義を更新し、OpsGenie サービスを Datadog サービスとリンクさせます。例えば、完全な[サービス定義][5]の中で、以下の `integrations` 構成行を渡してください。

   ```yaml
   "integrations": {
     "opsgenie": {
           "service-url": "https://www.opsgenie.com/service/123e4567-x12y-1234-a456-123456789000",
           "region": "US"
     }
   }
   ```

この手順が完了すると、サービスカタログのサービスの **Ownership** タブに、**On Call** 情報ボックスが表示されます。

{{< img src="tracing/service_catalog/oncall_information.png" alt="サービスカタログの OpsGenie からの情報を表示する On Call 情報ボックス" style="width:85%;" >}}
## IDE インテグレーション

Datadog では、サービス定義に [JSON スキーマ][6]を提供しており、[対応 IDE][7] でサービス定義を編集する際に、オートコンプリートや検証などの機能が提供されるようになっています。

[Datadog サービス定義用 JSON スキーマ][8]は、オープンソースの [Schema Store][7] に登録されています。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://support.pagerduty.com/docs/service-directory
[2]: /ja/integrations/pagerduty/
[3]: https://support.pagerduty.com/docs/api-access-keys
[4]: https://app.datadoghq.com/integrations/pagerduty
[5]: /ja/tracing/service_catalog/service_definition_api/
[6]: http://json-schema.org/
[7]: https://www.schemastore.org/json/
[8]: https://raw.githubusercontent.com/DataDog/schema/main/service-catalog/version.schema.json
[9]: /ja/tracing/service_catalog/
[10]: /ja/integrations/
[11]: https://app.datadoghq.com/services
[12]: /ja/integrations/opsgenie
[13]: https://support.atlassian.com/opsgenie/docs/api-key-management/
[14]: https://app.datadoghq.com/integrations/opsgenie