---
aliases:
- /es/account_management/org_settings/sensitive_data_detection
- /es/sensitive_data_scanner/
disable_toc: false
further_reading:
- link: /security/sensitive_data_scanner/setup/telemetry_data
  tag: Documentación
  text: Configurar Sensitive Data Scanner para Datos de Telemetría
- link: /security/sensitive_data_scanner/setup/cloud_storage
  tag: Documentación
  text: Configurar Sensitive Data Scanner para Almacenamiento en la Nube
- link: coterm
  tag: Documentación
  text: 'CoTerm: Monitorear sesiones de terminal y actividades sensibles en sistemas
    locales y remotos'
- link: /data_security/
  tag: Documentación
  text: Reduciendo riesgos relacionados con datos
- link: https://www.datadoghq.com/blog/scaling-sensitive-data-scanner/
  tag: Blog
  text: Descubrir, clasificar y remediar problemas de datos sensibles a gran escala
    con Sensitive Data Scanner
- link: https://www.datadoghq.com/blog/sensitive-data-scanner/
  tag: Blog
  text: Construir una estrategia moderna de cumplimiento de datos con Sensitive Data
    Scanner de Datadog
- link: https://www.datadoghq.com/blog/sensitive-data-management-best-practices/
  tag: Blog
  text: Mejores prácticas para la gestión de datos sensibles
- link: https://www.datadoghq.com/blog/data-security/
  tag: Blog
  text: Descubrir datos sensibles en sus almacenes de datos en la nube con Data Security
- link: https://www.datadoghq.com/blog/hipaa-compliance-sensitive-data-scanner/
  tag: Blog
  text: Cómo las empresas sujetas a los requisitos de HIPAA gestionan datos sensibles
    con Datadog
- link: https://www.datadoghq.com/blog/sds-dlp-for-financial-service-companies/
  tag: Blog
  text: Cómo las empresas de servicios financieros descubren, clasifican y gestionan
    datos sensibles con Datadog
- link: https://www.datadoghq.com/blog/sds-for-insurance-companies/
  tag: Blog
  text: Cómo las compañías de seguros descubren, clasifican y actúan sobre los riesgos
    de datos sensibles con Datadog
- link: https://www.datadoghq.com/blog/llm-aws-strands
  tag: Blog
  text: Obtener visibilidad en los flujos de trabajo de Strands Agents con Datadog
    Agent Observability
- link: https://www.datadoghq.com/blog/observability-pipelines-mssp
  tag: Blog
  text: Simplificar la recolección y agregación de registros para MSSPs con Datadog
    Observability Pipelines
- link: https://www.datadoghq.com/blog/datadog-cloud-security-compliance
  tag: Blog
  text: Escalar el cumplimiento a través de marcos globales con Datadog Cloud Security
title: Sensitive Data Scanner
---
## Visión General {#overview}

Los datos sensibles, como números de tarjetas de crédito, claves de API, direcciones IP e información personal identificable (PII), a menudo se filtran de manera no intencionada, lo que puede exponer a su organización a riesgos de seguridad y cumplimiento. Los datos sensibles se pueden encontrar en:
 
- Tramos de APM
- Repositorios de código
- Eventos de Event Management
- Trazas de Agent Observability
- Eventos de RUM
- Datos de telemetría, como registros de aplicaciones

Los datos sensibles también pueden ser trasladados involuntariamente a recursos de almacenamiento en la nube cuando los equipos de ingeniería mueven sus cargas de trabajo a la nube. El escáner de datos sensibles de Datadog puede ayudar a prevenir filtraciones de datos sensibles y limitar los riesgos de incumplimiento al descubrir, clasificar y, opcionalmente, redactar datos sensibles.

**Nota**: Las herramientas y políticas de Datadog cumplen con PCI v4.0. Para más información, consulte [Cumplimiento de PCI DSS][1].

## Escanear datos de telemetría {#scan-telemetry-data}

{{< img src="sensitive_data_scanner/telemetry_data_issues.png" alt="Se detectaron cinco hallazgos sensibles diferentes, donde dos tienen prioridad crítica, uno tiene prioridad media y dos son informativos." style="width:100%;" >}}

El escáner de datos sensibles puede escanear sus datos [en la nube](#in-the-cloud) o [dentro de su entorno](#in-your-environment).

### En la nube  {#in-the-cloud}

Con Sensitive Data Scanner en la nube, envía registros y eventos al backend de Datadog, por lo que los datos salen de su entorno antes de ser redactados. Los registros y eventos se escanean y se redactan en el backend de Datadog durante el procesamiento, por lo que los datos sensibles se redactan antes de que los eventos sean indexados y mostrados en Datadog UI.

Los datos que pueden ser escaneados y redactados son:

- **Registros**: Todo el contenido de registro estructurado y no estructurado, incluyendo mensajes de registro y valores de atributos
- **APM**: Solo valores de atributos de tramos
- **RUM**: Solo valores de atributos de eventos
- **Eventos**: Solo valores de atributos de eventos

Opcionalmente, las tasas de muestreo pueden establecerse entre el 10% y el 99% para cada producto. Esto ayuda a gestionar los costos cuando comienza, al reducir la cantidad de datos que se escanean en busca de información sensible.

Para cada [regla de escaneo][17], se puede aplicar una de las siguientes acciones a los datos sensibles coincidentes:

- **Redactar**: Reemplace todos los datos coincidentes con un solo token que elija, como `[sensitive_data]`.
- **Redactar parcialmente**: Reemplace una porción específica de todos los valores coincidentes.
- **Hash**: Reemplace todos los datos coincidentes con un identificador único no reversible.
- **Enmascarar** (disponible solo para registros): Ofusque todos los valores coincidentes. Los usuarios con el permiso `Data Scanner Unmask` pueden desofuscar (desenmascarar) y ver estos datos en Datadog. Consulte [Acción de enmascarar][16] para más información.

**Nota**: Al escanear datos muestreados, no podrás seleccionar acciones que ofusquen los datos que escanea.

Para usar Sensitive Data Scanner, configure un grupo de escaneo para definir qué datos escanear y luego establezca reglas de escaneo para determinar qué información sensible identificar dentro de los datos. Para las reglas de escaneo puedes:
- Agregue reglas de escaneo predefinidas de la [Biblioteca de Reglas de Escaneo][2]. Estas reglas detectan patrones comunes como direcciones de correo electrónico, números de tarjetas de crédito, claves de API, tokens de autorización, información de red y dispositivo, y más.
- [Cree sus propias reglas utilizando patrones regex][3].

Consulte [Configura el Escáner de Datos Sensibles para Datos de Telemetría][4] para detalles de configuración.

### En su entorno {#in-your-environment}

Utiliza [Observability Pipelines][5] para recopilar y procesar tus registros dentro de tu entorno, y luego enruta los datos a sus integraciones de destino. Cuando configure una canalización en Observability Pipelines, agregue el [procesador de Sensitive Data Scanner][6] para redactar datos sensibles en sus registros antes de que salgan de sus instalaciones. Puedes agregar reglas de escaneo predefinidas de la Biblioteca de Reglas, como direcciones de correo electrónico, números de tarjetas de crédito, claves de API, tokens de autorización, direcciones IP, y más. También puedes crear tus propias reglas utilizando patrones regex.

Consulta [Configurar Pipelines][7] para más información.

## Escanear datos de Observabilidad de LLM {#scan-llm-observability-data}

El Escáner de Datos Sensibles puede escanear trazas de [Observabilidad de LLM de Datadog][20], incluyendo entradas y salidas de aplicaciones de LLM. Esto ayuda a prevenir la exposición de datos sensibles como PII, claves de API o información propietaria en solicitudes, completaciones y metadatos de flujo de trabajo de LLM.

El escaneo de Observabilidad de LLM utiliza un modelo de configuración gestionada que difiere del escaneo de datos de telemetría, donde el escaneo de Observabilidad de LLM tiene:

- **Un grupo de escaneo gestionado**: Se crea automáticamente un grupo de escaneo predeterminado para su organización cuando accede por primera vez a la [Agent Observability Settings page][18]. No puede crear grupos de escaneo adicionales ni eliminar el grupo gestionado.
- **Reglas personalizables**: Puede modificar reglas existentes, desactivar las que no necesite o agregar reglas de escaneo personalizadas para detectar patrones adicionales de datos sensibles.

Para cada regla de escaneo, se puede aplicar una de las siguientes acciones a los datos sensibles coincidentes:

- **Redactar**: Reemplace todos los datos coincidentes con un solo token que elija, como `[sensitive_data]`.
- **Redactar parcialmente**: Reemplace una porción específica de todos los valores coincidentes.
- **Hash**: Reemplace todos los datos coincidentes con un identificador único no reversible.

Para configurar el escaneo de datos de Agent Observability, navegue a la [Agent Observability Settings page][18] en la configuración de Sensitive Data Scanner. Para más información sobre Agent Observability, consulte la [Agent Observability documentation][20].

## Escanear almacenamiento en la nube {#scan-cloud-storage}

{{< callout url="https://www.datadoghq.com/product-preview/data-security" >}}
  El soporte de escaneo para buckets de Amazon S3 e instancias de RDS está en vista previa. Para inscribirse, haga clic en <strong>Solicitar Acceso</strong>.
{{< /callout >}}

{{< img src="sensitive_data_scanner/cloud_storage_issues.png" alt="La sección de almacenamiento de la página de Hallazgos con tres hallazgos de Amazon S3" style="width:100%;" >}}

Si tiene habilitado Sensitive Data Scanner, puede catalogar y clasificar datos sensibles en sus buckets de Amazon S3. **Nota**: Sensitive Data Scanner no redacta datos sensibles en sus recursos de almacenamiento en la nube.

Sensitive Data Scanner escanea en busca de datos sensibles al desplegar [scáneres sin agente][8] en tus entornos en la nube. Estas instancias de escaneo recuperan una lista de todos los S3 buckets a través de [Remote Configuration][9] y tienen instrucciones establecidas para escanear archivos de texto, como CSV y JSON, a lo largo del tiempo.

Sensitive Data Scanner aprovecha su [completa biblioteca de reglas][10] para encontrar coincidencias. Cuando se encuentra una coincidencia, la ubicación de la coincidencia se envía a Datadog por la instancia de escaneo. **Nota**: Los almacenes de datos y sus archivos solo se leen en su entorno; no se envían datos sensibles escaneados de vuelta a Datadog.

Además de mostrar coincidencias de datos sensibles, Sensitive Data Scanner muestra cualquier problema de seguridad detectado por [Cloud Security][11] que afecte a los almacenes de datos sensibles. Puede hacer clic en cualquier problema para continuar con la triage y la remediación dentro de Cloud Security.

Consulte [Set up Sensitive Data Scanner for Cloud Storage][12] para detalles de configuración.

## Escanear repositorios de código {#scan-code-repositories}

Datadog [Secret Scanning][21] escanea repositorios de código para detectar secretos expuestos en el código fuente. Secret Scanning es impulsado por Sensitive Data Scanner y utiliza todas las reglas de la [categoría de secretos y credenciales][19] de la biblioteca SDS para encontrar coincidencias.

A diferencia del escaneo de datos de telemetría, Secret Scanning opera en sus pipelines de CI/CD o directamente en Datadog con escaneo alojado (compatible con GitHub, Azure DevOps y GitLab). Cuando se detectan secretos en el código, los hallazgos se muestran en la interfaz de Code Security.

Consulte [Secret Scanning documentation][21] para detalles de configuración.

## Investigar hallazgos de datos sensibles {#investigate-sensitive-data-findings}

{{< img src="sensitive_data_scanner/findings_20251014.png" alt="La página de Hallazgos muestra una visión general de los hallazgos sensibles desglosados por prioridad." style="width:100%;" >}}

Utilice la [página de Hallazgos][13] para ver detalles de los hallazgos de datos sensibles identificados por sus reglas de escaneo. Estos detalles incluyen:

- La regla de escaneo específica que detectó las coincidencias, para que pueda determinar qué reglas modificar según sea necesario.
- El grupo de escaneo en el que ha ocurrido el hallazgo, para que pueda determinar el radio de explosión de cualquier fuga.
- El número de eventos asociados con el hallazgo para ayudarle a evaluar su alcance y gravedad.
- Un gráfico de los eventos asociados con el hallazgo para ayudarle a identificar cuándo comenzó y cómo ha progresado.
- Incidencias relacionadas creadas para el hallazgo.

Consulte [Investigar hallazgos de datos sensibles][14] para obtener más información sobre cómo clasificar datos sensibles utilizando la página de Hallazgos.

## Revise las tendencias de datos sensibles {#review-sensitive-data-trends}

{{<img src="sensitive_data_scanner/sdslight.png" alt="Sensitive Data Scanner Overview dashboard" style="width:80%;">}}

Cuando Sensitive Data Scanner está habilitado, se instala automáticamente en su cuenta un [out-of-the-box dashboard][15] que resume los hallazgos de datos sensibles. Para acceder a este dashboard, navegue a **Dashboards** > **Dashboard List** y busque "Sensitive Data Scanner Overview".

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/data_security/pci_compliance/
[2]: /es/security/sensitive_data_scanner/scanning_rules/library_rules/
[3]: /es/security/sensitive_data_scanner/scanning_rules/custom_rules/
[4]: /es/security/sensitive_data_scanner/setup/telemetry_data/
[5]: /es/observability_pipelines/
[6]: /es/observability_pipelines/processors/sensitive_data_scanner
[7]: /es/observability_pipelines/configuration/set_up_pipelines/
[8]: /es/security/cloud_security_management/setup/agentless_scanning
[9]: /es/remote_configuration
[10]: /es/security/sensitive_data_scanner/scanning_rules/library_rules/
[11]: /es/security/cloud_security_management
[12]: /es/security/sensitive_data_scanner/setup/cloud_storage/
[13]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner
[14]: /es/security/sensitive_data_scanner/guide/investigate_sensitive_data_findings/
[15]: https://app.datadoghq.com/dash/integration/sensitive_data_scanner
[16]: /es/security/sensitive_data_scanner/setup/telemetry_data/?tab=logs#mask-action
[17]: /es/security/sensitive_data_scanner/scanning_rules/
[18]: https://app.datadoghq.com/sensitive-data-scanner/configuration/llm-spans
[19]: /es/security/sensitive_data_scanner/scanning_rules/library_rules/?category=Secrets+and+credentials#overview
[20]: /es/llm_observability/
[21]: /es/security/code_security/secret_scanning/