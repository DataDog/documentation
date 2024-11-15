---
aliases:
- /security_platform/cspm/frameworks_and_benchmarks
- /security/cspm/frameworks_and_benchmarks
- /security/misconfigurations/frameworks_and_benchmarks
further_reading:
- link: security/cspm/setup
  tag: Documentación
  text: Empezando con CSM Misconfigurations
- link: security/default_rules
  tag: Documentación
  text: Explorar las reglas de cumplimiento predeterminadas de configuración en la
    nube de CSM Misconfigurations
- link: security/cspm/findings
  tag: Documentación
  text: Buscar y explorar errores de configuración
title: Gestionar tu postura de cumplimiento de la seguridad
---

CSM Misconfigurations incluye más de 1000 reglas de cumplimiento predefinidas que evalúan la configuración de tus recursos en la nube e identifican posibles errores de configuración. Cada [regla de cumplimiento][1] se asigna a uno o más controles dentro de una [referencia de cumplimiento estándar o del sector][2]. También puedes [crear marcos personalizados][30] para definir y medir el cumplimiento con respecto a tu propia línea de base de seguridad en la nube.

## Visualizar tu postura de cumplimiento

Visualiza información general de alto nivel sobre tu postura de cumplimiento para cada marco en la página [Cumplimiento][20] de CSM Misconfigurations.

- **Información general del marco**: Un [informe detallado](#explore-compliance-framework-reports) que te da una idea de tu puntuación con respecto a los requisitos y normas de un marco.
- **Explorar recursos**: Una vista filtrada de la página **Errores de configuración** que muestra los recursos con errores de configuración para el marco seleccionado.
- **Configurar reglas**: Personaliza la forma en que se analiza tu entorno y define objetivos de notificación modificando las reglas de cumplimiento para cada marco.

{{< img src="security/cspm/frameworks_and_benchmarks/compliance_reports_2.png" alt="La sección de informes de cumplimiento en la página Cumplimiento de CSM Misconfigurations proporciona información general detallada de tu postura de cumplimiento" style="width:100%;">}}

## Explorar informes del marco de cumplimiento

Los informes del marco de cumplimiento muestran qué reglas están fallando en tu entorno, junto con detalles sobre los recursos incorrectamente configurados.

El resumen de la parte superior del informe muestra el número de reglas con errores de configuración de aprobado/no aprobado, los tres fallos más graves de las reglas y un desglose detallado de las reglas según su gravedad. También puedes explorar tu postura anterior utilizando el selector de tiempo, descargar una copia del informe en PDF y filtrar la página por cuenta, equipo, servicio y etiquetas (tags) de entorno.

Debajo del resumen hay una lista completa de todas las reglas asociadas al marco, organizadas por requisitos y controles, junto con el número de recursos comprobados por la regla y el porcentaje de fallos.

{{< img src="security/cspm/frameworks_and_benchmarks/cis_aws_compliance_report_2.png" alt="El marco de cumplimiento CIS AWS proporciona detalles sobre fallos críticos en las reglas" style="width:100%;">}}

Selecciona una regla para ver los detalles sobre los recursos incorrectamente configurados, la descripción de la regla, su marco o la asignación de referencia del sector y los pasos de corrección sugeridos.

{{< img src="security/cspm/frameworks_and_benchmarks/failed-finding2.png" alt="El panel lateral de la regla de cumplimiento incluye información sobre la regla y los recursos con errores de configuración fallidos" style="width:75%;">}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security_monitoring/default_rules/
[2]: /es/security/cloud_security_management/misconfigurations/frameworks_and_benchmarks/supported_frameworks/
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