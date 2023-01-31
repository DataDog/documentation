---
title: Python Compatibility Requirements
kind: documentation
description: 'Compatibility Requirements for the Python tracer'
aliases:
  - /tracing/compatibility_requirements/python
  - /tracing/setup_overview/compatibility_requirements/python
code_lang: python
type: multi-code-lang
code_lang_weight: 10
further_reading:
    - link: 'tracing/trace_collection/dd_libraries/python'
      tag: 'Documentation'
      text: 'Instrument Your Application'
---

## Releases

The Python APM Client library follows a [versioning policy][1] that specifies the support level for the different versions of the library and Python runtime. 

Two release branches are supported:

| Release    | Support level        |
|------------|----------------------|
| `<1`       | Maintenance           |
| `>=1.0,<2` | General Availability |

And the library supports the following runtimes:

| OS      | CPU                   | Runtime | Runtime version | Support ddtrace versions |
|---------|-----------------------|---------|-----------------|--------------------------|
| Linux   | x86-64, i686, AArch64 | CPython | 2.7, 3.5-3.10   | `<2`                     |
| MacOS   | Intel, Apple Silicon  | CPython | 2.7, 3.5-3.10   | `<2`                     |
| Windows | 64bit, 32bit          | CPython | 2.7, 3.5-3.10   | `<2`                     |

## Integrations

To request support for additional libraries, contact our awesome [support team][2].

### Web framework compatibility

The `ddtrace` library includes support for a number of web frameworks, including:

| Framework                 | Supported Version | Automatic | Library Documentation                                              |
| ------------------------- | ----------------- | --------- |------------------------------------------------------------------ |
| [asgi][3]                 | >= 2.0            | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#asgi    |
| [aiohttp][4] (client)     | >= 2.0            | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#aiohttp |
| [aiohttp][4] (server)     | >= 2.0            | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#aiohttp |
| [Bottle][5]               | >= 0.11           | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#bottle  |
| [CherryPy][6]            | >= 11.2.0         | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#cherrypy|
| [Django][7]               | >= 1.8            | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#django  |
| [djangorestframework][7]  | >= 3.4            | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#django  |
| [Falcon][8]               | >= 1.0            | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#falcon  |
| [Flask][9]                | >= 0.10           | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#flask   |
| [FastAPI][10]              | >= 0.51           | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#fastapi |
| [Gunicorn][11]            | >= 20.0.04        | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#gunicorn |
| [Molten][12]               | >= 0.7.0          | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#molten  |
| [Pylons][13]              | >= 0.9.6          | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#pylons  |
| [Pyramid][14]             | >= 1.7            | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#pyramid |
| [pytest][15]              | >= 3.0            | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#pytest  |
| [Sanic][16]               | >= 19.6.0         | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#sanic   |
| [Starlette][17]           | >= 0.13.0         | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#starlette |
| [Tornado][18]             | >= 4.0            | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#tornado |



### Datastore compatibility

The `ddtrace` library includes support for the following data stores:

| Datastore                          | Supported Version | Automatic |  Library Documentation                                                                         |
| ---------------------------------- | ----------------- | --------- | --------------------------------------------------------------------------------------------- |
| [algoliasearch][19]                | >= 1.20.0         | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#algoliasearch                       |
| [asyncpg][20]                      | >= 0.18.0         | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#asyncpg                             |
| [Cassandra][21]                    | >= 3.5            | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#cassandra                           |
| [Elasticsearch][22]                | >= 1.6            | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#elasticsearch                       |
| [Flask Cache][23]                  | >= 0.12           | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#flask-cache                         |
| [Mariadb][24]                      | >= 1.0.0          | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#mariadb                             |
| [Memcached][25] [pylibmc][26]      | >= 1.4            | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#pylibmc                             |
| [Memcached][25] [pymemcache][27]   | >= 1.3            | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#pymemcache                          |
| [MongoDB][28] [Mongoengine][29]    | >= 0.11           | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#mongoengine                         |
| [MongoDB][28] [Pymongo][30]        | >= 3.0            | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#pymongo                             |
| [MySQL][31] [MySQL-python][32]     | >= 1.2.3          | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.mysqldb      |
| [MySQL][31] [mysqlclient][33]      | >= 1.3            | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.mysqldb      |
| [MySQL][31] [mysql-connector][34]  | >= 2.1            | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#mysql-connector                     |
| [Postgres][35] [aiopg][36]         | >= 0.12.0, <=&nbsp;0.16        | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#aiopg                               |
| [Postgres][35] [psycopg][37]       | >= 2.4            | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.psycopg      |
| [PyMySQL][38]                      | >= 0.7            | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html?highlight=pymysql#pymysql |
| [PynamoDB][39]                     | >= 4.0            | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#pynamodb |
| [PyODBC][40]                       | >= 4.0            | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#pyodbc                               |
| [Redis][41]                        | >= 2.6            | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#redis                               |
| [Redis][41] [redis-py-cluster][42] | >= 1.3.5          | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.rediscluster |
| [SQLAlchemy][43]                   | >= 1.0            | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#sqlalchemy                          |
| [SQLite3][44]                      | Fully Supported   | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#sqlite                              |
| [Vertica][45]                      | >= 0.6            | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#vertica                             |

### Library compatibility

The `ddtrace` library includes support for the following libraries:

| Library           | Supported Version |  Automatic       | Library Documentation                                                    |
| ----------------- | ----------------- | ---------------- | ------------------------------------------------------------------------ |
| [aiobotocore][46] | >= 0.2.3          | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#aiobotocore |
| [asyncio][47]     | Fully Supported   | > Python 3.7 yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#asyncio     |
| [Botocore][48]    | >= 1.4.51         | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#botocore    |
| [Boto2][49]       | >= 2.29.0         | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#boto2       |
| [Celery][50]      | >= 3.1            | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#celery      |
| [Consul][51]      | >= 0.7            | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#consul      |
| [Futures][52]     | Fully Supported   | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#futures     |
| [gevent][53]      | >= 1.0            | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#gevent      |
| [Grpc][54]        | >= 1.8.0          | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#grpc        |
| [httplib][55]     | Fully Supported   | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#httplib     |
| [Jinja2][56]      | >= 2.7            | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#jinja2      |
| [Kombu][57]       | >= 4.0            | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#kombu       |
| [Mako][58]        | >= 0.1.0          | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#mako        |
| [Requests][59]    | >= 2.08           | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#requests    |
| [urllib3][60]     | >= 1.22           | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#urllib3     |
| [graphql-core][61]| >= 2.0            | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#graphql |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://ddtrace.readthedocs.io/en/stable/versioning.html
[2]: /help
[3]: http://asgi.readthedocs.io/
[4]: https://aiohttp.readthedocs.io
[5]: https://bottlepy.org
[6]: https://cherrypy.org/
[7]: https://www.djangoproject.com
[8]: https://falconframework.org
[9]: http://flask.pocoo.org
[10]: https://fastapi.tiangolo.com/
[11]: https://gunicorn.org/
[12]: https://moltenframework.com
[13]: http://pylonsproject.org
[14]: https://trypyramid.com
[15]: https://docs.pytest.org/en/stable/
[16]: https://sanic.readthedocs.io/en/latest/
[17]: https://www.starlette.io/
[18]: http://www.tornadoweb.org
[19]: https://www.algolia.com/doc/
[20]: https://magicstack.github.io/asyncpg/
[21]: https://cassandra.apache.org
[22]: https://www.elastic.co/products/elasticsearch
[23]: https://pythonhosted.org/Flask-Cache
[24]: https://mariadb-corporation.github.io/mariadb-connector-python/index.html
[25]: https://memcached.org
[26]: http://sendapatch.se/projects/pylibmc
[27]: https://pymemcache.readthedocs.io
[28]: https://www.mongodb.com/what-is-mongodb
[29]: http://mongoengine.org
[30]: https://api.mongodb.com/python/current
[31]: https://www.mysql.com
[32]: https://pypi.org/project/MySQL-python
[33]: https://pypi.org/project/mysqlclient
[34]: https://dev.mysql.com/doc/connector-python/en/
[35]: https://www.postgresql.org
[36]: https://aiopg.readthedocs.io
[37]: http://initd.org/psycopg
[38]: https://pypi.org/project/PyMySQL/
[39]: https://pynamodb.readthedocs.io/en/latest/
[40]: https://pypi.org/project/pyodbc/
[41]: https://redis.io
[42]: https://redis-py-cluster.readthedocs.io
[43]: https://www.sqlalchemy.org
[44]: https://www.sqlite.org
[45]: https://www.vertica.com
[46]: https://pypi.org/project/aiobotocore/
[47]: https://docs.python.org/3/library/asyncio.html
[48]: https://pypi.org/project/botocore/
[49]: http://docs.pythonboto.org/en/latest
[50]: http://www.celeryproject.org
[51]: https://python-consul.readthedocs.io/en/latest/
[52]: https://docs.python.org/3/library/concurrent.futures.html
[53]: http://www.gevent.org
[54]: https://grpc.io
[55]: https://docs.python.org/2/library/httplib.html
[56]: http://jinja.pocoo.org
[57]: https://kombu.readthedocs.io/en/latest
[58]: https://www.makotemplates.org
[59]: https://requests.readthedocs.io/en/master/
[60]: https://urllib3.readthedocs.io/en/stable/
[61]: https://graphql-core-3.readthedocs.io/en/latest/intro.html
