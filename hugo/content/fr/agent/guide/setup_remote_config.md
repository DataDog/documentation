---
description: Configurez Remote Configuration avec Fleet Automation pour activer les
  Agent flares, les mises à niveau à distance et la gestion centralisée de la configuration.
disable_toc: false
further_reading:
- link: /remote_configuration
  tag: Documentation
  text: En savoir plus sur Remote Configuration
- link: /agent/fleet_automation
  tag: Documentation
  text: Fleet Automation
- link: /infrastructure/list/#agent-configuration
  tag: Documentation
  text: En savoir plus sur la vue de configuration de l'Agent
- link: https://www.datadoghq.com/blog/fleet-automation/
  tag: Blog
  text: Gouvernez de manière centralisée et gérez à distance les agents Datadog à
    grande échelle avec Fleet Automation
title: Remote Configuration pour Fleet Automation
---
Cette page explique comment configurer et utiliser {{< tooltip glossary="remote_configuration" case="title" >}} avec [Fleet Automation][11]. Les fonctionnalités Fleet Automation suivantes nécessitent Remote Configuration :
| Fonctionnalité | Description | Version minimale de l'Agent |
|---------|-------------|------------------------|
| **[Agent flares][9]** | Envoyez un flare depuis le site Datadog à l'aide de Fleet Automation | 7.47+<br>7.66+ recommandé |
| **[Agent upgrades][10]** | Mettez à niveau vos Agents à distance | Linux : 7.69.0+<br>Windows : 7.71.1+ |
| **[Agent configuration][13]** | Configurez vos Agents à distance | 7.73+ |

Datadog recommande de mettre régulièrement à niveau vos Agents pour vous assurer d'avoir accès aux dernières fonctionnalités.

## Prérequis {#prerequisites}

- Vérifiez que chaque Agent respecte les exigences minimales de version et de plateforme pour la fonctionnalité que vous souhaitez utiliser. Consultez [Upgrade Agents][10] et [Configure Agents][13].
- Assurez-vous que vos autorisations RBAC incluent [`org_management`][1] afin de pouvoir activer Remote Configuration pour votre organisation.
- Assurez-vous que vos autorisations RBAC incluent [`api_keys_write`][2] afin de pouvoir créer une nouvelle clé d'API dotée de la capacité Remote Configuration ou d'ajouter cette capacité à une clé d'API existante. Contactez l'administrateur Datadog de votre organisation pour mettre à jour vos autorisations si vous ne les avez pas. Une clé dotée de cette fonctionnalité vous permet d'authentifier et d'autoriser votre Agent à utiliser Remote Configuration.

## Activer Remote Configuration {#enable-remote-configuration}

Dans la plupart des cas, Remote Configuration est activé par défaut pour votre organisation. Vous pouvez vérifier si Remote Configuration est activée pour votre organisation depuis la page des paramètres [Remote Configuration][3]. Si vous devez l'activer :
1. Assurez-vous que vos autorisations RBAC incluent [`org_management`][1] afin de pouvoir activer Remote Configuration pour votre organisation.
1. Depuis la page Organization Settings, activez [Remote Configuration][3]. Cela permet aux composants Datadog de votre organisation de recevoir des configurations de la part de Datadog.

## Activer la gestion à distance des Agents {#enable-remote-agent-management}

Pour mettre à niveau ou configurer à distance des Agents sur des VM Linux ou Windows, activez Remote Configuration et définissez `remote_updates` sur `true` sur chaque Agent cible. Remote Configuration permet à l'Agent de recevoir une configuration de Datadog. Le paramètre `remote_updates` permet les mises à niveau à distance et les modifications de configuration de l'Agent.

À partir de la version 7.73.0 de l'Agent, `remote_updates` est défini par défaut sur `true`. Sur les versions prises en charge antérieures, définissez-le explicitement sur `true`.

1. Activez Remote Configuration pour votre organisation et [pour la clé d'API de l'Agent](#enable-remote-configuration-on-the-api-key).
1. Dans le [fichier de configuration][16] de l'Agent, activez les paramètres suivants. `remote_updates` est un paramètre de niveau supérieur :

   ```yaml
   remote_configuration:
     enabled: true

   remote_updates: true
   ```

   Vous pouvez également définir `DD_REMOTE_CONFIGURATION_ENABLED=true` et `DD_REMOTE_UPDATES=true` dans l'environnement utilisé par le service de l'Agent.
1. [Redémarrez l'Agent][14] pour appliquer les modifications.
1. Dans Fleet Automation, ouvrez le panneau latéral de l'Agent et vérifiez son statut **Remote Agent Management**. Si la gestion à distance reste indisponible, consultez [Dépanner la gestion à distance des Agents](#troubleshoot-remote-agent-management).

## Statut Remote Configuration de l'Agent {#agent-remote-configuration-status}

Vous pouvez consulter le statut Remote Configuration de votre Agent dans l'[interface Remote Configuration][3].

Le tableau suivant décrit la connectivité à Remote Configuration. Fleet Automation affiche également un statut **Remote Agent Management** distinct. Un Agent peut être **CONNECTED** à Remote Configuration alors que la gestion à distance est **NOT ENABLED**. Pour activer les mises à niveau et les modifications de configuration sur les VM, consultez [Activer la gestion à distance des Agents](#enable-remote-agent-management).

  | Statut de l'Agent     | Description                                      |
  |------------------|--------------------------------------------------|
  | CONNECTED      | L'Agent déployé dans votre environnement peut joindre Datadog, s'y authentifier et obtenir les autorisations nécessaires. Il s'agit de l'état optimal pour vos Agents en matière de Remote Configuration.                                               |
  | UNAUTHORIZED          | L'Agent déployé dans votre environnement peut joindre Datadog, mais ne peut pas s'y authentifier ni obtenir les autorisations nécessaires au fonctionnement de Remote Configuration. La cause la plus probable est que la clé d'API utilisée par l'Agent ne dispose pas de la capacité Remote Configuration. Pour résoudre le problème, activez la capacité Remote Configuration sur la clé d'API utilisée par l'Agent.                                                 |
  | CONNECTION ERROR        |   Dans le fichier de configuration `datadog.yaml` de l'Agent déployé dans votre environnement, `remote_configuration.enabled` est défini sur true, mais l'Agent est introuvable dans le service Remote Configuration. La cause la plus probable est que l'Agent ne peut pas atteindre les [endpoints][4] de Remote Configuration. Pour résoudre le problème, autorisez l'accès HTTPS sortant aux endpoints de Remote Configuration depuis votre environnement. Ce statut s'affiche lorsque la version de l'Agent est `7.45.0` ou supérieure.
  | DISABLED       |   Dans le fichier de configuration `datadog.yaml` de l'Agent déployé dans votre environnement, le paramètre `remote_configuration.enabled` est défini sur false. Définissez `remote_configuration.enabled` sur true si vous souhaitez activer Remote Configuration sur l'Agent. Ce statut s'affiche lorsque la version de l'Agent est `7.45.0` ou supérieure. |
  | NOT CONNECTED       | L'Agent est introuvable dans le service Remote Configuration et le paramètre `remote_configuration.enabled` peut être défini sur true ou false dans son fichier de configuration `datadog.yaml`. Vérifiez la configuration de votre Agent local ou vos paramètres de proxy. Ce statut s'affiche lorsque la version de l'Agent est supérieure à `7.41.1` mais inférieure à `7.45.0`.            |
  | UNSUPPORTED AGENT   | L'Agent utilise une version qui n'est pas compatible avec Remote Configuration. Pour résoudre ce problème, mettez à jour l'Agent vers la dernière version disponible. |

## Désactivation de Remote Configuration pour Fleet Automation {#opting-out-of-remote-configuration-for-fleet-automation}

Vous pouvez désactiver les fonctionnalités Remote Configuration :
- au niveau de la clé d'API
- au niveau de l'Agent
- au niveau de l'organisation (**non recommandé**)

### Au niveau de la clé d'API {#at-the-api-key-level}

Désactivez la clé d'API de votre choix sur la page [API Keys][5]. Vous avez besoin de l'autorisation [`api_keys_write`][2] pour désactiver Remote Configuration sur une clé d'API.

### Au niveau de l'Agent {#at-the-agent-level}

À partir de la version 7.47.0 de l'Agent, `remote_configuration.enabled` est défini sur `true` par défaut dans l'Agent. Ce paramètre amène l'Agent à demander des mises à jour de configuration au site Datadog.

Si vous ne souhaitez pas que votre Agent envoie des demandes de configuration à Datadog, vous pouvez définir `remote_configuration.enabled` sur `false` dans l'Agent.

{{< tabs >}}
{{% tab "Fichier YAML de configuration" %}}
Modifiez `remote_configuration.enabled` de `true` à `false` dans votre [fichier YAML de configuration][101] :

```yaml
remote_configuration:
  enabled: false
```

[101]: /fr/agent/configuration/agent-configuration-files/?tab=agentv6v7#main-configuration-file
{{% /tab %}}
{{% tab "Variable d'environnement" %}}
Ajoutez ce qui suit à votre manifeste de Datadog Agent :

```yaml
DD_REMOTE_CONFIGURATION_ENABLED=false
```

{{% /tab %}}
{{% tab "Helm" %}}
Ajoutez ce qui suit à votre chart Helm :

```yaml
datadog:
  remoteConfiguration:
    enabled: false
```

{{% /tab %}}
{{< /tabs >}}

### Au niveau de l'organisation {#at-the-organization-level}

<div class="alert alert-warning"><strong>Datadog ne recommande pas de désactiver Remote Configuration au niveau de l'organisation. La désactivation de Remote Configuration au niveau de l'organisation empêche les composants Datadog de plusieurs produits de votre organisation de recevoir des configurations de la part de Datadog.</strong></div>

Pour désactiver Remote Configuration au niveau de l'organisation :
1. Assurez-vous de disposer de l'autorisation `org_management` requise.
1. Accédez à la page des paramètres [Remote Configuration][3]. 
1. Cliquez sur {{< ui >}}Disable{{< /ui >}}. 
1. Lorsque le message d'avertissement s'affiche, cliquez à nouveau sur {{< ui >}}Disable{{< /ui >}}.

## Dépannage {#troubleshooting}

Si vous rencontrez des problèmes lors de l'utilisation de Remote Configuration avec vos Agents, suivez les consignes de dépannage ci-dessous. Si vous avez besoin d'une assistance supplémentaire, contactez le [support Datadog][6].

### Dépanner la gestion à distance des Agents {#troubleshoot-remote-agent-management}

Si le panneau latéral de l'Agent affiche **Remote Agent Management: NOT ENABLED**, vérifiez que `remote_updates` est activé dans la configuration effective.

Si la gestion à distance reste indisponible, vérifiez :

- Les exigences de version et de plateforme pour les [mises à niveau de l'Agent][10] ou la [configuration de l'Agent][13].
- La [connectivité à Remote Configuration](#agent-remote-configuration-status) de l'Agent.
- Si Datadog Installer est en cours d'exécution.

### Redémarrez l'Agent {#restart-the-agent}

Une fois la configuration de l'Agent mise à jour dans le fichier [`datadog.yaml`][16], redémarrez l'Agent pour que la modification prenne effet.

### Assurez-vous que les endpoints Datadog Remote Configuration sont accessibles depuis votre environnement {#ensure-datadog-remote-configuration-endpoints-are-reachable-from-your-environment}

Pour utiliser Remote Configuration, l'Agent déployé dans votre environnement doit avoir accès aux [endpoints][4] Datadog Remote Configuration. Pour établir une connexion réseau privée entre votre environnement et Datadog, vous pouvez également vous connecter aux [endpoints][7] Remote Configuration Virtual Private Cloud. Assurez-vous que les connexions HTTPS sortantes depuis votre environnement peuvent atteindre les endpoints de Remote Configuration. Si vous disposez également d'un proxy entre Datadog et votre environnement, mettez à jour vos [paramètres de proxy][8] pour inclure les endpoints de Remote Configuration.

### Activez Remote Configuration sur la clé d'API {#enable-remote-configuration-on-the-api-key}

Pour authentifier et autoriser l'Agent à recevoir une configuration, activez Remote Configuration sur la clé d'API concernée. Seuls les utilisateurs disposant de l'autorisation RBAC [`api_keys_write`][2] peuvent activer Remote Configuration sur la clé d'API.

**Remarque :** Si vous disposez de l'autorisation RBAC [`api_keys_write`][2], mais pas des autorisations Remote Configuration au niveau [Organization][3], vous ne pouvez pas activer Remote Configuration sur une clé d'API nouvelle ou existante. Vous avez uniquement l'autorisation de désactiver Remote Configuration sur une clé d'API existante.

[1]: /fr/account_management/rbac/permissions#access-management
[2]: /fr/account_management/rbac/permissions#api-and-application-keys
[3]: https://app.datadoghq.com/organization-settings/remote-config
[4]: /fr/agent/configuration/network
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /fr/help/
[7]: /fr/agent/guide#cloud-infrastructure-guides
[8]: /fr/agent/configuration/proxy/
[9]: /fr/agent/troubleshooting/send_a_flare/#send-a-flare-from-the-datadog-site
[10]: /fr/agent/fleet_automation/upgrade_agents/
[11]: /fr/agent/fleet_automation/
[13]: /fr/agent/fleet_automation/configure_agents/
[14]: /fr/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[16]: /fr/agent/configuration/agent-configuration-files/#main-configuration-file

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}