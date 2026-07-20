---
description: Automatiza el enrutamiento de alertas de seguimiento utilizando reglas
  de notificación predefinidas basadas en etiquetas y condiciones para agilizar las
  notificaciones del equipo.
further_reading:
- link: /monitors/notify/
  tag: Documentación
  text: Configurar notificaciones de seguimiento
- link: /monitors/settings/
  tag: Documentación
  text: Configuraciones de seguimiento
- link: https://www.datadoghq.com/blog/monitor-notification-rules/
  tag: Blog
  text: Enruta tus alertas de seguimiento con las reglas de notificación de seguimiento
    de Datadog
title: Reglas de Notificación
---
## Resumen {#overview}

Las reglas de notificación de seguimiento son conjuntos predefinidos de condiciones que automatizan el proceso de alertar a tu equipo basado en etiquetas y lógica de reglas. En lugar de configurar individualmente los destinatarios para cada seguimiento, las reglas de notificación te permiten definir una vez y enrutarlas automáticamente a todas las notificaciones de seguimiento cuyo conjunto de etiquetas de notificación coincida con el contexto de la regla.

<div class="alert alert-info">Hay un límite predeterminado de 1000 reglas por organización.</a>.</div>

## Configuración {#setup}

<div class="alert alert-danger">Debes tener el <a href="/account_management/rbac/permissions/#monitors"><code>monitor_config_policy_write</code> permiso</a> para crear una regla.</div>

Para crear una Regla de Notificación de Seguimiento en Datadog, haz lo siguiente:

1. Ve a [**Reglas de Notificación**][1].
2. Haz clic en **Nueva Regla**.
3. [Configura el contexto](#configure-the-scope): Define las etiquetas requeridas para que una notificación de seguimiento sea enrutada a esta regla.
4. [Configura el enrutamiento y los destinatarios](#configure-the-routing-and-recipients): Elige cómo enrutear las notificaciones y especifica los destinatarios.
5. Agrega un nombre de regla claro e identificable.

### Configura el alcance {#configure-the-scope}

Agrega las etiquetas requeridas para que una notificación de seguimiento sea dirigida a esta regla. La coincidencia evalúa el conjunto de etiquetas de notificación. Aprende más en [Cómo funciona la coincidencia](#how-matching-works).

<div class="alert alert-info">Los seguimientos creados o actualizados después de que se guarda la regla de notificación son enrutados a los destinatarios definidos si coincide con el contexto de la regla.</div>

{{% collapse-content title="Sintaxis del alcance de la regla" level="h4" expanded=false %}}

La consulta del alcance de la regla de notificación soporta lógica booleana y sigue la [sintaxis de búsqueda basada en eventos][3] soportada por muchos otros productos de la plataforma.

| Elemento de Sintaxis | Descripción |
| -------------- | ----------- |
| **Operadores booleanos** | Soportados: `AND`, `OR`, `NOT`<br>Operador implícito: `AND` |
| **Comodines** | Solo se soporta `key:*` (por ejemplo, `env:*`). Los comodines parciales como `env:prod-*` no son soportados. `key:*` coincide si la clave existe en cualquier lugar del conjunto de etiquetas de notificación. |
| **Valores múltiples para la misma clave** | Usa ya sea `env:(prod OR staging)` o `env:prod OR env:staging`. |
| **Citas** | Envuelve los valores que contienen espacios o caracteres especiales entre comillas, por ejemplo: `team:"data platform"`. |
{{% /collapse-content %}}


{{% collapse-content title="Ejemplos de alcance" level="h4" expanded=false %}}

| Alcance de la regla de notificación | Explicación |
| ------------------- | ---------------------- |
| `service:web-store`       | Dirige cualquier notificación sobre el servicio `web-store`. |
| `service:web-store AND env:prod`       | Dirija cualquier notificación sobre el servicio `web-store` que se esté ejecutando en el entorno `prod`. |
| `service:webstore AND  NOT env:staging`       | Dirija cualquier notificación sobre el servicio `web-store` que **no** se esté ejecutando en el entorno `staging`. |
| `env:*`       | Dirija cualquier notificación que lleve la etiqueta `env:<value>` (ya sea de etiquetas de monitor o de grupo). |

{{% /collapse-content %}}

{{% collapse-content title="Limitaciones del alcance de la regla" level="h4" expanded=false %}}

Lo siguiente **no es compatible**:

* Las etiquetas sin clave, como `prod AND service:(A or B)` o `prod`, no son compatibles. Las etiquetas deben tener una clave, en este caso, por ejemplo, `env:prod`.
* Los comodines parciales (`service:web-*`) y los comodines de signo de interrogación `service:auth?` no son compatibles. El comodín solo se permite si se usa solo, como `service:*`.
* Longitud del alcance de hasta 3000 caracteres.
{{% /collapse-content %}}


### Configure el enrutamiento y los destinatarios {#configure-the-routing-and-recipients}

Elija cómo enrutear las notificaciones cuando una alerta de monitor coincida con el alcance de la regla. Puede especificar manualmente los destinatarios o usar enrutamiento dinámico para resolver automáticamente los destinatarios de las configuraciones de su equipo y servicio.

#### Enrutamiento manual {#manual-routing}

Especifique qué destinatarios notificar cuando una notificación de monitor coincida con el alcance de la regla. Siempre puede notificar a todos los destinatarios, o establecer destinatarios condicionales que solo se notifiquen cuando se cumplan ciertas condiciones (por ejemplo, enrutar alertas críticas a su destinatario de guardia y enviar advertencias a un canal de Slack).
Las condiciones pueden basarse en el estado del monitor o en etiquetas:
- **Condiciones basadas en el estado**: Notifique a los destinatarios cuando el monitor cambie a un estado específico (Alerta, OK, Advertencia o Sin datos).
- **Condiciones basadas en etiquetas**: Notifique a los destinatarios cuando una clave de etiqueta específica tenga un valor dado (por ejemplo, `env:prod`). Cada condición admite solo una clave de etiqueta.

Las notificaciones se pueden enviar por correo electrónico o cualquier canal de integración. Hay un límite de 50 destinatarios de notificaciones por regla. Para más información, consulte [Notificaciones][2].

#### Enrutamiento dinámico {#dynamic-routing}

<div class="alert alert-danger">El enrutamiento dinámico está en vista previa. Para solicitar acceso, comuníquese con su equipo de cuentas de Datadog o contacte a <a href="https://docs.datadoghq.com/help/">Soporte de Datadog</a>.</div>

El enrutamiento dinámico enruta automáticamente las alertas de seguimiento al equipo correcto según sus configuraciones existentes de [Teams][4] y [Catálogo][5]. En lugar de mantener listas de destinatarios estáticas, el enrutamiento dinámico utiliza la etiqueta `service` o `team` en el monitor de alertas para determinar a dónde enviar las notificaciones.

| Configuración | Descripción | Requisitos |
| --- | --- | --- |
| **Basado en servicio** | Verifica la etiqueta `service` del monitor o la etiqueta de grupo, busca qué equipo gestiona ese servicio en el Catálogo y luego envía la alerta a los canales de notificación configurados de ese equipo. | El servicio debe tener un equipo asignado en el Catálogo. Si no se asigna ningún equipo, la alerta se envía a los destinatarios de respaldo. |
| **Basado en equipo** | Verifica directamente la etiqueta `team` del monitor o la etiqueta de grupo, y luego envía la alerta a los canales de notificación configurados de ese equipo. | El monitor debe tener una etiqueta `team`. |
| **Respaldo** | Si el enrutamiento no puede resolverse (por ejemplo, el servicio no tiene un equipo asignado o el equipo no tiene canales de notificación configurados), la alerta va a los destinatarios de respaldo. Los destinatarios de respaldo se comportan de la misma manera que los destinatarios de enrutamiento manual. | Requerido para todas las reglas de enrutamiento dinámico. |

Tanto el enrutamiento basado en servicios como el enrutamiento basado en equipos son compatibles con Slack, correo electrónico, PagerDuty y Microsoft Teams. Los equipos pueden configurar sus canales de notificación en [Configuración de equipos][4].

## Gestión de reglas de notificación {#managing-notification-rules}

### Desde la Configuración de Monitor {#from-monitor-settings}

{{< img src="/monitors/notifications/notification_rules/notification_rules_table.png" alt="Lista de reglas de notificación en la Configuración de Monitor" style="width:100%;" >}}

La página de [Reglas de Notificación de Monitor][1] muestra una tabla de todas tus reglas de notificación con las siguientes columnas:

- **Nombre**: Nombre de la regla de notificación
- **Alcance**: Muestra las combinaciones de etiquetas que definen cuándo se aplica esta regla (por ejemplo, `team:shopist service:web-store env:prod`).
- **Equipo**: Enumera los equipos con los que está asociada esta regla de notificación (disponible solo cuando se agrega la etiqueta de equipo en el alcance)
- **Cobertura**: Muestra el número de monitores que coinciden con los alcances de esta regla. Utiliza esto para verificar la cobertura de la regla e identificar reglas que necesitan ajustes.
- **Notifica**: Enumera los canales de notificación (como Slack o correo electrónico) que recibirán alertas cuando esta regla coincida.

Además, puedes hacer clic en el menú vertical de tres puntos en la regla de notificación para **Editar** o **Eliminar**.

### Desde un monitor individual {#from-an-individual-monitor}
En la configuración de tu monitor, el **Resumen de Destinatarios** muestra los destinatarios que se aplican al monitor mediante reglas de notificación coincidentes. En la página de edición del **Monitor**, también puedes ver reglas que _podrían_ coincidir cuando nuevos grupos informan (monitores de múltiples alertas). La página de estado del **Monitor** muestra reglas que coinciden.

{{< img src="/monitors/notifications/notification_rules/monitor_matching_notification_rule.png" alt="Campo de resumen de destinatarios que muestra los destinatarios de notificación aplicados por las reglas de notificación" style="width:100%;" >}}

## Cómo funciona la coincidencia {#how-matching-works}

- El conjunto de etiquetas de notificación es la unión de las etiquetas de seguimiento y las etiquetas del grupo activador (para seguimientos de múltiples alertas). Si una clave tiene múltiples valores en el seguimiento/grupo, se consideran todos los valores.
- Actualmente coincide: Una regla coincide si al menos un grupo de reporte, combinado con las etiquetas de seguimiento, satisface el contexto; o, si las etiquetas de seguimiento por sí solas lo hacen. NO se evalúa por cada conjunto de etiquetas candidato, por lo que un grupo con un valor denegado no coincide.
- Podría coincidir cuando nuevos grupos reportan (monitors de múltiples alertas, Monitor edit surface): Trate cada clave de agrupación como presente con cualquier valor, condicionado a los filtros allow/deny de la consulta del monitor.
- Si múltiples reglas coinciden con una sola notificación, los destinatarios de todas las reglas coincidentes se fusionan y se eliminan duplicados.

{{< img src="/monitors/notifications/notification_rules/diagram_notification-rules.png" alt="Diagrama de flujo que muestra cómo las reglas de notificación de monitors coinciden con las etiquetas, combinan los destinatarios de monitors y reglas, y eliminan duplicados antes de enviar alertas." style="width:100%;" >}}

{{% collapse-content title="Ejemplo: Coincidencia de Regla de Notificación" level="h4" expanded=false %}}

La siguiente tabla demuestra cómo los monitors con diferentes combinaciones de etiquetas coinciden con las reglas de notificación y las notificaciones resultantes. Esta tabla muestra cómo:
1. Múltiples reglas de notificación pueden coincidir con una sola notificación de monitor, en función de sus etiquetas.
2. La lógica AND funciona para múltiples etiquetas dentro de una regla.
3. Todas las reglas de notificación coincidentes contribuyen con sus destinatarios a la lista final de notificaciones.
4. Los destinatarios se deduplican en la lista final de notificaciones.

<table>
    <thead>
        <tr>
            <th></th>
            <th colspan="5" style="text-align: center; border-bottom: 1px solid #ddd; background-color:rgb(98, 92, 92);">Reglas de Notificación</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th style="background-color:#E8E8E8;"></th>
            <th style="background-color:#E8E8E8; border: 1px solid #ddd;"><code>team:shopist,<br>service:web-store</code></th>
            <th style="background-color:#E8E8E8; border: 1px solid #ddd;"><code>team:shopist</code></th>
            <th style="background-color:#E8E8E8; border: 1px solid #ddd;"><code>service:web-store</code></th>
            <th style="background-color:#E8E8E8; border: 1px solid #ddd;"><code>service:web-store<br>env:prod</code></th>
            <th style="background-color:#E8E8E8; border: 1px solid #ddd;"><code>service:web-store<br>env:dev</code></th>
            <th style="background-color:#E8E8E8;"></th>
        </tr>
        <tr>
            <td style="background-color:#E8E8E8;"><strong>ETIQUETAS DE ALERTA DEL MONITOR Y NOTIFICACIONES</strong></td>
            <td style="background-color:#E8E8E8; border: 1px solid #ddd;"><i>@slack-channel1</i><br><i>@jira-project</i></td>
            <td style="background-color:#E8E8E8; border: 1px solid #ddd;"><i>@jira-project</i></td>
            <td style="background-color:#E8E8E8; border: 1px solid #ddd;"><i>@jira-project</i></td>
            <td style="background-color:#E8E8E8; border: 1px solid #ddd;"><i>@user@datadoghq.com</i></td>
            <td style="background-color:#E8E8E8; border: 1px solid #ddd;"><i>@jira-project</i></td>
            <td style="background-color:#E8E8E8;"><strong>MANEJOS NOTIFICADOS</strong></td>
        </tr>
        <tr>
            <td><code>team:shopist, service:web-store</code><br><i>@user@datadoghq.com</i></td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td><i>@slack-channel1</i><br><i>@jira-project</i><br><i>@user@datadoghq.com</i></td>
        </tr>
        <tr>
            <td><code>team:shopist</code></td>
            <td style="text-align: center"></td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td><i>@jira-project</i></td>
        </tr>
        <tr>
            <td><code>service:web-store</code></td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td><i>@jira-project</i></td>
        </tr>
        <tr>
            <td><code>service:web-store, env:prod</code></td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center"></td>
            <td><i>@jira-project</i><br><i>@user@datadoghq.com</i></td>
        </tr>
        <tr>
            <td><code>service:web-store, env:dev</code></td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center"></td>
            <td style="text-align: center">{{< X >}}</td>
            <td><i>@jira-project</i></td>
        </tr>
        <tr>
            <td><code>team:shopist and service:web-store, env:prod</code><br><i>@slack-service1</i><br><i>@jira-project</i><br><i>@user@datadoghq.com</i></td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center"></td>
            <td><i>@slack-channel1</i><br><i>@slack-service1</i><br><i>@jira-project</i><br><i>@user@datadoghq.com</i></td>
        </tr>
    </tbody>
</table>

{{% /collapse-content %}}

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/settings/notifications
[2]: /es/monitors/notify/#notifications
[3]: /es/getting_started/search/#event-based-queries
[4]: /es/account_management/teams/
[5]: /es/internal_developer_portal/catalog/