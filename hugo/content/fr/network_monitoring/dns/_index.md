---
aliases:
- /fr/network_performance_monitoring/network_table
- /fr/network_performance_monitoring/dns_monitoring
description: Diagnostiquer et débuguer les problèmes de serveur DNS
further_reading:
- link: https://www.datadoghq.com/blog/monitor-dns-with-datadog/
  tag: Blog
  text: Surveiller le DNS avec Datadog
- link: https://www.datadoghq.com/blog/monitor-coredns-with-datadog/
  tag: Blog
  text: Surveiller CoreDNS avec Datadog
- link: /network_monitoring/performance/network_analytics
  tag: Documentation
  text: Explorez les données de votre réseau qui transitent entre chaque source et
    destination.
- link: https://www.datadoghq.com/blog/dns-resolution-datadog/
  tag: Blog
  text: Utilisez la résolution DNS pour surveiller les endpoints externes et les endpoints
    cloud
title: Surveillance DNS
---

{{< img src="network_performance_monitoring/dns_monitoring/dns_overview.png" alt="La page de surveillance DNS de Datadog" >}}

<div class="alert alert-info">
Installez la version 7.33 ou une version ultérieure de l'Agent pour activer la surveillance DNS.
</div>

La surveillance DNS offre une vue d'ensemble des performances de vos serveurs DNS afin d'identifier les problèmes de DNS côté serveur et côté client. En recueillant et en affichant les métriques de DNS liées aux flux sur votre réseau, cette page permet de déterminer :

* Les pods ou les services à l'origine des requêtes DNS et les serveurs qui reçoivent ces requêtes.
* Les endpoints qui émettent le plus de requêtes ou associés aux taux de requêtes les plus élevés.
* Si le temps de réponse d'un serveur DNS face aux requêtes a augmenté de façon progressive ou abrupte.
* Les serveurs DNS associés à un taux d'erreurs élevé et le type d'erreurs émises.
* Les domaines résolus.

## Configuration

Pour utiliser la surveillance DNS, vous devez d'abord [configurer la solution Network Performance Monitoring][1]. Assurez-vous également que vous utilisez la dernière version de l'Agent, ou a minima l'Agent v7.23+ pour Linux et l'Agent v7.28+ pour Windows Server. Une fois l'installation effectuée, un onglet **DNS** apparaît dans la section Network Performance Monitoring.

Vous cherchez plutôt à utiliser la solution Network Device Monitoring ? Consultez les [instructions de configuration de NDM][2].

## Requêtes

Utilisez la barre de recherche en haut de la page pour récupérer les dépendances entre un client (qui effectue la requête DNS) et un serveur DNS (qui répond à la requête DNS). Le port de destination est automatiquement défini sur le port DNS 53, afin que toutes les dépendances renvoyées correspondent au format (client → serveur DNS).

Afin de rechercher un client spécifique, agrégez et filtrez le trafic DNS en ajoutant des tags client dans la barre de recherche. Dans la vue par défaut, le client est automatiquement regroupé en fonction des tags les plus utilisés. Ainsi, chaque ligne du tableau représente un service qui envoie des requêtes DNS à un serveur DNS.

{{< img src="network_performance_monitoring/dns_monitoring/dns_client_search.png" alt="Page de surveillance DNS avec le texte client_service:ad-server saisi dans la barre de recherche, l'option pod_name sélectionnée pour View clients as, et l'option network.dns_query sélectionnée pour View servers as." style="width:100%;">}}

Afin de rechercher un serveur DNS spécifique, filtrez la barre de recherche à l'aide de tags de serveur. Configurez l'affichage de votre serveur en sélectionnant l'une des options suivantes du menu déroulant **Group by** :

* `dns_server` : Le serveur qui reçoit les requêtes DNS. La valeur de ce tag est la même que `pod_name` ou `task_name`. Si ces tags ne sont pas disponibles, `host_name` est utilisé.
* `host` : Le hostname du serveur DNS.
* `service` : Le service exécuté sur le serveur DNS.
* `IP` : L'adresse IP du serveur DNS.
* `dns_query` : le domaine interrogé (nécessite la version 7.33+ de l'Agent).

Cet exemple montre tous les flux entre les pods dans la zone de disponibilité de l'environnement de production et les hosts qui reçoivent les requêtes DNS :

{{< img src="network_performance_monitoring/dns_monitoring/dns_query_example.png" alt="Requête avec le texte client_availability_zone:us-central1-b et client_env:prod saisi dans la barre de recherche. L'option pod_name est sélectionnée dans la liste déroulante View clients as, et l'option host est sélectionnée dans la liste déroulante View servers as." style="width:100%;">}}

### Requêtes recommandées

{{< img src="network_performance_monitoring/dns_monitoring/recommended_queries_dns.png" alt="Section Recommended queries de la page de surveillance DNS, avec la description d'une requête" style="width:100%;">}}

Tout comme la page [Network Analytics][4], trois requêtes recommandées sont affichées en haut de la page DNS. Il s'agit de requêtes statiques régulièrement utilisées pour enquête sur l'intégrité du DNS et afficher des métriques DNS globales. Ces requêtes vous permettent d'obtenir vos premiers insights sur votre configuration DNS et de commencer à résoudre les problèmes connexes. 

Vous pouvez passer votre curseur sur une requête recommandée pour afficher une brève description de la signification de ses résultats. Cliquez sur une requête pour l'exécuter ou sur **Clear query** pour la supprimer. Chaque requête recommandée possède son propre ensemble de graphiques recommandés. Lorsque vous supprimez une requête recommandée, les paramètres par défaut des graphiques sont rétablis.

## Métriques

Vos métriques DNS sont affichées dans les graphiques et le tableau associé. 

**Remarque** : les données sont recueillies toutes les 30 secondes, agrégées dans des compartiments de 5 minutes et conservées pendant 14 jours.

Les métriques de DNS suivantes sont disponibles :

| Métrique                   | Rôle                                                                                                             |
|--------------------------|-------------------------------------------------------------------------------------------------------------------------|
| **Requêtes DNS**         | Le nombre de requêtes DNS effectuées par le client.                                                                         |
| **Requêtes DNS/seconde** | Le taux de requêtes DNS effectuées par le client.                                                                             |
| **Temps de réponse DNS**    | Le temps de réponse moyen du serveur DNS à une requête du client.                                                |
| **Expirations**             | Le nombre de requêtes DNS expirées du client (affiché en pourcentage de toutes les réponses DNS). <br  /><br />**Remarque** : ces délais sont des métriques calculées en interne par NPM et peuvent ne pas correspondre aux délais DNS signalés en dehors de NPM. Ils ne sont pas identiques aux délais de DNS signalés par les clients ou les serveurs DNS.                |
| **Erreurs**               | Le nombre de requêtes du client qui ont généré des codes d'erreur DNS (affiché sous forme de pourcentage de toutes les réponses DNS).   |
| **SERVFAIL**             | Le nombre de requêtes du client qui ont généré des codes d'erreur SERVFAIL (le serveur DNS n'a pas répondu) (affiché sous forme de pourcentage de toutes les réponses DNS).   |
| **NXDOMAIN**             | Le nombre de requêtes du client qui ont généré des codes d'erreur NXDOMAIN (le nom de domaine n'existe pas) (affiché sous forme de pourcentage de toutes les réponses DNS).   |
| **OTHER**                | Le nombre de requêtes du client qui ont généré des codes d'erreur qui ne sont ni NXDOMAIN ni SERVFAIL (affiché sous forme de pourcentage de toutes les réponses DNS).   |
| **Échecs**             | Le nombre total d'expirations et d'erreurs dans les requêtes DNS du client (affiché sous forme de pourcentage de toutes les réponses DNS). |

## Tableau

Le tableau Network affiche les métriques ci-dessus pour chaque dépendance _client_ et _serveur_ définie dans votre requête.

Pour configurer les colonnes de votre tableau, utilisez le bouton **Customize** en haut à droite.

Pour affiner le trafic affiché dans votre vue, utilisez les [options][3] **Filter Traffic**.

## Volet latéral

Le volet latéral fournit des données contextuelles de télémétrie pour vous aider à débuguer rapidement les dépendances du serveur DNS. Utilisez les onglets Flows, Logs, Traces et Processes pour déterminer si une augmentation du nombre de requêtes entrantes, du temps de réponse ou du taux d'échecs d'un serveur DNS est attribuable à :

* des processus lourds monopolisant les ressources de l'infrastructure sous-jacente ;
* des erreurs d'application dans le code côté client ;
* un grand nombre de requêtes issues d'un port ou d'une adresse IP spécifique.

{{< img src="network_performance_monitoring/dns_monitoring/dns_sidepanel.png" alt="Volet latéral de la surveillance DNS" style="width:100%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/network_monitoring/performance/
[2]: /fr/network_monitoring/devices/snmp_metrics/?tab=snmpv2
[3]: /fr/network_monitoring/performance/network_analytics#table
[4]: /fr/network_monitoring/performance/network_analytics/#recommended-queries