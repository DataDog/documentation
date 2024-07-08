---
further_reading:
- link: /sensitive_data_scanner/
  tag: Documentación
  text: Configurar Sensitive Data Scanner
- link: https://www.datadoghq.com/blog/scaling-sensitive-data-scanner/
  tag: Blog
  text: Descubre, clasifica y corrige los problemas de datos confidenciales a escala
    con Sensitive Data Scanner.
kind: documentation
title: Investigar problemas de datos confidenciales
---

## Información general

Sensitive Data Scanner es un servicio de búsqueda de patrones basado en flujos (stream) que se utiliza para identificar, etiquetar y, opcionalmente, redactar o extraer datos confidenciales. Cuando se detecta un problema de datos confidenciales, pueden surgir las siguientes preguntas:

- ¿Qué datos confidenciales se han expuesto?
- ¿Cuál es la prioridad de la exposición de datos confidenciales?
- ¿Cuál es la gravedad del problema en términos de difusión y volumen?
- ¿De dónde proceden los datos confidenciales?

La página [Resumen][1] de Sensitive Data Scanner clasifica y prioriza los problemas de datos confidenciales para que puedas investigar, colaborar y documentar tus hallazgos, y responder a esas preguntas.

{{<img src="sensitive_data_scanner/sds_summary_12_01_24.png" alt="The Sensitive Data Scanner summary page showing the number of sensitive data issues, the number of scanning rules enabled, and a list of issues" style="width:80%;">}}

## Analizar los problemas relacionados con datos confidenciales

Utiliza la página [Resumen][1] para ver todos los problemas de datos confidenciales dentro del marco temporal seleccionado y empezar a investigar los problemas.

En la sección **Sensitive Data Issue** (Problemas con datos sensibles), filtra por un nivel de prioridad para ver solo los problemas con ese nivel de prioridad en la sección **Issues Overview** (Resumen de problemas). En la sección **Cases** (Casos), filtra por un estado de caso para ver los problemas asociados a los casos con ese estado en la sección (Resumen de problemas).

Para investigar un problema:

1. Haz clic en el problema en **Issues Overview** (Resumen de problemas).
2. En el panel de problemas, haz clic en **View Recent Changes** (Ver cambios recientes) para navegar hasta [Audit Trail][4] y ver si hay algún cambio reciente en la configuración que haya causado el problema con los datos confidenciales.
3. Haz clic en **View All Logs** (Ver todos los logs) para ver en el Log Explorer todos los logs que coincidan con la consulta.
Haz clic en **View All APM Spans** (Ver todos los tramos de APM) para ver en el Trace Explorer todas las trazas que coincidan con la consulta.
Haz clic en **View All RUM Events** (Ver todos los eventos de RUM) para ver en el RUM Explorer todos los eventos que coincidan con la consulta.
Haz clic en **View All Events** (Ver todos los eventos) para ver en el Events Explorer todos los eventos que coincidan con la consulta.
{{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/issues_panel_02_01_2024.png" alt="El panel de problemas que muestra un problema crítico del Scanner con la tarjeta Visa" style="width:50%;">}}
4. En la sección **Blast Radius** (Radio de alcance):
    a. Ve los 10 principales servicios, hosts y entornos afectados por este problema de datos confidenciales.
    b. Haz clic en un servicio para ver más información sobre el servicio en el **Service Catalog** (Catálogo de servicios).
    c. Haz clic en un host para ver más información sobre el host en la página Infrastructure List (Lista de infraestructura).
{{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/blast_radius_02_01_2024.png" alt="El panel de problemas que muestra los 10 principales servicios afectados" style="width:50%;">}}
Si deseas modificar la regla de escaneo que se utilizó para detectar el problema de datos confidenciales, haz clic en **Modify Rule** (Modificar regla) en la parte superior del panel.

Además, también puedes:
- Utilizar [Gestión de casos][2] para rastrear, analizar e investigar el problema, haz clic en **Create Case** (Crear caso) en la parte superior del panel. Los casos asociados aparecen en la página Overview (Resumen).
- Utilizar [Gestión de incidencias][3] para crear una incidencia, puedes añadir el problema a una incidencia existente o declarar una nueva incidencia. Haz clic en el menú desplegable **Declare Incident** (Declarar incidencia) para añadir el problema a una incidencia existente. Haz clic en **Declare Incident** (Declarar incidencia) para declarar una nueva incidencia.
- Utilizar [Audit Trail][4] para ver quién puede haber accedido a estos datos confidenciales dentro de Datadog, **View in Audit Trail** (Ver en Audit Trail) en la sección **Users who accessed these events** (Usuarios que accedieron a estos eventos).

{{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/case_mgmt_02_01_2024.png" alt="La página del caso que muestra la información sobre el problema de seguridad, el encargado del caso y el creador, y una línea temporal de los eventos" style="width:60%;">}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/summary
[2]: /es/service_management/case_management/
[3]: /es/service_management/incident_management/
[4]: /es/account_management/audit_trail