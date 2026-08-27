---
aliases:
- /es/account_management/org_settings/sensitive_data_detection
- /es/sensitive_data_scanner/
description: Descubra, clasifique y, opcionalmente, redacte datos confidenciales como
  PII, credenciales y números de tarjetas de crédito en los logs de Datadog, spans
  de APM, eventos de RUM, trazas de Agent Observability, eventos y buckets de Amazon
  S3 con Sensitive Data Scanner.
disable_toc: false
further_reading:
- link: /security/sensitive_data_scanner/setup/telemetry_data
  tag: Documentación
  text: Configure Sensitive Data Scanner para datos de telemetría
- link: /security/sensitive_data_scanner/setup/cloud_storage
  tag: Documentación
  text: Configure Sensitive Data Scanner para almacenamiento en la nube
- link: coterm
  tag: Documentación
  text: 'CoTerm: monitoree sesiones de terminal y actividades confidenciales en sistemas
    locales y remotos'
- link: /data_security/
  tag: Documentación
  text: Reducción de riesgos relacionados con los datos
- link: https://www.datadoghq.com/blog/scaling-sensitive-data-scanner/
  tag: Blog
  text: Descubra, clasifique y remedie problemas de datos confidenciales a escala
    con Sensitive Data Scanner
- link: https://www.datadoghq.com/blog/sensitive-data-scanner/
  tag: Blog
  text: Construya una estrategia moderna de cumplimiento de datos con Sensitive Data
    Scanner de Datadog.
- link: https://www.datadoghq.com/blog/sensitive-data-management-best-practices/
  tag: Blog
  text: Mejores prácticas para la gestión de datos confidenciales
- link: https://www.datadoghq.com/blog/data-security/
  tag: Blog
  text: Descubra datos confidenciales en sus almacenes de datos en la nube con Data
    Security.
- link: https://www.datadoghq.com/blog/hipaa-compliance-sensitive-data-scanner/
  tag: Blog
  text: Cómo las empresas sujetas a los requisitos de HIPAA gestionan datos confidenciales
    con Datadog
- link: https://www.datadoghq.com/blog/sds-dlp-for-financial-service-companies/
  tag: Blog
  text: Cómo las empresas de servicios financieros descubren, clasifican y gestionan
    datos confidenciales con Datadog
- link: https://www.datadoghq.com/blog/sds-for-insurance-companies/
  tag: Blog
  text: Cómo las compañías de seguros descubren, clasifican y actúan sobre los riesgos
    de datos confidenciales con Datadog
- link: https://www.datadoghq.com/blog/llm-aws-strands
  tag: Blog
  text: Obtenga visibilidad de los flujos de trabajo de los Strands Agents con Datadog
    LLM Observability
- link: https://www.datadoghq.com/blog/observability-pipelines-mssp
  tag: Blog
  text: Simplifique la recopilación y agregación de logs para MSSP con Datadog Observability
    Pipelines
- link: https://www.datadoghq.com/blog/datadog-cloud-security-compliance
  tag: Blog
  text: Escale el cumplimiento en marcos globales con Datadog Cloud Security
title: Sensitive Data Scanner
---
## Descripción general {#overview}

Los datos confidenciales, como números de tarjetas de crédito, claves de API, direcciones IP e información de identificación personal (PII), a menudo se filtran involuntariamente, lo que puede exponer a su organización a riesgos de seguridad y cumplimiento. Los datos confidenciales se pueden encontrar en:
 
- Spans de APM
- Repositorios de código
- Eventos de Event Management
- Trazas de Agent Observability
- Eventos de RUM
- Datos de telemetría, como logs de aplicaciones

Los datos confidenciales también pueden trasladarse involuntariamente a recursos de almacenamiento en la nube cuando los equipos de ingeniería mueven sus cargas de trabajo a la nube. Sensitive Data Scanner de Datadog puede ayudar a prevenir fugas de datos confidenciales y limitar los riesgos de cumplimiento mediante el descubrimiento, la clasificación y la redacción opcional de datos confidenciales.

**Nota**: Las herramientas y políticas de Datadog cumplen con PCI v4.0. Para obtener más información, consulte [PCI DSS Compliance][1].

## Fuentes de datos admitidas {#supported-data-sources}

Sensitive Data Scanner analiza datos de telemetría (logs, spans de APM, eventos de RUM y eventos), trazas de Agent Observability, almacenamiento en la nube y repositorios de código.

La acción que puede aplicar a los datos sensibles detectados depende de la fuente de datos. La siguiente tabla muestra qué acciones de ofuscación son compatibles para cada fuente de telemetría y para Agent Observability:

| Acción           | Logs | APM | RUM | Eventos | Agent Observability |
|------------------|------|-----|-----|--------|---------------------|
| Redactar           | Sí  | Sí | Sí | Sí    | Sí                 |
| Redactar parcialmente | Sí  | Sí | Sí | Sí    | Sí                 |
| Hashear             | Sí  | Sí | Sí | Sí    | Sí                 |
| Enmascarar             | Sí  | Sí | Sí | No     | No                  |

<div class="alert alert-info">Para el almacenamiento en la nube y los repositorios de código (Secret Scanning), Sensitive Data Scanner puede detectar datos confidenciales, pero no puede aplicarles acciones de ofuscación.</div>

### Datos de telemetría {#telemetry-data}

{{< img src="sensitive_data_scanner/telemetry_data_issues.png" alt="Se detectaron cinco hallazgos sensibles diferentes, donde dos tienen prioridad crítica, uno tiene prioridad media y dos son informativos." style="width:100%;" >}}

Sensitive Data Scanner puede escanear sus datos [en la nube](#in-the-cloud) o [dentro de su entorno](#in-your-environment).

#### En la nube {#in-the-cloud}

Con Sensitive Data Scanner en la nube, usted envía logs y eventos al backend de Datadog, por lo que los datos salen de su entorno antes de ser redactados. Los logs y eventos se escanean y redactan en el backend de Datadog durante el procesamiento, por lo que los datos confidenciales se redactan antes de que los eventos sean indexados y mostrados en la interfaz de usuario de Datadog.

Los datos que se pueden escanear y redactar son:

- **Logs**: Todo el contenido de logs estructurado y no estructurado, incluyendo el mensaje del log y los valores de los atributos
- **APM**: Solo valores de atributos de span
- **RUM**: Solo valores de atributos de eventos
- **Eventos**: Solo valores de atributos de eventos

Opcionalmente, se pueden establecer tasas de muestreo entre el 10% y el 99% para cada producto. Esto ayuda a gestionar los costos al comenzar, al reducir la cantidad de datos que se escanean en busca de información sensible.

Para cada [regla de escaneo][17], se puede aplicar una de las siguientes acciones a los datos sensibles coincidentes:

- **Redactar**: Reemplazar todos los datos coincidentes con un único token que usted elija, como `[sensitive_data]`.
- **Redactar parcialmente**: Reemplazar una porción específica de todos los valores coincidentes.
- **Hash**: Reemplazar todos los datos coincidentes con un identificador único no reversible.
- **Enmascarar** (disponible para logs, spans de APM y eventos de RUM): Ofuscar todos los valores coincidentes. Los usuarios con el permiso `Data Scanner Unmask` pueden desofuscar (desenmascarar) y ver estos datos en Datadog. Consulte [Acción de enmascarar][16] para obtener más información.

**Nota**: Al escanear datos muestreados, no podrá seleccionar acciones que ofusquen los datos que escanea.

Para utilizar Sensitive Data Scanner, configure un grupo de escaneo para definir qué datos escanear y luego configure reglas de escaneo para determinar qué información confidencial debe coincidir dentro de los datos. Para las reglas de escaneo puede:
- Añadir reglas de escaneo predefinidas de la [Biblioteca de reglas de escaneo][2] de Datadog. Estas reglas detectan patrones comunes como direcciones de correo electrónico, números de tarjetas de crédito, claves de API, tokens de autorización, información de red y dispositivos, y más.
- [Cree sus propias reglas utilizando patrones de regex][3].

Consulte [Configurar Sensitive Data Scanner para datos de telemetría][4] para obtener detalles de configuración.

#### En su entorno {#in-your-environment}

Utilice [Observability Pipelines][5] para recopilar y procesar sus logs dentro de su entorno, y luego dirija los datos a sus integraciones descendentes. Cuando configure un pipeline en Observability Pipelines, añada el [Sensitive Data Scanner processor][6] para redactar datos confidenciales en sus logs antes de que salgan de sus instalaciones. Puede añadir reglas de escaneo predefinidas de la Biblioteca de reglas, como direcciones de correo electrónico, números de tarjetas de crédito, claves de API, tokens de autorización, direcciones IP y más. También puede crear sus propias reglas utilizando patrones de regex.

Consulte [Configurar pipelines][7] para obtener más información.

### Agent Observability {#agent-observability}

Sensitive Data Scanner puede escanear Trazas de Agent Observability, incluyendo entradas y salidas de aplicaciones LLM. Esto ayuda a evitar la exposición de datos confidenciales como PII, claves de API o información propietaria en prompts, completaciones y metadatos de flujo de trabajo de LLM.

El escaneo de Agent Observability utiliza un modelo de configuración administrado que difiere del escaneo de datos de telemetría, donde el escaneo de Agent Observability tiene:

- **Un grupo de escaneo administrado**: Se crea automáticamente un grupo de escaneo predeterminado para su organización cuando accede por primera vez a la [página de configuración de Agent Observability][18]. No puede crear grupos de escaneo adicionales ni eliminar el grupo administrado.
- **Reglas personalizables**: Puede modificar las reglas existentes, deshabilitar las reglas que no necesita o añadir reglas de escaneo personalizadas para detectar patrones de datos confidenciales adicionales.

Para cada regla de escaneo, se puede aplicar una de las siguientes acciones a los datos confidenciales coincidentes:

- **Redact**: Reemplace todos los datos coincidentes con un único token que usted elija, como `[sensitive_data]`.
- **Redact**: Reemplace una porción específica de todos los valores coincidentes.
- **Hash**: Reemplace todos los datos coincidentes con un identificador único no reversible.

Para configurar el escaneo de datos de Agent Observability, navegue a la [página de configuración de Agent Observability][18] en la configuración de Sensitive Data Scanner. Para obtener más información sobre Agent Observability, consulte la [documentación de Agent Observability][20].

### Almacenamiento en la nube {#cloud-storage}

{{< img src="sensitive_data_scanner/cloud_storage_issues.png" alt="La sección de almacén de datos de la página de hallazgos con tres hallazgos de Amazon S3" style="width:100%;" >}}

Si tiene habilitado Sensitive Data Scanner, puede catalogar y clasificar sensitive data en sus buckets de Amazon S3. **Nota**: Sensitive Data Scanner no redacta sensitive data en sus recursos de almacenamiento en la nube.

Sensitive Data Scanner escanea sensitive data mediante la implementación de [Agentless scanners][8] en sus entornos de nube. Estas instancias de escaneo recuperan una lista de todos los buckets de S3 a través de [Remote Configuration][9] y tienen instrucciones establecidas para escanear archivos de texto, como CSV y JSON, a lo largo del tiempo.

Sensitive Data Scanner aprovecha su [biblioteca completa de reglas][10] para encontrar coincidencias. Cuando se encuentra una coincidencia, la instancia de escaneo envía la ubicación de la misma a Datadog. **Nota**: Los almacenes de datos y sus archivos solo se leen en su entorno; no se envía a Datadog ningún sensitive data que haya sido escaneado.

Además de mostrar las coincidencias de sensitive data, Sensitive Data Scanner muestra cualquier problema de seguridad detectado por [Cloud Security][11] que afecte a los almacenes de sensitive data. Puede hacer clic en cualquier problema para continuar con la evaluación y la corrección dentro de Cloud Security.

Consulte [Configurar Sensitive Data Scanner para almacenamiento en la nube][12] para obtener detalles sobre la configuración.

### Repositorios de código {#code-repositories}

[Secret Scanning][21] de Datadog escanea repositorios de código para detectar secretos expuestos en el código fuente. Secret Scanning funciona con Sensitive Data Scanner y utiliza todas las reglas de la [categoría de secretos y credenciales][19] de la biblioteca de SDS para encontrar coincidencias.

A diferencia del escaneo de datos de telemetría, Secret Scanning opera en sus pipelines de CI/CD o directamente en Datadog con escaneo alojado (compatible con GitHub, Azure DevOps y GitLab). Cuando se detectan secretos en el código, los hallazgos se muestran en la interfaz de Code Security.

Consulte la [documentación de Secret Scanning][21] para obtener detalles de configuración.

## Capacidades clave {#key-capabilities}

### Investigar hallazgos de sensitive data {#investigate-sensitive-data-findings}

{{< img src="sensitive_data_scanner/sds_findings_explorer.png" alt="Explorador de hallazgos de Sensitive Data Scanner agrupado por regla, con la regla US Passport Scanner expandida para mostrar hallazgos críticos, recuentos de coincidencias y gráficos de tendencias semanales." style="width:100%;" >}}

Utilice la [página de hallazgos][13] para ver los detalles de los hallazgos de sensitive data identificados por sus reglas de escaneo. Estos detalles incluyen:

- La regla de escaneo específica que detectó las coincidencias, para que pueda determinar qué reglas modificar según sea necesario.
- El grupo de escaneo en el que ocurrió el hallazgo, para que pueda determinar el radio de impacto de cualquier filtración.
- La cantidad de eventos asociados con el hallazgo para ayudarle a gauge su alcance y gravedad.
- Un gráfico de los eventos asociados con el hallazgo para ayudarle a identificar cuándo comenzó un hallazgo y ver cómo ha progresado.
- Casos relacionados creados para el hallazgo.

Consulte [Investigar hallazgos de datos confidenciales][14] para obtener más información sobre cómo clasificar datos confidenciales mediante la página de hallazgos.

### Revisar tendencias de sensitive data {#review-sensitive-data-trends}

{{<img src="sensitive_data_scanner/sdslight.png" alt="Sensitive Data Scanner Overview dashboard" style="width:80%;">}}

Cuando Sensitive Data Scanner está habilitado, se instala automáticamente en su cuenta un [out-of-the-box dashboard][15] que resume los sensitive data findings. Para acceder a este dashboard, navegue a {{< ui >}}Dashboards{{< /ui >}} > {{< ui >}}Dashboards List{{< /ui >}} y busque "Sensitive Data Scanner Overview".

## Lecturas adicionales {#further-reading}

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