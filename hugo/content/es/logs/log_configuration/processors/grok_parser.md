---
description: Analice sus registros usando el procesador Grok
further_reading:
- link: /logs/log_configuration/pipelines
  tag: Documentación
  text: Descubra Datadog Pipelines
- link: /logs/log_configuration/parsing
  tag: Documentación
  text: Obtenga más información sobre el parseo
- link: https://www.datadoghq.com/blog/detect-http2-abuse-apache-web-server-logs/
  tag: Blog
  text: Cómo detectar abusos de HTTP/2 en los registros del servidor web Apache
processor_type: grok-parser
title: Analizador Grok
---
## Descripción general {#overview}

Cree reglas grok personalizadas para el parseo del mensaje completo o de un atributo específico de su evento sin procesar. Como práctica recomendada, limite su analizador grok a 10 reglas de parseo. Para obtener más información sobre la sintaxis de Grok y las reglas de parseo, consulte [Parseo][1].

{{< img src="/logs/processing/processors/ai-grok-rules.png" alt="Configuración del analizador Grok" style="width:90%;" >}}

## Casos de uso {#use-cases}

El analizador grok se utiliza principalmente para analizar atributos del mensaje de su registro. Por ejemplo, los registros de NGINX tienen un mensaje que contiene múltiples piezas de información que podría querer extraer.

Después de crear una regla grok, el analizador puede escribir la dirección IP, el usuario, la marca de tiempo de la solicitud, el método de solicitud, la URL, la versión, el código de estado y los bytes.


## Configuración {#setup}

Defina el procesador Grok en la [{{< ui >}}Pipelines{{< /ui >}} página][2]. Para configurar las reglas de parseo de Grok:

1. Haga clic en {{< ui >}}Add Grok Parser{{< /ui >}} para abrir una nueva configuración de analizador.
1. {{< ui >}}Log Samples{{< /ui >}}: Las muestras de registros se extraen automáticamente a la sección de Muestras de registros. También puede agregar más muestras de registros (hasta 10 en total, 5000 caracteres cada una).
   **Nota**: Los registros de muestra se extraen de los cinco patrones de registro con mayor volumen que coinciden con el filtro de su pipeline.
1. {{< ui >}}Log Samples{{< /ui >}}: Agregue hasta cinco registros de muestra (hasta 5000 caracteres cada uno) para probar sus reglas de parseo.
1. {{< ui >}}Define parsing rules{{< /ui >}}: Haga clic en {{< ui >}}Auto parsing{{< /ui >}} para generar reglas que coincidan con sus muestras.
   {{< site-region region="gov,gov2" >}}
   <div class="alert alert-info">El parseo automático no está disponible para su <a href="/getting_started/site">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
   {{< /site-region >}}
1. {{< ui >}}Test your rules{{< /ui >}}: Haga clic en una muestra para activar su evaluación frente a la regla de parseo y mostrar el resultado a la derecha de la pantalla. Todas las muestras muestran un estado (`match` o `no match`), que resalta si una de las reglas de parseo del analizador grok coincide con la muestra.


## Estado de los registros antes y después {#before-and-after-state-of-logs}

{{% collapse-content title="Ejemplo: Parseo de registros de acceso de nginx" level="h3" %}}

**Antes (registro sin procesar):**

```text
192.168.1.1 - john [10/Oct/2023:13:55:36 +0000] "GET /api/users HTTP/1.1" 200 1234
```

**Regla de parseo Grok:**

```text
access.common %{ipOrHost:network.client.ip} %{notSpace:http.ident} %{notSpace:http.auth} \[%{httpdate:date}\] "(?>%{word:http.method} |)%{notSpace:http.url}(?: HTTP/%{number:http.version}|)" %{number:http.status_code} (?>%{number:network.bytes_written}|-)
```

**Después del procesamiento:**

```json
{
 "network": {
   "client": {
     "ip": "192.168.1.1"
   },
   "bytes_written": 1234
 },
 "http": {
   "ident": "-",
   "auth": "john",
   "method": "GET",
   "url": "/api/users",
   "version": "1.1",
   "status_code": 200
 },
 "date": 1696945536000
}
```

El analizador grok transforma mensajes de registro no estructurados en atributos JSON estructurados que pueden ser consultados, filtrados y analizados en el Log Explorer.

{{% /collapse-content %}}

## API {#api}

Utilice el [punto de conexión de la API de Datadog Log Pipeline][3] con la siguiente carga útil JSON del analizador grok:

```json
{
  "type": "grok-parser",
  "name": "Parsing Log message",
  "is_enabled": true,
  "source": "message",
  "samples": ["sample log 1", "sample log 2"],
  "grok": {"support_rules": "<SUPPORT_RULES>", "match_rules": "<MATCH_RULES>"}
}
```

| Parámetro            | Tipo             | Requerido | Descripción                                             |
|----------------------|------------------|----------|---------------------------------------------------------|
| `type`               | Cadena           | Sí      | Tipo del procesador.                                  |
| `name`               | Cadena           | No       | Nombre del procesador.                                  |
| `is_enabled`         | Booleano          | No       | Si el procesador está habilitado o no. Predeterminado: `false`.  |
| `source`             | Cadena           | Sí      | Nombre del atributo de registro a parsear. Predeterminado: `message`. |
| `samples`            | Matriz de cadenas | No       | Lista de (hasta 5) registros de muestra para este analizador grok.     |
| `grok.support_rules` | Cadena           | Sí      | Lista de reglas de soporte para su analizador grok.             |
| `grok.match_rules`   | Cadena           | Sí      | Lista de reglas de coincidencia para su analizador grok.               |



## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/log_configuration/parsing/?tab=matchers
[2]: https://app.datadoghq.com/logs/pipelines
[3]: /es/api/v1/logs-pipelines/