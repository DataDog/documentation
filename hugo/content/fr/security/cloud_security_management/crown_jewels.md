---
further_reading:
- link: /security/cloud_security_management/misconfigurations/
  tag: Documentation
  text: Mauvaises configurations de Cloud Security
- link: /security/cloud_security_management/vulnerabilities/
  tag: Documentation
  text: Cloud Security Vulnerabilities
- link: /security/sensitive_data_scanner/
  tag: Documentation
  text: Sensitive Data Scanner
- link: https://www.datadoghq.com/blog/runtime-prioritization-engine/
  tag: Blog
  text: Priorisez les résultats de sécurité avec le Datadog Runtime Prioritization
    Engine
- link: https://www.datadoghq.com/blog/cisa-bod-26-04-vulnerability-prioritization/
  tag: Blog
  text: Comment la directive BOD 26-04 de la CISA modifie la priorisation des vulnérabilités
title: Crown Jewels
---
## Présentation {#overview}

Crown Jewels est un inventaire de vos ressources cloud les plus critiques, détectées automatiquement à partir de la télémétrie que vous envoyez déjà à Datadog. La liste constitue le point de départ pour prioriser les travaux de remédiation dans Cloud Security : vous pouvez trier, filtrer et acheminer les vulnérabilités, les mauvaises configurations et les risques liés à l'identité qui sont associés à Crown Jewels différemment du reste de vos résultats.

La plupart des équipes de sécurité ont plus de résultats qu'elles ne peuvent en traiter, mais en sachant quelles ressources comptent le plus, vous pouvez commencer par traiter le sous-ensemble de résultats qui nécessitent une attention prioritaire.

Datadog génère la liste initiale pour vous en analysant la télémétrie existante, notamment l'APM, les logs et le stockage cloud. À partir de là, vous pouvez organiser la liste pour qu'elle corresponde à ce qui compte le plus dans votre environnement.

## Ce qui est détecté {#what-gets-detected}

Crown Jewels évalue trois types de ressources :

| Type de ressource | Données évaluées |
|---|---|
| Services | Services instrumentés par APM et services inférés |
| Bases de données | Instances de base de données observées via APM et Database Monitoring |
| Buckets | Buckets S3 observés par Agentless Scanning et Sensitive Data Scanner |

Datadog ajoute une ressource à la liste lorsqu'un ou plusieurs signaux de détection indiquent que la ressource traite des données sensibles, contient des identifiants ou occupe une position structurellement importante dans votre environnement.

### Signaux de détection {#detection-signals}

Crown Jewels ne peut effectuer de détections qu'en fonction des sources de télémétrie activées pour une ressource donnée. La couverture évolue avec la profondeur de votre instrumentation Datadog ; plus votre instrumentation est riche, plus la surface que Datadog peut évaluer est grande, et donc plus votre liste détectée automatiquement peut être précise. 

Si une source de télémétrie pour un type de signal est manquante et que Datadog ne peut pas remplir automatiquement les ressources associées, vous pouvez toujours ajouter des ressources manuellement.

| Signal | Source | Exemple |
|---|---|---|
| Secrets dans les spans APM | Sensitive Data Scanner sur APM | Un service avec des clés d'accès AWS observées dans les attributs de span |
| Champs sensibles dans les logs | Sensitive Data Scanner sur les logs | Un service avec des numéros de carte de crédit, des e-mails ou des identifiants détectés dans les événements de log |
| Noms de colonnes sensibles | Sensitive Data Scanner sur APM | Une base de données avec des colonnes nommées `password`, `ssn`, `email`, etc. |
| Données sensibles au repos | Agentless Scanning + Sensitive Data Scanner | Un bucket S3 contenant des PII, des identifiants ou tout autre contenu sensible |
| Fan-in de dépendance de service | Carte des services APM | Un service à fort fan-in avec une large dépendance a un rayon d'impact majeur s'il est compromis.|
| Données sensibles dans le trafic API | App and API Protection | Un service exposant des endpoints avec des données sensibles comme des PII |

## Utilisez la liste pour filtrer les résultats {#use-the-list-to-filter-findings}

Chaque résultat de la liste Crown Jewels est marqué avec `@risk.is_crown_jewel:true`. Le tag se propage aux résultats associés à cette ressource via le modèle de données de sécurité de Datadog. Tous les éléments suivants seraient marqués comme des résultats Crown Jewels :

- Une mauvaise configuration sur une machine virtuelle attachée à un service Crown Jewels
- Une vulnérabilité dans une image de conteneur utilisée par un service Crown Jewels

Cette propagation vous permet d'utiliser `@risk.is_crown_jewel:true` comme filtre ou facette dans :

- **Vulnerability Explorer** pour concentrer la remédiation sur les résultats liés à des ressources critiques.
- **Misconfiguration Explorer** pour limiter le travail de renforcement aux actifs les plus importants.
- **Notifications** pour acheminer les notifications différemment pour les actifs de Crown Jewels.
- **Findings Automation** pour définir des modèles de remédiation personnalisés pour les résultats liés à Crown Jewels.

Vous pouvez combiner le filtre avec d'autres critères ; par exemple, vous pouvez filtrer le Vulnerability Explorer sur `severity:critical` ET `@risk.is_crown_jewel:true`.

## Examinez et modifiez la liste {#review-and-edit-the-list}

Pour afficher vos Crown Jewels, accédez à **Security** > **Settings** > **Cloud Security** > [**Crown Jewels**][1]. Datadog remplit automatiquement la liste avec des entrées indiquant :

- Le type et le nom de la ressource.
- Le signal de détection qui a déclenché l'inclusion.
- Un résumé des preuves sous-jacentes.

Considérez la liste générée automatiquement comme un brouillon que vous pouvez organiser afin qu'elle reflète ce qui est réellement critique pour votre entreprise. Vous pouvez effectuer les opérations suivantes :

- **Supprimez** les entrées qui ne correspondent pas à votre compréhension de ce qui est critique (par exemple, un service signalé en raison d'une chaîne d'URL de faible valeur).
- **Ajoutez** les ressources que Datadog n'a pas détectées automatiquement mais que vous savez être critiques pour votre entreprise.

## Confidentialité et traitement des données {#privacy-and-data-handling}

Crown Jewels s'exécute sur la télémétrie que vous avez déjà envoyée à Datadog. Il ne déplace pas les données en dehors de votre compte Datadog et n'envoie pas de données à des tiers. La détection s'exécute dans la même infrastructure régionale que vos autres données Cloud Security.


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/crown-jewels