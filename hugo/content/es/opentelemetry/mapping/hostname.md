---
aliases:
- /es/opentelemetry/schema_semantics/hostname/
further_reading:
- link: /opentelemetry/
  tag: Documentación
  text: Soporte de OpenTelemetry en Datadog
title: Asignación de convenciones semánticas de OpenTelemetry a nombres de host
---
## Descripción general {#overview}

OpenTelemetry define ciertas convenciones semánticas para atributos de recursos relacionados con nombres de host. Si una carga útil del Protocolo OpenTelemetry (OTLP) para cualquier tipo de señal tiene atributos de recurso de nombre de host conocidos, Datadog respeta estas convenciones e intenta utilizar su valor como nombre de host. El algoritmo de resolución de nombre de host predeterminado está diseñado teniendo en cuenta la compatibilidad con el resto de los productos de Datadog, pero puede anularlo si es necesario.

Este algoritmo se utiliza en la ingesta de OTLP de Datadog, el [Datadog Exporter][3], la [canalización de ingesta de OTLP en el Datadog Agent][2] y el [DDOT Collector][5]. Cuando ejecuta un Collector, el [procesador de detección de recursos][1] agrega los atributos de recurso que necesita el algoritmo. Para obtener orientación por ruta, consulte [Nombre de host y etiquetado][4].

## Convenciones utilizadas para determinar el nombre de host {#conventions-used-to-determine-the-hostname}

Las convenciones se verifican en los atributos de recurso en el siguiente orden, y se utiliza el primer nombre de host válido. Si no hay convenciones válidas presentes, se utiliza la lógica de nombre de host de respaldo. Esta lógica de respaldo varía según el producto.

1. Verificación de las convenciones específicas de Datadog: `host` y `datadog.host.name`.
1. Verificación de las convenciones específicas del proveedor de nube para AWS, Azure y GCP.
1. Verificación de las convenciones específicas de Kubernetes.
1. Si no se encuentran convenciones específicas, recurra a `host.id` y `host.name`.

Las siguientes secciones explican cada conjunto de convenciones con más detalle.

### Convenciones semánticas generales de nombre de host {#general-hostname-semantic-conventions}

Las convenciones `host` y `datadog.host.name` son convenciones específicas de Datadog. Se consideran primero y pueden utilizarse para anular el nombre de host detectado mediante las convenciones semánticas habituales de OpenTelemetry. Se verifica primero `host` y luego se verifica `datadog.host.name` si `host` no se estableció.

Prefiera utilizar la convención `datadog.host.name` ya que tiene un espacio de nombres y es menos probable que entre en conflicto con otro comportamiento específico del proveedor.

Al utilizar el OpenTelemetry Collector, puede usar el procesador `transform` para establecer la convención `datadog.host.name` en sus canalizaciones. Por ejemplo, para establecer el nombre de host como `my-custom-hostname` en todas las métricas, trazas y registros en una canalización determinada, utilice la siguiente configuración:

```yaml
transform:
  metric_statements: &statements
    - context: resource
      statements:
        - set(attributes["datadog.host.name"], "my-custom-hostname")
  trace_statements: *statements # Use the same statements as in metrics
  log_statements:   *statements # Use the same statements as in metrics
```

No olvide agregar el procesador `transform` a sus canalizaciones.

Debido a cómo el backend procesa la deduplicación de nombres de host, es posible que ocasionalmente vea un alias para su host. Si esto le causa problemas, comuníquese con el soporte técnico.

### Convenciones específicas del proveedor de nube {#cloud-provider-specific-conventions}

El atributo de recurso `cloud.provider` se utiliza para determinar el proveedor de nube. Se utilizan otros atributos de recurso para determinar el nombre de host para cada plataforma específica. Si `cloud.provider` o cualquiera de los atributos de recurso esperados faltan, se verifica el siguiente conjunto de convenciones.

#### Amazon Web Services {#amazon-web-services}

Si `cloud.provider` tiene el valor `aws`, se verifican las siguientes convenciones:

1. Verifique `aws.ecs.launchtype` para determinar si la carga útil proviene de una tarea de ECS Fargate. Si es así, utilice `aws.ecs.task.arn` como identificador con el nombre de etiqueta `task_arn`.
1. De lo contrario, utilice `host.id` como nombre de host. Esto coincide con el ID de la instancia de EC2.

#### Google Cloud {#google-cloud}

Si `cloud.provider` tiene el valor `gcp`, se verifican las siguientes convenciones:

1. Verifique que `host.name` y `cloud.account.id` estén disponibles y tengan el formato esperado, elimine el prefijo de `host.name` y combine ambos en un nombre de host.

#### Azure {#azure}

Si `cloud.provider` tiene el valor `azure`, se verifican las siguientes convenciones:

1. Utilice `host.id` como nombre de host si está disponible y tiene el formato esperado.
1. De lo contrario, recurra a `host.name`.

### Convenciones específicas de Kubernetes {#kubernetes-specific-conventions}

Si `k8s.node.name` y el nombre del clúster están disponibles, el nombre de host se establece en `<node name>-<cluster name>`. Si solo `k8s.node.name` está disponible, el nombre de host se establece en el nombre del nodo.

Para obtener el nombre del clúster, se verifican las siguientes convenciones:

1. Verifique `k8s.cluster.name` y utilícelo si está presente.
2. Si `cloud.provider` está configurado como `azure`, extraiga el nombre del clúster de `azure.resourcegroup.name`.
3. Si `cloud.provider` está configurado como `aws`, extraiga el nombre del clúster del primer atributo de recurso que comience con `ec2.tag.kubernetes.io/cluster/`.

### `host.id` y `host.name` {#hostid-and-hostname}

Si ninguna de las convenciones anteriores está presente, los atributos de recurso `host.id` y `host.name` se utilizan tal cual para determinar el nombre de host. Primero se verifica `host.id` y luego se verifica `host.name` si `host.id` no estaba configurado.

**Nota:** La especificación de OpenTelemetry permite que `host.id` y `host.name` tengan valores que podrían no coincidir con los utilizados por otros productos de Datadog en un entorno determinado. Si utiliza varios productos de Datadog para hacer un seguimiento del mismo host, es posible que deba anular el nombre de host usando `datadog.host.name` para garantizar la coherencia.

## Procesador de atributos de infraestructura {#infra-attributes-processor}

El [procesador de atributos de infraestructura][6] automatiza la extracción de etiquetas de Kubernetes basadas en etiquetas o anotaciones y asigna estas etiquetas como atributos de recurso en trazas, métricas y registros. El procesador de atributos de infraestructura requiere que se establezcan los siguientes [atributos][7] (como `container.id`) para extraer los atributos y el nombre de host correctos.

El procesador de atributos de infraestructura también se puede configurar para anular el nombre de host extraído de los atributos por el nombre de host del Agent:

```
processors:
 infraattributes:
   allow_hostname_override: true
```

**Nota**: Esta configuración solo está disponible para el Collector de DDOT. 

## Lógica de nombre de host de respaldo {#fallback-hostname-logic}

Si no se encuentran nombres de servidor válidos en los atributos de recursos, el comportamiento varía según la ruta de ingesta. 

{{< tabs >}}
{{% tab "Datadog Exporter" %}}

Se utiliza la lógica de nombre de host de respaldo. Esta lógica genera un nombre de host para la máquina donde 
se ejecuta el Datadog Exporter, el cual es compatible con el resto de los productos de Datadog, al verificar las siguientes fuentes:

1. El campo `hostname` en la configuración del Datadog Exporter.
1. API del proveedor de nube.
1. Nombre de servidor de Kubernetes.
1. Nombre de dominio completo.
1. Nombre de servidor del sistema operativo.

Esto puede generar nombres de host incorrectos en [implementaciones de gateway][1]. Para evitar esto, utilice el procesador `resource detection` en sus canalizaciones para garantizar una resolución precisa del nombre de servidor.

[1]: https://opentelemetry.io/docs/collector/deployment/gateway/
{{% /tab %}}
{{% tab "Canalización de ingesta OTLP en el Datadog Agent" %}}

Se utiliza el nombre de host del Datadog Agent. Consulte [¿Cómo determina Datadog el nombre de host del Datadog Agent?][1] para obtener más información.

[1]: /es/agent/faq/how-datadog-agent-determines-the-hostname/
{{% /tab %}}
{{< /tabs >}}

## Nombres de host no válidos {#invalid-hostnames}

Los siguientes nombres de servidor se consideran no válidos y se descartan:
- `0.0.0.0`
- `127.0.0.1`
- `localhost`
- `localhost.localdomain`
- `localhost6.localdomain6`
- `ip6-localhost`

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/resourcedetectionprocessor#resource-detection-processor
[2]: /es/opentelemetry/interoperability/otlp_ingest_in_the_agent
[3]: /es/opentelemetry/setup/collector_exporter/datadog_exporter/
[4]: /es/opentelemetry/config/hostname_tagging/#hostname-recommendations
[5]: /es/opentelemetry/migrate/ddot_collector/
[6]: https://github.com/DataDog/datadog-agent/tree/main/comp/otelcol/otlp/components/processor/infraattributesprocessor
[7]: https://github.com/DataDog/datadog-agent/tree/main/comp/otelcol/otlp/components/processor/infraattributesprocessor#expected-attributes