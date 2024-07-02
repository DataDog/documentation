---
title: プライベートロケーションのディメンション
kind: ドキュメント
description: コンテナ化されたプライベートロケーションの要件のディメンション。
aliases:
- /synthetics/private_locations/dimensioning
further_reading:
- link: /synthetics/private_locations/monitoring
  tag: ドキュメント
  text: プライベートロケーションを監視する
---

<div class="alert alert-info">ディメンションに関する推奨事項は、コンテナ化されたプライベートロケーションの場合です。</div>

## 概要 

プライベートロケーションでは、[API][1]、[マルチステップ API][2]、[ブラウザテスト][3]の実行が可能です。ブラウザテストは、API やマルチステップ API テストよりも多くのリソースを必要とします。また、1 つのプライベートロケーションで複数の種類のテストを実行することができます。

テストタイプ、最大テスト実行回数、ハードウェアの総所要台数を定義することで、プライベートロケーションのディメンションを計算し、複数のワーカーにリソースを分配してテスト実行の効率を向上させることができます。

ディメンションを向上させるには、テストの種類に基づいてテストの割り当てを分割します。たとえば、あるプライベートロケーションでは API テストとマルチステップ API テストのみを実行させ、別のプライベートロケーションではブラウザテストのみを実行させることができます。

### 前提条件

プライベートロケーションのディメンションを始めるには、以下のものが必要です。

1. コンテナオーケストレーションと、プライベートロケーションを実行するために使用する特定のオプションについての基本的な理解。
2. プライベートロケーションのコンフィギュレーションファイルは、選択したオーケストレーターでマウントされ、基盤となるプライベートロケーションコンテナからアクセス可能です。
3. [IP ブロック機能付きブラウザテスト][4]をご利用の場合、`sudo` へのアクセスが必要な場合があります。

### 最大テスト実行回数を定義する

リソース要件は、プライベートロケーションで並行して実行できる最大テスト実行回数と、テストしたいアプリケーションに依存します。オンデマンドテスト (例えば、[CI/CD パイプライン][5]の一部としてテストを実行する場合) で発生する可能性のあるスパイクや、ロードする必要のあるアセットのサイズと数を考慮に入れてください。

プライベートロケーションの `concurrency` パラメーターに、最大テスト実行回数を定義します。デフォルトでは、並行して実行されるテストの最大数は 10 です。

詳しくは、[高度な構成][4]をご覧ください。

### ハードウェアの要件を定義する

実行したいテストの種類と、並行して実行したいテストの最大回数が決まったら、プライベートロケーションのハードウェアの合計要件を定義します。 

CPU は 150mCore、メモリは 150MiB が基本要件となります。

追加の要件は、プライベートロケーションのテストタイプに基づいて異なります。

| テストタイプ                                     | CPU/メモリ/ディスクの推奨    |
| --------------------------------------------- | --------------------------------- |
| [API テスト][1]と[マルチステップ API テスト][2] | テストランあたり 100mCores/200MiB/100MiB   |
| [ブラウザテスト][3]                           | テストランあたり 800mCores/1GiB/500MiB |

例えば、Datadog は、最大同時テスト実行数 `10` のブラウザテストのみを実行するプライベートロケーションに対して、〜8 コア CPU `(150mCores + (800mCores*10 test runs))`、〜10GiB メモリ `(150MiB + (1GiB*10 test runs))`、〜5GiB ディスク `(500MiB*10 test runs)` を推奨しています。

**注:** プライベートロケーションで API またはマルチステップ API テストとブラウザテストを実行したい場合、Datadog はブラウザテストの要件で合計ハードウェア要件を計算することを推奨しています。

### プライベートロケーションにリソースを割り当てる

[プライベートロケーションの合計要件](#define-your-total-hardware-requirements)を決定したら、これらのリソースをどのように配分するかを決めます。すべてのリソースを単一のワーカーに割り当てるか、すべてのリソースを複数のワーカーに分散させるかを決めます。
すべてのリソースを単一のワーカーに割り当てるには、コンフィギュレーションファイルを使用してプライベートロケーション用のコンテナを 1 つ実行します。
1. [`concurrency` パラメーター][4]を、`maximum number of test runs that can be executed in parallel on your private location` に設定します。
2. [プライベートロケーションの総リソース要件](#define-your-total-hardware-requirements)をユニークコンテナに割り当てます。

複数のワーカーにリソースを分散させるには、コンフィギュレーションファイルを使ってプライベートロケーションに対して複数のコンテナを実行します。

 1. [`concurrency` パラメーター][4]を、`maximum number of test runs that can be executed on your private location / number of workers associated with your private location` に設定します。
 2. `total private location resource requirements / number of workers` リソースをプライベートロケーションのすべてのコンテナに割り当てます。


例えば、Datadog は、最大同時テスト実行数 `10` のブラウザテストのみを実行するプライベートロケーションに対して、〜8 コア CPU、〜10GiB メモリ、〜5GiB ディスクを推奨しています。これらのリソースを 2 つのワーカーに分配するには、[`concurrency` パラメータ][4]を 5 に設定し、各ワーカーに〜4 コア CPU、〜5GiB メモリ、〜2.5GiB ディスクを割り当てます。

#### キューのメカニズム

複数のワーカーがプライベートロケーションに関連している場合、各ワーカーは、[`concurrency` パラメーター][4]と割り当て可能な追加のテスト実行回数に依存する、いくつかのテスト実行を要求します。

For example, ten tests are scheduled to run simultaneously on a private location that has two workers running. If Worker 1 is running two tests, Worker 1 can request three additional tests to run. If Worker 2 is not running any tests, Worker 2 can request the five following tests. 

The remaining two tests can be requested by whichever worker has finished running its test first (any worker that has available slots).

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/api_tests/
[2]: /synthetics/multistep?tab=requestoptions
[3]: /synthetics/browser_tests/?tab=requestoptions
[4]: /synthetics/private_locations/configuration#advanced-configuration
[5]: /synthetics/cicd_integrations
