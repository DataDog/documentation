---
aliases:
- /es/service_management/app_builder/components
description: Referencia integral para los componentes de la interfaz de usuario de
  App Builder, incluidos botones, formularios, tablas, gráficos y elementos interactivos.
disable_toc: true
further_reading:
- link: /actions/app_builder/components/tables/
  tag: Documentación
  text: Tablas
- link: /actions/app_builder/build/
  tag: Documentación
  text: Crear aplicaciones
- link: /actions/app_builder/expressions/
  tag: Documentación
  text: Expresiones de JavaScript
- link: https://learn.datadoghq.com/courses/app-builder-integration
  tag: Centro de aprendizaje
  text: Cree aplicaciones de autoservicio con App Builder para Third-Party Integrations
title: Componentes
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App Builder está en versión preliminar en el sitio de Datadog Government US1-FED.
</div>
{{< /site-region >}}

## Descripción general {#overview}
Esta página proporciona una lista de componentes de interfaz de usuario que puede utilizar al crear aplicaciones en App Builder.

Muchas propiedades de los componentes le permiten seleccionar entre los valores proporcionados. Si desea utilizar una expresión para el valor de una propiedad, haga clic en {{< ui >}}&lt;/&gt;{{< /ui >}} junto a la propiedad para usar el editor de código. 

Cualquier componente que pueda activar un evento tiene una lista de reacciones disponibles en [eventos y reacciones][13]. Estos componentes también pueden usar [reacciones personalizadas][14].

Para obtener más información sobre el uso de JavaScript en App Builder, consulte [JavaScript Expressions][7]. Para obtener más información sobre cómo guardar sus componentes como plantilla, consulte [Reusable Modules][12].
<br>

## Componentes disponibles {#available-components}

{{% collapse-content title="Botón" level="h3" %}}
Los componentes de botón tienen las siguientes propiedades.

#### General {#general}

Etiqueta
: El texto que se muestra en el botón.<br>
**Valor**: cadena o expresión

#### Apariencia {#appearance}

Intención
: Controla el color del botón, con colores que representan el propósito del mismo.<br>
**Valores proporcionados**: predeterminado, peligro, éxito, advertencia

Es principal
: Diseñado para llamar la atención del usuario sobre la(s) acción(es) más importante(s) para una página o flujo de trabajo determinado.<br>
**Valores proporcionados**: encendido, apagado

Es sin borde
: Elimina el borde de cualquier botón. Al pasar el cursor, obtiene un relleno de fondo.<br>
**Valores proporcionados**: encendido, apagado

Está cargando
: Muestra un indicador de carga.<br>
**Valores proporcionados**: encendido, apagado

Está deshabilitado
: Aplica el estilo de deshabilitado y elimina las interacciones.<br>
**Valores proporcionados**: encendido, apagado

Es visible
: Determina si el componente es visible para el usuario final. En modo de edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: encendido, apagado

#### Eventos {#events}

Evento
: **Valor**: clic

Reacción
: **Valores**: los ejemplos incluyen abrir modal, activar acción y establecer estado del componente<br>
Consulte [Eventos][1] para obtener la lista completa de reacciones disponibles.

#### Inspeccionar datos {#inspect-data}

Muestra pares de propiedad y valor en formato JSON.

#### Ejemplo {#example}

Para visualizar este componente en contexto, consulte el plano de la aplicación [Metrics Explorer & Monitors Builder][2].
{{% /collapse-content %}}


{{% collapse-content title="Valor de llamada" level="h3" %}}
Los componentes de valor de llamada tienen las siguientes propiedades.

#### General {#general-1}

Etiqueta
: El texto que se muestra en la parte superior del componente.<br>
**Valor**: cadena o expresión

Valor
: El valor que resalta la llamada.<br>
**Valor**: cadena o expresión

Unidad
: La unidad asociada con el valor.<br>
**Valor**: cadena o expresión

#### Estilo {#style}

Estilo
: El estilo visual del componente.<br>
**Valores proporcionados**: predeterminado, éxito, advertencia, peligro, azul, púrpura, rosa, anaranjado, amarillo, rojo, verde, gris, azul vívido, púrpura vívido, rosa vívido, anaranjado vívido, amarillo vívido, rojo vívido, verde vívido

Tamaño
: Ajusta la métrica de forma responsiva para que sea proporcional al tamaño del valor.<br>
**Valores proporcionados**: sm, md, lg, xl

#### Apariencia {#appearance-1}

Está cargando
: Muestra un indicador de carga.<br>
**Valores proporcionados**: encendido, apagado

Está deshabilitado
: Aplica el estilo de deshabilitado y elimina las interacciones.<br>
**Valores proporcionados**: encendido, apagado

Es visible
: Determina si el componente es visible para el usuario final. En modo de edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: encendido, apagado

#### Inspeccionar datos {#inspect-data-1}

Muestra pares de propiedad y valor en formato JSON.

#### Ejemplo {#example-1}

Para visualizar este componente en contexto, consulte el plano de la aplicación [EC2 Instance Manager][3].
{{% /collapse-content %}}



{{% collapse-content title="Casilla de verificación" level="h3" %}}
Los componentes de casilla de verificación tienen las siguientes propiedades.

#### General {#general-2}

Etiqueta
: El texto que se muestra en la parte superior del componente.<br>
**Valor**: cadena o expresión

Opciones
: La lista de casillas de verificación que un usuario puede seleccionar. El formato es una matriz de objetos donde cada objeto consiste en un par clave-valor de `label` y `value`. El número mínimo de opciones es 1.<br>
**Valor**: expresión<br>
**Ejemplo**:<br>
:     ```json
      ${[
        {
            "label": "Staging",
            "value": "staging"
        },
        {
            "label": "Production",
            "value": "production"
        }
      ]}
      ```

#### Apariencia {#appearance-2}

Es multilínea
: Determina si el texto de la casilla de verificación debe ajustarse a una nueva línea o truncarse con puntos suspensivos.<br>
**Valores proporcionados**: encendido, apagado

Está deshabilitado
: Aplica el estilo de deshabilitado y elimina las interacciones.<br>
**Valores proporcionados**: encendido, apagado

Es visible
: Determina si el componente es visible para el usuario final. En modo de edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: encendido, apagado

#### Eventos {#events-1}

Evento
: **Valor**: cambiar<br>

Reacción
: **Valores**: los ejemplos incluyen abrir modal, activar acción y establecer estado del componente<br>
Consulte [Eventos][1] para obtener la lista completa de reacciones disponibles.

#### Inspeccionar datos {#inspect-data-2}

Muestra pares de propiedad y valor en formato JSON.

#### Ejemplo {#example-2}

Para visualizar este componente en contexto, consulte el plano de la aplicación [Metrics Explorer & Monitors Builder][2].
{{% /collapse-content %}}



{{% collapse-content title="Contenedor" level="h3" %}}
Los componentes de contenedor tienen las siguientes propiedades.

#### Apariencia {#appearance-3}

Es visible
: Determina si el componente es visible para el usuario final. En modo de edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: encendido, apagado

#### Inspeccionar datos {#inspect-data-3}

Muestra pares de propiedad y valor en formato JSON.

#### Ejemplo {#example-3}

Para visualizar este componente en contexto, consulte el plano de la aplicación [Metrics Explorer & Monitors Builder][2].
{{% /collapse-content %}}



{{% collapse-content title="Gráfico personalizado" level="h3" %}}
Los componentes de gráfico personalizado tienen las siguientes propiedades.

#### General {#general-3}

Especificación de Vega
: Una cadena que representa una especificación JSON válida de Vega-Lite o Vega.

#### Apariencia {#appearance-4}

Está cargando
: Muestra un indicador de carga.<br>
**Valores proporcionados**: encendido, apagado

Es visible
: Determina si el componente es visible para el usuario final. En modo de edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: encendido, apagado

#### Inspeccionar datos {#inspect-data-4}

Muestra pares de propiedad y valor en formato JSON.

#### Ejemplo {#example-4}

Para ver un ejemplo de cómo usar este componente, consulte [Gráficos personalizados][10].

{{% /collapse-content %}}


{{% collapse-content title="Selector de fecha" level="h3" %}}
Los componentes de selector de fecha tienen las siguientes propiedades.

#### General {#general-4}

Etiqueta
: La etiqueta que se muestra en la parte superior del selector de fecha.<br>
**Valor**: cadena o expresión

Información sobre herramientas
: La información sobre herramientas que se mostrará al pasar el cursor sobre la etiqueta de entrada. La información sobre herramientas puede contener un marcador.<br>
**Valor**: cadena o expresión

Valor predeterminado
: La fecha predeterminada del selector de fecha, que se muestra como una marca de tiempo UNIX en milisegundos.<br>
**Valor**: entero

Permitir fechas futuras
: Determina si la fecha puede establecerse después de la fecha del día actual.<br>
**Valores proporcionados**: encendido, apagado

#### Apariencia {#appearance-5}

Es visible
: Determina si el componente es visible para el usuario final. En modo de edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: encendido, apagado

#### Eventos {#events-2}

Evento
: **Valor**: cambiar

Reacción
: **Valores**: los ejemplos incluyen abrir modal, activar acción y establecer estado del componente<br>
Consulte [Eventos][1] para obtener la lista completa de reacciones disponibles.

Función de estado
: setValue<br>
**Ejemplo**: Consulte [Funciones de estado][9].

#### Inspeccionar datos {#inspect-data-5}

Muestra las propiedades y los valores en formato JSON. Los valores se muestran tanto como una marca de tiempo UNIX en milisegundos como en formato ISO (año, mes, día, hora, minutos, segundos y milisegundos).

{{% /collapse-content %}}


{{% collapse-content title="Selector de rango de fechas" level="h3" %}}
Los componentes del selector de rango de fechas tienen las siguientes propiedades.

#### General {#general-5}

Intervalo de tiempo predeterminado
: El intervalo de tiempo predeterminado que muestra el selector de fechas.<br>
**Valores proporcionados**: últimos 5 minutos, últimos 30 minutos, última 1 hora, últimas 4 horas, último 1 día

#### Apariencia {#appearance-6}

Es visible
: Determina si el componente es visible para el usuario final. En modo de edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: encendido, apagado

#### Eventos {#events-3}

Evento
: **Valor**: cambiar

Reacción
: **Valores**: los ejemplos incluyen abrir modal, activar acción y establecer estado del componente<br>
Consulte [Eventos][1] para obtener la lista completa de reacciones disponibles.

#### Inspeccionar datos {#inspect-data-6}

Muestra pares de propiedad y valor en formato JSON.

#### Ejemplo {#example-5}

Para visualizar este componente en contexto, consulte el plano de la aplicación [Metrics Explorer & Monitors Builder][2].
{{% /collapse-content %}}


{{% collapse-content title="Divisor" level="h3" %}}
Los componentes divisores tienen las siguientes propiedades.

#### Apariencia {#appearance-7}

Es visible
: Determina si el componente es visible para el usuario final. En modo de edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: encendido, apagado

#### Inspeccionar datos {#inspect-data-7}

Muestra las propiedades en formato JSON.

{{% /collapse-content %}}


{{% collapse-content title="Entrada de archivo" level="h3" %}}
Los componentes de entrada de archivo tienen las siguientes propiedades.

#### General {#general-6}

Tipos de archivo aceptados
: Determina qué tipos de archivo acepta el componente de entrada de archivo.<br>
**Valores**: .csv, .json

#### Apariencia {#appearance-8}

Es visible
: Determina si el componente es visible para el usuario final. En modo de edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: encendido, apagado

#### Eventos {#events-4}

Evento
: **Valor**: cambiar

Reacción
: **Valores**: los ejemplos incluyen abrir modal, activar acción y establecer estado del componente<br>
Consulte [Eventos][1] para obtener la lista completa de reacciones disponibles.

#### Inspeccionar datos {#inspect-data-8}

Muestra pares de propiedad y valor en formato JSON.

{{% /collapse-content %}}


{{% collapse-content title="Imagen" level="h3" %}}
Los componentes de imagen tienen las siguientes propiedades.

#### General {#general-7}

Fuente
: La imagen que se mostrará. Los formatos admitidos son JPG, PNG y GIF. El tamaño máximo de carga es de 4 MB.<br>
**Valores**: URL o archivo

#### Apariencia {#appearance-9}

Ajustar
: Determina las dimensiones de la imagen dentro de los límites del componente de imagen.<br>
**Valores proporcionados**: llenar, contener, cubrir, ninguno

Relleno
: Determina el ancho del espacio entre los límites de la imagen y los límites del componente de imagen.<br>
**Valores proporcionados**: ninguno, pequeño, mediano, grande

Alineación vertical
: Determina la posición vertical de la imagen dentro de los límites del componente de imagen.<br>
**Valores proporcionados**: alinear arriba, alinear al centro, alinear abajo

Alineación horizontal 
: Determina la posición horizontal de la imagen dentro de los límites del componente de imagen.<br>
**Valores proporcionados**: alinear a la izquierda, alinear al centro, alinear a la derecha

Borde
: Determina si el componente de imagen tiene un borde visual alrededor de sus bordes.<br>
**Valores proporcionados**: encendido, apagado

Fondo transparente
: Determina si el fondo dentro del componente de imagen es transparente.<br>
**Valores proporcionados**: encendido, apagado

Está cargando
: Determina si se muestra un icono de carga mientras se carga la imagen.<br>
**Valores proporcionados**: encendido, apagado

Es visible
: Determina si el componente es visible para el usuario final. En modo de edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: encendido, apagado

#### Inspeccionar datos {#inspect-data-9}

Muestra las propiedades en formato JSON.

{{% /collapse-content %}}


{{% collapse-content title="Logotipo de integración" level="h3" %}}
Los componentes de logotipo de integración tienen las siguientes propiedades.

#### General {#general-8}

Id. de integración
: Especifica qué icono de logotipo de integración mostrar.<br>
**Valor**: cadena o expresión<br>
**Ejemplos**: datadog, amazon-s3, postgres, okta

#### Apariencia {#appearance-10}

Alineación horizontal
: Controla la posición horizontal del logotipo dentro del componente.<br>
**Valores proporcionados**: alinear a la izquierda, alinear a la centro, alinear a la derecha

Alineación vertical
: Controla la posición vertical del logotipo dentro del componente.<br>
**Valores proporcionados**: alinear arriba, alinear al centro, alinear abajo

Es visible
: Determina si el componente es visible para el usuario final. En modo de edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: encendido, apagado

Está cargando
: Muestra un indicador de carga.<br>
**Valores proporcionados**: encendido, apagado

#### Inspeccionar datos {#inspect-data-10}

Muestra pares de propiedad y valor en formato JSON.

{{% /collapse-content %}}


{{% collapse-content title="Formulario" level="h3" %}}
Los componentes de formulario tienen las siguientes propiedades.

#### General {#general-9}

Título
: El título del formulario.<br>
**Valor**: cadena o expresión

Valor predeterminado
: El valor predeterminado que la aplicación completa en el formulario. Para completar un campo específico, puede usar notación JSON, como `{"org":"frontend"}` para completar el campo `org` con el valor `frontend`.<br>
**Valor**: cadena o expresión

#### Campos {#fields}

Cada elemento representa un campo en el formulario. Los campos tienen cada uno de los siguientes tipos: `textInput`, `select`, `textArea` o `text`.

Los campos tienen algunas o todas las siguientes propiedades dependiendo de su tipo de campo:

Nombre del campo
: El identificador único para un campo. Puede usar este identificador para hacer referencia al campo en una expresión.<br>
**Valor**: cadena o expresión

Etiqueta
: La etiqueta que se muestra encima del campo.<br>
**Valor**: cadena o expresión

Contenido
: El contenido que se muestra en un campo `text`.<br>
**Valor**: cadena o expresión

Opciones
: Las opciones disponibles en un campo `select`. Las opciones deben ser una matriz de objetos, con una clave `const` para el valor de la opción y una clave `title` opcional para la etiqueta de la opción.<br>**Valor**: El `label` y `value` de cada objeto pueden ser una cadena o expresión.<br>
Puede completar cada objeto usando la GUI (predeterminado), o activar {{< ui >}}Raw{{< /ui >}} para usar entrada JSON sin procesar para proporcionar toda la matriz de objetos.

Texto de marcador de posición
: El texto que se muestra en un campo `textInput` o `textArea` cuando no se ingresa ningún valor.<br>
**Valor**: cadena o expresión

Está deshabilitado
: Aplica el estilo de deshabilitado y elimina las interacciones.<br>
**Valores proporcionados**: encendido, apagado

Es visible
: Determina si el campo es visible en el formulario.<br>
**Valores proporcionados**: encendido, apagado

Es obligatorio
: Determina si el campo es obligatorio para enviar el formulario.<br>
**Valores proporcionados**: encendido, apagado

#### Apariencia {#appearance-11}

Es visible
: Determina si el componente es visible para el usuario final. En modo de edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: encendido, apagado

Está deshabilitado
: Aplica el estilo de deshabilitado y elimina las interacciones.<br>
**Valores proporcionados**: encendido, apagado

#### Eventos {#events-5}

Evento
: **Valor**: enviar, cambiar, validar

Reacción
: **Valores**: los ejemplos incluyen abrir modal, activar acción y establecer estado del componente<br>
Consulte [Eventos][1] para obtener la lista completa de reacciones disponibles.

Función de estado
: setValue<br>
**Ejemplo**: `form0.setValue({name: 'node-group-1'})` establece el valor del componente `form0` en `{name: 'node-group-1'}`.<br>
Consulte [Funciones de estado][9] para obtener más información.

#### Inspeccionar datos {#inspect-data-11}

Muestra pares de propiedad y valor en formato JSON.

{{% /collapse-content %}}


{{% collapse-content title="Entrada JSON" level="h3" %}}
Los componentes de entrada JSON tienen las siguientes propiedades.

#### General {#general-10}

Etiqueta
: El texto que se muestra en la parte superior del componente.

Valor predeterminado
: El valor JSON predeterminado que muestra el componente.

#### Apariencia {#appearance-12}

Es de solo lectura
: Determina si el componente es de solo lectura.<br>
**Valores proporcionados**: encendido, apagado

Es visible
: Determina si el componente es visible para el usuario final. En modo de edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: encendido, apagado

#### Eventos {#events-6}

Evento
: **Valor**: cambiar

Reacción
: **Valores**: los ejemplos incluyen abrir modal, activar acción y establecer estado del componente<br>
Consulte [Eventos][1] para obtener la lista completa de reacciones disponibles.

#### Inspeccionar datos {#inspect-data-12}

Muestra pares de propiedad y valor en formato JSON.
{{% /collapse-content %}}



{{% collapse-content title="Modal" level="h3" %}}
Los componentes modales tienen las siguientes propiedades.

#### General {#general-11}

Título
: El título del modal.<br>
**Valor**: cadena o expresión

#### Apariencia {#appearance-13}

Tamaño
: La escala del modal.<br>
**Valores proporcionados**: sm, md, lg

Es visible
: Determina si el componente es visible para el usuario final. En modo de edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: encendido, apagado

#### Eventos {#events-7}

Evento
: **Valores**: toggleOpen, cerrar, abrir

Reacción
: **Valores**: los ejemplos incluyen abrir modal, activar acción y establecer estado del componente<br>
Consulte [Eventos][1] para obtener la lista completa de reacciones disponibles.

Función de estado
: setIsOpen<br>
**Ejemplo**: `modal0.setIsOpen(true)` establece el estado de `modal0` en abierto.<br>
Consulte [Funciones de estado][9] para obtener más información.

#### Inspeccionar datos {#inspect-data-13}

Muestra pares de propiedad y valor en formato JSON.

#### Ejemplo {#example-6}

Para visualizar este componente en contexto, consulte el plano de la aplicación [Metrics Explorer & Monitors Builder][2].
{{% /collapse-content %}}



{{% collapse-content title="Entrada de número" level="h3" %}}
Los componentes de entrada de número tienen las siguientes propiedades.

Etiqueta
: El texto que se muestra en la parte superior del componente.<br>
**Valor**: cadena o expresión

Valor predeterminado
: El valor predeterminado que la aplicación completa en el cuadro de entrada.<br>
**Valor**: número o expresión que se evalúa como un número

Texto de marcador de posición
: El texto que se muestra cuando no se ingresa ningún valor.<br>
**Valor**: cadena o expresión

#### Validación {#validation}

Mín.
: El valor mínimo que acepta la entrada numérica.<br>
**Valor**: número o expresión que se evalúa como un número

Máx.
: El valor máximo que acepta la entrada numérica.<br>
**Valor**: número o expresión que se evalúa como un número

#### Apariencia {#appearance-14}

Está deshabilitado
: Aplica el estilo de deshabilitado y elimina las interacciones.<br>
**Valores proporcionados**: encendido, apagado

Es visible
: Determina si el componente es visible para el usuario final. En modo de edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: encendido, apagado

#### Eventos {#events-8}

Evento
: **Valor**: cambiar

Reacción
: **Valores**: los ejemplos incluyen abrir modal, activar acción y establecer estado del componente<br>
Consulte [Eventos][1] para obtener la lista completa de reacciones disponibles.

Función de estado
: setValue<br>
**Ejemplo**: `numberInput0.setValue(3)` establece el valor del componente `numberInput0` en `3`.<br>
Consulte [Funciones de estado][9] para obtener más información.

#### Inspeccionar datos {#inspect-data-14}

Muestra pares de propiedad y valor en formato JSON.

#### Ejemplo {#example-7}

Para visualizar este componente en contexto, consulte el plano de la aplicación [ECS Task Manager][4].
{{% /collapse-content %}}




{{% collapse-content title="Radio" level="h3" %}}
Los componentes de radio tienen las siguientes propiedades.

#### General {#general-12}

Etiqueta
: El texto que se muestra en la parte superior del componente.<br>
**Valor**: cadena o expresión

Opciones
: La lista de opciones de botones de radio que un usuario puede seleccionar. El formato es una matriz de objetos donde cada objeto consiste en un par clave-valor de `label` y `value`.<br>
**Valor**: expresión<br>
**Ejemplo**:<br>
:    ```json
     ${[
       {
           "label": "Staging",
           "value": "staging"
       },
       {
           "label": "Production",
           "value": "production"
       }
     ]}
     ```

Valor predeterminado
: El valor que se selecciona cuando se carga el componente de radio.<br>
**Valor**: cadena o expresión

#### Apariencia {#appearance-15}

Está deshabilitado
: Aplica el estilo de deshabilitado y elimina las interacciones.<br>
**Valores proporcionados**: encendido, apagado

Es visible
: Determina si el componente es visible para el usuario final. En modo de edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: encendido, apagado

#### Eventos {#events-9}

Evento
: **Valor**: cambiar

Reacción
: **Valores**: los ejemplos incluyen abrir modal, activar acción y establecer estado del componente<br>
Consulte [Eventos][1] para obtener la lista completa de reacciones disponibles.

Función de estado
: setValue<br>
**Ejemplo**: `radioButtons0.setValue("production")` establece el valor del componente `radioButtons0` en `"production"`.<br>
Consulte [Funciones de estado][9] para obtener más información.

#### Inspeccionar datos {#inspect-data-15}

Muestra pares de propiedad y valor en formato JSON.
{{% /collapse-content %}}



{{% collapse-content title="Renderizador de React" level="h3" %}}
Los componentes del renderizador de React tienen las siguientes propiedades.

#### General {#general-13}

Definición del componente de React
: El código que se ejecuta para crear un componente de React.<br>

Props de entrada del componente
: Las propiedades que se pasan al componente de React y a las que se puede acceder en el objeto propiedades del componente.

Estado inicial del componente
: Establece los valores de estado iniciales para su componente. Este estado se utiliza cuando el componente se renderiza por primera vez o si aún no se ha establecido ningún estado. El componente puede acceder a estos datos a través de <code>props.state</code>.<br>

#### Apariencia {#appearance-16}

Es visible
: Determina si el componente es visible para el usuario final. En modo de edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: encendido, apagado

#### Eventos {#events-10}
Evento
: **Valores**: establecer estado del componente, función de devolución de llamada

Nombre de la función
: **Valor**: <code>props.customFunctionName</code>

Reacción
: **Valores**: los ejemplos incluyen abrir modal, activar acción y establecer estado del componente<br>
Consulte [Eventos][1] para obtener la lista completa de reacciones disponibles.

#### Inspeccionar datos {#inspect-data-16}

Muestra pares de propiedad y valor en formato JSON.

#### Relaciones {#relationships}

Muestra las dependencias de datos entre el renderizador de React y los componentes en la aplicación.

#### Ejemplo {#example-8}

Para ver un ejemplo de cómo usar este componente, consulte [Renderizador de React][11].

{{% /collapse-content %}}



{{% collapse-content title="Buscar" level="h3" %}}
Los componentes de búsqueda tienen las siguientes propiedades.

#### General {#general-14}

Valor predeterminado
: El valor predeterminado que la aplicación completa en el cuadro de búsqueda.<br>
**Valor**: cadena o expresión

Texto de marcador de posición
: El texto que se muestra cuando no se ingresa ningún valor.<br>
**Valor**: cadena o expresión

#### Apariencia {#appearance-17}

Tamaño
: La escala del componente de búsqueda.<br>
**Valores proporcionados**: sm, md, lg

Está cargando
: Muestra un indicador de carga.<br>
**Valores proporcionados**: encendido, apagado

Es visible
: Determina si el componente es visible para el usuario final. En modo de edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: encendido, apagado

#### Eventos {#events-11}

Evento
: **Valores**: cambiar, enviar

Reacción
: **Valores**: los ejemplos incluyen abrir modal, activar acción y establecer estado del componente<br>
Consulte [Eventos][1] para obtener la lista completa de reacciones disponibles.

Función de estado
: setValue<br>
**Ejemplo**: `search0.setValue("search query")` establece el valor del componente `search0` en `"search query"`.<br>
Consulte [Funciones de estado][9] para obtener más información.

Para obtener más información sobre eventos, consulte [Eventos][1].

#### Inspeccionar datos {#inspect-data-17}

Muestra pares de propiedad y valor en formato JSON.

#### Ejemplo {#example-9}

Para visualizar este componente en contexto, consulte el plano de la aplicación [EC2 Instance Manager][3].
{{% /collapse-content %}}

{{% collapse-content title="Select" level="h3" %}}
Los componentes de selección tienen las siguientes propiedades.

#### General {#general-15}

Etiqueta
: El texto que se muestra en la parte superior del componente.<br>
**Valor**: cadena o expresión

Texto de marcador de posición
: El texto que se muestra cuando no se ingresa ningún valor.<br>
**Valor**: cadena o expresión

Opciones
: La lista de opciones de selección entre las que un usuario puede elegir. El formato es una matriz de objetos donde cada objeto consiste en un par clave-valor de `label` y `value`. <br>
**Valor**: expresión<br>
**Ejemplo**:<br>
:     ```json
      ${[
        {
            "label": "Staging",
            "value": "staging"
        },
        {
            "label": "Production",
            "value": "production"
        }
      ]}
      ```

Valor predeterminado
: El valor que se selecciona cuando se carga la selección.<br>
**Valor**: cadena o expresión

Es selección múltiple
: Determina si el usuario puede seleccionar más de una opción a la vez.<br>
**Valores proporcionados**: encendido, apagado

#### Apariencia {#appearance-18}

Está deshabilitado
: Aplica el estilo de deshabilitado y elimina las interacciones.<br>
**Valores proporcionados**: encendido, apagado

Es visible
: Determina si el componente es visible para el usuario final. En modo de edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: encendido, apagado

#### Eventos {#events-12}

Evento
: **Valor**: cambiar

Reacción
: **Valores**: los ejemplos incluyen abrir modal, activar acción y establecer estado del componente<br>
Consulte [Eventos][1] para obtener la lista completa de reacciones disponibles.

Función de estado
: setValue<br>
**Ejemplo**: `select0.setValue("staging")` establece el valor del componente `select0` en `"staging"`.<br>
Consulte [Funciones de estado][9] para obtener más información.

#### Inspeccionar datos {#inspect-data-18}

Muestra pares de propiedad y valor en formato JSON.

#### Ejemplo {#example-10}

Para visualizar este componente en contexto, consulte el plano de la aplicación [Metrics Explorer & Monitors Builder][2].
{{% /collapse-content %}}


{{% collapse-content title="Panel lateral" level="h3" %}}
Los componentes del panel lateral tienen las siguientes propiedades.

#### General {#general-16}

Título
: El título para el panel lateral.<br>
**Valor**: cadena

#### Apariencia {#appearance-19}

Ancho
: Determina el ancho del panel lateral. Se debe incluir un signo de porcentaje (`%`) después del valor.<br>
**Valor**: entero

Ocultar botón de cerrar
: Determina si el panel lateral muestra una X para cerrar el panel.<br>
**Valores proporcionados**: encendido, apagado

#### Eventos {#events-13}

Evento
: **Valores**: alternar abrir, cerrar, abrir

Reacción
: **Valores**: los ejemplos incluyen abrir modal, activar acción y establecer estado del componente<br>
Consulte [Eventos][1] para obtener la lista completa de reacciones disponibles.

Función de estado
: setIsOpen<br>
**Ejemplo**: `sidePanel0.setIsOpen(true)` establece el estado de `sidePanel0` en abierto.<br>
Consulte [Funciones de estado][9] para obtener más información.

#### Inspeccionar datos {#inspect-data-19}

Muestra las propiedades y los valores en formato JSON.

{{% /collapse-content %}}


{{% collapse-content title="Pestaña" level="h3" %}}

Los componentes de pestañas tienen las siguientes propiedades.

#### Pestañas {#tabs}

Una lista de vistas de pestañas. Utilice el ({{< ui >}}+{{< /ui >}}) para agregar vistas adicionales.


#### Estilo {#style-1}

Estilo
: El estilo de color utilizado para el componente de pestañas.<br>
**Valores proporcionados**: predeterminado, púrpura, rosa, anaranjado, rojo, verde

Alineación
: La forma en que las pestañas están alineadas dentro del componente de pestañas.<br>
**Valores proporcionados**: Horizontal (→), vertical (↓)

Impacto
: Controla si el fondo de la pestaña seleccionada está completamente coloreado o si solo una pequeña banda en la parte inferior está coloreada.<br>
**Valores proporcionados**: alto, bajo


#### Apariencia {#appearance-20}

Ocultar pestañas
: Controla si los marcadores de pestaña se muestran.<br>
**Valores proporcionados**: encendido, apagado

Ocultar cuerpo
: Controla si se muestra el cuerpo de las pestañas.<br>
**Valores proporcionados**: encendido, apagado

Es visible
: Determina si el componente es visible para el usuario final. En modo de edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: encendido, apagado

#### Eventos {#events-14}

Evento
: **Valor**: cambiar

Reacción
: **Valores**: los ejemplos incluyen abrir modal, activar acción y establecer estado del componente<br>
Consulte [Eventos][1] para obtener la lista completa de reacciones disponibles.

Función de estado
: setTabIndex<br>
**Ejemplo**: `tab0.setTabIndex(0)` establece el valor del componente `tab0` en la primera pestaña.<br>
Consulte [Funciones de estado][9] para obtener más información.

#### Inspeccionar datos {#inspect-data-20}

Muestra pares de propiedad y valor en formato JSON.

{{% /collapse-content %}}

{{% collapse-content title="Tabla" level="h3" %}}

Los componentes de tabla tienen las siguientes propiedades.

#### General {#general-17}

Título
: Un título para la tabla. Seleccione {{< ui >}}Markdown{{< /ui >}} para formato personalizado.<br>
**Valor**: cadena

Fuente de datos
: La matriz de objetos que se mostrará en una tabla.<br>
**Valores**: consulta, datos de demostración, componentes

#### Columnas {#columns}

Cada columna de datos de la fuente de datos se representa aquí y tiene las siguientes propiedades:

Etiqueta
: El texto que se muestra en la parte superior de la columna.<br>
**Valor**: cadena o expresión

Ruta de datos
: Ruta JSON para acceder a valores anidados dentro de objetos y matrices de una columna determinada.<br>
**Valor**: cadena o expresión

Formato
: El tipo de formato que adopta la columna.<br>
**Valores proporcionados**: cadena, enlace, píldora de estado, fecha / hora, marcadores, etiquetas, barra de porcentaje, número, barra de puntuación, avatar

Ordenable
: Determina si el usuario puede ordenar por la columna.<br>

Copiable
: Determina si el usuario puede hacer clic para copiar el contenido de la columna.<br>
**Valores proporcionados**: encendido, apagado

Filtrable
: Determina si una opción de filtro está disponible para la columna.<br>
**Valores proporcionados**: encendido, apagado

Algunas columnas tienen propiedades adicionales basadas en su propiedad {{< ui >}}Formatting{{< /ui >}}.

#### Paginación {#pagination}

Tiene resumen
: Determina si se muestra un resumen de paginación directamente encima de la tabla.<br>
**Valores proporcionados**: encendido, apagado

Tamaño de página
: Número de filas por página a mostrar.<br>
**Valor**: número o expresión que se evalúa como un número

Conteo total
: Número total de filas a mostrar en la tabla.<br>
**Valor**: número o expresión que se evalúa como un número

Type
: Determina el tipo de paginación.<br>
**Valores proporcionados**: lado del cliente, lado del servidor

#### Ordenamiento {#sorting}

Seleccione la columna y la dirección para el ordenamiento predeterminado de la tabla.
Columna
: La columna por la cual ordenar.<br>
**Valor**: nombre de la columna

Dirección
: La dirección para ordenar.<br>
**Valores proporcionados**: ascendente, descendente

#### Acciones de fila {#row-actions}

Agregar una acción de fila añade una columna {{< ui >}}Actions{{< /ui >}} a la tabla, la cual contiene botones de acción definidos por el usuario. Las filas pueden tener múltiples acciones. Las acciones tienen las siguientes propiedades:

Etiqueta
: El texto que se muestra en el botón de acción.<br>
**Valor**: cadena o expresión

Primario
: Diseñado para llamar la atención del usuario sobre la(s) acción(es) más importante(s) para una página o flujo de trabajo determinado.<br>
**Valores proporcionados**: encendido, apagado

Sin borde
: Elimina el borde de cualquier botón. Al pasar el cursor, obtiene un relleno de fondo.<br>
**Valores proporcionados**: encendido, apagado

Deshabilitado
: Aplica el estilo de deshabilitado y elimina las interacciones.<br>
**Valores proporcionados**: encendido, apagado

Nivel
: Controla el color del botón según su intención.<br>
**Valores proporcionados**: predeterminado, peligro, éxito, advertencia

Reacciones
: Las reacciones que activa el botón. Un botón puede tener múltiples reacciones.<br>
**Valores proporcionados**: descargar archivo, abrir modal, cerrar modal, abrir panel lateral, cerrar panel lateral, abrir URL, establecer estado del componente, establecer valor de variable de estado, notificación emergente, activar acción, personalizado<br>
Algunos tipos de reacción tienen propiedades adicionales.

#### Apariencia {#appearance-21}

Desplazable
: Determina de qué formas se puede desplazar la tabla.<br>
**Valores proporcionados**: ambos, vertical

Está cargando
: Muestra un indicador de carga.<br>
**Valores proporcionados**: encendido, apagado

Tiene ajuste de texto
: Determina si el texto de la celda se ajusta.<br>
**Valores proporcionados**: encendido, apagado

Tiene subfilas
: Habilita subfilas para cada fila. Incluya la propiedad `subRows` en la fuente de datos.<br>
**Valores proporcionados**: encendido, apagado

Es buscable
: Determina si se debe agregar una barra de búsqueda a la tabla. <br>
**Valores proporcionados**: encendido, apagado

Mostrar opciones de ordenamiento
: Agrega un botón {{< ui >}}Sort{{< /ui >}} a la tabla que ofrece opciones de ordenamiento a los usuarios.<br>
**Valores proporcionados**: encendido, apagado

Mostrar opciones de columna
: Agrega un botón {{< ui >}}Columns{{< /ui >}} a la tabla para mostrar, ocultar o reorganizar las columnas de la tabla.<br>
**Valores proporcionados**: encendido, apagado

Tiene filtro de rango de fechas
: Agrega un filtro de rango de fechas a la tabla.<br>
**Valores proporcionados**: encendido, apagado

Es visible
: Determina si el componente es visible para el usuario final. En modo de edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: encendido, apagado

#### Eventos {#events-15}

Evento
: **Valores**: pageChange, tableRowClick

Reacción
: **Valores**: los ejemplos incluyen abrir modal, activar acción y establecer estado del componente<br>
Consulte [Eventos][1] para obtener la lista completa de reacciones disponibles.

Función de estado
: setSelectedRow<br>
**Ejemplos**: <ul><li>`table0.setSelectedRow(0)` establece la propiedad `selectedRow` de `table0` en la primera fila.</li><li>`table0.setSelectedRow(null)` borra la propiedad `selectedRow`.</li></ul>
: setPageIndex<br>
**Ejemplo**: `table0.setPageIndex(0)` establece la propiedad `pageIndex` de `table0` en la primera página.<br>
Consulte [Funciones de estado][9] para obtener más información.

#### Inspeccionar datos {#inspect-data-21}

Muestra pares de propiedad y valor en formato JSON.

#### Ejemplo {#example-11}

Para visualizar este componente en contexto, consulte el plano de la aplicación [Metrics Explorer & Monitors Builder][2].

Para ver ejemplos que muestran cómo utilizar las funciones avanzadas de las tablas, consulte [Tables][6].

{{% /collapse-content %}}



{{% collapse-content title="Texto" level="h3" %}}
Los componentes de texto tienen las siguientes propiedades.

#### General {#general-18}

Contenido
: El contenido que muestra el componente.<br>
**Valor**: cadena o expresión

Tipo de contenido
: Determina cómo renderizar el texto. Cuando se selecciona {{< ui >}}Markdown{{< /ui >}}, el componente de texto admite [sintaxis Markdown básica][8], incluidas las imágenes que alojas en otro lugar.<br>
**Valores proporcionados**: texto sin formato, Markdown

#### Apariencia {#appearance-22}

Alineación del texto
: Determina la alineación horizontal del texto dentro del componente.<br>
**Valores proporcionados**: alinear a la izquierda, alinear al centro, alinear a la derecha

Alineación vertical
: Determina la alineación vertical del texto dentro del componente.<br>
**Valores proporcionados**: alinear arriba, alinear al centro, alinear abajo

Es visible
: Determina si el componente es visible para el usuario final. En modo de edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: encendido, apagado

#### Inspeccionar datos {#inspect-data-22}

Muestra pares de propiedad y valor en formato JSON.

#### Relaciones {#relationships-1}

Muestra las dependencias de datos entre los datos de la tabla y los componentes en la aplicación.

#### Ejemplo {#example-12}

Para visualizar este componente en contexto, consulte el plano de la aplicación [Metrics Explorer & Monitors Builder][2].
{{% /collapse-content %}}


{{% collapse-content title="Área de texto" level="h3" %}}
Los componentes de área de texto tienen las siguientes propiedades.

Etiqueta
: El texto que se muestra en la parte superior del componente.<br>
**Valor**: cadena o expresión

Valor predeterminado
: El valor que se selecciona cuando se carga el área de texto.<br>
**Valor**: cadena o expresión

Texto de marcador de posición
: El texto que se muestra cuando no se ingresa ningún valor.<br>
**Valor**: cadena o expresión

#### Apariencia {#appearance-23}

Está deshabilitado
: Aplica el estilo de deshabilitado y elimina las interacciones.<br>
**Valores proporcionados**: encendido, apagado

Es visible
: Determina si el componente es visible para el usuario final. En modo de edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: encendido, apagado

#### Eventos {#events-16}

Evento
: **Valores**: cambiar, enviar

Reacción
: **Valores**: los ejemplos incluyen abrir modal, activar acción y establecer estado del componente<br>
Consulte [Eventos][1] para obtener la lista completa de reacciones disponibles.

Función de estado
: setValue<br>
**Ejemplo**: `textArea0.setValue("text")` establece el valor del componente `textArea0` en `"text"`.<br>
Consulte [Funciones de estado][9] para obtener más información.

#### Inspeccionar datos {#inspect-data-23}

Muestra pares de propiedad y valor en formato JSON.
{{% /collapse-content %}}


{{% collapse-content title="Entrada de texto" level="h3" %}}
Los componentes de entrada de texto tienen las siguientes propiedades.

Etiqueta
: El texto que se muestra en la parte superior del componente.<br>
**Valor**: cadena o expresión

Valor predeterminado
: El valor que se selecciona cuando se carga la entrada de texto.<br>
**Valor**: cadena o expresión

Texto de marcador de posición
: El texto que se muestra cuando no se ingresa ningún valor.<br>
**Valor**: cadena o expresión

#### Apariencia {#appearance-24}

Está deshabilitado
: Aplica el estilo de deshabilitado y elimina las interacciones.<br>
**Valores proporcionados**: encendido, apagado

Es visible
: Determina si el componente es visible para el usuario final. En modo de edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: encendido, apagado

#### Eventos {#events-17}

Evento
: **Valores**: cambiar, enviar

Reacción
: **Valores**: los ejemplos incluyen abrir modal, activar acción y establecer estado del componente<br>
Consulte [Eventos][1] para obtener la lista completa de reacciones disponibles.

Función de estado
: setValue<br>
**Ejemplo**: `textInput0.setValue("text")` establece el valor del componente `textInput0` en `"text"`.
Consulte [Funciones de estado][9] para obtener más información.

#### Inspeccionar datos {#inspect-data-24}

Muestra pares de propiedad y valor en formato JSON.

#### Ejemplo {#example-13}

Para visualizar este componente en contexto, consulte el plano de la aplicación [Metrics Explorer & Monitors Builder][2].
{{% /collapse-content %}}


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>¿Tiene preguntas o comentarios? Únase al canal {{< ui >}}#app-builder{{< /ui >}} en el [Datadog Community Slack][5].


[1]: /es/actions/app_builder/events
[2]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=datadog_metrics_and_monitors&viewMode=preview
[3]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=ec2_instance_manager&viewMode=preview
[4]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=ecs_task_manager&viewMode=preview
[5]: https://chat.datadoghq.com/
[6]: /es/actions/app_builder/components/tables/
[7]: /es/actions/app_builder/expressions
[8]: https://www.markdownguide.org/basic-syntax/
[9]: /es/actions/app_builder/events/#state-functions
[10]: /es/actions/app_builder/components/custom_charts/
[11]: /es/actions/app_builder/components/react_renderer/
[12]: /es/actions/app_builder/components/reusable_modules/
[13]: /es/actions/app_builder/events/#events-and-reactions
[14]: /es/actions/app_builder/events/#custom-reactions