---
dependencies:
- https://github.com/DataDog/datadog-operator/blob/main/docs/v2alpha1_migration.md
title: Migrer les CRD DatadogAgent vers v2alpha1
---
Cette page explique comment convertir vos Custom Resources Definitions (CRD) DatadogAgent de `v1alpha1` vers la version `v2alpha1` utilisée par l'opérateur Datadog v1.0.0+.

## Prérequis

* Avoir terminé la migration du chart Helm de l'opérateur Datadog v1.0.0+. Pour plus de détails, consultez le [guide de migration][1].
* Exécuter `cert-manager` avec `installCRDs` défini sur `true` :
   ```shell
   helm install \
     cert-manager jetstack/cert-manager \
     --version v1.11.0 \
     --set installCRDs=true
   ```
* Exécuter l'opérateur Datadog v1.0.0+ avec le Conversion Webhook Server activé :
   ```shell
   helm install \
     datadog-operator datadog/datadog-operator \
     --set image.tag=1.0.0 \
     --set datadogCRDs.migration.datadogAgents.version=v2alpha1 \
     --set datadogCRDs.migration.datadogAgents.useCertManager=true \
     --set datadogCRDs.migration.datadogAgents.conversionWebhook.enabled=true
   ```

## Convertir DatadogAgent/v1alpha1 en DatadogAgent/v2alpha1

L'opérateur Datadog exécute un réconciliateur pour les objets v2alpha1 et démarre également un Conversion Webhook Server, exposé sur le port 9443. L'API Server utilise ce serveur pour convertir les CRD DatadogAgent v1alpha1 en v2alpha1.

1. Transférer un port local vers le Conversion Webhook Server exposé sur le port 9443 :

   ```shell
   kubectl port-forward <DATADOG_OPERATOR_POD_NAME> 2345:9443
   ```

2. Enregistrez une définition DatadogAgent `v1alpha1` au format JSON. Vous pouvez utiliser un outil comme `yq`.

3. Exécuter une commande `curl` ciblant l'endpoint `/convert` avec votre JSON DatadogAgent.v1alpha1 :

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

   Cela renvoie une réponse avec votre définition DatadogAgent `v2alpha1` convertie :

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