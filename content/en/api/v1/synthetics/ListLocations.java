import com.datadog.api.v1.client.api.SyntheticsApi;

public class SyntheticsApiExample {

    public static void main(String[] args) {
        SyntheticsApi apiInstance = new SyntheticsApi();
        try {
            SyntheticsLocations result = apiInstance.listLocations();
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling SyntheticsApi#listLocations");
            e.printStackTrace();
        }
    }
}