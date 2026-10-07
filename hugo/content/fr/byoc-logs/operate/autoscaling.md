---
aliases:
- /fr/cloudprem/operate/autoscaling/
description: Configurez les Horizontal Pod Autoscalers pour les charges de travail
  des indexeurs et des compacteurs BYOC Logs.
further_reading:
- link: /byoc-logs/operate/sizing/
  tag: Documentation
  text: Dimensionnement du cluster
- link: /byoc-logs/operate/monitoring/
  tag: Documentation
  text: Surveiller les logs BYOC
- link: https://github.com/DataDog/helm-charts/blob/main/charts/cloudprem/values.yaml
  tag: Source
  text: Valeurs par défaut du chart Helm CloudPrem
title: Mettre à l'échelle automatiquement les indexeurs et les compacteurs
---
## Présentation {#overview}

Le chart Helm `datadog/cloudprem` crée des Horizontal Pod Autoscalers (HPA) pour les indexeurs et les compacteurs autonomes de logs BYOC (Bring Your Own Cloud) lorsque vous les activez. Les HPA sont désactivés par défaut, et chaque composant est configuré indépendamment.

## Avant de commencer {#before-you-begin}

Avant d'activer l'autoscaling, vous devez :

- Un déploiement BYOC Logs installé avec le chart Helm `datadog/cloudprem`.
- Version de chart `0.4.6` ou ultérieure pour l'autoscaling du compacteur autonome.
- Kubernetes Metrics Server, ou une autre implémentation d'API de métriques, installée dans le cluster.
- Une capacité de nœud suffisante pour le nombre maximal de pods d'indexeur et de compacteur.
- Requêtes CPU configurées pour les charges de travail autoscalées.

Les calculs HPA basés sur le CPU utilisent la requête CPU du pod. Les indexeurs obtiennent les requêtes CPU depuis `indexer.podSize` ou `indexer.resources.requests.cpu`. Pour les compacteurs autonomes, configurez `compactor.resources.requests.cpu`.

## Activez l'autoscaling de l'indexeur {#enable-indexer-autoscaling}

Pour activer le HPA de l'indexeur, définissez `indexer.autoscaling.enabled` sur `true` :

```yaml
indexer:
  autoscaling:
    enabled: true
```

Lorsque vous activez l'autoscaling de l'indexeur, le HPA contrôle le nombre de pods d'indexeur et ignore `indexer.replicaCount`.

Paramètres HPA par défaut de l'indexeur :

| Paramètre | Par défaut | Description |
|---|---:|---|
| `indexer.autoscaling.minReplicas` | `2` | Nombre minimal de pods d'indexeur |
| `indexer.autoscaling.maxReplicas` | `10` | Nombre maximal de pods d'indexeur |
| Cible CPU | `70%` | Cible d'utilisation moyenne du CPU sur les pods d'indexeur |

## Activez l'autoscaling du compacteur {#enable-compactor-autoscaling}

Pour activer le HPA du compacteur, activez les compacteurs autonomes et définissez `compactor.autoscaling.enabled` sur `true` :

```yaml
enableStandaloneCompactors: true

compactor:
  autoscaling:
    enabled: true
```

Le chart crée le HPA du compacteur uniquement lorsque vous définissez `enableStandaloneCompactors` et `compactor.autoscaling.enabled` sur `true`. Lorsque vous activez l'autoscaling du compacteur, le HPA contrôle le nombre de pods de compacteur et ignore `compactor.replicaCount`.

Paramètres HPA du compacteur par défaut :

| Paramètre | Par défaut | Description |
|---|---:|---|
| `compactor.autoscaling.minReplicas` | `1` | Nombre minimal de pods de compacteur |
| `compactor.autoscaling.maxReplicas` | `10` | Nombre maximal de pods de compacteur |
| Cible CPU | `80%` | Cible d'utilisation moyenne du CPU sur les pods de compacteur |

## Remplacer les valeurs par défaut {#override-the-defaults}

Définissez `minReplicas` et `maxReplicas` aux côtés de `enabled` pour dimensionner la plage de mise à l'échelle pour votre charge de travail. Utilisez le guide [Dimensionnement du cluster][1] pour choisir un maximum que la capacité de votre nœud prend en charge :

```yaml
indexer:
  autoscaling:
    enabled: true
    minReplicas: 4
    maxReplicas: 20
```

## Appliquez la configuration {#apply-the-configuration}

Ajoutez les valeurs de mise à l'échelle automatique à votre fichier de valeurs BYOC Logs, puis mettez à niveau votre version :

```shell
helm upgrade <RELEASE_NAME> datadog/cloudprem \
  --namespace <NAMESPACE_NAME> \
  --values datadog-values.yaml
```

## Vérifiez les HPA {#verify-the-hpas}

Regroupez dans une liste les HPA dans l'espace de noms BYOC Logs :

```shell
kubectl get hpa -n <NAMESPACE_NAME>
```

Décrivez un HPA pour vérifier les métriques et les événements de mise à l'échelle récents :

```shell
kubectl describe hpa <RELEASE_NAME>-indexer -n <NAMESPACE_NAME>
kubectl describe hpa <RELEASE_NAME>-compactor -n <NAMESPACE_NAME>
```

`<RELEASE_NAME>-indexer` et `<RELEASE_NAME>-compactor` sont les noms HPA par défaut créés par le chart. Si vous définissez `nameOverride` ou `fullnameOverride`, utilisez les noms résultants à la place.

Si `kubectl get hpa` affiche `<unknown>` dans la colonne `TARGETS`, le HPA ne peut pas lire les métriques CPU. Vérifiez que l'API de métriques est en cours d'exécution et que les pods cibles ont des demandes CPU.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/byoc-logs/operate/sizing/