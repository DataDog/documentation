---
title: サービス一覧画面
kind: documentation
further_reading:
  - link: /tracing/setup/
    tag: Documentation
    text: アプリケーションで APM トレースをセットアップする方法
  - link: /tracing/visualization/service/
    tag: Documentation
    text: Datadog のサービスについて
  - link: /tracing/visualization/resource/
    tag: Documentation
    text: リソースのパフォーマンスとトレースの詳細
  - link: /tracing/visualization/trace/
    tag: Documentation
    text: Datadog トレースの読み方を理解する
---
{{< img src="tracing/visualization/services_page.png" alt="サービスページ"  >}}

## 概要

[アプリケーションをインスツルメント][1]すると、レポーと作成[サービス][2]が [APM サービスページ][3]に表示されます。このサービス一覧画面では、インフラストラクチャーのレポート作成を行うすべての[サービス][4]を俯瞰で確認することができます。
個々のサービスを選択すると、詳細なパフォーマンスインサイトが表示されます。[詳しくは、サービスのドキュメントを参照してください][4]。

## サービスリストのフィルタリング

次を使用して、サービスリストをフィルタリングします。

* [環境][5]
* [プライマリタグ][6]
* [サービスタイプ](#services-types)
* クエリ（基本的なテキストフィルタリング）

{{< img src="tracing/visualization/services_filtering.mp4" alt="サービスのフィルタリング" video="true"  width="75%" >}}

### サービスタイプ

アプリケーションによって監視されるすべてのサービスは、"Type" に関連付けられます。このタイプは、[スパン][7]にアタッチされる `span.type` 属性に基づき、Datadog が自動的に判断します。"Type" によって、Datadog Agent がインテグレーションしているアプリケーションやフレームワークの名前が特定されます。

たとえば、Flask の公式インテグレーションを使用している場合は、"Type" が "Web" にセットされ、カスタムアプリケーションを監視している場合は、"Type" が "Custom" にセットされます。

サービスのタイプは次のいずれかに設定されます。

*  Cache
*  Custom
*  DB
*  Serverless function
*  Web

また、たとえば Postgre、MySQL、Cassandra のインテグレーションでは、エイリアスが Type: "DB" にマッピングされ、Redis や Memcache のインテグレーションでは Type: "Cache" にマッピングされます。

### サービスの色の変更

[トレースを可視化][8]するために、サービスの色が使用されます。サービスの色を選んで変更することができます。

{{< img src="tracing/visualization/service_color.png" alt="サービスの色"  style="width:30%;">}}

## 列の選択

サービス一覧画面に表示するものを選択します。

* **Requests**: トレースされたリクエストの合計量（1 秒あたり）
* **Avg/p75/p90/p95/p99/Max Latency**: トレースされたリクエストの平均/p75/p90/p95/p99/最大レイテンシー
* **Error Rate**: トレースされたリクエストのうち、エラーで終了した量（1 秒あたり）
* **Apdex**: サービスの Apdex スコア。[Apdex の詳細][9]
* **Monitor status**: サービスにアタッチされた[モニターのステータス][10]

{{< img src="tracing/visualization/services_columns.png" alt="サービス列"  style="width:40%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/send_traces/
[2]: /ja/tracing/visualization/#services
[3]: https://app.datadoghq.com/apm/services
[4]: /ja/tracing/visualization/service/
[5]: /ja/tracing/guide/setting_primary_tags_to_scope/#environment
[6]: /ja/tracing/guide/setting_primary_tags_to_scope/
[7]: /ja/tracing/visualization/trace/#spans
[8]: /ja/tracing/visualization/trace/
[9]: /ja/tracing/faq/how-to-configure-an-apdex-for-your-traces-with-datadog-apm/
[10]: /ja/tracing/visualization/service/#service-monitor
