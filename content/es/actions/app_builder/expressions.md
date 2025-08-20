---
aliases:
- /es/service_management/app_builder/expressions
further_reading:
- link: /service_management/app_builder/build/
  tag: Documentación
  text: Crear aplicaciones
- link: /service_management/app_builder/components/
  tag: Documentación
  text: Componentes
title: Expresiones de JavaScript
---

Puedes utilizar expresiones de JavaScript (JS) en cualquier parte de App Builder para crear interacciones personalizadas entre las diferentes partes de tu aplicación. Al iniciar una expresión, App Builder ofrece sugerencias de autocompletar basadas en las consultas y componentes existentes en tu aplicación. Haz clic en una sugerencia de autocompletar para utilizarla en tu expresión, o utiliza las teclas de flecha del teclado y haz una selección con la tecla Intro.

{{< img src="service_management/app_builder/app-builder-variable.png" alt="Si no estás seguro sobre qué ingresar como una expresión, escribe $[ para abrir un menú de sugerencia con todas las expresiones disponibles" style="width:70%;" >}}

Algunos campos, como [la transformación después de la consulta][1], muestran un editor de código por defecto y aceptan JS sin formato. En todos los demás campos, encierra tus expresiones de JS en `${}`. Por ejemplo, para interpolar los valores de dos componentes de entrada de texto denominados `textInput0` y `textInput1` en la propiedad **Content** (Contenido) de un componente de texto (y añadir un signo de exclamación), utiliza la expresión `${textInput0.value} ${textInput1.value}!`.

{{< img src="service_management/app_builder/interpolation-2.png" alt="El componente de texto se completa con las palabras 'Hello' y 'World', cada una interpolada de un valor de componente de entrada de texto" style="width:70%;" >}}

App Builder acepta la sintaxis estándar de Vanilla JavaScript, con las siguientes salvedades:
- El resultado de la expresión debe coincidir con el resultado esperado por el componente o la propiedad de consulta. Por ejemplo, la propiedad **Is Visible** del componente de texto espera un booleano. Para saber qué tipo de datos espera una propiedad de componente, consulta [Ver propiedades de componente](#view-component-properties).
- Tu código tiene acceso de sólo lectura al estado de la aplicación, pero App Builder ejecuta el código en un entorno de prueba sin acceso al Document Object Model (DOM) o a las APIs del navegador.

## Ver las propiedades de los componentes

Antes de crear una expresión, es útil conocer las propiedades disponibles y los valores predeterminados o actuales del componente con el que deseas interactuar.

Puedes ver las propiedades y valores disponibles para un componente de las siguientes maneras:
- **Estado de la aplicación**: proporciona propiedades y valores para todos los componentes y consultas de tu aplicación, así como variables globales, como variables de estado o variables de plantilla de dashboard.
- **Inspeccionar datos**: proporciona propiedades y valores para un componente o consulta específica en tu aplicación.
- La **Consola de Administración**: la pestaña **Data** (Datos) de la **Admin Console** (Consola de administración) proporciona propiedades y valores para todos los componentes y consultas de tu aplicación.

{{% collapse-content title="Estado de la aplicación" level="h4" %}}
Para acceder a **App State** (Estado de la aplicación):
1. Haz clic en **App Properties** (Propiedades de la aplicación) en el panel lateral izquierdo.
1. Desplázate hasta la sección **App State** (Estado de la aplicación).

{{< img src="service_management/app_builder/app-state-2.png" alt="La sección Estado de la aplicación en Propiedades de la aplicación" style="width:50%;" >}}
{{% /collapse-content %}}

{{% collapse-content title="Inspeccionar datos" level="h4" %}}
Para acceder a **Inspect Data** (Inspeccionar Datos):
1. Haz clic en la consulta o el componente que deseas inspeccionar.
1. Desplázate hasta la sección **Inspect Data** (Inspeccionar datos).

{{< img src="service_management/app_builder/inspect-data-2.png" alt="La sección Estado de la aplicación en Propiedades de la aplicación" style="width:80%;" >}}
{{% /collapse-content %}}

{{% collapse-content title="Consola de administración" level="h4" %}}
Para acceder a la **Admin Console** (Consola de administración):
1. Haz clic en el icono de engranaje (**Settings** (Configuración)) y selecciona **Admin Console** (Consola de administración).
1. Haz clic en **Data** (Datos).

{{< img src="service_management/app_builder/admin-console-2.png" alt="La sección Estado de la aplicación en Propiedades de la aplicación" style="width:50%;" >}}
{{% /collapse-content %}}

## Interacciones de componentes personalizados

La mayoría de los componentes de interfaz de usuario proporcionan opciones integradas, como interruptores y alineación de texto, que cubren el uso básico de la aplicación. Para añadir una interacción personalizada a un componente, haz clic en el símbolo del editor de código (**</>**) e introduce una expresión JS.

### Visibilidad condicional

Puedes hacer que la visibilidad de un componente dependa de otros componentes.

Por ejemplo, si deseas que un componente de texto sólo sea visible cuando dos componentes de entrada de texto denominados `textInput0` y `textInput1` tengan valores, utiliza la expresión `${textInput0.value && textInput1.value}` en la propiedad **Is Visible**.

### Desactivar un componente condicionalmente

De forma similar a la visibilidad, puedes desactivar un componente a menos que se cumplan las condiciones de otros aspectos de tu aplicación, como otros componentes o el contexto de la aplicación.

#### Desactivar un componente en función de su visibilidad

Si tu aplicación tiene un botón que utiliza el contenido de un componente de texto para enviar un mensaje, puedes desactivar el botón a menos que el componente de texto esté visible:
1. Haz clic en el componente de botón del lienzo.
1. Haz clic en el símbolo del editor de código (**</>**) situado junto a la propiedad **Is Disabled**.
1. Añade la expresión `${!text0.isVisible}`.

El componente de texto es invisible y el botón está desactivado a menos que ambos campos de entrada de texto tengan contenido.

{{< img src="service_management/app_builder/is-disabled.png" alt="El componente de texto es invisible y el botón está desactivado a menos que ambos campos de entrada de texto tengan contenido." style="width:100%;" >}}

#### Desactivar un componente en función del contexto de la aplicación

También puedes desactivar un componente en función del contexto de la aplicación, como el equipo en el que se encuentra el usuario.

Por ejemplo, puedes activar un componente sólo para los usuarios que pertenezcan al equipo de Gestión de productos:
1. Haz clic en el componente de botón del lienzo.
1. Haz clic en el símbolo del editor de código (**</>**) situado junto a la propiedad **Is Disabled**.
1. Añade la expresión `${global.user.teams[0].name == 'Product Management'}`.

### Desactivar un componente durante la carga

Otro caso de uso común es desactivar un componente mientras una consulta está en estado de carga. En el [plano de EC2 Instance Manager][3], el componente de selección `instanceType` está deshabilitado mientras la consulta `listInstances` se está cargando. Para ello, la propiedad **Is Disabled** utiliza la expresión `${listInstances.isLoading}`.

{{< img src="service_management/app_builder/isloading.png" alt="El componente de selección 'instanceType' está deshabilitado mientras la consulta 'listInstances' está cargando." style="width:100%;" >}}

## Interacciones de consulta personalizadas

De forma similar a los componentes, puedes utilizar expresiones JS para modificar tus consultas en función de la interacción del usuario.

### Filtrar los resultados de la consulta en función de las entradas del usuario

El [plano de PagerDuty On-call Manager][4] filtra el resultado de la consulta `listSchedules` basándose en las entradas del usuario. El usuario selecciona un equipo y un usuario de los componentes de selección `team` y `user`.

Dentro de la consulta `listSchedules`, la siguiente transformación posterior a la consulta filtra los resultados basándose en los valores de `team` y `user`:

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

Si **Run Settings** (Ajustes de ejecución) de la consulta es **Auto**, la consulta se ejecutará cada vez que un usuario cambie un valor en los componentes `team` o `user`.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/service_management/app_builder/build/#post-query-transformation
[3]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=ec2_instance_manager
[4]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=pagerduty_oncall_manager