---
aliases:
- /es/account_management/org_settings/sensitive_data_detection
- /es/sensitive_data_scanner/
disable_toc: false
further_reading:
- link: /security/sensitive_data_scanner/setup/telemetry_data
  tag: Documentación
  text: Configurar Sensitive Data Scanner para datos de telemetría
- link: /security/sensitive_data_scanner/setup/cloud_storage
  tag: Documentación
  text: Configurar Sensitive Data Scanner para el almacenamiento en la nube
- link: coterm
  tag: Documentación
  text: 'CoTerm: Monitorizar sesiones de terminal y actividades confidenciales en
    sistemas locales y remotos'
- link: /security/sensitive_data_scanner/guide/best_practices_for_creating_custom_rules
  tag: Documentación
  text: Prácticas recomendadas para crear reglas personalizadas
- link: /data_security/
  tag: Documentación
  text: Reducir los riesgos relacionados con los datos
- link: https://www.datadoghq.com/blog/scaling-sensitive-data-scanner/
  tag: Blog
  text: Descubre, clasifica y corrige los problemas de datos confidenciales a escala
    con Sensitive Data Scanner.
- link: https://www.datadoghq.com/blog/sensitive-data-scanner/
  tag: Blog
  text: Crea una estrategia moderna de protección de datos con Datadog's Sensitive
    Data Scanner
- link: https://www.datadoghq.com/blog/sensitive-data-management-best-practices/
  tag: Blog
  text: Prácticas recomendadas para la gestión de datos confidenciales
- link: https://www.datadoghq.com/blog/data-security/
  tag: Blog
  text: Descubre datos confidenciales en tus almacenes de datos en la nube con Data
    Security
- link: https://www.datadoghq.com/blog/hipaa-compliance-sensitive-data-scanner/
  tag: Blog
  text: Cómo gestionan los datos confidenciales las empresas sujetas a los requisitos
    de la HIPAA con Datadog
- link: https://www.datadoghq.com/blog/sds-dlp-for-financial-service-companies/
  tag: Blog
  text: Cómo las compañías financieras servicios detectan, clasifican y gestionan
    datos confidenciales con Datadog
- link: https://www.datadoghq.com/blog/sds-for-insurance-companies/
  tag: Blog
  text: Cómo las compañías de seguros, clasifican y actúan ante potenciales riesgos
    de los datos confidenciales con Datadog
title: Sensitive Data Scanner
---

## Información general

Los datos confidenciales, como los números de tarjetas de crédito, las claves de API, las direcciones IP y la información personal identificable (PII), a menudo se filtran de forma no intencionada, y esto puede exponer tu organización a riesgos de seguridad y de cumplimiento. Los datos confidenciales pueden encontrarse en tus datos de telemetría, como los logs de aplicación, los tramos (spans) APM, los eventos de RUM y los eventos de Event Management. También pueden trasladarse de forma no intencionada a recursos de almacenamiento en la nube cuando los equipos de ingeniería trasladan sus cargas de trabajo a la nube. Datadog Sensitive Data Scanner puede ayudar a evitar fugas de datos confidenciales y a limitar los riesgos de incumplimiento detectando, clasificando y, opcionalmente, ocultando datos confidenciales.

**Nota**: Consulta [Cumplimiento de PCI DSS][1] para obtener información sobre la creación de una organización de Datadog que cumpla con PCI.

## Analizar datos de telemetría

{{< img src="sensitive_data_scanner/telemetry_data_issues.png" alt="Cinco diferentes problemas de confidencialidad detectados, de los cuales dos tienen prioridad crítica, uno tiene prioridad intermedia y dos son informativos." style="width:100%;" >}}

Sensitive Data Scanner puede analizar tus datos [en la nube](#in-the-cloud) o [en tu entorno](#in-your-environment).

### En la nube {#in-the-cloud}

Con Sensitive Data Scanner en la nube, envías logs y eventos al backend Datadog, por lo que los datos salen de tu entorno antes de ser redactados. Los logs y eventos se analizan y redactan en el backend Datadog durante su procesamiento, por lo que los datos confidenciales se ocultan antes de que los eventos se indexen y se muestren en la interfaz de usuario de Datadog.

Los datos que pueden analizarse y redactarse son:

- Logs: todo el contenido estructurado y no estructurado de los logs, incluyendo los valores de mensajes y atributos de logs.
- APM: sólo valores de atributos de tramo.
- RUM: sólo valores de atributos de eventos.
- Eventos: sólo valores de atributos de eventos.

{{< callout url="https://www.datadoghq.com/product-preview/role-based-sensitive-data-unmasking-in-logs" btn_hidden="false" >}}
El desenmascaramiento de los datos confidenciales en logs está en Vista previa. Para inscribirte, haz clic en <b>Request Access</b> (Solicitar acceso).
{{< /callout >}}

Para utilizar Sensitive Data Scanner, configura un grupo de análisis para definir qué datos analizar y luego configura reglas de análisis para determinar qué información confidencial debe coincidir en los datos. Para las reglas de análisis puedes:
- Añadir reglas de análisis predefinidas de la [biblioteca de reglas de análisis][2] de Datadog. Estas reglas detectan patrones comunes como direcciones de correo electrónico, números de tarjetas de crédito, claves de API, tokens de autorización, información de red y dispositivos, etc.
- [Crear tus propias reglas utilizando patrones de expresiones regulares (regex)][3].

Para obtener más información, consulta [Configurar Sensitive Data Scanner para datos de telemetría][4].


### En tu entorno {#in-your-environment}

Utiliza [Observability Pipelines][5] para recopilar y procesar tus logs de tu entorno y luego envía los datos a tus integraciones posteriores. Cuando configures un pipeline en Observability Pipelines, añade el [procesador Sensitive Data Scanner][6] para redactar los datos confidenciales de tus logs antes de que salgan de tus instalaciones. Puedes añadir reglas de análisis predefinidas de la librería de reglas, como direcciones de correo electrónico, números de tarjetas de crédito, claves de API, tokens de autorización, direcciones IP, etc. También puedes crear tus propias reglas utilizando patrones de expresiones regulares (regex).

Para obtener más información, consulta [Configurar pipelines][7].

## Analizar el almacenamiento en la nube

{{< callout header="Disponibilidad limitada" url="https://www.datadoghq.com/private-beta/data-security" >}}
La compatibilidad del análisis de buckets de Amazon S3 e instancias RDS está en Disponibilidad limitada. Para inscribirte, haz clic en <strong>Request Access</strong> (Solicitar acceso).
{{< /callout >}}

{{< img src="sensitive_data_scanner/cloud_storage_issues.png" alt="Sección del almacén de datos de la página de resumen con tres incidentes de Amazon S3" style="width:100%;" >}}

Si tienes Sensitive Data Scanner activado, puedes catalogar y clasificar datos confidenciales en tus buckets de Amazon S3 e instancias de RDS. **Nota**: Sensitive Data Scanner no redacta datos confidenciales en tus recursos de almacenamiento en la nube.

Sensitive Data Scanner analiza en busca de datos confidenciales, desplegando [analizadores agentless][8] en tus entornos en la nube. Estas instancias de análisis recuperan una lista de todos los buckets de S3 e instancias de RDS mediante [configuración remota][9] y tienen instrucciones configuradas para analizar archivos de texto (como CSV y JSON) y tablas en cada almacén de datos a lo largo del tiempo.

Sensitive Data Scanner aprovecha tu [biblioteca de reglas completa][10] para encontrar coincidencias. Cuando se encuentra una coincidencia, la instancia de análisis envía la ubicación de la coincidencia a Datadog. **Nota**: Los almacenes de datos y sus archivos sólo se leen en tu entorno. No se envía a Datadog ningún dato confidencial que haya sido analizado.

Además de mostrar las coincidencias de datos confidenciales, Sensitive Data Scanner muestra cualquier problema de seguridad detectado por [Cloud Security][11] que afecte a los almacenes de datos confidenciales. Puedes hacer clic en cualquier problema para continuar con la clasificación y la corrección dentro de Cloud Security.

Para obtener información sobre la configuración, consulta [Configurar Sensitive Data Scanner para el almacenamiento en la nube][12].

## Investigar problemas de datos confidenciales

{{< img src="sensitive_data_scanner/sds_summary_20250203.png" alt="Página de resumen que muestra información general de los problemas de confidencialidad desglosados por prioridad" style="width:100%;" >}}

Utiliza la [página de resumen][13] para ver los detalles de problemas de datos confidenciales identificados por tus reglas de análisis. Estos detalles incluyen:

- La regla de análisis específica que detectó las coincidencias, para que puedas determinar qué reglas modificar, según sea necesario.
- El grupo de análisis en el que se produjo el problema, para que puedas determinar el radio de explosión de cualquier fuga.
- El número de incidentes asociados al problema, para ayudarte a calibrar tu contexto y gravedad.
- Un gráfico de los eventos asociados al problema, para ayudarte a determinar con precisión cuándo comenzó un problema y ver cómo evolucionó.
- Casos relacionados creados para el problema.

Consulta [Investigar problemas de datos confidenciales][14] para obtener más información sobre cómo utilizar la página de resumen para clasificar problemas de datos confidenciales.

## Revisar las tendencias de los datos confidenciales

{{<img src="sensitive_data_scanner/sdslight.png" alt="Sensitive Data Scanner Overview dashboard" style="width:80%;">}}

Cuando se activa Sensitive Data Scanner, en tu cuenta se instala automáticamente un [dashboard predefinido][15] que resume los problemas de datos confidenciales. Para acceder a este dashboard, ve a **Dashboards** > **Lista de dashboards** y busca "Información general de Sensitive Data Scanner".

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/data_security/pci_compliance/
[2]: /es/security/sensitive_data_scanner/scanning_rules/library_rules/
[3]: /es/security/sensitive_data_scanner/scanning_rules/custom_rules/
[4]: /es/security/sensitive_data_scanner/setup/telemetry_data/
[5]: /es/observability_pipelines/
[6]: /es/observability_pipelines/processors/sensitive_data_scanner
[7]: /es/observability_pipelines/set_up_pipelines/
[8]: /es/security/cloud_security_management/setup/agentless_scanning
[9]: /es/agent/remote_config
[10]: /es/security/sensitive_data_scanner/scanning_rules/library_rules/
[11]: /es/security/cloud_security_management
[12]: /es/security/sensitive_data_scanner/setup/cloud_storage/
[13]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner
[14]: /es/security/sensitive_data_scanner/guide/investigate_sensitive_data_issues/
[15]: https://app.datadoghq.com/dash/integration/sensitive_data_scanner
