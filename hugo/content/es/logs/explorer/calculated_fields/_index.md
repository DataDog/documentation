---
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/ai-powered-log-parsing
  tag: Blog
  text: Acelere las investigaciones con el parseo de registros impulsado por IA
- link: /logs/explorer/calculated_fields/formulas
  tag: Documentación
  text: Fórmulas de campos calculados
- link: /logs/explorer/calculated_fields/extractions
  tag: Documentación
  text: Parseo Grok de extracción
- link: /logs/explorer/
  tag: Documentación
  text: Explorador de registros
- link: https://www.datadoghq.com/blog/calculated-fields-log-management-datadog/
  tag: Blog
  text: Transforme y enriquezca sus registros en el momento de la consulta con campos
    calculados
- link: https://learn.datadoghq.com/courses/enhance-log-querying
  tag: Centro de aprendizaje
  text: Mejore las consultas y el análisis de registros con tablas de referencia,
    subconsultas y campos calculados
title: Campos calculados
---
<div class="alert alert-info">Para conocer la sintaxis, los operadores y las funciones, consulte <a href="/logs/explorer/calculated_fields/formulas">Fórmulas</a></div>

## Descripción general {#overview}

Los campos calculados le permiten transformar y enriquecer sus datos de registro en el **momento de la consulta**. Se comporta como cualquier otro [atributo de registro][1] y puede utilizarse para búsquedas, agregaciones, visualizaciones o incluso para definir campos calculados adicionales.

Existen dos tipos de campos calculados: **Extracciones** y **Fórmulas**. Ambos comparten las siguientes propiedades:

- Son **temporales** y no persisten más allá de su sesión del explorador de registros.
- Son **de ámbito de usuario** y solo usted puede verlos.
- Son ideales para el **análisis retroactivo**, ya que pueden aplicarse a registros ya indexados.
- Deben referenciarse con el prefijo `#` cuando se utilicen en consultas, agregaciones u otros campos calculados.
- Puede definir hasta **cinco** campos calculados a la vez.

## Cuándo usar campos calculados {#when-to-use-calculated-fields}

Use campos calculados en los siguientes escenarios:

- Cuando necesite un campo temporal para una investigación o análisis a corto plazo.
- Cuando necesite analizar retroactivamente registros indexados (los cambios en las canalizaciones solo afectan a los registros ingeridos después de la actualización).
- Cuando no tiene el permiso o la experiencia para modificar las canalizaciones de registros rápidamente.
- Cuando desea que un campo calculado sea visible solo para usted, útil para una exploración rápida y una experimentación de bajo riesgo.

Si descubre que un campo calculado es valioso a largo plazo, actualice sus [canalizaciones de registros][2] para que su equipo se beneficie del procesamiento automatizado.

## Cree un campo calculado {#create-a-calculated-field}

Puede crear un campo calculado desde dos puntos de entrada en el explorador de registros: desde el menú {{< ui >}}Add{{< /ui >}} o desde un evento de registro o atributo específico.

### Desde el menú Agregar {#from-the-add-menu}

1. Navegue al explorador de registros [5].
1. Haga clic en el botón {{< ui >}}Add{{< /ui >}} junto a la barra de búsqueda.
1. Seleccione {{< ui >}}Calculated field{{< /ui >}}.

Esto es útil cuando ya está familiarizado con la estructura y el contenido de los registros y desea definir rápidamente una fórmula o regla de parseo.

### Desde un evento de registro o atributo específico {#from-a-specific-log-event-or-attribute}

1. Navegue al explorador de registros [5].
1. Haga clic en un evento de registro para abrir el panel lateral.
1. Seleccione un atributo JSON para abrir el menú contextual.
1. Elija {{< ui >}}Create calculated from...{{< /ui >}}.

{{< img src="/logs/explorer/calculated_fields/add_calculated_field_side_panel.png" alt="Creación de un campo calculado desde el panel lateral de registros en el Explorador de registros" style="width:70%;" >}}

Este enfoque es útil para extracciones, ya que proporciona una muestra de registro concreta para crear una regla de parseo.

## Tipos de campos calculados {#types-of-calculated-fields}

### Fórmula {#formula}

Los campos de fórmula utilizan fórmulas de campos calculados para calcular nuevos valores a partir de atributos existentes. Usted puede:
- Manipule valores de texto.
- Realice operaciones aritméticas en atributos numéricos.
- Evalúe lógica condicional.

Por ejemplo:

```
#latency_gap = @client_latency - @server_latency
```

Para obtener una lista completa de la sintaxis, los operadores y las funciones admitidos, consulte [Formulas][3].

### Extracción {#extraction}

La extracción captura valores de mensajes de registro sin procesar o atributos mediante un patrón Grok o un patrón regex. Puede usar Tap to Parse para generar cualquiera de ellos automáticamente, o definir manualmente su propio patrón Grok o regex. Utilice la extracción para:
- Capturar valores de mensajes de registro sin procesar.
- Extraiga atributos de forma retroactiva de registros ya indexados sin editar las canalizaciones.
- Pruebe con registros de muestra.

Por ejemplo, puede extraer las tres primeras palabras de un mensaje en campos separados:

```
%{word:first} %{word:second} %{word:third}
```

Las reglas de extracción se evalúan globalmente en todos los registros de su sesión. Para obtener más detalles y ejemplos de sintaxis, consulte [Extractions][4].

## Uso de campos calculados {#using-calculated-fields}

Después de crear un campo calculado, el Explorador de registros se actualiza al instante para mostrarle los nuevos datos y ofrecerle herramientas para interactuar con ellos. Los campos calculados funcionan como atributos de registro y se pueden utilizar para búsquedas, agregaciones, visualizaciones o para definir otros campos calculados. Utilice siempre el prefijo `#` al hacer referencia a un campo calculado.

- **Fila de encabezado**: Aparece una nueva fila debajo de la barra de búsqueda, que muestra todos los campos calculados activos. Pase el cursor para visualizar la definición completa o utilice acciones rápidas para editar, filtrar por o agrupar por el campo.
- **Visualización de lista**: En la lista [List][6], se agrega automáticamente una columna para el campo calculado.
- **Panel lateral de registro**: Los campos calculados se agrupan en una sección dedicada cuando inspecciona un registro.

{{< img src="logs/explorer/calculated_fields/calculated_field.png" alt="Un campo calculado llamado request_duration utilizado para filtrar resultados en Log Explorer" style="width:100%;" >}}


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/log_configuration/attributes_naming_convention/
[2]: /es/logs/log_configuration/pipelines/?tab=source
[3]: /es/logs/explorer/calculated_fields/formulas/
[4]: /es/logs/explorer/calculated_fields/extractions
[5]: https://app.datadoghq.com/logs
[6]: /es/logs/explorer/visualize/#lists