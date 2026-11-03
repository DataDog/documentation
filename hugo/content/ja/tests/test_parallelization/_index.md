---
description: Test Optimizationデータを使用して、テストファイルをCIノードやワーカーに分散することで、CIのテスト時間を短縮します。
title: テスト並列化
---
## 概要 {#overview}

Test Parallelizationは、テストファイルをCIノードやローカルワーカーに分散させることで、CIのテスト時間を短縮するのに役立ちます。これはTest Optimizationデータを使用して、実行すべきテストファイルを検出し、その所要時間を推定し、実行計画を作成します。

Test Parallelizationは、[Test Impact Analysis][1]と連携するように設計されています。Test Impact Analysisは、コード変更の影響を受けないテストをスキップします。Test Parallelizationは、残りのテストファイルを、選択されたCIノード間で均等に分割します。

テストスイートの実行に時間がかかる場合は、Test Parallelizationを使用してください。Test Impact Analysisと併用すると、Test Parallelizationはスキップされなかったテストを含むファイルのみを実行します。また、必要な数だけのCIノードを選択することでCIコストの削減にも役立ち、合計CPU時間を短縮できる可能性があります。

## セットアップ {#setup}

Test Parallelizationをセットアップする前に、[Test Optimization][2]をセットアップしてください。Test Parallelizationと併用する予定がある場合は、オプションで[Test Impact Analysis][1]もセットアップしてください。次に、[Set Up Test Parallelization][3]に従って`ddtest`をインストールし、CIプロバイダーを設定します。

## 互換性 {#compatibility}

Test Parallelizationは、以下の言語およびフレームワークでサポートされています。

| 言語 | フレームワーク | 最小ライブラリバージョン |
| -------- | ---------- | ----------------------- |
| Ruby     | RSpec, Minitest | `datadog-ci` gem `1.31.0` 以降 |
| Python   | pytest | `ddtrace` パッケージ `4.11.0` 以降 |
| JavaScript | Cucumber.js, Cypress, Jest, Mocha, Playwright, Vitest | `dd-trace` パッケージ `5.111.0` 以降（`v5`用）、および `6.0.0` 以降（`v6` |用）

JavaScriptの場合、`ddtest`にはCypress 12以降、Mocha 8以降、Playwright 1.18以降、Vitest 1.6以降が必要です。Cucumber.jsのサポートは、バージョン7から13でテストされています。これらのフレームワークには、`ddtest` 1.6.0以降が必要です。フレームワークのバージョンは、[`dd-trace`互換性要件][4]も満たしている必要があります。

## 仕組み {#how-it-works}

Test Parallelizationは、`ddtest` CLIを使用してテストの計画と実行を行います。

1. を1回実行して`ddtest plan`、再利用可能な`.testoptimization/`計画を作成します。
2. テストを実行する各CIジョブに`.testoptimization/`ディレクトリを共有します。
3. 各CIジョブで`ddtest run --ci-node <CI_NODE_INDEX>`を実行し、そのCIノードに割り当てられたファイルのみを実行します。

シングルノードおよびマルチノードの例については、「[Set Up Test Parallelization][3]」を参照してください。

## 次のステップ {#next-steps}

{{< whatsnext desc="ddtestをインストールし、CIプロバイダーを設定して、Test Parallelizationによるテストファイルの分割方法をカスタマイズします。" >}}
{{< nextlink href="/tests/test_parallelization/setup/" >}}テスト並列化のセットアップ{{< /nextlink >}}
{{< nextlink href="/tests/test_parallelization/configuration/" >}}テスト並列化を構成する{{< /nextlink >}}
{{< nextlink href="/tests/test_parallelization/best_practices/" >}}Test Parallelizationのベストプラクティス{{< /nextlink >}}
{{< nextlink href="/tests/test_parallelization/troubleshooting/" >}}テスト並列化のトラブルシューティング{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /ja/tests/test_impact_analysis/
[2]: /ja/tests/setup/
[3]: /ja/tests/test_parallelization/setup/
[4]: /ja/tests/setup/javascript/#compatibility