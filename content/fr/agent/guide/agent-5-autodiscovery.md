---
title: Autodiscovery avec l'Agent v5
kind: guide
private: true
aliases:
  - /fr/agent/faq/agent-5-autodiscovery
---
<div class="alert alert-info">
Autodiscovery était autrefois appelé Service Discovery. Il est toujours appelé Service Discovery dans l'ensemble du code de l'Agent et dans certaines options de configuration.
</div>

Docker connait une [adoption rapide][1]. Les plateformes d'orchestration comme Docker Swarm, Kubernetes et Amazon ECS facilitent l'exécution de services Dockerisés et les rendent plus robustes en gérant l'orchestration et la réplication entre les hosts. L'utilisation de ces plateformes rend toutefois la surveillance plus difficile. Comment surveiller pleinement un service qui passe d'un host à un autre sans prévenir ?

Grâce à sa fonctionnalité Autodiscovery, l'Agent Datadog peut automatiquement suivre l'endroit où chaque service est exécuté. Autodiscovery vous permet de définir des modèles de configuration pour les checks de l'Agent et de spécifier les conteneurs sur lesquels chaque check doit s'appliquer.

À mesure que les conteneurs changent, l'Agent active, désactive et régénère les configurations de check statiques à partir des modèles. Lorsque votre conteneur NGINX se déplace de 10.0.0.6 à 10.0.0.17, Autodiscovery aide l'Agent à mettre à jour sa configuration de check NGINX avec la nouvelle adresse IP, de manière à ce qu'il continue à recueillir les métriques NGINX sans action supplémentaire de votre part.

## Présentation

Dans un environnement traditionnel sans conteneur, la configuration de l'Agent Datadog est statique, tout comme l'environnement dans lequel il fonctionne. Lorsqu'il démarre, l'Agent analyse les fichiers de configuration des checks. Il exécute ensuite continuellement chaque check configuré aussi longtemps qu'il fonctionne.

Les fichiers de configuration sont statiques, et les options réseau configurées dans ces fichiers servent à identifier les instances spécifiques d'un certain service surveillé (p. ex. une instance Redis sur 10.0.0.61:6379). Lorsqu'un check de l'Agent ne parvient pas à se connecter au service en question, les métriques ne sont pas envoyées jusqu'au dépannage du problème. Le check de l'Agent répète ses tentatives de connexion échouée jusqu'à ce qu'un administrateur rétablisse le service surveillé ou répare la configuration du check.

Une fois la fonctionnalité Autodiscovery activée, l'Agent exécute les checks différemment.

### Différence de configuration

Les fichiers de configuration statiques ne conviennent pas aux checks qui recueillent des données en provenance d'endpoints réseau qui évoluent constamment. C'est pourquoi Autodiscovery utilise des **modèles** pour les configurations de check. Dans chaque modèle, l'Agent recherche deux template variables, `%%host%%` et `%%port%%`, qui viennent remplacer les options réseau normalement codées en dur. Par exemple, un modèle pour le [check Go Expvar][2] de l'Agent contient l'option `expvar_url: http://%%host%%:%%port%%`. Pour les conteneurs qui disposent de plusieurs adresses IP ou ports exposés, vous pouvez demander à Autodiscovery de choisir l'adresse et le port adéquats en utilisant les [index de template variable](#template-variables-utilisables).

Les modèles n'identifient pas les instances spécifiques d'un service surveillé, c'est-à-dire leur `%%host%%` et leur `%%port%%`. C'est pourquoi Autodiscovery a besoin d'un ou plusieurs **identificateurs de conteneur** pour chaque modèle afin de déterminer les adresses IP et les ports remplacer dans les modèles. Pour Docker, les identificateurs de conteneur sont des noms d'image ou des étiquettes de conteneur.

Enfin, Autodiscovery peut charger des modèles de check depuis des emplacements autres que des disques. Les autres **sources de modèle** possibles comprennent les systèmes de stockage clé/valeur comme Consul, et les annotations de pod en cas d'exécution sur Kubernetes.

### Différence d'exécution

Lorsque l'Agent démarre avec Autodiscovery activé, il charge les modèles de check à partir de l'ensemble des sources de modèle disponibles, [pas uniquement l'une d'entre elles](#priorite-des-sources-de-modele), ainsi que les identificateurs de conteneur du modèle. Contrairement à la configuration traditionnelle de l'Agent, l'Agent n'exécute pas tous les checks en permanence. Il détermine les checks à activer en examinant les conteneurs en cours d'exécution sur le même host que l'Agent.

Lorsque l'Agent inspecte chaque conteneur qui s'exécute, il vérifie si le conteneur correspond à l'un des identificateurs de conteneur de l'un des modèles chargés. Pour chaque correspondance, l'Agent génère une configuration de check statique en remplaçant l'adresse IP et le port du conteneur correspondant. L'Agent active ensuite le check à l'aide de la configuration statique.

L'Agent surveille les événements Docker (créations, destructions, démarrages et arrêts de conteneurs Docker) puis active, désactive et régénère les configurations de check statiques en fonction de ces événements.

## Configuration

### Exécuter le conteneur de l'Agent

Quelle que soit la plateforme d'orchestration de conteneur que vous utilisez, commencez par exécuter un seul [conteneur docker-dd-agent][3] sur chaque host dans votre cluster. Si vous utilisez Kubernetes, consultez la [page d'intégration Kubernetes][4] pour obtenir des instructions sur l'exécution de docker-dd-agent. Si vous utilisez Amazon ECS, consultez la [page d'intégration correspondante][5].

Si vous utilisez Docker Swarm, exécutez la commande suivante sur l'un de vos nœuds de gestionnaire :

    docker service create \
      --name dd-agent \
      --mode global \
      --mount type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock \
      --mount type=bind,source=/proc/,target=/host/proc/,ro=true \
      --mount type=bind,source=/sys/fs/cgroup/,target=/host/sys/fs/cgroup,ro=true \
      -e API_KEY=<VOTRE_CLÉ_API_DATADOG> \
      -e SD_BACKEND=docker \
      gcr.io/datadoghq/docker-dd-agent:latest

Sinon, consultez la documentation de docker-dd-agent pour obtenir des instructions détaillées ainsi que la liste complète des [variables d'environnement][6] prises en charge.

**Si vous souhaitez que l'Agent découvre automatiquement les checks basés sur JMX** :

1. Utilisez l'image `gcr.io/datadoghq/docker-dd-agent:latest-jmx`. Elle est basée sur `latest`, mais comprend une JVM dont l'Agent a besoin pour exécuter [jmxfetch][7].
2. Envoyez la variable d'environnement `SD_JMX_ENABLE=yes` au démarrage de `gcr.io/datadoghq/docker-dd-agent:latest-jmx`.

## Modèles de check

Chaque section **Template Source** ci-dessous affiche une façon différente de configurer les modèles de checks et leurs identificateurs de conteneur.

### Fichiers (auto-conf)

Vous pouvez facilement stocker des modèles en tant que fichiers locaux. Cela ne nécessite aucun service externe ni aucune plateforme d'orchestration spécifique. Vous devrez cependant redémarrer les conteneurs de votre Agent à chaque modification, ajout ou suppression de modèle.

L'Agent recherche des modèles Autodiscovery dans son répertoire `conf.d/auto_conf`, qui contient des modèles par défaut pour les checks suivants :

- [Apache][8]
- [Consul][9]
- [CouchDB][10]
- [Couchbase][11]
- [Elasticsearch][12]
- [Etcd][13]
- [Kubernetes_state][14]
- [Kube_dns][15]
- [Kyototycoon][16]
- [Memcached][17]
- [Redis][18]
- [Riak][19]

Ces modèles peuvent convenir dans les simples. Toutefois, si vous avez besoin d'utiliser des configurations de check de l'Agent personnalisées, par exemple pour activer des options de check supplémentaires, pour faire appel à des identificateurs de conteneur différents ou pour utiliser des [index de template variable](#template-variables-utilisables), vous devrez écrire vos propres fichiers de configuration automatique. Vous pouvez les utiliser de différentes manières :

1. Ajoutez-les à chaque host qui exécute docker-dd-agent et [montez le répertoire qui les contient][20] sur le conteneur docker-dd-agent à son démarrage
2. Créez votre propre image docker basée sur docker-dd-agent, en ajoutant vos modèles personnalisés à `/etc/dd-agent/conf.d/auto_conf`
3. Sur Kubernetes, ajoutez-les via ConfigMaps

### Check Apache

Voici le modèle `apache.yaml` fourni avec docker-dd-agent :

```yaml
docker_images:
  - httpd

init_config:

instances:
  - apache_status_url: http://%%host%%/server-status?auto
```

Cette [configuration de check Apache][21] peut sembler succincte, mais notez l'option `docker_images`. Cette option obligatoire vous permet de spécifier les identifiants de conteneur. Autodiscovery applique ce modèle à tous les conteneurs sur le host qui exécute une image `httpd`.

_N'importe quelle_ image `httpd`. Supposez que vous avez un conteneur qui exécute `library/httpd:latest` et un autre qui exécute `votrenomdecompte/httpd:v2`.  Autodiscovery applique le modèle ci-dessus aux deux conteneurs. Lorsqu'il charge les fichiers de configuration automatique, Autodiscovery n'est pas en mesure de distinguer les images portant le même nom qui sont issues de sources ou associés à des tags différents. Par conséquent, **vous devez spécifier les noms abrégés des images de conteneur**, p. ex. `httpd` au lieu de `library/httpd:latest`.

Si cette limite est trop contraignante et que vous souhaitez appliquer des configurations de check différentes à plusieurs conteneurs exécutant la même image, utilisez des étiquettes pour identifier les conteneurs. Appliquez une étiquette différente à chaque conteneur, puis ajoutez chaque étiquette à la liste `docker_images` d'un fichier de modèle (oui, `docker_images` n'est pas seulement fait pour les images : c'est aussi là que doivent figurer les identificateurs de conteneur).

### Stockage key-value

Autodiscovery peut utiliser Consul, etcd et Zookeeper comme sources de modèle. Pour utiliser un stockage clé/valeur, vous devez le configurer dans `datadog.conf` ou dans les variables d'environnement passées au conteneur docker-dd-agent.

#### Configuration dans datadog.conf

Dans le fichier `datadog.conf`, définissez les options `sd_config_backend`, `sd_backend_host` et `sd_backend_port` sur le type de stockage clé/valeur utilisé (`etcd`, `consul`, ou `zookeeper`), l'adresse IP du stockage clé/valeur ainsi que le port du stockage clé/valeur, respectivement :

```text
# Pour le moment, seul Docker est pris en charge. Vous pouvez donc simplement supprimer la mise en commentaire de cette ligne.
service_discovery_backend: docker

# Définissez le stockage jey/value à utiliser pour rechercher les modèles de configuration.
# Le paramètre par défaut est etcd. Consul est également pris en charge.
sd_config_backend: etcd

# Paramètres de connexion au backend. Modifiez ces valeurs par défaut si votre configuration est différente.
sd_backend_host: 127.0.0.1
sd_backend_port: 4001

# Par défaut, l'Agent recherche les modèles de configuration à partir de la
# clé `/datadog/check_configs` dans le backend.
# Pour modifier ce paramètre, supprimez la mise en commentaire de cette option et modifiez sa valeur.
# sd_template_dir: /datadog/check_configs

# Si votre stockage Consul requiert une authentification par token pour la découverte des services, vous pouvez définir ce token ici.
# consul_token: f45cbd0b-5022-samp-le00-4eaa7c1f40f1
```

Si vous utilisez Consul et que le cluster Consul requiert une authentification, définissez `consul_token`.

[Redémarrez l'Agent][22] pour prendre en compte le changement de configuration.

#### Configurer dans des variables d'environnement

Si vous préférez utiliser des variables d'environnement, passez les mêmes options au conteneur lors de son démarrage :

```shell
docker service create \
  --name dd-agent \
  --mode global \
  --mount type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock \
  --mount type=bind,source=/proc/,target=/host/proc/,ro=true \
  --mount type=bind,source=/sys/fs/cgroup/,target=/host/sys/fs/cgroup,ro=true \
  -e API_KEY=<VOTRE_CLÉ_API> \
  -e SD_BACKEND=docker \
  -e SD_CONFIG_BACKEND=etcd \
  -e SD_BACKEND_HOST=127.0.0.1 \
  -e SD_BACKEND_PORT=4001 \
  gcr.io/datadoghq/docker-dd-agent:latest
```

Notez que l'option permettant d'activer Autodiscovery est appelée `service_discovery_backend` dans `datadog.conf`, mais simplement `SD_BACKEND` en tant que variable d'environnement.

---

Lorsque le stockage de clé/valeur est activé en tant que source de modèle, l'Agent recherche des modèles à partir de la clé `/datadog/check_configs`. Autodiscovery s'attend à une hiérarchie clé/valeur comme suit :

```text
/datadog/
  check_configs/
    docker_image_1/                 # identificateur de conteneur, p. ex. httpd
      - check_names: [<NOM_CHECK>] # p. ex. apache
      - init_configs: [<CONFIG_INIT>]
      - instances: [<CONFIG_INSTANCE>]
    ...
```

Chaque modèle contient trois éléments : nom du check, `init_config`, et `instances`. L'option `docker_images` de la section précédente, qui fournissait les identificateurs de conteneur à Autodiscovery, n'est pas obligatoire ici. Pour les stockages clé/valeur, les identificateurs de conteneur apparaissent comme clés de premier niveau dans `check_config`. (Notez également que le modèle sous forme de fichier à la section précédente ne nécessitait pas de nom de check, contrairement à cet exemple. L'Agent déduisait le nom du check à partir du nom du fichier.)

#### Check Apache

Les commandes etcd suivantes créer un modèle de check Apache équivalent à celui de l'exemple de la section précédente :

```text
etcdctl mkdir /datadog/check_configs/httpd
etcdctl set /datadog/check_configs/httpd/check_names '["apache"]'
etcdctl set /datadog/check_configs/httpd/init_configs '[{}]'
etcdctl set /datadog/check_configs/httpd/instances '[{"apache_status_url": "http://%%host%%/server-status?auto"}]'
```

Notez que chacune des trois valeurs est une liste. Autodiscovery assemble les éléments de liste en fonction des index de liste partagée de manière à générer la configuration de check. Dans le cas présent, il assemble la première (et unique) configuration de check à partir de `check_names[0]`, `init_configs[0]` et `instances[0]`.

Contrairement aux fichiers auto-conf, **les stockages clé/valeur peuvent utiliser le nom d'image court OU long comme identificateurs de conteneur**, p. ex. `httpd` OU `library/httpd:latest`. L'exemple qui suit utilise un nom long.

#### Check Apache avec surveillance de la disponibilité d'un site Web

La commande etcd suivante crée le même modèle Apache et ajoute un modèle de [check HTTP][23] pour surveiller la disponibilité du site Web créé par le conteneur Apache :

```text
etcdctl set /datadog/check_configs/library/httpd:latest/check_names '["apache", "http_check"]'
etcdctl set /datadog/check_configs/library/httpd:latest/init_configs '[{}, {}]'
etcdctl set /datadog/check_configs/library/httpd:latest/instances '[{"apache_status_url": "http://%%host%%/server-status?auto"},{"name": "Mon service", "url": "http://%%host%%", timeout: 1}]'
```

Là encore, l'ordre de chaque liste est important. Pour que l'Agent soit en mesure de générer la configuration du check HTTP, toutes les parties de sa configuration doivent utiliser le même index sur l'ensemble des trois listes (ce qui est le cas : l'index est 1).

### Annotations de pod Kubernetes

À partir de la version 5.12 de l'Agent Datadog, vous pouvez stocker les modèles de check dans les annotations de pod Kubernetes. Lorsque Autodiscovery est activé, l'Agent détecte s'il est exécuté sur Kubernetes et examine alors automatiquement toutes les annotations de pod à la recherche de modèles de check. Il n'est pas nécessaire de configurer Kubernetes comme source de modèle (c'est-à-dire via `SD_CONFIG_BACKEND`) comme vous le feriez avec les stockages clé/valeur.

Autodiscovery s'attend à des annotations de ce type :

```text
annotations:
  service-discovery.datadoghq.com/<identificateur de conteneur>.check_names: '[<NOM_CHECK>]'
  service-discovery.datadoghq.com/<identificateur de conteneur>.init_configs: '[<CONFIG_INIT>]'
  service-discovery.datadoghq.com/<identificateur de conteneur>.instances: '[<CONFIG_INSTANCE>]'
```

Le format est semblable à celui des stockages clé/valeur. Voici les différences :

* Les annotations doivent commencer par `service-discovery.datadoghq.com/` (pour les stockages clé/valeur, l'indicateur de début est `/datadog/check_configs/`).
* Pour les annotations, Autodiscovery identifie les conteneurs via leur _nom_, et non via leur image (comme il le fait pour les fichiers de configuration automatique et les stockages clé/valeur). En d'autres termes, il cherche à faire correspondre `<identificateur de conteneur>` avec `.spec.containers[0].name`, pas avec `.spec.containers[0].image`.

Si vous définissez directement vos pods Kubernetes (c'est-à-dire avec `kind: Pod`), ajoutez les annotations de chaque pod directement dans sa section `metadata` (voir le premier exemple ci-dessous). Si vous définissez _indirectement_ les pods avec des ReplicationControllers, des ReplicaSets ou des Deployments, ajoutez les annotations de pod dans `.spec.templates.metadata` (voir le deuxième exemple ci-dessous).

#### Check Apache avec surveillance de la disponibilité d'un site Web

L'annotation de pod suivante définit deux modèles, équivalant à ceux présentés à la fin de la section précédente, pour les conteneurs `apache` :

```text
apiVersion: v1
kind: Pod
metadata:
  name: apache
  annotations:
    service-discovery.datadoghq.com/apache.check_names: '["apache","http_check"]'
    service-discovery.datadoghq.com/apache.init_configs: '[{},{}]'
    service-discovery.datadoghq.com/apache.instances: '[{"apache_status_url": "http://%%host%%/server-status?auto"},{"name": "Mon service", "url": "http://%%host%%", timeout: 1}]'
  labels:
    name: apache
spec:
  containers:
    - name: apache # utilisez cette valeur comme identificateur de conteneur dans vos annotations
      image: httpd # PAS cette valeur
      ports:
        - containerPort: 80
```

#### Checks HTTP et Apache

Si vous définissez vos pods via des Deployments, n'ajoutez pas d'annotations de modèle aux métadonnées du Deployment. L'Agent n'analyse pas ces métadonnées. Ajoutez-les comme suit :

```text
apiVersion: apps/v1beta1
kind: Deployment
metadata: # N'ajoutez pas les modèles ici
  name: apache-deployment
spec:
  replicas: 2
  template:
    metadata:
      labels:
        name: apache
      annotations:
        service-discovery.datadoghq.com/apache.check_names: '["apache","http_check"]'
        service-discovery.datadoghq.com/apache.init_configs: '[{},{}]'
        service-discovery.datadoghq.com/apache.instances: '[{"apache_status_url": "http://%%host%%/server-status?auto"},{"name": "Mon service", "url": "http://%%host%%", timeout: 1}]'
    spec:
      containers:
      - name: apache # utilisez cette valeur comme identificateur de conteneur dans vos annotations
        image: httpd # PAS cette valeur
        ports:
        - containerPort: 80
```

### Annotations d'étiquette Docker

À partir de la version 5.17 de l'Agent Datadog, vous pouvez stocker les modèles de check dans les étiquettes Docker. Lorsque Autodiscovery est activé, l'Agent détecte s'il est exécuté sur Docker et examine alors automatiquement toutes les étiquettes à la recherche de modèles de check. Il n'est pas nécessaire de configurer de source de modèle (c'est-à-dire via `SD_CONFIG_BACKEND`) comme vous le feriez avec les stockages clé/valeur.

Selon le type de fichier, Autodiscovery s'attend à des étiquettes de ce type :

**Dockerfile**

```text
LABEL "com.datadoghq.ad.check_names"='[<NOM_CHECK>]'
LABEL "com.datadoghq.ad.init_configs"='[<CONFIG_INIT>]'
LABEL "com.datadoghq.ad.instances"='[<CONFIG_INSTANCE>]'
```

**docker-compose.yaml**

```text
labels:
  com.datadoghq.ad.check_names: '[<NOM_CHECK>]'
  com.datadoghq.ad.init_configs: '[<CONFIG_INIT>]'
  com.datadoghq.ad.instances: '[<CONFIG_INSTANCE>]'
```

**commande d'exécution du docker**

```text
-l com.datadoghq.ad.check_names='[<NOM_CHECK>]' -l com.datadoghq.ad.init_configs='[<CONFIG_INIT>]' -l com.datadoghq.ad.instances='[<CONFIG_INSTANCE>]'
```

#### NGINX Dockerfile

Le Dockerfile suivant lance un conteneur NGINX avec Autodiscovery activé :

```text
FROM nginx

EXPOSE 8080
COPY nginx.conf /etc/nginx/nginx.conf
LABEL "com.datadoghq.ad.check_names"='["nginx"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"nginx_status_url": "http://%%host%%:%%port%%/nginx_status"}]'
```

## Références

### Template variables utilisables

Les template variables suivantes sont prises en charge par l'Agent :

- IP conteneur : `host`
  - `%%host%%` : détection automatique du réseau. Renvoie l'IP du réseau `bridge` le cas échéant ; sinon, renvoie la dernière IP du réseau **triée**.
  - `%%host_<NOM RÉSEAU>%%` : spécifie le nom de réseau à utiliser en cas d'association à plusieurs réseaux (p. ex. `%%host_bridge%%`, `%%host_swarm%%`, etc.) ; se comporte comme `%%host%%` si le nom de réseau spécifié est introuvable.

- Port de conteneur : `port`
  - `%%port%%` : utilise le port exposé le plus élevé lorsque les ports sont **triés numériquement par ordre croissant** (p. ex. 8443 pour un conteneur qui expose les ports 80, 443, et 8443)
  - `%%port_0%%` : utilise le premier port **trié numériquement en ordre croissant** (pour un même conteneur, `%%port_0%%` correspond au port 80, `%%port_1%%` correspond à 443)
  - Si votre port cible est fixe, nous vous conseillons de le spécifier directement, sans utiliser la variable `port`

- PID de conteneur : `pid` (ajouté dans 5.15.x)
  - `%%pid%%` : récupère l'ID de processus de conteneur renvoyé par `docker inspect --format '{{.State.Pid}}' <CONTENEUR>`.

- Nom du conteneur : `container_name` (ajouté dans 5.15.x)
  - `%%container_name%%` : récupère le nom de conteneur.

### Labels

Vous pouvez identifier les conteneurs par étiquette plutôt que par nom ou image. Appliquez simplement une étiquette à un conteneur avec `com.datadoghq.sd.check.id: <VOTRE_ÉTIQUETTE>`, puis utilisez `<VOTRE_ÉTIQUETTE>` à l'endroit où vous auriez normalement utilisé le nom ou l'image de conteneur. Par exemple, si vous ajoutez l'étiquette `com.datadoghq.sd.check.id: special-container` à un conteneur, Autodiscovery applique les modèles de configuration automatique contenant `special-container` dans leur liste `docker_images` à ce conteneur.

Autodiscovery peut uniquement identifier un conteneur par son étiquette OU par son image/nom, et pas les deux. Les étiquettes ont la priorité. Si un conteneur dispose de l'étiquette `com.datadoghq.sd.check.id: special-nginx` et exécute l'image `nginx`, l'Agent n'applique PAS les modèles comprenant uniquement `nginx` comme identificateur de conteneur.

### Priorité des sources de modèle

Si vous définissez un modèle pour le même check via plusieurs sources de modèle, l'Agent recherche les modèles dans l'ordre suivant (et utilise le premier trouvé) :

* Annotations Kubernetes
* Stockages clé/valeur
* Fichiers

Par conséquent, si vous configurez un modèle `redisdb` à la fois dans Consul et dans un fichier (`conf.d/auto_conf/redisdb.yaml`), l'Agent utilise le modèle de Consul.

## Dépannage

Pour vérifier qu'Autodiscovery charge bien certains checks que vous avez configurés, utilisez la commande de script d'initialisation `configcheck` de l'Agent. Par exemple, pour confirmer que votre modèle Redis est chargé à partir d'une annotation Kubernetes et non à partir du fichier par défaut `auto_conf/redisdb.yaml` :

```text
# docker exec -it <NOM_CONTENEUR_AGENT> /etc/init.d/datadog-agent configcheck
.
..
...
Check "redisdb":
  source --> Kubernetes Pod Annotation
  config --> {'instances': [{u'host': u'10.244.1.32', u'port': u'6379', 'tags': [u'image_name:kubernetes/redis-slave', u'kube_namespace:guestbook', u'app:redis', u'role:slave', u'docker_image:kubernetes/redis-slave:v2', u'image_tag:v2', u'kube_replication_controller:redis-slave']}], 'init_config': {}}
```

Pour vérifier qu'Autodiscovery charge les checks basés sur JMX :

```text
# docker exec -it <NOM_CONTENEUR_AGENT> cat /opt/datadog-agent/run/jmx_status.yaml
timestamp: 1499296559130
checks:
  failed_checks: {}
  initialized_checks:
    SD-jmx_0:
    - {message: null, service_check_count: 0, status: OK, metric_count: 13, instance_name: SD-jmx_0-10.244.2.45-9010}
```

[1]: https://www.datadoghq.com/docker-adoption
[2]: https://github.com/DataDog/integrations-core/blob/master/go_expvar/datadog_checks/go_expvar/data/conf.yaml.example
[3]: https://gcr.io/datadoghq/docker-dd-agent
[4]: /fr/agent/kubernetes/
[5]: /fr/integrations/amazon_ecs/#installation
[6]: https://github.com/DataDog/docker-dd-agent#environment-variables
[7]: https://github.com/DataDog/jmxfetch
[8]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/auto_conf.yaml
[9]: https://github.com/DataDog/integrations-core/blob/master/consul/datadog_checks/consul/data/auto_conf.yaml
[10]: https://github.com/DataDog/integrations-core/blob/master/couch/datadog_checks/couch/data/auto_conf.yaml
[11]: https://github.com/DataDog/integrations-core/blob/master/couchbase/datadog_checks/couchbase/data/auto_conf.yaml
[12]: https://github.com/DataDog/integrations-core/blob/master/elastic/datadog_checks/elastic/data/auto_conf.yaml
[13]: https://github.com/DataDog/integrations-core/blob/master/etcd/datadog_checks/etcd/data/auto_conf.yaml
[14]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_state/datadog_checks/kubernetes_state/data/auto_conf.yaml
[15]: https://github.com/DataDog/integrations-core/blob/master/kube_dns/datadog_checks/kube_dns/data/auto_conf.yaml
[16]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/datadog_checks/kyototycoon/data/auto_conf.yaml
[17]: https://github.com/DataDog/integrations-core/blob/master/mcache/datadog_checks/mcache/data/auto_conf.yaml
[18]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/auto_conf.yaml
[19]: https://github.com/DataDog/integrations-core/blob/master/riak/datadog_checks/riak/data/auto_conf.yaml
[20]: https://github.com/DataDog/docker-dd-agent#configuration-files
[21]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[22]: /fr/agent/guide/agent-commands/#start-stop-restart-the-agent
[23]: https://github.com/DataDog/integrations-core/blob/master/http_check/datadog_checks/http_check/data/conf.yaml.example