---
title: Heroku Buildpack
kind: documentation
aliases:
  - /fr/developers/faq/how-do-i-collect-metrics-from-heroku-with-datadog
---
Ce Buildpack installe l'Agent Datadog dans votre Heroku Dyno pour collecter des métriques système, des métriques d'application personnalisées et des traces. Pour collecter des métriques ou des traces d'application personnalisées, incluez le language appropriée [via la bibliothèque DogStatsD ou Datadog APM][1] dans votre application.

## Installation

Pour ajouter ce Buildpack à votre projet, ainsi que pour définir les variables d'environnement requises:

```shell
cd <root of my project>

# If this is a new Heroku project
heroku create

# Add the appropriate language-specific buildpack. For example:
heroku buildpacks:add heroku/ruby

# Enable Heroku Labs Dyno Metadata
heroku labs:enable runtime-dyno-metadata -a $(heroku apps:info|grep ===|cut -d' ' -f2)

# Add this buildpack and set your Datadog API key
heroku buildpacks:add --index 1 https://github.com/DataDog/heroku-buildpack-datadog.git
heroku config:add DD_API_KEY=<your API key>

# Deploy to Heroku
git push heroku master
```

Une fois terminé, l'agent Datadog démarre automatiquement à chaque démarrage de Dyno.

L'agent Datadog fournit un port d'écoute sur le port 8125 pour les métriques et événements StatsD/DogStatsD. Les traces sont elles collectées sur le port 8126.

## Configuration

En plus des variables d'environnement présentées ci-dessus, vous pouvez en définir plusieurs autres:

| Paramètre | Description|
| --- | --- |
| `DD_API_KEY` | *Obligatoire* Votre clé API est disponible sur la page [Intégrations de l'API Datadog][2]. Notez qu'il s'agit de la clé *API* et non de la clé d'application. |
| `DD_HOSTNAME` | *Obsolète* **AVERTISSEMENT**: La définition manuelle du nom d'hôte peut entraîner des erreurs de continuité des métriques. Il est recommandé de ne *pas* définir cette variable. Parce que les hôte dyno sont éphémères, il est recommandé de monitorer en fonction des tags `dynoname` ou` appname`. |
| `DD_TAGS` | *Optionnel* Définit des tags supplémentaires fournis sous la forme d'une chaîne délimitée par des virgules. Par exemple, `heroku config:set DD_TAGS=simple-tag-0,tag-key-1:tag-value-1`.  Le Buildpack ajoute automatiquement les tags `dyno` et `dynohost` qui représentent respectivement le nom du Dyno (par exemple web.1) et l'ID host (par exemple 33f232db-7fa7-461e-b623-18e60944f44f). Voir le ["Guide to tagging"][3] pour plus d'informations. |
| `DD_HISTOGRAM_PERCENTILES` | *Optionnel* Définissez éventuellement des percentiles supplémentaires pour vos métriques histogramme. Consultez [comment représenter les percentiles][4]. |
| `DISABLE_DATADOG_AGENT` | *Optionnel* Lorsqu'il est défini, l'agent Datadog n'est pas exécuté. |
| `DD_APM_ENABLED` | *Optionnel* L'agent de trace Datadog (APM) est exécuté par défaut. Définissez ceci sur `false` pour désactiver l'agent de trace. |
| `DD_AGENT_VERSION` | *Optionnel* Par défaut, le Buildpack installe la dernière version de l'Agent Datadog disponible dans le référentiel de packages. Utilisez cette variable pour installer les anciennes versions de l'Agent Datadog (notez que toutes les versions de l'Agent ne sont pas nécessairement disponibles). |
| `DD_SERVICE_ENV` | *Optionnel* L'agent Datadog essaie automatiquement d'identifier votre environnement en recherchant un tag de la forme `env:<environment name>`. Pour plus d'informations, consultez la page [Environnements de traçage Datadog][5]. |

## Plus d'informations
Visitez la [page du projet Github][6] pour plus d'informations et pour consultez le code source.

[1]: http://docs.datadoghq.com/libraries/
[2]: https://app.datadoghq.com/account/settings#api
[3]: http://docs.datadoghq.com/guides/tagging/
[4]: https://help.datadoghq.com/hc/en-us/articles/204588979-How-to-graph-percentiles-in-Datadog
[5]: https://docs.datadoghq.com/tracing/environments/
[6]: https://github.com/DataDog/heroku-buildpack-datadog