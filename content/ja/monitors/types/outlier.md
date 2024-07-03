---
aliases:
- /ja/guides/outliers
- /ja/monitors/monitor_types/outlier
- /ja/monitors/create/types/outlier/
description: Alert on members of a group behaving differently than the others
further_reading:
- link: /monitors/notify/
  tag: Documentation
  text: Configure your monitor notifications
- link: /monitors/downtimes/
  tag: Documentation
  text: Schedule a downtime to mute a monitor
- link: /monitors/manage/status/
  tag: Documentation
  text: Consult your monitor status
- link: /watchdog/insights/
  tag: ドキュメント
  text: Outlier detection in Watchdog Insights
title: Outlier Monitor
---

## 概要

外れ値検出は、特定のグループがピアと比較して異なる動作をしていることを検出できるアルゴリズム機能です。たとえば、プール内の 1 つのウェブサーバーが異常な数のリクエストを処理していることや、1 つの AWS アベイラビリティーゾーンで他よりはるかに多くの 500 エラーが発生していることを検出できます。

{{< img src="monitors/monitor_types/outliers/outliers-metric-alert.png" alt="外れ値メトリクスアラート" style="width:80%;">}}

## モニターの作成

Datadog で[外れ値モニター][1]を作成するには、メインナビゲーションを使用して次のように移動します: *Monitors --> New Monitor --> Outlier*。

### メトリクスを定義する

現在 Datadog にレポートが送信されるメトリクスはすべて、モニターに使用できます。詳細については、[メトリクスモニター][2]ページをご確認ください。

外れ値モニターには、3 つ以上のメンバーを持つグループ（ホスト、アベイラビリティーゾーン、パーティションなど）を持つメトリクスが必要であり、これらのメンバーは均一な動作を示します。

### アラートの条件を設定する

* 各外れ値 `<GROUP>` に対して個別のアラートをトリガーします
* 過去 `5 minutes`、`15 minutes`、`1 hour` など、または `custom` に 1 分～24 時間の値を設定します。
* アルゴリズム `MAD`、`DBSCAN`、`scaledMAD`、または `scaledDBSCAN` を使用する
* 許容値: `0.33`、`1.0`、`3.0` など
* %: `10`、`20`、`30` など（`MAD` アルゴリズムのみ）

外れ値モニターをセットアップする場合、時間枠について考えることが大切です。時間枠が大きすぎる場合、アラートを受け取るタイミングが遅すぎる場合があります。逆に時間枠が短すぎる場合、アラートは 1 回限りのスパイクに対しても反応してしまうでしょう。

アラートが適切に調整されるようにするには、プレビューグラフで時間枠を設定し、逆 (<<) ボタンを使用して、アラートをトリガーしたはずの外れ値を時間で振り返ります。さらに、この機能を使用して、特定の外れ値アルゴリズムに合わせてパラメーターを調整できます。

{{< img src="monitors/monitor_types/outliers/outliers-new-monitor-graph-calibrate.png" alt="外れ値の新しいモニターグラフの調整" style="width:80%;">}}

#### アルゴリズム

Datadog は、`DBSCAN`/`scaledDBSCAN` と `MAD`/`scaledMAD` の 2 つのタイプの外れ値検出アルゴリズムを提供しています。デフォルトのアルゴリズムである DBSCAN を使用することをお勧めします。正しく外れ値を検出できない場合は、DBSCAN のパラメーターを調整するか、MAD アルゴリズムを試してください。スケーリングされたアルゴリズムは、メトリクスが大規模で密接にクラスター化されている場合に役立ちます。

{{< tabs >}}
{{% tab "DBSCAN" %}}

[DBSCAN][1]（ノイズを伴うアプリケーションの密度ベースの空間クラスタリング）は、一般的なクラスタリングアルゴリズムです。 従来、DBSCAN は次を取得します。

1. 2 つのポイントが近いと見なされる距離のしきい値を指定するパラメーター `ε`。
2. そのポイントが凝集を開始する前に、ポイントの `ε-radius` 内にある必要があるポイントの最小数。

Datadog では、時系列上の外れ値を検出するために、簡略化した形式の DBSCAN を使用しています。それぞれのグループは d 次元内のポイントと見なされます。ここで、d は時系列内の要素の数です。どのポイントも高密度領域を形成できますが、最大のクラスターに属していないポイントは外れ値と見なされます。距離しきい値の初期値は、各時点での既存の時系列の値の中央値から新しい中央値時系列を作成することで設定されます。そして、この中央値系列と各グループとのユークリッド距離が計算されます。しきい値は、この距離の中央値を正規化定数で乗じた値として設定されます。

**パラメーター**<br>
この DBSCAN の実装では、`tolerance` というパラメーターを使用します。この定数で初期しきい値を乗じて、DBSCAN の距離パラメーター ε が算出されます。tolerance パラメーターは、グループにどの程度類似の挙動を期待するかに応じて設定します。大きな値を設定すると、グループが他のグループから外れて挙動し得る許容度が大きくなります。

[1]: https://en.wikipedia.org/wiki/DBSCAN
{{% /tab %}}
{{% tab "MAD" %}}

[MAD][1] (中央絶対偏差) は、ばらつきのロバストな測定方法であり、ロバストな標準偏差と見なすこともできます。ロバスト統計では、外れ値によって影響を受けないような手法でデータを記述します。

**パラメーター**<br>
外れ値モニターで MAD を使用するには、パラメーター `tolerance` と `%` を構成します。

Tolerance specifies the number of deviations a point (independently of the groups) needs to be away from the median for it to be considered an outlier. This parameter should be tuned depending on the expected variability of the data. For example, if the data is generally within a small range of values, then this should be small. Otherwise, if points can vary greatly, then set a higher scale so the variabilities do not trigger false positives.

Percent refers to the percentage of points in the group considered as outliers. If this percentage is exceeded, the whole group is marked as an outlier.

[1]: https://en.wikipedia.org/wiki/Median_absolute_deviation
{{% /tab %}}
{{% tab "Scaled" %}}

DBSCAN と MAD には、スケール調整バージョンがあります（scaledDBSCAN と scaledMAD）。多くの場合、スケール調整アルゴリズムの動作は標準アルゴリズムと同じです。ただし、十分に集まっているメトリクスに対して DBSCAN/MAD アルゴリズムが外れ値を検出している場合に、メトリクスの全体的な大きさに合わせて外れ値検知アルゴリズムを調整するには、スケール調整アルゴリズムを試してください。

{{% /tab %}}
{{< /tabs >}}

##### DBSCAN か MAD か

それでは、どちらのアルゴリズムを使用すべきでしょうか。ほとんどの外れ値には、どちらのアルゴリズムもデフォルトの設定でよく機能します。しかし、一方のアルゴリズムの方がより適している微妙なケースもあります。

以下の図では、複数のホストが一斉にバッファをフラッシュしていますが、1 つのホストが少し遅れてバッファをフラッシュしています。DBSCAN はこのホストを外れ値として検出しますが、MAD は検出しません。このグループの同時性は、単にそれらのホストが同時に再起動されたという人為的な理由に過ぎないため、このようなケースでは MAD の使用が適しています。一方、もしメトリクスがバッファのフラッシュではなくスケジューリングされたジョブを表し、グループ内のホスト全体で実際に同時に発生する必要がある場合は、DBSCAN の使用が適しています。

{{< img src="monitors/monitor_types/outliers/outliers-flushing.png" alt="外れ値のフラッシュ" style="width:80%;">}}

### 高度なアラート条件

高度なアラートオプション (自動解決、新しいグループ遅延など) の詳細な手順については、[モニターコンフィギュレーション][3]ページを参照してください。

### 通知

For detailed instructions on the **Configure notifications and automations** section, see the [Notifications][4] page.

## API

プログラムで外れ値モニターを作成するには、[Datadog API リファレンス][5]を参照してください。Datadog は、[モニターの JSON をエクスポート][6]して API のクエリを作成することを推奨しています。

## トラブルシューティング

外れ値アルゴリズムは、ピアとは異なる動作をしているグループを識別するために設定されます。 以下に示すようにグループに「帯状」動作が見られる場合（帯ごとに異なるシャードを表す場合がある）、各帯に識別子をタグ付けし、各帯で外れ値検出アラートを個別に設定することをお勧めします。

{{< img src="monitors/monitor_types/outliers/outliers-banding.png" alt="外れ値の帯状" style="width:80%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#create/outlier
[2]: /ja/monitors/types/metric/#define-the-metric
[3]: /ja/monitors/configuration/#advanced-alert-conditions
[4]: /ja/monitors/notify/
[5]: /ja/api/v1/monitors/#create-a-monitor
[6]: /ja/monitors/manage/status/#settings