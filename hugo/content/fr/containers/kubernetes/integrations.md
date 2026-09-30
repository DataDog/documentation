---
aliases:
- /fr/agent/autodiscovery/integrations
- /fr/guides/servicediscovery/
- /fr/guides/autodiscovery/
- /fr/agent/kubernetes/integrations
description: Configurez les intégrations de surveillance pour les applications s'exécutant
  dans Kubernetes en utilisant des modèles d'autodécouverte
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
  text: 'Conseils et astuces Datadog : Comment écrire des annotations dans Kubernetes
    avec JSON pour Autodiscovery Datadog'
title: Kubernetes et intégrations
---
Cette page couvre comment installer et configurer des intégrations pour votre infrastructure Kubernetes en utilisant une fonctionnalité de Datadog connue sous le nom de _Autodiscovery_. Cela vous permet d'utiliser [variables][16] comme `%%host%%` pour peupler dynamiquement vos paramètres de configuration. Pour une explication détaillée du fonctionnement d'Autodiscovery, consultez [Getting Started with Containers: Autodiscovery][12]. Pour des options avancées d'Autodiscovery, telles que l'exclusion de certains conteneurs d'Autodiscovery ou la tolérance des pods non prêts, consultez [Container Discovery Management][23].

Si vous utilisez Docker ou Amazon ECS, consultez [Docker et intégrations][1].

<div class="alert alert-info">
Certaines intégrations Datadog ne fonctionnent pas avec l'autodécouverte car elles nécessitent soit des données d'arbre de processus, soit un accès au système de fichiers : <a href="/integrations/ceph">Ceph</a>, <a href="/integrations/varnish">Varnish</a>, <a href="/integrations/postfix">Postfix</a>, <a href="/integrations/cassandra/#agent-check-cassandra-nodetool">Cassandra Nodetool</a>, et <a href="/integrations/gunicorn">Gunicorn</a>.<br/><br/>
Pour surveiller les intégrations qui ne sont pas compatibles avec l'autodécouverte, vous pouvez utiliser un exportateur Prometheus dans le pod pour exposer un point de terminaison HTTP, puis utiliser l'<a href="/integrations/openmetrics/">intégration OpenMetrics</a> (qui prend en charge l'autodécouverte) pour trouver le pod et interroger le point de terminaison.
</div>

## Configurez votre intégration {#set-up-your-integration}

Certaines intégrations nécessitent des étapes de configuration, telles que la création d'un jeton d'accès ou l'octroi d'une autorisation de lecture à l'Agent Datadog. Suivez les instructions dans la section **Setup** de la documentation de votre intégration.

### Intégrations communautaires {#community-integrations}
Pour utiliser une intégration qui n'est pas fournie avec l'Agent Datadog, vous devez créer une image personnalisée contenant l'intégration souhaitée. Consultez [Utiliser des intégrations communautaires][13] pour les instructions.

## Configuration {#configuration}

Certaines intégrations couramment utilisées sont livrées avec une configuration par défaut pour Autodiscovery. Consultez [Autodiscovery auto-configuration][20] pour plus de détails, y compris une liste des intégrations auto-configurées et leurs fichiers de configuration par défaut correspondants. Si votre intégration figure dans cette liste et que la configuration par défaut est suffisante pour votre cas d'utilisation, aucune action supplémentaire n'est requise.

Sinon :

1. Choisissez une méthode de configuration (annotations de pod Kubernetes, un fichier local, un ConfigMap, un magasin clé-valeur, un manifeste Datadog Operator ou un graphique Helm) qui convient à votre cas d'utilisation.
2. Référez-vous au format de modèle pour votre méthode choisie. Chaque format contient des espaces réservés, tels que `<CONTAINER_NAME>`.
3. [Fournissez des valeurs](#placeholder-values) pour ces espaces réservés.

{{< tabs >}}
{{% tab "Annotations" %}}

Si vous définissez vos pods Kubernetes directement avec `kind: Pod`, ajoutez les annotations de chaque pod directement sous sa section `metadata` :

**Autodiscovery annotations v2** (pour Datadog Agent v7.36+)

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

**Autodiscovery annotations v1**

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

Vous pouvez stocker des modèles Autodiscovery en tant que fichiers locaux dans le répertoire monté `conf.d` (`/etc/datadog-agent/conf.d`). Vous devez redémarrer vos conteneurs Agent chaque fois que vous modifiez, ajoutez ou supprimez des modèles.

1. Créez un fichier `conf.d/<INTEGRATION_NAME>.d/conf.yaml` sur votre hôte :
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

2. Montez votre dossier `conf.d/` de l'hôte dans le dossier `conf.d` de l'Agent conteneurisé.

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

Vous pouvez utiliser [ConfigMaps][1] pour définir des configurations externes et les monter par la suite.

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

Vous pouvez obtenir des modèles Autodiscovery à partir de [Consul][1], [etcd][2] ou [ZooKeeper][3]. Vous pouvez configurer votre magasin clé-valeur dans le fichier de configuration `datadog.yaml` (et le monter ensuite dans le conteneur Agent), ou en tant que variables d'environnement dans le conteneur Agent.

**Configurer dans datadog.yaml** :

Dans `datadog.yaml`, définissez l'adresse `<KEY_VALUE_STORE_IP>` et `<KEY_VALUE_STORE_PORT>` de votre magasin de clés-valeurs :

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

[Redémarrez l'Agent Datadog][4] pour appliquer vos modifications.

**Configurer dans les variables d'environnement** :

Avec le magasin de clés-valeurs activé en tant que source de modèle, l'Agent recherche des modèles sous la clé `/datadog/check_configs`. Autodiscovery attend une hiérarchie de clés-valeurs comme ceci :

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
{{% tab "Operator Datadog" %}}

Pour configurer les intégrations dans `datadog-agent.yaml`, ajoutez un remplacement `extraConfd.configDataMap` au composant `nodeAgent` de votre configuration `DatadogAgent`. Chaque clé devient un fichier dans le répertoire `conf.d` de l'Agent.

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
<div class="alert alert-info">Lorsque plusieurs déployés <code>DatadogAgent</code> Les CRDs utilisent <code>configDataMap</code>, chaque CRD écrit dans un ConfigMap partagé nommé <code>nodeagent-extra-confd</code>. Cela peut entraîner des configurations qui se remplacent mutuellement. </div>

Pour surveiller un [Cluster Check][1], ajoutez un remplacement `extraConfd.configDataMap` au composant `clusterAgent`. Vous devez également activer les vérifications de cluster en définissant `features.clusterChecks.enabled: true`.

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

Voir [Cluster Checks][1] pour plus de contexte.

[1]: /fr/agent/cluster_agent/clusterchecks

{{% /tab %}}
{{% tab "Helm" %}}

Votre fichier `datadog-values.yaml` contient une section `datadog.confd` où vous pouvez définir des modèles Autodiscovery. Vous pouvez trouver des exemples en ligne dans l'échantillon [values.yaml][1]. Chaque clé devient un fichier dans le répertoire `conf.d` de l'Agent.

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

Pour surveiller un [Cluster Check][3], définissez votre modèle sous `clusterAgent.confd`. Vous pouvez trouver des exemples en ligne dans l'échantillon [values.yaml][2]. Vous devez également activer l'Agent de Cluster en définissant `clusterAgent.enabled: true` et activer les vérifications de cluster en définissant `datadog.clusterChecks.enabled: true`.

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

Voir [Vérifications de Cluster][3] pour plus de contexte.

[1]: https://github.com/DataDog/helm-charts/blob/92fd908e3dd7b7149ce02de1fe859ae5ac717d03/charts/datadog/values.yaml#L315-L330
[2]: https://github.com/DataDog/helm-charts/blob/92fd908e3dd7b7149ce02de1fe859ae5ac717d03/charts/datadog/values.yaml#L680-L689
[3]: /fr/agent/cluster_agent/clusterchecks
{{% /tab %}}

{{< /tabs >}}

### Valeurs de remplacement {#placeholder-values}

Fournissez les valeurs de remplacement comme suit :

`<INTEGRATION_NAME>`
: Le nom de votre intégration Datadog, tel que `etcd` ou `redisdb`.

`<CONTAINER_NAME>`
: Un identifiant à faire correspondre avec les noms (`spec.containers[i].name`, **pas** `spec.containers[i].image`) des conteneurs qui correspondent à votre intégration.

`<CONTAINER_IMAGE>`
: Un identifiant à faire correspondre avec l'image du conteneur (`.spec.containers[i].image`). <br/><br/>
Par exemple: si vous fournissez `redis` comme identifiant de conteneur, votre modèle d'Autodécouverte est appliqué à tous les conteneurs dont les noms d'image correspondent à `redis`. Si vous avez un conteneur exécutant `foo/redis:latest` et `bar/redis:v2`, votre modèle d'Autodécouverte est appliqué aux deux conteneurs.<br/><br/>
Le paramètre `ad_identifiers` prend une liste, vous pouvez donc fournir plusieurs identifiants de conteneur. Vous pouvez également utiliser des identifiants personnalisés. Voir [Identifiants d'autodécouverte personnalisés][21].

`<INIT_CONFIG>`
: Les paramètres de configuration énumérés sous `init_config` dans le fichier `<INTEGRATION_NAME>.d/conf.yaml.example` de votre intégration. La section `init_config` est généralement vide.

`<INSTANCES_CONFIG>`
: Les paramètres de configuration énumérés sous `instances` dans le fichier `<INTEGRATION_NAME>.d/conf.yaml.example` de votre intégration.

`<LOGS_CONFIG>`
: Les paramètres de configuration énumérés sous `logs` dans le fichier `<INTEGRATION_NAME>.d/conf.yaml.example` de votre intégration.

### Paramètres d'annotation avancés {#advanced-annotation-parameters}

En plus des annotations d'Autodécouverte de base pour les vérifications, les journaux et les instances, vous pouvez utiliser des annotations supplémentaires pour personnaliser le comportement des vérifications :

#### Cardinalité des tags {#tag-cardinality}

Définissez le niveau de cardinalité des tags pour une vérification spécifique en utilisant l'annotation `check_tag_cardinality`. Cela remplace le paramètre de cardinalité des tags de l'agent pour les métriques collectées par cette vérification.

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

<div class="alert alert-info">Le <code>check_tag_cardinality</code> l'annotation n'affecte que les métriques collectées par les vérifications d'intégration. Elle n'affecte pas les métriques envoyées via DogStatsD. Pour configurer la cardinalité des tags DogStatsD, utilisez le global <code>dogstatsd_tag_cardinality</code> paramètre de configuration ou la <code>DD_DOGSTATSD_TAG_CARDINALITY</code> variable d'environnement.</div>

Pour plus d'informations sur la cardinalité des tags, consultez [Configuration des tags par vérification][27].

### Auto-configuration {#auto-configuration}

L'agent Datadog reconnaît automatiquement et fournit une configuration de base pour certaines technologies courantes. Pour une liste complète, consultez [Autodiscovery auto-configuration][20].

Les configurations définies avec des annotations Kubernetes ont la priorité sur l'auto-configuration, mais l'auto-configuration a la priorité sur les configurations définies avec Datadog Operator ou Helm. Pour utiliser Datadog Operator ou Helm pour configurer une intégration dans la liste [Auto-configuration de l'autodécouverte][20], vous devez [désactiver l'auto-configuration][22].

## Sécurité des intégrations {#integrations-security}

Les intégrations ont souvent besoin de lire des fichiers de configuration, des certificats ou d'autres ressources à partir du système de fichiers. Lorsque les chemins de fichiers proviennent de fournisseurs de configuration non fiables (par exemple, des annotations de pod ou l'autodécouverte de services externes), il existe un risque de traversée de chemin ou d'accès non autorisé aux fichiers.

À partir de la version 7.78.0 de l'agent Datadog, vous pouvez définir les paramètres suivants dans le `datadog.yaml` de l'agent pour contrôler l'accès au système de fichiers en fonction du niveau de confiance d'un fournisseur de configuration.

| Paramètre | Type | Par défaut | Description |
|-----------|------|---------|-------------|
| `integration_ignore_untrusted_file_params` | bool | `false` | Lorsqu'il est activé, les intégrations ignorent les paramètres de configuration qui se réfèrent à des chemins de fichiers si le fournisseur de configuration n'est pas fiable. |
| `integration_file_paths_allowlist` | Liste | `[]` | Liste des chemins de fichiers auxquels les intégrations sont autorisées à accéder, même lorsqu'ils sont fournis par un fournisseur de configuration non fiable. Une liste vide signifie que tous les chemins de fichiers sont autorisés. |
| `integration_trusted_providers` | liste | `["file", "remote-config"]` | Liste des fournisseurs de configuration considérés comme fiables. Tout fournisseur qui ne figure pas dans cette liste est considéré comme non fiable. Par défaut, les fichiers de configuration locaux (`file`) et la configuration distante de Datadog (`remote-config`) sont fiables. Pour la liste complète des fournisseurs pris en charge, voir [Noms des fournisseurs de l'agent Datadog][28]. |
| `integration_security_excluded_checks` | liste | `[]` | Liste des noms d'intégration qui sont exclus des restrictions de sécurité ci-dessus. |

Ces options sont compatibles avec les versions antérieures : les valeurs par défaut préservent le comportement existant. Pour activer cette option, activez `integration_ignore_untrusted_file_params` et ajustez les paramètres restants pour qu'ils correspondent à votre environnement.

Exemple `datadog.yaml` :

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

Avec cette configuration, une intégration configurée via des annotations de pod (un fournisseur non fiable) ne peut pas référencer des chemins de fichiers en dehors de `/etc/datadog-agent/certs` ou `/var/run/secrets`, à moins que le nom de l'intégration ne figure dans `integration_security_excluded_checks`.

## Exemple : intégration Postgres {#example-postgres-integration}

Dans ce scénario d'exemple, vous avez déployé Postgres sur Kubernetes. Vous souhaitez configurer et mettre en place l'[intégration Datadog-Postgres][26]. Tous vos conteneurs Postgres ont des noms de conteneur contenant la chaîne `postgres`.

Tout d'abord, consultez la [documentation de l'intégration Postgres][26] pour toute étape de configuration supplémentaire. L'intégration Postgres nécessite que vous créiez un utilisateur en lecture seule nommé `datadog` et que vous stockiez le mot de passe correspondant en tant que variable d'environnement nommée `PG_PASSWORD`.

Si vous deviez configurer cette intégration **sur un hôte**, vous pourriez vous référer à [`postgresql.d/conf.yaml.example`][15] pour les paramètres et créer un fichier `postgresql.d/conf.yaml` contenant ce qui suit :

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

Pour appliquer cette configuration à vos conteneurs Postgres :

{{< tabs >}}
{{% tab "Annotations" %}}

Dans le manifeste de votre pod :

**Annotations d'autodécouverte v2** (pour l'agent Datadog v7.36+)

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

**Annotations d'autodécouverte v1**

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
1. Créez un fichier `conf.d/postgresql.d/conf.yaml` sur votre hôte :

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

2. Montez votre dossier `conf.d/` de l'hôte dans le dossier `conf.d` de l'Agent conteneurisé.

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

Ensuite, dans votre manifeste, définissez le `volumeMounts` et le `volumes` :

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

Les commandes etcd suivantes créent un modèle d'intégration Postgres avec un paramètre `password` personnalisé :

```conf
etcdctl mkdir /datadog/check_configs/postgres
etcdctl set /datadog/check_configs/postgres/check_names '["postgres"]'
etcdctl set /datadog/check_configs/postgres/init_configs '[{}]'
etcdctl set /datadog/check_configs/postgres/instances '[{"host": "%%host%%","port":"5432","username":"datadog","password":"%%env_PG_PASSWORD%%"}]'
```

Remarquez que chacune des trois valeurs est une liste. L'autodécouverte assemble les éléments de la liste dans les configurations d'intégration en fonction des index de liste partagés. Dans ce cas, elle compose la première (et unique) configuration de vérification à partir de `check_names[0]`, `init_configs[0]` et `instances[0]`.

{{% /tab %}}
{{% tab "Operator Datadog" %}}

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

Ces modèles utilisent des [variables de modèle d'autodécouverte][16] :
- `%%host%%` est peuplé dynamiquement avec l'IP du conteneur.
- `%%env_PG_PASSWORD%%` fait référence à une variable d'environnement nommée `PG_PASSWORD` telle que vue par le processus de l'Agent.

Pour plus d'exemples, y compris comment configurer plusieurs vérifications pour plusieurs ensembles de conteneurs, voir [Autodécouverte : Scénarios et Exemples][24].

## Lectures complémentaires {#further-reading}

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