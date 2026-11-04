---
aliases:
- /fr/integrations/guide/azure-architecture-and-configuration/
- /fr/integrations/guide/powershell-command-to-install-azure-datadog-extension/
- /fr/integrations/guide/azure-vms-appear-in-app-without-metrics/
- /fr/integrations/guide/azure-troubleshooting/
- /fr/integrations/guide/powered-down-azure-vm-on-infrastructure-list/
- /fr/integrations/guide/azure-count-metric/
- /fr/integrations/guide/azure-status-metric
- /fr/integrations/faq/azure-vm-status-is-not-reporting
- /fr/integrations/faq/azure-status-metric
- /fr/integrations/faq/azure-count-metric
- /fr/integrations/faq/azure-troubleshooting
- /fr/integrations/faq/azure-vms-are-showing-up-in-the-app-but-not-reporting-metrics
- /fr/integrations/faq/my-Azure-vm-is-powered-down-why-is-it-still-listed-in-my-infrastructure-list
- /fr/integrations/faq/powershell-command-to-install-azure-datadog-extension
description: Configuration avancée et architecture de l'intégration Azure de Datadog
further_reading:
- link: /integrations/azure/
  tag: Documentation
  text: Intégration Azure
title: Configuration avancée d'Azure
---
## Présentation {#overview}

Ce guide fournit des options de configuration avancées et des architectures de référence pour les utilisateurs configurant l'intégration Azure de Datadog, ainsi que des options de configuration alternatives pour des cas d'utilisation spécifiques.

### Architectures de référence {#reference-architectures}

Les diagrammes de ce guide fournissent une représentation visuelle du processus de configuration et du résultat lors du suivi des étapes décrites dans [Commencer avec Azure][1]. Ce guide fournit un aperçu détaillé de l'interaction de Datadog avec votre environnement Azure et répond aux questions courantes sur la sécurité, la conformité et la gouvernance.

### Configurations alternatives {#alternate-configurations}

Les processus de configuration documentés dans [Commencer avec Azure][1] sont les étapes recommandées et aboutissent à la configuration idéale pour la majorité des utilisateurs. Les options de configuration alternatives présentées dans ce document peuvent être préférables pour certains cas d'utilisation. Tout compromis en termes de performances, de fonctionnalités ou de facilité de gestion est décrit si nécessaire.

## Collecte de métriques et de données {#metric-and-data-collection}

L'activation de l'intégration Datadog/Azure permet à Datadog :

  - Découvrir et surveiller toutes les ressources dans tous les abonnements au sein du périmètre donné
  - Mettre à jour automatiquement les définitions de métriques découvertes, pour garantir que toutes les métriques disponibles depuis Azure Monitor sont collectées
  - Ingérer une gamme de métadonnées générales et spécifiques aux ressources (y compris les tags Azure personnalisés), et les appliquer aux métriques de ressources associées dans Datadog en tant que tags
  - Interroger les API de métadonnées Azure et utiliser les réponses pour [générer des métriques utiles dans Datadog][2] afin d'obtenir des informations qu'Azure Monitor ne prend pas en charge

Les API Azure utilisées et les données collectées sont identiques, que vous utilisiez la version standard ou la version Azure native de l'intégration.

Le diagramme ci-dessous présente le processus et l'architecture résultante de la configuration de l'intégration Azure décrite dans [Commencer avec Azure][1].

{{< img src="integrations/guide/azure_architecture_and_configuration/app_registration_integration_setup.png" alt="Diagramme de workflow montrant la configuration de l'intégration de l'enregistrement d'application Azure : créer un enregistrement d'application avec un principal de service et des secrets client dans Azure, attribuer le rôle de lecteur de surveillance à l'abonnement ou aux ressources de gestion, puis configurer l'intégration avec des filtres de tags de métriques dans le backend Datadog." >}}

Une fois cette opération terminée, la collecte de données commence automatiquement. L'enregistrement d'application permet à Datadog de [demander un jeton à Azure Active Directory][3] (AD). Datadog utilise ce jeton comme autorisation pour les appels API vers diverses API Azure, afin de découvrir les ressources au sein du périmètre fourni et de collecter des données. Ce processus continu s'exécute par défaut à des intervalles de deux minutes et est utilisé pour découvrir et collecter des données depuis votre environnement Azure. Le processus de collecte de données est illustré ci-dessous.

{{< img src="integrations/guide/azure_architecture_and_configuration/app_registration_metric_collection.png" alt="Diagramme de workflow montrant le processus de collecte de métriques Azure : le backend Datadog lit la configuration, s'authentifie via un principal de service auprès d'Azure Active Directory, collecte les métadonnées d'abonnement et de ressource à l'aide des autorisations RBAC, filtre les ressources par tags, puis récupère les métriques depuis Azure Monitor pour les ingérer dans Datadog." >}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Les diagrammes de collecte de métriques et de logs ci-dessus utilisent l'authentification avec un secret client. Avec **l'authentification sans secret**, l'enregistrement de l'application fait confiance à l'identité de Datadog via un identifiant fédéré Azure et la fédération d'identités de charges de travail OpenID Connect (OIDC). Cela remplace le secret client stocké. Pour déplacer un enregistrement d'application existant vers l'authentification sans secret, consultez [Migrer un enregistrement d'application existant vers l'authentification sans secret](/getting_started/integrations/azure/#secretless-migration-setup).
{{< /site-region >}}

## Collecte de logs {#log-collection}

Le diagramme ci-dessous fournit une architecture de référence pour le transfert de logs d'Azure vers Datadog à l'aide du [transfert automatisé de logs][29]. Un plan de contrôle déployé dans l'abonnement de votre choix découvre les ressources et configure leurs paramètres de diagnostic. Les transmetteurs de logs, composés d'un job Azure Container Apps et d'un compte de stockage, sont déployés dans chaque région où vos ressources génèrent des logs, et ils s'ajustent au volume des logs.

{{<img src="/logs/guide/azure_automated_logs_architecture/detailed_architecture.png" alt="Diagramme de workflow montrant le transfert automatisé de logs Azure : le plan de contrôle découvre les ressources, met à l'échelle les transmetteurs de logs entre les régions, configure les paramètres de diagnostic pour envoyer les logs vers des comptes de stockage, puis les Container Apps vérifient et transfèrent les nouveaux logs vers Datadog Log Management." style="width:100%">}}

Pour les instructions de configuration, consultez le [guide de configuration du transfert automatisé de logs Azure][29].

{{% collapse-content title="Transfert de logs via Event Hub (hérité)" level="h3" expanded=false id="legacy-event-hub-log-forwarding" %}}

L'architecture de référence suivante s'applique aux configurations existantes de transfert de logs via Event Hub. Pour les nouveaux déploiements, utilisez plutôt le [transfert automatisé de logs][29].

{{< img src="integrations/guide/azure_architecture_and_configuration/manual_log_forwarding.png" alt="Diagramme d'architecture montrant la configuration manuelle du transfert de logs Azure sur deux régions où les ressources Azure utilisent des paramètres de diagnostic pour envoyer des logs via Event Hubs et des fonctions de transfert de logs vers l'ingestion de logs Datadog." >}}

#### Utilisation des modèles fournis {#using-the-provided-templates}

Le bouton **Déployer sur Azure** dans le [guide de journalisation Event Hub][13] Azure principal fournit un modèle pour créer une paire composée d'un Event Hub et d'une fonction de transfert. En plus d'utiliser ce modèle pour déployer directement, vous pouvez utiliser les modèles ARM sous-jacents comme point de départ pour vos propres déploiements d'infrastructure en tant que code.

Ces modèles n'ajoutent pas de paramètres de diagnostic, à l'exception d'un paramètre de diagnostic facultatif pour les logs d'activité. Pour les logs de ressources, Datadog recommande d'utiliser des modèles ARM ou Terraform pour ajouter des paramètres de diagnostic à vos ressources par programmation. Ces paramètres de diagnostic doivent être ajoutés à chaque ressource devant envoyer des logs de ressources à Datadog.

#### Considérations relatives à la région {#region-considerations}

Les paramètres de diagnostic ne peuvent envoyer des logs de ressources qu'aux concentrateurs d'événements situés dans la même région que la ressource. Ajoutez une paire composée d'un concentrateur d'événements et d'une fonction de transfert dans chaque région contenant des ressources pour lesquelles vous souhaitez envoyer des logs de ressources à Datadog.

Cependant, les paramètres de diagnostic ne sont pas limités à l'envoi de logs de ressources aux concentrateurs d'événements situés dans le même abonnement que la ressource. Si vous disposez de plusieurs abonnements dans votre tenant Azure, ils peuvent partager un seul concentrateur d'événements et une seule fonction de transfert au sein de la même région.

#### Considérations relatives aux volumes de logs élevés {#high-volume-log-considerations}

À mesure que le volume de logs augmente, vous pouvez constater des goulots d'étranglement, survenant généralement au niveau des concentrateurs d'événements. Si vous prévoyez de soumettre des volumes de logs élevés, vous pouvez envisager d'ajouter des partitions supplémentaires ou d'utiliser un niveau Premium ou Dédié.
Pour des volumes de logs particulièrement élevés, vous pouvez envisager d'ajouter des paires supplémentaires de concentrateurs d'événements et de fonctions de transfert dans la même région, et de répartir le trafic entre elles.

{{% /collapse-content %}}

{{% collapse-content title="Commandes pour installer l'extension Azure Datadog" level="h3" expanded=false id="azure-datadog-extension-commands" %}}
## Installation sur Azure {#install-on-azure}

Datadog propose une extension Azure pour faciliter le déploiement de l'Agent sur les instances d'Azure :

* [Présentation de la surveillance Azure avec le déploiement Datadog en un clic][6]
* [Intégration Azure][10] _Tous les sites_
* [Intégration native Azure][7] _US3 uniquement_

Une alternative à l'installation via l'interface graphique est la ligne de commande.

Pour exécuter le Datadog Agent dans vos instances Azure en tant qu'extension, utilisez la commande qui correspond à votre environnement. Remplacez `<SITE_PARAMETER>` par la valeur du paramètre **site** de votre compte Datadog sur la [page des sites Datadog][33], et `<DATADOG_API_KEY>` par votre [clé d'API Datadog][9].
   **Remarque** : Python 3.9+ est requis pour installer l'Agent version 7+.

{{< tabs >}}
{{% tab "Windows" %}}

{{< code-block lang="powershell" >}}
Set-AzVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "7.0" -Settings @{"site" = "<SITE_PARAMETER>"; "agentVersion" = "latest"} -ProtectedSettings @{"api_key" = "<DATADOG_API_KEY>"} -DisableAutoUpgradeMinorVersion
{{< /code-block >}}

Plus d'informations sur la syntaxe permettant de définir les extensions d'instance Azure sont disponibles dans la [documentation Azure Extension Set-AzVMExtension][100].

L'extension Azure peut accepter des paramètres normaux et des paramètres protégés.

Les réglages normaux comprennent :

| Variable | Type | Description |
|----------|------|--------------|
| `site` | Chaîne | Définissez le site d'admission Datadog, par exemple : `SITE=`{{< region-param key="dd_site" code="true">}} |
| `agentVersion` | Chaîne | La version de l'Agent à installer, en suivant le format `x.y.z` ou `latest` |
| `agentConfiguration` | URI | (facultatif) URI vers le blob Azure contenant la configuration de l'Agent sous forme de fichier ZIP. |
| `agentConfigurationChecksum` | Chaîne | La somme de contrôle SHA256 du fichier ZIP de configuration de l'Agent, obligatoire si `agentConfiguration` est spécifié. |

Les paramètres protégés comprennent :

| Variable | Type | Description |
|----------|------|--------------|
| `api_key`| Chaîne | Ajoute la CLÉ D'API Datadog au fichier de configuration. |

**Remarque** : Si `agentConfiguration` et `api_key` sont spécifiés en même temps, la clé d'API trouvée dans `agentConfiguration` est prioritaire. Notez également que si une clé d'API est définie sur la machine cible, il n'est pas possible de la modifier avec `Set-AzVMExtension`.

### Spécifiez un URI de configuration {#specify-a-configuration-uri}

Cet exemple montre comment indiquer une configuration à utiliser par le Datadog Agent.
L'URI de configuration du Datadog Agent doit être un URI de stockage de blob Azure.
L'extension Azure du Datadog Agent pour Windows vérifie que l'URI `agentConfiguration` provient du domaine `.blob.core.windows.net`.
La configuration du Datadog Agent doit être créée à partir du dossier `%PROGRAMDATA%\Datadog` (consultez le [fichier de configuration d'exemple de l'Agent pour Windows][101] pour connaître toutes les options de configuration disponibles).

<div class="alert alert-info">
Pour réutiliser la configuration d'un Agent existant :

   1. Supprimez tous les artefacts ou fichiers d'installation supplémentaires du dossier de l'Agent existant afin qu'il ne contienne que le <code>%ProgramData%\Datadog</code> dossier afin qu'il ne contienne que le <code>datadog.yaml</code> fichier et le <code>conf.d</code> dossier avec vos configurations d'intégration.
   1. Enregistrez le dossier nettoyé <code>%ProgramData%\Datadog</code> sous forme de fichier ZIP.
</div>

#### Générez une somme de contrôle SHA256 à partir du fichier de configuration de l'Agent {#generate-a-sha256-checksum-from-the-agent-configuration-file}

{{< code-block lang="powershell" >}}
Get-FileHash -Path "C:\path\to\yourfile.zip" -Algorithm SHA256
{{< /code-block >}}

#### Installez l'Agent avec votre configuration personnalisée {#install-the-agent-with-your-custom-configuration}

Référencez l'URL du stockage blob avec le paramètre `agentConfiguration` et la somme de contrôle avec le paramètre `agentConfigurationChecksum` pour créer l'extension de VM.

{{< code-block lang="powershell" >}}
Set-AzVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "7.0" -Settings @{"site" = "<SITE_PARAMETER>"; "agentConfiguration" = "https://<CONFIGURATION_BLOB>.blob.core.windows.net/<FILE_PATH>.zip"; "agentConfigurationChecksum" = "<SHA256_CHECKSUM>"} -DisableAutoUpgradeMinorVersion
{{< /code-block >}}

**Remarque** : Une fois le Datadog Agent installé, la configuration ne peut être modifiée que lors de la mise à niveau vers une version plus récente.

### Définissez une version spécifique de l'Agent {#set-a-specific-version-of-the-agent}

Cet exemple montre comment spécifier une version de l'Agent à installer. Par défaut, l'extension Azure de l'Agent Windows Datadog installe la dernière version du Datadog Agent.

**Remarque** : Les rétrogradations ne sont *pas* prises en charge ; il n'est donc pas possible d'installer une version *inférieure* du Datadog Agent à celle actuellement installée sur la machine cible. Pour installer une version inférieure du Datadog Agent, désinstallez d'abord la version précédente en supprimant l'extension Azure de l'Agent Windows Datadog sur la machine cible. La suppression de l'extension Azure de l'Agent Windows Datadog ne supprime pas la configuration du Datadog Agent.

{{< code-block lang="powershell" >}}
Set-AzVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "7.0" -Settings @{"site" = "<SITE_PARAMETER>"; "agentVersion" = "latest"} -ProtectedSettings @{"api_key" = "<DATADOG_API_KEY>"} -DisableAutoUpgradeMinorVersion
{{< /code-block >}}

[100]: https://learn.microsoft.com/powershell/module/az.compute/set-azvmextension
[101]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_windows.yaml.example
{{% /tab %}}
{{% tab "Linux" %}}

{{< code-block lang="shell" >}}
az vm extension set --publisher "Datadog.Agent" --name "DatadogLinuxAgent" --version 7.0 --settings '{"site":"datadoghq.com", "agentVersion":"latest"}' --protected-settings '{"api_key":"<DATADOG_API_KEY>"}' --no-auto-upgrade-minor-version
{{< /code-block >}}

Vous trouverez plus d'informations sur la syntaxe permettant de définir les extensions d'instance Azure dans la [documentation de référence de l'interface de ligne de commande Azure Extension][200].

L'extension Azure peut accepter des paramètres normaux et des paramètres protégés.

Les réglages normaux comprennent :

| Variable | Type | Description |
|----------|------|--------------|
| `site` | Chaîne | Définissez le site d'admission Datadog, par exemple : `SITE=`{{< region-param key="dd_site" code="true">}} |
| `agentVersion` | Chaîne | La version de l'Agent à installer, en suivant le format `x.y.z` ou `latest` |
| `agentConfiguration` | URI | (facultatif) URI vers le blob Azure contenant la configuration de l'Agent sous forme de fichier zip. |
| `agentConfigurationChecksum` | Chaîne | La somme de contrôle SHA256 du fichier ZIP de configuration de l'Agent, obligatoire si `agentConfiguration` est spécifié. |

Les paramètres protégés comprennent :

| Variable | Type | Description |
|----------|------|--------------|
| `api_key`| Chaîne | Ajoute la CLÉ D'API Datadog au fichier de configuration. |

**Remarque** : Si `agentConfiguration` et `api_key` sont spécifiés en même temps, la clé d'API trouvée dans `agentConfiguration` est prioritaire. Si une clé d'API est définie sur la machine cible, il n'est pas possible de la modifier avec le paramètre `api_key`.

### Spécifiez un URI de configuration {#specify-a-configuration-uri-1}

Cet exemple montre comment indiquer une configuration à utiliser par le Datadog Agent.
- L'URI de configuration du Datadog Agent doit être un URI de stockage blob Azure.
- L'extension Azure de l'Agent Linux Datadog vérifie que l'URI `agentConfiguration` provient du domaine `.blob.core.windows.net`.
- La configuration du Datadog Agent doit être créée à partir du dossier `/etc/datadog-agent/` (consultez l'[exemple de fichier de configuration de l'Agent pour Linux][201] pour connaître toutes les options de configuration disponibles).

<div class="alert alert-info">
Pour réutiliser la configuration d'un Agent existant en enregistrant son <code>/etc/datadog-agent</code> dossier sous forme de fichier ZIP:

<code>zip -r datadog_config.zip /etc/datadog-agent</code>.
</div>

#### Générez une somme de contrôle SHA256 à partir du fichier de configuration de l'Agent {#generate-a-sha256-checksum-from-the-agent-configuration-file-1}

{{< code-block lang="shell" >}}
sha256sum <YOUR_FILENAME>.zip
{{< /code-block >}}

#### Installez l'Agent avec votre configuration personnalisée {#install-the-agent-with-your-custom-configuration-1}

Référencez l'URL du stockage blob avec le paramètre `agentConfiguration` et la somme de contrôle avec le paramètre `agentConfigurationChecksum` pour créer l'extension de VM.

{{< code-block lang="shell" >}}
az vm extension set --publisher "Datadog.Agent" --name "DatadogLinuxAgent" --version 7.0 --settings '{"site":"datadoghq.com", "agentVersion":"latest", "agentConfiguration":"https://<CONFIGURATION_BLOB>.blob.core.windows.net/<FILE_PATH>.zip", "agentConfigurationChecksum":"<SHA256_CHECKSUM>"}' --protected-settings '{"api_key":"<DATADOG_API_KEY>"}' --no-auto-upgrade-minor-version
{{< /code-block >}}


[200]: https://learn.microsoft.com/cli/azure/vm/extension
[201]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_linux.yaml.example
{{% /tab %}}
{{< /tabs >}}

## Installez sur Azure Arc {#install-on-azure-arc}

Pour exécuter le Datadog Agent dans vos instances [Azure Arc][11] en tant qu'extension, utilisez la commande qui correspond à votre environnement.

{{< tabs >}}
{{% tab "Windows" %}}

{{< code-block lang="powershell" >}}
az connectedmachine extension create --name <NAME> --machine-name <MACHINE_NAME> -g <RESOURCE_GROUP> --publisher Datadog.Agent --type DatadogWindowsAgent --location <LOCATION> --settings '{"site":"<SITE_PARAMETER>"}' --protected-settings '{"api_key":"<DATADOG_API_KEY>"}'
{{< /code-block >}}

{{% /tab %}}
{{% tab "Linux" %}}

{{< code-block lang="bash" >}}
az connectedmachine extension create --name <NAME> --machine-name <MACHINE_NAME> -g <RESOURCE_GROUP> --publisher Datadog.Agent --type DatadogLinuxAgent --location <LOCATION> --settings '{"site":"<SITE_PARAMETER>"}' --protected-settings '{"api_key":"<DATADOG_API_KEY>"}'
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

Plus d'informations sur la syntaxe pour définir les extensions Azure `connectedmachine` sont disponibles sur la page [az connectedmachine extension][12].
{{% /collapse-content %}} 

{{% collapse-content title="Métriques de décompte Azure" level="h3" expanded=false id="azure-count-metrics" %}}
Datadog génère une métrique supplémentaire pour chaque ressource surveillée avec l'[intégration Azure][23] : `azure.*.count`. Par exemple, les machines virtuelles Azure surveillées par Datadog rapportent `azure.vm.count`.

La métrique `azure.*.count` est une amélioration par rapport à `azure.*.status`, qui est obsolète.

## Métrique de décompte {#count-metric}

La métrique `azure.*.count` fournit deux informations fondamentales :

- Le nombre de ressources de ce type.
- Le statut de chaque ressource tel que rapporté par Azure.

La métrique `azure.*.count` est créée dans le même espace de nom que les autres métriques pour ce type de ressource, par exemple : `azure.network_loadbalancers.count`. Elle inclut tous les mêmes tags de métadonnées que les autres métriques de cet espace de nom, ainsi qu'un tag supplémentaire pour `status`.

### Cas d'utilisation {#use-cases}

Utilisez la métrique `azure.*.count` pour :

- Créer une vue du nombre de machines virtuelles réparties par leur statut au fil du temps en représentant graphiquement `azure.vm.count` sur tout et en effectuant la somme par `status`.
- Créer des widgets de requête dans les dashboards pour afficher le nombre d'un type de ressource donné. Utilisez tous les tags disponibles pour limiter le décompte à une agrégation pertinente telle que la région, le groupe de ressources, le type ou le statut.
- Créer des monitors pour vous alerter sur le statut de différentes ressources Azure.

**Remarque** : Dans certains cas, les paramètres de visualisation par défaut peuvent donner l'impression que les ressources sont comptées deux fois par intermittence dans les graphiques ou les widgets de requête. Cela n'affecte pas les monitors ou les widgets limités à un statut spécifique.
Vous pouvez réduire cet effet en désactivant [l'interpolation][22] dans les graphiques ou les widgets de requête en définissant Interpolation > none ou en utilisant `.fill(null)`.

La plupart des types de ressources peuvent posséder l'un des statuts suivants :

- En cours d'exécution
- Indisponible
- Inconnu
- Dégradé
- Échec

Les machines virtuelles possèdent des statuts plus détaillés. En voici quelques exemples :

- En cours d'exécution
- Arrêté_désalloué
- Arrêté
- Inconnu
- Indisponible
- Dégradé
- Échec

Si vous voyez un statut `query_failed`, vous devez activer le fournisseur Resource Health dans Azure.
{{% /collapse-content %}} 

## Dépannage de l'intégration Azure {#azure-integration-troubleshooting}

{{% collapse-content title="Trouver le nom de votre locataire" level="h3" expanded=false id="troubleshooting-find-your-tenant-name" %}}
1. Accédez à [portal.azure.com][24].
2. Dans la barre latérale gauche, sélectionnez **Azure Active Directory**.
3. Sous **Informations de base**, recherchez la valeur **Nom**.
{{% /collapse-content %}} 

{{% collapse-content title="Impossible de se connecter" level="h3" expanded=false id="troubleshooting-unable-to-login" %}}
Si vous rencontrez une erreur de connexion lors de l'installation de l'intégration Azure, contactez le [support Datadog][36]. Si possible, joignez une capture d'écran.
{{% /collapse-content %}} 

{{% collapse-content title="Métriques manquantes" level="h3" expanded=false id="troubleshooting-missing-metrics" %}}
Assurez-vous de bien terminer le processus d'installation, en accordant des autorisations de lecture à l'application Azure pour les abonnements que vous souhaitez surveiller.

Pour les machines virtuelles déployées via ARM, vous devez également activer les diagnostics et sélectionner les métriques de VM que vous souhaitez collecter. Voir **Activer les diagnostics** ci-dessous pour obtenir des instructions.

Pour d'autres métriques manquantes, contactez le [support Datadog][36] avec les informations suivantes concernant la métrique :
- dimensions
- groupe de ressources
- nom de la ressource
- ID d'abonnement ou nom de l'abonnement 

Joignez une capture d'écran d'un graphique depuis Azure Monitor montrant un graphique de la métrique. **Important** : Affichez les points de données à 1 minute sur la capture d'écran.

#### Activer les diagnostics {#enable-diagnostics}

L'activation des diagnostics permet aux VM déployées avec ARM de recueillir des informations de journalisation, notamment des métriques sur le CPU, le réseau, etc. Pour activer les diagnostics, procédez comme suit :

1. Accédez au [portail Azure][24] et localisez votre VM.
2. Cliquez sur **Paramètres de diagnostic** dans la section **Surveillance**.
3. Choisissez un compte de stockage et cliquez sur **Activer la surveillance au niveau de l'invité**.
4. Par défaut, les métriques et logs de base sont activés. Ajustez selon vos préférences.
5. Cliquez sur **Enregistrer** pour sauvegarder vos modifications.

    {{< img src="integrations/guide/azure_troubleshooting/azure_enable_diagnostics.png" alt="aperçu des paramètres de diagnostic Azure affiché avec Aucun compte de stockage mis en surbrillance sous Choisir un compte de stockage et activer la surveillance au niveau de l'invité activé" style="width:70%">}}
{{% /collapse-content %}} 

{{% collapse-content title="Écart entre vos données dans Azure et Datadog" level="h3" expanded=false id="troubleshooting-metric-discrepancy" %}}
L'intégration Azure de Datadog collecte toutes les métriques depuis [Azure Monitor][27]. Les métriques sont collectées avec toutes les dimensions disponibles (qui sont mappées aux tags dans Datadog), la granularité temporelle la plus élevée et le type d'agrégation principal.

Les sections ci-dessous décrivent deux distinctions importantes à connaître, ainsi que les étapes pour [résoudre l'écart](#reconcile-the-discrepancy).

#### 1. Agrégation temporelle {#1-time-aggregation}

Datadog affiche les données brutes provenant d'Azure en valeurs par seconde, quelle que soit la période sélectionnée dans Azure. Cela peut rendre la valeur de Datadog inférieure à la valeur affichée par Azure. Consultez [Agrégation temporelle][15] dans la documentation des métriques pour plus d'informations.

#### 2. Agrégation spatiale {#2-space-aggregation}

L'[agrégation spatiale][28] dans Datadog correspond au [type d'agrégation principal][17] de la métrique dans Azure Monitor. Vous pouvez trouver le type d'agrégation principal à partir de l'API [Metric Definitions - List][16] d'Azure, dans le champ `primaryAggregationType`.

#### Résoudre l'écart {#reconcile-the-discrepancy}

1. Représentez la métrique dans [Azure Monitor Metrics Explorer][18], ou en accédant à la ressource dans Azure et en cliquant sur **Monitoring** puis sur **Metrics** dans le panneau de gauche.
2. Représentez la métrique dans le [Datadog Metrics Explorer][31].
3. Confirmez que la requête dans Azure est définie de manière identique à la requête dans Datadog :
   - Toutes les dimensions utilisées dans la requête de métrique Azure doivent correspondre aux tags utilisés dans la requête de métrique Datadog.
   - Le type d'agrégation principal utilisé dans la requête doit correspondre à l'[agrégateur d'espace][28] Datadog.
   - La période doit correspondre à la période dans le Datadog Metric Explorer.
4. Survolez un point de données sur le graphique pour afficher l'horodatage et la valeur.

{{< img src="integrations/guide/azure_advanced_configuration/azure_metric_explorer.png" alt="L'Azure Metrics Explorer avec le curseur survolant un point du graphique, et la valeur de la métrique ainsi que l'horodatage mis en évidence" >}}

5. Trouvez le même point dans le temps sur le graphique Datadog et comparez les valeurs. Si les valeurs sont égales, l'écart initial était dû à des différences d'agrégation temporelle ou spatiale entre les deux graphiques.
{{% /collapse-content %}} 

### Dépannage de la collecte de logs{#log-collection-troubleshooting}

Pour résoudre les problèmes de transfert de logs, commencez par la [section de dépannage général](#general-troubleshooting-applicable-to-all-setup-methods). Si ces étapes ne résolvent pas votre problème, consultez les conseils spécifiques à la configuration suivants. 

- [Automatisé](#automated-log-forwarding-troubleshooting)
- [Stockage Blob](#blob-storage-log-forwarding-troubleshooting)
- [Intégration native](#azure-native-integration-log-forwarding-troubleshooting)
- [Event Hub](#event-hub-log-forwarding-troubleshooting)

#### Dépannage général applicable à toutes les méthodes de configuration {#general-troubleshooting-applicable-to-all-setup-methods}

Dépassement du quota quotidien de logs :
: Assurez-vous de ne pas avoir dépassé votre [quota quotidien][20] de rétention des logs.

Exclusion de logs avec des filtres d'exclusion :
: Assurez-vous que vos logs ne sont pas exclus par des [filtres d'exclusion][38].

Syntaxe incorrecte utilisée pour rechercher des logs :
: Assurez-vous d'avoir utilisé la [syntaxe de recherche][34] correcte et que votre recherche contient les attributs ou tags appropriés.

Paramètre de diagnostic absent :
: Assurez-vous qu'un [paramètre de diagnostic][8] a été ajouté aux ressources, aux logs d'activité et aux logs Entra ID que vous souhaitez envoyer à Datadog.

**Remarque** : Vous pouvez rechercher les logs Entra ID avec la requête `source:azure.activedirectory`.

#### Dépannage du transfert automatique de logs {#automated-log-forwarding-troubleshooting}

{{% collapse-content title="Vérifiez l'absence de conflits de nommage" level="h5" expanded=false id="troubleshooting-logs-naming-conflicts" %}}
Si vous avez des ressources Azure portant le même nom de ressource que l'un des paramètres par défaut, cela peut entraîner des conflits de nommage. Azure ne permet pas aux ressources de partager des noms de ressources au sein d'un même abonnement. Datadog recommande de renommer le paramètre par défaut avec un nom unique qui n'existe pas encore dans votre environnement.

**Remarque** : si vous réexécutez le modèle en raison de cet échec, Datadog recommande également de supprimer l'intégralité du groupe de ressources pour créer un nouveau déploiement. 
{{% /collapse-content %}} 

{{% collapse-content title="Assurez-vous que le fournisseur de ressources est enregistré" level="h5" expanded=false id="troubleshooting-logs-unregistered-resource-provider" %}}
Si le déploiement de votre modèle échoue en raison de l'erreur `The subscription is not registered to use namespace 'Microsoft.EventHub'` :

Azure dispose de fournisseurs de ressources pour chacun de ses services, tels que `Microsoft.EventHub` pour Azure Event Hubs. Si votre abonnement Azure n'est pas enregistré auprès d'un fournisseur de ressources requis, le script échoue. 

Remédiez à cela en vous enregistrant auprès du fournisseur de ressources approprié. Exécutez la commande d'exemple ci-dessous dans CloudShell, en remplaçant <RESOURCE_PROVIDER_NAME> par le nom du fournisseur de ressources (par exemple, `Microsoft.EventHub`).

{{< code-block lang="shell" >}}

az provider register --namespace <RESOURCE_PROVIDER_NAME>

{{< /code-block >}}
{{% /collapse-content %}} 

{{% collapse-content title="Vérifiez les valeurs DD_SITE et DD_API_KEY" level="h5" expanded=false id="troubleshooting-logs-check-site-and-api-key-alf" %}}
Si tous les logs sont manquants, vérifiez votre [site Datadog][33] et votre clé d'API :

1. Dans le groupe de ressources où les ressources de transfert automatique de logs ont été déployées, accédez à **Paramètres > Déploiements**.
2. Sélectionnez le déploiement le plus récent.
3. Cliquez sur **Redéployer** pour vérifier et modifier les valeurs.
{{% /collapse-content %}} 

{{% collapse-content title="Vérifiez que les logs sont présents dans le conteneur du compte de stockage" level="h5" expanded=false id="troubleshooting-logs-verify-logs-in-storage-account" %}}
Pour les logs de ressources Azure manquants, recherchez le compte de stockage déployé par ARM dans la région de la ressource et vérifiez le conteneur contenant les logs attendus.
{{% /collapse-content %}} 

{{% collapse-content title="Inspectez les logs containerAppConsole des jobs de transfert" level="h5" expanded=false id="troubleshooting-logs-inspect-forwarder-job-logs" %}}
Les [logs de la console Container App][32] vous aident à diagnostiquer les erreurs et les exceptions de l'application. Pour inspecter les logs, activez la journalisation dans l'environnement Container Apps dans la même région que vos ressources pour lesquelles des logs sont manquants.
{{% /collapse-content %}} 

**Remarque** : lors de l'utilisation du transfert automatique de logs pour envoyer des logs, vous devez définir manuellement les paramètres de diagnostic Microsoft Entra. Consultez [Configurer les paramètres de diagnostic Microsoft Entra pour les logs d'activité][14] pour plus d'informations.

#### Dépannage du transfert de logs Blob Storage {#blob-storage-log-forwarding-troubleshooting}

{{% collapse-content title="Vérifiez les valeurs DD_SITE et DD_API_KEY" level="h5" expanded=false id="troubleshooting-logs-check-site-and-api-key-bs" %}}
Si vous ne recevez aucun log, assurez-vous que :
   - Le [site Datadog sélectionné][33] est correct
   - La [clé d'API][9] configurée appartient à la bonne organisation Datadog
{{% /collapse-content %}} 

{{% collapse-content title="Vérifiez la configuration du transmetteur" level="h5" expanded=false id="troubleshooting-logs-verify-forwarder-config" %}}
Assurez-vous que le transmetteur utilise la dernière version, en exécutant Node.js 22 LTS ou une version ultérieure sur le système d'exploitation Windows. Le code est disponible publiquement sur [index.js][19]
{{% /collapse-content %}} 

{{% collapse-content title="Inspecter le déclencheur Blob" level="h5" expanded=false id="troubleshooting-logs-inspect-blob-trigger" %}}
Vérifiez que le déclencheur Blob Storage est configuré avec les options suivantes :

- **Type de liaison** : `Azure Blob Storage`
- **Nom du paramètre Blob** : `blobContent`
- **Chemin** : Le chemin vers vos données de log au sein du compte de stockage
- **Connexion au compte de stockage** : Le nom du paramètre d'application contenant la chaîne de connexion au compte de stockage
{{% /collapse-content %}} 

{{% collapse-content title="Inspecter les métriques de Blob Storage" level="h5" expanded=false id="troubleshooting-logs-inspect-blob-metrics" %}}
Assurez-vous que Blob Storage reçoit des données :
: `azure.storage_storageaccounts_blobservices.ingress`

Assurez-vous que Blob Storage envoie des données :
: `azure.storage_storageaccounts_blobservices.egress` 

Assurez-vous que les requêtes vers Blob Storage aboutissent :
: `azure.storage_storageaccounts_blobservices.transactions`

Pour la métrique `azure.storage_storageaccounts_blobservices.transactions`, vous pouvez utiliser les requêtes de métrique suivantes pour afficher le nombre d'opérations `PUT` réussies ou échouées, respectivement :

   - `azure.storage_storageaccounts_blobservices.transactions{responsetype:success , apiname:put*} by {apiname}`
   - `azure.storage_storageaccounts_blobservices.transactions{!responsetype:success , apiname:put*} by {responsetype}`
{{% /collapse-content %}} 

{{% collapse-content title="Inspecter les métriques de fonction" level="h5" expanded=false id="troubleshooting-logs-inspect-function-metrics-bs" %}}
Vérifiez si l'application de fonction rencontre des problèmes d'exécution, des problèmes de réception ou de transmission de données, ou des codes d'état d'erreur en inspectant les métriques suivantes :

Assurez-vous que la fonction reçoit des données :
: `azure.functions.bytes_received`

Assurez-vous que la fonction envoie des données :
: `azure.functions.bytes_sent`

Assurez-vous que les requêtes de la fonction reçoivent des codes d'état réussis :
: `azure.functions.http2xx`

Assurez-vous que les requêtes de la fonction ne reçoivent pas de codes d'état d'erreur :
: `azure.functions.http4xx`
: `azure.functions.http5xx`
{{% /collapse-content %}} 

{{% collapse-content title="Paramètres de diagnostic non ajoutés automatiquement aux ressources ou aux logs d'activité" level="h5" expanded=false id="troubleshooting-logs-diagnostic-settings-not-added" %}}

Si un paramètre de diagnostic n'a pas été ajouté automatiquement à vos ressources ou logs d'activité, vérifiez si :
   - Le [nombre maximal de paramètres de diagnostic][25] a été atteint
   - Un verrou existe sur les ressources et empêche les modifications
{{% /collapse-content %}} 

**Remarque** : Lorsque de nouveaux logs sont ajoutés à un fichier de stockage Blob, la fonction est déclenchée pour envoyer le contenu complet du fichier, et non seulement les nouveaux ajouts.

#### Dépannage du transfert de logs d'intégration Azure Native {#azure-native-integration-log-forwarding-troubleshooting}

{{% collapse-content title="Vérifier les règles de tag des logs de ressources" level="h5" expanded=false id="troubleshooting-logs-check-resource-logs-tag-rules" %}}
Vérifiez que les règles de tag dans la configuration de la ressource Datadog correspondent aux tags définis sur vos logs de ressources.

S'il n'y a aucun problème avec les règles de tag, contactez le [support Datadog][36] et partagez les informations suivantes :
   - **ID de locataire** : Trouvez la valeur de l'ID de locataire dans Entra ID, sous **Informations de base**
   - **ID d'abonnement** : L'ID d'abonnement de tout abonnement dont les logs sont manquants
   - **ID de ressource Datadog** : Trouvez l'ID de ressource Datadog en accédant à **Paramètres > Propriétés** sur le panneau de la ressource Datadog. L'ID de ressource utilise ce format : `/subscriptions/<SUBSCRIPTION_ID>/resourceGroups/myresourcegroup/providers/Microsoft.Datadog/monitors/<DATADOG_RESOURCE_NAME`
   - **ID de ressource** : L'ID de ressource de toute ressource dont les logs sont manquants, comme les applications web ou les bases de données
{{% /collapse-content %}} 

**Remarque** : Lors de l'utilisation de la ressource Datadog dans Azure pour envoyer des logs, les paramètres de diagnostic d'Entra ID doivent être définis manuellement.

#### Dépannage du transfert de logs Event Hub{#event-hub-log-forwarding-troubleshooting}
   
{{% collapse-content title="Vérifier si le fournisseur de ressources n'est pas enregistré" level="h5" expanded=false id="troubleshooting-logs-check-resource-provider-registration" %}}

Si le déploiement de votre modèle échoue en raison de l'erreur `The subscription is not registered to use namespace 'Microsoft.EventHub'` :

Azure dispose de fournisseurs de ressources pour chacun de ses services, tels que `Microsoft.EventHub` pour Azure Event Hubs. Si votre abonnement Azure n'est pas enregistré auprès d'un fournisseur de ressources requis, le script échoue. 

Remédiez à cela en vous enregistrant auprès du fournisseur de ressources approprié. Exécutez la commande d'exemple ci-dessous dans CloudShell, en remplaçant <RESOURCE_PROVIDER_NAME> par le nom du fournisseur de ressources (par exemple, `Microsoft.EventHub`).

{{< code-block lang="shell" >}}

az provider register --namespace <RESOURCE_PROVIDER_NAME>

{{< /code-block >}}
{{% /collapse-content %}} 

{{% collapse-content title="Vérifiez les valeurs DD_SITE et DD_API_KEY" level="h5" expanded=false id="troubleshooting-logs-check-site-and-api-key-eh" %}}
Si vous ne recevez aucun log, assurez-vous que :
   - Le [site Datadog sélectionné][33] est correct
   - La [clé d'API][9] configurée appartient à la bonne organisation Datadog

**Remarque** : si le site Datadog et la clé d'API ont été définis dans les paramètres de l'application de fonction, votre application peut redémarrer s'ils sont modifiés. 
{{% /collapse-content %}} 

{{% collapse-content title="Identifier les goulots d'étranglement potentiels d'Event Hub" level="h5" expanded=false id="troubleshooting-logs-check-event-hub-bottlenecks" %}}
Un pic de messages entrants accompagné d'une baisse des messages sortants suggère un goulot d'étranglement. Utilisez ces métriques pour enquêter :

Vérifier les messages entrants :
: `azure.eventhub_namespaces.incoming_messages`

Vérifier les données entrantes :
: `azure.eventhub_namespaces.incoming_bytes`

Vérifier les messages sortants :
: `azure.eventhub_namespaces.outgoing_messages`

Vérifier les données sortantes :
: `azure.eventhub_namespaces.outgoing_bytes`

Vérifier les requêtes limitées de Microsoft.EventHub :
: `azure.eventhub_namespaces.throttled_requests`

Vérifier les erreurs de serveur de Microsoft.EventHub :
: `azure.eventhub_namespaces.server_errors`

**Remarque** : L'augmentation des délais de journalisation peut entraîner une perte de données, car les [logs de plus de 18 heures][4] sont supprimés. 

Pour remédier au goulot d'étranglement, vous pouvez soit :

   - [Augmentez vos partitions Event Hub][26] pour gérer un débit plus élevé (maximum 32). Comme la mise à l'échelle sur place n'est disponible que pour les niveaux Premium ou Dédié, vous devez créer un nouveau Event Hub avec le nombre de partitions souhaité, puis reconfigurer ses paramètres de diagnostic et son déclencheur de transfert. Consultez le [support Azure][30] pour obtenir des conseils sur la mise à l'échelle. 
   - Divisez le transmetteur de logs en plusieurs pipelines dans Datadog, chacun traitant un sous-ensemble spécifique de ressources basé sur des règles telles que la priorité. Cela augmente le nombre de logs pouvant être traités simultanément.
{{% /collapse-content %}} 

{{% collapse-content title="Inspecter les métriques de fonction" level="h5" expanded=false id="inspect-function-metrics-eh" %}}
Assurez-vous que l'application de fonction s'exécute en examinant les métriques de fonction suivantes :

Vérifiez le nombre d'exécutions de la fonction :
: `azure.functions.function_execution_count`

Vérifiez que la fonction reçoit des données :
: `azure.functions.bytes_received`

Vérifiez que la fonction reçoit des données :
: `azure.functions.bytes_sent`

Vérifiez que les requêtes de la fonction renvoient des codes d'état de réussite :
: `azure.functions.http2xx`

Vérifiez que les requêtes de la fonction ne renvoient pas de codes d'état d'erreur :
: `azure.functions.http4xx`
: `azure.functions.http5xx`

**Remarques** : 
   - Le transmetteur de logs utilise le [modèle de programmation Azure Functions V4][35], qui est basé sur des packages et désactive la modification directe du code dans le portail Azure. Pour mettre à jour ou personnaliser une fonction qui a été configurée manuellement auparavant, contactez le [support Datadog][36] pour obtenir des instructions.
   - Pour une collecte de logs plus fiable, efficace et rentable, passez au [Forwarder de logs automatisé][37]. Il automatise entièrement le processus de transfert des logs de toutes vos ressources Azure vers Datadog.
{{% /collapse-content %}} 

## Surveillance de plusieurs inscriptions d'applications {#monitoring-multiple-app-registrations}

Les abonnements surveillés par plusieurs inscriptions d'applications peuvent introduire des configurations d'accès qui se chevauchent. Cette configuration n'est pas recommandée et peut entraîner des problèmes d'intégration ou des conflits système, et peut également augmenter vos coûts Azure Monitor.

## VM Azure hors tension dans la liste d'infrastructure {#powered-down-azure-vms-on-the-infrastructure-list}

Lorsque vous mettez vos VM hors tension dans Azure, l'intégration Azure de Datadog continue de collecter la métrique `azure.vm.status` pour cette VM. Cette métrique est marquée avec `status:running`, `status:not_running` ou `status:unknown`.

Ceci est intentionnel, mais entraîne le maintien de la VM dans votre liste d'infrastructures. Si votre VM rapporte uniquement cette métrique, elle n'est pas comptabilisée dans votre nombre de hosts facturables. Pour plus d'informations sur la facturation, consultez la [page de facturation][21] Datadog.

Si vous détruisez votre VM Azure, elle est retirée de votre liste d'infrastructure dans les 3 heures.

## Les VM Azure apparaissent dans l'application sans métriques {#azure-vms-appear-in-the-app-without-metrics}

Après avoir installé l'intégration Azure comme il se doit dans Datadog, vous commencerez à recevoir les métriques de vos VM Azure et d'autres services au bout de 15 minutes environ.

Si après ce délai, vos VM Azure sont affichées dans votre liste d'infrastructures, mais qu'aucune métrique n'est transmise, procédez aux vérifications suivantes.

1. Assurez-vous de rechercher les bonnes métriques.
    **Les métriques des machines virtuelles**Classic commencent par l'espace de noms azure.vm et les métriques des machines virtuelles déployées via ARM commencent par l'espace de noms `azure.compute_virtualmachines`.

2. Si aucun de ces espaces de noms ne renvoie de métriques, assurez-vous que **Diagnostics** est activé pour les machines virtuelles dans le portail Azure. Seuls les diagnostics de démarrage et les métriques de base sont requis.
    * Pour les VM **Classic** :
    {{< img src="integrations/guide/azure_vms_appearing_in_the_app_without_metrics/classic_vm.png" alt="Le portail Azure affichant la vue des diagnostics d'une machine virtuelle classique avec le statut défini sur activé" >}}

    * For ARM deployed VMs:
    {{< img src="integrations/guide/azure_vms_appearing_in_the_app_without_metrics/arm_deployed_vm.png" alt="Le portail Azure affichant la vue des paramètres de diagnostic d'une machine virtuelle avec le statut défini sur activé" >}}

3. Assurez-vous que la machine virtuelle est en cours d'exécution.
    L'intégration ne collecte pas de métriques de performance pour les machines arrêtées ou désallouées. Utilisez la métrique `azure.vm.count` et les valeurs de tag `status` de `running`, `stopped` et `stopped_deallocated` pour déterminer le statut de vos hosts. Assurez-vous que le host en question possède `status:running` et qu'il est en cours d'exécution dans le portail Azure.
    {{< img src="integrations/guide/azure_vms_appearing_in_the_app_without_metrics/azure_vm_running_2025-05-02.png" alt="Un graphique de la métrique azure.vm.count pour status:running" >}}

## Problèmes avec les métriques `azure.*.count` {#issues-with-azurecount-metrics}

Si votre intégration Azure rapporte des métriques mais pas `azure.*.count`, ou si `azure.*.count` renvoie `status:query_failed`, votre abonnement Azure doit enregistrer le fournisseur Azure Resource Health.

Si vous utilisez l'interface de ligne de commande Azure :

```bash
azure login # Login to the Azure user associated with your Datadog account
azure config mode arm
azure provider register Microsoft.ResourceHealth
```

La métrique `azure.*.count` devrait apparaître dans Datadog dans un délai de 5 à 10 minutes.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/integrations/azure/
[2]: https://www.datadoghq.com/blog/datadog-generated-metrics-azure/
[3]: https://learn.microsoft.com/azure/databricks/dev-tools/api/latest/aad/
[4]: /fr/logs/troubleshooting/#missing-logs---timestamp-outside-of-the-ingestion-window
[5]: /fr/logs/guide/azure-event-hub-log-forwarding
[6]: https://www.datadoghq.com/blog/introducing-azure-monitoring-with-one-click-datadog-deployment
[7]: /fr/integrations/guide/azure-native-integration/#agent-extensions
[8]: https://learn.microsoft.com/azure/azure-monitor/platform/diagnostic-settings?tabs=portal
[9]: /fr/account_management/api-app-keys/#api-keys
[10]: /fr/getting_started/integrations/azure/#install-the-agent-for-greater-visibility-into-your-application
[11]: /fr/integrations/azure_arc/
[12]: https://learn.microsoft.com/cli/azure/connectedmachine/extension
[13]: /fr/logs/guide/azure-event-hub-log-forwarding/
[14]: https://learn.microsoft.com/entra/identity/monitoring-health/howto-configure-diagnostic-settings
[15]: /fr/metrics/#time-aggregation
[16]: https://learn.microsoft.com/rest/api/monitor/metric-definitions/list?view=rest-monitor-2023-10-01
[17]: https://learn.microsoft.com/azure/azure-monitor/metrics/metrics-aggregation-explained#aggregation-types
[18]: https://portal.azure.com/#view/Microsoft_Azure_Monitoring/AzureMonitoringBrowseBlade/~/metrics
[19]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/blobs_logs_monitoring/index.js
[20]: /fr/logs/log_configuration/indexes/#set-daily-quota
[21]: /fr/account_management/billing/
[22]: /fr/metrics/guide/interpolation-the-fill-modifier-explained/
[23]: /fr/integrations/azure/
[24]: https://portal.azure.com
[25]: https://learn.microsoft.com/troubleshoot/azure/partner-solutions/log-limitations#check-diagnostic-settings-limit
[26]: https://learn.microsoft.com/azure/event-hubs/event-hubs-scalability
[27]: https://learn.microsoft.com/azure/azure-monitor/reference/metrics-index
[28]: /fr/metrics/#space-aggregation
[29]: /fr/logs/guide/azure-automated-log-forwarding/
[30]: https://azure.microsoft.com/support
[31]: https://app.datadoghq.com/metric/explorer
[32]: https://learn.microsoft.com/azure/azure-monitor/reference/tables/containerappconsolelogs
[33]: /fr/getting_started/site/#access-the-datadog-site
[34]: /fr/logs/explorer/search_syntax/
[35]: https://techcommunity.microsoft.com/blog/appsonazureblog/azure-functions-node-js-v4-programming-model-is-generally-available/3929217
[36]: /fr/help/
[37]: https://www.datadoghq.com/blog/azure-log-forwarding/
[38]: /fr/logs/log_configuration/indexes/#exclusion-filters