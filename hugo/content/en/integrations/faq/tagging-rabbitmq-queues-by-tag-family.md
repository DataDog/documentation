---
title: Tagging RabbitMQ queues by tag family

---

As of Datadog Agent version 5.8.0. it is now possible to apply a tag to specified groups of RabbitMQ queues for use in visualizations and alerting.

In order to configure this, provide the tag_families: true parameter in the rabbitmq.yaml file here: https://github.com/DataDog/dd-agent/blob/5.8.x/conf.d/rabbitmq.yaml.example

If you have this parameter set up, the first captured group in the queues_regexes provided will be used as the queue_family tag

Consider the following example `rabbitmq.yaml`:
```yaml
init_config:

instances:
# 'tag_families' (default: false) to tag queue "families" based off of regex
  - rabbitmq_api_url: http://localhost:15672/api/
    rabbitmq_user: guest
    rabbitmq_pass: guest
   tag_families: true

    nodes:
      - rabbit@localhost
      - rabbit2@domain
    nodes_regexes:
      - bla.*

# Use the `queues` or `queues_regexes` parameters to specify the queues you'd like to
# collect metrics on (up to 200 queues).
# If you have less than 200 queues, you don't have to set this parameter,
# the metrics will be collected on all the queues by default.
# If you have set up vhosts, set the queue names as `vhost_name/queue_name`.
# If you have `tag_families` enabled, the first captured group in the regex
# will be used as the queue_family tag
#
    queues:
      - queue1
      - queue2
    queues_regexes:
      - (thisqueue)-.*
      - (another)_\d+queue
      - (lepidorae)-\d+ # to tag queues in the lepidorae queue_family
```

So in this case, the tags queue_family:thisqueue, queue_family:another, and queue_family:lepidorae tags would be added to those families of queues. These could then be used in any of your graphs to aggregate these queues together, to exclude this group of queues from a monitor, etc.

