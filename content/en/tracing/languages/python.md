---
title: Tracing Python Applications
kind: Documentation
aliases:
- /tracing/python/
- /tracing/setup/python/
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
- link: "tracing/advanced_usage/?tab=python"
  tag: "Advanced Usage"
  text: "Advanced Usage"
---

<div class="alert alert-info">
For Python Django applications, note that tracing is disabled when your application is launched in <code>DEBUG</code> mode. Find more <a href="http://pypi.datadoghq.com/trace/docs/web_integrations.html#django">here</a>.
</div>

## Installation and Getting Started

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


## Compatibility

Python versions `2.7` and `3.4` and onwards are supported.

### Integrations

#### Web Framework Compatibility

The `ddtrace` library includes support for a number of web frameworks, including:

|                Framework                 |  Support Type   |                     PyPi Datadog Documentation                     |
| ---------------------------------------- | --------------- | ------------------------------------------------------------------ |
| [Aiohttp][5]          | Fully Supported | http://pypi.datadoghq.com/trace/docs/web_integrations.html#aiohttp  |
| [Bottle][6]          | Fully Supported | http://pypi.datadoghq.com/trace/docs/web_integrations.html#bottle  |
| [Django][7] | Fully Supported | http://pypi.datadoghq.com/trace/docs/web_integrations.html#django  |
| [Falcon][8]   | Fully Supported | http://pypi.datadoghq.com/trace/docs/web_integrations.html#falcon  |
| [Flask][9]         | Fully Supported | http://pypi.datadoghq.com/trace/docs/web_integrations.html#flask   |
| [Molten][10]         | Fully Supported | http://pypi.datadoghq.com/trace/docs/web_integrations.html#molten   |
| [Pylons][11]      | Fully Supported | http://pypi.datadoghq.com/trace/docs/web_integrations.html#pylons  |
| [Pyramid][12]       | Fully Supported | http://pypi.datadoghq.com/trace/docs/web_integrations.html#pyramid |
| [Requests][13]          | Fully Supported | http://pypi.datadoghq.com/trace/docs/other_integrations.html#requests  |
| [Tornado][14]       | Fully Supported | http://pypi.datadoghq.com/trace/docs/web_integrations.html#tornado |

To add your own distributed tracing check the [Datadog API documentation][15].

#### Datastore Compatibility

The `ddtrace` library includes support for the following data stores:

|                           Datastore                            |  Support Type   |                       PyPi Datadog Documentation                        |
| -------------------------------------------------------------- | --------------- | ----------------------------------------------------------------------- |
| [Cassandra][16]                     | Fully Supported | http://pypi.datadoghq.com/trace/docs/db_integrations.html#cassandra     |
| [Elasticsearch][17] | Fully Supported | http://pypi.datadoghq.com/trace/docs/db_integrations.html#elasticsearch |
| [Flask Cache][18]           | Fully Supported | http://pypi.datadoghq.com/trace/docs/db_integrations.html#flask-cache   |
| [MongoDB][19]             | Fully Supported | http://pypi.datadoghq.com/trace/docs/db_integrations.html#mongodb       |
| [Memcached][20]                            | Fully Supported | http://pypi.datadoghq.com/trace/docs/db_integrations.html#memcached     |
| [MySQL][21]                                | Fully Supported | http://pypi.datadoghq.com/trace/docs/db_integrations.html#mysql         |
| [Postgres][22]                        | Fully Supported | http://pypi.datadoghq.com/trace/docs/db_integrations.html#postgres      |
| [Redis][23]                                     | Fully Supported | http://pypi.datadoghq.com/trace/docs/db_integrations.html#redis         |
| [SQLAlchemy][24]                      | Fully Supported | http://pypi.datadoghq.com/trace/docs/db_integrations.html#sqlalchemy    |
| [SQLite][25]                              | Fully Supported | http://pypi.datadoghq.com/trace/docs/db_integrations.html#sqlite        |


#### Library Compatibility

The `ddtrace` library includes support for the following libraries:

|                               Library                                |  Support Type   |                      PyPi Datadog Documentation                       |
| -------------------------------------------------------------------- | --------------- | --------------------------------------------------------------------- |
| Async Libraries                                                      | Fully Supported | http://pypi.datadoghq.com/trace/docs/async_integrations.html          |
| [Boto][26]                        | Fully Supported | http://pypi.datadoghq.com/trace/docs/other_integrations.html#boto     |
| [Futures][27] | Fully Supported | http://pypi.datadoghq.com/trace/docs/other_integrations.html#futures  |
| [Celery][28]                              | Fully Supported | http://pypi.datadoghq.com/trace/docs/other_integrations.html#celery   |
| [httplib][29]            | Fully Supported | http://pypi.datadoghq.com/trace/docs/other_integrations.html#httplib  |
| [Jinja2][30]                                    | Fully Supported | http://pypi.datadoghq.com/trace/docs/other_integrations.html#jinja2   |
| [Kombu][31]                     | Fully Supported | http://pypi.datadoghq.com/trace/docs/other_integrations.html#kombu    |
| [Requests][32]               | Fully Supported | http://pypi.datadoghq.com/trace/docs/other_integrations.html#requests |


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup
[2]: /tracing/setup/docker
[3]: /agent/kubernetes/daemonset_setup/#trace-collection
[4]: http://pypi.datadoghq.com/trace/docs
[5]: https://aiohttp.readthedocs.io/
[6]: https://bottlepy.org
[7]: https://www.djangoproject.com
[8]: https://falconframework.org
[9]: http://flask.pocoo.org
[10]: https://moltenframework.com
[11]: http://pylonsproject.org
[12]: https://trypyramid.com
[13]: http://www.tornadoweb.org
[14]: http://docs.python-requests.org/en/master/
[15]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#http-client
[16]: https://cassandra.apache.org
[17]: https://www.elastic.co/products/elasticsearch
[18]: https://pythonhosted.org/Flask-Cache
[19]: https://www.mongodb.com/what-is-mongodb
[20]: https://memcached.org
[21]: https://www.mysql.com
[22]: https://www.postgresql.org
[23]: https://redis.io
[24]: https://www.sqlalchemy.org
[25]: https://www.sqlite.org
[26]: http://docs.pythonboto.org/en/latest
[27]: https://docs.python.org/3/library/concurrent.futures.html
[28]: http://www.celeryproject.org
[29]: https://docs.python.org/2/library/httplib.html
[30]: http://jinja.pocoo.org
[31]: https://kombu.readthedocs.io/en/latest
[32]: http://docs.python-requests.org/en/master
