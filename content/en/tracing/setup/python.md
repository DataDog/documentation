---
title: Tracing Python Applications
kind: documentation
aliases:
- /tracing/python/
- /tracing/languages/python/
- /agent/apm/python/
further_reading:
- link: "https://github.com/DataDog/dd-trace-py"
  tag: "GitHub"
  text: "Source code"
- link: "http://pypi.datadoghq.com/trace/docs/"
  tag: "Pypi"
  text: "API Docs"
- link: "tracing/visualization/"
  tag: "Documentation"
  text: "Explore your services, resources and traces"
- link: "tracing/"
  tag: "Advanced Usage"
  text: "Advanced Usage"
---

<div class="alert alert-info">
For Python Django applications, note that tracing is disabled when your application is launched in <code>DEBUG</code> mode. Find more <a href="http://pypi.datadoghq.com/trace/docs/web_integrations.html#django">here</a>.
</div>

## Installation and Getting Started

<div class="alert alert-info">If you already have a Datadog account you can find step-by-step instructions in our in-app guides for <a href="https://app.datadoghq.com/apm/docs?architecture=host-based&language=python" target=_blank> host-based</a> and <a href="https://app.datadoghq.com/apm/docs?architecture=container-based&language=python" target=_blank>container-based</a> set ups.</div>

To begin tracing applications written in Python, first [install and configure the Datadog Agent][1], see the additional documentation for [tracing Docker applications][2] or [Kubernetes applications][3].

Next, install the Datadog Tracing library, `ddtrace`, using pip:

```python
pip install ddtrace
```

Then to instrument your Python application use the included `ddtrace-run` command. To use it, prefix your Python entry-point command with `ddtrace-run`.

For example, if your application is started with `python app.py` then:

```sh
$ ddtrace-run python app.py
```

For more advanced usage, configuration, and fine-grain control, see Datadog's [API documentation][4].

### Environment variable

When using **ddtrace-run**, the following [environment variable options][5] can be used:

| Environment Variable               | Default     | Description                                                                                                                                                                                                                                                                 |
|------------------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DATADOG_TRACE_ENABLED`            | `true`      | Enable web framework and library instrumentation. When `false`, your application code doesn't generate any traces.                                                                                                                                                          |
| `DATADOG_ENV`                      | `null`      | Set an application’s environment e.g. `prod`, `pre-prod`, `staging`. Learn more about [how to setup your environment][6].                                                                                                                                                   |
| `DATADOG_TRACE_DEBUG`              | `false`     | Enable debug logging in the tracer. Note that this is [not available with Django][7].                                                                                                                                                                                       |
| `DATADOG_SERVICE_NAME`             | `null`      | Override the service name to be used for this program. The value is passed through when setting up middleware for web framework integrations (e.g. pylons, flask, django). For tracing without a web integration, [prefer setting the service name in code](#integrations). |
| `DATADOG_PATCH_MODULES`            | `none`      | Override the modules patched for this program execution. It should follow this format: `DATADOG_PATCH_MODULES=module:patch,module:patch...`.                                                                                                                                |
| `DD_AGENT_HOST`                    | `localhost` | Override the address of the trace Agent host that the default tracer attempts to submit traces to.                                                                                                                                                                          |
| `DATADOG_TRACE_AGENT_PORT`         | `8126`      | Override the port that the default tracer submit traces to.                                                                                                                                                                                                                 |
| `DATADOG_PRIORITY_SAMPLING`        | `true`      | Enable [Priority Sampling][8].                                                                                                                                                                                                                                              |
| `DD_LOGS_INJECTION`                | `false`     | Enable [connecting logs and traces Injection][9].                                                                                                                                                                                                                           |
| `DD_TRACE_ANALYTICS_ENABLED`       | `false`     | Enable App Analytics globally for [web integrations][10].                                                                                                                                                                                                                   |
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
|---------------------------|-------------------|--------------------------------------------------------------------|
| [aiohttp][11]             | >= 1.2            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#aiohttp |
| [Bottle][12]              | >= 0.11           | http://pypi.datadoghq.com/trace/docs/web_integrations.html#bottle  |
| [Django][13]              | >= 1.8            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#django  |
| [djangorestframework][13] | >= 3.4            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#django  |
| [Falcon][14]              | >= 1.0            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#falcon  |
| [Flask][15]               | >= 0.10           | http://pypi.datadoghq.com/trace/docs/web_integrations.html#flask   |
| [Molten][16]              | >= 0.7.0          | http://pypi.datadoghq.com/trace/docs/web_integrations.html#molten  |
| [Pylons][17]              | >= 0.9.6          | http://pypi.datadoghq.com/trace/docs/web_integrations.html#pylons  |
| [Pyramid][18]             | >= 1.7            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#pyramid |
| [Tornado][19]             | >= 4.0            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#tornado |

#### Datastore Compatibility

The `ddtrace` library includes support for the following data stores:

| Datastore                          | Supported Version | PyPi Datadog Documentation                                                                    |
|------------------------------------|-------------------|-----------------------------------------------------------------------------------------------|
| [Cassandra][20]                    | >= 3.5            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#cassandra                           |
| [Elasticsearch][21]                | >= 1.6            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#elasticsearch                       |
| [Flask Cache][22]                  | >= 0.12           | http://pypi.datadoghq.com/trace/docs/db_integrations.html#flask-cache                         |
| [Memcached][23] [pylibmc][24]      | >= 1.4            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#pylibmc                             |
| [Memcached][23] [pymemcache][25]   | >= 1.3            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#pymemcache                          |
| [MongoDB][26] [Mongoengine][27]    | >= 0.11           | http://pypi.datadoghq.com/trace/docs/db_integrations.html#mongoengine                         |
| [MongoDB][26] [Pymongo][28]        | >= 3.0            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#pymongo                             |
| [MySQL][29] [MySQL-python][30]     | >= 1.2.3          | http://pypi.datadoghq.com/trace/docs/db_integrations.html#module-ddtrace.contrib.mysqldb      |
| [MySQL][29] [mysqlclient][31]      | >= 1.3            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#module-ddtrace.contrib.mysqldb      |
| [MySQL][29] mysql-connector        | >= 2.1            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#mysql-connector                     |
| [Postgres][32] [aiopg][33]         | >= 0.12.0         | http://pypi.datadoghq.com/trace/docs/db_integrations.html#aiopg                               |
| [Postgres][32] [psycopg][34]       | >= 2.4            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#module-ddtrace.contrib.psycopg      |
| [Redis][35]                        | >= 2.6            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#redis                               |
| [Redis][35] [redis-py-cluster][36] | >= 1.3.5          | http://pypi.datadoghq.com/trace/docs/db_integrations.html#module-ddtrace.contrib.rediscluster |
| [SQLAlchemy][37]                   | >= 1.0            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#sqlalchemy                          |
| [SQLite3][38]                      | Fully Supported   | http://pypi.datadoghq.com/trace/docs/db_integrations.html#sqlite                              |
| [Vertica][39]                      | >= 0.6            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#vertica                             |

#### Library Compatibility

The `ddtrace` library includes support for the following libraries:

| Library           | Supported Version | PyPi Datadog Documentation                                               |
|-------------------|-------------------|--------------------------------------------------------------------------|
| [asyncio][40]     | Fully Supported   | http://pypi.datadoghq.com/trace/docs/async_integrations.html#asyncio     |
| [gevent][41]      | >= 1.0            | http://pypi.datadoghq.com/trace/docs/async_integrations.html#gevent      |
| [aiobotocore][42] | >= 0.2.3          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#aiobotocore |
| [Boto2][42]       | >= 2.29.0         | http://pypi.datadoghq.com/trace/docs/other_integrations.html#boto2       |
| [Botocore][42]    | >= 1.4.51         | http://pypi.datadoghq.com/trace/docs/other_integrations.html#botocore    |
| [Celery][43]      | >= 4.0.2          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#celery      |
| [Futures][44]     | Fully Supported   | http://pypi.datadoghq.com/trace/docs/other_integrations.html#futures     |
| [Grpc][45]        | >= 1.8.0          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#grpc        |
| [httplib][46]     | Fully Supported   | http://pypi.datadoghq.com/trace/docs/other_integrations.html#httplib     |
| [Jinja2][47]      | >= 2.7            | http://pypi.datadoghq.com/trace/docs/other_integrations.html#jinja2      |
| [Kombu][48]       | >= 4.0            | http://pypi.datadoghq.com/trace/docs/other_integrations.html#kombu       |
| [Mako][49]        | >= 0.1.0          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#mako        |
| [Requests][50]    | >= 2.08           | http://pypi.datadoghq.com/trace/docs/other_integrations.html#requests    |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/send_traces
[2]: /tracing/setup/docker
[3]: /agent/kubernetes/daemonset_setup/#trace-collection
[4]: http://pypi.datadoghq.com/trace/docs
[5]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtracerun
[6]: /tracing/guide/setting_primary_tags_to_scope/
[7]: http://pypi.datadoghq.com/trace/docs/web_integrations.html?highlight=django#django
[8]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#priority-sampling
[9]: /tracing/connect_logs_and_traces/?tab=python
[10]: /tracing/app_analytics/?tab=python#automatic-configuration
[11]: https://aiohttp.readthedocs.io
[12]: https://bottlepy.org
[13]: https://www.djangoproject.com
[14]: https://falconframework.org
[15]: http://flask.pocoo.org
[16]: https://moltenframework.com
[17]: http://pylonsproject.org
[18]: https://trypyramid.com
[19]: http://www.tornadoweb.org
[20]: https://cassandra.apache.org
[21]: https://www.elastic.co/products/elasticsearch
[22]: https://pythonhosted.org/Flask-Cache
[23]: https://memcached.org
[24]: http://sendapatch.se/projects/pylibmc
[25]: https://pymemcache.readthedocs.io
[26]: https://www.mongodb.com/what-is-mongodb
[27]: http://mongoengine.org
[28]: https://api.mongodb.com/python/current
[29]: https://www.mysql.com
[30]: https://pypi.org/project/MySQL-python
[31]: https://pypi.org/project/mysqlclient
[32]: https://www.postgresql.org
[33]: https://aiopg.readthedocs.io
[34]: http://initd.org/psycopg
[35]: https://redis.io
[36]: https://redis-py-cluster.readthedocs.io
[37]: https://www.sqlalchemy.org
[38]: https://www.sqlite.org
[39]: https://www.vertica.com
[40]: https://docs.python.org/3/library/asyncio.html
[41]: http://www.gevent.org
[42]: http://docs.pythonboto.org/en/latest
[43]: http://www.celeryproject.org
[44]: https://docs.python.org/3/library/concurrent.futures.html
[45]: https://grpc.io
[46]: https://docs.python.org/2/library/httplib.html
[47]: http://jinja.pocoo.org
[48]: https://kombu.readthedocs.io/en/latest
[49]: https://www.makotemplates.org
[50]: http://docs.python-requests.org/en/master
