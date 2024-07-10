---
aliases:
- /fr/developers/faq/using-postman-with-datadog-apis
- /fr/getting_started/using-postman-with-datadog-apis
- /fr/developers/guide/using-postman-with-datadog-apis
title: Utiliser Postman avec les API Datadog
---

## Présentation

L'API Datadog vous permet d'envoyer des données à Datadog et de recevoir des données de Datadog. Elle utilise des URL orientées ressources et des codes de statut afin d'indiquer la réussite ou l'échec des requêtes et renvoie un objet JSON à partir de toutes les requêtes.

Cet article explique comment utiliser [Postman][1] pour effectuer des appels d'API vers Datadog en vous montrant les actions disponibles au sein de l'API Datadog et vous donne une introduction de haut niveau de l'utilisation des méthodes  `GET`, `POST`, `PUT`, et `DELETE` de Postman.

## Prérequis

Vous avez :

- une implémentation Datadog active ;
- accès à vos [clés d'API et d'application][2] Datadog ;
- une connaissance de base de la structure d'API et du format JSON ;
- un [compte Postman gratuit][3].

## Configuration

### Importer la collection Datadog dans Postman

Commencez par [vous connecter à Postman][4]. Datadog recommande de [télécharger l'application Postman][5].

</br>
<div class="postman-run-button"
data-postman-action="collection/fork"
data-postman-visibility="public"
data-postman-var-1="20651290-809b13c1-4ada-46c1-af65-ab276c434068"
data-postman-collection-url="entityId=20651290-809b13c1-4ada-46c1-af65-ab276c434068&entityType=collection&workspaceId=bf049f54-c695-4e91-b879-0cad1854bafa"
data-postman-param="env%5BDatadog%20Authentication%5D=W3sia2V5IjoiYXBpX2tleSIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwic2Vzc2lvblZhbHVlIjoiIiwic2Vzc2lvbkluZGV4IjowfSx7ImtleSI6ImFwcGxpY2F0aW9uX2tleSIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwic2Vzc2lvblZhbHVlIjoiIiwic2Vzc2lvbkluZGV4IjoxfV0="></div>
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

La collection comprend un [environnement Postman][6] du nom de `Datadog Authentication`, au sein duquel vous pouvez ajouter votre clé d'API Datadog et des clés d'application pour l'authentification.

Suivez ces étapes pour configurer votre environnement :

1. Cliquez sur le menu déroulant **Environments** en haut à droite de Postman. Si aucun environnement n'est sélectionné, l'option `No Environment` est affichée.

2. Sélectionnez **Datadog Authentication**.

3. Modifiez l'environnement **Datadog Authentication** en ajoutant votre [clé d'API][2] Datadog en tant que valeur initiale et actuelle de la variable `api_key`. Ajoutez également votre [clé d'application][2] Datadog en tant que valeur initiale et actuelle de la variable `application_key`.

#### Changer l'endpoint de l'API

Si vous accédez à un autre site Datadog que `https://api.datadoghq.com`, vous devez modifier la collection Postman afin qu'elle utilise une autre URL d'endpoint.

Suivez les étapes ci-dessous pour modifier l'instance afin de spécifier votre site, à savoir ({{< region-param key="dd_site_name" >}}) :

1. Dans le volet gauche du répertoire de collection d'API Datadog, cliquez sur le menu représentant trois points, puis sélectionnez **Edit**.

    {{< img src="getting_started/postman/view-more-actions.png" alt="Afficher plus d'actions">}}

2. Dans l'onglet **Variables**, décochez la variable `site` avec la valeur `datadoghq.com` et cochez la variable `site` avec la valeur {{< region-param key="dd_site" code="true" >}}.

3. Cliquez sur **Update**.

## Utilisation de la collection

Une fois la configuration terminée, vous pouvez à présent effectuer des appels d'API. Dans le répertoire Postman -> Datadog, vous trouverez des sous-répertoires pour chaque type de catégorie d'API énumérée dans la [section relative aux API de Datadog][7]. Développez les sous-répertoires pour afficher les méthodes HTTP et les noms des appels d'API.

### Builder

Lorsque vous cliquez sur un appel d'API dans la collection, il s'affiche dans le volet `Builder`, à droite. Depuis ce volet, vous pouvez envoyer l'appel d'API et consulter le statut renvoyé, le délai de réponse et le code de la réponse d'API.

{{< img src="getting_started/postman/apiGetCalls.png" alt="réponse_api_postman" style="width:70%;">}}

### Description

Lorsque vous cliquez sur le nom d'un endpoint, une description de l'endpoint et de tous les paramètres obligatoires/facultatifs s'affiche pour vous aider à créer vos requêtes :

{{< img src="getting_started/postman/description.mp4" alt="Description Postman" video="true" >}}

### Params

L'onglet **Params** affiche tous les paramètres et toutes les valeurs inclus dans l'appel d'API. Vous pouvez ajouter des paramètres et des valeurs depuis cet onglet. Consultez les arguments disponibles dans la section correspondante de la [documentation sur les API Datadog][8].

{{< img src="getting_started/postman/parameters.png" alt="paramètre_postman" style="width:70%;">}}

Cet onglet remplace l'affichage de la structure `param1:value1&param2:value2` de l'appel d'API.

**Remarques** :

- Il n'est pas nécessaire d'ajouter les esperluettes (&) et les deux-points (:) dans le tableau des paramètres. Postman les insère automatiquement.
- Tous les placeholders respectent le format `<PLACEHOLDER>`. Vous devez les remplacer avant de pouvoir lancer une requête.

[1]: https://www.postman.com/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://identity.getpostman.com/signup
[4]: https://identity.getpostman.com/login
[5]: https://www.postman.com/downloads/
[6]: https://learning.postman.com/docs/postman/variables-and-environments/variables/#environments-in-postman
[7]: /fr/api/latest/#api-reference
[8]: /fr/api/