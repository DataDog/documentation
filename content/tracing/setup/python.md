---
title: Tracing Python Applications
kind: Documentation
aliases:
- /tracing/python/
- /tracing/languages/python/
further_reading:
- link: "https://github.com/DataDog/dd-trace-py"
  tag: "Github"
  text: Source code
- link: "http://pypi.datadoghq.com/trace/docs/"
  tag: "Pypi"
  text: API Docs
- link: "tracing/visualization/"
  tag: "Documentation"
  text: "Explore your services, resources and traces"
- link: "tracing/advanced_usage/"
  tag: "Advanced Usage"
  text: "Advanced Usage"
---

<div class="alert alert-info">
For Python applications, note that tracing is disabled when your application is launched in <code>DEBUG</code> mode. Find more <a href="http://pypi.datadoghq.com/trace/docs/#module-ddtrace.contrib.django">here</a>.
</div>

## Installation and Getting Started

To begin tracing applications written in Python, first [install and configure the Datadog Agent][1] (see additional documentation for [tracing Docker applications](/tracing/setup/docker/)).

Next, install the Datadog Tracing library, `ddtrace`, using pip:

```python
pip install ddtrace
```

Then to instrument your Python application use the included `ddtrace-run` command. To use it, prefix your Python entry-point command with `ddtrace-run`.

For example, if your application is started with `python app.py` then:

```sh
$ ddtrace-run python app.py
```

For more advanced usage, configuration, and fine-grain control, see Datadog's [API documentation](http://pypi.datadoghq.com/trace/docs/).


## Compatibility

Python versions `2.7` and `3.4` and onwards are supported.

### Integrations

#### Web Framework Compatibility

The `ddtrace` library includes support for a number of web frameworks, including:

|                Framework                 |  Support Type   |                     PyPi Datadog Documentation                     |
| ---------------------------------------- | --------------- | ------------------------------------------------------------------ |
| [Bottle](https://bottlepy.org/)          | Fully Supported | http://pypi.datadoghq.com/trace/docs/web_integrations.html#bottle  |
| [Django](https://www.djangoproject.com/) | Fully Supported | http://pypi.datadoghq.com/trace/docs/web_integrations.html#django  |
| [Falcon](https://falconframework.org/)   | Fully Supported | http://pypi.datadoghq.com/trace/docs/web_integrations.html#falcon  |
| [Flask](http://flask.pocoo.org/)         | Fully Supported | http://pypi.datadoghq.com/trace/docs/web_integrations.html#flask   |
| [Pylons](http://pylonsproject.org/)      | Fully Supported | http://pypi.datadoghq.com/trace/docs/web_integrations.html#pylons  |
| [Pyramid](https://trypyramid.com/)       | Fully Supported | http://pypi.datadoghq.com/trace/docs/web_integrations.html#pyramid |

#### Datastore Compatibility

The `ddtrace` library includes support for the following data stores:

|                           Datastore                            |  Support Type   |                       PyPi Datadog Documentation                        |
| -------------------------------------------------------------- | --------------- | ----------------------------------------------------------------------- |
| [Cassandra](https://cassandra.apache.org/)                     | Fully Supported | http://pypi.datadoghq.com/trace/docs/db_integrations.html#cassandra     |
| [Elasticsearch](https://www.elastic.co/products/elasticsearch) | Fully Supported | http://pypi.datadoghq.com/trace/docs/db_integrations.html#elasticsearch |
| [Flask Cache](https://pythonhosted.org/Flask-Cache/)           | Fully Supported | http://pypi.datadoghq.com/trace/docs/db_integrations.html#flask-cache   |
| [MongoDB](https://www.mongodb.com/what-is-mongodb)             | Fully Supported | http://pypi.datadoghq.com/trace/docs/db_integrations.html#mongodb       |
| [Memcached](https://memcached.org/)                            | Fully Supported | http://pypi.datadoghq.com/trace/docs/db_integrations.html#memcached     |
| [MySQL](https://www.mysql.com/)                                | Fully Supported | http://pypi.datadoghq.com/trace/docs/db_integrations.html#mysql         |
| [Postgres](https://www.postgresql.org/)                        | Fully Supported | http://pypi.datadoghq.com/trace/docs/db_integrations.html#postgres      |
| [Redis](https://redis.io/)                                     | Fully Supported | http://pypi.datadoghq.com/trace/docs/db_integrations.html#redis         |
| [SQLAlchemy](https://www.sqlalchemy.org/)                      | Fully Supported | http://pypi.datadoghq.com/trace/docs/db_integrations.html#sqlalchemy    |
| [SQLite](https://www.sqlite.org/)                              | Fully Supported | http://pypi.datadoghq.com/trace/docs/db_integrations.html#sqlite        |


#### Library Compatibility

The `ddtrace` library includes support for the following libraries:

|                               Library                                |  Support Type   |                      PyPi Datadog Documentation                       |
| -------------------------------------------------------------------- | --------------- | --------------------------------------------------------------------- |
| Async Libraries                                                      | Fully Supported | http://pypi.datadoghq.com/trace/docs/async_integrations.html          |
| [Boto](http://docs.pythonboto.org/en/latest/)                        | Fully Supported | http://pypi.datadoghq.com/trace/docs/other_integrations.html#boto     |
| [Futures](https://docs.python.org/3/library/concurrent.futures.html) | Fully Supported | http://pypi.datadoghq.com/trace/docs/other_integrations.html#futures  |
| [Celery](http://www.celeryproject.org/)                              | Fully Supported | http://pypi.datadoghq.com/trace/docs/other_integrations.html#celery   |
| [httplib](https://docs.python.org/2/library/httplib.html)            | Fully Supported | http://pypi.datadoghq.com/trace/docs/other_integrations.html#httplib  |
| [Requests](http://docs.python-requests.org/en/master/)               | Fully Supported | http://pypi.datadoghq.com/trace/docs/other_integrations.html#requests |

## OpenTracing

OpenTracing support for `ddtrace` is in beta. See our [API docs][3] for set-up and
usage information


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup
[2]: http://pypi.datadoghq.com/trace/docs/index.html#getting-started
[3]: http://pypi.datadoghq.com/trace/docs/installation_quickstart.html#opentracing
