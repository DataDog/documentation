---
aliases:
- /es/tracing/software_catalog/guides/appsec_management
- /es/software_catalog/guides/appsec_management
- /es/tracing/software_catalog/use_cases/appsec_management
- /es/tracing/service_catalog/guides/appsec_management
- /es/service_catalog/guides/appsec_management
- /es/service_catalog/use_cases/appsec_management
- /es/tracing/service_catalog/use_cases/appsec_management
- /es/service_catalog/use_cases/application_security
further_reading:
- link: /security/application_security/
  tag: Documentación
  text: Datadog Application Security Management
title: Gestionar la postura de seguridad de las aplicaciones en todos los equipos
  de desarrollo
---

El Catálogo de software permite a las organizaciones incorporar sin problemas la seguridad en todas las fases de desarrollo, garantizando una sólida postura de seguridad en todos los equipos, aplicaciones y sistemas.

El Catálogo de software muestra y centraliza las señales de seguridad, lo que permite a los desarrolladores priorizar las acciones y abordar las vulnerabilidades con rapidez. Mientras tanto, los administradores pueden supervisar los riesgos, impulsar mejoras y garantizar el cumplimiento de la organización.

{{< img src="tracing/software_catalog/appsec-use-case.png" alt="Pestaña Seguridad del Catálogo de servicios que muestra los riesgos de vulnerabilidad, la exposición a ataques y la cobertura para cada servicio." >}}

## Crear aplicaciones seguras desde el diseño

El Catálogo de software proporciona rutas y barreras de seguridad predeterminadas para ayudar a los equipos a crear, evaluar y mejorar la seguridad de los procesos. Los desarrolladores pueden [crear nuevos servicios][1] o integrar recursos de nube con confianza, con la seguridad de que las normas de seguridad se cumplen en cada paso. 

Para servicios instrumentados con APM, APM Security Views detecta automáticamente los servicios vulnerables a ataques a aplicaciones, como inyecciones SQL, SSRF o ataques Log4Shell. Puedes utilizar APM Security Views para investigar cada servicio y tipo de ataque que encuentre tu organización, comprender los riesgos de seguridad asociados y gestionar eficazmente la superficie de ataque de tu aplicación con un contexto de tiempo de ejecución.

## Seguimiento del software y las dependencias de terceros

El Catálogo de software organiza y destaca las dependencias de terceros, desde las bibliotecas de código abierto hasta los lenguajes de programación. Los equipos pueden monitorizar versiones, lanzar actualizaciones y abordar las vulnerabilidades de forma proactiva.

- DevSecOps: Utiliza el Catálogo de software para realizar un seguimiento de las dependencias y encabezar las iniciativas de actualización.
- Administradores: Accede a informes en tiempo real sobre el progreso y el cumplimiento de las actualizaciones.
- Desarrolladores: Incorpora las actualizaciones de dependencias a los flujos de trabajo diarios con una interrupción mínima.

## Detalles de configuración

1. Haz clic en un servicio en el Catálogo de software para abrir el panel lateral del servicio.
1. Selecciona la pestaña **Rendimiento** en la parte superior del panel.
1. Busca la sub-pestaña **Bibliotecas**, que enumera todas las bibliotecas externas utilizadas y sus versiones.

{{< img src="tracing/software_catalog/appsec-use-case-libraries.png" alt="Pestaña Seguridad del Catálogo de servicios que muestra los riesgos de vulnerabilidad, la exposición a ataques y la cobertura para cada servicio." >}}


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=data&showActionCatalog=false&template=scaffolding&viewMode=edit&visibleDataItemId=triggerScaffoldNewServiceWorkflow-action