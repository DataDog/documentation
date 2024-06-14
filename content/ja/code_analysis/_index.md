---
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
is_beta: true
kind: ドキュメント
title: コード分析
---

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Code Analysis は、{{< region-param key="dd_site_name" >}} サイトでは使用できません。
</div>
{{% /site-region %}}

{{< callout url="#" btn_hidden="true" header="ベータ版をお試しください！" >}}
Code Analysis は公開ベータ版です。
{{< /callout >}}

## 概要

Code Analysis は、[Static Analysis][1] と [Software Composition Analysis (SCA)][2] の製品で構成されています。

Static Analysis
: 保守性の問題、バグ、パフォーマンスの問題、セキュリティの脆弱性について、開発ライフサイクルの早い段階で特注コードをスキャンし、問題が本番環境に到達するのを未然に防ぐとともに、可能な場合は、ユーザーに影響が及ぶ前にエンジニアリングチームがこれらの問題に対処できるよう、修正案を提供します。

Software Composition Analysis 
: リポジトリにインポートされたオープンソースライブラリの既知の脆弱性をスキャンします。

Code Analysis を構成したら、[Code Analysis ページ][9]に移動して、構成した各リポジトリの Static Analysis と SCA のスキャン結果の要約を見ることができます。要約された結果は常に各リポジトリのデフォルトブランチの最新のコミットに対するもので、トリアージして修正したい各リポジトリの既存の問題がすべて表示されていることを確認できます。

リストからリポジトリを選択すると、その特定のリポジトリの違反を検索・管理できます。デフォルトでは、結果はリポジトリのデフォルトブランチの最新コミットにフィルタリングされますが、ページ上部でブランチやコミットを変更できます。選択したブランチやコミットにかかわらず、すべての結果は以下のビューに整理されます。

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
{{% tab "Library List" %}}

{{< img src="code_analysis/shopist_lib_list.png" alt="Datadog Shopist サービスとリポジトリの Code Analysis ページにあるライブラリのリスト" style="width:100%;">}}

**Library List** ビューで、コードベースにインポートされた SCA によって検出されたライブラリの完全なリストを管理します。

{{% /tab %}}
{{< /tabs >}}

Static Analysis を使用すると、[VS Code][3] や [IntelliJ & PyCharm][4] などの IDE、または [GitHub 上のプルリクエスト][5]で直接書いたコードに対して、不適切なコーディングプラクティスやセキュリティの脆弱性に関する自動化されたフィードバックを受け取ることができます。

## リポジトリに Code Analysis をセットアップする

[Code Analysis ページ][9] で **+ Setup a Repository** をクリックし、関連するプログラミング言語を選択して Code Analysis をプロジェクトに追加します。Datadog は、以下の言語に対してすぐに使えるルールセットを提供しています。

{{< partial name="code_analysis/languages-getting-started.html" >}}

</br>

Static Analysis ルールセットの詳細については、[Static Analysis ルール][6]を参照してください。

## CI/CD プロバイダーの構成

{{< whatsnext desc="以下で Code Analysis を構成する CI/CD プロバイダーを選択します:">}}
    {{< nextlink href="code_analysis/static_analysis/github_actions" >}}Static Analysis と GitHub Actions{{< /nextlink >}}
    {{< nextlink href="code_analysis/static_analysis/circleci_orbs" >}}Static Analysis と CircleCI Orbs{{< /nextlink >}}
    {{< nextlink href="code_analysis/static_analysis/generic_ci_providers" >}}Static Analysis と一般的な CI プロバイダー{{< /nextlink >}}
    {{< nextlink href="code_analysis/software_composition_analysis/github_actions" >}}Software Composition Analysis と GitHub Actions{{< /nextlink >}}
    {{< nextlink href="code_analysis/software_composition_analysis/generic_ci_providers" >}}Software Composition Analysis と一般的な CI プロバイダー{{< /nextlink >}}
{{< /whatsnext >}}

</br>

## GitHub インテグレーションのセットアップ

Datadog UI の Static Analysis 結果の一部として問題のあるコードスニペットを表示するには、[GitHub インテグレーションタイル][7]を使用して GitHub アプリを構成し、[ソースコードインテグレーション][8]をセットアップする必要があります。

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
[9]: /ja/security/application_security/software_composition_analysis