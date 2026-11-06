---
code_lang: istio
code_lang_weight: 40
title: Requisitos de compatibilidad de Istio
type: multi-code-lang
---
La siguiente tabla enumera las capacidades de App and API Protection para la integración de Istio según la versión de la imagen de Datadog External Processor especificada:

| Capacidad de App and API Protection              | Versión mínima de la imagen de Datadog External Processor  |
|------------------------------------------------|---------------------------------------------------|
| Detección de amenazas                               | v1.71.0                                           |
| Protección contra amenazas                              | v1.71.0                                           |
| Personalice la respuesta a las solicitudes bloqueadas         | v1.71.0                                           |
| Modo asíncrono sin bloqueo (observabilidad) | v2.1.0                                            |
| API Security                                   | v2.2.2                                            |
| App and API Protection independiente              | v2.2.2                                            |
| Seguimiento automático de eventos de actividad del usuario         | no compatible                                     |

### Soporte para el procesamiento del cuerpo {#body-processing-support}

El servicio Datadog External Processor admite el procesamiento de cuerpos de solicitud y respuesta para los siguientes tipos de carga útil:

| Tipo de carga útil | Versión mínima de la imagen de Datadog External Processor  |
|--------------|---------------------------------------------------|
| JSON         | v2.2.2                                            |

## Compatibilidad de versiones de Istio {#istio-version-support}

### Versiones de Envoy compatibles {#supported-envoy-versions}

El plano de datos de Istio se basa en Envoy. La siguiente tabla muestra la relación entre las versiones de Istio y sus ramas de lanzamiento de Envoy correspondientes:

| Versión de Istio | Rama de lanzamiento de Envoy |
|---------------|----------------------|
| 1.26.x        | release/v1.34        |
| 1.25.x        | release/v1.33        |
| 1.24.x        | release/v1.32        |

Puede encontrar más información sobre la relación entre las versiones de Istio y Envoy en la [documentación de Istio][1].

### Compatibilidad de versiones de Envoy {#envoy-version-support}

La integración de Datadog Envoy para App and API Protection depende de funciones que podrían no estar presentes en todas las versiones de Envoy. La siguiente tabla muestra qué versiones de Envoy admiten cada función.

| Función | Versión mínima de Envoy |
|---------|-----------------------|
| Filtro de procesamiento externo | v1.27.0 |
| Modo de observabilidad | v1.30.0 |

## Compatibilidad de la integración de Datadog con Istio {#datadog-istio-integration-support}

Solo se admiten la versión de Linux y las arquitecturas arm64 y arm64.

<div class="alert alert-info">Si desea que se agregue soporte para alguna de
las capacidades no compatibles, ¡háganoslo saber! Complete <a
href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviar
detalles</a>.</div>

[1]: https://istio.io/latest/docs/releases/supported-releases/#supported-envoy-versions