---
description: Splunk SPL クエリを Datadog 構文に変換し、Splunk アラートとダッシュボードを Datadog モニターとダッシュボードに変換します。
further_reading:
- link: /logs/explorer/search_syntax/
  tag: ドキュメント
  text: ログ検索構文
- link: /ddsql_editor/
  tag: ドキュメント
  text: DDSQL エディター
- link: /monitors/types/log/
  tag: ドキュメント
  text: ログモニター
- link: /dashboards/
  tag: ドキュメント
  text: ダッシュボード
title: クエリ変換
---
## 概要{#overview}

移行アプリの一部である Query Translation は、Splunk Processing Language (SPL) を Datadog の[ログ検索構文][1]に変換し、Splunk アセットを Datadog の対応するものに変換します。2 つのツールが用意されています。

| ツール | ユースケース |
|------|-----------|
| [Translate][2] | 単一の SPL クエリを変換し、Datadog の対応するクエリと変換の説明を確認できます。|
| [Import][3] | Splunk アラートとダッシュボードの CSV エクスポートをインポートし、そのクエリをログ検索構文に変換します。結果を確認し、対応する Datadog モニターとダッシュボードを作成します。|

Query Translation がソースプラットフォームとして対応しているのは Splunk のみです。大規模言語モデルではなく、変換ライブラリを使用してクエリを決定論的に解析および変換します。各クエリは、ログエクスプローラー、ログモニター、ダッシュボードウィジェットで使用できるように、可能な限り[ログ検索構文][1]に変換されます。ログ検索構文で表現できない分析的に複雑なクエリには、代わりに [DDSQL][4] が使用されます。

## 権限{#permissions}

Splunk アセットのインポートには `logs_read_config` 権限が必要です。変換されたリソースを公開するには、作成するアセットの権限 (モニターの場合は `monitors_write`、ダッシュボードの場合は `dashboards_write`) も必要です。[Datadog ロールの権限][5]を参照してください。

## 単一クエリの変換{#translate-a-single-query}

[Translate] ページを SPL のサンドボックスとして使用してください。これは、アセットインベントリの移行のためではなく、変換動作の調査のために設計されています。

1. [[Logs] > [Translate]][2] に移動します。
2. SPL クエリをクエリボックスに貼り付けるか、提供されている例のいずれかを選択します。
3. [{{< ui >}}Translate{{< /ui >}}] をクリックします。

ページに以下が返されます。

- **変換されたクエリ**: {{< ui >}}Translation preview{{< /ui >}} チャートの上の検索バーに表示される、ログ検索構文または DDSQL による Datadog クエリ。
- {{< ui >}}Translation preview{{< /ui >}}: 指定した期間にわたり、変換されたクエリに一致するデータ。[ログエクスプローラー][6]で続行するには、[{{< ui >}}View in Log Explorer{{< /ui >}}] をクリックしてください。
- {{< ui >}}Translated SPL{{< /ui >}}: 元の SPL。変換ツールが変更した内容や変換できなかった内容 (削除されたインデックスやサポートされていないコマンドなど) について注釈が付けられています。
- {{< ui >}}How did we translate?{{< /ui >}}: 各 SPL コマンドが Datadog クエリのどの部分に対応するかの説明。

変換されたクエリに基づいてモニターを作成するには、[{{< ui >}}Create Monitor{{< /ui >}}] をクリックしてください。

## アセットを一括移行する{#migrate-assets-in-bulk}

[Import] ページでは、多数の Splunk アセットを一度に移行できます。Splunk インベントリを CSV ファイルとしてアップロードすると、ツールがそれらを名前付きインポートにグループ化します。各アセット内のクエリを Datadog 構文に変換し、対応する Datadog モニターまたはダッシュボードを作成します。各結果を確認し、公開して Datadog 内にアセットを作成してください。以下のリソースタイプがサポートされています。

| Splunk リソース| Datadog の対応するもの| メモ|
|-----------------|--------------------|-------|
| アラート (保存された検索)| [モニター][7]| 可能な場合はログモニターに変換されます。それ以外の場合は、DDSQL クエリを使用する分析モニターに変換されます。|
| ダッシュボード| [ダッシュボード][8]| Studio (JSON) と Classic (XML) の両方のダッシュボードに対応しています。各パネルは個別のウィジェットに変換されます。|
| 検索マクロ| なし| 変換前に、このツールはアラートやダッシュボード内の各マクロ参照を、そのマクロの SPL 定義に置き換えます。マクロは Datadog アセットとして公開されません。|

### Splunk からアセットをエクスポートする{#export-your-assets-from-splunk}

以下のように、各リソースタイプを Splunk から個別の CSV ファイルとしてエクスポートしてください。

1. Splunk にサインインし、検索アプリを開きます。
2. エクスポートするリソースタイプ用のクエリを実行します。

   アラート:
   ```
   | rest /services/saved/searches splunk_server=local
   | table
     title
     eai:acl.owner
     eai:acl.app
     search
     triggered_alert_count
     alert_condition
     alert_threshold
     alert_comparator
     alert_type
     actions
     action.email.to
     action.email.message.alert
     action.slack.param.channel
     action.slackparam.message
     description
   ```

   ダッシュボード:
   ```
   | rest /servicesNS/admin/search/data/ui/views
   | spath input=eai:data path=dashboard.definition output=definition
   | spath input=eai:data path=dashboard output=dashboard_xml
   | where isnotnull(definition) OR (isnull(definition) AND isnotnull(dashboard_xml))
   | eval result=if(isnotnull(definition), definition, 'eai:data')
   | eval type=if(isnotnull(definition), "studio", "legacy")
   | eval title=if(type=="studio", json_extract(result, "title"), null())
   | eval description=if(type=="studio", json_extract(result, "description"), null())
   | spath input=result path=dashboard.label output=xml_title
   | spath input=result path=dashboard.description output=xml_description
   | eval title=coalesce(title, xml_title)
   | eval description=coalesce(description, xml_description)
   | fields type,title,description,result
   ```

   マクロ:
   ```
   | rest /servicesNS/-/-/admin/macros count=0 splunk_server=local
   | table definition author disabled title args updated eai:appName validation
   ```

3. 移行しようとしているアセットが結果に含まれていることを確認します。
4. 結果の上部にあるエクスポートボタンをクリックし、CSV 形式を選択してファイルをダウンロードします。
5. リソースタイプごとに繰り返します。アラートやダッシュボードで検索マクロが使用されている場合は、マクロのクエリもエクスポートしてください。

Splunk UI のスクリーンショットを含む同じ手順は、インポートウィザードの [{{< ui >}}How to export your assets from Splunk?{{< /ui >}}] から確認できます。

### Datadog にアセットをインポートする{#import-your-assets-into-datadog}

1. [[Logs] > [Import]][3] に移動し、[{{< ui >}}Get Started{{< /ui >}}] をクリックします。
2. [{{< ui >}}Select source{{< /ui >}}] で、[{{< ui >}}Splunk Processing Language (SPL){{< /ui >}}] を選択します。
3. [{{< ui >}}Upload your assets from Splunk{{< /ui >}}] で、アラートとダッシュボードの CSV ファイルを追加します。必要な数のみファイルをアップロードできますが、マクロファイルはこのステップでは含めないでください。
4. マクロの CSV ファイルがある場合は、[{{< ui >}}Macros file{{< /ui >}}] でアップロードしてください。
5. [{{< ui >}}Name your import{{< /ui >}}] で、後で識別できるようにインポートに名前を付けます。
6. [{{< ui >}}Import{{< /ui >}}] をクリックします。

変換は、インポートが作成されるとすぐに開始され、バックグラウンドで実行されます。ページを閉じて、後で戻ってくることができます。

### 確認と公開{#review-and-publish}

以下のように、インポートを開いて、含まれるすべてのリソースと変換の状態を確認します。

| ステータス | 意味 |
|--------|---------|
| In Progress | リソースは変換中です。|
| Translated | 対応する Datadog リソースを確認して公開できます。|
| Published | リソースは Datadog に存在します。インポートはそのリソースにリンクしています。|
| Skipped | リソースを変換できませんでした。|

リソースをクリックすると、元の SPL、変換されたクエリ、変換の説明を確認できます。変換されたクエリが、元の Splunk クエリと同じ結果を返すとは限りません。モニターまたはダッシュボードを公開する前に、各変換結果を確認してください。

ダッシュボードには各ウィジェットのステータスが表示され、1 つのダッシュボードとして公開されます。ダッシュボードを開くと、変換されたウィジェットとエラーが発生したウィジェットを確認できます。

Skipped ステータスのモニターとダッシュボードは公開できません。また、公開する前に Datadog で変換結果を編集することはできません。スキップされたリソースやエラーが発生したダッシュボードウィジェットを修正するには、ソースで修正してから再度インポートしてください。

1. Splunk でアセットを修正して再度エクスポートするか、エクスポートされた CSV を直接編集します。インデックスや属性の名前を Datadog のものに合わせるなど、小さな修正には CSV を編集するほうが速い場合が多いです。
2. (オプション) 元のインポートを削除して、その名前を再利用します。[[Import][3]] ページで、インポートにカーソルを合わせ、ゴミ箱アイコンをクリックしてから、[{{< ui >}}Delete current migration{{< /ui >}}] をクリックします。
3. 修正したファイルを新しいインポートとしてアップロードします。

## 変換のギャップ{#translation-gaps}

[Translation] は SPL を Datadog のログ検索構文に変換しますが、同一の結果が保証されるわけではありません。以下のギャップが、相違の大部分を占めています。

ログの形式はプラットフォームごとに異なる
: Pipelines、プロセッサー、ログ転送エージェントは、2 つのプラットフォームで異なります。そのため、ログで使用可能な属性が異なります。変換ツールは、[標準属性][9]をマッピングする場合を除き、属性名をそのままにします。Datadog のパイプラインが Splunk クエリで使用される属性を生成しない場合、変換されたクエリは結果を返しません。これを修正するには、その属性を生成する[プロセッサー][10]を Datadog Pipelines に追加してください。たとえば、メッセージから抽出する Grok パーサーか、既存の属性の名前を変更するリマッパーを使用します。

インデックスが一致しない
: Splunk のインデックス名が Datadog の[ログインデックス][11]と 1 対 1 で対応することはほとんどありません。解決されないインデックスフィルターは、クエリエラーの原因となります。変換ツールは、Datadog に対応するものがないインデックス用語を削除し、警告としてフラグを立てます。警告を確認し、代わりにタグや属性を使用してクエリのスコープを絞り込んでください。

サンプルデータが不足している
: 一致するデータがほとんどないインデックスに対して実行されるクエリは、空のプレビューを返します。プレビューが空だと、変換の検証が困難になります。変換を評価する前に、関連するログが Datadog にあることを確認してください。

SPL コマンドはサポートされていない
: Query Translation は幅広い SPL コマンドをサポートしています。コマンドに Datadog の対応するものがない場合、変換ツールは可能な限りクエリを返し、サポートされていないコマンドにフラグを立てます。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/explorer/search_syntax/
[2]: https://app.datadoghq.com/logs/query-translator/translator
[3]: https://app.datadoghq.com/logs/batch-migration
[4]: /ja/ddsql_editor/
[5]: /ja/account_management/rbac/permissions/
[6]: /ja/logs/explorer/
[7]: /ja/monitors/types/log/
[8]: /ja/dashboards/
[9]: /ja/standard-attributes/
[10]: /ja/logs/log_configuration/processors/
[11]: /ja/logs/log_configuration/indexes/