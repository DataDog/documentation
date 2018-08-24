---
title: Gestion des comptes à plusieurs organisations
kind: documentation
aliases:
  - /fr/guides/multiaccountorg
  - /fr/account_management/mult_account
  - >-
    /fr/account_management/faq/what-data-from-my-sub-organizations-can-i-see-in-my-parent-account
further_reading:
  - link: account_management/saml
    tag: Documentation
    text: Configurez SAML pour votre compte Datadog
---
Il est possible de gérer plusieurs organisations enfants à partir d'un compte d'organisation parent.
Ceci est généralement utilisé par les  Service Providers qui ont des clients qui ne devraient pas avoir accès aux données des autres. Les utilisateurs peuvent être ajoutés à l'organisation parente et / ou à plusieurs organisations enfants et passer facilement d'une organisation à l'autre dans le [menu user account settings][1].

La fonctionnalité Compte multi-organisations doit être activée par le support. Si c'est une fonctionnalité dont vous avez besoin, [contactez-nous][2]!

## Créer une nouvelle organisation enfant

1. Une fois la fonctionnalité activée, accédez à la page [New Account][3].
2. Entrez le nom de l'organisation enfant que vous souhaitez créer et cliquez sur le bouton **Create**. **Le nom de l'organisation enfant ne peut pas dépasser 32 caractères.**

La nouvelle organisation enfant sera créée en tant que compte d'essai gratuit de 14 jours. Vous pouvez modifier le plan de facturation sur la page [Organization account settings du compte][4]. Si vous souhaitez ajouter la facturation de l'organisation-enfant au compte de facturation de votre organisation-mère, [contactez votre représentant commercial][5].

## Domaines personnalisés pour chaque organisation enfant

La fonctionnalité de domaine personnalisé doit être activée par le support. [Contactez-nous pour l'activer](/help).

Si vous êtes membre de plusieurs organisations, les sous-domaines personnalisés vous aident à identifier rapidement la source d'une alerte ou d'une notification. Ils vous redirigeront immédiatement vers l'organisation associée au sous-domaine.

Par exemple, l'URL `https: //app.datadoghq.com/event/event?Id =1` est associée à un événement de l'organisation A. Si un utilisateur est membre de l'organisation A et de l'organisation B, mais qu'il est actuellement sur une page Datadog dans le contexte de l'organisation B, cette URL renvoie une erreur 404 Not Found. L'utilisateur doit alors passer à l'organisation A en utilisant le [menu des paramètres du compte utilisateur](/account_management/#manage-your-organisations), puis revisiter l'URL. Cependant, avec des sous-domaines personnalisés, l'utilisateur pourrait visiter `https://org-a.datadoghq.com/event/event?id=1`, ce qui basculerait automatiquement le contexte de l'utilisateur vers l'organisation A et afficherait la bonne page.

## En apprendre plus

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/#managing-your-organizations
[2]: /help
[3]: https://app.datadoghq.com/account/new_org
[4]: https://app.datadoghq.com/account/billing
[5]: mailto:success@datadoghq.com