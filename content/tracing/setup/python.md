---
title: Tracing Python Applications
kind: Documentation
aliases:
- /tracing/python/
- /tracing/languages/python/
further_reading:
- link: "https://github.com/DataDog/dd-trace-py"
  tag: "Github"
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

To begin tracing applications written in Python, first [install and configure the Datadog Agent][1] (see additional documentation for [tracing Docker applications][2]).

Next, install the Datadog Tracing library, `ddtrace`, using pip:

```python
pip install ddtrace
```

Then to instrument your Python application use the included `ddtrace-run` command. To use it, prefix your Python entry-point command with `ddtrace-run`.

For example, if your application is started with `python app.py` then:

```sh
$ ddtrace-run python app.py
```

For more advanced usage, configuration, and fine-grain control, see Datadog's [API documentation][3].


## Compatibility

Python versions `2.7` and `3.4` and onwards are supported.

### Integrations

#### Web Framework Compatibility

The `ddtrace` library includes support for a number of web frameworks, including:

|                Framework                 |  Support Type   |                     PyPi Datadog Documentation                     |
| ---------------------------------------- | --------------- | ------------------------------------------------------------------ |
| [Bottle][4]          | Fully Supported | http://pypi.datadoghq.com/trace/docs/web_integrations.html#bottle  |
| [Django][5] | Fully Supported | http://pypi.datadoghq.com/trace/docs/web_integrations.html#django  |
| [Falcon][6]   | Fully Supported | http://pypi.datadoghq.com/trace/docs/web_integrations.html#falcon  |
| [Flask][7]         | Fully Supported | http://pypi.datadoghq.com/trace/docs/web_integrations.html#flask   |
| [Pylons][8]      | Fully Supported | http://pypi.datadoghq.com/trace/docs/web_integrations.html#pylons  |
| [Pyramid][9]       | Fully Supported | http://pypi.datadoghq.com/trace/docs/web_integrations.html#pyramid |

#### Datastore Compatibility

The `ddtrace` library includes support for the following data stores:

|                           Datastore                            |  Support Type   |                       PyPi Datadog Documentation                        |
| -------------------------------------------------------------- | --------------- | ----------------------------------------------------------------------- |
| [Cassandra][10]                     | Fully Supported | http://pypi.datadoghq.com/trace/docs/db_integrations.html#cassandra     |
| [Elasticsearch][11] | Fully Supported | http://pypi.datadoghq.com/trace/docs/db_integrations.html#elasticsearch |
| [Flask Cache][12]           | Fully Supported | http://pypi.datadoghq.com/trace/docs/db_integrations.html#flask-cache   |
| [MongoDB][13]             | Fully Supported | http://pypi.datadoghq.com/trace/docs/db_integrations.html#mongodb       |
| [Memcached][14]                            | Fully Supported | http://pypi.datadoghq.com/trace/docs/db_integrations.html#memcached     |
| [MySQL][15]                                | Fully Supported | http://pypi.datadoghq.com/trace/docs/db_integrations.html#mysql         |
| [Postgres][16]                        | Fully Supported | http://pypi.datadoghq.com/trace/docs/db_integrations.html#postgres      |
| [Redis][17]                                     | Fully Supported | http://pypi.datadoghq.com/trace/docs/db_integrations.html#redis         |
| [SQLAlchemy][18]                      | Fully Supported | http://pypi.datadoghq.com/trace/docs/db_integrations.html#sqlalchemy    |
| [SQLite][19]                              | Fully Supported | http://pypi.datadoghq.com/trace/docs/db_integrations.html#sqlite        |


#### Library Compatibility

The `ddtrace` library includes support for the following libraries:

|                               Library                                |  Support Type   |                      PyPi Datadog Documentation                       |
| -------------------------------------------------------------------- | --------------- | --------------------------------------------------------------------- |
| Async Libraries                                                      | Fully Supported | http://pypi.datadoghq.com/trace/docs/async_integrations.html          |
| [Boto][20]                        | Fully Supported | http://pypi.datadoghq.com/trace/docs/other_integrations.html#boto     |
| [Futures][21] | Fully Supported | http://pypi.datadoghq.com/trace/docs/other_integrations.html#futures  |
| [Celery][22]                              | Fully Supported | http://pypi.datadoghq.com/trace/docs/other_integrations.html#celery   |
| [httplib][23]            | Fully Supported | http://pypi.datadoghq.com/trace/docs/other_integrations.html#httplib  |
| [Jinja2][24]                                    | Fully Supported | http://pypi.datadoghq.com/trace/docs/other_integrations.html#jinja2   |
| [Kombu][25]                     | Fully Supported | http://pypi.datadoghq.com/trace/docs/other_integrations.html#kombu    |
| [Requests][26]               | Fully Supported | http://pypi.datadoghq.com/trace/docs/other_integrations.html#requests |


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup
[2]: /tracing/setup/docker
[3]: http://pypi.datadoghq.com/trace/docs
[4]: https://bottlepy.org
[5]: https://www.djangoproject.com
[6]: https://falconframework.org
[7]: http://flask.pocoo.org
[8]: http://pylonsproject.org
[9]: https://trypyramid.com
[10]: https://cassandra.apache.org
[11]: https://www.elastic.co/products/elasticsearch
[12]: https://pythonhosted.org/Flask-Cache
[13]: https://www.mongodb.com/what-is-mongodb
[14]: https://memcached.org
[15]: https://www.mysql.com
[16]: https://www.postgresql.org
[17]: https://redis.io
[18]: https://www.sqlalchemy.org
[19]: https://www.sqlite.org
[20]: http://docs.pythonboto.org/en/latest
[21]: https://docs.python.org/3/library/concurrent.futures.html
[22]: http://www.celeryproject.org
[23]: https://docs.python.org/2/library/httplib.html
[24]: http://jinja.pocoo.org
[25]: https://kombu.readthedocs.io/en/latest
[26]: http://docs.python-requests.org/en/master
