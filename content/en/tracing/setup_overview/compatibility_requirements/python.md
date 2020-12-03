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
| [aiohttp][3]             | >= 1.2            | https://ddtrace.readthedocs.io/en/stable/integrations.html#aiohttp |
| [Bottle][4]              | >= 0.11           | https://ddtrace.readthedocs.io/en/stable/integrations.html#bottle  |
| [Django][5]              | >= 1.8            | https://ddtrace.readthedocs.io/en/stable/integrations.html#django  |
| [djangorestframework][5] | >= 3.4            | https://ddtrace.readthedocs.io/en/stable/integrations.html#django  |
| [Falcon][6]              | >= 1.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#falcon  |
| [Flask][7]               | >= 0.10           | https://ddtrace.readthedocs.io/en/stable/integrations.html#flask   |
| [Molten][8]              | >= 0.7.0          | https://ddtrace.readthedocs.io/en/stable/integrations.html#molten  |
| [Pylons][9]              | >= 0.9.6          | https://ddtrace.readthedocs.io/en/stable/integrations.html#pylons  |
| [Pyramid][10]             | >= 1.7            | https://ddtrace.readthedocs.io/en/stable/integrations.html#pyramid |
| [Sanic][11]             | >= 19.6.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#sanic |
| [Starlette][12]             | >= 0.13.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#starlette |
| [Tornado][13]             | >= 4.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#tornado |


### Datastore Compatibility

The `ddtrace` library includes support for the following data stores:

| Datastore                          | Supported Version | Library Documentation                                                                         |
| ---------------------------------- | ----------------- | --------------------------------------------------------------------------------------------- |
| [Cassandra][14]                    | >= 3.5            | https://ddtrace.readthedocs.io/en/stable/integrations.html#cassandra                           |
| [Elasticsearch][15]                | >= 1.6            | https://ddtrace.readthedocs.io/en/stable/integrations.html#elasticsearch                       |
| [Flask Cache][16]                  | >= 0.12           | https://ddtrace.readthedocs.io/en/stable/integrations.html#flask-cache                         |
| [Memcached][17] [pylibmc][18]      | >= 1.4            | https://ddtrace.readthedocs.io/en/stable/integrations.html#pylibmc                             |
| [Memcached][17] [pymemcache][19]   | >= 1.3            | https://ddtrace.readthedocs.io/en/stable/integrations.html#pymemcache                          |
| [MongoDB][20] [Mongoengine][21]    | >= 0.11           | https://ddtrace.readthedocs.io/en/stable/integrations.html#mongoengine                         |
| [MongoDB][20] [Pymongo][22]        | >= 3.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#pymongo                             |
| [MySQL][23] [MySQL-python][24]     | >= 1.2.3          | https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.mysqldb      |
| [MySQL][23] [mysqlclient][25]      | >= 1.3            | https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.mysqldb      |
| [MySQL][23] mysql-connector        | >= 2.1            | https://ddtrace.readthedocs.io/en/stable/integrations.html#mysql-connector                     |
| [Postgres][26] [aiopg][27]         | >= 0.12.0         | https://ddtrace.readthedocs.io/en/stable/integrations.html#aiopg                               |
| [Postgres][26] [psycopg][28]       | >= 2.4            | https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.psycopg      |
| [Redis][29]                        | >= 2.6            | https://ddtrace.readthedocs.io/en/stable/integrations.html#redis                               |
| [Redis][29] [redis-py-cluster][30] | >= 1.3.5          | https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.rediscluster |
| [SQLAlchemy][31]                   | >= 1.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#sqlalchemy                          |
| [SQLite3][32]                      | Fully Supported   | https://ddtrace.readthedocs.io/en/stable/integrations.html#sqlite                              |
| [Vertica][33]                      | >= 0.6            | https://ddtrace.readthedocs.io/en/stable/integrations.html#vertica                             |


### Library Compatibility

The `ddtrace` library includes support for the following libraries:

| Library           | Supported Version | Library Documentation                                                    |
| ----------------- | ----------------- | ------------------------------------------------------------------------ |
| [asyncio][34]     | Fully Supported   | https://ddtrace.readthedocs.io/en/stable/integrations.html#asyncio     |
| [gevent][35]      | >= 1.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#gevent      |
| [aiobotocore][36] | >= 0.2.3          | https://ddtrace.readthedocs.io/en/stable/integrations.html#aiobotocore |
| [Boto2][36]       | >= 2.29.0         | https://ddtrace.readthedocs.io/en/stable/integrations.html#boto2       |
| [Botocore][36]    | >= 1.4.51         | https://ddtrace.readthedocs.io/en/stable/integrations.html#botocore    |
| [Celery][37]      | >= 4.0.2          | https://ddtrace.readthedocs.io/en/stable/integrations.html#celery      |
| [Futures][38]     | Fully Supported   | https://ddtrace.readthedocs.io/en/stable/integrations.html#futures     |
| [Grpc][39]        | >= 1.8.0          | https://ddtrace.readthedocs.io/en/stable/integrations.html#grpc        |
| [httplib][40]     | Fully Supported   | https://ddtrace.readthedocs.io/en/stable/integrations.html#httplib     |
| [Jinja2][41]      | >= 2.7            | https://ddtrace.readthedocs.io/en/stable/integrations.html#jinja2      |
| [Kombu][42]       | >= 4.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#kombu       |
| [Mako][43]        | >= 0.1.0          | https://ddtrace.readthedocs.io/en/stable/integrations.html#mako        |
| [Requests][44]    | >= 2.08           | https://ddtrace.readthedocs.io/en/stable/integrations.html#requests    |


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
[11]: https://sanic.readthedocs.io/en/latest/
[12]: https://www.starlette.io/
[13]: https://trypyramid.com
[14]: http://www.tornadoweb.org
[15]: https://cassandra.apache.org
[16]: https://www.elastic.co/products/elasticsearch
[17]: https://pythonhosted.org/Flask-Cache
[18]: https://memcached.org
[19]: http://sendapatch.se/projects/pylibmc
[20]: https://pymemcache.readthedocs.io
[21]: https://www.mongodb.com/what-is-mongodb
[22]: http://mongoengine.org
[23]: https://api.mongodb.com/python/current
[24]: https://www.mysql.com
[25]: https://pypi.org/project/MySQL-python
[26]: https://pypi.org/project/mysqlclient
[27]: https://www.postgresql.org
[28]: https://aiopg.readthedocs.io
[29]: http://initd.org/psycopg
[30]: https://redis.io
[31]: https://redis-py-cluster.readthedocs.io
[32]: https://www.sqlalchemy.org
[33]: https://www.sqlite.org
[34]: https://www.vertica.com
[35]: https://docs.python.org/3/library/asyncio.html
[36]: http://www.gevent.org
[37]: http://docs.pythonboto.org/en/latest
[38]: http://www.celeryproject.org
[39]: https://docs.python.org/3/library/concurrent.futures.html
[40]: https://grpc.io
[41]: https://docs.python.org/2/library/httplib.html
[42]: http://jinja.pocoo.org
[43]: https://kombu.readthedocs.io/en/latest
[44]: https://www.makotemplates.org
