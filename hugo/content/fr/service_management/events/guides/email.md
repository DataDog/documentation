---
aliases:
- /fr/developers/events/email/
- /fr/guides/eventsemail
- /fr/events/guides/email

title: Envoi d'événements par e-mail
---

Si votre application ne possède pas d'[intégration Datadog][1] et que vous ne souhaitez pas créer de [check d'Agent personnalisé][2], vous pouvez envoyer des événements par e-mail. Il est également possible d'envoyer des événements à partir des messages publiés sur un sujet Amazon SNS ; pour en savoir plus, consultez la section [Créer des événements Datadog à partir d'e-mails Amazon SNS][6].

## Implémentation

Pour envoyer des événements par e-mail, vous devez disposer d'une adresse e-mail Datadog dédiée :

1. Connectez-vous à votre [compte Datadog][3].
2. Depuis le menu **Account** en bas à gauche, sélectionnez **Organization Settings**.
3. Cliquez sur l'onglet **Events API emails**.
4. Choisissez le format de vos messages à l'aide du menu déroulant **Format** (`Plain text` ou `JSON`).
5. Cliquez sur le bouton **Create Email**.

La section **Events API emails** affiche l'ensemble des adresses e-mail disponibles pour vos applications, ainsi que le créateur de chaque adresse.

## Envoi

Il existe deux façons d'envoyer des événements par e-mail :

{{< tabs >}}
{{% tab "JSON" %}}

Si vous êtes libre de configurer les e-mails envoyés par l'application comme bon vous semble, vous pouvez définir un message au format JSON. Ce format vous permet de personnaliser entièrement l'événement qui apparaît dans Datadog.

### E-mail source {#e-mail-source-1}

Les e-mails au format JSON vous offrent la possibilité de définir les informations suivantes :

* L'adresse e-mail de l'expéditeur
* Tous les arguments transmis par l’[API des événements Datadog][1]

**Remarque** : si votre JSON n'est pas valide ou que votre e-mail est envoyé sans aucun objet, l'événement n'apparaît pas dans votre flux d'événements.

### Événement Datadog {#evenement-datadog-1}

Avec un e-mail au format JSON, l'objet de l'e-mail n'apparaît pas dans l'événement. La valeur de l'attribut title est utilisée pour le titre de l'événement. Toutes les données qui apparaissent dans l'événement doivent être définies dans le JSON du corps de l'e-mail. En outre, le corps doit être entièrement composé de JSON valide : si ce n'est pas le cas, le message est ignoré. Exemple d'événement envoyé au format JSON :

{{< img src="developers/events/json-event.png" alt="événement json" >}}

**Remarque** : si vous testez l'e-mail avec un client de messagerie standard, le corps risque d'être converti en HTML. Il ne sera alors plus entièrement composé de JSON et l'e-mail sera ignoré.

[1]: /fr/api/v1/events/
{{% /tab %}}
{{% tab "Texte brut" %}}

Si les possibilités de configuration des e-mails envoyés par une application sont limitées, utilisez un message au format texte brut.

### E-mail source {#e-mail-source-2}

Les e-mails au format texte brut vous offrent la possibilité de définir les informations suivantes :

| Champ                | Obligatoire | Description                     |
|----------------------|----------|---------------------------------|
| Sender email address | Oui      | L'adresse e-mail de l'expéditeur |
| Subject              | Oui      | L'objet de l'e-mail        |
| Corps                 | Oui      | Le corps de l'e-mail           |

Par exemple, l'e-mail ci-dessous est un exemple d'envoi valide :

```text
Sender's email: matt@datadog.com
Subject: Env:Test - System at 50% CPU - #test
Body: This is a test message showing that env:test is at 50% CPU - #test
```

### Événement Datadog {#evenement-datadog-2}

L'objet de l'e-mail devient le titre de l'événement, et le corps de l'e-mail devient le message de l'événement. L'expéditeur de l'e-mail apparaît à la fin de l'événement. Vous pouvez ajouter des tags à l'aide du caractère `#` dans le corps du message. Exemple d'événement envoyé au format texte brut :

{{< img src="developers/events/plain-event.png" alt="événement en texte brut" >}}

{{% /tab %}}
{{< /tabs >}}

### Markdown

Le texte de l'événement Datadog prend en charge le [Markdown][5], mais il n'est pas possible d'incorporer du HTML dans le Markdown. Pour utiliser le langage Markdown dans le texte de l'événement, vous devez ajouter `%%% \n` au début du bloc de texte et `\n %%%` à la fin du bloc :

```json
{
  "title": "Vous avez entendu la nouvelle ?",
  "text": "%%% \n [un exemple de lien](http://example.com/session_id \"Title\") \n %%%",
  "priority": "normal",
  "tags": ["environment:test"],
  "alert_type": "info"
}
```

Si vous ajoutez un lien dans un bloc Markdown, assurez-vous que l'URL est correctement encodée.

```text
# URL non encodée
http://example.com/session_id:123456

# URL encodée
http://example.com/session_id%3A123456
```

[1]: /fr/integrations/
[2]: /fr/agent/agent_checks/
[3]: https://app.datadoghq.com
[5]: http://daringfireball.net/projects/markdown/syntax#lin
[6]: /fr/integrations/guide/events-from-sns-emails/