---
code_lang: envoy
code_lang_weight: 40
title: Requisitos de compatibilidad de Envoy
type: lenguaje de código múltiple
---

La siguiente tabla enumera la compatibilidad con funciones de App and API Protection en la integración Envoy, según la versión de rastreador especificada:

| Función de App and API Protection        | Versión mínima de imagen Envoy  |
|----------------------------------------|------------------------------|
| Detección de amenazas                       | 1.71.0                       |
| Protección frente a amenazas                      | 1.71.0                       |
| Personalizar la respuesta a las solicitudes bloqueadas | 1.71.0                       |
| Análisis de la composición del software (SCA)    | No aplicable               |
| Seguridad del código                          | No aplicable               |
| Rastreo automático de los eventos de actividad de los usuarios | No compatible                |
| Seguridad de la API                           | No compatible                |

Consulta las [limitaciones][1] de la integración Envoy versión 1.71.0.

## Soporte de Envoy

La integración Envoy está en vista previa.

Solo se admiten la versión Linux y las arquitecturas arm64 y arm64.

<div class="alert alert-info">Si quieres que agreguemos la compatibilidad para alguna función que aún no es compatible, háznoslo saber. Rellena <a
href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviarnos tu información</a>.</div>

[1]: /es/security/application_security/setup/threat_detection/envoy