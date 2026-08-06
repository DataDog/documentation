---
algolia:
  tags:
  - ソフトウェア コンポジション アナリシス
  - ソフトウェア コンポジション アナリシス ルール
  - ライブラリ 脆弱性
  - SCA
description: 本番環境へリリースする前に、インポートしたオープン ソース ライブラリに既知のセキュリティ 脆弱性がないかをスキャンするための Software
  Composition Analysis のセットアップ方法を学びます。
further_reading:
- link: https://www.datadoghq.com/blog/iast-datadog-application-vulnerability-management/
  tag: ブログ
  text: Datadog Application Vulnerability Management で本番環境のアプリケーション セキュリティを強化する
- link: /getting_started/application_security/software_composition_analysis
  tag: ドキュメント
  text: Software Composition Analysis のはじめ方
- link: /security/application_security/software_composition_analysis/
  tag: ドキュメント
  text: Software Composition Analysis について学ぶ
- link: /integrations/guide/source-code-integration/
  tag: ドキュメント
  text: Source Code Integration について学ぶ
- link: /code_analysis/static_analysis/
  tag: ドキュメント
  text: Static Analysis について学ぶ
is_beta: false
title: Software Composition Analysis のセットアップ
---

{{< callout url="#" btn_hidden="true" header="プレビューに参加する!" >}}
Code Analysis はプレビュー版です。
{{< /callout >}}

{{% site-region region="gov" %}}
<div class="alert alert-warning">
    Code Analysis は、{{< region-param key="dd_site_name" >}} サイトでは使用できません。
</div>
{{% /site-region %}}

## 概要

Datadog Software Composition Analysis をセットアップするには、[**Software Delivery** > **Code Analysis**][6] に移動します。

## Software Composition Analysis のスキャンを実行する場所を選択
### Datadog ホスト型スキャンで実行
SCA のスキャンは Datadog のインフラストラクチャ上で直接実行できます。開始するには、[**Code Analysis** ページ][6] に移動します。

### CI パイプラインでスキャン
SCA は [`datadog-ci` CLI][5] を使用して CI パイプライン内で実行できます。[Datadog API キーとアプリケーション キー (`code_analysis_read` scope が必要)][3] を構成し、各 CI プロバイダーで SCA ジョブを実行します。

{{< whatsnext desc="ご利用の CI プロバイダー向けドキュメントを参照してください:">}}
    {{< nextlink href="code_analysis/software_composition_analysis/github_actions" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="code_analysis/software_composition_analysis/generic_ci_providers" >}}Generic CI Providers{{< /nextlink >}}
{{< /whatsnext >}}

## ソース コード管理プロバイダーを選択
Datadog SCA はすべてのソース コード管理プロバイダーをサポートし、GitHub に対してはネイティブ サポートがあります。
### GitHub インテグレーションを設定
ソース コード管理プロバイダーが GitHub の場合、[GitHub インテグレーション タイル][9] を使用して GitHub App を構成し、[Source Code Integration][10] を設定してインライン コード スニペットを表示し、[プル リクエスト コメント][11] を有効にします。

GitHub App をインストールする際、特定の機能を有効にするために次の権限が必要です:

- `Content: Read` は、Datadog に表示されるコード スニペットを閲覧できるようにします。
- `Pull Request: Read & Write` は、違反に対するフィードバックを [プル リクエスト コメント][11] を使ってプル リクエストに直接追加できるようにします。

### その他のソース コード管理プロバイダー
別のソース コード管理プロバイダーを使用している場合は、`datadog-ci` CLI ツールを使用して CI パイプラインで SCA を実行するよう構成し、結果を Datadog に [アップロード][8] します。
結果が **Code Analysis** ページに表示され始める前に、デフォルト ブランチ上でリポジトリの分析を実行する **必要があります**。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/application_security/vulnerability_management
[2]: /ja/code_analysis/
[3]: /ja/account_management/api-app-keys/
[4]: /ja/getting_started/site/
[5]: https://github.com/DataDog/datadog-ci
[6]: https://app.datadoghq.com/ci/code-analysis
[7]: /ja/integrations/github/#link-a-repository-in-your-organization-or-personal-account
[8]: /ja/code_analysis/software_composition_analysis/generic_ci_providers/
[9]: /ja/integrations/github
[10]: /ja/integrations/guide/source-code-integration
[11]: /ja/code_analysis/github_pull_requests/