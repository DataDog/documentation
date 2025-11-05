---
categories:
- nube
- azure
- ai/ml
custom_kind: integración
dependencies: []
description: Rastrea las métricas clave de Azure Machine Learning.
doc_link: https://docs.datadoghq.com/integrations/azure_machine_learning_services/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/ml-model-monitoring-in-production-best-practices/
  tag: Blog
  text: Prácticas recomendadas para la monitorización de modelos de ML en producción
git_integration_title: azure_machine_learning_services
has_logo: true
integration_id: ''
integration_title: Microsoft Azure Machine Learning
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_machine_learning_services
public_title: Integración de Datadog y Microsoft Azure Machine Learning
short_description: Rastrea las métricas clave de Azure Machine Learning.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

El servicio Azure Machine Learning ofrece a los desarrolladores y científicos de datos una amplia gama de experiencias productivas para crear, entrenar y desplegar modelos de machine learning más rápido. Utiliza Datadog para monitorizar el rendimiento y el uso de Azure Machine Learning en contexto con el resto de tus aplicaciones e infraestructura.

Obtén métricas de Azure Machine Learning para:

* Rastrear el número y el estado de las ejecuciones y los despliegues de modelos
* Monitorizar la utilización de tus nodos de machine learning
* Optimizar el rendimiento frente al coste

## Configuración
### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados
### Métricas
{{< get-metrics-from-git "azure_machine_learning_services" >}}


### Eventos
La integración Azure Machine Learning no incluye eventos.

### Checks de servicios
La integración Azure Machine Learning no incluye checks de servicios.

## Solucionar problemas
¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

## Referencias adicionales
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_machine_learning_services/azure_machine_learning_services_metadata.csv
[3]: https://docs.datadoghq.com/es/help/
