---
title: Envoyer des événements par e-mail
kind: documentation
aliases:
  - /fr/guides/eventsemail
---
Si aucune [intégration Datadog][1] n'est disponible pour votre application et que vous ne souhaitez pas écrire de [check custom pour l'Agent][2], vous pouvez envoyer des événements par e-mail.

## Implémentation

Pour envoyer des événements par e-mail, vous devez disposer d'une adresse e-mail Datadog dédiée :

1. Connectez-vous à votre [compte Datadog][3].
2. Depuis le menu **Integrations**, choisissez **APIs**.
3. Développez l'option **Events API Emails**.
4. Choisissez le format de vos messages à l'aide du menu déroulant **Format** (`Plain text` ou `JSON`).
5. Cliquez sur le bouton **Create API Email**.

La section **Events API Emails** affiche l'ensemble des adresses e-mail disponibles pour vos applications, ainsi que le créateur de chaque adresse.

## Envoi

Il existe deux façons d'envoyer des événements par e-mail :

{{< tabs >}}
{{% tab "JSON" %}}

Si vous êtes libre de configurer les e-mails envoyés par l'application comme bon vous semble, vous pouvez définir un message au format JSON. Ce format vous permet de personnaliser entièrement l'événement qui apparaît dans Datadog.

### E-mail source {#e-mail-source-1}

Les e-mails au format JSON vous offrent la possibilité de définir les champs suivants :

* Adresse e-mail de l'expéditeur
* Tous les arguments transmis par l’[API des événements Datadog][1]

**Remarque** : si votre JSON n'est pas valide ou que votre e-mail est envoyé sans aucun objet, l'événement n'apparaîtra pas dans votre flux d'événements.

### Événement Datadog {#evenement-datadog-1}

Avec un e-mail au format JSON, l'objet de l'e-mail n'apparaît pas dans l'événement. La valeur de l'attribut title est utilisée pour le titre de l'événement. Toutes les données qui apparaissent dans l'événement doivent être définies dans le JSON du corps de l'e-mail. En outre, le corps doit être entièrement composé de JSON valide : si ce n'est pas le cas, le message est ignoré. Exemple d'événement envoyé au format JSON :

{{< img src="developers/events/json-event.png" alt="événement json"  >}}

**Remarque** : si vous testez l'e-mail avec un client de messagerie standard, le corps risque d'être converti en HTML. Le corps ne sera alors plus entièrement composé de JSON et l'e-mail sera ignoré.

[1]: /fr/api/v1/events/
{{% /tab %}}
{{% tab "Texte brut" %}}

Si les possibilités de configuration des e-mails envoyés par une application sont limitées, utilisez un message au format texte brut.

### E-mail source {#e-mail-source-2}

Les e-mails au format texte brut vous offrent la possibilité de définir les champs suivants :

| Champ                | Obligatoire | Description                     |
|----------------------|----------|---------------------------------|
| Sender's Email | Oui      | L'adresse e-mail de l'expéditeur |
| Subject              | Oui      | L'objet de l'e-mail        |
| Body                 | Non       | Le corps de l'e-mail           |

L'e-mail ci-dessous est un exemple d'envoi valide :

```text
Sender's Email: matt@datadog.com
Subject: Env:Test - System at 50% CPU - #test
Body: This is a test message showing that env:test is at 50% CPU - #test
```

### Événement Datadog {#evenement-datadog-2}

L'objet de l'e-mail devient le titre de l'événement, et le corps de l'e-mail devient le message de l'événement. L'expéditeur de l'e-mail apparaît à la fin de l'événement. Exemple d'événement envoyé au format texte brut :

{{< img src="developers/events/plain-event.png" alt="événement en texte brut" >}}

**Remarque** : bien qu'un tag semble apparaître à la fin du titre et du corps de l'événement, aucun de ces éléments ne contient de tag.

{{% /tab %}}
{{< /tabs >}}

### Markdown

Le texte de l'événement Datadog prend en charge le [Markdown][4], mais il n'est pas possible d'incorporer du HTML dans le Markdown. Pour utiliser le langage Markdown dans le texte de l'événement, vous devez ajouter `%%% \n` au début du bloc de texte et `\n %%%` à la fin du bloc :

```json
{
  "title": "Vous avez entendu la nouvelle ?",
  "text": "%%% \n [un exemple de lien](http://catchpoint.com/session_id \"Title\") \n %%%",
  "priority": "normal",
  "tags": ["environment:test"],
  "alert_type": "info"
}
```

Si vous ajoutez un lien dans un bloc Markdown, assurez-vous que l'URL est correctement encodée.

```text
# URL non encodée
http://catchpoint.com/session_id:123456

# URL encodée
http://catchpoint.com/session_id%3A123456
```

[1]: /fr/integrations/
[2]: /fr/agent/agent_checks/
[3]: https://app.datadoghq.com
[4]: http://daringfireball.net/projects/markdown/syntax#lin