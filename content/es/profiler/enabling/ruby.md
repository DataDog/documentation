---
aliases:
- /es/tracing/profiler/enabling/ruby/
code_lang: ruby
code_lang_weight: 40
further_reading:
- link: getting_started/profiler
  tag: Documentación
  text: Empezando con el generador de perfiles
- link: profiler/profile_visualizations
  tag: Documentación
  text: Más información sobre las visualizaciones de perfiles disponibles
- link: profiler/profiler_troubleshooting/ruby
  tag: Documentación
  text: Solucionar los problemas que surjan al utilizar el generador de perfiles
- link: https://www.datadoghq.com/blog/ruby-profiling-datadog-continuous-profiler/
  tag: Blog
  text: Analiza el rendimiento del código Ruby con Datadog Continuous Profiler
title: Activación de Ruby Profiler
type: multi-code-lang
---

El generador de perfiles se incluye en las bibliotecas de rastreo de Datadog. Si ya estás utilizando [APM para recopilar trazas (traces)][1] para tu aplicación, puedes omitir la instalación de librería e ir directamente a habilitar el generador de perfiles.

## Requisitos

Para obtener un resumen de las versiones mínimas y recomendadas del tiempo de ejecución y del rastreador en todos los lenguajes, consulta [Versiones de lenguaje y rastreadores compatibles][14].

Datadog Profiler requiere Ruby 2.5+. JRuby y TruffleRuby no son compatibles.

Se admiten los siguientes sistemas operativos y arquitecturas:
- Linux (GNU libc) x86-64, aarch64
- Alpine Linux (musl libc) x86-64, aarch64

También necesitas tener instalada la utilidad de sistema [`pkg-config`](https://www.freedesktop.org/wiki/Software/pkg-config/) o [`pkgconf`](https://github.com/pkgconf/pkgconf).
Esta utilidad está disponible en los repositorios de software de la mayoría de las distribuciones de Linux. Por ejemplo:

- El paquete `pkg-config` está disponible para [Homebrew](https://formulae.brew.sh/formula/pkg-config), y [Debian](https://packages.debian.org/search?keywords=pkg-config)- y Linux basado en [Ubuntu](https://packages.ubuntu.com/search?keywords=pkg-config)
- El paquete `pkgconf` está disponible para Linux basado en [Arch](https://archlinux.org/packages/?q=pkgconf) y Linux basado en [Alpine](https://pkgs.alpinelinux.org/packages?name=pkgconf).
- El paquete `pkgconf-pkg-config` está disponible para Linux basados en [Fedora](https://packages.fedoraproject.org/pkgs/pkgconf/pkgconf-pkg-config/)- y [Red-Hat](https://rpmfind.net/linux/rpm2html/search.php?query=pkgconf-pkg-config)-.

Continuous Profiler no es compatible con las plataformas serverless, como AWS Lambda.

[La instrumentación de un solo paso](https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-APM/) no es compatible con hosts de Linux, máquinas virtuales, o Docker.
La instrumentación de un solo paso es compatible con Kubernetes (usando el Datadog Helm chart), pero necesitas configurar manualmente la variable de entorno `DD_PROFILING_ENABLED=true` para habilitar la generación de perfiles.

## Instalación

Para empezar a crear perfiles de aplicaciones:

1. Asegúrate de que Datadog Agent v6+ está instalado y en funcionamiento. Datadog recomienda utilizar [Datadog Agent v7+][2].

2. Añada el gem `datadog` a tu archivo `Gemfile` o `gems.rb`:

    ```ruby
    gem 'datadog', '~> 2.0'
    ```
3. Instala los gems con `bundle install`.

4. Activa el generador de perfiles:

   {{< tabs >}}
{{% tab "Variables de entorno" %}}

```shell
export DD_PROFILING_ENABLED=true
export DD_ENV=prod
export DD_SERVICE=my-web-app
export DD_VERSION=1.0.3
```

{{% /tab %}}
{{% tab "En código" %}}

```ruby
Datadog.configure do |c|
  c.profiling.enabled = true
  c.env = 'prod'
  c.service = 'my-web-app'
  c.version = '1.0.3'
end
```

**Nota**: Para aplicaciones Rails, crea un archivo `config/initializers/datadog.rb` con la configuración de código anterior.

{{% /tab %}}
{{< /tabs >}}

5. Añade el comando `ddprofrb exec` al comando de inicio de tu aplicación Ruby:

    ```shell
    bundle exec ddprofrb exec ruby myapp.rb
    ```

    Ejemplo de Rails:

    ```shell
    bundle exec ddprofrb exec bin/rails s
    ```

    Si utilizas una versión de `ddtrace` anterior a la 1.21.0, sustituye `ddprofrb exec` por `ddtracerb exec`.

    **Nota**

    Si iniciar la aplicación con `ddprofrb exec` no es una opción (por ejemplo, cuando se utiliza el servidor web Phusion Passenger), puedes iniciar alternativamente el generador de perfiles añadiendo lo siguiente al punto de entrada de tu aplicación (como `config.ru`, para una aplicación web):

    ```ruby
    require 'datadog/profiling/preload'
    ```

6. Opcional: configura [la integración de código fuente][4] para conectar tus datos de perfiles con tus repositorios Git.

7. Uno o dos minutos después de iniciar tu aplicación de Ruby, tus perfiles aparecerán en la página [Datadog APM > Generador de perfiles][5].

## ¿No sabes qué hacer a continuación?

La guía [Empezando con el generador de perfiles][6] toma un ejemplo de servicio con un problema de rendimiento y te muestra cómo utilizar Continuous Profiler para comprender y solucionar el problema.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/
[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[3]: https://app.datadoghq.com/account/settings/agent/6?platform=overview
[4]: /es/integrations/guide/source-code-integration/?tab=ruby
[5]: https://app.datadoghq.com/profiling
[6]: /es/getting_started/profiler/
[12]: /es/profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[13]: /es/profiler/connect_traces_and_profiles/#break-down-code-performance-by-api-endpoints
[14]: /es/profiler/enabling/supported_versions/
