---
aliases:
- /ja/logs/processing/pipelines/
description: Datadog のパイプラインとプロセッサーを使用して、ログを解析し、エンリッチし、管理する
further_reading:
- link: https://learn.datadoghq.com/courses/log-pipelines
  tag: ラーニングセンター
  text: ログパイプラインの構築と管理
- link: /logs/log_configuration/processors
  tag: ドキュメント
  text: 使用可能なプロセッサーのリスト
- link: /logs/logging_without_limits/
  tag: ドキュメント
  text: Logging without Limits*
- link: /logs/explorer/
  tag: ドキュメント
  text: ログの調査方法
- link: /logs/troubleshooting/
  tag: ドキュメント
  text: ログのトラブルシューティング
- link: https://learn.datadoghq.com/courses/debugging-log-pipelines
  tag: ラーニングセンター
  text: ログパイプラインのデバッグ
- link: https://learn.datadoghq.com/courses/integration-pipelines
  tag: ラーニングセンター
  text: インテグレーションパイプラインですぐに使えるログの処理
- link: https://www.datadoghq.com/blog/monitor-cloudflare-zero-trust/
  tag: ブログ
  text: Datadog Cloud SIEM で Cloudflare Zero Trust を監視する
- link: https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/
  tag: ブログ
  text: Datadog Cloud SIEM で 1Password を監視する
- link: https://www.datadoghq.com/blog/ocsf-common-data-model/
  tag: ブログ
  text: Datadog Cloud SIEM で OCSF 共通データモデルを使用してデータを正規化する
- link: https://www.datadoghq.com/blog/cloud-siem-ocsf-processor
  tag: ブログ
  text: Datadog の OCSF プロセッサーを使用して Cloud SIEM 向けのログを正規化する
- link: https://www.datadoghq.com/blog/internal-monitoring-email-delivery
  tag: ブログ
  text: Datadog を使用してメール配信システムに包括的かつ詳細な可視性を得る方法
title: Pipelines
---
## 概要 {#overview}

<div class="alert alert-info">このドキュメントで説明しているパイプラインとプロセッサーは、クラウドベースのログ環境に特化しています。オンプレミスのログの集約、処理、ルーティングには、<a href="https://docs.datadoghq.com/observability_pipelines/configuration/set_up_pipelines/">Observability Pipelines</a> を参照してください。</div>

Datadog は自動的に JSON 形式のログを[パース][1]します。その後、処理パイプラインを通じて、すべてのログ (生ログおよび JSON) に追加情報を付与できます。パイプラインはさまざまな形式のログを受け取り、それらを Datadog の共通形式に翻訳します。ログパイプラインと処理戦略の実装には、組織への[属性命名規則][2]の導入という利点があります。

パイプラインでは、ログは[プロセッサー][3]を順番にチェーンしてパースされ、追加情報が付与されます。これにより、半構造化テキストから意味のある情報や属性を抽出し、[ファセット][4]として再利用できます。パイプラインを通過する各ログは、すべてのパイプラインフィルターに対して評価されます。フィルターに一致する場合、次のパイプラインに移動する前に、すべてのプロセッサーが順次適用されます。

パイプラインとプロセッサーは、あらゆる種類のログに適用できます。ログ構成を変更したり、サーバー側の処理ルールの変更をデプロイしたりする必要はありません。すべては[パイプライン構成ページ][5]で構成できます。

**注**: ログ管理ソリューションを最適にご利用いただくため、Datadog では [Grok プロセッサー][6]内で**パイプラインごとに最大 20 件のプロセッサー**および **10 個のパース規則**を使用することをお勧めします。Datadog はサービスのパフォーマンスに悪影響を与える可能性のあるパース規則、プロセッサー、パイプラインを無効化する権利を有しています。

## パイプラインの権限 {#pipeline-permissions}

パイプラインは、[きめ細かなアクセス制御][7]を使用して、パイプラインおよびプロセッサー構成を編集できるユーザーを管理します。これは、**ロール**、**個人ユーザー**、および**チーム**に権限を割り当てることができ、パイプラインリソースに対するきめ細かな制御を実現できることを意味します。制限のないパイプラインは無制限と見なされ、`logs_write_pipelines` 権限を持つすべてのユーザーがパイプラインおよびそのプロセッサーを変更できます。

{{< img src="/logs/processing/pipelines/pipeline_permissions_grace.png" alt="Datadog におけるパイプライン権限の設定" style="width:80%;" >}}

各パイプラインについて、管理者は次の編集スコープを選択できます。

- **Editor**: 指定されたユーザー、チーム、またはロールのみがパイプライン構成およびプロセッサーを編集できます。
- **Processor Editor**: 指定されたユーザー、チーム、またはロールのみがプロセッサー (ネストされたパイプラインを含む) を編集できます。誰もパイプラインの属性 (フィルタークエリやグローバルパイプラインリスト内の順序など) を変更できません。

<div class="alert alert-warning">ユーザーにパイプラインの制限リストへのアクセス権を付与しても、自動的に <code>logs_write_pipelines</code> または <code>logs_write_processors</code> 権限が付与されるわけではありません。管理者はこれらの権限を個別に付与する必要があります。</div>

これらの権限は、[**API**][14] および **Terraform** を通じてプログラムで管理できます。

## 前処理 {#preprocessing}

JSON ログの前処理は、ログがパイプライン処理に入る前に実行されます。前処理は、`timestamp`、`status`、`host`、`service`、および `message` などの予約済み属性に基づいて一連の操作を実行します。JSON ログに異なる属性名がある場合は、前処理を使用してログ属性名を予約済み属性リストの属性名にマッピングします。

JSON ログの前処理には、標準的なログフォワーダーで動作するデフォルト構成が用意されています。この構成を編集して、カスタムまたは特定のログ転送アプローチに適応させるには、以下の手順を実行します。

1. Datadog の [Pipelines][8] に移動し、[{{< ui >}}Preprocessing for JSON logs{{< /ui >}}][9] を選択します。

    **注:** JSON ログの前処理は、ログ属性の 1 つをログの `host` として定義する唯一の方法です。

2. 予約済み属性に基づき、デフォルトのマッピングを変更します。

{{< tabs >}}
{{% tab "ソース" %}}

#### ソース属性 {#source-attribute}

JSON 形式のログファイルに `ddsource` 属性が含まれている場合、Datadog はその値をログのソースとして解釈します。Datadog が使用するのと同じソース名を使用するには、[インテグレーションパイプラインライブラリ][1]を参照してください。

**注**: コンテナ化環境から取得したログの場合、[環境変数][2]を使用してデフォルトのソース値とサービス値をオーバーライドする必要があります。


[1]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[2]: /ja/agent/docker/log/?tab=containerinstallation#examples
{{% /tab %}}
{{% tab "ホスト" %}}

#### ホスト属性 {#host-attribute}

Datadog Agent または RFC5424 形式を使用すると、ログのホスト値が自動的に設定されます。ただし、JSON 形式のログファイルに次の属性が含まれている場合、Datadog はその値をログのホストとして解釈します。

* `host`
* `hostname`
* `syslog.hostname`

**注**: Kubernetes では、Datadog Agent によって取り込まれた JSON ログに `host`、`hostname`、または `syslog.hostname` キー属性が含まれている場合、その値はログのデフォルトの Agent ホスト名をオーバーライドします。その結果、ログは正しいホストに設定されている期待されるホストレベルタグを継承しません。この場合、Datadog はこれらの属性をクリアして、ログが正しいホストに関連付けられるようにすることを推奨します。

{{% /tab %}}
{{% tab "日付" %}}

#### 日付属性 {#date-attribute}

デフォルトでは、Datadog はタイムスタンプを生成し、ログ受信時に日付属性に追加します。ただし、JSON 形式のログファイルに次のいずれかの属性が含まれている場合、Datadog はその値をログの公式の日付として解釈します。

* `@timestamp`
* `timestamp`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `date`
* `published_date`
* `syslog.timestamp`

[ログ日付リマッパープロセッサー][1]を設定し、別の属性を指定してログの日付のソースとして使用します。

**注**: ログエントリの正式な日付が 18 時間以上前だった場合、Datadog はそのエントリを拒否します。

<div class="alert alert-danger">
認識された日付形式は、<a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>、<a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (ミリ秒 EPOCH 形式)</a>、および <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a> です。
</div>


[1]: /ja/logs/log_configuration/processors/log_date_remapper/
{{% /tab %}}
{{% tab "メッセージ" %}}

#### メッセージ属性 {#message-attribute}

デフォルトでは、Datadog はメッセージ値をログエントリの本文として取り込みます。その値はハイライトされ、[ログエクスプローラー][1]に表示され、[全文検索][2]用にインデックス化されます。ただし、JSON 形式のログファイルに次のいずれかの属性が含まれている場合、Datadog はその値をログの公式のメッセージとして解釈します。

* `message`
* `msg`
* `log`

[ログメッセージリマッパープロセッサー][3]を設定し、別の属性を指定してログのメッセージのソースとして使用します。


[1]: /ja/logs/explorer/
[2]: /ja/logs/explorer/#filters-logs
[3]: /ja/logs/log_configuration/processors/log_message_remapper/
{{% /tab %}}
{{% tab "ステータス" %}}

#### ステータス属性 {#status-attribute}

各ログエントリは、Datadog 内でファセット検索に利用可能なステータスレベルを指定できます。ただし、JSON 形式のログファイルに次のいずれかの属性が含まれている場合、Datadog はその値をログの公式のステータスとして解釈します。

* `status`
* `severity`
* `level`
* `syslog.severity`

[ログステータスリマッパープロセッサー][1]を設定し、別の属性を指定してログのステータスのソースとして使用します。

[1]: /ja/logs/log_configuration/processors/log_status_remapper/
{{% /tab %}}
{{% tab "サービス" %}}

#### サービス属性 {#service-attribute}

Datadog Agent または RFC5424 形式を使用すると、ログのサービス値が自動的に設定されます。ただし、JSON 形式のログファイルに次の属性が含まれている場合、Datadog はその値をログのサービスとして解釈します。

* `service`
* `syslog.appname`
* `dd.service`

[ログサービスリマッパープロセッサー][1]を設定し、別の属性を指定してログのサービスのソースとして使用します。


[1]: /ja/logs/log_configuration/processors/service_remapper/
{{% /tab %}}
{{% tab "トレース ID" %}}

#### トレース ID 属性 {#trace-id-attribute}

デフォルトでは、[Datadog SDK はトレース ID とスパン ID をログに自動的に挿入できます][1]。ただし、JSON 形式のログに以下の属性が含まれている場合、Datadog はその値をログの `trace_id` として解釈します。

* `dd.trace_id`
* `contextMap.dd.trace_id`
* `named_tags.dd.trace_id`
* `trace_id`

[トレース ID リマッパープロセッサー][2]を設定し、別の属性を指定してログのトレース ID のソースとして使用します。


[1]: /ja/tracing/other_telemetry/connect_logs_and_traces/
[2]: /ja/logs/log_configuration/processors/trace_remapper/
{{% /tab %}}

{{% tab "スパン ID" %}}

#### スパン ID 属性 {#span-id-attribute}

デフォルトでは、Datadog SDK は [スパン ID をログに自動的に挿入できます][1]。ただし、JSON 形式のログに以下の属性が含まれている場合、Datadog はその値をログの `span_id` として解釈します。

* `dd.span_id`
* `contextMap.dd.span_id`
* `named_tags.dd.span_id`
* `span_id`

[1]: /ja/tracing/other_telemetry/connect_logs_and_traces/
{{% /tab %}}

{{< /tabs >}}

## パイプラインを作成する {#create-a-pipeline}

1. Datadog の[パイプライン][8]に移動します。
2. {{< ui >}}New Pipeline{{< /ui >}} を選択します。
3. ライブテールプレビューからログを選択してフィルターを適用するか、独自のフィルターを適用します。ドロップダウンメニューからフィルターを選択するか、{{< ui >}}</>{{< /ui >}} アイコンを選択して独自のフィルタークエリを作成します。フィルターを使用すると、パイプラインを適用するログの種類を制限できます。

    **注**: パイプラインのフィルタリングは、パイプライン内のプロセッサーより前に適用されます。このため、パイプライン自体で抽出された属性ではフィルタリングできません。

4. パイプラインに名前を付けます。
5. (オプション) パイプラインに説明とタグを追加して、目的と所有者を示します。パイプラインタグはログに影響を与えませんが、[パイプラインページ][8]内でフィルタリングや検索に使用できます。
6. {{< ui >}}Create{{< /ui >}} を押します。

パイプラインによって変換されたログの例:

{{< img src="logs/processing/pipelines/log_post_processing.png" alt="パイプラインによって変換されたログの例" style="width:50%;">}}

### インテグレーションパイプライン {#integration-pipelines}

<div class="alert alert-info">
<a href="/integrations/#cat-log-collection">サポートされているインテグレーションのリスト</a>を参照してください。
</div>

インテグレーション処理パイプラインは、ログ収集が設定されている特定のソースで利用できます。これらのパイプラインは**読み取り専用**であり、各ソースに適した方法でログをパースします。インテグレーションログに対しては、インテグレーションパイプラインが自動的にインストールされます。ログをパースし、対応するファセットをログエクスプローラーに追加します。

インテグレーションパイプラインを表示するには、[パイプライン][8]ページに移動します。インテグレーションパイプラインを編集するには、それをクローンし、そのクローンを編集します。

{{< img src="logs/processing/pipelines/cloning_pipeline.png" alt="パイプラインのクローン作成" style="width:80%;">}}

以下の ELB ログの例を参照してください。

{{< img src="logs/processing/elb_log_post_processing.png" alt="ELB ログの後処理" style="width:70%;">}}

**注**: インテグレーションパイプラインは削除できず、無効化のみ可能です。

### インテグレーションパイプラインライブラリ {#integration-pipeline-library}

Datadog が提供するインテグレーションパイプラインの完全なリストを表示するには、[インテグレーションパイプラインライブラリ][10]を参照してください。パイプラインライブラリは、Datadog がデフォルトで異なるログフォーマットをどのように処理するかを示しています。

{{< img src="logs/processing/pipelines/integration-pipeline-library.mp4" alt="インテグレーションパイプラインライブラリ" video=true style="width:80%;">}}

インテグレーションパイプラインを使用するには、Datadog は対応するログ `source` を構成してインテグレーションをインストールすることを推奨します。Datadog がこのソースの最初のログを受信すると、インストールが自動的にトリガーされ、インテグレーションパイプラインが処理パイプラインのリストに追加されます。ログソースを構成するには、対応する[インテグレーションドキュメント][11]を参照してください。

クローンボタンをクリックしてインテグレーションパイプラインをコピーすることもできます。

{{< img src="logs/processing/pipelines/clone-pipeline-from-library.mp4" alt="ライブラリからのパイプラインのクローン作成" video=true style="width:80%;">}}

## プロセッサーまたはネストされたパイプラインを追加する {#add-a-processor-or-nested-pipeline}

1. Datadog の[パイプライン][8]に移動します。
2. パイプラインにカーソルを合わせ、表示される矢印をクリックしてプロセッサーおよびネストされたパイプラインを展開します。
3. {{< ui >}}Add Processor{{< /ui >}} または {{< ui >}}Add Nested Pipeline{{< /ui >}} を選択します。

### プロセッサー {#processors}

プロセッサーはパイプライン内で実行され、データ構造化アクションを完了します。アプリ内または API を使用して、プロセッサーの種類ごとにプロセッサーを追加および構成する方法については、[プロセッサーに関するドキュメント][3]を参照してください。

カスタムの日付および時刻の形式と、非 UTC タイムスタンプに必要な `timezone` パラメーターについては、[日付のパース][12]を参照してください。

### 複数のプロセッサーが一致する場合の属性の優先順位 {#attribute-precedence}

一致するパイプライン内の複数のプロセッサーが同じ属性を設定する場合、結果はプロセッサーのタイプによって異なります。動作は 3 種類あります。

| 動作 | 説明 | プロセッサー |
| --- | --- | --- |
| 後勝ち | 後のプロセッサー (順序の後方) によって設定された値が、前の値を上書きします。| Grok パーサー、カテゴリープロセッサー、算術プロセッサー、文字列ビルダープロセッサー、ルックアッププロセッサー、URL パーサー、ユーザー Agent パーサー、GeoIP パーサー、デコーダープロセッサー |
| 依存: `override_on_conflict` | `override_on_conflict` パラメーターに従います。デフォルトでは (`false`)、ターゲット要素がすでに設定されている場合、上書きされません。| リマッパー、配列マッププロセッサー |
| 先勝ち | 最初のプロセッサーのみが適用されます (ログ日付リマッパーを除き、最後のものが使用されます)。単一のパイプライン内では最初のプロセッサーの値が使用され、複数の一致するパイプライン間では最初に検出されたものが適用されます。| ログステータスリマッパー、サービスリマッパー、ログメッセージリマッパー、トレースリマッパー、スパンリマッパー |

各プロセッサーの詳細については、[プロセッサー][3]を参照してください。

### ネストされたパイプライン {#nested-pipelines}

ネストされたパイプラインは、パイプライン内のパイプラインです。ネストされたパイプラインを使用して、処理を 2 つのステップに分割します。たとえば、最初にチームなどの高レベルフィルターを使用し、次にインテグレーション、サービス、またはその他のタグや属性に基づいて二次フィルタリングを行います。

パイプラインは、ネストされたパイプラインとプロセッサーを持つことができます。一方、ネストされたパイプラインは、プロセッサーしか持つことができません。

{{< img src="logs/processing/pipelines/nested_pipeline.png" alt="ネストされたパイプライン" style="width:80%;">}}

パイプラインを別のパイプラインに移動して、ネストされたパイプラインにします。

1. 移動したいパイプラインにカーソルを合わせ、{{< ui >}}Move to{{< /ui >}} アイコンをクリックします。
1. 元のパイプラインの移動先となるパイプラインを選択します。**注**: ネストされたパイプラインを含むパイプラインは、トップレベルの別の位置にのみ移動できます。別のパイプラインに移動することはできません。
1. {{< ui >}}Move{{< /ui >}} をクリックします。

## パイプラインの変更内容をプレビュー {#preview-pipeline-changes}

パイプラインやそのプロセッサーを作成または編集する際、変更を適用する前に、その変更がログにどのような影響を与えるかをプレビューできます。プレビューでは、提案された変更を適用して処理されたログのライブテールが使用されます。

{{< img src="logs/processing/pipelines/pipeline_simulation.png" alt="左側にパイプラインのプロセッサー、右側に選択したログの差分が表示されるパイプラインシミュレーションビュー" >}}

各ログについて、変更前と変更後の状態を比較します。比較対象の変更を選択します。

- **自分の変更**: パイプラインの現在デプロイされているバージョンと、変更を加えたバージョンを比較します。
- **パイプライン全体**: パイプラインに入るログと、パイプライン全体の実行後のログを比較します。

ログリストを絞り込むには、クエリフィルターを使用するか、影響度でフィルタリングします。

- **すべてのログ**: ライブテール内のすべてのログ。
- **影響を受けたログ**: このセッションでの編集によって変更されたログのみ。
- **影響を受けていないログ**: 編集によって変更されなかったログのみ。

## パイプラインの管理 {#manage-your-pipelines}

パイプラインの変更情報を使用して、パイプラインまたはプロセッサーへの最後の変更がいつ行われたか、およびどのユーザーが変更を行ったかを特定します。この変更情報や、パイプラインが有効か読み取り専用かといったほかのファセットプロパティを使用して、パイプラインをフィルタリングします。

{{< img src="logs/processing/pipelines/log_pipeline_management.png" alt="ファセット検索、パイプライン変更情報、および再配置モーダルを使用してパイプラインを管理する方法" style="width:50%;">}}

スライディングオプションパネルの {{< ui >}}Move to{{< /ui >}} オプションを使用して、パイプラインを正確に再配置します。{{< ui >}}Move to{{< /ui >}} モーダルを使用して、選択したパイプラインの移動先となる正確な位置までスクロールし、クリックします。パイプラインはほかの読み取り専用パイプラインには移動できません。ネストされたパイプラインを含むパイプラインは、トップレベルの別の位置にのみ移動できます。別のパイプラインに移動することはできません。

{{< img src="logs/processing/pipelines/log_pipeline_move_to.png" alt="Move to モーダルを使用してパイプラインを正確に再配置する方法" style="width:50%;">}}

既存のルールやプロセッサーを再利用するためにパイプラインをクローンし、最初からやり直す必要をなくします。パイプラインをクローンすると、Datadog はクローン元のパイプラインを自動的に無効化します。トグルをクリックして有効化します。

## 推定使用量メトリクス {#estimated-usage-metrics}

各パイプラインの推定使用量メトリクスが表示されます。これにより、各パイプラインで取り込まれ、変換されるログのボリュームと件数が表示されます。すべてのパイプラインには、標準の[ログ推定使用量ダッシュボード][13]へのリンクが含まれています。このダッシュボードは、パイプラインの使用量メトリクスの詳細なチャートを提供します。

{{< img src="logs/processing/pipelines/log_pipeline_statistics.png" alt="パイプラインの使用量メトリクスを素早く確認する方法" style="width:50%;">}}

<!-- vale Datadog.headings = NO -->
## 自動処理 {#auto-processing}
<!-- vale Datadog.headings = YES -->

{{< site-region region="us5" >}}
<div class="alert alert-warning">自動処理は、選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では利用できません。</div>
{{< /site-region >}}

自動処理では、カスタムアプリケーションログをパースし、タイムスタンプ、ステータス、トレース ID、スパン ID などの主要な属性を抽出します。これにより、パイプラインを手動で設定することなく、ログの検索、フィルタリング、相関付けが可能になります。

自動処理では、インテグレーションやカスタムパイプラインのフィルターに一致しないログのみを処理します。ログがパイプラインのフィルターに一致する場合、そのパイプラインがログを変更しない場合でも、自動処理ではそのログを処理しません。既存のパイプライン構成は変更されません。

<div class="alert alert-warning">パイプラインのフィルターがすべてのログに一致する場合 (例:<code>*</code>)、自動処理では組織内のどのログも処理しません。自動処理を使用するには、そのパイプラインのフィルターで、処理が必要なログのみに絞り込んでください。</div>

### エントリが作成される方法 {#how-entries-are-created}

Datadog は、サポートされているログを自動処理エントリにグループ化します。各エントリは、1 つのソースおよびサービスのペアを対象とします。たとえば、`source:storefront` と `service:catalog-api` があるログは 1 つのエントリを形成します。新しいログパターンが現れると、Datadog は、以前からサポートされているパターンのパース方法を変更することなく、それらをサポートするようにエントリを更新します。すでに抽出されている属性の名前は維持されるので、それらを使用するファセット、ダッシュボード、モニターは引き続き機能します。

Datadog は、新しいソースとサービスのペアに関する最初のログを受信してから約 15 分後に、そのペア用のエントリを作成します。そのペアには、過去 24 時間に少なくとも 1,000 件のインデックス化されたログが必要です。[除外フィルター][15]によってドロップされたログは、このしきい値にカウントされません。数量がしきい値を下回っている場合、Datadog は約 12 時間後に再度チェックを行います。数量が依然としてしきい値を下回っている場合、そのペアに関する新しいログパターンが現れるまで、Datadog はエントリを作成しません。

各組織では、最大 100 個の自動処理エントリが可能です。自動処理を有効にした時点で組織がすでにログを送信している場合、Datadog は最大 100 個のソース/サービスペアに関してエントリを作成します。Datadog は、特に多くのログを処理すると見込まれるペアを選択します。その後、ログが到着するにつれて、Datadog は新しいペアのエントリを作成し、組織のエントリ数が 100 になるまでこれを続けます。

{{< img src="logs/processing/pipelines/auto_processing_list.png" alt="[Processing] (処理) ページの [Auto-Processing] (自動処理) タブ。ソースとサービスごとに、パースされた属性の数と使用状況が一覧表示され、各エントリの有効化トグルがあります。" style="width:100%;" >}}

### 自動処理のオン/オフを切り替える {#turn-auto-processing-on-or-off}

2026 年 11 月 4 日またはそれ以降に作成された組織では、自動処理がデフォルトでオンになっており、新しいエントリは自動的に有効になります。2026 年 11 月 4 日より前に作成された組織では、自動処理がデフォルトでオフになっています。

自動処理をオンまたはオフにするには、[{{< ui >}}Processing{{< /ui >}}][8] (処理) ページで [{{< ui >}}Auto-Processing{{< /ui >}}] (自動処理) タブを選択し、機能トグルを使用します。

### 新しいエントリが有効になる方法を選択する {#choose-how-new-entries-are-enabled}

[{{< ui >}}Auto-Processing{{< /ui >}}] タブで、新しいエントリを自動的に有効にするかどうかを選択します。

- **Automatically enable new entries (新しいエントリを自動的に有効にする)**: 新しいエントリは作成時に有効になり、一致する受信ログの処理を開始します。
- **Review new entries before enabling (有効にする前に新しいエントリを確認する)**: 新しいエントリは作成時に無効になります。[変換内容を確認し](#review-transformations)、使用するエントリを有効にします。

### 変換を確認する {#review-transformations}

[1. {{< ui >}}Auto-Processing{{< /ui >}}] タブで、対象のソースとサービスのペアを見つけます。
[2. {{< ui >}}View Transformations{{< /ui >}}] をクリックします。
3. ログパターンを 1 つクリックします。
4. サンプルログを調べて、元の属性と処理後の属性を比較します。

### エントリを有効または無効にする {#enable-or-disable-an-entry}

[{{< ui >}}Auto-Processing{{< /ui >}}] タブで、エントリのトグルを使用して、そのソース/サービスのペアの処理を有効または無効にします。エントリを無効にすると、今後のログにのみ影響します。すでに処理済みのログは変更されません。

### 手動のパイプラインに切り替える {#switch-to-a-manual-pipeline}

パースや属性名をカスタマイズするには、[{{< ui >}}View Transformations{{< /ui >}}] (変換の表示) ページで [{{< ui >}}Switch to manual pipeline{{< /ui >}}] (手動パイプラインへの切り替え) をクリックします。Datadog は、同じフィルターとプロセッサーを持つカスタムパイプラインを作成し、そのソース/サービスのペアに関する自動処理エントリを削除します。

切り替え後、

- パイプラインリストにそのパイプラインが表示され、同じ方法でログがパースされます。属性名は変更されないので、既存のファセット、ダッシュボード、モニターは引き続き機能します。
- 新しいログパターンが現れても、Datadog はそのパイプラインを更新しなくなります。それ以降は、手動でその設定を管理することになります。
- パイプラインのフィルターがこれらのログに一致するため、自動処理ではそれらが処理されなくなります。

自動処理に戻るには、手動パイプラインを削除してください。その後、該当するログが[エントリの作成要件](#how-entries-are-created)を満たすと、Datadog はそのソース/サービスのペアに関する新しいエントリを作成します。新しいエントリはゼロから生成されるので、以前のエントリや編集内容は復元されません。

### 制限事項 {#limitations}

- 各組織では、最大 100 個の自動処理エントリが可能です。Datadog は、この制限を超えるソース/サービスのペアからのログを処理しません。詳細については、[エントリが作成される方法](#how-entries-are-created)を参照してください。
- すでに自動処理の対象となっているソース/サービスのペアでも、一部のログパターンがパースされないことがあります。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits は Datadog, Inc. の商標です。

[1]: /ja/logs/log_configuration/parsing/
[2]: /ja/logs/log_collection/?tab=host#attributes-and-tags
[3]: /ja/logs/log_configuration/processors/
[4]: /ja/logs/explorer/facets/
[5]: https://app.datadoghq.com/logs/pipelines
[6]: /ja/logs/log_configuration/processors/grok_parser/
[7]: /ja/account_management/rbac/granular_access/
[8]: https://app.datadoghq.com/logs/pipelines
[9]: https://app.datadoghq.com/logs/pipelines/remapping
[10]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[11]: /ja/integrations/#cat-log-collection
[12]: /ja/logs/log_configuration/parsing/?tab=matchers#parsing-dates
[13]: https://app.datadoghq.com/dash/integration/logs_estimated_usage
[14]: /ja/api/latest/restriction-policies/
[15]: /ja/logs/log_configuration/indexes/#exclusion-filters