---
aliases:
- /es/security_platform/cspm/frameworks_and_benchmarks
- /es/security/cspm/frameworks_and_benchmarks
- /es/security/misconfigurations/frameworks_and_benchmarks
further_reading:
- link: security/cspm/setup
  tag: Documentación
  text: Empezando con Cloud Security Misconfigurations
- link: security/default_rules
  tag: Documentación
  text: Explorar las reglas de cumplimiento predeterminadas de configuración en la
    nube de Cloud Security Misconfigurations
- link: security/cspm/findings
  tag: Documentación
  text: Buscar y explorar errores de configuración
title: Gestionar tu postura de cumplimiento de la seguridad
---

Cloud Security Misconfigurations incluye más de 1300 reglas de cumplimiento predefinidas que evalúan la configuración de tus recursos en la nube e identifican posibles errores de configuración. Cada [regla de cumplimiento][1] se asigna a uno o más controles dentro de una [referencia de cumplimiento estándar o del sector][2]. También puedes [crear marcos personalizados][30] para definir y medir el cumplimiento con respecto a tu propia línea de base de seguridad en la nube.

## Visualizar tu postura de cumplimiento

Ve un resumen general de tu postura de conformidad para cada marco en la página [Conformidad][20] de Cloud Security Misconfigurations. Haz clic en un marco para ver un [informe detallado](#explore-compliance-framework-reports) que te ofrece información sobre la puntuación de tu configuración con respecto a los requisitos y reglas del marco.

- **Estrella: coloca un marco en la parte superior de la tabla.
- **Puntuación**: la [puntuación de postura][3] para las reglas en el marco dado.
- **Cambio**: la diferencia en la puntuación de la postura en el intervalo de tiempo elegido (por defecto 1 mes). Pasa el ratón para ver los detalles.
- **Reglas que fallan**: todas las reglas que fallan en el marco. Pasa el ratón por encima para ver más detalles.
- **Recursos aprobados**: de todos los recursos evaluados por las reglas del marco, el porcentaje de los que superan todas las reglas del marco.
- **Información general del marco**: Un [informe detallado](#explore-compliance-framework-reports) que te da una idea de tu puntuación con respecto a los requisitos y normas de un marco.
- **Explorar recursos**: Una vista filtrada de la página **Errores de configuración** que muestra los recursos con errores de configuración para el marco seleccionado.
- **Configurar reglas**: Personaliza la forma en que se analiza tu entorno y define objetivos de notificación modificando las reglas de cumplimiento para cada marco.

{{< img src="security/cspm/frameworks_and_benchmarks/compliance_reports_5.png" alt="La sección de informes de conformidad en la página Conformidad de Cloud Security Misconfigurations proporciona información general detallada de tu postura de conformidad" style="width:100%;">}}

## Explorar informes del marco de cumplimiento

Los informes del marco de cumplimiento muestran qué reglas están fallando en tu entorno, junto con detalles sobre los recursos incorrectamente configurados.

El resumen de la parte superior del informe muestra la [puntuación de la postura][3], los cinco fallos más graves de las reglas y un desglose detallado de las reglas en función de su gravedad. También puedes explorar tu postura anterior con el selector de tiempo, descargar una copia en PDF o CSV del informe y filtrar la página por cuenta, equipo, servicio y etiquetas de entorno.

Debajo del resumen hay una lista completa de todas las reglas asociadas al marco, organizadas por defecto por requisitos y controles, junto con el número de recursos comprobados por la regla, el porcentaje de fallos y el cambio en los recursos que superan la regla durante el periodo de tiempo elegido.

Busca por un nombre de regla para filtrar la lista o agrupar por requisito, control, gravedad, tipo de recurso o categoría de recurso para organizar la lista. También puedes hacer clic en el encabezado de una columna de la tabla para ordenar por esa columna dentro del grupo.

{{< img src="security/cspm/frameworks_and_benchmarks/cis_aws_compliance_report_5.png" alt="El marco de conformidad CIS AWS proporciona detalles sobre fallos críticos en las reglas" style="width:100%;">}}

Selecciona una regla para ver los detalles sobre los recursos mal configurados, la descripción de la regla, su marco o la asignación de referencia del sector y los pasos de corrección sugeridos. A continuación, puedes hacer clic en un recurso específico para obtener más detalles.

{{< img src="security/cspm/frameworks_and_benchmarks/failed-finding3.png" alt="El panel lateral de reglas de conformidad incluye información sobre la regla y los recursos con los errores de configuración fallidos" style="width:75%;">}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security_monitoring/default_rules/
[2]: /es/security/cloud_security_management/misconfigurations/frameworks_and_benchmarks/supported_frameworks/
[3]: /es/glossary/#security-posture-score
[11]: /es/security/cloud_siem/
[12]: /es/integrations/amazon_cloudtrail/
[13]: https://app.datadoghq.com/security/configuration/rules?product=cspm
[14]: /es/integrations/slack/
[15]: /es/integrations/jira/
[16]: /es/integrations/pagerduty
[17]: /es/integrations/servicenow/
[18]: /es/integrations/microsoft_teams/
[19]: /es/integrations/webhooks/
[20]: https://app.datadoghq.com/security/compliance/homepage
[21]: /es/security/cloud_security_management/misconfigurations/detection_rules
[26]: /es/security/cloud_security_management/misconfigurations/custom_rules/#tagging-misconfigurations
[27]: https://app.datadoghq.com/security/compliance
[28]: /es/dashboards/template_variables/
[29]: /es/api/latest/security-monitoring/#update-an-existing-rule
[30]: /es/security/cloud_security_management/misconfigurations/frameworks_and_benchmarks/custom_frameworks