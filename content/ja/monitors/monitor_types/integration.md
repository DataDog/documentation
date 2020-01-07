---
title: インテグレーションモニター
kind: documentation
description: 特定のインテグレーションのメトリクス値または健全性ステータスを監視する
further_reading:
  - link: monitors/notifications
    tag: Documentation
    text: モニター通知の設定
  - link: monitors/downtimes
    tag: Documentation
    text: モニターをミュートするダウンタイムのスケジュール
  - link: monitors/monitor_status
    tag: Documentation
    text: モニターステータスの参照
---
{{< img src="monitors/monitor_types/integration/es_status.png" alt="es status"  >}}

## 概要

Integration タブには、インストールされているインテグレーションのリストが表示されます。インテグレーションを選択したら、「ステータス」と「メトリクス」のどちらを監視するかを選択できます。

- **Integration Status** を選択すると、各インテグレーションの 1 つまたは複数のサービスチェックが提示されます。使用可能なオプションの詳細については、[カスタムモニター][1]のセクションを参照してください。

- **Integration Metric** を選択すると、メトリクスモニターと同じで使い慣れたインターフェイスが表示されます。このインテグレーションに用意されている任意のメトリクスを選択できます。使用可能なオプションの詳細については、[アラート条件][2]のセクションを参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/monitor_types/custom_check
[2]: /ja/monitors/monitor_types/#define-the-conditions