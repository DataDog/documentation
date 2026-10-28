---
description: Datadog 組織のユーザー、Teams、認証、API キー、ロール、セキュリティ設定は、Organization Settings セクションから管理できます。
further_reading:
- link: /account_management/api-app-keys/
  tag: ドキュメント
  text: API キーとアプリケーションキー
- link: /account_management/users/
  tag: ドキュメント
  text: ユーザー管理
title: 組織の設定
---
## 概要{#overview}
Organization Settings セクションには、左側のナビゲーション下部にあるアカウントメニューから {{< ui >}}Organization Settings{{< /ui >}} をクリックするか、Personal Settings ページ上部のヘッダーのドロップダウンから {{< ui >}}Organization Settings{{< /ui >}} を選択することで、[管理者][1]がアクセスできます。

{{< img src="account_management/org_settings/nav.png" alt="Datadog の Organization Settings に移動" style="width:80%;" >}}

Organization Settings では、ユーザー、グループ、RBAC、キー、トークンを管理できます。このページでは、各セクションの概要と、{{< ui >}}Organization Settings{{< /ui >}} における特定のタスクについてのドキュメントの場所を説明します。

## アイデンティティとアカウント {#identity-accounts}

### ユーザー {#users}

ユーザーの追加、編集、無効化については、[ユーザー管理][2]ドキュメントをお読みください。

### Teams {#teams}

Datadog 内でアセットを整理するためのチームを管理するには、[Teams][3] のドキュメントをお読みください。

### サービスアカウント {#service-accounts}


[サービスアカウント][4]は、チーム間で共有されるアプリケーションキーやその他のリソースを所有するために使用できる非対話型アカウントです。サービスアカウントのアプリケーションキーは、キーを作成した本人のみ一度だけ表示できます。サービスアカウントを使用すると、アプリケーションやスクリプトを特定の個人に関連付けることなく、Datadog API にアクセスできます。

## 認証 {#authentication}

### ログイン方法 {#login-methods}


{{< ui >}}Login Methods{{< /ui >}} タブには、パスワード、Google、および SAML 認証の設定が表示されます。{{< ui >}}Enabled by Default{{< /ui >}} ドロップダウンを使用して、それぞれを切り替えることができます。「SAML Strict」またはその他のログインタイプで厳格な設定を行うには、他のログイン方法を無効にします。User Management タブでユーザーごとのオーバーライドを許可すると、必要に応じてユーザーが別のログイン方法でログインできるようになります。

[ログイン方法の構成][5]のドキュメントを読んで、Datadog の組織にログインするユーザーを認証してください。

#### SAML 設定 {#saml-settings}

SAML の構成については、[SAML によるシングルサインオンのドキュメント][6]をご参照ください。

### SAML グループマッピング {#saml-group-mappings}

有効にすると、SAML を使用して Datadog アカウントにログインするユーザーは、現在のロールが完全に削除され、新しいロールが再割り当てされます。アイデンティティプロバイダーから渡される SAML アサーションと、作成したマッピングによって、各ユーザーの新しいロールが決定されます。

SAML でログインし、Datadog ロールにマッピングされる値を持たないユーザーは、すべてのロールが永久に剥奪されます。そのユーザーは、以降ログインできなくなります。
マッピングの作成方法および設定方法については、[SAML 属性のマッピングに関するドキュメント][7]を参照してください。

## アクセス {#access}

### API キー {#api-keys}

このセクションでは、リスト内の API キーの表示、コピー、および無効化を行えます。API キーは組織に固有のものです。Datadog Agent がメトリクスやイベントを Datadog に送信するには、API キーが必要です。キーの作成、編集、および無効化の詳細については、[API キーのドキュメント][8]を参照してください。

### アプリケーションキー {#application-keys}

アプリケーションキーは名前、ID、または所有者でフィルターできます。また、{{< ui >}}Only My Keys{{< /ui >}} トグルをオンにして自分が所有するアプリケーションキーのみを表示することも可能です。キーの追加および削除の詳細については、[アプリケーションキーのドキュメント][8]を参照してください。

### ロール{#roles}

Datadog のデフォルトおよびカスタムロールについては、[ロールベースのアクセス制御ドキュメント][9]をお読みください。

### Remote Configuration {#remote-configuration}

動作やインフラストラクチャーにデプロイされた Datadog コンポーネントをリモートで構成する方法については、[リモート構成の仕組み][10]をお読みください。

### クライアントトークン {#client-tokens}

クライアントトークンは、ユーザーの Web アプリケーションやモバイルアプリケーションからイベントやログを送信するために使用されます。これらは組織に固有のものです。RUM アプリケーションにリンクされているクライアントトークンを削除すると、その RUM アプリケーションからの報告が停止します。[クライアントトークンの作成手順][11]は、API キーやアプリケーションキーの作成手順と同様です。

### イベントの API メール {#events-api-emails}

ご利用のアプリケーションに既存の Datadog インテグレーションが含まれておらず、カスタム Agent チェックの作成を希望されない場合は、イベントをメールで送信できます。イベントの API メールの設定方法については、[メールによるイベントのガイド][12]をお読みください。

### Synthetic テスト {#synthetic-tests}

[Synthetic モニタリング設定][13]へのアクセス方法と制御方法について説明します。

### MCP サーバー {#mcp-server}

[Datadog MCP サーバー][18]を通じて、AI Agent やツールが組織の Datadog データにアクセスする方法を管理します。

- MCP サーバーとそのツールへの[組織全体でのアクセス][19]の有効化または無効化を行います。また、リソースを作成または変更するツールの書き込みアクセス権を個別に有効化または無効化します。
- MCP サーバーでの OAuth 認証用の[リダイレクト URL][20] を構成します。

## Security {#security}

### Safety Center {#safety-center}

[**Safety Center**][14] ページには、組織内で確認すべきセキュリティアラート、警告、および推奨事項が含まれます。

### 公開共有 {#public-sharing}

{{< ui >}}Public Sharing{{< /ui >}} タブには、共有に関する組織全体の設定と、共有されているダッシュボードやグラフのリストが含まれます。共有機能は細かく有効化でき、招待の最大有効期間の設定など、追加のセキュリティオプションを構成できます。

すべての組織に共有設定を適用するには、[Datadog サポート][16]までお問い合わせください。

**注**: 共有設定およびリソースを表示・管理するには、OrgAdmin 権限が必要です。

### モバイルおよびサードパーティアクセス {#mobile-and-third-party-access}

[**モバイルおよびサードパーティアクセス**][15]ページでは、組織内のモバイルアプリケーションおよびサードパーティアプリケーションを表示、管理できます。

## Compliance {#compliance}

### Audit trail {#audit-trail}

組織の設定ページの {{< ui >}}Audit Trail{{< /ui >}} タブを選択すると、監査イベントエクスプローラーが新しいタブで開きます。

### 監査証跡設定 {#audit-trail-settings}

{{< ui >}}Audit Trail Settings{{< /ui >}} タブを使用して、監査証跡の保持期間の設定や、他のクラウドストレージサービスへのアーカイブの有効化ができます。

### SMTP の構成 {#smtp-configuration}

[**SMTP の構成**][17]ページでは、独自の SMTP サーバーを接続して、ステータスページのサブスクリプションメールを独自のドメインから送信できるようにします。

## 一般 {#general}

### 設定 {#preferences}

#### 組織名 {#organization-name}

組織名を変更するには、{{< ui >}}Organization Settings{{< /ui >}} の {{< ui >}}Preferences{{< /ui >}} タブにある {{< ui >}}Edit{{< /ui >}} ボタンをクリックし、新しい名前を入力してから {{< ui >}}Save{{< /ui >}} ボタンをクリックします。

**注**: 組織名は 32 文字以内である必要があります。

#### Datadog ホームページ {#datadog-homepage}

組織のホームページをダッシュボードリストに設定するか、個別のダッシュボードに設定するかは、選択可能です。

#### ログインデックスの契約外保持期間 {#out-of-contract-retention-periods-for-log-indexes}

`Org Management` 権限を持つユーザーは、ログインデックスの契約外保持期間機能を有効にできます。この機能は組織単位で有効化されます。つまり、ユーザーが親組織でこの機能を有効にしても、すべての子組織で自動的に有効化されるわけではありません。

{{< img src="account_management/out-of-contract-retention.png" alt="有効として表示されているログインデックスの契約外保持期間の設定。" style="width:70%;" >}}

有効にすると、`Modify Index` 権限を持つユーザーは、契約に含まれていない場合でも、3 日、7 日、15 日、30 日、45 日、および 60 日の保持期間のいずれかを選択できます。これは、長期にわたる潜在的な問題のトラブルシューティングを行う場合や、現在の契約に含まれていない長い保持期間がコンプライアンス要件を満たすために必要な場合に役立ちます。

**注**: 契約外の保持期間を使用すると、オンデマンド料金が発生します。契約外の保持期間が頻繁に使用される場合、Datadog では担当のアカウントマネージャーへ連絡し、契約に追加することを推奨しています。

#### 最大セッション期間の構成 {#max-session-duration-configuration}

`Org Management` 権限を持つユーザーは、組織の最大セッション期間を設定できます。この期間は、変更後に作成されたすべての新しい Web セッションに適用され、組織内の役割に関係なく、すべてのユーザーに適用されます。Datadog モバイルアプリケーションのセッションには適用されません。

セッション期間は、以下の制限内で構成できます。
- **最小期間:** 1 時間
- **最大期間:** {{< region-param key=org_management_max_session_duration >}}

{{< img src="account_management/org_settings/max_session_duration.png" alt="最大セッション期間の設定" style="width:70%;" >}}

#### アイドル時間のセッション期間の構成 {#idle-time-session-duration-configuration}

`Org Management` 権限を持つユーザーは、組織のアイドル時間セッションタイムアウトを有効または無効にできます。有効にすると、30 分間操作がない場合、ユーザーは自動的にサインアウトされます。この設定は、変更後に作成されたすべての新しい Web セッションに適用され、組織内の役割に関係なく、すべてのユーザーに適用されます。Datadog モバイルアプリケーションのセッションには適用されません。

{{< img src="account_management/org_settings/idle_session_timeout.png" alt="アイドルセッションタイムアウトの設定" style="width:70%;" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/users/default_roles/
[2]: /ja/account_management/users/
[3]: /ja/account_management/teams/?s=login%20methods
[4]: /ja/account_management/org_settings/service_accounts
[5]: /ja/account_management/login_methods/
[6]: /ja/account_management/saml/
[7]: /ja/account_management/saml/mapping
[8]: /ja/account_management/api-app-keys/
[9]: /ja/account_management/rbac/
[10]: /ja/remote_configuration#how-it-works
[11]: /ja/account_management/api-app-keys/#client-tokens
[12]: /ja/events/guides/email/
[13]: /ja/synthetics/settings/?tab=specifyvalue#overview
[14]: /ja/account_management/safety_center
[15]: /ja/account_management/org_settings/mobile_third_party_access
[16]: /ja/help/
[17]: /ja/account_management/org_settings/smtp_configuration
[18]: /ja/mcp_server/
[19]: /ja/mcp_server/setup/#required-permissions
[20]: /ja/mcp_server/setup/#adding-oauth-clients