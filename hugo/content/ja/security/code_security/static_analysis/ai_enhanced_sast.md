---
aliases:
- /ja/security/code_security/static_analysis/malicious_pr_protection/
description: AI を活用して、静的分析ライフサイクル全体におけるセキュリティの意思決定を強化します。
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/open-source-ai-sast/
  tag: ブログ
  text: オープンソース AI ネイティブ SAST のご紹介
- link: https://www.datadoghq.com/blog/ai-native-sast-detect-llm-vulnerabilities/
  tag: ブログ
  text: Datadog の AI ネイティブ SAST で LLM アプリケーションの脆弱性を検出する
- link: https://www.datadoghq.com/blog/using-llms-to-filter-out-false-positives
  tag: ブログ
  text: LLM を使用して静的コード分析から誤検知を除外する
- link: https://www.datadoghq.com/blog/sast-triage-agentic-evaluation-bits-memories/
  tag: ブログ
  text: エージェント型評価と Bits Memories で SAST の誤検知を削減する
- link: https://www.datadoghq.com/blog/bitsai-dev-agent-code-security
  tag: ブログ
  text: Code Security 向け Bits Code のご紹介
title: AI 強化型静的コード分析
---
静的コード分析 (SAST) は AI を活用して、脆弱性管理ライフサイクル全体における検出、検証、および修正を自動化します。

| ライフサイクルフェーズ | 機能                                                                                                                  | トリガーポイント                            | 影響                                                                        |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------ |
| 検出       | [悪意がある PR の保護](#malicious-pr-protection)は、潜在的な悪意がある変更や疑わしい差分を検出します。                                       | PR 時                                | 新たなリスクのあるコードを導入する PR にフラグを立てます。                                      |
| 検出               | [AI ネイティブ SAST](#ai-native-sast)は、LLM ベースのテイント分析を使用して、より高い精度でセキュリティ脆弱性を検出します。                         | スキャン時 (Datadog ホスト型スキャンのみ)  | ルールベースの分析では見逃されていた、コンテキスト的に複雑な脆弱性を特定します。|
| 検証     | [誤検知フィルタリング](#false-positive-filtering)は、可能性の低い検出結果の優先度を下げます。                                                           | スキャン後                                | ノイズを削減し、実際の問題にフォーカスできるようにします。                                  |
| 検証 | [エージェント型誤検知フィルタリング](#agentic-false-positive-filtering)はファイル間コンテキストを使用して、インジェクション関連ルールの一部について可能性の低い検出結果の優先度を下げます。| スキャン後                        | サポートされているルールカテゴリーについて、ファイル間の動作に依存する誤検知を削減します。|
| 修正                  | [修正](#remediation)は Bits Code を使用して、手動または自動で推奨される修正案を生成します。       | スキャン後                                | 開発者の労力を削減し、修正サイクルを加速させます。                             |

## 検出 {#detection}

検出機能には、プルリクエスト内の潜在的な悪意がある意図の特定や、LLM を使用したコードベース内の脆弱性のスキャンが含まれます。

### 悪意がある PR 保護 {#malicious-pr-protection}

{{< callout url="https://www.datadoghq.com/product-preview/malicious-pr-protection/" >}}
悪意がある PR 保護はプレビュー版であり、GitHub リポジトリのみをサポートしています。
{{< /callout >}}

悪意がある PR 保護は LLM を使用して、リポジトリのデフォルトブランチに送信された PR をスキャンし、以下を含む有害なコード変更を検出します。

- コードインジェクション
- シークレット流出の試行
- 悪意があるパッケージのプッシュ
- CI ワークフローの侵害

例については、[tj-actions/changed-files の侵害 (2025 年 3 月)][2]、[難読化された悪意がある npm パッケージ (2025 年 9 月)][3]、および[悪意がある PR 保護の発表ブログ投稿][1]を参照してください。

[セキュリティシグナルエクスプローラー][4]で、{{< ui >}}Source{{< /ui >}} または {{< ui >}}Scope{{< /ui >}} ファセットを `datadog-code-security` に絞り込むことで、悪意がある PR の検出結果を見つけることができます。{{< ui >}}Code Security{{< /ui >}} > {{< ui >}}Scan Verdict{{< /ui >}} ファセットを使用して、悪意がある判定または良性の判定でフィルタリングするか、直接検索します。

- `source:datadog-code-security`
- `@pr_security.scan.verdict:malicious`
- `@pr_security.scan.verdict:benign`

特定の脆弱性に対して、調査用のシグナルを割り当てたり、セキュリティケースを作成したり、インシデントを宣言したり、ワークフローを実行したりできます。
  
### AI ネイティブ SAST {#ai-native-sast}

AI ネイティブ SAST は、Datadog ホスト型スキャンでのみ利用可能です。

AI ネイティブ SAST は LLM を使用して、コード内のデータフローを推論し、セキュリティ脆弱性を検出します。ルールベースの静的分析とは異なり、AI ネイティブ SAST は 2 段階のアプローチを使用して、脆弱性をコンテキストに応じて特定できます。

1. **検出**: LLM が各ファイルをスキャンし、ユーザー制御データがサニタイズされずに危険なオペレーションに到達する可能性があるかどうかを推論します。
2. **検証**: 2 番目の LLM がテイント分析を通じて各候補の検出結果を独立して再評価し、各結果を確認または却下して誤検知を減らします。

AI ネイティブ SAST を有効にするには、ソースコード管理インテグレーション設定で {{< ui >}}Enable AI SAST{{< /ui >}} を切り替えます。すべてのリポジトリまたは特定のリポジトリに対して有効にできます。

有効にすると、AI ネイティブ SAST はルールベースの静的分析と並行して実行され、両方の手法でカバーされる脆弱性タイプについてはその検出結果が優先されます。

AI ネイティブ SAST は以下の言語でサポートされています。

- C#
- C++
- Dart
- Elixir
- Go
- Java
- JavaScript
- Kotlin
- PHP
- Python
- Ruby
- Rust
- Swift
- TypeScript

{{% collapse-content title="サポートされている CWE" level="h4" expanded=false id="ai-native-sast-cwes" %}}
AI ネイティブ SAST は以下の脆弱性タイプを検出します。

- [CWE-89: SQL インジェクション](https://cwe.mitre.org/data/definitions/89.html)
- [CWE-78: コマンドインジェクション](https://cwe.mitre.org/data/definitions/78.html)
- [CWE-79: クロスサイトスクリプティング (XSS)](https://cwe.mitre.org/data/definitions/79.html)
- [CWE-643: XPath インジェクション](https://cwe.mitre.org/data/definitions/643.html)
- [CWE-22: パストラバーサル](https://cwe.mitre.org/data/definitions/22.html)
- [CWE-73: Zip Slip](https://cwe.mitre.org/data/definitions/73.html)
- [CWE-74: 不適切な出力処理](https://cwe.mitre.org/data/definitions/74.html)
- [CWE-502: 安全でない逆シリアル化](https://cwe.mitre.org/data/definitions/502.html)
- [CWE-327: 壊れた暗号化](https://cwe.mitre.org/data/definitions/327.html)
- [CWE-328: 弱いハッシュ化](https://cwe.mitre.org/data/definitions/328.html)
- [CWE-330: 弱い乱数生成](https://cwe.mitre.org/data/definitions/330.html)
- [CWE-614: 不適切な Cookie 設定](https://cwe.mitre.org/data/definitions/614.html)
- [CWE-90: LDAP インジェクション](https://cwe.mitre.org/data/definitions/90.html)
- [CWE-94: コードインジェクション](https://cwe.mitre.org/data/definitions/94.html)
- [CWE-117: ログインジェクション](https://cwe.mitre.org/data/definitions/117.html)
- [CWE-190: 整数オーバーフローまたはラップアラウンド](https://cwe.mitre.org/data/definitions/190.html)
- [CWE-200: 機密情報の漏洩](https://cwe.mitre.org/data/definitions/200.html)
- [CWE-209: エラーメッセージによる情報漏洩](https://cwe.mitre.org/data/definitions/209.html)
- [CWE-250: 過剰な権限](https://cwe.mitre.org/data/definitions/250.html)
- [CWE-501: 信頼境界の違反](https://cwe.mitre.org/data/definitions/501.html)
- [CWE-284: 不適切な Access Control (IDOR)](https://cwe.mitre.org/data/definitions/284.html)
- [CWE-345: データおよびモデルのポイズニング](https://cwe.mitre.org/data/definitions/345.html)
- [CWE-349: ベクトルおよび埋め込みの脆弱性](https://cwe.mitre.org/data/definitions/349.html)
- [CWE-400: 無制限の消費](https://cwe.mitre.org/data/definitions/400.html)
- [CWE-540: システムプロンプトの漏洩](https://cwe.mitre.org/data/definitions/540.html)
- [CWE-601: オープンリダイレクト](https://cwe.mitre.org/data/definitions/601.html)
- [CWE-829: サプライチェーンの脆弱性](https://cwe.mitre.org/data/definitions/829.html)
- [CWE-1321: プロトタイプ汚染](https://cwe.mitre.org/data/definitions/1321.html)
- [CWE-1426: 誤情報](https://cwe.mitre.org/data/definitions/1426.html)
- [CWE-1427: プロンプトインジェクション](https://cwe.mitre.org/data/definitions/1427.html)
  {{% /collapse-content %}}

AI ネイティブ SAST は、Code Security `sast` 構成において言語固有のルールセット (例: `python-ai_sast`) を使用します。ルールセット名の一覧表示や、Datadog ホスト型スキャンでそれらを選択または除外する方法については、[Static Code Analysis (SAST) 構成][15]を参照してください。

## 検証 {#validation}

誤検知フィルタリングは、スキャン完了後に行われます。2 つのフィルタリング層 (ベースライン誤検知フィルタリングと、ルールの一部に対してファイル間のコンテキストを収集するエージェント型フィルタリング) が利用可能です。

### 誤検知フィルタリング {#false-positive-filtering}

[Bits AI][9] は SAST の検出結果をレビューし、それが真陽性か誤検知かを評価して、その理由の簡単な説明を含めます。

[Code Security SAST Vulnerabilities][6] でトリアージリストを絞り込むには、{{< ui >}}Filter out false positives{{< /ui >}} を有効にしてください。これにより、`-bitsAssessment:"False Positive"` クエリが適用されます。

### エージェント型誤検知フィルタリング {#agentic-false-positive-filtering}

エージェント型誤検知フィルタリングは、ベースライン誤検知フィルタリングの強化版です。Bits AI は、目の前のコードのみを評価するのではなく、ファイル間のコンテキストを収集します。関連ファイルを読み込み、シンボルを検索し、近いディレクトリ構造を調査します。

エージェント型誤検知フィルタリングは、SQL インジェクションやコマンドインジェクションなど、インジェクション関連の SAST ルールにのみ適用されます。

### カスタムコンテキスト {#custom-context}

*カスタムコンテキスト*を使用すると、Bits AI がすべての誤検知フィルタリングの評価を行う際に使用するルール固有のガイダンスを追加できます。カスタムコンテキストを使用して、組織固有のフレームワーク、サニタイザー、検証パターン、またはコードベースの詳細を記述してください。

カスタムコンテキストは、組織レベルおよびルールレベルで適用され、Datadog のデフォルトルールセット内のセキュリティカテゴリー SAST ルールにのみ適用されます。カスタムルールには適用されません。SAST ルールのサイドパネルで、カスタムコンテキストを確認または追加してください。

## 修復 {#remediation}

[Bits Code][10] は、脆弱性に対するコード修正を単一の修正または自動化として生成します。

1. [Code Security SAST Vulnerabilities][6] で脆弱性を選択すると、検出結果と影響を受けるコードの詳細が記載されたサイドパネルが開きます。
2. {{< ui >}}Next Steps{{< /ui >}} サイドバーで {{< ui >}}Remediate with AI{{< /ui >}} をクリックし、オプションを選択します。
    - {{< ui >}}Single fix{{< /ui >}}: 提案された差分を確認し、追加の質問を行い、パッチを編集し、プルリクエストを作成して、単一の脆弱性を修正します。修正がすでに生成されている場合は、{{< ui >}}View fix and create PR{{< /ui >}} を選択して既存の修正セッションを表示します。
    - {{< ui >}}Create automation{{< /ui >}}: 脆弱性が検出された際、またはスケジュールに基づいて、自動的に修正を生成します。このオプションを選択すると、{{< ui >}}Remediate SAST vulnerabilities{{< /ui >}} アクションが事前入力されたモーダルが開きます。トリガーと出力を指定するなど、フォームに記入し、{{< ui >}}Create Automation{{< /ui >}} をクリックします。

セッションの詳細を表示することで、マージ前に変更を確認および検証できます。以下が含まれます。

- 元のセキュリティ検出結果と提案されたコード変更。
- Bits Code がその修正を生成した方法と理由の説明。
- パッチが安全にデプロイできることを検証するための CI 結果 (有効な場合)。
- 修正を調整するためのオプションや、ソースコードリポジトリに変更を適用するための {{< ui >}}Create PR{{< /ui >}}。

<div class="alert alert-tip">脆弱性を調査してセッションの詳細を表示します。{{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Bits Code{{< /ui >}} > {{< ui >}}Sessions{{< /ui >}} で、すべての Bits Code セッションを表示します。{{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Bits Code{{< /ui >}} > {{< ui >}}Automations{{< /ui >}} で、すべての Bits Code の自動化を表示します。</div>


## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/engineering/malicious-pull-requests/
[2]: https://www.cisa.gov/news-events/alerts/2025/03/18/supply-chain-compromise-third-party-tj-actionschanged-files-cve-2025-30066-and-reviewdogaction
[3]: https://www.cisa.gov/news-events/alerts/2025/09/23/widespread-supply-chain-compromise-impacting-npm-ecosystem
[4]: https://app.datadoghq.com/security
[6]: https://app.datadoghq.com/security/code-security/sast
[9]: /ja/bits_ai/
[10]: /ja/bits_ai/bits_code
[15]: /ja/security/code_security/static_analysis/configuration/#configure-ai-native-sast