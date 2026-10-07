---
further_reading:
- link: logs/explorer/search_syntax
  tag: Documentación
  text: Sintaxis de búsqueda de logs
title: Sintaxis de búsqueda
---

## Información general

La búsqueda de eventos utiliza la [sintaxis de búsqueda de logs][1]. Al igual que la búsqueda de logs, la búsqueda de eventos permite:

- Operadores `-`, `AND` y `OR`
- Comodines
- Caracteres de escape
- Buscar etiquetas y facetas con `key:value`
- Buscar en atributos con el prefijo `@` 

## Consultas de ejemplo

`source:(github OR chef)`
: Muestra eventos de GitHub O Chef.

`host:(i-0ade23e6 AND db.myapp.com)`
: Muestra eventos de `i-0ade23e6` Y `db.myapp.com`.

`service:kafka`
: Muestra eventos del servicio `kafka`.

`status:error`
: Muestra eventos con el estado `error` (admite: `error`, `warning`, `info`, `ok`).

`availability-zone:us-east-1a`
: Muestra eventos en la zona de disponibilidad (AZ) de AWS `us-east-1a`.

`container_id:foo*`
: Muestra eventos de todos los contenedores con un ID que empiece por `foo`.

`@evt.name:foo`
: Muestra eventos con el atributo `evt.name` igual a `foo`.

Consulta la sección de [Sintaxis de búsqueda de logs][1] para obtener más detalles.

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/explorer/search_syntax/