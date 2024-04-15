---
further_reading:
- link: /logs/log_configuration/logs_to_metrics/
  tag: ドキュメント
  text: 取り込んだログからメトリクスを生成する
- link: /getting_started/tagging/
  tag: ドキュメント
  text: タグ付けについて
- link: /dashboards/widgets/table/
  tag: ドキュメント
  text: テーブルウィジェットについて

title: ログコスト属性
---

## 概要

Datadog では、[ログ推定使用量ダッシュボード][1]やアプリ内の[計画と使用][2]セクション、利用可能な[ログ使用量メトリクス][3]を通じてログ使用量情報を提供しています。しかし、特定のチームなど、より詳細なコスト属性のデータを可視化したい状況もあるかもしれません。

このガイドでは、カスタムメトリクスとダッシュボードを作成し、異なるチームのログコスト属性を確認する方法を説明します。また、このプロセスは、部門、プロジェクト、製品、地域など、他の属性にも使用することができます。

1. [カスタムタグを構成します](#configure-custom-tags)。
2. それらのタグを使用して[カスタムログメトリクスを生成します](#generate-custom-logs-metrics)。
3. カスタムログメトリクスの[ダッシュボードにウィジェットを作成します](#create-a-dashboard-using-the-custom-logs-metrics)。

{{< img src="logs/faq/logs_cost_attribution/cost_attribution_dashboard.png" alt="取り込み、機密データスキャナー、7 日間のインデックス作成、15 日間のインデックス作成について、チームごとに使用量とコストを表ウィジェットで表示するダッシュボード。" style="width:85%" >}}

## 新しいログパイプラインを作成する

コストを属性化するログにフィルターをかける、新しいログパイプラインを作成します。この例では、チームごとに内訳を確認したいログのサブセットにフィルターをかけます。

1. [ログパイプライン][4]に移動します。
2. **Add a new pipeline** をクリックします。
3. コストを属性化したいログのフィルターを入力します。
4. パイプラインの名前を入力します。例えば、`Cost attribution by team` となります。
5. オプションで、タグと説明を追加します。
6. **作成**をクリックします。

新しいパイプラインは、パイプラインのリストの最後に残しておきます。これにより、ログが他のパイプラインを経由して、それらのタグや属性が最初に作成されるようになります。

このコスト属性の例で作成したすべてのプロセッサーを新しいパイプラインに追加します。

### `team` タグを追加する

Datadog では、これらの[タグ付け方法][5]のいずれかを使用して、**取り込みの前に** `team` タグをログに追加することを推奨しています。

しかし、取り込み中にタグを構成する必要がある場合は、以下の手順で `team` タグを作成し、追加してください。

1. [新しい `team` 属性を作成します](#create-a-new-team-attribute)。
2. [`team` 属性をタグに変換するリマッパーを作成します](#create-a-remapper-to-convert-the-team-attribute-to-a-tag)。

このプロセスを利用して、ログの使用量を分解するための属性 (例えば、部門別、製品別、地域別など) を作成することができます。

#### 新しい `team` 属性を作成する

[カテゴリープロセッサ][6]を使って、ログに新しい `team` 属性を作成します。

1. 新しいパイプラインに移動し、**Add processor** をクリックします。
2. プロセッサーの種類は、**Category Processor** を選択します。
3. プロセッサーの名前を入力します。例えば、"Create team attribute" となります。
4. **Set target category attribute** フィールドに `team` と入力します。これで `team` 属性が作成されます。
5. **Populate category** セクションで、各チームにカテゴリーを追加します。例えば、`service:a` と `env:prod` に一致するイベントをログに記録するために `team:service_a` というタグを追加するには
      a. **All events that match** フィールドに `service:a` と `env:prod` を入力します。
      b. **Appear under the value name** フィールドに `service_a` を入力します。
      c. **Add** をクリックします。
6. 他のチームを別のカテゴリーとして追加します。
7.  **作成**をクリックします。

#### `team` 属性をタグに変換するリマッパーを作成する

1. パイプラインに移動し、**Add processor** をクリックします。
2. プロセッサーの種類で **Remapper** を選択します。
3. プロセッサーの名前を入力します。例えば、"Convert team attribute to tag" となります。
4. **Set attribute(s) or tag key to remap** セクションで、**Attribute(s)** を選択し、`team` と入力します。
5. **Set target attribute or tag key** セクションで、**Tag key** を選択し、`team` と入力します。
6. **Preserve source attribute** を無効にすると、属性が削除され、タグのみが保持されるようになります。
7. **Override on conflict** を有効にします。
8. **作成**をクリックします。

{{< img src="logs/faq/logs_cost_attribution/team_remapper.png" alt="チームリマッパーの作成に必要なデータを表示したリマッパーの作成フォーム" style="width:75%" >}}

## カスタムタグの構成

カスタムタグを作成すると、カスタムログ使用量メトリクスをユースケースに関連するカテゴリーに整理することができます。この例では、次のタグを作成します。

- Datadog のインデックスにログを保持する日数を示す `retention_period` 。
- オンラインアーカイブスにログがルーティングされているかどうかを示す `online_archives`。
- 機密データスキャナーによってログがスキャンされたかどうかを示す `sds`。

### `retention_period` タグを作成する

<div class="alert alert-warning">Datadog は、インデックスがすべて同じ保持期間を持つ場合でも、<code>retention_period</code> タグを設定することを推奨しています。これは、複数の保持期間を使用し始めると、すべてのログにその保持期間のタグが付けられることを確認します。</div>

`retention_period` は、Datadog のインデックスにログが保持される日数です。インデックスの請求コストはログの保持日数に基づいて発生するため、`retention_period` タグを使用して各ログを保持期間と関連付け、コストの属性を確認します。

Datadog では、以下の方法で `retention_period` タグを構成することを推奨しています。

1. [新しい `index_name` 属性を作成します](#create-a-new-index_name-attribute)。
2. [新しい `retention_period` 属性を作成します](#create-a-new-retention_period-attribute)。
3. [`retention_period` 属性をタグに変換するリマッパーを作成します](#create-a-remapper-to-convert-the-retention_period-attribute-to-a-tag)。

#### 新しい `index_name` 属性を作成する

[カテゴリープロセッサー][6]を使用して、ログがルーティングされるインデックスを識別するための新しい `index_name` 属性を作成します。

1. 以前に作成したパイプラインに移動し、**Add processor** をクリックします。
2. プロセッサーの種類は、**Category Processor** を選択します。
3. プロセッサーの名前を入力します。例えば、"Create index_name attribute" となります。
4. **Set target category attribute** フィールドに **index_name** と入力します。これで `index_name` 属性が作成されます。
5. 各インデックスにカテゴリーを追加します。例えば、`env:staging` とタグ付けされたすべてのログに対して、`retention-7` という名前のインデックスがある場合:
    {{< img src="logs/faq/logs_cost_attribution/indexes_configuration.png" alt="フィルタークエリ、保持期間、retention-30、retention-15、retention-7、demo インデックスでオンラインアーカイブが有効かどうかを示すインデックスリスト" >}}
次に、**Populate category** セクションで、
      a. **All events that match** フィールドに `env:staging` を入力します。
      b. **Appear under the value name** フィールドに `retention-7` を入力します。
      c. **Add** をクリックします。
6. 他のインデックスを別のカテゴリーとして追加します。
7.  **作成**をクリックします。

{{< img src="logs/faq/logs_cost_attribution/indexes_category_processor.png" alt="カテゴリープロセッサーのフォームにデータを入力し、index_name 属性を作成します" style="width:75%" >}}

#### 新しい `retention_period` 属性を作成する

[カテゴリープロセッサー][6]を使用して、新しい `retention_period` 属性を作成し、インデックスとその保持期間を関連付けます。

1. パイプラインに移動し、**Add processor** をクリックします。
2. プロセッサーの種類は、**Category Processor** を選択します。
3. プロセッサーの名前を入力します。例えば、"Create retention_period attribute" となります。
4. **Set target category attribute** フィールドに `retention_period` と入力します。これで `retention_period` 属性が作成されます。
5. 保持期間ごとにカテゴリーを追加します。例えば、`retention-7`という 7 日間の保持インデックスがある場合、**Populate category** セクションに、
      a. **All events that match** フィールドに `@index_name:(retention-7)` を入力します。
      b. **Appear under the value name** フィールドに `7` を入力します。
      c. **Add** をクリックします。
6. 他の保持期間を別のカテゴリーとして追加します。
7. **作成**をクリックします。

{{< img src="logs/faq/logs_cost_attribution/retention_period_processor.png" alt="カテゴリープロセッサーのフォームにデータを入力し、retention_period 属性を作成します" style="width:75%" >}}

#### `retention_period` 属性をタグに変換するリマッパーを作成する

1. パイプラインに移動し、**Add processor** をクリックします。
2. プロセッサーの種類で **Remapper** を選択します。
3. プロセッサーの名前を入力します。例えば、"Convert retention_period attribute to tag" となります。
4. **Set attribute(s) or tag key to remap** セクションで、**Attribute(s)** を選択し、`retention_period` と入力します。
5. **Set target attribute or tag key** セクションで、**Tag key** を選択し、`retention_period` と入力します。
6. **Preserve source attribute** を無効にすると、属性が削除され、タグのみが保持されるようになります。
7. **Override on conflict** を有効にします。
8. **作成**をクリックします。

{{< img src="logs/faq/logs_cost_attribution/retention_period_remapper.png" alt="retention_period リマッパーの作成に必要なデータを表示したリマッパーの作成フォーム" style="width:75%" >}}

### `online_archives` タグを作成する

<div class="alert alert-warning">Datadog は、インデックスのどれもがオンラインアーカイブを有効にしていない場合でも、<code>online_archives</code> タグを設定することを推奨しています。これにより、オンラインアーカイブの使用を開始した場合、関連するログが <code>online_archives</code> でタグ付けされることが保証されます。</div>

`online_archives` タグは、ログがオンラインアーカイブスに転送されたかどうかを示します。オンラインアーカイブは標準的なインデックス作成とは異なる課金方法なので、`online_archives` タグを使用して、どのログがオンラインアーカイブにルーティングされたかを判断し、コストの属性を確認します。

Datadog では、以下の方法で `online_archive` タグを構成することを推奨しています。

#### `online_archives` 属性を作成する

[カテゴリープロセッサー][6]を使用して、関連するインデックスがオンラインアーカイブを有効にしているかどうかを示す、新しい `online_archives` 属性を作成します。

1. 以前に作成したパイプラインに移動し、**Add processor** をクリックします。
2. プロセッサーの種類は、**Category Processor** を選択します。
3. プロセッサーの名前を入力します。例えば、"Create online_archives attribute" と入力します。これは `online_archives` 属性を作成します。
4. **Populate category** セクションに、2 つのカテゴリーを追加します。
      <br> **最初のカテゴリー**では、オンライン アーカイブが有効になっているすべてのインデックスに値 `true` が割り当てられます。例えば、`retention-30` という名前のインデックスのログがオンラインアーカイブに入る場合、
      a. **All events that match** フィールドに `@index_name:(retention-30)` を入力します。
      b. **Appear under the value name** フィールドに `true` を入力します。
      c. **Add** をクリックします。
      <br> **2 番目のカテゴリー**では、他のすべてのインデックスに `false` という値が割り当てられています。
      a. **All events that match** フィールドに `*` を入力します。
      b. **Appear under the value name** フィールドに `false` を入力します。
      c. **Add** をクリックします。
5. **作成**をクリックします。

{{< img src="logs/faq/logs_cost_attribution/online_archives_attribute.png" alt="カテゴリープロセッサーのフォームにデータを入力し、online_archives 属性を作成します" style="width:75%" >}}

#### `online_archives` 属性をタグに変換するリマッパーを作成する

1. パイプラインに移動し、**Add processor** をクリックします。
2. プロセッサーの種類で **Remapper** を選択します。
3. プロセッサーの名前を入力します。例えば、"Convert online_archives attribute to tag" となります。
4. **Set attribute(s) or tag key to remap** セクションで、**Attribute(s)** を選択し、`online_archives` と入力します。
5. **Set target attribute or tag key** セクションで、**Tag key** を選択し、`online_archives` と入力します。
6. **Preserve source attribute** を無効にすると、属性が削除され、タグのみが保持されるようになります。
7. **Override on conflict** を有効にします。
8. **作成**をクリックします。

<div class="alert alert-info"> カテゴリープロセッサーのカテゴリーの順序は重要です。属性には、インデックスと同じロジックで、ログがマッチングクエリにマッチする最初のカテゴリの値が割り当てられます。このため、マッチングクエリとインデックスカテゴリープロセッサーの順序が実際のインデックスの順序と同じであること、およびオンラインアーカイブカテゴリープロセッサーで `false` の前に `true` というカテゴリーが常にチェックされることを確認します。<br><br>
インデックス構成が変更された場合、その変更に伴いプロセッサーの構成を更新する必要があります。</div>


Datadog では、[Datadog API エンドポイント][7]を使用して、構成を自動的に取得・更新し、このプロセスを自動化することを強く推奨しています。

### `sds` タグを作成する

<div class="alert alert-warning">Datadog では、機密データスキャナーを使用していない場合でも、<code>sds</code> タグを設定することを推奨しています。これにより、機密データスキャナーの使用を開始した場合、関連するすべてのログに <code>sds</code> のタグが付けられます。</div>

`sds` タグは、ログが機密データスキャナーによってスキャンされたかどうかを示します。機密データスキャナーの特定の使用量に関連するコストを見積もるには、`sds` タグを使用します。

機密データスキャナーの場合、請求される使用量はスキャンされたログの量に基づくため、スキャンルールではなく、スキャングループに一致します。そのため、各スキャングループに、すべてのログに一致する正規表現でプロキシスキャンルールを作成する必要があります。これにより、スキャンされたすべてのログがタグ付けされるようになります。

1. [機密データスキャナー][8]に進みます。
2. 各スキャングループで
      a. **Add Scanning Rule** をクリックします。
      b. すべてのログに一致させるには、**Define Regex to match** フィールドに `.` を入力します。
      c. **Scan the entire event or a part of it** フィールドで、**Entire Event** を選択します。
      d. **Add tags** フィールドに `sds:true` を入力します。
      e. **Define action on match** を **No action** のままにします。
      f. スキャンルールの名前を入力します。例えば、"Create sds tag" となります。
      g. **Create** をクリックします。

## カスタムログメトリクスを生成する

Datadog は、推定使用量を確認できるように、[ログ使用量メトリクス][3]のセットを提供します。しかし、これらのメトリクスは変更できないため、代わりに特定のログの使用量に応じたカスタムログメトリクスを生成することができます。

使用量は製品によってギガバイト (GB) 単位または百万イベント単位で測定されるため、2 つの異なるメトリクスを生成する必要があります。

- 取り込まれたバイト数をカウントするメトリクス。
- 取り込まれたイベント数をカウントするメトリクス。

カスタムメトリクスを設定する際、`group by` フィールドのタグは、メトリクスのディメンションになります。これらのフィールドを使用して、メトリクスが生成された後にフィルタリングと集計を行います。`group by` フィールドには、必ず以下のタグを含めてください。

- `datadog_index`、ログがルーティングされる場合、このタグには、ログがルーティングされるインデックスの名前が含まれます。
- `datadog_is_excluded` は、ルーティングされたインデックスの除外フィルターでログが拒否されたかどうかを示します。
- 上記で構成したすべてのカスタムタグ (`team`、`retention_period`、`online_archives`、`sds`) を指定します。

メトリクスの生成方法については、[ログベースのメトリクスの生成][9]を参照してください。

<div class="alert alert-info">メトリックの構成 (クエリフィルターやディメンションの変更など) を更新しても、すでに取り込まれたログには遡及して適用されないため、関連するすべてのタグがメトリクスのディメンションに含まれていることを確認することが非常に重要です。</div>

{{< img src="logs/faq/logs_cost_attribution/bytes_injected_metric.png" alt="logs.estimated.usage.ingested_bytes をメトリクス名として、group by フィールドには前述のタグを表示している新しいメトリクスフォーム" style="width:75%" >}}

{{< img src="logs/faq/logs_cost_attribution/events_injected_metric.png" alt="logs.estimated.usage.ingested_events をメトリクス名として、group by フィールドには前述のタグを表示している新しいメトリクスフォーム" style="width:75%" >}}

## カスタムログのメトリクスを使ったダッシュボードの作成

Datadog では、生成されたカスタムログメトリクスを使用する方法がいくつかあります。メトリクスは、ダッシュボードに表示したり、アラートをかけたり、ノートブックで使用したり、メトリクスエクスプローラーでクエリしたり、様々な使い方ができます。

Datadog では、以下の各製品の使用量を追跡するために、[テーブルウィジェット][11]を備えた[ダッシュボードを作成][10]することを推奨しています。

- ログの取り込み
- ログ用機密データスキャナー
- 保存期間別 (3 日、7 日、15 日、30 日など) のログインデックス化
- オンラインアーカイブ

新しいダッシュボードを作成するには

1. [ダッシュボードリスト][12]に移動します。
2. 右上の **New Dashboard** をクリックします。
3. ダッシュボード名を入力します。
4. **New Dashboard** をクリックします。

### ログ取り込み使用量のウィジェットの作成

Datadog では、ログ取り込みのテーブルウィジェットを以下のように構成することを推奨しています。

1. ダッシュボードで、**Add Widgets** をクリックします。
2. **Table** ウィジェットを選択します。
3. **Metrics** フィールドで、先ほど生成した **bytes** カウントメトリクスを選択し、取り込んだバイト数をカウントします。
4. **sum by** フィールドを選択し、`team` タグを追加すると、チームごとの使用量をバイト単位で表示することができます。また、コストバケットごとに他のタグを追加することもできます。例えば、`host` タグを追加すると、ホストごとの使用量を見ることができます。
5. 使用量をコストに変換するために、式 `Usage in gigabytes` * `Unit cost for Log Ingestion` を追加します。
   **注**: ギガバイトあたりの契約価格が変更された場合、計算式を手動で更新する必要があります。
6. **保存**をクリックします。

{{< img src="logs/faq/logs_cost_attribution/logs_ingestion_metric_widget.png" alt="ログ取り込み使用量を記入したデータを表示するウィジェット編集フォーム" style="width:75%" >}}

{{< img src="logs/faq/logs_cost_attribution/ingestion_widget.png" alt="取り込み使用量とコストをチームごとに分けて表示したテーブルウィジェット" style="width:60%" >}}

### 機密データスキャナーのウィジェットを作成する

Datadog では、機密データスキャナーのテーブルウィジェットを次のように構成することを推奨しています。

1. ダッシュボードで、**Add Widgets** をクリックします。
2. **Table** ウィジェットを選択します。
3. **Metrics** フィールドで、先ほど生成した **bytes** カウントメトリクスを選択し、取り込んだバイト数をカウントします。
4. **From** フィールドには、機密データスキャナーでスキャンされたログのみをフィルターするために、`sds:true` と入力します。
5. **sum by** フィールドを選択し、`team` タグを追加すると、チームごとの使用量をバイト単位で表示することができます。また、コストバケットごとに他のタグを追加することもできます。
6. 使用量をコストに変換するために、式 `Usage in gigabytes` * `Unit cost for the Sensitive Data Scanner` を追加します。
   **注**: ギガバイトあたりの契約価格が変更された場合、計算式を手動で更新する必要があります。
7. **保存**をクリックします。

{{< img src="logs/faq/logs_cost_attribution/sds_metric_widget.png" alt="機密データスキャナーのログ使用量を記入したデータを表示するウィジェット編集フォーム" style="width:75%" >}}

{{< img src="logs/faq/logs_cost_attribution/sds_widget.png" alt="機密データスキャナーの使用量をチーム別に表示したテーブルウィジェット" style="width:60%" >}}


### ログインデックス化使用量のウィジェットの作成

インデックスの作成はログの保持日数に応じて課金されるため、保持期間ごとに 1 つのウィジェットを作成します。

Datadog では、ログインデックス化のテーブルウィジェットを以下のように構成することを推奨しています。

1. ダッシュボードで、**Add Widgets** をクリックします。
2. **Table** ウィジェットを選択します。
3. 先ほど生成した **events** カウントメトリクスを選択し、取り込んだイベント数をカウントします。
4. **from** フィールドに、以下を追加します。
      a. `datadog_index:*` でインデックスにルーティングされたログのみをフィルターにかけます。
      b. `datadog_is_excluded:false` でどの除外フィルターにも一致しないログだけをフィルターにかけます。
      c. `retention_period:7` で 7 日間保持されるログのみにフィルターをかけます。すべてのインデックスに同じ保持期間を設定しているため、このタグを以前に設定しなかった場合は、このタグを追加する必要はありません。他にも `retention_period` タグがある場合は、それぞれ別のウィジェットを作成してください。
5. **sum by** フィールドを選択し、`team` タグを追加すると、チームごとの使用量をイベント単位で表示することができます。また、コストバケットごとに他のタグを追加することもできます。
6. 使用量をコストに変換するために、式 `Usage in millions of events` * `Unit cost for 7 days of retention` を追加します。100 万イベントあたりの契約価格が変更された場合は、計算式を手動で更新する必要があります。
7. **保存**をクリックします。

`retention_period` タグごとにウィジェットを作成します。

{{< img src="logs/faq/logs_cost_attribution/indexing_metric_widget.png" alt="ログインデックス化使用量を記入したデータを表示するウィジェット編集フォーム" style="width:75%" >}}

{{< img src="logs/faq/logs_cost_attribution/7_day_indexing_widget.png" alt="7 日間のインデックス化使用量をチーム別に表示したテーブルウィジェット" style="width:60%" >}}

### オンラインアーカイブ使用量のウィジェットの作成

インデックスのオンラインアーカイブを有効にすると、ログは複製され、以下の両方に格納されます。

1. 除外フィルター、ログは除外フィルターを通過した場合のみインデックス化されます。
2. オンラインアーカイブに直接。

したがって、除外フィルターは、オンラインアーカイブに入るログには適用されません。

{{< img src="logs/faq/logs_cost_attribution/exclusion_filters_online_archives.png" alt="除外フィルターのパイプラインとオンラインアーカイブのパイプラインを表示したオンラインアーカイブインデックス" style="width:75%" >}}

この情報に基づき、Datadog ではオンラインアーカイブのテーブルウィジェットを以下のように構成することを推奨しています。

1. ダッシュボードで、**Add Widgets** をクリックします。
2. **Table** ウィジェットを選択します。
3. **Metrics** フィールドで、先ほど生成した取り込みイベント数をカウントする **events** カウントメトリクスを選択します。
4. **from** フィールドに、以下を追加します。
      - `datadog_index:*` でインデックスにルーティングされたログのみをフィルターにかけます。
      - `online_archives:true` でオンラインアーカイブにルーティングされたログのみをフィルターにかけます。
5. **sum by** フィールドを選択し、`team` タグを追加すると、チームごとの使用量をイベント単位で表示することができます。また、コストバケットごとにタグを追加することもできます。
6. 使用量をコストに変換するために、式 `Usage in millions of events` * `Unit cost for Online Archives` を追加します。
   **注**: イベント 100 万件あたりの契約価格が変更された場合、計算式を手動で更新する必要があります。
7. **保存**をクリックします。

{{< img src="logs/faq/logs_cost_attribution/online_archives_metric_widget.png" alt="オンラインアーカイブ使用量を記入したデータを表示するウィジェット編集フォーム" style="width:75%" >}}

### 使用量とコストの合計を表示するウィジェットの作成

すべての製品を 1 つのウィジェットに集計して、使用量とコストの合計を視覚化することができます。Datadog では、以下の方法でテーブルウィジェットを構成することを推奨しています。

1. ダッシュボードで、**Add Widgets** をクリックします。
2. **Table** ウィジェットを選択します。
3. 他のウィジェットで作成したすべてのクエリと数式をこのウィジェットに追加します。
    - [ログ取り込み](#create-a-widget-for-log-ingestion-usage)
    - [ログ用機密データスキャナー](#create-a-widget-for-sensitive-data-scanner)
    - [ログインデックス化](#create-a-widget-for-log-indexing-usage)
    - [オンラインアーカイブ](#create-a-widget-for-online-archives-usage)
4. **保存**をクリックします。

{{< img src="logs/faq/logs_cost_attribution/all_metrics_widget.png" alt="6 種類のメトリクスが表示されているテーブルウィジェットの Graph your data セクション" style="width:75%" >}}

### その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/30602/log-management---estimated-usage
[2]: https://app.datadoghq.com/billing/usage
[3]: /ja/logs/log_configuration/logs_to_metrics/#logs-usage-metrics
[4]: https://app.datadoghq.com/logs/pipelines
[5]: /ja/getting_started/tagging/#tagging-methods
[6]: /ja/logs/log_configuration/processors/?tab=ui#category-processor
[7]: /ja/logs/log_configuration/processors/?tab=api#category-processor
[8]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner
[9]: /ja/logs/log_configuration/logs_to_metrics/#generate-a-log-based-metric
[10]: /ja/dashboards/#new-dashboard
[11]: /ja/dashboards/widgets/table/
[12]: https://app.datadoghq.com/dashboard/lists
