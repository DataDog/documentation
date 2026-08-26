---
further_reading:
- link: /security/application_security/
  tag: Documentación
  text: Más información sobre App and API Protection
- link: /security/cloud_security_management
  tag: Documentación
  text: Más información sobre Cloud Security
- link: /security/default_rules/#all
  tag: Documentación
  text: Reglas de detección predefinidas
- link: https://www.datadoghq.com/blog/security-inbox-prioritization/
  tag: Blog
  text: Cómo Datadog Security Inbox prioriza los riesgos de seguridad
products:
- icon: cloud-security-management
  name: Cloud Security
  url: /security/cloud_security_management/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
title: Buzón de seguridad
---

{{< product-availability >}}

El Buzón de seguridad proporciona una lista consolidada y práctica de tus hallazgos de seguridad más importantes. Contextualiza y correlaciona automáticamente la información de los productos de seguridad de Datadog sobre vulnerabilidades, señales, configuraciones incorrectas y riesgos de identidad en una vista unificada y priorizada de las medidas que debes tomar para reforzar tu entorno.

{{< img src="security/security_inbox_7.png" alt="El Security Inbox muestra problemas de seguridad organizados por prioridades que deben resolverse" width="100%">}}

## Tipos de hallazgos del Buzón de seguridad

Las incidencias que aparecen en Security Inbox se generan a partir de App and API Protection (AAP) y Cloud Security. Por defecto, incluyen los siguientes tipos de hallazgos:

- Un conjunto curado de [errores de configuración][1] para [Cloud Security Misconfigurations][2], compilado por Datadog Security Research.
- Un conjunto curado de [riesgos de identidad][1] para [Cloud Security Identity Risks][3], compilado por Datadog Security Research.
- Vulnerabilidades de la biblioteca de la aplicación para el [Análisis de composición del software (SCA)][4]. Todas las vulnerabilidades elevadas y críticas de la biblioteca de la aplicación en servicios de producción bajo ataque aparecen en el buzón.
- Vulnerabilidades del código de la aplicación para [Vulnerabilidades de seguridad del código][5]. Todas las vulnerabilidades elevadas y críticas del código de la aplicación aparecen en el buzón.
- Vulnerabilidades emergentes, que son vulnerabilidades de infraestructura que han tenido CVEs publicados en los últimos 30 días y que tienen una [puntuación de gravedad de Datadog][10] Crítica, o que el equipo de Datadog Security Research ha publicado. Cuando Datadog califica una vulnerabilidad como Crítica, significa que se trata de una vulnerabilidad crítica explotable que afecta a un recurso de producción orientado a Internet.
- [Rutas de ataque][1]. Una ruta de ataque resume una serie de interconexiones entre configuraciones incorrectas, imágenes de contenedores, hosts y vulnerabilidades de aplicaciones que los actores maliciosos podrían aprovechar para obtener acceso no autorizado, escalar privilegios o comprometer datos confidenciales en tu entorno de nube. Todas las rutas de ataque aparecen por defecto en el Buzón de seguridad.

El Buzón de seguridad también tiene en cuenta los siguientes riesgos detectados a la hora de determinar qué hallazgos aparecen en el Buzón de seguridad:

- **Accesibilidad pública**: Los recursos expuestos públicamente conllevan un riesgo elevado, especialmente si contienen vulnerabilidades o configuraciones incorrectas. Para obtener más información, consulta [Cómo determina Datadog si los recursos son de acceso público][6].
- **Acceso privilegiado**: Los recursos con acceso privilegiado conllevan un riesgo elevado, ya que conceden permisos elevados que pueden ampliar la superficie de ataque.
- **Bajo ataque**: Los recursos que registran una actividad de seguridad sospechosa conllevan un riesgo elevado. Los recursos se marcan como "Bajo ataque" si se ha detectado una señal de seguridad en el recurso en los últimos 15 días.
- **Exploit disponible**: Las vulnerabilidades con exploits públicos disponibles conllevan un riesgo elevado. La disponibilidad de un exploit público se verifica con diferentes bases de datos de exploits, como [cisa.gov][7], [exploit-db.com][8] y [nvd.nist.gov][9].
- **En producción**: las vulnerabilidades en entornos de producción conllevan riesgos elevados. El entorno se calcula a partir de las etiquetas `env` y `environment`.

## Cómo funcionan las prioridades del Buzón de seguridad

El Buzón de seguridad clasifica los problemas teniendo en cuenta en primer lugar la gravedad de un hallazgo, seguido del número de riesgos correlacionados y, a continuación, el número de recursos y servicios afectados.

- **Gravedad (Crítica, Alta, Media y Baja)**: La gravedad es determinada por el [marco de puntuación de la seguridad de Datadog][10] para las configuraciones incorrectas en la nube y los riesgos de identidad, y por CVSS 3.1, para las vulnerabilidades.
- **Número de riesgos detectados**: Cuando dos hallazgos tienen la misma gravedad, se da mayor prioridad al que tiene un mayor número de riesgos detectados.
- **Número de recursos y servicios afectados**: Si dos hallazgos comparten tanto la misma gravedad como el mismo número de riesgos detectados, se prioriza más el hallazgo que afecta a un mayor número de recursos y servicios.

**Nota**: El tipo de hallazgo, riesgo detectado o recurso afectado no influye en la priorización.

## Utilizar el mapa contextual de seguridad para identificar y mitigar vulnerabilidades

El mapa de contexto de seguridad para [Rutas de ataque](#types-of-findings-in-security-inbox) proporciona una visión completa para ayudar a identificar y abordar posibles puntos de infracción. Mapea eficazmente los errores de configuración interconectados, las brechas de permisos y las vulnerabilidades que los atacantes podrían explotar.

Las características clave incluyen:

- **Evaluación de riesgos**: el mapa permite a los equipos de seguridad evaluar el impacto más amplio de las vulnerabilidades y los errores de configuración. Esto incluye evaluar si es necesario actualizar las políticas de seguridad, como las rutas de acceso y los permisos, y comprender las implicaciones de la exposición para el cumplimiento de la normativa, sobre todo cuando hay datos confidenciales en peligro dentro del radio de la explosión.
- **Contexto accionable para una respuesta inmediata**: el mapa incluye información sobre la propiedad del servicio y otros contextos relevantes, lo que permite a los equipos tomar decisiones informadas y en tiempo real. Los equipos pueden tomar acción directamente desde el mapa ejecutando flujos de trabajo integrados, compartiendo enlaces de problemas de seguridad y accediendo a la vista de recursos de la consola de AWS para una corrección eficiente, todo ello sin cambiar de herramienta.

{{< img src="security/security_context_map.png" alt="El mapa de contexto de seguridad que muestra una instancia de AWS EC2 con un error de configuración crítico" width="100%">}}

## Personaliza Security Inbox para resaltar los temas cruciales

Automation Pipelines te permite configurar reglas que personalizan tu Security Inbox, lo que te permite resaltar los problemas que son críticos para tu organización. Al configurar estas reglas automatizadas, puedes agilizar la gestión de las vulnerabilidades recién detectadas, mejorando los esfuerzos de triaje y corrección a escala. Aprovechando Automation Pipelines y las reglas de Añadir a Security Inbox, puedes optimizar tus operaciones de seguridad de las siguientes maneras:

- **Resaltar los problemas que no se detectan por defecto**: resalta los problemas que podrían pasar desapercibidos por las reglas de detección predeterminadas o personalizadas, garantizando que no se pase por alto ningún problema crítico.
- **Reforzar el cumplimiento de la normativa y abordar los principales problemas de los sistemas**: aborda los problemas que afectan al cumplimiento de la normativa o a sistemas empresariales importantes, independientemente de su gravedad.
- **Priorizar los riesgos actuales**: céntrate en las amenazas inmediatas, como los riesgos de identidad tras un incidente o las vulnerabilidades de todo el sector.

Para obtener más información, consulta [Automation Pipelines][11] y [Añadir a reglas de Security Inbox][12].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/default_rules/?category=all#all
[2]: /es/security/cloud_security_management/misconfigurations/
[3]: /es/security/cloud_security_management/identity_risks/
[4]: /es/security/code_security/software_composition_analysis
[5]: /es/security/code_security/iast
[6]: /es/security/cloud_security_management/guide/public-accessibility-logic/
[7]: https://www.cisa.gov/
[8]: https://www.exploit-db.com/
[9]: https://nvd.nist.gov/
[10]: /es/security/cloud_security_management/severity_scoring/#cloud-security-severity-scoring-framework
[11]: /es/security/automation_pipelines/
[12]: /es/security/automation_pipelines/security_inbox