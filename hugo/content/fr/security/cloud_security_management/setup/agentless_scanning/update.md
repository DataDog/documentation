---
further_reading:
- link: /security/cloud_security_management/setup/agentless_scanning/enable
  tag: Documentation
  text: Activation de Agentless Scanning
- link: /security/cloud_security_management/agentless_scanning
  tag: Documentation
  text: Cloud Security Agentless Scanning
title: Mise à jour de Agentless Scanning
---
Les instances de scanner sont remplacées toutes les 24 heures et installent la dernière version corrective de la version du scanner fixée par votre déploiement. Mettez à jour votre déploiement pour obtenir les nouvelles versions du scanner, les changements d'autorisations et les correctifs d'infrastructure.

## Mettre à jour la pile CloudFormation {#update-the-cloudformation-stack}

Datadog recommande de mettre à jour régulièrement la pile CloudFormation afin que vous puissiez accéder aux nouvelles fonctionnalités et aux correctifs de bogues dès leur publication.

1. Connectez-vous à votre console AWS et accédez à la page Stacks de CloudFormation.
1. Développez la pile parente {{< ui >}}DatadogIntegration{{< /ui >}} pour afficher ses sous-piles imbriquées. Sélectionnez la sous-pile {{< ui >}}DatadogIntegration-DatadogAgentlessScanning-...{{< /ui >}}, cliquez sur {{< ui >}}Update{{< /ui >}}, puis cliquez sur {{< ui >}}Update nested stack{{< /ui >}}.
1. Cliquez sur {{< ui >}}Replace existing template{{< /ui >}}.
1. Dans l'URL S3 suivante : `https://datadog-cloudformation-template-quickstart.s3.amazonaws.com/aws/<VERSION>/datadog_agentless_scanning.yaml`, remplacez `<VERSION>` par la version trouvée dans [aws_quickstart/version.txt][1]. Collez cette URL dans le champ {{< ui >}}Amazon S3 URL{{< /ui >}}.
1. Cliquez sur {{< ui >}}Next{{< /ui >}} pour parcourir les pages suivantes sans les modifier, puis soumettez le formulaire.

## Mettre à jour le module Terraform {#update-the-terraform-module}

Mettez à jour la référence `source` pour les modules Agentless Scanner vers la dernière version. Vous pouvez trouver la dernière version sur [GitHub Releases][2].

Pour des exemples d'utilisation, consultez le [dépôt GitHub][3].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/cloudformation-template/blob/master/aws_quickstart/version.txt
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/releases
[3]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples