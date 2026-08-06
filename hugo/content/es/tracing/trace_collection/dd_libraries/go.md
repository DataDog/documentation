---
aliases:
- /es/tracing/go/
- /es/tracing/languages/go
- /es/agent/apm/go/
- /es/tracing/setup/go
- /es/tracing/setup_overview/go
- /es/tracing/setup_overview/setup/go
- /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/go
code_lang: go
code_lang_weight: 20
further_reading:
- link: https://github.com/DataDog/dd-trace-go/tree/v1
  tag: Código fuente
  text: Código fuente del SDK
- link: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace
  tag: Sitio externo
  text: Documentación de la API del SDK
- link: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace
  tag: Sitio externo
  text: Documentación de la API del SDK para v2
- link: https://github.com/DataDog/orchestrion
  tag: Código fuente
  text: Código fuente de Orchestrion
- link: /tracing/glossary/
  tag: Documentación
  text: Explora tus servicios, recursos y trazas
title: Trazando aplicaciones Go
type: multi-code-lang
---
## Requisitos de compatibilidad {#compatibility-requirements}

El rastreador de Go requiere Go `1.18+` y el Agente de Datadog `>= 5.21.1`. Para una lista completa de las versiones de Go y el soporte de frameworks de Datadog (incluyendo versiones heredadas y de mantenimiento), consulta la página de [Requisitos de Compatibilidad][1].

{{% tracing-go-v2 %}}

## Introducción {#getting-started}

Antes de comenzar, asegúrate de haber [instalado y configurado el Agente][5].

Hay dos formas de instrumentar tu aplicación Go:

1. **Instrumentación en tiempo de compilación**:
   - Asegura la máxima cobertura de tu instrumentación de trazado.
   - No requiere modificaciones en el código fuente, lo que lo hace ideal para integrar a nivel de CI/CD.
1. **Instrumentación manual**:

   Utiliza dd-trace-go junto con nuestros paquetes de integración para generar automáticamente tramos sobre las bibliotecas que elijas. Esta opción:
   - Te brinda control total sobre qué partes de tu aplicación son rastreadas.
   - Requiere modificar el código fuente de la aplicación.

Consulta las instrucciones en la sección correspondiente a tu preferencia a continuación:

{{< tabs >}}

{{% tab "Instrumentación en tiempo de compilación" %}}

### Descripción general {#overview}

[Orchestrion][6] agrega automáticamente instrumentación a las aplicaciones de Go durante la compilación, eliminando la necesidad de cambios en el código. Proporciona una cobertura de rastreo integral y habilita características de seguridad exclusivas:

- Cobertura de rastreo integral:
   - Instrumenta tu código y todas las dependencias, incluida la biblioteca estándar de Go
   - Instrumenta tu código durante la compilación, previniendo brechas en la cobertura de rastreo debido a la instrumentación manual pasada por alto
- Protección exclusiva [App y API][7] **Prevención de explotación** característica. [Prevención de explotación][15] es una implementación de Protección de Aplicaciones en Tiempo de Ejecución (RASP) e incluye métodos RASP como Inclusión de Archivos Locales (LFI).

### Requisitos {#requirements}

- Soporta las dos últimas versiones de tiempo de ejecución de Go (de acuerdo con [la política de lanzamiento oficial de Go][8]).
- Las aplicaciones deben ser gestionadas utilizando [módulos de Go][10]. Se admite la venta de módulos.


### Instalar Orchestrion {#install-orchestrion}

Para instalar y configurar Orchestrion:

1. Instalar Orchestrion:
   ```sh
   go install github.com/DataDog/orchestrion@latest
   ```
   <div class="alert alert-info">Asegúrate de que <code>$(go env GOBIN)</code> o <code>$(go env GOPATH)/bin</code> está en tu <code>$PATH</code>.</div>

1. Registra Orchestrion en el `go.mod` de tu proyecto:
   ```sh
   orchestrion pin
   ```
   Consulta la salida de `orchestrion pin -help` para obtener más información sobre las opciones de personalización disponibles.
1. Confirma los cambios en tu sistema de control de versiones (a menos que estés integrando `orchestrion` directamente en tu canalización de CI/CD):
   ```sh
   git add go.mod go.sum orchestrion.tool.go
   git commit -m "chore: enable orchestrion"
   ```

   Ahora puedes gestionar tu dependencia de `orchestrion` como cualquier otra dependencia utilizando el archivo `go.mod`.

### Uso {#usage}

Utiliza uno de estos métodos para habilitar Orchestrion en tu proceso de construcción:

#### Anteponer `orchestrion` a tus comandos habituales de `go`: {#prepend-orchestrion-to-your-usual-go-commands}
  ```sh
  orchestrion go build .
  orchestrion go run .
  orchestrion go test ./...
  ```
#### Agrega el argumento `-toolexec="orchestrion toolexec"` a tus comandos de `go`: {#add-the-toolexecorchestrion-toolexec-argument-to-your-go-commands}
   ```sh
   go build -toolexec="orchestrion toolexec" .
   go run -toolexec="orchestrion toolexec" .
   go test -toolexec="orchestrion toolexec" ./...
   ```
#### Modifica la variable de entorno `$GOFLAGS` para inyectar Orchestrion, y utiliza los comandos `go` normalmente: {#modify-the-goflags-environment-variable-to-inject-orchestrion-and-use-go-commands-normally}
   ```sh
   # Make sure to include the quotes as shown below, as these are required for
   # the Go toolchain to parse GOFLAGS properly!
   export GOFLAGS="${GOFLAGS} '-toolexec=orchestrion toolexec'"
   go build .
   go run .
   go test ./...
   ```

### Personalización de trazas {#trace-customization}

#### Configurando el etiquetado de servicio unificado {#setting-up-unified-service-tagging}

Las aplicaciones instrumentadas por `orchestrion` soportan el Etiquetado de Servicio Unificado (UST). Puedes establecer etiquetas UST para tus trazas configurando la variable de entorno correspondiente en el entorno de **ejecución** de tu aplicación:

| Entorno de Etiquetas Unificadas |  |
|-------------|--------------|
| `env`       | `DD_ENV`     |
| `service`   | `DD_SERVICE` |
| `version`   | `DD_VERSION` |

Para más información, consulta la [documentación de Etiquetado de Servicio Unificado][14].

#### Configuración del trazador {#tracer-configuration}

Consulta [Configuración de la Biblioteca][16] para instrucciones de configuración.

#### Crea tramos de traza personalizados {#create-custom-trace-spans}

Los tramos de traza personalizados pueden ser creados automáticamente para cualquier función anotada con el comentario de directiva `//dd:span`:

{{<code-block lang="go" filename="example.go" collapsible="true">}}
//dd:span custom_tag:tag_value
func CriticalPathFunction() {
  // ... implementation details ...
}
{{</code-block>}}

Esto también funciona con expresiones literales de función:

{{<code-block lang="go" filename="example.go" collapsible="true">}}
//dd:span custom_tag:tag_value
handler := func(w http.ResponseWriter, r *http.Request) {
  // ... implementation details ...
}
{{</code-block>}}

#### Nombre de la Operación {#operation-name}

El nombre de la operación (`span.name`) se determina automáticamente utilizando la siguiente precedencia:
1. Una etiqueta `span.name:customOperationName` explícita especificada como un argumento de directiva
2. El nombre declarado de la función (esto no se aplica a expresiones literales de función, que son anónimas)
3. El valor de la primera etiqueta proporcionada a la lista de argumentos de directiva

{{<code-block lang="go" filename="example.go" collapsible="true">}}
//dd:span tag-name:spanName other-tag:bar span.name:operationName
func tracedFunction() {
  // This function will be represented as a span named "operationName"
}

//dd:span tag-name:spanName other-tag:bar
func otherTracedFunction() {
  // This function will be represented as a span named "otherTracedFunction"
}

//dd:span tag-name:spanName other-tag:bar
tracedFunction := func() {
  // This function will be represented as a span named "spanName"
}
{{</code-block>}}

#### Resultados de Error {#error-results}

Si la función anotada devuelve un `error` resultado, cualquier error devuelto por la función se adjuntará automáticamente al intervalo de traza correspondiente:

{{<code-block lang="go" filename="example.go" collapsible="true">}}
//dd:span
func failableFunction() (any, error) {
  // This span will have error information attached automatically.
  return nil, errors.ErrUnsupported
}
{{</code-block>}}

#### Prevenga la instrumentación de algún código {#prevent-instrumentation-of-some-code}

Puede usar la directiva `//orchestrion:ignore` para evitar que `orchestrion` realice _cualquier_ modificación en el código anotado.

Esto se puede usar para evitar que la instrumentación del lado del llamador se aplique a ubicaciones específicas:

{{<code-block lang="go" filename="example.go" collapsible="true">}}
import "database/sql"

// Caller-side instrumentation normally happens within this function...
func normal() {
  // The following assignment will NOT be modified to add any caller-side
  // instrumentation as it is opted out by the orchestrion:ignore directive:
  //orchestrion:ignore
  db, err := sql.Open("driver-name", "database=example")
  // ...
}

// Caller-side instrumentation will NOT happen in the following function
// as it is annotated with orchestrion:ignore.
//orchestrion:ignore
func excluded() {
  // The following assignment will NOT be modified to add any caller-side
  // instrumentation as the surrounding context is excluded by an
  // orchestrion:ignore directive:
  db, err := sql.Open("driver-name", "database=example")
  // ...
}
{{</code-block>}}

Parte de la instrumentación realizada por `orchestrion` se hace del lado del llamado (o del lado de la biblioteca), lo que significa que la integración se agrega directamente dentro de la dependencia misma. En tales casos, no es posible optar localmente por no participar en tales integraciones.

#### Use el SDK {#use-the-sdk}

Puede usar el [SDK][4] en su aplicación construida con Orchestrion. Esto es útil para instrumentar marcos que aún no son compatibles con Orchestrion. Sin embargo, tenga en cuenta que esto puede resultar en tramos de traza duplicados en el futuro a medida que se expanda el soporte de Orchestrion. Revise las [notas de la versión][11] al actualizar su dependencia `orchestrion` para mantenerse informado sobre nuevas características y ajustar su instrumentación manual según sea necesario.

#### Utilice el perfilador continuo {#use-the-continuous-profiler}

Su aplicación construida con Orchestrion incluye instrumentación de [perfilador continuo][12].
Para habilitar el perfilador, establezca la variable de entorno `DD_PROFILING_ENABLED=true` en tiempo de ejecución.

#### Elimine integraciones {#remove-integrations}

Puede eliminar integraciones modificando las importaciones en el archivo `orchestrion.tool.go`.
También puede crear su propio archivo `orchestrion.tool.go` antes de ejecutar `orchestrion`.
Podría hacer esto si no desea una integración,
o si desea reducir el número de dependencias transitivas para integraciones que su programa no utiliza.
Por defecto, Orchestrion importa `github.com/DataDog/dd-trace-go/orchestrion/all/v2`,
que importa cada biblioteca para la cual hay una integración de Orchestrion.
Puede reemplazar esta importación con importaciones de solo las integraciones que desea utilizar.
Consulte [el código fuente del SDK][17] para la lista de integraciones compatibles.

**Nota**: Si elige importar integraciones específicas, debe actualizar manualmente `orchestrion.tool.go` cada vez que desee agregar una nueva integración.

### Construyendo con Docker {#building-with-docker}

Para obtener más información sobre cómo crear una imagen de Docker adecuada, consulte [Creando un Dockerfile para APM para Go][18].

### Solución de problemas {#troubleshooting}

Para solucionar problemas de compilaciones que `orchestrion` gestiona, consulte [Solución de problemas de instrumentación en tiempo de compilación de Go][13].

[4]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace
[6]: https://github.com/DataDog/orchestrion
[7]: /es/security/application_security/exploit-prevention
[8]: https://go.dev/doc/devel/release#policy
[10]: https://pkg.go.dev/cmd/go#hdr-Modules__module_versions__and_more
[11]: https://github.com/DataDog/orchestrion/releases
[12]: /es/profiler
[13]: /es/tracing/troubleshooting/go_compile_time/
[14]: /es/getting_started/tagging/unified_service_tagging/
[15]: /es/security/application_security/exploit-prevention/
[16]: /es/tracing/trace_collection/library_config/go/#traces
[17]: https://github.com/DataDog/dd-trace-go/blob/main/orchestrion/all/orchestrion.tool.go
[18]: /es/tracing/guide/orchestrion_dockerfile/

{{% /tab %}}

{{% tab "Instrumentación manual" %}}

### Agrega el SDK a tu aplicación {#add-the-sdk-to-your-application}

Primero, importa e inicia el SDK en tu código siguiendo la documentación de [Configuración de la Biblioteca][3]. Consulta la [documentación de la API][6] (o la [documentación de la API v1][4]) para obtener instrucciones de configuración y detalles sobre el uso de la API.

### Activa las integraciones de Go para crear tramos {#activate-go-integrations-to-create-spans}

Activa las [integraciones de Go][1] para generar tramos. Datadog cuenta con una serie de paquetes plugables que proporcionan soporte inmediato para instrumentar una serie de bibliotecas y frameworks. Una lista de estos paquetes se puede encontrar en la página de [Requisitos de Compatibilidad][1]. Importa estos paquetes en tu aplicación y sigue las instrucciones de configuración que se enumeran junto a cada integración.

[1]: /es/tracing/compatibility_requirements/go
[3]: /es/tracing/trace_collection/library_config/go/
[4]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace
[6]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace

{{% /tab %}}

{{< /tabs >}}

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/compatibility_requirements/go
[5]: /es/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent