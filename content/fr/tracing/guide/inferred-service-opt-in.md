---
disable_toc: false
further_reading:
- link: /tracing/services/
  tag: Documentation
  text: Observabilité des services
- link: /tracing/trace_collection/
  tag: Documentation
  text: Envoyer des traces à Datadog
- link: /tracing/trace_collection/dd_libraries/
  tag: Documentation
  text: Ajouter la bibliothèque de tracing Datadog

private: true
title: Nouvelle page Service et services déduits
---

{{< callout url="https://docs.google.com/forms/d/1imGm-4SfOPjwAr6fwgMgQe88mp4Y-n_zV0K3DcNW4UA/edit" d_target="#signupModal" btn_hidden="true" btn_hidden="false" header="Participez à la version bêta privée !" >}}
Les services déduits et la refonte de la page Service sont en version bêta privée. Pour demander à rejoindre la bêta privée, veuillez remplir ce formulaire.
{{< /callout >}}

Suivez les étapes ci-dessous pour activer la nouvelle carte des dépendances sur la [page Service][1], puis ajoutez les _services déduits_ aux pages [Service Map][2] et [Service Catalog][3].

## Services déduits

Datadog peut automatiquement identifier les dépendances d'un service instrumenté, comme une base de données ou une API tierce, et ce même si la dépendance en question n'a pas encore été instrumentée. Datadog déduit la présence de ces dépendances ainsi que leurs performances d'après les informations sur les requêtes sortantes de vos services instrumentés.

Datadog utilise les attributs des spans pour déterminer les noms et types des services déduits. Les API externes déduites utilisent par défaut le schéma d'attribution de nom `net.peer.name` (`api.stripe.com`, `api.twilio.com` ou `us6.api.mailchimp.com`, par exemple). Les bases de données déduites utilisent le schéma d'attribution de nom par défaut, c'est-à-dire `db.instance`.

Si vous utilisez le traceur Go, Java, NodeJS, PHP, .NET ou Ruby, vous pouvez personnaliser le nom par défaut des services déduits. Pour en savoir plus, consultez la section « Mappage de services homologues » ci-dessous dans votre langage.

**Remarque :** si vous configurez des monitors, des dashboards ou des notebooks pour un service déduit spécifique pendant la bêta, vous devrez peut-être les mettre à jour en cas de modification du schéma d'attribution de nom.

## Carte des dépendances

Utilisez la carte des dépendances pour visualiser les communications entre les différents services et obtenir des informations sur les composants système, tels que les bases de données, les files d'attente et les dépendances tierces. Vous pouvez regrouper les dépendances par type et les filtrer par requêtes, latence ou erreurs afin d'identifier les connexions lentes ou ayant échoué.

{{< img src="tracing/services/service_page/dependencies.png" alt="La section des dépendances" style="width:100%;">}}

## Activer la carte des dépendances

Pour activer la carte des dépendances, vous devez modifier la configuration de votre Agent Datadog et celle de votre traceur APM. Consultez la section relative à la [migration du nom de service global par défaut](#migration-du-nom-de-service-global-par-defaut) pour déterminer si vous devez procéder ou non à une migration.

### Configuration de l'Agent Datadog

Prérequis :
- Version de l'Agent Datadog >= [7.45.0][4].

Définissez les éléments suivants dans votre [fichier de configuration][5] `datadog.yaml` :
- `DD_APM_COMPUTE_STATS_BY_SPAN_KIND=true`
- `DD_APM_PEER_SERVICE_AGGREGATION=true`


### Configuration de l'exportateur Datadog pour le Collector OpenTelemetry

Définissez les éléments suivants dans votre [fichier de configuration][6] `collector.yaml` :
- `compute_stats_by_span_kind=true`
- `peer_service_aggregation=true`


### Configuration du traceur APM

{{< tabs >}}
{{% tab "Java" %}}

La version minimale requise du traceur Java est la 1.16.0. Nous vous recommandons d'effectuer régulièrement une mise à niveau vers la dernière version pour bénéficier des nouveautés et des corrections de bugs.

[Télécharger la dernière version du traceur Java][1].

Pour activer la carte des dépendances, ajoutez les variables d'environnement ou propriétés système suivantes aux paramètres de votre traceur :

| Variable d'environnement | Propriété système |
| ---  | ----------- |
| `DD_TRACE_PEER_SERVICE_DEFAULTS_ENABLED=true` | `-Ddd.trace.peer.service.defaults.enabled=true` |
| `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true` | `-Ddd.trace.remove.integration-service-names.enabled=true` |

Supprimez les paramètres suivants de votre configuration :

| Variable d'environnement | Motif de la suppression |
| ---  | ----------- |
| `DD_SERVICE_MAPPING` | Tous les noms de service prennent la valeur par défaut `DD_SERVICE`. |
| `DD_TRACE_SPLIT_BY_TAGS` | Les services déduits sont automatiquement affichés depuis l'ajout du tag `peer.service`. |
| `DD_TRACE_DB_CLIENT_SPLIT_BY_INSTANCE` | Les instances de base de données sont déduites d'après le tag `peer.service`. |

#### Mappage de services homologues

Datadog utilise un schéma d'attribution de nom par défaut pour les services déduits. Si vous le souhaitez, vous pouvez associer des valeurs spécifiques à des services homologues via les paramètres suivants :
**Remarque** : les paires `key:value` sont sensibles à la casse.
| Variable d'environnement | Propriété système |
| --- | ----------- |
| `DD_TRACE_PEER_SERVICE_MAPPING` | `dd.trace.peer.service.mapping` |

Chaque paramètre accepte une liste séparée par des virgules : `key1:value1,key2:value2`.

À titre d'exemple, vous pouvez utiliser la configuration suivante si vous utilisez des variables d'environnement et souhaitez remplacer le nom du service homologue `10.0.32.3` par `my-service` :

```yaml
DD_TRACE_PEER_SERVICE_MAPPING=10.0.32.3:my-service
```

[1]: https://dtdg.co/latest-java-tracer

{{% /tab %}}

{{% tab "Go" %}}

La version minimale requise du traceur Go est la [v1.52.0][1]. Nous vous recommandons d'effectuer régulièrement une mise à niveau vers la dernière version pour bénéficier des nouveautés et des corrections de bugs.

Pour activer la carte des dépendances, ajoutez les variables d'environnement ou propriétés système suivantes aux paramètres de votre traceur :

| Variable d'environnement | Propriété système |
| ---  | ----------- |
| `DD_TRACE_PEER_SERVICE_DEFAULTS_ENABLED=true` | `WithPeerServiceDefaultsEnabled(true)` |
| `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true` | `WithGlobalServiceName(true)` |

#### Mappage des services homologues

Datadog utilise un schéma d'attribution de nom par défaut pour les services déduits. Si vous le souhaitez, vous pouvez associer des valeurs spécifiques à des services homologues via les paramètres suivants :
**Remarque** : les paires `key:value` sont sensibles à la casse.
| Variable d'environnement | Propriété système |
| --- | ----------- |
| `DD_TRACE_PEER_SERVICE_MAPPING` | `WithPeerServiceMapping` |

Chaque paramètre accepte une liste séparée par des virgules : `key1:value1,key2:value2`.

À titre d'exemple, vous pouvez utiliser la configuration suivante si vous utilisez des variables d'environnement et souhaitez remplacer le nom du service homologue `10.0.32.3` par `my-service` :

```yaml
DD_TRACE_PEER_SERVICE_MAPPING=10.0.32.3:my-service
```

[1]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.52.0

{{% /tab %}}

{{% tab "NodeJS" %}}

La version minimale requise du traceur NodeJS est la [2.44.0][1], la [3.31.0][2] ou la [4.10.0][3]. Nous vous recommandons d'effectuer régulièrement une mise à niveau vers la dernière version pour bénéficier des nouveautés et des corrections de bugs.

Pour activer la carte des dépendances, ajoutez les variables d'environnement ou propriétés système suivantes aux paramètres de votre traceur :

| Variable d'environnement | Propriété système |
| ---  | ----------- |
| `DD_TRACE_PEER_SERVICE_DEFAULTS_ENABLED=true` | `spanComputePeerService=true` |
| `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true` | `spanRemoveIntegrationFromService=true` |

#### Mappage des services homologues

Datadog utilise un schéma d'attribution de nom par défaut pour les services déduits. Si vous le souhaitez, vous pouvez associer des valeurs spécifiques à des services homologues via les paramètres suivants :
**Remarque** : les paires `key:value` sont sensibles à la casse.
| Variable d'environnement | Propriété système |
| --- | ----------- |
| `DD_TRACE_PEER_SERVICE_MAPPING` | `peerServiceMapping` |

Chaque paramètre accepte une liste séparée par des virgules : `key1:value1,key2:value2`.

À titre d'exemple, vous pouvez utiliser la configuration suivante si vous utilisez des variables d'environnement et souhaitez remplacer le nom du service homologue `10.0.32.3` par `my-service` :

```yaml
DD_TRACE_PEER_SERVICE_MAPPING=10.0.32.3:my-service
```

[1]: https://github.com/DataDog/dd-trace-js/releases/tag/v2.44.0
[2]: https://github.com/DataDog/dd-trace-js/releases/tag/v3.31.0
[3]: https://github.com/DataDog/dd-trace-js/releases/tag/v4.10.0

{{% /tab %}}

{{% tab "PHP" %}}
La version minimale requise du traceur PHP est la [0.90.0][1]. Nous vous recommandons d'effectuer régulièrement une mise à niveau vers la dernière version pour bénéficier des nouveautés et des corrections de bugs.

Pour activer la carte des dépendances, ajoutez les variables d'environnement ou propriétés système suivantes aux paramètres de votre traceur :

| Variable d'environnement | Propriété système |
| ---  | ----------- |
| `DD_TRACE_PEER_SERVICE_DEFAULTS_ENABLED=true` | `datadog.trace.peer_service_defaults_enabled=true` |
| `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true` | `datadog.trace.remove_integration_service_names_enabled=true` |

#### Mappage des services homologues

Datadog utilise un schéma d'attribution de nom par défaut pour les services déduits. Si vous le souhaitez, vous pouvez associer des valeurs spécifiques à des services homologues via les paramètres suivants :
**Remarque** : les paires `key:value` sont sensibles à la casse.
| Variable d'environnement | Propriété système |
| --- | ----------- |
| `DD_TRACE_PEER_SERVICE_MAPPING` | `datadog.trace.peer_service_mapping` |

Chaque paramètre accepte une liste séparée par des virgules : `key1:value1,key2:value2`.

À titre d'exemple, vous pouvez utiliser la configuration suivante si vous utilisez des variables d'environnement et souhaitez remplacer le nom du service homologue `10.0.32.3` par `my-service` :

```yaml
DD_TRACE_PEER_SERVICE_MAPPING=10.0.32.3:my-service
```

[1]: https://github.com/DataDog/dd-trace-php/releases/tag/0.90.0
{{% /tab %}}

{{% tab ".NET" %}}

La version minimale requise du traceur .NET est la [v2.35.0][1]. Nous vous recommandons d'effectuer régulièrement une mise à niveau vers la dernière version pour bénéficier des nouveautés et des corrections de bugs.

Pour activer la carte des dépendances, ajoutez les variables d'environnement suivantes aux paramètres de votre traceur ou à vos propriétés système :
- `DD_TRACE_PEER_SERVICE_DEFAULTS_ENABLED=true`
- `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true`

#### Mappage des services homologues

Datadog utilise un schéma d'attribution de nom par défaut pour les services déduits. Si vous le souhaitez, vous pouvez associer des valeurs spécifiques à des services homologues via les paramètres suivants :
**Remarque** : les paires `key:value` sont sensibles à la casse.
| Variable d'environnement | Paramètres du traceur |
| --- | ----------- |
| `DD_TRACE_PEER_SERVICE_MAPPING` | `PeerServiceNameMappings` |

Chaque paramètre accepte une liste séparée par des virgules : `key1:value1,key2:value2`.

À titre d'exemple, vous pouvez utiliser la configuration suivante si vous utilisez des variables d'environnement et souhaitez remplacer le nom du service homologue `10.0.32.3` par `my-service` :

```yaml
DD_TRACE_PEER_SERVICE_MAPPING=10.0.32.3:my-service
```

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.35.0

{{% /tab %}}

{{% tab "Python" %}}

La version minimale requise du traceur Python est la [v1.16.0][1]. Nous vous recommandons d'effectuer régulièrement une mise à niveau vers la dernière version pour bénéficier des nouveautés et des corrections de bugs.

Pour activer la carte des dépendances, ajoutez les variables d'environnement suivantes aux paramètres de votre traceur ou à vos propriétés système :

Ajoutez les variables d'environnement suivantes aux paramètres de votre traceur ou à vos propriétés système :
- `DD_TRACE_PEER_SERVICE_DEFAULTS_ENABLED=true`
- `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true`

#### Mappage des services homologues

Datadog utilise un schéma d'attribution de nom par défaut pour les services déduits. Si vous le souhaitez, vous pouvez associer des valeurs spécifiques à des services homologues via les paramètres suivants :

| Variable d'environnement | Paramètres du traceur |
| ---  | ----------- |
| `DD_TRACE_PEER_SERVICE_MAPPING` | `PeerServiceNameMappings` |

Chaque paramètre accepte une liste séparée par des virgules : `key1:value1,key2:value2`.

À titre d'exemple, vous pouvez utiliser la configuration suivante si vous utilisez des variables d'environnement et souhaitez remplacer le nom du service homologue `10.0.32.3` par `my-service` :

```yaml
DD_TRACE_PEER_SERVICE_MAPPING=10.0.32.3:my-service
```

Depuis la version `v1.16.0` du traceur, toutes les bibliothèques sont prises en charge, à l'exception de Boto2.

[1]: https://github.com/DataDog/dd-trace-py/releases/tag/v1.16.0

{{% /tab %}}

{{% tab "Ruby" %}}
La version minimale requise du traceur Ruby est la [v1.13.0][1]. Nous vous recommandons d'effectuer régulièrement une mise à niveau vers la dernière version pour bénéficier des nouveautés et des corrections de bugs.

Pour activer la carte des dépendances, ajoutez les variables d'environnement suivantes aux paramètres de votre traceur ou à vos propriétés système :
- `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true`

#### Mappage des services homologues
*Remarque** : les paires `key:value` sont sensibles à la casse.
Datadog utilise un schéma d'attribution de nom par défaut pour les services déduits. Si vous le souhaitez, vous pouvez associer des valeurs spécifiques à des services homologues via la variable d'environnement `DD_TRACE_PEER_SERVICE_MAPPING`. Cette dernière accepte une liste de paires key/value séparée par des virgules. 

À titre d'exemple, vous pouvez utiliser la configuration suivante si vous utilisez des variables d'environnement et souhaitez remplacer le nom du service homologue `10.0.32.3` par `my-service` :

```yaml
DD_TRACE_PEER_SERVICE_MAPPING=10.0.32.3:my-service
```

Vous pouvez également définir la valeur `peer.service` pour les spans générées par une intégration spécifique. Le paramètre défini remplacera alors toute valeur que le traceur aurait attribuée automatiquement. Afin de définir une valeur pour une intégration, utilisez la syntaxe `DD_TRACE_<NOM_INTÉGRATION>_PEER_SERVICE` pour votre variable d'environnement.

À titre d'exemple, utilisez `DD_TRACE_DALLI_PEER_SERVICE=billing-api`
afin de définir la valeur `peer.service` pour toutes les spans Dalli.

[1]: https://github.com/DataDog/dd-trace-rb/releases/tag/v1.13.0
{{% /tab %}}

{{< /tabs >}}

### Migration du nom de service global par défaut

L'activation de la variable d'environnement `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED` permet d'améliorer la manière dont les connexions entre services et les services dédiés sont représentés dans les visualisations Datadog, et ce sur l'ensemble des intégrations et langages de bibliothèque de tracing prises en charge. 

Auparavant, certaines bibliothèques de tracing incluaient le nom de l'intégration associée dans le tagging des noms de service. Par exemple, .NET tagguait les appels gRPC au format `service:<SERVICE_DD>-grpc-client` tandis que Python les tagguait au format `service:grpc-client`. Lorsque cette nouvelle option est activée, toutes les bibliothèques de tracing prises en charge ajoutent aux spans des services en aval le tag du nom du service appelant, `service:<SERVICE_DD>`, et fournissent ainsi un _nom de service global par défaut_.

Par conséquent, si vous avez des :

- Métriques APM
- Métriques de spans personnalisées
- Analyses de traces
- Filtres de rétention
- Analyses de données sensibles
- Monitors, dashboards ou notebooks basés sur ces éléments

Mettez à jour ces éléments afin d'utiliser le tag de service par défaut global (`service:<SERVICE_DD>`).

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/services/service_page/
[2]: /fr/tracing/services/services_map/
[3]: /fr/tracing/service_catalog/
[4]: https://github.com/DataDog/datadog-agent/releases/tag/7.45.0
[5]: /fr/agent/guide/agent-configuration-files/?tab=agentv6v7
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/collector.yaml#L328-L341