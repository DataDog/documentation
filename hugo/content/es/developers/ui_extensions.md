---
aliases:
- /es/developers/datadog_apps/
dependencies:
- https://github.com/DataDog/apps/blob/master/docs/en/getting-started.md
further_reading:
- link: https://github.com/DataDog/apps/blob/master/docs/en/ui-extensions-design-guidelines.md
  tag: GitHub
  text: Directrices de diseño
- link: https://github.com/DataDog/apps/blob/master/docs/en/programming-model.md
  tag: GitHub
  text: Modelo de programación
title: Extensiones de interfaz de usuario de Datadog
---
## ¿Qué es una extensión de la interfaz de usuario?

Las extensiones de la interfaz de usuario permiten a los desarrolladores ampliar la funcionalidad nativa de Datadog a través de la personalización de widgets de dashboard. Por ejemplo, si hay una visualización de datos que deseas y que Datadog no admite, o un flujo de trabajo de corrección común que ejecutas en una plataforma de terceros, podrías escribir una Extensión de interfaz de usuario para ampliar esta funcionalidad dentro de Datadog.

## Configuración

### Establece tu entorno de desarrollo local

1. Crea una aplicación de Datadog para tu extensión de interfaz de usuario:
   ```
   yarn create @datadog/app
   ```

1. Navega hasta la carpeta que has creado:
   ```
   cd starter-kit
   ```

1. Configura tu entorno de desarrollo:
   ```
   yarn start
   ```

Esto inicia tu servidor de desarrollo local en `http://localhost:3000/`.

Si ves el siguiente mensaje, tu aplicación se está ejecutando:

<img style="max-width:70%" alt="The application controller is running in the background" src="https://user-images.githubusercontent.com/228230/137548156-3c41407d-ee2f-423d-8a6e-8533115d462b.png">

Ten en cuenta que hay dos páginas:
- `http://localhost:3000`: un controlador principal que orquesta todas tus diferentes extensiones (como widgets, menús o modales). Será muy útil a medida que vayas enriqueciendo la funcionalidad de la aplicación.
- `http://localhost:3000/widget`: componentes para widgets, modales, o cualquier cosa que necesite una pantalla dedicada.

Consulta la [Guía para desarrolladores de la plataforma de desarrollo][3] para obtener más información sobre esta arquitectura.

<div class="alert alert-info">
Es posible que observes un error <strong>HandshakeTimeoutError</strong> no detectado en la consola de JavaScript cuando interactúes directamente con el widget en tu navegador. Esto es normal. El SDK de aplicaciones de Datadog está <a href="https://github.com/DataDog/apps/blob/master/docs/en/programming-model.md">diseñado</a> para ejecutarse en un iframe que se conecta a la interfaz de usuario de Datadog y el intento de enlace entre el widget y la interfaz de usuario de Datadog agotará el tiempo de espera cuando no haya una interfaz de usuario de Datadog con la que el SDK deba comunicarse.
</div>

### Añade tu aplicación a la plataforma para desarrolladores

1. Ve a [**Integrations** > **Developer Platform**][4] (Integraciones > Plataforma para desarrolladores) y haz clic en **+ New App** (+ Nueva aplicación).
   <img style="max-width:80%" alt="Add a new app to the developer platform" src="https://user-images.githubusercontent.com/228230/137548671-c0c64c2e-e3cd-494b-990c-8dc8a90d4800.png">

1. Introduce un nombre único para tu aplicación.

1. Si lo deseas, una vez que aparezca el dashboard, puedes cambiar el nombre de la aplicación, darle una descripción más detallada o cambiar su icono.
   <img style="max-width:80%" alt="Edit app information from the app dashboard" src="https://user-images.githubusercontent.com/17037651/163401812-d21a9d3a-e73f-49b0-bda4-e7c447295784.png">


### Añade tu aplicación a un dashboard

1. Antes de poder añadir tu aplicación a un dashboard, debes habilitarla haciendo clic en **UI Extensions** (Extensiones de interfaz de usuario).
   <img style="max-width:80%" alt="App Edit Enable UI Extensions" src="https://user-images.githubusercontent.com/17037651/163401958-153f6c80-d7ba-4b47-a40d-1cf08913602d.png">

   Una vez cargada esta vista, haz clic en el botón **Enable UI Extensions** (Habilitar extensiones de interfaz de usuario).

1. Una vez que se te presenten más opciones para tu aplicación, cambia la **Root URL** (URL raíz) y la **Debug Mode Root URL** (URL raíz de modo de depuración) para que coincidan con la versión `localhost` del widget que estás ejecutando. La ruta del controlador principal es `/widget`. Estos valores de URL cambiarán a medida que construyas tu aplicación y comiences a alojarla en tu propia infraestructura.

1. Activa la casilla **Dashboard Custom Widget** (Widget personalizado de dashboard). Esto genera JSON para la aplicación.

   <img style="max-width:80%" alt="App Edit UI Extensions" src="https://user-images.githubusercontent.com/17037651/163402086-a3afbecd-c9c0-4608-bb91-6cb5391fec93.png">

   En este ejemplo, la salida JSON contiene un valor llamado `Your first widget`. Este es el nombre de tu widget tal y como aparece en el menú para añadir a tus dashboards.

1. Navega hasta tu dashboard y añade un widget.

   <img style="max-width:80%" alt="Add widget to your dashboard" src="https://user-images.githubusercontent.com/228230/137550297-3f98c5e0-0826-4109-b6e4-bf6dd1209aa2.png">


1. La sección **Custom Widgets** (Widgets personalizados) está en la parte inferior de la barra lateral. Busca tu widget en la lista y añádelo a tu dashboard.

   <img style="max-width:80%" alt="Add your widget from the custom widgets section" src="https://user-images.githubusercontent.com/228230/137550380-7b9b222d-c848-4d17-9060-cd0345780a11.png">

1. Aparecerá una vista previa de tu nuevo widget, junto con algunas opciones. Desplázate hacia abajo y haz clic en **Done** (Hecho) para añadirlo a tu dashboard.

   <img style="max-width:80%" alt="Click Done to add your widget to the dashboard" src="https://user-images.githubusercontent.com/228230/137550741-669f69c6-4a9b-4253-afc4-be3257a1084e.png">

1. Para crear tu aplicación, ejecuta `yarn build` en tu terminal. A continuación, mueve tu sitio estático generado a la plataforma host de tu elección, y actualiza las URL en la configuración de la aplicación.

### Acceso a la API OAuth

Cuando OAuth API Access está activado, los usuarios deben autenticarse antes de utilizar la aplicación. Esta función te permite integrar tu mecanismo de autenticación existente (por ejemplo, inicio de sesión con nombre de usuario y contraseña basados en cookies) con la plataforma para desarrolladores.

### Ejemplos de aplicaciones

- [Kit de inicio][1]
- [Análisis de sentimiento][2]

## Leer más

- [Más información sobre la plataforma para desarrolladores de Datadog](https://docs.datadoghq.com/developers/authorization/oauth2_in_datadog/)
- [Más información sobre las extensiones de la interfaz de usuario](https://github.com/DataDog/apps/blob/master/docs/en/programming-model.md#oauth-api-access)

[1]: https://github.com/DataDog/apps/tree/master/examples/starter-kit
[2]: https://github.com/DataDog/apps/tree/master/examples/sentiment
[3]: https://github.com/DataDog/apps/blob/master/docs/en/programming-model.md
[4]: https://app.datadoghq.com/apps
[5]: https://dtdg.co/3E5iHd8