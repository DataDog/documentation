---
aliases:
- /es/security/application_security/enabling/tracing_libraries/threat_detection/
- /es/security/application_security/threats/threat_detection/
further_reading:
- link: /security/application_security/
  tag: Documentación
  text: Protegerse de las amenazas con Datadog App and API Protection
- link: /security/application_security/add-user-info/
  tag: Documentación
  text: Seguimiento de la actividad de los usuarios
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Reglas de App and API Protection predefinidas
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solucionar problemas de App and API Protection
- link: /security/application_security/how-it-works/
  tag: Documentación
  text: Funcionamiento de App and API Protection en Datadog
title: Activar AAP Threat Detection utilizando bibliotecas de rastreo de Datadog
type: lenguaje de código múltiple
---

## Requisitos previos 

Antes de configurar App and API Protection, asegúrate de que se cumplen los siguientes requisitos previos:
- **Instalación del Datadog Agent:** el Datadog Agent se instala y configura para el sistema operativo de tu aplicación o contenedor, nube o entorno virtual.
- **Configuración de Datadog APM:** Datadog APM está configurado para tu aplicación o servicio, y Datadog recibe las trazas (traces) web (`type:web`).
- **Biblioteca de rastreo compatible:** La biblioteca de rastreo de Datadog utilizada por tu aplicación o servicio es compatible con las funciones de App and API Protection para el lenguaje de tu aplicación o servicio. Para obtener más información, consulta la página [Compatibilidad de bibliotecas][1].

Selecciona el lenguaje de la aplicación para obtener información sobre cómo habilitar AAP Threat Detection para tu lenguaje y tus tipos de infraestructura.

{{< partial name="security-platform/appsec-languages.html" >}}</br>

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/setup/compatibility