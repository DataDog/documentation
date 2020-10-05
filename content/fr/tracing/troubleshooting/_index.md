---
title: Dépannage de l'APM
kind: documentation
further_reading:
  - link: /tracing/troubleshooting/tracer_startup_logs/
    tag: Documentation
    text: Logs de lancement du traceur Datadog
  - link: /tracing/troubleshooting/tracer_debug_logs/
    tag: Documentation
    text: Logs de debugging du traceur Datadog
  - link: /tracing/troubleshooting/agent_apm_metrics/
    tag: Documentation
    text: Métriques APM envoyées par l'Agent Datadog
---
Si l'APM Datadog se comporte de manière inattendue, consultez ce guide pour passer en revue les problèmes courants et suivre les solutions proposées. Si vous ne parvenez pas à résoudre votre problème, contactez l'[assistance Datadog][1] pour obtenir de l'aide.

## Confirmer la configuration de l'APM et le statut de l'Agent

Lors du lancement, toutes les bibliothèques de tracing Datadog ultérieures aux versions répertoriées ci-dessous émettent des logs qui reflètent les configurations appliquées dans un objet JSON, ainsi que les erreurs rencontrées. Lorsque le langage le permet, les logs indiquent également si la connexion à l'Agent peut être établie. Si la version de votre traceur comprend ces [logs de lancement][2], commencez votre dépannage par là.

| Langage | Version |
|----------|---------|
| Java    |  0.59+  |
| .NET | 1.18.2+  |
| PHP | 0.47.0+  |
| Go | 1.26.0+  |
| NodeJS | 0.23.0+  |
| Python | 0.41+  |
| Ruby | 0.38+  |
| C++ | 1.2.0+ |

## Logs de debugging du traceur

Pour obtenir tous les détails sur le traceur Datadog, activez le mode debugging sur votre traceur à l'aide de la variable d'environnement `DD_TRACE_DEBUG`. Vous pourriez être amené à l'activer pour déterminer la cause d'un problème, ou parce que l'assistance Datadog vous l'a conseillé à des fins de triage. Toutefois, veillez à ne pas garder ce mode actif en permanence, car il augmente considérablement la quantité de logs générée.

Ces logs peuvent mettre en évidence des erreurs d'instrumentation ou des erreurs propres à une intégration. Pour en savoir plus sur l'activation et la collecte de ces logs de debugging, consultez la [page de dépannage du mode debugging][3].

## Limites de débit de l'APM

Si vous constatez la présence de messages d'erreur concernant les limites de débit ou le nombre maximal d'événements par seconde au sein des logs de l'Agent Datadog, vous pouvez ajuster ces limites en suivant [ces instructions][4]. Avant de les modifier, n'hésitez pas à contacter notre [équipe d'assistance][1] si vous avez des questions.

## Modifier, supprimer ou masquer des spans

Plusieurs options de configuration sont disponibles pour nettoyer des données sensibles ou supprimer des traces correspondant à des checks de santé ou à du trafic non désiré. Ces options peuvent être définies au sein de l'Agent Datadog ou dans le client de tracing (pour certains langages). Pour en savoir plus sur les options disponibles, consultez la page [Sécurité et personnalisation de l'Agent][5] de la documentation. Bien que cette page contienne des exemples pertinents, n'hésitez pas à contacter l'[assistance Datadog][1] en décrivant les résultats attendus si vous avez besoin d'aide pour appliquer ces options à votre environnement.

## Données de dépannage demandées par l'assistance Datadog

Au moment d'ouvrir un [ticket d'assistance][1], vous serez peut-être invité à communiquer les informations suivantes à l'équipe d'assistance :

1. **La méthode de confirmation du problème. Fournissez, par exemple, des liens renvoyant à une trace (de préférence) ou des captures d'écran, et indiquez-nous le résultat attendu.**

    Cela nous permettra de confirmer les erreurs en question et d'essayer de les reproduire au sein de nos environnements de test.

2. **[Les logs de lancement du traceur](#logs-de-lancement-du-traceur)**

    Les logs de lancement sont particulièrement utiles pour détecter un problème de configuration du traceur, ou son incapacité à communiquer avec l'Agent Datadog. En comparant la configuration que le traceur voit et celle définie au sein de l'application ou du conteneur, nous pouvons identifier les endroits où un paramètre n'a pas été appliqué correctement.

3. **[Les logs de debugging du traceur](#logs-de-debugging-du-traceur)**

    Les logs de debugging du traceur vont un cran plus loin que les logs de lancement : ils nous permettent de voir si les intégrations sont correctement instrumentées, même si aucun trafic ne circule via l'application. Les logs de debugging peuvent s'avérer extrêmement utiles pour visualiser le contenu des spans créées par le traceur, et peuvent mettre en évidence une erreur en cas de problème de connexion lors de l'envoi de spans à l'Agent. Les logs de debugging du traceur constituent généralement l'outil de prédilection pour confirmer la présence d'un problème lorsque le traceur affiche un comportement nuancé.

4. **Un [flare de l'Agent][6] (snapshot de logs et de configurations), qui capture un échantillon de logs représentatifs d'une période au cours de laquelle des traces sont envoyées à votre Agent lorsque vous êtes en [mode debug ou trace][7], selon les informations que nous recherchons dans ces logs.**

    Les flares de l'Agent nous permettent d'analyser l'activité au sein de l'Agent Datadog, et de voir notamment si des traces sont rejetées ou malformées au sein de celui-ci. Les flares ne sont d'aucune utilité si les traces ne parviennent pas à l'Agent, mais ils peuvent aider à identifier la source d'un problème ou toute anomalie au niveau des métriques.

    Lorsque vous définissez le niveau de log sur `debug` ou `trace`, gardez à l'esprit que ces deux modes entraîneront une hausse considérable du volume de logs traité, et donc de la consommation des ressources système (notamment de l'espace de stockage sur le long terme). Nous vous conseillons d'activer ces modes de manière temporaire lorsqu'un dépannage est nécessaire, et de rétablir le mode `info` une fois le processus de dépannage terminé.

    **Remarque** : si vous utilisez l'Agent v7.19 ou version ultérieure ainsi que le chart Helm Datadog avec la [dernière version][4], ou un DaemonSet dans lequel l'Agent Datadog et le trace-agent sont dans des conteneurs séparés, vous devrez exécuter la commande suivante en définissant `log_level: DEBUG` ou `log_level: TRACE` dans votre `datadog.yaml` pour obtenir un flare du trace-agent :

    {{< code-block lang="bash" filename="trace-agent.sh" >}}
```bash
kubectl exec -it <nom-pod-agent> -c trace-agent -- agent flare <id-ticket> --local
```
    {{< /code-block >}}

5. **Une description de votre environnement**

    Connaître la façon dont votre application est déployée nous aide à identifier les causes potentielles d'un problème de communication ou de configuration du tracer-agent. Si le problème s'avère complexe, nous vous demanderons peut-être de nous envoyer un manifeste Kubernetes ou une définition de tâche ECS, par exemple.

6. **Code personnalisé écrit à l'aide des bibliothèques de tracing, comme la configuration du traceur, l'[instrumentation personnalisée][8] et l'ajout de tags de span**

    L'instrumentation personnalisée est un outil très puissant, mais elle peut également avoir des effets secondaires indésirables sur vos visualisations de traces dans Datadog ; c'est la raison pour laquelle nous demandons ces informations. De plus, l'examen de votre instrumentation automatique et de votre configuration nous permet de vérifier qu'elles sont cohérentes avec les logs de lancement et de debugging du traceur.

7. **Versions des langages, des frameworks, de l'Agent Datadog et de la bibliothèque de tracing utilisées**

    Connaître les versions utilisées nous permet de garantir la prise en charge des intégrations conformément à la section [Exigences de compatibilité][9], de rechercher les problèmes connus ou de recommander une mise à jour de la version du traceur ou du langage si cela est susceptible de régler le problème.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/help/
[2]: /fr/tracing/troubleshooting/tracer_startup_logs/
[3]: /fr/tracing/troubleshooting/tracer_debug_logs/
[4]: /fr/tracing/troubleshooting/agent_rate_limits
[5]: /fr/tracing/custom_instrumentation/agent_customization
[6]: /fr/agent/troubleshooting/send_a_flare/?tab=agentv6v7
[7]: /fr/agent/troubleshooting/debug_mode/?tab=agentv6v7
[8]: /fr/tracing/custom_instrumentation/
[9]: /fr/tracing/compatibility_requirements/