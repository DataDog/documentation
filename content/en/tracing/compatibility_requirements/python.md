---
title: Python Compatibility Requirements
kind: documentation
description: 'Compatibility Requirements for the Python tracer'
further_reading:
    - link: 'tracing/setup/python'
      tag: 'Documentation'
      text: 'Instrument Your Application'
---

The Python Datadog Trace library is open source - view the [Github repository][1] for more information.

Python versions `2.7+` and `3.5+` are supported in the latest version of the tracer. Python `3.4` is supported in versions `0.35.x` and below of the Python tracer.

## Integrations

To request support for additional libraries, contact our awesome [support team][2].

### Web Framework Compatibility

The `ddtrace` library includes support for a number of web frameworks, including:

| Framework                 | Supported Version | PyPi Datadog Documentation                                         |
| ------------------------- | ----------------- | ------------------------------------------------------------------ |
| [asgi][3]               | >= 2.0         |  http://pypi.datadoghq.com/trace/docs/web_integrations.html#asgi |
| [aiohttp][4]             | >= 1.2            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#aiohttp |
| [Bottle][5]              | >= 0.11           | http://pypi.datadoghq.com/trace/docs/web_integrations.html#bottle  |
| [Django][6]              | >= 1.8            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#django  |
| [djangorestframework][6] | >= 3.4            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#django  |
| [Falcon][7]              | >= 1.0            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#falcon  |
| [Flask][8]               | >= 0.10           | http://pypi.datadoghq.com/trace/docs/web_integrations.html#flask   |
| [Molten][9]              | >= 0.7.0          | http://pypi.datadoghq.com/trace/docs/web_integrations.html#molten  |
| [Pylons][10]              | >= 0.9.6          | http://pypi.datadoghq.com/trace/docs/web_integrations.html#pylons  |
| [Pyramid][11]             | >= 1.7            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#pyramid |
| [Tornado][12]             | >= 4.0            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#tornado |

### Datastore Compatibility

The `ddtrace` library includes support for the following data stores:

| Datastore                          | Supported Version | PyPi Datadog Documentation                                                                    |
| ---------------------------------- | ----------------- | --------------------------------------------------------------------------------------------- |
| [Cassandra][13]                    | >= 3.5            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#cassandra                           |
| [Elasticsearch][14]                | >= 1.6            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#elasticsearch                       |
| [Flask Cache][15]                  | >= 0.12           | http://pypi.datadoghq.com/trace/docs/db_integrations.html#flask-cache                         |
| [Memcached][16] [pylibmc][17]      | >= 1.4            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#pylibmc                             |
| [Memcached][16] [pymemcache][18]   | >= 1.3            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#pymemcache                          |
| [MongoDB][19] [Mongoengine][20]    | >= 0.11           | http://pypi.datadoghq.com/trace/docs/db_integrations.html#mongoengine                         |
| [MongoDB][19] [Pymongo][21]        | >= 3.0            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#pymongo                             |
| [MySQL][22] [MySQL-python][23]     | >= 1.2.3          | http://pypi.datadoghq.com/trace/docs/db_integrations.html#module-ddtrace.contrib.mysqldb      |
| [MySQL][22] [mysqlclient][24]      | >= 1.3            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#module-ddtrace.contrib.mysqldb      |
| [MySQL][22] mysql-connector        | >= 2.1            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#mysql-connector                     |
| [Postgres][25] [aiopg][26]         | >= 0.12.0         | http://pypi.datadoghq.com/trace/docs/db_integrations.html#aiopg                               |
| [Postgres][25] [psycopg][27]       | >= 2.4            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#module-ddtrace.contrib.psycopg      |
| [Redis][28]                        | >= 2.6            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#redis                               |
| [Redis][28] [redis-py-cluster][29] | >= 1.3.5          | http://pypi.datadoghq.com/trace/docs/db_integrations.html#module-ddtrace.contrib.rediscluster |
| [SQLAlchemy][30]                   | >= 1.0            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#sqlalchemy                          |
| [SQLite3][31]                      | Fully Supported   | http://pypi.datadoghq.com/trace/docs/db_integrations.html#sqlite                              |
| [Vertica][32]                      | >= 0.6            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#vertica                             |

### Library Compatibility

The `ddtrace` library includes support for the following libraries:

| Library           | Supported Version | PyPi Datadog Documentation                                               |
| ----------------- | ----------------- | ------------------------------------------------------------------------ |
| [asyncio][33]     | Fully Supported   | http://pypi.datadoghq.com/trace/docs/async_integrations.html#asyncio     |
| [gevent][34]      | >= 1.0            | http://pypi.datadoghq.com/trace/docs/async_integrations.html#gevent      |
| [aiobotocore][35] | >= 0.2.3          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#aiobotocore |
| [Boto2][35]       | >= 2.29.0         | http://pypi.datadoghq.com/trace/docs/other_integrations.html#boto2       |
| [Botocore][35]    | >= 1.4.51         | http://pypi.datadoghq.com/trace/docs/other_integrations.html#botocore    |
| [Celery][36]      | >= 4.0.2          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#celery      |
| [Futures][37]     | Fully Supported   | http://pypi.datadoghq.com/trace/docs/other_integrations.html#futures     |
| [Grpc][38]        | >= 1.8.0          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#grpc        |
| [httplib][39]     | Fully Supported   | http://pypi.datadoghq.com/trace/docs/other_integrations.html#httplib     |
| [Jinja2][40]      | >= 2.7            | http://pypi.datadoghq.com/trace/docs/other_integrations.html#jinja2      |
| [Kombu][41]       | >= 4.0            | http://pypi.datadoghq.com/trace/docs/other_integrations.html#kombu       |
| [Mako][42]        | >= 0.1.0          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#mako        |
| [Requests][43]    | >= 2.08           | http://pypi.datadoghq.com/trace/docs/other_integrations.html#requests    |


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
[43]: http://docs.python-requests.org/en/master
