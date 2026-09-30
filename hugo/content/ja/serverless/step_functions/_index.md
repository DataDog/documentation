---
further_reading:
- link: /serverless/step_functions/installation
  tag: ドキュメント
  text: AWS Step Functions のサーバーレスモニタリングのインストール
- link: /serverless/step_functions/merge-step-functions-lambda
  tag: ドキュメント
  text: Merge Step Functions and Lambda Traces
- link: /serverless/step_functions/enhanced-metrics
  tag: ドキュメント
  text: AWS Step Functions の拡張メトリクス
- link: /serverless/step_functions/redrive
  tag: ドキュメント
  text: Redrive Executions
- link: /serverless/step_functions/troubleshooting
  tag: ドキュメント
  text: AWS Step Functions のサーバーレスモニタリングのトラブルシューティング
title: AWS Step Functions のサーバーレスモニタリング
---

AWS Step Functions は、開発者がマルチステップのアプリケーションワークフローを作成および管理できるサーバーレスのオーケストレーションサービスです。Datadog の [AWS Step Functions インテグレーション][2]を通じて取得できる Cloudwatch メトリクスに加えて、Datadog は Cloudwatch ログの収集を介して AWS Step Function のトレーシング、ログ、および[拡張メトリクス][3]を提供します。

{{< img src="serverless/step_functions/overview1.png" alt="AWS Step Function の概要タブ。" style="width:100%;" >}}

### 仕組み
Datadog AWS Step Functions Monitoring は、[AWS Step Functions インテグレーション][2]によって取得される Cloudwatch メトリクスと、Datadog Forwarder または Amazon Data Firehose を介して送信される Cloudwatch ログを利用します。Forwarder と Firehose はいずれもお客様の環境で動作します。Cloudwatch ログを送信すると、トレーシングおよび[拡張メトリクス][3]を利用できます。

<!-- {{< img src="serverless/step_functions/how_it_works.png" alt="AWS Step Function のモニタリングの仕組みを示す図。AWS Step Functions インテグレーションを介して送信される Cloudwatch メトリクスと、Datadog Lambda Forwarder または Amazon Data Firehose を介して送信されるログ、トレース、拡張メトリクスの 2 要素がある。" style="width:100%;" >}} -->

### サーバーレスビューで Step Function 全体の健全性を監視
サーバーレスビューは、Step Functions のキーメトリクスを一箇所に表示し、Step Functions の健全性のスナップショットを簡単に提供します。各 Step Functions の詳細ビューにアクセスして、関連するすべてのメトリクス、ログ、一定時間内のトレースを確認したり、問題のある実行のモニターを設定したりできます。

{{< img src="serverless/step_functions/overview2.png" alt="AWS Step Function の可視化 (スパンタグ付き)。" style="width:100%;" >}}


### AWS Step Function トレースのステートマシンマップでの可視化
[Step Function のトレーシングを有効にする][1]と、ステートマシンマップを使用して AWS Step Function 実行の視覚的な表現を確認できます。実行が成功したか失敗したか、期待どおりにステートマシンを通過したかを一目で確認できます。異常な実行を深掘りして、どのステートに問題があるか、または遅延が大きいかを特定できます。

{{< img src="serverless/step_functions/overview3.png" alt="フレームグラフで表示される AWS Step Function スパン。" style="width:100%;" >}}


### 詳細な実行トレースによる Step Function のデバッグ時間の短縮
単一の Step Function 実行のエンドツーエンドのトレースと、関連するログ、エラー、メトリクスを表示することができ、Step Function ロジックの問題を特定することができます。また、Step Function スパンには、ステップの入出力、関連する Lambda トレース、ステップの継続時間の長さなどの豊富なメタデータが含まれており、バグを再現してボトルネックを修正するのに役立ちます。

始めるには、[インストール手順][1]に従ってください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/serverless/step_functions/installation
[2]: /ja/integrations/amazon_step_functions/
[3]: /ja/serverless/step_functions/enhanced-metrics