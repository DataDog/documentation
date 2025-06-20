---
aliases:
- /es/tracing/software_catalog/use_cases/production_readiness
further_reading:
- link: /infrastructure/
  tag: Documentación
  text: Monitorización de infraestructura
- link: /software_catalog/scorecards/
  tag: Documentación
  text: Cuadros de mando
- link: /cloud_cost_management/
  tag: Documentación
  text: Cloud Cost Management
title: Evaluar la preparación de la producción
---

Con el Catálogo de software, puedes asegurarte de que tus servicios están listos para la producción evaluando la cobertura de la monitorización, aplicando las prácticas recomendadas de gobernanza e identificando oportunidades de optimización de la seguridad y los costes.

## Evaluar la cobertura de la monitorización 

Con el Catálogo de software, puedes: 
- Identificar servicios que carecen de datos de monitorización u observabilidad.
- Detectar lagunas como la falta de SLOs o monitores, o servicios desconocidos.
- Aplicar las prácticas de etiquetado y verificar las configuraciones para obtener información de telemetría cruzada.

En el [Catálogo de software][3], haz clic en un servicio para abrir un panel lateral detallado y busca la pestaña Setup Guidance (Guía de configuración). En esta sección, puedes comprobar si tu servicio tiene la configuración necesaria para aprovechar las funciones de Datadog como monitores, SLOs y Rastreo de errores. También puedes comprobar si tu servicio está correctamente configurado para recopilar datos telemétricos clave, como el rastreo y logs.

{{< img src="tracing/software_catalog/production-readiness-setup-guidance.png" alt="La pestaña Guía de configuración para un servicio, que muestra la finalización de la configuración de ese servicio y los pasos de configuración recomendados " style="width:100%;" >}}

**Nota**: Esta tabla refleja la actividad de servicio, no la facturación del producto. Por ejemplo, si un servicio no ha emitido métricas de infraestructura durante un periodo prolongado, la monitorización de infraestructura puede mostrar "Not Detected" (No detectado), aunque hosts o contenedores la estén ejecutando.

## Gobernanza y observación

### Utilizar Scorecards para controlar el estado y el rendimiento

[Scorecards][1] proporciona una visión muy clara de las prácticas recomendadas en todos los equipos y servicios, ayudándote a comunicarte eficazmente y a tomar medidas informadas para mejorar el estado y el rendimiento del servicio. Los servicios con metadatos definidos en el Catálogo de software se evalúan automáticamente según los criterios de aprobado o fallido para Disponibilidad para la producción, Prácticas recomendadas de observabilidad y Propiedad y documentación.

{{< img src="tracing/software_catalog/production-readiness-governance-and-obs.png" alt="Cuadros de mando predeterminados para Preparación de la producción, Prácticas recomendadas de observabilidad y Propiedad y documentación, con los porcentajes de cada uno" style="width:100%;" >}}

### Utiliza la pestaña Seguridad para hacer frente a las vulnerabilidades

Utiliza la pestaña de Seguridad en el Catálogo de software para identificar y corregir vulnerabilidades en las dependencias de servicio. Esta vista también revela cuáles son los servicios más atacados y expuestos a amenazas graves.

{{< img src="tracing/software_catalog/security-tab.png" alt="La vista de la pestaña Seguridad del Catálogo de software, que muestra el riesgo de vulnerabilidad y la exposición a ataques para cada servicio" style="width:100%;" >}}

Para explorar los detalles de seguridad de un servicio en particular, puedes realizar una de las siguientes acciones:

- Haz clic en un servicio en el Catálogo de software para abrir el panel lateral del servicio y busca la pestaña de Seguridad.

  {{< img src="tracing/software_catalog/production-readiness-security.png" alt="La pestaña Seguridad para un solo servicio, que muestra detalles sobre el riesgo de vulnerabilidad y exposición a ataques" style="width:100%;" >}}

- Explora la pestaña Seguridad en la Página de servicios, que puede encontrarse pasando el ratón por encima de un nombre de servicio y seleccionando **Service Page** (Página de servicios), o con el botón **Service Page** (Página de servicios) en la esquina superior derecha del panel lateral.

### Utilizar la pestaña Costes para optimizar el gasto

En la pestaña Costes, con información de [Cloud Cost Management][2], puedes identificar ineficiencias, oportunidades de ahorro y tendencias a lo largo del tiempo. Con los datos de costes y las métricas de servicio en un solo lugar, puedes comprender cómo afectan los cambios de ingeniería al gasto total en la nube.

{{< img src="tracing/software_catalog/production-readiness-cost-changes.png" alt="La vista Costes del Catálogo de software, que muestra el coste total por servicio y el cambio en el tiempo" style="width:100%;" >}}

Para explorar los detalles de los costes de un servicio específico, puedes realizar una de las siguientes acciones:

- Haz clic en un servicio en el Catálogo de software para abrir el panel lateral del servicio y busca la pestaña de Costes.
- Explora la pestaña Costes en la Página de servicios, que puede encontrarse pasando el ratón por encima de un nombre de servicio y seleccionando **Service Page** (Página de servicios), o con el botón **Service Page** (Página de servicios) en la esquina superior derecha del panel lateral.


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/software_catalog/scorecards/
[2]: /es/cloud_cost_management/
[3]: https://app.datadoghq.com/software