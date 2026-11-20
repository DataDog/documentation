---
code_lang: envoy-gateway
code_lang_weight: 40
title: Requisitos de compatibilidad de Envoy Gateway
type: multi-code-lang
---
La siguiente tabla enumera las capacidades de App and API Protection para la integración de Envoy Gateway según la versión de la imagen de Datadog External Processor especificada:

| Capacidad de App and API Protection              | Versión mínima de la imagen de Datadog External Processor  |
|------------------------------------------------|---------------------------------------------------|
| Detección de amenazas                               | v2.4.0                                            |
| Protección contra amenazas                              | v2.4.0                                            |
| Personalice la respuesta a las solicitudes bloqueadas         | v2.4.0                                            |
| Modo asíncrono sin bloqueo (observabilidad) | no compatible                                     |
| Seguridad de API                                   | v2.4.0                                            |
| App and API Protection independiente              | v2.4.0                                            |
| Seguimiento automático de eventos de actividad del usuario         | no compatible                                     |

### Soporte para el procesamiento del cuerpo {#body-processing-support}

El servicio Datadog External Processor admite el procesamiento de cuerpos de solicitud y respuesta para los siguientes tipos de carga útil:

| Tipo de carga útil | Versión mínima de la imagen de Datadog External Processor  |
|--------------|---------------------------------------------------|
| JSON         | v2.4.0                                            |

## Compatibilidad de versiones de Envoy Gateway {#envoy-gateway-version-support}

### Versiones de Envoy Gateway compatibles {#supported-envoy-gateway-versions}

Envoy Gateway depende de Envoy Proxy y de la Gateway API, y se ejecuta dentro de un clúster de Kubernetes. Datadog solo admite versiones de Envoy Gateway que no hayan llegado al final de su vida útil (EOL); consulte la [Matriz de compatibilidad de Envoy Gateway][1] oficial para obtener la lista actual de versiones compatibles y dependencias upstream (Envoy Proxy, Gateway API, Kubernetes).


### Compatibilidad de versiones de Envoy {#envoy-version-support}

La integración de Datadog Envoy para App and API Protection depende de funciones que podrían no estar presentes en todas las versiones de Envoy. La siguiente tabla muestra qué versiones de Envoy admiten cada función.

| Función | Versión mínima de Envoy |
|---------|-----------------------|
| Filtro de procesamiento externo | v1.27.0 |
| Modo de observabilidad | v1.30.0 |

## Soporte para la integración de Datadog Envoy Gateway {#datadog-envoy-gateway-integration-support}

Solo se admiten la versión de Linux y las arquitecturas amd64 y arm64.

<div class="alert alert-info">Si desea que se agregue soporte para alguna de
las capacidades no compatibles, ¡háganoslo saber! Complete <a
href=\"https://forms.gle/gHrxGQMEnAobukfn7\">este breve formulario para enviar
detalles</a>.</div>

[1]: https://gateway.envoyproxy.io/news/releases/matrix/