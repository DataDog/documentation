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

- une implémentation Datadog active ;
- accès à vos [clés d'API et d'application][2] Datadog ;
- une connaissance de base de la structure d'API et du format JSON ;

## Configuration

### Importer la collection Datadog dans Postman
<div class="postman-run-button"
data-postman-action="collection/import"
data-postman-var-1="bf4ac0b68b8ff47419c1"
data-postman-param="env%5BDatadog%20Authentication%5D=W3sia2V5IjoiYXBwbGljYXRpb25fa2V5IiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6ImFwaV9rZXkiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9XQ=="></div>
<script type="text/javascript">
  (function (p,o,s,t,m,a,n) {
    !p[s] && (p[s] = function () { (p[t] || (p[t] = [])).push(arguments); });
    !o.getElementById(s+t) && o.getElementsByTagName("head")[0].appendChild((
      (n = o.createElement("script")),
      (n.id = s+t), (n.async = 1), (n.src = m), n
    ));
  }(window, document, "_pm", "PostmanRunObject", "https://run.pstmn.io/button.js"));
</script>

</br>Cette collection fonctionne dans l'interface Web ou l'application de Postman. Son chargement peut prendre quelques secondes.

### Configuration de l'environnement Postman

Après avoir importé la collection Postman, la liste complète des appels d'API Datadog disponibles s'affiche. Elle est arrangée par dossier dans le volet de gauche de Postman.

#### Authentification

La collection comprend un [environnement Postman][3] du nom de `Datadog Authentication`, au sein duquel vous pouvez ajouter votre API Datadog et des clés d'application pour l'authentification.

Suivez ces étapes pour configurer votre environnement :

1. Cliquez sur l'icône d'engrenage **Manage Environments** dans le coin supérieur droit de Postman.

2. Sélectionnez **Datadog Authentication**.

3. Cliquez sur **Edit**.

4. Ajoutez votre [clé d'API][2] Datadog en tant que valeur initiale et valeur actuelle de la variable `api_key`. Ajoutez ensuite votre [clé d'application][2] Datadog en tant que valeur initiale et valeur actuelle de la variable `application_key`.

{{< site-region region="eu" >}}

#### Basculer vers l'endpoint de l'API européenne

Si vous accédez à l'application Datadog européenne, vous devez modifier la configuration de la collection Postman afin d'accéder à l'URL de l'endpoint européen `https://api.datadoghq.eu`, à la place de l'URL de l'endpoint par défaut.

Procédez comme suit pour apporter cette modification :

1. Dans le volet gauche du répertoire de collection d'API Datadog, cliquez sur le menu représentant trois points, puis sélectionnez **Edit**.

{{< img src="getting_started/postman/view-more-actions.png" alt="View more actions">}}

2. Dans l'onglet **Variables**, décochez la variable `site` avec la valeur `datadoghq.com` et cochez la variable `site` avec la valeur `datadoghq.eu`.

{{< img src="getting_started/postman/variables.png" alt="Mettre à jour la variable site">}}

3. Cliquez sur **Update**.

{{< /site-region >}}

## Utilisation de la collection

Une fois la configuration terminée, vous pouvez à présent effectuer des appels d'API. Dans le répertoire Postman -> Datadog, vous trouverez des sous-répertoires pour chaque type de catégorie d'API énumérée dans la [section relative aux API de Datadog][4]. Développez les sous-répertoires pour afficher les méthodes HTTP et les noms des appels d'API.

### Builder

Lorsque vous cliquez sur un appel d'API dans la collection, il s'affiche dans le volet `Builder`, à droite. Depuis ce volet, vous pouvez envoyer l'appel d'API et consulter le statut renvoyé, le délai de réponse et le code de la réponse d'API.

{{< img src="getting_started/postman/apiGetCalls.png" alt="Réponse API Postman" style="width:70%;">}}

### Description

Lorsque vous cliquez sur le nom d'un endpoint, une description de l'endpoint et de tous les paramètres obligatoires/facultatifs s'affiche pour vous aider à créer vos requêtes :

{{< img src="getting_started/postman/description.mp4" alt="Description Postman" video="true" >}}

### Params

L'onglet **Params** affiche tous les paramètres et toutes les valeurs actuellement inclus dans l'appel d'API. Depuis cet onglet, vous pouvez ajouter des paramètres et des valeurs. Consultez les arguments disponibles dans la section correspondante de la [documentation sur l'API Datadog][5].

{{< img src="getting_started/postman/parameters.png" alt="Paramètres Postman" style="width:70%;">}}

Cet onglet remplace l'affichage de la structure `param1:value1&param2:value2` de l'appel d'API.

**Remarques** :

- Il n'est pas nécessaire d'ajouter les esperluettes (&) et les deux-points (:) dans le tableau des paramètres. Postman les insère automatiquement.
- Tous les placeholders respectent le format `<PLACEHOLDER>`. Vous devez les remplacer avant de pouvoir lancer une requête.

[1]: https://www.postman.com/
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://learning.postman.com/docs/postman/variables-and-environments/variables/#environments-in-postman
[4]: /fr/api/v1/organizations/
[5]: /fr/api/