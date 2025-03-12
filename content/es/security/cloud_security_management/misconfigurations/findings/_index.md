---
aliases:
- /es/security_platform/findings
- /es/security_platform/cspm/findings
- /es/security/cspm/findings
- /es/security/misconfigurations/findings
further_reading:
- link: security/default_rules
  tag: Documentación
  text: Explorar las reglas de cumplimiento predeterminadas de configuración en la
    nube de CSM Misconfigurations
- link: security/cspm/frameworks_and_benchmarks
  tag: Documentación
  text: Conocer los marcos y las referencias del sector
title: Explorar los errores de configuración
---

El [Explorador][1] de Cloud Security Management Misconfigurations (CSM Misconfigurations) te permite:

- Revisar la configuración detallada de un recurso.
- Revisar las reglas de cumplimiento aplicadas a tus recursos por CSM Misconfigurations.
- Consultar etiquetas (tags) para obtener más información sobre quién es el propietario del recurso y dónde se encuentra en tu entorno.
- Leer las descripciones y directrices basadas en recursos del sector para corregir un recurso incorrectamente configurado.
- Utilizar el selector de tiempo para explorar la configuración de tu postura de seguridad en cualquier momento del pasado.

Además de revisar y responder a los errores de configuración, puedes configurar notificaciones para errores de configuración fallidos y configurar señales para correlacionar y clasificar los errores de configuración en la misma vista que las amenazas en tiempo real generadas por [Cloud SIEM][2] y [CSM Threats][3]. Esto te permite acelerar las investigaciones, ya que las causas fundamentales de muchas de las brechas actuales en la nube son errores de configuración en servicios que han sido aprovechados por los atacantes.

## Errores de configuración

Un error de configuración es la primitiva primaria para la evaluación de una regla con respecto a un recurso. Cada vez que se evalúa un recurso con respecto a una regla, se genera un error de configuración con un estado **Aprobado** o **Fallido**. Los recursos se evalúan en incrementos de entre 15 minutos y cuatro horas (dependiendo del tipo). Datadog genera nuevos errores de configuración tan pronto como se completa un análisis y almacena un historial completo de todos los errores de configuración de los últimos 15 meses para que estén disponibles en caso de investigación o auditoría.

## Explorar los errores de configuración en la nube

Los errores de configuración se muestran en el [Explorador de errores de configuración][1]. Agrega errores de configuración por regla utilizando los filtros **Agrupar por** y la barra de búsqueda de consultas. Por ejemplo, el filtrado por `evaluation:fail` reduce la lista a todas las reglas de cumplimiento que tienen problemas que deben solucionarse. Los errores de configuración también pueden agregarse por recurso para clasificar los recursos que tienen el mayor número de errores de configuración fallidos para que pueda priorizar la corrección.

{{< img src="security/csm/explorers_page.png" alt="Página del Explorador de CSM Misconfigurations" style="width:100%;">}}

Selecciona un error de configuración para ver los recursos que han sido evaluados por la regla, la descripción de la regla, su marco o las asignaciones de referencia del sector y los pasos de corrección sugeridos.

{{< img src="security/cspm/findings/finding-side-panel3.png" alt="Lista de recursos afectados en el panel lateral" style="width:65%;">}}

Agrupa por **Recursos** en el Explorador de hallazgos de seguridad y selecciona un recurso para ver la lista completa de las reglas de cumplimiento que se han evaluado con respecto al recurso, junto con sus estados.

{{< img src="security/cspm/findings/resource-rules-evaluated2.png" alt="Agrupar y agregar por recurso en las búsquedas" style="width:65%;">}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/compliance?time=now
[2]: /es/security/cloud_siem/
[3]: /es/security/threats/
[4]: /es/security/default_rules/cis-aws-1.5.0-2.1.5/