---
aliases:
- /ja/logs/processing/attributes_naming_convention/
description: 属性と命名規則の遵守について
further_reading:
- link: logs/log_configuration/pipelines
  tag: ドキュメント
  text: Datadog パイプラインの検出
- link: logs/log_configuration/processors
  tag: ドキュメント
  text: 使用可能なプロセッサーのリスト
- link: logs/logging_without_limits
  tag: ドキュメント
  text: 無制限のログ
- link: logs/explorer
  tag: ドキュメント
  text: ログの調査方法
- link: https://www.datadoghq.com/blog/cidr-queries-datadog-log-management/
  tag: ブログ
  text: CIDR 表記クエリを使用してネットワークトラフィックログをフィルターする
title: 属性とエイリアス設定
---
## 概要 {#overview}

さまざまなテクノロジーやアプリケーションから取得されるログを一元化すると、ログ管理環境に数十個から数百個の属性が生成されます。特に多数のチームのユーザーが同じ環境内で作業している場合は、その傾向が顕著です。

たとえば、クライアントの IP も、`clientIP`、`client_ip_address`、`remote_address`、`client.ip` など、さまざまなログ属性が存在します。リクエストの実行時間の場合は、`exec_time`、`request_latency`、`request.time_elapsed` などのようになります。

**属性**と**エイリアス**を使用して、ログ環境を統一します。

## 属性の種類とエイリアス設定 {#attribute-types-and-aliasing}

属性は、ログエクスプローラーでのフィルタリングと検索に使用される[ログファセット][1]と[タグ][2]を規定します。

  * [**予約済み属性**](#reserved-attributes)は自動的に取り込まれます。

  * [**標準属性**](#standard-attributes)は、組織で使用する命名規則の基盤となる存在です。[アプリ][3]に標準的な属性のデフォルトセットが用意されていますが、このリストをカスタマイズして、チームの**命名規則**を作ることができます。

  * 標準属性で命名規則を実装した場合や、複数のログソースから一意の標準ファセットを作成する場合、[**エイリアス設定**](#aliasing)を使用します。たとえば、ハイブリッド [Apache][4] および [Amazon Cloud Front][5] インフラストラクチャーの場合、標準の `Network Client IP` ファセットと標準の `duration` を使用して、レイテンシーに最も影響を受けるクライアントを追跡できます。エイリアス設定によりチームの技術スタックを変更することなく命名規則を実装できます。

## 予約済み属性 {#reserved-attributes}

次の一覧は、ログと共に自動的に取り込まれる予約済みの属性の一覧です。

**注**: トレースまたはメトリクスも収集している場合は、統合サービスタグ付けを構成することをお勧めします。このコンフィギュレーションは、`env`、`service`、`version` の 3 つの標準タグを使用して、Datadog テレメトリを結び付けます。詳細については、専用の[統合サービスタグ付け][6]ドキュメントを参照してください。

| 属性 | 説明                                                                                                                                                                                                                                |
|-----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `host`    | メトリクスで定義されている発信元ホストの名前です。Datadog は、Datadog 内の一致するホストから対応するホストタグを自動的に取得し、それをログに適用します。Agent はこの値を自動的に設定します。                         |
| `source`  | これは、ログの発生元技術である統合名に対応します。統合名と一致する場合、Datadog は対応するパーサーとファセットを自動的にインストールします。たとえば、`nginx`、`postgresql` などです。|
| `status`  | これは、ログのレベル/重大度に対応します。[パターン][7]の定義に使用され、Datadog Logs UI に専用のレイアウトがあります。                                                                                                    |
| `service` | ログイベントを生成するアプリケーションまたはサービスの名前です。Logs から API への切り替えに使用されます。このため、両方の製品を使用する際には必ず同じ値を定義してください。                                                               |
| `trace_id` | これは、トレースに使用されるトレース ID に対応します。[ログとそのトレースを関連付ける][8]ために使用されます。                                                                                                                                |
| `message` | デフォルトでは、Datadog は `message` 属性の値をログエントリーの本文として取り込みます。Live Tail では、この値はハイライトされて表示され、全文検索用にインデックス化されます。                                   |

## 標準属性 {#standard-attributes}

ログのインテグレーションは標準属性の[デフォルトセット][9]に依存します。

標準属性テーブルには、[定義済み標準属性](#default-standard-attribute-list)のセットが付属しています。このリストに独自の属性を追加したり、既存の標準属性を編集または削除することができます。

### 新しい標準属性を作成する {#create-a-new-standard-attribute}
**管理ユーザー**は標準属性リストを管理できます。
1. 標準属性の[構成ページ][3]に移動します。
1. {{< ui >}}New Standard Attribute{{< /ui >}} をクリックします。
1. 標準属性を定義します。
    - {{< ui >}}Path{{< /ui >}}: JSON で確認できる標準属性のパス (例: network.client.ip)。
    - {{< ui >}}Type{{< /ui >}}: (`string`、`integer`、`double`、`boolean`): 属性の型。再マップリストの要素をキャストするために使用されます。
    - {{< ui >}}Description{{< /ui >}}: 属性に関する人間が読める説明。
    - (オプション) {{< ui >}}Remapping list{{< /ui >}}: 標準属性に再マッピングすべき準拠していない属性のカンマ区切りのリスト。

### デフォルトの標準属性リスト {#default-standard-attribute-list}

[ログ管理のデフォルトの標準属性][9]の完全なリストをご覧ください。リストは機能ドメイン別に分かれています。
  
| 標準属性               | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [ネットワーク/通信][10]     | ネットワーク通信で使用されるデータに関連する属性です。すべてのフィールドとメトリクスに `network` というプレフィックスが付けられています。                                                                                                                                                                                                                                                                                                                                                                            |
| [位置情報][11]                | ネットワーク通信で使用される IP アドレスの位置情報に関連する属性です。すべてのフィールドに `network.client.geoip` または `network.destination.geoip` というプレフィックスが付けられています。                                                                                                                                                                                                                                                                                                                    |
| [HTTP リクエスト][12]              | HTTP リクエストおよびアクセスで一般に使用されるデータに関連する属性です。すべての属性に `http` というプレフィックスが付けられています。これらの属性に依存する代表的なインテグレーションには、[Apache][4]、Rails、[AWS CloudFront][13]、Web アプリケーションサーバーなどがあります。URL の詳細に関する属性には、`http.url_details` というプレフィックスが付きます。これらの属性は、HTTP URL のパースされた各部に関する詳細を提供します。[URL パーサー][14]によって生成されます。                            |
| [ソースコード][15]                | カスタムアプリケーションのロガーを使用してログまたはエラーを生成する際に使用されるデータに関連する属性です。すべての属性に `logger` または `error` というプレフィックスが付けられています。これらの属性に依存する代表的なインテグレーションには、Java、Node.js、.NET、Golang、Python などがあります。                                                                                                                                                                       |
| [データベース][16]                   | これらの属性に依存する代表的なインテグレーションには、[Cassandra][17]、[MySQL][18]、[RDS][19]、[Elasticsearch][20] などがあります。                                                                                                                                                                                                                                                                                                                                                                        |
| [パフォーマンス][21]                | パフォーマンスメトリクスに関連する属性です。Datadog ではこの属性を[トレース検索][23]のデフォルトの[メジャー][1]として表示および使用するため、この属性に関するログ内で処理時間を[再マッピング][22]することを推奨しています。                                                                                                                                                                                                                                                                          |
| [ユーザー関連の属性][24]    | すべての属性とメジャーに `usr` というプレフィックスが付けられています。                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| [Syslog とログシッパー][25]    | syslog またはログシッパーエージェントによって追加されたデータに関連する属性です。すべてのフィールドとメトリクスに `syslog` というプレフィックスが付けられています。これらに依存するインテグレーションには、[Rsyslog][26]、[NxLog][27]、[Syslog-ng][28]、[Fluentd][29]、[Logstash][30] などがあります。                                                                                                                                                                                                                                             |
| [DNS][31]                        | すべての属性とメジャーに `dns` というプレフィックスが付けられています。                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| [イベント][32]                     | すべての属性に `evt` というプレフィックスが付けられています。                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

## エイリアス設定 {#aliasing}

宛先属性にマップされるソース属性のエイリアスを作成することで、ログにソースと宛先の両方の属性が含まれるようにできます。

ユーザーはエイリアス設定された (ソース) ファセット属性または標準 (宛先) ファセット属性のいずれかを利用することができますが、[推奨される][33]のは、エイリアス設定されたファセットではなく標準ファセットです。これにより命名規則に従う必要性が強調され、非標準のコンテンツに基づくアセットの構築 (保存済みのビューやダッシュボードなど) を回避することができます。

**エイリアス設定に関する確認事項**:

- エイリアス設定はパイプラインによってログが処理された後に実行されます。抽出済みまたは処理済みの属性は、エイリアス設定時のソースとして利用可能です。
- Datadog ではエイリアス設定済みの属性の型が適用されます。これが不可能な場合、エイリアス設定はスキップされます。
- ログにすでに宛先属性が含まれている場合、エイリアス設定によりその値が上書きされます。
- 1 つの標準属性で複数の属性をエイリアス化する場合、ログにこれらのソース属性が複数含まれているケースでは、そのうち 1 つのソース属性のみエイリアス設定が可能です。
- 更新または追加された標準属性データは、新しく収集されるログにのみ適用されます。
- 標準属性にエイリアス設定を行うことはできません。
- 属性は標準属性に対してのみエイリアス設定が可能です。
- ログの JSON 構造を尊重するため、ある標準属性を別の標準属性の子とすることはできません (`user` と `user.name` の両方を標準属性にすることは不可)。

詳しくは、[ファセットのエイリアス設定][34]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/explorer/facets/
[2]: /ja/logs/search_syntax/#tags
[3]: https://app.datadoghq.com/logs/pipelines/standard-attributes
[4]: /ja/integrations/apache/
[5]: /ja/integrations/amazon_cloudfront/
[6]: /ja/getting_started/tagging/unified_service_tagging/
[7]: /ja/logs/explorer/patterns/
[8]: /ja/tracing/other_telemetry/connect_logs_and_traces/
[9]: /ja/standard-attributes/?product=log+management
[10]: /ja/standard-attributes/?product=log+management&search=network
[11]: /ja/standard-attributes/?product=log+management&search=geolocation
[12]: /ja/standard-attributes/?search=http.&product=log+management
[13]: /ja/integrations/amazon_elb/
[14]: /ja/logs/log_configuration/processors/url_parser/
[15]: /ja/standard-attributes/?search=logger+error&product=log+management
[16]: /ja/standard-attributes/?search=db&product=log+management
[17]: /ja/integrations/cassandra/
[18]: /ja/integrations/mysql/
[19]: /ja/integrations/amazon_rds/
[20]: /ja/integrations/elastic/
[21]: /ja/standard-attributes/?search=duration&product=log+management
[22]: /ja/logs/log_configuration/processors/remapper/
[23]: /ja/tracing/app_analytics/search/
[24]: /ja/standard-attributes/?search=usr&product=log+management
[25]: /ja/standard-attributes/?search=syslog&product=log+management
[26]: /ja/integrations/rsyslog/
[27]: /ja/integrations/nxlog/
[28]: /ja/integrations/syslog_ng/
[29]: /ja/integrations/fluentd/
[30]: /ja/integrations/logstash/
[31]: /ja/standard-attributes/?search=dns&product=log+management
[32]: /ja/standard-attributes/?search=evt&product=log+management
[33]: /ja/logs/explorer/facets/#aliased-facets
[34]: /ja/logs/explorer/facets/#alias-facets