---
aliases:
- /es/security/application_security/threats/setup/compatibility/envoy
code_lang: envoy
code_lang_weight: 40
title: Requisitos de compatibilidad de Envoy
type: lenguaje de código múltiple
---

La siguiente tabla enumera las capacidades de App and API Protection para la integración de Envoy según la versión de imagen del Datadog External Processor especificada:

| Función de protección de las aplicaciones y las API              | Versión mínima de la imagen del Datadog External Processor  |
|------------------------------------------------|---------------------------------------------------|
| Detección de amenazas                               | v1.71.0                                           |
| Protección frente a amenazas                              | v1.71.0                                           |
| Personalizar la respuesta a las solicitudes bloqueadas         | v1.71.0                                           |
| Modo asíncrono no bloqueante (observabilidad) | v2.1.0                                            |
| Seguridad de la API                                   | v2.2.2                                            |
| App and API Protection independiente              | v2.2.2                                            |
| Rastreo automático de los eventos de actividad de los usuarios         | no compatible                                     |

### Soporte para el procesamiento del cuerpo

El servicio Datadog External Processor admite el procesamiento de cuerpos de solicitud y respuesta para los siguientes tipos de carga útil:

| Tipo de carga útil | Versión mínima de la imagen del Datadog External Processor  |
|--------------|---------------------------------------------------|
| JSON         | v2.2.2                                            |

## Compatibilidad con la versión de Envoy

La integración de Envoy en Datadog para App and API Protection se basa en funciones que pueden no estar presentes en todas las versiones de Envoy. La siguiente tabla muestra qué versiones de Envoy son compatibles con cada función.

| Función | Versión mínima de Envoy |
|---------|-----------------------|
| Filtro de procesamiento externo | v1.27.0 |
| Modo de observabilidad | v1.30.0 |

## Compatibilidad con la integración de Datadog Envoy

<div class="alert alert-info">La integración de Datadog Envoy para App and API Protection está en vista previa.</div>

Solo se admiten la versión Linux y las arquitecturas arm64 y arm64.

<div class="alert alert-info">Si quieres que agreguemos la compatibilidad para alguna función que aún no es compatible, háznoslo saber. Rellena <a
href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviarnos tu información</a>.</div>