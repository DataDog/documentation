---
title: Istio
kind: documentation
further_reading:
  - link: /tracing/visualization/
    tag: Utiliser l'UI de l'APM
    text: 'Explorer vos services, ressources et traces'
  - link: 'https://istio.io/'
    tag: Documentation
    text: Site Web Istio
  - link: 'https://istio.io/docs/'
    tag: Documentation
    text: Documentation Istio
  - link: 'https://github.com/DataDog/dd-opentracing-cpp'
    tag: Code source
    text: Client C++ OpenTracing Datadog
aliases:
  - /fr/tracing/istio/
---
L'APM Datadog est disponible pour Istio 1.1.3 et ultérieur sur les clusters Kubernetes.

## Configuration

### Installation de l'Agent Datadog

1. [Installez l'Agent][1].
2. [Veillez à ce que l'APM soit activé pour votre Agent][2].
3. Supprimez la mise en commentaire du paramètre `hostPort` pour que les sidecars Istio puissent se connecter à l'Agent et envoyer des traces.


### Installation et configuration d'Istio

Pour activer l'APM Datadog, une [installation Istio personnalisée][3] est requise afin de configurer deux options supplémentaires.

- `--set values.global.proxy.tracer=datadog`
- `--set values.pilot.traceSampling=100.0`

```shell
istioctl manifest apply --set values.global.proxy.tracer=datadog --set values.pilot.traceSampling=100.0
```

Les traces sont générées lorsque l'espace de nommage du pod dispose de la fonctionnalité d'injection de sidecar. Cette opération s'effectue en ajoutant
l'étiquette `istio-injection=enabled`.

```shell
kubectl label namespace example-ns istio-injection=enabled
```

Les traces sont générées lorsque Istio est en mesure de déterminer si le trafic utilise un protocole basé sur HTTP.
Par défaut, Istio effectue automatiquement cette vérification. Vous pouvez configurer manuellement cette vérification en nommant les ports dans le service et le déploiement de votre application. Reportez-vous à la section relative à la [sélection de protocole][4] de la documentation Istio (en anglais) pour en savoir plus.

Par défaut, le nom de service utilisé lors de la création des traces est généré à partir de l'espace de nommage et du nom du déploiement. Vous pouvez le définir manuellement en ajoutant une étiquette `app` au modèle de pod du déploiement :

```yaml
template:
  metadata:
    labels:
      app: <NOM_SERVICE>
```

Pour les [CronJobs][5], l'étiquette `app` doit être ajoutée au modèle du job, car le nom généré provient du `Job`, et non du `CronJob` de niveau supérieur.

### Variables d'environnement

Les variables d'environnement des sidecars Istio peuvent être configurées pour chaque déploiement, à l'aide de l'annotation `apm.datadoghq.com/env`.
```yaml
    metadata:
      annotations:
        apm.datadoghq.com/env: '{ "DD_ENV": "prod", "DD_TRACE_ANALYTICS_ENABLED": "true" }'
```

Les [variables d'environnement][6] dépendent de la version du traceur C++ intégré au proxy du sidecar d'Istio.

| Version d'Istio | Version du traceur C++ |
|---------------|--------------------|
| v1.7.x | v1.1.5 |
| v1.6.x | v1.1.3 |
| v1.5.x | v1.1.1 |
| v1.4.x | v1.1.1 |
| v1.3.x | v1.1.1 |
| v1.2.x | v0.4.2 |
| v1.1.3 | v0.4.2 |


### Exécuter l'Agent en tant que service et déploiement

Si les Agents de votre cluster s'exécutent en tant que déploiement et service au lieu du DaemonSet par défaut, une option supplémentaire est alors nécessaire pour spécifier l'adresse DNS et le port de l'Agent.
Pour un service `datadog-agent` dans l'espace de nommage `default`, l'adresse a pour valeur `datadog-agent.default.svc.cluster.local:8126`.

- `--set values.global.tracer.datadog.address=datadog-agent.default:8126`

Si l'authentification TLS mutuelle est activée pour le cluster, alors le déploiement de l'Agent doit désactiver l'injection de sidecar. De plus, vous devez ajouter une stratégie de trafic qui désactive l'authentification TLS.

Cette annotation est ajoutée au modèle de déploiement de l'Agent.
```
  template:
    metadata:
      annotations:
        sidecar.istio.io/inject: "false"
```

Pour la version v1.4.x d'Istio, la stratégie de trafic peut être configurée à l'aide d'une DestinationRule. La version v1.5.x et les versions plus récentes d'Istio ne nécessitent pas de stratégie de trafic supplémentaire.
```
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: datadog-agent
  namespace: istio-system
spec:
  host: datadog-agent.default.svc.cluster.local
  trafficPolicy:
    tls:
      mode: DISABLE
```

Le processus de sélection automatique du protocole peut déterminer que le trafic entre le sidecar et l'Agent s'effectue via HTTP, et ainsi activer le tracing.
Cette fonction peut être désactivée en utilisant la [sélection manuelle du protocole][7] du service spécifique. Le nom du port dans le service `datadog-agent` peut être remplacé par `tcp-traceport`.
Si vous utilisez Kubernetes 1.18+, vous pouvez ajouter `appProtocol: tcp` à la spécification du port.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/kubernetes/
[2]: /fr/agent/kubernetes/apm/
[3]: https://istio.io/docs/setup/install/istioctl/
[4]: https://istio.io/docs/ops/configuration/traffic-management/protocol-selection/
[5]: https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/
[6]: /fr/tracing/setup/cpp/#environment-variables
[7]: https://istio.io/docs/ops/configuration/traffic-management/protocol-selection/#manual-protocol-selection