---
algolia:
  tags:
  - bandeja de entrada
aliases:
- /es/security_platform/cloud_security_management/
cascade:
  algolia:
    subcategory: Cloud Security Management
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Security%20%26%20Compliance
  tag: Notas de la versión
  text: Consulta las novedades en Datadog Security Compliance
- link: /security/cloud_security_management/misconfigurations/
  tag: Documentación
  text: Empezar a rastrear los errores de configuración con CSM Misconfigurations
- link: /security/threats/setup
  tag: Documentación
  text: Descubrir las amenazas a nivel del kernel con CSM Threats
- link: https://www.datadoghq.com/blog/cyber-attack-simulation-with-stratus-red-team/
  tag: Blog
  text: Mejorar la detección de amenazas en AWS con Stratus Red Team
- link: https://www.datadoghq.com/blog/kubernetes-security-best-practices/
  tag: Blog
  text: Prácticas recomendadas para proteger las aplicaciones de Kubernetes
- link: https://www.datadoghq.com/blog/workload-security-evaluator/
  tag: Blog
  text: Ejecutar pruebas de detección de Atomic Red Team en entornos en contenedores
    con Workload Security Evaluator de Datadog
- link: https://www.datadoghq.com/blog/security-context-with-datadog-cloud-security-management/
  tag: Blog
  text: Añadir contexto de seguridad a los datos de observabilidad con Datadog Cloud
    Security Management
- link: https://www.datadoghq.com/blog/security-labs-ruleset-launch/
  tag: Blog
  text: Solucionar los riesgos habituales de seguridad en la nube con el conjunto
    de reglas de Datadog Security Labs
- link: https://www.datadoghq.com/blog/securing-cloud-native-applications/
  tag: Blog
  text: Prácticas recomendadas para la seguridad de las aplicaciones en entornos nativos
    de la nube
- link: https://www.datadoghq.com/blog/custom-detection-rules-with-datadog-cloud-security-management/
  tag: Blog
  text: Personalizar las reglas para detectar errores de configuración en la nube
    con Datadog Cloud Security Management
- link: https://www.datadoghq.com/blog/building-security-coverage-for-cloud-environments/
  tag: Blog
  text: Crear una cobertura de seguridad suficiente para tu entorno en la nube
- link: https://www.datadoghq.com/blog/cloud-security-study-learnings/
  tag: Blog
  text: Principales conclusiones del estudio sobre el estado de Cloud Security
- link: https://www.datadoghq.com/blog/cloud-security-malware-detection/
  tag: Blog
  text: Detectar malware en tus contenedores con Datadog Cloud Security Management
- link: https://www.datadoghq.com/blog/security-posture-csm/
  tag: Blog
  text: Informe de los cambios en tu postura de seguridad con Cloud Security Management
title: Cloud Security Management
---

{{< learning-center-callout header="Join an enablement webinar session" hide_image="true" btn_title="Sign Up" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Security">}}
  Descubre cómo Datadog Cloud SIEM y Cloud Security Management mejoran la detección de amenazas de tu organización e investigación de entornos dinámicos a escala en la nube.
{{< /learning-center-callout >}}

Datadog Cloud Security Management (CSM) ofrece detección de amenazas en tiempo real y auditorías continuas de configuración en toda tu infraestructura en la nube, todo ello en una vista unificada para una colaboración fluida y una corrección más rápida. Gracias a los datos de observabilidad, los equipos de seguridad pueden determinar el impacto de una amenaza rastreando el flujo completo del ataque e identificar al propietario del recurso en el que se activó una vulnerabilidad.

CSM aprovecha las integraciones en la nube de toda la plataforma y Datadog Agent e incluye:

- [Amenazas**][1]: monitoriza la actividad de archivos, redes y procesos en tu entorno para detectar amenazas en tiempo real a tu infraestructura.
- [**Errores de configuración**][2]: rastrea el estado de la seguridad y la postura de cumplimiento de tu entorno de producción, automatiza la recopilación de pruebas de auditoría y te permite remediar las configuraciones erróneas que dejan a tu organización vulnerable a los ataques.
- [Riesgos de identidad**][8]: proporciona una visibilidad detallada de los riesgos de AWS IAM de tu organización y te permite detectar y resolver los riesgos de identidad de forma continua.
- [**Vulnerabilidades**][9]: aprovecha la observabilidad de infraestructura para detectar, priorizar y gestionar vulnerabilidades en los contenedores y hosts de tu organización.

{{< img src="security/csm/csm_overview_2.png" alt="Cloud Security Management en Datadog" width="100%">}}

## Controla el estado de tu organización

Disponible para [CSM Misconfigurations][2], la [puntuación de la postura de seguridad][5] te ayuda a realizar un seguimiento del estado general de tu organización. La puntuación representa el porcentaje de tu entorno que satisface todas tus normas de cumplimiento predefinidas activas en la nube y en la infraestructura.

Mejora la puntuación de tu organización mediante la corrección de las configuraciones erróneas, ya sea resolviendo el problema subyacente o silenciando la configuración errónea.

{{< img src="security/csm/health_scores.png" alt="La puntuación de la postura en la página de información de CSM rastrea el estado general de tu organización" width="100%">}}

## Explorar y solucionar los problemas

Utiliza los [Exploradores][7] para revisar y corregir las detecciones de seguridad de tu organización. Consulta la información detallada sobre una detección, incluidas directrices y pasos para remediarla. [Envía notificaciones][6] en tiempo real cuando se detecte una amenaza en tu entorno, y utiliza etiquetas (tags) para identificar al propietario de un recurso afectado.

{{< img src="security/csm/explorers_page.png" alt="Página de Exploradores de CSM" width="100%">}}

## Investigar los recursos

{{< site-region region="gov" >}}
<div class="alert alert-danger">El catálogo de recursos no es compatible con el <a href="/getting_started/site">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

<div class="alert alert-info">El catálogo de recursos está en fase beta.</div>

Utiliza el [Catálogo de recursos][12] para ver los errores de configuración y las amenazas específicas de las que se han informado en hosts y recursos de tus entornos. Consulta [Catálogo de recursos][13] para obtener más información.

{{< img src="infrastructure/resource_catalog/resource_catalog_infra.png" alt="Vista de mapa del Catálogo de recursos que muestra hosts y recursos de la nube agrupados por categoría y errores de configuración." style="width:100%;" >}}

## Suscríbete a los resúmenes semanales

Recibe un resumen semanal de la actividad de Cloud Security Management durante la última semana, incluidos los nuevos problemas de seguridad importantes descubiertos en los últimos siete días. Las suscripciones al resumen semanal se gestionan por usuario. Para [suscribirte al informe semanal][11], debes tener el permiso `security_monitoring_signals_read`.

## Siguientes pasos

Para empezar con CSM, ve a la página [**Configuración de Cloud Security Management**][3] en Datadog, que contiene pasos detallados sobre cómo configurar CSM. Para obtener más información, consulta [Configuración de Cloud Security Management][10].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/threats/
[2]: /es/security/cloud_security_management/misconfigurations/
[3]: https://app.datadoghq.com/security/configuration/csm/setup
[4]: https://app.datadoghq.com/security/csm
[5]: /es/glossary/#posture-score
[6]: /es/security/notifications/
[7]: https://app.datadoghq.com/security/compliance
[8]: /es/security/cloud_security_management/identity_risks/
[9]: /es/security/cloud_security_management/vulnerabilities/
[10]: /es/security/cloud_security_management/setup/
[11]: https://app.datadoghq.com/security/configuration/reports
[12]: https://app.datadoghq.com/infrastructure/catalog
[13]: /es/infrastructure/resource_catalog