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
Autodiscovery vous permet d'appliquer une configuration d'intégration Datadog lors de l'exécution d'un check de l'Agent sur un conteneur donné. Pour obtenir davantage de contexte sur cette logique, découvrez comment [configurer les intégrations de l'Agent][1] lors de l'exécution de l'Agent sur un host. Pour configurer une intégration avec Autodiscovery, les paramètres suivants sont requis :

* `<NOM_INTÉGRATION>` : le nom de l'intégration Datadog.
* `<CONFIG_INIT>` : la configuration de la section `init_config:` pour l'intégration Datadog-`<NOM_INTÉGRATION>` donnée.
* `<CONFIG_INSTANCE>` : la configuration de la section `instances:` pour l'intégration Datadog-`<NOM_INTÉGRATION>` donnée.

En outre, si vous utilisez l'Agent version 6.5+, vous pouvez également utiliser le paramètre suivant pour configurer votre [collecte de logs][2] avec Autodiscovery :

* `<CONFIG_LOG>` : la configuration de la section `logs:` pour l'intégration Datadog-`<NOM_INTÉGRATION>` donnée.

Chaque onglet des sections ci-dessous présente une façon différente d'appliquer des modèles d'intégration à un conteneur donné. Les méthodes documentées disponibles sont :

* [Utiliser un fichier de configuration monté dans l'Agent](?tab=file#configuration)
* [Utiliser des bases de données clé-valeur](?tab=keyvaluestore#configuration)
* [Utiliser des annotations Kubernetes](?tab=kubernetespodannotations#configuration)
* [Utiliser des étiquettes Docker](?tab=dockerlabel#configuration)

Si vous définissez un modèle pour une même intégration via plusieurs sources de modèle, l'Agent recherche des modèles dans l'ordre suivant (et utilise le premier trouvé) :

* Annotations Kubernetes
* Étiquettes Docker
* Fichiers

**Remarque** : les intégrations prises en charge suivantes requièrent des étapes supplémentaires pour fonctionner avec Autodiscovery : [Ceph][3], [Varnish][4], [Postfix][5], [Cassandra Nodetools][6] et [Gunicorn][7]. Contactez [l'assistance Datadog][8] pour obtenir de l'aide.

## Configuration

{{< tabs >}}
{{% tab "Annotations de pod Kubernetes" %}}

Vous pouvez stocker vos modèles d'intégration dans les annotations de pod Kubernetes. Lorsque Autodiscovery est activé, l'Agent détecte s'il est exécuté sur Kubernetes et examine alors automatiquement toutes les annotations de pod à la recherche de modèles d'intégration.

Pour appliquer une configuration spécifique à un conteneur donné, Autodiscovery identifie les conteneurs par _nom_, **PAS par image** (comme il le fait pour les fichiers de configuration automatique et les bases de données clé-valeur). En d'autres termes, il cherche à associer `<IDENTIFIANT_CONTENEUR>` à `.spec.containers[0].name`, et non à `.spec.containers[0].image`. Pour configurer Autodiscovery pour une intégration Datadog sur un `<IDENTIFIANT_CONTENEUR>` donné dans votre pod, ajoutez les annotations suivantes à votre Pod :

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<NOM_POD>'
  annotations:
    ad.datadoghq.com/<IDENTIFIANT_CONTENEUR>.check_names: '[<NOM_CHECK>]'
    ad.datadoghq.com/<IDENTIFIANT_CONTENEUR>.init_configs: '[<CONFIG_INIT>]'
    ad.datadoghq.com/<IDENTIFIANT_CONTENEUR>.instances: '[<CONFIG_INSTANCE>]'
    ad.datadoghq.com/<IDENTIFIANT_CONTENEUR>.logs: '[<CONFIG_LOG>]'
    # (...)
spec:
  containers:
    - name: '<IDENTIFIANT_CONTENEUR>'
# (...)
```

Pour appliquer deux modèles d'intégration différents à deux conteneurs différents : `<IDENTIFIANT_CONTENEUR_1>` et `<IDENTIFIANT_CONTENEUR_2>` dans votre Pod, ajoutez les annotations suivantes à votre pod :

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<NOM_POD>'
  annotations:
    ad.datadoghq.com/<IDENTIFIANT_CONTENEUR_1>.check_names: '[<NOM_CHECK_1>]'
    ad.datadoghq.com/<IDENTIFIANT_CONTENEUR_1>.init_configs: '[<CONFIG_INIT_1>]'
    ad.datadoghq.com/<IDENTIFIANT_CONTENEUR_1>.instances: '[<CONFIG_INSTANCE_1>]'
    ad.datadoghq.com/<IDENTIFIANT_CONTENEUR_1>.logs: '[<CONFIG_LOG_1>]'
    # (...)
    ad.datadoghq.com/<IDENTIFIANT_CONTENEUR_2>.check_names: '[<NOM_CHECK_2>]'
    ad.datadoghq.com/<IDENTIFIANT_CONTENEUR_2>.init_configs: '[<CONFIG_INIT_2>]'
    ad.datadoghq.com/<IDENTIFIANT_CONTENEUR_2>.instances: '[<CONFIG_INSTANCE_2>]'
    ad.datadoghq.com/<IDENTIFIANT_CONTENEUR_2>.logs: '[<CONFIG_LOG_2>]'
spec:
  containers:
    - name: '<IDENTIFIANT_CONTENEUR_1>'
    # (...)
    - name: '<IDENTIFIANT_CONTENEUR_2>'
# (...)
```

**Remarque** : si vous définissez directement vos pods Kubernetes (c'est-à-dire `kind: Pod`), ajoutez les annotations de chaque pod directement dans sa section `metadata`. Si vous définissez _indirectement_ les pods avec des ReplicationControllers, des ReplicaSets ou des Deployments, ajoutez les annotations de pod dans `.spec.template.metadata`.

{{% /tab %}}
{{% tab "Étiquette Docker" %}}

Il est possible de stocker vos modèles d'intégration en tant qu'étiquettes Docker : l'Agent détecte s'il est exécuté sur Docker et recherche automatiquement toutes les étiquettes pour les modèles d'intégration. Autodiscovery s'attend à ce que les étiquettes ressemblent à ces exemples, selon le type de fichier :

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
  com.datadoghq.ad.logs: '[<CONFIGS_LOGS>]'
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
    image: '<IMAGE_NAME>'
    labels:
      com.datadoghq.ad.check_names: '[<NOM_CHECK>]'
      com.datadoghq.ad.init_configs: '[<CONFIG_INIT>]'
      com.datadoghq.ad.instances: '[<CONFIG_INSTANCE>]'
      com.datadoghq.ad.logs: '[<CONFIG_LOGS>]'

```

{{% /tab %}}
{{% tab "Fichier" %}}

Le stockage de modèles en tant que fichiers locaux et le montage de ces derniers dans l'Agent conteneurisé ne requiert pas de service externe ou de plateforme d'orchestration spécifique. L'inconvénient est que vous devez redémarrer les conteneurs de l'Agent chaque fois que vous modifiez, ajoutez ou supprimez des modèles. L'Agent recherche les modèles Autodiscovery dans le répertoire monté `/conf.d`, qui contient des modèles par défaut pour les checks suivants : [Apache][1], [Consul][2], [CouchDB][3], [Couchbase][4], [Elasticsearch][5], [Etcd][6], [Kubernetes_state][7], [Kube_dns][8], [Kube_proxy][9], [Kyototycoon][10], [Memcached][11], [Redis][12] et [Riak][13].

À partir de la version 6.2.0 (et 5.24.0), les modèles par défaut utilisent le port par défaut pour le logiciel surveillé au lieu de le détecter automatiquement. Si vous devez utiliser un port différent, spécifiez un modèle Autodiscovery personnalisé dans les [étiquettes de conteneur Docker](?tab=etiquette-docker) ou dans les [annotations de pod Kubernetes](?tab=annotations-kubernetes).

Ces modèles d'intégration peuvent convenir dans les cas simples. Toutefois, si vous avez besoin de personnaliser les configurations de votre intégration Datadog (par exemple pour activer des options supplémentaires, pour utiliser des identifiants de conteneur différents ou pour utiliser les index de Template Variables), vous devez écrire vos propres fichiers de configuration automatique et les utiliser avec l'Agent conteneurisé Datadog. Pour cela :

1. Créez un fichier `autodiscovery.d/<NOM_INTÉGRATION>.d/conf.yaml` sur votre host, celui-ci contenant votre configuration automatique personnalisée.
2. Montez ce fichier dans le répertoire `conf.d/<NOM_INTÉGRATION>.d/` de l'Agent conteneurisé. Notez que dans Kubernetes, vous pouvez les ajouter [avec ConfigMaps][14].

Votre fichier de configuration automatique doit avoir le format suivant :

```
ad_identifier:
  <IDENTIFIANT_INTÉGRATION_AUTODISCOVERY>

init_config:
  <CONFIG_INIT>

instances:
  <CONFIG_INSTANCES>
```

Consultez la documentation sur [l'identifiant de conteneur Autodiscovery][15] pour comprendre la signification de `<IDENTIFIANT_INTÉGRATION_AUTODISCOVERY>`.

**Remarque** : vous n'avez pas à configurer `<NOM_INTÉGRATION>` ici, car l'Agent le récupère directement à partir du nom du fichier.

[1]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/auto_conf.yaml
[2]: https://github.com/DataDog/integrations-core/blob/master/consul/datadog_checks/consul/data/auto_conf.yaml
[3]: https://github.com/DataDog/integrations-core/blob/master/couch/datadog_checks/couch/data/auto_conf.yaml
[4]: https://github.com/DataDog/integrations-core/blob/master/couchbase/datadog_checks/couchbase/data/auto_conf.yaml
[5]: https://github.com/DataDog/integrations-core/blob/master/elastic/datadog_checks/elastic/data/auto_conf.yaml
[6]: https://github.com/DataDog/integrations-core/blob/master/etcd/datadog_checks/etcd/data/auto_conf.yaml
[7]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_state/datadog_checks/kubernetes_state/data/auto_conf.yaml
[8]: https://github.com/DataDog/integrations-core/blob/master/kube_dns/datadog_checks/kube_dns/data/auto_conf.yaml
[9]: https://github.com/DataDog/integrations-core/blob/master/kube_proxy/datadog_checks/kube_proxy/data/conf.yaml.example
[10]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/datadog_checks/kyototycoon/data/auto_conf.yaml
[11]: https://github.com/DataDog/integrations-core/blob/master/mcache/datadog_checks/mcache/data/auto_conf.yaml
[12]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/auto_conf.yaml
[13]: https://github.com/DataDog/integrations-core/blob/master/riak/datadog_checks/riak/data/auto_conf.yaml
[14]: /fr/agent/kubernetes/integrations/#configmap
[15]: /fr/agent/autodiscovery/ad_identifiers
{{% /tab %}}
{{% tab "Base de données clé-valeur" %}}

Autodiscovery peut utiliser [Consul][1], Etcd et Zookeeper comme sources de modèle d'intégration. Pour utiliser une base de données clé-valeur, vous devez la configurer dans le fichier de configuration `datadog.yaml` de l'Agent et monter ce fichier dans l'agent conteneurisé. Vous pouvez également transmettre votre base de données clé-valeur comme variables d'environnement à l'Agent conteneurisé.

**Configurer dans datadog.yaml** :

Dans le fichier `datadog.yaml`, définissez l'adresse `<IP_BASEDONNÉES_CLÉ_VALEUR>` et le port `<PORT_BASEDONNÉES_CLÉ_VALEUR>` de votre base de données clé-valeur :

  ```yaml
  config_providers:
    - name: etcd
      polling: true
      template_dir: /datadog/check_configs
      template_url: '<IP_BASEDONNÉES_CLÉVALEUR>:<PORT_BASEDONNÉES_CLÉVALEUR>'
      username:
      password:

    - name: consul
      polling: true
      template_dir: datadog/check_configs
      template_url: '<IP_BASEDONNÉES_CLÉVALEUR>:<PORT_BASEDONNÉES_CLÉVALEUR>'
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
      template_url: '<IP_BASEDONNÉES_CLÉVALEUR>:<PORT_BASEDONNÉES_CLÉVALEUR>'
      username:
      password:
  ```

[Redémarrez ensuite l'Agent][2] pour prendre en compte le changement de configuration.

**Configurer dans les variables d'environnement** :

Lorsque la base de données clé-valeur est activée en tant que source de modèle, l'Agent recherche des modèles à partir de la clé `/datadog/check_configs`. Autodiscovery s'attend à une hiérarchie clé-valeur comme suit :

```yaml
/datadog/
  check_configs/
    <IDENTIFIANT_CONTENEUR>/
      - check_names: ["<NOM_INTÉGRATION>"]
      - init_configs: ["<CONFIG_INIT>"]
      - instances: ["<CONFIG_INSTANCE>"]
      - logs: ["<CONFIG_LOGS>"]
    ...
```

**Remarque** : pour appliquer une configuration spécifique à un conteneur donné, Autodiscovery identifie les conteneurs par **image** en cas d'utilisation de bases de données clé-valeur. En d'autres termes, il cherche à associer `<IDENTIFIANT_CONTENEUR>` à `.spec.containers[0].image`.

[1]: /fr/integrations/consul
[2]: /fr/agent/guide/agent-commands
{{% /tab %}}
{{< /tabs >}}

Les deux sections ci-dessous offrent des exemples pour toutes les méthodes précédentes :

* [Intégration Datadog/Redis](#datadog-redis-integration)
* [Intégrations Datadog/Apache et Datadog/Check HTTP](#datadog-apache-and-http-check-integrations)

## Exemples
### Intégration Datadog/Redis

{{< tabs >}}
{{% tab "Annotations de pod Kubernetes" %}}

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
    ad.datadoghq.com/redis.logs: [{"source":"redis","service":"redis"}]
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
{{% tab "Étiquette Docker" %}}

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

Redis est l'un des modèles Autodiscovery par défaut inclus avec l'Agent : il n'est donc pas nécessaire de monter ce fichier. Voici le modèle de configuration automatique `redis.yaml` inclus avec l'Agent :

```yaml
ad_identifiers:
  - redis

init_config:

instances:

  - host: "%%host%%"
    port: "6379"
```

Cette [configuration d'intégration Redis][1] peut sembler succincte, mais notez l'option `ad_identifiers`. Cette option obligatoire vous permet de spécifier les identifiants de conteneur. Autodiscovery applique ce modèle à tous les conteneurs sur le host qui exécute une image `redis`.

**Consultez la documentation relative aux [identifiants Autodiscovery][2] pour en savoir plus.**

Supposons maintenant que votre Redis requiert un `password` supplémentaire pour accéder à son endpoint stats et que vous souhaitez appliquer le flag adéquat aux logs qui en sortent. Pour prendre en compte cette nouvelle logique :

1. Créez un répertoire `autodiscovery.d/` sur votre host.
2. Ajoutez le fichier de configuration automatique personnalisé `redisdb.yaml` ci-dessous à ce répertoire.
3. Montez le répertoire `autodiscovery.d/` dans le répertoire `conf.d/` de l'Agent conteneurisé.

```yaml
ad_identifiers:
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
{{% tab "Base de données clé-valeur" %}}

Les commandes etcd suivantes créent un modèle d'intégration Redis avec un paramètre `password` personnalisé et taguent tous ses logs avec les attributs `source` et `service` adéquats :

```
etcdctl mkdir /datadog/check_configs/redis
etcdctl set /datadog/check_configs/redis/check_names '["redisdb"]'
etcdctl set /datadog/check_configs/redis/init_configs '[{}]'
etcdctl set /datadog/check_configs/redis/instances '[{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
etcdctl set /datadog/check_configs/redis/logs '[{"source": "redis", "service": "redis"}]'
```

**Remarque** : la logique de template variable `"%%env_<ENV_VAR>%%"` est utilisée afin d'éviter de stocker le mot de passe en clair. La variable d'environnement `REDIS_PASSWORD` doit donc être transmise à l'Agent. Consultez la [documentation relative aux template variables Autodiscovery][1].

Notez que chacune des trois valeurs est une liste. Autodiscovery assemble les éléments de liste dans les configurations d'intégration en fonction des index de liste partagée. Pour ce cas précis, il assemble la première (et unique) configuration de check à partir de `check_names[0]`, `init_configs[0]` et `instances[0]`.

Contrairement aux fichiers auto-conf, **les bases de données clé-valeur peuvent utiliser la version courte OU la version longue du nom d'image comme identifiant de conteneur**, p. ex. `redis` OU `redis:latest`.

[1]: /fr/agent/autodiscovery/template_variables
{{% /tab %}}
{{< /tabs >}}

### Intégrations Datadog/Apache et Datadog/Check HTTP

Les configurations ci-dessous appliquent une image de conteneur Apache avec `<IDENTIFIANT_CONTENEUR>` : `httpd`. Les modèles Autodiscovery sont configurés pour recueillir des métriques et des logs provenant du conteneur Apache, et pour configurer un check HTTP/Datadog avec deux instances afin de tester deux endpoints et ainsi surveiller si les sites Web créés par le conteneur Apache sont disponibles :

Les noms de check sont `apache` et `http_check`, et leurs configurations complètes `<CONFIG_INIT>`, `<CONFIG_INSTANCE>`, et `<CONFIG_LOG>` se trouvent sur leurs pages de documentation respectives : [intégration Datadog/Apache][9], [intégration Datadog/check HTTP][10].

{{< tabs >}}
{{% tab "Annotations de pod Kubernetes" %}}

```
apiVersion: v1
kind: Pod
metadata:
  name: apache
  annotations:
    ad.datadoghq.com/apache.check_names: ["apache","http_check"]
    ad.datadoghq.com/apache.init_configs: [{},{}]
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
    ad.datadoghq.com/apache.logs: [{"source":"apache","service":"webapp"}]
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
{{% tab "Étiquette Docker" %}}

```yaml
labels:
  com.datadoghq.ad.check_names: '["apache", "http_check"]'
  com.datadoghq.ad.init_configs: '[{},{}]'
  com.datadoghq.ad.instances: '[[{"apache_status_url": "http://%%host%%/server-status?auto"}],[{"name":"<WEBSITE_1>","url":"http://%%host%%/website_1","timeout":1},{"name":"<WEBSITE_2>","url":"http://%%host%%/website_2","timeout":1}]]'
  com.datadoghq.ad.logs: '[{"source": "apache", "service": "webapp"}]'
```

{{% /tab %}}
{{% tab "Fichier" %}}

Créez d'abord un répertoire `autodiscovery.d/` sur votre host. Ajoutez ensuite le fichier de configuration automatique personnalisé suivant, appelé `apache.yaml`, à ce répertoire :

```yaml
ad_identifiers:
  - httpd

init_config:

instances:
  - apache_status_url: http://%%host%%/server-status?auto

logs:
  source: apache
  service: webapp
```

Remarque : cette [configuration de check Apache][1] peut sembler succincte, mais notez l'option `ad_identifiers`. Cette option obligatoire vous permet de spécifier les identifiants de conteneur. Autodiscovery applique ce modèle à tous les conteneurs sur le host qui exécute une image `httpd`. **Consultez la documentation relative aux [identifiants Autodiscovery][2] pour en savoir plus**.

Ajoutez ensuite le fichier de configuration automatique personnalisé suivant, appelé `http_check.yaml`, à ce répertoire :

```yaml
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

Enfin, montez le répertoire `autodiscovery.d/` dans le répertoire `conf.d/` de l'Agent conteneurisé.

[1]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[2]: /fr/agent/autodiscovery/ad_identifiers
{{% /tab %}}
{{% tab "Base de données clé-valeur" %}}

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
[2]: /fr/logs
[3]: /fr/integrations/ceph
[4]: /fr/integrations/varnish/#autodiscovery
[5]: /fr/integrations/postfix
[6]: /fr/integrations/cassandra/#agent-check-cassandra-nodetool
[7]: /fr/integrations/gunicorn
[8]: /fr/help
[9]: /fr/integrations/apache/#setup
[10]: /fr/integrations/http_check/#setup