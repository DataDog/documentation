---
"app_id": "ngrok"
"app_uuid": "3b096ceb-d7a5-4bb5-bf0a-3a07d308d56a"
"assets":
  "dashboards":
    "ngrok_http_events": assets/dashboards/ngrok_http_events.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10397"
    "source_type_name": ngrok
"author":
  "homepage": "https://ngrok.com"
  "name": ngrok
  "sales_email": sales@ngrok.com
  "support_email": support@ngrok.com
"categories":
- developer tools
- cloud
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/ngrok/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "ngrok"
"integration_id": "ngrok"
"integration_title": "ngrok"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "ngrok"
"public_title": "ngrok"
"short_description": "Visualize valuable application insights with ngrok HTTP events"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Developer Tools"
  - "Category::Cloud"
  - "Submitted Data Type::Logs"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Queried Data Type::Logs"
  "configuration": "README.md#Setup"
  "description": Visualize valuable application insights with ngrok HTTP events
  "media":
  - "caption": ngrok HTTP request events overview dashboard
    "image_url": images/dashboard.png
    "media_type": image
  - "caption": ngrok services platform
    "image_url": images/diag1.png
    "media_type": image
  - "caption": ngrok + datadog
    "image_url": images/diag2.png
    "media_type": image
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": その他
    "url": "https://ngrok.com/solutions"
  "support": "README.md#Support"
  "title": ngrok
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## 概要

ngrok は、認証、ロードバランシング、およびその他の重要な制御を備えたグローバルなプレゼンスポイントを使用して、あらゆるクラウド、プライベートネットワーク、またはデバイスにあるアプリケーションに即座にイングレスを提供します。

ngrok プラットフォームには、Datadog イベント宛先インテグレーションが含まれています。ngrok HTTP イベントを使用すると、HTTP ステータスコードの内訳、トップクライアント IP、最もリクエストの多いリソースなど、Datadog ログ管理を使用して貴重なアプリケーションインサイトを視覚化できます。Datadog HTTPS ロギングエンドポイントを使用して、[ngrok ダッシュボード UI][1] でインテグレーションを設定できます。



## セットアップ

ngrok イベントを Datadog に転送するには、2 つの構成が必要です。

- ngrok Event Subscription: 転送されるイベントを含みます
- ngrok Event Destination: Event Subscriptionで定義されたイベントの転送先の構成。

以下の例では、HTTP リクエストイベント用の Datadog Event Destination で Event Subscription を構成する方法を示します。ステップバイステップの手順については、[ngrok Datadog Event Destination ドキュメント][2]を参照してください。

**ステップ 1: ngrok Event Subscription を作成する**

1. ngrok Dashboard Console で、Events ページに移動します。
2. "New Subscription" を選択します。
3. Description for Subscription を入力し、"Add Source" を選択します。
4. リストから "http_request_complete.v0" を選択し、Add Event Source を選択します。



**ステップ 2: Event Destination プロパティを構成する**

手順は、以前に作成した Event Subscription 構成内で実行されます。

1. "Event Destination" タブに移動し、"Add Destination" を選択します。
2. ドロップダウンメニューから Datadog を選択し、正しい情報を入力します。
    a. データに適した [Datadog サイト][3]を選択します。\
    b. Datadog に移動し、組織設定内で [API キーの作成][4]を行います。 \
    c. API キーをコピーし、API Key フィールドに貼り付けます。\
    d. オプションで、Service Name を定義します。これはイベントデータのキーとして **service:value** として追加されます。\
    e. オプションで、DD タグを定義します。DD タグはイベントデータに Datadog タグとして追加される `key:value` のペアです。\
    f. オプションで、説明を定義します。これはローカルで重要であり、Datadog Event Destination を識別するのに役立ちます。
3. "Send Test Event" を選択します。
4. 成功のメッセージが表示されたら、 "Done" を選択します。 エラーが表示された場合は、Datadog サイトと API キーが正しいことを確認します。


**ステップ 3: Datadog ログファセットを作成する**
ログが届き始めたら、データ分析とダッシュボード視覚化のために[ログファセット][5]を作成します。ログファセットの作成の詳細については、[ログファセットのドキュメント][6]を参照してください。

以下のフィールドに対してファセットを作成します。

- event_type
- object.conn.server_name
- object.conn.client_ip
- object.http.response.status_code
- object.http.request.method
- object.http.request.url.path

## トラブルシューティング

ご不明な点は、[ngrok サポート][7] に連絡するか、[ngrok ドキュメント][8]を参照してください。

## その他の参考資料

[ngrok][9] の詳細をご覧ください。

[1]: https://dashboard.ngrok.com
[2]: https://ngrok.com/docs/integrations/datadog/event-destination/
[3]: https://docs.datadoghq.com/getting_started/site/
[4]: https://docs.datadoghq.com/account_management/api-app-keys/
[5]: https://docs.datadoghq.com/logs/explorer/facets/
[6]: https://docs.datadoghq.com/logs/explorer/facets/#create-facets
[7]: mailto:support@ngrok.com
[8]: https://ngrok.com/docs/integrations/datadog/
[9]: https://ngrok.com/solutions

