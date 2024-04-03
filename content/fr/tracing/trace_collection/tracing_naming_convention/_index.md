---
further_reading:
- link: logs/log_configuration/attributes_naming_convention
  tag: Documentation
  text: En savoir plus sur les attributs standard de la solution Log Management
- link: /real_user_monitoring/browser/data_collected
  tag: Documentation
  text: Données RUM recueillies (Browser)
- link: /tracing/trace_explorer/query_syntax/
  tag: Documentation
  text: Apprendre à explorer vos traces
kind: documentation
title: Sémantique des tags de span
---

## Présentation

[Les bibliothèques de tracing de Datadog][1] fournissent une assistance pour l'instrumentation d'un grand nombre de bibliothèques.
Ces instrumentations génèrent des spans pour représenter des unités de travail logiques dans les systèmes distribués.
Chaque span comporte des [tags de span][2] pour fournir des informations supplémentaires sur l'unité de travail qui survient dans le système. Des conventions de nommage décrivent le nom et le contenu pouvant être utilisés dans les évènements de spans.

<div class="alert alert-info">Vous trouverez une liste complète de tous les tags de span, tous les attributs réservés et toutes les conventions de nommage dans la section <a href="/standard-attributes/?product=apm">Default Standard Attributes (en anglais).</a></div>

## Conventions de nommage pour les tags de span

Il existe un grand nombre de tags de span permettant de décrire ce qui se passe dans le système. Il existe par exemple des tags de span décrivant les domaines suivants :

- **Reserved** : les attributs qui sont toujours présents dans chaque span.
- **Core** : l'instrumentation utilisée et le type d'opération.
- **Network communications** : les unités de travail correspondant aux communications du réseau.
- **HTTP requests** : le client HTTP et les spans du serveur.
- **Database** : les spans de la base de données.
- **Message queue** : les spans du système de messagerie.
- **Remote procedure calls** : les spans correspondant aux appels de procédure à distance, comme RMI ou gRPC.
- **Errors** : les erreurs associées aux spans.

Pour en savoir plus, consultez la section [Default Standard Attributes][6] (en anglais).

## Tags de span et attributs de span

Les tags de span et les attributs de span sont similaires mais leurs concepts sont différents :

- Les [tags de span](#span-tags) correspondent au contexte de la span.
- Les [attributs de span](#span-attributes) correspondent au contenu de la span.

### Tags de span

Les tags de span correspondent au contexte de la span. Voici quelques exemples :

- **Tags de host** : `hostname`, `availability-zone`, `cluster-name`
- **Tags de conteneur** : `container_name`, `kube_deployment`, `pod_name`

Les tags sont généralement enrichis par d'autres sources de données, comme des tags provenant du catalogue d'hôte, de conteneur ou de service. Ces tags sont ajoutés à la span pour décrire le contexte. Par exemple, les tags peuvent décrire les propriétés de l'hôte et la provenance du conteneur de la span, ou les propriétés des services par lesquels la span est émise.

Pour rechercher des tags de span dans Datadog, accédez à l'onglet **Infrastructure** dans le volet latéral Trace :

{{< img src="/tracing/attributes/span-tags.png" alt="Tags de span dans l'onglet Infrastructure." style="width:100%;" >}}

### Attributs de span

Les attributs de span correspondent au contenu de la span. voici quelques exemples :

- `http.url`
- `http.status_code`
- `error.message`

Pour effectuer une requête d'attributs de span, utilisez le caractère `@`, suivi par le nom de l'attribut dans la zone de recherche. Par exemple, `@http.url`.

Pour rechercher des attributs de span dans Datadog, accédez à l'onglet **Info** du volet latéral Trace :

{{< img src="/tracing/attributes/span-attributes.png" alt="Attributs de span dans l'onglet Info." style="width:100%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/setup_overview/
[2]: /fr/glossary/#span-tag
[3]: https://opentelemetry.io/docs/reference/specification/trace/api/#spankind
[4]: /fr/tracing/setup_overview/configure_data_security/
[5]: /fr/tracing/trace_collection/library_config/
[6]: /fr/standard-attributes/?product=apm