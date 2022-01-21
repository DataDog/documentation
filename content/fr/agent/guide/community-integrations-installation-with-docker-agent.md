---
title: Installation d'une intégration de la communauté
kind: guide
further_reading:
  - link: /agent/troubleshooting/
    tag: Documentation
    text: Dépannage de l'Agent
  - link: /agent/guide/agent-configuration-files/
    tag: FAQ
    text: Fichiers de configuration de l'Agent
  - link: /agent/guide/agent-commands/
    tag: FAQ
    text: Commandes de l'Agent
---
Les intégrations développées par la communauté pour l'Agent Datadog sont stockées dans le référentiel GitHub [Integrations-extra][1]. Elles ne sont pas ajoutées au paquet ni intégrées à l'Agent Datadog, mais elles peuvent être installées comme extensions en suivant ces instructions :

{{< tabs >}}
{{% tab "Agent > v6.8" %}}

Pour installer le check `<NOM_INTÉGRATION>` sur votre host :

1. [Téléchargez et lancez l'Agent Datadog][1].
2. Exécutez la commande suivante pour installer les intégrations à l'aide de l'Agent :

    ```
    datadog-agent integration install -t datadog-<INTEGRATION_NAME>==<INTEGRATION_VERSION>
    ```

3. Configurez votre intégration comme [n'importe quelle autre intégration du package][2].
4. [Redémarrez l'Agent][3].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /fr/getting_started/integrations/
[3]: /fr/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

Le meilleur moyen d'utiliser une intégration provenant du référentiel integrations-extra avec l'Agent Docker est de générer une image de l'Agent avec cette intégration installée. Utilisez le Dockerfile suivant pour créer une version mise à jour de l'Agent comprenant l'intégration `<NOM_INTÉGRATION>` issue de integrations-extras.

```dockerfile
FROM gcr.io/datadoghq/agent:latest
RUN agent integration install -r -t datadog-<NOM_INTÉGRATION>==<VERSION_INTÉGRATION>
```

La commande `agent integration install` exécutée au sein de Docker génère l'avertissement suivant : `Error loading config: Config File "datadog" Not Found in "[/etc/datadog-agent]": warn`. Vous pouvez l'ignorer.

Utilisez ensuite la nouvelle image de l'Agent conjointement avec [Autodiscovery][1] pour activer le check `<NOM_INTÉGRATION>`.

[1]: /fr/agent/autodiscovery/
{{% /tab %}}
{{% tab "Agent < v6.8" %}}

Pour installer le check `<NOM_INTÉGRATION>` sur votre host :

1. [Téléchargez l'Agent Datadog][1] sur votre host.
2. Téléchargez le fichier `<NOM_INTÉGRATION>.py` dans le répertoire `<NOM_INTÉGRATION>/datadog_checks/<NOM_INTÉGRATION>/` du [référentiel integrations-extra][2].
3. Placez-le dans le répertoire `checks.d` de l'Agent.
4. Téléchargez le fichier `conf.yaml.example` dans le répertoire `<NOM_INTÉGRATION>/datadog_checks/<NOM_INTÉGRATION>/data/` du [référentiel integrations-extra][2]
5. Renommez ce fichier `conf.yaml`.
6. Créez un dossier `<NOM_INTÉGRATION>.d` dans le [répertoire de configuration de votre Agent][3].
7. Placez le fichier `conf.yaml` dans le répertoire créé à l'étape 6.
8. Configurez votre intégration comme [n'importe quelle autre intégration du package][4].
9. [Redémarrez l'Agent][5].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/DataDog/integrations-extras
[3]: /fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: /fr/getting_started/integrations/
[5]: /fr/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/integrations-extras