---
app_id: pliant
app_uuid: 28fb0874-e3be-4171-819d-142f1c9dd3cc
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: pliant.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10102
    source_type_name: Pliant
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Pliant
  sales_email: hello@pliant.io
  support_email: hello@pliant.io
categories:
- automatización
- conformidad
- notificaciones
- orquestación
- aprovisionamiento
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/pliant/README.md
display_on_public_website: true
draft: false
git_integration_title: pliant
integration_id: pliant
integration_title: Pliant
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: pliant
public_title: Pliant
short_description: Automatización de procesos TI con Pliant.io
supported_os:
- linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Automatización
  - Categoría::Conformidad
  - Categoría::Notificaciones
  - Categoría::Orquestación
  - Categoría::Aprovisionamiento
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Automatización de procesos TI con Pliant.io
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Pliant
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

Pliant.io mejora las notificaciones de Datadog con flujos (flows) de trabajo automatizados de bajo código, creando una verdadera solución de automatización de bucle cerrado. Esto puede ayudar con la resolución de problemas, los diagnósticos y la corrección automatizada.

Para ver más información sobre la integración, consulta el sitio de [Pliant][1].

Algunos ejemplos son:

- Reinicio del servicio
- Configuración del equilibrador de carga
- Aprovisionamiento del sistema
- Borrado del disco / Aprovisionamiento de almacenamiento
- Aprovisionamiento de máquinas virtuales adicionales o nodos de contenedor en respuesta a la carga
- Desactivación de recursos cuando la carga es baja

## Configuración
### Instalación

Crea uno o varios flujos de trabajo que quieras activar a partir de una notificación de Datadog.

### Configuración
#### Pliant

1. **Creación de una clave de API Pliant**: Inicia sesión en Pliant y haz clic en tu nombre de usuario en la parte superior derecha de la pantalla para revelar un menú. Haz clic en "Claves de API".

![Menú Clave de API, paso 1][2]

2. En la pantalla de claves de API, haz clic en "+ Crear" en la parte superior derecha de la pantalla y escribe el título de tu nueva clave de API. Haz clic en Guardar y anota la clave de API que se añadirá a la tabla.

![Crear clave de API, paso 2][3]

**Creación de un flujo de trabajo de Pliant para activar desde Datadog**

1. 1. Ve a la pestaña de los flujos de trabajo en Pliant. Haz clic en "+ Crear" y en "Crear flujo" para crear un nuevo flujo de trabajo. Titula el flujo de trabajo en la ventana emergente y haz clic en "Crear" para iniciar el editor en el nuevo flujo de trabajo.

![Crear flujo, paso 1-a][4]

2. 2. Rellena el flujo de trabajo con las acciones que se deben realizar al recibir el activador de Datadog.

Este flujo de trabajo de ejemplo se llama "RestartHost" y reinicia un host a partir de los datos con los que Datadog activa este flujo de trabajo.

Este flujo de trabajo se ejecuta con sus variables de entrada asignadas inicialmente en función del cuerpo de la solicitud con el que se activa. El flujo de trabajo puede activar/realizar cualquier acción de automatización de infraestructuras deseada utilizando la información de su entrada. En este ejemplo, reinicia un host con SSH bajo ciertas circunstancias cuando Datadog activa el flujo de trabajo de automatización con ciertos parámetros.

  - Para añadir variables de entrada que se rellenan con los datos enviados desde Datadog, haz clic en el icono "Expandir" al inicio del flujo de trabajo para abrir el panel Variable. Para crear variables de **Entrada** coincidentes, configura todas estas variables de entrada con comillas vacías iguales: `""`. Por defecto, Datadog envía los siguientes datos:
    ```
    body
    last_updated
    event_type
    title
    date
    org
    id
    ```

También se inicializan variables de salida adicionales (`host`, `meta` y `ip`). El flujo de trabajo asigna estas variables de salida y emite los valores resultantes al finalizar. También puede especificar variables que no son ni de entrada ni de salida para utilizarlas internamente en la lógica del flujo de trabajo.

![Expandir][5]

3. Para obtener el endpoint del flujo de trabajo Pliant utilizado para la activación desde Datadog con una solicitud HTTP, haz clic en el icono "Expandir" al inicio del flujo de trabajo.

Haz clic en "cURL" > "Token de titular temporario" y selecciona la clave de API que acabas de crear.

![cUrl][6]

![tecla de selección][7]

Tu endpoint está encerrado entre comillas dobles y se asemeja a: ***https://<YOUR_PLIANT_INSTANCE>/api/v1/trigger/<YOUR_PLIANT_USERNAME>/User/<PATH_TO_WORKFLOW>/<WORKFLOW_NOW>?sync=true&api_key=<YOUR_API_KEY>***

![endpoint][8]

Copia toda la URL entre comillas dobles (que puede incluir parámetros de consulta adicionales), empezando por ***https***. No incluyas las comillas dobles.

#### Configuración de Datadog
1. Abre Datadog y haz clic en **integraciones** > **integraciones**, en la barra lateral izquierda.
![integraciones][9]

2. Introduce "webhooks" en la barra de búsqueda y haz clic en la entrada **webhooks** para abrir una ventana de configuración.
![búsqueda de webhooks][10]


3. Desplázate hasta "webhooks". Haz clic en **Nuevo** para añadir un nuevo webhook para vincular al flujo de trabajo Pliant. En primer lugar, asigna un nombre al webhook en el campo "nombre". Este ejemplo utiliza el nombre *RestartHost*.
![configuración de webhooks 2][11]

Pega la URL copiada en el paso 4. Por ejemplo:

```
https://<YOUR_PLIANT_INSTANCE>/api/v1/trigger/<YOUR_PLIANT_USERNAME>/User/<PATH_TO_WORKFLOW>/<WORKFLOW_NOW>?sync=true&api_key=<YOUR_API_KEY>
```

Pega esto en el campo ***URL*** del formulario del webhook.

![formulario de webhook][12]

La carga útil de la solicitud está preconfigurada. Selecciona la casilla "ENCODIFICAR COMO FORMULARIO" y haz clic en Guardar.

Añade esta integración a cualquier notificación de alerta en Datadog añadiendo el destinatario de `@webhook-RestartHost`. Cuando el monitor activa una alerta, el webhook activa tu flujo de trabajo Pliant. Las variables de entrada se envían a Pliant desde Datadog.

## Datos recopilados

### Métricas

La integración de Pliant no proporciona métricas.

### Checks de servicio

La integración de Pliant no incluye checks de servicio.

### Eventos

La integración de Pliant no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][13].

[1]: https://pliant.io/
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/step1.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/step2.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/step1-a-.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/expand.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/curl.png
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/selectDDkey.png
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/endpoint.png
[9]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/integrations_.png
[10]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/webhook_Search.png
[11]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/webhooksConfig3.png
[12]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/webhookForm.png
[13]: https://docs.datadoghq.com/es/help/