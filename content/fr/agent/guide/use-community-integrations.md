---
title: Utiliser les intégrations de la communauté
aliases:
  - /fr/agent/guide/community-integrations-installation-with-docker-agent
further_reading:
  - link: /agent/troubleshooting/
    tag: Documentation
    text: Dépannage de l'Agent
  - link: /developers/integrations/new_check_howto
    tag: Documentation
    text: Créer une intégration
---
## Présentation

Les intégrations développées par la communauté pour l'Agent Datadog sont stockées dans le référentiel GitHub [integrations-extra][1]. Elles ne sont pas incluses dans le package de l'Agent Datadog, mais elles peuvent être installées comme extensions.

## Configuration

Les nouveaux utilisateurs doivent télécharger et installer la dernière version de l'[Agent Datadog][2].

### Installation

Choisissez votre version de l'Agent :

{{< tabs >}}
{{% tab "Agent v7.21+/v6.21+" %}}

Pour l'Agent v7.21+/6.21+ :

1. Exécutez la commande suivante pour installer l'intégration de l'Agent :

    ```
    datadog-agent integration install -t datadog-<INTEGRATION_NAME>==<INTEGRATION_VERSION>
    ```

2. Configurez votre intégration comme une [intégration][1] de base.
3. [Redémarrez l'Agent][2].

**Remarque** : si besoin, ajoutez `sudo -u dd-agent` en tant que préfixe dans la commande d'installation.

[1]: /fr/getting_started/integrations/
[2]: /fr/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

Pour utiliser une intégration de la communauté provenant du référentiel integrations-extra avec l'Agent Docker, nous vous recommandons de générer une image de l'Agent avec l'intégration installée. Utilisez le Dockerfile suivant pour créer une version mise à jour de l'Agent comprenant l'intégration `<NOM_INTÉGRATION>` issue de integrations-extras.

```dockerfile
FROM gcr.io/datadoghq/agent:latest
RUN agent integration install -r -t datadog-<NOM_INTÉGRATION>==<VERSION_INTÉGRATION>
```

La commande `agent integration install` exécutée au sein de Docker génère l'avertissement suivant : `Error loading config: Config File "datadog" Not Found in "[/etc/datadog-agent]": warn`. Vous pouvez l'ignorer.

Utilisez cette nouvelle image de l'Agent conjointement avec [Autodiscovery][1] pour activer l'intégration `<NOM_INTÉGRATION>`.

[1]: /fr/agent/autodiscovery/
{{% /tab %}}

{{% tab "Versions antérieures de l'Agent" %}}

Pour l'Agent < v7.21/v6.21 :

1. Téléchargez les fichiers dans le dossier `<NOM_INTÉGRATION>/datadog_checks/<NOM_INTÉGRATION>/` depuis le [référentiel integrations-extra][1].
2. Placez le fichier `<NOM_INTÉGRATION>.py` et tout autre fichier Python dans le répertoire `checks.d` de l'Agent.
3. Créez un dossier `<NOM_INTÉGRATION>.d` dans le [répertoire de configuration de votre Agent][2].
4. Placez le fichier `conf.yaml.example` situé dans le dossier `<NOM_INTÉGRATION>/datadog_checks/<NOM_INTÉGRATION>/data/` dans le répertoire créé.
4. Renommez ce fichier `conf.yaml`.
5. Configurez votre intégration comme une [intégration][3] de base.
6. [Redémarrez l'Agent][4].


[1]: https://github.com/DataDog/integrations-extras
[2]: /fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: /fr/getting_started/integrations/
[4]: /fr/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{< /tabs >}}

<br>

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/integrations-extras
[2]: https://app.datadoghq.com/account/settings#agent