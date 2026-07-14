---
further_reading:
- link: /metrics/
  tag: ドキュメント
  text: メトリクスのドキュメント
private: true
title: OpenTelemetry と Datadog のメトリクスを組み合わせる
---

## 概要

{{< callout url="#" btn_hidden="true" header="Preview に参加する">}}
<code>equiv_otel()</code> 関数は Preview 提供中です。この機能に関するフィードバックがあれば、担当のアカウント チームまでお寄せください。
{{< /callout >}}

Datadog と OpenTelemetry (OTel) では、インテグレーション メトリクスの命名規則が異なります。このガイドでは、Datadog の `equiv_otel` 関数を使って、両方のシステムのメトリクスを 1 つのクエリにまとめる方法を説明します。

<div class="alert alert-info">Datadog UI で Datadog と OpenTelemetry のメトリクスを横断的にクエリするには、<a href="/metrics/open_telemetry/query_metrics">OpenTelemetry メトリクスをクエリする方法</a> を参照してください。</div>

## メトリクスを組み合わせる際の課題

Datadog と OTel のメトリクスを併用すると、主に 2 つの課題があります。ここでは、NGINX の接続監視を例に見ていきます:

### 命名規則の違い

Datadog と OTel では、同じ計測値でも表し方が異なります:
- Datadog: `nginx.net.connections` (アクティブ接続専用のメトリクス)
- OTel: `nginx.connections_current` (すべての接続状態を 1 つのメトリクスにまとめたもの)
  - Datadog のアクティブ接続メトリクスと一致させるには、`state:active` でフィルタする必要があります。

### 集計上の制約

別々のメトリクス クエリをそのまま組み合わせると、正しくない結果になることがあります。たとえば、次のクエリを組み合わせるとします:
```
avg:nginx.net.connections
avg:nginx.connections_current{state:active}
```
得られるのは、すべての時系列を通した真の平均ではなく、平均の平均です。これは、従来の [メトリクス関数][1] がデータを 1 つのメトリクスとして扱うのではなく、別々のクエリの結果を結合するためです。

## equiv_otel 関数でメトリクスを組み合わせる

`equiv_otel` 関数を使うと、対応する Datadog と OTel のメトリクスを 1 つのクエリ内で自動的に組み合わせられます。主な動作は次のとおりです。

- メトリクス名の変換を自動で処理
- すべての時系列を 1 つのメトリクスとして適切に集計
- 双方向に利用可能 (Datadog から OTel、または OTel から Datadog)
- クエリ本来の集計の意味を維持

### Datadog から OTel への変換

対応する OTel メトリクスもクエリに含めるには、Datadog のクエリを `equiv_otel` で包みます:

```
equiv_otel(avg:nginx.net.connections)
```
このクエリでは、次の処理が行われます。
1. 対応する OTel メトリクス (`nginx.connections_current{state:active}`) を特定
2. 両方のメトリクスの時系列を統合
3. すべてのデータ ポイントに対して集計 (`avg`) を適用

### OTel から Datadog への変換

OTel のクエリに Datadog のメトリクスを含める場合も、同じように使えます:

```
equiv_otel(avg:nginx.connections_current{state:active})
```
逆方向でも動作は同じで、対応する Datadog のメトリクス (`nginx.net.connections`) が自動的に含まれます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/dashboards/functions