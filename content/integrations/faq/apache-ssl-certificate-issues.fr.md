---
title: Problèmes de certificat SSL Apache
kind: faq
---

Si vous rencontrez des problèmes avec votre intégration Apache, c'est peut-être parce que la version de Python dans l'agent version 5.2 a des corrections de bogues concernant les certificats SSL.

Un certificat SSL «défectueux» que l'agent a précédemment accepté peut maintenant être rejeté, ce qui entraîne des erreurs.

Pour résoudre le problème, corrigez le fichier apache.py dans /checks.d avec [ces modifications](https://gist.github.com/philliphaines/06e7cef908f921de94b5):