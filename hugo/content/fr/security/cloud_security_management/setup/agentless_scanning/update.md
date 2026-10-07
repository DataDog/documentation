---
further_reading:
- link: /security/cloud_security_management/setup/agentless_scanning/enable
  tag: Documentation
  text: Activer Agentless Scanning
- link: /security/cloud_security_management/agentless_scanning
  tag: Documentation
  text: Agentless Scanning Cloud Security
title: Mettre à jour Agentless Scanning
---

## Mettre à jour la stack CloudFormation

Datadog recommande de mettre à jour régulièrement la stack CloudFormation afin de pouvoir accéder aux nouvelles fonctionnalités et corrections de bugs au fur et à mesure de leur publication.

1. Connectez-vous à votre console AWS et accédez à la page CloudFormation Stacks.
1. Développez la stack parente **DatadogIntegration** pour afficher ses sous-stacks imbriquées. Sélectionnez la sous-stack **DatadogIntegration-DatadogAgentlessScanning-...**, cliquez sur **Update**, puis sur **Update nested stack**.
1. Cliquez sur **Replace existing template**.
1. Dans l'URL S3 suivante : `https://datadog-cloudformation-template-quickstart.s3.amazonaws.com/aws/<VERSION>/datadog_agentless_scanning.yaml`, remplacez `<VERSION>` par la version indiquée dans [aws_quickstart/version.txt][1]. Collez cette URL dans le champ **Amazon S3 URL**.
1. Cliquez sur **Next** pour avancer sur les pages suivantes sans les modifier, puis soumettez le formulaire.

## Mettre à jour le module Terraform

Mettez à jour la référence `source` des modules du scanner Agentless vers la dernière version. Vous pouvez trouver la dernière version sur [GitHub Releases][2].

Pour des exemples d'utilisation, consultez le [référentiel GitHub][3].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/cloudformation-template/blob/master/aws_quickstart/version.txt
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/releases
[3]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples