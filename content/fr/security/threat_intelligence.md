---
aliases:
- /fr/security/threat_intel
description: Renseignements sur les menaces chez Datadog
further_reading:
- link: /security/application_security/how-it-works/threat-intelligence/
  tag: documentation
  text: Renseignements sur les menaces de l'AAP
- link: /security/cloud_siem/threat_intelligence/
  tag: documentation
  text: SIEM Cloud - Renseignements sur les menaces
products:
- icon: siem
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Workload Protection
  url: /security/workload_protection/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
title: Renseignements sur les menaces
---

{{< product-availability >}}

## Présentation

Le renseignement sur les menaces est une information de réputation qui aide les intervenants à prendre des décisions éclairées concernant les attaques et les compromissions.

Datadog classe les indicateurs de compromission issus de renseignements sur les menaces commerciaux, open source et internes en catégories et intentions. Les renseignements sur les menaces sont mis à jour au moins une fois par jour, par source. Ces données servent à enrichir vos journaux et traces avec des informations de réputation pertinentes.

## Apportez vos propres renseignements sur les menaces

Datadog Security prend en charge l'enrichissement et la recherche de traces avec des indicateurs de compromission de renseignements sur les menaces stockés dans les tables de référence Datadog. [Les tables de référence][2] vous permettent de combiner des métadonnées avec des informations déjà présentes dans Datadog.

La durée pendant laquelle les renseignements sur les menaces restent disponibles en tant qu'enrichissement varie selon la source :
- Flux basés sur les équipementiers et l'intégration : 24 heures
  - Datadog réacquiert quotidiennement des renseignements sur les menaces auprès de ces fournisseurs et dépend de ces derniers pour la conservation de ces informations.
- Apportez vos propres renseignements sur les menaces : quelle que soit la durée pendant laquelle vous configurez leur disponibilité.

Pour plus d'informations, consultez le guide [« Apportez vos propres renseignements sur les menaces »][3] .

## cycle de vie du renseignement sur les menaces

Datadog collecte des renseignements sur les menaces pour les types d'entités suivants. Chaque type d'entité possède des caractéristiques uniques et un cadre temporel utile. Ce délai, ou cycle de vie, doit être pris en compte lors de l'évaluation de l'importance d'une correspondance entre les renseignements sur les menaces et vos données.

### Hachages de fichiers : Empreintes digitales uniques

Les empreintes numériques de fichiers fonctionnent comme des empreintes digitales numériques uniques pour des fichiers spécifiques. Lorsqu'un hachage de fichier est marqué comme malveillant, cela signifie que le contenu exact du fichier est nuisible. L'immuabilité d'un hachage, lié au contenu de son fichier, garantit son identification cohérente. Par conséquent, un fichier marqué comme logiciel malveillant conserve cette identification, à condition qu'il s'agisse d'un vrai positif.

### Packages d'application : Risque de logiciels malveillants dans la distribution

Contrairement aux hachages de fichiers immuables, les packages d'applications peuvent varier en termes de contenu et de sécurité, même sous un même numéro de version. Des acteurs malveillants peuvent télécharger des paquets nuisibles imitant des paquets légitimes, ou compromettre des paquets existants en y introduisant des logiciels malveillants. Le cycle de vie des logiciels malveillants est souvent long, mais pas immuable.

### Domaines : signatures temporaires

Contrairement aux hachages de fichiers, les domaines identifiés comme malveillants sont susceptibles de changer. Elles peuvent faire l'objet de processus tels que la remise en état, la réaffectation ou la reconversion par diverses entités. Bien que le cycle de vie des domaines malveillants ou suspects soit quelque peu plus long que celui des adresses IP, il reste temporaire et variable.

### Adresses IP Dynamique et transitoire

Les adresses IP représentent l'élément le plus volatil du renseignement sur les menaces, leur réputation changeant souvent en l'espace de 24 heures. Compte tenu de leur nature dynamique, notamment dans les réseaux résidentiels et mobiles où plusieurs hôtes peuvent être impliqués, il est crucial de réévaluer régulièrement leur état. Tous les hôtes connectés à une adresse IP ayant une faible réputation ne sont pas intrinsèquement malveillants, ce qui souligne la nécessité d'une corrélation.

## Meilleures pratiques en matière de renseignement sur les menaces

En matière de renseignement sur les menaces, la réputation est essentielle, mais elle doit être mise en balance avec d'autres éléments de preuve. Il est déconseillé, à quelques exceptions près, de se fier uniquement aux informations relatives aux adresses IP et aux domaines pour bloquer le trafic. Une approche équilibrée et fondée sur des preuves est essentielle.

Les renseignements sur les menaces utilisés dans [les règles de détection][1] doivent faire référence aux clés Datadog telles que la catégorie (`@threat_intel.results.category`) et intention (`@threat_intel.results.intention`). Il ne faut pas utiliser d'autres touches.

## Transparence dans le renseignement sur les menaces

Datadog garantit la transparence en fournissant des liens externes vers des sources de renseignements sur les menaces externes associées à une détection. Les renseignements sur les menaces collectés par Datadog sont intégrés à la plateforme Datadog pour être enrichis et détectés. Datadog ne transmet pas les données de ses clients aux sources de renseignement sur les menaces.

Les détections et les enrichissements sont accessibles dans l'interface utilisateur et dans le JSON des événements.

## Aspects du renseignement sur les menaces

Les sources, les catégories et les intentions sont disponibles sous forme de facettes et de filtres sur les explorateurs de produits pertinents.

### Sources de renseignement sur les menaces

| Source | \`category\` | Cas d'utilisation de la source | Produits de base |
|--------|------------|-----------|------------------|
| Recherche sur les menaces de Datadog| scanners, exploitation de Redis, exploitation de Docker, logiciels malveillants, force brute | Pots de miel axés sur les menaces spécifiques aux logiciels | AAP, CWS et SIEM Cloud |
| [Datadog AAP](https://docs.datadoghq.com/security/application_security/) | scanner | Liste des adresses IP observées lors d'attaques contre plusieurs clients AAP | AAP |
| [Éperon](https://spur.us/) | proxy_résidentiel | Les proxys sont associés au bourrage d'identifiants et à la fraude. | AAP et SIEM Cloud |
| [Éperon](https://spur.us/) | proxy_malware | Proxies associés à la commande et au contrôle des logiciels malveillants | Cloud SIEM |
| [Abuse.ch](https://abuse.ch/) Bazar de logiciels malveillants| logiciels malveillants | Logiciels malveillants sur les hôtes | \*\*CWS** |
| [Minerstat](https://minerstat.com/mining-pool-whitelist.txt) | minage de cryptomonnaies | Activité de minage de cryptomonnaies avec des pools de minage connues| Protection des charges de travail et SIEM cloud |
| Tor | tor | Violations du règlement concernant l'activité des utilisateurs | Protection des applications et des API, SIEM cloud et protection des charges de travail |
| [Renard des menaces](https://threatfox.abuse.ch/) | logiciels malveillants | Identifier les hôtes communiquant avec une infrastructure de logiciels malveillants connue | SIEM cloud et protection des charges de travail |


### Catégories de renseignements sur les menaces

| \`category\` | Intention | Types d'entités | Cas d'utilisation du produit | Produits de base |
|----------|----------|--------------|----------|------------------|
| proxy_résidentiel | suspect | Adresses IP | Réputation de fraude et de bourrage d'identifiants | AAP et SIEM Cloud |
| botnet_proxy | suspect | Adresses IP | Réputation d'appartenance à un réseau de zombies et de contribution à des attaques distribuées | AAP et SIEM Cloud |
| logiciels malveillants | malveillant | versions de la bibliothèque d'application, hachages de fichiers | Paquets malveillants et communication avec les pools de minage| \*\*CWS** |
| scanner | suspect | Adresses IP | Réputation des scanners | Protection des applications et des API, protection des charges de travail et SIEM cloud |
| hébergement_proxy | suspect | Adresses IP | Adresses IP de centres de données réputées pour des abus, notamment dans le cadre d'attaques par bourrage d'identifiants distribuées. | AAP et SIEM Cloud |
| tor | suspect | Adresses IP  | Violations de la politique de l'entreprise liées à l'activité des utilisateurs | Protection des applications et des API, protection des charges de travail et SIEM cloud |
| email jetable | suspect | Domaine  | Détecter l'utilisation du produit à partir d'adresses e-mail jetables | AAP |
| VPN d'entreprise | bénin | Adresses IP | Adresses IP associées aux VPN d'entreprise | AAP et SIEM client |
| minage de cryptomonnaies | malveillant | Adresses IP | Adresses IP associées aux activités de minage de cryptomonnaies | AAP, CWS et SIEM Cloud |

### Intentions de renseignement sur les menaces

| Intention     | Cas d'utilisation                                     |
|------------|----------------------------------------------|
| bénin     | VPN d'entreprise et enrichissement de l'information |
| suspect | mauvaise réputation                               |
| malveillant  | Réputation malveillante                         |


## Types d'entités
| Type d'entité | Exemple | Cas d'utilisation |
|-------------|---------|-----------------------------|
| Adresses IP | 128.66.0.1 | Identifier les adresses IP associées aux attaques, aux activités de commande et de contrôle, et aux activités de balayage. |
| domaines | exemple.com, sous-domaine.exemple.com | Domaines associés à une utilisation malveillante. Souvent utilisé avec des logiciels malveillants comme outil de commande et de contrôle |
| versions du package d'application | (exemple_package, 1.0.0) | Identifier les paquets malveillants téléchargés depuis PyPi |
| hachages de fichiers \[SHA1, SHA256, ssdeep (Protection de la charge de travail uniquement)] | 5f7afeeee13aaee6874a59a510b75767156f75d14db0cd4e1725ee619730ccc8 | Identifiez un fichier distinct associé au logiciel malveillant ou à la compromission. |

<div class="alert alert-info">Les sources et les catégories de renseignements sur les menaces ne sont pas configurables.</div>

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/detection_rules/
[2]: /fr/integrations/guide/reference-tables
[3]: /fr/security/guide/byoti_guide