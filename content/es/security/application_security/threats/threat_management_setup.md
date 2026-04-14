---
disable_toc: false
title: Configuración de la protección de aplicaciones y API
---

## Requisitos previos

Antes de configurar la protección de aplicaciones y API, asegúrate de que se cumplen los siguientes requisitos previos:

- **Instalación del Datadog Agent:** el Datadog Agent se instala y configura para el sistema operativo de tu aplicación o contenedor, nube o entorno virtual.
- Configuración de Datadog APM: Datadog APM está configurado para tu aplicación o servicio y Datadog está recibiendo trazas web (`type:web`).
- Biblioteca de rastreo compatible: la librería de rastreo de Datadog utilizada por tu aplicación o servicio es compatible con las funciones de protección de aplicaciones y API para el lenguaje de tu aplicación o servicio. Para más detalles, consulta la página de compatibilidad de la librería.

## Información general de tipos de protección de aplicaciones y API

Existen dos métodos principales para activar la protección de aplicaciones y API en las bibliotecas de rastreo: instrumentación de un solo paso y bibliotecas de rastreo de Datadog.

## Instrumentación de un solo paso

Ejecuta un comando de instalación de una sola línea para instalar el Agent y activa la protección de aplicaciones y API con instrumentación de un solo paso.


## Bibliotecas de rastreo de Datadog

Añade una variable de entorno o un nuevo argumento a tu configuración de la librería de rastreo de Datadog.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}
