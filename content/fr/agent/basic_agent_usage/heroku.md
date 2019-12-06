---
aliases:
  - /fr/developers/faq/how-do-i-collect-metrics-from-heroku-with-datadog
kind: documentation
title: Buildpack Heroku Datadog
---
Ce [buildpack Heroku][1] installe l'Agent Datadog dans votre dyno Heroku pour recueillir des métriques système, des métriques d'application personnalisée et des traces. Pour recueillir des métriques ou des traces d'application personnalisée, ajoutez le langage approprié [via la bibliothèque DogStatsD ou APM Datadog][2] dans votre application.

## Installation

Pour ajouter ce buildpack à votre projet, ainsi que pour définir les variables d'environnement requises :

```shell
cd <DOSSIER_RACINE_PROJET_HEROKU>

# S'il s'agit d'un nouveau projet Heroku
heroku create

# Ajouter le buildpack approprié pour le langage. Par exemple :
heroku buildpacks:add heroku/ruby

# Activer les métadonnées Heroku Labs Dyno
heroku labs:enable runtime-dyno-metadata -a $(heroku apps:info|grep ===|cut -d' ' -f2)

# Ajouter ce buildpack et définir votre clé d'API Datadog
heroku buildpacks:add https://github.com/DataDog/heroku-buildpack-datadog.git#<VERSION_BUILDPACK_DATADOG>
heroku config:add DD_API_KEY=<CLÉ_API_DATADOG>

# Déployer vers Heroku
git push heroku master
```

**Avertissement** : les buildpacks qui installent des paquets apt (p. ex. [apt][3], [les dépendances de puppeteer][4]) et les buildpacks qui modifient le dossier `/app` (p. ex. [monorepo][5]) doivent être ajoutés *avant* le buildpack Datadog. Par exemple, si votre application utilise les buildpacks `ruby`, `datadog` et `apt`, une sortie valide pour `heroku buildpacks` serait :

```
1. heroku/ruby
2. https://github.com/heroku/heroku-buildpack-apt.git
3. https://github.com/DataDog/heroku-buildpack-datadog.git
```

Remplacez `<CLÉ_API_DATADOG>` par votre [clé d'API Datadog][6].
Remplacez `<VERSION_BUILDPACK_DATADOG>` par la [version du buildpack][7] que vous souhaitez utiliser.

Une fois terminé, l'Agent Datadog se lance automatiquement à chaque démarrage de dyno.

L'Agent Datadog fournit un port d'écoute sur le port `8125` pour les métriques et événements StatsD/DogStatsD. Les traces sont recueillies sur le port `8126`.

## Mises à jour et recompilation du slug

Pour mettre à jour ce buildpack ou modifier certaines de ses options, vous devez effacer le cache du build de votre application et recompiler votre slug.

Les options suivantes nécessitent une recompilation du slug :

* `DD_AGENT_VERSION`
* `DD_PYTHON_VERSION`
* `DD_APM_ENABLED`
* `DD_PROCESS_AGENT`

Pour mettre à jour ce buildpack ou modifier l'une de ces options, telle que `DD_AGENT_VERSION`, les étapes suivantes sont requises :

```
# Installer le plugin Heroku Repo
heroku plugins:install heroku-repo

# Définir la nouvelle version de l'Agent
heroku config:set DD_AGENT_VERSION=<NOUVELLE_VERSION_AGENT> -a appname

# Effacer le cache de build Heroku pour l'application appname
heroku repo:purge_cache -a appname

# Reconstruire votre slug avec la nouvelle version de l'Agent :
git commit --allow-empty -m "Purge cache"
git push heroku master
```

## Configuration

Outre l'exemple ci-dessus, vous pouvez définir un certain nombre de variables d'environnement supplémentaires :

| Paramètre                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                           |
|----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`               | *Obligatoire*. Vous pouvez consulter votre clé d'API sur la page [Datadog API Integrations][6]. Notez qu'il s'agit de votre clé d'*API*, et non de la clé d'application.                                                                                                                                                                                                                                                                                          |
| `DD_HOSTNAME`              | *Facultatif*. **ATTENTION** : la définition manuelle du hostname peut entraîner des erreurs de continuité des métriques. Nous vous conseillons de ne *pas* définir cette variable. Étant donné que les hosts dyno sont éphémères, il est recommandé d'effectuer votre suivi en fonction des tags `dynoname` ou `appname`.                                                                                                                                                                 |
| `DD_DYNO_HOST`             | *Facultatif*. Définissez cette variable sur `true` pour utiliser le nom du dyno (p. ex., `web.1` ou `run.1234`) comme hostname. Consultez la [section Hostname](#hostname) ci-dessous pour en savoir plus. Valeur par défaut : `false`.                                                                                                                                                                                                                                                    |
| `DD_TAGS`                  | *Facultatif.* Définit des tags supplémentaires fournis en tant que chaînes séparées par des virgules. Par exemple, `heroku config:set DD_TAGS="simple-tag-0, tag-key-1:tag-value-1"`. Le buildpack ajoute automatiquement les tags `dyno` qui représentent le nom du dyno (p. ex., web.1) et `dynotype` (le type de dyno, p. ex., `run` ou `web`). Consultez le [Guide d'utilisation des tags][8] pour en savoir plus.                                                                       |
| `DD_HISTOGRAM_PERCENTILES` | *Facultatif*. Permet de définir des centiles supplémentaires pour vos métriques histogram. Voir la section [Comment représenter des centiles][9].                                                                                                                                                                                                                                                                                                                      |
| `DISABLE_DATADOG_AGENT`    | *Facultatif*. Définissez cette variable pour empêcher l'exécution de l'Agent Datadog.                                                                                                                                                                                                                                                                                                                                                                                 |
| `DD_APM_ENABLED`           | *Facultatif*. La collecte de traces est activée par défaut. Définissez cette variable sur `false` pour la désactiver. Si vous modifiez cette option, vous devrez recompiler le slug. Consultez la section [Mises à jour et recompilation du slug](#mises-a-jour-et-recompilation-du-slug) pour en savoir plus.                                                                                                                                                                    |
| `DD_PROCESS_AGENT`         | *Facultatif*. L'Agent de processus Datadog est désactivé par défaut. Définissez cette variable sur `true` pour l'activer. Si vous modifiez cette option, vous devrez recompiler le slug. Consultez la section [Mises à jour et recompilation du slug](#mises-a-jour-et-recompilation-du-slug) pour en savoir plus.                                                                                                                                                           |
| `DD_SITE`                  | *Facultatif*. Si vous utilisez le service app.datadoghq.eu, définissez cette variable sur `datadoghq.eu`. Valeur par défaut : `datadoghq.com`.                                                                                                                                                                                                                                                                                                                         |
| `DD_AGENT_VERSION`         | *Facultatif*. Par défaut, le buildpack installe la dernière version de l'Agent Datadog disponible dans le référentiel de paquets. Utilisez cette variable pour installer une ancienne version de l'Agent Datadog (à noter que toutes les versions de l'Agent ne sont pas nécessairement disponibles). Si vous modifiez cette option, vous devrez recompiler le slug. Consultez la section [Mises à jour et recompilation du slug](#mises-a-jour-et-recompilation-du-slug) pour en savoir plus.                     |
| `DD_DISABLE_HOST_METRICS`  | *Facultatif*. Par défaut, le buildpack transmet des métriques système pour la machine du host qui exécute le dyno. Définissez cette variable sur `true` pour désactiver la collecte des métriques système. Consultez la [section Métriques système](#metriques-système) ci-dessous pour en savoir plus.                                                                                                                                                                                            |
| `DD_PYTHON_VERSION`        | *Facultatif.* À partir de la version `6.14.0`, l'Agent Datadog est livré avec les versions `2` et `3` de Python. Le buildpack ne gardera que l'une des versions. Définissez ce paramètre sur `2` ou `3` pour sélectionner la version de Python que vous souhaitez que l'Agent garde. Si le paramètre n'est pas défini, le buildpack gardera la version `2`. Si vous modifiez cette option, vous devrez recompiler le slug. Consultez la section [Mises à jour et recompilation du slug](#mises-a-jour-et-recompilation-du-slug) pour en savoir plus. |

Pour obtenir davantage d'informations, consultez la [documentation relative à l'Agent Datadog][10].

## Hostname

Les dynos Heroku sont éphémères : ils peuvent passer d'une machine de host à une autre lorsque du nouveau code est déployé, à la suite d'un changement de configuration ou en cas de modification des besoins en ressources ou de leur disponibilité. Cette flexibilité et cette réactivité peuvent toutefois entraîner la transmission d'un grand nombre de hosts à Datadog. Le tarif de Datadog est basé sur les hosts. Par défaut, le buildpack transmet des informations sur l'ensemble des hosts, ce qui peut entraîner des coûts plus élevés que prévu.

Selon vos besoins, vous pouvez choisir de définir votre hostname afin d'agréger vos hosts et ainsi en transmettre un plus faible nombre. Pour ce faire, définissez `DD_DYNO_HOST` sur `true`. L'Agent transmet alors le hostname en tant que nom de l'app et du dyno (p. ex., `appname.web.1` ou `appname.run.1234`) pour que votre nombre de hosts corresponde précisément à votre utilisation de dyno. Cette solution a pour inconvénient d'entraîner des erreurs de continuité des métriques lors du redémarrage d'un dyno.

Pour que cela fonctionne correctement, `NOM_APP_HEROKU` doit être défini. Pour ce faire, [activez simplement les métadonnées dyno][11]. Il convient de noter que les métadonnées dyno ne sont pas encore disponibles dans les espaces privés : vous devrez alors définir `HEROKU_APP_NAME` manuellement.

## Métriques système

Par défaut, le buildpack recueille des métriques système pour la machine du host qui exécute le dyno. Vous ne pouvez pas recueillir des métriques système pour un dyno spécifique à l'aide de ce buildpack. Pour désactiver la collecte des métriques système sur les hosts, définissez la variable d'environnement `DD_DISABLE_HOST_METRICS` sur `true`.

Afin de recueillir des métriques système pour tous vos dynos, vous devez :

1. Activer la fonctionnalité [Heroku Labs : log-runtime-metrics][12].
2. Utiliser le [drain de logs Datadog][13] pour recueillir des logs de métriques depuis le Logplex Heroku et les transmettre à Datadog.
3. Générer des [métriques basées sur des logs][14] pour les logs recueillis.

## Emplacements des fichiers

- L'Agent Datadog est installé dans `/app/.apt/opt/datadog-agent`.
- Les fichiers de configuration de l'Agent Datadog se trouvent dans `/app/.apt/etc/datadog-agent`.
- Les logs de l'Agent Datadog sont situés dans `/app/.apt/var/log/datadog`.

## Activation d'intégrations

Vous pouvez activer des intégrations de l'Agent Datadog en ajoutant un fichier YAML avec le nom correspondant dans le répertoire `datadog/conf.d` à la racine de votre application.

Par exemple, pour activer l'[intégration PostgreSQL][15], créez un fichier `/datadog/conf.d/postgres.yaml` dans votre application avec ce qui suit :

```
init_config:

instances:
  - host: <VOTRE HOSTNAME>
    port: <VOTRE PORT>
    username: <VOTRE NOM D'UTILISATEUR>
    password: <VOTRE MOT DE PASSE>
    dbname: <LE NOM DE VOTRE BDD>
    ssl: True
```

Lors du démarrage du dyno, vos fichiers YAML sont copiés vers les répertoires de configuration de l'Agent Datadog appropriés.

## Script de pré-exécution

Outre les étapes de configuration ci-dessus, vous pouvez ajouter un script de pré-exécution, `/datadog/prerun.sh`, à votre application. Le script de pré-exécution s'exécute après toutes les actions de configuration standard et juste avant le lancement de l'Agent Datadog. Il vous permet de modifier les variables d'environnement, d'effectuer des configurations supplémentaires ou même de désactiver l'Agent Datadog automatiquement.

L'exemple ci-dessous illustre quelques actions que vous pouvez accomplir à l'aide du script `prerun.sh` :

```shell
#!/usr/bin/env bash

# Désactiver l'Agent Datadog en fonction du type de dyno.
if [ "$DYNOTYPE" == "run" ]; then
  DISABLE_DATADOG_AGENT="true"
fi

# Mettre à jour la configuration Postgres ci-dessus à l'aide des variables d'environnement de l'application Heroku.
if [ -n "$DATABASE_URL" ]; then
  POSTGREGEX='^postgres://([^:]+):([^@]+)@([^:]+):([^/]+)/(.*)$'
  if [[ $DATABASE_URL =~ $POSTGREGEX ]]; then
    sed -i "s/<VOTRE HOSTNAME>/${BASH_REMATCH[3]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<VOTRE NOM D'UTILISATEUR>/${BASH_REMATCH[1]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<VOTRE MOT DE PASSE>/${BASH_REMATCH[2]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<VOTRE PORT>/${BASH_REMATCH[4]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<LE NOM DE VOTRE BDD>/${BASH_REMATCH[5]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
  fi
fi
```

## Limiter la sortie de la console Datadog

Il se peut que vous cherchiez à limiter le nombre de logs générés par le buildpack Datadog dans la console.

Pour limiter la sortie de log du buildpack, définissez la variable d'environnement `DD_LOG_LEVEL` sur l'une des valeurs suivantes : `TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR`, `CRITICAL` ou `OFF`.

```
heroku config:add DD_LOG_LEVEL=ERROR
```

## Binaires facultatifs

Pour réduire la taille du slug, les binaires facultatifs `trace-agent` et `process-agent` sont supprimés lors de la compilation si `DD_APM_ENABLED` est défini sur `false` et/ou que `DD_PROCESS_AGENT` n'est pas défini ou défini sur `false`.

Pour réduire la taille de votre slug, assurez-vous que `DD_APM_ENABLED` est défini sur `false` si vous n'utilisez pas les fonctionnalités de l'APM et que `DD_PROCESS_AGENT` n'est pas défini sur `true` si vous n'utilisez pas la surveillance de processus.

## Debugging

Pour exécuter les commandes de debbuging/d'information énumérées dans la [documentation de l'Agent][16], utilisez la commande `agent-wrapper`.

Par exemple, pour afficher le statut de votre Agent Datadog et des intégrations activées, exécutez :

```
agent-wrapper status
```

## Collecte de logs Heroku

Le buildpack Datadog pour Heroku ne recueille pas de logs. Pour configurer la collecte de logs, consultez le [guide dédié][13].

## Éléments non pris en charge

Les buildpacks Heroku ne peuvent pas être utilisés avec des images Docker. Pour créer une image Docker avec Datadog, consultez les [fichiers Docker de l'Agent Datadog][17].

## Contributions

Consultez la [documentation relative aux contributions][18] (en anglais) pour découvrir comment créer un ticket ou une pull request dans le [référentiel Heroku-buildpack-datadog][19].

## Historique

Plusieurs forks ont été créés à partir d'anciennes versions du [projet heroku-buildpack-datadog par miketheman][20]. Ce dernier a été presque entièrement réécrit pour la version 6 de l'Agent Datadog. La liste des changements ainsi que d'autres informations sont disponibles dans le [changelog][21].

## FAQ/Dépannage

### Datadog indique un plus grand nombre d'Agents que de dynos

Assurez-vous que `DD_DYNO_HOST est défini sur `true` et que la valeur de `HEROKU_APP_NAME` est définie pour chaque application Heroku. Consultez la [section Hostname](#hostname) pour en savoir plus.

### Après la mise à jour du buildpack ou de l'Agent, des erreurs se produisent au démarrage de l'Agent

Une fois le buildpack ou l'Agent mis à jour, vous devez effacer le cache de build et recompiler le slug de votre application. Consultez la section [Mises à jour et recompilation du slug](#mises-a-jour-et-recompilation-du-slug) pour en savoir plus.

[1]: https://devcenter.heroku.com/articles/buildpacks
[2]: https://docs.datadoghq.com/fr/libraries
[3]: https://github.com/heroku/heroku-buildpack-apt
[4]: https://github.com/jontewks/puppeteer-heroku-buildpack
[5]: https://github.com/lstoll/heroku-buildpack-monorepo
[6]: https://app.datadoghq.com/account/settings#api
[7]: https://github.com/DataDog/heroku-buildpack-datadog/releases
[8]: https://docs.datadoghq.com/fr/tagging
[9]: /fr/graphing/faq/how-to-graph-percentiles-in-datadog
[10]: https://docs.datadoghq.com/fr/agent
[11]: https://devcenter.heroku.com/articles/dyno-metadata
[12]: https://devcenter.heroku.com/articles/log-runtime-metrics
[13]: https://docs.datadoghq.com/fr/logs/guide/collect-heroku-logs
[14]: https://docs.datadoghq.com/fr/logs/logs_to_metrics/
[15]: https://docs.datadoghq.com/fr/integrations/postgres
[16]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[17]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles
[18]: https://github.com/DataDog/heroku-buildpack-datadog/blob/master/CONTRIBUTING.md
[19]: https://github.com/DataDog/heroku-buildpack-datadog
[20]: https://github.com/miketheman/heroku-buildpack-datadog
[21]: https://github.com/DataDog/heroku-buildpack-datadog/blob/master/CHANGELOG.md