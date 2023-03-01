---
further_reading:
- link: /infrastructure/hostmap/
  tag: Documentation
  text: Visualisez tous vos hosts sur un seul écran avec la hostmap
- link: /infrastructure/process/
  tag: Documentation
  text: Découvrir ce qui se passe à tous les niveaux de votre système
kind: documentation
title: Configuration des live containers
---



### Ressources Kubernetes

L'Agent Datadog et l'Agent de cluster peuvent être configurés afin de récupérer des ressources Kubernetes pour des [live containers][1]. Une telle configuration vous permet de surveiller l'état de vos pods, déploiements et autres entités Kubernetes dans un espace de nommage ou une zone de disponibilité spécifique. Cela vous permet également de consulter les spécifications de ressources pour les échecs de pods d'un déploiement ou encore de mettre en corrélation l'activité d'un nœud avec les logs associés.

La récupération des ressources Kubernetes pour les live containers requiert au minimum la **version 7.27.0 de l'Agent** et la **version 1.11.0 de l'Agent de cluster**. Pour les versions antérieures de l'Agent Datadog et de l'Agent de cluster, consultez la section [Configuration des live containers pour les anciennes versions des Agents][4].

Remarque : pour Kubernetes 1.25 et les versions ultérieures, la version minimale requise de l'Agent de cluster est la 7.40.0.

{{< tabs >}}
{{% tab "Helm" %}}

Si vous utilisez le [chart Helm Datadog][1] officiel :

- Utilisez au minimum la version 2.10.0 du chart. Assurez-vous que les versions de l'Agent et de l'Agent de cluster sont codées en dur, avec les versions minimales requises, dans le fichier [values.yaml][3] de votre chart Helm.
- Activez l'Agent de processus. Pour ce faire, modifiez le fichier `datadog-values.yaml` afin d'inclure ce qui suit :

    ```yaml
    datadog:
        # (...)
        processAgent:
            enabled: true
    ```

- Déployez une nouvelle version.

Dans certaines configurations, il arrive que l'Agent de processus et l'Agent de cluster ne parviennent pas à détecter automatiquement un nom de cluster Kubernetes. Lorsque c'est le cas, la fonctionnalité ne démarre pas et l'avertissement suivant s'affiche dans le log de l'Agent de cluster : `Orchestrator explorer enabled but no cluster name set: disabling`. Vous devez alors définir `datadog.clusterName` sur le nom de votre cluster dans [values.yaml][2].

[1]: https://github.com/DataDog/helm-charts
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "DaemonSet" %}}

La version 1.11.0 ou une version ultérieure de l'[Agent de cluster][1] est requise pour commencer la configuration du DaemonSet. L'Agent de cluster doit être en cours d'exécution et l'Agent doit pouvoir communiquer avec celui-ci. Consultez la section [Configuration de l'Agent de cluster][2] pour en savoir plus.

1. Définissez le conteneur de l'Agent de cluster à l'aide de la variable d'environnement suivante :

    ```yaml
      - name: DD_ORCHESTRATOR_EXPLORER_ENABLED
        value: "true"
    ```

2. Définissez le ClusterRole de l'Agent de cluster à l'aide des autorisations RBAC suivantes.

    Notez bien que pour les apiGroups `apps` et `batch`, les live containers
    ont besoin d'autorisations pour recueillir des ressources Kubernetes de base (`pods`, `services`,
    `nodes`, etc.). Elles devraient déjà se trouver dans le RBAC si vous avez suivi la [documentation
    relative à la configuration de l'Agent de cluster][2]. Si elles sont absentes, prenez soin de les
    ajouter (après `deployments`, `replicasets`) :

    ```yaml
      ClusterRole:
      - apiGroups:  # To create the datadog-cluster-id ConfigMap
        - ""
        resources:
        - configmaps
        verbs:
        - create
        - get
        - update
      ...
      - apiGroups:  # Required to get the kube-system namespace UID and generate a cluster ID
        - ""
        resources:
        - namespaces
        verbs:
        - get
      ...
      - apiGroups:  # To collect new resource types
        - "apps"
        resources:
        - deployments
        - replicasets
        - daemonsets
        - statefulsets
        verbs:
        - list
        - get
        - watch
      - apiGroups:
        - "batch"
        resources:
        - cronjobs
        - jobs
        verbs:
        - list
        - get
        - watch
      - apiGroups:
       - networking.k8s.io
       resources:
       - ingresses
       verbs:
       - list
       - watch
      ...
    ```

    Ces autorisations sont requises pour créer une ConfigMap `datadog-cluster-id` dans le même espace de nommage que le DaemonSet de l'Agent et le déploiement de l'Agent de cluster, mais également pour recueillir les ressources Kubernetes prises en charge.

    Si la ConfigMap `cluster-id` n'est pas créée par l'Agent de cluster, le pod de l'Agent ne peut pas recueillir de ressources. Pour y remédier, modifiez les autorisations de l'Agent de cluster et redémarrez son pod afin qu'il puisse créer la ConfigMap, puis redémarrez le pod de l'Agent.

3. L'Agent de processus, qui s'exécute dans le DaemonSet de l'Agent, doit être activé et en cours d'exécution. La collecte de processus ne doit pas forcément être en cours. Les options suivantes doivent également être configurées :

    ```yaml
    - name: DD_ORCHESTRATOR_EXPLORER_ENABLED
      value: "true"
    ```

Dans certaines configurations, il arrive que l'Agent de processus et l'Agent de cluster ne parviennent pas à détecter automatiquement un nom de cluster Kubernetes. Lorsque c'est le cas, la fonctionnalité ne démarre pas et l'avertissement suivant s'affiche dans le log de l'Agent de cluster : `Orchestrator explorer enabled but no cluster name set: disabling`. Ajoutez alors les options suivantes dans la section `env` de l'Agent de cluster et de l'Agent de processus :

  ```yaml
  - name: DD_CLUSTER_NAME
    value: "<NOM_CLUSTER>"
  ```

{{% /tab %}}
{{< /tabs >}}

### Matrice de compatibilité de la collecte de ressources

Le tableau suivant présente la liste des ressources recueillies et les versions minimales de l'Agent, de l'Agent de cluster et du chart Helm requises pour la collecte.

| Ressource | Version minimale de l'Agent | Version minimale de l'Agent de cluster* | Version minimale du chart Helm |
|---|---|---|---|
| ClusterRoleBindings | 7.27.0 | 1.19.0 | 2.30.9 |
| ClusterRoles | 7.27.0 | 1.19.0 | 2.30.9 |
| Clusters | 7.27.0 | 1.12.0 | 2.10.0 |
| CronJobs | 7.27.0 | 1.13.1 | 2.15.5 |
| DaemonSets | 7.27.0 | 1.14.0 | 2.16.3 |
| Déploiements | 7.27.0 | 1.11.0 | 2.10.0 |
| Ingresses | 7.27.0 | 1.22.0 | 2.30.7 |
| Tâches | 7.27.0 | 1.13.1 | 2.15.5 |
| Nœuds | 7.27.0 | 1.11.0 | 2.10.0 |
| PersistentVolumes | 7.27.0 | 1.18.0 | 2.30.4 |
| PersistentVolumeClaims | 7.27.0 | 1.18.0 | 2.30.4 |
| Pods | 7.27.0 | 1.11.0 | 2.10.0 |
| ReplicaSets | 7.27.0 | 1.11.0 | 2.10.0 |
| RoleBindings | 7.27.0 | 1.19.0 | 2.30.9 |
| Roles | 7.27.0 | 1.19.0 | 2.30.9 |
| ServiceAccounts | 7.27.0 | 1.19.0 | 2.30.9 |
| Services | 7.27.0 | 1.11.0 | 2.10.0 |
| Statefulsets | 7.27.0 | 1.15.0 | 2.20.1 |

**Remarque** : pour Kubernetes 1.25 et les versions ultérieures, la version minimale requise de l'Agent de cluster est la 7.40.0.

### Ajouter des tags personnalisés aux ressources

Vous pouvez ajouter des tags personnalisés aux ressources Kubernetes afin de faciliter le filtrage de la vue des ressources Kubernetes.

Des tags supplémentaires sont ajoutés via la variable d'environnement `DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS`.

**Remarque** : ces tags s'affichent uniquement dans la vue des ressources Kubernetes.

{{< tabs >}}
{{% tab "Helm" %}}

Si vous utilisez le chart Helm officiel, ajoutez la variable d'environnement à l'Agent de processus et à l'Agent de cluster en définissant `agents.containers.processAgent.env` et `clusterAgent.env` dans [values.yaml][1].

```yaml
  agents:
    containers:
      processAgent:
        env:
          - name: "DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS"
            value: "tag1:value1 tag2:value2"
  clusterAgent:
    env:
      - name: "DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS"
        value: "tag1:value1 tag2:value2"
```

Déployez ensuite une nouvelle version.

{{% /tab %}}
{{% tab "DaemonSet" %}}

Définissez la variable d'environnement sur les conteneurs de l'Agent de processus et de l'Agent de cluster :

```yaml
- name: DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS
  value: "tag1:value1 tag2:value2"
```

{{% /tab %}}
{{< /tabs >}}

### Inclure ou exclure des conteneurs

Il est possible d'inclure et/ou d'exclure des conteneurs pour la collecte en temps réel :

- Pour exclure des conteneurs, passez la variable d'environnement `DD_CONTAINER_EXCLUDE` ou ajoutez `container_exclude:` dans le fichier de configuration principal `datadog.yaml`.
- Pour inclure des conteneurs, passez la variable d'environnement `DD_CONTAINER_INCLUDE` ou ajoutez `container_include:` dans le fichier de configuration principal `datadog.yaml`.

Ces deux arguments ont pour valeur un **nom d'image**. Les expressions régulières sont également prises en charge.

Par exemple, pour exclure toutes les images Debian à l'exception des conteneurs dont le nom commence par *frontend*, ajoutez les deux lignes de configuration suivantes dans votre fichier `datadog.yaml` :

```shell
container_exclude: ["image:debian"]
container_include: ["name:frontend.*"]
```

**Remarque** : pour la version 5 de l'Agent, au lieu d'ajouter les lignes ci-dessus dans le fichier de configuration principal `datadog.conf`, ajoutez explicitement un fichier `datadog.yaml` dans `/etc/datadog-agent/`. En effet, l'Agent de processus exige que toutes les options de configuration se trouvent à cet emplacement. Cette configuration exclut uniquement les conteneurs de la collecte en temps réel, et **non** de la fonction Autodiscovery.

### Nettoyage d'informations sensibles

Pour éviter toute fuite de données sensibles, vous pouvez nettoyer des termes sensibles dans les fichiers YAML des conteneurs. Le nettoyage de conteneur est activé par défaut pour les charts Helm. Plusieurs termes sensibles sont fournis par défaut :

- `password`
- `passwd`
- `mysql_pwd`
- `access_token`
- `auth_token`
- `api_key`
- `apikey`
- `pwd`
- `secret`
- `credentials`
- `stripetoken`

Vous pouvez définir des termes sensibles supplémentaires en fournissant une liste de termes via la variable d'environnement `DD_ORCHESTRATOR_EXPLORER_CUSTOM_SENSITIVE_WORDS`. Ces termes viennent s'ajouter aux termes par défaut et ne les écrasent pas.

**Remarque** : les termes sensibles supplémentaires ne doivent pas inclure de majuscules, car l'Agent compare le texte au pattern en minuscules. Cela signifie que le terme `password` remplace `MY_PASSWORD` par `MY_*******`, tandis que le terme `PASSWORD` ne nettoie aucune donnée.

Vous devez configurer cette variable d'environnement pour les Agents suivants :

- process-agent
- cluster-agent

```yaml
env:
    - name: DD_ORCHESTRATOR_EXPLORER_CUSTOM_SENSITIVE_WORDS
      value: "customword1 customword2 customword3"
```

Par exemple, puisque `password` est un terme sensible, la fonctionnalité de nettoyage remplace toutes les occurrences de `<MY_PASSWORD>` ci-dessous par la chaîne d'astérisques `***********` :

```shell
password <MY_PASSWORD>
password=<MY_PASSWORD>
password: <MY_PASSWORD>
password::::== <MY_PASSWORD>
```

Les chemins contenant des termes sensibles ne sont toutefois pas modifiés. Par exemple, le chemin `/etc/vaultd/secret/haproxy-crt.pem` n'est pas remplacé par `/etc/vaultd/******/haproxy-crt.pem`, même si `secret` est un terme sensible.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[4]: /fr/infrastructure/livecontainers/legacy