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
title: Liste des hosts
---
## Présentation {#overview}

La liste des hosts vous fournit un inventaire en temps réel de tous les hosts qui rapportent à Datadog via l'Agent ou les intégrations cloud. Par défaut, elle affiche les hosts ayant eu une activité au cours des 15 dernières minutes. Pour ouvrir la liste des hosts, accédez à [**Infrastructure > Hosts**][10] dans Datadog.

Cette page décrit la **nouvelle** vue de la liste des hosts. Pour passer à la vue **Legacy**, utilisez le bouton bascule dans le coin supérieur droit.

{{< img src="infrastructure/index/infra-list-overview-2.png" alt="La liste des hosts avec un panneau de filtrage sur la gauche et une liste de hosts avec des colonnes personnalisables." style="width:100%;">}}

**Remarque** : Cette liste ne doit pas être utilisée pour estimer la facturation des hosts de votre infrastructure. Consultez la page [facturation][11] pour plus de détails.

## Filtrer et rechercher {#filter-and-search}

Utilisez le panneau de filtrage sur la gauche pour restreindre la liste des hosts :

- **Teams** : Utilisez le [filtre d'équipe][19] pour afficher uniquement les hosts associés aux équipes que vous sélectionnez.
- **Filtres rapides** : Utilisez les cases à cocher en haut du panneau pour filtrer par fournisseur cloud (AWS, Azure, Google Cloud, Oracle ou Alibaba Cloud), source de télémétrie (Datadog Agent ou OpenTelemetry), système d'exploitation (Windows, Linux ou Darwin) ou matériel (GPU).
- **Filtrer les métriques** : Sélectionnez une métrique et définissez une plage de valeurs pour filtrer les hosts par valeur de métrique.
- **Facettes de recherche** : Filtrez par n'importe quelle propriété ou tag de host, tel que le fournisseur cloud, l'environnement, la région, le type de ressource, le type d'instance, le système d'exploitation, la version du système d'exploitation, l'Agent ou la version de Docker.

Vous pouvez également utiliser la zone de recherche en haut de la liste pour filtrer les hosts à l'aide de la [syntaxe de recherche Datadog][16].

## Personnaliser les colonnes {#customize-columns}

Pour ajouter, supprimer ou réorganiser des colonnes, cliquez sur **Columns** au-dessus de la liste des hosts. Vous pouvez ajouter l'un des éléments suivants en tant que colonne :

- **Attributs du host** : Propriétés du host, telles que le nom de host ou le statut.
- **Tags** : Tout tag appliqué au host.
- **Métriques** : Toute métrique rapportée par le host.

Pour réorganiser une colonne, faites-la glisser vers une nouvelle position. Pour redimensionner, faites glisser son bord droit. Pour masquer, désactivez-la.

{{< img src="infrastructure/index/infra-list-columns.png" alt="Le panneau de personnalisation des colonnes avec des sections pour Host Attributes, Tags et Metrics, ainsi que des interrupteurs pour afficher ou masquer chaque colonne." style="width:100%;">}}

### Colonnes combinées {#combined-columns}

La liste des hosts inclut trois colonnes qui combinent plusieurs points de données :

- **Configurations** : Le fournisseur cloud, le système d'exploitation et le statut d'installation du Datadog Agent pour chaque host.
- **Software** : Le serveur web, la base de données, le cache et l'orchestrateur de conteneurs du host (comme Docker ou Kubernetes), s'ils sont détectés.
- **Integrations** : Les intégrations du Datadog Agent activées sur le host.

## Vues enregistrées {#saved-views}

Pour enregistrer votre configuration de filtre et de colonne, ouvrez le panneau **Views** dans le coin supérieur gauche et cliquez sur **Save as new view**. Depuis ce panneau, vous pouvez filtrer, trier, modifier et mettre en favori les vues enregistrées.

{{< img src="infrastructure/index/infra-list-views.png" alt="Le panneau Views avec des options pour enregistrer, filtrer, trier et modifier les vues enregistrées." style="width:40%;">}}

## Inspecter un host {#inspect-a-host}

Cliquez sur n'importe quel host pour ouvrir son panneau de détails, qui est le même panneau latéral utilisé par le [Resource Catalog][15]. Le panneau inclut :

- [Noms de host et alias](/agent/faq/how-datadog-agent-determines-the-hostname/#host-aliases)
- [Tags][2]
- [Metrics][3]
- [Containers][4]
- [Logs][5] (si activé)
- [Agent configuration](#agent-configuration) (si activé)
- [OpenTelemetry Collector configuration](#opentelemetry-collector-configuration) (si activé)

{{< img src="infrastructure/index/infra-list-side-panel.png" alt="Le panneau latéral de détails du host avec des sections pour Host Summary, Metrics, Containers, Processes et d'autres données de host." style="width:100%;">}}

### Agent configuration {#agent-configuration}

Pour afficher la configuration de l'Agent d'un host, cliquez sur le host pour ouvrir le panneau latéral, puis faites défiler jusqu'à la section **Agent**. Pour afficher et gérer les configurations de l'Agent sur l'ensemble de votre infrastructure, utilisez [Fleet Automation][12].

{{< img src="infrastructure/index/infra-list-agent-config.png" alt="La section Agent du panneau latéral du host affichant la configuration de l'Agent au format JSON." style="width:100%;">}}

### Configuration du Collector OpenTelemetry {#opentelemetry-collector-configuration}

Lorsque vous configurez l'[extension Datadog][14] avec votre Collector OpenTelemetry, vous pouvez afficher la configuration du collecteur et les informations de build directement dans le panneau de détails du host. L'extension vous permet également de gérer et de déboguer vos déploiements du Collector depuis Datadog.

Pour afficher la configuration OpenTelemetry Collector d'un host, cliquez sur le host pour ouvrir le panneau latéral. Faites défiler jusqu'à la section **OTel Collector** pour voir les informations de build et la configuration complète du Collector. Pour des instructions de configuration détaillées et les prérequis, tels que la correspondance des noms de host et la configuration du pipeline, consultez le [Datadog Extension documentation][14].

{{< img src="infrastructure/index/infra-list-otel-config.png" alt="La section OTel Collector du panneau latéral du host affichant les informations de build et la Collector configuration." style="width:100%;">}}

## Export{#export}

Cliquez sur **Export** > **Open in DDSQL Editor**, puis téléchargez les résultats depuis le [DDSQL Editor][18]. Vous pouvez également exporter vers un dashboard, un notebook ou une feuille de calcul. Pour obtenir une liste au format JSON de vos hosts signalant des données à Datadog, vous pouvez également utiliser l'une des options suivantes :

- Le [host overview report][17].
- L'[endpoint d'API pour la recherche de hosts][7]. Consultez le [guide de développement][8] pour obtenir un exemple.

### Audit Agent versions{#audit-agent-versions}

Pour auditer les versions de l'Agent qui s'exécutent sur vos hosts, utilisez le [script get_host_agent_list][9]. Le script utilise le [host overview report][17] pour afficher les Agents en cours d'exécution avec leurs numéros de version. Un script `json_to_csv` convertit également la sortie JSON au format CSV.

### Regrouper dans une liste les hosts sans Agent{#list-hosts-without-an-agent}

Vous pouvez également utiliser l'exportation JSON pour lister les instances Amazon EC2 (à l'exclusion de RDS) sur lesquelles aucun Agent n'est installé. Ces instances apparaissent dans la liste des hosts lorsque vous configurez votre compte AWS dans l'intégration AWS de Datadog. Le script Python 3 suivant les répertorie :

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

## Pour aller plus loin {#further-reading}

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
[19]: /fr/account_management/teams/#team-filter