---
title: 外れ値モニター
kind: documentation
aliases:
  - /ja/guides/outliers
description: グループ内の他のメンバーと挙動が異なるメンバーについてアラートする
further_reading:
  - link: monitors/notifications
    tag: Documentation
    text: モニター通知の設定
  - link: monitors/downtimes
    tag: Documentation
    text: モニターをミュートするダウンタイムのスケジュール
  - link: monitors/monitor_status
    tag: Documentation
    text: モニターステータスの参照
---
外れ値検知は、グループの他のメンバーと比較して挙動が異なるメンバーを検出するためのアルゴリズム機能です。たとえば、プール内の 1 台の Web サーバーが異常な数のリクエストを処理している場合、その置き換えの必要があることを検出できます。また、1 つの AWS アベイラビリティーゾーン (AZ) で、他の AZ に比べて大幅に多い 500 エラーが発生しているという警告を早期に受け取ることで、その AZ で問題が起こりつつある可能性を察知できます。

{{< img src="monitors/monitor_types/outliers/outliers-metric-alert.png" alt="outliers metric alert" responsive="true" style="width:80%;">}}

## データの外れ値検知の使用方法

`outliers` クエリ関数は、クエリに適用されると、通常の結果に加えて、外れ値系列をマークして返します。

この関数を使用して、データ内の外れ値を表示したり、外れ値についてアラートすることができます。これを使用するにはまず、あるメトリクスについて均質な挙動を示すことが期待されるホストグループ (またはアベイラビリティーゾーン、パーティションなど) が必要です。また、この関数が機能するには、そのグループ内に 3 つ以上のメンバーが必要です。以上を前提として、そのグループに対して外れ値検知を使用する 2 つの方法を説明します。

### ダッシュボードまたはスクリーンボードでの外れ値の表示

次のグラフは、ホストごとの Gunicorn リクエスト数で、外れ値検知が有効になっています。

{{< img src="monitors/monitor_types/outliers/outliers-graph-dbscan-gunicorn.png" alt="outliers graph dbscan Gunicorn" responsive="true" style="width:80%;">}}

系列の 1 つが外れ値であることを確認できます。この系列は、このタイムウィンドウで、他の系列と比べてかなり低いトラフィック処理を示しています。

データの外れ値検知グラフを設定するには、グラフにメトリクスを追加して、グループ内のすべての系列を表示します。次に、`outliers` 関数を追加して、データに外れ値検知アルゴリズムを適用します。関数が適用されると、外れ値の系列は、暖色系のカラーパレットを使用して色分けされ太線で示されます。一方、他のすべての系列は、グレースケールのカラーパレットを使用して色分けされ細線で示されます。

最初に、選択したメトリクスを使用して、ダッシュボード上に新しい時系列グラフを作成します。

{{< img src="monitors/monitor_types/outliers/outliers-dash-choose-metrics-updated.png" alt="outliers dash choose metrics updated" responsive="true" style="width:80%;">}}

外れ値検知を有効にするには、メトリクスの行の右側にある `+` アイコンをクリックします。関数カテゴリから **Algorithms** を選択し、4 種類の外れ値アルゴリズムのいずれかを選択します。

{{< img src="monitors/monitor_types/outliers/outliers-algorithm-selector.png" alt="outliers algorithm selector" responsive="true" style="width:80%;">}}

これにより、outliers 関数がグラフに適用され、グループ内の外れ値が暖色の太線でハイライトされます。

{{< img src="monitors/monitor_types/outliers/outliers-algorithm-annotated-newer.png" alt="outliers algorithm annotated newer" responsive="true" style="width:80%;">}}

外れ値検知アルゴリズムは、複数の選択肢から選択できます。多くのシナリオでは、デフォルトのアルゴリズム (DBSCAN) とパラメーター値が機能します。ただし、特定される外れ値が多すぎたり少なすぎる場合は、アルゴリズムを調整するか、別のアルゴリズムを試すことができます。詳細については、後述の「外れ値のアルゴリズムとパラメーター」セクションを参照してください。

### 外れ値アラート

重要なグループで外れ値が検出されたときにアラートするモニターを定義することもできます。

{{< img src="monitors/monitor_types/outliers/outliers-alert-snapshot.png" alt="outliers alert snapshot" responsive="true" style="width:80%;">}}

たとえば、グループ内の 1 つの Cassandra ホストに他のホストと比べて異常に負荷がかかっている場合にアラートするには、このメトリクスの[新しい外れ値モニターを追加][1]します。

[New Monitor][2] ページに移動し、**Outlier** をクリックします。次に、他のモニターの場合と同様に、**Define the metric** セクションに入力します。

{{< img src="monitors/monitor_types/outliers/outliers-new-monitor-define-metric.png" alt="outliers new monitor define metric" responsive="true" style="width:80%;">}}

[アラート条件][3]として、グループ化とタイムフレームを選択します。次に、外れ値検知に使用するアルゴリズムとパラメーター値を選択します。

{{< img src="monitors/monitor_types/outliers/outliers-newer-monitor-set-conditions.png" alt="outliers newer monitor set condition" responsive="true" style="width:80%;">}}

アラートが適切に調整されているかを確認するには、画面上部にあるタイムウィンドウを設定し、巻き戻し (&lt;&lt;) ボタンを使用して、外れ値が見つかってアラートが生成されると思われる時間まで遡ります。これは、使用している外れ値アルゴリズムのパラメーターを調整する方法としても適しています。

{{< img src="monitors/monitor_types/outliers/outliers-new-monitor-graph-calibrate.png" alt="outliers new monitor graph calibrate" responsive="true" style="width:80%;">}}

## 参考: 外れ値のアルゴリズムとパラメーター

データに対して使用できる外れ値検知アルゴリズムには、DBSCAN/ScaledDBSCAN と MAD/ScaledMAD の 2 種類があります。まずは、デフォルトのアルゴリズムである DBSCAN を使用してみることをお勧めします。正しい外れ値を検出できない場合は、DBSCAN のパラメーターを調整するか、もう 1 つのアルゴリズム MAD を試してください。十分に集まっているように見える比較的大スケールのメトリクスの一部を DBSCAN/MAD アルゴリズムが外れ値と識別している場合は、スケール調整アルゴリズムを試してください。詳細については、[外れ値検知に関するブログ記事][4]を参照してください。

### DBSCAN

[DBSCAN][5] (ノイズを伴うアプリケーションの密度ベースの空間クラスタリング) は、よく使用されるクラスタリングアルゴリズムです。標準の DBSCAN は、1) 2 つのポイントの距離が近いと判断する基準となる距離しきい値を指定するパラメーター ?? と、2) あるポイントの半径 ?? 内に最小いくつのポイントがあれば、そのポイントを高密度領域の開始点と見なせるか、という 2 つのパラメーターを使用します。

Datadog では、時系列上の外れ値を検出するために、簡略化した形式の DBSCAN を使用しています。それぞれのホストは d 次元内のポイントと見なされます。ここで、d は時系列内の要素の数です。どのポイントも高密度領域を形成できますが、最大のクラスターに属していないポイントは外れ値と見なされます。距離しきい値の初期値は、各時点での既存の時系列の値の中央値から新しい中央値時系列を作成することで設定されます。そして、この中央値系列と各ホストとのユークリッド距離が計算されます。しきい値は、この距離の中央値を正規化定数で乗じた値として設定されます。

この DBSCAN の実装では、`tolerance` というパラメーターを使用します。この定数で初期しきい値を乗じて、DBSCAN の距離パラメーター 𝜀 が算出されます。

{{< img src="monitors/monitor_types/outliers/outliers-dbscan-config.png" alt="outliers dbscan configuration" responsive="true" style="width:80%;">}}

次の例では、Cassandra ワーカーのプールに対して tolerance 値 3.0 の DBSCAN を使用しています。

{{< img src="monitors/monitor_types/outliers/outliers-dbscan-cassandra.png" alt="outliers dbscan cassandra" responsive="true" style="width:80%;">}}

tolerance パラメーターは、ホストにどの程度類似の挙動を期待するかに応じて設定します。大きな値を設定すると、ホストが他のホストから外れて挙動し得る許容度が大きくなります。

### MAD

[MAD][6] (中央絶対偏差) は、ばらつきのロバストな測定方法であり、ロバストな標準偏差と見なすこともできます。ロバスト統計では、データが外れ値によって過度に影響を受けないような手法でデータを記述します。

外れ値モニターで MAD を使用するには、次の 2 つのパラメーターを設定します。

- `tolerance`: あのポイントが中央値からどの程度の「偏差」分離れていたら外れ値と見なすかを指定します。
- `pct`: 特定の系列のポイントのうち、この割合を超えるポイントが外れ値と判断されると、その系列全体が外れ値としてマークされます。

{{< img src="monitors/monitor_types/outliers/outliers-mad-config.png" alt="outliers mad configuration" responsive="true" style="width:80%;">}}

次の例では、アベイラビリティーゾーンごとの平均システム負荷を比較する際に、tolerance 値 3、pct 値 20 の MAD を使用しています。

{{< img src="monitors/monitor_types/outliers/outliers-mad-az.png" alt="outliers mad az" responsive="true" style="width:80%;">}}

tolerance パラメーターは、予想されるデータのばらつきに応じて調整する必要があります。たとえば、通常のデータ値が狭い範囲に収まる場合は、この値を小さくする必要があります。一方、ポイントのばらつきが大きい場合は、この値を大きくして、ばらつきによる誤検出を引き起こさないようにする必要があります。

### DBSCAN か MAD か

それでは、どちらのアルゴリズムを使用すべきでしょうか。ほとんどの外れ値には、どちらのアルゴリズムもデフォルトの設定でよく機能します。しかし、一方のアルゴリズムの方がより適している微妙なケースもあります。

以下の図では、複数のホストが一斉にバッファをフラッシュしていますが、1 つのホストが少し遅れてバッファをフラッシュしています。DBSCAN はこのホストを外れ値として検出しますが、MAD は検出しません。バッファがフラッシュされるタイミングを気にする必要はないため、このようなケースでは MAD の使用が適しています。

このグループの同時性は、単にそれらのホストが同時に再起動されたという人為的な理由に過ぎません。一方、もし下のメトリクスがバッファのフラッシュではなくスケジューリングされたジョブを表し、グループ内のホスト全体で実際に同時に発生する必要がある場合は、DBSCAN の使用が適しています。

{{< img src="monitors/monitor_types/outliers/outliers-flushing.png" alt="outliers flushing" responsive="true" style="width:80%;">}}

#### スケール調整アルゴリズムか標準アルゴリズムか

DBSCAN と MAD には、それぞれ ScaledDBSCAN、ScaledMAD と呼ばれるスケール調整バージョンがあります。多くの場合、スケール調整アルゴリズムの動作は標準アルゴリズムと同じです。ただし、十分に集まっているメトリクスに対して DBSCAN/MAD アルゴリズムが外れ値を検出している場合に、メトリクスの全体的な大きさに合わせて外れ値検知アルゴリズムを調整するには、スケール調整アルゴリズムを試してください。

次のグラフは、Elasticsearch ノードグループのフィールドデータサイズに対して、tolerance 値 3 の DBSCAN と ScaledDBSCAN の結果を比較した例です。

{{< img src="monitors/monitor_types/outliers/outliers-scaled-dbscan-es.png" alt="outliers scaled dbscan es" responsive="true" style="width:80%;">}}

次のグラフは、複数の Cassandra ホストの使用可能メモリ量を比較するために、MAD アルゴリズムと ScaledMAD アルゴリズムを使用した例です。どちらも、tolerances 値 3 と pct 値 20 を使用しています。

{{< img src="monitors/monitor_types/outliers/outliers-scaled-mad-cassandra.png" alt="outliers scaled mad Cassandra" responsive="true" style="width:80%;">}}

### アラートのセットアップ

外れ値アラートを設定する際の重要なパラメーターとして、タイムウィンドウのサイズがあります。ウィンドウのサイズが大きすぎると、異常な挙動が予想するより長く続かないと、外れ値が検出されない可能性があります。逆に、ウィンドウのサイズが小さすぎると、単発スパイクのような重要でない挙動に対するアラートの回復性が失われます。

どちらのアルゴリズムも、同じような挙動を示す大多数のメトリクスとは異なる外れ値を特定するために設定されます。ホストが以下に示すような「帯状」の挙動 (それぞれの帯が 1 つのシャードを表すような) を示す場合は、各帯を識別するタグを付け、帯ごとに外れ値検知アラートを設定することをお勧めします。

{{< img src="monitors/monitor_types/outliers/outliers-banding.png" alt="outliers banding" responsive="true" style="width:80%;">}}

## その他の参考資料 
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#create/outlier
[2]: https://app.datadoghq.com/monitors#/create
[3]: /ja/monitors/monitor_types/#define-the-conditions
[4]: https://www.datadoghq.com/blog/outlier-detection-algorithms-at-datadog
[5]: https://en.wikipedia.org/wiki/DBSCAN
[6]: https://en.wikipedia.org/wiki/Median_absolute_deviation