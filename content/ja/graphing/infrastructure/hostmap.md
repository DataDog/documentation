---
title: ホストマップの概要
kind: documentation
aliases:
  - /ja/infrastructure/hostmap/
  - /ja/guides/hostmap
further_reading:
  - link: graphing/infrastructure/livecontainers
    tag: グラフの作成方法
    text: 環境内のすべてのコンテナのリアルタイム表示
  - link: graphing/infrastructure/process
    tag: グラフの作成方法
    text: システムのあらゆるレベルの事象の把握
---
## 概要

ホストマップは、複数のホストを 1 画面にビジュアルに表示します。色と図形を使用してメトリクスをわかりやすく表現できます。  

## 使用方法

### フィルター基準

`Filter by` は、ホストマップをインフラストラクチャーのサブセットに制限します。左上にあるフィルター入力バーで、Datadog が提供する属性やタグに基づいてホストマップをフィルタリングできます。

フィルター入力バーが空の場合は、選択されたメトリクスを Datadog にレポートしているすべてのホストがマップに表示されます。

例: ホストが置かれている環境に基づいてホストにタグ付けする場合は、'production' でフィルタリングすることで、ステージングなどの他の環境内のホストをマップから除外できます。稼働中のホストを 1 つの役割以外すべて除外する場合は、その役割もフィルターに追加します。フィルターは `AND` で結合されます。

**注**: `tag:value` と `"tag:value"` のフィルタリングは異なります。`tag:value` のフィルタリングは厳密にそのタグとの一致を検索しますが、`"tag:value"` のフィルタリングはそのテキストを検索します。

### タグによるホストのグループ化

`Group hosts by tags` は、ホストをいくつかのクラスターに整理して空間的に配置します。各グループ内のすべてのホストは、グループ化に使用されるタグを共有します。

簡単な例として、ホストを AWS アベイラビリティーゾーンでグループ化するとします。2 つ目のグループ化タグ (たとえば、インスタンスタイプ) を追加すると、ホストはさらにいくつかのグループに再分割されます。つまり、以下に示すように、まずアベイラビリティーゾーンで分割され、次にインスタンスタイプで分割されます。

{{< img src="graphing/infrastructure/hostmap/hostmappart2image2.png" alt="Datadog Host Maps AZ Instance Groups"  >}}

**注**: Datadog のホストマップは `availability-zone` で自動的にグループ化されます。デフォルトのグループ化を変更したい場合は、Datadog のサポートチームまでお問合せください。

### タグ

[タグ][1]は、[Datadog インテグレーション][2]によって自動的に適用することも、手動で適用することもできます。タグを使用してホストをフィルタリングできます。

たとえば、一部のホストが AWS 上で動作している場合、以下の AWS 固有のタグをすぐに利用できます。

* availability-zone
* region
* image
* instance-type
* security-group
* 使用している EC2 タグ ('name' など)

### ズームイン

調査したいホストを特定したら、クリックすると詳細が表示されます。ホストにズームインし、そのホストからのメトリクスをレポートするインテグレーションが最大 6 つ表示されます。インテグレーションが 6 つより多い場合は、下のスクリーンショットのように、ホストの詳細ペインの「Apps」ヘッダーの下にリストされます。

インテグレーションの名前をクリックすると、そのインテグレーションのメトリクスがコンパクトなダッシュボードに表示されます。下のスクリーンショットでは「system」がクリックされ、CPU 使用率、メモリ使用量、ディスクのレイテンシーなどのシステムメトリクスが取得されています。

{{< img src="graphing/infrastructure/hostmap/blog-host-maps-01.png" alt="Datadog Host Maps Zoom In"  style="width:75%;" >}}

### 図形と色

デフォルトでは、各ホストの色は、そのホストの CPU 使用率を表すように設定されています。色は緑 (0% 使用中) から赤 (100% 使用中) の範囲です。`Color by` セレクターから、別のメトリクスを選択できます。

ホストマップでは、六角形のサイズで追加のオプションメトリクスを示すこともできます。その際、`Size by` セレクターを使用します。

下のスクリーンショットでは、六角形のサイズが 15 分間の平均負荷を示します。この値は、コア数が違ってもマシンの作業負荷を比較できるように正規化されています。

{{< img src="graphing/infrastructure/hostmap/hostmappart2image4.png" alt="Datadog Host Maps Using Color And Size"  style="width:80%;">}}

**注**: 「% CPU utilized」メトリクスは、Datadog Agent からレポートされているか、AWS または vSphere から直接レポートされているかにかかわらず、最も信頼性が高い最新の CPU 使用率の計測値を使用します。

### Agent がインストールされていないホストのホストマップ表示

デフォルトでは、選択されたメトリクスをレポートしているホストだけがホストマップに表示されます。これを使用して、グリッド内の個別の六角形の色またはサイズを設定できます。

選択されたメトリクスをレポートしていないホストをホストマップに表示することもできます。それには、マップの右上にある歯車アイコンを選択し、Host Map 設定の「Show hosts with no metrics」を有効にします。

{{< img src="graphing/infrastructure/hostmap/host_no_metrics.png" alt="host No Agent"  style="width:50%;">}}

### データの鮮度と意味

ホストマップのデータは、マップを継続的に操作していない限り、約 1 分に 1 回の割合でリフレッシュされます。画面の右下に、データが最後に更新された日時が表示されます。

## ユースケース

### リソースの最適化

通常、AWS ユーザーはさまざまなインスタンスタイプを使用しています。メモリが最適化されたインスタンスもあれば、計算用に最適化されたインスタンスもあります。小さなインスタンスもあれば、大きなインスタンスもあります。
AWS の費用を削減したいのであれば、高価なインスタンスが何に使用されているのかを明らかにすることから始めます。まず `instance-type` でグループ化し、次に `role` や `name` でグループ化します。**c3.8xlarge** などの高価なインスタンスタイプに注目します。CPU が十分に活用されていないホスト役割はありませんか。もしあれば、各ホストにズームインして、この数か月間にそのコンピューティング能力が必要であったかどうか、そのホストグループを安価なインスタンスタイプに移行すべきかどうかを確認します。

以下は、Datadog のインフラストラクチャーの一部です。**c3.2xlarge** インスタンスに大きな負荷がかかっていることがわかります。

{{< img src="graphing/infrastructure/hostmap/hostmappart1image2.png" alt="host map part 1"  style="width:80%;">}}

以下に示すように、この c3.2xlarge グループをクリックして役割でサブグループ化すると、一部の役割にのみ負荷がかかり、他の役割はほぼアイドル状態であることがわかります。この 7 つの緑色のノードを c3.xlarge にダウングレードすれば、年間 $13,000 ドル近くの節約になります。(ホスト 1 台につき 1 時間で $0.21 の節約 x 24 時間/日 * 365 日/年 * 7 ホスト = $12,877.20 / 年)

{{< img src="graphing/infrastructure/hostmap/hostmappart1image3.png" alt="Datadog Host Maps Instance-Role Groups"  style="width:80%;">}}

### アベイラビリティーゾーンの配置

ホストマップを使用すると、各アベイラビリティーゾーン (AZ) 内のマシンの分布を表示できます。目的のホストをフィルタリングし、AZ ごとにグループ化すると、リソースの再バランスが必要かどうかがすぐにわかります。

以下の例では、`role:daniels` を持つホストがいくつかのアベイラビリティーゾーンに不均等に分布しています。(Daniels は内部アプリケーションの名前です。)

{{< img src="graphing/infrastructure/hostmap/hostmappart1image4.png" alt="Datadog Host Maps AZ Balance"  style="width:80%;" >}}

### 問題の調査

稼働中に何らかの問題が発生したとします。一部のホストで CPU がペギングされ、応答時間が長くなることもあります。ホストマップは、負荷がかかっているホストとかかっていないホストの違いを迅速に把握するのに役立ちます。調査したいディメンションに基づいてすばやくグループ化を行い、問題のあるサーバーがどのグループに属しているかを視覚的に判断できます。
たとえば、アベイラビリティーゾーン、リージョン、インスタンスタイプ、イメージ、またはシステムで使用しているタグでグループ化を行うことができます。

以下は、最近 Datadog で発生した問題のスクリーンショットです。一部のホストでは、同じクラスターに属しているにもかかわらず、他のホストより使用可能なメモリが少なくなっています。マシンイメージごとにグループ化することで、使用されているイメージが 2 種類あり、その 1 つが過負荷であることがわかりました。

{{< img src="graphing/infrastructure/hostmap/hostmappart1image5.png" alt="Datadog Host Maps Two Memory Usage Bands"  style="width:80%;" >}}

{{< img src="graphing/infrastructure/hostmap/hostmappart1image6.png" alt="Datadog Host Maps Two Image Groups"  style="width:80%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tagging
[2]: /ja/integrations