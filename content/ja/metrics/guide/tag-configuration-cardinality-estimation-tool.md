---
title: タグコンフィギュレーションカーディナリティ推定ツール
kind: ガイド
is_beta: true
---
<div class="alert alert-warning">この機能は非公開ベータ版で、エンドポイントは変更される可能性があります。</div>

## 概要

タグコンフィギュレーションカーディナリティ推定ツールは、特定のメトリクスの特定のタグコンフィギュレーションから生じる個別のカスタムメトリクスの数を推定するのに役立ちます。始める前に、[Datadog API とアプリキー][1]が必要です。

### パス

```
GET https://api.datadoghq.com/api/metric/estimate
```

## リクエスト

### パラメーター

| フィールド                     | タイプ             | 説明                                                                                                                                                                         |
|---------------------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `metric_name` (*必須*) | 文字列           | 推定するメトリクスの名前。                                                                                                                                                     |
| `groups[]`                | 文字列のリスト | 時系列の出力を推定するときに含めるグループ。                                                                                                                           |
| `hours_ago`               | 整数          | 履歴データを取得するときに戻る時間数。デフォルト値は 49 で、49 未満の値では正確な結果が得られない可能性があります。                                                                 |
| `timespan_h`              | 整数          | 追跡する `hours_ago` 値の前の時間数。Datadog は 1 時間のタイムスパンを推奨しています。                                           |
| `pct`                     | boolean          | ディストリビューション、カウント、またはゲージの代わりに、パーセンタイル出力系列の数を計算します。デフォルトは `false` です。ディストリビューションメトリクスに対してのみ機能し、それ以外の場合はエラーを返します。 |

### 例

```curl
https://api.datadoghq.com/metric/estimate?metric_name=dist.dd.dogweb.latency&groups[]=host&groups[]=page&hours_ago=120&pct=true
```

## 応答

### モデル

| フィールド                     | タイプ             | 説明                                                                                                                                                                      |
|---------------------------|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `estimated_output_series` | 整数          | 指定されたグループのリクエストによって指定されたタイムスパンの時点で出力された一意の時系列の数 (現在から `hours_ago` (時間前) から現在から `hours_ago` (時間前) 引く `timespan_h` まで)。 |
| `estimate_type`           | 文字列           | 推定されるメトリクスのタイプ。[ディストリビューション][2]、[パーセンタイル][3]、[カウント][4]、[ゲージ][5]のいずれか。                                                                                         |
| `as_of`                   | タイムスタンプ文字列 | 使用された最新のデータの UTC タイムスタンプ (現在から `hours_ago` (時間前))。例: `2020-04-16 09:25:40.214469`                                                              |

### 例

```json
{"estimated_output_series":35334,"estimate_type":"percentile","as_of":"2020-04-16 09:29:57.789176"}
```



[1]: /ja/account_management/api-app-keys/
[2]: /ja/developers/metrics/types/?tab=distribution#metric-types
[3]: /ja/developers/metrics/types/?tab=distribution#calculation-of-percentile-aggregations
[4]: /ja/developers/metrics/types/?tab=count#metric-types
[5]: /ja/developers/metrics/types/?tab=gauge#metric-types