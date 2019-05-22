---
title: Autodiscovery Container Identifier
kind: documentation
further_reading:
- link: "/agent/autodiscovery"
  tag: "Documentation"
  text: "Main Autodiscovery documentation"
- link: "/agent/kubernetes/cluster/"
  tag: "Documentation"
  text: "Cluster Agent documentation"
---

### Alternate Container Identifier: Labels

Containers are identified by label rather than container name or image. Just label any container `com.datadoghq.ad.check.id: <SOME_LABEL>`, and then put `<SOME_LABEL>` anywhere you'd normally put a container name or image. For example, if you label a container `com.datadoghq.ad.check.id: special-container`, Autodiscovery applies to that container any auto-conf template that contains `special-container` in its `ad_identifiers` list.

Autodiscovery can only identify each container by label OR image/name&mdash;not both&mdash;and labels take precedence. For a container that has a `com.datadoghq.ad.check.id: special-nginx` label and runs the `nginx` image, the Agent DOESN'T apply templates that include only `nginx` as a container identifier.
