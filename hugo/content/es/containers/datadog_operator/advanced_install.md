---
dependencies:
- https://github.com/DataDog/datadog-operator/blob/main/docs/installation.md
title: Instalación de Datadog Operator
---
Este documento contiene información detallada sobre la instalación del Datadog Operator. Para obtener instrucciones básicas de instalación del Agent en Kubernetes, consulta [Instalar el Agent en Kubernetes][10].

## Requisitos previos

- **Versión >= v1.20.X del clúster de Kubernetes**: los tests se realizaron en versiones >= `1.20.0` de Kubernetes. Se espera que funcione en las versiones `>= v1.11.0`, pero para versiones anteriores el Operator puede no funcionar como se espera debido al soporte limitado de CRD.
- **[Helm][1]** para desplegar el Datadog Operator
- **[CLI de `kubectl`][2]** para instalar el Datadog Agent


## Instalación del Datadog Operator con Helm

Puedes desplegar el Datadog Operator en tu clúster utilizando el [Helm chart de Datadog Operator][3]:

```shell
helm repo add datadog https://helm.datadoghq.com
helm install my-datadog-operator datadog/datadog-operator
```

Para personalizar la configuración del Operator, crea un archivo `values.yaml` que pueda anular los valores predeterminados del Helm chart.

Por ejemplo:

```yaml
image:
  tag: 1.2.0
datadogMonitor:
  enabled: true
```

A continuación, para actualizar la versión de Helm, ejecuta:

```shell
helm upgrade my-datadog-operator datadog/datadog-operator -f values.yaml
```

### Añadir credenciales

1. Crea un secreto de Kubernetes que contenga tus claves de API y de aplicación.

   ```
   export DD_API_KEY=<YOUR_API_KEY>
   export DD_APP_KEY=<YOUR_APP_KEY>

   kubectl create secret generic datadog-operator-secret --from-literal api-key=$DD_API_KEY --from-literal app-key=$DD_APP_KEY
   ```

2. Haz referencia a este secreto en tu archivo `values.yaml`.

   ```yaml
   apiKeyExistingSecret: datadog-operator-secret
   appKeyExistingSecret: datadog-operator-secret
   image:
     tag: 1.2.0
   datadogMonitor:
     enabled: true
   ```

3. Actualiza la versión de Helm.

   ```shell
   helm upgrade my-datadog-operator datadog/datadog-operator -f values.yaml
   ```

## Instalación del Datadog Operator con Operator Lifecycle Manager

Las instrucciones para desplegar el Datadog Operator con [Operator Lifecycle Manager][4] (OLM) están disponibles en [operatorhub.io][5].

### Anular la configuración predeterminada del Operator con OLM

El marco [Operator Lifecycle Manager][4] permite anular la configuración predeterminada del Operator. Consulta [Configuración de la suscripción][6] para consultar la lista de los parámetros de configuración de la instalación admitidos.

Por ejemplo, la siguiente `Subscription` del [Operator Lifecycle Manager][4] cambia los recursos del pod del Datadog Operator:

```yaml
apiVersion: operators.coreos.com/v1alpha1
kind: Subscription
metadata:
  name: my-datadog-operator
  namespace: operators
spec:
  channel: stable
  name: datadog-operator
  source: operatorhubio-catalog
  sourceNamespace: olm
  config:
    resources:
      requests:
        memory: "250Mi"
        cpu: "250m"
      limits:
        memory: "250Mi"
        cpu: "500m"
```

### Añadir credenciales

1. Crea un secreto de Kubernetes que contenga tus claves de API y de aplicación.

   ```
   export DD_API_KEY=<YOUR_API_KEY>
   export DD_APP_KEY=<YOUR_APP_KEY>

   kubectl create secret generic datadog-operator-secret --from-literal api-key=$DD_API_KEY --from-literal app-key=$DD_APP_KEY
   ```

2. Añade referencias al secreto en la instancia del recurso `Subscription` del Datadog Operator.

   ```yaml
   apiVersion: operators.coreos.com/v1alpha1
   kind: Subscription
   metadata:
     name: my-datadog-operator
     namespace: operators
   spec:
     channel: stable
     name: datadog-operator
     source: operatorhubio-catalog
     sourceNamespace: olm
     config:
       env:
         - name: DD_API_KEY
           valueFrom:
             secretKeyRef: 
                key: api-key
                name: datadog-operator-secret
         - name: DD_APP_KEY
           valueFrom:
             secretKeyRef: 
               key: app-key
               name: datadog-operator-secret
   ```


## Despliegue del recurso personalizado DatadogAgent gestionado por el Operator

Después de desplegar el Datadog Operator, crea el recurso `DatadogAgent` que activa el despliegue del Datadog Agent, Cluster Agent y ejecutores de checks de clúster (si se utiliza) en tu clúster de Kubernetes. El Datadog Agent se despliega como un DaemonSet, ejecutando un pod en cada nodo de tu clúster.

1. Crea un secreto de Kubernetes con tus claves de API y de aplicación.

   ```
   export DD_API_KEY=<YOUR_API_KEY>
   export DD_APP_KEY=<YOUR_APP_KEY>

   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY> --from-literal app-key=<DATADOG_APP_KEY>
   ```

1. Crea un archivo con las especificaciones de tu configuración de despliegue `DatadogAgent`. La configuración más simple es:

   ```yaml
   apiVersion: datadoghq.com/v1alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     credentials:
       apiSecret:
         secretName: datadog-secret
         keyName: api-key
       appSecret:
         secretName: datadog-secret
         keyName: app-key
   ```

1. Despliega el Datadog Agent con el archivo de configuración anterior:
   ```shell
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```

En un clúster con dos nodos de worker, deberías ver los pods del Agent creados en cada nodo.

```console
$ kubectl get daemonset
NAME            DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
datadog-agent   2         2         2       2            2           <none>          5m30s

$ kubectl get pod -owide
NAME                                         READY   STATUS    RESTARTS   AGE     IP            NODE
agent-datadog-operator-d897fc9b-7wbsf        1/1     Running   0          1h      10.244.2.11   kind-worker
datadog-agent-k26tp                          1/1     Running   0          5m59s   10.244.2.13   kind-worker
datadog-agent-zcxx7                          1/1     Running   0          5m59s   10.244.1.7    kind-worker2
```

### Tolerancias

Actualiza tu [archivo `datadog-agent.yaml`][8] con la siguiente configuración para añadir tolerancias en la `Daemonset.spec.template` de tu DaemonSet:

   ```yaml
   apiVersion: datadoghq.com/v1alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     credentials:
       apiSecret:
         secretName: datadog-secret
         keyName: api-key
       appSecret:
         secretName: datadog-secret
         keyName: app-key
     agent:
       config:
         tolerations:
          - operator: Exists
   ```

Aplica esta nueva configuración:

```console
$ kubectl apply -f datadog-agent.yaml
datadogagent.datadoghq.com/datadog updated
```

Valida la actualización de DaemonSet mirando el nuevo valor de pod `desired`:

```console
$ kubectl get daemonset
NAME            DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
datadog-agent   3         3         3       3            3           <none>          7m31s

$ kubectl get pod
NAME                                         READY   STATUS     RESTARTS   AGE
agent-datadog-operator-d897fc9b-7wbsf        1/1     Running    0          15h
datadog-agent-5ctrq                          1/1     Running    0          7m43s
datadog-agent-lkfqt                          0/1     Running    0          15s
datadog-agent-zvdbw                          1/1     Running    0          8m1s
```

## Configuración

Para obtener una lista completa de las opciones de configuración, consulta la [especificación de configuración][12].

## Instalar el complemento kubectl 

Consulta la [documentación del complemento `kubectl`][11].

## Utiliza una imagen personalizada del Datadog Operator

Consulta las instrucciones para crear una imagen de contenedor personalizada del Datadog Operator basada en una versión oficial en [Imágenes de contenedor personalizadas del Operator][9].

### Imágenes del Datadog Operator con Helm charts

Para instalar una imagen personalizada del Datadog Operator utilizando el Helm chart, ejecuta lo siguiente:

```shell
helm install my-datadog-operator --set image.repository=<custom-image-repository> --set image.tag=<custom-image-tag> datadog/datadog-operator
```

## Limpieza

El siguiente comando elimina todos los recursos de Kubernetes creados por el Datadog Operator y los `DatadogAgent` `datadog` vinculados.

```shell
kubectl delete datadogagent datadog
```

Este comando muestra `datadogagent.datadoghq.com/datadog deleted`.

A continuación, puedes eliminar el Datadog Operator con el comando `helm delete`:

```shell
helm delete my-datadog-operator
```

[1]: https://helm.sh
[2]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[3]: https://artifacthub.io/packages/helm/datadog/datadog-operator
[4]: https://olm.operatorframework.io/
[5]: https://operatorhub.io/operator/datadog-operator
[6]: https://github.com/operator-framework/operator-lifecycle-manager/blob/master/doc/design/subscription-config.md
[7]: https://app.datadoghq.com/account/settings#api
[8]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-tolerations.yaml
[9]: https://github.com/DataDog/datadog-operator/blob/main/docs/custom-operator-image.md
[10]: https://docs.datadoghq.com/es/containers/kubernetes/installation
[11]: https://github.com/DataDog/datadog-operator/blob/main/docs/kubectl-plugin.md
[12]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md