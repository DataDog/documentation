---
title: インデックス
kind: documentation
description: Datadog でインデックス化するログの量を制御する
aliases:
  - /ja/logs/dynamic_volume_control
further_reading:
  - link: logs/explorer/analytics
    tag: ドキュメント
    text: ログ分析の実行
  - link: logs/processing
    tag: ドキュメント
    text: ログの処理方法
  - link: logs/processing/parsing
    tag: ドキュメント
    text: パースの詳細
  - link: 'https://www.datadoghq.com/blog/logging-without-limits/'
    tag: ブログ
    text: Logging without Limits*
---
インデックスは、[Configuration ページ][1]の Indexes セクションにあります。インデックスをダブルクリックするか、*Edit* ボタンをクリックすると、過去 3 日間にインデックス化されたログの数とそれらの保存期間に関する情報が表示されます。

{{< img src="logs/indexes/index_details.png" alt="インデックスの詳細"  style="width:70%;">}}

インデックス化されたログは、[ファセット検索][2]、[パターン][3]、[分析][4]、[ダッシュボード][5]、および[監視][6]に使用できます。

## インデックス

デフォルトで、ログエクスプローラーは一意なログインデックスを 1 つ持ちますが、Datadog で以下の要件を満たすために、複数のインデックスを使用することもできます。

* 保存期間や [1 日の割り当て](#日別の割り当てを設定)を複数使用して、バジェットをより細かく管理したい場合。
* アクセス許可を複数使用して、ユーザーの[ロールベースのアクセス制御 (RBAC)][7] をより細かく行いたい場合。

<div class="alert alert-info">
複数のインデックス機能は非公開ベータ版です。ご使用のアカウントでこの機能を有効にしたい場合は、<a href="/help">Datadog のサポートチームにお問い合わせください</a>。
</div>

## インデックスフィルター

インデックスフィルターを使用すると、どのログをどのインデックスに流し入れるかを動的に管理できます。たとえば、最初のインデックスは `status:notice` 属性で絞り込まれるように設定し、2 つめのインデックスは `status:error` 属性で絞り込まれるように設定し、最後のインデックスはフィルターなしで作成した場合 (`*` と同じ)、`status:notice` ログはすべて最初のインデックスに、`status:error` ログはすべて 2 つめのインデックスに、その他のログは最後のインデックスに入ります。

{{< img src="logs/indexes/multi_index.png" alt="複数インデックス"  style="width:70%;">}}

**注**: ログは、フィルターに一致する最初のインデックスに保存されます。ドラッグアンドドロップを使用し、リストにあるインデックスの順番を用途に合わせて変更することができます。

## 除外フィルター

デフォルトでは、ログインデックスに除外フィルターは設定されません。つまり、インデックスフィルターに一致するログがすべてインデックス化されます。

ですが、すべてのログに同等の価値があるわけではないため、インデックスに流し入れたログの中でどれを削除するかを、除外フィルターを使用して制御することができます。除外したログはインデックスから破棄されますが、[Livetail][8] には残るので、[メトリクスの生成][9]や[アーカイブ][10]に使用できます。

除外フィルターは、クエリ、サンプリング規則、および active/inactive のトグルで定義します。

* デフォルトの**クエリ**は `*` です。つまり、インデックスに入るすべてのログが除外されます。[ログクエリを使用][11]して、一部のログだけが除外されるように除外フィルターを設定します。
* デフォルトの**サンプリング規則**は `Exclude 100% of logs` であり、クエリに一致する 100% のログが除外されます。サンプリングレートを 0% から 100% の間で調節し、さらに、そのサンプリングレートを個々のログに適用するか、それとも属性の一意の値によって定義されるロググループに適用するかを決めます。
* デフォルトの**トグル**は active であり、インデックスに入れられたログが、除外フィルターのコンフィギュレーションに従って実際に破棄されます。このトグルを inactive にすると、インデックスに新しく入れられるログに対して除外フィルターが無視されます。

**注**: ログのインデックスフィルターは、最初に一致した **active** な除外フィルターだけを処理します。ログが除外フィルターに一致すると、(たとえサンプルとして抽出されなくても) その後の一連の除外フィルターがすべて無視されます。

ドラッグアンドドロップを使用し、リストにある除外フィルターの順番を用途に合わせて変更することができます。

{{< img src="logs/indexes/reorder_index_filters.png" alt="インデックスフィルターの順序変更"  style="width:80%;">}}

### 除外フィルターの例

#### オンとオフを切り替える

プラットフォームにインシデントが発生するまでデバッグログが必要ないこともあれば、クリティカルバージョンのアプリケーションのデプロイを注意深く監視したいこともあります。`status:DEBUG` に 100% の除外フィルターをセットアップすると、Datadog の UI から、あるいは必要なら [API][12] を使用して、トグルのオンとオフを切り替えることができます。

{{< img src="logs/indexes/enable_index_filters.png" alt="インデックスフィルターを有効にする"  style="width:80%;">}}

#### 傾向を注視する

たとえば、Web アクセスサーバーリクエストからのすべてのログを保持するのではなく、3xx、4xx、5xx のログをすべてインデックス化し、2xx のログの 95% を除外したい場合は、`source:nginx AND http.status_code:[200 TO 299]` を設定することで全体の傾向を追跡できます。
**ヒント**: [ログから生成されるメトリクス][10]を使用し、リクエストの数をカウントして、ステータスコード、[ブラウザ][13]、[国][14]でタグ付けすることにより、Web アクセスログを有益な KPI に変換することができます。

{{< img src="logs/indexes/sample_200.png" alt="インデックスフィルターの有効化"  style="width:80%;">}}

#### 高レベルなエンティティを一貫してサンプリングする

1 日に何百万というユーザーが Web サイトにアクセスするとします。すべてのユーザーを監視する必要はないが、一部のユーザーから全体像を把握しておきたい場合は、すべてのプロダクションログ (`env:production`) に対して除外フィルターをセットアップし、`@user.email` のログの 90% を除外します。

{{< img src="logs/indexes/sample_user_id.png" alt="インデックスフィルターの有効化"  style="width:80%;">}}

[トレース ID をログに挿入][15]できるので、APM をログと併用することができます。ユーザーに関するログをすべて保持する必要はありませんが、ログによってトレースに必要な全体像を常に入手できるようにしておくことが、トラブルシューティングのために非常に重要です。
計測するサービスからのログ (`service:my_python_app`) に適用される除外フィルターをセットアップし、`Trace ID` の 50% のログを除外してください。[トレース ID リマッパー][16]をパイプラインのアップストリームで必ず使用してください。

{{< img src="logs/indexes/sample_trace_id.png" alt="インデックスフィルターの有効化"  style="width:80%;">}}

## 日別の割り当てを設定する

1 日の割り当てを設定して、インデックスに格納されるログの数を日別に制限することができます。この割り当ては、格納されるべき (除外フィルターが適用された後の) すべてのログに対して適用されます。
1 日の割り当て数に到達したら、ログはインデックス化されなくなりますが、[livetail][17] では利用できるほか、[アーカイブにも送信][18]されるので、[ログからメトリクスを生成する][19]ために使用できます。

この割り当ては、インデックスを編集していつでも更新または削除できます。

{{< img src="logs/indexes/index_quota.png" alt="インデックスの詳細"  style="width:70%;">}}

**注**: インデックスの 1 日の割り当ては、UTC 時間の 2:00pm (CET 4:00pm、EDT 10:00am、PDT 7:00am) に自動的にリセットされます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}
<br>
*Logging without Limits は Datadog, Inc. の商標です。

[1]: /ja/logs/indexes
[2]: /ja/logs/explorer/?tab=facets#visualization
[3]: /ja/logs/explorer/patterns
[4]: /ja/logs/explorer/analytics
[5]: /ja/logs/explorer/analytics/#dashboard
[6]: /ja/monitors/monitor_types/log
[7]: /ja/account_management/rbac
[8]: /ja/logs/live_tail
[9]: /ja/logs/archives
[10]: /ja/logs/logs_to_metrics
[11]: /ja/logs/explorer/search/
[12]: /ja/api/?lang=bash#update-an-index
[13]: /ja/logs/processing/processors/?tab=ui#user-agent-parser
[14]: /ja/logs/processing/processors/?tab=ui#geoip-parser
[15]: /ja/tracing/connect_logs_and_traces/
[16]: /ja/logs/processing/processors/?tab=ui#trace-remapper
[17]: /ja/logs/live_tail/#overview
[18]: /ja/logs/archives/
[19]: /ja/logs/logs_to_metrics/