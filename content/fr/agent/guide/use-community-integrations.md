---
aliases:
- /fr/agent/guide/community-integrations-installation-with-docker-agent
description: Guide d'installation et de configuration pour les intégrations développées
  par la communauté et celles du Marketplace avec l'Agent Datadog dans différents
  environnements.
further_reading:
- link: /agent/troubleshooting/
  tag: Documentation
  text: Dépannage de l'Agent
- link: /developers/integrations/agent_integration
  tag: Documentation
  text: Créer une intégration
title: Utiliser les intégrations de la communauté et du Marketplace
---

## Présentation

Les intégrations développées par la communauté pour l'Agent Datadog sont stockées dans le référentiel GitHub [integrations-extra][1]. Elles ne sont pas incluses dans le package de l'Agent Datadog, mais elles peuvent être installées comme extensions.

## Configuration

Les nouveaux utilisateurs doivent télécharger et installer la dernière version de l'[Agent Datadog][2].

### Installation

{{< tabs >}}
{{% tab "Agent v7.21+/v6.21+" %}}

Pour l'Agent v7.21+/6.21+ :

1. Exécutez la commande suivante pour installer l'intégration de l'Agent :

    ```
    datadog-agent integration install -t datadog-<INTEGRATION_NAME>==<INTEGRATION_VERSION>
    ```
    **Remarque** : si besoin, ajoutez `sudo -u dd-agent` en tant que préfixe dans la commande d'installation.

   La version de l'intégration est indiquée dans le changelog correspondant sur le référentiel Github de l'intégration.
2. Configurez votre intégration comme une [intégration][1] de base.
3. [Redémarrez l'Agent][2].

[1]: /fr/getting_started/integrations/
[2]: /fr/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

Pour utiliser une intégration de la communauté ou du Marketplace dans un environnement conteneurisé, vous devez créer une image personnalisée qui inclut l'intégration souhaitée.

Utilisez le fichier Docker suivant pour concevoir une version personnalisée de l'Agent qui inclut la valeur `<INTEGRATION_NAME>` provenant de [integrations-extras][2]. Si vous installez une intégration du Marketplace, la valeur `<INTEGRATION_NAME>` est fournie dans les instructions de configuration.

```dockerfile
FROM gcr.io/datadoghq/agent:latest
RUN agent integration install -r -t datadog-<INTEGRATION_NAME>==<INTEGRATION_VERSION>
```

La commande `agent integration install` (exécutée au sein de Docker) génère l'avertissement suivant : `Error loading config: Config File "datadog" Not Found in "[/etc/datadog-agent]": warn`. Vous pouvez l'ignorer.

Si vous utilisez Kubernetes, mettez à jour votre chart Helm ou la configuration de l'Operator Datadog afin d'obtenir votre image personnalisée.

Utilisez [Autodiscovery][1] pour activer et configurer l'intégration.

[1]: /fr/agent/autodiscovery/
[2]: https://github.com/DataDog/integrations-extras
{{% /tab %}}

{{% tab "Versions antérieures de l'Agent" %}}

Pour l'Agent < v7.21/v6.21 :

1. Téléchargez les fichiers dans le dossier `<INTEGRATION_NAME>/datadog_checks/<INTEGRATION_NAME>/` depuis le [référentiel integrations-extra][1].
2. Placez le fichier `<INTEGRATION_NAME>.py` et tout autre fichier Python dans le répertoire `checks.d` de l'Agent.
3. Créez un dossier `<INTEGRATION_NAME>.d` dans le [répertoire de configuration de votre Agent][2].
4. Placez le fichier `conf.yaml.example` situé dans le dossier `<INTEGRATION_NAME>/datadog_checks/<INTEGRATION_NAME>/data/` dans le répertoire créé.
4. Renommez ce fichier `conf.yaml`.
5. Configurez votre intégration comme une [intégration][3] de base.
6. [Redémarrez l'Agent][4].



[1]: https://github.com/DataDog/integrations-extras
[2]: /fr/agent/configuration/agent-configuration-files/#agent-configuration-directory
[3]: /fr/getting_started/integrations/
[4]: /fr/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{< /tabs >}}

Si votre site restreint l'accès au réseau, assurez-vous d'avoir ajouté tous les [`ip-ranges`][3] à votre liste d'inclusion, ou téléchargez l'intégration manuellement.



<br>

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/integrations-extras
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: /fr/agent/configuration/network