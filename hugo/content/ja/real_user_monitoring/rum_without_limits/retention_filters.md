---
description: RUM without Limits での保持フィルターの機能について学びます。
further_reading:
- link: /real_user_monitoring/guide/retention_filter_best_practices/
  tag: ガイド
  text: 保持フィルターのベストプラクティス
- link: /real_user_monitoring/rum_without_limits/
  tag: ドキュメント
  text: RUM without Limits
- link: /real_user_monitoring/rum_without_limits/metrics
  tag: ドキュメント
  text: メトリクスを用いたパフォーマンスの分析
- link: /real_user_monitoring/rum_without_limits/retention_quotas
  tag: ドキュメント
  text: 保持クォータを用いたコストの管理
- link: https://www.datadoghq.com/blog/rum-apm-retention-filters
  tag: ブログ
  text: 保持フィルターを使用してフロントエンドとバックエンドのデータを統合し、関連付けます。
- link: https://learn.datadoghq.com/courses/rum-retention-filters
  tag: ラーニングセンター
  text: 'インタラクティブラボ: RUM 保持フィルター'
title: 保持フィルターを用いたデータの保持
---
{{< learning-center-callout header="ラーニングセンターで RUM 保持フィルターを試してみる" btn_title="今すぐ登録" btn_url="https://learn.datadoghq.com/courses/rum-retention-filters" hide_image="false" >}}
  RUM 保持フィルターを使用して、どのセッションデータを保存するかを管理し、監視可能性の予算を最適化する方法を学びます。
{{< /learning-center-callout >}}

## 概要 {#overview}

保持フィルターは、RUM セッションエクスプローラーで使用されるものと同様の一連のクエリです。RUM イベント (セッション、ビュー、アクション、リソースなど) が取り込まれるときに、これらに対して実行されます。これらのフィルターによって、セッションを標準の 30 日間の RUM 保持期間だけ保存するか、破棄するかを決定します。

**保持率**は、一致したセッションのうち保持するものの割合を指定します。これで、より適切なコスト管理が可能になります。フィルターは個々のイベントに対して適用されますが、サンプリングの決定が行われると、基になるセッションのすべてのイベントが保持され、ユーザーセッションのエンドツーエンドの可視性が確保されます。

構成は、[永続保持フィルター](#permanent-retention-filters)、[除外フィルター](#exclusion-filters)、[カスタム保持フィルター](#custom-retention-filters)の 3 種類のフィルターで構成されています。イベントが通過するパスについては、「[フィルターの種類](#types-of-filters)」を参照してください。

## 仕組み {#how-it-works}

セッションは、定義済みのクエリに基づいて、セッションを構成するイベントのいずれかに保持フィルターが一致した時点で保存され、設定された保持率に基づいてイベントがサンプリングされます。

{{< img src="real_user_monitoring/rum_without_limits/rum-without-limits-how-retention-filters-work-2.png" alt="保持フィルターの論理フローと、それらによって最終的に保持されるセッション数がどのように決定されるかを示す図。" style="width:80%" >}}

保持フィルターの論理フローは以下のとおりです。

- 各イベントは、フィルターに対して順番に評価されます。
- イベントがフィルターに一致すると、保持率によってセッション全体の保持が決定されます。いずれの場合も、イベントは後続のフィルターに対しては評価されないため、**保持フィルターの順序が重要**になります。
- 保持されたセッションは、セッションエクスプローラーやその他の RUM ページで利用可能になります。それ以降のイベントは、フィルターが適用されずに自動的に保持されます。

**注**:

- イベントがいずれのフィルターにも一致しなかった場合、またはフィルターに一致したが保持率によってサンプリングされなかった場合、同じセッションの後続のイベントは引き続き評価されるため、そのセッションは最終的に保持される可能性があります。
- 時間の経過とともに更新される属性に対するフィルターには注意してください。エラー数はゼロから始まりリアルタイムで更新されるため、エラー数が 2 未満のセッションに対するフィルターはほぼすべてに一致します。「以上」(≥) 条件を使用する (`@session.error.count >= 2` など) か、`@session.is_active: false` または `@view.is_active: false` を追加してオブジェクトが完了するまで待ってください。
- イベントは必ずしも発生した順序で評価されるわけではありません。イベント `B` はイベント `A` より前に評価されることがあります。すべてのイベントは、漏れを防ぐために、最終的に保持フィルターのリストに対して評価されます。

## フィルターの種類 {#types-of-filters}

{{< img src="real_user_monitoring/rum_without_limits/retention-filters-types.png" alt="[Retention Filters] (保持フィルター) ページにある 3 つのフィルターグループ: [Permanent Filters] (永続フィルター)、[Exclusion Filters] (除外フィルター)、[Custom Retention Filters] (カスタム保持フィルター)。" style="width:100%" >}}

すべての RUM イベントには、同じ構成が同じ順序で適用されます。

1. イベントは**永続保持フィルター**に対して評価されます。これらは事前定義済みであり、編集できません。イベントがいずれかのフィルターに一致した場合、そのセッションは保持されます。
1. イベントは**除外フィルター**に対して評価されます。イベントがいずれかのフィルターに一致した場合、それ以降の評価は行われません。
1. イベントがいずれの除外フィルターにも一致しない場合は、**カスタム保持フィルター**に対して順番に評価されます。イベントがいずれかのフィルターに一致し、保持率によってサンプリングされた場合、そのセッションは保持されます。

3 種類のフィルターは、一致した場合の処理が異なります。

| フィルターの種類                | イベントが一致した場合の処理                                                |
| -------------------------- | -------------------------------------------------------------------- |
| 永続保持フィルター | セッションが保持されます。                                             |
| 除外フィルター           | イベントは、カスタム保持フィルターに対する評価をスキップします。     |
| カスタム保持フィルター    | 設定された保持率に従って、セッションが保持されます。 |

## 永続保持フィルター {#permanent-retention-filters}

永続保持フィルターは、変更、無効化、削除ができない定義済みの保持フィルターです。これらは保持フィルターのリストの最上部に配置されます。

{{< img src="real_user_monitoring/rum_without_limits/permanent-retention-filters.png" alt="[Permanent Filters] グループが展開され、[RUM-APM Flat Sampling] (RUM-APM フラットサンプリング)、[Synthetics Sessions] (Synthetics セッション)、[Sessions with forced replays] (強制リプレイ付きセッション) の各フィルターが表示されています。" style="width:100%" >}}

永続保持フィルターには、次の 3 つがあります。

- [{{< ui >}}RUM-APM Flat Sampling{{< /ui >}}] (RUM-APM フラットサンプリング): 取り込まれた分散トレースを含むセッションの 1% を保持します (また、APM でトレースをインデックス化します)。これらのセッション (およびそのトレース) は、**RUM 課金 (または APM 課金) の対象外です**。
- [{{< ui >}}Synthetics Sessions{{< /ui >}}] (Synthetics セッション): [Synthetic Monitoring][1] によって生成されたすべてのセッションを保持します。これらのセッションは Synthetic Monitoring に基づいて課金され、**RUM 課金の対象外です**。
- [{{< ui >}}Sessions with forced replays{{< /ui >}}] (強制リプレイ付きセッション): [強制収集][2]メカニズムを通じてリプレイが強制収集された、すべてのセッションを保持します。

<div class="alert alert-info">RUM-APM Flat Sampling 永続保持フィルターは、以下の SDK でのみ適用されます: <br> - Browser 6.5.0 以降 <br> - Android 3.0.0 以降 <br> - iOS 3.3.0 以降 <br> - React Native 3.0.0 以降 <br> - Flutter 3.0.0 以降 <br></div>

## 除外フィルター {#exclusion-filters}

{{< img src="real_user_monitoring/rum_without_limits/exclusion-filters-excluded-errors.png" alt="[Exclusion Filters] グループが展開され、定義済みの [Excluded errors from Error Tracking] (Error Tracking から除外するエラー) フィルターと、2 つのカスタム除外フィルターおよびそのイベントタイプおよびクエリが示されています。" style="width:100%" >}}

除外フィルターを使用すると、特定のイベントについて、カスタム保持フィルターに対する評価をスキップすることができます。これらは、永続保持フィルターの後に適用されます。

カスタム保持フィルターすべてが当てはまらないイベントがある場合に使用します (自己申告ボットトラフィック、廃止されたアプリケーションバージョン、既知の誤エラーなど)。

<div class="alert alert-warning">除外フィルターは<strong>イベント</strong>に適用され、セッションには適用されません。イベントを除外してもセッションは破棄されません。同じセッションの別のイベントがカスタム保持フィルターに一致した場合、除外されたイベントを含め、セッション全体が保持されます。</div>

除外フィルターは、保持フィルターと同様にイベントタイプとクエリで構成されますが、次の 2 点が異なります。

- 除外フィルターは、単一のイベントタイプではなく、**すべてのイベント**を対象にすることができます。そのため、`@device.type` や `@geo.country` など、すべてのイベントで共有される属性やタグに基づいて除外できます。
- 除外フィルターには保持率が設定されていません。イベントに一致するかしないかの二択であるため、**除外フィルターの順序は重要ではありません**。

### Error Tracking からの除外設定の再利用 {#reusing-error-tracking-exclusions}

リストの上部にある定義済みの除外フィルターは、[Error Tracking で除外した][10]エラーを対象としているため、2 か所で同じ除外設定を保持する必要はありません。

このフィルターを有効または無効にすることはできますが、編集や削除はできません。

## カスタム保持フィルター {#custom-retention-filters}

{{< img src="real_user_monitoring/rum_without_limits/custom-retention-filters.png" alt="[Custom Retention Filters] グループが展開され、2 つの順序付けられたフィルターが、イベントタイプ、保持率、保持されたセッション数とともに示されています。" style="width:100%" >}}

カスタム保持フィルターは、ユーザーが作成および管理するフィルターです。各フィルターでは、イベントタイプとクエリおよび保持率が併せて設定されており、それぞれがセッションを保持できます。

### フィルタークエリによるイベントの除外 {#excluding-events-with-a-filter-query}

カスタム保持フィルターは、どのセッションを除外するかではなく、どのセッションを保持するかを指定します。保持率を 0% に設定することはできません (最小値は 0.1% です)。また、保持率を低く設定することは効果的な除外戦略ではありません。構成内の他のフィルターによってセッションが保持される可能性があるためです。

1 つのフィルターのみが一部のイベントに一致しないようにするには、**そのフィルターのクエリ内**に除外条件を追加します。例:

- `-version:(1* OR 2*)` を保持フィルターに追加すると、そのフィルターがアプリケーションの古いバージョン 1 および 2 のイベントを保持しないようにすることができます。
- `-@device.type:Bot` を保持フィルターに追加すると、検索エンジンのクローラーやその他の自己申告ボットがそのフィルターから除外されます。
- `-@geo.country:"South Korea"` を保持フィルターに追加すると、韓国からのセッションがそのフィルターから除外されます。

クエリ内の除外は、それを含むフィルターにのみ適用されます。他のフィルターが同じセッションを保持する可能性があるため、この方法を使用して構成全体でイベントを除外するには、**すべての**フィルターで除外を繰り返し設定し、フィルターを追加するたびに除外を設定する必要があります。

すべてのカスタム保持フィルターから一度にイベントを除外するには、代わりに[除外フィルター](#exclusion-filters)を使用してください。

**注**: 除外フィルターに一致するイベントはカスタム保持フィルターに到達することはないため、セッションの保持がトリガーされることはありません。

## セットアップ{#setup}

フィルターを設定するには、RUM ページの右上隅にある [{{< ui >}}Settings{{< /ui >}}] (設定) > [{{< ui >}}Retention Filters{{< /ui >}}] (保持) をクリックして直接アクセスしてください。

次のように設定することもできます。

1. [[{{< ui >}}Digital Experience{{< /ui >}}] (デジタルエクスペリエンス) > [{{< ui >}}Manage Applications{{< /ui >}}] (アプリケーションの管理)][3] に移動します。
1. RUM アプリケーションを作成するか、既存のアプリケーションをクリックします。
1. [Product Settings] (製品設定) で、[{{< ui >}}Retention Filters{{< /ui >}}] (保持フィルター) ページに移動します。

### フィルターの作成 {#creating-a-filter}

保持フィルターまたは除外フィルターを作成するには、次のようにします。

1. 作成するフィルターの種類のセクションで、[{{< ui >}}\+ Add Filter{{< /ui >}}] (+フィルターの追加) ボタンをクリックします。
1. フィルターにわかりやすい名前を付けます。
1. ドロップダウンからイベントタイプを選択し、クエリを入力します。[RUM エクスプローラー][4]で記述できるクエリであれば、何でも動作します。除外フィルターは [{{< ui >}}All events{{< /ui >}}] (すべてのイベント) をターゲットにすることもできます。
1. カスタム保持フィルターの場合、必要に応じて、クエリに一致するセッションに対して保持率を設定できます。[{{< ui >}}Generate Estimate{{< /ui >}}] (推定値を生成) をクリックすると、保持率の設定の参考となる値が示されます。除外フィルターには保持率はありません。

新しいカスタム保持フィルターは、カスタム保持フィルターの一覧の末尾に追加されます。Datadog が新しい保持フィルターを反映し、適用を開始するまで数秒かかります。

どちらの種類のフィルターでも、フィルターの作成に必要な権限は同じです。

### フィルターの変更 {#modifying-filters}

{{< img src="real_user_monitoring/rum_without_limits/modifying-filters.png" alt="保持フィルターにカーソルを合わせると、変更できます。" style="width:100%" >}}

#### フィルターの編集 {#edit-a-filter}

既存のフィルターを変更するには、次のようにします。

1. フィルターにカーソルを合わせ、[{{< ui >}}Edit{{< /ui >}}] (編集) アイコンをクリックします。
1. [{{< ui >}}Save Changes{{< /ui >}}] (変更を保存) をクリックします。

#### フィルターをコピーする {#duplicate-a-filter}

フィルターをコピーするには、次のようにします。

1. フィルターにカーソルを合わせ、[{{< ui >}}Duplicate{{< /ui >}}] (コピー) アイコンをクリックします。
1. フィルターに必要な変更を加え、[{{< ui >}}Save Changes{{< /ui >}}] をクリックします。

#### フィルターを削除する {#delete-a-filter}

フィルターを削除するには、次のようにします。

1. フィルターにカーソルを合わせ、[{{< ui >}}Delete{{< /ui >}}] (削除) アイコンをクリックします。
1. [{{< ui >}}Confirm{{< /ui >}}] (確認) をクリックします。

#### フィルターを無効にする {#disable-a-filter}

無効にされたフィルターはイベントを無視します。無効なカスタム保持フィルターでは、サンプリングの決定は行われず、無効な除外フィルターではイベントが除外されません。

フィルターの右側にあるトグルを使用して、フィルターを有効または無効にします。

#### フィルターを並べ替える {#reorder-filters}

フィルターをドラッグアンドドロップして、フィルターを並べ替えて新しい位置に配置します。

除外フィルターの順序は重要ではないため、並べ替えはカスタム保持フィルターにのみ適用されます。

### クォータによる保持の制限 {#capping-retention-with-quotas}

すべての保持フィルターで保持される 1 日あたりの合計セッション数に上限を設定するには、「[保持クォータ][9]」を参照してください。

## リプレイに対する保持フィルターの機能 {#how-retention-filters-work-with-replays}

保持フィルターを使用して、リプレイのセッションサンプリングを管理できます。リプレイが含まれるセッションに課金されるたびに、セッションイベントとビデオ録画の両方が保持され、課金されます。つまり、SDK からセッションの 100% とリプレイの 100% を収集している場合、保持フィルターがセッションを保持するたびに、Datadog はセッションとリプレイの両方を保持し、課金します。

**注**: Datadog のモバイル SDK には (一定のサンプルレートに基づくのではなく) [条件に基づいて記録を開始および停止する API][2] も用意されていますが、デフォルトで保持されるのは Browser SDK によって強制記録されたリプレイのみです。

## 製品間保持フィルター {#cross-product-retention-filters}

製品間保持フィルターを使用すると、異なる製品間の相関を最適化できるため、多くの詳細なテレメトリを保持できます。RUM 保持フィルターを構成する際、APM トレース用の製品間保持フィルターを有効にできます。

{{< img src="real_user_monitoring/rum_without_limits/cross-product-retention-filters-overview.png" alt="APM トレースに対して製品間保持フィルターが有効になっている RUM 保持フィルター。" style="width:100%" >}}

[{{< ui >}}APM traces filter{{< /ui >}}] (APM トレースフィルター) は、親 RUM 保持フィルターによって保持され、利用可能なトレースを持つセッションの指定された割合について、APM トレースのインデックスを作成します。

**注**: APM トレースが利用可能かどうかは、**トレースサンプリング SDK の構成**によって決まります (<a href="/real_user_monitoring/correlate_with_other_telemetry/apm?tab=browserrum">RUM と APM トレースの相関付け</a>の方法を参照してください)。

  <div class="alert alert-info">APM トレースフィルターは、次のバージョンの SDK とのみ互換性を持ちます: <br> - Browser 6.5.0 以降 <br> - Android 3.0.0 以降 <br> - iOS 3.3.0 以降 <br> - React Native 3.0.0 以降 <br> - Flutter 3.0.0 以降 <br></div>

<div class="alert alert-danger">製品間保持フィルターを設定することで、作成される APM のインデックスの量が増加する場合があります。</div>

RUM エクスプローラーで**APM トレースのインデックスが作成されたセッションを検索**するには、`@session.has_indexed_apm_traces:true` とクエリします。

### 例 {#example}

構成で、以下のように RUM 保持フィルターを設定するとします。

{{< img src="real_user_monitoring/rum_without_limits/cross-product-retention-filters-apm-only.png" alt="対象がエラーであり、保持率が 60% のRUM 保持フィルター。製品間フィルターは APM トレースの 25% に設定されています。" style="width:60%" >}}

SDK がトレースの 40% をサンプリングするように構成されている場合、結果は以下のようになります。

- 取り込まれた RUM セッションの 40% で、そのトレースが APM に取り込まれます。
- 少なくとも 1 つのエラーを含む取り込まれた RUM セッションのうち、60% が保持されます。
- 保持されたセッションのうち 25% x 40% = 10% で、その APM トレースのインデックスが作成されます。

### 永続フィルターに対する製品間保持フィルター {#cross-product-retention-filters-on-permanent-filters}

製品間保持フィルターは、<a href="/real_user_monitoring/rum_without_limits/retention_filters/#permanent-retention-filters">永続保持フィルター</a>に対しても使用できます。APM トレースフィルターは、**[Synthetic Monitoring Sessions] (Synthetic Monitoring セッション) および [Sessions with forced replays] フィルターでのみ編集可能**です。

<div class="alert alert-danger">Synthetics または強制リプレイ永続フィルターに対する製品間保持フィルターによってインデックスが作成された APM トレースは、APM への課金の対象となります。</div>

## ベストプラクティス {#best-practices}

「[保持フィルターのベストプラクティス][5]」を参照してください。

## API {#api}

フィルターおよび製品間保持フィルターは、[API][6] または Datadog 専用の [Terraform モジュール][7]を使用して管理できます。

## 次のステップ{#next-steps}

[メトリクス][8]を使用してパフォーマンスを分析します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/
[2]: /ja/session_replay/setup_and_configuration/?platform=browser&tab=npm#start-or-stop-the-recording-manually
[3]: https://app.datadoghq.com/rum/list
[4]: /ja/real_user_monitoring/explorer/
[5]: /ja/real_user_monitoring/guide/retention_filter_best_practices
[6]: /ja/api/latest/rum-retention-filters/
[7]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/data-sources/rum_retention_filters
[8]: /ja/real_user_monitoring/rum_without_limits/metrics
[9]: /ja/real_user_monitoring/rum_without_limits/retention_quotas
[10]: /ja/error_tracking/issue_states/#excluding-an-issue