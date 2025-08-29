---
further_reading:
- link: /api/latest/monitors/
  tag: API
  text: Monitors API ドキュメント
title: On Missing Data 設定への移行
---

## 概要

メトリクス モニターは欠損データの処理に関する拡張オプションを提供し、欠損データを障害モードとして扱う場合と健全な状態とみなす場合を区別できます。

これらのオプションは、Logs、 Events、 CI、 Database、 Error Tracking などの他のモニター タイプで利用できる内容と整合しています。

## On Missing Data オプションを使う利点

エラーのような不良イベントの件数を測定している場合、データが検出されないときはモニターは「OK」を示すべきです。従来の No Data 設定では、モニターは No Data を報告していました。On Missing Data の設定オプションにより、モニターは健全性の状態をより正確に反映でき、明確さが向上します。

## UI から管理しているモニター

UI からモニターを管理している場合、次回編集時に設定が自動的に更新されます。より早く On Missing Data 設定を更新するには、以下の API を介した調整のセクションを参照してください。

## API または Terraform で管理しているモニター

API または Terraform でモニターを管理している場合は、 `notify_no_data` と `no_data_timeframe` を `on_missing_data` に置き換えてください。`on_missing_data` は time window と同じ時間枠を使用するため、 `no_data_timeframe` パラメーターは不要です。

### API パラメーター

従来の No Data パラメーター `notify_no_data` は既存のモニターで引き続き利用できますが、新しい `on_missing_data` 機能に自動移行はされません。

| パラメーター                               | UI 説明                                                                                     |
|-----------------------------------------|----------------------------------------------------------------------------------------------------|
| `"on_missing_data": "show_and_notify_no_data"` | データがない場合は NO DATA を表示して通知<br>(旧: "Notify if data is missing")                       |
| `"on_missing_data": "show_no_data"`     | データがない場合は NO DATA を表示<br>(旧: "Do not notify if data is missing")                           |
| `"on_missing_data": "resolve"`          | データがない場合は OK を表示                                                                       |
| `"on_missing_data": "default"` (sum または count のアグリゲーションを使用している場合) | データがない場合は 0 (またはその他のデフォルト値) として評価                                  |
| `"on_missing_data": "default"` (上記以外のアグリゲーション タイプを使用している場合) | データがない場合は最後に既知のステータスを表示 |

利用可能なすべてのフィールドについては、[API ドキュメント][1] を参照してください。

以下は、これらのフィールドを含む JSON モニターの Before/After 例です:

**Before**  
{{< highlight yaml "hl_lines=11-12" >}}{ 
  "name": "ホスト $host.value の CPU 使用率が高い",  
    "type": "query alert",  
    "query": "avg(last_5m):100 - avg:system.cpu.idle{$host} > 90",  
    "message": "ホスト $host.value で CPU 使用率の上昇が検出されました。これはシステム パフォーマンスに影響する可能性があります。",  
    "tags": [],  
    "options": {  
        "thresholds": { "critical": 90 },  
        "notify_audit": false,  
        "include_tags": false,  
        "notify_no_data": true,  
        "no_data_timeframe": 10  
    }  
}
{{< /highlight >}}


**After**  
{{< highlight yaml "hl_lines=11" >}}{
  "name": "ホスト $host.value の CPU 使用率が高い",  
    "type": "query alert",  
    "query": "avg(last_5m):100 - avg:system.cpu.idle{$host} > 90",  
    "message": "ホスト $host.value で CPU 使用率の上昇が検出されました。これはシステム パフォーマンスに影響する可能性があります。",  
    "tags": [],  
    "options": {  
       "thresholds": { "critical": 90 },  
       "notify_audit": false,  
       "include_tags": false,  
       "on_missing_data": "show_and_notify_no_data"  
    }  
}  
{{< /highlight >}}

## SLO モニター

SLO は稼働時間と停止時間を以下の対応で扱います:

| On Missing Data 設定 | モニター ステータス                 | SLO の扱い               |
|-------------------------------|--------------------------------|-----------------------------|
| Show OK                       | OK                             | Uptime                      |
| Show No Data                  | No Data                        | Uptime                      |
| Show No Data and Notify       | No Data                        | Downtime                    |
| Show last known status        | 最後のステータスに依存   | OK の場合は Uptime<br>Alert の場合は Downtime |
| Evaluate as zero              | しきい値の設定に依存 | OK の場合は Uptime<br>Alert の場合は Downtime |

## 関連情報

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/api/latest/monitors/