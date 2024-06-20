---
aliases:
  - /fr/integrations/wmi
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - monitoring
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/wmi_check/README.md'
display_name: WMI
git_integration_title: wmi_check
guid: d70f5c68-873d-436e-bddb-dbb3e107e3b5
integration_id: wmi
integration_title: WMI Check
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: wmi.
name: wmi_check
public_title: "Intégration Datadog/Check\_WMI"
short_description: Recueillez et représentez graphiquement des métriques WMI.
support: core
supported_os:
  - windows
---
![Métrique WMI][1]

## Présentation

Recevez des métriques de vos applications/serveurs Windows avec Windows Management Instrumentation (WMI) en temps réel pour :

- Visualiser leurs performances
- Corréler leur activité avec le reste de vos applications

**Remarque** : nous vous conseillons de privilégier le [check PDH][14] dans tous les cas, car sa charge système réduite le rend plus efficace à grande échelle.

## Configuration

### Installation

Si vous recueillez uniquement des métriques standard à partir de Microsoft Windows et d'autres applications groupées, aucune procédure d'installation n'est requise. Si vous devez définir de nouvelles métriques à collecter à partir de votre application, vous disposez alors de plusieurs options :

1. Envoyez des compteurs de performance avec System.Diagnostics dans .NET, puis accédez-y via WMI.
2. Implémentez un fournisseur WMI basé sur un objet COM pour votre application. Cette méthode est conseillée si vous utilisez un langage non pris en charge par .NET.

Pour en savoir plus sur System.Diagnostics, consultez la [documentation MSDN][3]. Après avoir ajouté votre métrique, vous devriez être en mesure de la retrouver dans WMI. Pour parcourir les espaces de nommage WMI, vous pouvez utiliser cet outil pratique : [WMI Explorer][4]. Les mêmes informations peuvent être obtenues avec Powershell [ici][5]. Consultez également les informations fournies dans cet [article de la base de connaissances Datadog][6].

Si vous attribuez la catégorie Ma_Nouvelle_Métrique à une nouvelle métrique, le chemin WMI correspond à ce qui suit :
`\\<NomOrdinateur>\ROOT\CIMV2:Win32_PerfFormattedData_Ma_Nouvelle_Métrique`

Si la métrique ne s'affiche pas dans WMI, essayez d'exécuter `winmgmt /resyncperf` pour forcer le système à réenregistrer les bibliothèques de performances avec WMI.

## Configuration

1. Cliquez sur le bouton **Install Integration** sur le carré d'intégration WMI.
2. Ouvrez Datadog Agent Manager sur le serveur Windows.
3. Modifiez la configuration `Wmi Check`.

```yaml
init_config:
instances:
  - class: Win32_OperatingSystem
    metrics:
      - [NumberOfProcesses, system.proc.count, gauge]
      - [NumberOfUsers, system.users.count, gauge]
  - class: Win32_PerfFormattedData_PerfProc_Process
    metrics:
      - [ThreadCount, proc.threads.count, gauge]
      - [VirtualBytes, proc.mem.virtual, gauge]
      - [PercentProcessorTime, proc.cpu_pct, gauge]
    tag_by: Name
  - class: Win32_PerfFormattedData_PerfProc_Process
    metrics:
      - [IOReadBytesPerSec, proc.io.bytes_read, gauge]
    tag_by: Name
    tag_queries:
      - [IDProcess, Win32_Process, Handle, CommandLine]
```

<div class="alert alert-info">
La configuration par défaut utilise la clause de filtre pour limiter les métriques récupérées. Définissez les filtres sur des valeurs valides ou supprimez-les comme illustré ci-dessus pour recueillir les métriques.
</div>

Les définitions de métriques comprennent trois composants :

- La propriété de classe dans WMI
- Le nom de la métrique, tel qu'il apparaît dans Datadog
- Le type de métrique

#### Options de configuration

_Cette fonction est disponible à partir de la version 5.3 de l'Agent._

Chaque requête WMI a deux options obligatoires, `class` et `metrics`, ainsi que six options facultatives : `host`, `namespace`, `filters`, `provider`, `tag_by`, `constant_tags` et `tag_queries`.

- `class` est le nom de la classe WMI, par exemple `Win32_OperatingSystem` ou `Win32_PerfFormattedData_PerfProc_Process`. De nombreux noms de classe standard sont disponibles dans la [documentation MSDN][7]. Les classes `Win32_FormattedData_*` fournissent par défaut de nombreux compteurs de performances utiles.

- `metrics` est la liste des métriques que vous souhaitez capturer, chaque élément de la
  liste étant un ensemble `[<NOM_PROPRIÉTÉ_WMI>, <NOM_MÉTRIQUE>, <TYPE_MÉTRIQUE>]` : 

  - `<NOM_PROPRIÉTÉ_WMI>` ressemble à `NumberOfUsers` ou `ThreadCount`. Les propriétés standard sont également disponibles dans la documentation MSDN pour chaque classe.
  - `<NOM_MÉTRIQUE>` est le nom que vous souhaitez voir apparaître dans Datadog.
  - `<TYPE_MÉTRIQUE>` correspond à l'une des options standards pour tous les checks de l'Agent, comme gauge, rate, histogram ou counter.

- `host` est la cible facultative de la requête WMI, `localhost` étant utilisé par défaut. Si vous définissez cette option, assurez-vous que la gestion à distance est activée sur le host cible. [Cliquez ici][8] pour en savoir plus.

- `namespace` est l'espace de nommage WMI facultatif sur lequel se connecter (`cimv2` par défaut).

- `filters` est une liste de filtres à votre disposition pour la requête WMI. Par exemple, pour une classe WMI basée sur un processus, il peut être souhaitable de recueillir uniquement les métriques associées à certains processus exécutés sur votre machine. Vous pourriez donc ajouter un filtre pour chaque nom de processus. Il est également possible d'utiliser le caractère % comme wildcard.

- `provider` est le fournisseur WMI facultatif (défini sur `32` par défaut pour l'Agent Datadog 32 bits ou `64` pour la version 64 bits). Il est utilisé pour demander des données WMI auprès du fournisseur choisi. Options disponibles : `32` ou `64`.
  Consultez la [documentation MSDN][9] pour en savoir plus.

- `tag_by` est facultatif et vous permet de taguer chaque métrique avec une propriété de la classe WMI que vous utilisez. Cela est uniquement utile lorsque vous avez plusieurs valeurs pour votre requête WMI.

- `tags` est facultatif et vous permet de taguer chaque métrique avec un ensemble de valeurs fixes.

- `tag_queries` est facultatif et vous permet de spécifier une liste de requêtes pour taguer des métriques avec une propriété de classe cible. Chaque élément dans la liste est un ensemble `[<PROPRIÉTÉ_SOURCE_LIEN>,<CLASSE_CIBLE>,<PROPRIÉTÉ_CLASSE_CIBLE_LIEN>,<PROPRIÉTÉ_CIBLE>]`, où :

  - `<PROPRIÉTÉ_SOURCE_LIEN>` contient la valeur du lien
  - `<CLASSE_CIBLE>` est la classe à lier
  - `<PROPRIÉTÉ_CLASSE_CIBLE_LIEN>` est la propriété de classe cible à lier
  - `<PROPRIÉTÉ_CIBLE>` contient la valeur à taguer

  On obtient alors une requête WMI :
  `SELECT '<PROPRIÉTÉ_CIBLE>' FROM '<CLASSE_CIBLE>' WHERE '<PROPRIÉTÉ_CLASSE_CIBLE_LIEN>' = '<PROPRIÉTÉ_SOURCE_LIEN>'`

##### Exemple

Le paramètre `[IDProcess, Win32_Process, Handle, CommandLine]` applique à chaque processus un tag correspondant à sa ligne de commande. Les éventuels numéros d'instance sont supprimés des valeurs tag_by. Exemple : name:process#1 => name:process. Attention : pour que ce paramètre fonctionne, l'Agent doit s'exécuter en tant que compte **Administrator**. En effet, la propriété `CommandLine` est réservée aux administrateurs.

#### Collecte de métriques

Le check WMI peut potentiellement générer des [métriques custom][9], ce qui peut avoir une incidence sur votre [facture][11]. 

### Validation

[Lancez la sous-commande `status` de l'Agent][12] et cherchez `wmi_check` dans la section Checks.

## Données collectées

### Métriques

Consultez [metadata.csv][13] pour découvrir la liste complète des métriques fournies par cette intégration.

### Événements

Le check WMI n'inclut aucun événement.

### Checks de service

Le check WMI n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][14].

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/wmi_check/images/wmimetric.png
[2]: https://docs.datadoghq.com/fr/integrations/pdh_check/
[3]: https://msdn.microsoft.com/en-us/library/system.diagnostics.performancecounter(v=vs.110.aspx
[4]: https://wmie.codeplex.com
[5]: https://msdn.microsoft.com/en-us/powershell/scripting/getting-started/cookbooks/getting-wmi-objects--get-wmiobject-
[6]: https://docs.datadoghq.com/fr/integrations/faq/how-to-retrieve-wmi-metrics/
[7]: https://msdn.microsoft.com/en-us/library/windows/desktop/aa394084.aspx
[8]: https://technet.microsoft.com/en-us/library/Hh921475.aspx
[9]: https://msdn.microsoft.com/en-us/library/aa393067.aspx
[10]: https://docs.datadoghq.com/fr/metrics/custom_metrics/
[11]: https://docs.datadoghq.com/fr/account_management/billing/custom_metrics/
[12]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[13]: https://github.com/DataDog/integrations-core/blob/master/wmi_check/metadata.csv
[14]: https://docs.datadoghq.com/fr/help/