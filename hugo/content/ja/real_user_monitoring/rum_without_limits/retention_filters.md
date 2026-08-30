---
description: RUM without Limits における保持フィルターの仕組みについて紹介します。
further_reading:
- link: /real_user_monitoring/guide/retention_filter_best_practices/
  tag: ガイド
  text: 保持フィルターのベストプラクティス
- link: /real_user_monitoring/rum_without_limits/
  tag: ドキュメント
  text: RUM without Limits
- link: /real_user_monitoring/rum_without_limits/metrics
  tag: ドキュメント
  text: メトリクスによるパフォーマンス分析
- link: /real_user_monitoring/rum_without_limits/retention_quotas
  tag: ドキュメント
  text: 保持クオータによるコスト管理
- link: https://www.datadoghq.com/blog/rum-apm-retention-filters
  tag: ブログ
  text: 保持フィルターを使用したフロントエンドデータ/バックエンドデータの統合および関連付け
- link: https://learn.datadoghq.com/courses/rum-retention-filters
  tag: Learning Center
  text: 'Interactive Lab: RUM 保持フィルター'
title: 保持フィルターによるデータの保持
---
{{< learning-center-callout header="Learning Center で RUM 保持フィルターを使ってみる" btn_title="今すぐ登録する" btn_url="https://learn.datadoghq.com/courses/rum-retention-filters" hide_image="false" >}}
  RUM 保持フィルターを使用して、保存するセッションデータを制御し、Observability 予算を最適化する方法を紹介します。
{{< /learning-center-callout >}}

## 概要 {#overview}

保持フィルターは、RUM セッションエクスプローラーで使用されるものと同様のクエリセットで構成されており、RUM イベント (セッション、ビュー、アクション、リソースなど) が取り込まれる際に実行されます。これらのフィルターによって、セッションを 30 日間の RUM 標準保持期間で保存するか、破棄するかが決定されます。

**保持率**は、保持対象とする照合セッションの割合を指定するもので、これによりコスト管理が強化されます。フィルターは個々のイベントに対して照合されますが、サンプリングの判断が行われると、基盤となるセッションに属するすべてのイベントが保持されるため、ユーザーセッションのエンドツーエンドの可視性が確保されます。

## 仕組み{#how-it-works}

セッションは、定義済みのクエリに基づいて構成イベントのいずれかに保持フィルターが一致するとすぐに保存され、設定された保持率に基づいてサンプリング対象に取り込まれます。

{{< img src="real_user_monitoring/rum_without_limits/rum-without-limits-how-retention-filters-work-2.png" alt="保持フィルターの論理フローと、それらが最終的に保持されるセッション数にどのように影響するかを示す図。" style="width:80%" >}}

保持フィルターの論理フローは次のとおりです。

- すべての RUM イベントは、最初に受信したものから順に、各フィルターに照合して評価されます。
- イベントが`A`フィルターに一致すると、保持率に基づいて、セッション全体をサンプリング対象として取り込むか、後続イベントが評価されるのを待つかが判断されます。いずれの場合も、それ以降、イベント`A`は後続の保持フィルターに対して評価されません。これが、**保持フィルターの順序が重要**である理由です。
- 保持されたセッションは保存され、セッションエクスプローラーやその他の RUM ページからアクセスできます。このセッションから受信する新しいイベントは、保持フィルターのリストで評価されることなく、完全な可視性を確保するために自動的に保持されます。

**注**:

- イベントがどのフィルターにも一致しない場合、またはフィルターに一致しても設定された保持率に基づいてセッションを保持しない判断が下された場合、同じセッションからの後続イベントが引き続き評価されます。その結果、セッションが最終的に保持される場合があります。
- 時間の経過とともに更新されるイベント属性に対してフィルターを定義する場合は、注意が必要です。たとえば、エラー数が 2 未満のセッションを保持するフィルターは、エラー数がリアルタイムで更新され、すべてのセッションがゼロから始まるため、誤ってセッションを保持してしまう可能性があります。`@session.error.count >= 2` のような値が変化するフィールドには「以上」(≥) 条件を使用するか、`@session.is_active: false` または `@view.is_active: false` を追加して、変更可能な Session オブジェクトや View オブジェクトが保持フィルターで評価される前に確実に完了した状態になるようにしてください。
- 当社の SDK は、イベントを Datadog に送信する前にバッチ処理および圧縮します。アップロードに失敗した場合、イベントはデバイス上のキューの末尾に再配置されます。そのため、イベント `B` がイベント `A` よりも先に評価される可能性がありますが、ギャップを防ぐために、すべてのイベントは最終的に保持フィルターのリストへ照合して評価されます。

## リプレイにおける保持フィルターの動作{#how-retention-filters-work-with-replays}

保持フィルターを使用して、リプレイのセッションサンプリングを管理できます。リプレイを含むセッションが課金対象となる場合、セッションイベントとビデオ録画の両方が保持され、課金されます。つまり、SDK からセッションの 100% とリプレイの 100% を収集している場合、保持フィルターがセッションを保持するたびに、Datadog はセッションとリプレイの両方を保持し、課金します。

**注**: Datadog のモバイル SDK も、(一律のサンプルレートに依存するのではなく) 条件付きで録画を開始・停止するための API を提供していますが、デフォルトで保持されるのは Browser SDK によって強制的に録画されたリプレイのみです。

## 永続的保持フィルター{#permanent-retention-filters}

永続的保持フィルターは、変更、無効化、削除できない定義済みの保持フィルターです。これらは保持フィルターリストの最上部に配置されます。

{{< img src="real_user_monitoring/rum_without_limits/permanent-retention-filters.png" alt="保持フィルターリストの最上部に表示される 3 つの永続的保持フィルター。" style="width:100%" >}}

次の 3 種類の永続的保持フィルターがあります。

- {{< ui >}}RUM-APM Flat Sampling{{< /ui >}}: 取り込まれた分散トレースを持つセッションの 1% を保持します (さらに、そのトレースを APM 上でインデックス化します)。これらのセッション (およびそのトレース) は、**RUM 課金 (または APM 課金) の対象外**となります。
- {{< ui >}}Synthetics Sessions{{< /ui >}}: [Synthetic Monitoring][1] によって生成されたすべてのセッションを保持します。これらのセッションは Synthetic Monitoring の下で課金され、**RUM 課金の対象外**となります。
- {{< ui >}}Sessions with forced replays{{< /ui >}}: [強制収集][2] メカニズムを通じてリプレイが強制的に収集されたすべてのセッションを保持します。

<div class="alert alert-info">RUM-APM 一律サンプリングの永続的保持フィルターは、以下の SDK でのみ適用されます。<br> - Browser 6.5.0+ <br> - Android 3.0.0+ <br> - iOS 3.3.0+ <br> - React Native 3.0.0+ <br> - Flutter 3.0.0+ <br></div>

## 保持フィルターの作成{#creating-a-retention-filter}

保持フィルターの作成手順を以下に示します。

1. [{{< ui >}}Digital Experience{{< /ui >}}] > [{{< ui >}}Manage Applications{{< /ui >}}][3] と移動します。
1. RUM アプリケーションを作成するか、既存のアプリケーションをクリックします。
1. [Product Settings] の下にある{{< ui >}}Retention Filters{{< /ui >}}ページに移動します。
1. {{< ui >}}+ Add Retention Filter{{< /ui >}} ボタンをクリックします。
1. 保持フィルターにわかりやすい名前を付けます。
1. ドロップダウンからイベントタイプを選択し、クエリを入力します。[RUM エクスプローラー][4] で記述できるクエリであれば、保持フィルターでも使用できます。
1. オプションで、保持クエリに一致するセッションに対して保持率を設定します。[{{< ui >}}Generate Estimate{{< /ui >}}] をクリックすると、この保持率の設定に関するガイドが表示されます。

新しいフィルターが、保持フィルターリストの一番下に追加されます。Datadog が新しいフィルターを反映し、サンプリングの決定を開始するまで数秒かかります。

## フィルターの変更 {#modifying-filters}

{{< img src="real_user_monitoring/rum_without_limits/modifying-filters.png" alt="保持フィルターにカーソルを合わせると、変更できます。" style="width:100%" >}}

### フィルターの編集 {#edit-a-filter}

既存のフィルターを変更する手順:

1. フィルターにカーソルを合わせ、[{{< ui >}}Edit{{< /ui >}}] アイコンをクリックします。
1. [{{< ui >}}Save Changes{{< /ui >}}] をクリックします。

### 保持フィルターの複製{#duplicate-a-filter}

保持フィルターを複製する手順は、次のとおりです。

1. フィルターにカーソルを合わせ、[{{< ui >}}Duplicate{{< /ui >}}] アイコンをクリックします。
1. 保持フィルターに任意の変更を加え、[{{< ui >}}Save Changes{{< /ui >}}] をクリックします。

### 保持フィルターの削除 {#delete-a-filter}

保持フィルターを削除する手順は、次のとおりです。

1. フィルターにカーソルを合わせ、[{{< ui >}}Delete{{< /ui >}}] アイコンをクリックします。
1. [{{< ui >}}Confirm{{< /ui >}}] をクリックします。

### フィルターの無効化{#disable-a-filter}

無効化された保持フィルターは単にイベントを無視するだけであり、サンプリングの判断は行いません。リストに流入するイベントは、無効化された保持フィルターをスキップします。

保持フィルターの右側にあるトグルを使用して、保持フィルターを無効/有効にします。

### 保持フィルターの並べ替え{#reorder-filters}

保持フィルターをドラッグアンドドロップして、新しい位置に並べ替えます。

## 保持フィルターを使用したセッションの除外{#excluding-sessions-using-retention-filters}

RUM without Limits では、除外するセッションではなく、保持するセッションを指定するために保持フィルターを使用します。保持率を 0% に設定することはできません (デフォルトは 1% です)。さらに、保持率を低く設定することは効果的な除外戦略ではありません。構成内の他のフィルターによってセッションが保持される可能性があるためです。

特定の環境、アプリケーションバージョン、デバイスタイプ、またはその他の条件のセッションが確実に保持されないようにするには、**すべての保持フィルターのクエリ内**に明示的に除外条件を追加してください。例:

- すべての保持フィルターに `-version:(1* OR 2*)` を追加すると、アプリケーションの旧バージョン 1 および 2 のイベントが確実に保持されなくなります。
- すべての保持フィルターに `-@device.type:Bot` を追加すると、検索エンジンのクローラーやその他の自己申告ボットが除外されます。
- すべての保持フィルターに `-@geo.country:"South Korea"` を追加すると、韓国からのすべてのセッションが除外されます。

たとえば、韓国から受信したセッションを除外しつつ、それ以外の全セッションを保持するには、クエリ `-@geo.country:"South Korea"` を使用して保持フィルターを作成し、保持率を 100% に設定します。

**注**: 特定のイベントが保持されるのを防ぐ方法はありません。否定クエリを使用する (たとえば、RUM エラーを対象とする保持フィルターに `-@error.message:"Script error."` を追加するなど) ことで、不要なイベントの量を最小限に抑えることはできますが、構成内の他の保持フィルターが、その除外しようとしたイベントを含むセッションを保持する肯定的判断を下す可能性があります。

## クオータによる保持量の上限設定{#capping-retention-with-quotas}

保持フィルター全体で 1 日あたりに保持されるセッションの合計数に上限を設ける方法については、[保持クオータによるコスト管理][9] を参照してください。

## クロスプロダクト保持フィルター{#cross-product-retention-filters}

クロスプロダクト保持フィルターを使用すると、様々な製品間の相関関係を最適化し、より豊富なテレメトリを保持できます。RUM 保持フィルターを構成する際に、APM トレース用のクロスプロダクト保持フィルターを有効にできます。

{{< img src="real_user_monitoring/rum_without_limits/cross-product-retention-filters-overview.png" alt="APM トレース用にクロスプロダクト保持フィルターが有効になっている RUM 保持フィルター。" style="width:100%" >}}

{{< ui >}}APM traces filter{{< /ui >}}は、親となる RUM 保持フィルターによって保持されたセッションのうち、トレースが利用可能なものを対象に、指定した割合で APM トレースをインデックス化します。

**注**: APM トレースの可用性は、お使いの**トレースサンプリング SDK の構成**に依存します (<a href="/real_user_monitoring/correlate_with_other_telemetry/apm?tab=browserrum">RUM と APM トレースの関連付け</a>の方法を参照してください)。

  <div class="alert alert-info">APM トレースフィルターは、以下のバージョンの SDK とのみ互換性があります。<br> - Browser 6.5.0+ <br> - Android 3.0.0+ <br> - iOS 3.3.0+ <br> - React Native 3.0.0+ <br> - Flutter 3.0.0+ <br></div>

<div class="alert alert-danger">クロスプロダクト保持フィルターを構成すると、APM インデックス化の量が増加する可能性があります。</div>

RUM エクスプローラーで、**インデックス化された APM トレースがあるセッションを検索する**には、`@session.has_indexed_apm_traces:true` をクエリします。

### 例{#example}

次のように構成された、単一の RUM 保持フィルターを設定する構成例について検討します。

{{< img src="real_user_monitoring/rum_without_limits/cross-product-retention-filters-apm-only.png" alt="エラーを対象に 60% の保持率で構成した RUM 保持フィルターと、APM トレース向けに 25% のクロスプロダクトフィルターを組み合わせた構成。" style="width:60%" >}}

SDK がトレースの 40% をサンプリングするように構成されている場合、結果は次のようになります。

- 取り込まれた RUM セッションのうち 40% は、対応するトレースが APM に取り込まれています。
- エラーを 1 件以上含む、取り込まれた RUM セッションの 60% が保持されます。
- これらの保持されたセッションのうち 10% (25% x 40%) は、対応する APM トレースがインデックス化されます。

<div class="alert alert-info">クロスプロダクト保持フィルターは、対応する RUM 保持フィルターによって保持されたセッションにのみ適用されます。つまり、RUM 保持フィルターとクロスプロダクトフィルターの両方において、フィルターの順序が重要になります。<br><br>

詳細については、「<a href="/real_user_monitoring/rum_without_limits/retention_filters/#how-it-works">仕組み</a>」を参照してください。</div>

### 永続フィルター上のクロスプロダクト保持フィルター {#cross-product-retention-filters-on-permanent-filters}

クロスプロダクト保持フィルターは、<a href="/real_user_monitoring/rum_without_limits/retention_filters/#permanent-retention-filters">永続保持フィルター</a>上でも利用可能です。APM トレースフィルターは、**Synthetic Monitoring セッションと、Forced Replay が適用されたセッションでのみ編集可能**です。

<div class="alert alert-danger">Synthetics または Forced Replay 永続保持フィルターに対して、クロスプロダクト保持フィルター経由でインデックス化された APM トレースは、APM の課金対象となります。</div>

## ベストプラクティス {#best-practices}

[保持フィルターのベストプラクティス][5] を参照してください。

## API {#api}

保持フィルターおよびクロスプロダクト保持フィルターは、[API][6] または Datadog 専用の [Terraform モジュール][7] 使用して管理できます。

## 次のステップ {#next-steps}

[メトリクス][8] を使用してパフォーマンスを分析します。

## 参考文献 {#further-reading}

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