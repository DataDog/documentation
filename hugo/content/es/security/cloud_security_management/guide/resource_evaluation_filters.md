---
further_reading:
- link: /security/cloud_security_management/guide
  tag: Documentación
  text: Guías de Cloud Security Management
- link: /security/cloud_security_management/setup
  tag: Documentación
  text: Configuración de Cloud Security Management
title: Uso de filtros para excluir recursos de la evaluación
---

Puedes utilizar etiquetas (tags) de recurso para crear filtros que incluyan o excluyan recursos de la evaluación de Cloud Security Management (CSM). Los filtros deben especificarse como una lista separada por comas de pares `key:value`.

**Notas**:

- Los filtros de evaluación de recursos sólo pueden utilizarse con hosts analizados por las integraciones en la nube.
- Las etiquetas deben aplicarse directamente al recurso. Los filtros no tienen en cuenta las etiquetas de usuario añadidas en Datadog. La única excepción son las etiquetas añadidas en cuadros de integración para AWS y Google Cloud Platform.

| Formato                       | Valor        |
|------------------------------|--------------|
| Lista de permisos                    | `key:value`  |
| Lista de bloqueo                    | `!key:value` |
| Comodín de un solo carácter    | `?`          |
| Comodín de varios caracteres | `*`          |

La lista de permisos permite especificar las etiquetas que deben aplicarse a un recurso para que CSM lo evalúe. Las etiquetas de la lista de permisos se evalúan como declaraciones OR (O). En otras palabras, al menos una de las etiquetas de la lista de permisos debe estar presente para que se evalúe un recurso. Por el contrario, las etiquetas de la lista de bloqueo se evalúan como declaraciones AND (Y) y tienen prioridad sobre las etiquetas de las listas de permisos.

**Ejemplos**:

- `!env:staging` excluye los recursos que tienen la etiqueta `env:staging`.
- `datadog:monitored, env:prod*` recopila métricas para los recursos que tienen al menos una de estas etiquetas.
- `!env:staging, !testing` excluye los recursos que tienen tanto etiquetas `env:staging` como etiquetas `testing`.
- `datadog:monitored !region:us-east1` recopila métricas para los recursos que tienen la etiqueta`datadog:monitored`, siempre que el recurso no tenga aplicada la etiqueta `region:us-east1`.

## Excluir recursos de la evaluación

{{< tabs >}}
{{% tab "AWS" %}}

1. En la página [**Configuración de Cloud Security Management**][1], haz clic en **Cloud accounts** (Cuentas en la nube).
2. Amplía la sección **AWS**.
3. En **Resource Evaluation Filters (Optional)** (Filtros de evaluación de recursos (opcional)), haz clic en el icono **Más** (+) de la cuenta a la que quieres añadir el filtro.
4. Introduce una lista separada por comas de pares `key:value` para las etiquetas que quieres permitir o bloquear.
5. Haz clic en **Save** (Guardar).

[1]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}
{{% tab "Azure" %}}

1. En la página [**Configuración de Cloud Security Management**][1], haz clic en **Cloud accounts** (Cuentas en la nube).
2. Amplía la sección **Azure**.
3. Amplía una suscripción.
3. En **Resource Evaluation Filters (Optional)** (Filtros de evaluación de recursos (opcional)), haz clic en el icono **Más** (+)..
4. Introduce una lista separada por comas de pares `key:value` para las etiquetas que quieres permitir o bloquear.
5. Haz clic en **Save** (Guardar).

[1]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}
{{% tab "Google Cloud" %}}

1. En la página [**Configuración de Cloud Security Management**][1], haz clic en **Cloud accounts** (Cuentas en la nube).
2. Amplía la sección **GCP**.
3. Amplía un proyecto.
3. En **Resource Evaluation Filters (Optional)** (Filtros de evaluación de recursos (opcional)), haz clic en el icono **Más** (+)..
4. Introduce una lista separada por comas de pares `key:value` para las etiquetas que quieres permitir o bloquear.
5. Haz clic en **Save** (Guardar).

[1]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}
{{< /tabs >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}