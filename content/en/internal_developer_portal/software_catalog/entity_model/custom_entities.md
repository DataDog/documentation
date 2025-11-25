---
title: Custom Entities
disable_toc: false
further_reading:
- link: "/internal_developer_portal/software_catalog/set_up/create_entities"
  tag: "Documentation"
  text: "Create entities in Software Catalog"
- link: "/internal_developer_portal/software_catalog/entity_model/native_entity_types"
  tag: "Documentation"
  text: "Learn about native entity types"
---

## Overview

As of [schema definition v3.0][5]+, you can define custom entity types beyond the [native types][6] (such as service, datastore, or queue). 

Custom entities allow you to represent any component or resource that is important to your organization but does not fit into the standard categories. For example, you might create custom entity types for libraries, pipelines, ML models, or infrastructure components.

See GitHub for [full schema definitions][7].

## Create a custom entity type

You can create custom entity types in Datadog or through the Software Catalog API. After creating the type, you can add entities of that type in Datadog or programmatically through the [Software Catalog APIs][2], [GitHub integration][4], or [Terraform module][3]. 

### In Datadog

1. Navigate to **APM** > **Software Catalog**, and click [**Manage**][8].
1. Click **Manage Custom Entity Types** to view existing entity types, native and custom.

   {{< img src="/tracing/internal_developer_portal/manage-entity-types.png" alt="The Manage Entity Types pop-up window, showing existing native and custom types and a button to create a custom entity type" style="width:100%;" >}}

1. Click **Add Custom Entity Type** to add a type. 

If you close the window and select **Create New Entry**, your custom type appears in the `kind` dropdown at the top of the pop-up window. 

{{< img src="/tracing/internal_developer_portal/custom-type-in-dropdown.png" alt="The Create New Entry pop-up window, showing the kind dropdown which includes custom entity types" style="width:60%;" >}}

### Through the API 

Alternatively, define your custom types through the [Software Catalog API][1].

### Example entity

In the follow example, a user defines an entity of custom type `library` with links, tags, and owning teams:

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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/software-catalog/#create-or-update-kinds
[2]: /api/latest/software-catalog/#create-or-update-entities
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/software_catalog
[4]: /integrations/github/
[5]: /internal_developer_portal/software_catalog/entity_model
[6]: /internal_developer_portal/software_catalog/entity_model/native_entity_types
[7]: https://github.com/DataDog/schema/tree/main/service-catalog/v3
[8]: https://app.datadoghq.com/software/settings/get-started
