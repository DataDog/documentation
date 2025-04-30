---
aliases:
- /es/tracing/software_catalog/guides/dependency_management
- /es/software_catalog/guides/dependency_management
- /es/tracing/software_catalog/use_cases/dependency_management
- /es/tracing/service_catalog/guides/dependency_management
- /es/service_catalog/use_cases/dependency_management
- /es/service_catalog/guides/dependency_management
- /es/tracing/service_catalog/use_cases/dependency_management
further_reading:
- link: /tracing/
  tag: Documentación
  text: Monitorización del rendimiento de las aplicaciones de Datadog
- link: /universal_service_monitoring/
  tag: Documentación
  text: Monitorización universal de servicios de Datadog
- link: /real_user_monitoring
  tag: Documentación
  text: Datadog Real User Monitoring (RUM)
title: Gestión y asignación de dependencias
---

El Catálogo de servicios de Datadog ofrece poderosas funciones de asignación de dependencias para ayudar a los equipos a documentar, rastrear y evaluar relaciones ascendentes y descendentes. Estas funciones admiten tanto la detección automática como la definición manual para que puedas definir la arquitectura de tu sistema con flexibilidad y precisión.

## Asignación automática de dependencias y detección de entidades

- **Detección automática:** Por defecto, el Catálogo de software incluye todos los servicios detectados de APM, USM y RUM. Cuando instrumentas aplicaciones adicionales en tus entornos, tus dependencias se añaden automáticamente al Catálogo.

- **Integración de telemetría:** El Catálogo de software detecta automáticamente las relaciones de dependencias mediante la telemetría de aplicaciones recopilada por APM, USM y RUM, lo que proporciona a los equipos información en tiempo real sobre las relaciones entre servicios y el impacto en el rendimiento.

{{< img src="tracing/software_catalog/dependency-mgmt-use-case-auto-discovery.png" alt="The Dependencies pestaña in the side panel for a servicio, showing a flow chart of servicio dependencies." >}}

## Definición manual de dependencias en la v3.0 del esquema del Catálogo de software

En la [v3.0 del esquema del Catálogo de software][2], los equipos pueden definir manualmente las relaciones para complementar las topologías detectadas automáticamente. Esta función es especialmente útil para definir dependencias que reflejan el conocimiento institucional y la colaboración en equipo, garantizando una visión más completa de las relaciones del sistema.

{{< img src="tracing/software_catalog/dependency-mgmt-use-case-relationship-mapping.png" alt="Diagrama de relaciones jerárquicas que muestra las dependencias de un servicio." >}}

### Configurar una dependencia manual 

Para definir una dependencia manual, actualiza la sección `spec` de la definición de entidad correspondiente utilizando las siguientes claves:

  - `dependsOn`: Especifica las dependencias (por ejemplo, el servicio A depende del servicio B).
  - `ownedBy`: Asigna la propiedad a un equipo o grupo (por ejemplo, el servicio A es propiedad del equipo A).
  - `partOf`: Agrupa los componentes de un sistema (por ejemplo, el servicio A forma parte del sistema A).

Ejemplo de configuración YAML:

```yaml
apiVersion: v3
kind: service
metadata:
  name: web-store
spec:
  dependsOn: 
    - service: cws-webapp
```

### Visualizar dependencias manuales

Para ver las dependencias manuales en la aplicación Datadog:

1. Ve al [Catálogo de software][1].
1. Selecciona tu servicio para abrir el panel lateral.
1. Busca la pestaña Rendimiento y luego selecciona la subpestaña Dependencias.

También puedes abrir la página de servicios completa de un servicio específico y seleccionar la sección Dependencias en el panel de navegación de la izquierda. 

Se muestran todas las dependencias, incluidas las manuales. Puedes utilizar la función "Incluir detectadas" para modificar la vista: 

- Cuando la función **Incluir detectadas** está desactivada: Sólo se muestran las dependencias definidas manualmente.
- Cuando la función **Incluir detectadas** está activada: Las dependencias añadidas manualmente se muestran por encima de las detectadas automáticamente para ofrecer una distinción clara.

{{< img src="tracing/software_catalog/dependency-mgmt-use-case-include-detected.png" alt="Diagrama que muestra las dependencias de un servicio, donde la función 'Incluir detectadas' está desactivada." >}}

### Ventajas de la definición manual de dependencias

- Mayor precisión: Al definir las dependencias manualmente, los equipos pueden incorporar su comprensión y sus conocimientos específicos al Catálogo de software, garantizando que represente con precisión las arquitecturas de los sistemas del mundo real que las herramientas automatizadas podrían pasar por alto.
- Mayor colaboración: Las dependencias definidas manualmente favorecen una mejor comunicación y coordinación al hacer explícitas las relaciones, lo que ayuda en los esfuerzos de respuesta a incidentes y en la planificación estratégica de la arquitectura.
- Conocimiento contextual: Proporcionar definiciones manuales ayuda a los desarrolladores y a los nuevos miembros del equipo a comprender rápidamente las complejidades de las dependencias y arquitecturas del sistema, lo que facilita la incorporación y la transferencia de conocimientos.


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /es/software_catalog/service_definitions/v3-0/