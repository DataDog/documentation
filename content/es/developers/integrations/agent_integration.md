---
aliases:
- /es/developers/integrations/integration_sdk/
- /es/developers/integrations/testing/
- /es/integrations/datadog_checks_dev/
- /es/guides/new_integration/
- /es/developers/integrations/new_check_howto/
description: Aprende a desarrollar y publicar una integración de Datadog Agent.
further_reading:
- link: /developers/integrations/create_a_tile/
  tag: Documentación
  text: Crear un cuadro
- link: /developers/integrations/python/
  tag: Documentación
  text: Python para el desarrollo con la integración basada en Agent
- link: /developers/
  tag: Documentación
  text: Aprende a desarrollar en la plataforma Datadog
kind: documentation
title: Crear una integración de Agent
---
## Información general

En esta página se explica a los socios tecnológicos cómo crear una integración de Datadog Agent, que se puede incluir como producto listo para usar en la [página de Integraciones][23] o por un precio en la [página de Marketplace][24]. 

## Integraciones basadas en Agent

Las integraciones basadas en Agent utilizan [Datadog Agent][17] para enviar datos a través de checks escritos por el desarrollador. Los checks pueden emitir [métricas][34], [eventos][18] y [checks de servicios][25] hacia la cuenta de un cliente de Datadog. El propio Agent también puede emitir [logs][26], pero eso se configura fuera del check. 

El código de implementación de estas integraciones se aloja en Datadog. Las integraciones de Agent son las más adecuadas para recopilar datos de sistemas o aplicaciones que se encuentran en una red de área local (LAN) o una nube privada virtual (VPC). Para crear una integración de Agent, debes publicar y desplegar tu solución como una rueda de Python (`.whl`).

Puedes incluir activos listos para usar, como [monitores][27], [dashboards][28] y [canalizaciones de logs][29], en tu integración basada en Agent. Cuando un usuario haga clic en **Install** (Instalar) en el cuadro de la integración, se le pedirá que siga las instrucciones de configuración, y todos los dashboards listos para usar aparecerán en su cuenta. Otros activos, como las canalizaciones de logs, aparecerán para los usuarios tras la correcta instalación y configuración de la integración.

## Proceso de desarrollo

El proceso para crear una integración basada en Agent tiene el siguiente aspecto: 

1. Una vez que te acepten en la [Red de socios de Datadog][32], te reunirás con el equipo de socios tecnológicos de Datadog para analizar tu oferta y tus casos de uso.
2. Solicita una cuenta de prueba de Datadog para el desarrollo a través del portal de la Red de socios de Datadog.
3. Comienza a desarrollar tu integración, que incluye la escritura del código de la integración por tu parte, así como la creación e instalación de una rueda de Python (`.whl`).
4. Prueba la integración en tu cuenta de prueba de Datadog.
5. Una vez que hayas probado y completado el trabajo de desarrollo, rellena los activos del cuadro con información como instrucciones de configuración, imágenes, información de soporte, etc., que conformarán el cuadro de la integración que se mostrará en la página de **Integrations** (Integraciones) o **Marketplace**.
6. Una vez enviada y aprobada tu solicitud de extracción, el equipo de socios tecnológicos de Datadog programará una demostración para una revisión final de la integración.
7. Tendrás la opción de probar el cuadro y la integración en tu cuenta de prueba de Datadog antes de publicarlos, o podrás publicar inmediatamente la integración para todos los clientes.  

## Requisitos previos

Las herramientas de desarrollo requeridas para la integración de Datadog Agent son las siguientes:

- Python v3.11, [pipx][2] y la herramienta de desarrollo para la integración de Agent (`ddev`). Para obtener instrucciones de instalación, consulta [Instalar la herramienta de desarrollo para la integración de Datadog Agent][3].
- [Docker][4] para ejecutar el conjunto de prueba completo.
- La [línea de comandos] de git[5] o el [cliente de escritorio de GitHub][19].

<div class="alert alert-info">Selecciona una pestaña para obtener instrucciones sobre cómo crear una integración lista para usar basada en Agent en la página de Integraciones o una integración basada en Agent en la página de Marketplace.</div>

{{< tabs >}}
{{% tab "Build an out-of-the-box integration" %}}

Para crear una integración lista para usar:

Crea un directorio `dd`:

```shell
mkdir $HOME/dd && cd $HOME/dd
```

   El kit de herramientas de desarrollo de Datadog espera que trabajes en el directorio `$HOME/dd/`. Esto no es obligatorio, pero se requieren pasos de configuración adicionales para trabajar en un directorio diferente. 

1. Copia el [repositorio `integrations-extras`][101].

1. Clona la copia en el directorio `dd`:
   ```shell
   git clone git@github.com:<YOUR USERNAME>/integrations-extras.git
   ```

1. Crea una rama de características en la que puedas trabajar:
   ```shell
   git switch -c <YOUR INTEGRATION NAME> origin/master
   ```

## Configurar la herramienta de desarrollo

La herramienta de desarrollo para la integración de Agent te permite crear un andamiaje durante el desarrollo de una integración mediante la generación de una estructura de los activos y metadatos del cuadro de la integración. Para obtener instrucciones sobre la instalación de la herramienta, consulta [Instalar la herramienta de desarrollo para la integración de Datadog Agent][102].

Para configurar la herramienta para el repositorio `integrations-extras`:

1. Opcionalmente, si el repositorio `integrations-extras` está en un lugar distinto de `$HOME/dd/`, ajusta el archivo de configuración `ddev`:
   ```shell
   ddev config set extras "/path/to/integrations-extras"
   ```

1. Establece `integrations-extras` como repositorio de trabajo por defecto:
   ```shell
   ddev config set repo extras
   ```

[101]: https://github.com/Datadog/integrations-extras
[102]: https://docs.datadoghq.com/es/developers/integrations/python

{{% /tab %}}

{{% tab "Build a Marketplace integration" %}}

Para crear una integración:

1. Consulta [Crear una oferta de Marketplace][102] para solicitar acceso al [repositorio de Marketplace][101].
1. Crea un directorio `dd`:

   ```shell
   mkdir $HOME/dd```

   El comando del kit de herramientas de desarrollo de Datadog espera que trabajes en el directorio `$HOME/dd/`. Esto no es obligatorio, pero se requieren pasos de configuración adicionales para trabajar en un directorio diferente.

1. Una vez que se te haya concedido acceso al repositorio de Marketplace, crea el directorio `dd` y clona el repositorio `marketplace`:

   ```shell
   git clone git@github.com:DataDog/marketplace.git```

1. Crea una rama de características en la que puedas trabajar:

   ```shell
   git switch -c <YOUR INTEGRATION NAME> origin/master```

## Instalar y configurar el kit de herramientas de desarrollo de Datadog

La herramienta de desarrollo para la integración de Agent te permite crear un andamiaje durante el desarrollo de una integración mediante la generación de una estructura de los activos y metadatos del cuadro de la integración. Para obtener instrucciones sobre la instalación de la herramienta, consulta [Instalar la herramienta de desarrollo para la integración de Datadog Agent][103].

Una vez que hayas instalado la herramienta de desarrollo para la integración de Agent, configúrala para el repositorio de Marketplace.

1. Establece `marketplace` como repositorio de trabajo por defecto:

   ```shell

   ddev config set marketplace $HOME/dd/marketplace
   ddev config set repo marketplace
   ```

1. Si usaste un directorio distinto de `$HOME/dd` para clonar el directorio `marketplace`, utiliza el siguiente comando para establecer el repositorio de trabajo:

   ```shell

   ddev config set marketplace <PATH/TO/MARKETPLACE>
   ddev config set repo marketplace
   ```

[101]: https://github.com/Datadog/marketplace
[102]: https://docs.datadoghq.com/es/developers/integrations/marketplace_offering
[103]: https://docs.datadoghq.com/es/developers/integrations/python

{{% /tab %}}

{{< /tabs >}}

## Crear la integración

Una vez que hayas descargado Docker, instalado una versión adecuada de Python y preparado tu entorno de desarrollo, puedes empezar a crear una integración basada en Agent. 

En las siguientes instrucciones se utiliza una integración de ejemplo denominada `Awesome`. Sigue las instrucciones utilizando el código de Awesome o sustitúyelo por tu propio código, así como el nombre de tu integración dentro de los comandos. Por ejemplo, utiliza `ddev create <your-integration-name>` en lugar de `ddev create Awesome`. 

### Crear un andamiaje para la integración

El comando `ddev create` ejecuta una herramienta interactiva que crea la estructura básica de archivos y rutas (o andamiaje) necesaria para una integración basada en Agent.

1. Antes de crear el primer directorio de la integración, intenta realizar una ejecución de prueba utilizando el indicador `-n/--dry-run`, que no escribe nada en el disco:
   ```shell
   ddev create -n Awesome
   ```

   Este comando muestra la ruta donde se habrían escrito los archivos, así como la propia estructura. Asegúrate de que la ruta en la primera línea de salida coincide con la localización de tu repositorio.

1. Ejecuta el comando sin el indicador `-n`. La herramienta te pedirá un correo electrónico y un nombre y, a continuación, creará los archivos que necesitas para empezar a trabajar con una integración.

    <div class="alert alert-info">Si estás creando una integración para Datadog Marketplace, asegúrate de que tu directorio sigue el patrón de {partner name}_{integration name}.</div>

   ```shell
   ddev create Awesome
   ```

## Programar un check de Agent

En la base de cada integración basada en Agent hay un *Agent Check* (Control de Agent) que recopila periódicamente información y la envía a Datadog. 

Los [checks][30] heredan su lógica de la clase base `AgentCheck` y tienen los siguientes requisitos:

- Las integraciones que se ejecutan en Datadog Agent v7 o versiones posteriores deben ser compatibles con Python 3. Las integraciones que se ejecutan en Datadog Agent v5 y v6 todavía utilizan Python 2.7.
- Los checks deben derivarse de `AgentCheck`.
- Los checks deben otorgar un método con esta firma: `check(self, instance)`.
- Los checks están organizados en paquetes comunes de Python en el espacio de nombres`datadog_checks`. Por ejemplo, el código de Awesome se encuentra en el directorio `awesome/datadog_checks/awesome/`.
- El nombre del paquete debe ser el mismo que el del check.
- No hay restricciones sobre el nombre de los módulos de Python dentro de ese paquete, ni sobre el nombre de la clase que implementa el check.

### Implementar la lógica del check

Para Awesome, el check de Agent se compone de un [check de servicio][25] denominado `awesome.search` que busca una cadena en una página web. El resultado es `OK` si la cadena está presente, `WARNING` si se puede acceder a la página pero no se ha encontrado la cadena y `CRITICAL` si no se puede acceder a la página. 

Para saber cómo enviar métricas con el check de Agent, consulta [Personalizar el check de Agent][7].

El código contenido en `awesome/datadog_checks/awesome/check.py` tiene el siguiente aspecto:

{{< code-block lang="python" filename="check.py" collapsible="true" >}}

import requests

from datadog_checks.base import AgentCheck, ConfigurationError


class AwesomeCheck(AgentCheck):
    """AwesomeCheck derives from AgentCheck, and provides the required check method."""

    def check(self, instance):
        url = instance.get('url')
        search_string = instance.get('search_string')

        # It's a very good idea to do some basic sanity checking.
        # Try to be as specific as possible with the exceptions.
        if not url or not search_string:
            raise ConfigurationError('Configuration error, please fix awesome.yaml')

        try:
            response = requests.get(url)
            response.raise_for_status()
        # Something went horribly wrong
        except Exception as e:
            # Ideally we'd use a more specific message...
            self.service_check('awesome.search', self.CRITICAL, message=str(e))
        # Page is accessible
        else:
            # search_string is present
            if search_string in response.text:
                self.service_check('awesome.search', self.OK)
            # search_string was not found
            else:
                self.service_check('awesome.search', self.WARNING)
{{< /code-block >}}

Para obtener más información sobre la clase base de Python, consulta [Anatomía de un check de Python][8].

## Programar pruebas de validación

Existen dos tipos de pruebas:

- [Pruebas unitarias para funciones específicas](#write-a-unit-test)
- [Pruebas de integración que ejecutan el método `check` y verifican la correcta recopilación de métricas](#write-an-integration-test)

Para ejecutar las pruebas, se utiliza [pytest][9] y [hatch][10]. Las pruebas son necesarias para publicar tu integración.

### Programar una prueba unitaria

La primera parte del método `check` para Awesome recupera y verifica dos elementos del archivo de configuración. Esta es una buena opción para una prueba unitaria. 

Abre el archivo en `awesome/tests/test_awesome.py` y sustituye el contenido por lo siguiente:

{{< code-block lang="python" filename="test_awesome.py" collapsible="true" >}}
import pytest

    # Don't forget to import your integration

from datadog_checks.awesome import AwesomeCheck
from datadog_checks.base import ConfigurationError


@pytest.mark.unit
def test_config():
    instance = {}
    c = AwesomeCheck('awesome', {}, [instance])

    # empty instance
    with pytest.raises(ConfigurationError):
        c.check(instance)

    # only the url
    with pytest.raises(ConfigurationError):
        c.check({'url': 'http://foobar'})

    # only the search string
    with pytest.raises(ConfigurationError):
        c.check({'search_string': 'foo'})

    # this should not fail
    c.check({'url': 'http://foobar', 'search_string': 'foo'})
{{< /code-block >}}

`pytest` tiene el concepto de marcadores que pueden utilizarse para agrupar pruebas en categorías. Observa que `test_config` está marcado como prueba unitaria mediante `unit`.

El andamiaje está configurado para ejecutar todas las pruebas ubicadas en `awesome/tests`. Para ejecutar las pruebas, ejecuta el siguiente comando:
```
ddev test awesome
```

### Programar una prueba de integración

La [prueba unitaria anterior](#write-a-unit-test) no comprueba la lógica de la recopilación. Para probar la lógica, necesitas [crear un entorno para una prueba de integración](#create-an-environment-for-the-integration-test) y [programar una prueba de integración](#add-an-integration-test).

#### Crear un entorno para la prueba de integración

El kit de herramientas utiliza `docker` para iniciar un contenedor NGINX y deja que el check recupere la página de bienvenida.

Para crear un entorno para la prueba de integración, crea un archivo docker-compose en `awesome/tests/docker-compose.yml` con el siguiente contenido:

{{< code-block lang="yaml" filename="docker-compose.yml" collapsible="true" >}}
version: "3"

services:
  nginx:
    image: nginx:stable-alpine
    ports:
      - "8000:80"

{{< /code-block >}}

A continuación, abre el archivo en `awesome/tests/conftest.py` y sustituye el contenido por lo siguiente:

{{< code-block lang="python" filename="conftest.py" collapsible="true" >}}
import os

import pytest

from datadog_checks.dev import docker_run, get_docker_hostname, get_here

URL = 'http://{}:8000'.format(get_docker_hostname())
SEARCH_STRING = 'Thank you for using nginx.'
INSTANCE = {'url': URL, 'search_string': SEARCH_STRING}


@pytest.fixture(scope='session')
def dd_environment():
    compose_file = os.path.join(get_here(), 'docker-compose.yml')

    # This does 3 things:
    #
    # 1. Spins up the services defined in the compose file
    # 2. Waits for the url to be available before running the tests
    # 3. Tears down the services when the tests are finished
    with docker_run(compose_file, endpoints=[URL]):
        yield INSTANCE


@pytest.fixture
def instance():
    return INSTANCE.copy()
{{< /code-block >}}

#### Añadir una prueba de integración

Después de configurar un entorno para la prueba de integración, añade una prueba de integración al archivo `awesome/tests/test_awesome.py`:

{{< code-block lang="python" filename="test_awesome.py" collapsible="true" >}}
@pytest.mark.integration
@pytest.mark.usefixtures('dd_environment')
def test_service_check(aggregator, instance):
    c = AwesomeCheck('awesome', {}, [instance])

    # the check should send OK
    c.check(instance)
    aggregator.assert_service_check('awesome.search', AwesomeCheck.OK)

    # the check should send WARNING
    instance['search_string'] = 'Apache'
    c.check(instance)
    aggregator.assert_service_check('awesome.search', AwesomeCheck.WARNING)
{{< /code-block >}}

Para acelerar el desarrollo, utiliza la opción `-m/--marker` para ejecutar únicamente las pruebas de integración:
   ```
   ddev test -m integration awesome
   ```
Tu integración está casi completa. A continuación, añade los activos de check necesarios.

## Rellenar los activos de integración

El siguiente conjunto de activos creados por el andamiaje `ddev` **debe** rellenarse con información relevante para tu integración:

`README.md`
: contiene la documentación de tu check de Agent, cómo configurarlo, qué datos recopila e información de soporte.

`spec.yaml`
: se utiliza para generar el `conf.yaml.example` mediante la herramienta `ddev`. Para obtener más información, consulta [Especificación de la configuración][11].

`conf.yaml.example`
: contiene las opciones por defecto (o de ejemplo) de la configuración del check de Agent. **No edites este archivo manualmente**. Se genera a partir del contenido de `spec.yaml`. Para obtener más información, consulta la [Documentación de referencia del archivo de configuración][12].

`manifest.json`
: contiene los metadatos del check de Agent, como el título y las categorías. Para obtener más información, consulta la [Documentación de referencia del archivo de manifiesto][13].

`metadata.csv`
: contiene la lista de todas las métricas recopiladas por el check de Agent. Para obtener más información, consulta la [Documentación de referencia del archivo de metadatos de métricas][14].

`service_check.json`
: contiene la lista de todos los checks de servicios recopilados por el check de Agent. Para obtener más información, consulta la [Documentación de referencia del archivo de checks de servicios][15].

Para obtener más información sobre los archivos `README.md` y `manifest.json`, consulta [Crear un cuadro][20] y [Referencia de activos de integraciones][33].

## Crear la rueda

El archivo `pyproject.toml` otorga los metadatos que se utilizan para empaquetar y crear la rueda. La rueda contiene los archivos necesarios para el funcionamiento de la propia integración, lo que incluye el check de Agent, el archivo de configuración de ejemplo y los artefactos generados durante la creación de la rueda.

Los elementos adicionales, incluidos los archivos de metadatos, no están pensados para la rueda y se utilizan en otros lugares de la plataforma y el ecosistema Datadog. 

Para obtener más información sobre el empaquetado de Python, consulta [Empaquetado de proyectos de Python][16].

Una vez que `pyproject.toml` esté listo, crea una rueda mediante una de las siguientes opciones:

- (Recomendado) Con la herramienta `ddev`: `ddev release build <INTEGRATION_NAME>`.
- Sin la herramienta `ddev`: `cd <INTEGRATION_DIR> && pip wheel . --no-deps --wheel-dir dist`.

## Instalar la rueda

La rueda se instala mediante el comando de Agent `integration`, disponible en [Agent v6.10.0 o versiones posteriores][17]. Dependiendo de tu entorno, puede que necesites ejecutar este comando como un usuario específico o con privilegios específicos:

**Linux** (como `dd-agent`):
```bash
sudo -u dd-agent datadog-agent integration install -w /path/to/wheel.whl
```

**OSX** (como administrador):
```bash
sudo datadog-agent integration install -w /path/to/wheel.whl
```

**Windows PowerShell** (Asegúrate de que tu sesión de shell tenga privilegios de _administrador_):

<details>
  <summary>Agent <code>v6.11</code> o anterior

  ```ps
  & "C:\Program Files\Datadog\Datadog Agent\embedded\agent.exe" integration install -w /path/to/wheel.whl
  ```

</details>

<details open>
  <summary>Agent<code>v6.12</code> o posterior2

  ```ps
  & "C:\Program Files\Datadog\Datadog Agent\bin\agent.exe" integration install -w /path/to/wheel.whl
  ```
</details>

## Rellenar el cuadro y publicar la integración

Una vez que hayas creado tu integración basada en Agent, consulta la documentación [Crear un cuadro][20] para obtener información sobre cómo rellenar el resto de [activos requeridos][31] que aparecen en el cuadro de la integración y abrir una solicitud de extracción.

## Actualizar la integración
Para actualizar tu integración, edita los archivos relevantes y abre una nueva solicitud de extracción en el directorio de la integración, ya sea en el repositorio [`integrations-extras`][21] o [`marketplace`][22]. 

* Si estás editando o añadiendo código a la integración, se requiere un cambio de versión.

* Si estás editando o añadiendo contenido README, información de manifiesto o activos como dashboards y monitores recomendados, no es necesario un cambio de versión. 

Tras realizar actualizaciones en activos como dashboards y monitores recomendados, o en archivos que no son de código como `README.md` y `manifest.json`, no es necesario que el desarrollador realice ninguna otra acción después de que se hayan fusionado las solicitudes de extracción correspondientes. Estos cambios se mostrarán al cliente sin ninguna acción por su parte. 

### Cambio de versión de una integración 
Además de cualquier cambio en el código, se requiere lo siguiente cuando se actualiza la versión de una integración:
1. Actualiza `__about__.py` para reflejar el nuevo número de versión. Este archivo se encuentra en el directorio de la integración en `/datadog_checks/<your_check_name>/__about__.py`.
2. Añade una entrada al archivo CHANGELOG.md que siga el siguiente formato:
   ```
   ## Version Number / Date

   ***Added***: 

   * New feature
   * New feature

   ***Fixed***:

   * Bug fix
   * Bug fix
   ```
3. Actualiza todas las referencias al número de versión mencionado en `README.md` y en otros sitios. Las instrucciones de instalación de `README.md` suelen incluir el número de versión, que debe actualizarse.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/developers/#creating-your-own-solution
[2]: https://github.com/pypa/pipx
[3]: https://docs.datadoghq.com/es/developers/integrations/python/
[4]: https://docs.docker.com/get-docker/
[5]: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
[6]: https://github.com/datadog/integrations-extras
[7]: /es/metrics/custom_metrics/agent_metrics_submission/?tab=count
[8]: https://github.com/DataDog/datadog-agent/blob/6.2.x/docs/dev/checks/python/check_api.md
[9]: https://docs.pytest.org/en/latest
[10]: https://github.com/pypa/hatch
[11]: https://datadoghq.dev/integrations-core/meta/config-specs/
[12]: /es/developers/integrations/check_references/#configuration-file
[13]: /es/developers/integrations/check_references/#manifest-file
[14]: /es/developers/integrations/check_references/#metrics-metadata-file
[15]: /es/developers/integrations/check_references/#service-check-file
[16]: https://packaging.python.org/en/latest/tutorials/packaging-projects/
[17]: https://docs.datadoghq.com/es/agent/
[18]: https://docs.datadoghq.com/es/service_management/events/
[19]: https://desktop.github.com/
[20]: https://docs.datadoghq.com/es/developers/integrations/create_a_tile
[21]: https://github.com/Datadog/integrations-extras
[22]: https://github.com/Datadog/marketplace
[23]: https://app.datadoghq.com/integrations
[24]: https://app.datadoghq.com/marketplace
[25]: https://docs.datadoghq.com/es/developers/service_checks/
[26]: https://docs.datadoghq.com/es/logs/
[27]: https://docs.datadoghq.com/es/monitors/
[28]: https://docs.datadoghq.com/es/dashboards/
[29]: https://docs.datadoghq.com/es/logs/log_configuration/pipelines/
[30]: https://docs.datadoghq.com/es/glossary/#check
[31]: https://docs.datadoghq.com/es/developers/integrations/create_a_tile/#complete-the-necessary-integration-asset-files
[32]: https://partners.datadoghq.com/
[33]: https://docs.datadoghq.com/es/developers/integrations/check_references/
[34]: https://docs.datadoghq.com/es/metrics/