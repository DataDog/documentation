---
description: 'Extrae valores de tus logs en el momento de consulta utilizando patrones
  Grok en el Log Explorer '
further_reading:
- link: /logs/explorer/calculated_fields/
  tag: Documentación
  text: Más información sobre campos calculados
title: Extracciones
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLSffBg9ph2zl-jTGzvgBUcXSifOjvPdRh8vJjzTMIclSB2ZLIw/viewform" btn_hidden="false" header="Las extracciones de campos calculados están en vista previa">}}
Utiliza extracciones de campos calculados para extraer valores de tus logs en el Log Explorer en el momento de consulta utilizando patrones Grok.
{{< /callout >}}

## Información general

Las extracciones de campos calculados te permiten aplicar reglas de análisis Grok en el momento de consulta en el Log Explorer para extraer valores de mensajes o atributos de logs sin procesar, sin necesidad de modificar pipelines o volver a ingerir los datos. Puedes generar reglas de extracción automáticamente con el análisis basado en IA o definir manualmente tus propios patrones Grok para satisfacer necesidades específicas.

Para crear un campo calculado de extracción, consulta [Crear un campo calculado][1].

## Análisis automático

Utiliza el análisis automático basado en IA para generar reglas Grok a partir de tus datos de logs. Datadog analiza el contenido de tu mensaje de log y genera automáticamente una regla de extracción, eliminando la necesidad de escribir manualmente patrones Grok.

{{< img src="/logs/explorer/calculated_fields/extractions/calculated_fields_parse_ai.png" alt="Ejemplo de análisis Grok basado en IA en campos calculados de Datadog" style="width:100%;" >}}

Hay dos formas de acceder al análisis automático desde el panel lateral de logs:

1. Haz clic en el botón **AI** (IA) <i class="icon-bits-ai"></i> situado junto al botón de copia.
2. Resalta una parte específica del mensaje de log y haz clic en el botón **AI** (IA) <i class="icon-bits-ai"></i> del menú emergente.

Al pulsar el botón **AI** (IA), Datadog rellena automáticamente el formulario Calculated Field (Campo calculado):

1. **Extract from** (Extraer de): Por defecto es el mensaje de log completo. Puedes cambiar el menú desplegable para analizar atributos individuales en su lugar.
2. **Log sample** (Ejemplo de log): Rellenado automáticamente con tu log seleccionado.
3. **Parsing rule** (Regla de análisis): Generada automáticamente a partir del ejemplo de log.

Revisa y modifica la regla generada según sea necesario. Puedes editarla manualmente o hacer clic en **Generate a new rule** (Generar una nueva regla) para que Datadog vuelva a intentarlo. También puedes modificar, insertar o reemplazar el ejemplo de log para probar tu regla con diferentes formatos de log.

<div class="alert alert-tip">Utiliza los botones "pulgar arriba" o "pulgar abajo" para hacer comentarios en línea y ayudar a mejorar la función.</div>

## Sintaxis

Los campos de extracción utilizan patrones Grok para identificar y capturar valores de un atributo de log. Un patrón Grok se compone de uno o más tokens con el formato:
```
%{PATTERN_NAME:field_name}
```
- `PATTERN_NAME`: Un emparejador Grok.
- `field_name`: El nombre del campo calculado extraído.

Puedes encadenar varios patrones para analizar mensajes de log complejos.

## Emparejadores y filtros compatibles en el momento de consulta

<div class="alert alert-warning">Las funciones de análisis de Grok disponibles en el <em>momento de consulta</em> (en el <a href="/logs/explorer/calculated_fields/">Log Explorer</a>) admite un subconjunto limitado de emparejadores (<strong>datos</strong>, <strong>entero</strong>, <strong>notSpace</strong>, <strong>número</strong> y <strong>palabra</strong>) y de filtros (<strong>número</strong> e <strong>entero</strong>). Para necesidades de análisis a largo plazo, define un pipeline de logs.</div>

El análisis Grok en el momento de consulta en el Log Explorer admite un subconjunto limitado de comparadores y filtros. Cada comparador o filtro se utiliza en un patrón Grok con el formato:

```
%{MATCHER:field_name}
```

### Comparadores

| Comparador | Ejemplo de patrón Grok |
| ------- | -------------------- |
| `data`<br>_Cualquier secuencia de caracteres (no codiciosos)_ | `status=%{data:status}` |
| `word`<br>Caracteres alfanuméricos | `country=%{word:country}` |
| `number`<br>_Números con coma flotante_ | `value=%{number:float_val}` |
| `integer`<br>_Valores enteros_ | `count=%{integer:count}` |
| `notSpace`<br>Caracteres sin espacios en blanco | `path=%{notSpace:request_path}` |

### Filtros
Aplica filtros para convertir los valores extraídos en tipos numéricos. Los filtros utilizan la misma sintaxis de patrones que las coincidencias.

| Filtro | Ejemplo de patrón Grok |
| ------ | -------------------- |
| `number`<br>_Analiza cadenas numéricas como números_ | `latency=%{number:lat}` |
| `integer`<br>_Analiza cadenas numéricas como enteros_ | `users=%{integer:user_count}` |

### Ejemplo
Utiliza esta función para analizar campos de logs por pedido sin modificar tu pipeline de ingesta.
**Línea de log**:

```
country=Brazil duration=123ms path=/index.html status=200 OK
```

**Regla de extracción Grok**:
```
country=%{word:country} duration=%{integer:duration} path=%{notSpace:request_path} status=%{data:status}
```
**Campos calculados resultantes**:
- `#country = Brazil`
- `#duration = 123`
- `#request_path = /index.html`
- `#status = 200 OK`

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/explorer/calculated_fields/#create-a-calculated-field