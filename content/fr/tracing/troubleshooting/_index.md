---
aliases:
- /fr/tracing/faq/my-trace-agent-log-renders-empty-service-error/
further_reading:
- link: /tracing/troubleshooting/connection_errors
  tag: Documentation
  text: Erreurs de connexion
- link: /tracing/troubleshooting/tracer_startup_logs/
  tag: Documentation
  text: Logs de lancement du traceur Datadog
- link: /tracing/troubleshooting/tracer_debug_logs/
  tag: Documentation
  text: Logs de debugging du traceur Datadog
- link: /tracing/troubleshooting/agent_apm_metrics/
  tag: Documentation
  text: Métriques APM envoyées par l'Agent Datadog
kind: documentation
title: Dépannage de l'APM
---

Si l'APM Datadog se comporte de manière inattendue, consultez ce guide pour passer en revue les problèmes courants et suivre les solutions proposées. Si vous ne parvenez pas à résoudre votre problème, contactez l'[assistance Datadog][1] pour obtenir de l'aide. Datadog vous conseille d'installer systématiquement la dernière version des bibliothèques de tracing Datadog que vous utilisez, car chaque nouvelle version contient des améliorations et des correctifs.

## Pipeline de dépannage

Voici un schéma illustrant les différents composants participant à l'envoi de données APM à Datadog :

{{< img src="tracing/troubleshooting/troubleshooting_pipeline_info_1.png" alt="Pipeline de dépannage de l'APM">}}

Les traces (données au format JSON) et les [métriques d'application de tracing][2] sont générées par l'application et envoyées à l'Agent Datadog avant d'être transmises au backend. Vous pouvez recueillir différentes informations de dépannage à chaque étape du pipeline. Sachez que les logs de debugging du traceur sont ajoutés aux logs de votre application, et ne sont donc pas intégrés au flare de l'Agent Datadog. Pour en savoir plus sur ces composants, consultez la rubrique [Données de dépannage demandées par l'assistance Datadog](#donnees-de-depannage-demandees-par-l-assistance-datadog).

## Vérifier la configuration de l'APM et le statut de l'Agent

Durant le lancement, les bibliothèques de tracing Datadog génèrent des logs qui décrivent les configurations appliquées à un objet JSON, ainsi que les éventuelles erreurs qui sont survenues. Ces logs indiquent notamment, dans les langages possibles, si une connexion à l'Agent a été établie. Pour certains langages, ces logs de lancement doivent être activés avec la variable d'environnement `DD_TRACE_STARTUP_LOGS=true`. Pour découvrir comment utiliser ces logs pour résoudre vos problèmes, consultez la section [Logs de lancement du traceur][3].

## Erreurs de connexion

Il est possible que votre application instrumentée ne parvienne pas à communiquer avec l'Agent Datadog : c'est là l'une des raisons les plus communes aux problèmes de l'APM. Consultez la section [Erreurs de connexion de l'APM][4] pour découvrir comment identifier et corriger ce type de problème.

## Logs de debugging du traceur

Pour obtenir tous les détails sur le traceur Datadog, activez le mode debugging sur votre traceur à l'aide de la variable d'environnement `DD_TRACE_DEBUG`. Vous pouvez être amené à l'activer pour déterminer la cause d'un problème, ou parce que l'assistance Datadog vous l'a conseillé à des fins de triage. Toutefois, veillez à ne pas garder ce mode actif en permanence, car il augmente considérablement la quantité de logs générée.

Ces logs peuvent mettre en évidence des erreurs d'instrumentation ou des erreurs propres à une intégration. Pour en savoir plus sur l'activation et la collecte de ces logs de debugging, consultez la [page de dépannage du mode debugging][5].

## Directives en matière de volume de données

Votre application instrumentée peut envoyer des spans avec un timestamp couvrant une période commençant 18 heures avant l'heure actuelle et se terminant 2 heures après celle-ci.

Datadog réduit les chaînes suivantes lorsqu'elles dépassent le nombre de caractères indiqué :

| Nom         | Caractères |
|--------------|------------|
| [service][6]    |  100       |
| opération    |  100       |
| type         |  100       |
| [ressource][7]   |  5000      |
| [clé de tag][8]    |  200       |
| [valeur de tag][8]  |  5000      |

En outre, une span ne peut pas inclure simultanément plus de 250 [tags de span][8].

Sur un intervalle donné de 40 minutes, Datadog accepte les combinaisons d'éléments suivantes. Pour prendre en charge des volumes plus importants, contactez l'[assistance][1] afin de présenter votre scénario d'utilisation.

- 1 000 environnements et combinaisons de service uniques
- 30 groupes de hosts uniques par environnement
- 100 noms d'opérations uniques par environnement et service
- 1 000 ressources uniques par environnement, service et nom d'opération
- 30 versions uniques par environnement et service

## Limites de débit de l'APM

Si vous constatez la présence de messages d'erreur concernant les limites de débit ou le nombre maximal d'événements par seconde au sein des logs de l'Agent Datadog, vous pouvez ajuster ces limites en suivant [ces instructions][9]. Avant de les modifier, n'hésitez pas à contacter l'[équipe d'assistance][1] Datadog si vous avez des questions.

## Modifier, supprimer ou masquer des spans

Plusieurs options de configuration sont disponibles pour nettoyer des données sensibles ou supprimer des traces correspondant à des checks de santé ou à du trafic non désiré. Ces options peuvent être définies au sein de l'Agent Datadog ou dans le client de tracing (pour certains langages). Pour en savoir plus sur les options disponibles, consultez la section relative à la [sécurité et à la personnalisation de l'Agent][10]. Bien que cette page contienne des exemples pertinents, n'hésitez pas à contacter l'[assistance Datadog][1] si vous avez besoin d'aide pour appliquer ces options à votre environnement.

## Données de dépannage demandées par l'assistance Datadog

Au moment d'ouvrir un [ticket d'assistance][1], vous serez peut-être invité à communiquer les informations suivantes à l'équipe d'assistance :

1. **La méthode de confirmation du problème. Fournissez, par exemple, des liens renvoyant à une trace (de préférence) ou des captures d'écran, et indiquez à l'assistance le résultat attendu.**

    Cela permettra à l'équipe d'assistance de confirmer les erreurs en question et d'essayer de les reproduire à des environnements de test de Datadog.

2. **[Les logs de lancement du traceur](#verifier-la-configuration-de-l-APM-et-le-statut-de-l-Agent)**

    Les logs de lancement sont particulièrement utiles pour détecter un problème de configuration du traceur, ou son incapacité à communiquer avec l'Agent Datadog. En comparant la configuration que le traceur détecte et celle définie au sein de l'application ou du conteneur, l'équipe d'assistance peut identifier les endroits où un paramètre n'a pas été appliqué correctement.

3. **[Les logs de debugging du traceur](#logs-de-debugging-du-traceur)**

    Les logs de debugging du traceur vont un cran plus loin que les logs de lancement : ils servent à vérifier si les intégrations sont correctement instrumentées, même si aucun trafic ne circule via l'application. Les logs de debugging peuvent s'avérer extrêmement utiles pour visualiser le contenu des spans créées par le traceur, et peuvent mettre en évidence une erreur en cas de problème de connexion lors de l'envoi de spans à l'Agent. Les logs de debugging du traceur constituent généralement l'outil de prédilection pour confirmer la présence d'un problème lorsque le traceur affiche un comportement nuancé.

4. **Un [flare de l'Agent Datadog][11] (snapshot de logs et de configurations), qui capture un échantillon de logs représentatifs d'une période au cours de laquelle des traces sont envoyées à votre Agent Datadog en [mode debugging ou trace][12] (en fonction des informations recherchées dans ces logs).**

    Les flares de l'Agent Datadog vous permettent d'analyser l'activité au sein de l'Agent Datadog, et de voir par exemple si des traces sont rejetées ou malformées. Les flares ne sont d'aucune utilité si les traces ne parviennent pas à l'Agent Datadog, mais ils peuvent aider à identifier la source d'un problème ou toute anomalie au niveau des métriques.

    Lorsque vous définissez le niveau de log sur `debug` ou `trace`, gardez à l'esprit que ces deux modes entraînent une hausse considérable du volume de logs traité, et donc de la consommation des ressources système (notamment de l'espace de stockage sur le long terme). Datadog vous conseille donc d'activer ces modes de manière temporaire lorsqu'un dépannage est nécessaire, et de rétablir le mode `info` une fois le processus de dépannage terminé.

    **Remarque** : si vous utilisez l'Agent Datadog 7.19 ou une version ultérieure ainsi que la [dernière version][9] du chart Helm Datadog, ou un DaemonSet dans lequel l'Agent Datadog et le trace-agent se trouvent dans des conteneurs séparés, vous devez exécuter la commande suivante en définissant `log_level: DEBUG` ou `log_level: TRACE` dans votre fichier `datadog.yaml` pour obtenir un flare du trace-agent :

    {{< code-block lang="bash" filename="trace-agent.sh" >}}
kubectl exec -it <nom-pod-agent> -c trace-agent -- agent flare <id-ticket> --local
    {{< /code-block >}}

5. **Une description de votre environnement**

    Expliquez à l'équipe d'assistance comment votre application est déployée, afin qu'elle puisse identifier plus facilement les causes potentielles d'un problème de communication ou de configuration du tracer-agent. Si le problème s'avère complexe, vous devrez peut-être envoyer à l'assistance un manifeste Kubernetes ou une définition de tâche ECS, par exemple.

6. **Le code personnalisé écrit à l'aide des bibliothèques de tracing, comme la configuration du traceur, l'[instrumentation personnalisée][13] et l'ajout de tags de span**.

    Aussi utile qu'elle soit, l'instrumentation personnalisée peut également avoir des effets secondaires indésirables sur vos visualisations de traces dans Datadog. Pour cette raison, l'équipe d'assistance peut vous demander de telles informations afin de vérifier si l'instrumentation personnalisée est à l'origine de votre problème.

    De plus, l'examen de votre instrumentation automatique et de votre configuration permet à Datadog de vérifier qu'elles sont cohérentes avec les logs de lancement et de debugging du traceur.

7. **La version des éléments suivants :**
   * **Langage informatique, frameworks et dépendances ayant servi à concevoir l'application instrumentée**
   * **Traceur Datadog**
   * **Agent Datadog**

    L'identification des versions utilisées nous permet de garantir la prise en charge des intégrations, conformément à la section [Exigences de compatibilité][14], de rechercher les problèmes connus ou de recommander une mise à jour du traceur ou du langage si cela est susceptible de régler le problème.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/help/
[2]: /fr/tracing/guide/metrics_namespace/
[3]: /fr/tracing/troubleshooting/tracer_startup_logs/
[4]: /fr/tracing/troubleshooting/connection_errors/
[5]: /fr/tracing/troubleshooting/tracer_debug_logs/
[6]: /fr/tracing/visualization/#services
[7]: /fr/tracing/visualization/#resources
[8]: /fr/tracing/visualization/#span-tags
[9]: /fr/tracing/troubleshooting/agent_rate_limits
[10]: /fr/tracing/custom_instrumentation/agent_customization
[11]: /fr/agent/troubleshooting/send_a_flare/?tab=agentv6v7
[12]: /fr/agent/troubleshooting/debug_mode/?tab=agentv6v7
[13]: /fr/tracing/custom_instrumentation/
[14]: /fr/tracing/compatibility_requirements/