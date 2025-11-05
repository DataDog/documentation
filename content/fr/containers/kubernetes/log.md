---
aliases:
- /fr/agent/kubernetes/log
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
  text: Limiter la collecte de données à un sous-ensemble de conteneurs
- link: /agent/kubernetes/tag/
  tag: Documentation
  text: Attribuer des tags à toutes les données envoyées par un conteneur
title: Collecte de logs Kubernetes
---

Cette page explique comment collecter des logs à partir des fichiers de logs Kubernetes.

Lorsque vos applications conteneurisées écrivent leurs logs dans les flux standard `stdout`/`stderr`, le runtime de conteneur et Kubernetes gèrent automatiquement ces logs. Par défaut, [Kubernetes enregistre ces flux sous forme de fichiers][13] sur le host, dans le dossier `/var/log/pods` et ses sous-dossiers, un par pod et par conteneur.

L’Agent Datadog peut collecter ces fichiers de logs Kubernetes à l’aide des instructions ci-dessous. Cette méthode est bien adaptée au caractère éphémère des pods créés par Kubernetes et est plus économe en ressources que la collecte via le socket Docker. Datadog recommande cette approche pour la collecte des logs dans Kubernetes.

Par ailleurs, l’Agent Datadog peut aussi collecter les logs en interrogeant l’API Docker via le socket Docker. Cela nécessite que Docker soit le runtime utilisé dans votre cluster Kubernetes. Cette méthode est plus gourmande en ressources que la collecte par fichiers. Pour l’utiliser, consultez la section [collecte des logs via le socket Docker][1]. Si vos applications conteneurisées écrivent dans des fichiers de logs internes aux conteneurs, cela complique la collecte. Consultez la section [collecte de logs à partir d’un fichier](#a-partir-d-un-fichier-log-de-conteneurfile).

## Configuration

### Collecte de logs

Avant de commencer la collecte des logs d’application, assurez-vous que l’Agent Datadog est en cours d’exécution dans votre cluster Kubernetes.

Pour configurer la collecte de logs manuellement dans le DaemonSet, consultez la section [Collecte de logs avec DaemonSet][9]. Sinon, suivez les instructions ci-dessous :

{{< tabs >}}
{{% tab "Operator Datadog" %}}

Mettez à jour votre manifeste `datadog-agent.yaml` comme suit :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <CLÉ_API_DATADOG>

  features:
    logCollection:
      enabled: true
      containerCollectAll: true
```

Ensuite, appliquez la nouvelle configuration :

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

Consultez l'exemple de [manifeste avec activation des logs, de l'APM et de la collecte des métriques][1] pour plus d'informations. Vous pouvez définir `features.logCollection.containerCollectAll` sur `true` pour collecter les logs de tous les conteneurs détectés par défaut. Lorsque cette valeur est définie sur `false` (valeur par défaut), vous devez spécifier des configurations de collecte de logs avec Autodiscovery pour activer la collecte. Pour en savoir plus, consultez la section [Détection des logs - Filtrage](#filtrage).

[1]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-logs-apm.yaml
{{% /tab %}}
{{% tab "Helm" %}}

Pour activer la collecte de logs avec Helm, mettez à jour votre fichier [datadog-values.yaml][1] avec la configuration suivante pour la collecte de logs. Ensuite, mettez à jour votre chart Helm Datadog :

```yaml
datadog:
  logs:
    enabled: true
    containerCollectAll: true
```

Vous pouvez définir `datadog.logs.containerCollectAll` sur `true` pour collecter les logs de tous les conteneurs détectés par défaut. Lorsque cette valeur est définie sur `false` (valeur par défaut), vous devez spécifier des configurations de collecte de logs avec Autodiscovery pour activer la collecte. Pour en savoir plus, consultez [Détection des logs - Filtrage](#filtrage).

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{< /tabs >}}

### Sans privilèges

{{< tabs >}}
{{% tab "Datadog Operator" %}}
(Facultatif) Pour exécuter une installation sans privilèges, ajoutez le bloc suivant à la [ressource personnalisée DatadogAgent][1] :

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

- Remplacez <USER_ID> par l'identifiant utilisateur (UID) qui exécutera l'Agent.
- Remplacez <DOCKER_GROUP_ID> par l'identifiant du groupe possédant le socket Docker ou containerd.

[1]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md#override
{{% /tab %}}
{{% tab "Helm" %}}

(Facultatif) Pour exécuter une installation sans privilèges, ajoutez le bloc suivant au fichier `values.yaml` :

```yaml
datadog:
  securityContext:
    runAsUser: <USER_ID>
    supplementalGroups:
      - <DOCKER_GROUP_ID>
```

- Remplacez <USER_ID> par l'identifiant utilisateur (UID) qui exécutera l'Agent.
- Remplacez <DOCKER_GROUP_ID> par l'identifiant du groupe possédant le socket Docker ou containerd.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-danger">
<strong>Avertissement pour les installations non privilégiées</strong>
<br/><br/>
Lors d’une installation non privilégiée, l’Agent doit pouvoir lire les fichiers de logs dans <code>/var/log/pods</code>.
<br/><br/>
Si vous utilisez le runtime containerd, les fichiers dans <code>/var/log/pods</code> sont lisibles par les membres du groupe <code>root</code>. Avec la configuration ci-dessus, l’Agent s’exécute avec le groupe <code>root</code>. Aucune action supplémentaire n’est nécessaire.
<br/><br/>
Si vous utilisez le runtime Docker, les fichiers de <code>/var/log/pods</code> sont des liens symboliques vers <code>/var/lib/docker/containers</code>, qui n’est accessible qu’à l’utilisateur <code>root</code>. Par conséquent, avec Docker, un Agent non <code>root</code> ne peut pas lire les logs de <code>/var/log/pods</code>. Le socket Docker doit être monté dans le conteneur de l’Agent pour lui permettre d’accéder aux logs via le démon Docker.
<br/><br/>
Pour collecter les logs de <code>/var/log/pods</code> lorsque le socket Docker est monté, définissez la variable d’environnement <code>DD_LOGS_CONFIG_K8S_CONTAINER_USE_FILE</code> (ou <code>logs_config.k8s_container_use_file</code> dans <code>datadog.yaml</code>) sur <code>true</code>. Cela force l’Agent à utiliser le mode de collecte basé sur les fichiers.
</div>

## Détection de logs

L'Agent Datadog dans Kubernetes est déployé via un DaemonSet (géré par le Datadog Operator ou par Helm). Ce DaemonSet déploie une réplique du pod Agent sur chaque nœud du cluster. Chaque pod Agent est alors responsable de la remontée des logs des autres pods et conteneurs présents sur son nœud. Lorsque la fonctionnalité « Container Collect All » est activée, l’Agent remonte les logs de chaque conteneur détecté avec un ensemble par défaut de tags.

### Filtrage

Lorsque « Container Collect All » est activé, vous pouvez configurer les conteneurs dont vous souhaitez collecter les logs. Cela peut être utile si vous souhaitez éviter, par exemple, de collecter les logs de l’Agent Datadog. Vous pouvez procéder en transmettant une configuration à l’Agent pour contrôler ce qu’il collecte, ou en configurant les pods Kubernetes afin d’exclure explicitement certains logs.

Lorsque vous filtrez des logs à l’aide de méthodes comme `DD_CONTAINER_EXCLUDE_LOGS` ou `ad.datadoghq.com/logs_exclude`, l’Agent ignore la collecte des logs, même si une configuration explicite est définie via les [annotations Autodiscovery][19] ou les [fichiers de configuration Autodiscovery][20].

Lorsque « Container Collect All » est désactivé (valeur par défaut), aucun filtrage n’est nécessaire car tout est exclu par défaut. Pour collecter uniquement certains pods, vous pouvez activer la configuration de collecte via les [annotations Autodiscovery][19] ou les [fichiers de configuration Autodiscovery][20] pour les pods concernés.

Consultez la section [Gestion de la détection des conteneurs][8] (en anglais) pour en savoir plus sur le filtrage.

### Tags

L’Agent Datadog ajoute aux logs des conteneurs Kubernetes les tags Kubernetes par défaut ainsi que tous les tags personnalisés extraits. Lorsque « Container Collect All » est activé, les logs d’un conteneur sont remontés avec des tags `source` et `service` correspondant au nom court de l’image du conteneur. Par exemple, les logs d’un conteneur utilisant l’image `gcr.io/owner/example-image:latest` auront la valeur `example-image` pour les tags `source`, `service` et `short_image`.

Le tag `service` peut également être défini à l’aide du label Pod [Unified Service Tagging][4] `tags.datadoghq.com/service: "<SERVICE>"`. Pour en savoir plus sur les attributs `source` et `service`, consultez la page [Attributs réservés][11].

Le tag `source` peut être important pour vos logs, car les [pipelines de logs préconfigurés][15] sont filtrés en fonction de ce tag. Ces pipelines peuvent cependant être personnalisés selon vos besoins. Vous trouverez plus de détails sur la personnalisation des tags dans vos logs dans la section [Logs d’intégration](#logs-d-integration) ci-dessous.

## Logs d'intégration

[Autodiscovery][10] vous permet d’utiliser des modèles pour configurer la collecte des logs (et d’autres fonctionnalités) sur les conteneurs. Cela permet d’activer la collecte, de personnaliser les tags et de définir des règles avancées. Pour configurer la collecte pour une intégration avec Autodiscovery, vous pouvez :

- Définir une configuration de log dans les annotations Autodiscovery d’un pod donné, pour configurer les règles pour un conteneur spécifique *(Recommandé)*
- Définir une configuration de log dans un fichier de configuration, pour appliquer les règles à chaque conteneur correspondant à une image

Ces configurations doivent au minimum spécifier les tags `source` et `service`. Il est recommandé d’associer le tag `source` à l’un des [pipelines de logs préconfigurés Datadog][15] afin d’enrichir automatiquement vos logs. Vous pouvez également consulter une [bibliothèque de pipelines dans Datadog][16].

### Annotations Autodiscovery

Avec Autodiscovery, l’Agent recherche automatiquement les modèles d’intégration dans les annotations des pods.

Pour appliquer une configuration spécifique à un conteneur, ajoutez l’annotation `ad.datadoghq.com/<CONTAINER_NAME>.logs` à votre pod avec une configuration de log au format JSON. 

**Remarque** : les annotations Autodiscovery identifient les conteneurs par leur nom, **et non** par leur image. Elles tentent de faire correspondre `<CONTAINER_NAME>` à `.spec.containers[i].name`, et non à `.spec.containers[i].image`.

<div class="alert alert-info">
Si vous définissez vos pods Kubernetes <i>directement</i> (avec <code>kind:Pod</code>), ajoutez les annotations de chaque Pod dans la section <code>metadata</code>, comme montré dans la section suivante.
<br/><br/>
Si vous définissez vos pods Kubernetes <i>indirectement</i> (à l’aide de contrôleurs de réplication, de ReplicaSets ou de déploiements), ajoutez les annotations de pod au modèle de pod sous <code>.spec.template.metadata</code>.</div>

#### Configurer un seul conteneur
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

#### Exemple d’annotations Autodiscovery pour les logs

L'annotation de pod suivante définit le modèle d'intégration pour un exemple de conteneur. Elle est définie dans les annotations du modèle de pod, et non sur le déploiement lui-même. Cette configuration de logs applique aux logs du conteneur `app` les tags `source:java`, `service:example-app` et un tag supplémentaire `foo:bar`.

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

#### Configurer deux conteneurs différents
Pour appliquer deux modèles d'intégration différents à deux conteneurs différents dans votre pod, `<CONTAINER_NAME_1>` et `<CONTAINER_NAME_2>`, ajoutez les annotations suivantes à votre pod :

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

### Fichiers de configuration Autodiscovery
Vous pouvez fournir à l'Agent Datadog des fichiers de configuration afin qu'il exécute une intégration donnée lorsqu'il découvre un conteneur correspondant à un identifiant d'image. Cela vous permet de créer une configuration de logs générique qui s'applique à un ensemble d'images de conteneurs.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Vous pouvez personnaliser la collecte des logs par intégration à l'aide d'un override dans `override.nodeAgent.extraConfd.configDataMap`. Cette méthode crée le ConfigMap et monte le fichier de configuration souhaité dans le conteneur de l'Agent. 

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

Le champ `<CONTAINER_IMAGE>` doit correspondre au nom court de l'image de conteneur auquel cette configuration doit s'appliquer. Consultez le manifeste d'exemple [avec mappage ConfigMap][1] pour un exemple supplémentaire.

[1]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-extraconfd.yaml
{{% /tab %}}

{{% tab "Helm" %}}
Vous pouvez personnaliser la collecte des logs par intégration dans `datadog.confd`. Cette méthode crée le ConfigMap et monte le fichier de configuration souhaité dans le conteneur de l'Agent.

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

Le champ `<CONTAINER_IMAGE>` doit correspondre au nom court de l'image de conteneur auquel cette configuration doit s'appliquer.

{{% /tab %}}

{{% tab "Key-value store" %}}
Les commandes etcd suivantes créent un modèle d'intégration Redis avec un paramètre `password` personnalisé, et appliquent les bons attributs `source` et `service` aux logs :

```conf
etcdctl mkdir /datadog/check_configs/redis
etcdctl set /datadog/check_configs/redis/logs '[{"source": "redis", "service": "redis", "tags": ["env:prod"]}]'
```

Notez que chacune des trois valeurs est une liste. Autodiscovery assemble les éléments de liste en fonction des index de liste partagée de manière à générer la configuration de l'intégration. Dans le cas présent, il assemble la première (et unique) configuration de check à partir de `check_names[0]`, `init_configs[0]` et `instances[0]`.

Contrairement aux fichiers de configuration automatique, **les stockages key/value peuvent utiliser la version courte OU la version longue du nom d'image comme identificateur de conteneur**. Exemple : `redis` OU `redis:latest`.

Autodiscovery peut utiliser [Consul][1], Etcd et Zookeeper comme sources de modèles d'intégration.

Pour utiliser un key-value store, configurez-le dans le fichier `datadog.yaml` de l'Agent et montez ce fichier dans le conteneur de l'Agent. Vous pouvez aussi passer votre key-value store via des variables d'environnement dans le conteneur de l'Agent.

#### Dans `datadog.yaml`

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

#### Dans les variables d'environnement

Lorsque le stockage clé-valeur est activé en tant que source de modèle, l'Agent recherche des modèles à partir de la clé `/datadog/check_configs`. Autodiscovery s'attend à une hiérarchie clé-valeur comme suit :

```yaml
/datadog/
  check_configs/
    <CONTAINER_IMAGE>/
      - logs: ["<LOGS_CONFIG>"]
    ...
```

**Remarque** : pour appliquer une configuration spécifique à un conteneur donné, Autodiscovery identifie les conteneurs par **image** en cas d'utilisation de stockages clé-valeur. En d'autres termes, il cherche à faire correspondre `<CONTAINER_IMAGE>` à `.spec.containers[0].image`.

[1]: /fr/integrations/consul/
[2]: /fr/agent/configuration/agent-commands/
{{% /tab %}}
{{< /tabs >}}

## Collecte de logs avancée

Utilisez des étiquettes de log Autodiscovery afin d'appliquer une logique de traitement avancée pour la collecte de logs. Par exemple :

* [Filtrer les logs avant de les envoyer à Datadog][5].
* [Nettoyer les données sensibles de vos logs][6].
* [Effectuer une agrégation multiligne][7].

### Depuis un fichier de logs local au conteneur

Datadog recommande d'utiliser les flux de sortie `stdout` et `stderr` pour les applications conteneurisées afin de configurer automatiquement la collecte des logs.

Cependant, l'Agent peut également collecter directement des logs à partir d'un fichier à l'aide d'une annotation. Pour collecter ces logs, utilisez `ad.datadoghq.com/<CONTAINER_IMAGE>.logs` avec une configuration `type: file` et `path`. Les logs collectés à partir de fichiers avec une telle annotation sont automatiquement étiquetés avec le même ensemble de tags que ceux provenant du conteneur lui-même. Datadog recommande d'utiliser les flux de sortie `stdout` et `stderr` pour les applications conteneurisées, afin de configurer automatiquement la collecte des logs. Pour plus d'informations, consultez les [configurations recommandées](#configurations-recommandees).

Ces chemins de fichiers sont **relatifs** au conteneur de l'Agent. Le répertoire contenant le fichier de logs doit donc être monté à la fois dans le conteneur applicatif et dans le conteneur de l'Agent afin que celui-ci puisse y accéder.

Par exemple, vous pouvez utiliser un volume partagé `hostPath`. Le pod ci-dessous émet des logs dans le fichier `/var/log/example/app.log`, situé dans le répertoire `/var/log/example`, configuré à l'aide d'un volume et d'un volumeMount de type `hostPath`.

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
#### Configurations recommandées
- Cette stratégie peut fonctionner pour un pod donné, mais elle peut devenir contraignante lorsqu'elle est utilisée par plusieurs applications. Vous pouvez également rencontrer des problèmes si plusieurs réplicas utilisent le même chemin de log. Si possible, Datadog recommande de tirer parti de la [variable de modèle Autodiscovery][17] `%%kube_pod_name%%`. Par exemple, vous pouvez définir le champ `path` en utilisant cette variable : `"path": "/var/log/example/%%kube_pod_name%%/app.log"`. Le pod de votre application doit alors également écrire ses fichiers de log en respectant ce nouveau chemin. Vous pouvez utiliser l'[API Downward][18] pour aider votre application à déterminer son nom de pod.

- Lorsque vous utilisez ce type d'annotation avec un conteneur, les logs `stdout` et `stderr` ne sont pas automatiquement collectés depuis ce conteneur. Si vous avez besoin de collecter à la fois les flux de sortie du conteneur et les fichiers, vous devez l'activer explicitement dans l'annotation. Par exemple :
  ```yaml
  ad.datadoghq.com/<CONTAINER_IMAGE>.logs: |
    [
      {"type":"file","path":"/var/log/example/app.log","source":"file","service":"example-service"},
      {"source":"container","service":"example-service"}
    ]
  ```

- Lorsque vous utilisez ce type de combinaison, les paramètres `source` et `service` ne présentent aucune valeur par défaut pour les logs recueillis depuis un fichier. Ils doivent être définis explicitement dans l'annotation.

## Dépannage

#### Conteneurs de courte durée

Par défaut, l'Agent recherche de nouveaux conteneurs toutes les 5 secondes.

Si vous utilisez l'Agent v6.12+, les logs de conteneurs de courte durée (en raison d'une interruption ou d'un crash) sont automatiquement recueillis à partir des fichiers Kubernetes (via `/var/log/pods`). Les logs des conteneurs d'initialisation sont eux aussi recueillis.

#### Tags manquants sur les nouveaux conteneurs ou pods

Lors de l'envoi de logs vers Datadog depuis des conteneurs ou des pods nouvellement créés, le tagger interne de l'Agent Datadog peut ne pas encore avoir les tags associés au conteneur ou au pod. Par conséquent, ces logs peuvent manquer de certains tags.

Pour résoudre ce problème, vous pouvez utiliser la variable d'environnement `DD_LOGS_CONFIG_TAGGER_WARMUP_DURATION` pour configurer une durée (en secondes) pendant laquelle l'Agent Datadog attend avant de commencer à envoyer les logs provenant de conteneurs et de pods nouvellement créés. La valeur par défaut est `0`.

{{< tabs >}}
{{% tab "Operator Datadog" %}}

```yaml
spec:
  override:
    nodeAgent:
      env:
        - name: DD_LOGS_CONFIG_TAGGER_WARMUP_DURATION
          value: "5"
```
{{% /tab %}}
{{% tab "Helm" %}}
```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_TAGGER_WARMUP_DURATION
      value: "5"
```
{{% /tab %}}
{{< /tabs >}}

#### Tags manquants au niveau du host sur de nouveaux hosts ou nœuds

Les tags au niveau du host sont ceux visibles dans la liste d'infrastructure pour un host donné, et proviennent soit du fournisseur cloud, soit de l'Agent Datadog. Les tags de host courants incluent `kube_cluster_name`, `region`, `instance-type` et `autoscaling-group`.

Lors de l'envoi de logs vers Datadog depuis un host ou un nœud nouvellement créé, il peut s'écouler quelques minutes avant que les tags de host ne soient [hérités][12]. Par conséquent, ces logs peuvent manquer de tags au niveau du host.

Pour résoudre ce problème, vous pouvez utiliser la variable d'environnement `DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION` pour configurer une durée (en minutes). Pendant cette durée, l'Agent Datadog ajoute manuellement les tags de host qu'il connaît à chaque log envoyé. Après cette période, l'Agent revient à l'utilisation de l'héritage des tags à l'ingestion.

{{< tabs >}}
{{% tab "Operator Datadog" %}}
```yaml
spec :
  override :
    nodeAgent:
      env :
        - name : DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION
          value : "10m"
```
{{% /tab %}}
{{% tab "Helm" %}}
```yaml
datadog :
  env :
    - name : DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION
      value : "10m"
```
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

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