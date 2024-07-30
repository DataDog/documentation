---
aliases:
- /security_platform/application_security/getting_started/
- /security/application_security/getting_started/
further_reading:
- link: /security/application_security/
  tag: Documentación
  text: Protegerse contra las amenazas con Datadog Application Security Management
- link: /security/application_security/enabling/compatibility/
  tag: Documentación
  text: Compatibilidad de lenguajes y marcos de programación
- link: /security/application_security/add-user-info/
  tag: Documentación
  text: Seguimiento de la actividad de los usuarios
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Normas de Application Security Management predefinidas
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solucionar problemas de Application Security Management
- link: /security/application_security/how-appsec-works/
  tag: Documentación
  text: Cómo funciona Application Security Management en Datadog
- link: https://www.datadoghq.com/blog/secure-serverless-applications-with-datadog-asm/
  tag: Blog
  text: Aplicaciones serverless seguras con Datadog ASM
title: Habilitación de ASM
type: lenguaje de código múltiple
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Application Security Management no es compatible con el <a href="/getting_started/site">sitio de Datadog </a> ({{< region-param key="dd_site_name" >}}) seleccionado.</div>
{{< /site-region >}}

## Requisitos previos

Antes de configurar las funciones de seguridad de las aplicaciones, asegúrate de que se cumplen los siguientes requisitos previos:
- **Instalación del Datadog Agent:** El [Datadog Agent ][5] se instala y configura para el sistema operativo o contenedor de tu aplicación, nube o entorno virtual.
- **Configuración de Datadog APM:** [Datadog APM][6] se configura para tu aplicación o servicio y Datadog sigue recibiendo trazas (traces).
- **Biblioteca de rastreo compatible:** La biblioteca de rastreo compatible utilizada por tu aplicación o servicio es compatible con las funciones de Análisis de la composición del software para el lenguaje de tu aplicación o servicio. Para obtener más detalles, consulta la [compatibilidad de la biblioteca][7].

## Tipos de habilitación de la seguridad de las aplicaciones

Existen dos enfoques principales para habilitar la seguridad en tus aplicaciones: la instrumentación en un solo paso o la biblioteca de rastreo de Datadog.

### Instrumentación en un solo paso

Ejecuta un comando de instalación de una sola línea para instalar el Datadog Agent y habilitar las funciones de seguridad de las aplicaciones con la [Instrumentación en un solo paso (Beta)][3].

### Bibliotecas de rastreo de Datadog

Añade una variable de entorno o un nuevo argumento a la configuración de tu [biblioteca de rastreo de Datadog][4].


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/threats/
[2]: /es/security/application_security/risk_management/
[3]: /es/security/application_security/enabling/single_step
[4]: /es/security/application_security/enabling/tracing_libraries
[5]: https://app.datadoghq.com/account/settings/agent/latest
[6]: /es/tracing/trace_collection/dd_libraries/
[7]: /es/security/application_security/enabling/compatibility/