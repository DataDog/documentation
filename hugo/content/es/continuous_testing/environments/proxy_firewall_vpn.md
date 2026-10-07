---
description: Aprende a configurar Continuous Testing en un entorno privado.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/
  tag: Blog
  text: Incorporar los tests de Datadog Continuous Testing a tu pipeline CI/CD
- link: https://www.datadoghq.com/blog/internal-application-testing-with-datadog/
  tag: Blog
  text: Prueba las aplicaciones internas con el túnel de tests y las localizaciones
    privadas de Datodag
- link: /continuous_testing/cicd_integrations
  tag: Documentación
  text: Más información sobre Continuous Testing y CI/CD
title: Tests con proxies, firewalls o VPN
---

## Información general

La mayor parte del ciclo de desarrollo ocurre dentro de redes privadas, que son usualmente inaccesibles a los tests de Synthetic. Con la ayuda de [`datadog-ci`][2], puedes establecer un túnel de Continuous Testing que permite a los workers de Synthetics alcanzar los entornos en los que tu aplicación se despliega en el ciclo de desarrollo, tales como tu computadora portátil de desarrollo, un trabajo de CI, o un entorno de preproducción privado.

Datadog recomienda utilizar el túnel de tests si necesitas lanzar tests de Continuous Testing contra versiones locales de tu aplicación sin desplegar un sistema de sondeo dedicado y de larga duración como una [localización privada][1]. También puedes utilizar el túnel de tests para lanzar tests en entornos en la nube de corta duración.

## ¿Qué es el túnel de tests?

El túnel de tests es una funcionalidad que viene con el paquete NPM [@datadog/datadog-ci][2], que es uno de los métodos que Datadog proporciona para incluir tus tests de Synthetic como parte de tus pipelines de CI/CD.

El túnel de tests crea conexiones seguras de corta duración entre tus entornos internos y la infraestructura de Datadog, lo que te permite activar rápidamente tests HTTP de Synthetic y tests de navegador en tus aplicaciones privadas. Esto permite a Datadog acceder a tus aplicaciones internas y probarlas.

{{< img src="continuous_testing/testing_tunnel.png" alt="Túnel de Continuous Testing que permite al worker de Synthetics llegar a tus aplicaciones privadas" width="100%" >}}

En primer lugar, `datadog-ci` obtiene una URL prefirmada de Datadog para su autenticación. A continuación, abre una conexión WebSocket segura (WSS) con las localizaciones administradas de Datadog utilizando la URL prefirmada. Mediante el uso de conexiones SSH a través de la conexión WebSocket, `datadog-ci` activa los tests y los ejecuta a través de localizaciones administradas de Datadog.

Dado que la resolución DNS se realiza a través del túnel de tests, puedes probar aplicaciones con dominios internos o incluso en el `localhost` de la máquina que ejecuta `datadog-ci`.

Cuando se utiliza el túnel de tests, las localizaciones de tus tests quedan anuladas por una localización que depende de la región de tu cuenta de Datadog.

## Cómo utilizar el túnel de tests

Como se mencionó anteriormente, el túnel de tests viene con el paquete NPM [`@datadog/datadog-ci`][2] y está disponible en las versiones `>=v0.11.0` del paquete. Para empezar, consulta [Continuous Testing y CI/CD][3].

Una vez que hayas configurado tu cliente en tu máquina local o en tu servidor CI, puedes lanzar tus tests HTTP y tests de navegador con el túnel de tests añadiendo `--tunnel` al comando utilizado para lanzar los tests.

Por ejemplo, si utilizas un archivo de configuración global, puedes utilizar lo siguiente:

```sh
datadog-ci synthetics run-tests --config <GLOBAL_CONFIG_FILE>.json --tunnel
```

### Requisitos del firewall

Permite **Outbound connections** (Conexiones de salida) para los siguientes endpoints de Datadog:

{{< site-region region="us" >}}

| Puerto | Endpoint                                                                                             | Descripción                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443 | `tunnel-us1.synthetics.datadoghq.com`   | Necesario para abrir la conexión WSS desde el cliente `datadog-ci` al servicio de túnel. |
| 443 | `intake.synthetics.datadoghq.com` | Necesario para obtener la URL preasignada y activar los tests de Synthetic. |
| 443 | `api.datadoghq.com` | Se requiere buscar los tests de Synthetic, obtenerlos y sondear sus resultados. |

{{< /site-region >}}

{{< site-region region="eu" >}}

| Puerto | Endpoint                                                                                             | Descripción                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443 | `tunnel-eu1.synthetics.datadoghq.com`   | Necesario para abrir la conexión WSS desde el cliente `datadog-ci` al servicio de túnel. |
| 443 | `api.datadoghq.eu` | Necesario para obtener la URL preasignada, buscar tests de Synthetic , obtenerlos, activarlos y sondear sus resultados. |

**Nota**: Aunque el dominio de nivel superior del servicio de túnel es `.com` (y no `.eu`), el endpoint está situado en la UE (Frankfurt AWS).

{{< /site-region >}}

{{< site-region region="us3" >}}

| Puerto | Endpoint                                                                                             | Descripción                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443 | `tunnel-us3.synthetics.datadoghq.com`   | Necesario para abrir la conexión WSS desde el cliente `datadog-ci` al servicio de túnel. |
| 443 | `api.us3.datadoghq.com` | Necesario para obtener la URL preasignada, buscar tests de Synthetic , obtenerlos, activarlos y sondear sus resultados. |

{{< /site-region >}}

{{< site-region region="us5" >}}

| Puerto | Endpoint                                                                                             | Descripción                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443 | `tunnel-us5.synthetics.datadoghq.com`   | Necesario para abrir la conexión WSS desde el cliente `datadog-ci` al servicio de túnel. |
| 443 | `api.us5.datadoghq.com` | Necesario para obtener la URL preasignada, buscar tests de Synthetic , obtenerlos, activarlos y sondear sus resultados. |

{{< /site-region >}}

{{< site-region region="ap1" >}}

 Puerto | Endpoint |                                                                                                                   Descripción |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443 | `tunnel-ap1.synthetics.datadoghq.com` | Necesario para abrir la conexión WSS desde el cliente `datadog-ci` al servicio de túnel. |
| 443 | `api.ap1.datadoghq.com` | Necesario para obtener la URL preasignada, buscar los tests de Synthetic, obtenerlos, activarlos y sondear sus resultados. |

{{< /site-region >}}

## Utilización del túnel de tests con múltiples entornos

El túnel de tests puede configurarse para trabajar con varios entornos, incluido `localhost`, utilizando los campos `startUrl`, `startUrlSubstitutionRegex` y `resourceUrlSubstitutionRegexes`. Estos campos permiten sustituir partes de la URL de inicio y de las URL de recursos en función de las expresiones regulares proporcionadas, lo que permite redirigir las solicitudes a diferentes entornos durante la ejecución del test.

Por ejemplo, puedes reutilizar el test programado en producción para ejecutarlo en tu entorno de desarrollo con `startUrl` y `startUrlSubstitutionRegex`. También puedes redirigir las solicitudes de activos del frontend a un entorno de desarrollo local mientras mantienes la página principal y las llamadas a la API que ofrece el entorno de producción. Esto es útil para probar cambios de forma aislada sin necesidad de desplegar toda la aplicación.

Para utilizar estas opciones, especifica los valores adecuados en los campos `startUrl`, `startUrlSubstitutionRegex` y `resourceUrlSubstitutionRegexes`. Los campos `startUrl` y `startUrlSubstitutionRegex` permiten modificar la URL inicial, mientras que el campo `resourceUrlSubstitutionRegexes` permite modificar las URL de todas las solicitudes de recursos posteriores.

Para `resourceUrlSubstitutionRegexes`, especifica una matriz de cadenas, cada una de las cuales contendrá dos partes separadas por un carácter de pipe `|`: `<regex>|<rewriting rule>`. La primera parte es la expresión regular que se aplicará a la URL del recurso, y la segunda es la expresión que reescribirá la URL.

Por ejemplo:

```
https://prod.my-app.com/assets/(.*)|http://localhost:3000/assets/$1
```

Esta expresión regular captura la ruta de la URL del recurso y la reescribe para que apunte al entorno de desarrollo local. Dada la URL `https://prod.my-app.com/assets/js/chunk-123.js`, la reescribiría en `http://localhost:3000/assets/js/chunk-123.js`.

Esta función te permite probar partes específicas de tu aplicación en diferentes entornos, incluyendo `localhost`, asegurándote de que los cambios se validan correctamente antes de ser desplegados en producción.

Puedes obtener más información sobre estas opciones en [Probar múltiples entornos][4].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/private_locations
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: /es/continuous_testing/cicd_integrations#use-the-cli
[4]: /es/continuous_testing/environments/multiple_env