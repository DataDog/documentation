---
description: Configura e instala Datadog como administrador para evitar problemas
  comunes.
further_reading:
- link: /getting_started/application/
  tag: Documentación
  text: Más información sobre las funciones disponibles en Datadog.
title: Guía del administrador
---

Utiliza esta guía para administradores de Datadog cuando tu empresa haya adquirido y esté preparada para aprovechar la plataforma de observabilidad de Datadog. Esta guía te ayuda a sacar el máximo partido de Datadog para obtener visibilidad del estado y el rendimiento de tu infraestructura subyacente, tus servicios de apoyo y tus aplicaciones. Proporciona sugerencias para diseñar, instalar y gestionar una instalación de nivel empresarial de Datadog, adaptada a tus necesidades. Como una extensión de la [documentación][1] principal, esta guía ofrece las prácticas recomendadas, orientación y ejemplos para configurar un entorno de producción que se ajuste a tus cargas de trabajo y necesidades de instalación.

Después de utilizar esta guía para instalar Datadog y escalar con tu organización, podrás gestionar la instalación de forma eficiente sin preocuparte de renovaciones de hardware, parches del sistema operativo, actualizaciones del servidor o detalles de reequilibrio de clúster. En su lugar, puedes centrarte en las ventajas de un sistema de observabilidad completo, como:

- Reducción de los costes de la nube y infraestructura.
- Reducir la gravedad, la frecuencia y el tiempo medio de resolución de las incidencias.
- Recopilar, procesar y correlacionar los datos de observabilidad y seguridad de toda tu pila en una sola plataforma.
- Automatizar la corrección y tomar medidas directamente desde Datadog con un contexto completo de datos de observabilidad en toda tu pila.

## Ventajas de esta guía

Esta guía esboza los conceptos fundamentales de Datadog y ofrece pasos para evitar problemas comunes como los modelos de datos fragmentados, la agrupación de usuarios no estructurados, el consumo no controlado y el valor no realizado.

## Cómo utilizar esta guía

Esta guía está organizada en tres secciones que proporcionan conceptos, planes, tareas y estructuras importantes para crear y agilizar tu experiencia de propiedad de Datadog:

* **[Plan][2]**: aprende las partes de Datadog que son importantes para tu caso de uso, crea una base de conocimientos, desarrolla algo de experiencia práctica, planifica tu instalación y aplica las prácticas recomendadas cuando configures tu plataforma de observabilidad.  
* **[Compilación][3]**: conoce lo que hay que instalar y crea una metodología de despliegue detallada para poder configurar un entorno de Datadog que se adapte mejor a tus necesidades.  
* **[Ejecución][4]**: mantiene Datadog, maximiza su potencia y gestiona el soporte continuo.

{{< img src="/administrators_guide/plan_build_run_2.png" alt="Diagrama de las fases de plan, compilación y ejecución" style="width:80%;">}}

## Próximos pasos

A lo largo de esta guía aprenderás a maximizar el valor de Datadog explorando una base de conocimientos, experimentando con el producto y creando un diseño de instalación. Para empezar a utilizar la Guía del administrador de Datadog, revisa la página [Empezando][5] para obtener información sobre cómo interactuar con el servicio de soporte de Datadog, inscribirte en los cursos de formación gratuitos de Datadog y aprender a crear un entorno de test.

{{< whatsnext desc="This section includes the following topics:">}}
  {{< nextlink href="/administrators_guide/getting_started">}}<u>Empezando</u>: aprenda cómo enviar una flare al soporte, inscribirte en cursos de formación de Datadog y crear un entorno de test.{{< /nextlink >}}
  {{< nextlink href="/administrators_guide/plan">}}<u>Plan</u>: planifica tu instalación de Datadog al crear un perfil de tamaño, desarrollar prácticas generales y recomendadas y optimizar la recopilación de datos. {{< /nextlink >}}
  {{< nextlink href="/administrators_guide/build">}}<u>Compilación</u>: crea tu entorno de Datadog al priorizar características, desarrollar un sistema interno de soporte y aprovisionar tu arquitectura. {{< /nextlink >}}
  {{< nextlink href="/administrators_guide/run">}}<u>Ejecución</u>: mantén y ejecuta tu instalación de Datadog mediante la creación de dashboards, incorporación de nueva infraestructura y realización de actualizaciones del Datadog Agent.{{< /nextlink >}}
{{< /whatsnext >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}



[1]: https://docs.datadoghq.com/es/
[2]: /es/administrators_guide/plan
[3]: /es/administrators_guide/build
[4]: /es/administrators_guide/run
[5]: /es/administrators_guide/getting_started