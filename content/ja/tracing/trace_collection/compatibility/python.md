---
aliases:
- /ja/tracing/compatibility_requirements/python
- /ja/tracing/setup_overview/compatibility_requirements/python
code_lang: python
code_lang_weight: 10
description: Python トレーサーの互換性要件
further_reading:
- link: tracing/trace_collection/dd_libraries/python
  tag: ドキュメント
  text: アプリケーションのインスツルメンテーション
kind: documentation
title: Python 互換性要件
type: multi-code-lang
---

## リリース

Python APM クライアントライブラリは，ライブラリと Python ランタイムの異なるバージョンに対するサポートレベルを指定する[バージョニングポリシー][1]に従っています。

2 つのリリースブランチに対応しています。

| リリース    | サポートレベル        |
|------------|----------------------|
| `<1`       | メンテナンス           |
| `>=1.0,<2` | 一般提供 |

また、このライブラリは以下のランタイムをサポートしています。

| OS      | CPU                   | ランタイム | ランタイムバージョン | ddtrace のバージョンに対応 |
|---------|-----------------------|---------|-----------------|--------------------------|
| Linux   | x86-64、i686、AArch64 | CPython | 2.7、3.5-3.10   | `<2`                     |
| MacOS   | Intel、Apple Silicon  | CPython | 2.7、3.5-3.10   | `<2`                     |
| Windows | 64bit、32bit          | CPython | 2.7、3.5-3.10   | `<2`                     |

## インテグレーション

ライブラリに関するサポートをご希望の場合は、[サポートチーム][2]までお気軽にお問い合わせください。

### Web フレームワークの互換性

`ddtrace` ライブラリには、次のような数多くの Ｗeb フレームワークのサポートが含まれています。

| フレームワーク                 | サポート対象のバージョン | 自動 | ライブラリドキュメント                                              |
| ------------------------- | ----------------- | --------- |------------------------------------------------------------------ |
| [asgi][3]                 | >= 2.0            | いいえ | https://ddtrace.readthedocs.io/en/stable/integrations.html#asgi    |
| [aiohttp][4] (クライアント)     | >= 2.0            | はい | https://ddtrace.readthedocs.io/en/stable/integrations.html#aiohttp |
| [aiohttp][4] (サーバー)     | >= 2.0            | いいえ | https://ddtrace.readthedocs.io/en/stable/integrations.html#aiohttp |
| [Bottle][5]               | 0.11 以降           | いいえ | https://ddtrace.readthedocs.io/en/stable/integrations.html#bottle  |
| [CherryPy][6]            | >= 11.2.0         | いいえ | https://ddtrace.readthedocs.io/en/stable/integrations.html#cherrypy|
| [Django][7]               | 1.8 以降            | はい | https://ddtrace.readthedocs.io/en/stable/integrations.html#django  |
| [djangorestframework][7]  | 3.4 以降            | はい | https://ddtrace.readthedocs.io/en/stable/integrations.html#django  |
| [Falcon][8]               | 1.0 以降            | いいえ | https://ddtrace.readthedocs.io/en/stable/integrations.html#falcon  |
| [Flask][9]                | 0.10 以降           | はい | https://ddtrace.readthedocs.io/en/stable/integrations.html#flask   |
| [FastAPI][10]              | >= 0.51           | はい | https://ddtrace.readthedocs.io/en/stable/integrations.html#fastapi |
| [Molten][11]               | 0.7.0 以降          | はい | https://ddtrace.readthedocs.io/en/stable/integrations.html#molten  |
| [Pylons][12]              | 0.9.6 以降          | いいえ | https://ddtrace.readthedocs.io/en/stable/integrations.html#pylons  |
| [Pyramid][13]             | 1.7 以降            | いいえ | https://ddtrace.readthedocs.io/en/stable/integrations.html#pyramid |
| [pytest][14]              | 3.0 以降            | いいえ | https://ddtrace.readthedocs.io/en/stable/integrations.html#pytest  |
| [Sanic][15]               | >= 19.6.0         | はい | https://ddtrace.readthedocs.io/en/stable/integrations.html#sanic   |
| [Starlette][16]           | >= 0.13.0         | はい | https://ddtrace.readthedocs.io/en/stable/integrations.html#starlette |
| [Tornado][17]             | 4.0 以降            | いいえ | https://ddtrace.readthedocs.io/en/stable/integrations.html#tornado |



### データストアの互換性

`ddtrace` ライブラリには、次のデータストアのサポートが含まれています。

| data store                          | サポート対象のバージョン | 自動 |  ライブラリドキュメント                                                                         |
| ---------------------------------- | ----------------- | --------- | --------------------------------------------------------------------------------------------- |
| [algoliasearch][18]                | >= 1.20.0         | はい | https://ddtrace.readthedocs.io/en/stable/integrations.html#algoliasearch                       |
| [Cassandra][19]                    | 3.5 以降            | はい | https://ddtrace.readthedocs.io/en/stable/integrations.html#cassandra                           |
| [Elasticsearch][20]                | 1.6 以降            | はい | https://ddtrace.readthedocs.io/en/stable/integrations.html#elasticsearch                       |
| [Flask Cache][21]                  | 0.12 以降           | いいえ | https://ddtrace.readthedocs.io/en/stable/integrations.html#flask-cache                         |
| [Mariadb][22]                      | >= 1.0.0          | はい | https://ddtrace.readthedocs.io/en/stable/integrations.html#mariadb                             |
| [Memcached][23] [pylibmc][24]      | 1.4 以降            | はい | https://ddtrace.readthedocs.io/en/stable/integrations.html#pylibmc                             |
| [Memcached][23] [pymemcache][25]   | 1.3 以降            | はい | https://ddtrace.readthedocs.io/en/stable/integrations.html#pymemcache                          |
| [MongoDB][26] [Mongoengine][27]    | 0.11 以降           | はい | https://ddtrace.readthedocs.io/en/stable/integrations.html#mongoengine                         |
| [MongoDB][26] [Pymongo][28]        | 3.0 以降            | はい | https://ddtrace.readthedocs.io/en/stable/integrations.html#pymongo                             |
| [MySQL][29] [MySQL-python][30]     | 1.2.3 以降          | はい | https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.mysqldb      |
| [MySQL][29] [mysqlclient][31]      | 1.3 以降            | はい | https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.mysqldb      |
| [MySQL][29] [mysql-connector][32]  | 2.1 以降            | はい | https://ddtrace.readthedocs.io/en/stable/integrations.html#mysql-connector                     |
| [Postgres][33] [aiopg][34]         | >= 0.12.0, <=&nbsp;0.16        | はい | https://ddtrace.readthedocs.io/en/stable/integrations.html#aiopg                               |
| [Postgres][33] [psycopg][35]       | 2.4 以降            | はい | https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.psycopg      |
| [PyMySQL][36]                      | >= 0.7            | はい | https://ddtrace.readthedocs.io/en/stable/integrations.html?highlight=pymysql#pymysql |
| [PynamoDB][37]                     | 4.0 以降            | はい | https://ddtrace.readthedocs.io/en/stable/integrations.html#pynamodb |
| [PyODBC][38]                       | 4.0 以降            | はい | https://ddtrace.readthedocs.io/en/stable/integrations.html#pyodbc                               |
| [Redis][39]                        | 2.6 以降            | はい | https://ddtrace.readthedocs.io/en/stable/integrations.html#redis                               |
| [Redis][39] [redis-py-cluster][40] | 1.3.5 以降          | はい | https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.rediscluster |
| [SQLAlchemy][41]                   | 1.0 以降            | いいえ | https://ddtrace.readthedocs.io/en/stable/integrations.html#sqlalchemy                          |
| [SQLite3][42]                      | 完全対応   | はい | https://ddtrace.readthedocs.io/en/stable/integrations.html#sqlite                              |
| [Vertica][43]                      | 0.6 以降            | はい | https://ddtrace.readthedocs.io/en/stable/integrations.html#vertica                             |

### ライブラリの互換性

`ddtrace` ライブラリには、次のライブラリのサポートが含まれています。

| ライブラリ           | サポート対象のバージョン |  自動       | ライブラリドキュメント                                                    |
| ----------------- | ----------------- | ---------------- | ------------------------------------------------------------------------ |
| [aiobotocore][44] | 0.2.3 以降          | いいえ | https://ddtrace.readthedocs.io/en/stable/integrations.html#aiobotocore |
| [asyncio][45]     | 完全対応   | > Python 3.7 yes | https://ddtrace.readthedocs.io/en/stable/integrations.html#asyncio     |
| [Botocore][46]    | 1.4.51 以降         | はい | https://ddtrace.readthedocs.io/en/stable/integrations.html#botocore    |
| [Boto2][47]       | 2.29.0 以降         | はい | https://ddtrace.readthedocs.io/en/stable/integrations.html#boto2       |
| [Celery][48]      | >= 3.1            | はい | https://ddtrace.readthedocs.io/en/stable/integrations.html#celery      |
| [Consul][49]      | >= 0.7            | はい | https://ddtrace.readthedocs.io/en/stable/integrations.html#consul      |
| [Futures][50]     | 完全対応   | はい | https://ddtrace.readthedocs.io/en/stable/integrations.html#futures     |
| [gevent][51]      | 1.0 以降            | いいえ | https://ddtrace.readthedocs.io/en/stable/integrations.html#gevent      |
| [Grpc][52]        | 1.8.0 以降          | はい | https://ddtrace.readthedocs.io/en/stable/integrations.html#grpc        |
| [httplib][53]     | 完全対応   | いいえ | https://ddtrace.readthedocs.io/en/stable/integrations.html#httplib     |
| [Jinja2][54]      | 2.7 以降            | はい | https://ddtrace.readthedocs.io/en/stable/integrations.html#jinja2      |
| [Kombu][55]       | 4.0 以降            | いいえ | https://ddtrace.readthedocs.io/en/stable/integrations.html#kombu       |
| [Mako][56]        | 0.1.0 以降          | はい | https://ddtrace.readthedocs.io/en/stable/integrations.html#mako        |
| [Requests][57]    | 2.08 以降           | はい | https://ddtrace.readthedocs.io/en/stable/integrations.html#requests    |
| [urllib3][58]     | >= 1.22           | いいえ | https://ddtrace.readthedocs.io/en/stable/integrations.html#urllib3     |
| [graphql-core][59]| >= 2.0            | はい | https://ddtrace.readthedocs.io/en/stable/integrations.html#graphql |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://ddtrace.readthedocs.io/en/stable/versioning.html
[2]: /ja/help
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
[36]: https://pypi.org/project/PyMySQL/
[37]: https://pynamodb.readthedocs.io/en/latest/
[38]: https://pypi.org/project/pyodbc/
[39]: https://redis.io
[40]: https://redis-py-cluster.readthedocs.io
[41]: https://www.sqlalchemy.org
[42]: https://www.sqlite.org
[43]: https://www.vertica.com
[44]: https://pypi.org/project/aiobotocore/
[45]: https://docs.python.org/3/library/asyncio.html
[46]: https://pypi.org/project/botocore/
[47]: http://docs.pythonboto.org/en/latest
[48]: http://www.celeryproject.org
[49]: https://python-consul.readthedocs.io/en/latest/
[50]: https://docs.python.org/3/library/concurrent.futures.html
[51]: http://www.gevent.org
[52]: https://grpc.io
[53]: https://docs.python.org/2/library/httplib.html
[54]: http://jinja.pocoo.org
[55]: https://kombu.readthedocs.io/en/latest
[56]: https://www.makotemplates.org
[57]: https://requests.readthedocs.io/en/master/
[58]: https://urllib3.readthedocs.io/en/stable/
[59]: https://graphql-core-3.readthedocs.io/en/latest/intro.html