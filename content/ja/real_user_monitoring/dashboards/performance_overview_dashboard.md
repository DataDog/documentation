---
title: RUM パフォーマンス概要ダッシュボード
kind: documentation
further_reading:
  - link: /real_user_monitoring/explorer
    tag: ドキュメント
    text: Datadog でビューを検索する
---
パフォーマンスの概要ダッシュボードで、RUM アプリケーションの全体像を把握できます。ダッシュボードは 3 つのセクションに分かれています。

- **パフォーマンスメトリクス**:
    すべてのビューで、Loading Time、First Contentful Paint、DOM Content Loaded、Load Event の 4 つのブラウザメトリクスが強調表示されます。これらのメトリクスのそれぞれについて、中央値、75 パーセンタイル、90 パーセンタイルがウィジェットで表示されます。
- **傾向**:
    ページビューの動き、バックエンドの呼び出し失敗に関連するフロントエンドエラー、JS エラー、長いタスクを視覚化します。
- **ページビューの詳細**:
    各セグメントに関連するロード時間とトラフィックの性質を分析します。

{{< img src="real_user_monitoring/dashboards/performance_overview.png" alt="パフォーマンス概要ダッシュボード" >}}

表示される情報に関する詳細は、[RUM データ収集のドキュメント][1]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/data_collected/