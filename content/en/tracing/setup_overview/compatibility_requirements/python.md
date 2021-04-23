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
| [CherryPy][6]            | >= 11.2.0         | https://ddtrace.readthedocs.io/en/stable/integrations.html#cherrypy|
| [Django][7]               | >= 1.8            | https://ddtrace.readthedocs.io/en/stable/integrations.html#django  |
| [djangorestframework][7]  | >= 3.4            | https://ddtrace.readthedocs.io/en/stable/integrations.html#django  |
| [Falcon][8]               | >= 1.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#falcon  |
| [Flask][9]                | >= 0.10           | https://ddtrace.readthedocs.io/en/stable/integrations.html#flask   |
| [FastAPI][10]              | >= 0.51           | https://ddtrace.readthedocs.io/en/stable/integrations.html#fastapi |
| [Molten][11]               | >= 0.7.0          | https://ddtrace.readthedocs.io/en/stable/integrations.html#molten  |
| [Pylons][12]              | >= 0.9.6          | https://ddtrace.readthedocs.io/en/stable/integrations.html#pylons  |
| [Pyramid][13]             | >= 1.7            | https://ddtrace.readthedocs.io/en/stable/integrations.html#pyramid |
| [pytest][14]              | >= 3.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#pytest  |
| [Sanic][15]               | >= 19.6.0         | https://ddtrace.readthedocs.io/en/stable/integrations.html#sanic   |
| [Starlette][16]           | >= 0.13.0         | https://ddtrace.readthedocs.io/en/stable/integrations.html#starlette |
| [Tornado][17]             | >= 4.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#tornado |


### Datastore Compatibility

The `ddtrace` library includes support for the following data stores:

| Datastore                          | Supported Version | Library Documentation                                                                         |
| ---------------------------------- | ----------------- | --------------------------------------------------------------------------------------------- |
| [algoliasearch][18]                | >= 1.20.0         | https://ddtrace.readthedocs.io/en/stable/integrations.html#algoliasearch                       |
| [Cassandra][19]                    | >= 3.5            | https://ddtrace.readthedocs.io/en/stable/integrations.html#cassandra                           |
| [Elasticsearch][20]                | >= 1.6            | https://ddtrace.readthedocs.io/en/stable/integrations.html#elasticsearch                       |
| [Flask Cache][21]                  | >= 0.12           | https://ddtrace.readthedocs.io/en/stable/integrations.html#flask-cache                         |
| [Memcached][22] [pylibmc][23]      | >= 1.4            | https://ddtrace.readthedocs.io/en/stable/integrations.html#pylibmc                             |
| [Memcached][22] [pymemcache][24]   | >= 1.3            | https://ddtrace.readthedocs.io/en/stable/integrations.html#pymemcache                          |
| [MongoDB][25] [Mongoengine][26]    | >= 0.11           | https://ddtrace.readthedocs.io/en/stable/integrations.html#mongoengine                         |
| [MongoDB][25] [Pymongo][27]        | >= 3.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#pymongo                             |
| [MySQL][28] [MySQL-python][29]     | >= 1.2.3          | https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.mysqldb      |
| [MySQL][28] [mysqlclient][30]      | >= 1.3            | https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.mysqldb      |
| [MySQL][28] [mysql-connector][31]  | >= 2.1            | https://ddtrace.readthedocs.io/en/stable/integrations.html#mysql-connector                     |
| [Postgres][32] [aiopg][33]         | >= 0.12.0         | https://ddtrace.readthedocs.io/en/stable/integrations.html#aiopg                               |
| [Postgres][32] [psycopg][34]       | >= 2.4            | https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.psycopg      |
| [PynamoDB][35]                     | >= 4.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#pynamodb                               |
| [PyODBC][36]                       | >= 4.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#pyodbc                               |
| [Redis][37]                        | >= 2.6            | https://ddtrace.readthedocs.io/en/stable/integrations.html#redis                               |
| [Redis][37] [redis-py-cluster][38] | >= 1.3.5          | https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.rediscluster |
| [SQLAlchemy][39]                   | >= 1.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#sqlalchemy                          |
| [SQLite3][40]                      | Fully Supported   | https://ddtrace.readthedocs.io/en/stable/integrations.html#sqlite                              |
| [Vertica][41]                      | >= 0.6            | https://ddtrace.readthedocs.io/en/stable/integrations.html#vertica                             |


### Library Compatibility

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
| [Jinja2][51]      | >= 2.7            | https://ddtrace.readthedocs.io/en/stable/integrations.html#jinja2      |
| [Kombu][52]       | >= 4.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#kombu       |
| [Mako][53]        | >= 0.1.0          | https://ddtrace.readthedocs.io/en/stable/integrations.html#mako        |
| [Requests][54]    | >= 2.08           | https://ddtrace.readthedocs.io/en/stable/integrations.html#requests    |
| [urllib3][55]     | >= 1.22           | https://ddtrace.readthedocs.io/en/stable/integrations.html#urllib3     |


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-py
[2]: /help
[3]: http://asgi.readthedocs.io/
[4]: https://aiohttp.readthedocs.io
[5]: https://bottlepy.org
[6]: https://cherrypy.org/
[7]: https://falconframework.org
[8]: http://flask.pocoo.org
[9]: https://fastapi.tiangolo.com/
[10]: https://moltenframework.com
[11]: http://pylonsproject.org
[12]: https://trypyramid.com
[13]: https://docs.pytest.org/en/stable/
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
[51]: http://jinja.pocoo.org
[52]: https://kombu.readthedocs.io/en/latest
[53]: https://www.makotemplates.org
[54]: https://requests.readthedocs.io/en/master/
[55]: https://urllib3.readthedocs.io/en/latest/
