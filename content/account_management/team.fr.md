---
title: Équipe
kind: documentation
further_reading:
- link: "account_management/saml"
  tag: "Documentation"
  text: Configurez SAML pour votre compte Datadog
- link: "account_management/multi_organization"
  tag: "Documentation"
  text: Configurez vos Teams et Organisations avec plusieurs comptes
---

## Ajouter de nouveaux membres

1. Pour ajouter des membres à une équipe, commencez par visiter la [Page d'équipe][1].
2. Entrez l'adresse e-mail de l'utilisateur que vous souhaitez inviter à votre compte Datadog. Cliquez sur **Inviter**
  {{< img src="account_management/team/guides-multacct-addtoteam.png" alt="Add Member To Team" responsive="true" style="width:50%;">}}

Le nouvel utilisateur recevra un email avec un lien pour se connecter.

## Rôles utilisateur dans Datadog

Datadog à 3 rôles d'utilisateur:

* **Administrators** a accès aux informations de facturation, à la possibilité de révoquer les clés de l'API, il peut gérer les utilisateurs et peut configurer [les dashboard en lecture seule][2]. Il peut également promouvoir les utilisateurs standard en Administrators.

* **Standard users** a accès pour afficher et modifier toutes les fonctionnalités de monitoring que Datadog offre telles que [les dashboards][2], [monitors][3], [événements][4], et [notebooks][5].

* **Read only users** est créé par les administrateurs et ne peut rien modifier dans Datadog. Cela est pratique lorsque vous souhaitez partager des vues spécifiques en lecture seule avec un client ou lorsqu'un membre d'une unité commerciale doit partager un [dashboard][6] avec quelqu'un en dehors de son unité.

## Désactiver un membre existant

**NOTE:** Vous devez être administrateur de l'équipe pour désactiver les membres. Vous ne pouvez pas supprimer définitivement les utilisateurs, car ils peuvent posséder des événements, des dashboards, etc. qui ne sont pas censés être supprimés. Les membres de l'équipe désactivés disparaissent automatiquement de l'interface utilisateur de la page d'équipe de l'administrateur après un mois.

1. Allez à la [page d'équipe][1].
2. Passez la souris sur l'avatar pour l'utilisateur que vous souhaitez désactiver. Choisissez **Disable** dans le menu.

    {{< img src="account_management/team/guides-multacct-disable.png" alt="Disable Member" responsive="true" style="width:50%;" >}}

## Promouvoir des membres existants en administrateur

**NOTE:** Seul l'administrateur de l'équipe peut promouvoir les membres.

1. Allez à la [page d'équipe][1].
2. Passez la souris sur l'avatar pour l'utilisateur que vous souhaitez promouvoir. Choisissez **Make Administrator** dans le menu.

## En apprendre plus

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/team
[2]: /graphing/dashboards/
[3]: /monitors/
[4]: /graphing/event_stream
[5]: /graphing/notebooks
[6]: /graphing/dashboards