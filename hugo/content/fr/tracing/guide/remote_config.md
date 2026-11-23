---
description: Apprenez à configurer et à utiliser Remote Configuration pour gérer dynamiquement
  les paramètres du SDK sans redémarrer les applications.
further_reading:
- link: remote_configuration
  tag: Documentation
  text: Remote Configuration
site_support_id: tracing_remote_configuration
title: Mise en place de Remote Configuration pour le traçage
---
Ce guide couvre la configuration et l'utilisation de Remote Configuration avec vos SDK. Pour plus d'informations sur le fonctionnement de Remote Configuration, consultez [Remote Configuration][1].

## Prérequis {#prerequisites}

- [Datadog Agent][2] 7.47.0 ou version ultérieure installé sur vos hosts ou conteneurs.
- Mettez à niveau vos SDK vers une version compatible avec Remote Configuration. Pour plus d'informations, consultez la section [Options de configuration prises en charge][7].
- Assurez-vous que vos autorisations RBAC incluent [`org_management`][3], afin de pouvoir activer Remote Configuration pour votre organisation.
- Assurez-vous que vos autorisations RBAC incluent [`api_keys_write`][4], afin de pouvoir créer une nouvelle clé d'API dotée de la fonctionnalité Remote Configuration, ou ajouter cette fonctionnalité à une clé d'API existante. Contactez l'administrateur Datadog de votre organisation pour mettre à jour vos autorisations si vous ne les avez pas. Une clé dotée de cette fonctionnalité vous permet d'authentifier et d'autoriser votre Agent à utiliser Remote Configuration.
- Assurez-vous de disposer des `APM Remote Configuration Read` et `APM Remote Configuration Write` [autorisations][3].
  **Remarque** : Si vous ne disposez pas de ces autorisations, demandez à votre Datadog Admin de mettre à jour vos autorisations depuis les paramètres de votre organisation.

## Configurer Remote Configuration {#set-up-remote-configuration}

1. Assurez-vous que [Remote Configuration est activé pour votre organisation][5]. Cela permet aux composants Datadog de votre organisation de recevoir des configurations de la part de Datadog.
1. Sélectionnez une clé d'API existante ou créez-en une nouvelle, et activez la fonctionnalité Remote Configuration sur la clé si elle n'est pas déjà activée.

   {{<img src="agent/remote_config/RC_Key_updated.png" alt="Bouton « Activer » pour les propriétés de la clé d'API dotées de la fonctionnalité Remote Configuration." width="90%" style="center">}}
1. Redémarrez votre Agent.

## Vérifiez le statut de Remote Configuration des SDK {#review-remote-configuration-status-of-sdks}

Vous pouvez obtenir une visibilité sur le statut de Remote Configuration de vos SDK via l'[interface utilisateur de Remote Configuration][5].

Le tableau suivant décrit la signification de chaque état du SDK :

  | État du SDK| Description                                      |
  |------------------|--------------------------------------------------|
  | CONNECTÉ      | Le SDK est correctement connecté au service Remote Configuration via l'Agent associé. Il s'agit de l'état optimal dans lequel vous souhaitez que votre SDK se trouve pour Remote Configuration.                                               |
  | NON AUTORISÉ          | Le SDK est associé à un Agent qui ne dispose pas de l'autorisation `APM Remote Configuration Read` sur sa clé d'API. Pour résoudre ce problème, vous devez activer la fonctionnalité Remote Configuration sur la clé d'API utilisée par l'Agent associé au SDK.|
  | ERREUR DE CONNEXION        |   Le SDK déployé dans votre environnement est associé à un Agent dont le paramètre `remote_config.enabled` est défini sur true dans son fichier de configuration `datadog.yaml`, cependant, l'Agent est introuvable dans le service Remote Configuration. La cause la plus probable est que l'Agent associé est incapable d'atteindre les [endpoints][6] de Remote Configuration. Pour résoudre ce problème, vous devez autoriser l'accès HTTPS sortant vers les endpoints de Remote Configuration depuis votre environnement.
  | DÉSACTIVÉ       |   Le SDK déployé dans votre environnement est associé à un Agent dont le paramètre `remote_config.enabled` est défini sur false dans son fichier de configuration `datadog.yaml`. Cela peut être défini délibérément ou par erreur. Pour activer Remote Configuration sur l'Agent associé, définissez `remote_config.enabled` sur true.  |
  | NON CONNECTÉ       | Le SDK est introuvable dans le service Remote Configuration et est associé à un Agent dont le paramètre `remote_config.enabled` peut être défini sur true ou false dans son fichier de configuration `datadog.yaml`. Vérifiez la configuration de votre Agent local ou vos paramètres de proxy.|
  | AGENT NON PRIS EN CHARGE   | Le SDK est associé à un Agent qui ne prend pas en charge Remote Configuration. Pour résoudre ce problème, mettez à jour le logiciel de l'Agent associé vers la dernière version disponible. |
  | NON DÉTECTÉ   | Le SDK ne prend pas en charge Remote Configuration. Pour résoudre ce problème, mettez à jour le logiciel du SDK vers la dernière version disponible. |
  | INCONNU   | L'état du SDK est inconnu, et il est impossible de déterminer si un Agent est associé au SDK. Par exemple, cela peut être dû au fait que l'Agent est déployé sur un service de conteneurs serverless entièrement géré comme AWS Fargate. |

## Désactivation de Remote Configuration pour Fleet Automation {#opting-out-of-remote-configuration-for-fleet-automation}

Vous pouvez désactiver les fonctionnalités Remote Configuration :
- au niveau de la clé d'API
- au niveau de l'Agent
- au niveau de l'organisation (**non recommandé**)

### Au niveau de la clé d'API {#at-the-api-key-level}

Désactivez la clé d'API de votre choix sur la page [Clés d'API][8]. Vous avez besoin de l'autorisation [`api_keys_write`][4] pour désactiver Remote Configuration sur une clé d'API.

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

[101]: /fr/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
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
1. Accédez à la page des paramètres [Remote Configuration][5].
1. Cliquez sur {{< ui >}}Disable{{< /ui >}}.
1. Lorsque le message d'avertissement s'affiche, cliquez à nouveau sur {{< ui >}}Disable{{< /ui >}}.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/remote_configuration
[2]: /fr/agent/
[3]: /fr/account_management/rbac/permissions/
[4]: /fr/account_management/rbac/permissions#api-and-application-keys
[5]: https://app.datadoghq.com/organization-settings/remote-config
[6]: /fr/agent/configuration/network
[7]: /fr/tracing/trace_collection/runtime_config/#supported-configuration-options
[8]: https://app.datadoghq.com/organization-settings/api-keys