---
code_lang: istio
code_lang_weight: 40
title: Requisitos de compatibilidad de Istio
type: multi-code-lang
---

La siguiente tabla enumera las capacidades de App and API Protection para la integración de Istio según la versión de imagen del Datadog External Processor especificada:

| Función de protección de las aplicaciones y las API              | Versión mínima de la imagen del Datadog External Processor  |
|------------------------------------------------|---------------------------------------------------|
| Threat Detection                               | v1.71.0                                           |
| Threat Protection                              | v1.71.0                                           |
| Personalizar la respuesta a las solicitudes bloqueadas         | v1.71.0                                           |
| Modo asíncrono no bloqueante (observabilidad) | v2.1.0                                            |
| Seguridad de la API                                   | v2.2.2                                            |
| App and API Protection autónomo              | v2.2.2                                            |
| Rastreo automático de los eventos de actividad de los usuarios         | no compatible                                     |

### Compatibilidad del procesamiento de cuerpos

El servicio Datadog External Processor admite el procesamiento de cuerpos de solicitud y respuesta para los siguientes tipos de carga útil:

| Tipo de carga útil | Versión mínima de la imagen del Datadog External Processor  |
|--------------|---------------------------------------------------|
| JSON         | v2.2.2                                            |

## Compatibilidad con la versión de Istio

### Versiones de Envoy compatibles

El plano de datos de Istio se basa en Envoy. La siguiente tabla muestra la relación entre las versiones de Istio y sus correspondientes ramas de lanzamiento de Envoy:

| Versión de Istio | Rama de lanzamiento de Envoy |
|---------------|----------------------|
| 1.26.x        | release/v1.34        |
| 1.25.x        | release/v1.33        |
| 1.24.x        | release/v1.32        |

Puedes encontrar más información sobre la relación entre las versiones de Istio y Envoy en la [documentación de Istio][1].

### Compatibilidad con la versión de Envoy

La integración de Envoy en Datadog para App and API Protection se basa en funciones que pueden no estar presentes en todas las versiones de Envoy. La siguiente tabla muestra qué versiones de Envoy son compatibles con cada función.

| Función | Versión mínima de Envoy |
|---------|-----------------------|
| Filtro de procesamiento externo | v1.27.0 |
| Modo de observabilidad | v1.30.0 |

## Compatibilidad con la integración de Datadog Istio

<div class="alert alert-info">La integración de Datadog Istio para App and API Protection está en Vista previa.</div>

Solo se admiten la versión Linux y las arquitecturas arm64 y arm64.

<div class="alert alert-info">Si quieres que agreguemos la compatibilidad para alguna función que aún no es compatible, háznoslo saber. Rellena <a
href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviarnos tu información</a>.</div>

[1]: https://istio.io/latest/docs/releases/supported-releases/#supported-envoy-versions