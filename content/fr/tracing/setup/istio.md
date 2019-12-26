---
title: Istio
kind: documentation
further_reading:
  - link: tracing/visualization/
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
---
L'APM Datadog est disponible pour Istio 1.1.3 et ultérieur sur les clusters Kubernetes.

## Configuration

### Installation de l'Agent Datadog

1. [Installez l'Agent][1].
2. [Veillez à ce que l'APM soit activé pour votre Agent][2].
3. Supprimez la mise en commentaire du paramètre `hostPort` pour que les sidecars Istio puissent se connecter à l'Agent et envoyer des traces.

**Remarque** : les pods de l'Agent ne sont pas en mesure de démarrer si l'injection automatique de sidecar d'Istio est activée sur l'espace de nommage sur lequel l'Agent Datadog est exécuté. Pour éviter cela :

- [Désactivez l'injection de sidecar pour l'Agent Datadog.](#disable-sidecar-injection-for-the-datadog-agent)
- [Créez un service headless pour l'Agent Datadog.](#create-a-headless-service-for-the-datadog-agent)

#### Désactiver l'injection de sidecar pour l'Agent Datadog

Ajoutez l'annotation `sidecar.istio.io/inject: "false"` au daemonset `datadog-agent` :

```yaml
...
spec:
  ...
  template:
    metadata:
      annotations:
        sidecar.istio.io/inject: "false"
    ...

```

Vous pouvez également utiliser la commande `kubectl patch`.

```shell
kubectl patch daemonset datadog-agent -p '{"spec":{"template":{"metadata":{"annotations":{"sidecar.istio.io/inject":"false"}}}}}'
```

#### Créer un service headless pour l'Agent Datadog

Créez un service headless pour l'Agent Datadog avec la configuration YAML spécifiée ci-dessous.

```yaml
apiVersion: v1
kind: Service
metadata:
  labels:
    app: datadog-agent
  name: datadog-agent
spec:
  clusterIP: None
  ports:
  - name: dogstatsdport
    port: 8125
    protocol: UDP
    targetPort: 8125
  - name: traceport
    port: 8126
    protocol: TCP
    targetPort: 8126
  selector:
    app: datadog-agent
```

### Installation et configuration d'Istio

Pour activer l'APM Datadog, une [installation Istio personnalisée][3] est requise afin d'ajouter deux options supplémentaires avant l'installation. Ces option sont transmises lors de l'étape finale `helm template` ou `helm install` :

- `--set pilot.traceSampling=100.0`
- `--set global.proxy.tracer=datadog`

Exemple : une installation utilisant le profil de configuration `default` utiliserait la commande suivante :

```shell
helm template install/kubernetes/helm/istio --name istio --namespace istio-system --set pilot.traceSampling=100.0 --set global.proxy.tracer=datadog | kubectl apply -f -
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/kubernetes/daemonset_setup
[2]: /fr/agent/kubernetes/daemonset_setup/#apm-and-distributed-tracing
[3]: https://istio.io/docs/setup/kubernetes/install/helm