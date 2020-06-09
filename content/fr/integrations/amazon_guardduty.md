---
categories:
  - cloud
  - aws
  - log collection
  - security
ddtype: crawler
description: Rassemblez vos logs AWS GuardDuty.
doc_link: /integrations/amazon_guardduty/
has_logo: true
dependencies:
  - 'https://github.com/DataDog/documentation/blob/master/content/en/integrations/amazon_guardduty.md'
integration_title: "AWS\_GuardDuty"
is_public: true
kind: integration
name: amazon_guardduty
public_title: "Intégration Datadog/AWS\_GuardDuty"
short_description: Rassemblez vos logs AWS GuardDuty.
version: '1.0'
---
## Présentation

Datadog s'intègre à AWS GuardDuty via une fonction Lambda qui transmet les résultats de GuardDuty à la solution Log Management de Datadog.

## Configuration

### Collecte de logs

#### Activer la journalisation GuardDuty

1. Créez une nouvelle règle dans Cloudwatch avec le type d'événement **GuardDuty Finding** :

    {{< img src="integrations/amazon_guardduty/aws_gd_1.png" alt="aws gd 1"  style="width:75%;" >}}

2. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda de collecte de logs AWS avec Datadog][1].

3. Une fois la fonction Lambda créée, définissez la fonction Lambda de Datadog comme cible :

    {{< img src="integrations/amazon_guardduty/aws_gd_2.png" alt="aws gd 2"  style="width:75%;" >}}

4. Enregistrez votre règle.

#### Envoyer vos logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda de collecte de logs AWS avec Datadog][1].

2. Après avoir configuré la fonction Lambda, ajoutez GuardDuty en tant que déclencheur en choisissant **CloudWatch Events** comme déclencheur et en créant une `GuardDutyRule` :

    {{< img src="integrations/amazon_guardduty/aws_gd_3.png" alt="aws gd 3"  style="width:75%;">}}

3. Accédez ensuite à la [section Logs de Datadog][2] pour commencer à explorer vos logs.

[1]: /fr/integrations/amazon_web_services/#create-a-new-lambda-function
[2]: https://app.datadoghq.com/logs