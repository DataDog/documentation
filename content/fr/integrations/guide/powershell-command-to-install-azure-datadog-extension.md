---
aliases:
- /fr/integrations/faq/powershell-command-to-install-azure-datadog-extension
further_reading:
- link: https://www.datadoghq.com/blog/migrate-to-azure-with-the-microsoft-cloud-adoption-framework/
  tag: Blog
  text: Migrer vers Azure avec le Cloud Adoption Framework de Microsoft et Datadog
- link: https://www.datadoghq.com/blog/azure-arc-integration/
  tag: Blog
  text: Surveillez votre infrastructure hybride Azure Arc avec Datadog
kind: guide
title: Commandes pour installer l'extension Azure Datadog
---

## Installation sur Azure

Datadog propose une extension Azure pour faciliter le déploiement de lʼAgent sur les instances dʼAzure :

* [Introducing Azure monitoring with one-click Datadog deployment][1] (en anglais)
* [Azure Native integration][2] _US3 only_ (en anglais)
* [Intégration standard Azure][7] _Tous les sites_

Une alternative à l'installation par l'interface graphique est la ligne de commande.
Pour exécuter l'Agent Datadog sous forme dʼextension dans vos instances Azure, utilisez la commande correspondant à votre environnement. Remplacez `<SITE_PARAMETER>` par la valeur du **paramètre site** de votre compte Datadog dans la [page des sites Datadog][3], et `<DATADOG_API_KEY>` par votre [clé dʼAPI Datadog][4].

{{< tabs >}}
{{% tab "Windows" %}}

{{< code-block lang="powershell" >}}
Set-AzVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "5.0" -Settings @{"site" = "<SITE_PARAMETER>"; "agentVersion" = "latest"} -ProtectedSettings @{"api_key" = "<DATADOG_API_KEY>"} -DisableAutoUpgradeMinorVersion
{{< /code-block >}}

Pour plus d'informations sur la syntaxe des extensions d'instances Azure, consultez la [documentation relative à lʼextension Azure Set-AzVMExtension][1].

L'extension Azure peut accepter des paramètres normaux et des paramètres protégés.

Les paramètres normaux comprennent :

| Variable | Type | Description  |
|----------|------|--------------|
| `site` | Chaîne | Définit le site d'admission Datadog, par exemple `SITE=`{{< region-param key="dd_site" code="true" >}}. |
| `agentVersion` | Chaîne | La version de lʼAgent à installer, en suivant le format `x.y.z` ou `latest` |
| `agentConfiguration` | URI | (facultatif) Url vers le blob Azure contenant la configuration de lʼAgent au format zip. |
| `agentConfigurationChecksum` | Chaîne | Le checksum SHA256 du fichier zip de la configuration de lʼAgent, obligatoire si `agentConfiguration` est spécifié. |

Les paramètres protégés comprennent :

| Variable | Type | Description  |
|----------|------|--------------|
| `api_key`| Chaîne | Ajoute la clé d'API Datadog au fichier de configuration. |

**Remarque** : si `agentConfiguration` et `api_key` sont spécifiés en même temps, la clé dʼAPI trouvée dans `agentConfiguration` est prioritaire. Notez également que si une clé dʼAPI est définie sur la machine cible, il n'est pas possible de la modifier avec `Set-AzVMExtension`.

### Spécifier un URI de configuration
Cet exemple montre comment indiquer une configuration à utiliser par lʼAgent Datadog.
L'URI de configuration de lʼAgent Datadog doit être un URI de stockage de blob Azure.
L'extension Windows Azure de lʼAgent Datadog vérifiera que l'URI `agentConfiguration` provient du domaine `.blob.core.windows.net`.
La configuration de lʼAgent Datataog doit être créée à partir du dossier `%PROGRAMDATA%\Datadog`.

{{< code-block lang="powershell" >}}
Set-AzVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "5.0" -Settings @{"site" = "<SITE_PARAMETER>"; "agentConfiguration" = "https://<CONFIGURATION_BLOB>.blob.core.windows.net/<FILE_PATH>.zip"; "agentConfigurationChecksum" = "<SHA256_CHECKSUM>"} -DisableAutoUpgradeMinorVersion
{{< /code-block >}}

**Remarque** : une fois que lʼAgent Datadog est installé, la configuration ne peut plus être modifiée que lors d'une mise à niveau vers une version plus récente.

### Définir une version spécifique de lʼAgent
Cet exemple montre comment indiquer la version de lʼAgent à installer. Par défaut, l'extension Windows Azure de lʼAgent Datadog installe la dernière version de lʼAgent Datadog.

**Remarque** : les rétrogradations ne sont *pas* prises en charge, il n'est donc pas possible d'installer une version de lʼAgent Datadog *antérieure* à celle qui est actuellement installée sur la machine cible. Pour installer une version antérieure de lʼAgent Datadog, désinstallez d'abord la version précédente en supprimant lʼextension Windows Azure de lʼAgent Datadog sur la machine cible. La suppression de lʼextension Windows Azure de lʼAgent Datadog nʼentraîne pas celle de la configuration de lʼAgent Datadog.

{{< code-block lang="powershell" >}}
Set-AzVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "5.0" -Settings @{"site" = "<SITE_PARAMETER>"; "agentVersion" = "latest"} -ProtectedSettings @{"api_key" = "<DATADOG_API_KEY>"} -DisableAutoUpgradeMinorVersion
{{< /code-block >}}

[1]: https://learn.microsoft.com/en-us/powershell/module/az.compute/set-azvmextension
{{% /tab %}}
{{% tab "Linux" %}}

{{< code-block lang="bash" >}}
az vm extension set --publisher "Datadog.Agent" --name "DatadogLinuxAgent" --version 7.0 --settings '{"site":"datadoghq.com", "agentVersion":"latest"}' --protected-settings '{"api_key":"<DATADOG_API_KEY>"}' --no-auto-upgrade-minor-version
{{< /code-block >}}
Pour en savoir plus sur la syntaxe à utiliser pour définir les extensions de lʼinstance Azure, consultez la [référence CLI de lʼextension Azure][1].

L'extension Azure peut accepter des paramètres normaux et des paramètres protégés.

Les réglages normaux comprennent :

| Variable | Type | Rôle  |
|----------|------|--------------|
| `site` | Chaîne | Définit le site d'admission Datadog, par exemple `SITE=`{{< region-param key="dd_site" code="true">}} |
| `agentVersion` | Chaîne | La version de lʼAgent à installer, en suivant le format `x.y.z` ou `latest` |
| `agentConfiguration` | URI | (facultatif) URI vers le blob Azure contenant la configuration de lʼAgent au format zip. |
| `agentConfigurationChecksum` | Chaîne | Le checksum SHA256 du fichier zip de la configuration de lʼAgent, obligatoire si `agentConfiguration` est spécifié. |

Les paramètres protégés comprennent :

| Variable | Type | Rôle  |
|----------|------|--------------|
| `api_key`| Chaîne | Ajoute la clé d'API Datadog au fichier de configuration. |

**Remarque** : si `agentConfiguration` et `api_key` sont spécifiés en même temps, la clé dʼAPI trouvée dans `agentConfiguration` est prioritaire. Si une clé dʼAPI est définie sur la machine cible, il n'est pas possible de la modifier avec le réglage `Set-AzVMExtension`.

### Spécifier un URI de configuration
Cet exemple montre comment indiquer une configuration à utiliser par lʼAgent Datadog.
- L'URI de configuration de lʼAgent Datadog doit être un URI de stockage de blob Azure.
- L'extension Linux Azure de lʼAgent Azure vérifie que l'URI `agentConfiguration` provient du domaine `.blob.core.windows.net`.
- La configuration de l'Agent Datadog doit être créée à partir du dossier `/app/.apt/etc/datadog-agent`.

{{< code-block lang="bash" >}}
az vm extension set --publisher "Datadog.Agent" --name "DatadogLinuxAgent" --version 7.0 --settings '{"site":"datadoghq.com", "agentVersion":"latest", "agentConfiguration":"https://<CONFIGURATION_BLOB>.blob.core.windows.net/<FILE_PATH>.zip", "agentConfigurationChecksum":"<SHA256_CHECKSUM>"}' --protected-settings '{"api_key":"<DATADOG_API_KEY>"}' --no-auto-upgrade-minor-version
{{< /code-block >}}


[1]: https://learn.microsoft.com/en-us/cli/azure/vm/extension
{{% /tab %}}
{{< /tabs >}}

## Installation sur Azure Arc

Pour exécuter lʼAgent Datadog dans vos instances [Azure Arc][5] en tant qu'extension, utilisez la commande qui correspond à votre environnement.

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

Pour plus d'informations sur la syntaxe à utiliser pour définir les extension Azure `connectedmachine`, accédez à la page [de lʼextension az connectedmachine][6].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/introducing-azure-monitoring-with-one-click-datadog-deployment
[2]: /fr/integrations/guide/azure-native-manual-setup/#deploy-the-datadog-agent
[3]: /fr/getting_started/site/#access-the-datadog-site
[4]: /fr/account_management/api-app-keys/#api-keys
[5]: /fr/integrations/azure_arc/
[6]: https://learn.microsoft.com/en-us/cli/azure/connectedmachine/extension
[7]: /fr/integrations/guide/azure-manual-setup/#agent-installation