---
code_lang: nodejs
code_lang_weight: 10
further_reading:
- link: /tracing/troubleshooting
  tag: Documentación
  text: Solucionar problemas de APM
title: Solucionar problemas de Node.js Profiler
type: multi-code-lang
---

## Perfiles faltantes en la page (página) de búsqueda de perfiles

Si has configurado el generador de perfiles y no ves perfiles en la page (página) de búsqueda de perfiles, activa el [modo de depuración][1] y [abre un ticket de asistencia][2]. En el ticket de asistencia, incluye los archivos de depuración junto con la siguiente información:

- Tipo y versión del sistema operativo (por ejemplo, Linux Ubuntu 20.04)
- Tipo de tiempo de ejecución, versión y proveedor (por ejemplo, Node.js 18.19.01)

## Profiler no encuentra el componente nativo

Es posible que el generador de perfiles no encuentre su componente nativo. En esta situación, los logs de tu aplicación o la consola muestran un mensaje de error similar a:

```
Error: No native build was found for runtime=node abi=109 platform=linuxglibc arch=x64
```

Si estás utilizando un bundler como esbuild o webpack, que es utilizado por marcos como Next.js, consulta [Bundling con el rastreador de Node.js][3]. El rastreador y el generador de perfiles de Datadog tienen requisitos especiales cuando se utilizan con bundlers.

Las versiones de Node disponibles a través de los gestores de paquete pueden a veces informar incorrectamente de su versión de ABI (Interfaz binaria de aplicación). Por ejemplo, Ubuntu Linux 24.04.01 LTS incluye un paquete de Node 18 que informa incorrectamente de su versión de ABI como 109, en lugar de la versión correcta, 108, para Node 18.

El generador de perfiles incluye binarios precreados para todas las combinaciones admitidas de plataformas, arquitecturas de CPU y versiones de ABI de Node en los archivos `node_modules/@Datadog/pprof/prebuilds/${platform}-${arch}/node-${abi}.node`. Si tu versión de Node informa una versión de ABI incompatible, no habrá un binario precreado disponible, lo que hace que el generador de perfiles no se inicie.

Para resolver este problema, descarga e instala Node desde el [sitio web de Node.js][4] en lugar de utilizar el gestor de paquete de tu sistema operativo o bien
actualiza tu sistema operativo a una versión más reciente que pueda incluir una versión actualizada de Node.js sin este problema.

## Profiler no puede cargar el componente nativo

Es posible que el generador de perfiles encuentre el componente nativo, pero no lo cargue. Si esto ocurre, verás un mensaje de error como el siguiente:
```
Error: Error relocating /app/node_modules/@datadog/pprof/prebuilds/linuxmusl-x64/node-108.node: _ZSt28__throw_bad_array_new_lengthv: symbol not found
```
y más abajo el sack trace:
```
code: 'ERR_DLOPEN_FAILED'
```

Este problema suele producirse en sistemas Linux que utilizan una versión incompatible de la biblioteca estándar musl C, como Alpine Linux. Para resolverlo:

1. Asegúrate de que esté utilizando la última versión de la biblioteca de dd-trace. 
2. Si el problema persiste, intenta actualizar musl o tu distribución de Linux. 

Si crees que tu versión de musl debería ser compatible, ponte en contacto con [asistencia técnica de Datadog][5].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/troubleshooting/tracer_debug_logs/?code-lang=nodejs#enable-debug-mode
[2]: /es/help/
[3]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/#bundling
[4]: https://nodejs.org/
[5]: /es/help