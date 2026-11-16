---
description: Découvrez comment fonctionne la nouvelle méthode de détection de valeur.
title: Nouvelle valeur
---
## Présentation {#overview}

La nouvelle méthode de détection de valeur émet une alerte lorsque des valeurs d'attribut jamais vues auparavant, telles qu'un nouvel utilisateur, un compte, une clé d'API ou un ID d'objet, apparaissent dans vos logs.

Consultez [Créer une règle][1] pour obtenir des instructions sur la configuration d'une règle de nouvelle valeur.

## Comment fonctionne la nouvelle méthode de détection de valeur {#how-the-new-value-detection-method-works}

Une règle de détection de nouvelle valeur :

- Apprend les valeurs des champs que vous avez sélectionnés, tels que `@userIdentity.arn`.
- Apprend en enregistrant les valeurs sur une période d'apprentissage ou utilise une méthode de seuil qui ne nécessite pas de période d'apprentissage. Consultez [Durée d'apprentissage](#learning-duration) pour plus d'informations.
- Déclenche un signal lorsqu'une valeur apparaît qui n'a pas été observée dans le périmètre actuel.
- Oublie une valeur apprise si celle-ci n'a pas été observée pendant le nombre de jours défini dans l'option [Oublier la valeur](#forget-value). Si la valeur a été oubliée, la règle émet une alerte lorsque la valeur réapparaît.

### Options de configuration {#configuration-options}

#### Détecter les nouvelles valeurs {#detect-new-values}

{{< img src="security/security_monitoring/detection_rules/new_value/detect_new_value.png" alt="Requête d'une règle de nouvelle valeur avec le paramètre de détection de nouvelle valeur mis en surbrillance" style="width:100%;" >}}

Le champ {{< ui >}}Detect new value{{< /ui >}} définit les attributs contenant les valeurs à apprendre. Vous pouvez ajouter jusqu'à cinq attributs.

#### Champs de regroupement {#group-by-fields}

{{< img src="security/security_monitoring/detection_rules/new_value/group_by.png" alt="Champ de regroupement de la requête d'une règle de nouvelle valeur mis en surbrillance" style="width:100%;" >}}

Le champ `group by` définit le périmètre dans lequel les nouvelles valeurs sont évaluées, par exemple par compte.

#### Durée d'apprentissage {#learning-duration}

{{< img src="security/security_monitoring/detection_rules/new_value/learning_duration.png" alt="Requête d'une règle de nouvelle valeur avec le paramètre de durée d'apprentissage mis en surbrillance" style="width:100%;" >}}

La durée d'apprentissage propose les options suivantes :
- {{< ui >}}for all new values{{< /ui >}} : La règle se déclenche sur toute nouvelle valeur.
- {{< ui >}}after the first seen value{{< /ui >}} : La règle se déclenche sur toute nouvelle valeur après que celle-ci a été observée une fois.
- {{< ui >}}after{{< /ui >}} : Définissez la durée pendant laquelle la règle apprend les valeurs pour les champs sélectionnés. Par exemple, si vous sélectionnez {{< ui >}}after 7 days{{< /ui >}}, la règle apprend les valeurs pendant les sept premiers jours, puis se déclenche sur toute nouvelle valeur après ces sept jours. La durée d'apprentissage maximale est de 30 jours.

#### Oublier la valeur {#forget-value}

{{< img src="security/security_monitoring/detection_rules/new_value/forget_after.png" alt="Section des autres paramètres d'une règle de nouvelle valeur montrant l'option d'oubli après" style="width:40%;" >}}

L'option [Forget value][2] détermine pendant combien de temps la règle garde une valeur connue. Une fois cette période écoulée, la valeur est oubliée et la règle alerte à nouveau sur cette valeur. Le nombre maximal de jours pour {{< ui >}}Forget value{{< /ui >}} est de 30 jours.

[1]: /fr/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule?cloud_siem_detection_rule_detection_method=new_value
[2]: /fr/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule?cloud_siem_detection_rule_detection_method=new_value&cloud_siem_detection_rule_type=real_time_rule#forget-value-rt-new-value