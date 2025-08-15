---
aliases:
- /es/security/application_security/threats/setup/standalone/
further_reading:
- link: /security/application_security/
  tag: Documentación
  text: Protégete contra las amenazas con la protección de aplicaciones y API de Datadog
- link: /security/application_security/add-user-info/
  tag: Documentación
  text: Seguimiento de la actividad de los usuarios
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Reglas predefinidas de protección de aplicaciones y API
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solucionar problemas de protección de aplicaciones y API
- link: /security/application_security/how-it-works/
  tag: Documentación
  text: Cómo funciona la protección de aplicaciones y API en Datadog
title: Habilitación de la protección de aplicaciones y API mediante bibliotecas de
  rastreo de Datadog
type: lenguaje de código múltiple
---

## Requisitos previos 

Antes de configurar la protección de aplicaciones y API, asegúrate de que se cumplan los siguientes requisitos previos:
- **Datadog Agent :** [Instala el Datadog Agent ][2] y configúralo para el sistema operativo o contenedor de tu aplicación, nube o entorno virtual.
- **Biblioteca de seguimiento compatible:** La biblioteca de seguimiento de Datadog utilizada por tu aplicación o servicio es compatible con las funciones de protección de aplicaciones y API para el lenguaje de tu aplicación o servicio. Para obtener más información, consulta la page (página) [Compatibilidad de bibliotecas][1].

## Utilización de AAP sin rastreo de APM

Si deseas utilizar la protección de aplicaciones y API sin la funcionalidad de rastreo de APM, puedes desplegar con el rastreo desactivado:

1. Configura tu biblioteca de rastreo con la variable de entorno `DD_APM_TRACING_ENABLED=false` además de la variable de entorno `DD_APPSEC_ENABLED=true`.
2. Esta configuración reducirá la cantidad de datos de APM enviados a Datadog al mínimo requerido por los productos de protección de aplicaciones y API.

Para obtener más información, consulta [Protección de aplicaciones y API independientes][3].

## Configuración específica del lenguaje

Selecciona el lenguaje de tu aplicación para obtener información detallada sobre cómo activar la protección de aplicaciones y API para tu lenguaje y tipos de infraestructura.

{{< partial name="security-platform/appsec-languages.html" >}}</br>

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/setup/compatibility
[2]: /es/agent/
[3]: /es/security/application_security/guide/standalone_application_security/