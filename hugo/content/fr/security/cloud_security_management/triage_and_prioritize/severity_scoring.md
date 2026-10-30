---
aliases:
- /fr/security/cloud_security_management/severity_scoring/
further_reading:
- link: /security/cloud_security_management/misconfigurations/
  tag: Documentation
  text: Commencez à suivre les problèmes de configuration avec Cloud Security Misconfigurations
- link: /security/cloud_security_management/identity_risks/
  tag: Documentation
  text: Comprenez le paysage de vos identités grâce à Cloud Security Identity Risks
- link: /security/cloud_security_management/vulnerabilities/
  tag: Documentation
  text: Découvrez Cloud Security Vulnerabilities
- link: https://www.datadoghq.com/blog/cloudcraft-security/
  tag: Blog
  text: Identifiez et hiérarchisez visuellement les risques de sécurité à l'aide de
    Cloudcraft
title: Score de sévérité
---
Des scores de gravité précis aident les équipes de sécurité à comprendre les risques que les vulnérabilités font peser sur leur environnement. Ce guide explique comment Cloud Security utilise différentes mesures de gravité pour calculer les scores.

## Cadre de notation de la gravité de Cloud Security {#cloud-security-severity-scoring-framework}

Cloud Security Misconfigurations, Cloud Security Identity Risks et les mauvaises configurations de Security Inbox utilisent le cadre de notation de la gravité de Cloud Security pour déterminer la gravité d'un constat. Le cadre compare la probabilité qu'un adversaire tire parti d'une mauvaise configuration au risque posé à votre environnement. En pondérant ces deux aspects, les constats peuvent être hiérarchisés plus précisément en fonction des risques réels. Les matrices ci-dessous montrent comment le score de gravité d'une mauvaise configuration est calculé en fonction de sa probabilité d'exploitation et de son impact.

### Probabilité {#likelihood}

La composante de probabilité est constituée de deux sous-composantes :

* **Vecteur d'attaque** : le moyen par lequel une mauvaise configuration peut être exploitée.
* **Accessibilité** : indique si la ressource est accessible publiquement ou non.

#### Vecteur d'attaque {#attack-vector}

Le vecteur d'attaque est déterminé par les critères suivants :

|    Vecteur d'attaque    |                                                              Définition                                                              |
|:-------------------:|:------------------------------------------------------------------------------------------------------------------------------------:|
| Privilèges requis |                                           Nécessite des privilèges ou un accès spécifiques pour être exploité.                                           |
|    Vulnérabilité    | Nécessite un composant vulnérable pour être exploité, tel qu'une vulnérabilité logicielle sur une instance de calcul, un mot de passe divulgué ou une clé d'accès divulguée. |
|  Aucune autorisation   |                                        Ne nécessite aucune autorisation ni authentification pour être exploité.                                         |

#### Accessibilité {#accessibility}

L'accessibilité est déterminée par les critères suivants :

| Accessibilité |                              Définition                               |
|:-------------:|:---------------------------------------------------------------------:|
|    Privé    |     Le composant ou la ressource vulnérable se trouve dans un réseau privé.     |
|    Public     | Le composant ou la ressource vulnérable est accessible depuis Internet. |

#### Score de probabilité {#likelihood-score}

Ensemble, le vecteur d'attaque et l'accessibilité déterminent le score de probabilité :

| Vecteur d'attaque           | Accessibilité |                 |
|-------------------------|---------------|-----------------|
|                         | **Privé**   | **Public**      |
| **Privilèges requis** | Improbable    | Possible        |
| **Vulnérabilité**       | Possible      | Probable        |
| **Aucune autorisation**    | Probable      | Très probable |

### Impact {#impact}

La composante d'impact correspond à la gravité des dommages que l'exploitation de la mauvaise configuration causerait à l'environnement.

|  Impact  |                                                                                                                 Définition                                                                                                                |
|:--------:|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|    Faible   | Cette mauvaise configuration est liée au renforcement de la sécurité, à l'hygiène, aux métadonnées des ressources ou aux configurations conformes aux meilleures pratiques du secteur. En soi, cette mauvaise configuration a peu ou pas d'impact sur l'environnement.                                                                                                             |
|  Moyen  | L'exploitation de cette mauvaise configuration entraîne un impact sur la confidentialité, l'intégrité ou la disponibilité du composant vulnérable ou de ses ressources directement associées.                                                                   |
|   Élevé   | L'exploitation de cette mauvaise configuration entraîne un impact sur la confidentialité, l'intégrité ou la disponibilité du composant vulnérable et affecte un nombre important d'autres ressources. Par exemple, une identité à laquelle est associée la politique `S3FullAccess`. |
| Critique | L'exploitation de cette mauvaise configuration entraîne un contrôle total de toutes les ressources du compte. Par exemple, une identité à laquelle est associée la politique `AdministratorAccess`. |

### Matrice de notation de la gravité {#severity-scoring-matrix}

Les composantes de probabilité et d'impact sont utilisées pour calculer le score de gravité global d'une mauvaise configuration.

| Probabilité          | Impact  |            |          |              |
|---------------------|---------|------------|----------|--------------|
|                     | **Faible** | **Moyen** | **Élevé** | **Critique** |
| **Improbable**      | Faible     | Faible        | Moyen   | Moyen       |
| **Possible**        | Faible     | Moyen     | Élevé     | Élevé         |
| **Probable**        | Moyen  | Élevé       | Élevé     | Critique     |
| **Très probable** | Moyen  | Élevé       | Critique | Critique     |

### Exemples {#examples}

Pour expliquer comment le cadre est utilisé, voici quelques exemples.

#### Exemple 1 : SNS Topic should have access restrictions set for subscription {#example-1-sns-topic-should-have-access-restrictions-set-for-subscription}

La règle de détection [SNS Topic should have access restrictions set for subscription][1] vérifie si le sujet SNS possède une politique basée sur les ressources qui contient un `Principal` de `*`, et une `Action` avec l'autorisation `sns:Subscribe`. Cette combinaison donne à quiconque la possibilité de s'abonner au sujet SNS et de recevoir ses notifications. 

En utilisant le cadre de notation de la gravité de Cloud Security, la règle serait notée comme suit :

- **Score de probabilité** : Très probable
  - **Vecteur d'attaque** : Aucune autorisation
    - Le vecteur d'attaque est marqué comme « Aucune autorisation » car la politique basée sur les ressources contient un `*`. Ce caractère générique accorde à quiconque la capacité d'agir sur la ressource. Aucune authentification ou autorisation n'est requise pour exploiter la mauvaise configuration.
  - **Accessibilité** : Public
    - L'accessibilité est marquée comme « Public » car la mauvaise configuration peut être exploitée sur Internet via sa politique basée sur les ressources. Aucun accès réseau spécifique n'est requis.
- **Impact** : Moyen
  - L'impact est marqué comme « Moyen » du fait que la confidentialité de la ressource est impactée. Un adversaire qui exploite cette mauvaise configuration peut recevoir des messages envoyés par le sujet SNS.
- **Score de gravité** : Très probable x Moyen = Élevé
  - Le score de gravité final est Élevé. Une probabilité « Très probable » associée à un impact « Moyen » donne un score global « Élevé ».

#### Exemple 2 : EC2 instances should enforce IMDSv2 {#example-2-ec2-instances-should-enforce-imdsv2}

La règle de détection [EC2 instances should enforce IMDSv2][2] vérifie si une instance EC2 utilise Instance Metadata Service Version 1 ([IMDSv1][3]), qui est vulnérable aux attaques courantes sur les applications web. Si cette vulnérabilité est exploitée, un adversaire peut obtenir l'accès aux identifiants IAM stockés dans l'IMDS et les utiliser pour accéder aux ressources du compte AWS.

En utilisant le cadre de notation de la gravité de Cloud Security, la règle serait notée comme suit :

- **Score de probabilité** : Possible
  - **Vecteur d'attaque** : Vulnérabilité
    - Le vecteur d'attaque est marqué comme « Vulnérabilité ». Cela est dû au fait que l'exploitation de cette mauvaise configuration nécessite que la ressource contienne un composant vulnérable, tel qu'un logiciel vulnérable s'exécutant sur l'instance EC2 et pouvant être exploité pour mener des attaques par [falsification de requêtes côté serveur][4].
  - **Accessibilité** : Privé
    - L'accessibilité est marquée comme « Privé », car l'instance EC2 n'a pas été explicitement rendue publique.
- **Impact** : Moyen
  - L'impact est considéré comme « Moyen » en raison des conséquences sur la confidentialité de l'instance EC2. Un adversaire serait en mesure d'accéder à l'IMDS et potentiellement de récupérer les identifiants IAM associés à la ressource.
- **Score de gravité** : Possible x Medium = Medium
  - Le score de gravité final est « Medium ». En effet, une probabilité « Possible » combinée à un impact « Medium » donne un score global « Medium ».

## CVSS 4.0 {#cvss-40}

Cloud Security Vulnerabilities utilise le Common Vulnerability Scoring System version 4.0 ([CVSS 4.0][5]) et, en l'absence de score pour cette version, se rabat sur les versions antérieures (3.1, 3.0, 2) pour déterminer le score de base d'une vulnérabilité. Il modifie ensuite le score de base pour prendre en compte les éléments suivants :

- Si l'infrastructure sous-jacente est en fonctionnement et quelle est l'étendue de l'impact.
- L'environnement dans lequel l'infrastructure sous-jacente est en cours d'exécution. Par exemple, si l'environnement n'est pas un environnement de production, le niveau de gravité est abaissé.
- S'il existe une exploitation active d'une vulnérabilité donnée, selon des sources telles que le [catalogue CISA KEV][6].
- La probabilité d'exploitation, calculée et vérifiée à l'aide de l'[EPSS][7].

### Gravité inconnue {#unknown-severity}

Une vulnérabilité présente une gravité **Unknown** lorsque ni l'avis du fournisseur ni la [National Vulnerability Database (NVD)][8] ne fournissent de score CVSS. La gravité inconnue est plus courante pour :

- Les CVE qui n'ont jamais été évaluées, ce qui est courant pour les très anciennes CVE.
- Vulnérabilités provenant de sources d'avis de sécurité qui ne publient pas de scores CVSS, telles que la base de données des vulnérabilités Go.

Comme les ajustements basés sur le risque de Datadog sont appliqués en plus du score CVSS de base, la gravité Datadog est également **Unknown** dans ces cas.

Vous pouvez attribuer une gravité à ces résultats en créant une [règle de modification de la gravité][9].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/security/default_rules/aws-sns-topic-sns-topic-should-have-access-restrictions-set-for-subscription/
[2]: https://docs.datadoghq.com/fr/security/default_rules/aws-ec2-instance-ec2-instances-and-autoscaling-groups-should-enforce-imdsv2/
[3]: https://hackingthe.cloud/aws/general-knowledge/intro_metadata_service/
[4]: https://hackingthe.cloud/aws/exploitation/ec2-metadata-ssrf/
[5]: https://www.first.org/cvss/v4-0/
[6]: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
[7]: https://www.first.org/epss/
[8]: https://nvd.nist.gov/
[9]: /fr/security/automation_pipelines/modify_severity/