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

## Configuration

When using **ddtrace-run**, the following [environment variable options][6] can be used:

| Environment Variable               | Default     | Description                                                                                                                                                                                                                                                                 |
| ---------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DD_ENV`                           |             | Set the application’s environment e.g. `prod`, `pre-prod`, `staging`. Learn more about [how to setup your environment][7].                                                                                                                                                  |
| `DD_SERVICE`                       |             | The service name to be used for this application. The value is passed through when setting up middleware for web framework integrations (e.g. Pylons, Flask, Django). For tracing without a web integration, it is recommended that you [set the service name in code](#integrations).      |
| `DD_VERSION`                       |             | Set the application’s version e.g. `1.2.3`, `6c44da20`, `2020.02.13`.                                                                                                                                                                                                       |
| `DD_TAGS`                       |             | A list of default tags to be added to every span, profile, and runtime metric e.g. `layer:api,team:intake`.      |

It is recommended to use `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` to set `env`, `service`, and `version` for your services. Refer to the [Unified Service Tagging][8] documentation for recommendations on how to configure these environment variables.

### Instrumentation

| Environment Variable               | Default     | Description                                                                                                                                                                                                                                                                 |
| ---------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DATADOG_TRACE_ENABLED`            | `true`      | Enable web framework and library instrumentation. When `false`, the application code doesn't generate any traces.                                                                                                                                                           |
| `DATADOG_TRACE_DEBUG`              | `false`     | Enable debug logging in the tracer. Note that this is [not available with Django][9].                                                                                                                                                                                       |
| `DATADOG_PATCH_MODULES`            |             | Override the modules patched for this application execution. It should follow this format: `DATADOG_PATCH_MODULES=module:patch,module:patch...`.                                                                                                                            |
| `DD_AGENT_HOST`                    | `localhost` | Override the address of the trace Agent host that the default tracer attempts to submit traces to.                                                                                                                                                                          |
| `DATADOG_TRACE_AGENT_PORT`         | `8126`      | Override the port that the default tracer submit traces to.                                                                                                                                                                                                                 |
| `DD_TRACE_AGENT_URL`               |             | The URL of the Trace Agent that the tracer submits to. Takes priority over hostname and port, if set. Supports Unix Domain Sockets in combination with the `apm_config.receiver_socket` in your `datadog.yaml` file, or the `DD_APM_RECEIVER_SOCKET` environment variable.  |
| `DATADOG_PRIORITY_SAMPLING`        | `true`      | Enable [Priority Sampling][10].                                                                                                                                                                                                                                              |
| `DD_LOGS_INJECTION`                | `false`     | Enable [connecting logs and traces Injection][11].                                                                                                                                                                                                                           |
| `DD_TRACE_ANALYTICS_ENABLED`       | `false`     | Enable App Analytics globally for [web integrations][12].                                                                                                                                                                                                                   |
| `DD_INTEGRATION_ANALYTICS_ENABLED` | `false`     | Enable App Analytics for a specific integration. Example: `DD_BOTO_ANALYTICS_ENABLED=true` .                                                                                                                                                                                |

## Change Agent Hostname

Configure your application level tracers to submit traces to a custom Agent hostname. The Python Tracing Module automatically looks for and initializes with the ENV variables `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`.

But you can also set the hostname and port in code:

```python
import os
from ddtrace import tracer

tracer.configure(
    hostname="custom-hostname",
    port="1234",
)
```

## Compatibility

Python versions `2.7` and `3.5` and onwards are supported.

### Integrations

#### Web Framework Compatibility

The `ddtrace` library includes support for a number of web frameworks, including:

| Framework                 | Supported Version | PyPi Datadog Documentation                                         |
| ------------------------- | ----------------- | ------------------------------------------------------------------ |
| [aiohttp][13]             | >= 1.2            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#aiohttp |
| [Bottle][14]              | >= 0.11           | http://pypi.datadoghq.com/trace/docs/web_integrations.html#bottle  |
| [Django][15]              | >= 1.8            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#django  |
| [djangorestframework][15] | >= 3.4            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#django  |
| [Falcon][16]              | >= 1.0            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#falcon  |
| [Flask][17]               | >= 0.10           | http://pypi.datadoghq.com/trace/docs/web_integrations.html#flask   |
| [Molten][18]              | >= 0.7.0          | http://pypi.datadoghq.com/trace/docs/web_integrations.html#molten  |
| [Pylons][19]              | >= 0.9.6          | http://pypi.datadoghq.com/trace/docs/web_integrations.html#pylons  |
| [Pyramid][20]             | >= 1.7            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#pyramid |
| [Tornado][21]             | >= 4.0            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#tornado |

#### Datastore Compatibility

The `ddtrace` library includes support for the following data stores:

| Datastore                          | Supported Version | PyPi Datadog Documentation                                                                    |
| ---------------------------------- | ----------------- | --------------------------------------------------------------------------------------------- |
| [Cassandra][22]                    | >= 3.5            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#cassandra                           |
| [Elasticsearch][23]                | >= 1.6            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#elasticsearch                       |
| [Flask Cache][24]                  | >= 0.12           | http://pypi.datadoghq.com/trace/docs/db_integrations.html#flask-cache                         |
| [Memcached][25] [pylibmc][26]      | >= 1.4            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#pylibmc                             |
| [Memcached][25] [pymemcache][27]   | >= 1.3            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#pymemcache                          |
| [MongoDB][28] [Mongoengine][29]    | >= 0.11           | http://pypi.datadoghq.com/trace/docs/db_integrations.html#mongoengine                         |
| [MongoDB][28] [Pymongo][30]        | >= 3.0            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#pymongo                             |
| [MySQL][31] [MySQL-python][32]     | >= 1.2.3          | http://pypi.datadoghq.com/trace/docs/db_integrations.html#module-ddtrace.contrib.mysqldb      |
| [MySQL][31] [mysqlclient][33]      | >= 1.3            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#module-ddtrace.contrib.mysqldb      |
| [MySQL][31] mysql-connector        | >= 2.1            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#mysql-connector                     |
| [Postgres][34] [aiopg][35]         | >= 0.12.0         | http://pypi.datadoghq.com/trace/docs/db_integrations.html#aiopg                               |
| [Postgres][34] [psycopg][36]       | >= 2.4            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#module-ddtrace.contrib.psycopg      |
| [Redis][37]                        | >= 2.6            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#redis                               |
| [Redis][37] [redis-py-cluster][38] | >= 1.3.5          | http://pypi.datadoghq.com/trace/docs/db_integrations.html#module-ddtrace.contrib.rediscluster |
| [SQLAlchemy][39]                   | >= 1.0            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#sqlalchemy                          |
| [SQLite3][40]                      | Fully Supported   | http://pypi.datadoghq.com/trace/docs/db_integrations.html#sqlite                              |
| [Vertica][41]                      | >= 0.6            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#vertica                             |

#### Library Compatibility

The `ddtrace` library includes support for the following libraries:

| Library           | Supported Version | PyPi Datadog Documentation                                               |
| ----------------- | ----------------- | ------------------------------------------------------------------------ |
| [asyncio][42]     | Fully Supported   | http://pypi.datadoghq.com/trace/docs/async_integrations.html#asyncio     |
| [gevent][43]      | >= 1.0            | http://pypi.datadoghq.com/trace/docs/async_integrations.html#gevent      |
| [aiobotocore][44] | >= 0.2.3          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#aiobotocore |
| [Boto2][44]       | >= 2.29.0         | http://pypi.datadoghq.com/trace/docs/other_integrations.html#boto2       |
| [Botocore][44]    | >= 1.4.51         | http://pypi.datadoghq.com/trace/docs/other_integrations.html#botocore    |
| [Celery][45]      | >= 4.0.2          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#celery      |
| [Futures][46]     | Fully Supported   | http://pypi.datadoghq.com/trace/docs/other_integrations.html#futures     |
| [Grpc][47]        | >= 1.8.0          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#grpc        |
| [httplib][48]     | Fully Supported   | http://pypi.datadoghq.com/trace/docs/other_integrations.html#httplib     |
| [Jinja2][49]      | >= 2.7            | http://pypi.datadoghq.com/trace/docs/other_integrations.html#jinja2      |
| [Kombu][50]       | >= 4.0            | http://pypi.datadoghq.com/trace/docs/other_integrations.html#kombu       |
| [Mako][51]        | >= 0.1.0          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#mako        |
| [Requests][52]    | >= 2.08           | http://pypi.datadoghq.com/trace/docs/other_integrations.html#requests    |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/install
[2]: /tracing/send_traces/
[3]: /tracing/setup/docker/
[4]: /agent/kubernetes/apm/
[5]: http://pypi.datadoghq.com/trace/docs
[6]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtracerun
[7]: /tracing/guide/setting_primary_tags_to_scope/
[8]: /getting_started/tagging/unified_service_tagging/
[9]: http://pypi.datadoghq.com/trace/docs/web_integrations.html?highlight=django#django
[10]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#priority-sampling
[11]: /tracing/connect_logs_and_traces/python/
[12]: /tracing/app_analytics/?tab=python#automatic-configuration
[13]: https://aiohttp.readthedocs.io
[14]: https://bottlepy.org
[15]: https://www.djangoproject.com
[16]: https://falconframework.org
[17]: http://flask.pocoo.org
[18]: https://moltenframework.com
[19]: http://pylonsproject.org
[20]: https://trypyramid.com
[21]: http://www.tornadoweb.org
[22]: https://cassandra.apache.org
[23]: https://www.elastic.co/products/elasticsearch
[24]: https://pythonhosted.org/Flask-Cache
[25]: https://memcached.org
[26]: http://sendapatch.se/projects/pylibmc
[27]: https://pymemcache.readthedocs.io
[28]: https://www.mongodb.com/what-is-mongodb
[29]: http://mongoengine.org
[30]: https://api.mongodb.com/python/current
[31]: https://www.mysql.com
[32]: https://pypi.org/project/MySQL-python
[33]: https://pypi.org/project/mysqlclient
[34]: https://www.postgresql.org
[35]: https://aiopg.readthedocs.io
[36]: http://initd.org/psycopg
[37]: https://redis.io
[38]: https://redis-py-cluster.readthedocs.io
[39]: https://www.sqlalchemy.org
[40]: https://www.sqlite.org
[41]: https://www.vertica.com
[42]: https://docs.python.org/3/library/asyncio.html
[43]: http://www.gevent.org
[44]: http://docs.pythonboto.org/en/latest
[45]: http://www.celeryproject.org
[46]: https://docs.python.org/3/library/concurrent.futures.html
[47]: https://grpc.io
[48]: https://docs.python.org/2/library/httplib.html
[49]: http://jinja.pocoo.org
[50]: https://kombu.readthedocs.io/en/latest
[51]: https://www.makotemplates.org
[52]: http://docs.python-requests.org/en/master
