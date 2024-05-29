---
aliases:
- /ja/synthetics/api_test_timing_variations
description: API テストのタイミングを理解し、その変動に対してトラブルシューティングします。
further_reading:
- link: https://docs.datadoghq.com/synthetics/metrics/#api-tests
  tag: ドキュメント
  text: Synthetics API テストのメトリクス
kind: documentation
title: API テストのタイミングの理解と、その変動に対するトラブルシューティング
---


## 概要

Synthetic API テストで収集した[タイミングメトリクス][1]を用いて、サーバーとクライアント間の通信におけるボトルネックを特定することができます。


## タイミングメトリクス


Synthetic テストは以下を測定する[メトリクス][1]を収集します。


### リダイレクト時間

`synthetics.http.redirect.time` メトリクスは、リダイレクトに費やされた合計時間を測定します。その他のネットワークのタイミング (DNS の解決や TCP 接続など) はすべて最後のリクエストに対応します。

例えば、**Follow Redirects** を選択した HTTP テストでは、ページ A を合計 `35 ms` で読み込み、ページ B に読み込み時間合計 `40 ms` でリダイレクトした後、ページ C にリダイレクトします。リダイレクトのタイミングは `35 ms + 40 ms = 75 ms` で計算でき、ページ C の読み込み時間は DNS 解決と TCP その他接続を含むその他すべてのタイミングで分割されます。

これに続くリダイレクトについて詳しくは、[HTTP テスト][2]を参照してください。


`synthetics.http.redirect.time` メトリクスは、Synthetics HTTP テストの実行中にリダイレクトが発生した場合のみ測定されます。

### DNS 解決時間

`synthetics.dns.response.time` メトリクスと `*.dns.time`メトリクスは、ドメイン名の解決にかかった時間を測定します。Synthetic API テストでは、ドメイン名の解決に Google、CloudFlare、AWS、Azure などの一般的なDNS サーバーを使用しています。これらのサーバーは[プライベートロケーション][3]または [DNS テスト][4]でオーバーライドできます。

これらのメトリクスは、API テストの URL フィールドにドメイン名が含まれている場合にのみ計測されます。IP アドレスを使用すると、DNS 解決がスキップされ、これらのメトリクスの時系列データは表示されません。


リダイレクトがあった場合、DNS 解決時間は最後のリクエストにのみ対応します。

### TCP 接続時間

`*.connect.time` メトリクスは、サーバーとの TCP 接続の確立に要した総時間を測定します。

リダイレクトがあった場合、TCP 接続時間は最後のリクエストにのみ対応します。

### SSL ハンドシェイク時間

`synthetics.http.ssl.time` および `synthetics.ssl.hanshake.time` メトリクスは、SSL ハンドシェイクに費やした時間を測定します。

これらのメトリクスは、リクエストが HTTP ではなく HTTPS を経由した場合にのみ収集されます。

リダイレクトがあった場合、SSL ハンドシェイク時間は最後のリクエストにのみ対応します。


### 最初のバイト受信時間

`synthetics.http.firstbyte.time` メトリクスは、接続が確立されてから Datadog クライアントが応答の最初のバイトを受信した時までの時間を測定します。これには同じリクエストでのデータ送信に費やしたすべての時間が含まれます。



リダイレクトがあった場合、最初のバイト受信時間は最後のリクエストにのみ対応します。

### ダウンロード時間

`synthetics.http.download.time` メトリクスは、Datadog クライアントが応答の最初のバイトを受信してから全体の応答のダウンロードが終了した時までの時間を測定します。一般的に、応答の本文が大きいほど時間も長くなります。

応答に本文がない場合、このタイミングは null となります。

リダイレクトがあった場合、ダウンロード時間は最後のリクエストにのみ対応します。

### 合計応答時間

`*.response.time` メトリクスは、Synthetics が起動してから Synthetics がリクエストを終了するまでの時間を測定します。応答時間はすべてのネットワーク時間の合計となります。

例えば、HTTPS エンドポイントでリダイレクトを行わない HTTP テストの総応答時間などがこれにあたります: `synthetics.http.response.time = synthetics.http.dns.time + synthetics.http.connect.time + synthetics.http.ssl.time + synthetics.http.firstbyte.time + synthetics.http.download.time`

## タイミングのバリエーション

API テストネットワークのタイミングメトリクスのバリエーションは、リダイレクトから応答本文のダウンロードまで、リクエストのあらゆる段階でボトルネックや遅延が発生した場合に起こります。

次の動作を確認してください。

- バリエーションが全体的な傾向としてみられるのか、突如急増しているのか
- バリエーションがリクエストの特定の段階でのみ発生していないか (例: DNS のタイミングなど)
- 影響を受けた Synthetics テストが複数の場所で実行されている場合、バリエーションが 1 つの場所に限定されているのか、それとも広範囲に渡っているか
- バリエーションが単一の URL、ドメイン、サブドメインでのみ発生しているのか、またはすべてのテストに影響が及んでいるか



測定するすべてのタイミングメトリクスについて、以下のような要素でバリエーションを確認することができます。

### リダイレクト時間
リダイレクト時間は、リクエストに含まれるすべてのリダイレクトの合計です。DNS 解決からダウンロードまで、HTTP リクエストのどの段階でもバリエーションが発生するとリダイレクトのタイミングが顕著に増加します。

例えば、リダイレクトには複数のドメインを解決するための API テストが必要となるため、DNS 解決が遅れるとリダイレクトのタイミングにも影響が生じます。


### DNS 解決時間
信頼できるサーバーからのレイテンシーが加わることで、DNS 解決時間が増加することがあります。

### TCP 接続時間
TCP ハンドシェイクのバリエーションは、ネットワークやサーバーの負荷、リクエストメッセージや応答メッセージのサイズ、Synthetics のマネージドまたは[プライベートロケーション][5]とサーバーとの距離などによって発生します。

### SSL ハンドシェイク時間
SSL ハンドシェイク時間のバリエーションは、サーバーの負荷 (SSL ハンドシェイクは通常、CPU に負荷がかかります)、ネットワークの負荷、および Syntheticsのマネージドまたは[プライベートロケーション][5]からサーバーまでの距離によって発生します。また、CDN の問題により SSL ハンドシェイク時間が長くなることがあります。

### 最初のバイト受信時間
最初のバイト受信時間のバリエーションは、ネットワークやサーバーの負荷、および Synthetics のマネージドまたは[プライベートロケーション][5]からサーバーまでの距離によって発生します。例えば、ネットワークの負荷が高くなったり、CDN が利用できないことによるトラフィックのリルートが発生したりすると、最初のバイト受信時間のタイミングに悪影響が生じます。

### ダウンロード時間
応答サイズの変化により、ダウンロード時間のバリエーションが発生することがあります。ダウンロードされた本文のサイズは、テスト結果と`synthetics.http.response.size` メトリクスで確認できます。

ネットワークの負荷によりバリエーションが起こりうる場所では、[ネットワークパフォーマンスモニタリング][6]や[Synthetics ICMP テスト][7]を用いてて潜在的なボトルネックを特定することができます。

サーバーの負荷によりバリエーションが起こりうる場合には、[Datadog Agent][8]とその[インテグレーション][9]を使用して、潜在的な遅延を特定します。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/metrics/#api-tests
[2]: /ja/synthetics/api_tests/http_tests?tab=requestoptions#define-request
[3]: /ja/synthetics/private_locations/configuration#dns-configuration
[4]: /ja/synthetics/api_tests/dns_tests#define-request
[5]: /ja/synthetics/private_locations/?tab=docker#overview
[6]: /ja/network_monitoring/performance/#overview
[7]: /ja/synthetics/api_tests/icmp_tests/#overview
[8]: /ja/getting_started/agent/#overview
[9]: /ja/integrations/