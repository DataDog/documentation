---
aliases:
- /fr/hostnames
- /fr/graphing/infrastructure/list/
further_reading:
- link: /infrastructure/hostmap/
  tag: Documentation
  text: La Hostmap
- link: /infrastructure/livecontainers/
  tag: Documentation
  text: Container map
- link: /infrastructure/process/
  tag: Documentation
  text: Surveillance des live processes
title: Liste des hôtes
---
## Aperçu {#overview}

La liste des hôtes vous fournit un inventaire en direct de tous les hôtes rapportant à Datadog via l'Agent ou les intégrations cloud. Par défaut, elle affiche les hôtes ayant une activité au cours des 15 dernières minutes. Pour ouvrir la liste des hôtes, naviguez vers [**Infrastructure > Hosts**][10] dans Datadog.

Cette page décrit la vue **New** de la liste des hôtes. Pour passer à la vue **Legacy**, utilisez le commutateur dans le coin supérieur droit.

{{< img src="infrastructure/index/infra-list-overview-2.png" alt="La liste des hôtes avec un panneau de filtre à gauche et une liste d'hôtes avec des colonnes personnalisables." style="width:100%;">}}

**Remarque** : Cette liste ne doit pas être utilisée pour estimer la facturation de vos hôtes d'infrastructure. Consultez la page [facturation][11] pour plus de détails.

## Filtrer et rechercher {#filter-and-search}

Utilisez le panneau de filtre à gauche pour affiner la liste des hôtes :

Activez - **My Teams** pour afficher uniquement les hôtes associés à vos équipes.
- **Quick filters** : Utilisez les cases à cocher en haut du panneau pour filtrer par fournisseur cloud (AWS, Azure, Google Cloud, Oracle ou Alibaba Cloud), source de télémétrie (Agent Datadog ou OpenTelemetry), système d'exploitation (Windows, Linux ou Darwin) ou matériel (GPU).
- **Filtrer les métriques** : Sélectionnez une métrique et définissez une plage de valeurs pour filtrer les hôtes par valeur de métrique.
- **Facettes de recherche** : Filtrer par toute propriété ou étiquette d'hôte, telle que Fournisseur Cloud, Env, Région, Type de Ressource, Type d'Instance, OS, Version OS, Agent ou Version Docker.

Vous pouvez également utiliser la zone de recherche en haut de la liste pour filtrer les hôtes en utilisant la [syntaxe de recherche Datadog][16].

## Customize columns {#customize-columns}

Pour ajouter, supprimer ou réorganiser des colonnes, cliquez sur **Columns** au-dessus de la liste des hôtes. Vous pouvez ajouter l'un des éléments suivants en tant que colonne :

- **Attributs de l'hôte** : Propriétés de l'hôte, telles que le nom d'hôte ou l'état.
- **Étiquettes** : Toute étiquette appliquée à l'hôte.
- **Métriques** : Toute métrique rapportée par l'hôte.

Pour réorganiser une colonne, faites-la glisser vers une nouvelle position. Pour redimensionner, faites glisser son bord droit. Pour masquer, désactivez-le.

{{< img src="infrastructure/index/infra-list-columns.png" alt="Le panneau de personnalisation des colonnes avec des sections pour les Attributs de l'hôte, les Étiquettes et les Métriques, et des bascules pour afficher ou masquer chaque colonne." style="width:100%;">}}

### Combined columns {#combined-columns}

La liste des hôtes comprend trois colonnes qui combinent plusieurs points de données :

- **Configurations** : Le fournisseur de cloud, le système d'exploitation et l'état d'installation de l'Agent Datadog pour chaque hôte.
- **Logiciel** : Le serveur web, la base de données, le cache et l'orchestrateur de conteneurs (tel que Docker ou Kubernetes) de l'hôte, s'ils sont détectés.
- **Intégrations** : Les intégrations de l'Agent Datadog activées sur l'hôte.

## Saved views {#saved-views}

Pour enregistrer votre filtre et la configuration des colonnes, ouvrez le panneau **Views** dans le coin supérieur gauche et cliquez sur **Save as new view**. Depuis ce panneau, vous pouvez filtrer, trier, modifier et étoiler les Saved views.

{{< img src="infrastructure/index/infra-list-views.png" alt="Le panneau Views avec des options pour enregistrer, filtrer, trier et modifier les Saved views." style="width:40%;">}}

## Inspecter un hôte {#inspect-a-host}

Cliquez sur n'importe quel hôte pour ouvrir son panneau de détails, qui est le même panneau latéral utilisé par le [Resource Catalog][15]. Le panneau comprend :

- [Hostnames and aliases](/agent/faq/how-datadog-agent-determines-the-hostname/#host-aliases)
- [Tags][2]
- [Metrics][3]
- [Containers][4]
- [Logs][5] (si activé)
- [Agent configuration](#agent-configuration) (si activé)
- [OpenTelemetry Collector configuration](#opentelemetry-collector-configuration) (si activé)

{{< img src="infrastructure/index/infra-list-side-panel.png" alt="Le panneau latéral des détails de l'hôte avec des sections pour Host Summary, Metrics, Containers, Processes et autres données de l'hôte." style="width:100%;">}}

### Agent configuration {#agent-configuration}

Pour voir la configuration de l'agent d'un hôte, cliquez sur l'hôte pour ouvrir le panneau latéral, puis faites défiler jusqu'à la section **Agent**. Pour voir et gérer les configurations d'agent sur l'ensemble de votre infrastructure, utilisez [Fleet Automation][12].

{{< img src="infrastructure/index/infra-list-agent-config.png" alt="La section Agent du panneau latéral de l'hôte montrant la configuration de l'agent au format JSON." style="width:100%;">}}

### OpenTelemetry Collector configuration {#opentelemetry-collector-configuration}

Lorsque vous configurez [Datadog Extension][14] avec votre OpenTelemetry Collector, vous pouvez consulter la configuration du Collector et les informations de build directement dans le panneau de détails de l'hôte. L'extension vous permet également de gérer et de déboguer vos déploiements de Collector depuis Datadog.

Pour voir la configuration de l'OpenTelemetry Collector d'un hôte, cliquez sur l'hôte pour ouvrir le panneau latéral. Faites défiler jusqu'à la section **OTel Collector** pour voir les informations de build et la configuration complète du Collector. Pour des instructions de configuration détaillées et des exigences, telles que la correspondance des noms d'hôtes et la configuration des pipelines, consultez [Datadog Extension documentation][14].

{{< img src="infrastructure/index/infra-list-otel-config.png" alt="La section OTel Collector du panneau latéral de l'hôte montrant les informations de build et la configuration du Collector." style="width:100%;">}}

## Export {#export}

Cliquez sur **Export** > **Open in DDSQL Editor**, puis téléchargez les résultats depuis le [DDSQL Editor][18]. Vous pouvez également exporter vers un tableau de bord, un carnet de notes ou une feuille de calcul. Pour une liste au format JSON de vos hôtes rapportant à Datadog, vous pouvez également utiliser l'un des éléments suivants :

- The [host overview report][17].
- The [search hosts API endpoint][7]. Consultez le [developer guide][8] pour un exemple.

### Audit Agent versions {#audit-agent-versions}

Pour auditer quelles versions de l'Agent sont en cours d'exécution sur vos hôtes, utilisez le [script get_host_agent_list][9]. Le script utilise le [host overview report][17] pour afficher les Agents en cours d'exécution avec leurs numéros de version. Un `json_to_csv` script convertit également la sortie JSON en CSV.

### List hosts without an Agent {#list-hosts-without-an-agent}

Vous pouvez également utiliser l'exportation JSON pour lister les instances Amazon EC2 (à l'exclusion de RDS) qui n'ont pas d'Agent installé. Ces instances apparaissent dans la liste des hôtes lorsque vous configurez votre compte AWS dans l'intégration AWS de Datadog. Le script Python 3 suivant les liste :

```python
# 3p
import requests

# stdlib
import json
import pprint
import os

api_key = os.environ['DD_API_KEY']
app_key = os.environ['DD_APP_KEY']

url = "https://app.datadoghq.com/reports/v2/overview?\
window=3h&with_apps=true&with_sources=true&with_aliases=true\
&with_meta=true&with_tags=true&api_key=%s&application_key=%s"

infra = json.loads(requests.get(url %(api_key,app_key)).text)

for host in infra['rows']:
    if (('aws' in host['apps']) and ('rds' not in host['apps']) and ('agent' not in host['apps'])):
        try:
            print(f'HOST: {host["name"]} - TAGS: {host["tags_by_source"]}')
        except:
            pass
```

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: /fr/getting_started/tagging/
[3]: /fr/metrics/
[4]: /fr/infrastructure/livecontainers/?tab=helm#overview
[5]: /fr/logs/
[7]: /fr/api/v1/hosts/#get-the-total-number-of-active-hosts
[8]: /fr/extend/guide/query-the-infrastructure-list-via-the-api/
[9]: https://github.com/DataDog/Miscellany/tree/master/get_hostname_agentversion
[10]: https://app.datadoghq.com/infrastructure
[11]: https://docs.datadoghq.com/fr/account_management/billing/
[12]: https://app.datadoghq.com/release-notes/fleet-automation-is-now-generally-available
[14]: /fr/opentelemetry/integrations/datadog_extension/
[15]: /fr/infrastructure/resource_catalog/#investigate-a-host-or-resource
[16]: /fr/getting_started/search/
[17]: https://app.datadoghq.com/reports/v2/overview?metrics=avg%3Aaws.ec2.cpuutilization%2Cavg%3Aazure.vm.percentage_cpu%2Cavg%3Agcp.gce.instance.cpu.utilization%2Cavg%3Asystem.cpu.idle%2Cavg%3Asystem.cpu.iowait%2Cavg%3Asystem.load.norm.15%2Cavg%3Avsphere.cpu.usage%2Cavg%3Avsphere.cpu.usage.avg%2Cavg%3Aalibabacloud.ecs.cpu_utilization.average&with_apps=true&with_sources=true&with_aliases=true&with_meta=true&with_mute_status=true&with_tags=true
[18]: /fr/ddsql_editor/#save-and-share-queries