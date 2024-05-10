---
aliases:
- /fr/integrations/faq/how-to-retrieve-wmi-metrics
kind: guide
title: Récupérer des métriques WMI
---

## Quʼest-ce que WMI ?

Dans lʼunivers de Windows, les métriques des systèmes d'exploitation et des applications sont exposées à l'aide de Windows Management Instrumentation. LʼAgent Datadog pour Windows est fourni avec une intégration WMI, de sorte que vous puissiez surveiller les informations qui vous intéressent.

Les données de WMI sont regroupées en classes. Plusieurs centaines de classes sont proposées par défaut, et chaque rôle et fonction supplémentaire apporte sa propre classe. Certaines applications peuvent également ajouter des classes, comme Microsoft SQL Server, Microsoft Exchange et diverses applications tierces.

Microsoft Powershell est considéré comme le moyen standard d'interagir de façon programmée avec un système Windows. De plus, il est fourni avec les outils permettant de gérer WMI.

Pour énumérer toutes les classes disponibles sur un ordinateur, exécutez :

```text
PS C:\> Get-WmiObject -List

NameSpace: ROOT\cimv2

Name Methods Properties
---- ------- ----------
__SystemClass {} {}
__thisNAMESPACE {} {SECURITY_DESCRIPTOR}
__Provider {} {Name}
__Win32Provider {} {ClientLoadableCLSID, CLSID, Concurrency, DefaultMachineNam...
__IndicationRelated {} {}

[...]
```

Pour savoir combien de classes sont disponibles, exécutez :

```text
PS C:\> (Get-WmiObject -List).count
931
```

Vous pouvez trouver des classes relatives à un sujet spécifique en utilisant l'instruction `where`. Pour afficher les classes contenant des informations sur les processus, exécutez la commande suivante :

```text
PS C:\> Get-WmiObject -List | where {$_.name -match "process"} | select Name

Name
----
Win32_ProcessTrace
Win32_ProcessStartTrace
Win32_ProcessStopTrace
CIM_Process
Win32_Process
CIM_Processor
Win32_Processor
Win32_PerfFormattedData_PerfOS_Processor
Win32_PerfFormattedData_PerfProc_Process
[...]
```

Pour parcourir les données exposées par une classe, vous pouvez utiliser une syntaxe similaire à SQL, appelée [WQL][1].

De nombreuses métriques relatives aux performances sont signalées par l'outil PerfMon et sont appelées `Win32_PerfFormattedData_`. Dans cet exemple, examinez les informations relatives aux processus afin de pouvoir interroger la classe `Win32_PerfFormattedData_PerfProc_Process` :

```text
PS C:\> Get-WmiObject -Query "select * from Win32_PerfFormattedData_PerfProc_Process where Name = 'Powershell'"

__GENUS                 : 2
__CLASS                 : Win32_PerfFormattedData_PerfProc_Process
__SUPERCLASS            : Win32_PerfFormattedData
__DYNASTY               : CIM_StatisticalInformation
__RELPATH               : Win32_PerfFormattedData_PerfProc_Process.Name="powershell"
__PROPERTY_COUNT        : 36
__DERIVATION            : {Win32_PerfFormattedData, Win32_Perf, CIM_StatisticalInformation}
__SERVER                : DATADOG-9A675BB
__NAMESPACE             : root\cimv2
__PATH                  : \\DATADOG-9A675BB\root\cimv2:Win32_PerfFormattedData_PerfProc_Process.Name="powershell"
Caption                 :
CreatingProcessID       : 2560
Description             :
ElapsedTime             : 3333
Frequency_Object        :
Frequency_PerfTime      :
Frequency_Sys100NS      :
HandleCount             : 655
IDProcess               : 4024
IODataBytesPersec       : 0
IODataOperationsPersec  : 0
IOOtherBytesPersec      : 0
IOOtherOperationsPersec : 0
IOReadBytesPersec       : 0
IOReadOperationsPersec  : 0
IOWriteBytesPersec      : 0
IOWriteOperationsPersec : 0
Name                    : powershell
PageFaultsPersec        : 0
PageFileBytes           : 39415808
PageFileBytesPeak       : 43970560
PercentPrivilegedTime   : 0
PercentProcessorTime    : 0
PercentUserTime         : 0
PoolNonpagedBytes       : 7132
PoolPagedBytes          : 206292
PriorityBase            : 8
PrivateBytes            : 39415808
ThreadCount             : 7
Timestamp_Object        :
Timestamp_PerfTime      :
Timestamp_Sys100NS      :
VirtualBytes            : 162775040
VirtualBytesPeak        : 170778624
WorkingSet              : 41054208
WorkingSetPeak          : 45273088
```

Cette commande permet d'obtenir des détails sur le processus de Powershell. Elle contient de nombreuses informations, notamment sur l'utilisation de la mémoire et les opérations d'E/S.

Pour ceux qui peuvent exécuter des applications tierces sur leur machine, l'outil WMI Explorer est idéal pour parcourir les informations exposées par WMI. Il est disponible à lʼadresse suivante : https://www.ks-soft.net/hostmon.eng/wmi/. Il s'agit d'un fichier .exe autonome, vous n'avez donc pas besoin de l'installer. Il est également exempt de virus. https://www.virustotal.com/en/file/df8e909491da38556a6c9a50abf42b3b906127e0d4b35d0198ef491139d1622c/analysis/.

## Exploiter WMI dans Datadog

Après avoir compris un peu le fonctionnement de WMI, vous pouvez obtenir ces données dans Datadog. Ouvrez Datadog Agent Manager et cliquez sur lʼintégration de checks WMI dans le volet de gauche.

Commencez par un exemple simple : surveiller le nombre de processus sur la machine :

```yaml
init_config:

# Chaque requête WMI possède deux options obligatoires, `class` et `metrics`
# `class` est le nom de la classe WMI, comme Win32_OperatingSystem
# `metrics` est une liste des métriques que vous souhaitez capturer, avec chaque élément de la
# liste représentant un ensemble de [types de métriques, noms de métriques et noms de propriétés WMI].

instances:

  # Récupérez le nombre de processus
  - class: Win32_OperatingSystem
    metrics:
      - [NumberOfProcesses, system.proc.count, gauge]
```

Enregistrez la configuration, activez lʼintégration et redémarrez, puis accédez à « logs and Status -> Agent Status ». Dans la section « Checks », vous devriez voir ce qui suit :

```text
wmi_check Instance #0 OK 1 métrique, 0 événement et 1 check de service ont été récupérés
```

Surveiller le processus Windows Powershell que vous avez consulté précédemment :

```yaml
init_config:

#   Récupérer des métriques pour une seule application en cours dʼexécution
instances:
  - class: Win32_PerfFormattedData_PerfProc_Process
    metrics:
      - [ThreadCount, powershell.threads.count, gauge]
      - [VirtualBytes, powershell.mem.virtual, gauge]

  # `filters` est une liste des filtres de la requête WMI qui pourraient vous être utiles. Par exemple,
  # pour une classe WMI basée sur les processus, il peut vous être utile de disposer de métriques pour
  # certains processus exécutés sur votre ordinateur seulement, afin de pouvoir ajouter un filtre à chaque
  # nom de processus. Vous pouvez voir un exemple de ce cas ci-dessous.
    filters:
      - Name: powershell
```

Dans votre Metrics Explorer, vous devriez trouver 2 métriques appelées powershell.threads.count et powershell.mem.virtual. Mais que se passe-t-il si vous avez ouvert 2 consoles Powershell ? Vous pouvez trouver l'erreur suivante dans la section « Checks » :

```text
wmi_check
  Instance #0
    ERROR
  Error
    Exception("La requête WMI a renvoyé plusieurs rangs, mais aucune valeur `tag_by` nʼa été donnée. metrics=[['ThreadCount',
    'powershell.threads.count', 'gauge'], ['VirtualBytes', 'powershell.mem.virtual', 'gauge']]",)
  0 métrique, 0 événement et 1 check de service ont été récupérés
```

En effet, lʼAgent ne peut pas transmettre 2 métriques différentes qui ont le même ensemble de noms et tags. Pour pouvoir différencier les deux, vous pouvez utiliser `tag_by: Instance_Property_Name statement` et utiliser la valeur de la propriété d'une instance comme un tag supplémentaire :

```yaml
init_config:

instances:

#   Récupérer des métriques pour chaque instance dʼune application en cours dʼexécution
  - class: Win32_PerfFormattedData_PerfProc_Process
    metrics:
      - [ThreadCount, powershell.threads.count, gauge]
      - [VirtualBytes, powershell.mem.virtual, gauge]
    filters:
      - Name: powershell
# `tag_by` vous permet dʼattribuer un tag à chaque métrique avec une propriété de la
# classe WMI que vous utilisez. Ceci est utile dans le seul cas où vous possédez plusieurs
# valeurs pour votre requête WMI. Les exemples ci-dessous illustrent la façon dont vous pouvez attribuer un tag aux
# métriques de vos processus avec le nom du processus (en donnant un tag de "name:app_name").
    tag_by: Name
# Vous remarquerez que ceci fonctionne sur Window >= 2008, car `#XYZ` est ajouté aux noms des processus, avec `XYZ` représentant un nombre incrémentiel
# Si vous exécutez Windows 2003, utilisez une autre valeur unique, comme `tag_by: IDProcess`
```

Ce qui donne 2 métriques par console Powershell ouverte :

```text
wmi_check
  Instance #0
    OK
  4 métriques, 0 événement et 1 check de service ont été récupérés
```

Si les informations que vous souhaitez utiliser en tant que tag ne font pas partie de la classe dont vous obtenez les données, vous avez la possibilité d'utiliser la liste tag_queries pour relier des données provenant de différents tableaux.

Supposons que vous souhaitiez établir un rapport sur PoolNonPagedBytes à partir de Win32_PerfFormattedData_PerfProc_Process et que vous souhaitiez ajouter CreationDate à partir de Win32_Process en tant que tag. Ces deux classes exposent le PID sous des noms différents : IDProcess dans Win32_PerfFormattedData_PerfProc_Process et Handle dans Win32_Process. La première est donc la propriété source du lien et la seconde la propriété cible :

```yaml
# `tag_queries` vous permet dʼindiquer facultativement une liste de requêtes, afin dʼattribuer un tag aux métriques
# avec une propriété de classe cible. Chaque élément de la liste représente un ensemble de
# [propriétés source de lien, classes cible, propriétés de classe de lien cible, propriétés cible]
# où :
#
# - 'link source property' contient la valeur du lien
# - 'target class' représente la classe avec laquelle effectuer le lien
# - 'link target class property' est la propriété de classe cible avec laquelle effectuer le lien
# - 'target property' contient la valeur avec laquelle ajouter un tag
#
# Le résultat est une requête WMI :
# SELECT 'target property' FROM 'target class'
#                 WHERE 'link target class property' = 'link source property'
#
# Remarque : ceci peut entraîner la suppression dʼun numéro dʼinstance des valeurs tag_by
# par exemple : name:process#1 => name:process

init_config:

instances:

#   Récupérer des métriques pour une seule application en cours dʼexécution
  - class: Win32_PerfFormattedData_PerfProc_Process
    metrics:
      - [ThreadCount, powershell.threads.count, gauge]
      - [VirtualBytes, powershell.mem.virtual, gauge]
    filters:
      - Name: powershell
    tag_by: Name

    tag_queries:
      - [IDProcess, Win32_Process, Handle, CreationDate]
```

[1]: https://msdn.microsoft.com/en-us/library/aa392902