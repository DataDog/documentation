---
description: ユーザーディレクトリを Cloud SIEM に同期し、シグナル、リスク、調査にアイデンティティ コンテキストを追加します。
further_reading:
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/okta/
  tag: ドキュメント
  text: Okta Identity エンティティパックのセットアップ
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/google_workspace/
  tag: ドキュメント
  text: Google Workspace Identity エンティティパックのセットアップ
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/microsoft_entra_id/
  tag: ドキュメント
  text: Microsoft Entra ID エンティティパックのセットアップ
- link: /security/cloud_siem/triage_and_investigate/user_inventory/
  tag: ドキュメント
  text: ユーザーインベントリでの同期されたユーザーの閲覧
- link: /security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/
  tag: ドキュメント
  text: エンティティリスクでのエンティティとリスクスコアリングの調査
- link: /security/cloud_siem/ingest_and_enrich/content_packs/
  tag: ドキュメント
  text: Cloud SIEM コンテンツパックの詳細
- link: /security/cloud_siem/triage_and_investigate/investigator/
  tag: ドキュメント
  text: Investigator について
- link: /account_management/rbac/permissions/
  tag: ドキュメント
  text: Datadog ロールの権限の確認
title: エンティティパック
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">エンティティパックは、US1-FED Datadog サイトでは利用できません。</div>
{{< /site-region >}}

## 概要 {#overview}

エンティティパックは、ユーザーディレクトリを Cloud SIEM に同期する [Cloud SIEM コンテンツパック][1]の一種です。
- **コンテンツパック**は、検知ルールやダッシュボードなどのログベースのセキュリティコンテンツを取り込みます。
- **エンティティパック**は、そのアクティビティの背後にあるアイデンティティレコードを取り込むため、Cloud SIEM は*何*が起きたかだけでなく、そのシグナルが*何*に関するものかを特定できます。

エンティティパックが有効な場合、Cloud SIEM はディレクトリユーザーとその属性をログおよびセキュリティシグナルと関連付けます。各エンティティパックには以下が含まれます。

- **自動同期**: Cloud SIEM はアイデンティティプロバイダーからユーザーとその属性を同期し、常に最新の状態に保ちます。
- **[ユーザーインベントリ][2]**: Cloud SIEM に同期されたユーザーを閲覧、検索、フィルタリングします。ユーザーの属性 (表示名、プリンシパル ID、ユーザータイプ、アカウントステータスなど) を表示します。ユーザーに関連付けられたすべてのシグナル、リスク、ログを調査します。
- **シグナルのユーザーピル**: セキュリティシグナルにアイデンティティコンテキストが直接アタッチされるため、トリアージ中にシグナルに関与しているユーザーを確認できます。
- **[エンティティリスク][8]におけるユーザーリスクのロールアップ**: リスクスコアがユーザーごとに集約されるため、シグナルを 1 つずつ確認するのではなく、ユーザー 1 人の合計リスクをまとめて確認できます。

<div class="alert alert-info">エンティティパックはユーザーディレクトリデータを同期します。これには名前やメールアドレスなどの個人データが含まれます。ディレクトリを接続する前に、組織のプライバシー要件を確認してください。</div>

## 利用可能なエンティティパック{#available-entity-packs}

Cloud SIEM は、以下のエンティティパックをサポートしています。

| エンティティパック| ディレクトリ同期済み| 資格情報の種類|
|---|---|---|
| [Okta Identity][3] | Okta ユーザーとその属性| Okta ドメインと API トークン|
| [Google Workspace Identity][4] | Google Workspace ユーザーとその属性| サービスアカウントの JSON キーファイル|
| [Microsoft Entra ID][5] | Microsoft Entra ID ユーザーとその属性| Azure アプリの登録|

Datadog でこれらを見つけるには、[**Cloud SIEM**] > [[**Content Packs**][6]] に移動してください。次に、`type:entityPack` を検索するか、[**Entity Pack**] フィルターをクリックして、エンティティパックを絞り込んでください。

## 前提条件 {#prerequisites}

### 権限 {#permissions}

エンティティパックは、以下の権限を使用します。[Datadog 管理者ロール][7]を持つユーザーは、それらをユーザーアカウントに付与できます。

| 権限| 許可される操作|
|---|---|
| **SIEM Entities Notification** | この権限を持つユーザーは、エンティティリスクの通知を変更できます。|
| **SIEM Entities Read** | ユーザーインベントリで同期されたユーザーを表示し、シグナルやエンティティリスクでユーザーピルを確認し、エンティティパックのサイドパネルを開くことができます。|
| **SIEM Entities Admin** | **SIEM Entities Read** で許可されるすべての操作に加え、ユーザーディレクトリの接続、資格情報の追加と削除、同期の有効化または無効化が可能です。|
| **Integrations Manage** | Microsoft Entra ID エンティティパックでのみ必要となり、Azure サブスクリプションとリソース収集を構成するために使用します。|

アイデンティティコンテキストを扱うすべてのユーザーには、**SIEM Entities Read** または **SIEM Entities Admin** が必要です。ユーザーがいずれかの権限を持っていない場合:

- エンティティパックがアクティブで同期中であっても、ユーザーインベントリが空白です。
- ユーザーピルがシグナル上やエンティティリスク内に表示されません。
- コンテンツパックのインターフェイスからエンティティパックのサイドパネルが開きません。

<div class="alert alert-info">エンティティパックの展開の一環として、アナリストに <strong>SIEM Entities Read</strong> 権限を付与してください。その権限がない場合、ディレクトリの同期は正常に完了しても、権限を持たないアナリストは提供されるアイデンティティコンテキストを確認できません。ユーザーインベントリが空の場合は、同期のトラブルシューティングを行う前に権限を確認してください。</div>

### アイデンティティプロバイダーへのアクセス {#identity-provider-access}

エンティティパックをセットアップするには、エンティティパックが必要とする資格情報を作成するのに十分な、接続先のアイデンティティプロバイダーに対する管理者アクセス権も必要です。各エンティティパックは、以下のように異なる資格情報タイプを使用します。

- Okta Identity には、Okta ドメインと API トークンが必要です。
- Google Workspace Identity には、Google サービスアカウントの JSON キーファイル、ドメイン、および Workspace 管理者のメールアドレスが必要です。
- Microsoft Entra ID には、Azure アプリの登録が必要です。提供されているクイックスタートスクリプトや Terraform を使用して作成するか、必要な権限がすでに付与されているアプリ登録を接続することができます。

各資格情報に必要なプロバイダー側の正確な権限とスコープについては、そのエンティティパックのセットアップページを参照してください。

### ログインテグレーション {#log-integrations}

エンティティパックは対応するログインテグレーションやコンテンツパックを必要とせず、対応するコンテンツパックもエンティティパックを必要としません。Okta ログを Datadog に送信しなくても、Okta Identity エンティティパックを使用して Okta ユーザーディレクトリを同期できます。

両者は連携させることで最も効果を発揮します。エンティティパックはアイデンティティコンテキストを提供し、ログベースのコンテンツパックは Cloud SIEM がそのコンテキストをアタッチするアクティビティを提供します。プロバイダーのログから生成されたシグナルでアイデンティティコンテキストを取得するには、両方を構成します。

## エンティティパックの状態 {#entity-pack-states}

他のコンテンツパックと同様に、各エンティティパックはコンテンツパックのインターフェイスのタイルとして表示され、2 つの状態を持ちます。タイルのサイドパネルを開くには、**SIEM Entities Read** または **SIEM Entities Admin** 権限が必要です。

### Available {#available}

まだ接続していないエンティティパックは [**Available**] とマークされます。そのサイドパネルには、有効にした後にエンティティパックが提供する内容が表示され、ユーザーディレクトリを接続できるようになります。[**Add Credentials**] (Microsoft Entra ID の場合は [**Add Account**]) をクリックして、セットアップを開始してください。ディレクトリを接続するには、**SIEM Entities Admin** 権限が必要です。

### Active {#active}

資格情報を接続し、Datadog がそれを検証すると、エンティティパックは [**Active**] とマークされます。そのサイドパネルには、エンティティパックの健全性が表示されます。

[- **Credentials**]: 接続された各アカウント。ドメイン、検証ステータス、有効/無効の状態、最終更新時刻、同期ステータス、最終同期時刻、最終同期期間が含まれます。アカウントを追加したり、個々のアカウントの同期を有効または無効にしたりできます。
[- **Key Metrics**]: 同期されたユーザー、資格情報別のユーザー、資格情報別の同期履歴、資格情報別の同期期間を表示するインタラクティブなダッシュボードです。
[- **Entities**]: このエンティティパックによって同期されたユーザー。表示名、プリンシパル ID、ユーザータイプ (例: `human` または `service_account`)、アカウントステータスが含まれます。[**View in User Inventory**] をクリックして、インベントリの全体を確認してください。

「**Key Metrics**」および「**Credentials**]」クションを使用して、同期が最新であること、および資格情報がまだ有効であることを確認します。

## エンティティパックのセットアップ {#set-up-an-entity-pack}

セットアップのステップは、アイデンティティプロバイダーによって異なります。接続するディレクトリのガイドに従ってください。

- [Okta Identity エンティティパック][3]
- [Google Workspace Identity エンティティパック][4]
- [Microsoft Entra ID エンティティパック][5]

各ガイドでは、アイデンティティプロバイダーでの資格情報の作成、Datadog への追加、およびコネクションのテストを順を追って説明します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/cloud_siem/ingest_and_enrich/content_packs/
[2]: /ja/security/cloud_siem/triage_and_investigate/user_inventory/
[3]: /ja/security/cloud_siem/ingest_and_enrich/entity_packs/okta/
[4]: /ja/security/cloud_siem/ingest_and_enrich/entity_packs/google_workspace/
[5]: /ja/security/cloud_siem/ingest_and_enrich/entity_packs/microsoft_entra_id/
[6]: https://app.datadoghq.com/security/siem/content-packs
[7]: /ja/account_management/rbac/
[8]: /ja/security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/