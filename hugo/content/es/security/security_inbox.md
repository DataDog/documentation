---
further_reading:
- link: /security/automation_pipelines/security_inbox
  tag: Documentación
  text: Agregar a las reglas de Security Inbox
- link: /security/automation_pipelines/set_due_date
  tag: Documentación
  text: Establecer reglas de fecha de vencimiento
- link: /security/cloud_security_management
  tag: Documentación
  text: Más información sobre Cloud Security
- link: /security/code_security/
  tag: Documentación
  text: Más información sobre Code Security
- link: /security/application_security/
  tag: Documentación
  text: Obtenga más información sobre App and API Protection
- link: /security/default_rules/#all
  tag: Documentación
  text: Reglas de detección predeterminadas
- link: https://www.datadoghq.com/blog/security-inbox-prioritization/
  tag: Blog
  text: Cómo prioriza los riesgos de seguridad Datadog Security Inbox
products:
- icon: cloud-security-management
  name: Cloud Security
  url: /security/cloud_security_management/
- icon: security-code-security
  name: Code Security
  url: /security/code_security/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
- icon: security-workload-security
  name: Workload Protection
  url: /security/workload_protection/
title: Security Inbox
---
{{< product-availability >}}

Security Inbox proporciona una lista procesable y consolidada de sus hallazgos de seguridad más importantes. Correlaciona y contextualiza los hallazgos de los productos de Datadog Security—vulnerabilidades, configuraciones incorrectas, riesgos de identidad y rutas de ataque—en una única vista (visualizar) priorizada del trabajo que más reduce el riesgo en su entorno.

Security Inbox responde a tres preguntas:

- **¿En qué debería trabajar mi equipo a continuación?** Los hallazgos se clasifican por gravedad, luego por riesgo correlacionado y, finalmente, por la cantidad de recursos y servicios a los que afectan.
- **¿Qué está vencido?** Las reglas de fecha de vencimiento asignan plazos de corrección a los hallazgos, para que pueda realizar un seguimiento del progreso en función de los acuerdos de nivel de servicio (SLA) a los que se compromete su organización.
- **¿Por qué este hallazgo está en mi bandeja de entrada?** Cada hallazgo llega a la bandeja de entrada a través de una regla de bandeja de entrada. Puede revisar las reglas predeterminadas, deshabilitar las que no se ajusten a su organización y crear las suyas propias.

{{< img src="security/security_inbox_8.png" alt="Security Inbox muestra hallazgos de seguridad priorizados con gravedad, estado de triaje y resúmenes de SLA de corrección." width="100%">}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">Algunos de los productos que alimentan Security Inbox no están disponibles en este sitio ({{< region-param key="dd_site_name" >}}). Los hallazgos de Code Security no llegan a la bandeja de entrada y Linear no está disponible para la creación de tickets.</div>
{{% /site-region %}}

{{% site-region region="gov2" %}}
<div class="alert alert-danger">Algunos de los productos que alimentan Security Inbox no están disponibles en este sitio ({{< region-param key="dd_site_name" >}}). Los hallazgos de Code Security y App and API Protection no llegan a la bandeja de entrada. La creación de tickets en Linear, Datadog Case Management y la gestión de asignados tampoco están disponibles.</div>
{{% /site-region %}}

## Qué aparece en Security Inbox {#what-appears-in-security-inbox}

Las reglas de la bandeja de entrada controlan qué hallazgos llegan a Security Inbox. Datadog proporciona un conjunto de reglas de bandeja de entrada predeterminadas, compiladas por el equipo de investigación de Datadog Security, que muestran los hallazgos con mayor probabilidad de representar un riesgo real. Puede revisar estas reglas, desactivar reglas individuales y agregar sus propias reglas.

Las reglas se evalúan en orden. Para cada hallazgo, Datadog verifica sus reglas desde la parte superior hasta que una coincide, y luego se detiene. Si ninguna regla coincide, el hallazgo no entra en la bandeja de entrada.

Para ver las reglas que completan su bandeja de entrada, haga clic en **Customize inbox** en la barra de filtros de Security Inbox, o vaya a **Security** > **Settings** > [**Findings Automation**][24].

### Tipos de hallazgos admitidos {#supported-finding-types}

Las reglas de la bandeja de entrada pueden coincidir con cualquiera de los siguientes tipos de hallazgos:

| Tipo de hallazgo | Fuente |
|---|---|
| [Configuración errónea][2] | Cloud Security |
| [Riesgo de identidad][3] | Cloud Security |
| [Ruta de ataque][1] | Cloud Security |
| [Vulnerabilidad de servidor][14] | Cloud Security |
| [Vulnerabilidad de imagen de contenedor][14] | Cloud Security |
| [Actividad de carga de trabajo][15] | Workload Protection |
| [Vulnerabilidad de biblioteca][4] | Code Security |
| [Vulnerabilidad de código estático][16] | Code Security |
| [Vulnerabilidad de código en tiempo de ejecución][5] | Code Security |
| [Infrastructure as Code][17] | Code Security |
| [Secreto][18] | Code Security |
| [Seguridad de API][19] | Protección de aplicaciones y API |

Security Inbox muestra solo los tipos de hallazgos que tiene permiso para leer. Un hallazgo que no puede abrir en su propio explorador no aparece en su bandeja de entrada.

### Riesgos detectados {#detected-risks}

Security Inbox toma en cuenta los siguientes riesgos detectados cuando evalúa un hallazgo:

- **Acceso público**: Los recursos expuestos públicamente conllevan riesgos elevados, especialmente si contienen vulnerabilidades o errores de configuración. Para obtener más información, consulte [Cómo determina Datadog si los recursos son de acceso público][6].
- **Acceso privilegiado**: Los recursos con acceso privilegiado conllevan riesgos elevados, ya que otorgan permisos elevados que pueden ampliar la superficie de ataque.
- **Bajo ataque**: Los recursos que presentan actividad de seguridad sospechosa conllevan riesgos elevados. Los recursos se marcan como "Bajo ataque" si se ha detectado una señal de seguridad en el recurso en los últimos 15 días.
- **Exploit disponible**: Las vulnerabilidades con exploits públicos disponibles conllevan riesgos elevados. La disponibilidad de un exploit público se verifica con diferentes bases de datos de exploits, como [cisa.gov][7], [exploit-db.com][8] y [nvd.nist.gov][9].
- **En producción**: Las vulnerabilidades en entornos de producción conllevan riesgos elevados. El entorno se calcula a partir de las etiquetas `env` y `environment`.

## Cómo funciona la priorización de Security Inbox {#how-security-inbox-prioritization-works}

Security Inbox clasifica los hallazgos considerando primero la gravedad de un hallazgo, seguida por el número de riesgos correlacionados y, luego, el número de recursos y servicios afectados.

- **Gravedad (Crítica, Alta, Media y Baja)**: La gravedad se determina mediante el [Datadog Security Scoring Framework][10] para configuraciones incorrectas en la nube y riesgos de identidad, y mediante CVSS 3.1 para vulnerabilidades.
- **Número de riesgos detectados**: Cuando dos hallazgos tienen la misma gravedad, se le da mayor prioridad al que tiene un mayor número de riesgos detectados.
- **Número de recursos y servicios afectados**: Si dos hallazgos comparten tanto la misma gravedad como el mismo número de riesgos detectados, se prioriza el hallazgo que afecta a un mayor número de recursos y servicios.

**Nota**: El tipo de hallazgo, riesgo detectado o recurso afectado no influye en la priorización.

## Seguimiento de la corrección según las fechas de vencimiento {#track-remediation-against-due-dates}

[Reglas de fecha de vencimiento][12] asignan una fecha límite de corrección a un hallazgo según su gravedad y tipo. Cuando las fechas de vencimiento están configuradas, la tarjeta **SLA de corrección** en la parte superior de Security Inbox informa el progreso respecto a ellas:

| Estado | Significado |
|---|---|
| Vencido | El hallazgo ha superado su fecha de vencimiento de corrección. |
| Vence pronto | El hallazgo vence dentro de los próximos siete días. |
| Aún no vence | El hallazgo vence en más de siete días. |

Haga clic en un estado para filtrar la lista a esos hallazgos. También puede filtrar por **Overdue Status** desde la barra de filtros.

Otras dos tarjetas resumen el mismo conjunto de hallazgos:

- **Gravedad**: El número de hallazgos críticos y altos.
- **Estado**:
  - **Triaje pendiente**: El número de hallazgos sin ticket ni responsable asignado.
  - **En curso**: El número de hallazgos que tienen al menos uno.

## Investigar hallazgos {#investigate-findings}

### Filtrar y agrupar {#filter-and-group}

Aplique filtros para limitar la bandeja de entrada por cualquier faceta en el esquema de hallazgos, incluyendo equipo, gravedad, tipo de hallazgo, servicio y recurso. Para filtrar por un atributo que no se ofrece como faceta, escriba su nombre en el menú **Edit Filters** y agréguelo como un filtro personalizado.

Use **Group by** para agregar hallazgos por hasta dos campos a la vez. La bandeja de entrada agrupa por título de hallazgo de forma predeterminada, lo que colapsa cada ocurrencia del mismo problema subyacente en una sola fila. Establezca **Group by** en **None** para ver una fila por hallazgo.

### Cambiar las columnas{#change-the-columns}

Haga clic en el icono de engranaje sobre la tabla para agregar, eliminar o reordenar columnas. Las columnas predeterminadas son tipo de hallazgo, título, gravedad, riesgos, recurso y estado de triaje.

<div class="alert alert-info">Las opciones de columna están disponibles en tablas no agrupadas y en tablas dentro de grupos expandidos. No están disponibles en la tabla externa de una visualización agrupada.</div>

### Vistas guardadas {#saved-views}

Guarde la combinación actual de filtros, agrupación y columnas como una visualización guardada, para que pueda volver a ella más tarde o compartirla con su equipo. Las visualizaciones guardadas se enumeran en la barra lateral **Visualizaciones**.

### Exportar {#export}

Haga clic en **Exportar** sobre la tabla para exportar sus hallazgos a otras herramientas:

- **Exportar a Sheets**: Envíe los hallazgos a [Datadog Sheets][21] para una exploración y generación de informes más detallados.
- **Abrir en el editor DDSQL**: Abra la consulta equivalente en el [Editor DDSQL][22] para agregaciones complejas y análisis personalizados.
- **Descargar como CSV**: Descargue los hallazgos como un archivo CSV.
- **Copiar como cURL**: Copie la solicitud de API equivalente a su portapapeles.

## Triaje y remediación {#triage-and-remediate}

La columna **Triaje** contiene acciones para un solo hallazgo. Haga clic en **Asignar** para establecer un [responsable][23], o en **Agregar ticket** para crear o vincular un ticket, sin salir de la tabla.

Para actuar sobre varios hallazgos a la vez, selecciónelos y utilice:

- **Emisión de tickets**: Cree un issue de Jira, un incidente de ServiceNow, un issue de Linear o una incidencia de seguridad de Datadog para los hallazgos seleccionados; o desvincule uno existente. Para la configuración y la sincronización bidireccional, consulte [Ticketing Integrations][20].
- **Assignee**: Establezca o elimine el [assignee][23] en los hallazgos seleccionados.
- **Muting**: Silencie los hallazgos que haya evaluado y aceptado.
- **Severity**: Ajuste la Severity de los hallazgos seleccionados.

La selección masiva está disponible en tablas no agrupadas y dentro de grupos expandidos. Haga clic en cualquier hallazgo para abrir su panel lateral, que muestra el detalle completo de la detección y la guía de remediación para ese tipo de hallazgo.

## Informe sobre su bandeja de entrada {#report-on-your-inbox}

La pestaña **Reporting** muestra un panel de tendencias de Security Inbox a lo largo del tiempo, para que pueda realizar un seguimiento de si la remediación mantiene el ritmo de la detección.

## Utilice el mapa de contexto de seguridad para identificar y mitigar vulnerabilidades {#use-the-security-context-map-to-identify-and-mitigate-vulnerabilities}

El mapa de contexto de seguridad para [Attack Paths](#supported-finding-types) proporciona una visualización integral para ayudar a identificar y abordar posibles puntos de vulneración. Mapea configuraciones incorrectas interconectadas, brechas de permisos y vulnerabilidades que los atacantes podrían explotar.

Las características clave incluyen:

- **Risk assessment**: El mapa permite a los equipos de seguridad evaluar el impacto más amplio de las vulnerabilidades y configuraciones incorrectas. Esto incluye evaluar si las políticas de seguridad (como las rutas de acceso y los permisos) necesitan actualizarse, y comprender las implicaciones de cumplimiento de la exposición, particularmente cuando hay datos confidenciales en riesgo dentro del radio de impacto.
- **Actionable context for immediate response**: El mapa incluye información sobre la propiedad del servicio y otro contexto relevante, lo que permite a los equipos tomar decisiones informadas en tiempo real. Los equipos pueden tomar medidas directamente desde el mapa ejecutando flujos de trabajo integrados, compartiendo enlaces de problemas de seguridad y accediendo a la vista de la consola de AWS de los recursos para una remediación eficiente, todo sin cambiar de herramienta.

{{< img src="security/security_context_map.png" alt="El mapa de contexto de seguridad que muestra una instancia de AWS EC2 accesible públicamente con una configuración incorrecta crítica" width="100%">}}

## Personalizar Security Inbox {#customize-security-inbox}

[Automation Pipelines][13] le permiten configurar las reglas que deciden qué llega a su bandeja de entrada y cuándo vencen las remediaciones para cada hallazgo. Utilice las automatizaciones para:

- **Vuelva a mostrar hallazgos no capturados de forma predeterminada**: Utilice reglas personalizadas para resaltar los hallazgos que las reglas predeterminadas no detectan, para asegurarse de que no se pasen por alto los hallazgos críticos.
- **Fortalezca el cumplimiento y aborde las preocupaciones clave del sistema**: Aborde las preocupaciones que afectan el cumplimiento normativo o los sistemas comerciales importantes, independientemente de su gravedad.
- **Priorice los riesgos actuales**: Enfóquese en las amenazas inmediatas, como los riesgos de identidad después de un incidente o las vulnerabilidades de toda la industria.
- **Enforce remediation timelines**: Aplique los plazos de remediación según la gravedad, para que el trabajo vencido sea visible para todo el equipo.

Para obtener más información, consulte [Agregar a reglas de bandeja de entrada de seguridad][11] y [Establecer reglas de fecha de entrega][12].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/default_rules/?category=all#all
[2]: /es/security/cloud_security_management/misconfigurations/
[3]: /es/security/cloud_security_management/identity_risks/
[4]: /es/security/code_security/software_composition_analysis
[5]: /es/security/code_security/iast
[6]: /es/security/cloud_security_management/guide/public-accessibility-logic/
[7]: https://www.cisa.gov/
[8]: https://www.exploit-db.com/
[9]: https://nvd.nist.gov/
[10]: /es/security/cloud_security_management/severity_scoring/#cloud-security-severity-scoring-framework
[11]: /es/security/automation_pipelines/security_inbox
[12]: /es/security/automation_pipelines/set_due_date
[13]: /es/security/automation_pipelines/
[14]: /es/security/cloud_security_management/vulnerabilities/
[15]: /es/security/workload_protection/
[16]: /es/security/code_security/static_analysis/
[17]: /es/security/code_security/iac_security/
[18]: /es/security/code_security/secret_scanning/
[19]: /es/security/application_security/api_posture/
[20]: /es/security/ticketing_integrations/
[21]: /es/sheets/
[22]: /es/ddsql_editor/
[23]: /es/security/assignee_management/
[24]: https://app.datadoghq.com/security/configuration/findings-automation?opened-sections=add_to_inbox