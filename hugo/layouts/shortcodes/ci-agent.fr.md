SI vous exécutez des tests avec un fournisseur de CI sur site, comme Jenkins ou GitLab CI autogéré, installez l'Agent Datadog sur chaque nœud de worker en suivant les [instructions d'installation de l'Agent][101]. Cette méthode est recommandée, car elle vous permet d'associer automatiquement les résultats de test aux [logs][105] et aux [métriques des hosts sous-jacents][106].

Si vous utilisez un exécuteur Kubernetes, Datadog vous conseille d'utiliser l'[Operator Datadog][102]. Celui-ci comprend le [contrôleur d'admission Datadog][103], qui peut automatiquement [injecter la bibliothèque du traceur][104] dans les pods du build. **Remarque** : si vous utilisez l'Operator Datadog, il n'est pas nécessaire de télécharger et d'injecter la bibliothèque du traceur, car le contrôleur d'admission le fait à votre place. Vous pouvez donc ignorer l'étape correspondante ci-dessous. Vous devez toutefois vous assurer que vos pods définissent les variables d'environnement ou paramètres de ligne de commande nécessaires à l'activation de Test Visibility.

Si vous n'utilisez pas Kubernetes, ou si vous ne pouvez pas utiliser le contrôleur d'admission Datadog, et que le fournisseur de CI repose sur un exécuteur basé sur des conteneurs, définissez la variable d'environnement `DD_TRACE_AGENT_URL` (valeur par défaut : `http://localhost:8126`) dans le conteneur du build exécutant le traceur sur un endpoint accessible dans le conteneur. **Remarque** : lorsqu'elle est utilisée à l'intérieur du conteneur, la valeur `localhost` désigne le conteneur, et non le nœud de worker sous-jacent ou un conteneur dans lequel l'Agent pourrait s'exécuter.

`DD_TRACE_AGENT_URL` comprend le protocole et le port (par exemple, `http://localhost:8126`) et est prioritaire par rapport à `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT`. Ce paramètre est recommandé pour la configuration de l'URL de l'Agent Datadog pour CI Visibility.

Si vous ne parvenez pas à établir une connexion avec l'Agent Datadog, utilisez le [mode sans agent](?tab=cloudciprovideragentless#configurer-la-methode-de-transmission). **Remarque** : avec cette méthode, les tests ne sont pas mis en corrélation avec les [logs][105] et les [métriques d'infrastructure][106].

[101]: /agent/
[102]: /containers/datadog_operator/
[103]: /agent/cluster_agent/admission_controller/
[104]: /tracing/trace_collection/library_injection_local/?tab=kubernetes
[105]: /tracing/other_telemetry/connect_logs_and_traces/
[106]: /infrastructure/
