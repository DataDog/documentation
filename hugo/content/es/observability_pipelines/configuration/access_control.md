---
aliases:
- /es/observability_pipelines/access_control/
description: Aprenda a utilizar el control de acceso basado en roles y granular para
  restringir quién puede visualizar, editar, implementar o eliminar configuraciones
  de Observability Pipelines y Live Capture.
disable_toc: false
title: Access Control
---
## Descripción general {#overview}

El sistema de gestión de acceso de Datadog utiliza el control de acceso basado en roles (RBAC). Esto le permite definir el nivel de acceso que tienen los usuarios a los diferentes recursos de Datadog. Los usuarios se asignan a roles que definen sus permisos de cuenta, incluidos qué datos pueden leer y qué activos de la cuenta pueden modificar. Cuando se otorgan [permisos](#permissions) para un rol, cualquier usuario asociado con ese rol recibe dichos permisos. Consulte [control de acceso basado en roles][1] para obtener más información.

[Control de acceso granular](#granular-access-control) le permite restringir el acceso a recursos individuales por roles, [Teams][2], o usuarios. Para Observability Pipelines, puede [restringir el acceso a un Pipeline](#restrict-access-to-a-pipeline) o [restringir el acceso a Live Capture para un Pipeline](#restrict-access-to-live-capture-for-a-pipeline).

## Permisos {#permissions}

Consulte la [lista de permisos][3] para los activos de Observability Pipelines y qué niveles de permisos incluyen los roles predeterminados de Datadog.

## Control de acceso granular {#granular-access-control}

El [Granular access control][4] solo puede restringir el acceso a los recursos y **no** eleva los permisos. Por ejemplo, si un usuario tiene el **Datadog Read Only Role** y se le otorga el {{< ui >}}Editor{{< /ui >}} acceso para un Pipeline específico mediante el control de acceso granular, el usuario sigue teniendo solo acceso de solo lectura a este Pipeline y no puede editarlo. Debe actualizar su rol a uno que permita la edición de Pipelines si desea que pueda realizar cambios en este Pipeline y en otros Pipelines.

{{< img src="observability_pipelines/access_control/menu.png" alt="La página de Pipeline que muestra el menú de Access Control" style="width:40%;" >}}

### Restringir el acceso a un Pipeline {#restrict-access-to-a-pipeline}

Puede restringir el acceso a un Pipeline específico con las siguientes opciones de rol:

| Rol | Visualizar Pipeline | Editar Pipeline | Implementar Pipeline | Eliminar Pipeline | Puede restringir el acceso a Pipeline |
|:----:|:-------------:|:-------------:|:---------------:|:---------------:|:--------------------------:|
| Editor | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Runner | {{< X >}} | {{< X >}} | {{< X >}} |  |  |
| Contributor* | {{< X >}} | {{< X >}} |  |  |  |
| Viewer | {{< X >}} |  |  |  |  |
| No Access |  |  |  |  |  |

*Contributor solo puede editar la configuración de Pipeline cuando el Pipeline está en modo borrador y aún no se ha implementado.

**Notas**:

- No puede guardar la configuración de acceso granular si no hay al menos un usuario con acceso de Editor al Pipeline.
- Puede bloquear su propio acceso a un Pipeline incluso si usted lo creó. Cuando edite las restricciones de acceso granular para el acceso a un Pipeline y desee seguir teniendo acceso de Editor para el Pipeline, asegúrese de ser uno de los usuarios o formar parte de un Team o rol con acceso de Editor.

{{< img src="observability_pipelines/access_control/pipeline_modal.png" alt="El modal de control de acceso a un Pipeline que muestra las opciones de restricción" style="width:60%;" >}}

Para usar controles de acceso granular para limitar el acceso a un Pipeline específico:

1. Vaya a la página [Pipelines][5].
1. Seleccione el Pipeline al que desea restringir el acceso.
1. Haga clic en el engranaje en la parte superior derecha de la página.
1. Haga clic en {{< ui >}}Edit Access{{< /ui >}} > {{< ui >}}Pipeline Access{{< /ui >}}.
1. Haga clic en {{< ui >}}Restrict Access{{< /ui >}}.
1. La sección {{< ui >}}Organization access{{< /ui >}} muestra que los miembros de su organización tienen acceso de {{< ui >}}Viewer{{< /ui >}} de forma predeterminada. Use el menú desplegable para seleccionar qué tipo de acceso desea que tengan.
1. Haga clic en el menú desplegable en la sección {{< ui >}}Restricted{{< /ui >}} para establecer niveles de acceso para Teams, roles, usuarios o cuentas de servicio.
1. Haga clic en {{< ui >}}Copy Link{{< /ui >}} si desea proporcionar el enlace del Pipeline a los usuarios que obtendrán acceso a este Pipeline.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

Para restaurar el acceso completo a un Pipeline:

1. Haga clic en el engranaje en la parte superior derecha de la página de su Pipeline.
1. Haga clic en {{< ui >}}Edit Access{{< /ui >}} > {{< ui >}}Pipeline Access{{< /ui >}}.
1. Haga clic en {{< ui >}}Restore Full Access{{< /ui >}}.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

### Restringir el acceso a Live Capture para un Pipeline {#restrict-access-to-live-capture-for-a-pipeline}

[Live Capture][6] le permite:

- Ver los datos que una fuente envía a los Pipelines.
- Ver los datos que recibe un procesador.
- Ver los datos que un procesador envía al destino.

Puede restringir el acceso a Live Capture **para un Pipeline específico** con las siguientes opciones:

| Rol | Visualizar eventos capturados | Ejecutar nuevas capturas | Restringir el acceso a Live Capture |
|:----:|:--------------------:|:----------------:|:-------------------------------:|
| Editor | {{< X >}} | {{< X >}} | {{< X >}} |
| Viewer | {{< X >}} |  |  |
| No Access |  |  |  |

**Notas**:

- No puede guardar configuraciones de acceso granular si no hay al menos un usuario con acceso {{< ui >}}Editor{{< /ui >}} a Live Capture.
- Puede bloquearse a sí mismo el acceso a Live Capture para un Pipeline específico, incluso si usted creó el Pipeline. Cuando edite las restricciones de acceso granular para el acceso a Live Capture y desee tener acceso de Editor para Live Capture, asegúrese de ser uno de los usuarios o de formar parte de un Team o rol con acceso de Editor.

{{< img src="observability_pipelines/access_control/live_capture_modal.png" alt="El modal de control de acceso a un Pipeline que muestra las opciones de restricción" style="width:60%;" >}}

Para usar controles de acceso granular para limitar el acceso a Live Capture para un Pipeline específico:

1. Navegue a la página [Pipelines][6].
1. Seleccione el Pipeline al que desea restringir el acceso.
1. Haga clic en el engranaje en la parte superior derecha de la página.
1. Haga clic en {{< ui >}}Edit Access{{< /ui >}} > {{< ui >}}Live Capture Access{{< /ui >}}.
1. Haga clic en {{< ui >}}Restrict Access{{< /ui >}}.
1. La sección {{< ui >}}Organization access{{< /ui >}} muestra que los miembros de su organización tienen acceso de {{< ui >}}Viewer{{< /ui >}} de forma predeterminada. Use el menú desplegable para seleccionar qué tipo de acceso desea que tengan.
1. Haga clic en el menú desplegable en la sección {{< ui >}}Restricted{{< /ui >}} para establecer niveles de acceso para Teams, roles, usuarios o cuentas de servicio según su caso de uso.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

Para restaurar el acceso completo a Live Capture para un Pipeline:

1. Haga clic en el engranaje en la parte superior derecha de la página de su Pipeline.
1. Haga clic en {{< ui >}}Edit Access{{< /ui >}} > {{< ui >}}Live Capture Access{{< /ui >}}.
1. Haga clic en {{< ui >}}Restore Full Access{{< /ui >}}.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

[1]: /es/account_management/rbac/?tab=datadogapplication#role-based-access-control
[2]: /es/account_management/teams/
[3]: /es/account_management/rbac/permissions/#observability-pipelines
[4]: /es/account_management/rbac/granular_access/
[5]: https://app.datadoghq.com/observability-pipelines
[6]: /es/observability_pipelines/live_capture/