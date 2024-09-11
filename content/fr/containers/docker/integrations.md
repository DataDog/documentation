---
aliases:
- /fr/agent/docker/integrations
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
title: Intégrations Autodiscovery avec Docker
---

<div class="alert alert-info">
Consultez la documentation <a href="/getting_started/agent/autodiscovery">Débuter avec Autodiscovery</a> pour découvrir les concepts sous-jacents de cette fonctionnalité.
</div>

Cette page traite de la configuration des intégrations Autodiscovery avec Docker. Si vous utilisez Kubernetes, consultez la [documentation relative aux intégrations Autodiscovery avec Kubernetes][1]. 

Autodiscovery vous permet d'appliquer une configuration d'intégration Datadog lors de l'exécution d'un check de l'Agent sur un conteneur donné. Pour obtenir davantage de contexte sur cette logique, découvrez comment [configurer les intégrations de l'Agent][2] lorsque l'Agent est exécuté sur un host.

Utilisez les paramètres suivants afin de configurer une intégration avec Autodiscovery :

| Paramètre            | Obligatoire | Description                                                                                       |
|----------------------|----------|---------------------------------------------------------------------------------------------------|
| `<NOM_INTÉGRATION>` | Oui      | Le nom de l'intégration Datadog.                                                                   |
| `<CONFIG_INIT>`      | Oui      | La configuration de la section `init_config:` pour l'intégration Datadog-`<NOM_INTÉGRATION>` donnée.           |
| `<CONFIG_INSTANCE>`  | Oui      | La configuration de la section `instances:` pour l'intégration Datadog-`<NOM_INTÉGRATION>` donnée.             |

**Remarque** : `<INIT_CONFIG>` n'est pas nécessaire pour Autodiscovery v2, introduit avec la version 7.36 de lʼAgent Datadog.

Chaque onglet des sections ci-dessous présente une façon différente d'appliquer des modèles d'intégration à un conteneur donné. Vous pouvez utiliser les éléments suivants :

* [Étiquettes Docker](?tab=docker#configuration)
* [Un fichier de configuration monté dans l'Agent](?tab=fichier#configuration)
* [Stockages clé-valeur](?tab=stockagecle-valeur#configuration)

**Remarque** : certaines intégrations prises en charge ne fonctionnent pas avec Autodiscovery par défaut, car elles nécessitent un accès à l'arborescence des processus ou au système de fichiers : c'est le cas de [Ceph][4], [Varnish][5], [Postfix][6], [Cassandra Nodetools][7] et [Gunicorn][8]. Pour activer Autodiscovery pour ces intégrations, utilisez l'exportateur Prometheus officiel dans le conteneur, puis faites appel à Autodiscovery dans l'Agent pour identifier le conteneur et interroger l'endpoint.

## Configuration

{{< tabs >}}
{{% tab "Docker (AD v2)" %}}

**Remarque** : les annotations AD v2 ont été ajoutées dans l'Agent Datadog 7.36 afin de simplifier la configuration de l'intégration. Pour les versions précédentes de l'Agent Datadog, utilisez les annotations AD v1.

Pour activer automatiquement Autodiscovery sur des conteneurs Docker, montez `/var/run/docker.sock` dans l'Agent conteneurisé. Sous Windows, montez `\\.\pipe\docker_engine`.

Il est possible de stocker vos modèles d'intégration en tant qu'étiquettes Docker. Grâce à Autodiscovery, l'Agent détecte s'il est exécuté sur Docker et examine automatiquement toutes les étiquettes à la recherche de modèles d'intégration. Autodiscovery s'attend à ce que les étiquettes ressemblent à ces exemples :

**Dockerfile** :

```yaml
LABEL "com.datadoghq.ad.checks"='{"<INTEGRATION_NAME>": {"instances": [<INSTANCE_CONFIG>]}}'
```

**docker-compose.yaml** :

```yaml
labels:
  com.datadoghq.ad.checks: '{"<INTEGRATION_NAME>": {"instances": [<INSTANCE_CONFIG>]}}'
```

**Avec les commandes `docker run`, `nerdctl run` ou `podman run`** :

```shell
-l com.datadoghq.ad.checks="{\"<INTEGRATION_NAME>\": {\"instances\": [<INSTANCE_CONFIG>]}}"
```

**Remarque** : vous pouvez échapper le fichier JSON lors de la configuration de ces étiquettes. Par exemple :
```shell
docker run --label "com.datadoghq.ad.checks="{\"apache\": {\"instances\": [{\"apache_status_url\":\"http://%%host%%/server-status?auto2\"}]}}"
```

**Docker Swarm** :

Pour utiliser le mode Swarm avec Docker Cloud, les étiquettes doivent être appliquées à l'image :

```yaml
version: "1.0"
services:
...
  project:
    image: '<IMAGE_NAME>'
    labels:
      com.datadoghq.ad.checks: '{"<INTEGRATION_NAME>": {"instances": [<INSTANCE_CONFIG>]}}'

```

**Remarque** : lors de la configuration d'Autodiscovery, Datadog recommande l'utilisation des étiquettes Docker afin d'unifier la télémétrie au sein de votre environnement conteneurisé. Consultez la documentation relative au [tagging de service unifié][1] pour en savoir plus.


[1]: /fr/getting_started/tagging/unified_service_tagging/?tab=docker
{{% /tab %}}
{{% tab "Docker (AD v1)" %}}

Pour activer automatiquement Autodiscovery sur des conteneurs Docker, montez `/var/run/docker.sock` dans l'Agent conteneurisé. Sous Windows, montez `\\.\pipe\docker_engine`.

Il est possible de stocker vos modèles d'intégration en tant qu'étiquettes Docker. Grâce à Autodiscovery, l'Agent détecte s'il est exécuté sur Docker et examine automatiquement toutes les étiquettes à la recherche de modèles d'intégration. Autodiscovery s'attend à ce que les étiquettes ressemblent à ces exemples :

**Dockerfile** :

```yaml
LABEL "com.datadoghq.ad.check_names"='[<NOM_INTÉGRATION>]'
LABEL "com.datadoghq.ad.init_configs"='[<CONFIG_INIT>]'
LABEL "com.datadoghq.ad.instances"='[<CONFIG_INSTANCE>]'
```

**docker-compose.yaml** :

```yaml
labels:
  com.datadoghq.ad.check_names: '[<NOM_INTÉGRATION>]'
  com.datadoghq.ad.init_configs: '[<CONFIG_INIT>]'
  com.datadoghq.ad.instances: '[<CONFIG_INSTANCE>]'
```

**Avec les commandes `docker run`, `nerdctl run` ou `podman run`** :

```shell
-l com.datadoghq.ad.check_names='[<NOM_INTÉGRATION>]' -l com.datadoghq.ad.init_configs='[<CONFIG_INIT>]' -l com.datadoghq.ad.instances='[<CONFIG_INSTANCE>]'
```

**Remarque** : vous pouvez échapper le fichier JSON lors de la configuration de ces étiquettes. Par exemple :
```shell
docker run --label "com.datadoghq.ad.check_names=[\"redisdb\"]" --label "com.datadoghq.ad.init_configs=[{}]" --label "com.datadoghq.ad.instances=[{\"host\":\"%%host%%\",\"port\":6379}]" --label "com.datadoghq.ad.logs=[{\"source\":\"redis\"}]" --name redis redis
```

**Docker Swarm** :

Pour utiliser le mode Swarm avec Docker Cloud, les étiquettes doivent être appliquées à l'image :

```yaml
version: "1.0"
services:
...
  project:
    image: '<NOM_IMAGE>'
    labels:
      com.datadoghq.ad.check_names: '[<NOM_INTÉGRATION>]'
      com.datadoghq.ad.init_configs: '[<CONFIG_INIT>]'
      com.datadoghq.ad.instances: '[<CONFIG_INSTANCE>]'

```

**Remarque** : lors de la configuration d'Autodiscovery, Datadog recommande l'utilisation des étiquettes Docker afin d'unifier la télémétrie au sein de votre environnement conteneurisé. Consultez la documentation relative au [tagging de service unifié][1] pour en savoir plus.


[1]: /fr/getting_started/tagging/unified_service_tagging/?tab=docker
{{% /tab %}}
{{% tab "Fichier" %}}

Vous pouvez stocker des modèles en tant que fichiers locaux et les monter dans l'Agent conteneurisé. Cela ne nécessite aucun service externe ni aucune plateforme d'orchestration spécifique. Vous devrez cependant redémarrer les conteneurs de votre Agent à chaque fois qu'un modèle est modifié, ajouté ou supprimé. L'Agent recherche les modèles Autodiscovery dans le répertoire `/conf.d` monté.

À partir de la version 6.2.0 (et 5.24.0) de l'Agent, les modèles par défaut utilisent le port par défaut pour le logiciel surveillé au lieu de le détecter automatiquement. Si vous devez utiliser un port différent, spécifiez un modèle Autodiscovery personnalisé dans les [étiquettes de conteneur Docker](?tab=etiquettes-docker)

Ces modèles d'intégration peuvent convenir dans les cas simples. Toutefois, si vous avez besoin de personnaliser les configurations de votre intégration Datadog (par exemple pour activer des options supplémentaires, pour faire appel à des identificateurs de conteneur différents ou pour utiliser les index de template variables), vous devez écrire vos propres fichiers de configuration automatique :

1. Créez un fichier `conf.d/<NOM_INTÉGRATION>.d/conf.yaml` sur votre host et ajoutez votre configuration automatique personnalisée.
2. Montez le répertoire `conf.d/` de votre host dans le répertoire `conf.d/` de l'Agent conteneurisé.

**Exemple de fichier de configuration automatique** :

```text
ad_identifiers:
  <IDENTIFICATEUR_INTÉGRATION_AUTODISCOVERY>

init_config:
  <CONFIG_INIT>

instances:
  <CONFIG_INSTANCES>
```

Consultez la documentation sur [les identificateurs de conteneur Autodiscovery][1] pour obtenir des informations sur `<IDENTIFICATEUR_INTÉGRATION_AUTODISCOVERY>`.

**Remarque** : vous n'avez pas à configurer `<NOM_INTÉGRATION>` ici, car l'Agent le récupère directement à partir du nom du fichier.

[1]: /fr/agent/guide/ad_identifiers/
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
      - check_names: ["<NOM_INTÉGRATION>"]
      - init_configs: ["<CONFIG_INIT>"]
      - instances: ["<CONFIG_INSTANCE>"]
    ...
```

**Remarque** : pour appliquer une configuration spécifique à un conteneur donné, Autodiscovery identifie les conteneurs par **image** en cas d'utilisation de stockages clé-valeur. En d'autres termes, il cherche à faire correspondre `<IDENTIFICATEUR_CONTENEUR>` à `.spec.containers[0].image`.

[1]: /fr/integrations/consul/
[2]: /fr/agent/configuration/agent-commands/
{{% /tab %}}
{{< /tabs >}}

## Exemples

### Intégration Datadog/Redis

{{< tabs >}}
{{% tab "Docker" %}}

Le fichier `docker-compose.yml` suivant applique le modèle d'intégration Redis adéquat avec un paramètre `password` personnalisé :

```yaml
labels:
  com.datadoghq.ad.check_names: '["redisdb"]'
  com.datadoghq.ad.init_configs: '[{}]'
  com.datadoghq.ad.instances: '[{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
```

{{% /tab %}}
{{% tab "Fichier" %}}

Redis est l'un des modèles Autodiscovery par défaut inclus avec l'Agent : il n'est donc pas nécessaire de monter ce fichier. Le modèle Redis suivant est inclus avec l'Agent :

```yaml
ad_identifier:
  - redis

init_config:

instances:

  - host: "%%host%%"
    port: "6379"
```

Cette [configuration d'intégration Redis][1] peut sembler succincte, mais notez l'option `ad_identifier`. Cette option obligatoire vous permet de spécifier les identificateurs de conteneur. Autodiscovery applique ce modèle à tous les conteneurs sur le host qui exécute une image `redis`. Consultez la documentation relative aux [identificateurs Autodiscovery][2] pour en savoir plus.

Si votre Redis requiert un `password` supplémentaire pour accéder à son endpoint stats :

1. Créez les dossiers `conf.d/` et `conf.d/redisdb.d` sur votre host.
2. Ajoutez le fichier de configuration automatique personnalisé ci-dessous à `conf.d/redisdb.d/conf.yaml` sur votre host.
3. Montez le répertoire `conf.d/` du host dans le répertoire `conf.d/` de l'Agent conteneurisé.

```yaml
ad_identifiers:
  - redis

init_config:

instances:

  - host: "%%host%%"
    port: "6379"
    password: "%%env_REDIS_PASSWORD%%"
```

**Remarque** : la logique de template variable `"%%env_<ENV_VAR>%%"` est utilisée afin d'éviter de stocker le mot de passe en clair. La variable d'environnement `REDIS_PASSWORD` doit donc être transmise à l'Agent. Consultez la [documentation relative aux template variables Autodiscovery][3].

[1]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/auto_conf.yaml
[2]: /fr/agent/guide/ad_identifiers/
[3]: /fr/agent/faq/template_variables/
{{% /tab %}}
{{% tab "Stockage clé-valeur" %}}

Les commandes etcd suivantes permettent de créer un modèle d'intégration Redis avec un paramètre `password` personnalisé :

```conf
etcdctl mkdir /datadog/check_configs/redis
etcdctl set /datadog/check_configs/redis/check_names '["redisdb"]'
etcdctl set /datadog/check_configs/redis/init_configs '[{}]'
etcdctl set /datadog/check_configs/redis/instances '[{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
```

Notez que chacune des trois valeurs est une liste. Autodiscovery assemble les éléments de liste en fonction des index de liste partagée de manière à générer la configuration de l'intégration. Dans le cas présent, il assemble la première (et unique) configuration de check à partir de `check_names[0]`, `init_configs[0]` et `instances[0]`.

**Remarque** : la logique de template variable `"%%env_<ENV_VAR>%%"` est utilisée afin d'éviter de stocker le mot de passe en clair. La variable d'environnement `REDIS_PASSWORD` doit donc être transmise à l'Agent. Consultez la [documentation relative aux template variables Autodiscovery][1].

Contrairement aux fichiers de configuration automatique, **les stockages clé-valeur peuvent utiliser la version courte OU la version longue du nom d'image comme identificateur de conteneur**, par exemple : `redis` OU `redis:latest`.

[1]: /fr/agent/faq/template_variables/
{{% /tab %}}
{{< /tabs >}}

### Intégrations Datadog/Apache et Datadog/Check HTTP

Les configurations ci-dessous s'appliquent à une image de conteneur Apache avec `<IDENTIFICATEUR_CONTENEUR>`: `httpd`. Les modèles Autodiscovery sont configurés pour recueillir des métriques provenant du conteneur Apache, et pour configurer un check HTTP/Datadog avec des instances afin de tester deux endpoints.

Les noms de check sont `apache`, `http_check` et leur `<CONFIG_INIT>` et `<CONFIG_INSTANCE>`. Les configurations complètes se trouvent sur les pages de documentation dédiées : [intégration Datadog/Apache][9], [intégration Datadog/check HTTP][10].

{{< tabs >}}
{{% tab "Docker" %}}

```yaml
labels:
  com.datadoghq.ad.check_names: '["apache", "http_check"]'
  com.datadoghq.ad.init_configs: '[{},{}]'
  com.datadoghq.ad.instances: '[[{"apache_status_url": "http://%%host%%/server-status?auto"}],[{"name":"<SITEWEB_1>","url":"http://%%host%%/website_1","timeout":1},{"name":"<SITEWEB_2>","url":"http://%%host%%/website_2","timeout":1}]]'
```

{{% /tab %}}
{{% tab "Fichier" %}}

* Créez les dossiers `conf.d/` et `conf.d/apache.d` sur votre host.
* Ajoutez le fichier de configuration automatique personnalisé ci-dessous à `conf.d/apache.d/conf.yaml` sur votre host.

```yaml
ad_identifiers:
  - httpd

init_config:

instances:
  - apache_status_url: http://%%host%%/server-status?auto
```

Remarque : cette [configuration de check Apache][1] peut sembler succincte, mais notez l'option `ad_identifier`. Cette option obligatoire vous permet de spécifier les identificateurs de conteneur. Autodiscovery applique ce modèle à tous les conteneurs sur le host qui exécute une image `httpd`. Consultez la documentation relative aux [identifiants Autodiscovery][2] pour en savoir plus.

* Créez ensuite le dossier `conf.d/http_check.d` sur votre host.
* Ajoutez le fichier de configuration automatique personnalisé ci-dessous à `conf.d/http_check.d/conf.yaml` sur votre host.

```yaml
ad_identifiers:
  - httpd

init_config:

instances:
  - name: "<SITEWEB_1>"
    url: "http://%%host%%/website_1"
    timeout: 1

  - name: "<SITEWEB_2>"
    url: "http://%%host%%/website_2"
    timeout: 1
```

* Enfin, montez le répertoire `conf.d/` du host dans le répertoire `conf.d/` de l'Agent conteneurisé.

[1]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[2]: /fr/agent/guide/ad_identifiers/
{{% /tab %}}
{{% tab "Stockage clé-valeur" %}}

```conf
etcdctl set /datadog/check_configs/httpd/check_names '["apache", "http_check"]'
etcdctl set /datadog/check_configs/httpd/init_configs '[{}, {}]'
etcdctl set /datadog/check_configs/httpd/instances '[[{"apache_status_url": "http://%%host%%/server-status?auto"}],[{"name": "<SITEWEB_1>", "url": "http://%%host%%/website_1", timeout: 1},{"name": "<SITEWEB_2>", "url": "http://%%host%%/website_2", timeout: 1}]]'
```

**Remarque** : l'ordre de chaque liste est important. Pour que l'Agent soit en mesure de générer la configuration du check HTTP, toutes les parties de sa configuration doivent utiliser le même index sur l'ensemble des trois listes.

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/kubernetes/integrations/
[2]: /fr/getting_started/integrations/#configuring-agent-integrations
[3]: /fr/integrations/#cat-autodiscovery
[4]: /fr/integrations/ceph/
[5]: /fr/integrations/varnish/#autodiscovery
[6]: /fr/integrations/postfix/
[7]: /fr/integrations/cassandra/#agent-check-cassandra-nodetool
[8]: /fr/integrations/gunicorn/
[9]: /fr/integrations/apache/#setup
[10]: /fr/integrations/http_check/#setup