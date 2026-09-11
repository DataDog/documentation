---
aliases:
- /fr/security/cloud_security_management/severity_scoring/
further_reading:
- link: /security/cloud_security_management/misconfigurations/
  tag: Documentation
  text: Commencez à suivre les misconfigurations avec Cloud Security Misconfigurations
- link: /security/cloud_security_management/identity_risks/
  tag: Documentation
  text: Comprenez votre paysage d'identité avec Cloud Security Identity Risks
- link: /security/cloud_security_management/vulnerabilities/
  tag: Documentation
  text: En savoir plus sur Cloud Security Vulnerabilities
- link: https://www.datadoghq.com/blog/cloudcraft-security/
  tag: Blog
  text: Identifiez visuellement et priorisez les risques de sécurité en utilisant
    Cloudcraft
title: Score de sévérité
---
Des scores de gravité précis aident les équipes de sécurité à comprendre les risques que les vulnérabilités posent à leur environnement. Ce guide explique comment Cloud Security utilise différentes mesures de gravité pour calculer les scores.

## Cadre de notation de gravité de la sécurité dans le cloud {#cloud-security-severity-scoring-framework}

Cloud Security Misconfigurations, Cloud Security Identity Risks et Security Inbox misconfigurations utilisent le cadre de notation de gravité de Cloud Security pour déterminer la gravité d'une constatation. Le cadre compare la probabilité qu'un adversaire profite d'une misconfiguration au risque posé à votre environnement. En pondérant ces deux aspects, les constatations peuvent être priorisées plus précisément par rapport aux risques du monde réel. Les matrices ci-dessous montrent comment le score de gravité d'une misconfiguration est calculé en fonction de sa probabilité d'abus et de son impact.

### Probabilité {#likelihood}

Le composant de probabilité est composé de deux sous-composants :

* **Vecteur d'attaque** : Les moyens par lesquels une misconfiguration peut être exploitée.
* **Accessibilité** : Si la ressource est accessible publiquement ou non.

#### Vecteur d'attaque {#attack-vector}

Le vecteur d'attaque est déterminé par les critères suivants :

|    Vecteur d'attaque    |                                                              Définition                                                              |
|:-------------------:|:------------------------------------------------------------------------------------------------------------------------------------:|
| Privilèges requis |                                           Nécessite des privilèges spécifiques ou un accès spécifique pour en abuser.                                           |
|    Vulnérabilité    | Nécessite un composant vulnérable pour être exploité, tel qu'une vulnérabilité logicielle sur une instance de calcul ou un mot de passe ou une clé d'accès divulguée. |
|  Aucune autorisation |                                        N'exige aucune autorisation ni authentification pour être exploitée.                                         |

#### Accessibilité {#accessibility}

L'accessibilité est déterminée par les critères suivants :

| Accessibilité |                              Définition |
|:-------------:|:---------------------------------------------------------------------:|
|    Privé |     Le composant ou la ressource vulnérable se trouve dans un réseau privé.     |
|    Public | Le composant ou la ressource vulnérable est accessible depuis Internet. |

#### Score de probabilité {#likelihood-score}

Ensemble, le vecteur d'attaque et l'accessibilité déterminent le score de probabilité :

| Vecteur d'attaque | Accessibilité |                 |
|-------------------------|---------------|-----------------|
|                         | **Privé**   | **Public**      |
| **Privilèges requis** | Improbable | Possible |
| **Vulnérabilité**       | Possible | Probable |
| **Aucune autorisation**    | Probable | Très probable |

### Impact {#impact}

Le composant d'impact est la mesure dans laquelle l'exploitation de la misconfiguration serait dommageable pour l'environnement.

|  Impact |                                                                                                                 Définition |
|:--------:|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|    Faible | Cette misconfiguration est liée au renforcement de la sécurité, à l'hygiène, aux métadonnées des ressources ou aux configurations des meilleures pratiques de l'industrie. À elle seule, cette misconfiguration représente peu ou pas d'impact sur l'environnement.                                                                                                             |
|  Moyenne  | Exploiter cette misconfiguration entraîne un impact sur la confidentialité, l'intégrité ou la disponibilité du composant vulnérable ou de ses ressources directement associées.                                                                   |
|   Élevée  | Exploiter cette misconfiguration entraîne un impact sur la confidentialité, l'intégrité ou la disponibilité du composant vulnérable et affecte un nombre significatif d'autres ressources. Par exemple, une identité avec la politique `S3FullAccess` attachée. |
| Critique | Exploiter cette misconfiguration entraîne un contrôle total de toutes les ressources du compte. Par exemple, une identité avec la politique `AdministratorAccess` attachée. |

### Matrice de notation de gravité {#severity-scoring-matrix}

Les composants de probabilité et d'impact sont utilisés pour calculer le score de gravité global d'une misconfiguration.

| Probabilité          | Impact  |            |          |              |
|---------------------|---------|------------|----------|--------------|
|                     | **Faible** | **Moyenne** | **Élevée** | **Critique** |
| **Improbable**      | Faible     | Faible        | Moyenne   | Moyenne       |
| **Possible**        | Faible     | Moyenne     | Élevée     | Élevée         |
| **Probable**        | Moyenne  | Élevée       | Élevée     | Critique     |
| **Très Probable** | Moyenne  | Élevée       | Critique | Critique     |

### Exemples {#examples}

Pour expliquer comment le cadre est utilisé, voici quelques exemples.

#### Exemple 1 : Le sujet SNS doit avoir des restrictions d'accès définies pour l'abonnement {#example-1-sns-topic-should-have-access-restrictions-set-for-subscription}

La règle de détection pour [Le sujet SNS doit avoir des restrictions d'accès définies pour l'abonnement][1] vérifie si le sujet SNS a une politique basée sur les ressources qui contient un `Principal` de `*`, et un `Action` avec la permission `sns:Subscribe`. Cette combinaison donne à quiconque la capacité de s'abonner au sujet SNS et de recevoir ses notifications. 

En utilisant le cadre de notation de gravité Cloud Security, la règle serait notée comme suit :

- **Score de probabilité** : Très Probable
  - **Vecteur d'attaque** : Aucune autorisation
    - Le vecteur d'attaque est marqué comme "Aucune autorisation" car la politique basée sur les ressources contient un `*`. Ce wildcard accorde à quiconque la capacité d'agir sur la ressource. Aucune authentification ni autorisation n'est requise pour exploiter la misconfiguration.
  - **Accessibilité** : Publique
    - L'accessibilité est marquée comme "Publique" car la mauvaise configuration peut être exploitée sur Internet via sa politique basée sur les ressources. Aucun accès réseau spécifique n'est requis.
- **Impact** : Moyen
  - L'impact est marqué comme "Moyen" en raison du fait que la confidentialité de la ressource est affectée. Un adversaire qui exploite cette misconfiguration peut recevoir des messages envoyés par le sujet SNS.
- **Score de gravité** : Très probable x Moyen = Élevé
  - Le score de gravité final est Élevé. C'est parce qu'une probabilité très probable mélangée à un impact moyen donne un score global Élevé.

#### Exemple 2 : Les instances EC2 devraient appliquer IMDSv2 {#example-2-ec2-instances-should-enforce-imdsv2}

La règle de détection pour [les instances EC2 devraient appliquer IMDSv2][2] vérifie si une instance EC2 utilise la version 1 du service de métadonnées d'instance ([IMDSv1][3]), qui est vulnérable aux attaques courantes des applications web. Si elle est exploitée, un adversaire peut obtenir l'accès aux identifiants IAM stockés dans l'IMDS et les utiliser pour accéder aux ressources dans le compte AWS.

En utilisant le cadre de notation de gravité Cloud Security, la règle serait notée comme suit :

- **Score de probabilité** : Possible
  - **Vecteur d'attaque** : Vulnérabilité
    - Le vecteur d'attaque est marqué comme "Vulnérabilité". C'est parce que l'exploitation de cette misconfiguration nécessite que la ressource contienne un composant vulnérable, tel qu'un logiciel vulnérable exécuté sur l'instance EC2, qui peut être exploité pour effectuer des attaques de [falsification de requête côté serveur][4].
  - **Accessibilité** : Privé
    - L'accessibilité est marquée comme "Privée", car l'instance EC2 n'a pas été explicitement rendue publique.
- **Impact** : Moyen
  - L'impact est marqué comme "Moyen" en raison des impacts sur la confidentialité de l'instance EC2. Un adversaire pourrait accéder à l'IMDS et potentiellement obtenir des identifiants IAM associés à la ressource.
- **Score de gravité** : Possible x Moyen = Moyen
  - Le score de gravité final est "Moyen". C'est parce qu'une probabilité possible mélangée à un impact moyen donne un score global de Moyen.

## CVSS 4.0 {#cvss-40}

Les vulnérabilités de sécurité dans le cloud utilisent la version 4.0 du Système de notation des vulnérabilités communes ([CVSS 4.0][5]) et se rabattent sur des versions antérieures (3.1, 3.0, 2) en l'absence de notation 4.0 pour déterminer un score de base pour une vulnérabilité. Il modifie ensuite le score de base pour tenir compte des éléments suivants :

- Si l'infrastructure sous-jacente est en fonctionnement et l'étendue de l'impact.
- L'environnement dans lequel l'infrastructure sous-jacente fonctionne. Par exemple, si l'environnement n'est pas en production, la gravité est abaissée.
- S'il existe une exploitation active pour une vulnérabilité donnée provenant de sources telles que le [catalogue CISA KEV][6].
- La probabilité d'exploitation, calculée et vérifiée à l'aide de [EPSS][7].

## Lectures complémentaires : {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/security/default_rules/aws-sns-topic-sns-topic-should-have-access-restrictions-set-for-subscription/
[2]: https://docs.datadoghq.com/fr/security/default_rules/aws-ec2-instance-ec2-instances-and-autoscaling-groups-should-enforce-imdsv2/
[3]: https://hackingthe.cloud/aws/general-knowledge/intro_metadata_service/
[4]: https://hackingthe.cloud/aws/exploitation/ec2-metadata-ssrf/
[5]: https://www.first.org/cvss/v4-0/
[6]: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
[7]: https://www.first.org/epss/