---
description: API トラフィックを監視することで、エンドポイントのリスク、認証、機密データフロー、および公開範囲を評価します。
title: API エンドポイント
---
[API エンドポイント][1]エクスプローラーは、API トラフィックを監視し、API のセキュリティ状況を可視化します。これには以下が含まれます。

- **認証**: API が認証を強制しているかどうか。
- **認証方法**: 使用されている認証の種類 (ベーシック認証や API キーなど)。
- **公開範囲**: API がインターネットからのトラフィックを処理しているかどうか。
- **機密データフロー**: API によって処理され、API 間でやり取りされる機密データ。
- **攻撃の露出**: エンドポイントが攻撃の標的になっているかどうか。
- **ビジネスロジック**: この API のビジネスロジックおよび関連するビジネスロジックの提案。
- **脆弱性**: エンドポイントに脆弱性が存在するかどうか ([Code Security][2] および [Software Composition Analysis][3] による)。
- **検出結果**: この API で特定されたセキュリティ上の検出結果。
- **依存関係**: その API が依存している API およびデータベース。

API エンドポイントを使用すると、以下のことができます。

- どのエンドポイントが機密データを処理しているか、認証されているか、脆弱性や検出結果を持っているか、または公開されているかを確認できます。
- リスクのあるエンドポイントを確認し、[Threat Monitoring and Protection][4] サービスに直接アクセスして、さらなる調査や対応を行うことができます。
- どのエンドポイントがビジネスロジックに関連しているかを確認し、エンドポイントのトラフィック履歴に基づいてビジネスロジックの提案を見つけることができます。

## 構成 {#configuration}

サービスで API エンドポイントを表示するには、**App and API Protection Threat Detection を有効にする必要があります**。

Amazon Web Services (AWS) API Gateway インテグレーションについては、以下を設定する必要があります。

- [Amazon Web Services][5]
- [Amazon API Gateway Integration][6]

API エンドポイントは、Datadog カタログから、具体的には [Datadog にアップロードされた][7] API 定義から検出されます。API 定義のアップロード手順については、[エンティティを作成する][8]を参照してください。

API インベントリと互換性のあるライブラリバージョンについては、[App and API Protection の有効化][9]を参照してください。[Remote Configuration][10] が必要です。

|テクノロジー|最小トレーサーバージョン| 機密データスキャンのサポート |
|----------|----------|----------|
|Python    | v2.1.6   | リクエストとレスポンス |
|Java      | v1.31.0  | リクエストのみ |
|PHP      | v0.98.0  | リクエストとレスポンス |
|.NET Core | v2.42.0  | リクエストとレスポンス |
|.NET Fx   | v2.47.0  | リクエストとレスポンス |
|Ruby      | v1.15.0  | リクエストのみ |
|Golang    | v1.59.0  | リクエストのみ |
|Node.js   | v3.51.0, v4.30.0 または v5.6.0 | リクエストとレスポンス |

**注**: .NET Core および .NET Fx トレーサーでは、API Security 機能が正しく動作するように環境変数 `DD_API_SECURITY_ENABLED=true` を設定する必要があります。

## 仕組み {#how-it-works}

API エンドポイントは、App and API Protection を有効にした Datadog SDK、Amazon API Gateway からの構成、およびアップロードされた API 定義を使用して、API トラフィックに関するセキュリティメタデータを収集します。このデータには、検出された API スキーマ、処理される機密データ (PII) の種類、使用されている認証スキームが含まれます。API 情報は継続的に評価され、API の攻撃対象領域全体を包括的かつ最新の状態に保つ上で役立ちます。

API エンドポイントは、[Remote Configuration][10] を使用して、機密データと認証を検出するスキャンルールの管理と構成を行います。

検出されたエンドポイントがパブリックにアクセス可能かどうか、および認証が必要かどうかを確認するには、[エンドポイントスキャン][11]を有効にします。エンドポイントスキャンは、対象となるエンドポイントをアクティブにスキャンし、検証済みのパブリックアクセス可能性、認証ステータス、HTTP レスポンスステータス、および最終評価データで API インベントリを強化します。

以下のリスクが各エンドポイントに対して計算されます。

## データソース {#data-sources}

[API エンドポイント][1]エクスプローラーでは、{{< ui >}}Data Sources{{< /ui >}} が可視性の起点を示します。

以下のデータソースが探索されます。

### Amazon API Gateway {#amazon-api-gateway}

<div class="alert alert-info">特定の API に対してこの統合を無効にするには、 <code>dd_skip_endpoint:true</code> タグをリソースに追加します。</div>

Amazon API Gateway サービスは、API 構造を正式に定義します。Datadog AWS インテグレーションは、この事前定義された構成を Amazon API Gateway から読み取り、Datadog はこの構成を使用して {{< ui >}}Inventory{{< /ui >}} に API エンドポイントエントリを作成します。

{{< ui >}}Data Source{{< /ui >}} で {{< ui >}}AWS API Gateway{{< /ui >}} を使用して、これらの公開されたエンドポイントの可視性を確保します。クエリ `datasource:aws_apigateway` を使用することもできます。

### カタログ {#catalog}

{{< ui >}}Catalog{{< /ui >}} データソースは、Datadog にアップロードされた正式な仕様から Datadog が学習した API エンドポイントを表示します。API 仕様は、IDP サービスエンティティ内の専用 API コンポーネントに添付されるか、登録されます。

このソースは、計画済みおよび正式に文書化されたすべてのエンドポイントを含めることで、API インベントリが完全であることを保証します。

### APM トレース {#apm-traces}

{{< ui >}}Spans{{< /ui >}} データソースは、実際のトラフィックとデータ露出を表示します。修復は、コード、構成、またはアクセス制御において直ちに実行する必要があります。

実行するアクションは、攻撃対象領域によって異なります。

- **脆弱性:** SCA またはランタイムコード分析によって表面化した脆弱なライブラリにパッチを適用し、サービスを再デプロイします。
- **発見された API 検出結果:** トレースされたサービスのコンテキストで各問題をレビューし、コードや構成を修正してから、新しいトレースを使用して検証します。
- **機密データの処理:** データ処理がポリシーに準拠していることを確認し、PII をサニタイズまたは暗号化し、必要なサービスへのアクセスを制限します。
- **認証されていないエンドポイント:** エンドポイントが意図的に公開されているものでない場合は、認証を強制し、サービス構成を更新します。

### 静的エンドポイント検出 {#static-endpoint-discovery}

<div class="alert alert-info">静的エンドポイント検出はプレビュー版です。</div>

{{< site-region region="gov,gov2" >}}
<div class="alert alert-warning">静的エンドポイント検出は、 {{< region-param key="dd_site_name" >}} サイトでは利用できません。</div>
{{< /site-region >}}

{{< ui >}}Source Code{{< /ui >}}ソースには、ソースコードから直接検出された API エンドポイントが表示されます。これは、開発ライフサイクルの早い段階でエンドポイントを表面化させることで、ランタイムベースの検出を補完します。ライブトラフィックを受信しない可能性のあるエンドポイントも含まれます。

このデータソースを使用するには、GitHub、GitLab、または Azure DevOps で[ソースコードインテグレーション][12]を設定してください。以下の言語とフレームワークがサポートされています。

| 言語 | フレームワーク |
|----------|-----------|
| Python   | FastAPI、Flask、Tornado |
| Java     | Spring    |
| Go       | Beego、Chi、Echo、Fiber、Gin、Gorilla Mux、fasthttp、go-zero |
| C#       | ASP.NET Core MVC |
| Node.js  | Express、Fastify |

ソースコードのエンドポイントをフィルタリングするには、{{< ui >}}Data Source{{< /ui >}}ファセットで {{< ui >}}Source Code{{< /ui >}} を使用するか、クエリ `datasource:source_code` を使用します。スキャンは、コードがデフォルトブランチにプッシュされたとき、および 8 時間ごとにスケジュールして実行されます。検出されたエンドポイントは、その後のスキャンで再検出されない場合、12 時間後に削除されます。

#### ソースコードのエンドポイントをサービスにマッピングする {#map-source-code-endpoints-to-services}

静的エンドポイント検出では、ヒューリスティックを使用して、エンドポイントがどのサービスに属しているかを推測します。より正確なマッピングを行うには、[カタログサービス定義 (v3 スキーマ)][13]の `codeLocations` フィールドを使用して、サービスとコードの関係を明示的に定義します。

```yaml
apiVersion: v3
kind: service
metadata:
  name: my-service
  owner: my-team
datadog:
  codeLocations:
    - repositoryURL: https://github.com/org/myrepo.git
      paths:
        - path/to/service/code/**
```

明示的な `codeLocations` がない場合、エンドポイントが他のソースからのデータと正しくマージされない可能性があります。

## エンドポイントスキーマを表示および比較する {#view-and-compare-endpoint-schemas}

API Posture は、観測されたトラフィックから各エンドポイントの OpenAPI スキーマを構築します。この**推論された**スキーマは、API が本番環境で公開しているもの (パス、パラメーター、リクエストおよびレスポンスボディ、認証) を記述します。チームが**宣言された**スキーマ (Datadog Software Catalog に登録された OpenAPI 定義) も公開している場合、両者を比較して、実行中の API がドキュメントからどこで乖離しているかを見つけることができます。

### エンドポイントのスキーマを表示する {#view-an-endpoints-schema}

[API エンドポイント][1]で、エンドポイントをクリックして詳細パネルを開きます。**定義**セクションには、エンドポイントのリクエストパラメーター、リクエストボディ、およびレスポンスが表示されます。機密データを含むフィールドには、観測された機密データのタイプがマークされます。

{{< img src="/security/application_security/api/api_endpoint_definition_schema_cropped.png" alt="リクエストパラメーター、View Raw Schema ボタン、および View Inferred Schemas ボタンが表示された、エンドポイントの詳細パネルの定義セクション" style="width:100%;" >}}

エンドポイントが Datadog Software Catalog の API に関連付けられている場合、**定義**セクションには宣言された OpenAPI 仕様が表示されます。それ以外の場合は、ライブトラフィックから推論されたスキーマが表示されます。

**定義**セクションでは、以下のことが可能です。

- {{< ui >}}View Raw Schema{{< /ui >}}: 表示されているスキーマを未加工の YAML として表示します。
- {{< ui >}}View Inferred Schemas{{< /ui >}}: 宣言されたスキーマが利用可能な場合でも、ライブトラフィックから推論されたスキーマをプレビューまたは YAML として表示します。推論されたスキーマは、YAML または JSON 形式の OpenAPI ファイルとしてエクスポートできます。

ノイズを減らすため、推論されたスキーマには少なくとも 3 回観測されたフィールドのみが含まれ、7 日以内に再度観測されなかったフィールドは削除されます。これにより、単一の不正なリクエストや、予期しないフィールドでエンドポイントを調査する攻撃者など、一度限りのトラフィックが推論されたスキーマを汚染するのを防ぎます。そうでない場合、宣言されたスキーマと比較したときにドリフトとして表示される可能性があります。

### 宣言されたスキーマと推論されたスキーマを比較する {#compare-declared-and-inferred-schemas}

推論されたスキーマと宣言されたスキーマを比較するには、以下を行う必要があります。

- サービスで [App and API Protection を有効にする][9]と、ライブトラフィックからエンドポイントが検出されます。
- 宣言されたスキーマの OpenAPI 定義を Datadog Software Catalog に登録します。[エンティティを作成する][8]を参照してください。

スキーマの差異はエンドポイントのスキーマ表示に直接表示され、重大度によって強調表示されます。

| 重大度 | 意味 |
|----------|---------|
| 破壊的 | 必須になったフィールドやパラメータータイプの変更など、宣言されたコントラクトに依存するクライアントを破壊する可能性が高い変更です。|
| 警告 | トラフィックで観測された未宣言のフィールドや任意になったパラメーターなど、見直す価値のあるドリフトです。|
| 情報 | 宣言されているもののトラフィックが観測されていないエンドポイントなど、リスクの低い差異です。|

差異はスキーマの以下の領域に表示されることがあります。

- **パラメーター**: パラメーターが追加、削除、または任意から必須 (またはその逆) に変更されました。
- **リクエストボディ**: リクエストボディが追加、削除、または任意から必須 (またはその逆) に変更されました。
- **スキーマプロパティ**: プロパティが追加、削除、任意から必須 (またはその逆) に変更された、あるいはタイプ、フォーマット、null 許容性、または列挙値が変更されました。
- **値の制約**: 数値や長さの制限 (`minimum`、`maximum`、`minLength`、`maxLength`)、パターン、または一意性の制約が変更されました。
- **スキーマ構成**: `oneOf` または `allOf` の構成、あるいは識別子において不一致が発生しました。
- **レスポンス**: ステータスコード、レスポンスヘッダー、またはコンテンツタイプが追加または削除されました。

ノイズを減らすため、意味のあるコントラクトのドリフトを表さない一部の差異は除外されています。

- **リクエストヘッダーおよびクッキーパラメーター:** これらには、API コントラクトの一部ではない認証トークンやセッション識別子などの値が含まれることがよくあります。
- **クエリパラメーターのタイプ変更:** クエリパラメーターは、整数やブール値などの別のタイプとして宣言されている場合でも、トラフィックでは常に文字列として観測されます。
- **削除されたステータスコード:** 推論されたスキーマにはトラフィックで観測されたステータスコードのみが含まれるため、観測中にまだ発生していない宣言済みのステータスコードは常に削除されたものとして表示されます。
- **`anyOf`構成の不一致:** 宣言されたスキーマと推論されたスキーマは、同等性を維持しながらスキーマの異なるレベルで `anyOf` を使用できます。

## 機密データの処理 {#processing-sensitive-data}

App and API Protection は、エンドポイントによって処理される機密データを検出および分類し、検出されたデータのカテゴリーとタイプを各エンドポイントにタグ付けします。どのエンドポイントが機密データを処理しているかを確認し、カスタム API データスキャナーを作成するには、[Sensitive Data][16] を参照してください。

## ビジネスロジック {#business-logic}

これらのタグ (`users.login.success`、`users.login.failure` など) は、エンドポイントに関連付けられたビジネスロジックトレースの存在によって決定されます。

<div class="alert alert-tip">Datadog は、HTTP メソッド、レスポンスステータスコード、および URL に基づいて、エンドポイントのビジネスロジックタグを提案できます。</div>

## 一般公開 {#publicly-accessible}

Datadog は、クライアント IP アドレスが以下の範囲外にある場合、エンドポイントを公開としてマークします。

- 10.0.0.0/8
- 172.16.0.0/12
- 192.168.0.0/16
- 169.254.1.0/16

必要なライブラリの構成についての詳細は、[クライアント IP ヘッダーの構成][14]を参照してください。

## エンドポイント認証 {#endpoint-authentication}

認証は以下の条件によって決定されます。

- `Authorization`、`Token`、または `X-Api-Key` ヘッダーの存在。
- トレース内にユーザー ID が含まれていること (例: `@usr.id` APM 属性)。
- エンドポイントによって返される 401 または 403 ステータスコード。
- 構成したカスタム[エンドポイントタグ付け][15]ルール


認証タイプが利用可能な場合、Datadog は {{< ui >}}Authentication Method{{< /ui >}} ファセットを通じてヘッダー内でそれを報告します。

### サポートされている認証方法 {#supported-authentication-methods}

| カテゴリー                                          | カテゴリーファセット   |
|---------------------------------------------------|------------------|
| JSON Web Token (JWT)                              | `json_web_token` |
| ベアラートークン (`Authorization` ヘッダーに含まれる)  | `bearer_token`   |
| 基本認証                              | `basic_auth`     |
| ダイジェストアクセス認証                      | `digest_auth`    |

### カスタム認証サポート {#custom-authentication-support}

[エンドポイントタグ付けルール][15]を設定することで、カスタム認証の検出が可能になります。これらのルールでは、以下の最小トレーサーバージョンが必要です。

|テクノロジー| 最小トレーサーバージョン |
|----------|------------------------|
|Java      | v1.55.0                |
|.NET      | 間もなく対応            |
|Node.js   | v5.76.0                |
|Python    | v3.17.0                |
|Ruby      | v2.23.0                |
|PHP       | v1.15.0                |
|Golang    | v2.4.0                 |

[1]: https://app.datadoghq.com/security/appsec/inventory/apis
[2]: /ja/security/code_security/iast/
[3]: /ja/security/code_security/software_composition_analysis/
[4]: /ja/security/application_security/
[5]: /ja/integrations/amazon-web-services
[6]: /ja/integrations/amazon-api-gateway
[7]: /ja/internal_developer_portal/catalog/entity_model/native_entities/?tab=api#native-entity-types
[8]: /ja/internal_developer_portal/catalog/set_up/create_entities/#through-the-datadog-ui
[9]: /ja/security/application_security/setup/
[10]: /ja/tracing/guide/remote_config/
[11]: /ja/security/application_security/api_posture/endpoint_scanning/
[12]: /ja/integrations/guide/source-code-integration/
[13]: /ja/internal_developer_portal/catalog/entity_model/
[14]: /ja/security/application_security/policies/library_configuration/#configuring-a-client-ip-header
[15]: https://app.datadoghq.com/security/configuration/asm/trace-tagging
[16]: /ja/security/application_security/api_posture/sensitive_data/