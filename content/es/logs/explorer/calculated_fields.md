---
disable_toc: false
private: true
title: Campos calculados
---

## Información general

Utiliza campos calculados cuando desees aplicar una lógica booleana, realizar operaciones aritméticas o manipular cadenas al consultar tus logs.

{{< img src="logs/explorer/calculated_query.png" alt="El modo de creación de un campo calculado con una fórmula que concatena el nombre y apellido y lo convierte en minúscula" style="width:50%;">}}

## Añadir un campo calculado

En el Log Explorer:

1. Navega hasta [Log Explorer][1].
1. Pulsa el botón **Add** (Añadir) que se encuentra junto a la barra de consulta de búsqueda.
1. Selecciona **Calculated field** (Campo calculado).

Muévete directamente desde un atributo JSON específico:

1. Navega hasta [Log Explorer][1].
1. Abre un evento de log en el panel lateral.
1. Haz clic en un atributo específico de log para abrir el menú contextual.
1. Haz clic en **Create calculated field from <attribute>** (Crear campo calculado desde **).

## Funciones y operaciones compatibles

- Operaciones aritméticas entre atributos o literales: (`+`, `-`, `*`, and `/`)
- Comparaciones entre atributos o literales: (`>`, `>`, `=`, `<`, `<=`, `==` y `!=`)
- Las siguientes funciones de manipulación de cadenas:
    - `lower(<attribute>)`
    - `upper(<attribute>)`
    - `proper(<attribute>)`
    - `concat(<attribute>, <attribute> [, <attribute>, ...])`
    - `textjoin(<delimiter>, <attribute>, <attribute> [, <attribute>, ...])`

[1]: https://app.datadoghq.com/logs