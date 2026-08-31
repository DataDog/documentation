---
description: Installation et configuration manuelles de l'Agent Datadog sur Kubernetes
  à l'aide du déploiement DaemonSet
further_reading:
- link: /containers/kubernetes/installation
  tag: Documentation
  text: Installer l'Agent Datadog sur Kubernetes
title: Installer et configurer manuellement l'Agent Datadog sur Kubernetes avec DaemonSet
---

<div class="alert alert-danger">
  Datadog déconseille d'utiliser des DaemonSets pour déployer l'Agent Datadog, car le processus manuel est sujet aux erreurs. Datadog recommande d'<a href="/containers/kubernetes/installation">utiliser l'opérateur Datadog ou Helm</a> pour installer l'Agent sur Kubernetes.
</div>

## Installation
Vous pouvez utiliser des DaemonSets pour déployer l'Agent Datadog sur tous vos nœuds (ou sur des nœuds spécifiques en [utilisant des nodeSelectors][1]).

Pour installer l'Agent Datadog sur votre cluster Kubernetes :

1. **Configurez les autorisations de l'Agent** : si le contrôle d'accès basé sur des rôles (RBAC) est activé pour votre déploiement Kubernetes, configurez les autorisations RBAC pour le compte de service de votre Agent Datadog. Depuis la version 1.6 de Kubernetes, le RBAC est activé par défaut. Créez les ClusterRole, ServiceAccount et ClusterRoleBinding appropriés à l'aide de la commande suivante :

    ```shell
    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrole.yaml"

    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/serviceaccount.yaml"

    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrolebinding.yaml"
    ```

    **Remarque** : ces configurations RBAC sont définies pour l'espace de nommage `default`. Si vous utilisez un espace de nommage personnalisé, modifiez le paramètre `namespace` avant d'appliquer les configurations.


2. **Créez le manifeste de l'Agent Datadog**. Créez le manifeste `datadog-agent.yaml` à partir de l'un des modèles suivants :

    | Métriques                         | Logs                            | APM                             | Processus                         | NPM                             | Sécurité                        | Linux                   | Windows                              |
    |---------------------------------|---------------------------------|---------------------------------|---------------------------------|---------------------------------|---------------------------------|-------------------------|--------------------------------------|
    | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | [Modèle de manifeste][2]  | [Modèle de manifeste][3] (sans sécurité) |
    | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |                                 |                                 |                                 | [Modèle de manifeste][4]  | [Modèle de manifeste][5]               |
    | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |                                 |                                 |                                 |                                 | [Modèle de manifeste][6]  | [Modèle de manifeste][7]               |
    | <i class="icon-check-bold"></i> |                                 | <i class="icon-check-bold"></i> |                                 |                                 |                                 | [Modèle de manifeste][8]  | [Modèle de manifeste][9]               |
    |                                 |                                 |                                 |                                 | <i class="icon-check-bold"></i> |                                 | [Modèle de manifeste][10] | aucun modèle                          |
    | <i class="icon-check-bold"></i> |                                 |                                 |                                 |                                 |                                 | [Modèle de manifeste][11] | [Modèle de manifeste][12]              |

     Pour activer complètement la collecte de traces, [des étapes supplémentaires sont requises sur la configuration du Pod de votre application][13]. Consultez également les pages de documentation [logs][14], [APM][15], [processus][16], [Cloud Network Monitoring][17] et [sécurité][18] pour apprendre à activer chaque fonctionnalité individuellement.

     **Remarque** : ces manifestes sont définis pour l'espace de nommage `default`. Si vous utilisez un espace de nommage personnalisé, modifiez le paramètre `metadata.namespace` avant d'appliquer les manifestes.

3. Dans le manifeste `secret-api-key.yaml`, remplacez `PUT_YOUR_BASE64_ENCODED_API_KEY_HERE` par [votre clé d'API Datadog][19] encodée en base64. Pour obtenir la version base64 de votre clé d'API, exécutez la commande suivante :

    ```shell
    echo -n '<Your API key>' | base64
    ```
4. Si vous utilisez le modèle de manifeste `datadog-agent-all-features.yaml` : dans le manifeste `secret-cluster-agent-token.yaml`, remplacez `PUT_A_BASE64_ENCODED_RANDOM_STRING_HERE` par une chaîne aléatoire encodée en base64. Pour obtenir sa version en base64, vous pouvez exécuter :

    ```shell
    echo -n 'Random string' | base64
    ```

    **Remarque** : la chaîne aléatoire doit inclure au moins 32 caractères alphanumériques, afin de sécuriser les communications entre l'Agent de cluster et l'Agent.

5. **Définissez votre site Datadog** sur {{< region-param key="dd_site" code="true" >}} en utilisant la variable d'environnement `DD_SITE` dans le manifeste `datadog-agent.yaml`.

    **Note** : Si la variable d'environnement `DD_SITE` n'est pas explicitement définie, la valeur par défaut est le site `US` `datadoghq.com` . Si vous utilisez l'un des autres sites, vous recevrez un message indiquant que votre clé API n'est pas valide. Utilisez le [sélecteur de site de documentation][20] pour consulter la documentation correspondant au site que vous utilisez.

6. **Déployez le DaemonSet** avec cette commande :

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

7. **Vérification** : pour vérifier que l'Agent Datadog s'exécute dans votre environnement en tant que DaemonSet, exécutez ce qui suit :

    ```shell
    kubectl get daemonset
    ```

     Si l'Agent est déployé, une sortie similaire au texte ci-dessous s'affiche. Les valeurs `DESIRED` et `CURRENT` correspondent au nombre de nœuds exécutés dans votre cluster.

    ```shell
    NAME      DESIRED   CURRENT   READY     UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
    datadog   2         2         2         2            2           <none>          10s
    ```

## Configuration

### Collecte de traces

{{< tabs >}}
{{% tab "TCP" %}}

Pour activer la collecte de traces APM via TCP, ouvrez le fichier de configuration DaemonSet et modifiez les éléments suivants :

- Autorisez la réception de données sur le port `8126` (transmission du trafic du host à l'Agent) dans le conteneur `trace-agent` :
    ```yaml
      # (...)
      containers:
        - name: trace-agent
          # (...)
          ports:
            - containerPort: 8126
              hostPort: 8126
              name: traceport
              protocol: TCP
      # (...)
    ```

- **Si vous utilisez la version 7.17 ou une version antérieure de l'Agent**, en plus des étapes ci-dessus, définissez les variables `DD_APM_NON_LOCAL_TRAFFIC` et `DD_APM_ENABLED` sur `true` dans votre section `env` du manifeste de l'Agent de trace `datadog.yaml` :

  ```yaml
    # (...)
    containers:
      - name: trace-agent
        # (...)
        env:
          - name: DD_APM_ENABLED
            value: 'true'
          - name: DD_APM_NON_LOCAL_TRAFFIC
            value: "true"
          # (...)
  ```

**Attention** : le paramètre `hostPort` ouvre un port sur votre host. Assurez-vous que votre pare-feu accorde uniquement un accès à vos applications ou à d'autres sources de confiance. Si votre plug-in réseau ne prend pas en charge `hostPorts`, ajoutez `hostNetwork: true` aux spécifications de pod de votre Agent afin de partager l'espace de nommage réseau de votre host avec l'Agent Datadog. Cela signifie également que tous les ports ouverts sur le conteneur sont également ouverts sur le host. Si un port est utilisé sur le host et dans votre conteneur, ces derniers peuvent entrer en conflit (puisqu'ils partagent le même espace de nommage réseau), empêchant ainsi le pod de démarrer. Cela n'est pas possible avec certaines installations Kubernetes.


{{% /tab %}}
{{% tab "Socket de domaine Unix (UDS)" %}}

Pour activer la collecte de traces APM via UDS, ouvrez le fichier de configuration DaemonSet et modifiez les éléments suivants :

  ```yaml
    # (...)
    containers:
    - name: trace-agent
      # (...)
      env:
      - name: DD_APM_ENABLED
        value: "true"
      - name: DD_APM_RECEIVER_SOCKET
        value: "/var/run/datadog/apm.socket"
    # (...)
      volumeMounts:
      - name: apmsocket
        mountPath: /var/run/datadog/
    volumes:
    - hostPath:
        path: /var/run/datadog/
        type: DirectoryOrCreate
    # (...)
  ```

Cette configuration crée un répertoire sur le host et le monte dans l'Agent. L'Agent crée ensuite un fichier de socket dans ce répertoire avec la valeur `DD_APM_RECEIVER_SOCKET` de `/var/run/datadog/apm.socket` et effectue une écoute sur ce fichier. Les pods d'application peuvent alors être montés de la même façon sur ce volume et écrire des données sur ce socket.

{{% /tab %}}
{{< /tabs >}}

### Collecte de logs

**Remarque** : cette option n'est pas prise en charge sous Windows. Utilisez plutôt l'option [Helm][22].

Pour activer la collecte de logs avec votre DaemonSet :

1. Définissez les variables `DD_LOGS_ENABLED` et `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` sur true dans la section *env* du manifeste de l'Agent `datadog.yaml` :

    ```yaml
     # (...)
      env:
        # (...)
        - name: DD_LOGS_ENABLED
          value: "true"
        - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
          value: "true"
        - name: DD_CONTAINER_EXCLUDE_LOGS
          value: "name:datadog-agent"
     # (...)
    ```

    **Note** : Le réglage de `DD_CONTAINER_EXCLUDE_LOGS` empêche le Datadog Agent de collecter et d'envoyer ses propres journaux. Supprimez ce paramètre si vous souhaitez collecter les Datadog Agent journaux. Voir la [variable d'environnement pour ignorer les conteneurs][21] pour en savoir plus. Lorsque vous utilisez ImageStreams dans des environnements OpenShift, définissez `DD_CONTAINER_INCLUDE_LOGS` avec le conteneur `name` pour collecter les journaux. Ces deux valeurs de paramètres Exclure/Inclure prennent en charge les expressions régulières.

2. Montez le volume `pointerdir` pour empêcher la perte de logs de conteneur lors des redémarrages ou en cas de problèmes réseau. Montez également `/var/lib/docker/containers` pour recueillir des logs via le fichier de logs Kubernetes, car `/var/log/pods` est un lien symbolique vers ce répertoire :

    ```yaml
      # (...)
        volumeMounts:
          # (...)
          - name: pointerdir
            mountPath: /opt/datadog-agent/run
          - name: logpodpath
           mountPath: /var/log/pods
          # Docker runtime directory, replace this path
          # with your container runtime logs directory,
          # or remove this configuration if `/var/log/pods`
          # is not a symlink to any other directory.
          - name: logcontainerpath
           mountPath: /var/lib/docker/containers
      # (...)
      volumes:
        # (...)
        - hostPath:
            path: /opt/datadog-agent/run
          name: pointerdir
        - hostPath:
            path: /var/log/pods
          name: logpodpath
        # Docker runtime directory, replace this path
        # with your container runtime logs directory,
        # or remove this configuration if `/var/log/pods`
        # is not a symlink to any other directory.
        - hostPath:
            path: /var/lib/docker/containers
          name: logcontainerpath
        # (...)
    ```

    Le `pointerdir` est utilisé pour stocker un fichier avec un pointeur vers tous les conteneurs à partir desquels l'Agent recueille des logs. Ce volume permet de s'assurer qu'aucun log n'est perdu lorsque l'Agent est redémarré ou lors d'un problème réseau.

### Sans privilèges

(Facultatif) Pour exécuter une installation sans privilèges, ajoutez le bloc suivant à votre [modèle de pod][2] :

```yaml
  spec:
    securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <DOCKER_GROUP_ID>
```

`<USER_ID>` correspond à l'UID utilisé pour exécuter l'agent et `<DOCKER_GROUP_ID>` à l'ID du groupe auquel appartient le socket containerd ou docker.

Lorsque l'Agent s'exécute avec un utilisateur non root, il ne peut pas lire directement les fichiers de log contenus dans `/var/lib/docker/containers`. Dans la plupart des cas, il est nécessaire de monter le socket Docker sur le conteneur de l'Agent, afin de pouvoir récupérer les logs du conteneur depuis le daemon Docker.



### Collecte d'événements de l'Agent de cluster

Si vous souhaitez que les événements Kubernetes soient collectés par l'Agent de cluster de Datadog, suivez les étapes suivantes :

1. Désactivez l'élection de leader dans votre Agent de nœud en définissant la variable `leader_election` ou la variable d'environnement `DD_LEADER_ELECTION` sur `false`.

2. Dans le fichier de déploiement de l'Agent de cluster, définissez les variables d'environnement `DD_COLLECT_KUBERNETES_EVENTS` et `DD_LEADER_ELECTION` sur `true` :

      ```yaml
        - name: DD_COLLECT_KUBERNETES_EVENTS
          value: "true"
        - name: DD_LEADER_ELECTION
          value: "true"
      ```

En configurant l'élection de leader conformément aux étapes ci-dessus, vous aurez l'assurance que la collecte des événements est assurée par un seul Agent de cluster.

Pour recueillir les événements Kubernetes avec un Agent de nœud, il est également possible de définir les variables d'environnement `DD_COLLECT_KUBERNETES_EVENTS` et `DD_LEADER_ELECTION` sur `true` dans le manifeste de votre Agent.

```yaml
- name: DD_COLLECT_KUBERNETES_EVENTS
  value: "true"
- name: DD_LEADER_ELECTION
  value: "true"
```

## Variables d'environnement

Voici la liste des variables d'environnement disponibles pour l'Agent Datadog qui utilise un DaemonSet.

### Options globales

| Variable d'environnement         | Rôle                                                                                                                                                                                                                                                                                                                                      |
|----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`         | Votre clé d'API Datadog (**obligatoire**).                                                                                                                                                                                                                                                                                                              |
| `DD_ENV`             | Définit le tag `env` global pour toutes les données émises.                                                                                                                                                                                                                                                                                                  |
| `DD_HOSTNAME`        | Le hostname à utiliser pour les métriques (si la détection automatique échoue).                                                                                                                                                                                                                                                                                             |
| `DD_TAGS`            | Tags de host séparés par des espaces. Exemple : `tag-simple-0 clé-tag-1:valeur-tag-1`.                                                                                                                                                                                                                                                                 |
| `DD_SITE`            | Le site auquel vous transmettez vos métriques, traces et logs. Votre `DD_SITE` est {{< region-param key="dd_site" code="true">}}. Valeur par défaut : `datadoghq.com`.                                                                                                                                                                                               |
| `DD_DD_URL`          | Paramètre facultatif pour remplacer l'URL utilisée pour l'envoi de métriques.                                                                                                                                                                                                                                                                                      |
| `DD_URL` (versions 6.36/7.36 ou ultérieures)            | Alias de `DD_DD_URL`. Ignoré si la valeur `DD_DD_URL` est déjà définie.                                                                                                                                                                                                                                                                                    |
| `DD_CHECK_RUNNERS`   | Par défaut, l'Agent exécute tous les checks simultanément (valeur par défaut : `4` runners). Pour exécuter les checks de manière séquentielle, définissez la valeur sur `1`. Si vous devez exécuter un grand nombre de checks (ou plusieurs checks lents), le composant `collector-queue` peut prendre du retard, ce qui entraîne l'échec potentiel du check de santé. Vous pouvez accroître le nombre de runners pour exécuter davantage de checks en parallèle. |
| `DD_LEADER_ELECTION` | Si vous exécutez plusieurs instances de l'Agent dans votre cluster, définissez cette variable sur `true` pour éviter de recueillir deux fois chaque événement.                                                                                                                                                                                                                         |

### Paramètres de proxy

Depuis la version 6.4.0 de l'Agent (et 6.5.0 de l'Agent de trace), vous pouvez remplacer les paramètres de proxy de l'Agent via les variables d'environnement suivantes :

| Variable d'environnement             | Rôle                                                            |
|--------------------------|------------------------------------------------------------------------|
| `DD_PROXY_HTTP`          | URL HTTP à utiliser comme proxy pour les requêtes `http`.                     |
| `DD_PROXY_HTTPS`         | URL HTTPS à utiliser comme proxy pour les requêtes `https`.                   |
| `DD_PROXY_NO_PROXY`      | Liste d'URL, séparées par des espaces, pour lesquelles aucun proxy ne doit être utilisé.      |
| `DD_SKIP_SSL_VALIDATION` | Option permettant de tester si l'Agent a des difficultés à se connecter à Datadog. |

Pour en savoir plus sur les paramètres de proxy, consultez la [documentation sur les proxys de l'Agent v6][23].



### DogStatsD (métriques custom)

Envoyer des métriques custom avec [le protocole StatsD][24] :

| Variable d'environnement                     | Rôle                                                                                                                                                |
|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` | Effectue une écoute des paquets DogStatsD issus d'autres conteneurs (requis pour envoyer des métriques custom).                                                                       |
| `DD_HISTOGRAM_PERCENTILES`       | Les centiles à calculer pour l'histogramme (séparés par des espaces). Valeur par défaut :  `0.95`.                                                                         |
| `DD_HISTOGRAM_AGGREGATES`        | Les agrégations à calculer pour l'histogramme (séparées par des espaces). Valeur par défaut : `"max median avg count"`.                                                          |
| `DD_DOGSTATSD_SOCKET`            | Le chemin vers le socket Unix à écouter. Doit être dans le volume `rw` monté.                                                                                    |
| `DD_DOGSTATSD_ORIGIN_DETECTION`  | Active la détection des conteneurs et le tagging pour les métriques de socket Unix.                                                                                            |
| `DD_DOGSTATSD_TAGS`              | Les tags supplémentaires à ajouter à l'ensemble des métriques, événements et checks de service reçus par ce serveur DogStatsD. Exemple : `"env:golden group:retrievers"`. |

En savoir plus sur [DogStatsD via les sockets de domaine Unix][25].

### Tags

Datadog recueille automatiquement les tags courants à partir de Kubernetes. Pour extraire des tags supplémentaires, utilisez les options suivantes :

| Variable d'environnement                            | Rôle             |
|-----------------------------------------|-------------------------|
| `DD_KUBERNETES_POD_LABELS_AS_TAGS`      | Permet d'extraire les étiquettes de pod.      |
| `DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS` | Extrait les annotations de pod. |

Consultez la documentation sur l'[extraction de tags Kubernetes][26] pour en savoir plus.

### Ignorer des conteneurs

Vous pouvez exclure des conteneurs de la collecte de logs, de la collecte de métriques et d'Autodiscovery. Par défaut, Datadog exclut les conteneurs `pause` de Kubernetes et d'OpenShift. Ces listes d'inclusion et d'exclusion s'appliquent uniquement à Autodiscovery. Elles n'ont aucun impact sur les traces ni sur DogStatsD. Il est possible d'utiliser des expressions régulières pour les valeurs de ces variables d'environnement.

| Variable d'environnement                   | Rôle                                                                                                                                                                                                                        |
|--------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_CONTAINER_INCLUDE`         | Liste des conteneurs à inclure (séparés par des espaces). Utilisez `.*` pour tous les inclure. Exemple : `"image:nom_image_1 image:nom_image_2"`, `image:.*`.                                                                              |
| `DD_CONTAINER_EXCLUDE`         | Liste des conteneurs à exclure (séparés par des espaces). Utilisez `.*` pour tous les exclure. Exemple : `"image:nom_image_3 image:nom_image_4"`, `image:.*`.                                                                              |
| `DD_CONTAINER_INCLUDE_METRICS` | Liste des conteneurs dont vous souhaitez inclure les métriques.                                                                                                                                                                         |
| `DD_CONTAINER_EXCLUDE_METRICS` | Liste des conteneurs dont vous souhaitez exclure les métriques.                                                                                                                                                                         |
| `DD_CONTAINER_INCLUDE_LOGS`    | Liste des conteneurs dont vous souhaitez inclure les logs.                                                                                                                                                                            |
| `DD_CONTAINER_EXCLUDE_LOGS`    | Liste des conteneurs dont vous souhaitez exclure les logs.                                                                                                                                                                            |
| `DD_AC_INCLUDE`                | **Obsolète**. Liste des conteneurs à inclure (séparés par des espaces). Utilisez `.*` pour tous les inclure. Exemple : `"image:nom_image_1 image:nom_image_2"`, `image:.*`.                                                              |
| `DD_AC_EXCLUDE`                | **Obsolète**. Liste des conteneurs à exclure (séparés par des espaces). Utilisez `.*` pour tous les exclure. Exemple : `"image:nom_image_3 image:nom_image_4"` (cette variable est seulement traitée pour Autodiscovery), `image:.*`. |

Des exemples supplémentaires sont disponibles sur la page [Gestion de la découverte de conteneurs][27].

**Remarque** : ces paramètres n'ont aucun effet sur les métriques `kubernetes.containers.running`, `kubernetes.pods.running`, `docker.containers.running`, `.stopped`, `.running.total` et `.stopped.total`, qui prennent en compte l'ensemble des conteneurs.

### Autodiscovery

| Variable d'environnement                 | Rôle                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_LISTENERS`               | Écouteurs Autodiscovery à exécuter.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `DD_EXTRA_LISTENERS`         | Les écouteurs Autodiscovery supplémentaires à exécuter. Ils s'ajoutent aux variables définies dans la section `listeners` du fichier de configuration `datadog.yaml`.                                                                                                                                                                                                                                                                                                                                    |
| `DD_CONFIG_PROVIDERS`        | Les fournisseurs que l'Agent doit appeler pour collecter les configurations de checks. Les fournisseurs disponibles sont : <br>`kubelet` - Gère les modèles intégrés dans les annotations de pod. <br>`docker` - Gère les modèles intégrés dans les étiquettes de conteneur. <br> `clusterchecks` - Récupère les configurations de checks au niveau du cluster depuis l'Agent de cluster. <br>`kube_services` - Surveille les services Kubernetes pour les checks de cluster. |
| `DD_EXTRA_CONFIG_PROVIDERS`  | Les fournisseurs de configuration Autodiscovery supplémentaires à utiliser. Ils s'ajoutent aux variables définies dans la section `config_providers` du fichier de configuration `datadog.yaml`. |

### Divers

| Variable d'environnement                        | Rôle                                                                                                                                                                                                                                                         |
|-------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_PROCESS_AGENT_CONTAINER_SOURCE` | Remplace la détection automatique de la source de conteneur pour forcer une source unique. Exemple : `"docker"`, `"ecs_fargate"`, `"kubelet"`. Cela n'est plus nécessaire depuis l'Agent v7.35.0.                                                                                                     |
| `DD_HEALTH_PORT`                    | Définissez cette variable sur `5555` pour exposer le check de santé de l'Agent sur le port `5555`.                                                                                                                                                                                                 |
| `DD_CLUSTER_NAME`                   | Définissez un identifiant de cluster Kubernetes personnalisé pour éviter les conflits entre les alias de host. Le nom du cluster peut contenir jusqu'à 40 caractères correspondants à des lettres minuscules, des chiffres et des traits d'union. Il doit également commencer par une lettre et se terminer par un chiffre ou une lettre. |


[1]: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
[2]: /resources/yaml/datadog-agent-all-features.yaml
[3]: /resources/yaml/datadog-agent-windows-all-features.yaml
[4]: /resources/yaml/datadog-agent-logs-apm.yaml
[5]: /resources/yaml/datadog-agent-windows-logs-apm.yaml
[6]: /resources/yaml/datadog-agent-logs.yaml
[7]: /resources/yaml/datadog-agent-windows-logs.yaml
[8]: /resources/yaml/datadog-agent-apm.yaml
[9]: /resources/yaml/datadog-agent-windows-apm.yaml
[10]: /resources/yaml/datadog-agent-npm.yaml
[11]: /resources/yaml/datadog-agent-vanilla.yaml
[12]: /resources/yaml/datadog-agent-windows-vanilla.yaml
[13]: /fr/agent/kubernetes/apm/#setup
[14]: /fr/agent/kubernetes/log/
[15]: /fr/agent/kubernetes/apm/
[16]: /fr/infrastructure/process/?tab=kubernetes#installation
[17]: /fr/network_monitoring/cloud_network_monitoring/setup/
[18]: /fr/data_security/agent/
[19]: https://app.datadoghq.com/organization-settings/api-keys
[20]: /fr/getting_started/site/
[21]: /fr/agent/docker/?tab=standard#ignore-containers
[22]: /fr/containers/kubernetes/log
[23]: /fr/agent/configuration/proxy/#agent-v6
[24]: /fr/developers/dogstatsd/
[25]: /fr/developers/dogstatsd/unix_socket/
[26]: /fr/containers/kubernetes/tag/
[27]: /fr/agent/guide/autodiscovery-management/