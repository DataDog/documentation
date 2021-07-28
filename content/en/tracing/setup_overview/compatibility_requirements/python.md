---
title: Python Compatibility Requirements
kind: documentation
description: 'Compatibility Requirements for the Python tracer'
aliases:
  - /tracing/compatibility_requirements/python
code_lang: python
type: multi-code-lang
code_lang_weight: 10
further_reading:
    - link: 'tracing/setup/python'
      tag: 'Documentation'
      text: 'Instrument Your Application'
---

The Python Datadog Trace library is open source. View the [Github repository][1] for more information.

Python versions `2.7+` and `3.5+` are supported in the latest version of the tracer. Python `3.4` is supported in versions `0.35.x` and below of the Python tracer.

## Integrations

To request support for additional libraries, contact our awesome [support team][2].

### Web framework compatibility

The `ddtrace` library includes support for a number of web frameworks, including:

| Framework                 | Supported Version | Library Documentation                                              |
| ------------------------- | ----------------- | ------------------------------------------------------------------ |
| [asgi][3]                 | >= 2.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#asgi    |
| [aiohttp][4]              | >= 1.2            | https://ddtrace.readthedocs.io/en/stable/integrations.html#aiohttp |
| [Bottle][5]               | >= 0.11           | https://ddtrace.readthedocs.io/en/stable/integrations.html#bottle  |
| [CherryPy][6]            | >= 11.2.0         | https://ddtrace.readthedocs.io/en/stable/integrations.html#cherrypy|
| [Django][7]               | >= 1.8            | https://ddtrace.readthedocs.io/en/stable/integrations.html#django  |
| [djangorestframework][7]  | >= 3.4            | https://ddtrace.readthedocs.io/en/stable/integrations.html#django  |
| [Falcon][8]               | >= 1.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#falcon  |
| [Flask][9]                | >= 0.10           | https://ddtrace.readthedocs.io/en/stable/integrations.html#flask   |
| [FastAPI][10]              | >= 0.51           | https://ddtrace.readthedocs.io/en/stable/integrations.html#fastapi |
| [Molten][11]               | >= 0.7.0          | https://ddtrace.readthedocs.io/en/stable/integrations.html#molten  |
| [Pylons][12]              | >= 0.9.6          | https://ddtrace.readthedocs.io/en/stable/integrations.html#pylons  |
| [Pyramid][13]             | >= 1.7            | https://ddtrace.readthedocs.io/en/stable/integrations.html#pyramid |
| [Sanic][14]               | >= 19.6.0         | https://ddtrace.readthedocs.io/en/stable/integrations.html#sanic   |
| [Starlette][15]           | >= 0.13.0         | https://ddtrace.readthedocs.io/en/stable/integrations.html#starlette |
| [Tornado][16]             | >= 4.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#tornado |

### Datastore compatibility

The `ddtrace` library includes support for the following data stores:

| Datastore                          | Supported Version | Library Documentation                                                                         |
| ---------------------------------- | ----------------- | --------------------------------------------------------------------------------------------- |
| [algoliasearch][17]                | >= 1.20.0         | https://ddtrace.readthedocs.io/en/stable/integrations.html#algoliasearch                       |
| [Cassandra][18]                    | >= 3.5            | https://ddtrace.readthedocs.io/en/stable/integrations.html#cassandra                           |
| [Elasticsearch][19]                | >= 1.6            | https://ddtrace.readthedocs.io/en/stable/integrations.html#elasticsearch                       |
| [Flask Cache][20]                  | >= 0.12           | https://ddtrace.readthedocs.io/en/stable/integrations.html#flask-cache                         |
| [Memcached][21] [pylibmc][22]      | >= 1.4            | https://ddtrace.readthedocs.io/en/stable/integrations.html#pylibmc                             |
| [Memcached][21] [pymemcache][23]   | >= 1.3            | https://ddtrace.readthedocs.io/en/stable/integrations.html#pymemcache                          |
| [MongoDB][24] [Mongoengine][25]    | >= 0.11           | https://ddtrace.readthedocs.io/en/stable/integrations.html#mongoengine                         |
| [MongoDB][24] [Pymongo][26]        | >= 3.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#pymongo                             |
| [MySQL][27] [MySQL-python][28]     | >= 1.2.3          | https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.mysqldb      |
| [MySQL][27] [mysqlclient][29]      | >= 1.3            | https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.mysqldb      |
| [MySQL][27] [mysql-connector][30]  | >= 2.1            | https://ddtrace.readthedocs.io/en/stable/integrations.html#mysql-connector                     |
| [Postgres][31] [aiopg][32]         | >= 0.12.0         | https://ddtrace.readthedocs.io/en/stable/integrations.html#aiopg                               |
| [Postgres][31] [psycopg][33]       | >= 2.4            | https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.psycopg      |
| [PynamoDB][34]                     | >= 4.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#pynamodb                               |
| [PyODBC][35]                       | >= 4.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#pyodbc                               |
| [Redis][36]                        | >= 2.6            | https://ddtrace.readthedocs.io/en/stable/integrations.html#redis                               |
| [Redis][36] [redis-py-cluster][37] | >= 1.3.5          | https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.rediscluster |
| [SQLAlchemy][38]                   | >= 1.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#sqlalchemy                          |
| [SQLite3][39]                      | Fully Supported   | https://ddtrace.readthedocs.io/en/stable/integrations.html#sqlite                              |
| [Vertica][40]                      | >= 0.6            | https://ddtrace.readthedocs.io/en/stable/integrations.html#vertica                             |

### Library compatibility

The `ddtrace` library includes support for the following libraries:

| Library           | Supported Version | Library Documentation                                                    |
| ----------------- | ----------------- | ------------------------------------------------------------------------ |
| [aiobotocore][41] | >= 0.2.3          | https://ddtrace.readthedocs.io/en/stable/integrations.html#aiobotocore |
| [asyncio][42]     | Fully Supported   | https://ddtrace.readthedocs.io/en/stable/integrations.html#asyncio     |
| [Botocore][43]    | >= 1.4.51         | https://ddtrace.readthedocs.io/en/stable/integrations.html#botocore    |
| [Boto2][44]       | >= 2.29.0         | https://ddtrace.readthedocs.io/en/stable/integrations.html#boto2       |
| [Celery][45]      | >= 3.1            | https://ddtrace.readthedocs.io/en/stable/integrations.html#celery      |
| [Consul][46]      | >= 0.7            | https://ddtrace.readthedocs.io/en/stable/integrations.html#consul      |
| [Futures][47]     | Fully Supported   | https://ddtrace.readthedocs.io/en/stable/integrations.html#futures     |
| [gevent][48]      | >= 1.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#gevent      |
| [Grpc][49]        | >= 1.8.0          | https://ddtrace.readthedocs.io/en/stable/integrations.html#grpc        |
| [httplib][50]     | Fully Supported   | https://ddtrace.readthedocs.io/en/stable/integrations.html#httplib     |
| [httpx][51]       | Fully Supported   | https://ddtrace.readthedocs.io/en/stable/integrations.html#httpx       |
| [Jinja2][52]      | >= 2.7            | https://ddtrace.readthedocs.io/en/stable/integrations.html#jinja2      |
| [Kombu][53]       | >= 4.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#kombu       |
| [Mako][54]        | >= 0.1.0          | https://ddtrace.readthedocs.io/en/stable/integrations.html#mako        |
| [pytest][55]              | >= 3.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#pytest  |
| [Requests][56]    | >= 2.08           | https://ddtrace.readthedocs.io/en/stable/integrations.html#requests    |
| [urllib3][57]     | >= 1.22           | https://ddtrace.readthedocs.io/en/stable/integrations.html#urllib3     |


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-py
[2]: /help
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
[14]: https://sanic.readthedocs.io/en/latest/
[15]: https://www.starlette.io/
[16]: http://www.tornadoweb.org
[17]: https://www.algolia.com/doc/
[18]: https://cassandra.apache.org
[19]: https://www.elastic.co/products/elasticsearch
[20]: https://pythonhosted.org/Flask-Cache
[21]: https://memcached.org
[22]: http://sendapatch.se/projects/pylibmc
[23]: https://pymemcache.readthedocs.io
[24]: https://www.mongodb.com/what-is-mongodb
[25]: http://mongoengine.org
[26]: https://api.mongodb.com/python/current
[27]: https://www.mysql.com
[28]: https://pypi.org/project/MySQL-python
[29]: https://pypi.org/project/mysqlclient
[30]: https://dev.mysql.com/doc/connector-python/en/
[31]: https://www.postgresql.org
[32]: https://aiopg.readthedocs.io
[33]: http://initd.org/psycopg
[34]: https://pynamodb.readthedocs.io/en/latest/
[35]: https://pypi.org/project/pyodbc/
[36]: https://redis.io
[37]: https://redis-py-cluster.readthedocs.io
[38]: https://www.sqlalchemy.org
[39]: https://www.sqlite.org
[40]: https://www.vertica.com
[41]: https://pypi.org/project/aiobotocore/
[42]: https://docs.python.org/3/library/asyncio.html
[43]: https://pypi.org/project/botocore/
[44]: http://docs.pythonboto.org/en/latest
[45]: http://www.celeryproject.org
[46]: https://python-consul.readthedocs.io/en/latest/
[47]: https://docs.python.org/3/library/concurrent.futures.html
[48]: http://www.gevent.org
[49]: https://grpc.io
[50]: https://docs.python.org/2/library/httplib.html
[51]: https://www.python-httpx.org/
[52]: http://jinja.pocoo.org
[53]: https://kombu.readthedocs.io/en/latest
[54]: https://www.makotemplates.org
[55]: https://docs.pytest.org/en/stable/
[56]: https://requests.readthedocs.io/en/master/
[57]: https://urllib3.readthedocs.io/en/stable/
