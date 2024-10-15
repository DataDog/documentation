---
description: Synthetic の一般的なメトリクスをモニターで使用する方法について説明します。
further_reading:
- link: /monitors/types/metric/
  tag: ドキュメント
  text: メトリクスモニターについて
- link: /monitors/manage/
  tag: ドキュメント
  text: モニターの管理方法について
- link: /synthetics/metrics/
  tag: ドキュメント
  text: Synthetic モニタリングメトリクスについて
title: 推定使用量メトリクスを使用する
---

## 概要

Synthetic テストから生成された[メトリクス][1]を使って、[テストで作成した Synthetic モニター][3]に加えて、[メトリクスモニター][2]を作成することが可能です。

{{< img src="synthetics/guide/using-synthetic-metrics/metric-monitor.png" alt="CI で失敗するテストが多すぎる場合にアラートを出すメトリクスモニターの例" style="width:95%;" >}}

メトリクスモニターを使用すると、以下のことが実現できます。

- トータルレスポンスタイムの監視
- DNS、DNS 解決、TCP 接続など、特定の HTTP タイミングでのスコープ
- Synthetic テストから得られるメトリクスに追加されたタグへのアクセス

このガイドでは、`synthetics.test_runs` のような一般的なメトリクスを使って、メトリクスモニターをセットアップする方法を説明します。

## メトリクスモニターの作成


{{< img src="synthetics/guide/using-synthetic-metrics/metric-monitor-setup.png" alt="CI で失敗するテストが多すぎる場合にアラートを出すメトリクスモニターの例" style="width:95%;" >}}

1. メトリクスモニターを作成するには、[Monitors > New Monitor][4] に移動し、**Metric** をクリックします。

2. モニターのアラート条件をカスタマイズするために、検出方法を選択します。この例では、しきい値アラートのメトリクスモニターを作成します。

   しきい値アラート
   : メトリクスがしきい値を超えるとアラートがトリガーされます。

   変更アラート
   : 値間のデルタがしきい値より大きい場合、アラートがトリガーされます。

   異常検知
   : メトリクスが予想されるパターンから逸脱するとアラートがトリガーされます。

   外れ値アラート
   : グループ内のあるメンバーが他のメンバーと異なる振る舞いをしたときにアラートがトリガーされます。

   予測アラート
   : あるメトリクスが将来しきい値を超えると予測される場合にアラートがトリガーされます。

3. **Define the metric** セクションでは、Synthetic Monitoring のメトリクスとして `synthetics.test_runs` など、ステータス、レスポンスコード、再試行動作にフィルターをかけることができるものを入力します。

4. アラート条件を設定し、通知メッセージを追加します。

5. 編集権限を設定し、**Create** をクリックします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/metrics/
[2]: /ja/monitors/types/metric/
[3]: /ja/synthetics/guide/synthetic-test-monitors/
[4]: https://app.datadoghq.com/monitors/create/metric