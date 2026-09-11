---
aliases:
- /fr/tracing/live_debugger/debug-with-bits/
description: Utilisez Bits Code pour créer et gérer des sessions Live Debugger à l'aide
  d'une interface conversationnelle.
further_reading:
- link: /bits_ai/bits_code/
  tag: Documentation
  text: Bits Code
- link: /tracing/live_debugger/
  tag: Documentation
  text: Live Debugger
- link: /dynamic_instrumentation/sensitive-data-scrubbing/
  tag: Documentation
  text: Nettoyage des données sensibles
- link: https://www.datadoghq.com/blog/live-debugger/
  tag: Blog
  text: Déboguez le code de production en direct sans redéployer avec Datadog Live
    Debugger
title: Bits Live Debugger
---
{{< beta-callout url="https://www.datadoghq.com/product-preview/debug-with-bits/" >}}
Bits Live Debugger est en préversion. Demandez l'accès pour rejoindre la liste d'attente.
{{< /beta-callout >}}

## Présentation {#overview}

Bits Live Debugger apporte une interface conversationnelle à Live Debugger pour enquêter sur les services en cours d'exécution via le langage naturel. Décrivez ce que vous souhaitez examiner, et Bits place des logpoints, récupère des instantanés de variables et interprète les résultats. Une fois que Bits a identifié une cause profonde, il peut suggérer des correctifs de code.

Toute activité de débogage passe par [Live Debugger][1], donc les mêmes [autorisations][2], limites de débit, comportements d'expiration automatique et [nettoyage des données sensibles][3] s'appliquent.

La fonctionnalité Bits Live Debugger n'est accessible que depuis la page Live Debugger.

<div class="alert alert-info">
Bits Live Debugger utilise <a href="/bits_ai/bits_code/">Bits Code</a> comme agent sous-jacent. Pendant la phase de préversion de Bits Live Debugger, les crédits d'IA Bits Code ne sont pas facturés lorsque les sessions sont démarrées via Live Debugger.
</div>

## Prérequis {#prerequisites}

Avant d'utiliser Bits Live Debugger :

- [Live Debugger][1] doit être activé pour le service cible. Consultez [Activer Live Debugger][7] pour plus de détails.
- Votre compte doit disposer des [autorisations][2] requises pour utiliser Live Debugger, y compris les autorisations de lecture, d'écriture et de capture de variables pour l'environnement cible.
- [Bits Code][5] doit être disponible dans votre organisation.
- [Intégration du code source][6] doit être configurée pour le service cible.

## Actions disponibles {#available-actions}

Bits peut effectuer les actions Live Debugger suivantes au cours d'une session de débogage :

| Action | Description |
|--------|-------------|
| Découvrir des services | Rechercher et valider les services disponibles pour le débogage dans un environnement donné. |
| Créer des points de journalisation | Ajouter des points de journalisation à un service en cours d'exécution à un emplacement de code spécifique. |
| Lister les points de journalisation de session | Afficher les points de journalisation actifs dans une session de débogage. |
| Désactiver les points de journalisation | Désactiver tous les points de journalisation dans une session de débogage. |
| Récupérer les données d'instantané | Récupérer les valeurs de variables capturées et le contexte d'exécution à partir d'un point de journalisation actif. |

Les points de journalisation créés par Bits suivent les mêmes règles que les points de journalisation créés manuellement. Ils sont en lecture seule, non bloquants et expirent automatiquement après la limite de temps configurée (10 minutes à 2 jours ; par défaut : 60 minutes). Bits ne peut pas modifier l'état de l'application ni altérer le flux de contrôle.

## Démarrer une session de débogage {#start-a-debugging-session}

1. Accédez à [Live Debugger][4] dans Datadog.
1. Dans la zone de chat de Bits Live Debugger, décrivez le problème que vous souhaitez examiner. Sélectionnez le service et l'environnement cibles avant de soumettre la requête.

   Bits effectue ensuite l'investigation automatiquement :
   - Il analyse les chemins de code pertinents dans le dépôt de code source connecté et peut poser des questions complémentaires pour formuler une hypothèse.
   - Il configure et active jusqu'à 5 points de journalisation aux emplacements de code pertinents pour capturer les données spécifiques dont il a besoin.
   - Il récupère et analyse les journaux et les instantanés de variables des points de journalisation actifs pour valider son hypothèse et formuler sa réponse.

1. Examinez la réponse de Bits et, éventuellement, explorez les détails des points de journalisation, les données capturées et les éventuels correctifs de code suggérés. Répondez dans le chat pour poursuivre l'investigation si nécessaire.
1. Pour désactiver les points de journalisation à tout moment, demandez à Bits ou cliquez sur le bouton {{< ui >}}Disable{{< /ui >}} sur un point de journalisation individuel ou sur la session.

**Remarque** : Bits désactive généralement les points de journalisation qu'il crée dès qu'il récupère les données dont il a besoin. Les points de journalisation expirent également automatiquement après la limite de temps configurée.

## Comportement et limitations {#behavior-and-limitations}

**Environnements multi-versions** : Lorsque plusieurs versions de code sont déployées dans l'environnement cible, le fichier cible peut différer selon les versions. Dans ce cas, Bits vous demande de confirmer la version cible avant de placer un point de journalisation. Cela évite que les points de journalisation ne soient placés sur des numéros de ligne incorrects.

**Prise en charge du langage** : Certaines fonctionnalités varient selon le langage. Par exemple, les expressions conditionnelles ne sont pas prises en charge pour tous les environnements d'exécution. Bits vous avertit lorsqu'une fonctionnalité demandée n'est pas disponible pour le langage du service cible.

**Données sensibles** : Le comportement de [nettoyage des données sensibles][3] qui s'applique aux points de journalisation créés manuellement s'applique également aux points de journalisation créés par Bits. Dans les environnements de production, les valeurs capturées non numériques et non booléennes sont expurgées par défaut.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/live_debugger/
[2]: /fr/tracing/live_debugger/#permissions
[3]: /fr/dynamic_instrumentation/sensitive-data-scrubbing/
[4]: https://app.datadoghq.com/debugging/
[5]: /fr/bits_ai/bits_code/
[6]: /fr/source_code/source-code-management/
[7]: /fr/tracing/live_debugger/#enable-live-debugger