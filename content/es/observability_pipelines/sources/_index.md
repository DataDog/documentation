---
disable_toc: false
further_reading:
- link: /observability_pipelines/set_up_pipelines/
  tag: Documentación
  text: Configurar pipelines
- link: /observability_pipelines/processors/
  tag: Documentation
  text: Procesadores para tus pipelines
- link: /observability_pipelines/destinations/
  tag: Documentation
  text: Destinos de los pipelines de observabilidad
title: Fuentes
---

## Información general

Utiliza las fuentes de pipelines de observabilidad para recibir logs de tus diferentes fuentes de logs.

Selecciona y configura tu fuente cuando crees un pipeline en la interfaz de usuario. Este es el paso 3 del proceso de configuración de pipeline:s

1. Ve a [Pipelines de observabilidad][1].
1. Selecciona una plantilla.
1. Selecciona y configura tu fuente.
1. Selecciona y configura tus destinos.
1. Configura tus procesadores.
1. Instalar el worker de pipelines de observabilidad

Las fuentes tienen diferentes requisitos previos y parámetros. Algunas fuentes también deben configurarse para enviar logs al worker de pipelines de observabilidad.

## Campos de metadatos estándar

Todas las fuentes añaden los siguientes campos de metadatos estándar a los eventos ingeridos:

| Nombre del campo     | Tipo de valor     | Ejemplo                      |
| -------------- | -------------- | ---------------------------- |
| `hostname`     | Cadena         | `"ip-34-2-553.us.test"`      |
| `timestamp`    | Cadena         | `"2024-06-17T22:25:55.439Z"` |
| `source_type`  | Cadena         | `"splunk_tcp"`               |

Por ejemplo, si se trata del evento sin procesar:

```
{
  "foo": "bar"
}
```

Entonces, el evento enriquecido con los campos de metadatos estándar es:

```
{
  "foo": "bar",
  "hostname": "ip-34-2-553.us.test",
  "timestamp": "2024-06-17T22:25:55.439Z",
  "source_type": "splunk_tcp"
}
```

Podrás ver estos campos de metadatos estándar cuando utilices el [comando `tap`][2] para ver los eventos enviados a través de la fuente.

Una vez que los eventos son ingeridos por la fuente, se envían a diferentes procesadores y destinos que pueden actualizar esos campos. Por ejemplo, si el evento se envía al destino Logs de Datadog, el campo de fecha y hora se convierte al formato UNIX.

**Nota**: La métrica `bytes in per second` en la interfaz de usuario es para eventos ingeridos sin procesar y no enriquecidos.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /es/observability_pipelines/troubleshooting/#use-tap-to-see-your-data