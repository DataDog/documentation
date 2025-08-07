---
aliases:
- /ja/real_user_monitoring/security/
further_reading:
- link: /data_security/
  tag: Documentation
  text: Datadog に送信されるデータの主要カテゴリを確認する
- link: /data_security/synthetics/
  tag: Documentation
  text: Synthetic モニタリングのデータセキュリティ
- link: /real_user_monitoring/session_replay/browser/privacy_options/
  tag: Documentation
  text: セッションリプレイのプライバシーオプション
- link: https://www.datadoghq.com/blog/default-privacy-session-replay/
  tag: ブログ
  text: セッションリプレイのデフォルトプライバシー設定によるユーザーデータの難読化
title: リアルユーザーモニタリングのデータセキュリティ
---

<div class="alert alert-info">このページでは、Datadog に送信されるデータのセキュリティについて説明します。クラウドやアプリケーションのセキュリティ製品や機能をお探しの場合は、<a href="/security/" target="_blank">セキュリティ</a>のセクションをご覧ください。</div>

## 概要
Real User Monitoring (RUM) は、プライバシー要件の実装を支援し、企業規模に関わらず機密情報や個人情報が露出しないようにするための制御機能を提供します。データは Datadog が管理するクラウドインスタンスに保存され、保存時には暗号化されます。ここで説明するデフォルト動作と設定可能なオプションは、エンドユーザーのプライバシーを保護し、機密性の高い企業情報が収集されるのを防ぐよう設計されています。詳しくは [Datadog のプライバシーについて][1]をご覧ください。

## 責任の共有

ユーザーデータのセキュリティを維持する責任は、Datadog と RUM SDK を活用する開発者の双方が負います。

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
ブラウザ RUM でデータを収集するには、エンドユーザーのブラウザでファーストパーティ Cookie を有効にしておく必要があります。利用地域の法律で Cookie 利用に同意が必要な場合、RUM を初期化する前に Cookie の収集に対する同意を得られるようページを設定する責任は、運用者側にあります。

### モバイル RUM の同意管理
モバイル RUM のトラッキングは、ユーザーが同意した場合にのみ実行されます。エンドユーザーが RUM トラッキングを受け入れた場合、Datadog はそのアクティビティとセッションの状況を追跡します。ユーザーが拒否した場合、Datadog はアクティビティやセッションを追跡しません。

## プライバシーのオプション
RUM でキャプチャしたデータの収集と編集に関しては、いくつかのオプションとツールがあります。

### クライアントトークン
ブラウザ RUM の[クライアントトークン][2]は、エンドユーザーのブラウザから送信されるデータを Datadog 内の特定の RUM アプリケーションに紐づけるために使用されます。これは暗号化されておらず、アプリケーションのクライアント側から確認できる状態です。

クライアントトークンは Datadog にデータを送信するためだけに使用されるため、このトークンが原因でデータが失われるリスクはありません。ただし、他の形での不正利用を避けるために、Datadog では以下のようなクライアントトークン管理を推奨しています。

- 定期的に[クライアントトークンをローテーション][3]して、アプリケーションでのみ使用されることを確実にする
- RUM データを収集する際に自動で[ボットをフィルタリング][4]する

#### 認証プロキシ
クライアントトークンを使ってボットを排除する方法の一つとして、認証プロキシがあります。この方法では、Datadog RUM ブラウザ SDK を初期化する際に `clientToken` の部分をプレースホルダー文字列に置き換えます。プロキシは実際のクライアントトークンを知っていますが、エンドユーザーは知りません。

このプロキシは、セッションデータを Datadog に渡す前に有効なユーザー情報をチェックするよう設定されており、その結果、実際のユーザーがサインインしていて監視対象となるトラフィックを送っていることを確認します。トラフィックを受け取ると、プロキシはプレースホルダー文字列を含むデータをチェックし、実際の `clientToken` に置き換えたうえで Datadog に転送します。

### イベント追跡
[イベント][5]とは、サイトやアプリの特定要素に対するユーザーの操作を指します。イベントは SDK によって自動的に取得されるか、またはカスタムアクションを通じて送信できます。自動で行われるユーザー操作やページビューのトラッキングをオフにして、必要な操作だけを取得するように設定することも可能です。デフォルトでは、SDK が自動的に収集したアクションのターゲットコンテンツを基に、RUM がアクション名を生成します。[任意の名前を付けて明示的に上書き][6]することもできます。

当社が自動的に追跡するデータには、主に技術的な情報が含まれており、その多くには個人を特定する情報は含まれていません。RUM によってキャプチャされたデータは、以下の方法の高度な構成オプションによって、Datadog に送信・保存される前にさらに編集を行うことができます。

- [beforeSend API][7]
- [iOS][8]
- [Android][9]
- [Flutter][10]
- [React Native][11]

### プロキシサーバーを経由して RUM イベントを送信する
エンドユーザーのデバイスが Datadog と直接通信しないようにするために、すべての RUM イベントを独自の[プロキシサーバー][12]を経由して送信できます。

### ユーザーの身元の追跡
デフォルトでは、**ユーザーの識別情報は追跡されません**。各セッションには一意の `session.id` が割り当てられ、データは匿名化されますが、傾向を把握することはできます。名前やメールアドレスなどの[ユーザーデータ][13]をキャプチャし、RUM セッションを[拡張・修正][13]するコードを追加することも可能ですが、必須ではありません。

### データ保持
イベントキャプチャを構成した後、イベントは Datadog に保存されます。キャプチャしたイベントやプロパティが Datadog に保存される期間を決めることができます。

デフォルトでは、本番環境でのデータ保持は、

- セッション、ビュー、アクション、エラー、セッションの記録の場合は 30 日間です。
- リソースやロングタスクの場合は 15 日間です。

より長期的な期間でユーザーの行動を分析する必要がある場合 (セッション、ビュー、アクションのみ)、[Product Analytics に参加][20]を依頼できます。

#### ロールベースのアクセス制御
Datadog では、キャプチャされた RUM データを誰が閲覧できるかを管理するためのロールベースアクセス制御 (RBAC) を提供しています。データアクセスのデフォルト設定は、ユーザーに付与されるロールに応じて異なります。Datadog には主に 3 種類のロール (Administrator、Standard、Read Only) があり、[Datadog ロールの権限][15]でより詳細な RUM 固有の権限設定が定義されています。たとえば、Session Replay の閲覧権限を付与したり取り消したりすることができます。

### データの削除
Datadog に保存されているデータを削除する必要がある場合 (例: RUM イベントに機密データが流出した疑いがある場合など) 、指定した期間のデータをハードデリートできます。ハードデリートでは、**すべて**のデータが削除され、特定のアプリケーションだけを対象にすることはできません。データの削除が必要な場合は、[Datadog サポート][14]までお問い合わせください。

### 個人情報・機密情報の削除
個人を特定できる情報 (PII) や、IP アドレスやジオロケーションなどの機密データを削除するためのオプションがいくつか用意されています。RUM に PII が表示される可能性のあるシナリオをいくつか紹介します。

- ボタンのアクション名 (例: "View full credit card number")
- URL に表示される名前
- アプリの開発者によってインスツルメンテーションされたカスタム追跡イベント

#### アクション名のマスク
デフォルトで、すべてのアクション名をマスクしたい場合は、`enablePrivacyForActionName` オプションと `mask` プライバシー設定を併用できます。この操作により、未上書きのアクション名はすべて `Masked Element` というプレースホルダーに置き換えられます。この設定は、既存の [HTML オーバーライド属性][16]とも互換性があるように設計されています。

#### 非構造化データ
テキストボックスに入力された個人名のように、意図せず非構造化データに PII が含まれてしまった場合は、指定した期間のデータ削除依頼を通じてしか除去できません。

URL に関しては、手動でページビューをトラッキングして PII を除去したり、beforeSend を利用して URL のテキストを変更したりする方法があります。

また、すべての RUM イベントを独自の (プロキシ) サーバーを介して送信することで、エンドユーザーのデバイスが Datadog と直接通信することがないようにすることができます。

#### IP アドレス
RUM アプリケーションを初期化した後に、**User Data Collection** タブから IP や位置情報を含めるかどうかを選択できます。

{{< img src="data_security/data-security-rum-privacy-compliance-user-data-collection-1.png" alt="RUM アプリケーション管理ページからジオロケーションとクライアント IP データを含めるか除外するかを選択できる" style="width:100%;" >}}

IP データの収集をオフにすると、その変更は即時に適用されます。オフにする前に収集されたイベントの IP データは削除されません。これはバックエンドで行われる処理であり、ブラウザ SDK は引き続きデータを送信しますが、Datadog のバックエンドパイプラインで IP アドレスが除外され、処理時に破棄されます。

#### 位置情報
クライアント IP の削除に加えて、将来収集されるデータからジオロケーション (国、市、郡) や GeoIP の収集を無効にすることもできます。**Collect geolocation data** のチェックを外すと、この変更は即時に適用されます。無効化する前に収集されたイベントの位置情報データは削除されません。こちらもバックエンド側での除外処理のため、ブラウザ SDK は依然としてデータを送信しますが、Datadog バックエンドパイプラインで位置情報が除外され、処理時に破棄されます。

### 機密データスキャナーで機密データをプロアクティブに検索する
[Sensitive Data Scanner][17] を使用すると、Datadog がデータを取り込む段階で機密データを事前に検出・スクラブできます。RUM イベントは Datadog に保存される前にストリーム上でスキャンされます。このツールは、PII データを保存前にスクラブ、ハッシュ、または部分的にマスクする機能を持ち、標準またはカスタマイズされたパターンマッチングルールを適用して動作します。この機能を有効にしている場合は、[**Manage Sensitive Data** ページ][18]から確認できます。

## セッションリプレイ固有のプライバシーオプション
[Session Replay 用のプライバシーオプション][19]を参照してください。

### その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/privacy/
[2]: /ja/real_user_monitoring/browser/setup/#configuration
[3]: /ja/account_management/api-app-keys/#add-an-api-key-or-client-token
[4]: /ja/real_user_monitoring/guide/identify-bots-in-the-ui/#filter-out-bot-sessions-on-intake
[5]: /ja/real_user_monitoring/explorer/search/
[6]: /ja/real_user_monitoring/browser/tracking_user_actions/#declare-a-name-for-click-actions
[7]: /ja/real_user_monitoring/guide/enrich-and-control-rum-data/?tab=event#event-and-context-structure
[8]: /ja/real_user_monitoring/ios/advanced_configuration/?tab=swift#modify-or-drop-rum-events
[9]: /ja/real_user_monitoring/mobile_and_tv_monitoring/android/advanced_configuration/?tab=kotlin#modify-or-drop-rum-events
[10]: /ja/real_user_monitoring/mobile_and_tv_monitoring/flutter/advanced_configuration/#modify-or-drop-rum-events
[11]: /ja/real_user_monitoring/reactnative/advanced_configuration/#modify-or-drop-rum-events
[12]: /ja/real_user_monitoring/guide/proxy-rum-data/?tab=npm
[13]: /ja/real_user_monitoring/browser/advanced_configuration/?tab=npm#user-session
[14]: /ja/help/
[15]: /ja/account_management/rbac/permissions/#real-user-monitoring
[16]: /ja/real_user_monitoring/session_replay/privacy_options#override-an-html-element
[17]: /ja/security/sensitive_data_scanner/
[18]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration
[19]: /ja/real_user_monitoring/session_replay/browser/privacy_options
[20]: https://www.datadoghq.com/private-beta/product-analytics/