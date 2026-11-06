---
aliases:
- /es/security/application_security/code_security/
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/datadog-code-security/
  tag: Blog
  text: Proteja el ciclo de vida del código y las bibliotecas de su aplicación con
    Datadog Code Security
- link: https://www.datadoghq.com/blog/code-security-secret-scanning
  tag: Blog
  text: Detecte y bloquee credenciales expuestas con Datadog Secret Scanning
- link: /security/code_security/iast/setup/
  tag: Documentación
  text: Configure el Análisis de código en tiempo de ejecución (IAST)
- link: /security/code_security/iast/security_controls/
  tag: Documentación
  text: Controles de seguridad
- link: /security/ticketing_integrations
  tag: Documentación
  text: Integraciones de tickets
- link: /security/automation_pipelines/
  tag: Documentación
  text: Pipelines de automatización
- link: /security/notifications/
  tag: Documentación
  text: Notificaciones de seguridad
title: Análisis de código en tiempo de ejecución (IAST)
---
## Descripción general {#overview}

El Análisis de código en tiempo de ejecución (IAST) de Datadog identifica vulnerabilidades a nivel de código en sus servicios, utilizando un enfoque de Interactive Application Security Testing (IAST) para encontrar vulnerabilidades dentro del código de su aplicación según la instrumentación de aplicaciones de Datadog. IAST permite a Datadog identificar vulnerabilidades utilizando tráfico de aplicaciones legítimo en lugar de depender de pruebas externas que podrían requerir configuración adicional o programación periódica. También monitorea las interacciones de su código con otros componentes de su pila, como bibliotecas e infraestructura, proporcionando una vista actualizada de su superficie de ataque.

## Cómo funciona {#how-it-works}

Análisis de código en tiempo de ejecución (IAST) utiliza la biblioteca de rastreo de Datadog para seguir los datos controlados por el usuario a medida que fluyen a través de su aplicación en tiempo de ejecución. Solo se informa una vulnerabilidad cuando IAST puede confirmar que la entrada contaminada llega a un punto vulnerable en el código, lo que mantiene los hallazgos procesables.

- **Seguimiento de fuentes de datos:** IAST observa los datos que ingresan a su aplicación desde fuentes externas, como URL de solicitud, cuerpos o encabezados. Estas entradas se etiquetan y rastrean a lo largo de su ciclo de vida.
- **Análisis del flujo de datos:** La biblioteca de rastreo de Datadog rastrea cómo se mueven los datos de entrada a través de la aplicación, incluso cuando se transforman, dividen o combinan. Esto permite a IAST comprender si la entrada original llega a partes sensibles del código y cómo lo hace.
- **Identificación de puntos vulnerables:** IAST detecta ubicaciones de código donde las entradas controladas por el usuario se utilizan de formas potencialmente inseguras; por ejemplo, en consultas SQL, ejecución de código dinámico o renderizado HTML.
- **Confirmación de la vulnerabilidad:** Solo se informa una vulnerabilidad cuando IAST puede confirmar que la entrada contaminada realmente llega a un punto vulnerable en el código. Este enfoque minimiza los falsos positivos y mantiene los hallazgos procesables.

## Tipos de vulnerabilidad admitidos {#supported-vulnerability-types}

Datadog IAST detecta los siguientes tipos de vulnerabilidades a nivel de código en los lenguajes admitidos. La cobertura puede variar según el idioma y el framework; para obtener soporte a nivel de framework, consulte [Requisitos de compatibilidad][5].

| Gravedad | Regla de detección | Java | .NET | Node.js | Python |
|----------|---------------------------------------|------|------|---------|--------|
| Crítica | Inyección NoSQL | FALSE | TRUE | TRUE | FALSE |
| Crítica | Inyección SQL | TRUE | TRUE | TRUE | TRUE |
| Crítica | Falsificación de solicitud del lado del servidor (SSRF) | TRUE | TRUE | TRUE | TRUE |
| Crítica | Inyección de código | FALSE | FALSE | TRUE | FALSE |
| Crítica | Inyección de comandos | TRUE | TRUE | TRUE | TRUE |
| Alta | Inyección LDAP | TRUE | TRUE | TRUE | FALSE |
| Alta | Inyección de HTML en correo electrónico | TRUE | TRUE | TRUE | FALSE |
| Alta | Secretos codificados | TRUE | TRUE | TRUE | FALSE |
| Alta | Contraseñas codificadas | FALSE | FALSE | TRUE | FALSE |
| Alta | Recorrido de ruta | TRUE | TRUE | TRUE | TRUE |
| Alta | Violación de límite de confianza | TRUE | TRUE | FALSE | FALSE |
| Alta | Cross-Site Scripting (XSS) | TRUE | TRUE | FALSE | FALSE |
| Alta | Deserialización no confiable | TRUE | FALSE | FALSE | FALSE |
| Alta | Redirección no validada | TRUE | TRUE | TRUE | FALSE |
| Alta | Inyección de XPath | TRUE | TRUE | FALSE | FALSE |
| Alta | Inyección de encabezado | TRUE | TRUE | TRUE | TRUE |
| Alta | Fuga de listado de directorios | TRUE | FALSE | FALSE | FALSE |
| Alta | Escape de HTML predeterminado no válido           | TRUE | FALSE | FALSE | FALSE |
| Alta | Manipulación de verbos                        | VERDADERO | FALSO | FALSO | FALSO |
| Medio | Sin cookie SameSite                   | VERDADERO | VERDADERO | VERDADERO | VERDADERO |
| Medio | Cookie insegura                      | VERDADERO | VERDADERO | VERDADERO | VERDADERO |
| Medio | Sin cookie HttpOnly                   | VERDADERO | VERDADERO | VERDADERO | VERDADERO |
| Medio | Hashing débil                         | VERDADERO | VERDADERO | VERDADERO | VERDADERO |
| Medio | Cifrado débil                          | VERDADERO | VERDADERO | VERDADERO | VERDADERO |
| Medio | Fuga de rastreo de pila                      | VERDADERO | VERDADERO | FALSO | FALSO |
| Medio | Inyección de reflexión                 | VERDADERO | VERDADERO | FALSO | FALSO |
| Medio | Protocolo de autenticación inseguro     | VERDADERO | VERDADERO | FALSO | FALSO |
| Medio | Clave codificada | FALSO | VERDADERO | FALSO | FALSO |
| Medio | Diseño de JSP inseguro                  | VERDADERO | FALSO | FALSO | FALSO |
| Bajo | Falta el encabezado HSTS                   | VERDADERO | VERDADERO | VERDADERO | FALSO |
| Bajo | Falta el encabezado X-Content-Type-Options | VERDADERO | VERDADERO | VERDADERO | FALSO |
| Bajo | Aleatoriedad débil                       | VERDADERO | VERDADERO | VERDADERO | VERDADERO |
| Bajo | Admin Console activa                  | VERDADERO | FALSO | FALSO | FALSO |
| Bajo | Tiempo de espera de sesión                       | VERDADERO | FALSO | FALSO | FALSO |
| Bajo | Reescritura de sesión                     | VERDADERO | FALSO | FALSO | FALSO |

## Capacidades clave {#key-capabilities}

### Revise y priorice las vulnerabilidades {#review-and-prioritize-vulnerabilities}

El [Explorador de vulnerabilidades para IAST][1] proporciona una vista dedicada centrada en las vulnerabilidades a nivel de código detectadas por IAST. Todos los hallazgos en este explorador corresponden a vulnerabilidades confirmadas en servicios que se ejecutan con la biblioteca de rastreo de Datadog y con IAST habilitado. Cada capacidad de Code Security tiene su propio explorador (SAST, SCA, IAST, escaneo de secretos e IaC), por lo que los hallazgos de IAST no se mezclan con otros tipos en esta vista.

Cada hallazgo incluye una breve descripción, los servicios afectados, el tipo de vulnerabilidad, la primera y última hora de detección, y el archivo, método y número de línea exactos donde se confirmó el problema. Puede filtrar los resultados por servicio, equipo, entorno, gravedad y otras facetas para centrarse en el trabajo que es importante para su grupo.

#### Puntuación de severidad de Datadog {#datadog-severity-score}

Debido a que IAST detecta vulnerabilidades en su código de primera parte, los hallazgos no tienen una puntuación CVE o CVSS pública. Datadog asigna una **gravedad base** para cada tipo de vulnerabilidad (por ejemplo, inyección de comandos o inyección SQL), y luego ajusta esa base a la **Datadog Severity Score** según el contexto de tiempo de ejecución y las señales de explotabilidad observadas en su entorno. Estos factores ayudan a distinguir el riesgo teórico de las vulnerabilidades que tienen más probabilidades de ser explotadas en entornos del mundo real. La siguiente tabla describe cómo influye cada factor en la puntuación final.

| Factor de riesgo | Cómo se evalúa | Impacto en la puntuación |
|---|---|---|
| Gravedad base | Definida por Datadog según el tipo de vulnerabilidad (por ejemplo, inyección de comandos, inyección SQL). | Punto de partida para la puntuación de gravedad. |
| Contexto de tiempo de ejecución en producción | Si el servicio afectado se está ejecutando en un entorno de producción. | Disminuye si el servicio no se está ejecutando en producción. |
| Bajo ataque | Evidencia de actividad de ataque activa dirigida al servicio. | Disminuye si no se observa actividad de ataque. |

#### Indicadores de tiempo de ejecución {#runtime-indicators}

El panel lateral de vulnerabilidades muestra los factores de contexto de tiempo de ejecución como indicadores, para que pueda ver de un vistazo por qué se ajustó la puntuación de un hallazgo:

- **{{< ui >}}Service In Production{{< /ui >}}**: Corresponde al factor **Contexto de tiempo de ejecución en producción**. Datadog determina si un servicio se está ejecutando en producción a partir de sus etiquetas `env` y `environment`. Si el servicio afectado no se está ejecutando en producción, la Datadog Severity Score disminuye.
- **{{< ui >}}Exposed to Attacks{{< /ui >}}**: Corresponde al factor **Bajo ataque**. Un servicio se marca como expuesto a ataques si se ha detectado una señal de seguridad en él en los últimos 15 días. Si no se observa actividad de ataque, el panel muestra {{< ui >}}Not Exposed to Attacks{{< /ui >}} y la Datadog Severity Score disminuye.

Para ver cómo cada indicador afectó a un hallazgo específico, abra la pestaña {{< ui >}}Datadog Severity Breakdown{{< /ui >}} en el panel lateral. Para obtener más información sobre cómo se evalúan estos riesgos en Datadog Security, consulte [Security Inbox][19].

### Remediar una vulnerabilidad de código {#remediate-a-code-vulnerability}

Haga clic en cualquier hallazgo en el [Explorador de vulnerabilidades para IAST][1] para abrir el panel lateral de vulnerabilidades, el cual brinda a los desarrolladores e ingenieros de seguridad el contexto completo necesario para solucionar el problema.

El panel resume la gravedad del hallazgo, el tipo de vulnerabilidad, la fecha de vencimiento y los indicadores de tiempo de ejecución (como {{< ui >}}Exposed to Attacks{{< /ui >}} y {{< ui >}}Service In Production{{< /ui >}}), y muestra dónde se confirmó la vulnerabilidad en su código, cuándo se detectó por primera y última vez, qué servicio, entorno y equipo afecta, y referencias de estándares relevantes como CWE. Cuando la integración de [GitHub][7], [GitLab][8] o [Azure DevOps][18] está habilitada, Datadog también muestra el commit que introdujo la vulnerabilidad y un fragmento del código vulnerable.

El panel lateral incluye pestañas para {{< ui >}}Data Flow{{< /ui >}} (cómo la entrada contaminada llega al sumidero vulnerable), {{< ui >}}Remediation{{< /ui >}} (guía paso a paso y código de ejemplo para su framework), {{< ui >}}Datadog Severity Breakdown{{< /ui >}} (cómo el contexto de tiempo de ejecución dio forma a la puntuación) y {{< ui >}}More Information{{< /ui >}} (referencias relacionadas). Desde el panel {{< ui >}}Next Steps{{< /ui >}} a la derecha, puede cambiar el estado del hallazgo, silenciarlo, crear un ticket de Jira o ServiceNow, o ir directamente a los pasos de remediación.

Para flujos de trabajo repetibles, utilice {{< ui >}}Set up Automation{{< /ui >}} para aplicar las mismas acciones automáticamente a hallazgos nuevos y existentes que coincidan con sus criterios. Consulte [Automatizar la clasificación y remediación](#automate-triage-and-remediation) para obtener más detalles.

### Crear tickets a partir de hallazgos {#create-tickets-from-findings}

Puede crear un ticket bidireccional en Jira o ServiceNow directamente desde cualquier hallazgo de IAST para realizar un seguimiento y remediar problemas en sus flujos de trabajo existentes. El estado del ticket permanece sincronizado entre Datadog y su herramienta de tickets, por lo que las actualizaciones realizadas en cualquiera de los sistemas se mantienen alineadas. Para obtener más información, consulte [Integraciones de tickets][13].

Para crear tickets de forma masiva o como parte de un proceso repetible, utilice [Automation Pipelines][14] para abrir tickets automáticamente para los hallazgos que coincidan con condiciones como gravedad, servicio, entorno o equipo.

### Silenciar hallazgos {#mute-findings}

Para suprimir un hallazgo, haga clic en {{< ui >}}Mute{{< /ui >}} en el panel de detalles del hallazgo. Esto abre un flujo de trabajo donde puede [crear una Regla de automatización][15] para el filtrado consciente del contexto por valores de etiqueta (por ejemplo, por `service` o `env`). Silenciar un hallazgo lo oculta de la clasificación activa y lo excluye de los informes.

Para restaurar un hallazgo silenciado, haga clic en {{< ui >}}Unmute{{< /ui >}} en el panel de detalles. También puede usar el filtro {{< ui >}}Status{{< /ui >}} en el [Explorador de vulnerabilidades para IAST][1] para revisar los hallazgos silenciados.

### Notificar sobre nuevos hallazgos {#notify-on-new-findings}

Dirija los nuevos hallazgos de IAST al equipo correcto tan pronto como se detecten. Las notificaciones de Datadog admiten Slack, Microsoft Teams, correo electrónico, PagerDuty, webhooks y más, para que cada equipo pueda recibir los hallazgos donde ya trabaja. Para obtener detalles sobre la configuración, consulte [Security Notifications][16].

### Automatizar la clasificación y la remediación {#automate-triage-and-remediation}

Utilice [Automation Pipelines][14] para aplicar acciones consistentes de clasificación y remediación a los hallazgos de IAST nuevos y existentes, sin intervención manual. Desde el menú {{< ui >}}Set up Automation{{< /ui >}} en el panel lateral de hallazgos, o desde la página de configuración de Automation Pipelines, usted puede:

- [Silenciar hallazgos][15] que coincidan con condiciones como servicio, entorno o tipo de vulnerabilidad.
- [Establecer una fecha de vencimiento][14] basada en la gravedad y el contexto de tiempo de ejecución, para que los SLA de remediación se apliquen automáticamente.
- [Agregar hallazgos a la Security Inbox][14] para enfocar a su equipo en el trabajo de mayor prioridad.
- [Crear tickets][13] en Jira o ServiceNow para los hallazgos coincidentes.
- [Notificar][16] al equipo correcto en Slack, Microsoft Teams, correo electrónico u otros canales.

Las Automation Pipelines se aplican tanto a los hallazgos recién detectados como a los que ya existen en Datadog, por lo que los cambios de política se aplican retroactivamente en todo su entorno.

### Contexto de vulnerabilidad a nivel de código en Application Performance Monitoring {#code-level-vulnerability-context-in-apm}

IAST enriquece la información que Application Performance Monitoring (APM) ya recopila al marcar los servicios donde se han confirmado vulnerabilidades a nivel de código. Los servicios vulnerables se resaltan directamente en la Security view en el [APM Catalog][17], para que pueda pasar de un servicio vulnerable a sus trazas, registros y contexto de infraestructura con un solo clic.

## Ciclo de vida de la vulnerabilidad {#vulnerability-lifecycle}

Datadog rastrea las vulnerabilidades de IAST al nivel de **servicio**, según lo que confirmen las bibliotecas de rastreo de Datadog en sus aplicaciones en ejecución. Se abre una vulnerabilidad cuando IAST confirma una vulnerabilidad a nivel de código en un servicio en ejecución. Se cierra una vulnerabilidad cuando Datadog ya no la detecta de acuerdo con las reglas de ciclo de vida a continuación.

| Producto | Contexto | Escenario | Cuándo se abre una vulnerabilidad | Cuándo se cierra una vulnerabilidad |
|---|---|---|---|---|
| IAST | Servicio | Servicio en ejecución | Datadog confirma una vulnerabilidad a nivel de código en un servicio en ejecución. | Después de 14 días, si la vulnerabilidad no se vuelve a detectar durante ese período. |
| IAST | Servicio | Nueva versión del servicio implementada | Datadog confirma una vulnerabilidad a nivel de código en un servicio en ejecución. | 24 horas después de que la vulnerabilidad ya no se detecte en la nueva versión, en el entorno donde se detectó originalmente. |

Si una vulnerabilidad previamente cerrada se detecta de nuevo en un plazo de 15 meses, Datadog la vuelve a abrir automáticamente para que no se pierdan los problemas recurrentes.

## Configurar Análisis de código en tiempo de ejecución (IAST) {#set-up-runtime-code-analysis-iast}

Para habilitar IAST, configure Datadog Tracing Library para su servicio. Encontrará instrucciones detalladas específicas para cada lenguaje en [Configurar Análisis de código en tiempo de ejecución (IAST)][9]. Si necesita ayuda adicional, comuníquese con el [soporte de Datadog][11].

Para obtener información sobre cómo deshabilitar IAST, consulte [Disabling Code Security][12].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/appsec/vm/code
[3]: /es/integrations/jira/
[4]: /es/account_management/rbac/permissions/#integrations
[5]: /es/security/code_security/iast/setup/#using-datadog-tracing-libraries
[7]: /es/integrations/github/
[8]: /es/integrations/gitlab/
[18]: /es/integrations/azure_devops/
[19]: /es/security/security_inbox/#what-appears-in-security-inbox
[9]: /es/security/code_security/iast/setup/
[10]: https://app.datadoghq.com/security/configuration/code-security/setup
[11]: https://www.datadoghq.com/support/
[12]: /es/security/code_security/troubleshooting
[13]: /es/security/ticketing_integrations
[14]: /es/security/automation_pipelines/
[15]: /es/security/automation_pipelines/mute
[16]: /es/security/notifications/
[17]: https://app.datadoghq.com/services?lens=Security