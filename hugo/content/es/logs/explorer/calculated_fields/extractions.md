---
description: Extraiga valores de sus registros al momento de la consulta usando patrones
  Grok en Log Explorer.
further_reading:
- link: /logs/explorer/calculated_fields/
  tag: Documentación
  text: Obtenga más información sobre Calculated Fields
title: Extractions
---
{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLSffBg9ph2zl-jTGzvgBUcXSifOjvPdRh8vJjzTMIclSB2ZLIw/viewform" btn_hidden="false" header="Calculated Fields Extractions está en Preview">}}
Utilice Calculated Fields Extractions para extraer valores de sus registros en Log Explorer al momento de la consulta usando patrones Grok.
{{< /callout >}}

## Resumen {#overview}

Calculated Fields Extractions le permite aplicar reglas de parseo Grok al momento de la consulta en Log Explorer, lo que le permite extraer valores de mensajes de registro sin procesar o atributos sin modificar las canalizaciones ni volver a ingerir datos. Puede generar reglas de extracción automáticamente con parseo potenciado por IA, o definir manualmente sus propios patrones Grok para satisfacer sus necesidades específicas.

Para crear un Calculated Field Extraction, consulte [Create a calculated field][1].

## Parseo automático {#automatic-parsing}

Utilice el parseo automático potenciado por IA para generar reglas Grok a partir de sus datos de registro. Datadog analiza el contenido de su mensaje de registro y genera automáticamente una regla de extracción, eliminando la necesidad de escribir patrones Grok manualmente.

{{< img src="/logs/explorer/calculated_fields/extractions/calculated_fields_parse_ai.png" alt="Ejemplo de parseo Grok potenciado por IA en Datadog Calculated Fields" style="width:100%;" >}}

Existen dos formas de acceder al parseo automático desde el panel lateral de registros:

1. Haga clic en el botón {{< ui >}}AI{{< /ui >}} <i class="icon-bits-ai"></i> junto al botón de copiar.
2. Resalte una parte específica del mensaje de registro y haga clic en el botón {{< ui >}}AI{{< /ui >}} <i class="icon-bits-ai"></i> en el menú emergente.

Cuando hace clic en el botón {{< ui >}}AI{{< /ui >}}, Datadog completa automáticamente el formulario Calculated Field:

1. {{< ui >}}Extract from{{< /ui >}}: De forma predeterminada, el mensaje de registro completo. Puede cambiar el menú desplegable para analizar atributos individuales en su lugar.
2. {{< ui >}}Log sample{{< /ui >}}: Se completa automáticamente con el registro seleccionado.
3. {{< ui >}}Parsing rule{{< /ui >}}: Se genera automáticamente a partir de la muestra de registro.

Revise y modifique la regla generada según sea necesario. Puede editarla manualmente o hacer clic en {{< ui >}}Generate a new rule{{< /ui >}} para que Datadog lo intente de nuevo. También puede modificar, insertar o reemplazar el registro de muestra para probar su regla con diferentes formatos de registro.

<div class="alert alert-tip">Utilice los botones de pulgar hacia arriba o hacia abajo para proporcionar comentarios integrados y ayudar a mejorar la función.</div>

## Sintaxis {#syntax}

Los campos de extracción utilizan patrones Grok para identificar y capturar valores de un atributo de registro. Un patrón Grok se compone de uno o más tokens en la forma:

```
%{PATTERN_NAME:field_name}
```
- `PATTERN_NAME`: Una coincidencia Grok.
- `field_name`: El nombre del Calculated Field extraído.

Puede encadenar varios patrones para el parseo de mensajes de registro complejos.

## Coincidencias y filtros admitidos en tiempo de consulta {#supported-matchers-and-filters-at-query-time}

<div class="alert alert-warning">Las funciones de parseo Grok disponibles en <em>tiempo de consulta</em> (en el <a href="/logs/explorer/calculated_fields/">Log Explorer</a>) admiten un subconjunto limitado de coincidencias (<strong>datos</strong>, <strong>entero</strong>, <strong>sinEspacio</strong>, <strong>número</strong> y <strong>palabra</strong>) y filtros (<strong>número</strong> y <strong>entero</strong>). Para necesidades de parseo a largo plazo, defina una canalización de registros.</div>

El parseo Grok en tiempo de consulta en el Log Explorer admite un subconjunto limitado de coincidencias y filtros. Cada coincidencia o filtro se utiliza en un patrón Grok con el formato:

```
%{MATCHER:field_name}
```

### Coincidencias {#matchers}

| Coincidencia | Ejemplo de patrón Grok |
| ------- | -------------------- |
| `data`<br>_Cualquier secuencia de caracteres (no codiciosa)_ | `status=%{data:status}` |
| `word`<br>_Caracteres alfanuméricos_ | `country=%{word:country}` |
| `number`<br>_Números de punto flotante_ | `value=%{number:float_val}` |
| `integer`<br>_Valores enteros_ | `count=%{integer:count}` |
| `notSpace`<br>_Caracteres que no son espacios en blanco_ | `path=%{notSpace:request_path}` |

### Filtros {#filters}
Aplique filtros para convertir los valores extraídos en tipos numéricos. Los filtros utilizan la misma sintaxis de patrón que las coincidencias.

| Filtro | Ejemplo de patrón Grok |
| ------ | -------------------- |
| `number`<br>_Analiza cadenas numéricas como números_ | `latency=%{number:lat}` |
| `integer`<br>_Analiza cadenas numéricas como enteros_ | `users=%{integer:user_count}` |

### Ejemplo {#example}
Utilice esta función para analizar campos de registro bajo demanda sin modificar su canalización de ingesta.
**Línea de registro**:

```
country=Brazil duration=123ms path=/index.html status=200 OK
```

**Regla grok de extracción**:

```
country=%{word:country} duration=%{integer:duration} path=%{notSpace:request_path} status=%{data:status}
```
**Resulting Calculated Fields**:
- `#country = Brazil`
- `#duration = 123`
- `#request_path = /index.html`
- `#status = 200 OK`

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/explorer/calculated_fields/#create-a-calculated-field