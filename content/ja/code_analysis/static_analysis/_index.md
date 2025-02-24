---
algolia:
  tags:
  - static analysis
  - datadog static analysis
  - コード品質
  - SAST
aliases:
- /ja/continuous_integration/static_analysis
- /ja/static_analysis
description: Datadog Static Analysis について学ぶことで、コードが本番環境に到達する前に、コードの品質問題やセキュリティ脆弱性をスキャンすることができます。
further_reading:
- link: https://www.datadoghq.com/blog/monitor-ci-pipelines/
  tag: ブログ
  text: Datadog によるすべての CI パイプラインの監視
- link: /integrations/guide/source-code-integration/
  tag: ドキュメント
  text: ソースコードインテグレーションについて
is_beta: false
title: Static Analysis (SAST)
---

{{< callout url="#" btn_hidden="true" header="プレビューに参加してください！" >}}
Code Analysis はプレビュー版です。
{{< /callout >}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">
Code Analysis は {{< region-param key="dd_site_name" >}} サイトでは利用できません。
</div>
{{% /site-region %}}


## 概要

Static Analysis (SAST) は、プログラムを実行する必要がない状態で、本番前段階のコードを分析するクリアボックス型のソフトウェアテスト手法です。つまり、プログラムが実行されていないため「スタティック (静的)」です。

Static Analysis は、ソフトウェア開発ライフサイクル (SDLC) の早期段階で保守性の問題やセキュリティ脆弱性を特定するのに役立ち、本番環境に到達するコードが最高水準の品質とセキュリティを備えるようにします。セキュリティ脆弱性をスキャンする Static Analysis ツールは、Static Application Security Testing (SAST) ツールとも呼ばれます。

Static Analysis を使用することにより、組織には以下のような利点があります。

* Static Analysis は、組織のコード標準に準拠するためのあいまいさを排除し、開発チームが開発速度に大きな影響を与えることなくコンプライアンスを満たしたコードをリリースできるようにします。
* 組織のアプリケーションは、SAST スキャンによって新たな脆弱性が本番環境に到達する前に捕捉されるため、長期的にセキュリティ侵害に対して脆弱である可能性が低くなります。
* Static Analysis により組織では長期的により可読性の高いコードベースが維持されるため、組織に参加したばかりの新しい開発者はより迅速にオンボーディングできます。
* 組織のソフトウェアは、コードの保守性が高まることによって長期的に信頼性が高まり、開発者が新たな欠陥をコードに導入するリスクが最小化されます。

## Static Analysis のセットアップ

Static Analysis は、以下の言語およびテクノロジーで、望ましくないコーディング手法やセキュリティ脆弱性をスキャンすることをサポートします。

{{< partial name="code_analysis/languages-getting-started.html" >}}

</br>

開始するには、[**Code Analysis** ページ][1]で Static Analysis をセットアップするか、[セットアップドキュメント][9]を参照してください。

## Static Analysis をソフトウェア開発ライフサイクルに統合する

### CI プロバイダー
{{< whatsnext desc="任意の CI プラットフォームプロバイダーで Static Analysis を実行できます。CI パイプラインで Static Analysis を設定するためのプロバイダー固有のドキュメントを参照してください。" >}}
{{< nextlink href="code_analysis/static_analysis/circleci_orbs" >}}CircleCI Orbs{{< /nextlink >}}
{{< nextlink href="code_analysis/static_analysis/github_actions" >}}GitHub Actions{{< /nextlink >}}
{{< nextlink href="code_analysis/static_analysis/generic_ci_providers" >}}その他の CI プロバイダー{{< /nextlink >}}
{{< /whatsnext >}}

### ソースコード管理
{{< whatsnext desc="GitHub 上のコードレビュー時に、Datadog はプルリクエスト内で該当するコード行にインラインレビューコメントを追加することで、Static Analysis 違反を自動的にフラグ付けできます。該当する場合、Datadog はプルリクエスト内で直接適用可能な修正案も提供します。また、Datadog から直接プルリクエストを開いて、脆弱性や品質上の問題を修正することもできます。" >}}
{{< nextlink href="static_analysis/github_pull_requests" >}}GitHub プルリクエスト{{< /nextlink >}}
{{< /whatsnext >}}

### IDE
{{< whatsnext desc="統合開発環境 (IDE) 内でファイルを編集しながら、リアルタイムでコードの脆弱性を特定できます。詳細については、インテグレーション固有のドキュメントを参照してください。" >}}
{{< nextlink href="developers/ide_plugins/idea/" >}}JetBrains IDE 向け Datadog プラグイン{{< /nextlink >}}
{{< nextlink href="developers/ide_plugins/vscode/#static-analysis" >}}Visual Studio Code 向け Datadog 拡張機能{{< /nextlink >}}
{{< nextlink href="developers/ide_plugins/visual_studio/#static-analysis" >}}Visual Studio 向け Datadog 拡張機能{{< /nextlink >}}
{{< /whatsnext >}}

## 結果の検索とフィルタリング

Datadog Static Analyzer を実行するよう CI パイプラインを構成した後、違反事項は [**Code Analysis Repositories** ページ][1]でリポジトリごとに要約されます。リポジトリをクリックすると、Static Analysis による **Code Vulnerabilities** および **Code Quality** の結果を分析できます。

* **Code Vulnerabilities** タブには、[Security カテゴリー][2]で Datadog のルールによって検出された違反事項が表示されます。
* **Code Quality** タブには、[Best Practices、Code Style、Error Prone、Performance カテゴリー][3]に該当する Datadog のルールによって検出された違反事項が表示されます。

結果をフィルタリングするには、リストの左側にあるファセットを使用するか、検索を利用してください。結果はサービスまたはチームファセットでフィルタリングできます。結果が Datadog サービスおよびチームにどのようにリンクされているかについては、[Code Analysis の概要][11]を参照してください。

各行は 1 件の違反事項を表しています。各違反事項は、ページのトップのフィルターで選択された特定のコミットおよびブランチに関連付けられています (デフォルトでは、表示中のリポジトリのデフォルトブランチの最新コミットの結果が表示されます)。

違反事項をクリックすると、違反事項の範囲や発生元に関する情報を含むサイドパネルが開きます。
{{< img src="code_analysis/static_analysis/static-analysis-violation.png" alt="静的分析違反のサイドパネル" style="width:80%;">}}

違反事項の内容はタブで表示されます。

- **Details**: 違反事項の説明と、それを引き起こしたコード行が表示されます。不正なコードスニペットを表示するには、[Datadog GitHub App][4] を構成してください。
- **Remediation**: 違反事項を解消できる 1 つ以上のコード修正案が表示され、修正オプションを選択できます。
- **Event**: Static Analysis 違反イベントに関する JSON メタデータが表示されます。

### 提案修正の使用
{{< img src="code_analysis/static_analysis/static-analysis-fixes.png" alt="静的分析違反の Fixes タブ" style="width:80%;">}}

Datadog Static Analysis では、2 種類の提案修正があります。

1. **Default Suggested Fix**: リンティング問題のような単純な違反に対して、ルールアナライザーがあらかじめ定型化された修正案を自動的に提供します。
2. **AI Suggested Fix**: より複雑な違反については、事前に修正が利用できないことが多いため、AI Suggested Fixes を使用できます。これは、OpenAI の GPT-4 を用いて修正案を生成します。「Text」および「Unified Diff」の 2 種類を選択でき、それぞれプレーンテキストの指示またはコード変更として修正案を出力します。

これら 2 種類の修正案は、UI 上で異なるラベルによって視覚的に区別されます。

*Default Suggested Fixes:*
{{< img src="code_analysis/static_analysis/static-analysis-default-fix.png" alt="デフォルトの静的分析修正提案の視覚的インジケーター" style="width:60%;">}}

*AI Suggested Fixes:*
{{< img src="code_analysis/static_analysis/static-analysis-ai-fix.png" alt="AI による静的分析修正提案の視覚的インジケーター" style="width:60%;">}}

<div class="alert alert-warning">AI Suggested Fixes はプレビュー版です。アクセスをリクエストするには、<a href="/help/">サポート</a>にお問い合わせください。</div>

### Datadog から直接脆弱性や品質上の問題を修正する
{{< img src="ci/sast_one_click_light.png" alt="Code Analysis によるワンクリック修正例" style="width:90%;" >}}

Code Analysis で検出された問題を、Datadog 上の結果から直接コード変更をプッシュして修正するには、2 つの方法があります。

#### プルリクエストを開く場合
GitHub App の **Pull Requests** パーミッションが **Read & Write** に設定されている場合、利用可能な修正提案があるすべての Static Analysis 結果に対してワンクリック修正が有効になります。GitHub インテグレーションの設定方法については [GitHub プルリクエスト][10]を参照してください。

脆弱性を修正し、プルリクエストを開くには次の手順に従います。
1. Code Analysis で特定の結果を表示します。
2. 結果のサイドパネルで **Fix Violation** をクリックします。
3. **Open a Pull Request** を選択します。
4. プルリクエストタイトルとコミットメッセージを入力します。
5. **Create PR** をクリックします。

#### 現在のブランチに直接コミットする場合
また、結果が検出されたブランチに直接コミットして脆弱性を修正することもできます。

提案修正をコミットするには

1. Code Analysis で特定の結果を表示します。
2. 結果のサイドパネルで **Fix Violation** をクリックします。
3. **Commit to current branch** をクリックします。

### 構成のカスタマイズ

リポジトリで構成される Static Analysis ルールをカスタマイズするには、[セットアップドキュメント][8]を参照してください。

### 誤検出の報告
特定の違反が誤検出であると思われる場合は、誤検出としてフラグを立てることができます。この場合、フラグを立てる理由とともに、Datadog にレポートが送信されます。ルールセット品質を向上させるために、送信内容は定期的にレビューされます。

{{< img src="code_analysis/static_analysis/flag-false-positive.png" alt="Static Analysis 違反を誤検出として報告するためのボタン" style="width:60%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/code-analysis
[2]: /ja/code_analysis/static_analysis_rules?categories=Security
[3]: /ja/code_analysis/static_analysis_rules?categories=Best+Practices&categories=Code+Style&categories=Error+Prone&categories=Performance
[4]: /ja/integrations/github/
[6]: https://en.wikipedia.org/wiki/Camel_case
[7]: https://en.wikipedia.org/wiki/Snake_case
[8]: /ja/code_analysis/static_analysis/setup/#customize-your-configuration
[9]: /ja/code_analysis/static_analysis/setup
[10]: /ja/code_analysis/github_pull_requests/
[11]: /ja/getting_started/code_analysis/?tab=datadoghosted#linking-services-to-code-violations-and-libraries