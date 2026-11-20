---
further_reading:
- link: getting_started/profiler
  tag: Documentación
  text: Empezando con Profiler
private: true
title: Activación del Full-Host Profiler
---

{{< callout url="https://www.datadoghq.com/product-preview/full-host-profiler/" btn_hidden="false" header="Join the Preview!" >}}
Full-Host está en la vista previa
{{< /callout >}}

El Full-Host Profiler es una solución de perfilado basada en eBPF y construida sobre OpenTelemetry que envía datos de perfilado a Datadog utilizando el Datadog Agent. Admite la simbolización para lenguajes compilados y está optimizado para entornos en contenedores como Docker y Kubernetes.

### Casos prácticos

El Full-Host Profiler es especialmente valioso para:

- Creación de perfiles de componentes de software abiertos de source (fuente) que no están instrumentados con las bibliotecas de rastreo de Datadog.
- Análisis del rendimiento en procesos y tiempos de ejecución de varios lenguajes.

## Requisitos

Sistemas operativos compatibles
: Linux (5.4+ para amd64, 5.5+ para arm64)

Arquitectura compatible
: procesadores `amd64` o `arm64`

Serverless
: `full-host` no es compatible con plataformas serverless, como AWS Lambda.

Información de depuración
: Los símbolos deben estar disponibles localmente o pueden cargarse en CI con `datadog-ci`

## Instalación

<div class="alert alert-info">Configura siempre <b>DD_SERVICE</b> para cada servicio que desees perfilar e identificar por separado. Esto garantiza una atribución precisa y unos datos de perfilado más procesables. Para obtener más información, consulta <a href="#service-naming">Nomenclatura de servicios</a>.</div>

Full-Host Profiler se distribuye como un ejecutable independiente.

### Entornos de contenedores
Para hosts que ejecutan cargas de trabajo en contenedores, Datadog recomienda ejecutar el perfilador dentro de un contenedor:

- **Kubernetes**: Sigue las instrucciones de [ejecución en Kubernetes][7].
- **Docker**: Sigue las instrucciones de [ejecución en Docker][8].
- **Imagen de contenedor**: Disponible en el [registro de contenedores][5].


### Entornos sin contenedores

En el caso de hosts que no dispongan de tiempos de ejecución de contenedores, sigue las instrucciones para [ejecutar directamente en el host][9].

## Nombres de servicios
Cuando se utiliza la creación de perfiles de host completo, Datadog crea perfiles de todos los procesos del host. El nombre de servicio de cada proceso se obtiene de su variable de entorno `DD_SERVICE`.

Si se configura `DD_SERVICE`, el perfilador utiliza el valor de `DD_SERVICE` como el nombre del servicio. Este es el método recomendado y más fiable.

Si no se configura `DD_SERVICE`, Datadog infiere un nombre de servicio a partir del nombre binario. Para lenguajes interpretados, este es el nombre del intérprete. Por ejemplo, para un servicio escrito en Java, el perfilador de host completo establece el nombre del servicio en `service:java`.
{{< img src="profiler/inferred_service_example.png" alt="Example of an inferred services within Profiling" style="width:50%;">}}

Si se ejecutan varios servicios en el mismo intérprete (por ejemplo, dos aplicaciones Java distintas en el mismo host) y ninguno de ellos configura `DD_SERVICE`, Datadog los agrupa en el mismo nombre de servicio. Datadog no puede distinguirlos a menos que proporciones un nombre de servicio único.

## Símbolos de depuración

Para los lenguajes compilados (como Rust, C, C++, Go, etc.), el perfilador carga los símbolos locales en Datadog para la simbolización, lo que garantiza que los nombres de las funciones estén disponibles en los perfiles. Para Rust, C y C++, los símbolos deben estar disponibles localmente (binarios sin comprimir).

Para los binarios desprovistos de símbolos de depuración, es posible cargar símbolos manualmente o en el CI:

1. Instala la herramienta de línea de comandos [datadog-ci][12].
2. Proporciona una [clave de API de Datadog][10] a través de la variable de entorno `DD_API_KEY`.
3. Configura la variable de entorno `DD_SITE` en tu [sitio de Datadog][11].
4. Instala el paquete `binutils`, que proporciona la herramienta CLI `objcopy`.
5. Ejecuta:
   ```
   DD_BETA_COMMANDS_ENABLED=1 datadog-ci elf-symbols upload ~/your/build/symbols/
   ```


## ¿Qué toca hacer ahora?

Después de instalar Full-Host Profiler, consulta los [Primeros steps (UI) / pasos (generic) con Profiler][6] para aprender a utilizar Continuous Profiler para identificar y solucionar problemas de rendimiento.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://github.com/DataDog/dd-otel-host-profiler/releases/
[3]: https://app.datadoghq.com/profiling
[4]: /es/getting_started/tagging/unified_service_tagging
[5]: https://github.com/DataDog/dd-otel-host-profiler/pkgs/container/dd-otel-host-profiler/.
[6]: /es/getting_started/profiler/
[7]: https://github.com/DataDog/dd-otel-host-profiler/blob/main/doc/running-in-kubernetes.md
[8]: https://github.com/DataDog/dd-otel-host-profiler/blob/main/doc/running-in-docker.md
[9]: https://github.com/DataDog/dd-otel-host-profiler/blob/main/doc/running-on-host.md
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: /es/getting_started/site/
[12]: https://github.com/DataDog/datadog-ci?tab=readme-ov-file#how-to-install-the-cli