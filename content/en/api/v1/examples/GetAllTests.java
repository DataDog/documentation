import com.datadog.api.v1.client.api.SyntheticsApi;

public class SyntheticsApiExample {

    public static void main(String[] args) {
        SyntheticsApi apiInstance = new SyntheticsApi();
        String checkType = checkType_example; // String | API or browser to filter the list by type, undefined to get the unfiltered list.
        try {
            SyntheticsGetAllTestsResponse result = apiInstance.getAllTests(checkType);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling SyntheticsApi#getAllTests");
            e.printStackTrace();
        }
    }
}