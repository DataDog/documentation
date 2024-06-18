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
- link: /network_monitoring/performance/network_page
  tag: Documentation
  text: Explorez les données de votre réseau qui transitent entre chaque source et
    destination.
- link: https://www.datadoghq.com/blog/dns-resolution-datadog/
  tag: Blog
  text: Utilisez la résolution DNS pour surveiller les endpoints externes et les endpoints
    cloud
title: Surveillance DNS
---

{{< img src="network_performance_monitoring/dns_default.png" alt="Surveillance DNS" >}}

<div class="alert alert-info">
Installez la version 7.33 de l'Agent pour activer la surveillance DNS.
</div>

La surveillance DNS offre une vue d'ensemble des performances de vos serveurs DNS afin d'identifier les problèmes de DNS côté serveur et côté client. En recueillant et en affichant les métriques de DNS liées aux flux sur votre réseau, cette page permet de déterminer :

* Les pods ou les services à l'origine des requêtes DNS et les serveurs qui reçoivent ces requêtes.
* Les endpoints qui émettent le plus de requêtes ou associés aux taux de requêtes les plus élevés.
* Si le temps de réponse d'un serveur DNS face aux requêtes a augmenté de façon progressive ou abrupte.
* Les serveurs DNS associés à un taux d'erreurs élevé et le type d'erreurs émises.
* Les domaines résolus.

## Configuration

Pour utiliser la surveillance DNS, vous devez d'abord [configurer la solution Network Performance Monitoring][1]. Assurez-vous également que vous utilisez la dernière version de l'Agent, ou a minima l'Agent v7.23+ pour Linux et l'Agent v7.28+ pour Windows Server. Une fois l'installation effectuée, un onglet DNS apparaît dans la section Network Performance Monitoring.

Vous cherchez plutôt à utiliser la solution Network Device Monitoring ? Consultez les [instructions de configuration de NDM][2].

## Requêtes

Utilisez les barres de recherche source et destination en haut de la page afin de récupérer les dépendances entre un client (_source_), qui effectue la requête DNS, et un serveur DNS (_destination_), qui répond à la requête DNS. Le port de destination est automatiquement défini sur le port DNS 53 afin que toutes les dépendances renvoyées correspondent au format (client → serveur DNS).

Afin de rechercher un client spécifique, agrégez et filtrez le trafic DNS en ajoutant des tags dans la barre de recherche de source. Dans la vue par défaut, la source est agrégée selon le tag `service`. Ainsi, chaque ligne du tableau représente un service qui effectue des requêtes DNS auprès d'un serveur DNS.

{{< img src="network_performance_monitoring/dns_default.png" alt="Vue par défaut de la surveillance DNS"  style="width:100%;">}}

Afin de rechercher un serveur DNS spécifique, filtrez la barre de recherche de destination en utilisant des tags. Pour configurer l'affichage de votre destination, sélectionnez l'une des options suivantes dans le menu déroulant **Group by** :

* `dns_server` : Le serveur qui reçoit les requêtes DNS. La valeur de ce tag est la même que `pod_name` ou `task_name`. Si ces tags ne sont pas disponibles, `host_name` est utilisé.
* `host` : Le hostname du serveur DNS.
* `service` : Le service exécuté sur le serveur DNS.
* `IP` : L'adresse IP du serveur DNS.
* `dns_query` : **nécessite la version 7.33+ de l'Agent**. Le domaine interrogé.

Cet exemple montre tous les flux entre les pods dans la zone de disponibilité de l'environnement de production et les hosts qui reçoivent les requêtes DNS :

{{< img src="network_performance_monitoring/dns_query_screenshot.png" alt="Recherche des pods qui effectuent des requêtes auprès de plusieurs serveurs DNS"  style="width:100%;">}}

## Métriques

Vos métriques de DNS sont affichées dans les graphiques et le tableau associé. 

**Remarque** : les données sont recueillies toutes les 30 secondes, agrégées dans des compartiments de 5 minutes et conservées pendant 14 jours.

Les métriques de DNS suivantes sont disponibles :

| Métrique                   | Description                                                                                                             |
|--------------------------|-------------------------------------------------------------------------------------------------------------------------|
| **Requêtes DNS**         | Le nombre de requêtes DNS effectuées par le client.                                                                         |
| **Requêtes DNS/seconde** | Le taux de requêtes DNS effectuées par le client.                                                                             |
| **Temps de réponse DNS**    | Le temps de réponse moyen du serveur DNS à une requête du client.                                                |
| **Expirations**             | Le nombre de requêtes DNS du client qui ont dépassé le délai d'expiration (affiché sous forme de pourcentage de toutes les réponses DNS).                    |
| **Erreurs**               | Le nombre de requêtes du client qui ont généré des codes d'erreur DNS (affiché sous forme de pourcentage de toutes les réponses DNS).   |
| **SERVFAIL**             | Le nombre de requêtes du client qui ont généré des codes d'erreur SERVFAIL (le serveur DNS n'a pas répondu) (affiché sous forme de pourcentage de toutes les réponses DNS).   |
| **NXDOMAIN**             | Le nombre de requêtes du client qui ont généré des codes d'erreur NXDOMAIN (le nom de domaine n'existe pas) (affiché sous forme de pourcentage de toutes les réponses DNS).   |
| **OTHER**                | Le nombre de requêtes du client qui ont généré des codes d'erreur qui ne sont ni NXDOMAIN ni SERVFAIL (affiché sous forme de pourcentage de toutes les réponses DNS).   |
| **Échecs**             | Le nombre total d'expirations et d'erreurs dans les requêtes DNS du client (affiché sous forme de pourcentage de toutes les réponses DNS). |

## Tableau

Le tableau Network affiche les métriques ci-dessous pour chaque dépendance _source_/_destination_ définie dans votre requête.

Pour configurer les colonnes de votre tableau, utilisez le bouton **Customize** en haut à droite.

Pour affiner le trafic affiché dans votre vue, utilisez les [options][3] **Filter Traffic**.

## Volet latéral

Le volet latéral fournit des données de télémétrie contextuelle pour vous aider à débuguer rapidement les dépendances du serveur DNS. Utilisez les onglets Flows, Logs, Traces et Processes pour déterminer si une augmentation du nombre de requêtes entrantes, du temps de réponse ou du taux d'échecs d'un serveur DNS est attribuable à :

* des processus lourds monopolisant les ressources de l'infrastructure sous-jacente
* des erreurs d'application dans le code côté client
* un grand nombre de requêtes issues d'un port ou d'une adresse IP spécifique

{{< img src="network_performance_monitoring/dns_sidepanel.png" alt="Volet latéral de la surveillance DNS"  style="width:100%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/network_monitoring/performance/
[2]: /fr/network_monitoring/devices/snmp_metrics/?tab=snmpv2
[3]: /fr/network_monitoring/performance/network_page#table