---
description: Microsoft Entra ID ユーザーディレクトリを Cloud SIEM に同期し、シグナル、リスク、調査に ID コンテキストを追加します。
further_reading:
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/
  tag: ドキュメント
  text: エンティティパックの詳細情報
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/okta/
  tag: ドキュメント
  text: Okta Identity エンティティパックのセットアップ
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/google_workspace/
  tag: ドキュメント
  text: Google Workspace Identity エンティティパックのセットアップ
- link: /security/cloud_siem/triage_and_investigate/user_inventory/
  tag: ドキュメント
  text: ユーザーインベントリでの同期されたユーザーの閲覧
- link: /security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/
  tag: ドキュメント
  text: エンティティリスクでのエンティティとリスクスコアリングの調査
- link: /getting_started/integrations/azure/
  tag: ドキュメント
  text: Azure インテグレーションの使用を開始
title: Microsoft Entra ID エンティティパック
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">エンティティパックは、US1-FED Datadog サイトでは利用できません。</div>
{{< /site-region >}}

## 概要 {#overview}

Microsoft Entra ID エンティティパックは、Microsoft Entra ID ユーザーディレクトリを Cloud SIEM に同期します。接続後、Cloud SIEM はそのディレクトリを使用して次のことを行います。

- [ユーザーインベントリ][8]に Entra ID ユーザーを追加してください。
- シグナルにユーザーピルをアタッチして、アクティビティの背後にいるユーザーを確認できるようにします。
- [エンティティリスク][1]で、ユーザーのすべてのアカウントにわたるリスクをスコアリングします。

エンティティパックが一般的に提供するもの、および必要な権限については、[エンティティパック][9]を参照してください。

Datadog は、[Microsoft Graph API][2] を通じてディレクトリを読み取ります。これは、アプリケーション権限が付与され、テナント管理者が同意した Azure アプリ登録として認証されます。Datadog は読み取り専用アクセスを要求するため、ディレクトリへの書き込みは行いません。

他のエンティティパックとは異なり、Microsoft Entra ID は Cloud SIEM に直接入力する資格情報ではなく、[Datadog Azure インテグレーション][10]に基づいて構築されます。エンティティパックをサポートするアプリ登録は、Azure インテグレーションが使用するものと同じであり、リソース収集が有効になっている必要があります。すでに Azure インテグレーションを実行している場合、セットアップのほとんどは完了しています。既存のアプリ登録に 2 つの Microsoft Graph 権限を追加するだけです。

## 前提条件 {#prerequisites}

始める前に、以下があることを確認してください。

- Datadog で構成された [Azure インテグレーション][10]。使用する予定のアプリ登録で**リソース収集が有効**になっている必要があります。リソース収集は必須です。これがないとエンティティパックは同期されません。
- そのアプリ登録で構成された少なくとも 1 つの Azure サブスクリプション (それ以外に使用しない場合でも必要です)。
- Microsoft Graph アプリケーションの権限を追加し、管理者の同意を付与するための Azure ポータルでの権限。同意を付与するには、**特権ロール管理者**または**グローバル管理者**のロールが必要です。
- 以下の Datadog 権限:

  | 権限 | 必要な理由 |
  | --- | --- |
  | **SIEM Entities Admin** | ユーザーディレクトリを接続し、その資格情報を管理します。[エンティティパック][9]を参照してください。|
  | **Integrations Manage** | このエンティティパックが構成される Azure インテグレーション変更します。|

  エンティティパックが提供する ID コンテキストを表示するには、アナリストに少なくとも **SIEM Entities Read** が必要です。

## セットアップ {#setup}

Entra ID テナントごとに 1 つのアプリ登録を構成できます。複数のテナントを同期するには、「[追加のテナントの接続](#connect-additional-tenants)」を参照してください。

リソース収集が有効な Azure インテグレーションがすでにある場合は、「[Microsoft Graph の権限の付与](#grant-microsoft-graph-permissions)」に進んでください。

### Azure インテグレーションのセットアップ {#set-up-the-azure-integration}

1. Datadog で、[**Integrations**] > [[**Azure**][3]] に移動します。
1. Azure インテグレーションがまだない場合は、「[Azure の概要][10]」に従ってください。セットアップには以下の 3 つの方法があります。
   - **クイックスタート**。Azure Cloud Shell でインストールスクリプトを実行します。
   - **Terraform**。Infrastructure as Code ワークフロー用です。
   - **既存のアプリ登録**。テナント ID、クライアント ID、クライアントシークレットを自身で入力します。
1. Azure インテグレーションがすでに存在する場合は、使用予定のアプリ登録が準備できていることを確認してください。
   1. [**Configuration**] タブで、リストからアプリ登録を選択してください。各エントリーには、名前またはクライアント ID と、それが持つサブスクリプションの数が表示されます。少なくとも 1 つのサブスクリプションがあることを確認してください。
   1.  [**Resource Collection**] タブを開き、[**Enable Resource Collection**] がオンになっていることを確認します。オフになっている場合は、オンにします。

確認したアプリ登録をメモします。これは、次のステップで Microsoft Graph の権限を付与し、その後に Cloud SIEM で選択するものです。

### Microsoft Graph の権限の付与{#grant-microsoft-graph-permissions}

アプリ登録には、ユーザーデータを読み取るための Microsoft Graph アプリケーションの権限が必要です。これらは、Azure インテグレーションがすでに使用している権限に追加されるものです。

1. Azure portal で、[**Microsoft Entra ID**] > [**App registrations**] に移動します。
1.  Datadog のアプリ登録を選択します。似たものが複数ある場合は、クライアント ID で検索します。
1. 左側のサイドバーで、[**API permissions**] をクリックします。
1. [**Add a permission**] > [**Microsoft Graph**] > [**Application permissions**] をクリックします。
1. 以下の権限を追加します。
   | 権限| 以下で必要| 読み取り対象|
   | --- | --- | --- |
   | `User.Read.All` | ユーザープロファイル| ユーザー属性: メールアドレス、氏名、部署、役職、アカウントステータス、パスワード変更のタイムスタンプ。|
   | `AuditLog.Read.All` | MFA ステータスおよびサインインアクティビティ | MFA 登録ステータス、認証方法の詳細、およびサインインアクティビティ。|

   `User.Read.All` の代わりに `Directory.Read.All` を付与できます。より広範であり、ユーザーデータに加えて他のディレクトリオブジェクトも対象となります。組織がより広いスコープを必要とする理由がない場合、`User.Read.All` を付与してください。
1. [**Grant admin consent for \\<your tenant name\>**] をクリックします。詳細については、Microsoft の「[Grant tenant-wide admin consent][4]」を参照してください。
1. **Status** 列で両方の権限に緑色のチェックマークが表示されていることを確認してください。権限の追加は権限への同意とは異なり、このステップは見落とされがちです。

<div class="alert alert-info">権限 <code>AuditLog.Read.All</code>がない場合、ディレクトリは引き続き同期され、ユーザーはユーザーインベントリに引き続き表示されますが、そのレコードには MFA ステータスやサインインアクティビティが含まれません。</div>

### Datadog でのアプリ登録の追加 {#add-an-app-registration-in-datadog}

1. Datadog で、[**Cloud SIEM**] > [[**Content Packs**][5]] に移動します。
1. **エンティティパック**でフィルタリングし、**Microsoft Entra ID** エンティティパックを開きます。ディレクトリを接続するまでは [**AVAILABLE**] とマークされます。
1. [**Add Account**] をクリックします。
1. [**Add App Registration**] ダイアログで、セットアップ方法を選択します。
   | 方法 | 使用するケース |
   | --- | --- |
   | **Quickstart** | Datadog のインストールスクリプトを使用して、Azure Cloud Shell 経由で統合を設定する場合。|
   | **Terraform** | Azure 構成をコードとして管理している場合。|
   | **Existing App Registration** | 上記のステップに従っており、必要な権限でアプリ登録を Azure にすでに設定済みの場合。|
1. エンティティパックに Azure アプリの登録が表示されます。Microsoft Graph の権限を付与したものを選択し、リソースコレクションが有効になっていることを確認します。
1. 「**6 Azure applications have Resource Collection disabled.**」のような警告が表示された場合は、その下のリストから Microsoft Graph の権限を付与したアプリ登録を探してください。赤い点は、リソースコレクションが無効であることを示します。その横にある [**Configure**] をクリックするか、[**Integrations**] > [[**Azure**][3]] でアプリ登録を開き、[**Resource Collection**] タブで [**Enable Resource Collection**] をオンにします。

## 同期の確認{#verify-the-sync}

Entra ID の同期は Azure リソースコレクションに依存しているため、アプリ登録を接続してもユーザーはすぐには Cloud SIEM に表示されません。

アプリ登録が接続され、検証されると、エンティティパックは [**ACTIVE**] とマークされます。Cloud SIEM でサイドパネルを開き、チェックを確認します。

### 資格情報 {#credentials}

「**Credentials**」セクションには、接続されているアカウントの数と各アカウントが一覧表示されます。アカウントを展開して、以下を確認します。

| フィールド | 内容 |
| --- | --- |
| **Subscription** | このアカウントを識別する Azure サブスクリプション ID。|
| **Created on** | アカウントが接続された日時。|
| **Sync status** | 最新の同期が完了したかどうか (例: `Synced`)。|
| **Last synced** | 最新の同期が実行されてからの経過時間。|
| **Last sync duration** | その同期にかかった時間。|

サブスクリプション ID の横にある [**HEALTHY**] バッジは、アカウントが正常に同期されていることを示します。アカウントの右側にあるトグルを使用して、アカウントを削除せずに同期を有効または無効にします。

同期詳細の下に、アカウントの Azure アプリ登録がクライアント ID ごとに、それぞれが持つサブスクリプションの数とともに一覧表示されます。緑色の点はそのアプリ登録でリソースコレクションが有効になっていることを意味し、赤色の点は無効になっていることを意味します。無効なものがある場合、リストの上部で要約行が示され、その数が表示されます。例: **6 Azure applications have Resource Collection disabled.**アプリ登録の横にある [**Configure**] をクリックして構成を開き、リソースコレクションを有効にします。

リソースコレクションは、Microsoft Graph の権限を付与したアプリ登録で有効にする必要があります。リストにある他のアプリ登録でリソースコレクションが無効になっていても、アカウントは [**HEALTHY**] および [**] Synced**と表示される場合があります。

### Key Metrics {#key-metrics}

[**Key Metrics**] ダッシュボードには以下の 4 つのウィジェットが表示されます。

- **Users Synced**: 同期によって属性が更新されたユーザーの数。これはディレクトリのサイズではなくディレクトリのチャーンを測定するため、通常はユーザーの合計数よりもはるかに少なくなります。合計については、以下の「**Entities**」セクションを使用してください。
- **Users by Credential**: 更新されたユーザーの同じ数を、接続されたアカウントごとに分類したものです。
- **Sync History by Credential**: 時間経過に伴う完了した同期。ギャップは、同期の失敗またはスキップを示しています。
- **Sync Duration by Credential**: 各同期にかかった時間。一時的なスパイクは正常ですが、持続的な増加は、ディレクトリの拡大や Azure 側での Microsoft Graph のスロットリングを示している可能性があります。

資格情報ごとのウィジェットは `credential_name` でグループ化されます。

### Entities {#entities}

「**Entities**」セクションには、このエンティティパックが同期したユーザーが、[**Display Name**]、[**Principal ID**]、[**User Type**] (例: `human` や `service_account`)、および [**Account Status**] (例: [**ACTIVE**]) とともに一覧表示されます。エンティティ数は、このディレクトリから Cloud SIEM に同期されたユーザーの合計数であるため、Entra ID テナントのサイズと比較するための数値となります。このリストは期間で絞り込まれており、この期間は変更可能です。[**View in User Inventory**] をクリックして、[フルインベントリ][8]を確認してください。

アイデンティティコンテキストがシグナルに到達していることを確認するには、同期されたユーザーに起因するシグナルを開き、ユーザーピルが表示されることを確認します。

## 追加のテナントの接続 {#connect-additional-tenants}

各アプリ登録は 1 つの Entra ID テナントを対象としています。追加のテナントを同期するには、各テナントで[セットアップ](#setup)手順を繰り返し、エンティティパックのサイドパネルの「**Credentials**」セクションで [**Add App Registration**] をクリックします。

複数のテナントを接続する場合:

- 各アカウントのトグルを使用して、アカウントを削除せずに 1 つのテナントの同期を一時停止します。
- 各テナントで個別に Microsoft Graph の権限を付与し、管理者の同意を得てください。同意は、それを付与したテナントにのみ適用されます。
- 各アプリ登録でリソースコレクションを有効にします。これはグローバル設定ではなく、アプリ登録ごとの設定です。

## トラブルシューティング {#troubleshooting}

### ユーザーが表示されない {#no-users-appear}

以下の原因を順番に確認してください。

| 原因 | 確認方法 | 修正方法 |
| --- | --- | --- |
| 時間が十分に経過していない | 権限の付与またはアプリ登録の接続を最近行ったばかりである | しばらく待ってから再度チェックします。Entra ID 同期は Azure リソースコレクションに依存しているため、ユーザーはすぐには表示されません。|
| 管理者の同意が付与されていない | [ **API permissions**] の [**Status**] 列に、両方の権限に対する緑色のチェックマークが表示されていない | [**Grant admin consent for \<tenant\>**] をクリックして、両方のチェックマークを確認します。権限を追加しても、同意しなければ何も実行されません。|
| リソースコレクションが無効になっている | 「**Credentials**」セクションで、Microsoft Graph の権限を付与したアプリ登録に赤いドットが表示されている | アプリ登録の横にある [**Configure**] をクリックするか、[**Integrations**] > [[**Azure**][3]] で開き、[**Resource Collection**] タブで [**Enable Resource Collection**] をオンにします。|
| サブスクリプションが構成されていない | 「**Credentials**」セクション、または [**Integrations**] > [[**Azure**][3]] のアプリ登録リストで、アプリ登録に [**0 subscriptions** | ] と表示されています。それ以外に使用しない場合でも、少なくとも 1 つのサブスクリプションを構成します。|
| 選択されたアプリ登録が間違っている | エンティティパックで選択されたアプリ登録が Graph 権限を付与したものとは異なる | 権限を付与したアプリ登録を選択するか、選択したアプリ登録に権限を付与します。|
| ディレクトリが空である | Entra ID テナントにユーザーが含まれていない | ユーザーがいるテナントに接続します。空のディレクトリは正常に同期され、空のユーザーインベントリが作成されます。|
| 数値が正しくない [| **Users Synced**] がゼロまたは非常に低い値を示している | 代わりに [**Entities**] の数をチェックします。[**Users Synced**] は、同期によって属性が変更されたユーザーのみをカウントするため、同期が正常であっても安定したディレクトリでは低い値になります。|

### MFA ステータスまたはサインインアクティビティが欠落している {#mfa-status-or-sign-in-activity-is-missing}

`AuditLog.Read.All`は、付与されていないか、同意されていません。Azure ポータルで、アプリ登録の [**API permissions**] を開き、[**Status**] に緑色のチェックマークが付けられて権限がリストされていることを確認します。ユーザーのプロファイルはそれなしでも同期されますが、MFA 登録ステータスとサインインアクティビティは同期されません。

### 権限拒否のエラー {#permission-denied-errors}

- 同意を付与した Azure アカウントが、**特権ロール管理者**または**グローバル管理者**のロールを保持していることを確認します。権限の低いロールでは、権限要求を追加することはできますが、同意することはできません。
- Datadog アカウントに [**SIEM Entities Admin**] および [**Integrations Manage**] があることを確認します。[エンティティパック][9]を参照してください。

### 正常に動作していたアカウントが正常でなくなった {#an-account-was-working-and-is-no-longer-healthy}

最も一般的な原因は、以下の Azure 側での変更です。

- アプリ登録のクライアントシークレットの有効期限が切れたか、ローテーションされた。Azure のクライアントシークレットには有効期間があるため、数ヶ月間動作していたコネクションが停止した場合、まずこの原因を疑う必要があります。
- アプリ登録が削除されたか、Microsoft Graph の権限または管理者の同意が取り消された。
- アプリ登録でリソースコレクションが無効になった。

具体的なエラーメッセージについては、[**Integrations**] > [[**Azure**][3]] でアプリ登録を開き、[**Issues**] タブをチェックしてください。

### シグナルでユーザーピルが表示されない {#no-user-pill-appears-on-signals}

アイデンティティコンテキストは、メールアドレスによってイベントと照合されます。同期されたユーザーのアクティビティにピルが表示されない場合は、そのソースのログにユーザーのメールアドレスフィールドが入力されていること、およびそのソースの OCSF パイプラインがアクティブであることを確認してください。[Open Cybersecurity Schema Framework][6] を参照してください。

エンティティパックは、対応するログインテグレーションを必要とせず、その逆も同様です。ディレクトリを同期しているにもかかわらず、アタッチする Entra ID アクティビティが表示されない場合は、Entra ID ログを Datadog に送信する必要がある可能性もあります。

さらにヘルプが必要な場合は、[Datadog サポート][7]までお問い合わせください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/
[2]: https://learn.microsoft.com/en-us/graph/api/resources/users
[3]: https://app.datadoghq.com/integrations/azure
[4]: https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/grant-admin-consent
[5]: https://app.datadoghq.com/security/siem/content-packs
[6]: /ja/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/
[7]: /ja/help/
[8]: /ja/security/cloud_siem/triage_and_investigate/user_inventory/
[9]: /ja/security/cloud_siem/ingest_and_enrich/entity_packs/
[10]: /ja/getting_started/integrations/azure/