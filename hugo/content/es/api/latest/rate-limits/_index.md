---
title: Límites de tasa
type: api
---
{{< h2-with-copy-btn >}}Límites de tasa{{< /h2-with-copy-btn >}}

Muchos puntos de conexión de la API tienen límites de tasa. Una vez que excede una cierta cantidad de solicitudes en un período específico, Datadog devuelve un error.

Si se le aplica un límite de tasa, puede ver un 429 en el código de respuesta. Puede esperar el tiempo designado por el `X-RateLimit-Period` antes de realizar llamadas nuevamente, o cambiar a realizar llamadas a una frecuencia ligeramente mayor que el `X-RateLimit-Limit` o `X-RateLimit-Period`.

Los límites de tasa pueden aumentarse desde los valores predeterminados [contactando al equipo de soporte de Datadog][1].

Con respecto a la política de límite de tasa de la API:

- Datadog **no aplica límites de tasa** en el envío de puntos de datos/métricas (consulte la [sección de métricas][2] para obtener más información sobre cómo se maneja la tasa de envío de métricas). Los límites encontrados dependen de la cantidad de [métricas personalizadas][3] según su acuerdo.
- La API para enviar logs no tiene límites de tasa.
- El límite de tasa para el envío de eventos es de `250,000` eventos por minuto por organización.
- Los límites de tasa para los puntos de conexión varían y se incluyen en los encabezados detallados a continuación. Estos pueden extenderse bajo demanda.

<div class="alert alert-danger">
La lista anterior no es exhaustiva de todos los límites de tasa en las Datadog API. Si está experimentando una limitación de tasa, comuníquese con <a href="https://www.datadoghq.com/support/">soporte</a> para obtener más información sobre las API que está utilizando y sus límites.</div>

| Encabezados de límite de tasa      | Descripción                                              |
| ----------------------- | -------------------------------------------------------- |
| `X-RateLimit-Limit`     | número de solicitudes permitidas en un período de tiempo.             |
| `X-RateLimit-Period`    | duración del tiempo en segundos para los restablecimientos (alineado al calendario). |
| `X-RateLimit-Remaining` | número de solicitudes permitidas restantes en el período de tiempo actual.  |
| `X-RateLimit-Reset`     | tiempo en segundos hasta el próximo restablecimiento.                        |
| `X-RateLimit-Name`      | nombre del límite de tasa para solicitudes de aumento.            |

### Métricas de uso de Datadog API {#datadog-api-usage-metrics}

Todas las Datadog API tienen un límite de uso para un período de tiempo determinado. Las API pueden tener depósitos de límites de tasa únicos y distintos o agruparse en un solo depósito según el recurso o los recursos que se utilicen. Por ejemplo, la API de estado del monitor tiene un límite de tasa que permite a un humano o a un script de automatización realizar consultas solo una cantidad determinada de veces por minuto. El punto de conexión rechaza las solicitudes en exceso con un código de respuesta 429 y una sugerencia de esperar hasta que haya expirado un período de restablecimiento. Las métricas de uso de la API permiten a los usuarios de Datadog autoservirse y auditar el consumo del límite de tasa de la API para los puntos de conexión (excluyendo los puntos de conexión de envío de métricas, registros y eventos). Utilice el siguiente tablero, las métricas y las etiquetas para ver las solicitudes permitidas y bloqueadas.

Consulte el [tablero de visibilidad del límite de tasa de la Datadog API][5] para obtener una vista preconfigurada de estas métricas. Seleccione su sitio de Datadog en el selector de sitios de esta página antes de abrir el tablero.

#### Métricas de visibilidad del límite de tasa {#rate-limit-visibility-metrics}

Las métricas de visibilidad del límite de tasa utilizan el espacio de nombres `datadog.apis.rate_limit.usage.*`. El nombre de la métrica identifica el contexto del límite de tasa configurado:

| Contexto | Solicitudes permitidas | Solicitudes bloqueadas | Utilización |
|-------|------------------|------------------|-------------|
| Organización | `datadog.apis.rate_limit.usage.per_org_count` | `datadog.apis.rate_limit.usage.per_org_blocked_count` | `datadog.apis.rate_limit.usage.per_org_pct` |
| Usuario | `datadog.apis.rate_limit.usage.per_user_count` | `datadog.apis.rate_limit.usage.per_user_blocked_count` | `datadog.apis.rate_limit.usage.per_user_pct` |
| Clave de API | `datadog.apis.rate_limit.usage.per_api_key_count` | `datadog.apis.rate_limit.usage.per_api_key_blocked_count` | `datadog.apis.rate_limit.usage.per_api_key_pct` |

Las métricas de solicitudes permitidas cuentan las solicitudes que la API permitió. Las métricas de solicitudes bloqueadas cuentan las solicitudes que la API rechazó porque excedieron un límite de tasa. Las métricas `*_pct` informan el total de solicitudes intentadas (permitidas más bloqueadas) como un porcentaje del límite configurado, donde `100` representa la utilización completa. Los valores superiores a `100` indican que las solicitudes fueron bloqueadas porque se excedió el límite.

Para los widgets del tablero, utilice un resumen `sum(60s)` a nivel de minuto para las métricas de solicitudes permitidas y solicitudes bloqueadas para mostrar las solicitudes por minuto. Utilice el valor `*_pct` máximo para el intervalo para mostrar la utilización máxima. Envuelva cada término en `default_zero()` al combinar métricas con `+`, como se muestra en los ejemplos de consulta a continuación.

Los siguientes gauges informan el límite de solicitudes configurado para cada nombre de límite de tasa. El nombre de la métrica identifica el contexto:

| Contexto | Límite de solicitudes configurado |
|-------|--------------------------|
| Organización | `datadog.apis.rate_limit.usage.per_org_limit_count` |
| Usuario | `datadog.apis.rate_limit.usage.per_user_limit_count` |
| Clave de API | `datadog.apis.rate_limit.usage.per_api_key_limit_count` |

##### Etiquetas disponibles {#available-tags}

| Nombre de la etiqueta | Descripción | Disponibilidad |
|----------|-------------|--------------|
| `app_key_id` | ID de clave de aplicación asociado con la solicitud. La etiqueta está presente con un valor vacío cuando la solicitud no utiliza una clave de aplicación. | Métricas de recuento, recuento bloqueado y utilización |
| `child_org_name` | Nombre para visualizar de la organización secundaria representada por una métrica copiada. | Todas las métricas con `org_scope:child_org` |
| `limit_name` | Nombre del límite de tasa. Diferentes puntos de conexión pueden compartir el mismo nombre. | Todas las métricas |
| `org_scope` | Relación entre la métrica y la organización que la visualiza: `current_org` para el propio tráfico de esa organización o `child_org` para una copia de la organización secundaria visible desde su organización raíz. | Todas las métricas |
| `user_uuid` | UUID del usuario asociado con la solicitud. | Métricas de recuento, recuento bloqueado y utilización |

Cuando visualice métricas de una organización secundaria, sus propias métricas usarán `org_scope:current_org`. El valor `org_scope:child_org` y la etiqueta `child_org_name` aparecen solo en las copias adicionales enviadas a la organización raíz.

##### Ejemplos de consulta {#query-examples}

Solicitudes permitidas por nombre de límite de tasa
: Grafique la suma de las tres métricas `*_count` por `limit_name`.<br /><br />
  **Ejemplo:** `default_zero(sum:datadog.apis.rate_limit.usage.per_org_count{*} by {limit_name}) + default_zero(sum:datadog.apis.rate_limit.usage.per_user_count{*} by {limit_name}) + default_zero(sum:datadog.apis.rate_limit.usage.per_api_key_count{*} by {limit_name})`

Solicitudes bloqueadas por nombre de límite de tasa
: Grafique la suma de las tres métricas `*_blocked_count` por `limit_name`.<br /><br />
  **Ejemplo:** `default_zero(sum:datadog.apis.rate_limit.usage.per_org_blocked_count{*} by {limit_name}) + default_zero(sum:datadog.apis.rate_limit.usage.per_user_blocked_count{*} by {limit_name}) + default_zero(sum:datadog.apis.rate_limit.usage.per_api_key_blocked_count{*} by {limit_name})`

#### Migrar desde métricas de uso heredadas {#migrate-from-legacy-usage-metrics}

Las métricas `datadog.apis.rate_limit.usage.*` reemplazan a las métricas `datadog.apis.usage.*`. Actualice los tableros y monitors con los siguientes reemplazos. Las consultas sobre las métricas heredadas `datadog.apis.usage.*` que no estaban filtradas por `rate_limit_status` contaban las solicitudes permitidas y bloqueadas juntas; para preservar ese total, agregue la métrica `*_blocked_count` correspondiente junto con el reemplazo `*_count`.

| Métrica heredada | Métrica de reemplazo |
|---------------|--------------------|
| `datadog.apis.usage.per_org` | `datadog.apis.rate_limit.usage.per_org_count` |
| `datadog.apis.usage.per_org_ratio` | `datadog.apis.rate_limit.usage.per_org_pct` |
| `datadog.apis.usage.per_user` | `datadog.apis.rate_limit.usage.per_user_count` |
| `datadog.apis.usage.per_user_ratio` | `datadog.apis.rate_limit.usage.per_user_pct` |
| `datadog.apis.usage.per_api_key` | `datadog.apis.rate_limit.usage.per_api_key_count` |
| `datadog.apis.usage.per_api_key_ratio` | `datadog.apis.rate_limit.usage.per_api_key_pct` |

Las métricas de reemplazo difieren de las métricas heredadas de las siguientes maneras:

- Las solicitudes permitidas y bloqueadas utilizan métricas separadas en lugar de la etiqueta `rate_limit_status`. Reemplace los filtros de estado heredados con la métrica de solicitud permitida o de solicitud bloqueada correspondiente. Las métricas de utilización combinan las solicitudes permitidas y bloqueadas.
- Las etiquetas `org_scope` y `child_org_name` reemplazan a la etiqueta heredada `child_org`. Desde la organización raíz, filtre por `org_scope:child_org` y utilice `child_org_name` para filtrar o agrupar por el nombre para visualizar del hijo. Utilice `org_scope:current_org` para el tráfico propio de la organización que realiza la visualización.
- Las etiquetas `limit_count` y `limit_period` no están incluidas. Utilice el gauge `*_limit_count` correspondiente para el límite de solicitudes configurado. Lea el período de límite de tasa del encabezado de respuesta `X-RateLimit-Period`.

### Aumente su límite de tasa {#increase-your-rate-limit}
Puede solicitar límites de tasa aumentados creando un ticket de soporte con los detalles a continuación en **Ayuda** > **Nuevo ticket de soporte**. Tras recibir un aumento del límite de tasa, nuestro equipo de ingeniería de soporte revisa la solicitud caso por caso y, de ser necesario, trabaja con recursos de ingeniería internos para confirmar la viabilidad de la solicitud de aumento del límite de tasa.

    Title:
        Request to increase rate limit on endpoint: X

    Details:
        We would like to request a rate limit increase for API endpoint: X
        Example use cases/queries:
            Example API call as cURL or as URL with example payload

        Motivation for increasing rate limit:
            Example - Our organization uses this endpoint to right size a container before we deploy. This deployment takes place every X hours or up to Y times per day.

        Desired target rate limit:
            Tip - Having a specific limit increase or percentage increase in mind helps Support Engineering expedite the request to internal Engineering teams for review.

Después de que Datadog Support revisa y aprueba el caso de uso, pueden aplicar el aumento del límite de tasa internamente. Tenga en cuenta que existe un máximo para cuánto se puede aumentar un límite de tasa debido a la naturaleza SaaS de Datadog. El soporte de Datadog se reserva el derecho de rechazar aumentos de límites de tasa según los casos de uso y las recomendaciones de ingeniería.

### Registros de auditoría {#audit-logs}
El límite de API y las métricas de uso proporcionan información sobre los patrones de uso y las solicitudes bloqueadas. Si necesita detalles adicionales, Audit Trail ofrece una visibilidad más granular de la actividad de la API.

Con Audit Trail, puede visualizar datos como:
* **Dirección IP y geolocalización** – Identifique el origen de las solicitudes de API.
* **Tipo de actor** – Distinga entre cuentas de servicio y cuentas de usuario.
* **Autenticación de clave de API frente a clave de aplicación** – Visualice si las solicitudes se realizaron a través de una clave de API o directamente por un usuario.
* **Eventos correlacionados** – Visualice otros eventos que ocurren al mismo tiempo, como cambios de configuración o acciones relacionadas con la seguridad.

Audit Trail puede ayudar a los equipos a solucionar problemas de límites de tasa al proporcionar más contexto sobre el consumo de API y las solicitudes bloqueadas. También permite el seguimiento del uso de la API en toda la organización para fines de seguridad y cumplimiento.

Para obtener una visibilidad más detallada de la actividad de la API, considere usar **[Audit Trail][4]**.


[1]: /es/help/
[2]: /es/api/v1/metrics/
[3]: /es/metrics/custom_metrics/
[4]: /es/account_management/audit_trail/events/
[5]: https://app.datadoghq.com/dash/integration/datadog_api_rate_limit_visibility