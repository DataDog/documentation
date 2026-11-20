---
aliases:
- /es/account_management/org_settings/sensitive_data_detection
- /es/sensitive_data_scanner/
description: Descubra, clasifique y, opcionalmente, redacte datos sensibles como PII,
  credenciales y números de tarjetas de crédito en logs, spans de APM, eventos RUM,
  trazas de Agent Observability, eventos y buckets de Amazon S3 de Datadog con Sensitive
  Data Scanner.
disable_toc: false
further_reading:
- link: /security/sensitive_data_scanner/setup/telemetry_data
  tag: Documentación
  text: Configure Sensitive Data Scanner para Datos de Telemetría
- link: /security/sensitive_data_scanner/setup/cloud_storage
  tag: Documentación
  text: Configure Sensitive Data Scanner para Almacenamiento en la Nube
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
    Scanner de Datadog
- link: https://www.datadoghq.com/blog/sensitive-data-management-best-practices/
  tag: Blog
  text: Mejores prácticas para la gestión de datos sensibles
- link: https://www.datadoghq.com/blog/data-security/
  tag: Blog
  text: Descubra datos sensibles en sus almacenes de datos en la nube con Data Security
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
  text: Cómo las empresas de seguros descubren, clasifican y actúan sobre los riesgos
    de datos sensibles con Datadog
- link: https://www.datadoghq.com/blog/llm-aws-strands
  tag: Blog
  text: Obtenga visibilidad de los flujos de trabajo de los agentes de Strands con
    Datadog LLM Observability
- link: https://www.datadoghq.com/blog/observability-pipelines-mssp
  tag: Blog
  text: Simplifique la recopilación y agregación de registros para MSSP con Datadog
    Observability Pipelines
- link: https://www.datadoghq.com/blog/datadog-cloud-security-compliance
  tag: Blog
  text: Escale el cumplimiento en marcos globales con Datadog Cloud Security
title: Sensitive Data Scanner
---
## Descripción general {#overview}

Los datos sensibles, como números de tarjetas de crédito, claves de API, direcciones IP e información de identificación personal (PII), a menudo se filtran involuntariamente, lo que puede exponer a su organización a riesgos de seguridad y cumplimiento. Los datos sensibles se pueden encontrar en:
 
- Spans de APM
- Repositorios de código
- Eventos de Event Management
- Trazas de Agent Observability
- Eventos RUM
- Datos de telemetría, como logs de aplicaciones

Los datos sensibles también pueden moverse involuntariamente a recursos de almacenamiento en la nube cuando los equipos de ingeniería trasladan sus cargas de trabajo a la nube. Sensitive Data Scanner de Datadog puede ayudar a prevenir fugas de datos sensibles y limitar los riesgos de incumplimiento al descubrir, clasificar y, opcionalmente, redactar datos sensibles.

**Nota**: Las herramientas y políticas de Datadog cumplen con PCI v4.0. Para obtener más información, consulte [PCI DSS Compliance][1].

## Fuentes de datos admitidas {#supported-data-sources}

Sensitive Data Scanner escanea datos de telemetría (logs, spans de APM, eventos RUM y eventos), trazas de Agent Observability, almacenamiento en la nube y repositorios de código.

La acción que puede aplicar a los datos sensibles encontrados depende de la fuente. La siguiente tabla muestra qué acciones de ofuscación son compatibles para cada fuente y para Agent Observability:

| Acción           | logs | APM | RUM | Eventos | Agent Observability |
|------------------|------|-----|-----|--------|---------------------|
| Redactar           | Yes  | Yes | Yes | Yes    | Yes                 |
| Redactar parcialmente | Yes  | Yes | Yes | Yes    | Yes                 |
| Hash             | Yes  | Yes | Yes | Yes    | Yes                 |
| Mask             | Yes  | Yes | Yes | No     | No                  |

<div class="alert alert-info">Para el almacenamiento en la nube y los repositorios de código (Secret Scanning), Sensitive Data Scanner puede detectar datos sensibles pero no puede aplicarles acciones de ofuscación.</div>

### Datos de telemetría {#telemetry-data}

{{< img src="sensitive_data_scanner/telemetry_data_issues.png" alt="Cinco hallazgos sensibles detectados, donde dos tienen prioridad crítica, uno tiene prioridad media y dos son informativos." style="width:100%;" >}}

Sensitive Data Scanner puede escanear sus datos [en la nube](#in-the-cloud) o [dentro de su entorno](#in-your-environment).

#### En la nube  {#in-the-cloud}

Con Sensitive Data Scanner en la nube, usted envía logs y eventos al backend de Datadog, por lo que los datos salen de su entorno antes de ser redactados. Los registros y eventos se escanean y redactan en el backend de Datadog durante el procesamiento, por lo que los datos confidenciales se redactan antes de que los eventos se indexen y se muestren en Datadog UI.

Los datos que se pueden escanear y redactar son:

- **Logs**: Todo el contenido de registros estructurado y no estructurado, incluyendo el mensaje del registro y los valores de los atributos.
- **APM**: Solo valores de atributos de tramos.
- **RUM**: Solo valores de atributos de eventos.
- **Events**: Solo valores de atributos de eventos.

Opcionalmente, se pueden establecer tasas de muestreo entre el 10% y el 99% para cada producto. Esto ayuda a gestionar los costos al comenzar, al reducir la cantidad de datos que se escanean en busca de información confidencial.

Para cada [regla de escaneo][17], se puede aplicar una de las siguientes acciones a los datos sensibles encontrados:

- **Redactar**: Reemplazar todos los datos encontrados con un token único que usted elija, como `[sensitive_data]`.
- **Redactar parcialmente**: Reemplazar una porción específica de todos los valores coincidentes.
- **Hash**: Reemplazar todos los datos encontrados con un identificador único no reversible.
- **Enmascarar** (disponible para registros, tramos de APM y eventos de RUM): Ofuscar todos los valores coincidentes. Los usuarios con el permiso `Data Scanner Unmask` pueden desofuscar (desenmascarar) y ver estos datos en Datadog. Consulte [Mask action][16] para obtener más información.

**Nota**: Al escanear datos muestreados, no podrá seleccionar acciones que ofusquen los datos que escanea.

Para utilizar Sensitive Data Scanner, configure un grupo de escaneo para definir qué datos escanear y luego configure reglas de escaneo para determinar qué datos sensibles deben coincidir dentro de los datos. Para las reglas de escaneo, usted puede:
- Agregar reglas de escaneo predefinidas de Datadog's [Scanning Rule Library][2]. Estas reglas detectan patrones comunes como direcciones de correo electrónico, números de tarjetas de crédito, clave de API, tokens de autorización, información de red y dispositivos, y más.
- [Cree sus propias reglas usando patrones de regex][3].

Consulte [Configurar Sensitive Data Scanner para datos de telemetría][4] para obtener detalles de configuración.

#### En su entorno {#in-your-environment}

Utilice [Observability Pipelines][5] para recopilar y procesar sus logs dentro de su entorno, y luego dirija los datos a sus integraciones downstream. Cuando configure un pipeline en Observability Pipelines, agregue el [procesador Sensitive Data Scanner][6] para redactar datos sensibles en sus logs antes de que salgan de sus instalaciones. Puede agregar reglas de escaneo predefinidas de la Rule Library, como direcciones de correo electrónico, números de tarjetas de crédito, claves de API, tokens de autorización, direcciones IP y más. También puede crear sus propias reglas usando patrones de regex.

Consulte [Set Up Pipelines][7] para obtener más información.

### Agent Observability {#agent-observability}

Sensitive Data Scanner puede escanear trazas de [Agent Observability][20], incluidas las entradas y salidas de aplicaciones LLM. Esto ayuda a evitar exponer datos sensibles como PII, claves de API o información propietaria en prompts, completions y metadatos de flujo de trabajo de LLM.

El escaneo de Agent Observability utiliza un modelo de configuración administrado que difiere del escaneo de datos de telemetría, donde el escaneo de Agent Observability tiene:

- **Un grupo de escaneo administrado**: Se crea automáticamente un grupo de escaneo predeterminado para su organización cuando accede por primera vez a la [página de configuración de Agent Observability][18]. No puede crear grupos de escaneo adicionales ni eliminar el grupo administrado.
- **Reglas personalizables**: Puede modificar las reglas existentes, deshabilitar las reglas que no necesite o agregar reglas de escaneo personalizadas para detectar patrones de datos sensibles adicionales.

Para cada regla de escaneo, se puede aplicar una de las siguientes acciones a los datos confidenciales encontrados:

- **Redactar**: Reemplazar todos los datos encontrados con un token único que usted elija, como `[sensitive_data]`.
- **Redactar parcialmente**: Reemplazar una porción específica de todos los valores coincidentes.
- **Hash**: Reemplazar todos los datos encontrados con un identificador único no reversible.

Para configurar el escaneo de datos de Agent Observability, navegue a la [página de configuración de Agent Observability][18] en la configuración de Sensitive Data Scanner. Para obtener más información sobre Agent Observability, consulte la [documentación de Agent Observability][20].

### Almacenamiento en la nube {#cloud-storage}

{{< img src="sensitive_data_scanner/cloud_storage_issues.png" alt="La sección de almacén de datos de la página Findings con tres hallazgos de Amazon S3" style="width:100%;" >}}

Si tiene habilitado Sensitive Data Scanner, puede catalogar y clasificar datos sensibles en sus buckets de Amazon S3. **Nota**: Sensitive Data Scanner no redacta datos sensibles en sus recursos de almacenamiento en la nube.

Sensitive Data Scanner busca datos sensibles mediante la implementación de [Agentless scanners][8] en sus entornos de nube. Estas instancias de escaneo recuperan una lista de todos los buckets de S3 a través de [Remote Configuration][9], y tienen instrucciones establecidas para escanear archivos de texto, como CSVs y JSONs, a lo largo del tiempo.

Sensitive Data Scanner aprovecha su [entire rules library][10] para encontrar coincidencias. Cuando se encuentra una coincidencia, la instancia de escaneo envía la ubicación de la misma a Datadog. **Nota**: Los almacenes de datos y sus archivos solo se leen en su entorno; no se envía a Datadog ningún dato sensible que haya sido escaneado.

Además de mostrar las coincidencias de datos sensibles, Sensitive Data Scanner muestra cualquier problema de seguridad detectado por [Cloud Security][11] que afecte a los almacenes de datos sensibles. Puede hacer clic en cualquier problema para continuar con el triaje y la corrección dentro de Cloud Security.

Consulte [Configurar Sensitive Data Scanner para Cloud Storage][12] para obtener detalles sobre la configuración.

### Repositorios de código {#code-repositories}

Datadog [Secret Scanning][21] analiza repositorios de código para detectar secretos expuestos en el código fuente. Secret Scanning funciona con Sensitive Data Scanner y utiliza todas las reglas de la [categoría de secretos y credenciales][19] de la biblioteca de SDS para encontrar coincidencias.

A diferencia del escaneo de datos de telemetría, Secret Scanning opera en sus pipelines de CI/CD o directamente en Datadog con escaneo alojado (compatible con GitHub, Azure DevOps y GitLab). Cuando se detectan secretos en el código, los hallazgos se muestran en la interfaz de Code Security.

Consulte la [documentación de Secret Scanning][21] para obtener detalles sobre la configuración.

## Capacidades clave {#key-capabilities}

### Investigue los hallazgos de datos sensibles {#investigate-sensitive-data-findings}

{{< img src="sensitive_data_scanner/sds_findings_explorer.png" alt="Explorador de hallazgos de Sensitive Data Scanner agrupado por regla, con la US Passport Scanner rule expandida para mostrar hallazgos críticos, conteos de coincidencias y gráficos de tendencias semanales." style="width:100%;" >}}

Utilice la [Findings page][13] para ver los detalles de los hallazgos de datos sensibles identificados por sus reglas de escaneo. Estos detalles incluyen:

- La regla de escaneo específica que detectó las coincidencias, para que pueda determinar qué reglas modificar según sea necesario.
- El grupo de escaneo en el que se produjo el hallazgo, para que pueda determinar el radio de impacto de cualquier fuga.
- La cantidad de eventos asociados con el hallazgo para ayudarle a medir su alcance y gravedad.
- Un gráfico de los eventos asociados con el hallazgo para ayudarle a identificar cuándo comenzó un hallazgo y ver cómo ha progresado.
- Casos relacionados creados para el hallazgo.

Consulte [Investigar hallazgos de datos sensibles][14] para obtener más información sobre la clasificación de datos sensibles mediante la Findings page.

### Crear alertas para datos sensibles {#create-alerts-for-sensitive-data}

Utilice alertas para notificar a los equipos cuando Sensitive Data Scanner detecte datos sensibles. El flujo de trabajo de alertas disponible depende del tipo de datos:

- **Registros**: Cree una regla de notificación de seguridad desde la Findings page o el finding side panel. Las reglas de notificación pueden coincidir con los hallazgos de Sensitive Data Scanner por gravedad, servicio, entorno, equipo, regla de escaneo y otros atributos del hallazgo. Las Notifications incluyen el contexto del hallazgo y un enlace al hallazgo, pero no incluyen muestras de registros.
- **APM y RUM**: Cree monitores basados en etiquetas que Sensitive Data Scanner agrega cuando detecta coincidencias, como `sensitive_data:*` o `sensitive_data_category:*`.

Consulte [Create Alerts for Sensitive Data][22] para obtener instrucciones de configuración.

### Revisar tendencias de datos sensibles {#review-sensitive-data-trends}

{{<img src="sensitive_data_scanner/sdslight.png" alt="Sensitive Data Scanner Overview dashboard" style="width:80%;">}}

Cuando Sensitive Data Scanner está habilitado, se instala automáticamente en su cuenta un [panel preconfigurado][15] que resume los hallazgos de datos sensibles. Para acceder a este panel, navegue a {{< ui >}}Dashboards{{< /ui >}} > {{< ui >}}Dashboards List{{< /ui >}} y busque "Sensitive Data Scanner Overview".

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
[22]: /es/security/sensitive_data_scanner/guide/create-alerts-for-sensitive-data/