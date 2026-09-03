---
description: サービスアクセストークンを作成および管理します。これにより、個々のユーザー認証情報に依存せずに、サービスアカウントの代理として Datadog
  API 呼び出しを認証できます。
further_reading:
- link: /account_management/org_settings/service_accounts/
  tag: ドキュメント
  text: サービスアカウント
- link: /account_management/personal-access-tokens/
  tag: ドキュメント
  text: パーソナルアクセストークン
- link: /account_management/workload_identity_federation/
  tag: ドキュメント
  text: ワークロード ID フェデレーション
- link: https://www.datadoghq.com/blog/datadog-api-authentication/
  tag: ブログ
  text: スコープ付き認証情報による Datadog API 認証のモダナイズ
title: サービスアクセストークン
---
## 概要 {#overview}

サービスアクセストークン (SAT) は、
[サービスアカウント][1]の代理として Datadog API 呼び出しを認証する認証情報です。[パーソナルアクセストークン (PAT)][2] とは異なり、個々のユーザーではなくサービスアカウントに属するため、
組織でチームメンバーの参加や離脱が行われても有効なままです。

SAT を使用すると、次のことが可能になります。
- チームメンバーが組織を離れた後も有効な認証情報を使用して、自動化されたワークフローやスクリプトを認証する。
- 安定した統合のために、定期的なローテーションを必要としない、長期間有効なトークンを作成する。
- トークンのスコープを、ワークフローに必要な最小限の権限に設定する。
- 明確な監査説明責任のために、すべての API アクティビティを、所有するサービスアカウントに帰属させる。

### SAT と他の認証情報タイプとの比較 {#sats-compared-to-other-credential-types}

| | サービスアクセストークン | パーソナルアクセストークン | アプリケーションキー |
|---|---|---|---|
| 所有者 | サービスアカウント | 個々のユーザー | 個々のユーザーまたはサービスアカウント |
| 有効期間 (TTL) | 任意: 1 日、1 か月、1 年、なし、またはカスタム | 必須: 1 日から 1 年| 有効期限なし |
| デフォルトでスコープ設定 | はい: スコープは必須 | はい: スコープは必須 | 任意: デフォルトでスコープなし |
| スタンドアロン認証 | はい: API キーのペアリングは不要 | はい: API キーのペアリングは不要 | いいえ: API キーが必要|
| 識別可能なプレフィックス | `ddsat_` | `ddpat_` | `ddapp_` (新規) |
| 表示場所 | [Service account details] (サービスアカウントの詳細)、[Organization Settings] (組織設定) > [Access Tokens] (アクセストークン) | [Personal Settings] (個人設定) > [Access Tokens]、[Organization Settings] > [Access Tokens] | [Personal Settings] > [Application Keys] (アプリケーションキー)、[Organization Settings] > [Application Keys] |

パーソナルアクセストークンについては、[パーソナルアクセストークン][2]を参照してください。

## 前提条件{#prerequisites}

- Datadog サービスアカウント。作成方法については、[サービスアカウント][1]を参照してください。
- 自分が管理するサービスアカウントの SAT を作成するための `service_account_write` 権限。
- 組織内の任意のサービスアカウントの SAT を管理するための `org_app_keys_write` 権限。

## サービスアクセストークンの作成 {#create-a-service-access-token}

1. [[**Organization Settings**] > [**Service Accounts**] (サービスアカウント)][3] に移動し、サービスアカウントをクリックします。
2. 詳細パネルの [**Access Tokens**] で、[{{< ui >}}+ New Token{{< /ui >}}] (+ 新規トークン) をクリックします。
3. [{{< ui >}}Name{{< /ui >}}] (名前) にトークンの名前を入力します。
4. [{{< ui >}}Expiration Date{{< /ui >}}] (有効期限) を選択します ([**1 day**] (1 日)、[**1 month**] (1 か月)、[**1 year**] (1 年)、[**Never**] (なし)、
   または [**Custom**] (カスタム))。有効期限のないトークンにするには、[**Never**] を選択します。
5. [{{< ui >}}Select Scopes{{< /ui >}}] (スコープを選択) をクリックして、トークンがアクセスできる範囲を定義します。ワークフローに必要な権限のみを付与し、
   [{{< ui >}}Save{{< /ui >}}] (保存) をクリックします。

<div class="alert alert-warning">Datadog は、トークンシークレットを作成時に一度だけ表示します。
コピーして安全に保管してください。後から取得することはできません。</div>

保存後、詳細パネルにトークンシークレット、名前、トークン ID、所有者、所有者のロール、
有効期限、およびスコープが表示されます。

SAT の有効期限を長く設定した場合や、[**Never**] を選択した場合は、シークレットをソースコードや環境ファイルではなく、
シークレットマネージャー (AWS Secrets Manager、HashiCorp Vault、Azure Key Vault など) に
保存してください。AWS Secrets Manager は、[Datadog サービスアカウント認証情報の
マネージドローテーション][8]をサポートしています。

## サービスアクセストークンの使用 {#use-a-service-access-token}

SAT は 2 つの認証方法をサポートしています。

### Authorization ヘッダー (推奨) {#authorization-header-recommended}

SAT を `Authorization` ヘッダーで Bearer トークンとして渡します。この方法では API キーは
不要です。

```bash
curl -X GET "https://api.datadoghq.com/api/v2/users" \
  -H "Authorization: Bearer <YOUR_SAT>"
```

### アプリケーションキーヘッダー {#application-key-header}

SAT を `dd-application-key` ヘッダーで渡します。

```bash
curl -X GET "https://api.datadoghq.com/api/v2/users" \
  -H "dd-application-key: <YOUR_SAT>"
```

**注:** 有効な SAT が `dd-application-key` ヘッダーで提供されている場合、Datadog は SAT のみを使用して
認証を行います。`dd-api-key` ヘッダーはオプションであり、その値は評価されません。

## SAT で認証された API 呼び出しに対する制限 {#restrictions-on-sat-authenticated-api-calls}

権限昇格を防ぐため、Datadog は、SAT で認証された API 呼び出しで実行できる操作を制限しています。これらの制限は、呼び出しを行う API クライアントに関係なく適用されます。

- **アプリケーションキー**: SAT は、アプリケーションキーを作成または更新できません。アプリケーションキーの取り消しは許可されています。
- **新しいトークンのスコープ**: SAT で別の SAT を作成または更新できるのは、新しいトークンのスコープが自身のスコープのサブセットである場合のみです。
- **新しいトークンの有効期間 (TTL)**: SAT は、自身の有効期限を超える TTL を持つ SAT を作成することはできません。

これらの制限のいずれかに違反する呼び出しは、`403 Forbidden` レスポンスを返します。

## サービスアクセストークンの管理{#manage-service-access-tokens}

### トークンの表示{#view-tokens}

サービスアカウントのトークンは、詳細パネルの、
[[**Organization Settings**] > [**Service Accounts**]][3] に表示されます。

{{< img src="account_management/service-access-tokens/sat-service-account-panel.png" alt="2 つのサービスアクセストークンがリストされている [Access Tokens] セクションを示すサービスアカウント詳細パネル。" style="width:80%;" >}}

`org_app_keys_read` 権限を持つ組織管理者は、
[[**Organization Settings**] > [**Access Tokens**]][4] からすべての SAT を、パーソナルアクセストークンと併せて表示することもできます。

### トークンの取り消し{#revoke-a-token}

1. [[**Organization Settings**] > [**Service Accounts**]][3] に移動し、サービスアカウントをクリックします。
2. 詳細パネルで、トークンにカーソルを合わせ、[{{< ui >}}Revoke{{< /ui >}}] (取り消し) をクリックします。

または、[[**Organization Settings**] > [**Access Tokens**]][4] から SAT を取り消します。

取り消されたトークンでは、API 呼び出しを認証できなくなります。取り消しは数秒以内に有効になります。

### トークンの編集{#edit-a-token}

既存の SAT の名前とスコープを更新できます。有効期限は、作成後は変更
できません。有効期限を変更するには、トークンを取り消して新しいトークンを作成してください。

## 権限{#permissions}

| 権限 | 説明 |
|------------|-------------|
| `service_account_write` | 自分が管理するサービスアカウントの SAT を作成する |
| `org_app_keys_read` | 組織内のすべてのサービスアカウントの SAT を表示する |
| `org_app_keys_write` | 任意のサービスアカウントの SAT を作成、編集、取り消しする|

詳細については、[ロールベースのアクセス制御][5]を参照してください。

## Audit Trail{#audit-trail}

[Audit Trail][6] が有効な場合、SAT の作成、使用、取り消しのすべてのイベントが
記録されます。SAT で認証された各 API 呼び出しは、所有するサービスアカウントに帰属します。
これにより、管理者は、自動化された認証情報の使用状況を組織全体で可視化できます。

SAT のアクティビティを確認するには、[[**Security**] (セキュリティ) > [**Compliance**] (コンプライアンス) > [**Audit Trail**]][7] に移動し、
サービスアクセストークン認証方法でフィルタリングします。

## API リファレンス {#api-reference}

Datadog API を使用してプログラムで SAT を管理します。

| 操作 | エンドポイント |
|-----------|----------|
| SAT を一覧表示する | `GET /api/v2/service_accounts/<SERVICE_ACCOUNT_ID>/access_tokens` |
| SAT を作成する | `POST /api/v2/service_accounts/<SERVICE_ACCOUNT_ID>/access_tokens` |
| 特定の SAT を取得する | `GET /api/v2/service_accounts/<SERVICE_ACCOUNT_ID>/access_tokens/<TOKEN_ID>` |
| SAT を更新する | `PATCH /api/v2/service_accounts/<SERVICE_ACCOUNT_ID>/access_tokens/<TOKEN_ID>` |
| SAT を取り消す | `DELETE /api/v2/service_accounts/<SERVICE_ACCOUNT_ID>/access_tokens/<TOKEN_ID>` |

すべてのユーザーおよびサービスアカウントの PAT と SAT を一度の呼び出しで取得するには、統合された
エンドポイントを使用します。

```
GET /api/v2/personal_access_tokens
```

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/org_settings/service_accounts/
[2]: /ja/account_management/personal-access-tokens/
[3]: https://app.datadoghq.com/organization-settings/service-accounts
[4]: https://app.datadoghq.com/organization-settings/access-tokens
[5]: /ja/account_management/rbac/permissions/
[6]: /ja/account_management/audit_trail/
[7]: https://app.datadoghq.com/audit-trail
[8]: https://aws.amazon.com/about-aws/whats-new/2026/05/secrets-manager-managed-external-secrets-datadog-snowflake/