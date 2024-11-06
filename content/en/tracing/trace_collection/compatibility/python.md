---
title: Python Compatibility Requirements
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
| `>=1.0,<2` | Maintenance          |
| `>=2.0,<3` | General Availability |

And the library supports the following runtimes:

| OS      | CPU                   | Runtime | Runtime version | Supported ddtrace versions  |
|---------|-----------------------|---------|-----------------|---------------------------|
| Linux   | x86-64, i686, AArch64 | CPython | 2.7, 3.5-3.11   | `<2`                      |
| MacOS   | Intel, Apple Silicon  | CPython | 2.7, 3.5-3.11   | `<2`                      |
| Windows | 64bit, 32bit          | CPython | 2.7, 3.5-3.11   | `<2`                      |
| Linux   | x86-64, i686, AArch64 | CPython | 3.7+            | `>=2`                     |
| MacOS   | Intel, Apple Silicon  | CPython | 3.7+            | `>=2`                     |
| Windows | 64bit, 32bit          | CPython | 3.7+            | `>=2`                     |

## Integrations

Links

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
[61]: https://gunicorn.org/
[62]: https://snowflake.com/
[63]: https://opensearch.org/
[64]: https://www.structlog.org/en/stable/
[65]: https://loguru.readthedocs.io/en/stable/
[66]: https://logbook.readthedocs.io/en/stable/
