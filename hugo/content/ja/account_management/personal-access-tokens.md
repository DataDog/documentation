---
aliases:
- /ja/account_management/faq/personal-access-tokens/
description: API キーとアプリケーションキーをペアリングすることなく、Datadog API 呼び出しを認証するための有効期間が短く、スコープが設定されたパーソナルアクセストークンを作成し、管理します。
further_reading:
- link: https://www.datadoghq.com/blog/datadog-api-authentication/
  tag: ブログ
  text: スコープを設定した認証情報による Datadog API 認証のモダナイズ
title: パーソナルアクセストークン
---
## 概要 {#overview}

パーソナルアクセストークン (PAT) は、Datadog API 呼び出しの認証に使用されるタイプの認証情報です。アプリケーションキーとは異なり、PAT を API キーとペアリングする必要はありません。PAT はデフォルトで短い有効期間とスコープが設定されるため、各トークンがアクセスできる範囲と有効期間をより厳密に制御できます。

PAT を使用すると、次のことが可能になります。
- 単一の認証情報で複数の API 呼び出しを認証する。
- 最小権限の原則を適用するために、ワークフローに必要なスコープのみを選択する。
- 必須の有効期間 (TTL) 値により、認証情報が漏洩した場合の被害の範囲を制限する。期限切れのトークンは自動的に取り消されるため、無効な認証情報がいつまでも存続することはありません。
- テレメトリ送信 (Agent、ログ、メトリクス) には API キーを確保し、その他すべての Web API 呼び出しには PAT を使用することで、懸念事項を分離する。

### 他の認証情報タイプとの PAT の比較 {#pats-compared-to-other-credential-types}

| | パーソナルアクセストークン | サービスアクセストークン | アプリケーションキー |
|---|---|---|---|
| スタンドアロン認証 | 可能。API キーのペアリングは不要です | 可能。API キーのペアリングは不要です | 不可。API キーが必要です |
| デフォルトでのスコープ設定 | 可能。スコープは必須です | 可能。スコープは必須です | オプション。デフォルトではスコープは設定されません |
| 有効期間 (TTL) | 必須 (24 時間から 1 年) | オプション。長期使用が可能 | 有効期限なし |
| 識別可能なプレフィックス | `ddpat_` | `ddsat_` | `ddapp_` 新規 |
| リンク先 | ユーザー | サービスアカウント | 個々のユーザーまたはサービスアカウント |

サービスアクセストークンについては、[サービスアクセストークン][7] を参照してください。

## 前提条件 {#prerequisites}

- `user_app_keys` 権限が付与された Datadog ユーザーアカウント
- `org_app_keys_write` 権限 (組織内の他のユーザーの PAT を管理する場合)

## パーソナルアクセストークンを作成する {#create-a-personal-access-token}

1. [**[Personal Settings] (パーソナル設定)** > **[Access Tokens] (アクセストークン)**][1] に移動します。
2. {{< ui >}}+ New Access Token{{< /ui >}} をクリックします。
3. {{< ui >}}Name{{< /ui >}}にトークンの名前を入力します。
4. {{< ui >}}Expiration Date{{< /ui >}} を選択します。最小有効期限は 24 時間、最大有効期限は作成から 1 年です。
5. {{< ui >}}Select Scopes{{< /ui >}} をクリックして、このトークンがアクセス可能な対象を定義するスコープを選択します。少なくとも 1 つのスコープが必要です。ワークフローに必要な権限のみを付与してから、{{< ui >}}Save{{< /ui >}} をクリックします。

<div class="alert alert-warning">Datadog は、トークンシークレットを作成時に一度だけ表示します。コピーして安全に保管してください。トークンシークレットを後から取得することはできません。</div>

## パーソナルアクセストークンを使用する {#use-a-personal-access-token}

PAT は 2 つの認証方法をサポートしています。

### 認証ヘッダー (推奨) {#authorization-header-recommended}

PAT を `Authorization` ヘッダーの Bearer トークンとして渡します。この方法では、API キーは必要になりません。

```bash
curl -X GET "https://api.datadoghq.com/api/v2/users" \
  -H "Authorization: Bearer <YOUR_PAT>"
```

### アプリケーションキーヘッダー {#application-key-header}

PAT を `dd-application-key` ヘッダーに含めて渡します。この方法は、すでにアプリケーションキーヘッダー形式を使用している既存の統合を移行する場合に便利です。

```bash
curl -X GET "https://api.datadoghq.com/api/v2/users" \
  -H "dd-application-key: <YOUR_PAT>"
```

**注:** 有効な PAT が `dd-application-key` ヘッダーで渡されると、Datadog は PAT のみを使用して認証を行います。`dd-api-key` ヘッダーはオプションであり、その値は評価されません。

## PAT で認証された API 呼び出しに関する制限{#restrictions-on-pat-authenticated-api-calls}

権限昇格を防ぐため、Datadog では PAT で認証された API 呼び出しで実行できる操作を制限しています。これらの制限は、どの API クライアントが呼び出しを行うかに関係なく適用されます。

- **アプリケーションキー**: PAT でアプリケーションキーを作成または更新することはできません。アプリケーションキーの取り消しは可能です。
- **新しいトークンのスコープ**: PAT では、新しいトークンのスコープが自身のスコープのサブセットである場合にのみ PAT/SAT を作成または更新できます。
- **新しいトークンの有効期間 (TTL)**: PAT は、自身の有効期限を超える TTL を持つ PAT または SAT を作成することはできません。

呼び出しがこれらの制限のいずれかに違反している場合、`403 Forbidden` レスポンスが返されます。

## パーソナルアクセストークンの管理 {#manage-personal-access-tokens}

### トークンを表示する {#view-your-tokens}

[**[Personal Settings] (パーソナル設定)** > **[Access Tokens] (アクセストークン)**][1] に移動して、アカウントに関連付けられているすべての PAT と、それぞれの名前、スコープ、有効期限、最終使用に関する情報を確認します。

トークンを作成すると、詳細パネルにトークンシークレット、名前、トークン ID、所有者、スコープ、有効期限が表示されます。このパネルで、トークンの編集や取り消しを行うこともできます。

{{< img src="account_management/personal-access-tokens/pat-details.png" alt="トークンシークレット、名前、トークン ID、所有者、スコープ、有効期限を表示するパーソナルアクセストークンの詳細パネル" style="width:60%;" >}}

### 管理者としてトークンを管理する {#manage-tokens-as-an-administrator}

`org_app_keys_read` 権限と `org_app_keys_write` 権限を持つ組織管理者は、[**[Organization Settings] (組織設定)** > **[Access Tokens] (アクセストークン)**][2] で組織内のすべてのユーザーの PAT を表示し、管理できます。

{{< img src="account_management/personal-access-tokens/pat-admin.png" alt="組織管理者は、[Organization Settings] ですべての PAT を表示および管理できます。" style="width:80%;" >}}


### トークンを取り消す {#revoke-a-token}

1. [**[Personal Settings]** > **[Access Tokens]**][1] に移動します。または、管理者の場合は [**[Organization Settings]** > **[Access Tokens]**][2] に移動します。
2. 取り消すトークンにマウスポインターを合わせて、{{< ui >}}Revoke Token{{< /ui >}} アイコンをクリックします。

取り消されたトークンでは、API 呼び出しを認証できなくなります。取り消しは数秒以内に有効になります。

### トークンを編集する {#edit-a-token}

既存の PAT の名前とスコープを更新できます。作成後に TTL を変更することはできません。TTL を変更するには、既存のトークンを取り消し、目的の構成を設定した新しいトークンを作成してください。

## トークンの形式 {#token-format}

PAT は、シークレットスキャンとキー管理をサポートする、識別可能な形式を使用します。

```
ddpat_<ALIAS>_<SECRET><CHECKSUM>
```

| コンポーネント | 説明 |
|-----------|-------------|
| `ddpat_` | 認証情報をパーソナルアクセストークンとして識別するプレフィックス |
| `<ALIAS>` | トークンの UUID から導出され、Base62 でエンコードされたトークン識別子 |
| `<SECRET>` | ランダムに生成された 32 バイトのシークレット |
| `<CHECKSUM>` | GitHub チェックサム標準に従った CRC32 チェックサム |

識別可能なプレフィックスとチェックサムにより、GitHub シークレットスキャン、Sensitive Data Scanner、GitGuardian などのシークレットスキャンサービスによる自動検出が可能になります。

## 権限 {#permissions}

PAT は、アプリケーションキーと同じ権限を使用します。

| 権限 | 説明 |
|------------|-------------|
| `user_app_keys` | 独自の PAT を作成し、管理する権限 |
| `org_app_keys_read` | 組織内の全ユーザーの PAT を表示する権限 |
| `org_app_keys_write` | 組織内の任意のユーザーの PAT を作成、編集、取り消す権限 |

権限の詳細については、[ロールベースのアクセス制御][3] を参照してください。

## Audit Trail {#audit-trail}

組織で [Audit Trail][4] が有効になっている場合、Audit Trail にすべての PAT の作成、使用、および取り消しイベントが記録されます。Audit Trail は、PAT を使用して行われた各 API 呼び出しの認証方法とトークンのメタデータをキャプチャし、管理者が組織全体の認証情報の使用状況を把握できるようにします。

PAT のアクティビティを確認するには、[**[Security]** > **[Compliance]** > **[Audit Trail]**][5] に移動し、パーソナルアクセストークン認証方法でフィルタリングします。

## API リファレンス {#api-reference}

Datadog API を使用してプログラムによって PAT を管理します。

| 操作 | エンドポイント |
|-----------|----------|
| PAT および SAT の一覧表示 | `GET /api/v2/personal_access_tokens` |
| PAT の作成 | `POST /api/v2/personal_access_tokens` |
| 特定の PAT の取得 | `GET /api/v2/personal_access_tokens/<PAT_ID>` |
| PAT の更新 | `PATCH /api/v2/personal_access_tokens/<PAT_ID>` |
| PAT の取り消し | `DELETE /api/v2/personal_access_tokens/<PAT_ID>` |

`GET /api/v2/personal_access_tokens` エンドポイントは、1 回の呼び出しで PAT と SAT の両方を返します。
SAT を管理するには、[サービスアクセストークン][7] を参照してください。

API リファレンスの詳細については、[キー管理][6] を参照してください。

## キー伝播の遅延 {#key-propagation-delay}

PAT は結果整合性モデルに従います。作成または取り消し後、変更がすべての Datadog システムに伝播されるまでに数秒かかる場合があります。重要なワークフローでは、作成直後のトークンを使用しないでください。伝播期間中に発生する一時的なエラーに対処するため、短い指数バックオフを用いた再試行戦略を実装してください。

[1]: https://app.datadoghq.com/personal-settings/access-tokens
[2]: https://app.datadoghq.com/organization-settings/access-tokens
[3]: /ja/account_management/rbac/permissions/
[4]: /ja/account_management/audit_trail/
[5]: https://app.datadoghq.com/audit-trail
[6]: /ja/api/latest/key-management/
[7]: /ja/account_management/service-access-tokens/

## 参考文献 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}