---
further_reading:
- link: /security/ai_guard/
  tag: ドキュメント
  text: AI Guard
- link: /security/ai_guard/onboarding/
  tag: ドキュメント
  text: AI Guard を始める
title: AI Guard のセットアップ
---
{{< site-region region="gov" >}}<div class="alert alert-danger">AI Guard は {{< region-param key="dd_site_name" >}} サイトでは利用できません。</div>
{{< /site-region >}}

AI Guard をセットアップするには、以下の手順を完了してください。

## 1. 前提条件をチェックする {#1-check-prerequisites}

AI Guard をセットアップする前に、必要なものがすべて揃っていることを確認してください。
- AI Guard はプレビュー版であるため、Datadog はプレビュー内の各組織に対してバックエンドの機能フラグを有効にする必要があります。有効にするには、[Datadog サポート][1]に連絡して 1 つ以上の Datadog 組織名とリージョンを伝えてください。
- 一部のセットアップ手順では、特定の Datadog 権限が必要です。管理者が必要な権限を持つ新しいロールを作成し、それが割り当てられる必要がある場合があります。
  | 権限                                    | タイプ  | 説明                                                                                                                                                                                                     |
  |-----------------------------------------------|-------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
  | **AI Guard Evaluate** (`ai_guard_evaluate`)   | 書き込み | AI Guard 評価 API を呼び出し、`ai_guard_evaluate` スコープを持つアプリケーションキーを作成するために必要です。                                                                                                |
  | **AI Guard View** (`ai_guard_view`)           | 読み取り  | シグナル、スパン、読み取り専用設定 (サービスブロックポリシー、評価感度、ツールポリシー、ツール許可リスト) を含む、AI Guard UI を表示するために必要です。また、誤検知を報告するためにも必要です。|
  | **AI Guard Write** (`ai_guard_write`)         | 書き込み | ブロックポリシー、機密データスキャン、ツールポリシー、ツールブロック、ツール許可リスト、評価感度のしきい値など、AI Guard の設定を変更するために必要です。                          |
  | **User Access Manage** (`user_access_manage`) | 書き込み | Data Access Control で [AI Guard スパンへのアクセスを制限する](#limit-access)制限付きデータセットを作成するために必要です。                                                                                        |

### 使用制限 {#usage-limits}

AI Guard 評価器 API には、以下の使用制限があります。
- 1 日あたり 10 億トークンの評価。
- 1 IP あたり毎分 12,000 リクエスト。

これらの制限を超過した場合、またはすぐに超過する見込みがある場合は、[Datadog サポート][1]に連絡して解決策を検討してください。

## 2. API キーとアプリケーションキーを作成する {#create-keys}

AI Guard を使用するには、少なくとも 1 つの API キーと 1 つのアプリケーションキーを Agent サービスに設定する必要があります。通常は環境変数を使用します。[API キーとアプリケーションキー][2]の手順に従って、両方を作成します。

**アプリケーションキー**の[スコープ][3]を追加する際は、`ai_guard_evaluate` スコープを追加してください。アプリケーションキーを作成するユーザーには、[AI Guard Evaluate 権限](#1-check-prerequisites)が必要です。

## 3. アプリケーションをインスツルメントする {#instrumentation}

フレームワークと言語に基づいて、インスツルメンテーションのアプローチを選択する:

### SDK {#sdk}

[AI Guard SDK][12] は、AI Guard REST API を呼び出し、Datadog でアクティビティをリアルタイムに監視するための言語固有のライブラリ (Python、JavaScript、Java、Ruby) を提供します。

### 自動インテグレーション {#automatic-integrations}

[自動インテグレーション][10]は、対応フレームワークに対して、すぐに使える AI Guard 保護を提供します。Datadog SDK を使用してアプリケーションを実行すると、コードを変更することなく、AI Guard の評価が自動的に実行されます。

| 言語 | 対応フレームワーク         |
|----------|------------------------------|
| Python   | LangChain、OpenAI、Anthropic |
| Node.js  | AI SDK、OpenAI、Anthropic    |
| Ruby     | RubyLLM                      |

### 手動インテグレーション {#manual-integrations}

[手動インテグレーション][11]では、対応フレームワークで AI Guard 保護を有効にするために追加の設定が必要です。

| 言語   | 対応フレームワーク           |
|------------|--------------------------------|
| Python     | Amazon Strands、LiteLLM Proxy  |

### HTTP API {#http-api}

[AI Guard HTTP API][13] を使用すると、SDK が対応していない言語や環境でも、任意の HTTP クライアントから AI Guard JSON:API エンドポイントを直接呼び出すことができます。

## 4. カスタム保持フィルターを作成する {#retention-filter}

Datadog で AI Guard の評価を表示するには、AI Guard が生成したスパンに対してカスタム[保持フィルター][5]を作成します。リンク先の指示に従って、以下の設定で保持フィルターを作成します。
- {{< ui >}}Retention query{{< /ui >}}: `resource_name:ai_guard`
- {{< ui >}}Span rate{{< /ui >}}: 100%
- {{< ui >}}Trace rate{{< /ui >}}: 100%

## 5. AI Guard ポリシーを構成する {#configure-policies}

AI Guard には、評価の適用方法、脅威検知の感度、機密データスキャンを有効にするかどうかを制御する設定があります。

### サービスポリシーを構成する {#service-policies}

{{< ui >}}Security{{< /ui >}} > {{< ui >}}AI Guard{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Services{{< /ui >}}][6] ページでは、AI Guard が安全でないコンテンツを検知した際に実行するアクションを決定するポリシーを構成できます。各ポリシーについて、以下を選択します。
- [{{< ui >}}Enforcement mode{{< /ui >}}](#blocking-policy): モニターのみ、または安全でないリクエストをブロック
- [{{< ui >}}Sensitive data scanning{{< /ui >}}](#sensitive-data-scanning): AI Guard が機密データをスキャンしてマスクするかどうか
- [{{< ui >}}Evaluation context{{< /ui >}}](#evaluation-context): 誤検知を減らすために AI Guard が評価中に使用するサービスに関する追加情報

{{< ui >}}Default policy{{< /ui >}} の横にある {{< ui >}}Edit{{< /ui >}} をクリックして、AI Guard のデフォルトの動作を設定します。デフォルトの動作を上書きするには、{{< ui >}}Add Service Policy{{< /ui >}} をクリックし、上書きを適用するサービスと環境を選択してから、より詳細なポリシーを設定します。

#### ブロックポリシー {#blocking-policy}

デフォルトでは、AI Guard は会話を評価してアクション (`ALLOW`、`DENY`、または `ABORT`) を返しますが、リクエストをブロックすることはありません。安全でないやり取りの進行を積極的に防ぐため、`DENY` および `ABORT` のアクションが有効になるようサービスごとにブロックポリシーを設定してください。

ブロックはさまざまな粒度で設定でき、より具体的な設定が優先されます。
- **組織全体**: すべてのサービスと環境にデフォルトのブロックポリシーを適用します。
- **環境ごと**: 特定の環境に対して組織のデフォルト設定を上書きします。
- **サービスごと**: 特定のサービスに対して組織のデフォルト設定を上書きします。
- **サービスおよび環境ごと**: 特定のサービスおよび特定の環境に対して、上記すべてを上書きします (例: ステージング環境ではブロックを無効にし、本番環境では有効にする)。

#### 機密データスキャン {#sensitive-data-scanning}

AI Guard は、LLM の会話において、メールアドレス、電話番号、SSN などの個人識別情報 (PII)、API キーやトークンなどのシークレットを検出できます。サービスのポリシーを作成または編集する際、機密データスキャンを {{< ui >}}Disabled{{< /ui >}}、{{< ui >}}Scanning{{< /ui >}}、または {{< ui >}}Scanning and redacting{{< /ui >}} に設定できます。

スキャンが有効な場合、AI Guard は各評価の呼び出しの最後のメッセージをスキャンします。これには、ユーザープロンプト、アシスタントの応答、ツール呼び出しの引数、ツール呼び出しの結果が含まれます。検出結果は可視化のために APM トレースに表示されます。{{< ui >}}Scanning and redacting{{< /ui >}} を使用すると、AI Guard はルールによって変更された各機密値の置換値も返します。リダクションは、手動の SDK 統合でのみサポートされています。設定および置換の適用については、[機密データのリダクション][20]を参照してください。

デフォルトでは、AI Guard は AWS キーや Datadog API キーなどの標準的なシークレットセットをスキャンします。AI Guard が使用する[スキャンルール][14]をカスタマイズするには、{{< ui >}}Security{{< /ui >}} > {{< ui >}}Sensitive Data Scanner{{< /ui >}} > {{< ui >}}Configuration{{< /ui >}} > [{{< ui >}}AI Guard{{< /ui >}}][15] に移動してください。そこで各ルールを有効または無効にするとともに、AI Guard の評価専用のスコープを設定したカスタムルール付きのスキャングループを作成できます。

### 特定のツールをブロックする {#block-specific-tools}

特定のサービスおよび環境に対して、特定のツールへのリクエストをブロックするように AI Guard を設定できます。これを行うには、{{< ui >}}Security{{< /ui >}} > {{< ui >}}AI Guard{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Tool Blocklist{{< /ui >}}][8] に移動します。{{< ui >}}Add Tool Blocking Configuration{{< /ui >}} をクリックし、サービス、環境、ツールを選択して、AI Guard がデフォルトのサービスポリシーに従うか、そのツールへのすべてのリクエストをブロックするかを選択します。

### 評価の感度 {#evaluation-sensitivity}

AI Guard は、検出した各脅威カテゴリ (プロンプトインジェクションやジェイルブレイクなど) に信頼度スコアを割り当てます。AI Guard が脅威をフラグ付けするために必要な最小信頼度スコアは、{{< ui >}}Security{{< /ui >}} > {{< ui >}}AI Guard{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Evaluation Sensitivity{{< /ui >}}][7] に移動して制御できます。

評価の感度は 0.0 から 1.0 の間の値で、デフォルトは 0.5 です。
- 値**を低く**すると感度が**上がります**。AI Guard は信頼度が低い場合でも脅威をフラグ付けするため、潜在的な攻撃をより多く検出できますが、誤検知も増加します。
- 値**を高く**すると感度が**下がります**。AI Guard は信頼度が高い場合にのみ脅威をフラグ付けするため、ノイズは減りますが、一部の攻撃を見逃す可能性があります。

### 評価コンテキストを追加する{#evaluation-context}

AI Guard には、サービスの目的や処理するデータの種類など、サービスに関する追加のコンテキストを提供できます。AI Guard はこのコンテキストを評価中に使用して、正当なエージェントの動作と真の脅威をより適切に区別し、誤検知の削減に役立てます。

サービスの評価コンテキストを追加するには、{{< ui >}}Security{{< /ui >}} > {{< ui >}}AI Guard{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Services{{< /ui >}}][6] に移動します。デフォルトポリシーの横にある {{< ui >}}Edit{{< /ui >}} をクリックするか、サービスポリシーを追加または編集してから、{{< ui >}}Evaluation context{{< /ui >}} フィールドにコンテキストを入力します (最大 1,000 文字)。例:

```text
This is a fintech app. Requests to query account balances or initiate transfers are expected and authorized.
```

[ブロックポリシー](#blocking-policy)と同様に、評価コンテキストも同じ優先順位に従い、より具体的な設定が優先されます (組織全体、環境ごと、サービスごと、サービスおよび環境ごと)。

[AI Guard Playground][19] を使用して、サービスに適用する前に、評価コンテキストが評価結果にどのように影響するかをテストしてください。Playground には独自の {{< ui >}}Evaluation Context{{< /ui >}} フィールドがあり、テスト中の会話にのみ適用されるため、サービスポリシーを変更することなく試行錯誤できます。既存のペイロードを Playground にインポートし、評価コンテキストを追加して、評価結果がどのように変化するかを確認してください。

### システムプロンプトでコンテキストを追加する {#system-prompt-context}

AI Guard は脅威を評価する際、システムプロンプトを含む会話全体を評価します。エージェントの目的、取り扱うデータ、使用を許可されているツールに関するコンテキストを追加することで、AI Guard は正当な操作と真の脅威を区別しやすくなり、セキュリティ範囲を低下させることなく誤検知を減らすことができます。

<div class="alert alert-info">アプリケーションコードを変更せずにこの種のコンテキストを追加するには、代わりにサービス設定の<a href="#evaluation-context">評価コンテキスト</a>フィールドを使用してください</div>。

#### 含める内容 {#what-to-include}

システムプロンプトには、以下を記述してください。
- **Agent の目的**: エージェントの役割と目的のスコープ。
- **許可されたデータ**: エージェントが読み取り、書き込み、またはエクスポートを想定されているデータのカテゴリ。
- **許可されたツール**: エージェントが呼び出しを許可されているツールと操作。

#### 例 {#example}

コンテキストが最小限のシステムプロンプトでは、正当な操作が誤検知される可能性が高くなります。

```text
You are a helpful assistant.
```

明示的なコンテキストを含むシステムプロンプトは、AI Guard が意図を正確に評価する上で役立ちます。

```
You are a financial data analyst assistant for internal employees. You are authorized to:
- Query internal financial databases (read-only) using the `sql_query` tool.
- Export query results to CSV or PDF using the `file_export` tool.
- Retrieve and summarize internal financial reports.

Do not access external systems or process requests unrelated to financial reporting.
```

このコンテキストがあれば、AI Guard は SQL クエリやファイルエクスポートを予期された承認済みの操作として扱い、データ流出や破壊的なツール呼び出しとしてフラグを立てる可能性が低くなります。

#### 制限事項 {#limitations}

システムプロンプトを使用して AI Guard のセキュリティチェックを上書きしたり、AI Guard に直接指示を出したりしないでください。AI Guard はシステムプロンプトを会話コンテキストの一部として評価し、自身のセキュリティチェックを無効化または弱体化しようとする指示は無視します。

## 6. (オプション) AI Guard スパンへのアクセスを制限する {#limit-access}

特定のユーザーに対して AI Guard スパンへのアクセスを制限するには、[データアクセス制御][9]を使用できます。リンク先の指示に従って、**APM データ**にスコープを設定して `resource_name:ai_guard` フィルターを適用した制限付きデータセットを作成してください。その後、特定のロールやチームに対してそのデータセットへのアクセス権を付与できます。

## APM トレーシングを無効にする {#disable-apm-tracing}

AI Guard を有効にしたままトレーサーで APM トレーシングを無効にするには、`DD_APM_TRACING_ENABLED=false` を設定します。

{{< code-block lang="bash" >}}
DD_AI_GUARD_ENABLED=true
DD_APM_TRACING_ENABLED=false
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help
[2]: /ja/account_management/api-app-keys/
[3]: /ja/account_management/api-app-keys/#scopes
[4]: /ja/agent/?tab=Host-based
[5]: /ja/tracing/trace_pipeline/trace_retention/#create-your-own-retention-filter
[6]: https://app.datadoghq.com/security/ai-guard/settings/services
[7]: https://app.datadoghq.com/security/ai-guard/settings/evaluation-sensitivity
[8]: https://app.datadoghq.com/security/ai-guard/settings/tools
[9]: https://app.datadoghq.com/organization-settings/data-access-controls/
[10]: /ja/security/ai_guard/setup/automatic_integrations/
[11]: /ja/security/ai_guard/setup/manual_integrations/
[12]: /ja/security/ai_guard/setup/sdk/
[13]: /ja/security/ai_guard/setup/http_api/
[14]: /ja/security/sensitive_data_scanner/scanning_rules/
[15]: https://app.datadoghq.com/sensitive-data-scanner/configuration/ai-guard
[19]: https://app.datadoghq.com/security/ai-guard/playground
[20]: /ja/security/ai_guard/setup/sensitive_data_redaction/