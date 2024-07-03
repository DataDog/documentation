---
aliases:
- /ja/real_user_monitoring/security/
further_reading:
- link: /data_security/
  tag: Documentation
  text: Review the main categories of data submitted to Datadog
- link: /data_security/synthetics/
  tag: Documentation
  text: Synthetic Monitoring Data Security
- link: /real_user_monitoring/session_replay/browser/privacy_options/
  tag: Documentation
  text: Session Replay Privacy Options
- link: https://www.datadoghq.com/blog/default-privacy-session-replay/
  tag: Blog
  text: Obfuscate user data with Session Replay default privacy settings
title: Real User Monitoring Data Security
---

<div class="alert alert-info">このページでは、Datadog に送信されるデータのセキュリティについて説明します。クラウドやアプリケーションのセキュリティ製品や機能をお探しの場合は、<a href="/security/" target="_blank">セキュリティ</a>のセクションをご覧ください。</div>

## 概要
リアルユーザーモニタリング (RUM) は、プライバシー要件を実装し、あらゆる規模の組織が機密情報や個人情報を公開しないようにするためのコントロールを提供します。データは Datadog が管理するクラウドインスタンスに保存され、静止時は暗号化されます。このページで説明されているデフォルトの動作と構成可能なオプションは、エンドユーザーのプライバシーを保護し、組織の機密情報が収集されないように設計されています。[Datadog のプライバシー][13]の詳細についてはこちらをご覧ください。

## 責任の共有

The responsibility of keeping user data secure is shared between Datadog and developers who leverage the RUM SDKs.

Datadog の責任は以下の通りです。

- Datadog プラットフォームにデータが転送され、保存される際、それを安全に取り扱う信頼性の高い製品を提供します。
- 社内ポリシーに基づき、セキュリティ上の問題を確実に特定します。

開発者の責任は以下の通りです。
- Datadog が提供する構成値とデータプライバシーオプションを活用します。
- 自社の環境内のコードの整合性を確実に保ちます。

## コンプライアンスフレームワーク
RUM は、多くの規格や規制の枠組みに準拠するように構成することができます。以下が含まれますが、これらに限定されるものではありません。

- GDPR
- HIPAA 
- ISO
- CCPA/CPRA

## プライバシーに関する制限
デフォルトでは、規制や規格の枠組みへの準拠を支援するために、ユーザーデータを保護するいくつかのプライバシー制限が設けられています。

### ブラウザ RUM のクッキーの使用について
Browser RUM requires first party cookies to be enabled on an end user's browser to collect data. If required by the jurisdictions in which you operate, you are responsible for configuring your pages to comply with the laws of those jurisdictions, including receiving consent to collect cookies before RUM is initialized.

### モバイル RUM の同意管理
モバイル RUM の追跡は、ユーザーの同意がある場合のみ実行されます。エンドユーザーが RUM の追跡を承諾した場合、当社はそのユーザーのアクティビティとセッションの経験を追跡します。ユーザーが RUM の追跡を拒否した場合、当社はそのユーザーのアクティビティとセッションの経験を追跡しません。

## プライバシーのオプション
RUM でキャプチャしたデータの収集と編集に関しては、いくつかのオプションとツールがあります。

### Client token
The browser RUM [client token][17] is used to match data from the end user's browser to a specific RUM application in Datadog. It is unencrypted and visible from the client side of an application.

Because the client token is only used to send data to Datadog, there is no risk of data loss due to this token; however, Datadog recommends good client token management to avoid other kinds of misuse, including:

- Regularly [rotating the client token][18] to ensure that it is only used by your application
- Automatically [filtering out bots][19] when capturing RUM data

#### Authenticated proxy
One method of using the client token to filter out bots is an authenticated proxy. In this method, a placeholder string is substituted for the `clientToken` when initializing the Datadog RUM Browser SDK. The proxy knows the real client token, but the end user does not. 

The proxy is configured to check for valid user information before passing the session data to Datadog, thereby confirming that a real user is signed in and transmitting traffic to be monitored. When receiving traffic, the proxy verifies that the data includes the placeholder string and replaces it with the real `clientToken` before forwarding the data to Datadog.

### イベント追跡
[イベント][14]とは、サイトやアプリの特定の要素に対するユーザーのインタラクションのことです。イベントは、SDK を介して自動的にキャプチャされるか、カスタムアクションを介して送信されます。ユーザーインタラクションやページビューの自動追跡をオフにして、希望するインタラクションのみをキャプチャすることができます。デフォルトでは、RUM は SDK によって自動的に収集されたアクションからアクション名を生成するためにターゲットコンテンツを使用します。この動作は、任意の名前で[明示的にオーバーライド][5]することができます。

当社が自動的に追跡するデータには、主に技術的な情報が含まれており、その多くには個人を特定する情報は含まれていません。RUM によってキャプチャされたデータは、以下の方法の高度な構成オプションによって、Datadog に送信・保存される前にさらに編集を行うことができます。

- [beforeSend API][1]
- [iOS][2]
- [Android][3]
- [Flutter][4]
- [React Native][16]

### プロキシサーバーを経由して RUM イベントを送信する
すべての RUM イベントを独自の[プロキシサーバー][15]を介して送信することで、エンドユーザーのデバイスが Datadog と直接通信することがないようにすることができます。

### ユーザーの身元の追跡
デフォルトでは、**ユーザーの身元を追跡することはありません**。各セッションには一意の `session.id` が紐付けられ、データは匿名化されますが、傾向を把握することは可能です。名前やメールアドレスなどの[ユーザーデータ][6]をキャプチャするコードを書き、そのデータを使って RUM セッションを[充実させたり変更したり][7]するオプションもありますが、これは必須ではありません。

### データ保持
イベントキャプチャを構成した後、イベントは Datadog に保存されます。キャプチャしたイベントやプロパティが Datadog に保存される期間を決めることができます。

デフォルトでは、本番環境でのデータ保持は、

- セッション、ビュー、アクション、エラー、セッションの記録の場合は 30 日間です。
- リソースやロングタスクの場合は 15 日間です。

Retention can be extended to a maximum of 90 days at no additional cost by [opening a support ticket][8]. Note that this retention extension does not apply to Session Replays, Resources, or Long Tasks.

#### ロールベースのアクセス制御
Datadog は、キャプチャした RUM データの閲覧者を管理するために、ロールベースのアクセス制御 (RBAC) を提供します。データアクセスのデフォルト設定は、ユーザーが追加されたロールに依存します。Datadog のロールには、3 つのタイプがあります。Administrator ロール、Standard ロール、Read Only ロールです。より詳細な RUM 固有の権限は、[Datadog ロールの権限][10]で定義されています。例えば、セッションリプレイを閲覧するためのアクセス権を付与したり、取り消したりすることができます。

### データの削除
If you need to delete data stored by Datadog, for example, if potentially sensitive data has been leaked into RUM events, you can hard-delete data from within a given timeframe. With a hard delete, **all** data is deleted; it cannot be targeted to a specific application. If you need any data deleted, reach out to the [Datadog support team][9].

### 個人情報・機密情報の削除
個人を特定できる情報 (PII) や、IP アドレスやジオロケーションなどの機密データを削除するためのオプションがいくつか用意されています。RUM に PII が表示される可能性のあるシナリオをいくつか紹介します。

- ボタンのアクション名 (例: "View full credit card number")
- URL に表示される名前
- アプリの開発者によってインスツルメンテーションされたカスタム追跡イベント

#### 非構造化データ
PII inadvertently included in unstructured data, such as an individual's name in a text box, can only be removed through a data deletion requisition for a specified timeframe.

With respect to URLs, you have the option to track page views manually in order to remove any PII or use beforeSend to change the URL text.

また、すべての RUM イベントを独自の (プロキシ) サーバーを介して送信することで、エンドユーザーのデバイスが Datadog と直接通信することがないようにすることができます。

#### IP アドレス
RUM アプリケーションのセットアップ時に、IP またはジオロケーションデータを含めるかどうかを選択することができます。

{{< img src="data_security/data-security-rum-privacy-compliance-edit-rum-application.png" alt="RUM アプリケーションのセットアップページで、ジオロケーションとクライアント IP データを含めるかどうかを選択できます" style="width:100%;" >}}

IP データの収集を無効にすると、その変更はすぐに適用されます。無効にする前に収集されたイベントは、IP データが削除されることはありません。これはバックエンドで実行されるため、Browser SDK は引き続きデータを送信しますが、IP アドレスは Datadog バックエンドパイプラインによって省略され、処理時にドロップされます。

#### 位置情報
クライアント IP の削除に加えて、今後収集するすべてのデータから、ジオロケーション (国、都市、郡)、または GeoIP の収集を無効にすることも選択可能です。**Collect geolocation data** ボックスのチェックを外すと、その変更はすぐに適用されます。無効にする前に収集されたイベントは、ジオロケーションデータが削除されることはありません。データの省略はバックエンドレベルで行われます。つまり、Browser SDK は引き続きデータを送信しますが、ジオロケーションデータはバックエンドパイプラインによって省略され、処理時にドロップされます。

### 機密データスキャナーで機密データをプロアクティブに検索する
[Sensitive Data Scanner][11] allows you to proactively search and scrub sensitive data upon ingestion by Datadog. RUM events are scanned on the stream before any data is stored within Datadog. The tool has the power to scrub, hash, or partially redact PII data before it is stored. It works by applying out-of-the-box or customer-developed pattern matching rules. If you've enabled this feature, you can find it on the [**Manage Sensitive Data** page][20].

## セッションリプレイ固有のプライバシーオプション
[セッションリプレイに固有のプライバシーオプション][12]を参照してください。

### その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/guide/enrich-and-control-rum-data/?tab=event#event-and-context-structure
[2]: /ja/real_user_monitoring/ios/advanced_configuration/?tab=swift#modify-or-drop-rum-events
[3]: /ja/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/?tab=kotlin#modify-or-drop-rum-events
[4]: /ja/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/flutter/#modify-or-drop-rum-events
[5]: /ja/real_user_monitoring/browser/tracking_user_actions/#declare-a-name-for-click-actions
[6]: /ja/real_user_monitoring/browser/advanced_configuration/?tab=npm#user-session
[7]: /ja/real_user_monitoring/browser/advanced_configuration/?tab=npm#user-session
[8]: /ja/help/
[9]: /ja/help/
[10]: /ja/account_management/rbac/permissions/#real-user-monitoring
[11]: /ja/sensitive_data_scanner/
[12]: /ja/real_user_monitoring/session_replay/browser/privacy_options
[13]: https://www.datadoghq.com/privacy/
[14]: /ja/real_user_monitoring/explorer/search/
[15]: /ja/real_user_monitoring/guide/proxy-rum-data/?tab=npm
[16]: /ja/real_user_monitoring/reactnative/advanced_configuration/#modify-or-drop-rum-events
[17]: /ja/real_user_monitoring/browser/setup/#configuration
[18]: /ja/account_management/api-app-keys/#add-an-api-key-or-client-token
[19]: /ja/real_user_monitoring/guide/identify-bots-in-the-ui/#filter-out-bot-sessions-on-intake
[20]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration