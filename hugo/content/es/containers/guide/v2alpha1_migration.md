---
dependencies:
- https://github.com/DataDog/datadog-operator/blob/main/docs/v2alpha1_migration.md
title: Migrar las CRDs del DatadogAgent a v2alpha1
---
En esta página, se explica cómo convertir las definiciones de recursos personalizados (CRDs) del DatadogAgent de `v1alpha1` a la versión `v2alpha1` utilizada por el Datadog Operator v1.0.0+.

## Requisitos previos

* Migración completada del Helm chart de Datadog Operador v1.0.0+. Para más detalles, consulta la [Guía de migración][1].
* Ejecutando `cert-manager` con `installCRDs` establecidos en `true`:
   ```shell
   helm install \
     cert-manager jetstack/cert-manager \
     --version v1.11.0 \
     --set installCRDs=true
   ```
* Ejecutando Datadog Operator v1.0.0+ con el Conversion Webhook Server activado:
   ```shell
   helm install \
     datadog-operator datadog/datadog-operator \
     --set image.tag=1.0.0 \
     --set datadogCRDs.migration.datadogAgents.version=v2alpha1 \
     --set datadogCRDs.migration.datadogAgents.useCertManager=true \
     --set datadogCRDs.migration.datadogAgents.conversionWebhook.enabled=true
   ```

## Convertir DatadogAgent/v1alfa1 a DatadogAgent/v2alfa1

El Datadog Operator ejecuta un reconciliador para objetos v2alpha1 y también inicia un Conversion Webhook Server, expuesto en el puerto 9443. El servidor de API utiliza este servidor para convertir los CRDs del DatadogAgent de v1alpha1 a v2alpha1. 

1. Reenvía un puerto local al Conversion Webhook Server expuesto en el puerto 9443:

   ```shell
   kubectl port-forward <DATADOG_OPERATOR_POD_NAME> 2345:9443
   ```

2. Guarda una definición del DatadogAgent `v1alpha1` como JSON. Puedes utilizar una herramienta como `yq`.

3. Ejecuta un comando `curl` dirigido al endpoint `/convert` con tu JSON DatadogAgent.v1alpha1:

   ``` shell
   curl -k https://localhost:2345/convert -X POST -d '{"request":{"uid":"123", "desiredAPIVersion":"datadoghq.com/v2alpha1", "objects":[{
     "apiVersion": "datadoghq.com/v1alpha1",
     "kind": "DatadogAgent",
     "metadata": {
       "name": "datadog"
     },
     "spec": {
       "credentials": {
         "apiKey": "DATADOG_API_KEY",
         "appKey": "DATADOG_APP_KEY"
       }
     }
   }]}}'
   ```

   Esto devuelve una respuesta con tu definición de DatadogAgent `v2alpha1` convertida:

   ```yaml
   kind: DatadogAgent
   apiVersion: datadoghq.com/v2alpha1
   metadata:
     name: datadog
     creationTimestamp: null
   spec:
     features: {}
     global:
       credentials:
         apiKey: <DATADOG_API_KEY>
         appKey: <DATADOG_APP_KEY>
   status:
     conditions: null
   ```

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog-operator/README.md#migrating-to-the-version-10-of-the-datadog-operator