---
description: Synchronisez votre répertoire d'utilisateurs dans Cloud SIEM pour ajouter
  un contexte d'identité aux signaux, aux risques et aux enquêtes.
further_reading:
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/okta/
  tag: Documentation
  text: Configurez le pack d'entités Okta
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/google_workspace/
  tag: Documentation
  text: Configurez le pack d'entités Google Workspace
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/microsoft_entra_id/
  tag: Documentation
  text: Configurez le Microsoft Entra ID Entity Pack
- link: /security/cloud_siem/triage_and_investigate/user_inventory/
  tag: Documentation
  text: Parcourir les utilisateurs synchronisés dans l'Inventaire des utilisateurs
- link: /security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/
  tag: Documentation
  text: Explorer les entités et l'évaluation des risques avec les Risques d'entité
- link: /security/cloud_siem/ingest_and_enrich/content_packs/
  tag: Documentation
  text: En savoir plus sur Cloud SIEM Content Packs
- link: /security/cloud_siem/triage_and_investigate/investigator/
  tag: Documentation
  text: En savoir plus sur l'Investigator
- link: /account_management/rbac/permissions/
  tag: Documentation
  text: Examinez les autorisations de rôle Datadog
title: Entity Packs
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">Les packs d'entités ne sont pas disponibles pour le site Datadog US1-FED.</div>
{{< /site-region >}}

## Présentation {#overview}

Un Entity Pack est un type de [Cloud SIEM Content Pack][1] qui synchronise votre répertoire d'utilisateurs dans Cloud SIEM.
- **Content Packs** apportent du contenu de sécurité basé sur les logs, tel que des règles de détection et des dashboards.
- **Entity Packs** apportent les enregistrements d'identité liés à cette activité, permettant ainsi à Cloud SIEM de vous indiquer *qui* concerne un signal, et pas seulement *ce qui* s'est passé.

Lorsqu'un Entity Pack est actif, Cloud SIEM corrèle les utilisateurs du répertoire et leurs attributs avec vos logs et signaux de sécurité. Chaque Entity Pack comprend :

- **Automated synchronization** : Cloud SIEM synchronise les utilisateurs et leurs attributs depuis votre fournisseur d'identité afin qu'ils restent à jour.
- **[User Inventory][2]** : Parcourez, recherchez et filtrez les utilisateurs synchronisés avec Cloud SIEM. Affichez les attributs d'un utilisateur, notamment le nom d'affichage, l'ID principal, le type d'utilisateur et le statut du compte. Examinez tous les signaux, risques et logs associés à vos utilisateurs.
- **Pastille d'utilisateur dans les signaux** : Contexte d'identité attaché directement à un signal de sécurité, afin que vous puissiez voir de quel utilisateur il s'agit pendant que vous le triez.
- **Cumul des risques par utilisateur dans [Entity Risks][8]** : Scores de risque agrégés par utilisateur, vous permettant de voir le risque total d'un utilisateur sur l'ensemble des signaux plutôt que de les examiner un par un.

<div class="alert alert-info">Les Entity Packs synchronisent les données du répertoire d'utilisateurs, y compris des données personnelles telles que les noms et les adresses e-mail. Examinez les exigences relatives à la confidentialité de votre organisation avant de connecter un répertoire.</div>

## Entity Packs disponibles {#available-entity-packs}

Cloud SIEM prend en charge les Entity Packs suivants :

| Entity Pack | Répertoire synchronisé | Type d'identifiant |
|---|---|---|
| [Okta Identity][3] | Utilisateurs Okta et leurs attributs | Domaine Okta et jeton d'API |
| [Google Workspace Identity][4] | Utilisateurs Google Workspace et leurs attributs | Fichier de clé JSON du compte de service |
| [Microsoft Entra ID][5] | Utilisateurs Microsoft Entra ID et leurs attributs | Enregistrement d'application Azure |

Pour les trouver dans Datadog, accédez à **Cloud SIEM** > [**Content Packs**][6]. Ensuite, filtrez par Entity Packs, soit en recherchant `type:entityPack`, soit en cliquant sur le filtre **Entity Pack**.

## Prérequis {#prerequisites}

### Autorisations {#permissions}

Les Entity Packs utilisent les permissions suivantes : Un utilisateur disposant du [rôle Datadog Admin][7] peut les accorder à un compte utilisateur.

| Permission | Ce qu'elle autorise |
|---|---|
| **SIEM Entities Notification** | Les utilisateurs disposant de cette autorisation peuvent modifier les notifications d'Entity Risks. |
| **SIEM Entities Read** |  : Affichez les utilisateurs synchronisés dans le User Inventory, consultez la pastille d'utilisateur sur les signaux et dans Entity Risks, et ouvrez un panneau latéral Entity Pack. |
| **SIEM Entities Admin** |  : Tout ce que **SIEM Entities Read** permet, plus connecter un répertoire utilisateur, ajouter et supprimer des identifiants, et activer ou désactiver la synchronisation. |
| **Integrations Manage** |  : Requis uniquement pour le Microsoft Entra ID Entity Pack, pour configurer l'abonnement Azure et la collecte de ressources. |

Chaque utilisateur travaillant avec le contexte d'identité a besoin de **SIEM Entities Read** ou de **SIEM Entities Admin**. Si un utilisateur ne possède pas l'une de ces permissions :

- Le User Inventory est vide, même lorsqu'un Entity Pack est actif et synchronisé.
- La pastille d'utilisateur n'apparaît pas sur les signaux ni dans Entity Risks.
- Les panneaux latéraux Entity Pack ne s'ouvrent pas depuis l'interface Content Packs.

<div class="alert alert-info">Accordez <strong>SIEM Entities Read</strong> à vos analystes dans le cadre du déploiement d'un Entity Pack. Sans cette permission, même si le répertoire se synchronise correctement, les analystes qui ne disposent pas de cette permission ne peuvent pas voir le contexte d'identité qu'il fournit. Si le User Inventory est vide, vérifiez les permissions avant de dépanner la synchronisation.</div>

### Accès au fournisseur d'accès {#identity-provider-access}

Pour configurer un Entity Pack, vous devez également disposer d'un accès administratif au fournisseur d'identité que vous souhaitez connecter, suffisant pour créer l'identifiant requis par l'Entity Pack. Chaque Entity Pack utilise un type d'identifiant différent :

- Okta Identity requiert un domaine Okta et un jeton d'API.
- Google Workspace Identity requiert le fichier de clé JSON du compte de service Google, votre domaine et une adresse e-mail d'administrateur Workspace.
- Microsoft Entra ID requiert un enregistrement d'application Azure. Vous pouvez en créer une avec le Quickstart script fourni ou avec Terraform, ou connecter une app registration qui dispose déjà des permissions requises.

Pour connaître les permissions et périmètres exacts côté fournisseur dont chaque identifiant a besoin, consultez la page de configuration de cet Entity Pack.

### Intégrations de logs {#log-integrations}

Un Entity Pack n'exige pas l'intégration de logs correspondante, tout comme le Content Pack correspondant n'exige pas l'Entity Pack. Vous pouvez synchroniser votre répertoire utilisateur Okta avec l'Okta Identity Entity Pack sans envoyer de Okta logs à Datadog.

Les deux fonctionnent toujours mieux ensemble : l'Entity Pack fournit le contexte d'identité, et le Content Pack basé sur des logs fournit l'activité à laquelle Cloud SIEM attache ce contexte. Configurez-les tous les deux pour obtenir le contexte d'identité sur les signaux générés à partir des logs d'un fournisseur.

## États des Entity Packs {#entity-pack-states}

Comme les autres Content Packs, chaque Entity Pack apparaît sous forme de tuile dans l'interface Content Packs et possède deux états. Ouvrir le panneau latéral d'une tuile nécessite l'autorisation **SIEM Entities Read** ou **SIEM Entities Admin**.

### Available {#available}

Un Entity Pack que vous n'avez pas encore connecté est marqué **Available**. Son panneau latéral l indique ce que l'Entity Pack fournit une fois activé, et vous permet de connecter votre répertoire utilisateur. Cliquez sur **Add Credentials** (ou **Add Account** pour Microsoft Entra ID) pour commencer la configuration. La connexion d'un user directory nécessite l'autorisation **SIEM Entities Admin**.

### Active {#active}

Après avoir connecté un identifiant et après validation par Datadog, l'Entity Pack est marqué **Active**. Son panneau latéral affiche l'état de santé de l'Entity Pack :

- **Credentials** : Chaque compte connecté, avec son domaine, son statut de validation, son état activé/désactivé, l'heure de dernière mise à jour, son statut de synchronisation, l'heure de dernière synchronisation et la durée de la dernière synchronisation. Vous pouvez ajouter des comptes supplémentaires, ou activer et désactiver la synchronisation pour un compte individuel.
- **Key Metrics** : Un dashboard interactif affichant les utilisateurs synchronisés, les comptes par identifiant, l'historique de synchronisation par identifiant, et la durée de synchronisation par identifiant.
- **Entities** : Les utilisateurs synchronisés par cet Entity Pack, avec nom d'affichage, ID principal, type d'utilisateur (par exemple, `human` ou `service_account`), et statut du compte. Cliquez sur **View in User Inventory** pour voir l'inventaire complet.

Utilisez les sections **Key Metrics** et **Credentials** pour confirmer qu'une synchronisation est à jour et que l'identifiant est toujours valide.

## Configurez un Entity Pack {#set-up-an-entity-pack}

Les étapes de configuration diffèrent selon le fournisseur d'identité. Suivez le guide pour le répertoire que vous connectez :

- [Okta Identity Entity Pack][3]
- [Google Workspace Identity Entity Pack][4]
- [Microsoft Entra ID Entity Pack][5]

Chaque guide vous accompagne dans la création de l'identifiant auprès de votre fournisseur d'identité, dans son ajout dans Datadog et dans le test de la connexion.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/cloud_siem/ingest_and_enrich/content_packs/
[2]: /fr/security/cloud_siem/triage_and_investigate/user_inventory/
[3]: /fr/security/cloud_siem/ingest_and_enrich/entity_packs/okta/
[4]: /fr/security/cloud_siem/ingest_and_enrich/entity_packs/google_workspace/
[5]: /fr/security/cloud_siem/ingest_and_enrich/entity_packs/microsoft_entra_id/
[6]: https://app.datadoghq.com/security/siem/content-packs
[7]: /fr/account_management/rbac/
[8]: /fr/security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/