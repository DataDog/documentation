---
description: Datadog で Workload Protection Agent イベント、セキュリティシグナル、および検出結果を調べます。
disable_toc: false
title: 調査とトリアージ
---
Workload Protection はランタイムアクティビティを評価する際、エージェントイベント、シグナル、および検出結果を生成します。Agent イベントエクスプローラーを使用してランタイムアクティビティを調査し、シグナルエクスプローラーを使用して脅威を調査し、検出結果エクスプローラーを使用してランタイムセキュリティ態勢の問題を確認します。

それぞれがどのように生成されるかについては、[Workload Protection の仕組み][4]を参照してください。

## Agent イベント {#agent-events}

[Agent イベント][1]は、ランタイムアクティビティが Agent ルールに一致したときに Datadog Agent によって生成される生のテレメトリです。Agent イベントエクスプローラーを使用して、このアクティビティを調査します。

## シグナル {#signals}

[シグナル][2]は、Agent イベントがバックエンドの検知ルールに一致したときに生成されます。シグナルエクスプローラーを使用して、脅威を調査し、シグナルをトリアージし、対応アクションを実行します。

{{< whatsnext desc="Workload Protection シグナルを試す:" >}}
{{< nextlink href="/security/workload_protection/investigate_and_triage/security_signals/investigate" >}}シグナルを調べる{{< /nextlink >}}
{{< nextlink href="/security/workload_protection/investigate_and_triage/security_signals/actions" >}}シグナルのトリアージと対応{{< /nextlink >}}
{{< /whatsnext >}}

## 検出結果 {#findings}

[検出結果][3] は、Agent イベントが検出結果ルールに一致したときに生成されます。検出結果エクスプローラーを使用して、ランタイムセキュリティ態勢の問題を確認します。

[1]: /ja/security/workload_protection/investigate_and_triage/agent_events
[2]: /ja/security/workload_protection/investigate_and_triage/security_signals
[3]: /ja/security/workload_protection/investigate_and_triage/security_findings
[4]: /ja/security/workload_protection/#evaluating-activity