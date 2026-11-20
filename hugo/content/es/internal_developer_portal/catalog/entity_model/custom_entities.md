---
aliases:
- /es/internal_developer_portal/software_catalog/entity_model/custom_entities
description: Defina tipos de entidad personalizados en Catalog para representar componentes
  únicos de su organización, como bibliotecas, canalizaciones o modelos de ML.
disable_toc: false
further_reading:
- link: /internal_developer_portal/catalog/set_up/create_entities
  tag: Documentación
  text: Cree entidades en Catalog
- link: /internal_developer_portal/catalog/entity_model/native_entities/
  tag: Documentación
  text: Obtenga información sobre los tipos de entidad nativos
title: Entidades personalizadas
---
## Descripción general {#overview}

A partir de la [definición de esquema v3.0][5]+, puede definir tipos de entidad personalizados más allá de los [tipos nativos][6] (como servicio, almacén de datos o cola). 

Las entidades personalizadas le permiten representar cualquier componente o recurso que sea importante para su organización pero que no encaje en las categorías estándar. Por ejemplo, puede crear tipos de entidad personalizados para bibliotecas, canalizaciones, modelos de ML o componentes de infraestructura.

Consulte GitHub para ver las [definiciones de esquema completas][7].

## Crear un tipo de entidad personalizado {#create-a-custom-entity-type}

Puede crear tipos de entidad personalizados en Datadog o a través de Catalog API. Después de crear el tipo, puede agregar entidades de ese tipo en Datadog o mediante programación a través de [Catalog APIs][2], la [integración con GitHub][4], la [integración con GitLab][9] o el [módulo de Terraform][3].

### En Datadog {#in-datadog}

1. Navegue a **APM** > **Catalog** y haga clic en [**Manage**][8].
1. Haga clic en **Manage Custom Entity Types** para ver los tipos de entidad existentes, tanto nativos como personalizados.

   {{< img src="/tracing/internal_developer_portal/manage-entity-types.png" alt="La ventana emergente Manage Entity Types, que muestra los tipos nativos y personalizados existentes y un botón para crear un tipo de entidad personalizado" style="width:100%;" >}}

1. Haga clic en **Add Custom Entity Type** para agregar un tipo. 

Si cierra la ventana y selecciona **Create New Entry**, su tipo personalizado aparecerá en el menú desplegable `kind` en la parte superior de la ventana emergente. 

{{< img src="/tracing/internal_developer_portal/custom-type-in-dropdown.png" alt="La ventana emergente Create New Entry, que muestra el menú desplegable kind que incluye tipos de entidad personalizados" style="width:60%;" >}}

### A través de la API {#through-the-api}

Alternativamente, defina sus tipos personalizados a través de [Catalog API][1].

### Ejemplo de entidad {#example-entity}

En el siguiente ejemplo, un usuario define una entidad de tipo personalizado `library` con enlaces, etiquetas y equipos propietarios:

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

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/api/latest/software-catalog/#create-or-update-kinds
[2]: /es/api/latest/software-catalog/#create-or-update-entities
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/software_catalog
[4]: /es/integrations/github/
[5]: /es/internal_developer_portal/catalog/entity_model
[6]: /es/internal_developer_portal/catalog/entity_model/native_entities
[7]: https://github.com/DataDog/schema/tree/main/service-catalog/v3
[8]: https://app.datadoghq.com/software/settings/get-started
[9]: /es/integrations/gitlab-source-code/