---
description: Data Observability lineage のための Airbyte インテグレーションです。セットアップについては、インテグレーションドキュメントを参照してください。
further_reading:
- link: /data_observability/
  tag: ドキュメント
  text: Data Observability について
title: Airbyte
---
Datadog の Airbyte インテグレーションは、データチームが外部ソースからデータウェアハウスへのデータの流れを把握し、品質問題を上流のソースまで遡ってトレースするのに役立ちます。

リネージはデータウェアハウスから取得されるため、少なくとも 1 つの [サポートされているデータウェアハウスの送信先][2] を Datadog に接続する必要があります。

セットアップと構成については、[Airbyte インテグレーション][1] のドキュメントを参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/airbyte-for-data-observability/
[2]: /ja/data_observability/quality_monitoring/data_warehouses/