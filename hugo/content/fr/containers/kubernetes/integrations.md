---
aliases:
- /fr/agent/autodiscovery/integrations
- /fr/guides/servicediscovery/
- /fr/guides/autodiscovery/
- /fr/agent/kubernetes/integrations
description: Configurez les intégrations de surveillance pour les applications exécutées
  dans Kubernetes à l'aide de modèles d'Autodiscovery
further_reading:
- link: https://www.datadoghq.com/blog/monitor-karpenter-datadog
  tag: Blog
  text: Surveillez Karpenter avec Datadog
- link: /agent/kubernetes/log/
  tag: Documentation
  text: Recueillir les logs de votre application
- link: /agent/kubernetes/apm/
  tag: Documentation
  text: Recueillir les traces de votre application
- link: /agent/kubernetes/prometheus/
  tag: Documentation
  text: Recueillez vos métriques Prometheus
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Limitez la collecte de données à un sous-ensemble de conteneurs
- link: /agent/kubernetes/tag/
  tag: Documentation
  text: Attribuez des tags à toutes les données envoyées par un conteneur
- link: https://www.youtube.com/watch?v=nuxmVf9ByE0
  tag: Vidéo
  text: 'Conseils et astuces Datadog : comment écrire des annotations dans Kubernetes
    avec JSON pour l''Autodiscovery Datadog'
title: Kubernetes et Integrations
---
Cette page explique comment installer et configurer des intégrations pour votre infrastructure Kubernetes à l'aide d'une fonctionnalité Datadog appelée _Autodiscovery_. Cela vous permet d'utiliser des [variables][16] comme `%%host%%` pour remplir dynamiquement vos paramètres de configuration. Pour une explication détaillée du fonctionnement de l'Autodiscovery, consultez [Premiers pas avec les Containers : Autodiscovery][12]. Pour des options d'Autodiscovery avancées, telles que l'exclusion de certains conteneurs de l'Autodiscovery ou la tolérance des pods non prêts, consultez [Gestion de la découverte de conteneurs][23].

Si vous utilisez Docker ou Amazon ECS, consultez [Docker et Integrations][1].

<div class="alert alert-info">
Certaines intégrations Datadog ne fonctionnent pas avec l'Autodiscovery car elles nécessitent des données d'arborescence de processus ou un accès au système de fichiers : <a href="/integrations/ceph">Ceph</a>, <a href="/integrations/varnish">Varnish</a>, <a href="/integrations/postfix">Postfix</a>, <a href="/integrations/cassandra/#agent-check-cassandra-nodetool">Cassandra Nodetool</a> et <a href="/integrations/gunicorn">Gunicorn</a>.<br/><br/>
Pour surveiller des intégrations qui ne sont pas compatibles avec l'Autodiscovery, vous pouvez utiliser un exportateur Prometheus dans le pod pour exposer un endpoint HTTP, puis utiliser l'<a href="/integrations/openmetrics/">intégration OpenMetrics</a> (qui prend en charge l'Autodiscovery) pour trouver le pod et interroger l'endpoint.
</div>

## Configurez votre intégration {#set-up-your-integration}

Certaines intégrations nécessitent des étapes de configuration, telles que la création d'un jeton d'accès ou l'octroi d'une autorisation de lecture au Datadog Agent. Suivez les instructions de la section **Setup** de la documentation de votre intégration.

### Intégrations de la communauté {#community-integrations}
Pour utiliser une intégration qui n'est pas fournie avec le Datadog Agent, vous devez créer une image personnalisée contenant l'intégration souhaitée. Consultez [Utiliser les Integrations de la communauté][13] pour obtenir des instructions.

## Configuration {#configuration}

Certaines intégrations couramment utilisées sont fournies avec une configuration par défaut pour l'Autodiscovery. Consultez [l'auto-configuration d'Autodiscovery][20] pour plus de détails, notamment une liste des intégrations auto-configurées et leurs fichiers de configuration par défaut correspondants. Si votre intégration figure dans cette liste et que la configuration par défaut suffit à votre cas d'utilisation, aucune action supplémentaire n'est requise.

Sinon, configurez une intégration :

1. Choisissez une méthode de configuration : la ressource personnalisée `DatadogInstrumentation` (recommandée), les annotations de pod Kubernetes, un fichier local, une ConfigMap, un magasin clé-valeur, un manifeste Datadog Operator ou un chart Helm.
2. Référez-vous au format de modèle pour la méthode choisie. Chaque format contient des espaces réservés, tels que `<CONTAINER_NAME>`.
3. [Fournissez des valeurs](#placeholder-values) pour ces espaces réservés.

{{< tabs >}}
{{% tab "CRD DatadogInstrumentation" %}}

Vous pouvez configurer les vérifications Autodiscovery et la collecte de logs pour une charge de travail spécifique via la ressource personnalisée `DatadogInstrumentation`, au lieu des annotations de pod. Cela vous permet de mettre à jour ou de supprimer la configuration d'Autodiscovery sans modifier les spécifications des pods ni redémarrer vos pods d'application. Vous pouvez également cibler un `Service` Kubernetes pour planifier des vérifications d'endpoint pour chaque endpoint de ce Service.

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogInstrumentation
metadata:
  name: <CR_NAME>
  namespace: default
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: <WORKLOAD_NAME>
  config:
    checks:
      - integration: <INTEGRATION_NAME>
        containerName: <CONTAINER_NAME>
        initConfig:
          <INIT_CONFIG>
        instances:
          - <INSTANCES_CONFIG>
    logs:
      - containerName: <CONTAINER_NAME>
        <LOGS_CONFIG>
```

Pour les étapes de configuration, le schéma complet de la ressource et les règles de priorité, consultez [Configurer Autodiscovery avec la CRD DatadogInstrumentation][29].

[29]: /fr/containers/guide/configure-autodiscovery-with-the-datadoginstrumentation-crd/

{{% /tab %}}
{{% tab "Annotations" %}}

Si vous définissez vos pods Kubernetes directement avec `kind: Pod`, ajoutez les annotations de chaque pod directement sous sa section `metadata`, comme indiqué :

**Annotations d'Autodiscovery v2** (pour Datadog Agent v7.36+)

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.checks: |
      {
        "<INTEGRATION_NAME>": {
          "init_config": <INIT_CONFIG>,
          "instances": [<INSTANCES_CONFIG>]
        }
      }
    ad.datadoghq.com/<CONTAINER_NAME>.logs: '[<LOGS_CONFIG>]'
    # (...)
spec:
  containers:
    - name: '<CONTAINER_NAME>'
# (...)
```

**Annotations d'Autodiscovery v1**

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.check_names: '[<INTEGRATION_NAME>]'
    ad.datadoghq.com/<CONTAINER_NAME>.init_configs: '[<INIT_CONFIG>]'
    ad.datadoghq.com/<CONTAINER_NAME>.instances: '[<INSTANCES_CONFIG>]'
    ad.datadoghq.com/<CONTAINER_NAME>.logs: '[<LOGS_CONFIG>]'
    # (...)
spec:
  containers:
    - name: '<CONTAINER_NAME>'
# (...)
```

Si vous définissez des pods indirectement (avec des déploiements, des ReplicaSets ou des ReplicationControllers), ajoutez les annotations de pod sous `spec.template.metadata`.

{{% /tab %}}
{{% tab "Fichier local" %}}

Vous pouvez stocker les modèles Autodiscovery sous forme de fichiers locaux dans le répertoire `conf.d` monté (`/etc/datadog-agent/conf.d`). Vous devez redémarrer vos conteneurs d'Agent chaque fois que vous modifiez, ajoutez ou supprimez des modèles.

1. Créez un fichier `conf.d/<INTEGRATION_NAME>.d/conf.yaml` sur votre host :
   ```yaml
   ad_identifiers:
     - <CONTAINER_IMAGE>

   init_config:
     <INIT_CONFIG>

   instances:
     <INSTANCES_CONFIG>

   logs:
     <LOGS_CONFIG>
   ```

2. Montez le dossier `conf.d/` de votre host dans le dossier `conf.d` de l'Agent conteneurisé.

   Pour Datadog Operator :
   ```yaml
   spec:
     override:
       nodeAgent:
         volumes:
           - hostPath:
               path: <PATH_TO_LOCAL_FOLDER>/conf.d
             name: confd
   ```

   Pour Helm :
   ```yaml
   agents:
     volumes:
     - hostPath:
         path: <PATH_TO_LOCAL_FOLDER>/conf.d
       name: confd
     volumeMounts:
     - name: confd
       mountPath: /conf.d
   ```

{{% /tab %}}
{{% tab "ConfigMap" %}}

Vous pouvez utiliser des [ConfigMaps][1] pour définir des configurations en externe et les monter par la suite.

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: "<NAME>-config-map"
  namespace: default
data:
  <INTEGRATION_NAME>-config: |-
    ad_identifiers:
      <CONTAINER_IMAGE>
    init_config:
      <INIT_CONFIG>
    instances:
      <INSTANCES_CONFIG>
    logs:
      <LOGS_CONFIG>
```

[1]: https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap

{{% /tab %}}
{{% tab "Stockage key/value" %}}

Vous pouvez collecter les modèles d'Autodiscovery depuis [Consul][1], [etcd][2] ou [ZooKeeper][3]. Vous pouvez configurer votre magasin clé-valeur dans le fichier de configuration `datadog.yaml` (et monter ce fichier par la suite à l'intérieur du conteneur de l'Agent), ou sous forme de variables d'environnement dans le conteneur de l'Agent.

**Configurez dans datadog.yaml** :

Dans `datadog.yaml`, définissez l'adresse `<KEY_VALUE_STORE_IP>` et `<KEY_VALUE_STORE_PORT>` de votre magasin clé-valeur :

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

[Redémarrez le Datadog Agent][4] pour appliquer vos modifications.

**Configurez dans les variables d'environnement** :

Avec le magasin clé-valeur activé comme source de modèle, l'Agent recherche les modèles sous la clé `/datadog/check_configs`. L'Autodiscovery attend une hiérarchie clé-valeur comme celle-ci :

```yaml
/datadog/
  check_configs/
    <CONTAINER_IMAGE>/
      - check_names: ["<INTEGRATION_NAME>"]
      - init_configs: ["<INIT_CONFIG>"]
      - instances: ["<INSTANCES_CONFIG>"]
      - logs: ["<LOGS_CONFIG>"]
    ...
```

[1]: /fr/integrations/consul/
[2]: /fr/integrations/etcd/
[3]: /fr/integrations/zk/
[4]: /fr/agent/configuration/agent-commands/

{{% /tab %}}
{{% tab "Datadog Operator" %}}

Pour configurer des intégrations dans `datadog-agent.yaml`, ajoutez une surcharge `extraConfd.configDataMap` au composant `nodeAgent` de votre configuration `DatadogAgent`. Chaque clé devient un fichier dans le répertoire `conf.d` de l'Agent.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    [...]
  features:
    [...]
  override:
    nodeAgent:
      extraConfd:
        configDataMap:
          <INTEGRATION_NAME>.yaml: |-
            ad_identifiers:
              - <CONTAINER_IMAGE>
            init_config:
              <INIT_CONFIG>
            instances:
              <INSTANCES_CONFIG>
            logs:
              <LOGS_CONFIG>
```
<div class="alert alert-info">Lorsque plusieurs <code>DatadogAgent</code> CRD déployées utilisent <code>configDataMap</code>, chaque CRD écrit dans une ConfigMap partagée nommée <code>nodeagent-extra-confd</code>. Cela peut entraîner l'écrasement des configurations les unes par les autres. </div>

Pour surveiller un [Cluster Check][1], ajoutez une surcharge `extraConfd.configDataMap` au composant `clusterAgent`. Vous devez également activer les vérifications de cluster en définissant `features.clusterChecks.enabled: true`.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    [...]
  features:
    clusterChecks:
      enabled: true
    [...]
  override:
    nodeAgent:
      [...]
    clusterAgent:
      extraConfd:
        configDataMap:
          <INTEGRATION_NAME>.yaml: |-
            ad_identifiers:
              - <CONTAINER_IMAGE>
            cluster_check: true
            init_config:
              <INIT_CONFIG>
            instances:
              <INSTANCES_CONFIG>
            logs:
              <LOGS_CONFIG>
```

Consultez [Cluster Checks][1] pour plus de contexte.

[1]: /fr/agent/cluster_agent/clusterchecks

{{% /tab %}}
{{% tab "Helm" %}}

Votre fichier `datadog-values.yaml` contient une section `datadog.confd` où vous pouvez définir des modèles d'Autodiscovery. Vous trouverez des exemples intégrés dans le fichier d'exemple [values.yaml][1]. Chaque clé devient un fichier dans le répertoire `conf.d` de l'Agent.

```yaml
datadog:
  confd:
    <INTEGRATION_NAME>.yaml: |-
      ad_identifiers:
        - <CONTAINER_IMAGE>
      init_config:
        <INIT_CONFIG>
      instances:
        <INSTANCES_CONFIG>
      logs:
        <LOGS_CONFIG>
```

Pour surveiller un [Cluster Check][3], définissez votre modèle sous `clusterAgent.confd`. Vous trouverez des exemples intégrés dans le fichier d'exemple [values.yaml][2]. Vous devez également activer le Cluster Agent en définissant `clusterAgent.enabled: true` et les vérifications de cluster en définissant `datadog.clusterChecks.enabled: true`.

```yaml
datadog:
  clusterChecks:
    enabled: true
clusterAgent:
  enabled: true
  confd:
    <INTEGRATION_NAME>.yaml: |-
      ad_identifiers:
        - <CONTAINER_IMAGE>
      cluster_check: true
      init_config:
        <INIT_CONFIG>
      instances:
        <INSTANCES_CONFIG>
      logs:
        <LOGS_CONFIG>
```

Consultez [Cluster Checks][3] pour plus de contexte.

[1]: https://github.com/DataDog/helm-charts/blob/92fd908e3dd7b7149ce02de1fe859ae5ac717d03/charts/datadog/values.yaml#L315-L330
[2]: https://github.com/DataDog/helm-charts/blob/92fd908e3dd7b7149ce02de1fe859ae5ac717d03/charts/datadog/values.yaml#L680-L689
[3]: /fr/agent/cluster_agent/clusterchecks
{{% /tab %}}

{{< /tabs >}}

### Valeurs des espaces réservés {#placeholder-values}

Fournissez les valeurs d'espace réservé comme suit :

`<INTEGRATION_NAME>`
: Le nom de votre intégration Datadog, tel que `etcd` ou `redisdb`.

`<CONTAINER_NAME>`
: Un identifiant à faire correspondre aux noms (`spec.containers[i].name`, **pas** `spec.containers[i].image`) des conteneurs qui correspondent à votre intégration.

`<CONTAINER_IMAGE>`
: Un identifiant à faire correspondre à l'image de conteneur (`.spec.containers[i].image`). <br/><br/>
Par exemple: si vous fournissez `redis` comme identifiant de conteneur, votre modèle d'Autodiscovery est appliqué à tous les conteneurs dont les noms d'image correspondent à `redis`. Si vous avez un conteneur exécutant `foo/redis:latest` et `bar/redis:v2`, votre modèle d'Autodiscovery est appliqué aux deux conteneurs.<br/><br/>
Le paramètre `ad_identifiers` accepte une liste, vous pouvez donc fournir plusieurs identifiants de conteneur. Vous pouvez également utiliser des identifiants personnalisés. Consultez [Identifiants d'Autodiscovery personnalisés][21].

`<INIT_CONFIG>`
: Les paramètres de configuration listés sous `init_config` dans le fichier `<INTEGRATION_NAME>.d/conf.yaml.example` de votre intégration. La section `init_config` est généralement vide.

`<INSTANCES_CONFIG>`
: Les paramètres de configuration listés sous `instances` dans le fichier `<INTEGRATION_NAME>.d/conf.yaml.example` de votre intégration.

`<LOGS_CONFIG>`
: Les paramètres de configuration listés sous `logs` dans le fichier `<INTEGRATION_NAME>.d/conf.yaml.example` de votre intégration.

### Configuration avancée des checks {#advanced-check-configuration}

Personnalisez l'attribution de tags aux checks dans une ressource `DatadogInstrumentation` ou avec des annotations de pod.

#### Cardinalité des tags {#tag-cardinality}

Définissez le niveau de cardinalité des tags pour un check spécifique sur `low`, `orchestrator` ou `high`. Ce paramètre remplace le paramètre global de cardinalité des tags de l'Agent pour les métriques collectées par ce check. S'il est omis, le check hérite du paramètre de l'Agent.

{{< tabs >}}
{{% tab "CRD DatadogInstrumentation" %}}

Définissez `checkTagCardinality` sur l'entrée du check. L'exemple suivant configure un check Redis pour le conteneur `redis` dans le StatefulSet `redis` :

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogInstrumentation
metadata:
  name: redis-instrumentation
  namespace: default
spec:
  targetRef:
    apiVersion: apps/v1
    kind: StatefulSet
    name: redis
  config:
    checks:
      - integration: redisdb
        containerName: redis
        checkTagCardinality: low
        instances:
          - host: "%%host%%"
            port: 6379
```

Pour la configuration et les champs pris en charge, consultez [Configurer Autodiscovery avec la CRD DatadogInstrumentation][29].

[29]: /fr/containers/guide/configure-autodiscovery-with-the-datadoginstrumentation-crd/

{{% /tab %}}
{{% tab "Annotations" %}}

Définissez l'annotation `check_tag_cardinality` :

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.checks: |
      {
        "<INTEGRATION_NAME>": {
          "init_config": <INIT_CONFIG>,
          "instances": [<INSTANCES_CONFIG>]
        }
      }
    ad.datadoghq.com/<CONTAINER_NAME>.check_tag_cardinality: "<low|orchestrator|high>"
spec:
  containers:
    - name: '<CONTAINER_NAME>'
```

{{% /tab %}}
{{< /tabs >}}

Ces paramètres affectent uniquement les métriques collectées par les checks d'intégration, et non les métriques envoyées via DogStatsD. Pour configurer la cardinalité des tags DogStatsD, utilisez le paramètre de configuration global `dogstatsd_tag_cardinality` ou la variable d'environnement `DD_DOGSTATSD_TAG_CARDINALITY`.

Pour plus d'informations sur la cardinalité des tags, consultez [Configuration des tags par check][27].

#### Désactiver les tags d'Autodiscovery {#disable-autodiscovery-tags}

Pour supprimer les tags de conteneur et de pod ajoutés par Autodiscovery, définissez `ignoreAutodiscoveryTags: true` sur l'entrée du check dans `spec.config.checks`. La valeur par défaut est `false`. Ce paramètre ne supprime pas les tags explicitement configurés sur le check ni ceux émis par l'intégration elle-même.

Pour les configurations basées sur des annotations, définissez `ignore_autodiscovery_tags` avec `init_config` et `instances` dans la configuration JSON du check. Par exemple, ajoutez l'annotation suivante à un pod avec un conteneur nommé `redis` :

```yaml
ad.datadoghq.com/redis.checks: |
  {
    "redisdb": {
      "ignore_autodiscovery_tags": true,
      "init_config": {},
      "instances": [{"host": "%%host%%", "port": 6379}]
    }
  }
```

### Auto-configuration {#auto-configuration}

Le Datadog Agent reconnaît et fournit automatiquement une configuration de base pour certaines technologies courantes. Pour obtenir la liste complète, consultez [Auto-configuration d'Autodiscovery][20].

Les configurations définies avec des annotations Kubernetes prévalent sur les ressources `DatadogInstrumentation` et l'auto-configuration. Les ressources `DatadogInstrumentation` prévalent sur la configuration statique, y compris l'auto-configuration et les configurations définies avec Datadog Operator ou Helm. Pour utiliser Datadog Operator ou Helm afin de configurer une intégration figurant dans la liste [Auto-configuration d'Autodiscovery][20], vous devez [désactiver l'auto-configuration][22].

## Sécurité des Integrations {#integrations-security}

Les intégrations ont souvent besoin de lire des fichiers de configuration, des certificats ou d'autres ressources depuis le système de fichiers. Lorsque les chemins de fichiers proviennent de fournisseurs de configuration non approuvés (par exemple, des annotations de pod ou de l'Autodiscovery des services externes), il existe un risque de traversée de répertoire ou d'accès non autorisé aux fichiers.

À partir de la version 7.78.0 du Datadog Agent, vous pouvez définir les paramètres suivants dans le `datadog.yaml` de l'Agent pour contrôler l'accès au système de fichiers en fonction du niveau de confiance d'un fournisseur de configuration.

| Paramètre | Type | Par défaut | Description |
|-----------|------|---------|-------------|
| `integration_ignore_untrusted_file_params` | bool | `false` | Lorsqu'il est activé, les intégrations ignorent les paramètres de configuration qui font référence à des chemins de fichiers si le fournisseur de configuration n'est pas approuvé. |
| `integration_file_paths_allowlist` | list | `[]` | Liste des chemins de fichiers auxquels les intégrations sont autorisées à accéder, même lorsqu'ils sont fournis par un fournisseur de configuration non approuvé. Une liste vide signifie que tous les chemins de fichiers sont autorisés. |
| `integration_trusted_providers` | list | `["file", "remote-config"]` | Liste des fournisseurs de configuration considérés comme approuvés. Tout fournisseur ne figurant pas dans cette liste est considéré comme non approuvé. Par défaut, les fichiers de configuration locaux (`file`) et Datadog Remote Configuration (`remote-config`) sont considérés comme fiables. Pour obtenir la liste complète des fournisseurs pris en charge, consultez les [noms des fournisseurs du Datadog Agent][28]. |
| `integration_security_excluded_checks` | list | `[]` | Liste des noms d'intégrations exclus des restrictions de sécurité ci-dessus. |

Ces options sont rétrocompatibles : les valeurs par défaut préservent le comportement existant. Pour activer cette fonctionnalité, activez `integration_ignore_untrusted_file_params` et ajustez les autres paramètres en fonction de votre environnement.

Exemple `datadog.yaml` :

```yaml
integration_ignore_untrusted_file_params: true
integration_file_paths_allowlist:
  - /etc/datadog-agent/certs
  - /var/run/secrets
integration_trusted_providers:
  - file
  - remote-config
integration_security_excluded_checks:
  - <INTEGRATION_NAME>
```

Avec cette configuration, une intégration configurée via des annotations de pod (un fournisseur non approuvé) ne peut pas référencer des chemins de fichiers en dehors de `/etc/datadog-agent/certs` ou `/var/run/secrets`, à moins que le nom de l'intégration ne soit répertorié dans `integration_security_excluded_checks`.

## Exemple : intégration Postgres {#example-postgres-integration}

Dans cet exemple de scénario, vous avez déployé Postgres sur Kubernetes. Vous souhaitez installer et configurer l'[intégration Datadog-Postgres][26]. Tous vos conteneurs Postgres ont des noms de conteneur qui contiennent la chaîne `postgres`.

Tout d'abord, consultez la [documentation de l'intégration Postgres][26] pour connaître les étapes de configuration supplémentaires. L'intégration Postgres nécessite que vous créiez un utilisateur en lecture seule nommé `datadog` et que vous stockiez le mot de passe correspondant sous forme de variable d'environnement nommée `PG_PASSWORD`.

Si vous deviez configurer cette intégration **sur un host**, vous pourriez consulter [`postgresql.d/conf.yaml.example`][15] pour les paramètres et créer un fichier `postgresql.d/conf.yaml` contenant ce qui suit :

```yaml
init_config:
instances:
  - host: localhost
    port: 5432
    username: datadog
    password: <PASSWORD>
logs:
  - type: file
    path: /var/log/postgres.log
    source: postgresql
    service: pg_service
```

Ici, `<PASSWORD>` correspond au mot de passe de l'utilisateur `datadog` que vous avez créé.

Pour appliquer cette configuration à vos conteneurs Postgres :

{{< tabs >}}
{{% tab "CRD DatadogInstrumentation" %}}

Créez la ressource suivante dans le namespace de la charge de travail Postgres ciblée :

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogInstrumentation
metadata:
  name: postgres-instrumentation
  namespace: <WORKLOAD_NAMESPACE>
spec:
  targetRef:
    apiVersion: apps/v1
    kind: StatefulSet
    name: postgres
  config:
    checks:
      - integration: postgres
        containerName: postgres
        instances:
          - host: "%%host%%"
            port: 5432
            username: datadog
            password: "%%env_PG_PASSWORD%%"
    logs:
      - containerName: postgres
        type: file
        path: /var/log/postgres.log
        source: postgresql
        service: pg_service
```

Utilisez la version de l'API, le type et le nom de votre charge de travail dans `targetRef`. L'Agent doit avoir accès à `/var/log/postgres.log` pour collecter le fichier. Pour plus d'informations, consultez [Collecter les journaux à partir d'un fichier journal local d'un conteneur][30].

Enregistrez la ressource sous `postgres-instrumentation.yaml`, appliquez-la et vérifiez son statut :

```shell
kubectl apply -f postgres-instrumentation.yaml
kubectl describe datadoginstrumentation postgres-instrumentation -n <WORKLOAD_NAMESPACE>
```

[30]: /fr/containers/kubernetes/log/#from-a-container-local-log-file

{{% /tab %}}
{{% tab "Annotations" %}}

Dans votre manifeste de pod :

**Annotations d'Autodiscovery v2** (pour Datadog Agent v7.36+)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: postgres
  annotations:
    ad.datadoghq.com/postgres.checks: |
      {
        "postgres": {
          "instances": [
            {
              "host": "%%host%%",
              "port": "5432",
              "username": "datadog",
              "password":"%%env_PG_PASSWORD%%"
            }
          ]
        }
      }
    ad.datadoghq.com/postgres.logs: |
      [
        {
          "type": "file",
          "path": "/var/log/postgres.log",
          "source": "postgresql",
          "service": "pg_service"
        }
      ]
spec:
  containers:
    - name: postgres
```

**Annotations d'Autodiscovery v1**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: postgres
  annotations:
    ad.datadoghq.com/postgres.check_names: '["postgres"]'
    ad.datadoghq.com/postgres.init_configs: '[{}]'
    ad.datadoghq.com/postgres.instances: |
      [
        {
          "host": "%%host%%",
          "port": "5432",
          "username": "datadog",
          "password":"%%env_PG_PASSWORD%%"
        }
      ]
    ad.datadoghq.com/postgres.logs: |
      [
        {
          "type": "file",
          "path": "/var/log/postgres.log",
          "source": "postgresql",
          "service": "pg_service"
        }
      ]
spec:
  containers:
    - name: postgres
```

{{% /tab %}}
{{% tab "Fichier local" %}}
1. Créez un fichier `conf.d/postgresql.d/conf.yaml` sur votre host :

   ```yaml
   ad_identifiers:
     - postgres
   init config:
   instances:
     - host: "%%host%%"
       port: "5432"
       username: "datadog"
       password: "%%env_PG_PASSWORD%%"
   logs:
     - type: "file"
       path: "/var/log/postgres.log"
       source: "postgresql"
       service: "pg_service"
   ```

2. Montez le dossier `conf.d/` de votre host dans le dossier `conf.d` de l'Agent conteneurisé.

   Pour Datadog Operator :
   ```yaml
   spec:
     override:
       nodeAgent:
         volumes:
           - hostPath:
               path: <PATH_TO_LOCAL_FOLDER>/conf.d
             name: confd
   ```

   Pour Helm :
   ```yaml
   agents:
     volumes:
     - hostPath:
         path: <PATH_TO_LOCAL_FOLDER>/conf.d
       name: confd
     volumeMounts:
     - name: confd
       mountPath: /conf.d
   ```

{{% /tab %}}
{{% tab "ConfigMap" %}}

Dans une ConfigMap :

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: postgresql-config-map
  namespace: default
data:
  postgresql-config: |-
    ad_identifiers:
      - postgres
    init_config:
    instances:
      - host: "%%host%%"
        port: "5432"
        username: "datadog"
        password: "%%env_PG_PASSWORD%%"
    logs:
      - type: "file"
        path: "/var/log/postgres.log"
        source: "postgresql"
        service: "pg_service"
```

Ensuite, dans votre manifeste, définissez `volumeMounts` et `volumes` :

```yaml
# [...]
        volumeMounts:
        # [...]
          - name: postgresql-config-map
            mountPath: /etc/datadog-agent/conf.d/postgresql.d
        # [...]
      volumes:
      # [...]
        - name: postgresql-config-map
          configMap:
            name: postgresql-config-map
            items:
              - key: postgresql-config
                path: conf.yaml
# [...]
```

{{% /tab %}}
{{% tab "Stockage key/value" %}}

Les commandes etcd suivantes créent un modèle d'intégration Postgres avec un paramètre `password` personnalisé :

```conf
etcdctl mkdir /datadog/check_configs/postgres
etcdctl set /datadog/check_configs/postgres/check_names '["postgres"]'
etcdctl set /datadog/check_configs/postgres/init_configs '[{}]'
etcdctl set /datadog/check_configs/postgres/instances '[{"host": "%%host%%","port":"5432","username":"datadog","password":"%%env_PG_PASSWORD%%"}]'
```

Notez que chacune des trois valeurs est une liste. L'Autodiscovery assemble les éléments de liste dans les configurations d'intégration en fonction des index de liste partagés. Dans ce cas, il compose la première (et unique) configuration de check à partir de `check_names[0]`, `init_configs[0]` et `instances[0]`.

{{% /tab %}}
{{% tab "Datadog Operator" %}}

Dans `datadog-agent.yaml` :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    [...]
  features:
    [...]
  override:
    nodeAgent:
      extraConfd:
        configDataMap:
          postgres.yaml: |-
            ad_identifiers:
              - postgres
            init_config:
            instances:
              - host: "%%host%%"
                port: 5432
                username: "datadog"
                password: "%%env_PG_PASSWORD%%"
```
En conséquence, l'Agent contient un fichier `postgres.yaml` avec la configuration ci-dessus dans le répertoire `conf.d`.

{{% /tab %}}
{{% tab "Helm" %}}

Dans `datadog-values.yaml` :

```yaml
datadog:
  confd:
    postgres.yaml: |-
      ad_identifiers:
        - postgres
      init_config:
      instances:
        - host: "%%host%%"
          port: 5432
          username: "datadog"
          password: "%%env_PG_PASSWORD%%"
```
En conséquence, l'Agent contient un fichier `postgres.yaml` avec la configuration ci-dessus dans le répertoire `conf.d`.

{{% /tab %}}
{{< /tabs >}}

Ces modèles utilisent des [variables de modèle d'Autodiscovery][16] :
- `%%host%%` est rempli dynamiquement avec l'IP du conteneur.
- `%%env_PG_PASSWORD%%` fait référence à une variable d'environnement nommée `PG_PASSWORD`, telle que la voit le processus de l'Agent.

Pour d'autres exemples, notamment sur la configuration de plusieurs checks pour plusieurs ensembles de conteneurs, consultez [Autodiscovery : Scénarios et exemples][24].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/docker/integrations/
[2]: /fr/getting_started/integrations/#configuring-agent-integrations
[3]: /fr/agent/configuration/secrets-management/
[4]: /fr/integrations/ceph/
[5]: /fr/integrations/varnish/#autodiscovery
[6]: /fr/integrations/postfix/
[7]: /fr/integrations/cassandra/#agent-check-cassandra-nodetool
[8]: /fr/integrations/gunicorn/
[9]: /fr/integrations/apache/#setup
[10]: /fr/integrations/http_check/#setup
[11]: /fr/getting_started/integrations/
[12]: /fr/getting_started/containers/autodiscovery
[13]: /fr/agent/guide/use-community-integrations/
[14]: /fr/integrations/redis
[15]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[16]: /fr/containers/guide/template_variables/
[17]: /fr/integrations/coredns
[18]: /fr/integrations/etcd/
[19]: /fr/integrations/kube_apiserver_metrics
[20]: /fr/containers/guide/auto_conf
[21]: /fr/containers/guide/ad_identifiers
[22]: /fr/containers/guide/auto_conf/#disable-auto-configuration
[23]: /fr/containers/guide/autodiscovery-management
[24]: /fr/containers/guide/autodiscovery-examples
[25]: /fr/integrations/istio/
[26]: /fr/integrations/postgres
[27]: /fr/getting_started/integrations/#per-check-tag-configuration
[28]: https://github.com/DataDog/datadog-agent/blob/main/comp/core/autodiscovery/providers/names/provider_names.go#L10-L38