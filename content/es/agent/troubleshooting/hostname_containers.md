---
title: Detección de nombres de host en contenedores
---

Muchas de las funciones de Datadog dependen de que el Agent proporcione un nombre de host correcto para los hosts monitorizados. Aunque esto resulta sencillo cuando el Agent se ejecuta directamente en un host, el proceso de resolución del nombre de host es diferente cuando el Agent se ejecuta en un entorno contenedorizado.

A partir de la versión **7.40**, el Agent reconoce si la resolución de nombre de host ha fallado en entornos contenedorizados. Sin un nombre de host resuelto, el Agent se cierra con un error poco después de iniciarse.

Cuando esto sucede, se muestra el siguiente mensaje de `ERROR` en los logs:
```
Error while getting hostname, exiting: unable to reliably determine the host name. You can define one in the agent config file or in your hosts file
```

Normalmente, este error indica que parte de la configuración del Agent no es correcta. Usa la siguiente información para resolver varios de los casos más frecuentes con este tipo de error.

## Errores en nombres de host con Kubernetes

En Kubernetes, un error en el nombre de host suele indicar que el Agent no puede acceder:
* a la API de Kubelet;
* al endpoint de metadatos del proveedor de nube;
* a la API de tiempo de ejecución del contenedor.

Algunas distribuciones de Kubernetes necesitan una configuración especial, así que comprueba que la tuya se adapte a la [configuración recomendada de Kubernetes][1].

### Acceder a la API de Kubelet

Asegúrate de que el Agent pueda acceder a la API de Kubelet. Cuando puede, el Agent muestra lo siguiente en el log:
```
Successful configuration found for Kubelet, using URL: ******
```

Los permisos de la configuración del control de acceso basado en roles (RBAC) de Kubernetes se configuran automáticamente mediante nuestro [Helm chart][2] oficial, el [Datadog Operator][3] y nuestros [manifiestos][4] oficiales. Si utilizas una solución diferente para implementar el Agent, asegúrate de que los siguientes permisos aparecen en un `Role` o `ClusterRole` que esté vinculado a la cuenta de servicio del Agent:

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

El error más común que impide la conexión a la API de Kubelet es la verificación del certificado TLS de Kubelet. En muchas distribuciones de Kubernetes, se da porque el certificado de Kubelet:
* no está firmado por el clúster CA;
* no contiene un nombre alternativo del firmante (SAN) que se corresponda con la dirección en la que se encuentra.

Esto hace que el Agent no pueda conectarse a la API de Kubelet a través de HTTPS, ya que la verificación TLS está activada de forma predeterminada.

Puedes desactivar la verificación TLS utilizando parámetros correspondientes o configurando la variable `DD_KUBELET_TLS_VERIFY` para **todos los contenedores** en el manifiesto del Agent:

{{< tabs >}}
{{% tab "Helm" %}}

`values.yaml` personalizado:

```yaml
datadog:
  kubelet:
    tlsVerify: false
```

{{% /tab %}}
{{% tab "Operator" %}}

Recurso `DatadogAgent` de Kubernetes:

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
{{% tab "Manifiesto" %}}

Manifiesto `DaemonSet`:

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

### Acceder al endpoint de metadatos del proveedor de nube

Si trabajas con AWS, Google Cloud o Azure, el Agent puede utilizar un endpoint de metadatos para obtener el nombre de host.

Acceder al endpoint de metadatos del proveedor de nube permite a Datadog asociar correctamente los datos del Agent con los datos de integración de soluciones en la nube dentro de la aplicación.

Normalmente, este problema indica que el acceso al endpoint de metadatos se ha restringido.
Por ejemplo, en AWS, esto podría deberse al [parámetro de límite de saltos][5].

### Acceder a la API de tiempo de ejecución del contenedor

Utiliza esta solución solo en el improbable caso de que no quieras **bajo ningún concepto** que el Agent se conecte a la API de Kubelet y si no trabajas con un proveedor de nube compatible de los indicados anteriormente.

En ese caso, puedes utilizar la API descendente para definir `DD_HOSTNAME`:

{{< tabs >}}
{{% tab "Helm" %}}

`values.yaml` personalizado:

```yaml
datadog:
  env:
    - name: DD_HOSTNAME
      valueFrom:
        fieldRef:
          fieldPath: spec.nodeName
```

{{% /tab %}}
{{% tab "Operator" %}}

Recurso `DatadogAgent` de Kubernetes:

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
{{% tab "Manifiesto" %}}

Manifiesto `DaemonSet`

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

## Errores de nombre de hosts de mv Amazon ECS y Docker

Cuando el Agent se ejecuta en Docker en un proveedor de nube, un error en el nombre de host suele indicar que el Agent no puede acceder:
* a la API de tiempo de ejecución del contenedor;
* al endpoint de metadatos del proveedor de nube.

### Acceder a la API de tiempo de ejecución del contenedor

Permite que el Agent se conecte al socket de Docker:

{{< tabs >}}
{{% tab "Amazon ECS en EC2" %}}

Asegúrate de que el socket de Docker está integrado en tu [definición de tarea][1].


[1]: /resources/json/datadog-agent-ecs.json
{{% /tab %}}
{{% tab "Docker en VM" %}}

Asegúrate de que el socket de Docker está integrado en tu comando `docker run`:

```
-v /var/run/docker.sock:/var/run/docker.sock:ro
```

{{% /tab %}}
{{< /tabs >}}

### Acceder al endpoint de metadatos del proveedor de nube

Si trabajas con AWS, Google Cloud o Azure, el Agent puede utilizar un endpoint de metadatos para obtener el nombre de host.

Acceder al endpoint de metadatos del proveedor de nube permite a Datadog asociar correctamente los datos del Agent con los datos de integración de soluciones en la nube dentro de la aplicación.

Normalmente, este problema indica que el acceso al endpoint de metadatos se ha restringido.
Por ejemplo, en AWS, esto podría deberse al [parámetro de límite de saltos][5].

## Errores en el nombre de host en entornos de CI, configuraciones sidecar y entornos sin acceso al tiempo de ejecución del contenedor

Cuando ejecutas el Agent en un **entorno de integración continua o CI** (lo que quiere decir que el Agent es efímero) o como sidecar sin acceso a
la información del host, hay dos opciones disponibles:

- Definir `DD_HOSTNAME` (`hostname` en `datadog.yaml`) explícitamente en el nombre de host:

```
-e DD_HOSTNAME=$(hostname)
```

- Definir `DD_HOSTNAME_TRUST_UTS_NAMESPACE` (`hostname_trust_uts_namespace` en `datadog.yaml`):

Esta opción está disponible en el Datadog Agent **7.42.0** y posteriores.

```
-e DD_HOSTNAME_TRUST_UTS_NAMESPACE=true
```

Con esta configuración, el Agent utiliza el nombre de host que figura en el contenedor (normalmente, el nombre del contenedor o el nombre del pod).

**Nota**: No se aplica a soluciones serverless como Fargate.

Si las soluciones anteriores no arreglan los errores de la configuración del Agent, ponte en contacto con el [equipo de asistencia de Datadog][6].

[1]: /es/containers/kubernetes/distributions
[2]: https://github.com/DataDog/helm-charts
[3]: https://github.com/DataDog/datadog-operator
[4]: https://github.com/DataDog/datadog-agent/tree/main/Dockerfiles/manifests
[5]: /es/containers/troubleshooting/duplicate_hosts
[6]: /es/help/