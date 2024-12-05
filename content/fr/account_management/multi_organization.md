---
aliases:
- /fr/guides/multiaccountorg
- /fr/account_management/mult_account
- /fr/account_management/faq/what-data-from-my-sub-organizations-can-i-see-in-my-parent-account
- /fr/account_management/multi_organisations
further_reading:
- link: /account_management/saml/
  tag: Documentation
  text: Configurer SAML pour votre compte Datadog
- link: /account_management/billing/usage_details
  tag: Documentation
  text: En savoir plus sur les détails d'utilisation
- link: /account_management/billing/usage_attribution
  tag: Documentation
  text: Configurer l'attribution de l'utilisation
title: Gestion des comptes multi-organisations
---

Il est possible de gérer plusieurs organisations enfant à partir d'un compte d'organisation parent. Cette fonctionnalité sert généralement aux prestataires de services gérés qui possèdent des clients qui ne doivent pas accéder aux données des autres clients. Les utilisateurs peuvent être ajoutés à l'organisation parent ou à plusieurs organisations enfant et passer d'une organisation à une autre depuis le [menu des paramètres du compte utilisateur][1]. L'organisation parent peut consulter l'utilisation de chaque organisation enfant, ce qui lui permet de suivre les tendances d'utilisation.

Les paramètres du compte, tels que les adresses IP autorisées, ne sont pas transmis par l'organisation parent à l'organisation enfant.

La fonctionnalité de compte multi-organisations n'est pas activée par défaut. Contactez l'[assistance Datadog][2] pour l'activer.

Voici une présentation vidéo de deux minutes à ce sujet :

{{< wistia tg9ufqbin9>}}
<br>

## Organisations enfant

### Création

1. Une fois la fonctionnalité activée, accédez à la [page New Account][3].
2. Saisissez le nom de l'organisation enfant que vous souhaitez créer et cliquez sur le bouton **Create**. **Le nom de l'organisation enfant ne doit pas dépasser 32 caractères**.

La nouvelle organisation enfant hérite de la formule de l'organisation parent et est ajoutée au compte de facturation de l'organisation parent. Si vous souhaitez mettre à jour la facturation de l'organisation enfant, [contactez votre représentant commercial][4].

### Contenu

Vous pouvez programmer l'intégration d'une nouvelle sous-organisation à un ensemble de monitors et de dashboards de référence avec [l'API Datadog][5], ou avec des outils comme Terraform. Consultez notre article de blog [Gérer Datadog avec Terraform][6] (en anglais) pour en savoir plus. En outre, vous pouvez utiliser des scripts pour sauvegarder vos dashboards et [monitors][7] existants sous forme de code.

### Sous-domaines personnalisés

La fonctionnalité de sous-domaine personnalisé n'est pas activée par défaut. Contactez l'[assistance Datadog][2] pour l'activer.

Si vous faites partie de plusieurs organisations, les sous-domaines personnalisés vous aident à identifier la source d'une alerte ou d'une notification. Ils peuvent également vous rediriger immédiatement vers l'organisation associée au sous-domaine.

Par exemple, l'URL `https://app.datadoghq.com/event/event?id=1` est associée à un événement dans l'organisation A. Si un utilisateur fait partie de l'organisation A et de l'organisation B, mais qu'il consulte Datadog dans le contexte de l'organisation B, alors cette URL renvoie une erreur `404 Not Found`. L'utilisateur doit revenir sur l'organisation A à l'aide du [menu des paramètres du compte utilisateur][1] et consulter de nouveau l'URL. À l'inverse, avec des sous-domaines personnalisés, l'utilisateur peut consulter l'URL `https://org-a.datadoghq.com/event/event?id=1`, car le contexte de l'utilisateur est automatiquement basculé vers l'organisation A afin d'afficher la page appropriée.

**Remarque** : si vous utilisez un sous-domaine personnalisé, modifiez manuellement les liens de la documentation Datadog en indiquant le nom de votre sous-domaine. Par exemple, remplacez un lien redirigeant vers `https://**app**.datadoghq.com/account/settings` par `https://**<nom_sous-domaine_personnalisé>**.datadoghq.com/account/settings`.

## Configurer SAML

La configuration SAML n'est pas _pas_ transmise de l'organisation parent aux organisations enfant. Le protocole SAML doit être configuré pour chaque organisation enfant.

Pour configurer le protocole SAML pour plusieurs organisations :

1. Créez une organisation en tant qu'utilisateur distinct, avec un mot de passe et un nom d'utilisateur différents.
2. Invitez des utilisateurs SAML.
3. Connectez-vous en tant qu'utilisateur SAML et configurez SAML.

### Organisations parent en SAML strict

Dans certains cas, il peut arriver que vous n'ayez pas accès à une organisation enfant qui vient d'être créée. Lorsqu'une organisation impose que les utilisateurs se connectent via SAML, il est possible qu'aucun mot de passe ne soit défini pour les comptes utilisateur. Étant donné que les organisations enfant n'héritent pas des paramètres SAML de leurs parents, la connexion à l'organisation enfant nécessite un mot de passe qui n'existe pas.

Pour être en mesure de vous connecter à une organisation enfant créée à partir d'une organisation parent en SAML strict, suivez les étapes ci-dessous dans l'organisation parent :
1. Cliquez sur **Organization Settings** depuis le menu Account de la barre de navigation en bas à gauche, ou sélectionnez **Organization Settings** depuis la liste déroulante en haut de la page Personal Settings.
2. Dans le menu de gauche, sélectionnez **Users**.
3. Sélectionnez votre profil utilisateur.
4. Activez l'option **Override Default Login Methods**.
5. Sous **Select user's login methods**, cochez la case **Password**.
6. Assurez-vous qu'un mot de passe est défini pour votre compte. Si vous avez besoin d'aide pour définir un mot de passe, contactez l'[assistance Datadog][2].

Après avoir suivi les étapes ci-dessus, vous serez en mesure de vous connecter au compte parent à l'aide d'une adresse e-mail et d'un mot de passe. Une fois votre organisation enfant créée, vous pourrez également vous y connecter avec ces mêmes identifiants.

Si vous avez déjà créé l'organisation enfant et que vous ne pouvez pas vous connecter, cette procédure vous permettra de remédier au problème.

## Utilisation pour plusieurs organisations

L'organisation parent peut consulter l'utilisation totale et l'utilisation facturée de toutes ses organisations (parent et enfant) en survolant son nom d'utilisateur en bas à gauche, puis en accédant à **Plan & Usage** > **Usage**.

La page Usage indique l'utilisation globale de l'organisation parent et de toutes ses organisations enfant. Elle comprend deux onglets :

* Overall
* Individual Organizations

### Utilisation globale

L'onglet Overall comporte les sections Month-to-Date Total Usage et Overall Usage.

La première section résume votre utilisation mensuelle des hosts, des conteneurs, des métriques custom et de toute autre partie de la plateforme que vous avez utilisée au cours du mois. Ces données englobent votre organisation parent et toutes ses organisations enfant.

{{< img src="account_management/multi-org-v2.png" alt="Month-to-Date Usage" >}}

Par défaut, la plupart des comptes peuvent consulter dans la vue Billable les données d'utilisation facturables. Cette vue détaille également l'utilisation à la demande dépassant vos engagements et vos allocations. La vue All affiche l'ensemble de vos données d'utilisation, y compris les données d'utilisation non facturables (par exemple, pour les versions d'essai).

La section Overall Usage indique l'utilisation globale mensuelle de toutes les organisations au cours des 6 derniers mois. Il s'agit de l'utilisation totale, et non de l'utilisation facturable, ce qui signifie qu'elle ne tient pas compte des périodes d'évaluation ni d'autres ajustements effectués pour calculer votre facture finale. Vous pouvez télécharger ces données sous forme de fichier CSV.

{{< img src="account_management/multi-org-v2-trends.png" alt="Tendances à long terme de l'utilisation globale" >}}

Vous pouvez filtrer les données de ces deux sections en cliquant sur les sous-onglets de chaque solution. L'onglet Log Management contient le tableau Logs Usage by Index. Ce dernier présente votre utilisation des logs indexés pour le mois en cours et le mois précédent en fonction des éléments suivants :

* Le nom de l'index
* L'organisation
* Période de rétention en jours
* Le nombre de logs indexés, réparti entre les logs actuels et les logs réintégrés
* Le pourcentage de contribution de l'index à l'utilisation globale des logs indexés

Ces données peuvent être téléchargées sous forme de fichier CSV.

{{< img src="account_management/multi-org-v2-logs-by-index.png" alt="Utilisation des logs de plusieurs organisations par index" >}}

### Utilisation de chaque organisation

Vous pouvez consulter l'utilisation de vos organisations enfant depuis l'onglet **Individual Organizations**, que ce soit en unités absolues ou sous la forme d'un pourcentage de l'utilisation totale.

{{< img src="account_management/multi-org-percent-billable-v2.png" alt="Utilisation individuelle en pourcentage" >}}

Par défaut, la vue Billable est sélectionnée. Elle indique l'utilisation prise en compte dans votre facture finale. Cette vue n'affiche pas les organisations enfant qui ne sont pas facturables, notamment les organisations en version d'essai, et tient compte d'autres ajustements permettant d'établir un descriptif plus précis des frais comptabilisés votre facture. Basculez sur la vue All pour afficher l'utilisation brute et non ajustée de votre organisation parent et de toutes vos organisations enfant. Vous pouvez télécharger les données de ces deux vues sous forme de fichier CSV.

Pour consulter les [détails d'utilisation][8] d'une organisation enfant, cliquez sur son nom.

## Attribution de l'utilisation

L'organisation parent peut consulter l'utilisation des organisations enfant en fonction des clés de tag existantes sur la page [Usage Attribution][9]. Les administrateurs peuvent survoler leur nom d'utilisateur en bas à gauche, puis accéder à : `Plan & Usage`--> `Usage Attribution`.

Lorsqu'elle est activée au niveau de l'organisation parent, l'attribution de l'utilisation indique l'utilisation globale par toutes les organisations. Ces informations peuvent s'avérer utiles si vous souhaitez attribuer l'utilisation de vos organisations enfant à des projets, équipes ou autres groupes spécifiques.

Voici quelques-unes des fonctionnalités :

* Changement et ajout de nouvelles clés de tag (trois maximum)
* Visualisation des données d'utilisation mensuelle dans l'IU et sous forme de téléchargement au format .tsv (valeurs séparées par des tabulations)
* Visualisation des données d'utilisation quotidienne dans un fichier .tsv pour la plupart des types d'utilisation

{{< img src="account_management/billing/advanced-usage-reporting-03.png" alt="Tableau de résumé de l'utilisation" >}}

La fonction d'attribution de l'utilisation peut également être activée au niveau de l'organisation enfant. Lorsqu'elle est activée à ce niveau, les tags ne sont appliqués qu'à cette organisation enfant et ne peuvent être consultés que dans cette organisation enfant. Les tags appliqués au niveau de l'organisation enfant ne sont pas disponibles dans l'organisation parent.

Remarque : les types d'utilisations suivants ne sont pas pris en charge par cet outil.

* Événements de log indexés
* Logs ingérés
* Spans indexées (conservées par des filtres de rétention)

L'attribution de l'utilisation est une fonction avancée incluse dans la formule Enterprise. Pour toutes les autres formules, contactez votre chargé de compte ou envoyez un e-mail à <a href="mailto:success@datadoghq.com">success@datadoghq.com</a>.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/#managing-your-organizations
[2]: /fr/help/
[3]: https://app.datadoghq.com/account/new_org
[4]: mailto:success@datadoghq.com
[5]: /fr/api/
[6]: https://www.datadoghq.com/blog/managing-datadog-with-terraform
[7]: /fr/monitors/manage/
[8]: /fr/account_management/billing/usage_details/
[9]: /fr/account_management/billing/usage_attribution/