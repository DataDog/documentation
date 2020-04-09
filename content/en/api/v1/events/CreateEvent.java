import com.datadog.api.v1.client.api.EventsApi;

public class EventsApiExample {

    public static void main(String[] args) {
        EventsApi apiInstance = new EventsApi();
        Event body = ; // Event | 
        try {
            EventResponse result = apiInstance.createEvent(body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling EventsApi#createEvent");
            e.printStackTrace();
        }
    }
}