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
- link: "tracing/advanced/"
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

## Change Agent Hostname

Configure your application level tracers to submit traces to a custom Agent hostname:

The Python Tracing Module automatically looks for and initializes with the ENV variables `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`

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

| Framework                | Supported Version | PyPi Datadog Documentation                                         |
|--------------------------|-------------------|--------------------------------------------------------------------|
| [aiohttp][5]             | >= 1.2            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#aiohttp |
| [Bottle][6]              | >= 0.11           | http://pypi.datadoghq.com/trace/docs/web_integrations.html#bottle  |
| [Django][7]              | >= 1.8            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#django  |
| [djangorestframework][7] | >= 3.4            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#django  |
| [Falcon][8]              | >= 1.0            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#falcon  |
| [Flask][9]               | >= 0.10           | http://pypi.datadoghq.com/trace/docs/web_integrations.html#flask   |
| [Molten][10]             | >= 0.7.0          | http://pypi.datadoghq.com/trace/docs/web_integrations.html#molten  |
| [Pylons][11]             | >= 0.9.6          | http://pypi.datadoghq.com/trace/docs/web_integrations.html#pylons  |
| [Pyramid][12]            | >= 1.7            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#pyramid |
| [Tornado][13]            | >= 4.0            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#tornado |

#### Datastore Compatibility

The `ddtrace` library includes support for the following data stores:

| Datastore                          | Supported Version | PyPi Datadog Documentation                                                                    |
|------------------------------------|-------------------|-----------------------------------------------------------------------------------------------|
| [Cassandra][14]                    | >= 3.5            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#cassandra                           |
| [Elasticsearch][15]                | >= 1.6            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#elasticsearch                       |
| [Flask Cache][16]                  | >= 0.12           | http://pypi.datadoghq.com/trace/docs/db_integrations.html#flask-cache                         |
| [Memcached][17] [pylibmc][18]      | >= 1.4            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#pylibmc                             |
| [Memcached][17] [pymemcache][19]   | >= 1.3            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#pymemcache                          |
| [MongoDB][20] [Mongoengine][21]    | >= 0.11           | http://pypi.datadoghq.com/trace/docs/db_integrations.html#mongoengine                         |
| [MongoDB][20] [Pymongo][22]        | >= 3.0            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#pymongo                             |
| [MySQL][23] [MySQL-python][24]     | >= 1.2.3          | http://pypi.datadoghq.com/trace/docs/db_integrations.html#module-ddtrace.contrib.mysqldb      |
| [MySQL][23] [mysqlclient][25]      | >= 1.3            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#module-ddtrace.contrib.mysqldb      |
| [MySQL][23] mysql-connector        | >= 2.1            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#mysql-connector                     |
| [Postgres][26] [aiopg][27]         | >= 0.12.0         | http://pypi.datadoghq.com/trace/docs/db_integrations.html#aiopg                               |
| [Postgres][26] [psycopg][28]       | >= 2.4            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#module-ddtrace.contrib.psycopg      |
| [Redis][29]                        | >= 2.6            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#redis                               |
| [Redis][29] [redis-py-cluster][30] | >= 1.3.5          | http://pypi.datadoghq.com/trace/docs/db_integrations.html#module-ddtrace.contrib.rediscluster |
| [SQLAlchemy][31]                   | >= 1.0            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#sqlalchemy                          |
| [SQLite3][32]                      | Fully Supported   | http://pypi.datadoghq.com/trace/docs/db_integrations.html#sqlite                              |
| [Vertica][33]                      | >= 0.6            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#vertica                             |

#### Library Compatibility

The `ddtrace` library includes support for the following libraries:

| Library           | Supported Version | PyPi Datadog Documentation                                               |
|-------------------|-------------------|--------------------------------------------------------------------------|
| [asyncio][34]     | Fully Supported   | http://pypi.datadoghq.com/trace/docs/async_integrations.html#asyncio     |
| [gevent][35]      | >= 1.0            | http://pypi.datadoghq.com/trace/docs/async_integrations.html#gevent      |
| [aiobotocore][36] | >= 0.2.3          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#aiobotocore |
| [Boto2][36]       | >= 2.29.0         | http://pypi.datadoghq.com/trace/docs/other_integrations.html#boto2       |
| [Botocore][36]    | >= 1.4.51         | http://pypi.datadoghq.com/trace/docs/other_integrations.html#botocore    |
| [Celery][37]      | >= 4.0.2          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#celery      |
| [Futures][38]     | Fully Supported   | http://pypi.datadoghq.com/trace/docs/other_integrations.html#futures     |
| [Grpc][39]        | >= 1.8.0          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#grpc        |
| [httplib][40]     | Fully Supported   | http://pypi.datadoghq.com/trace/docs/other_integrations.html#httplib     |
| [Jinja2][41]      | >= 2.7            | http://pypi.datadoghq.com/trace/docs/other_integrations.html#jinja2      |
| [Kombu][42]       | >= 4.0            | http://pypi.datadoghq.com/trace/docs/other_integrations.html#kombu       |
| [Mako][43]        | >= 0.1.0          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#mako        |
| [Requests][44]    | >= 2.08           | http://pypi.datadoghq.com/trace/docs/other_integrations.html#requests    |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/send_traces
[2]: /tracing/setup/docker
[3]: /agent/kubernetes/daemonset_setup/#trace-collection
[4]: http://pypi.datadoghq.com/trace/docs
[5]: https://aiohttp.readthedocs.io
[6]: https://bottlepy.org
[7]: https://www.djangoproject.com
[8]: https://falconframework.org
[9]: http://flask.pocoo.org
[10]: https://moltenframework.com
[11]: http://pylonsproject.org
[12]: https://trypyramid.com
[13]: http://www.tornadoweb.org
[14]: https://cassandra.apache.org
[15]: https://www.elastic.co/products/elasticsearch
[16]: https://pythonhosted.org/Flask-Cache
[17]: https://memcached.org
[18]: http://sendapatch.se/projects/pylibmc
[19]: https://pymemcache.readthedocs.io
[20]: https://www.mongodb.com/what-is-mongodb
[21]: http://mongoengine.org
[22]: https://api.mongodb.com/python/current
[23]: https://www.mysql.com
[24]: https://pypi.org/project/MySQL-python
[25]: https://pypi.org/project/mysqlclient
[26]: https://www.postgresql.org
[27]: https://aiopg.readthedocs.io
[28]: http://initd.org/psycopg
[29]: https://redis.io
[30]: https://redis-py-cluster.readthedocs.io
[31]: https://www.sqlalchemy.org
[32]: https://www.sqlite.org
[33]: https://www.vertica.com
[34]: https://docs.python.org/3/library/asyncio.html
[35]: http://www.gevent.org
[36]: http://docs.pythonboto.org/en/latest
[37]: http://www.celeryproject.org
[38]: https://docs.python.org/3/library/concurrent.futures.html
[39]: https://grpc.io
[40]: https://docs.python.org/2/library/httplib.html
[41]: http://jinja.pocoo.org
[42]: https://kombu.readthedocs.io/en/latest
[43]: https://www.makotemplates.org
[44]: http://docs.python-requests.org/en/master
