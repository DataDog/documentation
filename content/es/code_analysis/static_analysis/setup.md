---
algolia:
  tags:
  - análisis estático
  - reglas de static analysis
  - tests de seguridad de aplicaciones estáticas
  - SAST
aliases:
- /es/continuous_integration/static_analysis
- /es/static_analysis
description: Obtén más información sobre Datadog Static Analysis para analizar tu
  código en busca de problemas de calidad y vulnerabilidades de seguridad antes de
  que llegue a producción.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-ci-pipelines/
  tag: Blog
  text: Monitorizar todos tus pipelines CI con Datadog
- link: /integrations/guide/source-code-integration/
  tag: Documentación
  text: Más información sobre Source Code Integration
is_beta: false
title: Configuración de Static Analysis
---

{{< callout url="#" btn_hidden="true" header="Join the Preview!" >}}
Code Analysis está en vista previa.
{{< /callout >}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    El análisis de código no está disponible para el sitio {{< region-param key="dd_site_name" >}}.
</div>
{{% /site-region %}}

## Visión general
Para configurar Datadog Static Analysis, vaya a [**Software Delivery** > **Code Analysis**][1].

## Seleccione dónde ejecutar los análisis estáticos
### Escanear con Datadog-hosted scanning

{{< callout url="#" header="false" btn_hidden="true" >}}
 Datadog-Las exploraciones de análisis estático alojadas se encuentran en vista previa. Póngase en contacto con su Customer Success Manager para solicitar acceso.
{{< /callout >}}

Puede ejecutar análisis estáticos de Datadog directamente en Datadog's infraestructura. Para empezar, vaya a la página [**Análisis de código**][1].

### Escanear en pipelines CI
Datadog El análisis estático se ejecuta en sus canalizaciones CI utilizando la [`datadog-ci` CLI][8]. Configurar sus [Datadog API y claves de aplicación (requiere la `code_analysis_read` contexto )][3] y ejecute el análisis estático en el proveedor CI correspondiente.

{{< whatsnext desc="See instructions based on your CI provider:">}}
    {{< nextlink href="code_analysis/static_analysis/circleci_orbs" >}}CircleCI Orbs{{< /nextlink >}}
    {{< nextlink href="code_analysis/static_analysis/github_actions" >}}Acciones de GitHub{{< /nextlink >}}
    {{< nextlink href="code_analysis/static_analysis/generic_ci_providers" >}}Proveedores genéricos de CI{{< /nextlink >}}
{{< /whatsnext >}}

## Seleccione su proveedor de gestión de código fuente
Datadog Static Analysis soporta todos los proveedores de gestión de código fuente, con soporte nativo para GitHub.
### Configurar GitHub integración
Si GitHub es su proveedor de gestión de código fuente, debe Configurar una aplicación GitHub utilizando el [GitHub integración cuadro ][9] y configurar el [código fuente integración][10] para ver fragmentos de código en línea y habilitar [pull request comments][11].

Al instalar una aplicación de GitHub, se requieren los siguientes permisos para habilitar determinadas funciones:

- `Content: Read`, que permite ver fragmentos de código mostrados en Datadog
- `Pull Request: Read & Write`, que permite a Datadog añadir comentarios sobre infracciones directamente en tus pull requests utilizando [pull request comments][11], así como abrir pull requests para [fix vulnerabilities][12].

### Otros proveedores de gestión de código fuente
Si utiliza otro proveedor de gestión de código fuente, Configurar Ejecute análisis estáticos en sus canalizaciones CI utilizando la herramienta CLI `datadog-ci` y [suba los resultados](#upload-third-party-static-analysis-results-to-Datadog) a Datadog.
Usted **debe** ejecutar un análisis de su repositorio en la rama por defecto antes de que los resultados puedan empezar a aparecer en la página **Análisis de código**.

## Personalice su Configuración
Por defecto, Datadog Análisis Estático escanea sus repositorios con [Datadog's rulesets][6] para su(s) lenguaje(s) de programación. Para personalizar qué reglas desea aplicar y dónde, añada un archivo `static-analysis.datadog.yml` al **directorio raíz** de su repositorio.

Puede incluir las siguientes opciones **globales** en el fichero `static-analysis.datadog.yml`:

| Nombre Descripción Obligatorio Predeterminado
|--------------------|--------------------------------------------------------------------------------------------|----------|---------|
| `rulesets` | Un lista de nombres de conjuntos de reglas y configuraciones. [Ver todos los conjuntos de reglas disponibles][6].              | `true` 
| `ignore` | Un lista de prefijos de ruta y patrones glob a ignorar. Los archivos que coincidan no serán analizados.  | `false` 
| `only` | A lista de prefijos de ruta y patrones glob a analizar. Sólo se analizarán los archivos que coincidan. | `false` | |
| `ignore-gitignore` | No utilice las rutas listadas en el archivo `.gitignore` para omitir el análisis de determinados archivos.        | `false` `false` 
| `max-file-size-kb` | Ignorar archivos mayores que el tamaño especificado (en unidades kB).                                    | `false` `200` 

Puede incluir las siguientes opciones **ruleset** en el archivo `static-analysis.datadog.yml`:

| Nombre Descripción Obligatorio
|--------------------|----------------------------------------------------------------------------------------------------------------------|----------|
| `rules` | Un lista de configuraciones de reglas para reglas pertenecientes a ruleset.                                                        | `false` 
| `ignore` | Un lista de prefijos de ruta y patrones glob a ignorar para este conjunto de reglas específico. Los archivos coincidentes no serán analizados.  | `false` 
| `only` | Un lista de prefijos de ruta y patrones glob a analizar para este conjunto de reglas específico. Sólo se analizarán los archivos coincidentes. `false` 

Puede incluir las siguientes opciones **rule** en el archivo `static-analysis.datadog.yml`:

| Nombre Descripción Obligatorio
|--------------------|----------------------------------------------------------------------------------------------------------------------|----------|
| `ignore` | Un lista de prefijos de ruta y patrones glob a ignorar para esta regla específica. Los archivos coincidentes no se analizarán.     | `false` 
| `only` | Un lista de prefijos de ruta y patrones glob a analizar para esta regla específica. Sólo se analizarán los archivos coincidentes.   | `false` 
| `arguments` | Un mapa de valores para las reglas que admiten argumentos personalizables.                                                       | `false` 

El mapa del campo `arguments` utiliza el nombre de un argumento como clave, y los valores son cadenas o mapas:

* Para establecer un valor para todo el repositorio, puede especificarlo como una cadena.
* Para establecer diferentes valores para diferentes subárboles en el repositorio, puede especificarlos como un mapa desde el prefijo de un subárbol al valor que tendrá el argumento dentro de ese subárbol.

La estructura completa del archivo `static-analysis.datadog.yml` es la siguiente:

```yaml
rulesets:
  - ruleset-name
  - ruleset-name:
    # Sólo aplica este conjunto de reglas a las siguientes rutas/archivos
    solamente
      - "ruta/ejemplo"
      - "**/*.archivo"
    # No aplicar este conjunto de reglas en las siguientes rutas/archivos
    ignorar:
      - "ruta/ejemplo"
      - "**/*.archivo"
  - ruleset-name:
    rules:
      nombre-regla:
        # Aplicar esta regla sólo a las siguientes rutas/archivos
        únicamente
          - "ruta/ejemplo"
          - "**/*.archivo"
        # No aplicar esta regla a las siguientes rutas/archivos
        ignorar:
          - "ruta/ejemplo"
          - "**/*.archivo"
        argumentos:
          # Establece el argumento de la regla como valor.
          nombre-argumento: valor
      nombre-regla:
        arguments:
          # Establece diferentes valores de argumento en diferentes subárboles
          nombre-argumento:
            # Establece el argumento de la regla en valor_1 por defecto (ruta raíz del repositorio)
            /: valor_1
            # Establecer el argumento de la regla a valor_2 para rutas específicas
            ruta/ejemplo: valor_2
# Sólo analizar cualquier conjunto de reglas en las siguientes rutas/archivos
sólo
  - "ruta/ejemplo"
  - "**/*.archivo"
# No analizar ningún conjunto de reglas en las siguientes rutas/archivos
ignorar:
  - "ruta/ejemplo"
  - "**/*.archivo"
```

Archivo de ejemplo Configuración:

```yaml
rulesets:
  - Python-prácticas recomendadas
  - Python-seguridad
  - Python-estilo de código:
    rules:
      max-función-lines:
        # No aplicar la regla max-función-lines a los siguientes ficheros
        ignorar:
          - "src/main/util/proceso.py"
          - "src/main/util/datetime.py"
        argumentos:
          # Establezca el umbral de la regla max-función-lines en 150 líneas
          max-lines: 150
      max-clase-líneas:
        argumentos:
          # Establecer diferentes umbrales para la regla max-class-lines en diferentes subárboles
          max-lines:
            # Establece el umbral de la regla en 200 líneas por defecto (ruta raíz del repositorio)
            /: 200
            # Establece el umbral de la regla en 100 líneas en src/main/backend
            src/main/backend: 100
  - Python-inclusivo
  - Python-django:
    # Aplicar el conjunto de reglas Python-django sólo a las siguientes rutas
    only
      - "src/main/backend"
      - "src/main/django"
    # No aplicar el conjunto de reglas Python-django en archivos que coincidan con el siguiente patrón
    ignorar:
      - "src/main/backend/util/*.py"
# Analizar sólo los archivos fuente
sólo:
  - "src/main"
  - "src/tests"
  - "**/*.py"
# No analizar ficheros de terceros o generados
ignorar:
  - "lib/third_party"
  - "**/*.generado.py"
  - "**/*.pb.py"
```

### Ignorar violaciones
#### Ignorar para un repositorio
Añada una regla de ignorar en su fichero `static-analysis.datadog.yml`. El siguiente ejemplo ignora la regla `javascript-express/reduce-server-fingerprinting` para todos los directorios.

```
conjunto de reglas:
  - JavaScript-express:
    rules:
      reduce-server-fingerprinting:
        ignorar: "**"
```

#### Ignorar un archivo o directorio
Añada una regla de ignorar en su archivo `static-analysis.datadog.yml`. El ejemplo siguiente ignora la regla `javascript-express/reduce-server-fingerprinting` para este archivo. Para más información sobre cómo ignorar por ruta, consulte la sección [Personalice su Configuración ](#customize-your-Configuración).

```
rulesets:
  - JavaScript-express:
    rules:
      reduce-server-fingerprinting:
        ignorar: "ad-server/src/app.js"
```

#### Ignorar para una instancia específica

Para ignorar un caso concreto de infracción, comente `no-dd-sa` encima de la línea de código que desea ignorar. Esto evita que esa línea produzca una violación. Por ejemplo, en el siguiente fragmento de código Python, la línea `foo = 1` sería ignorada por los análisis estáticos.

```Python
#no-dd-sa
foo = 1
bar = 2
```

También puede utilizar `no-dd-sa` para ignorar sólo una regla concreta en lugar de ignorar todas las reglas. Para ello, especifique el nombre de la regla que desea ignorar en lugar de `<rule-name>` utilizando esta plantilla:

`no-dd-sa:<rule-name>`

Por ejemplo, en el siguiente fragmento de código JavaScript, la línea `my_foo = 1` es analizada por todas las reglas excepto por la regla `javascript-code-style/assignment-name`, que indica al desarrollador que utilice [camelCase][6] en lugar de [snake_case][7].

```JavaScript
// no-dd-sa:JavaScript-code-style/assignment-name
mi_foo = 1
miBarra = 2
```

## Subir los resultados del análisis estático de terceros a Datadog

<div class="alert alert-info">
  La importación de SARIF ha sido probada para Snyk, CodeQL, Semgrep, Checkov, Gitleaks, y Sysdig. Por favor, contacta con <a href="/ayuda">el soporte deDatadog </a> si experimentas algún problema con otras herramientas compatibles con SARIF.
</div>

Puedes enviar resultados de herramientas de análisis de Static Analysis de terceros a Datadog, siempre que estén en el formato interoperable [Static Analysis Results Interchange Format (SARIF)][2]. Se requiere Node.js versión 14 o posterior.

Para cargar un informe SARIF:

1. Asegúrate de que las variables [`DD_API_KEY` y `DD_APP_KEY` están definidas][4].
2. Opcionalmente, define una [variable `DD_SITE`][7] (por defecto es `datadoghq.com`).
3. Instala la utilidad `datadog-ci`:

   ```bash
   npm install -g @datadog/datadog-ci
   ```

4. Ejecuta la herramienta de Static Analysis de terceros en tu código y obtén los resultados en formato SARIF.
5. Carga los resultados en Datadog:

   ```bash
   datadog-ci sarif upload $OUTPUT_LOCATION
   ```

## Exploración diferencial

El análisis diferencial permite al analizador estático de Datadog analizar únicamente los archivos modificados por un commit en una rama de características. Acelera significativamente el tiempo de análisis al no tener que ejecutar el análisis en cada archivo del repositorio en cada análisis. Para habilitar el análisis diferencial en tu pipeline CI, sigue estos pasos:

1. Asegúrate de que las variables `DD_APP_KEY`, `DD_SITE` y `DD_API_KEY` están configuradas en tu pipeline CI.
2. Añade una llamada a `datadog-ci git-metadata upload` antes de invocar el analizador estático. Este comando asegura que los metadatos Git están disponibles para el backend Datadog. Los metadatos Git son necesarios para calcular el número de archivos a analizar.
3. Asegúrate de que el analizador estático Datadog se invoca con la marca `--diff-aware`.

Ejemplo de secuencia de comandos (estos comandos deben invocarse en tu repositorio Git):
```bash
datadog-ci git-metadata upload

datadog-static-analyzer -i /path/to/directory -g -o sarif.json -f sarif –-diff-aware <...other-options...>
```

**Nota:** Cuando no es posible realizar un análisis diferencial, se analiza todo el directorio.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/ci/setup/code-analysis
[2]: https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=sarif
[3]: /es/developers/ide_plugins/idea/#static-analysis
[4]: /es/account_management/api-app-keys/
[6]: /es/code_analysis/static_analysis_rules
[7]: /es/getting_started/site/
[8]: https://github.com/DataDog/datadog-ci
[9]: /es/integrations/github/#link-a-repository-in-your-organization-or-personal-account
[10]: /es/integrations/guide/source-code-integration
[11]: /es/code_analysis/github_pull_requests/
[12]: /es/code_analysis/github_pull_requests#fixing-a-vulnerability-directly-from-datadog