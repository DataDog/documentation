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

###  Troubleshooting and Questions

Do you have redis-py library, version 2.4.11 or later? You might need to [upgrade][1] if you are having difficulties!

**Q:** With Redis, even after install python-redis we get this error:

	echo -e "\e[0;31mMissing redis python module - Failure\e[0m" || \
	> echo -e "\e[0;32mredis python module - OK\e[0m"
	*Missing redis python module - Failure*


**A:** For CentOS5 we will look for python2.6, use that if it’s available, otherwise we will default to the system python (2.4, in this case). The easiest solution would be to remove Python 2.6 altogether and restart the Agent which should have it default to 2.4 and the redis checks should then work as expected.

**Q:** Can the redis plugin draw metrics from different ports on the same host, if we are running more than 1 redis instance on each server?

**A:** Yes! The value for `redis_urls` in your datadog.conf file can be a list of
comma-separated redis hosts, such as:

```
	redis_urls: localhost:6379, localhost:6380
```

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
