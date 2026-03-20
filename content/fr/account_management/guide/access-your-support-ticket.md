---
aliases:
- /fr/developers/faq/access-your-support-ticket
- /fr/account_management/faq/access-your-support-ticket
description: Apprenez à créer de nouveaux tickets d'assistance et à accéder à vos
  tickets d'assistance Datadog existants via le portail Zendesk.
further_reading:
- link: /getting_started/support/
  tag: Documentation
  text: Débuter avec l'assistance Datadog
title: Accéder à votre ticket d'assistance
---

## Créer un ticket dʼassistance

Pour créer un nouveau ticket d'assistance, cliquez sur le lien du site approprié et cliquez sur **Submit a request** pour remplir un formulaire de ticket.

{{< whatsnext desc="Page d'assistance par site Datadog :">}}
    {{< nextlink href="https://help.datadoghq.com/" >}} US1, US3, US5, EU, AP1, AP2 {{< /nextlink >}}
    {{< nextlink href="http://help.ddog-gov.com/" >}}US1-FED{{< /nextlink >}}
{{< /whatsnext >}}

{{< img src="/account_management/guide/access_your_support_ticket/support_page.png" alt="Page dʼaccueil de lʼassistance de Datadog" style="width:100%;" >}}

Vous pouvez également accéder à ce formulaire via Datadog. Depuis la [page dʼaide][2], dans le menu de gauche, cliquez sur **?** -> **Resources**. Sous *Support Tickets & Billing Questions*, cliquez sur **New Support Ticket**.

## Accéder à des tickets existants

Si vous avez ouvert au moins un ticket d'assistance Datadog, procédez comme suit pour accéder à tous vos tickets d'assistance Datadog :
1. Sur la page d'assistance, cliquez sur **Sign in** en haut à droite.

2. Si c'est la première fois que vous vous connectez à votre compte Datadog Zendesk, cliquez sur le lien **New to your Datadog Zendesk account? Sign up**.

3. Si vous avez déjà envoyé un e-mail au service d'assistance de Datadog, cliquez sur **Emailed us for support? Get a password** et saisissez la même adresse électronique que celle que vous avez utilisée pour contacter le service d'assistance de Datadog.

4. Après avoir reçu le mot de passe par e-mail, connectez-vous et cliquez sur **Manage your tickets** pour afficher vos requêtes :

5. Si vous ne voyez pas la page **My activities** une fois connecté, cliquez sur votre nom en haut à droite, puis sur cliquez sur **My Activities**.

6. Si vous souhaitez consulter tous les tickets de votre organisation, envoyez une requête à l'assistance Datadog.

{{< whatsnext desc="Page d'assistance par site Datadog :">}}
    {{< nextlink href="https://help.datadoghq.com/" >}} US1, US3, US5, EU, AP1, AP2 {{< /nextlink >}}
    {{< nextlink href="http://help.ddog-gov.com/" >}}US1-FED{{< /nextlink >}}
{{< /whatsnext >}}

## Exigences en matière de mot de passe

Pour garantir la sécurité de votre compte, tout mot de passe utilisé pour se connecter au portail d'assistance Zendesk de Datadog doit répondre aux exigences suivantes :

1. Complexité du mot de passe :
    - Doit comporter au moins **12 caractères**.
    - Doit contenir des **lettres majuscules et minuscules (A-Z)**.
    - Doit inclure au moins **un chiffre (0-9)**.
    - Doit inclure au moins **un caractère spécial** (par exemple, `!`, `@`, `#`, ou `%`).
    - Ne doit **pas ressembler à une adresse électronique**.
    - Ne doit **pas inclure le mot Zendesk**.
1. Tentatives infructueuses et blocage :
    - Les utilisateurs ont droit à un maximum de **5 tentatives** avant que le compte ne soit bloqué temporairement.
1. Séquences interdites :
    - Les mots de passe ne peuvent comporter plus d'un certain nombre de lettres ou de chiffres consécutifs. Par exemple, si la limite est fixée à 4, le système rejette les mots de passe tels que `admin12345`.
1. Mots de passe antérieurs :
    - Les utilisateurs ne peuvent pas réutiliser un certain nombre de mots de passe qu'ils ont déjà utilisés.
1. Politique d'expiration :
    - Les mots de passe doivent être mis à jour au moins **tous les 90 jours**, ou à chaque fois que le système le demande.

## Dépannage
### Erreur « Refused to connect »
Les erreurs **Refused to connect** sont liées à des paramètres de confidentialité qui bloquent les cookies tiers. Pour résoudre ce problème, vérifiez que le navigateur autorise les cookies tiers de Zendesk. Consultez la section [Supprimer, autoriser et gérer les cookies dans Chrome][1] de l'aide Google Chrome.

Si votre navigateur utilise des bloqueurs de publicités, désactivez-les pour vérifier si cela résout votre problème de connexions. Certains bloqueurs de publicités possèdent leur propre liste d'exceptions. Dans ce cas, ajoutez **datadog.zendesk.com** à la liste d'autorisations.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://support.google.com/chrome/answer/95647
[2]: https://app.datadoghq.com/help