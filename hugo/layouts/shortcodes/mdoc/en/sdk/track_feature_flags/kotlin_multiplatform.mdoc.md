The Kotlin Multiplatform SDK supports reporting feature flag evaluations. It doesn't provide feature flag integrations.

1. Set up [RUM Kotlin Multiplatform monitoring][1].
2. Each time a feature flag is evaluated, report it to RUM with `addFeatureFlagEvaluation`. To report several evaluations at once, use `addFeatureFlagEvaluations`:

   ```kotlin
   GlobalRumMonitor.get().addFeatureFlagEvaluation("checkout_redesign", true)

   GlobalRumMonitor.get().addFeatureFlagEvaluations(
       mapOf(
           "checkout_redesign" to true,
           "theme" to "dark"
       )
   )
   ```

   Feature flag evaluations are attached to the active view and are cleared when the view stops.

[1]: /real_user_monitoring/setup/install/?platform=kotlin_multiplatform
