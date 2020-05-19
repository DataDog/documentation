---
title: Tracing Python Applications
kind: documentation
aliases:
    - /tracing/python/
    - /tracing/languages/python/
    - /agent/apm/python/
further_reading:
    - link: 'https://github.com/DataDog/dd-trace-py'
      tag: 'GitHub'
      text: 'Source code'
    - link: 'http://pypi.datadoghq.com/trace/docs/'
      tag: 'Pypi'
      text: 'API Docs'
    - link: 'tracing/visualization/'
      tag: 'Documentation'
      text: 'Explore your services, resources and traces'
    - link: 'tracing/'
      tag: 'Advanced Usage'
      text: 'Advanced Usage'
---

<div class="alert alert-info">
For Python Django applications, note that tracing is disabled when your application is launched in <code>DEBUG</code> mode. Find more <a href="http://pypi.datadoghq.com/trace/docs/web_integrations.html#django">here</a>.
</div>

## Installation and Getting Started

If you already have a Datadog account you can find [step-by-step instructions][1] in our in-app guides for either host-based or container-based set ups.

Otherwise, to begin tracing applications written in Python, first [install and configure the Datadog Agent][2], see the additional documentation for [tracing Docker applications][3] or [Kubernetes applications][4].

Next, install the Datadog Tracing library, `ddtrace`, using pip:

```python
pip install ddtrace
```

Then to instrument your Python application use the included `ddtrace-run` command. To use it, prefix your Python entry-point command with `ddtrace-run`.

For example, if your application is started with `python app.py` then:

```shell
ddtrace-run python app.py
```

For more advanced usage, configuration, and fine-grain control, see Datadog's [API documentation][5].

### Environment variables

When using **ddtrace-run**, the following [environment variable options][6] can be used:

| Environment Variable               | Default     | Description                                                                                                                                                                                                                                                                 |
| ---------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DD_ENV`                           |             | Set the application’s environment e.g. `prod`, `pre-prod`, `staging`. Learn more about [how to setup your environment][7].                                                                                                                                                  |
| `DD_VERSION`                       |             | Set the application’s version e.g. `1.2.3`, `6c44da20`, `2020.02.13`.                                                                                                                                                                                                       |
| `DD_SERVICE`                       |             | The service name to be used for this application. The value is passed through when setting up middleware for web framework integrations (e.g. Pylons, Flask, Django). For tracing without a web integration, it is recommended that you [set the service name in code](#integrations).      |
| `DATADOG_TRACE_ENABLED`            | `true`      | Enable web framework and library instrumentation. When `false`, the application code doesn't generate any traces.                                                                                                                                                           |
| `DATADOG_TRACE_DEBUG`              | `false`     | Enable debug logging in the tracer. Note that this is [not available with Django][8].                                                                                                                                                                                       |
| `DATADOG_PATCH_MODULES`            |             | Override the modules patched for this application execution. It should follow this format: `DATADOG_PATCH_MODULES=module:patch,module:patch...`.                                                                                                                            |
| `DD_AGENT_HOST`                    | `localhost` | Override the address of the trace Agent host that the default tracer attempts to submit traces to.                                                                                                                                                                          |
| `DATADOG_TRACE_AGENT_PORT`         | `8126`      | Override the port that the default tracer submit traces to.                                                                                                                                                                                                                 |
| `DD_TRACE_AGENT_URL`               |             | The URL of the Trace Agent that the tracer submits to. Takes priority over hostname and port, if set. Supports Unix Domain Sockets in combination with the `apm_config.receiver_socket` in your `datadog.yaml` file, or the `DD_APM_RECEIVER_SOCKET` environment variable.  |
| `DATADOG_PRIORITY_SAMPLING`        | `true`      | Enable [Priority Sampling][9].                                                                                                                                                                                                                                              |
| `DD_LOGS_INJECTION`                | `false`     | Enable [connecting logs and traces Injection][10].                                                                                                                                                                                                                           |
| `DD_TRACE_ANALYTICS_ENABLED`       | `false`     | Enable App Analytics globally for [web integrations][11].                                                                                                                                                                                                                   |
| `DD_INTEGRATION_ANALYTICS_ENABLED` | `false`     | Enable App Analytics for a specific integration. Example: `DD_BOTO_ANALYTICS_ENABLED=true` .                                                                                                                                                                                |

## Change Agent Hostname

Configure your application level tracers to submit traces to a custom Agent hostname. The Python Tracing Module automatically looks for and initializes with the ENV variables `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`

```python
import os
from ddtrace import tracer

tracer.configure(
    hostname=os.environ['DD_AGENT_HOST'],
    port=os.environ['DD_TRACE_AGENT_PORT'],
)
```

## Compatibility

Python versions `2.7` and `3.4` and onwards are supported.

### Integrations

#### Web Framework Compatibility

The `ddtrace` library includes support for a number of web frameworks, including:

| Framework                 | Supported Version | PyPi Datadog Documentation                                         |
| ------------------------- | ----------------- | ------------------------------------------------------------------ |
| [aiohttp][12]             | >= 1.2            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#aiohttp |
| [Bottle][13]              | >= 0.11           | http://pypi.datadoghq.com/trace/docs/web_integrations.html#bottle  |
| [Django][14]              | >= 1.8            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#django  |
| [djangorestframework][14] | >= 3.4            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#django  |
| [Falcon][15]              | >= 1.0            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#falcon  |
| [Flask][16]               | >= 0.10           | http://pypi.datadoghq.com/trace/docs/web_integrations.html#flask   |
| [Molten][17]              | >= 0.7.0          | http://pypi.datadoghq.com/trace/docs/web_integrations.html#molten  |
| [Pylons][18]              | >= 0.9.6          | http://pypi.datadoghq.com/trace/docs/web_integrations.html#pylons  |
| [Pyramid][19]             | >= 1.7            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#pyramid |
| [Tornado][20]             | >= 4.0            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#tornado |

#### Datastore Compatibility

The `ddtrace` library includes support for the following data stores:

| Datastore                          | Supported Version | PyPi Datadog Documentation                                                                    |
| ---------------------------------- | ----------------- | --------------------------------------------------------------------------------------------- |
| [Cassandra][21]                    | >= 3.5            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#cassandra                           |
| [Elasticsearch][22]                | >= 1.6            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#elasticsearch                       |
| [Flask Cache][23]                  | >= 0.12           | http://pypi.datadoghq.com/trace/docs/db_integrations.html#flask-cache                         |
| [Memcached][24] [pylibmc][25]      | >= 1.4            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#pylibmc                             |
| [Memcached][24] [pymemcache][26]   | >= 1.3            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#pymemcache                          |
| [MongoDB][27] [Mongoengine][28]    | >= 0.11           | http://pypi.datadoghq.com/trace/docs/db_integrations.html#mongoengine                         |
| [MongoDB][27] [Pymongo][29]        | >= 3.0            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#pymongo                             |
| [MySQL][30] [MySQL-python][31]     | >= 1.2.3          | http://pypi.datadoghq.com/trace/docs/db_integrations.html#module-ddtrace.contrib.mysqldb      |
| [MySQL][30] [mysqlclient][32]      | >= 1.3            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#module-ddtrace.contrib.mysqldb      |
| [MySQL][30] mysql-connector        | >= 2.1            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#mysql-connector                     |
| [Postgres][33] [aiopg][34]         | >= 0.12.0         | http://pypi.datadoghq.com/trace/docs/db_integrations.html#aiopg                               |
| [Postgres][33] [psycopg][35]       | >= 2.4            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#module-ddtrace.contrib.psycopg      |
| [Redis][36]                        | >= 2.6            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#redis                               |
| [Redis][36] [redis-py-cluster][37] | >= 1.3.5          | http://pypi.datadoghq.com/trace/docs/db_integrations.html#module-ddtrace.contrib.rediscluster |
| [SQLAlchemy][38]                   | >= 1.0            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#sqlalchemy                          |
| [SQLite3][39]                      | Fully Supported   | http://pypi.datadoghq.com/trace/docs/db_integrations.html#sqlite                              |
| [Vertica][40]                      | >= 0.6            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#vertica                             |

#### Library Compatibility

The `ddtrace` library includes support for the following libraries:

| Library           | Supported Version | PyPi Datadog Documentation                                               |
| ----------------- | ----------------- | ------------------------------------------------------------------------ |
| [asyncio][41]     | Fully Supported   | http://pypi.datadoghq.com/trace/docs/async_integrations.html#asyncio     |
| [gevent][42]      | >= 1.0            | http://pypi.datadoghq.com/trace/docs/async_integrations.html#gevent      |
| [aiobotocore][43] | >= 0.2.3          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#aiobotocore |
| [Boto2][43]       | >= 2.29.0         | http://pypi.datadoghq.com/trace/docs/other_integrations.html#boto2       |
| [Botocore][43]    | >= 1.4.51         | http://pypi.datadoghq.com/trace/docs/other_integrations.html#botocore    |
| [Celery][44]      | >= 4.0.2          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#celery      |
| [Futures][45]     | Fully Supported   | http://pypi.datadoghq.com/trace/docs/other_integrations.html#futures     |
| [Grpc][46]        | >= 1.8.0          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#grpc        |
| [httplib][47]     | Fully Supported   | http://pypi.datadoghq.com/trace/docs/other_integrations.html#httplib     |
| [Jinja2][48]      | >= 2.7            | http://pypi.datadoghq.com/trace/docs/other_integrations.html#jinja2      |
| [Kombu][49]       | >= 4.0            | http://pypi.datadoghq.com/trace/docs/other_integrations.html#kombu       |
| [Mako][50]        | >= 0.1.0          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#mako        |
| [Requests][51]    | >= 2.08           | http://pypi.datadoghq.com/trace/docs/other_integrations.html#requests    |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/docs
[2]: /tracing/send_traces/
[3]: /tracing/setup/docker/
[4]: /agent/kubernetes/apm/
[5]: http://pypi.datadoghq.com/trace/docs
[6]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtracerun
[7]: /tracing/guide/setting_primary_tags_to_scope/
[8]: http://pypi.datadoghq.com/trace/docs/web_integrations.html?highlight=django#django
[9]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#priority-sampling
[10]: /tracing/connect_logs_and_traces/python/
[11]: /tracing/app_analytics/?tab=python#automatic-configuration
[12]: https://aiohttp.readthedocs.io
[13]: https://bottlepy.org
[14]: https://www.djangoproject.com
[15]: https://falconframework.org
[16]: http://flask.pocoo.org
[17]: https://moltenframework.com
[18]: http://pylonsproject.org
[19]: https://trypyramid.com
[20]: http://www.tornadoweb.org
[21]: https://cassandra.apache.org
[22]: https://www.elastic.co/products/elasticsearch
[23]: https://pythonhosted.org/Flask-Cache
[24]: https://memcached.org
[25]: http://sendapatch.se/projects/pylibmc
[26]: https://pymemcache.readthedocs.io
[27]: https://www.mongodb.com/what-is-mongodb
[28]: http://mongoengine.org
[29]: https://api.mongodb.com/python/current
[30]: https://www.mysql.com
[31]: https://pypi.org/project/MySQL-python
[32]: https://pypi.org/project/mysqlclient
[33]: https://www.postgresql.org
[34]: https://aiopg.readthedocs.io
[35]: http://initd.org/psycopg
[36]: https://redis.io
[37]: https://redis-py-cluster.readthedocs.io
[38]: https://www.sqlalchemy.org
[39]: https://www.sqlite.org
[40]: https://www.vertica.com
[41]: https://docs.python.org/3/library/asyncio.html
[42]: http://www.gevent.org
[43]: http://docs.pythonboto.org/en/latest
[44]: http://www.celeryproject.org
[45]: https://docs.python.org/3/library/concurrent.futures.html
[46]: https://grpc.io
[47]: https://docs.python.org/2/library/httplib.html
[48]: http://jinja.pocoo.org
[49]: https://kombu.readthedocs.io/en/latest
[50]: https://www.makotemplates.org
[51]: http://docs.python-requests.org/en/master
