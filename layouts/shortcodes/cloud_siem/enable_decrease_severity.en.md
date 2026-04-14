Toggle **Decrease severity for non-production environments** if you want to prioritize production environment signals over non-production signals.
- The severity of signals in non-production environments are decreased by one level from what is defined by the rule case.
- The severity decrement is applied to signals with an environment tag starting with `staging`, `test`, or `dev`.