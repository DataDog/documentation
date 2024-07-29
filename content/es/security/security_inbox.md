---
further_reading:
- link: /security/application_security/
  tag: Documentación
  text: Obtener más información sobre Application Security Management
- link: /security/cloud_security_management
  tag: Documentación
  text: Obtener más información sobre Cloud Security Management
- link: /security/default_rules/#all
  tag: Documentación
  text: Reglas de detección predefinidas
- link: https://www.datadoghq.com/blog/security-inbox/
  tag: Blog
  text: Identificar y priorizar fácilmente tus principales riesgos de seguridad con
    el Buzón de seguridad de Datadog
products:
- icon: cloud-security-management
  name: Cloud Security Management
  url: /security/cloud_security_management/
- icon: app-sec
  name: Application Security Management
  url: /security/application_security/
title: Buzón de seguridad
---

{{< product-availability >}}

El Buzón de seguridad proporciona una lista consolidada y práctica de tus hallazgos de seguridad más importantes. Contextualiza y correlaciona automáticamente la información de los productos de seguridad de Datadog sobre vulnerabilidades, señales, configuraciones incorrectas y riesgos de identidad en una vista unificada y priorizada de las medidas que debes tomar para reforzar tu entorno.

{{< img src="security/security_inbox_6.png" alt="El Buzón de seguridad muestra problemas de seguridad organizados por prioridades que deben resolverse" width="100%">}}

## Tipos de hallazgos del Buzón de seguridad

Los hallazgos que aparecen en el Buzón de seguridad se generan a partir de Application Security Management (ASM) y Cloud Security Management (CSM). Incluyen los siguientes tipos de hallazgos:

- [Configuraciones incorrectas][1] para [Configuraciones incorrectas de CSM][2].
- [Riesgos de identidad][1] para [Riesgos de identidad de CSM][3].
- Vulnerabilidades de la biblioteca de la aplicación para el [Análisis de composición del software (SCA)][4]. Todas las vulnerabilidades elevadas y críticas de la biblioteca de la aplicación en servicios de producción bajo ataque aparecen en el buzón.
- Vulnerabilidades del código de la aplicación para [Vulnerabilidades de seguridad del código][5]. Todas las vulnerabilidades elevadas y críticas del código de la aplicación aparecen en el buzón.
- [Rutas de ataque][1]. Una ruta de ataque resume una serie de interconexiones entre configuraciones incorrectas, imágenes de contenedores, hosts y vulnerabilidades de aplicaciones que los actores maliciosos podrían aprovechar para obtener acceso no autorizado, escalar privilegios o comprometer datos confidenciales en tu entorno de nube. Todas las rutas de ataque aparecen por defecto en el Buzón de seguridad.

El Buzón de seguridad también tiene en cuenta los siguientes riesgos detectados a la hora de determinar qué hallazgos aparecen en el Buzón de seguridad:

- **Accesibilidad pública**: Los recursos expuestos públicamente conllevan un riesgo elevado, especialmente si contienen vulnerabilidades o configuraciones incorrectas. Para obtener más información, consulta [Cómo determina Datadog si los recursos son de acceso público][6].
- **Acceso privilegiado**: Los recursos con acceso privilegiado conllevan un riesgo elevado, ya que conceden permisos elevados que pueden ampliar la superficie de ataque.
- **Bajo ataque**: Los recursos que registran una actividad de seguridad sospechosa conllevan un riesgo elevado. Los recursos se marcan como "Bajo ataque" si se ha detectado una señal de seguridad en el recurso en los últimos 15 días.
- **Exploit disponible**: Las vulnerabilidades con exploits públicos disponibles conllevan un riesgo elevado. La disponibilidad de un exploit público se verifica con diferentes bases de datos de exploits, como [cisa.gov][7], [exploit-db.com][8] y [nvd.nist.gov][9].
- **En producción**: Las vulnerabilidades en entornos de producción conllevan un riesgo elevado. El entorno se calcula a partir de la etiqueta (tag) `env`.

## Cómo funcionan las prioridades del Buzón de seguridad

El Buzón de seguridad clasifica los problemas teniendo en cuenta en primer lugar la gravedad de un hallazgo, seguido del número de riesgos correlacionados y, a continuación, el número de recursos y servicios afectados.

- **Gravedad (Crítica, Alta, Media y Baja)**: La gravedad es determinada por el [marco de puntuación de la seguridad de Datadog][10] para las configuraciones incorrectas en la nube y los riesgos de identidad, y por CVSS 3.1, para las vulnerabilidades.
- **Número de riesgos detectados**: Cuando dos hallazgos tienen la misma gravedad, se da mayor prioridad al que tiene un mayor número de riesgos detectados.
- **Número de recursos y servicios afectados**: Si dos hallazgos comparten tanto la misma gravedad como el mismo número de riesgos detectados, se prioriza más el hallazgo que afecta a un mayor número de recursos y servicios.

**Nota**: El tipo de hallazgo, riesgo detectado o recurso afectado no influye en la priorización.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/default_rules/?category=cat-csm-security-issues#all
[2]: /es/security/cloud_security_management/misconfigurations/
[3]: /es/security/cloud_security_management/identity_risks/
[4]: /es/security/application_security/software_composition_analysis
[5]: /es/security/application_security/code_security
[6]: /es/security/cloud_security_management/guide/public-accessibility-logic/
[7]: https://www.cisa.gov/
[8]: https://www.exploit-db.com/
[9]: https://nvd.nist.gov/
[10]: /es/security/cloud_security_management/severity_scoring/#csm-severity-scoring-framework