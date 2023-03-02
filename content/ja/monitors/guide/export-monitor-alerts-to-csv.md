---
aliases:
- /ja/monitors/faq/how-can-i-export-alert-history
kind: ガイド
title: モニターアラートを CSV にエクスポート
---

過去 6 ヶ月間 (182 日間) の CSV を生成する[時間ごとのモニターデータ][1]を通して、モニターアラートの履歴をダウンロードすることができます。この CSV はライブではなく、週 1 回、月曜日 11:59AM UTC に更新されます。

**注**:

- この機能は、Datadog US サイトでのみサポートされています。
- CSV ファイルにアクセスするには、組織の管理者である必要があります。

{{< site-region region="us" >}}

curl を使用して CSV を取得する場合は、以下のようにします。

```shell
api_key=<DATADOG_API_KEY>
app_key = <DATADOG_APPLICATION_KEY>

curl -G \
    "https://app.datadoghq.com/report/hourly_data/monitor" \
    -d "api_key=${api_key}" \
    -d "application_key=${app_key}" \
```

応答例

```text
org_id,hour,source_type_name,alert_type,priority,event_object,host_name,device_name,alert_name,user,cnt
<org_id_integer>, 2018-06-07 17,monitor alert,error,1,<event_object_string>,test.example.eu,"Host name: {{host.name}} Name name: {{name.name}}",<user_email>,1
```
{{< /site-region >}}

{{< site-region region="eu,gov,us3,us5" >}}

この機能はサポートされていません。

{{< /site-region >}}

[1]: https://app.datadoghq.com/report/hourly_data/monitor