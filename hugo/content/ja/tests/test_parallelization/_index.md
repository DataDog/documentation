---
description: Test Optimization データを使用して、テストファイルを CI ノードやワーカーに分散させることで、CI のテスト時間を短縮します。
further_reading:
- link: https://www.datadoghq.com/blog/ci-cd-optimization/
  tag: ブログ
  text: Datadog CI/CD Optimization を使用して、リリースを高速化し、信頼性を向上させ、CI コストを管理します。
title: テスト並列化
---
## 概要 {#overview}

テスト並列化は、テストファイルを CI ノードやローカルワーカーに分散させることにより、CI のテスト時間を短縮する上で役立ちます。Test Optimization データを使用して、実行すべきテストファイルを検出し、その所要時間を推定し、実行プランを作成します。

テスト並列化は、[Test Impact Analysis][1] と連携するように設計されています。Test Impact Analysis は、コード変更の影響を受けないテストをスキップします。テスト並列化は、残りのテストファイルを選択された CI ノード全体に均等に分割します。

テストスイートの実行に時間がかかる場合は、テスト並列化を使用してください。Test Impact Analysis と併用すると、テスト並列化はスキップされなかったテストを含むファイルのみを実行します。また、必要な数の CI ノードだけを選択することで CI コストの削減にも役立ち、合計 CPU 使用時間 (分) を短縮できる可能性があります。

## セットアップ {#setup}

テスト並列化をセットアップする前に、[Test Optimization][2] をセットアップします。テスト並列化と併用する予定がある場合は、オプションで [Test Impact Analysis][1] もセットアップします。その後、[テスト並列化のセットアップ][3]に従って `ddtest` をインストールし、CI プロバイダーを構成します。

## 互換性 {#compatibility}

テスト並列化は、以下の言語およびフレームワークでサポートされています。

| 言語 | フレームワーク | 最小ライブラリバージョン |
| -------- | ---------- | ----------------------- |
| Ruby     | RSpec、Minitest | `datadog-ci` gem `1.31.0` 以降 |
| Python   | pytest | `ddtrace` パッケージ `4.11.0` 以降 |
| JavaScript | Cucumber.js、Cypress、Jest、Mocha、Playwright、Vitest | `dd-trace` パッケージ `5.111.0` 以降 (`v5` 用)、および `6.0.0` 以降 (`v6` | 用)

JavaScript の場合、`ddtest` には Cypress 12 以降、Mocha 8 以降、Playwright 1.18 以降、Vitest 1.6 以降が必要です。Cucumber.js のサポートは、バージョン 7 から 13 でテストされています。これらのフレームワークには、`ddtest` 1.6.0 以降が必要です。フレームワークバージョンは [`dd-trace` 互換性要件][4]も満たしている必要があります。

## 仕組み {#how-it-works}

テスト並列化では、`ddtest` CLI を使用してテストの計画と実行を行います。

1. `ddtest plan` を 1 回実行して、再利用可能な `.testoptimization/` プランを作成します。
2. `.testoptimization/` ディレクトリを、テストを実行する各 CI ジョブと共有します。
3. 各 CI ジョブで `ddtest run --ci-node <CI_NODE_INDEX>` を実行し、その CI ノードに割り当てられたファイルのみを実行します。

シングルノードおよびマルチノードの例については、[テスト並列化のセットアップ][3]を参照してください。

## 次のステップ {#next-steps}

{{< whatsnext desc="ddtest をインストールし、CI プロバイダーを構成し、テスト並列化によるテストファイルの分割方法をカスタマイズします。" >}}
{{< nextlink href="/tests/test_parallelization/setup/" >}}テスト並列化のセットアップ{{< /nextlink >}}
{{< nextlink href="/tests/test_parallelization/configuration/" >}}テスト並列化を構成する{{< /nextlink >}}
{{< nextlink href="/tests/test_parallelization/best_practices/" >}}テスト並列化のベストプラクティス{{< /nextlink >}}
{{< nextlink href="/tests/test_parallelization/troubleshooting/" >}}テスト並列化のトラブルシューティング{{< /nextlink >}}
{{< /whatsnext >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tests/test_impact_analysis/
[2]: /ja/tests/setup/
[3]: /ja/tests/test_parallelization/setup/
[4]: /ja/tests/setup/javascript/#compatibility