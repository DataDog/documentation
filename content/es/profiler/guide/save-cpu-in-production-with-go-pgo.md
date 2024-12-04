---
further_reading:
- link: /profiler
  tag: Documentación
  text: Datadog Continuous Profiler
- link: /profiler/compare_profiles/
  tag: Documentación
  text: Comparación de perfiles
title: Go - Ahorra hasta un 14% de CPU en producción mediante la optimización guiada
  por perfiles
---

## Información general

A partir de [Go v1.21][1], el compilador Go admite la optimización guiada por perfiles (PGO).

La PGO permite optimizaciones adicionales en el código identificado como caliente por los perfiles de CPU de las cargas de trabajo de producción. Es compatible con el [Datadog Go Continuous Profiler][2] y puede utilizarse para compilaciones de producción.

## Cómo funciona la PGO

Los siguientes son algunos puntos clave sobre el funcionamiento de la PGO:

- Cuando se crea un programa de Go con la PGO habilitada, el compilador busca un perfil de CPU pprof llamado `default.pgo` y lo utiliza para producir un binario más optimizado.
- Luego de la optimización, los programas típicos deberían experimentar una disminución del 2-14% del tiempo de CPU. La PGO sigue en desarrollo activo y las futuras versiones de Go aspiran a lograr un ahorro de CPU aún mayor. Datadog [apoya activamente esta iniciativa][3].
- La PGO produce los mejores resultados cuando se utilizan perfiles representativos. Sin embargo, no se espera que el uso de perfiles no representativos o antiguos (de versiones anteriores del software) produzca binarios más lentos en comparación con la no utilización de la PGO.
- No se espera que el uso de un perfil de una aplicación optimizada por la PGO genere ciclos de optimización/desoptimización. Esto se conoce como estabilidad iterativa.

Para obtener más información, consulta la [documentación de PGO Go][4].

## Habilitación de la PGO

La PGO es una opción estándar del compilador Go que se puede utilizar descargando manualmente perfiles de Datadog. Datadog ha creado una herramienta, `datadog-pgo`, para ayudarte a habilitar la PGO en todos los servicios, utilizando los perfiles más recientes y representativos.

Para habilitar la PGO utilizando la herramienta `datadog-pgo`:

1. Crea una clave de API exclusiva y una clave de aplicación delimitada al menos a`continuous_profiler_pgo_read`, tal y como se describe en [Claves de API y de aplicación][5].
2. Configura `DD_API_KEY`, `DD_APP_KEY` y `DD_SITE` con el mecanismo secreto de entorno de tu proveedor de CI.
3. Ejecuta `datadog-pgo` antes del paso de compilación.
   Por ejemplo, para un servicio `foo` que se ejecuta en `prod` y tiene su paquete principal en `./cmd/foo`, debes añadir este paso:

   ```
   go run github.com/DataDog/datadog-pgo@latest "service:foo env:prod" ./cmd/foo/default.pgo
   ```

La cadena de herramientas Go recoge automáticamente cualquier archivo `default.pgo` del paquete principal, por lo que no es necesario modificar el paso `go build`.

Para obtener más detalles, consulta el [repositorio GitHub Datadog-pgo][6].

## Para comprobar si la PGO está habilitada

Para verificar dónde está habilitada la PGO, busca [perfiles de Go sin etiquetas (tags) PGO configuradas como verdaderas][7].

La etiqueta `pgo` se implementó en dd-trace-go v1.61.0, por lo que cualquier perfil anterior a esta versión no tendrá `pgo:false`.


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://tip.golang.org/doc/go1.21
[2]: /es/profiler/enabling/go
[3]: https://github.com/golang/go/issues/65532
[4]: https://go.dev/doc/pgo
[5]: /es/account_management/api-app-keys
[6]: https://github.com/DataDog/datadog-pgo?tab=readme-ov-file#getting-started
[7]: https://app.datadoghq.com/profiling/explorer?query=runtime%3Ago%20-pgo%3Atrue%20&viz=stream