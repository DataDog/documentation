---
title: DNS Monitoring
description: Diagnose and debug DNS server issues
aliases:
    - /network_performance_monitoring/network_table
    - /network_performance_monitoring/dns_monitoring
further_reading:
    - link: "https://www.datadoghq.com/blog/monitor-dns-with-datadog/"
      tag: Blog
      text: Monitor DNS with Datadog
    - link: "https://www.datadoghq.com/blog/monitor-coredns-with-datadog/"
      tag: Blog
      text: Monitor CoreDNS with Datadog
    - link: /network_monitoring/performance/network_analytics
      tag: Documentation
      text: Explore network data between each source and destination.
    - link: "https://www.datadoghq.com/blog/dns-resolution-datadog/"
      tag: Blog
      text: Use DNS resolution to monitor cloud and external endpoints
---

{{< img src="network_performance_monitoring/dns_monitoring/dns_overview.png" alt="Datadog の DNS モニタリングページ" >}}

<div class="alert alert-info">
DNS モニタリングを有効にするには、Agent バージョン 7.33 以降にアップグレードします。
</div>

DNS モニタリングにより提供される DNS サーバーのパフォーマンス概要を把握することで、サーバー側およびクライアント側の DNS に関する問題を確認できます。フローレベルの DNS メトリクスを収集、表示するこのページを使用して、以下を確認できます。

* DNS リクエストを作成しているポッドまたはサービス、およびそのリクエストを受信するサーバー。
* 最も多くのリクエストを作成または最高レートでリクエストを作成しているエンドポイント。
* DNS サーバーによるリクエストへの応答時間が徐々にまたは急に増加した場合。
* 高いエラー率の DNS サーバーと、送信されるエラーのタイプ。
* どのドメインが解決されているか。

## セットアップ

DNS モニタリングの使用を開始する前に、[ネットワークパフォーマンスモニタリングのセットアップ][1]を行ってください。また、最新バージョンの Agent、少なくとも Linux OS では Agent v7.23+、Windows Server では v7.28+ を使用していることを確認してください。インストールすると、ネットワークパフォーマンスモニタリング製品に **DNS** タブが表示されます。

ネットワークデバイスモニタリングをご希望の場合は、[NDM セットアップ手順][2]をご覧ください。

## クエリ

ページ上部の検索バーを使用して、(DNS リクエストを作成する) クライアント、および DNS リクエストに応答する DNS サーバーの間の依存関係をクエリします。宛先ポートは自動的に DNS ポート 53 に限定され、依存関係の検索結果がすべてこの形式 (クライアント → DNS サーバー) に一致するようになります。

検索を特定のクライアントに絞るには、検索バーでクライアントタグを使用して DNS トラフィックにフィルターをかけ集計します。デフォルトのビューでは、クライアントは自動的に最も一般的なタグでグループ化されます。したがって、表の各行は DNS サーバーへ DNS リクエストを作成しているサービスを表しています。

{{< img src="network_performance_monitoring/dns_monitoring/dns_client_search.png" alt="検索バーに client_service:ad-server、View clients as に pod_name、View servers as に network.dns_query を入力した DNS モニタリングページ" style="width:100%;">}}

検索を特定の DNS サーバーに絞るには、検索バーでサーバータグを使用します。**Group by** のドロップダウンメニューで以下のオプションの 1 つを使ってサーバーの表示を構成します。

* `dns_server`: DNS リクエストを受信するサーバー。このタグには、`pod_name` または `task_name` と同じ値が与えられています。上記タブが使用できない場合は、`host_name` を使用します。
* `host`: DNS サーバーのホスト名。
* `service`: DNS サーバーで実行中のサービス。
* `IP`: DNS サーバーの IP。
* `dns_query`: (Agent バージョン 7.33 以降が必要) クエリされたドメイン。

この例は、本番環境のアベイラビリティーゾーンのポッドから、DNS リクエストを受信するホストへのすべてのフローを示しています。

{{< img src="network_performance_monitoring/dns_monitoring/dns_query_example.png" alt="Search for フィールドに client_availability_zone:us-central1-b と client_env: prod を入力し、View clients as ドロップダウンで pod_name を選択し、View servers as ドロップダウンで host を選択したクエリ" style="width:100%;">}}

### 推奨クエリ

{{< img src="network_performance_monitoring/dns_monitoring/recommended_queries_dns.png" alt="クエリの説明を表示する DNS モニタリングページの推奨クエリ" style="width:100%;">}}

DNS ページの上部には、[Network Analytics][4] ページに似た 3 つの推奨クエリがあります。これらは、DNS の健全性を調査し、概要 DNS メトリクスを表示するために一般的に使用される静的クエリです。推奨されるクエリを出発点として使用して、DNS 構成をさらに詳しく把握し、DNS の問題をトラブルシューティングしてください。

推奨クエリにカーソルを合わせると、そのクエリの結果が意味する簡単な説明が表示されます。クエリを実行するにはクエリをクリックし、クエリを削除するには **Clear query** をクリックします。それぞれの推奨クエリには、推奨グラフのセットもあります。推奨クエリをクリアすると、グラフがデフォルト設定にリセットされます。

## メトリクス

DNS メトリクスはグラフと関連する表を用いて表示されます。

**注**: データは 30 秒ごとに収集され、5 分ごとに集計され、14 日間保持されます。

次の DNS メトリクスを使用できます。

| メトリクス                   | 説明                                                                                                             |
|--------------------------|-------------------------------------------------------------------------------------------------------------------------|
| **DNS requests**         | クライアントで作成された DNS リクエストの数。                                                                         |
| **DNS requests / second** | クライアントにより作成された DNS リクエストの速度。                                                                             |
| **DNS response time**    | クライアントからのリクエストへの DNS サーバーによる平均応答時間。                                                |
| **Timeouts**             | クライアントからのタイムアウトした DNS リクエストの数 (全 DNS レスポンスに対する割合で表示されます)。<br  /><br />**注**: これらのタイムアウトは NPM が内部的に計算したメトリクスであり、NPM の外部から報告された DNS タイムアウトとは一致しない場合があります。DNS クライアントやサーバーが報告する DNS タイムアウトとは異なります。                |
| **Errors**               | DNS エラーコードを生成した、クライアントからのリクエスト数（DNS の全応答に対するパーセンテージとして表示）。   |
| **SERVFAIL**             | SERVFAIL コード（DNS サーバーの応答失敗）を生成した、クライアントからのリクエスト数（DNS の全応答に対するパーセンテージとして表示）。   |
| **NXDOMAIN**             | NXDOMAIN コード（ドメイン名の存在なし）を生成した、クライアントからのリクエスト数（DNS の全応答に対するパーセンテージとして表示）。   |
| **OTHER**                | NXDOMAIN または SERVFAILDNS 以外のエラーコードを生成した、クライアントからのリクエスト数（DNS の全応答に対するパーセンテージとして表示）。   |
| **Failures**             | クライアントからの DNS リクエストにおけるすべてのタイムアウトとエラーの総数（DNS の全応答に対するパーセンテージとして表示）。 |

## 表

ネットワークテーブルには、クエリで定義された各_クライアント_と_サーバー_の依存関係別に、上記メトリクスの詳細が表示されます。

表の右上にある **Customize** ボタンを使い、表中の列を構成します。

**Filter Traffic** [オプション][3]で、ビュー内のトラフィックの詳細を表示できます。

## サイドパネル

サイドパネルでは、DNS サーバーの依存関係のデバッグに役立つコンテキストテレメトリを確認できます。Flows、Logs、Traces、Processes タブを使用して、DNS サーバーの受信リクエストや応答時間、失敗率の数値が高い原因が次であるかどうかを判別します。

* 基底のインフラストラクチャーのリソースを消費している重い処理
* クライアント側のコードでのアプリケーションエラー
* 特定のポートまたは IP から発生している大量のリクエスト

{{< img src="network_performance_monitoring/dns_monitoring/dns_sidepanel.png" alt="DNS モニタリングのサイドパネル" style="width:100%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /network_monitoring/performance/
[2]: /network_monitoring/devices/snmp_metrics/?tab=snmpv2
[3]: /network_monitoring/performance/network_analytics#table
[4]: /network_monitoring/performance/network_analytics/#recommended-queries
