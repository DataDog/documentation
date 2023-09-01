---
aliases:
- /ja/tracing/visualization/trace/
further_reading:
- link: /tracing/trace_collection/
  tag: ドキュメント
  text: アプリケーションで APM トレースをセットアップする方法
- link: /tracing/services/services_list/
  tag: ドキュメント
  text: Datadog に報告するサービスの一覧
- link: /tracing/services/service_page/
  tag: ドキュメント
  text: Datadog のサービスについて
- link: /tracing/services/resource_page/
  tag: ドキュメント
  text: リソースのパフォーマンスとトレースの詳細
- link: /tracing/trace_explorer/trace_view/
  tag: ドキュメント
  text: Datadog トレースの読み方を理解する
kind: documentation
title: トレースビュー
---

個々の[トレース][1]を表示して、その[スパン][2]および関連するメタデータをすべて表示します。各トレースは、フレームグラフまたは（[サービス][3]またはホストごとにグループ化された）リストとして表示できます。

{{< img src="tracing/visualization/trace/trace.png" alt="トレース" style="width:90%;">}}

実行時間の内訳を計算し、**サービス** または **ホスト** のいずれかで配色を調整します。

{{< img src="tracing/visualization/trace/service_host_display.png" alt="サービスホストディスプレイ" style="width:40%;">}} 

フレームグラフの詳細を見るには、スクロールしてズームインします。

{{< img src="tracing/visualization/trace/trace_zoom.mp4" alt="トレースエラー" video="true" width="90%" >}}

リストビューでは、[リソース][4]が[サービス][3]ごとに総計され、対応するスパンカウントに従ってソートされます。サービスは、各サービスのトレースによって費やされる実行時間の相対的な割合によりソートされます。

25
{{< img src="tracing/visualization/trace/trace_list.png" alt="トレースリスト" style="width:90%;">}} 

### 詳細

{{< tabs >}}
{{% tab "Span tags" %}}

フレームグラフのスパンをクリックして、グラフの下にメタデータを表示します。エラーが出る場合、スタックトレースが提供されます。

{{< img src="tracing/visualization/trace/trace_error.png" alt="トレースエラー" style="width:90%;">}}

エラーを報告する[トレース][1]を分析している場合、特別な意味のタグ規則に従うと、特定のエラー表示が出ます。トレースを送信する際に、属性を `meta` パラメーターに追加できます。

一部の属性には、Datadog 専用の表示または特定の動作につながる特別な意味があります。

| 属性     | 説明                                                                                                                                                                        |
| ----          | ------                                                                                                                                                                             |
| `sql.query`   | 特定の SQL クエリフォーマットを許可し、Datadog の UI に表示します。                                                                                                                     |
| `error.msg`   | 専用のエラーメッセージを表示します。                                                                                                                                        |
| `error.type`  | 専用のエラータイプを表示します。利用可能なタイプには、たとえば、Python の `ValueError` または `Exception` や、Java の `ClassNotFoundException` または`NullPointerException` があります。 |
| `error.stack` | Datadog の UI（赤いボックスなど）で例外のスタックトレースをより適切に表示できます。                                                                                         |

{{< img src="tracing/visualization/trace/trace_error_formating.png" alt="フォーマットエラー" >}}

[1]: /ja/tracing/glossary/#trace
{{% /tab %}}
{{% tab "Host Info" %}}

トレース時間にまつわるホストタグやグラフなど、トレースに関連するホスト情報を表示します。

{{< img src="tracing/visualization/trace/trace_host_info.png" alt="トレースホスト情報" style="width:90%;">}}

{{% /tab %}}
{{% tab "Logs" %}}

トレース時にサービスに関連するログを参照します。ログにカーソルを合わせると、そのタイムスタンプを示すラインがトレースフレームグラフに表示されます。ログをクリックすると、[ログエクスプローラー検索][1]が表示されます。

{{< img src="tracing/visualization/trace/trace_logs.png" alt="トレースログ" style="width:90%;">}}


[1]: /ja/logs/explorer/search/
{{% /tab %}}
{{% tab "Processes" %}}

サービスのスパンをクリックすると、基礎インフラストラクチャーで実行中のプロセスを確認できます。サービスのスパンプロセスは、リクエスト時にサービスが実行されているホストまたはポッドと相関関係にあります。CPU および RSS メモリなどのプロセスメトリクスをコードレベルのエラーとともに分析することで、アプリケーション特有の問題かインフラストラクチャーの問題かを見分けることができます。プロセスをクリックすると、[ライブプロセス ページ][1]が開きます。スパン固有のプロセスを表示するには、[プロセスの収集][2]を有効にします。現在、関連するプロセスはサーバーレスおよびブラウザのトレースでサポートされていません。

{{< img src="tracing/visualization/trace/trace_processes.png" alt="トレースのプロセス" style="width:90%;">}}

[1]: https://docs.datadoghq.com/ja/infrastructure/process/?tab=linuxwindows
[2]: https://docs.datadoghq.com/ja/infrastructure/process/?tab=linuxwindows#installation
{{% /tab %}}

{{% tab "ネットワーク" %}}

サービスのスパンをクリックして、リクエストを行っているサービスネットワークの依存関係を確認します。特に、コードエラーが生成されない場合には、ボリューム、エラー (TCP 再送)、ネットワークレイテンシー (TCP ラウンドトリップ時間) などの主要なネットワークパフォーマンスのメトリクスを使用して、アプリケーション固有の問題とネットワーク全体の問題の切り分けを行います。たとえば、ネットワークのテレメトリーを使用して、リクエストのレイテンシーが高い理由 (関連するアプリケーションのトラフィックがオーバーロードした、ダウンストリームのポッドやセキュリティグループ、その他のタグ付けされたエンドポイントとの依存関係に問題があったなど) を特定することができます。プロセスをクリックすると [Network Analytics][1] ページが開きます。スパン固有のプロセスを閲覧するには、[ネットワークパフォーマンスモニタリング][2]を有効にしてください。

**注**: 関連するネットワークのテレメトリーは、現在サーバーレスのトレースではサポートされていません。

{{< img src="tracing/visualization/trace/trace_networks.png" alt="トレースネットワークの依存関係" style="width:90%;">}}

[1]: /ja/network_monitoring/performance/network_analytics
[2]: /ja/network_monitoring/performance/setup
{{< /tabs >}}

{{% tab "セキュリティ" %}}

分散型トレーシングのサービスを対象とした攻撃の試行を確認できます。攻撃者が使用したパターン、攻撃を検出したルール、攻撃者がサービスの脆弱性を発見したかどうかを確認することができます。

[Datadog Application Security Management][1] を使用してさらに調査するには、**View in ASM** をクリックします。

{{< img src="tracing/visualization/trace/trace_security.png" alt="攻撃の試行をトレースする" style="width:90%;">}}

[1]: /ja/security/application_security/how-appsec-works/
{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/glossary/#trace
[2]: /ja/tracing/glossary/#spans
[3]: /ja/tracing/glossary/#services
[4]: /ja/tracing/glossary/#resources