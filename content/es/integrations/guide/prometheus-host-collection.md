---
further_reading:
- link: recopilación_logs/log
  tag: Documentación
  text: Recopilación de logs
- link: /infrastructure/process
  tag: Documentación
  text: Recopilación de procesos
- link: rastreo
  tag: Documentación
  text: Recopilar trazas
- link: developers/prometheus
  tag: Documentación
  text: Escritura de tu propio check personalizado de Prometheus
title: Recopilación de métricas de Prometheus y OpenMetrics de un host
---

Recopila tus métricas de Prometheus y OpenMetrics expuestas desde la aplicación que se ejecuta en tus hosts, utilizando el Datadog Agent e integraciones [Datadog-OpenMetrics][1] o [Datadog-Prometheus][2].

## Información general

A partir de la versión 6.5.0, el Agent incluye checks de [OpenMetrics][3] y [Prometheus][4] capaces de extraer los endpoints de Prometheus. Datadog recomienda usar el check de OpenMetrics, ya que es más eficiente y es compatible con el formato de texto de Prometheus. Consulta usos más avanzados de la interfaz de `OpenMetricsCheck`, incluido cómo escribir un check personalizado, en la sección de [Herramientas de desarrollo][5]. Usa el check de Prometheus solo cuando el endpoint de las métricas no sea compatible con un formato de texto.

Esta página explica el uso básico de estos checks, que permiten importar todas tus métricas expuestas de Prometheus en Datadog.

## Configuración

### Instalación

[Instala el Datadog Agent para tu sistema operativo correspondiente][6]. Los checks de OpenMetrics y Prometheus están incluidos en el paquete del [Datadog Agent][7], por lo que no necesitas instalar nada más en tus contenedores o hosts.

### Configuración

Para recopilar tus métricas expuestas:

1. Edita el archivo `openmetrics.d/conf.yaml` en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][8]. Para ver todas las opciones de configuración disponibles, consulta el [openmetrics.d/conf.yaml de ejemplo][9]. Esta es la configuración mínima requerida, necesaria para habilitar la integración:

    ```yaml
    init_config:

    instances:
        - openmetrics_endpoint: 'localhost:<PORT>/<ENDPOINT>'
          namespace: '<NAMESPACE>'
          metrics:
              - '<METRIC_TO_FETCH>': '<DATADOG_METRIC_NAME>'
    ```

   Con los siguientes valores de parámetros de configuración:

   | Parámetro                | Descripción                                                              |
    | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `<PORT>`                | Puerto al que conectarse para acceder al endpoint de Prometheus.                                                                                                                                                         |
    | `<ENDPOINT>`             | URL para las métricas proporcionadas por el contenedor, en formato Prometheus.                                                                                                                                                     |
    | `<NAMESPACE>`            | Configura el espacio de nombres para que se anteponga a cada métrica cuando se visualice en Datadog.                                                                                                                                                   |
    | `<METRIC_TO_FETCH>`      | Métricas clave de Prometheus a recuperar del endpoint de Prometheus.                                                                                                                                                     |
    | `<DATADOG_METRIC_NAME>` | Parámetro opcional que, si se configura, transforma la métrica clave `<METRIC_TO_FETCH>` en `<DATADOG_METRIC_NAME>` en Datadog. <br>Si decides no utilizar esta opción, pasa una lista de cadenas, en lugar de pares `key:value`. |

2. [Reinicia el Agent][10] para empezar a recopilar tus métricas.

### Parámetros disponibles

A continuación, encontrarás una lista con todos los parámetros que se pueden utilizar en tus`instances`:

| Nombre                                    | Tipo                                    | Necesidad | Valor por defecto | Descripción                                                                                                                                                                                                                                                          |
| --------------------------------------- | --------------------------------------- | --------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `openmetrics_endpoint`                        | cadena                                  | obligatorio  | ninguno          | La URL que expone métricas en el formato OpenMetrics.                                                                           |
| `namespace`                             | cadena                                  | obligatorio  | ninguno          | El espacio de nombres que debe añadirse antes de los espacios de nombres de todas las métricas. Tus métricas se recopilan con el formato `namespace.metric_name`.                                                                                                                                          |
| `metrics`                               | Lista de cadenas o elementos `key:value`  | obligatorio  | ninguno          | Lista de pares `<METRIC_TO_FETCH>: <NEW_METRIC_NAME>` para las métricas que se obtendrán del endpoint de Prometheus.<br> `<NEW_METRIC_NAME>` es opcional. Si se configura, transforma el nombre en Datadog. Esta lista debe contener al menos una métrica.                            |
| `raw_metric_prefix`             | cadena                                  | opcional  | ninguno          | Prefijo que se elimina de los nombres de todas las métricas expuestas, si están presentes.                                                                                                                 |
| `health_service_check`                  | booleano                                 | opcional  | verdadero          | Envía un check de servicio que informe sobre el estado del endpoint de Prometheus. El check se denomina `<NAMESPACE>.prometheus.health`.                                                                                                                                         |
| `label_to_hostname`                     | cadena                                  | opcional  | ninguno          | Sobrescribe el nombre de host con el valor de una etiqueta (label).                                                                                                                                                                                                                   |
| `label_joins`                           | objecto                                  | opcional  | ninguno          | La unión de etiquetas (labels) permite apuntar a una métrica y recuperar su etiqueta mediante una asignación 1:1.                                                                                                                                                                               |
| `labels_mapper`                         | Lista del elemento clave:valor               | opcional  | ninguno          | El asignador de etiquetas (labels) permite renombrar algunas de ellas. Formato: `<LABEL_TO_RENAME>: <NEW_LABEL_NAME>`.                                                                                                                                                                    |
| `type_overrides`                        | Lista del elemento clave:valor               | opcional  | ninguno          | La sobrescritura del tipo te permite anular un tipo en la carga útil de Prometheus o escribir una métrica que no esté escrita (se ignoran por defecto).<br> Los tipos `<METRIC_TYPE>` admitidos son `gauge`, `monotonic_count`, `histogram` y `summary`.                                             |
| `tags`                                  | Lista del elemento clave:valor               | opcional  | ninguno          | Lista de etiquetas (tags) para adjuntar a cada métrica, evento, y check de servicio emitido por esta integración.<br> [Más información sobre el etiquetado][5].                                                                                                                                     |
| `send_distribution_buckets`             | booleano                                 | opcional  | falso         | Configura `send_distribution_buckets` como `true` para enviar y convertir los histogramas de OpenMetrics en [métricas de distribución][15]. <br>Los `collect_histogram_buckets` deben configurarse como `true` (valor por defecto).<br> **Nota**: Para OpenMetrics v2, utiliza `collect_counters_with_distributions`                                                                              |
| `send_distribution_counts_as_monotonic` | booleano                                 | opcional  | falso         | Configura `send_distribution_counts_as_monotonic` como `true` para enviar recuentos de histograma/resumen de OpenMetrics como recuentos monotónicos.                                                                                                                                              |
| `collect_histogram_buckets`               | booleano                                 | opcional  | verdadero          | Configura `collect_histogram_buckets` como `true` para enviar el bucket del histograma.                                                                                                                                                                                               |
| `send_monotonic_counter`                | booleano                                 | opcional  | verdadero          | O envía recuentos como recuentos monotónicos. Para ello, consulta el [tema relevante en GitHub][9].                                                                                                                                                                                             |
| `exclude_labels`                        | lista de cadenas                          | opcional  | ninguno          | Lista de etiquetas (labels) que deben excluirse.                                                                                                                                                                                                                                       |
| `ssl_cert`                              | cadena                                  | opcional  | ninguno          | Si tu endpoint de Prometheus está protegido, aquí tienes los parámetros para configurarlo:<br> Puede ser: sólo la ruta al certificado, y en tal caso debes especificar la clave privada, o puede ser la ruta a un archivo que contenga tanto el certificado como la clave privada. |
| `ssl_private_key`                       | cadena                                  | opcional  | ninguno          | Necesario si el certificado no incluye la clave privada.<br> **ADVERTENCIA**: La clave privada de tu certificado local no debe estar cifrada.                                                                                                                          |
| `ssl_ca_cert`                           | cadena                                  | opcional  | ninguno          | La ruta a la autoridad de certificación (CA) de confianza, utilizada para generar certificados personalizados.                                                                                                                                                                                                  |
| `timeout`                               | entero                                 | opcional  | 10            | Define un tiempo de espera en segundos para la consulta de Prometheus/OpenMetrics.                                                                                                                                                                                                       |
| `max_returned_metrics`                  | entero                                 | opcional  | 2000          | Por defecto, el check se limita a 2000 métricas. Aumenta este límite, si es necesario.                                                                                                                                                                                   |
| `bearer_token_auth`                     | booleano                                 | opcional  | falso         | Configura `bearer_token_auth` como `true` para añadir una cabecera de autenticación de token de portador. **Nota**: Si no se configura `bearer_token_path`, se utiliza `/var/run/secrets/kubernetes.io/serviceaccount/token` como ruta por defecto.                                                       |
| `bearer_token_path`                     | cadena                                  | opcional  | ninguno          | La ruta a un archivo de token de portador de cuenta de servicio de Kubernetes (asegúrate de que el archivo existe y está montado correctamente). **Nota**: Configura `bearer_token_auth` como `true` para habilitar la adición del token a las cabeceras HTTP para la autenticación.                                          |
| `collect_counters_with_distributions`   | booleano                                 | opcional  | falso         | Si además se recopilan o no las métricas del contador de observaciones que terminan en `.sum` y `.count` al enviar buckets de histogramas como métricas de distribución de Datadog. Esto habilita implícitamente la opción `histogram_buckets_as_distributions`. |

**Nota**: Todos los parámetros, excepto `send_distribution_buckets` y `send_distribution_counts_as_monotonic`, son compatibles con el check de OpenMetrics y también con el check de Prometheus.

## Para empezar

### Recopilación sencilla de métrica

Para empezar a recopilar métricas expuestas por Prometheus, sigue estos pasos:

1. Para iniciar una versión local de Prometheus que se monitorice a sí misma, consulta la documentación [Empezando con Prometheus][11].

2. [Instala el Datadog Agent para tu plataforma][6].

3. Edita el archivo `openmetrics.d/conf.yaml` en la carpeta `conf.d/` en la raíz del [directorio de configuración del Agent][8] con el siguiente contenido:

    ```yaml
    init_config:

    instances:
        - openmetrics_endpoint: http://localhost:9090/metrics
          namespace: 'documentation_example'
          metrics:
              - promhttp_metric_handler_requests_total: prometheus.handler.requests.total
    ```

4. [Reinicia el Agent][12].

5. Ve a tu [página de resumen de métricas][13] para ver las métricas recopiladas: `prometheus_target_interval_length_seconds*`

    {{< img src="integrations/guide/prometheus_host/prometheus_collected_metric_host.png" alt="Métricas de Prometheus recopiladas">}}

## De la integración personalizada a la oficial

Por defecto, todas las métricas recuperadas por el check genérico de Prometheus se consideran métricas personalizadas. Si estás monitorizando software comercial y crees que merece tener una integración oficial, no dudes en [contribuir][5].

Las integraciones oficiales tienen sus propios directorios específicos. Hay un mecanismo de instancia por defecto en el check genérico para codificar la configuración predeterminada y los metadatos de métricas. Por ejemplo, consulta la integración [kube-proxy][14].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/integrations/openmetrics/
[2]: /es/integrations/prometheus/
[3]: https://github.com/DataDog/integrations-core/tree/master/openmetrics
[4]: https://github.com/DataDog/integrations-core/tree/master/prometheus
[5]: /es/developers/custom_checks/prometheus/
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: /es/getting_started/tagging/
[8]: /es/agent/guide/agent-configuration-files/#agent-configuration-directory
[9]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[10]: /es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: https://prometheus.io/docs/prometheus/latest/getting_started/
[12]: /es/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[13]: https://app.datadoghq.com/metric/summary
[14]: https://github.com/DataDog/integrations-core/tree/master/kube_proxy
[15]: /es/metrics/distributions/