---
description: モニターにおける欠損データの処理を改善するため、従来の No Data 構成から On Missing Data オプションへ移行します。
further_reading:
- link: /api/latest/monitors/
  tag: API
  text: Monitors API ドキュメント
title: On Missing Data 構成への移行
---
## 概要 {#overview}

メトリクスモニターは欠損データの処理に関する拡張オプションを提供し、欠損データを障害モードとして扱う場合と健全な状態とみなす場合を区別できます。

これらのオプションは、ログ、イベント、CI、データベース、Error Tracking などの他のモニタータイプで利用できる内容と整合しています。

## On Missing Data オプションを使う利点 {#benefits-of-using-on-missing-data-options}

エラーのような不良イベントの件数を測定する場合、データが検出されないときにモニターは「OK」を示すべきです。従来の No Data 設定では、モニターは No Data を報告していました。On Missing Data の設定オプションにより、モニターは健全性の状態をより正確に反映でき、明確さが向上します。

## UI から管理しているモニター {#monitors-managed-through-the-ui}

UI からモニターを管理している場合、次回編集時に設定が自動的に更新されます。より早く On Missing Data 設定を更新するには、以下の API を介した調整のセクションを参照してください。

## API または Terraform で管理しているモニター {#monitors-managed-through-the-api-or-terraform}

API または Terraform でモニターを管理している場合は、`notify_no_data` および `no_data_timeframe` を `on_missing_data` に置き換えてください。`on_missing_data` は時間枠と同じ期間枠を使用するため、`no_data_timeframe` パラメーターは不要です。 

### API パラメーター{#api-parameters}

従来の No Data パラメーター `notify_no_data` は既存のモニターで引き続き利用できますが、新しい `on_missing_data` 機能に自動移行はされません。

| パラメーター                               | UI の説明                                                                                     |
|-----------------------------------------|----------------------------------------------------------------------------------------------------|
| `"on_missing_data": "show_and_notify_no_data"` | データがない場合 {{< ui >}}Show NO DATA and notify{{< /ui >}}<br>(旧: "{{< ui >}}Notify if data is missing{{< /ui >}}")                       |
| `"on_missing_data": "show_no_data"`     | データがない場合 {{< ui >}}Show NO DATA{{< /ui >}}<br>(旧: "{{< ui >}}Do not notify if data is missing{{< /ui >}}")                           |
| `"on_missing_data": "resolve"`          | データがない場合 {{< ui >}}Show OK{{< /ui >}}                                                                       |
| `"on_missing_data": "default"` sum または count 集計を使用している場合 | データがない場合 {{< ui >}}Evaluate as 0{{< /ui >}} (またはその他のデフォルト値)                                  |
| `"on_missing_data": "default"` その他のすべての集計タイプを使用している場合 | データがない場合 {{< ui >}}Show last known status{{< /ui >}} |

利用可能なすべてのフィールドについては、[API ドキュメント][1] を参照してください。

以下は、これらのフィールドを含む JSON モニターの変更前/変更後の例です。

**変更前** 
{{< highlight yaml "hl_lines=11-12" >}}{ 
  "name": "CPU usage is high for host $host.value",  
    "type": "query alert",  
    "query": "avg(last_5m):100 - avg:system.cpu.idle{$host} > 90",  
    "message": "A high CPU usage has been detected for host $host.value, which can impact the system performance.",  
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


**変更後** 
{{< highlight yaml "hl_lines=11" >}}{
  "name": "CPU usage is high for host $host.value",  
    "type": "query alert",  
    "query": "avg(last_5m):100 - avg:system.cpu.idle{$host} > 90",  
    "message": "A high CPU usage has been detected for host $host.value, which can impact the system performance.",  
    "tags": [],  
    "options": {  
       "thresholds": { "critical": 90 },  
       "notify_audit": false,  
       "include_tags": false,  
       "on_missing_data": "show_and_notify_no_data"  
    }  
}  
{{< /highlight >}}

## モニターベースの SLO {#monitor-based-slos}

SLO は稼働時間と停止時間を以下の対応で扱います。

| On Missing Data 設定 | モニターステータス                 | SLO の扱い               |
|-------------------------------|--------------------------------|-----------------------------|
| {{< ui >}}Show OK{{< /ui >}}                       | OK                             | アップタイム                      |
| {{< ui >}}Show No Data{{< /ui >}}                  | No Data                        | アップタイム                      |
| {{< ui >}}Show No Data and Notify{{< /ui >}}       | No Data                        | ダウンタイム                    |
| {{< ui >}}Show last known status{{< /ui >}}        | 最後のステータスに依存   | OK の場合はアップタイム<br>アラートの場合はダウンタイム |
| {{< ui >}}Evaluate as zero{{< /ui >}}              | しきい値の設定に依存 | OK の場合はアップタイム<br>アラートの場合はダウンタイム |

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/api/latest/monitors/