---
aliases:
- /ja/developers/ide_plugins/vscode/code_security/
further_reading:
- link: /security/code_security/
  tag: ドキュメント
  text: Code Security の詳細を学ぶ
- link: /security/code_security/static_analysis/static_analysis_rules/
  tag: ドキュメント
  text: 静的解析ルール
- link: /security/code_security/secret_scanning/
  tag: ドキュメント
  text: Secret Scanning の詳細を学ぶ
- link: /security/code_security/iac_security/
  tag: ドキュメント
  text: IaC Security の詳細を学ぶ
title: Code Security
type: documentation
---
## 概要 {#overview}

VS Code および Cursor 用の Datadog 拡張機能を使用すると、変更内容をコミットする前にセキュリティ問題を検出して修正できます。[静的コード解析](#static-code-analysis)は、脆弱性、バグ、保守性の問題を検出します。[Secret Scanning](#secret-scanning) は、API キー、トークン、パスワードなどの公開された認証情報を検出します。[Infrastructure as Code (IaC) Scanning](#infrastructure-as-code-iac-scanning) は、クラウドの構成ミスをデプロイ前に検出します。

## 静的コード解析 {#static-code-analysis}

この拡張機能は、ワークスペース内のソースファイルに対して [静的コード解析][1] ルールを実行します。変更内容をコミットする前に、セキュリティの脆弱性、バグ、保守性の問題にフラグ付けします。

静的コード解析は多くのプログラミング言語をサポートしています。完全なリストについては、[静的コード解析ルール][2] を参照してください。問題はソースコードエディタに表示され、提案された修正を直接適用できます。

{{< img src="/ide_plugins/vscode/static_analysis.mp4" alt="静的解析のプレビュー" style="width:100%" video=true >}}

### 静的コード解析を始める {#get-started-with-static-code-analysis}

ソースファイルを開くと、拡張機能はリポジトリのルートで [`code-security.datadog.yaml`][3] を探し、存在しない場合は作成を促します。

{{< img src="/ide_plugins/vscode/static-analysis-onboard.png" alt="Python ファイルで静的コード解析を設定するためのオンボーディングバナー" style="width:75%;" >}}

構成ファイルを作成すると、ファイルを開いたときに解析ツールがバックグラウンドで自動的に実行されます。特定の言語で静的コード解析を有効にするには、コマンドパレット (`Shift` + `Cmd/Ctrl` + `P`) から`Datadog: Configure Static Analysis Languages` コマンドを実行します。

フォルダー全体またはワークスペース全体を解析するには、ファイルエクスプローラーでフォルダーを右クリックし、**[Datadog Code Security] > [Analyze Folder]** (フォルダーの解析) または [**Analyze Workspace**] (ワークスペースの解析) を選択します。

### ルールエディター{#rule-editor}

IDE を離れることなく、[カスタム静的コード解析ルール][4] を作成し、テストできます。ルールエディターを使用して、社内基準、セキュリティパターン、または使用するコードベース固有の保守性チェックのための検出ロジックを設計します。

ルールエディターを開くには、コマンドパレット (`Shift` + `Cmd/Ctrl` + `P`) から `Datadog: New DDSA Rule` コマンドを実行するか、ファイルエクスプローラーで YAML ファイルを右クリックして**[Datadog Code Security] > [Open in DDSA Rule Editor]** (DDSA Rule Editor で開く) を選択します。

{{< img src="/ide_plugins/vscode/static-analysis-rule-editor.png" alt="VS Code 用 Datadog 拡張機能の SAST ルールエディター" style="width:100%;" >}}

このルールエディターには、以下のパネルが備わっています。

- 抽象構文木に対してパターンマッチングを行うための**Tree-sitter クエリエディター**。
- 検出ロジックの記述と違反の報告を行うための **JavaScript ルールパネル**。
- **編集時にルールに対して実行される準拠および非準拠のテストファイル。**予想される一致数と実際の一致数がリアルタイムで表示されます。
- パーサーがテストコードをどのように表現しているかを示す **AST ツリービュー**。

ディスクから既存のルールをインポートするか、完成したルールをエクスポートして Datadog にアップロードします。

## Secret Scanning {#secret-scanning}

この拡張機能は、ワークスペース内のソースファイルに対して [Secret Scanning][5] を実行します。変更をコミットする前に、API キー、トークン、パスワードなどの公開された認証情報にフラグ付けします。ファイルの内容はローカルでスキャンされ、入力中にエディターで検出結果が表示されます。

{{< img src="/ide_plugins/vscode/secret_scanning.mp4" alt="Secret Scanning のプレビュー" style="width:100%" video=true >}}

### Secret Scanning を開始する {#get-started-with-secret-scanning}

Secret Scanning はデフォルトで有効になっており、ソースファイルを開くたびにバックグラウンドで実行されます。フォルダー全体またはワークスペース全体をスキャンするには、ファイルエクスプローラーでフォルダーを右クリックし、**[Datadog Code Security] > [Analyze Folder]** (フォルダーの解析) または [**Analyze Workspace**] (ワークスペースの解析) を選択します。

{{< img src="/ide_plugins/vscode/secret-scanning-batch-analysis.png" alt="ファイルごとの検出結果を一覧表示する Secret Scanning セクションを含むバッチ解析レポート" style="width:100%;" >}}

ローカル設定は不要です。スキャンルールは Datadog から取得されます。すべてのテキストファイルがスキャンされ、バイナリファイルはスキップされます。

<div class="alert alert-info">Secret Scanning を実行するには Datadog へのサインインが必要です。これは、検出ルールが Datadog 組織から取得されるためです。</div>

### 検出結果を確認する {#review-findings}

検出されたシークレットは、次の 3 か所に表示されます。

- **エディター内のインライン**: シークレットが検出されると、その箇所に下線が表示され、重大度はルールの優先度に応じて示されます。
- **[Problems] (問題) パネル**: すべての検出結果がソース `Datadog` とともに一覧表示されます。
- **[File Insights] (ファイルインサイト) ビュー**: 検出結果は、他の Code Security の問題と併せてグループ化されます。

{{< img src="/ide_plugins/vscode/secret-scanning-findings.png" alt="エディター内でインライン表示され、ホバー診断が示されている検出されたシークレットと、[Problems] パネルおよび [File Insights] ビュー" style="width:100%;" >}}

### 検出結果を抑制する {#suppress-a-finding}

個別の検出を抑制するには、フラグが付いたシークレットに対するコードアクションを使用して、その直前の行に `no-dd-secrets` コメントを挿入します。このコメントは、次の行にあるすべてのシークレットの検出結果を抑制します。

### Secret Scanning のオン/オフを切り替える {#turn-secret-scanning-on-or-off}

Secret Scanning を切り替えるには、コマンドパレット (`Shift` + `Cmd/Ctrl` + `P`) から `Datadog: Turn on Secret Scanning` コマンドまたは `Datadog: Turn off Secret Scanning` コマンドを実行するか、`datadog.codeSecurity.setup.secretScanning.enabled` 設定を変更します。

## Infrastructure as Code (IaC) Scanning {#infrastructure-as-code-iac-scanning}

この拡張機能は、ワークスペース内のサポートされている IaC ファイルに対して [Infrastructure as Code (IaC) Security][6] ルールを実行します。暗号化の未設定や過度に許可されたアクセスなど、クラウドの構成ミスを検出します。ファイルは編集時にローカルでスキャンされ、検出結果はリアルタイムで表示されます。

### IaC Scanning を開始する {#get-started-with-iac-scanning}

IaC Scanning はデフォルトで有効になっており、サポートされている IaC ファイルを開くか編集するたびにバックグラウンドで自動的に実行されます。個別のスキャナー設定は不要です。この拡張機能は、`code-security.datadog.yaml` 内の IaC 構成と除外設定を尊重します。構成オプションについては、[IaC Security の構成][7] を参照してください。利用可能なルールについては、[IaC Security のルール][8] を参照してください。

### 検出結果を確認する {#review-findings-1}

IaC の構成ミスは、以下の 3 か所に表示されます。

- **エディター内のインライン**: 各検出結果が、影響を受ける行で強調表示されます。その上にカーソルを合わせると、重大度、説明、ルールが表示されます。
- **[Problems] パネル**: すべての検出結果がソース `Datadog` とともに一覧表示されます。
- **[File Insights] ビュー**: 検出結果は、他の Code Security の問題と併せて **Infrastructure as Code** の下にグループ化されます。

{{< img src="/ide_plugins/vscode/iac_real_time_analysis.mp4" alt="Dockerfile ファイルや Terraform ファイル内で、複数の IaC 検出結果がインラインでハイライト表示されます。ホバー診断やコメントによる検出結果抑制のクイック修正アクションが使用できます。対応する検出結果は、[File Insights] ビューや [Problem] パネルに表示されます。" style="width:100%" video=true >}}

### 検出結果を抑制する {#suppress-a-finding-1}

特定の行にある IaC 検出結果を抑制するには、`Datadog: Ignore IaC violations on this line` コードアクションを使用します。拡張機能は、該当ファイルの適切なコメント構文を使用して、影響を受ける行の直前に`dd-iac-scan ignore-line`コメントを挿入します。

### IaC Scanning のオン/オフを切り替える {#turn-iac-scanning-on-or-off}

IaC Scanning を切り替えるには、`datadog.iacScanning.setup.enabled` 設定を変更します。

## 参考文献 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/code_security/static_analysis/
[2]: /ja/security/code_security/static_analysis/static_analysis_rules/
[3]: /ja/security/code_security/static_analysis/configuration/
[4]: /ja/security/code_security/static_analysis/custom_rules/
[5]: /ja/security/code_security/secret_scanning/
[6]: /ja/security/code_security/iac_security/
[7]: /ja/security/code_security/iac_security/configuration/
[8]: /ja/security/code_security/iac_security/iac_rules/