---
further_reading:
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: Blog
  text: Real User Monitoring
- link: /real_user_monitoring/explorer/
  tag: Documentation
  text: Explorer vos vues dans Datadog
- link: /real_user_monitoring/explorer/visualize/
  tag: Documentation
  text: Appliquer des visualisations sur vos événements
- link: /real_user_monitoring/platform/dashboards/
  tag: Documentation
  text: Dashboards RUM
kind: documentation
title: Surveillance des performances de ressources
---

Le SDK RUM Browser recueille les ressources de chaque vue RUM (chargement de page) : [XMLHttpRequest][1] (XHR), requêtes Fetch, mais également les images, les fichiers CSS, les ressources JavaScript et les fichiers de police. Un événement de ressource RUM est généré pour chaque ressource, avec des métadonnées et des durées précises.

Les ressources RUM héritent de tout le contexte lié à la vue RUM active au moment de la collecte.

## Associer des ressources RUM à des traces de l'APM

Pour bénéficier d'une réelle visibilité de bout en bout sur vos requêtes au fur et à mesure qu'elles traversent les différentes couches de votre pile, associez vos données RUM aux traces de backend correspondantes. Vous pourrez ainsi effectuer les actions suivantes :

* Localiser les problèmes au niveau du backend ayant généré une erreur pour les utilisateurs
* Mesurer les répercussions d'un problème de votre pile sur les utilisateurs
* Afficher des requêtes de bout en bout complètes dans les flamegraphs afin de naviguer facilement entre les fonctionnalités RUM et APM en conservant un contexte précis.

Consultez la section [Associer RUM à vos traces][2] pour en savoir plus sur la configuration de cette fonctionnalité.

{{< img src="real_user_monitoring/browser/resource_performance_graph.png" alt="Informations sur les traces APM pour une ressource RUM" >}}

## Durée et métriques des ressources

Les méthodes natives Fetch et XHR pour navigateur, ainsi que l'[API Performance Resource Timing][3], recueillent des données réseau temporelles détaillées.

| Attribut                              | Type           | Description                                                                                                                               |
|----------------------------------------|----------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `duration`                             | nombre         | Durée totale de chargement de la ressource.                                                                                                   |
| `resource.size`                | nombre (octets) | Taille de la ressource.                                                                                                                            |
| `resource.connect.duration`    | nombre (ns)    | Durée d'établissement d'une connexion au serveur (connectEnd - connectStart).                                                           |
| `resource.ssl.duration`        | nombre (ns)    | Durée d'établissement de la liaison TLS. Si la dernière requête ne suit pas le protocole HTTPS, cette métrique n'apparaît pas (connectEnd - secureConnectionStart).|
| `resource.dns.duration`        | nombre (ns)    | Durée de résolution du nom DNS de la dernière requête (domainLookupEnd - domainLookupStart).                                              |
| `resource.redirect.duration`   | nombre (ns)    | Temps passé sur les requêtes HTTP ultérieures (redirectEnd - redirectStart).                                                                     |
| `resource.first_byte.duration` | nombre (ns)    | Temps écoulé avant la réception du premier octet de la réponse (responseStart - RequestStart).                                           |
| `resource.download.duration`   | nombre (ns)    | Durée de téléchargement de la réponse (responseEnd - responseStart).                                                                        |

**Remarque** : si vous ne parvenez pas à recueillir les durées détaillées de certaines ressources, consultez la rubrique [Durées des ressources et CORS](#durees-des-ressources-et-cors).

## Attributs des ressources

| Attribut                      | Type   | Description                                                                             |
|--------------------------------|--------|-----------------------------------------------------------------------------------------|
| `resource.type`                | chaîne | Le type de ressource à recueillir (par exemple, `css`, `javascript`, `media`, `XHR` ou `image`).           |
| `resource.method`                | chaîne | La méthode HTTP (par exemple, `POST` ou `GET`).           |
| `resource.status_code`             | nombre | Le code de statut de la réponse.                                                               |
| `resource.url`                     | chaîne | L'URL de la ressource.                                                                       |
| `resource.url_host`        | chaîne | La partie de l'URL correspondant au host.                                                          |
| `resource.url_path`        | chaîne | La partie de l'URL correspondant au chemin.                                                          |
| `resource.url_query` | objet | Les parties de l'URL correspondant à la chaîne de requête, décomposées en attributs key/value de paramètres de requête. |
| `resource.url_scheme`      | chaîne | Le nom du protocole de l'URL (HTTP ou HTTPS).                                            |
| `resource.provider.name`      | chaîne | Le nom du fournisseur de ressources. Valeur par défaut : `unknown`.                                            |
| `resource.provider.domain`      | chaîne | Le domaine du fournisseur de ressources.                                            |
| `resource.provider.type`      | chaîne | Le type de fournisseur de ressources (par exemple, `first-party`, `cdn`, `ad` ou `analytics`).                                            |

## Identifier les ressources tierces

La solution RUM récupère le nom et la catégorie du fournisseur de données à partir de l'élément « host » de l'URL de la ressource. Si cet élément correspond au host actuel de l'URL de la page, la catégorie est définie sur `first party`. Si ce n'est pas le cas, la catégorie prend par exemple pour valeur `cdn`, `analytics` ou `social`.

## Durées des ressources et CORS

L'[API Resource Timing][3] sert à recueillir les durées des ressources RUM. Elle est limitée par les mesures de sécurité appliquées par les navigateurs contre l'usage de multiples origines dans des scripts. Par exemple, si votre application Web est hébergée sur `www.example.com` et qu'elle charge vos images via `images.example.com`, vous obtiendrez uniquement les durées des ressources chargées qui sont hébergées sur `www.example.com` par défaut.

Pour y remédier, activez la collecte de données supplémentaires pour les ressources concernées par le CORS (Cross-Origin Resource Sharing) en ajoutant l'en-tête de réponse HTTP `Timing-Allow-Origin` à vos ressources ayant de multiples origines. Par exemple, pour autoriser les durées des ressources à accéder à n'importe quelle origine, utilisez `Timing-Allow-Origin: *`. Consultez la [documentation Web de MDN][4] (en anglais) pour en savoir plus sur le mécanisme CORS.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[2]: /fr/real_user_monitoring/platform/connect_rum_and_traces
[3]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
[4]: https://developer.mozilla.org/en-US/docs/Web/API/Resource_Timing_API/Using_the_Resource_Timing_API#Coping_with_CORS