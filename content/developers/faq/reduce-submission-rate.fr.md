---
title: Réduire la fréquence de soumission
kind: faq
---

Chaque point de mesure est envoyé via UDP au serveur StatsD. Cela peut entraîner beaucoup de surcharge pour les chemins de code à performances élevées. Pour contourner cela, StatsD prend en charge les taux d'échantillonnage, ce qui permet d'envoyer une métrique une fraction du temps et de la remettre à l'échelle correctement sur le serveur.

Le code suivant envoie uniquement des points la moitié du temps:

For python:
```python

while True:
  do_something_intense()
  statsd.increment('loop.count', sample_rate=0.5)
```

Pour Ruby:
```ruby
while true do
  do_something_intense()
  statsd.increment('loop.count', :sample_rate => 0.5)
end
```

