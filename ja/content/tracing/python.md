---
autotocdepth: 2
customnav: tracingnav
hideguides: true
kind: Documentation
placeholder: true
title: Tracing Python Applications
---

<div class='alert alert-info'><strong>NOTICE:</strong>アクセスいただきありがとうございます。こちらのページは現在英語のみのご用意となっております。引き続き日本語化の範囲を広げてまいりますので、皆様のご理解のほどよろしくお願いいたします。</div>

## Installation

To begin tracing applications written in Python, first [install and configure the Datadog Agent](/tracing).

Next, install the Datadog Tracing library using pip:

~~~
pip install ddtrace
~~~

Finally, import the tracer and instrument your code!

<div class="alert alert-info">
For Python applications, note that tracing is disabled when your application is launched in <b>DEBUG</b> mode. Find more <a href="http://pypi.datadoghq.com/trace/docs/web_integrations.html#django">here</a> </div>

### Example

~~~
from ddtrace import tracer

with tracer.trace("web.request", service="my_service") as span:
  span.set_tag("my_tag", "my_value")
~~~

For more examples, see the [Getting Started section of library documentation](http://pypi.datadoghq.com/trace/docs/index.html#getting-started).

## Compatibility

The ddtrace library includes support for a number of web frameworks, including:

- [Bottle](https://bottlepy.org/)
- [Django](https://www.djangoproject.com/)
- [Falcon](https://falconframework.org/)
- [Flask](http://flask.pocoo.org/)
- [Pylons](http://pylonsproject.org/)
- [Pyramid](https://trypyramid.com/)

To learn how to instrument these frameworks, reference [the library documentation](http://pypi.datadoghq.com/trace/docs/web_integrations.html)

It also includes support for the following data stores and libraries:

- [Cassandra](http://cassandra.apache.org/)
- [Elasticsearch](https://www.elastic.co/products/elasticsearch)
- [Flask Cache](https://pythonhosted.org/Flask-Cache/)
- [MongoDB](https://www.mongodb.com/what-is-mongodb)
- [Memcached](https://memcached.org/)
- [MySQL](https://www.mysql.com/)
- [Postgres](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [SQLAlchemy](http://www.sqlalchemy.org/)
- [SQLite](https://www.sqlite.org/)

To instrument these libraries, see [the library documentation](http://pypi.datadoghq.com/trace/docs/index.html)

## Additional Information

The Python library [source code can be found on Github](https://github.com/DataDog/dd-trace-py).

You can find additional documentation on [the library documentation page](http://pypi.datadoghq.com/trace/docs/).
