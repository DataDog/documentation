---
title: Installation d'une intégration de la communauté
kind: guide
disable_toc: true
further_reading:
  - link: agent/troubleshooting/
    tag: Documentation
    text: Dépannage de l'Agent
  - link: agent/guide/agent-configuration-files/
    tag: FAQ
    text: Fichiers de configuration de l'Agent
  - link: agent/guide/agent-commands/
    tag: FAQ
    text: Commandes de l'Agent
---
Les intégrations développées par la communauté pour l'Agent Datadog sont stockées dans le référentiel Github [Integrations-extra][1]. Elles ne sont pas ajoutées au paquet ni intégrées à l'Agent Datadog, mais elles peuvent être installées comme extensions en suivant ces instructions :

{{< tabs >}}
{{% tab "Agent > v6.8" %}}

Pour installer le check `<NOM_INTÉGRATION>` sur votre host :

1. Installez le [kit de développement logiciel][1].
2. Clonez le dépôt integrations-extras :

    ```
    git clone https://github.com/DataDog/integrations-extras.git.
    ```

3. Mettez à jour votre configuration `ddev` avec le chemin `integrations-extras/` :

    ```
    ddev config set extras ./integrations-extras
    ```

4. Pour créer le paquet `<NOM_INTÉGRATION>`, exécutez :

    ```
    ddev -e release build <INTEGRATION_NAME>
    ```

5. [Téléchargez et lancez l'Agent Datadog][2].
6. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

    ```
    datadog-agent integration install -w <PATH_OF_INTEGRATION_NAME_PACKAGE>/<ARTIFACT_NAME>.whl
    ```

7. Configurez votre intégration comme [n'importe quelle autre intégration du paquet][3].
8. [Redémarrez l'Agent][4].

[1]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit
[2]: https://app.datadoghq.com/account/settings#agent
[3]: /fr/getting_started/integrations
[4]: /fr/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

Le meilleur moyen d'utiliser une intégration provenant du dépôt integrations-extra avec l'Agent Docker est de générer une image de l'Agent avec cette intégration installée. Utilisez le Dockerfile suivant pour créer une version mise à jour de l'Agent comprenant l'intégration `<NOM_INTÉGRATION>` issue de integrations-extras.

```
FROM python:2.7 AS wheel_builder
WORKDIR /wheels
RUN pip install "datadog-checks-dev[cli]"
RUN git clone https://github.com/DataDog/integrations-extras.git
RUN ddev config set extras ./integrations-extras
RUN ddev -e release build <NOM_INTÉGRATION>

FROM datadog/agent:latest
COPY --from=wheel_builder /wheels/integrations-extras/<NOM_INTÉGRATION>/dist/ /dist
RUN agent integration install -r -w /dist/*.whl
```

Utilisez ensuite la nouvelle image de l'Agent en combinaison avec [Autodiscovery][1] pour activer le check `<NOM_INTÉGRATION>`.

[1]: /fr/agent/autodiscovery
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
8. Configurez votre intégration comme [n'importe quelle autre intégration du paquet][4].
9. [Redémarrez l'Agent][5].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/DataDog/integrations-extras
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: /fr/getting_started/integrations
[5]: /fr/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/integrations-extras