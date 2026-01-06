---
aliases:
- /fr/agent/docker/integrations
description: Configurer des intégrations de surveillance pour les applications s'exécutant
  dans des conteneurs Docker à l'aide d'Autodiscovery
further_reading:
- link: /agent/docker/log/
  tag: Documentation
  text: Recueillir vos logs
- link: /agent/docker/apm/
  tag: Documentation
  text: Recueillir les traces de vos applications
- link: /agent/docker/prometheus/
  tag: Documentation
  text: Recueillir vos métriques Prometheus
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Limiter la collecte de données à un sous-ensemble de conteneurs
- link: /agent/docker/tag/
  tag: Documentation
  text: Attribuer des tags à toutes les données envoyées par un conteneur
title: Docker et intégrations
---

Cette page explique comment installer et configurer des intégrations pour votre infrastructure Docker en utilisant une fonctionnalité Datadog appelée _Autodiscovery_. Autodiscovery vous permet d'utiliser des [variables][1] comme `%%host%%` pour renseigner dynamiquement vos paramètres de configuration.

Pour obtenir une explication détaillée du fonctionnement d'Autodiscovery, consultez la section [Débuter avec les conteneurs : Autodiscovery][2]. Pour les options avancées d'Autodiscovery, telles que l'exclusion de certains conteneurs d'Autodiscovery ou la tolérance des pods non prêts, consultez la section [Gestion de la découverte de conteneurs][3].

Si vous utilisez Kubernetes, consultez la section [Kubernetes et intégrations][4].

<div class="alert alert-info">
Les intégrations Datadog suivantes ne fonctionnent pas avec Autodiscovery car elles nécessitent soit des données d'arborescence de processus, soit un accès au système de fichiers : <a href="/integrations/ceph">Ceph</a>, <a href="/integrations/varnish">Varnish</a>, <a href="/integrations/postfix">Postfix</a>, <a href="/integrations/cassandra/#agent-check-cassandra-nodetool">Cassandra Nodetool</a> et <a href="/integrations/gunicorn">Gunicorn</a>.<br/><br/>
Pour surveiller les intégrations qui ne sont pas compatibles avec Autodiscovery, vous pouvez utiliser un exportateur Prometheus dans le pod pour exposer un endpoint HTTP, puis utiliser l'<a href="/integrations/openmetrics/">intégration OpenMetrics</a> (qui prend en charge Autodiscovery) pour trouver le pod et interroger l'endpoint.
</div>

## Configurer votre intégration

Certaines intégrations nécessitent des étapes de configuration, telles que la création d'un token d'accès ou l'octroi d'une autorisation de lecture à l'Agent Datadog. Suivez les instructions de la section **Configuration** de la documentation de votre intégration.

### Intégrations de la communauté
Pour utiliser une intégration qui n'est pas fournie avec l'Agent Datadog, vous devez créer une image personnalisée contenant l'intégration souhaitée. Consultez la section [Utiliser des intégrations de la communauté][5] pour obtenir des instructions.

## Configuration

Certaines intégrations couramment utilisées sont fournies avec une configuration par défaut pour Autodiscovery. Consultez la section [Configuration automatique d'Autodiscovery][6] pour obtenir des détails, notamment une liste des intégrations configurées automatiquement et leurs fichiers de configuration par défaut correspondants. Si votre intégration figure dans cette liste et que la configuration par défaut est suffisante pour votre cas d'utilisation, aucune action supplémentaire n'est requise.

Sinon :

1. Choisissez une méthode de configuration (labels Docker, un fichier local ou un key-value store) adaptée à votre cas d'utilisation.
2. Référencez le format de modèle pour la méthode choisie. Chaque format contient des espaces réservés, tels que `<CONTAINER_IMAGE>`.
3. [Fournissez des valeurs](#valeurs-des-espaces-reserves) pour ces espaces réservés.

{{< tabs >}}
{{% tab "Labels" %}}

#### Dockerfile

Pour l'Agent Datadog 7.36+ :

```yaml
LABEL "com.datadoghq.ad.checks"='{"<INTEGRATION_NAME>": {"instances": [<INSTANCE_CONFIG>], "logs": [<LOGS_CONFIG>]}}'
```

Pour les versions antérieures de l'Agent :

```yaml
LABEL "com.datadoghq.ad.check_names"='[<INTEGRATION_NAME>]'
LABEL "com.datadoghq.ad.init_configs"='[<INIT_CONFIG>]'
LABEL "com.datadoghq.ad.instances"='[<INSTANCE_CONFIG>]'
LABEL "com.datadoghq.ad.logs"='[<LOGS_CONFIG>]'
```

#### docker-compose.yaml

Pour l'Agent Datadog 7.36+ :

```yaml
labels :
  com.datadoghq.ad.checks : '{"<INTEGRATION_NAME>" : {"instances" : [<INSTANCE_CONFIG>], "logs" : [<LOGS_CONFIG>]}}'
```

Pour les versions antérieures de l'Agent :

```yaml
labels:
  com.datadoghq.ad.check_names: '[<INTEGRATION_NAME>]'
  com.datadoghq.ad.init_configs: '[<INIT_CONFIG>]'
  com.datadoghq.ad.instances: '[<INSTANCE_CONFIG>]'
  com.datadoghq.ad.logs: '[<LOGS_CONFIG>]'
```

#### Utiliser docker run, nerdctl run ou podman run

Pour l'Agent Datadog 7.36+ :

```shell
docker run -l com.datadoghq.ad.checks="{\"<INTEGRATION_NAME>\": {\"instances\": [<INSTANCE_CONFIG>], \"logs\": [<LOGS_CONFIG>]}}"
```

Pour les versions antérieures de l'Agent :

```shell
docker run -l com.datadoghq.ad.check_names='[<INTEGRATION_NAME>]' -l com.datadoghq.ad.init_configs='[<INIT_CONFIG>]' -l com.datadoghq.ad.instances='[<INSTANCE_CONFIG>]' -l com.datadoghq.ad.logs='[<LOGS_CONFIG>]'
```

**Remarque** : vous pouvez échapper le fichier JSON lors de la configuration de ces étiquettes. Par exemple :
```shell
docker run -l "com.datadoghq.ad.checks="{\"apache\": {\"instances\": [{\"apache_status_url\":\"http://%%host%%/server-status?auto2\"}]}}"
```

#### Docker Swarm
Lors de l'utilisation du mode Swarm pour Docker Cloud, les labels doivent être appliqués à l'image.

Pour l'Agent Datadog 7.36+ :

```yaml
version: "1.0"
services:
...
  project:
    image: '<IMAGE_NAME>'
    labels:
      com.datadoghq.ad.checks: '{"<INTEGRATION_NAME>": {"instances": [<INSTANCE_CONFIG>], "logs": [<LOGS_CONFIG>]}}'

```

Pour les versions antérieures de l'Agent :

```yaml
version: "1.0"
services:
...
  project:
    image: '<IMAGE_NAME>'
    labels:
      com.datadoghq.ad.check_names: '[<INTEGRATION_NAME>]'
      com.datadoghq.ad.init_configs: '[<INIT_CONFIG>]'
      com.datadoghq.ad.instances: '[<INSTANCE_CONFIG>]'
      com.datadoghq.ad.logs: '[<LOGS_CONFIG>]'

```

{{% /tab %}}
{{% tab "Fichier local" %}}

Vous pouvez stocker les modèles Autodiscovery sous forme de fichiers locaux dans le répertoire monté `/conf.d`. Vous devez redémarrer vos conteneurs d'Agent chaque fois que vous modifiez, ajoutez ou supprimez des modèles.

1. Créez un fichier `conf.d/<INTEGRATION_NAME>.d/conf.yaml` sur votre host :
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

2. Montez le répertoire `conf.d/` de votre host dans le répertoire `conf.d/` de l'Agent conteneurisé.

   **docker-compose.yaml**
   ```yaml
   volumes:
     [...]
     - <PATH_TO_LOCAL_FOLDER>/conf.d:/conf.d
   ```

   **docker run**
   ```shell
   docker run -d --name datadog-agent \
     [...]
     -v <PATH_TO_LOCAL_FOLDER>/conf.d:/conf.d \
   ```

{{% /tab %}}
{{% tab "Key-value store" %}}
Vous pouvez récupérer les modèles Autodiscovery à partir de [Consul][1], [etcd][2] ou [ZooKeeper][3]. Vous pouvez configurer votre key-value store dans le fichier de configuration `datadog.yaml` (et monter ensuite ce fichier dans le conteneur de l'Agent), ou en tant que variables d'environnement dans le conteneur de l'Agent.

**Configuration dans datadog.yaml** :

Dans `datadog.yaml`, définissez l'adresse `<KEY_VALUE_STORE_IP>` et le `<KEY_VALUE_STORE_PORT>` de votre key-value store :

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

**Configuration dans les variables d'environnement** :

Lorsque le stockage clé-valeur est activé en tant que source de modèle, l'Agent recherche des modèles à partir de la clé `/datadog/check_configs`. Autodiscovery s'attend à une hiérarchie clé-valeur comme suit :

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
{{< /tabs >}}

### Valeurs des espaces réservés

Fournir les valeurs des espaces réservés comme suit :

`<INTEGRATION_NAME>`
: Nom de votre intégration Datadog, tel que `etcd` ou `redisdb`.

`<CONTAINER_IMAGE>`
: Identifiant à mettre en correspondance avec l'image de conteneur. <br/><br/>
Par exemple : si vous fournissez `redis` comme identifiant de conteneur, votre modèle Autodiscovery est appliqué à tous les conteneurs dont les noms d'image correspondent à `redis`. Si vous avez un conteneur exécutant `foo/redis:latest` et `bar/redis:v2`, votre modèle Autodiscovery est appliqué aux deux conteneurs.<br/><br/>
Le paramètre `ad_identifiers` prend une liste, vous pouvez donc fournir plusieurs identifiants de conteneur. Vous pouvez également utiliser des identifiants personnalisés. Consultez la section [Identifiants Autodiscovery personnalisés][7].

`<INIT_CONFIG>`
: Paramètres de configuration répertoriés sous `init_config` dans le fichier `<INTEGRATION_NAME>.d/conf.yaml.example` de votre intégration. La section `init_config` est généralement vide.

`<INSTANCES_CONFIG>`
: Paramètres de configuration répertoriés sous `instances` dans le fichier `<INTEGRATION_NAME>.d/conf.yaml.example` de votre intégration.

`<LOGS_CONFIG>`
: Paramètres de configuration répertoriés sous `logs` dans le fichier `<INTEGRATION_NAME>.d/conf.yaml.example` de votre intégration.

## Exemples

### Intégration Redis

Redis est l'une des technologies pour lesquelles la [configuration automatique d'Autodiscovery][6] est disponible. Les exemples suivants montrent comment remplacer cette configuration de base par une configuration personnalisée qui fournit un paramètre `password`.

Stockez votre mot de passe en tant que variable d'environnement nommée `REDIS_PASSWORD`, puis :

{{< tabs >}}
{{% tab "Docker" %}}

Pour l'Agent Datadog 7.36+ :

```yaml
labels:
  com.datadoghq.ad.checks: '{"redisdb": {"instances": [{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}], "logs": [{"type": "file", "path": "/var/log/redis_6379.log", "source": "redis", "service": "redis_service"}]}}'
```

Pour les versions antérieures de l'Agent :

```yaml
labels:
  com.datadoghq.ad.check_names: '["redisdb"]'
  com.datadoghq.ad.init_configs: '[{}]'
  com.datadoghq.ad.instances: '[{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
  com.datadoghq.ad.logs: '[{"type": "file", "path": "/var/log/redis_6379.log", "source": "redis", "service": "redis_service"}]'
```

{{% /tab %}}
{{% tab "Fichier" %}}
1. Créez un fichier `conf.d/redisdb.d/conf.yaml` sur votre host :

   ```yaml
   ad_identifiers:
     - redis
   init_config:
   instances:
     - host: "%%host%%"
       port: "6379"
       username: "datadog"
       password: "%%env_REDIS_PASSWORD%%"
   logs:
     - type: "file"
       path: "/var/log/redis.log"
       source: "redis"
       service: "redis_service"
   ```

2. Montez le répertoire `conf.d/` de votre host dans le répertoire `conf.d/` de l'Agent conteneurisé.

{{% /tab %}}
{{% tab "Stockage clé-valeur" %}}

Les commandes etcd suivantes permettent de créer un modèle d'intégration Redis avec un paramètre `password` personnalisé :

```conf
etcdctl mkdir /datadog/check_configs/redis
etcdctl set /datadog/check_configs/redis/check_names '["redisdb"]'
etcdctl set /datadog/check_configs/redis/init_configs '[{}]'
etcdctl set /datadog/check_configs/redis/instances '[{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
```

Notez que chacune des trois valeurs est une liste. Autodiscovery assemble les éléments de liste dans les configurations d'intégration en fonction des index de liste partagés. Dans ce cas, il compose la première (et seule) configuration de check à partir de `check_names[0]`, `init_configs[0]` et `instances[0]`.
{{% /tab %}}
{{< /tabs >}}

Tous ces exemples utilisent des [variables de modèle Autodiscovery][1] :
- `%%host%%` récupère dynamiquement l'adresse IP du conteneur.
- `%%env_REDIS_PASSWORD%%` se réfère à la variable d'environnement `REDIS_PASSWORD` détectée par le processus de l'Agent.

Pour plus d'exemples, notamment sur la façon de configurer plusieurs checks pour plusieurs ensembles de conteneurs, consultez la section [Autodiscovery : scénarios et exemples][8].

[1]: /fr/containers/guide/template_variables/
[2]: /fr/getting_started/containers/autodiscovery
[3]: /fr/containers/guide/autodiscovery-management
[4]: /fr/containers/kubernetes/integrations/
[5]: /fr/agent/guide/use-community-integrations/
[6]: /fr/containers/guide/auto_conf
[7]: /fr/containers/guide/ad_identifiers
[8]: /fr/containers/guide/autodiscovery-examples