---
aliases:
- /ja/continuous_integration/intelligent_test_runner/
- /ja/intelligent_test_runner
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: リリースノート
  text: Software Delivery の最新リリースをチェック！ (アプリログインが必要です)。
- link: https://www.datadoghq.com/blog/streamline-ci-testing-with-datadog-intelligent-test-runner/
  tag: ブログ
  text: Datadog Intelligent Test Runner による CI テストの効率化
- link: https://www.datadoghq.com/blog/monitor-ci-pipelines/
  tag: ブログ
  text: Datadog によるすべての CI パイプラインの監視
title: Test Impact Analysis
---

<div class="alert alert-danger"> この機能は以前「Intelligent Test Runner」と呼ばれており、一部のタグには依然として「itr」が含まれています。</div>

## 概要

Test Impact Analysis は、変更されたコードに基づいて、指定されたコミットに関連するテストのみを自動的に選択して実行します。テストカバレッジを維持しながら、テストに費やす時間と CI 全体のコストを大幅に削減します。

{{< img src="continuous_integration/itr_savings.png" alt="時間短縮を示す、テストセッションで有効化された Test Impact Analysis。">}}

Test Impact Analysis は、テストスイートを分析して各テストがカバーしているコードを特定し、そのカバレッジを新しいコード変更によって影響を受けるファイルと照合します。Datadog はこの情報を用いて、関連する影響を受けたテストを選択して実行し、影響を受けないテストを省略することで全体的なテスト期間を短縮します。詳細は[仕組み][1]をご覧ください。

Test Impact Analysis は、コミットごとに実行されるテストの数を最小限に抑えることで、パイプラインを混乱させる[不安定なテスト][2]の発生頻度を低減します。テストの不安定さが、テスト対象のコード変更と無関係な場合、特にイライラさせられることがあります。テストサービスで Test Impact Analysis を有効にすると、各コミットを関連するテストに制限することができ、コード変更に無関係な不安定なテストがビルドを恣意的に破壊してしまうことがなくなります。

### すぐに使える構成の制限

デフォルトの構成では、Test Impact Analysis が本来実行されるべきテストをスキップしてしまう可能性があります。特に、以下の変更を自動的に検出することはできません。

- ライブラリの依存関係
- コンパイラオプション
- 外部サービス
- データ駆動型テストにおけるデータファイルの変更

このような場合、Test Impact Analysis はすぐに使える構成では影響を受けるテストをスキップする可能性があります。

テストがスキップされないようにするために使用できる構成メカニズムはいくつかあります。

- リポジトリ内の特定のファイルを[追跡ファイル](#tracked-files)としてマークすると、これらのファイルが変更されるたびにすべてのテストが実行されます。Dockerfile や Makefile、依存関係ファイル、その他のビルドコンフィギュレーションファイルが追跡ファイルに適しています。
- ソース内の特定のテストをスキップ不可にすることで、常に実行されるように設定できます。これはデータ駆動型のテストや外部システムとやりとりするテストに適しています。詳細は[セットアップページ][3]をご覧ください。
- リスクの高いコミットを行う際にすべてのテストを実行したい場合は、Git のコミットメッセージのどこかに `ITR:NoSkip` (大文字小文字は区別しません) を追加します。
- GitHub をソースコード管理プロバイダーとして使用している場合、プルリクエスト内でテストがスキップされるのを防ぐために、(大文字・小文字を区別せずに) `ITR:NoSkip` ラベルを使用してください。この機能を利用するには、[GitHub インテグレーションタイル][9]を使って GitHub App を構成し、`Software Delivery: Collect Pull Request Information` 機能を有効にします。なお、この仕組みは、`pull_request` イベントによってトリガーされる GitHub Actions 上で実行されるテストには適用されません。
- [除外ブランチ](#excluded-branches)のリストを追加して、特定のブランチで Test Impact Analysis を無効にすることができます。

## Datadog ライブラリのセットアップ

Test Impact Analysis を設定する前に、特定の言語に対して [Test Optimization][4] を構成する必要があります。Agent を通してデータを報告する場合は、v6.40 または 7.40 以降を使用してください。

{{< whatsnext desc="Datadog で Test Impact Analysis をセットアップする言語を選択します。" >}}
    {{< nextlink href="intelligent_test_runner/setup/dotnet" >}}.NET{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/java" >}}Java{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/javascript" >}}JavaScript{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/swift" >}}Swift{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/python" >}}Python{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/ruby" >}}Ruby{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/go" >}}Go{{< /nextlink >}}
{{< /whatsnext >}}

## 構成

Datadog ライブラリを Test Impact Analysis 用に設定したら、[Test Service Settings][5] ページで追加設定を行います。Test Impact Analysis を有効にするには、`Test Optimization Settings Write` 権限が必要です。

{{< img src="/getting_started/intelligent_test_runner/test-impact-analysis-gs-configuration.png" alt="Test Optimization Settings ページでテストサービスに Test Impact Analysis を有効にする" style="width:80%" >}}

### Git 実行ファイル

Test Impact Analysis が動作するためには、テストを実行しているホストで [Git][6] が利用可能である必要があります。

### 除外ブランチ

上記の[制限](#out-of-the-box-configuration-limitations)により、リポジトリのデフォルトブランチは、自動的に Test Impact Analysis の有効化から除外されます。Datadog は、本番に到達する前にすべてのテストが実行されるようにするために、この構成を推奨します。

他に除外したいブランチがある場合、Test Optimization Settings ページで追加します。クエリバーは、ワイルドカード文字 `*` の使用をサポートしており、`release_*` など、一致するブランチを除外することができます。

除外ブランチは、テストごとのコードカバレッジを収集しますが、これは全体のテスト時間に影響を与えます。しかし、Datadog がコードカバレッジを収集することで新しいカバレッジ情報が十分に生成され、そのコストを相殺できると判断した場合にのみコードカバレッジを収集することで、この影響は軽減されます。テストセッションでコードカバレッジが有効かどうかは、`@test.code_coverage.enabled` フィールドで確認できます。

### 追跡ファイル

追跡ファイルとは、テストに影響を与える可能性のあるコード以外のファイルのことです。追跡ファイルの変更はテストの失敗やコードカバレッジの変化を引き起こす可能性があります。追跡ファイルとして適している例としては、以下があります。

- CI 環境で使用する Dockerfile
- 依存関係を定義するファイル (例: Maven の `pom.xml`、Python の `requirements.txt`、Javascript の `package.json`)
- Makefile

追跡ファイルのセットを指定すると、Test Impact Analysis はこれらのファイルが変更された場合にすべてのテストを実行します。

すべてのファイルパスはリポジトリのルートからの相対パスとして扱われます。ワイルドカード文字 `*` と `**` を使用して、複数のファイルやディレクトリを指定することができます。例えば、 `**/*.mdx` はリポジトリ内のすべての `.mdx` ファイルに一致します。

{{< img src="/getting_started/intelligent_test_runner/test-impact-analysis-gs-config.png" alt="除外するブランチと追跡ファイルを選択する" style="width:80%" >}}

## テストセッションを確認する

テストコミットページやテストセッションパネルを見ることで、Test Impact Analysis で得られる時間短縮を確認することができます。

{{< img src="continuous_integration/itr_commit.png" alt="Test Impact Analysis のテストコミットページ" style="width:80%;">}}

{{< img src="continuous_integration/itr_savings.png" alt="時間短縮を示す、テストセッションで有効化された Test Impact Analysis。" style="width:80%;">}}

Test Impact Analysis がアクティブでテストをスキップしている場合、紫色のテキストで、各テストセッションまたは各コミットで節約した時間の量が表示されます。期間バーも紫色に変わるので、[Test Runs][7] ページで Test Impact Analysis を使用しているテストセッションを識別できます。

## 導入とグローバルな節約を確認する

すぐに使える [Test Impact Analysis ダッシュボード][8]で、組織の節約と Test Impact Analysis の導入を追跡します。ダッシュボードには、全体の節約を追跡するウィジェットと、リポジトリごと、コミッターごと、サービスごとのデータビューがあります。ダッシュボードを見ることで、組織のどの部分が Test Impact Analysis を使用し、最大限の効果を得ているかを理解することができます。

{{< img src="continuous_integration/itr_dashboard1.png" alt="Test Impact Analysis ダッシュボード" style="width:80%;">}}

また、ダッシュボードでは、組織全体における Test Impact Analysis の導入状況を追跡することができます。

{{< img src="continuous_integration/itr_dashboard2.png" alt="Test Impact Analysis ダッシュボード" style="width:80%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tests/test_impact_analysis/how_it_works/
[2]: /ja/glossary/#flaky-test
[3]: /ja/tests/test_impact_analysis/setup
[4]: /ja/continuous_integration/tests/
[5]: https://app.datadoghq.com/ci/settings/test-optimization
[6]: https://git-scm.com/
[7]: https://app.datadoghq.com/ci/test-runs
[8]: https://app.datadoghq.com/dash/integration/30941/ci-visibility-intelligent-test-runner
[9]: /ja/integrations/github/