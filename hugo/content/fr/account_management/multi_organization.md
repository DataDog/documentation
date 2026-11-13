---
aliases:
- /fr/guides/multiaccountorg
- /fr/account_management/mult_account
- /fr/account_management/faq/what-data-from-my-sub-organizations-can-i-see-in-my-parent-account
- /fr/account_management/multi_organisations
description: Gérez plusieurs organisations enfants à partir d'un compte parent avec
  une facturation distincte, un suivi de l'utilisation distinct et un contrôle d'accès
  distinct pour les fournisseurs de services managés.
further_reading:
- link: https://www.datadoghq.com/blog/volkswagen-organizations/
  tag: Blog
  text: Bonnes pratiques pour gérer les organisations Datadog à grande échelle
- link: /account_management/saml/
  tag: Documentation
  text: Configurer SAML pour votre compte Datadog
- link: /account_management/billing/usage_details
  tag: Documentation
  text: En savoir plus sur les détails d'utilisation
- link: /account_management/billing/usage_attribution
  tag: Documentation
  text: Configurer l'attribution de l'utilisation
- link: /account_management/org_settings/cross_org_visibility
  tag: Documentation
  text: Visibilité entre organisations
title: Gestion des comptes multi-organisations
---
## Présentation {#overview}

Il est possible de gérer plusieurs organisations enfants à partir d'un compte parent. Ceci est généralement utilisé par les fournisseurs de services managés qui ont des clients qui ne doivent pas avoir accès aux données des autres. 

La fonctionnalité de compte multi-organisation n'est pas activée par défaut. Contactez le [support Datadog][1] pour l'activer.

## Fonctionnalités {#capabilities}

Les utilisateurs peuvent être ajoutés à l'organisation parente et à plusieurs organisations enfants. Les utilisateurs basculent entre les organisations depuis le [menu des paramètres du compte utilisateur][2]. 

Les organisations au sein d'une organisation parente n'ont pas accès aux données des autres. Pour activer les requêtes de métriques inter-organisations, consultez la [visibilité inter-organisations][3].

L'organisation parente peut consulter l'utilisation des organisations enfants individuelles, ce qui lui permet de suivre les tendances d'utilisation.

Les paramètres du compte, tels que les adresses IP autorisées, ne sont pas transmis par l'organisation parent à l'organisation enfant.

## Organisations enfants {#child-organizations}

### Créer {#create}

1. Une fois la fonctionnalité activée, consultez la [New Organization Page][4].
2. Saisissez le nom de l'organisation enfant que vous souhaitez créer. **Le nom de l'organisation enfant ne peut pas dépasser 32 caractères.**
3. Vous pouvez éventuellement inviter des utilisateurs administrateurs dans votre organisation enfant :
    - Saisissez une ou plusieurs adresses e-mail.
    - Les utilisateurs invités se voient attribuer le [rôle Datadog Admin][5]. Vous pouvez inviter davantage d'utilisateurs dans
Vous pouvez inviter davantage d'utilisateurs dans les Paramètres de l'organisation après avoir créé votre organisation.
    - Si l'utilisateur n'a pas de mot de passe, Datadog envoie une invitation par e-mail avec un lien pour définir un mot de passe et rejoindre la nouvelle organisation enfant.
4. Cliquez sur {{< ui >}}Create{{< /ui >}}.

La nouvelle organisation enfant hérite du plan de l'organisation parente et est ajoutée au compte de facturation de l'organisation parente. Si vous souhaitez mettre à jour la facturation de l'organisation enfant, [contactez votre représentant commercial][6].

### Contenu {#content}

L'intégration d'une nouvelle sous-organisation avec un ensemble de dashboards et de monitors de référence peut être effectuée par programmation avec la [Datadog API][7] et des outils tels que Terraform, voir [Gérer Datadog avec Terraform][8]. De plus, des scripts peuvent être utilisés pour sauvegarder les dashboards et [monitors][9] existants sous forme de code.

### Sous-domaines personnalisés {#custom-sub-domains}

La fonctionnalité de sous-domaine personnalisé n'est pas activée par défaut. Contactez le [support Datadog][1] pour l'activer.

Si vous êtes membre de plusieurs organisations, les sous-domaines personnalisés vous aident à identifier la source d'une alerte ou d'une notification. De plus, ils peuvent vous faire basculer immédiatement vers l'organisation associée au sous-domaine.

Par exemple, l'URL **https:{{< region-param key=dd_full_site >}}/event/event?id=1**est associée à un événement dans l'Organisation A. Si un utilisateur est membre à la fois de l'Organisation A et de l'Organisation B, mais qu'il consulte Datadog dans le contexte de l'Organisation B, alors cette URL renvoie une `404 Not Found error`. L'utilisateur doit basculer vers l'Organisation A en utilisant le [menu des paramètres du compte utilisateur][2], puis consulter à nouveau l'URL. Cependant, avec des sous-domaines personnalisés, l'utilisateur pourrait naviguer vers**https://org-a.{{< region-param key=dd_site >}}/event/event?id=1**ce qui basculerait automatiquement le contexte de l'utilisateur vers l'Organisation A et afficherait la page correcte.**Remarque** : Si vous disposez d'un sous-domaine Datadog personnalisé, modifiez manuellement les liens de la documentation Datadog avec le nom de votre sous-domaine. Par exemple, un lien redirigeant vers**https:{{< region-param key=dd_full_site >}}/account/settings**devient**https://<custom_sub-domain_name>.{{< region-param key=dd_site >}}/account/settings**.

## Configurer SAML {#set-up-saml}

La configuration SAML n'est _pas_ héritée par les organisations enfants depuis l'organisation parente. SAML doit être configuré individuellement pour chaque organisation enfant.

Pour configurer le protocole SAML pour plusieurs organisations :

1. Créer une nouvelle organisation.
2. Inviter des utilisateurs SAML.
3. Connectez-vous en tant qu'utilisateur SAML et [configurez SAML][10].

### Organisations parentes strictes SAML {#saml-strict-parent-organizations}

Dans certaines circonstances, vous pourriez être dans l'impossibilité d'accéder à une organisation enfant nouvellement créée. Lorsqu'une organisation exige que les utilisateurs se connectent via SAML, ses comptes utilisateurs peuvent ne pas avoir de mot de passe. Comme les organisations enfants n'héritent pas des paramètres SAML de leurs parents, la connexion à l'organisation enfant nécessite un mot de passe qui n'existe pas.

Pour être en mesure de vous connecter à une organisation enfant créée à partir d'une organisation parent en SAML strict, suivez les étapes ci-dessous dans l'organisation parent :
1. Cliquez sur {{< ui >}}Organization Settings{{< /ui >}} depuis le menu du compte en bas de la navigation latérale gauche, ou sélectionnez {{< ui >}}Organization Settings{{< /ui >}} dans le menu déroulant de l'en-tête en haut de la page Paramètres personnels.
2. Dans le menu de gauche de la page, sélectionnez {{< ui >}}Users{{< /ui >}}.
3. Sélectionnez votre profil utilisateur.
4. Placez le commutateur {{< ui >}}Override Default Login Methods{{< /ui >}} sur la position activée.
5. Sous {{< ui >}}Select user's login methods{{< /ui >}}, cochez la case {{< ui >}}Password{{< /ui >}}.
6. Assurez-vous que votre compte possède un mot de passe. Si vous avez besoin d'aide pour définir un mot de passe, contactez le [support Datadog][1].

Suivre les étapes ci-dessus garantit que vous pouvez vous connecter au compte parent en utilisant une combinaison d'e-mail et de mot de passe. Après avoir créé votre organisation enfant, vous pouvez également vous y connecter en utilisant votre adresse e-mail et votre mot de passe.

Si vous avez déjà créé l'organisation enfant et que vous ne pouvez pas vous connecter, cette procédure vous permettra de remédier au problème.

## Utilisation multi-organisation {#multi-org-usage}

L'organisation parente peut consulter l'utilisation totale et facturable de toutes ses organisations (organisations enfant et parente) en survolant son nom d'utilisateur dans le coin inférieur gauche et en accédant à [**Plan et utilisation** > **Utilisation et coût**][11].

La page Utilisation affiche l'utilisation globale de l'organisation parente et de toutes ses organisations enfant. Il y a deux onglets sur la page Utilisation :

* {{< ui >}}Overall{{< /ui >}}
* {{< ui >}}Individual Organizations{{< /ui >}}

### Utilisation globale {#overall-usage}

L'onglet Overall comporte les sections Month-to-Date Total Usage et Overall Usage.

La première section résume votre utilisation mensuelle des hosts, des conteneurs, des métriques custom et de toute autre composante de la plateforme que vous avez utilisée au cours du mois. Ces données englobent votre organisation parent et toutes ses organisations enfant.

{{< img src="account_management/multi-org-v2.png" alt="Month-to-Date Usage" >}}

La plupart des comptes peuvent par défaut consulter l'utilisation « Facturable », qui montre l'utilisation contribuant à votre facture finale. Cette vue détaille également l'utilisation à la demande au-delà de vos engagements et allocations. La vue « Tout » vous montre l'ensemble de l'utilisation, y compris l'utilisation non facturable telle que les essais de produits.

La section Utilisation globale affiche l'utilisation globale mensuelle de toutes les organisations au cours des 6 derniers mois. L'utilisation affichée ici est l'utilisation « Tout » et non l'utilisation « Facturable », ce qui signifie qu'elle ne tient pas compte des périodes d'essai ou d'autres modifications de facturation utilisées pour calculer votre facture finale. Ces données peuvent être téléchargées sous forme de fichier CSV.

{{< img src="account_management/multi-org-v2-trends.png" alt="Tendances à long terme de l'utilisation globale" >}}

Les sections Utilisation totale du mois en cours et Utilisation globale peuvent toutes deux être filtrées en cliquant sur les sous-onglets spécifiques aux produits. Dans le sous-onglet « Log Management », vous pouvez consulter le tableau Utilisation des logs par index, qui affiche votre utilisation de logs indexés pour le mois en cours et le mois dernier par :

* Nom de l'index
* Organisation
* Période de rétention en jours
* Nombre de logs indexés répartis entre les logs en direct et les logs réhydratés
* Pourcentage de contribution de l'index à l'utilisation globale des logs indexés

Ces données peuvent être téléchargées en tant que fichier CSV.

{{< img src="account_management/multi-org-v2-logs-by-index.png" alt="Utilisation des logs multi-organisations par index" >}}

### Utilisation individuelle de l'organisation {#individual-organization-usage}

Sur l'onglet d'utilisation {{< ui >}}Individual Organizations{{< /ui >}}, vous pouvez consulter l'utilisation de vos organisations enfants en unités absolues ou en pourcentage de l'utilisation totale.

La vue par défaut est la vue « Facturable », qui affiche l'utilisation qui contribue à votre facture finale. Cette vue supprime les organisations enfants qui ne sont pas facturables, telles que les organisations d'essai, et d'autres ajustements qui fournissent un résumé plus précis de ce qui influence votre facture. Passez à la vue « Tout » pour voir l'utilisation brute et non ajustée de votre organisation parente et de toutes les organisations enfants. Les deux vues peuvent être téléchargées sous forme de fichier CSV.

Pour consulter les [Usage Details][12] d'une organisation enfant, vous pouvez cliquer sur le nom de l'organisation enfant.

## Attribution de l'utilisation {#usage-attribution}

L'organisation parente peut consulter l'utilisation des organisations enfants par clés de tag existantes sur la page [Usage Attribution][13]. Les administrateurs peuvent survoler leur nom d'utilisateur en bas à gauche, puis accéder à : [**Plan & Usage > Usage Attribution**][14].

Lorsqu'elle est activée au niveau de l'organisation parente, l'attribution de l'utilisation affiche l'utilisation agrégée pour toutes les organisations. Cela peut être utile si vous souhaitez attribuer l'utilisation de vos organisations enfants à certains projets, équipes ou autres regroupements.

Voici quelques-unes des fonctionnalités :

* Modification et ajout de nouvelles clés de tag (jusqu'à trois).
* Accès à l'utilisation mensuelle dans l'UI et sous forme de téléchargement .tsv (valeurs séparées par des tabulations)
* Accès à l'utilisation quotidienne dans un fichier .tsv pour la plupart des types d'utilisation.

{{< img src="account_management/billing/usage_attribution/Usage-Attribution-Monthly-Facets.png" alt="Rapport d'attribution de l'utilisation mensuelle" style="width:100%;" >}}

L'attribution de l'utilisation peut également être activée au niveau de l'organisation enfant. Lorsqu'elle est activée à ce niveau, les tags ne sont appliqués qu'à cette organisation enfant spécifique et ne peuvent être consultés que dans cette organisation enfant. Les tags appliqués au niveau de l'organisation enfant ne se propagent pas et ne peuvent pas être consultés dans l'organisation parente.

L'attribution de l'utilisation est une fonctionnalité avancée incluse dans le forfait Enterprise. Pour tous les autres plans, contactez votre chargé de compte ou [success@datadoghq.com][6].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/help/
[2]: /fr/account_management/#managing-your-organizations
[3]: /fr/account_management/org_settings/cross_org_visibility/
[4]: https://app.datadoghq.com/account/new_org
[5]: /fr/account_management/rbac/permissions/#advanced-permissions
[6]: mailto:success@datadoghq.com
[7]: /fr/api/
[8]: https://www.datadoghq.com/blog/managing-datadog-with-terraform
[9]: /fr/monitors/manage/
[10]: /fr/account_management/saml/
[11]: https://app.datadoghq.com/billing/usage?cost_summary
[12]: /fr/account_management/plan_and_usage/usage_details/
[13]: /fr/account_management/billing/usage_attribution/
[14]: https://app.datadoghq.com/billing/usage-attribution