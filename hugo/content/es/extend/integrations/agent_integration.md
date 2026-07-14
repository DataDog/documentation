---
aliases:
- /es/developers/integrations/integration_sdk/
- /es/developers/integrations/testing/
- /es/integrations/datadog_checks_dev/
- /es/guides/new_integration/
- /es/developers/integrations/new_check_howto/
- /es/developers/integrations/agent_integration/
description: Aprenda a desarrollar y publicar una integración de Datadog Agent.
further_reading:
- link: /extend/integrations/
  tag: Documentación
  text: Cree una integración.
- link: /extend/integrations/python/
  tag: Documentación
  text: Python para el desarrollo de integraciones basadas en Agent.
- link: /extend/
  tag: Documentación
  text: Aprenda a desarrollar en la plataforma de Datadog.
- link: https://learn.datadoghq.com/courses/intro-to-integrations
  tag: Centro de Aprendizaje
  text: Cree una integración de Agent.
title: Cree una integración basada en Agent.
---
## Descripción general {#overview}

Esta página guía a los Socios Tecnológicos a través del proceso de creación de una integración oficial de Datadog Agent. 

Las integraciones basadas en Agent están diseñadas para recopilar telemetría de software o sistemas que se ejecutan en infraestructura gestionada por el cliente, donde el Datadog Agent está instalado o tiene acceso a la red. Estas integraciones utilizan el [Datadog Agent][1] para recopilar y enviar datos a través de verificaciones personalizadas de agente desarrolladas por Socios Tecnológicos aprobados. 

Las verificaciones de agente pueden emitir [métricas][2], [eventos][3] y [registros][5] en la cuenta de Datadog de un cliente. Cada integración basada en Agent se presenta como un paquete de Python construido sobre el Datadog Agent, permitiendo a los clientes [instalar][6]lo fácilmente a través del Datadog Agent. Sin embargo, las trazas se recopilan fuera de la verificación de agente utilizando uno de los SDK de Datadog. Para más información, consulte la [documentación de instrumentación de aplicaciones][25].

## Construyendo una integración basada en Agent {#building-an-agent-based-integration}
Antes de comenzar, asegúrese de haberse unido a la Datadog Partner Network, de tener acceso a una organización de desarrolladores de socios y de haber creado un listado en la Developer Platform.

Siga estos pasos para crear su integración basada en Agent:

1. [Instale las herramientas de desarrollo requeridas](#prerequisites)
2. [Configure la herramienta de desarrollo de integración del Datadog Agent](#configure-the-datadog-agent-integration-developer-tool)
3. [Genere la estructura básica de su integración](#generate-your-scaffolding)
4. [Desarrolle su verificación de agente](#develop-your-agent-check)
5. [Pruebe su integración](#test-your-agent-check)
6. [Envíe su código para revisión](#submit-your-code-for-review)

### Requisitos previos {#prerequisites}

Asegúrese de que las siguientes herramientas estén instaladas:

- [pipx][9] para instalar herramientas de desarrollo y dependencias
- [Herramienta de Desarrollo de Integración del Datadog Agent][10] (`ddev`) para generar la estructura básica y gestionar el desarrollo de la integración
- [Docker][11] para ejecutar el conjunto completo de pruebas
- Git ([línea de comandos][12] o [cliente de GitHub Desktop][13])

### Configure la herramienta de desarrollo de integración del Datadog Agent {#configure-the-datadog-agent-integration-developer-tool}
Utilice la herramienta de desarrollo del Datadog Agent para construir y probar su integración. Los pasos de configuración difieren dependiendo de si está desarrollando una [integración OOTB o una integración de Marketplace][23]. Seleccione la pestaña apropiada a continuación.

{{< tabs >}}

{{% tab "Integración OOTB" %}}

1. Cree un directorio de trabajo. La herramienta de desarrollo espera que su trabajo esté ubicado en `$HOME/dd/`:

   ```shell
   mkdir $HOME/dd && cd $HOME/dd
   ```

2. Realice un fork del [repositorio Datadog/integrations-extras][101] en su cuenta de GitHub.

3. Clone su fork en el directorio `dd`:

   ```shell
   git clone git@github.com:<YOUR_USERNAME>/integrations-extras.git
   ```

4. Cree y cambie a una nueva rama para su integración:

   ```shell
   cd integrations-extras
   git switch -c <YOUR_INTEGRATION_NAME> origin/master
   ```

5. Establezca `extras` como el repositorio de trabajo predeterminado: 

   ```shell
   ddev config set repo extras
   ```

   Si su repositorio está almacenado fuera de `$HOME/dd/`, especifique la ruta antes de establecerlo como predeterminado:

   ```shell
   ddev config set repos.extras "/path/to/integrations-extras"
   ddev config set repo extras 
   ```

[101]: https://github.com/Datadog/integrations-extras

{{% /tab %}}

{{% tab "Integración de Marketplace" %}}

1. Cree un directorio de trabajo. La herramienta de desarrollo espera que su trabajo esté ubicado en `$HOME/dd/`:

   ```shell
   mkdir $HOME/dd && cd $HOME/dd
   ```

2. Clone el repositorio [Datadog/marketplace][101]. Si no tiene acceso, solicítelo a su contacto de Datadog.

   ```shell
   git clone git@github.com:DataDog/marketplace.git
   ```

3. Cree y cambie a una nueva rama para su integración:

   ```shell
   cd marketplace
   git switch -c <YOUR_INTEGRATION_NAME> origin/master
   ```

4. Establezca `marketplace` como el repositorio de trabajo predeterminado:

   ```shell
   ddev config set repo marketplace
   ```

   Si su repositorio está almacenado fuera de `$HOME/dd/`, especifique la ruta antes de establecerlo como predeterminado:

   ```shell
   ddev config set repos.marketplace "/path/to/marketplace"
   ddev config set repo marketplace
   ```

[101]: https://github.com/DataDog/marketplace

{{% /tab %}}

{{< /tabs >}}

### Genere su estructura básica {#generate-your-scaffolding}

Utilice el comando `ddev create` para generar la estructura inicial de archivos y directorios para su integración basada en Agent.

<div class="alert alert-info">Consulte la pestaña Método de Configuración en la Developer Platform para el comando correcto para su integración.</div>

1. **Realice una prueba en seco (recomendado)**

    Utilice la opción `-n` o `--dry-run` para previsualizar los archivos que se generan, sin escribir nada en el disco. Confirme que la ruta de salida coincide con la ubicación esperada del repositorio.

    ```shell
    ddev create -nt check_only <YOUR_INTEGRATION_NAME> --skip-manifest
    ```

2. **Genere los archivos** 

    Después de verificar la ubicación del directorio, ejecute el mismo comando sin el `-n` para crear la estructura básica. Siga las indicaciones para proporcionar los detalles de la integración.

    ```shell
    ddev create -t check_only <YOUR_INTEGRATION_NAME> --skip-manifest
    ```

### Desarrolle su verificación de agente {#develop-your-agent-check}

Cada integración basada en Agent se centra en una verificación de agente, una clase de Python que recopila telemetría periódicamente y la envía a Datadog.

Las verificaciones de agente [checks][16] heredan de la clase base `AgentCheck` y deben cumplir con los siguientes requisitos:

- **Compatibilidad con Python**:
    - Las integraciones para Datadog Agent v7+ deben soportar Python 3. Todas las nuevas integraciones deben estar orientadas a v7+.
    - Las integraciones para Datadog Agent v5-v6 utilizan Python 2.7.
- **Herencia de clase**: Cada verificación debe ser una subclase de `AgentCheck`.
- **Punto de entrada**: Cada verificación debe implementar un método `check(self, instance)`.
- **Estructura del paquete**: Las verificaciones están organizadas bajo el espacio de nombres `datadog_checks`. Por ejemplo, una integración llamada `<INTEGRATION_NAME>` se encuentra en: `<integration_name>/datadog_checks/<integration_name>/`.
- **Nomenclatura**:
    - El nombre del paquete debe coincidir con el nombre de la verificación.
    - Los nombres de módulo y clase de Python dentro del paquete pueden ser elegidos libremente.

#### Implementar la lógica de verificación {#implement-check-logic}

El siguiente ejemplo muestra la lógica para una integración llamada `Awesome`.

Esta verificación define una [verificación de servicio][4] llamada `awesome.search`, que busca una cadena específica en una página web:
- Devuelve `OK` si se encuentra la cadena.
- Devuelve `WARNING` si la página se carga pero falta la cadena.
- Devuelve `CRITICAL` si no se puede acceder a la página.

Para aprender cómo enviar datos adicionales desde tu verificación, consulta:

- [Custom Agent Check][17] para enviar métricas.
- [Agent Integration Log Collection][5] para recopilar registros de su AgentCheck usando `send_log`. Mejor para la emisión de registros de una sola fuente.
- [HTTP Crawler Tutorial][24] para recopilar registros de múltiples fuentes de registro, como cuando se consultan varios puntos de conexión o APIs HTTP externas.

El archivo `awesome/datadog_checks/awesome/check.py` podría verse así:

{{< code-block lang="python" filename="check.py" collapsible="true" >}}

import requests
import time

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
            # Submit an error log
            self.send_log({
                'message': f'Failed to access {url}: {str(e)}',
                'timestamp': time.time(),
                'status': 'error',
                'service': 'awesome',
                'url': url
            })
        # Page is accessible
        else:
            # search_string is present
            if search_string in response.text:
                self.service_check('awesome.search', self.OK)
                # Submit an info log
                self.send_log({
                    'message': f'Successfully found "{search_string}" at {url}',
                    'timestamp': time.time(),
                    'status': 'info',
                    'service': 'awesome',
                    'url': url,
                    'search_string': search_string
                })
            # search_string was not found
            else:
                self.service_check('awesome.search', self.WARNING)
                # Submit a warning log
                self.send_log({
                    'message': f'String "{search_string}" not found at {url}',
                    'timestamp': time.time(),
                    'status': 'warning',
                    'service': 'awesome',
                    'url': url,
                    'search_string': search_string
                })
{{< /code-block >}}

Para aprender más sobre la clase base de Python, consulte [Anatomy of a Python Check][18].

### Escriba pruebas de validación {#write-validation-tests}

Hay dos tipos de pruebas:

- [Pruebas unitarias para funcionalidades específicas](#write-a-unit-test)
- [Pruebas de integración que ejecutan el método `check` y verifican la correcta recopilación de métricas](#write-an-integration-test)

[pytest][19] y [hatch][20] se utilizan para ejecutar las pruebas. Las pruebas son necesarias para publicar su integración.

#### Escriba una prueba unitaria {#write-a-unit-test}

La primera parte del método `check` para Awesome recupera y verifica dos elementos del archivo de configuración. Este es un buen candidato para una prueba unitaria.

Abra el archivo en `awesome/tests/test_awesome.py` y reemplace el contenido con lo siguiente:

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

`pytest` tiene el concepto de marcadores que se pueden usar para agrupar pruebas en categorías. Observe que `test_config` está marcado como una prueba `unit`.

La estructura está configurada para ejecutar todas las pruebas ubicadas en `awesome/tests`. Para ejecutar las pruebas, ejecute el siguiente comando:

```
ddev test awesome
```

#### Escriba una prueba de integración {#write-an-integration-test}

La [prueba unitaria anterior](#write-a-unit-test) no verifica la lógica de recopilación. Para probar la lógica, necesita [crear un entorno para una prueba de integración](#create-an-environment-for-the-integration-test) y [escribir una prueba de integración](#add-an-integration-test).

##### Cree un entorno para la prueba de integración {#create-an-environment-for-the-integration-test}

El kit de herramientas utiliza `docker` para iniciar un contenedor NGINX y permite que la verificación recupere la página de bienvenida.

Para crear un entorno para la prueba de integración, Cree un archivo docker-compose en `awesome/tests/docker-compose.yml` con el siguiente contenido:

{{< code-block lang="yaml" filename="docker-compose.yml" collapsible="true" >}}
version: "3"

services:
  nginx:
    image: nginx:stable-alpine
    ports:
      - "8000:80"

{{< /code-block >}}

A continuación, Abra el archivo en `awesome/tests/conftest.py` y reemplace el contenido con lo siguiente:

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

#### Agregue una prueba de integración {#add-an-integration-test}

Después de haber configurado un entorno para la prueba de integración, agregue una prueba de integración al archivo `awesome/tests/test_awesome.py`:

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

Para acelerar el desarrollo, utilice la opción `-m/--marker` para ejecutar solo pruebas de integración:
   ```
   ddev test -m integration awesome
   ```

## Pruebe su verificación de agente {#test-your-agent-check}

Las integraciones basadas en agentes se distribuyen como archivos de rueda de Python (.whl) que los clientes instalan a través del Agente de Datadog. Antes de publicar su integración, puede probarla localmente construyéndola e instalando manualmente el paquete de rueda.

### Construya la rueda {#build-the-wheel}

El `pyproject.toml` archivo proporciona los metadatos que se utilizan para empaquetar y construir la rueda. La rueda contiene los archivos necesarios para el funcionamiento de la integración en sí, que incluye la verificación del agente, el archivo de ejemplo de configuración y los artefactos generados durante la construcción de la rueda.

Para aprender más sobre el empaquetado de Python, consulta [Empaquetando Proyectos de Python][21].

Después de que su `pyproject.toml` esté listo, Cree una rueda utilizando una de las siguientes opciones:

- (Recomendado) Con el `ddev` tooling: `ddev release build <INTEGRATION_NAME>`.
- Sin el `ddev` tooling: `cd <INTEGRATION_DIR> && pip wheel . --no-deps --wheel-dir dist`.

### Instale la rueda {#install-the-wheel}

La rueda se instala utilizando el comando del Agent `integration`, disponible en [Agent v6.10.0 o posterior][1]. Dependiendo de su entorno, es posible que necesite ejecutar este comando como un usuario específico o con privilegios específicos:

**Linux** (como `dd-agent`):

```bash
sudo -u dd-agent datadog-agent integration install -w /path/to/wheel.whl
```

**OSX** (como administrador):

```bash
sudo datadog-agent integration install -w /path/to/wheel.whl
```

**Windows PowerShell** (Asegúrese de que su sesión de shell tenga privilegios de _administrador_):

{{% collapse-content title="Agent v6.11 o anterior" level="h4" expanded=false %}}

```ps
& "C:\Program Files\Datadog\Datadog Agent\embedded\agent.exe" integration install -w /path/to/wheel.whl
```

{{% /collapse-content %}}

{{% collapse-content title="Agent v6.12 o posterior" level="h4" expanded=true %}}

```ps
& "C:\Program Files\Datadog\Datadog Agent\bin\agent.exe" integration install -w /path/to/wheel.whl
```

{{% /collapse-content %}}

Para instalar su rueda para probar en entornos de Kubernetes:
1. Monte el `.whl` archivo en un initContainer.
2. Ejecute la instalación de la rueda en el initContainer.
3. Monte el initContainer en el contenedor del Agent mientras se está ejecutando.

Para los comandos de instalación del cliente tanto para entornos de host como de contenedor, consulta la [documentación de Integraciones de Comunidad y Marketplace][22].

## Envíe su código para revisión {#submit-your-code-for-review}

Abra una solicitud de extracción con su directorio de integración en el repositorio apropiado, ya sea [Datadog/integrations-extras][14] o [Datadog/marketplace][15]. La solicitud de extracción se revisa en paralelo con su envío a Developer Platform.

## Actualizando su integración {#updating-your-integration}

Después de que su integración se publique, puede liberar actualizaciones a través de Developer Platform.

### Aumentando la versión de una integración {#bumping-an-integration-version}
Se requiere un aumento de versión cada vez que se agregue, se elimine o se modifique alguna funcionalidad (por ejemplo, al introducir nuevas métricas, actualizar tableros o cambiar el código de integración). No es necesario para actualizaciones no funcionales, como cambios en el contenido escrito, la marca, los logotipos o las imágenes.

En Developer Platform, incluya una nueva entrada en la pestaña **Release Notes** siguiendo este formato:
    

```
## Version Number / Date (YYYY-MM-DD)

***Added***:

* Description of new feature
* Description of new feature

***Fixed***:

* Description of fix
* Description of fix

***Changed***:

* Description of update or improvement
* Description of update or improvement

***Removed***:

* Description of removed feature
* Description of removed feature
```

Asegúrese de actualizar todas las referencias al número de versión en la documentación de la integración y las instrucciones de instalación.

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/agent/
[2]: https://docs.datadoghq.com/es/metrics/
[3]: https://docs.datadoghq.com/es/service_management/events/
[4]: /es/extend/service_checks/
[5]: https://docs.datadoghq.com/es/logs/log_collection/agent_checks/
[6]: https://docs.datadoghq.com/es/agent/guide/integration-management/?tab=linux#install
[7]: /es/extend/integrations/?tab=integrations#join-the-datadog-partner-network
[8]: /es/extend/integrations/build_integration/#create-a-listing
[9]: https://github.com/pypa/pipx
[10]: /es/extend/integrations/python/
[11]: https://docs.docker.com/get-docker/
[12]: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
[13]: https://desktop.github.com/
[14]: https://github.com/Datadog/integrations-extras
[15]: https://github.com/DataDog/marketplace
[16]: https://docs.datadoghq.com/es/glossary/#check
[17]: /es/metrics/custom_metrics/agent_metrics_submission/?tab=count
[18]: https://github.com/DataDog/datadog-agent/blob/6.2.x/docs/dev/checks/python/check_api.md
[19]: https://docs.pytest.org/en/latest
[20]: https://github.com/pypa/hatch
[21]: https://packaging.python.org/en/latest/tutorials/packaging-projects/
[22]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/
[23]: /es/extend/integrations/?tab=integrations#out-of-the-box-integrations-vs-marketplace-offerings
[24]: https://datadoghq.dev/integrations-core/tutorials/logs/http-crawler/
[25]: /es/tracing/trace_collection/