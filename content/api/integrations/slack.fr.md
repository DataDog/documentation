---
title: Slack
type: apicontent
order: 14.3
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

* **`run_check`** [*optionnel*, *défaut*=**false**]:  
    Détermine si le check d'installation d'intégration est exécutée avant de renvoyer une réponse.

    * si **vrai**:

        - Le check d'installation est exécuté
        - S'il y a une erreur dans la configuration, l'erreur est renvoyée
        - S'il n'y a pas d'erreur, le code de réponse *204 No Content* est renvoyé

    * Si **false**:

        - On retourne *202 accepted*
        - Le check d'installation est exécuté après avoir renvoyé une réponse

[1]: /integrations/slack
[2]: /monitors/notifications/#slack-integration
