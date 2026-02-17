---
aliases:
- /es/service_management/app_builder/components
description: Referencia completa de los componentes de interfaz de usuario de App
  Builder, incluyendo botones, formularios, tablas, gráficos y elementos interactivos.
disable_toc: true
further_reading:
- link: /service_management/app_builder/tables/
  tag: Documentación
  text: Tablas
- link: /service_management/app_builder/build/
  tag: Documentación
  text: Crear aplicaciones
- link: /service_management/app_builder/expressions/
  tag: Documentación
  text: Expresiones de JavaScript
- link: https://learn.datadoghq.com/courses/app-builder-integration
  tag: Centro de aprendizaje
  text: Crear aplicaciones de autoservicio con App Builder para integraciones de terceros
title: Componentes
---

Esta página proporciona una lista de componentes de interfaz de usuario que puedes utilizar al crear aplicaciones en App Builder.

Muchas propiedades de componentes te permiten seleccionar entre los valores proporcionados. Si quieres utilizar una expresión para el valor de una propiedad, haz clic en **</>** junto a la propiedad para utilizar el editor de código. Para obtener más información sobre el uso de JavaScript en App Builder, consulta [Expresiones JavaScript][7].
<br><br>

{{% collapse-content title="Botón" level="h3" %}}
Los componentes de botón tienen las siguientes propiedades.

### General

Etiqueta (Label)
: Texto que se muestra en el botón.<br>
**Valor**: cadena o expresión

### Aspecto

Intención
: Controla el color del botón, con colores que representan el propósito del botón.<br>
**Valores proporcionados**: por defecto, peligro, éxito, advertencia.

Es Primario
: Diseñado para llamar la atención del usuario sobre las acciones más importantes para una página o flujo de trabajo determinado.<br>
**Valores proporcionados**: on, off

Sin bordes
: Elimina el borde de cualquier botón. Al pasar el cursor por encima, se rellena el fondo.<br>
**Valores proporcionados**: on, off

Está cargando
: Muestra un indicador de carga.<br>
**Valores proporcionados**: on, off

Está desactivado
: Aplica el estilo desactivado y elimina las interacciones.<br>
**Valores proporcionados**: on, off

Es visible
: Determina si el componente es visible para el usuario final. En modo edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: on, off

### Eventos

Evento
: **Valor**: clic

Reacción
: **Valores**: personalizado, definir estado del componente, activar consulta, abrir modal, cerrar modal, abrir url, descargar archivo, definir el valor de la variable de estado.

Función de estado
: Recuperar<br>
**Ejemplo**: Consulta [Eventos][9].

Para obtener más información sobre eventos, consulta [Eventos][1].

### Inspeccionar datos

Muestra pares de propiedades y valores en formato JSON.

### Ejemplo

Para ver este componente en contexto, consulta el plano de la aplicación [Explorador de métricas y Builder de monitores][2].
{{% /collapse-content %}} 


{{% collapse-content title="Valor de llamada" level="h3" %}}
Los componentes de valor de llamada tienen las siguientes propiedades.

### General

Etiqueta (Label)
: Texto que aparece en la parte superior del componente.<br>
**Valor**: cadena o expresión

Valor
: Valor que resalta la llamada.<br>
**Valor**: cadena o expresión

Unidad
: Unidad asociada al valor.<br>
**Valor**: cadena o expresión

### Estilo

Estilo
: Estilo visual del componente.<br>
**Valores proporcionados**: predeterminado, éxito, advertencia, peligro, azul, morado, rosa, naranja, amarillo, rojo, verde, gris, azul vivo, morado vivo, rosa vivo, naranja vivo, amarillo vivo, rojo vivo, verde vivo.

Tamaño
: Adapta el tamaño de la métrica para que sea proporcional al tamaño del valor.<br>
**Valores proporcionados**: sm, md, lg, xl

### Aspecto

Está cargando
: Muestra un indicador de carga.<br>
**Valores proporcionados**: on, off

Está desactivado
: Aplica el estilo desactivado y elimina las interacciones.<br>
**Valores proporcionados**: on, off

Es visible
: Determina si el componente es visible para el usuario final. En modo edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: on, off

### Inspeccionar datos

Muestra pares de propiedades y valores en formato JSON.

### Ejemplo

Para ver este componente en contexto, consulta el plano de la aplicación [Gestor de instancias EC2][3].
{{% /collapse-content %}}



{{% collapse-content title="Casilla de verificación" level="h3" %}}
Los componentes de casilla de verificación tienen las siguientes propiedades.

### General

Etiqueta (Label)
: Texto que aparece en la parte superior del componente.<br>
**Valor**: cadena o expresión

Opciones
: La lista de casillas de verificación que el usuario puede seleccionar. El formato es una matriz de objetos donde cada objeto consiste en un par clave-valor `label` y `value`. El número mínimo de opciones es 1.<br>
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

### Aspecto

Es multilínea
: Determina si el texto de la casilla de verificación debe aparecer en una nueva línea o ser truncado por una elipsis.<br>
**Valores proporcionados**: on, off

Está desactivado
: Aplica el estilo desactivado y elimina las interacciones.<br>
**Valores proporcionados**: on, off

Es visible
: Determina si el componente es visible para el usuario final. En modo edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: on, off

### Eventos

Evento
: **Valor**: cambio<br>

Reacción
: **Valores**: personalizado, definir estado del componente, activar consulta, abrir modal, cerrar modal, descargar archivo, definir valor de variable de estado.

Función de estado
: Recuperar<br>
**Ejemplo**: Consulta [Eventos][9].

Para obtener más información sobre eventos, consulta [Eventos][1].

### Inspeccionar datos

Muestra pares de propiedades y valores en formato JSON.

### Ejemplo

Para ver este componente en contexto, consulta el plano de la aplicación [Explorador de métricas y Builder de monitores][2].
{{% /collapse-content %}} 



{{% collapse-content title="Contenedor" level="h3" %}}
Los componentes de contenedor tienen las siguientes propiedades.

### Aspecto

Es visible
: Determina si el componente es visible para el usuario final. En modo edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: on, off

### Inspeccionar datos

Muestra pares de propiedades y valores en formato JSON.

### Ejemplo

Para ver este componente en contexto, consulta el plano de la aplicación [Explorador de métricas y Builder de monitores][2].
{{% /collapse-content %}} 



{{% collapse-content title="Gráfico personalizado" level="h3" %}}
Los componentes de gráfico personalizado tienen las siguientes propiedades.

### General

Especificación Vega
: Cadena que representa una especificación Vega-Lite o Vega JSON válida.

### Aspecto

Está cargando
: Muestra un indicador de carga.<br>
**Valores proporcionados**: on, off

Es visible
: Determina si el componente es visible para el usuario final. En modo edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: on, off

### Inspeccionar datos

Muestra pares de propiedades y valores en formato JSON.

### Ejemplo

Para ver un ejemplo de uso de este componente, consulta [Gráficos personalizados][10].

{{% /collapse-content %}}



{{% collapse-content title="Selector de rangos de fechas" level="h3" %}}
Los componentes de selector de rangos de fechas tienen las siguientes propiedades.

### General

Periodo de tiempo por defecto
: El periodo de tiempo por defecto que muestra el selector de fechas.<br>
**Valores proporcionados**: pasados 5 minutos, pasados 30 minutos, pasada 1 hora, pasadas 4 horas, pasado 1 día

### Aspecto

Es visible
: Determina si el componente es visible para el usuario final. En modo edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: on, off

### Eventos

Evento
: **Valor**: cambio

Reacción
: **Valores**: personalizado, definir el estado del componente, activar consulta, abrir modal, cerrar modal, descargar archivo

Función de estado
: Recuperar<br>
**Ejemplo**: Consulta [Eventos][9].

Para obtener más información sobre eventos, consulta [Eventos][1].

### Inspeccionar datos

Muestra pares de propiedades y valores en formato JSON.

### Ejemplo

Para ver este componente en contexto, consulta el plano de la aplicación [Explorador de métricas y Builder de monitores][2].
{{% /collapse-content %}} 


{{% collapse-content title="Entrada de archivos" level="h3" %}}
Los componentes de entrada de archivos tienen las siguientes propiedades.

### General

Tipos de archivo aceptados
: Determina qué tipos de archivo acepta el componente de entrada de archivos.<br>
**Valores**: .csv, .json

### Aspecto

Es visible
: Determina si el componente es visible para el usuario final. En modo edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: on, off

### Eventos

Evento
: **Valor**: cambio

Reacción
: **Valores**: personalizado, definir estado del componente, activar consulta, abrir modal, cerrar modal, descargar archivo, definir valor de variable de estado.

Función de estado
: Recuperar<br>
**Ejemplo**: Consulta [Eventos][9].

Para obtener más información sobre eventos, consulta [Eventos][1].

### Inspeccionar datos

Muestra pares de propiedades y valores en formato JSON.

{{% /collapse-content %}}


{{% collapse-content title="Logotipo de integración" level="h3" %}}
Los componentes de logotipo de integración tienen las siguientes propiedades.

### General

ID de integración
: Especifica el icono del logotipo de integración que se mostrará.<br>
**Valor**: cadena o expresión<br>
**Ejemplos**: datadog, amazon-s3, postgres, okta

### Aspecto

Alineación horizontal
: Controla la posición horizontal del logotipo dentro del componente.<br>
**Valores proporcionados**: alinear a la izquierda, alinear al centro, alinear a la derecha

Alineación vertical
: Controla la posición vertical del logotipo dentro del componente.<br>
**Valores proporcionados**: alinear arriba, alinear al centro, alinear abajo

Es visible
: Determina si el componente es visible para el usuario final. En modo edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: on, off

Está cargando
: Muestra un indicador de carga.<br>
**Valores proporcionados**: on, off

### Inspeccionar datos

Muestra pares de propiedades y valores en formato JSON.

{{% /collapse-content %}}


{{% collapse-content title="Formulario" level="h3" %}}
Los componentes de formulario tienen las siguientes propiedades.

### General

Título
: El título del formulario.<br>
**Valor**: cadena o expresión

Valor por defecto
: El valor por defecto que la aplicación rellena en el formulario. Para rellenar un campo específico, puedes utilizar la notación JSON, como `{"org":"frontend"}` para rellenar el campo `org` con el valor `frontend`.<br>
**Valor**: cadena o expresión

### Campos

Cada elemento representa un campo del formulario. Cada campo tiene uno de los siguientes tipos: `textInput`, `select`, `textArea` o `text`.

Los campos tienen algunas o todas las propiedades siguientes dependiendo de su tipo de campo:

Nombre del campo
: El identificador único de un campo. Puedes utilizar este identificador para hacer referencia al campo en una expresión.<br>
**Valor**: cadena o expresión

Etiqueta (Label)
: Etiqueta que aparece arriba del campo.<br>
**Valor**: cadena o expresión

Contenido
: El contenido que se muestra en un campo `text`.<br>
**Valor**: cadena o expresión

Opciones
: Las opciones disponibles en un campo `select`. Las opciones deben ser una matriz de objetos, con una clave `const` para el valor de la opción y una clave opcional `title` para la etiqueta de la opción.<br>**Valor**: Los campos `label` y `value` de cada objeto pueden ser una cadena o una expresión.<br>
Puedes rellenar cada objeto utilizando la interfaz gráfica de usuario (por defecto), o activar **Raw** para utilizar la entrada JSON sin procesar para proporcionar toda la matriz de objetos.

Texto del parámetro
: El texto que aparece en un campo `textInput` o `textArea` cuando no se introduce ningún valor.<br>
**Valor**: cadena o expresión

Está desactivado
: Aplica el estilo desactivado y elimina las interacciones.<br>
**Valores proporcionados**: on, off

Es visible
: Determina si el campo es visible en el formulario.<br>
**Valores proporcionados**: on, off

Es obligatorio
: Determina si el campo es obligatorio para enviar el formulario.<br>
**Valores proporcionados**: on, off

### Aspecto

Es visible
: Determina si el componente es visible para el usuario final. En modo edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: on, off

Está desactivado
: Aplica el estilo desactivado y elimina las interacciones.<br>
**Valores proporcionados**: on, off

### Eventos

Evento
: **Valor**: enviar, modificar, validar

Reacción
: **Valores**: personalizado, definir estado del componente, activar consulta, abrir modal, cerrar modal, descargar archivo, definir valor de variable de estado.

Función de estado
: setValue<br>
**Ejemplo**: `form0.setValue({name: 'node-group-1'})` define el valor del componente `form0` en `{name: 'node-group-1'}`.

Para obtener más información sobre eventos, consulta [Eventos][1].

### Inspeccionar datos

Muestra pares de propiedades y valores en formato JSON.

{{% /collapse-content %}}


{{% collapse-content title="Entrada JSON" level="h3" %}}
Los componentes de entradas JSON tienen las siguientes propiedades.

### General

Etiqueta (Label)
: Texto que aparece en la parte superior del componente.

Valor por defecto
: El valor JSON por defecto que muestra el componente.

### Aspecto

Solo lectura
: Determina si el componente es de solo lectura.<br>
**Valores proporcionados**: on, off

Es visible
: Determina si el componente es visible para el usuario final. En modo edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: on, off

### Eventos

Evento
: **Valor**: cambio

Reacción
: **Valores**: personalizado, definir estado del componente, activar consulta, abrir modal, cerrar modal, descargar archivo, definir valor de variable de estado.

Función de estado
: Recuperar<br>
**Ejemplo**: Consulta [Eventos][9].

Para obtener más información sobre eventos, consulta [Eventos][1].

### Inspeccionar datos

Muestra pares de propiedades y valores en formato JSON.
{{% /collapse-content %}}



{{% collapse-content title="Modal" level="h3" %}}
Los componentes de modales tienen las siguientes propiedades.

### General

Título
: El título del modal.<br>
**Valor**: cadena o expresión

### Aspecto

Tamaño
: La escala del modal.<br>
**Valores proporcionados**: sm, md, lg

Es visible
: Determina si el componente es visible para el usuario final. En modo edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: on, off

### Eventos

Evento
: **Valores**: toggleOpen, close, open

Reacción
: **Valores**: personalizado, definir estado del componente, activar consulta, abrir modal, cerrar modal, descargar archivo, definir valor de variable de estado.

Funciones de estado
: fetch<br>
**Ejemplo**: Consulta los [eventos][9].
: setIsOpen<br>
**Ejemplo**: `modal0.setIsOpen(true)` define el estado de `modal0` como abierto.

Para obtener más información sobre eventos, consulta [Eventos][1].

### Inspeccionar datos

Muestra pares de propiedades y valores en formato JSON.

### Ejemplo

Para ver este componente en contexto, consulta el plano de la aplicación [Explorador de métricas y Builder de monitores][2].
{{% /collapse-content %}} 



{{% collapse-content title="Entrada numérica" level="h3" %}}
Los componentes de entradas numéricas tienen las siguientes propiedades.

Etiqueta (Label)
: Texto que aparece en la parte superior del componente.<br>
**Valor**: cadena o expresión

Valor por defecto
: El valor por defecto que la aplicación rellena en el cuadro de entrada.<br>
**Valor**: número o expresión que se evalúa a un número

Texto del parámetro
: Texto que aparece cuando no se introduce ningún valor.<br>
**Valor**: cadena o expresión

### Validación

Mín
: El valor mínimo que acepta la entrada numérica.<br>
**Valor**: número o expresión que se evalúa a un número

Máx
: El valor máximo que acepta la entrada numérica.<br>
**Valor**: número o expresión que se evalúa a un número.

### Aspecto

Está desactivado
: Aplica el estilo desactivado y elimina las interacciones.<br>
**Valores proporcionados**: on, off

Es visible
: Determina si el componente es visible para el usuario final. En modo edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: on, off

### Eventos

Evento
: **Valor**: cambio

Reacción
: **Valores**: personalizado, definir estado del componente, activar consulta, abrir modal, cerrar modal, descargar archivo, definir valor de variable de estado.

Funciones de estado
: fetch<br>
**Ejemplo**: Consulta los [eventos][9].
: setValue<br>
**Ejemplo**: `numberInput0.setValue(3)` define el valor del componente `numberInput0` como `3`.

Para obtener más información sobre eventos, consulta [Eventos][1].

### Inspeccionar datos

Muestra pares de propiedades y valores en formato JSON.

### Ejemplo

Para ver este componente en contexto, consulta el plano de la aplicación [ECS Task Manager][4].
{{% /collapse-content %}}




{{% collapse-content title="Radio" level="h3" %}}
Los componentes de radio tienen las siguientes propiedades.

### General

Etiqueta (Label)
: Texto que aparece en la parte superior del componente.<br>
**Valor**: cadena o expresión

Opciones
: La lista de opciones del botón de radio que el usuario puede seleccionar. El formato es una matriz de objetos donde cada objeto consiste en un par clave-valor `label` y `value`.<br>
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

Valor por defecto
: Valor que se selecciona cuando se carga radio.<br>
**Valor**: cadena o expresión

### Aspecto

Está desactivado
: Aplica el estilo desactivado y elimina las interacciones.<br>
**Valores proporcionados**: on, off

Es visible
: Determina si el componente es visible para el usuario final. En modo edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: on, off

### Eventos

Evento
: **Valor**: cambio

Reacción
: **Valores**: personalizado, definir estado del componente, activar consulta, abrir modal, cerrar modal, descargar archivo, definir valor de variable de estado.

Función de estado
: Recuperar<br>
**Ejemplo**: Consulta [Eventos][9].
Estado : setValue<br>
**Ejemplo**: `radioButtons0.setValue("production")` define el valor del componente `radioButtons0` como `"production"`.

Para obtener más información sobre eventos, consulta [Eventos][1].

### Inspeccionar datos

Muestra pares de propiedades y valores en formato JSON.
{{% /collapse-content %}}



{{% collapse-content title="Búsqueda" level="h3" %}}
Los componentes de búsqueda tienen las siguientes propiedades.

### General

Valor por defecto
: Valor por defecto que la aplicación rellena en la casilla de búsqueda.<br>
**Valor**: cadena o expresión

Texto del parámetro
: Texto que aparece cuando no se introduce ningún valor.<br>
**Valor**: cadena o expresión

### Aspecto

Tamaño
: Escala del componente de búsqueda.<br>
**Valores proporcionados**: sm, md, lg

Está cargando
: Muestra un indicador de carga.<br>
**Valores proporcionados**: on, off

Es visible
: Determina si el componente es visible para el usuario final. En modo edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: on, off

### Eventos

Evento
: **Valores**: cambio, envío

Reacción
: **Valores**: personalizado, definir estado del componente, activar consulta, abrir modal, cerrar modal, descargar archivo, definir valor de variable de estado.

Funciones de estado
: Recuperar<br>
**Ejemplo**: Consulta [Eventos][9].
Estado : setValue<br>
**Ejemplo**: `search0.setValue("search query")` define el valor del componente `search0` como `"search query"`.

Para obtener más información sobre eventos, consulta [Eventos][1].

### Inspeccionar datos

Muestra pares de propiedades y valores en formato JSON.

### Ejemplo

Para ver este componente en contexto, consulta el plano de la aplicación [Gestor de instancias EC2][3].
{{% /collapse-content %}}

{{% collapse-content title="Seleccionar" level="h3" %}}
Los componentes de selección tienen las siguientes propiedades.

### General

Etiqueta (Label)
: Texto que aparece en la parte superior del componente.<br>
**Valor**: cadena o expresión

Texto del parámetro
: Texto que aparece cuando no se introduce ningún valor.<br>
**Valor**: cadena o expresión

Opciones
: La lista de opciones que el usuario puede seleccionar. El formato es una matriz de objetos donde cada objeto consta de un par clave-valor de `label` y `value`.<br>
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

Valor por defecto
: Valor que se selecciona cuando se carga la selección.<br>
**Valor**: cadena o expresión

Es multiselección
: Determina si el usuario puede seleccionar más de una opción a la vez.<br>
**Valores proporcionados**: on, off

### Aspecto

Está desactivado
: Aplica el estilo desactivado y elimina las interacciones.<br>
**Valores proporcionados**: on, off

Es visible
: Determina si el componente es visible para el usuario final. En modo edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: on, off

### Eventos

Evento
: **Valor**: cambio

Reacción
: **Valores**: personalizado, definir estado del componente, activar consulta, abrir modal, cerrar modal, descargar archivo, definir valor de variable de estado.

Funciones de estado
: Recuperar<br>
**Ejemplo**: Consulta [Eventos][9].
Estado : setValue<br>
**Ejemplo**: `select0.setValue("staging")` define el valor del componente `select0` como `"staging"`.

Para obtener más información sobre eventos, consulta [Eventos][1].

### Inspeccionar datos

Muestra pares de propiedades y valores en formato JSON.

### Ejemplo

Para ver este componente en contexto, consulta el plano de la aplicación [Explorador de métricas y Builder de monitores][2].
{{% /collapse-content %}} 


{{% collapse-content title="Pestaña" level="h3" %}}

Los componentes de pestañas tienen las siguientes propiedades.

### Tabs

Lista de vistas de pestaña. Utiliza el **+ (más)** para añadir vistas adicionales.


### Estilo

Estilo
: Estilo de colores utilizado para el componente de pestaña.<br>
**Valores proporcionados**: por defecto, morado, rosa, naranja, rojo, verde

Alineación
: Forma en que los pestañas están alineadas dentro del componente de pestaña.<br>
**Valores proporcionados**: horizontal (→), vertical (↓)

Impacto
: Controla si el fondo de la pestaña seleccionada se colorea por completo o si sólo se colorea una pequeña banda en la parte inferior.<br>
**Valores proporcionados**: alto, bajo


### Aspecto

Ocultar pestañas
: Controla si se muestran los marcadores de pestaña.<br>
**Valores proporcionados**: on, off

Ocultar cuerpo
: Controla si se muestra el cuerpo de las pestañas.<br>
**Valores proporcionados**: on, off

Es visible
: Determina si el componente es visible para el usuario final. En modo edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: on, off

### Eventos

Evento
: **Valor**: cambio

Reacción
: **Valores**: personalizado, definir estado del componente, activar consulta, abrir modal, cerrar modal, descargar archivo, definir valor de variable de estado.

Funciones de estado
: Recuperar<br>
**Ejemplo**: Consulta [Eventos][9].
: setTabIndex<br>
**Ejemplo**: `tab0.setTabIndex(0)` define el valor del componente `tab0` en la primera pestaña.

Para obtener más información sobre eventos, consulta [Eventos][1].

### Inspeccionar datos

Muestra pares de propiedades y valores en formato JSON.

{{% /collapse-content %}}

{{% collapse-content title="Tabla" level="h3" %}}

Los componentes de tablas tienen las siguientes propiedades.

### General

Título
: Un título para la tabla. Selecciona **Markdown** para un formato personalizado.<br>
**Valor**: cadena

Fuente de datos
: Matriz de objetos que se muestran en una tabla.<br>
**Valores**: consulta, datos de demostración, componentes

### Columnas

Cada columna de datos de la fuente de datos se representa aquí y tiene las siguientes propiedades:

Etiqueta (Label)
: Texto que aparece en la parte superior de la columna.<br>
**Valor**: cadena o expresión

Ruta de datos
: Ruta JSON para acceder a valores anidados en objetos y matrices de una columna determinada.<br>
**Valor**: cadena o expresión

Formato
: Tipo de formato que adopta la columna.<br>
**Valores proporcionados**: cadena, enlace, píldora de estado, fecha/hora, markdown, etiquetas (tags), barra de porcentaje, número, barra de puntuación, avatar.

Clasificable
: Determina si el usuario puede clasificar por la columna.<br>

Copiable
: Determina si el usuario puede hacer clic para copiar el contenido de la columna.<br>
**Valores proporcionados**: on, off

Filtrable
: Determina si una opción de filtro está disponible para la columna.<br>
**Valores proporcionados**: on, off

Algunas columnas tienen propiedades adicionales basadas en su propiedad **Formato**.

### Paginación

Incluye resumen
: Determina si se muestra un resumen de la paginación directamente encima de la tabla.<br>
**Valores proporcionados**: on, off

Tamaño de página
: Número de filas que se muestran por página.<br>
**Valor**: número o expresión que se evalúa a un número.

Recuento total
: Número total de filas que se muestran en la tabla.<br>
**Valor**: número o expresión que se evalúa a un número.

Tipo
: Determina el tipo de paginación.<br>
**Valores proporcionados**: lado cliente, lado servidor.

### Clasificación

Selecciona la clasificación de la tabla por columna y dirección por defecto. 
Columna
: La columna por la que se clasificará.<br>
**Valor**: nombre de columna

Dirección
: La dirección para clasificar.<br>
**Valores proporcionados**: ascendente, descendente

### Acciones de fila

Al añadir una acción de fila se añade una columna **Actions** (Acciones) a la tabla, que contiene botones de acción definidos por el usuario. Las filas pueden tener múltiples acciones. Las acciones tienen las siguientes propiedades:

Etiqueta (Label)
: Texto que se muestra en el botón de acción.<br>
**Valor**: cadena o expresión

Principal
: Diseñado para llamar la atención del usuario sobre las acciones más importantes para una determinada página o flujo de trabajo.<br>
**Valores proporcionados**: on, off

Sin bordes
: Elimina el borde de cualquier botón. Al pasar el cursor por encima, se rellena el fondo.<br>
**Valores proporcionados**: on, off

Desactivado
: Aplica el estilo desactivado y elimina las interacciones.<br>
**Valores proporcionados**: on, off

Nivel
: Controla el color del botón según su intención.<br>
**Valores proporcionados**: por defecto, peligro, éxito, advertencia

Reacciones
: Las reacciones que activa el botón. Un botón puede tener varias reacciones.<br>
**Valores proporcionados**: descargar archivo, abrir modal, cerrar modal, abrir panel lateral, cerrar panel lateral, abrir URL, definir estado del componente, definir valor de variable de estado, notificación Toast, activar acción, personalizado<br>
Algunos tipos de reacciones tienen propiedades adicionales.

Función de estado
: Recuperar<br>
**Ejemplo**: Consulta [Eventos][9].

### Aspecto

Desplazable
: Determina de qué formas se puede desplazar la tabla.<br>
**Valores proporcionados**: ambos, vertical

Está cargando
: Muestra un indicador de carga.<br>
**Valores proporcionados**: on, off

Tiene ajuste de texto
: Determina si el texto de la celda se ajusta.<br>
**Valores proporcionados**: on, off

Tiene subfilas
: Habilita subfilas para cada fila. Incluiye la propiedad `subRows` en la fuente de datos.<br>
**Valores proporcionados**: on, off

Se puede buscar
: Determina si se añade una barra de búsqueda a la tabla. <br>
**Valores proporcionados**: on, off

Mostrar opciones de clasificación
: Añade un botón **Clasificar** a la tabla que ofrece a los usuarios opciones de clasificación.<br>
**Valores proporcionados**: on, off

Mostrar opciones de columna
: Añade un botón **Columnas** a la tabla para mostrar, ocultar o reorganizar las columnas de la tabla.<br>
**Valores proporcionados**: on, off

Tiene filtro de intervalo de fechas
: Añade un filtro de intervalo de fechas a la tabla.<br>
**Valores proporcionados**: on, off

Es visible
: Determina si el componente es visible para el usuario final. En modo edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: on, off

### Eventos

Evento
: **Valores**: pageChange, tableRowClick

Reacción
: **Valores**: descargar archivo, abrir modal, cerrar modal, abrir panel lateral, cerrar panel lateral, definir estado de componente, definir valor de variable de estado, notificación Toast, activar acción, personalizado

Funciones de estado
: Recuperar<br>
**Ejemplo**: Consulta [Eventos][9].
: setSelectedRow<br>
**Ejemplo**: <ul><li>`table0.setSelectedRow(0)` define la propiedad `selectedRow` de `table0` en la primera fila.</li><li>`table0.setSelectedRow(null)` elimina la propiedad `selectedRow`.</li></ul>
: setPageIndex<br>
**Ejemplo**: `table0.setPageIndex(0)` define la propiedad `pageIndex` de `table0` en la primera página.

Para obtener más información sobre eventos, consulta [Eventos][1].

### Inspeccionar datos

Muestra pares de propiedades y valores en formato JSON.

### Ejemplo

Para ver este componente en contexto, consulta el plano de la aplicación [Explorador de métricas y Builder de monitores][2].

Para ver ejemplos de uso de funciones avanzadas en tablas, consulta [Tablas][6].

{{% /collapse-content %}}



{{% collapse-content title="Texto" level="h3" %}}
Los componentes de texto tienen las siguientes propiedades.

### General

Contenido
: Contenido que muestra el componente.<br>
**Valor**: cadena o expresión

Tipo de contenido
: Determina cómo representar el texto. Cuando se selecciona **Markdown**, el componente de texto admite la [sintaxis básica de Markdown][8], incluidas las imágenes que alojas en otro lugar.<br>
**Valores proporcionados**: texto sin formato, Markdown

### Aspecto

Alineación de texto
: Determina la alineación horizontal del texto dentro del componente.<br>
**Valores proporcionados**: alinear a la izquierda, alinear al centro, alinear a la derecha.

Alineación vertical
: Determina la alineación vertical del texto dentro del componente.<br>
**Valores proporcionados**: alinear arriba, alinear al centro, alinear abajo.

Es visible
: Determina si el componente es visible para el usuario final. En modo edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: on, off

### Inspeccionar datos

Muestra pares de propiedades y valores en formato JSON.

### Relaciones

Muestra las dependencias entre los datos de la tabla y los componentes de la aplicación.

### Ejemplo

Para ver este componente en contexto, consulta el plano de la aplicación [Explorador de métricas y Builder de monitores][2].
{{% /collapse-content %}} 


{{% collapse-content title="Área de texto" level="h3" %}}
Los componentes de área de texto tienen las siguientes propiedades.

Etiqueta (Label)
: Texto que aparece en la parte superior del componente.<br>
**Valor**: cadena o expresión

Valor por defecto
: Valor que se selecciona cuando se carga el área de texto.<br>
**Valor**: cadena o expresión

Texto del parámetro
: Texto que aparece cuando no se introduce ningún valor.<br>
**Valor**: cadena o expresión

### Aspecto

Está desactivado
: Aplica el estilo desactivado y elimina las interacciones.<br>
**Valores proporcionados**: on, off

Es visible
: Determina si el componente es visible para el usuario final. En modo edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: on, off

### Eventos

Evento
: **Valores**: cambio, envío

Reacción
: **Valores**: personalizado, definir estado del componente, activar consulta, abrir modal, cerrar modal, descargar archivo, definir valor de variable de estado.

Funciones de estado
: Recuperar<br>
**Ejemplo**: Consulta [Eventos][9].
: setValue<br>
**Ejemplo**: `textArea0.setValue("text")` define el valor del componente `textArea0` como `"text"`.

Para obtener más información sobre eventos, consulta [Eventos][1].

### Inspeccionar datos

Muestra pares de propiedades y valores en formato JSON.
{{% /collapse-content %}}


{{% collapse-content title="Entrada de texto" level="h3" %}}
Los componentes de entrada de texto tienen las siguientes propiedades.

Etiqueta (Label)
: Texto que aparece en la parte superior del componente.<br>
**Valor**: cadena o expresión

Valor por defecto
: Valor que se selecciona cuando se carga la entrada de texto.<br>
**Valor**: cadena o expresión

Texto del parámetro
: Texto que aparece cuando no se introduce ningún valor.<br>
**Valor**: cadena o expresión

### Aspecto

Está desactivado
: Aplica el estilo desactivado y elimina las interacciones.<br>
**Valores proporcionados**: on, off

Es visible
: Determina si el componente es visible para el usuario final. En modo edición, todos los componentes permanecen visibles.<br>
**Valores proporcionados**: on, off

### Eventos

Evento
: **Valores**: cambio, envío

Reacción
: **Valores**: personalizado, definir estado del componente, activar consulta, abrir modal, cerrar modal, descargar archivo, definir valor de variable de estado.

Funciones de estado
: Recuperar<br>
**Ejemplo**: Consulta [Eventos][9].
: setValue<br>
**Ejemplo**: `textInput0.setValue("text")` define el valor del componente `textInput0` como `"text"`.

Para obtener más información sobre eventos, consulta [Eventos][1].

### Inspeccionar datos

Muestra pares de propiedades y valores en formato JSON.

### Ejemplo

Para ver este componente en contexto, consulta el plano de la aplicación [Explorador de métricas y Builder de monitores][2].
{{% /collapse-content %}} 


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

<br>¿Tienes preguntas o comentarios? Únete al canal **#app-builder** en [Datadog Community Slack][5].


[1]: /es/service_management/app_builder/events
[2]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=datadog_metrics_and_monitors&viewMode=preview
[3]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=ec2_instance_manager&viewMode=preview
[4]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=ecs_task_manager&viewMode=preview
[5]: https://datadoghq.slack.com/
[6]: /es/service_management/app_builder/components/tables/
[7]: /es/service_management/app_builder/expressions
[8]: https://www.markdownguide.org/basic-syntax/
[9]: /es/service_management/app_builder/events/#state-functions
[10]: /es/service_management/app_builder/components/custom_charts/