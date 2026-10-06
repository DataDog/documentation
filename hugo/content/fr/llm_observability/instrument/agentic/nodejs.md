---
aliases:
- /fr/llm_observability/instrumentation/agentic/nodejs/
title: Instrumentation par l'agent pour l'application Node.js
---
**Remarque** : Le SDK Node.js de Datadog **prend uniquement** en charge les environnements d'exécution Node.js. Si l'application de l'utilisateur utilise un autre environnement d'exécution Javascript, n'**utilisez pas** cet ensemble d'instructions.

## Frameworks {#frameworks}

Si l'utilisateur instrumente une application avec l'un des frameworks suivants, suivez ce guide _plutôt _ que de suivre les instructions se trouvant sous [Instrumentation](#instrumentation)

| Framework | Instructions |
|----------|-------------|
| Next.js | [Guide d'instrumentation Next.js](/llm_observability/guide/nextjs_guide.md) |

## Instrumentation {#instrumentation}

1. Installez le dernier `ddtrace` paquet.

Vérifiez le gestionnaire de paquets déjà utilisé par le dépôt ou le projet et utilisez-le pour installer les dépendances. Vérifiez via les fichiers de verrouillage.

```bash
npm install dd-trace # npm
pnpm add dd-trace # pnpm
yarn add dd-trace # yarn
```

2. Ajoutez les Datadog loader hooks

Ceci est **obligatoire**.

Les Datadog loader hooks sont utilisés pour patcher automatiquement les instructions d'importation ESM et Typescript afin d'instrumenter les frameworks supportés. Définissez `NODE_OPTIONS="--import dd-trace/register.js"` le plus tôt possible, idéalement dans le cadre de la commande de démarrage. Cela doit être disponible pour le processus Node.js lors de son lancement, donc le définir après le temps de chargement n'est **pas** acceptable.

Voici un exemple avec le package.json :

```json
{
  "scripts": {
    "start": "NODE_OPTIONS=\"--import dd-trace/register.js\" node app.js"
  }
}
```

Bien que cette valeur puisse être définie dans un `Dockerfile`, un script d'amorçage, etc., tant que cette infrastructure _existe_ déjà dans le code et se trouve _avant_ le démarrage du processus de l'application Node.js.

3. Initialisez le package Agent Observability

Initialisez le SDK Agent Observability via `ddtrace.auto`. Ceci **doit** être effectué en tant que premier import dans le point d'entrée de l'application, en dehors de tout import de variable d'environnement ou de chargement de configuration.

**Remarque** : n'ajoutez pas de commentaires superflus.

```typescript
import 'dotenv/config'; // this might load DD_ environment variables

import 'dd-trace/init'; // CRUCIAL: this initializes the Agent Observability SDK and instrumentations

// ... remaining application logic
```