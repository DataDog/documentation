---
categories:
- cloud
- aws
- log collection
- security
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/amazon_guardduty.md
description: Rassemblez vos logs Amazon GuardDuty.
doc_link: /integrations/amazon_guardduty/
has_logo: true
integration_id: amazon-guardduty
integration_title: Amazon GuardDuty
is_public: true
custom_kind: integration
name: amazon_guardduty
public_title: Intégration Datadog/Amazon GuardDuty
short_description: Rassemblez vos logs Amazon GuardDuty.
version: '1.0'
---

## Présentation

Datadog s'intègre à Amazon GuardDuty par l'intermédiaire d'une fonction Lambda qui transmet les résultats de GuardDuty à la solution Log Management de Datadog.

## Configuration

### Collecte de logs

#### Activer le logging

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda du Forwarder Datadog][1].

2. Créez une règle dans [Amazon EventBridge][2]. Attribuez un nom à la règle, puis sélectionnez **Rule with an event pattern**. Cliquez ensuite sur **Next**.

3. Définissez un pattern d'événement qui correspond à vos résultats GuardDuty. Sélectionnez `AWS events or EventBridge partner events` dans la section **Event source**. Indiquez ensuite la source `AWS services`, le service `GuardDuty` et le type `GuardDuty Finding` à la section **Event pattern**. Cliquez sur **Next**.

4. Sélectionnez le Forwarder Datadog pour définir la cible. Définissez le type de cible `AWS service` ainsi que la cible `Lambda function`. Depuis le menu déroulant `Function`, choisissez le Forwarder Datadog. Cliquez ensuite sur **Next**.

5. Configurez les tags de votre choix, puis cliquez sur **Create rule**.

#### Envoyer vos logs à Datadog

1. Dans la console AWS, accédez à **Lambda**.

2. Cliquez sur **Functions**, puis sélectionnez le Forwarder Datadog.

3. Cliquez sur **Add Trigger** depuis la section Function Overview. Sélectionnez dans le menu déroulant l'option **EventBridge (CloudWatch Events)**, puis indiquez la règle créée précédemment à la rubrique [Activer le logging](#activer-le-logging).

4. Visualisez les résultats GuardDuty dans le [Log Explorer Datadog][3].

[1]: /fr/logs/guide/forwarder/
[2]: https://console.aws.amazon.com/events/home
[3]: https://app.datadoghq.com/logs