---
aliases:
  - /fr/developers/faq/how-do-i-collect-metrics-from-heroku-with-datadog
dependencies:
  - https://github.com/DataDog/heroku-buildpack-datadog/blob/master/README.md
kind: documentation
title: Buildpack Heroku Datadog
---
Ce [buildpack Heroku][1] installe l'Agent Datadog dans votre dyno Heroku pour recueillir des métriques système, des métriques d'application personnalisée et des traces. Pour recueillir des métriques ou des traces d'application personnalisée, ajoutez le langage approprié [via la bibliothèque DogStatsD ou APM Datadog][2] dans votre application.

## Installation

Ce guide suppose que votre application s'exécute déjà sur Heroku. Consultez la documentation Heroku pour découvrir comment déployer votre application sur Heroku.

1. Accédez aux [paramètres d'API Datadog][3] et copiez votre clé d'API Datadog. Exportez-la dans une variable d'environnement :

 ```shell
 export DD_API_KEY=<YOUR_API_KEY>
 ```

2. Exportez le nom de votre application vers la variable d'environnement APPNAME :

```shell
export APPNAME=<NOM_DE_VOTRE_APPLICATION_HEROKU>
```

3. Ajoutez le buildpack Datadog à votre projet :

```shell
cd <DOSSIER_RACINE_PROJET_HEROKU>

# Utiliser la dernière version majeure de l'Agent
heroku config:add DD_AGENT_MAJOR_VERSION=7

# Activer les métadonnées Heroku Labs Dyno pour définir automatiquement la variable d'environnement HEROKU_APP_NAME
heroku labs:enable runtime-dyno-metadata -a $APPNAME

# Définir le hostname dans Datadog sur appname.dynotype.dynonumber pour garantir la continuité des métriques
heroku config:add DD_DYNO_HOST=true

# Ajouter ce buildpack et définir votre clé d'API Datadog
heroku buildpacks:add --index 1 https://github.com/DataDog/heroku-buildpack-datadog.git
heroku config:add DD_API_KEY=$DD_API_KEY

# Déployer sur Heroku pour forcer un rebuild
git commit --allow-empty -m "Rebuild slug"
git push heroku master
```

Une fois terminé, l'Agent Datadog se lance automatiquement à chaque démarrage de dyno.

L'Agent Datadog fournit un port d'écoute sur le port `8125` pour les métriques et événements StatsD/DogStatsD. Les traces sont recueillies sur le port `8126`.

### Ordre des buildpacks
Comme expliqué dans la documentation Heroku sous la section [Viewing buildpacks][4], le dernier buildpack de la liste est utilisé pour déterminer le type de processus pour l'application.

Les buildpacks qui installent des packages apt, comme [heroku-buildpack-apt][5] et [puppeteer-heroku-buildpack][6], ou qui modifient le dossier `/app`, comme [heroku-buildpack-monorepo][7], doivent être ajoutés **avant** le buildpack Datadog. Par exemple, si votre application utilise les buildpacks `ruby`, `datadog` et `apt`, voici une sortie valide pour `heroku buildpacks` :

```text
1. https://github.com/heroku/heroku-buildpack-apt.git
2. https://github.com/DataDog/heroku-buildpack-datadog.git
3. heroku/ruby
```

## Imposer une version spécifique d'un buildpack et de l'Agent Datadog

Heroku recommande de toujours utiliser le dernier commit d'un buildpack. Pour imposer la version du buildpack, précisez le tag de version du buildpack :

```
heroku buildpacks:add --index 1 https://github.com/DataDog/heroku-buildpack-datadog.git#<VERSION_BUILDPACK_DATADOG>
```

Remplacez `<VERSION_BUILDPACK_DATADOG>` par la {version du buildpack][8] que vous souhaitez utiliser.

Par défaut, le buildpack impose la dernière version de l'Agent Datadog disponible au moment de sa publication. Vous pouvez imposer une version précédente de l'Agent en définissant la variable d'environnement `DD_AGENT_VERSION`.

## Mises à niveau et recompilation du slug

Pour mettre à niveau ce buildpack ou modifier certaines de ses options, vous devez recompiler votre slug.

Les options suivantes nécessitent une recompilation du slug :

* `DD_AGENT_VERSION`
* `DD_AGENT_MAJOR_VERSION`
* `DD_PYTHON_VERSION`
* `DD_APM_ENABLED`
* `DD_PROCESS_AGENT`

Pour mettre à niveau ce buildpack ou modifier l'une de ces options, telle que `DD_AGENT_VERSION`, les étapes suivantes sont requises :

```shell
# Définir la nouvelle version de l'Agent
heroku config:set DD_AGENT_VERSION=<NOUVELLE_VERSION_AGENT> -a <NOM_VOTRE_APPLICATION>

# Reconstruire votre slug avec la nouvelle version de l'Agent :
git commit --allow-empty -m "Rebuild slug"
git push heroku master
```

## Configuration

Outre les exemples ci-dessus, vous pouvez définir un certain nombre de variables d'environnement supplémentaires :

| Paramètre                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`               | *Obligatoire.* Vous pouvez consulter votre clé d'API sur la page [Organization Settings -> API Keys][3]. **Remarque** : il s'agit de votre clé d'*API*, et non de la clé d'application.                                                                                                                                                                                                                                                                                                                                                                                |
| `DD_HOSTNAME`              | *Facultatif*. **ATTENTION** : la définition manuelle du hostname peut entraîner des erreurs de continuité des métriques. Nous vous conseillons de ne *pas* définir cette variable. Étant donné que les hosts dyno sont éphémères, il est recommandé d'effectuer votre suivi en fonction des tags `dynoname` ou `appname`.                                                                                                                                                                                                                                                       |
| `DD_DYNO_HOST`             | *Facultatif*. Définissez cette variable sur `true` pour utiliser le nom du dyno, tel que `web.1` ou `run.1234`, comme hostname. Consultez la [section Hostname](#hostname) ci-dessous pour en savoir plus. Valeur par défaut : `false`.                                                                                                                                                                                                                                                                                                                                          |
| `DD_TAGS` | *Facultatif*. Définissez des tags supplémentaires fournis en tant que chaînes séparées par des espaces. **Remarque** : jusqu'à la version `1.16` du buildpack, les chaînes doivent être séparées par des virgules ; cette délimitation reste prise en charge à des fins de rétrocompatibilité. Exemple : `heroku config:set DD_TAGS="simple-tag-0 tag-key-1:tag-value-1"`. Le buildpack ajoute automatiquement le tag `dyno`, qui représente le nom du dyno, tel que `web.1`, et `dynotype`, qui représente le type de dyno, tel que `run` ou `web`. Consultez le [guide d'utilisation des tags][10] pour en savoir plus. |
| `DD_VERSION`                  | *Facultatif*. Définit la version de votre application. Permet d'organiser les traces en fonction de la version.                                                                                                                                          |
| `DD_HISTOGRAM_PERCENTILES` | *Facultatif*. Permet de définir des centiles supplémentaires pour vos métriques histogram. Voir la section [Représentation des centiles dans Datadog][11].                                                                                                                                                                                                                                                                                                                                                                                                            |
| `DISABLE_DATADOG_AGENT`    | *Facultatif*. Définissez cette variable pour empêcher l'exécution de l'Agent Datadog.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `DD_APM_ENABLED`           | *Facultatif*. La collecte de traces est activée par défaut. Définissez cette variable sur `false` pour la désactiver. Si vous modifiez cette option, vous devrez recompiler le slug. Consultez la section [Mises à niveau et recompilation du slug](#mises-a-niveau-et-recompilation-du-slug) pour en savoir plus.                                                                                                                                                                                                                                                          |
| `DD_PROCESS_AGENT`         | *Facultatif*. L'Agent de processus Datadog est désactivé par défaut. Définissez cette variable sur `true` pour l'activer. Si vous modifiez cette option, vous devrez recompiler le slug. Consultez la section [Mises à niveau et recompilation du slug](#mises-a-niveau-et-recompilation-du-slug) pour en savoir plus.                                                                                                                                                                                                                                                 |
| `DD_SITE`                  | *Facultatif*. Si vous utilisez le service app.datadoghq.eu, définissez cette variable sur `datadoghq.eu`. Valeur par défaut : `datadoghq.com`.                                                                                                                                                                                                                                                                                                                                                                                                               |
| `DD_AGENT_VERSION`         | *Facultatif*. Par défaut, le buildpack installe la version 6.x de l'Agent Datadog disponible dans le référentiel de paquets. Utilisez cette variable pour installer une ancienne version de l'Agent Datadog. **Remarque** : toutes les versions de l'Agent ne sont pas nécessairement disponibles. Cette option prime sur le paramètre `DD_AGENT_MAJOR_VERSION`. Si vous la modifiez, vous devrez recompiler le slug. Consultez la section [Mises à niveau et recompilation du slug](#mises-a-niveau-et-recompilation-du-slug) pour en savoir plus.                                           |
| `DD_AGENT_MAJOR_VERSION`   | *Facultatif*. Par défaut, le buildpack installe la dernière version 6.x de l'Agent Datadog disponible dans le référentiel des packages. Définissez cette variable sur `7` pour installer la dernière version 7.x de l'Agent Datadog. **Il est fortement conseillé de définir cette variable sur `7`**. Consultez la section [Versions de Python et de l'Agent](#versions-de-python-et-de-l-agent) pour en savoir plus sur le lien entre la version de l'Agent et la version de Python. Si vous modifiez cette option, vous devrez recompiler le slug. Consultez la section [Mises à niveau et recompilation du slug](#mises-a-niveau-et-recompilation-du-slug) pour en savoir plus.     |
| `DD_DISABLE_HOST_METRICS`  | *Facultatif*. Par défaut, le buildpack transmet des métriques système pour la machine du host qui exécute le dyno. Définissez cette variable sur `true` pour désactiver la collecte des métriques système. Consultez la [section Métriques système](#metriques-système) ci-dessous pour en savoir plus.                                                                                                                                                                                                                                                                                  |
| `DD_PYTHON_VERSION`        | *Facultatif*. À partir de la version `6.14.0`, l'Agent Datadog est fourni avec les versions `2` et `3` de Python. Le buildpack ne conserve que l'une de ces versions. Définissez ce paramètre sur `2` ou `3` pour sélectionner la version de Python que vous souhaitez que l'Agent conserve. Si le paramètre n'est pas défini, le buildpack conserve la version `2`. Consultez la section [Versions de Python et de l'Agent](#versions-de-python-et-de-l-agent) pour en savoir plus. Si vous modifiez cette option, vous devrez recompiler le slug. Consultez la section [Mises à niveau et recompilation du slug](#mises-a-niveau-et-recompilation-du-slug) pour en savoir plus. |
| `DD_HEROKU_CONF_FOLDER`    | *Facultatif*. Par défaut, le buildpack recherche les fichiers de configuration que vous souhaitez inclure, par exemple le [script prerun.sh](#script-de-pre-execution), dans le dossier `/datadog` à la racine de votre application. Vous pouvez modifier cet emplacement en définissant ce paramètre sur le chemin de votre choix. |

Pour obtenir davantage d'informations, consultez la [documentation relative à l'Agent Datadog][12].

## Hostname

Les dynos Heroku sont éphémères : ils peuvent passer d'une machine de host à une autre lorsque du nouveau code est déployé, à la suite d'un changement de configuration ou en cas de modification des besoins en ressources ou de leur disponibilité. Cette flexibilité et cette réactivité peuvent toutefois entraîner la transmission d'un grand nombre de hosts à Datadog. Le tarif de Datadog est basé sur les hosts. Par défaut, le buildpack transmet des informations sur l'ensemble des hosts, ce qui peut entraîner des coûts plus élevés que prévu.

Selon vos besoins, vous pouvez choisir de définir votre hostname afin d'agréger vos hosts et ainsi en transmettre un plus faible nombre. Pour ce faire, définissez `DD_DYNO_HOST` sur `true`. L'Agent transmet alors le hostname en tant que nom de l'app et du dyno (p. ex., `appname.web.1` ou `appname.run.1234`) pour que votre nombre de hosts corresponde précisément à votre utilisation de dyno. Cette solution a pour inconvénient d'entraîner des erreurs de continuité des métriques lors du redémarrage d'un dyno.

Pour que cela fonctionne correctement, `HEROKU_APP_NAME` doit être défini. Pour ce faire, [activez simplement les métadonnées dyno][13]. **Remarque** : les métadonnées dyno ne sont pas encore disponibles dans les espaces privés. Vous devez donc définir `HEROKU_APP_NAME` manuellement pour les espaces privés.

## Désactivation de l'Agent Datadog pour les dynos de courte durée

Par défaut, l'Agent Datadog s'exécute sur chacun des dynos qui font partie de l'application. Cela inclut les dynos `scheduler`, `release` ou `run`. Dans de nombreux cas, les métriques provenant de ces dynos ne sont pas nécessaires et il convient de désactiver l'Agent Datadog pour ces derniers.

Pour désactiver l'Agent Datadog en fonction du type de dyno, ajoutez l'extrait de code suivant à votre [script prerun.sh](#script-de-pre-execution) (en l'adaptant au type de dynos que vous ne souhaitez pas surveiller) :

```shell
# Désactiver l'Agent Datadog en fonction du type de dyno
if [ "$DYNOTYPE" == "run" ] || [ "$DYNOTYPE" == "scheduler" ] || [ "$DYNOTYPE" == "release" ]; then
  DISABLE_DATADOG_AGENT="true"
fi
```

## Métriques système

Par défaut, le buildpack recueille des métriques système pour la machine du host qui exécute le dyno. Vous ne pouvez pas recueillir des métriques système pour un dyno spécifique à l'aide de ce buildpack. Pour désactiver la collecte des métriques système sur les hosts, définissez la variable d'environnement `DD_DISABLE_HOST_METRICS` sur `true`.

Afin de recueillir des métriques système pour tous vos dynos, vous devez :

1. Activer la fonctionnalité [Heroku Labs : log-runtime-metrics][14]
2. Utiliser le [drain de logs Datadog][15] pour recueillir des logs de métriques depuis le Logplex Heroku et les transmettre à Datadog
3. Générer des [métriques basées sur des logs][16] pour les logs recueillis

## Emplacements des fichiers

* L'Agent Datadog est installé dans `/app/.apt/opt/datadog-agent`.
* Les fichiers de configuration de l'Agent Datadog se trouvent dans `/app/.apt/etc/datadog-agent`.
* Les logs de l'Agent Datadog sont situés dans `/app/.apt/var/log/datadog`.

## Activation d'intégrations

Pour activer une [intégration Datadog/<NOM_INTÉGRATION>][17], créez un fichier dans le dossier de configuration Datadog de votre application. Lors du démarrage du dyno, vos fichiers YAML sont copiés vers les répertoires de configuration de l'Agent Datadog appropriés.

Par exemple, pour activer l'[intégration Datadog/Redis][18], ajoutez le fichier `/datadog/conf.d/redisdb.yaml` à la racine de votre application (ou `/$DD_HEROKU_CONF_FOLDER/conf.d/redisdb.yaml` si vous avez modifié cette [option de configuration](#configuration)) :

```yaml
init_config:

instances:

    ## @param host - chaîne - obligatoire
    ## Saisir le host auquel se connecter.
    #
  - host: <REDIS_HOST>

    ## @param port - entier - obligatoire
    ## Saisir le port du host auquel se connecter.
    #
    port: 6379
```

**Remarque** : consultez le fichier d'exemple [redisdb.d/conf.yaml][19] pour découvrir toutes les options de configuration disponibles.

Si l'intégration que vous activez fait partie des [intégrations de la communauté][20], installez le package au sein du [script de pré-exécution](#script-de-pre-execution).

```
agent-wrapper integration install -t datadog-<NOM_INTÉGRATION>==<VERSION_INTÉGRATION>
```

Par exemple, pour installer l'[intégration ping][21], créez le fichier de configuration `datadog/conf.d/ping.yaml` et ajoutez la ligne suivante à votre script de pré-exécution :

```
agent-wrapper integration install -t datadog-ping==1.0.0
```

## Script de pré-exécution

Outre les étapes de configuration ci-dessus, vous pouvez ajouter un script de pré-exécution, `/datadog/prerun.sh`, à votre application. Ce script s'exécute après toutes les actions de configuration standard et juste avant le lancement de l'Agent Datadog. Il vous permet de modifier des variables d'environnement (par exemple, DD_TAGS ou DD_VERSION), d'effectuer des configurations supplémentaires ou même de désactiver par programmation l'Agent Datadog.

L'exemple ci-dessous illustre quelques actions que vous pouvez accomplir à l'aide du script `prerun.sh` :

```shell
#!/usr/bin/env bash

# Désactiver l'Agent Datadog en fonction du type de dyno
if [ "$DYNOTYPE" == "run" ]; then
  DISABLE_DATADOG_AGENT="true"
fi

# Définir la version de l'application en fonction de HEROKU_SLUG_COMMIT
if [ -n "$HEROKU_SLUG_COMMIT" ]; then
  DD_VERSION=$HEROKU_SLUG_COMMIT
fi

# Mettre à jour la configuration Postgres ci-dessus à l'aide des variables d'environnement de l'application Heroku
if [ -n "$DATABASE_URL" ]; then
  POSTGREGEX='^postgres://([^:]+):([^@]+)@([^:]+):([^/]+)/(.*)$'
  if [[ $DATABASE_URL =~ $POSTGREGEX ]]; then
    sed -i "s/<VOTRE_HOSTNAME>/${BASH_REMATCH[3]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<VOTRE_NOM_UTILISATEUR>/${BASH_REMATCH[1]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<VOTRE_MOT_DE_PASSE>/${BASH_REMATCH[2]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<VOTRE_PORT>/${BASH_REMATCH[4]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<VOTRE_BASE_DE_DONNÉES>/${BASH_REMATCH[5]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
  fi
fi

# Installer l'intégration de la communauté « ping »
agent-wrapper integration install -t datadog-ping==1.0.0
```

## Limiter la sortie de la console Datadog

Il se peut que vous cherchiez à limiter le nombre de logs générés par le buildpack Datadog dans la console.

Pour limiter la sortie de log du buildpack, définissez la variable d'environnement `DD_LOG_LEVEL` sur l'une des valeurs suivantes : `TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR`, `CRITICAL` ou `OFF`.

```shell
heroku config:add DD_LOG_LEVEL=ERROR
```

## Binaires facultatifs

Pour réduire la taille du slug, les binaires facultatifs `trace-agent` et `process-agent` sont supprimés lors de la compilation si `DD_APM_ENABLED` est défini sur `false` et/ou que `DD_PROCESS_AGENT` n'est pas défini ou défini sur `false`.

Pour réduire la taille de votre slug, assurez-vous que `DD_APM_ENABLED` est défini sur `false` si vous n'utilisez pas les fonctionnalités de l'APM et que `DD_PROCESS_AGENT` n'est pas défini sur `true` si vous n'utilisez pas la surveillance de processus.

## Debugging

Pour exécuter les [commandes de debugging/d'information][22], utilisez la commande `agent-wrapper`.

Par exemple, pour afficher le statut de votre Agent Datadog et des intégrations activées, exécutez :

```shell
agent-wrapper status
```

## Versions de Python et de l'Agent

Avant la version `6.14`, l'Agent Datadog v6 était fourni avec la version `2` de Python intégrée. Depuis la version `6.14`, afin de prévoir la fin des mises à jour de la version `2` de Python annoncée pour janvier 2020, l'Agent Datadog v6 est fourni avec les versions `2` et `3` de Python. Ce choix permet aux clients d'effectuer à temps la migration de leurs checks custom vers la version `3` de Python. Le buildpack Heroku ne conserve qu'une seule de ces versions. Définissez `DD_PYTHON_VERSION` sur `2` ou `3` pour sélectionner la version de Python que vous souhaitez que l'Agent garde. Si le paramètre n'est pas défini, le buildpack garde la version `2` de Python. Si vous utilisez des checks custom qui fonctionnent uniquement avec la version `2` de Python, effectuez leur migration vers la version `3` avant la fin de vie de la version 2.

L'Agent v7 est fourni uniquement avec la version `3` de Python. Si vous n'utilisez pas de checks custom ou si vous avez déjà effectué la migration de vos checks custom vers la version `3`, passez à la version 7 dès que possible. Depuis la version `6.15`, les Agents possédant la même version mineure partagent le même ensemble de fonctionnalités, ce qui permet d'effectuer en toute sécurité la transition entre les deux versions. Par exemple, si vous exécutez `6.16` et que vous n'avez pas besoin de la version `2` de Python, vous pouvez effectuer la mise à niveau vers la version `7.16` sans danger.

## Collecte de logs Heroku

Le buildpack Datadog ne recueille pas de logs à partir de la plateforme Heroku. Pour configurer la collecte de logs Heroku, consultez le [guide dédié][15].

## Utiliser Heroku avec des images Docker

Ce buildpack ne fonctionne que pour les déploiements de Heroku qui utilisent le [compilateur de slug de Heroku][23]. Si vous déployez votre application dans Heroku en utilisant des conteneurs Docker, intégrez l'Agent Datadog à votre image Docker et lancez l'Agent en tant que processus distinct dans votre conteneur.

Par exemple, si vous créez votre image Docker depuis un système d'exploitation basé sur Debian, ajoutez les lignes suivantes à votre `Dockerfile` :

```
# Installer les dépendances GPG
RUN apt-get update \
 && apt-get install -y gnupg apt-transport-https gpg-agent curl ca-certificates

# Ajouter les clés de signature et le référentiel Datadog
ENV DATADOG_APT_KEYRING="/usr/share/keyrings/datadog-archive-keyring.gpg"
ENV DATADOG_APT_KEYS_URL="https://keys.datadoghq.com"
RUN sh -c "echo 'deb [signed-by=${DATADOG_APT_KEYRING}] https://apt.datadoghq.com/ stable 7' > /etc/apt/sources.list.d/datadog.list"
RUN touch ${DATADOG_APT_KEYRING}
RUN curl -o /tmp/DATADOG_APT_KEY_CURRENT.public "${DATADOG_APT_KEYS_URL}/DATADOG_APT_KEY_CURRENT.public" && \
    gpg --ignore-time-conflict --no-default-keyring --keyring ${DATADOG_APT_KEYRING} --import /tmp/DATADOG_APT_KEY_CURRENT.public
RUN curl -o /tmp/DATADOG_APT_KEY_F14F620E.public "${DATADOG_APT_KEYS_URL}/DATADOG_APT_KEY_F14F620E.public" && \
    gpg --ignore-time-conflict --no-default-keyring --keyring ${DATADOG_APT_KEYRING} --import /tmp/DATADOG_APT_KEY_F14F620E.public
RUN curl -o /tmp/DATADOG_APT_KEY_382E94DE.public "${DATADOG_APT_KEYS_URL}/DATADOG_APT_KEY_382E94DE.public" && \
    gpg --ignore-time-conflict --no-default-keyring --keyring ${DATADOG_APT_KEYRING} --import /tmp/DATADOG_APT_KEY_382E94DE.public


# Installer l'Agent Datadog
RUN apt-get update && apt-get -y --force-yes install --reinstall datadog-agent

# Copier le point d'entrée
COPY entrypoint.sh /

# Exposer les ports de DogStatsD et du trace-agent
EXPOSE 8125/udp 8126/tcp

# Copier votre configuration Datadog
COPY datadog-config/ /etc/datadog-agent/

CMD ["/entrypoint.sh"]
```

Dans le point d'entrée de votre conteneur Docker, lancez l'Agent Datadog, l'Agent APM Datadog et l'Agent de processus Datadog :

```
#!/bin/bash

datadog-agent run &
/opt/datadog-agent/embedded/bin/trace-agent --config=/etc/datadog-agent/datadog.yaml &
/opt/datadog-agent/embedded/bin/process-agent --config=/etc/datadog-agent/datadog.yaml
```

Pour utiliser des options plus avancées dans l'image Docker, consultez les [fichiers Docker de l'Agent Datadog][24].

## Contributions

Consultez les [règles de contribution][25] pour découvrir comment créer un ticket ou une pull request dans le [référentiel Heroku-buildpack-datadog][26].

## History

Plusieurs forks ont été créés à partir d'anciennes versions du [projet heroku-buildpack-datadog de miketheman][27]. Ce dernier a été presque entièrement réécrit pour la version 6 de l'Agent Datadog. La liste des changements ainsi que d'autres informations sont disponibles dans le [changelog][28].

## Dépannage

### Obtenir le statut de l'Agent

Si vous avez configuré le buildpack et que certaines données attendues n'apparaissent pas dans Datadog, vous pouvez lancer la commande status de l'Agent Datadog pour vous aider à en déterminer la cause.

```shell
# Exporter le nom de votre application Heroku en tant que variable d'environnement
export APPNAME=your-application-name

heroku ps:exec -a $APPNAME

# Establishing credentials... done
# Connecting to web.1 on ⬢ ruby-heroku-datadog...
# DD_API_KEY environment variable not set. Run: heroku config:add DD_API_KEY=<your API key>
# The Datadog Agent has been disabled. Unset the DISABLE_DATADOG_AGENT or set missing environment variables.

~ $
```

Vous pouvez ignorer les avertissements concernant la configuration manquante de DD_API_KEY. Même si [Heroku ne définit pas de variables de configuration pour la session SSH](https://devcenter.heroku.com/articles/exec#environment-variables), le processus de l'Agent Datadog peut y accéder.

Une fois la session SSH ouverte, exécutez la commande status de Datadog.

```shell
~ $ agent-wrapper status

Getting the status from the agent.

===============
Agent (v7.27.0)
===============

[...]

```

### Debugging

#### Aucune donnée dans Datadog

Assurez-vous que la commande `status` s'exécute correctement et que cette section de la sortie indique que votre clé d'API est valide :

```
  API Keys status
  ===============
    API key ending with 68306: API Key valid
```

#### Vérifier les intégrations

Pour vérifier si l'intégration que vous avez activée s'exécute correctement, consultez la section `Collector` et vérifiez que votre check s'exécute correctement :

```
=========
Collector
=========

  Running Checks
  ==============

[...]
    postgres (5.4.0)
    ----------------
      Instance ID: postgres:e07ef94b907fe733 [OK]
      Configuration Source: file:/app/.apt/etc/datadog-agent/conf.d/postgres.d/conf.yaml
      Total Runs: 4,282
      Metric Samples: Last Run: 15, Total: 64,230
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 1, Total: 4,282
      Average Execution Time : 43ms
      Last Execution Date : 2021-05-13 08:15:46 UTC (1620893746000)
      Last Successful Execution Date : 2021-05-13 08:15:46 UTC (1620893746000)
      metadata:
        version.major: 13
        version.minor: 2
        version.patch: 0
        version.raw: 13.2 (Ubuntu 13.2-1.pgdg20.04+1)
        version.scheme: semver
```

#### Vérifier l'Agent APM

Si vous avez instrumenté votre application pour l'APM et ne recevez pas de traces dans Datadog, vérifiez que l'Agent APM s'exécute correctement et recueille des traces :

```
[...]
=========
APM Agent
=========
  Status: Running
  Pid: 63
  Uptime: 64702 seconds
  Mem alloc: 10,331,128 bytes
  Hostname: ruby-heroku-datadog.web.1
  Receiver: localhost:8126
  Endpoints:
    https://trace.agent.datadoghq.com

  Receiver (previous minute)
  ==========================
    From ruby 2.6.6 (ruby-x86_64-linux), client 0.48.0
      Traces received: 11 (14,181 bytes)
      Spans received: 33

    Default priority sampling rate: 100.0%
    Priority sampling rate for 'service:ruby-heroku-datadog,env:': 100.0%
    Priority sampling rate for 'service:ruby-heroku-datadog,env:development': 100.0%

[...]
```

### Datadog fait état d'un plus grand nombre d'Agents que de dynos

Assurez-vous que `DD_DYNO_HOST est défini sur `true` et que la valeur de `HEROKU_APP_NAME` est définie pour chaque application Heroku. Consultez la [section Hostname](#hostname) pour en savoir plus.

### Après la mise à niveau du buildpack ou de l'Agent, des erreurs se produisent au démarrage de l'Agent

Une fois le buildpack ou l'Agent mis à niveau, vous devez recompiler le slug de votre application. Consultez la section [Mises à niveau et recompilation du slug](#mises-a-niveau-et-recompilation-du-slug) pour en savoir plus.

[1]: https://devcenter.heroku.com/articles/buildpacks
[2]: https://docs.datadoghq.com/fr/libraries
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://devcenter.heroku.com/articles/using-multiple-buildpacks-for-an-app#viewing-buildpacks
[5]: https://github.com/heroku/heroku-buildpack-apt
[6]: https://github.com/jontewks/puppeteer-heroku-buildpack
[7]: https://github.com/lstoll/heroku-buildpack-monorepo
[8]: https://github.com/DataDog/heroku-buildpack-datadog/releases
[10]: https://docs.datadoghq.com/fr/tagging/
[11]: https://docs.datadoghq.com/fr/dashboards/guide/how-to-graph-percentiles-in-datadog/
[12]: https://docs.datadoghq.com/fr/agent
[13]: https://devcenter.heroku.com/articles/dyno-metadata
[14]: https://devcenter.heroku.com/articles/log-runtime-metrics
[15]: https://docs.datadoghq.com/fr/logs/guide/collect-heroku-logs
[16]: https://docs.datadoghq.com/fr/logs/logs_to_metrics/
[17]: https://docs.datadoghq.com/fr/integrations/
[18]: https://docs.datadoghq.com/fr/integrations/redisdb/
[19]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/conf.yaml.example
[20]: https://github.com/DataDog/integrations-extras/
[21]: https://github.com/DataDog/integrations-extras/tree/master/ping
[22]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[23]: https://devcenter.heroku.com/articles/slug-compiler
[24]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles
[25]: https://github.com/DataDog/heroku-buildpack-datadog/blob/master/CONTRIBUTING.md
[26]: https://github.com/DataDog/heroku-buildpack-datadog
[27]: https://github.com/miketheman/heroku-buildpack-datadog
[28]: https://github.com/DataDog/heroku-buildpack-datadog/blob/master/CHANGELOG.md