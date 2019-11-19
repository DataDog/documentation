---
title: Tracer des applications Python
kind: documentation
aliases:
  - /fr/tracing/python/
  - /fr/tracing/languages/python/
  - /fr/agent/apm/python/
further_reading:
  - link: 'https://github.com/DataDog/dd-trace-py'
    tag: GitHub
    text: Code source
  - link: 'http://pypi.datadoghq.com/trace/docs/'
    tag: Pypi
    text: Documentation relative à l'API
  - link: tracing/visualization/
    tag: Documentation
    text: 'Explorer vos services, ressources et traces'
  - link: tracing/advanced/
    tag: Utilisation avancée
    text: Utilisation avancée
---
<div class="alert alert-info">
Pour les applications Python Django, notez que le tracing est désactivé lorsque votre application est lancée en mode <code>DEBUG</code>. Pour en savoir plus, <a href="http://pypi.datadoghq.com/trace/docs/web_integrations.html#django">cliquez ici</a>.
</div>

## Installation et démarrage

<div class="alert alert-info">Si vous avez déjà un compte Datadog, vous trouverez des instructions détaillées dans nos guides intégrés à l'application pour les configurations <a href="https://app.datadoghq.com/apm/docs?architecture=host-based&language=python" target=_blank> basées sur un host</a> et les configurations <a href="https://app.datadoghq.com/apm/docs?architecture=container-based&language=python" target=_blank>basées sur un conteneur</a>.</div>

Pour commencer le tracing d'applications écrites en Python, vous devez d'abord [installer et configurer l'Agent Datadog][1]. Pour obtenir davantage d'informations, consultez la documentation relative au [tracing d'applications Docker][2] ou au [tracing d'applications Kubernetes][3].

Installez ensuite la bibliothèque de tracing Datadog, `ddtrace`, avec pip :

```python
pip install ddtrace
```

Pour instrumenter votre application Python, utilisez alors la commande `ddtrace-run` incluse. Pour l'utiliser, ajoutez `ddtrace-run` en préfixe à la commande de votre point d'entrée Python.

Par exemple, si votre application est lancée avec `python app.py`, exécutez la commande suivante :

```sh
$ ddtrace-run python app.py
```

Pour découvrir des options d'utilisation, de configuration et de contrôle plus avancées, consultez la [documentation relative à l'API][4] de Datadog.

## Modifier le hostname de l'Agent

Configurez vos traceurs d'applications de façon à envoyer des traces à un hostname d'Agent personnalisé :

Le module de tracing Python recherche automatiquement les variables ENV `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT` et s'initialise avec celles-ci.

```python
import os
from ddtrace import tracer

tracer.configure(
    hostname=os.environ['DD_AGENT_HOST'],
    port=os.environ['DD_TRACE_AGENT_PORT'],
)
```

## Compatibilité

Les versions `2.7` et `3.4` et les versions ultérieures de Python sont prises en charge.

### Intégrations

#### Compatibilité des frameworks Web

La bibliothèque `ddtrace` prend en charge de nombreux frameworks Web, y compris :

| Framework                | Version prise en charge | Documentation PyPi de Datadog                                         |
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

#### Compatibilité des datastores

La bibliothèque `ddtrace` prend en charge les datastores suivants :

| Datastore                          | Version prise en charge | Documentation PyPi de Datadog                                                                    |
|------------------------------------|-------------------|-----------------------------------------------------------------------------------------------|
| [Cassandra][14]                    | >= 3.5            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#cassandra                           |
| [Elasticsearch][15]                | >= 1.6            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#elasticsearch                       |
| [Flask Cache][16]                  | >= 0.12           | http://pypi.datadoghq.com/trace/docs/db_integrations.html#flask-cache                         |
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
| [SQLite3][32]                      | Prise en charge complète   | http://pypi.datadoghq.com/trace/docs/db_integrations.html#sqlite                              |
| [Vertica][33]                      | >= 0.6            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#vertica                             |

#### Compatibilité des bibliothèques

La bibliothèque `ddtrace` prend en charge les bibliothèques suivantes :

| Bibliothèque           | Version prise en charge | Documentation PyPi de Datadog                                               |
|-------------------|-------------------|--------------------------------------------------------------------------|
| [asyncio][34]     | Prise en charge complète   | http://pypi.datadoghq.com/trace/docs/async_integrations.html#asyncio     |
| [gevent][35]      | >= 1.0            | http://pypi.datadoghq.com/trace/docs/async_integrations.html#gevent      |
| [aiobotocore][36] | >= 0.2.3          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#aiobotocore |
| [Boto2][36]       | >= 2.29.0         | http://pypi.datadoghq.com/trace/docs/other_integrations.html#boto2       |
| [Botocore][36]    | >= 1.4.51         | http://pypi.datadoghq.com/trace/docs/other_integrations.html#botocore    |
| [Celery][37]      | >= 4.0.2          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#celery      |
| [Futures][38]     | Prise en charge complète   | http://pypi.datadoghq.com/trace/docs/other_integrations.html#futures     |
| [Grpc][39]        | >= 1.8.0          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#grpc        |
| [httplib][40]     | Prise en charge complète   | http://pypi.datadoghq.com/trace/docs/other_integrations.html#httplib     |
| [Jinja2][41]      | >= 2.7            | http://pypi.datadoghq.com/trace/docs/other_integrations.html#jinja2      |
| [Kombu][42]       | >= 4.0            | http://pypi.datadoghq.com/trace/docs/other_integrations.html#kombu       |
| [Mako][43]        | >= 0.1.0          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#mako        |
| [Requests][44]    | >= 2.08           | http://pypi.datadoghq.com/trace/docs/other_integrations.html#requests    |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/send_traces
[2]: /fr/tracing/setup/docker
[3]: /fr/agent/kubernetes/daemonset_setup/#trace-collection
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