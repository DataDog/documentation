---
aliases:
- /fr/developers/events/email/
- /fr/guides/eventsemail
- /fr/service_management/events/guides/email/
title: Envoi² d'événements par e-mail
---
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Les événements par e-mail ne sont pas pris en charge sur {{< region-param key=dd_datacenter code="true" >}}</div>
{{< /site-region >}}

Si aucune [intégration Datadog][1] n'est disponible pour votre application et que vous ne souhaitez pas créer de [check custom pour l'Agent][2], vous pouvez envoyer des événements par e-mail. Cela peut également être effectué avec des messages publiés sur un sujet Amazon SNS ; lisez le guide [Créer des événements Datadog à partir d'e-mails Amazon SNS][6] pour plus d'informations.

## Configuration {#setup}

Pour envoyer des événements par e-mail, vous devez disposer d'une adresse e-mail Datadog dédiée :

1. Connectez-vous à votre [compte Datadog][3].
2. Depuis le menu {{< ui >}}Account{{< /ui >}} en bas à gauche, sélectionnez {{< ui >}}Organization Settings{{< /ui >}}.
3. Cliquez sur l'onglet {{< ui >}}Events API emails{{< /ui >}}.
4. Choisissez le format de vos messages dans la liste déroulante {{< ui >}}Format{{< /ui >}} (`Plain text` ou `JSON v2`).
5. Vous pouvez également définir l'un des autres attributs listés dans la section [définitions des attributs](#attribute-definitions) de cette page.
6. Cliquez sur le bouton {{< ui >}}Create Email{{< /ui >}}.

La section {{< ui >}}Events API emails{{< /ui >}} affiche tous les e-mails disponibles pour vos applications ainsi que leurs créateurs.

### Définitions des attributs {#attribute-definitions}

| Nom | Description | Exemple |
|---|---|---|
| Description | Une description de l'objet de l'e-mail. | « Utilisé pour les notifications MyService » |
| Tags | Liste des tags à ajouter à chaque événement reçu via l'e-mail. Si d'autres tags sont présents dans le message JSON, ils sont tous ajoutés.<br>Il existe une limite de **20** tags par e-mail. | `tag1:val1`, `tag2:val2` |
| Destinataires | Liste des identifiants à ajouter au début du message pour tous les événements créés via l'e-mail, sans le préfixe `@`. Pour plus d'informations, consultez [Destinataires des notifications][7].<br>Il existe une limite de **10** destinataires par e-mail. | `my@email.com`, `slack-acc-ch` |
| Type d'alerte | Pour les adresses au format {{< ui >}}Plain text{{< /ui >}} et {{< ui >}}JSON{{< /ui >}}, définit le type d'alerte pour les événements. Lorsqu'il est présent, le champ `alert_type` dans un e-mail JSON prévaut sur ce paramètre. **Non pris en charge pour JSON v2**—définissez plutôt la catégorie et les champs associés dans le corps JSON de l'e-mail. | `Info` |

## Soumission {#submission}

Il existe trois façons d'envoyer des événements par e-mail, décrites dans les onglets ci-dessous ({{< ui >}}JSON{{< /ui >}}, {{< ui >}}Plain text{{< /ui >}} et {{< ui >}}JSON v2{{< /ui >}}). Le format `JSON` est obsolète pour les nouvelles adresses e-mail d'événements ; vous ne pouvez pas créer de nouvelles adresses avec ce format, mais les adresses `JSON` existantes continuent de fonctionner. Pour les nouvelles applications qui envoient des e-mails au format JSON, utilisez `JSON v2`.

{{< tabs >}}
{{% tab "JSON" %}}

Si vous avez un contrôle total sur l'e-mail envoyé par une application, vous pouvez envoyer un message au format JSON. Le corps de l'e-mail doit suivre la structure JSON pour [**Events API v1**][1] (`POST /api/v1/events`). Sélectionnez la version de l'API {{< ui >}}v1{{< /ui >}} pour voir les champs du corps de la requête. Le JSON dans le corps de l'e-mail définit les champs d'événement qui s'affichent dans Datadog.

### E-mail source {#source-email-1}

Avec un e-mail au format `JSON`, les champs suivants sont contrôlables :

* L'adresse e-mail de l'expéditeur
* Tous les champs pris en charge par [**Events API v1**][1] (par exemple `title`, `text`, `tags` et `alert_type`)

**Remarque** : Si votre JSON n'est pas correctement formaté, ou si l'e-mail est envoyé sans objet, l'événement ne s'affiche pas dans votre flux d'événements.

### Événement Datadog {#datadog-event-1}

Dans un e-mail au format `JSON`, l'objet de l'e-mail n'apparaît pas dans l'événement. La valeur de l'attribut title est utilisée pour le titre de l'événement. Toutes les données qui apparaissent dans l'événement doivent être définies en JSON dans le corps de l'e-mail. De plus, le corps doit être du JSON pur et bien formé ; sinon, le message est ignoré. Exemple d'événement envoyé avec JSON:

{{< img src="extend/events/json-event.png" alt="événement JSON" >}}

**Remarque** : Si vous testez l'e-mail avec un client de messagerie standard, le corps peut être converti en HTML. Cela fait en sorte que le corps ne soit plus du JSON pur, ce qui entraîne l'ignorance de l'e-mail.

[1]: /fr/api/latest/events/#post-an-event
{{% /tab %}}
{{% tab "Texte brut" %}}

Si les possibilités de configuration des e-mails envoyés par une application sont limitées, utilisez un message au format texte brut.

### E-mail source {#source-email-2}

Les e-mails au format texte brut vous offrent la possibilité de définir les informations suivantes :

| Champ                | Requis | Description                     |
|----------------------|----------|---------------------------------|
| Adresse e-mail de l'expéditeur | Oui      | L'adresse e-mail de l'expéditeur |
| Objet              | Oui      | L'objet de l'e-mail        |
| Corps                 | Oui      | Le corps de l'e-mail           |

Par exemple, l'e-mail ci-dessous est un exemple d'envoi valide :

```text
Sender's email: matt@datadog.com
Subject: Env:Test - System at 50% CPU - #test
Body: This is a test message showing that env:test is at 50% CPU - #test
```

### Traitement du corps de l'e-mail {#email-body-2}
Le corps de l'e-mail passe par plusieurs étapes de nettoyage pour améliorer la lisibilité et la sécurité. Les modifications attendues incluent:

- **Conversion du HTML en Markdown** : Le contenu HTML est converti en son équivalent markdown.
- **Nettoyage HTML** : Pour des raisons de sécurité, les corps des e-mails sont nettoyés, n'autorisant que des balises HTML spécifiques : `a`, `br`, `caption`, `code`, `div`, `em`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `hr`, `iframe`, `img`, `li`, `ol`, `p`, `pre`, `span`, `strong`, `table`, `tbody`, `td`, `tfoot`, `th`, `thead`, `tr`, `ul`. Toute autre balise HTML, y compris les chaînes entre `<>`, est supprimée.
- **Suppression du contenu des réponses/transferts** : Seul l'e-mail le plus récent d'un fil de discussion est conservé, les réponses et transferts plus anciens étant supprimés.

### Événement Datadog {#datadog-event-2}

L'objet de l'e-mail devient le titre de l'événement et le corps de l'e-mail devient le message de l'événement. L'expéditeur de l'e-mail apparaît en bas de l'événement. Vous pouvez ajouter des tags en utilisant `#` dans le corps du message.

Datadog tronque les valeurs qui dépassent ces limites de champ par défaut :

| Champ   | Maximum         |
|---------|-----------------|
| Titre   | 300 caractères  |
| Message | 4000 caractères |
| Tags    | 200 tags        |

Exemple d'événement envoyé en texte brut :

{{< img src="extend/events/plain-event.png" alt="événement brut" >}}

{{% /tab %}}
{{% tab "JSON v2" %}}

Si vous avez un contrôle total sur l'e-mail envoyé par une application, vous pouvez envoyer un message au format JSON. Le corps de l'e-mail doit respecter la structure JSON pour [**Events API v2**][1] (`POST /api/v2/events`). Le JSON dans le corps de l'e-mail définit les champs d'événement qui s'affichent dans Datadog.

### E-mail source {#source-email-json-v2}

Avec un e-mail au format `JSON v2`, les champs suivants sont contrôlables :

* L'adresse e-mail de l'expéditeur
* Tous les champs pris en charge par [**Events API v2**][1] (par exemple `data.attributes.title`, `data.attributes.message`, `data.attributes.tags`, `data.attributes.category`)

Exemple de corps d'e-mail pour un événement d'alerte. Les événements de changement et d'information utilisent des champs différents sous `data.attributes.attributes` ; consultez la référence de l'API pour ces catégories.

```json
{
  "data": {
    "attributes": {
      "category": "alert",
      "title": "CPU threshold exceeded",
      "message": "Host prod-web-01 averaged 92% CPU for five minutes.",
      "tags": [
        "env:production",
        "region:us-east"
      ],
      "integration_id": "custom-events",
      "attributes": {
        "status": "error",
        "priority": "3"
      }
    },
    "type": "event"
  }
}
```

**Remarque** : Si votre JSON n'est pas correctement formaté, ou si l'e-mail est envoyé sans objet, l'événement n'apparaît pas dans votre flux d'événements.

### Événement Datadog {#datadog-event-json-v2}

Dans un e-mail au format `JSON v2`, l'objet de l'e-mail n'apparaît pas dans l'événement. La valeur du champ title dans le corps JSON est utilisée pour le titre de l'événement. Toutes les données qui apparaissent dans l'événement doivent être définies en JSON dans le corps de l'e-mail. De plus, le corps doit être du JSON pur et bien formé ; sinon, le message est ignoré.

**Remarque** : Si vous testez l'e-mail avec un client de messagerie standard, le corps peut être converti en HTML. Cela fait en sorte que le corps ne soit plus du JSON pur, ce qui entraîne l'ignorance de l'e-mail.

[1]: /fr/api/latest/events/#post-an-event
{{% /tab %}}
{{< /tabs >}}

### Markdown {#markdown}

Le texte d'événement Datadog prend en charge le [Markdown][5], mais l'intégration de HTML dans le Markdown n'est pas prise en charge. Pour utiliser le Markdown dans le texte d'événement, commencez le bloc de texte par `%%% \n` et terminez-le par `\n %%%` :

```json
{
  "title": "Did you hear the news today?",
  "text": "%%% \n [an example link](http://example.com/session_id \"Title\") \n %%%",
  "priority": "normal",
  "tags": ["environment:test"],
  "alert_type": "info"
}
```

Si vous ajoutez un lien dans un bloc Markdown, assurez-vous que l'URL est correctement encodée.

```text
# Not encoded
http://example.com/session_id:123456

# Encoded
http://example.com/session_id%3A123456
```

### Taille de l'e-mail {#email-size}
La taille maximale autorisée pour un e-mail, contenu et pièces jointes inclus, est de 20 Mo. Les e-mails dépassant cette limite sont ignorés.

### Suivi de l'utilisation {#usage-tracking}
Pour comprendre quels e-mails sont utilisés et reçoivent des événements, consultez la colonne {{< ui >}}Last Used{{< /ui >}} dans l'onglet {{< ui >}}Events API Emails{{< /ui >}} des paramètres de l'organisation. Cela affiche la date la plus récente à laquelle un e-mail a été traité pour chaque adresse, ou {{< ui >}}No data{{< /ui >}} s'il n'existe aucun enregistrement de son utilisation.

[1]: /fr/integrations/
[2]: /fr/agent/agent_checks/
[3]: https://app.datadoghq.com
[5]: http://daringfireball.net/projects/markdown/syntax#lin
[6]: /fr/integrations/guide/events-from-sns-emails/
[7]: /fr/monitors/notify/#notification-recipients