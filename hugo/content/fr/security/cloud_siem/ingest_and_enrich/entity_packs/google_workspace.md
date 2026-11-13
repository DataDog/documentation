---
description: Synchronisez votre répertoire d'utilisateurs Google Workspace dans Cloud
  SIEM pour ajouter un contexte d'identité aux signaux, aux risques et aux enquêtes.
further_reading:
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/
  tag: Documentation
  text: En savoir plus sur les packs d'entités
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/okta/
  tag: Documentation
  text: Configurez le pack d'entités Okta
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/microsoft_entra_id/
  tag: Documentation
  text: Configurez le Microsoft Entra ID Entity Pack
- link: /security/cloud_siem/triage_and_investigate/user_inventory/
  tag: Documentation
  text: Parcourir les utilisateurs synchronisés dans l'Inventaire des utilisateurs
- link: /security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/
  tag: Documentation
  text: Explorer les entités et l'évaluation des risques avec les Risques d'entité
- link: /integrations/gsuite/
  tag: Documentation
  text: Collectez les logs Google Workspace avec l'intégration Google Workspace.
- link: https://www.datadoghq.com/blog/google-workspace-detections/
  tag: Blog
  text: Détectez les activités malveillantes dans les applications Google Workspace
    avec Datadog Cloud SIEM
title: Google Workspace Identity Entity Pack
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">Les packs d'entités ne sont pas disponibles pour le site Datadog US1-FED.</div>
{{< /site-region >}}

## Présentation {#overview}

Le pack d'entités Google Workspace synchronise votre répertoire d'utilisateurs Google Workspace dans Cloud SIEM. Une fois connecté, Cloud SIEM utilise ce répertoire pour :

- Remplissez l'[Inventaire des utilisateurs][8] avec vos utilisateurs Google Workspace.
- Joignez une pastille d'utilisateur aux signaux afin que vous puissiez voir qui est à l'origine de l'activité.
- Évaluez le risque pour un utilisateur sur l'ensemble de ses comptes dans [Entity Risks][1].


Pour en savoir plus sur ce que proposent les packs d'entités en général et sur les autorisations qu'ils requièrent, consultez [Packs d'entités][10].

Datadog lit votre répertoire via l'[API Google Admin SDK Directory][2] en utilisant un compte de service Google Cloud que vous créez et auquel vous accordez une délégation à l'échelle du domaine. Datadog demande un accès en lecture seule aux enregistrements des utilisateurs; il n'écrit pas dans votre répertoire.

## Prérequis {#prerequisites}

Deux identités Google différentes sont impliquées dans cette configuration, et toutes deux sont communément appelées « compte de service » dans le langage courant. Elles ne sont pas interchangeables :

| Identité | Ce que c'est | Où vous l'utilisez |
| --- | --- | --- |
| **Compte de service Google Cloud** | L'entité Google Cloud avec laquelle Datadog s'authentifie. | Téléchargez son fichier de clé JSON vers Datadog. |
| **Utilisateur administrateur Google Workspace** | Un utilisateur Google Workspace avec des privilèges d'administrateur que le compte de service usurpe lors de l'appel de l'API Directory. | Saisissez-le dans le champ **Workspace Admin email**. |

Le champ **Workspace Admin email** requiert l'utilisateur administrateur Google Workspace, et non le compte de service. Si l'adresse que vous êtes sur le point de saisir se termine par `@<project-id>.iam.gserviceaccount.com`, il s'agit de l'adresse e-mail du compte de service et la connexion échouera.

Avant de commencer, assurez-vous de disposer des éléments suivants :

- Un projet Google Cloud dans lequel vous pouvez créer un compte de service et activer des API.
- **Privilèges Super Admin** dans le tenant Google Workspace que vous souhaitez synchroniser, ou un Super Admin capable d'accorder une délégation à l'échelle du domaine en votre nom.
- L'autorisation **SIEM Entities Admin** dans Datadog, qui est requise pour connecter un répertoire : Les analystes qui ont besoin de voir le contexte d'identité qu'il fournit ont besoin d'au moins **SIEM Entities Read**. Consultez [Entity Packs][10].
- Au moins un utilisateur dans le répertoire Google Workspace. Un répertoire vide produit un inventaire des utilisateurs vide.

Datadog recommande d'usurper l'identité d'un compte administrateur partagé au nom générique, tel que `datadog-integration@example.com`, plutôt que celle du compte d'un individu. Si l'intégration dépend du compte d'une personne nommée et que cette personne quitte l'organisation ou perd ses privilèges d'administrateur, la synchronisation cesse de fonctionner et la cause est difficile à tracer.

## Configuration {#setup}

Vous pouvez configurer un ensemble d'identifiants par domaine Google Workspace. Pour synchroniser plus d'un domaine, consultez [Connecter des domaines supplémentaires](#connect-additional-domains).

### Créez un compte de service dans Google Cloud {#create-a-service-account-in-google-cloud}

1. Dans la console Google Cloud, sélectionnez le projet dans lequel vous souhaitez créer le compte de service.
1. Suivez la section **Créer un compte de service** des [instructions relatives aux comptes de service][4] de Google.
1. Créez une clé JSON pour le compte de service et enregistrez le fichier téléchargé. Vous téléchargerez ce fichier vers Datadog lors d'une étape ultérieure.

Le compte de service n'a besoin d'aucun rôle IAM Google Cloud. L'accès à votre répertoire provient de l'autorisation de délégation à l'échelle du domaine dans la console d'administration Google Workspace, et non de Google Cloud IAM.

### Activez l'API Admin SDK {#enable-the-admin-sdk-api}

1. Dans la console Google Cloud, confirmez que le projet propriétaire de votre compte de service est sélectionné.
1. Accédez à **APIs & Services** > **Library**.
1. Recherchez et ouvrez **Admin SDK API** (`admin.googleapis.com`).
1. Cliquez sur **Enable**.

### Accordez une délégation à l'échelle du domaine {#grant-domain-wide-delegation}

1. Dans la console Google Cloud, ouvrez votre compte de service, cliquez sur **API**, puis sous **Show advanced settings**, copiez le **Client ID** du compte de service. Il s'agit de la même valeur numérique que celle indiquée sous **Unique ID** dans l'onglet **Details** du compte de service.
1. Dans la console d'administration Google Workspace, accédez à **Security** > **Access and data control** > **API controls**.
1. Sous **Domain-wide delegation**, cliquez sur **Manage Domain Wide Delegation**.
1. Cliquez sur **Add new**.
1. Collez l'**ID client** du compte de service dans le champ **Client ID**.
1. Dans **OAuth scopes**, saisissez le périmètre suivant :
   ```text
   https://www.googleapis.com/auth/admin.directory.user.readonly
   ```
1. Cliquez sur **Authorize**.
1. Pour confirmer l'octroi, recherchez le nouvel **ID client** dans la liste, cliquez sur **View details** et vérifiez que le périmètre est répertorié.

Pour plus de détails, consultez [Déléguer une autorité à l'échelle du domaine à un compte de service][5] de Google.

### Ajoutez des identifiants dans Datadog {#add-credentials-in-datadog}

1. Dans Datadog, accédez à **Cloud SIEM** > [**Content Packs**][6].
1. Filtrez par **Entity Pack**, puis ouvrez l'Entity Pack **Google Workspace Identity**. Il est marqué **AVAILABLE** jusqu'à ce que vous connectiez un répertoire.
1. Cliquez sur **Add Credentials**.
1. Dans la boîte de dialogue **Add credentials and activate content pack**, cliquez sur **Browse files** et sélectionnez le fichier de clé JSON du compte de service que vous avez téléchargé. Datadog extrait les valeurs `client_email`, `private_key` et `project_id` du fichier.
1. Remplissez les champs restants :
   | Champ | Description |
   | --- | --- |
   | **Name** | Un nom d'affichage pour cet ensemble d'identifiants, par exemple `Production credentials`. Utilisez un nom qui identifie le domaine si vous prévoyez d'en connecter plusieurs. |
   | **Domain** | Le domaine Google Workspace à synchroniser, par exemple `example.com`. |
   | **Workspace Admin email** | L'utilisateur administrateur Google Workspace que le compte de service usurpe, par exemple `datadog-integration@example.com`. N'utilisez pas l'adresse e-mail du compte de service. |
1. Cliquez sur **Test Connection**. Datadog valide les identifiants auprès de Google Workspace avant de les enregistrer. Si la validation échoue, consultez la section [Dépannage](#troubleshooting).
1. Une fois le test de connexion réussi, enregistrez les identifiants pour activer l'Entity Pack.

Datadog stocke la clé privée du compte de service de manière chiffrée et ne la renvoie pas dans l'interface Datadog ni dans les réponses de l'API.

## Vérifiez la synchronisation{#verify-the-sync}

La synchronisation est continue. La première synchronisation commence dès que Datadog valide l'identifiant, et chaque synchronisation suivante démarre lorsque la précédente se termine, vous n'avez donc jamais à planifier ou à déclencher une synchronisation vous-même. Un **Dernière synchronisation** indiquant un moment bien plus ancien que d'habitude pour votre compte mérite d'être examiné.

Une fois que Datadog a validé un identifiant, le pack d'entités est marqué **ACTIF**. Depuis **Cloud SIEM** > [**Content Packs**][6], ouvrez la tuile **Google Workspace Identity** pour afficher son panneau latéral, puis vérifiez les éléments suivants :

### Identifiants {#credentials}

La section **Identifiants** répertorie chaque compte connecté. Développez un compte pour voir :

| Champ | Ce qu'il vous indique |
| --- | --- |
| **Domaine** | Le domaine Google Workspace que ce compte synchronise. |
| **Statut** | Indique si la synchronisation est activée ou désactivée pour ce compte. Utilisez le bouton bascule pour le modifier, ou le menu de débordement pour supprimer l'identifiant. |
| **Dernière mise à jour** | Date à laquelle l'identifiant lui-même a été modifié pour la dernière fois. |
| **État de la synchronisation** | Si la synchronisation la plus récente a réussi ; par exemple, `Synced`. |
| **Dernière synchronisation** | Il y a combien de temps la synchronisation la plus récente a été effectuée. |
| **Durée de la dernière synchronisation** | Combien de temps cette synchronisation a pris. |

Chaque compte comporte également un badge de validation :

| Badge | Signification|
| --- | --- |
| **Valide** | Datadog peut s'authentifier auprès de Google Workspace avec ces identifiants. |
| **Invalide** | Datadog ne peut pas s'authentifier. Voir [Dépannage](#troubleshooting). |

### Métriques clés {#key-metrics}

La section **Métriques clés** affiche quatre widgets :

- **Utilisateurs synchronisés** : le nombre d'utilisateurs dont les attributs ont été mis à jour par une synchronisation. Cela mesure le taux de rotation du répertoire, et non la taille du répertoire, il est donc normalement beaucoup plus petit que votre nombre total d'utilisateurs.
- **Utilisateurs par identifiant** : le même nombre d'utilisateurs mis à jour, ventilé par compte connecté.
- **Historique de synchronisation par identifiant** : synchronisations terminées au fil du temps. Les lacunes indiquent des synchronisations ayant échoué ou ayant été ignorées.
- **Durée de synchronisation par identifiants** : combien de temps chaque synchronisation a pris, en millisecondes. Les pics isolés sont normaux ; une augmentation soutenue peut indiquer un répertoire en pleine croissance ou une limitation de l'API du côté de Google.

Les widgets par identifiants sont regroupés par `credential_name`, une forme normalisée du **Nom** que vous saisissez. Par exemple, `Production credentials` devient `production_credentials`.

### Entités {#entities}

La section **Entités** répertorie les utilisateurs synchronisés par ce pack d'entités, avec le **Nom d'affichage**, l'**ID principal**, le **Type d'utilisateur** (par exemple `human` ou `service_account`) et le **Statut du compte**.

Utilisez le nombre d'entités, et non **Utilisateurs synchronisés**, lorsque vous souhaitez savoir combien d'utilisateurs ce pack d'entités a intégrés dans Cloud SIEM. Cliquez sur **Afficher dans l'inventaire des utilisateurs** pour voir l'[inventaire complet][9].

Pour confirmer que le contexte d'identité atteint vos signaux, ouvrez un signal attribué à un utilisateur synchronisé et vérifiez qu'une pastille d'utilisateur apparaît.

## Connecter des domaines supplémentaires {#connect-additional-domains}

Chaque ensemble d'identifiants synchronise un domaine Google Workspace. Une fois le pack d'entités **ACTIF**, utilisez **Ajouter un compte** dans la section **Identifiants** pour connecter chaque domaine supplémentaire.

Pour chaque domaine supplémentaire :

1. [Accordez la délégation à l'échelle du domaine](#grant-domain-wide-delegation) dans la console d'administration Google Workspace de ce locataire. Une autorisation de délégation ne s'applique qu'au locataire où vous la créez.
1. Dans le panneau latéral du pack d'entités, cliquez sur **Ajouter un compte** dans la section **Identifiants**.
1. Remplissez les mêmes champs que ceux décrits dans [Ajouter des identifiants dans Datadog](#add-credentials-in-datadog), puis cliquez sur **Test Connection**.

Lorsque vous gérez plus d'un domaine :

- Donnez à chaque compte un **Nom** qui identifie son domaine, afin que **Utilisateurs par identifiant**, **Historique de synchronisation par identifiant** et **Durée de synchronisation par identifiant** restent lisibles.
- Assurez-vous que l'**e-mail de l'administrateur Workspace** appartient au même domaine que la valeur **Domaine**. Une incohérence entraîne l'échec du test de connexion.

## Dépannage {#troubleshooting}

### Le test de connexion échoue {#the-connection-test-fails}

Examinez ces causes dans l'ordre :

| Cause | Comment confirmer | Correctif |
| --- | --- | --- |
| E-mail du compte de service saisi comme e-mail de l'administrateur | La valeur **E-mail de l'administrateur Workspace** se termine par `@<project-id>.iam.gserviceaccount.com` | Saisissez plutôt un utilisateur Google Workspace disposant de privilèges d'administrateur. |
| API Admin SDK non activée | Dans la console Google Cloud, **API et services** > **API et services activés** ne répertorie pas **API Admin SDK** | [Activez l'API Admin SDK](#enable-the-admin-sdk-api) dans le projet qui possède le compte de service. |
| Délégation à l'échelle du domaine non accordée | L'**ID client** du compte de service n'apparaît pas sur la page **Gérer la délégation à l'échelle du domaine** | [Accordez la délégation à l'échelle du domaine](#grant-domain-wide-delegation). |
| Périmètre OAuth incorrect ou manquant | Cliquez sur **View details** sur l'entrée de délégation ; `https://www.googleapis.com/auth/admin.directory.user.readonly` n'est pas répertorié | Modifiez l'entrée de délégation et ajoutez le périmètre exactement tel qu'il est écrit, sans caractères de fin. |
| L'utilisateur usurpé n'est pas un administrateur | L'utilisateur dans **E-mail de l'administrateur de l'espace de travail** n'a pas de rôle d'administrateur dans la console d'administration Google Workspace | Utilisez un compte avec des privilèges d'administrateur, ou attribuez-en un avec un accès en lecture aux utilisateurs. |
| Inadéquation de domaine | La valeur **Domaine** ne correspond pas au domaine de l'administrateur usurpé | Corrigez la valeur **Domaine**, ou usurpez un administrateur dans ce domaine. |
| Fichier de clé JSON incomplet ou erroné | Il manque `client_email`, `private_key` ou `project_id` dans le fichier téléchargé, ou `type` n'est pas `service_account` | Téléchargez à nouveau la clé JSON depuis le compte de service et téléchargez le fichier non modifié. |

Google note que les modifications de délégation peuvent prendre jusqu'à 24 heures pour prendre effet, bien qu'elles s'appliquent généralement plus rapidement. Si vous venez d'accorder une délégation ou d'ajouter un périmètre, attendez puis exécutez à nouveau **Test Connection**.

### Les identifiants fonctionnaient et sont maintenant invalides {#credentials-were-working-and-are-now-invalid}

Les causes les plus courantes sont des changements du côté de Google :

- L'administrateur usurpé a été suspendu, supprimé ou a perdu son rôle d'administrateur. C'est l'échec habituel lorsque l'intégration est liée au compte d'un individu plutôt qu'à un compte partagé.
- La clé JSON du compte de service a été renouvelée, désactivée ou supprimée. Créez une clé et téléchargez-la.
- Le compte de service lui-même a été supprimé, ou l'entrée de délégation à l'échelle du domaine a été supprimée.
- L'API Admin SDK a été désactivée dans le projet Google Cloud.

### La synchronisation réussit mais aucun utilisateur n'apparaît {#the-sync-succeeds-but-no-users-appear}

Confirmez que la valeur **Domaine** correspond au domaine dont vous attendez les utilisateurs. Un administrateur valide dans un domaine différent de celui que vous avez saisi peut produire un résultat vide.

### Aucune pastille d'utilisateur n'apparaît sur les signaux {#no-user-pill-appears-on-signals}

Le contexte d'identité est mis en correspondance avec les événements par adresse e-mail. Si un utilisateur synchronisé n'a pas de pastille sur son activité, confirmez que les logs de cette source renseignent le champ e-mail de l'utilisateur et que le pipeline OCSF de la source est actif. Voir [Open Cybersecurity Schema Framework][7].

Un pack d'entités ne nécessite pas l'intégration de logs ou le pack de contenu correspondant, et aucun des deux ne nécessite le pack d'entités. Si vous synchronisez l'annuaire mais ne voyez aucune activité Google Workspace à laquelle le rattacher, vous pourriez également avoir besoin de l'[intégration de logs Google Workspace][3].

Si vous avez toujours besoin d'aide, contactez le [support Datadog][8].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/
[2]: https://developers.google.com/workspace/admin/directory/v1/guides
[3]: /fr/integrations/gsuite/
[4]: https://developers.google.com/workspace/guides/create-credentials#service-account
[5]: https://developers.google.com/identity/protocols/oauth2/service-account#delegatingauthority
[6]: https://app.datadoghq.com/security/siem/content-packs
[7]: /fr/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/
[8]: /fr/help/
[9]: /fr/security/cloud_siem/triage_and_investigate/user_inventory/
[10]: /fr/security/cloud_siem/ingest_and_enrich/entity_packs/