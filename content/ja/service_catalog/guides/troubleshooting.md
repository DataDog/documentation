---
aliases:
- /ja/tracing/service_catalog/troubleshooting
- /ja/service_catalog/troubleshooting
further_reading:
- link: /tracing/service_catalog/setup/
  tag: ドキュメント
  text: サービスカタログの設定
kind: ドキュメント
title: サービスカタログのトラブルシューティング
---

## APM インスツルメンテーションサービスが表示されない

APM のインスツルメンテーションが行われていることがわかっているサービスがサービスカタログのリストに表示されない場合、選択した `env` (または選択したプライマリタグの値) または[セカンダリプライマリタグ][1]に対して過去 1 時間にパフォーマンスデータを発信していないことが考えられます。確認するには、**Performance** タブで、パフォーマンスメトリクスが表示されると思われる列にカーソルを合わせると、サービスがどの環境でアクティブになっているかという情報が表示されます。

{{< img src="tracing/service_catalog/svc_cat_troubleshooting_1.png" alt="過去 1 時間にパフォーマンスデータが報告されていないことを示すホバーメッセージ" >}}

## SLOs not listed in Setup Guidance section

The count in the Service Catalog Setup Guidance section reflects the number of SLOs with `service` tags. If your SLOs are not listed, verify that they have `service` tag values specified and that they match with the service names in other products such as APM and USM.

## Additional telemetry is available to a service but it's not listed

Service Catalog relies on the `DD_SERVICE` tag in all telemetry types (infrastructure metrics, logs, network performance monitoring) to gather information about a given service. If you don't see a telemetry type that you expect in the Service Catalog, ensure that you have configured the `DD_SERVICE` tag according to the instructions in [Unified Service Tagging][2]. 

## Can't add metadata for RUM services

Adding metadata for RUM services is not supported. 



## Multiple services share the same metadata

If you have many services that share the same metadata, you do not need separate `service.datadog.yaml` files for each one. You can define multiple services in a single `service.datadog.yaml` file by separating each service with a `---` separator. Copy and paste the shared metadata for the relevant dd-service entities. 

## Associated monitors not displayed in the Setup Guidance section

The Service Catalog associates monitors to services when you tag the monitor with `service` and [APM primary tags][3]. 

The total monitor count displayed on the **Setup Guidance** tab for a single service does not include muted monitors and groups. 


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[2]: /ja/getting_started/tagging/unified_service_tagging
[3]: /ja/tracing/guide/setting_primary_tags_to_scope