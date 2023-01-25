---
aliases:
- /ja/continuous_integration/explore_tests/
further_reading:
- link: /continuous_integration/guides/find_flaky_tests/
  tag: ガイド
  text: 不安定なテストを見つける
- link: /continuous_integration/guides/rum_integration/
  tag: ガイド
  text: CI Visibility と RUM の連動
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: トラブルシューティング CI
- link: https://www.datadoghq.com/blog/ci-test-visibility-with-rum/
  tag: GitHub
  text: CI Visibility と RUM を使ったエンドツーエンドのテストのトラブルシューティング
kind: documentation
title: テストの確認
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 CI Visibility は利用できません。</div>
{{< /site-region >}}

Datadog の CI メニューの下にある [Tests][1] ページは、テストの重要なメトリクスと結果を表示することで、CI 状態のテストファーストビューを提供します。これは、主に関連するコードで作業していることが主な理由で (それらが実行されているパイプラインをメンテナンスしていることは大きな理由ではない)、懸念されるパフォーマンスの問題やテストの失敗を調査するのに役立ちます。

## セットアップ



{{< whatsnext desc="Datadog でテストの視覚化を設定するための言語を選択します。" >}}
    {{< nextlink href="continuous_integration/tests/dotnet" >}}.NET{{< /nextlink >}}
    {{< nextlink href="continuous_integration/tests/java" >}}Java{{< /nextlink >}}
    {{< nextlink href="continuous_integration/tests/javascript" >}}JavaScript{{< /nextlink >}}
    {{< nextlink href="continuous_integration/tests/python" >}}Python{{< /nextlink >}}
    {{< nextlink href="continuous_integration/tests/ruby" >}}Ruby{{< /nextlink >}}
    {{< nextlink href="continuous_integration/tests/swift" >}}Swift{{< /nextlink >}}
    {{< nextlink href="continuous_integration/tests/junit_upload" >}}JUnit のテストレポートファイルを Datadog にアップロードする{{< /nextlink >}}
{{< /whatsnext >}}
## テストを確認する

Tests ページには、_Branches_ ビューと _Default Branches_ ビューが表示されます。

### Branches ビュー

Tests ページの [Branches][2] ビューには、テスト結果を報告したすべてのテストサービスのすべてのブランチが一覧表示されます。このタブは、個々の開発者がコードブランチで実行されるテストのステータスをすばやく確認し、テストの失敗をトラブルシューティングするのに役立ちます。

このページでは、名前、テストサービス、またはコミット SHA でリストをフィルタリングしたり、**My branches** トグルを有効にして Git コンフィギュレーションで使用するメールアドレスを追加することで、ブランチ (自分で作成したコミットを少なくとも 1 つ含むブランチ) のみを表示したりできます。

#### テスト結果

リストには、ブランチごとに、最新のコミットのテスト結果が表示されます。具体的には、ステータスごとに分類されたテストの統合数 (再試行を考慮) と、コミットによって導入された新しい不安定なテストの数 (不安定なテストは、同じコミットで合格でも不合格でもあるテストとして定義されます) です。

#### テストスイートのパフォーマンス

最新のテストスイート実行の実時間、およびデフォルトのブランチの平均実時間との比較に関する情報もあります。_実時間_は、テストスイートが実行されている間に経過する現実の時間です。これは、テストが同時に実行されたときのすべてのテスト時間の合計よりも小さくなります。自分のブランチの実時間をデフォルトのブランチの実時間と比較すると、自分のコミットがテストスイートにパフォーマンス回帰をもたらしているかどうかを判断するのに役立ちます。

コミット作成者のアバターにカーソルを合わせると、最新のコミットに関する詳細情報が表示されます。

#### 詳細な情報を調べる

行をクリックすると、このブランチでの最後のコミットのテスト結果 (ブランチを切り替えることもできます)、失敗したテストと最も一般的なエラー、遅いテスト、不安定なテスト、選択した時間枠のテスト実行の完全なリストなど、テストスイートの実行の詳細が表示されます。このテスト実行のリストをファセットでフィルタリングして、最も見たい情報にアクセスできます。

テスト実行の 1 つをクリックすると、テストトレースがフレームグラフまたはスパンリストとして表示されます。左側の _Runs (n)_ リストを使用すると、同じコミットのテストを再試行するたびにトレースにすばやくアクセスできます。

#### サービス、リソース、ログ、ネットワークイベントへの接続を確認する

CI プロバイダーのリンクをクリックして、テストのリソース、サービス、または分析ページを調べます。また、完全なタグ情報と、関連するログイベントおよびネットワーク監視イベントへのリンクもあります。

### Default Branches ビュー

_テストサービス_は、プロジェクトやリポジトリなどに関連付けられたテストのグループです。これには、コードの個々のテストがすべて含まれ、オプションで_テストスイート_ (テストのフォルダーのようなもの) に編成されます。Tests ページの [Default Branches][3] ビューには、各テストサービスの_デフォルト_ブランチの集約された状態メトリクスが表示されます。このビューは、チームが時間の経過に伴うサービスの全体的な状態を理解するのに役立ちます。

Default Branches ビューには、Branches ビューと似た情報が表示されますが、デフォルトのブランチに適用され、最新のものでソートされます。現在の実時間と平均のデフォルトブランチの実時間を比較して、テストスイートのパフォーマンスが時間の経過とともにどのように推移しているかを示します。

行をクリックすると、デフォルトブランチで実行されたテストの分析が表示されます。これは、Branches ビューからのテスト実行の詳細を調べるのと同様です。

## テストの実行を確認する

[Test Runs][4] ページでは、選択した時間枠でのすべての実行のリストを表示し、ファセットでフィルタリングし、個々のテスト実行の詳細を調べることができます。各テスト実行はトレースとして報告されます。インテグレーションテストの場合、通常の [APM インスツルメンテーション][5]を使用してデータストアまたはサードパーティサービスに対して行われた呼び出しが含まれます。

特定のテスト実行をクリックすると、各実行に対するテストのフレームグラフまたはスパンリストが表示されます。これは、Tests ページからテスト実行をクリックするのと同じです。

[Analytics][6] タブを使用して、グラフやトップリストをインタラクティブにプロットすることもできます。

{{< img src="ci/ci-test-runs.png" alt="テスト実行分析" style="width:100%;">}}

### サードパーティのサービスデータの表示方法

APM でインスツルメントされ、インテグレーションテストに関与するサードパーティサービスによって生成されたスパンは、[APM][7] に表示されます。`Origin Service` ファセットを使用し、インテグレーションテストで使用されるテストサービス名を選択して、インテグレーションテストの一部として生成されたスパンをフィルタリングできます。

### テストスイートレベルの視覚化

テストに加え、CI Visibility ではプロジェクトのテストフェーズ全体を視覚化することができます。[Test Runs][4] ページでは、セッション、モジュール、スイート、テストといったテストレベルでフィルターをかけることができます。各テストレベルは、異なるレベルのテストの集計を表します。

{{< img src="ci/ci-test-suite-visibility.png" alt="テストスイートの視覚化" style="width:100%;">}}

#### セッション
テストセッションは最も高いレベルの集計です。これらは `yarn test` や `mvn test`、`dotnet test` などのテストコマンドに一対一で対応しています。

#### モジュール
モジュールの定義は言語によって若干の違いがあります。

* .NET では、テストモジュールは、同じ[ユニットテストプロジェクト][8]の下で実行されるすべてのテストをグループ化します。
* Swift では、テストモジュールは、与えられたバンドルに対して実行されるすべてのテストをグループ化します。
* JavaScript では、テストモジュールはありません。

モジュールの例としては、`SwiftLintFrameworkTests` があり、これは [`SwiftLint`][9] のテストターゲットに対応します。

#### スイート
テストスイートは、同じコードのユニットを実行するテストのグループです。

テストスイートの例としては、`src/commands/junit/__tests__/upload.test.ts` があり、これは [`datadog-ci`][10] のテストファイルに相当します。

#### 互換性
CI Visibility がサポートするすべての言語が、テストスイートレベルの視覚化をサポートしているわけではありません。

* [Swift][11] は `dd-sdk-swift-testing>=2.1.0` から完全にサポートされています。
* [.NET][12] は `dd-trace-dotnet>2.16.0` から完全にサポートされています。
* [Javascript][13] は `dd-trace-js>=3.3.0` から限定的にサポートされています。
* Java はテストスイートレベルの視覚化をサポートしていません。
* JUnit レポートのアップロードはテストスイートレベルの視覚化をサポートしていません。

さらに、テストスイートレベルの視覚化は、エージェントレスモードでのみサポートされています。

## CI テストデータについて伝達する

[ダッシュボード][14]と[ノートブック][15]でウィジェットを作成すると、テスト実行データを利用できます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/test-services
[2]: https://app.datadoghq.com/ci/test-services?view=branches
[3]: https://app.datadoghq.com/ci/test-services?view=default-branches
[4]: https://app.datadoghq.com/ci/test-runs
[5]: https://www.datadoghq.com/auto-instrumentation/
[6]: https://app.datadoghq.com/ci/test-runs?viz=timeseries
[7]: /ja/tracing/
[8]: https://learn.microsoft.com/en-us/visualstudio/test/create-a-unit-test-project?view=vs-2022#to-create-a-unit-test-project
[9]: https://github.com/realm/SwiftLint/blob/7738f0c0a5990201ca6556bdb2f13f8e67b5191d/Package.swift#L71
[10]: https://github.com/DataDog/datadog-ci/blob/6de6ea3bbffa57d8576422535061ca35c759feb6/src/commands/junit/__tests__/upload.test.ts
[11]: /ja/continuous_integration/tests/swift/#test-suite-level-visibility-compatibility
[12]: /ja/continuous_integration/tests/dotnet/#test-suite-level-visibility-compatibility
[13]: /ja/continuous_integration/tests/javascript/#test-suite-level-visibility-compatibility
[14]: https://app.datadoghq.com/dashboard/lists
[15]: https://app.datadoghq.com/notebook/list