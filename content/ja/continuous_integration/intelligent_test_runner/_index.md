---
further_reading:
- link: https://www.datadoghq.com/blog/streamline-ci-testing-with-datadog-intelligent-test-runner/
  tag: GitHub
  text: Datadog Intelligent Test Runner による CI テストの効率化
- link: https://www.datadoghq.com/blog/monitor-ci-pipelines/
  tag: GitHub
  text: Datadog によるすべての CI パイプラインの監視
kind: documentation
title: Intelligent Test Runner
---

## 概要

Intelligent Test Runner は、Datadog のテスト影響度分析ソリューションです。変更されたコードに基づいて、特定のコミットに対して関連するテストのみを自動的に選択し、実行します。テストカバレッジを維持しながら、テストにかかる時間や CI 全体のコストを大幅に削減します。

{{< img src="continuous_integration/itr_savings.png" alt="時間短縮を示す、テストセッションで有効化された Intelligent Test Runner。">}}

Intelligent Test Runner は、各テストがカバーしているコードを決定するためにテストスイートを分析し、そのカバレッジと新しいコード変更によって影響を受けるファイルをクロスリファレンスします。Datadog はこの情報を使って、影響を受ける関連テストを選択し、コード変更の影響を受けないテストは除外して、全体のテスト期間を短縮します。

コミットごとに実行するテストの数を最小化することで、Intelligent Test Runner はパイプラインの中断を引き起こす[不安定なテスト][1]の頻度を減らします。テストが不安定なのがテスト対象のコード変更と無関係な場合は、特にストレスの原因になります。テストサービスで Intelligent Test Runner を有効にすると、各コミットを関連するテストに制限することができ、コード変更に無関係な不安定なテストがビルドを恣意的に破壊してしまうことがなくなります。

### 制限

Intelligent Test Runner の現在の実装には、特定の条件下で実行されるべきテストをスキップする原因となる、既知の制限が存在します。具体的には、Intelligent Test Runner は、ライブラリ依存関係、コンパイラオプション、外部サービス、またはデータ駆動型テストにおけるデータファイルの変更を検出することができません。

Intelligent Test Runner をオーバーライドしてすべてのテストを実行するには、Git のコミットメッセージのどこかに `ITR:NoSkip` (大文字小文字を区別しない) を追加してください。また、[除外するブランチ](#excluded-branches)と[追跡されるファイル](#tracked-files)のリストを追加することもできます。

## Datadog ライブラリのセットアップ

Intelligent Test Runner を設定する前に、特定の言語に対して [Test Visibility][2] を構成する必要があります。Agent を通してデータを報告する場合は、v6.40 または 7.40 以降を使用してください。

{{< whatsnext desc="Datadog で Intelligent Test Runner をセットアップする言語を選択します。" >}}
    {{< nextlink href="continuous_integration/intelligent_test_runner/setup/dotnet" >}}.NET{{< /nextlink >}}
    {{< nextlink href="continuous_integration/intelligent_test_runner/setup/java" >}}Java{{< /nextlink >}}
    {{< nextlink href="continuous_integration/intelligent_test_runner/setup/javascript" >}}JavaScript{{< /nextlink >}}
    {{< nextlink href="continuous_integration/intelligent_test_runner/setup/swift" >}}Swift{{< /nextlink >}}
    {{< nextlink href="continuous_integration/intelligent_test_runner/setup/python" >}}Python{{< /nextlink >}}
{{< /whatsnext >}}

## 構成

Datadog ライブラリを Intelligent Test Runner 用に設定したら、[Test Service Settings][3] ページから構成します。Intelligent Test Runner を有効にするには、`Intelligent Test Runner Activation Write` 権限が必要です。

{{< img src="continuous_integration/itr_overview.png" alt="Datadog の CI セクションのテストサービス設定で Intelligent test runner を有効にする" style="width:80%;">}}

### 除外するブランチ

上記の[制限](#limitations)により、リポジトリのデフォルトブランチは、自動的に Intelligent Test Runner の有効化から除外されます。Datadog は、本番に到達する前にすべてのテストが実行されるようにするために、この構成を推奨します。

他に除外したいブランチがある場合、Test Service Settings ページで追加します。クエリバーは、ワイルドカード文字 `*` の使用をサポートしており、`release_*` など、一致するブランチを除外することができます。

### 追跡されるファイル

さらに、追跡されるファイルのセットを指定することができます。Intelligent Test Runner は、これらのファイルが変更された場合、すべてのテストを実行します。

また、ワイルドカード文字の `*` と `**` を使って、複数のファイルやディレクトリにマッチさせることもできます。例えば、`**/*.mdx` はリポジトリ内のすべての `.mdx` ファイルにマッチします。

依存関係ファイル (例: `package.json`、`requirements.txt`) や、データ駆動型テストのデータファイル (`tests/data/**` など) には追跡されるファイルを使用することをお勧めします。

{{< img src="continuous_integration/itr_configuration2.png" alt="除外するブランチと追跡されるファイルを選択" style="width:80%;">}}

## テストセッションを確認する

テストコミットページやテストセッションパネルを見ることで、Intelligent Test Runner で得られる時間短縮を確認することができます。

{{< img src="continuous_integration/itr_commit.png" alt="Intelligent Test Runner のテストコミットページ" style="width:80%;">}}

{{< img src="continuous_integration/itr_savings.png" alt="時間短縮を示す、テストセッションで有効化された Intelligent Test Runner。" style="width:80%;">}}

Intelligent Test Runner がアクティブでテストをスキップしている場合、紫色のテキストで、各テストセッションまたは各コミットで節約した時間の量が表示されます。期間バーも紫色に変わるので、[Test Runs][4] ページで Intelligent Test Runner を使用しているテストセッションをすぐに識別できます。

## 導入とグローバルな節約を確認する

すぐに使える [Intelligent Test Runner ダッシュボード][5]で、組織の節約と Intelligent Test Runner の導入を追跡します。ダッシュボードには、全体の節約を追跡するウィジェットと、リポジトリごと、コミッターごと、サービスごとのデータビューがあります。ダッシュボードを閲覧することで、組織のどの部分が Intelligent Test Runner を利用し、最大限の効果を得ているかを理解することができます。

{{< img src="continuous_integration/itr_dashboard1.png" alt="Intelligent Test Runner ダッシュボード" style="width:80%;">}}

また、ダッシュボードでは、組織全体における Intelligent Test Runner の導入状況を追跡することができます。

{{< img src="continuous_integration/itr_dashboard2.png" alt="Intelligent Test Runner ダッシュボード" style="width:80%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/glossary/#flaky-test
[2]: /ja/continuous_integration/tests/
[3]: https://app.datadoghq.com/ci/settings/test-service
[4]: https://app.datadoghq.com/ci/test-runs
[5]: https://app.datadoghq.com/dash/integration/30941/ci-visibility-intelligent-test-runner