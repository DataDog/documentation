---
description: Affichez et inspectez les agents Datadog et les collecteurs OpenTelemetry
  sur l'ensemble de votre parc.
further_reading:
- link: /agent/fleet_automation/
  tag: Documentation
  text: Fleet Automation
- link: /agent/troubleshooting/send_a_flare/
  tag: Documentation
  text: Envoyer un flare
- link: /containers/kubernetes/installation/
  tag: Documentation
  text: Installer le Datadog Agent sur Kubernetes
title: Fleet View
---
{{< site-region region="gov,gov2" >}}
<div class="alert alert-info">
Fleet View est en préversion sur les sites Datadog Government (US1-FED et US2-FED).<br><br>
Des fonctionnalités supplémentaires de Fleet Automation, telles que la configuration des Agents, la mise à niveau des Agents et la mise à niveau des SDK, ne sont pas prises en charge pour le site Datadog sélectionné ({{< region-param key=dd_site_name >}}).
</div>
{{< /site-region >}}

Utilisez [Fleet View][1] pour obtenir un aperçu des lacunes en matière d'observabilité sur vos hosts, des agents ou collecteurs OTel obsolètes, et des agents présentant des problèmes d'intégration.

Pour chaque Datadog Agent, vous pouvez voir :
- La version de l'Agent
- Si l'Agent présente des intégrations non configurées ou mal configurées
- Les services que l'Agent surveille
- Le statut de configuration à distance de l'Agent
- Les produits activés sur l'Agent
- Les événements Audit Trail de l'Agent, y compris les modifications de configuration, les mises à niveau et les flares

Pour chaque Collecteur OTel, vous pouvez voir :
- La version du Collecteur
- La distribution du Collecteur
- Le YAML de configuration du Collecteur
- Les vues de pipeline et de topologie du Collecteur

## Prérequis {#prerequisites}

- La vue de configuration est activée par défaut pour les agents et les collecteurs OTel en version 7.47.0 et ultérieure. Pour l'activer manuellement pour les versions antérieures, définissez `inventories_configuration_enabled` sur `true` dans votre [fichier de configuration d'Agent][3], ou utilisez la variable d'environnement `DD_INVENTORIES_CONFIGURATION_ENABLED`.
- La configuration de l'intégration de l'Agent est activée par défaut dans la version 7.49.0 de l'Agent ou une version ultérieure. Pour l'activer manuellement sur les anciennes versions, définissez `inventories_checks_configuration_enabled` sur `true` dans votre [fichier de configuration de l'Agent][3], ou utilisez la variable d'environnement `DD_INVENTORIES_CHECKS_CONFIGURATION_ENABLED`.

<div class="alert alert-info">Fleet Automation nécessite le <a href="/opentelemetry/integrations/datadog_extension/#setup">Datadog Extension</a> pour afficher la configuration, les pipelines et la topologie du collecteur OpenTelemetry. Configurez l'extension avant d'utiliser les fonctionnalités du collecteur OTel décrites sur cette page.</div>

## Examinez un Datadog Agent ou un collecteur OpenTelemetry {#examine-a-datadog-agent-or-opentelemetry-collector}

Sélectionnez un Datadog Agent ou un collecteur OTel pour afficher sa configuration, ses intégrations connectées, ses événements d'audit et un onglet de support pour envoyer un flare à distance.

{{< img src="agent/fleet_automation/fleet-automation-view-config.png" alt="Le panneau de détails de l'Agent affichant la configuration, les intégrations connectées et les événements d'audit." style="width:100%;" >}}

## Recherchez et filtrez {#search-and-filter}

Utilisez la barre de recherche en haut de Fleet View pour trouver des Agents, des collecteurs OTel ou des clusters spécifiques dans votre parc. Vous pouvez effectuer les opérations suivantes :

- Effectuez une recherche en texte libre par nom de host ou nom de cluster
- Filtrez par host et par tags d'Agent, tels que le système d'exploitation, l'environnement (`env`), l'équipe et les produits activés (`products_enabled`)

## Visualisez les pipelines OTel {#visualize-otel-pipelines}

L'onglet {{< ui >}}Configuration{{< /ui >}} d'un collecteur OTel inclut des vues {{< ui >}}Pipeline{{< /ui >}} et {{< ui >}}Topology{{< /ui >}}. Ces vues offrent une visibilité de bout en bout sur la façon dont la télémétrie circule dans vos pipelines OTel.

Pour accéder à ces vues :

1. Accédez à [**Fleet Automation**][1].
1. Filtrez pour les collecteurs OTel.
1. Sélectionnez un collecteur pour ouvrir le panneau de détails.
1. Cliquez sur l'onglet {{< ui >}}Configuration{{< /ui >}}.
1. Sélectionnez {{< ui >}}Pipeline{{< /ui >}} ou {{< ui >}}Topology{{< /ui >}} parmi les options {{< ui >}}View as{{< /ui >}}.

### Vue Pipeline {#pipeline-view}

{{< ui >}}Pipeline{{< /ui >}}La vue affiche le pipeline de télémétrie pour un seul collecteur OTel. Utilisez la vue Pipeline pour :

- Validez le routage de la télémétrie entre les récepteurs, processeurs et exportateurs configurés.
- Identifiez les problèmes de flux de données, tels que les pertes de données et les goulots d'étranglement, en activant le commutateur {{< ui >}}Show traffic{{< /ui >}}.
- Enquêtez sur les alertes de pipeline en examinant les alertes de monitor actives affichées sur les nœuds de composants.

{{< img src="/agent/fleet_automation/fleet-automation-pipeline-view.png" alt="Vue Pipeline montrant le routage de la télémétrie entre les composants du collecteur OTel." style="width:100%;" >}}

### Vue Topology {#topology-view}

La vue {{< ui >}}Topology{{< /ui >}} affiche la chaîne de transfert à travers les collecteurs OTel déployés en tant que DaemonSets et gateways. Utilisez la vue Topology pour :

- Validez le routage de la télémétrie entre les collecteurs dans une architecture DaemonSet-to-gateway.
- Repérez les pertes de données et les goulots d'étranglement en activant le commutateur {{< ui >}}Show traffic{{< /ui >}} pour superposer les débits de flux de données sur chaque arête.
- Enquêtez sur les problèmes de pipeline en examinant les alertes de monitor actives affichées sur les nœuds du collecteur.

{{< img src="/agent/fleet_automation/fleet-automation-gateway-topology.png" alt="Vue Topology montrant les DaemonSet Collectors transmettant via des gateway Collectors à Datadog." style="width:100%;" >}}

## Afficher les événements Audit Trail de l'Agent {#view-agent-audit-trail-events}

L'onglet {{< ui >}}Audit Events{{< /ui >}} affiche les événements Audit Trail associés à l'Agent sélectionné.
Utilisez cet onglet pour :
- Identifier les changements de configuration, les mises à jour de clés d'API, les installations, les mises à niveau et les flares de support
- Déterminer quand et où les changements ont été effectués

La visibilité des événements Audit Trail dépend de votre forfait. Lorsque Audit Trail est activé dans votre organisation, vous pouvez afficher les événements de l'Agent jusqu'à 90 jours selon vos paramètres de rétention Audit Trail. Si Audit Trail n'est pas activé dans votre organisation, vous pouvez consulter les événements des 24 dernières heures.

## Envoyer un flare à distance {#send-a-remote-flare}

Vous pouvez envoyer un flare depuis le Datadog Agent ou le collecteur DDOT après avoir activé Remote Configuration sur l'Agent. Pour obtenir des instructions, consultez [Envoyer un flare depuis le site Datadog][2].

Lorsque vous contactez le support Datadog avec Remote Configuration activé, l'équipe de support peut lancer un flare depuis votre environnement pour aider à résoudre votre problème plus rapidement.

{{< img src="agent/fleet_automation/fleet_automation_remote_flare.png" alt="L'onglet de support pour un Agent avec le bouton Send Flare." style="width:100%;" >}}

## Vue Kubernetes {#kubernetes-view}

La vue Kubernetes vous permet de voir les Datadog Agents et les OTel Collectors s'exécutant dans des environnements Kubernetes. Elle offre une vue unifiée de votre parc sur une infrastructure basée sur des hosts et conteneurisée.

Par défaut, Fleet View répertorie l'infrastructure sous forme de hosts individuels. Utilisez le {{< ui >}}View by infra type{{< /ui >}} bouton bascule pour passer à la [vue Kubernetes][4], qui affiche les agents par cluster Kubernetes.

Chaque ligne correspond à un cluster géré par le [Datadog Operator][5] ou le Helm chart. Les Node Agents, le Cluster Agent et les Cluster Check Runners du cluster apparaissent regroupés plutôt que sous forme de hosts individuels.

### Prérequis pour la vue Kubernetes {#prerequisites-for-kubernetes-view}

La plupart des fonctionnalités de la vue Kubernetes sont disponibles sans exigence de version. Des fonctionnalités spécifiques nécessitent :

| Fonctionnalité | Exigence |
|---|---|
| Afficher la configuration `DatadogAgent` | Datadog Operator v1.24 ou version ultérieure |
| Afficher les valeurs du Helm Chart | Datadog Helm Chart v3.157.0 ou version ultérieure |
| Modifier la configuration | [Remote Configuration][6] activé et Datadog Operator v1.27 ou version ultérieure |
| Modifier la configuration sans définir un nom de cluster | Datadog Operator v1.30.0 ou version ultérieure |
| Afficher les intégrations sur un Agent de cluster | Agent v7.72.0 ou version ultérieure |
| Afficher le statut de l'intégration sur un Agent de cluster | Agent v7.79.0 ou version ultérieure |

Pour modifier la configuration depuis Fleet View, définissez les indicateurs suivants dans votre [configuration de l'Operator][7] : `remoteConfigEnabled`, `remoteUpdatesEnabled` et `createControllerRevisions`. La modification nécessite également la configuration d'une clé d'API et d'une clé d'application Datadog. L'édition des valeurs du Helm Chart depuis Fleet View n'est pas prise en charge.

Sur les versions de Datadog Operator antérieures à la v1.30.0, vous devez également définir un nom de cluster (`clusterName`), sinon le bouton {{< ui >}}Edit{{< /ui >}} reste désactivé. Depuis Datadog Operator v1.30.0, le nom de cluster est facultatif.

Si vous installez Datadog Operator avec son Helm Chart, vous pouvez activer les flags requis ensemble en utilisant la valeur `previewFleetRollouts` :

{{< code-block lang="shell" >}}
helm repo add datadog https://helm.datadoghq.com
helm repo update

helm upgrade --install datadog-operator datadog/datadog-operator \
  --set previewFleetRollouts=true \
  --set apiKeyExistingSecret=datadog-secret \
  --set appKeyExistingSecret=datadog-secret \
  --devel
{{< /code-block >}}

Remplacez `datadog-secret` par le nom du Secret Kubernetes qui contient vos clés d'API et d'application Datadog. `--devel`L'indicateur installe la dernière version de développement du Helm Chart.

### Afficher les clusters Kubernetes {#view-kubernetes-clusters}

Les clusters sont listés par ordre alphabétique selon leur nom. Le tableau liste le nom de chaque cluster, la méthode de déploiement (Datadog Operator ou Helm), l'espace de nommage, la version de l'Agent, le statut du pod de l'Agent, la disponibilité, l'ancienneté et le nombre de redémarrages.

Pour trouver un cluster spécifique, vous pouvez [effectuer une recherche](#search-and-filter) par nom de cluster.

Cliquez sur un cluster pour afficher :

- Les détails du cluster, tels que l'environnement et les tags
- Les Agents au niveau du cluster (Cluster Agent et Cluster Check Runners)
- Les Agents de nœud

Dans l'onglet {{< ui >}}Configuration{{< /ui >}}, vous pouvez afficher la configuration :

- **Datadog Operator v1.24 ou version ultérieure** : Affichez la configuration de la ressource personnalisée `DatadogAgent`. Avec Datadog Operator v1.27 ou version ultérieure, vous pouvez également modifier la configuration depuis cet onglet.
- **Datadog Helm Chart v3.157.0 ou version ultérieure** : Affichez les valeurs du Helm Chart (`values.yaml`).

### Limitations {#limitations}

Par rapport à la vue par défaut, la vue Kubernetes présente les limitations suivantes :

- Vous ne pouvez pas envoyer de flares de support à distance.
- Vous pouvez voir quels OTel Collectors sont en cours d'exécution, mais vous ne pouvez pas afficher leur configuration dans la vue Kubernetes.
- L'accès à l'API Fleet Automation n'est pas disponible.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet
[2]: /fr/agent/troubleshooting/send_a_flare/#send-a-flare-from-the-datadog-site
[3]: /fr/agent/configuration/agent-configuration-files/
[4]: https://app.datadoghq.com/fleet?view_by=clusters
[5]: /fr/containers/datadog_operator
[6]: /fr/agent/guide/setup_remote_config
[7]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md