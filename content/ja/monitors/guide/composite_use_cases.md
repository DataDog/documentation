---
further_reading:
- link: monitors/types/composite/
  tag: ドキュメント
  text: Composite Monitor タイプ
title: Composite Monitor の使用例
---


## 概要

このガイドでは、Composite Monitor の代表的な使用例を紹介します。これらの例は、モニタリング環境でさまざまなユースケースに対応できるように Composite Monitor を構成する方法を示しています。

- [エラーレート](#error-rates)
- [頻繁に発生するメトリクスの監視](#monitor-frequent-metrics)
- [ステップモニター](#step-monitor)
- [リカバリー時の再通知](#renotifying-on-recovery)
- [通知の遅延](#delay-on-notification)


## エラーレート

ヒット数が一定数を超えている場合に限り、エラーレートがしきい値を上回ったときにアラートを送る例です。

以下の 2 つのモニターを作成します:

- **Monitor A**: `trace.requests.request.errors / trace.requests.request.hits > X` のときにアラート
- **Monitor B**: `trace.requests.request.hits > Y` のときにアラート

**Composite Monitor C**: Monitor A と Monitor B の両方がアラート状態の場合にアラート (A && B)

| Monitor A  | Monitor B  | Composite Monitor C  |
|-----------|-----------|---------------------|
| **Alert** エラーレートがしきい値を超過 | **Alert** ヒット数がしきい値を超過 | **Alert** |
| **Alert** エラーレートがしきい値を超過 | **OK** ヒット数がしきい値未満  | **OK** 条件が1つのみ満たされておりアラートなし |
| **OK** エラーレートがしきい値未満  | **Alert** ヒット数がしきい値を超過 | **OK** 条件が1つのみ満たされておりアラートなし |

より多くの状態の組み合わせについては、[Composite Monitor](https://docs.datadoghq.com/monitors/create/types/composite/#computing-trigger-conditions) を参照してください。

## 頻繁に発生するメトリクスの監視

サービスのレイテンシーを監視するときに、トラフィックの少ない時間帯などで一時的に発生するスパイクを無視したい場合の例です。

以下の 2 つのモニターを作成します:

- **Monitor A**: `latency > X` のときにアラート
- **Monitor B**: 過去 1 時間において `sum:latency{*}.rollup(count) > Y` のときにアラート

**Composite Monitor C**: 両方の条件が満たされた場合にアラート

| Monitor A | Monitor B | Composite Monitor C |
|-----------|-----------|---------------------|
| **Alert** レイテンシーがしきい値超過 | **Alert** メトリクス総数が Y 超過 | **Alert** |
| **Alert** レイテンシーがしきい値超過 | **OK** メトリクス総数が Y 未満  | **OK** メトリクスが十分でない |
| **OK** レイテンシーがしきい値未満  | **Alert** メトリクス総数が Y 超過 | **OK** Latency below threshold**OK** レイテンシーが問題ないがメトリクスは多い  |

## ステップモニター

ペアになるメトリクスが欠如した場合にアラートを送る例です。たとえば、送信/受信、ダウン/アップ、作成/解決などのログメトリクスがペアになっている場合を想定します。ペアのメトリクスが N 分以内に報告されることを想定している場合は、各モニターの評価ウィンドウを調整します。

- **Monitor A**: `action:create` が 0 を上回ったらアラート
- **Monitor B**: `action:resolve` が 0 を上回ったらアラート

**Composite**: `a && !b` (Monitor A がアラート && Monitor B がアラートでない) ならアラート

| Monitor A  | Monitor B  | Composite Monitor C |
|-----------|-----------|---------------------|
| **Alert** Action create > 0 | **Alert** Action resolve > 0 | **OK** |
| **Alert** Action create > 0 | **OK** | **Alert** Action resolve が発生していない  |
| **OK** | **Alert** Action resolve > 0 | **OK** |

## リカバリー時の再通知

`timeshift` を使用した 2 つのモニターによって、リカバリー時に再通知を行う例です。

- **Monitor A**: 現在のメトリクス状態
- **Monitor B**: `timeshift` を使用した過去のメトリクス状態

**Composite Monitor**: `!a && b` (現在がアラートではなく、過去はアラート状態)

| Monitor A  | Monitor B | Composite Monitor C  |
|-----------|-----------|---------------------|
| **Alert** リアルタイムのメトリクス | **Alert** 過去のメトリクス  | **OK** |
| **Alert** リアルタイムのメトリクス | **OK** トリガーなし | **OK** |
| **OK** トリガーなし | **Alert** 過去のメトリクス | **Alert**  |

## 通知の遅延

一定時間エラーが持続した場合にアラートを送る例です。たとえば、少なくとも 15 分間エラーが持続しているときにアラートを送る場合。

- **Monitor A**: リアルタイムのメトリクス
- **Monitor B (timeshifted)**: X 分シフトしたメトリクス

**Composite Monitor**: `a && b` (両方がアラート状態)

| Monitor A | Monitor B (timeshifted) | Composite Monitor C |
|-----------|--------------------------|---------------------|
| **Alert** リアルタイム | **Alert** 過去のメトリクス | **Alert** |
| **Alert** リアルタイム | **OK** トリガーなし  | **OK** |
| **OK** トリガーなし  | **Alert** 過去のメトリクス | **OK** |

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}