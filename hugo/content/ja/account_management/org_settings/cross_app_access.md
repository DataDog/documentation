---
algolia:
  tags:
  - cross-app access
  - XAA
  - Okta
  - AI agent
  - MCP
  - ID-JAG
description: Okta の Cross-App Access を構成し、Okta で承認されたユーザーに代わって AI Agent が Datadog
  API を呼び出せるようにします。
further_reading:
- link: /mcp_server/setup/
  tag: ドキュメント
  text: Datadog MCP Server のセットアップ
- link: /account_management/org_settings/mobile_third_party_access/
  tag: ドキュメント
  text: モバイルおよびサードパーティアクセス
- link: /account_management/saml/
  tag: ドキュメント
  text: SAML シングルサインオンの構成
title: Cross-App Access
---
{{< callout url="#" btn_hidden="true" header="false">}}
  Cross-App Access はプレビュー版です。Okta がプレビュー版へのアクセスを制御し、テナントに対して有効にします。また、このセットアップが依存する Okta の機能は、まだ一般提供されていません。現在、どの Datadog 組織でも Datadog 側で Cross-App Access を有効にできます。
{{< /callout >}}

## 概要 {#overview}

Cross-App Access (XAA) を使用すると、組織が Okta ですでに承認したユーザーに代わって、AI エージェントが Datadog API を呼び出せるようになります。これがない場合、すべてのユーザーがブラウザの同意画面を通じて個別にエージェントを承認する必要があります。これを使用すると、Okta 管理者がそのアクセス権を一元的に一度付与するだけで、ユーザーはユーザーごとの同意ステップをスキップできます。

Okta は、ID-JAG (Identity Assertion JWT Authorization Grant) と呼ばれる短期間有効なトークンをエージェントに発行します。エージェントはこのトークンを Datadog に提示し、Datadog はそれを呼び出しを開始したユーザーが所有するアクセストークンと交換します。Okta がトークンを発行するため、管理者は Okta から AI エージェントの Datadog アクセス権を付与および取り消しできます。

プレビュー版の Cross-App Access では、ID プロバイダーとして Okta のみ、エージェントとして Claude のみがサポートされています。

## 交換する値 {#values-you-exchange}

セットアップにより、Datadog と Okta の間で双方向に値が移動します。そのうち 2 つは異なるシステムを指定する発行者 URL ですので、それぞれ正しい場所に入力したことを確認してください。

| 値                               | 方向       | 入力場所                                                                        |
| ----------------------------------- | --------------- | ----------------------------------------------------------------------------------------- |
| Datadog 組織 UUID           | Datadog から Okta へ | Okta の Datadog アプリケーション: {{< ui >}}Resource Server{{< /ui >}} タブ > {{< ui >}}Audience/tenant ID{{< /ui >}}              |
| Agent クライアント ID                     | Datadog から Okta へ | Okta AI Agent: {{< ui >}}Resource Connection{{< /ui >}} > {{< ui >}}Client ID at resource{{< /ui >}}                         |
| Datadog リソース URL および発行者 URL | Datadog から Oktaへ | Okta の Datadog アプリケーション: {{< ui >}}Resource Server{{< /ui >}} タブ > {{< ui >}}Resource URL{{< /ui >}} および {{< ui >}}Issuer URL{{< /ui >}} |
| Okta テナント発行者 URL              | Okta から Datadog へ | Datadog: {{< ui >}}Organization Settings > Cross-App Access{{< /ui >}}, {{< ui >}}Issuer URL{{< /ui >}}                      |

## 前提条件{#prerequisites}

- 組織で SAML シングルサインオンを使用して Datadog にログインしていること。Cross-App Access は既存の SAML コネクションを通じてユーザーを解決するため、SAML コネクションがないと機能しません。[SAML シングルサインオンの構成](/account_management/saml/)を参照してください。
- Claude を使用する各ユーザーは、Datadog 組織内に存在し、Okta の Claude アプリケーションと Datadog アプリケーションの両方に割り当てられている必要があります。
- Datadog で `org_management` 権限を持っている必要があります。UI ではなく API を通じて Cross-App Access を構成するには、例の中で `DD_TOKEN` として使用される [パーソナルアクセストークン](/account_management/personal-access-tokens/) (PAT) も必要です。
- Okta テナントで {{< ui >}}AI Agent Identity Assertion{{< /ui >}} および {{< ui >}}Agent to Agent Connections{{< /ui >}} の Early Access 機能が有効になっており、Okta スーパー管理者アクセス権を持っている必要があります。

## Datadog で Cross-App Access を構成する{#configure-cross-app-access-in-datadog}

Okta の手順の前に、Datadog の手順を完了してください。Datadog は Cross-App Access を有効にしていない組織のトークンを拒否するため、先に Okta を構成すると、ここで作業を完了するまでエラーが発生します。

[{{< ui >}}Organization Settings > Cross-App Access{{< /ui >}}](https://app.datadoghq.com/organization-settings/cross-app-access) に移動します。

{{< img src="account_management/cross_app_access/cross-app-access-settings.png" alt="組織設定の Cross-App Access ページ。有効化ステータス、発行者 URL フィールド、組織 UUID、および登録済みクライアント ID テーブルが表示されています。" style="width:100%;">}}

### Cross-App Access を有効にする{#enable-cross-app-access}

{{< ui >}}Enable{{< /ui >}} をクリックします。これは組織全体に適用されます。{{< ui >}}Disable{{< /ui >}} をクリックして、後で Cross-App Access をオフにします。

### Okta 発行者 URL を設定する{#set-your-okta-issuer-url}

{{< ui >}}Issuer URL{{< /ui >}}フィールドに、独自の Okta テナントの発行者 URL を入力し、{{< ui >}}Save{{< /ui >}}をクリックします。Datadog はこの値からトークン署名キーの場所を導出するため、正確である必要があります。

発行者 URL は以下のすべてを満たしている必要があります。満たしていない場合、Datadog はそれを拒否します。

- `https` を使用してください。
- `.okta.com`、`.oktapreview.com`、または `.okta-emea.com` のサブドメインを使用してください。Datadog は Apex ドメインを拒否するため、`example.okta.com` は機能しますが、`okta.com` は機能しません。

{{< ui >}}Remove{{< /ui >}} をクリックして、発行者の設定を解除します。削除すると、Datadog はトークンの受け入れを停止します。

### 組織の UUID をコピーする{#copy-your-organization-uuid}

{{< ui >}}Org UUID{{< /ui >}} フィールドの値をコピーします。Okta はこの値を `aud_tenant` クレームとして送信します。これは、複数の組織が 1 つの Okta テナントを共有している場合に、トークンがどの組織を対象としているかを Datadog に伝えます。これは、Okta が他の場所で要求する会社 ID とは異なります。

### Agent クライアント ID をコピーする{#copy-the-agent-client-id}

{{< ui >}}Registered client IDs{{< /ui >}}テーブルには、Datadog が Cross-App Access 用にサポートするすべての Agent と、それぞれが使用する OAuth クライアント ID が一覧表示されています。設定している Agent のクライアント ID をコピーします。これを Okta に {{< ui >}}Client ID at resource{{< /ui >}} として入力します。

Datadog はサポート対象の Agent をこのテーブルに追加していくため、他のソースのクライアント ID を再利用せず、必ずこのテーブルを確認してください。

{{< ui >}}Manage app{{< /ui >}} をクリックすると、その Agent のスコープ設定が開きます。[Datadog でのスコープの制御](#control-scopes-in-datadog)を参照してください。

{{% collapse-content title="オプション: API を使用して構成する" level="h3" expanded=false %}}

これらの呼び出しを使用して、セットアップをスクリプト化します。これらは {{< ui >}}Enable{{< /ui >}} ボタンおよび {{< ui >}}Issuer URL{{< /ui >}} フィールドと同じ動作をします。どちらも `org_management` 権限を持つ PAT が必要です。

`mcp_cross_app_access_enabled` 組織設定を `true` に設定して、Cross-App Access を有効にします。後で無効にするには、`"value": false` を指定して同じリクエストを送信してください。

```shell
curl -X PATCH "{{< region-param key="dd_api" >}}/api/v2/org_configs/mcp_cross_app_access_enabled" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${DD_TOKEN}" \
  -d '{
    "data": {
      "type": "org_configs",
      "attributes": {
        "value": true
      }
    }
  }'
```

Okta 発行者 URL を設定します。同じ検証ルールが適用され、ルールに違反する値を指定すると `400` が返されます。空の文字列を送信すると、発行者の設定が解除されます。

```shell
curl -X PUT "{{< region-param key="dd_api" >}}/api/v2/login/org_configs/mcp_cross_app_access_issuer_url" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${DD_TOKEN}" \
  -d '{
    "data": {
      "type": "org_config",
      "attributes": {
        "issuer_url": "https://<YOUR_OKTA_SUBDOMAIN>.okta.com"
      }
    }
  }'
```

API から組織の UUID を読み取るには、以下を呼び出します。{{< region-param key="dd_api" >}}[/api/v2/current_user](https://app.datadoghq.com/api/v2/current_user) を、対象組織のアクティブなセッションで実行してください。UUID は `included` 配列内の `orgs` エントリの `id` です。

{{% /collapse-content %}}

## Okta でのセットアップを完了する{#finish-the-setup-in-okta}

スーパー管理者として Okta Admin Console でセットアップを完了してください。このセクションでは、Datadog が想定する値と、それに対応する Okta のフィールドを一覧表示します。詳細については、[Okta の Cross-App Access に関するドキュメント](https://help.okta.com/oie/en-us/content/topics/apps/apps-cross-app-access.htm)を参照してください。

### Datadog アプリケーションをリソースサーバーとして構成する{#configure-the-datadog-application-as-a-resource-server}

Datadog アプリケーションで、{{< ui >}}Resource Server{{< /ui >}} タブを開き、{{< ui >}}Cross-app access (XAA){{< /ui >}} を有効にします。以下のフィールドを設定します。

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
<p>以下の値は、選択した <a href="/getting_started/site/">Datadog サイト</a>と一致します ({{< region-param key="dd_site_name" >}})。別のサイトの値を確認するには、このページの右側にある {{< ui >}}Datadog Site{{< /ui >}} セレクターを使用してください。</p>
<table>
<thead><tr><th>Okta フィールド</th><th>値</th></tr></thead>
<tbody>
<tr><td>{{< ui >}}Resource URL{{< /ui >}}</td><td>{{< region-param key="mcp_xaa_resource_url" code="true" >}}</td></tr>
<tr><td>{{< ui >}}Issuer URL{{< /ui >}}</td><td>{{< region-param key="mcp_xaa_issuer_url" code="true" >}}</td></tr>
<tr><td>{{< ui >}}Audience/tenant ID{{< /ui >}}</td><td>Datadog 組織の UUID</td></tr>
</tbody>
</table>
{{< /site-region >}}

発行者 URL は、トークンエンドポイントではなく、Datadog 認証サーバーを識別します。Okta はそれを発行するトークンの `aud` クレームに書き込み、Datadog はそのクレームが一致する場合にのみトークンを受け入れます。

**注**: 後で発行者 URL を変更するには、[Claude を Datadog アプリケーションに接続する](#connect-claude-to-the-datadog-application)で説明されているリソースコネクションを削除して再作成する必要があります。

### Claude を AI Agent として登録する{#register-claude-as-an-ai-agent}

Okta で Claude の AI Agent エントリを作成し、Anthropic とキーを交換してください。Anthropic が Okta で受信するリクエストに署名するため、Okta はトークンを発行する前に Anthropic の公開キーを必要とします。

1. Claude の AI Agent エントリを作成します。
2. Agent に所有者を割り当てます。Okta では、有効化する前に所有者が必要です。
3. Okta が生成した AI Agent ID を Anthropic に送信します。
4. Anthropic から返された公開キーを、{{< ui >}}Credentials{{< /ui >}}タブの AI Agent エントリに追加します。

公開キーが設定されるまで、他のすべての値が正しくてもトークン交換は失敗します。この交換は手動で行うため、早めに開始してください。

### Claude を Datadog アプリケーションに接続する{#connect-claude-to-the-datadog-application}

Claude AI Agent で、Claude SAML アプリケーションを委任された呼び出し元として追加し、Agent を Datadog アプリケーションに接続します。

1. {{< ui >}}Delegations{{< /ui >}} タブで、Claude SAML アプリケーションを呼び出し元として追加します。
2. {{< ui >}}Resource connections{{< /ui >}} タブで、リソースコネクションを追加します。リソースタイプとして {{< ui >}}Application{{< /ui >}} を選択し、Datadog アプリケーションを選択します。
3. 以下のフィールドを設定します。

   | Okta フィールド                | 値                                                                                                |
   | ------------------------- | ---------------------------------------------------------------------------------------------------- |
   | {{< ui >}}Client ID at resource{{< /ui >}} | からコピーした Claude クライアント ID[{{< ui >}}Registered client IDs{{< /ui >}}](#copy-the-agent-client-id)          |
   | {{< ui >}}Scope Condition{{< /ui >}}| {{< ui >}}Allow all{{< /ui >}}、サポートされている唯一の値。[Datadog でのスコープの制御](#control-scopes-in-datadog) |を参照してください。

4. {{< ui >}}Actions{{< /ui >}} メニューから Agent を有効にします。

## Datadog でのスコープの制御{#control-scopes-in-datadog}

{{< ui >}}Allow all{{< /ui >}} は、クロスアプリアクセスでサポートされている唯一の {{< ui >}}Scope Condition{{< /ui >}} です。Okta で設定し、Claude が Datadog からアクセスできる範囲を制限します。

Okta はスコープをフィルタリングしません。{{< ui >}}Allow all{{< /ui >}} を使用すると、Okta は Claude が要求したものをすべてトークンにコピーするため、Datadog が強制ポイントとなります。

<div class="alert alert-warning">Okta にスコープのリストを入力しないでください。Okta はリスト外のスコープを含むトークン要求を拒否するため、統合はエラーで失敗し、より狭いアクセスにフォールバックすることはありません。</div>

Claude に許可されるスコープを設定するには、

1.  [{{< ui >}}Organization Settings > Mobile and Third-Party Access{{< /ui >}}](https://app.datadoghq.com/organization-settings/mobile-third-party-access) に移動します。Cross-App Access ページの {{< ui >}}Registered client IDs{{< /ui >}} テーブルで、Claude の横にある {{< ui >}}Manage app{{< /ui >}} をクリックすることもできます。
2. Claude アプリケーションを選択し、{{< ui >}}Scopes{{< /ui >}} タブを選択します。
3. {{< ui >}}Allowed{{< /ui >}} チェックボックスを使用して、各スコープに対する Claude のアクセス範囲を制御します。
4. 保存するには {{< ui >}}Enable{{< /ui >}} をクリックします。

スコープの追加や削除は組織内のすべてのユーザーに影響し、スコープを削除すると、そのスコープに依存する既存の承認が取り消されます。[アプリケーションスコープの管理](/account_management/org_settings/mobile_third_party_access/#application-scope-management)を参照してください。

Datadog で許可されていないスコープは、トークンが何を要求しても付与されることはありません。

## Claude に Datadog をコネクタとして追加します{#add-datadog-as-a-connector-in-claude}

1. Claude で、任意のプロンプトの下部にある {{< ui >}}+{{< /ui >}} アイコンをクリックし、{{< ui >}}Add Connector{{< /ui >}} をクリックします。
2. ディレクトリで **Datadog** を見つけ、コネクタを有効にします。
3. プロンプトが表示されたら、サインインフローを完了します。

カスタムコネクタではなく、ディレクトリから Datadog コネクタを使用してください。

## 構成を確認する{#verify-the-configuration}

両方の Okta アプリケーションに割り当てられたユーザーとして Claude にサインインし、Datadog を呼び出すリクエストを実行します。呼び出しが成功すれば、Okta がトークンを発行し、Datadog がそれを受け入れ、Datadog がユーザーを解決するという完全なパスが確認されます。

Cross-App Access を有効にする前にユーザーがサインインしていた場合は、そのユーザーに Claude からサインアウトさせ、Okta 経由で再度サインインさせてください。以前に確立されたセッションには、Agent が必要とする ID トークンが含まれていません。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}