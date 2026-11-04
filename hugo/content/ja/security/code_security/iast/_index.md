---
aliases:
- /ja/security/application_security/code_security/
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/datadog-code-security/
  tag: ブログ
  text: Datadog Code Security で、アプリケーションコードとライブラリのライフサイクルを保護する
- link: https://www.datadoghq.com/blog/code-security-secret-scanning
  tag: ブログ
  text: Datadog Secret Scanning を使用して、公開された認証情報を検出およびブロックする
- link: /security/code_security/iast/setup/
  tag: ドキュメント
  text: ランタイムコード解析 (IAST) をセットアップする
- link: /security/code_security/iast/security_controls/
  tag: ドキュメント
  text: セキュリティコントロール
- link: /security/ticketing_integrations
  tag: ドキュメント
  text: チケットインテグレーション
- link: /security/automation_pipelines/
  tag: ドキュメント
  text: 自動化パイプライン
- link: /security/notifications/
  tag: ドキュメント
  text: セキュリティ通知
title: Runtime Code Analysis (IAST)
---
## 概要 {#overview}

Datadog Runtime Code Analysis (IAST) は、Datadog アプリケーションインスツルメンテーションに基づいてアプリケーションコード内の脆弱性を発見する Interactive Application Security Testing (IAST) アプローチを使用して、サービス内のコードレベルの脆弱性を特定します。IAST により、Datadog は追加の構成や定期的なスケジューリングを必要とする外部テストに依存せず、正規のアプリケーショントラフィックを使用して脆弱性を特定できます。また、ライブラリやインフラストラクチャーなど、スタック内の他のコンポーネントとコードの相互作用も監視し、攻撃対象領域の最新の表示を提供します。

## 仕組み {#how-it-works}

Runtime Code Analysis (IAST) は、Datadog トレーシングライブラリを使用して、実行時にアプリケーション内を流れるユーザー制御データを追跡します。汚染された入力がコード内の脆弱なポイントに到達したことを IAST が確認できた場合にのみ脆弱性が報告されるため、検出結果を実用的なものに保つことができます。

- **データソースの追跡:** IAST は、リクエスト URL、本文、ヘッダーなどの外部ソースからアプリケーションに入力されるデータを監視します。これらの入力はタグ付けされ、ライフサイクル全体を通じて追跡されます。
- **データフローの分析:** Datadog トレーシングライブラリは、入力データがアプリケーション内をどのように移動するかが変換、分割、結合された場合でも追跡します。これにより、IAST は元の入力がコードのセキュリティ上重要な部分に到達するかどうか、またどのように到達するかを把握できます。
- **脆弱なポイントの特定:** IAST は、ユーザー制御の入力が SQL クエリ、動的コード実行、HTML レンダリングなど、潜在的に安全でない方法で使用されているコードの場所を検出します。
- **脆弱性の確認:** 汚染された入力が実際にコード内の脆弱なポイントに到達したことを IAST が確認できた場合にのみ脆弱性が報告されます。このアプローチにより、誤検知を最小限に抑え、検出結果を実用的なものに保ちます。

## サポートされている脆弱性のタイプ {#supported-vulnerability-types}

Datadog IAST は、サポートされている言語全体で、以下のコードレベルの脆弱性タイプを検出します。カバレッジは言語やフレームワークによって異なる場合があります。フレームワークレベルのサポートについては、[互換性要件][5]を参照してください。

| 重大度 | 検出ルール                        | Java | .NET | Node.js | Python |
|----------|---------------------------------------|------|------|---------|--------|
| 重大 | NoSQL インジェクション                       | FALSE | TRUE | TRUE | FALSE |
| 重大 | SQL インジェクション                         | TRUE | TRUE | TRUE | TRUE |
| 重大 | サーバーサイドリクエストフォージェリー (SSRF)    | TRUE | TRUE | TRUE | TRUE |
| 重大 | コードインジェクション                        | FALSE | FALSE | TRUE | FALSE |
| 重大 | コマンドインジェクション                     | TRUE | TRUE | TRUE | TRUE |
| 高 | LDAP インジェクション                        | TRUE | TRUE | TRUE | FALSE |
| 高 | メール HTML インジェクション                  | TRUE | TRUE | TRUE | FALSE |
| 高 | ハードコードされたシークレット                     | TRUE | TRUE | TRUE | FALSE |
| 高 | ハードコードされたパスワード                   | FALSE | FALSE | TRUE | FALSE |
| 高 | パストラバーサル                        | TRUE | TRUE | TRUE | TRUE |
| 高 | 信頼境界の違反              | TRUE | TRUE | FALSE | FALSE |
| 高 | クロスサイトスクリプティング (XSS)            | TRUE | TRUE | FALSE | FALSE |
| 高 | 信頼できないデシリアライゼーション             | TRUE | FALSE | FALSE | FALSE |
| 高 | 無効なリダイレクト                  | TRUE | TRUE | TRUE | FALSE |
| 高 | XPath インジェクション                       | TRUE | TRUE | FALSE | FALSE |
| 高 | ヘッダーインジェクション                      | TRUE | TRUE | TRUE | TRUE |
| 高 | ディレクトリリスティングの漏洩                | TRUE | FALSE | FALSE | FALSE |
| 高 | デフォルトの HTML エスケープが無効            | TRUE | FALSE | FALSE | FALSE |
| 高 | 動詞の改ざん                        | TRUE | FALSE | FALSE | FALSE |
| 中 | SameSite クッキーなし                   | TRUE | TRUE | TRUE | TRUE |
| 中 | 安全でないクッキー                      | TRUE | TRUE | TRUE | TRUE |
| 中 | HttpOnly クッキーなし                   | TRUE | TRUE | TRUE | TRUE |
| 中 | 弱いハッシュ化                         | TRUE | TRUE | TRUE | TRUE |
| 中 | 弱い暗号                          | TRUE | TRUE | TRUE | TRUE |
| 中 | スタックトレースの漏洩                      | TRUE | TRUE | FALSE | FALSE |
| 中 | リフレクションインジェクション                 | TRUE | TRUE | FALSE | FALSE |
| 中 | 安全でない認証プロトコル     | TRUE | TRUE | FALSE | FALSE |
| 中 | ハードコードされたキー                        | FALSE | TRUE | FALSE | FALSE |
| 中 | 安全でない JSP レイアウト                  | TRUE | FALSE | FALSE | FALSE |
| 低 | HSTS ヘッダーが欠落                   | TRUE | TRUE | TRUE | FALSE |
| 低 | X-Content-Type-Options ヘッダーが欠落 | TRUE | TRUE | TRUE | FALSE |
| 低 | 弱いランダム性                       | TRUE | TRUE | TRUE | TRUE |
| 低 | 管理コンソールがアクティブ | TRUE | FALSE | FALSE | FALSE |
| 低 | セッションのタイムアウト                       | TRUE | FALSE | FALSE | FALSE |
| 低 | セッションの書き換え                     | TRUE | FALSE | FALSE | FALSE |

## 主な機能 {#key-capabilities}

### 脆弱性の確認と優先順位付け {#review-and-prioritize-vulnerabilities}

[IAST の脆弱性エクスプローラー][1]は、IAST によって検出されたコードレベルの脆弱性の脆弱性専用のビューで示します。このエクスプローラー内のすべての検出結果は、Datadog トレーシングライブラリと IAST が有効な状態で実行されているサービスで確認された脆弱性に対応しています。各 Code Security 機能には独自のエクスプローラー (SAST、SCA、IAST、Secrets Scanning、IaC) があるため、このビュー内で IAST の検出結果が他のタイプと混在することはありません。

各検出結果には、簡単な説明、影響を受けるサービス、脆弱性のタイプ、最初と最後の検出時刻、および問題が確認された正確なファイル、メソッド、行番号が含まれています。サービス、チーム、環境、重大度、その他のファセットで結果をフィルタリングして、グループにとって重要な作業に集中できます。

#### Datadog 重大度スコア {#datadog-severity-score}

IAST はファーストパーティコード内の脆弱性を検出するため、検出結果には公開 CVE または CVSS スコアは存在しません。Datadog は、各脆弱性タイプ (コマンドインジェクションや SQL インジェクションなど) に対して**基本重大度**を割り当て、その後ご利用の環境で観測されたランタイムコンテキストと悪用可能性シグナルに基づいてその基本値を **Datadog Severity Score** に調整します。これらの要因は、理論上のリスクと実際の環境で悪用される可能性が高い脆弱性を区別する上で役立ちます。以下の表は、各要因が最終スコアにどのように影響するかを説明しています。

| リスク要因 | 評価方法 | スコアへの影響 |
|---|---|---|
| 基本重大度 | 脆弱性タイプ (コマンドインジェクション、SQL インジェクションなど) に基づいて Datadog が定義します。| 重大度スコアの開始点。|
| 本番環境のランタイムコンテキスト | 影響を受けるサービスが本番環境で実行されているかどうか。| サービスが本番環境で実行されていない場合は低下します。|
| 攻撃を受けている | サービスを標的としたアクティブな攻撃アクティビティの証拠。| 攻撃アクティビティが観測されない場合は低下します。|

#### ランタイムインジケーター {#runtime-indicators}

脆弱性のサイドパネルには、ランタイムコンテキストの要因がインジケーターとして表示されるため、検出結果のスコアが調整された理由を一目で確認できます。

- **{{< ui >}}Service In Production{{< /ui >}}**: **本番環境のランタイムコンテキスト**要因に対応します。Datadog は、サービスが本番環境で実行されているかどうかを、その`env` および `environment` タグから判断します。影響を受けるサービスが本番環境で実行されていない場合、Datadog Severity Score は低下します。
- **{{< ui >}}Exposed to Attacks{{< /ui >}}**: **攻撃を受けている**要因に対応します。過去 15 日間にセキュリティシグナルが検出された場合、そのサービスは攻撃にさらされているというフラグが立てられます。攻撃アクティビティが観測されない場合、パネルには {{< ui >}}Not Exposed to Attacks{{< /ui >}} が表示され、Datadog Severity Score は低下します。

各インジケーターが特定の検出結果にどのように影響したかを確認するには、サイドパネルの {{< ui >}}Datadog Severity Breakdown{{< /ui >}} タブを開いてください。Datadog Security 全体でこれらのリスクがどのように評価されるかについての詳細は、[セキュリティ受信トレイ][19]を参照してください。

### コードの脆弱性を修正する {#remediate-a-code-vulnerability}

[IAST の脆弱性エクスプローラー][1]で任意の検出結果をクリックすると脆弱性サイドパネルが開き、開発者やセキュリティエンジニアが問題を修正するために必要な完全なコンテキストが得られます。

このパネルには、検出結果の重大度、脆弱性のタイプ、期限、ランタイムインジケーター (例: {{< ui >}}Exposed to Attacks{{< /ui >}} や {{< ui >}}Service In Production{{< /ui >}}) がまとめられており、コード内のどこで脆弱性が確認されたか、いつ最初と最後に検出されたか、どのサービス、環境、チームに影響を与えるか、CWE などの関連する標準リファレンスが表示されます。[GitHub][7]、[GitLab][8]、または [Azure DevOps][18] インテグレーションが有効になっている場合、Datadog は脆弱性を導入したコミットと脆弱なコードのスニペットも表示します。

サイドパネルには、{{< ui >}}Data Flow{{< /ui >}} (汚染された入力がどのように脆弱なシンクに到達するか)、{{< ui >}}Remediation{{< /ui >}} (フレームワークごとのステップごとのガイダンスとサンプルコード)、{{< ui >}}Datadog Severity Breakdown{{< /ui >}} (ランタイムコンテキストがどのようにスコアを形成したか)、{{< ui >}}More Information{{< /ui >}} (関連リファレンス) のタブが含まれています。右側の {{< ui >}}Next Steps{{< /ui >}} パネルから、検出結果のステータスの変更、ミュート、Jira または ServiceNow チケットの作成、または修復ステップへの直接移動が可能です。

繰り返し可能なワークフローについては、{{< ui >}}Set up Automation{{< /ui >}} を使用して、条件に一致する新規および既存の検出結果に同じアクションを自動的に適用します。詳細については、[トリアージと修復を自動化する](#automate-triage-and-remediation)を参照してください。

### 検出結果からチケットを作成する {#create-tickets-from-findings}

任意の IAST 検出結果から直接 Jira または ServiceNow で双方向チケットを作成し、既存のワークフローで問題を追跡および修正できます。チケットステータスは Datadog とチケット発行ツール間で同期されるため、どちらのシステムで行われた更新も整合性が保たれます。詳細については、[チケットインテグレーション][13]を参照してください。

チケットを一括で作成する場合や、繰り返し可能なプロセスの一部として作成する場合は、[自動化パイプライン][14]を使用して、重大度、サービス、環境、チームなどの条件に一致する検出結果に対して自動的にチケットを発行します。

### 検出結果のミュート {#mute-findings}

検出結果を抑制するには、検出結果詳細パネルの {{< ui >}}Mute{{< /ui >}} をクリックします。これにより、タグ値 (例: `service` や `env`) によるコンテキストアウェアなフィルタリングのために、[自動化ルールを作成][15]できるワークフローが開きます。検出結果をミュートすると、それはアクティブなトリアージから非表示になり、レポートから除外されます。

ミュートされた検出結果を復元するには、詳細パネルの {{< ui >}}Unmute{{< /ui >}} をクリックします。[IAST の脆弱性エクスプローラー][1]の {{< ui >}}Status{{< /ui >}} フィルターを使用して、ミュートされた検出結果を確認することもできます。

### 新しい検出結果で通知する {#notify-on-new-findings}

新しい IAST 検出結果が検出されたらすぐに適切なチームにルーティングします。Datadog 通知は、Slack、Microsoft Teams、メール、PagerDuty、webhooks などに対応しているため、各チームが普段作業している場所で検出結果を受け取ることができます。セットアップの詳細については、[セキュリティ通知][16]を参照してください。

### トリアージと修復を自動化する {#automate-triage-and-remediation}

[自動化パイプライン][14]を使用して、手動で介入することなく、新規および既存の IAST 検出結果に対して一貫したトリアージおよび修復アクションを適用します。検出結果サイドパネルの {{< ui >}}Set up Automation{{< /ui >}} メニュー、または自動化パイプライン設定ページから、以下を実行できます。

- サービス、環境、脆弱性タイプなどの条件に一致する[検出結果をミュート][15]します。
- 重大度とランタイムコンテキストに基づく[期限を設定][14]するため、修復 SLA が自動的に適用されます。
- [検出結果をセキュリティ受信トレイに追加][14]して、チームが最優先事項に集中できるようにします。
- Jira または ServiceNow で、一致する検出結果に対して[チケットを作成][13]します。
- Slack、Microsoft Teams、メール、その他のチャネルで適切なチームに[通知][16]します。

自動化パイプラインは、新しく検出された検出結果と Datadog にすでに存在する検出結果の両方に適用されるため、ポリシーの変更は環境全体に遡及的に適用されます。

### APM におけるコードレベルの脆弱性コンテキスト {#code-level-vulnerability-context-in-apm}

IAST は、コードレベルの脆弱性が確認されたサービスにフラグを立てることで、Application Performance Monitoring (APM) がすでに収集している情報を強化します。脆弱なサービスは [APM カタログ][17]のセキュリティビューで直接強調表示されるため、ワンクリックで脆弱なサービスからそのトレース、ログ、インフラストラクチャーのコンテキストに移動できます。

## 脆弱性ライフサイクル {#vulnerability-lifecycle}

Datadog は、実行中のアプリケーションで Datadog トレーシングライブラリが確認した内容に基づいて、**サービス**レベルで IAST 脆弱性を追跡します。IAST が実行中のサービスでコードレベルの脆弱性を確認すると、脆弱性がオープンになります。以下のライフサイクルルールに従って Datadog が脆弱性を検出しなくなると、脆弱性がクローズされます。

| 製品 | スコープ | シナリオ | 脆弱性がオープンになるタイミング | 脆弱性がクローズされるタイミング |
|---|---|---|---|---|
| IAST | サービス | 実行中のサービス | Datadog が実行中のサービスでコードレベルの脆弱性を確認します。| 14 日後、その期間中に脆弱性が再度検出されなかった場合。|
| IAST | サービス | 新しいサービスバージョンがデプロイされた | Datadog が実行中のサービスでコードレベルの脆弱性を確認します。| 脆弱性が新しいバージョンで検出されなくなってから 24 時間後、それが最初に検出された環境で適用されます。|

以前にクローズされた脆弱性が 15 か月以内に再度検出された場合、Datadog は再発した問題を見逃さないように自動的にその脆弱性を再オープンします。

## ランタイムコード解析 (IAST) をセットアップする {#set-up-runtime-code-analysis-iast}

IAST を有効にするには、サービスの Datadog トレーシングライブラリを構成してください。言語別の詳細な手順については、[ランタイムコード解析 (IAST) をセットアップする][9]を参照してください。さらにサポートが必要な場合は、[Datadog サポート][11]にお問い合わせください。

IAST を無効化する方法の詳細については、[コードセキュリティの無効化][12]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/appsec/vm/code
[3]: /ja/integrations/jira/
[4]: /ja/account_management/rbac/permissions/#integrations
[5]: /ja/security/code_security/iast/setup/#using-datadog-tracing-libraries
[7]: /ja/integrations/github/
[8]: /ja/integrations/gitlab/
[18]: /ja/integrations/azure_devops/
[19]: /ja/security/security_inbox/#what-appears-in-security-inbox
[9]: /ja/security/code_security/iast/setup/
[10]: https://app.datadoghq.com/security/configuration/code-security/setup
[11]: https://www.datadoghq.com/support/
[12]: /ja/security/code_security/troubleshooting
[13]: /ja/security/ticketing_integrations
[14]: /ja/security/automation_pipelines/
[15]: /ja/security/automation_pipelines/mute
[16]: /ja/security/notifications/
[17]: https://app.datadoghq.com/services?lens=Security