---
title: Collecte de logs Kubernetes
kind: documentation
further_reading:
  - link: /agent/kubernetes/apm/
    tag: Documentation
    text: Recueillir les traces de vos applications
  - link: /agent/kubernetes/prometheus/
    tag: Documentation
    text: Recueillir vos métriques Prometheus
  - link: /agent/kubernetes/integrations/
    tag: Documentation
    text: Recueillir automatiquement les métriques et les logs de vos applications
  - link: /agent/guide/autodiscovery-management/
    tag: Documentation
    text: Limiter la collecte de données à un seul sous-ensemble de conteneurs
  - link: /agent/kubernetes/tag/
    tag: Documentation
    text: Attribuer des tags à toutes les données émises par un conteneur
---
L'Agent peut collecter les logs de deux façons : depuis le [socket Docker][1] et depuis les [fichiers de logs Kubernetes](#collecte-logs) (automatiquement gérés par Kubernetes). Datadog recommande d'utiliser la logique des fichiers de logs Kubernetes lorsque :

* Docker n'est pas le runtime, **ou**
* Plus de 10 conteneurs sont utilisés au sein de chaque nœud

L'API Docker est optimisée pour obtenir les logs d'un conteneur à la fois. Lorsqu'un pod contient un grand nombre de conteneurs, la collecte de logs via le socket Docker peut solliciter davantage de ressources qu'en passant par les fichiers de logs Kubernetes.

## Collecte de logs

Pour commencer à recueillir les logs de votre application, vous devez [exécuter l'Agent Datadog dans votre cluster Kubernetes][2]. Pour activer la collecte de logs avec l'Agent, suivez les instructions ci-dessous :

{{< tabs >}}
{{% tab "DaemonSet " %}}

**Remarque** : cette option n'est pas prise en charge sous Windows. Dans ce cas, utilisez plutôt l'option Helm.

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
        - name: DD_CONTAINER_EXCLUDE
          value: "name:datadog-agent"
     # (...)
    ```

    **Remarque** : définissez `DD_CONTAINER_EXCLUDE` pour empêcher l'Agent Datadog de recueillir et d'envoyer ses propres logs. Supprimez ce paramètre si vous souhaitez recueillir les logs de l'Agent Datadog. Pour en savoir plus, consultez [Gestion de la découverte de conteneurs][1]. Lorsque vous utilisez ImageStreams au sein d'environnements OpenShift, définissez `DD_CONTAINER_INCLUDE` avec le `name` du conteneur pour recueillir des logs. Ces deux paramètres Exclude/Include prennent en charge les expressions régulières.

2. Montez le volume `pointdir` pour empêcher la perte de logs de conteneurs lors des redémarrages ou en en cas de problèmes réseau. Montez également `/var/lib/docker/containers` pour recueillir des logs via le fichier de logs Kubernetes, car `/var/log/pods` est un lien symbolique vers ce répertoire :

    ```yaml
      # (...)
        volumeMounts:
        #  (...)
          - name: pointdir
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
          name: pointdir
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

   Le `pointdir` est utilisé pour stocker un fichier avec un pointeur vers tous les conteneurs à partir desquels l'Agent recueille des logs. Ce volume permet de s'assurer qu'aucun log n'est perdu lorsque l'Agent est redémarré ou lors d'un problème réseau.

### Sans privilèges

(Facultatif) Pour exécuter une installation sans privilèges, ajoutez le bloc suivant à votre [modèle de pod][2] :

```yaml
  spec:
    securityContext:
      runAsUser: <ID_UTILISATEUR>
      supplementalGroups:
        - <ID_GROUPE_DOCKER>
```

`<USER_ID>` est l'UID pour exécuter l'agent et `<DOCKER_GROUP_ID>` est l'ID du groupe auquel appartient le docker ou le socket containerd.

Lorsque l'Agent s'exécute avec un utilisateur non root, il ne peut pas lire directement les fichiers de log contenus dans `/var/lib/docker/containers`. Dans la plupart des cas, il est nécessaire de monter le socket Docker sur le conteneur de l'Agent, afin de pouvoir récupérer les logs du conteneur depuis le daemon Docker.

[1]: /fr/agent/guide/autodiscovery-management/
{{% /tab %}}
{{% tab "Helm" %}}

Pour activer la collecte de logs avec Helm, mettez à jour votre fichier [datadog-values.yaml][1] avec la configuration de collecte de logs suivante, puis mettez à niveau votre chart Helm Datadog :

```yaml
datadog:
  ## @param logs - objet - obligatoire
  ## Activer l'Agent de logs et spécifier des paramètres personnalisés.
  #
  logs:
    ## @param enabled - booléen - facultatif - valeur par défaut : false
    ## Activez ce paramètre pour activer la collecte de logs par l'Agent Datadog.
    #
    enabled: true

    ## @param containerCollectAll - booléen - facultatif - valeur par défaut : false
    ## Activez ce paramètre pour autoriser la collecte de logs pour tous les conteneurs.
    #
    containerCollectAll: true
```

### Sans privilèges

(Facultatif) Pour exécuter une installation sans privilèges, ajoutez le bloc suivant au fichier `values.yaml` :

```yaml
datadog:
  securityContext:
      runAsUser: <ID_UTILISATEUR>
      supplementalGroups:
        - <ID_GROUPE_DOCKER>
```

`<USER_ID>` est l'UID pour exécuter l'agent et `<DOCKER_GROUP_ID>` est l'ID du groupe auquel appartient le docker ou le socket containerd.

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Operator" %}}

Mettez à jour votre manifeste `datadog-agent.yaml` comme suit :

```
agent:
  image:
    name: "gcr.io/datadoghq/agent:latest"
  log:
    enabled: true
```

Consultez l'[exemple de manifeste avec activation de la collecte des métriques et des logs][1] pour un exemple complet.

Ensuite, appliquez la nouvelle configuration :

```shell
$ kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

## Sans privilèges

(Facultatif) Pour exécuter une installation sans privilèges, ajoutez le bloc suivant au [CR Datadog][8] :

```yaml
agent:
  config:
    securityContext:
      runAsUser: <ID_UTILISATEUR>
      supplementalGroups:
        - <ID_GROUPE_DOCKER>
```

`<USER_ID>` est l'UID pour exécuter l'agent et `<DOCKER_GROUP_ID>` est l'ID du groupe auquel appartient le docker ou le socket containerd.

[1]: https://github.com/DataDog/datadog-operator/blob/master/examples/datadog-agent-logs.yaml
{{% /tab %}}
{{< /tabs >}}

**Attention **: si vous exécutez une installation sans privilèges, l'Agent doit pouvoir lire les fichiers de log dans `/var/log/pods`.
Avec `containerd`, les fichiers de log qui sont dans `/var/log/pods` peuvent être lus par les membres du groupe `root`. Si vous avez suivi les instructions ci-dessus, l'Agent s'exécute avec le groupe `root`. Il peut donc lire les fichiers.
Avec `docker`, les fichiers de log qui sont dans `/var/log/pods` correspondent à des liens symboliques vers `/var/lib/docker/containers` qui sont seulement accessibles par l'utilisateur `root`. Ainsi, pour `docker`, seul un Agent `root` peut lire les logs des pods dans `/var/log/pods`. Le socket Docker doit être monté sur le conteneur de l'Agent afin de pouvoir récupérer les logs des pods via le daemon Docker.

Remarque : si vous souhaitez recueillir les logs à partir de `/var/log/pods` même lorsque le socket Docker est monté, vous pouvez définir la variable d'environnement `DD_LOGS_CONFIG_K8S_CONTAINER_USE_FILE` (ou `logs_config.k8s_container_use_file` dans `datadog.yaml`) sur `true` pour forcer l'Agent à passer par les fichiers.

## Autodiscovery

Autodiscovery vous permet d'appliquer une configuration de logs d'intégration Datadog lors de l'exécution d'un check de l'Agent sur un conteneur donné. Pour obtenir davantage de contexte sur cette logique, découvrez comment [configurer les intégrations de l'Agent][1] lorsque l'Agent est exécuté sur un host.

Utilisez les paramètres suivants afin de configurer une intégration avec Autodiscovery :

| Paramètre            | Obligatoire | Description                                                                                       |
|----------------------|----------|---------------------------------------------------------------------------------------------------|
| `<CONFIG_LOG>`       | Non       | À partir de l'Agent v6.5+, la configuration de la section `logs:` pour l'intégration Datadog-`<NOM_INTÉGRATION>` donnée. |

[**Découvrez la liste complète des intégrations de l'Agent compatibles avec Autodiscovery ainsi que des exemples pour ces paramètres**][3]

Chaque onglet des sections ci-dessous présente une façon différente d'appliquer des modèles d'intégration à un conteneur donné. Vous pouvez utiliser les éléments suivants :

* [Annotations de pod Kubernetes](?tab=kubernetes#configuration)
* [ConfigMap](?tab=configmap#configuration)
* [Des stockages key/value](?tab=keyvaluestore#configuration)

### Configuration

**Remarque **: lorsque vous configurez la valeur `service` via des annotations de pod, Datadog vous conseille d'utiliser le tagging de service unifié. Le tagging de service unifié permet de lier toutes les données de télémétrie Datadog entre elles, y compris les logs, via trois tags standards : `env`, `service` et `version`. Pour découvrir comment configurer le tagging unifié pour votre environnement, consultez la documentation dédiée au [tagging de service unifié][4].

{{< tabs >}}
{{% tab "Kubernetes" %}}

Les modèles d'intégration peuvent être stockés dans vos annotations de pod Kubernetes. Lorsque Autodiscovery est activé, l'Agent détecte s'il est exécuté sur Kubernetes et examine alors automatiquement toutes les annotations de pod à la recherche de modèles d'intégration.

Pour appliquer une configuration spécifique à un conteneur donné, Autodiscovery identifie les conteneurs via leur **nom**, et non via leur image. II cherche à faire correspondre `<IDENTIFICATEUR_CONTENEUR>` à `.spec.containers[0].name`, et non à `.spec.containers[0].image`. Pour configurer Autodiscovery pour une intégration Datadog sur un `<IDENTIFICATEUR_CONTENEUR>` donné dans votre pod, ajoutez les annotations suivantes à votre pod :

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<NOM_POD>'
  annotations:
    ad.datadoghq.com/<IDENTIFICATEUR_CONTENEUR>.logs: '[<CONFIG_LOG>]'
    # (...)
spec:
  containers:
    - name: '<IDENTIFICATEUR_CONTENEUR>'
# (...)
```

Pour appliquer deux modèles d'intégration différents à deux conteneurs différents dans votre pod, `<IDENTIFICATEUR_CONTENEUR_1>` et `<IDENTIFICATEUR_CONTENEUR_2>`, ajoutez les annotations suivantes à votre pod :

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<NOM_POD>'
  annotations:
    ad.datadoghq.com/<IDENTIFICATEUR_CONTENEUR_1>.logs: '[<CONFIG_LOG_1>]'
    # (...)
    ad.datadoghq.com/<IDENTIFICATEUR_CONTENEUR_2>.logs: '[<CONFIG_LOG_2>]'
spec:
  containers:
    - name: '<IDENTIFICATEUR_CONTENEUR_1>'
    # (...)
    - name: '<IDENTIFICATEUR_CONTENEUR_2>'
# (...)
```

Remarque : si vous définissez directement vos pods Kubernetes (avec `kind: Pod`), ajoutez les annotations de chaque pod directement dans sa section `metadata`. Si vous définissez indirectement les pods avec des ReplicationControllers, des ReplicaSets ou des Deployments, ajoutez les annotations de pod dans `.spec.template.metadata`.

{{% /tab %}}
{{% tab "Fichier" %}}

Vous pouvez stocker des modèles en tant que fichiers locaux et les monter dans l'Agent conteneurisé. Cela ne nécessite aucun service externe ni aucune plateforme d'orchestration spécifique. Vous devrez cependant redémarrer les conteneurs de votre Agent à chaque fois qu'un modèle est modifié, ajouté ou supprimé. L'Agent recherche les modèles Autodiscovery dans le répertoire `/conf.d` monté.

À partir de la version 6.2.0 (et 5.24.0) de l'Agent, les modèles par défaut utilisent le port par défaut pour le logiciel surveillé au lieu de le détecter automatiquement. Si vous devez utiliser un port différent, spécifiez un modèle Autodiscovery personnalisé dans les [étiquettes de conteneur Docker](?tab=etiquettes-docker) ou dans les [annotations de pod Kubernetes](?tab=annotations-kubernetes).

Ces modèles d'intégration peuvent convenir dans les cas simples. Toutefois, si vous avez besoin de personnaliser les configurations de votre intégration Datadog (par exemple pour activer des options supplémentaires, pour faire appel à des identificateurs de conteneur différents ou pour utiliser les index de template variables), vous devez écrire vos propres fichiers de configuration automatique :

1. Créez un fichier `conf.d/<NOM_INTÉGRATION>.d/conf.yaml` sur votre host et ajoutez votre configuration automatique personnalisée.
2. Montez le répertoire `conf.d/` de votre host dans le répertoire `conf.d/` de l'Agent conteneurisé.

**Exemple de fichier de configuration automatique** :

```text
ad_identifiers:
  <IDENTIFICATEUR_AUTODISCOVERY_INTÉGRATION>

logs:
  <CONFIG_LOGS>
```

Consultez la documentation sur [les identificateurs de conteneur Autodiscovery][1] pour obtenir des informations sur `<IDENTIFICATEUR_INTÉGRATION_AUTODISCOVERY>`.

**Remarque** : vous n'avez pas à configurer `<NOM_INTÉGRATION>` ici, car l'Agent le récupère directement à partir du nom du fichier.

[1]: /fr/agent/guide/ad_identifiers/
{{% /tab %}}
{{% tab "ConfigMap" %}}

Kubernetes vous permet d'utiliser des [ConfigMaps][1]. Pour en savoir plus, consultez le modèle ci-dessous et la documentation relative aux [intégrations personnalisées Kubernetes][2].

```text
kind: ConfigMap
apiVersion: v1
metadata:
  name: "<NOM>-config-map"
  namespace: default
data:
  <NOM_INTÉGRATION>-config: |-
    ad_identifiers:
      <IDENTIFICATEUR_AUTODISCOVERY_INTÉGRATION>
    logs:
      <CONFIG_LOGS>
```

Consultez la documentation sur [les identificateurs de conteneur Autodiscovery][3] pour obtenir des informations sur `<IDENTIFICATEUR_INTÉGRATION_AUTODISCOVERY>`.

[1]: /fr/agent/kubernetes/integrations/#configmap
[2]: /fr/agent/kubernetes/integrations/
[3]: /fr/agent/guide/ad_identifiers/
{{% /tab %}}
{{% tab "Stockage clé-valeur" %}}

Autodiscovery peut utiliser [Consul][1], Etcd et Zookeeper comme sources de modèle d'intégration. Pour utiliser un stockage clé-valeur, vous devez le configurer dans le fichier de configuration `datadog.yaml` de l'Agent et monter ce fichier dans l'agent conteneurisé. Vous pouvez également transmettre votre stockage clé-valeur comme variables d'environnement à l'Agent conteneurisé.

**Configuration dans datadog.yaml** :

Dans le fichier `datadog.yaml`, définissez l'adresse `<IP_STOCKAGE_CLÉ_VALEUR>` et le `<PORT_STOCKAGE_CLÉ_VALEUR>` de votre stockage clé-valeur :

  ```yaml
  config_providers:
    - name: etcd
      polling: true
      template_dir: /datadog/check_configs
      template_url: '<IP_STOCKAGE_CLÉVALEUR>:<PORT_STOCKAGE_CLÉVALEUR>'
      username:
      password:

    - name: consul
      polling: true
      template_dir: datadog/check_configs
      template_url: '<IP_STOCKAGE_CLÉVALEUR>:<PORT_STOCKAGE_CLÉVALEUR>'
      ca_file:
      ca_path:
      cert_file:
      key_file:
      username:
      password:
      token:

    - name: zookeeper
      polling: true
      template_dir: /datadog/check_configs
      template_url: '<IP_STOCKAGE_CLÉVALEUR>:<PORT_STOCKAGE_CLÉVALEUR>'
      username:
      password:
  ```

[Redémarrez ensuite l'Agent][2] pour prendre en compte le changement de configuration.

**Configuration dans les variables d'environnement** :

Lorsque le stockage clé-valeur est activé en tant que source de modèle, l'Agent recherche des modèles à partir de la clé `/datadog/check_configs`. Autodiscovery s'attend à une hiérarchie clé-valeur comme suit :

```yaml
/datadog/
  check_configs/
    <IDENTIFICATEUR_CONTENEUR>/
      - logs: ["<CONFIG_LOGS>"]
    ...
```

**Remarque** : pour appliquer une configuration spécifique à un conteneur donné, Autodiscovery identifie les conteneurs par **image** en cas d'utilisation de stockages clé-valeur. En d'autres termes, il cherche à faire correspondre `<IDENTIFICATEUR_CONTENEUR>` à `.spec.containers[0].image`.

[1]: /fr/integrations/consul/
[2]: /fr/agent/guide/agent-commands/
{{% /tab %}}
{{< /tabs >}}

### Exemples - Intégration Datadog/Redis

{{< tabs >}}
{{% tab "Kubernetes" %}}

L'annotation de pod suivante définit le modèle d'intégration pour les conteneurs `redis` avec un paramètre `password` personnalisé, puis tague tous ses logs avec les attributs `source` et `service` adéquats :

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: redis
  annotations:
    ad.datadoghq.com/redis.logs: '[{"source":"redis","service":"redis"}]'
  labels:
    name: redis
spec:
  containers:
    - name: redis
      image: redis:latest
      ports:
        - containerPort: 6379
```

{{% /tab %}}
{{% tab "ConfigMap" %}}

La ConfigMap suivante définit le modèle d'intégration pour les conteneurs `redis` avec les attributs `source` et `service` pour la collecte des logs :

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: redisdb-config-map
  namespace: default
data:
  redisdb-config: |-
    ad_identifiers:
      - redis
      - redis-test
    logs:
      source: redis
      service: redis
```

Dans le manifeste, définissez les paramètres `volumeMounts` et `volumes` :

```yaml
# [...]
        volumeMounts:
        # [...]
          - name: redisdb-config-map
            mountPath: /conf.d/redisdb.d
        # [...]
      volumes:
      # [...]
        - name: redisdb-config-map
          configMap:
            name: redisdb-config-map
            items:
              - key: redisdb-config
                path: conf.yaml
# [...]
```

{{% /tab %}}
{{% tab "Stockage clé-valeur" %}}

Les commandes etcd suivantes créent un modèle d'intégration Redis avec un paramètre `password` personnalisé et taguent tous ses logs avec les attributs `source` et `service` adéquats :

```conf
etcdctl mkdir /datadog/check_configs/redis
etcdctl set /datadog/check_configs/redis/logs '[{"source": "redis", "service": "redis"}]'
```

Notez que chacune des trois valeurs est une liste. Autodiscovery assemble les éléments de liste en fonction des index de liste partagée de manière à générer la configuration de l'intégration. Dans le cas présent, il assemble la première (et unique) configuration de check à partir de `check_names[0]`, `init_configs[0]` et `instances[0]`.

Contrairement aux fichiers de configuration automatique, **les stockages clé-valeur peuvent utiliser la version courte OU la version longue du nom d'image comme identificateur de conteneur**, p. ex. `redis` OU `redis:latest`.

{{% /tab %}}
{{< /tabs >}}


## Collecte de logs avancée

Utilisez des étiquettes de log Autodiscovery afin d'appliquer une logique de traitement avancée pour la collecte de logs. Par exemple :

* [Filtrer les logs avant de les envoyer à Datadog][5].
* [Nettoyer les données sensibles de vos logs][6].
* [Effectuer une agrégation multiligne][7].

## Filtrer les conteneurs

Il est possible de spécifier les conteneurs à partir desquels vous souhaitez recueillir les logs. Ce filtrage peut vous servir à empêcher la collecte des logs de l'Agent Datadog. Consultez [Gestion de la découverte de conteneurs][8] pour en savoir plus.

## Conteneurs de courte durée

Par défaut, l'Agent recherche de nouveaux conteneurs toutes les 5 secondes.

Si vous utilisez l'Agent v6.12+, les logs de conteneurs de courte durée (en raison d'une interruption ou d'un crash) sont automatiquement recueillis à partir des fichiers Kubernetes (via `/var/log/pods`). Les logs des conteneurs d'initialisation sont eux aussi recueillis.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/faq/log-collection-with-docker-socket/
[2]: /fr/agent/kubernetes/
[3]: /fr/integrations/#cat-autodiscovery
[4]: /fr/getting_started/tagging/unified_service_tagging
[5]: /fr/agent/logs/advanced_log_collection/?tab=kubernetes#filter-logs
[6]: /fr/agent/logs/advanced_log_collection/?tab=kubernetes#scrub-sensitive-data-from-your-logs
[7]: /fr/agent/logs/advanced_log_collection/?tab=kubernetes#multi-line-aggregation
[8]: /fr/agent/guide/autodiscovery-management/