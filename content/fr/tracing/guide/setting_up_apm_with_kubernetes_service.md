---
further_reading:
- link: /containers/kubernetes/apm/
  tag: Documentation
  text: Configurer la collecte de trace
- link: /containers/cluster_agent/admission_controller
  tag: Documentation
  text: Contrôleur d'admission
kind: guide
title: Configuration de lʼAPM avec le service Kubernetes
---

## Présentation

Dans Kubernetes, les traceurs Datadog peuvent envoyer des données à lʼAgent Datadog de trois façons : Unix Domain Socket (UDS), lʼadresse IP du host ou le service Kubernetes. Chaque option garantit que lorsqu'un pod d'application envoie des données à lʼAPM, celles-ci sont acheminées vers un pod de lʼAgent Datadog sur le même nœud. Cette stratégie a pour but d'équilibrer le trafic et de garantir l'exactitude du tagging de vos données. Datadog vous recommande d'utiliser UDS pour envoyer des données. 

Toutefois, si les volumes `hostPath` requis pour UDS (et les ports `hostPort` requis pour l'utilisation de lʼadresse IP du host) ne sont pas disponibles, vous pouvez utiliser le service Kubernetes comme alternative. 

Ce guide décrit comment procéder à une configuration à lʼide dʼun service Kubernetes pour envoyer des données à lʼAgent Datadog.

## Configuration de service

Dans Kubernetes 1.22, la fonction [Internal Traffic Policy][1] permet de définir la configuration `internalTrafficPolicy: Local` sur un service. Lorsqu'elle est définie, le trafic d'un pod d'application est dirigé vers le pod en aval du service *sur le même nœud*.

Si vous avez installé lʼAgent Datadog en utilisant [le chart Helm][3] de Datadog ou lʼ[Operator Datadog][4] sur des clusters avec Kubernetes v1.22.0+, un service pour lʼAgent avec `internalTrafficPolicy: Local` est automatiquement créé pour vous. Vous devez également activer l'option du port APM pour votre Agent avec la configuration ci-dessous.

### Configuration de l'Agent
{{< tabs >}}
{{% tab "Operator Datadog" %}}

Mettez à jour votre `datadog-agent.yaml` pour que `features.apm.enabled` devienne `true`.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  features:
    apm:
      enabled: true
```

{{% k8s-operator-redeploy %}}

{{% /tab %}}
{{% tab "Helm" %}}

Mettez à jour votre `datadog-values.yaml` pour que `datadog.apm.portEnabled` devienne `true`.

```yaml
datadog:
  apm:
    portEnabled: true
```    

{{% k8s-helm-redeploy %}}

{{% /tab %}}
{{< /tabs >}}

## Configuration de l'application
Vous pouvez configurer votre application pour qu'elle utilise le service Kubernetes en utilisant le contrôleur d'admission de lʼAgent de cluster ou en effectuant une configuration manuelle.

### Contrôleur d'admission de lʼAgent de cluster
Le contrôleur d'admission de [lʼAgent de cluster][2] peut injecter la configuration de la connectivité de lʼAPM dans vos conteneurs. Les options sont `hostip`, `socket` ou `service`. Choisissez le mode `service` pour que le contrôleur d'admission ajoute la variable dʼenvironnement `DD_AGENT_HOST` pour le nom DNS du service.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Modifiez votre fichier `datadog-agent.yaml` comme suit :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  features:
    apm:
      enabled: true
    admissionController:
      enabled: true
      agentCommunicationMode: service
```

{{% k8s-operator-redeploy %}}

{{% /tab %}}
{{% tab "Helm" %}}

Modifiez votre fichier `datadog-values.yaml` comme suit :

```yaml
clusterAgent:
  admissionController:
    enabled: true
    configMode: service
```

{{% k8s-helm-redeploy %}}

{{% /tab %}}
{{< /tabs >}}

**Remarque :** dans les environnements en nœuds mixtes (Linux/Windows), lʼAgent de cluster et son contrôleur d'admission sont relatifs au déploiement de Linux. Cela peut entraîner l'injection de mauvaises variables dʼenvironnement pour la connectivité du service dans les pods Windows. 

### Configuration manuelle
Pour une configuration manuelle, définissez la variable dʼenvironnement `DD_AGENT_HOST` dans le manifeste de votre pod, avec une valeur de `<SERVICE_NAME>.<SERVICE_NAMESPACE>.svc.cluster.local`.

```yaml
    #(...)
    spec:
      containers:
      - name: "<CONTAINER_NAME>"
        image: "<CONTAINER_IMAGE>"
        env:
          - name: DD_AGENT_HOST
            value: <SERVICE_NAME>.<SERVICE_NAMESPACE>.svc.cluster.local
```

Remplacez `<SERVICE_NAME>` par le nom du service et remplacez `<SERVICE_NAMESPACE>` par lʼespace de nommage du service.

Par exemple, si votre définition de votre service ressemble à ce qui suit :

```yaml
apiVersion: v1
kind: Service
metadata:
  name: datadog
  namespace: monitoring
  labels:
    #(...)
spec:
  selector:
    app: datadog
  ports:
    - protocol: UDP
      port: 8125
      targetPort: 8125
      name: dogstatsdport
    - protocol: TCP
      port: 8126
      targetPort: 8126
      name: traceport
  internalTrafficPolicy: Local
```

Alors, définissez la valeur de `DD_AGENT_HOST` sur `datadog.monitoring.svc.cluster.local`.

```yaml
    #(...)
    spec:
      containers:
      - name: "<CONTAINER_NAME>"
        image: "<CONTAINER_IMAGE>"
        env:
          - name: DD_AGENT_HOST
            value: datadog.monitoring.svc.cluster.local
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/docs/concepts/services-networking/service-traffic-policy/
[2]: /fr/containers/cluster_agent/admission_controller
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
[4]: /fr/containers/datadog_operator