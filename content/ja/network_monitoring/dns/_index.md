---
title: DNS モニタリング
kind: documentation
description: DNS サーバーに関する問題の診断とデバッグ
aliases:
  - /ja/network_performance_monitoring/network_table
  - /ja/network_performance_monitoring/dns_monitoring
further_reading:
  - link: 'https://www.datadoghq.com/blog/monitor-dns-with-datadog/'
    tag: ブログ
    text: Datadog での DNS モニタリング
  - link: 'https://www.datadoghq.com/blog/monitor-coredns-with-datadog/'
    tag: ブログ
    text: Datadog での CoreDNS モニタリング
  - link: /network_monitoring/performance/network_page
    tag: Documentation
    text: 各ソースと宛先間のネットワークデータを探索。
  - link: 'https://www.datadoghq.com/blog/dns-resolution-datadog/'
    tag: ブログ
    text: DNS 解決を使用してクラウドおよび外部エンドポイントを監視
---
{{< img src="network_performance_monitoring/dns_default.png" alt="DNS モニタリング" >}}

DNS モニタリングにより提供される DNS サーバーのパフォーマンス概要を把握することで、サーバー側およびクライアント側の DNS に関する問題を確認できます。フローレベルの DNS メトリクスを収集、表示するこのページを使用して、以下を確認できます。

* DNS リクエストを作成しているポッドまたはサービス、およびそのリクエストを受信するサーバー。
* 最も多くのリクエストを作成または最高レートでリクエストを作成しているエンドポイント。
* DNS サーバーによるリクエストへの応答時間が徐々にまたは急に増加した場合。
* 高いエラー率の DNS サーバーと、送信されるエラーのタイプ。

## セットアップ

ホスト上を含め、Agent の最新バージョンを使用している場合、DNS モニタリングのメトリクスは、Linux OS の場合は Agent v7.23 以降、Windows Server の場合は v7.28 以降のシステムプローブにより自動的に収集されます。インストールすると、デフォルトでネットワークパフォーマンスモニタリング製品の ‘DNS’ タブにアクセス可能になります。他の操作は必要ありません。

[Helm で Kubernetes][3] を使用している場合、DNS モニタリングを有効にするには [values.yaml][4] で `collectDNSStats:` を `true` に設定する必要があります。

ネットワークパフォーマンスモニタリングをご希望の場合は、[NPM セットアップ手順][2]をご覧ください。

## クエリ

ページ上部のソースおよび宛先検索バーを使用して、DNS リクエストを作成するクライアント (_ソース_)、および DNS リクエストに応答する DNS サーバー (_宛先_) の間の依存関係を問い合わせます。宛先ポートは自動的に DNS ポート 53 に限定され、依存関係の検索結果がすべてこの形式 (クライアント → DNS サーバー) に一致するようになります。

検索を特定のクライアントに絞るには、ソース検索バーでタグを使用して DNS トラフィックにフィルターをかけ集計します。デフォルトのビューでは、ソースに `service` タグが使用されています。したがって、表の各行は DNS サーバーへ DNS リクエストを作成しているサービスを表しています。

{{< img src="network_performance_monitoring/dns_default.png" alt="DNS モニタリングデフォルトビュー"  style="width:100%;">}}

検索を特定の DNS サーバーに絞るには、宛先検索バーでタグを使用します。宛先の表示を構成するには、**Group by** のドロップダウンメニューで以下のオプションの 1 つを選択します。

* `dns_server`: DNS リクエストを受信するサーバー。このタグには、`pod_name` または `task_name` と同じ値が与えられています。上記タブが使用できない場合は、`host_name` を使用します。
* `host`: DNS サーバーのホスト名。
* `service`: DNS サーバーで実行中のサービス。
* `IP`: DNS サーバーの IP。

この例は、本番環境のアベイラビリティーゾーンのポッドから、DNS リクエストを受信するホストへのすべてのフローを示しています。

{{< img src="network_performance_monitoring/dns_query_screenshot.png" alt="複数の DNS サーバーへリクエストを送信するポッドのクエリ"  style="width:100%;">}}

## メトリクス

DNS メトリクスはグラフと関連する表を用いて表示されます。

**注:** デフォルトの収集インターバルは 5 分で、保存期間は 7 日です。

次の DNS メトリクスを使用できます。

| メトリクス                   | 説明                                                                                                             |
|--------------------------|-------------------------------------------------------------------------------------------------------------------------|
| **DNS requests**         | クライアントで作成された DNS リクエストの数。                                                                         |
| **DNS requests / second** | クライアントにより作成された DNS リクエストの速度。                                                                             |
| **DNS response time**    | クライアントからのリクエストへの DNS サーバーによる平均応答時間。                                                |
| **Timeouts**             | クライアントからの DNS リクエストのタイムアウト回数（DNS の全応答に対するパーセンテージとして表示）。                    |
| **Errors**               | DNS エラーコードを生成した、クライアントからのリクエスト数（DNS の全応答に対するパーセンテージとして表示）。   |
| **SERVFAIL**             | SERVFAIL コード（DNS サーバーの応答失敗）を生成した、クライアントからのリクエスト数（DNS の全応答に対するパーセンテージとして表示）。   |
| **NXDOMAIN**             | NXDOMAIN コード（ドメイン名の存在なし）を生成した、クライアントからのリクエスト数（DNS の全応答に対するパーセンテージとして表示）。   |
| **OTHER**                | NXDOMAIN または SERVFAILDNS 以外のエラーコードを生成した、クライアントからのリクエスト数（DNS の全応答に対するパーセンテージとして表示）。   |
| **Failures**             | クライアントからの DNS リクエストにおけるすべてのタイムアウトとエラーの総数（DNS の全応答に対するパーセンテージとして表示）。 |

## 表

ネットワークテーブルには、クエリで定義された各 _ソース_ と _宛先_ の依存関係別に、上記メトリクスの詳細が表示されます。

表の右上にある **Customize** ボタンを使い、表中の列を構成します。

**Filter Traffic** [オプション][1]で、ビュー内のトラフィックの詳細を表示できます。

## サイドパネル

サイドパネルでは、DNS サーバーの依存関係のデバッグに役立つコンテキストテレメトリを確認できます。Flows、Logs、Traces、Processes タブを使用して、DNS サーバーの受信リクエストや応答時間、失敗率の数値が高い原因が次であるかどうかを判別します。

* 基底のインフラストラクチャーのリソースを消費している重い処理
* クライアント側のコードでのアプリケーションエラー
* 特定のポートまたは IP から発生している大量のリクエスト

{{< img src="network_performance_monitoring/dns_sidepanel.png" alt="DNS モニタリングのサイドパネル"  style="width:100%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/network_monitoring/performance/network_page#table
[2]: /ja/network_monitoring/devices/setup?tab=snmpv2
[3]: /ja/agent/kubernetes/?tab=helm
[4]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml#L299-L300