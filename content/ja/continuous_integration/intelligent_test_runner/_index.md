---
further_reading:
- link: https://www.datadoghq.com/blog/streamline-ci-testing-with-datadog-intelligent-test-runner/
  tag: GitHub
  text: Datadog Intelligent Test Runner による CI テストの効率化
- link: https://www.datadoghq.com/blog/monitor-ci-pipelines/
  tag: GitHub
  text: Datadog によるすべての CI パイプラインの監視
is_beta: true
kind: documentation
title: Intelligent Test Runner
---

<div class="alert alert-warning">Intelligent Test Runner はベータ版製品です。</div>

Intelligent Test Runner は、Datadog のテスト影響度分析ソリューションです。変更されたコードに基づいて、与えられたコミットに対して関連するテストのみを自動的に選択し、実行することができます。テストカバレッジを維持しながら、テストにかかる時間や CI 全体のコストを大幅に削減します。


{{< img src="continuous_integration/itr_savings.png" alt="時間短縮を示す、テストセッションで有効化された Intelligent Test Runner。">}}

Intelligent Test Runner は、テストスイートを分析して各テストがカバーしているコードを決定し、そのカバー率と新しいコード変更によって影響を受けるファイルをクロスリファレンスすることで動作します。Datadog はこの情報を使って、影響を受ける関連テストを選択し、コード変更の影響を受けないテストは除外して、全体のテスト期間を短縮します。

Intelligent Test Runner は、コミットごとに実行されるテストの数を最小限に抑えることで、パイプラインを混乱させる不安定なテストの発生頻度を低減します。不安定なテストとは、同じコミットでランダムに合格したり失敗したりするテストのことです。テストが失敗するのが、テスト対象のコード変更と無関係な場合、特にイライラさせられることがあります。テストサービスで Intelligent Test Runner を有効にすると、各コミットを関連するテストに制限することができ、コード変更に無関係な不安定なテストがビルドを恣意的に破壊してしまうことがなくなります。

### ベータ版での制限事項

Intelligent Test Runner の現在の実装には、特定の条件下で実行されるべきテストをスキップする原因となる、既知の制限が存在します。具体的には、Intelligent Test Runner は、ライブラリ依存関係、コンパイラオプション、外部サービス、またはデータ駆動型テストにおけるデータファイルの変更を検出することができません。

Intelligent Test Runner をオーバーライドしてすべてのテストを実行するには、Git のコミットメッセージのどこかに `ITR:NoSkip` (大文字小文字を区別しない) を追加してください。

## Datadog ライブラリのセットアップ

Intelligent Test Runner を設定する前に、特定の言語に対して [Test Visibility][1] を設定する必要があります。Agent を通してデータを報告する場合は、v6.40+/v7.40+ を使用してください。

{{< whatsnext desc="Datadog で Intelligent Test Runner をセットアップする言語を選択します。" >}}
    {{< nextlink href="continuous_integration/intelligent_test_runner/dotnet" >}}.NET{{< /nextlink >}}
    {{< nextlink href="continuous_integration/intelligent_test_runner/java" >}}Java{{< /nextlink >}}
    {{< nextlink href="continuous_integration/intelligent_test_runner/javascript" >}}JavaScript{{< /nextlink >}}
    {{< nextlink href="continuous_integration/intelligent_test_runner/swift" >}}Swift{{< /nextlink >}}
{{< /whatsnext >}}

## コンフィギュレーション

Intelligent Test Runner に Datadog ライブラリを設定したら、[Test Service Settings][2] ページから構成します。

{{< img src="continuous_integration/itr_overview.png" alt="Datadog の CI セクションのテストサービス設定で Intelligent test runner を有効にする" style="width:80%;">}}

上記の制限により、リポジトリのデフォルトブランチは、自動的に Intelligent Test Runner の有効化から除外されます。Datadog は、本番に到達する前にすべてのテストが実行されるようにするために、この構成を推奨します。

他に除外したいブランチがある場合、Intelligent Test Runner の設定ページから追加します。クエリバーは、ワイルドカード文字 `*` の使用をサポートしており、`release_*` など、一致するブランチを除外することができます。

{{< img src="continuous_integration/itr_configuration2.png" alt="Intelligent Test Runner から除外するブランチを選択" style="width:80%;">}}

## テストセッションを確認する

テストコミットページやテストセッションパネルを見ることで、Intelligent Test Runner で得られる時間短縮を確認することができます。

{{< img src="continuous_integration/itr_commit.png" alt="Intelligent Test Runner のテストコミットページ" style="width:80%;">}}

{{< img src="continuous_integration/itr_savings.png" alt="時間短縮を示す、テストセッションで有効化された Intelligent Test Runner。" style="width:80%;">}}

Intelligent Test Runner がアクティブでテストをスキップしている場合、紫色のテキストで、各テストセッションまたは各コミットで節約した時間の量が表示されます。期間バーも紫色に変わるので、[Test Runs][3] ページで Intelligent Test Runner を使用しているテストセッションをすぐに識別できます。

## 導入とグローバルな節約を確認する

すぐに使える [Intelligent Test Runner ダッシュボード][4]で、組織の節約と Intelligent Test Runner の導入を追跡します。ダッシュボードには、全体の保存を追跡するウィジェットと、リポジトリごと、コミッターごと、サービスごとのデータビューがあります。ダッシュボードを見ることで、組織のどの部分が Intelligent Test Runner を使用し、最大限の効果を得ているかを理解することができます。

{{< img src="continuous_integration/itr_dashboard1.png" alt="Intelligent Test Runner ダッシュボード" style="width:80%;">}}

また、ダッシュボードでは、組織全体における Intelligent Test Runner の導入状況を追跡することができます。

{{< img src="continuous_integration/itr_dashboard2.png" alt="Intelligent Test Runner ダッシュボード" style="width:80%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_integration/tests/
[2]: https://app.datadoghq.com/ci/settings/test-service
[3]: https://app.datadoghq.com//ci/test-runs
[4]: https://app.datadoghq.com/dash/integration/30941/ci-visibility-intelligent-test-runner-beta
