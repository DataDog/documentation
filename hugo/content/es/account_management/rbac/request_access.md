---
description: Permita que los usuarios soliciten el acceso que necesitan directamente
  desde una página de acceso denegado, con flujos de trabajo de aprobación manual
  o automática para los administradores.
further_reading:
- link: /account_management/rbac/permissions/
  tag: Documentación
  text: Permisos
- link: /account_management/rbac/granular_access/
  tag: Documentación
  text: Acceso granular
- link: /getting_started/access_for_enterprises/
  tag: Guía
  text: Acceso para empresas
title: Solicitar acceso
---
{{< callout url="#" btn_hidden="true" header="false" >}}
Solicitar acceso está en versión preliminar y se está implementando gradualmente. Es posible que aún no esté disponible en su organización.
{{< /callout >}}

## Descripción general {#overview}

Obtener acceso a una función en Datadog podría significar saber a quién preguntar, enviar un ticket y esperar una respuesta. Para las organizaciones que gestionan muchos roles y usuarios, esto ralentiza a los usuarios y crea trabajo manual para los administradores.

Solicitar acceso permite que un usuario pida el permiso que necesita directamente desde la página donde fue bloqueado, con una justificación para la solicitud. Los administradores pueden revisar y aprobar estas solicitudes desde una cola central, o configurar roles específicos para que se otorguen automáticamente. Cada solicitud, decisión y justificación aparece en [Audit Trail][2], por lo que los cambios de acceso permanecen rastreables sin necesidad de un ticket de soporte.

## Habilitar o deshabilitar Solicitar acceso {#enable-or-disable-request-access}

**Nota**: Debe tener el permiso `user_access_manage`.

Para habilitar las solicitudes de aprobación manual o automática para su organización, navegue a [Organization Settings][1] y seleccione {{< ui >}}Access Controls{{< /ui >}}, luego cree la configuración correspondiente. Consulte [Configuración de solicitudes de acceso como administrador](#configuring-access-requests-as-an-administrator) para obtener detalles de configuración.

Para deshabilitar las solicitudes de aprobación manual o automática, elimine todas las configuraciones correspondientes. La deshabilitación es especialmente relevante si usted gestiona el acceso a través de un proceso interno de elevación de acceso independiente.

## Solicitar acceso como usuario final {#requesting-access-as-an-end-user}

### Desde una página de acceso denegado {#from-a-permission-denied-page}

Cuando navega a una página que requiere un permiso que no tiene, Datadog muestra una página de permiso denegado 403. Si su organización tiene una configuración de aprobación manual o automática habilitada para un rol que incluye ese permiso, aparece un botón {{< ui >}}Request Access{{< /ui >}} en la página.

1. Haga clic en {{< ui >}}Request Access{{< /ui >}}.
2. Ingrese una justificación para la solicitud.
3. Envíe la solicitud.

Si existe una configuración de aprobación automática coincidente, Datadog otorga acceso en un minuto y le notifica. De lo contrario, Datadog envía la solicitud a los aprobadores de su organización para una revisión manual.

### Desde la página Roles {#from-the-roles-page}

También puede solicitar un rol directamente, sin llegar primero a una página de permiso denegado.

1. Navegue a [Organization Settings][1] y seleccione {{< ui >}}Roles{{< /ui >}}.
2. Busque el rol que desea y abra su panel de detalles.
3. Haga clic en {{< ui >}}Request Access{{< /ui >}}.
4. Ingrese una justificación y envíe.

Las solicitudes de rol directas siguen las mismas reglas de aprobación y aprobación automática que las solicitudes realizadas desde una página de permiso denegado.

### Para un activo {#for-an-asset}

También puede solicitar acceso a activos como monitores y tableros si su administrador ha configurado reglas de aprobación automática.

Para solicitar acceso a un activo individual, vaya al activo y haga clic en {{< ui >}}Request Access{{< /ui >}}. Si ya tiene acceso de visor y desea solicitar un nivel de permiso superior, abra la configuración de uso compartido existente para el activo en su lugar.

## Configuración de solicitudes de acceso como administrador {#configuring-access-requests-as-an-administrator}

Navegue a [Organization Settings][1] y seleccione {{< ui >}}Access Controls{{< /ui >}} para configurar y administrar todas las configuraciones de solicitud de acceso. Necesita el permiso `user_access_manage` para acceder a esta página.

### Aprobación manual {#manual-approval}

La aprobación manual escala una solicitud a una lista de aprobadores, quienes pueden aprobarla o denegarla. Su organización admite una configuración de aprobación manual, y habilitarla activa las solicitudes manuales para cada rol en la organización.

1. Navegue a [Organization Settings][1] y seleccione {{< ui >}}Access Controls{{< /ui >}}.
2. Cree una configuración de aprobación manual.
3. Seleccione los usuarios que pueden aprobar solicitudes. Solo los usuarios con el permiso `user_access_manage` son elegibles.

Si no designa aprobadores, cada usuario con `user_access_manage` aún puede aprobar o denegar solicitudes, pero ninguno de ellos recibe notificaciones por correo electrónico.

Los aprobadores revisan las solicitudes pendientes desde la pestaña {{< ui >}}Pending Requests{{< /ui >}} en la página de Controles de acceso, donde cada solicitud muestra al solicitante, el rol y la justificación del solicitante. Datadog envía un correo electrónico al solicitante después de que un aprobador toma una medida.

### Aprobación automática para roles y permisos {#auto-approval-for-roles-and-permissions}

La aprobación automática permite que los usuarios elegibles se desbloqueen inmediatamente, sin un paso de revisión manual.

1. Navegue a [Organization Settings][1] y seleccione {{< ui >}}Access Controls{{< /ui >}}.
2. Cree una configuración de aprobación automática. Su organización admite hasta 10 configuraciones.
3. Seleccione los roles que esta configuración aprueba automáticamente.
4. Opcionalmente, restrinja qué usuarios, equipos o roles pueden activar esta configuración. Si deja este campo vacío, la configuración se aplica a todos los usuarios.

### Acceso temporal (Vista previa) {#temporary-access-preview}

Una configuración de aprobación automática puede otorgar un rol por un tiempo limitado en lugar de permanentemente. Establezca la duración de la asignación cuando cree la configuración: 1 hora, 1 día, 1 semana, 30 días o permanente.

Cuando una asignación de rol temporal expira, Datadog la revoca en un plazo de 5 minutos. Puede ver las asignaciones de roles activas y próximas a expirar de un usuario desde su página de perfil, o desde [Organization Settings][1] en {{< ui >}}Users{{< /ui >}}.

### Aprobación automática para activos {#auto-approval-for-assets}

La aprobación automática de activos extiende el mismo modelo de autoservicio a recursos individuales. Su organización puede aprobar automáticamente el acceso de visualización o edición para los siguientes tipos de recursos:

- Proyectos de Case Management
- Tableros
- Monitors
- Notebooks
- Tablas de referencia
- Pruebas Synthetic
- Variables globales Synthetic
- Ubicaciones privadas Synthetic

Habilitar un tipo de recurso aplica la configuración a cada recurso de ese tipo. Al igual que la aprobación automática de roles y permisos, las configuraciones de aprobación automática de activos pueden limitarse a usuarios, equipos o roles específicos. Configure el alcance del solicitante por separado para cada nivel de acceso. Por ejemplo, puede permitir que todos los usuarios soliciten acceso de visualización a tableros mientras limita las solicitudes de acceso de edición a un equipo específico.

## Audit Trail {#audit-trail}

Datadog registra cada solicitud de acceso en [Audit Trail][2], incluyendo al solicitante, el rol o recurso solicitado, la justificación y el resultado. Utilice Audit Trail para revisar el historial de acceso sin depender del historial de tickets o chats.

## Cómo funciona la selección de roles {#how-role-selection-works}

Cuando un usuario solicita acceso debido a un permiso faltante, Datadog selecciona el rol que satisface el permiso requerido con la menor cantidad total de permisos. Si varios roles empatan en el conteo de permisos, Datadog elige el primero alfabéticamente. Este método de selección limita el aprovisionamiento excesivo sin requerir que un administrador asigne cada rol a cada posible escenario de acceso por adelantado.

## Limitaciones {#limitations}

- Su organización admite una configuración de aprobación manual y hasta 10 configuraciones de aprobación automática.
- Si ningún rol en su organización contiene el permiso requerido, el usuario no tiene opción de solicitar acceso para él.
- Las solicitudes otorgan un rol completo, no un solo permiso. Si necesita un control más preciso, cree un rol limitado solo a los permisos requeridos y establézcalo como la opción de aprobación automática o manual.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/
[2]: /es/account_management/audit_trail/