---
further_reading:
- link: /real_user_monitoring/explorer
  tag: ドキュメント
  text: RUM エクスプローラーについて
kind: documentation
title: RUM パフォーマンス概要ダッシュボード
---

## 概要

パフォーマンスの概要ダッシュボードで、RUM アプリケーションの全体像を把握できます。以下が表示されます。

- **パフォーマンスメトリクス**:
    すべてのビューで、Loading Time、First Contentful Paint、DOM Content Loaded、Load Event の 4 つのブラウザメトリクスが強調表示されます。これらのメトリクスのそれぞれについて、中央値、75 パーセンタイル、90 パーセンタイルがウィジェットで表示されます。
- **傾向**:
    ページビューの動き、バックエンドの呼び出し失敗に関連するフロントエンドエラー、JS エラー、長いタスクを視覚化します。
- **ページビューの詳細**:
    各セグメントに関連するロード時間とトラフィックの性質を分析します。

{{< img src="real_user_monitoring/dashboards/performance_overview.png" alt="すぐに使える RUM パフォーマンス概要ダッシュボード" style="width:100%" >}}

表示されるデータの詳細については、[RUM ブラウザデータ収集][1]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/data_collected/