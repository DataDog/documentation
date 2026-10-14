---
description: Évaluez votre posture de sécurité API par rapport aux cadres de conformité
  aux normes industrielles en utilisant App and API Protection.
further_reading:
- link: security/cloud_security_management/misconfigurations/frameworks_and_benchmarks
  tag: Documentation
  text: Cadres de conformité et benchmarks Cloud Security.
- link: https://owasp.org/API-Security/editions/2023/en/0x00-header/
  tag: Externe
  text: OWASP API Security Top 10 2023
title: Compliance
---
## Présentation {#overview}

API Posture Compliance vous permet d'évaluer de façon continue votre posture de sécurité API par rapport aux cadres de conformité aux normes industrielles. Il associe les règles de détection de sécurité API intégrées de Datadog aux contrôles des cadres de conformité et fournit un score de posture en temps réel indiquant quels contrôles passent ou échouent pour vos services.

Contrairement à [Cloud Security compliance][1], qui évalue les erreurs de configuration de l'infrastructure cloud et les risques liés à l'identité, API Posture Compliance se concentre exclusivement sur **les constatations de sécurité API** : menaces et vulnérabilités détectées dans le trafic atteignant vos API d'application.

{{< img src="security/application_security/api_posture/aap_compliance_framework_detail.png" alt="La page de détails du cadre OWASP API Security Top 10 affiche un score de posture, les résultats en échec et une répartition par gravité des règles en échec par exigence." style="width:100%;">}}

## Cadres pris en charge {#supported-frameworks}

### OWASP API Security Top 10 (2023) {#owasp-api-security-top-10-2023}

L'OWASP API Security Top 10 identifie les risques de sécurité les plus critiques pour les API. Datadog associe ses règles de détection de sécurité API aux dix catégories :

| Catégorie | Nom | Description |
|----------|------|-------------|
| API1:2023 | Autorisation au niveau de l'objet défaillante | Les API ne parviennent pas à vérifier si un utilisateur est autorisé à accéder à des objets spécifiques, permettant aux attaquants de lire ou de manipuler des données appartenant à d'autres utilisateurs. |
| API2:2023 | Authentification défaillante | Des mécanismes d'authentification défectueux ou manquants permettent aux attaquants de voler des jetons, d'usurper l'identité d'utilisateurs ou de contourner entièrement les contrôles de connexion. |
| API3:2023 | Autorisation au niveau de la propriété de l'objet défaillante | Les API exposent des propriétés d'objet sensibles que les utilisateurs ne devraient pas être autorisés à lire ou à écrire, permettant des attaques par assignation de masse ou fuite de données. |
| API4:2023 | Consommation illimitée des ressources |  Les API n'imposent aucune limite à la taille ou au débit des requêtes, ce qui facilite les attaques par déni de service ou l'abus des ressources en aval et peut entraîner une augmentation des coûts tiers. |
| API5:2023 | Autorisation au niveau de la fonction défaillante | Des contrôles d'accès inappropriés permettent à des utilisateurs non autorisés d'invoquer des fonctions API d'administration ou privilégiées non destinées à leur rôle. |
| API6:2023 | Accès illimité aux flux métier sensibles | Les flux métier exposés tels que le paiement ou la connexion peuvent être automatisés et exploités à grande échelle sans limites de débit ou détection d'anomalies appropriées. |
| API7:2023 | Falsification de requête côté serveur | Les API effectuent des requêtes HTTP côté serveur vers des URL fournies par l'attaquant, exposant potentiellement des services internes, des métadonnées cloud ou d'autres endpoints sensibles. |
| API8:2023 | Configuration de sécurité incorrecte | Des paramètres par défaut non sécurisés, des messages d'erreur détaillés, un stockage cloud ouvert ou l'absence de renforcement de la sécurité laissent les API exposées à des attaques opportunistes. |
| API9:2023 | Gestion inappropriée de l'inventaire | Des versions d'API obsolètes, non documentées ou fantômes restent accessibles sans surveillance, élargissant la surface d'attaque au-delà de ce qui est activement maintenu. |
| API10:2023 | Consommation non sécurisée d'API | Faire confiance aux réponses d'API tierces sans validation appropriée expose l'application à des attaques par injection, à des données inattendues ou à une compromission en aval. |

## Fonctionnement {#how-it-works}

- **Règles de détection** : Chaque règle de détection de sécurité Datadog API est taguée avec les contrôles OWASP qu'elle couvre. Lorsqu'une règle se déclenche et génère un résultat, le contrôle associé est marqué comme **en échec** pour le service affecté.
- **Score de posture** : Le score de posture reflète le ratio de contrôles entièrement réussis par rapport à ceux ayant au moins un résultat en échec. Le score est calculé en utilisant la même méthodologie que les [scores de posture Cloud Security][3].
- **Page Compliance Frameworks** : La [page Compliance Frameworks][4] répertorie tous les cadres disponibles pour votre contexte de sécurité API. Pour chaque cadre, vous pouvez examiner les détails au niveau du contrôle, filtrer par gravité et ouvrir un panneau latéral de résultats pour enquêter sur des événements de sécurité API individuels.

## Voir votre posture de conformité {#view-your-compliance-posture}

Accédez à [{{< ui >}}Security{{< /ui >}} > {{< ui >}}App & API Protection{{< /ui >}} > {{< ui >}}Compliance{{< /ui >}}][4] pour ouvrir la page Compliance Frameworks. Vous pouvez effectuer les opérations suivantes :
- Sélectionnez un cadre (par exemple, OWASP API Security Top 10) pour voir le statut de réussite/échec par contrôle.
- Cliquez sur un contrôle en échec pour voir la liste des résultats de sécurité API qui ont causé cet échec.
- Ouvrez le panneau latéral d'un résultat pour voir l'endpoint affecté, la gravité et les étapes de remédiation recommandées.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/cloud_security_management/misconfigurations/frameworks_and_benchmarks/
[2]: https://owasp.org/API-Security/editions/2023/en/0x00-header/
[3]: /fr/glossary/#security-posture-score
[4]: https://app.datadoghq.com/security/compliance/home?context=aap