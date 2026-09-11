---
aliases:
- /fr/agent/kubernetes/log
description: Configurez la collecte de logs à partir d'applications conteneurisées
  exécutées sur Kubernetes à l'aide du Datadog Agent
further_reading:
- link: https://www.datadoghq.com/blog/eks-fargate-logs-datadog
  tag: Blog
  text: Surveillez les logs d'Amazon EKS sur Fargate avec Datadog
- link: /agent/kubernetes/apm/
  tag: Documentation
  text: Recueillir les traces de votre application
- link: /agent/kubernetes/prometheus/
  tag: Documentation
  text: Recueillez vos métriques Prometheus
- link: /agent/kubernetes/integrations/
  tag: Documentation
  text: Recueillez automatiquement les métriques et les logs de vos applications
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Limitez la collecte de données à un sous-ensemble de conteneurs
- link: /agent/kubernetes/tag/
  tag: Documentation
  text: Attribuez des tags à toutes les données envoyées par un conteneur
- link: /containers/troubleshooting/log-collection
  tag: Documentation
  text: Dépannage de la collecte de logs de conteneurs
- link: https://www.datadoghq.com/architecture/monitoring-container-apps-logs/
  tag: Centre d'architecture
  text: Surveillance des applications de conteneurs - Logs
title: Collecte de logs Kubernetes
---
Cette page explique comment collecter des logs à partir des fichiers de logs Kubernetes.

Lorsque vos applications conteneurisées écrivent leurs logs dans la sortie standard et l'erreur standard (`stdout`/`stderr`), le container runtime et Kubernetes gèrent automatiquement les logs pour vous. Le modèle par défaut est que [Kubernetes stocke ces flux de logs sous forme de fichiers][13] sur le host dans le dossier `/var/log/pods` et les sous-dossiers pour chaque Pod et conteneur.

Le Datadog Agent peut collecter ces fichiers de logs Kubernetes pour ces conteneurs en suivant les instructions ci-dessous. Cette option s'adapte bien à la nature éphémère des Pods créés par Kubernetes et est plus efficace en termes de ressources que la collecte de logs à partir du socket Docker. Datadog recommande cette méthode pour la collecte de logs dans Kubernetes.

Alternativement, le Datadog Agent peut également collecter des logs en effectuant des requêtes répétées à l'API Docker via le socket Docker. Cependant, cela nécessite Docker comme conteneur runtime pour votre cluster Kubernetes. Cela est également plus gourmand en ressources que l'utilisation de fichiers de logs. Pour savoir comment collecter des logs à l'aide du socket Docker, consultez [Collecte de logs avec le socket Docker][1]. Si vos applications conteneurisées écrivent dans des fichiers de logs stockés dans le conteneur, cela peut compliquer la collecte de logs. Consultez [collecte de logs à partir d'un fichier](#from-a-container-local-log-file).

## Configuration {#setup}

### Collecte de logs {#log-collection}

Avant de commencer la collecte des logs d'application, assurez-vous que le Datadog Agent est en cours d'exécution dans votre cluster Kubernetes.

Pour configurer manuellement la collecte de logs dans le DaemonSet, consultez [Collecte de logs avec DaemonSet][9]. Sinon, suivez les instructions ci-dessous :

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Mettez à jour votre manifeste `datadog-agent.yaml` avec :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    logCollection:
      enabled: true
      containerCollectAll: true
```

Ensuite, appliquez la nouvelle configuration :

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

Consultez l'exemple [manifeste avec logs, métriques et collecte APM activés][1] pour un exemple supplémentaire. Vous pouvez définir `features.logCollection.containerCollectAll` sur `true` pour collecter les logs de tous les conteneurs découverts par défaut. Lorsqu'il est défini sur `false` (par défaut), vous devez spécifier les configurations de log Autodiscovery pour activer la collecte des logs. Pour plus d'informations, consultez [Découverte de logs - Filtrage](#filtering).

[1]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-logs-apm.yaml
{{% /tab %}}
{{% tab "Helm" %}}

Pour activer la collecte des logs avec Helm, mettez à jour votre fichier [datadog-values.yaml][1] avec la configuration de collecte des logs suivante. Ensuite, mettez à niveau votre chart Helm Datadog :

```yaml
datadog:
  logs:
    enabled: true
    containerCollectAll: true
```

Vous pouvez définir `datadog.logs.containerCollectAll` sur `true` pour collecter les logs de tous les conteneurs découverts par défaut. Lorsqu'il est défini sur `false` (par défaut), vous devez spécifier les configurations de log Autodiscovery pour activer la collecte des logs. Pour plus d'informations, consultez [Découverte de logs - Filtrage](#filtering).

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{< /tabs >}}

### Sans privilèges {#unprivileged}

{{< tabs >}}
{{% tab "Datadog Operator" %}}
(Facultatif) Pour effectuer une installation sans privilèges, ajoutez ce qui suit à la [ressource personnalisée DatadogAgent][1] :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    logCollection:
      enabled: true
      containerCollectAll: true

  override:
    nodeAgent:
      securityContext:
        runAsUser: <USER_ID>
        supplementalGroups:
          - <DOCKER_GROUP_ID>
```

- Remplacez `<USER_ID>` par l'UID pour exécuter l'Agent
- Remplacez `<DOCKER_GROUP_ID>` par l'ID de groupe qui possède le socket Docker ou containerd.

[1]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md#override
{{% /tab %}}
{{% tab "Helm" %}}

(Facultatif) Pour effectuer une installation sans privilèges, ajoutez ce qui suit dans le fichier `values.yaml` :

```yaml
datadog:
  securityContext:
    runAsUser: <USER_ID>
    supplementalGroups:
      - <DOCKER_GROUP_ID>
```

- Remplacez `<USER_ID>` par l'UID pour exécuter l'Agent.
- Remplacez `<DOCKER_GROUP_ID>` par l'ID de groupe qui possède le socket Docker ou containerd.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-danger">
<strong>Avertissement pour les installations sans privilèges</strong>
<br/><br/>
Lors de l'exécution d'une installation sans privilèges, l'Agent doit être en mesure de lire les fichiers de logs dans <code>/var/log/pods</code>.
<br/><br/>
Si vous utilisez le runtime containerd, les fichiers de log dans <code>/var/log/pods</code> sont lisibles par les membres du groupe <code>root</code> groupe. Avec les instructions ci-dessus, l'Agent s'exécute avec le <code>root</code> groupe. Aucune action n'est requise.
<br/><br/>
Si vous utilisez le runtime Docker, les fichiers de log dans <code>/var/log/pods</code> sont des liens symboliques vers <code>/var/lib/docker/containers</code>, qui n'est accessible qu'au <code>root</code> utilisateur. Par conséquent, avec le runtime Docker, il n'est pas possible pour un Agent non<code>root</code> de lire les logs dans <code>/var/log/pods</code>. Le socket Docker doit être monté dans le conteneur de l'Agent, afin qu'il puisse obtenir les logs des Pods via le démon Docker.
<br/><br/>
Pour collecter les logs depuis <code>/var/log/pods</code> lorsque le socket Docker est monté, définissez la variable d'environnement <code>DD_LOGS_CONFIG_K8S_CONTAINER_USE_FILE</code> (ou <code>logs_config.k8s_container_use_file</code> dans <code>datadog.yaml</code>) sur <code>true</code>. Cela force l'Agent à utiliser le mode de collecte de fichiers.
</div>

## Découverte de logs {#log-discovery}

Le Datadog Agent dans Kubernetes est déployé par un DaemonSet (géré par le Datadog Operator ou Helm). Ce DaemonSet planifie une réplique du Pod de l'Agent sur chaque nœud du cluster. Chaque Pod de l'Agent est ensuite responsable de rapporter les logs des autres Pods et conteneurs sur son nœud respectif. Lorsque la fonctionnalité « Container Collect All » est activée, l'Agent rapporte les logs de chaque conteneur découvert avec un ensemble par défaut de tags.

### Filtrage {#filtering}

Lorsque « Container Collect All » est activé, vous pouvez configurer les conteneurs dont vous souhaitez collecter les logs. Cela peut être utile pour empêcher la collecte des logs du Datadog Agent, si vous le souhaitez. Vous pouvez le faire en transmettant des configurations au Datadog Agent pour contrôler ce qu'il récupère, ou en transmettant des configurations au Pod Kubernetes pour exclure certains logs de manière plus explicite.

Lors du filtrage des logs via des méthodes telles que `DD_CONTAINER_EXCLUDE_LOGS` ou `ad.datadoghq.com/logs_exclude`, l'Agent ignore la collecte de logs indépendamment des configurations de collecte de logs explicitement définies dans les [annotations Autodiscovery][19], la [`DatadogInstrumentation` CRD][23] ou les [fichiers de configuration Autodiscovery][20].

Lorsque « Container Collect All » est désactivé (par défaut), vous n'avez pas besoin d'ajouter de filtrage car tout est exclu par défaut. Pour inclure la collecte uniquement pour certains pods sélectionnés, vous pouvez activer la configuration des logs via les [annotations Autodiscovery][19], la [`DatadogInstrumentation` CRD][23] ou les [fichiers de configuration Autodiscovery][20] pour les pods souhaités.

Consultez la section [Gestion de la détection des conteneurs][8] (en anglais) pour en savoir plus sur le filtrage.

### Tagging {#tagging}

Le Datadog Agent tague les logs des conteneurs Kubernetes avec les [tags Kubernetes][14] par défaut, ainsi qu'avec tous les tags personnalisés extraits. Lorsque « Container Collect All » est activé, l'Agent rapporte les logs d'un conteneur avec un tag `source` et `service` correspondant au nom d'image court du conteneur. Par exemple, les logs d'un conteneur utilisant l'image `gcr.io/owner/example-image:latest` auraient `example-image` comme valeur de tag `source`, `service` et `short_image`.

Le tag `service` peut également être défini par le label de Pod `tags.datadoghq.com/service: "<SERVICE>"` de [Unified Service Tagging][4]. Pour plus d'informations sur les attributs `source` et `service`, consultez [Attributs réservés][11].

Le tag `source` peut être important pour vos logs, car les [pipelines de logs prêts à l'emploi][15] sont filtrés à l'aide de ce tag. Cependant, ces pipelines peuvent être entièrement personnalisés selon vos besoins. Vous pouvez consulter les étapes dans la section [Logs d'intégration](#integration-logs) ci-dessous pour personnaliser davantage les tags de vos logs.

## Logs d'intégration {#integration-logs}

[Autodiscovery][10] vous permet d'utiliser des modèles pour configurer la collecte de logs et d'autres fonctionnalités sur les conteneurs. Utilisez l'une des méthodes suivantes pour configurer la collecte de logs :

- [Annotations Autodiscovery](#autodiscovery-annotations) (recommandé)
- [`DatadogInstrumentation` CRD](#datadoginstrumentation-crd) (nouveau)
- [Fichiers de configuration d'Autodiscovery](#autodiscovery-configuration-files)

Il est fortement recommandé de définir un tag `source` et `service` sur ces configurations de log. Faites correspondre le tag `source` à l'un des [pipelines de logs prêts à l'emploi][15] de Datadog afin que vos logs soient automatiquement enrichis ; vous pouvez également trouver une [bibliothèque de pipelines dans Datadog][16]. Le tag `service` alimente le [Unified Service Tagging][4], reliant vos logs aux métriques et aux traces du même service. Si `source` et `service` sont omis, l'Agent revient au tag `service` du Unified Service Tagging (lorsqu'il est défini), et sinon au nom d'image court du conteneur.

### Annotations d'Autodiscovery {#autodiscovery-annotations}

Avec Autodiscovery, l'Agent recherche automatiquement les modèles d'intégration dans les annotations des pods.

Pour appliquer une configuration spécifique à un conteneur donné, ajoutez l'annotation `ad.datadoghq.com/<CONTAINER_NAME>.logs` à votre Pod avec la configuration de log au format JSON.

**Remarque** : Les annotations d'Autodiscovery identifient les conteneurs par leur nom, **non** par leur image. Il tente de faire correspondre `<CONTAINER_NAME>` au `.spec.containers[i].name`, et non au `.spec.containers[i].image`.

<div class="alert alert-info">
Si vous définissez vos Pods Kubernetes <i>directement</i> (avec <code>kind:Pod</code>), ajoutez les annotations de chaque Pod dans sa section <code>metadata</code> , comme indiqué dans la section suivante.
<br/><br/>
Si vous définissez vos Pods Kubernetes <i>indirectement</i> (avec des contrôleurs de réplication, des ReplicaSets ou des Deployments), ajoutez les annotations de Pod au modèle de Pod sous <code>.spec.template.metadata</code>.</div>

#### Configurer un seul conteneur {#configure-a-single-container}
Pour configurer la collecte des logs pour un conteneur donné dans un pod, ajoutez les annotations suivantes à votre pod :

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.logs: '[<LOG_CONFIG>]'
    # (...)
spec:
  containers:
    - name: '<CONTAINER_NAME>'
# (...)
```

#### Exemple d'annotations d'Autodiscovery de logs {#example-log-autodiscovery-annotations}

L'annotation de Pod suivante définit le modèle d'intégration pour un exemple de conteneur. Elle est définie dans les annotations du modèle de Pod, plutôt que sur le Deployment lui-même. Cette configuration de log définit tous les logs du conteneur `app` avec les tags `source:java`, `service:example-app`, et le tag supplémentaire `foo:bar`.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: example
  labels:
    app: example-app
spec:
  selector:
    matchLabels:
      app: example-app
  template:
    metadata:
      labels:
        app: example-app
      annotations:
        ad.datadoghq.com/app.logs: '[{"source":"java", "service":"example-app", "tags":["foo:bar"]}]'
    spec:
      containers:
        - name: app
          image: owner/example-image:latest
```

#### Configurez deux conteneurs différents {#configure-two-different-containers}
Pour appliquer deux modèles d'intégration différents à deux conteneurs différents au sein de votre Pod, `<CONTAINER_NAME_1>` et `<CONTAINER_NAME_2>`, ajoutez les annotations suivantes à votre Pod :

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME_1>.logs: '[<LOG_CONFIG_1>]'
    # (...)
    ad.datadoghq.com/<CONTAINER_NAME_2>.logs: '[<LOG_CONFIG_2>]'
spec:
  containers:
    - name: '<CONTAINER_NAME_1>'
    # (...)
    - name: '<CONTAINER_NAME_2>'
# (...)
```

### CRD DatadogInstrumentation {#datadoginstrumentation-crd}

Au lieu d'annoter vos pods ou déploiements, vous pouvez utiliser une [`DatadogInstrumentation` ressource personnalisée][23] pour configurer la collecte des logs. L'exemple suivant concerne la partie conteneur `app` du Deployment `example` :

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogInstrumentation
metadata:
  name: example-logs
  namespace: <WORKLOAD_NAMESPACE>
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: example
  config:
    logs:
      - containerName: app
        source: java
        service: example-app
        tags:
          - foo:bar
```

### Fichiers de configuration d'Autodiscovery {#autodiscovery-configuration-files}
Vous pouvez fournir au Datadog Agent des fichiers de configuration pour que l'Agent exécute une intégration spécifiée lorsqu'il découvre un conteneur utilisant l'identifiant d'image correspondant. Cela vous permet de créer une configuration de log générique qui s'applique à un ensemble d'images de conteneur.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Vous pouvez personnaliser la collecte des logs par intégration avec une surcharge dans le `override.nodeAgent.extraConfd.configDataMap`. Cette méthode crée la ConfigMap et monte le fichier de configuration souhaité sur le conteneur de l'Agent.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  override:
    nodeAgent:
      extraConfd:
        configDataMap:
          <INTEGRATION_NAME>.yaml: |-
            ad_identifiers:
            - <CONTAINER_IMAGE>

            logs:
            - source: example-source
              service: example-service
```

Le `<CONTAINER_IMAGE>` doit correspondre au nom d'image court du conteneur auquel vous souhaitez appliquer cela. Consultez l'exemple de manifeste [avec mappage ConfigMap][1] pour un exemple supplémentaire.

[1]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-extraconfd.yaml
{{% /tab %}}

{{% tab "Helm" %}}
Vous pouvez personnaliser la collecte des logs par intégration dans `datadog.confd`. Cette méthode crée la ConfigMap et monte le fichier de configuration souhaité sur le conteneur de l'Agent.

```yaml
datadog:
  #(...)
  confd:
    <INTEGRATION_NAME>.yaml: |-
      ad_identifiers:
      - <CONTAINER_IMAGE>
      logs:
      - source: example-source
        service: example-service
```

Le `<CONTAINER_IMAGE>` doit correspondre au nom d'image court du conteneur auquel vous souhaitez appliquer cela.

{{% /tab %}}

{{% tab "Stockage key/value" %}}
Les commandes etcd suivantes créent un modèle d'intégration Redis avec un paramètre `password` personnalisé et ajoutent aux logs les tags `source` et `service` corrects :

```conf
etcdctl mkdir /datadog/check_configs/redis
etcdctl set /datadog/check_configs/redis/logs '[{"source": "redis", "service": "redis", "tags": ["env:prod"]}]'
```

Notez que chacune des trois valeurs est une liste. L'Autodiscovery assemble les éléments de liste dans les configurations d'intégration en fonction des index de liste partagés. Dans ce cas, il compose la première (et unique) configuration de check à partir de `check_names[0]`, `init_configs[0]` et `instances[0]`.

Contrairement aux fichiers auto-conf, les **magasins clé-valeur peuvent utiliser le nom court OU long de l'image comme identifiants de conteneur**, par exemple, `redis` OU `redis:latest`.

Autodiscovery peut utiliser [Consul][1], Etcd et Zookeeper comme sources de modèles d'intégration.

Pour utiliser un magasin clé-valeur, configurez-le dans le fichier de configuration `datadog.yaml` de l'Agent et montez ce fichier à l'intérieur de l'Agent conteneurisé. Alternativement, transmettez votre magasin clé-valeur en tant que variables d'environnement à l'Agent conteneurisé.

#### Dans `datadog.yaml` {#in-datadogyaml}

Dans le fichier `datadog.yaml`, définissez l'adresse `<KEY_VALUE_STORE_IP>` et `<KEY_VALUE_STORE_PORT>` de votre magasin clé-valeur :

  ```yaml
  config_providers:
    - name: etcd
      polling: true
      template_dir: /datadog/check_configs
      template_url: '<KV_STORE_IP>:<KV_STORE_PORT>'
      username:
      password:

    - name: consul
      polling: true
      template_dir: datadog/check_configs
      template_url: '<KV_STORE_IP>:<KV_STORE_PORT>'
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
      template_url: '<KV_STORE_IP>:<KV_STORE_PORT>'
      username:
      password:
  ```

[Redémarrez ensuite l'Agent][2] pour prendre en compte le changement de configuration.

#### Dans les variables d'environnement {#in-environment-variables}

Avec le magasin clé-valeur activé comme source de modèle, l'Agent recherche les modèles sous la clé `/datadog/check_configs`. L'Autodiscovery attend une hiérarchie clé-valeur comme celle-ci :

```yaml
/datadog/
  check_configs/
    <CONTAINER_IMAGE>/
      - logs: ["<LOGS_CONFIG>"]
    ...
```

**Remarque** : Pour appliquer une configuration spécifique à un conteneur donné, l'Autodiscovery identifie les conteneurs par **image** lors de l'utilisation des magasins clé-valeur en essayant de faire correspondre `<CONTAINER_IMAGE>` à `.spec.containers[0].image`.

[1]: /fr/integrations/consul/
[2]: /fr/agent/configuration/agent-commands/
{{% /tab %}}
{{< /tabs >}}

Pour faire correspondre une configuration de log à un ensemble de conteneurs avec plus de granularité que le nom d'image court du conteneur, consultez [Autodiscovery Container Identifiers][22].

## Collecte de logs avancée {#advanced-log-collection}

Utilisez les étiquettes de log Autodiscovery afin d'appliquer la logique de processing pour la collecte de logs avancée, par exemple :

* [Filtrer les logs avant de les envoyer à Datadog][5].
* [Nettoyez les données sensibles de vos logs][6].
* [Passez à l'agrégation multiligne de journaux][7].

### À partir d'un fichier de log local au conteneur {#from-a-container-local-log-file}

Datadog recommande d'utiliser les flux de sortie `stdout` et `stderr` pour les applications conteneurisées, afin de pouvoir configurer la collecte de logs plus automatiquement.

Cependant, l'Agent peut également collecter directement les logs à partir d'un fichier basé sur une annotation. Pour collecter ces logs, utilisez `ad.datadoghq.com/<CONTAINER_NAME>.logs` avec une configuration `type: file` et `path`. Les logs collectés à partir de fichiers avec une telle annotation sont automatiquement tagués avec le même ensemble de tags que les logs provenant du conteneur lui-même. Datadog recommande d'utiliser les flux de sortie `stdout` et `stderr` pour les applications conteneurisées, afin de pouvoir configurer automatiquement la collecte de logs. Pour plus d'informations, consultez les [Configurations recommandées](#recommended-configurations).

Ces chemins de fichiers sont **relatifs** au conteneur de l'Agent. Par conséquent, le répertoire contenant le fichier de log doit être monté à la fois dans le conteneur de l'application et dans celui de l'Agent afin que l'Agent puisse avoir une visibilité appropriée.

Par exemple, vous pouvez le faire avec un volume `hostPath`. Le Pod ci-dessous émet des logs dans le fichier `/var/log/example/app.log`. Cela est effectué dans le répertoire `/var/log/example`, où un volume et un volumeMount ont défini ceci comme un `hostPath`.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: logger
  annotations:
    ad.datadoghq.com/busybox.logs: |
      [{
          "type": "file",
          "path": "/var/log/example/app.log",
          "source": "example-source",
          "service": "example-service"
      }]
spec:
  containers:
   - name: busybox
     image: busybox
     command: [ "/bin/sh", "-c", "--" ]
     args: [ "while true; do sleep 1; echo `date` example file log >> /var/log/example/app.log; done;" ]
     volumeMounts:
     - name: applogs
       mountPath: /var/log/example
  volumes:
     - name: applogs
       hostPath:
         path: /var/log/example
```

Le même volume et le même chemin `volumeMount` doivent être définis dans le conteneur de l'Agent pour qu'il puisse lire ce fichier de log.

```yaml
  containers:
  - name: agent
    # (...)
    volumeMounts:
    - mountPath: /var/log/example
      name: applogs
    # (...)
  volumes:
  - name: applogs
    hostPath:
      path: /var/log/example
    # (...)
```
#### Configurations recommandées {#recommended-configurations}
- Cette stratégie peut fonctionner pour un pod donné, mais peut devenir fastidieuse avec plusieurs applications utilisant cette stratégie. Vous pouvez également rencontrer des problèmes si plusieurs réplicas utilisent le même chemin de log. Si possible, Datadog recommande de tirer parti de la [variable de modèle Autodiscovery][17] `%%kube_pod_name%%`. Par exemple, vous pouvez définir votre `path` pour référencer cette variable : `"path": "/var/log/example/%%kube_pod_name%%/app.log"`. Votre pod d'application doit alors également écrire ses fichiers de log en respectant ce nouveau chemin. Vous pouvez utiliser l'[API Downward][18] pour aider votre application à déterminer son nom de Pod.

- Lorsque vous utilisez ce type d'annotation avec un conteneur, les logs `stdout` et `stderr` ne sont pas collectés automatiquement depuis le conteneur. Si la collecte à la fois depuis les flux de sortie du conteneur et depuis le fichier est nécessaire, activez-la explicitement dans l'annotation. Exemple :
  ```yaml
  ad.datadoghq.com/<CONTAINER_IMAGE>.logs: |
    [
      {"type":"file","path":"/var/log/example/app.log","source":"file","service":"example-service"},
      {"source":"container","service":"example-service"}
    ]
  ```

- Lorsque vous utilisez ce type de combinaison, `source` et `service` n'ont pas de valeur par défaut pour les logs collectés à partir d'un fichier et doivent être explicitement définis dans l'annotation.

## Dépannage {#troubleshooting}

Pour les étapes de dépannage, consultez [Dépannage de la collecte des logs de conteneur][21].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/faq/log-collection-with-docker-socket/
[2]: /fr/agent/kubernetes/
[3]: /fr/integrations/#cat-autodiscovery
[4]: /fr/getting_started/tagging/unified_service_tagging/?tab=kubernetes
[5]: /fr/agent/logs/advanced_log_collection/?tab=kubernetes#filter-logs
[6]: /fr/agent/logs/advanced_log_collection/?tab=kubernetes#scrub-sensitive-data-from-your-logs
[7]: /fr/agent/logs/advanced_log_collection/?tab=kubernetes#multi-line-aggregation
[8]: /fr/agent/guide/autodiscovery-management/
[9]: /fr/containers/guide/kubernetes_daemonset/#log-collection
[10]: /fr/getting_started/containers/autodiscovery
[11]: /fr/logs/log_configuration/attributes_naming_convention/
[12]: /fr/getting_started/tagging/assigning_tags/#integration-inheritance
[13]: https://kubernetes.io/docs/concepts/cluster-administration/logging/#log-location-node
[14]: /fr/containers/kubernetes/tag
[15]: /fr/logs/log_configuration/pipelines/?tab=source#integration-pipelines
[16]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[17]: /fr/containers/guide/template_variables/
[18]: https://kubernetes.io/docs/tasks/inject-data-application/environment-variable-expose-pod-information/
[19]: /fr/containers/kubernetes/log/?tab=helm#autodiscovery-annotations
[20]: /fr/containers/kubernetes/log/?tab=helm#autodiscovery-configuration-files
[21]: /fr/containers/troubleshooting/log-collection/?tab=datadogoperator
[22]: /fr/containers/guide/ad_identifiers/
[23]: /fr/containers/guide/configure-autodiscovery-with-the-datadoginstrumentation-crd/