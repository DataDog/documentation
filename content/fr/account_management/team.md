---
title: Équipe
kind: documentation
description: Ajoutez ou supprimez les membres de l'équipe de votre organisation. Modifiez les rôles des membres de l'équipe.
further_reading:
  - link: account_management/saml
    tag: Documentation
    text: Configurer SAML pour votre compte Datadog
  - link: account_management/multi_organisations
    tag: Documentation
    text: Configurer des équipes et organisations avec plusieurs comptes
---
{{< wistia 3rrd63kxzu >}}

## Ajouter de nouveaux membres

1. Pour ajouter des membres à une équipe, commencez par visiter la [page d'équipe][1].
2. Saisissez l'adresse e-mail de l'utilisateur que vous souhaitez inviter à rejoindre votre compte Datadog. Cliquez sur **Invite**.
  {{< img src="account_management/team/guides-multacct-addtoteam.png" alt="Ajouter un membre à une équipe" responsive="true" style="width:50%;">}}

Le nouvel utilisateur recevra un e-mail avec un lien pour se connecter.

## Rôles utilisateur dans Datadog

Datadog propose trois rôles d'utilisateur :

* Les **administrateurs** ont accès aux informations de facturation, sont autorisés à révoquer des clés API, sont en mesure de gérer les utilisateurs et peuvent configurer [les dashboards en lecture seule][2]. Ils peuvent également promouvoir des utilisateurs standard afin qu'ils deviennent des administrateurs.

* Les **utilisateurs standard** sont autorisés à consulter et à modifier toutes les fonctionnalités de surveillance que Datadog offre, telles que les [dashboards][2], les [monitors][3], les [événements][4], et les [notebooks][5]. Ils peuvent également inviter d'autres utilisateurs à rejoindre les organisations.

* Les **utilisateurs en lecture seule** sont créés par les administrateurs. Ils n'ont aucun droit de modification dans Datadog. Ce type d'utilisateurs est particulièrement utile lorsque vous souhaitez partager des vues spécifiques en lecture seule avec un client ou lorsqu'un membre d'une unité commerciale doit partager un [dashboard][6] avec une personne en dehors de son unité.

## Désactiver un membre existant

**REMARQUE :** vous devez être un administrateur de l'équipe pour désactiver les membres. Vous ne pouvez pas supprimer définitivement les utilisateurs, car ils peuvent être propriétaires d'événements, de dashboards, etc. qui ne doivent pas être supprimés. Les membres de l'équipe désactivés sont automatiquement supprimés de l'interface utilisateur de la page de l'équipe de l'administrateur après un mois.

1. Accédez à la [page d'équipe][1].
2. Passez le curseur sur l'avatar de l'utilisateur que vous souhaitez désactiver. Sélectionnez **Disable** dans le menu.

    {{< img src="account_management/team/guides-multacct-disable.png" alt="Désactiver un membre" responsive="true" style="width:50%;" >}}

## Promouvoir des membres existants afin qu'ils deviennent des administrateurs

**REMARQUE :** seuls les administrateurs d'équipe peuvent promouvoir des membres.

1. Accédez à la [page d'équipe][1].
2. Passez le curseur sur l'avatar de l'utilisateur que vous souhaitez promouvoir. Sélectionnez **Make Administrator** dans le menu.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/team
[2]: /fr/graphing/dashboards
[3]: /fr/monitors
[4]: /fr/graphing/event_stream
[5]: /fr/graphing/notebooks
[6]: /fr/graphing/dashboards