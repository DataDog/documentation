---
aliases:
- /es/service_management/events/explorer/searching/
further_reading:
- link: /getting_started/search/
  tag: Documentación
  text: Introducción a la búsqueda en Datadog
- link: logs/explorer/search_syntax
  tag: Documentación
  text: Sintaxis de búsqueda de registros
title: Sintaxis de búsqueda
---
## Descripción general {#overview}

La búsqueda de eventos utiliza la [sintaxis de búsqueda de registros][1]. Al igual que la búsqueda de registros, la búsqueda de eventos permite:

Operadores - `AND`, `OR` y `-`
- Comodines
- Caracteres de escape
- Búsqueda de etiquetas y facetas con `key:value`
- Búsqueda dentro de atributos con el prefijo `@`

## Ejemplos de consultas {#example-queries}

`source:(github OR chef)`
: Mostrar eventos de GitHub O Chef.

`host:(i-0ade23e6 AND db.myapp.com)`
: Mostrar eventos de `i-0ade23e6` Y `db.myapp.com`.

`service:kafka`
: Mostrar eventos del servicio `kafka`.

`status:error`
: Mostrar eventos con un estado `error` (admite: `emergency`, `alert`, `critical`, `error`, `warn`, `notice`, `info`, `debug`, `ok`).

`availability-zone:us-east-1a`
: Mostrar eventos en la `us-east-1a` zona de disponibilidad de AWS (AZ).

`container_id:foo*`
: Mostrar eventos de todos los contenedores con un ID que comience con `foo`.

`@evt.name:foo`
: Mostrar los eventos con el atributo `evt.name` igual a `foo`.

Consulte [Sintaxis de búsqueda de registros][1] para obtener más detalles.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/explorer/search_syntax/