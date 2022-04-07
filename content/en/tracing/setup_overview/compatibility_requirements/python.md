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

The Python Datadog Trace library is open source. View the [GitHub repository][1] for more information.

Python versions `2.7+` and `3.5+` are supported in the latest version of the tracer. Python `3.4` is supported in versions `0.35.x` and below of the Python tracer.

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
| [Molten][11]               | >= 0.7.0          | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#molten  |
| [Pylons][12]              | >= 0.9.6          | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#pylons  |
| [Pyramid][13]             | >= 1.7            | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#pyramid |
| [pytest][14]              | >= 3.0            | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#pytest  |
| [Sanic][15]               | >= 19.6.0         | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#sanic   |
| [Starlette][16]           | >= 0.13.0         | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#starlette |
| [Tornado][17]             | >= 4.0            | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#tornado |



### Datastore compatibility

The `ddtrace` library includes support for the following data stores:

| Datastore                          | Supported Version | Automatic |  Library Documentation                                                                         |
| ---------------------------------- | ----------------- | --------- | --------------------------------------------------------------------------------------------- |
| [algoliasearch][18]                | >= 1.20.0         | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#algoliasearch                       |
| [Cassandra][19]                    | >= 3.5            | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#cassandra                           |
| [Elasticsearch][20]                | >= 1.6            | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#elasticsearch                       |
| [Flask Cache][21]                  | >= 0.12           | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#flask-cache                         |
| [Mariadb][22]                      | >= 1.0.0          | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#mariadb                             |
| [Memcached][23] [pylibmc][24]      | >= 1.4            | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#pylibmc                             |
| [Memcached][23] [pymemcache][25]   | >= 1.3            | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#pymemcache                          |
| [MongoDB][26] [Mongoengine][27]    | >= 0.11           | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#mongoengine                         |
| [MongoDB][26] [Pymongo][28]        | >= 3.0            | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#pymongo                             |
| [MySQL][29] [MySQL-python][30]     | >= 1.2.3          | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.mysqldb      |
| [MySQL][29] [mysqlclient][31]      | >= 1.3            | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.mysqldb      |
| [MySQL][29] [mysql-connector][32]  | >= 2.1            | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#mysql-connector                     |
| [Postgres][33] [aiopg][34]         | >= 0.12.0, <=&nbsp;0.16        | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#aiopg                               |
| [Postgres][33] [psycopg][35]       | >= 2.4            | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.psycopg      |
| [PynamoDB][36]                     | >= 4.0            | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#pynamodb                               |
| [PyODBC][37]                       | >= 4.0            | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#pyodbc                               |
| [Redis][38]                        | >= 2.6            | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#redis                               |
| [Redis][38] [redis-py-cluster][39] | >= 1.3.5          | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.rediscluster |
| [SQLAlchemy][40]                   | >= 1.0            | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#sqlalchemy                          |
| [SQLite3][41]                      | Fully Supported   | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#sqlite                              |
| [Vertica][42]                      | >= 0.6            | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#vertica                             |

### Library compatibility

The `ddtrace` library includes support for the following libraries:

| Library           | Supported Version |  Automatic       | Library Documentation                                                    |
| ----------------- | ----------------- | ---------------- | ------------------------------------------------------------------------ |
| [aiobotocore][43] | >= 0.2.3          | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#aiobotocore |
| [asyncio][44]     | Fully Supported   | > Python 3.7 yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#asyncio     |
| [Botocore][45]    | >= 1.4.51         | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#botocore    |
| [Boto2][46]       | >= 2.29.0         | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#boto2       |
| [Celery][47]      | >= 3.1            | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#celery      |
| [Consul][48]      | >= 0.7            | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#consul      |
| [Futures][49]     | Fully Supported   | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#futures     |
| [gevent][50]      | >= 1.0            | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#gevent      |
| [Grpc][51]        | >= 1.8.0          | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#grpc        |
| [httplib][52]     | Fully Supported   | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#httplib     |
| [Jinja2][53]      | >= 2.7            | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#jinja2      |
| [Kombu][54]       | >= 4.0            | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#kombu       |
| [Mako][55]        | >= 0.1.0          | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#mako        |
| [Requests][56]    | >= 2.08           | yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#requests    |
| [urllib3][57]     | >= 1.22           | no | https://ddtrace.readthedocs.io/en/stable/integrations.html#urllib3     |

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
[14]: https://docs.pytest.org/en/stable/
[15]: https://sanic.readthedocs.io/en/latest/
[16]: https://www.starlette.io/
[17]: http://www.tornadoweb.org
[18]: https://www.algolia.com/doc/
[19]: https://cassandra.apache.org
[20]: https://www.elastic.co/products/elasticsearch
[21]: https://pythonhosted.org/Flask-Cache
[22]: https://mariadb-corporation.github.io/mariadb-connector-python/index.html
[23]: https://memcached.org
[24]: http://sendapatch.se/projects/pylibmc
[25]: https://pymemcache.readthedocs.io
[26]: https://www.mongodb.com/what-is-mongodb
[27]: http://mongoengine.org
[28]: https://api.mongodb.com/python/current
[29]: https://www.mysql.com
[30]: https://pypi.org/project/MySQL-python
[31]: https://pypi.org/project/mysqlclient
[32]: https://dev.mysql.com/doc/connector-python/en/
[33]: https://www.postgresql.org
[34]: https://aiopg.readthedocs.io
[35]: http://initd.org/psycopg
[36]: https://pynamodb.readthedocs.io/en/latest/
[37]: https://pypi.org/project/pyodbc/
[38]: https://redis.io
[39]: https://redis-py-cluster.readthedocs.io
[40]: https://www.sqlalchemy.org
[41]: https://www.sqlite.org
[42]: https://www.vertica.com
[43]: https://pypi.org/project/aiobotocore/
[44]: https://docs.python.org/3/library/asyncio.html
[45]: https://pypi.org/project/botocore/
[46]: http://docs.pythonboto.org/en/latest
[47]: http://www.celeryproject.org
[48]: https://python-consul.readthedocs.io/en/latest/
[49]: https://docs.python.org/3/library/concurrent.futures.html
[50]: http://www.gevent.org
[51]: https://grpc.io
[52]: https://docs.python.org/2/library/httplib.html
[53]: http://jinja.pocoo.org
[54]: https://kombu.readthedocs.io/en/latest
[55]: https://www.makotemplates.org
[56]: https://requests.readthedocs.io/en/master/
[57]: https://urllib3.readthedocs.io/en/stable/
