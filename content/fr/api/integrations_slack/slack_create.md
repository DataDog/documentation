---
title: Créer une intégration Slack
type: apicontent
order: 19.2
external_redirect: "/api/#creer-une-integration-slack"
---

## Créer une intégration Slack

Créez une intégration Datadog-Slack. Une fois crée, ajoutez-y des canaux avec l'endpoint  [Ajouter des canaux Slack](#ajouter-des-canaux-a-lintegration-slack).

**Remarque** :

* La méthode `POST` permet de mettre à jour la configuration de votre intégration en **ajoutant** votre nouvelle configuration à celle de votre organisation Datadog.
* La méthode `PUT` permet de mettre à jour la configuration de votre intégration en **remplaçant** votre configuration actuelle par une nouvelle, envoyée à votre organisation Datadog.

**ARGUMENTS**:

* **`service_hooks`** [*obligatoire*] :
   Tableau d'objets de hook de service (le hook de service est généré pour votre compte dans votre page d'administration Slack). Un objet de hook de service est composé des éléments suivants :

    * **`account`** [*obligatoire*] :
       Le nom de votre compte Slack.

    * **`url`** [*obligatoire*] :
       L'URL de votre hook de service Slack.

**Remarque** : les **`service_hooks`** ne sont pas requis dans la charge utile lors de l'ajout (POST) ou la mise à jour (PUT) d'une configuration de Slack existante.
