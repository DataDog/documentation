---
further_reading:
- link: /security/application_security/
  tag: Documentación
  text: Protegerse de las amenazas con Datadog Application & API Protection
- link: /security/application_security/add-user-info/
  tag: Documentación
  text: Seguimiento de la actividad de los usuarios
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Reglas de Application & API Protection predefinidas
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solucionar problemas de Application & API Protection
- link: /security/application_security/how-it-works/
  tag: Documentación
  text: Funcionamiento de Application & API Protection en Datadog
title: Habilitación de Application & API Protection mediante bibliotecas de rastreo
  de Datadog
type: lenguaje de código múltiple
---

## Requisitos previos 

Antes de configurar Application & API Protection, asegúrate de que se cumplen los siguientes requisitos previos:
- **Datadog Agent:** [Instala el Datadog Agent][2] y configúralo para el sistema operativo del sistema operativo, contenedor, nube o entorno virtual de tu aplicación.
- **Biblioteca de rastreo compatible:** La biblioteca de rastreo de Datadog utilizada por tu aplicación o servicio admite las capacidades de Application & API Protection para el lenguaje de tu aplicación o servicio. Para ver más detalles, consulta la página [Compatibilidad de bibliotecas][1].

## Uso de AAP sin rastreo APM

Si quieres utilizar Application & API Protection sin la funcionalidad de rastreo de APM, puedes desplegarlo con el rastreo desactivado:

1. Configura tu biblioteca de rastreo con la variable de entorno `DD_APM_TRACING_ENABLED=false`, además de la variable de entorno `DD_APPSEC_ENABLED=true`.
2. Esta configuración reducirá la cantidad de datos de APM enviados a Datadog al mínimo requerido por los productos de App and API Protection.

Para obtener más información, consulta [App and API Protection independiente][3].

## Configuración específica del lenguaje

Selecciona el lenguaje de tu aplicación para obtener información sobre cómo habilitar Application & API Protection para tu lenguaje y tus tipos de infraestructuras.

{{< partial name="security-platform/appsec-languages.html" >}}</br>

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/setup/compatibility
[2]: /es/agent/
[3]: /es/security/application_security/guide/standalone_application_security/