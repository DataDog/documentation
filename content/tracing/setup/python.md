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
  text: APM (Tracing)
---

## Installation

To begin tracing applications written in Python, first [install and configure the Datadog Agent](/tracing#installing-the-agent).

Next, install the Datadog Tracing library using pip:

```python
pip install ddtrace
```

Finally, import the tracer and instrument your code!

## Example

<div class="alert alert-info">
For Python applciations, note that tracing is disabled when your application is launched in <b>DEBUG</b> mode. Find more <a href="http://pypi.datadoghq.com/trace/docs/#module-ddtrace.contrib.django">here</a>.
</div>

```python

from ddtrace import tracer

with tracer.trace("web.request", service="my_service") as span:
  span.set_tag("my_tag", "my_value")
```

For more examples, see the [Getting Started section of library documentation](http://pypi.datadoghq.com/trace/docs/#get-started).

## Compatibility

### Framework Compatibility

The ddtrace library includes support for a number of web frameworks, including:

___

{{% table responsive="true" %}}
| Framework | Framework Documentation        | PyPi Datadog Documentation                    |
|-----------|--------------------------------|-----------------------------------------------|
| Bottle    | https://bottlepy.org/          | http://pypi.datadoghq.com/trace/docs/#bottle  |
| Django    | https://www.djangoproject.com/ | http://pypi.datadoghq.com/trace/docs/#django  |
| Falcon    | https://falconframework.org/   | http://pypi.datadoghq.com/trace/docs/#falcon  |
| Flask     | http://flask.pocoo.org/        | http://pypi.datadoghq.com/trace/docs/#flask   |
| Pylons    | http://pylonsproject.org/      | http://pypi.datadoghq.com/trace/docs/#pylons  |
| Pyramid   | https://trypyramid.com/        | http://pypi.datadoghq.com/trace/docs/#pyramid |
{{% /table %}}

### Library Compatibility

It also includes support for the following data stores and libraries:

___

{{% table responsive="true" %}}
| Library       | Library Documentation                         | PyPi Datadog Documentation                          |
|---------------|-----------------------------------------------|-----------------------------------------------------|
| Cassandra     | http://cassandra.apache.org/                  | http://pypi.datadoghq.com/trace/docs/#cassandra     |
| Elasticsearch | https://www.elastic.co/products/elasticsearch | http://pypi.datadoghq.com/trace/docs/#elasticsearch |
| Flask Cache   | https://pythonhosted.org/Flask-Cache/         | http://pypi.datadoghq.com/trace/docs/#flask-cache   |
| MongoDB       | https://www.mongodb.com/what-is-mongodb       | http://pypi.datadoghq.com/trace/docs/#mongodb       |
| Memcached     | https://memcached.org/                        | http://pypi.datadoghq.com/trace/docs/#memcached     |
| MySQL         | https://www.mysql.com/                        | http://pypi.datadoghq.com/trace/docs/#mysql         |
| Postgres      | https://www.postgresql.org/                   | http://pypi.datadoghq.com/trace/docs/#postgres      |
| Redis         | https://redis.io/                             | http://pypi.datadoghq.com/trace/docs/#redis         |
| SQLAlchemy    | http://www.sqlalchemy.org/                    | http://pypi.datadoghq.com/trace/docs/#sqlalchemy    |
| SQLite        | https://www.sqlite.org/                       | http://pypi.datadoghq.com/trace/docs/#sqlite        |
{{% /table %}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
