---
description: Aprende a utilizar las pruebas continuas para reutilizar las mismas situaciones
  de test Sintético contra múltiples entornos.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/
  tag: Blog
  text: Incorpora los tests de las pruebas continuas de Datadog a tu pipeline de CI/CD
- link: https://www.datadoghq.com/blog/internal-application-testing-with-datadog/
  tag: Blog
  text: Prueba aplicaciones internas con el túnel de pruebas y las ubicaciones privadas
    de Datadog
- link: /continuous_testing/environments/proxy_firewall_vpn
  tag: Documentación
  text: Aprende a realizar pruebas utilizando proxies, cortafuegos o VPN.
title: Pruebas de múltiples entornos
---

## Información general

Las pruebas continuas te permiten aplicar la misma situación de los tests programados contra el entorno de producción a los entornos de desarrollo y de almacenamiento provisional. Las pruebas continuas utilizan tests Sintético a lo largo del ciclo de desarrollo para garantizar que las regresiones se detecten lo antes posible.

Al activar un test de CI, puedes sobrescribir la URL de inicio de un [navegador][1] o [test de API][2] para redirigir el Synthetiic Worker al entorno apropiado. Esto te permite utilizar el mismo test en tus entornos de producción y de almacenamiento provisional.

Para [tests del navegador][1], también puedes redirigir un subconjunto de las URL de recursos durante la ejecución del test con `resourceUrlSubstitutionRegexes`. Esto te permite probar los recursos del frontend de tu ramificación actual contra el backend de producción. Esto también te permite redirigir un subconjunto de llamadas de la API (que coincidan con un dominio o una ruta) a un entorno de almacenamiento provisional que contenga los cambios a probar, mientras que el resto de las solicitudes tienen el servicio del entorno de producción.

## Utilizar un test de producción en un entorno de almacenamiento provisional

### Sustitución de la URL inicial

Un test de navegador Sintético inicia el escenario de prueba al ir a una URL inicial. Del mismo modo, un test de HTTP de API enví­a una solicitud a una URL específica. Al activar una prueba de CI, puedes sobrescribir esta URL de inicio para que apunte a otro entorno en el que está desplegada tu aplicación.

{{< img src="continuous_testing/starting_url_substitution.png" alt="El túnel de pruebas continuas permite que Synthetics Worker llegue a tus aplicaciones privadas" width="100%" >}}

Al activar un test de CI, el campo `startUrl` te permite sobrescribir la primera URL a la que va un test de navegador o la URL utilizada por una solicitud de test HTTP. Puedes especificar esta opción a través del archivo global de configuración, los archivos de configuración de monitorización Sintético (`*.synthetics.json`) o la marca de línea de comandos `--override startUrl=<STARTURL>`.

```shell
datadog-ci synthetics run-tests \
  --public-id <public-id> \
  --override startUrl="https://staging.my-app.com"
```

Esta opción te permite reutilizar el mismo escenario de test en la página de entorno de producción y en otros entornos de desarrollo (como el almacenamiento provisional) siempre que estén disponibles públicamente. Para saber cómo realizar tests en [entornos privados][4], consulta [Realizar tests mientras se utilizan proxies, cortafuegos o VPN][3].

### Modificación parcial de la URL inicial

Si algunos de tus tests comienzan en la página de inicio o en una URL igualmente simple, la solución anterior funciona bien, pero no cubre todos los casos de uso. Sustituir ciegamente la URL de inicio puede eliminar involuntariamente la ruta o determinados parámetros de consulta de búsqueda de la URL que se espera que pruebe el escenario.

El campo `startUrlSubstitutionRegex` te permite modificar la URL de inicio sin sobrescribirla por completo. Esta opción te permite sustituir partes de la URL de inicio en forma predeterminada basándote en la expresión regular proporcionada.

```shell
datadog-ci synthetics run-tests \
  --public-id <public-id> \
  --override startUrlSubstitutionRegex="<regex>|<rewriting-rule>"
```

Este campo espera una cadena que contenga dos partes, separadas por un carácter de pipe `|`: 

`<regex>|<rewriting-rule>`
- `<regex>`: Expresión regular (regex) a aplicar a la URL de inicio en forma predeterminada
- `<rewriting-rule>`: Expresión para rescribir la URL

#### Ejemplo 1

Considera la siguiente cadena `<regex>|<rewriting-rule>`:

```shell
https://prod.my-app.com/(.*)|https://staging.my-app.com/$1
```

La expresión regular utiliza un grupo de capturas para capturar la ruta de la URL. La regla de rescritura produce una URL de aspecto similar que apunta a `staging.my-app.com` y que añade el grupo capturado mediante `$1`. Dada la URL `https://prod.my-app.com/product-page?productId=id`, la rescribirí­a en `https://staging.my-app.com/product-page?productId=id`.

#### Ejemplo 2

Considera la siguiente cadena `<regex>|<rewriting-rule>`:

```
(https?://)([^/]*)|$1<deployment-prefix>.$2
```

Con esta sustitución, la URL `https://my-app.com/some/path` se rescribe como `https://<deployment-prefix>.my-app.com/some/path`.
Observa que la ruta de la URL no se ve afectada por la rescritura porque no forma parte de la expresión regular de la sustitución.

<div class="alert alert-info">
Además de la sintaxis <code>|</code> del pipe presentada anteriormente, <code>startUrlSubstitutionRegex</code> también admite la sintaxis sed con modificadores: <code>s|&lt;regex&gt;|&lt;rewritting rule&gt;|&lt;modifiers&gt;</code></br></br>.
La sintaxis sed se utiliza a menudo con una barra <code>/</code> separadora, por ejemplo: <code>s/&lt;regex&gt;/&lt;rewritting rule&gt;/&lt;modifier&gt;</code>. Sin embargo, puede utilizar cualquier carácter como delimitador. Cuando se trabaja con una URL que contiene un número abundante de barras, Datadog recomienda utilizar otro carácter en lugar de escapar todas las barras de la URL.
</div>

Con esta herramienta, cualquier test programado utilizado en tu entorno de producción puede reutilizarse para apuntar a un entorno de desarrollo.

## Introducir un cambio en un entorno

### Modificación de las URL de los recursos

Además de modificar la URL inicial, también puedes modificar las URL de todas las solicitudes de recursos posteriores utilizando la opción `resourceUrlSubstitutionRegexes`. Esta opción sustituye partes de las URL de los recursos basándose en las expresiones regulares proporcionadas.

Esto te permite hacer tests de algunas partes de tu aplicación independientemente del entorno principal. La página principal sigue estando servida por el entorno desde la `startUrl`, pero cada solicitud que coincida con la primera expresión regular de `resourceUrlSubstitutionRegexes` se puede redirigir a otro entorno que aloje sólo los cambios de la ramificación que activa el pipeline de CI.

Por ejemplo: si los activos de tu frontend JavaScript están en la ruta `https://prod.my-app.com/resources/chunks/*`, puedes utilizar `resourceUrlSubstitutionRegexes` para redirigir todas las solicitudes de activos JavaScript a `https://staging.my-app.com/resources/chunks`, mientras que la página principal y todas las llamadas a la API siguen estando servidas por `prod.my-app.com`. Del mismo modo, si deseas hacer un test del servicio detrás de los puntos de conexión `https://prod.my-app.com/api/my-service`, puedes redirigir estas llamadas a la API a `https://staging.my-app.com/api/my-service` para realizar un test de este servicio de forma aislada con el frontend de producción.

```shell
datadog-ci synthetics run-tests \
  --public-id <public-id> \
  --override resourceUrlSubstitutionRegexes="<regex1>|<rewriting-rule1>" \
  --override resourceUrlSubstitutionRegexes="<regex2>|<rewriting-rule2>"
```

El campo `resourceUrlSubstitutionRegexes` espera cadenas, cada una de las cuales contiene dos partes, separadas por un carácter de pipe`|`: 

`<regex>|<rewriting-rule>`
- `<regex>`: Expresión regular (regex) a aplicar a la URL del recurso
- `<rewriting-rule>`: Expresión para rescribir la URL

#### Ejemplo 1

Considera la siguiente cadena `<regex>|<rewriting-rule>`:

```
https://prod.my-app.com/assets/(.*)|https://staging.my-app.com/assets/$1
```

La expresión regular, `https://prod.my-app.com/assets/(.*)`, utiliza un grupo de capturas para capturar la ruta de la URL del recurso. 

La regla de rescritura, `https://staging.my-app.com/assets/$1`, produce una URL de aspecto similar que apunta a `staging.my-app.com` y añade el grupo capturado mediante `$1`. 

Como resultado, la URL `https://prod.my-app.com/assets/js/chunk-123.js` se rescribe como `https://staging.my-app.com/assets/js/chunk-123.js`.

#### Ejemplo 2

Considera la siguiente cadena `<regex>|<rewriting-rule>`:

```
`(https?://)([^/]*)|$1<deployment-prefix>.$2`
```

Con esta sustitución, la URL `https://my-app.com/some/path` se rescribe como `https://<deployment-prefix>.my-app.com/some/path`. Observa que la ruta de la URL no se ve afectada por la rescritura porque no forma parte de la expresión regular de la sustitución.

<div class="alert alert-info">
Las <code>resourceUrlSubstitutionRegexes</code> también se aplican a la primera solicitud, de forma similar a la <code>startUrl</code> y  la <code>startUrlSubstitutionRegex</code>.
</div>

<div class="alert alert-info">
Además de la sintaxis <code>|</code> del pipe presentada anteriormente, las<code>resourceUrlSubstitutionRegexes</code> también admiten la sintaxis sed con modificadores: <code>s|&lt;regex&gt;|&lt;rewriting rule&gt;|&lt;modifiers&gt;</code></br></br>. La sintaxis sed se utiliza a menudo con un separador de barra <code>/</code>, por ejemplo: <code>s/&lt;regex&gt;/&lt;rewriting rule&gt;/&lt;modifier&gt </code>. Sin embargo, puede utilizar cualquier carácter como delimitador. Cuando se trabaja con una URL que contiene un número abundante de barras, Datadog recomienda utilizar otro carácter en lugar de escapar todas las barras de la URL.
</div>

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/browser_tests/
[2]: /es/synthetics/api_tests/
[3]: /es/continuous_testing/environments/proxy_firewall_vpn
[4]: /es/synthetics/private_locations