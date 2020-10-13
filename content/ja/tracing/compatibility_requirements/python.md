---
title: Python 互換性要件
kind: ドキュメント
description: Python トレーサーの互換性要件
further_reading:
  - link: tracing/setup/python
    tag: Documentation
    text: アプリケーションのインスツルメンテーション
---
Python Datadog Trace ライブラリはオープンソースです。詳細については、[Github リポジトリ][1]をご覧ください。

トレーサーの最新バージョンでは、Python バージョン `2.7+` と `3.5+` がサポートされています。Python `3.4` は、Python トレーサーのバージョン `0.35.x` 以下でサポートされています。

## インテグレーション

ライブラリに関するサポートをご希望の場合は、[サポートチーム][2]までお気軽にお問い合わせください。

### Web フレームワークの互換性

`ddtrace` ライブラリには、次のような数多くの Ｗeb フレームワークのサポートが含まれています。

| フレームワーク                 | サポート対象のバージョン | PyPi Datadog ドキュメント                                         |
| ------------------------- | ----------------- | ------------------------------------------------------------------ |
| [asgi][43]               | >= 2.0         |  http://pypi.datadoghq.com/trace/docs/web_integrations.html#asgi |
| [aiohttp][3]             | 1.2 以降            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#aiohttp |
| [Bottle][4]              | 0.11 以降           | http://pypi.datadoghq.com/trace/docs/web_integrations.html#bottle  |
| [Django][5]              | 1.8 以降            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#django  |
| [djangorestframework][5] | 3.4 以降            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#django  |
| [Falcon][6]              | 1.0 以降            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#falcon  |
| [Flask][7]               | 0.10 以降           | http://pypi.datadoghq.com/trace/docs/web_integrations.html#flask   |
| [Molten][8]              | 0.7.0 以降          | http://pypi.datadoghq.com/trace/docs/web_integrations.html#molten  |
| [Pylons][9]              | 0.9.6 以降          | http://pypi.datadoghq.com/trace/docs/web_integrations.html#pylons  |
| [Pyramid][10]             | 1.7 以降            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#pyramid |
| [Tornado][11]             | 4.0 以降            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#tornado |

### データストアの互換性

`ddtrace` ライブラリには、次のデータストアのサポートが含まれています。

| data store                          | サポート対象のバージョン | PyPi Datadog ドキュメント                                                                    |
| ---------------------------------- | ----------------- | --------------------------------------------------------------------------------------------- |
| [Cassandra][12]                    | 3.5 以降            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#cassandra                           |
| [Elasticsearch][13]                | 1.6 以降            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#elasticsearch                       |
| [Flask Cache][14]                  | 0.12 以降           | http://pypi.datadoghq.com/trace/docs/db_integrations.html#flask-cache                         |
| [Memcached][15] [pylibmc][16]      | 1.4 以降            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#pylibmc                             |
| [Memcached][15] [pymemcache][17]   | 1.3 以降            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#pymemcache                          |
| [MongoDB][18] [Mongoengine][19]    | 0.11 以降           | http://pypi.datadoghq.com/trace/docs/db_integrations.html#mongoengine                         |
| [MongoDB][18] [Pymongo][20]        | 3.0 以降            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#pymongo                             |
| [MySQL][21] [MySQL-python][22]     | 1.2.3 以降          | http://pypi.datadoghq.com/trace/docs/db_integrations.html#module-ddtrace.contrib.mysqldb      |
| [MySQL][21] [mysqlclient][23]      | 1.3 以降            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#module-ddtrace.contrib.mysqldb      |
| [MySQL][21] mysql-connector        | 2.1 以降            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#mysql-connector                     |
| [Postgres][24] [aiopg][25]         | 0.12.0 以降         | http://pypi.datadoghq.com/trace/docs/db_integrations.html#aiopg                               |
| [Postgres][24] [psycopg][26]       | 2.4 以降            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#module-ddtrace.contrib.psycopg      |
| [Redis][27]                        | 2.6 以降            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#redis                               |
| [Redis][27] [redis-py-cluster][28] | 1.3.5 以降          | http://pypi.datadoghq.com/trace/docs/db_integrations.html#module-ddtrace.contrib.rediscluster |
| [SQLAlchemy][29]                   | 1.0 以降            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#sqlalchemy                          |
| [SQLite3][30]                      | 完全対応   | http://pypi.datadoghq.com/trace/docs/db_integrations.html#sqlite                              |
| [Vertica][31]                      | 0.6 以降            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#vertica                             |

### ライブラリの互換性

`ddtrace` ライブラリには、次のライブラリのサポートが含まれています。

| ライブラリ           | サポート対象のバージョン | PyPi Datadog ドキュメント                                               |
| ----------------- | ----------------- | ------------------------------------------------------------------------ |
| [asyncio][32]     | 完全対応   | http://pypi.datadoghq.com/trace/docs/async_integrations.html#asyncio     |
| [gevent][33]      | 1.0 以降            | http://pypi.datadoghq.com/trace/docs/async_integrations.html#gevent      |
| [aiobotocore][34] | 0.2.3 以降          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#aiobotocore |
| [Boto2][34]       | 2.29.0 以降         | http://pypi.datadoghq.com/trace/docs/other_integrations.html#boto2       |
| [Botocore][34]    | 1.4.51 以降         | http://pypi.datadoghq.com/trace/docs/other_integrations.html#botocore    |
| [Celery][35]      | 4.0.2 以降          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#celery      |
| [Futures][36]     | 完全対応   | http://pypi.datadoghq.com/trace/docs/other_integrations.html#futures     |
| [Grpc][37]        | 1.8.0 以降          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#grpc        |
| [httplib][38]     | 完全対応   | http://pypi.datadoghq.com/trace/docs/other_integrations.html#httplib     |
| [Jinja2][39]      | 2.7 以降            | http://pypi.datadoghq.com/trace/docs/other_integrations.html#jinja2      |
| [Kombu][40]       | 4.0 以降            | http://pypi.datadoghq.com/trace/docs/other_integrations.html#kombu       |
| [Mako][41]        | 0.1.0 以降          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#mako        |
| [Requests][42]    | 2.08 以降           | http://pypi.datadoghq.com/trace/docs/other_integrations.html#requests    |


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-py
[2]: /ja/help
[3]: https://aiohttp.readthedocs.io
[4]: https://bottlepy.org
[5]: https://www.djangoproject.com
[6]: https://falconframework.org
[7]: http://flask.pocoo.org
[8]: https://moltenframework.com
[9]: http://pylonsproject.org
[10]: https://trypyramid.com
[11]: http://www.tornadoweb.org
[12]: https://cassandra.apache.org
[13]: https://www.elastic.co/products/elasticsearch
[14]: https://pythonhosted.org/Flask-Cache
[15]: https://memcached.org
[16]: http://sendapatch.se/projects/pylibmc
[17]: https://pymemcache.readthedocs.io
[18]: https://www.mongodb.com/what-is-mongodb
[19]: http://mongoengine.org
[20]: https://api.mongodb.com/python/current
[21]: https://www.mysql.com
[22]: https://pypi.org/project/MySQL-python
[23]: https://pypi.org/project/mysqlclient
[24]: https://www.postgresql.org
[25]: https://aiopg.readthedocs.io
[26]: http://initd.org/psycopg
[27]: https://redis.io
[28]: https://redis-py-cluster.readthedocs.io
[29]: https://www.sqlalchemy.org
[30]: https://www.sqlite.org
[31]: https://www.vertica.com
[32]: https://docs.python.org/3/library/asyncio.html
[33]: http://www.gevent.org
[34]: http://docs.pythonboto.org/en/latest
[35]: http://www.celeryproject.org
[36]: https://docs.python.org/3/library/concurrent.futures.html
[37]: https://grpc.io
[38]: https://docs.python.org/2/library/httplib.html
[39]: http://jinja.pocoo.org
[40]: https://kombu.readthedocs.io/en/latest
[41]: https://www.makotemplates.org
[42]: http://docs.python-requests.org/en/master
[43]: http://asgi.readthedocs.io/
