---
description: Limitez les domaines de messagerie pouvant recevoir les notifications
  de monitor et de rapports planifiés grâce aux contrôles de la liste d'autorisation
  de domaines.
further_reading:
- link: https://app.datadoghq.com/organization-settings/domain-allowlist
  tag: Dans l'application
  text: Liste d'autorisations pour les domaines
- link: /account_management/org_settings/domain_allowlist_api
  tag: Documentation
  text: API de liste d'autorisation de domaines
title: Liste d'autorisations pour les domaines
---

{{< callout url="/help/" header="Commencer avec la liste d'autorisation de domaines" >}}
  La liste d'autorisation de domaines est généralement disponible pour les clients disposant d'un plan Enterprise. Si cette fonctionnalité vous intéresse mais que vous n'êtes pas client Enterprise, contactez l'assistance Datadog.
{{< /callout >}}

Avec la [liste d'autorisation de domaines][1], vous pouvez restreindre les domaines de messagerie pouvant recevoir des notifications. Les notifications concernées incluent toutes les notifications provenant de :
- Monitors
- Rapports programmés

Lorsque la liste d'autorisation de domaines est activée, seuls les domaines de messagerie figurant dans votre liste peuvent recevoir les notifications concernées. Si vous essayez d'envoyer une notification concernée à un domaine de messagerie qui ne figure pas dans votre liste, un avertissement s'affiche.

{{< img src="account_management/org_settings/domain_allowlist/verification.png" alt="Capture d'écran des paramètres de monitor dans l'interface utilisateur, boîte de dialogue 'Notifier votre équipe'. La notification mentionne une adresse Gmail, mais gmail.com ne figure pas dans la liste d'autorisation. Un avertissement s'affiche, indiquant : 'Dans le message : le domaine de messagerie @gmail.com ne fait pas partie de la liste de domaines autorisés et ne recevra pas cette notification.'" >}}

Ce document décrit comment accéder à votre liste d'autorisation et la modifier via l'interface utilisateur. Pour utiliser l'API à la place, consultez l'[API de liste d'autorisation de domaines][2].

## Utilisation

Accédez à votre [**liste d'autorisation de domaines**][1] dans les **paramètres d'organisation**. Pour consulter ou modifier votre liste d'autorisation de domaines, vous devez disposer de l'autorisation **Org Management**.

{{< img src="account_management/org_settings/domain_allowlist/enabled.png" alt="Capture d'écran montrant l'interface de la liste d'autorisation de domaines, avec un domaine de messagerie dans la liste." >}}

La section **Domains Currently In Use** affiche les domaines de messagerie de tous les e-mails mentionnés dans vos notifications de **monitor**, à l'exclusion des domaines utilisés pour d'autres types de notifications. Vous pouvez toujours configurer l'envoi de notifications concernées vers des domaines de messagerie qui ne figurent pas dans votre liste d'autorisation, mais si la liste d'autorisation de domaines est activée, les domaines qui ne sont pas autorisés ne reçoivent pas les notifications pour les produits concernés.


### Activer ou désactiver la liste d'autorisation de domaines

Utilisez le bouton **Enable** ou **Disable**.

Pour activer la liste d'autorisation de domaines, vous devez ajouter un ou plusieurs domaines à la liste. Si vous supprimez tous les domaines de la liste, la liste d'autorisation de domaines est automatiquement désactivée.

Lorsque la liste d'autorisation de domaines est désactivée, tous les domaines de messagerie peuvent recevoir des notifications, même si la liste contient des domaines.

### Ajouter ou supprimer un domaine

Pour ajouter un domaine de messagerie à la liste d'autorisation, saisissez le domaine sous la forme `@<DOMAIN NAME>.<TOP-LEVEL DOMAIN>`. Par exemple, `@gmail.com`.

Pour supprimer un domaine de la liste d'autorisation, sélectionnez l'icône de suppression.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/domain-allowlist
[2]: /fr/account_management/org_settings/domain_allowlist_api