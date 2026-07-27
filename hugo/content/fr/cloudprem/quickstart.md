---
description: Démarrer avec CloudPrem localement en moins de 5 minutes
further_reading:
- link: /cloudprem/install/docker/
  tag: Documentation
  text: Installation Docker de CloudPrem
- link: /cloudprem/ingest_logs/rest_api/
  tag: Documentation
  text: API REST CloudPrem
title: Démarrage rapide avec CloudPrem
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem est en bêta" >}}
  Participez à la bêta de CloudPrem pour profiter de nouvelles fonctionnalités autohébergées de gestion des logs.
{{< /callout >}}

## Présentation

Démarrer avec CloudPrem localement en moins de 5 minutes. Ce démarrage rapide couvre les points suivants :
1. Démarrer CloudPrem localement avec Docker.
2. Vérifier le statut du cluster.
3. Envoyer un log "Hello World".
4. Afficher le log dans le Log Explorer Datadog.

## Prérequis

- Demander l'accès à la [Preview CloudPrem][1].
- **Clé d'API Datadog** : [obtenez votre clé d'API][2].
- **Docker** : [installez Docker][3].

## Étape 1 : démarrer CloudPrem

Exécutez la commande suivante dans votre terminal pour démarrer une instance CloudPrem locale. Remplacez `<YOUR_API_KEY>` par votre clé d'API Datadog.

```shell
export DD_API_KEY="<YOUR_API_KEY>"
export DD_SITE="datadoghq.com"

docker run -d \
  --name cloudprem \
  -v $(pwd)/qwdata:/quickwit/qwdata \
  -e DD_SITE=${DD_SITE} \
  -e DD_API_KEY=${DD_API_KEY} \
  -p 127.0.0.1:7280:7280 \
  datadog/cloudprem run
```

## Étape 2 : vérifier le statut dans la console CloudPrem

Dans Datadog, accédez à la [console CloudPrem][4] et vérifiez que votre cluster est connecté. Le statut `connected` doit s'afficher.

Dans la console CloudPrem, vous pouvez modifier les métadonnées du cluster et renommer votre cluster en `demo`.

{{< img src="/cloudprem/quickstart/clouprem_console.png" alt="Capture d'écran de la console CloudPrem affichant le statut de connexion du cluster" style="width:100%;" >}}

## Étape 3 : envoyer un log

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

## Étape 4 : explorer les logs

1. Accédez au [Log Explorer Datadog][5].
2. Dans le panneau de facettes à gauche, cochez la case correspondant à votre index sous **CLOUDPREM INDEXES**.
3. L'entrée de log "Hello world from CloudPrem" doit s'afficher.

{{< img src="/cloudprem/quickstart/cloudprem_indexes.png" alt="Sélection de l'index CloudPrem dans le Log Explorer Datadog" style="width:100%;" >}}

## Étapes suivantes

Une fois CloudPrem opérationnel, vous pouvez :
- [Envoyer des logs avec l'Agent Datadog][6] pour collecter automatiquement les logs de vos conteneurs.
- [Envoyer des logs avec Observability Pipelines][7].

[1]: https://www.datadoghq.com/product-preview/cloudprem/
[2]: /fr/account_management/api-app-keys/#add-an-api-key-or-client-token
[3]: https://docs.docker.com/get-docker/
[4]: https://app.datadoghq.com/cloudprem
[5]: https://app.datadoghq.com/logs?query=index=cloudprem-demo&storage=hot
[6]: /fr/cloudprem/ingest/agent/
[7]: /fr/cloudprem/ingest/observability_pipelines/