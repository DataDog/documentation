---
disable_toc: false
title: Control de acceso
---

## Información general

Datadog utiliza el control de acceso basado en roles (RBAC). Esto permite definir el nivel de acceso de los usuarios a los distintos recursos de Datadog. Los usuarios son asignados a roles que definen sus permisos de cuenta, incluyendo qué datos pueden leer y qué activos de cuenta pueden modificar. Cuando se conceden [permisos](#permissions) para un rol, cualquier usuario asociado a ese rol recibe esos permisos. Consulta [Control de acceso basado en roles][1] para obtener más información.

El [control de acceso detallado](#granular-access-control) te permite restringir el acceso a recursos individuales por roles, [Teams][2], o usuarios. Para Observability Pipelines, puedes [restringir el acceso a un pipeline](#restrict-access-to-a-pipeline) o [restringir el acceso a Live Capture para un pipeline](#restrict-access-to-live-capture-for-a-pipeline).

## Permisos

Consulta la [lista de permisos][3] para conocer los activos de Observability Pipelines y qué niveles de permisos incluyen los roles predeterminados de Datadog.

## Control de acceso preciso

El [control de acceso detallado][4] solo puede restringir el acceso a los recursos y **no** eleva los permisos. Por ejemplo, si un usuario tiene el **rol de solo lectura de Datadog** y se te da el acceso **Editor** para un pipeline específico usando el control de acceso detallado, el usuario solo tiene acceso de solo lectura a este pipeline y no puede editarlo. Necesitas actualizar su rol a uno que permita la edición de pipelines si quieres que puedan hacer cambios a este pipeline y otros pipelines.

### Restringir el acceso a un pipeline

Puedes restringir el acceso a un pipeline específico con las siguientes opciones de rol:

| Rol | Ver pipeline | Editar pipeline | Desplegar pipeline | Eliminar pipeline | Puedes restringir el acceso a pipeline |
|:----:|:-------------:|:-------------:|:---------------:|:---------------:|:--------------------------:|
| Editor | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Ejecutor | {{< X >}} | {{< X >}} | {{< X >}} |  |  |
| Colaborador* | {{< X >}} | {{< X >}} |  |  |  |
| Visor | {{< X >}} |  |  |  |  |
| Sin acceso |  |  |  |  |  |

*El colaborador solo puede editar la configuración de pipeline cuando el pipeline está en modo borrador y aún no se ha desplegado.

**Notas**:

- No puedes guardar la configuración de acceso detallado si no hay al menos un usuario con acceso de Editor en pipeline.
- Puedes bloquearte a ti mismo de un pipeline aunque lo hayas creado. Cuando edites restricciones de acceso detallado para el acceso a un pipeline y quieras seguir teniendo acceso de Editor para el pipeline, asegúrate de que eres uno de los usuarios o parte de un equipo o rol con acceso de Editor.

Para utilizar controles de acceso detallados para limitar el acceso a un pipeline específico:

1. Navega hasta la página [Pipelines][5].
1. Selecciona el pipeline al que deseas restringir el acceso.
1. Haz clic en el engranaje situado en la parte superior derecha de la página.
1. Haz clic en **Edit Access** > **Pipeline Access** (Editar acceso > Acceso de pipeline).
1. Haz clic en **Restrict Access** (Restringir el acceso).
1. La sección **Organization access** (Acceso a la organización) muestra que los miembros de tu organización tienen acceso de **Viewer** (Visor) por defecto. Utiliza el menú desplegable para seleccionar qué tipo de acceso deseas que tengan.
1. Haz clic en el menú desplegable de la sección **Restricted** (Restringido) para establecer niveles de acceso para equipos, roles, usuarios o cuentas de servicio.
1. Haz clic en **Copy Link** (Copiar enlace) si deseas proporcionar el enlace del pipeline a los usuarios que accedan a este pipeline.
1. Haz clic en **Save** (Guardar).

Para restaurar el acceso completo a un pipeline:

1. Haz clic en el engranaje situado en la parte superior derecha de la página de tu pipeline.
1. Haz clic en **Edit Access** > **Pipeline Access** (Editar acceso > Acceso de pipeline).
1. Haz clic en **Restore Full Access** (Restablecer acceso completo).
1. Haz clic en **Save** (Guardar).

### Restringir el acceso a Live Capture para un pipeline

[Live Capture][6] te permite:

- Ver los datos que una fuente envía a los pipelines.
- Ver los datos que recibe un procesador.
- Ver los datos que un procesador envía al destino.

Puedes restringir el acceso a Live Capture **para un pipeline específico** con las siguientes opciones:

| Rol | Ver eventos capturados | Ejecutar nuevas capturas | Restringir el acceso a Live Capture |
|:----:|:--------------------:|:----------------:|:-------------------------------:|
| Editor | {{< X >}} | {{< X >}} | {{< X >}} |
| Visor | {{< X >}} |  |  |
| Sin acceso |  |  |  |

**Notas**:

- No puedes guardar la configuración de acceso detallado si no hay al menos un usuario con acceso **Editor** a Live Capture.
- Puedes bloquearte a ti mismo el acceso a Live Capture para un pipeline específico aunque hayas creado el pipeline. Cuando edites las restricciones de acceso detallado para el acceso a Live Capture y desees tener acceso de Editor para Live Capture, asegúrate de que es uno de los usuarios o forma parte de un equipo o rol con acceso de Editor.

Para utilizar controles de acceso detallado para limitar el acceso a Live Capture para un pipeline específico:

1. Navega hasta la página [Pipelines][6].
1. Selecciona el pipeline al que deseas restringir el acceso.
1. Haz clic en el engranaje situado en la parte superior derecha de la página.
1. Haz clic en **Edit Access** > **Live Capture Access** (Editar acceso > Acceso de Live Capture).
1. Haz clic en **Restrict Access** (Restringir el acceso).
1. La sección **Organization access** (Acceso a la organización) muestra que los miembros de tu organización tienen acceso de **Viewer** (Visor) por defecto. Utiliza el menú desplegable para seleccionar qué tipo de acceso deseas que tengan.
1. Haz clic en el menú desplegable de la sección **Restricted** (Restringido) para establecer niveles de acceso para equipos, roles, usuarios o cuentas de servicio según tu caso de uso.
1. Haz clic en **Save** (Guardar).

Para restaurar el acceso completo a Live Capture para un pipeline:

1. Haz clic en el engranaje situado en la parte superior derecha de la página de tu pipeline.
1. Haz clic en **Edit Access** > **Live Capture Access** (Editar acceso > Acceso de Live Capture).
1. Haz clic en **Restore Full Access** (Restablecer acceso completo).
1. Haz clic en **Save** (Guardar).

[1]: /es/account_management/rbac/?tab=datadogapplication#role-based-access-control
[2]: /es/account_management/teams/
[3]: /es/account_management/rbac/permissions/#observability-pipelines
[4]: /es/account_management/rbac/granular_access/
[5]: https://app.datadoghq.com/observability-pipelines
[6]: /es/observability_pipelines/live_capture/