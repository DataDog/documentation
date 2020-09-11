---
title: Erreurs liées au RUM
kind: documentation
further_reading:
  - link: 'https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/'
    tag: Blog
    text: Real User Monitoring
  - link: /real_user_monitoring/dashboards/
    tag: Documentation
    text: Visualisez vos données RUM sur des dashboards prêts à l'emploi
  - link: /real_user_monitoring/explorer/
    tag: Documentation
    text: Explorez vos vues dans Datadog
  - link: /logs/processing/attributes_naming_convention/
    tag: Documentation
    text: Attributs standard Datadog
---
Les erreurs frontend sont automatiquement recueillies avec le service Real User Monitoring (RUM). Le message d'erreur et la trace de pile sont inclus lorsque cela est possible.

## Origines des erreurs
Les erreurs frontend sont réparties en 3 catégories différentes en fonction de leur `error.origin` :

- **réseau** : erreurs XHR ou Fetch résultant de requêtes AJAX. Les attributs spécifiques aux erreurs réseau sont disponibles [dans la documentation][1]
- **source** : exceptions non gérées ou objets Promise rejetés non gérés (ces erreurs sont liées au code source)
- **console** : appels d'API console.error()

## Facette recueillie

| Attribut       | Type   | Description                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.origin`  | chaîne | L'origine de l'erreur (console, réseau, etc.).          |
| `error.kind`    | chaîne | Le type ou la catégorie d'erreur (ou le code dans certains cas).                   |
| `error.message` | chaîne | Un message d'une ligne lisible et concis décrivant l'événement. |
| `error.stack`   | chaîne | La trace de pile ou toutes informations complémentaires relatives à l'erreur.     |

### Erreurs réseau

Les erreurs réseau comprennent des informations sur la requête HTTP ayant échoué. Par conséquent, les facettes suivantes sont également recueillies :

| Attribut                      | Type   | Description                                                                             |
|--------------------------------|--------|-----------------------------------------------------------------------------------------|
| `http.status_code`             | nombre | Le code de statut de la réponse.                                                               |
| `http.url`                     | chaîne | L'URL de la ressource.                                                                       |
| `http.url_details.host`        | chaîne | La partie de l'URL correspondant au host HTTP.                                                          |
| `http.url_details.path`        | chaîne | La partie de l'URL correspondant au chemin HTTP.                                                          |
| `http.url_details.queryString` | objet | Les parties de l'URL correspondant à la chaîne de requête HTTP, décomposées en attributs key/value de paramètres de requête. |
| `http.url_details.scheme`      | chaîne | Le nom du protocole de l'URL (HTTP ou HTTPS).                                            |

### Erreurs de source

Les erreurs de source comprennent des informations au niveau du code concernant l'erreur. Plus d'informations concernant les différents types d'erreurs sont disponibles dans [la documentation MDN][2].

| Attribut       | Type   | Description                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.kind`    | chaîne | Le type ou la catégorie d'erreur (ou le code dans certains cas).                   |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/data_collected/error/#network-errors
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error