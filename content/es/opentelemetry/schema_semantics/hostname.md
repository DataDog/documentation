---
further_reading:
- link: /opentelemetry/
  tag: Documentación
  text: Soporte de OpenTelemetry en Datadog
title: Asignación de convenciones semánticas de OpenTelemetry a nombres de host
---

## Información general

OpenTelemetry define ciertas convenciones semánticas para atributos de recursos relacionados con nombres de host. Si una carga útil del Protocolo de OpenTelemetry (OTLP) para cualquier tipo de señal tiene atributos de recurso de nombre de host conocidos, Datadog respeta estas convenciones e intenta utilizar su valor como nombre de host. El algoritmo predeterminado de resolución de nombres de host se ha creado teniendo en cuenta la compatibilidad con el resto de productos de Datadog, pero puedes anularlo si es necesario.

Este algoritmo se utiliza en el [exportador de Datadog][3] así como en el [pipeline de ingesta OTLP en el Datadog Agent][2]. Cuando se utiliza [la configuración recomendada][4] para el exportador de Datadog, el [procesador de detección de recursos][1] añade los atributos necesarios a la carga útil para garantizar una resolución precisa del nombre de host.

## Convenciones utilizadas para determinar el nombre de host

Las convenciones se comprueban en los atributos de recursos en el siguiente orden y se utiliza el primer nombre de host válido. Si no hay convenciones válidas, se utiliza la lógica del nombre de host alternativa. Esta lógica varía según el producto.

1. Se comprueban las convenciones específicas de Datadog: `host` y `datadog.host.name`.
1. Se comprueban las convenciones específicas del proveedor de la nube para AWS, Azure y GCP.
1. Se comprueban las convenciones específicas de Kubernetes.
1. Si no se encuentran convenciones específicas, se recurre a `host.id` y `host.name`.

En las secciones siguientes se explica cada conjunto de convenciones con más detalle.

### Convenciones semánticas generales del nombre de host

Las convenciones `host` y `datadog.host.name` son convenciones específicas de Datadog. Se consideran las primeras y se pueden utilizar para anular el nombre de host detectado con las convenciones semánticas habituales de OpenTelemetry. Es preferible utilizar la convención `datadog.host.name`, ya que está espaciada por nombres, y es menos probable que entre en conflicto con otros comportamientos específicos del proveedor.

En OpenTelemetry Collector, puedes utilizar el procesador `transform` para establecer la convención `datadog.host.name` en tus pipelines. Por ejemplo, para establecer el nombre de host como `my-custom-hostname` en todas las métricas, trazas (traces) y logs en un pipeline dado, utiliza la siguiente configuración:

```yaml
transform:
  metric_statements: &statements
    - context: resource
      statements:
        - set(attributes["datadog.host.name"], "my-custom-hostname")
  trace_statements: *statements # Use the same statements as in metrics
  log_statements:   *statements # Use the same statements as in metrics
```

No olvides añadir el procesador `transform` a tus pipelines.

### Convenciones específicas del proveedor de la nube

El atributo de recurso `cloud.provider` se utiliza para determinar el proveedor de la nube. Otros atributos se utilizan para determinar el nombre de host de cada plataforma específica. Si falta `cloud.provider` o alguno de los atributos, se comprueba el siguiente conjunto de convenciones.

#### Amazon Web Services

Si `cloud.provider` tiene el valor `aws`, se comprueban las siguientes convenciones:

1. Comprueba `aws.ecs.launchtype` para determinar si la carga útil procede de una tarea de ECS Fargate. Si es así, utiliza `aws.ecs.task.arn` como identificador con el nombre de etiqueta `task_arn`.
1. De lo contrario, utiliza `host.id` como nombre de host. Esto coincide con el Id. de instancia de EC2.

#### Google Cloud

Si `cloud.provider` tiene el valor `gcp`, se comprueban las siguientes convenciones:

1. Comprueba que tanto `host.name` como `cloud.account.id` están disponibles y tienen el formato esperado, elimina el prefijo de `host.name` y fusiona ambos en un nombre de host.

#### Azure

Si `cloud.provider` tiene el valor `azure`, se comprueban las siguientes convenciones:

1. Utiliza `host.id` como nombre de host si está disponible y tiene el formato esperado.
1. Si no, vuelve a `host.name`.

### Convenciones específicas de Kubernetes

Si `k8s.node.name` y el nombre de clúster están disponibles, el nombre de host se establece en `<node name>-<cluster name>`. Si solo `k8s.node.name` está disponible, el nombre de host se establece en el nombre del nodo.

Para obtener el nombre de clúster, se comprueban las siguientes convenciones:

1. Comprueba `k8s.cluster.name` y utilízalo si está presente.
2. Si `cloud.provider` está configurado como `azure`, extrae el nombre de clúster de `azure.resourcegroup.name`.
3. Si `cloud.provider` está configurado como `aws`, extrae el nombre de clúster del primer atributo que empiece por `ec2.tag.kubernetes.io/cluster/`.

### `host.id` y `host.name`

Si ninguna de las convenciones anteriores está presente, los atributos de recurso `host.id` y `host.name` se utilizan tal cual para determinar el nombre de host.

**Nota:** La especificación de OpenTelemetry permite que `host.id` y `host.name` tengan valores que pueden no coincidir con los utilizados por otros productos de Datadog en un determinado entorno. Si utilizas varios productos de Datadog para monitorizar el mismo host, es posible que tengas que anular el nombre de host utilizando `datadog.host.name` para garantizar la coherencia.

## Lógica de nombres de host alternativa

Si no se encuentran nombres válidos de host, el comportamiento varía en función de la ruta de ingesta. 

{{< tabs >}}
{{% tab "Exportador de Datadog" %}}

Se utiliza la lógica de nombre de host alternativa. Esta lógica genera un nombre de host para la máquina donde 
se está ejecutando el exportador de Datadog, que es compatible con el resto de productos de Datadog, al comprobar las siguientes fuentes:

1. El campo `hostname` de la configuración del Exportador de Datadog.
1. API del proveedor de la nube.
1. Nombre de host de Kubernetes.
1. Nombre de dominio completo.
1. Nombre de host del sistema operativo.

Esto puede dar lugar a nombres de host incorrectos en [despliegues de gateway][1]. Para evitarlo, utiliza el procesador `resource detection` en tus pipelines para asegurar una resolución de nombres de host precisa.

[1]: https://opentelemetry.io/docs/collector/deployment/gateway/
{{% /tab %}}
{{% tab "Pipeline de ingesta OTLP en el Datadog Agent" %}}

Se utiliza el nombre de host del Datadog Agent. Consulta [¿Cómo determina Datadog el nombre de host del Agent?][1] para obtener más información.

[1]: /es/agent/faq/how-datadog-agent-determines-the-hostname/
{{% /tab %}}
{{< /tabs >}}

## Nombres de host no válidos

Los siguientes nombres de host no se consideran válidos y se descartan:
- `0.0.0.0`
- `127.0.0.1`
- `localhost`
- `localhost.localdomain`
- `localhost6.localdomain6`
- `ip6-localhost`

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/resourcedetectionprocessor#resource-detection-processor
[2]: /es/opentelemetry/interoperability/otlp_ingest_in_the_agent
[3]: /es/opentelemetry/collector_exporter/otel_collector_datadog_exporter
[4]: /es/opentelemetry/collector_exporter/hostname_tagging/?tab=host