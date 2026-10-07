---
algolia:
  tags:
  - static analysis
  - datadog static analysis
  - code quality
  - SAST
aliases:
- /ja/code_analysis/static_analysis
description: Datadog Static Code Analysis について学ぶことで、コードが本番環境に到達する前に、コードの品質問題やセキュリティ脆弱性をスキャンすることができます。
further_reading:
- link: https://www.datadoghq.com/blog/secure-your-github-ecosystem/
  tag: ブログ
  text: 'CI/CD Security: GitHub エコシステムを保護する方法'
- link: https://www.datadoghq.com/blog/bitsai-dev-agent-code-security
  tag: ブログ
  text: Code Security 向け Bits Code のご紹介
- link: https://www.datadoghq.com/blog/code-security-secret-scanning
  tag: ブログ
  text: Datadog Secret Scanning を使用して、公開された認証情報を検出およびブロックする
- link: https://www.datadoghq.com/blog/using-llms-to-filter-out-false-positives/
  tag: ブログ
  text: LLM を使用して Static Code Analysis から誤検知を除外する
is_beta: false
title: Static Code Analysis (SAST)
---
{{% site-region region="gov,gov2" %}}
<div class="alert alert-warning">
    Code Security は、このサイトでは利用できません。 {{< region-param key="dd_site_name" >}} Code Security は、このサイトでは利用できません。
</div>
{{% /site-region %}}


## 概要{#overview}

Static Code Analysis は、Datadog の Static Application Security Testing (SAST) 機能です。SAST は、プログラムを実行することなく本番前のコードを解析するクリアボックス型のソフトウェアテスト手法です。

Static Code Analysis は、ソフトウェア開発ライフサイクル (SDLC) の早い段階でセキュリティ脆弱性や保守性の問題を特定することで、最高品質かつ最も安全なコードのみが本番環境に到達するよう支援します。組織にも次のようなメリットをもたらします。

* アプリケーションが、本番環境にコードが到達する前に SAST スキャンによって新しい脆弱性を検出できるため、時間の経過とともにセキュリティ侵害に対してより強固になります。
* 組織のコード規約を守るための手探り作業を減らし、開発チームが開発速度を大きく損ねることなく、コンプライアンスを満たすコードを出荷できるようにします。
* Static Code Analysis により、組織は時間の経過とともにより可読性の高いコードベースを維持できるため、新たな開発者をより早くオンボードできます。

## Static Code Analysis のセットアップ{#set-up-static-code-analysis}

Static Code Analysis は、以下の言語や技術におけるセキュリティ脆弱性や不適切なコーディング慣行のスキャンをサポートします。

{{< card-grid card_width="130px" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=Python" src="integrations_logos/python_avatar.svg" alt="python" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=JavaScript" src="integrations_logos/javascript_large.png" alt="javascript" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=TypeScript" src="integrations_logos/typescript_large.svg" alt="typescript" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=Java" src="integrations_logos/java_avatar.svg" alt="java" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=CSharp" src="integrations_logos/dotnet_avatar.svg" alt="c sharp" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=Go" src="integrations_logos/golang-avatar.png" alt="go" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=Ruby" src="integrations_logos/ruby_avatar.svg" alt="ruby" image_width="60" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=PHP" src="integrations_logos/php_opcache.png" alt="php" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=Docker" src="integrations_logos/docker_avatar.svg" alt="docker" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=YAML" src="integrations_logos/yaml.png" alt="yaml" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=Kotlin" src="integrations_logos/kotlin.png" alt="kotlin" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=Elixir" src="integrations_logos/elixir.png" alt="elixir" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=Apex" src="integrations_logos/salesforce_large.svg" alt="apex" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=Swift" src="integrations_logos/swift_large.svg" alt="swift" >}}
  {{< image-card href="/security/code_security/static_analysis/setup/?tab=circleciorbs#upload-third-party-static-analysis-results-to-datadog" src="integrations_logos/datadog_avatar.svg" alt="その他" >}}
{{< /card-grid >}}

スキャンは、CI/CD パイプライン経由で実行することも、Datadog のホスト型スキャンを使用して直接実行することもできます。 
開始するには、[{{< ui >}}Code Security{{< /ui >}} セットアップページ][12]に移動するか、「[セットアップドキュメント][9]」を参照してください。

## 開発ライフサイクルにインテグレーションする{#integrate-into-the-development-lifecycle}

### ソースコード管理{#source-code-management}
{{< whatsnext desc="コードレビュー中、Datadog はプルリクエスト内の関連するコード行にインラインレビューコメントを追加することで、静的コード解析の違反を自動的にフラグ付けできます。これは、GitHub、GitLab、および Azure DevOps リポジトリ (クラウドホスト型) でサポートされています。該当する場合、Datadog はプルリクエスト内で直接適用できる修正案も提供します。" >}}
    {{< nextlink href="static_analysis/github_pull_requests" >}}プルリクエスト{{< /nextlink >}}
{{< /whatsnext >}}

### IDE{#ides}
{{< whatsnext desc="統合開発環境 (IDE) でファイルを編集しながら、リアルタイムでコードの脆弱性を特定できます。詳細については、各統合機能のドキュメントを参照してください。">}}
    {{< nextlink href="ide_plugins/idea/code_security/" >}}JetBrains IDE 用 Datadog プラグイン{{< /nextlink >}}
    {{< nextlink href="ide_plugins/vscode/code_security/" >}}Visual Studio Code および Cursor 用 Datadog 拡張機能{{< /nextlink >}}
{{< /whatsnext >}}

## 結果を検索してフィルターする{#search-and-filter-results}
Static Code Analysis をセットアップすると、対象リポジトリへのコミットごとにスキャンが実行されます。違反はリポジトリごとに [{{< ui >}}Code Security Repositories{{< /ui >}} ページ][1] にまとめられます。リポジトリをクリックすると、Static Code Analysis からの {{< ui >}}Code Vulnerabilities{{< /ui >}} および {{< ui >}}Code Quality{{< /ui >}} 結果を分析できます。

* [{{< ui >}}Code Vulnerabilities{{< /ui >}}] タブには、[Security カテゴリー][2]における Datadog のルールによって検出された違反が表示されます。
[* {{< ui >}}Code Quality{{< /ui >}}] タブには、[Best Practices、Code Style、Error Prone、または Performance のカテゴリー][3]における Datadog のルールによって検出された違反が表示されます。

結果を絞り込むには、リストの左側にあるファセットを使用するか、検索を行ってください。結果は[サービスまたはチームのファセットでフィルタリング][13]できます。

各行が 1 つの違反を表しています。それぞれの違反は、ページ上部のフィルターで選択された特定のコミットおよびブランチに関連付けられています (デフォルトでは、表示中のリポジトリのデフォルトブランチにおける最新コミットの結果が表示されます)。

違反をクリックすると、違反の範囲と発生場所に関する情報を含むサイドパネルが開きます。

<!-- {{< img src="code_security/static_analysis/static-analysis-violation.png" alt="Static Analysis 違反のサイドパネル" style="width:80%;">}}  -->

違反の内容は以下のタブに表示されます。

- {{< ui >}}Details{{< /ui >}}: 違反の説明と、その原因となったコード行。問題のあるコードスニペットを確認するには、ご利用のプロバイダー ([GitHub][4]、[GitLab][5]、Azure[6]) に合わせて適切なソースコード統合を設定してください。
- {{< ui >}}Remediation{{< /ui >}}: 違反を解消するための 1 つ以上の修正案と、その修正オプションが表示されます。
- {{< ui >}}Event{{< /ui >}}: 違反に関する JSON メタデータです。

### 誤検知を除外する{#filter-out-false-positives}
一部の SAST 脆弱性については、Bits AI がコンテキストを分析し、それが真の脆弱性か誤検知である可能性が高いかを判断するとともに、その理由を簡潔に説明します。

詳細については、「[AI を活用した Static Code Analysis][17]」を参照してください。

## 構成をカスタマイズする {#customize-your-configuration}
リポジトリまたは組織全体で、どの Static Code Analysis ルールを設定するかをカスタマイズする場合は、[セットアップのドキュメント][8]を参照してください。

## Datadog のサービスとチームに検出結果をリンクする{#link-findings-to-datadog-services-and-teams}
検出結果を Datadog サービスおよびチームにリンクする方法については、「[セットアップドキュメント][13]」を参照してください。

## 提示された修正案を適用する{#apply-suggested-fixes}
<!-- {{< img src="code_security/static_analysis/static-analysis-fixes.png" alt="Static Analysis 違反の [修正] タブ" style="width:80%;">}} -->

Datadog Static Code Analysis には、次の 2 種類の修正案が存在します。

1. **Deterministic Suggested Fix:** リンティング問題のような単純な違反に対しては、ルールアナライザがあらかじめ用意したテンプレート修正を自動的に提示します。
2. **AI-suggested Fix:** 複雑な違反の場合、あらかじめ修正案が用意されていないことが一般的です。その代わりに、OpenAI の GPT-4 を使用して修正案を生成する AI-suggested Fix 機能を利用できます。修正案の形式として {{< ui >}}Text{{< /ui >}} と {{< ui >}}Unified Diff{{< /ui >}} を選択でき、それぞれ違反を解消するためのプレーンテキストによる手順、あるいはコード変更内容が出力されます。

<!-- {{< img src="code_security/static_analysis/static-analysis-default-fix.png" alt="デフォルトの Static Analysis 推奨修正の視覚的インジケーター" style="width:60%;">}}

{{< img src="code_security/static_analysis/static-analysis-ai-fix.png" alt="AI Static Analysis 推奨修正の視覚的インジケーター" style="width:60%;">}} -->

### Datadog から直接脆弱性や品質問題を修正する{#fix-a-vulnerability-or-quality-issue-directly-from-datadog}

<!-- {{< img src="ci/sast_one_click_light.png" alt="Code Security のワンクリック修正の例" style="width:90%;" >}} -->

GitHub をソースコードマネージャーとして使用している場合、2 つの方法で Datadog から直接 SAST の問題を修正するコード変更をプッシュできます。

#### プルリクエストを開く{#open-a-pull-request}
GitHub アプリの {{< ui >}}Pull Requests{{< /ui >}} 権限が {{< ui >}}Read & Write{{< /ui >}} に設定されている場合、提案された修正があるすべての静的コード解析 (SAST) の結果でワンクリック修正が有効になります。

脆弱性を修正し、プルリクエストを開くには次の手順に従います。
1. Code Security で特定の SAST 結果を表示します。
2. 結果のサイドパネルで {{< ui >}}Fix Violation{{< /ui >}} をクリックします。
3. [{{< ui >}}Open a Pull Request{{< /ui >}}] を選択します。
4. プルリクエストタイトルとコミットメッセージを入力します。
5. [{{< ui >}}Create PR{{< /ui >}}] をクリックします。

#### 現在のブランチに直接コミットする{#commit-directly-to-the-current-branch}
違反が検出されたブランチに直接コミットを行うことで脆弱性を修正できます。

提案修正をコミットするには

1. Code Security で特定の SAST 結果を表示します。
2. 結果のサイドパネルで {{< ui >}}Fix Violation{{< /ui >}} をクリックします。
3. [{{< ui >}}Commit to current branch{{< /ui >}}] をクリックします。

### Cursor で修正する{#fix-with-cursor}
SAST の検出結果の修正を Cursor などの AI コーディングエージェントに引き継ぐことができます。

1. Code Security で特定の SAST 結果を表示します。
2. サイドパネルの [{{< ui >}}Next Steps{{< /ui >}} > {{< ui >}}Remediation{{< /ui >}}] セクションで、[{{< ui >}}Remediate with AI{{< /ui >}}] をクリックします。
3. {{< ui >}}Coding agent{{< /ui >}} タブを選択します。
4. {{< ui >}}Generate your fix directly from Claude Code, Codex, or Cursor{{< /ui >}} で、{{< ui >}}Fix with Cursor{{< /ui >}} の横にある {{< ui >}}Open{{< /ui >}} をクリックします。Datadog は、その検出結果に対するカスタマイズされた修正プロンプトを使用して Cursor を開きます。変更をコミットする前に、提案された変更を確認します。

別の AI コーディングエージェントを使用するには、[{{< ui >}}Copy fix prompt{{< /ui >}}] の横に表示される [{{< ui >}}Copy{{< /ui >}}] をクリックし、そのプロンプトを選択したエージェントに貼り付けます。

Cursor ディープリンクを処理するには、[VS Code および Cursor 用の Datadog 拡張機能](/ide_plugins/vscode/?tab=cursor)をインストールしてください。

{{< img src="code_security/static_analysis/fix-with-cursor.png" alt="Cursor で修正するおよび修正プロンプトをコピーするオプションが表示されている、Coding エージェントタブが選択された Remediate with AI ダイアログ" style="width:100%;" >}}

## 誤検知を報告する{#report-false-positives}
特定の違反が誤検知であると思われる場合は、理由を添えて誤検知としてフラグを立てることができます。これにより、レポートが Datadog に直接送信されます。提出された内容は定期的にレビューされ、ルールセットの品質が継続的に向上します。

<!-- {{< img src="code_security/static_analysis/flag-false-positive.png" alt="Static Code Analysis の違反を誤検知として報告するためのボタン" style="width:60%;">}} -->

## <!-- 参考資料

{{< partial name="whats-next/whats-next.html" >}} -->

[1]: https://app.datadoghq.com/ci/code-analysis
[2]: /ja/security/code_security/static_analysis_rules?categories=Security
[3]: /ja/security/code_security/static_analysis_rules?categories=Best+Practices&categories=Code+Style&categories=Error+Prone&categories=Performance
[4]: /ja/integrations/github/
[5]: /ja/integrations/gitlab-source-code/
[6]: https://en.wikipedia.org/wiki/Camel_case
[7]: https://en.wikipedia.org/wiki/Snake_case
[8]: /ja/security/code_security/static_analysis/setup/#customize-your-configuration
[9]: /ja/security/code_security/static_analysis/setup
[10]: /ja/security/code_security/dev_tool_int/github_pull_requests/
[11]: /ja/getting_started/code_security/
[12]: https://app.datadoghq.com/security/configuration/code-security/setup
[13]: /ja/security/code_security/static_analysis/setup/?tab=github#link-findings-to-datadog-services-and-teams
[14]: /ja/account_management/teams/
[15]: /ja/integrations/github/#connect-github-teams-to-datadog-teams
[16]: /ja/integrations/azure-devops-source-code/
[17]: /ja/security/code_security/static_analysis/ai_enhanced_sast/