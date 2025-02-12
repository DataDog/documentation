---
algolia:
  tags:
  - software composition analysis
  - datadog software composition analysis
  - library vulnerabilities
  - SCA
description: 本番環境にリリースする前に、Datadog Software Composition Analysis を活用してインポートしたオープンソースライブラリをスキャンし、既知のセキュリティ脆弱性を確認しましょう。
further_reading:
- link: https://www.datadoghq.com/blog/iast-datadog-application-vulnerability-management/
  tag: ブログ
  text: Software Composition Analysis によって、本番環境でのアプリケーションセキュリティを強化する
- link: https://www.datadoghq.com/blog/sca-prioritize-vulnerabilities/
  tag: ブログ
  text: Datadog SCA を使用した脆弱性修正の優先順位付け
- link: /getting_started/application_security/software_composition_analysis
  tag: ドキュメント
  text: Software Composition Analysis を始める
- link: /security/application_security/software_composition_analysis/
  tag: ドキュメント
  text: Software Composition Analysis について
- link: /integrations/guide/source-code-integration/
  tag: ドキュメント
  text: ソースコードインテグレーションについて
is_beta: false
title: Software Composition Analysis (SCA)
---

{{< callout url="#" btn_hidden="true" header="プレビューに参加してください！" >}}
Software Composition Analysis はプレビュー版です。
{{< /callout >}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">
Code Analysis は、{{< region-param key="dd_site_name" >}} サイトでは利用できません。
</div>
{{% /site-region %}}

## 概要

Software Composition Analysis (SCA) は、`npm` などのパッケージマネージャーを通じてリポジトリにインポートされたオープンソースライブラリをスキャンし、[既知の脆弱性][1]を検出します。また、リポジトリ全体で使用されているライブラリのカタログを作成し、リスクのあるライセンスやサポート終了のライブラリ、脆弱性を特定することで、高品質で安全なコードベースを確保します。

SCA スキャンは、Datadog から直接実行するか、[Code Analysis][3] を使用して CI パイプラインで実行でき、本番環境に到達する前にライブラリの脆弱性を検出します。Datadog はまた、[Datadog Application Security][1] を介してランタイムでの検出も提供しています。

## Software Composition Analysis のセットアップ

SCA は、以下の言語および技術におけるライブラリのスキャンをサポートしています。

{{< partial name="code_analysis/sca-getting-started.html" >}}

まず、[**Code Analysis** ページ][2]で Software Composition Analysis をセットアップするか、[セットアップドキュメント][3]をご覧ください。

### ロックファイル

SCA はロックファイルに含まれるライブラリをスキャンします。以下のロックファイルがサポートされています。

| パッケージマネージャー | ロックファイル |
|-----------------|------------------------------------------|
| C# (.NET) | `packages.lock.json` |
| Go (mod) | `go.mod` |
| JVM (Gradle) | `gradle.lockfile` |
| JVM (Maven) | `pom.xml` |
| Node.js (npm) | `package-lock.json` |
| Node.js (pnpm) | `pnpm-lock.yaml` |
| Node.js (yarn) | `yarn.lock` |
| PHP (composer) | `composer.lock` |
| Python (pip) | `requirements.txt`, `Pipfile.lock` |
| Python (poetry) | `poetry.lock` |
| Ruby (bundler) | `Gemfile.lock` |

## Software Composition Analysis をソフトウェア開発ライフサイクルに統合

### CI プロバイダー
{{< whatsnext desc="SCAは、お好みのどのCIプラットフォームプロバイダー上でも実行できます。CIパイプラインでSCAをセットアップする方法については、プロバイダー固有のドキュメントを参照してください。">}}
{{< nextlink href="code_analysis/software_composition_analysis/github_actions" >}}GitHub Actions{{< /nextlink >}}
{{< nextlink href="code_analysis/software_composition_analysis/generic_ci_providers" >}}汎用 CI プロバイダー{{< /nextlink >}}
{{< /whatsnext >}}

## 検索結果のフィルタリング

<div class="alert alert-info">Datadog Software Composition Analysis は、ソフトウェア開発ライフサイクル (SDLC) 全体にわたり、脆弱なライブラリを検出できます。Code Analysis は、リポジトリを直接スキャンして検出された結果を要約します。リポジトリおよびランタイムで検出されたすべての脆弱性を統合して表示するには、詳細について <a href="/security/application_security/software_composition_analysis" target="_blank">Application Security</a> をご覧ください。</div>

Datadog SCA を実行するように CI パイプラインを構成すると、[**Code Analysis Repositories** ページ][4]でリポジトリごとに違反内容が要約されます。リポジトリをクリックすると、Software Composition Analysis による **Library Vulnerabilities** と **Library Catalog** の結果を分析できます。

* **Library Vulnerabilities** タブには、Datadog SCA によって検出された脆弱なライブラリのバージョンが表示されます。
* **Library Catalog** タブには、Datadog SCA によって検出されたすべてのライブラリ (脆弱性の有無に関わらず) が表示されます。

結果を絞り込むには、リストの左側にあるファセットまたは上部の検索バーを使用します。結果はサービスやチームのファセットでフィルタリングできます。結果が Datadog のサービスやチームにどのように関連付けられるかの詳細は、[Code Analysis の概要][5]を参照してください。

各行は、一意のライブラリとバージョンの組み合わせを表します。各組み合わせは、ページ上部のフィルターで選択された特定のコミットとブランチに関連付けられています (デフォルトでは、選択したリポジトリのデフォルトブランチの最新コミットが表示されます)。

脆弱性があるライブラリをクリックすると、違反の範囲と発生場所に関する情報を含むサイドパネルが開きます。

{{< img src="code_analysis/software_composition_analysis/sca-violation.png" alt="SCA 違反のサイドパネル" style="width:80%;">}}

違反の内容は以下のタブで表示されます。

- **Full Description**: この特定のライブラリバージョンに含まれる脆弱性の説明。
- **Event**: SCA 違反イベントに関する JSON メタデータ。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/application_security/software_composition_analysis/
[2]: https://app.datadoghq.com/ci/setup/code-analysis
[3]: /ja/code_analysis/software_composition_analysis/setup
[4]: https://app.datadoghq.com/ci/code-analysis
[5]: /ja/getting_started/code_analysis/?tab=datadoghosted#linking-services-to-code-violations-and-libraries