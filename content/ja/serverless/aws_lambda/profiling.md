---
title: Continuous Profiler for AWS Lambda
further_reading:
    - link: /profiler/
      tag: Documentation
      text: Continuous Profiler
    - link: /serverless/distributed_tracing
      tag: Documentation
      text: Distributed Tracing for AWS Lambda
---

{{< img src="serverless/lambda/profiling_hero.png" alt="AWS Lambda の Continuous Profiling" style="width:100%;" >}}

Datadog の [Continuous Profiler][1] for AWS Lambda 関数は、CPU や I/O のボトルネックの原因となっている Lambda コードの正確なメソッド名、クラス名、行番号を視覚化します。

<div class="alert alert-warning">
Continuous Profiler for AWS Lambda は公開ベータ版です。ベータ期間中は、追加費用なしで Node と Python のプロファイリングを利用できます。
</div>

## 使用方法

プロファイリングを有効にするには

1. Lambda 関数に[関連するトレーシングライブラリがインストールされている][2]ことを確認します。
2. `DD_PROFILING_ENABLED` 環境変数を `true` に設定します。

Data is available after a minimum of 60 execution seconds of the Lambda function.

プロファイラーは、定期的に起動するスレッドを生成することで動作し、実行中のコードの CPU とヒープのスナップショットを取得します。これにはプロファイラー自身も含まれます。プロファイラー自身を無視したい場合は、 `DD_PROFILING_IGNORE_PROFILER` を `true` に設定します。


### サポート

ランタイム次第で、この機能は以下のトレーサーとレイヤーのバージョンを必要とします。

| ランタイム | トレーサーの最小バージョン | レイヤーの最小バージョン |
| ------- | ---------------------- | --------------------- |
| Python | 1.4.0 | 62 |
| Node.js | 2.22.1, 3.9.0 | 87 |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /profiler/
[2]: /serverless/installation
