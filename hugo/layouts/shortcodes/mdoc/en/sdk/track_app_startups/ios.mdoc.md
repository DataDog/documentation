### Automated tracking

The iOS SDK automatically creates an `ApplicationLaunch` view during initialization and measures the time to initial display (TTID) for it. No setup is required for TTID.

### Manual tracking

Every app defines "fully drawn" differently, so the SDK doesn't automatically measure the time to full display (TTFD). Call `RUMMonitor.shared().reportAppFullyDisplayed()` when your app reaches that state:

```swift
@MainActor
class HomeViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        Task { await loadData() }
    }

    private func loadData() async {
        let url = URL(string: "https://api.example.com/data")!
        do {
            let (data, _) = try await URLSession.shared.data(from: url)
            updateUI(with: data)
        } catch {
            // Handle the error if needed
        }

        // Mark the app as fully displayed
        RUMMonitor.shared().reportAppFullyDisplayed()
    }
}
```

Send the signal only after the UI has been updated with the received content or the error has been handled. If time to full display isn't defined, the SDK only collects TTID.

For TTID/TTFD definitions, cold/warm start and prewarming categorization, vital events, and metrics, see [Apple Platform Application Launch Monitoring][1].

[1]: /real_user_monitoring/application_monitoring/ios/application_launch_monitoring/
