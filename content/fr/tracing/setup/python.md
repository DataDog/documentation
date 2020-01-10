---
title: Tracer des applications Python
kind: documentation
aliases:
  - /fr/tracing/python/
  - /fr/tracing/languages/python/
  - /fr/agent/apm/python/
further_reading:
  - link: 'https://github.com/DataDog/dd-trace-py'
    tag: GitHub
    text: Code source
  - link: 'http://pypi.datadoghq.com/trace/docs/'
    tag: Pypi
    text: Documentation relative à l'API
  - link: tracing/visualization/
    tag: Documentation
    text: 'Explorer vos services, ressources et traces'
  - link: tracing/
    tag: Utilisation avancée
    text: Utilisation avancée
---
<div class="alert alert-info">
Pour les applications Python Django, notez que le tracing est désactivé lorsque votre application est lancée en mode <code>DEBUG</code>. Pour en savoir plus, <a href="http://pypi.datadoghq.com/trace/docs/web_integrations.html#django">cliquez ici</a>.
</div>

## Installation et démarrage

<div class="alert alert-info">Si vous avez déjà un compte Datadog, vous trouverez des instructions détaillées dans nos guides intégrés à l'application pour les configurations <a href="https://app.datadoghq.com/apm/docs?architecture=host-based&language=python" target=_blank> basées sur un host</a> et les configurations <a href="https://app.datadoghq.com/apm/docs?architecture=container-based&language=python" target=_blank>basées sur un conteneur</a>.</div>

Pour commencer le tracing d'applications écrites en Python, vous devez d'abord [installer et configurer l'Agent Datadog][1]. Pour obtenir davantage d'informations, consultez la documentation relative au [tracing d'applications Docker][2] ou au [tracing d'applications Kubernetes][3].

Installez ensuite la bibliothèque de tracing Datadog, `ddtrace`, avec pip :

```python
pip install ddtrace
```

Pour instrumenter votre application Python, utilisez alors la commande `ddtrace-run` incluse. Pour l'utiliser, ajoutez `ddtrace-run` en préfixe à la commande de votre point d'entrée Python.

Par exemple, si votre application est lancée avec `python app.py`, exécutez la commande suivante :

```sh
$ ddtrace-run python app.py
```

Pour découvrir des options d'utilisation, de configuration et de contrôle plus avancées, consultez la [documentation relative à l'API][4] de Datadog.

### Variable d'environnement

Lorsque vous utilisez **ddtrace-run**, les [variables d'environnement][5] suivantes sont disponibles :

| Variable d'environnement               | Valeur par défaut     | Description                                                                                                                                                                                                                                                                 |
|------------------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DATADOG_TRACE_ENABLED`            | `true`      | Active l'instrumentation des frameworks web et des bibliothèques. Lorsqu'elle est définie sur `false`, le code de votre application ne génère aucune trace.                                                                                                                                                          |
| `DATADOG_ENV`                      | `null`      | Définit l'environnement d'une application, par ex. `prod`, `pre-prod` ou staging`. [Découvrir comment configurer votre environnement][6].                                                                                                                                                    |
| `DATADOG_TRACE_DEBUG`              | `false`     | Active les logs de debugging dans le traceur. Remarque : cette fonctionnalité n'est [pas disponible avec Django][7].                                                                                                                                                                                       |
| `DATADOG_SERVICE_NAME`             | `null`      | Remplace le nom de service à utiliser pour ce programme. La valeur est transmise lorsque vous configurez un middleware pour les intégrations de framework Web (par ex. pylons, flask ou django). Si vous n'utilisez pas d'intégration Web pour le tracing, [nous vous conseillons de définir le nom de service dans le code](#integrations). |
| `DATADOG_PATCH_MODULES`            | `none`      | Remplace les modules patchés pour l'exécution de ce programme. Le format doit être le suivant : `DATADOG_PATCH_MODULES=module:patch,module:patch...`.                                                                                                                                |
| `DD_AGENT_HOST`                    | `localhost` | Remplace l'adresse du host de l'Agent de trace utilisée par le traceur par défaut pour l'envoi des traces.                                                                                                                                                                          |
| `DATADOG_TRACE_AGENT_PORT`         | `8126`      | Remplace le port utilisé par le traceur par défaut pour l'envoi des traces.                                                                                                                                                                                                                 |
| `DATADOG_PRIORITY_SAMPLING`        | `true`      | Active l'[échantillonnage prioritaire][8].                                                                                                                                                                                                                                             
 |
| `DD_LOGS_INJECTION`                | `false`     | Active la [mise en relation des logs et des traces injectées][9].                                                                                                                                                                                                                           |
| `DD_TRACE_ANALYTICS_ENABLED`       | `false`     | Active App Analytics pour toutes les [intégrations Web][10].                                                                                                                                                                                                                   |
| `DD_INTEGRATION_ANALYTICS_ENABLED` | `false`     | Active App Analytics pour une intégration spécifique. Exemple : `DD_BOTO_ANALYTICS_ENABLED=true` .                                                                                                                                                                                |

## Modifier le hostname de l'Agent

Configurez vos traceurs d'application de façon à ce qu'ils envoie les traces vers un hostname d'Agent personnalisé. Le module de tracing Python recherche automatiquement les variables ENV `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT` et s'initialise avec celles-ci.

```python
import os
from ddtrace import tracer

tracer.configure(
    hostname=os.environ['DD_AGENT_HOST'],
    port=os.environ['DD_TRACE_AGENT_PORT'],
)
```

## Compatibilité

Les versions `2.7` et `3.4` et les versions ultérieures de Python sont prises en charge.

### Intégrations

#### Compatibilité des frameworks Web

La bibliothèque `ddtrace` prend en charge de nombreux frameworks Web, y compris :

| Framework                 | Version prise en charge | Documentation PyPi de Datadog                                         |
|---------------------------|-------------------|--------------------------------------------------------------------|
| [aiohttp][11]             | >= 1.2            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#aiohttp |
| [Bottle][12]              | >= 0.11           | http://pypi.datadoghq.com/trace/docs/web_integrations.html#bottle  |
| [Django][13]              | >= 1.8            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#django  |
| [djangorestframework][13] | >= 3.4            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#django  |
| [Falcon][14]              | >= 1.0            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#falcon  |
| [Flask][15]               | >= 0.10           | http://pypi.datadoghq.com/trace/docs/web_integrations.html#flask   |
| [Molten][16]              | >= 0.7.0          | http://pypi.datadoghq.com/trace/docs/web_integrations.html#molten  |
| [Pylons][17]              | >= 0.9.6          | http://pypi.datadoghq.com/trace/docs/web_integrations.html#pylons  |
| [Pyramid][18]             | >= 1.7            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#pyramid |
| [Tornado][19]             | >= 4.0            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#tornado |

#### Compatibilité des datastores

La bibliothèque `ddtrace` prend en charge les datastores suivants :

| Datastore                          | Version prise en charge | Documentation PyPi de Datadog                                                                    |
|------------------------------------|-------------------|-----------------------------------------------------------------------------------------------|
| [Cassandra][20]                    | >= 3.5            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#cassandra                           |
| [Elasticsearch][21]                | >= 1.6            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#elasticsearch                       |
| [Flask Cache][22]                  | >= 0.12           | http://pypi.datadoghq.com/trace/docs/db_integrations.html#flask-cache                         |
| [Memcached][23] [pylibmc][24]      | >= 1.4            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#pylibmc                             |
| [Memcached][23] [pymemcache][25]   | >= 1.3            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#pymemcache                          |
| [MongoDB][26] [Mongoengine][27]    | >= 0.11           | http://pypi.datadoghq.com/trace/docs/db_integrations.html#mongoengine                         |
| [MongoDB][26] [Pymongo][28]        | >= 3.0            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#pymongo                             |
| [MySQL][29] [MySQL-python][30]     | >= 1.2.3          | http://pypi.datadoghq.com/trace/docs/db_integrations.html#module-ddtrace.contrib.mysqldb      |
| [MySQL][29] [mysqlclient][31]      | >= 1.3            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#module-ddtrace.contrib.mysqldb      |
| [MySQL][29] mysql-connector        | >= 2.1            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#mysql-connector                     |
| [Postgres][32] [aiopg][33]         | >= 0.12.0         | http://pypi.datadoghq.com/trace/docs/db_integrations.html#aiopg                               |
| [Postgres][32] [psycopg][34]       | >= 2.4            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#module-ddtrace.contrib.psycopg      |
| [Redis][35]                        | >= 2.6            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#redis                               |
| [Redis][35] [redis-py-cluster][36] | >= 1.3.5          | http://pypi.datadoghq.com/trace/docs/db_integrations.html#module-ddtrace.contrib.rediscluster |
| [SQLAlchemy][37]                   | >= 1.0            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#sqlalchemy                          |
| [SQLite3][38]                      | Prise en charge complète   | http://pypi.datadoghq.com/trace/docs/db_integrations.html#sqlite                              |
| [Vertica][39]                      | >= 0.6            | http://pypi.datadoghq.com/trace/docs/db_integrations.html#vertica                             |

#### Compatibilité des bibliothèques

La bibliothèque `ddtrace` prend en charge les bibliothèques suivantes :

| Bibliothèque           | Version prise en charge | Documentation PyPi de Datadog                                               |
|-------------------|-------------------|--------------------------------------------------------------------------|
| [asyncio][40]     | Prise en charge complète   | http://pypi.datadoghq.com/trace/docs/async_integrations.html#asyncio     |
| [gevent][41]      | >= 1.0            | http://pypi.datadoghq.com/trace/docs/async_integrations.html#gevent      |
| [aiobotocore][42] | >= 0.2.3          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#aiobotocore |
| [Boto2][42]       | >= 2.29.0         | http://pypi.datadoghq.com/trace/docs/other_integrations.html#boto2       |
| [Botocore][42]    | >= 1.4.51         | http://pypi.datadoghq.com/trace/docs/other_integrations.html#botocore    |
| [Celery][43]      | >= 4.0.2          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#celery      |
| [Futures][44]     | Prise en charge complète   | http://pypi.datadoghq.com/trace/docs/other_integrations.html#futures     |
| [Grpc][45]        | >= 1.8.0          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#grpc        |
| [httplib][46]     | Prise en charge complète   | http://pypi.datadoghq.com/trace/docs/other_integrations.html#httplib     |
| [Jinja2][47]      | >= 2.7            | http://pypi.datadoghq.com/trace/docs/other_integrations.html#jinja2      |
| [Kombu][48]       | >= 4.0            | http://pypi.datadoghq.com/trace/docs/other_integrations.html#kombu       |
| [Mako][49]        | >= 0.1.0          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#mako        |
| [Requests][50]    | >= 2.08           | http://pypi.datadoghq.com/trace/docs/other_integrations.html#requests    |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/send_traces
[2]: /fr/tracing/setup/docker
[3]: /fr/agent/kubernetes/daemonset_setup/#trace-collection
[4]: http://pypi.datadoghq.com/trace/docs
[5]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtracerun
[6]: /fr/tracing/guide/setting_primary_tags_to_scope/
[7]: http://pypi.datadoghq.com/trace/docs/web_integrations.html?highlight=django#django
[8]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#priority-sampling
[9]: /fr/tracing/connect_logs_and_traces/?tab=python
[10]: /fr/tracing/app_analytics/?tab=python#automatic-configuration
[11]: https://aiohttp.readthedocs.io
[12]: https://bottlepy.org
[13]: https://www.djangoproject.com
[14]: https://falconframework.org
[15]: http://flask.pocoo.org
[16]: https://moltenframework.com
[17]: http://pylonsproject.org
[18]: https://trypyramid.com
[19]: http://www.tornadoweb.org
[20]: https://cassandra.apache.org
[21]: https://www.elastic.co/products/elasticsearch
[22]: https://pythonhosted.org/Flask-Cache
[23]: https://memcached.org
[24]: http://sendapatch.se/projects/pylibmc
[25]: https://pymemcache.readthedocs.io
[26]: https://www.mongodb.com/what-is-mongodb
[27]: http://mongoengine.org
[28]: https://api.mongodb.com/python/current
[29]: https://www.mysql.com
[30]: https://pypi.org/project/MySQL-python
[31]: https://pypi.org/project/mysqlclient
[32]: https://www.postgresql.org
[33]: https://aiopg.readthedocs.io
[34]: http://initd.org/psycopg
[35]: https://redis.io
[36]: https://redis-py-cluster.readthedocs.io
[37]: https://www.sqlalchemy.org
[38]: https://www.sqlite.org
[39]: https://www.vertica.com
[40]: https://docs.python.org/3/library/asyncio.html
[41]: http://www.gevent.org
[42]: http://docs.pythonboto.org/en/latest
[43]: http://www.celeryproject.org
[44]: https://docs.python.org/3/library/concurrent.futures.html
[45]: https://grpc.io
[46]: https://docs.python.org/2/library/httplib.html
[47]: http://jinja.pocoo.org
[48]: https://kombu.readthedocs.io/en/latest
[49]: https://www.makotemplates.org
[50]: http://docs.python-requests.org/en/master