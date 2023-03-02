---
further_reading:
- link: /continuous_integration/guides/flaky_test_management
  tag: ガイド
  text: 不安定なテストの管理
- link: /continuous_integration/explore_tests
  tag: ドキュメント
  text: テストの確認
kind: ガイド
title: テスト構成
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 CI Visibility は利用できません。</div>
{{< /site-region >}}

テストは、与えられた条件のセットに対するコードの振る舞いを評価します。これらの条件の中には、OS やランタイムなど、テストが実行される環境に関連するものもあります。そのため、開発者は通常、異なる条件下でテストを実行するように構成し、 すべての条件下で期待通りの挙動が得られるかどうかを検証します。この特定の条件のセットを*構成*と呼びます。

CI Visibility では、複数の構成を持つテストは複数のテストとして扱われ、各構成ごとに別々のテストが実行されます。1 つの構成が失敗し、他の構成が成功した場合、その特定のテストと構成の組み合わせのみが失敗としてマークされます。

たとえば、ひとつのコミットをテストするときに、3 つの異なるバージョンの Python に対して実行する Python テストがあるとします。そのうちのひとつのバージョンのテストが失敗すると、その特定のテストは失敗とマークされ、他のバージョンは合格とマークされます。同じコミットに対してテストを再試行し、3 つすべてのバージョンの Python のテストがパスした場合、以前失敗したバージョンのテストは合格と不安定の両方としてマークされ、他の 2 つのバージョンは合格のままで不安定が検出されません。

## デフォルトの構成

CI Visibility を使ってテストを実行すると、ライブラリはテストが実行される環境に関する情報を検出し、テストタグとして報告します。例えば、`Windows` や `Linux` などの OS 名や、`arm64` や `x86_64` などのプラットフォームのアーキテクチャが、各テストのタグとして追加されます。これらの値は、特定の構成でテストが失敗したり不安定が発生したりした場合に、コミットやブランチの概要ページで表示されます。異なるテストの実行の間で変更された構成タグのみが、UI に表示されます。

{{< img src="ci/test_configurations_in_errors.png" alt="テストに失敗したときの構成" style="width:100%;">}}

以下のタグは、テスト構成を特定するために自動的に収集されます。特定のプラットフォームにのみ適用されるものもあります。

* `os.platform` - テストが実行されるオペレーティングシステムの名前
* `os.version` - テストが実行されるオペレーティングシステムのバージョン
* `os.architecture` - テストが実行されるオペレーティングシステムのアーキテクチャ
* `runtime.name` - テスト用ランタイムシステムの名前
* `runtime.version` - ランタイムシステムのバージョン
* `runtime.architecture` - ランタイムシステムのアーキテクチャ
* `runtime.vendor` - テストを実行するランタイムプラットフォームを構築したベンダー
* `device.model` - テストを実行しているデバイスのモデル
* `device.name` - デバイス名
* `ui.appearance` - ユーザーインターフェイスのスタイル
* `ui.orientation` - UI が実行される方向
* `ui.localization` - アプリケーションの言語

## カスタム構成

環境変数やテスト実行時の引数など、開発者が使用するアプローチに依存する場合があるため、直接識別して自動的に報告することができない構成もあります。そのような場合は、CI Visibility が適切に識別できるように、ライブラリに構成の詳細を提供する必要があります。

これらのタグは `DD_TAGS` 環境変数の一部として `test.configuration` というプレフィックスを付けて定義します。例えば、以下のテスト構成タグは、ディスク応答時間が遅く、利用可能なメモリが少ないテスト構成を識別します。

{{< code-block lang="bash" >}}
DD_TAGS=test.configuration.disk:slow,test.configuration.memory:low
{{< /code-block >}}

自動的に収集されたタグに加えて、`test.configuration` というプレフィックスを持つすべてのタグが構成タグとして使用されます。

**注**: これらの構成タグを使ってフィルターをかけるには、[これらのタグのファセットを明示的に作成する必要があります][1]。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_explorer/facets/#creating-facets