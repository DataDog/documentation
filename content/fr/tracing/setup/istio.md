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

[1]: /fr/agent/kubernetes/
[2]: /fr/agent/kubernetes/apm/
[3]: https://istio.io/docs/setup/kubernetes/install/helm