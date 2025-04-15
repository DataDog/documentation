---
aliases:
- /es/code_analysis/
disable_toc: false
title: Seguridad del código
---

Code Security escanea tu código de origen y bibliotecas de código abierto utilizadas en tus aplicaciones, tanto en tus repositorios como servicios en ejecución, proporcionando visibilidad de extremo a extremo desde el desarrollo hasta la producción. Abarca las siguientes capacidades:

- [Static Code Analysis (SAST)][1] para identificar problemas de seguridad y calidad en el código de origen.
- [Software Composition Analysis (SCA)][2] para identificar dependencias de código abierto tanto en tus repositorios como en tus servicios
- [Runtime Code Analysis (IAST)][3] para detectar vulnerabilidades a nivel de código en tus servicios

Code Security ayuda a los equipos a implementar DevSecOps en toda la organización:
- **Desarrolladores:** detección temprana de vulnerabilidades, mejoras en la calidad del código, desarrollo más rápido, ya que los desarrolladores pasan menos tiempo depurando y parcheando.
- **Administradores de seguridad:** postura de seguridad mejorada, gestión de parches mejorada en respuesta a alertas tempranas de vulnerabilidad y monitorización del cumplimiento.
- **Ingenieros de fiabilidad del sitio (SRE):** checks de seguridad automatizados en todo el flujo de trabajo de CI/CD, cumplimiento de la seguridad y resiliencia del sistema. SAST reduce la sobrecarga manual de los SRE y garantiza que cada versión se someta a tests exhaustivos para detectar vulnerabilidades.

## Static Code Analysis (SAST)
Static Code Analysis (SAST) analiza el código previo a la producción para identificar problemas de seguridad y calidad. Puedes integrar las prácticas recomendadas de seguridad y desarrollo en todo el ciclo de vida de desarrollo de software con:
- Integración del IDE para señalar infracciones en tiempo real con propuestas de corrección deterministas.
- Comentarios en línea de las solicitudes pull de GitHub con sugerencias de correcciones deterministas y análisis gradual/consciente de las diferencias.
- Posibilidad de abrir una solicitud pull para corregir una infracción directamente desde Datadog 

Los análisis pueden ejecutarse a través de tus pipelines de CI/CD o directamente en Datadog con el análisis alojado (sólo GitHub).
Consulta [Static Code Analysis Setup][6] para empezar.

## Software Composition Analysis
Software Composition Analysis (SCA) analiza las bibliotecas de código abierto tanto en tus repositorios como en los servicios en ejecución. Puedes realizar un seguimiento y gestionar las dependencias a lo largo del ciclo de vida de desarrollo de software con:
- Integración del IDE para detectar las vulnerabilidades que afectan a bibliotecas que se ejecutan en tus servicios
- Posibilidad de abrir una solicitud pull para corregir una vulnerabilidad de biblioteca directamente desde Datadog
- Priorización de vulnerabilidades basada en el tiempo de ejecución con la puntuación de gravedad de Datadog

SCA admite la detección de dependencias estáticas y en tiempo de ejecución.
Para el escaneo estático, puedes escanear a través de tus pipelines de CI/CD o directamente a través de Datadog con el escaneo alojado (sólo GitHub). Consulta la [configuración estática][4] para empezar.
Para la detección de vulnerabilidades en tiempo de ejecución, puedes habilitar fácilmente SCA en tus servicios instrumentados con Datadog APM. Consulta [configuración de tiempo de ejecución][5] para empezar.

## Runtime Code Analysis (IAST)
Runtime Code Analysis (IAST) identifica vulnerabilidades a nivel de código en tus servicios. Se basa en la inspección del tráfico legítimo de la aplicación, a diferencia de los tests externos que a menudo requieren configuración adicional o programación periódica. IAST proporciona una visión actualizada de la superficie de ataque mediante:
- Monitorización de las interacciones de tu código con otros componentes de tu stack tecnológico (como bibliotecas y infraestructura)
- Cobertura del 100% de las 10 principales normas OWASP
- Priorización de vulnerabilidades basada en el tiempo de ejecución con la puntuación de gravedad de Datadog

Puedes activar IAST en tus servicios instrumentados con Datadog APM. Consulta [Configuración de IAST][3] para empezar.

[1]: /es/security/code_security/static_analysis/
[2]: /es/security/code_security/software_composition_analysis/
[3]: /es/security/code_security/iast/
[4]: /es/security/code_security/software_composition_analysis/setup_static/
[5]: /es/security/code_security/software_composition_analysis/setup_runtime/
[6]: /es/security/code_security/static_analysis/setup/
[7]: /es/security/code_security/iast/setup/