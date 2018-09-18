---
title: Slack
type: apicontent
order: 14.4
external_redirect: /api/#slack
---

## Slack

Configurer votre intégration Datadog-Slack directement via l'API Datadog.  
[En apprendre plus sur l'intégration Datadog-Slack][1]

##### ARGUMENTS

* **`service_hooks`** [*obligatoire*]:  
    Tableau d'objets de hook de service (le hook de service est généré pour votre compte dans votre page d'administration Slack). Un objet de hook de service est composé de :

    * **`account`** [*obligatoire*]:  
        Votre nom de compte Slack.

    * **`url`** [*obligatoire*]:  
        Votre URL Slack Service Hook.



* **`channels`** [*obligatoire*]:  
    Tableau d'objets des canaux Slack à publier dedans. Un objet de canal Slack est composé de :

    * **`channel_name`** [*obligatoire*]:  
        Votre nom de channel e.g: `#general`, `#private`

    * **`transfer_all_user_comments`** [*optionnel*, *défaut*=**False**]:  
        Afin d'être notifié pour chaque commentaire sur un graphique, définissez-le sur `true`. Si la valeur est `False`, utilisez la syntaxe `@slack-channel_name` [pour que les commentaires soient affichés dans Slack][2].

    * **`account`** [*obligatoire*]:  
        Compte auquel appartient le canal.

[1]: /integrations/slack
[2]: /monitors/notifications/#slack-integration
