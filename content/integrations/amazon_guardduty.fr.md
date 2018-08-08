---
categories:
- cloud
- aws
- log collection
- security
ddtype: crawler
description: Récupérer vos logs AWS GuardDuty.
doc_link: https://docs.datadoghq.com/integrations/amazon_guardduty/
has_logo: true
integration_title: AWS GuardDuty
is_public: true
kind: integration
name: amazon_guardduty
public_title: Intégration Datadog-AWS GuardDuty
short_description: Récupérer vos logs AWS GuardDuty.
version: '1.0'
---

## Aperçu


Datadog s'intègre à AWS GuardDuty via une fonction Lambda qui expédie les résultats de GuardDuty à la solution de log management de Datadog.

## Implémentation
### Collecte de logs
#### Activer le logging de GuardDuty:

1. Créez une nouvelle règle dans Cloudwatch avec le type d'événement **GuardDuty Finding**:

    {{< img src="integrations/amazon_guardduty/aws_gd_1.png" alt="aws gd 1" responsive="true" style="width:75%;" >}}

2. Si vous ne l'avez pas déjà fait, configurez [la fonction Lambda pour collecte de logs AWS](/integrations/amazon_web_services/#create-a-new-lambda-function).

3. Une fois la fonction Lambda créée, définissez la fonction Lambda  de Datadog comme cible:

    {{< img src="integrations/amazon_guardduty/aws_gd_2.png" alt="aws gd 2" responsive="true" style="width:75%;" >}}

4. Sauvegardez votre règle.

#### Envoyer vos logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez [la fonction Lambda pour collecte de logs AWS][1].

2. Après avoir configuré la fonction Lambda, ajoutez GuardDuty en tant que déclencheur en choisissant **CloudWatch Events** comme déclencheur et en créant une `GuardDutyRule`:

    {{< img src="integrations/amazon_guardduty/aws_gd_3.png" alt="aws gd 3" responsive="true" style="width:75%;">}}

3. Allez désormais dans la section [Log de Datadog](https://app.datadoghq.com/logs) pour commencer à explorer vos logs!

[1]: /integrations/amazon_web_services/#create-a-new-lambda-function
