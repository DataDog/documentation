---
aliases:
- /es/security/cloud_siem/investigate_security_signals
disable_toc: false
further_reading:
- link: /cloud_siem/detection_rules/
  tag: Documentación
  text: Más información sobre la lógica condicional de las reglas de detección
- link: https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/
  tag: Blog
  text: Monitorizar 1Password con Cloud SIEM de Datadog
title: Investigar las señales de seguridad
---

## Información general

Se crea una señal de seguridad de Cloud SIEM cuando Datadog detecta una amenaza al analizar logs con respecto a las reglas de detección. Visualiza, busca, filtra y correlaciona señales de seguridad en el Signals Explorer sin necesidad de aprender un lenguaje de consulta específico. También puedes asignarte señales de seguridad a ti mismo o a otro usuario en la plataforma Datadog. Además del Signals Explorer, puedes configurar las [Reglas de notificación][1] para enviar señales a personas o equipos específicos para mantenerlos informados de los problemas.

Debes tener el permiso `Security Signals Write` para modificar una señal de seguridad, como cambiar el estado y ver el historial de acciones de la señal en [Audit Trail][2]. Consulta [Control de acceso basado en roles][3] para obtener más información sobre los roles predeterminados de Datadog y los permisos detallados de control de acceso basados en roles disponibles para la seguridad de Datadog en la seguridad en la nube.

## Explorador de señales

En el Explorer de señales, utiliza el panel de facetas o la barra de búsqueda para agrupar y filtrar tus señales. Por ejemplo, puedes ver las señales por [su gravedad](#view-signals-by-severity), [reglas de detección](#view-signals-by-detection-rules) y [MITRE ATT&CK](#view-signals-by-mitre-attck). Una vez que hayas filtrado las señales según tu caso de uso, crea una [vista guardada][4] para poder recargar la consulta más adelante.

### Ver señales por gravedad

Para ver todas las señales con gravedades específicas, por ejemplo `HIGH` y `CRITICAL`, que están en el estado de clasificación `open` o `under review`, realiza una de las siguientes acciones:

- En la sección **Severity** (Gravedad) del panel de facetas, selecciona **Crítico**, **Alto** y **Medio**. En la sección **Signal State** (Estado de la señal), asegúrate de que sólo estén seleccionados **open** (abierto) y **under_review** (en revisión).
- En la barra de búsqueda, introduce `status:(high OR critical OR medium) @workflow.triage.state:(open OR under_review)`.

Para añadir la columna **Signal State** (Estado de la señal), selecciona el botón **Options** (Opciones) en la esquina superior derecha encima de la tabla y añade la faceta: `@workflow.triage.state`. Esto muestra el estado de la señal y te permite ordenar por estado con el encabezado.

Utiliza diferentes visualizaciones para investigar la actividad de las amenazas en tu entorno. Por ejemplo, en el campo **Visualize by** (Visualizar por), puedes agrupar las señales por:

- **Lista de reglas** para ver las tendencias de volumen y alertas en las diferentes reglas de detección.
- **Series temporales** para ver las tendencias de las señales a lo largo del tiempo.
- **Lista de principales** para ver las señales con mayor a menor número de ocurrencias.
- **Tabla** para ver las señales por la clave de etiqueta especificada (por ejemplo, `source`, `technique`, etc.).
- **Gráfico circular** para ver el volumen relativo de cada una de las reglas de detección.

{{< img src="security/security_monitoring/investigate_security_signals/signal_list2.png" alt="El Explorer de señales que muestra las señales clasificadas por las reglas de detección" style="width:100%;" >}}

### Ver señales por reglas de detección

Para ver tus señales basadas en reglas de detección, haz clic en **Rules List** (Lista de reglas) en el campo **Visualize as** (Visualizar como) en la barra de búsqueda. Haz clic en una regla para ver las señales relacionadas con esa regla. Haz clic en una señal para ver los detalles de la señal.

### Ver señales de MITRE ATT&CK

Para ver tus señales por Táctica y Técnica de MITRE ATT&CK:
1. Selecciona **Table** (Tabla) en el campo **Visualize as** (Visualizar como) de la barra de búsqueda y agrupa por **Tactic** (Táctica).
1. Haz clic en el icono del signo más situado junto al primer grupo `by` para añadir un segundo grupo `by` y selecciona **Technique** (Técnica) para él.
1. En la tabla, haz clic en una de las tácticas o técnicas para ver las opciones para investigar más a fondo y filtrar las señales. Por ejemplo, puedes ver las señales relacionadas con la táctica y la técnica y buscar o excluir tácticas y técnicas específicas.

{{< img src="security/security_monitoring/investigate_security_signals/tactics_techniques.png" alt="La tabla del Explorer de señales en la que se muestra una lista de tácticas y técnicas" style="width:100%;" >}}

### Clasificación de una sola señal

1. En Datadog, ve a **Segurity** (Seguridad) > **Cloud SIEM** > [**Signals**][5] (Señales).
1. Haz clic en una señal de seguridad de la tabla.
1. En la sección **What Happened** (Qué ha pasado), consulta los logs que coinciden con la consulta. Pasa el mouse sobre la consulta para ver los detalles de esta.
    - También puedes consultar información específica como el nombre de usuario o la IP de red. En **Rule Details** (Detalles de la regla), haz clic en el icono del embudo para crear una regla de supresión o añadir la información a una supresión existente. Consulta [Crear regla de supresión][11] para obtener más detalles.
1. En la sección **Next Steps** (Siguientes pasos):
   1. En **Triage** (Triaje), haz clic en el menú desplegable para cambiar el estado de triaje de la señal. El estado predeterminado es `OPEN`.
      - `Open`: Datadog Security activó una detección basada en una regla y la señal resultante aún no se ha resuelto.
      - `Under Review`: Durante una investigación activa, cambia el estado de clasificación a `Under Review`. Desde el estado `Under Review`, puedes mover el estado a `Archived` o `Open` según sea necesario.
      - `Archived`: Cuando se haya resuelto la detección que causó la señal, actualiza el estado a `Archived`. Cuando se archiva una señal, puedes dar un motivo y una descripción para futuras referencias. Si un problema archivado reaparece, o si es necesario investigar más a fondo, el estado puede volver a cambiarse a `Open`. Todas las señales se bloquean 30 días después de su creación.</ul>
   1. Haz clic en **Assign Signal** (Asignar señal) para asignarte una señal a ti mismo o a otro usuario de Datadog.
   1. En **Take Action** (Tomar medida), puedes crear un case (incidencia), declarar un incident (incidente), editar supresiones o ejecutar workflows (UI) / procesos (generic). La creación de un case (incidencia) establece automáticamente el estado de triaje en `Under Review`. Para obtener más información sobre la asociación de cases (incidencias) con señales, consulta [Case Management](#case-management).

{{< img src="security/security_monitoring/investigate_security_signals/signal_side_panel.png" alt="El panel lateral de señales de un acceso de usuario comprometido de AWS IAM que muestra dos direcciones IP y sus ubicaciones" style="width:90%;" >}}

### Clasificación de múltiples señales

Utiliza acciones masivas para clasificar varias señales. Para utilizar acciones masivas, primero busca y filtra tus señales en el Explorer de señales, a continuación:

1. Haz clic en la casilla situada a la izquierda de las señales sobre las que deseas realizar una acción masiva. Para seleccionar todas las señales en la lista del Explorer de señales, selecciona la casilla situada junto al encabezado de la columna **Status** (Estado).
1. Haz clic en el menú desplegable **Bulk Actions** (Acciones masivas) situado encima de la tabla de señales y selecciona la acción que deseas realizar.

**Nota**: El Explorer de señales deja de actualizarse dinámicamente al realizar una acción masiva.

{{< img src="security/security_monitoring/investigate_security_signals/bulk_actions2.png" alt="El Explorer de señales en el que se muestra la opción de acción en masa" style="width:55%;" >}}

### Ejecuta la Workflow Automation (automatización de procesos)

Utiliza la Workflow Automation (automatización de procesos) para llevar a cabo acciones para ayudar a investigar y corregir una señal. Estas acciones pueden incluir las siguientes:
- Bloquea una dirección IP de tu entorno.
- Desactiva una cuenta de usuario.
- Busca una dirección IP en un proveedor externo de inteligencia sobre amenazas.
- Envía mensajes de Slack a tus compañeros para que te ayuden en tu investigación.

Haga clic en la pestaña **Workflows** (Workflows (UI) / procesos (generic)) del panel lateral de la señal para ver qué workflows (UI) / procesos (generic) se activaron para la señal y los workflows (UI) / procesos (generic) sugeridos para ejecutarlos. Si deseas ejecutar un workflow (UI) / proceso (generic) sugerido, haz clic en **Run Workflow** (Ejecutar workflow (UI) / proceso (generic). Consulta [Cómo se seleccionan los workflows (UI) / procesos (generic) sugeridos](#how-suggested-workflows-are-selected) para obtener más información. Si el workflow (UI) / proceso (generic) requiere variables de entrada adicionales, aparecerá un cuadro de diálogo que le pedirá que introduzca los valores necesarios antes de continuar.

Si no ves en la lista el workflow (UI) / proceso (generic) que deseas ejecutar, haz clic en **Search and Run Workflow** (Buscar y ejecutar el workflow (UI) / proceso (generic). En el navegador de workflow (UI) / proceso (generic), busca y selecciona un workflow (UI) / proceso (generic) para ejecutarlo.

También puedes seleccionar **Run Workflows** (Ejecutar workflows (UI) / procesos (generic)) en la sección **Next Steps** (Siguientes steps (UI) / pasos (generic)) para buscar y ejecutar un workflow (UI) / proceso (generic).

Para activar un flujo de trabajo automáticamente para cualquier señal de seguridad, consulta [Activar un flujo de trabajo desde una señal de seguridad][8] y [Automatizar flujos de trabajo de seguridad con automatización de flujos de trabajo][9] para obtener más información.

#### Cómo se seleccionan los workflows (UI) / procesos (generic) sugeridos

Para agilizar la respuesta al incident (incidente) y reducir la fricción durante el triaje, Cloud SIEM sugiere workflows (UI) / procesos (generic) que son relevantes para la señal. Los workflows (UI) / procesos (generic) sugeridos se seleccionan en función de cuáles tienen la mayor similitud de la tag (etiqueta) con la señal. Cloud SIEM utiliza la siguiente información para sugerir workflows (UI) / procesos (generic) para una señal:

- **Tags (etiquetas) añadidas automáticamente desde blueprints (esquemas), que son flujos preconfigurados**<br>
Los workflows (UI) / procesos (generic) son un conjunto de acciones relevantes para la plataforma, como CloudTrail de AWS. Los workflows (UI) / procesos (generic) creados a partir de un blueprint (esquema) tienen automáticamente tags (etiquetas) aplicadas en función de la source (fuente). Por ejemplo, una acción de workflow (UI) / proceso (generic) como "Apagar máquina virtual en AWS" tiene la tag (etiqueta)  `source` CloudTrail de AWS.
- **Tags (etiquetas) que has añadido manualmente**<br>
Puedes personalizar qué workflows (UI) / procesos se priorizan añadiendo manualmente tags (etiquetas) a los workflows (UI) / procesos (generic) derivados de blueprint (esquema) y a los personalizados. Para garantizar una correspondencia contextual correcta, estas tags (etiquetas) deben coincidir con las que se encuentran en la señal, los logs que generaron la alerta o la propia regla de detección.
- **Estrategia de etiquetado**<br>
Para garantizar que aparezca un workflow (UI) / proceso (generic) para una señal determinada, el workflow (UI) / proceso (generic) debe incluir tags (etiquetas) similares a las de la señal. Una tag (etiqueta) de señal común es la source (fuente) o servicio de la señal. Por ejemplo, las señales de los recursos de AWS suelen etiquetarse con `source:cloudtrail`. Al etiquetar un workflow (UI) / proceso (generic) con `source:cloudtrail`, el workflow (UI) / proceso (generic) se asocia con señales relacionadas con la actividad de AWS.<br>
Si deseas que se sugiera un workflow (UI) / proceso (generic) para una regla de detección específica, etiqueta el workflow (UI) / proceso (generic) con el ID de esa regla de detección (por ejemplo, `ruleId:abc-123-xyz`).

Cuando se crea una señal:

- **Las señales y los workflows (UI) / procesos (generic) se emparejan mediante tags (etiquetas)**<br>
Cuando se crea una señal de seguridad, Cloud SIEM realiza un check de las tags (etiquetas) de la señal y las compara con las definidas en los workflows (UI) / procesos (generic) existentes.
- **Se hacen sugerencias pertinentes.<br>
En el panel lateral, aparece una sección de **Suggested Workflows** (Workflows (UI) / procesos (generic) sugeridos). Muestra los tres principales workflows (UI) / procesos (generic) según las tags (etiquetas) que más se aproximan a las tags (etiquetas) de la señal. Esto garantiza que las acciones sugeridas se adapten al contexto y sean pertinentes desde el punto de vista operativo.

## Investigar

Una señal contiene información importante para determinar si la amenaza detectada es maliciosa. Además, puedes añadir una señal a un case (incidencia) en [Case Management](#case-management) para una investigación más profunda.

### Logs

Haz clic en la pestaña **Logs** para ver los logs relacionados con la señal. Haz clic en **View All Related Logs** (Ver todos los logs relacionados) para ver los logs relacionados en el Explorer de logs.

### Entidades

Investigar entidades:

1. Haz clic en la pestaña **Entities** (Entidades) para ver las entidades relacionadas con la señal, como usuarios o direcciones IP.
1. Haz clic en la flecha hacia abajo junto a **View Related Logs** (Ver logs relacionados) y:
    - Selecciona **Ver dashboard de IP** para ver más información sobre la dirección IP en el dashboard de investigación de IP.
    - Selecciona **Ver señales relacionadas** para abrir el Signals Explorer y ver las demás señales asociadas a la dirección IP.
1. Para las entidades del entorno de la nube, como un rol asumido o un usuario IAM, mira el gráfico de actividad para ver qué otras acciones realizó el usuario. Haz clic en **Ver en Investigator** para ir a Investigator y ver más detalles.

### Señales relacionadas

Haz clic en la pestaña **Señales relacionadas** para ver las señales relacionadas y la información, como campos y atributos, que comparten las señales. Haz clic en **Ver toda la actividad relacionada** para ver las señales en el Signals Explorer.

### Supresiones

Para ver la regla de detección en las reglas de supresión que generó la señal, realiza una de las siguientes acciones:

- En la sección **Qué ha pasado**, pasa el mouse sobre el icono del embudo y, a continuación, haz clic en **Añadir supresión**.
- En la sección **Siguientes pasos**, haz clic en **Editar supresiones** para ver la sección de supresión de esa regla en el editor de reglas de detección.
- Haz clic en la pestaña **Supresiones** para ver una lista de supresiones, si las hay. Haz clic en **Editar supresiones** para ir al editor de reglas de detección y ver la sección de supresión de esa regla.

## Colabora

### Case Management

A veces se necesita más información que la disponible en una sola señal para investigarla. Utiliza [Gestión de casos][6] para recopilar varias señales, crear calendarios, debatir con colegas y mantener un notebook del análisis y los hallazgos.

#### Crear y gestionar cases (incidencias) desde el Explorer de señales

En el [Explorer de señales][5], cuando se utiliza la visualización **List** (Lista), la columna **Cases** (Cases (incidencias)) contiene información sobre los cases (incidencias) asociados a las señales. Puedes utilizar esa columna para gestionar esos cases (incidencias):
- Para gestionar los cases (incidencias) de una única señal, utiliza la columna **Cases** (Cases (Incidencias)):
  - Si la señal tiene cases (incidencias) asociados, puedes pasar el cursor por encima del identificador de case (incidencia) para ver información sobre ellos, abrirlos en una nueva ventana o desvincularlos de la señal.
  - Si la señal no tiene ningún case (incidencia) asociado, haz clic en el icono **Create Case** (Crear case (incidencia)) para crear un case (incidencia) o seleccionar un case (incidencia) existente para asociarlo a la señal. Se abre la ventana Crear case (incidencia).
    - Para crear un case (incidencia), en la ventana **Create Case** (Crear case (incidencia)), introduce el **Project (proyecto)**, **Title** (Título), **Description** (Descripción) y **Assignee** (Cesionario) y, a continuación, haz clic en **Create Case** (Crear case (incidencia)).
    - Para seleccionar un case (incidencia) existente, en la ventana **Create Case** (Crear case (incidencia)), haz clic en la pestaña **Add to Existing Case** (Añadir a un case (incidencia) existente). Selecciona un case (incidencia) y haz clic en **Attach to an Existing Case** (Añadir a un case (incidencia) existente).
- Para gestionar cases (incidencias) de señales múltiples:
  1. Selecciona las señales que desees vincular a un case (incidencia).
  1. En la lista **Bulk Actions** (Acciones masivas) que aparece, haz clic en **Create a Case** (Crear un case (incidencia)) o **Add to Existing Case** (Añadir a un case (incidencia) existente). Se abre la ventana Crear case (incidencia).
     - Para crear un case (incidencia), en la ventana **Create Case** (Crear un case (incidencia)), introduce el **Project (proyecto)**, **Title** (Título), **Description** (Descripción) y **Assignee** (Cesionario) y, a continuación, haz clic en **Create Case** (Crear un case (incidencia)).
     - Para seleccionar un case (incidencia) existente, en la ventana **Create Case** (Crear un case (incidencia)), haz clic en la pestaña **Add to Existing Case** (Añadir a un case (incidencia) existente). Selecciona un case (incidencia) y haz clic en **Add to an Existing Case** (Añadir a un case (incidencia) existente).

Al crear un case (incidencia), el estado de triaje se configura automáticamente en `Under Review`.

**Nota**: Si se determina que un case (incidencia) es crítico tras una investigación adicional, haz clic en **Declare Incident** (Declarar un incident (incidente)) en el case (incidencia) para escalarlo a un incident (incidente).

#### Gestión de cases (incidencias) relacionados con la seguridad

En la page (página) [Cases][12] (incidencias), puedes ver los cases (incidencias) específicos de tus projects (proyectos) de seguridad. Puedess filtrar los cases (incidencias) para ver solo los que te han sido asignados o creados por ti o los cases (incidencias) que tienen un estado específico o están en un project (proyecto) específico. También puedes marcar los projects (proyectos) con estrellas para facilitar la navegación.

En la sección **Security Signals** (Señales de seguridad) de un case (incidencia), puedes ver las señales asociadas a él y hacer clic en **Add Signals** (Añadir señales) para buscar filtros que asociar al case (incidencia).

### Declarar una incidencia

Ya sea a partir de una sola señal o tras la investigación de un caso, cierta actividad maliciosa exige una respuesta. Puedes declarar incidencias en Datadog para reunir a desarrolladores, operaciones y equipos de seguridad para abordar un evento de seguridad crítico. [Gestión de incidencias][7] proporciona un framework y un flujo de trabajo para que los equipos de ayuda identifiquen y mitiguen eficazmente las incidencias.

Para declarar una incidencia en el panel de señales:

1. Haz clic en **Declarar una incidencia** en la sección **Siguientes pasos**.
1. Completa la plantilla de incidencias.

Si deseas añadir la señal a una incidencia, haz clic en la flecha hacia abajo situada junto a **Declarar una incidencia** y selecciona la incidencia a la que deseas añadir la señal. Haz clic en **Confirmar**.

### Información sobre amenazas

Datadog Cloud SIEM ofrece información integrada sobre amenazas proporcionada por nuestros socios de información sobre amenazas. Estas fuentes se actualizan constantemente para incluir datos sobre actividades sospechosas conocidas (por ejemplo, direcciones IP que se sabe que utilizan actores maliciosos), de modo que puedas identificar rápidamente qué amenazas potenciales debes abordar.

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
[5]: https://app.datadoghq.com/security/siem/signals
[6]: /es/incident_response/case_management/
[7]: /es/incident_response/incident_management/
[8]: /es/service_management/workflows/trigger/#trigger-a-workflow-from-a-security-signal
[9]: /es/security/cloud_security_management/workflows/
[10]: /es/security/threat_intelligence
[11]: /es/security/suppressions/#create-a-suppression-rule
[12]: https://app.datadoghq.com/security/siem/cases