---
further_reading:
- link: logs/log_collection
  tag: Documentación
  text: Recopile sus registros
- link: /infrastructure/process
  tag: Documentación
  text: Recopile sus procesos
- link: tracing
  tag: Documentación
  text: Recopile sus trazas
- link: extend/prometheus
  tag: Documentación
  text: Escriba su propia verificación personalizada de Prometheus
title: Recopilación de métricas de Prometheus y OpenMetrics desde un servidor
---
Recopile las métricas de Prometheus y OpenMetrics que expone su aplicación en sus hosts mediante el Datadog Agent y las Integrations [Datadog-OpenMetrics][1] o [Datadog-Prometheus][2].

## Descripción general {#overview}

A partir de la versión 6.5.0, el Agent incluye verificaciones de [OpenMetrics][3] y [Prometheus][4] capaces de extraer métricas de los puntos de conexión de Prometheus. Datadog recomienda utilizar la verificación de OpenMetrics, ya que es más eficiente y es totalmente compatible con el formato de texto de Prometheus. Para un uso más avanzado de la interfaz `OpenMetricsCheck`, incluida la creación de una verificación personalizada, consulte la sección [Developer Tools][5]. Utilice la verificación de Prometheus solo cuando el punto de conexión de métricas no admita un formato de texto.

Esta página explica el uso básico de estas verificaciones, lo que le permite importar a Datadog todas las métricas que expone mediante Prometheus.

## Configuración {#setup}

### Instalación {#installation}

[Instale el Datadog Agent para su sistema operativo correspondiente][6]. Las verificaciones de OpenMetrics y Prometheus están incluidas en el paquete del [Datadog Agent][7], por lo que no necesita instalar nada más en sus contenedores o hosts.

### Configuración {#configuration}

Para recopilar sus métricas expuestas:

1. Edite el archivo `openmetrics.d/conf.yaml` en la carpeta `conf.d/` en la raíz del [directorio de configuración del Agent][8]. Consulte el [archivo de ejemplo openmetrics.d/conf.yaml][9] para ver todas las opciones de configuración disponibles. Esta es la configuración mínima necesaria para habilitar la integración:

    ```yaml
    init_config:

    instances:
        - openmetrics_endpoint: 'localhost:<PORT>/<ENDPOINT>'
          namespace: '<NAMESPACE>'
          metrics:
              - '<METRIC_TO_FETCH>': '<DATADOG_METRIC_NAME>'
    ```

     With the following configuration placeholder values:

    | Placeholder             | Description                                                                                                                                                                                                            |
    | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `<PORT>`                | Port to connect to in order to access the Prometheus endpoint.                                                                                                                                                         |
    | `<ENDPOINT>`            | URL for the metrics served by the container, in Prometheus format.                                                                                                                                                     |
    | `<NAMESPACE>`           | Set namespace to be prefixed to every metric when viewed in Datadog.                                                                                                                                                   |
    | `<METRIC_TO_FETCH>`     | Prometheus metrics key to be fetched from the Prometheus endpoint.                                                                                                                                                     |
    | `<DATADOG_METRIC_NAME>` | Optional parameter which, if set, transforms the `<METRIC_TO_FETCH>` metric key to `<DATADOG_METRIC_NAME>` in Datadog. <br>If you choose not to use this option, pass a list of strings rather than `key:value` pairs. |

2. [Reinicie el Agent][10] para comenzar a recopilar sus métricas.

### Parámetros disponibles {#parameters-available}

A continuación encontrará la lista completa de parámetros que se pueden utilizar para su `instances`:

| Nombre                                    | Tipo                                    | Obligatoriedad | Valor predeterminado | Descripción                                                                                                                                                                                                                                                          |
| --------------------------------------- | --------------------------------------- | --------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `openmetrics_endpoint`                        | cadena                                  | obligatorio  | ninguno          | La URL que expone las métricas en el formato OpenMetrics.                                                                           |
| `namespace`                             | cadena                                  | obligatorio  | ninguno          | El espacio de nombres que se antepondrá a los espacios de nombres de todas las métricas. Sus métricas se recopilan con el formato `namespace.metric_name`.                                                                                                                                          |
| `metrics`                               | lista de cadenas o `key:value` elementos | requerido  | ninguno          | Lista de pares `<METRIC_TO_FETCH>: <NEW_METRIC_NAME>` para las métricas que se obtendrán del punto de conexión de Prometheus.<br> `<NEW_METRIC_NAME>` es opcional. Transforma el nombre en Datadog si se establece. Esta lista debe contener al menos una métrica.                            |
| `raw_metric_prefix`             | cadena                                  | opcional  | ninguno          | Un prefijo que se elimina de todos los nombres de métricas expuestos, si está presente.                                                                                                                 |
| `health_service_check`                  | booleano                                 | opcional  | true          | Envíe una comprobación de servicio que informe sobre el estado del punto de conexión de Prometheus. La comprobación se llama `<NAMESPACE>.prometheus.health`.                                                                                                                                         |
| `label_to_hostname`                     | cadena                                  | opcional  | ninguno          | Anule el nombre de host con el valor de una etiqueta.                                                                                                                                                                                                                   |
| `label_joins`                           | objeto                                  | opcional  | ninguno          | La unión de etiquetas le permite apuntar a una métrica y recuperar su etiqueta mediante una asignación 1:1.                                                                                                                                                                               |
| `labels_mapper`                         | lista de elementos clave:valor               | opcional  | ninguno          | El asignador de etiquetas le permite renombrar algunas etiquetas. Formato: `<LABEL_TO_RENAME>: <NEW_LABEL_NAME>`.                                                                                                                                                                    |
| `type_overrides`                        | lista de elementos clave:valor               | opcional  | ninguno          | La anulación de tipo permite anular un tipo en la carga útil de Prometheus o asignar un tipo a una métrica sin tipo (se ignoran de forma predeterminada).<br> Los `<METRIC_TYPE>` admitidos son `gauge`, `monotonic_count`, `histogram` y `summary`.                                             |
| `tags`                                  | lista de elementos clave:valor               | opcional  | ninguno          | Lista de etiquetas para adjuntar a cada métrica, evento y comprobación de servicio emitidos por esta integración.<br> [Obtenga más información sobre etiquetar][5].                                                                                                                                     |
| `send_distribution_buckets`             | booleano                                 | opcional  | false         | Establezca `send_distribution_buckets` en `true` para enviar y convertir histogramas de OpenMetrics a [Métricas de distribución][15]. <br>`collect_histogram_buckets` debe establecerse en `true` (valor predeterminado).<br> **Nota**: Para OpenMetrics v2, use `collect_counters_with_distributions` en su lugar.                                                                              |
| `send_distribution_counts_as_monotonic` | booleano                                 | opcional  | false         | Establezca `send_distribution_counts_as_monotonic` en `true` para enviar conteos de histograma/resumen de OpenMetrics como conteos monotónicos.                                                                                                                                              |
| `collect_histogram_buckets`               | booleano                                 | opcional  | true          | Establezca `collect_histogram_buckets` en `true` para enviar el bucket de histogramas.                                                                                                                                                                                               |
| `send_monotonic_counter`                | booleano                                 | opcional  | true          | Para enviar los conteos como conteos monotónicos, consulte el [problema relevante en GitHub][9].                                                                                                                                                                                             |
| `exclude_labels`                        | lista de cadenas                          | opcional  | ninguno          | Lista de etiquetas a excluir.                                                                                                                                                                                                                                       |
| `ssl_cert`                              | cadena                                  | opcional  | ninguno          | Si su punto de conexión de Prometheus está protegido, aquí están los ajustes para configurarlo:<br> Puede ser: solo la ruta al certificado y, por lo tanto, debe especificar la clave privada, o puede ser la ruta a un archivo que contenga tanto el certificado como la clave privada. |
| `ssl_private_key`                       | cadena                                  | opcional  | ninguno          | Necesario si el certificado no incluye la clave privada.<br> **ADVERTENCIA**: La clave privada de su certificado local debe estar sin cifrar.                                                                                                                          |
| `ssl_ca_cert`                           | cadena                                  | opcional  | ninguno          | La ruta a la CA de confianza utilizada para generar certificados personalizados.                                                                                                                                                                                                  |
| `timeout`                               | entero                                 | opcional  | 10            | Establezca un tiempo de espera en segundos para la consulta de Prometheus/OpenMetrics.                                                                                                                                                                                                       |
| `max_returned_metrics`                  | entero                                  | opcional  | 2000          | La verificación se limita a 2000 métricas de forma predeterminada. Aumente este límite si es necesario.                                                                                                                                                                                   |
| `bearer_token_auth`                     | booleano                                 | opcional  | false         | Establezca `bearer_token_auth` en `true` para agregar un encabezado de autenticación de token de portador. **Nota**: Si `bearer_token_path` no está configurado, `/var/run/secrets/kubernetes.io/serviceaccount/token` se utiliza como ruta predeterminada.                                                       |
| `bearer_token_path`                     | cadena                                  | opcional  | ninguno          | La ruta a un archivo de token de portador de cuenta de servicio de Kubernetes (asegúrese de que el archivo exista y esté montado correctamente). **Nota**: Establezca `bearer_token_auth` en `true` para habilitar la adición del token a los encabezados HTTP para la autenticación.                                          |
| `collect_counters_with_distributions`   | boolean                                 | opcional  | false         | Si también se deben recopilar las métricas del contador de observaciones que terminan en `.sum` y `.count` al enviar los buckets del histograma como métricas de distribución de Datadog. Esto habilita implícitamente la opción `histogram_buckets_as_distributions`. |

**Nota**: Todos los parámetros, excepto `send_distribution_buckets` y `send_distribution_counts_as_monotonic`, son compatibles tanto con la verificación de OpenMetrics como con la verificación de Prometheus.

## Primeros pasos {#getting-started}

### Recopilación simple de métricas {#simple-metric-collection}

Para comenzar a recopilar métricas expuestas por Prometheus, siga estos pasos:

1. Siga la documentación de [Prometheus Getting Started][11] para iniciar una versión local de Prometheus que se monitoree a sí misma.

2. [Instale el Datadog Agent para su plataforma][6].

3. Edite el archivo `openmetrics.d/conf.yaml` en la carpeta `conf.d/` en la raíz de su [directorio de configuración del Agent][8] con el siguiente contenido:

    ```yaml
    init_config:

    instances:
        - openmetrics_endpoint: http://localhost:9090/metrics
          namespace: 'documentation_example'
          metrics:
              - promhttp_metric_handler_requests_total: prometheus.handler.requests.total
    ```

4. [Reinicie el Agent][12].

5. Vaya a su [página de Metrics Catalog][13] para ver las métricas recopiladas: `prometheus_target_interval_length_seconds*`

    {{< img src="integrations/guide/prometheus_host/prometheus_collected_metric_host.png" alt="Métrica de Prometheus recopilada">}}

## De integración personalizada a oficial {#from-custom-to-official-integration}

De forma predeterminada, todas las métricas recuperadas por la verificación genérica de Prometheus se consideran Custom Metrics. Si está monitoreando software listo para usar y cree que merece una integración oficial, ¡no dude en [contribuir][5]!

Las integraciones oficiales tienen sus propios directorios dedicados. Existe un mecanismo de instancia predeterminado en la verificación genérica para codificar de forma rígida la configuración predeterminada y los metadatos de las métricas. Por ejemplo, consulte la integración [kube-proxy][14].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/openmetrics/
[2]: /es/integrations/prometheus/
[3]: https://github.com/DataDog/integrations-core/tree/master/openmetrics
[4]: https://github.com/DataDog/integrations-core/tree/master/prometheus
[5]: /es/extend/custom_checks/prometheus/
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: /es/getting_started/tagging/
[8]: /es/agent/guide/agent-configuration-files/#agent-configuration-directory
[9]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[10]: /es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: https://prometheus.io/docs/prometheus/latest/getting_started/
[12]: /es/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[13]: https://app.datadoghq.com/metric/catalog
[14]: https://github.com/DataDog/integrations-core/tree/master/kube_proxy
[15]: /es/metrics/distributions/