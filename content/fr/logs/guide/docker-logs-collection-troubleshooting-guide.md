---
title: Guide de dépannage pour la collecte de logs Docker
---

Plusieurs problèmes courants peuvent survenir lors de l'envoi de nouveaux logs de conteneur à Datadog via l'Agent de conteneur ou un Agent de host installé en local. Ce guide a été conçu pour vous aider à les dépanner. Si vous ne parvenez pas à résoudre votre problème, [contactez notre équipe d'assistance][1] pour obtenir de l'aide.

## Vérifier le statut de l'Agent

1. Pour vérifier si l'Agent qui effectue le logging indique des erreurs, exécutez la commande suivante :

    ```
    docker exec -it <CONTAINER_NAME> agent status
    ```

2. Si tout fonctionne correctement, le statut devrait ressembler à ceci :

    ```
    ==========
    Logs Agent
    ==========
        LogsProcessed: 42
        LogsSent: 42

      container_collect_all
      ---------------------
        Type: docker
        Status: OK
        Inputs: 497f0cc8b673397ed31222c0f94128c27a480cb3b2022e71d42a8299039006fb
    ```

3. Si le statut de votre Agent de logging ne ressemble pas à celui de l'exemple ci-dessus, consultez les conseils de dépannage sur cette page.

4. Si le statut est semblable à celui de l'exemple ci-dessus mais que vous ne recevez toujours aucun log, consultez la section [Statut sans erreur](#statut-sans-erreur).

## Logs Agent

### Statut not running

Si la commande status de l'Agent renvoie le message suivant :

```text
==========
Logs Agent
==========

  Logs Agent is not running
```

Cela signifie que le logging n'est pas activé dans l'Agent.

Pour activer le logging avec l'Agent de conteneur, définissez la variable d'environnement suivante : `DD_LOGS_ENABLED=true`.

### Aucun log traité ni envoyé

Si le statut de l'Agent de logging ne renvoie aucune intégration et affiche le message `LogsProcessed: 0 and LogsSent: 0` :

```text
==========
Logs Agent
==========
    LogsProcessed: 0
    LogsSent: 0
```

Cela signifie que les logs sont activés, mais que les conteneurs à partir desquels l'Agent doit les recueillir n'ont pas été configurés.

1. Pour vérifier les variables d'environnement que vous avez définies, exécutez la commande `docker inspect <CONTENEUR_AGENT>`.

2. Pour configurer l'Agent de façon à ce qu'il collecte les logs des autres conteneurs, définissez la variable d'environnement `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` sur `true`.


## Problèmes liés à la collecte de logs Docker depuis un fichier

Les versions 6.33.0/7.33.0 et versions ultérieures de l'Agent recueillent par défaut les logs Docker à partir des fichiers de log stockés sur le disque, tant que l'Agent parvient à accéder à ces fichiers. Pour désactiver cette collecte, définissez `DD_LOGS_CONFIG_DOCKER_CONTAINER_USE_FILE` sur `false`.

Si l'Agent ne parvient pas à accéder au chemin des fichiers de log, il suit les conteneurs à partir du socket Docker. Si l'Agent a déjà recueilli des logs à partir d'un conteneur spécifique à l'aide du socket Docker, il continue à utiliser cette approche (même après un redémarrage) pour éviter d'envoyer des logs en double. Pour obliger l'Agent à recueillir des logs à partir de fichiers, définissez `DD_LOGS_CONFIG_DOCKER_CONTAINER_FORCE_USE_FILE` sur `true`. Lorsque ce paramètre est défini, il est possible que des logs s'affichent en double dans Datadog.

Si vous recueillez les logs de conteneurs Docker depuis un fichier et que l'Agent n'a pas d'accès en lecture au répertoire qui contient ces logs (`/var/lib/docker/containers` sous Linux), alors l'Agent essaie de les recueillir depuis le socket Docker. Dans certains cas, l'Agent Datadog peut ne pas réussir à recueillir les logs depuis un fichier. Pour diagnostiquer le problème, consultez le statut de l'Agent de logs et recherchez une entrée pour un type de fichier affichant une erreur semblable à celle-ci :

```text
    - Type: file
      Identifier: ce0bae54880ad75b7bf320c3d6cac1ef3efda21fc6787775605f4ba8b6efc834
      Path: /var/lib/docker/containers/ce0bae54880ad75b7bf320c3d6cac1ef3efda21fc6787775605f4ba8b6efc834/ce0bae54880ad75b7bf320c3d6cac1ef3efda21fc6787775605f4ba8b6efc834-json.log
      Status: Error: file /var/lib/docker/containers/ce0bae54880ad75b7bf320c3d6cac1ef3efda21fc6787775605f4ba8b6efc834/ce0bae54880ad75b7bf320c3d6cac1ef3efda21fc6787775605f4ba8b6efc834-json.log does not exist
```

Ce statut signifie que l'Agent ne parvient pas à trouver un fichier de logs pour un conteneur donné. Pour résoudre ce problème, vérifiez que le dossier contenant les logs de conteneur Docker est correctement exposé au conteneur de l'Agent Datadog. Sous Linux, cela correspond à l'argument `-v /var/lib/docker/containers:/var/lib/docker/containers:ro` dans la ligne de commande utilisée pour lancer le conteneur de l'Agent ; sous Windows, il s'agit de l'argument `-v c:/programdata/docker/containers:c:/programdata/docker/containers:ro`. Notez que le chemin du répertoire par rapport au host sous-jacent peut différer selon la configuration du daemon Docker, mais ce n'est pas un problème si les volumes ont bien été mappés. Par exemple, utilisez `-v /data/docker/containers:/var/lib/docker/containers:ro` si le répertoire des données Docker a été déplacé vers `/data/docker` sur le host sous-jacent.

Si les logs sont bien recueillis mais que des lignes individuelles sont fractionnées, vérifiez que le daemon Docker utilise le [pilote de logging JSON](#vos-conteneurs-n-utilisent-pas-le-pilote-de-logging-json).

**Remarque :** lorsque vous installez l'Agent sur le host, il n'est pas autorisé à accéder à `/var/lib/docker/containers`. Par conséquent, avec une telle installation, l'Agent recueille les logs à partir du socket Docker.


### Statut pending


Si le statut de l'Agent de logging indique `Status: Pending` :

```text
==========
Logs Agent
==========
    LogsProcessed: 0
    LogsSent: 0

  container_collect_all
  ---------------------
    Type: docker
    Status: Pending
```

Cela signifie que l'Agent de logging est en cours d'exécution, mais qu'il n'a pas encore commencé à recueillir les logs de conteneur. Plusieurs causes sont possibles :

#### Daemon Docker démarré après l'Agent de host

Si vous utilisez une version < 7.17 de l'Agent et que le daemon Docker démarre alors que l'Agent de host est déjà en cours d'exécution, redémarrez l'Agent pour relancer la collecte de logs de conteneur.

#### Socket Docker non monté

Pour que l'Agent de conteneur puisse recueillir des logs à partir de conteneurs Docker, il doit avoir accès au socket Docker. Lorsqu'il ne dispose pas de cet accès, les logs suivants apparaissent dans `agent.log` :

```text
2019-10-09 14:10:58 UTC | CORE | INFO | (pkg/logs/input/container/launcher.go:51 in NewLauncher) | Could not setup the docker launcher: Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
2019-10-09 14:10:58 UTC | CORE | INFO | (pkg/logs/input/container/launcher.go:58 in NewLauncher) | Could not setup the kubernetes launcher: /var/log/pods not found
2019-10-09 14:10:58 UTC | CORE | INFO | (pkg/logs/input/container/launcher.go:61 in NewLauncher) | Container logs won't be collected
```

Relancez le conteneur de l'Agent avec l'option `-v /var/run/docker.sock:/var/run/docker.sock:ro` pour l'autoriser à accéder au socket Docker.

### Statut sans erreur

Si vos logs ne sont pas transmis à la plate-forme Datadog alors que le statut de l'Agent de logs est semblable à l'exemple de la section [Vérifier le statut de l'Agent](#verifier-le-statut-de-l-agent), il est possible que l'une des situations suivantes s'applique :

* Le port utilisé pour l'envoi de logs à Datadog (10516) est bloqué
* Votre conteneur utilise un pilote de logging autre que celui attendu par l'Agent

#### Le trafic sortant du port 10516 est bloqué

L'Agent Datadog envoie ses logs à Datadog par TCP via le port 10516. Si cette connexion n'est pas disponible, les logs ne sont pas envoyés et une erreur est enregistrée dans le fichier `agent.log`.

Vous pouvez tester manuellement votre connexion avec OpenSSL, GnuTLS ou un autre client SSL/TLS. Pour OpenSSL, exécutez la commande suivante :

```shell
openssl s_client -connect intake.logs.datadoghq.com:10516
```

Pour GnuTLS, exécutez la commande suivante :

```shell
gnutls-cli intake.logs.datadoghq.com:10516
```

Envoyez ensuite un log comme suit :

```text
<CLÉ_API> Ceci est un message test
```

Si vous ne pouvez pas ouvrir le port 10516, vous pouvez configurer l'Agent Datadog de façon à envoyer les logs via HTTPS en définissant la variable d'environnement `DD_LOGS_CONFIG_USE_HTTP` sur `true` :

#### Vos conteneurs n'utilisent pas le pilote de logging JSON

Étant donné que Docker utilise le pilote de logging json-file par défaut, l'Agent de conteneur tente d'abord de recueillir les logs à partir de celui-ci. Si vos conteneurs sont configurés de façon à utiliser un autre pilote de logging, l'Agent indique qu'il parvient à trouver vos conteneurs, mais qu'il n'est pas en mesure de recueillir leurs logs. L'Agent de conteneur peut également être configuré de façon à lire les logs à partir du pilote journald.

1. Si vous ne savez pas quel pilote de logging vos conteneurs utilisent, exécutez la commande `docker inspect <NOM_CONTENEUR>` pour visualiser le pilote configuré. Le bloc suivant apparaît dans la sortie du docker inspect lorsque le pilote de logging JSON est configuré :

    ```text
    "LogConfig": {
        "Type": "json-file",
        "Config": {}
    },
    ```

2. Si le conteneur est configuré de façon à utiliser le pilote de logging journald, le bloc suivant apparaît dans la sortie :

    ```text
    "LogConfig": {
        "Type": "journald",
        "Config": {}
    },
    ```

3. Pour recueillir des logs à partir du pilote de logging journald, configurez l'intégration journald [en suivant ces instructions][2].

4. Montez le fichier YAML sur votre conteneur en suivant les instructions disponibles dans la [documentation sur l'Agent Docker][3]. Pour découvrir comment définir le pilote de logging utilisé par un conteneur Docker, [consultez cette documentation][4].

## L'Agent n'envoie pas les logs issus de conteneurs pour lesquels une grande quantité de logs persistants est conservée (> 1 Go)

Le daemon Docker peut rencontrer des problèmes de performances lorsqu'il essaie de récupérer les logs de conteneurs pour lesquels des fichiers de logs volumineux sont déjà stockés sur le disque. Cela peut engendrer des timeouts de lecture lorsque l'Agent Datadog récupère les logs des conteneurs à partir du daemon Docker. 

Dans ce cas, l'Agent Datadog envoie un log contenant le message `Restarting reader after a read timeout` pour un conteneur donné toutes les 30 secondes, et il arrête d'envoyer les logs issus de ce conteneur.

Le timeout de lecture par défaut est défini sur 30 secondes. Si vous augmentez cette valeur, cela laisse plus de temps au daemon Docker pour répondre à l'Agent Datadog. Elle peut être configurée dans `datadog.yaml` à l'aide du paramètre `logs_config.docker_client_read_timeout` ou via la variable d'environnement `DD_LOGS_CONFIG_DOCKER_CLIENT_READ_TIMEOUT`. Cette valeur est une durée en secondes. Voici un exemple où le délai d'expiration est défini sur 60 secondes :

```yaml
logs_config:
  docker_client_read_timeout: 60
```

## Agent de host
### Utilisateur de l'Agent dans le groupe Docker

Si vous utilisez l'Agent de host, l'utilisateur `dd-agent` doit être ajouté au groupe Docker afin qu'il puisse lire le contenu du socket Docker. Si les logs d'erreur suivants figurent dans le fichier `agent.log` :

```text
2019-10-11 09:17:56 UTC | CORE | INFO | (pkg/autodiscovery/autoconfig.go:360 in initListenerCandidates) | docker listener cannot start, will retry: temporary failure in dockerutil, will retry later: could not determine docker server API version: Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/version: dial unix /var/run/docker.sock: connect: permission denied

2019-10-11 09:17:56 UTC | CORE | ERROR | (pkg/autodiscovery/config_poller.go:123 in collect) | Unable to collect configurations from provider docker: temporary failure in dockerutil, will retry later: could not determine docker server API version: Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/version: dial unix /var/run/docker.sock: connect: permission denied
```

Pour ajouter l'Agent de host au groupe d'utilisateurs Docker, exécutez la commande suivante : `usermod -a -G docker dd-agent`.

[1]: /fr/help/
[2]: /fr/integrations/journald/#setup
[3]: /fr/agent/docker/?tab=standard#mounting-conf-d
[4]: https://docs.docker.com/config/containers/logging/journald/