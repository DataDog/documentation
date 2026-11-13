---
aliases:
- /ja/security/application_security/software_composition_analysis/setup/
- /ja/security/application_security/software_composition_analysis/
- /ja/code_analysis/software_composition_analysis/
- /ja/security/application_security/vulnerability_management/
disable_toc: false
further_reading:
- link: /security/code_security/software_composition_analysis/setup_static/
  tag: ドキュメント
  text: Static SCA のセットアップ
- link: /security/code_security/software_composition_analysis/setup_runtime/
  tag: ドキュメント
  text: Runtime SCA のセットアップ
- link: /security/code_security/software_composition_analysis/library_inventory
  tag: ドキュメント
  text: ライブラリインベントリ
- link: /security/code_security/software_composition_analysis/cve_explorer
  tag: ドキュメント
  text: CVE エクスプローラー
- link: /pr_gates/
  tag: ドキュメント
  text: PR ゲート
- link: https://www.datadoghq.com/blog/code-security-secret-scanning
  tag: ブログ
  text: Datadog Secret Scanning を使用して、公開された認証情報を検出およびブロックする
- link: https://www.datadoghq.com/blog/smart-vulnerability-remediation/
  tag: ブログ
  text: Datadog を使用して、よりスマートな脆弱性修復アプローチを採用する
- link: https://www.datadoghq.com/blog/remediate-faster-code-security
  tag: ブログ
  text: Datadog Software Composition Analysis を使用して、推移的脆弱性をより迅速に修正する
- link: https://www.datadoghq.com/blog/devsecops-2026-study-learnings
  tag: ブログ
  text: 2026 年版 State of DevSecOps 調査から得られた重要な知見
- link: https://www.datadoghq.com/blog/secure-your-github-ecosystem/
  tag: ブログ
  text: 'CI/CD セキュリティ: GitHub エコシステムを保護する方法'
title: Software Composition Analysis
---
## 概要 {#overview}

Software Composition Analysis (SCA) は、リポジトリと実行中のサービスの両方でオープンソースライブラリを検出し、開発から本番環境までのライブラリの脆弱性とライセンス管理のエンドツーエンドの可視性を提供します。

Software Composition Analysis を使用することで、組織には次のような利点があります。
- オープンソースライブラリに影響を与える新たな脆弱性および既知の脆弱性の特定
- 脆弱性のランタイム検出に基づくリスクベースの優先順位付けと修復
- OpenSSF 標準に基づく悪意のあるパッケージ、サポート終了ライブラリ、およびライブラリのリスクの特定
- 検出されたライブラリのソフトウェア部品表 (SBOM) を CycloneDX 1.6 または SPDX 2.3 形式でエクスポート

## 仕組み {#how-it-works}

SCA は、2 つの補完的な検出モードをサポートしています。
- **静的検出**は、依存関係ファイル (ロックファイルおよびマニフェスト) を分析することでリポジトリをスキャンします。デフォルトでは、サポートされている依存関係マニフェストまたはロックファイルが有効なリポジトリ内でコミットによって更新されると、スキャンが実行されます。SCA を CI/CD パイプラインで実行することもできます (CI ジョブは `push` イベントでサポートされています)。開始するには、[Static SCA のセットアップ][1] を参照してください。
- **ランタイム検出**は、Datadog APM のインスツルメンテーションを使用して、実行時にサービスによってロードおよび使用されるライブラリを特定します。開始するには、[Runtime SCA のセットアップ][2] を参照してください。

Datadog が新しいアドバイザリを取り込むと、それは最後に確認されたライブラリインベントリと照合され、リポジトリを再スキャンしていなくても脆弱性エクスプローラーに表示されます。リポジトリエクスプローラーはコミットスコープであり、スキャン実行時に判明していた内容を反映します。そのため、Datadog がアドバイザリを取り込む前に実行されたスキャンでは、新しく公開されたアドバイザリはそのコミットのリポジトリエクスプローラーに表示されません。詳細については、「[SCA ビューの理解](#understanding-sca-views)」を参照してください。

## 脆弱性データベース {#vulnerability-database}

Datadog SCA は、複数の公開ソースおよび非公開ソースから情報を引き出し、厳選された独自のデータベースを構築しています。これらのソースには、[National Vulnerability Database (NVD)][21]、[GitHub Advisory Database][22]、[osv.dev][23]、[PyPA's Advisory Database][24] や [Global Security Database][25] といったエコシステム固有のアドバイザリ、[Datadog GuardDog][26]、および Datadog Security Research が含まれます。

Datadog はこれらのソースを使用して、サポートされているエコシステム全体で、既知の脆弱性、悪意のあるパッケージ、および新たに発生しているサプライチェーンの脅威を特定します。新しい脆弱性が公開されてから Datadog に表示されるまでの時間は最大 1 時間であり、新たに発生した脆弱性は通常数分以内に Datadog に表示されます。悪意のあるパッケージは 6 時間以内に Datadog で報告されます。

## 公開エクスプロイトソース {#public-exploit-sources}

Datadog は、CISA (Known Exploited Vulnerabilities Catalog)、Exploit-DB、NIST (National Vulnerability Database)、GitHub (公開エクスプロイトの参照) など、複数の公開ソースからのデータを集約することで、脆弱性に既知の公開エクスプロイトが存在するかどうかを特定します。

Datadog がこれらのソースのいずれかから脆弱性に対する公開エクスプロイトを特定すると、修復の優先順位付けに役立てられるよう、その検出結果にフラグを立てます。

## 主な機能 {#key-capabilities}

### 脆弱性の確認と優先順位付け {#review-and-prioritize-vulnerabilities}

[脆弱性エクスプローラー][11] は、SCA によって検出されたライブラリの脆弱性を、他の Code Security 機能 (SAST、IAST、Secrets Scanning、IaC) によって検出された脆弱性と併せて、脆弱性中心のビューで提供します。エクスプローラー内のすべての脆弱性は、スキャンされたリポジトリの最後のコミット時のデフォルトブランチで検出されたか、実行中のサービスに影響しているかのいずれかです。

#### Datadog 重大度スコア {#datadog-severity-score}

修復の優先順位付けを支援するため、Datadog はランタイムコンテキストと悪用可能性のシグナルを組み込むことで、ベースとなる CVSS スコアを **Datadog Severity Score** に変更します。これらの要因は、理論上のリスクと実際の環境で悪用される可能性が高い脆弱性を区別する上で役立ちます。以下の表は、各要因が最終スコアにどのように影響するかを説明しています。

| リスク要因                       | 評価方法                                                  | スコアへの影響                                    |
|-----------------------------------|----------------------------------------------------------------------|--------------------------------------------------------|
| ベース CVSS スコア                   | 脆弱性に対して公開されている CVSS スコア。                         | 重大度スコアの開始点。                |
| 到達可能性                      | 脆弱な関数がソースコード内で参照されているかどうか (リポジトリレベルで静的に検出)。| コード内で脆弱な関数への到達が確認された場合に増加します。|
| 本番環境のランタイムコンテキスト        | 影響を受けるサービスが本番環境で実行されているかどうか。| サービスが本番環境で実行されていない場合は低下します。|
| 攻撃を受けている                      | サービスを標的としたアクティブな攻撃アクティビティの証拠。           | 攻撃アクティビティが観測されない場合は低下します。    |
| エクスプロイトの可用性              | その脆弱性に対する公開エクスプロイトの有無。              | エクスプロイトが利用できない場合は減少します。                 |
| 悪用の可能性 (EPSS)    | EPSS データに基づく、現実世界での悪用の可能性。           | 悪用の可能性が低い場合に減少します。|

#### 脆弱性の詳細を表示する {#view-vulnerability-details}

脆弱性エクスプローラーで脆弱性をクリックすると、サイドパネルが開きます。

##### リポジトリ {#repositories}

[{{< ui >}}Repositories{{< /ui >}}] セクションには、Static SCA がライブラリの脆弱性を検出したファイルとリポジトリが一覧表示されます。各検出結果について、関連するサービスとチーム、検出結果のステータス、およびトリアージアクションが表示されます。行を展開して、重大度の内訳と、利用可能な場合は到達可能な場所を表示します。

##### 影響を受けるサービス {#impacted-services}

[{{< ui >}}Impacted services{{< /ui >}}] セクションには、Runtime SCA がライブラリの脆弱性を検出したサービスが一覧表示されます。各サービスについて、環境、依存関係の詳細、到達可能性、関連チーム、検出結果のステータス、および Datadog による最終検出日時が表示されます。

##### 影響を受けるインフラストラクチャー {#impacted-infrastructure}

Runtime SCA が影響を受けるサービスを検出すると、[{{< ui >}}Impacted Infrastructure{{< /ui >}}] セクションに、影響を受けるライブラリバージョンが実行されているホストが一覧表示されます。また、関連するサービス、環境、最終デプロイ時間も表示されます。

影響を受けるインフラストラクチャーを調査するには:

1. 影響を受けるホスト、サービス、環境、および最終デプロイ時間を確認してください。
1. [{{< ui >}}View Host{{< /ui >}}] を選択してホストを調査してください。
1. [{{< ui >}}View Vulnerabilities in Cloud Security{{< /ui >}}] を選択して、ホストの未解決の脆弱性を確認してください。

### リポジトリ別の検出結果を表示する {#view-findings-by-repository}

[リポジトリエクスプローラー][12] は、Static Code Analysis (SAST)、Software Composition Analysis (SCA)、Secrets Scanning、および Infrastructure as Code (IaC) 全体にわたるすべてのスキャン結果を、リポジトリを中心としたビューで提供します。リポジトリをクリックして、選択したブランチとコミットにスコープされた SCA の {{< ui >}}Library Vulnerabilities{{< /ui >}} および {{< ui >}}Library Catalog{{< /ui >}} 結果を分析します。
* [{{< ui >}}Library Vulnerabilities{{< /ui >}}] タブには、Datadog SCA によって検出された脆弱なライブラリのバージョンが表示されます
* [{{< ui >}}Library Catalog{{< /ui >}}] タブには、Datadog SCA によって検出されたすべてのライブラリ (脆弱性の有無に関わらず) が表示されます。

検出された脆弱性を修復するための推奨手順は、SCA の各脆弱性のサイドパネルで確認できます。ライブラリを最も安全な (脆弱性のない) バージョンにアップグレードする手順と、最も近いバージョンにアップグレードする手順が提供されます。

結果を絞り込むには、リストの左側にあるファセットを使用するか、上部の検索バーを使用してください。結果は、サービスまたはチームのファセットでフィルタリングできます。結果が Datadog のサービスやチームにどのようにリンクされるかについての詳細は、[検出結果を Datadog のサービスおよびチームにリンクする][18] を参照してください。

各行は、一意のライブラリとバージョンの組み合わせを表します。各組み合わせは、ページ上部のフィルターで選択された特定のコミットとブランチに関連付けられています (デフォルトでは、選択したリポジトリのデフォルトブランチの最新コミットが表示されます)。

脆弱性のあるライブラリをクリックすると、修復手順に関する情報が含まれるサイドパネルが開きます。

<!-- {{< img src="code_security/software_composition_analysis/sca-violation.png" alt="SCA 違反のサイドパネル" style="width:80%;">}} -->

### 修復 {#remediation}

Datadog SCA は、コーディングエージェントと [Bits Code][31] を使用して脆弱なライブラリの修正を適用することをサポートしています。また、[Bits Code 自動化][32] を使用して、脆弱性が検出された際やスケジュールするときに、修正を自動的に生成することもできます。

<div class="alert alert-info">Bits Code での SCA 修復には、ライブラリのアップグレードを適用するためにインターネットアクセスが必要です。インターネットアクセスを構成するには、<a href="/bits_ai/bits_code/setup/#configure-internet-access">インターネットアクセスの構成</a> を参照してください。</div>

脆弱性を表示し、修復するには:

1. Datadog で、[{{< ui >}}Security{{< /ui >}}] > [{{< ui >}}Code Security{{< /ui >}}] > [{{< ui >}}Vulnerabilities{{< /ui >}}][11] に移動し、[{{< ui >}}Libraries (SCA){{< /ui >}}] を選択します。
2. 脆弱性を選択すると、その検出結果と影響を受けるライブラリに関する詳細が表示されたサイドパネルが開きます。
3. [{{< ui >}}Next Steps{{< /ui >}}] > [{{< ui >}}Remediation{{< /ui >}}] セクションで、[{{< ui >}}Remediate with AI{{< /ui >}}] をクリックします
4. Bits Code または別のコーディングエージェントを選択してください。Bits Code では、以下から選択できます。
   - [{{< ui >}}Single fix{{< /ui >}}](#single-fix): この脆弱なライブラリの修正を生成します
     - 修正がすでに生成されている場合は、[{{< ui >}}View fix and create PR{{< /ui >}}] を選択して既存の[修復セッション](#remediation-session-details)を表示してください。
   - [{{< ui >}}Create automation{{< /ui >}}](#create-automation): [Bits Code 自動化][32] を作成できるポップアップモーダルが開きます

#### Single fix {#single-fix}

**Single fix** を使用して Bits Code セッションを開き、この単一の脆弱性を修正します。提案された差分を確認し、フォローアップの質問を行い、パッチを編集し、プルリクエストを作成してソースコードリポジトリに修復を適用できます。

すべての Bits Code セッションは、[{{< ui >}}Bits AI{{< /ui >}}] > [{{< ui >}}Bits Code{{< /ui >}}] > [{{< ui >}}Sessions{{< /ui >}}][33] で表示できます。

#### 自動化の作成 {#create-automation}

**自動化の作成**を使用して、SCA 脆弱性の修正を自動的に生成する [Bits Code 自動化][32] を作成します (脆弱性が発見されたタイミング、またはスケジュール設定に基づいて実行されます)。

このオプションを選択すると、{{< ui >}}Automate with Bits{{< /ui >}} アクションが事前入力された {{< ui >}}Remediate SCA vulnerabilities{{< /ui >}} モーダルが開きます。トリガーと出力を指定するなど、フォームに記入し、[{{< ui >}}Create Automation{{< /ui >}}] をクリックします。アクション、トリガー、および出力の詳細については、[自動化][32] を参照してください。

すべての Bits Code 自動化は、[{{< ui >}}Bits AI{{< /ui >}}] > [{{< ui >}}Bits Code{{< /ui >}}] > [{{< ui >}}Automations{{< /ui >}}][34] で表示することができます。

#### 修復セッションの詳細 {#remediation-session-details}

各 Bits Code セッションには、AI が生成した修正のライフサイクルが表示されるため、マージ前に変更を確認および検証できます。たとえば以下のものが含まれます。

- 元のセキュリティ検出結果と提案されたコード変更
- Bits Code がその修正を生成した方法と理由の説明
- パッチが安全にデプロイできることを検証するための CI 結果 (有効な場合)
- 修正を調整するためのオプションや、{{< ui >}}Create PR{{< /ui >}} を使用してソースコードリポジトリに変更を適用します

また、[**セッション**][33] ですべての修復セッションを表示することもできます。

#### Cursor で修正する {#fix-with-cursor}
Bits Code の代わりに、Cursor などの AI コーディングエージェントを使用して修正を生成することもできます。

1. [{{< ui >}}Remediate with AI{{< /ui >}}] ダイアログで、[{{< ui >}}Coding agent{{< /ui >}}] タブを選択してください。
2. [{{< ui >}}Generate your fix directly from Claude Code, Codex, or Cursor{{< /ui >}}] で、[{{< ui >}}Fix with Cursor{{< /ui >}}] の横にある [{{< ui >}}Open{{< /ui >}}] をクリックします。Datadog は、脆弱性に対する推奨ライブラリのアップグレードを含む調整されたプロンプトで Cursor を開きます。

別のエージェントを使用するには、[{{< ui >}}Copy fix prompt{{< /ui >}}] の横にある [{{< ui >}}Copy{{< /ui >}}] をクリックし、選択したエージェントにプロンプトを貼り付けます。

このフローは、脆弱性のサイドパネルの [{{< ui >}}Remediation{{< /ui >}}] セクション、または [{{< ui >}}Repositories{{< /ui >}}] テーブルから開始できます。テーブルの各行は、脆弱なライブラリを含むリポジトリまたはファイルを表しています。

Cursor ディープリンクを処理するには、[VS Code および Cursor 用の Datadog 拡張機能](/ide_plugins/vscode/?tab=cursor)をインストールしてください。

{{< img src="code_security/software_composition_analysis/fix-with-cursor.png" alt="[Fix with Cursor] (Cursor で修正する) および [Copy fix prompt] (修正プロンプトをコピーする) オプションが表示されている、[Coding agent] (Coding エージェント) タブが選択された [Remediate with AI] ダイアログ" style="width:100%;" >}}

### PR Gates でリスクの高い変更を自動的にブロックする {#automatically-block-risky-changes-with-pr-gates}

[PR ゲート][16] を使用して、変更がマージされる前に、オープンソースライブラリのセキュリティ基準を強制してください。Datadog は、各プルリクエストで導入された依存関係をスキャンし、構成された重大度しきい値を超える脆弱性やライセンス違反を特定して、GitHub または Azure DevOps に合格または不合格のステータスを報告します。

PR ゲートがブロックするように構成できる項目は以下のとおりです。
- **セキュリティ脆弱性**: 構成された重大度しきい値を超える既知の CVE を持つライブラリ。
- **ライセンス違反**: 組織のポリシーに準拠していないライセンスを使用しているライブラリ。

PR ゲートは、開発者がその PR で新しい違反を導入した場合にのみ、PR チェックを失敗としてマークします。PR ブランチが作成される前にコードベースにすでに存在していた違反は、チェックが失敗する原因にはなりません。デフォルトでは、失敗したチェックは情報として扱われ、マージをブロックしませんが、GitHub または Azure DevOps でブロックするように構成することで、重大な問題が検出された場合にマージを防止できます。セットアップ手順については、[PR ゲートルールのセットアップ][17]を参照してください。

### ライブラリインベントリを管理する {#manage-your-library-inventory}

[ライブラリインベントリ][8] は、コードベース全体で検出されたサードパーティライブラリの可視性を提供します。Datadog は、以下のソースからこの情報を収集します。

* **Static SCA**: リポジトリ内で参照されているすべてのライブラリを特定します。および
* **Runtime SCA**: 実行時にサービスによって実際にロードおよび使用されているライブラリを検出します。

Library Inventory を使用して、どの依存関係があるか、それらがどこで使用されているか、また、既知の脆弱性やライセンスリスクが含まれているかどうかを把握します。

インベントリがどのように生成されるか、静的データとランタイムデータがどのように異なるか、およびライブラリの詳細 (使用状況、脆弱性、ライセンス、バージョン、OpenSSF スコア) を解釈する方法の詳細については、[ライブラリインベントリ][14] を参照してください。

### ソフトウェア部品表 (SBOM) をエクスポートする {#export-a-software-bill-of-materials}

[ライブラリインベントリ][8] から直接、サードパーティライブラリの SBOM をエクスポートします。エクスポートされた SBOM には、静的 (Static SCA を使用) および実行時 (Runtime SCA を使用) に検出されたライブラリが含まれており、ソフトウェアサプライチェーン全体を 1 つの包括的なビューで確認できます。

Datadog は、以下の SBOM 形式をサポートしています。

- **CycloneDX 1.6**
- **SPDX 2.3**

エクスポートされた SBOM を使用して、依存関係データをダウンストリームのコンシューマーと共有したり、コンプライアンスや規制要件を満たしたり、他のサプライチェーンツールにフィードしたりできます。

SBOM の生成およびダウンロード方法の詳細については、[ライブラリインベントリ][29] を参照してください。

### CVE カタログ全体を探索する {#explore-the-full-cve-catalog}

[CVE エクスプローラー][15] を使用して、Datadog が追跡するすべての CVE およびセキュリティアドバイザリを検索できます (環境に影響を与えないものも含まれます)。これにより、新たに公開された脆弱性が検出結果に出現する前に、それらへの露出を評価できます。

スキャンされたリポジトリやサービスで検出されたパッケージに影響を与える CVE については、Datadog が自動的に「影響あり」とマークします。スキャンされていないアセットには、影響ステータスは表示されません。

各 CVE について、重大度スコア、エクスプロイトの可用性、EPSS スコア、CISA KEV ステータス、影響を受けるパッケージ、および修正バージョンを確認できます。詳細については、[CVE エクスプローラー][27] を参照してください。

### 検出結果からチケットを作成する {#create-tickets-from-findings}

任意の検出結果から直接 Jira または ServiceNow で双方向チケットを作成し、既存のワークフローで問題を追跡および修正できます。チケットのステータスは、Datadog とチケットツールとの間で同期が維持されます。詳細については、[チケットインテグレーション][19] を参照してください。

<div class="alert alert-info">チケット作成は、リポジトリで検出されたライブラリの脆弱性検出結果 (Static SCA) に対してのみ利用可能です。実行中のサービスでのみ検出された結果は、チケット作成をサポートしていません。</div>

### 検出結果のミュート {#mute-findings}

検出結果を抑制するには、検出結果詳細パネルの [{{< ui >}}Mute{{< /ui >}}] をクリックします。これにより、タグ値 (例: `repository`) によるコンテキスト対応のフィルタリングのために、[自動化ルールを作成][20] できるワークフローが開きます。検出結果をミュートすると、その発見は非表示になり、レポートから除外されます。

<div class="alert alert-info">ミュートは、リポジトリで検出されたライブラリの脆弱性の検出結果に対してのみ利用可能です (Static SCA)。実行中のサービスでのみ検出された検出結果はミュートできません。</div>

ミュートされた検出結果を復元するには、詳細パネルの [{{< ui >}}Unmute{{< /ui >}}] をクリックします。[脆弱性エクスプローラー][11] の {{< ui >}}Status{{< /ui >}} フィルターを使用して、ミュートされた検出結果を確認することもできます。

### APM におけるライブラリの脆弱性コンテキスト {#library-vulnerability-context-in-apm}

SCA は、現在の脆弱性アドバイザリと一致するライブラリにフラグを立てることで、Application Performance Monitoring (APM) がすでに収集している情報を強化します。潜在的に脆弱なサービスは、[APM カタログ][10] の Security ビューで直接強調表示されます。

## SCA ビューの理解 {#understanding-sca-views}

リポジトリエクスプローラーと脆弱性エクスプローラーは、補完的でありながら異なる目的を果たします。

リポジトリエクスプローラーは、スキャン時に検出されたライブラリと脆弱性の時点のスナップショットを反映します。これは、特定のコミット時にどのライブラリがリポジトリ内に存在していたか、およびスキャン時に判明していた脆弱性を示します。このビューは、スキャン実行後に新しいアドバイザリが公開されても、遡及的に更新されることはありません。

脆弱性エクスプローラーは、最新のアドバイザリデータベースと継続的に照合されるライブビューを提供します。リポジトリスキャンの後に新しい脆弱性アドバイザリが公開された場合、リポジトリが再スキャンされていない場合や、前回のスキャンが古いコミットで行われた場合でも、そのアドバイザリは自動的に脆弱性エクスプローラーに表示されます。これにより、脆弱性の露出状況が常に最新の状態に保たれます。

<div class="alert alert-info"><b>例</b>: 午前 10:00 にスキャンが実行され、リポジトリ内のライブラリに関する CVE アドバイザリが午後 4:00 に公開された場合、そのコミットのリポジトリエクスプローラーには CVE は表示されませんが、脆弱性エクスプローラーには Datadog のデータベースでアドバイザリが利用可能になり次第、反映されます。</div>

### 遡及的なアドバイザリ照合 {#retroactive-advisory-matching}

Datadog は、新しく公開されたアドバイザリを、過去のスキャンから保存されているライブラリインベントリと継続的に照合します。これにより、元のリポジトリエクスプローラーのスナップショットを変更することなく、脆弱性エクスプローラー内の脆弱性レコードが更新されます。これは以下を意味します。

- 新しく公開された CVE を脆弱性エクスプローラーに表示するために、新しいスキャンをトリガーする必要はありません。
- 脆弱性エクスプローラーは、古いコミットであっても、最後に確認されたライブラリインベントリに基づいて最新のリスクを反映します。
- リポジトリエクスプローラーは、スキャン時に判明していた内容を記録した固定の時点レコードであり、新しいアドバイザリが公開されても更新されません。

### 脆弱性ライフサイクル {#vulnerability-lifecycle}

Datadog は、SCA 脆弱性が検出された場所に応じて、異なる方法で追跡します。**Static SCA** の検出結果のスコープは **リポジトリ** であり、リポジトリスキャンに基づいています。**Runtime SCA** の検出結果のスコープは **サービス** であり、実行中のサービスによって読み込まれ使用されているライブラリに基づいています。

Datadog が関連するスコープ内で脆弱なライブラリを検出すると、脆弱性がオープンされます。Datadog がその製品のライフサイクルルールに従って脆弱性を検出しなくなると、脆弱性がクローズされます。

| 製品 | スコープ | シナリオ | 脆弱性がオープンされるタイミング | 脆弱性がクローズされるタイミング |
|---|---|---|---|---|
| Static SCA | リポジトリ | リポジトリスキャン | Datadog がスキャンされたリポジトリ内で脆弱なライブラリを検出します。| 最新のスキャン済みコミットで脆弱性が検出されませんでした。|
| Runtime SCA | サービス | 長時間実行サービス | Datadog が実行中のサービスで脆弱なライブラリを検出します。| 1 日後、脆弱性が再度検出されず、かつ脆弱性が検出されたすべての環境でサービスが実行されている場合。|
| Runtime SCA | サービス | サービスライフサイクルの後半で読み込まれたライブラリ | Datadog が実行中のサービスで脆弱なライブラリを検出します。| 5 日後、その期間中に脆弱性が再度検出されなかった場合。|
| Runtime SCA | サービス | 短時間のサービスまたはジョブ | Datadog が実行中のサービスで脆弱なライブラリを検出します。| 5 日後、その期間中に脆弱性が再度検出されなかった場合。|

## SCA 言語サポート {#sca-language-support}

Software Composition Analysis (SCA) は、以下の言語をサポートしています。

{{< card-grid image_width="80" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/python_avatar.svg" alt="python" image_width="50" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/javascript_large.png" alt="javascript" image_width="50" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/java_avatar.svg" alt="java" image_width="50" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/golang-avatar.png" alt="go" image_width="60" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/ruby_avatar.svg" alt="ruby" image_width="50" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/php_opcache.png" alt="php" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/rust.png" alt="rust" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/cpp.png" alt="C++" image_width="60" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/dart.svg" alt="dart" image_width="50" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/swift_avatar.svg" alt="swift" image_width="50" >}}
{{< /card-grid >}}

## 構成をカスタマイズする {#customize-your-configuration}

Static SCA 分析からパスを除外するには、Datadog 内または `code-security.datadog.yaml` ファイルで `ignore-paths` を構成してください。SCA 構成の完全なリファレンスについては、[Software Composition Analysis (SCA) 構成][30] を参照してください。構成場所、優先順位、マージの詳細については、[Code Security 構成リファレンス][28] を参照してください。

## 次のステップ {#next-steps}

1. リポジトリをスキャンするには、[Static SCA をセットアップ][1]してください。
2. 実行中のサービスによって読み込まれたライブラリを検出するには、[Runtime SCA をセットアップ][2]してください。
3. [脆弱性エクスプローラー][11]で検出結果を確認し、トリアージします。
4. リスクのある変更がマージされる前にブロックするには、[PR ゲート][16]を構成してください。
5. [CVE エクスプローラー][15]を使用して、新たに公開された脆弱性への露出を事前に評価します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/security/code_security/software_composition_analysis/setup_static/
[2]: /ja/security/code_security/software_composition_analysis/setup_runtime/
[3]: https://app.datadoghq.com/security/appsec/vm
[8]: https://app.datadoghq.com/security/appsec/inventory/libraries
[9]: /ja/account_management/rbac/permissions/#integrations
[10]: https://app.datadoghq.com/services?lens=Security
[11]: https://app.datadoghq.com/security/appsec/vm/library
[12]: https://app.datadoghq.com/ci/code-analysis
[13]: /ja/security/code_security/software_composition_analysis/setup_static/#upload-third-party-sbom-to-datadog
[14]: /ja/security/code_security/software_composition_analysis/library_inventory
[15]: https://app.datadoghq.com/security/code-security/detection-coverage/advisories
[16]: /ja/pr_gates/
[17]: /ja/pr_gates/setup
[18]: /ja/security/code_security/software_composition_analysis/setup_static/?tab=github#link-findings-to-datadog-services-and-teams
[19]: /ja/security/ticketing_integrations
[20]: /ja/security/automation_pipelines/mute
[21]: https://nvd.nist.gov/
[22]: https://docs.github.com/en/code-security/concepts/vulnerability-reporting-and-management/about-the-github-advisory-database
[23]: https://google.github.io/osv.dev/data/
[24]: https://github.com/pypa/advisory-database
[25]: https://github.com/cloudsecurityalliance/gsd-database
[26]: https://github.com/DataDog/guarddog
[27]: /ja/security/code_security/software_composition_analysis/cve_explorer/
[28]: /ja/security/code_security/guides/configuration/
[29]: /ja/security/code_security/software_composition_analysis/library_inventory/#export-a-software-bill-of-materials-sbom
[30]: /ja/security/code_security/software_composition_analysis/configuration/
[31]: /ja/bits_ai/bits_code
[32]: /ja/bits_ai/bits_code/automations
[33]: https://app.datadoghq.com/code
[34]: https://app.datadoghq.com/code/automations