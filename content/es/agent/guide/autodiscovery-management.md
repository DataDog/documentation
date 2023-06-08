---
aliases:
- /es/agent/autodiscovery/management
- /es/agent/kubernetes/management
further_reading:
- link: /agent/kubernetes/integrations/
  tag: Documentación
  text: Crea y carga una plantilla de integración de Autodiscovery
kind: guía
title: Gestión de detección de contenedores
---

De forma predeterminada, el Datadog Agent detecta automáticamente todos los contenedores disponibles. Para restringir su perímetro de detección y limitar la recopilación de datos solo a un subconjunto de contenedores, inclúyelos o exclúyelos utilizando una configuración específica.

**Nota**: Las métricas `kubernetes.containers.running`, `kubernetes.pods.running`, `docker.containers.running`, `.stopped`, `.running.total` y `.stopped.total` no se verán afectadas por estos ajustes y siempre tienen en cuenta todos los contenedores.

Si ejecutas el Agent como binario en un host, configura el perímetro de Autodiscovery que desees con las instrucciones de la pestaña [Agent](?tab=agent). Si lo ejecutas como contenedor, configura tu perímetro de Autodiscovery con las instrucciones de la pestaña [Agent contenedorizado](?tab=containerizedagent).

## Excluir contenedores

Excluye contenedores del perímetro de Autodiscovery del Agent con una regla de exclusión basada en su `name`, `image` o `kube_namespace` para no recopilar **NINGÚN DATO* de estos contenedores. Si un contenedor cumple alguna de las reglas de exclusión, no se incluirá a menos que primero cumpla también con alguna regla de inclusión.

**Nota**: Las reglas de exclusión admiten expresiones regulares y se definen como una lista de cadenas separadas por espacios.

**Nota**: Para excluir todos los contenedores, puedes utilizar `name:.*`, `image:.*` o `kube_namespace:.*`. Si se configura `.*` sin un prefijo `name:`, `image:` o `kube_namespace:`, no funcionará.

{{< tabs >}}
{{% tab "Agent contenedorizado" %}}

En el **Agent v7.20 y posteriores**, para eliminar un contenedor Docker determinado con la **imagen** `<IMAGE_NAME>` de Autodiscovery y, así, excluir los **logs y métricas**, añade la siguiente variable de entorno al Datadog Agent:

```bash
DD_CONTAINER_EXCLUDE = "image:<IMAGE_NAME>"
```

Por ejemplo, la siguiente configuración indica al Agent que ignore algunos contenedores de Docker Cloud:

```bash
DD_CONTAINER_EXCLUDE = "image:dockercloud/network-daemon image:dockercloud/cleanup image:dockercloud/logrotate image:dockercloud/events image:dockercloud/ntpd"
```

Puedes utilizar una expresión regular para ignorarlos todos: `DD_CONTAINER_EXCLUDE = "image:dockercloud/.*"`

En el **Agent v7.19 y anteriores**, para eliminar un contenedor Docker determinado con la **imagen** `<IMAGE_NAME>` de Autodiscovery, añade la siguiente variable de entorno al Datadog Agent:

```bash
DD_AC_EXCLUDE = "image:<IMAGE_NAME>"
```

Al igual que en el ejemplo anterior, la siguiente configuración indica al Agent que ignore algunos contenedores de Docker Cloud:

```bash
DD_AC_EXCLUDE = "image:dockercloud/network-daemon image:dockercloud/cleanup image:dockercloud/logrotate image:dockercloud/events image:dockercloud/ntpd"
```

**Nota**: `DD_AC_EXCLUDE` está **obsoleto para el Agent v7.20 y posteriores**.

En el **Agent v7.20 y posteriores**, para eliminar un contenedor Docker determinado con el **nombre** `<NAME>` de Autodiscovery y, así, excluir los **logs y métricas**, añade la siguiente variable de entorno al Datadog Agent:

```bash
DD_CONTAINER_EXCLUDE = "name:<NAME>"
```

Por ejemplo, utiliza esta regla de exclusión para excluir el propio contenedor del Agent:

```bash
DD_CONTAINER_EXCLUDE = "name:dd-agent"
```

En el **Agent v7.19 y anteriores**, para eliminar un contenedor Docker determinado con el **nombre** `<IMAGE_NAME>` de Autodiscovery, añade la siguiente variable de entorno al Datadog Agent:

```bash
DD_AC_EXCLUDE = "name:<NAME>"
```

Por ejemplo, utiliza esta regla de exclusión para excluir el propio contenedor del Agent:

```bash
DD_AC_EXCLUDE = "name:dd-agent"
```

En el **Agent v7.20 y posteriores**, también se pueden utilizar reglas de exclusión para excluir **solo logs o solo métricas**. Por ejemplo, para excluir logs de un contenedor con la imagen `<IMAGE_NAME>`, añade la siguiente variable de entorno al Datadog Agent:

```bash
DD_CONTAINER_EXCLUDE_LOGS = "image:<IMAGE_NAME>"
```

De forma similar, para excluir métricas:

```bash
DD_CONTAINER_EXCLUDE_METRICS = "image:<IMAGE_NAME>"
```

En Kubernetes, para eliminar todos los contenedores de pods dentro del espacio de nombres `<NAMESPACE>` de Autodiscovery, añade la siguiente variable de entorno al Datadog Agent:

```bash
DD_CONTAINER_EXCLUDE = "kube_namespace:<NAMESPACE>"
```

{{% /tab %}}
{{% tab "Agent" %}}

Para eliminar un contenedor de Docker determinado con la imagen `<IMAGE_NAME>` de Autodiscovery, añade el siguiente bloque de configuración en el [archivo de configuración `datadog.yaml` del Agent][1]:

```yaml
container_exclude: [image:<IMAGE_NAME>]
```

Para eliminar un contenedor de Docker determinado con el nombre `<NAME>` de Autodiscovery, añade el siguiente bloque de configuración en el [archivo de configuración `datadog.yaml` del Agent][1]:

```yaml
container_exclude: [name:<NAME>]
```

En el **Agent v7.20 y posteriores**, también se pueden utilizar reglas de exclusión para excluir solo logs o solo métricas. Por ejemplo, para excluir logs de un contenedor con la imagen `<IMAGE_NAME>`, añade la siguiente variable de entorno al Datadog Agent:

```bash
container_exclude_logs: [image:<IMAGE_NAME>]
```

De forma similar, para excluir métricas con el **Agent v7.20 y posteriores**:

```bash
container_exclude_metrics: [image:<IMAGE_NAME>]
```

En Kubernetes, para eliminar todos los contenedores de pods dentro del espacio de nombres `<NAMESPACE>` de Autodiscovery, añade el siguiente bloque de configuración en el [archivo de configuración `datadog.yaml` del Agent][1]:

```yaml
container_exclude: [kube_namespace:<NAMESPACE>]
```

[1]: /es/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

**Nota**: Si utilizas Kubernetes, el contenedor `<NAME>` es el que aparece en tu manifiesto `.spec.containers[0].name`.

## Incluir contenedores

Incluye contenedores del perímetro de Autodiscovery del Agent con una regla de inclusión basada en su `name` o `image` para recopilar datos **SOLO** de esos contenedores. Si un contenedor cumple alguna regla de inclusión, se incluirá en el perímetro de Autodiscovery.

**Nota**: Las reglas de inclusión admiten expresiones regulares y se definen como una lista de cadenas separadas por espacios.

{{< tabs >}}
{{% tab "Agent contenedorizado" %}}

En el **Agent v7.20 y posteriores**, para incluir un contenedor de Docker determinado con la **imagen** `<IMAGE_NAME>` de Autodiscovery, añade la siguiente variable de entorno al Datadog Agent:

```bash
DD_CONTAINER_INCLUDE = "image:<IMAGE_NAME>"
```

En el **Agent v7.19 y anteriores**, para incluir un contenedor de Docker determinado con la **imagen** `<IMAGE_NAME>` de Autodiscovery, añade la siguiente variable de entorno al Datadog Agent:

```bash
DD_AC_INCLUDE = "image:<IMAGE_NAME>"
```

**Nota**: `DD_AC_INCLUDE` está **obsoleto para el Agent v7.20 y posteriores**.

En el **Agent v7.20 y posteriores**, para incluir un contenedor de Docker determinado con el **nombre** `<NAME>` de Autodiscovery, añade la siguiente variable de entorno al Datadog Agent:

```bash
DD_CONTAINER_INCLUDE = "name:<NAME>"
```

Por ejemplo, si solo quieres monitorizar imágenes de `ubuntu` o `debian` y excluir el resto, define lo siguiente:

```bash
DD_CONTAINER_EXCLUDE = "image:.*"
DD_CONTAINER_INCLUDE = "image:ubuntu image:debian"
```

En el **Agent v7.19 y anteriores**, para incluir un contenedor de Docker determinado con el **nombre** `<IMAGE_NAME>` de Autodiscovery, añade la siguiente variable de entorno al Datadog Agent:

```bash
DD_AC_INCLUDE = "name:<NAME>"
```

Al igual que en el ejemplo anterior, si solo quieres monitorizar imágenes de `ubuntu` o `debian` y excluir el resto, define lo siguiente:

```bash
DD_AC_EXCLUDE = "image:.*"
DD_AC_INCLUDE = "image:ubuntu image:debian"
```

En el **Agent v7.20 y posteriores**, también se pueden utilizar reglas de inclusión para incluir solo logs o solo métricas. Por ejemplo, para incluir logs de un contenedor con la imagen `<IMAGE_NAME>`, añade la siguiente variable de entorno al Datadog Agent:

```bash
DD_CONTAINER_INCLUDE_LOGS = "image:<IMAGE_NAME>"
```

De forma similar, para incluir métricas:

```bash
DD_CONTAINER_INCLUDE_METRICS = "image:<IMAGE_NAME>"
```

En Kubernetes, para incluir todos los contenedores de pods dentro del espacio de nombres <NAMESPACE> de Autodiscovery, añade la siguiente variable de entorno al Datadog Agent:

```bash
DD_CONTAINER_INCLUDE = "kube_namespace:<NAMESPACE>"
```

{{% /tab %}}
{{% tab "Agent" %}}

Para incluir un contenedor de Docker determinado con la imagen `<IMAGE_NAME>` de Autodiscovery, añade el siguiente bloque de configuración en el [archivo de configuración `datadog.yaml` del Agent][1]:

```yaml
container_include: [image:<IMAGE_NAME>]
```

Para incluir un contenedor Docker determinado con el nombre `<NAME>` de Autodiscovery, añade el siguiente bloque de configuración en el [archivo de configuración `datadog.yaml` del Agent][1]:

```yaml
container_include: [name:<NAME>]
```

En el **Agent v7.20 y posteriores**, también se pueden utilizar reglas de inclusión para incluir solo logs o solo métricas. Por ejemplo, para incluir logs de un contenedor con la imagen `<IMAGE_NAME>`, añade la siguiente variable de entorno al Datadog Agent:

```bash
container_include_logs: [image:<IMAGE_NAME>]
```

De forma similar, para incluir métricas:

```bash
container_include_metrics: [image:<IMAGE_NAME>]
```

En Kubernetes, para incluir todos los contenedores de pods dentro del espacio de nombres <NAMESPACE> de Autodiscovery, añade el siguiente bloque de configuración en el [archivo de configuración `datadog.yaml` del Agent][1]:

```yaml
container_include: [kube_namespace:<NAMESPACE>]
```

[1]: /es/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

**Nota**: Si utilizas Kubernetes, el contenedor `<NAME>` es el que aparece en tu manifiesto `.spec.containers[0].name`.

## Comportamiento de inclusión y exclusión

La inclusión siempre tiene prioridad, tanto si la regla es general como si solo se aplica a métricas o logs.

No se pueden mezclar reglas de inclusión/exclusión entre categorías. Por ejemplo, si quieres incluir un contenedor con el nombre de imagen `<IMAGE_NAME_1>` y excluir solo las métricas de un contenedor con el nombre de imagen `<IMAGE_NAME_2>`, utiliza lo siguiente:

{{< tabs >}}
{{% tab "Agent contenedorizado" %}}
```bash
DD_CONTAINER_INCLUDE_METRICS = "image:<IMAGE_NAME_1>"
DD_CONTAINER_INCLUDE_LOGS = "image:<IMAGE_NAME_1>"
DD_CONTAINER_EXCLUDE_METRICS = "image:<IMAGE_NAME_2>"
```

Es decir, no basta con configurar `DD_CONTAINER_INCLUDE = "image:<IMAGE_NAME_1>"`.

{{% /tab %}}
{{% tab "Agent" %}}
```yaml
container_include_metrics: [image:<IMAGE_NAME_1>]
container_include_logs: [image:<IMAGE_NAME_1>]
container_exclude_metrics: [image:<IMAGE_NAME_2>]
```

Es decir, no basta con configurar `container_include: [image:<IMAGE_NAME_1>]`.
{{% /tab %}}
{{< /tabs >}}

No existe interacción entre las listas generales y las listas selectivas (de logs y métricas). En otras palabras, no se puede excluir un contenedor de forma general y, luego, incluirlo con `container_include_logs` y `container_include_metrics`.

## Contenedores pausados

De forma predeterminada, el Datadog Agent no incluye los contenedores pausados de Kubernetes y OpenShift. Aun así, se contabilizan en el recuento de contenedores como contenedores excluidos.

Para desactivar este comportamiento e incluir los contenedores pausados en el perímetro de Autodiscovery, define el parámetro `exclude_pause_container` como `false` en el [archivo de configuración `datadog.yaml` del Agent][1] o con la variable de entorno `DD_EXCLUDE_PAUSE_CONTAINER="false"` del Agent.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/guide/agent-configuration-files/#agent-main-configuration-file