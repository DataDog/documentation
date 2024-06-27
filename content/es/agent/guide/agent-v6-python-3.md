---
further_reading:
- link: /agent/versions/upgrade_to_agent_v7/
  tag: Documentación
  text: Actualizar el Agent a la versión 7
title: Gestión de las versiones de Python
---

Si se está utilizando el Agent v6, Datadog recomienda [actualizarlo a la versión 7][1]. El Agent v7 solo incluye soporte para Python 3.

Sin embargo, puede darse el caso de que necesites seguir usando el Agent v6 y, al mismo tiempo, pasarte a Python 3. A partir del Datadog Agent v6.14.0, el Agent v6 integra los tiempos de ejecución de Python 2 y Python 3. Esto significa que los checks del Agent pueden ejecutarse tanto con Python 2 como con Python 3, dependiendo de la configuración del Agent.

## Uso de Python 3 con el Datadog Agent v6

De forma predeterminada, el Agent v6 utiliza el tiempo de ejecución de Python 2. A continuación encontrarás instrucciones sobre cómo configurar el Agent v6 para que use el tiempo de ejecución de Python 3:

- [Agent de host](#host-agent)
- [Container Agent](#container-agent)
  - [Helm](?tab=helm#container-agent)
  - [Datadog Operator](?tab=datadogoperator#container-agent)
  - [DaemonSet](?tab=daemonset#container-agent)
- [Herramientas de implementación](#deployment-tools)
  - [Chef](?tab=chef#deployment-tools)
  - [Puppet](?tab=puppet#deployment-tools)
  - [Ansible](?tab=ansible#deployment-tools)

Esta configuración no es compatible con la extensión de las máquinas virtuales de Azure.

### Agent de host

1. Establece la opción de configuración de `python_version` en tu archivo de configuración [`datadog.yaml`][2]:

    ```yaml
    python_version: 3
    ```

2. [Reinicia el Agent][3].

Si lo prefieres, puedes especificar el tiempo de ejecución de Python que deseas utilizar configurando la variable de entorno de `DD_PYTHON_VERSION` como `2` o `3`. Las variables de entorno tienen prioridad sobre las opciones de configuración en `datadog.yaml`. Por ejemplo, al establecer la variable de entorno de `DD_PYTHON_VERSION`, se ignora la opción de `python_version` que se haya configurado en `datadog.yaml`.

Se trata de una opción de configuración aplicable a todo el Agent. **Todos los checks de Python lanzados por un Agent utilizan el mismo tiempo de ejecución de Python**.


### Container Agent

Datadog proporciona imágenes del contenedor del Agent en Python 2 y Python 3. 

* Las etiquetas de imagen que empiezan por `6.` (p. ej. `6.34.0` o `6.34.0-jmx`) contienen el tiempo de ejecución de Python 2.
* Las etiquetas de imagen que empiezan por `7.` (p. ej. `7.34.0` o `7.34.0-jmx`) contienen el tiempo de ejecución de Python 3.

Para pasar de Python 2 a Python 3, actualiza la etiqueta de imagen utilizada para desplegar el Agent.

{{< tabs >}}
{{% tab "Helm" %}}
De forma predeterminada, el [Helm chart de Datadog][1] utiliza la imagen del Agent 7 que integra el tiempo de ejecución de Python 3.

Si quieres mantener actualizado el Datadog Agent, edita tu `values.yaml` para eliminar cualquier información que aparezca en las secciones `agent.image` y `clusterChecksRunner.image`.

Si quieres utilizar un registro de contenedor concreto, configúralo con `agent.image.repository` y `clusterChecksRunner.image.repository`. Comprueba que las etiquetas `agents.image.tag` y `clusterChecksRunner.image.tag` no estén definidas.

El registro predeterminado es `gcr.io/datadoghq/agent`.

```yaml
agent:
  image:
    repository: public.ecr.aws/datadog/agent

clusterChecksRunner:
  image:
    repository: public.ecr.aws/datadog/agent
```

Si deseas configurar el Agent con una versión concreta, configura `agents.image.tag` y `clusterChecksRunner.image.tag`. Todas las etiquetas de imagen que comienzan por `7.*` integran el tiempo de ejecución de Python 3.

```yaml
agent:
  image:
    tag: 7.34.0

clusterChecksRunner:
  image:
    tag: 7.34.0
````

Puedes utilizar ambas opciones al mismo tiempo.

```yaml
agent:
  image:
    repository: public.ecr.aws/datadog/agent
    tag: 7.34.0

clusterChecksRunner:
  image:
    repository: public.ecr.aws/datadog/agent
    tag: 7.34.0
```

[1]:https://artifacthub.io/packages/helm/datadog/datadog/

{{% /tab %}}
{{% tab "Datadog Operator" %}}
De forma predeterminada, el [Datadog Operator][1] utiliza la imagen del `agent:7.*.*` que integra el tiempo de ejecución de Python 3.

Si no se especifica la información de la imagen en el recurso `DatadogAgent`, el Operator despliega una imagen del Datadog Agent de Python 3.

Si ya has anclado la versión de la imagen:

```yaml
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  override:
    clusterChecksRunner:
      image:
        tag: 6.33.0
    nodeAgent:
      image:
        tag: 6.33.0
```

o utilizas `image.name`:

```yaml
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
  override:
    # ...
    nodeAgent:
      image:
        name: gcr.io/datadoghq/agent:6.33.0
    # ...
    clusterChecksRunner:
      image:
        name: gcr.io/datadoghq/agent:6.33.0
```

El registro predeterminado es `gcr.io/datadoghq/agent`. Si necesitas cambiarlo, utiliza `spec.global.registry`.

A continuación, ancla la etiqueta de imagen del Agent 7 en `spec.override.nodeAgent.image.tag`.

Si has habilitado la implementación de los ejecutores de checks del clúster, ancla también la etiqueta de imagen del Agent 7 en `spec.override.clusterChecksRunner.image.tag`.

```yaml
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  # ...
  global:
    registry: public.ecr.aws/datadog
  override:
    # ...
    nodeAgent:
      image:
        tag: 7.33.0
    # ...
    clusterChecksRunner:
      image:
        tag: 7.33.0
```

**Nota**: Según Datadog, no es recomendable configurar la etiqueta `*.image.tag`. Es preferible dejar que el Datadog Operator mantenga actualizada la etiqueta de imagen del Agent con una imagen del Agent 7.

Si necesitas utilizar una imagen JMX del Agent, puedes configurarla sin especificar la `*.image.tag` del Agent:

```yaml
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  # ...
  global:
    registry: public.ecr.aws/datadog
  override:
    # ...
    nodeAgent:
      image:
        jmxEnabled: true
    clusterChecksRunner:
      image:
        jmxEnabled: true
```

[1]: https://github.com/DataDog/datadog-operator
{{% /tab %}}
{{% tab "DaemonSet" %}}

En el manifiesto de tu DaemoSet, actualiza la etiqueta de imagen de cada definición de contenedor:

* Cada valor de `spec.template.spec.containers[*].image`
* Cada valor de `spec.template.spec.initContainers[*].image`

Por ejemplo, si el valor de la imagen anterior era `gcr.io/datadoghq/agent:6.33.0`, actualízalo a `gcr.io/datadoghq/agent:7.33.0`.

**Antes**:

```yaml
apiVersion: apps/v1
spec:
  template:
    spec:
      containers:
      - name: agent
        image: gcr.io/datadoghq/agent:6.33.0
        # ...

```

**Después**:

```yaml
apiVersion: apps/v1
spec:
  template:
    spec:
      containers:
      - name: agent
        image: gcr.io/datadoghq/agent:7.33.0
        # ...
```

{{% /tab %}}
{{< /tabs >}}

### Herramientas de implementación

{{< tabs >}}
{{% tab "Chef" %}}

Utiliza el campo `extra_config` para establecer el campo de ` python_version` en `3`:

```
default_attributes(
   'datadog' => {
     'extra_config' => {
       'python_version' => '3'
     }
   }
 )
```

{{% /tab %}}
{{% tab "Puppet" %}}

Utiliza el campo `agent_extra_config` para establecer el campo de `python_version` en `3`:

```
class { "datadog_agent":
    agent_extra_options => {
        python_version => 3,
    },
}
```

{{% /tab %}}
{{% tab "Ansible" %}}

Establece el `python_version` en `3` en tu `datadog_config`:
```
datadog_config:
  python_version: 3
```

{{% /tab %}}
{{< /tabs >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/versions/upgrade_to_agent_v7/?tab=linux
[2]: /es/agent/guide/agent-configuration-files/#agent-main-configuration-file
[3]: /es/agent/guide/agent-commands/#restart-the-agent