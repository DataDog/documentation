---
disable_toc: false
further_reading:
- link: /dashboards/
  tag: documentation
  text: Información general sobre dashboards
- link: /account_management/audit_trail/
  tag: documentation
  text: Información general sobre Audit Trail
- link: https://www.datadoghq.com/blog/dashboards-notebooks-version-history/
  tag: blog
  text: Realizar un seguimiento de cambios en dashboards y notebooks de Datadog con
    el historial de versiones
title: Historial de versiones de dashboards
---

## Información general
El historial de versiones rastrea automáticamente los cambios realizados en tus dashboards y guarda las versiones anteriores para que puedas ver exactamente qué se ha cambiado y quién lo ha hecho. Puedes ver las versiones anteriores, restaurar tu dashboard a cualquier versión guardada o clonar una versión para crear un nuevo dashboard.

## Requisitos previos
Todos los dashboards conservan por defecto un historial de versiones de 30 días. Para poder ver las versiones anteriores, debe realizarse una edición durante los últimos 30 días. 

Con [Audit Trail][1] habilitado, el historial de versiones se amplía de 30 a 90 días. Una vez que Audit Trail esté habilitado, podrás ver todas las ediciones realizadas durante los últimos 30 a 90 días en todos los dashboards existentes. 

## Ver versiones
Desde un dashboard individual, haz clic en **Configure** (Configurar), en la parte superior derecha de la página, y selecciona **Version History** (Historial de versiones). Si no hay ediciones dentro del periodo de retención, se desactiva el historial de versiones.

{{< img src="/dashboards/guide/version_history/configure_actions_version_history.png" alt="Opción de historial de versiones deshabilitado en el menú Configure Actions (Configurar acciones) del dashboard" style="width:50%;" >}}

En el panel lateral del historial de versiones, para cada versión puedes ver:
- Qué usuario de Datadog ha realizado el cambio
- La fecha y hora del cambio
- Un resumen del cambio y una descripción detallada del cambio de la versión a su predecesora

## La vista previa de una versión
En el panel lateral del historial de versiones, haz clic en cualquier versión para obtener una vista previa del aspecto que tendría tu dashboard si decidieras restaurar a esa versión. Haz clic en cualquier versión para desplazarte hasta la ubicación del cambio y resaltar cualquier widget o celda que se haya modificado.

**Nota**: Al hacer clic en una versión para obtener una vista previa, no se guarda ningún cambio ni se afecta lo que ven los demás usuarios, hasta que decidas restaurar a esa versión.

## Restaurar una versión
Existen dos formas de restaurar tu dashboard a una versión anterior.

{{< img src="/dashboards/guide/version_history/dashboard_version_history_options.png" alt="Descripción de tu imagen" style="width:100%;" >}}

- En el panel lateral del historial de versiones, después de elegir la versión que quieres restaurar, haz clic en el menú de los tres puntos, situado a la derecha de un perfil de usuario, y selecciona **Restore this version** (Restaurar esta versión).
- Cuando se abre el panel lateral del historial de versiones, aparece un botón en la parte superior de la página para **Restore this version** (Restaurar esta versión).

Al restaurar una versión, el dashboard se actualiza a esa versión para todos los usuarios y se añade una nueva entrada al historial de versiones que muestra la restauración. Esta acción no anula tu historial de cambios, por lo que todavía puedes obtener vistas previas y restaurar a cualquier versión durante tu periodo de retención. 

## Clonar una versión
Si no quieres cambiar tu dashboard actual, pero te gustaría crear una copia de una versión anterior, puedes crear un clon a partir de cualquier versión de tu historial de versiones. En el panel lateral del historial de versiones, después de elegir la versión de la que deseas hacer una copia, haz clic en el menú en forma de los tres puntos, situado a la derecha de un perfil de usuario, y selecciona **Clone** (Clonar).

## Retención del historial de versiones

|                          | Período de conservación    |
| -----------------------  | ------- |
| Audit Trail **Deshabilitado** | 30 días |
| Audit Trail **Habilitado**  | 90 días |


[1]: /es/account_management/audit_trail/

## Leer más

{{< partial name="whats-next/whats-next.html" >}}