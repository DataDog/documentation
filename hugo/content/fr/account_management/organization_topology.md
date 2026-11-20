---
aliases:
- /fr/account_management/org_settings/organization_topology/
- /fr/getting_started/organization_topology/
description: Choisissez entre des déploiements Datadog à organisation unique ou multi-organisation,
  assurez l'isolation grâce à des contrôles d'accès et gérez des environnements multi-organisation.
further_reading:
- link: /account_management/multi_organization/
  tag: Documentation
  text: Gestion des comptes multi-organisations
- link: /account_management/organization_groups/
  tag: Documentation
  text: Groupes d'organisation
- link: /account_management/org_settings/cross_org_visibility/
  tag: Documentation
  text: Visibilité entre organisations
- link: /account_management/rbac/
  tag: Documentation
  text: Role Based Access Control (RBAC)
- link: /account_management/rbac/data_access/
  tag: Documentation
  text: Data Access Control
- link: /account_management/rbac/granular_access/
  tag: Documentation
  text: Contrôle d'accès granulaire
- link: /account_management/teams/
  tag: Documentation
  text: Teams
- link: /account_management/saml/
  tag: Documentation
  text: SAML Single Sign-On
title: Topologie de l'organisation
---
## Présentation {#overview}

Votre topologie d'organisation Datadog (organisation unique ou multi-organisation) détermine la manière dont vous observez les services, contrôlez l'accès, gérez les utilisateurs et attribuez les coûts.

Cette page couvre :
- Les capacités d'une topologie à organisation unique
- Les scénarios qui justifient une topologie multi-organisation
- Comment décider quelle topologie correspond à vos besoins

## Commencez avec une organisation unique {#start-with-a-single-organization}

Datadog recommande une [topologie à organisation unique](#single-organization-topology-recommended) pour la plupart des déploiements. Vous pouvez gérer une organisation unique en personnalisant le niveau d'accès à vos ressources Datadog. Par exemple, les grandes entreprises comptant des milliers d'utilisateurs et plusieurs unités commerciales peuvent utiliser [Teams][7] et le [contrôle d'accès granulaire][6] pour répondre à des exigences de conformité strictes.

Utilisez une [topologie multi-organisation](#multi-organization-topology) uniquement lorsqu'une organisation unique ne peut pas satisfaire une exigence impérative.

## Topologie à organisation unique (recommandée) {#single-organization-topology-recommended}

Dans une topologie à organisation unique, les unités commerciales, les équipes et les environnements partagent une seule organisation. Les conventions basées sur les tags (`team:`, `env:`, `service:`, `cost_center:`) régissent les politiques d'accès, les dashboards et l'attribution de la facturation. Les contrôles d'accès assurent l'isolation entre les groupes lorsque cela est nécessaire.

### Capacités d'une topologie à organisation unique {#capabilities-of-a-single-org-topology}
Une organisation unique vous offre :

- **Observabilité connectée :** Les traces distribuées circulent de bout en bout à travers les services sans interruption. Les vues corrélées entre les métriques, les logs et les traces fonctionnent sans personnalisation supplémentaire.
- **Un espace de configuration unique :** Les monitors, dashboards, pipelines et SLO sont regroupés au même endroit, sans duplication ni dérive.
- **Gestion centralisée des utilisateurs :** Vous n'avez besoin que d'une seule configuration SSO, d'une seule intégration [SCIM][11] et d'un seul ensemble de rôles et d'équipes.
- **Visibilité des coûts par équipe :** L'attribution de l'utilisation répartit les dépenses par équipe, service ou unité commerciale à l'aide de tags ; vous n'avez donc pas besoin d'organisations distinctes pour des vues de facturation séparées.
- **Faible coût opérationnel :** Une organisation unique ne nécessite pas de modules Terraform par organisation, de solutions de contournement inter-organisationnelles ou de routage d'alertes dupliqué.

**Exemple :** Une grande entreprise technologique comptant 5 000 utilisateurs Datadog répartis dans 12 unités commerciales utilise une seule organisation. Chaque unité commerciale dispose d'une Team avec des restrictions de contrôle d'accès discrétionnaire sur ses données de télémétrie. Les administrateurs de plateforme disposent d'un rôle global. Les ingénieurs des unités commerciales ne voient que les données de leur équipe.

### Contrôle d'accès au sein d'une organisation unique {#access-control-within-a-single-organization}

La plupart des organisations peuvent répondre à leurs besoins grâce aux contrôles d'accès d'une organisation unique. Le [RBAC][3], [Data Access Control][4], [Granular Access Control][6], [Teams][7] et les [IP allowlists][10] assurent une séparation stricte des données au sein d'une organisation unique, même dans les secteurs réglementés.

Pour des conseils de mise en œuvre détaillés, consultez la [documentation sur le contrôle d'accès][3].

### Limitations {#limitations}

Tous les utilisateurs au sein d'une organisation peuvent voir les fonctionnalités principales telles que l'infrastructure. Tous les types de télémétrie ne prennent pas en charge la restriction au niveau des lignes. Consultez les [types de télémétrie pris en charge][5] pour obtenir la liste complète.

## Topologie multi-organisation {#multi-organization-topology}

Utilisez une configuration multi-organisation lorsqu'une organisation unique avec des contrôles d'accès ne peut pas satisfaire une exigence stricte, ou lorsque des entités de facturation distinctes nécessitent une facturation indépendante. Les cinq scénarios suivants sont concernés.

### Scénario 1 : Isolation des données imposée par la réglementation ou par contrat {#scenario-1-regulatory-or-contractual-data-isolation}

_Le fait de co-localiser ces données dans la même organisation violerait-il une réglementation ou un contrat, même avec des restrictions d'accès basées sur les équipes ?_

Certaines réglementations exigent que les données ne coexistent jamais au sein d'une même frontière logique. L'exigence n'est pas que les utilisateurs ne puissent pas voir les données, mais que les données ne puissent pas partager la même organisation. Si votre équipe de conformité ou vos auditeurs externes exigent une séparation physique au niveau de l'organisation (et non des restrictions au niveau des lignes), une configuration multi-organisation est le bon choix.

Utilisez plusieurs organisations : une par charge de travail réglementée, une par région requise (par exemple, une région européenne) et une pour tout le reste. [Cross-Organization Visibility][2] connecte les organisations pour les dashboards opérationnels utilisant des métriques consolidées. L'organisation réglementée dispose de politiques d'accès, de listes d'autorisation IP et de contrôles d'audit plus stricts.

**Exemple :** Une société de services financiers isole la télémétrie de sa plateforme de trading (soumise aux exigences de traitement des données de la SEC/FINRA) dans une organisation dédiée. Toutes les autres unités commerciales partagent l'organisation principale.

### Scénario 2 : Répondre aux exigences de résidence des données {#scenario-2-meet-data-residency-requirements}

_Le transfert de données entre régions est-il interdit pour ces données ?_

Lorsque les réglementations interdisent à la télémétrie de quitter une région géographique, vous avez besoin d'organisations dans différents sites Datadog (par exemple, US1, EU1, AP1).

### Scénario 3 : Cloisonner les données entre les équipes {#scenario-3-firewall-data-between-teams}

_Est-ce un risque si une équipe voit une quelconque trace des données d'une autre équipe ?_

Les contrôles d'accès Datadog restreignent les sources les plus courantes de données sensibles. Ils ne prennent pas en charge une séparation complète et cloisonnée de toutes les données de télémétrie ou des métadonnées d'actifs. Si vos exigences imposent une absence totale de mélange de données, utilisez des organisations distinctes.

### Scénario 4 : Isoler les clients des MSP {#scenario-4-isolate-msp-customers}

_Avez-vous besoin d'une facturation, de limites de données et de pools d'utilisateurs distincts par client ?_

Les fournisseurs de services gérés (MSP) qui travaillent avec plusieurs clients externes ont généralement besoin d'une organisation isolée par client, avec une gestion indépendante de la facturation, des données et des utilisateurs. Le [modèle d'organisation parent-enfant][1] de Datadog permet cette configuration.

Utilisez une organisation parente pour les opérations internes du MSP, avec des organisations enfants par client. Chaque organisation enfant dispose de données, d'utilisateurs et d'une facturation isolés. L'organisation parente fournit des vues opérationnelles centralisées grâce à [Cross-Organization Visibility][2].

**Exemple :** Un fournisseur d'infrastructure gérée avec plus de 200 clients crée une organisation enfant par client. L'équipe du centre d'opérations réseau de l'organisation parente surveille l'état des services de toutes les organisations clientes à l'aide de dashboards inter-organisations.

### Scénario 5 : Intégrer une entreprise acquise {#scenario-5-integrate-an-acquired-company}

_Intégrez-vous une entreprise acquise qui possède déjà sa propre organisation Datadog ?_

Les fusions et acquisitions entraînent souvent une situation temporaire dans laquelle plusieurs organisations coexistent. L'organisation de l'entreprise acquise reste active durant l'intégration, tandis que vous préparez l'organisation cible en mettant en place les contrôles d'accès, les équipes et les configurations appropriés. L'objectif est la consolidation en une seule organisation une fois que les contrôles d'accès et les outils de migration sont en place. Pour obtenir des conseils sur la consolidation, contactez l'équipe chargée de votre compte.

**Exemple :** Après avoir acquis une entreprise SaaS, une grande entreprise relie les deux organisations grâce à [Cross-Organization Visibility][2] pour disposer immédiatement d'une vue d'ensemble de leurs opérations. L'entreprise procède ensuite à une consolidation par étapes sur une période de trois à six mois.

## Déterminez votre topologie {#decide-your-topology}

| Scénario | Topologie d'organisation |
| :---- | :---- |
| Une réglementation ou un contrat exige que les données soient hébergées dans une organisation physiquement distincte. | Multi-organisation |
| Le transfert de données entre régions est interdit pour certaines de vos données de télémétrie. | Multi-organisation |
| Votre politique de sécurité exige une séparation totale des données entre les équipes, même avec [RBAC][3], [Data Access Control][4] et [Granular Access Control][6] en place. | Multi-organisation |
| Vous servez des clients externes qui ont besoin d'une facturation, de données et de groupes d'utilisateurs distincts. | Multi-organisation (MSP) |
| Vous intégrez une entreprise acquise qui possède déjà sa propre organisation Datadog. | Multi-organisation temporaire |
| Aucun des éléments ci-dessus | Organisation unique |

### Comparer les capacités des organisations {#compare-org-capabilities}

Dans le tableau suivant, « aucun changement » indique que les Organization Groups n'introduisent pas de nouvelles capacités.

| Capacité | Organisation unique | Multi-organisation | Avec Organization Groups |
| :---- | :---- | :---- | :---- |
| Traces distribuées de bout en bout | Complètes | Ne peuvent pas franchir les frontières entre organisations | Aucun changement |
| Données de télémétrie | Complètes | Partagez des métriques, des logs et des données de CI dans des dashboards avec [Cross-Organization Visibility][2] | Aucun changement |
| Dashboards (métriques, logs, traces) | Complets | Partagez des [dashboards accessibles uniquement sur invitation][9] avec les membres d'une autre organisation | Aucun changement |
| Alertes des monitors couvrant plusieurs sources de données | Complètes | Pas d'évaluation des monitors entre organisations | Aucun changement |
| SLO couvrant plusieurs services | Complets | Ne peuvent pas couvrir plusieurs organisations | Aucun changement |
| Gestion des utilisateurs | Une intégration | [SCIM][11] distinct par organisation | Gestion centralisée au niveau du groupe |
| RBAC et rôles personnalisés | Une configuration | À dupliquer pour chaque organisation | Gestion centralisée au niveau du groupe |
| SSO / SAML | Une configuration ([multi-SAML][8] prend en charge plusieurs IdP) | SAML distinct par organisation | Aucun changement |
| Facturation et utilisation | Attribution de l'utilisation par organisation | Datadog agrège l'utilisation de toutes les organisations enfants et la facture au niveau de l'organisation parente | Aucun changement |
| Déploiement de fonctionnalités | Immédiat | À activer pour chaque organisation | Déploiement centralisé depuis le groupe |

Si votre cas d'utilisation nécessite plusieurs organisations, consultez [Organization Groups][12] pour une gouvernance centralisée de l'ensemble des organisations.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/multi_organization/
[2]: /fr/account_management/org_settings/cross_org_visibility/
[3]: /fr/account_management/rbac/
[4]: /fr/account_management/rbac/data_access/
[5]: /fr/account_management/rbac/data_access/#supported-telemetry
[6]: /fr/account_management/rbac/granular_access/
[7]: /fr/account_management/teams/
[8]: /fr/account_management/saml/
[9]: /fr/dashboards/sharing/shared_dashboards/#invite-only-shared-dashboards
[10]: /fr/account_management/org_settings/ip_allowlist/
[11]: /fr/account_management/scim/
[12]: /fr/account_management/organization_groups/