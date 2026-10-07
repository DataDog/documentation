---
aliases:
- /fr/synthetics/api_test_timing_variations
description: Fonctionnement des durées de test API et correction des écarts
further_reading:
- link: https://docs.datadoghq.com/synthetics/metrics/#api-tests
  tag: Documentation
  text: Métriques des tests API Synthetic
title: Fonctionnement des durées de test API et correction des écarts
---


## Présentation

Grâce aux [métriques de durée][1] recueillies par les tests API Synthetic, vous pouvez identifier les goulots d'étranglement qui ralentissent les échanges entre votre serveur et le client.


## Métriques de durée


Les tests Synthetic recueillent des [métriques][1] qui mesurent les éléments suivants :


### Durée de redirection

La métrique `synthetics.http.redirect.time` mesure la durée totale des redirections. Toutes les autres durées réseau (comme la résolution DNS et la connexion TCP) correspondent à la dernière requête.

Par exemple, un test HTTP pour lequel l'option **Follow Redirects** a été activée charge la page A pendant une durée de `35 ms`. Une redirection vers la page B est ensuite effectuée, avec une durée de chargement totale de `40 ms`, puis une redirection vers la page C. Le calcul de la durée de redirection correspond à `35 ms + 40 ms = 75 ms`, tandis que la durée de chargement de la page C est répartie entre toutes les autres durées, notamment la résolution DNS et la connexion TCP.

Pour en savoir plus sur le suivi des redirections, consultez la rubrique [Tests HTTP][2].


La métrique `synthetics.http.redirect.time` est uniquement mesurée si des redirections sont effectuées lors de l'exécution du test HTTP Synthetic.

### Durée de résolution DNS

La métrique `synthetics.dns.response.time` et les métriques `*.dns.time` mesurent la durée de résolution du nom de domaine. Les tests API Synthetic utilisent des serveurs DNS communs pour la résolution des noms de domaine, notamment Google, CloudFlare, AWS et Azure. Vous pouvez ignorer ces serveurs et utiliser à la place des [emplacements privés][3] ou des [tests DNS][4].

Ces métriques sont uniquement mesurées lorsque le champ d'URL du test API contient un nom de domaine. Si vous utilisez une adresse IP, la résolution DNS n'est pas effectuée. Par conséquent, aucune durée n'est transmise pour ces métriques.


En cas de redirection, la durée de résolution DNS correspond uniquement à la dernière requête.

### Durée de connexion TCP

Les métriques `*.connect.time` mesurent la durée totale d'établissement d'une connexion TCP au serveur.

En cas de redirection, la durée de connexion TCP correspond uniquement à la dernière requête.

### Durée de liaison SSL

Les métriques `synthetics.http.ssl.time` et `synthetics.ssl.hanshake.time` mesurent la durée d'établissement d'une liaison SSL.

Ces métriques sont uniquement recueillies si la requête est transmise via HTTPS, et non via HTTP.

En cas de redirection, la durée de liaison SSL correspond uniquement à la dernière requête.


### Time to first byte

La métrique `synthetics.http.firstbyte.time` mesure le temps écoulé entre l'établissement d'une connexion et la réception du premier octet d'une réponse par le client Datadog. Cette durée comprend la durée totale d'envoi de données dans la requête.



En cas de redirection, le time to first byte correspond uniquement à la dernière requête.

### Durée de téléchargement

La métrique `synthetics.http.download.time` mesure la durée entre la réception du premier octet d'une réponse par le client Datadog et la fin du téléchargement de toute la réponse. Généralement, un corps de réponse volumineux augmente la durée de téléchargement.

Si la réponse ne contient pas de corps, la durée possède une valeur nulle.

En cas de redirection, la durée de téléchargement correspond uniquement à la dernière requête.

### Durée totale de réponse

Les métriques `*.response.time` mesurent la durée totale entre le début et la fin du traitement d'une requête par Synthetics. La durée de réponse correspond à la somme de toutes les durées réseau.

Par exemple, la formule suivante décrit la durée de réponse totale d'un test HTTP sans redirection sur un endpoint HTTPS : `synthetics.http.response.time = synthetics.http.dns.time + synthetics.http.connect.time + synthetics.http.ssl.time + synthetics.http.firstbyte.time + synthetics.http.download.time`.

## Écart entre les durées

En cas de goulot d'étranglement ou de retard durant l'une des étapes de la requête, que ce soit de la redirection au téléchargement du corps de la réponse, il est possible que vous constatiez des écarts entre les métriques de durée réseau de vos tests API.

Vérifiez les éléments suivants :

- L'écart se manifeste-t-il sur la durée, ou correspond-il plutôt à un changement soudain ?
- L'écart survient-il à un moment précis de la requête (par exemple, lors du calcul des durées DNS) ?
- Le test Synthetic concerné est-il exécuté sur plusieurs emplacements ? Si c'est le cas, l'écart concerne-t-il un seul emplacement, ou plusieurs ?
- L'écart concerne-t-il une seule URL, un seul domaine ou un seul sous-domaine, ou plutôt tous les tests ?



Pour chaque métrique de durée mesurée, les écarts peuvent s'expliquer par les facteurs suivants :

### Durée de redirection
La durée de redirection correspond à la somme de toutes les redirections d'une requête. Tout écart lors de n'importe quelle étape de la requête HTTP, que ce soit de la résolution DNS au téléchargement, peut augmenter considérablement la durée de redirection.

Par exemple, tout retard lors de la résolution DNS modifie la durée de redirection. En effet, les redirections impliquent la résolution de plusieurs domaines par les tests API.


### Durée de résolution DNS
Il est possible que la durée de résolution DNS augmente en cas de hausse de la latence des serveurs de référence.

### Durée de connexion TCP
Les écarts de connexion TCP peuvent être causés par la charge réseau et serveur, par la taille de la requête et des messages de réponse et par la distance entre l'[emplacement privé][5] ou l'emplacement géré par Synthetic et le serveur.

### Durée de liaison SSL
Les écarts de liaison SSL peuvent être causés par la charge serveur (les liaisons SSL sont généralement gourmandes en CPU), par la charge réseau et par la distance entre l'[emplacement privé][5] ou l'emplacement géré par Synthetics et le serveur. Un CDN défectueux peut également augmenter la durée de liaison SSL.

### Time to first byte
Les écarts de Time to first byte peuvent être causés par la charge réseau et serveur et par la distance entre l'[emplacement privé][5] ou l'emplacement géré par Synthetic et le serveur. Par exemple, une charge réseau élevée ou une redirection du trafic entraînée par un CDN défectueux peut augmenter la durée Time to first byte.

### Durée de téléchargement
La durée de téléchargement peut varier en fonction de l'évolution de la taille de la réponse. La taille du corps téléchargé est indiquée dans les résultats du test et transmise par la métrique `synthetics.http.response.size`.

Lorsque les écarts sont causés par la charge réseau, vous pouvez utiliser la solution [Network Performance Monitoring][6] et les [tests ICMP Synthetic][7] afin d'identifier les goulots d'étranglement potentiels.

Lorsque les écarts sont causés par la charge serveur, utilisez l'[Agent Datadog][8] et ses [intégrations][9] pour identifier les retards éventuels.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/metrics/#api-tests
[2]: /fr/synthetics/api_tests/http_tests?tab=requestoptions#define-request
[3]: /fr/synthetics/private_locations/configuration#dns-configuration
[4]: /fr/synthetics/api_tests/dns_tests#define-request
[5]: /fr/synthetics/private_locations/?tab=docker#overview
[6]: /fr/network_monitoring/performance/#overview
[7]: /fr/synthetics/api_tests/icmp_tests/#overview
[8]: /fr/getting_started/agent/#overview
[9]: /fr/integrations/