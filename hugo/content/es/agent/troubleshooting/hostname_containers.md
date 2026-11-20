---
description: Solucionar errores de resolución de nombres de host en implementaciones
  en contenedores de Datadog Agent en Kubernetes, Docker, y plataformas en la nube.
title: Detección de nombres de host en contenedores
---

Muchas funciones de Datadog dependen de que el Agent proporcione un nombre de host preciso para los hosts monitorizados. Aunque esto es sencillo cuando el Agent se ejecuta directamente en un host, el proceso de la resolución del nombre de host es diferente cuando el Agent se ejecuta en un entorno con contenedor.

Desde la versión **7.40**, el Agent reconoce correctamente la resolución fallida del nombre de host en el entorno con contenedor. Sin un nombre de host resuelto, el Agent sale con un error poco después de iniciarse.

Cuando esto ocurre, se imprime el siguiente mensaje `ERROR` en los logs:
```
Error while getting hostname, exiting: unable to reliably determine the host name. You can define one in the agent config file or in your hosts file
```

Encontrarse con este error suele significar que alguna parte de la configuración del Agent es incorrecta. Utiliza la siguiente información para resolver distintos casos comunes de esta configuración incorrecta.

## Errores de nombre de host en Kubernetes

En Kubernetes, un error de nombre de host suele significar que el Agent no puede acceder al menos a uno de:
* API de Kubelet
* Endpoint de metadatos del proveedor de la nube
* API de tiempo de ejecución del contenedor

Algunas distribuciones de Kubernetes requieren un configuración dedicado, así que verifica que tu configuración esté alineada con nuestra [configuración recomendada de Kubernetes][1].

### Acceso a la API de Kubelet 

Asegúrate de que el Agent pueda acceder a la API de Kubelet. Cuando puede, el Agent imprime este log:
```
Successful configuration found for Kubelet, using URL: ******
```

Los permisos RBAC de Kubernetes se configuran automáticamente por nuestro [cuadro de Helm][2] oficial, el [operador de Datadog][3] y nuestros [manifiestos][4] oficiales. Si utilizas una solución diferente para desplegar el Agent, asegúrate de que los siguientes permisos estén presentes en un `Role` o `ClusterRole` que esté vinculado a la cuenta de servicios del Agent:

```yaml
rules:
  - apiGroups: # Kubelet connectivity
      - ""
    resources:
      - nodes/metrics
      - nodes/spec
      - nodes/proxy
      - nodes/stats
    verbs:
      - get
```

El error más común que impide la conexión a la API de Kubelet es la verificación del certificado TLS de Kubelet. En muchas distribuciones de Kubernetes, el certificado de Kubelet presenta una de dos limitaciones comunes:
* No está firmado por la CA clúster.
* No contiene un SAN correspondiente a la dirección a la que se puede acceder.

Esto impide que el Agent se conecte a la API de Kubelet a través de HTTPS, ya que la verificación TLS está activada en forma predeterminada.

Puedes desactivar la verificación TLS utilizando parámetros dedicados o configurando la variable `DD_KUBELET_TLS_VERIFY` para **todos los contenedores** en el manifiesto del Agent:

{{< tabs >}}
{{% tab "Datadog Operator" %}}

`DatadogAgent` Recurso de Kubernetes:

```yaml
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    kubelet:
      tlsVerify: false
```

{{% /tab %}}
{{% tab "Helm" %}}

`datadog-values.yaml` personalizado:

```yaml
datadog:
  kubelet:
    tlsVerify: false
```

{{% /tab %}}

{{% tab "Manual (DaemonSet)" %}}

Manifiesto DaemonSet:

```yaml
apiVersion: apps/v1
metadata:
  name: datadog
spec:
  template:
    spec:
      containers:
        - name: agent
          env:
            - name: DD_KUBELET_TLS_VERIFY
              value: "false"
```

{{% /tab %}}
{{< /tabs >}}

### Acceder al endpoint de metadatos del proveedor de la nube

Si trabajas con AWS, Google Cloud o Azure, el Agent puede utilizar un endpoint de metadatos para obtener el nombre de host.

El acceso al endpoint de metadatos del proveedor de la nube permite a Datadog hacer coincidir correctamente los datos del Agent y los datos de la integración de la nube en la aplicación.

Encontrarse con este problema suele significar que se ha restringido el acceso al endpoint de metadatos.
Por ejemplo, en AWS, esto podría deberse a la [configuración del límite de saltos][5].

### Acceder a la API de tiempo de ejecución del contenedor

Utiliza esta solución sólo en el improbable caso de que **explícitamente** no desees que el Agent se conecte a la API de Kubelet y si no estás ejecutando en un proveedor de la nube compatible descrito anteriormente.

En este caso, puedes utilizar la API descendente para configurar `DD_HOSTNAME`:

{{< tabs >}}
{{% tab "Datadog Operator" %}}

`DatadogAgent` Recurso de Kubernetes:

```yaml
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      env:
        - name: DD_HOSTNAME
          valueFrom:
            fieldRef:
              fieldPath: spec.nodeName
```

{{% /tab %}}
{{% tab "Helm" %}}

`datadog-values.yaml` personalizado:

```yaml
datadog:
  env:
    - name: DD_HOSTNAME
      valueFrom:
        fieldRef:
          fieldPath: spec.nodeName
```

{{% /tab %}}

{{% tab "Manual (DaemonSet)" %}}

Manifiesto DaemonSet:

```yaml
apiVersion: apps/v1
metadata:
  name: datadog
spec:
  template:
    spec:
      containers:
        - name: agent
          env:
            - name: DD_HOSTNAME
              valueFrom:
                fieldRef:
                  fieldPath: spec.nodeName
```

{{% /tab %}}
{{< /tabs >}}

## Errores en nombres de hosts en MV de Amazon ECS y Docker

Cuando el Agent se ejecuta en Docker en un proveedor de la nube, un error de nombre de host suele significar que el Agent no puede acceder al menos a uno de:
* API de tiempo de ejecución del contenedor
* Endpoint de metadatos del proveedor de la nube

### Acceder a la API de tiempo de ejecución del contenedor

Permite que el Agent se conecte al socket de Docker:

{{< tabs >}}
{{% tab "Amazon ECS on EC2" %}}

Asegúrate de que el socket de Docker esté montado en tu [definición de tarea][1].


[1]: /resources/json/datadog-agent-ecs.json
{{% /tab %}}
{{% tab "Docker on VM" %}}

Asegúrate de que el socket de Docker esté montado en tu comando `docker run`:

```
-v /var/run/docker.sock:/var/run/docker.sock:ro
```

{{% /tab %}}
{{< /tabs >}}

### Acceder al endpoint de metadatos del proveedor de la nube

Si trabajas con AWS, Google Cloud o Azure, el Agent puede utilizar un endpoint de metadatos para obtener el nombre de host.

El acceso al endpoint de metadatos del proveedor de la nube permite a Datadog hacer coincidir correctamente los datos del Agent y los datos de la integración de la nube en la aplicación.

Encontrarse con este problema suele significar que se ha restringido el acceso al endpoint de metadatos.
Por ejemplo, en AWS, esto podría deberse a la [configuración del límite de saltos][5].

## Errores de nombre de host en entornos de CI, configuraciones sidecar y entornos sin acceso al tiempo de ejecución de contenedor 

Cuando se ejecuta el Agent en un **entorno de CI** (por lo que el Agent es efímero) o como sidecar sin acceso a
la información del host, existen dos opciones:

- Definir `DD_HOSTNAME` (`hostname` en `datadog.yaml`) explícitamente en el nombre de host:

```
-e DD_HOSTNAME=$(hostname)
```

- Definir `DD_HOSTNAME_TRUST_UTS_NAMESPACE` (`hostname_trust_uts_namespace` en `datadog.yaml`):

Esta opción está disponible a partir del Datadog Agent **7.42.0**.

```
-e DD_HOSTNAME_TRUST_UTS_NAMESPACE=true
```

Cuando se configura esta opción, el Agent utiliza el nombre de host en el contenedor (normalmente el nombre del contenedor o el nombre del pod).

**Nota**: No es aplicable a soluciones serverless como Fargate.

Si las soluciones anteriores no han resuelto tu problema con el Agent, ponte en contacto con el [equipo de soporte técnico de Datadog][6].

[1]: /es/containers/kubernetes/distributions
[2]: https://github.com/DataDog/helm-charts
[3]: https://github.com/DataDog/datadog-operator
[4]: https://github.com/DataDog/datadog-agent/tree/main/Dockerfiles/manifests
[5]: /es/containers/troubleshooting/duplicate_hosts
[6]: /es/help/