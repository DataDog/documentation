---
further_reading:
- link: /serverless/installation/nodejs
  tag: Documentación
  text: Instrumentación de aplicaciones de Node.js
title: Solucionar problemas de errores de paquetes demasiado grandes en las aplicaciones
  serverless
---

Esta guía es una ayuda para solucionar el error "Code uncompressed size is greater than max allowed size of 272629760". Este error es más común cuando se instrumentan aplicaciones serverless de Node.js mediante el Datadog Serverless Plugin. La estrategia para solucionar este problema también puede aplicarse al mismo error en otros lenguajes o métodos de despliegue.

El error indica que el tamaño del código _sin comprimir_ de tu función supera el límite de 250 MB. Tanto el [paquete de la función][1] (el artefacto `.zip` que contiene el código de la función y sus dependencias) como las [capas de Lambda][2] configuradas en la función se cuentan para este límite. Examina ambos para encontrar la causa raíz.

## Capas

Por lo general, Datadog añade dos capas de Lambda para la instrumentación:

- Una biblioteca específica del lenguaje que instrumenta el código de la función.
- La extensión, que agrega, almacena en buffer y reenvía los datos de observabilidad al backend de Datadog.

Inspecciona el contenido y el tamaño de las capas de Lambda de Datadog mediante el comando de la AWS CLI [`aws lambda get-layer-version`][3]. Por ejemplo, la ejecución de los siguientes comandos proporciona enlaces para descargar las capas de Lambda de _Datadog-{{< latest-lambda-layer-version layer="node-example-version" >}} versión {{< latest-lambda-layer-version layer="node" >}} y de _Datadog-Extension versión {{< latest-lambda-layer-version layer="extension" >}} e inspeccionar el tamaño sin comprimir (unos 30 MB combinados). El tamaño sin comprimir varía según las capas y las versiones. Reemplaza el nombre de la capa y el número de versión en el siguiente ejemplo por los que utilizan tus aplicaciones:

```
aws lambda get-layer-version \
  --layer-name arn:aws:lambda:us-east-1:464622532012:layer:Datadog-{{< latest-lambda-layer-version layer="node-example-version" >}} \
  --version-number {{< latest-lambda-layer-version layer="node" >}}

aws lambda get-layer-version \
  --layer-name arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Extension \
  --version-number {{< latest-lambda-layer-version layer="extension" >}}
```

Además de las capas de Lambda de Datadog, inspecciona también otras capas de Lambda añadidas (o que se van a añadir) a tus funciones. Si utilizas el [Serverless Framework][4], puedes encontrar la plantilla de CloudFormation desde la carpeta oculta `.serverless` después de ejecutar el comando `deploy` o `package`, y la lista de capas de Lambda desde la sección `Layers` (Capas).

## Paquete

El paquete de despliegue de la función puede contener archivos grandes o código que no necesitas. Si utilizas el Serverless Framework, puedes encontrar el paquete de despliegue generado (archivo `.zip`) en la carpeta oculta `.serverless` después de ejecutar el comando `deploy` o `package`.

Si la suma del tamaño del paquete de despliegue y las capas no supera el límite, ponte en contacto con AWS Support para que lo investigue. Si el tamaño total supera el límite, inspecciona el paquete de despliegue y excluye los archivos de gran tamaño que no necesitas en el tiempo de ejecución mediante la opción [package][5] (paquete).

## Dependencias

La capa de Lambda de Datadog empaqueta las bibliotecas de instrumentación y las pone a disposición para su uso en el entorno de ejecución de Lambda, por lo que _no_ es necesario especificar `datadog-lambda-js` y `dd-trace` como dependencias en el archivo `package.json`. Si necesitas las bibliotecas de Datadog para la compilación local o los tests, especifícalas como `devDependencies` para que queden excluidas del paquete de despliegue. Del mismo modo, `serverless-plugin-datadog` solo se necesita para el desarrollo y debe especificarse en `devDependencies`.

Inspecciona también otras dependencias (la carpeta `node_modules`) incluidas en el paquete de despliegue y conserva solo las que necesites en `dependencies` (dependencias).

## Empaquetadores

El uso de un empaquetador como [Webpack][6] o [esbuild][7] puede reducir en gran medida el tamaño del paquete de despliegue al incluir únicamente el código que se utiliza. Consulta [Compatibilidad del rastreo de Lambda y los empaquetadores con Node.js][8] para ver las configuraciones de webpack necesarias.

## Datadog-ci

Dependiendo de tu caso de uso, puede resultarte más fácil utilizar el comando `datadog-ci lambda instrument` para solucionar problemas con los tamaños de los paquetes. El comando `datadog-ci lambda instrument` configura la misma instrumentación que serverless-plugin-datadog. Para obtener más información, consulta el [repositorio datadog-ci][9].

## Obtener ayuda

Si necesitas que el equipo de asistencia de Datadog te ayude con la investigación del problema, envía un ticket con la siguiente información:

1. Las capas de Lambda configuradas en la función (nombre y versión, o ARN).
2. El paquete de despliegue de la función (o una captura de pantalla que muestre el contenido y el tamaño del paquete descomprimido) que se cargará en AWS.
3. Los archivos de configuración del proyecto, con los **secretos cifrados redactados**: `serverless.yaml`, `package.json`, `package-lock.json`, `yarn.lock`, `tsconfig.json` y `webpack.config.json`.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-package.html#gettingstarted-package-zip
[2]: https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-package.html#gettingstarted-package-layers
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/lambda/get-layer-version.html
[4]: https://www.serverless.com/
[5]: https://www.serverless.com/framework/docs/providers/aws/guide/serverless.yml/#package
[6]: https://webpack.js.org
[7]: https://esbuild.github.io/
[8]: /es/serverless/guide/serverless_tracing_and_bundlers/
[9]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-lambda#readme