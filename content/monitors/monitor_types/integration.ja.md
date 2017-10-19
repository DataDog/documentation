---
title: インテグレーションを対象にしたMonitor
kind: documentation
autotocdepth: 3
hideguides: true
customnav: monitortypenav
description: "Monitor metric values or health status from a specific integration"
---

<!--
### Integration Monitors


On the integration tab you will see a list of your installed integrations. Upon
selection, you can choose to monitor either a "Status" or a "Metric".

- Choosing **Integration Status** will present you with one or more service
  checks for each integration. Please refer to the
  [custom monitors](#check-alerting) section for details on the
  available options.

- Choosing **Integration Metric** will provide a familiar interface used for a
  interface used for a Metric Monitor. You will be able to choose from any of
  the metrics provided by this integration. Please refer to the
  [alert conditions](#metric-conditions) section for details on the available
  options.
-->

{{< img src="monitors/monitor_types/integration/es_status.png" >}}

インテグレーションタブをクリックすると、既にインストールされているインテグレーションのタイルがタブの下に表示されます。そのタイルを選択すると`Status`または`Metric`というMonitorの設定を選択できるようになります。

- **Integration Status** を選択すると、そのインテグレーション用のサービスチェックを１つ以上提示します。設定で利用可能なオプションの詳細については、[カスタムチェックを対象にしたMonitor](#カスタムチェックを対象にしたmonitor)のセクションを参照してください。

- **Integration Metric**を選択すると、メトリクスを対象にしたMonitorと同等の設定インターフェイスが表示されます。この設定画面の`Select a metrics`の項目では、インテグレーションが収集している全てのメトリクスから選択することができます。項目②の"Set alert conditions"のオプションに関しては、先の"メトリクスを対象にしたMonitor"のセクションの "アラート条件の設定" を参照してください。