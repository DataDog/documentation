---
code_lang: nginx
code_lang_weight: 40
title: Requisitos de compatibilidad de Nginx
type: lenguaje de código múltiple
---

## Compatibilidad de funciones de App and API Protection

Las siguientes funciones de App and API Protection son compatibles con la integración Nginx, para la versión de rastreador especificada:

| Función de App and API Protection        | Versión mínima de módulo Nginx |
|----------------------------------------|------------------------------|
| Detección de amenazas                       | 1.2.0                        |
| Protección frente a amenazas                      | 1.3.0                        |
| Personalizar la respuesta a las solicitudes bloqueadas | 1.3.0                        |
| Análisis de la composición del software (SCA)    | No aplicable               |
| Seguridad del código                          | No aplicable               |
| Seguimiento automático de los eventos de actividades de usuarios | No compatible                |
| Seguridad de la API                           | No compatible                |

Consulta las [limitaciones][1] de la versión 1.3.0 de Nginx.

## Compatibilidad con Nginx

La política del módulo Nginx es compatible con las versiones de Nginx hasta un año después
del fin de su vida útil. Solo son compatibles Linux y las arquitecturas arm64 y amd64.

<div class="alert alert-info">Si quieres que agreguemos la compatibilidad para alguna función que aún no es compatible, háznoslo saber. Rellena <a
href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviarnos tu información</a>.</div>

[1]: /es/security/application_security/setup/threat_detection/nginx/