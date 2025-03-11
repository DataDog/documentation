---
algolia:
  tags:
  - コード分析
  - datadog code analysis
  - static analysis
  - software composition analysis
  - SAST
  - SCA
aliases:
- /ja/code_analysis/faq
description: Datadog Code Analysis を使用して、開発中の保守性の問題、バグ、セキュリティ脆弱性に対処し、顧客への影響を防ぐ方法を学びます。
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: リリースノート
  text: Software Delivery の最新リリースをチェック！ (アプリログインが必要です)。
- link: https://www.datadoghq.com/blog/monitor-ci-pipelines/
  tag: ブログ
  text: Datadog によるすべての CI パイプラインの監視
- link: /integrations/guide/source-code-integration/
  tag: ドキュメント
  text: ソースコードインテグレーションについて
- link: /code_analysis/static_analysis
  tag: ドキュメント
  text: Static Analysis について
- link: /security/application_security/software_composition_analysis
  tag: ドキュメント
  text: Software Composition Analysis について
is_beta: false
title: コード分析
---

{{< callout url="#" btn_hidden="true" header="Join the Preview!" >}}
Code Analysis is in Preview.
{{< /callout >}}

{{% site-region region="gov" %}}
<div class="alert alert-danger"> Code Analysis は {{< region-param key="dd_site_name" >}} サイトでは使用できません。 </div>
{{% /site-region %}}

## 概要

<div class="alert alert-info"> Datadog Software Composition Analysis は、ソフトウェア開発ライフサイクル (SDLC) 全体を通じて脆弱性を含むライブラリを検出できます。Code Analysisはリポジトリを直接スキャンして得られた結果を要約します。リポジトリや実行時に検出されたすべての脆弱性を一括で確認するには、詳細について <a href="/security/application_security/software_composition_analysis" target="_blank">Application Security</a> を参照してください。 </div> 

Code Analysis はリポジトリをスキャンし、セキュリティ脆弱性とコード品質の問題を検出します。これは、独自のコードを対象とした [Static Analysis][1] と、コードベースに含まれるオープンソース依存関係を対象とした [Software Composition Analysis (SCA)][2] の 2 つの機能で構成されています。

Static Analysis
: 保守性の問題、バグ、パフォーマンスの問題、セキュリティの脆弱性について、開発ライフサイクルの早い段階で特注コードをスキャンし、問題が本番環境に到達するのを未然に防ぐとともに、可能な場合は、ユーザーに影響が及ぶ前にエンジニアリングチームがこれらの問題に対処できるよう、修正案を提供します。

Software Composition Analysis
: リポジトリにインポートされているオープンソースライブラリをスキャンし、既知のセキュリティ脆弱性、ライセンスリスク、サポート終了 (EOL) ライブラリを検出します。 


## リポジトリに Code Analysis をセットアップする

[**Code Analysis Repositories** ページ][9]で **+ Add a Repository** をクリックし、Datadog で直接スキャンを実行するか、CI パイプラインでスキャンを実行するかを選択します。

{{< tabs >}}
{{% tab "Datadog" %}}

<div class="alert alert-warning">Datadog がホストするスキャンは、Software Composition Analysis (SCA) と GitHub リポジトリでのみサポートされます。Static Analysis を有効にする、または別の CI プロバイダーを使用する場合は、CI パイプラインでスキャンを実行してください。</div>

With Datadog-hosted scans, your code is scanned within Datadog's infrastructure as opposed to within your CI pipeline. Datadog reads your code, runs the static analyzer to perform Static Analysis and/or Software Composition Analysis, and uploads the results.

Using Datadog-hosted scans eliminates the need for you to configure a CI pipeline so you can use Code Analysis.

GitHub リポジトリで [Software Composition Analysis][101] を有効にするには、対象の GitHub アカウントで **Select Repositories** をクリックし、`Enable Software Composition Analysis (SCA)` のトグルをクリックしてすべてのリポジトリで有効にします。GitHub アカウントが一覧に表示されない場合は、まず[新しい GitHub アプリを作成][102]します。

{{< img src="code_analysis/setup/enable_account.png" alt="GitHub アカウントのすべてのリポジトリで Software Composition Analysis を有効にする" style="width:100%;">}}

オプションで、特定の GitHub リポジトリごとにトグルをクリックして SCA を有効にすることもできます。

{{< img src="code_analysis/setup/enable_repository.png" alt="GitHub リポジトリで Software Composition Analysis を有効にする" style="width:100%;">}}

[101]: /ja/code_analysis/software_composition_analysis
[102]: /ja/integrations/github/

{{% /tab %}}
{{% tab "CI パイプライン" %}}

Datadog を通して直接スキャンを実行したくない場合は、実行したいスキャン ([Static Analysis][106] と [Software Composition Analysis][107]) を選択し、それに応じて CI パイプラインプロバイダーを構成することができます。

## CI/CD プロバイダーの構成

Static Analysis と SCA スキャンを実行するように CI/CD プロバイダーを構成するには、次のドキュメントを参照してください。

- [Static Analysis と GitHub Actions][101]
- [Static Analysis と CircleCI Orbs][102]
- [Static Analysis と汎用 CI プロバイダー][103]
- [Software Composition Analysis と GitHub Actions][104]
- [Software Composition Analysis と汎用 CI プロバイダー][105]

[101]: /ja/code_analysis/static_analysis/github_actions 
[102]: /ja/code_analysis/static_analysis/circleci_orbs 
[103]: /ja/code_analysis/static_analysis/generic_ci_providers 
[104]: /ja/code_analysis/software_composition_analysis/github_actions 
[105]: /ja/code_analysis/software_composition_analysis/generic_ci_providers 
[106]: /ja/code_analysis/static_analysis
[107]: /ja/code_analysis/software_composition_analysis

{{% /tab %}}
{{< /tabs >}}

## GitHub インテグレーションのセットアップ

Datadog の Static Analysis 結果の一部として問題のあるコードスニペットを表示するには、[GitHub インテグレーションタイル][7]を使用して[ソースコードインテグレーション][8]をセットアップすることで、GitHub アプリを構成することができます。

{{< img src="code_analysis/source_code_integration.png" alt="Code Analysis ビューから GitHub へのリンク" style="width:100%;">}}

詳細については、[ソースコードインテグレーションのドキュメント][10]を参照してください。

## Static Analysis インテグレーション

Static Analysis を使用すると、[VS Code][3] や [IntelliJ & PyCharm][4] などの [IDE で直接][11]、または [GitHub 上のプルリクエスト][5]で書いたコードに対して、不適切なコーディングプラクティスやセキュリティの脆弱性に関する自動化されたフィードバックを受け取ることができます。

{{< img src="developers/ide_plugins/vscode/static-analysis-issue.png" alt="Visual Studio Code での Static Analysis 結果" style="width:100%;">}}

## リポジトリの検索と管理

Code Analysis を構成した後、[Code Analysis ページ][9]で各リポジトリの Static Analysis と SCA のスキャン結果の要約を見ることができます。デフォルトで、要約された結果はリポジトリのデフォルトブランチの最新のスキャンされたコミットに対して示され、これにより、トリアージして修正したい各リポジトリの既存の問題がすべて表示されていることを確認できます。

{{< img src="code_analysis/repositories.png" alt="Code Analysis ページに表示される、コードとライブラリのスキャン結果を含むリポジトリ一覧" style="width:100%;">}}

リストからリポジトリを選択すると、そのリポジトリで検出された違反を検索し、管理することができます。デフォルトでは、リポジトリのデフォルトブランチ上で最新にスキャンされたコミットに対する結果が表示されますが、ページ上部でブランチやコミットを変更することが可能です。また、結果はサービスやチームのファセットでフィルタリングできます。Datadog のサービスやチームにどのように結果が関連付けられているかの詳細は、[Code Analysis の概要][12]を参照してください。

選択したブランチやコミットにかかわらず、すべての結果は以下のビューに整理されます。

{{< tabs >}}
{{% tab "Code Vulnerabilities" %}}

{{< img src="code_analysis/shopist_code_vulnerabilities.png" alt="Datadog Shopist サービスとリポジトリの Code Analysis ページにあるコードの脆弱性" style="width:100%;">}}

**Code Vulnerabilities** ビューで、Static Analysis によって検出されたコードセキュリティリスクを特定し、対処します。

{{% /tab %}}
{{% tab "Code Quality" %}}

{{< img src="code_analysis/shopist_code_quality.png" alt="Datadog Shopist サービスとリポジトリの Code Analysis ページにあるコード品質の脆弱性" style="width:100%;">}}

**Code Quality** ビューで、Static Analysis によって検出された不適切なコーディングプラクティスを特定し、対処します。

{{% /tab %}}
{{% tab "Library Vulnerabilities" %}}

{{< img src="code_analysis/shopist_lib_vulnerabilities.png" alt="Datadog Shopist サービスとリポジトリの Code Analysis ページにあるライブラリの脆弱性" style="width:100%;">}}

**Library Vulnerabilities** ビューで、SCA によって検出された脆弱なオープンソースライブラリを特定し、対処します。

{{% /tab %}}
{{% tab "Library Catalog" %}}

{{< img src="code_analysis/shopist_lib_list.png" alt="Datadog Shopist サービスとリポジトリの Code Analysis ページにあるライブラリのリスト" style="width:100%;">}}

**Library Catalog** ビューで、コードベースにインポートされた SCA によって検出されたライブラリの完全なリストを管理します。

{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/code_analysis/static_analysis
[2]: /ja/code_analysis/software_composition_analysis
[3]: /ja/developers/ide_plugins/vscode/#static-analysis
[4]: /ja/developers/ide_plugins/idea/#static-analysis
[5]: /ja/code_analysis/github_pull_requests/
[6]: /ja/code_analysis/static_analysis_rules
[7]: /ja/integrations/github/#link-a-repository-in-your-organization-or-personal-account
[8]: /ja/integrations/guide/source-code-integration
[9]: https://app.datadoghq.com/ci/code-analysis
[10]: /ja/integrations/guide/source-code-integration/?tab=codeanalysis
[11]: /ja/code_analysis/ide_plugins/
[12]: /ja/getting_started/code_analysis/?tab=incipipelines#linking-services-to-code-violations-and-libraries