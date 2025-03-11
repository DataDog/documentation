---
aliases:
- /es/monitors/faq/how-to-update-anomaly-monitor-timezone
further_reading:
- link: /monitors/types/anomaly/
  tag: Documentación
  text: Crear un monitor de anomalía
- link: /monitors/notify/
  tag: Documentación
  text: Configurar notificaciones de monitor
title: Cómo actualizar un monitor de detección de anomalía para tener en cuenta la
  zona horaria local
---

Los monitores de Datadog utilizan la hora UTC, que por defecto no tiene en cuenta las zonas horarias locales. Según el tipo de sistema que tengas, tus datos podrían verse afectados por la actividad local que se produzcan en tu zona horaria. Por ejemplo, una sobrecarga en el almuerzo podría causar un pico en mitad del día, y este pico podría detectarse como una anomalía inesperada. Si recibes anomalías inesperadas causadas por la actividad local, actualiza tu monitor de detección de anomalía para tener en cuenta tu zona horaria local.

Si utilizas los algoritmos de detección de anomalías ágiles o robustos con estacionalidad semanal o diaria, puedes actualizar el monitor de detección de anomalías para tener en cuenta una zona horaria local utilizando tanto la API como la interfaz de usuario.

He aquí un ejemplo de monitor antes de que se ajuste para tener en cuenta una zona horaria local:

{{< img src="monitors/guide/dst-off.png" alt="Rastreo DST desactivado" >}}

He aquí un ejemplo de un monitor cuando se tiene en cuenta el horario de verano:

{{< img src="monitors/guide/dst-on.png" alt="Rastreo DST activado" >}}

## IU

Para actualizar un monitor de detección de anomalía para tener en cuenta una zona horaria local en la interfaz de usuario, ve a la sección [Create a new monitor][1] > [Anomaly monitor][2] (Crear un nuevo monitor > Monitor de anomalía) de la interfaz de usuario. En la sección 3, Set Alert Conditions (Establecer condiciones de alerta), abre el panel Advanced (Avanzado) y activa el interruptor para tener en cuenta el horario de verano al evaluar el monitor. A continuación, configura el menú desplegable de zona horaria para que coincida con la zona horaria que deseas rastrear.

{{< img src="monitors/guide/anomaly_monitor_timezone_ui.png" alt="Rastreo DST en la interfaz de usuario" >}}

## API

1. Necesitas la siguiente información para realizar la solicitud de actualización a través de la API del monitor:
  - Tu [clave de API y clave de aplicación de Datadog][3] para la autenticación
  - El ID de monitor y la consulta de tu monitor de detección de anomalía:
    {{< img src="monitors/guide/anomaly_monitor_timezone.png" alt="ID de monitor y consulta" >}}
  - La cadena de identificación TZ para la zona horaria relacionada con tu métrica, por ejemplo `America/New_York` o `Europe/Paris`. Localiza tu zona horaria preferida en la columna TZ de la [lista de zonas horarias de la base de datos tz][4] (formato canónico recomendado).<br><br>
2. Crea una versión actualizada de la consulta de monitor añadiendo un argumento `timezone` a la llamada de función anomalies().
  - Por ejemplo, si quisieras cambiar la consulta mostrada anteriormente para utilizar la hora local de Nueva York, la consulta se actualizaría a:

    ```
    avg(last_4h):anomalies(avg:system.cpu.user{role:trace-cassandra} by {host}, 'basic', 2, direction='both', alert_window='last_15m', interval=60, count_default_zero='true', timezone='America/New_York') >= 1
    ```

3. Utiliza la API [Editar un monitor][5] para actualizar la definición del monitor.
  - Hay ejemplos disponibles en Python, Ruby, y cURL.
  - Incluye solo el ID y la consulta en la solicitud para evitar anular la configuración existente. El nombre, el mensaje, las opciones y etiquetas (tags) no son necesarios.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#/create
[2]: https://app.datadoghq.com/monitors#create/anomaly
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[5]: /es/api/v1/monitors/#edit-a-monitor