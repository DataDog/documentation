---
aliases:
- /fr/security/threat_intel
description: Renseignement sur les menaces de Datadog
further_reading:
- link: /security/application_security/how-it-works/threat-intelligence/
  tag: Documentation
  text: Renseignements sur les menaces AAP
- link: /security/cloud_siem/threat_intelligence/
  tag: Documentation
  text: Renseignements sur les menaces Cloud SIEM
- link: https://www.datadoghq.com/blog/cloud-security-investigation-ai/
  tag: Blog
  text: Comment enquêter sur une compromission d'identifiants Cloud avec Bits Security
    Analyst
- link: https://www.datadoghq.com/blog/bits-threat-hunting/
  tag: Blog
  text: Automatisez la recherche de menaces avec Datadog Cloud SIEM
products:
- icon: siem
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Workload Protection
  url: /security/workload_protection/
- icon: app-sec
  name: Protection des applications et des API
  url: /security/application_security/
title: Renseignements sur les menaces
---
{{< product-availability >}}

## Présentation {#overview}

Les renseignements sur les menaces sont des informations de réputation qui aident les intervenants à prendre des décisions éclairées concernant les attaques et les compromissions.

Datadog organise les indicateurs de compromission issus des renseignements sur les menaces commerciaux, open-source et internes en catégories et intentions. Les renseignements sur les menaces sont mis à jour au moins une fois par jour, par source. Ces données sont utilisées pour enrichir vos logs et traces avec des informations de réputation pertinentes.

## Apportez votre propre intelligence des menaces {#bring-your-own-threat-intelligence}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-warning">L'utilisation de votre propre intelligence des menaces n'est pas prise en charge dans {{< region-param key="dd_site_name" >}}.</div>
{{< /site-region >}}

Datadog Security prend en charge l'enrichissement et la recherche de traces avec des indicateurs de compromission issus des renseignements sur les menaces stockés dans les tables de référence Datadog. [Les tables de référence][2] vous permettent de combiner des métadonnées avec des informations déjà présentes dans Datadog.

La durée de persistance des renseignements sur les menaces en tant qu'enrichissement disponible varie selon la source :
- Flux basés sur les OEM et les intégrations : 24 heures
  - Datadog récupère les renseignements sur les menaces auprès de ces fournisseurs au moins une fois par jour, et dépend du fournisseur pour assurer la persistance de ces renseignements
- Apportez vos propres renseignements sur les menaces : pendant toute la durée pendant laquelle vous configurez leur disponibilité

Pour plus d'informations, consultez le guide [Bring Your Own Threat Intelligence][3].

## Cycle de vie des renseignements sur les menaces {#threat-intelligence-lifecycle}

Datadog collecte des renseignements sur les menaces pour les types d'entités suivants. Chaque type d'entité possède des caractéristiques uniques et une période de validité utile. Cette période de validité, ou cycle de vie, doit être prise en compte lors de l'évaluation de l'importance d'une correspondance de renseignements sur les menaces dans vos données.

### Hachages de fichiers : empreintes numériques uniques {#file-hashes-unique-digital-fingerprints}

Les hachages de fichiers fonctionnent comme des empreintes numériques uniques pour des fichiers spécifiques. Lorsqu'un hachage de fichier est marqué comme malveillant, cela signifie que le contenu exact du fichier est dangereux. L'immuabilité d'un hachage, qui est liée au contenu de son fichier, garantit son identification cohérente. Par conséquent, un hachage de fichier marqué comme malveillant conserve cette identification, à condition que l'identification ait été un vrai positif.

### Packages d'application : Risque de logiciel malveillant dans la distribution {#application-packages-malware-risk-in-distribution}

Contrairement aux hachages de fichiers immuables, les packages d'application peuvent varier en contenu et en sécurité, même sous le même numéro de version. Des acteurs malveillants peuvent télécharger des packages dangereux imitant des packages légitimes, ou ils peuvent compromettre des packages existants en introduisant des logiciels malveillants. Le cycle de vie des packages malveillants est souvent long, mais pas immuable.

### Domaines : Signatures temporaires {#domains-temporary-signatures}

Contrairement aux hachages de fichiers, les domaines identifiés comme malveillants sont sujets à changement. Ils peuvent faire l'objet de processus tels que la remédiation, la réattribution ou la réutilisation par diverses entités. Bien que le cycle de vie des domaines malveillants ou suspects soit quelque peu prolongé par rapport aux adresses IP, il reste temporaire et variable.

### Adresses IP : Dynamiques et transitoires {#ip-addresses-dynamic-and-transient}

Les adresses IP représentent l'élément le plus volatil dans le renseignement sur les menaces, changeant souvent de réputation au cours d'un cycle de 24 heures. Compte tenu de leur nature dynamique, en particulier dans les réseaux résidentiels et mobiles où plusieurs hosts peuvent être impliqués, il est crucial de réévaluer régulièrement leur statut. Tous les hosts connectés à une adresse IP de faible réputation ne sont pas intrinsèquement malveillants, ce qui souligne la nécessité d'une corrélation.

## Meilleures pratiques en matière de renseignement sur les menaces {#best-practices-in-threat-intelligence}

Avec le renseignement sur les menaces, la réputation est essentielle, mais elle doit être mise en balance avec d'autres preuves. Il n'est pas recommandé de se fier uniquement au renseignement sur les adresses IP et les domaines pour bloquer le trafic, sauf rares exceptions. Une approche équilibrée et fondée sur des preuves est essentielle.

Le renseignement sur les menaces utilisé dans [Detection Rules][1] doit faire référence aux clés Datadog telles que la catégorie (`@threat_intel.results.category`) et l'intention (`@threat_intel.results.intention`). Les autres clés ne doivent pas être utilisées.

## Transparence dans les renseignements sur les menaces {#transparency-in-threat-intelligence}

Datadog assure la transparence en fournissant des liens externes vers des sources de renseignements sur les menaces externes associées à une détection. Les renseignements sur les menaces sélectionnés par Datadog sont ingérés dans la plateforme Datadog pour l'enrichissement et la détection. Datadog n'envoie pas de données client aux sources de renseignements sur les menaces.

Les détections et les enrichissements sont accessibles dans l'interface utilisateur et dans le JSON des événements.

## Facettes de renseignement sur les menaces {#threat-intelligence-facets}

Les sources, les catégories et les intentions sont disponibles en tant que facettes et filtres sur les Explorers de produits pertinents.

### Sources de renseignements sur les menaces {#threat-intelligence-sources}

| Source | Catégorie | Cas d'utilisation de la source | Produits principaux |
|--------|------------|-----------|------------------|
| Datadog Threat Research| scanners, exploitation de Redis, exploitation de Docker, logiciels malveillants, force brute | Pots de miel axés sur les menaces spécifiques aux logiciels | AAP, CWS et Cloud SIEM |
| [Datadog AAP](https://docs.datadoghq.com/fr/security/application_security/) | scanner | Liste d'adresses IP observées attaquant plusieurs clients AAP | AAP |
| [Spur](https://spur.us/) | proxy résidentiel | Proxies associés au credential stuffing et à la fraude | AAP et Cloud SIEM |
| [Spur](https://spur.us/) | proxy malware | Proxies associés à la commande et au contrôle de logiciels malveillants | Cloud SIEM et Workload Protection |
| [Abuse.ch](https://abuse.ch/) Malware Bazaar| logiciels malveillants | Logiciels malveillants sur les hosts | CWS |
| [Minerstat](https://minerstat.com/mining-pool-whitelist.txt) | cryptomining | Activité de minage de cryptomonnaies avec des pools de minage connus| Workload Protection et Cloud SIEM |
| Tor | tor | Violations de politique pour l'activité des utilisateurs | App and API Protection, Cloud SIEM et Workload Protection |
| [Threatfox](https://threatfox.abuse.ch/) | logiciels malveillants | Identifier les hosts communiquant avec une infrastructure de logiciels malveillants connue | Cloud SIEM et Workload Protection |


### Catégories de renseignements sur les menaces {#threat-intelligence-categories}

| Catégorie | Intention | Types d'entités | Cas d'utilisation du produit | Produits principaux |
|----------|----------|--------------|----------|------------------|
| proxy résidentiel | suspect | adresses IP | Réputation liée au credential stuffing et à la fraude | AAP et Cloud SIEM |
| proxy botnet | suspect | adresses IP | Réputation liée à l'appartenance à un botnet et à la contribution à des attaques distribuées | AAP et Cloud SIEM |
| logiciel malveillant | malveillant | versions de bibliothèques d'applications, hachages de fichiers | Packages malveillants et communication avec des pools de minage | CWS |
| scanner | suspect | adresses IP | Réputation liée aux scanners | App and API Protection, Workload Protection et Cloud SIEM |
| proxy hébergement | suspect | adresses IP | Adresses IP de centre de données avec une réputation d'abus, comme pour des attaques distribuées de credential stuffing | AAP et Cloud SIEM |
| tor | suspectes | adresses IP  | Violations de la politique d'entreprise concernant l'activité des utilisateurs | App and API Protection, Workload Protection et Cloud SIEM |
| email jetable | suspect | Domaine  | Détecter l'utilisation du produit à partir d'adresses e-mail jetables | AAP |
| vpn d'entreprise | bénignes | adresses IP | IP associées aux VPN d'entreprise | AAP et Cloud SIEM |
| cryptomining | malveillant | adresses IP | Adresses IP associées à des activités de cryptominage | AAP, CWS et Cloud SIEM |

### Intentions de renseignement sur les menaces {#threat-intelligence-intents}

| Intention     | Cas d'utilisation                                     |
|------------|----------------------------------------------|
| bénin     | VPN d'entreprise et enrichissements informationnels |
| suspect | Faible réputation                               |
| malveillant  | Réputation malveillante                         |


## Types d'entités {#entity-types}
| Type d'entité | Exemple | Cas d'utilisation |
|-------------|---------|-----------------------------|
| Adresses IP | 128.66.0.1 | Identifier les adresses IP associées aux attaques, au commandement et contrôle, et aux activités de scan |
| domaines | example.com, subdomain.example.com | Domaines associés à une utilisation malveillante. Souvent utilisé avec des logiciels malveillants comme commandement et contrôle |
| versions de paquets d'application | (example_package, 1.0.0) | Identifier les paquets malveillants téléchargés depuis PyPi |
| empreintes de fichiers [SHA1, SHA256, ssdeep (Workload Protection uniquement)] | 5f7afeeee13aaee6874a59a510b75767156f75d14db0cd4e1725ee619730ccc8 | Identifier un fichier distinct associé à un logiciel malveillant ou à une compromission |

<div class="alert alert-info">Les sources et catégories de renseignement sur les menaces ne sont pas configurables.</div>

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/detection_rules/
[2]: /fr/integrations/guide/reference-tables
[3]: /fr/security/guide/byoti_guide