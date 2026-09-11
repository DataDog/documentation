---
description: Data Observability リネージ の Metabase インテグレーション。セットアップについては、インテグレーションドキュメントを参照してください。
further_reading:
- link: /data_observability/
  tag: ドキュメント
  text: Data Observability について
title: Metabase
---
Datadog の Metabase インテグレーションは、データチームが Metabase ダッシュボードを壊すことなくデータプラットフォームに変更を加えたり、使用されていないカードやダッシュボードを特定したりするのに役立ちます。このインテグレーションは、Metabase のアクティビティログ、表示するログ、およびクエリログも収集します。

リネージはデータウェアハウスから取得されるため、少なくとも 1 つの[サポートされているデータウェアハウスの送信先][2]を Datadog に接続する必要があります。ログ収集にはそのような要件はありません。

セットアップと構成については、[Metabase インテグレーション][1]のドキュメントを参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/metabase/
[2]: /ja/data_observability/quality_monitoring/data_warehouses/