---
title: Gestion des comptes multi-organisations
aliases:
  - /guides/multiaccountorg
  - /account_management/mult_account
  - /account_management/faq/what-data-from-my-sub-organizations-can-i-see-in-my-parent-account
  - /account_management/multi_organisations
further_reading:
- link: "https://docs.datadoghq.com/account_management/multi_organization/"
  tag: "Blog"
  text: "Meilleures pratiques pour la gestion des organisations Datadog à grande échelle (en anglais)"
- link: "/account_management/saml/"
  tag: "Documentation"
  text: "Configurer SAML pour votre compte Datadog"
- link: "/account_management/billing/usage_details"
  tag: "Documentation"
  text: "En savoir plus sur les détails d'utilisation"
- link: "/account_management/billing/usage_attribution"
  tag: "Documentation"
  text: "Configurer l'attribution de l'utilisation"
- link: "/account_management/org_settings/cross_org_visibility"
  tag: "Documentation"
  text: "Visibilité entre organisations"
---

## Section Overview

Il est possible de gérer plusieurs organisations enfants à partir d'un compte d'organisation parente. Cette configuration est généralement utilisée par des prestataires de services managés (MSP) dont les clients ne doivent pas avoir accès aux données des autres.

La fonctionnalité de compte multi-organisations n'est pas activée par défaut. Contactez l'[assistance Datadog][1] pour l'activer.

## Fonctionnalités

Les utilisateurs peuvent être ajoutés à l'organisation parente et à plusieurs organisations enfants. Ils peuvent ensuite passer d'une organisation à une autre depuis le [menu des paramètres du compte utilisateur][2].

Les organisations appartenant à une même organisation parente n'ont pas accès aux données des autres. Pour activer les requêtes inter-organisations sur les métriques, consultez la section [visibilité entre organisations][3].

L'organisation parente peut consulter l'utilisation de chaque organisation enfant individuellement, ce qui lui permet de suivre les tendances de consommation.

Les paramètres du compte, tels que les adresses IP autorisées, ne sont pas transmis par l'organisation parent à l'organisation enfant.

## Organisations enfant

### Création

1. Une fois la fonctionnalité activée, consultez la [page relative aux nouvelles organisations][4].
2. Saisissez le nom de l'organisation enfant que vous souhaitez créer. **Le nom de l'organisation enfant ne peut pas dépasser 32 caractères.**
3. Vous pouvez aussi inviter des utilisateurs admin dans votre organisation enfant :
    - Saisissez une ou plusieurs adresses électroniques.
    - Les utilisateurs invités se voient attribuer le [rôle d'administrateur Datadog][5]. Vous pouvez inviter d'autres utilisateurs par la suite.
Paramètres d'organisation après la création de votre organisation.
    - Si l'utilisateur n'a pas encore de mot de passe, Datadog envoie un e-mail d'invitation contenant un lien pour définir un mot de passe et rejoindre la nouvelle organisation enfant.
4. Cliquez sur **Create**.

La nouvelle organisation enfant hérite de la formule de l'organisation parent et est ajoutée au compte de facturation de l'organisation parente. Si vous souhaitez mettre à jour la facturation de l'organisation enfant, [contactez votre représentant commercial][6].

### Contenu

Vous pouvez programmer l'intégration d'une nouvelle sous-organisation à un ensemble de monitors et de dashboards de référence avec [l'API Datadog][7], ou avec des outils comme Terraform. Consultez notre article de blog [Gérer Datadog avec Terraform][8] (en anglais) pour en savoir plus. En outre, il est possible d'utiliser des scripts pour sauvegarder vos dashboards et [monitors][9] existants sous forme de code.

### Sous-domaines personnalisés

La fonctionnalité de sous-domaine personnalisé n'est pas activée par défaut. Contactez l'[assistance Datadog][1] pour l'activer.

Si vous êtes membre de plusieurs organisations, les sous-domaines personnalisés vous aident à identifier l'origine d'une alerte ou d'une notification. Ils peuvent également vous faire basculer automatiquement vers l'organisation associée au sous-domaine. 
{{% site-region region="us,us3,us5,ap1,ap2" %}} 
Par exemple, l'URL `https://app.datadoghq.com/event/event?id=1` est associée à un événement dans l'Organisation A. Si un utilisateur est membre des Organisations A et B, mais qu'il consulte Datadog dans le contexte de l'Organisation B, l'URL retourne une erreur `404 Not Found`. L'utilisateur doit alors passer à l'Organisation A depuis le [menu des paramètres de compte utilisateur][2], puis revisiter l'URL. Avec un sous-domaine personnalisé, il peut simplement accéder à `https://org-a.datadoghq.com/event/event?id=1`, ce qui basculera automatiquement son contexte vers l'Organisation A et affichera la page correcte.

**Remarque** : si vous utilisez un sous-domaine personnalisé, modifiez manuellement les liens de la documentation Datadog en indiquant le nom de votre sous-domaine. Par exemple, remplacez un lien redirigeant vers `https://**app**.datadoghq.com/account/settings` par `https://**<custom_sub-domain_name>**.datadoghq.com/account/settings`. {{% /site-region %}}

{{% site-region region="eu" %}}
Par exemple, l'URL `https://app.datadoghq.eu/event/event?id=1` est associée à un événement dans l'organisation A. Si un utilisateur fait partie de l'organisation A et de l'organisation B, mais qu'il consulte Datadog dans le contexte de l'organisation B, alors cette URL renvoie une erreur `404 Not Found`. L'utilisateur doit revenir sur l'organisation A à l'aide du [menu des paramètres du compte utilisateur][2] et consulter de nouveau l'URL. À l'inverse, avec des sous-domaines personnalisés, l'utilisateur peut consulter l'URL `https://org-a.datadoghq.eu/event/event?id=1`, car le contexte de l'utilisateur est automatiquement basculé vers l'organisation A afin d'afficher la page appropriée.

**Remarque** : si vous utilisez un sous-domaine personnalisé, modifiez manuellement les liens de la documentation Datadog en indiquant le nom de votre sous-domaine. Par exemple, remplacez un lien redirigeant vers `https://**app**.datadoghq.eu/account/settings` par `https://**<custom_sub-domain_name>**.datadoghq.eu/account/settings`. {{% /site-region %}}

{{% site-region region="gov" %}}
Par exemple, l'URL `https://app.ddog-gov.com/event/event?id=1` est associée à un événement dans l'organisation A. Si un utilisateur fait partie de l'organisation A et de l'organisation B, mais qu'il consulte Datadog dans le contexte de l'organisation B, alors cette URL renvoie une erreur `404 Not Found`. L'utilisateur doit revenir sur l'organisation A à l'aide du [menu des paramètres du compte utilisateur][2] et consulter de nouveau l'URL. À l'inverse, avec des sous-domaines personnalisés, l'utilisateur peut consulter l'URL `https://org-a.ddog-gov.com/event/event?id=1`, car le contexte de l'utilisateur est automatiquement basculé vers l'organisation A afin d'afficher la page appropriée.

**Remarque** : si vous utilisez un sous-domaine personnalisé, modifiez manuellement les liens de la documentation Datadog en indiquant le nom de votre sous-domaine. Par exemple, remplacez un lien redirigeant vers `https://**app**.ddog-gov.com/account/settings` par `https://**<custom_sub-domain_name>**.ddog-gov.com/account/settings`. {{% /site-region %}}

## Configurer SAML

La configuration SAML n'est pas _pas_ transmise de l'organisation parent aux organisations enfant. Le protocole SAML doit être configuré pour chaque organisation enfant.

Pour configurer le protocole SAML pour plusieurs organisations :

1. Créez une nouvelle organisation.
2. Invitez des utilisateurs SAML.
3. Connectez-vous en tant qu'utilisateur SAML et [configurez SAML][10].

### Organisations parent en SAML strict

Dans certains cas, il peut arriver que vous n'ayez pas accès à une organisation enfant qui vient d'être créée. Lorsqu'une organisation impose que les utilisateurs se connectent via SAML, il est possible qu'aucun mot de passe ne soit défini pour les comptes utilisateur. Étant donné que les organisations enfant n'héritent pas des paramètres SAML de leurs parents, la connexion à l'organisation enfant nécessite un mot de passe qui n'existe pas.

Pour être en mesure de vous connecter à une organisation enfant créée à partir d'une organisation parent en SAML strict, suivez les étapes ci-dessous dans l'organisation parent :
1. Cliquez sur **Organization Settings** depuis le menu Account de la barre de navigation en bas à gauche, ou sélectionnez **Organization Settings** depuis la liste déroulante en haut de la page Personal Settings.
2. Dans le menu de gauche, sélectionnez **Users**.
3. Sélectionnez votre profil utilisateur.
4. Activez l'option **Override Default Login Methods**.
5. Sous **Select user's login methods**, cochez la case **Password**.
6. Assurez-vous qu'un mot de passe est défini pour votre compte. Si vous avez besoin d'aide pour définir un mot de passe, contactez l'[assistance Datadog][1].

Après avoir suivi les étapes ci-dessus, vous serez en mesure de vous connecter au compte parent à l'aide d'une adresse e-mail et d'un mot de passe. Une fois votre organisation enfant créée, vous pourrez également vous y connecter avec ces mêmes identifiants.

Si vous avez déjà créé l'organisation enfant et que vous ne pouvez pas vous connecter, cette procédure vous permettra de remédier au problème.

## Utilisation pour plusieurs organisations

L'organisation parent peut consulter l'utilisation totale et l'utilisation facturée de toutes ses organisations (parent et enfant) en survolant son nom d'utilisateur en bas à gauche, puis en accédant à [**Plan & Usage** > **Usage & Cost**][11].

La page Usage indique l'utilisation globale de l'organisation parent et de toutes ses organisations enfant. Elle comprend deux onglets :

* Overall
* Individual Organizations

### Utilisation globale

L'onglet Overall comporte les sections Month-to-Date Total Usage et Overall Usage.

La première section résume votre utilisation mensuelle des hosts, des conteneurs, des métriques custom et de toute autre composante de la plateforme que vous avez utilisée au cours du mois. Ces données englobent votre organisation parent et toutes ses organisations enfant.

{{< img src="account_management/multi-org-v2.png" alt="Month-to-Date Usage" >}}

Par défaut, la plupart des comptes peuvent consulter dans la vue Billable les données d'utilisation facturables. Cette vue détaille également l'utilisation à la demande dépassant vos engagements et vos allocations. La vue All affiche l'ensemble de vos données d'utilisation, y compris les données d'utilisation non facturables (par exemple, pour les versions d'essai).

La section Overall Usage indique l'utilisation globale mensuelle de toutes les organisations au cours des 6 derniers mois. Il s'agit de l'utilisation totale, et non de l'utilisation facturable, ce qui signifie qu'elle ne tient pas compte des périodes d'évaluation ni d'autres ajustements effectués pour calculer votre facture finale. Vous pouvez télécharger ces données sous forme de fichier CSV.

{{< img src="account_management/multi-org-v2-trends.png" alt="Tendances à long terme de l'utilisation globale" >}}

Vous pouvez filtrer les données de ces deux sections en cliquant sur les sous-onglets de chaque solution. L'onglet Log Management contient le tableau Logs Usage by Index. Ce dernier présente votre utilisation des logs indexés pour le mois en cours et le mois précédent en fonction des éléments suivants :

* Le nom de l'index
* Organisation
* Période de rétention en jours
* Le nombre de logs indexés, réparti entre les logs actuels et les logs réintégrés
* Le pourcentage de contribution de l'index à l'utilisation globale des logs indexés

Ces données peuvent être téléchargées sous forme de fichier CSV.

{{< img src="account_management/multi-org-v2-logs-by-index.png" alt="Utilisation des logs de plusieurs organisations par index" >}}

### Utilisation de chaque organisation

Vous pouvez consulter l'utilisation de vos organisations enfant depuis l'onglet **Individual Organizations**, que ce soit en unités absolues ou sous la forme d'un pourcentage de l'utilisation totale.

Par défaut, la vue Billable est sélectionnée. Elle indique l'utilisation prise en compte dans votre facture finale. Cette vue n'affiche pas les organisations enfant qui ne sont pas facturables, notamment les organisations en version d'essai, et tient compte d'autres ajustements permettant d'établir un descriptif plus précis des frais comptabilisés votre facture. Basculez sur la vue All pour afficher l'utilisation brute et non ajustée de votre organisation parent et de toutes vos organisations enfant. Vous pouvez télécharger les données de ces deux vues sous forme de fichier CSV.

Pour consulter les [détails d'utilisation][12] d'une organisation enfant, cliquez sur son nom.

## Attribution de l'utilisation

L'organisation parent peut consulter l'utilisation des organisations enfant en fonction des clés de tag existantes sur la page [Usage Attribution][13]. Les administrateurs peuvent survoler leur nom d'utilisateur en bas à gauche, puis accéder à : [**Plan & Usage > Usage Attribution**][14].

Lorsqu'elle est activée au niveau de l'organisation parent, l'attribution de l'utilisation indique l'utilisation globale par toutes les organisations. Ces informations peuvent s'avérer utiles si vous souhaitez attribuer l'utilisation de vos organisations enfant à des projets, équipes ou autres groupes spécifiques.

Voici quelques-unes des fonctionnalités :

* Changement et ajout de nouvelles clés de tag (trois maximum)
* Visualisation des données d'utilisation mensuelle dans l'IU et sous forme de téléchargement au format .tsv (valeurs séparées par des tabulations)
* Visualisation des données d'utilisation quotidienne dans un fichier .tsv pour la plupart des types d'utilisation

{{< img src="account_management/billing/usage_attribution/Usage-Attribution-Monthly-Facets.png" alt="Rapport mensuel d'attribution de l'utilisation" style="width:100%;" >}}

La fonction d'attribution de l'utilisation peut également être activée au niveau de l'organisation enfant. Lorsqu'elle est activée à ce niveau, les tags ne sont appliqués qu'à cette organisation enfant et ne peuvent être consultés que dans cette organisation enfant. Les tags appliqués au niveau de l'organisation enfant ne sont pas disponibles dans l'organisation parent.

L'attribution de l'utilisation est une fonction avancée incluse dans la formule Enterprise. Pour toutes les autres formules, contactez votre chargé de compte ou envoyez un e-mail à <a href="mailto:success@datadoghq.com">success@datadoghq.com</a>.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /account_management/#managing-your-organizations
[3]: /account_management/org_settings/cross_org_visibility/
[4]: https://app.datadoghq.com/account/new_org
[5]: /account_management/rbac/permissions/#advanced-permissions
[6]: mailto:success@datadoghq.com
[7]: /api/
[8]: https://www.datadoghq.com/blog/managing-datadog-with-terraform
[9]: /monitors/manage/
[10]: /account_management/saml/
[11]: https://app.datadoghq.com/billing/usage?cost_summary
[12]: /account_management/plan_and_usage/usage_details/
[13]: /account_management/billing/usage_attribution/
[14]: https://app.datadoghq.com/billing/usage-attribution
