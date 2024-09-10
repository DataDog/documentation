---
further_reading:
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Descubre cómo procesar tus logs
- link: /logs/log_configuration/parsing
  tag: Documentación
  text: Obtén más información sobre el parseo
- link: /logs/live_tail/
  tag: Documentación
  text: Función Live Tail de Datadog
- link: /logs/explorer/
  tag: Documentación
  text: Consulta cómo explorar tus logs
- link: /logs/logging_without_limits/
  tag: Documentación
  text: Logging without limit*
kind: guía
title: Recopilar varios logs con paginación
---

## Información general

Para recuperar una lista de logs más larga que el límite máximo de 1000 logs devueltos por la [API de logs][1], debes utilizar la función Paginación.

{{< tabs >}}

{{% tab "V1 API" %}}

Empieza por crear una consulta para recuperar tus logs en un contexto determinado, por ejemplo, para una consulta determinada en un periodo establecido:

```bash
curl -X POST https://api.datadoghq.com/api/v1/logs-queries/list \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_CLIENT_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_CLIENT_APP_KEY}" \
-d '{
        "limit": 50,
        "query": "*",
        "sort": "desc",
        "time": {
            "from": "2019-08-06T00:00:00Z",
            "to": "2019-08-07T00:00:00Z"
        }
    }'
```

Ejemplo de resultado:

```json
{
  "logs": ["(...)"],
  "nextLogId": "AAAAAAAAAAAAAAAABBBBBBBBBBBBBBCCCCCCCCCCDDDDDDDDDD",
  "status": "done",
  "requestId": "cDdWYB0tAm1TYHFsQVZ2R05QWm9nQXx5cFM4aExkLVFPNlhZS21RTGxTUGZ3"
}
```

El parámetro `logs` es una matriz de objetos de log y como máximo contiene tantos logs como se hayan definido con el parámetro `limit` en tu consulta. Este parámetro es igual a `50` por defecto, pero puede configurarse hasta `1000`. Si la cantidad de logs que coinciden con tu consulta es mayor que `limit`, entonces el parámetro `nextLogId` no es igual a `null`.

**Cuando los parámetros `nextLogId` devuelven algo distinto de `null`, indica que la consulta introducida coincidía con más logs que solo el devuelto**.

Para recuperar la siguiente página de logs, vuelve a enviar la consulta, pero esta vez con el parámetro `startAt` que toma el valor `nextLogId` de la llamada anterior:

```bash
curl -X POST https://api.datadoghq.com/api/v1/logs-queries/list \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_CLIENT_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_CLIENT_APP_KEY}" \
-d '{
        "limit": 1000,
        "query": "*",
        "startAt": "AAAAAAAAAAAAAAAABBBBBBBBBBBBBBCCCCCCCCCCDDDDDDDDDD",
        "sort": "desc",
        "time": {
            "from": "2019-08-06T00:00:00Z",
            "to": "2019-08-07T00:00:00Z"
        }
    }'
```

Que devuelve estos resultados:

```json
{
  "logs": ["(...)"],
  "nextLogId": "EEEEEEEEEEEEEEEEFFFFFFFFFFFFFFGGGGGGGGGGHHHHHHHHHH",
  "status": "done",
  "requestId": "YVhETk5jQy1TQkDFSFjqU3fhQMh5QXx6M2pSUlA1ODhXNk5PT2NOSUVndThR"
}
```

Para ver todas las páginas de tus logs, continúa reenviando tu consulta donde el parámetro `startAt` toma el valor `nextLogId` de la llamada anterior. Cuando `nextLogId` devuelva `null`, habrás devuelto todas las páginas de logs asociadas a tu consulta.

**Notas**: Para un mejor control sobre los resultados de la paginación, utiliza un parámetro absoluto `time`; no utilices la palabra clave `now`.

{{% /tab %}}

{{% tab "V2 API" %}}
Comienza por crear una consulta para recuperar tus logs para un contexto determinado, por ejemplo, para una consulta determinada en un marco temporal establecido:

```bash
curl -X POST https://api.datadoghq.com/api/v2/logs/events/search \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_CLIENT_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_CLIENT_APP_KEY}" \
-d '{
      "filter": 
              {
                "from": "2019-08-06T00:00:00Z",
                "to": "2019-08-07T00:00:00Z",
                "query": "@datacenter:us @role:db"
               },
      "page":  
              {
                  "limit":50   
        }
}'
```
Ejemplo de resultado:

```json
{
  "meta": {
    "page": {
      "after": "eyJhZnRlciI6IkFRQUFBWE4tV0ZVbzZFRGRnZ0FBQUFCQldFNHRWMFpwVG1jelgwRTJURjlaVjBGQlFRIn0"
    }
  },
  "data": [
    {
      "attributes": {"..."},
      "id": "AQAAAXN-WFUo6EDdggAAAABBWE4tV0ZpTmczX0E2TF9ZV0FBQQ",
      "type": "log"
    }
  ],
  "links": {
    "next": "https://api.datadoghq.com/api/v2/logs/events?filter%5Bto%5D=1595552587369&page%5Bcursor%5D=eyJhZnRlciI6IkFRQUFBWE4tV0ZVbzZFRGRnZ0FBQUFCQldFNHRWMFpwVG1jelgwRTJURjlaVjBGQlFRIn0&page%5Blimit%5D=1&filter%5Bfrom%5D=1595552579929"
  }
}
```
El parámetro `data` es una matriz de objetos de logs y como máximo contiene tantos logs como se definan con el parámetro `limit` en tu consulta. Este parámetro es igual a `50` por defecto, pero puede configurarse hasta `1000`.

Para ver la siguiente página de tus logs, continúa reenviando tu consulta, pero incluye el parámetro `cursor` donde toma el valor `after` de la llamada anterior. Cuando veas que `data` devuelve `null`, habrás devuelto todas las páginas de logs asociadas a tu consulta.

```bash
curl -X POST https://api.datadoghq.com/api/v2/logs/events/search \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_CLIENT_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_CLIENT_APP_KEY}" \
-d '{
      "filter": 
              {
                "from": "2019-08-06T00:00:00Z",
                "to": "2019-08-07T00:00:00Z",
                "query": "@datacenter:us @role:db"
               },
      "page":  
              {
                  "cursor": "eyJhZnRlciI6IkFRQUFBWE4tV0ZVbzZFRGRnZ0FBQUFCQldFNHRWMFpwVG1jelgwRTJURjlaVjBGQlFRIn0",
                  "limit": 50   
        }
}'
```
Que devuelve estos resultados:

```json
{
  "meta": {
    "page": {
      "after": "eyJhZnRlciI6IkFRQUFBWE4tV0VsdzZFRGRnUUFBQUFCQldFNHRWMFV5UzJjelgwRTJURjlaY1d0QlFRIn0"
    }
  },
  "data": [
    {
      "attributes": {"..."},
      "id": "AQAAAXN-WElw6EDdgQAAAABBWE4tV0UyS2czX0E2TF9ZcWtBQQ",
      "type": "log"
    }
  ],
  "links": {
    "next": "https://api.datadoghq.com/api/v2/logs/events?filter%5Bto%5D=1595552587369&page%5Bcursor%5D=eyJhZnRlciI6IkFRQUFBWE4tV0VsdzZFRGRnUUFBQUFCQldFNHRWMFV5UzJjelgwRTJURjlaY1d0QlFRIn0&page%5Blimit%5D=10&filter%5Bfrom%5D=1595552579929"
  }
}
```

{{% /tab %}}

{{< /tabs >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

*Logging without Limits es una marca registrada de Datadog, Inc.

[1]: /es/api/v1/logs/#get-a-list-of-logs