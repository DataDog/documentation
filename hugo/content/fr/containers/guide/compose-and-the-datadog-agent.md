---
aliases:
- /fr/integrations/faq/compose-and-the-datadog-agent
- /fr/agent/guide/compose-and-the-datadog-agent
description: Configurer et déployer l'Agent Datadog aux côtés d'applications multi-conteneurs
  à l'aide de Docker Compose
further_reading:
- link: https://github.com/DataDog/docker-compose-example
  tag: Code source
  text: Exemple dʼutilisation de Docker Composer avec Datadog
- link: /agent/docker/
  tag: Documentation
  text: Documentation dédiée à l'Agent pour Docker de Datadog
- link: /agent/docker/log/
  tag: Documentation
  text: Documentation dédiée à la collecte de logs Docker de Datadog
title: Compose et lʼAgent Datadog
---

[Compose][1] est un outil Docker qui simplifie la création d'applications sur Docker en vous permettant de définir, de créer et d'exécuter plusieurs conteneurs en tant qu'application unique.

Bien que les [instructions pour lʼinstallation dʼun conteneur unique][2] permettent dʼexécuter le conteneur de lʼAgent Datadog, nous vous conseillons dʼactiver les intégrations pour d'autres services conteneurisés qui font partie de votre application Compose. Pour ce faire, vous devez combiner les fichiers YAML avec l'image de base de lʼAgent Datadog pour créer votre conteneur de lʼAgent Datadog. Ajoutez ensuite votre conteneur au fichier YAML de Compose.

### Exemple Redis

Voici un exemple de la façon dont vous pouvez surveiller un conteneur Redis en utilisant Compose. La structure du fichier est la suivante :

```text
|- docker-compose.yml
|- datadog
  |- Dockerfile
  |- conf.d
    |-redisdb.yaml
```

Le fichier `docker-compose.yml` décrit la façon dont vos conteneurs fonctionnent ensemble et définit certains détails de configuration pour les conteneurs.

```yaml
version: '3'
services:
  redis:
    image: redis
  datadog:
    build: datadog
    pid: host
    environment:
     - DD_API_KEY=${DD_API_KEY}
     - DD_SITE={{< region-param key="dd_site" >}}
    volumes:
     - /var/run/docker.sock:/var/run/docker.sock
     - /proc/:/host/proc/:ro
     - /sys/fs/cgroup:/host/sys/fs/cgroup:ro
```

Le fichier `redisdb.yaml` s'inspire du [fichier redisdb.yaml.example][3]. Il indique à lʼAgent Datadog de rechercher Redis sur le host nommé `redis` (défini dans `docker-compose.yaml` ci-dessus) et d'utiliser le port Redis standard :

```yaml
init_config:

instances:
    - host: redis
      port: 6379
```

Le `Dockerfile` est utilisé pour demander à Docker compose de créer une image de lʼAgent Datadog comprenant le fichier `redisdb.yaml` au bon emplacement :

```
FROM gcr.io/datadoghq/agent:latest
ADD conf.d/redisdb.yaml /etc/datadog-agent/conf.d/redisdb.yaml
```

### Collecte de traces APM

En vous appuyant sur l'exemple Redis ci-dessus, vous pouvez également utiliser Compose pour configurer l'Agent Datadog afin de collecter des traces d'application. Ce fichier `docker-compose.yml` provient de [cet exemple Docker Compose sur GitHub][4].

```yaml
version: "4"
services:
  web:
    build: web
    command: ddtrace-run python app.py
    ports:
     - "5000:5000"
    volumes:
     - ./web:/code # modified here to take into account the new app path
    links:
     - redis
    environment:
     - DATADOG_HOST=datadog # used by the web app to initialize the Datadog library
     - DD_AGENT_HOST=dd-agent # points to dd-agent to send traces
  redis:
    image: redis
  # agent section
  datadog:
    container_name: dd-agent
    build: datadog
    links:
     - redis # ensures that redis is a host that the container can find
     - web # ensures that the web app can send metrics
    environment:
     - DD_API_KEY=<YOUR_API_KEY>
     - DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true # enables agent to receive custom metrics from other containers
     - DD_APM_ENABLED=true # enables tracing
     - DD_APM_NON_LOCAL_TRAFFIC=true # enables agent to receive traces from other containers
     - DD_AGENT_HOST=dd-agent # allows web container to forward traces to agent
     - DD_SITE=datadoghq.com # determines datadog instance to send data to (e.g change to datadoghq.eu for EU1)
    volumes:
     - /var/run/docker.sock:/var/run/docker.sock
     - /proc/:/host/proc/:ro
     - /sys/fs/cgroup:/host/sys/fs/cgroup:ro
```

Remplacez `<YOUR_API_KEY>` par votre clé d'API.

Les principaux changements dans l'exemple précédent sont la configuration de la variable d'environnement `DD_AGENT_HOST`, qui doit être identique pour votre conteneur `web` et votre conteneur d'Agent pour collecter les traces. `DD_APM_ENABLED` active l'APM et `DD_APM_NON_LOCAL_TRAFFIC` permet à l'Agent de recevoir des traces d'autres conteneurs.

Cet exemple ajoute également la bibliothèque `ddtrace` au fichier `requirements.txt` de l'application Web Python afin que vous puissiez l'initialiser avec `ddtrace-run` pour activer l'APM. (La bibliothèque `datadog` mentionnée dans la liste suivante est utilisée pour collecter des métriques DogStatsD custom.)
```
flask
redis
datadog
ddtrace <--
``` 

Enfin, définissez les tags `service`, `env` et `version` pour votre application en modifiant le `Dockerfile` de l'application Web comme suit :

```dockerfile
FROM python:2.7
ADD . /code
WORKDIR /code
RUN pip install -r requirements.txt

# This is where you set DD tags
ENV DD_SERVICE web        <-- This sets the "service" name in Datadog
ENV DD_ENV sandbox        <-- This sets the "env" name in Datadog
ENV DD_VERSION 1.0        <-- This sets the "version" number in Datadog
```

### Collecte de logs

Le fichier `docker-compose.yml` peut être étendu pour permettre à lʼAgent Datadog de recueillir des logs de conteneur.

```yaml
version: '3'
services:
  redis:
    image: redis
    labels:
      com.datadoghq.ad.logs: '[{"source": "redis", "service": "redis"}]'
  datadog:
    build: datadog
    pid: host
    environment:
     - DD_API_KEY=${DD_API_KEY}
     - DD_SITE={{< region-param key="dd_site" >}}
     - DD_LOGS_ENABLED=true
    volumes:
     - /var/run/docker.sock:/var/run/docker.sock
     - /proc/:/host/proc/:ro
     - /sys/fs/cgroup:/host/sys/fs/cgroup:ro
     - /var/lib/docker/containers:/var/lib/docker/containers:ro
     - /opt/datadog-agent/run:/opt/datadog-agent/run:rw
```

**Remarque** : cette configuration collecte uniquement les logs du conteneur `Redis`. Vous pouvez collecter les logs de l'Agent Datadog en ajoutant une étiquette `com.datadoghq.ad.logs` similaire. Vous pouvez également activer explicitement la collecte de logs pour tous les conteneurs en définissant la variable d'environnement `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` sur `true`. Consultez la section [Collecte de logs Docker][5] pour plus de détails.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.docker.com/compose/overview
[2]: /fr/agent/docker/
[3]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/conf.yaml.example
[4]: https://github.com/DataDog/docker-compose-example
[5]: /fr/agent/logs/