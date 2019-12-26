---
title: Collecte de logs avec Docker
kind: documentation
aliases:
  - /fr/logs/docker
  - /fr/logs/languages/docker
  - /fr/logs/log_collection/docker
further_reading:
  - link: logs/explorer
    tag: Documentation
    text: Apprendre à explorer vos logs
  - link: logs/explorer/analytics
    tag: Documentation
    text: Effectuer des analyses de logs
  - link: logs/processing
    tag: Documentation
    text: Apprendre à traiter vos logs
  - link: logs/processing/parsing
    tag: Documentation
    text: En savoir plus sur le parsing
---
## Présentation

L'Agent Datadog 6 (et ses versions ultérieures) recueille des logs à partir des conteneurs. Deux types d'installation sont disponibles :

- Sur le host ; l'Agent ne fait pas partie de l'environnement Docker
- En déployant l'Agent conteneurisé dans l'environnement Docker

Recueillez ensuite tous les logs des conteneurs de votre environnement ou choisissez les logs recueillis en les filtrant par image de conteneur, étiquette de conteneur ou nom.

Cette page détaille la collecte de logs à partir de tous les conteneurs actifs, ainsi que l'utilisation d'Autodiscovery pour activer les intégrations de logs.

## Implémentation

### Installation en une étape pour recueillir tous les logs de conteneur

La première étape consiste à installer l'Agent (la version conteneurisée ou directement sur le host) et d'activer la collecte de logs pour tous les conteneurs.

{{< tabs >}}
{{% tab "Installation de l'Agent conteneurisé" %}}

Afin de lancer un [conteneur Docker][1] qui intègre l'Agent Datadog pour surveiller votre host, utilisez la commande suivante :

```
docker run -d --name datadog-agent \
           -e DD_API_KEY=<VOTRE_CLÉ_API> \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_AC_EXCLUDE="name:datadog-agent" \
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /proc/:/host/proc/:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
           datadog/agent:latest
```

Nous vous conseillons de choisir la dernière version de l'Agent Datadog. La liste complète des [images de l'Agent v6][2] est disponible sur Docker Hub.

Voici les commandes associées à la collecte de logs :

| Commande                                               | Description                                                                                                                                                  |
|-------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `-e DD_LOGS_ENABLED=true`                             | L'envoi de cette commande avec la valeur `true` active la collecte de logs. L'Agent recherche les instructions relatives aux logs dans les fichiers de configuration.                                                      |
| `-e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true`        | Ajoute une configuration de log qui active la collecte de log pour tous les conteneurs.                                                                                     |
| `-v /opt/datadog-agent/run:/opt/datadog-agent/run:rw` | Pour éviter de perdre des logs de conteneur lors des redémarrages ou des problèmes de réseau, la dernière ligne de log recueillie pour chaque conteneur dans ce répertoire est stockée sur le host. |
| `-e DD_AC_EXCLUDE="name:datadog-agent"`               | Empêche l'Agent Datadog de recueillir et d'envoyer ses propres logs. Supprimez ce paramètre si vous souhaitez recueillir les logs de l'Agent Datadog.                    |
| `-v /var/run/docker.sock:/var/run/docker.sock:ro`     | Les logs sont recueillis à partir du conteneur `stdout/stderr` du socket Docker.                                                                                    |


[1]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent
[2]: https://hub.docker.com/r/datadog/agent/tags
{{% /tab %}}
{{% tab "Installation sur host" %}}

Installez la [dernière version de l'Agent 6][1] sur votre host. L'Agent peut recueillir des logs à partir des [fichiers sur le host][2] ou du conteneur `stdout`/`stderr`.

La collecte de logs est *désactivée* par défaut dans l'Agent Datadog. Pour l'activer, ajoutez les lignes suivantes à votre fichier de configuration `datadog.yaml` :

```
logs_enabled: true
listeners:
  - name: docker
config_providers:
  - name: docker
    polling: true
logs_config:
  container_collect_all: true
```

[Redémarrez l'Agent][3] pour afficher tous les logs de votre conteneur dans Datadog.


[1]: /fr/agent/basic_agent_usage
[2]: /fr/agent/logs/#custom-log-collection
[3]: /fr/agent/guide/agent-commands/?tab=agentv6#restart-the-agent
{{% /tab %}}
{{< /tabs >}}

**Remarques importantes** :

* Pour l'Agent Datadog 6.8 et les versions ultérieures, les paramètres `source` et `service` sont associés par défaut à la valeur du tag `short_image`.
Les valeurs de source et service peuvent être remplacées avec Autodiscovery, comme décrit ci-dessous. Définissez `source` sur le nom d'une intégration pour installer des pipelines d'intégration qui analysent vos logs et extraient leurs informations pertinentes.

* Les logs qui proviennent du conteneur `Stderr` possèdent par défaut le statut `Error`.

* Si vous utilisez le pilote de journalisation *journald* à la place du pilote json-file par défaut de Docker, consultez la documentation relative à l'[intégration de journald][1] pour en savoir plus sur la configuration des environnements conteneurisés.

### Activer la collecte de logs pour des intégrations

Pour l'Agent Datadog 6.8 et les versions ultérieures, les paramètres `source` et `service` sont associés par défaut à la valeur du tag `short_image`. Cela permet à Datadog d'identifier la source du log pour chaque conteneur et d'installer automatiquement l'intégration correspondante.

Le nom raccourci de l'image du conteneur peut être différent du nom de l'intégration pour les images personnalisées, et peut être remplacé pour correspondre davantage au nom de votre application. Pour cela, vous pouvez utiliser la fonction [Autodiscovery de Datadog][2] et les [annotations de pod dans Kubernetes][3], ou les étiquettes de conteneur.

Selon le type de fichier, Autodiscovery exige les formats d'étiquettes suivants :

{{< tabs >}}
{{% tab "Dockerfile" %}}

Ajoutez l'étiquette `LABEL` suivante à votre Dockerfile :

```
LABEL "com.datadoghq.ad.logs"='[<CONFIG_LOGS>]'
```

{{% /tab %}}
{{% tab "Docker-Compose" %}}

Ajoutez l'étiquette suivante à votre fichier `docker-compose.yaml` :

```
labels:
  com.datadoghq.ad.logs: '[<CONFIG_LOGS>]'
```

{{% /tab %}}
{{% tab "Commande Exécuter" %}}

Ajoutez l'étiquette suivante en tant que commande Exécuter :

```
-l com.datadoghq.ad.logs='[<CONFIG_LOGS>]'
```

{{% /tab %}}
{{< /tabs >}}

Lorsque `<CONFIG_LOG>` est la configuration de collecte de logs, vous trouverez à l'intérieur un fichier de configuration d'intégration. [Consultez la section relative à la configuration de la collecte de logs pour en savoir plus][4].

#### Exemples

{{< tabs >}}
{{% tab "Dockerfile NGINX" %}}

Le Dockerfile suivant permet l'intégration de log NGINX dans le conteneur correspondant (la valeur `service` peut être modifiée) :

```
LABEL "com.datadoghq.ad.logs"='[{"source": "nginx", "service": "webapp"}]'
```

Pour activer les intégrations NGINX de métrique et de log :

```
LABEL "com.datadoghq.ad.check_names"='["nginx"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"nginx_status_url": "http://%%host%%:%%port%%/nginx_status"}]'
LABEL "com.datadoghq.ad.logs"='[{"source": "nginx", "service": "webapp"}]'
```

{{% /tab %}}
{{% tab "Logs multiligne Java" %}}

Pour les logs multiligne tels que les traces de pile, l'Agent dispose de [règles de traitement multiligne][1] pour agréger les lignes dans un seul log.

Exemple de log (traces de pile Java) :

```
2018-01-03T09:24:24.983Z UTC Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
```

Appliquez l'étiquette `com.datadoghq.ad.logs` à vos conteneurs comme indiqué ci-dessous pour que le log précédent soit correctement recueilli :

  ```
  labels:
    com.datadoghq.ad.logs: '[{"source": "java", "service": "myapp", "log_processing_rules": [{"type": "multi_line", "name": "log_start_with_date", "pattern" : "\\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])"}]}]'
  ```
Consultez la [documentation relative aux règles de traitement multiligne][1] pour obtenir d'autres d'exemples d'expressions.


[1]: /fr/agent/logs/advanced_log_collection/#multi-line-aggregation
{{% /tab %}}
{{% tab "Kubernetes" %}}

Si vous exécutez Kubernetes, vous pouvez utiliser les annotations de pod.

```
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: nginx
spec:
  selector:
    matchLabels:
      app: webapp
  template:
    metadata:
      annotations:
        ad.datadoghq.com/nginx.logs: '[{"source":"nginx","service":"webapp"}]'
      labels:
        app: webapp
      name: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:latest

```

Consultez le [guide Autodiscovery][1] pour découvrir des exemples et en savoir plus sur la configuration et le fonctionnement d'Autodiscovery.


[1]: /fr/agent/autodiscovery/integrations/?tab=kubernetespodannotations#configuration
{{% /tab %}}
{{< /tabs >}}

**Remarque** : les fonctionnalités d'Autodiscovery peuvent être utilisées avec ou sans la variable d'environnement `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL`. Choisissez l'une des options suivantes :

* Utilisez les étiquettes de conteneur ou les annotations de pod pour choisir les conteneurs à partir desquels recueillir les logs.
* Utilisez la variable d'environnement pour recueillir les logs de tous les conteneurs avant de remplacer les valeurs `source` et `service` par défaut.
* Ajoutez des règles de traitement pour le sous-ensemble de conteneurs souhaité.

### Filtrer les conteneurs

Utilisez les méthodes suivantes pour filtrer les logs, les métriques et Autodiscovery. Ce filtrage peut par exemple vous servir à empêcher la collecte de logs de l'Agent Datadog.

{{< tabs >}}
{{% tab "Variable d'environnement" %}}

Deux variables d'environnement sont disponibles pour inclure ou exclure une liste de conteneurs filtrés par image ou par nom de conteneur :

* `DD_AC_INCLUDE` : liste des conteneurs à toujours inclure.
* `DD_AC_EXCLUDE` : liste des conteneurs à exclure.

Ces options fonctionnent à l'aide de chaînes de valeurs séparées par des espaces. Par exemple, si vous souhaitez uniquement surveiller deux images et exclure le reste, indiquez ce qui suit :

```
DD_AC_EXCLUDE = "image:.*"
DD_AC_INCLUDE = "image:cp-kafka image:k8szk"
```

Pour exclure un conteneur précis :

```
DD_AC_EXCLUDE = "name:datadog-agent"
```

{{% /tab %}}

{{% tab "Fichier de configuration" %}}

Deux paramètres sont disponibles dans `datadog.yaml` pour inclure ou exclure une liste de conteneurs filtrés par image ou par nom de conteneur :

* `ac_exclude` : liste des conteneurs à toujours inclure.
* `ac_include` : liste des conteneurs à exclure.

Par exemple, si vous souhaitez uniquement surveiller deux images et exclure le reste, indiquez ce qui suit :

```
ac_exclude: ["image:.*"]
ac_include: ["image:cp-kafka", "image:k8szk"]
```

Pour exclure l'Agent Datadog :

```
ac_exclude = ["name:datadog-agent"]
```

{{% /tab %}}
{{< /tabs >}}

## Conteneurs de courte durée

Dans un environnement Docker, l'Agent reçoit les mises à jour de conteneurs en temps réel via les événements Docker. L'Agent extrait et met à jour la configuration toutes les secondes depuis les étiquettes de conteneur (Autodiscovery)

À partir de l'Agent v6.14+, l'Agent recueille les logs de tous les conteneurs (qu'ils soient exécutés ou arrêtés). Par conséquent, les logs des conteneurs de courte durée qui ont été lancés ou arrêtés il y a moins d'une seconde sont également recueillis tant qu'ils ne sont pas supprimés.

Pour les environnements Kubernetes, consultez la [documentation relative aux conteneurs de courte durée Kubernetes][5]

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/journald
[2]: /fr/agent/autodiscovery
[3]: /fr/agent/autodiscovery/integrations/?tab=kubernetespodannotations#configuration
[4]: /fr/agent/logs/#custom-log-collection
[5]: https://docs.datadoghq.com/fr/agent/kubernetes/daemonset_setup/?tab=k8sfile#short-lived-containers