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
  text: Páginas de estado
title: Facturación de Incident Response
---

## Información general

Las SKU de [Incident Management][1], [On-Call][2], and Incident Response de Datadog utilizan un modelo de facturación basado en el número de puestos.

Las organizaciones tienen dos opciones para la facturación de la respuesta a incidentes:
- Incident Management u On-Call como SKU separadas, cada una facturada individualmente.
- El paquete de Incident Response, que unifica la facturación de Incident Management y On-Call en una única SKU.

Cada producto se factura por puesto, por lo que cada usuario que realice acciones cualificadas requiere una licencia de puesto. Para obtener información detallada sobre precios, consulta la [página de precios de Incident Response][3].

Visualiza y gestiona el uso de puestos de cada producto en la sección [Gestión de puestos][4] de la página Plan y uso de Datadog.

## Asignación de puestos

Un **puesto** es una licencia para que un usuario participe activamente en el proceso de gestión de incidentes o de guardia en Datadog.

Cualquier usuario puede reclamar un puesto de On-Call, Incident Management o Incident Response a medida que realiza acciones que requieren un puesto. Los administradores de facturación también pueden asignar puestos con antelación para simplificar el proceso a sus equipos.

Un usuario necesita un **puesto de On-Call** si realiza alguna de las siguientes acciones:
- Es parte de un [cronograma de guardia][5]
- Se incluye en una [política de escalado][6]
- Ha configurado [preferencias de notificación][7] para recibir páginas

En el producto On-Call, un usuario no necesita un puesto para ver páginas existentes, políticas de escalado, equipos o cronogramas.

Un usuario necesita un puesto de **incident Management** si realiza alguna de las siguientes acciones que requieren un puesto tanto si se realizan en la interfaz de usuario de Datadog como a través de integraciones como Microsoft Teams o Slack:
- Modifica un incidente (por ejemplo, actualiza la gravedad)
- Borra un incidente
- Añade un comentario, un gráfico o un enlace a una cronología de incidentes 
- Asigna una tarea a un usuario dentro de un incidente (la persona asignada no necesita un puesto)
- Asigna un respondedor a un rol definido por el usuario dentro de un incidente (la persona asignada debe tener un puesto)

En Incident Management, un usuario no necesita un puesto para crear incidentes, visualizar incidentes o unirse a canales de incidentes. Los comentarios en Slack, incluida la publicación de mensajes que se sincronizan con la cronología de un incidente, tampoco requieren un puesto. Solo las acciones realizadas a través de la aplicación Datadog en Slack, como el uso de los botones de acción o la interacción con @Datadog, activan una solicitud de puesto.

Si tu organización se ha comprometido con la SKU de Incident Response, cualquier usuario que cumpla los criterios de On-Call o Incident Management puede solicitar o se le puede asignar un **puesto de Incident Response**.

### Uso de páginas de estado

Todos los clientes de pago de Datadog pueden utilizar las páginas de estado. El acceso depende de si tu organización tiene un puesto confirmado en Incident Management o incident Response:
- **Con al menos un puesto confirmado**: Acceso completo, incluyendo páginas ilimitadas y dominios personalizados.
- **Sin puestos confirmados**: Limitado a una página de estado y sin compatibilidad con dominios personalizados.

## Gestión de puestos

La [página Gestión de puestos][1] ofrece a los administradores de facturación una visibilidad y un control de los usuarios que ocupan asientos del paquete de Incident Management, On-Call o Incident Response.

La página Gestión de puestos contiene pestañas para cada producto habilitado en tu organización. Dependiendo de tu contrato, puedes ver uno de los siguientes:
- Pestañas separadas de Incident Management y On-Call
- Una única pestaña de incident Response (si utilizas el SKU del paquete)

Cada pestaña incluye:
- Una cabecera que muestra el total de puestos en uso y el número de puestos confirmados (por ejemplo, 130 de 180 puestos en uso).
- Una tabla con la lista de todos los usuarios que ocupan puestos, incluyendo:
    - Nombre
    - Correo electrónico
    - Fecha de actualización (cuando se ha asignado un puesto al usuario)

También puedes encontrar usuarios buscando por nombre, correo electrónico o equipo.

Los administradores de On-Call también pueden utilizar la [página de configuración de preferencias de notificación][9] para ver a qué cronogramas o políticas de escalado pertenece un usuario y eliminar las preferencias de notificación de ese usuario si es necesario. 

La eliminación de las preferencias de notificación de un usuario no desasigna su puesto. Si un usuario ya no debe ocupar un puesto, debes desasignarlo explícitamente desde la página de gestión de puestos.

### Asignación de puestos

Los administradores de facturación o los usuarios con el permiso `billing_edit`, pueden asignar puestos manualmente para que los miembros del equipo tengan acceso antes de que lo necesiten.

Para asignar un puesto:
1. Ve a **Plan & Usage** → **Seat Management** (Plan y uso → Gestión de puestos).
2. Selecciona la pestaña del producto correspondiente: **Incident Management**, **On-Call** o **Incident Response**.
3. Haz clic en **Assign Seats** (Asignar puestos).
4. Busca usuarios por nombre o correo electrónico y selecciónalos.
5. Haz clic en **Assign Seats** (Asignar puestos).

Los usuarios asignados aparecen inmediatamente en la tabla Seats (Puestos) y pueden acceder a las funciones del producto. 

### Desasignación de puestos

Para eliminar usuarios y liberar puestos: 
1. En la tabla Seats (Puestos), marca la o las casillas situadas junto a uno o varios usuarios.
2. Haz clic en **Deassign Seats** (Desasignar puestos).
3. Confirma tu selección.

Una vez desasignado, el usuario pierde el acceso a las funciones que requieren un puesto, pero podrá seguir realizando las siguientes acciones:
- Crear incidentes
- Visualizar incidentes
- Unirse a canales de incidentes

### Solicitar un puesto

Cuando intentas realizar una acción que requiere un puesto (como unirse a un cronograma de On-Call, actualizar un incidente o añadir información a una cronología de incidentes, Datadog te pedirá que solicites un puesto. Para solicitar un puesto se requiere al menos uno de los siguientes permisos: `billing_read` `on_call_read` o `incident_read`.

Después de solicitar un puesto, cambia lo siguiente en Datadog:
- Obtienes acceso inmediato a las funciones del producto que necesitas (por ejemplo, recepción de páginas o gestión de incidentes).
- La página Gestión de puestos de tu organización muestra tu asignación de puestos.

Si tu organización dispone de puestos confirmados, tú ocuparás uno de ellos. Si todos los puestos confirmados ya están ocupados, la nueva asignación se realiza correctamente, pero el puesto adicional cuenta como puesto bajo demanda.

Solo necesitas solicitar un puesto una vez. Una vez asignado un puesto, seguirás teniendo acceso hasta que un administrador de facturación lo anule.

## Facturación y excesos

Datadog factura los servicios de On-Call, Incident Management e Incident Response en función del número total de puestos utilizados durante cada periodo de facturación. 

Cada periodo de facturación refleja el número máximo de puestos asignados simultáneamente en tu organización para ese producto. Tu contrato incluye un número confirmado de puestos, y cualquier uso que supere esa cantidad se facturará según tu tarifa bajo demanda. 

Una vez de que un usuario solicita un puesto, este permanece activo y se factura mes a mes hasta que se desasigna. Si se elimina un usuario durante un mes determinado, el puesto sigue siendo facturable ese mes. En el ciclo de facturación del mes siguiente, el puesto ya no aparecerá.

Puedes añadir o eliminar licencias de puestos en cualquier momento. La eliminación de un usuario antes del final de un periodo de facturación evita futuros cargos por ese puesto.

### Ejemplo

- Tu contrato incluye 182 puestos confirmados.
- El uso máximo de tu organización durante el mes ha sido de 190 puestos.

Tu factura mensual contiene lo siguiente:
- Existen 182 puestos que se facturan a tu tarifa confirmada.
- Existen 8 puestos que se facturan a tu tarifa bajo demanda para ese ciclo de facturación.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/incident_response/incident_management/
[2]: /es/incident_response/on-call/
[3]: https://www.datadoghq.com/pricing/?product=incident-response#products
[4]: https://app.datadoghq.com/billing/seats
[5]: /es/incident_response/on-call/schedules/
[6]: /es/incident_response/on-call/escalation_policies/
[7]: /es/incident_response/on-call/profile_settings/#notification-preferences
[8]: /es/incident_response/incident_management/investigate/timeline
[9]: https://app.datadoghq.com/on-call/settings/notifications-preferences-admin