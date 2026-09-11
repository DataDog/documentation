## Configuration

Il existe deux façons de déployer des scanners sans Agent dans votre environnement : manuellement avec [Terraform][6], ou en utilisant le modèle CloudFormation avec l'[intégration AWS][7].

**Remarque** : lorsque vous utilisez le scanning sans Agent, l'exécution de scanners dans vos environnements cloud implique des coûts supplémentaires. Pour optimiser ces coûts tout en assurant un scan toutes les 12 heures, Datadog vous conseille de configurer le scanning sans Agent avec Terraform comme modèle par défaut. Vous éviterez ainsi les coûts liés aux communications inter-région.

Pour estimer les coûts liés aux scanners, contactez un [représentant commercial][7] ou un [chargé de clientèle][8] Datadog.

### Terraform

Pour les vastes régions de plus de 250 hosts, il est conseillé, pour des raisons d'efficacité, de créer un scanner par région et de scanner les différents comptes au lieu de configurer un scanner par compte.

**Option 1 (recommandé)** : créez un compte dédié aux scanners sans Agent et déployez un scanner pour chaque région contenant des ressources cloud à scanner. Avec cette méthode, Datadog crée le compte cloud central et ajoute les instances de scan à ce compte.

Le diagramme suivant illustre le fonctionnement du scanning sans Agent lorsqu'il est déployé dans un compte cloud central :

<img src="/images/security/agentless_scanning/agentless_vulnerability_advanced.png" alt="Diagramme illustrant le scanner sans Agent déployé dans un compte cloud central" width="90%">

**Option 2** : déployez un scanner pour chaque région contenant des ressources cloud à scanner _sans_ créer un compte dédié aux scanners sans Agent. Avec cette méthode, le compte cloud central existe déjà dans votre environnement et vous pouvez ajouter des instances de scan à ce compte.

#### Installation

Consultez la section [Activer le scanner sans Agent avec Terraform][5] pour obtenir des instructions de configuration spécifiques.

### Intégration AWS

Depuis l'intégration AWS dans Datadog, après avoir sélectionné le modèle CloudFormation et activé la [Configuration à distance][4] pour votre organisation, Datadog met à jour le modèle avec les autorisations IAM requises et déploie un scanner par compte AWS, qui scanne l'ensemble de ses régions. Datadog scanne le volume EBS pour générer un [Software Bill of Materials (SBOM)][2], puis envoie le SBOM à la solution [Vulnerability Management][3] de Datadog pour vous permette d'enquêter sur les vulnérabilités et de les corriger.

Cette méthode alternative à la configuration manuelle (via Terraform) est moins onéreuse et doit être privilégiée si vous avez moins de 250 hosts par compte.

Le diagramme suivant illustre le fonctionnement du scanning sans Agent lorsqu'il est déployé dans chaque compte cloud :

<img src="/images/security/agentless_scanning/agentless_vulnerability_quickstart.png" alt="Diagramme illustrant le scanner sans Agent déployé dans chaque compte cloud" width="90%">

**Remarque** : les données scannées ne sortent jamais de votre infrastructure, et seuls les résultats sont transmis à Datadog.

## Désactiver le scanning sans Agent
Pour désactiver le scanning sans Agent via le modèle CloudFormation, supprimez les rôles ou l'instance de scan EC2.

## Exclusion de ressources

Pour exclure des volumes ou des ressources Lambda dans AWS, définissez le tag `DatadogAgentlessScanner:false`.



[1]: /security/vulnerabilities
[2]: https://www.cisa.gov/sbom
[3]: https://app.datadoghq.com/security/csm/vm
[4]: /agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[5]: https://github.com/DataDog/terraform-datadog-agentless-scanner/blob/main/README.md
[6]: /security/cloud_security_management/setup/agentless_scanning/#terraform
[7]: /security/cloud_security_management/setup/agentless_scanning/#aws-integration
[7]: mailto:sales@datadoghq.com
[8]: mailto:success@datadoghq.com

