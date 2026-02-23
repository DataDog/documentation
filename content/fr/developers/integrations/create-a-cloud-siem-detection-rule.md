---
aliases:
- /fr/developers/integrations/create-an-integration-detection-rule
description: Découvrez comment créer une règle de détection Cloud SIEM pour votre
  intégration.
further_reading:
- link: https://docs.datadoghq.com/security/cloud_siem/detection_rules
  tag: Documentation
  text: Règles de détection des logs
title: Créer une règle de détection Cloud SIEM
---

## Présentation

Ce guide décrit les étapes de création d'une règle de détection Cloud SIEM et présente les bonnes pratiques pour sa configuration.

[Datadog Cloud SIEM (Security Information and Event Management)][1] unifie les équipes de développement, d'exploitation et de sécurité sur une seule plateforme. Datadog fournit un ensemble de règles de détection prêtes à l'emploi pour de nombreuses fonctionnalités et intégrations. Vous pouvez consulter ces règles dans votre [liste de règles de détection SIEM][2].

Les règles de détection Cloud SIEM de Datadog sont prêtes à l'emploi et peuvent être directement intégrées à vos intégrations.

Pour créer une intégration Datadog, consultez la section [Créer une intégration][3].

## Créer une règle de détection
### Créer une règle de détection
Pour améliorer la visibilité des utilisateurs sur la sécurité, les partenaires peuvent créer leurs propres règles de détection prêtes à l'emploi dans le cadre d'une intégration Datadog. Ces règles peuvent être ajoutées comme ressources prêtes à l'emploi.

Dans votre sandbox Datadog, [créez une nouvelle règle][4].

{{< img src="developers/integrations/detection_rule.png" alt="La page Créer une nouvelle règle dans l'espace Règles de détection de Datadog" style="width:100%;" >}} 

Suivez les [bonnes pratiques](#bonnes-pratiques-de-configuration) décrites dans ce guide pour configurer votre règle.

### Importer votre règle de détection

Dans votre intégration, sur la plateforme de développement d'intégrations, accédez à l'onglet Content. Sélectionnez ensuite **Import Detection Rule** pour choisir parmi les règles disponibles. Vous pouvez en inclure jusqu'à 10 avec votre intégration.

{{< img src="developers/integrations/content_tab.png" alt="L'onglet Content dans la plateforme de développement" style="width:100%;" >}} 


## Vérifier votre règle de détection en production

Pour voir la règle de détection prête à l'emploi, le carré d'intégration concerné doit être `Installed` dans Datadog, et Cloud SIEM doit être activé. 

1. Recherchez votre règle dans la [liste des règles de détection][2], puis cliquez pour l'afficher. 
2. Assurez-vous que les logos s'affichent correctement.
3. Vérifiez que la règle est bien activée.

### Exemple d'une règle de détection bien définie

Sélection d'un type de règle et définition des requêtes de recherche :

{{< img src="developers/integrations/SIEM_detection_rule_top.png" alt="Étapes 1 à 3 d'un formulaire de création de règle de détection rempli" style="width:90%;" >}}

Définition des cas de la règle et rédaction du message de notification :

{{< img src="developers/integrations/SIEM_detection_rule_bottom.png" alt="Étapes 4 et 5 d'un formulaire de création de règle de détection rempli" style="width:90%;" >}}

Pour plus d'informations, consultez la documentation sur [la configuration d'une règle de détection][7].

## Comprendre les messages de validation

### Analyse JSON de la règle
```
File=<FILE_PATH> in collection=<COLLECTION> is an invalid JSON: error=<ERROR>
```
Cette erreur signifie que le fichier JSON situé à `<FILE_PATH>` est invalide.

### ID de règle/nom de la règle
```
partnerRuleId is empty for rule name="<RULE_NAME>" - partnerRuleId=<NEW_RULE_ID> is available
```
Un `partnerRuleId` est requis pour chaque règle et est manquant. Utilisez l'ID généré `<NEW_RULE_ID>`.

```
partnerRuleId=<RULE_ID> is in the incorrect format for rule name="<RULE_NAME>", it must follow the format=^[a-z0-9]{3}-[a-z0-9]{3}-[a-z0-9]{3}$ - partnerRuleId=<NEW_RULE_ID> is available
```
Le nom de la règle n'est pas au format attendu. Utilisez l'ID généré `partnerRuleId: <NEW_RULE_ID>` pour corriger l'erreur.

```
Duplicate partnerRuleId=<RULE_ID> for rule name="<RULE_NAME>" - <RULE_ID_KEY> must be unique and it is already used in rule_ids="<RULE_IDS>" - <RULE_ID_KEY>=<NEW_RULE_ID> is available
```
Chaque `partnerRuleId` doit être unique. L'ID actuel est déjà utilisé. Un `partnerRuleId` nouvellement généré est disponible.

```
Duplicate name="<RULE_NAME>" for <RULE_ID_KEY>=<RULE_ID> - name must be unique.
```
Chaque nom de règle doit être unique. Le nom actuel est déjà utilisé. Modifiez-le pour qu'il soit unique.

### Tags MITRE
```
The rule with partnerRuleId=<RULE_ID> contains a MITRE tag tactic but it does not contain the tag `security:attack`, please add it
```
Lorsqu'une règle contient un tag MITRE `tactic:<TAG_VALUE>`, le tag `security:attack` doit également être présent dans la liste des tags.

```
The MITRE tactic/technique tag=<TAG> for partnerRuleId=<RULE_ID> appears to be incorrect (i.e. it does not exist in the MITRE framework).
```
Le tag tactic/technique spécifié `<TAG>` ne respecte pas le [cadre MITRE](https://attack.mitre.org/). Veuillez sélectionner un tag MITRE valide.

### Cas
```
The case status <CASE_STATUS> for <RULE_ID_KEY>=<RULE_ID> is incorrect, it should be one of <STATUS_LIST>.
```
Le statut d'un cas doit être soit `CRITICAL`, `HIGH`, `MEDIUM`, `LOW` ou `INFO`.

```
The case ordering for partnerRuleId=<RULE_ID> is incorrect, please modify to order cases from the highest severity to the lowest.
```
Chaque définition de règle doit être classée par ordre décroissant de gravité. Veuillez réorganiser les cas selon l'ordre `CRITICAL`, `HIGH`, `MEDIUM`, `LOW` et `INFO`.

### Tags source
```
source=<SOURCE> in the tags of the rule with partnerRule=<RULE_ID> is not supported by Datadog documentation.
```
Contactez Datadog pour résoudre ce problème.

### Validation du contenu de la règle/mise à jour de la règle
```
<RULE_ID_KEY>=<RULE_ID> name="<RULE_NAME>" - error=<ERROR>
```
Contactez Datadog pour résoudre ce problème.

```
Internal failure for <RULE_ID_KEY>=<RULE_ID> name="<RULE_NAME>"- Contact Datadog Team
```
Contactez Datadog pour résoudre ce problème.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/security/cloud_siem/
[2]: https://app.datadoghq.com/security/rules?deprecated=hide&groupBy=tactic&product=siem&sort=rule_name 
[3]: https://docs.datadoghq.com/fr/developers/integrations/agent_integration/
[4]: https://app.datadoghq.com/security/rules/new?product=siem
[5]: https://github.com/DataDog/integrations-extras 
[6]: https://github.com/DataDog/marketplace
[7]: https://docs.datadoghq.com/fr/security/cloud_siem/detection_rules