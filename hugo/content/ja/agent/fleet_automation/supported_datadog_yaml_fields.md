---
description: Fleet AutomationでサポートされているAgent設定フィールドのリファレンス。
further_reading:
- link: /agent/fleet_automation/
  tag: ドキュメント
  text: Fleet Automation
- link: /agent/fleet_automation/configure_agents/
  tag: ドキュメント
  text: エージェントの構成
- link: /api/latest/fleet-automation/
  tag: ドキュメント
  text: Fleet Automation API
site_support_id: fleet-automation-standard-features
title: サポートされているdatadog.yaml設定フィールド
---
Fleet Automationは、[Agentを設定][1]する際に`datadog.yaml`フィールドのサブセットをサポートしています。提供されたすべての変更はスキーマに対して検証され、ここに記載されていないフィールドはスキーマ検証エラーとして拒否されます。

以下のセクションを展開して、サポートされている各フィールドの型、説明、および有効な値を確認してください。

{{% fa-config-fields %}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/fleet_automation/configure_agents/