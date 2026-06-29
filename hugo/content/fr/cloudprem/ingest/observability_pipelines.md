---
aliases:
- /fr/cloudprem/ingest_logs/observability_pipelines/
description: Configurer Observability Pipelines pour envoyer des logs à CloudPrem
  avec expédition duale optionnelle
further_reading:
- link: /cloudprem/ingest_logs/datadog_agent/
  tag: Documentation
  text: Intégration de l'Agent Datadog
- link: /cloudprem/ingest_logs/rest_api/
  tag: Documentation
  text: Intégration via l'API REST
- link: /observability_pipelines/
  tag: Documentation
  text: Présentation d'Observability Pipelines
- link: /observability_pipelines/destinations/cloudprem/
  tag: Documentation
  text: Destination CloudPrem pour Observability Pipelines
title: Envoyer des logs à CloudPrem avec Observability Pipelines
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem est en bêta" >}}
  Participez à la bêta de CloudPrem pour profiter de nouvelles fonctionnalités autohébergées de gestion des logs.
{{< /callout >}}

## Présentation

Observability Pipelines fournit une couche intermédiaire flexible entre vos Agents Datadog et CloudPrem, vous permettant de traiter, transformer et router les logs avant qu'ils n'atteignent votre déploiement CloudPrem. Configurez Observability Pipelines pour recevoir des logs depuis l'Agent Datadog et les transmettre à CloudPrem :
1. [**Créer et configurer le pipeline**](#créer-et-configurer-un-pipeline-observability) - Définissez la configuration de votre pipeline (source, processeurs, destination) dans l'interface Observability Pipelines. Cette opération crée la définition du pipeline qui sera utilisée par le worker.
2. [**Déployer le worker Observability Pipelines**](##déployer-votre-pipeline-observability) - Installez le worker avec la configuration de votre pipeline. Le worker doit être en cours d'exécution et à l'écoute des logs avant que l'Agent puisse s'y connecter.
3. [**Configurer l'Agent Datadog**](#configurer-lagent-datadog) - Indiquez à l'Agent d'envoyer les logs au worker déployé. Cette étape doit être effectuée en dernier, car l'Agent a besoin que l'adresse du worker soit disponible.

## Créer et configurer un pipeline Observability

1. Accédez à la page [Observability Pipelines][1].
1. Sélectionnez le [**modèle Log Volume Control**][2].
1. Configurez votre pipeline :
    1. Choisissez la [source **Agent Datadog**][3].
    1. Supprimez tous les processeurs par défaut du pipeline.
    1. Sélectionnez la [destination **Datadog CloudPrem**][4] pour transmettre les logs à votre instance CloudPrem. Laissez la configuration vide.

<!-- This image shows an example with dual shipping when the instructions say log volume control -->
<!-- {{< img src="/cloudprem/ingest/observability-pipelines-cloudprem-setup.png" alt="Capture d'écran de l'interface du Log Explorer montrant comment filtrer les logs en sélectionnant l'index cloudprem dans le panneau de facettes" style="width:80%;" >}} -->


## Déployer votre pipeline Observability

Après avoir créé votre pipeline dans l'interface, déployez le worker Observability Pipelines. Le worker exécute la configuration de votre pipeline et se met à l'écoute des logs en provenance de l'Agent Datadog.

La commande Helm suivante installe ou met à jour le worker, en le configurant pour écouter les logs et les transmettre à votre indexeur CloudPrem.
<br>
**Remarque** : vous avez besoin du `pipelineId` du pipeline créé à l'étape précédente. Cet identifiant relie le worker à la configuration de votre pipeline.

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

Après une minute, vérifiez que les logs transitent bien par le pipeline et atteignent la destination CloudPrem. Cela indique que le worker est en cours d'exécution et prêt à recevoir des logs ; vous pouvez alors procéder à la configuration de l'Agent.

## Configurer l'Agent Datadog

Une fois le worker Observability Pipelines déployé et en cours d'exécution, configurez votre Agent Datadog pour lui envoyer des logs. L'Agent se connecte au worker via l'adresse de service du worker. Pour plus d'informations, consultez la section [Connecter l'Agent Datadog au worker Observability Pipelines][5].

Mettez à jour la configuration de votre Agent Datadog pour envoyer des logs au worker Observability Pipelines :

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

## Vérification

Vérifiez que les logs transitent bien par le pipeline :

```shell
# Check Observability Pipelines worker status
kubectl get pods -l app=observability-pipelines-worker

# Check worker logs
kubectl logs -l app=observability-pipelines-worker

# Verify logs are reaching CloudPrem
kubectl exec -it <RELEASE_NAME>-searcher-0 -n <NAMESPACE_NAME> -- curl 'http://localhost:7280/api/v1/datadog/search?query='
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /fr/observability_pipelines/configuration/explore_templates/?tab=logs#log-volume-control
[3]: /fr/observability_pipelines/sources/datadog_agent/
[4]: /fr/observability_pipelines/destinations/cloudprem/
[5]: /fr/observability_pipelines/sources/datadog_agent/?tab=agenthelmvaluesfile#connect-the-datadog-agent-to-the-observability-pipelines-worker