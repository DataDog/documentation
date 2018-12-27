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
| [Bottle][5]          | Fully Supported | http://pypi.datadoghq.com/trace/docs/web_integrations.html#bottle  |
| [Django][6] | Fully Supported | http://pypi.datadoghq.com/trace/docs/web_integrations.html#django  |
| [Falcon][7]   | Fully Supported | http://pypi.datadoghq.com/trace/docs/web_integrations.html#falcon  |
| [Flask][8]         | Fully Supported | http://pypi.datadoghq.com/trace/docs/web_integrations.html#flask   |
| [Pylons][9]      | Fully Supported | http://pypi.datadoghq.com/trace/docs/web_integrations.html#pylons  |
| [Pyramid][10]       | Fully Supported | http://pypi.datadoghq.com/trace/docs/web_integrations.html#pyramid |

#### Datastore Compatibility

The `ddtrace` library includes support for the following data stores:

|                           Datastore                            |  Support Type   |                       PyPi Datadog Documentation                        |
| -------------------------------------------------------------- | --------------- | ----------------------------------------------------------------------- |
| [Cassandra][11]                     | Fully Supported | http://pypi.datadoghq.com/trace/docs/db_integrations.html#cassandra     |
| [Elasticsearch][12] | Fully Supported | http://pypi.datadoghq.com/trace/docs/db_integrations.html#elasticsearch |
| [Flask Cache][13]           | Fully Supported | http://pypi.datadoghq.com/trace/docs/db_integrations.html#flask-cache   |
| [MongoDB][14]             | Fully Supported | http://pypi.datadoghq.com/trace/docs/db_integrations.html#mongodb       |
| [Memcached][15]                            | Fully Supported | http://pypi.datadoghq.com/trace/docs/db_integrations.html#memcached     |
| [MySQL][16]                                | Fully Supported | http://pypi.datadoghq.com/trace/docs/db_integrations.html#mysql         |
| [Postgres][17]                        | Fully Supported | http://pypi.datadoghq.com/trace/docs/db_integrations.html#postgres      |
| [Redis][18]                                     | Fully Supported | http://pypi.datadoghq.com/trace/docs/db_integrations.html#redis         |
| [SQLAlchemy][19]                      | Fully Supported | http://pypi.datadoghq.com/trace/docs/db_integrations.html#sqlalchemy    |
| [SQLite][20]                              | Fully Supported | http://pypi.datadoghq.com/trace/docs/db_integrations.html#sqlite        |


#### Library Compatibility

The `ddtrace` library includes support for the following libraries:

|                               Library                                |  Support Type   |                      PyPi Datadog Documentation                       |
| -------------------------------------------------------------------- | --------------- | --------------------------------------------------------------------- |
| Async Libraries                                                      | Fully Supported | http://pypi.datadoghq.com/trace/docs/async_integrations.html          |
| [Boto][21]                        | Fully Supported | http://pypi.datadoghq.com/trace/docs/other_integrations.html#boto     |
| [Futures][22] | Fully Supported | http://pypi.datadoghq.com/trace/docs/other_integrations.html#futures  |
| [Celery][23]                              | Fully Supported | http://pypi.datadoghq.com/trace/docs/other_integrations.html#celery   |
| [httplib][24]            | Fully Supported | http://pypi.datadoghq.com/trace/docs/other_integrations.html#httplib  |
| [Jinja2][25]                                    | Fully Supported | http://pypi.datadoghq.com/trace/docs/other_integrations.html#jinja2   |
| [Kombu][26]                     | Fully Supported | http://pypi.datadoghq.com/trace/docs/other_integrations.html#kombu    |
| [Requests][27]               | Fully Supported | http://pypi.datadoghq.com/trace/docs/other_integrations.html#requests |


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup
[2]: /tracing/setup/docker
[3]: /agent/kubernetes/daemonset_setup/#trace-collection
[4]: http://pypi.datadoghq.com/trace/docs
[5]: https://bottlepy.org
[6]: https://www.djangoproject.com
[7]: https://falconframework.org
[8]: http://flask.pocoo.org
[9]: http://pylonsproject.org
[10]: https://trypyramid.com
[11]: https://cassandra.apache.org
[12]: https://www.elastic.co/products/elasticsearch
[13]: https://pythonhosted.org/Flask-Cache
[14]: https://www.mongodb.com/what-is-mongodb
[15]: https://memcached.org
[16]: https://www.mysql.com
[17]: https://www.postgresql.org
[18]: https://redis.io
[19]: https://www.sqlalchemy.org
[20]: https://www.sqlite.org
[21]: http://docs.pythonboto.org/en/latest
[22]: https://docs.python.org/3/library/concurrent.futures.html
[23]: http://www.celeryproject.org
[24]: https://docs.python.org/2/library/httplib.html
[25]: http://jinja.pocoo.org
[26]: https://kombu.readthedocs.io/en/latest
[27]: http://docs.python-requests.org/en/master
