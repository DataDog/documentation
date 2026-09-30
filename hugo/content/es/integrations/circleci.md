---
app_id: circleci
categories:
- métricas
- configuración y despliegue
- automatización
- herramientas para desarrolladores
custom_kind: integración
description: La plataforma de CircleCI facilita la creación y el lanzamiento rápidos
  de software de calidad.
further_reading:
- link: https://www.datadoghq.com/blog/circleci-monitoring-datadog/
  tag: blog
  text: Monitorizar tu entorno de CircleCI con Datadog
integration_version: 1.0.0
media:
- caption: Synthetics
  image_url: images/circleci_synthetics.jpg
  media_type: imagen
title: CircleCI
---
## Información general

Conéctate a CircleCI para:

- Visualizar métricas clave de CircleCI, como la cantidad de compilaciones finalizadas o el tiempo de compilación promedio.
- Analizar datos (por ejemplo, dividiendo compilaciones por nombre de trabajo o repositorio) utilizando el sistema de etiquetas (tags) de Datadog.
- Ver datos del flujo de trabajo de Orb en Synthetics.
- Recopilar e ingerir logs de trabajos de CircleCI en Datadog.

## Configuración

### Instalación

Puedes instalar la integración de CircleCI con su [cuadro de integración](https://app.datadoghq.com/integrations/circleci).

### Configuración

1. En la configuración de CircleCI, ve a Personal API Tokens e ingresa la clave generada en el formulario. El nombre no debe ser el mismo que la etiqueta de CircleCI, sino que debe ser único.
1. Filtra los repositorios utilizando una expresión como "Organization/repo*name", "Organization/repo*\*" o "Organization/\*". **El filtrado se realiza en la lista de proyectos rastreados, que debe configurarse en el lado de CircleCI.**
1. Especifica el sistema de control de versiones apropiado y haz referencia a la clave API apropiada.
1. Si habilitas la recopilación de logs para un repositorio, debes asegurarte de que tus pipelines se envíen a Datadog CI Visibility.
   Sigue las instrucciones de [Configuración del rastreo en un proceso de CircleCI](https://docs.datadoghq.com/continuous_integration/pipelines/circleci/).

Se pueden configurar varios tokens de API y se pueden rastrear varios proyectos para un token determinado. Los usuarios deben estar configurados como colaboradores de un repositorio en particular para poder ver la información de ese repositorio en Datadog.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **circleci.completed_build_time.sum** <br>(count) | Tiempo total de compilación de las compilaciones completadas (no canceladas)<br>_Se muestra en milisegundos_ |
| **circleci.completed_build_time.avg** <br>(gauge) | Tiempo promedio de compilación de las compilaciones completadas (no canceladas)<br>_Se muestra en milisegundos_ |
| **circleci.finished_builds.count** <br>(count) | Recuento de todas las compilaciones finalizadas<br>_Se muestra como compilación_ |
| **circleci.completed_builds.count** <br>(count) | Recuento de todas las compilaciones finalizadas (no canceladas)<br>_Se muestra como compilación_ |

### Eventos

La integración CircleCI no incluye eventos.

### Checks de servicio

La integración CircleCI no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

- [Monitoriza tu entorno de CircleCI con Datadog](https://www.datadoghq.com/blog/circleci-monitoring-datadog/)