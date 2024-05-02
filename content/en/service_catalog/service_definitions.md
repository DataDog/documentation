---
title: Service Definitions and Supported Versions
kind: documentation
further_reading:
- link: "/tracing/service_catalog/adding_metadata"
  tag: "Documentation"
  text: "Adding metadata"
- link: "https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml"
  tag: "Terraform"
  text: "Create and manage service definitions with Terraform"
- link: "/api/latest/service-definition/"
  tag: "API"
  text: "Learn about the Service Definition API"
- link: "/integrations/github"
  tag: "Documentation"
  text: "Learn about the GitHub Integration"
- link: "https://www.datadoghq.com/blog/service-catalog-backstage-yaml/"
  tag: "Blog"
  text: "Import Backstage YAML files into Datadog"
---

## Metadata structure and supported versions

Service Catalog uses service definition schemas to store and display relevant metadata about your services. The schemas have built-in validation rules to ensure that only valid values are accepted and you can view warnings in the **Definition** tab on the side panel for any selected services. 

There are three supported versions of the schema:

- V2 is the earliest version, and contains some experimental features, such as `dd-team`, which are removed from v2.1.
- V2.1 supports additional UI elements such as service groupings and fields like `application`, `tier`, and `lifecycle`. `Application`, along with Teams, can be used as grouping variables in Service Catalog. `Lifecycle` helps you differentiate between `production`, `experimental`, or `deprecated` services to indicate development stages and apply different reliability and availability requirements. `Tier` indicates the criticality of services, to prioritize during incident triage. For example, `tier 1` typically represents the most critical services whose failure would result in severe customer impact, whereas `tier 4` services typically have no impacts on actual customer experience.
- V2.2 supports user annotation and overwriting auto-detected service type and languages using the fields `type` and `languages`. It also adds support for associating CI pipelines with a service using the field `ci-pipeline-fingerprints`. This version also includes less restrictive validation logic for `contact.type` and `link.type`, so users should expect fewer warnings while submitting YAML.
- V3.0 adds a `kind` field that supports schemas for additional component types including applications, internal and external libraries, queues, and datastores. Any components within an `application` implicitly inherit its metadata. Furthermore, this version supports manually declaring dependency relationships, in addition to the auto-detected topology through Distributed Tracing and Universal Service Monitoring.

For more information about the latest updates, see the schemas on GitHub.

{{< callout url="https://forms.gle/L5zXVkKr5bAzbdMD9" d_target="#signupModal" btn_hidden="false" header="Opt in to the private beta for metadata schema v3.0!" >}}
{{< /callout >}}

### Metadata Schema v3.0 (beta) 
The Entity Definition Schema is a structure that contains basic information about an entity. See the [full schema on GitHub][1].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/schema/tree/main/service-catalog/v3