---
aliases:
- /fr/security/application_security/threats/threat-intelligence
further_reading:
- link: https://www.datadoghq.com/blog/cloud-siem-enterprise-security
  tag: Blog
  text: 'Datadog Cloud SIEM : stimuler l''innovation dans les opérations de sécurité'
title: Renseignements sur les menaces
---
## Présentation {#overview}

Cette rubrique décrit l'[intelligence des menaces][1] pour la protection des applications et des API (AAP).

Datadog fournit des [jeux de données][1] d'intelligence des menaces intégrés pour AAP. Cela fournit des preuves supplémentaires lors de l'intervention sur une activité de sécurité et réduit les seuils de détection pour certaines détections de logique métier. 

De plus, AAP prend en charge *l'utilisation de votre propre intelligence des menaces*. Cette fonctionnalité enrichit les détections avec de l'intelligence des menaces spécifique à l'entreprise. 

## Bonnes pratiques {#best-practices}

Datadog recommande les méthodes suivantes pour consommer l'intelligence des menaces :

1. Réduire les seuils des règles de détection pour des menaces liées à la logique métier, telles que le credential stuffing. Les utilisateurs peuvent cloner la règle par défaut [Credential Stuffing][6] et la modifier pour répondre à leurs besoins.
2. Utiliser l'intelligence des menaces comme indicateur de réputation avec une activité de sécurité.

Datadog déconseille _ce qui suit_ :
1. Bloquer les traces d'intelligence des menaces sans activité de sécurité correspondante. Les adresses IP peuvent avoir de nombreux hosts derrière elles. La détection d'un proxy résidentiel signifie que l'activité associée a été observée par un host derrière cette IP. Cela ne garantit pas que le host exécutant le logiciel malveillant ou le proxy est le même host que celui qui communique avec vos services.
2. Le blocage sur toutes les catégories d'intelligence des menaces, car cela inclut le trafic légitime provenant de VPN d'entreprise et bloque le trafic non malveillant.

## Filtrer sur l'intelligence des menaces dans AAP {#filtering-on-threat-intelligence-in-aap}

Les utilisateurs peuvent filtrer l'intelligence des menaces dans le Signals Explorer et le Trace Explorer à l'aide de facettes et de la barre de recherche.

Pour rechercher toutes les traces signalées par une source spécifique, utilisez la requête suivante avec le nom de la source :

    @threat_intel.results.source.name:<SOURCE_NAME> 

Pour rechercher toutes les traces contenant de l'intelligence des menaces provenant de n'importe quelle source, utilisez la requête suivante :

    @appsec.threat_intel:true 

## Apportez votre propre intelligence des menaces {#bring-your-own-threat-intelligence}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-warning">L'utilisation de votre propre intelligence des menaces n'est pas prise en charge dans {{< region-param key="dd_site_name" >}}.</div>
{{< /site-region >}}

AAP prend en charge l'enrichissement et la recherche de traces avec des indicateurs de compromission issus de l'intelligence des menaces stockés dans les tables de référence Datadog. [Les tables de référence][2] vous permettent de combiner des métadonnées avec des informations déjà présentes dans Datadog.

Pour plus d'informations, consultez le guide [Bring Your Own Threat Intelligence][14].


## Intelligence des menaces dans l'interface utilisateur {#threat-intelligence-in-the-user-interface}

Lors de la visualisation des traces dans l'AAP Traces Explorer, vous pouvez voir les données d'intelligence des menaces sous l'attribut `@appsec`. Les attributs `category` et `security_activity` sont tous deux définis.

<!-- {{< img src="security/application_security/threats/threat_intel/threat_intel_appsec.png" alt="Exemple de l'attribut appsec contenant des données d'intelligence des menaces">}} -->

Sous `@threat_intel.results`, vous pouvez toujours voir l'intégralité des détails concernant ce qui a été identifié ainsi que la source correspondante.

 <!-- {{< img src="security/application_security/threats/threat_intel/threat_intel_generic.png" alt="Exemple de l'attribut threat_intel contenant des données d'intelligence des menaces">}} -->

## Pour en savoir plus

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/threat_intelligence/#threat-intelligence-sources
[2]: /fr/integrations/guide/reference-tables
[3]: /fr/security/threat_intelligence/#threat-intelligence-facets
[4]: https://app.datadoghq.com/reference-tables/create
[5]: https://app.datadoghq.com/security/configuration/threat-intel
[6]: https://app.datadoghq.com/security/appsec/detection-rules?query=type%3Aapplication_security%20defaultRuleId%3Adef-000-yk4
[7]: /fr/security/threat_intelligence#threat-intelligence-categories
[8]: /fr/security/threat_intelligence#threat-intelligence-intents
[9]: https://app.datadoghq.com/security/appsec/traces
[10]: /fr/integrations/guide/reference-tables/?tab=manualupload#create-a-reference-table
[11]: /fr/integrations/guide/reference-tables/?tab=amazons3#create-a-reference-table
[12]: /fr/integrations/guide/reference-tables/?tab=azurestorage#create-a-reference-table
[13]: /fr/integrations/guide/reference-tables/?tab=googlecloudstorage#create-a-reference-table
[14]: /fr/security/guide/byoti_guide