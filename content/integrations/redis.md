---
title: Datadog-Redis Integration
integration_title: Redis

kind: integration
git_integration_title: redis
---

### Overview

Track and graph your Redis activity and performance metrics with slice-and-dice at all levels from individual column families to entire clusters.

![Redis default dashboard](/static/images/redis.png)

Learn more about how to monitor Redis performance metrics thanks to [our series of posts](https://www.datadoghq.com/blog/how-to-monitor-redis-performance-metrics/). We detail the key performance metrics, how to collect them, and how to use Datadog to monitor Redis.

<%= insert_example_links(conf:"redisdb", check:"redisdb")%>

###  Troubleshooting and Questions

**Q:** How do I filter to look at the stats for a particular DB in a particular environment?

**A:** Prebuilt dashboards only allow you to filter on a single tag
(these are the dashboards you see when
clicking [Overview][2]). If you go to the [Metrics Explorer][3], you can select which metrics you want to see and what you want to see it over.  In the ‘Over:’ section you can select multiple environments and then select “Save these tiles to: a new dashboard.”

![][4]

### Metrics

<%= get_metrics_from_git()%>

[1]: https://github.com/DataDog/dd-agent/issues/374
[2]: https://app.datadoghq.com/account/overview
[3]: https://app.datadoghq.com/metric/explorer
[4]: /static/images/metric-explorer-redis.png
