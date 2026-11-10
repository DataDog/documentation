---
description: 個々のユーザー資格情報を利用せずに、サービスアカウントの代わりに Datadog API 呼び出しを認証するサービスアクセストークンを作成および管理します。
further_reading:
- link: /account_management/org_settings/service_accounts/
  tag: ドキュメント
  text: サービスアカウント
- link: /account_management/personal-access-tokens/
  tag: ドキュメント
  text: 個人アクセストークン
- link: /account_management/workload_identity_federation/
  tag: ドキュメント
  text: ワークロードアイデンティティフェデレーション
- link: https://www.datadoghq.com/blog/datadog-api-authentication/
  tag: ブログ
  text: スコープ付き資格情報で Datadog API 認証を最新化する
title: サービスアクセストークン
---
## 概要{#overview}

SAT (サービスアカウントトークン) は、
[サービスアカウント][1]の代わりに Datadog API 呼び出しを認証する資格情報です。[PAT (個人アクセストークン)][2] とは違い、SAT は個々のユーザーではなく、サービスアカウントに属します。
そのため、チームメンバーが組織に参加したり、組織を離れたりした場合も常に有効です。

SAT を使用すると、以下のことが可能です。
- チームメンバーが組織を離れた後も引き続き有効な資格情報を使用して、自動化されたワークフローやスクリプトを認証します。
- 安定したインテグレーションのために、定期的なローテーションが不要な長寿命トークンを作成します。
- トークンのスコープをワークフローに必要な最小限の権限に設定します。
- 監査の説明責任を明確にするために、すべての API アクティビティの実行元である所有サービスアカウントが識別されます。

### SAT と他の資格情報タイプの比較 {#sats-compared-to-other-credential-types}

| | サービスアカウントトークン | 個人アクセストークン | アプリケーションキー |
|---|---|---|---|
| 所有者 | サービスアカウント | 個々のユーザー | 個々のユーザーまたはサービスアカウント |
| TTL (有効期間) | 任意: [1 day] (1 日)、[1 month] (1 か月)、[1 year] (1 年)、[Never] (有効期限なし)、または [Custom] (カスタム) | 必須: 1 日～ 1 年 | 有効期限なし |
| デフォルトでスコープが設定される | はい: スコープは必須 | はい: スコープは必須 | 任意: デフォルトではスコープは設定されない |
| スタンドアロン認証 | はい: API キーのペアリングは不要 | はい: API キーのペアリングは不要 | いいえ: API キーが必要 |
| 識別可能なプレフィックス | `ddsat_` | `ddpat_` | `ddapp_` (新規) |
| 表示場所 | [Service account details] (サービスアカウントの詳細)、[Organization Settings] (組織設定) > [Access Tokens] (アクセストークン) | [Personal Settings] (個人設定) > [Access Tokens]、[Organization Settings] > [Access Tokens] | [Personal Settings] > [Application Keys] (アプリケーションキー)、[Organization Settings] > [Application Keys] |

個人アクセストークンについては、「[個人アクセストークン][2]」を参照してください。

## 前提条件 {#prerequisites}

- Datadog サービスアカウント。作成方法については、「[サービスアカウント][1]」を参照してください。
- 管理するサービスアカウントの SAT を作成するための `service_account_write` 権限。
- 組織内の任意のサービスアカウントの SAT を管理するための `org_app_keys_write` 権限。

## サービスアカウントトークンを作成する {#create-a-service-access-token}

1. [[**Organization Settings**] > [**Service Accounts**] (サービスアカウント)][3] に移動し、サービスアカウントをクリックします。
2. 詳細パネルの [**Access Tokens**] で、[{{< ui >}}\+ New Token{{< /ui >}}] (+ 新規トークン) をクリックします。
3. [{{< ui >}}Name{{< /ui >}}] (名前) にトークンの名前を入力します。
4. [{{< ui >}}Expiration Date{{< /ui >}}] (有効期限) を選択します: [**1 day**]、[**1 month**]、[**1 year**]、[**Never**]、
   または [**Custom**]。トークンに有効期限を設定しない場合は、[**Never**] を選択します。
5. [{{< ui >}}Select Scopes{{< /ui >}}] (スコープを選択) をクリックして、トークンがアクセスできる対象を定義します。使用するワークフローに必要な
   権限のみを付与して、[{{< ui >}}Save{{< /ui >}}] (保存) をクリックします。

**注:** サービスアカウントごとに最大 500 個の SAT を作成できます。

<div class="alert alert-warning">Datadog では、トークンシークレットは作成時に一度のみ表示されます。
コピーして安全に保管してください。後から取得することはできません。</div>

保存すると、詳細パネルにトークンシークレット、名前、トークン ID、所有者、所有者のロール、
有効期限、およびスコープが表示されます。

有効期限の長い SAT を設定した場合、または [**Never**] を選択した場合は、シークレットを
AWS Secrets Manager、HashiCorp Vault、Azure Key Vault などのシークレットマネージャーに保存し、
ソースコードや環境ファイルには保存しないでください。AWS Secrets Manager は、[Datadog サービスアカウント
資格情報のマネージドローテーション][8]に対応しています。

## サービスアカウントトークンを使用する {#use-a-service-access-token}

SAT は 2 つの認証方法をサポートしています。

### Authorization ヘッダー (推奨) {#authorization-header-recommended}

`Authorization` ヘッダーに Bearer トークンとして SAT を渡します。この方法では、
API キーは必要ありません。

```bash
curl -X GET "{{< region-param key="dd_api" >}}/api/v2/users" \
  -H "Authorization: Bearer <YOUR_SAT>"
```

### アプリケーションキーヘッダー {#application-key-header}

`dd-application-key` ヘッダーで SAT を渡します。

```bash
curl -X GET "{{< region-param key="dd_api" >}}/api/v2/users" \
  -H "dd-application-key: <YOUR_SAT>"
```

**注:** `dd-application-key` ヘッダーで有効な SAT が提供されている場合、Datadog は
SAT のみを使用して認証を行います。`dd-api-key` ヘッダーはオプションであり、その値は評価されません。

## SAT で認証された API 呼び出しに対する制限 {#restrictions-on-sat-authenticated-api-calls}

権限昇格を防ぐため、Datadog は SAT で認証された API 呼び出しで実行できる操作を制限しています。これらの制限は、呼び出しを行う API クライアントに関係なく適用されます。

- **アプリケーションキー**: SAT はアプリケーションキーを作成または更新できません。アプリケーションキーの取り消しは許可されます。
- **新しいトークンのスコープ**: 新しいトークンのスコープがそれ自身のスコープに含まれている場合にのみ、SAT は別の SAT を作成または更新できます。
- **新しいトークンの TTL (有効期間)**: SAT は、それ自身の有効期限より長い TTL を持つ SAT を作成できません。

これらの制限のいずれかに違反する呼び出しを行うと、`403 Forbidden` 応答が返されます。

## サービスアカウントトークンを管理する {#manage-service-access-tokens}

### トークンを表示する {#view-tokens}

サービスアカウントのトークンは、
[[**Organization Settings**] > [**Service Accounts**]][3] の詳細パネルに表示されます。

{{< img src="account_management/service-access-tokens/sat-service-account-panel.png" alt="サービスアカウントの詳細パネル。[Access Tokens] セクションに 2 つのサービスアカウントトークンが表示されています。" style="width:80%;" >}}

`org_app_keys_read` 権限を持つ組織管理者は、
[[**Organization Settings**] > [**Access Tokens**]][4] で、個人アクセストークンと一緒にすべての SAT も表示できます。

### トークンを失効させる {#revoke-a-token}

1. [[**Organization Settings**] > [**Service Accounts**]][3] に移動し、サービスアカウントをクリックします。
2. 詳細パネルでトークンにカーソルを合わせ、[{{< ui >}}Revoke{{< /ui >}}] (取り消し) をクリックします。

または、[[**Organization Settings**] > [**Access Tokens**]][4] で SAT を失効させます。

失効したトークンは、API 呼び出しの認証を行えなくなります。取り消しは数秒以内に有効になります。

### トークンを編集する {#edit-a-token}

既存の SAT の名前とスコープを更新できます。有効期限を
作成後に変更することはできません。有効期限を変更するには、トークンを失効させて新しいトークンを作成します。

## 権限{#permissions}

| 権限 | 説明 |
|------------|-------------|
| `service_account_write` | 管理するサービスアカウントの SAT を作成する |
| `org_app_keys_read` | 組織内のすべてのサービスアカウントの SAT を表示する |
| `org_app_keys_write` | 任意のサービスアカウントの SAT を作成、編集、失効させる |

詳細については、「[ロールベースのアクセス制御][5]」を参照してください。

## Audit Trail {#audit-trail}

[Audit Trail][6] が有効な場合、SAT の作成、使用、取り消し
イベントがすべて記録されます。SAT で認証されたすべての API 呼び出しは、その実行元である所有サービスアカウントが識別されます。
そのため、管理者は組織全体での自動化された資格情報の使用状況を把握できます。

SAT アクティビティを確認するには、[[**Security**] (セキュリティ) > [**Compliance**] > [**Audit Trail**]][7] に移動し、
サービスアカウントトークン認証方法でフィルタリングします。

## API リファレンス {#api-reference}

Datadog API を使用して、プログラムにより SAT を管理できます。

| 操作 | エンドポイント |
|-----------|----------|
| SAT を一覧表示する | `GET /api/v2/service_accounts/<SERVICE_ACCOUNT_ID>/access_tokens` |
| SAT を作成する | `POST /api/v2/service_accounts/<SERVICE_ACCOUNT_ID>/access_tokens` |
| 特定の SAT を取得する | `GET /api/v2/service_accounts/<SERVICE_ACCOUNT_ID>/access_tokens/<TOKEN_ID>` |
| SAT を更新する | `PATCH /api/v2/service_accounts/<SERVICE_ACCOUNT_ID>/access_tokens/<TOKEN_ID>` |
| SAT を失効させる | `DELETE /api/v2/service_accounts/<SERVICE_ACCOUNT_ID>/access_tokens/<TOKEN_ID>` |

すべてのユーザーおよびサービスアカウントの PAT と SAT すべてを 1 回の呼び出しで取得するには、統合された
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