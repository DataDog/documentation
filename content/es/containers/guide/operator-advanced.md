---
aliases:
- /es/agent/guide/operator-advanced
further_reading:
- link: agent/kubernetes/log
  tag: Documentación
  text: Datadog y Kubernetes
kind: guía
title: Configuración avanzada del Datadog Operator
---

[El Datadog Operator][1] permite desplegar el Datadog Agent en Kubernetes y OpenShift e informa sobre el estado, el mantenimiento y los errores de despliegue en el estado de su recurso personalizado. Además, sus opciones de configuración de nivel superior limitan el riesgo de fallos en el proceso.

## Requisitos previos

Para utilizar el Datadog Operator, es necesario cumplir los siguientes requisitos:

- **Versión >= 1.20.X del clúster de Kubernetes**: los tests se llevaron a cabo en versiones >= `1.20.0`. Sin embargo, también debería funcionar con las versiones `>= v1.11.0`. Debido a la compatibilidad limitada de la definición de recursos personalizados (CRD), el Operator podría no funcionar como es debido en versiones más antiguas.
- [`Helm`][2] para desplegar el `datadog-operator`.
- [Interfaz de línea de comandos `Kubectl`][3] para instalar el `datadog-agent`.

## Desplegar el Datadog Operator

Para usar el Datadog Operator, despliégalo en tu clúster de Kubernetes. Luego, crea un recurso de Kubernetes para el `DatadogAgent` que contenga la configuración del despliegue de Datadog:

1. Añade el repositorio de Helm de Datadog:
  ```
  helm repo add datadog https://helm.datadoghq.com
  ```

2. Instala el Datadog Operator:
  ```
  helm install my-datadog-operator datadog/datadog-operator
  ```

## Desplegar el Datadog Agent con el Operator

Después de desplegar el Datadog Operator, crea el recurso `DatadogAgent` que activa el despliegue del Datadog Agent en el clúster de Kubernetes. Al crear este recurso en el espacio de nombres del `Datadog-Operator`, el Agent se despliega como `DaemonSet` en cada `Node` de tu clúster.

Crea el manifiesto `datadog-agent.yaml` a partir de una de las siguientes plantillas:

* [Manifiesto con logs, APM, procesos y recopilación de métricas activos.][4]
* [Manifiesto con logs, APM y recopilación de métricas activos.][5]
* [Manifiesto con APM y métricas de recopilación habilitados.][7]
* [Manifiesto con el Cluster Agent.][8]
* [Manifiesto con tolerancias.][9]

Sustituye `<DATADOG_API_KEY>` y `<DATADOG_APP_KEY>` por tus [claves de API y de aplicación de Datadog][10], y luego activa la instalación del Agent utilizando el siguiente comando:

```shell
$ kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
datadogagent.datadoghq.com/datadog created
```

Puedes comprobar el estado del recurso `DatadogAgent` con:

```shell
kubectl get -n $DD_NAMESPACE dd datadog

NAME            ACTIVE   AGENT             CLUSTER-AGENT   CLUSTER-CHECKS-RUNNER   AGE
datadog-agent   True     Running (2/2/2)                                           110m
```

En un clúster con 2 nodos worker, deberías poder ver los pods del Agent creados en cada nodo.

```shell
$ kubectl get -n $DD_NAMESPACE daemonset
NAME            DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
datadog-agent   2         2         2       2            2           <none>          5m30s

$ kubectl get -n $DD_NAMESPACE pod -owide
NAME                                         READY   STATUS    RESTARTS   AGE     IP            NODE
agent-datadog-operator-d897fc9b-7wbsf        1/1     Running   0          1h      10.244.2.11   kind-worker
datadog-agent-k26tp                          1/1     Running   0          5m59s   10.244.2.13   kind-worker
datadog-agent-zcxx7                          1/1     Running   0          5m59s   10.244.1.7    kind-worker2
```


## Limpieza

El siguiente comando borra todos los recursos Kubernetes creados con las instrucciones anteriores:

```shell
kubectl delete datadogagent datadog
helm delete datadog
```

### Tolerancias

Actualiza tu archivo `datadog-agent.yaml`, utilizando la siguiente configuración para añadir la tolerancia en la `Daemonset.spec.template` de tu `DaemonSet`:

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
  override:
    nodeAgent:
      image:
        name: gcr.io/datadoghq/agent:latest
      tolerations:
        - operator: Exists
```

Aplica esta nueva configuración:

```shell
$ kubectl apply -f datadog-agent.yaml
datadogagent.datadoghq.com/datadog updated
```

La actualización del DaemonSet se puede validar observando el nuevo valor deseado del pod:

```shell
$ kubectl get -n $DD_NAMESPACE daemonset
NAME            DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
datadog-agent   3         3         3       3            3           <none>          7m31s

$ kubectl get -n $DD_NAMESPACE pod
NAME                                         READY   STATUS     RESTARTS   AGE
agent-datadog-operator-d897fc9b-7wbsf        1/1     Running    0          15h
datadog-agent-5ctrq                          1/1     Running    0          7m43s
datadog-agent-lkfqt                          0/1     Running    0          15s
datadog-agent-zvdbw                          1/1     Running    0          8m1s
```

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-operator
[2]: https://helm.sh
[3]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[4]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/v2alpha1/datadog-agent-all.yaml
[5]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/v2alpha1/datadog-agent-with-logs-apm.yaml
[7]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/v2alpha1/datadog-agent-with-apm-hostport.yaml
[8]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/v2alpha1/datadog-agent-with-clusteragent.yaml
[9]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/v2alpha1/datadog-agent-with-tolerations.yaml
[10]: https://app.datadoghq.com/organization-settings/api-keys