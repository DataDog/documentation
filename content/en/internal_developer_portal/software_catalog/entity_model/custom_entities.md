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

## Create a custom entity

Define your custom types through the [Software Catalog API][1]. Entities of that type can then be defined in Datadog or programmatically sent through the existing [Software Catalog APIs][2], [GitHub integration][4], or [Terraform module][3]. 

### Example

In the follow example, a user declares a library with links, tags, and owning teams:

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

[1]: /api/latest/software-catalog/#create-or-update-kinds
[2]: /api/latest/software-catalog/#create-or-update-entities
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/software_catalog
[4]: /integrations/github/
[5]: /internal_developer_portal/software_catalog/entity_model
[6]: /internal_developer_portal/software_catalog/entity_model/native_entity_types
[7]: https://github.com/DataDog/schema/tree/main/service-catalog/v3

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
