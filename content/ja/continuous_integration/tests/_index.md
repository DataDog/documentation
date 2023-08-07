---
aliases:
- /ja/continuous_integration/explore_tests/
cascade:
  algolia:
    rank: 70
    tags:
    - CI テスト
    - CI テスト
further_reading:
- link: /monitors/types/ci/
  tag: Documentation
  text: CI Test モニターの作成
- link: /continuous_integration/guides/find_flaky_tests/
  tag: Documentation
  text: 不安定なテストを見つける
- link: /continuous_integration/guides/rum_integration/
  tag: ドキュメント
  text: CI Visibility と RUM の連動
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: CI の表示に関するトラブルシューティング
- link: https://www.datadoghq.com/blog/ci-test-visibility-with-rum/
  tag: ブログ
  text: CI Visibility と RUM を使ったエンドツーエンドのテストのトラブルシューティング
kind: documentation
title: Datadog における Test Visibility
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 CI Visibility は利用できません。</div>
{{< /site-region >}}

## 概要

[Test Visibility][1] は、テストからの重要なメトリクスと結果を表示することで、CI 状態のテストファーストビューを提供します。パイプラインを保守しているのではなく、関連するコードを保守しているため、最も気になるパフォーマンス問題やテストの失敗を調査するのに役立ちます。

## セットアップ

{{< whatsnext desc="Datadog で Test Visibility を設定するための言語を選択します。" >}}
    {{< nextlink href="continuous_integration/tests/dotnet" >}}.NET{{< /nextlink >}}
    {{< nextlink href="continuous_integration/tests/java" >}}Java{{< /nextlink >}}
    {{< nextlink href="continuous_integration/tests/javascript" >}}JavaScript{{< /nextlink >}}
    {{< nextlink href="continuous_integration/tests/python" >}}Python{{< /nextlink >}}
    {{< nextlink href="continuous_integration/tests/ruby" >}}Ruby{{< /nextlink >}}
    {{< nextlink href="continuous_integration/tests/swift" >}}Swift{{< /nextlink >}}
    {{< nextlink href="continuous_integration/tests/junit_upload" >}}JUnit のテストレポートファイルを Datadog にアップロードする{{< /nextlink >}}
{{< /whatsnext >}}

## テストスイートレベルの視覚化

テストに加えて、CI Visibility はプロジェクトのテストフェーズ全体を視覚化します。

### 互換性

CI Visibility がサポートするすべての言語が、テストスイートレベルの視覚化をサポートしているわけではありません。

* [Swift][11] は `dd-sdk-swift-testing>=2.1.0` から完全にサポートされています。
* [.NET][12] は `dd-trace-dotnet>2.16.0` から完全にサポートされています。
* [JavaScript][13] は `dd-trace-js>=3.3.0` から限定的にサポートされています。
* Java は `dd-trace-java>=1.12.0` から完全にサポートされています。
* [JUnit レポートのアップロード][14]は、`datadog-ci>=2.17.0` から完全にサポートされています。

さらに、テストスイートレベルの視覚化は、エージェントレスモードでのみサポートされています。

## CI テストデータの使用

[ダッシュボード][15]または[ノートブック][16]を作成する際、検索クエリでテスト実行データを使用すると、視覚化ウィジェットのオプションが更新されます。

## テストデータのアラート

[**Test Runs** ページ][4]で、失敗したテストや不安定なテスト、CI テストのパフォーマンスを評価する場合、**Create Monitor** をクリックして、[CI Test モニター][17]を作成します。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/test-services
[2]: https://app.datadoghq.com/ci/test-services?view=branches
[3]: https://app.datadoghq.com/ci/test-services?view=default-branches
[4]: https://app.datadoghq.com/ci/test-runs
[5]: https://www.datadoghq.com/auto-instrumentation/
[6]: https://app.datadoghq.com/ci/test-runs?viz=timeseries
[7]: /ja/tracing/
[11]: /ja/continuous_integration/tests/swift/#test-suite-level-visibility-compatibility
[12]: /ja/continuous_integration/tests/dotnet/#test-suite-level-visibility-compatibility
[13]: /ja/continuous_integration/tests/javascript/#test-suite-level-visibility-compatibility
[14]: /ja/continuous_integration/tests/junit_upload#test-suite-level-visibility-compatibility
[15]: https://app.datadoghq.com/dashboard/lists
[16]: https://app.datadoghq.com/notebook/list
[17]: /ja/monitors/types/ci/