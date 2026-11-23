---
further_reading:
- link: /disaster_recovery/
  tag: Documentation
  text: Datadog Disaster Recovery (DDR)
site_support_id: datadog_disaster_recovery
title: Paramètres recommandés pour le basculement DNS
---
Configurez la mise en cache DNS et la réutilisation des connexions pour minimiser le temps de basculement DNS pour Datadog Disaster Recovery (DDR).

Le basculement prend du temps car les caches DNS doivent s'actualiser et les sources de télémétrie doivent se reconnecter avant que les données n'atteignent la région secondaire. Configurez ces paramètres ensemble pour vous aider à atteindre votre objectif de temps de récupération (RTO). Les délais à travers ces couches peuvent s'accumuler, alors tenez compte de leur effet combiné lors du choix des paramètres de durée de vie (TTL) et de réinitialisation de connexion.

## Configuration de l'enregistrement DNS {#dns-record-configuration}

| Paramètre | Configuration recommandée | Description |
| --- | --- | --- |
| TTL de l'enregistrement A ou CNAME | Définissez sur 60 à 300 secondes. | **Impact élevé.** Contrôle la durée pendant laquelle les résolveurs mettent l'enregistrement en cache avant de vérifier si une valeur mise à jour existe après le basculement. Consultez la [RFC 1035][1] (champ TTL) et la [RFC 2181][2] (clarifications sur le TTL, y compris la gestion de TTL=0). |
| TTL de mise en cache négative | Définissez sur 60 à 300 secondes, en faisant correspondre le TTL de votre enregistrement A ou CNAME. Vérifiez à la fois le TTL de l'enregistrement SOA et son champ `MINIMUM`. | **Impact moyen.** Si une recherche renvoie NXDOMAIN (le domaine n'existe pas) ou NODATA (le type d'enregistrement demandé n'existe pas) pendant le basculement, les résolveurs mettent cette réponse en cache. Le TTL de mise en cache négative est la valeur la plus basse entre le TTL de l'enregistrement SOA et son champ `MINIMUM`. Consultez la [RFC 2308][3]. |
| Profondeur de la chaîne CNAME | Pointez votre enregistrement DNS directement vers l'endpoint du centre de données Datadog, sans enregistrements `CNAME` intermédiaires. | **Impact moyen.** Chaque enregistrement de la chaîne possède son propre TTL, et chaque saut ajoute un enregistrement que vous devez maintenir synchronisé. |

## Mise en cache DNS du système d'exploitation et des applications {#os-and-application-dns-caching}

| Paramètre | Configuration recommandée | Description |
| --- | --- | --- |
| Mise en cache DNS des applications | Pour les applications dotées d'un cache DNS, définissez le TTL du cache sur 60 à 300 secondes, en faisant correspondre le TTL de votre enregistrement DNS. Pour les applications basées sur la JVM, configurez `networkaddress.cache.ttl`. | **Impact élevé.** Les caches DNS des applications peuvent conserver d'anciennes adresses après la modification des enregistrements DNS. Certaines configurations JVM mettent en cache les adresses indéfiniment. Vérifiez le comportement de mise en cache pour chaque runtime et client HTTP, y compris les clients Go et Node.js. |
| Mise en cache DNS du système d'exploitation | Confirmez que les TTL du cache DNS du système d'exploitation sont de 300 secondes ou moins sur les hosts exécutant des expéditeurs de télémétrie. | **Impact faible à moyen.** Les caches DNS du système d'exploitation, tels que `nscd`, `systemd-resolved` et le client DNS Windows, peuvent également augmenter le temps de basculement. |

## Comportement de l'expéditeur et de l'Agent {#sender-and-agent-behavior}

Tout Datadog Agent utilisant le basculement basé sur DNS de DDR doit remplir les [prérequis DDR][4].

| Paramètre | Configuration recommandée | Description |
| --- | --- | --- |
| Réutilisation de la connexion de l'Agent | Définissez un intervalle de réinitialisation de connexion de 1 à 300 secondes pour chaque type de télémétrie. Consultez [les exemples de configuration de l'Agent](#agent-configuration-examples) pour les paramètres correspondants. | **Impact élevé.** Les connexions de longue durée peuvent continuer à envoyer de la télémétrie vers la région principale après des changements DNS. Configurez des reconnexions périodiques afin que l'Agent effectue à nouveau la résolution DNS. |
| Sources de télémétrie hors Agent | Validez chaque source indépendamment. Configurez des reconnexions périodiques à des intervalles de 300 secondes ou moins, lorsque cela est pris en charge. Vérifiez que les échecs de connexion déclenchent une résolution DNS immédiate au lieu de tentatives répétées vers une IP mise en cache. | **Impact élevé.** Les sources de télémétrie sans Agent, telles que les extensions Lambda, OpenTelemetry Collector, Fluent Bit et les clients API personnalisés, gèrent chacune la mise en cache DNS et la réutilisation des connexions différemment. Leur comportement après un échec de connexion affecte également le temps de basculement. |

Le fait de résoudre à nouveau le DNS peut toujours renvoyer une adresse mise en cache. Configurez les [TTL des enregistrements DNS](#dns-record-configuration) et les [caches DNS du système d'exploitation et des applications](#os-and-application-dns-caching) conjointement avec les intervalles de réinitialisation de connexion.

### Exemples de configuration de l'Agent {#agent-configuration-examples}

Remplacez `<CUSTOM_INTAKE_URL>` par l'endpoint d'ingestion que Datadog configure lors de l'intégration DDR. Cet endpoint utilise votre domaine délégué Datadog (`<CUSTOMER>.mrf.datadoghq.com`). Consultez [Configurer le basculement DNS initié par le client][5].

Dans `datadog.yaml`, mettez à jour les paramètres d'intervalle de réinitialisation de connexion pour chaque type de télémétrie que vous envoyez. Configurez un intervalle de 300 secondes maximum. Ne définissez pas l'intervalle sur `0`, ce qui désactive la reconnexion périodique.

**Métriques** (`datadog.yaml`) :

```yaml
dd_url: <CUSTOM_INTAKE_URL>
# Reset connections every 300 seconds to resolve DNS again.
forwarder_connection_reset_interval: 300
```

**Logs** (`datadog.yaml`) :

```yaml
logs_config:
  logs_dd_url: <CUSTOM_INTAKE_URL>
  # Reset connections every 300 seconds to resolve DNS again.
  connection_reset_interval: 300
```

**Traces APM** (`datadog.yaml`) :

```yaml
apm_config:
  apm_dd_url: <CUSTOM_INTAKE_URL>
  # Reset connections every 300 seconds to resolve DNS again.
  connection_reset_interval: 300
```

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.rfc-editor.org/rfc/rfc1035
[2]: https://www.rfc-editor.org/rfc/rfc2181
[3]: https://www.rfc-editor.org/rfc/rfc2308
[4]: /fr/disaster_recovery/#prerequisites
[5]: /fr/disaster_recovery/#set-up-customer-initiated-dns-failover