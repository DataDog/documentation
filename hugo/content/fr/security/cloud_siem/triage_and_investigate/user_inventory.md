---
description: Parcourez et examinez chaque identité utilisateur synchronisée avec Cloud
  SIEM, y compris la configuration du compte, les risques associés et l'historique
  des activités.
further_reading:
- link: /security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/
  tag: Documentation
  text: Entity Risks
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/
  tag: Documentation
  text: Entity Packs
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/microsoft_entra_id/
  tag: Documentation
  text: Microsoft Entra ID Entity Pack
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/okta/
  tag: Documentation
  text: Okta Identity Entity Pack
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/google_workspace/
  tag: Documentation
  text: Google Workspace Identity Entity Pack
- link: /security/cloud_siem/investigator/
  tag: Documentation
  text: Investigator
- link: /security/cloud_siem/investigate_security_signals/
  tag: Documentation
  text: Enquêter sur les signaux de sécurité
- link: /security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/
  tag: Documentation
  text: Open Cybersecurity Schema Framework (OCSF)
title: User Inventory
---
## Présentation {#overview}

[L'inventaire des utilisateurs de Cloud SIEM][6] est une copie synchronisée et normalisée de votre répertoire d'utilisateurs au sein de Cloud SIEM. Il répertorie chaque identité utilisateur que Cloud SIEM a synchronisée depuis vos fournisseurs d'identité, indépendamment du fait que cet utilisateur ait une activité, des signaux ou des risques associés. Lorsque vous avez besoin de savoir qui est un utilisateur, à quoi ressemble son compte et comment il a changé, vous pouvez répondre à la question dans Cloud SIEM au lieu de devoir basculer vers votre fournisseur d'identité.

Avec User Inventory, vous pouvez :

- Parcourez chaque identité utilisateur et compte de service synchronisés dans une seule liste.
- Filtrez les utilisateurs par statut de compte, intitulé de poste, emplacement de bureau, ID principal, fournisseur et type d'utilisateur.
- Recherchez dans l'inventaire par nom ou ID principal.
- Examinez la configuration actuelle d'un utilisateur, y compris l'intitulé de poste, le service, l'emplacement de bureau et le statut de l'authentification multifacteur (MFA).
- Voyez le score de risque pour chaque compte associé à une identité utilisateur, ainsi que l'évolution de ce score.
- Tracez les signaux, les connexions, les changements de MFA, les changements de mot de passe, les changements de configuration et les logs d'un utilisateur au fil du temps.

User Inventory et [Entity Risks][1] répondent à des questions différentes. User Inventory est le répertoire complet : chaque utilisateur synchronisé, indépendamment de son activité. Entity Risks est la vue priorisée : les identités des utilisateurs et autres entités qui ont été évaluées et classées par risque. Commencez par User Inventory lorsque vous savez quel utilisateur vous souhaitez comprendre. Commencez par Entity Risks lorsque vous voulez que Datadog vous indique quels utilisateurs examiner en priorité.

## Prérequis {#prerequisites}

### Autorisations{#permissions}

Les autorisations Cloud SIEM suivantes s'appliquent à User Inventory :

| Permission | Ce qu'elle accorde |
| ---------- | -------------- |
| **SIEM Entities Notification** | Les utilisateurs disposant de cette autorisation peuvent modifier les notifications d'Entity Risks. |
| **SIEM Entities Read** | Affichez et recherchez dans le User Inventory Explorer, ouvrez le panneau latéral utilisateur et voyez la pastille d'utilisateur corrélé dans le panneau latéral Signals. Accorde également un accès en lecture aux panneaux latéraux Entity Pack dans le Content Packs Explorer. |
| **SIEM Entities Admin** | Tout ce que SIEM Entities Read accorde, plus la possibilité de configurer les Entity Packs et d'autres paramètres d'Entity Risks. Requis pour remplir le prérequis Entity Packs ci-dessous. |

<div class="alert alert-info">Un User Inventory vide sans aucun filtre appliqué a deux causes possibles : aucun Entity Pack n'est activé, ou vous n'avez pas l'autorisation <strong>SIEM Entities Read</strong>. Confirmez d'abord votre configuration des Entity Packs, puis confirmez vos autorisations.</div>

### Entity Packs {#entity-packs}

User Inventory est alimenté par des Entity Packs, qui synchronisent le contexte de l'utilisateur et de l'identité depuis votre fournisseur d'identité. Au moins un Entity Pack doit être activé avant que User Inventory ne renvoie des résultats.

Les Entity Packs sont disponibles pour les fournisseurs suivants :

- [Microsoft Entra ID][2]
- [Okta][3]
- [Google Workspace][4]

La configuration d'Entity Packs nécessite l'autorisation `SIEM Entities Admin`. Les Entity Packs sont configurés à partir du Content Packs Explorer. Pour obtenir des instructions de configuration, consultez [Entity Packs][5].

### Recommandé : pipelines OCSF {#recommended-ocsf-pipelines}

Un pipeline Open Cybersecurity Schema Framework (OCSF) actif est facultatif. Cloud SIEM peut corréler certaines activités à une identité utilisateur en utilisant uniquement des attributs standard. Cependant, vous obtenez la corrélation la plus complète à partir de sources disposant d'un pipeline OCSF actif. Si l'activité d'un utilisateur semble plus clairsemée dans Cloud SIEM que prévu, vérifiez si les sources pertinentes ont un pipeline OCSF configuré.

## Explorez User Inventory {#explore-the-user-inventory}

Pour ouvrir User Inventory, accédez à **Cloud SIEM** > **Investigate** > [**User Inventory**][6].

{{< img src="security/cloud_siem/user_inventory_explorer.png" alt="Le User Inventory Explorer répertorie les identités utilisateur synchronisées avec leur ID principal, leur type d'utilisateur, le statut de leur compte et leur fournisseur." style="width:100%;" >}}

### Recherchez et filtrez les utilisateurs {#search-and-filter-users}

Pour trouver un utilisateur par nom d'affichage ou ID principal, saisissez votre requête dans la zone de recherche et appuyez sur <kbd>Entrée</kbd>.

Pour restreindre la liste par attribut, utilisez les menus déroulants de filtrage. Chaque filtre est défini par défaut sur **All**.

| Filtre | Ce à quoi il correspond : |
| ------ | --------------- |
| Account Status | Le statut du compte dans votre fournisseur d'identité, tel que `ACTIVE`, `SUSPENDED` ou `DELETED`. |
| Job Title | L'intitulé du poste de l'utilisateur, tel qu'indiqué par votre fournisseur d'identité. |
| Office Location | Le lieu de travail de l'utilisateur, tel qu'indiqué par votre fournisseur d'identité. |
| Principal ID | L'ID principal de l'utilisateur, tel que rapporté par votre fournisseur d'identité. |
| Provider | Le fournisseur d'identité à partir duquel l'utilisateur a été synchronisé. |
| User Type | Le type de compte : `human`, `service_account`, ou `guest`. |

Le titre du poste, le lieu de travail et l'ID principal sont transmis par votre fournisseur d'identité. Si une valeur semble incorrecte ou manquante dans Cloud SIEM, vérifiez le champ correspondant dans votre fournisseur d'identité.

### Parcourez les utilisateurs dans SIEM {#browse-users-in-siem}

- La liste charge davantage d'utilisateurs à mesure que vous faites défiler la page. Le nombre d'entités en haut de la liste indique combien d'utilisateurs sont chargés et combien correspondent à votre recherche et à vos filtres actuels.
- La colonne **Changes Detected** compte les mises à jour apportées à une identité utilisateur au cours des 14 derniers jours qui incluaient un ou plusieurs changements d'attributs. Il compte les mises à jour, et non les attributs individuels ; ainsi, une seule mise à jour ayant modifié trois attributs compte pour une. Utilisez-la pour repérer les utilisateurs dont la configuration a été modifiée récemment, puis ouvrez l'utilisateur et accédez à l'onglet **Entity changes** pour voir ce qui a changé.
- Pour exporter la liste sous forme de fichier CSV, cliquez sur l'icône d'exportation au-dessus du tableau. Le fichier CSV contient uniquement les utilisateurs actuellement chargés dans la vue, et non tous les utilisateurs synchronisés avec Cloud SIEM. Pour inclure davantage d'utilisateurs dans l'exportation, faites défiler la page pour les charger au préalable.
- Pour modifier les colonnes affichées, cliquez sur l'icône des paramètres de colonne.

## Enquêtez sur une identité utilisateur {#investigate-a-user-identity}

Cliquez sur n'importe quelle ligne de la liste des utilisateurs pour ouvrir le panneau latéral de l'utilisateur. Pour ouvrir les mêmes informations sur une page complète, cliquez sur **Open Fullscreen**.

L'en-tête du panneau affiche le statut du compte de l'utilisateur, son nom d'affichage et la plage temporelle sur laquelle le panneau est défini, ainsi que les métadonnées suivantes :

| Champ | Description |
| ----- | ----------- |
| Principal ID | ID principal de l'utilisateur. Cliquez sur l'icône de copie pour le copier. |
| Type | Le type de compte : `human`, `service_account`, ou `guest`. |
| Created | Date de création du compte, affichée sous forme de temps relatif. |
| Last updated | Date à laquelle Cloud SIEM a synchronisé pour la dernière fois une modification de cette identité utilisateur, affichée sous forme de temps relatif. |

Les temps relatifs sont affichés dans tout le panneau. Pour voir l'horodatage exact derrière un temps relatif, survolez-le.

{{< img src="security/cloud_siem/user_inventory_side_panel.png" alt="Le panneau latéral utilisateur pour une identité utilisateur unique, affichant l'état actuel et les risques associés" style="width:100%;" >}}

### Examinez l'état actuel {#review-current-state}

La section **Current state** affiche la configuration de l'utilisateur lors de la synchronisation la plus récente :

| Champ | Description |
| ----- | ----------- |
| Identity Source(s) | Les fournisseurs d'identité à partir desquels cette identité utilisateur a été synchronisée. |
| Email | L'adresse e-mail de l'utilisateur. |
| Name | Le nom d'affichage de l'utilisateur. |
| Job | L'intitulé du poste, le service et le lieu de travail de l'utilisateur. |
| MFA status | Deux états indépendants : si l'utilisateur a enregistré la MFA et si la politique l'exige. |

Le statut MFA est rapporté sous forme de deux valeurs distinctes car elles peuvent diverger. `ENABLED` signifie que l'utilisateur a activé la MFA. `NOT ENFORCED` signifie que la politique de votre fournisseur d'identité n'exige pas que l'utilisateur l'utilise en toutes circonstances. Examinez vos politiques afin de déterminer s'il existe une lacune.

### Examinez les risques {#review-risks}

La section **Risks** répertorie le score de risque pour chaque compte associé à cette identité utilisateur : Il s'agit de scores par compte, et non d'un score global pour l'utilisateur.

| Colonne | Description |
| ------ | ----------- |
| Risk Score | Le score de risque du compte et sa gravité correspondante. |
| Name | Le compte auquel le score s'applique. |
| Type | Le type d'entité évaluée, tel que `Email Address`. |
| Source | Les sources de logs à partir desquelles l'activité du compte a été corrélée. Cliquez sur l'indicateur de débordement pour voir des sources supplémentaires. |
| Last Seen | Le moment où le compte a généré un signal pour la dernière fois, affiché sous forme de temps relatif. Il ne s'agit pas de la dernière fois que le compte a eu une activité. |
| Risk Change | Comment le score de risque du compte a évolué au cours des 14 derniers jours. |
| Signals | Le nombre de signaux contribuant au score du compte. |

<div class="alert alert-info">Dernière activité reflète uniquement l'activité des signaux. Un compte avec une ancienne valeur de Dernière activité peut toujours générer des logs. Vérifiez l'onglet <strong>All logs</strong> dans <strong>Activity History</strong> pour voir son activité la plus récente.</div>

Le changement de risque reflète toujours une période fixe de 14 jours et ne suit pas le sélecteur de plage horaire du panneau.

Pour savoir comment les scores de risque sont calculés et comment les personnaliser, consultez [Risques liés aux entités][1].

## Explorer l'historique d'activité {#explore-activity-history}

La section **Activity History** retrace ce qu'un utilisateur a fait et comment son compte a changé. Deux contrôles définissent le périmètre de toute la section :

- **Activity from** : Sélectionnez un seul compte pour limiter l'activité à ce compte, ou sélectionnez **All** pour afficher l'activité de tous les comptes associés à cette identité utilisateur.
- **Time range** : Définissez la fenêtre pour les vues d'activité.

Chaque onglet affiche un nombre de résultats et un lien **See all** qui ouvre les données sous-jacentes dans son propre Explorer, où vous pouvez les interroger davantage.

Les données de l'Historique d'activité sont mappées soit sur des attributs standard de Datadog, soit sur des champs OCSF, afin que vous puissiez les interroger dans les Explorers en utilisant les mêmes noms d'attributs que ceux que vous utilisez ailleurs dans Cloud SIEM.

### Signaux {#signals}

Affiche les signaux de sécurité associés à cette identité utilisateur. La vue graphique décompose les signaux par gravité au fil du temps ; la vue liste affiche les signaux individuels. Utilisez cet onglet pour voir si des détections ont été déclenchées sur l'utilisateur et à quel moment.

### Connexion et modifications MFA {#login-and-mfa-changes}

Affiche l'activité de connexion et de modification MFA au fil du temps sous forme de graphique à barres. Utilisez cet onglet pour repérer les changements dans le comportement d'authentification, comme une modification du modèle de connexion d'un utilisateur ou des paramètres MFA.

### Modifications de mot de passe {#password-changes}

Affiche une séquence d'horodatages enregistrant le moment où le mot de passe de l'utilisateur a été modifié. Utilisez cette section pour voir s'il y a des changements de mot de passe proches du moment d'une activité de compte inhabituelle ou suspecte.

### Modifications d'entité {#entity-changes}

Affiche comment la configuration de l'utilisateur a changé au fil du temps. Cloud SIEM enregistre chaque version d'une identité utilisateur, vous permettant ainsi de comparer deux versions quelconques et de voir exactement quels attributs ont changé.

L'en-tête de l'onglet affiche le nombre de modifications effectuées au cours de la période sélectionnée. Deux vues sont disponibles :

- **JSON** : Une comparaison côte à côte de deux versions. Les valeurs supprimées sont marquées en rouge ; les valeurs ajoutées sont marquées en vert.
- **Chronologie** : Une vue chronologique des changements.

{{< img src="security/cloud_siem/user_inventory_entity_changes.png" alt="Une comparaison JSON côte à côte de deux versions d'une identité utilisateur, mettant en évidence les changements apportés à l'application de la MFA" style="width:100%;" >}}

Dans la vue JSON, sélectionnez les versions à comparer à l'aide du menu déroulant de version au-dessus de chaque volet. Le nombre de changements entre les deux versions sélectionnées apparaît à côté du second volet. Pour réduire le bruit, les attributs inchangés sont réduits ; cliquez sur l'indicateur de lignes masquées pour les développer.

Les attributs suivis dans la comparaison incluent l'e-mail, le prénom et le nom, l'intitulé du poste, le lieu de travail, l'ID principal, le fournisseur et le type d'utilisateur, ainsi que l'état d'authentification tel que `mfaEnrolled`, `mfaEnforced` et `lastPasswordChange`.

<div class="alert alert-info">Seuls les changements d'entité effectués au cours des 14 derniers jours apparaissent dans cet onglet, quelle que soit la plage de temps sélectionnée.</div>

### Tous les logs {#all-logs}

Affiche chaque log que Cloud SIEM a corrélé à cette identité utilisateur. Trois vues sont disponibles :

- **Graphique** : Un graphique à barres du volume de logs au fil du temps, ventilé par source de log. Un graphique en anneau à côté montre la part d'activité apportée par chaque compte associé à l'identité utilisateur.
- **Carte** : Une carte du monde avec les pays ombragés où une activité a été détectée.
- **Liste** : Les logs individuels.

Utilisez cet onglet pour voir auxquels systèmes un utilisateur a accédé et lequel de ses comptes génère le plus d'activité.

### Plage de temps {#time-range}

L'historique d'activité utilise par défaut une période de rétrospection de 14 jours. Vous pouvez étendre la plage à 30 jours ou plus.

Deux vues ne suivent pas le sélecteur de plage de temps :

- **Les modifications d'entité** sont limitées aux 14 derniers jours.
- **Le changement de risque** dans la section Risques reflète toujours une période de rétrospection fixe de 14 jours.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/
[2]: /fr/security/cloud_siem/ingest_and_enrich/entity_packs/microsoft_entra_id/
[3]: /fr/security/cloud_siem/ingest_and_enrich/entity_packs/okta/
[4]: /fr/security/cloud_siem/ingest_and_enrich/entity_packs/google_workspace/
[5]: /fr/security/cloud_siem/ingest_and_enrich/entity_packs/
[6]: https://app.datadoghq.com/security/siem/user-inventory