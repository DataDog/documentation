---
title: RUM リソースダッシュボード
kind: documentation
further_reading:
  - link: /real_user_monitoring/explorer
    tag: ドキュメント
    text: Datadog でビューを検索する
---
リソースダッシュボードから、アプリケーションのリソースに関するインサイトを入手できます。ダッシュボードは4つのセクションに分かれています。

- **Resources overview**:
    最もロードされているリソースとその関連ステータスコード、そしてリソースタイプ別に分割されたサイズを視覚的に表示します。
- **First party resources**:
    ファーストパーティのリソースに関するインサイトを表示します。リソースのカテゴリーに関する詳細は、[リソースドキュメント][1]を参照してください。
- **Third party resources**:
    サードパーティのリソースに関するインサイトを表示します。リソースのカテゴリーに関する詳細は、[リソースドキュメント][1]を参照してください。
- **Resource load timings**:
    ブラウザ API から収集した[リソースのタイミング][2]傾向を監視します。

{{< img src="real_user_monitoring/dashboards/resources_dashboard.png" alt="リソースダッシュボード" >}}

表示される情報に関する詳細は、[RUM データ収集のドキュメント][3]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/data_collected/resource/
[2]: https://www.w3.org/TR/resource-timing-1/
[3]: /ja/real_user_monitoring/data_collected/