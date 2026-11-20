---
aliases:
- /es/security/application_security/threats/setup/compatibility/gcp-service-extensions
code_lang: gcp-service-extensions
code_lang_weight: 40
title: Requisitos de compatibilidad de las extensiones de servicio de GCP para App
  and API Protection
type: multi-code-lang
---
La siguiente tabla enumera las capacidades de App and API Protection para las extensiones de servicio de GCP según la versión especificada de la imagen de callout de Service Extensions de Datadog:

| Capacidad de App and API Protection        | Versión mínima de la imagen de callout de las extensiones de servicio de App and API Protection  |
|------------------------------------------|--------------------------------------------------------------------------|
| Detección de amenazas                         | 1.71.0                                                                   |
| Protección contra amenazas                        | 1.71.0                                                                   |
| Personalice la respuesta a las solicitudes bloqueadas   | 1.71.0                                                                   |
| Security de API                             | v2.2.2                                                                   |
| App and API Protection independiente        | v2.2.2                                                                   |
| Seguimiento automático de eventos de actividad del usuario   | no compatible                                                            |

Consulte las [limitaciones][1] de la integración de las extensiones de servicio de GCP para App and API Protection.

### Soporte para el procesamiento del cuerpo {#body-processing-support}

El callout de las extensiones de servicio de Datadog admite el procesamiento de cuerpos de solicitud y respuesta para los siguientes tipos de carga útil:

| Tipo de carga útil | Versión mínima de la imagen de callout de las extensiones de servicio de App and API Protection  |
|--------------|--------------------------------------------------------------------------|
| JSON         | v2.2.2                                                                   |

## Soporte de las extensiones de servicio de GCP para App and API Protection {#app-and-api-protection-gcp-service-extensions-support}

<div class="alert alert-info">App and API Protection GCP Service Extensions está en vista previa.</div>

<div class="alert alert-info">Si desea que se agregue soporte para alguna de
las capacidades no compatibles, ¡háganoslo saber! Complete <a
href=\"https://forms.gle/gHrxGQMEnAobukfn7\">este breve formulario para enviar
detalles</a>.</div>

[1]: /es/security/application_security/setup/gcp/service-extensions