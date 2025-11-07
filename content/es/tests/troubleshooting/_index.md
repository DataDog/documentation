---
further_reading:
- link: /continuous_integration/tests
  tag: Documentación
  text: Para aprender a monitorizar tus tests CI
title: Solucionar problemas de la Optimización de tests
---

## Información general

Este página proporciona información para ayudarte a solucionar problemas con Test Optimization (Optimización de tests). Si necesitas ayuda adicional, ponte en contacto con el [soporte de Datadog][2].

## Tus tests están instrumentados, pero Datadog no muestra ningún dato

1. Ve a la página [**Tests**][3] del lenguaje que estás instrumentando. En la sección **Compatibilidad**, comprueba que el marco para tests que estás utilizando es compatible.
2. Fíjate si ves los resultados de algún test en la sección [**Ejecuciones de tests**][4]. Si ves resultados allí, pero no en la sección [**Tests**][5], esto significa que falta información de Git. Para solucionarlo, consulta [Los datos aparecen en las ejecuciones de tests pero no en los tests](#data-appears-in-test-runs-but-not-tests).
3. Si informas de los datos a través del Datadog Agent, asegúrate de que existe [conectividad de red][15] desde tu host de ejecución de tests al host y puerto del Agent. Ejecuta tus tests con el nombre de host apropiado del Agent establecido en la variable de entorno `DD_AGENT_HOST` y el puerto apropiado en la variable de entorno `DD_TRACE_AGENT_PORT`. Puedes activar el [modo de depuración][6] en el rastreador para verificar la conectividad con el Agent.
4. Si estás enviando los datos directamente a Datadog ("modo sin Agent"), asegúrate de que existe la [conectividad de red][16] desde los hosts que ejecutan tests a los hosts de Datadog. Puedes activar el [modo de depuración][6] en el rastreador para verificar la conectividad con Datadog.
5. Si sigues sin ver resultados, [ponte en contacto con el servicio de asistencia][2] para recibir ayuda y solucionar el problema.

## Estás cargando informes de tests JUnit con `datadog-ci` pero faltan algunos o todos los tests
Si estás cargando archivos de informes de tests JUnit con la CLI `datadog-ci` y no ves los tests, es probable que los tests se estén descartando debido a que el informe se considera incorrecto.

Los siguientes aspectos hacen que un informe de test JUnit sea incorrecto:
* Una marca de tiempo de los tests informados que es **71 horas** anterior al momento en que se carga el informe.
* Un conjunto de tests sin nombre.

## Los datos aparecen en las ejecuciones de tests pero no en los tests

Si puedes ver los datos de los resultados de los tests en la pestaña **Test Runs** (Ejecuciones de tests), pero no en la pestaña **Tests**, es probable que falten metadatos de Git (repositorio, confirmación o rama). Para confirmar que este es el caso, abre una ejecución de test en la sección [**Ejecuciones de tests**][4] y comprueba que no hay etiquetas `git.repository_url`, `git.commit.sha` o `git.branch`. Si estas etiquetas (tags) no están rellenadas, no se muestra nada en la sección [**Tests**][5].

1. Los rastreadores utilizan primero las variables de entorno, si las hay, configuradas por el proveedor CI, para recopilar información de Git. Para ver una lista de las variables de entorno que el rastreador intenta leer para cada proveedor CI compatible, consulta la [ejecución de tests dentro de un contenedor][7]. Como mínimo, esto rellena el repositorio, el hash de confirmación y la información de la rama.
2. A continuación, los rastreadores obtienen los metadatos de Git utilizando la carpeta local `.git`, si está presente, mediante la ejecución de comandos `git`. Esto rellena todos los campos de metadatos de Git, incluyendo el mensaje de confirmación, el autor y la información del autor de la confirmación. Asegúrate de que la carpeta `.git` está presente y que el binario `git` está instalado y en `$PATH`. Esta información se utiliza para rellenar los atributos no detectados en el paso anterior.
3. También puedes proporcionar información de Git manualmente utilizando variables de entorno, que anulan la información detectada por cualquiera de los pasos anteriores.

   Las variables de entorno admitidas para proporcionar información de Git son:

   `DD_GIT_REPOSITORY_URL` **(Obligatorio)**
   : La URL del repositorio donde se almacena el código. Se admiten URL tanto HTTP como SSH.<br/>
   **Ejemplo**: `git@github.com:MyCompany/MyApp.git`, `https://github.com/MyCompany/MyApp.git`

   `DD_GIT_COMMIT_SHA` **(Obligatorio)**
   : El hash de confirmación completo (SHA1 de 40 caracteres).<br/>
   **Ejemplo**: `a18ebf361cc831f5535e58ec4fae04ffd98d8152`

   `DD_GIT_BRANCH`
   : La rama de Git a la que se realizan tests. Déjala vacía si se proporciona información de etiquetas.<br/>
   **Ejemplo**: `develop`

   `DD_GIT_TAG`
   : La etiqueta de Git a la que se realizan tests (si corresponde). Déjala vacía si se proporciona información de ramas.<br/>
   **Ejemplo**: `1.0.1`

   `DD_GIT_COMMIT_MESSAGE`
   : Mensaje de confirmación.<br/>
   **Ejemplo**: `Set release number`

   `DD_GIT_COMMIT_AUTHOR_NAME`
   : Confirma el nombre del autor.<br/>
   **Ejemplo**: `John Smith`

   `DD_GIT_COMMIT_AUTHOR_EMAIL`
   : Confirma el correo electrónico del autor.<br/>
   **Ejemplo**: `john@example.com`

   `DD_GIT_COMMIT_AUTHOR_DATE`
   : La fecha del autor de la confirmación en formato ISO 8601.<br/>
   **Ejemplo**: `2021-03-12T16:00:28Z`

   `DD_GIT_COMMIT_COMMITTER_NAME`
   : El nombre del autor de la confirmación.<br/>
   **Ejemplo**: `Jane Smith`

   `DD_GIT_COMMIT_COMMITTER_EMAIL`
   : El correo electrónico del autor de la confirmación.<br/>
   **Ejemplo**: `jane@example.com`

   `DD_GIT_COMMIT_COMMITTER_DATE`
   : La fecha de confirmación del autor de la confirmación en formato ISO 8601.<br/>
   **Ejemplo**: `2021-03-12T16:00:28Z`

4. Si no se encuentra ninguna variable de entorno del proveedor CI, los resultados de los tests se envían sin metadatos de Git.

### El tiempo total del test está vacío
Si no puedes ver el tiempo total del test, es probable que la visibilidad a nivel del conjunto de tests no esté habilitada. Para confirmar, comprueba si tu lenguaje es compatible con la visibilidad a nivel del conjunto de tests en [Características admitidas][14]. Si la visibilidad a nivel del conjunto de tests es compatible, actualiza tu rastreador a la última versión.

Si sigues sin ver el tiempo total después de actualizar la versión del rastreador, ponte en contacto con el [servicio de asistencia de Datadog][2] para obtener ayuda.

### El tiempo total del test es diferente del esperado

#### Cómo se calcula el tiempo total
El tiempo total se define como la suma de las duraciones máximas de las sesiones de tests.

1. Se calcula la duración máxima de una sesión de tests agrupada por la huella digital de la sesión de tests.
2. Se suman las duraciones máximas de las sesiones de tests.

## Los números de estado de los tests no son los esperados

Los números de estado de los tests se calculan a partir de los tests individuales que se han recopilado. La singularidad de un test se define no sólo por su conjunto y su nombre, sino también por sus parámetros y configuraciones de tests.

### Los números son más bajos de lo esperado

Si los números son más bajos de lo esperado, es probable que la biblioteca o la herramienta que estás utilizando para recopilar los datos de tests no puedan recopilar parámetros de tests o algunas configuraciones de tests.

1. Si estás cargando archivos de informes de tests JUnit:
    1. Si estás ejecutando los mismos tests en entornos con diferentes configuraciones, [asegúrate de definir esas etiquetas de configuración durante la carga][10].
    2. Si estás ejecutando tests parametrizados, es muy probable que el informe JUnit no tenga esa información. [Prueba a utilizar una biblioteca nativa para informar de los datos de los tests][3].
2. Si sigues sin ver los resultados esperados, [ponte en contacto con el servicio de asistencia][2] para recibir ayuda y solucionar el problema.

### Los números aprobados/fallados/omitidos son diferentes de los esperados

Si el mismo test se recopila varias veces para la misma confirmación, pero con diferente estado, el resultado agregado sigue el algoritmo de la siguiente tabla:

| **Estado del test - Primer intento** | **Estado del test - Reintento n.º 1 | **Resultado** |
|-----------------------------|----------------------------|------------|
| `Passed`                    | `Passed`                   | `Passed`   |
| `Passed`                    | `Failed`                   | `Passed`   |
| `Passed`                    | `Skipped`                  | `Passed`   |
| `Failed`                    | `Passed`                   | `Passed`   |
| `Failed`                    | `Failed`                   | `Failed`   |
| `Failed`                    | `Skipped`                  | `Failed`   |
| `Skipped`                   | `Passed`                   | `Passed`   |
| `Skipped`                   | `Failed`                   | `Failed`   |
| `Skipped`                   | `Skipped`                  | `Skipped`  |

## La rama por defecto no es correcta

### Cómo afecta al producto

La rama por defecto se utiliza para alimentar algunas funciones de los productos, a saber:

- Lista de ramas por defecto en la página Tests: Esta lista sólo muestra las ramas por defecto. Si se configura una rama por defecto incorrecta, pueden faltar datos o pueden aparecer datos incorrectos en la lista de ramas por defecto.

- Nuevos tests defectuosos: Tests que actualmente no están clasificados como defectuosos en la rama por defecto. Si la rama por defecto no está configurada correctamente, esto podría llevar a la detección de un número erróneo de nuevos tests defectuosos.

- Lista de pipelines: La lista de pipelines sólo muestra las ramas por defecto. Si se configura una rama por defecto incorrecta, pueden faltar datos o pueden aparecer datos incorrectos en la lista de pipelines.

### Cómo reparar la rama por defecto

Si tienes acceso de administrador, puedes actualizarla desde la [página de configuración del repositorio][11].

## El historial de ejecución no está disponible para un caso de test específico

Otros síntomas del mismo problema son:
- Un caso de test que no se clasifica como defectuoso aunque muestre defectos.
- Una incidencia de test no puede ser omitida por [Test Impact Analisys][12].

Es probable que la [configuración del caso de test][13] sea inestable porque uno o varios de los parámetros del test no son deterministas (por ejemplo, incluyen la fecha actual o un número aleatorio).

La mejor forma de solucionar este problema es asegurarse de que los parámetros de test son los mismos en todas las ejecuciones de tests.

## Las pestañas de historial de sesión, rendimiento o cobertura de código solo muestran una única ejecución

Es probable que esto se deba a una huella de sesión inestable de test. Hay un conjunto de parámetros que Datadog comprueba para establecer la correspondencia entre las sesiones de test. El comando test utilizado para ejecutar los tests es uno de ellos. Si el comando test contiene una cadena que cambia en cada ejecución, como una carpeta temporal, Datadog considera que las sesiones no están relacionadas entre sí. Por ejemplo:

- `yarn test --temp-dir=/var/folders/t1/rs2htfh55mz9px2j4prmpg_c0000gq/T`
- `mvn test --temp-dir=/var/folders/t1/rs2htfh55mz9px2j4prmpg_c0000gq/T`
- `bundle exec rspec --temp-dir=/var/folders/t1/rs2htfh55mz9px2j4prmpg_c0000gq/T`
- `dotnet test --results-directory /var/folders/t1/rs2htfh55mz9px2j4prmpg_c0000gq/T`

Esto puede solucionarse utilizando la variable de entorno `DD_TEST_SESSION_NAME`. Utiliza `DD_TEST_SESSION_NAME` para identificar un grupo de tests. Los valores de ejemplo para esta etiqueta incluyen:

- `unit-tests`
- `integration-tests`
- `smoke-tests`
- `flaky-tests`
- `ui-tests`
- `backend-tests`

## Test Impact Analysis no muestra ningún ahorro de tiempo

Esto también está causado por una huella de sesión inestable de test. Consulta la sección [La pestaña de historial de sesión, rendimiento o cobertura de código solo muestra una única ejecución](#session-history-performance-or-code-coverage-tab-only-show-a-single-execution) para obtener más información.

## Las etiquetas de gestión de tests defectuosos faltan o tienen un orden inesperado en los eventos de test

Al reintentar un test defectuoso varias veces en un breve tramo de tiempo (menos de un segundo), los eventos de ejecución de test pueden contener etiquetas `@test.is_flaky`, `@test.is_known_flaky` o `@test.is_new_flaky` inesperadas. Se trata de una limitación conocida que se produce debido a una condición de velocidad en el sistema de detección de test defectuoso. En algunos casos, los eventos de ejecución de test pueden ser procesados fuera de orden, causando que las etiquetas no sigan el orden lógico de los eventos.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.jenkins.io/doc/book/system-administration/viewing-logs/
[2]: /es/help/
[3]: /es/continuous_integration/tests/
[4]: https://app.datadoghq.com/ci/test-runs
[5]: https://app.datadoghq.com/ci/test-repositories
[6]: /es/tracing/troubleshooting/tracer_debug_logs
[7]: /es/continuous_integration/tests/containers/
[8]: https://github.com/travisjeffery/timecop
[9]: https://github.com/spulec/freezegun
[10]: /es/continuous_integration/tests/junit_upload/?tabs=linux#collecting-environment-configuration-metadata
[11]: https://app.datadoghq.com/source-code/repositories
[12]: /es/tests/test_impact_analysis/
[13]: /es/tests/#parameterized-test-configurations
[14]: /es/tests/#supported-features
[15]: /es/agent/configuration/network/
[16]: /es/tests/network/