---
aliases:
- /ja/security/threats/security_signals
- /ja/security/workload_protection/security_signals
- /ja/security_platform/cspm/signals_explorer
- /ja/security/cspm/signals_explorer
- /ja/security/misconfigurations/signals_explorer
- /ja/security/cloud_security_management/misconfigurations/signals_explorer/
description: Workload Protection の検知ルールによって生成されたセキュリティシグナルを検索、フィルタリング、およびトリアージします。
disable_toc: false
further_reading:
- link: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
  tag: ドキュメント
  text: Workload Protection の検知ルールを調査する
- link: /security/notifications/
  tag: ドキュメント
  text: セキュリティ通知について詳しく説明します
title: シグナル
---
[Workload Protection][1] セキュリティシグナルは、Datadog がセキュリティルールに基づいて脅威を検知したときに作成されます。[シグナルエクスプローラー][2]でセキュリティシグナルを表示、検索、フィルタリング、調査するか、[通知ルール][3]を構成してサードパーティツールにシグナルを送信します。

## シグナルエクスプローラー{#signals-explorer}

[シグナルエクスプローラー][2]には、[検知ルール][5]によって生成された Workload Protection セキュリティシグナルが一覧表示されます。検索バーまたはファセットパネルを使用して、重大度、トリアージ状態、検知ルール、ホスト、コンテナ、およびその他の属性でシグナルをフィルタリングします。たとえば、トリアージ状態でフィルタリングするには `@workflow.triage.state:<status>` を使用します。ここで `<status>` は目的の状態 (`open`、`under_review`、または `archived`) です。ファセットパネルの {{< ui >}}Signal State{{< /ui >}} ファセットを使用することもできます。

シグナルを選択してサイドパネルを開きます。そこから、調査グラフ、タイムライン、コンテキスト、およびシグナル JSON を使用して[脅威を調査][6]したり、[アクションを実行][7]してシグナルのトリアージ、エスカレーション、自動化、または対応を行ったりできます。

## 次のステップ {#next-steps}

{{< whatsnext desc="Workload Protection シグナルの調査および対応方法については、以下を参照してください。" >}}
{{< nextlink href="/security/workload_protection/investigate_and_triage/security_signals/investigate" >}}調査グラフ、タイムライン、およびシグナル JSON を使用してシグナルを調査します。{{< /nextlink >}}
{{< nextlink href="/security/workload_protection/investigate_and_triage/security_signals/actions" >}}シグナルのトリアージと対応: 割り当て、エスカレーション、自動化、および強制実行{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /ja/security/workload_protection/
[2]: https://app.datadoghq.com/security/workload-protection/signals
[3]: /ja/security/notifications/rules/
[5]: /ja/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[6]: /ja/security/workload_protection/investigate_and_triage/security_signals/investigate
[7]: /ja/security/workload_protection/investigate_and_triage/security_signals/actions