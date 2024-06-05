---
disable_toc: false
further_reading:
- link: /notebooks/
  tag: documentation
  text: Información general sobre los notebooks
- link: /account_management/audit_trail/
  tag: documentation
  text: Información general sobre Audit Trail
- link: https://www.datadoghq.com/blog/dashboards-notebooks-version-history/
  tag: blog
  text: Realiza un seguimiento de los cambios en dashboards y notebooks de Datadog
    con el historial de versiones
kind: documentation
title: Historial de versiones de notebooks
---

## Información general
El historial de versiones rastrea automáticamente los cambios realizados en tus notebooks y guarda las versiones anteriores para que puedas ver exactamente qué se cambió y quién lo hizo. Puedes ver las versiones anteriores, restaurar tu notebook a cualquier versión guardada o clonar una versión para crear una nueva notebook.

## Requisitos previos
Por defecto, todos los notebooks tienen un periodo de conservación del historial de versiones de 30 días. Para poder ver las versiones anteriores, debes realizar una modificación dentro de los últimos 30 días. 

Con [Audit Trail][1] activado, el historial de versiones se amplía de 30 a 90 días. Una vez activado Audit Trail, podrás ver todas las modificaciones realizadas durante los últimos 30 a 90 días en todas las versiones de notebooks existentes. 

## Ver versiones
En un notebook, haz clic en el icono **Configure** (Configurar) y luego en **Version History** (Historial de versiones) para abrir el panel lateral del historial de versiones. Si no se realizaron modificaciones durante el periodo de conservación, la opción para consultar el historial de versiones estará desactivada.

{{< img src="/notebooks/guide/version_history/disabled_version_history.png" alt="Opción de consulta del historial de versiones de un notebook desactivada" style="width:100%;" >}}

En el panel lateral del historial de versiones, para cada versión puedes ver:
- Qué usuario de Datadog ha realizado el cambio
- Fecha y hora del cambio
- Un resumen del cambio y una descripción detallada del cambio de versión con respecto a la anterior

## Previsualizar una versión
En el panel lateral del historial de versiones, haz clic en una versión para previsualizar el aspecto que tendría tu notebook si decidieras restaurar esa versión. Haz clic en cualquier versión para desplazarte hasta la localización del cambio y resaltar los widgets o las celdas que se hayan modificado.

**Nota**: Hasta que decidas restaurar una versión, al hacer clic en cualquier versión para previsualizarla no se guarda ningún cambio ni se altera lo que ven los demás usuarios.

## Restaurar una versión
Existen dos formas de restaurar tu notebook a una versión anterior.

{{< img src="/notebooks/guide/version_history/version_history_options.png" alt="Ejemplo de notebooks que muestran las opciones para el historial de versiones" style="width:100%;" >}}

- En el panel lateral del historial de versiones, después de elegir la versión que quieres restaurar, haz clic en el menú con los tres puntos situado a la derecha del perfil de usuario y selecciona **Restore this version** (Restaurar esta versión).
- Cuando se abre el panel lateral del historial de versiones, aparece un botón en la parte superior de la página para **Restore this version** (Restaurar esta versión).

Al restaurar una versión, se actualiza el notebook a esa versión para todos los usuarios y se añade una nueva entrada al historial de versiones que muestra la restauración. Esto no sobrescribe el historial de tus cambios, por lo que todavía puedes previsualizar y restaurar cualquier versión dentro de tu periodo de conservación. 

## Clonar una versión
Si no quieres cambiar tu actual notebook pero te gustaría crear una copia de una versión anterior, puedes crear un clon a partir de cualquier versión de tu historial de versiones. En el panel lateral del historial de versiones, después de elegir la versión que quieres copiar, haz clic en el menú con los tres puntos situado a la derecha del perfil de usuario y selecciona **Clone** (Clonar).

## Conservación del historial de versiones

|                          | Período de conservación    |
| -----------------------  | ------- |
| Audit Trail **desactivado** | 30 días |
| Audit Trail **activado**  | 90 días |


[1]: /es/account_management/audit_trail/

## Leer más

{{< partial name="whats-next/whats-next.html" >}}