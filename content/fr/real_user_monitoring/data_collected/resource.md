---
title: Ressources RUM
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
  text: Attributs standards Datadog
---

Toutes les ressources de votre site Web sont recueillies par défaut : images, XHR, [XMLHttpRequest][1], fichiers CSS, ressources JS et fichiers de polices.

L'[API Performance Resource Timing][2] recueille des données réseau temporelles détaillées sur le changement des ressources d'une application.

{{< img src="real_user_monitoring/data_collected/resource/resource_metric.png" alt="Métriques de ressource" >}}

## Mesure collectée

| Attribut                              | Type           | Description                                                                                                                               |
|----------------------------------------|----------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `duration`                             | nombre         | Durée totale de chargement de la ressource.                                                                                                   |
| `network.bytes_written`                | nombre (octets) | Taille de la ressource.                                                                                                                            |
| `http.performance.connect.duration`    | nombre (ns)    | Durée d'établissement d'une connexion au serveur (connectEnd - connectStart).                                                            |
| `http.performance.ssl.duration`        | nombre (ns)    | Durée d'établissement de la liaison TLS. Si la dernière requête ne suit pas le protocole HTTPS, cette métrique n'apparaît pas (connectEnd - secureConnectionStart). |
| `http.performance.dns.duration`        | nombre (ns)    | Durée de résolution du nom DNS de la dernière requête (domainLookupEnd - domainLookupStart).                                               |
| `http.performance.redirect.duration`   | nombre (ns)    | Temps passé sur les requêtes HTTP ultérieures (redirectEnd - redirectStart).                                                                      |
| `http.performance.first_byte.duration` | nombre (ns)    | Temps écoulé avant la réception du premier octet de la réponse (responseStart - RequestStart).                                           |
| `http.performance.download.duration`   | nombre (ns)    | Durée de téléchargement de la réponse (responseEnd - responseStart).                                                                         |

## Facette recueillie

| Attribut                      | Type   | Description                                                                             |
|--------------------------------|--------|-----------------------------------------------------------------------------------------|
| `resource.kind`                | chaîne | Le type de ressource à recueillir (p. ex. : CSS, JS, fichier multimédia, XHR, image).           |
| `http.status_code`             | nombre | Le code de statut de la réponse.                                                               |
| `http.url`                     | chaîne | L'URL de la ressource.                                                                       |
| `http.url_details.host`        | chaîne | La partie du host HTTP de l'URL.                                                          |
| `http.url_details.path`        | chaîne | La partie de l'URL correspondant au chemin HTTP.                                                          |
| `http.url_details.queryString` | objet | Les parties de chaîne de requête HTTP de l'URL décomposées en attributs key/value des paramètres de requête. |
| `http.url_details.scheme`      | chaîne | Le nom du protocole de l'URL (HTTP ou HTTPS).                                            |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[2]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
