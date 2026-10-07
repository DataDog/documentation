---
algolia:
  tags:
  - cross-app access
  - XAA
  - Okta
  - AI agent
  - MCP
  - ID-JAG
description: Okta Cross-App Access を構成して、Okta で承認されたユーザーに代わって AI エージェントが Datadog API
  を呼び出せるようにします。
further_reading:
- link: /mcp_server/setup/
  tag: ドキュメント
  text: Datadog MCP サーバーを設定する
- link: /account_management/org_settings/mobile_third_party_access/
  tag: ドキュメント
  text: モバイルおよびサードパーティアクセス
- link: /account_management/saml/
  tag: ドキュメント
  text: SAML シングルサインオンを構成する
title: Cross-App Access
---
## 概要 {#overview}

Cross-App Access (XAA) を使用すると、組織がすでに Okta で承認したユーザーに代わって AI エージェントが Datadog API を呼び出すことができます。これがない場合、すべてのユーザーがブラウザの同意画面を通じて個別にエージェントを承認する必要があります。これを使用すると、Okta 管理者がそのアクセス権を一元的に一度付与するだけで済み、ユーザーはユーザーごとの同意ステップをスキップできます。

Okta は、ID-JAG (Identity Assertion JWT Authorization Grant) と呼ばれる短期間のトークンをエージェントに発行します。エージェントはこのトークンを Datadog に提示し、Datadog はそれを、呼び出しを開始したユーザーが所有するアクセストークンと交換します。Okta がトークンを発行するため、管理者は Okta から、AI エージェントの Datadog アクセス権の付与/取り消しを行います。

プレビュー版の Cross-App Access でサポートされるのは、ID プロバイダーは Okta のみ、エージェントは Claude のみです。

## 交換する値 {#values-you-exchange}

セットアップでは、Datadog と Okta の間で双方向に値が移動されます。そのうち 2 つは、異なるシステムを指定する発行者 URL であるため、それぞれを正しい場所に入力したことを確認してください。

| 値                               | 方向       | 入力場所                                                                        |
| ----------------------------------- | --------------- | ----------------------------------------------------------------------------------------- |
| Datadog 組織の UUID           | Datadog から Okta へ | Okta の Datadog アプリケーション: [{{< ui >}}Resource Server{{< /ui >}}] (リソースサーバー) タブ > [{{< ui >}}Audience/tenant ID{{< /ui >}}] (オーディエンス/テナント ID)              |
| エージェントのクライアント ID                     | Datadog から Okta へ | Okta AI Agent: [{{< ui >}}Resource Connection{{< /ui >}}] (リソースコネクション) > [{{< ui >}}Client ID at resource{{< /ui >}}] (リソースのクライアント ID)                         |
| Datadog リソース URL および発行者 URL | Datadog から Okta へ | Okta の Datadog アプリケーション: [{{< ui >}}Resource Server{{< /ui >}}] タブ > [{{< ui >}}Resource URL{{< /ui >}}] (リソース URL) および [{{< ui >}}Issuer URL{{< /ui >}}] (発行者 URL) |
| Okta テナント発行者 URL              | Okta から Datadog へ | Datadog: {{< ui >}}Organization Settings > Cross-App Access{{< /ui >}}、[{{< ui >}}Issuer URL{{< /ui >}}]                      |

## 前提条件 {#prerequisites}

- 組織で Datadog への SAML シングルサインオンに Okta を使用している。Cross-App Access は既存の SAML コネクションを通じてユーザーを解決するため、SAML コネクションがないと機能しません。[SAML シングルサインオンを構成する](/account_management/saml/)を参照してください。
- Claude を使用する各ユーザーが Datadog 組織に存在し、Okta で Claude アプリケーションと Datadog アプリケーションの両方に割り当てられている。
- Datadog で `org_management` 権限を持っている。UI ではなく API を通じて Cross-App Access を構成するには、例で `DD_TOKEN` として使用される[個人用アクセストークン](/account_management/personal-access-tokens/) (PAT) も必要です。
- Okta テナントで {{< ui >}}AI Agent Identity Assertion{{< /ui >}} および {{< ui >}}Agent to Agent Connections{{< /ui >}} の機能が有効になっており、Okta Super Administrator アクセス権を持っている。

## Datadog で Cross-App Access を構成する {#configure-cross-app-access-in-datadog}

Okta の手順の前に、Datadog の手順を完了してください。Datadog は、Cross-App Access を有効にしていない組織のトークンを拒否するため、先に Okta を構成すると、この手順を完了するまでエラーが発生します。

[{{< ui >}}Organization Settings > Cross-App Access{{< /ui >}}](https://app.datadoghq.com/organization-settings/cross-app-access) に移動します。

{{< img src="account_management/cross_app_access/cross-app-access-settings.png" alt="有効のステータス、[Issuer URL] フィールド、[Org UUID] (組織の UUID)、および [Registered client IDs] (登録済みクライアント ID) テーブルが表示されている、[Organization Settings] (組織設定) の [Cross-App Access] ページ" style="width:100%;">}}

### Cross-App Access を有効にする {#enable-cross-app-access}

[{{< ui >}}Enable{{< /ui >}}] (有効化) をクリックします。これは組織全体に適用されます。後で Cross-App Access を無効にするには、[{{< ui >}}Disable{{< /ui >}}] (無効化) をクリックします。

### Okta 発行者 URL を設定する {#set-your-okta-issuer-url}

{{< ui >}}Issuer URL{{< /ui >}} フィールドに、Okta テナントの発行者 URL を入力し、[{{< ui >}}Save{{< /ui >}}] (保存) をクリックします。Datadog はこの値からトークン署名キーの場所を導出するため、正確である必要があります。

発行者 URL は以下のすべてを満たしている必要があります。満たしていない場合、Datadog で拒否されます。

- `https` を使用する。
- `.okta.com`、`.oktapreview.com`、または `.okta-emea.com` のサブドメインを使用する。Datadog は Apex ドメインを拒否するため、`example.okta.com` は使用できますが、`okta.com` は使用できません。

発行者の設定を解除するには [{{< ui >}}Remove{{< /ui >}}] (削除) をクリックします。トークンを削除すると、Datadog はその受け入れを停止します。

### 組織の UUID をコピーする {#copy-your-organization-uuid}

[{{< ui >}}Org UUID{{< /ui >}}] フィールドの値をコピーします。Okta はこの値を `aud_tenant` クレームとして送信します。これは、複数の組織が 1 つの Okta テナントを共有している場合に、トークンがどの組織を対象としているかを Datadog に伝えます。Okta が他の場所で要求する会社 ID とは異なります。

### エージェントのクライアント ID をコピーする {#copy-the-agent-client-id}

[{{< ui >}}Registered client IDs{{< /ui >}}] テーブルには、Datadog が Cross-App Access 用にサポートしているすべてのエージェントと、それぞれが使用する OAuth クライアント ID が記載されています。設定するエージェントのクライアント ID をコピーします。それを後に Okta で [{{< ui >}}Client ID at resource{{< /ui >}}] として入力します。

Datadog はサポート対象のエージェントをこのテーブルに追加していくため、他のソースのクライアント ID を再利用せずにこのテーブルを確認してください。

特定の行の [{{< ui >}}Manage app{{< /ui >}}] (アプリを管理) をクリックすると、そのエージェントのスコープ設定が開きます。[Datadog でスコープを制御する](#control-scopes-in-datadog)を参照してください。

{{% collapse-content title="オプション: API を使用して構成する" level="h3" expanded=false %}}

これらの呼び出しを使用して、セットアップをスクリプト化します。これらは、[{{< ui >}}Enable{{< /ui >}}] ボタンおよび [{{< ui >}}Issuer URL{{< /ui >}}] フィールドと同じ処理を行います。どちらも、`org_management` 権限を持つ PAT が必要です。

`mcp_cross_app_access_enabled` 組織構成を `true` に設定して、Cross-App Access を有効にします。後でオフにするには、`"value": false` を指定して同じリクエストを送信します。

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

Okta 発行者 URL を設定します。同じ検証ルールが適用され、ルールに違反する値は `400` を返します。空の文字列を送信すると、発行者の設定が解除されます。

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

API から組織の UUID を読み取るには、ターゲット組織のアクティブなセッションを使用して [{{< region-param key="dd_api" >}}/api/v2/current_user](https://app.datadoghq.com/api/v2/current_user) を呼び出します。UUID は、`included` 配列内の `orgs` エントリの `id` です。

{{% /collapse-content %}}

## Okta でのセットアップを完了する{#finish-the-setup-in-okta}

Okta Admin Console で Super Administrator としてセットアップを完了します。このセクションでは、Datadog が想定する値と、それに対応する Okta のフィールドを一覧表示します。詳細については、[Okta の Cross-App Access に関するドキュメント](https://help.okta.com/oie/en-us/content/topics/apps/apps-cross-app-access.htm)を参照してください。

### Datadog アプリケーションをリソースサーバーとして構成する{#configure-the-datadog-application-as-a-resource-server}

Datadog アプリケーションで [{{< ui >}}Resource Server{{< /ui >}}] タブを開き、[{{< ui >}}Cross-app access (XAA){{< /ui >}}] を有効にします。以下のフィールドを設定します。

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
<p>以下の値は、選択した <a href="/getting_started/site/">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) と一致します。別のサイトの値を確認するには、このページの右側にある [{{< ui >}}Datadog Site{{< /ui >}}] セレクターを使用してください。</p>
<table>
<thead><tr><th>Okta フィールド</th><th>値</th></tr></thead>
<tbody>
<tr><td>{{< ui >}}Resource URL{{< /ui >}}</td><td>{{< region-param key="mcp_xaa_resource_url" code="true" >}}</td></tr>
<tr><td>{{< ui >}}Issuer URL{{< /ui >}}</td><td>{{< region-param key="mcp_xaa_issuer_url" code="true" >}}</td></tr>
<tr><td>{{< ui >}}Audience/tenant ID{{< /ui >}}</td><td>Datadog 組織の UUID</td></tr>
</tbody>
</table>
{{< /site-region >}}

発行者 URL は、トークンエンドポイントではなく、Datadog 認可サーバーを識別します。Okta は、発行するトークンの `aud` クレームにこれを書き込みます。Datadog は、そのクレームが一致する場合にのみトークンを受け入れます。

**注**: 後から発行者 URL を変更するには、[Claude を Datadog アプリケーションに接続する](#connect-claude-to-the-datadog-application)で説明されているリソースコネクションを削除して再作成する必要があります。

### Claude を AI Agent として登録する{#register-claude-as-an-ai-agent}

Okta で Claude の AI Agent エントリを作成し、Anthropic とキーを交換します。Okta が受信するリクエストには Anthropic が署名するため、Okta でトークンを発行する前に Anthropic の公開キーが必要です。

1. Claude の AI Agent エントリを作成します。
2. エージェントに所有者を割り当てます。Okta で有効化するには所有者が必要です。
3. Okta が生成した AI Agent ID を Anthropic に送信します。
4. Anthropic から返された公開キーを、[{{< ui >}}Credentials{{< /ui >}}] (資格情報) タブの AI Agent エントリに追加します。

公開キーが設定されるまでは、他のすべての値が正しくてもトークン交換は失敗します。この交換は手動で行う必要があるため、早めに開始してください。

### Claude を Datadog アプリケーションに接続する{#connect-claude-to-the-datadog-application}

Claude AI Agent で、委任された呼び出し元として Claude SAML アプリケーションを追加し、このエージェントを Datadog アプリケーションに接続します。

1. [{{< ui >}}Delegations{{< /ui >}}] (委任) タブで、Claude SAML アプリケーションを呼び出し元として追加します。
2. [{{< ui >}}Resource connections{{< /ui >}}] タブで、リソースコネクションを追加します。リソースタイプとして [{{< ui >}}Application{{< /ui >}}] (アプリケーション) を選択し、Datadog アプリケーションを選択します。
3. 以下のフィールドを設定します。

   | Okta フィールド                | 値                                                                                                |
   | ------------------------- | ---------------------------------------------------------------------------------------------------- |
   | {{< ui >}}Client ID at resource{{< /ui >}} | [[{{< ui >}}Registered client IDs{{< /ui >}}]](#copy-the-agent-client-id)          | からコピーした Claude クライアント ID
   | {{< ui >}}Scope Condition{{< /ui >}} (スコープの条件)       | {{< ui >}}Allow all{{< /ui >}} (すべて許可) (唯一サポートされている値)。[Datadog でスコープを制御する](#control-scopes-in-datadog) |を参照してください。

4. [{{< ui >}}Actions{{< /ui >}}] (アクション) メニューからエージェントをアクティブ化します。

## Datadog でスコープを制御する {#control-scopes-in-datadog}

[{{< ui >}}Allow all{{< /ui >}}] は、Cross-App Access でサポートされている唯一の [{{< ui >}}Scope Condition{{< /ui >}}] です。これを Okta で設定してから、Claude がアクセスできる範囲を Datadog で制限します。

Okta はスコープをフィルタリングしません。[{{< ui >}}Allow all{{< /ui >}}] を使用すると、Okta は Claude が要求したものをすべてトークンにコピーするため、Datadog が強制ポイントとなります。

<div class="alert alert-warning">Okta にスコープのリストを入力しないでください。Okta はリスト外のスコープを含むトークンリクエストをすべて拒否するため、インテグレーションがより狭いアクセスにフォールバックすることなくエラーで失敗します。</div>

Claude に許可するスコープを設定するには、次の手順を実行します。

1. [{{< ui >}}Organization Settings > Mobile and Third-Party Access{{< /ui >}}](https://app.datadoghq.com/organization-settings/mobile-third-party-access) に移動します。[Cross-App Access] ページの [{{< ui >}}Registered client IDs{{< /ui >}}] テーブルで、Claude の横にある [{{< ui >}}Manage app{{< /ui >}}] をクリックすることもできます。
2. Claude アプリケーションを選択し、[{{< ui >}}Scopes{{< /ui >}}] (スコープ) タブを選択します。
3. 各スコープの [{{< ui >}}Allowed{{< /ui >}}] (許可) チェックボックスを使用して、Claude のアクセス範囲を制御します。
4. [{{< ui >}}Enable{{< /ui >}}] をクリックして保存します。

スコープを追加または削除すると、組織内のすべてのユーザーに影響します。また、スコープを削除すると、そのスコープに依存する既存の認可が取り消されます。[アプリケーションスコープの管理](/account_management/org_settings/mobile_third_party_access/#application-scope-management)を参照してください。

Datadog で許可されていないスコープは、トークンが何を要求しても付与されることはありません。

## Claude に Datadog をコネクタとして追加する{#add-datadog-as-a-connector-in-claude}

1. Claude で、任意のプロンプトの下部にある {{< ui >}}\+{{< /ui >}} アイコンをクリックし、次に [{{< ui >}}Add Connector{{< /ui >}}] (コネクタを追加) をクリックします。
2. ディレクトリで **Datadog** を見つけて、コネクタを有効にします。
3. プロンプトが表示されたら、サインインフローを完了します。

カスタムコネクタではなく、ディレクトリの Datadog コネクタを使用してください。

## 構成を検証する {#verify-the-configuration}

両方の Okta アプリケーションに割り当てられたユーザーとして Claude にサインインし、Datadog を呼び出すリクエストを実行します。呼び出しが成功すれば、Okta がトークンを発行し、Datadog がそれを受け入れ、Datadog がユーザーを解決するという完全なパスが確認されます。

Cross-App Access を有効にする前にユーザーがサインインしていた場合は、そのユーザーに、Claude からサインアウトして Okta 経由で再度サインインするように伝えます。以前に確立されたセッションには、エージェントが必要とする ID トークンが不足しています。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}