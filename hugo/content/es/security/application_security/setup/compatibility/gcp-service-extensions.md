---
aliases:
- /es/security/application_security/threats/setup/compatibility/gcp-service-extensions
code_lang: gcp-service-extensions
code_lang_weight: 40
title: Requisitos de compatibilidad de las extensiones de servicio GCP de App and
  API Protection
type: lenguaje de código múltiple
---

En la siguiente tabla se enumeran las capacidades de App and API Protection para las extensiones de servicio GCP según la versión de imagen de llamada de extensiones de servicio de Datadog especificada:

| Función de protección de las aplicaciones y las API        | Versión mínima de la imagen de llamada de las extensiones de servicio de App and API Protection  |
|------------------------------------------|--------------------------------------------------------------------------|
| Detección de amenazas                         | 1.71.0                                                                   |
| Protección frente a amenazas                        | 1.71.0                                                                   |
| Personalizar la respuesta a las solicitudes bloqueadas   | 1.71.0                                                                   |
| Seguridad de la API                             | v2.2.2                                                                   |
| App and API Protection independiente        | v2.2.2                                                                   |
| Rastreo automático de los eventos de actividad de los usuarios   | no compatible                                                            |

Consulta las [limitaciones][1] de la integración de las extensiones de servicio GCP de App and API Protection.

### Soporte para el procesamiento del cuerpo

La llamada a extensiones de servicio de Datadog admite el procesamiento de cuerpos de solicitud y respuesta para los siguientes tipos de carga útil:

| Tipo de carga útil | Versión mínima de la imagen de llamada de las extensiones de servicio de App and API Protection  |
|--------------|--------------------------------------------------------------------------|
| JSON         | v2.2.2                                                                   |

## Compatibilidad con extensiones de servicio GCP de App and API Protection

<div class="alert alert-info">Las extensiones de servicio GCP de App and API Protection están en vista previa.</div>

<div class="alert alert-info">Si quieres que agreguemos la compatibilidad para alguna función que aún no es compatible, háznoslo saber. Rellena <a
href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviarnos tu información</a>.</div>

[1]: /es/security/application_security/setup/gcp/service-extensions