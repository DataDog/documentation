---
further_reading:
- link: /security/automation_pipelines
  tag: Documentation
  text: Pipelines d'automatisation
- link: /security/manual_severity_adjustment/
  tag: Documentation
  text: Ajustement de la gravité
products:
- icon: cloud-security-management
  name: Cloud Security
  url: /security/cloud_security_management/
- icon: security-code-security
  name: Code Security
  url: /security/code_security/
- icon: app-sec
  name: Protection des applications et des API
  url: /security/application_security/
- icon: security-workload-security
  name: Workload Protection
  url: /security/workload_protection/
title: Règles de modification de la gravité
---
{{< product-availability >}}

Configurez des règles de modification de la gravité pour ajuster la gravité des résultats afin de refléter le contexte métier de votre organisation. Par exemple, rétrogradez les résultats sur des environnements isolés pour réduire le bruit, ou augmentez la gravité des résultats sur les bases de données contenant des informations personnellement identifiables (PII) afin qu'ils reçoivent une attention immédiate.

## Créer une règle de modification de la gravité {#create-a-severity-modifier-rule}

1. Dans Datadog, accédez à **Security** > **Settings** > [**Findings Automation**][2]. Cliquez sur **Add a New Rule**, puis sélectionnez **Modify Severity Level**. La page Create a New Rule s'ouvre.
1. Sous **Rule name**, saisissez un nom descriptif pour la règle; par exemple, « Increase severity for services accessing PII databases ».
1. Ajoutez vos critères de règle dans les champs suivants :
    - **L'un de ces types** : Les types de résultats que la règle doit vérifier. Les types disponibles incluent :
      - Vulnérabilité du code d'exécution
      - Vulnérabilité du code statique
      - Vulnérabilité de bibliothèque
      - Secret
      - Infrastructure en tant que code
      - Vulnérabilité d'image de conteneur
      - Vulnérabilité du host
      - Mauvaise configuration
      - Chemin d'attaque
      - Risque lié à l'identité
      - Sécurité des API
      - Activité de la charge de travail
    - **L'un de ces tags ou attributs** : Les tags ou attributs de ressource qui doivent correspondre pour que la règle s'applique.
1. Optionnellement, cliquez sur **Add Severity** pour filtrer les résultats par niveau de gravité. La règle correspond à la gravité ajustée par Datadog de chaque résultat, avant tout ajustement défini par l'utilisateur.
1. Définissez l'action de modification de la gravité :
    - **Définir sur un niveau spécifique** : Définit les résultats correspondants sur une gravité fixe. Choisissez parmi **Info / None**, **Low**, **Medium**, **High** ou **Critical**.
      <div class="alert alert-info"><strong>Info / None</strong> n'est valide que pour certains types de résultats ; consultez <a href="#severity-floors-by-finding-type">Severity floors by finding type</a>.</div>
    - **Shift up or down one level**: Increases or decreases the severity of matching findings by one level. See [Severity floors by finding type](#severity-floors-by-finding-type) for the lowest severity a finding type can shift down to, and [Evaluation order](#evaluation-order) for what happens when a finding is already at that bound.
1. Optionnellement, saisissez une **Description** expliquant pourquoi la règle s'applique. Ce texte apparaît dans le panneau de répartition de la gravité lorsqu'un utilisateur consulte un résultat modifié.
1. Cliquez sur **Enregistrer**. La règle s'applique immédiatement aux nouveaux résultats et commence à vérifier les résultats existants dans l'heure qui suit.

**Remarque** : Vous ne pouvez pas utiliser `@severity` ou `@severity_details.user_adjusted` dans la requête de règle. Les règles de modification de gravité sont évaluées par rapport à la gravité ajustée par Datadog (`@severity_details.adjusted.value`), et non par rapport à la valeur `@severity` stockée dans le résultat.

## Ordre d'évaluation {#evaluation-order}

Les règles de modification de gravité constituent la première étape du pipeline d'automatisation et s'exécutent avant les règles mute, due date, inbox et ticket creation. Au sein des règles de modification de gravité, Datadog utilise une politique de première correspondance : les résultats sont évalués par rapport à vos règles dans l'ordre, et la première règle correspondante est appliquée. Aucune autre règle de modificateur de gravité n'est évaluée pour ce résultat.

Une règle ne compte comme une correspondance que si l'application de son action modifie la gravité du résultat. Si l'action laisse la gravité inchangée (par exemple, une action de décalage ayant déjà atteint une limite de gravité, ou une action de définition ciblant la gravité actuelle du résultat), la règle ne correspond pas et Datadog continue d'évaluer les règles de modificateur de gravité suivantes pour ce résultat.

Comme les règles de modificateur de gravité sont exécutées en premier, toutes les règles d'automatisation en aval — y compris les règles mute — voient la gravité modifiée lorsqu'elles sont évaluées.

## Identifier les résultats modifiés {#identify-modified-findings}

Les résultats affectés par une règle de modificateur de gravité affichent un indicateur visuel dans les vues de liste de l'Explorer et dans l'en-tête du panneau latéral du résultat. Le survol de l'indicateur affiche la règle d'automatisation responsable du changement :

{{< img src="security/automation_pipelines/severity_pill_popover.png" alt="Un élément du Findings Explorer qui affiche une pastille de gravité avec un indicateur de modificateur. Une fenêtre contextuelle fournit plus d'informations sur la règle d'automatisation responsable de l'ajustement de la gravité du résultat." style="width:65%;" >}}

Pour les résultats disposant d'un score CVSS (vulnérabilité d'image de conteneur, vulnérabilité de host, vulnérabilité de bibliothèque et vulnérabilité de code d'exécution), la section de gravité du panneau latéral inclut également une répartition indiquant :
- Le niveau de gravité d'origine, le score CVSS et le vecteur CVSS avant modification.
- Le nom de la règle d'automatisation qui s'est déclenchée, avec un lien direct vers la règle.
- Le niveau de gravité résultant et le score CVSS ajusté.

{{< img src="security/automation_pipelines/severity_breakdown.png" alt="Un panneau latéral de résultat affichant la répartition de la gravité, avec la gravité d'origine, le score CVSS et le vecteur CVSS ; la règle d'automatisation qui a déclenché le changement ; ainsi que le niveau de gravité résultant et le score CVSS ajusté." style="width:100%;" >}}

## Severity floors by finding type {#severity-floors-by-finding-type}

Tous les types de résultats n'utilisent pas la même échelle de gravité. Le tableau suivant indique la gravité la plus basse disponible pour chaque type de résultat :

| Type de résultat | Gravité la plus basse |
|---|---|
| API Security | Info |
| Attack Path | Info |
| Identity Risk | Info |
| Misconfiguration | Info |
| Workload Activity | Info |
| Container Image Vulnerability | None |
| Host Vulnerability | None |
| Library Vulnerability | None |
| Infrastructure as Code | Low |
| Runtime Code Vulnerability | Low |
| Secret | Low |
| Static Code Vulnerability | Low |

**Info / None** n'est pas disponible pour les types de résultats qui utilisent **Low** comme gravité la plus basse. Inclure de tels types de résultats dans la règle et sélectionner **Info / None** entraîne une erreur de validation.

## Findings with Unknown severity {#findings-with-unknown-severity}

Les règles de modificateur de gravité traitent les résultats avec une gravité **Unknown** comme suit :

- **Shift action** : La règle ne correspond pas aux résultats avec une gravité **Unknown**. Comme la règle ne correspond pas, les règles de modificateur de gravité ultérieures peuvent toujours être évaluées pour ce résultat.
- **Set action** : Si la gravité **Unknown** est incluse dans le sélecteur de gravité de la règle, la règle correspond et remplace **Unknown** par la gravité cible spécifiée. Vous ne pouvez pas définir la gravité d'un résultat sur **Unknown** en utilisant une règle de modificateur de gravité.

## Résultats de vulnérabilité et scores CVSS {#vulnerability-findings-and-cvss-scores}

Pour les résultats de vulnérabilité qui ont un score CVSS ajusté par Datadog, un modificateur de gravité met également à jour le score ajusté stocké dans `@severity_details.user_adjusted`. Le score mis à jour est défini approximativement sur le point médian de la plage CVSS v3 de la gravité cible :

| Target severity | CVSS v3 range |
|---|---|
| None | 0.0 |
| Low | 0.1–3.9 |
| Medium | 4.0–6.9 |
| High | 7.0–8.9 |
| Critical | 9.0–10.0 |

Le vecteur CVSS d'origine n'est jamais modifié. Aucun vecteur synthétique n'est généré pour correspondre au score ajusté. Comme une règle ne correspond que lorsqu'elle modifie la gravité du résultat, le score n'est ajusté que lorsque la gravité elle-même change ; voir [Ordre d'évaluation](#evaluation-order).

## Auto-closed and passed findings {#auto-closed-and-passed-findings}

Les modificateurs de gravité ne sont ni effacés ni mis à jour pour les findings qui passent à l'état auto-fermé ou lorsque le résultat de l'évaluation est **pass**. Si la règle qui a modifié initialement un finding est ultérieurement modifiée ou supprimée, ces findings conservent la gravité définie lors de leur clôture.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/security/configuration/findings-automation?opened-sections=modify_severity