---
aliases:
- /fr/developers/metrics/unix_socket/
description: Documentation relative à l'utilisation de DogStatsD via un socket de
  domaine Unix
further_reading:
- link: developers/dogstatsd
  tag: Documentation
  text: Présentation de DogStatsD
- link: developers/libraries
  tag: Documentation
  text: Bibliothèques client de Datadog et sa communauté pour DogStatsD et les API
title: Utiliser DogStatsD via un socket de domaine Unix
---

Depuis la version 6.0, l'Agent est capable d'ingérer des métriques via un socket de domaine Unix (UDS) en alternative au transport UDP.

Si UDP fonctionne très bien sur `localhost`, sa configuration peut toutefois poser problème dans les environnements conteneurisés. Les sockets de domaine Unix vous permettent d'établir une connexion via un fichier de socket, quel que soit l'IP du conteneur de l'Agent Datadog. Ils offrent également les avantages suivants :

- Le contournement de la pile réseau améliore drastiquement les performances en cas de trafic élevé.
- Contrairement à UDP qui n'intègre aucune solution de traitement des erreurs, UDS permet à l'Agent de détecter les paquets perdus et les erreurs de connexion. Il peut également fonctionner en mode non bloquant.
- DogStatsD est en mesure de détecter le conteneur à l'origine des métriques et d'appliquer le tag correspondant.

## Fonctionnement

Au lieu d'utiliser un couple `IP:port` pour établir les connexions, les sockets de domaine Unix utilisent un fichier de socket générique. Une fois la connexion ouverte, les données sont transmises dans le même [format de datagramme][1] que le transport UDP. Lorsque l'Agent redémarre, le socket existant est supprimé et remplacé par un nouveau socket. Les bibliothèques client détectent ce changement et se connectent automatiquement au nouveau socket.

**Remarques :**

* De par sa nature, le trafic UDS est local au host. Cela signifie que l'Agent Datadog doit s'exécuter sur chaque host depuis lequel vous envoyez des métriques.
* Le protocole UDS n'est pas pris en charge par Windows.

## Configuration

Pour configurer DogStatsD avec le socket de domaine Unix, activez le serveur DogStatsD à l'aide du paramètre `dogstatsd_socket`. Configurez ensuite le [client DogStatsD](#configuration-du-client-dogstatsd) dans votre code.

Pour activer l'UDS DogStatsD de l'Agent :

{{< tabs >}}
{{% tab "Host" %}}

1. Modifiez le [fichier de configuration principal de l'Agent][1] afin de définir l'option `dogstatsd_socket` sur le chemin où DogStatsD doit créer son socket d'écoute :

    ```yaml
    ## @param dogstatsd_socket - string - optional - default: ""
    ## Listen for Dogstatsd metrics on a Unix Socket (*nix only).
    ## Set to a valid and existing filesystem path to enable.
    #
    dogstatsd_socket: '/var/run/datadog/dsd.socket'
    ```

2. [Redémarrez votre Agent][2].


[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /fr/agent/guide/agent-commands/
{{% /tab %}}
{{% tab "Docker" %}}

1. Définissez le chemin du socket avec la variable d'environnement `DD_DOGSTATSD_SOCKET=<VOTRE_CHEMIN_UDS>` sur le conteneur de l'Agent.

2. Assurez-vous que les conteneurs de votre application peuvent accéder au fichier du socket. Pour ce faire, montez un répertoire host des deux côtés (avec un accès en lecture seule dans les conteneurs de votre application, et en lecture/écriture dans le conteneur de l'Agent). Monter le dossier parent à la place du socket directement permet de maintenir la communication avec le socket en cas de redémarrage de DogStatsD :

    - Démarrez le conteneur de l'Agent avec `-v /var/run/datadog:/var/run/datadog`.
    - Démarrez vos conteneurs d'application avec `-v /var/run/datadog:/var/run/datadog:ro`.

{{% /tab %}}
{{% tab "Kubernetes" %}}

1. Définissez le chemin du socket avec la variable d'environnement `DD_DOGSTATSD_SOCKET=<VOTRE_CHEMIN_UDS>` sur le conteneur de l'Agent (exemple : `/var/run/datadog/dsd.socket`).

2. Assurez-vous que les conteneurs de votre application peuvent accéder au fichier du socket. Pour ce faire, montez un répertoire host des deux côtés (avec un accès en lecture seule dans les conteneurs de votre application, et en lecture/écriture dans le conteneur de l'Agent). Monter le dossier parent à la place du socket directement permet de maintenir la communication avec le socket en cas de redémarrage de DogStatsD.

    - Montez le dossier de socket dans votre conteneur `datadog-agent` :

        ```yaml
        volumeMounts:
            - name: dsdsocket
              mountPath: /var/run/datadog
            ##...
        volumes:
            - hostPath:
                  path: /var/run/datadog/
              name: dsdsocket
        ```

    - Exposez le même dossier dans les conteneurs de votre application :

        ```yaml
        volumeMounts:
            - name: dsdsocket
              mountPath: /var/run/datadog
              readOnly: true
            ## ...
        volumes:
            - hostPath:
                  path: /var/run/datadog/
              name: dsdsocket
        ```

        **Remarque** : supprimez `readOnly: true` si les conteneurs de votre application doivent disposer d'un accès en écriture au socket.

{{% /tab %}}
{{% tab "EKS Fargate" %}}

1. Définissez le chemin du socket avec la variable d'environnement `DD_DOGSTATSD_SOCKET=<VOTRE_CHEMIN_UDS>` sur le conteneur de l'Agent (exemple : `/var/run/datadog/dsd.socket`).

2. Assurez-vous que les conteneurs de votre application peuvent accéder au fichier du socket. Pour ce faire, montez un répertoire vide des deux côtés (avec un accès en lecture seule dans les conteneurs de votre application, et en lecture/écriture dans le conteneur de l'Agent). Monter le dossier parent à la place du socket directement permet de maintenir la communication avec le socket en cas de redémarrage de DogStatsD.

    - Montez le dossier vide dans les spécifications de votre pod :

        ```yaml
        volumes:
            - emptyDir: {}
              name: dsdsocket
        ```

    - Montez le dossier de socket dans votre conteneur `datadog-agent` :

        ```yaml
        volumeMounts:
            - name: dsdsocket
              mountPath: /var/run/datadog
        ```

    - Exposez le même dossier dans les conteneurs de votre application :

        ```yaml
        volumeMounts:
            - name: dsdsocket
              mountPath: /var/run/datadog
              readOnly: true
        ```

        **Remarque** : supprimez `readOnly: true` si les conteneurs de votre application doivent disposer d'un accès en écriture au socket.

{{% /tab %}}
{{< /tabs >}}

### Test avec netcat

Pour envoyer des métriques à partir de scripts shell, ou pour vérifier que DogStatsD effectue son écoute sur le socket, utilisez `netcat`. La plupart des implémentations de `netcat`, telles que `netcat-openbsd` sur Debian ou `nmap-ncat` sur RHEL, prennent en charge le trafic de socket Unix via le flag `-U` :

```shell
echo -n "custom.metric.name:1|c" | nc -U -u -w1 /var/run/datadog/dsd.socket
```

### Détection de l'origine

La détection de l'origine permet à DogStatsD d'identifier la provenance des métriques de conteneur et de taguer automatiquement les métriques. Lorsque ce mode est activé, toutes les métriques transmises par UDS reçoivent les mêmes tags de conteneur que les métriques Autodiscovery.

{{< tabs >}}
{{% tab "Host" %}}

1. Activez l'option `dogstatsd_origin_detection` [dans le fichier de configuration principal de votre Agent][1] :

    ```yaml
    ## @param dogstatsd_origin_detection - boolean - optional - default: false
    ## When using Unix Socket, DogStatsD can tag metrics
    ## with container metadata. If running DogStatsD in a container,
    ## host PID mode (for example, with --pid=host) is required.
    #
    dogstatsd_origin_detection: true
    ```

2. Pour configurer la [cardinalité des tags][2] (facultatif) pour les métriques recueillies avec la détection de l'origine, définissez le paramètre `dogstatsd_tag_cardinality` sur `low` (par défaut), `orchestrator` ou `high` :

    ```yaml
    ## @param dogstatsd_tag_cardinality - string - optional - default: low
    ## Configure the level of granularity of tags to send for DogStatsD
    ## metrics and events. Choices are:
    ##   * low: add tags about low-cardinality objects
    ##     (clusters, hosts, deployments, container images, ...)
    ##   * orchestrator: add tags about pods (Kubernetes),
    ##     or tasks (ECS or Mesos) -level of cardinality
    ##   * high: add tags about high-cardinality objects
    ##     (individual containers, user IDs in requests, etc.)
    ##
    ## WARNING: Sending container tags for DogStatsD metrics may create
    ## more metrics (one per container instead of one per host).
    ## This may impact your custom metrics billing.
    #
    dogstatsd_tag_cardinality: low
    ```

3. [Redémarrez votre Agent][3].


[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /fr/getting_started/tagging/assigning_tags/#environment-variables
[3]: /fr/agent/guide/agent-commands/
{{% /tab %}}
{{% tab "Docker" %}}

1. Définissez la variable d'environnement `DD_DOGSTATSD_ORIGIN_DETECTION=true` pour le conteneur de l'Agent.

2. Pour configurer la [cardinalité des tags][1] (facultatif) pour les métriques recueillies avec la détection de l'origine, définissez la variable d'environnement `DD_DOGSTATSD_TAG_CARDINALITY` sur `low` (par défaut), `orchestrator` ou `high`.

Lorsqu'il fonctionne dans un conteneur, DogStatsD doit être exécuté dans l'espace de nommage PID du host pour assurer la bonne détection de l'origine. Activez cette option via le Docker avec le flag `--pid=host`. L'option est prise en charge par ECS avec le paramètre `"pidMode": "host"` dans la définition de tâche du conteneur. Elle n'est pas prise en charge dans Fargate. Pour en savoir plus, consultez la documentation sur le [mode PID][2].


[1]: /fr/getting_started/tagging/assigning_tags/#environment-variables
[2]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#task_definition_pidmode
{{% /tab %}}
{{% tab "Kubernetes" %}}

1. Définissez la variable d'environnement `DD_DOGSTATSD_ORIGIN_DETECTION` sur true pour le conteneur de l'Agent :

    ```yaml
    # (...)
    env:
        # (...)
        - name: DD_DOGSTATSD_ORIGIN_DETECTION
          value: 'true'
    ```

2. Définissez `hostPID: true` dans les spécifications du modèle de pod :

    ```yaml
    # (...)
    spec:
        # (...)
        hostPID: true
    ```

3. Pour configurer la [cardinalité des tags][1] (facultatif) pour les métriques recueillies avec la détection de l'origine, définissez la variable d'environnement `DD_DOGSTATSD_TAG_CARDINALITY` sur `low` (par défaut), `orchestrator` ou `high` :

    ```yaml
    # (...)
    env:
        # (...)
        - name: DD_DOGSTATSD_TAG_CARDINALITY
          value: 'low'
    ```

[1]: /fr/getting_started/tagging/assigning_tags/#environment-variables
{{% /tab %}}
{{% tab "EKS Fargate" %}}

1. Définissez la variable d'environnement `DD_DOGSTATSD_ORIGIN_DETECTION` sur true pour le conteneur de l'Agent :

    ```yaml
    # (...)
    env:
        # (...)
        - name: DD_DOGSTATSD_ORIGIN_DETECTION
          value: 'true'
    ```

2. Définissez `shareProcessNamespace: true` dans les spécifications du modèle de pod :

    ```yaml
    # (...)
    spec:
        # (...)
        shareProcessNamespace: true
    ```

3. Pour configurer la [cardinalité des tags][1] (facultatif) pour les métriques recueillies avec la détection de l'origine, définissez la variable d'environnement `DD_DOGSTATSD_TAG_CARDINALITY` sur `low` (par défaut), `orchestrator` ou `high` :

    ```yaml
    # (...)
    env:
        # (...)
        - name: DD_DOGSTATSD_TAG_CARDINALITY
          value: 'low'
    ```

[1]: /fr/getting_started/tagging/assigning_tags/#environment-variables
{{% /tab %}}
{{< /tabs >}}

**Remarque :** les tags `container_id`, `container_name` et `pod_name` ne sont pas ajoutés par défaut afin d'éviter la création d'un nombre excessif de [métriques custom][2].

## Configuration du client DogStatsD

### Bibliothèques client

Les bibliothèques client DogStatsD officielles suivantes prennent en charge le trafic UDS de manière native. Consultez la documentation de la bibliothèque pour savoir comment activer le trafic UDS. **Remarque** : tout comme avec UDP, il est conseillé d'activer la mise en mémoire tampon du côté client pour améliorer les performances en cas de trafic élevé :

| Langage | Bibliothèque                              |
| -------- | ------------------------------------ |
| Golang   | [DataDog/datadog-go][3]              |
| Java     | [DataDog/java-dogstatsd-client][4]   |
| Python   | [DataDog/datadogpy][5]               |
| Ruby     | [DataDog/dogstatsd-ruby][6]          |
| PHP      | [DataDog/php-datadogstatsd][7]       |
| C#       | [DataDog/dogstatsd-csharp-client][8] |

### Proxy socat

Si une application ou une bibliothèque client ne prend pas en charge le trafic UDS, vous pouvez exécuter `socat` afin d'effectuer l'écoute sur le port UDP `8125` et faire passer par un proxy les requêtes envoyées au socket :

```shell
socat -s -u UDP-RECV:8125 UNIX-SENDTO:/var/run/datadog/dsd.socket
```

Pour découvrir comment créer des options d'implémentation supplémentaires, consultez le [wiki du GitHub datadog-agent][9] (en anglais).

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/
[2]: /fr/metrics/custom_metrics/
[3]: https://github.com/DataDog/datadog-go#unix-domain-sockets-client
[4]: https://github.com/DataDog/java-dogstatsd-client#unix-domain-socket-support
[5]: https://github.com/DataDog/datadogpy#instantiate-the-dogstatsd-client-with-uds
[6]: https://github.com/DataDog/dogstatsd-ruby#configuration
[7]: https://github.com/DataDog/php-datadogstatsd
[8]: https://github.com/DataDog/dogstatsd-csharp-client#unix-domain-socket-support
[9]: https://github.com/DataDog/datadog-agent/wiki/Unix-Domain-Sockets-support