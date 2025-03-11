---
disable_toc: false
title: Configuración de la gestión de amenazas
---

## Requisitos previos 

Antes de configurar la gestión de amenazas, asegúrate de que se cumplen los siguientes requisitos previos:
- **Instalación del Datadog Agent:** el Datadog Agent se instala y configura para el sistema operativo de tu aplicación o contenedor, nube o entorno virtual.
- **Configuración de Datadog APM:** Datadog APM está configurado para tu aplicación o servicio, y Datadog recibe las trazas (traces) web (`type:web`).
- **Biblioteca de rastreo compatible:** la biblioteca de rastreo de Datadog utilizada por tu aplicación o servicio es compatible con las funciones de Gestión de amenazas para el lenguaje de tu aplicación o servicio. Para ver más detalles, consulta la página [Compatibilidad de bibliotecas][1].

## Bibliotecas de rastreo de Datadog

Añade una variable de entorno o un nuevo argumento para [configurar tu biblioteca de rastreo de Datadog][3].

Siguiendo estos pasos, configurarás con éxito la Gestión de amenazas para tu aplicación o servicio, así podrás monitorizar los servicios que están siendo atacados y los protegerás contra los ataques.

[1]: /es/security/application_security/threats/setup/compatibility
[3]: /es/security/application_security/threats/setup/threat_detection