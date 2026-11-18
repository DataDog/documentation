---
aliases:
- /ja/real_user_monitoring/security/
further_reading:
- link: /data_security/
  tag: ドキュメント
  text: Datadog に送信されるデータの主要カテゴリーを確認する
- link: /data_security/synthetics/
  tag: ドキュメント
  text: Synthetic Monitoring のデータセキュリティ
- link: /session_replay/privacy_options?platform=browser
  tag: ドキュメント
  text: Session Replay のプライバシーオプション
- link: https://www.datadoghq.com/blog/default-privacy-session-replay/
  tag: ブログ
  text: Session Replay のデフォルトのプライバシー設定でユーザーデータを難読化する
title: Real User Monitoring のデータセキュリティ
---
<div class="alert alert-info">このページでは、Datadog に送信されるデータのセキュリティについて説明します。クラウドおよびアプリケーションの Security 製品や機能をお探しの場合は、<a href="/security/" target="_blank">Security</a> セクションを参照してください。</div>

## 概要 {#overview}
RUM (Real User Monitoring) は、プライバシー要件を導入し、あらゆる規模の組織で機密情報や個人情報の漏洩を防ぐための制御を提供します。データは Datadog が管理するクラウドインスタンスに保存され、保存時に暗号化されます。このページに記載のデフォルトの動作と構成可能なオプションは、エンドユーザーのプライバシーを保護し、組織の機密情報が収集されることを防ぐためのものです。詳細は、[Datadog におけるプライバシー][1]をご覧ください。

## 責任の共有 {#shared-responsibility}

ユーザーデータを保護する責任は、Datadog と RUM SDK を利用する開発者の間で共有されます。

Datadog の責任は以下の通りです。

- データが Datadog プラットフォームに送信され、保存される際に、データを安全に処理できる信頼性の高い製品を提供します。
- 社内ポリシーに基づき、セキュリティ上の問題を確実に特定します。

開発者の責任は以下の通りです。
- Datadog が提供する構成値とデータプライバシーオプションを活用します。
- 自社の環境におけるコードの整合性を確保します。

## コンプライアンス フレームワーク {#compliance-frameworks}
RUM の設定により、以下を含む (ただしこれらに限定されない) 多数の標準および規制フレームワークへの準拠体制を整えることができます。

- GDPR
- HIPAA
- ISO
- CCPA/CPRA

## プライバシー制限 {#privacy-restrictions}
デフォルトで、規制および標準フレームワークへの準拠を支援するために、ユーザーデータを保護するプライバシー制限がいくつか適用されています。

### ブラウザ RUM による Cookie の使用 {#browser-rum-use-of-cookies}
ブラウザ RUM がデータを収集するには、エンドユーザーのブラウザでファーストパーティ Cookie が有効になっている必要があります。事業を運営する管轄区域で義務付けられている場合、RUM を初期化する前に Cookie 収集の同意を得るなど、それらの管轄区域の法律を遵守するようにページを構成する責任は開発者の側にあります。

### モバイル RUM の同意管理 {#mobile-rum-consent-management}
モバイル RUM の追跡は、ユーザーの同意がある場合にのみ実行されます。エンドユーザーが RUM の追跡を承諾した場合、Datadog はそのアクティビティとセッションエクスペリエンスを追跡します。エンドユーザーが RUM の追跡を拒否した場合、Datadog はそのアクティビティとセッションエクスペリエンスを追跡しません。

## プライバシーオプション {#privacy-options}
RUM によって取得されるデータの収集とマスキング用のオプションとツールが複数用意されています。

### クライアントトークン {#client-token}
ブラウザ RUM [クライアントトークン][2]は、エンドユーザーのブラウザからのデータを Datadog 内の特定の RUM アプリケーションと照合するために使用されます。これは暗号化されておらず、アプリケーションのクライアント側から閲覧可能になっています。

クライアントトークンは Datadog へのデータ送信にのみ使用されるため、このトークンによるデータ損失のリスクはありません。ただし Datadog では、他の種類の悪用を防ぐために、以下のような適切なクライアントトークン管理を行うことを推奨しています。

- 定期的に[クライアントトークンをローテーション][3]して、使用しているアプリケーションでのみトークンが使用されるようにする
- RUM データの取得時に自動的に[ボットをフィルタリング][4]する

#### 認証付きプロキシ {#authenticated-proxy}
クライアントトークンを使用してボットをフィルタリングする 1 つの方法として、認証付きプロキシがあります。この方法では、Datadog RUM ブラウザ SDK を初期化する際に、プレースホルダー文字列に `clientToken` が代入されます。プロキシは実際のクライアントトークンを認識しますが、エンドユーザーは認識していません。

プロキシは、セッションデータを Datadog に渡す前にユーザー情報が有効であることを確認するように構成されています。そのようにして、実際のユーザーがサインインしていることを確認し、監視対象のトラフィックを送信します。トラフィックを受信すると、プロキシはデータにプレースホルダー文字列が含まれていることを確認し、それを実際の `clientToken` に置き換えてから Datadog にデータを転送します。

### イベント追跡 {#event-tracking}
[イベント][5]とは、サイトやアプリの特定の要素に対するユーザーの操作のことです。イベントは、SDK を通じて自動的にキャプチャすることも、カスタムアクションを通じて送信することもできます。ユーザーの操作やページビューの自動追跡をオフにして、選択した操作のみをキャプチャすることができます。デフォルトでは、RUM はターゲットコンテンツを使用して、SDK によって自動的に収集されたアクションからアクション名を生成します。任意の名前を指定して、この動作を[明示的にオーバーライド][6]できます。

自動的に追跡されるデータには主に技術情報が含まれており、その多くには個人を特定できる情報は含まれていません。RUM によってキャプチャされたデータは、以下の方法の高度な構成オプションを使用して、Datadog に送信し、そこで保存される前に、さらにマスキングすることができます。

- [beforeSend API][7]
- [iOS][8]
- [Android][9]
- [Flutter][10]
- [React Native][11]

### RUM イベントをプロキシサーバー経由で送信する {#transmit-rum-events-through-a-proxy-server}
すべての RUM イベントを独自の[プロキシサーバー][12]経由で送信することで、エンドユーザーのデバイスが Datadog と直接通信することを完全に防ぐことができます。

### ユーザー識別情報の追跡 {#user-identity-tracking}
デフォルトでは、**ユーザーの識別情報は追跡されません**。各セッションには一意の `session.id` が関連付けられているため、データは匿名化されますが、傾向を把握することはできます。名前やメールアドレスなどの[ユーザーデータ][13]をキャプチャするコードを記述し、そのデータを使用して RUM セッションの情報を[拡充および変更][13]することもできますが、必須ではありません。

### データ保持 {#data-retention}
イベントのキャプチャを設定すると、イベントは Datadog に保存されます。キャプチャされたイベントやプロパティを Datadog に保持する期間を決定できます。

デフォルトでは、本番環境のデータ保持期間は以下の通りです。

- セッション、ビュー、アクション、エラー、セッション録画の保持期間は 30 日間です。
- リソースおよびロングタスクの保持期間は 15 日間です。

より長期間にわたってユーザー行動を分析するためにデータ保持期間を延長する場合は (セッション、ビュー、アクションのみ)、[Product Analytics への参加][20]をリクエストします。

#### ロールベースのアクセス制御 {#role-based-access-control}
Datadog では、キャプチャされた RUM データを閲覧できるかユーザーを管理するために、RBAC (ロールベースのアクセス制御) を提供しています。データアクセスのデフォルト設定は、ユーザーが追加されたロールによって異なります。Datadog で利用可能なロールには、Administrator (管理者)、Standard (標準)、Read Only (読み取り専用) の 3 種類があります。より詳細な RUM 固有の権限については、[Datadog ロールのアクセス許可][15]で定義されています。たとえば、Session Replay を閲覧するためのアクセス権を付与するか、取り消すことができます。

### データの削除 {#data-deletion}
Datadog に保存されているデータを削除する必要がある場合 (たとえば、機密である可能性があるデータが RUM イベントに漏洩した場合)、特定の期間内のデータを物理削除することができます。物理削除を行うと、**すべて**のデータが削除されます。特定のアプリケーションのデータのみを削除することはできません。削除されたデータの中に必要なデータがある場合は、[Datadog サポートチーム][14]までご連絡ください。

### 個人情報および機密データの削除 {#personal-and-sensitive-data-removal}
IP アドレスや位置情報などの PII (個人を特定できる情報) や機密データを削除するためのオプションがいくつか用意されています。RUM に PII が表示される可能性があるシナリオには、次のものがあります。

- ボタンのアクション名 (例: 「クレジットカード番号を全桁表示」)
- URL に表示される名前
- アプリの開発者によって計測されたカスタム追跡イベント

#### アクション名をマスキングする {#mask-action-names}
すべてのアクション名をマスキングする場合、デフォルトで、`enablePrivacyForActionName` オプションを `mask` プライバシー設定と組み合わせて使用できます。この操作を行うと、オーバーライドされていないすべてのアクション名が自動的にプレースホルダー `Masked Element` に置き換えられます。この設定は、既存の [HTML のオーバーライド属性][16]との互換性も考慮して設計されています。

機密データはマスキングし、使用できるアクション名は表示されたままにする場合は、[プライバシープラグイン][22]を使用してください。このプラグインは、ビルド時に安全な静的文字列の許可リストを生成します。`mask-unless-allowlisted` プライバシーレベルでは、SDK は許可リストに一致するテキストのみを表示します。

#### 非構造化データ {#unstructured-data}
テキストボックス内の個人名など、非構造化データに誤って含められた PII を削除するには、指定した期間のデータ削除要求を使用する必要があります。

URL に関しては、手動でページビューを追跡して PII を削除するか、beforeSend を使用して URL テキストを変更することもできます。

すべての RUM イベントを独自の (プロキシ) サーバー経由で送信することで、エンドユーザーのデバイスが Datadog と直接通信しないようにすることもできます。

#### IP アドレス {#ip-address}
RUM アプリケーションを初期化した後、[{{< ui >}}User Data Collection{{< /ui >}}] (ユーザーデータの収集) タブから IP アドレスや位置情報を含めるかどうかを選択できます。

{{< img src="data_security/data-security-rum-privacy-compliance-user-data-collection-1.png" alt="RUM アプリケーション管理ページで、位置情報とクライアント IP データを含めるか除外するかを設定できます。" style="width:100%;" >}}

IP データの収集を無効にした場合、その変更はすぐに適用されます。無効化する前に収集されたイベントから IP データが削除されることはありません。これは、バックエンドで実行されます。つまり、ブラウザ SDK はデータの送信を続けますが、IP アドレスは Datadog のバックエンドパイプラインによって除外され、処理時に破棄されます。

#### 位置情報 {#geolocation}
クライアント IP の削除に加え、今後収集されるすべてのデータにおいて、位置情報 (国、都道府県、市区町村) または GeoIP の収集を無効にすることもできます。[{{< ui >}}Collect geolocation data{{< /ui >}}] (位置情報データの収集) ボックスのチェックを外すと、その変更はすぐに適用されます。無効化する前に収集されたイベントから、対応する位置情報が削除されることはありません。データの除外はバックエンドレベルで行われます。つまり、ブラウザ SDK はデータの送信を続けますが、位置情報データは Datadog のバックエンドパイプラインによって除外され、処理時に破棄されます。

### Sensitive Data Scanner を使用して機密データを事前に検索する {#proactively-search-for-sensitive-data-with-sensitive-data-scanner}
[Sensitive Data Scanner][17] を使用すると、Datadog によるデータの取り込み時に機密データを前もって検索し、スクラビングすることができます。RUM イベントは、Datadog 内にデータが保存される前にストリーム上でスキャンされます。このツールには、PII データが保存される前にスクラビング、ハッシュ化、または一部を伏せ字にする機能があります。これは、デフォルトで用意されているパターンマッチングルールまたは顧客が開発したパターンマッチングルールを適用することで機能します。この機能を有効にしている場合は、[[{{< ui >}}Manage Sensitive Data{{< /ui >}}] (機密データの管理) ページ][18]で確認できます。

## Session Replay 固有のプライバシーオプション {#session-replay-specific-privacy-options}
[Session Replay 固有のプライバシーオプション][19]を参照してください。Session Replay のマスキングは永続的です。マスクされた値はデバイスから送信されることはなく、後でマスクを解除することもできません。これは、取り込み時に一致する値が難読化されるが、`Data Scanner Unmask` 権限を持つユーザーは元の値を表示できる [Sensitive Data Scanner のマスキング][21]とは異なります。

### 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/privacy/
[2]: /ja/real_user_monitoring/application_monitoring/browser/setup/#configuration
[3]: /ja/account_management/api-app-keys/#add-an-api-key-or-client-token
[4]: /ja/real_user_monitoring/guide/identify-bots-in-the-ui/#filter-out-bot-sessions-on-intake
[5]: /ja/real_user_monitoring/explorer/search/
[6]: /ja/real_user_monitoring/application_monitoring/browser/tracking_user_actions/#declare-a-name-for-click-actions
[7]: /ja/real_user_monitoring/guide/enrich-and-control-rum-data/?tab=event#event-and-context-structure
[8]: /ja/real_user_monitoring/ios/advanced_configuration/?tab=swift#modify-or-drop-rum-events
[9]: /ja/real_user_monitoring/application_monitoring/android/advanced_configuration/?tab=kotlin#modify-or-drop-rum-events
[10]: /ja/real_user_monitoring/application_monitoring/flutter/advanced_configuration/#modify-or-drop-rum-events
[11]: /ja/real_user_monitoring/reactnative/advanced_configuration/#modify-or-drop-rum-events
[12]: /ja/real_user_monitoring/guide/proxy-rum-data/?tab=npm
[13]: /ja/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#user-session
[14]: /ja/help/
[15]: /ja/account_management/rbac/permissions/#real-user-monitoring
[16]: /ja/session_replay/privacy_options?platform=browser#override-an-html-element
[17]: /ja/security/sensitive_data_scanner/
[18]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration
[19]: /ja/session_replay/privacy_options?platform=browser
[20]: https://www.datadoghq.com/private-beta/product-analytics/
[21]: /ja/security/sensitive_data_scanner/setup/telemetry_data/?tab=logs#mask-action
[22]: /ja/real_user_monitoring/application_monitoring/browser/build_plugins/privacy/