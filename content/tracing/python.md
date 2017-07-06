---
title: Tracing Python Applications
kind: Documentation
autotocdepth: 2
hideguides: true
customnav: tracingnav
---

### Installation

To begin tracing applications written in Python, first [install and configure the Datadog Agent](/tracing#installing-the-agent).

Next, install the Datadog Tracing library using pip:

~~~
pip install ddtrace
~~~

Finally, import the tracer and instrument your code!

### Example

~~~
from ddtrace import tracer

with tracer.trace("web.request") as span:
  span.set_service_info("my_service", "web")
  span.set_tag("my_tag", "my_value")
~~~

For more examples, see the [Getting Started section of library documentation](http://pypi.datadoghq.com/trace/docs/#get-started).


### Compatibility

The ddtrace library includes support for a number of web frameworks, including:

- [Bottle](https://bottlepy.org/)
- [Django](https://www.djangoproject.com/)
- [Falcon](https://falconframework.org/)
- [Flask](http://flask.pocoo.org/)
- [Pylons](http://pylonsproject.org/)
- [Pyramid](https://trypyramid.com/)

To learn how to instrument these frameworks, please reference [the library documentation](http://pypi.datadoghq.com/trace/docs/#web-frameworks)

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

To instrument these libraries, please see [the library documentation](http://pypi.datadoghq.com/trace/docs/#other-libraries)

### Additional Information

The Python library [source code can be found on Github](https://github.com/DataDog/dd-trace-py).

You can find additional documentation on [the library documentation page](http://pypi.datadoghq.com/trace/docs/).
