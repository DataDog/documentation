---
title: 利用可能なディスク容量の監視
---



一般的なシステムメトリクスとして、特定のシステムまたはホストの利用可能なディスク容量を監視することがあります。このガイドは、Datadog に報告している任意のホストで、ディスクの空き容量が 10% を下回ったときにアラートを発するモニターを作成するのに役立ちます。

ディスクの空き容量を監視するためのモニターを作成するには

1. ナビゲーションメニューで、**Monitors** をクリックします。
2. **New Monitor** をクリックします。
3. モニタータイプとして **Metric** を選択します。
     1. **Define the metric** セクションで、メトリクスに `system.disk.free` を使用し、**avg by** に `host` を選択します。これはクエリ a です。
     2. **Add Query** をクリックします。このメトリクスでは、メトリクスに `system.disk.total` を使用し、**avg by** に `host` を使用します。これはクエリ b です。
     3. 表示される数式で、`a + b` を `a/b*100` に置き換えます。

        {{< img src="monitors/guide/monitoring_free_disk_space.png" alt="system.disk.free と system.disk.total のクエリ定義と数式 a/b*100" style="width:80%;">}}


4. **Evaluation Details** で、希望する評価間隔を選択します。

{{< img src="monitors/guide/monitoring_free_disk_space_alert_criteria.png" alt="しきい値を下回った場合のアラート基準構成、値は 10。" style="width:80%;">}}


5. **Set alert conditions** で、しきい値オプションから **below** を選択し、**Alert threshold** フィールドに `10` を入力します。
6. **Configure notifications & automations** で、モニターに名前を付け、通知メッセージを指定します。関連する詳細と意味のあるメッセージテンプレートを含めます。例:

     ```
       {{#is_alert}}Warning: Free disk space is below 10% on {{host.name}}. Free space: {{system.disk.free}} bytes, Total space: {{system.disk.total}} bytes.{{/is_alert}}
     ```

7. **Create** をクリックしてモニターを保存します。

[1]: https://app.datadoghq.com/monitors/