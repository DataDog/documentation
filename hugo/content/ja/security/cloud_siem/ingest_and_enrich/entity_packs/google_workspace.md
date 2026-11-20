---
description: Google Workspace のユーザーディレクトリを Cloud SIEM に同期し、シグナル、リスク、調査にアイデンティティコンテキストを追加します。
further_reading:
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/
  tag: ドキュメント
  text: エンティティパックの詳細情報
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/okta/
  tag: ドキュメント
  text: Okta Identity エンティティパックのセットアップ
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/microsoft_entra_id/
  tag: ドキュメント
  text: Microsoft Entra ID エンティティパックのセットアップ
- link: /security/cloud_siem/triage_and_investigate/user_inventory/
  tag: ドキュメント
  text: ユーザーインベントリでの同期されたユーザーの閲覧
- link: /security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/
  tag: ドキュメント
  text: エンティティリスクでのエンティティとリスクスコアリングの調査
- link: /integrations/gsuite/
  tag: ドキュメント
  text: Google Workspace インテグレーションでの Google Workspace ログの収集
- link: https://www.datadoghq.com/blog/google-workspace-detections/
  tag: ブログ
  text: Datadog Cloud SIEM での Google Workspace アプリ内の悪意のあるアクティビティの検出
title: Google Workspace Identity エンティティパック
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">エンティティパックは、US1-FED Datadog サイトでは利用できません。</div>
{{< /site-region >}}

## 概要 {#overview}

Google Workspace Identity エンティティパックは、Google Workspace のユーザーディレクトリを Cloud SIEM に同期します。接続後、Cloud SIEM はそのディレクトリを使用して次のことを行います。

- [ユーザーインベントリ][8]に Google Workspace のユーザーを追加します。
- シグナルにユーザーピルをアタッチして、アクティビティの背後にいるユーザーを確認できるようにします。
- [エンティティリスク][1]で、ユーザーのすべてのアカウントにわたるリスクをスコアリングします。


エンティティパックが一般的に提供するもの、および必要な権限については、[エンティティパック][10]を参照してください。

Datadog は、作成してドメイン全体の委任を付与する Google Cloud サービスアカウントを使用して、[Google Admin SDK Directory API][2] 経由でディレクトリを読み取ります。Datadog はユーザーレコードへの読み取り専用アクセスを要求します。ディレクトリへの書き込みは行いません。

## 前提条件 {#prerequisites}

この設定には 2 つの異なる Google アイデンティティが関与しており、どちらも会話では一般的に「サービスアカウント」と呼ばれます。これらは、以下のように同じ意味ではありません。

| アイデンティティ | 説明 | 用途 |
| --- | --- | --- |
| **Google Cloud サービスアカウント** | Datadog が認証に使用する Google Cloud エンティティ。| その JSON キーファイルを Datadog にアップロードします。|
| **Google Workspace 管理者ユーザー** | Directory API を呼び出す際にサービスアカウントが権限を借用する、管理者特権を持つ Google Workspace ユーザー。| [**Workspace Admin email**] フィールドに入力します。|

[**Workspace Admin email**] フィールドには、サービスアカウントではなく、Google Workspace 管理者ユーザーが必要です。入力しようとしているアドレスの末尾が `@<project-id>.iam.gserviceaccount.com` の場合、それはサービスアカウントのメールアドレスであり、コネクションは失敗します。

始める前に、以下があることを確認してください。

- サービスアカウントを作成し、API を有効にできる Google Cloud プロジェクト。
同期する Google Workspace テナントの - **Super Admin** 権限、または代理でドメイン全体の委任を付与できる Super Admin。
- ディレクトリを接続するために必要な、Datadog の **SIEM Entities Admin** 権限。アイデンティティコンテキストを確認する必要があるアナリストには、少なくとも **SIEM Entities Read** が必要です。[エンティティパック][10]を参照してください。
- Google Workspace ディレクトリに少なくとも 1 人のユーザー。ディレクトリが空の場合、ユーザーインベントリも空になります。

Datadog では、個人のアカウントではなく、`datadog-integration@example.com` のような汎用的な名前の共有管理者アカウントの権限を借用することを推奨しています。インテグレーションが特定の個人のアカウントに依存している場合、その人物が組織を離れたり管理者権限を失ったりすると、同期が停止し、原因の特定が困難になります。

## セットアップ {#setup}

Google Workspace ドメインごとに資格情報のセットを 1 つ設定できます。複数のドメインを同期するには、「[追加のドメインの接続](#connect-additional-domains)」を参照してください。

### Google Cloud でのサービスアカウントの作成 {#create-a-service-account-in-google-cloud}

1. Google Cloud コンソールで、サービスアカウントを作成するプロジェクトを選択します。
1. Google の [サービスアカウントの手順][4]の「**サービスアカウントの作成**」のセクションに従ってください。
1. サービスアカウントの JSON キーを作成し、ダウンロードしたファイルを保存します。このファイルは、後のステップで Datadog にアップロードします。

このサービスアカウントに Google Cloud IAM ロールを割り当てる必要はありません。ディレクトリへのアクセス権は、Google Cloud IAM ではなく、Google Workspace 管理コンソールのドメイン全体の委任付与によって提供されます。

### Admin SDK API の有効化 {#enable-the-admin-sdk-api}

1. Google Cloud コンソールで、サービスアカウントを所有するプロジェクトが選択されていることを確認します。
1. [**APIs & Services**] > [**Library**] に移動します。
1. **Admin SDK API** (`admin.googleapis.com`) を検索して開きます。
1. [**Enable**] をクリックします。

### ドメイン全体の委任の付与 {#grant-domain-wide-delegation}

1. Google Cloud コンソールでサービスアカウントを開き、[**Show advanced settings**] をクリックします。[**Domain-wide delegation**] の下で、サービスアカウントの **Client ID** をコピーします。これは、サービスアカウントの [**Details**] タブに [**Unique ID**] として表示される数値と同じです。
1. Google Workspace 管理コンソールで、[**Security**] > [**Access and data control**] > [**API controls**] に移動します。
1. [**Domain-wide delegation**] の下で、[**Manage Domain Wide Delegation**] をクリックします。
1. [**Add new**] をクリックします。
1. サービスアカウントの **Client ID** を [**Client ID**] フィールドに貼り付けます。
1. [**OAuth scopes**] に、次のスコープを入力します。
   ```text
   https://www.googleapis.com/auth/admin.directory.user.readonly
   ```
1. [**Authorize**] をクリックします。
1. 付与を確認するには、リスト内で新しい **Client ID** を見つけ、[**View details**] をクリックして、スコープがリストされていることを確認します。

詳細については、Google の[サービスアカウントへのドメイン全体の権限の委任][5]を参照してください。

### Datadog での資格情報の追加 {#add-credentials-in-datadog}

1. Datadog で、[**Cloud SIEM**] > [[**Content Packs**][6]] に移動します。
1. [**Entity Pack**] でフィルタリングし、**Google Workspace Identity** エンティティパックを開きます。ディレクトリを接続するまでは [**AVAILABLE**] とマークされます。
[1. Add Credentials**] をクリックします。**
1. [**Add credentials and activate content pack**] ダイアログで、[**Browse files**] をクリックし、ダウンロードしたサービスアカウントの JSON キーファイルを選択します。Datadog はファイルから `client_email`、`private_key`、`project_id` の値を抽出します。
1. 以下の残りのフィールドに入力します。
   | フィールド | 説明 |
   | --- | --- |
   | **Name** | この資格情報セットの表示名 (例: `Production credentials`)。複数のドメインを接続する予定がある場合は、ドメインを識別できる名前を使用します。|
   | **Domain** | 同期する Google Workspace ドメイン (例: `example.com`)。|
   | **Workspace Admin email** | サービスアカウントが権限を借用する Google Workspace 管理者ユーザー (例: `datadog-integration@example.com`)。サービスアカウントのメールアドレスは使用しないでください。|
1. [**Test Connection**] をクリックします。Datadog は、資格情報を保存する前に Google Workspace に対して資格情報の検証を行います。検証に失敗した場合は、「[トラブルシューティング](#troubleshooting)」を参照してください。
1. 接続のテストが成功したら、資格情報を保存してエンティティパックを有効にします。

Datadog はサービスアカウントの秘密鍵を暗号化して保存し、Datadog インターフェイスや API レスポンスでそれを返すことはありません。

## 同期の確認{#verify-the-sync}

同期は継続的に行われます。最初の同期は Datadog が資格情報を検証するとすぐに開始され、それ以降の同期は前回の同期が終了した時点で開始されるため、ユーザー自身は同期のスケジュールやトリガーは行いません。アカウントの通常の状態よりもはるかに古い**最終同期**時間は、調査する価値があります。

Datadog が資格情報を検証すると、エンティティパックは [**ACTIVE**] とマークされます。[**Cloud SIEM**] > [[**Content Packs**][6]] から [**Google Workspace Identity**] タイルを開いてサイドパネルを表示し、以下をチェックします。

### 資格情報 {#credentials}

「**Credentials**」セクションには、接続されている各アカウントがリストされます。アカウントを展開して、以下を確認します。

| フィールド | 内容 |
| --- | --- |
| **Domain** | このアカウントが同期する Google Workspace ドメイン。|
| **Status** | このアカウントの同期が有効か無効か。トグルを使用して変更するか、オーバーフローメニューを使用して資格情報を削除します。|
| **Last updated** | 資格情報自体が最後に変更された日時。|
| **Sync status** | 最新の同期が完了したかどうか (例: `Synced`)。|
| **Last synced** | 最新の同期が実行されてからの経過時間。|
| **Last sync duration** | その同期にかかった時間。|

各アカウントには、以下の検証バッジも表示されます。

| バッジ | 意味 |
| --- | --- |
| **Valid** | Datadog はこれらの資格情報を使用して Google Workspace に対して認証できます。|
| **Invalid** |  Datadog は認証できません。「[トラブルシューティング](#troubleshooting)」を参照してください。|

### Key Metrics {#key-metrics}

「**Key Metrics**」セクションには、4 つのウィジェットが表示されます。

- **Users Synced**: 同期によって属性が更新されたユーザーの数。これはディレクトリのサイズではなくディレクトリのチャーンを測定するため、通常はユーザーの合計数よりもはるかに少なくなります。
- **Users by Credential**: 更新されたユーザーの同じ数を、接続されたアカウントごとに分類したものです。
- **Sync History by Credential**: 時間経過に伴う完了した同期。ギャップは、同期の失敗またはスキップを示しています。
- **Sync Duration by Credential**: 各同期にかかった時間 (ミリ秒単位)。一時的なスパイクは正常ですが、持続的な増加は、ディレクトリの拡大や Google 側での API スロットリングを示している可能性があります。

資格情報ごとのウィジェットは、入力した**名前**を正規化した形式である `credential_name` でグループ化されます。たとえば、`Production credentials` は `production_credentials` になります。

### Entities {#entities}

「**Entities**」セクションには、このエンティティパックが同期したユーザーが、**表示名**、**プリンシパル ID**、**ユーザータイプ** (たとえば `human` や `service_account`)、および **アカウントステータス** とともにリストされます。

このエンティティパックによって Cloud SIEM に取り込まれたユーザー数を確認する場合は、**同期済みユーザー** ではなく、エンティティ数を使用してください。[**View in User Inventory**] をクリックして、[フルインベントリ[9]を確認してください。

アイデンティティコンテキストがシグナルに到達していることを確認するには、同期されたユーザーに起因するシグナルを開き、ユーザーピルが表示されることを確認します。

## 追加のドメインの接続{#connect-additional-domains}

資格情報の各セットは、1 つの Google Workspace ドメインを同期します。エンティティパックが [**ACTIVE**] になった後、「**Credentials**」セクションの [**Add account**] を使用して、それぞれの追加ドメインを接続します。

それぞれの追加ドメインで以下を行います。

そのテナントの Google Workspace 管理コンソールで1. [ドメイン全体の委任を付与](#grant-domain-wide-delegation)します。委任の付与は、それを作成したテナントにのみ適用されます。
1. エンティティパックのサイドパネルで、「**Credentials**」セクションの [**Add account**] をクリックします。
1. 「[Datadog での資格情報の追加](#add-credentials-in-datadog)」で説明されているのと同じフィールドに入力し、[**Test Connection**] をクリックします。

複数のドメインを実行する場合、以下を行います。

- 各アカウントにドメインを識別できる [**Name**] を付けます。これにより、[**Users by Credential**]、[**Sync History by Credential**]、および[**Sync Duration by Credential**] が読みやすくなります。
- [**Workspace Admin email**] が [**Domain**] の値と同じドメインに属していることを確認してください。不一致があると、接続のテストが失敗します。

## トラブルシューティング {#troubleshooting}

### 接続のテストが失敗した場合 {#the-connection-test-fails}

以下の原因を順番に確認してください。

| 原因 | 確認方法 | 修正方法 |
| --- | --- | --- |
| サービスアカウントのメールアドレスが管理者メールアドレスとして入力されている | **Workspace Admin email** の末尾が `@<project-id>.iam.gserviceaccount.com` |  である代わりに、管理者権限を持つ Google Workspace ユーザーを入力してください。|
| Admin SDK API が有効になっていない | Google Cloud コンソールの [**APIs & Services**] > [**Enabled APIs & services**] に **Admin SDK API** | [ がリストされていないサービスアカウントを所有するプロジェクトで Admin SDK API](#enable-the-admin-sdk-api) を有効にしてください。|
| ドメイン全体の委任が付与されていない | サービスアカウントの **Client ID** が [**Manage Domain Wide Delegation**] ページに表示されていない | [ドメイン全体の委任を付与してください](#grant-domain-wide-delegation)。|
| OAuth スコープが間違っているか不足している | 委任エントリーの [**View details**] をクリックする。`https://www.googleapis.com/auth/admin.directory.user.readonly`がリストにない | 委任エントリーを編集し、末尾に余分な文字を含めず、記載通りにスコープを追加してください。|
| 権限を借用するユーザーが管理者ではない | [**Workspace Admin email**] のユーザーに、Google Workspace 管理コンソールでの管理者ロールがない | 管理者権限を持つアカウントを使用するか、ユーザーへの読み取りアクセス権を持つアカウントを割り当ててください。|
| ドメインの不一致 | [**Domain**] の値が、権限を借用する管理者ユーザーのドメインと一致しない | [**Domain**] の値を修正するか、そのドメインの管理者の権限を借用してください。|
| JSON キーファイルが不完全または間違っている | アップロードされたファイルに `client_email`、`private_key`、または `project_id` が欠落しているか、あるいは `type` が `service_account` |  ではないサービスアカウントから JSON キーを再ダウンロードし、変更せずにアップロードしてください。|

Google によると、委任の変更が反映されるまで最大 24 時間かかる場合があるようですが、通常はそれよりも早く適用されます。委任を付与したばかりの場合やスコープを追加したばかりの場合は、しばらく待ってから再度 [**Test Connection**] を実行してください。

### 資格情報が機能していたが、現在は無効になっている {#credentials-were-working-and-are-now-invalid}

最も一般的な原因は、Google 側での変更です。

- 権限を借用する管理者ユーザーが一時停止や削除されたか、管理者ロールを失った。これは、インテグレーションが共有アカウントではなく個人のアカウントに紐付いている場合に発生する一般的な障害です。
- サービスアカウントの JSON キーがローテーション、無効化、または削除された。キーを作成してアップロードしてください。
- サービスアカウント自体が削除されたか、ドメイン全体の委任の入力が削除された。
- Google Cloud プロジェクトで Admin SDK API が無効化された。

### 同期は成功するがユーザーが表示されない {#the-sync-succeeds-but-no-users-appear}

[**Domain**] の値が、想定しているユーザーのドメインと一致していることを確認してください。入力したドメインとは異なるドメインの有効な管理者ユーザーを使用すると、結果が空になることがあります。

### シグナルでユーザーピルが表示されない {#no-user-pill-appears-on-signals}

アイデンティティコンテキストは、メールアドレスによってイベントと照合されます。同期されたユーザーのアクティビティにピルが表示されない場合は、そのソースのログにユーザーのメールアドレスフィールドが入力されていること、およびそのソースの OCSF パイプラインがアクティブであることを確認してください。[Open Cybersecurity Schema Framework][7] を参照してください。

エンティティパックは一致するログインテグレーションやコンテンツパックを必要とせず、それらもエンティティパックを必要としません。ディレクトリを同期しているにもかかわらず、アタッチする Google Workspace のアクティビティが表示されない場合は、[Google Workspace のログ インテグレーション][3]も必要になる可能性があります。

さらにヘルプが必要な場合は、[Datadog サポート][8]までお問い合わせください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/
[2]: https://developers.google.com/workspace/admin/directory/v1/guides
[3]: /ja/integrations/gsuite/
[4]: https://developers.google.com/workspace/guides/create-credentials#service-account
[5]: https://developers.google.com/identity/protocols/oauth2/service-account#delegatingauthority
[6]: https://app.datadoghq.com/security/siem/content-packs
[7]: /ja/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/
[8]: /ja/help/
[9]: /ja/security/cloud_siem/triage_and_investigate/user_inventory/
[10]: /ja/security/cloud_siem/ingest_and_enrich/entity_packs/