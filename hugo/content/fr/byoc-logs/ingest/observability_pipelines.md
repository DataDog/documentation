---
aliases:
- /fr/cloudprem/ingest_logs/observability_pipelines/
- /fr/cloudprem/ingest/observability_pipelines/
description: Configurez Observability Pipelines pour envoyer des logs vers BYOC Logs
  avec un double envoi optionnel.
further_reading:
- link: /byoc-logs/ingest_logs/datadog_agent/
  tag: Documentation
  text: Intégration du Datadog Agent
- link: /byoc-logs/ingest_logs/rest_api/
  tag: Documentation
  text: Intégration REST API
- link: /observability_pipelines/
  tag: Documentation
  text: Présentation des Observability Pipelines
- link: /observability_pipelines/destinations/datadog_byoc_logs/
  tag: Documentation
  text: Destination Datadog BYOC Logs pour Observability Pipelines
title: Envoyez des logs vers BYOC Logs avec Observability Pipelines
---
## Présentation {#overview}

Observability Pipelines fournit une couche intermédiaire flexible entre vos Agents Datadog et BYOC (Bring Your Own Cloud) Logs, vous permettant de traiter, transformer et acheminer les logs avant qu'ils n'atteignent votre déploiement BYOC Logs. Configurez Observability Pipelines pour recevoir des logs du Datadog Agent et les transférer vers BYOC Logs.

Pour les environnements hybrides avec des logs répartis entre des centres de données sur site et le cloud, déployez un Observability Pipelines Worker dans un centre de données sur site et configurez-le pour acheminer ces logs vers le centre de données AWS qui héberge BYOC Logs. BYOC Logs collecte ensuite les logs transférés via le chemin d'ingestion standard. **Remarque** : Ce modèle nécessite une empreinte cloud existante et ne prend pas en charge les environnements fonctionnant entièrement sur site.

Pour configurer cette installation :

1. [**Créez et configurez le pipeline**](#create-and-configure-an-observability-pipeline) - Définissez la configuration de votre pipeline (source, processeurs, destination) dans l'interface utilisateur d'Observability Pipelines. Cela crée la définition de pipeline qui sera utilisée par le Worker.
## 2. [**Déployez l'Observability Pipelines Worker**]( deploy-your-observability-pipelines) - Installez le Worker avec votre configuration de pipeline. Le Worker doit être en cours d'exécution et à l'écoute des logs avant que l'Agent puisse s'y connecter.
3. [**Configurez le Datadog Agent**](#configure-the-datadog-agent) - Indiquez à l'Agent d'envoyer les logs vers le Worker déployé. Cette étape doit être effectuée en dernier car l'Agent a besoin que l'adresse du Worker soit disponible.

## Créez et configurez une Observability Pipeline{#create-and-configure-an-observability-pipeline}

1. Accédez à [Observability Pipelines][1].
1. Sélectionnez le [**modèle Log Volume Control**][2].
1. Configurez votre pipeline :
    1. Choisissez la [**Datadog Agent** source][3].
    1. Supprimez tous les processeurs par défaut du pipeline.
    1. Sélectionnez la destination [**Datadog BYOC Logs**][4] pour transférer les logs vers votre instance BYOC Logs. Laissez la configuration vide.

<!-- This image shows an example with dual shipping when the instructions say log volume control -->
<!-- {{< img src="/cloudprem/ingest/observability-pipelines-cloudprem-setup.png" alt="Capture d'écran de l'interface du Log Explorer montrant comment filtrer les logs en sélectionnant l'index cloudprem dans le panneau des facettes" style="width:80%;" >}} -->


## Déployez vos Observability Pipelines {#deploy-your-observability-pipelines}

Après avoir créé votre pipeline dans l'interface utilisateur, déployez l'Observability Pipelines Worker. Le Worker exécute votre configuration de pipeline et écoute les logs provenant du Datadog Agent.

La commande Helm suivante installe ou met à jour le Worker, en le configurant pour écouter les logs et les transférer vers votre indexeur BYOC Logs.
<br>
**Remarque** : Vous avez besoin de l'`pipelineId` provenant du pipeline que vous avez créé à l'étape précédente. Cet ID relie le Worker à votre configuration de pipeline.

```shell
helm upgrade --install opw \
	-f values.yaml \
	--set datadog.apiKey=XXXXXXX \
	--set datadog.pipelineId=XXXXXXX \
	--set env[0].name=DD_OP_SOURCE_DATADOG_AGENT_ADDRESS,env[0].value='0.0.0.0:8282' \
	--set env[1].name=DD_OP_DESTINATION_CLOUDPREM_ENDPOINT_URL,env[1].value='http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280' \
	--set service.ports[0].name=dd-op-source-datadog-agent-address-port,service.ports[0].protocol=TCP,service.ports[0].port=8282,service.ports[0].targetPort=8282 \
	datadog/observability-pipelines-worker
```

Après une minute, vérifiez que les logs transitent par le pipeline et atteignent la destination BYOC Logs. Cela indique que le Worker est en cours d'exécution et prêt à recevoir des logs, et vous pouvez procéder à la configuration de l'Agent.

## Configurez le Datadog Agent {#configure-the-datadog-agent}

Une fois l'Observability Pipelines Worker déployé et en cours d'exécution, configurez votre Datadog Agent pour lui envoyer des logs. L'Agent se connecte au Worker en utilisant l'adresse de service du Worker. Pour plus d'informations, consultez [Connect the Datadog Agent to the Observability Pipelines Worker][5].

Mettez à jour la configuration de votre Datadog Agent pour envoyer des logs à l'Observability Pipelines Worker :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: your-cluster
    site: datadoghq.com
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
    env:
      - name: DD_OBSERVABILITY_PIPELINES_WORKER_LOGS_ENABLED
        value: "true"
      - name: DD_OBSERVABILITY_PIPELINES_WORKER_LOGS_URL
        value: "http://observability-pipelines-worker:8282"

  features:
    logCollection:
      enabled: true
      containerCollectAll: true
```

## Vérification {#verification}

Vérifiez que les logs transitent par le pipeline :

```shell
# Check Observability Pipelines worker status
kubectl get pods -l app=observability-pipelines-worker

# Check worker logs
kubectl logs -l app=observability-pipelines-worker

# Verify logs are reaching BYOC Logs
kubectl exec -it <RELEASE_NAME>-searcher-0 -n <NAMESPACE_NAME> -- curl 'http://localhost:7280/api/v1/datadog/search?query='
```

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /fr/observability_pipelines/configuration/explore_templates/?tab=logs#log-volume-control
[3]: /fr/observability_pipelines/sources/datadog_agent/
[4]: /fr/observability_pipelines/destinations/datadog_byoc_logs/
[5]: /fr/observability_pipelines/sources/datadog_agent/?tab=agenthelmvaluesfile#connect-the-datadog-agent-to-the-observability-pipelines-worker