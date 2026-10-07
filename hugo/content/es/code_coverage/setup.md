---
description: Configure Code Coverage integrándose con GitHub o GitLab, estableciendo
  permisos, creando PR Gates y cargando informes de Code Coverage.
further_reading:
- link: /code_coverage
  tag: Documentación
  text: Code Coverage
- link: /code_coverage/configuration
  tag: Documentación
  text: Configure Code Coverage
- link: /code_coverage/flags
  tag: Documentación
  text: Organice los datos de cobertura con indicadores
- link: /code_coverage/data_collected
  tag: Documentación
  text: Conozca qué datos se recopilan para Code Coverage
- link: /code_coverage/monorepo_support
  tag: Documentación
  text: Conozca cómo Code Coverage admite monorepos grandes
title: Configure Code Coverage
---
La configuración de Code Coverage implica los siguientes pasos:

1. Configure la integración con su [proveedor de código fuente](#integrate-with-source-code-provider) en la interfaz de usuario de Datadog.
2. Configure los [permisos de acceso a datos](#data-access-permissions) de Code Coverage en Datadog.
3. Opcionalmente, configure un [PR Gate](#pr-gates) para bloquear solicitudes de extracción según los umbrales de Code Coverage.
4. Actualice su CI pipeline para [cargar informes de Code Coverage](#upload-code-coverage-reports) a Datadog.

## Integre con el proveedor de código fuente {#integrate-with-source-code-provider}

Code Coverage admite lo siguiente:

{{< tabs >}}
{{% tab "GitHub" %}}

Siga las instrucciones en la [documentación de integración de GitHub][1] sobre cómo conectar sus repositorios de GitHub a Datadog.

Code Coverage requiere los siguientes permisos de la aplicación de GitHub:
| Permiso | Nivel de acceso | Propósito |
|---|---|---|
| Contenido | Lectura | Mostrar código fuente en la interfaz de usuario de cobertura detallada. |
| Solicitudes de extracción | Escritura | Mostrar datos de PR en la interfaz de usuario de cobertura y escribir comentarios de PR. |
| Verificaciones | Escritura | Crear PR Gates de cobertura. |

Se requieren los siguientes webhooks:
| Webhook | Propósito |
|---|---|
| Solicitud de extracción | Recibir actualizaciones de datos de PR. |
| Revisión de solicitud de extracción | Recibir actualizaciones de datos de PR. |
| Comentario de revisión de solicitud de extracción | Recibir actualizaciones de datos de PR. |
| Push | Recibir metadatos de confirmación de Git. |

Si todo está configurado correctamente, se mostrará una marca de verificación verde en la página de [Integración de GitHub][2] de Datadog:
{{< img src="/code_coverage/github_app_success.png" alt="Verificación de éxito de la integración de la aplicación de GitHub" style="width:100%" >}}

<div class="alert alert-info">Si tiene una aplicación de Marketplace administrada por Datadog o una aplicación personalizada con la configuración predeterminada, se incluyen los permisos y webhooks necesarios.</div>

[1]: /es/integrations/github/#github-apps-1
[2]: https://app.datadoghq.com/integrations/github/configuration
{{% /tab %}}
{{% tab "GitLab" %}}

Siga las instrucciones en la [documentación de integración de código fuente de GitLab][1] sobre cómo conectar sus repositorios de GitLab a Datadog.

Consulte la [Guía de integración de código fuente de Datadog][2] para obtener contexto adicional.

[1]: /es/integrations/gitlab-source-code/
[2]: /es/integrations/guide/source-code-integration/?tab=gitlabsaasonprem#connect-your-git-repositories-to-datadog
{{% /tab %}}
{{% tab "Azure DevOps" %}}

Siga las instrucciones en la [Guía de integración de código fuente de Datadog][1] sobre cómo conectar sus repositorios de Azure DevOps a Datadog
usando la [integración de código fuente de Azure DevOps][2].

[1]: /es/integrations/guide/source-code-integration/?tab=azuredevopssaasonly#connect-your-git-repositories-to-datadog
[2]: https://app.datadoghq.com/integrations/azure-devops-source-code/
{{% /tab %}}
{{< /tabs >}}

Consulte [Datos recopilados][1] para obtener detalles sobre qué datos se recopilan de su proveedor de código fuente.

## Permisos de acceso a datos {#data-access-permissions}

Si está utilizando [roles personalizados][2] en lugar de [roles administrados por Datadog][3], asegúrese de habilitar el {{< ui >}}Code Coverage Read{{< /ui >}} permiso para los roles que necesitan visualizar los datos de cobertura de código.

Navegue a [Configuración de roles][4], haga clic en {{< ui >}}Edit{{< /ui >}} en el rol que necesita, agregue el permiso {{< ui >}}Code Coverage Read{{< /ui >}} al rol y guarde los cambios.

Para un control más detallado, utilice [Data Access Control][19] para restringir los datos de cobertura de código por repositorio en lugar de hacerlo en toda su organización. Esto evita que la información confidencial en los informes de cobertura, como las rutas de código fuente y los nombres de las pruebas, cruce los límites de los equipos.

En Datadog, vaya a **Organization Settings > Data Access Control** y cree un conjunto de datos restringido (Restricted Dataset) con alcance a Software Delivery y al repositorio que desea restringir. Otorgue acceso a los roles o equipos que deban verlo.

## PR Gates {#pr-gates}

Si desea establecer reglas (gates) para la cobertura de PR, puede configurar las reglas de PR Gates de una de estas dos maneras:

- **Interfaz de usuario de Datadog**: Navegue a [PR Gates rule creation][5] y configure una regla para establecer un control sobre la cobertura total o de parches.
- **Archivo de configuración YAML**: Defina las reglas (gates) en su archivo [`code-coverage.datadog.yml`][6]. Esto le permite gestionar las reglas (gates) como código junto con su repositorio.

Las reglas de ambas fuentes se evalúan cuando se abre o se actualiza una solicitud de extracción (pull request). Consulte [Configuration][6] para ver la sintaxis y ejemplos de las reglas (gates) en YAML.

## Cargar informes de cobertura de código {#upload-code-coverage-reports}

Cargue los archivos de informes de cobertura de código a Datadog de forma automática, con una biblioteca de Test Optimization compatible, o de forma manual, ejecutando la CLI `datadog-ci` en su entorno de CI.

Consulte [Data Collected][7] para obtener detalles sobre qué datos se recopilan durante la carga de informes de cobertura de código.

### Cargar informes automáticamente con Test Optimization {#upload-reports-automatically-with-test-optimization}

#### Bibliotecas y versiones compatibles {#supported-libraries-and-versions}

La carga automática de informes de cobertura de código es compatible con las siguientes versiones de bibliotecas de Test Optimization:

| Library | Primera versión compatible | Fuente de cobertura |
|---|---|---|
| Ruby `datadog-ci` | `1.27.0` | SimpleCov |
| JavaScript `dd-trace` 5.x | `5.85.0` | Cobertura de Jest, Vitest o NYC |
| JavaScript `dd-trace` 6.x | `6.0.0` | Cobertura de Jest, Vitest o NYC |
| Python `ddtrace` | `4.4.0` | Complemento de pytest predeterminado que utiliza `coverage.py` |
| Java `dd-java-agent` | `1.53.0` | JaCoCo |

Estos requisitos de versión se aplican solo a las cargas automáticas realizadas por las bibliotecas de Test Optimization

#### Habilitar cargas automáticas {#enable-automatic-uploads}

Puede aplicar la configuración {{< ui >}}Code Coverage{{< /ui >}} a nivel de organización, repositorio o servicio de pruebas.

1. Complete la [Test Optimization setup][17] para su biblioteca.
2. Actualice a una versión de biblioteca compatible.
3. Active {{< ui >}}Code Coverage{{< /ui >}} en [{{< ui >}}CI/CD Optimization settings{{< /ui >}}][8].

    {{< img src="/code_coverage/automatic_code_coverage_upload_setting.png" alt="Interruptor de Code Coverage en la configuración de optimización de CI/CD a nivel de organización." style="width:100%" >}}

4. Ejecute un comando de prueba que genere un informe de cobertura desde la fuente enumerada en [Bibliotecas y versiones compatibles](#supported-libraries-and-versions).

La biblioteca carga el informe a Datadog después de que finaliza el comando.

Para organizar y filtrar los informes cargados por la biblioteca, consulte [Agregar indicadores a los informes cargados automáticamente][9], que enumera las bibliotecas y versiones que admiten `DD_CODE_COVERAGE_FLAGS`.

### Formatos de informe de cobertura compatibles {#supported-coverage-report-formats}

Datadog admite los siguientes formatos de datos de cobertura; expanda para ver ejemplos:

{{% collapse-content title="LCOV" level="h4" expanded=false id="lcov" %}}
{{< code-block lang="text" >}}
TN:
SF:src/example.c
FN:3,add
FNDA:5,add
FNF:1
FNH:1
DA:3,5
DA:4,5
DA:5,5
DA:8,0
DA:9,0
LF:5
LH:3
BRDA:4,0,0,5
BRDA:4,0,1,0
BRF:2
BRH:1
end_of_record
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Go Coverprofile" level="h4" expanded=false id="go-coverprofile" %}}
{{< code-block lang="text" >}}
mode: atomic
example/calculator.go:51.148,53.2 1 0
example/calculator.go:55.190,61.15 3 0
example/calculator.go:61.15,64.3 2 0
example/calculator.go:66.2,67.16 2 0
example/calculator.go:67.16,69.3 1 0
example/clients/api_client.go:27.87,31.2 3 2
example/clients/api_client.go:34.85,36.2 1 3
example/clients/api_client.go:39.126,44.2 4 3
example/clients/api_client.go:47.106,50.2 2 3
example/notifications/notifier.go:49.79,51.2 1 3
example/notifications/notifier.go:60.33,69.2 1 0
example/notifications/notifier.go:79.131,86.15 3 2
example/notifications/notifier.go:104.3,104.10 1 3
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Cobertura XML" level="h4" expanded=false id="cobertura-xml" %}}
{{< code-block lang="xml" >}}
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE coverage SYSTEM "http://cobertura.sourceforge.net/xml/coverage-04.dtd">
<coverage lines-valid="5" lines-covered="3" line-rate="0.6" branches-valid="2" branches-covered="1" branch-rate="0.5" timestamp="1690658886" version="1.9">
  <sources>
    <source>src</source>
  </sources>
  <packages>
    <package name="example" line-rate="0.6" branch-rate="0.5">
      <classes>
        <class name="Example" filename="example/Example.java" line-rate="0.6" branch-rate="0.5">
          <methods>
            <method name="add" signature="(II)I" line-rate="1.0" branch-rate="1.0">
              <lines>
                <line number="3" hits="5"/>
                <line number="4" hits="5" branch="true" condition-coverage="50% (1/2)"/>
                <line number="5" hits="5"/>
              </lines>
            </method>
          </methods>
          <lines>
            <line number="3" hits="5"/>
            <line number="4" hits="5" branch="true" condition-coverage="50% (1/2)"/>
            <line number="5" hits="5"/>
            <line number="8" hits="0"/>
            <line number="9" hits="0"/>
          </lines>
        </class>
      </classes>
    </package>
  </packages>
</coverage>
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Jacoco XML" level="h4" expanded=false id="jacoco-xml" %}}
{{< code-block lang="xml" >}}
<?xml version="1.0" encoding="UTF-8"?>
<report name="Example">
  <sessioninfo id="SessionId" start="1690658886000" dump="1690658887000"/>
  <package name="example">
    <sourcefile name="Example.java">
      <line nr="3" mi="0" ci="5"/>
      <line nr="4" mi="0" ci="5" mb="1" cb="1"/>
      <line nr="5" mi="0" ci="5"/>
      <line nr="8" mi="1" ci="0"/>
      <line nr="9" mi="1" ci="0"/>
    </sourcefile>
  </package>
</report>
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Clover XML" level="h4" expanded=false id="clover-xml" %}}
{{< code-block lang="xml" >}}
<coverage generated="1661852015">
    <project timestamp="1661852015">
        <file name="/var/www/html/src/App/Console/CronjobRunnerCommand.php">
            <class name="App\Console\CronjobRunnerCommand" namespace="global">
                <metrics complexity="3" methods="3" coveredmethods="0" conditionals="0" coveredconditionals="0" statements="4" coveredstatements="0" elements="7" coveredelements="0"/>
            </class>
            <line num="18" type="method" name="__construct" visibility="public" complexity="1" crap="2" count="0"/>
            <line num="20" type="stmt" count="1"/>
            <line num="27" type="stmt" count="0"/>
            <line num="30" type="method" name="execute" visibility="protected" complexity="1" crap="2" count="0"/>
            <line num="32" type="stmt" count="0"/>
            <metrics loc="35" ncloc="35" classes="1" methods="3" coveredmethods="0" conditionals="0" coveredconditionals="0" statements="4" coveredstatements="0" elements="7" coveredelements="0"/>
        </file>
        <file name="/var/www/html/src/App/Console/CronjobRunnerCommand2.php">
            <line num="42" type="stmt" count="1"/>
        </file>
    </project>
</coverage>
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="OpenCover XML" level="h4" expanded=false id="opencover-xml" %}}
{{< code-block lang="xml" >}}
<?xml version="1.0" encoding="utf-8"?>
<CoverageSession xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <Modules>
    <Module hash="ABC123">
      <ModulePath>Example.dll</ModulePath>
      <Files>
        <File uid="1" fullPath="src\example\Example.cs" />
      </Files>
      <Classes>
        <Class>
          <Methods>
            <Method visited="true" cyclomaticComplexity="1" sequenceCoverage="100">
              <FileRef uid="1"/>
              <SequencePoints>
                <SequencePoint vc="5" sl="3" />
                <SequencePoint vc="5" sl="4" />
                <SequencePoint vc="5" sl="5" />
                <SequencePoint vc="0" sl="9" />
              </SequencePoints>
              <BranchPoints>
                <BranchPoint vc="5" sl="4" path="0"/>
                <BranchPoint vc="0" sl="4" path="1"/>
              </BranchPoints>
            </Method>
          </Methods>
        </Class>
      </Classes>
    </Module>
  </Modules>
</CoverageSession>
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Simplecov JSON" level="h4" expanded=false id="simplecov-json" %}}
{{< code-block lang="json" >}}
{
  "meta": {
    "simplecov_version": "0.21.2"
  },
  "coverage": {
    "/path/to/file1.rb": {
      "lines": [
        null,
        1,
        2,
        0,
        null,
        1,
        null,
        null,
        null,
        "ignored",
        "ignored",
        "ignored",
        null
      ],
      "branches": []
    },
    "/path/to/file2.rb": {
      "lines": [1, 1, null, 0, 1],
      "branches": []
    }
  }
}
{{< /code-block >}}
{{% /collapse-content %}}

### Instale la CLI de datadog-ci {#install-the-datadog-ci-cli}

<div class="alert alert-info">Si utiliza GitHub Actions, puede omitir este paso de instalación. El <a href="#uploading-coverage-reports">método de carga de GitHub Actions</a> a continuación utiliza una acción dedicada que gestiona <code>datadog-ci</code> la instalación automáticamente.</div>

Se proporcionan binarios independientes con [lanzamientos de Datadog CI][10]. Se admiten las arquitecturas _linux-x64_, _linux-arm64_, _darwin-x64_, _darwin-arm64_ (macOS) y _win-x64_ (Windows). Para instalar, ejecute lo siguiente desde su terminal:

{{< tabs >}}
{{% tab "Linux" %}}
{{< code-block lang="shell" >}}
curl -L --fail "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_linux-x64" --output "/usr/local/bin/datadog-ci" && chmod +x /usr/local/bin/datadog-ci
{{< /code-block >}}

Luego, ejecute cualquier comando con `datadog-ci`:
{{< code-block lang="shell" >}}
datadog-ci version
{{< /code-block >}}
{{% /tab %}}

{{% tab "macOS" %}}
{{< code-block lang="shell" >}}
curl -L --fail "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_darwin-x64" --output "/usr/local/bin/datadog-ci" && chmod +x /usr/local/bin/datadog-ci
{{< /code-block >}}

Luego, ejecute cualquier comando con `datadog-ci`:
{{< code-block lang="shell" >}}
datadog-ci version
{{< /code-block >}}
{{% /tab %}}

{{% tab "Windows" %}}
{{< code-block lang="powershell" >}}
Invoke-WebRequest -Uri "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_win-x64" -OutFile "datadog-ci.exe"
{{< /code-block >}}

Luego, ejecute cualquier comando con `Start-Process -FilePath "datadog-ci.exe"`:
{{< code-block lang="powershell" >}}
Start-Process -FilePath "./datadog-ci.exe" -ArgumentList version
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

#### npm {#npm}

Alternativamente, si Node.js está disponible en su entorno de CI, instale la CLI [`datadog-ci`][11] globalmente usando `npm`:

{{< code-block lang="shell" >}}
npm install -g @datadog/datadog-ci
{{< /code-block >}}

#### Imagen de Docker {#docker-image}

Alternativamente, puede actualizar su trabajo de CI para que se ejecute en un contenedor basado en la [imagen de Docker de Datadog CI][12].
La imagen viene con `datadog-ci` preinstalado y listo para usar.

### Carga de informes de cobertura {#uploading-coverage-reports}

<div class="alert alert-info">
Datadog agrega automáticamente todos los informes para el mismo commit en el backend. No necesita combinar los informes de cobertura antes de cargarlos.
</div>

Para cargar sus informes de cobertura de código a Datadog, ejecute el siguiente comando. Proporcione una [clave de API de Datadog][13] válida (`DD_API_KEY`), y una o más rutas de archivo a los archivos de informe de cobertura directamente o a los directorios que los contienen:

{{< tabs >}}
{{% tab "GitHub Actions" %}}

Utilice la [Datadog Code Coverage Upload][1] GitHub Action. Esta acción instala y ejecuta automáticamente `datadog-ci`, por lo que no se requiere configuración adicional:

<pre>
<code class="language-yaml" data-lang="yaml">
steps:
- name: Upload coverage reports to Datadog
  uses: DataDog/coverage-upload-github-action@v1
  with:
    api_key: ${{ secrets.DD_API_KEY }}
    site: {{< region-param key="dd_site" >}}
</code>
</pre>

Alternativamente, si tiene `datadog-ci` instalado, puede ejecutarlo directamente:

<pre>
<code class="language-yaml" data-lang="yaml">
steps:
- name: Upload coverage reports to Datadog
  run: datadog-ci coverage upload .
  env:
    DD_API_KEY: ${{ secrets.DD_API_KEY }}
    DD_SITE: {{< region-param key="dd_site" >}}
</code>
</pre>

[1]: https://github.com/marketplace/actions/datadog-code-coverage-upload
{{% /tab %}}
{{% tab "GitLab" %}}
<pre>
<code class="language-yaml" data-lang="yaml">
test:
  stage: test
  script:
    - ... # run your tests and generate coverage reports
    - datadog-ci coverage upload . # make sure to add the DD_API_KEY CI/CD variable
</code>
</pre>
{{% /tab %}}
{{% tab "Azure Pipelines" %}}
<code class="language-yaml" data-lang="yaml">
- script: datadog-ci coverage upload --format=clover coverage/clover.xml
  displayName: 'Upload coverage to Datadog'
  env:
    DD_API_KEY: $(DD_API_KEY)
    DD_SITE: 'datadoghq.com'
</code>
{{% /tab %}}
{{< /tabs >}}

El comando busca de forma recursiva en los directorios especificados los archivos de informe de cobertura compatibles, por lo que especificar el directorio actual (`.`) suele ser suficiente.
Consulte la [documentación de `datadog-ci`][14] para obtener más detalles sobre el comando `datadog-ci coverage upload`.

Poco después de que finalice la subida del informe de cobertura de código, Datadog añade un comentario en la PR con los valores de porcentaje de cobertura de código. Para añadir un desglose por archivo de la cobertura total y de parches al comentario, consulte [PR Comments][21].
También puede ver sus datos de cobertura agregados por solicitud de extracción en la [Code Coverage page][15] en Datadog, con la capacidad de examinar archivos individuales y líneas de código.

{{< img src="/code_coverage/pr_details.png" text="Code Coverage PR details page in Datadog" style="width:100%" >}}

## Solución de problemas {#troubleshooting}

### El comando de subida de cobertura no detecta los archivos de informe de cobertura {#coverage-upload-command-does-not-detect-coverage-report-files}

El comando `datadog-ci coverage upload` detecta automáticamente los archivos de informe de cobertura compatibles en los directorios especificados mediante heurísticas, como nombres de archivo y extensiones.
Si sus archivos de informe de cobertura no coinciden con los patrones esperados, es posible que el comando no los detecte automáticamente. En este caso, especifique el formato del informe y proporcione las rutas de archivo como argumentos posicionales. Por ejemplo:

{{< code-block lang="shell" >}}
datadog-ci coverage upload --format=lcov \
  src/coverage-reports/unit-tests/coverage.info \
  src/coverage-reports/e2e-tests/coverage.info
{{< /code-block >}}

### La subida de cobertura falla con el error \"Format could not be detected\" {#coverage-upload-fails-with-format-could-not-be-detected-error}

El comando `datadog-ci coverage upload` detecta automáticamente el formato de los archivos de informe de cobertura según su contenido y extensión de archivo.
Si el comando falla con el siguiente error:

```
Invalid coverage report file [...]: format could not be detected
```
especifique el formato explícitamente usando la opción `--format`, de esta manera:

{{< code-block lang="shell" >}}
datadog-ci coverage upload --format=cobertura reports/cobertura.xml
{{< /code-block >}}

### La subida de cobertura arroja el error \"Could not sync git metadata\" {#coverage-upload-outputs-could-not-sync-git-metadata-error}

La carga de metadatos de Git solo es necesaria si no puede integrar su proveedor de CI directamente con Datadog.
Si está utilizando una [integración de proveedor de código fuente][18], como la aplicación de Datadog para GitHub o la integración de Gitlab, puede deshabilitar la carga de metadatos de git pasando la bandera `--skip-git-metadata-upload=1` al comando `datadog-ci coverage upload`, de la siguiente manera:

{{< code-block lang="shell" >}}
datadog-ci coverage upload --skip-git-metadata-upload=1 .
{{< /code-block >}}

### La interfaz de usuario de Datadog no muestra los archivos modificados en la vista de PR {#datadog-ui-does-not-show-changed-files-in-the-pr-view}

De forma predeterminada, la tabla "Archivos modificados" solo contiene archivos de código fuente ejecutables que están presentes en los informes de cobertura cargados.
Seleccione {{< ui >}}Non-executable files{{< /ui >}} o {{< ui >}}All{{< /ui >}} en el encabezado de la tabla para mostrar todos los archivos que se modificaron en la PR, independientemente de si son ejecutables o no.

{{< img src="/code_coverage/non_executable_files.png" text="In Changed files, you have the option to select Non-executable on the table header" style="width:100%" >}}

Si un archivo de código fuente está marcado erróneamente como no ejecutable, es probable que falte en sus informes de cobertura cargados.
Asegúrese de cargar todos sus informes relevantes y verifique dos veces la configuración de su herramienta de cobertura para confirmar que los datos de cobertura se recopilen para todos los archivos aplicables.

Las fuentes de prueba no se consideran archivos ejecutables, ya que no forman parte de la base de código de producción que se mide para la cobertura.

### La interfaz de usuario de Datadog muestra rutas de archivo incorrectas {#datadog-ui-shows-incorrect-file-paths}

Code Coverage depende de que las rutas de archivo en los informes de cobertura sean absolutas o relativas a la raíz del repositorio.
Si las rutas en su informe son relativas a un directorio diferente en su repositorio, especifique la ruta base correcta (relativa a la raíz del repositorio) con la opción `--base-path` al ejecutar el comando `datadog-ci coverage upload`, de la siguiente manera:

{{< code-block lang="shell" >}}
datadog-ci coverage upload --base-path=frontend/src .
{{< /code-block >}}

### Cobertura inexacta de líneas no ejecutables {#inaccurate-coverage-from-non-executable-lines}

Algunas herramientas de cobertura incluyen líneas no ejecutables (como comentarios, líneas en blanco y corchetes de cierre) en sus informes, contándolas como no cubiertas. Esto puede reducir sus porcentajes de cobertura y producir falsos negativos para líneas que nunca pueden ejecutarse.

Durante la carga, la CLI escanea automáticamente sus archivos de código fuente para identificar estas líneas no ejecutables, de modo que puedan excluirse de los cálculos de cobertura.

Las correcciones de archivos admiten los siguientes lenguajes: Go, Kotlin, C/C++, Swift, Objective-C y PHP.

Puede controlar este comportamiento con las siguientes opciones:

- `--disable-file-fixes`: Deshabilite la generación de correcciones de archivos por completo.
- `--file-fixes-search-path <dir>`: Sobrescriba el directorio raíz utilizado para escanear los archivos de código fuente. De forma predeterminada, se utiliza la raíz del repositorio. Esto es útil en monorepos o cuando sus informes de cobertura solo cubren un subconjunto de la base de código, ya que acelera el escaneo al limitar el árbol de directorios recorrido.

### Discrepancia entre los valores de la interfaz de usuario de Datadog y el informe de cobertura {#discrepancy-between-datadog-ui-and-coverage-report-values}

Datadog combina automáticamente los informes de cobertura para el mismo commit.
Como resultado, el porcentaje de cobertura mostrado en la interfaz de usuario de Datadog puede diferir de los valores en sus informes de cobertura individuales, especialmente si esos informes contienen entradas de archivos de código fuente superpuestas o duplicadas.

Si utiliza una herramienta externa (como [ReportGenerator][16]) para combinar informes de cobertura antes de cargarlos en Datadog,
asegúrese de que sus informes combinados no contengan entradas de archivos de código fuente duplicadas.
Datadog elimina los duplicados de archivos superpuestos en los informes, lo que puede resultar en diferencias entre sus valores de cobertura originales y los valores combinados mostrados en la interfaz de usuario de Datadog.

Para obtener una descripción de cómo se combinan los informes y cómo se cuenta el estado de cada línea, consulte [Code Coverage Calculation][20].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/code_coverage/data_collected/#source-code-provider-integration
[2]: /es/account_management/rbac/permissions/#custom-roles
[3]: /es/account_management/rbac/permissions/#managed-roles
[4]: https://app.datadoghq.com/organization-settings/roles
[5]: https://app.datadoghq.com/ci/pr-gates/rule/create?dataSource=code_coverage
[6]: /es/code_coverage/configuration#pr-gates
[7]: /es/code_coverage/data_collected/#code-coverage-report-upload
[8]: https://app.datadoghq.com/ci/settings/ci-cd/repositories?tab=organization
[9]: /es/code_coverage/flags#add-flags-to-automatically-uploaded-reports
[10]: https://github.com/DataDog/datadog-ci/releases
[11]: https://www.npmjs.com/package/@datadog/datadog-ci
[12]: https://hub.docker.com/r/datadog/ci
[13]: https://app.datadoghq.com/organization-settings/api-keys
[14]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-coverage
[15]: https://app.datadoghq.com/ci/code-coverage
[16]: https://reportgenerator.io/
[17]: /es/tests/setup/
[18]: /es/code_coverage/setup/#integrate-with-source-code-provider
[19]: https://app.datadoghq.com/organization-settings/data-access-controls
[20]: /es/code_coverage/coverage_calculation
[21]: /es/code_coverage/configuration#pr-comments