## Overview

Frustration signals identify points of user friction in your mobile application by capturing patterns like rage taps and error taps.

Mobile RUM collects two types of frustration signals:

Rage Taps
: A user taps on an element more than three times in a one-second sliding window within a radius of approximately 9 mm (48 dp).

Error Taps
: A user taps on an element, and at least one error occurs during the action's duration or within 100 ms after the action ends.

The Mobile RUM SDK automatically detects frustration signals with no additional configuration.

## Search for frustration signals in the RUM Explorer

Frustration signals appear in the [RUM Explorer][1] as action attributes. Search through your RUM data to surface trends on frustration signals and analyze patterns of user friction.

Enter a facet in the search query to begin. Available search fields include:

Frustration Type
: Find actions with a specific frustration signal. For example, to see all actions with a rage tap, add `action.frustration.type:rage_tap` to the search query.

Frustration Count
: Find sessions and views where any frustration signal occurred. For example, to find sessions or views with at least one frustration signal, add `session.frustration.count:>1` or `view.frustration.count:>1` to the search query.

[1]: /real_user_monitoring/explorer/
