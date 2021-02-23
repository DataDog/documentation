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

### Web Framework Compatibility

The `ddtrace` library includes support for a number of web frameworks, including:

| Framework                 | Supported Version | Library Documentation                                              |
| ------------------------- | ----------------- | ------------------------------------------------------------------ |
| [asgi][3]                 | >= 2.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#asgi    |
| [aiohttp][4]              | >= 1.2            | https://ddtrace.readthedocs.io/en/stable/integrations.html#aiohttp |
| [Bottle][5]               | >= 0.11           | https://ddtrace.readthedocs.io/en/stable/integrations.html#bottle  |
| [Django][6]               | >= 1.8            | https://ddtrace.readthedocs.io/en/stable/integrations.html#django  |
| [djangorestframework][6]  | >= 3.4            | https://ddtrace.readthedocs.io/en/stable/integrations.html#django  |
| [Falcon][7]               | >= 1.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#falcon  |
| [Flask][8]                | >= 0.10           | https://ddtrace.readthedocs.io/en/stable/integrations.html#flask   |
| [Molten][9]               | >= 0.7.0          | https://ddtrace.readthedocs.io/en/stable/integrations.html#molten  |
| [Pylons][10]              | >= 0.9.6          | https://ddtrace.readthedocs.io/en/stable/integrations.html#pylons  |
| [Pyramid][11]             | >= 1.7            | https://ddtrace.readthedocs.io/en/stable/integrations.html#pyramid |
| [pytest][12]              | >= 3.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#pytest  |
| [Sanic][13]               | >= 19.6.0         | https://ddtrace.readthedocs.io/en/stable/integrations.html#sanic   |
| [Starlette][14]           | >= 0.13.0         | https://ddtrace.readthedocs.io/en/stable/integrations.html#starlette |
| [Tornado][15]             | >= 4.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#tornado |


### Datastore Compatibility

The `ddtrace` library includes support for the following data stores:

| Datastore                          | Supported Version | Library Documentation                                                                         |
| ---------------------------------- | ----------------- | --------------------------------------------------------------------------------------------- |
| [algoliasearch][16]                | >= 1.20.0         | https://ddtrace.readthedocs.io/en/stable/integrations.html#algoliasearch                       |
| [Cassandra][17]                    | >= 3.5            | https://ddtrace.readthedocs.io/en/stable/integrations.html#cassandra                           |
| [Elasticsearch][18]                | >= 1.6            | https://ddtrace.readthedocs.io/en/stable/integrations.html#elasticsearch                       |
| [Flask Cache][19]                  | >= 0.12           | https://ddtrace.readthedocs.io/en/stable/integrations.html#flask-cache                         |
| [Memcached][20] [pylibmc][21]      | >= 1.4            | https://ddtrace.readthedocs.io/en/stable/integrations.html#pylibmc                             |
| [Memcached][20] [pymemcache][22]   | >= 1.3            | https://ddtrace.readthedocs.io/en/stable/integrations.html#pymemcache                          |
| [MongoDB][23] [Mongoengine][24]    | >= 0.11           | https://ddtrace.readthedocs.io/en/stable/integrations.html#mongoengine                         |
| [MongoDB][23] [Pymongo][25]        | >= 3.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#pymongo                             |
| [MySQL][26] [MySQL-python][27]     | >= 1.2.3          | https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.mysqldb      |
| [MySQL][26] [mysqlclient][28]      | >= 1.3            | https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.mysqldb      |
| [MySQL][26] [mysql-connector][29]  | >= 2.1            | https://ddtrace.readthedocs.io/en/stable/integrations.html#mysql-connector                     |
| [Postgres][30] [aiopg][31]         | >= 0.12.0         | https://ddtrace.readthedocs.io/en/stable/integrations.html#aiopg                               |
| [Postgres][30] [psycopg][32]       | >= 2.4            | https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.psycopg      |
| [PynamoDB][33]                     | >= 4.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#pynamodb                               |
| [PyODBC][34]                       | >= 4.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#pyodbc                               |
| [Redis][35]                        | >= 2.6            | https://ddtrace.readthedocs.io/en/stable/integrations.html#redis                               |
| [Redis][35] [redis-py-cluster][36] | >= 1.3.5          | https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.rediscluster |
| [SQLAlchemy][37]                   | >= 1.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#sqlalchemy                          |
| [SQLite3][38]                      | Fully Supported   | https://ddtrace.readthedocs.io/en/stable/integrations.html#sqlite                              |
| [Vertica][39]                      | >= 0.6            | https://ddtrace.readthedocs.io/en/stable/integrations.html#vertica                             |


### Library Compatibility

The `ddtrace` library includes support for the following libraries:

| Library           | Supported Version | Library Documentation                                                    |
| ----------------- | ----------------- | ------------------------------------------------------------------------ |
| [aiobotocore][40] | >= 0.2.3          | https://ddtrace.readthedocs.io/en/stable/integrations.html#aiobotocore |
| [asyncio][41]     | Fully Supported   | https://ddtrace.readthedocs.io/en/stable/integrations.html#asyncio     |
| [Botocore][42]    | >= 1.4.51         | https://ddtrace.readthedocs.io/en/stable/integrations.html#botocore    |
| [Boto2][43]       | >= 2.29.0         | https://ddtrace.readthedocs.io/en/stable/integrations.html#boto2       |
| [Celery][44]      | >= 3.1            | https://ddtrace.readthedocs.io/en/stable/integrations.html#celery      |
| [Consul][45]      | >= 0.7            | https://ddtrace.readthedocs.io/en/stable/integrations.html#consul     |
| [Futures][46]     | Fully Supported   | https://ddtrace.readthedocs.io/en/stable/integrations.html#futures     |
| [gevent][47]      | >= 1.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#gevent      |
| [Grpc][48]        | >= 1.8.0          | https://ddtrace.readthedocs.io/en/stable/integrations.html#grpc        |
| [httplib][49]     | Fully Supported   | https://ddtrace.readthedocs.io/en/stable/integrations.html#httplib     |
| [Jinja2][50]      | >= 2.7            | https://ddtrace.readthedocs.io/en/stable/integrations.html#jinja2      |
| [Kombu][51]       | >= 4.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#kombu       |
| [Mako][52]        | >= 0.1.0          | https://ddtrace.readthedocs.io/en/stable/integrations.html#mako        |
| [Requests][53]    | >= 2.08           | https://ddtrace.readthedocs.io/en/stable/integrations.html#requests    |


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-py
[2]: /help
[3]: http://asgi.readthedocs.io/
[4]: https://aiohttp.readthedocs.io
[5]: https://bottlepy.org
[6]: https://www.djangoproject.com
[7]: https://falconframework.org
[8]: http://flask.pocoo.org
[9]: https://moltenframework.com
[10]: http://pylonsproject.org
[11]: https://trypyramid.com
[12]: https://docs.pytest.org/en/stable/
[13]: https://sanic.readthedocs.io/en/latest/
[14]: https://www.starlette.io/
[15]: http://www.tornadoweb.org
[16]: https://www.algolia.com/doc/
[17]: https://cassandra.apache.org
[18]: https://www.elastic.co/products/elasticsearch
[19]: https://pythonhosted.org/Flask-Cache
[20]: https://memcached.org
[21]: http://sendapatch.se/projects/pylibmc
[22]: https://pymemcache.readthedocs.io
[23]: https://www.mongodb.com/what-is-mongodb
[24]: http://mongoengine.org
[25]: https://api.mongodb.com/python/current
[26]: https://www.mysql.com
[27]: https://pypi.org/project/MySQL-python
[28]: https://pypi.org/project/mysqlclient
[29]: https://dev.mysql.com/doc/connector-python/en/
[30]: https://www.postgresql.org
[31]: https://aiopg.readthedocs.io
[32]: http://initd.org/psycopg
[33]: https://pynamodb.readthedocs.io/en/latest/
[34]: https://pypi.org/project/pyodbc/
[35]: https://redis.io
[36]: https://redis-py-cluster.readthedocs.io
[37]: https://www.sqlalchemy.org
[38]: https://www.sqlite.org
[39]: https://www.vertica.com
[40]: https://pypi.org/project/aiobotocore/
[41]: https://docs.python.org/3/library/asyncio.html
[42]: https://pypi.org/project/botocore/
[43]: http://docs.pythonboto.org/en/latest
[44]: http://www.celeryproject.org
[45]: https://python-consul.readthedocs.io/en/latest/
[46]: https://docs.python.org/3/library/concurrent.futures.html
[47]: http://www.gevent.org
[48]: https://grpc.io
[49]: https://docs.python.org/2/library/httplib.html
[50]: http://jinja.pocoo.org
[51]: https://kombu.readthedocs.io/en/latest
[52]: https://www.makotemplates.org
[53]: https://requests.readthedocs.io/en/master/
