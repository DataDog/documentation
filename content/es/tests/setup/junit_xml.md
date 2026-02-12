---
aliases:
- /es/continuous_integration/setup_tests/junit_upload
- /es/continuous_integration/tests/junit_upload
- /es/continuous_integration/tests/setup/junit_xml
code_lang: junit_xml
code_lang_weight: 60
further_reading:
- link: /continuous_integration/tests
  tag: Documentación
  text: Exploración de los resultados de tests y del rendimiento
- link: /continuous_integration/troubleshooting/
  tag: Documentación
  text: Solucionar problemas de CI Visibility
title: Carga de archivos de informes de tests JUnit en Datadog
type: lenguaje de código múltiple
---

<div class="alert alert-danger">
 <strong>Nota</strong>: Datadog recomienda la instrumentación nativa de los tests sobre la carga de archivos XML JUnit,
  ya que la instrumentación nativa proporciona resultados de tiempo más precisos, admite trazas distribuidas en tests de integraciones
  y otras características que no están disponibles con las cargas XML JUnit.
  Para obtener más detalles, consulte la tabla <a href="/continuous_integration/tests/#supported-features">Características compatibles.
</div>

## Información general

Los archivos de informes de tests de JUnit son archivos XML que contienen información sobre la ejecución de los tests, como los nombres de tests y conjuntos, los estados aprobado o fallido, la duración y, en ocasiones, los logs de error. Aunque fue introducido por el marco para tests [JUnit][1], muchos otros marcos populares son capaces de generar resultados utilizando este formato.

Si tu marco para tests puede generar informes de tests XML de JUnit, puedes utilizarlos como una alternativa ligera a [la instrumentación de tus pruebas de forma nativa][2] utilizando rastreadores Datadog. Los resultados de los tests importados de informes XML de JUnit aparecen junto a los datos de los tests notificados por los rastreadores.

## Compatibilidad

Biblioteca de rastreo de Datadog compatible:

| Biblioteca de Datadog | Versión |
|---|---|
| `datadog-ci` | 2.17.0 o anterior |

## Instalación de la CLI de Datadog CI

Instala la CLI de [`datadog-ci`][3] globalmente utilizando `npm`:

{{< code-block lang="shell" >}}
npm install -g @datadog/datadog-ci
{{< /code-block >}}


### Binario independiente (Beta)

<div class="alert alert-danger"><strong>Nota</strong>: Los binarios independientes están en <strong>fase beta</strong> y su estabilidad no está garantizada.</div>

Si la instalación de Node.js en el CI es un problema, se proporcionan binarios independientes con las [versiones de Datadog CI][4]. Sólo son compatibles linux-x64, darwin-x64, (MacOS) y win-x64 (Windows). Para instalarlos, ejecuta lo siguiente en tu terminal:

{{< tabs >}}
{{% tab "Linux" %}}
{{< code-block lang="shell" >}}
curl -L --fail "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_linux-x64" --output "/usr/local/bin/datadog-ci" && chmod +x /usr/local/bin/datadog-ci
{{< /code-block >}}

A continuación, ejecuta cualquier comando con `datadog-ci`:
{{< code-block lang="shell" >}}
datadog-ci version
{{< /code-block >}}

{{% /tab %}}

{{% tab "MacOS" %}}
{{< code-block lang="shell" >}}
curl -L --fail "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_darwin-x64" --output "/usr/local/bin/datadog-ci" && chmod +x /usr/local/bin/datadog-ci
{{< /code-block >}}

A continuación, ejecuta cualquier comando con `datadog-ci`:
{{< code-block lang="shell" >}}
datadog-ci version
{{< /code-block >}}

{{% /tab %}}

{{% tab "Windows" %}}
{{< code-block lang="powershell" >}}
Invoke-WebRequest -Uri "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_win-x64.exe" -OutFile "datadog-ci.exe"
{{< /code-block >}}

A continuación, ejecuta cualquier comando con `Start-Process -FilePath "datadog-ci.exe"`:
{{< code-block lang="powershell" >}}
Start-Process -FilePath "./datadog-ci.exe" -ArgumentList version
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

## Carga de informes de tests

Para cargar tus informes de tests XML de JUnit en Datadog, ejecuta el siguiente comando, especificando el nombre de servicio o biblioteca al que se realizó un test, utilizando el parámetro `--servicio` y una o más rutas de archivo a los archivos de informes XML directamente o a los directorios que los contienen:

{{< code-block lang="shell" >}}
datadog-ci junit upload --service <service_name> <path> [<path> ...]
{{< /code-block >}}

Especifica una [clave de API de Datadog][5] válida en la variable de entorno `DATADOG_API_KEY` entorno y el entorno donde se han ejecutado los tests (por ejemplo, `local`, cuando se cargan los resultados desde una estación de trabajo de desarrollador, o `ci`, cuando se cargan desde un proveedor de CI) en la variable de entorno `DD_ENV`. Por ejemplo:

<pre>
<code>
DD_ENV=ci DATADOG_API_KEY=&lt;api_key&gt; DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci junit upload \
  --service my-api-service \
  unit-tests/junit-reports e2e-tests/single-report.xml
</code>
</pre>

<div class="alert alert-danger">Asegúrate de que este comando se ejecuta en tu CI, incluso si tus tests han fallado. Normalmente, cuando los tests fallan, la tarea CI aborta la ejecución y el comando de carga no se ejecuta.</div>

{{< tabs >}}

{{% tab "Acciones de GitHub"%}}
Utiliza las [funciones de checks de estado][1]:

{{< code-block lang="yaml" >}}
pasos:
  - nombre: Ejecutar tests
    ejecutar: ./run-tests.sh
  - nombre: Cargar los resultados de los tests en Datadog
    si: siempre()
    ejecutar: datadog-ci junit upload --service service_name ./junit.xml
{{< /code-block >}}

[1]: https://docs.github.com/en/actions/learn-github-actions/expressions#always
{{% /tab %}}

{{% tab "GitLab" %}}
Utiliza la [sección `after_script`][1]:

{{< code-block lang="yaml" >}}
test:
  stage: test
  script:
    - ./run-tests.sh
  after_script:
    - datadog-ci junit upload --service service_name ./junit.xml
{{< /code-block >}}

[1]: https://docs.gitlab.com/ee/ci/yaml/#after_script
{{% /tab %}}

{{% tab "Jenkins" %}}
Utiliza la [sección `post`][1]:

{{< code-block lang="groovy" >}}
pipeline {
  agent any
  stages {
    stage('Run tests') {
      steps {
        sh './run-tests.sh'
      }
      post {
        always {
          sh 'datadog-ci junit upload --service service_name ./junit.xml'
        }
      }
    }
  }
}
{{< /code-block >}}

[1]: https://www.jenkins.io/doc/book/pipeline/syntax/#post
{{% /tab %}}

{{% tab "Bash" %}}
Si tu sistema CI permite sub-shells::

{{< code-block lang="shell" >}}
$(./run-tests.sh); export tests_exit_code=$?
datadog-ci junit upload --service service_name ./junit.xml
if [ $tests_exit_code -ne 0 ]; then exit $tests_exit_code; fi
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

Es posible que los informes de más de 250 MB no se procesen por completo, por lo que podrían faltar tests o logs. Para disfrutar de la mejor experiencia, asegúrate de que los informes sean inferiores a 250 MiB.

## Parámetros de configuración

Esta es la lista completa de opciones disponibles cuando se utiliza el comando `datadog-ci junit upload`:

`--service` (Requerido)
: Nombre del servicio o de la librería a los que se realizan tests.<br/>
**Variable de entorno**: `DD_SERVICE`<br/>
**Ejemplo**: `my-api-service`

`--env`
: Entorno donde se han ejecutado los tests.<br/>
**Variable de entorno**: `DD_ENV`<br/>
**Ejemplo**: `ci`

`--tags`
: Pares clave-valor con el formato `key:value` que se adjuntarán a todos los tests (el parámetro `--tags` se puede especificar varias veces). Cuando se especifican etiquetas utilizando `DD_TAGS`, sepáralas con comas (por ejemplo, `team:backend,priority:high`).<br/>
**Variable de entorno**: `DD_TAGS`<br/>
**Por defecto**: (ninguno)<br/>
**Ejemplo**: `team:backend`<br/>
**Nota**: Las etiquetas especificadas utilizando `--tags` y la variable de entorno `DD_TAGS` se combinan. Si aparece la misma clave tanto en `--tags` como en `DD_TAGS`, el valor en la variable de entorno `DD_TAGS` tiene prioridad.

`--measures`
: Pares numéricos clave-valor con el formato `key:number` que se adjuntarán a todos los tests (el parámetro `--measures` se puede especificar varias veces). Cuando se especifican medidas utilizando `DD_MEASURES`, sepáralas con comas (por ejemplo, `memory_allocations:13,test_importance:2`).<br/>
**Variable de entorno**: `DD_MEASURES`<br/>
**Por defecto**: (ninguno)<br/>
**Ejemplo**: `memory_allocations:13`<br/>
**Nota**: Las medidas especificadas utilizando `--measures` y la variable de entorno `DD_MEASURES` se combinan. Si aparece la misma clave tanto en `--measures` como en `DD_MEASURES`, el valor en la variable de entorno `DD_MEASURES` tienen prioridad.

`--report-tags`
: Pares clave-valor con el formato `key:value`. Funciona como el parámetro `--tags` pero estas etiquetas sólo se aplican a nivel de la sesión y **no** se combinan con la variable de entorno `DD_TAGS`.<br/>
**Por defecto**: (ninguno)<br/>
**Ejemplo**: `test.code_coverage.enabled:true`<br/>

`--report-measures`
: Pares clave-valor con el formato `key:123`. Funciona como el parámetro `--measures` pero estas etiquetas sólo se aplican a nivel de la sesión y **no** se combinan con la variable de entorno `DD_MEASURES`.<br/>
**Por defecto**: (ninguno)<br/>
**Ejemplo**: `test.code_coverage.lines_pct:82`<br/>

`--xpath-tag`
: Clave y expresión xpath con el formato `key=expression` que proporcionan una manera de personalizar etiquetas para tests en el archivo (el parámetro `--xpath-etiquetar` se puede especificar varias veces).<br/>
Para obtener más detalles sobre las expresiones compatibles, consulta [Proporcionar metadatos con expresiones XPath](#providing-metadata-with-xpath-expressions).<br/>
**Por defecto**: (ninguno)<br/>
**Ejemplo**: `test.suite=/testcase/@classname`<br/>
**Nota**: Las etiquetas especificadas utilizando `--xpath-tag` y con `etiquetas ` o `variables de entorno DD_TAGS` se combinan. Las etiquetas XPath tienen la mayor prioridad, ya que el valor suele ser diferente para cada test.

`--logs`
: Permite reenviar el contenido de los informes XML como [logs][6]. El contenido dentro de `<system-out>`, `<system-err>` y `<failure>` se recopila como logs. Los logs de elementos dentro de un `<testcase>` se conectan automáticamente al test.<br/>
** Variable de entorno**: `DD_CIVISIBILITY_LOGS_ENABLED`<br/>
**Por defecto**: `false`<br/>
**Nota**: Los logs se facturan por separado de CI Visibility.

`--max-concurrency`
: El número de cargas concurrentes a la API.<br/>
**Por defecto**: `20`

`--dry-run`
: Ejecuta el comando sin cargar el archivo a Datadog. Todos los demás checks checks se realizan.<br/>
**Por defecto**: `false`

`--skip-git-metadata-upload`
: Marca booleana utilizada para omitir la carga de metadatos git.<br/>
**Por defecto**: `false`<br/>

`--git-repository-url`
: La URL del repositorio del que obtener metadatos git. Si no se pasa, la URL se obtiene del repositorio git local.<br/>
**Por defecto**: Repositorio git local<br/>
**Ejemplo**: `git@github.com:DataDog/documentation.git`<br/>

`--verbose`
: Marca utilizada para añadir una gran cantidad de información adicional al resultado del comando<br/>
**Por defecto `false`<br/>

Argumentos posicionales
: Las rutas de archivos o directorios en los que se encuentran los informes XML de JUnit. Si pasas un directorio, la CLI busca todos los archivos `.xml` en él.

Para obtener más información sobre etiquetas reservadas `service` y `env`, consulta [Etiquetado unificado de servicios][7].

Se admiten las siguientes variables de entorno:

`DATADOG_API_KEY` (Obligatoria)
: [Clave de API de Datadog][5] utilizada para autenticar las solicitudes.<br/>
**Por defecto**: (ninguno)

Además, configura el sitio Datadog para utilizar el sitio ({{< region-param key="dd_site_name" >}}) seleccionado:

`DATADOG_SITE` (Obligatorio)
: El [sitio Datadog][3] al que cargar los resultados.<br/>
**Por defecto**: `datadoghq.com`<br/>
**Sitio seleccionado**: {{< region-param key="dd_site" code="true" >}}

## Recopilación de metadatos Git

{{% ci-git-metadata %}}

## Recopilación de metadatos de configuración de entornos

Datadog utiliza etiquetas especial exclusivas para identificar la configuración del entorno en el que se ejecutan los tests, incluyendo el sistema operativo, el tiempo de ejecución y la información del dispositivo, si corresponde. Cuando el mismo test para el mismo envío se ejecuta en más de una configuración (por ejemplo, en Windows y en Linux), las etiquetas se utilizan para diferenciar el test en la detección de fallos e irregularidades.

Puedes especificar estas etiquetas especiales utilizando el parámetro `--tags` al llamar a `datadog-ci junit upload` o configurando la variable de entorno `DD_TAGS`.

Todas estas etiquetas son opcionales y sólo aquellas que especifiques se utilizarán para diferenciar configuraciones de entornos.

`test.bundle`
: Se utiliza para ejecutar grupos de conjuntos de tests por separado.
**Ejemplos**: `ApplicationUITests`, `ModelTests`

`os.platform`
: Nombre del sistema operativo.<br/>
**Ejemplos**: `windows`, `linux`, `darwin`

`os.version`
: Versión del sistema operativo.<br/>
**Ejemplos**: `10.15.4`, `14.3.2`, `95`

`os.architecture`
: Arquitectura del sistema operativo.<br/>
**Ejemplos**: `x64`, `x86`, `arm64`

`runtime.name`
: Nombre del intérprete del lenguaje o del tiempo de ejecución de la programación.<br/>
**Ejemplos**: `.NET`, `.NET Core`, `OpenJDK Runtime Environment`, `Java(TM) SE Runtime Environment`, `CPython`

`runtime.version`
: Versión del tiempo de ejecución.<br/>
**Ejemplos**: `5.0.0`, `3.1.7`

`runtime.vendor`
: Nombre del proveedor del tiempo de ejecución, si corresponde. Por ejemplo, cuando se utiliza un tiempo de ejecución Java.<br/>
**Ejemplos**: `AdoptOpenJDK`, `Oracle Corporation`

`runtime.architecture`
: Arquitectura del tiempo de ejecución.<br/>
**Ejemplos**: `x64`, `x86`, `arm64`

Para aplicaciones móviles (Swift, Android):

`device.model`
: El modelo del dispositivo al que se realizan tests.<br/>
**Ejemplos**: `iPhone11,4`, `AppleTV5,3`

`device.name`
: El nombre del dispositivo al que se realizan tests.<br/>
**Ejemplos**: `iPhone 12 Pro Simulator`, `iPhone 13 (QA team)`

## Añadir propietarios de código
Para añadir información sobre [codeowners][9] a tus tests XML de JUnit, puedes utilizar la [integración GitHub][10] para leer el archivo `CODEOWNERS` en tu repositorio o proporcionar información adicional manualmente.

Como resultado, los tests XML de JUnit tienen una etiqueta `test.codeowners` con el propietario de dichos tests.

### Uso de la integración GitHub (recomendado)

Para añadir automáticamente la etiqueta `test.codeowners` a tus tests, necesitas:
1. Tener un archivo `CODEOWNERS` [en una de las localizaciones permitidas][11] en tu repositorio.
2. Proporciona el archivo de origen de los tests en tu informe XML de JUnit. Los siguientes complementos lo hacen automáticamente y añaden el atributo `file` a los elementos `<testcase>` o `<testsuite>` del informe XML:

    * phpunit
    * La mayoría de los complementos de Python (pytest, unittest)
    * La mayoría de los complementos de Ruby (minitest Ruby)

    Si el XML no tiene el atributo `file`, necesitarás [proporcionar el archivo de origen manualmente](#manually-providing-the-testsourcefile-tag).
   Ejemplo de informe válido:

  {{< code-block lang="xml" >}}
  <?xml version="1.0" encoding="UTF-8"?>
  <testsuite name="conjunto">
    <testcase name="test_with_file" file="src/commands/junit" />
  </testsuite>
  {{< /code-block >}}

3. Habilita la [aplicación de GitHub][12]. Si no tienes una aplicación de GitHub, sigue los pasos de la siguiente sección. Si ya tienes
   una aplicación de GitHub, habilita el permiso `Contents: Read` para que Datadog pueda leer el archivo `CODEOWNERS`. Una vez habilitado, espera unos minutos a que los cambios surtan efecto.

**Nota:** Github es el único proveedor Git compatible.

#### Configuración de una aplicación de GitHub

El XML de JUnit utiliza una [aplicación de GitHub][12] privada para leer el archivo `CODEOWNERS`.

1. Ve al [cuadro de integraciones GitHub][13].
2. Haz clic en **Link GitHub Account** (Vincular cuenta de GitHub).
3. Sigue las instrucciones para configurar la integración para una cuenta personal o de organización.
4. En **Edit Permissions** (Editar permisos), conceda acceso a `Contents: Read`.
5. Haz clic en **Create App in GitHub** (Crear aplicación en GitHub) para finalizar el proceso de creación de la aplicación en GitHub.
6. Da un nombre a la aplicación, por ejemplo, `Datadog CI Visibility`.
7. Haz clic en **Install GitHub App** (Instalar aplicación de GitHub) y sigue las instrucciones de GitHub.

### Proporcionar manualmente la etiqueta `test.source.file`
Esta es una alternativa al uso de la integración GitHub.

En el caso de complementos que no proporcionan el atributo `file` en el informe XML, puedes proporcionar la etiqueta `test.source.file`.
No es necesario proporcionar la ruta exacta a un archivo específico, [puedes utilizar cualquier sintaxis que utilizarías en el archivo CODEOWNERS][14]
como `src/myTeamFolder` o `*.md`.

Existen varias formas de proporcionar la etiqueta `test.source.file`:
* Utilizando [el parámetro `--tags` o la variable de entorno `DD_TAGS`](#configuration-settings).

   ```shell
   datadog-ci junit upload --service service-name --tags test.source.file:src/myTeamFolder my_report.xml
   ```

   Esto añade la etiqueta `test.source.file` a todos los tests del informe. Todos los tests tendrán el mismo propietario.
* Si quieres proporcionar diferentes archivos de origen para el mismo informe XML, puedes utilizar [elementos de propiedad](#Providing-metadata-through-property-elements) o definir manualmente el atributo `file` en elementos individuales `<testcase>` o `<testsuite>`.

## Proporcionar metadatos con expresiones XPath

Además del parámetro de CLI `--tags` y de la variable de entorno `DD_TAGS`, que aplican etiquetas personalizadas globalmente a todos los tests incluidos en el informe XML cargado, el parámetro --xpath-tag` proporciona reglas personalizadas para añadir etiquetas de diferentes atributos del XML a cada test.

El parámetro proporcionado debe tener el formato `key=expression`, donde `key` es el nombre de la etiqueta personalizada que se va a añadir y `expression` es una expresión [XPath][15] válida dentro de las admitidas.

Aunque la sintaxis XPath se utiliza por familiaridad, sólo se admiten las siguientes expresiones:

`/testcase/@attribute-name`
: El atributo XML de `<testcase attribute-name="value">`.

`/testcase/../@attribute-name`
: El atributo XML del `<testsuite attribute-name="value">` principal del `<testcase>` actual.

`/testcase/..//property[@name='property-name']`
: El atributo `value` del `<property name="property-name" value="value">` dentro del `<testsuite>` principal del `<testcase>` actual.

`/testcase//property[@name='property-name']`
: El atributo `value` del `<property name="property-name" value="value">` dentro del `<testcase>` actual.

Ejemplos:

{{< tabs >}}

{{% tab "Conjunto de tests de @classname" %}}
Por defecto, la etiqueta `test.suite` de los tests se lee de `<testsuite name="suite name">`. Sin embargo, algunos complementos podrían informar de un mejor valor en `<testcase classname="TestSuite">`.

Para cambiar las etiquetas `test.suite` de `value 1`, `value 2` a `SomeTestSuiteClass`, `OtherTestSuiteClass`:

{{< code-block lang="xml" >}}
<?xml version="1.0" encoding="UTF-8"?>
<testsuites>
  <testsuite tests="1" failures="0" time="0.030000" name="value 1">
    <testcase classname="SomeTestSuiteClass" name="test_something" time="0.030000"></testcase>
  </testsuite>
  <testsuite tests="1" failures="0" time="0.021300" name="value 2">
    <testcase classname="OtherTestSuiteClass" name="test_something" time="0.021300"></testcase>
  </testsuite>
</testsuites>
{{< /code-block >}}

{{< code-block lang="shell" >}}
datadog-ci junit upload --service service_name \
  --xpath-tag test.suite=/testcase/@classname ./junit.xml
{{< /code-block >}}

{{% /tab %}}

{{% tab "Etiqueta de atributo" %}}
Para añadir una `custom_tag` a cada test con los valores `value 1`, `value 2`:

{{< code-block lang="xml" >}}
<?xml version="1.0" encoding="UTF-8"?>
<testsuites>
  <testsuite tests="1" failures="0" time="0.020000" name="SomeTestSuiteClass">
    <testcase name="test_something" time="0.010000" attr="value 1"></testcase>
    <testcase name="test_other" time="0.010000" attr="value 2"></testcase>
  </testsuite>
</testsuites>
{{< /code-block >}}

{{< code-block lang="shell" >}}
datadog-ci junit upload --service service_name \
  --xpath-tag custom_tag=/testcase/@attr ./junit.xml
{{< /code-block >}}

{{% /tab %}}

{{% tab "Etiqueta de la propiedad del conjunto de tests" %}}
Para añadir una `custom_tag` a cada test con los valores `value 1`, `value 2`:

{{< code-block lang="xml" >}}
<?xml version="1.0" encoding="UTF-8"?>
<testsuites>
  <testsuite tests="1" failures="0" time="0.030000" name="SomeTestSuiteClass">
    <properties>
      <property name="prop" value="value 1"></property>
    </properties>
    <testcase name="test_something" time="0.030000" attr="value 1"></testcase>
  </testsuite>
  <testsuite tests="1" failures="0" time="0.021300" name="OtherTestSuiteClass">
    <properties>
      <property name="prop" value="value 1"></property>
    </properties>
    <testcase name="test_something" time="0.021300" attr="value 1"></testcase>
  </testsuite>
</testsuites>
{{< /code-block >}}

{{< code-block lang="shell" >}}
datadog-ci junit upload --service service_name \
  --xpath-tag custom_tag=/testcase/..//property[@name=\'prop\'] ./junit.xml
{{< /code-block >}}

**Nota:** El nombre debe ir entre comillas. Bash requiere que las comillas se escapen utilizando una barra invertida. Por ejemplo, `[@name='prop']` debe introducirse como `[@name=\'prop\'].
{{% /tab %}}

{{< /tabs >}}

<div class="alert alert-danger">
  Cuando utilices bash desde Git para Windows, define la variable de entorno <strong>MSYS_NO_PATHCONV=1</strong>.
  De lo contrario, cualquier argumento que empiece por <strong>/</strong> se expandirá a una ruta Windows.
</div>

## Proporcionar metadatos mediante elementos de propiedad

Otra forma de proporcionar etiquetas adicionales a tests específicas es incluir elementos `<property name="dd_tags[key]" value="value">` dentro de los elementos `<testsuite>` o `<testcase>`. Si añades estas etiquetas a un elemento `<testcase>`, se almacenan en su tramo de test. Si añades etiquetas a un elemento `<testsuite>`, se almacenan en todos los tramos de tests de ese conjunto.

Para ser procesado, el atributo `name` en el elemento `<property>` debe tener el formato `dd_tags[key]`, donde `key` es el nombre de la etiqueta personalizada que se va a añadir. Las demás propiedades se ignoran.

**Ejemplo**: Añadir etiquetas a un elemento `<testcase>`.

{{< code-block lang="xml" >}}
<?xml version="1.0" encoding="UTF-8"?>
<testsuites>
  <testsuite tests="1" failures="0" time="0.030000" name="SomeTestSuiteClass">
    <testcase classname="SomeTestSuiteClass" name="test_something" time="0.010000">
      <properties>
        <property name="dd_tags[custom_tag]" value="some value"></property>
        <property name="dd_tags[runtime.name]" value="CPython"></property>
      </properties>
    </testcase>
  </testsuite>
</testsuites>
{{< /code-block >}}

**Ejemplo**: Añadir etiquetas a un elemento `<testsuite>`.

{{< code-block lang="xml" >}}
<?xml version="1.0" encoding="UTF-8"?>
<testsuites>
  <testsuite tests="1" failures="0" time="0.030000" name="SomeTestSuiteClass">
    <properties>
      <property name="dd_tags[custom_tag]" value="some value"></property>
      <property name="dd_tags[runtime.name]" value="CPython"></property>
    </properties>
    <testcase classname="SomeTestSuiteClass" name="test_something" time="0.010000"></testcase>
  </testsuite>
</testsuites>
{{< /code-block >}}

Los valores que envías a Datadog son cadenas, por lo que las facetas se muestran en orden lexicográfico. Para enviar números enteros en lugar de cadenas, utiliza la marca `--measures` y la `variable de entorno DD_MEASURES`.


## Informar de la cobertura del código

Es posible informar de la cobertura del código para un informe JUnit a través de la opción `--report-measures` configurando la medida test.code_coverage.lines_pct`:

```shell
datadog-ci junit upload --service my-api-service --report-measures test.code_coverage.lines_pct:82 unit-tests/junit-reports e2e-tests/single-report.xml
```

Para obtener más información, consulta [Cobertura del código][16].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://junit.org/junit5/
[2]: https://docs.datadoghq.com/es/continuous_integration/tests/#setup
[3]: https://www.npmjs.com/package/@datadog/datadog-ci
[4]: https://github.com/DataDog/datadog-ci/releases
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /es/logs/
[7]: /es/getting_started/tagging/unified_service_tagging
[8]: /es/getting_started/site/
[9]: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners
[10]: https://docs.datadoghq.com/es/integrations/github/
[11]: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners#codeowners-file-location
[12]: https://docs.github.com/developers/apps/getting-started-with-apps/about-apps
[13]: https://app.datadoghq.com/integrations/github/
[14]: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners#codeowners-syntax
[15]: https://www.w3schools.com/xml/xpath_syntax.asp
[16]: /es/continuous_integration/tests/code_coverage/?tab=junitreportuploads
