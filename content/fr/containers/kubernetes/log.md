---
aliases:
- /fr/agent/kubernetes/log
description: Configurez la collecte des journaux des applications conteneurisées fonctionnant
  sur Kubernetes à l'aide de l'Agent Datadog
further_reading:
- link: https://www.datadoghq.com/blog/eks-fargate-logs-datadog
  tag: Blog
  text: Surveillez les journaux d'Amazon EKS sur Fargate avec Datadog
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
  text: Dépannage de la collecte des journaux de conteneurs
title: Collecte de logs Kubernetes
---
Cette page explique comment collecter des logs à partir des fichiers de logs Kubernetes.

Lorsque vos applications conteneurisées écrivent leurs journaux sur la sortie standard et l'erreur (`stdout`/`stderr`), le runtime de conteneur et Kubernetes gèrent automatiquement les journaux pour vous. Le modèle par défaut est que [Kubernetes stocke ces flux de journaux sous forme de fichiers][13] sur l'hôte dans le dossier `/var/log/pods` et les sous-dossiers pour chaque Pod et conteneur.

L'Agent Datadog peut collecter ces fichiers journaux Kubernetes pour ces conteneurs en utilisant les instructions ci-dessous. Cette option s'adapte bien à la nature éphémère des Pods que Kubernetes crée et est plus efficace en termes de ressources que la collecte des journaux à partir du socket Docker. Datadog recommande cette méthode pour la collecte des journaux dans Kubernetes.

Alternativement, l'Agent Datadog peut également collecter des journaux par des requêtes répétées à l'API Docker via le socket Docker. Cependant, cela nécessite Docker comme runtime de conteneur pour votre cluster Kubernetes. C'est également plus gourmand en ressources que l'utilisation des fichiers journaux. Pour voir comment collecter des journaux en utilisant le socket Docker, consultez [Collecte de journaux avec le socket Docker][1]. Si vos applications conteneurisées écrivent dans des fichiers journaux stockés dans le conteneur, cela peut compliquer la collecte des journaux. Voir [la collecte des journaux à partir d'un fichier](#from-a-container-local-log-file).

## Configuration {#setup}

### Collecte des journaux {#log-collection}

Avant de commencer la collecte des logs d’application, assurez-vous que l’Agent Datadog est en cours d’exécution dans votre cluster Kubernetes.

Pour configurer manuellement la collecte des journaux dans le DaemonSet, consultez [Collecte des journaux DaemonSet][9]. Dans le cas contraire, suivez les instructions ci-dessous :

{{< tabs >}}
{{% tab "Operator Datadog" %}}

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

Voir l'exemple [manifeste avec collecte de journaux, de métriques et d'APM activée][1] pour un exemple supplémentaire. Vous pouvez définir `features.logCollection.containerCollectAll` sur `true` pour collecter les journaux de tous les conteneurs découverts par défaut. Lorsqu'il est défini sur `false` (par défaut), vous devez spécifier les configurations d'autodécouverte de logs pour activer la collecte des journaux. Pour plus d'informations, voir [Découverte des journaux - Filtrage](#filtering).

[1]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-logs-apm.yaml
{{% /tab %}}
{{% tab "Helm" %}}

Pour activer la collecte des journaux avec Helm, mettez à jour votre fichier [datadog-values.yaml][1] avec la configuration de collecte des journaux suivante. Ensuite, mettez à jour votre Helm chart Datadog :

```yaml
datadog:
  logs:
    enabled: true
    containerCollectAll: true
```

Vous pouvez définir `datadog.logs.containerCollectAll` sur `true` pour collecter les journaux de tous les conteneurs découverts par défaut. Lorsqu'il est défini sur `false` (par défaut), vous devez spécifier les configurations d'autodécouverte de logs pour activer la collecte des journaux. Pour plus d'informations, voir [Découverte des journaux - Filtrage](#filtering).

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{< /tabs >}}

### Non privilégié {#unprivileged}

{{< tabs >}}
{{% tab "Operator Datadog" %}}
(Optionnel) Pour exécuter une installation non privilégiée, ajoutez ce qui suit à la [ressource personnalisée DatadogAgent][1] :

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

(Optionnel) Pour exécuter une installation non privilégiée, ajoutez ce qui suit dans le fichier `values.yaml` :

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
<strong>Avertissement pour les installations non privilégiées</strong>
<br/><br/>
Lors de l'exécution d'une installation non privilégiée, l'Agent doit pouvoir lire les fichiers journaux dans <code>/var/log/pods</code>.
<br/><br/>
Si vous utilisez le runtime containerd, les fichiers journaux dans <code>/var/log/pods</code> sont lisibles par les membres du <code>root</code> groupe. Avec les instructions ci-dessus, l'Agent s'exécute avec le <code>root</code> groupe. Aucune action n'est requise.
<br/><br/>
Si vous utilisez le runtime Docker, les fichiers journaux dans <code>/var/log/pods</code> sont des liens symboliques vers <code>/var/lib/docker/containers</code>, qui n'est accessible que par le <code>root</code> utilisateur. Par conséquent, avec le runtime Docker, un Agent non privilégié ne peut pas lire les journaux.<code>root</code> Agent de lire les journaux dans <code>/var/log/pods</code>. Le socket Docker doit être monté dans le conteneur Agent, afin qu'il puisse obtenir les journaux des Pods via le démon Docker.
<br/><br/>
Pour collecter les journaux de conteneurs, lorsque le socket Docker est monté, définissez la variable d'environnement (ou dans …) sur [valeur appropriée]. Cela force l'Agent à utiliser le mode de collecte de fichiers. <code>/var/log/pods</code> lorsque le socket Docker est monté, définissez la variable d'environnement <code>DD_LOGS_CONFIG_K8S_CONTAINER_USE_FILE</code> (ou <code>logs_config.k8s_container_use_file</code> dans <code>datadog.yaml</code>) sur <code>true</code>. Cela force l'Agent à utiliser le mode de collecte de fichiers.
</div>

## Découverte des journaux {#log-discovery}

L'Agent Datadog dans Kubernetes est déployé par un DaemonSet (géré par l'Opérateur Datadog ou Helm). Ce DaemonSet planifie une réplique du Pod Agent sur chaque nœud du cluster. Chaque Pod Agent est alors responsable de la remontée des journaux des autres Pods et conteneurs sur son nœud respectif. Lorsque la fonctionnalité "Collecter tous les conteneurs" est activée, l'Agent remonte les journaux d'un conteneur avec une étiquette  et  correspondant au nom d'image court du conteneur.

### Filtrage {#filtering}

Lorsque "Collecter tous les conteneurs" est activé, vous pouvez configurer de quels conteneurs vous souhaitez collecter les journaux. Cela peut être utile pour empêcher la collecte des journaux de l'Agent Datadog, si désiré. Vous pouvez le faire en passant des configurations à l'Agent Datadog pour contrôler ce qu'il collecte, ou en passant des configurations au Pod Kubernetes pour exclure certains journaux de manière plus explicite.

Lorsque vous filtrez des journaux par des méthodes comme `DD_CONTAINER_EXCLUDE_LOGS` ou `ad.datadoghq.com/logs_exclude`, l'Agent ignore la collecte de journaux, quelle que soit la configuration de collecte de journaux explicitement définie dans [les annotations d'autodécouverte][19] ou [les fichiers de configuration d'autodécouverte][20].

Lorsque "Container Collect All" est désactivé (par défaut), vous n'avez pas besoin d'ajouter de filtrage car tout est exclu par défaut. Pour inclure la collecte uniquement pour les pods sélectionnés, vous pouvez activer la configuration des journaux par [les annotations d'autodécouverte][19] ou [les fichiers de configuration d'autodécouverte][20] pour les pods souhaités.

Consultez la section [Gestion de la détection des conteneurs][8] (en anglais) pour en savoir plus sur le filtrage.

### Étiquetage {#tagging}

L'Agent Datadog étiquette les journaux des conteneurs Kubernetes avec les [étiquettes Kubernetes par défaut][14], ainsi que toutes les étiquettes extraites personnalisées. Lorsque "Collecter tous les conteneurs" est activé, l'Agent remonte les journaux d'un conteneur en lui associant une étiquette `source` et `service` correspondant au nom d'image court du conteneur. Par exemple, les journaux d'un conteneur utilisant l'image de conteneur `gcr.io/owner/example-image:latest` auraient `example-image` comme valeur d'étiquette `source`, `service` et `short_image`.

L'étiquette `service` peut également être définie par l'étiquette de Pod `tags.datadoghq.com/service: "<SERVICE>"` de [l'étiquetage de service unifié][4]. Pour plus d'informations sur les attributs `source` et `service`, voir [Attributs réservés][11].

L'étiquette `source` peut être importante pour vos journaux, car [les pipelines de journaux prêts à l'emploi][15] sont filtrés en utilisant cette étiquette. Cependant, ces pipelines peuvent être entièrement personnalisés selon vos souhaits. Vous pouvez voir les étapes dans la section [Journaux d'intégration](#integration-logs) ci-dessous pour personnaliser davantage les étiquettes de vos journaux.

## Journaux d'intégration {#integration-logs}

[L'autodécouverte][10] vous permet d'utiliser des modèles pour configurer la collecte de journaux (et d'autres capacités) sur les conteneurs. Cela peut être utilisé pour activer la collecte de journaux, personnaliser l'étiquetage et ajouter des règles de collecte avancées. Pour configurer la collecte de journaux pour une intégration avec l'autodécouverte, vous pouvez soit :

- Spécifier une configuration de journal en tant qu'annotations d'autodécouverte sur un Pod donné, pour configurer les règles pour un conteneur donné *(Recommandé)*
- Spécifier une configuration de journal en tant que fichier de configuration, pour configurer les règles pour chaque conteneur correspondant par image.

Au minimum, ces configurations de journalisation nécessitent une étiquette `source` et une étiquette `service`. Vous souhaiterez peut-être faire correspondre la balise `source` à l'un des [pipelines de journalisation prêts à l'emploi de Datadog][15] pour aider à enrichir automatiquement vos journaux. Vous pouvez également trouver une [bibliothèque de pipelines dans Datadog][16].

### Annotations d'autodécouverte {#autodiscovery-annotations}

Avec Autodiscovery, l’Agent recherche automatiquement les modèles d’intégration dans les annotations des pods.

Pour appliquer une configuration spécifique à un conteneur donné, ajoutez l'annotation `ad.datadoghq.com/<CONTAINER_NAME>.logs` à votre Pod avec la configuration de journalisation au format JSON. 

**Remarque** : Les annotations d'autodécouverte identifient les conteneurs par nom, **pas** par image. Il essaie de faire correspondre `<CONTAINER_NAME>` au `.spec.containers[i].name`, pas à `.spec.containers[i].image`.

<div class="alert alert-info">
Si vous définissez <i>directement</i> vos Pods Kubernetes (avec les annotations appropriées), ajoutez les annotations de chaque Pod dans leur section, comme indiqué dans la section suivante. <code>kind:Pod</code>), ajoutez les annotations de chaque Pod dans son <code>metadata</code> section, comme indiqué dans la section suivante.
<br/><br/>
Si vous définissez <i>indirectement</i> vos Pods Kubernetes (avec des contrôleurs de réplication, des ReplicaSets ou des Déploiements), ajoutez les annotations de Pod au modèle de Pod comme indiqué. <code>.spec.template.metadata</code>.</div>

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

#### Exemple d'annotations d'autodécouverte de journal {#example-log-autodiscovery-annotations}

L'annotation de Pod suivante définit le modèle d'intégration pour un conteneur d'exemple. Il est défini dans les annotations du modèle de Pod, plutôt que sur le Déploiement lui-même. Cette configuration de journalisation définit tous les journaux du conteneur `app` avec les balises `source:java`, `service:example-app`, et la balise supplémentaire `foo:bar`.

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

#### Configurer deux conteneurs différents {#configure-two-different-containers}
Pour appliquer deux modèles d'intégration différents à deux conteneurs différents dans votre Pod, `<CONTAINER_NAME_1>` et `<CONTAINER_NAME_2>`, ajoutez les annotations suivantes à votre Pod :

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

### Fichiers de configuration d'autodécouverte {#autodiscovery-configuration-files}
Vous pouvez fournir à l'Agent Datadog des fichiers de configuration pour que l'Agent exécute une intégration spécifiée lorsqu'il découvre un conteneur utilisant l'identifiant d'image correspondant. Cela vous permet de créer une configuration de journalisation générique qui s'applique à un ensemble d'images de conteneurs.

{{< tabs >}}
{{% tab "Operator Datadog" %}}
Vous pouvez personnaliser la collecte des journaux par intégration avec une surcharge dans le `override.nodeAgent.extraConfd.configDataMap`. Cette méthode crée le ConfigMap et monte le fichier de configuration souhaité sur le conteneur de l'Agent.

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

Le `<CONTAINER_IMAGE>` doit correspondre au nom court de l'image du conteneur auquel vous souhaitez que cela s'applique. Voir le manifeste d'exemple [avec mappage ConfigMap][1] pour un exemple supplémentaire.

[1]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-extraconfd.yaml
{{% /tab %}}

{{% tab "Helm" %}}
Vous pouvez personnaliser la collecte des journaux par intégration dans `datadog.confd`. Cette méthode crée le ConfigMap et monte le fichier de configuration souhaité sur le conteneur de l'Agent.

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

Le `<CONTAINER_IMAGE>` doit correspondre au nom court de l'image du conteneur auquel vous souhaitez que cela s'applique.

{{% /tab %}}

{{% tab "Stockage key/value" %}}
Les commandes etcd suivantes créent un modèle d'intégration Redis avec un paramètre `password` personnalisé et étiquettent les journaux avec les attributs `source` et `service` corrects :

```conf
etcdctl mkdir /datadog/check_configs/redis
etcdctl set /datadog/check_configs/redis/logs '[{"source": "redis", "service": "redis", "tags": ["env:prod"]}]'
```

Remarquez que chacune des trois valeurs est une liste. L'autodécouverte assemble les éléments de la liste dans les configurations d'intégration en fonction des index de liste partagés. Dans ce cas, elle compose la première (et unique) configuration de vérification à partir de `check_names[0]`, `init_configs[0]` et `instances[0]`.

Contrairement aux fichiers de configuration automatique, les **magasins de valeurs clés peuvent utiliser le nom d'image court OU long comme identifiants de conteneur**, par exemple, `redis` OU `redis:latest`.

Autodiscovery peut utiliser [Consul][1], Etcd et Zookeeper comme sources de modèles d'intégration.

Pour utiliser un magasin de valeurs clés, configurez-le dans le fichier de configuration de l'Agent `datadog.yaml` et montez ce fichier à l'intérieur de l'Agent conteneurisé. Sinon, passez votre magasin de valeurs clés en tant que variables d'environnement à l'Agent conteneurisé.

#### Dans `datadog.yaml` {#in-datadogyaml}

Dans le fichier `datadog.yaml`, définissez l'adresse `<KEY_VALUE_STORE_IP>` et `<KEY_VALUE_STORE_PORT>` de votre magasin de valeurs clés :

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

Avec le magasin de valeurs clés activé en tant que source de modèle, l'Agent recherche des modèles sous la clé `/datadog/check_configs`. L'autodécouverte s'attend à une hiérarchie de clés-valeurs comme ceci :

```yaml
/datadog/
  check_configs/
    <CONTAINER_IMAGE>/
      - logs: ["<LOGS_CONFIG>"]
    ...
```

**Remarque** : Pour appliquer une configuration spécifique à un conteneur donné, l'autodécouverte identifie les conteneurs par **image** lors de l'utilisation des magasins de valeurs clés en essayant de faire correspondre `<CONTAINER_IMAGE>` à `.spec.containers[0].image`.

[1]: /fr/integrations/consul/
[2]: /fr/agent/configuration/agent-commands/
{{% /tab %}}
{{< /tabs >}}

Pour associer une configuration de journal à un ensemble de conteneurs avec plus de granularité que le nom d'image court du conteneur, voir [Identifiants de conteneurs d'autodécouverte][22].

## Collecte avancée des journaux {#advanced-log-collection}

Utilisez les étiquettes de log Autodiscovery afin d'appliquer la logique de processing pour la collecte de logs avancée, par exemple :

* [Filtrer les journaux avant de les envoyer à Datadog][5].
* [Nettoyer les données sensibles de vos journaux][6].
* [Procéder à l'agrégation multi-lignes][7].

### À partir d'un fichier journal local de conteneur {#from-a-container-local-log-file}

Datadog recommande d'utiliser les flux de sortie `stdout` et `stderr` pour les applications conteneurisées, afin de pouvoir configurer automatiquement la collecte des journaux.

Cependant, l'Agent peut également collecter directement des journaux à partir d'un fichier basé sur une annotation. Pour collecter ces journaux, utilisez `ad.datadoghq.com/<CONTAINER_NAME>.logs` avec une configuration `type: file` et `path`. Les journaux collectés à partir de fichiers avec une telle annotation sont automatiquement étiquetés avec le même ensemble d'étiquettes que les journaux provenant du conteneur lui-même. Datadog recommande d'utiliser les flux de sortie `stdout` et `stderr` pour les applications conteneurisées, afin de pouvoir configurer automatiquement la collecte des journaux. Pour plus d'informations, voir les [Configurations recommandées](#recommended-configurations).

Ces chemins de fichiers sont **relatifs** au conteneur de l'Agent. Par conséquent, le répertoire contenant le fichier journal doit être monté à la fois dans l'application et le conteneur de l'Agent afin que l'Agent puisse avoir une visibilité appropriée.

Par exemple, vous pouvez le faire avec un volume partagé `hostPath`. Le Pod ci-dessous émet des journaux dans le fichier `/var/log/example/app.log`. Cela se fait dans le répertoire `/var/log/example`, où un volume et un volumeMount ont défini cela comme un `hostPath`.

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
- Cette stratégie peut fonctionner pour un pod donné, mais peut devenir encombrante avec plusieurs applications utilisant cette stratégie. Vous pouvez également rencontrer des problèmes si plusieurs répliques utilisent le même chemin de journal. Si possible, Datadog recommande d'exploiter la variable de modèle [Autodiscovery template variable][17] `%%kube_pod_name%%`. Par exemple, vous pouvez définir votre `path` pour référencer cette variable : `"path": "/var/log/example/%%kube_pod_name%%/app.log"`. Votre pod d'application doit également écrire ses fichiers journaux par rapport à ce nouveau chemin. Vous pouvez utiliser l'[API Downward][18] pour aider votre application à déterminer le nom de son Pod.

- Lorsque vous utilisez ce type d'annotation avec un conteneur, `stdout` et `stderr` les journaux ne sont pas collectés automatiquement à partir du conteneur. Si la collecte à partir des deux flux de sortie du conteneur et du fichier est nécessaire, activez cela explicitement dans l'annotation. Exemple :
  ```yaml
  ad.datadoghq.com/<CONTAINER_IMAGE>.logs: |
    [
      {"type":"file","path":"/var/log/example/app.log","source":"file","service":"example-service"},
      {"source":"container","service":"example-service"}
    ]
  ```

- Lorsque vous utilisez ce type de combinaison, `source` et `service` n'ont pas de valeur par défaut pour les journaux collectés à partir d'un fichier et doivent être définis explicitement dans l'annotation.

## Dépannage {#troubleshooting}

Pour les étapes de dépannage, voir [Dépannage de la collecte des journaux de conteneur][21].

## Lectures complémentaires {#further-reading}

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