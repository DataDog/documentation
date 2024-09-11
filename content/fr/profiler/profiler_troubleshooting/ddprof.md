---
code_lang: ddprof
code_lang_weight: 90
further_reading:
- link: /tracing/troubleshooting
  tag: Documentation
  text: Dépannage de l'APM
title: Dépannage du profileur natif pour les langages compilés
type: multi-code-lang
---

<div class="alert alert-warning">
<code>ddprof</code> est disponible en version bêta. Datadog vous conseille de tester le profileur dans un environnement auxiliaire avant de le déployer en production.
</div>

## Profils manquants sur la page de recherche de profils

Si vous avez configuré le profileur, mais qu'aucun profil ne s'affiche dans la page de recherche dédiée, activez la journalisation détaillée (`-l debug`) et [ouvrez un ticket auprès de l'assistance][1]. Ajoutez à ce ticket vos fichiers de log, ainsi que les informations suivantes :

- Version du kernel Linux (`uname -r`)
- Version de libc (`ldd --version`)
- Valeur de `/proc/sys/kernel/perf_event_paranoid`
- Ligne de commande complète, y compris les arguments du profileur et de l'application

La section ci-dessous répertorie les différents problèmes de configuration que vous pouvez rencontrer.

### \<ERROR\> Error calling perfopen on watcher

Cette erreur survient généralement lorsque vous ne disposez pas des autorisations adéquates pour interagir avec le profileur. Cela est habituellement causé par la désactivation de fonctionnalités du système d'exploitation requises, qui entraîne l'échec du profiling. Ces paramètres doivent généralement être configurés au niveau des hosts, et non au niveau d'un pod ou d'un conteneur spécifique.

Afin de conserver la configuration après des redémarrages, définissez `perf_event_paranoid` en l'adaptant à votre distribution. Pour diagnostiquer le problème, exécutez la commande suivante :

```shell
echo 1 | sudo tee /proc/sys/kernel/perf_event_paranoid
```

**Remarque** : cette commande doit être exécutée à partir de l'espace de nommage d'un montage dans lequel l'objet `/proc/sys/kernel/perf_event_paranoid` existe et peut être écrit. Pour un conteneur, ce paramètre est hérité à partir du host.

Vous pouvez utiliser deux fonctionnalités pour remplacer la valeur de `perf_event_paranoid` :
- `CAP_SYS_ADMIN` : ajoute de nombreuses autorisations, ce qui peut être déconseillé.
- `CAP_PERFMON` : ajoute les fonctionnalités BPF et `perf_event_open` (disponible sous Linux 5.8 et ultérieur).

L'erreur peut également être causée par des problèmes d'autorisations plus rares :
- Le profileur repose sur l'appel système `perf_event_open()`, qui est interdit par certains runtimes de conteneur. Consultez la documentation pertinente pour vérifier si c'est le cas pour votre runtime.
- Certains profils seccomp interdisent l'utilisation de `perf_event_open()`. Si votre système exécute une configuration de ce type, vous ne pourrez pas exécuter le profileur.

### "\<ERROR\> Could not mmap memory for watcher

Pour que le profileur puisse fonctionner correctement, il a besoin de mémoire « réservée ». Ce type de mémoire est limité par les paramètres du kernel. Pour consulter votre réglage actuel, utilisez la commande `ulimit -l`. La fonctionnalité suivante permet d'ignorer cette limite :
- `CAP_IPC_LOCK` : permet d'utiliser la mémoire verrouillée (mémoire non paginée).

### \<WARNING\> Could not finalize watcher

Cet avertissement peut être émis lorsque le système ne parvient pas à allouer suffisamment de mémoire verrouillée pour le profileur. Cela se produit généralement lorsqu'un trop grand nombre d'instances du profileur sont actives sur un host donné. Cette situation est comparable à l'instrumentation sur un même host d'un trop grand nombre de services conteneurisés. Pour résoudre ce problème, augmentez la limite de mémoire `mlock()` ou réduisez le nombre d'applications instrumentées.

Le calcul de cette limite peut tenir compte d'autres outils de profiling.

### \<WARNING\> Failure to establish connection

Cette erreur signifie généralement que le profileur ne parvient pas à se connecter à l'Agent Datadog. Activez la journalisation relative à la configuration (`--show_config`) pour identifier le hostname et le numéro de port utilisés par le profileur pour les importations. Il est possible que le contenu du message d'erreur contienne le hostname et le numéro de port. Comparez ces valeurs à celle de la configuration de votre Agent. Consultez la section d'aide du profileur (`ddprof --help`) pour découvrir comment configurer l'URL de l'Agent.

## Profils vides ou creux

La racine de votre profil correspond au frame dont le nom comporte le binaire de l'application. Si ce frame possède un temps CPU non négligeable, mais sans le moindre frame enfant, considérez les approches suivantes :
- Les binaires « stripped » ne possèdent pas de symboles. Essayez d'utiliser un binaire qui n'est pas « stripped »  ou une image de conteneur non minifiée.
- Il est recommandé d'installer les packages de debugging de certaines applications et bibliothèques. C'est notamment le cas pour les services installés par l'intermédiaire du gestionnaire de package de votre référentiel ou d'un outil similaire.

Si la valeur `Anonymous` est affichée à la place du nom de votre fonction, vous utilisez potentiellement un langage interprété ou JIT. Dans ce cas, activez les informations sur les vidages JIT ou les cartes de performances.

Il est possible que vos profils soient vides (« No CPU time reported ») ou qu'ils ne contiennent que quelques frames. Vérifiez que votre application est suffisamment sollicitée. Le profileur s'active uniquement lorsque l'application instrumentée est planifiée sur le CPU.

## Erreur lors du chargement des bibliothèques partagées

Lorsque vous utilisez le profileur en continu pour les langages compilés en tant que bibliothèque dynamique, il est possible que le lancement de votre application échoue et que vous receviez l'erreur suivante :

```
error while loading shared libraries: libdd_profiling.so: cannot open shared object file: No such file or directory
```

Ce problème survient lorsque votre application inclut la dépendance `libdd_profiling.so`, mais que celle-ci est introuvable lors du rapprochement des dépendances pendant l'exécution. Pour y remédier, suivez l'une des deux méthodes ci-dessous :

- Recréez votre application avec une bibliothèque statique. Dans certains systèmes de build, il n'est pas toujours évident de choisir entre une bibliothèque dynamique et statique. Pour cette raison, utilisez la commande `ldd` pour vérifier si le binaire généré inclut une dépendance dynamique non souhaitée sur `libdd_profiling.so`.
- Copiez `libdd_profiling.so` au sein d'un des répertoires dans le chemin de recherche de l'éditeur de liens dynamique. Pour obtenir la liste des répertoires disponibles, exécutez `ld --verbose | grep SEARCH_DIR | tr -s ' ;' \\n` (commande valide sur la plupart des systèmes Linux).


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/help/