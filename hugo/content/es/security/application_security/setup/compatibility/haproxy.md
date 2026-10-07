---
code_lang: haproxy
code_lang_weight: 40
title: Requisitos de compatibilidad de HAProxy
type: multi-code-lang
---

La siguiente tabla enumera las capacidades de App and API Protection para la integración de HAProxy según la versión de imagen SPOA especificada de Datadog HAProxy :

| Función de App and API Protection              | Versión mínima de imagen SPOA de Datadog HAProxy |
|------------------------------------------------|--------------------------------------------|
| Threat Detection                               | v2.4.0                                     |
| Threat Protection                              | v2.4.0                                     |
| Personalizar la respuesta a las solicitudes bloqueadas         | v2.4.0                                     |
| Modo asíncrono no bloqueante (observabilidad) | no compatible                              |
| Seguridad de la API                                   | v2.4.0                                     |
| App and API Protection autónomo              | v2.4.0                                     |
| Rastreo automático de los eventos de actividad de los usuarios         | no compatible                              |

### Compatibilidad del procesamiento de cuerpos

El SPOA de Datadog HAProxy admite el procesamiento de cuerpos de solicitud y respuesta para los siguientes tipos de carga útil:

| Tipo de carga útil | Versión mínima de imagen SPOA de Datadog HAProxy |
|--------------|--------------------------------------------|
| JSON         | v2.4.0                                     |

## Compatibilidad de versiones de HAProxy

La integración de Datadog y HAProxy para App and API Protection se basa en funciones que pueden no estar presentes en todas las versiones de HAProxy. La siguiente tabla muestra qué versiones de HAProxy son compatibles con cada función.

| Función | Versión mínima de HAProxy  |
|---------|-----------------------|
| SPOE | v2.4.0 |

## Compatibilidad de la integración de Datadog y HAProxy

Todas las versiones actualmente compatibles (no EOL) de HAProxy son compatibles y soportadas por la integración de Datadog y App and API Protection.

<div class="alert alert-info">La integración de Datadog y HAProxy para App and API Protection está en vista previa.</div>

Consulta las [limitaciones][1] de la integración de Datadog y HAProxy para App and API Protection.

[1]: /es/security/application_security/setup/haproxy