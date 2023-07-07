---
aliases:
- /ja/logs/dynamic_volume_control
- /ja/logs/indexes/
description: Datadog でインデックス化するログの量を制御する
further_reading:
- link: /logs/explorer/#visualize
  tag: ドキュメント
  text: ログ分析の実行
- link: /logs/log_configuration/processors
  tag: ドキュメント
  text: ログの処理方法
- link: /logs/log_configuration/parsing
  tag: ドキュメント
  text: パースの詳細
- link: https://www.datadoghq.com/blog/logging-without-limits/
  tag: ブログ
  text: Logging without Limits*
kind: documentation
title: インデックス
---

ログインデックスでは、さまざまな保持、割り当て、使用状況の監視、および課金のためにデータを値グループにセグメント化できるようにすることで、ログ管理予算をきめ細かく制御できます。インデックスは、[Configuration ページ][1]の Indexes セクションにあります。インデックスをダブルクリックするか、*Edit* ボタンをクリックすると、過去 3 日間にインデックス化されたログの数とそれらの保存期間に関する情報が表示されます。

{{< img src="logs/indexes/index_details.jpg" alt="インデックスの詳細" style="width:70%;">}}

インデックス化されたログは、[ファセット検索][2]、[パターン][3]、[分析][4]、および[監視][6]に使用できます。

## 複数のインデックス

デフォルトでは、新しい各アカウントは、すべてのログのモノリシックセットを表す単一のインデックスを取得します。Datadog では、次が必要な場合に複数のインデックスを使用することを推奨します。

* 複数の[保持期間](#ログ保持期間の更新) 
* [1日の割り当て](#日別の割り当てを設定する)を複数使用して、バジェットをより細かく管理したい場合。

Log Explorer は、[複数のインデックスにわたるクエリ][7]をサポートしています。

### インデックスを追加

"New Index” ボタンを使って、新しいインデックスを作成します。各アカウントで作成できるインデックスの最大数は決まっており、デフォルトでは 10 に設定されています。

{{< img src="logs/indexes/add-index.png" alt="インデックスを追加" style="width:70%;">}}

**注**: インデックス名は文字で始まる必要があり、小文字、数字、または '-' のみを含めることができます。

<div class="alert alert-info">
アカウントの最大インデックス数を増やす必要がある場合は、<a href="/help">Datadog サポートにお問い合わせ</a>ください。
</div>

### インデックスの削除

組織からインデックスを削除するには、インデックスのアクショントレイにある「削除アイコン」を使用します。このオプションは、`Logs delete data` と `User manage access` の両方の権限を持つユーザーのみ使用することができます。

{{< img src="logs/indexes/delete-index.png" alt="インデックスを削除" style="width:70%;">}}

<div class="alert alert-warning">
削除されたインデックスと同じ名前のインデックスを再作成することはできません。 
</div>

**注:** 削除されたインデックスは、今後新しい受信ログを受け付けません。削除されたインデックス内のログは、クエリに使用できなくなります。適用される保持期間に従ってすべてのログがエージングアウトした後、そのインデックスはインデックスページに表示されなくなります。



## インデックスフィルター

インデックスフィルターを使用すると、どのログをどのインデックスに流し入れるかを動的に管理できます。たとえば、最初のインデックスは `status:notice` 属性で絞り込まれるように設定し、2 つめのインデックスは `status:error` 属性で絞り込まれるように設定し、最後のインデックスはフィルターなしで作成した場合 (`*` と同じ)、`status:notice` ログはすべて最初のインデックスに、`status:error` ログはすべて 2 つめのインデックスに、その他のログは最後のインデックスに入ります。

{{< img src="logs/indexes/multi_index.png" alt="複数インデックス" style="width:70%;">}}

**注**: ログは、フィルターに一致する最初のインデックスに保存されます。ドラッグアンドドロップを使用し、リストにあるインデックスの順番を用途に合わせて変更することができます。

## 除外フィルター

デフォルトでは、ログインデックスに除外フィルターは設定されません。つまり、インデックスフィルターに一致するログがすべてインデックス化されます。

ですが、すべてのログに同等の価値があるわけではないため、インデックスに流し入れたログの中でどれを削除するかを、除外フィルターを使用して制御することができます。除外したログはインデックスから破棄されますが、[Livetail][8] には残るので、[メトリクスの生成][9]や[アーカイブ][10]に使用できます。

除外フィルターを追加するには

1. [ログインデックス][11]に移動します。
2. 除外フィルターを追加するパイプラインを展開します。
3. **Add an Exclusion Filter** をクリックします。

除外フィルターは、クエリ、サンプリング規則、および active/inactive のトグルで定義します。

* デフォルトの**クエリ**は `*` です。つまり、インデックスに入るすべてのログが除外されます。[ログクエリを使用][12]して、一部のログだけが除外されるように除外フィルターを設定します。
* デフォルトの**サンプリング規則**は `Exclude 100% of logs` であり、クエリに一致する 100% のログが除外されます。サンプリングレートを 0% から 100% の間で調節し、さらに、そのサンプリングレートを個々のログに適用するか、それとも属性の一意の値によって定義されるロググループに適用するかを決めます。
* デフォルトの**トグル**は active であり、インデックスに入れられたログが、除外フィルターのコンフィギュレーションに従って実際に破棄されます。このトグルを inactive にすると、インデックスに新しく入れられるログに対して除外フィルターが無視されます。

**注**: ログのインデックスフィルターは、最初に一致した **active** な除外フィルターだけを処理します。ログが除外フィルターに一致すると、(たとえサンプルとして抽出されなくても) その後の一連の除外フィルターがすべて無視されます。

ドラッグアンドドロップを使用し、リストにある除外フィルターの順番を用途に合わせて変更することができます。

{{< img src="logs/indexes/reorder_index_filters.png" alt="インデックスフィルターの順序変更" style="width:80%;">}}

### 例

#### オンとオフを切り替える

プラットフォームにインシデントが発生するまでデバッグログが必要ないこともあれば、クリティカルバージョンのアプリケーションのデプロイを注意深く監視したいこともあります。`status:DEBUG` に 100% の除外フィルターをセットアップすると、Datadog の UI から、あるいは必要なら [API][13] を使用して、トグルのオンとオフを切り替えることができます。

{{< img src="logs/indexes/enable_index_filters.png" alt="インデックスフィルターを有効にする" style="width:80%;">}}

#### 傾向を注視する

Web アクセスサーバーリクエストからのすべてのログを保持するのではなく、3xx、4xx、5xx のログをすべてインデックス化し、2xx のログの 95% を除外したい場合は、`source:nginx AND http.status_code:[200 TO 299]` を設定することで全体の傾向を追跡できます。
**ヒント**: [ログから生成されるメトリクス][9]を使用し、リクエストの数をカウントして、ステータスコード、[ブラウザ][14]、[国][15]でタグ付けすることにより、Web アクセスログを有益な KPI に変換することができます。

{{< img src="logs/indexes/sample_200.png" alt="インデックスフィルターを有効にする" style="width:80%;">}}

#### 高レベルなエンティティを一貫してサンプリングする

1 日に何百万というユーザーが Web サイトにアクセスするとします。すべてのユーザーを監視する必要はないが、一部のユーザーから全体像を把握しておきたい場合は、すべてのプロダクションログ (`env:production`) に対して除外フィルターをセットアップし、`@user.email` のログの 90% を除外します。

{{< img src="logs/indexes/sample_user_id.png" alt="インデックスフィルターを有効にする" style="width:80%;">}}

[トレース ID をログに挿入][16]できるので、APM をログと併用することができます。ユーザーに関するログをすべて保持する必要はありませんが、ログによってトレースに必要な全体像を常に入手できるようにしておくことが、トラブルシューティングのために非常に重要です。
計測するサービスからのログ (`service:my_python_app`) に適用される除外フィルターをセットアップし、`Trace ID` の 50% のログを除外してください。[トレース ID リマッパー][17]をパイプラインのアップストリームで必ず使用してください。

{{< img src="logs/indexes/sample_trace_id.png" alt="インデックスフィルターを有効にする" style="width:80%;">}}

複数のインデックスにおけるサンプリング一貫性を確保するには:

1. 各インデックスに除外ルールを一つ作成。
2. すべての除外ルールに、より高レベルのエンティティを定義する、**同じサンプリングレート**と**同じ属性**を使用。
3. 除外ルール、**フィルター**、**該当順序**を再確認 (ログは、最初に一致する除外ルールでのみ渡されます)。

以下の例では、

{{< img src="logs/indexes/cross-index_sampling.png" alt="インデックスフィルターを有効にする" style="width:80%;">}}

* 一般的に、特定の `request_id` を持つすべてのログは、保持または除外されます（50% の確立)。
* `threat:true` または `compliance:true` タグを持つログは、`request_id` にかかわらず保持されます。
* `DEBUG` ログは、`request_id` サンプリングルールで一貫してインデックス化されます。ただし、デバッグログ除外フィルターが適用されている場合は、サンプリングされます。
* 実際の `request_id` を持つ `2XX` ウェブアクセスログの 50% は、保持されます。その他の `2XX` ウェブアクセスログは、90% 除外フィルタールールに基づき、すべてサンプリングされます。

## ログの保持を更新

インデックス保持設定は、ログが Datadog に保存され、検索できる期間を決定します。保持は、アカウントコンフィギュレーションで許可されている任意の値に設定できます。
現在の契約にない保持を追加するには、`success@datadoghq.com` のカスタマーサクセスにお問い合わせください。

{{< img src="logs/indexes/log_retention.png" alt="インデックスの詳細" style="width:70%;">}}

**注**: 現在の契約にない保持を使用するには、組織の設定で管理者が[オプション][21]を有効にする必要があります。

## 日別の割り当てを設定する

1 日の割り当てを設定して、インデックスに格納されるログの数を日別に制限することができます。この割り当ては、格納されるべき (除外フィルターが適用された後など) すべてのログに対して適用されます。
1 日の割り当て数に到達したら、ログはインデックス化されなくなりますが、[livetail][18] では利用できるほか、[アーカイブにも送信][10]されるので、[ログからメトリクスを生成する][9]ために使用できます。

この割り当ては、インデックスを編集していつでも更新または削除できます。

{{< img src="logs/indexes/index_quota.png" alt="インデックスの詳細" style="width:70%;">}}

**注**: インデックスの 1 日の割り当ては、[UTC 時間の 2:00pm][19] に自動的にリセットされます。

日別の割り当てに達したらイベントが生成されます。

{{< img src="logs/indexes/index_quota_event.png" alt="インデックスの割り当て数通知" style="width:70%;">}}

使用量を監視してアラートを出す方法については、[ログの使用量を監視する][20]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}
<br>
*Logging without Limits は Datadog, Inc. の商標です。

[1]: https://app.datadoghq.com/logs/pipelines/
[2]: /ja/logs/explorer/#visualization
[3]: /ja/logs/explorer/patterns/
[4]: /ja/logs/explorer/analytics/
[6]: /ja/monitors/types/log/
[7]: /ja/logs/explorer/facets/#the-index-facet
[8]: /ja/logs/live_tail/
[9]: /ja/logs/logs_to_metrics/
[10]: /ja/logs/archives/
[11]: https://app.datadoghq.com/logs/pipelines/indexes
[12]: /ja/logs/search_syntax/
[13]: /ja/api/v1/logs-indexes/#update-an-index
[14]: /ja/logs/log_configuration/processors/#user-agent-parser
[15]: /ja/logs/log_configuration/processors/#geoip-parser
[16]: /ja/tracing/other_telemetry/connect_logs_and_traces/
[17]: /ja/logs/log_configuration/processors/#trace-remapper
[18]: /ja/logs/live_tail/#overview
[19]: https://www.timeanddate.com/worldclock/converter.html
[20]: /ja/logs/guide/best-practices-for-log-management/#monitor-log-usage
[21]: /ja/account_management/org_settings/#out-of-contract-retention-periods-for-log-indexes