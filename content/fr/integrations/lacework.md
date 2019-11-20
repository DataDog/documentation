---
title: Lacework
name: lacework
kind: integration
description: Transmettez vos logs Lacework à Datadog.
short_description: Transmettez vos logs Lacework à Datadog.
categories:
  - log collection
  - security
doc_link: /integrations/lacework/
has_logo: true
integration_title: Lacework
is_public: true
public_title: Intégration Datadog/Lacework
further_reading:
  - link: 'https://www.lacework.com/datadog/'
    tag: Lacework.com
    text: Documentation sur l'intégration Lacework/Datadog.
---
## Présentation

Utilisez l'intégration Datadog/Lacework pour transmettre vos logs Lacework à Datadog.

## Implémentation

Lacework transmet des logs et des événements à Datadog. La configuration de cette intégration s'effectue donc en intégralité sur le dashboard de Lacework. Datadog active automatiquement les bons pipelines de traitement de logs lors de la détection des logs Lacework.

### Configuration

1. Dans Lacework, accédez à *Settings* et sélectionnez *Integrations*.
2. Dans la section *Outgoing* (dans le volet de gauche), sélectionnez Datadog.
3. Remplissez les informations suivantes :
    * **Name** : saisissez un nom pour l'intégration, par exemple, `Datadog-Lacework`.
    * **Datadog Type** : sélectionnez le type de logs envoyés à Datadog :

        | Datadog Type       | Description                                                |
        | ------------------ | -------------------------------------------------------    |
        | `Logs Details`     | Envoie des logs Lacework détaillés à la plateforme de logs Datadog. |
        | `Logs Summary`     | Envoie une synthèse Lacework à la plateforme de logs Datadog.     |
        | `Events Summary`   | Envoie une synthèse Lacework à la plateforme d'événements Datadog.   |

    * **Datadog Site** :
        * Sélectionnez `com` si vous utilisez le site américain de Datadog.
        * Sélectionnez `eu` si vous utilisez le site européen de Datadog.
    * **API KEY** : saisissez votre [clé d'API Datadog][1].
    * **Alert Security Level** : sélectionnez le niveau de sévérité minimum des logs transmis.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][2].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#api
[2]: /fr/help