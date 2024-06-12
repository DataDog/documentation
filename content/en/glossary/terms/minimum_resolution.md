---
title: minimum resolution
---
Minimum resolution is the shortest interval between datapoints for which Datadog retains unique records. For example, if the minimum resolution is 1 second, only one value per unique combination of tags and metrics is stored within each 1-second window. Any subsequent value sent within the same second overwrites the previous value. 
