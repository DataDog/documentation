---
further_reading:
- link: /cloudprem/architecture/
  tag: Documentación
  text: Arquitectura de CloudPrem
title: Solucionar problemas
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem está en vista previa" >}}
  Únete a la vista previa de CloudPrem para acceder a las nuevas funciones de gestión de logs autoalojadas.
{{< /callout >}}

## Información general

Esta página proporciona orientación para la resolución de problemas comunes que puedes encontrar al desplegar o utilizar Datadog CloudPrem. Incluye mensajes de error típicos, pasos de diagnóstico y consejos para resolver problemas relacionados con los permisos de acceso, la configuración del almacenamiento y el estado de los componentes. Utiliza esta guía para diagnosticar problemas rápidamente o para obtener contexto antes de ponerse en contacto con el [soporte de Datadog][1].


## Permisos de acceso

Los errores más comunes provienen de los permisos de acceso al almacenamiento de objetos o al metastore. La forma más sencilla de solucionar estos problemas es utilizar `kubectl` y verificar los logs de los componentes de CloudPrem: pods de indexadores, pods de metastore y pods de buscadores.

## Errores de almacenamiento

Si estableces unas credenciales de AWS incorrectas, verás este mensaje de error con `Unauthorized` en los logs de tus indexadores:

```
Command failed: Another error occurred. `Metastore error`. Cause: `StorageError(kind=Unauthorized, source=failed to fetch object: s3://my-bucket/datadog-index/some-id.split)`
```

Si pones la región incorrecta, verás este error:

```
Command failed: Another error occurred. `Metastore error`. Cause: `StorageError(kind=Internal, source=failed to fetch object: s3://my-bucket/datadog-index/some-id.split)`
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help/