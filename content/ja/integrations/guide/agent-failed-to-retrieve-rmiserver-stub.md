---

title: Agent が RMIServer スタブの取得に失敗します
---

```text
instance #kafka-localhost-<PORT_NUM> [ERROR]: 'Cannot connect to instance localhost:<PORT_NUM>. java.io.IOException: Failed to retrieve RMIServer stub
```

Datadog Agent が、RMI プロトコルで公開された mBeans からメトリクスを取得するために、Kafka インスタンスに接続することができません。

この問題を解決するには、Kafka インスタンスを起動する際に、次の JVM 引数を含めます *(Producer、Consumer、Broker はすべて個別の Java インスタンスであるため、必須)*

```text
-Dcom.sun.management.jmxremote.port=<PORT_NUM> -Dcom.sun.management.jmxremote.rmi.port=<PORT_NUM>
```