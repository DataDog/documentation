---
description: AWS Lambda パックの詳細をご確認ください。
title: AWS Lambda
---
## 概要 {#overview}

{{< img src="observability_pipelines/packs/aws_lambda.png" alt="AWS Lambda パック" style="width:25%;" >}}

AWS Lambda のログでは、呼び出し、エラー、コールドスタートをキャプチャします。

このパックの機能:

- REPORT 行を解析して主要なメトリクスを取得
- START 行と END 行をドロップ
- コールドスタートとタイムアウトにタグを設定