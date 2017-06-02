---
last_modified: 2015/07/05
translation_status: translated
language: ja
title: Datadog-ActiveMQ Integration
integration_title: ActiveMQ
kind: integration
doclevel: complete
---

<!-- <div id="int-overview">
<h2>Overview</h2>
<p>Get metrics from ActiveMQ in real time to</p>
<ul>
  <li>Visualize your web ActiveMQ server performance</li>
  <li>Correlate the performance of ActiveMQ with the rest of your applications</li>
</ul>

</div> -->

## 概要
{: #int-overview}

ActiveMQyより、リアルタイムでメトリクスを取得します。

* ActiveMQサーバーのパフォーマンスを可視化します。
* ActiveMQのパフォーマンスメトリクスを他のアプリケーション情報と関連付けられるようにします。


<!-- <div id="int-configuration">
<h2>Configuration</h2>
<p><em><b>This integration requires Linux or Mac OS X.</b>

  To capture ActiveMQ metrics you need to install the Datadog agent.
Metrics will be captured using a JMX connection.
<br /><b>We recommend the use of Oracle's JDK for this integration.</b>
</em></p> -->


## 設定
{: #int-configuration}
**このインテグレーションでメトリクスを取得するには、LinuxもしくはMac OS X上でActiveMQが動作している必要があります。**

ActiveMQのメトリクスを取得するには、Datadog Agentをインストールする必要があります。
メトリクスは、JMXのコネクションを介して取得されます。

**このインテグレーションには、Oracle's JDKを推奨します。**

<!-- <ol>
  <li><b>Make sure that <a href="http://activemq.apache.org/jmx.html"> JMX Remote is enabled</a> on your ActiveMQ server.</b>
  </li>
     <li>Configure the agent to connect to ActiveMQ
       Edit <code>${confd_help('<code>conf.d/activemq.yaml</code>')}</code>
         <pre class="textfile"><code>instances:
     -   host: localhost
         port: 7199
         user: username
         password: password
         name: activemq_instance


 # List of metrics to be collected by the integration
 # You should not have to modify this.
 init_config:
     conf:
       - include:
           Type: Queue
           attribute:
             AverageEnqueueTime:
               alias: activemq.queue.avg_enqueue_time
               metric_type: gauge
             ConsumerCount:
               alias: activemq.queue.consumer_count
               metric_type: gauge
             ProducerCount:
               alias: activemq.queue.producer_count
               metric_type: gauge
             MaxEnqueueTime:
               alias: activemq.queue.max_enqueue_time
               metric_type: gauge
             MinEnqueueTime:
               alias: activemq.queue.min_enqueue_time
               metric_type: gauge
             MemoryPercentUsage:
               alias: activemq.queue.memory_pct
               metric_type: gauge
             QueueSize:
               alias: activemq.queue.size
               metric_type: gauge
             DequeueCount:
               alias: activemq.queue.dequeue_count
               metric_type: counter
             DispatchCount:
               alias: activemq.queue.dispatch_count
               metric_type: counter
             EnqueueCount:
               alias: activemq.queue.enqueue_count
               metric_type: counter
             ExpiredCount:
               alias: activemq.queue.expired_count
               type: counter
             InFlightCount:
               alias: activemq.queue.in_flight_count
               metric_type: counter

       - include:
           Type: Broker
           attribute:
             StorePercentUsage:
               alias: activemq.broker.store_pct
               metric_type: gauge
             TempPercentUsage:
               alias: activemq.broker.temp_pct
               metric_type: gauge
             MemoryPercentUsage:
               alias: activemq.broker.memory_pct
               metric_type: gauge
 </code></pre>
     </li>

  <li>Restart the agent
        <pre class="linux"><code>sudo /etc/init.d/datadog-agent restart</code></pre>

  <pre class="verification"><code>if [ $(sudo supervisorctl status | egrep "datadog-agent.*RUNNING" | wc -l) == 3 ]; &#92;
then echo -e "&#92;e[0;32mAgent is running&#92;e[0m"; &#92;
else echo -e "&#92;e[031mAgent is not running&#92;e[0m"; fi</code></pre>
    </li>
</ol>
</div> -->

1. **ActiveMQサーバー上で[JMX Remote](http://activemq.apache.org/jmx.html)が有効になっていることを確認してください。**
2. ActiveMQに接続出来るように、Agentを設定します。  
`${confd_help('<code>conf.d/activemq.yaml</code>')}`を次のように編集します。

        instances:
            -   host: localhost
                port: 7199
                user: username
                password: password
                name: activemq_instance
        # List of metrics to be collected by the integration
        # You should not have to modify this.
        init_config:
             conf:
               - include:
                   Type: Queue
                   attribute:
                     AverageEnqueueTime:
                       alias: activemq.queue.avg_enqueue_time
                       metric_type: gauge
                     ConsumerCount:
                       alias: activemq.queue.consumer_count
                       metric_type: gauge
                     ProducerCount:
                       alias: activemq.queue.producer_count
                       metric_type: gauge
                     MaxEnqueueTime:
                       alias: activemq.queue.max_enqueue_time
                       metric_type: gauge
                     MinEnqueueTime:
                       alias: activemq.queue.min_enqueue_time
                       metric_type: gauge
                     MemoryPercentUsage:
                       alias: activemq.queue.memory_pct
                       metric_type: gauge
                     QueueSize:
                       alias: activemq.queue.size
                       metric_type: gauge
                     DequeueCount:
                       alias: activemq.queue.dequeue_count
                       metric_type: counter
                     DispatchCount:
                       alias: activemq.queue.dispatch_count
                       metric_type: counter
                     EnqueueCount:
                       alias: activemq.queue.enqueue_count
                       metric_type: counter
                     ExpiredCount:
                       alias: activemq.queue.expired_count
                       type: counter
                     InFlightCount:
                       alias: activemq.queue.in_flight_count
                       metric_type: counter

               - include:
                   Type: Broker
                   attribute:
                     StorePercentUsage:
                       alias: activemq.broker.store_pct
                       metric_type: gauge
                     TempPercentUsage:
                       alias: activemq.broker.temp_pct
                       metric_type: gauge
                     MemoryPercentUsage:
                       alias: activemq.broker.memory_pct
                       metric_type: gauge

3. Datadog Agentの再起動

        sudo /etc/init.d/datadog-agent restart

*確認が必要な場合*

    if [ $(sudo supervisorctl status | egrep "datadog-agent.*RUNNING" | wc -l) == 3 ]; ¥
    then echo -e "&#92;e[0;32mAgent is running&#92;e[0m"; ¥
    else echo -e "&#92;e[031mAgent is not running&#92;e[0m"; fi
