---
aliases:
- /es/api/latest/tracing/
- /es/api/v1/tracing/
- /es/api/v2/tracing/
further_reading:
- link: /tracing/
  tag: Documentación
  text: Más información sobre el rastreo de Datadog APM
- link: /tracing/glossary/
  tag: Documentación
  text: Terminología y descripción general de APM
title: Enviar trazas (traces) al Agent por API
---

Datadog APM te permite recopilar métricas de rendimiento al rastrear tu código para determinar qué partes de tu aplicación son lentas o ineficaces.

Los datos de rastreo se envían desde tu código instrumentado al Datadog Agent a través de una API HTTP. Las bibliotecas de rastreo de Datadog simplifica el envío de métricas al Datadog Agent. Sin embargo, es posible que desees interactuar directamente con la API para instrumentar aplicaciones que no pueden utilizar las bibliotecas o están escritas en lenguajes que aún no disponen de una biblioteca de rastreo de Datadog oficial.

La API de rastreo es una API del Agent en lugar de una API lateral de servicio. Envía tus trazas al endpoint local `http://localhost:8126/v0.3/traces` para que tu Agent pueda reenviarlos a Datadog.

## Ruta

{{< code-block lang="bash" >}}
PUT http://localhost:8126/v0.3/traces
{{< /code-block >}}

## Solicitud

Se pueden enviar trazas como una matriz de trazas:

```
[ trace1, trace2, trace3 ]
```
Y cada traza es una matriz de tramos (spans):

```
trace1 = [ span, span2, span3 ]
```
y cada tramo es un diccionario con `trace_id`, `span_id`, `resource` y así sucesivamente. Cada tramo dentro de una traza debe utilizar el mismo `trace_id`. Sin embargo, `trace_id` y span_id deben tener valores diferentes.

### Modelo

<div class="alert alert-info">Las bibliotecas de rastreo de Datadog admiten IDs de traza de 64 y 128 bits. Consulta <a href="/tracing/guide/span_and_trace_id_format/">Formatos de ID de tramo y traza para obtener más información.</a></div>

| Campo      | Tipo    | Descripción                           |
|------------|---------|---------------------------------------|
| `duration`   | int64   | La duración de la solicitud en nanosegundos. |
| `error`      | int32   | Establece este valor en 1 para indicar si se ha producido un error. Si se produce un error, debes añadir información adicional, como el mensaje de error, el tipo y la información de stack en la propiedad meta. |
| `meta`       | objecto  | Conjunto de metadatos clave-valor. Las claves y los valores deben ser cadenas. |
| - `<any-key>` | cadena | Propiedades adicionales para metadatos clave-valor. |
| métricas    | objeto  | Un conjunto de metadatos clave-valor. Las claves deben ser cadenas y los valores deben ser números de coma flotante de 64 bits. |
| - `<any-key>` | doble | Propiedades adicionales para métricas clave-valor. |
| nombre       | cadena  | El nombre de tramo. El nombre de tramo no debe tener más de 100 caracteres. |
| `parent_id`  | int64   | El ID de número entero del tramo principal. |
| `resource`   | cadena  | El recurso que estás rastreando. El nombre del recurso no debe tener más de 5000 caracteres. |
| `service`    | cadena  | El servicio que estás rastreando. El nombre de servicio no debe tener más de 100 caracteres. |
| `span_id`    | int64   | El ID de número entero del tramo (64 bits sin signo). |
| `start`      | int64   | La hora de inicio de la solicitud en nanosegundos desde la epoch UNIX. |
| `trace_id`   | int64 o int128   | El ID de número entero único (64 bits sin signo o 128 bits sin signo) de la traza que contiene este tramo. |
| `type`       | enumerado    | Tipo de solicitud. Valores de enumerado (enum) permitidos: `web`, `db`, `cache`, `custom` |


### Ejemplo

{{< code-block lang="json" >}}
[
  [
    {
      "duration": 12345,
      "error": "integer",
      "meta": {
        "<any-key>": "string"
      },
      "metrics": {
        "<any-key>": "number"
      },
      "name": "span_name",
      "parent_id": "integer",
      "resource": "/home",
      "service": "service_name",
      "span_id": 987654321,
      "start": 0,
      "trace_id": 123456789,
      "type": "web"
    }
  ]
]
{{< /code-block >}}


## Respuesta

200
: OK

### Ejemplo

{{< tabs >}}

{{% tab "Shell" %}}

{{< code-block lang="curl" >}}
# Comando Curl
curl -X PUT "http://localhost:8126/v0.3/traces" \
-H "Content-Type: application/json" \
-d @- << EOF
[
  [
    {
      "duration": 12345,
      "name": "span_name",
      "resource": "/home",
      "service": "service_name",
      "span_id": 987654321,
      "start": 0,
      "trace_id": 123456789
    }
  ]
]
EOF
{{< /code-block >}}

{{% /tab %}}

{{% tab "Powershell" %}}
{{< code-block lang="curl" >}}

# Comando Invoke-RestMethod

$uri = "http://localhost:8126/v0.3/traces"
$headers = @{
    "Content-Type" = "application/json"
}
$body = @"
[
  [
    {
      "duration": 12345,
      "name": "span_name",
      "resource": "/home",
      "service": "service_name",
      "span_id": 987654321,
      "start": 0,
      "trace_id": 123456789
    }
  ]
]
"@

Invoke-RestMethod -Uri $uri -Method Put -Body $body -Headers $headers
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}