---
aliases:
- /es/real_user_monitoring/session_replay/developer_tools
description: Descripción de las herramientas de desarrollo disponibles en Session
  Replay
further_reading:
- link: /real_user_monitoring/session_replay/browser
  tag: Documentación
  text: Session Replay de navegador
title: Herramientas de desarrollo de navegador en Session Replay
---

## Información general

Las herramientas de desarrollo de navegador de Session Replay son herramientas de depuración incorporadas que pueden ayudarte a solucionar problemas en tus aplicaciones. No necesitas realizar ninguna configuración para utilizar las herramientas de desarrollo de navegador.

## Herramientas de desarrollo de navegador

Para acceder a las herramientas de desarrollo de navegador, haz clic en el botón **Ir a la repetición** a la izquierda de una sesión, en la pestaña **Sesiones**, o haz clic en una sesión y luego en **Repetir sesión** en la esquina superior derecha del [Explorador RUM[1]. 

{{< img src="real_user_monitoring/session_replay/dev_tools/dev-tools-1.png" alt="Botón Herramientas de desarrollo" style="width:80%;">}}

El botón **Herramientas de desarrollo** aparece a la derecha del botón **Compartir**. Puedes ver datos de rendimiento, logs de consola, errores y atributos sobre tus repeticiones. 

### Rendimiento

En la pestaña **Rendimiento** se muestra una cascada de eventos (como acciones, errores, recursos y tareas prolongadas) y marcas de tiempo de una sesión.

Selecciona y aplica filtros como Nombre de la acción y Tipo de recurso para cambiar el contexto de los recursos y tipos de evento mostrados. También puedes arrastrar y soltar los controles deslizantes de la cascada para ampliar el intervalo de tiempo.

{{< img src="real_user_monitoring/session_replay/dev_tools/performance-filters-2.mp4" alt="Filtros de rendimiento" video="true" style="width:60%;">}}

### Consola

En la pestaña **Consola** se muestran todos los [logs recopilados del navegador web][2] y los errores de cada vista.

Haz clic en **Error**, **Advertencia**, **Información** y **Depurar** para filtrar tus logs en función de la gravedad. Para buscar estos logs en el [Explorador de logs][3], haz clic en **Ver en el Explorador de logs**.

{{< img src="real_user_monitoring/session_replay/dev_tools/dev-tools-console.png" alt="Vista de la consola en el botón Explorador de logs" style="width:50%;">}}

El Explorador de logs se abre en una pestaña separada, con una consulta de búsqueda precargada.

### Errores

En la pestaña **Errores** se muestran [Errores RUM][4] y problemas de [Seguimiento de errores][5] relacionados con la sesión.

{{< img src="real_user_monitoring/session_replay/dev_tools/dev-tools-errors.png" alt="Pestaña Errores" style="width:70%;">}}

### Atributos

En la pestaña **Atributos** se muestran todos los atributos relacionados con la sesión. Para obtener más información, consulta [Atributos predeterminados][6].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/explorer/
[2]: /es/logs/log_collection/javascript/
[3]: /es/logs/explorer/
[4]: /es/real_user_monitoring/browser/collecting_browser_errors/
[5]: /es/real_user_monitoring/error_tracking/
[6]: /es/real_user_monitoring/browser/data_collected/#default-attributes