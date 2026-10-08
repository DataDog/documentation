---
description: Modèles de mise en œuvre du contrôle d'accès en entreprise pour quatre
  archétypes organisationnels courants.
further_reading:
- link: /account_management/rbac/
  tag: Documentation
  text: Access Control (RBAC)
- link: /account_management/rbac/data_access
  tag: Documentation
  text: Data Access Control
- link: /account_management/rbac/granular_access
  tag: Documentation
  text: Contrôle d'accès granulaire
- link: /getting_started/teams/
  tag: Documentation
  text: Démarrer avec Teams
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
  tag: Documentation
  text: Fournisseur Terraform Datadog
title: Exemples de mises en œuvre
---
## Présentation {#overview}

Ces quatre modèles de mise en œuvre montrent à quoi ressemble une stratégie d'accès entièrement implémentée, y compris les mécanismes utilisés, la structure des rôles et des équipes, et la manière dont les couches fonctionnent ensemble. Ils représentent des archétypes d'organisation courants, et non des entreprises spécifiques. Utilisez-les comme point de départ pour votre propre mise en œuvre.

## Choisissez votre modèle {#choose-your-template}

Utilisez les questions suivantes pour identifier les modèles les plus pertinents pour vous :

| Question | Si oui, consultez... |
| :---- | :---- |
| **Avez-vous des données réglementées qui doivent être invisibles pour certains groupes d'utilisateurs ?** | [Modèle 1 (Financier)](#template-1-large-financial-institution)<br>[Modèle 2 (Multi-BU réglementé)](#template-2-regulated-enterprise-with-multiple-business-units) |
| **Avez-vous des limites de conformité strictes nécessitant une isolation complète des données entre les divisions ?** | [Modèle 2 (Multi-BU réglementé)](#template-2-regulated-enterprise-with-multiple-business-units) |
| **Avez-vous un volume élevé de clés d'API et de nombreux pipelines d'automatisation ?** | [Modèle 3 (Grande entreprise technologique)](#template-3-large-technology-company) |
| **Gérez-vous plusieurs locataires internes ou clients sur une plateforme partagée ?** | [Modèle 4 (Fournisseur de plateforme)](#template-4-government-agency--platform-provider) |
| **Gérez-vous la configuration à l'aide de Terraform ou d'outils IaC similaires ?** | [Modèle 4 (Fournisseur de plateforme)](#template-4-government-agency--platform-provider) |
| **Gérez-vous de nombreuses organisations et avez-vous besoin de contrôles d'accès cohérents entre elles ?** | [Modèle 4 (Fournisseur de plateforme)](#template-4-government-agency--platform-provider) |

## Modèle 1 : Grande institution financière {#template-1-large-financial-institution}

### Profil {#profile}

Une entreprise mondiale de services financiers comptant 15 000 utilisateurs Datadog répartis dans les divisions banque de détail, banque d'investissement, gestion de patrimoine et assurance. Fonctionne dans une seule organisation Datadog avec 150 équipes mappées aux secteurs d'activité. Soumis aux normes SOC 2, PCI DSS et à plusieurs régulateurs financiers nationaux. Utilise Okta pour l'identité avec le provisionnement SCIM.

### Stratégie d'accès {#access-strategy}

| Couche | Implémentation |
| :---- | :---- |
| **Structure de l'organisation** | Organisation unique avec Data Access Control pour la ségrégation des données entre les divisions, tout en préservant les capacités d'investigation des incidents inter-divisions. |
| **Rôles personnalisés** | 5 rôles : Lecture seule (auditeurs et conformité), Utilisateur standard (la plupart des ingénieurs), Administrateur de plateforme, Utilisateur restreint (prestataires) et Salle de marché (accès élevé aux logs pour les données réglementées). Mises à jour automatiques configurées pour suivre le modèle de rôle standard. |
| **Identité** | SCIM depuis Okta. Chaque division possède son propre groupe Okta associé à une équipe Datadog. L'attribution des rôles est basée sur l'appartenance au groupe Okta, avec des revues d'accès trimestrielles pilotées par la conformité. |
| **Restrictions de données** | Jeux de données Data Access Control pour les données de trading (`data_sensitivity:trading`) restreints aux équipes Trading et Compliance. Jeu de données distinct pour les données marquées PII (`data_sensitivity:pii`) restreint à l'équipe Privacy. Les données ne figurant pas dans un jeu de données restreint restent **Non restreintes** (par défaut). |
| **Protections des actifs** | Tous les monitors de production et dashboards opérationnels sont restreints à l'équipe propriétaire pour l'accès en modification. Une équipe « Gouvernance de la plateforme » dispose d'un accès de modification prioritaire sur tous les actifs. |
| **Clés et jetons** | Comptes de service pour chaque pipeline CI/CD. Clés d'application limitées à des endpoints d'API spécifiques. Clés d'API par équipe. Cadence de rotation de 90 jours pour les clés d'application, appliquée via Terraform. |
| **Audit** | Audit Trail activé avec alertes sur les changements de rôle, la création de clés et les modifications de politique Data Access Control. Rapports d'examen trimestriel des accès générés pour les régulateurs. |

### Point clé {#key-takeaway}

Data Access Control permet à cette organisation de conserver une organisation unique pour l'observabilité connectée tout en maintenant des limites de données strictes entre les divisions. Le facteur de succès critique est un marquage cohérent lors de l'ingestion. Sans tags `data_sensitivity` fiables, Data Access Control ne peut pas appliquer les limites.

## Modèle 2 : Entreprise réglementée avec plusieurs unités commerciales {#template-2-regulated-enterprise-with-multiple-business-units}

### Profil {#profile-1}

Un conglomérat multinational avec 8 000 utilisateurs Datadog répartis dans 5 divisions majeures : aérospatiale et défense, électronique commerciale, santé, transport et énergie. Chaque division a son propre régime de conformité (ITAR pour la défense, HIPAA pour la santé, SOX pour l'énergie). Opère sur 12 organisations Datadog organisées sous une organisation parente. Utilise Entra ID (Azure AD) avec mappage SAML et SCIM supplémentaire.

### Stratégie d'accès {#access-strategy-1}

| Couche | Implémentation |
| :---- | :---- |
| **Structure de l'organisation** | 12 organisations enfants. La division défense nécessite une isolation complète des données, même pour les métadonnées, ce qui justifie une organisation distincte. Les autres divisions partagent des organisations par région et par fonction commerciale. Organisation parente utilisée pour la facturation centralisée et les dashboards exécutifs via la visibilité inter-organisationnelle. |
| **Rôles personnalisés** | Chaque organisation enfant dispose de 4 à 5 rôles personnalisés adaptés à ses exigences de conformité. L'organisation de défense utilise un rôle personnalisé minimal qui supprime toutes les autorisations d'écriture pour le personnel non ingénieur. L'organisation de santé dispose d'un rôle d'analyste HIPAA dédié avec accès aux données marquées PHI. |
| **Identité** | SAML depuis Entra ID, avec des politiques d'accès conditionnel par division. La division de défense exige une authentification multifacteur (MFA) et une attestation d'appareil géré. SCIM pour l'appartenance aux équipes. |
| **Restrictions de données** | L'organisation de défense utilise le paramètre **Restreint** pour les données ne figurant pas dans les jeux de données restreints. Toutes les données sont masquées par défaut et les utilisateurs se voient explicitement accorder l'accès à des jeux de données spécifiques. L'organisation de santé utilise Data Access Control avec le paramètre par défaut **Unrestricted** et des jeux de données restreints pour la télémétrie marquée PHI. Les divisions commerciales utilisent Data Access Control avec le paramètre par défaut **Unrestricted** pour la ségrégation des données basée sur le service. |
| **Protections des actifs** | Chaque organisation gère ses propres politiques d'accès aux actifs. Les monitors de production dans les organisations de défense et de santé sont limités à la modification par l'équipe propriétaire ainsi que par l'équipe de sécurité de la division. |
| **Inter-organisation** | L'organisation parente a activé la visibilité inter-organisation pour les dashboards exécutifs affichant l'état du système dans toutes les divisions. Groupes d'organisation (préversion) pour centraliser les politiques dans les organisations enfants. |
| **Clés et jetons** | Toutes les clés sont gérées via Terraform. L'organisation de défense utilise un pipeline Terraform renforcé avec des portes d'approbation pour tout changement de clé ou de rôle. Comptes de service utilisés exclusivement. Aucune clé d'application détenue par un humain. |

### Point clé {#key-takeaway-1}

Le recours à plusieurs organisations est justifié ici en raison de limites de conformité strictes. Les réglementations créent des exigences strictes en matière d'isolement et de résidence des données. L'utilisation par la division de défense du paramètre **Restreint** reflète l'exigence de refus par défaut de son environnement réglementaire. La visibilité inter-organisation permet de maintenir des rapports centralisés fonctionnels sans compromettre l'isolement.

## Modèle 3 : Grande entreprise technologique {#template-3-large-technology-company}

### Profil {#profile-2}

Une entreprise technologique mondiale avec 12 000 utilisateurs Datadog exploitant une plateforme de commerce et de traitement des paiements à grande échelle. Fonctionne dans une organisation unique représentant 20 gammes de produits majeures. Utilise un système d'identité propriétaire intégré à l'API Teams et à Terraform. Utilisation intensive de l'API avec plus de 500 clés d'application actives et 200 comptes de service.

### Stratégie d'accès {#access-strategy-2}

| Couche | Implémentation |
| :---- | :---- |
| **Structure de l'organisation** | Organisation unique représentant 20 gammes de produits majeures. Data Access Control et Teams fournissent des limites internes au sein de chaque organisation. Deux organisations supplémentaires utilisées pour les environnements de bac à sable et hors production. |
| **Rôles personnalisés** | 5 rôles personnalisés, standardisés à l'échelle de l'entreprise via des modules Terraform : Lecture seule, Standard, Plateforme, Administrateur d'organisation, Prestataire. Mises à jour automatiques activées pour les rôles autres que Prestataire. |
| **Identité** | IdP propriétaire intégré à l'API Teams et à Terraform. L'appartenance aux équipes est synchronisée chaque nuit à partir du registre interne de propriété des services. L'attribution des rôles est gérée via un module Terraform qui lit les données à partir de l'annuaire central des employés. |
| **Restrictions de données** | Data Access Control standard séparant les gammes de produits sur les types de télémétrie sensibles (logs, RUM, coûts cloud). Des jeux de données restreints sont créés en fonction du service, avec un accès inter-équipes accordé par le biais d'attributions explicites de jeux de données. Les utilisateurs prestataires sont limités à un ensemble restreint de services définis dans le périmètre de leur contrat. |
| **Protections des actifs** | Tous les monitors de production sont restreints à l'équipe propriétaire. Les dashboards sont largement consultables mais leur modification est restreinte. Une équipe « Platform SRE » dispose d'un accès de dérogation pour la réponse aux incidents. |
| **Clés et jetons** | Une clé d'API par équipe. Comptes de service pour toute automatisation. Clés d'application limitées à des opérations API spécifiques. Audits trimestriels pour identifier et révoquer les clés inutilisées. |

### Point clé {#key-takeaway-2}

Les clés d'API par équipe et les audits trimestriels sont essentiels pour gérer la gouvernance à cette échelle. Data Access Control, Teams et l'accès granulaire fournissent des limites au sein de l'organisation.

## Modèle 4 : Agence gouvernementale / Fournisseur de plateforme {#template-4-government-agency-platform-provider}

### Profil {#profile-3}

Une grande agence gouvernementale ou un fournisseur de services gérés avec 5 000 utilisateurs Datadog exploitant une plateforme d'observabilité partagée pour environ 200 agences, départements ou clients locataires internes. Exploite 3 organisations Datadog segmentées par environnement (production, pré-production, développement), mais chaque organisation contient des données provenant de nombreux locataires distincts qui doivent être isolés les uns des autres. Utilise Entra ID intégré via une CMDB ServiceNow, avec Terraform gérant toute la configuration.

### Stratégie d'accès {#access-strategy-3}

| Couche | Implémentation |
| :---- | :---- |
| **Structure de l'organisation** | 3 organisations par environnement, et non par locataire. La segmentation au sein de l'organisation via Teams et Data Access Control assure l'isolation des locataires. Cela évite la charge de gestion de plus de 200 organisations distinctes tout en maintenant des limites strictes. |
| **Rôles personnalisés** | 5 rôles : Lecture seule (auditeurs), Utilisateur standard, Administrateur de plateforme, Administrateur d'organisation, Observateur restreint (pour les parties prenantes ayant besoin d'une visibilité limitée sur les données d'un seul locataire). Le rôle d'administrateur de la plateforme inclut une dérogation qui contourne les restrictions d'actifs basées sur les équipes. |
| **Identité** | Chaîne d'identité complexe : Entra ID synchronise les groupes d'utilisateurs vers la CMDB ServiceNow. Les enregistrements CMDB déterminent l'organisation, l'équipe et le rôle Datadog de l'utilisateur. Les modifications transitent par les workflows d'approbation ServiceNow avant d'être appliquées à Datadog avec Terraform. Le mappage d'attributs SAML fournit le provisionnement de connexion initial. |
| **Restrictions de données** | Data Access Control standard avec des jeux de données par agence locataire, définis par le tag `agency`. L'équipe de chaque agence n'a accès qu'à ses propres données. L'équipe de la plateforme a accès aux données au niveau de l'infrastructure pour tous les locataires pour la planification de la capacité et la réponse aux incidents. |
| **Protections des actifs** | Les monitors et dashboards de chaque agence sont restreints à leur équipe pour l'accès en modification. Les monitors d'infrastructure partagée critiques (réseau, DNS, calcul partagé) sont restreints à l'équipe de la plateforme. Une équipe de dérogation administrative (« Gouvernance de la plateforme ») est incluse dans toutes les listes d'accès aux actifs pour éviter tout verrouillage. |
| **Clés et jetons** | Toutes les clés d'API et tous les comptes de service sont gérés via Terraform avec une porte d'approbation ServiceNow. Une clé d'API par agence pour la soumission de données. Comptes de service pour les pipelines d'automatisation partagés. Aucune clé d'application humaine n'est autorisée. Tout accès API passe par des comptes de service avec des SAT. |
| **Gestion sous forme de code** | Tous les rôles, équipes, jeux de données Data Access Control, politiques d'accès granulaires et clés sont définis dans Terraform. Les modifications passent par une revue de code et une approbation ServiceNow avant d'être appliquées. Ceci est essentiel à cette échelle : une configuration manuelle à travers 200 frontières de locataires serait insoutenable. |

### Point clé {#key-takeaway-3}

La segmentation au sein de l'organisation (Teams + Data Access Control) peut remplacer l'isolation multi-organisationnelle lorsque les limites du locataire sont organisationnelles et non réglementaires. La chaîne d'identité pilotée par la CMDB et la configuration gérée par Terraform sont nécessaires à cette échelle. L'équipe de dérogation administrative est un filet de sécurité essentiel qui doit être mise en place avant l'application de toute restriction aux actifs.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}