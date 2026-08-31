---
title: Límites de tasa
type: api
---

{{< h2 >}}Límites de tasa{{< /h2 >}}

Muchos endpoints de la API tienen un límite de tasa. Una vez que se supera un determinado número de solicitudes en un periodo específico, Datadog devuelve un error.

Si tienes una tasa limitada, puedes ver un 429 en el código de respuesta. Puedes esperar el tiempo designado por `X-RateLimit-Period` antes de volver a realizar llamadas, o pasar a realizar llamadas a una frecuencia ligeramente mayor que `X-RateLimit-Limit` o `X-RateLimit-Period`.

Puedes aumentar los límites de tasa a partir de los valores predeterminados [poniéndote en contacto con el equipo de soporte de Datadog][1].

En cuanto a la política de límite de tasa de API:

- Datadog **no limita la tasa** de envío de puntos de datos/métricas (consulta la [sección de métricas][2] para más información sobre cómo se gestiona la tasa de envío de métricas). El cruce de límites depende de la cantidad de [métricas personalizadas][3] según tu acuerdo.
- La API para el envío de logs no tiene un límite de tasa.
- El límite de tasa de envío es de `250,000` eventos por minuto y organización.
- Los límites de tasa para los endpoints varían y se incluyen en los encabezados que se detallan a continuación. Estos pueden ampliarse bajo demanda.

<div class="alert alert-danger">
La lista anterior no incluye todos los límites de velocidad de las APIs de Datadog. Si experimentas limitaciones de velocidad, ponte en contacto con <a href="https://www.datadoghq.com/support/">el servicio de asistencia</a> para obtener más información sobre las APIs que utilizas y sus límites.</div>

| Cabeceras de límites de tasa      | Descripción                                              |
| ----------------------- | -------------------------------------------------------- |
| `X-RateLimit-Limit`     | Número de solicitudes permitidas en un periodo.             |
| `X-RateLimit-Period`    | Duración en segundos de los reinicios (alineados con el calendario). |
| `X-RateLimit-Remaining` | Número de solicitudes permitidas que quedan en el periodo actual.  |
| `X-RateLimit-Reset`     | Tiempo en segundos hasta el próximo reinicio.                        |
| `X-RateLimit-Name`      | Nombre del límite de tasa para solicitudes de aumento.            |

### Métricas de uso de API Datadog

Todas las API de Datadog tienen un límite de uso durante un periodo de tiempo determinado. Las API pueden tener buckets de límite de tasa únicos y distintos o agruparse en un único bucket en función de los recursos que se utilicen. Por ejemplo, la API de estado del monitor tiene un límite de tasa que permite a un humano o a un script de automatización realizar consultas sólo una cantidad determinada de veces por minuto. El endpoint rechaza el exceso de solicitudes mediante un código de respuesta 429 y una sugerencia para que se detenga hasta que transcurra un periodo de recuperación. Las métricas de uso de API permiten a los usuarios de Datadog realizar el autoservicio y auditar el consumo del límite de tasa de API de los endpoints de la API (excluyendo los endpoints de envío de métricas, logs y eventos). Estas métricas proporcionan una imagen de las solicitudes permitidas y bloqueadas, y se proporcionan con las siguientes dimensiones y etiquetas (tags) disponibles:

{{% site-region region="us" %}}[Dashboard del uso del límite de tasa de la API Datadog](https://app.datadoghq.com/dash/integration/31668/datadog-api-rate-limit-usage){{% /site-region %}}
{{% site-region region="eu1" %}}[Dashboard del uso del límite de tasa de la API Datadog](https://app.datadoghq.eu/dash/integration/1386/datadog-api-rate-limit-usage){{% /site-region %}}
{{% site-region region="us3" %}}[Dashboard del uso del límite de tasa de la API Datadog](https://us3.datadoghq.com/dash/integration/2248/datadog-api-rate-limit-usage){{% /site-region %}}
{{% site-region region="us5" %}}[Dashboard del uso del límite de tasa de la API Datadog](https://us5.datadoghq.com/dash/integration/1421/datadog-api-rate-limit-usage){{% /site-region %}}
{{% site-region region="ap1" %}}[Dashboard del uso del límite de tasa de la API Datadog](https://ap1.datadoghq.com/dash/integration/2698/datadog-api-rate-limit-usage){{% /site-region %}}
{{% site-region region="gov" %}}[Dashboard del uso del límite de tasa de la API Datadog](https://app.ddog-gov.com/dash/integration/1330/datadog-api-rate-limit-usage){{% /site-region %}}

#### Métricas disponibles

<table>
  <thead>
    <th>Dimensión</th>
    <th>Métrica de uso</th>
    <th>Descripción</th>
    <th>Etiquetas disponibles</th>
  </thead>
  <tr>
    <td rowspan="2"><strong>Organización</strong></td>
    <td><code>datadog.apis.usage.per_org</code></td>
    <td>Límite de tasa en toda la organización del número de solicitudes de API realizadas a un endpoint específico</td>
    <td>
    <ul>
      <li><code>app_key_id</code></li>
      <li><code>child_org</code> (sólo en la principal)</li>
      <li><code>limit_count</code></li>
      <li><code>limit_name</code></li>
      <li><code>limit_period</code></li>
      <li><code>rate_limit_status</code></li>
      <li><code>user_uuid</code></li>
    </ul>
    </td>
  </tr>
  <tr>
    <td><code>datadog.apis.usage.per_org_ratio</code></td>
    <td>Proporción de solicitudes de API por dimensiones disponibles para un número total de solicitudes (<code>limit_count</code>) permitidas.</td>
    <td>
    <ul>
      <li><code>app_key_id</code></li>
      <li><code>child_org</code> (sólo en la principal)</li>
      <li><code>limit_count</code></li>
      <li><code>limit_name</code></li>
      <li><code>limit_period</code></li>
      <li><code>rate_limit_status</code></li>
      <li><code>user_uuid</code></li>
    </ul>
    </td>
  </tr>
  <tr>
    <td rowspan="2"><strong>Usuario (UUID)</strong></td>
    <td><code>datadog.apis.usage.per_user</code></td>
    <td>Número de solicitudes de API realizadas para un endpoint de API específico cuya tasa está limitada por usuario único.</td>
    <td>
    <ul>
      <li><code>app_key_id</code></li>
      <li><code>child_org</code> (sólo en la principal)</li>
      <li><code>limit_count</code></li>
      <li><code>limit_name</code></li>
      <li><code>limit_period</code></li>
      <li><code>rate_limit_status</code></li>
      <li><code>user_uuid</code></li>
    </ul>
    </td>
  </tr>
  <tr>
    <td><code>datadog.apis.usage.per_user_ratio</code></td>
    <td>Proporción de solicitudes de API por dimensiones disponibles para un número total de solicitudes (<code>limit_count</code>) permitidas.</td>
    <td>
    <ul>
      <li><code>app_key_id</code><br /></li>
      <li><code>child_org</code> (sólo en la principal)</li>
      <li><code>limit_count</code><br /></li>
      <li><code>limit_name</code><br /></li>
      <li><code>limit_period</code><br /></li>
      <li><code>rate_limit_status</code><br /></li>
      <li><code>user_uuid</code></li>
    </ul>
    </td>
  </tr>
  <tr>
    <td rowspan="2"><strong>API Key</strong></td>
    <td><code>datadog.apis.usage.per_api_key</code></td>
    <td>Número de solicitudes de API realizadas para un endpoint de API específico cuya tasa está limitada por clave de API única utilizada.</td>
    <td>
    <ul>
      <li><code>app_key_id</code></li>
      <li><code>child_org</code> (sólo en la principal)</li>
      <li><code>limit_count</code></li>
      <li><code>limit_name</code></li>
      <li><code>limit_period</code></li>
      <li><code>rate_limit_status</code></li>
      <li><code>user_uuid</code></li>
    </ul>
    </td>
  </tr>
  <tr>
    <td><code>datadog.apis.usage.per_api_key_ratio</code></td>
    <td>Proporción de solicitudes de API por dimensiones disponibles para un número total de solicitudes (<code>limit_count</code>) permitidas.</td>
    <td>
    <ul>
      <li><code>app_key_id</code></li>
      <li><code>child_org</code> (sólo en la principal)</li>
      <li><code>limit_count</code></li>
      <li><code>limit_name</code></li>
      <li><code>limit_period</code></li>
      <li><code>rate_limit_status</code></li>
      <li><code>user_uuid</code></li>
    </ul>
    </td>
  </tr>
</table>


#### Clave de etiqueta


| Nombre de etiqueta            | Descripción                                                                                                               |
|---------------------|---------------------------------------------------------------------------------------------------------------------------|
| `app_key_id`        | ID de la clave de aplicación utilizada por el cliente de la API. Puede ser `N/A` para usuarios web o móviles y endpoints abiertos.                      |
| `child_org`         | Nombre de la organización secundaria, si se visualiza desde la organización principal. De lo contrario, se define en `N/A`. Esto sólo se aplica dentro del mismo centro de datos. |
| `limit_count`       | Número de solicitudes disponibles para cada nombre de límite de tasa durante un periodo de solicitud.                                             |
| `limit_name`        | Nombre del límite de tasa. Diferentes endpoints pueden compartir el mismo nombre.                                                          |
| `limit_period`      | Tiempo en segundos para cada nombre de límite de tasa antes de que se reinicie el recuento de consumo.                                           |
| `rate_limit_status` | `passed`: Solicitud no bloqueada.<br />`blocked` : La solicitud fue bloqueada debido a que se infringieron los límites de tasa.                       |
| `user_uuid`         | UUID del usuario del consumo de API.                                                                                         |

#### Rollup en widgets

Por lo general, las visualizaciones de métricas deben resumirse al minuto utilizando sum(60s) para agregar el número total de solicitudes por minuto.

Las métricas de proporción ya están normalizadas con respecto al correspondiente `limit_period`.

##### Ejemplos de uso

Solicitudes por nombre de límite de tasa
: Grafica la suma de `datadog.apis.usage.per_org`, `datadog.apis.usage.per_user` y `datadog.apis.usage.per_api_key` por `limit_name`<br /><br />
  **Ejemplo:** `default_zero(sum:datadog.apis.usage.per_org{*} by {limit_name}) + default_zero(sum:datadog.apis.usage.per_user{*} by {limit_name}) + default_zero(sum:datadog.apis.usage.per_api_key{*} by {limit_name})`

Bloqueado por nombre de límite de tasa
: Grafica la suma de `datadog.apis.usage.per_org`, `datadog.apis.usage.per_user` y `datadog.apis.usage.per_api_key` por `limit_name` con `rate_limit_status:blocked`<br /><br />
  **Ejemplo:** `default_zero(sum:datadog.apis.usage.per_org{rate_limit_status:blocked} by {limit_name}) + default_zero(sum:datadog.apis.usage.per_user{rate_limit_status:blocked} by {limit_name}) + default_zero(sum:datadog.apis.usage.per_api_key{rate_limit_status:blocked} by {limit_name})`

Endpoint bloqueado por usuario
: Grafica la suma de `datadog.apis.usage.per_org`, `datadog.apis.usage.per_user` y `datadog.apis.usage.per_api_key` por `user_uuid` con `rate_limit_status:blocked` y `limit_name:example`<br /><br />
  **Ejemplo:** `default_zero(sum:datadog.apis.usage.per_org{rate_limit_status:blocked,limit_name:example} by {user_uuid}) + default_zero(sum:datadog.apis.usage.per_user{rate_limit_status:blocked,limit_name:example} by {user_uuid}) + default_zero(sum:datadog.apis.usage.per_api_key{rate_limit_status:blocked,limit_name:example} by {user_uuid})`

Endpoint bloqueado por ID de clave de aplicación
: Grafica la suma de `datadog.apis.usage.per_org`, `datadog.apis.usage.per_user` y `datadog.apis.usage.per_api_key` por `app_key_id` con `rate_limit_status:blocked` y `limit_name:example`<br /><br />
  **Ejemplo:** `default_zero(sum:datadog.apis.usage.per_org{rate_limit_status:blocked,limit_name:example} by {app_key_id}) + default_zero(sum:datadog.apis.usage.per_user{rate_limit_status:blocked,limit_name:example} by {app_key_id}) + default_zero(sum:datadog.apis.usage.per_api_key{rate_limit_status:blocked,limit_name:example} by {app_key_id})`

Proporción de límites de tasa utilizados por nombre de límite de tasa
: Grafica la suma de `datadog.apis.usage.per_org_ratio`, `datadog.apis.usage.per_user_ratio` y `datadog.apis.usage.per_api_key_ratio` por `limit_name`<br /><br />
  **Ejemplo:** `default_zero(max:datadog.apis.usage.per_org_ratio{*} by {limit_name}) + default_zero(max:datadog.apis.usage.per_user_ratio{*} by {limit_name}) + default_zero(max:datadog.apis.usage.per_api_key_ratio{*} by {limit_name})`


### Aumentar tu límite de tasa
Puedes solicitar un aumento de los límites de tasa creando un ticket de asistencia con los siguientes detalles en **Ayuda** > **Nuevo ticket de asistencia**. Cuando recibimos una solicitud de aumento de límite de tasa, nuestro equipo de Ingeniería de soporte revisa la solicitud caso por caso y, si es necesario, trabaja junto a los recursos internos de Ingeniería para confirmar la viabilidad de la solicitud de aumento de límite de tasa.

    Título:
        Solicitud de aumento de límite de tasa en endpoint: X

    Detalles:
        Querríamos solicitar un aumento del límite de tasa para el endpoint de API: X
        Ejemplo de casos de uso/consultas:
            Ejemplo de llamada de API como cURL o como URL con carga útil de ejemplo

        Motivos para aumentar el límite de tasa:
            Ejemplo: Nuestra organización utiliza este endpoint para dimensionar correctamente un contenedor antes de desplegarlo. Este despliegue tiene lugar cada X horas o hasta Y veces al día.

        Límite de tasa deseado:
            Consejo: Tener en mente un aumento específico del límite o del porcentaje ayuda a ingeniería de soporte a agilizar la solicitud a los equipos internos de Ingeniería para su revisión.

Una vez que el servicio de asistencia de Datadog revise y apruebe el caso de uso, podrá aplicar el aumento del límite de tasa entre bastidores. Ten en cuenta que existe un límite máximo para el aumento del límite de tasa debido a la naturaleza SaaS de Datadog. El servicio de asistencia de Datadog se reserva el derecho a rechazar aumentos del límite de tasa en función de los casos de uso y las recomendaciones del equipo de Ingeniería.

### Logs de auditoría
Las métricas de límite y uso de API proporcionan información sobre patrones de uso y solicitudes bloqueadas. Si necesitas más información, Audit Trail ofrece una visibilidad más detallada de la actividad de la API.

Con Audit Trail, puedes ver datos como:
* **Dirección IP y geolocalización** - Identifica dónde se originaron las solicitudes de API.
* **Tipo de actor** - Distingue entre cuentas de servicio y cuentas de usuario.
* **Autenticación mediante API frente a autenticación mediante clave de aplicación** - Descubre si las solicitudes se realizaron a través de una clave de API o directamente por un usuario.
* **Eventos correlacionados** - Consulta otros eventos que ocurran al mismo tiempo, como cambios de configuración o acciones relacionadas con la seguridad.

Audit Trail puede ayudar a los equipos de asistencia a solucionar problemas de límites de tasa al proporcionar más contexto sobre el consumo de API y las solicitudes bloqueadas. También permite realizar un seguimiento del uso de la API en toda la organización por motivos de seguridad y cumplimiento.

Para obtener una visibilidad más detallada de la actividad de la API, considera el uso de **[Audit Trail][4]**.


[1]: /es/help/
[2]: /es/api/v1/metrics/
[3]: /es/metrics/custom_metrics/
[4]: /es/account_management/audit_trail/events/