---
title: Guide de dépannage pour la collecte de logs Docker
kind: documentation
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

4. Si le statut est semblable à celui de l'exemple ci-dessus mais que vous ne recevez toujours aucun log, consultez la section [Le statut de l'Agent de logging n'indique aucune erreur](#le-statut-de-l-agent-de-logging-n-indique-aucune-erreur)

## Le statut de l'Agent de logging indique « not running »

Si la commande status de l'Agent renvoie le message suivant :

```text
==========
Logs Agent
==========

  Logs Agent is not running
```

Cela signifie que le logging n'est pas activé dans l'Agent.

Pour activer le logging avec l'Agent de conteneur, définissez la variable d'environnement suivante : `DD_LOGS_ENABLED=true`.

## L'Agent de logging indique qu'aucun log n'a été traité ou envoyé

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

## L'Agent de logging indique « Status: Pending »

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

### Le daemon Docker a démarré après l'Agent de host

Si le daemon Docker démarre alors que l'Agent de host est déjà en cours d'exécution, redémarrez l'Agent pour relancer la collecte de logs de conteneur.

### Le socket Docker n'a pas été monté au démarrage de l'Agent de conteneur

Pour que l'Agent de conteneur puisse recueillir des logs à partir de conteneurs Docker, il doit avoir accès au socket Docker. Lorsqu'il ne dispose pas de cet accès, les logs suivants apparaissent dans `agent.log` :

```text
2019-10-09 14:10:58 UTC | CORE | INFO | (pkg/logs/input/container/launcher.go:51 in NewLauncher) | Could not setup the docker launcher: Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
2019-10-09 14:10:58 UTC | CORE | INFO | (pkg/logs/input/container/launcher.go:58 in NewLauncher) | Could not setup the kubernetes launcher: /var/log/pods not found
2019-10-09 14:10:58 UTC | CORE | INFO | (pkg/logs/input/container/launcher.go:61 in NewLauncher) | Container logs won't be collected
```

Relancez le conteneur de l'Agent avec l'option `-v /var/run/docker.sock:/var/run/docker.sock:ro` pour l'autoriser à accéder au socket Docker.

### L'utilisateur « dd-agent » ne fait pas partie du groupe Docker (Agent de host uniquement)

Si vous utilisez l'Agent de host, l'utilisateur `dd-agent` doit être ajouté au groupe Docker pour lui accorder un accès en lecture au socket Docker. Si les logs d'erreur suivants apparaissent dans le fichier `agent.log` :

```text
2019-10-11 09:17:56 UTC | CORE | INFO | (pkg/autodiscovery/autoconfig.go:360 in initListenerCandidates) | docker listener cannot start, will retry: temporary failure in dockerutil, will retry later: could not determine docker server API version: Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/version: dial unix /var/run/docker.sock: connect: permission denied

2019-10-11 09:17:56 UTC | CORE | ERROR | (pkg/autodiscovery/config_poller.go:123 in collect) | Unable to collect configurations from provider docker: temporary failure in dockerutil, will retry later: could not determine docker server API version: Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/version: dial unix /var/run/docker.sock: connect: permission denied
```

Ajoutez l'Agent de host au groupe d'utilisateurs Docker en exécutant la commande suivante : `usermod -a -G docker dd-agent`.

## Le statut de l'Agent de logging n'indique aucune erreur

Si le statut de l'Agent de logging ressemble à celui de l'exemple donné dans [Vérifier le statut de l'Agent](#verifier-le-statut-de-l-agent) mais qu'aucun log n'est visible sur la plateforme Datadog, la cause est peut-être l'une des suivantes :

* Le port utilisé pour l'envoi de logs à Datadog (10516) est bloqué
* Votre conteneur utilise un pilote de logging autre que celui attendu par l'Agent

### Le trafic sortant du port 10516 est bloqué

L'Agent Datadog envoie ses logs à Datadog par TCP via le port 10516. Si cette connexion n'est pas disponible, les logs ne sont pas envoyés et une erreur est enregistrée dans le fichier `agent.log`.

Testez manuellement votre connexion en exécutant une commande telnet ou openssl comme suit (le port 10514 fonctionne également, mais cette méthode est moins sécurisée) :

* `openssl s_client -connect intake.logs.datadoghq.com:10516`
* `telnet intake.logs.datadoghq.com 10514`

Envoyez ensuite un log comme suit :

```text
<CLÉ_API> this is a test message
```

Si vous ne pouvez pas ouvrir le port 10514 ou 10516, vous pouvez configurer l'Agent Datadog de façon à envoyer les logs via HTTPS en définissant la variable d'environnement `DD_LOGS_CONFIG_USE_HTTP` sur `true` :

### Vos conteneurs n'utilisent pas le pilote de logging JSON

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

[1]: https://docs.datadoghq.com/fr/help
[2]: /fr/integrations/journald/#setup
[3]: /fr/agent/docker/?tab=standard#mounting-conf-d
[4]: https://docs.docker.com/config/containers/logging/journald/