---
aliases:
  - /fr/rx9-tkr-e6b
cloud: aws
disable_edit: true
kind: documentation
rule_category:
  - Configuration de cloud
scope: ec2
security: compliance
source: ec2
title: S'assurer que le groupe de sécurité par défaut de chaque VPC restreint l'ensemble du trafic
type: security_rules
---
## Présentation

## Description

À chaque VPC est associé un groupe de sécurité par défaut dont les paramètres initiaux refusent tout le trafic entrant, autorisent tout le trafic sortant et autorisent tout trafic entre les instances assignées au groupe de sécurité. Si vous ne spécifiez aucun groupe de sécurité lorsque vous lancez une instance, celle-ci est automatiquement assignée à ce groupe de sécurité par défaut. Les groupes de sécurité permettent un filtrage dynamique du trafic réseau entrant et sortant vers des ressources AWS.

Configurez votre groupe de sécurité par défaut de façon à restreindre l'ensemble du trafic. Afin de respecter cette recommandation, mettez à jour le groupe de sécurité par défaut du VPC par défaut dans chaque région. Tout nouveau VPC contient automatiquement un groupe de sécurité par défaut que vous devez corriger afin de respecter cette recommandation.

**Remarque** : lors de l'implémentation de cette recommandation, les logs de flux VPC sont essentiels pour déterminer les ports minimums requis par les systèmes pour fonctionner correctement : en effet, ces logs peuvent enregistrer toutes les acceptations et tous les rejets de paquets effectués conformément aux groupes de sécurité actuels. Cela élimine en grande partie le principal obstacle à la méthode du moindre privilège en permettant la détection du nombre minimum de ports requis par les systèmes dans l'environnement. Même si les logs de flux VPC ne sont pas adoptés comme mesure de sécurité permanente, ils doivent être utilisés pour identifier et configurer les groupes de sécurité avec privilège minimum.

## Meilleure pratique

Le fait de configurer tous les groupes de sécurité par défaut des VPC de façon à restreindre l'ensemble du trafic incite à créer des groupes de sécurité avec privilège minimum et à mieux placer les ressources AWS dans les groupes de sécurité, ce qui permet ainsi de réduire l'exposition de ces ressources.

## Remédiation

Les membres du groupe de sécurité doivent procéder comme suit pour implémenter la recommandation :

1. Identifier les ressources AWS qui existent dans le groupe de sécurité par défaut
2. Créer un ensemble de groupes de sécurité avec privilège minimum pour ces ressources
3. Placer les ressources dans ces groupes de sécurité
4. Supprimer les ressources mentionnées à l'étape 1 du groupe de sécurité par défaut `Security Group State` en se connectant à l'AWS Management Console sur [https://console.aws.amazon.com/vpc/home][1] et en répétant ces étapes pour tous les VPC, y compris le VPC par défaut dans chaque région AWS. 
5. Dans le volet de gauche, cliquer sur Security Groups 
6. Pour chaque groupe de sécurité par défaut, effectuer les actions suivantes :
    1. Sélectionner le groupe de sécurité par défaut
    2. Cliquer sur l'onglet Inbound Rules
    3. Supprimer toute règle de trafic entrant
    4. Cliquer sur l'onglet Outbound Rules
    5. Supprimer toute règle de trafic entrant
    6. Conseillé : les groupes IAM vous permettent de modifier le champ « name ». Une fois que vous avez terminé de corriger les règles de groupes par défaut pour tous les VPC dans toutes les régions, modifiez ce champ et ajoutez un message comme « NE PAS UTILISER. NE PAS AJOUTER DE RÈGLES »

## Impact

L'implémentation de cette recommandation dans un VPC existant qui contient des ressources d'exploitation nécessite de planifier très soigneusement la migration, car les groupes de sécurité par défaut risquent d'activer de nombreux ports inconnus. L'activation des logs de flux VPC (pour les acceptations) dans un environnement existant connu comme étant inviolable permet de révéler les ports actuellement utilisés pour que chaque instance puisse communiquer normalement.

## Valeur par défaut

Aucune

## Références

1. CCE-79201-0 
2. [http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-network-security.html][2]
3. CIS CSC v6.0 #9.2

## Contrôles CIS

14.6 Protect Information through Access Control Lists (Protection des informations à l'aide de listes de contrôle d'accès) : Protéger toutes les informations stockées sur les systèmes grâce à des listes de contrôle d'accès spécifiques aux systèmes de fichiers, partages réseau, revendications, applications ou bases de données. Ces contrôles permettent d'appliquer le principe selon lequel chaque personne doit uniquement avoir accès aux informations dont elle a besoin pour exercer ses responsabilités.         

[1]: https://console.aws.amazon.com/vpc/home
[2]: http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-network-security.html