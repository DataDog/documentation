---
aliases:
- /ja/workflows/generic_actions
disable_sidebar: false
disable_toc: false
further_reading:
- link: /integrations/
  tag: Documentation
  text: インテグレーションについて
is_beta: true
kind: documentation
title: 汎用アクション
type: ドキュメント
---

汎用アクションは、ツールやインテグレーションに関連付けられていないワークフローアクションです。必要なアクションがアクションカタログにない場合、汎用アクションでユースケースに対応できる可能性があります。

すべてのワークフローアクションと同様に、[コンテキスト変数][1]タブを使用して、 ワークフローコンテキストで利用可能な値にアクセスすることができます。

また、[新しいアクションやインテグレーション全体をリクエストする][5]こともできます。

## HTTP

HTTP アクションを使用すると、カスタムエンドポイントにリクエストを行うことができます。リクエストメソッドとその内容、認証と処理の方法、有効期限切れの証明書やリダイレクトなどのシナリオに対応する方法を制御することができます。HTTP アクションが期待通りに動作するように、許可リストに Datadog の IP アドレス範囲を追加する必要がある場合、`webhooks` オブジェクトにリストされた IP を使用します。詳細は [IP 範囲ページ][2]を参照してください。

リクエスト方法と必要な[認証][3]を指定することから始めます。利用可能な構成タブの詳細については、以下のセクションをお読みください。オプションとして、リクエストは **Conditional wait** セクションで指定した条件で待機し、条件が満たされない場合は所定の間隔で再試行することができます。

### 認証

リクエストの認証が必要な場合は、アクションの **Connection** を使って認証方法を構成します。ドロップダウンから事前構成された接続を選択するか、接続を作成することができます。

#### AWS 接続の作成

1. **Connection** セクションで、プラスアイコン (**+**) をクリックします。
1. **AWS** を選択します。
1. **Connection Name**、**Account ID**、**AWS Role Name** を入力します。
1. **Create** をクリックします。

#### Azure 接続の作成

1. **Connection** セクションで、プラスアイコン (**+**) をクリックします。
1. **Azure** を選択します。
1. **Connection Name**、**Tenant ID**、**Client ID**、**Client Secret** を入力します。
1. オプションで、OAuth 2 アクセストークンの取得中に Microsoft にリクエストされる **Custom Scope** を入力します。リソースのスコープは、リソースの識別子 URI と `.default` をスラッシュ (`/`) で区切って構築されます (例: `{identifierURI}/.default`)。詳細については、[.default スコープに関する Microsoft のドキュメント][6]を参照してください。
1. **Create** をクリックします。

#### HTTP Basic 認証接続の作成

Basic Auth 接続は、ユーザー名とパスワードを含む認証ヘッダーを使用して HTTP リクエストを認証します。

1. **Connection** セクションで、プラスアイコン (**+**) をクリックします。
1. **HTTP** を選択します。
1. **Connection Name** を入力します。
1. **Authentication Type** ドロップダウンから、**Basic Auth** を選択します。
1. **Username** と **Password** を入力します。
1. 認証用の **Base URL** を入力します。ユーザー名とパスワードを使用して必要な認証リクエストヘッダーが自動的に設定されますが、必要であれば、その他の **Request Headers** を追加することができます。
1. オプションで、**URL parameters** と **Body** をリクエストに追加します。
1. **Create** をクリックします。

#### HTTP Token Auth 接続の作成

Token Auth 接続は、ベアラートークンを使用して HTTP リクエストを認証します。

1. **Connection** セクションで、プラスアイコン (**+**) をクリックします。
1. **HTTP** を選択します。
1. **Connection Name** を入力します。
1. **Authentication Type** ドロップダウンから、**Token Auth** を選択します。
1. **Token Name** と **Token Value** を入力します。複数のトークンを入力することができます。ヘッダー、パラメーター、またはリクエスト本文内のトークンを参照するには、構文 `{{ secretTokenName }}` を使用します。
1. 認証用の **Base URL** を入力します。
1. オプションで、その他の **Request Headers**、**URL parameters**、**Body** をリクエストに追加します。
1. **Create** をクリックします。

#### HTTP リクエスト認証接続の作成

HTTP リクエスト認証接続では、HTTP リクエストの認証に使うアクセストークンを取得するための事前リクエストを行うことができます。

1. **Connection** セクションで、プラスアイコン (**+**) をクリックします。
1. **HTTP** を選択します。
1. **Connection Name** を入力します。
1. **Authentication Type** ドロップダウンから、**HTTP Request Auth** を選択します。

アクセストークンの事前リクエストを構成します。
1. **Access token request** セクションの **Secret Type** で、**Token Name** と **Token Value** を入力します。複数のトークンを入力することができます。
1. **Request Setup** で **Variable Reference Path** を入力します。これは、認証呼び出し後にアクセストークンが返されるパスです。たとえば、アクセストークンがアクセスリクエストの本文として返される場合は、`body`を使用します。アクセストークンが応答の`body` の `token`というプロパティとして返される場合は、`body.token`を使用します。パスは大文字と小文字を区別します。
1. オプションで、**Refresh Interval** を入力します。これはアクセストークンの有効期限が切れるまでの時間で、秒単位で指定します。トークンの有効期限が切れると、接続は自動的に新しいアクセストークンをリクエストします。間隔を `0` に設定すると、トークンのリフレッシュが無効になります。
1. **Request URL** を入力し、リクエストの種類を **GET** または **POST** で指定します。
1. オプションで、その他の **Request Headers**、**URL parameters**、**Body** をリクエストに追加します。

認証リクエストの構成
1. **Request details** セクションで、認証リクエストの **Base URL** を入力します。ヘッダー、パラメーター、リクエスト本文内のトークンを参照するには、 `{{ accessToken }}` を使用します。例: `Authentication: Bearer {{ accessToken }}`。
1. オプションで、その他の **Request Headers**、**URL parameters**、**Body** をリクエストに追加します。
1. **Create** をクリックします。

#### HTTP mTLS 接続の作成

相互 TLS (mTLS) 認証接続では、秘密鍵と TLS 証明書を使って HTTP リクエストを認証することができます。

<div class="alert alert-info">クライアント証明書 (<code>.crt</code>、<code>.pem</code>) と秘密鍵 (<code>.key</code>, <code>.pem</code>) は、PEM形式を使用する必要があります。</div>

1. **Connection** セクションで、プラスアイコン (**+**) をクリックします。
1. **HTTP** を選択します。
1. **Connection Name** を入力します。
1. **Authentication Type** ドロップダウンから、**mTLS Auth** を選択します。
1. **Upload File** をクリックして、**秘密鍵**をアップロードします。
1. **Upload File** をクリックして、**証明書**をアップロードします。
1. **Create** をクリックします。

### 入力

URL とリクエストメソッドはリクエストにおいて必須です。オプションで以下を入力することができます。
- URL パラメーター
- ヘッダー
- コンテンツタイプ
- リクエスト本文
- クッキー

また、有効期限切れの証明書を許可するか、リダイレクトに従うかを選択することもできます。

#### 応答オプション

**Error on Status** でエラーを返す任意のステータスコードをコンマで区切って入力します。**Response Parsing** ドロップダウンを使って、ヘッダーから推測されるデフォルトのレスポンスパース方法をオーバーライドし、ターゲットサーバーがレスポンスヘッダーに間違ったエンコーディングを指定している場合は **Response Encoding** を使用します。

## データ変換

**Expression** および **Function** アクションは、JavaScript を使用してワークフロー内でカスタムデータ変換を実行します。ワークフロー内で利用可能なコンテキスト変数の値を、JavaScript の式や関数の入力として使用するには、`$.Steps.<step_name>.<variable>` という構文を使用します。また、同じ構文でデータ変換アクションに [Lodash][4] を利用するために `_` を使用することができます。例えば、HTTP リクエストステップ (`Make_request`) から HTTP リクエストステータス変数 (`status`) を参照するには、以下のコンテキスト変数を使用します。

```
$.Steps.Make_request.status
```

また、前のステップの `Array_function` が返す配列に `_.includes` Lodash 関数を適用して、名前 `Bits` が含まれているかどうかを判断するには、次の構文を用います。

```
_.includes($.Steps.Array_function.data, "Bits")
```

これらのアクションによって返されたデータは、その後のワークフローのステップで参照することができます。

### 式

式アクションは、1 行のコードで完了でき、変数の割り当てや複数の独立した操作を必要としないデータ変換に使用します。例:

`[1, 2, 3].filter(x => x < 3)`

### 関数

関数アクションは、変数の割り当てや複数の式を必要とするデータ変換を可能にします。

### 式と関数のテスト

式または関数アクションをテストするには、**Inputs** セクションの **Test** をクリックします。そのアクションで前のステップからの出力変数が使用される場合は、コード内でその変数をコメントアウトして、テストデータと置き換えます。例えば、ワークフロー名と前のステップからの出力 `Steps.List_monitors` に変数を割り当てる以下のアクションを考えます。

```js
let name = $.WorkflowName;
let object = $.Steps.List_monitors;

...
```

このアクションをテストするには、既存の変数の割り当てをコメントアウトし、ハードコーディングしたテストデータと置き換えます。

```js
\\ let name = $.WorkflowName;
let name = 'Test workflow'
\\ let object = $.Steps.List_monitors;
let object = {0:{
  'name': 'Test monitor'
}}
...
```

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/service_management/workflows/build/#context-variables
[2]: https://docs.datadoghq.com/ja/api/latest/ip-ranges/#list-ip-ranges
[3]: /ja/service_management/workflows/access/
[4]: https://lodash.com/
[5]: https://forms.gle/JzPazvxXox7fvA2R8
[6]: https://learn.microsoft.com/en-us/azure/active-directory/develop/scopes-oidc#the-default-scope