---
code_lang: envoy-gateway
code_lang_weight: 40
title: Requisitos de compatibilidad de Envoy Gateway
type: multi-code-lang
---

La siguiente tabla enumera las capacidades de App y API Protection para la integración de Envoy Gateway según la versión de imagen del Datadog External Processor especificado:

| Función de App and API Protection              | Versión mínima de la imagen del Datadog External Processor  |
|------------------------------------------------|---------------------------------------------------|
| Threat Detection                               | v2.4.0                                            |
| Threat Protection                              | v2.4.0                                            |
| Personalizar la respuesta a las solicitudes bloqueadas         | v2.4.0                                            |
| Modo asíncrono no bloqueante (observabilidad) | no compatible                                     |
| Seguridad de la API                                   | v2.4.0                                            |
| App and API Protection independiente              | v2.4.0                                            |
| Rastreo automático de los eventos de actividad de los usuarios         | no compatible                                     |

### Soporte para el procesamiento del cuerpo

El servicio Datadog External Processor admite el procesamiento de cuerpos de solicitud y respuesta para los siguientes tipos de carga útil:

| Tipo de carga útil | Versión mínima de la imagen del Datadog External Processor  |
|--------------|---------------------------------------------------|
| JSON         | v2.4.0                                            |

## Compatibilidad con la versión de Envoy Gateway

### Versiones compatibles de Envoy Gateway

Envoy Gateway se basa en Envoy Proxy y en la API de Gateway, y se ejecuta dentro de un clúster de Kubernetes. Datadog solo es compatible con versiones de Envoy Gateway que no sean EOL; consulta la [Matriz de compatibilidad de Envoy Gateway][1] oficial para obtener la lista actual de versiones compatibles y dependencias ascendentes (Envoy Proxy, API de Gateway, Kubernetes).


### Compatibilidad con la versión de Envoy

La integración de Envoy en Datadog para App and API Protection se basa en funciones que pueden no estar presentes en todas las versiones de Envoy. La siguiente tabla muestra qué versiones de Envoy son compatibles con cada función.

| Función | Versión mínima de Envoy |
|---------|-----------------------|
| Filtro de procesamiento externo | v1.27.0 |
| Modo de observabilidad | v1.30.0 |

## Compatibilidad con la integración de Datadog Envoy Gateway

<div class="alert alert-info">La integración de Datadog Envoy Gateway para App and API Protection está en vista previa.</div>

Solo es compatible la versión de Linux y las arquitecturas amd64 y arm64.

<div class="alert alert-info">Si quieres que agreguemos la compatibilidad para alguna función que aún no es compatible, háznoslo saber. Rellena <a
href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviarnos tu información</a>.</div>

[1]: https://gateway.envoyproxy.io/news/releases/matrix/