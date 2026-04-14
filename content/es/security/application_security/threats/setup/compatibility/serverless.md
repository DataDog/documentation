---
code_lang: serverless
code_lang_weight: 90
title: Requisitos de compatibilidad serverless
type: lenguaje de código múltiple
---

App and API Protection proporciona funciones serverless para las siguientes plataformas y bibliotecas:

{{< partial name="security-platform/appsec-libraries-serverless.html" >}}</br>

## AWS Lambda
**Nota**: La protección frente a amenazas no es compatible a través de la configuración remota. Utiliza los [flujos][5] para bloquear direcciones IP en tu [WAF][6].

|Tipo               | Detección de amenazas  |  Análisis de la composición del software (SCA)  | Seguridad del código     |
| ---       |   ---                     |           ----                    |           ----                            |
| Java          | {{< X >}}             |                               |                       |
| .NET      | {{< X >}}             |                                   |                       |
| Node      | {{< X >}}             | Vista previa                           |                       |
| Python    | {{< X >}}             | Vista previa                           |                       |
| Ruby      | {{< X >}}             |                               |                       |
| PHP       |                   |                           |                       |
| Go        | {{< X >}}             |                           |                       |

### Tipos de activación compatibles
La detección de amenazas admite solicitudes HTTP como entrada de función únicamente, ya que ese canal tiene la mayor probabilidad de que los atacantes exploten una aplicación serverless. Las solicitudes HTTP suelen proceder de servicios AWS como:
- Equilibrador de carga de aplicaciones (ALB)
- Pasarela API v1 (API Rest)
- Pasarela API v2 (API HTTP)
- URL de la función

<div class="alert alert-info">Si quieres que agreguemos la compatibilidad para alguna función que aún no es compatible, háznoslo saber. Rellena <a href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviarnos tu información</a>.</div>


### Información adicional sobre la compatibilidad específica de lenguajes

Node.js
: Si estás empaquetando con webpack o esbuild, [sigue las instrucciones específicas del empaquetador][4].

Python
: 

Java
: Para instrumentar de forma completa tu aplicación serverless con rastreo distribuido, tus funciones Lambda Java deben utilizar los tiempos de ejecución Java 8 Corretto (`java8.al2`), Java 11 (`java11`) o Java 17 (`java17`), con al menos 1024 MB de memoria.
: Si utilizas las capas Lambda Datadog `dd-trace-java:4` (o anteriores) y `Datadog-Extension:24` (o anteriores), sigue las instrucciones de [Actualización de la instrumentación para funciones Lambda Java][3].

Go
: 

.NET
: 


## Google Cloud Run

<div class="alert alert-info">La compatibilidad de Google Cloud Run con App and API Protection serverless se encuentra en vista previa</a>.</div>

**Nota**: La protección frente a amenazas no es compatible a través de la configuración remota. Utiliza los [flujos][5] para bloquear direcciones IP en tu [WAF][6].

|Tipo               | Detección de amenazas  |  Análisis de composición de software    | Seguridad del código     |
| ---       |   ---                     |           ----                    |           ----                            |
| Java          | Vista previa           | Vista previa                               |                       |
| .NET      | Vista previa           | Vista previa                                   |                       |
| Node      | Vista previa           | Vista previa                           |                       |
| Python    | Vista previa           | Vista previa                           |                       |
| Ruby      | Vista previa           |  Vista previa                              |                       |
| PHP       |             |                         |                       |
| Go        | Vista previa           | Vista previa                           |                       |


## Azure App Service

Sólo son compatibles las *aplicaciones web*. Las funciones Azure no son compatibles.

**Nota**: La protección frente a amenazas no es compatible a través de la configuración remota. Utiliza los [flujos][5] para bloquear direcciones IP en tu [WAF][6].

|Tipo       | Sistema operativo                 |Detección de amenazas  |  Análisis de composición de software     | Seguridad del código    |
|-----------|--------------------|------------------|------------------------------------|------------------------------------------|
| Java      | Windows, Linux     | {{< X >}}        | {{< X >}}                          | Vista previa                                      |
| .NET      | Windows, Linux     | {{< X >}}        | {{< X >}}                          |                                          |
| Node      | Linux              | {{< X >}}        | {{< X >}}                          | Vista previa                                      |
| Python    | Linux              | {{< X >}}        | {{< X >}}                          |                                          |
| Ruby      | Linux              | {{< X >}}        | {{< X >}}                          |                                          |
| PHP       | Linux              |                  | {{< X >}}                          |                                          |


[1]: /es/serverless/distributed_tracing/
[2]: /es/serverless/guide/datadog_forwarder_python
[3]: /es/serverless/guide/upgrade_java_instrumentation
[4]: /es/serverless/guide/serverless_tracing_and_bundlers/
[5]: /es/service_management/workflows/
[6]: /es/security/application_security/threats/inapp_waf_rules/