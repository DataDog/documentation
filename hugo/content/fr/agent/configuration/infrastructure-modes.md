---
algolia:
  tags:
  - infrastructure modes
description: Modifiez le comportement de l'Agent pour contrôler dans quelle mesure
  le Datadog Agent effectue la surveillance de l'infrastructure sur un host.
further_reading:
- link: /agent/configuration/agent-configuration-files/
  tag: Guide
  text: Fichiers de configuration de l'Agent
- link: /agent/guide/upgrade/
  tag: Guide
  text: Mettez à niveau votre Datadog Agent
private: true
title: Modes d'infrastructure
---
## Présentation {#overview}

Les modes d'infrastructure déterminent les capacités de surveillance de l'infrastructure que le Datadog Agent active sur un host. Utilisez ces modes pour adapter le comportement de l'Agent au rôle du host : surveillance complète de l'infrastructure, métriques de ressources système de base, aucune surveillance de l'infrastructure ou surveillance de l'appareil de l'utilisateur final.

## Modes disponibles {#available-modes}

L'Agent prend en charge quatre modes d'infrastructure. Une coche ({{< X >}}) indique que la capacité est disponible dans ce mode.

| Capacité | [Complète](#full) (par défaut) | [De base](#basic) | [Appareil utilisateur final](#end-user-device) | [Aucun](#none) |
|------------|-------------------------|-----------------|-------------------------------------|---------------|
| Métriques de ressources système | {{< X >}} | {{< X >}} | {{< X >}} | |
| Intégrations d'infrastructure | {{< X >}} (toutes) | {{< X >}} ([ensemble limité](#basic)) | {{< X >}} | |
| Container Monitoring | {{< X >}} | | | |
| Live Processes | {{< X >}} | | {{< X >}} | |
| Checks personnalisés et intégrations de logs uniquement | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Métriques personnalisées | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Visible dans les dashboards d'infrastructure | {{< X >}} | {{< X >}} | | |

### Complet {#full}

`full`
: **Par défaut**: Oui<br>
**Version minimale de l'Agent**: 7.73.0<br>
**Recommandé pour**: La plupart des cas d'utilisation<br>
: L'Agent collecte des métriques de ressources système et des données de processus, exécute toutes les intégrations d'infrastructure et prend en charge Container Monitoring et Live Processes. Si vous n'avez pas défini de valeur `infrastructure_mode`, l'Agent s'exécute en mode `full`.

### De base {#basic}

`basic`
: **Version minimale de l'Agent** : 7.73.0 (Linux, macOS), 7.76.2 (Windows)<br>
**Recommandé pour** : VM et serveurs physiques qui nécessitent uniquement des métriques de ressources système<br>
: L'Agent collecte des métriques de ressources système (CPU, mémoire, disque, réseau) ainsi que des données limitées sur les processus et les services. Seules les intégrations suivantes sont exécutées :
  - [Cisco ACI][25] (7.78+)
  - [Cisco SD-WAN][26] (7.78+)
  - [Annuaire][3] (7.80+)
  - [Disque][2]
  - [Réseau][4]
  - [NTP][5]
  - [Processus][6]
  - [SNMP][28] (7.78+)
  - [Check du système][1]
  - [Systemd][7]
  - [Versa][27] (7.78+)
  - [Magasin de certificats Windows][8] (7.80+)
  - [Détection de plantage Windows][9]
  - [Windows Event Log][17]
  - [Mémoire noyau Windows][10]
  - [Compteurs de performance Windows][11] (7.80+)
  - [Registre Windows][12] (7.80+)
  - [Services Windows][13]
  - [Check WMI][14] (7.80+)
  - [Checks personnalisés][15] préfixés par `custom_`

### Appareil de l'utilisateur final {#end-user-device}

<div class="alert alert-info">Le mode Appareil de l'utilisateur final est en préversion. Pour les étapes de configuration et pour demander l'accès, consultez <a href="/infrastructure/end_user_device_monitoring/">End User Device Monitoring</a>.</div>

`end_user_device`
: **Version minimale de l'Agent**: 7.76.2<br>
**Recommandé pour**: Ordinateurs de bureau, ordinateurs portables et stations de travail des employés<br>
: L'Agent inclut toutes les fonctionnalités du [mode complet](#full) à l'exception de Container Monitoring, ainsi que les éléments suivants.
  - Surveillance des performances des appareils
  - Collecte des logs
  - Surveillance Wi-Fi
  - Détection de plantage Windows
  - Surveillance du chemin réseau

: Pour des descriptions complètes, consultez [Fonctionnalités clés][18].

### Aucun {#none}

`none`
: **Version minimale de l'Agent** : 7.77.0<br>
**Recommandé pour** : Hosts configurés uniquement pour [Log Management][19], [APM][20] ou [Error Tracking][21]<br>
: L'Agent ne collecte aucune métrique d'infrastructure et n'exécute aucune intégration d'infrastructure. Vous pouvez toujours utiliser des métriques personnalisées, des [checks personnalisés][15] préfixés par `custom_`, et des intégrations basées uniquement sur les logs telles que [journald][16] ou [Windows Event Log][17].
: Les hosts en mode `none` apparaissent dans [Fleet Automation][22] sous l'onglet {{< ui >}}View Agents{{< /ui >}} car l'Agent continue d'envoyer des métadonnées à Datadog. Cependant, ces hosts n'apparaissent pas dans les dashboards d'infrastructure ou les requêtes qui reposent sur des métriques d'infrastructure.

## Configurer le mode d'infrastructure de l'Agent {#configure-agent-infrastructure-mode}

### Nouveaux hosts {#new-hosts}

Pour configurer le mode d'infrastructure lors de l'installation de l'Agent pour la première fois, définissez la variable d'environnement `DD_INFRASTRUCTURE_MODE=<MODE>` avant d'appeler le script d'installation :

{{< tabs >}}
{{% tab "Linux" %}}
Dans la commande suivante, remplacez `<API_KEY>` par la [clé d'API Datadog](https://app.datadoghq.com/organization-settings/api-keys) de votre organisation, `<DD_SITE>` par **{{< region-param key="dd_site" >}}**, et `<MODE>` par `full`, `basic`, `end_user_device` ou `none` :

```shell
DD_API_KEY="<API_KEY>" \
DD_SITE="<DD_SITE>" \
DD_INFRASTRUCTURE_MODE="<MODE>" \
bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```
{{% /tab %}}
{{% tab "Windows" %}}
Dans la commande suivante, remplacez `<API_KEY>` par la [clé d'API Datadog](https://app.datadoghq.com/organization-settings/api-keys) de votre organisation, `<DD_SITE>` par **{{< region-param key="dd_site" >}}**, et `<MODE>` par `full`, `basic`, `end_user_device` ou `none` :

```powershell
$p = Start-Process -Wait -PassThru msiexec -ArgumentList '/qn /i "https://windows-agent.datadoghq.com/datadog-agent-7-latest.amd64.msi" /log C:\Windows\SystemTemp\install-datadog.log APIKEY="<API_KEY>" SITE="<DD_SITE>" DD_INFRASTRUCTRURE_MODE="<MODE>"'
if ($p.ExitCode -ne 0) {
  Write-Host "msiexec failed with exit code $($p.ExitCode) please check the logs at C:\Windows\SystemTemp\install-datadog.log" -ForegroundColor Red
}
```
{{% /tab %}}
{{< /tabs >}}

### Hosts existants {#existing-hosts}

Pour définir le mode d'infrastructure pour un host existant :

1. Ouvrez le [fichier de configuration de l'Agent][23] et ajoutez `infrastructure_mode` au niveau racine. Remplacez `<MODE>` par `full`, `basic`, `end_user_device` ou `none`.

    {{< code-block lang="yaml" filename="datadog.yaml" disable_copy="true"
      collapsible="true" >}}
infrastructure_mode: <MODE>
    {{< /code-block >}}

2. [Redémarrez le Datadog Agent][24].

## Vérifiez le mode d'infrastructure {#verify-infrastructure-mode}

Pour vérifier le mode d'infrastructure défini sur vos hosts :

1. Accédez à [Fleet Automation][22] et cliquez sur l'onglet {{< ui >}}View Agents{{< /ui >}}.
1. Sélectionnez {{< ui >}}Infrastructure Mode{{< /ui >}} dans le menu déroulant {{< ui >}}Group by{{< /ui >}}.
1. Cliquez sur un groupe de mode pour le développer et voir les hosts qu'il contient.
1. Optionnellement, utilisez la barre de recherche pour filtrer par nom de host spécifique (par exemple, `hostname:worker1`).

{{< img src="agent/configuration/fa_group_by_infra_mode-1.png" alt="Page Fleet Automation View Agents avec Infrastructure Mode sélectionné dans le menu déroulant Group by, affichant le groupe Full développé avec 311 hosts et des colonnes pour nom de host, Agent, OTEL, intégrations, services et statut de la configuration à distance." style="width:90%" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/system/
[2]: /fr/integrations/disk/
[3]: /fr/integrations/directory/
[4]: /fr/integrations/network/
[5]: /fr/integrations/ntp/
[6]: /fr/integrations/process/
[7]: /fr/integrations/systemd/
[8]: /fr/integrations/windows-certificate/
[9]: /fr/integrations/wincrashdetect/
[10]: /fr/integrations/winkmem/
[11]: /fr/integrations/windows-performance-counters/
[12]: /fr/integrations/windows-registry/
[13]: /fr/integrations/windows-service/
[14]: /fr/integrations/wmi/
[15]: /fr/extend/custom_checks/
[16]: /fr/integrations/journald/
[17]: /fr/integrations/event-viewer/
[18]: /fr/infrastructure/end_user_device_monitoring/#key-capabilities
[19]: /fr/logs/
[20]: /fr/tracing/
[21]: /fr/error_tracking/
[22]: https://app.datadoghq.com/fleet
[23]: /fr/agent/configuration/agent-configuration-files/
[24]: /fr/agent/configuration/agent-commands/#restart-the-agent
[25]: /fr/integrations/cisco-aci/
[26]: /fr/integrations/cisco-sdwan/
[27]: /fr/integrations/versa/
[28]: /fr/integrations/snmp/