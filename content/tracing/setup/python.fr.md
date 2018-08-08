---
title: Tracer des applications Python
kind: Documentation
aliases:
  - /fr/tracing/python/
  - /fr/tracing/languages/python/
further_reading:
  - link: 'https://github.com/DataDog/dd-trace-py'
    tag: Github
    text: Code source
  - link: 'http://pypi.datadoghq.com/trace/docs/'
    tag: Pypi
    text: APM (Tracing)
  - link: tracing/visualization/
    tag: Documentation
    text: 'Explorez vos services, vos ressources et vos traces'
---
<div class="alert alert-info">
Notez que dans les applications Python, la traçage est désactivée quand l'application est démarrer en mode <code> DEBUG</code>. <a href="http://pypi.datadoghq.com/trace/docs/#module-ddtrace.contrib.django">Lisez davantage</a>.
</div>

## Installation

Pour commencer à tracer les applications écrites en Python, commencez par [installer et configurer Datadog Agent][1] (consultez la documentation supplémentaire pour [le traçage des applications Docker](/tracing/setup/docker/)).

Ensuite, installez la bibliothèque Datadog Tracing en utilisant pip :

```python
pip install ddtrace
```

Enfin, importez le traceur et instrumentez votre code!

## Exemple

```python

from ddtrace import tracer

with tracer.trace("web.request", service="my_service") as span:
  span.set_tag("my_tag", "my_value")
```

Pour plus d'exemples, consultez la section [Démarrer][2] dans la documentation de bibliothèque.

## Compatibilité

### Compatibilité de Framework

La bibliothèque ddtrace fonctionne avec plusieurs frameworks web, y inclus :

___

| Framework | Documentation des Framework        | Documentation PyPi de Datadog                    |
|-----------|--------------------------------|-----------------------------------------------|
| Bottle    | https://bottlepy.org/          | http://pypi.datadoghq.com/trace/docs/#bottle  |
| Django    | https://www.djangoproject.com/ | http://pypi.datadoghq.com/trace/docs/#django  |
| Falcon    | https://falconframework.org/   | http://pypi.datadoghq.com/trace/docs/#falcon  |
| Flask     | http://flask.pocoo.org/        | http://pypi.datadoghq.com/trace/docs/#flask   |
| Pylons    | http://pylonsproject.org/      | http://pypi.datadoghq.com/trace/docs/#pylons  |
| Pyramid   | https://trypyramid.com/        | http://pypi.datadoghq.com/trace/docs/#pyramid |

### Compatibilité des bilbliothèques

Il inclut également le support pour les bibliothèques et data stores suivants:

___

| Bibliothèque       | Documentation des bibliothèques                         | Documentation PyPi de Datadog                          |
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

## Exemple : la traçage simple

Nous avons une application Flask Python qui, lorsqu'elle est appelée sur `/doc`, renvoie **42**. Nous avons instrumenté notre code Python afin de générer des traces :

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

Chaque fois qu'il est appelé, le code suivant produit ce **trace** :

{{< img src="tracing/simple_trace.png" alt="Simple Trace" responsive="true" >}}

## En apprendre plus

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup
[2]: http://pypi.datadoghq.com/trace/docs/#get-started