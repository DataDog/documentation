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

## Installation

To begin tracing applications written in Python, first [install and configure the Datadog Agent][1] (see additional documentation for [tracing Docker applications](/tracing/setup/docker/)).

Next, install the Datadog Tracing library using pip:

```python
pip install ddtrace
```

Finally, import the tracer and instrument your code!

## Example

```python

from ddtrace import tracer

with tracer.trace("web.request", service="my_service") as span:
  span.set_tag("my_tag", "my_value")
```

For more examples, see the [Getting Started section of library documentation][2].

## Compatibility

{{< tabs >}}
{{% tab "Framework Compatibility" %}}

The ddtrace library includes support for a number of web frameworks, including:

| Framework | Framework Documentation        | PyPi Datadog Documentation                    |
|-----------|--------------------------------|-----------------------------------------------|
| Bottle    | https://bottlepy.org/          | http://pypi.datadoghq.com/trace/docs/#bottle  |
| Django    | https://www.djangoproject.com/ | http://pypi.datadoghq.com/trace/docs/#django  |
| Falcon    | https://falconframework.org/   | http://pypi.datadoghq.com/trace/docs/#falcon  |
| Flask     | http://flask.pocoo.org/        | http://pypi.datadoghq.com/trace/docs/#flask   |
| Pylons    | http://pylonsproject.org/      | http://pypi.datadoghq.com/trace/docs/#pylons  |
| Pyramid   | https://trypyramid.com/        | http://pypi.datadoghq.com/trace/docs/#pyramid |

{{% /tab %}}
{{% tab "Library Compatibility" %}}

The ddtrace library includes support for the following data stores and libraries:

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


{{% /tab %}}
{{< /tabs >}}

## Example: Simple tracing

We have a Flask Python application that when called on `/doc` returns **42**.  
We instrumented our python code in order to generate traces from it:

```python
import time
import blinker as _

from flask import Flask, Response

from ddtrace import tracer
from ddtrace.contrib.flask import TraceMiddleware

# Tracer configuration
tracer.configure(hostname='datadog')
app = Flask('API')
traced_app = TraceMiddleware(app, tracer, service='doc_service')

@tracer.wrap(name='doc_work')
def work():
    time.sleep(0.5)
    return 42

@app.route('/doc/')
def doc_resource():
    time.sleep(0.3)
    res = work()
    time.sleep(0.3)
    return Response(str(res), mimetype='application/json')
```

Each time its called, the following code produces this **trace**:

{{< img src="tracing/simple_trace.png" alt="Simple Trace" responsive="true" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup
[2]: http://pypi.datadoghq.com/trace/docs/#get-started
