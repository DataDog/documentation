---
aliases:
- /ja/real_user_monitoring/security/
further_reading:
- link: /data_security/
  tag: ドキュメント
  text: Datadog に送信されるデータの主なカテゴリを確認する
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
<div class="alert alert-info">このページでは、Datadog に送信されるデータのセキュリティについて説明します。クラウドおよびアプリケーションのセキュリティ製品やセキュリティ機能をお探しの場合は、<a href="/security/" target="_blank">Security</a> セクションをご覧ください。</div>

## 概要 {#overview}
Real User Monitoring (RUM) は、プライバシー要件を実装して、あらゆる規模の組織で機密情報や個人情報が公開されないようにするための、制御機能を提供します。データは、Datadog が管理するクラウドインスタンスに保存され、保存時に暗号化されます。このページで説明されているデフォルトの動作と構成可能なオプションは、ユーザーのプライバシーを保護し、組織の機密情報が収集されるのを防ぐように設計されています。[Datadog のプライバシー][1]の詳細をご覧ください。

## 責任の共有 {#shared-responsibility}

ユーザーのデータを安全に保つ責任は、Datadog と、RUM SDK を活用する開発者の間で共有されます。

Datadog の責任は以下のとおりです。

- Datadog プラットフォームに送信および保存されるデータを安全に処理する、信頼性の高い製品を提供すること。
- 社内ポリシーに従ってセキュリティ問題を特定すること。

開発者の責任は以下のとおりです。
- Datadog が提供する設定値およびデータプライバシーオプションを活用すること。
- 環境内のコードの整合性を確保すること。

## コンプライアンスフレームワーク {#compliance-frameworks}
RUM は、以下を含む (ただしこれらに限定されない) 多くの基準および規制フレームワークに準拠するように設定できます。

- GDPR
- HIPAA
- ISO
- CCPA/CPRA

## プライバシー制限 {#privacy-restrictions}
デフォルトでは、規制および基準フレームワークへの準拠を支援するために、ユーザーのデータを保護するプライバシー制限がいくつか適用されています。

### ブラウザ RUM における Cookie の使用 {#browser-rum-use-of-cookies}
ブラウザ RUM でデータを収集するには、ユーザーのブラウザでファーストパーティ Cookie を有効にする必要があります。お客様が事業を展開する管轄区域で義務付けられている場合、それらの管轄区域の法律を遵守するようにページを設定する責任はお客様にあります (RUM の初期化前に Cookie 収集の同意を得るなど)。

### モバイル RUM の同意管理 {#mobile-rum-consent-management}
モバイル RUM のトラッキングは、ユーザーの同意が得られた場合にのみ実行されます。ユーザーが RUM トラッキングに同意した場合、Datadog はそのアクティビティとセッションエクスペリエンスを追跡します。ユーザーが RUM トラッキングを拒否した場合、Datadog はそのアクティビティとセッションエクスペリエンスを追跡しません。

## プライバシーオプション {#privacy-options}
RUM によってキャプチャされたデータの収集および編集に関しては、いくつかのオプションとツールが用意されています。

### クライアントトークン {#client-token}
ブラウザ RUM の[クライアントトークン][2]は、ユーザーのブラウザからのデータを Datadog 内の特定の RUM アプリケーションと照合するために使用されます。これは暗号化されておらず、アプリケーションのクライアント側から見ることができます。

クライアントトークンは Datadog へのデータ送信にのみ使用されるため、このトークンが原因でデータが損失するリスクはありません。ただし、Datadog では、その他の種類の悪用を防ぐために、適切なクライアントトークン管理を推奨しています。以下にその例を示します。

- そのアプリケーションでのみ使用されるように、[クライアントトークンを定期的にローテーション][3]する
- RUM データのキャプチャ時に[ボットを自動的にフィルタリング][4]する

#### 認証済みプロキシ{#authenticated-proxy}
クライアントトークンを使用してボットをフィルタリングする 1 つの方法は、認証済みプロキシを使用することです。この方法では、Datadog RUM Browser SDK を初期化する際に、`clientToken` の代わりにプレースホルダー文字列が使用されます。プロキシは実際のクライアントトークンを知っていますが、ユーザーは知りません。

プロキシは、セッションデータを Datadog に渡す前に有効なユーザー情報をチェックするように構成されています。これにより、実際のユーザーがサインインして監視対象のトラフィックを送信していることが確認されます。トラフィックを受信すると、プロキシはデータにプレースホルダー文字列が含まれていることを確認し、それを実際の `clientToken` に置き換えてから Datadog にデータを転送します。

### イベント追跡{#event-tracking}
[イベント][5]とは、サイトやアプリの特定の要素に対するユーザーの操作のことです。イベントは、SDK を通じて自動的にキャプチャすることも、カスタムアクションを通じて送信することもできます。ユーザーの操作やページビューの自動追跡をオフにして、選択した操作のみをキャプチャするように設定できます。デフォルトでは、RUM はターゲットコンテンツを使用して、SDK によって自動的に収集されたアクションからアクション名を生成します。この動作は、任意の名前を使用して[明示的に上書き][6]できます。

自動的に追跡されるデータには主に技術情報が含まれ、その多くには個人情報は含まれません。RUM によってキャプチャされたデータは、以下のメソッドの高度な設定オプションを通じて、Datadog に送信および保存される前にさらに編集 (削除) できます。

- [beforeSend API][7]
- [iOS][8]
- [Android][9]
- [Flutter][10]
- [React Native][11]

### プロキシサーバー経由で RUM イベントを送信する {#transmit-rum-events-through-a-proxy-server}
すべての RUM イベントを独自の[プロキシサーバー][12]経由で送信することで、ユーザーのデバイスが Datadog と直接通信しないようにすることができます。

### ユーザー ID の追跡 {#user-identity-tracking}
デフォルトでは、**ユーザー ID の追跡は行われません**。各セッションに一意の `session.id` が関連付けられて、データが匿名化されますが、傾向を把握することは可能です。名前やメールアドレスなどの[ユーザーデータ][13]を取得するコードを記述し、そのデータを使用して RUM セッションを[エンリッチおよび変更][13]することもできますが、これは必須ではありません。

### データ保持 {#data-retention}
イベントキャプチャを設定すると、イベントが Datadog に保存されます。キャプチャしたイベントやプロパティを Datadog に保持する期間を決定できます。

デフォルトでは、本番環境のデータ保持期間は以下のとおりです。

- セッション、ビュー、アクション、エラー、セッション記録は 30 日間。
- リソースおよびロングタスクは 15 日間。

より長期間にわたってユーザーの行動を分析するためにデータ保持期間を延長するには (セッション、ビュー、アクションのみ)、[Product Analytics への参加][20]をリクエストできます。

#### ロールベースのアクセス制御 {#role-based-access-control}
Datadog は、キャプチャされた RUM データを誰が閲覧できるかを管理するために、ロールベースのアクセス制御 (RBAC) を提供しています。データアクセスのデフォルト設定は、ユーザーが追加されたロールによって異なります。Datadog で利用可能なロールには、Administrator、Standard、Read Only の 3 種類があります。RUM 固有のより詳細な権限は、[Datadog ロールの権限][15]で定義されています。たとえば、Session Replay を表示するためのアクセス権の付与/取り消しを行うことができます。

### データの削除 {#data-deletion}
Datadog に保存されているデータを削除する必要がある場合 (たとえば、RUM イベントに機密性の高いデータが漏洩してしまった場合など)、特定の期間内のデータを完全に削除できます。完全削除を行うと、**すべて**のデータが削除されます。特定のアプリケーションを対象にすることはできません。データの削除が必要な場合は、[Datadog サポートチーム][14]までご連絡ください。

### 個人情報および機密データの削除 {#personal-and-sensitive-data-removal}
個人を特定できる情報 (PII) や機密データ (IP アドレス、地理的位置情報など) を削除するためのオプションがいくつか用意されています。RUM に PII が含まれる可能性があるシナリオの例を以下に示します。

- ボタンのアクション名 (例: "完全なクレジットカード番号を表示")
- URL に表示される名前
- アプリの開発者によって計測されたカスタム追跡イベント

#### アクション名をマスクする {#mask-action-names}
デフォルトでは、すべてのアクション名をマスクするには `enablePrivacyForActionName` オプションを `mask` プライバシー設定と組み合わせて使用できます。この操作により、上書きされていないすべてのアクション名が自動的にプレースホルダー `Masked Element` に置き換えられます。この設定は、既存の [HTML オーバーライド属性][16]と互換性を持つようにも設計されています。

#### 非構造化データ {#unstructured-data}
非構造化データに誤って含まれてしまった PII (テキストボックス内の個人名など) は、指定された期間のデータ削除リクエストを通じてのみ削除できます。

URL に関しては、ページビューを手動で追跡して PII を削除する方法や、beforeSend を使用して URL テキストを変更する方法があります。

また、すべての RUM イベントを独自の (プロキシ) サーバー経由で送信することで、エンドユーザーのデバイスが Datadog と直接通信しないようにすることも可能です。

#### IP アドレス {#ip-address}
RUM アプリケーションを初期化した後、[{{< ui >}}User Data Collection{{< /ui >}}] (ユーザーデータの収集) タブから、IP データや位置情報データを含めるかどうかを選択できます。

{{< img src="data_security/data-security-rum-privacy-compliance-user-data-collection-1.png" alt="RUM アプリケーション管理ページから、位置情報データとクライアント IP データを含めるか除外するかを選択できます。" style="width:100%;" >}}

IP データの収集を無効にすると、その変更は直ちに適用されます。無効にする前に収集されたイベントから IP データが削除されることはありません。これはバックエンドで実行されます。つまり、Browser SDK は引き続きデータを送信しますが、IP アドレスは Datadog のバックエンドパイプラインによって省略され、処理時に破棄されます。

#### 位置情報{#geolocation}
クライアント IP の削除に加えて、今後収集されるすべてのデータからの位置情報 (国、都市、郡) または GeoIP の収集を無効にすることもできます。[{{< ui >}}Collect geolocation data{{< /ui >}}] (位置情報データを収集する) ボックスのチェックを外すと、その変更は直ちに適用されます。無効にする前に収集されたイベントから、対応する位置情報データが削除されることはありません。データの省略はバックエンドレベルで行われます。つまり、Browser SDK は引き続きデータを送信しますが、位置情報データは Datadog のバックエンドパイプラインによって省略され、処理時に破棄されます。

### Sensitive Data Scanner を使用して機密データをプロアクティブに検索する{#proactively-search-for-sensitive-data-with-sensitive-data-scanner}
[Sensitive Data Scanner][17] を使用すると、Datadog への取り込み時に機密データをプロアクティブに検索およびスクラブすることができます。RUM イベントは、Datadog 内にデータが保存される前にストリーム上でスキャンされます。このツールには、PII データを保存する前にスクラブ、ハッシュ化、または部分的に編集する機能があります。これは、すぐに使用できるパターンマッチングルール、またはお客様が作成したパターンマッチングルールを適用することで機能します。この機能を有効にしている場合は、[[{{< ui >}}Manage Sensitive Data{{< /ui >}}] (機密データの管理) ページ][18]で確認できます。

## Session Replay 固有のプライバシーオプション{#session-replay-specific-privacy-options}
[Session Replay 固有のプライバシーオプション][19]を参照してください。Session Replay でのマスキングは永続的です。マスクされた値がデバイスから送信されることはなく、後でマスクを解除することもできません。これは [Sensitive Data Scanner のマスキング][21]とは異なります。後者は、取り込み時に一致する値を難読化しますが、`Data Scanner Unmask` 権限を持つユーザーは元の値を表示できます。

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