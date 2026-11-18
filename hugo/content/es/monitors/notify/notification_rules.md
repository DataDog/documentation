---
description: Automatice el enrutamiento de alertas de seguimiento mediante reglas
  de notificación predefinidas basadas en etiquetas y condiciones para agilizar las
  notificaciones al equipo.
further_reading:
- link: /monitors/notify/
  tag: Documentación
  text: Configure las notificaciones de seguimiento
- link: /monitors/settings/
  tag: Documentación
  text: Configuración de seguimiento
- link: https://www.datadoghq.com/blog/monitor-notification-rules/
  tag: Blog
  text: Dirija sus alertas de seguimiento con las reglas de notificación de seguimiento
    de Datadog.
title: Reglas de notificación
---
## Descripción general {#overview}

Las reglas de notificación de seguimiento son conjuntos predefinidos de condiciones que automatizan el proceso de alertar a su equipo según etiquetas y lógica de reglas. En lugar de configurar individualmente los destinatarios para cada seguimiento, las reglas de notificación le permiten definirlos una sola vez y enrutar automáticamente todas las notificaciones de seguimiento cuyo conjunto de etiquetas de notificación coincida con el contexto de la regla.

<div class="alert alert-info">Existe un límite predeterminado de 1000 reglas por organización.</a>.</div>

## Configuración {#setup}

<div class="alert alert-danger">Debe tener el <a href="/account_management/rbac/permissions/#monitors"><code>monitor_config_policy_write</code> o <code>monitor_notification_rules_write</code> permiso</a> para crear una regla. El <code>monitor_notification_rules_write</code> permiso está en vista previa.</div>

Para crear una Monitor Notification Rule en Datadog, haga lo siguiente:

1. Vaya a [{{< ui >}}Notification Rules{{< /ui >}}][1].
2. Haga clic en {{< ui >}}New Rule{{< /ui >}}.
3. [Configure el contexto](#configure-the-scope): defina las etiquetas necesarias para que una notificación de seguimiento se enrute a esta regla.
4. [Configure el enrutamiento y los destinatarios](#configure-the-routing-and-recipients): elija cómo enrutar las notificaciones y especifique los destinatarios.
5. Agregue un nombre de regla claro e identificable.

### Configure el contexto {#configure-the-scope}

Agregue las etiquetas necesarias para que una notificación de seguimiento se enrute a esta regla. La coincidencia evalúa el conjunto de etiquetas de notificación. Obtenga más información en [Cómo funciona la coincidencia](#how-matching-works).

<div class="alert alert-info">Los seguimientos creados o actualizados después de guardar la regla de notificación se enrutan a los destinatarios definidos si coinciden con el contexto de la regla.</div>

{{% collapse-content title="Sintaxis del contexto de la regla" level="h4" expanded=false %}}

La consulta del contexto de la regla de notificación admite lógica booleana y sigue la [sintaxis de búsqueda basada en eventos][3] admitida por muchos otros productos de la plataforma.

| Elemento de sintaxis | Descripción |
| -------------- | ----------- |
| **Operadores booleanos** | Admitidos: `AND`, `OR`, `NOT`<br>Operador implícito: `AND` |
| **Wildcards** | Solo se admite `key:*` (por ejemplo, `env:*`). No se admiten Wildcards parciales como `env:prod-*`. `key:*` coincide si la clave existe en cualquier parte del conjunto de etiquetas de notificación. |
| **Múltiples valores para la misma clave** | Use `env:(prod OR staging)` o `env:prod OR env:staging`. |
| **Uso de comillas** | Ponga entre comillas los valores que contengan espacios o caracteres especiales, por ejemplo: `team:"data platform"`. |
{{% /collapse-content %}}


{{% collapse-content title="Ejemplos de contexto" level="h4" expanded=false %}}

| Contexto de la regla de notificación | Explicación |
| ------------------- | ---------------------- |
| `service:web-store`       | Enrute cualquier notificación sobre el servicio `web-store`. |
| `service:web-store AND env:prod`       | Enrute cualquier notificación sobre el servicio `web-store` que se ejecuta en el entorno `prod`. |
| `service:webstore AND  NOT env:staging`       | Enrute cualquier notificación sobre el servicio `web-store` que **no** se esté ejecutando en el entorno `staging`. |
| `env:*`       | Enrute cualquier notificación que contenga la etiqueta `env:<value>` (ya sea de etiquetas de seguimiento o de grupo). |

{{% /collapse-content %}}

{{% collapse-content title="Limitaciones del contexto de la regla" level="h4" expanded=false %}}

Los siguientes **no son compatibles**:

* Las etiquetas sin clave, como `prod AND service:(A or B)` o `prod`, no son compatibles. Las etiquetas deben tener una clave, en este caso, por ejemplo, `env:prod`.
* Los Wildcards parciales (`service:web-*`) y los Wildcards de signo de interrogación `service:auth?` no son compatibles. Wildcard solo se permite si se usa solo, como `service:*`.
* Longitud del contexto de hasta 3000 caracteres.
{{% /collapse-content %}}


### Configure el enrutamiento y los destinatarios {#configure-the-routing-and-recipients}

Elija cómo enrutar las notificaciones cuando una alerta de seguimiento coincida con el contexto de la regla. Puede especificar manualmente los destinatarios o utilizar el enrutamiento dinámico para resolver los destinatarios automáticamente a partir de las configuraciones de su equipo y servicio.

#### Enrutamiento manual {#manual-routing}

Especifique a qué destinatarios notificar cuando una notificación de seguimiento coincida con el contexto de la regla. Siempre puede notificar a todos los destinatarios o establecer destinatarios condicionales que solo se notifican cuando se cumplen ciertas condiciones (por ejemplo, enrutar alertas críticas a su destinatario de guardia y enviar advertencias a un canal de Slack).
Las condiciones pueden basarse en el estado del seguimiento o en etiquetas:
- **Condiciones basadas en el estado**: Notifique a los destinatarios cuando el seguimiento cambie a un estado específico (Alert, OK, Warn o No data).
- **Condiciones basadas en etiquetas**: Notifique a los destinatarios cuando una clave de etiqueta específica tenga un valor determinado (por ejemplo, `env:prod`). Cada condición admite solo una clave de etiqueta.

Las notificaciones se pueden enviar por correo electrónico o a cualquier canal de integración. Existe un límite de 50 destinatarios de notificación por regla. Para obtener más información, consulte [Notifications][2].

#### Enrutamiento dinámico {#dynamic-routing}

<div class="alert alert-danger">El enrutamiento dinámico está en versión preliminar. Para solicitar acceso, comuníquese con su equipo de cuenta de Datadog o contacte a <a href="https://docs.datadoghq.com/help/">Datadog Support</a>.</div>

El enrutamiento dinámico dirige automáticamente las alertas del seguimiento al equipo correcto según sus configuraciones existentes de [Teams][4] y [Catalog][5]. En lugar de mantener listas de destinatarios estáticas, el enrutamiento dinámico utiliza la etiqueta `service` o `team` en el seguimiento que genera la alerta para determinar a dónde enviar las notificaciones.

| Configuración | Descripción | Requisitos |
| --- | --- | --- |
| {{< ui >}}Service-based{{< /ui >}} | Verifica la etiqueta `service` o la etiqueta de grupo del seguimiento, busca qué equipo administra ese servicio en Catalog y luego envía la alerta a los canales de notificación configurados de ese equipo. | El servicio debe tener un equipo asignado en Catalog. Si no hay ningún equipo asignado, la alerta se envía a los destinatarios de respaldo. |
| {{< ui >}}Team-based{{< /ui >}} | Verifica directamente la etiqueta `team` o la etiqueta de grupo del seguimiento y luego envía la alerta a los canales de notificación configurados de ese equipo. | El seguimiento debe tener una etiqueta `team`. |
| {{< ui >}}Fallback{{< /ui >}} | Si el enrutamiento no puede resolverse (por ejemplo, el servicio no tiene un equipo asignado o el equipo no tiene canales de notificación configurados), la alerta se envía a los destinatarios de respaldo. Los destinatarios de respaldo se comportan igual que los destinatarios de enrutamiento manual. | Requerido para todas las reglas de enrutamiento dinámico. |

Tanto el enrutamiento basado en servicios como el basado en equipos admiten Slack, correo electrónico, PagerDuty y Microsoft Teams. Los equipos pueden configurar sus canales de notificación en [Configuración de Teams][4].

## Administración de reglas de notificación {#managing-notification-rules}

### Desde Monitor Settings {#from-monitor-settings}

{{< img src="/monitors/notifications/notification_rules/notification_rules_table.png" alt="Lista de reglas de notificación en Monitor Settings" style="width:100%;" >}}

La página [Monitor Notification Rules][1] muestra una tabla de todas sus reglas de notificación con las siguientes columnas:

- {{< ui >}}Name{{< /ui >}}: nombre de la regla de notificación
- {{< ui >}}Scope{{< /ui >}}: muestra las combinaciones de etiquetas que definen cuándo se aplica esta regla (por ejemplo, `team:shopist service:web-store env:prod`).
- {{< ui >}}Team{{< /ui >}}: lista los equipos con los que está asociada esta regla de notificación (disponible solo cuando se agrega la etiqueta de equipo en el contexto)
- {{< ui >}}Coverage{{< /ui >}}: muestra la cantidad de seguimientos que coinciden con los contextos de esta regla. Utilice esto para verificar la cobertura de las reglas e identificar las reglas que necesitan ajustes.
- {{< ui >}}Notifies{{< /ui >}}: lista los canales de notificación (como Slack o correo electrónico) que recibirán alertas cuando esta regla coincida.

Además, puede hacer clic en el menú vertical de tres puntos en la regla de notificación para {{< ui >}}Edit{{< /ui >}} o {{< ui >}}Delete{{< /ui >}}.

### Desde un seguimiento individual {#from-an-individual-monitor}
En la configuración de su seguimiento, el {{< ui >}}Recipient Summary{{< /ui >}} muestra los destinatarios asignados al seguimiento mediante las reglas de notificación coincidentes. En la página de edición de **Monitor**, también puede ver reglas que _podrían_ coincidir cuando nuevos grupos informen (seguimientos de alerta múltiple). La página de estado del **Monitor** muestra las reglas que coinciden.

{{< img src="/monitors/notifications/notification_rules/monitor_matching_notification_rule.png" alt="Campo de resumen de destinatarios que muestra los destinatarios de notificación aplicados por las reglas de notificación" style="width:100%;" >}}

## Cómo funciona la coincidencia {#how-matching-works}

- El conjunto de etiquetas de notificación es la unión de las etiquetas del seguimiento y las etiquetas del grupo que activa la alerta (para seguimientos de alerta múltiple). Si una clave tiene varios valores entre el seguimiento y el grupo, se consideran todos los valores.
- Coincide actualmente: una regla coincide si al menos un grupo que informa, combinado con las etiquetas del seguimiento, satisface el contexto; o si las etiquetas del seguimiento por sí solas lo hacen. NOT se evalúa por cada conjunto de etiquetas candidato, por lo que un grupo con un valor denegado no coincide.
- Podría coincidir cuando nuevos grupos informen (seguimientos de alerta múltiple, interfaz de edición de Monitor): trate cada clave de agrupación como presente con cualquier valor, sujeto a los filtros de valores permitidos y denegados de la consulta del seguimiento.
- Si varias reglas coinciden con una sola notificación, los destinatarios de todas las reglas coincidentes se fusionan y se eliminan los duplicados.

{{< img src="/monitors/notifications/notification_rules/diagram_notification-rules.png" alt="Diagrama de flujo que muestra cómo las reglas de notificación de Monitor coinciden con las etiquetas, combinan los destinatarios de los seguimientos y las reglas, y eliminan los duplicados antes de enviar alertas" style="width:100%;" >}}

{{% collapse-content title="Ejemplo: Coincidencia de reglas de notificación" level="h3" expanded=false %}}

La siguiente tabla demuestra cómo los seguimientos con diferentes combinaciones de etiquetas coinciden con las reglas de notificación y sus notificaciones resultantes. Esta tabla muestra cómo:
1. Varias reglas de notificación pueden coincidir con una única notificación de seguimiento según sus etiquetas.
2. La lógica AND funciona para varias etiquetas dentro de una regla.
3. Todas las reglas de notificación coincidentes contribuyen con sus destinatarios a la lista de notificación final.
4. Los destinatarios se desduplican en la lista de notificación final.

<table>
    <thead>
        <tr>
            <th></th>
            <th colspan="5" style="text-align: center; border-bottom: 1px solid #ddd; background-color:rgb(98, 92, 92);">Reglas de notificación</th>
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
            <td style="background-color:#E8E8E8;"><strong>ETIQUETAS DE ALERTA DE SEGUIMIENTO Y NOTIFICACIONES</strong></td>
            <td style="background-color:#E8E8E8; border: 1px solid #ddd;"><i>@slack-channel1</i><br><i>@jira-project</i></td>
            <td style="background-color:#E8E8E8; border: 1px solid #ddd;"><i>@jira-project</i></td>
            <td style="background-color:#E8E8E8; border: 1px solid #ddd;"><i>@jira-project</i></td>
            <td style="background-color:#E8E8E8; border: 1px solid #ddd;"><i>@user@datadoghq.com</i></td>
            <td style="background-color:#E8E8E8; border: 1px solid #ddd;"><i>@jira-project</i></td>
            <td style="background-color:#E8E8E8;"><strong>IDENTIFICADORES NOTIFICADOS</strong></td>
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

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/settings/notifications
[2]: /es/monitors/notify/#notifications
[3]: /es/getting_started/search/#event-based-queries
[4]: /es/account_management/teams/
[5]: /es/internal_developer_portal/catalog/