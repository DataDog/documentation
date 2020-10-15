---
title: Marketplace
type: documentation
---

<div class="alert alert-info">Vous souhaitez devenir partenaire Marketplace ? Contactez-nous à l'adresse <a href="mailto:marketplace@datadog.com">marketplace@datadog.com</a> pour nous faire part de votre idée !</div>

## Avant de commencer

Avant de vous lancer dans le processus de publication, votre application Marketplace doit être approuvée par Datadog. Vous devez également avoir accès au dépôt Marketplace, disposer d'une intégration et avoir configuré le kit de développement de Datadog [ddev][1].

## Publication de votre intégration

Pour publier une intégration, le responsable du maintien de cette intégration doit mettre à jour deux fichiers dans la même pull request (PR).

1. Mettre à jour le fichier CHANGELOG.md
    Ce fichier peut être mis à jour automatiquement par ddev à l'aide de la commande suivante :
    ```
    ddev release changelog <INTEGRATION_NAME> <VERSION>
    ```
    La commande énumère toutes les pull requests mergées depuis la dernière publication et crée une entrée changelog en fonction des étiquettes de la pull request. Concernant les types d'entrées changelog, suivez les instructions définies par [Keep a Changelog][2].

2. Mettre à jour le fichier `about.py`
    Toutes les intégrations basées sur l'Agent utilisent la même hiérarchie de fichiers, et la seule source valable pour connaître la version d'une intégration est le fichier `datadog_checks/<INTÉGRATION>/about.py`. Pour obtenir un exemple, consultez le check [Aqua][3].
La mise à jour du fichier s'effectue manuellement.

3. Faites un push de ces modifications vers la branche du dépôt Marketplace Datadog et créez une pull request. Lorsque la pull request est mergée à la branche master, une publication est effectuée avec le numéro de version indiqué dans le fichier `about.py`. Quelques minutes plus tard (~15 minutes), la nouvelle version est publiée dans le dépôt de Datadog situé ici et l'intégration peut être installée à l'aide de la commande :

    ```
    sudo -u dd-agent datadog-agent integration install --third-party datadog-<INTEGRATION_NAME>==X.Y.Z
    ```




[1]: https://github.com/DataDog/integrations-core/tree/master/datadog_checks_dev
[2]: https://keepachangelog.com/en/1.1.0/#how
[3]: https://github.com/DataDog/integrations-extras/blob/master/aqua/datadog_checks/aqua/__about__.py#L4
