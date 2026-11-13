---
aliases:
- /es/service_management/app_builder/expressions
description: Utilice expresiones de JavaScript en App Builder para crear interacciones
  personalizadas entre componentes, consultas y el estado de la aplicación.
further_reading:
- link: /actions/app_builder/build/
  tag: Documentación
  text: Crear aplicaciones
- link: /actions/app_builder/components/
  tag: Documentación
  text: Componentes
title: Expresiones de JavaScript
---
Puede usar expresiones de JavaScript (JS) en cualquier parte de App Builder para crear interacciones personalizadas entre las diferentes partes de su aplicación. A medida que comienza una expresión, App Builder ofrece sugerencias de autocompletado basadas en las consultas y componentes existentes en su aplicación. Haga clic en una sugerencia de autocompletado para usarla en su expresión, o use las teclas de flecha de su teclado y realice una selección con la tecla Enter.

{{< img src="actions/app_builder/app-builder-variable.png" alt="Si no está seguro de qué ingresar como expresión, escriba ${ para abrir un menú de sugerencias con todas las expresiones disponibles" style="width:70%;" >}}

Algunos campos, como [transformación posterior a la consulta][1], muestran un editor de código de forma predeterminada y aceptan JS simple. En todos los demás campos, encierre sus expresiones JS entre `${}`. Por ejemplo, para interpolar los valores de dos componentes de entrada de texto llamados `textInput0` y `textInput1` en la propiedad {{< ui >}}Content{{< /ui >}} de un componente de texto (y agregar un signo de exclamación), use la expresión `${textInput0.value} ${textInput1.value}!`.

{{< img src="actions/app_builder/interpolation-2.png" alt="El componente de texto se completa con las palabras 'Hello' y 'World', cada una interpolada a partir del valor de un componente de entrada de texto" style="width:70%;" >}}

App Builder acepta sintaxis de JavaScript estándar (vanilla), con las siguientes advertencias:
- El resultado de la expresión debe coincidir con el resultado esperado por la propiedad del componente o de la consulta. Por ejemplo, la propiedad {{< ui >}}Is Visible{{< /ui >}} del componente de texto espera un valor booleano. Para averiguar qué tipo de datos espera una propiedad de componente, consulte [Visualizar propiedades del componente](#view-component-properties).
- Su código tiene acceso de solo lectura al estado de la aplicación, pero App Builder ejecuta el código en un entorno aislado sin acceso al Modelo de Objetos del Documento (DOM) ni a las API del navegador.

También puede usar Bits AI para trabajar con expresiones JS:
   1. Haga clic en el icono {{< ui >}}Build with AI{{< /ui >}} (**<i class="icon-bits-ai"></i>**).
   1. Ingrese un prompt personalizado o pruebe el prompt `How can you help me with JavaScript expressions?`.

## Visualizar propiedades del componente {#view-component-properties}

Antes de crear una expresión, es útil conocer las propiedades disponibles y los valores predeterminados o actuales del componente con el que desea interactuar.

Puede ver las propiedades y valores disponibles para un componente de las siguientes maneras:
- {{< ui >}}App State{{< /ui >}}: Proporciona propiedades y valores para todos los componentes y consultas en su aplicación, así como variables globales como variables de estado o variables de plantilla de tablero.
- {{< ui >}}Inspect Data{{< /ui >}}: Proporciona propiedades y valores para un componente o consulta específico en su aplicación.
- El {{< ui >}}Admin Console{{< /ui >}}: La pestaña {{< ui >}}Data{{< /ui >}} del {{< ui >}}Admin Console{{< /ui >}} proporciona propiedades y valores para todos los componentes y consultas en su aplicación.

{{% collapse-content title="Estado de la aplicación" level="h3" %}}
Para acceder a {{< ui >}}App State{{< /ui >}}:
1. Haga clic en {{< ui >}}App Properties{{< /ui >}} en el panel lateral izquierdo.
1. Desplácese hacia abajo hasta la sección {{< ui >}}App State{{< /ui >}}.

{{< img src="actions/app_builder/app-state-2.png" alt="La sección Estado de la aplicación en Propiedades de la aplicación" style="width:50%;" >}}
{{% /collapse-content %}}

{{% collapse-content title="Inspect Data" level="h3" %}}
Para acceder a {{< ui >}}Inspect Data{{< /ui >}}:
1. Haga clic en la consulta o el componente que desea inspeccionar.
1. Desplácese hacia abajo hasta la sección {{< ui >}}Inspect Data{{< /ui >}}.

{{< img src="actions/app_builder/inspect-data-2.png" alt="La sección Estado de la aplicación en Propiedades de la aplicación" style="width:80%;" >}}
{{% /collapse-content %}}

{{% collapse-content title="Admin Console" level="h3" %}}
Para acceder a {{< ui >}}Admin Console{{< /ui >}}:
1. Haga clic en el icono de engranaje ({{< ui >}}Settings{{< /ui >}}) y seleccione {{< ui >}}Admin Console{{< /ui >}}.
1. Haga clic en {{< ui >}}Data{{< /ui >}}.

{{< img src="actions/app_builder/admin-console-2.png" alt="La sección Estado de la aplicación en Propiedades de la aplicación" style="width:50%;" >}}
{{% /collapse-content %}}

## Interacciones de componentes personalizados {#custom-component-interactions}

La mayoría de los componentes de la interfaz de usuario proporcionan opciones integradas, como interruptores y alineación de texto, que cubren el uso básico de la aplicación. Para agregar una interacción personalizada a un componente, haga clic en el símbolo del editor de código ({{< ui >}}</>{{< /ui >}}) e ingrese una expresión JS.

### Visibilidad condicional {#conditional-visibility}

Puede hacer que la visibilidad de un componente dependa de otros componentes.

Por ejemplo, si desea que un componente de texto sea visible solo cuando dos componentes de entrada de texto llamados `textInput0` y `textInput1` tengan valores, use la expresión `${textInput0.value && textInput1.value}` en la propiedad {{< ui >}}Is Visible{{< /ui >}}.

### Deshabilitar un componente de forma condicional {#disable-a-component-conditionally}

De forma similar a la visibilidad, puede deshabilitar un componente a menos que se cumplan las condiciones mediante otros aspectos de su aplicación, como otros componentes o el contexto de la aplicación.

#### Deshabilitar un componente según la visibilidad {#disable-a-component-based-on-visibility}

Si su aplicación tiene un botón que usa el contenido de un componente de texto para enviar un mensaje, puede deshabilitar el botón a menos que el componente de texto sea visible:
1. Haga clic en el componente de botón en su lienzo.
1. Haga clic en el símbolo del editor de código ({{< ui >}}</>{{< /ui >}}) junto a la propiedad {{< ui >}}Is Disabled{{< /ui >}}.
1. Agregue la expresión `${!text0.isVisible}`.

El componente de texto es invisible y el botón está deshabilitado a menos que ambos campos de entrada de texto tengan contenido.

{{< img src="actions/app_builder/is-disabled.png" alt="El componente de texto es invisible y el botón está deshabilitado a menos que ambos campos de entrada de texto tengan contenido." style="width:100%;" >}}

#### Deshabilitar un componente según el contexto de la aplicación {#disable-a-component-based-on-the-app-context}

También puede deshabilitar un componente según el contexto de la aplicación, como el equipo en el que está el usuario.

Por ejemplo, puede habilitar un componente solo para los usuarios que están en el equipo de Gestión de Productos:
1. Haga clic en el componente de botón en su lienzo.
1. Haga clic en el símbolo del editor de código ({{< ui >}}</>{{< /ui >}}) junto a la propiedad {{< ui >}}Is Disabled{{< /ui >}}.
1. Agregue la expresión `${global.user.teams[0].name == 'Product Management'}`.

### Deshabilitar un componente mientras se carga {#disable-a-component-while-loading}

Otro caso de uso común es deshabilitar un componente mientras una consulta se encuentra en estado de carga. En el [plano de gestión de EC2][3], el componente de selección `instanceType` se deshabilita mientras la consulta `listInstances` se está cargando. Para lograr esto, la propiedad {{< ui >}}Is Disabled{{< /ui >}} usa la expresión `${listInstances.isLoading}`.

{{< img src="actions/app_builder/isloading.png" alt="El componente de selección 'instanceType' se deshabilita mientras la consulta 'listInstances' se está cargando." style="width:100%;" >}}

## Interacciones de consulta personalizadas {#custom-query-interactions}

Al igual que con los componentes, puede usar expresiones JS para modificar sus consultas según la interacción del usuario.

### Filtrar resultados de consulta según la entrada del usuario {#filter-query-results-on-user-input}

El [plano de horarios de guardia de PagerDuty][4] filtra el resultado de la consulta `listSchedules` según la entrada del usuario. El usuario selecciona un equipo y un usuario de los componentes de selección `team` y `user`.

Dentro de la consulta `listSchedules`, la siguiente transformación posterior a la consulta filtra los resultados según los valores de `team` y `user`:

{{< code-block lang="js" disable_copy="true" >}}
return outputs.body.schedules.map( s => {
    return {
        ...s,
        users: s.users.map(u => u.summary),
        teams: s.teams.map(u => u.summary)
    }
}).filter(s => {

        const matchesName = !name.value.length ? true : s.name.toLowerCase().includes(name.value.toLowerCase());
        const matchesTeam = team.value === 'Any Team' ? true : s.teams.includes(team.value);
        const matchesUser = user.value === 'Any User' ? true : s.users.includes(user.value);

        return matchesName && matchesUser && matchesTeam ;
    }) || []
{{< /code-block >}}

Configurar {{< ui >}}Run Settings{{< /ui >}} de la consulta en {{< ui >}}Auto{{< /ui >}} permite que la consulta se ejecute cada vez que un usuario cambia un valor en los componentes `team` o `user`.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/actions/app_builder/queries/#post-query-transformation
[3]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=ec2_instance_manager
[4]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=pagerduty_oncall_manager