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



_Any_ `redis` image. Suppose you have one container running `library/httpd:latest` and another running `yourusername/httpd:v2`. Autodiscovery applies the above template to both containers. When it's loading auto-conf files, Autodiscovery cannot distinguish between identically-named images from different sources or with different tags, and **you have to provide short names for container images**, e.g. `httpd`, NOT `library/httpd:latest`.

If this is too limiting&mdash;if you need to apply different check configurations to different containers running the same image&mdash;[use labels to identify the containers][1]. Label each container differently, then add each label to any template file's `ad_identifiers` list (yes, `ad_identifiers` is where to put _any_ kind of container identifier, not just images).



_Any_ `httpd` image. Suppose you have one container running `library/httpd:latest` and another running `yourusername/httpd:v2`. Autodiscovery applies the above template to both containers. When it's loading auto-conf files, Autodiscovery cannot distinguish between identically-named images from different sources or with different tags, and **you have to provide short names for container images**, e.g. `httpd`, NOT `library/httpd:latest`.

If this is too limiting&mdash;if you need to apply different check configurations to different containers running the same image&mdash;[use labels to identify the containers][2]. Label each container differently, then add each label to any template file's `ad_identifiers` list (yes, `ad_identifiers` is where to put _any_ kind of container identifier, not just images).
[1]: /agent/autodiscovery/#template-source-kubernetes-pod-annotations
[2]: 
