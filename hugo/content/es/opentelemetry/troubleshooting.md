---
further_reading:
- link: https://opentelemetry.io/docs/collector/troubleshooting/
  tag: Sitio externo
  text: Solucionar problemas en OpenTelemetry
title: Solucionar problemas
---

Si ocurre un comportamiento inesperado al utilizar OpenTelemetry con Datadog, esta guía puede ayudarte a resolver el problema. Si sigues teniendo problemas, ponte en contacto con [Soporte técnico de Datadog][1] para obtener más ayuda.

## Nombres de hosts incorrectos o inesperados

Al utilizar OpenTelemetry con Datadog, puedes encontrarte con diversos problemas relacionados con el nombre del host. Las siguientes secciones cubren situaciones comunes y sus soluciones.

### Nombre de host y nombre de nodo diferentes en Kubernetes

**Síntoma**: Al desplegar en Kubernetes, el nombre del host informado por Datadog no coincide con el nombre del nodo esperado.

**Causa**: Esto es normalmente el resultado de la falta de etiquetas (tags) `k8s.node.name` (y opcionalmente `k8s.cluster.name`).

**Resolución**:

1. Configura el atributo `k8s.pod.ip` para el despliegue de tu aplicación: 

   ```yaml
   env:
     - name: MY_POD_IP
       valueFrom:
         fieldRef:
           apiVersion: v1
           fieldPath: status.podIP
     - name: OTEL_RESOURCE
       value: k8s.pod.ip=$(MY_POD_IP)
   ```

2. Habilita el procesador `k8sattributes` en tu Collector:

   ```yaml
   k8sattributes:
   [...]
   processors:
     - k8sattributes
   ```

Alternativamente, puedes sustituir el nombre del host utilizando el atributo `datadog.host.name`:

   ```yaml
   processors:
     transform:
       trace_statements:
         - context: resource
           statements:
             - set(attributes["datadog.host.name"], "${NODE_NAME}")
   ```

Para obtener más información sobre los atributos de identificación del host, consulta [Asignar convenciones semánticas de OpenTelemetry a los nombres de hosts][2].

### Nombres de hosts inesperados en el despliegue de AWS Fargate

**Síntoma**: En los entornos de AWS Fargate, se podrían informar trazas (traces) de un nombre del host incorrecto.

**Causa**: En los entornos de Fargate, la detección de recursos predeterminados puede no identificar correctamente los metadatos de ECS, lo que lleva a la asignación de un nombre del host incorrecto.

**Resolución**:

Configura el procesador `resourcedetection` en tu configuración de Collector y activa el detector `ecs`:

```yaml
processors:
  resourcedetection:
    detectors: [env, ecs]
    timeout: 2s
    override: false
```

### El recopilador de puerta de enlace no reenvía metadatos del host

**Síntoma**: En un despliegue de puerta de enlace, la telemetría de varios hosts parece venir de un único host o los metadatos del host no se están reenviando correctamente.

**Causa**: Esto ocurre cuando la configuración del recopilador de la puerta de enlace no conserva ni reenvía correctamente los atributos de metadatos del host de los recopiladores del Agent.

**Resolución**:

1. Configura los recopiladores del Agent para recopilar y reenviar los metadatos del host:

   ```yaml
   processors:
     resourcedetection:
       detectors: [system, env]
     k8sattributes:
       passthrough: true
   ```

2. Configura el recopilador de la puerta de enlace para extraer y reenviar los metadatos necesarios:

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

Para obtener más información, consulta [Asignar convenciones semánticas de OpenTelemetry a la información del host de la lista de infraestructura][3].

### El mismo host aparece varias veces con nombres diferentes

**Síntoma**: Un mismo host aparece con varios nombres en Datadog. Por ejemplo, podrías ver una entrada de OpenTelemetry Collector (con el logotipo de OTel) y otra del Datadog Agent .

**Causa**: Cuando un host se monitoriza a través de más de un método de ingesta (por ejemplo, OTLP + Datadog Agent o DogStatsD + OTLP) sin alinearse en un único atributo de recurso de nombre del host, Datadog trata cada ruta como un host separado.

**Resolución**:
1. Identifica todas las rutas de ingesta de telemetría activas que envían datos desde la misma máquina a Datadog.
2. Elige una única fuente de nombre del host y decide si deseas basarte en el nombre del host o en un atributo de recurso específico del Datadog Agent (por ejemplo, `k8s.node.name`).
3. Configura cada ruta (Agent, Collector, etc.) para que informen de un nombre del host coherente. Por ejemplo, si estás configurando el nombre del host con atributos de OTLP, configura tu procesador de transformación:
    ```yaml
    processors:
      transform:
        trace_statements:
          - context: resource
            statements:
              - set(attributes["datadog.host.name"], "shared-hostname")
    ```
4. Valida en Datadog (lista de infraestructura, mapa del host, etc.) para confirmar que el host aparece ahora con un único nombre.

## Retrasos de etiquetas (tags) del host tras el inicio

**Síntoma**: Puedes tener un retraso en las etiquetas (tags) del host que aparecen en tus datos de telemetría después de iniciar el Datadog Agent u OpenTelemetry Collector. Este retraso suele durar menos de 10 minutos, pero puede extenderse hasta 40-50 minutos en algunos casos.

**Causa**: Este retraso se produce porque el backend de Datadog debe procesar e indexar los metadatos del host antes de que las etiquetas (tags) puedan asociarse a los datos de telemetría.

**Resolución**:

Las etiquetas (tags) del host configuradas en el exportador de Datadog (`host_metadata::tags`) o en la sección `tags` del Datadog Agent no se aplican de inmediato a los datos de telemetría. Los etiquetas (tags) aparecen finalmente después de que el backend resuelve los metadatos del host.

Elige tu configuración para obtener instrucciones específicas:

{{< tabs >}}
{{% tab "Datadog Agent OTLP Ingestion" %}}

Configura `expected_tags_duration` en `datadog.yaml` para cubrir el vacío hasta que se resuelvan las etiquetas (tags) del host:

```yaml
expected_tags_duration: "15m"
```

Esta configuración añade las etiquetas (tags) esperadas a toda la telemetría durante el tiempo especificado (en este ejemplo, 15 minutos).

{{% /tab %}}

{{% tab "OpenTelemetry Collector" %}}

Utiliza el procesador `transform` para configurar tus etiquetas (tags) del host como atributos de OTLP. Por ejemplo, para añadir el entorno y etiquetas (tags) del equipo:

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

En este enfoque se combinan las convenciones semánticas de OpenTelemetry con las etiquetas (tags) específicas del host de Datadog para garantizar una funcionalidad correcta en entornos de OpenTelemetry y de Datadog.

{{% /tab %}}
{{< /tabs >}}

## No se puede asignar el atributo "equipo" a la etiqueta (tag) del equipo de Datadog

**Síntoma**: La etiqueta (tag) del equipo no aparece en los logs y trazas (traces) de Datadog, a pesar de estar configurada como atributo de recurso en las configuraciones de OpenTelemetry.

**Causa**: Esto ocurre porque los atributos de recursos de OpenTelemetry necesitan una asignación explícita al formato de etiqueta (tag) de Datadog mediante el uso del atributo `ddtags`.

**Resolución**:

Utiliza el procesador de transformación de OpenTelemetry Collector para asignar el atributo del recurso del equipo al atributo `ddtags`:

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

<div class="alert alert-info">Sustituye <code>resource.attributes["team"]</code> por el nombre real del atributo si es diferente en tu configuración (por ejemplo, <code>resource.attributes["arm.team.name"]</code>).</div>

Para verificar la configuración:

1. Reinicia el OpenTelemetry Collector para aplicar los cambios.
2. Genera logs y trazas (traces) de test.
3. Check si la etiqueta (tag) del equipo aparece en tus logs y trazas (traces) de Datadog.
4. Verifica que la etiqueta (tag) del equipo funcione como se esperaba en el filtrado y los dashboards.

## Las etiquetas (tags) de contenedores no aparecen en la página Contenedores

**Síntoma**: Las etiquetas (tags) de contenedores no aparecen en la página de Contenedores en Datadog, lo que afecta a las capacidades de monitorización y gestión de contenedores.

**Causa**: Esto ocurre cuando los atributos de los recursos de contenedores no se asignan correctamente al formato de metadatos de contenedores esperado de Datadog.

**Resolución**:

Cuando se utiliza la ingesta de OTLP en el Datadog Agent, es necesario configurar atributos de recursos específicos para garantizar una asociación adecuada de metadatos de contenedores. Para obtener más información, consulta [Asignación de atributos de recursos][4].

Para verificar la configuración:

1. Check los datos brutos de trazas (traces) para confirmar que los ID de contenedores y las etiquetas (tags) se traduzcan correctamente al formato de Datadog (por ejemplo, `container.id` debería convertirse en `container_id`).
2. Comprueba que los metadatos de contenedores aparezcan en la página Contenedores.

## Faltan métricas en el catálogo de software y dashboards

**Síntoma**: Las métricas no aparecen en el catálogo de software y dashboards, a pesar de haberse recopilado correctamente.

**Causa**: Esto ocurre normalmente debido a las convenciones semánticas incorrectas o mal asignadas.

**Resolución**:

Para verificar la configuración:

1. Check que tus métricas contengan las [convenciones semánticas][4] requeridas.
2. Verifica que los nombres de métricas cumplan con las convenciones de nomenclatura de OpenTelemetry.
3. Confirma que las métricas se estén traduciendo correctamente al formato de Datadog utilizando la [referencia de asignación de métricas][5].

<div class="alert alert-info">Cuando trabajes con convenciones semánticas, asegúrate de seguir la última especificación de nomenclatura y atributos de métricas de OpenTelemetry.</div>

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help/
[2]: /es/opentelemetry/schema_semantics/hostname/
[3]: /es/opentelemetry/schema_semantics/host_metadata/
[4]: /es/opentelemetry/schema_semantics/semantic_mapping/
[5]: /es/opentelemetry/schema_semantics/metrics_mapping/#metrics-mappings