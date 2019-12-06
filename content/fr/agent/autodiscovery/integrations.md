---
title: Modèles d'intégration Autodiscovery
kind: documentation
further_reading:
  - link: logs/
    tag: Documentation
    text: Recueillir vos logs
  - link: graphing/infrastructure/process
    tag: Documentation
    text: Recueillir vos processus
  - link: tracing
    tag: Documentation
    text: Recueillir vos traces
---
Autodiscovery vous permet d'appliquer une configuration d'intégration Datadog lors de l'exécution d'un check de l'Agent sur un conteneur donné. Pour obtenir davantage de contexte sur cette logique, découvrez comment [configurer les intégrations de l'Agent][1] lorsque l'Agent est exécuté sur un host.

Utilisez les paramètres suivants afin de configurer une intégration avec Autodiscovery :

| Paramètre            | Obligatoire | Description                                                                                       |
|----------------------|----------|---------------------------------------------------------------------------------------------------|
| `<NOM_INTÉGRATION>` | Oui      | Nom de l'intégration Datadog                                                                   |
| `<CONFIG_INIT>`      | Oui      | La configuration de la section `init_config:` pour l'intégration Datadog-`<NOM_INTÉGRATION>` donnée.           |
| `<CONFIG_INSTANCE>`  | Oui      | La configuration de la section `instances:` pour l'intégration Datadog-`<NOM_INTÉGRATION>` donnée.             |
| `<CONFIG_LOG>`       | Non       | À partir de l'Agent v6.5+, la configuration de la section `logs:` pour l'intégration Datadog-`<NOM_INTÉGRATION>` donnée. |

Chaque onglet des sections ci-dessous présente une façon différente d'appliquer des modèles d'intégration à un conteneur donné. Les méthodes disponibles sont :

* [Annotations de pod Kubernetes](?tab=kubernetes#configuration)
* [Étiquettes Docker](?tab=docker#configuration)
* [Un fichier de configuration monté dans l'Agent](?tab=file#configuration)
* [ConfigMap](?tab=configmap#configuration)
* [Stockages clé/valeur](?tab=keyvaluestore#configuration)

Si vous définissez un modèle pour une même intégration via plusieurs sources de modèle, l'Agent recherche des modèles dans l'ordre suivant (et utilise le premier trouvé) :

* Annotations Kubernetes
* Étiquettes Docker
* Fichiers

**Remarque** : certaines intégrations prises en charge ne fonctionnent pas avec Autodiscovery par défaut, car elles nécessitent un accès à l'arborescence des processus ou au système de fichiers : c'est le cas de [Ceph][2], [Varnish][3], [Postfix][4], [Cassandra Nodetools][5] et [Gunicorn][6]. Pour activer Autodiscovery pour ces intégrations, utilisez l'exportateur Prometheus officiel dans le pod, puis faites appel à Autodiscovery dans l'Agent pour identifier le pod et interroger l'endpoint. Par exemple, le modèle standard dans Kubernetes est le suivant : adaptateur sidecar avec collecteur au niveau du nœud ou du cluster. L'exportateur peut ainsi accéder aux données et les exposer via un endpoint HTTP, ce qui permet à Autodiscovery d'y accéder à son tour.

## Configuration

{{< tabs >}}
{{% tab "Kubernetes" %}}

Les modèles d'intégration peuvent être stockés dans vos annotations de pod Kubernetes. Lorsque Autodiscovery est activé, l'Agent détecte s'il est exécuté sur Kubernetes et examine alors automatiquement toutes les annotations de pod à la recherche de modèles d'intégration.

Pour appliquer une configuration spécifique à un conteneur donné, Autodiscovery identifie les conteneurs via leur **nom**, et non via leur image. II cherche à faire correspondre `<IDENTIFIANT_CONTENEUR>` à `.spec.containers[0].name`, et non à `.spec.containers[0].image`. Pour configurer Autodiscovery pour une intégration Datadog sur un `<IDENTIFICATEUR_CONTENEUR>` donné dans votre pod, ajoutez les annotations suivantes à votre pod :

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<NOM_POD>'
  annotations:
    ad.datadoghq.com/<IDENTIFICATEUR_CONTENEUR>.check_names: '[<NOM_CHECK>]'
    ad.datadoghq.com/<IDENTIFICATEUR_CONTENEUR>.init_configs: '[<CONFIG_INIT>]'
    ad.datadoghq.com/<IDENTIFICATEUR_CONTENEUR>.instances: '[<CONFIG_INSTANCE>]'
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
    ad.datadoghq.com/<IDENTIFICATEUR_CONTENEUR_1>.check_names: '[<NOM_CHECK_1>]'
    ad.datadoghq.com/<IDENTIFICATEUR_CONTENEUR_1>.init_configs: '[<CONFIG_INIT_1>]'
    ad.datadoghq.com/<IDENTIFICATEUR_CONTENEUR_1>.instances: '[<CONFIG_INSTANCE_1>]'
    ad.datadoghq.com/<IDENTIFICATEUR_CONTENEUR_1>.logs: '[<CONFIG_LOG_1>]'
    # (...)
    ad.datadoghq.com/<IDENTIFICATEUR_CONTENEUR_2>.check_names: '[<NOM_CHECK_2>]'
    ad.datadoghq.com/<IDENTIFICATEUR_CONTENEUR_2>.init_configs: '[<CONFIG_INIT_2>]'
    ad.datadoghq.com/<IDENTIFICATEUR_CONTENEUR_2>.instances: '[<CONFIG_INSTANCE_2>]'
    ad.datadoghq.com/<IDENTIFICATEUR_CONTENEUR_2>.logs: '[<CONFIG_LOG_2>]'
spec:
  containers:
    - name: '<IDENTIFICATEUR_CONTENEUR_1>'
    # (...)
    - name: '<IDENTIFICATEUR_CONTENEUR_2>'
# (...)
```

**Remarque** : si vous définissez directement vos pods Kubernetes (c'est-à-dire `kind: Pod`), ajoutez les annotations de chaque pod directement dans sa section `metadata`. Si vous définissez indirectement les pods avec des ReplicationControllers, des ReplicaSets ou des Deployments, ajoutez les annotations de pod dans `.spec.template.metadata`.

{{% /tab %}}
{{% tab "Docker" %}}

Il est possible de stocker vos modèles d'intégration en tant qu'étiquettes Docker. Grâce à Autodiscovery, l'Agent détecte s'il est exécuté sur Docker et examine automatiquement toutes les étiquettes à la recherche de modèles d'intégration. Autodiscovery s'attend à ce que les étiquettes ressemblent à ces exemples :

**Dockerfile** :

```yaml
LABEL "com.datadoghq.ad.check_names"='[<NOM_CHECK>]'
LABEL "com.datadoghq.ad.init_configs"='[<CONFIG_INIT>]'
LABEL "com.datadoghq.ad.instances"='[<CONFIG_INSTANCE>]'
LABEL "com.datadoghq.ad.logs"='[<CONFIG_LOGS>]'
```

**docker-compose.yaml** :

```yaml
labels:
  com.datadoghq.ad.check_names: '[<NOM_CHECK>]'
  com.datadoghq.ad.init_configs: '[<CONFIG_INIT>]'
  com.datadoghq.ad.instances: '[<CONFIG_INSTANCE>]'
  com.datadoghq.ad.logs: '[<CONFIG_LOGS>]'
```

**Commande d'exécution Docker** :

```shell
-l com.datadoghq.ad.check_names='[<NOM_CHECK>]' -l com.datadoghq.ad.init_configs='[<CONFIG_INIT>]' -l com.datadoghq.ad.instances='[<CONFIG_INSTANCE>]' -l com.datadoghq.ad.logs='[<CONFIG_LOGS>]'
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
      com.datadoghq.ad.check_names: '[<NOM_CHECK>]'
      com.datadoghq.ad.init_configs: '[<CONFIG_INIT>]'
      com.datadoghq.ad.instances: '[<CONFIG_INSTANCE>]'
      com.datadoghq.ad.logs: '[<CONFIG_LOGS>]'

```

{{% /tab %}}
{{% tab "Fichier" %}}

Vous pouvez stocker des modèles en tant que fichiers locaux et les monter dans l'Agent conteneurisé. Cela ne nécessite aucun service externe ni aucune plateforme d'orchestration spécifique. Vous devez cependant redémarrer les conteneurs de votre Agent à chaque modification, ajout ou suppression de modèle. L'Agent recherche les modèles Autodiscovery dans le répertoire `/conf.d` monté.

À partir de la version 6.2.0 (et 5.24.0) de l'Agent, les modèles par défaut utilisent le port par défaut pour le logiciel surveillé au lieu de le détecter automatiquement. Si vous devez utiliser un port différent, spécifiez un modèle Autodiscovery personnalisé dans les [étiquettes de conteneur Docker](?tab=etiquette-docker) ou dans les [annotations de pod Kubernetes](?tab=annotations-kubernetes).

Ces modèles d'intégration peuvent convenir dans les cas simples. Toutefois, si vous avez besoin de personnaliser les configurations de votre intégration Datadog (par exemple pour activer des options supplémentaires, pour faire appel à des identificateurs de conteneur différents ou pour utiliser les index de template variables), vous devez écrire vos propres fichiers de configuration automatique :

1. Créez un fichier `conf.d/<NOM_INTÉGRATION>.d/conf.yaml` sur votre host et ajoutez votre fichier de configuration automatique personnalisé.
2. Montez le répertoire `conf.d/` de votre host dans le répertoire `conf.d/` de l'Agent conteneurisé.

**Exemple de fichier de configuration automatique**:

```
ad_identifiers:
  <IDENTIFICATEUR_INTÉGRATION_AUTODISCOVERY>

init_config:
  <CONFIG_INIT>

instances:
  <CONFIG_INSTANCES>
```

Consultez la documentation sur [les identificateurs de conteneur Autodiscovery][1] pour obtenir des informations sur `<IDENTIFICATEUR_INTÉGRATION_AUTODISCOVERY>`.

**Remarque** : vous n'avez pas à configurer `<NOM_INTÉGRATION>` ici, car l'Agent le récupère directement à partir du nom du fichier.

[1]: /fr/agent/autodiscovery/ad_identifiers
{{% /tab %}}
{{% tab "ConfigMap" %}}

Kubernetes vous permet d'utiliser des [ConfigMaps][1]. Pour en savoir plus, consultez le modèle ci-dessous et la documentation relative aux [intégrations personnalisées Kubernetes][2].

```
kind: ConfigMap
apiVersion: v1
metadata:
  name: <NOM>-config-map
  namespace: default
data:
  <NOM_INTEGRATION>-config: |-
    ad_identifiers:
      <IDENTIFICATEUR_INTÉGRATION_AUTODISCOVERY>
    init_config:
      <CONFIG_INIT>
    instances:
      <CONFIG_INSTANCES>
    logs:
      <CONFIG_LOGS>
```

Consultez la documentation sur [les identificateurs de conteneur Autodiscovery][3] pour obtenir des informations sur `<IDENTIFICATEUR_INTÉGRATION_AUTODISCOVERY>`.

[1]: /fr/agent/kubernetes/integrations/#configmap
[2]: /fr/agent/kubernetes/integrations
[3]: /fr/agent/autodiscovery/ad_identifiers
{{% /tab %}}
{{% tab "Stockage clé-valeur" %}}

Autodiscovery peut utiliser [Consul][1], Etcd et Zookeeper comme sources de modèle d'intégration. Pour utiliser un stockage clé-valeur, vous devez le configurer dans le fichier de configuration `datadog.yaml` de l'Agent et monter ce fichier dans l'agent conteneurisé. Vous pouvez également transmettre votre stockage clé-valeur comme variables d'environnement à l'Agent conteneurisé.

**Configurer dans datadog.yaml** :

Dans le fichier `datadog.yaml`, définissez l'adresse `<IP_STOCKAGE_CLÉ_VALEUR>` et le port `<PORT_STOCKAGE_CLÉ_VALEUR>` de votre stockage clé-valeur :

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

**Configurer dans les variables d'environnement** :

Lorsque le stockage clé-valeur est activé en tant que source de modèle, l'Agent recherche des modèles à partir de la clé `/datadog/check_configs`. Autodiscovery s'attend à une hiérarchie clé-valeur comme suit :

```yaml
/datadog/
  check_configs/
    <IDENTIFICATEUR_CONTENEUR>/
      - check_names: ["<NOM_INTÉGRATION>"]
      - init_configs: ["<CONFIG_INIT>"]
      - instances: ["<CONFIG_INSTANCE>"]
      - logs: ["<CONFIG_LOGS>"]
    ...
```

**Remarque** : pour appliquer une configuration spécifique à un conteneur donné, Autodiscovery identifie les conteneurs par **image** en cas d'utilisation de stockages clé-valeur. En d'autres termes, il cherche à faire correspondre `<IDENTIFICATEUR_CONTENEUR>` à `.spec.containers[0].image`.

[1]: /fr/integrations/consul
[2]: /fr/agent/guide/agent-commands
{{% /tab %}}
{{< /tabs >}}

## Exemples
### Intégration Datadog/Redis

{{< tabs >}}
{{% tab "Kubernetes" %}}

L'annotation de pod suivante définit le modèle d'intégration pour les conteneurs `redis` avec un paramètre `password` personnalisé, puis tague tous ses logs avec les attributs `source` et `service` adéquats :

```
apiVersion: v1
kind: Pod
metadata:
  name: redis
  annotations:
    ad.datadoghq.com/redis.check_names: '["redisdb"]'
    ad.datadoghq.com/redis.init_configs: '[{}]'
    ad.datadoghq.com/redis.instances: |
      [
        {
          "host": "%%host%%",
          "port":"6379",
          "password":"%%env_REDIS_PASSWORD%%"
        }
      ]
    ad.datadoghq.com/redis.logs: '[{"source":"redis","service":"redis"}]'
  labels:
    name: redis
spec:
  containers:
    - name: redis
      image: httpd
      ports:
        - containerPort: 80
```

**Remarque** : la logique de template variable `"%%env_<ENV_VAR>%%"` est utilisée afin d'éviter de stocker le mot de passe en clair. La variable d'environnement `REDIS_PASSWORD` doit donc être transmise à l'Agent. Consultez la [documentation relative aux template variables Autodiscovery][1].


[1]: /fr/agent/autodiscovery/template_variables
{{% /tab %}}
{{% tab "Docker" %}}

Le fichier `docker-compose.yml` suivant applique le modèle d'intégration Redis adéquat avec un paramètre `password` personnalisé :


```yaml
labels:
  com.datadoghq.ad.check_names: '["redisdb"]'
  com.datadoghq.ad.init_configs: '[{}]'
  com.datadoghq.ad.instances: '[{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
  com.datadoghq.ad.logs: '[{"source": "redis", "service": "redis"}]'
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

Si votre Redis requiert un `password` supplémentaire pour accéder à son endpoint stats et que vous souhaitez appliquer le flag adéquat aux logs qui en sortent :

1. Créez les dossiers `conf.d/` et `conf.d/redis.d` sur votre host.
2. Ajoutez le fichier de configuration automatique personnalisé ci-dessous à `conf.d/redis.d/conf.yaml` sur votre host.
3. Montez le répertoire `conf.d/` du host dans le répertoire `conf.d/` de l'Agent conteneurisé.

```yaml
ad_identifier:
  - redis

init_config:

instances:

  - host: "%%host%%"
    port: "6379"
    password: "%%env_REDIS_PASSWORD%%"

logs:
  source: redis
  service: redis
```

**Remarque** : la logique de template variable `"%%env_<ENV_VAR>%%"` est utilisée afin d'éviter de stocker le mot de passe en clair. La variable d'environnement `REDIS_PASSWORD` doit donc être transmise à l'Agent. Consultez la [documentation relative aux template variables Autodiscovery][3].


[1]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/auto_conf.yaml
[2]: /fr/agent/autodiscovery/ad_identifiers
[3]: /fr/agent/autodiscovery/template_variables
{{% /tab %}}
{{% tab "ConfigMap" %}}

La ConfigMap suivante définit le modèle d'intégration pour les conteneurs `redis` avec les attributs `source` et `service` pour la collecte des logs :

```
kind: ConfigMap
apiVersion: v1
metadata:
  name: redis-config-map
  namespace: default
data:
  redisdb-config: |-
    ad_identifiers:
      - redis
      - redis-test
    init_config:
    instances:
      - host: "%%host%%"
        port: "6379"
    logs:
      source: redis
      service: redis
```

Dans le manifeste, définissez les paramètres `volumeMounts` et `volumes` :

```
[...]
        volumeMounts:
        [...]
          - name: redisdb-config-map
            mountPath: /conf.d/redisdb.d
        [...]
      volumes:
      [...]
        - name: redisdb-config-map
          configMap:
            name: redisdb-config-map
            items:
              - key: redisdb-config
                path: conf.yaml
[...]
```

{{% /tab %}}
{{% tab "Stockage clé-valeur" %}}

Les commandes etcd suivantes créent un modèle d'intégration Redis avec un paramètre `password` personnalisé et taguent tous ses logs avec les attributs `source` et `service` adéquats :

```
etcdctl mkdir /datadog/check_configs/redis
etcdctl set /datadog/check_configs/redis/check_names '["redisdb"]'
etcdctl set /datadog/check_configs/redis/init_configs '[{}]'
etcdctl set /datadog/check_configs/redis/instances '[{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
etcdctl set /datadog/check_configs/redis/logs '[{"source": "redis", "service": "redis"}]'
```

Notez que chacune des trois valeurs est une liste. Autodiscovery assemble les éléments de liste en fonction des index de liste partagée de manière à générer la configuration de l'intégration. Dans le cas présent, il assemble la première (et unique) configuration de check à partir de `check_names[0]`, `init_configs[0]` et `instances[0]`.

**Remarque** : la logique de template variable `"%%env_<ENV_VAR>%%"` est utilisée afin d'éviter de stocker le mot de passe en clair. La variable d'environnement `REDIS_PASSWORD` doit donc être transmise à l'Agent. Consultez la [documentation relative aux template variables Autodiscovery][1].

Contrairement aux fichiers de configuration automatique, **les stockages clé-valeur peuvent utiliser la version courte OU la version longue du nom d'image comme identificateur de conteneur**, p. ex. `redis` OU `redis:latest`.

[1]: /fr/agent/autodiscovery/template_variables
{{% /tab %}}
{{< /tabs >}}

### Intégrations Datadog/Apache et Datadog/Check HTTP

Les configurations ci-dessous s'appliquent à une image de conteneur Apache avec `<IDENTIFICATEUR_CONTENEUR>`: `httpd`. Les modèles Autodiscovery sont configurés pour recueillir des métriques et des logs provenant du conteneur Apache, et pour configurer un check HTTP/Datadog avec des instances afin de tester deux endpoints.

Les noms de check sont `apache`, `http_check` et leur `<CONFIG_INIT>`, `<CONFIG_INSTANCE>` et `<CONFIG_LOG>`. Les configurations complètes se trouvent sur les pages de documentation dédiées : [intégration Datadog/Apache][8], [intégration Datadog/check HTTP][9].

{{< tabs >}}
{{% tab "Kubernetes" %}}

```
apiVersion: v1
kind: Pod
metadata:
  name: apache
  annotations:
    ad.datadoghq.com/apache.check_names: '["apache","http_check"]'
    ad.datadoghq.com/apache.init_configs: '[{},{}]'
    ad.datadoghq.com/apache.instances: |
      [
        [
          {
            "apache_status_url": "http://%%host%%/server-status?auto"
          }
        ],
        [
          {
            "name": "<SITEWEB_1>",
            "url": "http://%%host%%/siteweb_1",
            "timeout": 1
          },
          {
            "name": "<SITEWEB_2>",
            "url": "http://%%host%%/siteweb_2",
            "timeout": 1
          }
        ]
      ]
    ad.datadoghq.com/apache.logs: '[{"source":"apache","service":"webapp"}]'
  labels:
    name: apache
spec:
  containers:
    - name: apache
      image: httpd
      ports:
        - containerPort: 80
```

{{% /tab %}}
{{% tab "Docker" %}}

```yaml
labels:
  com.datadoghq.ad.check_names: '["apache", "http_check"]'
  com.datadoghq.ad.init_configs: '[{},{}]'
  com.datadoghq.ad.instances: '[[{"apache_status_url": "http://%%host%%/server-status?auto"}],[{"name":"<SITEWEB_1>","url":"http://%%host%%/siteweb_1","timeout":1},{"name":"<SITEWEB_2>","url":"http://%%host%%/siteweb_2","timeout":1}]]'
  com.datadoghq.ad.logs: '[{"source": "apache", "service": "webapp"}]'
```

{{% /tab %}}
{{% tab "Fichier" %}}

* Créez les dossiers `conf.d/` et `conf.d/apache.d` sur votre host.
* Ajoutez le fichier de configuration automatique personnalisé ci-dessous à `conf.d/apache.d/conf.yaml` sur votre host.

```yaml
ad_identifier:
  - httpd

init_config:

instances:
  - apache_status_url: http://%%host%%/server-status?auto

logs:
  source: apache
  service: webapp
```

Remarque : cette [configuration de check Apache][1] peut sembler succincte, mais notez l'option `ad_identifier`. Cette option obligatoire vous permet de spécifier les identificateurs de conteneur. Autodiscovery applique ce modèle à tous les conteneurs sur le host qui exécute une image `httpd`. Consultez la documentation relative aux [identifiants Autodiscovery][2] pour en savoir plus.

* Créez ensuite le dossier `conf.d/http_check.d` sur votre host.
* Ajoutez le fichier de configuration automatique personnalisé ci-dessous à `conf.d/http_check.d/conf.yaml` sur votre host.

```
ad_identifier:
  - httpd

init_config:

instances:
  - name: "<SITEWEB_1>"
    url: "http://%%host%%/siteweb_1"
    timeout: 1

  - name: "<SITEWEB_2>"
    url: "http://%%host%%/siteweb_2"
    timeout: 1
```

* Enfin, montez le répertoire `conf.d/` du host dans le répertoire `conf.d/` de l'Agent conteneurisé.

[1]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[2]: /fr/agent/autodiscovery/ad_identifiers
{{% /tab %}}
{{% tab "ConfigMap" %}}

La ConfigMap suivante définit le modèle d'intégration pour les conteneurs `apache` et `http_check` avec les attributs` source` et `service` pour la collecte des logs `apache` :

```
kind: ConfigMap
apiVersion: v1
metadata:
  name: httpd-config-map
  namespace: default
data:
  apache-config: |-
    ad_identifiers:
      - httpd
    init_config:
    instances:
      - apache_status_url: http://%%host%%/server-status?auto
    logs:
      source: apache
      service: webapp
  http-check-config: |-
    ad_identifiers:
      - httpd
    init_config:
    instances:
      - name: "<SITEWEB_1>"
        url: "http://%%host%%/siteweb_1"
        timeout: 1
      - name: "<SITEWEB_2>"
        url: "http://%%host%%/siteweb_2"
        timeout: 1
```

Dans le manifeste, définissez les paramètres `volumeMounts` et `volumes` :

```
[...]
        volumeMounts:
        [...]
          - name: httpd-config-map
            mountPath: /conf.d
        [...]
      volumes:
      [...]
        - name: httpd-config-map
          configMap:
            name: httpd-config-map
            items:
              - key: apache-config
                path: /apache.d/conf.yaml
              - key: http-check-config
                path: /http_check.d/conf.yaml
[...]
```

{{% /tab %}}
{{% tab "Stockage clé-valeur" %}}

```
etcdctl set /datadog/check_configs/httpd/check_names '["apache", "http_check"]'
etcdctl set /datadog/check_configs/httpd/init_configs '[{}, {}]'
etcdctl set /datadog/check_configs/httpd/instances '[[{"apache_status_url": "http://%%host%%/server-status?auto"}],[{"name": "<SITEWEB_1>", "url": "http://%%host%%/siteweb_1", timeout: 1},{"name": "<SITEWEB_2>", "url": "http://%%host%%/siteweb_2", timeout: 1}]]'
etcdctl set /datadog/check_configs/httpd/logs '[{"source": "apache", "service": "webapp"}]'
```

**Remarque** : l'ordre de chaque liste est important. Pour que l'Agent soit en mesure de générer la configuration du check HTTP, toutes les parties de sa configuration doivent utiliser le même index sur l'ensemble des trois listes.


{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/integrations/#configuring-agent-integrations
[2]: /fr/integrations/ceph
[3]: /fr/integrations/varnish/#autodiscovery
[4]: /fr/integrations/postfix
[5]: /fr/integrations/cassandra/#agent-check-cassandra-nodetool
[6]: /fr/integrations/gunicorn
[7]: /fr/help
[8]: /fr/integrations/apache/#setup
[9]: /fr/integrations/http_check/#setup