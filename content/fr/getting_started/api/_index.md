---
title: Utiliser Postman avec les API Datadog
kind: documentation
aliases:
  - /fr/developers/faq/using-postman-with-datadog-apis
  - /fr/getting_started/using-postman-with-datadog-apis
  - /fr/developers/guide/using-postman-with-datadog-apis
---
## Présentation

L'API Datadog vous permet d'envoyer des données à Datadog et de recevoir des données de Datadog. Elle utilise des URL orientées ressources et des codes de statut afin d'indiquer la réussite ou l'échec des requêtes et renvoie un objet JSON à partir de toutes les requêtes.

Cet article explique comment utiliser [Postman][1] pour effectuer des appels d'API vers Datadog en vous montrant les actions disponibles au sein de l'API Datadog et vous donne une introduction de haut niveau de l'utilisation des méthodes  `GET`, `POST`, `PUT`, et `DELETE` de Postman.

## Prérequis

Vous avez :

* Une implémentation Datadog active.
* Accès à vos [clés d'API et d'application][2] Datadog.
* Le [client API Postman installé][1].
* Une connaissance de base de la structure d'API et du formatage JSON.

## Implémentation

### Importer la collection Datadog

Une fois les prérequis établis :

1. Téléchargez la [collection Postman Datadog][3] (modèles d'appel d'API préconfigurés).
    Dans Postman, une collection est un répertoire d'appels d'API organisés pour faciliter leur modification, enregistrement et réutilisation.

2. Importez la collection Postman Datadog :
    * Ouvrez Postman
    * Cliquez sur **Import**
    * Sélectionnez le fichier [datadog_collection.json][3] téléchargé à l'étape 1.

Vous disposez maintenant d'une collection Datadog contenant de nombreux exemples différents d'API.

**Remarque** : les appels d'API ne fonctionnent pas encore à cette étape. Continuez à lire pour configurer votre environnement Datadog-Postman.

### Configuration de l'environnement Postman

Après l'importation de la collection Postman, une liste complète des appels d'API Datadog disponibles est arrangée par répertoire dans le volet de gauche de Postman.
Dans les répertoires, les appels d'API ont des variables entrées pour `datadog_site`, `datadog_api_key`, et `datadog_application_key` :

{{< img src="getting_started/postman/SetAPIKeys.png" alt="template variables de l'API Postman"  style="width:70%;">}}

Cela vous permet de configurer les [environnements Postman][4] et d'enregistrer votre site Datadog, ainsi que les clés d'application pour l'authentification. Si vous avez plusieurs organisations Datadog, définissez plusieurs [environnements Postman][4] pour effectuer des appels d'API vers différentes organisations sans modifier les appels d'API dans la collection Postman Datadog.

Suivez ces étapes pour configurer votre environnement :

1. Cliquez sur l'icône de **gestion des environnements** en forme d'engrenage dans le coin supérieur droit de Postman.

2. Cliquez sur **Add** pour entrer un **nom d'environnement**.

3. Dans le tableau, ajoutez les variables `datadog_api_key` et `datadog_application_key`. Dans la colonne **Current Value**, entrez vos [clés d'API et d'application Datadog][2] réelles.

4. Ajoutez la variable `datadog_site`. Dans la colonne **Current Value**, entrez `com` si vous êtes sur le site américain Datadog ou `eu` si vous êtes sur le site européen Datadog.

5. Facultatif : si vous avez plusieurs organisations Datadog, répétez les étapes 1 à 4 pour chaque organisation.

{{< img src="getting_started/postman/setAPIKeys2.png" alt="template variables de l'API Postman 2"  style="width:70%;">}}

## Utilisation de la collection

Une fois la configuration terminée, vous êtes prêt(e) à effectuer des appels d'API. Dans le répertoire Postman -> Datadog, vous trouverez des sous-répertoires pour chaque type de catégorie d'API énuméré dans la [référence de l'API Datadog][5]. Développez les sous-répertoires pour afficher les méthodes HTTP et les noms des appels d'API.

**Remarque** : n'oubliez pas de définir votre environnement défini dans le coin supérieur droit de l'interface Postman :

{{< img src="getting_started/postman/env_setup.png" alt="Configuration de l'environnement" style="width:40%;">}}

### Builder

Lorsque vous cliquez sur un appel d'API dans la collection, il s'affiche dans le volet `Builder`, à droite. Depuis ce volet, vous pouvez envoyer l'appel d'API et voir le statut retourné, le temps de réponse et le code de réponse d'API.

{{< img src="getting_started/postman/apiGetCalls.png" alt="Réponse API Postman" style="width:70%;">}}

### Description

Lorsque vous cliquez sur le nom d'un endpoint, une description du endpoint et de tous les paramètres obligatoires/facultatifs s'affiche pour vous aider à créer vos requêtes :

{{< img src="getting_started/postman/description.mp4" alt="Description Postman" video="true" >}}

### Params

L'onglet **Params** affiche tous les paramètres et toutes les valeurs actuellement sur l'appel d'API. Depuis cet onglet, vous pouvez ajouter des paramètres et des valeurs. Consultez les arguments disponibles dans la section correspondante de la [documentation de l'API Datadog][6].

{{< img src="getting_started/postman/parameters.png" alt="Paramètres Postman" style="width:70%;">}}

Cet onglet remplace l'affichage de la structure `param1:value1&param2:value2` de l'appel d'API.

**Remarques :**

* L'esperluette (&) et les deux-points (:) ne sont pas nécessaires dans le tableau de paramètres. Postman les ajoute pour vous.
* Tous les placeholders respectent le format : `<PLACEHOLDER>` . Ils doivent être remplacés avant de lancer une requête.

[1]: https://www.getpostman.com
[2]: https://app.datadoghq.com/account/settings#api
[3]: /resources/json/datadog_collection.json
[4]: https://www.getpostman.com/docs/v6/postman/environments_and_globals/manage_environments
[5]: /fr/api/#organizations
[6]: /fr/api