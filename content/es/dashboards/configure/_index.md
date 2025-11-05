---
disable_toc: false
further_reading:
- link: /dashboards/
  tag: Documentación
  text: Información general sobre los dashboards
title: Configurar
---

## Información general

Los dashboards te proporcionan una visibilidad de tus datos en todos los productos de Datadog. Añade detalles y configuraciones para agilizar la resolución de los problemas y afinar tu enfoque en la información que estás visualizando.

Configura dashboards individuales para:
- [Añadir detalles e información descriptiva sobre lo que muestran los dashboards](#dashboard-details)
- [Ver acciones de configuración para personalizar la visualización de tu dashboard pantalla y visualizar actividades relacionadas con el dashboard](#configuration-actions)
- [Restringir el acceso a dashboards individuales mediante permisos](#permissions)
- [Personalizar vistas con variables de plantilla](#template-variables)

## Información del dashboard

Desde un dashboard individual, pasa el cursor sobre el título del dashboard para ver y editar los detalles del dashboard. Se abre un panel que muestra el título y el creador.

{{< img src="dashboards/suggested_dashboards.png" alt="Detalles del dashboard donde se resaltan el título editable, los dashboards sugeridos y las funciones del equipo" style="width:70%;" >}}

Actualiza las descripciones del dashboard compatibles con Markdown o asocia [equipos][1] a un dashboard:

1. Pasa el cursor sobre el título del dashboard. Se abre un panel desplegable.
1. Haz clic en el título o la descripción de dashboard para editarlos. 
1. Haz clic en el botón del tilde para cambiar el título.
1. Selecciona hasta cinco equipos en el menú desplegable **Teams** (Equipos).
1. (Opcional) Añade `[[suggested_dashboards]]` dentro de la descripción del dashboard para ver una lista de dashboards sugeridos. Estos dashboards se recomiendan en función de la actividad del usuario en tu organización y la frecuencia con la que los usuarios pasan de este dashboard a otros dashboards.

## Variables de plantilla

Las variables de plantilla te permiten centrar tus dashboards en un subconjunto concreto de hosts, contenedores o servicios basados en etiquetas (tags) o facetas. Consulta las [variables de plantilla][2] para aprender cómo:
 - Añadir y configurar variables de plantilla en dashboards
 - Aplicar variables de plantilla a widgets en dashboards
 - Utilizar variables de plantilla para crear vistas guardadas

## Acciones de configuración

Haz clic en **Configure** (Configurar) para abrir un menú con las opciones de configuración disponibles para tu dashboard, que incluyen:

| Configuración    | Descripción |
| ----------- | ----------- |
| Historial de versiones | Obtén vistas previas, restaura o clona el historial de versiones de tu dashboard. Para obtener más información, consulta la [guía del historial de versiones][3]. |
| Visualiza eventos de auditorías | Averigua quién está utilizando este dashboard dentro de tu organización. Como individuo, puedes ver un flujo (stream) de tus propias acciones. Para obtener más información, consulta [Datadog Audit Trail][4]. |
| Clonar un dashboard | Copia el dashboard completo en un nuevo dashboard. Se te pedirá que le asignes un nombre al clon. |
| Atajos de teclado | Consulta una lista de los atajos de teclado disponibles. |
| Mostrar la hora UTC | Alterna entre la hora UTC y la hora de tu zona horaria por defecto. |
| Aumentar la densidad | El modo de alta densidad muestra los widgets de grupo en un dashboard uno al lado del otro para incrementar la densidad de los widgets. Este modo se activa de forma predeterminada en las pantallas grandes para dashboards que utilizan widgets de grupo. |
| Modo TV | Alterna para mostrar las métricas de rendimiento clave en pantallas grandes o televisores. Para obtener más información, consulta [Uso del modo TV para dashboards][5]. |

### Notificaciones

Habilita el seguimiento de notificaciones para recibir notificaciones sobre los cambios en un dashboard. Cualquier usuario de la organización puede habilitarlo para sí mismo, independientemente de sus privilegios administrativos.

Cuando se activan las notificaciones para un dashboard, se crea un evento en el [explorador de eventos][6]. Este evento proporciona información sobre los cambios de texto, los cambios de widgets, la clonación de dashboards y la eliminación de dashboards, junto con el nombre del usuario que realiza la acción. Visualiza los eventos de cambios de un dashboard específico en el explorador de eventos mediante una búsqueda:

```text
tags:(audit AND dash) <DASHBOARD_NAME>
```

### Copiar, importar o exportar el JSON de un dashboard

Copia, importa o exporta un JSON de dashboard utilizando el icono de exportación (arriba a la derecha) con las siguientes opciones:

| Opción                          | Descripción                                                                                                                                                                |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Copy dashboard JSON (Copiar el JSON de un dashboard)   | Copia el JSON de un dashboard en tu portapapeles.                                                                                                                               |
| Import dashboard JSON (Importar el JSON de un dashboard) | Pega o importa tu JSON al dashboard. Esta opción sobrescribe todo el contenido del dashboard. Si ya tienes el JSON en el portapapeles, utiliza `Ctrl V` (`Cmd V` para Mac). |
| Export dashboard JSON (Exportar el JSON de un dashboard) | Descarga un archivo JSON que contenga el JSON de tu dashboard.                                                                                                                |

### Eliminar un dashboard

<div class="alert alert-danger">Los dashboards deben ser desprotegidos antes de ser eliminados.</div>

Utiliza esta opción para eliminar permanentemente tu dashboard. Utiliza la lista preconfigurada **Recently Deleted** (Eliminados recientemente) para restaurar los dashboards eliminados. Los dashboards de la lista **Recently Deleted** se eliminan permanentemente después de 30 días. Para obtener más información, consulta la documentación de [la lista de dashboards][7].

## Permisos

<div class="alert alert-info">Las restricciones de <em>visualización</em> en dashboards individuales están disponibles a petición de cualquier persona con un plan de pago. Ponte en contacto con tu equipo de cuentas o con el <a href="/help/">servicio de asistencia de Datadog</a> para activar esta función.</div>

{{< img src="dashboards/access_popup.png" alt="Cuadro de diálogo con menú desplegable que permite a los usuarios elegir un rol para acceder al dashboard." style="width:70%;">}}

Utiliza controles de acceso granulares para limitar los [roles][8] que pueden editar un determinado dashboard:
1. Mientras visualizas un dashboard, haz clic en el engranaje **Configure** (Configurar), en la parte superior derecha.
1. Selecciona **Permissions** (Permisos).
1. Haz clic en **Restrict Access** (Restringir el acceso).
1. El cuadro de diálogo se actualiza para mostrar que los miembros de tu organización tienen por omisión el permiso de acceso **Viewer** (Visualización).
1. Utiliza el menú desplegable para seleccionar una o varias funciones, o uno o varios equipos o usuarios que pueden editar el dashboard.
1. Haz clic en **Add** (Añadir).
1. El cuadro de diálogo se actualiza para indicar que el rol que has seleccionado tiene el permiso **Editor** (Edición).
1. Haz clic en **Save** (Guardar).

**Nota:** Para mantener tu acceso de edición del dashboard, el sistema necesita que incluyas al menos un rol del que seas miembro, antes de guardar. Para obtener más información sobre roles, consulta la [documentación de RBAC][8].

Para restablecer el acceso general a un dashboard con acceso restringido, sigue los pasos que se indican a continuación:
1. Mientras visualizas un dashboard, haz clic en el engranaje **Configure** (Configurar), en la parte superior derecha.
1. Selecciona **Permissions** (Permisos).
1. Haz clic en **Restore Full Access** (Restablecer acceso completo).
1. Haz clic en **Save** (Guardar).

Si el dashboard se creó con el parámetro ya obsoleto de "solo lectura", la lista de control de acceso se rellena previamente con una lista de roles que tienen el permiso de Gestión de acceso (`user_access_manage`).

Si gestionas tus dashboards con Terraform, puedes utilizar la última versión del proveedor Terraform de Datadog para controlar qué roles pueden editar tus dashboards. Para obtener más información, consulta la [guía de restricción de roles de dashboards de Terraform][9].

El indicador de acceso aparece en la parte superior derecha de cada dashboard con edición restringida. En función de tus permisos, el indicador puede decir **Gain Edit Access** (Obtener acceso de edición) o **Request Edit Access** (Solicitar acceso de edición). Haz clic en el indicador de acceso para conocer tus permisos de acceso y los pasos que debes seguir para editar el dashboard.


## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/teams/
[2]: /es/dashboards/template_variables/
[3]: /es/dashboards/guide/version_history/
[4]: /es/account_management/audit_trail/
[5]: /es/dashboards/guide/tv_mode
[6]: /es/events/
[7]: /es/dashboards/list
[8]: /es/account_management/rbac/
[9]: /es/dashboards/guide/how-to-use-terraform-to-restrict-dashboard-edit/