---
further_reading:
- link: /security/cloud_security_management/misconfigurations/
  tag: Documentation
  text: Configurations erronées de la sécurité cloud
- link: /security/cloud_security_management/vulnerabilities/
  tag: Documentation
  text: Vulnérabilités de la sécurité cloud
- link: /security/sensitive_data_scanner/
  tag: Documentation
  text: Scanner de données sensibles
title: Joyaux de la Couronne
---
{{< callout url=https://www.datadoghq.com/product-preview/runtime-prioritization-engine/
 btn_hidden="false" header="Rejoignez la Preview !">}}
Les Joyaux de la Couronne sont en Preview. Utilisez ce formulaire pour soumettre votre demande aujourd'hui.
{{< /callout >}}

## Aperçu {#overview}

Les Joyaux de la Couronne constituent un inventaire de vos ressources cloud les plus critiques, détectées automatiquement à partir de la télémétrie que vous envoyez déjà à Datadog. La liste est le point de départ pour prioriser le travail de remédiation en Cloud Security : vous pouvez trier, filtrer et acheminer les vulnérabilités, les configurations erronées et les risques d'identité liés à des Joyaux de la Couronne différemment du reste de vos résultats.

La plupart des équipes de sécurité ont plus de résultats qu'elles ne peuvent traiter, mais en sachant quelles ressources sont les plus importantes, vous pouvez commencer à traiter le sous-ensemble de résultats qui nécessite une attention prioritaire.

Datadog génère la liste initiale pour vous en analysant la télémétrie existante, y compris APM, les journaux et le stockage cloud. À partir de là, vous pouvez affiner la liste pour correspondre à ce qui est le plus important dans votre environnement.

## Ce qui est détecté {#what-gets-detected}

Les Joyaux de la Couronne évaluent trois types de ressources :

| Type de ressource | Données évaluées |
|---|---|
| Services | Services instrumentés par APM et services inférés |
| Bases de données | Instances de bases de données observées via APM et Database Monitoring |
| Buckets | S3 buckets observés par Agentless Scanning et Sensitive Data Scanner |

Datadog ajoute une ressource à la liste lorsqu'un ou plusieurs signaux de détection indiquent que la ressource gère des données sensibles, détient des identifiants ou occupe une position structurellement importante dans votre environnement.

### Signaux de détection {#detection-signals}

Joyaux de la Couronne ne peut effectuer des détections qu'en fonction des sources de télémétrie activées pour une ressource donnée. La couverture évolue avec la profondeur de votre instrumentation Datadog ; plus votre instrumentation est riche, plus la surface que Datadog peut évaluer est grande, et donc plus votre liste détectée automatiquement peut être précise. 

Si une source de télémétrie pour un type de signal est manquante et que Datadog ne peut pas peupler automatiquement les ressources associées, vous pouvez toujours ajouter des ressources manuellement.

| Signal | Source | Exemple |
|---|---|---|
| Secrets in APM spans | Sensitive Data Scanner on APM | Un service avec des clés d'accès AWS observées dans les attributs de span |
| Sensitive fields in logs | Sensitive Data Scanner on logs | Un service avec des numéros de carte de crédit, des e-mails ou des identifiants détectés dans des événements de logs |
| Noms de colonnes sensibles | Scanner de données sensibles sur APM | Une base de données avec des colonnes nommées `password`, `ssn`, `email`, etc. |
| Sensitive data at rest | Agentless Scanning + Sensitive Data Scanner | Un bucket S3 contenant des PII, des identifiants ou d'autres contenus sensibles |
| Service dependency fan-in | APM service map | Un service avec un fan-in élevé et de larges dépendances présente un rayon d'impact majeur en cas de compromission |
| Sensitive Data in API traffic | App and API Protection | Un service exposant des endpoints avec des données sensibles telles que PII |

## Utilisez la liste pour filtrer les résultats {#use-the-list-to-filter-findings}

Chaque résultat de la liste des Joyaux de la Couronne est étiqueté avec `@risk.is_crown_jewel:true`. L'étiquette se propage aux résultats associés à cette ressource à travers le modèle de données de sécurité de Datadog. Tous les éléments suivants seraient marqués comme des résultats des Joyaux de la Couronne :

- Une configuration erronée sur une machine virtuelle attachée à un service de Joyaux de la Couronne
- Une vulnérabilité dans une image de conteneur utilisée par un service de Joyaux de la Couronne

Cette propagation vous permet d'utiliser `@risk.is_crown_jewel:true` comme filtre ou facette dans :

- **Vulnerability Explorer** pour concentrer la remédiation sur les résultats liés aux ressources critiques.
- **Misconfiguration Explorer** pour limiter le travail de durcissement aux actifs qui comptent le plus.
- **Notifications** pour acheminer les notifications différemment pour les actifs des Joyaux de la Couronne.
- **Findings Automation** pour définir des modèles de remédiation personnalisés pour les résultats liés aux Joyaux de la Couronne.

Vous pouvez combiner le filtre avec d'autres critères ; par exemple, vous pouvez filtrer le Vulnerability Explorer à `severity:critical` ET `@risk.is_crown_jewel:true`.

## Examinez et modifiez la liste {#review-and-edit-the-list}

Pour voir vos Crown Jewels, allez à **Security** > **Settings** > **Cloud Security** > [**Crown Jewels**][1]. Datadog remplit automatiquement la liste avec des entrées montrant :

- Le type et le nom de la ressource.
- Le signal de détection qui a déclenché l'inclusion.
- Un résumé des preuves sous-jacentes.

Considérez la liste générée automatiquement comme un brouillon que vous pouvez affiner pour qu'elle reflète ce qui est réellement critique pour votre entreprise. Vous pouvez effectuer les opérations suivantes :

- **Supprimez** les entrées qui ne correspondent pas à votre compréhension de ce qui est critique (par exemple, un service signalé en raison d'une chaîne d'URL de faible valeur).
- **Ajoutez** des ressources que Datadog n'a pas auto-détectées mais dont vous savez qu'elles sont critiques pour votre entreprise.

## Confidentialité et gestion des données {#privacy-and-data-handling}

Les Joyaux de la Couronne fonctionnent sur la télémétrie que vous avez déjà envoyée à Datadog. Cela ne déplace pas les données en dehors de votre compte Datadog ni n'envoie de données à des tiers. La détection s'exécute dans la même infrastructure régionale que vos autres données de Cloud Security.


## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/crown-jewels