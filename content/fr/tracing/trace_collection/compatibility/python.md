---
aliases:
- /fr/tracing/compatibility_requirements/python
- /fr/tracing/setup_overview/compatibility_requirements/python
code_lang: python
code_lang_weight: 10
description: Exigences de compatibilité pour le traceur Python
further_reading:
- link: tracing/trace_collection/dd_libraries/python
  tag: Documentation
  text: Instrumenter votre application
title: Exigences de compatibilité Python
type: multi-code-lang
---

## Versions

La bibliothèque client APM Python suit une [stratégie de gestion des versions][1] qui stipule le niveau de prise en charge des différentes versions de la bibliothèque et du runtime Python.

Deux branches de publication sont prises en charge :

| Version    | Niveau de prise en charge        |
|------------|----------------------|
| `<1`       | Maintenance           |
| `>=1.0,<2` | Disponibilité générale |

La bibliothèque prend en charge les runtimes suivants :

| Système d'exploitation | CPU                    | Runtime  | Version du runtime | Versions de ddtrace prises en charge |
|------------------------|------------------------|----------|--------------------|--------------------------------------|
| Linux                  | x86-64, i686, AArch64  | CPython  | 2.7, 3.5 à 3.11    | `<2`                                 |
| macOS                  | Intel, puce Apple      | CPython  | 2.7, 3.5 à 3.11    | `<2`                                 |
| Windows                | 64 bits, 32 bits | CPython  | 2.7, 3.5 à 3.11    | `<2`                                 |

## Intégrations

Pour demander la prise en charge d'une autre bibliothèque, contactez notre [formidable équipe d'assistance][2].

### Compatibilité des frameworks Web

La bibliothèque `ddtrace` prend en charge de nombreux frameworks Web, y compris :

| Framework                 | Version prise en charge | Configuration automatique | Documentation de la bibliothèque                                              |
| ------------------------- | ----------------- | --------- |------------------------------------------------------------------ |
| [asgi][3]                 | >= 2.0            | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#asgi    |
| [aiohttp][4] (client)     | >= 2.0            | oui | https://ddtrace.readthedocs.io/en/stable/integrations.html#aiohttp |
| [aiohttp][4] (serveur)     | >= 2.0            | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#aiohttp |
| [Bottle][5]               | >= 0.11           | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#bottle  |
| [CherryPy][6]            | >= 11.2.0         | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#cherrypy|
| [Django][7]               | >= 1.8            | oui | https://ddtrace.readthedocs.io/en/stable/integrations.html#django  |
| [djangorestframework][7]  | >= 3.4            | oui | https://ddtrace.readthedocs.io/en/stable/integrations.html#django  |
| [Falcon][8]               | >= 1.0            | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#falcon  |
| [Flask][9]                | >= 0.10           | oui | https://ddtrace.readthedocs.io/en/stable/integrations.html#flask   |
| [FastAPI][10]              | >= 0.51           | oui | https://ddtrace.readthedocs.io/en/stable/integrations.html#fastapi |
| [Molten][11]               | >= 0.7.0          | oui | https://ddtrace.readthedocs.io/en/stable/integrations.html#molten  |
| [Pylons][12]              | >= 0.9.6          | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#pylons  |
| [Pyramid][13]             | >= 1.7            | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#pyramid |
| [pytest][14]              | >= 3.0            | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#pytest  |
| [Sanic][15]               | >= 19.6.0         | oui | https://ddtrace.readthedocs.io/en/stable/integrations.html#sanic   |
| [Starlette][16]           | >= 0.13.0         | oui | https://ddtrace.readthedocs.io/en/stable/integrations.html#starlette |
| [Tornado][17]             | >= 4.0            | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#tornado |



### Compatibilité des datastores

La bibliothèque `ddtrace` prend en charge les datastores suivants :

| Datastore                          | Version prise en charge | Configuration automatique |  Documentation de la bibliothèque                                                                         |
| ---------------------------------- | ----------------- | --------- | --------------------------------------------------------------------------------------------- |
| [algoliasearch][18]                | >= 1.20.0         | oui | https://ddtrace.readthedocs.io/en/stable/integrations.html#algoliasearch                       |
| [asyncpg][19]                      | >= 0.18.0         | oui | https://ddtrace.readthedocs.io/en/stable/integrations.html#asyncpg                             |
| [Cassandra][20]                    | >= 3.5            | oui | https://ddtrace.readthedocs.io/en/stable/integrations.html#cassandra                           |
| [Elasticsearch][21]                | >= 1.6            | oui | https://ddtrace.readthedocs.io/en/stable/integrations.html#elasticsearch                       |
| [Flask Cache][22]                  | >= 0.12           | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#flask-cache                         |
| [Mariadb][23]                      | >= 1.0.0          | oui | https://ddtrace.readthedocs.io/en/stable/integrations.html#mariadb                             |
| [Memcached][24] [pylibmc][25]      | >= 1.4            | oui | https://ddtrace.readthedocs.io/en/stable/integrations.html#pylibmc                             |
| [Memcached][24] [pymemcache][26]   | >= 1.3            | oui | https://ddtrace.readthedocs.io/en/stable/integrations.html#pymemcache                          |
| [MongoDB][27] [Mongoengine][28]    | >= 0.11           | oui | https://ddtrace.readthedocs.io/en/stable/integrations.html#mongoengine                         |
| [MongoDB][27] [Pymongo][29]        | >= 3.0            | oui | https://ddtrace.readthedocs.io/en/stable/integrations.html#pymongo                             |
| [MySQL][30] [MySQL-python][31]     | >= 1.2.3          | oui | https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.mysqldb      |
| [MySQL][30] [mysqlclient][32]      | >= 1.3            | oui | https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.mysqldb      |
| [MySQL][30] [mysql-connector][33]  | >= 2.1            | oui | https://ddtrace.readthedocs.io/en/stable/integrations.html#mysql-connector                     |
| [Postgres][34] [aiopg][35]         | >= 0.12.0, <=&nbsp;0.16        | oui | https://ddtrace.readthedocs.io/en/stable/integrations.html#aiopg                               |
| [Postgres][34] [psycopg][36]       | >= 2.4            | oui | https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.psycopg      |
| [PyMySQL][37]                      | >= 0.7            | oui | https://ddtrace.readthedocs.io/en/stable/integrations.html?highlight=pymysql#pymysql |
| [PynamoDB][38]                     | >= 4.0            | oui | https://ddtrace.readthedocs.io/en/stable/integrations.html#pynamodb |
| [PyODBC][39]                       | >= 4.0            | oui | https://ddtrace.readthedocs.io/en/stable/integrations.html#pyodbc                               |
| [Redis][40]                        | >= 2.6            | oui | https://ddtrace.readthedocs.io/en/stable/integrations.html#redis                               |
| [Redis][40] [redis-py-cluster][41] | >= 1.3.5          | oui | https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.rediscluster |
| [SQLAlchemy][42]                   | >= 1.0            | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#sqlalchemy                          |
| [SQLite3][43]                      | Prise en charge complète   | oui | https://ddtrace.readthedocs.io/en/stable/integrations.html#sqlite                              |
| [Vertica][44]                      | >= 0.6            | oui | https://ddtrace.readthedocs.io/en/stable/integrations.html#vertica                             |

### Compatibilité des bibliothèques

La bibliothèque `ddtrace` prend en charge les bibliothèques suivantes :

| Bibliothèque           | Version prise en charge |  Configuration automatique       | Documentation de la bibliothèque                                                    |
| ----------------- | ----------------- | ---------------- | ------------------------------------------------------------------------ |
| [aiobotocore][45] | >= 0.2.3          | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#aiobotocore |
| [asyncio][46]     | Prise en charge complète   | > Python 3.7 oui | https://ddtrace.readthedocs.io/en/stable/integrations.html#asyncio     |
| [Botocore][47]    | >= 1.4.51         | oui | https://ddtrace.readthedocs.io/en/stable/integrations.html#botocore    |
| [Boto2][48]       | >= 2.29.0         | oui | https://ddtrace.readthedocs.io/en/stable/integrations.html#boto2       |
| [Celery][49]      | >= 3.1            | oui | https://ddtrace.readthedocs.io/en/stable/integrations.html#celery      |
| [Consul][50]      | >= 0.7            | oui | https://ddtrace.readthedocs.io/en/stable/integrations.html#consul      |
| [Futures][51]     | Prise en charge complète   | oui | https://ddtrace.readthedocs.io/en/stable/integrations.html#futures     |
| [gevent][52]      | >= 1.0            | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#gevent      |
| [Grpc][53]        | >= 1.8.0          | oui | https://ddtrace.readthedocs.io/en/stable/integrations.html#grpc        |
| [httplib][54]     | Prise en charge complète   | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#httplib     |
| [Jinja2][55]      | >= 2.7            | oui | https://ddtrace.readthedocs.io/en/stable/integrations.html#jinja2      |
| [Kombu][56]       | >= 4.0            | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#kombu       |
| [Mako][57]        | >= 0.1.0          | oui | https://ddtrace.readthedocs.io/en/stable/integrations.html#mako        |
| [Requests][58]    | >= 2.08           | oui | https://ddtrace.readthedocs.io/en/stable/integrations.html#requests    |
| [urllib3][59]     | >= 1.22           | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#urllib3     |
| [graphql-core][60]| >= 2.0            | oui | https://ddtrace.readthedocs.io/en/stable/integrations.html#graphql |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://ddtrace.readthedocs.io/en/stable/versioning.html
[2]: /fr/help
[3]: http://asgi.readthedocs.io/
[4]: https://aiohttp.readthedocs.io
[5]: https://bottlepy.org
[6]: https://cherrypy.org/
[7]: https://www.djangoproject.com
[8]: https://falconframework.org
[9]: http://flask.pocoo.org
[10]: https://fastapi.tiangolo.com/
[11]: https://moltenframework.com
[12]: http://pylonsproject.org
[13]: https://trypyramid.com
[14]: https://docs.pytest.org/en/stable/
[15]: https://sanic.readthedocs.io/en/latest/
[16]: https://www.starlette.io/
[17]: http://www.tornadoweb.org
[18]: https://www.algolia.com/doc/
[19]: https://magicstack.github.io/asyncpg/
[20]: https://cassandra.apache.org
[21]: https://www.elastic.co/products/elasticsearch
[22]: https://pythonhosted.org/Flask-Cache
[23]: https://mariadb-corporation.github.io/mariadb-connector-python/index.html
[24]: https://memcached.org
[25]: http://sendapatch.se/projects/pylibmc
[26]: https://pymemcache.readthedocs.io
[27]: https://www.mongodb.com/what-is-mongodb
[28]: http://mongoengine.org
[29]: https://api.mongodb.com/python/current
[30]: https://www.mysql.com
[31]: https://pypi.org/project/MySQL-python
[32]: https://pypi.org/project/mysqlclient
[33]: https://dev.mysql.com/doc/connector-python/en/
[34]: https://www.postgresql.org
[35]: https://aiopg.readthedocs.io
[36]: http://initd.org/psycopg
[37]: https://pypi.org/project/PyMySQL/
[38]: https://pynamodb.readthedocs.io/en/latest/
[39]: https://pypi.org/project/pyodbc/
[40]: https://redis.io
[41]: https://redis-py-cluster.readthedocs.io
[42]: https://www.sqlalchemy.org
[43]: https://www.sqlite.org
[44]: https://www.vertica.com
[45]: https://pypi.org/project/aiobotocore/
[46]: https://docs.python.org/3/library/asyncio.html
[47]: https://pypi.org/project/botocore/
[48]: http://docs.pythonboto.org/en/latest
[49]: http://www.celeryproject.org
[50]: https://python-consul.readthedocs.io/en/latest/
[51]: https://docs.python.org/3/library/concurrent.futures.html
[52]: http://www.gevent.org
[53]: https://grpc.io
[54]: https://docs.python.org/2/library/httplib.html
[55]: http://jinja.pocoo.org
[56]: https://kombu.readthedocs.io/en/latest
[57]: https://www.makotemplates.org
[58]: https://requests.readthedocs.io/en/master/
[59]: https://urllib3.readthedocs.io/en/stable/
[60]: https://graphql-core-3.readthedocs.io/en/latest/intro.html
