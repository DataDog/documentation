---
title: Quelles sont les meilleures pratiques recommandées pour nommer les métriques et les tags?
kind: faq
further_reading:
- link: "developers/metrics"
  tag: "Documentation"
  text: En savoir plus sur les métriques dans Datadog
- link: "getting_started/getting_started_with_tags"
  tag: "Documentation"
  text: Commencer avec les tags
---

---

We recommend certain best practices for naming metrics and tags.

**For metrics the rules defined are**:

* Les noms de métriques doivent commencer par une lettre
* Can only contain Ascii alphanumerics, underscore and periods (other characters will get converted to underscores)
* Should not exceed 200 characters (though less than 100 is generally preferred from a UI perspective)
* Unicode n'est pas supporté
* Nous recommandons d'éviter les espaces

Metrics reported by the Agent are in a pseudo-hierarchical dotted format (e.g. `http.nginx.response_time`). We say pseudo-hierarchical because we’re not actually enforcing a hierarchy or doing anything with it, but we have aspirations to use it to infer things about servers (e.g. “hey, I see hostA and hostB are reporting ‘http.nginx.*’, those must be web frontends”).

**Best practices for naming tags**:

* Tags must start with a letter
* May contain alphanumerics, underscores, minuses, colons, periods and slashes
Other characters will get converted to underscores
* Tags can be up to 200 characters long and support unicode
* Tags will be converted to lowercase
* For optimal functionality, we recommend constructing tags that use the `key:value` syntax

Examples of commonly used metric tag keys are env, instance, name, and role.

{{< partial name="whats-next/whats-next.html" >}}

