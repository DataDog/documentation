---
description: Un guide rapide pour envoyer des logs OpenTelemetry via Observability
  Pipelines vers CloudPrem en moins de 5 minutes
further_reading:
- link: /cloudprem/quickstart/
  tag: Documentation
  text: Démarrage rapide de CloudPrem
- link: /observability_pipelines/sources/opentelemetry/
  tag: Documentation
  text: Source OpenTelemetry pour Observability Pipelines
- link: /cloudprem/ingest/observability_pipelines/
  tag: Documentation
  text: Envoyer des logs à CloudPrem avec Observability Pipelines
title: Envoyer des logs OpenTelemetry avec Observability Pipelines
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem est en bêta" >}}
  Participez à la bêta de CloudPrem pour profiter de nouvelles fonctionnalités autohébergées de gestion des logs.
{{< /callout >}}

## Présentation

CloudPrem prend en charge l'ingestion de logs depuis des collectors OTEL en utilisant Observability Pipelines comme couche d'ingestion. Ce guide fournit des instructions étape par étape pour connecter des logs OTEL à CloudPrem, sans perturber votre configuration OTEL existante.

À la fin de ce guide, vous serez en mesure de :
1. [Démarrer CloudPrem en local](#étape-1-démarrer-cloudprem).
2. [Créer un pipeline Observability Pipelines avec un processeur personnalisé pour ajouter des tags](#étape-2-créer-un-pipeline-observability-pipelines-avec-lapi).
3. [Exécuter le worker Observability Pipelines](#étape-3-exécuter-le-worker-observability-pipelines).
4. [Envoyer des logs OpenTelemetry à l'aide du SDK Python](#étape-4-envoyer-des-logs-opentelemetry-à-laide-du-sdk-python).
5. [Consulter les logs avec tags dans Datadog](#étape-5-consulter-les-logs-dans-datadog).

## Prérequis

- Accès à la [préversion de CloudPrem][1].
- **Clé d'API Datadog** : [obtenez votre clé d'API][2].
- **Clé d'application Datadog** : [obtenez votre clé d'application][3].
- **Docker** : [installez Docker][4].
- **Python 3 et pip** : pour l'envoi de logs OTLP de test.

## Étape 1 : démarrer CloudPrem

Démarrez une instance CloudPrem en local. Remplacez `<YOUR_API_KEY>` par votre clé d'API Datadog :

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

## Étape 2 : créer un pipeline Observability Pipelines avec l'API

Créez un pipeline avec une source OpenTelemetry, un processeur de filtrage et une destination CloudPrem. Remplacez `<YOUR_APP_KEY>` par votre clé d'application Datadog :

```shell
export DD_APP_KEY="<YOUR_APP_KEY>"

curl -s -X POST "https://api.${DD_SITE}/api/v2/obs-pipelines/pipelines" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
  -d '{
    "data": {
      "attributes": {
        "name": "OTEL to CloudPrem Pipeline",
        "config": {
          "sources": [
            {
              "id": "otel-source",
              "type": "opentelemetry"
            }
          ],
          "processor_groups": [
            {
              "id": "main-processors",
              "enabled": true,
              "include": "*",
              "inputs": ["otel-source"],
              "processors": [
                {
                  "id": "add-tags",
                  "display_name": "Add tags",
                  "enabled": true,
                  "type": "custom_processor",
                  "include": "*",
                  "remaps": [
                    {
                      "drop_on_error": false,
                      "enabled": true,
                      "include": "*",
                      "name": "ddtags",
                      "source": ".ddtags = [\"pipeline:observability-pipelines\", \"source:opentelemetry\"]"
                    }
                  ]
                }
              ]
            }
          ],
          "destinations": [
            {
              "id": "cloudprem-dest",
              "type": "cloud_prem",
              "inputs": ["main-processors"]
            }
          ]
        }
      },
      "type": "pipelines"
    }
  }' | jq -r '.data.id'
```

Cette commande renvoie le `pipeline_id`. Conservez-le pour l'étape suivante.

**Remarque** : le processeur personnalisé ajoute un champ `ddtags` avec des tags personnalisés à tous les logs via la configuration `remaps`.

## Étape 3 : exécuter le worker Observability Pipelines

Démarrez le worker Observability Pipelines à l'aide de Docker. Remplacez `<PIPELINE_ID>` par l'identifiant obtenu à l'étape 2 :

```shell
export PIPELINE_ID="<PIPELINE_ID>"

docker run -d \
  --name opw \
  -p 4317:4317 \
  -p 4318:4318 \
  -e DD_API_KEY=${DD_API_KEY} \
  -e DD_SITE=${DD_SITE} \
  -e DD_OP_PIPELINE_ID=${PIPELINE_ID} \
  -e DD_OP_SOURCE_OTEL_GRPC_ADDRESS="0.0.0.0:4317" \
  -e DD_OP_SOURCE_OTEL_HTTP_ADDRESS="0.0.0.0:4318" \
  -e DD_OP_DESTINATION_CLOUDPREM_ENDPOINT_URL="http://host.docker.internal:7280" \
  datadog/observability-pipelines-worker run
```

**Remarques** :
- Le worker expose le port 4318 pour HTTP et le port 4317 pour gRPC.
- Sur macOS/Windows, utilisez `host.docker.internal` pour vous connecter à CloudPrem sur la machine hôte.
- Sur Linux, utilisez `--network host` à la place des options `-p` et `http://localhost:7280` pour l'endpoint.

{{< img src="/cloudprem/guides/otel-op-cloudprem/op-config.png" alt="La configuration d'Observability Pipelines" style="width:100%;" >}}

## Étape 4 : envoyer des logs via Observability Pipelines

Installez le SDK OpenTelemetry et envoyez un log de test au worker Observability Pipelines :

```shell
pip install opentelemetry-api opentelemetry-sdk opentelemetry-exporter-otlp-proto-http

python3 -c "
import time, logging
from opentelemetry.sdk._logs import LoggerProvider, LoggingHandler
from opentelemetry.sdk._logs.export import BatchLogRecordProcessor
from opentelemetry.exporter.otlp.proto.http._log_exporter import OTLPLogExporter
from opentelemetry.sdk.resources import Resource

exporter = OTLPLogExporter(endpoint='http://localhost:4318/v1/logs')
resource = Resource.create({'service.name': 'otel-demo'})
log_provider = LoggerProvider(resource=resource)
log_provider.add_log_record_processor(BatchLogRecordProcessor(exporter))
handler = LoggingHandler(logger_provider=log_provider)
logging.getLogger().addHandler(handler)
logging.getLogger().setLevel(logging.INFO)
logging.info('Hello from OpenTelemetry via Observability Pipelines!')
time.sleep(2)
log_provider.shutdown()
print('✓ Log sent successfully!')
"
```

Pour la production, configurez votre OpenTelemetry Collector pour transmettre les logs au worker :

```yaml
exporters:
  otlphttp:
    endpoint: http://localhost:4318

service:
  pipelines:
    logs:
      receivers: [otlp]
      exporters: [otlphttp]
```

## Vérifiez le pipeline et CloudPrem

Vérifiez que tous les composants sont en cours d'exécution :

```shell
# Check CloudPrem status
docker logs cloudprem --tail 20

# Check Observability Pipelines Worker status
docker logs opw --tail 20
```

## Étape 5 : consulter les logs dans Datadog

1. Accédez au [Logs Explorer Datadog][5].
2. Dans le volet des facettes à gauche, sélectionnez votre index CloudPrem sous **CLOUDPREM INDEXES**.
3. Vos logs OpenTelemetry provenant du service `otel-demo` devraient apparaître avec des tags personnalisés : `pipeline:observability-pipelines` et `source:opentelemetry`.

{{< img src="/cloudprem/guides/otel-op-cloudprem/cloudprem_logs.png" alt="Logs CloudPrem disponibles dans le Logs Explorer Datadog" style="width:100%;" >}}

## Étapes suivantes

- Configurez votre OpenTelemetry Collector ou vos applications instrumentées pour envoyer des logs au worker.
- Ajoutez davantage de processeurs à votre pipeline (échantillonnage, enrichissement, transformation).
- Faites évoluer le déploiement du worker pour les charges de travail en production.
- Consultez la [documentation Observability Pipelines][6] pour les configurations avancées.

## Nettoyage

Pour arrêter et supprimer les conteneurs :

```shell
docker stop cloudprem opw
docker rm cloudprem opw
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/product-preview/cloudprem/
[2]: /fr/account_management/api-app-keys/#add-an-api-key-or-client-token
[3]: /fr/account_management/api-app-keys/#add-application-keys
[4]: https://docs.docker.com/get-docker/
[5]: https://app.datadoghq.com/logs
[6]: /fr/observability_pipelines/