---
description: Découvrir comment démarrer avec CloudPrem localement à l'aide de Docker
  ou Docker Compose
further_reading:
- link: /cloudprem/ingest/
  tag: Documentation
  text: Configurer l'ingestion de logs
- link: /cloudprem/configure/
  tag: Documentation
  text: Configurer CloudPrem
title: Installer CloudPrem localement avec Docker
---


{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem est en Preview" >}}
  Rejoignez la Preview CloudPrem pour accéder aux nouvelles fonctionnalités de Log Management auto-hébergé.
{{< /callout >}}

## Présentation

Ce guide d'installation vous explique comment exécuter Datadog CloudPrem localement à l'aide de conteneurs Docker autonomes ou de Docker Compose. Suivez ces étapes pour déployer un environnement CloudPrem minimal sur votre machine, idéal pour explorer les fonctionnalités de CloudPrem et tester l'ingestion de logs avec Datadog avant un déploiement en production.

## Prérequis

Avant de commencer avec CloudPrem, vérifiez que vous disposez des éléments suivants :

- Un **compte Datadog** avec la fonctionnalité CloudPrem activée.
- **Identifiants d'API** : ayez votre [clé d'API Datadog][2] à portée de main.
- **Docker** : [Docker][4] installé et en cours d'exécution sur votre machine.
- **Docker Compose** (facultatif) : [Docker Compose][5] pour une configuration en ligne de commande unique.

## Étapes d'installation

Choisissez l'une des méthodes d'installation suivantes :

1. **Conteneurs Docker autonomes** : configuration minimale pour les tests
2. **Docker Compose** : ligne de commande unique pour exécuter CloudPrem et l'Agent Datadog

{{< tabs >}}
{{% tab "Standalone Docker setup" %}}

Cette méthode utilise des conteneurs Docker individuels pour une configuration CloudPrem minimale.

Exportez vos identifiants Datadog en tant que variables d'environnement :

```shell
export DD_SITE="datadoghq.com"  # or your specific Datadog site
export DD_API_KEY="your_datadog_api_key"
```

### Étape 1 : démarrer CloudPrem

Créez le répertoire de données et démarrez le conteneur CloudPrem :

```shell
# Start CloudPrem
docker run -d \
  --name cloudprem \
  -v $(pwd)/qwdata:/quickwit/qwdata \
  -e DD_SITE=${DD_SITE} \
  -e DD_API_KEY=${DD_API_KEY} \
  -p 127.0.0.1:7280:7280 \
  datadog/cloudprem run
```

### Étape 2 : démarrer l'Agent Datadog

Pour collecter les logs de vos conteneurs locaux et les envoyer à CloudPrem, démarrez l'Agent Datadog :

```shell
docker run \
  --name dd-agent \
  -e DD_API_KEY=${DD_API_KEY} \
  -e DD_SITE=${DD_SITE} \
  -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true \
  -e DD_ENV=dev \
  -e DD_LOGS_ENABLED=true \
  -e DD_LOGS_CONFIG_LOGS_DD_URL=http://host.docker.internal:7280 \
  -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
  -e DD_CONTAINER_EXCLUDE="name:dd-agent" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -v /var/lib/docker/containers:/var/lib/docker/containers:ro \
  registry.datadoghq.com/agent:latest
```
{{% /tab %}}

{{% tab "Docker Compose setup" %}}

Cette méthode fournit une configuration CloudPrem avec l'intégration de l'Agent Datadog.

### Étape 1 : créer le fichier Docker Compose

Créez un fichier `docker-compose.yml` dans votre répertoire de travail :

```yaml
services:
  cloudprem:
    image: datadog/cloudprem:edge
    command: ["run"]
    ports:
      - "127.0.0.1:7280:7280"
    environment:
      - DD_SITE=${DD_SITE:-datadoghq.com}
      - DD_API_KEY=${DD_API_KEY}
    volumes:
      - ./qwdata:/quickwit/qwdata
    restart: unless-stopped

  datadog-agent:
    image: registry.datadoghq.com/agent:latest
    environment:
      - DD_API_KEY=${DD_API_KEY}
      - DD_SITE=${DD_SITE:-datadoghq.com}
      - DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true
      - DD_LOGS_ENABLED=true
      - DD_LOGS_CONFIG_LOGS_DD_URL=http://cloudprem:7280
      - DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true
      - DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION=100000
      - DD_CONTAINER_EXCLUDE="name:datadog-agent"
      - DD_ENV=dev
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - /proc/:/host/proc/:ro
      - /sys/fs/cgroup/:/host/sys/fs/cgroup:ro
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
    depends_on:
      cloudprem:
        condition: service_healthy
    restart: unless-stopped
```

La configuration Docker Compose :
1. Démarre CloudPrem et attend qu'il soit opérationnel.
2. Démarre l'Agent Datadog pour collecter les logs des conteneurs.

### Étape 2 : définir les variables d'environnement

Créez un fichier `.env` dans le même répertoire :

```shell
DD_SITE=datadoghq.com
DD_API_KEY=your_datadog_api_key
```

### Étape 3 : démarrer Docker Compose

```shell
docker compose up -d
```
{{% /tab %}}
{{< /tabs >}}

## Étapes suivantes

Après avoir démarré CloudPrem avec l'une ou l'autre méthode, vérifiez que l'installation fonctionne correctement :

### Vérifier le statut de CloudPrem

**Vérifiez que CloudPrem est en cours d'exécution** :

```shell
curl http://localhost:7280/api/v1/version
```

Une réponse contenant des informations sur la version doit s'afficher.

### Envoyer un log 

Dans votre terminal, envoyez une entrée de log "Hello World" directement à votre instance CloudPrem locale via l'API :

```shell
curl -X POST "http://localhost:7280/api/v2/logs" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -d '[
    {
      "message": "Hello world from CloudPrem",
      "level": "info",
      "service": "demo"
    }
  ]'
```

### Rechercher vos logs locaux depuis le Log Explorer

Après avoir vérifié que CloudPrem est en cours d'exécution, vous pouvez rechercher et analyser vos logs dans le Log Explorer en effectuant une recherche dans l'index `cloudprem` !

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://docs.docker.com/get-docker/
[5]: https://docs.docker.com/compose/install/