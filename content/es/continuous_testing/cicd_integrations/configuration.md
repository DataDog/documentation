---
aliases:
- /es/synthetics/cicd_integrations/configuration
dependencies:
- https://github.com/DataDog/datadog-ci/blob/master/src/commands/synthetics/README.md
description: Configura Continuous Testing para ejecutar tests en tus pipelines CI/CD.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-github-action-synthetics-ci-visibility/
  tag: Blog
  text: Uso de GitHub Actions de Datadog para añadir tests continuos a los flujos
    de trabajo
- link: /continuous_testing/cicd_integrations
  tag: Documentación
  text: Más información sobre Continuous Testing y CI/CD
- link: /continuous_testing/explorer
  tag: Documentación
  text: Más información sobre el Explorador de resultados de tests y monitorización
    Synthetic
- link: /continuous_testing/testing_tunnel
  tag: Documentación
  text: Más información sobre el túnel de Continuous Testing
title: Configuración de Continuous Testing y CI/CD
---
<div class="alert alert-info">Esta página presenta la configuración de tests de Continuous Testing para tus pipelines de Continuous Integration (CI) y Continuous Delivery (CD). Si quieres trasladar tus métricas y datos de CI/CD a dashboards de Datadog, consulta la sección <a href="https://docs.datadoghq.com/continuous_integration/" target="_blank">CI Visibility</a>.</div>

## Información general

Utiliza el [paquete NPM `@datadog-ci`][1] para ejecutar tests de Continuous Testing directamente en tu pipeline CI/CD. Puedes detener automáticamente una compilación, bloquear un despliegue y revertir un despliegue cuando un test Synthetic detecta una regresión.

## Configuración

### Instalar el paquete

{{< tabs >}}
{{% tab "NPM" %}}

Instala el paquete a través de NPM:

```bash
npm install --save-dev @datadog/datadog-ci
```

{{% /tab %}}
{{% tab "Yarn" %}}

Instala el paquete a través de Yarn:

```bash
yarn add --dev @datadog/datadog-ci
```

{{% /tab%}}
{{< /tabs >}}

### Configurar el cliente

Para configurar el cliente, es necesario configurar la API Datadog y las claves de la aplicación. Estas claves pueden definirse de tres formas diferentes:

1. Definidas en un [archivo de configuración global JSON](#global-configuration-file-options):

    ```json
    {
      "apiKey": "<API_KEY>",
      "appKey": "<APPLICATION_KEY>",
    }
    ```

2. Definidas como variables de entorno:

    ```bash
    export DATADOG_API_KEY="<API_KEY>"
    export DATADOG_APP_KEY="<APPLICATION_KEY>"
    ```

3. Trasladadas a la CLI al ejecutar tus tests:

    ```bash
    yarn datadog-ci synthetics run-tests --apiKey "<API_KEY>" --appKey "<APPLICATION_KEY>"
    ```

### Opciones de archivos de configuración global

El uso de un archivo de configuración global (Global Config) es una de las formas de configurar datadog-ci. Para ello, crea un archivo de configuración JSON en tu sistema. Especifica la ruta al archivo utilizando el indicador`--config` o configúralo mediante la variable de entorno `DATADOG_SYNTHETICS_CONFIG_PATH` [al iniciar los tests](#run-tests-command) o [al cargar una nueva aplicación](#upload-application-command). Si no especificas una ruta al archivo, Datadog busca un archivo con el nombre por defecto `datadog-ci.json`.

Consulta la lista de configuraciones de cada comando a continuación para ver la lista de opciones avanzadas del archivo de configuración global relevantes para cada [comando run-tests](#run-tests-command) y [comando upload-application](#upload-application-command). Para ver un archivo de configuración de ejemplo, consulta este [archivo`global-config-complete-example.json`][9].

Ejemplo:

```jsonc
{
  "apiKey": "<DATADOG_API_KEY>",
  "appKey": "<DATADOG_APPLICATION_KEY>",
  "batchTimeout": 180000,
  "datadogSite": "datadoghq.com", // You can use another Datadog site in https://docs.datadoghq.com/getting_started/site/. By default, requests are sent to Datadog US1.
  "defaultTestOverrides": {
    "allowInsecureCertificates": true,
    "basicAuth": {"username": "test", "password": "test"},
    "body": "{\"fakeContent\":true}",
    "bodyType": "application/json",
    "cookies": "name1=value1;name2=value2;",
    "setCookies": "name1=value1 \n name2=value2; Domain=example.com \n name3=value3; Secure; HttpOnly",
    "defaultStepTimeout": 15,
    "deviceIds": ["chrome.laptop_large"],
    "executionRule": "skipped",
    "followRedirects": true,
    "headers": {"NEW_HEADER": "NEW VALUE"},
    "locations": ["aws:us-east-1"],
    "mobileApplicationVersion": "01234567-8888-9999-abcd-efffffffffff",
    "mobileApplicationVersionFilePath": "path/to/application.apk",
    "retry": {"count": 2, "interval": 300},
    "startUrl": "{{URL}}?static_hash={{STATIC_HASH}}",
    "startUrlSubstitutionRegex": "s/(https://www.)(.*)/$1extra-$2/",
    "testTimeout": 300,
    "variables": {"NEW_VARIABLE": "NEW VARIABLE"}
  },
  "failOnCriticalErrors": true,
  "failOnMissingTests": true,
  "failOnTimeout": true,
  "files": ["{,!(node_modules)/**/}*.synthetics.json"],
  "proxy": {
    "auth": {
      "username": "login",
      "password": "pwd"
    },
    "host": "127.0.0.1",
    "port": 3128,
    "protocol": "http"
  },
  "subdomain": "subdomainname",
  "tunnel": true
}
```

### Variables de entorno

Además del archivo de configuración global, puedes configurar todas las propiedades utilizando variables de entorno. Si una propiedad está definida tanto en el archivo de configuración global como en una variable de entorno, esta última tiene prioridad.

Ejemplo:

```bash
export DATADOG_SITE=datadoghq.com
```

### Opciones de la línea de comandos

La CLI ofrece otra forma de definir opciones y configurar el comportamiento de datadog-ci. Estas opciones anularán el archivo de configuración global y las variables de entorno.

Ejemplo:

```bash
yarn datadog-ci synthetics run-tests --public-id pub-lic-id1
```

La prioridad de las 3 formas de configuración es la siguiente:

```yml
Global Config < Environment variables < CLI parameters
```

### Uso de datadog-ci como biblioteca

También puedes utilizar el paquete `datadog-ci` como biblioteca en tu aplicación Node.js para activar los tests. Para ello, importa el paquete del comando Synthetics `run-tests` y llama a la función `executeWithDetails()`.

``` javascript
import { synthetics } from '@datadog/datadog-ci'

const { results, summary } = await synthetics.executeTests(...)
```

### Uso de un proxy

Puedes configurar un proxy que se utilizará para las conexiones salientes a Datadog. Para ello, utiliza la clave `proxy` del archivo de configuración global o la variable de entorno `HTTPS_PROXY`.

**Nota**: Esta es la única excepción en la que el archivo de configuración global tiene prioridad sobre la variable de entorno. No existe una opción para configurar esto a través de la CLI.

Dado que la librería [`proxy-agent`][2] se utiliza para configurar el proxy, los protocolos compatibles incluyen `http`, `https`, `socks`, `socks4`, `socks4a`, `socks5`, `socks5h`, `pac+data`, `pac+file`, `pac+ftp`, `pac+http` y `pac+https`. La clave `proxy` del archivo de configuración global se pasa a una nueva instancia `proxy-agent`, lo que significa que se admite la misma configuración para la librería.

Para utilizar un proxy, primero tienes que configurar el certificado CA para que datadog-ci confíe en tu proxy. Puedes hacerlo configurando la variable de entorno `NODE_EXTRA_CA_CERTS` en la ruta de tu certificado CA. De lo contrario, podría producirse un error `unable to verify the first certificate`.

```bash
export NODE_EXTRA_CA_CERTS=/path/to/your-ca-cert.pem
```

Cuando se utiliza la configuración global, las claves `host` y `port` son argumentos obligatorios y la clave `protocol` pasa por defecto a `http` si no está definida.

Ejemplo:

```jsonc
{
  ...
  "proxy": {
    "auth": {
      "username": "login",
      "password": "pwd"
    },
    "host": "127.0.0.1",
    "port": 3128,
    "protocol": "http"
  },
  ...
}
```

El formato utilizado para la variable de entorno `HTTPS_PROXY` es `<protocol>://<username>:<password>@<host>:<port>`, tal y como se describe en la librería [proxy-from-env][13], que la [biblioteca `proxy-agent`][2] utiliza para analizar las variables de entorno.
Se utiliza la variable `HTTPS_PROXY`, en lugar de `HTTP_PROXY`, porque la API Datadog utiliza el protocolo HTTPS.

Ejemplo:

```bash
export HTTPS_PROXY=http://login:pwd@127.0.0.1:3128
```

Si quieres confirmar que se estás utilizando un proxy, puedes configurar la variable de entorno `DEBUG` como `proxy-agent` de la siguiente manera:

```bash
DEBUG=proxy-agent yarn datadog-ci synthetics run-tests
```

## Comando de ejecución de tests

Puedes decidir que la CLI detecte automáticamente todos tus tests Synthetic`**/*.synthetics.json` (consulta [archivos de tests](#test-files)) o especificar los tests que quieres ejecutar mediante el indicador `-p,--public-id`.

{{< tabs >}}
{{% tab "NPM" %}}

Ejecuta tests mediante la ejecución de la CLI a través de **NPM**:

Añade lo siguiente a tu `package.json`:

```json
{
  "scripts": {
    "datadog-ci-synthetics": "datadog-ci synthetics run-tests"
  }
}
```

A continuación, ejecuta:

```bash
npm run datadog-ci-synthetics
```

**Nota**: Si estás lanzando tus tests con un nombre de archivo personalizado para el [archivo de configuración global](#global-configuration-file-options), anexa `--config <CUSTOM_PATH_TO_GLOBAL_CONFIG_FILE>` al comando asociado a tu script `datadog-ci-synthetics`.

{{% /tab %}}
{{% tab "Hilo" %}}

Ejecuta tests mediante la ejecución de la CLI a través de **Yarn**:

El subcomando `run-tests` acepta el argumento `--public-id` (o su abreviatura `-p`) para activar sólo el test especificada. Puede definirse varias veces para ejecutar varios tests:

```bash
yarn datadog-ci synthetics run-tests --public-id pub-lic-id1 --public-id pub-lic-id2
```

También es posible activar los tests correspondientes a una consulta de búsqueda utilizando el argumento `--search` (o su abreviatura `-s`). Con esta opción, las anulaciones definidas en tu [archivo de configuración global](#global-configuration-file-options) se aplican a todos los tests detectados por la consulta de búsqueda.

```bash
yarn Datadog-ci synthetics run-tests -s 'etiquetar:e2e-tests'
```

Puedes utilizar `--files` (o su abreviatura `-f`) para anular el patrón glob predeterminado (que coincidiría con todos los archivos `**/*.synthetics.json`).

```bash
yarn datadog-ci synthetics run-tests -f ./component-1/**/*.synthetics.json -f ./component-2/**/*.synthetics.json
```

**Nota**: Si estás lanzando tus tests con un nombre de archivo personalizado para el [archivo de configuración global](#global-configuration-file-options), anexa `--config <CUSTOM_PATH_TO_GLOBAL_CONFIG_FILE>` al comando asociado a tu script `datadog-ci-synthetics`.

{{% /tab %}}
{{< /tabs >}}

### Lista de configuraciones

<!--
  Se conservan sus descripciones para mantener la coherencia de este documento - https://datadoghq.atlassian.net/wiki/spaces/SYN/pages/3378446383/Configuration+parameters+and+their+usages#Proposal-for-aligning-Descriptions-and-labels
  Si quieres actualizarlas, también actualiza el documento y las integraciones relevantes.
-->

#### `apiKey`

Clave de API utilizada para consultar la API Datadog.

**Opciones de configuración**

* Configuración global: `"apiKey": "<API_KEY>"`
* Variable de entorno: `DATADOG_API_KEY="<API_KEY>"`
* Parámetro de CLI: `--apiKey "<API_KEY>"`

#### `appKey`

Clave de aplicación utilizada para consultar la API Datadog.

**Opciones de configuración**

* Configuración global: `"appKey": "<APPLICATION_KEY>"`
* Variable de entorno: `DATADOG_APP_KEY="<APPLICATION_KEY>"`
* Parámetro de CLI: `--appKey "<APPLICATION_KEY>"`

#### `batchTimeout`

Duración (número entero en milisegundos) tras la cual `datadog-ci` deja de esperar resultados de tests. El valor predeterminado es 30 minutos. A nivel de CI, los resultados de los tests completados después de esta duración se consideran fallidos.

**Opciones de configuración**

* Configuración global: `"batchTimeout": 180000`
* Variable de entorno: `DATADOG_SYNTHETICS_BATCH_TIMEOUT=180000`
* Parámetro de CLI: `--batchTimeout 180000`

#### `configPath`

Ruta al archivo de configuración global. Para ver más detalles, consulta el [ejemplo de configuración](#global-configuration-file-options).

**Opciones de configuración**

* Configuración global: N/A
* Variable de entorno: `DATADOG_SYNTHETICS_CONFIG_PATH=global-config.json`
* Parámetro de CLI: `--config global-config.json`

#### `datadogSite`

Instancia de Datadog a la que se envía la solicitud. Por defecto es `datadoghq.com`. Tu sitio Datadog es {{< region-param key="dd_site" code="true" >}}.

**Opciones de configuración**

* Configuración global: `"datadogSite": "datadoghq.com"`
* Variable de entorno: `DATADOG_SITE=datadoghq.com`
* Parámetro de CLI: `--datadogSite datadoghq.com`

#### `defaultTestOverrides`

Anulaciones de tests Synthetic aplicadas a todos los tests.

**Opciones de configuración**

* Configuración global: consultar [anulaciones de tests](#test-overrides)
* Variable de entorno: todas las variables siguen el patrón `DATADOG_SYNTHETICS_OVERRIDE_...`
* Parámetro de CLI: todos los parámetros de CLI utilizan el patrón `--override option=value`

#### `failOnCriticalErrors`

Indicador booleano que genera la falla del trabajo CI si no se activa ningún test o si no fue posible recuperar resultados de Datadog. El valor predeterminado es `false`.

**Opciones de configuración**

* Configuración global: `"failOnCriticalErrors": true`
* Variable de entorno: `DATADOG_SYNTHETICS_FAIL_ON_CRITICAL_ERRORS=true`
* Parámetro de CLI: `--failOnCriticalErrors` / `--no-failOnCriticalErrors`

#### `failOnMissingTests`

Indicador booleano que genera la falla del trabajo CI si al menos un test especificado con un ID público (un argumento CLI `--public-id` o listado en un [archivo de test](#test-files)) falta en una ejecución (por ejemplo, si se eliminó programáticamente o en el sitio Datadog). El valor predeterminado es `false`.

**Opciones de configuración**

* Configuración global: `"failOnMissingTests": true`
* Variable de entorno: `DATADOG_SYNTHETICS_FAIL_ON_MISSING_TESTS=true`
* Parámetro de CLI: `--failOnMissingTests` / `--no-failOnMissingTests`

#### `failOnTimeout`

Indicador booleano que genera la falla del trabajo CI si al menos un test excede el tiempo de espera por defecto del lote. El valor predeterminado es `true`.

**Opciones de configuración**

* Configuración global: `"failOnTimeout": true`
* Variable de entorno: `DATADOG_SYNTHETICS_FAIL_ON_TIMEOUT=true`
* Parámetro de CLI: `--failOnTimeout` / `--no-failOnTimeout`

#### `files`

Patrones globales para detectar [archivos de configuración de tests](#test-files) de Synthetic.

**Opciones de configuración**

* Configuración global: `"files": ["{,!(node_modules)/**/}*.synthetics.json"]`
* Variable de entorno: `DATADOG_SYNTHETICS_FILES="{,!(node_modules)/**/}*.synthetics.json"`
* Parámetro CLI: `-f "{,!(node_modules)/**/}*.synthetics.json"` / `--files "{,!(node_modules)/**/}*.synthetics.json"`

#### `jUnitReport`

Nombre de archivo de un informe JUnit, si quieres generar uno. El archivo creado será un archivo XML.

**Opciones de configuración**

* Configuración global: `"jUnitReport": "e2e-test-junit.xml"`
* Variable de entorno: `DATADOG_SYNTHETICS_JUNIT_REPORT="e2e-test-junit.xml"`
* Parámetro CLI:`-j "e2e-test-junit.xml"` / `--jUnitReport "e2e-test-junit.xml"`

#### `mobileApplicationVersionFilePath`

Anula la versión de la aplicación para todos los tests de aplicaciones móviles Synthetic.

**Opciones de configuración**

* Configuración global: `"mobileApplicationVersionFilePath": "path/to/application.apk"`
* Variable de entorno: No disponible
* Parámetro de CLI: `--mobileApp "path/to/application.apk"` / `--mobileApplicationVersionFilePath "path/to/application.apk"`

#### `proxy`

Proxy que se va a utilizar para las conexiones salientes a Datadog. Las claves `host` y `port` son argumentos obligatorios, la clave `protocol` por defecto es `http`. Los valores compatibles para la clave `protocol` son `http`, `https`, `socks`, `socks4`, `socks4a`, `socks5`, `socks5h`, `pac+data`, `pac+file`, `pac+ftp`, `pac+http` y `pac+https`. La librería utilizada para configurar el proxy es la librería [proxy-agent][2].

**Opciones de configuración**

* Configuración global: para ver un ejemplo, consulta [Utilizar un proxy](#use-a-proxy).
* Variable de entorno: `HTTPS_PROXY=http://login:pwd@127.0.0.1:3128`
* Parámetro de CLI: N/A

#### `publicIds`

Lista de ID de los tests Synthetic que quieres activar.

**Opciones de configuración**

* Configuración global: `"publicIds": ["abc-def-ghi", "123-456-789"]`
* Variable de entorno: `DATADOG_SYNTHETICS_PUBLIC_IDS="abc-def-ghi;123-456-789"`
* Parámetro de CLI: `-p "abc-def-ghi" --public-id "123-456-789"`

#### `selectiveRerun`

Indicador booleano para ejecutar sólo los tests que fallaron en los lotes de tests anteriores. Por defecto, se utiliza la [configuración por defecto de la organización](https://app.datadoghq.com/synthetics/settings/continuous-testing). Utiliza el indicador CLI `--no-selectiveRerun` o `selectiveRerun: false` para forzar una ejecución completa.

**Opciones de configuración**

* Configuración global: `"selectiveRerun": true`
* Variable de entorno: `DATADOG_SYNTHETICS_SELECTIVE_RERUN=true`
* Parámetro de CLI: `--selectiveRerun` / `--no-selectiveRerun`

#### `subdomain`

Nombre del subdominio personalizado configurado para acceder a tu aplicación Datadog. Si la URL utilizada para acceder a Datadog es `myorg.datadoghq.com`, el valor del `subdomain` debe configurarse en `myorg`.

**Opciones de configuración**

* Configuración global: `"subdomain": "myorg"`
* Variable de entorno: `DATADOG_SUBDOMAIN="myorg"`
* Parámetro de CLI: `--subdomain "myorg"`

#### `testSearchQuery`

Pasa una consulta para seleccionar los tests Synthetic que se van a ejecutar.

La sintaxis de esta consulta es la misma que la que se utiliza en la [barra de búsqueda de la página de la lista de tests Synthetic][14].
Puedes crear la consulta en la interfaz de usuario y, a continuación, copiarla y pegarla en la línea de comandos entre comillas simples.

Ejemplo de consulta con una faceta, una etiqueta (tag) `value` y una etiqueta `<KEY>:<VALUE>`:

```
datadog-ci synthetics run-tests --search 'team:unicorn tag:e2e-tests tag:"managedBy:terraform"'
```

**Opciones de configuración**

* Configuración global: `"testSearchQuery": "tag:e2e-tests"`
* Variable de entorno: `DATADOG_SYNTHETICS_TEST_SEARCH_QUERY="tag:e2e-tests"`
* Parámetro de CLI: `-s "tag:e2e-tests"` / `--search "tag:e2e-tests"`

#### `tunnel`

Utiliza [entornos locales y de staging](#use-local-and-staging-environments) para ejecutar tu lote de tests.

**Opciones de configuración**

* Configuración global: `"tunnel": true`
* Variable de entorno: `DATADOG_SYNTHETICS_TUNNEL=true`
* Parámetro de CLI: `-t` / `--tunnel` / `--no-tunnel`

### Anulaciones de tests

Todas las anulaciones de tests son opcionales y permiten anular la configuración de test almacenada en Datadog.

Estas anulaciones pueden aplicarse a todos los tests con `defaultTestOverrides` en el [archivo de configuración global](#global-configuration-file-options) o a algunos tests específicos con `testOverrides` en un [archivo de configuración de tests](#test-files).

Estas opciones también pueden definirse con variables de entorno que empiecen por `DATADOG_SYNTHETICS_OVERRIDE_...` o con el parámetro de CLI `--override` siguiendo este patrón: `--override option=value`.

#### `allowInsecureCertificates` (booleano)

Desactiva los checks de certificados en tests de API y de navegador Synthetic.

**Opciones de configuración**

* Configuración global/de tests: `"allowInsecureCertificates": true`
* Variable de entorno: `DATADOG_SYNTHETICS_OVERRIDE_ALLOW_INSECURE_CERTIFICATES=true`
* Parámetro de CLI: `--override allowInsecureCertificates=true`

#### `basicAuth` (objeto)

Credenciales que se deben proporcionar si se requiere la autenticación básica.

* `username` (cadena): Nombre de usuario para la autenticación básica.
* `password` (cadena): Contraseña para la autenticación básica.

**Opciones de configuración**

* Configuración global/de tests: `"basicAuth": {"username": "test_username", "password": "test_password"}`
* Variable de entorno:
  * `DATADOG_SYNTHETICS_OVERRIDE_BASIC_AUTH_USERNAME=test_username`
  * `DATADOG_SYNTHETICS_OVERRIDE_BASIC_AUTH_PASSWORD=test_password`
* Parámetro de CLI:
  * `--override basicAuth.username=test_username`
  * `--override basicAuth.password=test_password`

#### `body` (cadena)

Datos que se deben enviar en un test de API.

**Opciones de configuración**

* Configuración global/de tests: `"body": "{\"fakeContent\":true}"`
* Variable de entorno: `DATADOG_SYNTHETICS_OVERRIDE_BODY={"fakeContent":true}`
* Parámetro de CLI: `--override body={"fakeContent":true}`

#### `bodyType` (cadena)

Tipo de contenido de los datos que se deben enviar en un test de API.

**Opciones de configuración**

* Configuración global/de tests: `"bodyType": "application/json"`
* Variable de entorno: `DATADOG_SYNTHETICS_OVERRIDE_BODY_TYPE=application/json`
* Parámetro de CLI: `--override bodyType=application/json`

#### `cookies` (cadena u objeto)

Utiliza la cadena proporcionada como cabecera de cookie en un test de API o de navegador (además de ella o para sustituirla).

* Si se trata de una cadena, se utiliza para reemplazar las cookies originales.
* Si se trata de un objeto, el formato debe ser `{append?: boolean, value: string}` y, dependiendo del valor de `append`, se añade o sustituye a las cookies originales.

**Opciones de configuración**

* Configuración global/de tests: `"cookies": "name1=value1;name2=value2"` (equivalente a `"append": false`) o `"cookies": {"append": true, "value": "name1=value1;name2=value2"}`
* Variable de entorno:
  * `DATADOG_SYNTHETICS_OVERRIDE_COOKIES="name1=value1;name2=value2"`
  * `DATADOG_SYNTHETICS_OVERRIDE_COOKIES_APPEND=true`
* Parámetro de CLI:
  * `--override cookies="name1=value1;name2=value2"`
  * `--override cookies.append=true`

#### `setCookies` (cadena u objeto)

Utiliza la cadena proporcionada como cabecera de set-cookie sólo en un test de navegador (además de ella o para sustituirla).

* Si se trata de una cadena, se utiliza para reemplazar las set-cookies originales.
* Si se trata de un objeto, el formato debe ser `{append?: boolean, value: string}` y, dependiendo del valor de `append`, se añade o sustituye a las set-cookies originales.

**Opciones de configuración**

* Configuración global/de tests: `"setCookies": "name1=value1 \n name2=value2; Domain=example.com \n name3=value3; Secure; HttpOnly"` (equivalente a `"append": false`) o `"setCookies": {"append": true, "value": "setCookies": "name1=value1 \n name2=value2; Domain=example.com \n name3=value3; Secure; HttpOnly"}`
* Variable de entorno:
  * `DATADOG_SYNTHETICS_OVERRIDE_SET_COOKIES="name1=value1;name2=value2"`
  * `DATADOG_SYNTHETICS_OVERRIDE_SET_COOKIES_APPEND=true`
* Parámetro de CLI:
  * `--override setCookies="setCookies": "name1=value1 \n name2=value2; Domain=example.com \n name3=value3; Secure; HttpOnly"`
  * `--override setCookies.append=true`

#### `defaultStepTimeout` (número)

Duración máxima de los pasos en segundos de los tests de navegador, que no anula los tiempos de espera de los pasos configurados individualmente.

**Opciones de configuración**

* Configuración global/de tests: `"defaultStepTimeout": 15`
* Variable de entorno: `DATADOG_SYNTHETICS_OVERRIDE_DEFAULT_STEP_TIMEOUT=15`
* Parámetro de CLI: `--override defaultStepTimeout=15`

#### `deviceIds` (matriz)

Lista de dispositivos en los que ejecutar el test de navegador. Los valores que puede tomar se pueden encontrar en la [documentación de Datadog Synthetics Terraform][11].

**Opciones de configuración**

* Configuración global/de tests: `"deviceIds": ["chrome.laptop_large", "firefox.tablet"]`
* Variable de entorno: `DATADOG_SYNTHETICS_OVERRIDE_DEVICE_IDS="chrome.laptop_large;firefox.tablet"`
* Parámetro de CLI: `--override deviceIds="chrome.laptop_large;firefox.tablet"`

#### `executionRule` (cadena)

La regla de ejecución del test define el comportamiento de la CLI en caso de que falle el test.
Acepta uno de los siguientes valores:

* `blocking`: La CLI devuelve un error si el test falla.
* `non_blocking`: La CLI sólo imprime una advertencia si el test falla.
* `skipped`: El test no se ejecuta en absoluto.

**Opciones de configuración**

* Configuración global/de tests: `"executionRule": "skipped"`
* Variable de entorno: `DATADOG_SYNTHETICS_OVERRIDE_EXECUTION_RULE=skipped`
* Parámetro de CLI: `--override executionRule=skipped`

#### `followRedirects` (booleano)

Indica si se deben seguir o no las redirecciones HTTP en los tests de la API Synthetic.

**Opciones de configuración**

* Configuración global/de tests: `"followRedirects": true`
* Variable de entorno: `DATADOG_SYNTHETICS_OVERRIDE_FOLLOW_REDIRECTS=true`
* Parámetro de CLI: `--override followRedirects=true`

#### `headers` (objeto)

Este objeto especifica las cabeceras que se van a sustituir en el test. Debe tener claves que representen los nombres de las cabeceras que se van a sustituir y valores que indiquen los nuevos valores de las cabeceras.

**Opciones de configuración**

* Configuración global/de tests: `"headers": {"NEW_HEADER_1": "NEW VALUE 1", "NEW_HEADER_2": "NEW VALUE 2"}`
* Variable de entorno: `DATADOG_SYNTHETICS_OVERRIDE_HEADERS='{"NEW_HEADER_1":"NEW VALUE 1", "NEW_HEADER_2":"NEW VALUE 2"}'` (**Nota**: Debe ser un JSON válido)
* Parámetro de CLI:
  * `--override headers.NEW_HEADER_1="NEW VALUE 1"`
  * `--override headers.NEW_HEADER_2="NEW VALUE 2"`

#### `locations` (matriz)

Lista de localizaciones desde las que ejecutar el test. Los valores específicos que puede aceptar para tu organización se pueden encontrar [aquí][12].

**Opciones de configuración**

* Configuración global/de tests:
 `"locations": ["aws:us-east-1", "gcp:europe-west3"]`

* Variable de entorno: `DATADOG_SYNTHETICS_OVERRIDE_LOCATIONS="aws:us-east-1;gcp:europe-west3"`
* Parámetro de CLI: `--override locations="aws:us-east-1;gcp:europe-west3"`

#### `mobileApplicationVersion` (cadena)

Anula la versión predeterminada de la aplicación móvil para un test de aplicación móvil Synthetic. La versión debe estar cargada y disponible en Datadog.

**Opciones de configuración**

* Configuración global/de tests: `"mobileApplicationVersion": "01234567-8888-9999-abcd-efffffffffff"`

* Variable de entorno: `DATADOG_SYNTHETICS_OVERRIDE_MOBILE_APPLICATION_VERSION=01234567-8888-9999-abcd-efffffffffff`
* Parámetro de CLI: `--mobileApplicationVersion=01234567-8888-9999-abcd-efffffffffff`

#### `mobileApplicationVersionFilePath` (cadena)

Anula la versión de la aplicación para un test de aplicaciones móviles Synthetic.

**Opciones de configuración**

* Configuración global/de tests: `"mobileApplicationVersionFilePath": "path/to/application.apk"`

* Variable de entorno: No disponible
* Parámetro de CLI: `--mobileApplicationVersionFilePath=path/to/application.apk`

#### `resourceUrlSubstitutionRegexes` (matriz)

Matriz de patrones de expresión regular para modificar las URL de recursos del test. Esto puede ser útil para cambiar dinámicamente las URL de los recursos durante la ejecución del test.

Cada patrón de expresión regular debe tener el formato:

* **`your_regex|your_substitution`**: Sintaxis basada en pipelines, para evitar cualquier conflicto con los caracteres / de las URL. Por ejemplo, `https://example.com(.*)|http://subdomain.example.com$1` para transformar `https://example.com/resource` en `http://subdomain.example.com/resource`.
* **`s/your_regex/your_substitution/modifiers`**: Sintaxis de la barra oblicua, que admite modificadores. Por ejemplo, `s/(https://www.)(.*)/$1staging-$2/` para transformar `https://www.example.com/resource` en `https://www.staging-example.com/resource`.

**Opciones de configuración**

* Configuración global/de tests:
 `"resourceUrlSubstitutionRegexes": ["(https://www.)(.*)|$1staging-$2"]`

* Variable de entorno: `DATADOG_SYNTHETICS_OVERRIDE_RESOURCE_URL_SUBSTITUTION_REGEXES='(https://www.)(.*)|$1staging-$2'`
* Parámetro de CLI: `--override resourceUrlSubstitutionRegexes='(https://www.)(.*)|$1staging-$2'`

#### `retry` (objeto)

Política de reintento del test. Los 2 atributos posibles para este objeto son independientes:

* `count` (número entero): Número de intentos que se van a realizar en caso de fallo del test.
* `interval` (número entero): Intervalo entre intentos en milisegundos.

**Opciones de configuración**

* Configuración global/de tests: `"retry": {"count": 2, "interval": 300}`
* Variable de entorno:
  * `DATADOG_SYNTHETICS_OVERRIDE_RETRY_COUNT=2`
  * `DATADOG_SYNTHETICS_OVERRIDE_RETRY_INTERVAL=300`
* Parámetro de CLI:
  * `--override retry.count=2`
  * `--override retry.interval=300`

#### `startUrl` (cadena)

Nueva URL de inicio que se proporcionará al test. Se sustituyen las variables especificadas entre corchetes (por ejemplo, `{{ EXAMPLE }}`) que se encuentran en las variables de entorno.

**Opciones de configuración**

* Configuración global/de tests: `"startUrl": "{{URL}}?static_hash={{STATIC_HASH}}"`

* Variable de entorno: `DATADOG_SYNTHETICS_OVERRIDE_START_URL="{{URL}}?static_hash={{STATIC_HASH}}"`
* Parámetro de CLI: `--override startUrl="{{URL}}?static_hash={{STATIC_HASH}}"`

#### `startUrlSubstitutionRegex` (cadena)

Expresión regular para modificar la URL de inicio del test (sólo para tests de navegador y HTTP), tanto si la proporcionó el test original o la URL de inicio de anulación de la configuración.

Si la URL contiene variables, esta expresión regular se aplica después de la interpolación de las variables.

Hay dos formatos posibles:

* **`your_regex|your_substitution`**: Sintaxis basada en pipelines, para evitar cualquier conflicto con los caracteres / de las URL. Por ejemplo, `https://example.com(.*)|http://subdomain.example.com$1` para transformar `https://example.com/test` en `http://subdomain.example.com/test`.
* **`s/your_regex/your_substitution/modifiers`**: Sintaxis de la barra oblicua, que admite modificadores. Por ejemplo, `s/(https://www.)(.*)/$1extra-$2/` para transformar `https://www.example.com` en `https://www.extra-example.com`.

**Opciones de configuración**

* Configuración global/de tests: `"startUrlSubstitutionRegex": "(https://www.)(.*)|$1extra-$2"`
* Variable de entorno: `DATADOG_SYNTHETICS_OVERRIDE_START_URL_SUBSTITUTION_REGEX='(https://www.)(.*)|$1extra-$2'`
* Parámetro de CLI: `--override startUrlSubstitutionRegex='(https://www.)(.*)|$1extra-$2'`

#### `testTimeout` (número)

Duración máxima de un test de navegador en segundos.

**Opciones de configuración**

* Configuración global/de tests: `"testTimeout": 300`
* Variable de entorno: `DATADOG_SYNTHETICS_OVERRIDE_TEST_TIMEOUT=300`
* Parámetro de CLI: `--override testTimeout=300`

#### `variables` (objeto)

Este objeto define las variables que se van a sustituir en el test. Debe incluir claves correspondientes a los nombres de las variables que se van a sustituir y valores que representen los nuevos valores de estas variables.

**Opciones de configuración**

* Configuración global/de tests: `"variables": {"NEW_VARIABLE_1": "NEW VARIABLE 1", "NEW_VARIABLE_2": "NEW VARIABLE 2"}`
* Variable de entorno: `DATADOG_SYNTHETICS_OVERRIDE_VARIABLES='{"NEW_VARIABLE_1":"NEW VARIABLE 1", "NEW_VARIABLE_2":"NEW VARIABLE 2"}'`(**Nota**: Debe ser un JSON válido)
* Parámetro de CLI:
  * `--override variables.NEW_VARIABLE_1="NEW VARIABLE 1"`
  * `--override variables.NEW_VARIABLE_2="NEW VARIABLE 2"`

### Configurar una URL de inicio

Para configurar en qué URL comienza tu test, proporciona una `startUrl` a tu objeto de test. Crea tu propia URL de inicio con cualquier parte de la URL de inicio original de tu test e incluye variables de entorno.

### Configurar un subdominio personalizado

Si la organización utiliza un subdominio personalizado para acceder a Datadog, es necesario definirlo en la variable de entorno `DATADOG_SUBDOMAIN` o en el archivo de configuración global bajo la clave `subdomain` para mostrar correctamente la URL de resultados del test.

Por ejemplo, si la URL utilizada para acceder a Datadog es `myorg.datadoghq.com`, configura la variable entorno como `myorg`:

```bash
export DATADOG_SUBDOMAIN="myorg"
```

### Configurar localizaciones personalizadas

Puedes utilizar `DATADOG_SYNTHETICS_OVERRIDE_LOCATIONS` para anular las localizaciones en que se ejecutan tus tests. Las localizaciones deben separarse con un punto y coma (`;`). La configuración de los [archivos de tests](#test-files) tiene prioridad sobre otras anulaciones.

```bash
export DATADOG_SYNTHETICS_OVERRIDE_LOCATIONS="aws:us-east-1;aws:us-east-2"
```

### Archivos de tests

Los archivos de configuración de tests (Test Config) te permiten personalizar tests individuales o configurar varias ejecuciones del mismo test con diferentes parámetros, más allá de lo que puedas hacer con otros métodos de configuración.

Encontrarás una lista de todas estas opciones en la sección de [anulaciones de tests](#test-overrides).

Estos archivos tienen prioridad sobre los archivos de configuración global, las variables de entorno y los parámetros de CLI. El orden de prioridad, incluidas las configuraciones de tests, es el siguiente:

``` yml
Global Config < Environment variables < CLI parameters < Test Config
```

Para determinar qué tests deben ejecutarse, una o varias de esas opciones pueden pasarse a `datadog-ci`:
- La [opción `files`](#files)
- La [opción `publicIds`](#publicids)
- La [opción `testSearchQuery`](#testsearchquery)

Si no se pasa ninguna de estas opciones, `datadog-ci` detecta automáticamente los archivos de configuración de tests con el patrón glob `{,!(node_modules)/**/}*.synthetics.json` (todos los archivos que terminan en `.synthetics.json`, excepto los de la carpeta `node_modules`).

**Nota**: El archivo de búsqueda se inicia desde el directorio de trabajo actual, por lo que puede ser lento si el comando se ejecuta desde un directorio grande, como una carpeta de inicio. Si el comando de búsqueda de archivos es demasiado lento, considera:
- Utilizar las opciones anteriores para especificar los tests (esto desactivará la búsqueda de archivos),
- O refinar el patrón glob con la [opción `files`](#files).
  - Por ejemplo, utilizando `*` en lugar de `**` o añadiendo una carpeta específica al patrón.

`<TEST_PUBLIC_ID>` puede ser el identificador del test que se encuentra en la URL de una página de información de un test (por ejemplo, para `https://app.datadoghq.com/synthetics/details/abc-def-ghi`, sería `abc-def-ghi`) o la URL completa de la página de información (por ejemplo, directamente `https://app.datadoghq.com/synthetics/details/abc-def-ghi`).

Ejemplo:

```jsonc
// myTest.synthetics.json
{
  "tests": [
    {
      "id": "<TEST_PUBLIC_ID_1>",
      "testOverrides": {
        "allowInsecureCertificates": true,
        "basicAuth": {"username": "test", "password": "test"},
        "body": "{\"fakeContent\":true}",
        "bodyType": "application/json",
        "cookies": "name1=value1;name2=value2;",
        "defaultStepTimeout": 15,
        "deviceIds": ["chrome.laptop_large"],
        "executionRule": "skipped",
        "followRedirects": true,
        "headers": {"NEW_HEADER": "NEW VALUE"},
        "locations": ["aws:us-east-1"],
        "mobileApplicationVersion": "01234567-8888-9999-abcd-efffffffffff",
        "mobileApplicationVersionFilePath": "path/to/application.apk",
        "retry": {"count": 2, "interval": 300},
        "startUrl": "{{URL}}?static_hash={{STATIC_HASH}}",
        "startUrlSubstitutionRegex": "s/(https://www.)(.*)/$1extra-$2/",
        "testTimeout": 300,
        "variables": {"MY_VARIABLE": "new title"}
      }
    },
    {
      "id": "<TEST_PUBLIC_ID_2>",
      "testOverrides": {
        "allowInsecureCertificates": true,
        ...
        "variables": {"MY_VARIABLE": "new title"}
      }
    }
  ]
}
```

## Comando de carga de la aplicación

Este comando carga una nueva versión a una aplicación móvil **existente**.

### Lista de configuraciones

<!--
  Se conservan sus descripciones para mantener la coherencia de este documento - https://datadoghq.atlassian.net/wiki/spaces/SYN/pages/3378446383/Configuration+parameters+and+their+usages#Proposal-for-aligning-Descriptions-and-labels
  Si quieres actualizarlas, también actualiza el documento y las integraciones relevantes.
-->

#### `apiKey`

Clave de API utilizada para consultar la API Datadog.

**Opciones de configuración**

* Configuración global: `"apiKey": "<API_KEY>"`
* Variable de entorno: `DATADOG_API_KEY="<API_KEY>"`
* Parámetro de CLI: `--apiKey "<API_KEY>"`

#### `appKey`

Clave de aplicación utilizada para consultar la API Datadog.

**Opciones de configuración**

* Configuración global: `"appKey": "<APPLICATION_KEY>"`
* Variable de entorno: `DATADOG_APP_KEY="<APPLICATION_KEY>"`
* Parámetro de CLI: `--appKey "<APPLICATION_KEY>"`

#### `configPath`

Ruta al archivo de configuración global. Para ver más detalles, consulta el [ejemplo de configuración](#global-configuration-file-options).

**Opciones de configuración**

* Configuración global: N/A
* Variable de entorno: `DATADOG_SYNTHETICS_CONFIG_PATH=global-config.json`
* Parámetro de CLI: `--config global-config.json`

#### `datadogSite`

Instancia de Datadog a la que se envía la solicitud. Por defecto es `datadoghq.com`. Tu sitio Datadog es {{< region-param key="dd_site" code="true" >}}.

**Opciones de configuración**

* Configuración global: `"datadogSite": "datadoghq.com"`
* Variable de entorno: `DATADOG_SITE=datadoghq.com`
* Parámetro de CLI: `--datadogSite datadoghq.com`

#### `latest`

Si está presente, marca la aplicación como "más reciente". Cualquier test que se ejecute en la última versión utilizará esta versión en su próxima ejecución.

**Opciones de configuración**

* Configuración global: `"latest": true`
* Variable de entorno: `DATADOG_SYNTHETICS_LATEST=true`
* Parámetro de CLI: `--latest` / `--no-latest`

#### `mobileApplicationId`

ID de la aplicación a la que quieres cargar la nueva versión.

**Opciones de configuración**

* Configuración global: `"mobileApplicationId": "123-123-123"`
* Variable de entorno: `DATADOG_SYNTHETICS_MOBILE_APPLICATION_ID=123-123-123`
* Parámetro de CLI: `--mobileApplicationId 123-123-123`

#### `mobileApplicationVersionFilePath`

Ruta a tu aplicación móvil (`.apk` o `.ipa`).

**Opciones de configuración**

* Configuración global: `"mobileApplicationVersionFilePath": example/test.apk`
* Variable de entorno: No disponible
* Parámetro de CLI: `--mobileApplicationVersionFilePath example/test.apk`

#### `proxy`

Proxy que se va a utilizar para las conexiones salientes a Datadog. Las claves `host` y `port` son argumentos obligatorios, la clave `protocol` por defecto es `http`. Los valores compatibles para la clave `protocol` son `http`, `https`, `socks`, `socks4`, `socks4a`, `socks5`, `socks5h`, `pac+data`, `pac+file`, `pac+ftp`, `pac+http` y `pac+https`. La librería utilizada para configurar el proxy es la librería [proxy-agent][2].

**Opciones de configuración**

* Configuración global: para ver un ejemplo, consulta [Utilizar un proxy](#use-a-proxy).
* Variable de entorno: N/A
* Parámetro de CLI: N/A

#### `versionName`

Nombre de la nueva versión. Tiene que ser único.

**Opciones de configuración**

* Configuración global: `"versionName": "example"`
* Variable de entorno: `DATADOG_SYNTHETICS_VERSION_NAME=example`
* Parámetro de CLI: `--versionName example`

Ejemplo:

```bash
datadog-ci synthetics upload-application                \
  --mobileApplicationId '123-123-123'                   \
  --mobileApplicationVersionFilePath example/test.apk   \
  --versionName 'example 1.0'                           \
  --latest
```

### Uso del archivo de configuración global

También puedes pasar estas opciones en un archivo de configuración:

```json
{
  "apiKey": "<DATADOG_API_KEY>",
  "appKey": "<DATADOG_APPLICATION_KEY>",
  "mobileApplicationVersionFilePath": "example_path/example_app.apk",
  "mobileApplicationId": "example-abc",
  "versionName": "example",
  "latest": true
}
```

Estas opciones también pueden añadirse al mismo archivo de configuración global utilizado para el comando run-tests.

Pasa este archivo de configuración al comando con el indicador `--config`:

```bash
datadog-ci synthetics upload-application --config global-config.json
```

El nombre de archivo predeterminado para el [archivo de configuración global](#global-configuration-file-options) es `datadog-ci.json`. Si utilizas este nombre para tu archivo de configuración global, puedes omitir el indicador `--config`.

## Uso de entornos locales y de staging

Puedes combinar anulaciones de variables con [entornos locales y de staging][3] para ejecutar tests dentro de tu entorno de desarrollo. Esta conexión garantiza que todas las solicitudes de tests enviadas a través de la CLI se enrutan automáticamente a través del cliente `datadog-ci`.

Esto te permite ejecutar tests con cifrado de extremo a extremo en cada etapa del ciclo de vida de desarrollo de tu software, desde los entornos de preproducción hasta tu sistema de producción.

## Procesos de test de extremo a extremo

Para verificar que el comando Synthetics funciona como se espera, ejecuta un test y comprueba que devuelve 0:

```bash
export DATADOG_API_KEY='<API_KEY>'
export DATADOG_APP_KEY='<APPLICATION_KEY>'

yarn datadog-ci synthetics run-tests --public-id abc-def-ghi
```

Un resultado correcto debería verse así:

```bash
[abc-def-ghi] Trigger test "Check on testing.website"
[abc-def-ghi] Waiting results for "Check on testing.website"


=== REPORT ===
Took 11546ms

✓ [abc-def-ghi] | Check on testing.website
  ✓ location: Frankfurt (AWS)
    ⎋  total duration: 28.9 ms - result url: https://app.datadoghq.com/synthetics/details/abc-def-ghi?resultId=123456789123456789
    ✓ GET - https://testing.website
```

### Reporteros

Se admiten dos reporteros de forma predefinida:

1. `stdout`
2. JUnit

Para habilitar el informe JUnit, pasa el `--jUnitReport` (o su abreviatura `-j`) en tu comando, especificando un nombre de archivo para tu informe XML JUnit.

```bash
yarn datadog-ci synthetics run-tests -s 'tag:e2e-tests' --config global-config.json --jUnitReport e2e-test-junit
```

Los reporteros pueden engancharse al `MainReporter` del comando.

### Hooks disponibles

| Nombre del hook        | Parámetros                                                                                      | Descripción                                                     |
| :--------------- | :---------------------------------------------------------------------------------------------- | :-------------------------------------------------------------- |
| `log`            | `(log: string)`                                                                                 | Llamada para la generación de logs.                                             |
| `error`          | `(error: string)`                                                                               | Llamada cuando se produce un error.                                |
| `initErrors`     | `(errors: string[])`                                                                            | Llamada cuando se produce un error durante la fase de análisis de tests. |
| `testTrigger`    | `(test: Test, testId: string, executionRule: ExecutionRule, testOverrides: UserConfigOverride)` | Llamada cuando se activa un test.                                |
| `testWait`       | `(test: Test)`                                                                                  | Llamada cuando un test está esperando recibir sus resultados.           |
| `testsWait`      | `(tests: Test[], baseUrl: string, batchId: string, skippedCount?: number)`                      | Llamada cuando todas las pruebas están a la espera de recibir sus resultados.     |
| `resultReceived` | `(result: ResultInBatch)`                                                                       | Llamada cuando se recibe un resultado.                               |
| `resultEnd`      | `(result: Result, baseUrl: string)`                                                             | Llamada para cada resultado al final de todos los resultados.               |
| `reportStart`    | `(timings: {startTime: number})`                                                                | Llamada al inicio del informe.                              |
| `runEnd`         | `(summary: Summary, baseUrl: string, orgSettings?: SyntheticsOrgSettings)`                      | Llamada al final de la ejecución.                                   |

## Ver los resultados de los tests

Puedes ver los resultados de los lotes de CI haciendo clic en un lote en el [Explorador de resultados de tests y monitorización Synthetic][4] o haciendo clic en un test en la página [**Tests**][5].

También puedes ver el resultado de las ejecuciones de tests directamente en tu CI a medida que se ejecutan tus tests. Para identificar la causa del fallo de un test, consulta los logs de ejecución y busca las causas de la aserción fallida.

```bash
  yarn datadog-ci synthetics run-tests --config global-config.json
  yarn run v1.22.4
  $ /Users/demo.user/go/src/github.com/Datadog/tmp/test/testDemo/node_modules/.bin/datadog-ci synthetics run-tests --config global-config.json
  Finding files matching /Users/demo.user/go/src/github.com/Datadog/tmp/test/testDemo/{,!(node_modules)/**/}*.synthetics.json

  Got test files:
    - user.synthetics.json

  [2cj-h3c-39x] Trigger test "Test CI connection"
  [2cj-h3c-39x] Waiting results for "Test CI connection"

  === REPORT ===
  Took 2242ms

  x  [2cj-h3c-39x] | Test CI connection
    * location: 30019
      ⎋ total duration: 32.6 ms - result url: https://app.datadoghq.com/synthetics/details/2cj-h3c-39x?resultId=122140688175981634
      x GET - https://www.datadoghq.com
        [INCORRECT_ASSUMPTION] - [{"index":1,"operator":"is","property":"content-type","type":"header","target":"text/html","valid":false,"actual":"text/html"; charset=utf-8"}]
  error Command failed with exit code 1.
  info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

* [Utiliza GitHub Action de Datadog para añadir tests continuos a tus flujos de trabajo][6].
* [Más información sobre Continuous Testing y CI/CD][7]
* [Más información sobre tests de aplicaciones móviles][10]
* [Más información sobre el Explorador de resultados de tests y monitorización Synthetic][8]
* [Más información sobre los tests de entornos locales y de staging][3]

[1]: https://www.npmjs.com/package/@datadog/datadog-ci
[2]: https://github.com/TooTallNate/proxy-agents/tree/main/packages/proxy-agent
[3]: https://docs.datadoghq.com/es/continuous_testing/environments/
[4]: https://app.datadoghq.com/synthetics/explorer/
[5]: https://app.datadoghq.com/synthetics/tests
[6]: https://www.datadoghq.com/blog/datadog-github-action-synthetics-ci-visibility/
[7]: https://docs.datadoghq.com/es/continuous_testing/cicd_integrations/
[8]: https://docs.datadoghq.com/es/continuous_testing/explorer/
[9]: https://github.com/DataDog/datadog-ci/blob/master/src/commands/synthetics/examples/global-config-complete-example.json
[10]: https://docs.datadoghq.com/es/mobile_app_testing/
[11]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test#device_ids
[12]: https://app.datadoghq.com/api/v1/synthetics/locations?only_public=true
[13]: https://www.npmjs.com/package/proxy-from-env#external-resources
[14]: https://app.datadoghq.com/synthetics/tests

<!--
  Esta página proviene de un solo origen:
  https://github.com/DataDog/documentation/blob/7007931530baf7da59310e7224a26dc9a71c53c5/local/bin/py/build/configurations/pull_config_preview.yaml#L315
-->
