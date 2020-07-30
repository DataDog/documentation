---
title: Exigences de compatibilité Python
kind: documentation
description: Exigences de compatibilité pour le traceur Python
further_reading:
  - link: tracing/setup/python
    tag: Documentation
    text: Instrumenter votre application
---
La bibliothèque de tracing Datadog Python est open source. Consultez le [référentiel GitHub][1] pour en savoir plus.

Les versions `2.7` et `3.4` et les versions ultérieures de Python sont prises en charge.

## Intégrations

Pour demander la prise en charge d'une autre bibliothèque, contactez notre [formidable équipe d'assistance][2].

### Compatibilité des frameworks Web

La bibliothèque `ddtrace` prend en charge de nombreux frameworks Web, y compris :

| Framework                 | Version prise en charge | Documentation PyPi de Datadog                                         |
| ------------------------- | ----------------- | ------------------------------------------------------------------ |
| [aiohttp][3]             | >= 1.2            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#aiohttp |
| [Bottle][4]              | >= 0.11           | http://pypi.datadoghq.com/trace/docs/web_integrations.html#bottle  |
| [Django][5]              | >= 1.8            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#django  |
| [djangorestframework][5] | >= 3.4            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#django  |
| [Falcon][6]              | >= 1.0            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#falcon  |
| [Flask][7]               | >= 0.10           | http://pypi.datadoghq.com/trace/docs/web_integrations.html#flask   |
| [Molten][8]              | >= 0.7.0          | http://pypi.datadoghq.com/trace/docs/web_integrations.html#molten  |
| [Pylons][9]              | >= 0.9.6          | http://pypi.datadoghq.com/trace/docs/web_integrations.html#pylons  |
| [Pyramid][10]             | >= 1.7            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#pyramid |
| [Tornado][11]             | >= 4.0            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#tornado |

### Compatibilité des datastores

La bibliothèque `ddtrace` prend en charge les datastores suivants :

| Datastore                          | Version prise en charge | Documentation PyPi de Datadog                                                                    |
| ---------------------------------- | ----------------- | --------------------------------------------------------------------------------------------- |
| [Cassandra][12]                    | >= 3.5            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#cassandra                           |
| [Elasticsearch][13]                | >= 1.6            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#elasticsearch                       |
| [Flask Cache][14]                  | >= 0.12           | http://pypi.datadoghq.com/trace/docs/db_integrations.html#flask-cache                         |
| [Memcached][15] [pylibmc][16]      | >= 1.4            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#pylibmc                             |
| [Memcached][15] [pymemcache][17]   | >= 1.3            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#pymemcache                          |
| [MongoDB][18] [Mongoengine][19]    | >= 0.11           | http://pypi.datadoghq.com/trace/docs/db_integrations.html#mongoengine                         |
| [MongoDB][18] [Pymongo][20]        | >= 3.0            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#pymongo                             |
| [MySQL][21] [MySQL-python][22]     | >= 1.2.3          | http://pypi.datadoghq.com/trace/docs/db_integrations.html#module-ddtrace.contrib.mysqldb      |
| [MySQL][21] [mysqlclient][23]      | >= 1.3            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#module-ddtrace.contrib.mysqldb      |
| [MySQL][21] mysql-connector        | >= 2.1            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#mysql-connector                     |
| [Postgres][24] [aiopg][25]         | >= 0.12.0         | http://pypi.datadoghq.com/trace/docs/db_integrations.html#aiopg                               |
| [Postgres][24] [psycopg][26]       | >= 2.4            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#module-ddtrace.contrib.psycopg      |
| [Redis][27]                        | >= 2.6            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#redis                               |
| [Redis][27] [redis-py-cluster][28] | >= 1.3.5          | http://pypi.datadoghq.com/trace/docs/db_integrations.html#module-ddtrace.contrib.rediscluster |
| [SQLAlchemy][29]                   | >= 1.0            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#sqlalchemy                          |
| [SQLite3][30]                      | Prise en charge complète   | http://pypi.datadoghq.com/trace/docs/db_integrations.html#sqlite                              |
| [Vertica][31]                      | >= 0.6            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#vertica                             |

### Compatibilité des bibliothèques

La bibliothèque `ddtrace` prend en charge les bibliothèques suivantes :

| Bibliothèque           | Version prise en charge | Documentation PyPi de Datadog                                               |
| ----------------- | ----------------- | ------------------------------------------------------------------------ |
| [asyncio][32]     | Prise en charge complète   | http://pypi.datadoghq.com/trace/docs/async_integrations.html#asyncio     |
| [gevent][33]      | >= 1.0            | http://pypi.datadoghq.com/trace/docs/async_integrations.html#gevent      |
| [aiobotocore][34] | >= 0.2.3          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#aiobotocore |
| [Boto2][34]       | >= 2.29.0         | http://pypi.datadoghq.com/trace/docs/other_integrations.html#boto2       |
| [Botocore][34]    | >= 1.4.51         | http://pypi.datadoghq.com/trace/docs/other_integrations.html#botocore    |
| [Celery][35]      | >= 4.0.2          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#celery      |
| [Futures][36]     | Prise en charge complète   | http://pypi.datadoghq.com/trace/docs/other_integrations.html#futures     |
| [Grpc][37]        | >= 1.8.0          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#grpc        |
| [httplib][38]     | Prise en charge complète   | http://pypi.datadoghq.com/trace/docs/other_integrations.html#httplib     |
| [Jinja2][39]      | >= 2.7            | http://pypi.datadoghq.com/trace/docs/other_integrations.html#jinja2      |
| [Kombu][40]       | >= 4.0            | http://pypi.datadoghq.com/trace/docs/other_integrations.html#kombu       |
| [Mako][41]        | >= 0.1.0          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#mako        |
| [Requests][42]    | >= 2.08           | http://pypi.datadoghq.com/trace/docs/other_integrations.html#requests    |


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-py
[2]: /fr/help
[3]: https://aiohttp.readthedocs.io
[4]: https://bottlepy.org
[5]: https://www.djangoproject.com
[6]: https://falconframework.org
[7]: http://flask.pocoo.org
[8]: https://moltenframework.com
[9]: http://pylonsproject.org
[10]: https://trypyramid.com
[11]: http://www.tornadoweb.org
[12]: https://cassandra.apache.org
[13]: https://www.elastic.co/products/elasticsearch
[14]: https://pythonhosted.org/Flask-Cache
[15]: https://memcached.org
[16]: http://sendapatch.se/projects/pylibmc
[17]: https://pymemcache.readthedocs.io
[18]: https://www.mongodb.com/what-is-mongodb
[19]: http://mongoengine.org
[20]: https://api.mongodb.com/python/current
[21]: https://www.mysql.com
[22]: https://pypi.org/project/MySQL-python
[23]: https://pypi.org/project/mysqlclient
[24]: https://www.postgresql.org
[25]: https://aiopg.readthedocs.io
[26]: http://initd.org/psycopg
[27]: https://redis.io
[28]: https://redis-py-cluster.readthedocs.io
[29]: https://www.sqlalchemy.org
[30]: https://www.sqlite.org
[31]: https://www.vertica.com
[32]: https://docs.python.org/3/library/asyncio.html
[33]: http://www.gevent.org
[34]: http://docs.pythonboto.org/en/latest
[35]: http://www.celeryproject.org
[36]: https://docs.python.org/3/library/concurrent.futures.html
[37]: https://grpc.io
[38]: https://docs.python.org/2/library/httplib.html
[39]: http://jinja.pocoo.org
[40]: https://kombu.readthedocs.io/en/latest
[41]: https://www.makotemplates.org
[42]: http://docs.python-requests.org/en/master