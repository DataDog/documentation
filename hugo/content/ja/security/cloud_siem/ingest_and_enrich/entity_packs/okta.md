---
description: Okta ユーザーディレクトリを Cloud SIEM に同期して、シグナル、リスク、および調査にアイデンティティコンテキストを追加します。
further_reading:
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/
  tag: ドキュメント
  text: エンティティパックの詳細情報
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
- link: /integrations/okta/
  tag: ドキュメント
  text: Okta インテグレーションによる Okta ログの収集
title: Okta Identity エンティティパック
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">エンティティパックは、US1-FED Datadog サイトでは利用できません。</div>
{{< /site-region >}}

## 概要 {#overview}

Okta Identity エンティティパックは、Okta ユーザーディレクトリを Cloud SIEM に同期します。接続後、Cloud SIEM はそのディレクトリを使用して次のことを行います。

- [ユーザーインベントリ][8]に Okta ユーザーを取り込みます。
- シグナルにユーザーピルをアタッチして、アクティビティの背後にいるユーザーを確認できるようにします。
- [エンティティリスク][1]で、ユーザーのすべてのアカウントにわたるリスクをスコアリングします。

エンティティパックが一般的に提供するもの、および必要な権限については、[エンティティパック][10]を参照してください。

Datadog は、作成した Okta API トークンで認証を行い、[Okta Users API][2] を通じてディレクトリを読み取ります。必要なのは読み取り専用アクセスのみです。Datadog がディレクトリに書き込むことはありません。

## 前提条件 {#prerequisites}

セットアップには、**名前**、**Okta ドメイン**、および **API トークン** の 3 つの値が必要です。これら 3 つすべてをエンティティパックに入力します。トークンは Okta で作成されます。

始める前に、以下があることを確認してください。

- API トークンを作成し、ユーザーを読み取ることができる Okta 管理者ロール。**Read-only Administrator** で十分ですが、より広範な管理者ロールでも機能します。Okta の[標準の管理者ロールと権限][5]を参照してください。
- ディレクトリを接続するために必要な、Datadog の **SIEM Entities Admin** 権限。アイデンティティコンテキストを必要とするアナリストには、少なくとも **SIEM Entities Read** が必要です。[エンティティパック][10]を参照してください。

## セットアップ {#setup}

Okta 組織ごとに 1 セットの資格情報を構成できます。複数の組織を同期する場合は、「[追加の Okta 組織の接続](#connect-additional-okta-orgs)」を参照してください。

### API トークンの作成{#create-the-api-token}

1. Okta Admin Console で、[**Security**] > [**API**] の順に移動します。
1. [**Tokens**] タブをクリックし、[**Create token**] をクリックします。
1. Datadog がコンシューマーであることを識別できる名前をトークンに指定します (例: `datadog-cloud-siem`)。
1. **API calls made with this token must originate from** で、**Any IP** を選択します。代わりにトークンを Datadog のアドレスに制限する場合は、「[ネットワーク制限](#network-restrictions)」を参照してください。
1. [**Create token**] をクリックし、トークン値をすぐにコピーします。Okta はトークンを一度しか表示せず、その後はハッシュ値のみを保存します。

手順の全容およびその他のネットワークゾーンオプションについては、Okta の [Okta API トークンの管理][4]を参照してください。

<div class="alert alert-info">個人のアカウントではなく、 <code>datadog-integration@example.com</code>のような専用サービスアカウントからトークンを作成してください。トークンはそれを作成したアカウントの権限を継承します。また、Okta は無効化されたアカウントからのトークンを拒否します。そのアカウントが退職者や管理者権限を失ったユーザーに属している場合、同期は停止し、原因の特定が難しくなります。</div>

#### トークンの有効期限 {#token-expiration}

Okta API トークンの有効期間は 30 日間で、API リクエストが行われるたびにトークンが更新されます。したがって、アクティブなエンティティパックは独自のトークンを維持します。30 日以上使用されなかったトークンは永久に失効し、再有効化することはできません。

#### ネットワーク制限 {#network-restrictions}

**Any IP** を選択するのが最も簡単なオプションです。組織で制限付きトークンが必要な場合は、Datadog が公開している IP 範囲を含む Okta IP ゾーンにスコープを設定します。

Datadog は、それらの範囲をサイトごとのエンドポイントで JSON として公開しています。US1 サイトの場合、そのエンドポイントは `https://ip-ranges.datadoghq.com/` です。ご利用の Datadog サイトに一致するものを使用し、範囲が変更されるたびにゾーンを更新してください。応答には、監視可能な `version` フィールドおよび `modified` フィールドが含まれています。エンドポイントの全一覧については、[IP 範囲][12]を参照してください。

この方法を選択する場合、2 つの Okta の制約が適用されます。SSWS トークンは IP ベースのゾーンでのみ機能し、動的ゾーンでは機能しません。また、ブロックリストゾーンで使用することもできません。

#### Okta ドメイン{#okta-domain}

サインインするホストを、スキームやパスを含めずに入力します (例: `example.okta.com`)。

### Datadog での資格情報の追加{#add-credentials-in-datadog}

1. Datadog で、[**Cloud SIEM**] > [[**Content Packs**][6]] の順に移動します。
1. **エンティティパック** でフィルタリングし、**Okta Identity** エンティティパックを開きます。ディレクトリを接続するまでは [**AVAILABLE**] とマークされます。
1. [**Add Credentials**] をクリックします。
1. **Add credentials and activate content pack** ダイアログで、3 つのフィールドに入力します。
   | フィールド | 説明 |
   | --- | --- |
   | **Name** |  この資格情報セットの表示名 (例: `Production credentials`)。複数の組織を接続する予定がある場合は、組織を識別できる名前を使用してください。|
   | **Okta Domain** |  同期する Okta 組織 (例: `example.okta.com`)。スキームやパスを含めず、ホスト名のみを入力します。|
   | **API Token** |  Okta からコピーしたトークン値。生の API リクエストで使用される `SSWS` プレフィックスを含めず、値のみを貼り付けます。|
1. [**Test Connection**] をクリックします。Datadog は、資格情報を保存する前に Okta に対して検証を行います。検証に失敗した場合は、「[トラブルシューティング](#troubleshooting)」を参照してください。
1. 接続テストが成功したら、資格情報を保存してエンティティパックを有効にします。

Datadog は API トークンを保存時に暗号化し、インターフェイスや API 応答で返すことはありません。

## 同期の確認{#verify-the-sync}

同期は継続的に行われます。最初の同期は Datadog が資格情報を検証するとすぐに開始され、それ以降の同期は前の同期が完了した時点で開始されるため、ユーザー自身で同期をスケジュールしたりトリガーしたりする必要はありません。

そのため、**Last synced** 自体がヘルスチェックとしての役割を果たします。正常なアカウントは常に最近の状態で同期されているため、**Last synced** の時刻が進まなくなった場合は、なんらかの問題が発生していることを意味します。

Datadog が資格情報を検証すると、エンティティパックは [**ACTIVE**] とマークされます。Cloud SIEM でサイドパネルを開き、チェックを確認します。

### 資格情報 {#credentials}

「**Credentials**」セクションには、接続されている各アカウントがリストされます。アカウントを展開して、以下を確認します。

| フィールド | 内容 |
| --- | --- |
| **Domain** |  このアカウントが同期する Okta 組織。|
| **Status** | このアカウントの同期が**有効**か無効か。トグルを使用して変更します。|
| **Last updated** | 資格情報自体が最後に変更された日時。|
| **Sync status** | 最新の同期が完了したかどうか (例: `Synced`)。|
| **Last synced** | 最新の同期が実行されてからの経過時間。|
| **Last sync duration** | その同期にかかった時間。|

各アカウントには、以下の検証バッジも表示されます。

| バッジ | 意味 |
| --- | --- |
| **VALID** |  Datadog はこれらの資格情報を使用して Okta に対して認証できます。|
| **INVALID** |  Datadog は認証できません。「[トラブルシューティング](#troubleshooting)」を参照してください。|

API 経由では、Datadog が資格情報を受け入れた後、最初の同期が完了するまでの間、資格情報は `initializing` を報告します。

### Key Metrics {#key-metrics}

[**Key Metrics**] ダッシュボードには以下の 4 つのウィジェットが表示されます。

- **Users Synced**: 同期によって更新されたユーザー数。これはディレクトリのサイズではなくディレクトリのチャーン (変動) を測定するため、通常は合計ユーザー数よりもはるかに低い値を示します。合計については、以下の「[Entities](#entities)」セクションを使用してください。
- **Users by Credential**: 接続されたアカウントごとに内訳が表示される同じカウント。
- **Sync History by Credential**: 時間経過に伴う完了した同期。ギャップは、同期が失敗したかスキップされたことを意味します。
- **Sync Duration by Credential**: 各同期にかかった時間。一時的なスパイクの発生は正常です。継続的な上昇は、通常、ディレクトリが拡大しているか、Okta が呼び出しをレート制限していることを意味します。

資格情報ごとの各ウィジェットは、入力した **Name** から派生した `credential_name` でグループ化されます。

### Entities {#entities}

「**Entities**」セクションには、このエンティティパックが同期したユーザーが一覧表示されます。各行には、**Display Name**、**Principal ID**、**User Type** (例: `human` や `service_account`)、および **Account Status** (例: **ACTIVE**) が表示されます。

Cloud SIEM は、Okta のユーザーステータスを、すべてのアイデンティティプロバイダーで使用される共通のステータスモデル (**ACTIVE**、**SUSPENDED**、**DELETED**) に正規化します。ここでの値は、Okta 独自のステータス名ではありません。

エンティティ数は、このディレクトリから同期されたユーザーの合計数であり、Okta ディレクトリのサイズと比較するための数値となります。この一覧は、変更可能な期間を対象としています。すべてを表示するには、[**View in User Inventory**] をクリックします。

## 追加の Okta 組織の接続{#connect-additional-okta-orgs}

資格情報の各セットは、1 つの Okta 組織を同期します。別の組織を同期するには、その組織で API トークンを作成し、エンティティパックのサイドパネルにある「**Credentials**」セクションで [**Add account**] をクリックします。

複数の組織を接続する場合、

- 各アカウントには、同期する組織にちなんだ名前を指定します。資格情報ごとの 3 つのウィジェットは、入力した **Name** の正規化された形式である `credential_name` でグループ化されるため、名前があいまいだとウィジェットが読み取りにくくなります。
- 資格情報を削除せずに 1 つの組織の同期を一時停止するには、**Status** の下にあるアカウントごとのトグルを使用します。
- 各組織で個別の API トークンを作成します。トークンは、それを発行した組織に対してのみ認証を行います。

## トラブルシューティング {#troubleshooting}

### 接続のテストが失敗した場合 {#the-connection-test-fails}

以下の原因を順番に確認してください。

| 原因 | 確認方法 | 修正方法 |
| --- | --- | --- |
| トークン値が `SSWS` プレフィックスまたは前後の空白を含めて貼り付けられている |  貼り付けた値が Okta に表示されたトークンより長い |  トークン値のみを再度貼り付けます。|
| Okta ドメインがスキームまたはパス付きで入力されている |  **Okta Domain** の値が `https://` で始まるか、`/admin` または末尾のスラッシュで終わっている |  ホストのみを入力します (例: `example.okta.com`)。|
| Okta 組織のホストが誤っている |  値にプレビュー組織用の `example.okta.com` が使用されているか、EMEA 組織用の `-emea` サフィックスが省略されている |  サインインに使用するホストを使用します。`example.oktapreview.com` または `example.okta-emea.com`。|
| トークン作成者が管理者ではないか、ユーザーを読み取れない |  トークンを作成したアカウントに Okta Admin Console の管理者ロールがない |  **Read-only Administrator** またはそれより広範な管理者ロールを持つアカウントからトークンを作成します。|
| トークン作成者が無効化された |  トークンを作成したアカウントが Okta でアクティブではなくなっている |  アクティブなサービスアカウントからトークンを作成します。Okta は無効化されたユーザーからのトークンを拒否します。|
| トークンが失効しているか期限切れである |  トークンが Okta の **Tokens** タブに見当たらないか、最終使用日から 30 日以上経過している |  トークンを作成し、Datadog に追加します。Okta は 30 日以上使用されなかったトークンを永久に失効させます。|
| トークンが Datadog を除外するネットワークゾーンに制限されている |  トークンの **Token can be used from** 設定が次以外になっている: **Any IP** | トークンを **Any IP** に設定するか、IP ゾーンが Datadog の公開範囲をカバーしていることを確認します。「[ネットワーク制限](#network-restrictions)を参照してください。|

### 資格情報が機能していたが、現在は無効になっている {#credentials-were-working-and-are-now-invalid}

原因は通常、Okta 側での変更です。

- トークンを作成したアカウントが無効化されたか、ユーザーへの読み取りアクセス権を付与していた管理者ロールを失いました。トークンの権限は作成元のアカウントの権限に従うため、ロールの変更だけでも同期が停止する可能性があります。これは、トークンがサービスアカウントではなく個人に属している場合に発生する一般的な問題です。
- トークンが **Tokens** タブから失効されたか、30 日以上使用されなかったために期限切れになりました。
- トークンのネットワークゾーン制限が変更されました。

Okta は、トークンの作成と失効を System Log に `API token created` および `API token revoked` として記録します。これが、トークンが失効されたかどうか、および誰によって失効されたかを確認する最も早い方法です。

### 同期が遅い、または断続的である{#syncs-are-slow-or-intermittent}

Okta は組織ごとに API レート制限を適用し、制限を超えると `HTTP 429 Too Many Requests` を返します。Okta Admin Console で作成されたトークンは、各レート制限の 50% がデフォルトに設定されており、同じトークンを使用して呼び出す他のインテグレーションもその同じ枠を消費します。

- Okta で、[**Reports**] > [**Rate Limits**] に移動して警告や違反を確認します。これらは Okta によって System Log にも書き込まれます。
- Okta のトークンページで、デフォルト設定が同期を制限している場合は、**Token rate limits** のパーセンテージを引き上げます。
- 他のインテグレーションですでに使用されているトークンを再利用するのではなく、Datadog 専用のトークンを割り当てます。

Okta の[レート制限の概要][11]を参照してください。

### 同期は成功するがユーザーが表示されない {#the-sync-succeeds-but-no-users-appear}

- [**Domain**] の値が、想定しているユーザーのドメインと一致していることを確認してください。入力したドメインとは異なるドメインの有効な管理者ユーザーを使用すると、結果が空になることがあります。


### シグナルでユーザーピルが表示されない {#no-user-pill-appears-on-signals}

Cloud SIEM は、メールアドレスを使用してアイデンティティコンテキストをイベントに照合します。同期されたユーザーのアクティビティにピルが表示されない場合は、そのソースからのログがユーザーのメールフィールドに入力されているか、またそのソースの OCSF パイプラインがアクティブであるかを確認します。[Open Cybersecurity Schema Framework][7] を参照してください。

エンティティパックは対応するログインテグレーションを必要とせず、インテグレーションもエンティティパックを必要としません。ディレクトリを同期しているにもかかわらず、関連付ける Okta アクティビティが表示されない場合は、[Okta ログインテグレーション][3]も必要になる可能性があります。

さらにヘルプが必要な場合は、[Datadog サポート][8]までお問い合わせください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/
[2]: https://developer.okta.com/docs/api/openapi/okta-management/management/tags/user
[3]: /ja/integrations/okta/
[4]: https://help.okta.com/en-us/content/topics/security/api.htm
[5]: https://help.okta.com/en-us/content/topics/security/administrators-admin-comparison.htm
[6]: https://app.datadoghq.com/security/siem/content-packs
[7]: /ja/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/
[8]: /ja/help/
[9]: /ja/security/cloud_siem/triage_and_investigate/user_inventory/
[10]: /ja/security/cloud_siem/ingest_and_enrich/entity_packs/
[11]: https://developer.okta.com/docs/reference/rate-limits/
[12]: /ja/api/latest/ip-ranges/