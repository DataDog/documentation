---
aliases:
- /ja/integrations/faq/producer-and-consumer-metrics-don-t-appear-in-my-datadog-application

title: Kafka のトラブルシューティングと詳細な調査
---

## 概要

"KafkaTM は、リアルタイムのデータパイプラインやストリーミングアプリの構築に使用されます。水平方向にスケーラブルで、フォールトトレラントで、非常に高速であり、何千もの企業で実運用されています。" - [Kafka 公式サイト][1]

Kafka は、本質的に、多くのアプリケーションから多くのアプリケーションにペイロード/メッセージを転送するために使用される強力で高速なメッセージ仲介システムです。これは、mBeans を通じてメトリクスを公開する Java ベースのアプリケーションです。

## Kafka コンポーネント

Kafka には、主に 4 つのコンポーネントがあります。

* **ブローカー**: メッセージの書き込みと読み出しのメカニズムを確立する責任を負うノードのクラスター。(Kafka のメインピースで、常に Java で、通常は Apache Zookeeper によって管理される)
* **プロデューサー**: 閲覧したいメッセージを書き込んでいるアプリケーション。(最も一般的なのは Java だが、他の言語でも可能性がある)
* **コンシューマー**: メッセージのセットを受信するアプリケーションです。(最も一般的なのは Java だが、他の言語でも可能性がある)
* **トピック** - プロデューサーとコンシューマーがサブスクライブするメッセージのメールボックス。Kafka でメッセージを書いたり読んだりするときは、どの「トピック」から読み込むかを指定します。これは slack のチャンネルのように考えることができ、自分がメッセージを投稿したり読んだりしたいものに参加します。各トピックはオフセットのリストを持っており、自分が読んだメッセージの数/読み残したメッセージの数を知ることができます。

[Kafka の詳細][2]や [Datadog のブログポスト][3]を参照してください。

## Datadog Kafka インテグレーション

Datadog には、2 つの異なる Kafka インテグレーションがあることに注意する必要があります。1 つは [Kafka][4] という名前で、もう 1 つは [Kafka_Consumer][4] です。

[Kafka インテグレーション][4]は、Cassandra、JMX、Tomcat などの他の Java ベースのアプリケーションと同様に、[Datadog の JMXFetch][5] アプリケーションを使用してメトリクスをプルしています。これは mBeans を使用してメトリクスをプルします。エンジニアリングチームは、Kafka.yaml ファイルに一般的に使用される mBeans のリストを含めました。これは、ユーザーが希望する他のビーンによって拡張することができ、また、Kafka のバージョンが追加のメトリクスをサポートする場合も同様です。

[Kafka_Consumer インテグレーション][6]は、標準的な Python ベースのチェックのようにメトリクスを収集します。これは、内部の Zookeeper API を使用しています。Zookeeper は、Kafka ブローカーとして知られるノードのクラスターの構成を管理する責任を負う Apache アプリケーションです。(Kafka のバージョン 0.9 では少し変わっていて、Zookeeper は必須ではなくなりました。詳しくはトラブルシューティングのセクションを参照)。このチェックでは、3 つのメトリクスのみをピックアップし、これらは JMXFetch から取得したものではありません。

## トラブルシューティング

### 古いバージョンの Agent の場合

この問題は、[Datadog Agent][7] のバージョン *<5.20* を実行している場合にのみ適用されます。Kafka の古いバージョンでは、コンシューマーオフセットは Zookeper にのみ格納されていました。初期の Kafka_consumer Agent Check は、この制限があるときに書かれました。このため、オフセットが Kafka に格納され、古いバージョンの Agent を使用している場合、`kafka.consumer_lag` メトリクスを取得することはできません。これらのメトリクスを見るには、[Agent を最新バージョンにアップグレードする][8]必要があります。

### インスタンスに接続できない

Datadog-Kafka インテグレーションでは、以下のようなエラーが表示されることがあります。

```text
instance #kafka-localhost-<PORT_NUM> [ERROR]: 'Cannot connect to instance localhost:<PORT_NUM>. java.io.IOException: Failed to retrieve RMIServer stub
```

このエラーは、Datadog Agent が Kafka インスタンスに接続できず、RMI プロトコルを介して公開された mBeans からメトリクスを取得できないことを意味します。このエラーは、Kafka インスタンスを起動するときに、次の Java 仮想マシン (JVM) 引数を含めることで解決できます (プロデューサー、コンシューマー、ブローカーのすべての個別の Java インスタンスに必要です)。

```text
-Dcom.sun.management.jmxremote.port=<PORT_NUM> -Dcom.sun.management.jmxremote.rmi.port=<PORT_NUM>
```

### プロデューサーとコンシューマーのメトリクスの欠落

デフォルトでは、Datadog はブローカーベースのメトリクスのみを収集します。

Java ベースのプロデューサーとコンシューマーの場合は、`conf.yaml` に以下を追加し、必要に応じて設定を更新してください。利用可能なすべての構成オプションについては、[サンプル kafka.d/conf.yaml][9] を参照してください。
```yaml
- host: remotehost
  port: 9998 # プロデューサー
  tags:
    - kafka: producer0
- host: remotehost
  port: 9997 # コンシューマー
  tags:
    - kafka: consumer0
```

**注**: この方法は、他の言語で書かれたカスタムプロデューサーおよびコンシューマークライアントを使用している場合、または mBeans を公開していない場合には機能しません。コードからメトリクスを送信するには、[DogStatsD][10] を使用してください。

### パーティションが存在しない

この問題は、Kafka Consumer Agent のチェックに特化したものです。`kafka_consumer.d/conf.yaml` で、環境に存在しないパーティションを指定すると、以下のエラーが表示されます。

```text
instance - #0 [Error]: ''
```

改善するには、トピックに応じた正しいパーティションを指定します。これは、この行と相関しています。

```yaml
#     <TOPIC_NAME_1>: [0, 1, 4, 12]
```

### パーティションコンテキストの制限

パーティションコンテキスト収集数は 500 個に制限されています。それ以上のコンテキストが必要な場合は、[Datadog サポート][11]に連絡してください。

[1]: https://kafka.apache.org
[2]: https://sookocheff.com/post/kafka/kafka-in-a-nutshell
[3]: https://www.datadoghq.com/blog/monitoring-kafka-performance-metrics
[4]: /ja/integrations/kafka/
[5]: https://github.com/DataDog/jmxfetch
[6]: /ja/integrations/kafka/#agent-check-kafka-consumer
[7]: /ja/agent/
[8]: /ja/agent/versions/upgrade_to_agent_v6/
[9]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/conf.yaml.example
[10]: /ja/developers/dogstatsd/
[11]: /ja/help/
