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
- link: /real_user_monitoring/session_replay/privacy_options/
  tag: Documentation
  text: セッションリプレイのプライバシーオプション
- link: https://www.datadoghq.com/blog/default-privacy-session-replay/
  tag: ブログ
  text: セッションリプレイのデフォルトプライバシー設定によるユーザーデータの難読化
kind: documentation
title: リアルユーザーモニタリングのデータセキュリティ
---

<div class="alert alert-info">このページでは、Datadog に送信されるデータのセキュリティについて説明します。クラウドやアプリケーションのセキュリティ製品や機能をお探しの場合は、<a href="/security/" target="_blank">セキュリティ</a>のセクションをご覧ください。</div>

## 概要
リアルユーザーモニタリング (RUM) は、プライバシー要件を実装し、あらゆる規模の組織が機密情報や個人情報を公開しないようにするためのコントロールを提供します。データは Datadog が管理するクラウドインスタンスに保存され、静止時は暗号化されます。このページで説明されているデフォルトの動作と構成可能なオプションは、エンドユーザーのプライバシーを保護し、組織の機密情報が収集されないように設計されています。[Datadog のプライバシー][13]の詳細についてはこちらをご覧ください。
## コンプライアンスフレームワーク
RUM は、多くの規格や規制の枠組みに準拠するように構成することができます。以下が含まれますが、これらに限定されるものではありません。

- GDPR
- HIPAA 
- ISO
- CCPA/CPRA

## プライバシーに関する制限
デフォルトでは、規制や規格の枠組みへの準拠を支援するために、ユーザーデータを保護するいくつかのプライバシー制限が設けられています。

### ブラウザ RUM のクッキーの使用について
ブラウザ RUM は、データを収集するためにエンドユーザーのブラウザで**ファーストパーティクッキー**が有効になっていることを必要とします。運営する法域で要求される場合は、RUM が初期化されてデータ収集を開始する前に、エンドユーザーがクッキーを受け入れる必要があるように、ページを構成する必要があります。

### モバイル RUM の同意管理
モバイル RUM の追跡は、ユーザーの同意がある場合のみ実行されます。エンドユーザーが RUM の追跡を承諾した場合、当社はそのユーザーのアクティビティとセッションの経験を追跡します。ユーザーが RUM の追跡を拒否した場合、当社はそのユーザーのアクティビティとセッションの経験を追跡しません。

## プライバシーのオプション
RUM でキャプチャしたデータの収集と編集に関しては、いくつかのオプションとツールがあります。

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

[サポートチケットの発行][8]により、追加料金なしで最大 90 日間まで保持期間を延長することができます。なお、この保持期間の延長は、セッションリプレイ、リソース、ロングタスクには適用されません。

#### ロールベースのアクセス制御
Datadog は、キャプチャした RUM データの閲覧者を管理するために、ロールベースのアクセス制御 (RBAC) を提供します。データアクセスのデフォルト設定は、ユーザーが追加されたロールに依存します。Datadog のロールには、3 つのタイプがあります。Administrator ロール、Standard ロール、Read Only ロールです。より詳細な RUM 固有の権限は、[Datadog ロールの権限][10]で定義されています。例えば、セッションリプレイを閲覧するためのアクセス権を付与したり、取り消したりすることができます。

### データの削除
潜在的な機密データが RUM イベントに流出した場合など、Datadog によって保存されたデータを削除する必要がある場合、所定の時間枠内からデータをハード削除することができます。ハード削除では、**すべての**データが削除され、特定のアプリケーションをターゲットにすることはできません。データの削除が必要な場合は、[Datadog サポートチーム][9]までご連絡ください。

### 個人情報・機密情報の削除
個人を特定できる情報 (PII) や、IP アドレスやジオロケーションなどの機密データを削除するためのオプションがいくつか用意されています。RUM に PII が表示される可能性のあるシナリオをいくつか紹介します。

- ボタンのアクション名 (例: "View full credit card number")
- URL に表示される名前
- アプリの開発者によってインスツルメンテーションされたカスタム追跡イベント

#### 非構造化データ
テキストボックス内の個人名など、構造化されていないデータに誤って含まれる PII は、指定された期間のデータ削除依頼によってのみ削除することができます。

URL に関しては、ページビューを手動で追跡して個人情報を削除するか、beforeSend を使用して URL テキストを変更するオプションがあります。

また、すべての RUM イベントを独自の (プロキシ) サーバーを介して送信することで、エンドユーザーのデバイスが Datadog と直接通信することがないようにすることができます。

#### IP アドレス
RUM アプリケーションのセットアップ時に、IP またはジオロケーションデータを含めるかどうかを選択することができます。

{{< img src="data_security/data-security-rum-privacy-compliance-edit-rum-application.png" alt="RUM アプリケーションのセットアップページで、ジオロケーションとクライアント IP データを含めるかどうかを選択できます" style="width:100%;" >}}

IP データの収集を無効にすると、その変更はすぐに適用されます。無効にする前に収集されたイベントは、IP データが削除されることはありません。これはバックエンドで実行されるため、Browser SDK は引き続きデータを送信しますが、IP アドレスは Datadog バックエンドパイプラインによって省略され、処理時にドロップされます。

#### 位置情報
クライアント IP の削除に加えて、今後収集するすべてのデータから、ジオロケーション (国、都市、郡)、または GeoIP の収集を無効にすることも選択可能です。**Collect geolocation data** ボックスのチェックを外すと、その変更はすぐに適用されます。無効にする前に収集されたイベントは、ジオロケーションデータが削除されることはありません。データの省略はバックエンドレベルで行われます。つまり、Browser SDK は引き続きデータを送信しますが、ジオロケーションデータはバックエンドパイプラインによって省略され、処理時にドロップされます。

### 機密データスキャナーで機密データをプロアクティブに検索する
[機密データスキャナー][11]は、Datadog による取り込み時に、機密データをプロアクティブに検索し、スクラビングすることができます。RUM イベントは、Datadog 内にデータが保存される前に、ストリーム上でスキャンされます。このツールは、PII データを保存する前に、スクラビング、ハッシュ化、または部分的に編集する能力を備えています。すぐに使えるルールやお客様が開発したパターンマッチングルールを適用することで機能します。

## セッションリプレイ固有のプライバシーオプション
[セッションリプレイに固有のプライバシーオプション][12]を参照してください。

### その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/guide/enrich-and-control-rum-data/?tab=event#event-and-context-structure
[2]: /ja/real_user_monitoring/ios/advanced_configuration/?tab=swift#modify-or-drop-rum-events
[3]: /ja/real_user_monitoring/android/advanced_configuration/?tab=kotlin#modify-or-drop-rum-events
[4]: /ja/real_user_monitoring/flutter/advanced_configuration/#modify-or-drop-rum-events
[5]: /ja/real_user_monitoring/browser/tracking_user_actions/#declare-a-name-for-click-actions
[6]: /ja/real_user_monitoring/browser/modifying_data_and_context/?tab=npm#user-session
[7]: /ja/real_user_monitoring/browser/modifying_data_and_context/?tab=npm#user-session
[8]: /ja/help/
[9]: /ja/help/
[10]: /ja/account_management/rbac/permissions/#real-user-monitoring
[11]: /ja/account_management/org_settings/sensitive_data_detection
[12]: /ja/real_user_monitoring/session_replay/privacy_options
[13]: https://www.datadoghq.com/privacy/
[14]: /ja/real_user_monitoring/explorer/search/
[15]: /ja/real_user_monitoring/guide/proxy-rum-data/?tab=npm
[16]: /ja/real_user_monitoring/reactnative/advanced_configuration/#modify-or-drop-rum-events