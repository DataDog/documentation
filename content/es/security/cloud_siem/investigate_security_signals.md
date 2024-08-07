---
disable_toc: false
further_reading:
- link: /cloud_siem/detection_rules/
  tag: Documentación
  text: Más información sobre la lógica condicional de las reglas de detección
- link: https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/
  tag: Blog
  text: Monitorizar 1Password con Datadog Cloud SIEM
title: Investigar las señales de seguridad
---

## Información general

Una señal de seguridad de Cloud SIEM se crea cuando Datadog detecta una amenaza al analizar logs con las reglas de detección. Visualiza, busca, filtra y correlaciona señales de seguridad en el Signal Explorer sin necesidad de aprender un lenguaje de consulta específico. También puedes asignarte señales de seguridad a ti mismo o a otro usuario en la plataforma de Datadog. Además del Signal Explorer, puedes configurar [Reglas de notificación][1] para enviar señales a personas o equipos específicos y mantenerlos informados de los problemas.

Debes tener el permiso `Security Signals Write` para modificar una señal de seguridad, como cambiar el estado y ver el historial de acciones de la señal en [Audit Trail][2]. Consulta [Control de acceso basado en roles][3] para obtener más información sobre los roles predeterminados de Datadog y los permisos detallados de control de acceso basados en roles disponibles para la seguridad de Datadog en la seguridad en la nube.

## Signal Explorer

En el Signal Explorer, utiliza el panel de facetas o la barra de búsqueda para agrupar y filtrar tus señales. Por ejemplo, puedes ver las señales por [su gravedad](#view-signals-by-severity), [reglas de detección](#view-signals-by-detection-rules) y [MITRE ATT&CK](#view-signals-by-mitre-attck). Una vez que hayas filtrado las señales según tu caso de uso, crea una [vista guardada][4] para poder recargar la consulta más adelante.

### Ver señales por gravedad

Para ver todas las señales con gravedades específicas, por ejemplo `HIGH` y `CRITICAL`, que están en el estado de triaje `open` o `under review`, realiza una de las siguientes acciones:

- En la sección **Severity** (Gravedad) del panel de facetas, selecciona **Crítico**, **Alto** y **Medio**. En la sección **Signal State** (Estado de la señal), asegúrate de que solo **open** (abierto) y **under_review** (en revisión) están seleccionados.
- En la barra de búsqueda, introduce `status:(high OR critical OR medium) @workflow.triage.state:(open OR under_review)`.

Para añadir la columna **Signal State** (Estado de la señal), selecciona el botón **Options** (Opciones) en la esquina superior derecha encima de la tabla y añade la faceta: `@workflow.triage.state`. Esto muestra el estado de la señal y te permite ordenar por estado con el encabezado.

Utiliza diferentes visualizaciones para investigar la actividad de las amenazas en tu entorno. Por ejemplo, en el campo **Visualize by** (Visualizar por), puedes agrupar las señales por:

- **Lista de reglas** para ver las tendencias de volumen y alertas en las diferentes reglas de detección.
- **Series temporales** para ver las tendencias de las señales a lo largo del tiempo.
- **Lista de principales** para ver las señales con mayor a menor número de ocurrencias.
- **Tabla** para ver las señales por la clave de etiqueta especificada (por ejemplo, `source`, `technique`, etc.).
- **Gráfico de torta** para ver el volumen relativo de cada una de las reglas de detección.

{{< img src="security/security_monitoring/investigate_security_signals/signal_list.png" alt="El Signal Explorer que muestra las señales categorizadas por las reglas de detección" style="width:100%;" >}}

### Ver señales por reglas de detección

Para ver tus señales basadas en reglas de detección, haz clic en **Lista de reglas** en el campo **Visualize as** (Visualizar como) en la barra de búsqueda. Haz clic en una regla para ver las señales relacionadas con esa regla. Haz clic en una señal para ver los detalles de la señal.

### Ver señales de MITRE ATT&CK

Para ver sus señales por Táctica y Técnica de MITRE ATT&CK:
1. Selecciona **Table** (Tabla) en el campo **Visualize as** (Visualizar como) de la barra de búsqueda y agrupa por **Tactic** (Táctica).
1. Haz clic en el icono más (+) situado junto al primer grupo `by` para añadir un segundo grupo `by` y selecciona **Technique** (Técnica) para él.
1. En la tabla, haz clic en una de las tácticas o técnicas para ver las opciones para investigar más a fondo y filtrar las señales. Por ejemplo, puedes ver las señales relacionadas con la táctica y la técnica y buscar o excluir tácticas y técnicas específicas.

## Clasificación de una señal o varias señales

1. Navega hasta [Cloud SIEM][5].
1. Haz clic en **Signals** (Señales).
1. Haz clic en una señal de seguridad de la tabla.
1. Para asignarte una señal a ti mismo o a otro usuario de Datadog, haz clic en el icono de perfil de usuario con el signo más (+) situado en la esquina superior izquierda del panel lateral de señales.
{{< img src="security/security_monitoring/investigate_security_signals/profile_icon.png" alt="El ícono de perfil al lado del estado de traje" style="width:45%;" >}}
1. Para actualizar el estado de triaje de la señal de seguridad, desplázate a la esquina superior izquierda del panel lateral de señales y selecciona el estado que desees en el menú desplegable. El estado por defecto es `OPEN`.
{{< img src="security/security_monitoring/investigate_security_signals/triage_status.png" alt="El ícono de perfil al lado del estado de traje" style="width:35%;" >}}
    - **Abierto**: la seguridad de Datadog activó una detección basada en una regla y la señal resultante aún no se ha resuelto.
    - **En revisión**: durante una investigación activa, puedes cambiar el estado de la señal a **Under Review** (En revisión). Desde el estado **Under Review** (En revisión), puedes mover el estado de la señal a **Archived** (Archivado) o **Open** (Abierto) según sea necesario.
    - **Archivado**: Cuando se haya resuelto la detección que causó la señal, puedes pasarla al estado **Archived** (Archivado). Si reaparece un problema archivado, o si es necesario seguir investigando, una señal puede volver al estado **Open** (Abierto) en un plazo de 30 días desde su creación.

Utiliza acciones en bloque para clasificar varias señales. Para utilizar acciones en bloque, primero busca y filtra tus señales en el Signal Explorer, y entonces:

1. Haz clic en la casilla de verificación situada a la izquierda de las señales sobre las que deseas realizar una acción masiva. Para seleccionar todas las señales en la lista del Signal Explorer, selecciona la casilla situada junto al encabezado de la columna **Status** (Estado).
1. Haz clic en el menú desplegable **Bulk Actions** (Acciones en bloque) situado encima de la tabla de señales y selecciona la acción que deseas realizar.

**Nota**: El Signals Explorer deja de actualizarse dinámicamente al realizar una acción en bloque.

{{< img src="security/security_monitoring/investigate_security_signals/bulk_actions.png" alt="El Signal Explorer que muestra la opción de acción en bloque" style="width:45%;" >}}

### Case Management

A veces se necesita más información que la disponible en una sola señal para investigarla. Utiliza [Case Management][6] para recopilar varias señales, crear calendarios, debatir con colegas y mantener un notebook del análisis y los hallazgos.

Para crear un caso a partir de una señal de seguridad:

1. Haz clic en el menú desplegable **Escalate Investigation** (Escalar investigación).
2. Selecciona **Create a case** (Crear un caso) para iniciar una investigación de seguridad.

**Nota**: Si se determina que un caso es crítico tras una investigación adicional, haz clic en **Declare Incident** (Declarar incidencia) en el caso para escalarlo a una incidencia.

### Declarar una incidencia

Ya sea a partir de una sola señal o tras la investigación de un caso, cierta actividad maliciosa exige una respuesta. Puedes declarar incidencias en Datadog para reunir a desarrolladores, operaciones y equipos de seguridad para abordar un evento de seguridad crítico. [Gestión de incidencias][7] proporciona un marco y un flujo de trabajo para que los equipos de ayuda identifiquen y mitiguen eficazmente las incidencias.

Para declarar una incidencia en el panel de señales:

1. Haz clic en el menú desplegable **Escalate Investigation** (Escalar investigación).
2. Selecciona **Declare Incident** (Declarar incidencia).
3. Rellena la plantilla de incidencias.

### Workflow Automation

Puedes activar un flujo de trabajo automáticamente para cualquier señal de seguridad. También puedes activar manualmente un flujo de trabajo desde una señal de seguridad de Cloud SIEM. Consulta [Activación de flujos de trabajo desde una señal de seguridad][8] y [Automatización de flujos de trabajo de seguridad con Workflow Automation][9] para obtener más información.

### Información sobre amenazas

Datadog Cloud SIEM ofrece información sobre amenazas integrada proporcionada por nuestros socios de información sobre amenazas. Estas fuentes se actualizan constantemente para incluir datos sobre actividades sospechosas conocidas (por ejemplo, direcciones IP que se sabe que utilizan actores maliciosos), de modo que puedas identificar rápidamente qué amenazas potenciales debes abordar.

Datadog mejora automáticamente todas los logs ingeridos con indicadores de peligro (IOC) procedentes de nuestras fuentes de información sobre amenazas. Si un log contiene una coincidencia con un IOC conocido, se añade un atributo `threat_intel` al evento de log para proporcionar información adicional basada en los datos disponibles.

La consulta para ver todas las coincidencias de información sobre amenazas en el Security Signals Explorer es `@threat_intel.indicators_matched:*`. Los siguientes son atributos adicionales para buscar información sobre amenazas:

- Para `@threat_intel.results.category`: attack, corp_vpn, cryptomining, malware, residential_proxy, tor, scanner
- Para `@threat_intel.results.intention`: malicious, suspicious, benign, unknown

{{< img src="security/security_monitoring/investigate_security_signals/threat_intel_results_categories.png" alt="El Signal Explorer que muestra un gráfico de barras de señales desglosadas por las categorías de información de amenazas residential proxy, corp_vpn, cryptomining y malware" style="width:80%;" >}}

Consulta la documentación de [Información de amenazas][10] para obtener más detalles sobre las fuentes de información de amenazas.

### Buscar mediante atributos de IP de red

Cuando se detecta una actividad sospechosa en tus logs, determina si el actor sospechoso ha interactuado con tus sistemas buscando su IP de red. Utiliza la siguiente consulta para buscar atributos de IP en el Log Explorer: `@network.ip.list:<IP address>`. La consulta busca IPs en cualquier lugar dentro de los logs, incluyendo los campos de etiquetas (tags), atributos, error y mensaje.

También puedes lanzar esta consulta directamente desde el panel de señales:
1. Haz clic en la dirección IP en la sección **Context** (Contexto).
2. Selecciona **View Logs with @network.client.ip:<ip_address>** (Ver logs con @network.client.ip:).

{{< img src="security/security_monitoring/investigate_security_signals/threat_intel_view_logs.png" alt="El panel de señales que muestra las opciones de amenazas para la dirección IP seleccionada" style="width:70%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/notifications/rules/
[2]: /es/account_management/audit_trail/events/#cloud-security-platform-events
[3]: /es/account_management/rbac/
[4]: /es/logs/explorer/saved_views/
[5]: https://app.datadoghq.com/security/home
[6]: /es/service_management/case_management/
[7]: /es/service_management/incident_management/
[8]: /es/service_management/workflows/trigger/#trigger-a-workflow-from-a-security-signal
[9]: /es/security/cloud_security_management/workflows/
[10]: /es/security/threat_intelligence