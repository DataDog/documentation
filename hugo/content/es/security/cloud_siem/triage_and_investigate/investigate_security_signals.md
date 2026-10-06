---
aliases:
- /es/security/cloud_siem/investigate_security_signals
disable_toc: false
further_reading:
- link: /cloud_siem/detection_rules/
  tag: Documentación
  text: Obtenga información sobre la lógica condicional de las reglas de detección
- link: https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/
  tag: Blog
  text: Haga un seguimiento de 1Password con Datadog Cloud SIEM
- link: https://www.datadoghq.com/blog/cloud-siem-whats-new-rsa-2026
  tag: Blog
  text: 'Novedades en Cloud SIEM: investigaciones impulsadas por IA, inteligencia
    de amenazas mejorada y operaciones de seguridad escalables'
- link: /bits_ai/bits_security_analyst/
  tag: Documentación
  text: Bits Security Analyst
title: Investigue las señales de seguridad
---
## Descripción general {#overview}

Se crea una señal de seguridad de Cloud SIEM cuando Datadog detecta una amenaza mientras analiza registros frente a reglas de detección. Visualice, busque, filtre y correlacione señales de seguridad en el Explorador de señales sin necesidad de aprender un lenguaje de consulta dedicado. También puede asignarse señales de seguridad a usted mismo o a otro usuario en la plataforma de Datadog. Además del Explorador de señales, puede configurar [Reglas de notificación][1] para enviar señales a personas o equipos específicos para mantenerlos informados sobre los problemas.

Debe tener el permiso `Security Signals Write` para modificar una señal de seguridad, como cambiar el estado y visualizar el historial de acciones de la señal en [Audit Trail][2]. Consulte [Access Control basado en roles][3] para obtener más información sobre los roles predeterminados de Datadog y los permisos de control de acceso basado en roles granulares disponibles para Datadog Security en Cloud Security.

Si desea utilizar un agente de IA autónomo que investigue las señales de seguridad de Cloud SIEM, consulte [Bits Security Analyst][14].

## Explorador de señales {#signals-explorer}

En el Explorador de señales, utilice el panel de facetas o la barra de búsqueda para agrupar y filtrar sus señales. Por ejemplo, puede visualizar las señales por [su gravedad](#view-signals-by-severity), [reglas de detección](#view-signals-by-detection-rules) y [MITRE ATT&CK](#view-signals-by-mitre-attck). Después de filtrar sus señales según su caso de uso, cree una [vista guardada][4] para que pueda volver a cargar su consulta más tarde.

### Visualizar señales por gravedad {#view-signals-by-severity}

Para visualizar todas las señales con gravedades específicas, por ejemplo `HIGH` y `CRITICAL`, que se encuentren en el estado de triaje `open` o `under review`, realice una de las siguientes acciones:

- En la sección {{< ui >}}Severity{{< /ui >}} del panel de facetas, seleccione {{< ui >}}Critical{{< /ui >}}, {{< ui >}}High{{< /ui >}} y {{< ui >}}Medium{{< /ui >}}. En la sección {{< ui >}}Signal State{{< /ui >}}, asegúrese de que solo estén seleccionados {{< ui >}}open{{< /ui >}} y {{< ui >}}under_reviewed{{< /ui >}}.
- En la barra de búsqueda, ingrese `status:(high OR critical OR medium) @workflow.triage.state:(open OR under_review)`.

Para agregar la columna {{< ui >}}Signal State{{< /ui >}}, seleccione el botón {{< ui >}}Options{{< /ui >}} en la esquina superior derecha sobre la tabla y agregue la faceta: `@workflow.triage.state`. Esto muestra el estado de la señal y le permite ordenar por estado a través del encabezado.

Utilice diferentes visualizaciones para investigar la actividad de amenazas en su entorno. Por ejemplo, en el campo {{< ui >}}Visualize by{{< /ui >}}, puede agrupar las señales por:

- {{< ui >}}Rules List{{< /ui >}} para ver el volumen y las tendencias de alertas en las diferentes reglas de detección.
- {{< ui >}}Timeseries{{< /ui >}} para visualizar las tendencias de las señales a lo largo del tiempo.
- {{< ui >}}Top List{{< /ui >}} para visualizar las señales con el mayor al menor número de ocurrencias.
- {{< ui >}}Table{{< /ui >}} para visualizar las señales por la clave de etiqueta especificada (por ejemplo, `source`, `technique`, etcétera).
- {{< ui >}}Pie Chart{{< /ui >}} para visualizar el volumen relativo de cada una de las reglas de detección.

{{< img src="security/security_monitoring/investigate_security_signals/signal_list2.png" alt="El Explorador de señales que muestra las señales categorizadas por reglas de detección" style="width:100%;" >}}

### Visualizar señales por reglas de detección {#view-signals-by-detection-rules}

Para visualizar sus señales basadas en reglas de detección, haga clic en {{< ui >}}Rules List{{< /ui >}} en el campo {{< ui >}}Visualize as{{< /ui >}} debajo de la barra de búsqueda. Haga clic en una regla para visualizar las señales relacionadas con esa regla. Haga clic en una señal para visualizar los detalles de la señal.

### Visualizar señales por MITRE ATT&CK {#view-signals-by-mitre-attck}

Para visualizar sus señales por táctica y técnica de MITRE ATT&CK:
1. Seleccione {{< ui >}}Table{{< /ui >}} en el campo {{< ui >}}Visualize as{{< /ui >}} debajo de la barra de búsqueda y agrupe por {{< ui >}}Tactic{{< /ui >}}.
1. Haga clic en el icono de más junto al primer grupo `by` para añadir un segundo grupo `by` y seleccione {{< ui >}}Technique{{< /ui >}} para él.
1. En la tabla, haga clic en una de las tácticas o técnicas para visualizar opciones para investigar más a fondo y filtrar las señales. Por ejemplo, puede visualizar señales relacionadas con la táctica y la técnica, y buscar o excluir tácticas y técnicas específicas.

{{< img src="security/security_monitoring/investigate_security_signals/tactics_techniques.png" alt="La tabla del Explorador de señales que muestra una lista de tácticas y técnicas" style="width:100%;" >}}

### Realizar el triaje de una sola señal {#triage-a-single-signal}

1. En Datadog, vaya a {{< ui >}}Security{{< /ui >}} > {{< ui >}}Cloud SIEM{{< /ui >}} > [{{< ui >}}Signals{{< /ui >}}][5].
1. Haga clic en una señal de seguridad de la tabla.
1. En la sección {{< ui >}}What Happened{{< /ui >}}, visualice los registros que coincidieron con la consulta. Pase el cursor sobre la consulta para visualizar los detalles de la misma.
    - También puede visualizar información específica como el nombre de usuario o la IP de red. En {{< ui >}}Rule Details{{< /ui >}}, haga clic en el icono de embudo para crear una regla de supresión o añadir la información a una supresión existente. Consulte [Crear regla de supresión][11] para obtener más detalles.
1. En la sección {{< ui >}}Next Steps{{< /ui >}}:
   1. En {{< ui >}}Triage{{< /ui >}}, haga clic en el menú desplegable para cambiar el estado de clasificación de la señal. El estado predeterminado es `OPEN`.
      - `Open`: Datadog Security activó una detección basada en una regla, y la señal resultante aún no se ha resuelto.
      - `Under Review`: Durante una investigación activa, cambie el estado de triaje a `Under Review`. Desde el estado `Under Review`, puede mover el estado a `Archived` o `Open` según sea necesario.
      - `Archived`: Cuando la detección que causó la señal se haya resuelto, actualice el estado a `Archived`. Cuando una señal se archiva, puede proporcionar un motivo y una descripción para referencia futura. Si una incidencia archivada vuelve a aparecer, o si es necesaria una investigación adicional, el estado puede cambiarse de nuevo a `Open`. Todas las señales se bloquean 30 días después de haber sido creadas.</ul>
   1. Haga clic en {{< ui >}}Assign Signal{{< /ui >}} para asignarse una señal a usted mismo o a otro usuario de Datadog.
   1. En {{< ui >}}Take Action{{< /ui >}}, puede crear una incidencia, declarar un incidente, editar supresiones o ejecutar flujos de trabajo. Crear una incidencia establece automáticamente el estado de triaje en `Under Review`. Para obtener más información sobre cómo asociar incidencias con señales, consulte [Case Management](#case-management).

{{< img src="security/security_monitoring/investigate_security_signals/signal_side_panel.png" alt="El panel lateral de señales de una clave de acceso de usuario de AWS IAM comprometida que muestra dos direcciones IP y sus ubicaciones" style="width:90%;" >}}

### Realizar el triaje de múltiples señales {#triage-multiple-signals}

Utilice acciones masivas para realizar el triaje de múltiples señales. Para utilizar acciones masivas, primero busque y filtre sus señales en el Explorador de señales y, luego:

1. Haga clic en la casilla de verificación a la izquierda de las señales sobre las que desea realizar una acción masiva. Para seleccionar todas las señales en la lista del Explorador de señales, seleccione la casilla de verificación junto al encabezado de la columna {{< ui >}}Status{{< /ui >}}.
1. Haga clic en el menú desplegable {{< ui >}}Bulk Actions{{< /ui >}} sobre la tabla de señales y seleccione la acción que desea realizar.

**Nota**: El Explorador de señales deja de actualizarse dinámicamente al realizar una acción masiva.

{{< img src="security/security_monitoring/investigate_security_signals/bulk_actions2.png" alt="El Explorador de señales mostrando la opción de acción masiva" style="width:55%;" >}}

### Ejecutar Workflow Automation {#run-workflow-automation}

Utilice Workflow Automation para llevar a cabo acciones que le ayuden a investigar y remediar una señal. Estas acciones pueden incluir:
- Bloquear una dirección IP de su entorno.
- Deshabilitar una cuenta de usuario.
- Buscar una dirección IP con un proveedor de inteligencia de amenazas externo.
- Enviar mensajes de Slack a sus colegas para obtener ayuda con su investigación.

Haga clic en la pestaña {{< ui >}}Workflows{{< /ui >}} en el panel lateral de la señal para ver qué flujos de trabajo se activaron para la señal y los flujos de trabajo sugeridos para ejecutar. Si desea ejecutar un flujo de trabajo sugerido, haga clic en {{< ui >}}Run Workflow{{< /ui >}}. Consulte [Cómo se seleccionan los flujos de trabajo sugeridos](#how-suggested-workflows-are-selected) para obtener más información. Si el flujo de trabajo requiere variables de entrada adicionales, aparecerá un cuadro de diálogo que le solicitará ingresar los valores necesarios antes de continuar.

Si no ve el flujo de trabajo que desea ejecutar en la lista, haga clic en {{< ui >}}Search and Run Workflow{{< /ui >}}. En el explorador de flujos de trabajo, busque y seleccione un flujo de trabajo para ejecutar.

Alternativamente, también puede seleccionar {{< ui >}}Run Workflows{{< /ui >}} en la sección {{< ui >}}Next Steps{{< /ui >}} para buscar y ejecutar un flujo de trabajo.

Para activar un flujo de trabajo automáticamente para cualquier señal de seguridad, consulte [Activar un flujo de trabajo desde una señal de seguridad][8] y [Automatizar flujos de trabajo de seguridad con Workflow Automation][9] para obtener más información.

#### Cómo se seleccionan los flujos de trabajo sugeridos {#how-suggested-workflows-are-selected}

Para agilizar la respuesta a incidentes y reducir la fricción durante el triaje, Cloud SIEM sugiere flujos de trabajo que son relevantes para la señal. Los flujos de trabajo sugeridos se seleccionan en función de cuáles tienen la mayor similitud de etiqueta con la señal. Cloud SIEM utiliza la siguiente información para sugerir flujos de trabajo para una señal:

- **Etiquetas agregadas automáticamente desde Blueprints, que son flujos preconfigurados**<br>
Los flujos de trabajo son un conjunto de acciones que son relevantes para la plataforma, como AWS CloudTrail. Los flujos de trabajo creados a partir de un Blueprint tienen etiquetas aplicadas automáticamente según la fuente. Por ejemplo, una acción de flujo de trabajo como "Apagar máquina virtual en AWS" tiene la etiqueta `source` AWS CloudTrail.
- **Etiquetas que agregó manualmente**<br>
Puede personalizar qué flujos de trabajo se priorizan agregando etiquetas manualmente tanto a los flujos de trabajo derivados de Blueprints como a los personalizados. Para garantizar una coincidencia contextual correcta, estas etiquetas deben coincidir con las que se encuentran en la señal, los registros que generaron la alerta o la propia regla de detección.
- **Estrategia de etiquetado**<br>
Para garantizar que un flujo de trabajo aparezca para una señal determinada, el flujo de trabajo debe incluir etiquetas similares a las de la señal. Una etiqueta de señal común es la fuente o el servicio de la señal. Por ejemplo, las señales de los recursos de AWS suelen estar etiquetadas con `source:cloudtrail`. Al etiquetar un flujo de trabajo con `source:cloudtrail`, el flujo de trabajo se asocia con señales relacionadas con la actividad de AWS.<br>
Si desea que se sugiera un flujo de trabajo para una regla de detección específica, etiquete el flujo de trabajo con ese ID de regla de detección (por ejemplo, `ruleId:abc-123-xyz`).

Cuando se crea una señal:

- **Las señales y los flujos de trabajo se relacionan mediante etiquetas**<br>
Cuando se crea una señal de seguridad, Cloud SIEM verifica las etiquetas de la señal y las compara con las etiquetas definidas en sus flujos de trabajo existentes.
- **Se realizan sugerencias relevantes**<br>
Aparece una sección {{< ui >}}Suggested Workflows{{< /ui >}} en el panel lateral. Muestra los tres mejores flujos de trabajo basados en las etiquetas que coinciden más estrechamente con las etiquetas de la señal. Esto garantiza que las acciones sugeridas sean conscientes del contexto y operativamente relevantes.

## Investigar {#investigate}

Una señal contiene información importante para determinar si la amenaza detectada es maliciosa. Además, puede agregar una señal a una incidencia en [Case Management](#case-management) para una investigación más profunda.

### Registros {#logs}

Haga clic en la pestaña {{< ui >}}Logs{{< /ui >}} para visualizar los registros relacionados con la señal. Haga clic en {{< ui >}}View All Related Logs{{< /ui >}} para visualizar los registros relacionados en Log Explorer.

### Entidades {#entities}

Para investigar entidades:

1. Haga clic en la pestaña {{< ui >}}Entities{{< /ui >}} para ver las entidades relacionadas con la señal, como usuarios o direcciones IP.
1. Haga clic en la flecha hacia abajo junto a {{< ui >}}View Related Logs{{< /ui >}} y:
    - Seleccione {{< ui >}}View IP Dashboard{{< /ui >}} para ver más información sobre la dirección IP en el IP Investigation dashboard.
    - Seleccione {{< ui >}}View Related Signals{{< /ui >}} para abrir Signals Explorer y ver las otras señales asociadas con la dirección IP.
1. Para entidades de entorno en la nube, como un rol asumido o un usuario de IAM, visualizar el gráfico de actividad para ver qué otras acciones realizó el usuario. Haga clic en {{< ui >}}View in Investigator{{< /ui >}} para ir al Investigator y ver más detalles.

### Señales relacionadas {#related-signals}

Haga clic en la pestaña {{< ui >}}Related Signals{{< /ui >}} para ver las señales relacionadas y la información, como campos y atributos, que comparten las señales. Haga clic en {{< ui >}}View All Related Activity{{< /ui >}} para ver las señales en Signals Explorer.

### Supresiones {#suppressions}

Para visualizar las reglas de supresión de la regla de detección que generó la señal, realice una de las siguientes acciones:

- En la sección {{< ui >}}What Happened{{< /ui >}}, pase el cursor sobre el icono de embudo y luego haga clic en {{< ui >}}Add Suppression{{< /ui >}}.
- En la sección {{< ui >}}Next Steps{{< /ui >}}, haga clic en {{< ui >}}Edit Suppressions{{< /ui >}} para ver la sección de supresión de esa regla en el editor de reglas de detección.
- Haga clic en la pestaña {{< ui >}}Suppressions{{< /ui >}} para ver una lista de supresiones, si las hay. Haga clic en {{< ui >}}Edit Suppressions{{< /ui >}} para ir al editor de reglas de detección y ver la sección de supresión de esa regla.

## Colaborar {#collaborate}

### Case Management {#case-management}

A veces necesita más información de la que está disponible en una sola señal para investigar la señal. Utilice [Case Management][6] para recopilar múltiples señales, crear cronologías, discutir con colegas y mantener un notebook del análisis y los hallazgos.

#### Crear y gestionar incidencias desde Signals Explorer {#create-and-manage-cases-from-the-signals-explorer}

En el [Signals Explorer][5], cuando utiliza la visualización {{< ui >}}List{{< /ui >}}, la columna {{< ui >}}Cases{{< /ui >}} contiene información sobre las incidencias asociadas con las señales. Puede utilizar esa columna para gestionar esas incidencias:
- Para gestionar incidencias de una sola señal, utilice la columna {{< ui >}}Cases{{< /ui >}}:
  - Si la señal tiene incidencias asociadas, puede pasar el cursor sobre el ID de la incidencia para visualizar información sobre ellas, abrirlas en una ventana nueva o desvincularlas de la señal.
  - Si la señal no tiene incidencias asociadas, haga clic en el icono {{< ui >}}Create Case{{< /ui >}} para crear una incidencia o seleccionar una incidencia existente para asociarla con la señal. Se abre la ventana Crear incidencia.
    - Para crear una incidencia, en la ventana {{< ui >}}Create Case{{< /ui >}}, ingrese el {{< ui >}}Project{{< /ui >}}, {{< ui >}}Title{{< /ui >}}, {{< ui >}}Description{{< /ui >}} y {{< ui >}}Assignee{{< /ui >}}, luego haga clic en {{< ui >}}Create Case{{< /ui >}}.
    - Para seleccionar una incidencia existente, en la ventana {{< ui >}}Create Case{{< /ui >}}, haga clic en la pestaña {{< ui >}}Add to Existing Case{{< /ui >}}. Seleccione una incidencia y haga clic en {{< ui >}}Attach to an Existing Case{{< /ui >}}.
- Para administrar incidencias para múltiples señales:
  1. Seleccione las señales que desea vincular a una incidencia.
  1. En la lista {{< ui >}}Bulk Actions{{< /ui >}} que aparece, haga clic en {{< ui >}}Create a Case{{< /ui >}} o {{< ui >}}Add to Existing Case{{< /ui >}}. Se abre la ventana Crear incidencia.
     - Para crear una incidencia, en la ventana {{< ui >}}Create Case{{< /ui >}}, ingrese el {{< ui >}}Project{{< /ui >}}, {{< ui >}}Title{{< /ui >}}, {{< ui >}}Description{{< /ui >}} y {{< ui >}}Assignee{{< /ui >}}, luego haga clic en {{< ui >}}Create Case{{< /ui >}}.
     - Para seleccionar una incidencia existente, en la ventana {{< ui >}}Create Case{{< /ui >}}, haga clic en la pestaña {{< ui >}}Add to Existing Case{{< /ui >}}. Seleccione una incidencia y haga clic en {{< ui >}}Attach to an Existing Case{{< /ui >}}.

Cuando un usuario crea una incidencia, los siguientes cambios automáticos ocurren de forma predeterminada:
- El estado de triaje se establece automáticamente en `Under Review`.
- El responsable se establece como ese usuario.

Para cambiar estos valores predeterminados, consulte [Administrar el comportamiento predeterminado para señales y incidencias de seguridad](#manage-default-behavior-for-signals-and-security-cases).

**Nota**: Si se determina que una incidencia es crítica después de una investigación adicional, haga clic en {{< ui >}}Declare Incident{{< /ui >}} en la incidencia para escalarla a un incidente.

#### Administrar incidencias relacionadas con la seguridad {#manage-security-related-cases}

La página [Cases][12] le permite visualizar incidencias específicamente para sus proyectos de seguridad. Puede filtrar las incidencias para ver solo las que le han sido asignadas o que usted creó, o incidencias que tienen un estado específico o están en un proyecto específico. También puede marcar proyectos como favoritos para que sea más fácil navegar hacia ellos.

En la sección {{< ui >}}Security Signals{{< /ui >}} de una incidencia, puede visualizar las señales asociadas con ella y hacer clic en {{< ui >}}Add Signals{{< /ui >}} para buscar filtros que asociar con la incidencia.

#### Administre el comportamiento predeterminado para señales e incidencias de seguridad {#manage-default-behavior-for-signals-and-security-cases}

En la página de configuración de [Security cases][13] de Cloud SIEM, puede administrar el comportamiento predeterminado para señales e incidencias de seguridad, para que pueda ahorrar tiempo cuando conecte señales e incidencias de seguridad entre sí, de forma manual o automática. La configuración que elija entra en vigor inmediatamente para todas las señales e incidencias de seguridad en adelante; no tienen ningún efecto retroactivo.

- **Configuración del proyecto de incidencia**

  Seleccione su proyecto de incidencia de seguridad de Cloud SIEM predeterminado y otros proyectos de seguridad para seleccionar:
  - **Proyecto de incidencia de seguridad SIEM predeterminado**: Seleccione el proyecto que aparecerá de forma predeterminada cuando conecte incidencias de seguridad a un proyecto. Este proyecto también aparece como el proyecto predeterminado en la página de [Cases][12] de Cloud SIEM.
  - **Alcance del proyecto de incidencia de seguridad**: Seleccione hasta 20 proyectos de incidencias de seguridad entre los cuales puede elegir para conectar incidencias de seguridad.

- **Valores predeterminados de creación de incidencias**

  Cuando cree una incidencia a partir de una o más señales, puede elegir usar valores de la señal para la incidencia, dejar los valores vacíos o asignarles valores estáticos, dependiendo del campo de la incidencia.
  <div class="alert alert-tip">Haga clic en <strong>Mostrar esquema de correlación de señal a incidencia</strong> para ver cómo Datadog asigna el estado de la señal al estado de la incidencia, y la gravedad de la señal a la prioridad de la incidencia.</div>

- **Configuración de adjunto de señal**

  Cuando adjunte señales a una incidencia, seleccione los valores predeterminados que se asignarán a esas señales.
  <div class="alert alert-tip">Haga clic en <strong>Mostrar mapeo de motivo de archivo de incidencia a señal</strong> para ver cómo Datadog asigna el motivo para resolver la incidencia al motivo para archivar la señal.</div>

  - **Al adjuntarse a una incidencia**:
    - **Estado de la señal** y **Asignado de la señal**: Cuando adjunte señales a una incidencia, elija mantener el estado y el asignado de la señal, o asignarles valores específicos.
    - **Permitir anulación**: Active este interruptor para permitir la anulación de valores existentes en esos campos. Si este interruptor está desactivado, el estado y el asignado seleccionados se aplican solo cuando esos campos están vacíos.
  - **Al actualizar una incidencia**:
    - **Estado de la señal**: Elija asignar un estado a la señal que corresponda con la incidencia, o dejarlo tal como está.

### Declarar un incidente {#declare-an-incident}

Ya sea que se base en una sola señal o después de una investigación de una incidencia, cierta actividad malintencionada exige una respuesta. Puede declarar incidentes en Datadog para reunir a los equipos de desarrollo, operaciones y Security para abordar un evento de Security crítico. [Incident Management][7] proporciona un marco y un flujo de trabajo para ayudar a los equipos a identificar y mitigar incidentes de manera efectiva.

Para declarar un incidente en el panel de señales:

1. Haga clic en {{< ui >}}Declare Incident{{< /ui >}} en la sección {{< ui >}}Next Steps{{< /ui >}}.
1. Complete la plantilla de incidente.

Si desea agregar la señal a un incidente, haga clic en la flecha hacia abajo junto a {{< ui >}}Declare Incident{{< /ui >}} y seleccione el incidente al que desea agregar la señal. Haga clic en {{< ui >}}Confirm{{< /ui >}}.

### Inteligencia de amenazas {#threat-intelligence}

Datadog Cloud SIEM ofrece inteligencia de amenazas integrada proporcionada por nuestros socios de inteligencia de amenazas. Estos feeds se actualizan constantemente para incluir datos sobre actividades sospechosas conocidas (por ejemplo, direcciones IP que se sabe que son utilizadas por actores malintencionados), de modo que pueda identificar rápidamente qué amenazas potenciales abordar.

Datadog enriquece automáticamente todos los registros ingeridos en busca de indicadores de compromiso (IOC) a partir de sus feeds de inteligencia de amenazas. Si un registro contiene una coincidencia con un IOC conocido, se añade un atributo `threat_intel` al evento de registro para proporcionar información adicional basada en la inteligencia disponible.

La consulta para ver todas las coincidencias de inteligencia de amenazas en el Explorador de señales Security es `@threat_intel.indicators_matched:*`. Los siguientes son atributos adicionales para consultar la inteligencia de amenazas:

- Para `@threat_intel.results.category`: attack, corp_vpn, cryptomining, malware, residential_proxy, tor, scanner
- Para `@threat_intel.results.intention`: malicious, suspicious, benign, unknown

{{< img src="security/security_monitoring/investigate_security_signals/threat_intel_results_categories.png" alt="El Explorador de señales que muestra un gráfico de barras de señales desglosadas por las categorías de inteligencia de amenazas: residential_proxy, corp_vpn, cryptomining y malware" style="width:80%;" >}}

Consulte la documentación de [Threat Intelligence][10] para obtener más información sobre los feeds de inteligencia de amenazas.

### Buscar por atributos de IP de red {#search-by-network-ip-attributes}

Cuando se detecte una actividad sospechosa en sus registros, determine si el actor sospechoso ha interactuado con sus sistemas buscando su IP de red. Utilice la siguiente consulta para buscar por atributos de IP en el Explorador de registros: `@network.ip.list:<IP address>`. La consulta busca IPs en cualquier parte de los registros, incluyendo las etiquetas, los atributos, el error y los campos de mensaje.

También puede iniciar esta consulta directamente desde el panel de señales:
1. Haga clic en la dirección IP en la sección {{< ui >}}IPS{{< /ui >}}.
2. Seleccione {{< ui >}}View Logs with @network.client.ip:<ip_address>{{< /ui >}}.

{{< img src="security/security_monitoring/investigate_security_signals/search_logs_by_ip.png" alt="El panel de señales que muestra las opciones de amenaza para la dirección IP seleccionada" style="width:90%;" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/notifications/rules/
[2]: /es/account_management/audit_trail/events/#cloud-security-platform-events
[3]: /es/account_management/rbac/
[4]: /es/logs/explorer/saved_views/
[5]: https://app.datadoghq.com/security/siem/signals
[6]: /es/incident_response/work_management/
[7]: /es/incident_response/incident_management/
[8]: /es/actions/workflows/trigger/#trigger-a-workflow-from-a-security-signal
[9]: /es/security/cloud_security_management/workflows/
[10]: /es/security/threat_intelligence
[11]: /es/security/suppressions/#create-a-suppression-rule
[12]: https://app.datadoghq.com/security/siem/cases
[13]: https://app.datadoghq.com/security/configuration/siem/case-management
[14]: /es/bits_ai/bits_security_analyst/