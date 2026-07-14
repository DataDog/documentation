---
aliases:
- /fr/agent/docker/integrations
description: Configurez les intégrations de surveillance pour les applications s'exécutant
  dans des conteneurs Docker en utilisant l'Autodécouverte
further_reading:
- link: /agent/docker/log/
  tag: Documentation
  text: Recueillir vos logs
- link: /agent/docker/apm/
  tag: Documentation
  text: Recueillir les traces de votre application
- link: /agent/docker/prometheus/
  tag: Documentation
  text: Recueillez vos métriques Prometheus
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Limitez la collecte de données à un sous-ensemble de conteneurs
- link: /agent/docker/tag/
  tag: Documentation
  text: Attribuez des tags à toutes les données envoyées par un conteneur
title: Docker et intégrations
---
Cette page explique comment installer et configurer des intégrations pour votre infrastructure Docker en utilisant une fonctionnalité de Datadog connue sous le nom de _Autodiscovery_. Autodiscovery vous permet d'utiliser des [variables][1] comme `%%host%%` pour remplir dynamiquement vos paramètres de configuration. 

Pour une explication détaillée du fonctionnement d'Autodiscovery, consultez [Prise en main des conteneurs : Autodiscovery][2]. Pour des options avancées d'Autodiscovery, telles que l'exclusion de certains conteneurs d'Autodiscovery ou la tolérance des pods non prêts, consultez [Container Discovery Management][3].

Si vous utilisez Kubernetes, consultez [Kubernetes et intégrations][4].

<div class="alert alert-info">
Les intégrations Datadog suivantes ne fonctionnent pas avec Autodiscovery car elles nécessitent soit des données d'arbre de processus, soit un accès au système de fichiers : <a href="/integrations/ceph">Ceph</a>, <a href="/integrations/varnish">Varnish</a>, <a href="/integrations/postfix">Postfix</a>, <a href="/integrations/cassandra/#agent-check-cassandra-nodetool">Cassandra Nodetool</a>, et <a href="/integrations/gunicorn">Gunicorn</a>.<br/><br/>
Pour surveiller des intégrations qui ne sont pas compatibles avec Autodiscovery, vous pouvez utiliser un exportateur Prometheus dans le pod pour exposer un point de terminaison HTTP, puis utiliser l'<a href="/integrations/openmetrics/">intégration OpenMetrics</a> (qui prend en charge Autodiscovery) pour trouver le pod et interroger le point de terminaison. 
</div>

## Configurez votre intégration {#set-up-your-integration}

Certaines intégrations nécessitent des étapes de configuration, telles que la création d'un jeton d'accès ou l'octroi d'une autorisation de lecture à l'Agent Datadog. Suivez les instructions dans la section **Configuration** de la documentation de votre intégration.

### Intégrations communautaires {#community-integrations}
Pour utiliser une intégration qui n'est pas fournie avec l'Agent Datadog, vous devez créer une image personnalisée contenant l'intégration souhaitée. Consultez [Utiliser des intégrations communautaires][5] pour les instructions.

## Configuration {#configuration}

Certaines intégrations couramment utilisées sont livrées avec une configuration par défaut pour Autodiscovery. Consultez [Autodiscovery auto-configuration][6] pour plus de détails, y compris une liste des intégrations auto-configurées et leurs fichiers de configuration par défaut correspondants. Si votre intégration figure dans cette liste, et que la configuration par défaut est suffisante pour votre cas d'utilisation, aucune action supplémentaire n'est requise.

Sinon :

1. Choisissez une méthode de configuration (étiquettes Docker, un fichier local ou un magasin clé-valeur) qui convient à votre cas d'utilisation.
2. Référez-vous au format de modèle pour la méthode choisie. Chaque format contient des espaces réservés, tels que `<CONTAINER_IMAGE>`.
3. [Fournissez des valeurs](#placeholder-values) pour ces espaces réservés.

{{< tabs >}}
{{% tab "Les étiquettes" %}}

#### Dockerfile {#dockerfile}

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

#### docker-compose.yaml {#docker-composeyaml}

Pour l'Agent Datadog 7.36+ :

```yaml
labels:
  com.datadoghq.ad.checks: '{"<INTEGRATION_NAME>": {"instances": [<INSTANCE_CONFIG>], "logs": [<LOGS_CONFIG>]}}'
```

Pour les versions antérieures de l'Agent :

```yaml
labels:
  com.datadoghq.ad.check_names: '[<INTEGRATION_NAME>]'
  com.datadoghq.ad.init_configs: '[<INIT_CONFIG>]'
  com.datadoghq.ad.instances: '[<INSTANCE_CONFIG>]'
  com.datadoghq.ad.logs: '[<LOGS_CONFIG>]'
```

#### En utilisant docker run, nerdctl run ou podman run {#using-docker-run-nerdctl-run-or-podman-run}

Pour l'Agent Datadog 7.36+ :

```shell
docker run -l com.datadoghq.ad.checks="{\"<INTEGRATION_NAME>\": {\"instances\": [<INSTANCE_CONFIG>], \"logs\": [<LOGS_CONFIG>]}}"
```

Pour les versions antérieures de l'Agent :

```shell
docker run -l com.datadoghq.ad.check_names='[<INTEGRATION_NAME>]' -l com.datadoghq.ad.init_configs='[<INIT_CONFIG>]' -l com.datadoghq.ad.instances='[<INSTANCE_CONFIG>]' -l com.datadoghq.ad.logs='[<LOGS_CONFIG>]'
```

**Remarque** : Vous pouvez échapper JSON lors de la configuration de ces étiquettes. Exemple :

```shell
docker run -l "com.datadoghq.ad.checks="{\"apache\": {\"instances\": [{\"apache_status_url\":\"http://%%host%%/server-status?auto2\"}]}}"
```

#### Docker Swarm {#docker-swarm}
Lors de l'utilisation du mode Swarm pour Docker Cloud, les étiquettes doivent être appliquées à l'image.

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

Vous pouvez stocker des modèles d'Autodiscovery en tant que fichiers locaux dans le répertoire `/conf.d` monté. Vous devez redémarrer vos conteneurs Agent chaque fois que vous modifiez, ajoutez ou supprimez des modèles.

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
{{% tab "Stockage key/value" %}}
Vous pouvez obtenir des modèles d'Autodiscovery à partir de [Consul][1], [etcd][2] ou [ZooKeeper][3]. Vous pouvez configurer votre magasin clé-valeur dans le fichier de configuration `datadog.yaml` (et ensuite monter ce fichier à l'intérieur du conteneur Agent), ou en tant que variables d'environnement dans le conteneur Agent.

**Configurer dans datadog.yaml** :

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

[Redémarrez l'Agent Datadog][4] pour appliquer vos modifications.

**Configurer dans les variables d'environnement** :

Avec le magasin de valeurs clés activé en tant que source de modèle, l'Agent recherche des modèles sous la clé `/datadog/check_configs`. Autodiscovery attend une hiérarchie de valeurs clés comme ceci :

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

### Valeurs de remplacement {#placeholder-values}

Fournissez les valeurs de remplacement comme suit :

`<INTEGRATION_NAME>`
: Le nom de votre intégration Datadog, tel que `etcd` ou `redisdb`.

`<CONTAINER_IMAGE>`
: Un identifiant à faire correspondre avec l'image du conteneur. <br/><br/>
Par exemple: si vous fournissez `redis` comme identifiant de conteneur, votre modèle Autodiscovery est appliqué à tous les conteneurs dont les noms d'image correspondent à `redis`. Si vous avez un conteneur exécutant `foo/redis:latest` et `bar/redis:v2`, votre modèle Autodiscovery est appliqué aux deux conteneurs.<br/><br/>
Le paramètre `ad_identifiers` prend une liste, vous pouvez donc fournir plusieurs identifiants de conteneur. Vous pouvez également utiliser des identifiants personnalisés. Voir [Custom Autodiscovery Identifiers][7].

`<INIT_CONFIG>`
: Les paramètres de configuration énumérés sous `init_config` dans le fichier `<INTEGRATION_NAME>.d/conf.yaml.example` de votre intégration. La section `init_config` est généralement vide.

`<INSTANCES_CONFIG>`
: Les paramètres de configuration énumérés sous `instances` dans le fichier `<INTEGRATION_NAME>.d/conf.yaml.example` de votre intégration.

`<LOGS_CONFIG>`
: Les paramètres de configuration énumérés sous `logs` dans le fichier `<INTEGRATION_NAME>.d/conf.yaml.example` de votre intégration.

## Exemples {#examples}

### Intégration Redis {#redis-integration}

Redis est l'une des technologies pour lesquelles [Autodiscovery auto-configuration][6] est disponible. Les exemples suivants démontrent comment remplacer cette configuration de base par une configuration personnalisée qui fournit un paramètre `password`.

Stockez votre mot de passe en tant que variable d'environnement nommée `REDIS_PASSWORD` ; puis :

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
1. Créez un fichier `conf.d/redisdb.d/conf.yaml` sur votre hôte :

   ```yaml
   ad_identifiers:
     - redis
   init config:
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

2. Montez votre dossier `conf.d/` de l'hôte dans le dossier `conf.d` de l'Agent conteneurisé.

{{% /tab %}}
{{% tab "Stockage key/value" %}}

Les commandes etcd suivantes créent un modèle d'intégration Redis avec un paramètre `password` personnalisé :

```conf
etcdctl mkdir /datadog/check_configs/redis
etcdctl set /datadog/check_configs/redis/check_names '["redisdb"]'
etcdctl set /datadog/check_configs/redis/init_configs '[{}]'
etcdctl set /datadog/check_configs/redis/instances '[{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
```

Remarquez que chacune des trois valeurs est une liste. Autodiscovery assemble les éléments de la liste dans les configurations d'intégration en fonction des index de liste partagés. Dans ce cas, Autodiscovery compose la première (et unique) configuration de vérification à partir de `check_names[0]`, `init_configs[0]` et `instances[0]`.
{{% /tab %}}
{{< /tabs >}}

Tous ces exemples utilisent des [Autodiscovery template variables][1] :
- `%%host%%` est peuplé dynamiquement avec l'IP du conteneur.
- `%%env_REDIS_PASSWORD%%` fait référence à une variable d'environnement nommée `REDIS_PASSWORD` telle que vue par le processus Agent.

Pour plus d'exemples, y compris comment configurer plusieurs vérifications pour plusieurs ensembles de conteneurs, voir [Autodiscovery : Scénarios et Exemples][8].

[1]: /fr/containers/guide/template_variables/
[2]: /fr/getting_started/containers/autodiscovery
[3]: /fr/containers/guide/autodiscovery-management
[4]: /fr/containers/kubernetes/integrations/
[5]: /fr/agent/guide/use-community-integrations/
[6]: /fr/containers/guide/auto_conf
[7]: /fr/containers/guide/ad_identifiers
[8]: /fr/containers/guide/autodiscovery-examples