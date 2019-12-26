---
title: Gestion des comptes multi-organisations
kind: documentation
aliases:
  - /fr/guides/multiaccountorg
  - /fr/account_management/mult_account
  - /fr/account_management/faq/what-data-from-my-sub-organizations-can-i-see-in-my-parent-account
  - /fr/account_management/multi_organisations
further_reading:
  - link: account_management/saml
    tag: Documentation
    text: Configurer SAML pour votre compte Datadog
---
Il est possible de gérer plusieurs organisations enfant à partir d'un compte d'organisation parent. Cette fonctionnalité sert généralement aux prestataires de services gérés qui possèdent des clients qui ne doivent pas accéder aux données des autres clients. Les utilisateurs peuvent être ajoutés à l'organisation parent ou à plusieurs organisations enfant et passer d'une organisation à une autre depuis le [menu des paramètres du compte utilisateur][1].

Les paramètres du compte, telles que les adresses IP autorisées, ne sont pas transmis de l'organisation parent à l'organisation enfant.

La fonctionnalité de compte multi-organisations n'est pas activée par défaut. Contactez l'[assistance Datadog][2] pour l'activer.

Voici une présentation vidéo de deux minutes à ce sujet :

{{< wistia tg9ufqbin9>}}
<br>
## Organisations enfant

### Création

1. Une fois la fonctionnalité activée, accédez à la [page New Account][3].
2. Saisissez le nom de l'organisation enfant que vous souhaitez créer et cliquez sur le bouton **Create**. **Le nom de l'organisation enfant ne doit pas dépasser 32 caractères**.

La nouvelle organisation enfant est créée sous la forme d'un compte d'essai gratuit de 14 jours. Vous pouvez modifier le plan de facturation via les [paramètres du compte de l'organisation][4]. Si vous souhaitez ajouter la facturation de l'organisation enfant au compte de facturation de votre organisation parent, [contactez votre représentant commercial][5].

### Contenu

Vous pouvez programmer l'intégration d'une nouvelle sous-organisation à un ensemble de monitors et de dashboards de référence avec [l'API Datadog][6], ou avec des outils comme Terraform. Consultez notre article de blog [Gérer Datadog avec Terraform][7] (en anglais) pour en savoir plus. En outre, vous pouvez utiliser des scripts pour sauvegarder vos [dashboards][8] et [monitors][9] existants sous forme de code.

### Sous-domaines personnalisés

La fonctionnalité de sous-domaine personnalisé n'est pas activée par défaut. Contactez l'[assistance Datadog][2] pour l'activer.

Si vous faites partie de plusieurs organisations, les sous-domaines personnalisés vous aident à identifier la source d'une alerte ou d'une notification. Ils peuvent également vous rediriger immédiatement vers l'organisation associée au sous-domaine.

Par exemple, l'URL `https://app.datadoghq.com/event/event?id=1` est associée à un événement dans l'organisation A. Si un utilisateur fait partie de l'organisation A et de l'organisation B, mais qu'il consulte Datadog dans le contexte de l'organisation B, alors cette URL renvoie une erreur `404 Not Found`. L'utilisateur doit revenir sur l'organisation A à l'aide du [menu des paramètres du compte utilisateur][10] et consulter de nouveau l'URL. À l'inverse, avec des sous-domaines personnalisés, l'utilisateur peut consulter l'URL `https://org-a.datadoghq.com/event/event?id=1`, car le contexte de l'utilisateur sera automatiquement basculé vers l'organisation A afin d'afficher la page appropriée.

## Configuration de SAML

Pour configurer SAML pour plusieurs organisations, suivez la procédure suivante :

1. Créez une organisation en tant qu'utilisateur distinct, avec un mot de passe et un nom d'utilisateur différents.
2. Invitez des utilisateurs SAML.
3. Connectez-vous en tant qu'utilisateur SAML et configurez SAML.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/#managing-your-organizations
[2]: /fr/help
[3]: https://app.datadoghq.com/account/new_org
[4]: https://app.datadoghq.com/account/billing
[5]: mailto:success@datadoghq.com
[6]: /fr/api
[7]: https://www.datadoghq.com/blog/managing-datadog-with-terraform
[8]: /fr/graphing/dashboards/screenboard/#backup-my-screenboard
[9]: /fr/monitors/manage_monitor
[10]: /fr/account_management/#managing-your-organizations