---
aliases:
- /ja/service_management/app_builder/http_request/
- /ja/service_management/workflows/connections/http/
- /ja/service_management/app_builder/connections/http_request/
description: ワークフローやアプリ向けの認証、メソッド、ヘッダー、およびレスポンス処理を構成できるカスタム HTTP リクエストをエンドポイントに対して作成します。
disable_toc: false
further_reading:
- link: /actions/connections/
  tag: ドキュメント
  text: 接続の資格情報の詳細はこちら
title: HTTP リクエスト
---
{{< ui >}}Make request{{< /ui >}} アクションを使用して、HTTP エンドポイントへのカスタムリクエストを作成します。リクエストメソッドとその内容、認証および処理方法、期限切れの証明書やリダイレクトなどのシナリオへの対応方法を管理できます。HTTP アクションが期待通りに動作するように Datadog の IP アドレス範囲を許可リストに追加する必要がある場合は、`webhooks` オブジェクトに記載されている IP を使用してください。詳細については、[IP Ranges API][1] を参照してください。

HTTP リクエストを追加するには、以下の手順を実行してください。

{{< tabs >}}
{{% tab "Workflow Automation" %}}
- 新しいワークフローで、{{< ui >}}Add step{{< /ui >}} をクリックし、`Make request` を検索します。{{< ui >}}Make request{{< /ui >}} アクションを選択してワークフローに追加します。
- 既存のワークフローで、{{< ui >}}+{{< /ui >}} をクリックし、`Make request` を検索します。{{< ui >}}Make request{{< /ui >}} アクションを選択してワークフローに追加します。

リクエストメソッドと必要な [認証][1] を指定します。利用可能な構成オプションの詳細については、以下のセクションをお読みください。オプションとして、{{< ui >}}Conditional wait{{< /ui >}} セクションで指定した条件をリクエストが待機するように設定し、条件が満たされない場合に指定した間隔で再試行させることができます。

[1]: /ja/actions/workflows/access_and_auth/
{{% /tab %}}

{{% tab "App Builder" %}}
1. アプリの {{< ui >}}Data{{< /ui >}} で、{{< ui >}}+ New{{< /ui >}} をクリックし、{{< ui >}}Query{{< /ui >}} を選択します。
1. `HTTP` を検索し、{{< ui >}}Make request{{< /ui >}} アクションを選択してアプリに追加します。

リクエストメソッドと必要な [認証][1] を指定します。利用可能な構成オプションの詳細については、以下のセクションをお読みください。

[1]: /ja/actions/app_builder/access_and_auth/
{{% /tab %}}
{{< /tabs >}}

## 認証 {#authentication}

リクエストの認証が必要な場合は、アクションの {{< ui >}}Connection{{< /ui >}} を使用して認証方法を構成します。ドロップダウンから事前構成済みのコネクションを選択するか、新しいコネクションを作成できます。

### AWS コネクションを作成する {#create-an-aws-connection}

1. {{< ui >}}Connection{{< /ui >}} セクションで、プラスアイコン ({{< ui >}}+{{< /ui >}}) をクリックします。
1. {{< ui >}}AWS{{< /ui >}} を選択します。
1. {{< ui >}}Connection Name{{< /ui >}}、{{< ui >}}Account ID{{< /ui >}}、および {{< ui >}}AWS Role Name{{< /ui >}} を入力します。
1. {{< ui >}}Create{{< /ui >}} をクリックします。

### Azure コネクションを作成する {#create-an-azure-connection}

1. {{< ui >}}Connection{{< /ui >}} セクションで、プラスアイコン ({{< ui >}}+{{< /ui >}}) をクリックします。
1. {{< ui >}}Azure{{< /ui >}} を選択します。
1. {{< ui >}}Connection Name{{< /ui >}}、{{< ui >}}Tenant ID{{< /ui >}}、{{< ui >}}Client ID{{< /ui >}}、および {{< ui >}}Client Secret{{< /ui >}} を入力します。
1. オプションとして、OAuth 2.0 アクセストークンを取得する際に Microsoft に要求する {{< ui >}}Custom Scope{{< /ui >}} を入力します。リソースのスコープは、リソースの識別子 URI と `.default` を使用して構築され、スラッシュ (`/`) で区切られます。例: `{identifierURI}/.default`。詳細については、[.default スコープに関する Microsoft のドキュメント][3] を参照してください。
1. {{< ui >}}Create{{< /ui >}} をクリックします。

### HTTP トークン認証コネクションを作成する {#create-an-http-token-authentication-connection}

トークン認証コネクションは、ベアラートークンを使用して HTTP リクエストを認証します。

1. {{< ui >}}Connection{{< /ui >}} セクションで、プラスアイコン ({{< ui >}}+{{< /ui >}}) をクリックします。
1. {{< ui >}}HTTP{{< /ui >}} を選択します。
1. {{< ui >}}Connection Name{{< /ui >}} を入力します。
1. 認証用の {{< ui >}}Base URL{{< /ui >}} を入力します。
1. {{< ui >}}Authentication Type{{< /ui >}} ドロップダウンで {{< ui >}}Token Auth{{< /ui >}} を選択します。
1. {{< ui >}}Token Name{{< /ui >}} および {{< ui >}}Token Value{{< /ui >}} を入力します。複数のトークンを入力できます。ヘッダー、パラメーター、またはリクエスト本文でトークンを参照するには、syntax `{{ secretTokenName }}` を使用します。
1. オプションで、追加の {{< ui >}}Request Headers{{< /ui >}}、{{< ui >}}URL parameters{{< /ui >}}、および {{< ui >}}Body{{< /ui >}} をリクエストに追加できます。
1. {{< ui >}}Create{{< /ui >}} をクリックします。

### HTTP 基本認証コネクションを作成する {#create-an-http-basic-authentication-connection}

Basic Auth コネクションは、ユーザー名とパスワードを含む認証ヘッダーを使用して HTTP リクエストを認証します。

1. {{< ui >}}Connection{{< /ui >}} セクションで、プラスアイコン ({{< ui >}}+{{< /ui >}}) をクリックします。
1. {{< ui >}}HTTP{{< /ui >}} を選択します。
1. {{< ui >}}Connection Name{{< /ui >}} を入力します。
1. 認証用の {{< ui >}}Base URL{{< /ui >}} を入力します。
1. {{< ui >}}Authentication Type{{< /ui >}} ドロップダウンで {{< ui >}}Basic Auth{{< /ui >}} を選択します。
1. {{< ui >}}Username{{< /ui >}} および {{< ui >}}Password{{< /ui >}} を入力します。必要な認証リクエストヘッダーは、ユーザー名とパスワードを使用して自動的に入力されます。
1. {{< ui >}}Create{{< /ui >}} をクリックします。

### 2 ステップ HTTP 認証コネクションを作成する {#create-a-2-step-http-authentication-connection}

HTTP 2 ステップコネクションを使用すると、HTTP リクエストを認証するためのアクセストークンを取得するための予備リクエストを行うことができます。これは、JSON Web Token (JWT) および OAuth アプリケーションの認証に役立ちます。

1. {{< ui >}}Connection{{< /ui >}} セクションで、プラスアイコン ({{< ui >}}+{{< /ui >}}) をクリックします。
1. {{< ui >}}HTTP{{< /ui >}} を選択します。
1. {{< ui >}}Connection Name{{< /ui >}} を入力します。
1. 認証用の {{< ui >}}Base URL{{< /ui >}} を入力します。
1. {{< ui >}}Authentication Type{{< /ui >}} ドロップダウンで {{< ui >}}2 Step Auth{{< /ui >}} を選択します。

{{< tabs >}}
{{% tab "トークン認証" %}}
予備アクセストークンクエリを構成します。
1. {{< ui >}}Secret Type{{< /ui >}} ドロップダウンで {{< ui >}}Token Auth{{< /ui >}} を選択します。
1. トークン名とトークン値を入力する
1. {{< ui >}}Request URL{{< /ui >}} を入力し、リクエストのタイプを {{< ui >}}GET{{< /ui >}} または {{< ui >}}POST{{< /ui >}} として指定します。
1. オプションで、リクエストに {{< ui >}}Request Headers{{< /ui >}}、{{< ui >}}URL parameters{{< /ui >}}、および {{< ui >}}Body{{< /ui >}} を追加します。

レスポンスからアクセストークンを取得します。
1. {{< ui >}}Variable Path to Access Token{{< /ui >}} で、レスポンス内のアクセストークンへのパスを入力します。これは、認証呼び出しを行った後にアクセストークンが返されるパスです。たとえば、アクセストークンがアクセスリクエストの本文として返される場合は、`body` を使用します。アクセストークンがレスポンス `body` の `token` というプロパティで返される場合は、`body.token` を使用します。パスの大文字と小文字は区別されます。
1. オプションで、{{< ui >}}Refresh Interval{{< /ui >}} を入力します。これは、アクセストークンが期限切れになるまでの時間 (秒単位) です。トークンの有効期限が切れると、コネクションは自動的に新しいアクセストークンを要求します。間隔を `0` に設定すると、トークンの更新が無効になります。

取得したトークンを使用してコネクションを認証します。
1. {{< ui >}}Request Detail{{< /ui >}} で、{{< ui >}}Request Headers{{< /ui >}}、{{< ui >}}URL parameters{{< /ui >}}、および {{< ui >}}Body{{< /ui >}} を入力し、取得したアクセストークンを使用してリクエストを完了します。
1. {{< ui >}}Create{{< /ui >}} をクリックします。
{{% /tab %}}

{{% tab "基本認証" %}}
予備の認証クエリを構成します。
1. {{< ui >}}Secret Type{{< /ui >}} ドロップダウンで {{< ui >}}Basic Auth{{< /ui >}} を選択します。
1. {{< ui >}}Username{{< /ui >}} および {{< ui >}}Password{{< /ui >}} を入力します。{{< ui >}}Request Headers{{< /ui >}} セクションは、ユーザー名とパスワードを使用して自動的に入力されます。

認証リクエストを構成します。
1. {{< ui >}}Request URL{{< /ui >}} を入力し、リクエストのタイプを {{< ui >}}GET{{< /ui >}} または {{< ui >}}POST{{< /ui >}} として指定します。
1. オプションで、リクエストに {{< ui >}}Request Headers{{< /ui >}}、{{< ui >}}URL parameters{{< /ui >}}、および {{< ui >}}Body{{< /ui >}} を追加します。

レスポンスからアクセストークンを取得します。
1. {{< ui >}}Variable Path to Access Token{{< /ui >}} で、レスポンス内のアクセストークンへのパスを入力します。これは、認証呼び出しを行った後にアクセストークンが返されるパスです。たとえば、アクセストークンがアクセスリクエストの本文として返される場合は、`body` を使用します。アクセストークンがレスポンス `token` の `body` というプロパティで返される場合は、`body.token` を使用します。パスの大文字と小文字は区別されます。
1. オプションで、{{< ui >}}Refresh Interval{{< /ui >}} を入力します。これは、アクセストークンが期限切れになるまでの時間 (秒単位) です。トークンの有効期限が切れると、コネクションは自動的に新しいアクセストークンを要求します。間隔を `0` に設定すると、トークンの更新が無効になります。

取得したトークンを使用してコネクションを認証します。
1. {{< ui >}}Request Detail{{< /ui >}} で、{{< ui >}}Request Headers{{< /ui >}}、{{< ui >}}URL parameters{{< /ui >}}、および {{< ui >}}Body{{< /ui >}} を入力し、取得したアクセストークンを使用してリクエストを完了します。
1. {{< ui >}}Create{{< /ui >}} をクリックします。
{{% /tab %}}
{{< /tabs >}}

### HTTP mTLS コネクションを作成する {#create-an-http-mtls-connection}

Mutual TLS (mTLS) 認証コネクションを使用すると、秘密鍵と TLS 証明書を使用して HTTP リクエストを認証できます。

<div class="alert alert-info">クライアント証明書 (<code>.crt</code>、<code>.pem</code>) および秘密鍵 (<code>.key</code>、<code>.pem</code>) は PEM 形式を使用する必要があります。</div>

1. {{< ui >}}Connection{{< /ui >}} セクションで、プラスアイコン ({{< ui >}}+{{< /ui >}}) をクリックします。
1. {{< ui >}}HTTP{{< /ui >}} を選択します。
1. {{< ui >}}Connection Name{{< /ui >}} を入力します。
1. 認証用の {{< ui >}}Base URL{{< /ui >}} を入力します。
1. {{< ui >}}Authentication Type{{< /ui >}} ドロップダウンで {{< ui >}}mTLS Auth{{< /ui >}} を選択します。
1. {{< ui >}}Upload File{{< /ui >}} をクリックして {{< ui >}}Private Key{{< /ui >}} をアップロードします。
1. {{< ui >}}Upload File{{< /ui >}} をクリックして {{< ui >}}Certificate{{< /ui >}} をアップロードします。
1. {{< ui >}}Create{{< /ui >}} をクリックします。

## 入力 {#inputs}

リクエストには URL とリクエストメソッドが必要です。オプションで、以下を入力できます。
- URL パラメーター
- ヘッダー
- コンテンツタイプ
- リクエスト本文
- クッキー

期限切れの証明書を許可するか、リダイレクトに従うかを選択することもできます。

### レスポンスオプション {#response-options}

{{< ui >}}Error on Status{{< /ui >}} の下に、エラーを返すステータスコードのリストをカンマ区切りで入力します。{{< ui >}}Response Parsing{{< /ui >}} ドロップダウンを使用して、ヘッダーから推測されるデフォルトのレスポンスのパース方法を上書きし、ターゲットサーバーがレスポンスヘッダーで誤ったエンコーディングを指定している場合は {{< ui >}}Response Encoding{{< /ui >}} を使用します。

## プライベートアクション {#private-actions}

{{< callout url="https://www.datadoghq.com/product-preview/private-actions/" btn_hidden="false" header="プレビューに参加しましょう。">}}
Private Actions はプレビュー版です。このフォームを使用して、今すぐアクセスをリクエストしてください。
{{< /callout >}}

プライベート HTTP アクションを使用すると、パブリックインターネットにサービスを公開することなく、プライベートネットワーク上でホストされているサービスとやり取りできます。プライベートアクションは、Docker を使用してネットワーク内のホストにインストールし、Datadog コネクションとペアリングするプライベートアクションランナーを利用します。詳細については、[Private Actions][5] を参照してください。

プライベート HTTP リクエストを構成するには、以下の手順を実行します。
1. アプリに HTTP アクションを追加します。
1. {{< ui >}}Connection{{< /ui >}} セクションで、プラスアイコン ({{< ui >}}+{{< /ui >}}) をクリックします。
1. {{< ui >}}HTTP{{< /ui >}} を選択します。
1. {{< ui >}}Connection Name{{< /ui >}} を入力します。
1. プライベートネットワーク内のホストの {{< ui >}}Base URL{{< /ui >}} を入力します。
1. {{< ui >}}Type{{< /ui >}} については、{{< ui >}}Private Action Runner{{< /ui >}} が選択されていることを確認します。
1. {{< ui >}}Private Action Runner{{< /ui >}} ドロップダウンから、[プライベートアクションランナー][5] を選択します。
1. {{< ui >}}Authentication Type{{< /ui >}} ドロップダウンから、認証タイプを選択し、必要なフィールドに入力します。プライベート HTTP リクエストは、以下の認証タイプをサポートしています。
   - 認証なし
   - [基本認証](#create-an-http-basic-authentication-connection)
   - [トークン認証](#create-an-http-token-authentication-connection)

   トークン認証の認証情報を構成する方法については、[プライベートアクション視覚情報の処理][6] を参照してください。
1. {{< ui >}}Next, Confirm Access{{< /ui >}} をクリックし、クエリへのアクセスを構成します。
1. {{< ui >}}Create{{< /ui >}} をクリックします。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>ご質問やフィードバックがある場合は、[Datadog Community Slack][4] の**#workflows** または **#app-builder** チャンネルにご参加ください。

[1]: https://docs.datadoghq.com/ja/api/latest/ip-ranges/#list-ip-ranges
[3]: https://learn.microsoft.com/en-us/azure/active-directory/develop/scopes-oidc#the-default-scope
[4]: https://chat.datadoghq.com/
[5]: /ja/actions/private_actions
[6]: /ja/actions/connections/private_action_credentials/?tab=httpsaction#credential-files