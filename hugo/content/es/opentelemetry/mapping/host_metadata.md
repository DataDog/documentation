---
aliases:
- /es/opentelemetry/guide/host_metadata/
- /es/opentelemetry/schema_semantics/host_metadata/
further_reading:
- link: /opentelemetry/
  tag: Documentación
  text: Soporte de OpenTelemetry en Datadog
title: 'Lista de infraestructura: Información de servidor'
---
<div class="alert alert-info">
Esta función está en versión preliminar. Si tiene algún comentario, comuníquese con <a href="/help/">el soporte de Datadog</a>.
</div>

## Descripción general {#overview}

La configuración recomendada del OpenTelemetry Collector recopila metadatos del servidor con el receptor de métricas de servidor y el procesador de detección de recursos, y luego informa al Collector a través de la Datadog Extension. Puede visualizar estos servidores en la [Lista de infraestructura][6]. Para la mayoría de las implementaciones, como ejecutar el Collector como un agente en cada servidor, la información del servidor se completa automáticamente y no necesita seguir la configuración manual en esta página.

<div class="alert alert-info">La configuración manual descrita en esta página es principalmente para <a href="https://opentelemetry.io/docs/collector/deployment/gateway/">implementaciones de puerta de enlace</a>, donde el Collector que exporta a Datadog se ejecuta por separado de los servidores sobre los que informa. En estas configuraciones, etiquete explícitamente sus recursos para que los metadatos correctos del servidor lleguen a Datadog. Si ejecuta el Collector como un agente en cada servidor, los metadatos del servidor se recopilan de forma predeterminada y puede omitir esta configuración.</div>

Envíe información del sistema sobre los servidores en OTLP a través del campo [`Resource`][1] como parte de cualquier señal. Datadog admite esta información bajo cualquier [patrón de implementación][9], incluidas las implementaciones de puerta de enlace.

Datadog utiliza [convenciones semánticas de OpenTelemetry][2] para reconocer información del sistema sobre sus servidores. Siga las instrucciones para [configurar las métricas de servidor][3] para enviar las métricas y los atributos de recursos necesarios a Datadog. Alternativamente, puede enviar esta información manualmente de la manera que mejor se adapte a su infraestructura.

## Habilitar la función {#opting-in-to-the-feature}

Para implementaciones de puerta de enlace, o para controlar manualmente qué recursos se utilizan para los metadatos del servidor, establezca el atributo de recurso `datadog.host.use_as_metadata` en `true` en todas las cargas útiles de OTLP que contengan información sobre los servidores.

Los recursos completan la información de la lista de infraestructura si tienen un [atributo de identificación de servidor][10] y el atributo `datadog.host.use_as_metadata` establecido en `true`.

Para declarar explícitamente qué recursos utilizar para los metadatos, agregue el atributo de recurso booleano `datadog.host.use_as_metadata` a todos los recursos que tengan información relevante del servidor.

Por ejemplo, para configurar esto para todos los recursos en métricas, trazas y registros, utilice el [procesador de transformación][7] con la siguiente configuración:

```yaml
processors:
  transform:
    metric_statements:
      - context: resource
        statements:
          - set(attributes["datadog.host.use_as_metadata"], true)
    trace_statements:
      - context: resource
        statements:
          - set(attributes["datadog.host.use_as_metadata"], true)
    log_statements:
      - context: resource
        statements:
          - set(attributes["datadog.host.use_as_metadata"], true)
```

Agregue este procesador a la `processors` lista de todas sus canalizaciones.

Debe etiquetar explícitamente todos sus recursos con un atributo de identificación de servidor. Esto se realiza de forma predeterminada mediante la [configuración recomendada para métricas de servidor][3].

## Convenciones admitidas {#supported-conventions}

Datadog admite convenciones semánticas tanto a nivel de atributo de recurso como a nivel de métricas del sistema. Las convenciones semánticas de atributos de recurso admitidas se encuentran principalmente bajo [el espacio de nombres `host.`][4] y [el espacio de nombres `os.`][8]. Todas las convenciones semánticas a nivel de métricas del sistema admitidas se encuentran bajo [el espacio de nombres `system.`][5].

### Convenciones generales del sistema {#general-system-conventions}

| Convención semántica                         | Tipo               | Campo en la aplicación |
|---------------------------------------------|--------------------|--------------|
| [*Varios atributos de identificación de servidor*][10] | Atributo de recurso | Nombre de servidor     |
| `os.description`                            | Atributo de recurso | SO           |

### Convenciones de CPU {#cpu-conventions}

| Convención semántica         | Tipo               | Campo en la aplicación       |
|-----------------------------|--------------------|--------------------|
| `host.cpu.vendor.id`        | Atributo de recurso | ID de proveedor          |
| `host.cpu.model.name`       | Atributo de recurso | Nombre del modelo         |
| `host.cpu.cache.l2.size`    | Atributo de recurso | Tamaño de caché         |
| `host.cpu.family`           | Atributo de recurso | Familia             |
| `host.cpu.model.id`         | Atributo de recurso | Modelo              |
| `host.cpu.stepping`         | Atributo de recurso | Stepping           |
| `system.cpu.logical.count`  | Métrica del sistema      | Procesadores lógicos |
| `system.cpu.physical.count` | Métrica del sistema      | Núcleos              |
| `system.cpu.frequency`      | Métrica del sistema      | MHz                |

### Convenciones de red {#network-conventions}

| Convención semántica | Tipo               | Campo en la aplicación              |
|---------------------|--------------------|---------------------------|
| `host.ip`           | Atributo de recurso | Dirección IP y dirección IPv6 |
| `host.mac`          | Atributo de recurso | Dirección MAC               |

### Recopilación de estas convenciones con el OpenTelemetry Collector {#collecting-these-conventions-with-the-opentelemetry-collector}

Para recopilar estas convenciones con el OpenTelemetry Collector, configure la [configuración recomendada para métricas de servidor][3]. El receptor de métricas de servidor recopila todas las métricas relevantes, mientras que el procesador de detección de recursos recopila todos los atributos de recursos relevantes.

**Nota:** Debe agregar estos procesadores y receptores en el Collector que se ejecuta en el servidor que desea hacer un seguimiento. Un servidor de puerta de enlace no recopila esta información de servidores remotos.


## IDs de recursos en la nube canónicos {#canonical-cloud-resource-ids}

Los IDs de recursos en la nube canónicos (CCRIDs) son IDs de recursos asignados por el proveedor de la nube que identifican de forma única un recurso en la nube. Después de agregar CCRIDs en sus diferentes tipos de observabilidad, puede usarlos para vincular de manera consistente diferentes tipos de datos para un recurso en la nube determinado. Puede agregar CCRIDs en el mismo formato en todos los tipos de recursos en la nube. La adición y adopción generalizada de CCRIDs le brinda acceso a una variedad de casos de uso entre clientes y equipos internos.

Habilite los CCRIDs para saltar entre recursos y sus métricas, trazas y registros asociados para todos los tipos de recursos, eliminando el cambio de contexto y brindándole una vista de extremo a extremo de sus recursos dentro del mismo flujo de trabajo.

Para usar esta función, establezca el atributo de recurso `datadog.ccrid` en el valor del CCRID en todas las cargas útiles OTLP.

Consulte a continuación la lista de formatos de identificador por nube:
| Nube   | Tipo de identificador    | Ejemplo                                                                                                                                      |
|---------|--------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| AWS     | ARN                | `arn:aws:ec2:us-east-1:123456789012:instance/i-abcdefghi`                                                                                    |
| Azure   | ID de recurso        | `/subscriptions/12345678-1234-5678-1234-567891234567/resourcegroups/exampleResourceGroup/Microsoft.Compute/virtualMachines/exampleVM`        |
| GCP     | Nombre de recurso CAI  | `//compute.googleapis.com/projects/example-project/locations/us-central1/instances/my-instance`                                              |
| OCI     | OCID               | `ocid1.instance.oc1.eu-frankfurt-1.exampleuniqueid`                                                                                          |

Cómo formar un CCRID:
 * [AWS (instancia EC2)][13]: `arn:aws:ec2:{region}:{accountId}:instance/{instanceId}`. 
    Utilice este comando para recuperar el `instanceId`:
    ```shell
    ec2metadata --instance-id
    ```
 * [Azure][11]: `/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}`
 * GCP: `//compute.googleapis.com/projects/{projectID}/zones/{zoneName}/instances/{instanceName}"`
 * OCI/Oracle: El CCRID se puede obtener [enviando una solicitud][12] a: `http://169.254.169.254/opc/v2/instance/id`


Por ejemplo, para establecer un CCRID de AWS para todos los recursos en métricas, trazas y registros, utilice el [procesador de transformación][2] con la siguiente configuración:

```yaml
processors:
  transform:
    metric_statements:
      - context: resource
        statements:
          - set(attributes["datadog.ccrid"], "arn:aws:ec2:us-east-1:123456789012:instance/i-abcdefghi")
    trace_statements:
      - context: resource
        statements:
          - set(attributes["datadog.ccrid"], "arn:aws:ec2:us-east-1:123456789012:instance/i-abcdefghi")
    log_statements:
      - context: resource
        statements:
          - set(attributes["datadog.ccrid"], "arn:aws:ec2:us-east-1:123456789012:instance/i-abcdefghi")
```

Las convenciones semánticas de OpenTelemetry también definen el atributo [cloud.resource_id][14], que puede asignarse en la configuración utilizando el [procesador de atributos][15].

Ejemplo: 

```yaml
processors:
  attributes/example:
    actions:
      - key: datadog.ccrid
        from_attribute: cloud.resource_id
        action: upsert
```


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/concepts/glossary/#resource
[2]: https://opentelemetry.io/docs/concepts/semantic-conventions/
[3]: /es/opentelemetry/collector_exporter/host_metrics
[4]: https://opentelemetry.io/docs/specs/semconv/resource/host/
[5]: https://opentelemetry.io/docs/specs/semconv/system/system-metrics/
[6]: /es/infrastructure/list/
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/transformprocessor#transform-processor
[8]: https://opentelemetry.io/docs/specs/semconv/resource/os/
[9]: https://opentelemetry.io/docs/collector/deployment/
[10]: /es/opentelemetry/schema_semantics/hostname/
[11]: https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/move-resource-group-and-subscription?tabs=azure-cli
[12]: https://docs.oracle.com/en-us/iaas/Content/Compute/Tasks/gettingmetadata.htm
[13]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-policies-for-amazon-ec2.html#policy-syntax
[14]: https://opentelemetry.io/docs/specs/semconv/registry/attributes/cloud/#cloud-resource-id
[15]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/attributesprocessor