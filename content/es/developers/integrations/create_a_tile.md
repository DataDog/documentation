---
aliases:
- /es/developers/marketplace/offering
description: Aprende a desarrollar y publicar un cuadro de integraciones.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-marketplace/
  tag: Blog
  text: Extender el alcance de tu monitorización en el mercado de Datadog
- link: /developers/integrations/marketplace_offering
  tag: Documentación
  text: Crear una oferta en el mercado de Datadog
title: Crear un cuadro
type: Documentation
---
## Información general

Esta página guía a los socios tecnológicos a través de la creación del cuadro que representa una oferta que aparecerá en la página **Integraciones** o **Mercado**.

## Cuadro de integraciones

Este cuadro sirve como punto de entrada donde los clientes pueden conocer tu oferta, ver instrucciones de configuración e instalar o comprar tu oferta para desbloquear dashboards y recursos adicionales, listos para utilizar.

{{< img src="developers/integrations/marketplace_or_integrations_tile.png" alt="Modal de cuadro expandido con un ejemplo de oferta en la página Integraciones o Mercado" style="width:100%" >}}

* Para cualquier oferta que **no utilice** el Datadog Agent, incluyendo las integraciones basadas en la API, los listados de servicios profesionales y las licencias de software, sólo necesitas crear un cuadro y enviar los archivos relacionados con el cuadro para publicar tu oferta. Esto se conoce como listado sólo de cuadros. Los listados sólo de cuadros se aplican en las situaciones en que Datadog no aloja ningún código asociado con integraciones basadas en la API y en que los otros tipos de ofertas admitidos no requieren ningún código.

* Para las **integraciones basadas en el Agent**, debes crear un cuadro y, además, debes enviar todo tu código relacionado con integraciones (así como tus archivos relacionados con el cuadro) en una solicitud pull. Para obtener más información, consulta [Crear una integración basada en el Agent][27].

<div class="alert alert-info">Selecciona un pestaña para obtener instrucciones sobre cómo crear un cuadro en la página integraciones o Mercado.</div>

{{< tabs >}}

{{% tab "Build a tile on the Integrations page" (Crear un cuadro en la página Integraciones) %}}

{{< img src="developers/integrations/integration_tile.png" alt="Cuadro que representa un ejemplo de oferta en la página Integraciones" style="width:25%" >}}

Para crear un cuadro en la [página **Integraciones**][103]:

<div class="alert alert-warning">Si ya has seguido los pasos para crear una integración del Agent y has construido el andamiaje, puedes pasar directamente a <a href="#complete-the-necessary-integration-asset-files">completar los archivos de recursos de integraciones necesarios</a>.
</div>

1. Crea un directorio `dd`:

   ```shell
   mkdir $HOME/dd
   ```

   El conjunto de herramientas de desarrollo de Datadog supone que trabajarás en el directorio `$HOME/dd/`. Esto no es obligatorio, pero trabajar en un directorio diferente requiere pasos de configuración adicionales.

2. Bifurcación del [repositorio `integrations-extras`][102].
3. Clona el repositorio `integrations-extras`:

   ```shell
   git clone git@github.com:DataDog/integrations-extras.git
   ```

## Instalar y configurar el conjunto de herramientas de desarrollo de Datadog

La herramienta para desarrolladores de integraciones del Agent te permite construir un andamiaje cuando estás desarrollando una integración, generando un esqueleto de los recursos y metadatos de tu cuadro de integraciones. Para obtener instrucciones sobre la instalación de la herramienta, consulta [Instalar la herramienta para desarrolladores de integraciones del Datadog Agent][101].

Una vez que hayas instalado la herramienta para desarrolladores de integraciones del Agent, configúrala para el repositorio `integrations-extras`.

Configura `integrations-extras` como el repositorio de trabajo por defecto:

```shell
ddev config set extras $HOME/dd/integrations-extras
ddev config set repo extras
```

Si has utilizado un directorio distinto de `$HOME/dd` para clonar el directorio `integrations-extras`, utiliza el siguiente comando para configurar tu repositorio de trabajo:

```shell
ddev config set extras <PATH/TO/INTEGRATIONS_EXTRAS>
ddev config set repo extras
```

## Rellenar el andamiaje del cuadro de integración

Para las integraciones de la API de Datadog que estarán disponibles de forma inmediata en la página [Integraciones ][102], utiliza el conjunto de herramientas para desarrolladores de Datadog para construir un andamiaje para un listado exclusivo de cuadro.

1. Asegúrate de que estás dentro del directorio `integrations-extras`:

   ```shell
   cd $HOME/dd/integrations-extras
   ```

1. Ejecuta el comando `ddev` con la opción `-t tile`:

   ```shell
   ddev create -t tile "<Offering Name>"
   ```

[101]: https://docs.datadoghq.com/es/developers/integrations/python
[102]: https://github.com/Datadog/integrations-extras
[103]: https://app.datadoghq.com/integrations

{{% /tab %}}

{{% tab "Build a tile on the Marketplace" (Crear un cuadro en el Mercado) %}}

{{< img src="developers/integrations/marketplace_tile.png" alt="Cuadro que representa un ejemplo de oferta en la página Marketplace" style="width:25%" >}}

Para crear un cuadro en la [página **Mercado**][104]:

<div class="alert alert-warning">Si ya has seguido los pasos para crear una integración del Agent y has construido el andamiaje, puedes pasar directamente a <a href="#complete-the-necessary-integration-asset-files">completar los archivos de recursos de integraciones necesarios</a>.
</div>

1. Consulta [Crear una oferta de Marketplace][102] para solicitar acceso al [repositorio de Mercado][101].

1. Crea un directorio `dd`:

   ```shell
   mkdir $HOME/dd
   ```

   El comando del conjunto de herramientas para desarrolladores de Datadog supone que trabajarás en el directorio `$HOME/dd/`. Esto no es obligatorio, pero trabajar en un directorio diferente requiere pasos de configuración adicionales.

1. Una vez que se te haya concedido acceso al repositorio de Mercado, crea el directorio `dd` y clona el repositorio `marketplace`:

   ```shell
   git clone git@github.com:DataDog/marketplace.git
   ```

1. Crea una rama de características en la que trabajar:

    ```shell
    git switch -c <YOUR INTEGRATION NAME> origin/master
    ```

## Instalar y configurar el conjunto de herramientas de desarrollo de Datadog

La herramienta para desarrolladores de integraciones del Agent te permite construir un andamiaje cuando estás desarrollando una integración, generando un esqueleto de los recursos y metadatos de tu cuadro de integraciones. Para obtener instrucciones sobre la instalación de la herramienta, consulta [Instalar la herramienta para desarrolladores de integraciones del Datadog Agent][101].

Una vez que hayas instalado la herramienta para desarrolladores de integraciones del Agent, configúrala para el repositorio `marketplace`.

Configura `marketplace` como el repositorio de trabajo por defecto:

```shell
ddev config set marketplace $HOME/dd/marketplace
ddev config set repo marketplace
```

Si has utilizado un directorio distinto de `$HOME/dd` para clonar el directorio `marketplace`, utiliza el siguiente comando para configurar tu repositorio de trabajo:

```shell
ddev config set marketplace <PATH/TO/MARKETPLACE>
ddev config set repo marketplace
```

## Rellenar el andamiaje del cuadro de integración

Utiliza el conjunto de herramientas de desarrollo de Datadog para construir un andamiaje para un listado exclusivo de cuadro.

Para crear el andamiaje de listado exclusivo de cuadro:

1. Asegúrate de que estás dentro del directorio `marketplace`:

   ```shell
   cd $HOME/dd/marketplace
   ```

2. Ejecuta el comando `ddev` con la opción `-t tile`:

   ```shell
   ddev create -t tile "<Offering Name>"
   ```

[101]: https://github.com/Datadog/marketplace
[102]: https://docs.datadoghq.com/es/developers/integrations/marketplace_offering
[103]: https://docs.datadoghq.com/es/developers/integrations/python
[104]: https://app.datadoghq.com/marketplace

{{% /tab %}}
{{< /tabs >}}

## Completar los archivos de recursos de integraciones necesarios

Asegúrate de que los siguientes recursos necesarios para tu integración están completos:

{{% integration-assets %}}

### LÉEME

Una vez creado el archivo `README.md`, añade las siguientes secciones como H2s (`##`) y rellena el contenido en consecuencia:

| Nombre del encabezado | Encabezado |
|-------------|--------|
| Información general | Escribe una descripción bajo un encabezado `## Overview` que describa el valor y los beneficios que tu oferta proporciona a los usuarios, por ejemplo, dashboards, repeticiones de sesiones de usuario, logs, alertas listos para utilizar, y más. <br><br>Esta información se muestra en la pestaña **Información general** del cuadro. |
| Configuración | Incluye todos los pasos necesarios para configurar tu oferta que incluye información dividida en encabezados H3 (`###`).<br>Los temas estándar incluyen:<br><br>- Instalar la integración utilizando el cuadro de integración en la aplicación. <br>- Configurar la integración con las funciones y los permisos adecuados en tu organización Datadog.<br>- Acceso a las funciones listas para utilizar de Datadog, a las que pueden acceder los usuarios que han adquirido e instalado la integración (como métricas, eventos, monitores, logs, dashboards, etc.).|
| Desinstalación | Incluye todos los pasos para desinstalar tu oferta. Esta información se muestra en la pestaña **Configurar** del cuadro.|
| Datos recopilados  | Especifica los tipos de datos recopilados por tu integración (si procede), incluyendo métricas, eventos, checks de servicios y logs. Las métricas añadidas al archivo `metadata.csv` aparecen automáticamente en esta pestaña. <br><br> Si tu oferta no proporciona ninguno de estos datos, no es necesario que añadas una sección para datos recopilados. |
| Asistencia | Proporciona información de contacto a tu equipo de asistencia, que incluya una dirección de correo electrónico, un enlace a la documentación o a la entrada de blog de tu empresa e información adicional de ayuda en formato de lista con viñetas. |

Cuando añadas enlaces al archivo `README.md`, formatéalos utilizando [enlaces de estilo referencia][30]. Por ejemplo, en lugar de insertar la URL directamente en el texto, escribe `see the [official Datadog documentation][1]` y define la referencia del enlace al final del archivo, como por ejemplo `[1]: https://docs.datadoghq.com/`.

Para ver más consejos de gramática y estilo, consulte también la [documentación de Datadog con directrices para colaboradores][31].
### Carrusel multimedia

En cada cuadro se muestra un carrusel multimedia de imágenes y un vídeo, lo que permite a los usuarios comprender mejor la funcionalidad y el valor de tu oferta a través de ayudas visuales. Para añadir un vídeo a tu cuadro, envía una copia o un enlace de descarga de tu vídeo a <a href="mailto:marketplace@datadoghq.com">marketplace@datadoghq.com.</a> El equipo de Marketplace carga el vídeo y proporciona un `vimeo_link` que debe añadirse al archivo `manifest.json`.

#### Vídeo

El vídeo debe cumplir los siguientes requisitos:

| Requisitos del vídeo | Descripción                                                                           |
|--------------------|---------------------------------------------------------------------------------------|
| Tipo               | MP4 H.264                                                                             |
| Tamaño               | El tamaño máximo del vídeo debe ser de 1 GB.                                                        |
| Dimensiones         | La proporción del aspecto debe ser exactamente 16:9 y la resolución debe ser 1920x1080 o superior. |
| Nombre               | El nombre de archivo del vídeo debe ser `partnerName-appName.mp4`.                                |
| Duración del vídeo       | La duración máxima del vídeo debe ser de 60 segundos.                                               |
| Descripción        | El número máximo de caracteres permitidos es 300.                                      |

#### Imágenes

Los socios tecnológicos pueden añadir hasta ocho imágenes (siete, si incluye vídeo) en el carrusel multimedia del cuadro.

Las imágenes deben cumplir los siguientes requisitos:

| Requisitos de imagen | Descripción                                                                                                                                       |
|--------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| Tipo               | `.jpg` o `.png`.                                                                                                                                 |
| Tamaño               | El promedio es de unos 500 KB. El tamaño máximo de la imagen debe ser de 1 MB.                                                                                       |
| Dimensiones         | La proporción del aspecto debe ser exactamente 16:9 y ajustarse a estas especificaciones:<br><br>- Anchura: 1440 px<br>- Altura mínima: 810 px<br>- Altura máxima: 2560 px |
| Nombre               | Utiliza letras, números, guiones bajos y guiones. No utilices espacios.                                                                           |
| Modo de color         | RGB                                                                                                                                               |
| Perfil de color      | sRGB                                                                                                                                              |
| Descripción        | El número máximo de caracteres permitidos es 300.                                                                                                  |

Sigue esta plantilla para definir el objeto `media` en el archivo `manifest.json` que incluye una imagen, una miniatura del vídeo y un vídeo:

{{< code-block lang="json" filename="manifest.json" collapsible="true" >}}
"media": [
      {
        "media_type": "image",
        "caption": "A Datadog Marketplace Integration OOTB Dashboard",
        "image_url": "images/integration_name_image_name.png"
      },
      {
        "media_type": "video",
        "caption": "A Datadog Marketplace Integration Overview Video",
        "image_url": "images/integration_name_video_thumbnail.png",
        "vimeo_id": 123456789
      },
    ],
{{< /code-block >}}

Para obtener más información, consulta [Referencia de recursos de integraciones][22].

## Abrir una solicitud pull

Antes de abrir una solicitud pull, ejecuta el siguiente comando para detectar cualquier problema en tu integración:

```
ddev validate all <INTEGRATION_NAME>
```

Completa los siguientes pasos:

1. Confirma todos los cambios en tu rama de características.
2. Envía tus cambios al repositorio remoto.
3. Abre una solicitud pull que contenga tus archivos de recursos del cuadro de integración (incluidas las imágenes) en el repositorio [`marketplace`][18] o [`integrations-extras`][26].

Después de crear tu solicitud pull, automáticamente se ejecutan checks para verificar que tu solicitud pull está en buen estado y que contiene todo el contenido necesario para la actualización.

## Proceso de revisión

Una vez que tu solicitud pull pasa todos los checks, los revisores de los equipos `Datadog/agent-integrations`, `Datadog/ecosystems-review` y `Datadog/documentation` brindan sugerencias y comentarios sobre las prácticas recomendadas.

Una vez que hayas respondido a los comentarios y hayas vuelto a solicitar revisiones, estos revisores aprobarán tu solicitud pull. Ponte en contacto con el equipo de Marketplace, si quieres obtener una vista previa del cuadro en tu cuenta sandbox. Esto te permite previsualizar y validar tu cuadro antes de que se publique para todos los clientes.

## Solucionar errores

Las integraciones listas para utilizar del repositorio `integrations-extras` pueden encontrarse con errores de validación cuando el repositorio bifurcado no está actualizado con el origen.

Para resolver los errores de validación, actualiza el repositorio bifurcado en la web de GitHub:

1. En [GitHub][29], ve a tu repositorio bifurcado `integrations-extras`.
1. Haz clic en **Sync fork** (Sincronizar bifurcación) y en **Update branch** (Actualizar rama).

Para reorganizar y enviar cambios:

1. Actualiza tu rama local `master`:
   ```shell
   git checkout master
   git pull origin master
   ```
1. Combina `master` en tu rama de características:
   ```shell
   git checkout <your working branch>
   git merge master
   ```
1. Si hay algún conflicto de combinación, resuélvelo. A continuación, ejecuta `git push origin <your working branch>`.

## Oportunidades de comercialización (GTM)

Datadog ofrece compatibilidad con GTM sólo para los anuncios de Marketplace. Para obtener más información sobre Datadog Marketplace, consulte [Crear una oferta de Marketplace][28].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/marketplace/
[2]: https://docs.datadoghq.com/es/developers/custom_checks/prometheus/
[3]: https://docs.datadoghq.com/es/developers/integrations/agent_integration/#write-the-check
[4]: https://docs.datadoghq.com/es/developers/dogstatsd/
[5]: https://docs.datadoghq.com/es/api/latest/metrics/
[6]: https://docs.datadoghq.com/es/logs/faq/partner_log_integration/
[7]: https://docs.datadoghq.com/es/api/latest/events/
[8]: https://docs.datadoghq.com/es/api/latest/service-checks/
[9]: https://docs.datadoghq.com/es/tracing/guide/send_traces_to_agent_by_api/
[10]: https://docs.datadoghq.com/es/api/latest/incidents/
[11]: https://docs.datadoghq.com/es/api/latest/security-monitoring/
[12]: https://docs.datadoghq.com/es/developers/integrations/
[13]: https://docs.datadoghq.com/es/developers/#creating-your-own-solution
[14]: https://docs.datadoghq.com/es/api/latest/
[15]: https://docs.datadoghq.com/es/developers/integrations/oauth_for_integrations/
[16]: https://docs.datadoghq.com/es/developers/datadog_apps/
[17]: https://app.datadoghq.com/apps/
[18]: https://github.com/Datadog/marketplace
[19]: https://docs.datadoghq.com/es/developers/integrations/marketplace_offering/#request-access-to-marketplace
[20]: https://www.python.org/downloads/
[21]: https://pypi.org/project/datadog-checks-dev/
[22]: https://docs.datadoghq.com/es/developers/integrations/check_references/#manifest-file
[23]: https://datadoghq.com/blog/
[24]: https://github.com/DataDog/integrations-extras/tree/master/vantage
[25]: https://docs.datadoghq.com/es/developers/integrations/python
[26]: https://github.com/Datadog/integrations-extras
[27]: https://docs.datadoghq.com/es/developers/integrations/agent_integration/
[28]: https://docs.datadoghq.com/es/developers/integrations/marketplace_offering/
[29]: https://github.com/
[30]: https://www.markdownguide.org/basic-syntax/#reference-style-links
[31]: https://github.com/DataDog/documentation/blob/master/CONTRIBUTING.md