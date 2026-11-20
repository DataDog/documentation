---
further_reading:
- link: https://opentelemetry.io/docs/collector/troubleshooting/
  tag: Sitio externo
  text: Solución de problemas de OpenTelemetry
title: Solución de problemas
---
Si experimenta un comportamiento inesperado al usar OpenTelemetry con Datadog, esta guía puede ayudarle a resolver el problema. Si continúa teniendo problemas, comuníquese con el [soporte de Datadog][1] para obtener más ayuda.

## Nombres de servidor incorrectos o inesperados {#incorrect-or-unexpected-hostnames}

Al usar OpenTelemetry con Datadog, es posible que encuentre varios problemas relacionados con el nombre de servidor. Las siguientes secciones cubren escenarios comunes y sus soluciones.

### Diferencia entre el nombre de servidor de Kubernetes y el nombre del nodo {#different-kubernetes-hostname-and-node-name}

**Síntoma**: Al implementar en Kubernetes, el nombre de servidor reportado por Datadog no coincide con el nombre del nodo esperado.

**Causa**: Esto suele ser el resultado de etiquetas `k8s.node.name` (y opcionalmente `k8s.cluster.name`) faltantes.

**Resolución**:

1. Configure el atributo `k8s.pod.ip` para su despliegue de aplicación: 

   ```yaml
   env:
     - name: MY_POD_IP
       valueFrom:
         fieldRef:
           apiVersion: v1
           fieldPath: status.podIP
     - name: OTEL_RESOURCE_ATTRIBUTES
       value: k8s.pod.ip=$(MY_POD_IP)
   ```

2. Habilite el procesador `k8sattributes` en su Collector:

   ```yaml
   k8sattributes:
   [...]
   processors:
     - k8sattributes
   ```

Alternativamente, puede anular el nombre de servidor usando el atributo `datadog.host.name`:

   ```yaml
   processors:
     transform:
       trace_statements:
         - context: resource
           statements:
             - set(attributes["datadog.host.name"], "${NODE_NAME}")
   ```

Para obtener más información sobre los atributos de identificación de servidor, consulte [Asignación de convenciones semánticas de OpenTelemetry a nombres de servidor][2]. Para conocer la configuración de nombre de servidor recomendada para su configuración, consulte [Nombre de servidor y etiquetado][9].

### Nombres de servidor inesperados con el despliegue de AWS Fargate {#unexpected-hostnames-with-aws-fargate-deployment}

**Síntoma**: En entornos de AWS Fargate, es posible que se informe un nombre de servidor incorrecto para los traces.

**Causa**: En entornos de Fargate, la detección de recursos predeterminada puede no identificar correctamente los metadatos de ECS, lo que lleva a una asignación de nombre de servidor incorrecta.

**Resolución**:

Configure el procesador `resourcedetection` en la configuración de su Collector y habilite el detector `ecs`:

```yaml
processors:
  resourcedetection:
    detectors: [env, ecs]
    timeout: 2s
    override: false
```

### El Collector de puerta de enlace no reenvía los metadatos del servidor {#gateway-collector-not-forwarding-host-metadata}

**Síntoma**: En una implementación de puerta de enlace, la telemetría de varios servidores parece provenir de un solo servidor, o los metadatos del servidor no se reenvían correctamente.

**Causa**: Esto ocurre cuando la configuración del colector de la puerta de enlace no conserva ni reenvía correctamente los atributos de metadatos del servidor de los colectores del agente.

**Resolución**:

1. Configure los colectores del agente para recopilar y reenviar metadatos del servidor:

   ```yaml
   processors:
     resourcedetection:
       detectors: [system, env]
     k8sattributes:
       passthrough: true
   ```

2. Configure el colector de la puerta de enlace para extraer y reenviar los metadatos necesarios:

   ```yaml
   processors:
     k8sattributes:
       extract:
         metadata: [node.name, k8s.node.name]
     transform:
       trace_statements:
         - context: resource
           statements:
             - set(attributes["datadog.host.use_as_metadata"], true)
   
   exporters:
     datadog:
       hostname_source: resource_attribute
   ```

Para obtener más información, consulte [Asignación de convenciones semánticas de OpenTelemetry a la información del servidor de la lista de infraestructura][3].

### El mismo servidor aparece varias veces bajo diferentes nombres {#the-same-host-shows-up-multiple-times-under-different-names}

**Síntoma**: Un solo servidor aparece bajo varios nombres en Datadog. Por ejemplo, es posible que vea una entrada del Colector de OpenTelemetry (con el logotipo de OTel) y otra del Datadog Agent.

**Causa**: Cuando un servidor se supervisa a través de más de un método de ingesta (por ejemplo, OTLP + Datadog Agent, o DogStatsD + OTLP) sin alinearse en un solo atributo de recurso de nombre de servidor, Datadog trata cada ruta como un servidor independiente.

**Resolución**:
1. Identifique todas las rutas de ingesta de telemetría activas que envían datos desde la misma máquina a Datadog.
2. Elija una única fuente de nombre de servidor y decida si desea confiar en el nombre de servidor del Datadog Agent o en un atributo de recurso específico (por ejemplo, `k8s.node.name`).
3. Configure cada ruta (Agent, Collector, etc.) para que informen un nombre de servidor coherente. Por ejemplo, si está configurando el nombre de servidor con atributos OTLP, configure su procesador de transformación:
    ```yaml
    processors:
      transform:
        trace_statements:
          - context: resource
            statements:
              - set(attributes["datadog.host.name"], "shared-hostname")
    ```
4. Valide en Datadog (lista de infraestructura, mapa de servidores, etc.) para confirmar que el servidor ahora aparece bajo un solo nombre.

## Retrasos en las etiquetas de servidor después del inicio {#host-tag-delays-after-startup}

**Síntoma**: Es posible que experimente un retraso en la aparición de las etiquetas de servidor en sus datos de telemetría después de iniciar el Datadog Agent o el OpenTelemetry Collector. Este retraso suele durar menos de 10 minutos, pero puede extenderse hasta 40-50 minutos en algunos casos.

**Causa**: Este retraso ocurre porque los metadatos del servidor deben ser procesados e indexados por el backend de Datadog antes de que las etiquetas puedan asociarse con los datos de telemetría.

**Resolución**:

Las etiquetas de servidor configuradas en la configuración del exportador de Datadog (`host_metadata::tags`) o en la sección `tags` del Datadog Agent no se aplican inmediatamente a los datos de telemetría. Las etiquetas aparecen eventualmente después de que el backend resuelve los metadatos del servidor.

Elija su configuración para obtener instrucciones específicas:

{{< tabs >}}
{{% tab "Ingesta de OTLP del Datadog Agent" %}}

Configure `expected_tags_duration` en `datadog.yaml` para cerrar la brecha hasta que se resuelvan las etiquetas de servidor:

```yaml
expected_tags_duration: "15m"
```

Esta configuración agrega las etiquetas esperadas a toda la telemetría durante la duración especificada (en este ejemplo, 15 minutos).

{{% /tab %}}

{{% tab "OpenTelemetry Collector" %}}

Utilice el procesador `transform` para establecer sus etiquetas de servidor como atributos de OTLP. Por ejemplo, para agregar etiquetas de entorno y equipo:

```yaml
processors:
  transform:
    trace_statements:
      - context: resource
        statements:
          # OpenTelemetry semantic conventions
          - set(attributes["deployment.environment.name"], "prod")
          # Datadog-specific host tags
          - set(attributes["ddtags"], "env:prod,team:backend")
...
```

Este enfoque combina las convenciones semánticas de OpenTelemetry con etiquetas de servidor específicas de Datadog para garantizar una funcionalidad adecuada tanto en entornos de OpenTelemetry como de Datadog.

{{% /tab %}}
{{< /tabs >}}

## Las etiquetas de infraestructura faltan en la telemetría {#infrastructure-tags-are-missing-from-telemetry}

**Síntoma**: Ha habilitado el procesador `infraattributes` en su configuración de DDOT Collector, pero las etiquetas a nivel de Kubernetes (como `k8s.pod.name`, `k8s.namespace.name` o etiquetas de pod) no aparecen en sus trazas, métricas o registros.

**Causa**: El procesador `infraattributes` requiere atributos de recurso específicos en la telemetría entrante para identificar el contenedor de fuente.

Si el atributo de recurso `container.id` no está presente en la entrada, el procesador intenta detectarlo automáticamente. Se prueban los siguientes métodos, en orden de mayor a menor precedencia:

| Atributos de recurso                              | Método de detección                  |
|--------------------------------------------------|-----------------------------------|
| `process.pid` (int)                              | Basado en el PID externo del contenedor |
| `datadog.container.cgroup_inode` (int)           | Basado en el inodo cgroup del contenedor |
| `k8s.pod.uid` (str) + `k8s.container.name` (str) | Basado en el pod y nombre del contenedor |

Si su telemetría no proporciona atributos para ninguno de estos métodos de detección, el procesador no puede buscar los metadatos de Kubernetes correspondientes.

**Resolución**:

Asegúrese de que su telemetría incluya los atributos requeridos siguiendo estos pasos en orden:

1.  **Use la auto-instrumentación del SDK (Preferido)**: Actualice a una versión reciente de la auto-instrumentación de OpenTelemetry de su lenguaje. Este es el primer paso preferido, ya que a menudo proporciona `container.id` o `process.pid` automáticamente. Si estos atributos no se están agregando automáticamente, consulte la documentación de su SDK. Algunos SDK (como Go) proporcionan una configuración específica (como [resource.WithContainerID][8]) para habilitar esto.

2.  **Establezca manualmente los atributos de recurso**: Si la instrumentación automática no agrega los atributos necesarios, establézcalos manualmente usando `OTEL_RESOURCE_ATTRIBUTES`. Esto permite que el procesador utilice el método de detección `k8s.pod.uid` y `k8s.container.name`. Por ejemplo:
    ```yaml
    env:
      - name: OTEL_SERVICE_NAME
        value: {{ .Chart.Name }}
      - name: OTEL_K8S_NAMESPACE
        valorDe:
          fieldRef:
            apiVersion: v1
            fieldPath: metadata.namespace
      - nombre: OTEL_K8S_NODE_NAME
        valorDe:
          fieldRef:
            apiVersion: v1
            fieldPath: spec.nodeName
      - nombre: OTEL_K8S_POD_NAME
        valorDe:
          fieldRef:
            apiVersion: v1
            fieldPath: metadata.name
      - name: OTEL_K8S_POD_ID
        valorDe:
          fieldRef:
            apiVersion: v1
            fieldPath: metadata.uid
      - name: OTEL_RESOURCE_ATTRIBUTES
        valor: >-
          service.name=$(OTEL_SERVICE_NAME),
          k8s.namespace.name=$(OTEL_K8S_NAMESPACE),
          k8s.node.name=$(OTEL_K8S_NODE_NAME),
          k8s.pod.name=$(OTEL_K8S_POD_NAME),
          k8s.pod.uid=$(OTEL_K8S_POD_ID),
          k8s.container.name={{ .Chart.Name }},
          host.name=$(OTEL_K8S_NODE_NAME),
          deployment.environment.name=$(OTEL_K8S_NAMESPACE)
    ```
3. **Utilice el procesador `resourcedetection` del Collector**: Si no puede establecer los atributos de recursos a nivel de SDK o de aplicación, puede utilizar el procesador `resourcedetection` del Collector. Colóquelo antes de `infraattributes`.

4.  **Verifique los atributos**: Use el exportador `debug` en su canalización de DDOT Collector para confirmar que los atributos de recurso requeridos (como `container.id`, `process.pid` o `k8s.pod.uid`) estén presentes en su telemetría.

Para obtener más detalles sobre los atributos utilizados por este procesador, consulte la [documentación del Procesador de Atributos de Infraestructura][7].

## No se pudo asignar el atributo 'team' a la etiqueta de equipo de Datadog {#unable-to-map-team-attribute-to-datadog-team-tag}

**Síntoma**: La etiqueta de equipo no aparece en Datadog para los registros y trazas, a pesar de estar configurada como un atributo de recurso en las configuraciones de OpenTelemetry.

**Causa**: Esto sucede porque los atributos de recurso de OpenTelemetry necesitan un mapeo explícito al formato de etiquetas de Datadog usando el atributo `ddtags`.

**Resolución**:

Utilice el procesador de transformación del OpenTelemetry Collector para asignar el atributo de recurso team al atributo `ddtags`:

```yaml
processors:
  transform/datadog_team_tag:
    metric_statements:
      - context: datapoint
        statements:
          - set(attributes["ddtags"], Concat(["team:", resource.attributes["team"]],""))
    log_statements:
      - context: log
        statements:
          - set(attributes["ddtags"], Concat(["team:", resource.attributes["team"]],""))
    trace_statements:
      - context: span
        statements:
          - set(attributes["ddtags"], Concat(["team:", resource.attributes["team"]],""))
```

<div class="alert alert-info">Reemplace <code>resource.attributes["team"]</code> con el nombre de atributo real si es diferente en su configuración (por ejemplo, <code>resource.attributes["arm.team.name"]</code>).</div>

Para verificar la configuración:

1. Reinicie el OpenTelemetry Collector para aplicar los cambios.
2. Genere registros de prueba y trazas.
3. Verifique si la etiqueta de equipo aparece en sus registros y trazas de Datadog.
4. Verifique que la etiqueta de equipo funcione como se espera en el filtrado y en los tableros.

## Las etiquetas de contenedor no aparecen en la página de Containers {#container-tags-not-appearing-on-containers-page}

**Síntoma**: Las etiquetas de contenedor no aparecen en la página de Containers en Datadog, lo cual afecta las capacidades de monitoreo y gestión de contenedores.

**Causa**: Esto ocurre cuando los atributos de recurso de contenedor no están asignados correctamente al formato de metadatos de contenedor esperado por Datadog.

**Resolución**:

Al utilizar la ingesta OTLP en el Datadog Agent, debe establecer atributos de recurso específicos para asegurar la asociación correcta de metadatos de contenedor. Para obtener más información, consulte [Asignación de atributos de recurso][4].

Para verificar la configuración:

1. Verifique los datos de traza sin procesar para confirmar que los ID y las etiquetas de contenedor se traduzcan correctamente al formato de Datadog (por ejemplo, `container.id` debería convertirse en `container_id`).
2. Verifique que los metadatos del container aparezcan en la página de containers.

## Métricas faltantes en el Catálogo y en los tableros {#missing-metrics-in-catalog-and-dashboards}

**Síntoma**: Las métricas no aparecen en el Catálogo ni en los tableros a pesar de ser recolectadas correctamente.

**Causa**: Esto ocurre generalmente debido a convenciones semánticas incorrectas o mal asignadas.

**Resolución**:

Para verificar la configuración:

1. Verifique que sus métricas contengan las [convenciones semánticas][4] requeridas.
2. Verifique que los nombres de las métricas sigan las convenciones de nomenclatura de OpenTelemetry.
3. Confirme que las métricas se estén traduciendo correctamente al formato de Datadog utilizando la [referencia de mapeo de métricas][5].

<div class="alert alert-info">Al trabajar con convenciones semánticas, asegúrese de seguir la especificación más reciente de OpenTelemetry para la nomenclatura y los atributos de las métricas.</div>

## Errores de enlace de puertos y fallas de conexión {#port-binding-errors-and-connection-failures}

**Síntoma**: Experimenta conflictos de puertos o problemas de enlace al implementar el DDOT Collector, o las aplicaciones no pueden conectarse al DDOT Collector.

**Causa**: Esto ocurre normalmente debido a conflictos de nomenclatura de puertos, configuraciones de puertos incorrectas o cuando varios servicios intentan utilizar los mismos puertos.

**Resolución**:

El Datadog Operator vincula automáticamente el OpenTelemetry Collector a los puertos `4317` (llamado `otel-grpc`) y `4318` (llamado `otel-http`) de forma predeterminada.

Para anular explícitamente los puertos predeterminados, utilice el parámetro `features.otelCollector.ports`:

```yaml
# Enable Features
features:
  otelCollector:
    enabled: true
    ports:
      - containerPort: 4317
        hostPort: 4317
        name: otel-grpc
      - containerPort: 4318
        hostPort: 4318
        name: otel-http
```

<div class="alert alert-danger">Al configurar los puertos <code>4317</code> y <code>4318</code>, debe usar los nombres predeterminados <code>otel-grpc</code> y <code>otel-http</code> respectivamente para evitar conflictos de puertos.</div>

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help/
[2]: /es/opentelemetry/schema_semantics/hostname/
[3]: /es/opentelemetry/schema_semantics/host_metadata/
[4]: /es/opentelemetry/schema_semantics/semantic_mapping/
[5]: /es/opentelemetry/schema_semantics/metrics_mapping/#metrics-mappings
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/resourcedetectionprocessor#readme
[7]: https://github.com/DataDog/datadog-agent/tree/main/comp/otelcol/otlp/components/processor/infraattributesprocessor#readme
[8]: https://pkg.go.dev/go.opentelemetry.io/otel/sdk/resource#WithContainerID
[9]: /es/opentelemetry/config/hostname_tagging/#hostname-recommendations