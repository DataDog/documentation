---
description: Datadog CI Visibility やその他の機能を使って、開発プロセスを加速させる方法をご紹介します。
further_reading:
- link: https://www.datadoghq.com/blog/datadog-github-actions-ci-visibility/
  tag: ブログ
  text: Datadog CI Visibility で GitHub Actions のワークフローを監視する
- link: /integrations/guide/source-code-integration
  tag: Documentation
  text: GitHub インテグレーションについて
kind: ガイド
title: Datadog で開発者のワークフローを強化する
---

## 概要

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 CI Visibility は利用できません。</div>
{{< /site-region >}}

CI Test Visibility は、Datadog の他の開発者向け製品や、GitHub などの外部パートナーとインテグレーションし、開発者のワークフローを効率化します。関連する機能としては、以下のようなことが可能です。
- GitHub の課題を作成し、開く
- GitHub と IDE でテストを開く
- [GitHub のプルリクエストコメントでテストサマリーを有効にする][1]

これらの機能は、Test Visibility をご利用のすべてのお客様が利用可能で、Datadog GitHub アプリのインテグレーションを利用する必要はありません。

## GitHub の課題を作成し、開く
Test Visibility から、テストに関連するコンテキストを含む GitHub 課題を作成し、開くことができます。また、Datadog へのディープリンクにより、デバッグのワークフローをより合理化できます。Test Visibility から直接課題を作成することで、テストの失敗や欠陥のあるテストの追跡と説明責任を維持することができます。

### アプリ内エントリーポイント

CI Test Visibility の中の 3 つのエリアから、あらかじめ入力された GitHub 課題を作成することができます。

1. コミット概要 (コミット表より)
2. ブランチ概要
3. テスト詳細ビュー

#### コミット概要
{{< img src="ci/github_issues_light.png" alt="Datadog GitHub 課題プレビュー" style="width:100%;">}}

コミットの概要ページは、特定のブランチから、または特定のテスト内から発見することができます。

コミット概要ページで、`Failed Tests` または `New Flaky Tests` テーブルの任意の行をクリックし、`Open issue in GitHub` を選択します。

#### ブランチ概要
このページから、`Flaky Tests` テーブルの任意の行をクリックし、`Open issue in GitHub` を選択します。
{{< img src="ci/github_issues_flaky_light.png" alt="Datadog GitHub 課題の不安定なテストテーブルのプレビュー" style="width:100%;">}}

#### テスト詳細ビュー
特定のテスト実行の中から、右上の `Actions` ボタンをクリックし、`Open issue in GitHub` を選択します。
{{< img src="ci/github_issues_detail_light.png" alt="Datadog GitHub 課題のテスト詳細ビューのプレビュー" style="width:100%;">}}

また、テストの詳細を他の場所に貼り付けるために、課題の説明を Markdown でコピーするオプションもあります。Markdown の説明には、テスト実行リンク、サービス、ブランチ、コミット、作成者、エラーなどの情報が含まれます。
{{< img src="ci/github_issues_markdown.png" alt="GitHub の課題に対して、課題の説明を Markdown 形式でコピーする" style="width:40%;">}}

### GitHub のサンプル課題
以下は、GitHub の課題としてあらかじめ入力されたものです。
{{< img src="ci/prefilled_github_issue.png" alt="事前に入力された GitHub の課題" style="width:60%;">}}

## GitHub と IDE でテストを開く
### アプリ内エントリーポイント
Datadog でテストが失敗した、あるいは不安定になったことを検出すると、そのテストを GitHub や IDE で開いてすぐに修正するオプションがあります。

テスト実行の Overview タブにある Error Message セクションで、`View Code` ボタンをクリックすると、そのテストに関連するコード行を Visual Studio Code、IntelliJ、または GitHub で表示できます。
このドロップダウンのオプションの順序は、テストが作成された言語によって変わります。

- Java ベースのテストでは IntelliJ が優先される
- JavaScript や Python ベースのテストでは Visual Studio Code が優先される
{{< img src="ci/IDE.png" alt="IDE でテストを開く" style="width:30%;">}}

### IDE プラグインのインストール
IDE でテストを表示するには、IDE プラグイン/拡張機能が必要です。
- VS Code 拡張機能がインストールされていない場合、`View in VS Code` をクリックすると、VS Code で拡張機能を直接開き、インストールすることができます。
- IntelliJ プラグインがインストールされていない場合は、`View in IntelliJ` をクリックすると、拡張機能のインストールにつながります。互換性のある Datadog のバージョンは、[こちら][2]で確認できます。

## GitHub プルリクエストのテストサマリー
Datadog は GitHub とインテグレーションし、テスト結果のサマリーや失敗したテストのエラーメッセージをプルリクエストのコメントで表示します。詳しくは、こちらの[ガイド][1]をご覧ください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/continuous_integration/guides/pull_request_comments/
[2]: https://plugins.jetbrains.com/plugin/19495-datadog/versions
[3]: https://app.datadoghq.com/ci/settings/test-service