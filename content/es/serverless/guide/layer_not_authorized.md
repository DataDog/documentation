---
title: Solucionar problemas de errores de capas serverless no autorizadas
---
Esta guía es una ayuda para solucionar el error de despliegue `not authorized to perform: lambda:GetLayerVersion on resource`. Este error suele producirse en las capas de la librería Lambda de Datadog o en la capa de la Datadog Extension.

## Regionalidad
Las funciones de Lambda solo pueden incluir las [capas de Lambda][1] que se encuentran en la misma región que la función. Por lo general, este error se produce cuando los usuarios copian la configuración de instrumentación desde otras aplicaciones desplegadas en regiones diferentes.

Verifica que la región de la capa de Lambda y la versión de la función de Lambda coincidan. Luego, comprueba que el número de versión sea correcto.

Para comprobar si existe una versión de la capa de Lambda, ejecuta `aws lambda get-layer-version` con credenciales de AWS válidas.

Por ejemplo, para verificar la capa de la Datadog Extension y la capa de la librería Node.js de Datadog, ejecuta:
```
aws lambda get-layer-version \
  --layer-name arn:aws:lambda:us-east-1:464622532012:layer:Datadog-{{< latest-lambda-layer-version layer="node-example-version" >}} \
  --version-number {{< latest-lambda-layer-version layer="node" >}}

aws lambda get-layer-version \
  --layer-name arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Extension \
  --version-number {{< latest-lambda-layer-version layer="extension" >}}
```

## Permisos
En ocasiones, los usuarios deniegan de forma accidental y explícita mediante `DENY` el permiso para que sus funciones ejecuten `lambda:GetLayerVersion`. Algunas configuraciones de políticas [basadas en recursos][2] pueden causar una denegación `DENY` explícita. Además, los [límites de permisos][3] de IAM también pueden causar una denegación `DENY` explícita para `lambda:GetLayerVersion`.

Para comprobar esto, utiliza un usuario de IAM vinculado a la misma política de IAM que utiliza tu función de Lambda y haz un test con el comando `get-layer-version` como se indica más arriba. El comando debería ejecutarse sin errores.

## Contactar con el equipo de asistencia de Datadog

Si necesitas que el equipo de asistencia de Datadog te ayude con la investigación del problema, envía un ticket con la siguiente información:

1. Las capas de Lambda configuradas en la función (nombre y versión, o ARN).
2. Los archivos de configuración del proyecto, con los **secretos cifrados redactados**: `serverless.yaml`, `package.json`, `package-lock.json`, `yarn.lock`, `tsconfig.json` y `webpack.config.json`.
3. Las políticas de IAM del proyecto y la información de los roles.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-package.html#gettingstarted-package-layers
[2]: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html
[3]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html
