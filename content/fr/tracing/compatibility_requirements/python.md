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

Les versions `2.7+` et `3.5+` de Python sont prises en charge dans la dernière version du traceur. Python `3.4` est pris en charge dans la version `0.35.x` et les versions antérieures du traceur Python.

## Intégrations

Pour demander la prise en charge d'une autre bibliothèque, contactez notre [formidable équipe d'assistance][2].

### Compatibilité des frameworks Web

La bibliothèque `ddtrace` prend en charge de nombreux frameworks Web, y compris :

| Framework                 | Version prise en charge | Documentation de la bibliothèque                                              |
| ------------------------- | ----------------- | ------------------------------------------------------------------ |
| [aiohttp][3]             | >= 1.2            | https://ddtrace.readthedocs.io/en/stable/integrations.html#aiohttp |
| [Bottle][4]              | >= 0.11           | https://ddtrace.readthedocs.io/en/stable/integrations.html#bottle  |
| [Django][5]              | >= 1.8            | https://ddtrace.readthedocs.io/en/stable/integrations.html#django  |
| [djangorestframework][5] | >= 3.4            | https://ddtrace.readthedocs.io/en/stable/integrations.html#django  |
| [Falcon][6]              | >= 1.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#falcon  |
| [Flask][7]               | >= 0.10           | https://ddtrace.readthedocs.io/en/stable/integrations.html#flask   |
| [Molten][8]              | >= 0.7.0          | https://ddtrace.readthedocs.io/en/stable/integrations.html#molten  |
| [Pylons][9]              | >= 0.9.6          | https://ddtrace.readthedocs.io/en/stable/integrations.html#pylons  |
| [Pyramid][10]             | >= 1.7            | https://ddtrace.readthedocs.io/en/stable/integrations.html#pyramid |
| [Tornado][11]             | >= 4.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#tornado |


### Compatibilité des datastores

La bibliothèque `ddtrace` prend en charge les datastores suivants :

| Datastore                          | Version prise en charge | Documentation de la bibliothèque                                                                         |
| ---------------------------------- | ----------------- | --------------------------------------------------------------------------------------------- |
| [Cassandra][12]                    | >= 3.5            | https://ddtrace.readthedocs.io/en/stable/integrations.html#cassandra                           |
| [Elasticsearch][13]                | >= 1.6            | https://ddtrace.readthedocs.io/en/stable/integrations.html#elasticsearch                       |
| [Flask Cache][14]                  | >= 0.12           | https://ddtrace.readthedocs.io/en/stable/integrations.html#flask-cache                         |
| [Memcached][15] [pylibmc][16]      | >= 1.4            | https://ddtrace.readthedocs.io/en/stable/integrations.html#pylibmc                             |
| [Memcached][15] [pymemcache][17]   | >= 1.3            | https://ddtrace.readthedocs.io/en/stable/integrations.html#pymemcache                          |
| [MongoDB][18] [Mongoengine][19]    | >= 0.11           | https://ddtrace.readthedocs.io/en/stable/integrations.html#mongoengine                         |
| [MongoDB][18] [Pymongo][20]        | >= 3.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#pymongo                             |
| [MySQL][21] [MySQL-python][22]     | >= 1.2.3          | https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.mysqldb      |
| [MySQL][21] [mysqlclient][23]      | >= 1.3            | https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.mysqldb      |
| [MySQL][21] mysql-connector        | >= 2.1            | https://ddtrace.readthedocs.io/en/stable/integrations.html#mysql-connector                     |
| [Postgres][24] [aiopg][25]         | >= 0.12.0         | https://ddtrace.readthedocs.io/en/stable/integrations.html#aiopg                               |
| [Postgres][24] [psycopg][26]       | >= 2.4            | https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.psycopg      |
| [Redis][27]                        | >= 2.6            | https://ddtrace.readthedocs.io/en/stable/integrations.html#redis                               |
| [Redis][27] [redis-py-cluster][28] | >= 1.3.5          | https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.rediscluster |
| [SQLAlchemy][29]                   | >= 1.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#sqlalchemy                          |
| [SQLite3][30]                      | Prise en charge complète   | https://ddtrace.readthedocs.io/en/stable/integrations.html#sqlite                              |
| [Vertica][31]                      | >= 0.6            | https://ddtrace.readthedocs.io/en/stable/integrations.html#vertica                             |


### Compatibilité des bibliothèques

La bibliothèque `ddtrace` prend en charge les bibliothèques suivantes :

| Bibliothèque           | Version prise en charge | Documentation de la bibliothèque                                                    |
| ----------------- | ----------------- | ------------------------------------------------------------------------ |
| [asyncio][32]     | Prise en charge complète   | https://ddtrace.readthedocs.io/en/stable/integrations.html#asyncio     |
| [gevent][33]      | >= 1.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#gevent      |
| [aiobotocore][34] | >= 0.2.3          | https://ddtrace.readthedocs.io/en/stable/integrations.html#aiobotocore |
| [Boto2][34]       | >= 2.29.0         | https://ddtrace.readthedocs.io/en/stable/integrations.html#boto2       |
| [Botocore][34]    | >= 1.4.51         | https://ddtrace.readthedocs.io/en/stable/integrations.html#botocore    |
| [Celery][35]      | >= 4.0.2          | https://ddtrace.readthedocs.io/en/stable/integrations.html#celery      |
| [Futures][36]     | Prise en charge complète   | https://ddtrace.readthedocs.io/en/stable/integrations.html#futures     |
| [Grpc][37]        | >= 1.8.0          | https://ddtrace.readthedocs.io/en/stable/integrations.html#grpc        |
| [httplib][38]     | Prise en charge complète   | https://ddtrace.readthedocs.io/en/stable/integrations.html#httplib     |
| [Jinja2][39]      | >= 2.7            | https://ddtrace.readthedocs.io/en/stable/integrations.html#jinja2      |
| [Kombu][40]       | >= 4.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#kombu       |
| [Mako][41]        | >= 0.1.0          | https://ddtrace.readthedocs.io/en/stable/integrations.html#mako        |
| [Requests][42]    | >= 2.08           | https://ddtrace.readthedocs.io/en/stable/integrations.html#requests    |


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-py
[2]: /fr/help
[3]: http://asgi.readthedocs.io/
[4]: https://aiohttp.readthedocs.io
[5]: https://bottlepy.org
[6]: https://www.djangoproject.com
[7]: https://falconframework.org
[8]: http://flask.pocoo.org
[9]: https://moltenframework.com
[10]: http://pylonsproject.org
[11]: https://trypyramid.com
[12]: http://www.tornadoweb.org
[13]: https://cassandra.apache.org
[14]: https://www.elastic.co/products/elasticsearch
[15]: https://pythonhosted.org/Flask-Cache
[16]: https://memcached.org
[17]: http://sendapatch.se/projects/pylibmc
[18]: https://pymemcache.readthedocs.io
[19]: https://www.mongodb.com/what-is-mongodb
[20]: http://mongoengine.org
[21]: https://api.mongodb.com/python/current
[22]: https://www.mysql.com
[23]: https://pypi.org/project/MySQL-python
[24]: https://pypi.org/project/mysqlclient
[25]: https://www.postgresql.org
[26]: https://aiopg.readthedocs.io
[27]: http://initd.org/psycopg
[28]: https://redis.io
[29]: https://redis-py-cluster.readthedocs.io
[30]: https://www.sqlalchemy.org
[31]: https://www.sqlite.org
[32]: https://www.vertica.com
[33]: https://docs.python.org/3/library/asyncio.html
[34]: http://www.gevent.org
[35]: http://docs.pythonboto.org/en/latest
[36]: http://www.celeryproject.org
[37]: https://docs.python.org/3/library/concurrent.futures.html
[38]: https://grpc.io
[39]: https://docs.python.org/2/library/httplib.html
[40]: http://jinja.pocoo.org
[41]: https://kombu.readthedocs.io/en/latest
[42]: https://www.makotemplates.org