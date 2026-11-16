---
algolia:
  rank: 65
  tags:
  - mcp
  - mcp server
  - code execution
  - code-exec
description: Ejecute JavaScript creado por el agente contra las API de Datadog en
  una sola llamada de herramienta MCP para investigar problemas que abarcan múltiples
  productos de Datadog.
further_reading:
- link: mcp_server
  tag: Documentación
  text: Datadog MCP Server
- link: mcp_server/setup
  tag: Documentación
  text: Configure el Datadog MCP Server
- link: mcp_server/tools
  tag: Documentación
  text: Herramientas del Datadog MCP Server
title: Ejecución de código con el Datadog MCP Server
---
## Descripción general {#overview}

El conjunto de herramientas `code-exec` en el Datadog MCP Server permite que su agente de IA escriba y ejecute JavaScript contra las API de Datadog en una sola llamada de herramienta MCP, en lugar de una llamada de herramienta por solicitud de API. El código generado por el agente se ejecuta dentro de un sandbox administrado por Datadog. Los únicos datos enviados de vuelta al agente son el valor que devuelve el código. Esto mantiene las respuestas grandes de la API fuera del contexto del modelo.

Utilice la ejecución de código para investigaciones que abarquen múltiples productos de Datadog, o que requieran que el agente combine, filtre o resuma datos de varias llamadas. Un ejemplo es correlacionar registros de errores con la latencia de APM para el mismo servicio y ventana de tiempo.

## ¿Por qué usar la ejecución de código? {#why-use-code-execution}

Sin la ejecución de código, un agente al que se le instruye enriquecer los servicios que generan más errores con datos de latencia de APM necesita una llamada de herramienta separada para cada servicio. También necesita turnos adicionales para combinar los resultados. Cada una de esas llamadas y turnos consume espacio en la ventana de contexto.

Con la ejecución de código, el agente expresa la misma investigación como un solo script:

1. Consulte los registros de los servicios con la mayor cantidad de registros de error en una ventana de tiempo.
1. Para cada servicio devuelto, consulte los tramos para obtener datos de latencia.
1. Combine los dos conjuntos de resultados y devuelva un objeto compacto.

El Datadog MCP Server ejecuta el script y devuelve solo el resultado combinado. El agente completa la investigación en una llamada de herramienta en lugar de una llamada por servicio.

## Herramientas disponibles {#available-tools}

El conjunto de herramientas `code-exec` proporciona:

- **`execute_code`**: Ejecuta JavaScript creado por el agente en el sandbox y devuelve un resultado estructurado. Consulte [`execute_code`][1] en la referencia de MCP Server Tools para obtener permisos y ejemplos de prompts.
- **`search_datadog_sdk`**: Busca las funciones del SDK y los métodos de API disponibles para que el agente escriba scripts. Consulte [`search_datadog_sdk`][2] en la referencia de MCP Server Tools.

El código generado es JavaScript basado en el [Datadog API Client for TypeScript][3] público.

## A qué puede acceder el sandbox {#what-the-sandbox-can-access}

El código ejecutado por el conjunto de herramientas `code-exec` se ejecuta contra las API de Datadog utilizando su identidad de usuario. Un agente solo puede leer datos a los que usted tiene permiso para acceder. Otras limitaciones de acceso incluyen:

- El sandbox está aislado. Los scripts no pueden acceder a su máquina local, sistema de archivos, destinos de red arbitrarios ni credenciales de Datadog sin procesar.
- El sandbox solo expone llamadas a Datadog API de solo lectura. Un agente no puede usar `execute_code` para realizar acciones de escritura, como crear un monitor o actualizar un dashboard.
- Las llamadas a la API realizadas desde un script aplican sus [permisos de rol][4] existentes. Si usted no tiene acceso a un conjunto de datos, el agente tampoco puede consultarlo a través de `execute_code`.
- Las respuestas de la API sin procesar permanecen dentro del sandbox mientras el script las procesa. Los únicos datos enviados de vuelta al agente son el valor que devuelve el código. Revise lo que devuelve un script si los datos subyacentes son confidenciales, como los datos de clientes almacenados en logs.

## Habilitar la ejecución de código {#enable-code-execution}

Para habilitar la ejecución de código, incluya `code-exec` en el parámetro de consulta `toolsets` cuando conecte su cliente de IA al Datadog MCP Server. Consulte [Configurar el Datadog MCP Server][5] para obtener instrucciones de conexión específicas del cliente.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Por ejemplo, según su [sitio de Datadog][6] seleccionado ({{< region-param key="dd_site_name" >}}), esta URL habilita el conjunto de herramientas principal junto con la ejecución de código:

<pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=core,code-exec</code></pre>

`code-exec` se incluye en `toolsets=all`, por lo que no necesita agregarlo por separado si ya habilita todos los conjuntos de herramientas disponibles de forma general.

[6]: /es/getting_started/site/
{{< /site-region >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/mcp_server/tools/#execute_code
[2]: /es/mcp_server/tools/#search_datadog_sdk
[3]: https://github.com/DataDog/datadog-api-client-typescript
[4]: /es/account_management/rbac/permissions/
[5]: /es/mcp_server/setup