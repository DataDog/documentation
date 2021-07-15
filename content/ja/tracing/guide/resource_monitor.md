---
title: APM リソースモニター
kind: documentation
aliases:
  - /ja/tracing/faq/how-to-create-a-monitor-over-every-resource-apm
  - /ja/tracing/getting_further/resource_monitor
---
Datadog の APM は、大部分のレイヤーのトップに位置付けられる主要なコンポーネント、[サービス][1]と[リソース][2]から構成されています。

APM の[サービス][3]および[リソース][4]ダッシュボードの各グラフは、いくつかの `trace.*` メトリクスで構成されています。
[グラフ上部のダウンロードボタンを使用][5]すると、メトリクスを既存のタイムボードに保存できます。サービスレベルでもリソースレベルでも保存が可能です。

{{< img src="tracing/faq/apm_save_1.png" alt="APM の保存"  >}}

**注**: リソースにモニターを構築するには、リソース名のハッシュを含むリソースタグを使用します。これを検索するには、タイムボードにメトリクスを保存し、メトリクスモニターで同じクエリを使用します。

## モニターの作成

現在の APM モニターでも[サービスごと][6]にアラートを設定できますが、上記で取得したメトリクスクエリを使用すると、特定のサービスやリソースに、メトリクスだけでなく異常検知モニターもセットアップできます。

通常の Datadog メトリクスおよびタグであるため、そのクエリを新しいモニターにコピーします。
下記の例では、フィールドの名前がわかりやすいものではなくリソースのハッシュであることがわかります。これに対処するには、モニターメッセージがモニターをトリガーしたリソースのリソースステータス画面へのリンクを送信するように構築します。各リソースの APM ステータス画面のフォーマットは次のようになります。

```text
/apm/resource/<Service>/<TOP_LEVEL_NAME>/<Resource_Name>?env=<env>
```

各サービスにはトップレベル名が 1 つ含まれているため、[環境][7]別の複数アラート、リソース、サービスをセットアップできます。URL の作成には、トップレベル名の取得だけが必要となります。
トップレベル名は、対象のサービスをクリックすると表示されます。たとえば、Datadog の Mcnulty-Web サービスの場合、トップレベル名は `pylons.request` です。

{{< img src="tracing/faq/top_level_name.png" alt="トップレベル名"  >}}

モニターのコンフィギュレーションは以下のようになります。

{{< img src="tracing/faq/top_level_monitor.png" alt="トップレベルモニター"  >}}

[1]: /ja/tracing/visualization/service/
[2]: /ja/tracing/visualization/resource/
[3]: /ja/tracing/visualization/#services
[4]: /ja/tracing/visualization/#resources
[5]: /ja/tracing/visualization/service/#export-to-timeboard
[6]: /ja/monitors/monitor_types/apm/
[7]: /ja/tracing/guide/setting_primary_tags_to_scope/#environment