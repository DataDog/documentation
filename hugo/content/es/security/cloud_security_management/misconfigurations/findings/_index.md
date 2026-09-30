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
    nube de Cloud Security Misconfigurations
- link: security/cspm/frameworks_and_benchmarks
  tag: Documentación
  text: Conocer los marcos y las referencias del sector
title: Explorar los errores de configuración
---

La [página de Resultados][1] de Cloud Security Misconfigurations te permite:

- Revisar la configuración detallada de un recurso.
- Revisar las reglas de cumplimiento aplicadas a tus recursos por Cloud Security Misconfigurations.
- Consultar etiquetas (tags) para obtener más información sobre quién es el propietario del recurso y dónde se encuentra en tu entorno.
- Leer las descripciones y directrices basadas en recursos del sector para corregir un recurso incorrectamente configurado.
- Utilizar el selector de tiempo para explorar la configuración de tu postura de seguridad en cualquier momento del pasado.

Además de revisar y responder a los errores de configuración, puedes configurar notificaciones para errores de configuración fallidos y configurar señales para correlacionar y clasificar los errores de configuración en la misma vista que las amenazas en tiempo real generadas por [Cloud SIEM][2] y [Workload Protection][3]. Esto te permite acelerar las investigaciones, ya que las causas fundamentales de muchas de las brechas actuales en la nube son errores de configuración en servicios que han sido aprovechados por los atacantes.

## Errores de configuración

Un error de configuración es la primitiva primaria para la evaluación de una regla con respecto a un recurso. Cada vez que se evalúa un recurso con respecto a una regla, se genera un error de configuración con un estado **Aprobado** o **Fallido**. Los recursos se evalúan en incrementos de entre 15 minutos y cuatro horas (dependiendo del tipo). Datadog genera nuevos errores de configuración tan pronto como se completa un análisis y almacena un historial completo de todos los errores de configuración de los últimos 15 meses para que estén disponibles en caso de investigación o auditoría.

## Explorar los errores de configuración en la nube

Los errores de configuración se muestran en la [página de Resultados de Misconfigurations][1].
- Agrega las configuraciones erróneas por regla utilizando los filtros **Group by** (Agrupar por) y la barra de búsqueda de consultas. Por ejemplo, filtrar por `evaluation:fail` reduce la lista a todas las reglas de cumplimiento que tienen problemas que deben solucionarse.
  - Agrupa las configuraciones erróneas por **Resources** (Recursos) o **Teams** (Equipos) (o **None** (Ninguno) para ver las configuraciones erróneas individualmente), de modo que puedas encontrar los recursos o eqipos que tienen más configuraciones erróneas fallidas y priorizar tus esfuerzos de corrección en consecuencia.
- Pasa el ratón por encima de **Views** (Vistas) y selecciona una vista existente para aplicarla, o haz clic en **Save as new view** (Guardar como nueva vista) para volver a utilizar la configuración del explorador en el futuro.

{{< img src="security/csm/findings_page_2.png" alt="Página de Resultados de Cloud Security Misconfigurations" style="width:100%;">}}

Puedes hacer clic en **View All** (Ver todos) para ver una lista completa de los recursos afectados por una configuración incorrecta, o hacer clic en un recurso para ver información adicional sobre la configuración incorrecta y los pasos sugeridos para solucionarla.

{{< img src="security/cspm/misconfigurations_explorer_4.png" alt="Página de Resultados de Cloud Security Misconfigurations" width="100%">}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/compliance?time=now
[2]: /es/security/cloud_siem/
[3]: /es/security/workload_protection/
[4]: /es/security/default_rules/cis-aws-1.5.0-2.1.5/