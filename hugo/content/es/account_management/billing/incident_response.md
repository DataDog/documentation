---
further_reading:
- link: /incident_response/incident_management/
  tag: Documentación
  text: Incident Management
- link: /incident_response/on-call/
  tag: Documentación
  text: On-Call
- link: /incident_response/status_pages/
  tag: Documentación
  text: Status Pages
title: Facturación de Incident Response
---
## Descripción general {#overview}

Los SKU de [Incident Management][1], [On-Call][2] e Incident Response de Datadog utilizan un modelo de facturación basado en licencias. 

Las organizaciones tienen dos opciones para la facturación de Incident Response:
- Incident Management u On-Call como SKU separados, cada uno facturado individualmente
- El paquete de Incident Response, que unifica la facturación tanto para Incident Management como para On-Call bajo un solo SKU e incluye acceso completo a [Status Pages](#status-pages-usage)

El paquete de Incident Response no se puede combinar con los SKU independientes de On-Call o Incident Management. Si su organización contrata el paquete, todas sus licencias serán licencias de Incident Response.

Cada producto se factura por licencia, por lo que cada usuario que realiza acciones que requieren una licencia debe contar con una. Para obtener información detallada sobre precios, consulte la [página de precios de Incident Response][3].

Vea y administre el uso de licencias para cada producto en la sección [Seat Management][4] de la página Plan & Usage en Datadog.

## Asignar licencias {#allocate-seats}

Una **licencia** es un permiso para que un usuario participe activamente en el proceso de guardia o de gestión de incidentes en Datadog. 

Cualquier usuario puede reclamar una licencia para On-Call, Incident Management o Incident Response a medida que realiza acciones que requieren una licencia. Los administradores de facturación también pueden [asignar licencias](#assign-seats) con antelación para simplificar el proceso para sus equipos.

Un usuario necesita una **licencia de On-Call** si realiza cualquiera de las siguientes acciones:
- Participar en un [horario de guardia][5]
- Estar incluido en una [política de escalamiento][6]
- Haber configurado [preferencias de notificación][7] para recibir avisos

En el producto On-Call, un usuario no necesita una licencia para ver avisos, políticas de escalamiento, equipos u horarios existentes. Sin embargo, si un usuario sin licencia realiza una acción que requiere una licencia de On-Call, Datadog le asigna automáticamente una licencia facturable. Las acciones realizadas a través de la [API de On-Call][10] también asignan una licencia, sin un aviso de confirmación. Si nadie en su organización tiene aún una licencia de On-Call, la primera asignación automática habilita las licencias de On-Call y Datadog envía un correo electrónico de notificación a su organización. Para obtener más información, consulte [Facturación y excedentes](#billing-and-overages).

Un usuario necesita una **licencia de Incident Management** si realiza cualquiera de las siguientes acciones. Estas acciones requieren una licencia, ya sea que se realicen en la interfaz de usuario de Datadog o a través de integraciones como Microsoft Teams o Slack.
- Modificar un incidente (por ejemplo, actualizar la gravedad)
- Eliminar un incidente
- Agregar un comentario, gráfico o enlace a la línea de tiempo de un incidente
- Asignar una tarea a un usuario dentro de un incidente (el asignado no necesita una licencia)
- Asignar a un responsable de respuesta a un rol definido por el usuario dentro de un incidente (la persona asignada debe tener una licencia) 

En Incident Management, un usuario no necesita una licencia para crear incidentes, ver incidentes o unirse a canales de incidentes. Publicar en un canal conectado de Slack, Microsoft Teams o Google Chat no requiere una licencia, y tampoco comentar en un issue de Jira vinculado. Esto se aplica incluso cuando los mensajes se sincronizan con la línea de tiempo del incidente. Solo las acciones realizadas a través de la aplicación de Datadog para Slack o Microsoft Teams, como usar botones de acción o mencionar a @Datadog, requieren una licencia.

Un mensaje sincronizado es diferente a un comentario en la línea de tiempo: un mensaje normal que se sincroniza automáticamente con la línea de tiempo no requiere una licencia, pero agregar un comentario, gráfico o enlace a la línea de tiempo en Datadog, o mediante una acción en la aplicación de Datadog para Slack o Microsoft Teams, sí lo requiere.

Si su organización ha contratado el SKU de Incident Response, cualquier usuario que cumpla con los criterios de On-Call o Incident Management puede reclamar o recibir una **licencia de Incident Response**.

### Uso de Status Pages {#status-pages-usage}

Todos los clientes de pago de Datadog pueden usar Status Pages. El acceso depende de si su organización tiene una licencia contratada de Incident Management o Incident Response:
- **Con al menos una licencia contratada**: Acceso completo, incluyendo páginas ilimitadas y dominios personalizados.
- **Sin una licencia contratada**: Limitado a una página de Status Pages y sin compatibilidad con dominios personalizados.

<div class="alert alert-info">
Si usted es un cliente en periodo de prueba que desea acceso completo durante dicho periodo, comuníquese con su representante de ventas de Datadog o con su Gerente de Éxito del Cliente.
</div>

## Administrar licencias {#manage-seats}

La [página Seat Management][1] permite a los administradores de facturación ver y administrar a los usuarios que ocupan licencias de Incident Management, On-Call o el paquete de Incident Response. 

La página Seat Management contiene pestañas para cada producto habilitado en su organización. Dependiendo de su contrato, es posible que vea una de las siguientes opciones:
- Pestañas separadas para Incident Management y On-Call
- Una sola pestaña para Incident Response (si utiliza el SKU del paquete)

Cada pestaña incluye:
- Un encabezado que muestra el total de licencias en uso y la cantidad de licencias contratadas (por ejemplo, 130 de 180 licencias en uso)
- Una tabla que enumera a todos los usuarios que ocupan licencias, incluyendo:
    - Nombre
    - Correo electrónico
    - Upgraded date (fecha en que se le asignó una licencia al usuario)

También puede encontrar usuarios buscando por nombre, correo electrónico o equipo. 

Los administradores de On-Call también pueden usar la [página de configuración Notification Preferences][9] para ver a qué horarios o políticas de escalamiento pertenece un usuario y eliminar las preferencias de notificación de ese usuario si es necesario. 

Eliminar las preferencias de notificación de un usuario no le desasigna la licencia. Si un usuario ya no debe ocupar una licencia, debe desasignársela explícitamente desde la página Seat Management. 

### Asignar licencias {#assign-seats}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">La asignación de licencias no es compatible con el <a href="/getting_started/site">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Los administradores de facturación o los usuarios con el permiso `billing_edit` pueden asignar licencias manualmente para que los miembros del equipo tengan acceso antes de que lo necesiten.

Para asignar una licencia:
1. Vaya a {{< ui >}}Plan & Usage{{< /ui >}} → {{< ui >}}Seat Management{{< /ui >}}.
2. Seleccione la pestaña del producto relevante: {{< ui >}}Incident Management{{< /ui >}}, {{< ui >}}On-Call{{< /ui >}} o {{< ui >}}Incident Response{{< /ui >}}.
3. Haga clic en {{< ui >}}Assign Seats{{< /ui >}}.
4. Busque usuarios por nombre o correo electrónico y selecciónelos.
5. Haga clic en {{< ui >}}Assign Seats{{< /ui >}}.

Los usuarios a quienes se les asignó una licencia aparecen inmediatamente en la tabla Seats y pueden acceder a las funciones del producto. 

### Desasignar licencias {#unassign-seats}

Para desasignar usuarios y liberar licencias: 
1. En la tabla Seats, marque la casilla junto a uno o más usuarios.
2. Haga clic en {{< ui >}}Unassign Seats{{< /ui >}}.
3. Confirme su selección.

Después de que se desasigna al usuario, este pierde acceso a las funciones que requieren una licencia. Todavía puede realizar las siguientes acciones:
- Crear incidentes
- Ver incidentes
- Unirse a canales de incidentes

### Reclamar una licencia {#claim-a-seat}

Cuando intenta realizar una acción que requiere una licencia (como unirse a un horario de On-Call, actualizar un incidente o agregar información a la línea de tiempo de un incidente), Datadog le solicita que reclame una licencia. Para reclamar una licencia se requiere al menos uno de los siguientes permisos: `billing_read`, `on_call_read` o `incident_read`.

Después de reclamar una licencia, los siguientes elementos cambian en Datadog:
- Obtiene acceso inmediato a las funciones del producto que necesita (por ejemplo, recibir avisos de guardia o gestionar incidentes).
- La página Seat Management de su organización muestra su asignación de asiento.

Si su organización tiene asientos comprometidos disponibles, usted ocupa uno de ellos. Si todos los asientos comprometidos ya están en uso, la nueva asignación se realiza correctamente, pero el asiento adicional cuenta como un asiento bajo demanda. 

Solo necesita reclamar un asiento una vez. Después de que se asigna un asiento, usted continúa teniendo acceso hasta que un administrador de facturación lo desasigne.

## Facturación y excedentes {#billing-and-overages}

Datadog factura On-Call, Incident Management e Incident Response según el número total de asientos en uso durante cada periodo de facturación. 

Cada periodo de facturación refleja el número máximo de asientos asignados simultáneamente en toda su organización para ese producto. Su contrato incluye un número comprometido de asientos, y cualquier uso que exceda esa cantidad se factura a su tarifa bajo demanda. 

Después de que un usuario reclama un asiento, este permanece activo y se factura mes a mes hasta que se desasigna. Si se elimina a un usuario durante un mes determinado, el asiento sigue siendo facturable durante ese mes. En el ciclo de facturación del mes siguiente, el asiento ya no aparecerá.

Puede agregar o eliminar licencias de asiento en cualquier momento. Eliminar a un usuario antes del final de un periodo de facturación evita cargos futuros por ese asiento.

### Ejemplo {#example}

- Su contrato incluye 182 asientos comprometidos.
- El uso máximo de su organización durante el mes fue de 190 asientos.

Su factura mensual contiene lo siguiente:
- 182 asientos se facturan a su tarifa comprometida.
- 8 asientos se facturan a su tarifa bajo demanda para ese ciclo de facturación.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/incident_response/incident_management/
[2]: /es/incident_response/on-call/
[3]: https://www.datadoghq.com/pricing/?product=incident-response#products
[4]: https://app.datadoghq.com/billing/seats
[5]: /es/incident_response/on-call/schedules/
[6]: /es/incident_response/on-call/escalation_policies/
[7]: /es/incident_response/on-call/notification_preferences/#notification-preferences
[8]: /es/incident_response/incident_management/investigate/timeline
[9]: https://app.datadoghq.com/on-call/settings/notifications-preferences-admin
[10]: /es/api/latest/on-call