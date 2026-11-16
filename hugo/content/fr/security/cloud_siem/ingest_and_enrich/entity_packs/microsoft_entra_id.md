---
description: Synchronisez votre répertoire d'utilisateurs Microsoft Entra ID dans
  Cloud SIEM pour ajouter un contexte d'identité aux signaux, aux risques et aux enquêtes.
further_reading:
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/
  tag: Documentation
  text: En savoir plus sur les packs d'entités
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/okta/
  tag: Documentation
  text: Configurez le pack d'entités Okta
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/google_workspace/
  tag: Documentation
  text: Configurez le pack d'entités Google Workspace
- link: /security/cloud_siem/triage_and_investigate/user_inventory/
  tag: Documentation
  text: Parcourir les utilisateurs synchronisés dans l'Inventaire des utilisateurs
- link: /security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/
  tag: Documentation
  text: Explorer les entités et l'évaluation des risques avec les Risques d'entité
- link: /getting_started/integrations/azure/
  tag: Documentation
  text: Démarrez avec l'intégration Azure
title: Microsoft Entra ID Entity Pack
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">Les packs d'entités ne sont pas disponibles pour le site Datadog US1-FED.</div>
{{< /site-region >}}

## Présentation {#overview}

Le pack d'entités Microsoft Entra ID synchronise votre répertoire d'utilisateurs Microsoft Entra ID dans Cloud SIEM. Une fois connecté, Cloud SIEM utilise ce répertoire pour :

- Remplissez l'[User Inventory][8] avec vos utilisateurs Entra ID.
- Joignez une pastille d'utilisateur aux signaux afin que vous puissiez voir qui est à l'origine de l'activité.
- Évaluez le risque pour un utilisateur sur l'ensemble de ses comptes dans [Entity Risks][1].

Pour savoir ce que fournissent en général les Entity Packs et les autorisations qu'ils requièrent, consultez [Entity Packs][9].

Datadog lit votre répertoire via l'[API Microsoft Graph][2], en s'authentifiant en tant qu'enregistrement d'application Azure auquel vous accordez des autorisations d'application et auquel un administrateur de locataire consent. Datadog demande un accès en lecture seule ; il n'écrit pas dans votre répertoire.

Contrairement aux autres packs d'entités, Microsoft Entra ID s'appuie sur l'[intégration Azure de Datadog][10] plutôt que sur des identifiants que vous saisissez directement dans Cloud SIEM. L'enregistrement d'application qui prend en charge le pack d'entités est le même que celui utilisé par l'intégration Azure, et la collecte de ressources doit y être activée. Si vous utilisez déjà l'intégration Azure, la majeure partie de la configuration est effectuée ; vous ajoutez deux autorisations Microsoft Graph à un enregistrement d'application existant.

## Prérequis {#prerequisites}

Avant de commencer, assurez-vous de disposer des éléments suivants :

- Une [intégration Azure][10] configurée dans Datadog, avec **la collecte de ressources activée** sur l'enregistrement d'application que vous prévoyez d'utiliser. La collecte de ressources est requise ; le pack d'entités ne se synchronise pas sans elle.
- Au moins un abonnement Azure configuré sur cet enregistrement d'application, même si vous ne l'utilisez pas par ailleurs.
- Autorisation dans le portail Azure pour ajouter des autorisations d'application Microsoft Graph et accorder le consentement de l'administrateur. L'octroi du consentement nécessite le rôle **Administrateur de rôle privilégié** ou **Administrateur général**.
- Les autorisations Datadog suivantes :

  | Autorisation | Pourquoi elle est nécessaire |
  | --- | --- |
  | **SIEM Entities Admin** | Connectez un répertoire d'utilisateurs et gérez ses identifiants. Consultez [Entity Packs][9]. |
  | **Integrations Manage** | Modifiez l'intégration Azure, via laquelle ce pack d'entités est configuré. |

  Pour voir le contexte d'identité fourni par le pack d'entités, les analystes ont besoin au minimum de **SIEM Entities Read**.

## Configuration {#setup}

Vous pouvez configurer un enregistrement d'application par locataire Entra ID. Pour synchroniser plus d'un locataire, consultez [Connect additional tenants](#connect-additional-tenants).

Si vous avez déjà une intégration Azure avec la collecte de ressources activée, passez à [Grant Microsoft Graph permissions](#grant-microsoft-graph-permissions).

### Configurez l'intégration Azure {#set-up-the-azure-integration}

1. Dans Datadog, accédez à **Integrations** > [**Azure**][3].
1. Si vous n'avez pas encore d'intégration Azure, suivez [Commencer avec Azure][10]. Vous pouvez la configurer de trois manières :
   - **Quickstart**, qui exécute un script d'installation dans Azure Cloud Shell.
   - **Terraform**, pour les workflows d'infrastructure en tant que code.
   - **Enregistrement d'application existant**, où vous saisissez vous-même l'ID de locataire, l'ID client et le secret client.
1. Si vous disposez déjà d'une intégration Azure, confirmez que l'enregistrement d'application que vous prévoyez d'utiliser est prêt :
   1. Sous l'onglet **Configuration**, sélectionnez l'enregistrement d'application dans la liste. Chaque entrée affiche son nom ou son ID client et le nombre d'abonnements dont elle dispose. Confirmez qu'elle dispose d'au moins un abonnement.
   1. Ouvrez l'onglet **Resource Collection** et confirmez que **Enable Resource Collection** est activé. S'il est désactivé, activez-le.

Notez l'enregistrement d'application que vous avez confirmé. C'est celle à laquelle vous accordez des autorisations Microsoft Graph à l'étape suivante, et celle que vous sélectionnez ensuite dans Cloud SIEM.

### Grant Microsoft Graph permissions{#grant-microsoft-graph-permissions}

L'enregistrement de l'application nécessite des autorisations d'application Microsoft Graph pour lire les données utilisateur. Celles-ci s'ajoutent aux autorisations déjà utilisées par l'intégration Azure.

1. Dans le portail Azure, accédez à **Microsoft Entra ID** > **App registrations**.
1. Sélectionnez votre enregistrement d'application Datadog. Si plusieurs semblent similaires, effectuez une recherche par ID client.
1. Dans la barre latérale gauche, cliquez sur **API permissions**.
1. Cliquez sur **Add a permission** > **Microsoft Graph** > **Application permissions**.
1. Ajoutez les autorisations suivantes :
   | Permission | Requise pour | Ce qu'elle permet de lire |
   | --- | --- | --- |
   | `User.Read.All` | Profils utilisateur | Attributs utilisateur : e-mail, nom, service, intitulé de poste, statut du compte et horodatages de changement de mot de passe. |
   | `AuditLog.Read.All` | Statut MFA et activité de connexion | Statut d'enregistrement MFA, détails de la méthode d'authentification et activité de connexion. |

   Vous pouvez accorder `Directory.Read.All` au lieu de `User.Read.All`. Il est plus large : il couvre les données utilisateur ainsi que d'autres objets de répertoire. Accordez `User.Read.All` à moins que votre organisation n'ait une raison de préférer le périmètre plus large.
1. Cliquez sur **Grant admin consent for \\<your tenant name\>**. Pour plus de détails, consultez [Accorder le consentement administrateur au niveau locataire][4] de Microsoft.
1. Confirmez que les deux autorisations affichent une coche verte dans la colonne **Status**. Ajouter une autorisation n'est pas la même chose que d'y consentir, et c'est l'étape la plus souvent oubliée.

<div class="alert alert-info">Sans <code>AuditLog.Read.All</code>, le répertoire se synchronise toujours et les utilisateurs apparaissent toujours dans l'inventaire des utilisateurs, mais leurs enregistrements n'incluent pas le statut MFA ou l'activité de connexion.</div>

### Add an app registration in Datadog{#add-an-app-registration-in-datadog}

1. Dans Datadog, accédez à **Cloud SIEM** > [**Content Packs**][5].
1. Filtrez par **Entity Pack**, puis ouvrez le **Microsoft Entra ID** Entity Pack. Il est marqué **AVAILABLE** jusqu'à ce que vous connectiez un répertoire.
1. Cliquez sur **Add Account**.
1. Dans la boîte de dialogue **Add App Registration**, sélectionnez une méthode de configuration :
   | Méthode| À utiliser quand|
   | --- | --- |
   | **Quickstart** | Vous souhaitez que le script d'installation de Datadog configure l'intégration pour vous via Azure Cloud Shell. |
   | **Terraform** | Vous gérez la configuration Azure sous forme de code. |
   | **Existing App Registration** | Vous avez déjà configuré un enregistrement d'application dans Azure avec les autorisations requises, ce qui est le cas si vous avez suivi les étapes ci-dessus. |
1. L'Entity Pack affiche vos enregistrements d'applications Azure. Sélectionnez celui auquel vous avez accordé les autorisations Microsoft Graph et confirmez que la collecte de ressources est activée.
1. Si vous voyez un avertissement tel que **6 Azure applications have Resource Collection disabled**, recherchez l'enregistrement d'application auquel vous avez accordé les autorisations Microsoft Graph dans la liste ci-dessous. Un point rouge signifie que la collecte de ressources est désactivée. Cliquez sur **Configure** à côté, ou ouvrez l'enregistrement d'application dans **Integrations** > [**Azure**][3], et activez **Enable Resource Collection** sur son onglet **Resource Collection**.

## Vérifiez la synchronisation{#verify-the-sync}

La synchronisation Entra ID dépend de la collecte de ressources Azure, de sorte que les utilisateurs n'apparaissent pas immédiatement dans Cloud SIEM après avoir connecté un enregistrement d'application.

Une fois l'enregistrement d'application connecté et validé, l'Entity Pack est marqué **ACTIF**. Ouvrez son panneau latéral dans Cloud SIEM et vérifiez les points suivants :

### Identifiants {#credentials}

La section **Identifiants** indique le nombre de comptes connectés et répertorie chacun d'eux. Développez un compte pour voir :

| Champ | Ce qu'il vous indique |
| --- | --- |
| **Abonnement** | L'ID d'abonnement Azure qui identifie ce compte. |
| **Créé le** | Date à laquelle le compte a été connecté. |
| **État de la synchronisation** | Si la synchronisation la plus récente a réussi ; par exemple, `Synced`. |
| **Dernière synchronisation** | Il y a combien de temps la synchronisation la plus récente a été effectuée. |
| **Durée de la dernière synchronisation** | Combien de temps cette synchronisation a pris. |

Un badge **SAIN** à côté de l'ID d'abonnement signifie que le compte se synchronise normalement. Utilisez le bouton bascule à droite du compte pour activer ou désactiver la synchronisation sans supprimer le compte.

Sous les détails de synchronisation, le compte liste vos enregistrements d'applications Azure par ID client, avec le nombre d'abonnements que chacun possède. Un point vert signifie que la collecte de ressources est activée sur cet enregistrement d'application ; un point rouge signifie qu'elle est désactivée. Lorsque certains sont désactivés, une ligne récapitulative au-dessus de la liste les compte, par exemple **6 applications Azure ont la collecte de ressources désactivée.** Cliquez sur **Configure** à côté d'un enregistrement d'application pour ouvrir sa configuration et activer la collecte de ressources.

La collecte de ressources doit être activée sur l'enregistrement d'application auquel vous avez accordé des autorisations Microsoft Graph. Un compte peut afficher **HEALTHY** et **Synced** alors que d'autres enregistrements d'applications dans la liste ont toujours la collecte de ressources désactivée.

### Métriques clés {#key-metrics}

Le dashboard **Key Metrics** affiche quatre widgets :

- **Users Synced** : Le nombre d'utilisateurs dont les attributs ont été mis à jour par une synchronisation. Il s'agit d'une mesure du taux de rotation de l'annuaire, et non de la taille de l'annuaire ; elle est donc normalement bien inférieure au nombre total de vos utilisateurs. Utilisez la section **Entities** ci-dessous pour obtenir le total.
- **Users by Credential** : Le même nombre d'utilisateurs mis à jour, ventilé par compte connecté.
- **Sync History by Credential** : Synchronisations terminées au fil du temps. Les lacunes indiquent des synchronisations ayant échoué ou ayant été ignorées.
- **Sync Duration by Credential** : Combien de temps chaque synchronisation a pris. Des pics isolés sont normaux ; une augmentation soutenue peut indiquer un annuaire en pleine croissance ou une limitation de Microsoft Graph du côté d'Azure.

Les widgets par identifiant se regroupent par `credential_name`.

### Entités {#entities}

La section **Entities** répertorie les utilisateurs synchronisés par ce pack d'entités, avec le **Nom d'affichage**, l'**ID principal**, le **Type d'utilisateur** (par exemple `human` ou `service_account`), et le **Statut du compte** (par exemple **ACTIF**). Le nombre d'entités correspond au nombre total d'utilisateurs synchronisés dans Cloud SIEM à partir de ce répertoire ; c'est donc le chiffre à comparer à la taille de votre locataire Entra ID. La liste est limitée à une plage temporelle que vous pouvez modifier. Cliquez sur **View in User Inventory** pour voir l'[inventaire complet][8].

Pour confirmer que le contexte d'identité atteint vos signaux, ouvrez un signal attribué à un utilisateur synchronisé et vérifiez qu'une pastille d'utilisateur apparaît.

## Connectez des locataires supplémentaires {#connect-additional-tenants}

Chaque inscription d'application couvre un locataire Entra ID. Pour synchroniser des locataires supplémentaires, répétez la procédure de [Configuration](#setup) dans chacun d'eux, puis cliquez sur **Ajouter une inscription d'application** dans la section **Identifiants** du panneau latéral du pack d'entités.

Lorsque vous connectez plusieurs locataires :

- Utilisez le bouton bascule sur chaque compte pour suspendre la synchronisation d'un locataire sans supprimer son compte.
- Accordez les autorisations Microsoft Graph et le consentement de l'administrateur séparément dans chaque locataire. Le consentement s'applique uniquement au locataire auquel vous l'accordez.
- Activez la collecte de ressources sur chaque inscription d'application. Il s'agit d'un paramètre par inscription d'application, et non d'un paramètre global.

## Dépannage {#troubleshooting}

### Aucun utilisateur n'apparaît {#no-users-appear}

Examinez ces causes dans l'ordre :

| Cause | Comment confirmer | Correctif |
| --- | --- | --- |
| Pas assez de temps ne s'est écoulé | Vous avez accordé des autorisations ou connecté l'inscription d'application très récemment | Patientez et vérifiez à nouveau. La synchronisation Entra ID dépend de la collecte de ressources Azure, les utilisateurs n'apparaissent donc pas immédiatement. |
| Consentement de l'administrateur non accordé | La colonne **Status** dans **API permissions** n'affiche pas de coche verte pour les deux autorisations | Cliquez sur **Grant admin consent for \<tenant\>** et confirmez les deux coches. L'ajout d'une autorisation sans y consentir ne produit aucun effet. |
| Collecte de ressources désactivée | Dans la section **Credentials**, l'enregistrement de l'application auquel vous avez accordé des autorisations Microsoft Graph présente un point rouge | Cliquez sur **Configure** à côté de l'enregistrement de l'application, ou ouvrez-le dans **Integrations** > [**Azure**][3], et activez **Enable Resource Collection** sur son onglet **Resource Collection**. |
| Aucun abonnement configuré | Dans la section **Credentials**, ou dans la liste des enregistrements d'applications dans **Integrations** > [**Azure**][3], l'enregistrement de l'application affiche **0 abonnements** |  Configurez au moins un abonnement, même si vous ne l'utilisez pas par ailleurs. |
| Mauvais enregistrement d'application sélectionné | L'enregistrement d'application sélectionné dans l'Entity Pack n'est pas celui auquel vous avez accordé les autorisations Graph | Sélectionnez l'enregistrement d'application auquel vous avez accordé les autorisations, ou accordez les autorisations sur celui que vous avez sélectionné. |
| Le répertoire est vide | Le locataire Entra ID ne contient aucun utilisateur | Connectez un locataire qui contient des utilisateurs. Un répertoire vide se synchronise avec succès et produit un inventaire des utilisateurs vide. |
| Vous regardez le mauvais chiffre | **Utilisateurs synchronisés** indique zéro ou un chiffre très bas | Vérifiez plutôt le nombre d'**Entités**. **Utilisateurs synchronisés** ne comptent que les utilisateurs dont les attributs ont été modifiés par une synchronisation ; ce chiffre est donc faible sur un répertoire stable, même lorsque la synchronisation est saine. |

### Le statut MFA ou l'activité de connexion est manquant{#mfa-status-or-sign-in-activity-is-missing}

`AuditLog.Read.All` n'est soit pas accordé, soit n'a pas fait l'objet d'un consentement. Dans le portail Azure, ouvrez les **Autorisations de l'API** de l'enregistrement de l'application et confirmez que l'autorisation est répertoriée avec une coche verte dans **État**. Les profils utilisateur se synchronisent sans cela ; le statut d'inscription MFA et l'activité de connexion ne le font pas.

### Erreurs d'autorisation refusée{#permission-denied-errors}

- Confirmez que le compte Azure qui a accordé le consentement détient le rôle **Administrateur de rôle privilégié** ou **Administrateur général**. Les rôles moins privilégiés peuvent ajouter une demande d'autorisation mais ne peuvent pas y consentir.
- Confirmez que votre compte Datadog dispose des rôles **SIEM Entities Admin** et **Integrations Manage**. Consultez [Entity Packs][9].

### Un compte fonctionnait et n'est plus sain{#an-account-was-working-and-is-no-longer-healthy}

Les causes les plus courantes sont des changements du côté d'Azure :

- Le secret client de l'enregistrement de l'application a expiré ou a été renouvelé. Les secrets client Azure ont une durée de vie limitée ; c'est donc la première défaillance à envisager sur une connexion qui a fonctionné pendant des mois avant de s'arrêter.
- L'enregistrement de l'application a été supprimé, ou ses autorisations Microsoft Graph ou le consentement de l'administrateur ont été révoqués.
- La collecte de ressources a été désactivée sur l'enregistrement de l'application.

Pour obtenir des messages d'erreur spécifiques, ouvrez l'enregistrement de l'application dans **Integrations** > [**Azure**][3] et vérifiez son onglet **Issues**.

### Aucune pastille d'utilisateur n'apparaît sur les signaux {#no-user-pill-appears-on-signals}

Le contexte d'identité est mis en correspondance avec les événements par adresse e-mail. Si un utilisateur synchronisé n'a pas de pastille sur son activité, confirmez que les logs de cette source renseignent le champ e-mail de l'utilisateur et que le pipeline OCSF de la source est actif. Voir [Open Cybersecurity Schema Framework][6].

Un pack d'entités ne nécessite pas l'intégration de logs correspondante, et inversement. Si vous synchronisez l'annuaire mais ne voyez aucune activité Entra ID à laquelle le rattacher, vous devrez peut-être également envoyer les logs Entra ID à Datadog.

Si vous avez toujours besoin d'aide, contactez le [support Datadog][7].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/
[2]: https://learn.microsoft.com/en-us/graph/api/resources/users
[3]: https://app.datadoghq.com/integrations/azure
[4]: https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/grant-admin-consent
[5]: https://app.datadoghq.com/security/siem/content-packs
[6]: /fr/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/
[7]: /fr/help/
[8]: /fr/security/cloud_siem/triage_and_investigate/user_inventory/
[9]: /fr/security/cloud_siem/ingest_and_enrich/entity_packs/
[10]: /fr/getting_started/integrations/azure/