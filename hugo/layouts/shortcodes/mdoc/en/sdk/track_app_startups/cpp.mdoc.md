## Manual tracking

The C++ SDK doesn't measure application startup automatically. Report both milestones yourself. These APIs require C++ SDK version 0.6.0 or later.

- Call `ReportAppDisplayInitialized()` when the application presents its first interactive frame. The SDK reports the time from process launch to this call as the time to initial display (TTID).
- Call `ReportAppFullyDisplayed()` when the application is fully loaded and interactive. The SDK reports the time from process launch to this call as the time to full display (TTFD).

```cpp
// After the first interactive frame is presented
rum->ReportAppDisplayInitialized();

// After the application is fully loaded and interactive
rum->ReportAppFullyDisplayed();
```

Call each method at most once. Later calls are ignored.
