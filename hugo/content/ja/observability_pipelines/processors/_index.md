---
aliases:
- /ja/observability_pipelines/processors/tail_based_sampling/
description: Observability Pipelines でログ、メトリクス、トレースをパース、構造化、およびエンリッチするために利用できるプロセッサーについて説明します。
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/rehydrate-archived-logs-with-observability-pipelines
  tag: ブログ
  text: Observability Pipelines を使用して、任意の SIEM またはログベンダーでアーカイブされたログをリハイドレートします。
- link: https://www.datadoghq.com/blog/observability-pipelines-transform-and-enrich-logs/
  tag: ブログ
  text: Datadog Observability Pipelines によるログの変換と強化
title: プロセッサー
---
## 概要 {#overview}

<div class="alert alert-info">このドキュメントで説明しているプロセッサーは、オンプレミスのログ環境に特化しています。クラウドベースのログをパース、構造化、およびエンリッチするには、<a href="https://docs.datadoghq.com/logs/log_configuration/logs_to_metrics">Log Management</a> のドキュメントを参照してください。</div>

Observability Pipelines のプロセッサーを使用して、ログとメトリクスをパース、構造化、およびエンリッチします。UI でパイプラインを作成すると、選択したテンプレートに基づいて、あらかじめ選択されたプロセッサーがプロセッサーグループに追加されます。処理のニーズに応じて、プロセッサーを追加したり、既存のプロセッサーを削除したりできます。

プロセッサーグループは上から順に実行されます。イベントは各プロセッサーによってチェックされますが、プロセッサーのフィルターに一致するイベントのみが処理されるため、プロセッサーの順序は重要です。プロセッサーの順序を変更するには、移動したいプロセッサーの左上隅にあるドラッグハンドルを使用します。

**注**: パイプラインキャンバスには、プロセッサーグループが 25 個、プロセッサーが合計 150 個という制限があります。

## プロセッサー {#processors}

利用可能なプロセッサーは以下のとおりです。

{{< tabs >}}
{{% tab "ログ" %}}

- [Add Environment Variables プロセッサー][1]
- [Add Hostname プロセッサー][2]
- [Custom プロセッサー][3]
- [Deduplicate プロセッサー][4]
- [Edit Fields プロセッサー][5]
- [Enrichment Table プロセッサー][6]
- [Filter プロセッサー][7]
- [Generate Metrics プロセッサー][8]
- [Grok Parser プロセッサー][9]
- [Parse JSON プロセッサー][10]
- [Parse XML プロセッサー][11]
- [Quota プロセッサー][12]
- [Reduce プロセッサー][13]
- [Remap to OCSF プロセッサー][14]
- [Sample プロセッサー][15]
- [Sensitive Data Scanner プロセッサー][16]
- [Split Array][17]
- [Tags][18]
- [Throttle][19]

[1]: /ja/observability_pipelines/processors/add_environment_variables/
[2]: /ja/observability_pipelines/processors/add_hostname/
[3]: /ja/observability_pipelines/processors/custom_processor/
[4]: /ja/observability_pipelines/processors/dedupe/
[5]: /ja/observability_pipelines/processors/edit_fields/
[6]: /ja/observability_pipelines/processors/enrichment_table/
[7]: /ja/observability_pipelines/processors/filter/
[8]: /ja/observability_pipelines/processors/generate_metrics/
[9]: /ja/observability_pipelines/processors/grok_parser/
[10]: /ja/observability_pipelines/processors/parse_json/
[11]: /ja/observability_pipelines/processors/parse_xml/
[12]: /ja/observability_pipelines/processors/quota/
[13]: /ja/observability_pipelines/processors/reduce/
[14]: /ja/observability_pipelines/processors/remap_ocsf/
[15]: /ja/observability_pipelines/processors/sample/
[16]: /ja/observability_pipelines/processors/sensitive_data_scanner/
[17]: /ja/observability_pipelines/processors/split_array/
[18]: /ja/observability_pipelines/processors/tags/
[19]: /ja/observability_pipelines/processors/throttle/

{{% /tab %}}
{{% tab "メトリクス" %}}

- [Aggregate][1]
- [Edit Tags][2]
- [Filter][3]
- [Tag Allow/Block List][4]
- [Tag Cardinality Control][5]

[1]: /ja/observability_pipelines/processors/aggregate/
[2]: /ja/observability_pipelines/processors/edit_tags/
[3]: /ja/observability_pipelines/processors/filter/
[4]: /ja/observability_pipelines/processors/tag_allow_block_list/
[5]: /ja/observability_pipelines/processors/tag_cardinality_control/

{{% /tab %}}
{{< /tabs >}}

## プロセッサーグループ {#processor-groups}

<div class="alert alert-info">プロセッサーグループを使用したパイプラインの構成は、Worker バージョン 2.7 以降でのみ利用可能です。</div>

{{< img src="observability_pipelines/processors/processor_groups.png" alt="Splunk HEC ソースを使用して 3 つのプロセッサーグループにログを送信するパイプライン。各グループには独自のフィルターとプロセッサーがあり、そこから Microsoft Sentinel および Splunk HEC の送信先にログが送信されます。" style="width:100%;" >}}

プロセッサーを論理グループに整理することで、管理しやすくなります。各プロセッサーグループにはグループフィルターがあり、特定のイベントにのみそれらのプロセッサーが適用されるようになっています。たとば、グループプロセッサーで `vpc` から送られるイベントのみを処理したい場合は、グループフィルター `source:vpc` を使用します。個々のプロセッサーにフィルターを追加することも可能です。

プロセッサーグループおよび各グループ内のプロセッサーは、上から順に実行されます。イベントは各プロセッサーによってチェックされますが、プロセッサーのフィルターに一致するイベントのみが処理されるため、プロセッサーの順序は重要です。プロセッサーの順序を変更するには、移動したいプロセッサーの左上隅にあるドラッグハンドルを使用します。

**注**: パイプラインキャンバス 1 つにつき、最大 25 個のプロセッサーグループという制限があります。たとば、2 つの送信先を持つデュアルシップパイプラインの場合、両方の送信先を合わせたプロセッサーグループの総数は 25 個を超えることはできません。一方の送信先に 15 個、もう一方に 10 個といったように、どのような組み合わせでも配置できます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}