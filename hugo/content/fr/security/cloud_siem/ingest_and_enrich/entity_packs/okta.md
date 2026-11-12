---
description: Synchronisez votre répertoire d'utilisateurs Okta dans Cloud SIEM pour
  ajouter un contexte d'identité aux signaux, aux risques et aux enquêtes.
further_reading:
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/
  tag: Documentation
  text: En savoir plus sur les packs d'entités
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
- link: /integrations/okta/
  tag: Documentation
  text: Collecter les logs Okta avec l'intégration Okta
title: Okta Identity Entity Pack
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">Les packs d'entités ne sont pas disponibles pour le site Datadog US1-FED.</div>
{{< /site-region >}}

## Présentation {#overview}

Le pack d'entités Okta synchronise votre répertoire d'utilisateurs Okta dans Cloud SIEM. Une fois connecté, Cloud SIEM utilise ce répertoire pour :

- Remplir l'[Inventaire des utilisateurs][8] avec vos utilisateurs Okta.
- Joignez une pastille d'utilisateur aux signaux afin que vous puissiez voir qui est à l'origine de l'activité.
- Évaluez le risque pour un utilisateur sur l'ensemble de ses comptes dans [Entity Risks][1].

Pour en savoir plus sur ce que proposent les packs d'entités en général et sur les autorisations qu'ils requièrent, consultez [Packs d'entités][10].

Datadog lit votre répertoire via l'[API Utilisateurs Okta][2], en s'authentifiant avec un jeton d'API Okta que vous créez. Un accès en lecture seule est tout ce qui est nécessaire. Datadog n'écrit jamais dans votre répertoire.

## Prérequis {#prerequisites}

La configuration nécessite trois valeurs : un **Nom**, votre **Domaine Okta** et un **jeton API**. Vous saisissez ces trois éléments dans le pack d'entités ; le jeton est créé dans Okta.

Avant de commencer, assurez-vous de disposer des éléments suivants :

- Un rôle d'administrateur Okta capable de créer un jeton API et de lire les utilisateurs. **Administrateur en lecture seule** suffit, et des rôles d'administrateur plus larges fonctionnent également. Consultez les [rôles et autorisations d'administrateur standard][5] d'Okta.
- L'autorisation **SIEM Entities Admin** dans Datadog, qui est requise pour connecter un répertoire : Les analystes qui ont besoin du contexte d'identité qu'il fournit ont besoin au minimum de **Lecture des entités SIEM**. Consultez [Entity Packs][10].

## Configuration {#setup}

Vous pouvez configurer un ensemble d'identifiants par organisation Okta. Pour en synchroniser plus d'un, consultez [Connecter des organisations Okta supplémentaires](#connect-additional-okta-orgs).

### Créer le jeton API {#create-the-api-token}

1. Dans la console d'administration Okta, accédez à **Security** > **API**.
1. Cliquez sur l'onglet **Tokens**, puis cliquez sur **Create token**.
1. Donnez au jeton un nom qui identifie Datadog comme consommateur ; par exemple, `datadog-cloud-siem`.
1. Dans **API calls made with this token must originate from**, sélectionnez **Any IP**. Pour restreindre le jeton aux adresses de Datadog à la place, consultez [Restrictions réseau](#network-restrictions).
1. Cliquez sur **Create token**, puis copiez immédiatement la valeur du jeton. Okta ne l'affiche qu'une seule fois et en stocke une empreinte par la suite.

Pour la procédure complète et les autres options de zone réseau, consultez [Gérer les jetons API Okta][4] d'Okta.

<div class="alert alert-info">Créez le jeton à partir d'un compte de service dédié, tel que <code>datadog-integration@example.com</code>, plutôt qu'à partir du compte d'une personne. Un jeton hérite des autorisations du compte qui l'a créé, et Okta rejette les jetons provenant de comptes ayant été désactivés. Si ce compte appartient à une personne qui quitte son rôle d'administrateur ou le perd, la synchronisation s'arrête et la cause est difficile à tracer.</div>

#### Expiration du jeton {#token-expiration}

Les jetons d'API Okta sont valides pendant 30 jours, et chaque requête API renouvelle le jeton. Un Entity Pack actif maintient donc son propre jeton en vie. Un jeton inutilisé pendant plus de 30 jours est révoqué de façon permanente et ne peut pas être rétabli.

#### Restrictions réseau {#network-restrictions}

Sélectionner **Any IP** est l'option la plus simple. Si votre organisation exige un jeton restreint, limitez-le à une zone IP Okta contenant les plages IP publiées de Datadog.

Datadog publie ces plages au format JSON sur un endpoint par site. Pour le site US1, cet endpoint est `https://ip-ranges.datadoghq.com/`. Utilisez celui qui correspond à votre propre site Datadog et actualisez votre zone chaque fois que les plages changent. La réponse inclut les champs `version` et `modified` que vous pouvez surveiller. Pour obtenir la liste complète des endpoints, consultez [IP Ranges][12].

Deux contraintes Okta s'appliquent si vous choisissez cette voie. Les jetons SSWS ne fonctionnent qu'avec des zones basées sur IP, et non dynamiques, et ils ne peuvent pas être utilisés avec des zones de liste de blocage.

#### Domaine Okta {#okta-domain}

Saisissez le host auquel vous vous connectez, sans schéma ni chemin (par exemple, `example.okta.com`).

### Ajoutez des identifiants dans Datadog {#add-credentials-in-datadog}

1. Dans Datadog, accédez à **Cloud SIEM** > [**Content Packs**][6].
1. Filtrez par **Pack d'entités**, puis ouvrez le **Pack d'entités Okta**. Il est marqué **AVAILABLE** jusqu'à ce que vous connectiez un répertoire.
1. Cliquez sur **Add Credentials**.
1. Dans la boîte de dialogue **Ajouter des identifiants et activer le pack de contenu**, remplissez les trois champs :
   | Champ | Description |
   | --- | --- |
   | **Nom** | Un nom d'affichage pour cet ensemble d'identifiants ; par exemple, `Production credentials`. Utilisez un nom qui identifie l'organisation si vous prévoyez d'en connecter plus d'une. |
   | **Domaine Okta** | L'organisation Okta à synchroniser ; par exemple, `example.okta.com`. Entrez uniquement le host, sans schéma ni chemin. |
   | **Jeton API** | La valeur du jeton que vous avez copiée depuis Okta. Collez la valeur seule, sans le préfixe `SSWS` utilisé dans les requêtes API brutes. |
1. Cliquez sur **Test Connection**. Datadog valide les identifiants auprès d'Okta avant de les enregistrer. Si la validation échoue, consultez la section [Dépannage](#troubleshooting).
1. Lorsque le test de connexion réussit, enregistrez les identifiants pour activer l'Entity Pack.

Datadog chiffre le jeton API au repos et ne le renvoie jamais dans l'interface ou dans les réponses API.

## Vérifiez la synchronisation{#verify-the-sync}

La synchronisation est continue. La première synchronisation démarre dès que Datadog valide l'identifiant, et chaque synchronisation suivante commence lorsque la précédente se termine, vous n'avez donc jamais à planifier ou à déclencher une synchronisation vous-même.

Cela fait de **Dernière synchronisation** un check d'état à part entière. Un compte sain est toujours synchronisé récemment, donc une heure de **Dernière synchronisation** qui cesse d'avancer signifie que quelque chose ne va pas.

Une fois que Datadog a validé un identifiant, le pack d'entités est marqué **ACTIF**. Ouvrez son panneau latéral dans Cloud SIEM et vérifiez les points suivants :

### Identifiants {#credentials}

La section **Identifiants** répertorie chaque compte connecté. Développez un compte pour voir :

| Champ | Ce qu'il vous indique |
| --- | --- |
| **Domaine** | L'organisation Okta que ce compte synchronise. |
| **État** | Indique si la synchronisation est **Activée** ou désactivée pour ce compte. Utilisez l'interrupteur pour le modifier. |
| **Dernière mise à jour** | Date à laquelle l'identifiant lui-même a été modifié pour la dernière fois. |
| **État de la synchronisation** | Si la synchronisation la plus récente a réussi ; par exemple, `Synced`. |
| **Dernière synchronisation** | Il y a combien de temps la synchronisation la plus récente a été effectuée. |
| **Durée de la dernière synchronisation** | Combien de temps cette synchronisation a pris. |

Chaque compte comporte également un badge de validation :

| Badge | Signification|
| --- | --- |
| **VALIDE** | Datadog peut s'authentifier auprès d'Okta avec ces accréditations. |
| **INVALIDE** | Datadog ne peut pas s'authentifier. Voir [Dépannage](#troubleshooting). |

Via l'API, une accréditation signale `initializing` après que Datadog l'a acceptée et avant que la première synchronisation ne soit terminée.

### Métriques clés {#key-metrics}

Le dashboard **Key Metrics** affiche quatre widgets :

- **Utilisateurs synchronisés** : le nombre d'utilisateurs qu'une synchronisation a mis à jour. Cela mesure le taux de rotation de l'annuaire plutôt que sa taille, donc le chiffre est normalement bien inférieur à votre nombre total d'utilisateurs. Pour le total, utilisez la section [Entités](#entities) ci-dessous.
- **Utilisateurs par identifiant** : le même nombre, ventilé par compte connecté.
- **Sync History by Credential** : Synchronisations terminées au fil du temps. Un écart signifie qu'une synchronisation a échoué ou a été ignorée.
- **Sync Duration by Credential** : Combien de temps chaque synchronisation a pris. Un pic occasionnel est normal. Une augmentation soutenue signifie généralement que l'annuaire s'agrandit ou qu'Okta limite le débit des appels.

Chaque widget par identifiant regroupe par `credential_name`, qui est dérivé du **Nom** que vous avez saisi.

### Entités {#entities}

La section **Entités** répertorie les utilisateurs synchronisés par ce pack d'entités. Chaque ligne affiche le **Nom d'affichage**, l'**ID principal**, le **Type d'utilisateur** (par exemple, `human` ou `service_account`) et le **Statut du compte** (par exemple, **ACTIF**).

Cloud SIEM normalise les statuts d'utilisateur d'Okta selon le modèle de statut commun qu'il utilise pour chaque fournisseur d'identité (**ACTIF**, **SUSPENDU**, **SUPPRIMÉ**). Les valeurs indiquées ici ne sont pas les noms de statut propres à Okta.

Le nombre d'entités correspond au nombre total d'utilisateurs synchronisés depuis cet annuaire, ce qui en fait le chiffre à comparer à la taille de votre annuaire Okta. La liste couvre une plage temporelle que vous pouvez modifier. Pour tout voir, cliquez sur **Afficher dans l'inventaire des utilisateurs**.

## Connecter des organisations Okta supplémentaires {#connect-additional-okta-orgs}

Chaque ensemble d'identifiants synchronise une organisation Okta. Pour en synchroniser une autre, créez un jeton API dans cette organisation, puis cliquez sur **Ajouter un compte** dans la section **Identifiants** du panneau latéral du Pack d'entités.

Lorsque vous connectez plusieurs organisations :

- Nommez chaque compte d'après l'organisation qu'il synchronise. Les trois widgets par identifiant sont regroupés par `credential_name`, une forme normalisée du **Nom** que vous saisissez, donc des noms vagues rendent ces widgets difficiles à lire.
- Utilisez le bouton bascule par compte sous **Statut** pour suspendre la synchronisation d'une organisation sans supprimer ses identifiants.
- Créez un jeton API distinct dans chaque organisation. Un jeton ne s'authentifie qu'auprès de l'organisation qui l'a émis.

## Dépannage {#troubleshooting}

### Le test de connexion échoue {#the-connection-test-fails}

Examinez ces causes dans l'ordre :

| Cause | Comment confirmer | Correctif |
| --- | --- | --- |
| Valeur du jeton collée avec le préfixe `SSWS` ou des espaces environnants | La valeur que vous avez collée est plus longue que le jeton affiché par Okta | Collez à nouveau la valeur du jeton seule. |
| Domaine Okta saisi avec un schéma ou un chemin | La valeur **Okta Domain** commence par `https://`, ou se termine par `/admin` ou par une barre oblique finale | . Saisissez uniquement le host ; par exemple, `example.okta.com`. |
| Host d'organisation Okta incorrect | La valeur utilise `example.okta.com` pour une organisation de prévisualisation, ou omet le suffixe `-emea` pour une organisation EMEA | Utilisez le host auquel vous vous connectez : `example.oktapreview.com` ou `example.okta-emea.com`. |
| Le créateur du jeton n'est pas administrateur ou ne peut pas lire les utilisateurs | Le compte qui a créé le jeton n'a aucun rôle d'administrateur dans la console d'administration Okta | Créez le jeton à partir d'un compte disposant du rôle **Administrateur en lecture seule** ou d'un rôle d'administrateur plus large. |
| Le créateur du jeton a été désactivé | Le compte qui a créé le jeton n'est plus actif dans Okta | Créez un jeton à partir d'un compte de service actif. Okta rejette les jetons provenant d'utilisateurs désactivés. |
| Jeton révoqué ou expiré | Le jeton est absent de l'onglet **Tokens** dans Okta, ou sa date de dernière utilisation remonte à plus de 30 jours | Créez un jeton et ajoutez-le dans Datadog. Okta révoque définitivement les jetons inutilisés pendant 30 jours. |
| Jeton restreint aux zones réseau excluant Datadog | Le paramètre **« Token can be used from »** est défini sur autre chose que **Any IP** | . Réglez le jeton sur **Any IP**, ou vérifiez que la zone IP couvre les plages publiées par Datadog. Voir [Restrictions réseau](#network-restrictions). |

### Les identifiants fonctionnaient et sont maintenant invalides {#credentials-were-working-and-are-now-invalid}

La cause est généralement un changement du côté d'Okta :

- Le compte qui a créé le jeton a été désactivé, ou a perdu le rôle d'administrateur qui lui donnait un accès en lecture aux utilisateurs. Les autorisations d'un jeton suivent celles du compte créateur, donc un simple changement de rôle peut interrompre la synchronisation. C'est l'échec courant lorsque le jeton appartient à une personne plutôt qu'à un compte de service.
- Le jeton a été révoqué depuis l'onglet **Tokens**, ou a expiré après 30 jours sans utilisation.
- Les restrictions de zone réseau du jeton ont été modifiées.

Okta consigne la création et la révocation des jetons dans le log système sous `API token created` et `API token revoked`. C'est le moyen le plus rapide de confirmer si un jeton a été révoqué, et par qui.

### Les synchronisations sont lentes ou intermittentes {#syncs-are-slow-or-intermittent}

Okta applique des limites de débit API par organisation et renvoie `HTTP 429 Too Many Requests` une fois qu'une limite est dépassée. Les jetons créés dans la console d'administration Okta sont limités par défaut à 50 % de chaque limite de débit, et toute autre intégration utilisant le même jeton puise dans ce même budget.

- Dans Okta, vérifiez **Reports** > **Rate Limits** pour les avertissements et les violations, qu'Okta écrit également dans le log système.
- Sur la page du jeton dans Okta, augmentez le pourcentage **Token rate limits** si la valeur par défaut restreint la synchronisation.
- Donnez à Datadog son propre jeton plutôt que d'en réutiliser un déjà utilisé par d'autres intégrations.

Consultez la présentation des limites de débit d'Okta [rate limits overview][11].

### La synchronisation réussit mais aucun utilisateur n'apparaît {#the-sync-succeeds-but-no-users-appear}

- Confirmez que la valeur **Domain** correspond au domaine dont vous attendez les utilisateurs. Un administrateur valide dans un domaine différent de celui que vous avez saisi peut produire un résultat vide.


### Aucune pastille d'utilisateur n'apparaît sur les signaux {#no-user-pill-appears-on-signals}

Cloud SIEM fait correspondre le contexte d'identité aux événements par adresse e-mail. Si un utilisateur synchronisé n'a pas de pastille sur son activité, vérifiez que les logs de cette source renseignent le champ e-mail de l'utilisateur et que le pipeline OCSF de la source est actif. Voir [Open Cybersecurity Schema Framework][7].

Un pack d'entités ne nécessite pas l'intégration de logs correspondante, et l'intégration ne nécessite pas le pack d'entités. Si vous synchronisez l'annuaire mais ne voyez aucune activité Okta à laquelle le rattacher, vous pourriez également avoir besoin de l'[intégration de logs Okta][3].

Si vous avez toujours besoin d'aide, contactez le [support Datadog][8].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/
[2]: https://developer.okta.com/docs/api/openapi/okta-management/management/tags/user
[3]: /fr/integrations/okta/
[4]: https://help.okta.com/en-us/content/topics/security/api.htm
[5]: https://help.okta.com/en-us/content/topics/security/administrators-admin-comparison.htm
[6]: https://app.datadoghq.com/security/siem/content-packs
[7]: /fr/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/
[8]: /fr/help/
[9]: /fr/security/cloud_siem/triage_and_investigate/user_inventory/
[10]: /fr/security/cloud_siem/ingest_and_enrich/entity_packs/
[11]: https://developer.okta.com/docs/reference/rate-limits/
[12]: /fr/api/latest/ip-ranges/