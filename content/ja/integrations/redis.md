---
last_modified: 2015/07/16
translation_status: complete
language: ja
title: Datadog-Redis Integration
integration_title: Redis
doclevel: basic
kind: integration
---

<!-- ### Overview
{:#int-overview}

Track and graph your Redis activity and performance metrics with slice-and-dice at
all levels from individual column families to entire clusters. -->

### 概要
{:#int-overview}

次の目的で、RedisのメトリクスをDatadogへ送信します:

- データベースのパフォーマンスの可視化する
- Redisのパフォーマンス情報と他のアプリケーションの情報を連携し状況を把握する


<!-- The following metrics are collected by default with the Redis integration:

    redis.aof.buffer_length
    redis.aof.last_rewrite_time
    redis.aof.rewrite
    redis.aof.size
    redis.clients.biggest_input_buf
    redis.clients.blocked
    redis.clients.longest_output_list
    redis.cpu.sys
    redis.cpu.sys_children
    redis.cpu.user
    redis.cpu.user_children
    redis.keys.evicted
    redis.keys.expired
    redis.mem.fragmentation_ratio
    redis.mem.lua
    redis.mem.peak
    redis.mem.rss
    redis.mem.used
    redis.net.clients
    redis.net.rejected
    redis.net.slaves
    redis.perf.latest_fork_usec
    redis.pubsub.channels
    redis.pubsub.patterns
    redis.rdb.bgsave
    redis.rdb.changes_since_last
    redis.rdb.last_bgsave_time
    redis.replication.last_io_seconds_ago
    redis.replication.sync
    redis.replication.sync_left_bytes
    redis.stats.keyspace_hits
    redis.stats.keyspace_misses -->

Redisインテグレーションがデフォルトで取得しているメトリクス:

    redis.aof.buffer_length
    redis.aof.last_rewrite_time
    redis.aof.rewrite
    redis.aof.size
    redis.clients.biggest_input_buf
    redis.clients.blocked
    redis.clients.longest_output_list
    redis.cpu.sys
    redis.cpu.sys_children
    redis.cpu.user
    redis.cpu.user_children
    redis.keys.evicted
    redis.keys.expired
    redis.mem.fragmentation_ratio
    redis.mem.lua
    redis.mem.peak
    redis.mem.rss
    redis.mem.used
    redis.net.clients
    redis.net.rejected
    redis.net.slaves
    redis.perf.latest_fork_usec
    redis.pubsub.channels
    redis.pubsub.patterns
    redis.rdb.bgsave
    redis.rdb.changes_since_last
    redis.rdb.last_bgsave_time
    redis.replication.last_io_seconds_ago
    redis.replication.sync
    redis.replication.sync_left_bytes
    redis.stats.keyspace_hits
    redis.stats.keyspace_misses

<!-- ### Troubleshooting and Questions

Do you have redis-py library, version 2.4.11 or later? You might need to
<a href="https://github.com/DataDog/dd-agent/issues/374">upgrade</a>
if you are having difficulties!

<span class="question">Q: With Redis, even after install python-redis we get this error:</span>

  echo -e "\e[0;31mMissing redis python module - Failure\e[0m" || \
  > echo -e "\e[0;32mredis python module - OK\e[0m"
  *Missing redis python module - Failure*

A: For CentOS5 we will look for python2.6, use that if it’s available, otherwise
we will default to the system python (2.4, in this case). The easiest solution
would be to remove Python 2.6 altogether and restart the Agent which should
have it default to 2.4 and the redis checks should then work as expected.

<span class="question">Q: Can the redis plugin draw metrics from different ports on the same host,
if we are running more than 1 redis instance on each server?</span>

A: Yes! The value for `redis_urls` in your datadog.conf file can be a list of
comma-separated redis hosts, such as:

```
redis_urls: localhost:6379, localhost:6380
```

<span class="question">Q: How do I filter to look at
the stats for a particular DB in a particular environment?</span>

A: Prebuilt dashboards only allow you to filter on a single tag
(these are the dashboards you see when
clicking [Overview](https://app.datadoghq.com/account/overview)).  If you go to the Metrics Explorer
([Metrics](https://app.datadoghq.com/metric/explorer) tab
→ [Explorer](https://app.datadoghq.com/metric/explorer)), you can select which metrics you want
to see and what you want to see it over.  In the ‘Over:’ section you
can select multiple environments and then select “Save these tiles to:
a new dashboard.”

<img src="/static/images/metric-explorer-redis.png"/> -->


### FAQs

**Q: Redisインテグレーションは、同一ホスト上の異なるポート番号を持ったRedisのインスタンスを監視出来ますか?**

A: はい。`datadog.conf`に設定する`redis_urls`は、監視先ホスト&値の組み合わせのリストにすることが出来ます:

    redis_urls: localhost:6379, localhost:6380
