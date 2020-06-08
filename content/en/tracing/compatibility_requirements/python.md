---
title: Python Compatibility Requirements
kind: documentation
description: 'Compatibility Requirements for the Python tracer'
further_reading:
    - link: 'tracing/setup/python'
      tag: 'Documentation'
      text: 'Instrument Your Application'
---

Python versions `2.7` and `3.4` and onwards are supported.

## Integrations

### Web Framework Compatibility

The `ddtrace` library includes support for a number of web frameworks, including:

| Framework                 | Supported Version | PyPi Datadog Documentation                                         |
| ------------------------- | ----------------- | ------------------------------------------------------------------ |
| [aiohttp][1]             | >= 1.2            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#aiohttp |
| [Bottle][2]              | >= 0.11           | http://pypi.datadoghq.com/trace/docs/web_integrations.html#bottle  |
| [Django][3]              | >= 1.8            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#django  |
| [djangorestframework][3] | >= 3.4            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#django  |
| [Falcon][4]              | >= 1.0            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#falcon  |
| [Flask][5]               | >= 0.10           | http://pypi.datadoghq.com/trace/docs/web_integrations.html#flask   |
| [Molten][6]              | >= 0.7.0          | http://pypi.datadoghq.com/trace/docs/web_integrations.html#molten  |
| [Pylons][7]              | >= 0.9.6          | http://pypi.datadoghq.com/trace/docs/web_integrations.html#pylons  |
| [Pyramid][8]             | >= 1.7            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#pyramid |
| [Tornado][9]             | >= 4.0            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#tornado |

### Datastore Compatibility

The `ddtrace` library includes support for the following data stores:

| Datastore                          | Supported Version | PyPi Datadog Documentation                                                                    |
| ---------------------------------- | ----------------- | --------------------------------------------------------------------------------------------- |
| [Cassandra][10]                    | >= 3.5            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#cassandra                           |
| [Elasticsearch][11]                | >= 1.6            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#elasticsearch                       |
| [Flask Cache][12]                  | >= 0.12           | http://pypi.datadoghq.com/trace/docs/db_integrations.html#flask-cache                         |
| [Memcached][13] [pylibmc][14]      | >= 1.4            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#pylibmc                             |
| [Memcached][13] [pymemcache][15]   | >= 1.3            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#pymemcache                          |
| [MongoDB][16] [Mongoengine][17]    | >= 0.11           | http://pypi.datadoghq.com/trace/docs/db_integrations.html#mongoengine                         |
| [MongoDB][16] [Pymongo][18]        | >= 3.0            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#pymongo                             |
| [MySQL][19] [MySQL-python][20]     | >= 1.2.3          | http://pypi.datadoghq.com/trace/docs/db_integrations.html#module-ddtrace.contrib.mysqldb      |
| [MySQL][19] [mysqlclient][21]      | >= 1.3            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#module-ddtrace.contrib.mysqldb      |
| [MySQL][19] mysql-connector        | >= 2.1            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#mysql-connector                     |
| [Postgres][22] [aiopg][23]         | >= 0.12.0         | http://pypi.datadoghq.com/trace/docs/db_integrations.html#aiopg                               |
| [Postgres][22] [psycopg][24]       | >= 2.4            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#module-ddtrace.contrib.psycopg      |
| [Redis][25]                        | >= 2.6            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#redis                               |
| [Redis][25] [redis-py-cluster][26] | >= 1.3.5          | http://pypi.datadoghq.com/trace/docs/db_integrations.html#module-ddtrace.contrib.rediscluster |
| [SQLAlchemy][27]                   | >= 1.0            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#sqlalchemy                          |
| [SQLite3][28]                      | Fully Supported   | http://pypi.datadoghq.com/trace/docs/db_integrations.html#sqlite                              |
| [Vertica][29]                      | >= 0.6            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#vertica                             |

### Library Compatibility

The `ddtrace` library includes support for the following libraries:

| Library           | Supported Version | PyPi Datadog Documentation                                               |
| ----------------- | ----------------- | ------------------------------------------------------------------------ |
| [asyncio][30]     | Fully Supported   | http://pypi.datadoghq.com/trace/docs/async_integrations.html#asyncio     |
| [gevent][31]      | >= 1.0            | http://pypi.datadoghq.com/trace/docs/async_integrations.html#gevent      |
| [aiobotocore][32] | >= 0.2.3          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#aiobotocore |
| [Boto2][32]       | >= 2.29.0         | http://pypi.datadoghq.com/trace/docs/other_integrations.html#boto2       |
| [Botocore][32]    | >= 1.4.51         | http://pypi.datadoghq.com/trace/docs/other_integrations.html#botocore    |
| [Celery][33]      | >= 4.0.2          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#celery      |
| [Futures][34]     | Fully Supported   | http://pypi.datadoghq.com/trace/docs/other_integrations.html#futures     |
| [Grpc][35]        | >= 1.8.0          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#grpc        |
| [httplib][36]     | Fully Supported   | http://pypi.datadoghq.com/trace/docs/other_integrations.html#httplib     |
| [Jinja2][37]      | >= 2.7            | http://pypi.datadoghq.com/trace/docs/other_integrations.html#jinja2      |
| [Kombu][38]       | >= 4.0            | http://pypi.datadoghq.com/trace/docs/other_integrations.html#kombu       |
| [Mako][39]        | >= 0.1.0          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#mako        |
| [Requests][40]    | >= 2.08           | http://pypi.datadoghq.com/trace/docs/other_integrations.html#requests    |


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aiohttp.readthedocs.io
[2]: https://bottlepy.org
[3]: https://www.djangoproject.com
[4]: https://falconframework.org
[5]: http://flask.pocoo.org
[6]: https://moltenframework.com
[7]: http://pylonsproject.org
[8]: https://trypyramid.com
[9]: http://www.tornadoweb.org
[10]: https://cassandra.apache.org
[11]: https://www.elastic.co/products/elasticsearch
[12]: https://pythonhosted.org/Flask-Cache
[13]: https://memcached.org
[14]: http://sendapatch.se/projects/pylibmc
[15]: https://pymemcache.readthedocs.io
[16]: https://www.mongodb.com/what-is-mongodb
[17]: http://mongoengine.org
[18]: https://api.mongodb.com/python/current
[19]: https://www.mysql.com
[20]: https://pypi.org/project/MySQL-python
[21]: https://pypi.org/project/mysqlclient
[22]: https://www.postgresql.org
[23]: https://aiopg.readthedocs.io
[24]: http://initd.org/psycopg
[25]: https://redis.io
[26]: https://redis-py-cluster.readthedocs.io
[27]: https://www.sqlalchemy.org
[28]: https://www.sqlite.org
[29]: https://www.vertica.com
[30]: https://docs.python.org/3/library/asyncio.html
[31]: http://www.gevent.org
[32]: http://docs.pythonboto.org/en/latest
[33]: http://www.celeryproject.org
[34]: https://docs.python.org/3/library/concurrent.futures.html
[35]: https://grpc.io
[36]: https://docs.python.org/2/library/httplib.html
[37]: http://jinja.pocoo.org
[38]: https://kombu.readthedocs.io/en/latest
[39]: https://www.makotemplates.org
[40]: http://docs.python-requests.org/en/master
