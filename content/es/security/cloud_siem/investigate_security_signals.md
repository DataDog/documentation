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

Se crea una señal de seguridad de Cloud SIEM cuando Datadog detecta una amenaza al analizar logs con respecto a las reglas de detección. Visualiza, busca, filtra y correlaciona señales de seguridad en el Signals Explorer sin necesidad de aprender un lenguaje de consulta específico. También puedes asignarte señales de seguridad a ti mismo o a otro usuario en la plataforma Datadog. Además del Explorador de señales, puedes configurar las [Reglas de notificación][1] para enviar señales a personas o equipos específicos para mantenerlos informados de los problemas.

Debes tener el permiso `Security Signals Write` para modificar una señal de seguridad, como cambiar el estado y ver el historial de acciones de la señal en [Audit Trail][2]. Consulta [Control de acceso basado en roles][3] para obtener más información sobre los roles predeterminados de Datadog y los permisos detallados de control de acceso basados en roles disponibles para la seguridad de Datadog en la seguridad en la nube.

## Explorador de señales

En el Signal Explorer, utiliza el panel de facetas o la barra de búsqueda para agrupar y filtrar tus señales. Por ejemplo, puedes ver las señales por [su gravedad](#view-signals-by-severity), [reglas de detección](#view-signals-by-detection-rules) y [MITRE ATT&CK](#view-signals-by-mitre-attck). Una vez que hayas filtrado las señales según tu caso de uso, crea una [vista guardada][4] para poder recargar la consulta más adelante.

### Ver señales por gravedad

Para ver todas las señales con gravedades específicas, por ejemplo `HIGH` y `CRITICAL`, que están en el estado de clasificación `open` o `under review`, realiza una de las siguientes acciones:

- En la sección **Severity** (Gravedad) del panel de facetas, selecciona **Crítico**, **Alto** y **Medio**. En la sección **Signal State** (Estado de la señal), asegúrate de que solo **open** (abierto) y **under_review** (en revisión) están seleccionados.
- En la barra de búsqueda, introduce `status:(high OR critical OR medium) @workflow.triage.state:(open OR under_review)`.

Para añadir la columna **Signal State** (Estado de la señal), selecciona el botón **Options** (Opciones) en la esquina superior derecha encima de la tabla y añade la faceta: `@workflow.triage.state`. Esto muestra el estado de la señal y te permite ordenar por estado con el encabezado.

Utiliza diferentes visualizaciones para investigar la actividad de las amenazas en tu entorno. Por ejemplo, en el campo **Visualize by** (Visualizar por), puedes agrupar las señales por:

- **Lista de reglas** para ver las tendencias de volumen y alertas en las diferentes reglas de detección.
- **Series temporales** para ver las tendencias de las señales a lo largo del tiempo.
- **Lista de principales** para ver las señales con mayor a menor número de ocurrencias.
- **Tabla** para ver las señales por la clave de etiqueta especificada (por ejemplo, `source`, `technique`, etc.).
- **Gráfico de torta** para ver el volumen relativo de cada una de las reglas de detección.

{{< img src="security/security_monitoring/investigate_security_signals/signal_list2.png" alt="El Signals Explorer muestra las señales clasificadas por las reglas de detección" style="width:100%;" >}}

### Ver señales por reglas de detección

Para ver tus señales basadas en reglas de detección, haz clic en **Lista de reglas** en el campo **Visualize as** (Visualizar como) en la barra de búsqueda. Haz clic en una regla para ver las señales relacionadas con esa regla. Haz clic en una señal para ver los detalles de la señal.

### Ver señales de MITRE ATT&CK

Para ver tus señales por Táctica y Técnica de MITRE ATT&CK:
1. Selecciona **Table** (Tabla) en el campo **Visualize as** (Visualizar como) de la barra de búsqueda y agrupa por **Tactic** (Táctica).
1. Haz clic en el icono del signo más situado junto al primer grupo `by` para añadir un segundo grupo `by` y selecciona **Technique** (Técnica) para él.
1. En la tabla, haz clic en una de las tácticas o técnicas para ver las opciones para investigar más a fondo y filtrar las señales. Por ejemplo, puedes ver las señales relacionadas con la táctica y la técnica y buscar o excluir tácticas y técnicas específicas.

{{< img src="security/security_monitoring/investigate_security_signals/tactics_techniques.png" alt="La tabla del Signals Explorer en la que se muestra una lista de tácticas y técnicas" style="width:100%;" >}}

### Clasificación de una sola señal

1. Ve a [Cloud SIEM][5].
1. Haz clic en la pestaña **Señales** en la parte superior de la página.
1. Haz clic en una señal de seguridad de la tabla.
1. En la sección **Qué ha pasado**, consulta los logs que coinciden con la consulta. Pasa el mouse sobre la consulta para ver los detalles de esta.
    - También puedes consultar información específica como el nombre de usuario o la IP de red. En **Detalles de la regla**, haz clic en el icono del embudo para crear una regla de supresión o añadir la información a una supresión existente. Consulta [Crear regla de supresión][11] para obtener más detalles.
1. En la sección **Siguientes pasos**:   
  a. En **Clasificación**, haz clic en el menú desplegable para cambiar el estado de clasificación de la señal. El estado predeterminado es `OPEN`.
      - `Open`: Datadog Security activó una detección basada en una regla y la señal resultante aún no se ha resuelto.
      - `Under Review`: Durante una investigación activa, cambia el estado de clasificación a `Under Review`. Desde el estado `Under Review`, puedes mover el estado a `Archived` o `Open` según sea necesario.
      - `Archived`: Cuando se haya resuelto la detección que causó la señal, actualiza el estado a `Archived`. Cuando se archiva una señal, puedes dar un motivo y una descripción para futuras referencias. Si un problema archivado reaparece, o si es necesario seguir investigando, el estado puede volver a cambiarse a `Open`. Todas las señales se bloquean 30 días después de su creación.</ul>
  b. Haz clic en **Asignar señal** para asignarte una señal a ti mismo o a otro usuario de Datadog.  
  c. En **Tomar medidas**, puedes crear un caso, declarar una incidencia, editar supresiones o ejecutar flujos de trabajo. La creación de un caso te asigna automáticamente la señal y configura el estado de clasificación en `Under Review`.

{{< img src="security/security_monitoring/investigate_security_signals/signal_side_panel.png" alt="El panel lateral de señales de un acceso de usuario comprometido de AWS IAM que muestra dos direcciones IP y sus ubicaciones" style="width:90%;" >}}

### Clasificación de múltiples señales

Utiliza acciones masivas para clasificar varias señales. Para utilizar acciones masivas, primero busca y filtra tus señales en el Signals Explorer, a continuación:

1. Haz clic en la casilla situada a la izquierda de las señales sobre las que deseas realizar una acción masiva. Para seleccionar todas las señales en la lista del Signals Explorer, selecciona la casilla situada junto al encabezado de la columna **Estado**.
1. Haz clic en el menú desplegable **Bulk Actions** (Acciones en bloque) situado encima de la tabla de señales y selecciona la acción que deseas realizar.

**Nota**: El Signals Explorer deja de actualizarse dinámicamente al realizar una acción masiva.

{{< img src="security/security_monitoring/investigate_security_signals/bulk_actions2.png" alt="El Signals Explorer que muestra la opción de acción masiva" style="width:55%;" >}}

### Ejecuta la automatización del flujo de trabajo

Utiliza la automatización del flujo de trabajo para llevar a cabo acciones para ayudar a investigar y corregir una señal. Estas acciones pueden incluir las siguientes:
- Bloquear una dirección IP de tu entorno.
- Desactivar una cuenta de usuario.
- Buscar una dirección IP con un proveedor externo de investigación de amenazas.
- Enviar mensajes de Slack a tus colegas para obtener ayuda con tu investigación.

Para ejecutar un flujo de trabajo desde el panel lateral de señales, selecciona **Ejecutar flujos de trabajo** en la sección **Siguientes pasos**. En el navegador de flujos de trabajo, busca y selecciona un flujo de trabajo para ejecutarlo. Haz clic en la pestaña **Flujos de trabajo** en el panel lateral de señales para ver qué flujos de trabajo se activaron para la señal.

Para activar un flujo de trabajo automáticamente para cualquier señal de seguridad, consulta [Activar un flujo de trabajo desde una señal de seguridad][8] y [Automatizar flujos de trabajo de seguridad con automatización de flujos de trabajo][9] para obtener más información.

## Investigar

Una señal contiene información importante para determinar si la amenaza detectada es maliciosa o no. Además, puedes añadir una señal a un caso en Gestión de casos para investigarlo más a fondo.

### Logs

Haz clic en la pestaña **Logs** para ver los logs relacionados con la señal. Haz clic en **Ver todos los logs relacionados** para ver los logs relacionados en el explorador de logs.

### Entidades

Investigar entidades:

1. Haz clic en la pestaña **Entidades** para ver las entidades relacionadas con la señal, como usuarios o direcciones IP.
1. Haz clic en la flecha hacia abajo junto a **Ver logs relacionados** y:   
    - Selecciona **Ver dashboard de IP** para ver más información sobre la dirección IP en el dashboard de investigación de IP.
    - Selecciona **Ver señales relacionadas** para abrir el Signals Explorer y ver las demás señales asociadas a la dirección IP.
1. Para las entidades del entorno de la nube, como un rol asumido o un usuario IAM, mira el gráfico de actividad para ver qué otras acciones realizó el usuario. Haz clic en **Ver en Investigator** para ir a Investigator y ver más detalles.

### Señales relacionadas

Haz clic en la pestaña **Señales relacionadas** para ver las señales relacionadas y la información, como campos y atributos, que comparten las señales. Haz clic en **Ver toda la actividad relacionada** para ver las señales en el Signals Explorer.

### Supresiones

Para ver la regla de detección en las reglas de supresión que generó la señal, realiza una de las siguientes acciones:

- En la sección **Qué ha pasado**, pase el mouse sobre el icono del embudo y, a continuación, haz clic en **Añadir supresión**.
- En la sección **Siguientes pasos**, haz clic en **Editar supresiones** para ver la sección de supresión de esa regla en el editor de reglas de detección.
- Haz clic en la pestaña **Supresiones** para ver una lista de supresiones, si las hay. Haz clic en **Editar supresiones** para ir al editor de reglas de detección y ver la sección de supresión de esa regla.

## Colabore

### Gestión de casos

A veces se necesita más información que la disponible en una sola señal para investigarla. Utiliza [Gestión de casos][6] para recopilar varias señales, crear calendarios, debatir con colegas y mantener un notebook del análisis y los hallazgos.

Para crear un caso a partir de una señal de seguridad:

1. Haz clic en **Crear Caso** en la sección **Siguientes Pasos** para crear un nuevo caso. Si deseas añadir la señal a un caso existente, haz clic en la flecha hacia abajo situada junto a **Crear caso** y, a continuación, selecciona **Añadir a un caso existente**.
1. Completa la información del caso.
1. Haz clic en **Create case** (Crear caso).

La señal se asigna automáticamente al usuario que creó el caso y el estado de clasificación también se cambia a `Under Review`.

Una vez creado un caso, pase el mouse sobre el botón **Caso** para ver el caso asociado a la señal.

**Nota**: Si se determina que un caso es crítico tras una investigación adicional, haz clic en **Declare Incident** (Declarar incidencia) en el caso para escalarlo a una incidencia.

### Declarar una incidencia

Ya sea a partir de una sola señal o tras la investigación de un caso, cierta actividad maliciosa exige una respuesta. Puedes declarar incidencias en Datadog para reunir a desarrolladores, operaciones y equipos de seguridad para abordar un evento de seguridad crítico. [Gestión de incidencias][7] proporciona un marco y un flujo de trabajo para que los equipos de ayuda identifiquen y mitiguen eficazmente las incidencias.

Para declarar una incidencia en el panel de señales:

1. Haz clic en **Declarar incidencia** en la sección **Siguientes pasos**.
1. Completa la plantilla de incidencias.

Si deseas añadir la señal a una incidencia, haz clic en la flecha hacia abajo situada junto a **Declarar incidencia** y selecciona la incidencia a la que deseas añadir la señal. Haz clic en **Confirmar**.

### Información sobre amenazas

Datadog Cloud SIEM ofrece información sobre amenazas integrada proporcionada por nuestros socios de información sobre amenazas. Estas fuentes se actualizan constantemente para incluir datos sobre actividades sospechosas conocidas (por ejemplo, direcciones IP que se sabe que utilizan actores maliciosos), de modo que puedas identificar rápidamente qué amenazas potenciales debes abordar.

Datadog enriquece automáticamente todos los logs ingeridos en busca de indicadores de peligro (IOC) procedentes de sus fuentes de información sobre amenazas. Si un log contiene una coincidencia con un IOC conocido, se añade un atributo `threat_intel` al evento de log para proporcionar información adicional basada en la información disponible.

La consulta para ver todas las coincidencias de información sobre amenazas en el Security Signals Explorer es `@threat_intel.indicators_matched:*`. Los siguientes son atributos adicionales para buscar información sobre amenazas:

- Para `@threat_intel.results.category`: attack, corp_vpn, cryptomining, malware, residential_proxy, tor, scanner
- Para `@threat_intel.results.intention`: malicious, suspicious, benign, unknown

{{< img src="security/security_monitoring/investigate_security_signals/threat_intel_results_categories.png" alt="El Signals Explorer que muestra un gráfico de barras de señales clasificadas por categorías de información sobre amenazas de proxy residencial, corp_vpn, cryptomining y malware" style="width:80%;" >}}

Consulta la documentación de [Información de amenazas][10] para obtener más detalles sobre las fuentes de información de amenazas.

### Busca por atributos de IP de red

Cuando se detecta una actividad sospechosa en tus logs, determina si el actor sospechoso ha interactuado con tus sistemas buscando su IP de red. Utiliza la siguiente consulta para buscar atributos de IP en el explorador de logs: `@network.ip.list:<IP address>`. La consulta busca IP en cualquier lugar en los logs, incluidas las etiquetas (tags), atributos, error y campos de mensajes.

También puedes lanzar esta consulta directamente desde el panel de señales:
1. Haz clic en la dirección IP en la sección **IPS**.
2. Selecciona **View Logs with @network.client.ip:<ip_address>** (Ver logs con @network.client.ip:).

{{< img src="security/security_monitoring/investigate_security_signals/search_logs_by_ip.png" alt="El panel de señales que muestra las opciones de amenazas para la dirección IP seleccionada" style="width:90%;" >}}

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
[11]: /es/security/suppressions/#create-a-suppression-rule