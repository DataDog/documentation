---
title: Erreurs liées au RUM
kind: documentation
further_reading:
- link: "https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/"
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

Toutes les erreurs qui apparaissent dans la console utilisateur sont recueillies.

## Facette collectée

| Attribut       | Type   | Description                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.kind`    | chaîne | Le type ou la catégorie d'erreur (ou le code dans certains cas).                   |
| `error.message` | chaîne | Un message d'une ligne lisible et concis décrivant l'événement. |
| `error.stack`   | chaîne | La trace de pile ou toutes informations complémentaires relatives à l'erreur.     |
| `error.origin`  | chaîne | L'origine de l'erreur (console, réseau, etc.).          |

### Erreur réseau

Pour les erreurs réseau, les facettes suivantes sont également recueillies :

| Attribut                      | Type   | Description                                                                             |
|--------------------------------|--------|-----------------------------------------------------------------------------------------|
| `http.status_code`             | nombre | Le code de statut de la réponse.                                                               |
| `http.url`                     | chaîne | L'URL de la ressource.                                                                       |
| `http.url_details.host`        | chaîne | La partie de l'URL correspondant au host HTTP.                                                          |
| `http.url_details.path`        | chaîne | La partie de l'URL correspondant au chemin HTTP.                                                          |
| `http.url_details.queryString` | objet | Les parties de l'URL correspondant à la chaîne de requête HTTP, décomposées en attributs key/value de paramètres de requête. |
| `http.url_details.scheme`      | chaîne | Le nom du protocole de l'URL (HTTP ou HTTPS).                                            |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}
