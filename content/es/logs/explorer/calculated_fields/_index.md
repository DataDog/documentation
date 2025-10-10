---
disable_toc: false
further_reading:
- link: /logs/explorer/calculated_fields/expression_language
  tag: Documentación
  text: Lenguaje de expresión de campos calculados
- link: /logs/explorer/
  tag: Documentación
  text: Log Explorer
- link: https://www.datadoghq.com/blog/calculated-fields-log-management-datadog/
  tag: Blog
  text: Transforma y enriquece tus logs en el tiempo de consulta con Campos calculados
title: Campos calculados
---


<div class="alert alert-info">Para conocer la sintaxis, los operadores y funciones, consulta <a href="/logs/explorer/calculated_fields/expression_language">Lenguaje de expresión</a></div>

## Información general

Utiliza campos calculados para transformar y enriquecer tus datos de log en el momento de la consulta. Define [fórmulas](#formula) para:
- [Manipular texto][1]
- [Realizar aritmética][2]
- [Evaluar la lógica condicional][3]

Una vez definido, un campo calculado puede utilizarse como cualquier [atributo de log][5] para la búsqueda, agregación, visualización e incluso para definir otros campos calculados.

**Notas**:
- Puedes definir hasta cinco campos calculados a la vez.
- Los campos calculados son temporales y no persisten más allá de una sesión determinada del Log Explorer. Si un campo calculado puede ser útil repetidamente, actualiza tus [pipelines de log][6] para codificar la información en tus logs cuando sean ingeridos y procesados.

## Crear un campo calculado

Hay dos puntos de entrada para crear un campo calculado en el Log Explorer: desde el menú **Add* (Añadir) o desde dentro de un evento de log o atributo específico.
### Elegir un punto de partida para tu campo calculado

#### En el menú Add (Añadir)

1. Navega hasta el [Log Explorer][7].
1. Haz clic en el botón **Add** (Añadir) situado junto a la barra de búsqueda.
1. Selecciona **Calculated field** (Campo calculado).

Esta es una forma rápida de crear un campo calculado cuando ya estás familiarizado con la estructura y el contenido de los logs que te interesan.

#### Desde un evento de log o atributo específico

1. Navega hasta el [Log Explorer][7].
1. Haz clic en un evento de log de interés para abrir el panel lateral.
1. Haz clic en un atributo JSON específico para abrir el menú contextual.
1. Selecciona **Create calculated from...** (Crear calculado desde...).


{{< img src="logs/explorer/calculated_fields/create_field.png" alt="El atributo de duración del panel del log con la opción para crear un campo calculado para ello." style="width:80%;" >}}

Este enfoque te permite adaptarte rápidamente durante una investigación o explorar logs desconocidos. Por ejemplo, puede que desees multiplicar o concatenar dos valores y almacenar el resultado en un único campo para simplificar un gráfico o responder a una pregunta concreta.

### Definir un campo calculado

{{< img src="logs/explorer/calculated_fields/define_a_calculated_field.png" alt="Un campo calculado para el rendimiento, con una fórmula que concatena los atributos firstName y lastName" style="width:70%;" >}}

#### Nombre

Establece un nombre descriptivo que indique claramente la finalidad del campo calculado. Por ejemplo, si el objetivo es combinar los nombres y apellidos de los usuarios en un solo campo, puedes llamar al campo calculado `fullName`. 

Para filtrar los logs desde un usuario llamado `Pinkie Smith`, incluye el nombre del campo calculado en tu consulta: `#fullName:"Pinkie Smith"`. **Nota:** Debes utilizar el prefijo `#` para referirse a campos calculados en búsquedas, agregaciones u otras definiciones de campos calculados.

#### Fórmula

La fórmula (o expresión) determina el resultado que debe calcularse y almacenarse como valor del campo calculado para cada evento de log. Los constructos válidos incluyen atributos de log, otros campos calculados y un conjunto de funciones y operadores admitidos. Los campos, funciones y operadores relevantes se sugieren automáticamente al escribir o editar la fórmula.

Consulta [Lenguaje de expresión de campos calculados][4] para conocer los operadores y funciones disponibles.

## Utilizar un campo calculado

Una vez creado correctamente un campo calculado, el Log Explorer se actualiza para:
- Mostrar los campos calculados activos en una nueva fila directamente debajo de la barra de búsqueda.
    - Pasar el ratón por encima de un campo para ver su definición y utilizar acciones rápidas para editar, filtrar o agrupar por el campo.
- Incluir una columna para el campo calculado en la visualización **[Lista][8]**. El título incluye el prefijo #.
- Mostrar los campos calculados en una sección separada dentro del panel lateral del log.

Los campos calculados función como atributos de log y pueden utilizarse para la búsqueda, agregación, visualización y definición de otros campos calculados. Recuerda utilizar el prefijo `#` cuando hagas referencia a nombres de campos calculados.

{{< img src="logs/explorer/calculated_fields/calculated_field.png" alt="Un campo calculado llamado request_duration que se utiliza para filtrar resultados en el Log Explorer" style="width:100%;" >}}

### Casos de uso

Los campos calculados no sustituyen a los pipelines y procesadores de logs para el parseo a la hora de la ingesta, la normalización y el enriquecimiento de logs. Utiliza campos calculados en los siguientes casos:

- Si necesitas realizar una investigación puntual o un análisis ad hoc que requiere un campo que no necesitas reutilizar a largo plazo.
- Si necesitas actualizar retroactivamente logs indexados para responder a una determinada pregunta (los cambios en los pipelines sólo se aplican a logs ingeridos después de una actualización de pipeline).
- Si careces de los permisos (o conocimientos) necesarios para modificar oportunamente los pipelines de log.
  - Los campos calculados que creas sólo son visibles para ti, lo que los hace ideales para una exploración rápida y una experimentación sin preocupaciones.

Si te das cuenta de que un campo calculado puede ser valioso a largo plazo, actualiza tus pipelines de log para que tu y el resto del equipo puedan beneficiarse del proceso automatizado.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/explorer/calculated_fields/expression_language/#string
[2]: /es/logs/explorer/calculated_fields/expression_language/#arithmetic
[3]: /es/logs/explorer/calculated_fields/expression_language/#logical
[4]: /es/logs/explorer/calculated_fields/expression_language/
[5]: /es/logs/log_configuration/attributes_naming_convention/
[6]: /es/logs/log_configuration/pipelines/?tab=source
[7]: https://app.datadoghq.com/logs
[8]: /es/logs/explorer/visualize/#lists