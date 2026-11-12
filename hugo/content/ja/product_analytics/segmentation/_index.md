---
description: ユーザーベースのセグメントを分析し、理解します。
further_reading:
- link: /product_analytics/
  tag: ドキュメント
  text: Product Analytics
- link: https://learn.datadoghq.com/courses/getting-started-product-analytics
  tag: ラーニングセンター
  text: Product Analytics の利用を開始する
- link: https://www.datadoghq.com/blog/product-analytics-account-segments/
  tag: ブログ
  text: Product Analytics のアカウントセグメントでアカウントレベルのチャーンリスクを調査する
title: セグメント
---
## 概要 {#overview}

セグメンテーションでは、特性や行動に基づいて特定のユーザーグループやアカウントグループに焦点を当てることができます。これにより、インサイトの発見、傾向の特定、製品に関するデータに基づいた意思決定が可能になります。

たとえば、購入金額、特定の国でのアクティビティ、またはトライアルステータスごとにユーザーをセグメント化できます。また、年間経常収益 (ARR) や開始日などの属性によってアカウントをセグメント化することもできます。

セグメントを作成した後は、チャートや Dashboards で再利用して、グループごとの行動の違いを比較できます。

## セグメントの作成{#build-a-segment}

セグメントを作成するには、以下を行います。

1. [[{{< ui >}}Digital Experience Monitoring{{</ ui >}}] > [{{< ui >}}Product Analytics{{</ ui >}}] > [{{< ui >}}Users{{</ ui >}}] > [{{< ui >}}Segments{{</ ui >}}][1]]に移動し、[{{< ui >}}Create Segment{{< /ui >}}] をクリックします。
1. [{{< ui >}}New Segment{{< /ui >}}] をセグメント名に置き換えます。必要に応じて、[{{< ui >}}Add a description{{< /ui >}}] をクリックします。
1. [{{< ui >}}Show{{< /ui >}}] の横にあるトグルを使用して、セグメントに含めるプロファイルのタイプを選択します。
   - {{< ui >}}Users{{< /ui >}}: 個々のユーザーのセグメントを作成します。
   - {{< ui >}}Accounts{{< /ui >}}: アカウント (組織) のセグメントを作成します。[[Account segments](#segment-accounts)] のセクションを参照します。

   <div class="alert alert-info">セグメントは、ユーザープロファイルまたはアカウントプロファイルのいずれかを返します。両方を同時に返すことはできません。</div>

1. 1 つ以上のフィルターを追加します。
   - {{< ui >}}Add Property{{< /ui >}}: メールアドレス、最終アクセス日時、インポートしたカスタム属性などの属性に基づいて、ユーザーまたはアカウントを照合させます。「[プロパティとイベントによるフィルタリング](#segment-pana)」のセクションを参照してください。
   - {{< ui >}}Add Event{{< /ui >}}: 選択したタイムフレーム内でのユーザーまたはアカウントの行動に基づいて照合します。単一のイベントを使用するか、ユーザーがコンバージョンに至った、または離脱したマルチステップのファネルを使用します。「[プロパティとイベントによるフィルタリング](#segment-pana)」を参照してください。
   - {{< ui >}}Import CSV{{< /ui >}}: 含める、または除外する ID の CSV ファイルをアップロードして、既存のリストと照合します。「[CSV ファイルのインポート](#segment-csv)」のセクションを参照してください。

   フィルターは AND で結合されます。代わりに、一致した項目を除外するには、フィルターの演算子を変更します (例: **did** から **did not**へ)。

   {{< img src="product_analytics/segmentation/segment_editor.png" alt="セグメント名フィールド、表示設定、プロパティ、イベント、CSV インポートを追加するボタンがある [Create Segment] ページ。" style="width:100%;">}}

1. [{{< ui >}}Save Segment{{< /ui >}}] をクリックします。

{{% collapse-content title="プロパティとイベントによるフィルタリング" level="h3" expanded=false id="segment-pana" %}}

プロパティフィルターとイベントフィルターを組み合わせて、対象とするユーザーに絞り込みます。

[- **Property filters**] は、国、プラン、サインアップ日などの属性 (インポートしたカスタム属性を含む) に基づいてユーザーを照合します。たとえば、`have the property plan is premium` などです。カスタム属性をインポートするには、[ユーザーとアカウントのプロファイル][3]を参照してください。
[- **Event filters**] は、選択した期間内のユーザーの行動に基づいて照合します。単一のイベントを使用するか、[{{< ui >}}Add step{{< /ui >}}] をクリックして、ユーザーがコンバージョンに至った、または離脱したマルチステップのファネルを作成します。たとえば、`did convert after Sign up → Start trial` などです。国やデバイスタイプなどの属性でイベントを絞り込むには、[{{< ui >}}Add filter{{< /ui >}}] をクリックします。

フィルターを追加すると、一致するユーザーが [{{< ui >}}Dynamic segment{{< /ui >}}] のプレビューで一覧表示されます。

たとえば、過去 3 か月間に [**In Stock**] ボタンをクリックしたブラジルのユーザーをセグメント化する場合は以下を行います。

1. [{{< ui >}}Add Event{{< /ui >}}] をクリックし、[`"In Stock" Clicked`] アクションを選択します。
1. タイムフレームを [{{< ui >}}Past 3 Months{{< /ui >}}] に設定します。
1. [{{< ui >}}Add filter{{< /ui >}}] をクリックし、[`Country is Brazil`] でフィルタリングします。

{{< img src="product_analytics/segmentation/pana_example_checkout_brazil.png" alt="過去 3 か月間に [In Stock] をクリックしたブラジルのユーザーのセグメントと、一致するユーザーのプレビュー。" style="width:100%;">}}

#### 例: 購入前に離脱したユーザーを見つける{#example-find-users-who-left-before-buying}

カートを表示したものの、チェックアウトしなかったモバイルユーザーを見つけるには、以下を行います。

1. [{{< ui >}}Add Event{{< /ui >}}] をクリックし、[`Cart`] ビューを選択します。
1. [{{< ui >}}Add step{{< /ui >}}] をクリックし、[{{< ui >}}then did not{{< /ui >}}] を選択して、`Checkout Button Clicked` アクションを選択します。
1. 期間を設定します ([**1 Day**] 以内、[{{< ui >}}Past 1 Day{{< /ui >}}] のいつでもなど)。
1. [{{< ui >}}Add Property{{< /ui >}}] をクリックし、[`Last Device Type is Mobile`] でフィルタリングします。

{{< img src="product_analytics/segmentation/user_profile_example_3.png" alt="Cart を表示してから 1 日以内にチェックアウトをクリックしなかったモバイルユーザーのセグメントと、一致するユーザーのプレビュー。" style="width:100%">}}

[[{{< ui >}}User Profiles{{< /ui >}}][2]] ページから開始することもできます。ユーザーをフィルタリングしてから、[{{< ui >}}Create Segment{{< /ui >}}] をクリックします。フィルターがすでに適用されている、セグメントエディタが開きます。

{{% /collapse-content %}}

{{% collapse-content title="CSV ファイルのインポート" level="h3" expanded=false id="segment-csv" %}}

アンケート、実験、または CRM からのユーザーリストがある場合は、それを CSV ファイルとしてアップロードし、セグメントに変換します。

独自のファイルからセグメントを作成するには、以下を行います。

1. [{{< ui >}}Import CSV{{< /ui >}}] をクリックし、CSV ファイルをアップロードします。
1. [{{< ui >}}column{{< /ui >}}] の横で、ユーザー ID またはメールアドレスが含まれているファイル内の列 ([`id`] など) を選択します。
1. [{{< ui >}}with{{< /ui >}}] の横で、照合する Product Analytics 属性 ([{{< ui >}}User Id (@usr.id){{< /ui >}}] など) を選択します。
1. 代わりに、ファイル内のユーザーを除外するには、[{{< ui >}}matching{{< /ui >}}] をクリックし、[{{< ui >}}not matching{{< /ui >}}] を選択してフィルターを除外条件に変更します。

ファイルには、Product Analytics の [`usr.id`] または [`usr.email`] 属性と照合するユーザー ID またはユーザーのメールアドレスの列が必要です。

{{< img src="product_analytics/segmentation/segment_link_csv_1.png" alt="segment-test-users.csv の列 id と User Id (@usr.id) を照合する CSV インポートフィルター。フィルターが強調表示されます。" style="width:100%">}}

{{% /collapse-content %}}

{{% collapse-content title="アカウントセグメント" level="h3" expanded=false id="segment-accounts" %}}

アカウントセグメントは、組織や企業などのアカウントを、その属性やユーザーが実行したイベントに基づいてグループ化します。これらを使用して、ARR が特定の金額を超えるアカウントや、特定の機能を導入したアカウントなどのグループを分析します。

アカウントセグメントを作成するには、以下を行います。

1. [{{< ui >}}Show{{< /ui >}}] の横にあるトグルを [{{< ui >}}Users{{< /ui >}}] から [{{< ui >}}Accounts{{< /ui >}}] に切り替えます。
1. 1 つ以上のフィルターを追加します。
   - {{< ui >}}Add Property{{< /ui >}}: ARR、開始日、アカウント ID、またはインポートされたアカウント属性などのアカウントプロパティでフィルタリングします。カスタム属性をインポートするには、[ユーザーとアカウントのプロファイル][3]を参照してください。
   - {{< ui >}}Add Event{{< /ui >}}: 少なくとも 1 人のユーザーが指定されたイベントを実行したアカウントを含めます。
   - {{< ui >}}Import CSV{{< /ui >}}: アカウント ID の列を含む CSV ファイルをアップロードします。ID は、Product Analytics のアカウント ID 属性にマッピングされます。
1. [{{< ui >}}Save Segment{{< /ui >}}] をクリックします。

{{% /collapse-content %}}

## Product Analytics でのセグメントの使用{#use-segments-across-product-analytics}

Pathways、Analytics Explorer、Funnels、Retention など、Product Analytics のすべてのビューをセグメントでフィルタリングできます。

ビューをセグメントでフィルタリングするには、以下を行います。
1.  [{{< ui >}}Add filter{{< /ui >}}] をクリックします。
2.  [{{< ui >}}Segments{{< /ui >}}] タブを選択し、セグメントを選択します。セグメントがリストにない場合は、[{{< ui >}}Create new segment{{< /ui >}}] をクリックします。

{{< img src="product_analytics/segmentation/segments_from_pana.png" alt="[Product Analytics] ページの [Add filter] メニューが開きます。[Segments] タブが強調表示され、選択可能な保存済みセグメントのリストが表示されます。" style="width:80%;">}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/segments
[2]: https://app.datadoghq.com/product-analytics/profiles
[3]: /ja/product_analytics/profiles