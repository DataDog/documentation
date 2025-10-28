---
algolia:
  tags:
  - static analysis
  - datadog static analysis
  - コード品質
  - SAST
aliases:
- /ja/code_analysis/static_analysis
description: Datadog Static Code Analysis について学ぶことで、コードが本番環境に到達する前に、コードの品質問題やセキュリティ脆弱性をスキャンすることができます。
is_beta: false
title: Static Code Analysis (SAST)
---

{{% site-region region="gov" %}}
<div class="alert alert-warning">
    {{< region-param key="dd_site_name" >}} サイトでは Code Security をご利用いただけません。
</div>
{{% /site-region %}}


## 概要

Static Code Analysis は、Datadog の Static Application Security Testing (SAST) 機能です。SAST は、プログラムを実行することなく本番前のコードを解析するクリアボックス型のソフトウェアテスト手法です。 

Static Code Analysis は、ソフトウェア開発ライフサイクル (SDLC) の早い段階でセキュリティ脆弱性や保守性の問題を特定することで、最高品質かつ最も安全なコードだけが本番環境に到達するよう支援します。組織にも次のようなメリットをもたらします。 

* アプリケーションが、本番環境にコードが到達する前に SAST スキャンによって新しい脆弱性を検出できるため、時間の経過とともにセキュリティ侵害に対してより強固になります。 
* 組織のコード規約を守るための手探り作業を減らし、開発チームが開発速度を大きく損ねることなく、コンプライアンスを満たすコードを出荷できるようにします。 
* Static Code Analysis により、組織は時間の経過とともにより可読性の高いコードベースを維持できるため、新たな開発者をより早くオンボードできます。 

## Static Code Analysis のセットアップ 

Static Code Analysis は、以下の言語や技術におけるセキュリティ脆弱性や不適切なコーディング慣行のスキャンをサポートします。 

{{< partial name="code_security/languages-getting-started.html" >}}

<!-- </br> -->
スキャンは CI/CD パイプラインを介して、または Datadog 上でホストされたスキャン (GitHub 専用) として直接実行できます。
始めるには、[**Code Security** セットアップページ][12]または[セットアップのドキュメント][9]を参照してください。

## 開発ライフサイクルへの統合

### ソースコード管理
{{< whatsnext desc="GitHub でコードレビューを行う際、Datadog はプルリクエストの関連する行にインラインレビューコメントを追加し、Static Code Analysis の違反を自動的にフラグ付けします。適用可能な場合、Datadog はプルリクエスト内で直接適用できる修正案も提示します。また、Datadog から直接プルリクエストを開き、脆弱性や品質に関する問題を修正することも可能です。" >}}
    {{< nextlink href="static_analysis/github_pull_requests" >}}GitHub のプルリクエスト{{< /nextlink >}}
{{< /whatsnext >}}

### IDE
{{< whatsnext desc="ファイルを統合開発環境 (IDE) で編集している際、リアルタイムでコードの脆弱性を特定できます。詳細については、以下のインテグレーション固有のドキュメントを参照してください:" >}}
    {{< nextlink href="developers/ide_plugins/idea/" >}}Datadog プラグイン (JetBrains IDE 向け) {{< /nextlink >}}
    {{< nextlink href="developers/ide_plugins/vscode/#static-analysis" >}}Datadog 拡張機能 (Visual Studio Code 向け) {{< /nextlink >}}
    {{< nextlink href="developers/ide_plugins/visual_studio/#static-analysis" >}}Datadog 拡張機能 (Visual Studio 向け) {{< /nextlink >}}
{{< /whatsnext >}}

## 結果の検索とフィルタリング
Static Code Analysis を設定すると、スキャン対象のリポジトリへの各コミット時にスキャンが実行されます。違反は [**Code Security Repositories** ページ][1]でリポジトリごとに要約されます。リポジトリをクリックすると、Static Code Analysis による **Code Vulnerabilities** と **Code Quality** の結果を確認できます。

* **Code Vulnerabilities** タブには、Datadog の [Security カテゴリ][2]で検出された違反が含まれます。
* **Code Quality** タブには、Datadog の [Best Practices、Code Style、Error Prone、Performance カテゴリ][3]で検出された違反が含まれます。

結果をフィルタリングするには、リストの左側にあるファセットを使用するか、検索を行ってください。結果はサービスまたはチームのファセットで絞り込むことができます。結果が Datadog のサービスやチームにどのように関連付けられるかの詳細は、[Code Security を始める][11]を参照してください。

各行は 1 件の違反を表します。違反は、ページ上部のフィルタで選択された特定のコミットおよびブランチに紐付けられます (デフォルトでは、表示しているリポジトリのデフォルトブランチ上の最新コミットが表示されます)。

違反をクリックすると、違反の範囲や起点に関する情報を含むサイドパネルが開きます。

<!-- {{< img src="code_security/static_analysis/static-analysis-violation.png" alt="静的解析違反のサイドパネル" style="width:80%;">}} -->

違反の内容は以下のタブで表示されます。

- **Details**: 違反の説明と原因となったコード行が表示されます。問題のあるコードスニペットを参照するには、[Datadog GitHub App][4] を設定してください。
- **Remediation**: 違反を解消するための 1 つ以上の修正案と、その修正オプションが表示されます。
- **Event**: 違反に関する JSON メタデータです。

## カスタマイズ設定
リポジトリまたは組織全体で、どの Static Code Analysis ルールを設定するかをカスタマイズする場合は、[セットアップのドキュメント][8]を参照してください。

## Link results to Datadog services and teams

### サービスへの結果の関連付け
Datadog は、コードやライブラリのスキャン結果を関連するサービスに紐付けるために、以下の仕組みを利用します:

1. [Software Catalog を用いてサービスに紐付くコードの場所を特定](#identifying-the-code-location-in-the-software-catalog)
2. [追加の Datadog 製品内でのファイル使用パターンを検出する](#detecting-file-usage-patterns)
3. [ファイルパスやリポジトリ名からサービス名を検索する](#detecting-service-name-in-paths-and-repository-names)

いずれかの方法で成功すれば、それ以上のマッピングは行われません。各マッピング手法の詳細は以下をご覧ください。

#### Software Catalog でコードの場所を特定する

[Software Catalog のスキーマバージョン `v3`][12] 以降では、サービスに紐付くコードの場所を設定できます。`codeLocations` セクションで、コードを含むリポジトリの場所と関連するパスを指定します。

`paths` 属性には、リポジトリ内のパスにマッチする glob のリストを指定します。

{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
apiVersion: v3
kind: service
metadata:
name: my-service
datadog:
codeLocations:
- repositoryURL: https://github.com/myorganization/myrepo.git
paths:
- path/to/service/code/**
{{< /code-block >}}


## 修復

### 提示された修正案を適用する
<!-- {{< img src="code_security/static_analysis/static-analysis-fixes.png" alt="静的コード解析違反に対する修正タブ" style="width:80%;" >}} -->

Datadog Static Code Analysis には、次の 2 種類の修正案が存在します。

1. **Deterministic Suggested Fix**: リンティング問題のような単純な違反に対しては、ルールアナライザがあらかじめ用意したテンプレート修正を自動的に提示します。
2. **AI-suggested Fix:** 複雑な違反については、事前に修正案が用意されていないことが一般的です。その場合、OpenAI の GPT-4 を使用した AI ベースの修正案を利用できます。「Text」と「Unified Diff」のいずれかを選択すると、違反解消に向けた手順をテキストで提示するか、コード変更 (差分) を提示するかを選ぶことができます。*この機能はオプトインです。*

<!– {{< img src="code_security/static_analysis/static-analysis-default-fix.png" alt="デフォルトの静的解析修正案を示すビジュアル" style="width:60%;" >}}

{{< img src="code_security/static_analysis/static-analysis-ai-fix.png" alt="AI による静的解析修正案を示すビジュアル" style="width:60%;" >}} –>

### Datadog から直接脆弱性や品質問題を修正する

<!-- {{< img src="ci/sast_one_click_light.png" alt="Code Security のワンクリック修正例" style="width:90%;" >}} -->

Datadog 上で検出された Static Code Analysis の違反を修正するには、大きく 2 つの方法があります。

#### プルリクエストを開く

GitHub アプリの **Pull Requests** 権限を Read & Write に設定している場合、利用可能な修正案がある全ての Static Code Analysis の検出結果においてワンクリック修正が可能です。GitHub インテグレーションの設定については [GitHub のプルリクエスト][10]を参照してください。

脆弱性を修正し、プルリクエストを開くには次の手順に従います。
1. Code Security で特定の SAST 結果を表示します。
2. 結果のサイドパネルで **Fix Violation** をクリックします。
3. **Open a Pull Request** を選択します。
4. プルリクエストタイトルとコミットメッセージを入力します。
5. **Create PR** をクリックします。

#### 現在のブランチに直接コミットする
違反が検出されたブランチに直接コミットを行うことで脆弱性を修正できます。

提案修正をコミットするには

1. Code Security で特定の SAST 結果を表示します。
2. 結果のサイドパネルで **Fix Violation** をクリックします。
3. **Commit to current branch** をクリックします。

## 誤検知を報告する
特定の違反が誤検知 (False Positive) だと考えられる場合は、「False Positive」として理由を添えてフラグを立てられます。この報告は直接 Datadog に送信され、定期的にレビューされてルールセットの品質向上に役立てられます。

<!-- {{< img src="code_security/static_analysis/flag-false-positive.png" alt="Static Code Analysis の違反を誤検知として報告するためのボタン" style="width:60%;" >}} -->

<!-- ## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}} -->

[1]: https://app.datadoghq.com/ci/code-analysis
[2]: /ja/security/code_security/static_analysis_rules?categories=Security
[3]: /ja/security/code_security/static_analysis_rules?categories=Best+Practices&categories=Code+Style&categories=Error+Prone&categories=Performance
[4]: /ja/integrations/github/
[6]: https://en.wikipedia.org/wiki/Camel_case
[7]: https://en.wikipedia.org/wiki/Snake_case
[8]: /ja/security/code_security/static_analysis/setup/#customize-your-configuration
[9]: /ja/security/code_security/static_analysis/setup
[10]: /ja/security/code_security/dev_tool_int/github_pull_requests/
[11]: /ja/getting_started/code_security/
[12]: https://app.datadoghq.com/security/configuration/code-security/setup