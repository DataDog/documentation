---
title: Tickets Freshservice avec Webhooks
kind: guide
author: Trevor Veralrud
further_reading:
  - link: /integrations/webhooks/
    tag: Documentation
    text: Intégration Webhooks
---
Ce guide vous expliquera comment utiliser notre intégration Webhooks pour ouvrir de nouveaux tickets dans Freshservice lorsqu'un monitor envoie une alerte.

## Implémentation

Pour commencer, ouvrez le [carré d'intégration Webhooks][1], accédez à l'onglet Configuration, puis faites défiler la page vers le bas pour ajouter un nouveau Webhook.

### Nom

Donnez un nom à votre Webhook. Ce nom est utilisé dans le message de votre monitor (consultez la section [Utilisation](#utilisation)) avec `@webhook-<NOM>`. Par exemple, si vous nommez votre webhook freshservice, vous pouvez ouvrir un ticket à partir de votre monitor en mentionnant `@webhook-freshservice` dans le message du monitor.

### URL

L'API Freshservice se décline en deux versions différentes. Ce guide utilise la V2, mais il est possible d'utiliser la V1 en apportant quelques modifications à votre charge utile JSON.

Dans le champ URL, entrez l'endpoint suivant :

`https://<VOTRE_DOMAINE>.freshservice.com/api/v2/tickets`

### Charge utile

Saisissez une nouvelle charge utile de ticket au format JSON. L'exemple suivant utilise uniquement les champs obligatoires. Consultez [l'endpoint de ticket de Freshservice][2] pour découvrir d'autres options de personnalisation de votre charge utile :

```json
{
  "email": "[adresse e-mail à associer au ticket]",
  "subject": "$EVENT_TITLE",
  "description": "<img src=\"$SNAPSHOT\" /><hr/>$TEXT_ONLY_MSG",
  "status": 2,
  "priority": 2
}
```

**Remarques** :

* Les valeurs telles que `$EVENT_TITLE` sont des variables utilisées par notre intégration Webhook. Pour obtenir la liste complète de ces variables ainsi que leur signification, consultez le carré d'intégration Webhook ou notre [documentation sur l'intégration Webhook][3].
* Entrez manuellement une adresse e-mail pour le champ email au lieu d'utiliser la variable `$EMAIL` : cette dernière est uniquement renseignée lorsque le webhook est mentionné dans un commentaire du *flux d'événements* et ne peut pas être utilisée dans les *alertes de monitor*. 
* Le champ *description* de la charge utile accepte le HTML. Notre variable `$EVENT_MSG` génère le message de votre monitor au format Markdown, qui n'est pas pris en charge par l'API de Freshservice. Nous utilisons donc `$TEXT_ONLY_MSG` à la place, avec un snapshot de graphique.
* Les champs `status` et `priority` sont des nombres mappés à différentes valeurs. Pour afficher ces valeurs, consultez [l'endpoint de ticket de Freshservice][2].

### Authentification

L'API de Freshservice utilise [l'authentification basique][4]. Vos identifiants chiffrés en Base64 doivent être envoyés dans l'en-tête de requête `Authorization`. Les identifiants acceptés sont votre nom d'utilisateur et votre mot de passe au format `nomutilisateur:motdepasse`, ou votre clé d'API Freshservice.

Pour configurer l'authentification dans votre webhook, ajoutez la ligne suivante à votre section **Headers** :

```json
{"Authorization": "Basic <IDENTIFIANTS_ENCODÉS_BASE64>"}
```

### Pour terminer

Dans le carré d'intégration Webhook, cliquez sur **Install Integration** ou **Update Configuration** (si vous avez déjà ajouté une définition de webhook) pour enregistrer vos modifications.

## Utilisation

Vous pouvez maintenant ajouter `@webhook-<NOM>` au message de votre monitor. Le webhook se déclenche lorsque le monitor change d'état.

Nous vous conseillons d'ajouter votre @mention à l'intérieur de l'expression conditionnelle `{{#is_alert}}` ou `{{#is_warning}}`, par exemple :

```text
{{#is_alert}}
    {{host.name}} is down!
    @webhook-freshservice
{{/is_alert}}
```

Lorsque votre monitor déclenche une alerte, un nouveau ticket s'affiche dans votre dashboard Freshservice. Si vous avez choisi de ne pas utiliser d'expression conditionnelle, un ticket est créé lorsque le monitor repasse à son état normal au prochain déclenchement du webhook.

## Limites

### Création de tickets

L'intégration Webhooks peut uniquement créer des tickets. La mise à jour d'un ticket existant requiert une méthode `PUT`, et l'intégration Webhooks prend uniquement en charge les méthodes `POST`.

### État et priorité

Les variables `$ALERT_STATUS` et `$PRIORITY` renvoient des chaînes (comme `ALERT` et `NORMAL`) plutôt qu'une valeur numérique, tel qu'attendu par l'API de Freshservice. Pour configurer différents états et niveaux de priorité, créez des webhooks en double avec les champs d'état et de priorité codés en dur. Mentionnez ensuite ces webhooks à l'intérieur d'une expression conditionnelle, par exemple :

```text
{{#is_warning}}
    Disk space usage is above 80%
    @webhook-freshservice-warning
{{/is_warning}}
{{#is_alert}}
    Disk space usage is above 95%
    @webhook-freshservice-alert
{{/is_alert}}
```

### Tagging

Le tagging est pris en charge dans l'API de Freshservice, mais notez ce qui suit :

* Le paramètre tags de votre charge utile JSON doit être un tableau. Cela signifie que vous ne pouvez pas utiliser la variable de webhook `$TAGS`, qui renvoie une liste de chaînes séparées par des virgules.
* Les tags ajoutés à votre charge utile JSON ne doivent pas contenir de caractère `:`. Il est donc possible que vous ne puissiez pas mapper tous vos tags Datadog à Freshservice. Si un caractère `:` existe dans vos tags, votre requête échoue.
* Consultez notre [documentation sur l'intégration Webhook][3] pour découvrir d'autres variables pouvant être utilisées pour les tags Freshservice. Dans l'exemple suivant, on utilise `$HOSTNAME` et `$ORG_ID` :

```json
{
  "email": "<ADRESSE_EMAIL_À_ASSOCIER_AU_TICKET>",
  "subject": "$EVENT_TITLE",
  "description": "<img src=\"$SNAPSHOT\" /><hr/>$TEXT_ONLY_MSG",
  "status": 2,
  "priority": 2,
  "tags": ["$HOSTNAME", "$ORG_ID"]
}
```

### Dépannage

Si l'envoi de votre webhook échoue après le déclenchement de votre monitor, accédez au flux d'événements et recherchez `sources:webhooks` `status:error`. Cette requête renvoie les événements associés à des webhooks ayant échoué et contenant des informations de dépannage, par exemple :

```text
- Reply status code was: HTTP 401
- Reply content was:
  {"code":"invalid_credentials","message":"You have to be logged in to perform this action."}
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#integrations/webhooks
[2]: https://api.freshservice.com/v2/#create_ticket
[3]: /fr/integrations/webhooks/#usage
[4]: https://en.wikipedia.org/wiki/Basic_access_authentication