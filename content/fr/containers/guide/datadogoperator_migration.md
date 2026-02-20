---
aliases:
- /fr/agent/guide/datadogoperator_migration
description: Guide pour effectuer la migration de v1alpha1 vers v2alpha1 de la ressource
  personnalisée DatadogAgent à l'aide du webhook de conversion
title: Effectuer la migration vers la version 1.0 de l'opérateur Datadog
---

## Effectuer la migration vers la version 1.0 de l'opérateur Datadog

<div class="alert alert-danger">
La réconciliation <code>v1alpha1</code> <code>DatadogAgent</code> dans l'opérateur est obsolète depuis la v1.2.0+ et sera supprimée dans la v1.7.0. Après sa suppression, vous ne pourrez plus configurer l'opérateur Datadog pour réconcilier la CRD <code>v1alpha1</code> <code>DatadogAgent</code>. Toutefois, vous pourrez toujours appliquer un manifeste <code>v1alpha1</code> avec le webhook de conversion activé en utilisant <code>datadogCRDs.migration.datadogAgents.conversionWebhook.enabled</code>.
</div>

<div class="alert alert-danger">
<code>DatadogAgent</code> <code>v1alpha1</code> et le webhook de conversion seront supprimés dans la v1.8.0. Après leur suppression, vous ne pourrez plus effectuer la migration sauf si vous utilisez une version antérieure de l'opérateur.
</div>


L'opérateur Datadog v0.X utilise `v1alpha1` de la ressource personnalisée DatadogAgent. L'opérateur Datadog v1.X réconcilie `v2alpha1`.

Ce guide décrit comment effectuer la migration vers la ressource personnalisée `v2alpha1/DatadogAgent` depuis `v1alpha1/DatadogAgent`.

### Prérequis

Si vous utilisez `v1alpha1` avec une version 0.X de l'opérateur Datadog et que vous souhaitez effectuer une mise à niveau, vous devez utiliser la fonctionnalité de webhook de conversion.

Commencez par vous assurer de disposer de la version minimale requise du chart et de ses dépendances :

```
NAME                    CHART VERSION   APP VERSION DESCRIPTION
datadog/datadog-crds    1.0.0           1           Datadog Kubernetes CRDs chart
```

Pour le chart de l'opérateur Datadog :

```
NAME                        CHART VERSION   APP VERSION DESCRIPTION
datadog/datadog-operator    1.0.0           1.0.0       Datadog Operator
```

#### Installer cert manager
Si vous ne disposez pas déjà de cert manager, installez-le avec Helm.

Ajoutez le chart :

```
helm repo add jetstack https://charts.jetstack.io
```

Ensuite, installez ce dernier :

```
 helm install \
  cert-manager jetstack/cert-manager \
  --version v1.11.0 \
  --set installCRDs=true
```

### Migration

Exécutez la commande suivante pour redéployer l'opérateur Datadog et configurer Kubernetes pour stocker la version `v2alpha1` de DatadogAgent :

```
helm upgrade \
    datadog-operator datadog/datadog-operator \
    --set image.tag=1.0.0 \
    --set datadogCRDs.migration.datadogAgents.version=v2alpha1 \
    --set datadogCRDs.migration.datadogAgents.useCertManager=true \
    --set datadogCRDs.migration.datadogAgents.conversionWebhook.enabled=true
```

Avec cela, le serveur de webhook de conversion (exécuté par l'opérateur Datadog) convertit les objets DatadogAgent existants.

Si vous disposez de versions `v1alpha1` et effectuez la migration, il est recommandé d'enregistrer la version convertie et de commencer à déployer uniquement la version convertie. Une fois que vous déployez uniquement le DatadogAgent `v2alpha1`, vous pouvez désactiver le webhook de conversion.

### Remarques

À partir de la version 1.0.0 du chart `datadog-operator`, le champ `image.tag` possède une valeur par défaut de `1.0.0`, et `datadogCRDs.migration.datadogAgents.version` est `v2alpha1`.

Ceux-ci sont définis dans la commande ici pour illustrer la migration depuis une version de l'opérateur Datadog < 1.0.0 avec une version stockée de `v1alpha1` vers la version GA de `1.0.0` avec une version stockée de `v2alpha1`.

### Détails de l'implémentation

Cela crée un certificat auto-signé (à l'aide d'un Issuer) qui est utilisé par Certificate Manager pour muter la CRD DatadogAgent afin de documenter le `caBundle` que le serveur API utilise pour contacter le webhook de conversion.

L'opérateur Datadog exécute le réconciliateur pour l'objet `v2alpha1` et démarre un serveur de webhook de conversion, exposé sur le port 9443. Le serveur API utilise ce serveur pour convertir `v1alpha1` DatadogAgent en `v2alpha1`.

### Cycle de vie

Le webhook de conversion n'est pas destiné à fonctionner indéfiniment. Datadog le recommande uniquement pour migrer vos objets pendant une période de transition.

Une fois convertis, vous pouvez stocker la nouvelle version de votre DatadogAgent, désactiver la conversion et déployer uniquement des objets `v2alpha1`.

### Dépannage

#### Je ne vois pas la version `v2alpha1` de la ressource DatadogAgent.

Étant donné que `v1alpha1` et `v2alpha1` sont _servis_, vous devrez peut-être spécifier la version que vous souhaitez voir :

```
kubectl get datadogagents.v2alpha1.datadoghq.com datadog-agent
```

#### La conversion ne fonctionne pas.

Les logs du pod de l'opérateur Datadog doivent indiquer que le webhook de conversion est activé, que le serveur est en cours d'exécution et que les certificats sont surveillés.

```
kubectl logs datadog-operator-XXX-YYY
[...]
{"level":"INFO","ts":"2023-02-16T16:47:07Z","logger":"controller-runtime.webhook","msg":"Registering webhook","path":"/convert"}
{"level":"INFO","ts":"2023-02-16T16:47:07Z","logger":"controller-runtime.builder","msg":"Conversion webhook enabled","GVK":"datadoghq.com/v2alpha1, Kind=DatadogAgent"}
{"level":"INFO","ts":"2023-02-16T16:47:07Z","logger":"setup","msg":"starting manager"}
{"level":"INFO","ts":"2023-02-16T16:47:07Z","logger":"controller-runtime.webhook.webhooks","msg":"Starting webhook server"}
{"level":"INFO","ts":"2023-02-16T16:47:07Z","logger":"controller-runtime.certwatcher","msg":"Updated current TLS certificate"}
{"level":"INFO","ts":"2023-02-16T16:47:07Z","logger":"controller-runtime.webhook","msg":"Serving webhook server","host":"","port":9443}
{"level":"INFO","ts":"2023-02-16T16:47:07Z","msg":"Starting server","path":"/metrics","kind":"metrics","addr":"0.0.0.0:8383"}
{"level":"INFO","ts":"2023-02-16T16:47:07Z","msg":"Starting server","kind":"health probe","addr":"0.0.0.0:8081"}
{"level":"INFO","ts":"2023-02-16T16:47:07Z","logger":"controller-runtime.certwatcher","msg":"Starting certificate watcher"}
[...]
```

#### Comment vérifier le service enregistré pour la conversion pour un endpoint enregistré ?

```
kubectl describe service datadog-operator-webhook-service
[...]
Name:              datadog-operator-webhook-service
Namespace:         default
[...]
Selector:          app.kubernetes.io/instance=datadog-operator,app.kubernetes.io/name=datadog-operator
[...]
Port:              <unset>  443/TCP
TargetPort:        9443/TCP
Endpoints:         10.88.3.28:9443
```

#### Comment vérifier le service enregistré pour le webhook de conversion ?

```
kubectl describe crd datadogagents.datadoghq.com
[...]
  Conversion:
    Strategy:  Webhook
    Webhook:
      Client Config:
        Ca Bundle:  LS0t[...]UtLS0tLQo=
        Service:
          Name:       datadog-operator-webhook-service
          Namespace:  default
          Path:       /convert
          Port:       443
      Conversion Review Versions:
        v1
```

#### La CRD ne dispose pas du `caBundle`.

Assurez-vous que la CRD possède l'annotation correcte : `cert-manager.io/inject-ca-from: default/datadog-operator-serving-cert`. Vérifiez également les logs du pod `cert-manager-cainjector`.

Si vous ne voyez rien de particulier, définir le niveau de log sur 5 (debug) peut être utile :

```
kubectl edit deploy cert-manager-cainjector -n cert-manager
[...]
    spec:
      containers:
      - args:
        - --v=5
[...]
```

Vous devriez voir des logs tels que :

```
[...]
I0217 08:11:15.582479       1 controller.go:178] cert-manager/certificate/customresourcedefinition/generic-inject-reconciler "msg"="updated object" "resource_kind"="CustomResourceDefinition" "resource_name"="datadogagents.datadoghq.com" "resource_namespace"="" "resource_version"="v1"
I0217 08:25:24.989209       1 sources.go:98] cert-manager/certificate/customresourcedefinition/generic-inject-reconciler "msg"="Extracting CA from Certificate resource" "certificate"="default/datadog-operator-serving-cert" "resource_kind"="CustomResourceDefinition" "resource_name"="datadogagents.datadoghq.com" "resource_namespace"="" "resource_version"="v1"
[...]
```
### Rollback

Si vous avez effectué la migration vers la nouvelle version de l'opérateur Datadog en utilisant `v2alpha1` mais que vous souhaitez revenir à l'ancienne version, Datadog recommande de :
- Mettre à l'échelle le déploiement de l'opérateur Datadog à 0 réplicas.
  ```
  kubectl scale deploy datadog-operator --replicas=0
  ```
- Mettre à niveau le chart pour que `v1alpha1` soit stocké et pour que l'opérateur Datadog utilise l'image 0.8.X.
  ```
  helm upgrade \
    datadog-operator datadog/datadog-operator \
    --set image.tag=0.8.4 \
    --set datadogCRDs.migration.datadogAgents.version=v1alpha1 \
    --set datadogCRDs.migration.datadogAgents.useCertManager=false \
    --set datadogCRDs.migration.datadogAgents.conversionWebhook.enabled=false
  ```
- Redéployez l'objet DatadogAgent `v1alpha1` précédent.

**Remarque** : le DaemonSet des Agents Datadog est restauré dans le processus.