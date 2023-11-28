---
further_reading:
- link: /containers/datadog_operator
  tag: documentación
  text: Datadog Operator
- link: https://github.com/DataDog/datadog-operator/blob/main/docs/installation.md
  tag: GitHub
  text: 'Datadog Operator: instalación avanzada'
- link: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
  tag: GitHub
  text: 'Datadog Operator: configuración'
kind: documentación
title: Empezando con el Datadog Operator
---

El [Datadog Operator][1] es un [operador de Kubernetes][2] de código abierto que te permite desplegar y configurar el Datadog Agent en un entorno de Kubernetes. Esta guía te explica cómo debe utilizarse el Operator para desplegar el Datadog Agent.

## Requisitos previos

- Kubernetes v1.14.X+
- [Helm][3] para desplegar el Datadog Operator
- La herramienta de línea de comandos de Kubernetes, kubectl][4], para instalar el Datadog Agent

## Instalación y despliegue

1. Instala el Datadog Operator con Helm:
  ```bash
  helm repo add datadog https://helm.datadoghq.com
  helm install my-datadog-operator datadog/datadog-operator
  ```
2. Crea un secreto de Kubernetes con tu API y las claves de tu aplicación:
  ```bash
  kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY> --from-literal app-key=<DATADOG_APP_KEY>
  ```
  Reemplaza `<DATADOG_API_KEY>` y `<DATADOG_APP_KEY>` por tu [API de Datadog API y las claves de tu aplicación][5].

3. Crea un archivo `datadog-agent.yaml` con las especificaciones de la configuración de despliegue del `DatadogAgent`. La configuración del siguiente ejemplo activa las métricas, los logs y la herramienta APM:
```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  features:
    logCollection:
      enabled: true
    apm:
      enabled: true
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
      appSecret:
        secretName: datadog-secret
        keyName: app-key
```

4. Despliega el Datadog Agent:
  ```bash
  kubectl apply -f /path/to/your/datadog-agent.yaml
  ```

## Validación

Utiliza `kubectl get daemonset` y `kubectl get pod -owide` para validar tu instalación.

En un clúster con dos nodos de trabajador, deberías ver los pods de Agent que se han creado en cada nodo:

```bash
$ kubectl get daemonset
NAME            DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
datadog-agent   2         2         2       2            2           <none>          5m30s

$ kubectl get pod -owide
NAME                                         READY   STATUS    RESTARTS   AGE     IP            NODE
agent-datadog-operator-d897fc9b-7wbsf        1/1     Running   0          1h      10.244.2.11   kind-worker
datadog-agent-k26tp                          1/1     Running   0          5m59s   10.244.2.13   kind-worker
datadog-agent-zcxx7                          1/1     Running   0          5m59s   10.244.1.7    kind-worker2
```

## Limpieza

Los siguientes comandos sirven para eliminar todos los recursos de Kubernetes que hemos creado en esta guía:

```bash
kubectl delete datadogagent datadog
helm delete my-datadog-operator
```

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/containers/datadog_operator
[2]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/
[3]: https://helm.sh/
[4]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[5]: https://app.datadoghq.com/account/settings#api