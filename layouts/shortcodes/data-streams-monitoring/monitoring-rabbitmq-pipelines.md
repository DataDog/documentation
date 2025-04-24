### Monitoring RabbitMQ Pipelines
The [RabbitMQ Integration][1] can provide detailed monitoring and metrics of your RabbitMQ deployments. For full compatibility with Data Streams Monitoring, we recommend configuring the integration as follows:
```yaml
instances:
  - prometheus_plugin:
      url: http://<HOST>:15692
      unaggregated_endpoint: detailed?family=queue_coarse_metrics&family=queue_consumer_count&family=channel_exchange_metrics&family=channel_queue_exchange_metrics&family=node_coarse_metrics
```
This will ensure that all RabbitMQ graphs populate, and that you see detailed metrics for individual exchanges as well as queues.

[8]: https://docs.datadoghq.com/integrations/rabbitmq/?tab=host
