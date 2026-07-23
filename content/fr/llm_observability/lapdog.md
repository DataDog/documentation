---
description: Exécutez un tableau de bord d'observabilité LLM localement pour inspecter
  les traces de l'agent de codage et de l'application dans votre navigateur sans compte
  Datadog.
further_reading:
- link: https://github.com/DataDog/dd-apm-test-agent/blob/master/lapdog/README.md
  tag: GitHub
  text: README de Lapdog sur GitHub
- link: /llm_observability/instrumentation/sdk
  tag: Documentation
  text: Instrumentez votre application avec le Agent Observability SDK.
- link: /llm_observability/instrumentation/auto_instrumentation
  tag: Documentation
  text: Auto-instrumentation pour Agent Observability.
title: Lapdog
---
## Aperçu {#overview}

Lapdog est un outil de développement local pour Agent Observability. Il exécute un agent sur `localhost:8126` qui capture chaque span, prompt, appel d'outil et coût de votre application LLM, ou d'un agent de codage tel que Claude Code, Codex ou Pi, et les transmet dans un tableau de bord accessible via votre navigateur à [lapdog.datadoghq.com](https://lapdog.datadoghq.com). Aucun compte Datadog n'est requis.

Lapdog est construit sur l'agent de test open-source [Datadog APM test agent][1]. Il peut également transférer la télémétrie capturée à Datadog afin que les mêmes données apparaissent dans Agent Observability aux côtés de votre trafic de production.

## Ce que vous obtenez {#what-you-get}

- Traces par session avec invites, appels d'outils et réponses
- Utilisation des jetons et coût estimé, décomposé par entrée, sortie et hits de cache
- Friction d'autorisation : appels d'outils restreints et temps d'attente.
- Utilisation de la fenêtre de contexte et taux de hits de cache au cours de la session
- État en direct de l'agent de codage en cours d'exécution (en cours, inactif, bloqué)

## Installer {#install}

{{< tabs >}}
{{% tab "Homebrew (macOS)" %}}

```shell
brew install datadog/lapdog/lapdog
```
{{% /tab %}}
{{% tab "pip / pipx" %}}

```shell
pipx install ddapm-test-agent
# or: pip install ddapm-test-agent
```
{{% /tab %}}
{{< /tabs >}}

Pour Docker, pour l'installation à partir du code source et d'autres méthodes, consultez le [guide d'installation de Lapdog][1].

## Exécutez un agent de codage {#run-a-coding-agent}

Lapdog instrumente les agents de codage de bout en bout. Chaque invite, appel d'outil et demande d'autorisation devient un span dans une session que vous pouvez rejouer depuis le tableau de bord.

{{< tabs >}}
{{% tab "Claude Code" %}}

```shell
lapdog claude
```
Démarre l'agent local, installe le plugin Claude Code de Lapdog et lance Claude Code.
{{% /tab %}}
{{% tab "Codex" %}}

```shell
lapdog codex
```
Démarre l'agent local, puis lance Codex avec un proxy compatible OpenAI et un observateur JSONL qui capturent chaque demande LLM, appel d'outil et étape dans une session.
{{% /tab %}}
{{% tab "Pi" %}}

```shell
lapdog pi
```
Démarre l'agent local, installe l'extension Pi de Lapdog et lance Pi avec `LAPDOG_URL` configuré.
{{% /tab %}}
{{% tab "Other" %}}

```shell
lapdog python my_app.py
```
Exécutez n'importe quelle commande avec `ddtrace` auto-instrumentation pointée vers l'agent local. Utile pour instrumenter votre propre application alimentée par LLM pendant le développement.
{{% /tab %}}
{{< /tabs >}}

**Remarque**: `lapdog claude` et `lapdog codex` sont soutenus par un proxy : l'agent local de Lapdog se trouve dans le chemin des requêtes de modèle en direct. Gardez Lapdog en cours d'exécution jusqu'à ce que l'agent de codage quitte. Si vous arrêtez ou tuez Lapdog en cours de session, l'agent de codage lancé peut cesser de progresser sur les appels de modèle. Redémarrez l'agent de codage après avoir redémarré Lapdog. `lapdog pi` et les configurations en mode hook uniquement échouent en mode ouvert si Lapdog tombe : l'agent de codage continue de fonctionner, mais les données de capture sont perdues.

## Voir les sessions {#view-sessions}

Tandis qu'une session est en cours, ouvrez [lapdog.datadoghq.com](https://lapdog.datadoghq.com). Le tableau de bord lit directement depuis votre agent local sur `localhost:8126` ; aucune connexion ou compte Datadog n'est nécessaire.

Si vous avez changé le port local, remplacez-le depuis le badge {{< ui >}}Collecting sessions{{< /ui >}} dans l'en-tête du tableau de bord.

## Transférez les événements vers Datadog {#forward-events-to-datadog}

Pour expédier simultanément les événements capturés vers Agent Observability dans Datadog, définissez votre clé API et passez `--forward` :

```shell
DD_API_KEY=<YOUR_API_KEY> lapdog --forward claude
```

Les spans transférés sont étiquetés `source:lapdog` afin que vous puissiez distinguer les sessions de développement du trafic de production.

## Commandes utiles {#useful-commands}

| Commande | Ce qu'elle fait |
| --- | --- |
| `lapdog claude` | Lancez Claude Code avec la capture configurée |
| `lapdog codex` | Lancez Codex avec le proxy OpenAI et l'observateur JSONL configurés |
| `lapdog pi` | Lancez Pi avec l'extension lapdog installée |
| `lapdog python app.py` | Exécutez n'importe quelle application avec instrumentation de traçage |
| `lapdog start` | Démarrez l'agent local en arrière-plan |
| `lapdog stop` | Arrêtez l'agent en arrière-plan |
| `lapdog status` | Affichez si l'agent est en cours d'exécution |

Pour la liste complète des options, exécutez `lapdog --help`.

## Désinstaller {#uninstall}

Suivez ces étapes pour supprimer Lapdog et l'état qu'il écrit dans votre répertoire personnel. Votre gestionnaire de paquets (Homebrew, pip ou pipx) ne nettoie que ce qu'il a installé ; il ne touche pas `~/.lapdog/`, le plugin Claude Code, ou l'extension pi.

1. Arrêtez l'agent local :

   ```shell
   lapdog stop
   ```

2. Supprimez le plugin Claude Code (si installé) :

   ```shell
   claude plugin uninstall lapdog@lapdog
   claude plugin marketplace remove lapdog
   ```

3. Supprimez l'extension pi (uniquement si vous avez exécuté `lapdog pi`) :

   ```shell
   rm -f ~/.pi/agent/extensions/lapdog.ts
   ```

4. Supprimez le répertoire de travail de Lapdog :

   ```shell
   rm -rf ~/.lapdog
   ```

5. Désinstallez le paquet :

   {{< tabs >}}
   {{% tab "Homebrew (macOS)" %}}
   ```shell
   brew uninstall lapdog
   brew untap datadog/lapdog
   ```
   {{% /tab %}}
   {{% tab "pip / pipx" %}}
   ```shell
   pipx uninstall ddapm-test-agent
   # or: pip uninstall ddapm-test-agent
   ```
   {{% /tab %}}
   {{< /tabs >}}

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-apm-test-agent/blob/master/lapdog/README.md