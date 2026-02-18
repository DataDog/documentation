---
aliases:
- /es/tracing/go/
- /es/tracing/languages/go
- /es/agent/apm/go/
- /es/tracing/setup/go
- /es/tracing/setup_overview/go
- /es/tracing/setup_overview/setup/go
- /es/tracing/trace_collection/dd_libraries/go
code_lang: go
code_lang_weight: 20
further_reading:
- link: https://github.com/DataDog/dd-trace-go/tree/v1
  tag: Código fuente
  text: Código fuente de la librería del rastreador
- link: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace
  tag: Sitio externo
  text: Documentación de la API de la librería del rastreador
- link: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace
  tag: Sitio externo
  text: Documentación de la API de la librería del rastreador para v2
- link: https://github.com/DataDog/orchestrion
  tag: Código fuente
  text: Código fuente de Orchestrion
- link: /tracing/glossary/
  tag: Documentación
  text: Explorar tus servicios, recursos y trazas (traces)
title: Rastreo de aplicaciones Go
type: lenguaje de código múltiple
---

<div class="alert alert-info">
El rastreador de Go v2 está en vista previa. Consulta <a href="/tracing/trace_collection/custom_instrumentation/go/migration">la guía de migración</a> para actualizar.
</div>


## Requisitos de compatibilidad

El rastreador de Go requiere Go `v1.18 o superiores` y el Datadog Agent v5.21.1 o anteriores. Para ver la lista completa de versiones de Go y de compatibilidad de marcos de Datadog (incluidas las versiones heredadas y de mantenimiento), consulta la página de [requisitos de compatibilidad][1].

## Empezando

Antes de empezar, asegúrate de que ya has [instalado y configurado el Agent][5].

Hay dos maneras de instrumentar tu aplicación de Go:

1. **Instrumentación del tiempo de compilación**:
   - Asegura la máxima cobertura de tu instrumentación de rastreo.
   - No requiere modificaciones del código fuente, por lo que es ideal para la integración a nivel de CI/CD.
1. **Instrumentación manual**:

   Utiliza dd-trace-go junto con nuestros paquetes de integración para generar automáticamente tramos (spans) sobre bibliotecas de tu elección. Esta opción:
   - Te ofrece un control total sobre qué partes de tu aplicación se rastrean.
   - Requiere modificar el código fuente de la aplicación.

Consulta a continuación las instrucciones de la sección correspondiente a tu preferencia:

{{< tabs >}}

{{% tab "Instrumentación de tiempo de compilación" %}}

### Información general

[Orchestrion][6] añade automáticamente Instrumentación a las aplicaciones Go durante la compilación, eliminando la necesidad de realizar cambios en el código. Proporciona una amplia cobertura de rastreo y habilita funciones de seguridad exclusivas:

- Amplia cobertura de rastreo:
   - Instrumenta tu código y todas las dependencias, incluida la librería estándar de Go
   - Instrumenta el código durante la compilación, lo que evita lagunas en la cobertura de rastreo debidas a errores manuales pasados por alto en la instrumentación manual.
- Función **Exploit Prevention** (Prevención de exploits) exclusiva de [Application Security Management][7]. La [Prevención de exploits][15] es una implementación de Runtime Application Self-Protection (RASP) e incluye métodos RASP como la inclusión de archivos locales (LFI).

### Requisitos

- Admite las dos últimas versiones de Go (que coinciden con la versión oficial de la política de Go][8]).
- Las aplicaciones deben gestionarse mediante [módulos de Go][10]. Se admite la venta de módulos.


### Instalar Orchestrion

Para instalar y configurar Orchestrion:

1. Instalar Orchestrion:
   ```sh
   go install github.com/DataDog/orchestrion@latest
   ```
   <div class="alert alert-info"><strong>Nota</strong>: Asegúrate de que <code>$(go env GOBIN)</code> o <code>$(go env GOPATH)/bin</code> está en tu ruta <code>$PATH</code>.</div>

1. Registra Orchestrion en el `go.mod` de tu proyecto:
   ```sh
   orchestrion pin
   ```
   Consulta la salida de `orchestrion pin -help` para obtener más información sobre las opciones de personalización disponibles.
1. Confirma los cambios en tu sistema de control de versiones (a menos que estés integrando `orchestrion` directamente en tu proceso de CI/CD):
   ```sh
   git add go.mod go.sum orchestrion.tool.go
   git commit -m "chore: enable orchestrion"
   ```

   Ahora puedes gestionar tu dependencia de `orchestrion` como cualquier otra dependencia utilizando el archivo `go.mod`.

### Utilización

Utiliza uno de estos métodos para activar Orchestrion en tu proceso de compilación:

#### Añade `orchestrion` a tus comandos habituales de `go`:
  ```sh
  orchestrion go build .
  orchestrion go run .
  orchestrion go test ./...
  ```
#### Añade el argumento `-toolexec="orchestrion toolexec"` a tus comandos `go`:
   ```sh
   go build -toolexec="orchestrion toolexec" .
   go run -toolexec="orchestrion toolexec" .
   go test -toolexec="orchestrion toolexec" ./...
   ```
#### Modifica la variable de entorno `$GOFLAGS` para inyectar Orchestrion y utiliza normalmente los comandos `go`:
   ```sh
   # Make sure to include the quotes as shown below, as these are required for
   # the Go toolchain to parse GOFLAGS properly!
   export GOFLAGS="${GOFLAGS} '-toolexec=orchestrion toolexec'"
   go build .
   go run .
   go test ./...
   ```

### Personalización de trazas

#### Configuración del etiquetado unificado de servicios

Las aplicaciones instrumentadas por `orchestrion` admiten el etiquetado unificado de servicios (UST). Puedes configurar etiquetas (tags) del UST para tus trazas (traces) al configurar la variable de entorno correspondiente en el entorno de **tiempo de ejecución** de tu aplicación:

| Etiquetado unificado | Entorno  |
|-------------|--------------|
| `env`       | `DD_ENV`     |
| `service`   | `DD_SERVICE` |
| `version`   | `DD_VERSION` |

Para más información, consulta la [documentación del etiquetado unificado de servicios][14].

#### Configuración del rastreador

Consulta [Configuración de librería][16] para obtener instrucciones sobre la configuración.

#### Crear tramos de trazas personalizadas

Se pueden crear automáticamente tramos de trazas personalizadas para cualquier función anotada con el comentario de directiva `//dd:span`:

{{<code-block lang="go" filename="example.go" collapsible="true">}}
//dd:span custom_tag:tag_value
func CriticalPathFunction() {
  // ... detalles de implementación ...
}
{{</code-block>}}

Esto también funciona con las expresiones literales de función:

{{<code-block lang="go" filename="example.go" collapsible="true">}}
//dd:span custom_tag:tag_value
handler := func(w http.ResponseWriter, r *http.Request) {
  // ... detalles de implementación ...
}
{{</code-block>}}

#### Nombre de la operación

El nombre de la operación (`span.name`) se determina automáticamente utilizando la siguiente precedencia:
1. Una etiqueta `span.name:customOperationName` explícita especificada como argumento directivo
2. El nombre declarado de la función (esto no se aplica a las expresiones literales de función, que son anónimas)
3. El valor de la primer etiqueta proporcionada a la lista de argumentos directivos

{{<code-block lang="go" filename="example.go" collapsible="true">}}
//dd:span tag-name:spanName other-tag:bar span.name:operationName
func tracedFunction() {
  // Esta función se representará como un tramo denominado "operationName"
}

//dd:span tag-name:spanName other-tag:bar
func otherTracedFunction() {
  // Esta función se representará como un tramo denominado "otherTracedFunction"
}

//dd:span tag-name:spanName other-tag:bar
tracedFunction := func() {
  // Esta función se representará como un tramo denominado "spanName"
}
{{</code-block>}}

#### Resultados de errores

Si la función anotada devuelve un resultado `error`, cualquier error devuelto por la función se adjuntará automáticamente al tramo de traza correspondiente:

{{<code-block lang="go" filename="example.go" collapsible="true">}}
//dd:span
func failableFunction() (any, error) {
  // Este tramo tendrá información del error adjunta automáticamente.
  return nil, errors.ErrUnsupported
}
{{</code-block>}}

#### Evitar la instrumentación de algunos códigos

Puedes utilizar la directiva `//orchestrion:ignore` para evitar que `orchestrion` realice _cualquier_ modificación en el código anotado.

Esto se puede utilizar para evitar que se aplique la instrumentación del lado de quien llama a localizaciones específicas:

{{<code-block lang="go" filename="example.go" collapsible="true">}}
import "database/sql"

// La instrumentación del lado de quien llama normalmente ocurre dentro de esta función...
func normal() {
  // La siguiente asignación NO será modificada para añadir ninguna instrumentación del lado de quien llama
  // ya que está excluida por la directiva orchestrion:ignore:
  //orchestrion:ignore
  db, err := sql.Open("driver-name", "database=example")
  // ...
}

// La instrumentación del lado de quien llama NO ocurrirá en la siguiente función
// ya que está anotada con orchestrion:ignore.
//orchestrion:ignore
func excluded() {
  // La siguiente asignación NO se modificará para añadir ninguna instrumentación
  // del lado de quien llama, ya que el contexto circundante está excluido por una directiva
  // orchestrion:ignore:
  db, err := sql.Open("driver-name", "database=example")
  // ...
}
{{</code-block>}}

Parte de la instrumentación realizada por `orchestrion` se lleva a cabo del lado del receptor de la llamada (o del lado de librería), lo que significa que la integración se añade directamente dentro de la propia dependencia. En estos casos, no es posible excluir localmente este tipo de integraciones.

#### Utilizar la librería de rastreo

Puedes utilizar la [biblioteca de rastreo][4] en tu aplicación creada con Orchestrion. Esto es útil para instrumentar marcos aún no compatibles por Orchestrion. Sin embargo, ten en cuenta que esto puede resultar en tramos de traza duplicados en el futuro a medida que se amplíe la compatibilidad de Orchestrion. Revisa las [notas de la versión][11] cuando actualices tu dependencia de `orchestrion` para mantenerte informado sobre las nuevas características y ajusta tu instrumentación manual según sea necesario.

#### Utilizar el perfilador continuo

Tu aplicación creada con Orchestrion incluye la instrumentación del [perfilador continuo][12].
Para activar el perfilador, establece la variable de entorno `DD_PROFILING_ENABLED=true` en el tiempo de ejecución.

### Solucionar problemas

Para solucionar los problemas de compilación que gestiona `orchestrion`, consulta [solucionar problemas de instrumentación del tiempo de compilación de Go][13].

[4]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace
[6]: https://github.com/DataDog/orchestrion
[7]: /es/security/application_security/threats/exploit-prevention
[8]: https://go.dev/doc/devel/release#policy
[10]: https://pkg.go.dev/cmd/go#hdr-Modules__module_versions__and_more
[11]: https://github.com/DataDog/orchestrion/releases
[12]: /es/profiler
[13]: /es/tracing/troubleshooting/go_compile_time/
[14]: /es/getting_started/tagging/unified_service_tagging/
[15]: /es/security/application_security/threats/exploit-prevention/
[16]: /es/tracing/trace_collection/library_config/go/#traces


{{% /tab %}}

{{% tab "Instrumentación manual" %}}

### Añadir la librería del rastreador a tu aplicación

En primer lugar, importa e inicia el rastreador en tu código siguiendo la documentación de [Configuración de la librería][3]. Consulta la [documentación de la API][4] (o la [documentación de la API v2][6]) para obtener instrucciones y detalles de configuración sobre el uso de la API.

### Integraciones activas de Go para crear tramos

Activa las [integraciones de Go][1] para generar tramos. Datadog tiene una serie de paquetes conectables que proporcionan soporte "predefinido" para instrumentar una serie de librerías y marcos. En la página [Requisitos de compatibilidad][1] se puede encontrar una lista de estos paquetes. Importa estos paquetes a tu aplicación y sigue las instrucciones de configuración que aparecen junto a cada integración.

[1]: /es/tracing/compatibility_requirements/go
[3]: /es/tracing/trace_collection/library_config/go/
[4]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace
[6]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace

{{% /tab %}}

{{< /tabs >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/compatibility_requirements/go
[5]: /es/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
