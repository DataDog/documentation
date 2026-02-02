---
disable_toc: false
further_reading:
- link: /internal_developer_portal/software_catalog/set_up/create_entities
  tag: Documentación
  text: Crear entidades en el Catálogo de software
- link: /internal_developer_portal/software_catalog/entity_model/native_entity_types
  tag: Documentación
  text: Conoce los tipos de entidades nativas
title: Entidades personalizadas
---

## Información general

A partir de la [definición del esquema v3.0][5]+, puedes definir tipos personalizados de entidades más allá de los [tipos nativos][6] (como servicio, almacén de datos o cola). 

Las entidades personalizadas te permiten representar cualquier componente o recurso que sea importante para tu organización, pero que no encaje en las categorías estándar. Por ejemplo, puedes crear tipos personalizados de entidades para bibliotecas, pipelines, modelos de ML o componentes de infraestructura.

Consulta [definiciones completas del esquema][7] en GitHub.

## Crear un tipo personalizado de entidad

Puedes crear tipos personalizados de entidades en Datadog o a través de la API de Software Catalog. Después de crear el tipo, puedes añadir entidades de ese tipo en Datadog o mediante programación a través de las [API de Software Catalog][2], la [integración de GitHub][4] o el [módulo de Terraform][3]. 

### En Datadog

1. Ve a **APM** > **Software Catalog** y haz clic en [**Manage**][8] (Gestionar).
1. Haz clic en **Manage Custom Entity Types** (Gestionar tipos personalizados de entidades) para ver los tipos de entidades existentes, nativos y personalizados.

   {{< img src="/tracing/internal_developer_portal/manage-entity-types.png" alt="La ventana emergente Gestionar tipos de entidades, en la que se muestran tipos nativos y personalizados existentes y un botón para crear un tipo personalizado de entidad" style="width:100%;" >}}

1. Haz clic en **Add Custom Entity Type** (Añadir tipo personalizado de entidad) para añadir un tipo. 

Si cierras la ventana y seleccionas **Create New Entry** (Crear nueva entrada), tu tipo personalizado aparecerá en el menú desplegable `kind` en la parte superior de la ventana emergente. 

{{< img src="/tracing/internal_developer_portal/custom-type-in-dropdown.png" alt="La ventana emergente Crear nueva entrada, en la que se muestra el menú desplegable que incluye tipos personalizados de entidades" style="width:60%;" >}}

### A través de la API 

También puedes definir tus tipos personalizados a través de la [API de Software Catalog][1].

### Ejemplo de entidad

En el siguiente ejemplo, un usuario define una entidad de tipo personalizado `library` con enlaces, tags (etiquetas) y equipos propios:

{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
apiVersion: v3
kind: library
metadata:
  name: my-library
  displayName: My Library
  tags:
    - tag:value
  links:
    - name: shopping-cart runbook
      type: runbook
      url: https://runbook/shopping-cart
    - name: shopping-cart architecture
      provider: gdoc
      url: https://google.drive/shopping-cart-architecture
      type: doc
    - name: shopping-cart Wiki
      provider: wiki
      url: https://wiki/shopping-cart
      type: doc
    - name: shopping-cart source code
      provider: github
      url: http://github/shopping-cart
      type: repo
  contacts:
    - name: Support Email
      type: email
      contact: team@shopping.com
    - name: Support Slack
      type: slack
      contact: https://www.slack.com/archives/shopping-cart
  owner: myteam
  additionalOwners:
    - name: opsTeam
      type: operator
{{< /code-block >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/api/latest/software-catalog/#create-or-update-kinds
[2]: /es/api/latest/software-catalog/#create-or-update-entities
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/software_catalog
[4]: /es/integrations/github/
[5]: /es/internal_developer_portal/software_catalog/entity_model
[6]: /es/internal_developer_portal/software_catalog/entity_model/native_entities
[7]: https://github.com/DataDog/schema/tree/main/service-catalog/v3
[8]: https://app.datadoghq.com/software/settings/get-started